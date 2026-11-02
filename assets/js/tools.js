/* Financial Engine and Interactive Widgets */
window.Guide = window.Guide || {};

(function (Guide) {
  "use strict";

  const { icon, fmt, ui } = Guide;

  /* Financial Math */
  const finance = {
    npv(rate, flows) {
      return flows.reduce((sum, cash, t) => sum + cash / Math.pow(1 + rate, t), 0);
    },
    irr(flows) {
      let low = -0.99;
      let high = 1.5;
      let fLow = this.npv(low, flows);
      const fHigh = this.npv(high, flows);
      if (!Number.isFinite(fLow) || fLow * fHigh > 0) return NaN;
      for (let i = 0; i < 200; i += 1) {
        const mid = (low + high) / 2;
        const fMid = this.npv(mid, flows);
        if (fLow * fMid <= 0) {
          high = mid;
        } else {
          low = mid;
          fLow = fMid;
        }
      }
      return (low + high) / 2;
    },
    annuityFactor(rate, years) {
      if (rate === 0) return years;
      return (1 - Math.pow(1 + rate, -years)) / rate;
    }
  };

  Guide.finance = finance;

  /* Fleet Case Model */
  const CASE_BASE = {
    vehicles: 60,
    chargers: 10,
    other: 5,
    revenue: 12.8,
    indexation: 0.02,
    opex: 3.0,
    inflation: 0.02,
    term: 12,
    batteryCost: 9,
    batteryYear: 7,
    residualPct: 0.15
  };

  const CASE_DEFAULT_FINANCING = { dscr: 1.3, gearing: 0.6, tenor: 9, rate: 0.05 };
  const CASE_NO_STRESS = { revenue: 0, opex: 0, batteryShift: 0, residual: 0, rateBp: 0 };

  const CASE_PRESETS = [
    { id: "base", label: "Base Case", stress: {} },
    { id: "battery", label: "Battery Two Years Earlier", stress: { batteryShift: -2 } },
    { id: "residual", label: "Residual −20%", stress: { residual: -0.2 } },
    { id: "revenue", label: "Revenue −10%", stress: { revenue: -0.1 } },
    { id: "opex", label: "Opex +10%", stress: { opex: 0.1 } },
    { id: "rates", label: "Rates +100 bp", stress: { rateBp: 100 } },
    { id: "downside", label: "Downside Scenario", stress: { revenue: -0.1, opex: 0.05, batteryShift: -2 } }
  ];

  function runCase(financing, stressInput) {
    const p = CASE_BASE;
    const s = Object.assign({}, CASE_NO_STRESS, stressInput);
    const capex = p.vehicles + p.chargers + p.other;
    const tenor = Math.min(financing.tenor, p.term);
    const stressedBatteryYear = Math.max(2, p.batteryYear + s.batteryShift);

    /* Maintenance Reserve Contributions Spread to the Replacement Year */
    const reserve = (year, replacementYear) => (year <= replacementYear ? p.batteryCost / replacementYear : 0);

    const baseCfads = [0];
    const cfads = [0];
    for (let t = 1; t <= p.term; t += 1) {
      const revenue = p.revenue * Math.pow(1 + p.indexation, t - 1);
      const opex = p.opex * Math.pow(1 + p.inflation, t - 1);
      baseCfads[t] = revenue - opex - reserve(t, p.batteryYear);
      cfads[t] = revenue * (1 + s.revenue) - opex * (1 + s.opex) - reserve(t, stressedBatteryYear);
    }

    /* Debt Sizing on Base-Case CFADS */
    let capacity = 0;
    for (let t = 1; t <= tenor; t += 1) {
      capacity += baseCfads[t] / financing.dscr / Math.pow(1 + financing.rate, t);
    }
    const gearingCap = financing.gearing * capex;
    const debt = Math.min(capacity, gearingCap);
    const binding = capacity <= gearingCap ? "DSCR" : "Gearing";
    const scale = debt / capacity;

    /* Sculpted Schedule With Optional Floating-Rate Shock */
    const stressedRate = financing.rate + s.rateBp / 10000;
    const rows = [];
    let balance = debt;
    let llcrNumerator = 0;
    for (let t = 1; t <= p.term; t += 1) {
      const row = { year: t, cfads: cfads[t], opening: balance, interest: 0, principal: 0, debtService: 0, dscr: NaN };
      if (t <= tenor) {
        const sculpted = (scale * baseCfads[t]) / financing.dscr;
        row.principal = sculpted - balance * financing.rate;
        row.interest = balance * stressedRate;
        row.debtService = row.principal + row.interest;
        row.dscr = cfads[t] / row.debtService;
        llcrNumerator += cfads[t] / Math.pow(1 + financing.rate, t);
        balance -= row.principal;
      }
      row.closing = Math.max(0, balance);
      rows.push(row);
    }

    /* Returns */
    const residual = p.vehicles * p.residualPct * (1 + s.residual);
    const equity = capex - debt;
    const equityFlows = [-equity];
    const projectFlows = [-capex];
    rows.forEach((row) => {
      const exit = row.year === p.term ? residual : 0;
      row.equity = row.cfads - row.debtService + exit;
      equityFlows.push(row.equity);
      projectFlows.push(row.cfads + exit);
    });

    const coverage = rows.filter((row) => row.year <= tenor);
    const dscrs = coverage.map((row) => row.dscr);
    const minDscr = Math.min(...dscrs);
    const minYear = coverage[dscrs.indexOf(minDscr)].year;
    const distributions = equityFlows.slice(1).reduce((sum, value) => sum + value, 0);

    return {
      capex,
      capacity,
      gearingCap,
      debt,
      equity,
      binding,
      tenor,
      residual,
      rows,
      minDscr,
      minYear,
      avgDscr: dscrs.reduce((sum, value) => sum + value, 0) / dscrs.length,
      llcr: llcrNumerator / debt,
      projectIrr: finance.irr(projectFlows),
      equityIrr: finance.irr(equityFlows),
      moic: distributions / equity
    };
  }

  Guide.runCase = runCase;

  /* Grouped Bar Chart With Hover Tooltip */
  function barPath(x, y, width, height, radius) {
    if (height <= 0) return "";
    const r = Math.min(radius, width / 2, height);
    return `M${x},${y + height}V${y + r}Q${x},${y} ${x + r},${y}H${x + width - r}Q${x + width},${y} ${x + width},${y + r}V${y + height}Z`;
  }

  function renderBarChart(container, rows, options) {
    const width = 720;
    const height = 270;
    const margin = { top: 14, right: 8, bottom: 30, left: 40 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;
    const maxValue = Math.max(1, ...rows.map((row) => Math.max(row.a, row.b)));

    /* Round Axis Steps Such as 1, 2, 5 or 10 */
    const rawStep = maxValue / 4;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const step = [1, 2, 5, 10].map((factor) => factor * magnitude).find((candidate) => candidate >= rawStep);
    const ticks = Math.ceil(maxValue / step);
    const niceMax = step * ticks;
    const groupW = plotW / rows.length;
    const barW = Math.max(6, Math.min(22, (groupW - 10) / 2));
    const y = (value) => margin.top + plotH - (Math.max(0, value) / niceMax) * plotH;

    let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${options.label}">`;
    for (let i = 0; i <= ticks; i += 1) {
      const value = step * i;
      const yy = y(value);
      svg += `<line class="grid-line" x1="${margin.left}" x2="${width - margin.right}" y1="${yy}" y2="${yy}"></line>`;
      svg += `<text class="axis-label" x="${margin.left - 8}" y="${yy + 4}" text-anchor="end">${value.toFixed(step < 1 ? 1 : 0)}</text>`;
    }

    rows.forEach((row, i) => {
      const gx = margin.left + i * groupW;
      const cx = gx + groupW / 2;
      svg += `<rect class="hover-bg" data-index="${i}" x="${gx}" y="${margin.top}" width="${groupW}" height="${plotH}" rx="6"></rect>`;
      const ax = cx - barW - 1;
      const bx = cx + 1;
      svg += `<path class="bar-1" d="${barPath(ax, y(row.a), barW, margin.top + plotH - y(row.a), 4)}"></path>`;
      svg += `<path class="bar-2" d="${barPath(bx, y(row.b), barW, margin.top + plotH - y(row.b), 4)}"></path>`;
      svg += `<text class="axis-label" x="${cx}" y="${height - 10}" text-anchor="middle">${row.label}</text>`;
    });

    /* Transparent Hit Areas Above the Bars */
    rows.forEach((row, i) => {
      svg += `<rect class="hit" data-index="${i}" x="${margin.left + i * groupW}" y="${margin.top}" width="${groupW}" height="${plotH}"></rect>`;
    });
    svg += "</svg>";

    container.innerHTML = `<div class="chart">${svg}<div class="chart-tooltip" role="status"></div></div>`;

    const chart = container.querySelector(".chart");
    const tooltip = container.querySelector(".chart-tooltip");
    const hits = container.querySelectorAll(".hit");
    const backgrounds = container.querySelectorAll(".hover-bg");

    function show(index, event) {
      const row = rows[index];
      backgrounds.forEach((bg) => bg.classList.toggle("is-active", Number(bg.dataset.index) === index));
      tooltip.innerHTML = options.tooltip(row);
      tooltip.classList.add("is-visible");
      const box = chart.getBoundingClientRect();
      const tipW = tooltip.offsetWidth;
      let left = event.clientX - box.left + 14;
      if (left + tipW > box.width) left = event.clientX - box.left - tipW - 14;
      tooltip.style.left = `${Math.max(0, left)}px`;
      const maxTop = Math.max(0, box.height - tooltip.offsetHeight);
      tooltip.style.top = `${Math.min(maxTop, Math.max(0, event.clientY - box.top - 30))}px`;
    }

    hits.forEach((hit) => {
      hit.addEventListener("pointermove", (event) => show(Number(hit.dataset.index), event));
      hit.addEventListener("pointerdown", (event) => show(Number(hit.dataset.index), event));
      hit.addEventListener("pointerleave", () => {
        tooltip.classList.remove("is-visible");
        backgrounds.forEach((bg) => bg.classList.remove("is-active"));
      });
    });
  }

  /* SPV Structure Diagram */
  function mountSpv(node) {
    node.innerHTML = `
      <figure class="spv" aria-label="Project finance structure around an SPV">
        <div class="spv-node spv-top"><strong>Equity Investors</strong><span>Equity ↓ · Distributions ↑</span></div>
        <div class="spv-node spv-left"><strong>Lenders</strong><span>Debt → · Debt service ←</span></div>
        <div class="spv-node spv-core"><strong>SPV</strong><span>Owns the fleet and its chargers</span></div>
        <div class="spv-node spv-right"><strong>Operator or Authority</strong><span>Lease or service payments →</span></div>
        <div class="spv-node spv-b1"><strong>Manufacturers</strong><span>Supply and warranties</span></div>
        <div class="spv-node spv-b2"><strong>O&amp;M Providers</strong><span>Maintenance and availability</span></div>
        <div class="spv-node spv-b3"><strong>Insurers</strong><span>Damage and loss cover</span></div>
        <figcaption>Contracts surround the SPV; cash flows from the customer service the debt first, and equity receives the residual.</figcaption>
      </figure>`;
  }

  /* Waterfall Simulator */
  function mountWaterfall(node) {
    const SENIOR_INTEREST = 3;
    const SENIOR_PRINCIPAL = 7;
    const DSRA_TOP_UP = 0.5;
    const SUB_DEBT = 1;
    const LOCK_UP = 1.15;

    node.innerHTML = `
      <div class="card">
        ${ui.range("wf-cfads", "CFADS for the period", 6, 16, 0.1, 13, "€13.0m")}
        <div class="wf" id="wf-rows"></div>
        <p class="small muted" id="wf-status" style="margin-top:0.9rem" aria-live="polite"></p>
      </div>`;

    const input = node.querySelector("#wf-cfads");
    const output = node.querySelector("#wf-cfads-out");
    const rowsHost = node.querySelector("#wf-rows");
    const status = node.querySelector("#wf-status");

    function row(label, paid, required, scale, state, kind) {
      const width = scale > 0 ? Math.min(100, (paid / scale) * 100) : 0;
      const amount = required === null ? fmt.eur(paid) : `${fmt.eur(paid)} / ${fmt.eur(required)}`;
      return `<div class="wf-row" data-state="${state}" data-kind="${kind || ""}"><span>${label}</span><div class="wf-track"><div class="wf-fill" style="width:${width}%"></div></div><span class="wf-amt">${amount}</span></div>`;
    }

    function update() {
      const cfads = Number(input.value);
      output.textContent = fmt.eur(cfads);
      ui.syncRangeFill(input);

      let cash = cfads;
      const interest = Math.min(cash, SENIOR_INTEREST);
      cash -= interest;
      const principal = Math.min(cash, SENIOR_PRINCIPAL);
      cash -= principal;
      const dsra = Math.min(cash, DSRA_TOP_UP);
      cash -= dsra;

      const dscr = cfads / (SENIOR_INTEREST + SENIOR_PRINCIPAL);
      const lockedUp = dscr < LOCK_UP;
      const sub = lockedUp ? 0 : Math.min(cash, SUB_DEBT);
      const trapped = lockedUp ? cash : 0;
      const equity = lockedUp ? 0 : cash - sub;

      let html = "";
      html += row("Senior interest", interest, SENIOR_INTEREST, SENIOR_INTEREST, interest < SENIOR_INTEREST ? "short" : "paid");
      html += row("Senior principal", principal, SENIOR_PRINCIPAL, SENIOR_PRINCIPAL, principal < SENIOR_PRINCIPAL ? "short" : "paid");
      html += row("DSRA top-up", dsra, DSRA_TOP_UP, DSRA_TOP_UP, dsra < DSRA_TOP_UP ? "short" : "paid");
      if (lockedUp) {
        html += row("Cash trapped by lock-up", trapped, null, 4.5, "trapped");
      } else {
        html += row("Subordinated debt", sub, SUB_DEBT, SUB_DEBT, sub < SUB_DEBT ? "short" : "paid");
        html += row("Equity distributions", equity, null, 4.5, "paid", "equity");
      }
      rowsHost.innerHTML = html;

      if (dscr < 1) {
        status.innerHTML = `<span class="status-chip" data-status="critical">${icon("alert")}DSCR ${fmt.mult(dscr)}</span> Senior debt service is not fully covered, so the DSRA must be drawn and a default looms.`;
      } else if (lockedUp) {
        status.innerHTML = `<span class="status-chip" data-status="warning">${icon("alert")}DSCR ${fmt.mult(dscr)}</span> Below the ${LOCK_UP.toFixed(2)}x lock-up, so subordinated payments and distributions stop and cash stays in the SPV.`;
      } else {
        status.innerHTML = `<span class="status-chip" data-status="good">${icon("check")}DSCR ${fmt.mult(dscr)}</span> Distribution test passed, so cash flows down to shareholders.`;
      }
    }

    input.addEventListener("input", update);
    update();
  }

  /* Total Cost of Ownership Calculator */
  function mountTco(node) {
    const fields = [
      ["evPrice", "EV purchase (€k)", 450],
      ["dPrice", "Diesel purchase (€k)", 250],
      ["charger", "Charger share per EV (€k)", 50],
      ["battery", "EV battery replacement (€k)", 80],
      ["evUse", "EV energy use (kWh/km)", 1.2],
      ["dUse", "Diesel use (L/km)", 0.38],
      ["evPriceEnergy", "Electricity (€/kWh)", 0.2],
      ["dPriceEnergy", "Diesel (€/L)", 1.6],
      ["evMaint", "EV maintenance (€/km)", 0.2],
      ["dMaint", "Diesel maintenance (€/km)", 0.32],
      ["residual", "Residual value (% of purchase)", 10],
      ["rate", "Discount rate (%)", 6]
    ];

    node.innerHTML = `
      <div class="card">
        <div class="chart-head"><h3>Illustrative TCO: Electric Versus Diesel City Bus</h3><span class="pill">Editable inputs</span></div>
        <div class="grid grid-2" style="margin-top:0.75rem">
          ${ui.range("tco-km", "Annual distance", 20000, 120000, 1000, 60000, "60,000 km")}
          ${ui.range("tco-years", "Holding period", 8, 15, 1, 12, "12 years")}
        </div>
        <details class="accordion" style="margin-top:1rem">
          <summary>Adjust Unit Assumptions ${icon("chevronDown", "chev")}</summary>
          <div class="accordion-body">
            <div class="grid grid-3">
              ${fields.map(([id, label, value]) => `<div class="field"><label for="tco-${id}">${label}</label><input class="input" type="number" step="any" min="0" id="tco-${id}" value="${value}"></div>`).join("")}
            </div>
          </div>
        </details>
        <div class="kpis" style="margin-top:1rem" id="tco-kpis"></div>
        <p class="small muted" id="tco-note" style="margin:0.9rem 0 0" aria-live="polite"></p>
      </div>`;

    const read = (id) => Number(node.querySelector(`#tco-${id}`).value) || 0;
    const kmInput = node.querySelector("#tco-km");
    const yearsInput = node.querySelector("#tco-years");

    function compute() {
      const km = Number(kmInput.value);
      const years = Number(yearsInput.value);
      node.querySelector("#tco-km-out").textContent = `${km.toLocaleString("en-GB")} km`;
      node.querySelector("#tco-years-out").textContent = `${years} years`;
      ui.syncRangeFill(kmInput);
      ui.syncRangeFill(yearsInput);

      const rate = read("rate") / 100;
      const factor = finance.annuityFactor(rate, years);
      const exitDiscount = Math.pow(1 + rate, years);
      const batteryYear = Math.round(years / 2);

      const evRunPerKm = read("evUse") * read("evPriceEnergy") + read("evMaint");
      const dRunPerKm = read("dUse") * read("dPriceEnergy") + read("dMaint");

      const evFixed =
        (read("evPrice") + read("charger")) * 1000 +
        (read("battery") * 1000) / Math.pow(1 + rate, batteryYear) -
        (read("evPrice") * 1000 * read("residual")) / 100 / exitDiscount;
      const dFixed = read("dPrice") * 1000 - (read("dPrice") * 1000 * read("residual")) / 100 / exitDiscount;

      const evTco = evFixed + evRunPerKm * km * factor;
      const dTco = dFixed + dRunPerKm * km * factor;
      const totalKm = km * years;
      const slope = (evRunPerKm - dRunPerKm) * factor;
      const breakeven = slope < 0 ? (evFixed - dFixed) / -slope : NaN;

      const k = (value) => `${value < 0 ? "−" : ""}€${Math.abs(Math.round(value / 1000)).toLocaleString("en-GB")}k`;
      node.querySelector("#tco-kpis").innerHTML = `
        <div class="kpi"><span class="kpi-label">EV TCO (present value)</span><span class="kpi-value">${k(evTco)}</span><span class="kpi-delta flat">€${(evTco / totalKm).toFixed(2)} per km</span></div>
        <div class="kpi"><span class="kpi-label">Diesel TCO (present value)</span><span class="kpi-value">${k(dTco)}</span><span class="kpi-delta flat">€${(dTco / totalKm).toFixed(2)} per km</span></div>
        <div class="kpi"><span class="kpi-label">EV advantage</span><span class="kpi-value">${k(dTco - evTco)}</span><span class="kpi-delta ${dTco >= evTco ? "up" : "down"}">${dTco >= evTco ? "EV cheaper" : "Diesel cheaper"}</span></div>
        <div class="kpi"><span class="kpi-label">Breakeven distance</span><span class="kpi-value">${Number.isFinite(breakeven) && breakeven > 0 ? `${Math.round(breakeven / 1000)}k km` : "n/a"}</span><span class="kpi-delta flat">per year</span></div>`;

      node.querySelector("#tco-note").textContent =
        `Running cost: €${evRunPerKm.toFixed(2)} per km electric versus €${dRunPerKm.toFixed(2)} per km diesel. Battery replacement assumed in year ${batteryYear}. Figures are illustrative and exclude subsidies and carbon costs as well as low-emission-zone access, any of which can shift the result.`;
    }

    node.querySelectorAll("input").forEach((input) => input.addEventListener("input", compute));
    compute();
  }

  /* Widget Mounting */
  const WIDGETS = { spv: mountSpv, waterfall: mountWaterfall, tco: mountTco };

  Guide.mountWidgets = function mountWidgets(root) {
    root.querySelectorAll("[data-widget]").forEach((node) => {
      const mount = WIDGETS[node.dataset.widget];
      if (mount) mount(node);
    });
  };

  /* Fleet Case Lab View */
  Guide.views = Guide.views || {};

  Guide.views.caseLab = function caseLab(view) {
    const saved = Guide.store.get("caseLab", null);
    const state = {
      financing: Object.assign({}, CASE_DEFAULT_FINANCING, saved && saved.financing),
      stress: Object.assign({}, CASE_NO_STRESS, saved && saved.stress),
      showTable: false
    };

    view.classList.add("is-wide");
    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("flask")} Practice</span>
        <h1>Fleet Case Lab</h1>
        <p class="lede">Neot-style case: an SPV buys an electric bus fleet for €75m under a twelve-year service contract. Size the debt, then stress the assumptions and watch coverage and returns respond exactly as an Investment Director would expect you to explain.</p>
      </header>

      <div class="toolbar">
        <div class="segmented" role="group" aria-label="Case presets" id="case-presets">
          ${CASE_PRESETS.map((preset) => `<button type="button" data-preset="${preset.id}">${preset.label}</button>`).join("")}
        </div>
      </div>

      <div class="lab">
        <div class="lab-controls">
          <fieldset>
            <legend>Financing Structure</legend>
            ${ui.range("cf-dscr", "Target DSCR", 1.1, 1.6, 0.05, state.financing.dscr, "")}
            ${ui.range("cf-gearing", "Gearing cap", 0.4, 0.8, 0.05, state.financing.gearing, "")}
            ${ui.range("cf-tenor", "Debt tenor (years)", 6, 12, 1, state.financing.tenor, "")}
            ${ui.range("cf-rate", "All-in interest rate", 0.02, 0.09, 0.0025, state.financing.rate, "")}
          </fieldset>
          <fieldset>
            <legend>Stress Tests</legend>
            ${ui.range("cs-revenue", "Revenue change", -0.2, 0.1, 0.01, state.stress.revenue, "")}
            ${ui.range("cs-opex", "Opex change", -0.1, 0.2, 0.01, state.stress.opex, "")}
            ${ui.range("cs-battery", "Battery replacement shift (years)", -4, 2, 1, state.stress.batteryShift, "")}
            ${ui.range("cs-residual", "Residual value change", -0.5, 0.2, 0.05, state.stress.residual, "")}
            ${ui.range("cs-rate", "Floating rate shock (unhedged)", 0, 300, 25, state.stress.rateBp, "")}
          </fieldset>
          <button type="button" class="btn btn-ghost" id="case-reset">${icon("refresh")} Reset All Inputs</button>
        </div>

        <div class="lab-output">
          <div class="kpis" id="case-kpis"></div>
          <div class="card" id="case-insight" aria-live="polite"></div>
          <div class="card chart-card">
            <div class="chart-head">
              <h3>CFADS Versus Debt Service (€m)</h3>
              <ul class="legend">
                <li><span class="swatch" style="background:var(--series-1)"></span>CFADS</li>
                <li><span class="swatch" style="background:var(--series-2)"></span>Debt service</li>
              </ul>
            </div>
            <div id="case-chart" class="chart-scroll"></div>
            <div class="btn-row" style="margin-top:0.5rem">
              <button type="button" class="btn btn-ghost btn-sm" id="case-table-toggle" aria-expanded="false">${icon("table")} Show Yearly Table</button>
            </div>
            <div id="case-table" hidden></div>
          </div>
          <details class="accordion">
            <summary>Model Assumptions ${icon("chevronDown", "chev")}</summary>
            <div class="accordion-body">
              <ul>
                <li>Uses: €60m vehicles plus €10m chargers and €5m other costs, totalling €75m.</li>
                <li>Contract revenue of €12.8m in year one, indexed at 2% a year; opex of €3.0m inflating at 2%.</li>
                <li>Battery replacement of €9m in year 7, funded through equal annual transfers to a maintenance reserve.</li>
                <li>Residual value equal to 15% of vehicle cost, received at the end of year 12.</li>
                <li>Debt sized on base-case CFADS and sculpted; stresses then run against that fixed debt, as at financial close.</li>
                <li>Rate shocks assume unhedged floating debt. Taxes and working capital are excluded for clarity.</li>
              </ul>
            </div>
          </details>
        </div>
      </div>`;

    const bindings = [
      ["cf-dscr", "financing", "dscr", (v) => `${v.toFixed(2)}x`],
      ["cf-gearing", "financing", "gearing", (v) => `${Math.round(v * 100)}%`],
      ["cf-tenor", "financing", "tenor", (v) => `${v} years`],
      ["cf-rate", "financing", "rate", (v) => `${(v * 100).toFixed(2)}%`],
      ["cs-revenue", "stress", "revenue", (v) => fmt.signed(v * 100, 0, "%")],
      ["cs-opex", "stress", "opex", (v) => fmt.signed(v * 100, 0, "%")],
      ["cs-battery", "stress", "batteryShift", (v) => (v === 0 ? "On plan" : `${v > 0 ? "+" : "−"}${Math.abs(v)} yr`)],
      ["cs-residual", "stress", "residual", (v) => fmt.signed(v * 100, 0, "%")],
      ["cs-rate", "stress", "rateBp", (v) => `+${v} bp`]
    ];

    function syncInputs() {
      bindings.forEach(([id, group, key, format]) => {
        const input = view.querySelector(`#${id}`);
        input.value = state[group][key];
        view.querySelector(`#${id}-out`).textContent = format(Number(input.value));
        ui.syncRangeFill(input);
      });
    }

    function activePreset() {
      return CASE_PRESETS.find((preset) => {
        const target = Object.assign({}, CASE_NO_STRESS, preset.stress);
        return Object.keys(target).every((key) => Math.abs(target[key] - state.stress[key]) < 1e-9);
      });
    }

    function delta(value, base, digits, unit, higherIsBetter = true) {
      const diff = value - base;
      if (Math.abs(diff) < Math.pow(10, -digits) / 2) return `<span class="kpi-delta flat">No change</span>`;
      const good = higherIsBetter ? diff > 0 : diff < 0;
      return `<span class="kpi-delta ${good ? "up" : "down"}">${fmt.signed(diff, digits, unit)} vs base</span>`;
    }

    function render() {
      const result = runCase(state.financing, state.stress);
      const base = runCase(state.financing, CASE_NO_STRESS);

      const preset = activePreset();
      view.querySelectorAll("#case-presets button").forEach((button) => {
        button.setAttribute("aria-pressed", String(Boolean(preset && preset.id === button.dataset.preset)));
      });

      const minStatus = result.minDscr < 1 ? "critical" : result.minDscr < 1.15 ? "warning" : "good";
      const statusText = { critical: "Below 1.00x", warning: "Near lock-up", good: "Comfortable" }[minStatus];

      view.querySelector("#case-kpis").innerHTML = `
        <div class="kpi"><span class="kpi-label">Senior debt</span><span class="kpi-value">${fmt.eur(result.debt)}</span><span class="kpi-delta flat">${result.binding} constraint binds</span></div>
        <div class="kpi"><span class="kpi-label">Equity</span><span class="kpi-value">${fmt.eur(result.equity)}</span><span class="kpi-delta flat">Gearing ${fmt.pct(result.debt / result.capex, 0)}</span></div>
        <div class="kpi"><span class="kpi-label">Minimum DSCR</span><span class="kpi-value">${fmt.mult(result.minDscr)}</span>${delta(result.minDscr, base.minDscr, 2, "x")}</div>
        <div class="kpi"><span class="kpi-label">LLCR at close</span><span class="kpi-value">${fmt.mult(result.llcr)}</span>${delta(result.llcr, base.llcr, 2, "x")}</div>
        <div class="kpi"><span class="kpi-label">Project IRR</span><span class="kpi-value">${fmt.pct(result.projectIrr)}</span>${delta(result.projectIrr * 100, base.projectIrr * 100, 1, " pts")}</div>
        <div class="kpi"><span class="kpi-label">Equity IRR</span><span class="kpi-value">${fmt.pct(result.equityIrr)}</span>${delta(result.equityIrr * 100, base.equityIrr * 100, 1, " pts")}</div>
        <div class="kpi"><span class="kpi-label">MOIC</span><span class="kpi-value">${fmt.mult(result.moic)}</span>${delta(result.moic, base.moic, 2, "x")}</div>
        <div class="kpi"><span class="kpi-label">Average DSCR</span><span class="kpi-value">${fmt.mult(result.avgDscr)}</span>${delta(result.avgDscr, base.avgDscr, 2, "x")}</div>`;

      const isBase = Object.keys(CASE_NO_STRESS).every((key) => state.stress[key] === 0);
      const insight = isBase
        ? `Debt of ${fmt.eur(result.debt)} is set by the ${result.binding.toLowerCase()} constraint: DSCR-based capacity is ${fmt.eur(result.capacity)} against a gearing cap of ${fmt.eur(result.gearingCap)}. Sculpting keeps coverage flat at ${fmt.mult(result.minDscr)}, leaving a ${12 - result.tenor}-year tail. Choose a preset or move a stress slider to see how each assumption propagates.`
        : `Minimum DSCR moves from ${fmt.mult(base.minDscr)} to ${fmt.mult(result.minDscr)}, reached in year ${result.minYear}. Equity IRR shifts from ${fmt.pct(base.equityIrr)} to ${fmt.pct(result.equityIrr)} while MOIC goes from ${fmt.mult(base.moic)} to ${fmt.mult(result.moic)}.${Math.abs(result.moic - base.moic) < 0.005 && Math.abs(result.equityIrr - base.equityIrr) > 0.0005 ? " Total cash is unchanged and only timing moves, which is exactly why MOIC alone can mislead." : ""}${Math.abs(result.minDscr - base.minDscr) < 0.005 && result.equityIrr < base.equityIrr ? " Coverage is untouched because the impact falls after debt maturity, so equity absorbs it entirely." : ""}`;

      view.querySelector("#case-insight").innerHTML = `
        <div class="chart-head" style="margin-bottom:0.4rem"><h3>Reading the Result</h3><span class="status-chip" data-status="${minStatus}">${icon(minStatus === "good" ? "check" : "alert")}${statusText}</span></div>
        <p style="margin:0">${insight}</p>`;

      renderBarChart(
        view.querySelector("#case-chart"),
        result.rows.map((row) => ({ label: `Y${row.year}`, a: row.cfads, b: row.debtService, row })),
        {
          label: "Grouped bar chart of CFADS and debt service by year",
          tooltip: (item) => `
            <div class="tt-title">Year ${item.row.year}</div>
            <div class="tt-row"><span><span class="swatch" style="width:9px;height:9px;border-radius:2px;background:var(--series-1)"></span>CFADS</span><span>${fmt.eur(item.row.cfads, 2)}</span></div>
            <div class="tt-row"><span><span class="swatch" style="width:9px;height:9px;border-radius:2px;background:var(--series-2)"></span>Debt service</span><span>${fmt.eur(item.row.debtService, 2)}</span></div>
            <div class="tt-row"><span>DSCR</span><span>${Number.isFinite(item.row.dscr) ? fmt.mult(item.row.dscr) : "Repaid"}</span></div>
            <div class="tt-row"><span>Equity cash flow</span><span>${fmt.eur(item.row.equity, 2)}</span></div>`
        }
      );

      view.querySelector("#case-table").innerHTML = `
        <div class="table-wrap">
          <table>
            <thead><tr><th>Year</th><th class="num">CFADS</th><th class="num">Interest</th><th class="num">Principal</th><th class="num">Debt Service</th><th class="num">DSCR</th><th class="num">Closing Debt</th><th class="num">Equity CF</th></tr></thead>
            <tbody>
              <tr><td>0</td><td class="num">–</td><td class="num">–</td><td class="num">–</td><td class="num">–</td><td class="num">–</td><td class="num">${fmt.num(result.debt, 2)}</td><td class="num">${fmt.num(-result.equity, 2)}</td></tr>
              ${result.rows
                .map(
                  (row) => `<tr><td>${row.year}</td><td class="num">${fmt.num(row.cfads, 2)}</td><td class="num">${fmt.num(row.interest, 2)}</td><td class="num">${fmt.num(row.principal, 2)}</td><td class="num">${fmt.num(row.debtService, 2)}</td><td class="num">${Number.isFinite(row.dscr) ? fmt.mult(row.dscr) : "–"}</td><td class="num">${fmt.num(row.closing, 2)}</td><td class="num">${fmt.num(row.equity, 2)}</td></tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <p class="formula-note" style="margin-top:0">Figures in €m. Year 12 equity cash flow includes the residual value of ${fmt.eur(result.residual)}.</p>`;

      Guide.store.set("caseLab", { financing: state.financing, stress: state.stress });
    }

    bindings.forEach(([id, group, key, format]) => {
      const input = view.querySelector(`#${id}`);
      input.addEventListener("input", () => {
        state[group][key] = Number(input.value);
        view.querySelector(`#${id}-out`).textContent = format(state[group][key]);
        ui.syncRangeFill(input);
        render();
      });
    });

    view.querySelector("#case-presets").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-preset]");
      if (!button) return;
      const preset = CASE_PRESETS.find((item) => item.id === button.dataset.preset);
      state.stress = Object.assign({}, CASE_NO_STRESS, preset.stress);
      syncInputs();
      render();
    });

    view.querySelector("#case-reset").addEventListener("click", () => {
      state.financing = Object.assign({}, CASE_DEFAULT_FINANCING);
      state.stress = Object.assign({}, CASE_NO_STRESS);
      syncInputs();
      render();
    });

    const toggle = view.querySelector("#case-table-toggle");
    toggle.addEventListener("click", () => {
      const table = view.querySelector("#case-table");
      table.hidden = !table.hidden;
      toggle.setAttribute("aria-expanded", String(!table.hidden));
      toggle.innerHTML = `${icon("table")} ${table.hidden ? "Show" : "Hide"} Yearly Table`;
    });

    syncInputs();
    render();
  };

  /* Returns Lab View */
  Guide.views.returnsLab = function returnsLab(view) {
    view.classList.add("is-wide");
    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("calc")} Practice</span>
        <h1>Returns Lab</h1>
        <p class="lede">Two quick experiments behind classic interview questions: why MOIC and IRR can disagree, and why leverage amplifies outcomes in both directions.</p>
      </header>

      <section class="section">
        <h2>MOIC Versus IRR</h2>
        <div class="lab">
          <div class="lab-controls">
            <fieldset>
              <legend>Single-Exit Investment</legend>
              ${ui.range("rl-invest", "Equity invested", 10, 100, 5, 50, "")}
              ${ui.range("rl-proceeds", "Exit proceeds", 10, 300, 5, 100, "")}
              ${ui.range("rl-years", "Holding period", 1, 20, 1, 3, "")}
            </fieldset>
          </div>
          <div class="lab-output">
            <div class="kpis" id="rl-kpis" style="grid-template-columns:repeat(2,minmax(0,1fr))"></div>
            <div class="card"><p style="margin:0" id="rl-note"></p></div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Leverage on a €100 Asset Held One Year</h2>
        <div class="lab">
          <div class="lab-controls">
            <fieldset>
              <legend>Assumptions</legend>
              ${ui.range("lv-exit", "Exit value", 60, 140, 1, 120, "")}
              ${ui.range("lv-debt", "Debt share", 0, 0.8, 0.05, 0.6, "")}
              ${ui.range("lv-rate", "Interest rate", 0, 0.1, 0.005, 0.05, "")}
            </fieldset>
          </div>
          <div class="lab-output">
            <div class="kpis" id="lv-kpis"></div>
            <div class="card"><p style="margin:0" id="lv-note"></p></div>
          </div>
        </div>
      </section>`;

    const fields = ["rl-invest", "rl-proceeds", "rl-years", "lv-exit", "lv-debt", "lv-rate"];
    const value = (id) => Number(view.querySelector(`#${id}`).value);

    function render() {
      fields.forEach((id) => ui.syncRangeFill(view.querySelector(`#${id}`)));

      const invest = value("rl-invest");
      const proceeds = value("rl-proceeds");
      const years = value("rl-years");
      view.querySelector("#rl-invest-out").textContent = `€${invest}m`;
      view.querySelector("#rl-proceeds-out").textContent = `€${proceeds}m`;
      view.querySelector("#rl-years-out").textContent = `${years} ${years === 1 ? "year" : "years"}`;
      const moic = proceeds / invest;
      const irr = Math.pow(moic, 1 / years) - 1;
      view.querySelector("#rl-kpis").innerHTML = `
        <div class="kpi"><span class="kpi-label">MOIC</span><span class="kpi-value">${fmt.mult(moic)}</span></div>
        <div class="kpi"><span class="kpi-label">IRR</span><span class="kpi-value">${fmt.pct(irr)}</span></div>`;
      view.querySelector("#rl-note").textContent =
        `Holding the same ${fmt.mult(moic)} multiple, IRR would be ${fmt.pct(Math.pow(moic, 1 / 3) - 1)} over three years but ${fmt.pct(Math.pow(moic, 1 / 15) - 1)} over fifteen. MOIC measures how much; IRR measures how fast.`;

      const exit = value("lv-exit");
      const debtShare = value("lv-debt");
      const rate = value("lv-rate");
      view.querySelector("#lv-exit-out").textContent = `€${exit}`;
      view.querySelector("#lv-debt-out").textContent = `${Math.round(debtShare * 100)}%`;
      view.querySelector("#lv-rate-out").textContent = `${(rate * 100).toFixed(1)}%`;

      const debt = 100 * debtShare;
      const equity = 100 - debt;
      const repayment = debt * (1 + rate);
      const residual = Math.max(0, exit - repayment);
      const unlevered = exit / 100 - 1;
      const levered = residual / equity - 1;

      view.querySelector("#lv-kpis").innerHTML = `
        <div class="kpi"><span class="kpi-label">Equity invested</span><span class="kpi-value">€${equity.toFixed(0)}</span></div>
        <div class="kpi"><span class="kpi-label">Debt repayment</span><span class="kpi-value">€${repayment.toFixed(1)}</span></div>
        <div class="kpi"><span class="kpi-label">Unlevered return</span><span class="kpi-value">${fmt.pct(unlevered)}</span></div>
        <div class="kpi"><span class="kpi-label">Levered equity return</span><span class="kpi-value">${fmt.pct(levered)}</span><span class="kpi-delta ${levered >= unlevered ? "up" : "down"}">${fmt.signed((levered - unlevered) * 100, 1, " pts")}</span></div>`;

      let note;
      if (exit < repayment) {
        note = `Exit value no longer covers the €${repayment.toFixed(1)} owed to lenders, so equity is wiped out and lenders take a loss. Seniority in action.`;
      } else if (unlevered > rate) {
        note = `Asset return of ${fmt.pct(unlevered)} beats the ${fmt.pct(rate)} cost of debt, so leverage lifts the equity return. Drop the exit value to see the same leverage magnify losses.`;
      } else {
        note = `Asset return of ${fmt.pct(unlevered)} falls short of the ${fmt.pct(rate)} cost of debt, so leverage now destroys equity return. Leverage redistributes outcomes; it does not create value.`;
      }
      view.querySelector("#lv-note").textContent = note;
    }

    fields.forEach((id) => view.querySelector(`#${id}`).addEventListener("input", render));
    render();
  };
})(window.Guide);

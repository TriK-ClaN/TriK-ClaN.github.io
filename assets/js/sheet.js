/* Spreadsheet Grid and Case Engine */
window.Guide = window.Guide || {};

(function (Guide) {
  "use strict";

  const { escapeHtml } = Guide;

  /* Column Helpers */
  const letter = (index) => String.fromCharCode(64 + index);
  const splitAddress = (address) => {
    const match = /^([A-Z]+)(\d+)$/.exec(address);
    return match ? { col: match[1], row: Number(match[2]) } : null;
  };

  /* Excel-Style Number Formatting */
  function excelFormat(value, fmt) {
    if (value === "" || value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    const fixed = (digits) =>
      Math.abs(value).toLocaleString("en-GB", { minimumFractionDigits: digits, maximumFractionDigits: digits });
    switch (fmt) {
      case "eur":
        if (Math.abs(value) < 0.0005) return "–";
        return value < 0 ? `(${fixed(3)})` : fixed(3);
      case "eur0":
        return `${value < 0 ? "−" : ""}${fixed(0)}`;
      case "pct":
        return `${(value * 100).toFixed(1)}%`;
      case "pct2":
        return `${(value * 100).toFixed(2)}%`;
      case "x":
        return `${value.toFixed(2)}x`;
      case "fac":
        return value.toFixed(4);
      case "int":
      case "flag":
        return String(Math.round(value));
      default:
        return String(value);
    }
  }

  Guide.excelFormat = excelFormat;

  /* Row Layout for the Model and Inputs Sheets */
  function modelLayout(data) {
    const byRow = new Map();
    byRow.set(1, { kind: "title", text: data.title });
    byRow.set(2, { kind: "note", text: "€ Millions Unless Stated. Inflows Positive, Outflows Negative." });
    data.rows.forEach((row) => byRow.set(row.row, row.section ? { kind: "section", text: row.section } : { kind: "row", spec: row }));
    if (data.outputs.length) {
      byRow.set(data.outputs[0].row - 1, { kind: "section", text: "Key Outputs" });
      data.outputs.forEach((output) => byRow.set(output.row, { kind: "output", spec: output }));
    }
    const last = Math.max(...byRow.keys());
    return { byRow, last };
  }

  function inputsLayout(data) {
    const byRow = new Map();
    byRow.set(1, { kind: "title", text: "Inputs" });
    byRow.set(2, { kind: "note", text: "Blue Values Are Hard-Coded Inputs." });
    data.inputs.forEach((item) => byRow.set(item.row, item.section ? { kind: "section", text: item.section } : { kind: "input", spec: item }));
    return { byRow, last: Math.max(...byRow.keys()) };
  }

  /* Interactive Grid Component */
  Guide.createSheet = function createSheet(container, options) {
    const data = Guide.sheets[options.caseId];
    const yearCols = Array.from({ length: data.years + 1 }, (_, i) => letter(3 + i));
    const model = modelLayout(data);
    const inputs = inputsLayout(data);
    const inputValues = options.inputValues || {};

    const state = {
      sheet: "Model",
      visible: options.visible || null,
      target: options.target || null,
      selected: null
    };

    container.innerHTML = `
      <div class="xl">
        <div class="xl-bar">
          <span class="xl-name" data-role="name">A1</span>
          <span class="xl-fx" aria-hidden="true">fx</span>
          <code class="xl-formula" data-role="formula"></code>
        </div>
        <div class="xl-scroll" data-role="scroll" tabindex="0" aria-label="${escapeHtml(data.title)} spreadsheet"></div>
        <div class="xl-tabs" role="group" aria-label="Worksheets">
          <button type="button" data-sheet="Inputs">Inputs</button>
          <button type="button" data-sheet="Model">Model</button>
          <span class="xl-hint">Select a cell to see its formula.</span>
        </div>
      </div>`;

    const scroll = container.querySelector('[data-role="scroll"]');
    const nameBox = container.querySelector('[data-role="name"]');
    const formulaBox = container.querySelector('[data-role="formula"]');

    const isVisible = (address) => !state.visible || state.visible.has(address);

    function cellMarkup(address, fmt, extraClass) {
      const cell = data.cells[address];
      if (!cell) return `<td class="xl-cell${extraClass ? ` ${extraClass}` : ""}"></td>`;
      const classes = ["xl-cell", "is-filled"];
      if (extraClass) classes.push(extraClass);
      if (address === state.target) {
        classes.push("is-target");
        return `<td class="${classes.join(" ")}" data-addr="${address}"><span class="xl-ask">?</span></td>`;
      }
      if (!isVisible(address)) {
        classes.push("is-todo");
        return `<td class="${classes.join(" ")}" data-addr="${address}"></td>`;
      }
      const value = cell[1];
      if (typeof value === "number" && value < -0.0005) classes.push("is-negative");
      return `<td class="${classes.join(" ")}" data-addr="${address}">${escapeHtml(excelFormat(value, fmt))}</td>`;
    }

    function renderModel() {
      const head = `<tr><th class="xl-corner"></th><th class="xl-col xl-col-a">A</th><th class="xl-col xl-col-b">B</th>${yearCols.map((col) => `<th class="xl-col">${col}</th>`).join("")}</tr>`;
      const span = yearCols.length + 2;
      const body = [];
      for (let row = 1; row <= model.last; row += 1) {
        const entry = model.byRow.get(row);
        const num = `<th class="xl-rownum">${row}</th>`;
        if (!entry) {
          body.push(`<tr>${num}<td class="xl-label"></td><td class="xl-unit"></td>${yearCols.map(() => "<td class=\"xl-cell\"></td>").join("")}</tr>`);
        } else if (entry.kind === "title" || entry.kind === "note") {
          body.push(`<tr class="xl-${entry.kind}">${num}<td class="xl-label" colspan="${span}"><span>${escapeHtml(entry.text)}</span></td></tr>`);
        } else if (entry.kind === "section") {
          body.push(`<tr class="xl-section">${num}<td class="xl-label">${escapeHtml(entry.text)}</td><td colspan="${span - 1}"></td></tr>`);
        } else if (entry.kind === "output") {
          const spec = entry.spec;
          body.push(`<tr class="xl-output">${num}<td class="xl-label">${escapeHtml(spec.label)}</td><td class="xl-unit"></td>${cellMarkup(`C${row}`, spec.fmt)}${yearCols.slice(1).map(() => "<td class=\"xl-cell\"></td>").join("")}</tr>`);
        } else {
          const spec = entry.spec;
          const cells = yearCols.map((col) => cellMarkup(`${col}${row}`, spec.fmt, spec.id === "year" ? "is-year" : "")).join("");
          body.push(`<tr class="${spec.total ? "xl-total" : ""}">${num}<td class="xl-label">${escapeHtml(spec.label)}</td><td class="xl-unit">${escapeHtml(spec.unit)}</td>${cells}</tr>`);
        }
      }
      return `<table class="xl-grid"><thead>${head}</thead><tbody>${body.join("")}</tbody></table>`;
    }

    function renderInputs() {
      const head = `<tr><th class="xl-corner"></th><th class="xl-col xl-col-a">A</th><th class="xl-col">B</th><th class="xl-col xl-col-b">C</th></tr>`;
      const body = [];
      for (let row = 1; row <= inputs.last; row += 1) {
        const entry = inputs.byRow.get(row);
        const num = `<th class="xl-rownum">${row}</th>`;
        if (!entry) {
          body.push(`<tr>${num}<td class="xl-label"></td><td class="xl-cell"></td><td class="xl-unit"></td></tr>`);
        } else if (entry.kind === "title" || entry.kind === "note") {
          body.push(`<tr class="xl-${entry.kind}">${num}<td class="xl-label" colspan="3"><span>${escapeHtml(entry.text)}</span></td></tr>`);
        } else if (entry.kind === "section") {
          body.push(`<tr class="xl-section">${num}<td class="xl-label">${escapeHtml(entry.text)}</td><td colspan="2"></td></tr>`);
        } else {
          const spec = entry.spec;
          const value = Object.prototype.hasOwnProperty.call(inputValues, spec.key) ? inputValues[spec.key] : spec.value;
          const shown = value === null ? "Solve" : excelFormat(value, spec.fmt);
          body.push(`<tr>${num}<td class="xl-label">${escapeHtml(spec.label)}</td><td class="xl-cell is-filled is-input" data-addr="B${row}" data-input="${spec.key}">${escapeHtml(shown)}</td><td class="xl-unit">${escapeHtml(spec.unit)}</td></tr>`);
        }
      }
      return `<table class="xl-grid xl-inputs"><thead>${head}</thead><tbody>${body.join("")}</tbody></table>`;
    }

    function render() {
      const left = scroll.scrollLeft;
      scroll.innerHTML = state.sheet === "Model" ? renderModel() : renderInputs();
      scroll.scrollLeft = left;
      container.querySelectorAll("[data-sheet]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.sheet === state.sheet)));
      if (state.selected && state.selected.sheet === state.sheet) markSelected(state.selected.address);
      else showFormula(null);
    }

    function markSelected(address) {
      scroll.querySelectorAll(".is-selected").forEach((node) => node.classList.remove("is-selected"));
      const node = scroll.querySelector(`[data-addr="${address}"]`);
      if (node) node.classList.add("is-selected");
    }

    function showFormula(address) {
      if (!address) {
        nameBox.textContent = "A1";
        formulaBox.textContent = state.sheet === "Model" ? data.title : "Inputs";
        formulaBox.classList.remove("is-muted");
        return;
      }
      nameBox.textContent = address;
      if (state.sheet === "Inputs") {
        const node = scroll.querySelector(`[data-addr="${address}"]`);
        const key = node ? node.dataset.input : "";
        const spec = data.inputs.find((item) => item.key === key);
        const value = spec && Object.prototype.hasOwnProperty.call(inputValues, key) ? inputValues[key] : spec ? spec.value : "";
        formulaBox.textContent = value === null ? "Solved With Goal Seek" : String(value);
        formulaBox.classList.toggle("is-muted", value === null);
        return;
      }
      const cell = data.cells[address];
      if (address === state.target) {
        formulaBox.textContent = "Your Turn: Build This Cell";
        formulaBox.classList.add("is-muted");
      } else if (!isVisible(address)) {
        formulaBox.textContent = "Not Built Yet";
        formulaBox.classList.add("is-muted");
      } else {
        formulaBox.textContent = cell && cell[0] ? cell[0] : cell ? String(cell[1]) : "";
        formulaBox.classList.remove("is-muted");
      }
    }

    scroll.addEventListener("click", (event) => {
      const node = event.target.closest("[data-addr]");
      if (!node) return;
      state.selected = { sheet: state.sheet, address: node.dataset.addr };
      markSelected(node.dataset.addr);
      showFormula(node.dataset.addr);
      if (typeof options.onSelect === "function") options.onSelect(node.dataset.addr, state.sheet);
    });

    container.querySelector(".xl-tabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-sheet]");
      if (!button || button.dataset.sheet === state.sheet) return;
      state.sheet = button.dataset.sheet;
      scroll.scrollLeft = 0;
      render();
    });

    render();

    return {
      update(visible, target) {
        state.visible = visible;
        state.target = target;
        if (state.sheet !== "Model") state.sheet = "Model";
        render();
      },
      flash(addresses) {
        addresses.forEach((address) => {
          const node = scroll.querySelector(`[data-addr="${address}"]`);
          if (node) node.classList.add("is-new");
        });
      },
      focusCell(address) {
        const node = scroll.querySelector(`[data-addr="${address}"]`);
        if (!node) return;
        const target = node.offsetLeft - scroll.clientWidth / 2 + node.offsetWidth / 2;
        scroll.scrollTo({ left: Math.max(0, target), behavior: Guide.scrollBehavior() });
        state.selected = { sheet: "Model", address };
        markSelected(address);
        showFormula(address);
      },
      cellAddresses(rowIdOrAddress) {
        if (splitAddress(rowIdOrAddress)) return [rowIdOrAddress];
        const spec = data.rows.find((row) => row.id === rowIdOrAddress);
        if (!spec) return [];
        return yearCols.map((col) => `${col}${spec.row}`).filter((address) => data.cells[address]);
      }
    };
  };

  /* Internal Rate of Return by Bisection */
  function irr(flows) {
    const npv = (rate) => flows.reduce((sum, flow, t) => sum + flow / Math.pow(1 + rate, t), 0);
    let low = -0.95;
    let high = 1.5;
    if (npv(low) * npv(high) > 0) return NaN;
    for (let i = 0; i < 200; i += 1) {
      const mid = (low + high) / 2;
      if (npv(mid) > 0) low = mid;
      else high = mid;
    }
    return (low + high) / 2;
  }

  /* Bus Lease Engine Replicating the Excel Formulas */
  Guide.runBusCase = function runBusCase(p) {
    const capex = p.buses * p.busPrice + p.chargers * p.chargerPrice;
    const debt = p.gearing * capex;
    const equity = capex - debt;
    const payment = p.rate === 0 ? debt / p.tenor : (debt * p.rate) / (1 - Math.pow(1 + p.rate, -p.tenor));
    const depreciation = capex / p.term;
    const equityFlows = [-equity];
    const projectFlows = [-capex];
    const years = [];
    let balance = debt;

    for (let t = 1; t <= p.term; t += 1) {
      const factor = Math.pow(1 + p.index, t - 1);
      const battery = t === p.batteryYear ? p.battery : 0;
      const ebitda = p.rent * factor - p.opex * factor - battery;
      const inDebt = t <= p.tenor;
      const interest = inDebt ? balance * p.rate : 0;
      const principal = inDebt ? payment - interest : 0;
      const debtService = interest + principal;
      balance -= principal;
      const residual = t === p.term ? p.rvPct * capex : 0;
      const tax = Math.max(0, (ebitda - depreciation - interest + residual) * p.tax);
      const cfads = ebitda - tax;
      const dscr = debtService > 0 ? cfads / debtService : null;
      const unleveredTax = Math.max(0, (ebitda - depreciation + residual) * p.tax);
      equityFlows.push(cfads - debtService + residual);
      projectFlows.push(ebitda - unleveredTax + residual);
      years.push({ t, cfads, debtService, dscr });
    }

    const ratios = years.map((year) => year.dscr).filter((value) => value !== null);
    const distributions = equityFlows.slice(1).reduce((sum, flow) => sum + flow, 0);
    return {
      capex,
      debt,
      equity,
      payment,
      years,
      equityIrr: irr(equityFlows),
      projectIrr: irr(projectFlows),
      minDscr: ratios.length ? Math.min(...ratios) : NaN,
      avgDscr: ratios.length ? ratios.reduce((sum, value) => sum + value, 0) / ratios.length : NaN,
      moic: distributions / equity
    };
  };

  /* Base Inputs for the Bus Lease Case */
  Guide.busBase = {
    buses: 40,
    busPrice: 0.5,
    chargers: 20,
    chargerPrice: 0.1,
    term: 10,
    rent: 3.1,
    opex: 0.2,
    index: 0.02,
    rvPct: 0.1,
    tax: 0.25,
    gearing: 0.7,
    rate: 0.045,
    tenor: 9,
    battery: 0,
    batteryYear: 6
  };
})(window.Guide);

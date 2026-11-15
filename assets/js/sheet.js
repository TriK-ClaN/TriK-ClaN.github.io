/* Spreadsheet Grid and Case Engine */
window.Guide = window.Guide || {};

(function (Guide) {
  "use strict";

  const { escapeHtml } = Guide;
  const engine = Guide.engine;

  /* Excel-Style Number Formatting */
  function excelFormat(value, fmt) {
    if (value === "" || value === null || value === undefined) return "";
    if (engine.isError(value)) return value.error;
    if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
    if (typeof value === "string") return value;
    const fixed = (digits) => Math.abs(value).toLocaleString("en-GB", { minimumFractionDigits: digits, maximumFractionDigits: digits });
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
        return Number.isInteger(value) ? String(value) : value.toFixed(2);
      default:
        return Number.isInteger(value) ? String(value) : value.toLocaleString("en-GB", { maximumFractionDigits: 4 });
    }
  }

  Guide.excelFormat = excelFormat;

  /* Row Layouts for the Model and Inputs Sheets */
  function modelLayout(data) {
    const byRow = new Map();
    byRow.set(1, { kind: "title", text: data.title });
    byRow.set(2, { kind: "note", text: "€ Millions Unless Stated. Inflows Positive, Outflows Negative." });
    data.rows.forEach((row) => byRow.set(row.row, row.section ? { kind: "section", text: row.section } : { kind: "row", spec: row }));
    if (data.outputs.length) {
      byRow.set(data.outputs[0].row - 1, { kind: "section", text: "Key Outputs" });
      data.outputs.forEach((output) => byRow.set(output.row, { kind: "output", spec: output }));
    }
    return { byRow, last: Math.max(...byRow.keys()) };
  }

  function inputsLayout(data) {
    const byRow = new Map();
    byRow.set(1, { kind: "title", text: "Inputs" });
    byRow.set(2, { kind: "note", text: "Blue Values Are Hard-Coded Inputs." });
    data.inputs.forEach((item) => byRow.set(item.row, item.section ? { kind: "section", text: item.section } : { kind: "input", spec: item }));
    return { byRow, last: Math.max(...byRow.keys()) };
  }

  /* Workbook Seeded From a Case Layout */
  Guide.caseWorkbook = function caseWorkbook(caseId, options = {}) {
    const data = Guide.sheets[caseId];
    const inputs = {};
    data.inputs.filter((item) => item.key).forEach((item) => {
      const override = options.inputs && Object.prototype.hasOwnProperty.call(options.inputs, item.key) ? options.inputs[item.key] : item.value;
      inputs[`B${item.row}`] = override === null ? "" : override;
    });
    const model = {};
    if (options.solution) {
      Object.entries(data.cells).forEach(([address, [formula, value]]) => {
        model[address] = formula || value;
      });
    } else {
      const yearRow = data.rows.find((row) => row.id === "year").row;
      for (let i = 0; i <= data.years; i += 1) model[`${engine.numToCol(3 + i)}${yearRow}`] = i;
    }
    return new engine.Workbook({ Inputs: inputs, Model: model });
  };

  /* Columns of a Solution Row, Used for Filling Right */
  Guide.rowColumns = function rowColumns(caseId, row) {
    const data = Guide.sheets[caseId];
    return Array.from({ length: data.years + 1 }, (_, i) => engine.numToCol(3 + i)).filter((col) => data.cells[`${col}${row}`]);
  };

  /* Interactive Spreadsheet Grid */
  Guide.createGrid = function createGrid(container, options) {
    const data = Guide.sheets[options.caseId];
    const workbook = options.workbook;
    const yearCols = Array.from({ length: data.years + 1 }, (_, i) => engine.numToCol(3 + i));
    const layouts = { Model: modelLayout(data), Inputs: inputsLayout(data) };
    const editable = options.editable || (() => false);
    const cellState = options.cellState || (() => null);
    const expected = (address) => Boolean(data.cells[address]);
    const POINT_CHARS = "=(,;+-*/^<>&:";

    const state = {
      sheet: "Model",
      selected: { sheet: "Model", address: options.start || "C5" },
      editing: null
    };

    container.innerHTML = `
      <div class="xl${options.compact ? " xl-compact" : ""}">
        ${options.toolbar ? `<div class="xl-toolbar">${options.toolbar}</div>` : ""}
        <div class="xl-bar">
          <span class="xl-name" data-role="name">C5</span>
          <span class="xl-fx" aria-hidden="true">fx</span>
          <input class="xl-input" data-role="formula" spellcheck="false" autocomplete="off" aria-label="Formula bar">
        </div>
        <div class="xl-scroll" data-role="scroll" tabindex="0" aria-label="${escapeHtml(data.title)} spreadsheet"></div>
        <div class="xl-tabs" role="group" aria-label="Worksheets">
          <button type="button" data-sheet="Inputs">Inputs</button>
          <button type="button" data-sheet="Model">Model</button>
          <span class="xl-hint" data-role="hint">${escapeHtml(options.hint || "Select a cell to see its formula.")}</span>
        </div>
      </div>`;

    const scroll = container.querySelector('[data-role="scroll"]');
    const nameBox = container.querySelector('[data-role="name"]');
    const input = container.querySelector('[data-role="formula"]');

    /* Navigable Addresses on the Visible Sheet */
    function navigable() {
      if (state.sheet === "Inputs") {
        return data.inputs.filter((item) => item.key).map((item) => `B${item.row}`);
      }
      const cells = [];
      const layout = layouts.Model;
      for (let row = 1; row <= layout.last; row += 1) {
        const entry = layout.byRow.get(row);
        if (!entry) continue;
        if (entry.kind === "row") yearCols.forEach((col) => cells.push(`${col}${row}`));
        if (entry.kind === "output") cells.push(`C${row}`);
      }
      return cells;
    }

    function formatFor(sheet, address) {
      const row = Number(address.replace(/^[A-Z]+/, ""));
      if (sheet === "Inputs") {
        const spec = data.inputs.find((item) => item.row === row);
        return spec ? spec.fmt : "";
      }
      const entry = layouts.Model.byRow.get(row);
      return entry && entry.spec ? entry.spec.fmt : "";
    }

    function cellMarkup(sheet, address, extra) {
      const raw = workbook.raw(sheet, address);
      const classes = ["xl-cell"];
      if (extra) classes.push(extra);
      const isEditable = editable(sheet, address);
      const status = cellState(sheet, address);
      if (status) classes.push(`is-${status}`);
      if (isEditable) classes.push("is-editable");
      if (sheet === "Inputs") classes.push("is-input");
      if (raw === null) {
        if (sheet === "Model" && expected(address) && options.showTodo !== false && !String(extra).includes("is-year")) classes.push("is-todo");
        return `<td class="${classes.join(" ")}" data-addr="${address}">${status === "target" ? '<span class="xl-ask">?</span>' : ""}</td>`;
      }
      const value = workbook.value(sheet, address);
      if (engine.isError(value)) classes.push("is-error");
      else if (typeof value === "number" && value < -0.0005) classes.push("is-negative");
      classes.push("is-filled");
      return `<td class="${classes.join(" ")}" data-addr="${address}">${escapeHtml(excelFormat(value, formatFor(sheet, address)))}</td>`;
    }

    function renderModel() {
      const layout = layouts.Model;
      const span = yearCols.length + 2;
      const head = `<tr><th class="xl-corner"></th><th class="xl-col xl-col-a">A</th><th class="xl-col xl-col-b">B</th>${yearCols.map((col) => `<th class="xl-col">${col}</th>`).join("")}</tr>`;
      const body = [];
      for (let row = 1; row <= layout.last; row += 1) {
        const entry = layout.byRow.get(row);
        const num = `<th class="xl-rownum">${row}</th>`;
        if (!entry) {
          body.push(`<tr>${num}<td class="xl-label"></td><td class="xl-unit"></td>${yearCols.map(() => '<td class="xl-cell"></td>').join("")}</tr>`);
        } else if (entry.kind === "title" || entry.kind === "note") {
          body.push(`<tr class="xl-${entry.kind}">${num}<td class="xl-label" colspan="${span}"><span>${escapeHtml(entry.text)}</span></td></tr>`);
        } else if (entry.kind === "section") {
          body.push(`<tr class="xl-section">${num}<td class="xl-label">${escapeHtml(entry.text)}</td><td colspan="${span - 1}"></td></tr>`);
        } else if (entry.kind === "output") {
          const spec = entry.spec;
          body.push(`<tr class="xl-output">${num}<td class="xl-label">${escapeHtml(spec.label)}</td><td class="xl-unit"></td>${cellMarkup("Model", `C${row}`)}${yearCols.slice(1).map(() => '<td class="xl-cell"></td>').join("")}</tr>`);
        } else {
          const spec = entry.spec;
          const cells = yearCols.map((col) => cellMarkup("Model", `${col}${row}`, spec.id === "year" ? "is-year" : "")).join("");
          body.push(`<tr class="${spec.total ? "xl-total" : ""}">${num}<td class="xl-label" title="${escapeHtml(spec.label)}">${escapeHtml(spec.label)}</td><td class="xl-unit">${escapeHtml(spec.unit)}</td>${cells}</tr>`);
        }
      }
      return `<table class="xl-grid"><thead>${head}</thead><tbody>${body.join("")}</tbody></table>`;
    }

    function renderInputs() {
      const layout = layouts.Inputs;
      const head = `<tr><th class="xl-corner"></th><th class="xl-col xl-col-a">A</th><th class="xl-col">B</th><th class="xl-col xl-col-b">C</th></tr>`;
      const body = [];
      for (let row = 1; row <= layout.last; row += 1) {
        const entry = layout.byRow.get(row);
        const num = `<th class="xl-rownum">${row}</th>`;
        if (!entry) {
          body.push(`<tr>${num}<td class="xl-label"></td><td class="xl-cell"></td><td class="xl-unit"></td></tr>`);
        } else if (entry.kind === "title" || entry.kind === "note") {
          body.push(`<tr class="xl-${entry.kind}">${num}<td class="xl-label" colspan="3"><span>${escapeHtml(entry.text)}</span></td></tr>`);
        } else if (entry.kind === "section") {
          body.push(`<tr class="xl-section">${num}<td class="xl-label">${escapeHtml(entry.text)}</td><td colspan="2"></td></tr>`);
        } else {
          const spec = entry.spec;
          body.push(`<tr>${num}<td class="xl-label">${escapeHtml(spec.label)}</td>${cellMarkup("Inputs", `B${row}`)}<td class="xl-unit">${escapeHtml(spec.unit)}</td></tr>`);
        }
      }
      return `<table class="xl-grid xl-inputs"><thead>${head}</thead><tbody>${body.join("")}</tbody></table>`;
    }

    function render() {
      const left = scroll.scrollLeft;
      const top = scroll.scrollTop;
      scroll.innerHTML = state.sheet === "Model" ? renderModel() : renderInputs();
      scroll.scrollLeft = left;
      scroll.scrollTop = top;
      container.querySelectorAll("[data-sheet]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.sheet === state.sheet)));
      markSelection();
    }

    function markSelection() {
      scroll.querySelectorAll(".is-selected, .is-editing").forEach((node) => node.classList.remove("is-selected", "is-editing"));
      if (state.editing && state.editing.sheet === state.sheet) {
        const node = scroll.querySelector(`[data-addr="${state.editing.address}"]`);
        if (node) node.classList.add("is-editing");
      }
      if (state.selected.sheet === state.sheet) {
        const node = scroll.querySelector(`[data-addr="${state.selected.address}"]`);
        if (node) node.classList.add("is-selected");
      }
      if (!state.editing) syncBar();
    }

    function syncBar() {
      const { sheet, address } = state.selected;
      nameBox.textContent = sheet === state.sheet ? address : `${sheet}!${address}`;
      const raw = workbook.raw(sheet, address);
      input.value = raw === null ? "" : String(raw);
      input.readOnly = !editable(sheet, address);
      input.placeholder = editable(sheet, address) ? "Type a formula such as =Inputs!$B$11*D8" : "";
    }

    function select(sheet, address, keepFocus) {
      if (sheet !== state.sheet) {
        state.sheet = sheet;
        render();
      }
      state.selected = { sheet, address };
      markSelection();
      const node = scroll.querySelector(`[data-addr="${address}"]`);
      if (node) {
        /* Keep the Cell Clear of the Sticky Label Column and Header Row */
        const box = node.getBoundingClientRect();
        const frame = scroll.getBoundingClientRect();
        const label = scroll.querySelector("tbody .xl-label");
        const stickyWidth = label ? label.getBoundingClientRect().right - frame.left : 0;
        const header = scroll.querySelector("thead");
        const stickyHeight = header ? header.getBoundingClientRect().height : 0;
        const x = box.left - frame.left;
        const y = box.top - frame.top;
        if (x < stickyWidth) scroll.scrollLeft += x - stickyWidth - 8;
        else if (x + box.width > scroll.clientWidth) scroll.scrollLeft += x + box.width - scroll.clientWidth + 8;
        if (y < stickyHeight) scroll.scrollTop += y - stickyHeight - 4;
        else if (y + box.height > scroll.clientHeight) scroll.scrollTop += y + box.height - scroll.clientHeight + 4;
      }
      if (!keepFocus) scroll.focus({ preventScroll: true });
      if (typeof options.onSelect === "function") options.onSelect(sheet, address);
    }

    function move(dCol, dRow) {
      const cells = navigable();
      const { address } = state.selected;
      const col = engine.colToNum(address.replace(/\d+/g, ""));
      const row = Number(address.replace(/^[A-Z]+/, ""));
      let best = null;
      let bestScore = Infinity;
      cells.forEach((candidate) => {
        const c = engine.colToNum(candidate.replace(/\d+/g, ""));
        const r = Number(candidate.replace(/^[A-Z]+/, ""));
        const dc = c - col;
        const dr = r - row;
        if (dCol && (Math.sign(dc) !== dCol || dr !== 0)) return;
        if (dRow && Math.sign(dr) !== dRow) return;
        const score = dRow ? Math.abs(dr) * 100 + Math.abs(dc) : Math.abs(dc);
        if (score < bestScore) {
          best = candidate;
          bestScore = score;
        }
      });
      if (best) select(state.sheet, best);
    }

    /* Editing Through the Formula Bar */
    function beginEdit(initial) {
      const { sheet, address } = state.selected;
      if (!editable(sheet, address)) {
        flashHint("This cell is locked in this exercise.");
        return;
      }
      state.editing = { sheet, address };
      if (initial !== undefined) input.value = initial;
      input.readOnly = false;
      input.focus();
      const end = input.value.length;
      input.setSelectionRange(end, end);
      markSelection();
    }

    function commit(direction) {
      if (!state.editing) return;
      const { sheet, address } = state.editing;
      let raw = input.value.trim();

      /* Plain Entries Become Numbers, Accepting Percentages and Decimal Commas */
      if (raw !== "" && !raw.startsWith("=")) {
        const parsed = Number(raw.replace(",", ".").replace("%", ""));
        if (Number.isFinite(parsed)) raw = raw.includes("%") ? parsed / 100 : parsed;
      }
      state.editing = null;
      workbook.set(sheet, address, raw === "" ? null : raw);
      if (typeof options.onCommit === "function") options.onCommit(sheet, address, raw);
      state.sheet = sheet;
      render();
      select(sheet, address);
      if (direction === "down") move(0, 1);
      if (direction === "right") move(1, 0);
    }

    function cancel() {
      if (!state.editing) return;
      const { sheet, address } = state.editing;
      state.editing = null;
      state.sheet = sheet;
      render();
      select(sheet, address);
    }

    function pointMode() {
      if (!state.editing || !input.value.startsWith("=")) return false;
      const before = input.value.slice(0, input.selectionStart).trimEnd();
      return POINT_CHARS.includes(before.slice(-1));
    }

    function insertReference(sheet, address) {
      const reference = sheet === state.editing.sheet ? address : `${sheet}!${address}`;
      const start = input.selectionStart;
      input.value = input.value.slice(0, start) + reference + input.value.slice(input.selectionEnd);
      const caret = start + reference.length;
      input.focus();
      input.setSelectionRange(caret, caret);
    }

    let hintTimer = null;
    function flashHint(text) {
      const hint = container.querySelector('[data-role="hint"]');
      hint.textContent = text;
      hint.classList.add("is-alert");
      window.clearTimeout(hintTimer);
      hintTimer = window.setTimeout(() => {
        hint.textContent = options.hint || "Select a cell to see its formula.";
        hint.classList.remove("is-alert");
      }, 2600);
    }

    /* Pointer Events */
    scroll.addEventListener("mousedown", (event) => {
      const node = event.target.closest("[data-addr]");
      if (!node) return;
      if (pointMode()) {
        event.preventDefault();
        insertReference(state.sheet, node.dataset.addr);
      }
    });

    scroll.addEventListener("click", (event) => {
      const node = event.target.closest("[data-addr]");
      if (!node || (state.editing && input === document.activeElement)) return;
      if (state.editing) commit();
      select(state.sheet, node.dataset.addr);
    });

    scroll.addEventListener("dblclick", (event) => {
      const node = event.target.closest("[data-addr]");
      if (node) beginEdit();
    });

    container.querySelector(".xl-tabs").addEventListener("mousedown", (event) => {
      if (event.target.closest("[data-sheet]") && state.editing) event.preventDefault();
    });

    container.querySelector(".xl-tabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-sheet]");
      if (!button || button.dataset.sheet === state.sheet) return;
      state.sheet = button.dataset.sheet;
      render();
      if (!state.editing) {
        const first = navigable()[0];
        if (first) select(state.sheet, state.selected.sheet === state.sheet ? state.selected.address : first);
      } else {
        input.focus();
      }
    });

    /* Keyboard Handling on the Grid */
    scroll.addEventListener("keydown", (event) => {
      if (state.editing) return;
      const key = event.key;
      const arrows = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] };
      if (arrows[key]) {
        event.preventDefault();
        move(...arrows[key]);
      } else if (key === "Tab") {
        event.preventDefault();
        move(event.shiftKey ? -1 : 1, 0);
      } else if (key === "Enter" || key === "F2") {
        event.preventDefault();
        beginEdit();
      } else if (key === "Delete" || key === "Backspace") {
        const { sheet, address } = state.selected;
        if (editable(sheet, address)) {
          event.preventDefault();
          workbook.set(sheet, address, null);
          if (typeof options.onCommit === "function") options.onCommit(sheet, address, null);
          render();
        }
      } else if ((event.ctrlKey || event.metaKey) && (key === "r" || key === "R") && typeof options.onFillRight === "function") {
        event.preventDefault();
        options.onFillRight(state.selected.sheet, state.selected.address);
      } else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        beginEdit(key);
      }
    });

    /* Keyboard Handling in the Formula Bar */
    function startFromBar() {
      if (!state.editing && editable(state.selected.sheet, state.selected.address)) {
        state.editing = { ...state.selected };
        markSelection();
      }
    }

    input.addEventListener("focus", startFromBar);
    input.addEventListener("input", startFromBar);

    input.addEventListener("keydown", (event) => {
      startFromBar();
      if (!state.editing) return;
      if (event.key === "Enter") {
        event.preventDefault();
        commit(options.enterMoves === false ? null : "down");
      } else if (event.key === "Tab") {
        event.preventDefault();
        commit("right");
      } else if (event.key === "Escape") {
        event.preventDefault();
        cancel();
      } else if (event.key === "F4") {
        event.preventDefault();
        const result = engine.cycleAnchor(input.value, input.selectionStart);
        input.value = result.text;
        input.setSelectionRange(result.caret, result.caret);
      }
    });

    input.addEventListener("blur", () => {
      window.setTimeout(() => {
        if (state.editing && document.activeElement !== input && !container.contains(document.activeElement)) commit();
      }, 120);
    });

    render();
    syncBar();

    return {
      render,
      select,
      commit,
      get selected() {
        return state.selected;
      },
      showSheet(sheet) {
        state.sheet = sheet;
        render();
      },
      hint: flashHint
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

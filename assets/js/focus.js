/* Technical Focus Views */
window.Guide = window.Guide || {};

(function (Guide) {
  "use strict";

  const { icon, ui, escapeHtml, store } = Guide;
  Guide.views = Guide.views || {};

  const heading = (num, title) => `<h2 class="section-title"><span class="num">${num}</span>${title}</h2>`;

  /* Cached KaTeX Markup So Revisits Render Instantly */
  const texCache = new Map();

  function texHtml(tex, display) {
    const key = `${display ? "D" : "I"}${tex}`;
    if (texCache.has(key)) return texCache.get(key);
    let html;
    try {
      html = window.katex ? window.katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: "ignore" }) : `<span class="is-plain">${escapeHtml(tex)}</span>`;
    } catch (error) {
      html = `<span class="is-plain">${escapeHtml(tex)}</span>`;
    }
    texCache.set(key, html);
    return html;
  }

  /* Battery Finance Questions View */
  Guide.views.batteryQuestions = function batteryQuestions(view) {
    const themes = [
      { icon: "bolt", title: "Capex and Replacement", text: "Battery packs are one of the costliest parts of an electric bus, and a mid-life replacement creates the lumpiest cash flow in the model." },
      { icon: "pulse", title: "Degradation and Health", text: "State of health falls with age and use, which shortens range, sets the replacement date and decides whether a warranty still applies." },
      { icon: "trend", title: "Residual Value", text: "Second-life storage and recycling give used packs value, yet lenders credit little of it, so the upside and the risk sit with equity." },
      { icon: "scale", title: "Risk Allocation", text: "Manufacturer warranties, operator usage limits and Neot's own guarantee decide who pays when a battery underperforms." }
    ];

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("bolt")} Technical Focus</span>
        <h1>Battery Finance Questions</h1>
        <p class="lede">Project finance questions viewed through the asset that defines Neot's business. Each one comes with a spoken model answer, and the quick calculations show the arithmetic step by step.</p>
      </header>

      <section class="section reveal">
        ${heading("01", "How Batteries Change the Model")}
        <div class="grid grid-2 theme-grid">
          ${themes.map((theme) => `<div class="card theme-card"><span class="card-icon">${icon(theme.icon)}</span><h3>${theme.title}</h3><p class="small">${theme.text}</p></div>`).join("")}
        </div>
        ${ui.callout("Neot's Battery Offer", "<p>Neot e-motion describes Battery-as-a-Service as battery supply including a performance guarantee, end-of-life optimisation, advice and technical expertise. Retrofit-as-a-Service adds battery integration with performance guarantees and long-term asset monitoring, and the LinkByCar partnership uses vehicle data to anticipate battery lifespan.</p>", "callout-indigo", "building")}
      </section>

      <section class="section">
        <div class="reveal">${heading("02", "Practice")}</div>
        <p class="reveal">Questions are grouped by theme, from Neot's offer through risk allocation to quick calculations. Every formula used in the answers appears on the <a href="#/formulas">Formula Sheet</a>.</p>
        <div id="battery-host"></div>
      </section>

      <section class="section reveal">
        ${heading("03", "Sources")}
        <ul class="source-list">
          <li><a href="https://www.neotcapital.com/en/plateformes/neot-e-motion/" target="_blank" rel="noopener noreferrer">Neot e-motion Offers</a></li>
          <li><a href="https://www.neotcapital.com/en/neot-capital-and-linkbycar-join-forces-to-build-a-new-data-driven-offer-for-electric-vehicles/" target="_blank" rel="noopener noreferrer">Neot and LinkByCar Partnership (12 November 2025)</a></li>
          <li><a href="https://eur-lex.europa.eu/eli/reg/2023/1542/oj" target="_blank" rel="noopener noreferrer">EU Battery Regulation 2023/1542</a></li>
        </ul>
        <p class="small muted">Figures in the quick calculations are illustrative, chosen to be realistic for electric buses rather than taken from any Neot transaction.</p>
      </section>`;

    return Guide.questionPractice(view.querySelector("#battery-host"), {
      items: Guide.batteryQuestions,
      categories: Guide.batteryCategories,
      ratingsKey: "batteryRatings",
      duration: 120
    });
  };

  /* Neot Formula Sheet View */
  Guide.views.formulaSheet = function formulaSheet(view) {
    Guide.renderFormulaSheet(view, {
      groups: Guide.sheetGroups,
      formulas: Guide.sheetFormulas,
      recallKey: "sheetRecall",
      lede: "Every formula worth knowing for a battery-backed fleet financing, from the income statement through debt sizing to battery health and residual value. Each card adds one line on why it matters for Neot.",
      callout: '<p>Recall Mode hides each formula until you select it, which turns the sheet into a quick self-test. The <a href="#/practice/formulas">Formula Quiz</a> then drills the core project finance formulas with multiple-choice questions.</p>'
    });
  };

  /* Shared Formula Sheet Renderer */
  Guide.renderFormulaSheet = function renderFormulaSheet(view, config) {
    view.classList.add("is-wide");
    const groups = config.groups;
    const formulas = config.formulas;
    let recall = Boolean(store.get(config.recallKey, false));

    const card = (formula) => `
      <article class="card sheet-card" data-id="${formula.id}" data-group="${formula.group}" data-search="${escapeHtml(`${formula.name} ${formula.note}`.toLowerCase())}">
        <h3 class="sheet-name">${escapeHtml(formula.name)}</h3>
        <button type="button" class="sheet-body" aria-label="Show or hide the ${escapeHtml(formula.name)} formula">
          <span class="sheet-eq">${texHtml(formula.tex, true)}</span>
          <span class="sheet-cover">${icon("lightbulb")} Recall, Then Reveal</span>
        </button>
        ${formula.where ? `<dl class="eq-where sheet-where">${formula.where.map(([symbol, meaning]) => `<dt>${texHtml(symbol, false)}</dt><dd>${escapeHtml(meaning)}</dd>`).join("")}</dl>` : ""}
        <p class="small sheet-note">${formula.note}</p>
        ${formula.example ? `<div class="sheet-example"><span class="sheet-example-label">Worked Example</span>${texHtml(formula.example, true)}</div>` : ""}
      </article>`;

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("calc")} Technical Focus</span>
        <h1>Formula Sheet</h1>
        <p class="lede">${config.lede}</p>
      </header>

      <div class="sheet-toolbar">
        <div class="segmented" role="group" aria-label="Formula group" id="sheet-groups">
          <button type="button" data-group="all" aria-pressed="true">All ${formulas.length}</button>
          ${groups.map((group) => `<button type="button" data-group="${group.id}" aria-pressed="false">${group.label}</button>`).join("")}
        </div>
        <div class="sheet-tools">
          <div class="lex-search sheet-search">${icon("search")}<input class="input" type="search" id="sheet-query" placeholder="Search formulas…" aria-label="Search formulas"></div>
          <button type="button" class="btn btn-ghost btn-sm" id="sheet-recall" aria-pressed="${recall}">${icon("lightbulb")} Recall Mode</button>
        </div>
      </div>
      <p class="small muted" id="sheet-count"></p>

      <div id="sheet-host" class="${recall ? "is-recall" : ""}">
        ${groups
          .map(
            (group) => `
          <section class="section sheet-group" data-group="${group.id}">
            <h2 class="section-title sheet-group-title"><span class="num">${icon(group.icon)}</span>${group.label}</h2>
            <div class="sheet-grid">${formulas.filter((formula) => formula.group === group.id).map(card).join("")}</div>
          </section>`
          )
          .join("")}
      </div>

      ${ui.callout("Practise Recall", config.callout, "", "lightbulb")}`;

    const host = view.querySelector("#sheet-host");
    const query = view.querySelector("#sheet-query");
    let group = "all";

    /* Filtering by Group and Search Text Without Re-Rendering */
    function apply() {
      const text = query.value.trim().toLowerCase();
      let shown = 0;
      host.querySelectorAll(".sheet-card").forEach((node) => {
        const visible = (group === "all" || node.dataset.group === group) && (!text || node.dataset.search.includes(text));
        node.hidden = !visible;
        if (visible) shown += 1;
      });
      host.querySelectorAll(".sheet-group").forEach((section) => {
        section.hidden = !section.querySelector(".sheet-card:not([hidden])");
      });
      view.querySelector("#sheet-count").textContent = shown ? `${shown} of ${formulas.length} Formulas` : "No formula matches that search.";
    }

    view.querySelector("#sheet-groups").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-group]");
      if (!button) return;
      group = button.dataset.group;
      view.querySelectorAll("#sheet-groups button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      apply();
    });

    query.addEventListener("input", apply);

    view.querySelector("#sheet-recall").addEventListener("click", (event) => {
      recall = !recall;
      store.set(config.recallKey, recall);
      event.currentTarget.setAttribute("aria-pressed", String(recall));
      host.classList.toggle("is-recall", recall);
      host.querySelectorAll(".sheet-card.is-revealed").forEach((node) => node.classList.remove("is-revealed"));
    });

    host.addEventListener("click", (event) => {
      const body = event.target.closest(".sheet-body");
      if (body && recall) body.closest(".sheet-card").classList.toggle("is-revealed");
    });

    apply();
  };
})(window.Guide);

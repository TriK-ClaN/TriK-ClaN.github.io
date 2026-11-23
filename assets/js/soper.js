/* Soper Interview Views */
window.Guide = window.Guide || {};

(function (Guide) {
  "use strict";

  const { icon, ui, progress } = Guide;
  Guide.views = Guide.views || {};

  const data = Guide.soper;
  const heading = (num, title) => `<h2 class="section-title"><span class="num">${num}</span>${title}</h2>`;
  const sourceList = (sources) => `<ul class="source-list">${sources.map((source) => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label}</a></li>`).join("")}</ul>`;

  /* Readiness From Rated Answers */
  Guide.soperSummary = function soperSummary() {
    const ratings = progress.ratings("soperRatings");
    const strong = Object.values(ratings).filter((rating) => rating === "Solid" || rating === "Nailed It").length;
    const total = Guide.soperQuestions.length;
    return { strong, total, score: Math.min(1, strong / total) };
  };

  /* Briefing View */
  Guide.views.soperHome = function soperHome(view) {
    const summary = Guide.soperSummary();

    view.innerHTML = `
      <section class="hero">
        <svg class="hero-lines" viewBox="0 0 360 200" fill="none" aria-hidden="true">
          <path d="M0 170 C60 170 70 120 120 120 S190 150 230 90 S300 40 360 30" stroke="currentColor" stroke-width="2"/>
          <path d="M0 190 C70 185 90 150 140 145 S210 165 250 115 S310 75 360 70" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>
        </svg>
        <div class="hero-grid">
          <div>
            <span class="eyebrow">${icon("spark")} Soper · Stage Chargé d'Affaires</span>
            <h1>Ready for Soper, Ha Linh.</h1>
            <p class="lede">Tonight's interview is for a six-month internship assisting the two chargés d'affaires of Jean-Michel Germa's family holding. Read this briefing first, then rehearse the questions aloud and finish with the primer and formulas.</p>
            <div class="btn-row" style="margin-top:1.25rem">
              <a class="btn" href="#/soper/questions">Rehearse the Questions ${icon("arrowRight")}</a>
              <a class="btn btn-ghost" href="#/soper/group">${icon("building")} Company and Team</a>
            </div>
          </div>
          <div class="countdown">
            <span class="countdown-label" id="countdown-label">Interview Countdown</span>
            <div class="countdown-units" id="countdown-units"></div>
            <p class="countdown-summary" id="countdown-summary"></p>
            <div class="countdown-edit">
              <label class="field-inline"><span>Date</span><input type="date" id="interview-date" aria-label="Soper interview date in Paris"></label>
              <label class="field-inline"><span>Paris Time</span><input type="time" id="interview-time" aria-label="Soper interview start time in Paris"></label>
            </div>
            <span class="small muted" id="countdown-note"></span>
          </div>
        </div>
      </section>

      <section class="section reveal">
        ${heading("01", "Soper in Sixty Seconds")}
        <div class="grid grid-4">
          <div class="stat"><span class="stat-value">~€300m</span><span class="stat-label">Assets Managed</span></div>
          <div class="stat"><span class="stat-value">~50</span><span class="stat-label">People</span></div>
          <div class="stat"><span class="stat-value">4</span><span class="stat-label">Pôles</span></div>
          <div class="stat"><span class="stat-value">100%</span><span class="stat-label">Founder-Owned</span></div>
        </div>
        <div class="prose soper-prose">
          <p>Soper is the private holding company of Jean-Michel Germa, who founded the wind developer La Compagnie du Vent in 1989 and sold it to Engie in stages until 2017. Proceeds from that exit now fund a group that builds energy transition companies of its own while investing in funds, real estate and industrial businesses. Headquarters sit in Paris 8e, and the operating teams work near Montpellier.</p>
          <p>Both subsidiaries define the group. MGH Energy develops synthetic fuels for aviation and shipping, with the €1.1bn L'Ardoise plant in the Gard selected by the EU Innovation Fund on 19 October 2026. Sunti develops, finances, builds and operates solar plants, focusing on agrivoltaics and industrial self-consumption.</p>
        </div>
      </section>

      <section class="section reveal">
        ${heading("02", "Four Pôles")}
        <div class="grid grid-2 soper-cards">
          ${data.poles.map((pole) => `<div class="card theme-card"><span class="card-icon">${icon(pole.icon)}</span><h3>${pole.title}</h3><p class="small">${pole.text}</p></div>`).join("")}
        </div>
      </section>

      <section class="section reveal">
        ${heading("03", "Recent Timeline")}
        <div class="soper-timeline">
          ${data.timeline.map((item) => `<div class="soper-event"><span class="pill">${item.date}</span><div><h3>${item.title}</h3><p class="small">${item.text}</p></div></div>`).join("")}
        </div>
        ${ui.callout("Mention the News Early", "<p>Innovation Fund selection is barely a month old, and the Janassim refocus came a week later. Referring to both naturally shows preparation that most candidates will not have.</p>", "callout-indigo", "lightbulb")}
      </section>

      <section class="section reveal">
        ${heading("04", "Role Decoded")}
        <p>Six missions appear in the offer. Each one below translates the French wording and pairs it with the experience that proves readiness.</p>
        <div class="table-wrap">
          <table class="soper-table soper-stack">
            <thead><tr><th>Mission</th><th>In Practice</th><th>Your Proof</th></tr></thead>
            <tbody>${data.missions.map(([mission, meaning, proof]) => `<tr><td data-label="Mission"><strong>${mission}</strong></td><td data-label="In Practice">${meaning}</td><td data-label="Your Proof">${proof}</td></tr>`).join("")}</tbody>
          </table>
        </div>
        ${ui.callout("Offer Requirements", "<p>Soper asks for a top business or engineering school student in a gap year or final year, with M&amp;A, private equity or advisory experience, fluent French and English, and excellent Excel and PowerPoint. Start dates are January or March 2027, and occasional trips to Montpellier are expected.</p>", "", "info")}
      </section>

      <section class="section reveal">
        ${heading("05", "Three Messages to Land")}
        <div class="grid grid-3 soper-cards">
          ${data.messages.map((item) => `<div class="card theme-card"><span class="card-icon">${icon(item.icon)}</span><h3>${item.title}</h3><p class="small">${item.text}</p></div>`).join("")}
        </div>
      </section>

      <section class="section reveal">
        ${heading("06", "Questions to Ask Them")}
        <div class="soper-asks">
          ${data.askThem.map((item, index) => `<div class="card soper-ask"><span class="num">${index + 1}</span><div><p><strong>${item.q}</strong></p><p class="small muted">${item.why}</p></div></div>`).join("")}
        </div>
      </section>

      <section class="section reveal">
        ${heading("07", "Ninety-Minute Plan")}
        <div class="grid grid-4 soper-plan">
          <a class="card soper-step" href="#/soper/group"><span class="pill">15 Min</span><h3>Company and Team</h3><p class="small">Faces, projects and key figures</p></a>
          <a class="card soper-step" href="#/soper/questions"><span class="pill">40 Min</span><h3>Interview Questions</h3><p class="small">Answer aloud, then compare</p></a>
          <a class="card soper-step" href="#/soper/primer"><span class="pill">20 Min</span><h3>Energy and Finance Primer</h3><p class="small">e-Fuels, solar and fund mechanics</p></a>
          <a class="card soper-step" href="#/soper/formulas"><span class="pill">15 Min</span><h3>Formula Sheet</h3><p class="small">Recall Mode as a final check</p></a>
        </div>
        <p class="small muted soper-readiness">${summary.strong} of ${summary.total} answers rated Solid or better so far.</p>
      </section>`;

    return Guide.startCountdown(view, {
      dateKey: "soperParisDate",
      timeKey: "soperParisTime",
      defaultDate: data.defaultDate,
      defaultTime: data.defaultTime,
      assumedTime: data.defaultTime
    });
  };

  /* Company and Team View */
  Guide.views.soperGroup = function soperGroup(view) {
    const factTable = (project) => `
      <div class="card soper-project">
        <span class="pill pill-good">${project.pill}</span>
        <h3>${project.name}</h3>
        <dl class="soper-facts">${project.rows.map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`).join("")}</dl>
      </div>`;

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("building")} Company Profile</span>
        <h1>Soper Group and Team</h1>
        <p class="lede">Everything worth knowing about the holding, its two industrial subsidiaries and the people likely to sit across the table tonight.</p>
      </header>

      <section class="section reveal">
        ${heading("01", "People to Recognise")}
        <p>Applications go to Laurent Espitalier-Noël and Ugo Doat, the two chargés d'affaires the intern supports, so expect at least one of them tonight. Photos come from their public LinkedIn profiles.</p>
        ${Guide.teamMarkup(["soperInterviewers", "soperLeaders"])}
        <div class="soper-bios">
          ${Guide.soperBios.map((bio) => `<div class="card"><h3>${bio.name}</h3><p class="small">${bio.text}</p></div>`).join("")}
        </div>
        ${ui.callout("Use Ugo's Story", "<p>Ugo held this exact internship in 2024 and was hired as Junior Associate in 2025. Asking what made that transition work is a warm and memorable question.</p>", "callout-indigo", "lightbulb")}
      </section>

      <section class="section reveal">
        ${heading("02", "MGH Energy")}
        <div class="prose soper-prose">
          <p>MGH Energy, short for Mobility Green Horizon, develops plants that turn low-carbon electricity and captured CO₂ into synthetic fuels for aviation and shipping. Around twenty people work from Pérols near Montpellier, and the company also holds a stake in Zéphyr &amp; Borée, a shipowner developing wind-assisted cargo vessels.</p>
        </div>
        <div class="grid grid-2 soper-projects">${Guide.soperProjects.map(factTable).join("")}</div>
        ${ui.callout("Western Sahara Sensitivity", "<p>Dakhla lies in Western Sahara, a territory whose status is disputed. Refer to the project as being in Morocco's southern region near Dakhla and avoid political commentary.</p>", "callout-amber", "alert")}
      </section>

      <section class="section reveal">
        ${heading("03", "Sunti")}
        <div class="prose soper-prose">
          <p>Founded in 2014, Sunti (Sunny Times For Industry) began with solar thermal before moving into photovoltaics from 2020. Today it develops, finances, builds and operates solar plants, and it can provide equity financing itself rather than relying entirely on third parties.</p>
          <p>Both niches matter. Industrial self-consumption lets factories consume power produced on their own sites, cutting energy bills and emissions. Agrivoltaics, developed in partnership with Sun'Agri since 2021, places steerable panels above crops so that farming and power generation share the same land.</p>
        </div>
      </section>

      <section class="section reveal">
        ${heading("04", "Founder Story")}
        <div class="prose soper-prose">
          <p>Jean-Michel Germa created La Compagnie du Vent in 1989, making it one of France's first wind developers. GDF Suez, later Engie, became majority shareholder, leaving Soper with 41% until Engie bought that remaining stake in April 2017. Soper then redeployed the capital into new industrial ventures, which explains why a relatively small holding is developing billion-euro e-fuels plants.</p>
        </div>
        <h3 class="answer-heading">Model Thirty-Second Summary</h3>
        <div class="model-answer">
          <p>Soper is Jean-Michel Germa's family holding, built on the success of La Compagnie du Vent. Soper manages about €300 million across four pôles with around fifty people. Soper's industrial arm develops MGH Energy, whose €1.1 billion L'Ardoise e-fuels plant was just selected by the EU Innovation Fund, and Sunti, a solar developer specialising in agrivoltaics and self-consumption. Alongside, it invests in private equity funds, real estate and industrial companies.</p>
        </div>
      </section>

      <section class="section reveal">
        ${heading("05", "Sources")}
        ${sourceList(data.sources)}
        <p class="small muted">Figures come from company announcements and press coverage up to November 2026. Quote them as approximate where the text says so.</p>
      </section>`;
  };

  /* Interview Questions View */
  Guide.views.soperQuestions = function soperQuestions(view) {
    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("mic")} Practice</span>
        <h1>Interview Questions</h1>
        <p class="lede">Likely questions across motivation, experience, the company and technical finance, each with a spoken model answer. Answer aloud against the timer first, then open the model answer and rate yourself.</p>
      </header>

      ${ui.callout("Expect French", "<p>Soper is a French family holding, so the interview may switch to French at any moment. Rehearse the En Français answers at least once aloud.</p>", "callout-indigo", "globe")}

      <section class="section">
        <div id="soper-host"></div>
      </section>`;

    return Guide.questionPractice(view.querySelector("#soper-host"), {
      items: Guide.soperQuestions,
      categories: Guide.soperCategories,
      ratingsKey: "soperRatings",
      duration: 90
    });
  };

  /* Energy and Finance Primer View */
  Guide.views.soperPrimer = function soperPrimer(view) {
    const primer = Guide.soperPrimer;
    const cards = (items) => items.map((item) => `<div class="card theme-card"><span class="card-icon">${icon(item.icon)}</span><h3>${item.title}</h3><p class="small">${item.text}</p></div>`).join("");

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("book")} Study</span>
        <h1>Energy and Finance Primer</h1>
        <p class="lede">Core technical knowledge behind MGH Energy and Sunti, followed by the holding and fund mechanics the internship touches every day.</p>
      </header>

      <section class="section reveal">
        ${heading("01", "How an e-Fuel Is Made")}
        <ol class="soper-chain">
          ${primer.chain.map((step) => `<li class="card"><span class="card-icon">${icon(step.icon)}</span><h3>${step.title}</h3><p class="small">${step.text}</p></li>`).join("")}
        </ol>
        <p>Because the hydrogen comes from renewable electricity rather than biomass, EU law classes these products as RFNBOs. L'Ardoise ships both outputs: e-methanol for ships and e-kerosene for aircraft, both usable in existing engines and fuel infrastructure.</p>
      </section>

      <section class="section reveal">
        ${heading("02", "ReFuelEU Aviation Mandates")}
        <p>Fuel suppliers at EU airports must deliver minimum shares of sustainable aviation fuel, including a growing share of synthetic fuel such as e-kerosene.</p>
        <div class="table-wrap">
          <table class="soper-table soper-center">
            <thead><tr><th>Year</th><th>Total SAF</th><th>Synthetic Fuel</th></tr></thead>
            <tbody>${primer.refuel.map(([year, saf, synth]) => `<tr><td>${year}</td><td>${saf}</td><td>${synth}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </section>

      <section class="section reveal">
        ${heading("03", "Key Energy Concepts")}
        <div class="grid grid-2 soper-cards">${cards(primer.concepts)}</div>
      </section>

      <section class="section reveal">
        ${heading("04", "Holding and Fund Mechanics")}
        <div class="grid grid-2 soper-cards">${cards(primer.holding)}</div>
      </section>

      <section class="section reveal">
        ${heading("05", "Public Funding Tools")}
        <div class="grid grid-2 soper-cards">
          ${primer.funding.map((item) => `<div class="card theme-card"><h3>${item.title}</h3><p class="small">${item.text}</p></div>`).join("")}
        </div>
      </section>

      <section class="section reveal">
        ${heading("06", "French Terms From the Offer")}
        <div class="table-wrap">
          <table class="soper-table soper-center">
            <thead><tr><th>Français</th><th>English</th></tr></thead>
            <tbody>${primer.lexicon.map(([fr, en]) => `<tr><td><strong>${fr}</strong></td><td>${en}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </section>`;
  };

  /* Formula Sheet View */
  Guide.views.soperFormulas = function soperFormulas(view) {
    Guide.renderFormulaSheet(view, {
      groups: Guide.soperSheetGroups,
      formulas: Guide.soperFormulas,
      recallKey: "soperSheetRecall",
      lede: "Formulas behind subsidiary business plans, energy economics, valuation, fund monitoring and budget control. Each card adds one line on why it matters at Soper.",
      callout: '<p>Recall Mode hides each formula until you select it, which turns the sheet into a quick self-test. Pair it with the <a href="#/soper/questions">Quick Calculations</a> questions for spoken practice.</p>'
    });
  };
})(window.Guide);

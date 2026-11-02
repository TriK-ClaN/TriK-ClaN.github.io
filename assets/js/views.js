/* Page Views */
window.Guide = window.Guide || {};

(function (Guide) {
  "use strict";

  const { icon, ui, escapeHtml, store, progress } = Guide;
  Guide.views = Guide.views || {};

  const moduleById = (id) => Guide.modules.find((module) => module.id === id);
  const totalMinutes = () => Guide.modules.reduce((sum, module) => sum + module.minutes, 0);

  /* Progress Ring Markup */
  function ring(score, label) {
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    return `
      <div class="ring" role="img" aria-label="${Math.round(score * 100)}% ${label}">
        <svg viewBox="0 0 132 132">
          <defs><linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="var(--accent)"/><stop offset="100%" stop-color="var(--indigo)"/></linearGradient></defs>
          <circle class="ring-track" cx="66" cy="66" r="${radius}"></circle>
          <circle class="ring-value" cx="66" cy="66" r="${radius}" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}" data-target="${circumference * (1 - score)}"></circle>
        </svg>
        <div class="ring-label"><div><strong>${Math.round(score * 100)}%</strong><span>${label}</span></div></div>
      </div>`;
  }

  function animateRings(root) {
    window.requestAnimationFrame(() => {
      root.querySelectorAll(".ring-value").forEach((circle) => {
        circle.style.strokeDashoffset = circle.dataset.target;
      });
    });
  }

  /* Paris-Time Countdown */
  function startCountdown(root) {
    const dateInput = root.querySelector("#interview-date");
    const timeInput = root.querySelector("#interview-time");
    const units = root.querySelector("#countdown-units");
    const label = root.querySelector("#countdown-label");
    const summary = root.querySelector("#countdown-summary");
    const note = root.querySelector("#countdown-note");

    dateInput.value = store.get("interviewParisDate", Guide.interview.defaultDate);
    timeInput.value = store.get("interviewParisTime", "");

    function tick() {
      const dateText = dateInput.value || Guide.interview.defaultDate;
      const timeSet = Boolean(timeInput.value);
      const timeText = timeSet ? timeInput.value : Guide.interview.assumedTime;
      const target = Guide.time.parisToDate(dateText, timeText);
      const zone = Guide.time.zoneLabel(target);

      summary.textContent = `${Guide.time.formatLongDate(dateText)} · ${timeSet ? `${timeText} Paris Time (${zone})` : "Start Time to Be Confirmed"}`;

      const deviceDiffers = Guide.time.offsetMinutes(target) !== -target.getTimezoneOffset();
      note.textContent = timeSet
        ? deviceDiffers
          ? `This device shows that moment as ${Guide.time.formatLocalTime(target)}.`
          : "Countdown follows Paris time automatically."
        : `Counting to ${Guide.interview.assumedTime} Paris time until the confirmed start time is entered.`;

      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        label.textContent = "Interview Time";
        units.innerHTML = `<div class="countdown-unit countdown-done"><strong>Bonne Chance</strong><span>Trust the Preparation</span></div>`;
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      label.textContent = "Interview Countdown";
      units.innerHTML = [
        [days, days === 1 ? "Day" : "Days"],
        [hours, hours === 1 ? "Hour" : "Hours"],
        [minutes, minutes === 1 ? "Minute" : "Minutes"]
      ]
        .map(([value, unit]) => `<div class="countdown-unit"><strong>${String(value).padStart(2, "0")}</strong><span>${unit}</span></div>`)
        .join("");
    }

    dateInput.addEventListener("change", () => {
      store.set("interviewParisDate", dateInput.value);
      tick();
    });
    timeInput.addEventListener("change", () => {
      store.set("interviewParisTime", timeInput.value);
      tick();
    });

    tick();
    return window.setInterval(tick, 30000);
  }

  /* Home Briefing View */
  Guide.views.home = function home(view) {
    const summary = progress.summary();
    const planState = store.get("plan", {});
    const done = progress.modules();
    const today = Guide.time.todayInParis();

    const tierColumn = (tier, title, note) => `
      <div class="card reveal">
        <div class="timeline-day"><strong>${title}</strong>${ui.tierPill(tier)}</div>
        <p class="small">${note}</p>
        <ul class="checklist">
          ${Guide.modules
            .filter((module) => module.tier === tier)
            .map(
              (module) => `<li><a class="check check-link" href="#/study/${module.id}">
                <span class="nav-check${done[module.id] ? "" : " is-pending"}">${icon(done[module.id] ? "check" : "arrowRight")}</span>
                <span>${module.title}<small>${module.minutes} Minutes</small></span></a></li>`
            )
            .join("")}
        </ul>
      </div>`;

    view.innerHTML = `
      <section class="hero">
        <svg class="hero-lines" viewBox="0 0 360 200" fill="none" aria-hidden="true">
          <path d="M0 170 C60 170 70 120 120 120 S190 150 230 90 S300 40 360 30" stroke="currentColor" stroke-width="2"/>
          <path d="M0 190 C70 185 90 150 140 145 S210 165 250 115 S310 75 360 70" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>
        </svg>
        <div class="hero-grid">
          <div>
            <span class="eyebrow">${icon("spark")} Neot Capital · Investment Analyst Internship</span>
            <h1>Ready for Neot, Ha Linh.</h1>
            <p class="lede">Everything needed to walk into Wednesday's interview with confidence, combining about ${Math.round(totalMinutes() / 60)} hours of focused study with spoken model answers to rehearse. All of it builds on the strengths Resonance has already given you.</p>
            <div class="btn-row" style="margin-top:1.25rem">
              <a class="btn" href="#/study/project-finance">Start With Tier 1 ${icon("arrowRight")}</a>
              <a class="btn btn-ghost" href="#/practice/mock">${icon("mic")} Practise Interview Answers</a>
            </div>
          </div>
          <div class="countdown">
            <span class="countdown-label" id="countdown-label">Interview Countdown</span>
            <div class="countdown-units" id="countdown-units"></div>
            <p class="countdown-summary" id="countdown-summary"></p>
            <div class="countdown-edit">
              <label class="field-inline"><span>Date</span><input type="date" id="interview-date" aria-label="Interview date in Paris"></label>
              <label class="field-inline"><span>Paris Time</span><input type="time" id="interview-time" aria-label="Interview start time in Paris"></label>
            </div>
            <span class="small muted" id="countdown-note"></span>
          </div>
        </div>
      </section>

      <section class="section reveal">
        <div class="card readiness-card">
          ${ring(summary.score, "Ready")}
          <div class="readiness-body">
            <div class="readiness-head">
              <h2>Readiness</h2>
              <button type="button" class="btn btn-ghost btn-sm" data-open-reset>${icon("refresh")} Reset Progress</button>
            </div>
            <p class="muted small">Progress saves automatically in this browser as you study and practise.</p>
            <div class="grid grid-4">
              <div class="stat"><span class="stat-value">${summary.modulesDone}/${summary.totals.modules}</span><span class="stat-label">Modules</span></div>
              <div class="stat"><span class="stat-value">${summary.flashKnown}/${summary.totals.flash}</span><span class="stat-label">Flashcards</span></div>
              <div class="stat"><span class="stat-value">${summary.drillsDone}/${summary.totals.drills}</span><span class="stat-label">Drills</span></div>
              <div class="stat"><span class="stat-value">${summary.quizBest}%</span><span class="stat-label">Best Quiz</span></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title reveal"><span class="num">01</span>Interview at a Glance</h2>
        <div class="stages reveal">
          ${Guide.interview.stages
            .map((stage) => `<div class="card stage"><h3>${stage.title}</h3><p class="small muted">${stage.meta}</p><p>${stage.summary}</p></div>`)
            .join("")}
        </div>
        ${ui.callout("Which Round Is Wednesday?", "<p>Prepare for both. Screening calls reward a sharp pitch and genuine knowledge of Neot, while the technical round rewards depth in project finance and judgement on EV fleets.</p>", "callout-indigo", "info")}
      </section>

      <section class="section">
        <h2 class="section-title reveal"><span class="num">02</span>How to Prepare</h2>
        <div class="prose reveal">
          <p>Preparation works best in two passes. Begin with the study modules, which explain each concept once and finish with interview-ready answers. Then switch to the Mock Interview, answer each question aloud against the clock and compare your response with the spoken model answer.</p>
          <p>Personal questions deserve the same care as technical ones. Story Builder pairs every fit question with a model answer to adapt, so the pitch and the Resonance stories sound natural rather than memorised.</p>
        </div>
        <div class="btn-row reveal">
          <a class="btn btn-soft btn-sm" href="#/practice/mock">${icon("mic")} Mock Interview</a>
          <a class="btn btn-soft btn-sm" href="#/story">${icon("pen")} Story Builder</a>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title reveal"><span class="num">03</span>Winning Answer Formula</h2>
        <p class="reveal">Strong answers climb a ladder instead of stopping at a definition. Start with the formula, explain the financial intuition behind it, then show what it means for risk and finish with an investment judgement.</p>
        <div class="chain reveal">
          <span class="chain-step"><strong>Formula</strong></span><span class="chain-arrow">→</span>
          <span class="chain-step"><strong>Financial Intuition</strong></span><span class="chain-arrow">→</span>
          <span class="chain-step"><strong>Risk Implication</strong></span><span class="chain-arrow">→</span>
          <span class="chain-step"><strong>Investment Decision</strong></span>
        </div>
        ${ui.callout("Biggest Mindset Shift", "<p>Resonance work proves that a financing works. Neot asks whether an asset deserves equity at all, so show both the lender's view and the investor's view.</p>", "", "lightbulb")}
      </section>

      <section class="section">
        <h2 class="section-title reveal"><span class="num">04</span>Study Path</h2>
        <div class="grid grid-auto">
          ${tierColumn(1, "Must Master", "Current Resonance work makes these essential.")}
          ${tierColumn(2, "Very Likely", "Core corporate finance and investment reasoning.")}
          ${tierColumn(3, "Stand Out", "Sector depth that sets a candidate apart.")}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title reveal"><span class="num">05</span>Three-Day Plan</h2>
        <div class="timeline">
          ${Guide.plan
            .map(
              (day, dayIndex) => `
            <div class="card reveal${day.date === today ? " is-today" : ""}">
              <div class="timeline-day"><strong>${day.day}</strong><span class="pill${day.date === today ? " pill-good" : ""}">${day.date === today ? "Today" : day.label}</span></div>
              <p class="small muted" style="margin-bottom:0.5rem">${day.theme}</p>
              <ul class="checklist">
                ${day.tasks
                  .map((task, taskIndex) => {
                    const key = `${dayIndex}-${taskIndex}`;
                    return `<li><label class="check"><input type="checkbox" data-plan="${key}" ${planState[key] ? "checked" : ""}><span>${task.text} <a href="${task.href}" aria-label="Open ${escapeHtml(task.text)}">${icon("arrowRight", "inline-icon")}</a></span></label></li>`;
                  })
                  .join("")}
              </ul>
            </div>`
            )
            .join("")}
        </div>
      </section>`;

    view.querySelectorAll("[data-plan]").forEach((box) => {
      box.addEventListener("change", () => {
        const state = store.get("plan", {});
        state[box.dataset.plan] = box.checked;
        store.set("plan", state);
      });
    });

    animateRings(view);
    return startCountdown(view);
  };

  /* Neot Company Profile View */
  Guide.views.neot = function neot(view) {
    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("building")} Company Profile</span>
        <h1>Neot Capital</h1>
        <p class="lede">Paris-based specialist that designs and manages investment platforms financing low-carbon mobility.</p>
      </header>

      <section class="section">
        <div class="grid grid-4 reveal">
          <div class="stat"><span class="stat-value">2016</span><span class="stat-label">Founded</span></div>
          <div class="stat"><span class="stat-value">€500m</span><span class="stat-label">Equity Across Platforms</span></div>
          <div class="stat"><span class="stat-value">~€2bn</span><span class="stat-label">Financing Capacity</span></div>
          <div class="stat"><span class="stat-value">€350m</span><span class="stat-label">Neot e-motion Equity</span></div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">01</span>Business Model</h2>
        <p>Neot brings institutional investors together to acquire electric vehicles along with batteries and chargers, then makes these assets available to transport operators and public authorities as integrated services. Customers avoid heavy upfront capex and technology risk, while Neot supports each project from structuring through operational follow-up.</p>
        <div class="grid grid-3">
          <div class="card"><h4>EDF</h4><p class="small">Energy group and co-founder, invested through EDF Pulse Ventures.</p></div>
          <div class="card"><h4>Forsee Power</h4><p class="small">Battery manufacturer and co-founder, the source of Neot's battery expertise.</p></div>
          <div class="card"><h4>Mitsui &amp; Co.</h4><p class="small">Global trading and investment group, a shareholder since 2023.</p></div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">02</span>Platforms</h2>
        <div class="grid grid-2">
          <div class="card">
            <span class="pill pill-good">Launched May 2025</span>
            <h3 style="margin-top:0.6rem">Neot e-motion</h3>
            <p class="small">Pan-European leasing platform backed by a €350m equity commitment from Mirova and Alba Infra Partners alongside Banque des Territoires. Neot e-motion will take over from NGM once that platform is fully invested.</p>
          </div>
          <div class="card">
            <span class="pill">Since 2017</span>
            <h3 style="margin-top:0.6rem">Neot Green Mobility (NGM)</h3>
            <p class="small">First mobility platform, which had financed over €350m of assets by May 2025, mainly in France and the United Kingdom plus Scandinavia.</p>
          </div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">03</span>Platform Debt Financing</h2>
        <p>Platform-level debt is the clearest bridge between Resonance experience and Neot's model, so know these two transactions precisely.</p>
        <div class="grid grid-2">
          <div class="card">
            <span class="pill pill-good">December 2025</span>
            <h3 style="margin-top:0.6rem">Neot e-motion: €125m From MUFG</h3>
            <p class="small">Senior financing in which MUFG acts as sole lender as well as arranger and agent. Structured over 16 years, the hybrid portfolio facility combines a revolving credit facility with long-term project financing.</p>
          </div>
          <div class="card">
            <span class="pill">November 2025</span>
            <h3 style="margin-top:0.6rem">NGM: €170m Refinancing</h3>
            <p class="small">Long-term non-recourse portfolio debt from MUFG and La Banque Postale with its asset manager LBP AM. Refinancing followed the revolving facility set up at NGM's launch.</p>
          </div>
        </div>
        ${ui.callout("Why This Matters", "<p>Both facilities follow a classic platform pattern. Revolving facilities fund new assets quickly, then long-term non-recourse debt refinances the operating portfolio.</p>", "callout-indigo", "lightbulb")}
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">04</span>Recent Transactions</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Transaction</th></tr></thead>
            <tbody>
              <tr><td>Sep 2026</td><td><strong>DepotOne:</strong> Pay-per-use solution launched with E.ON Drive for truck fleets in Germany and the DACH region, with one contract and no upfront investment.</td></tr>
              <tr><td>Apr 2026</td><td><strong>E.ON and Mitsui:</strong> Charging-as-a-Service for van and truck fleets, billed at a fixed rate per charged kilowatt hour.</td></tr>
              <tr><td>Feb 2026</td><td><strong>Scotland:</strong> NGM financing for Ember reaching more than 100 electric coaches by mid-2026, set to become Europe's largest e-coach fleet under one operator.</td></tr>
              <tr><td>Jan 2026</td><td><strong>Denmark:</strong> First Neot e-motion deal, covering 186 BYD electric buses and 93 Efacec chargers for GoCollective.</td></tr>
            </tbody>
          </table>
        </div>
        ${ui.callout("Use Figures Carefully", "<p>Neot's pages quote different totals for assets financed depending on metric and date. Quote the €500m equity and nearly €2bn capacity figures with confidence, and frame other totals as approximate.</p>", "callout-amber", "alert")}
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">05</span>Investment Team</h2>
        <p>Philippe Ringenbach leads Neot as CEO. Round two pairs an Investment Director with an Investment Officer, so review the team members below once interviewer names are confirmed.</p>
        <div class="grid grid-2">
          <div class="card"><h4>Investment Directors</h4><ul><li>Francisco Elens Da Silva Passos</li><li>Maël Guégan</li><li>Victor Cabanes</li></ul></div>
          <div class="card"><h4>Investment Officers</h4><ul><li>Agathe Laîné</li><li>Bachar Salamé</li><li>Paul Albespy</li><li>Xavier Rule</li></ul></div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">06</span>Talking About Neot in the Interview</h2>
        <div class="prose">
          <p>Company knowledge lands best when it connects to your own profile. Neot pairs financial structuring with technical expertise, which matches a background built on modelling and a genuine curiosity about technology. Timing helps too: Neot e-motion has fresh equity and a new debt facility, so the team is originating actively and needs analysts who can contribute quickly.</p>
          <p>Debt is the strongest bridge. Sizing assets into a portfolio facility like the MUFG one is exactly the skill Resonance has built, so mention it whenever financing comes up. Having a battery manufacturer among the shareholders also makes battery risk a core competence at Neot, which is worth acknowledging when discussing EV economics.</p>
        </div>
        <h3 class="answer-heading">Model Thirty-Second Summary</h3>
        <div class="model-answer">
          <p>Neot designs and manages investment platforms that finance low-carbon mobility, acquiring electric buses and trucks along with their batteries and chargers, then providing them to operators as a service. Founded in 2016 by EDF and Forsee Power, with Mitsui joining in 2023, it now manages about €500 million of equity across its platforms. Neot e-motion, its newest platform, launched in 2025 with €350 million of equity and has since financed 186 electric buses in Denmark. MUFG then provided a €125 million facility to complete the platform's capital structure.</p>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">07</span>Sources</h2>
        <ul>${Guide.sources.map((source) => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label}</a></li>`).join("")}</ul>
      </section>`;
  };

  /* Role Decoder View */
  Guide.views.role = function role(view) {
    const missions = [
      ["Développement commercial", "Identify opportunities and monitor the market to design innovative offers.", "Awareness of the As-a-Service Model"],
      ["Analyse financière et structuration", "Model projects and track profitability while supporting contract negotiation.", "Resonance Modelling and Debt Sizing"],
      ["Pilotage des due diligences", "Coordinate investors and banks together with external advisers.", "Lender and Adviser Interactions"],
      ["Support aux comités d'investissement", "Prepare key documents for investment committees.", "Structured “Would You Invest?” Answer"],
      ["Suivi de la performance des actifs", "Analyse KPIs and recommend actions to maximise returns.", "Budget Versus Actual Reasoning"]
    ];

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("briefcase")} Role Decoder</span>
        <h1>Investment Analyst, Sustainable Mobility</h1>
        <p class="lede">Reporting to an Investment Director, the intern works across the entire investment cycle of the Neot e-motion platform.</p>
      </header>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">01</span>Missions</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Mission in the Offer</th><th>What It Means</th><th>Evidence to Bring</th></tr></thead>
            <tbody>${missions.map(([fr, meaning, proof]) => `<tr><td><strong lang="fr">${fr}</strong></td><td>${meaning}</td><td>${proof}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">02</span>Profile Match</h2>
        <p>Every requirement in the offer has a direct answer in your background, so each one can be backed by a specific example during the interview.</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>What Neot Asks For</th><th>What You Bring</th></tr></thead>
            <tbody>
              <tr><td>Finance Track at Bac+4 or Bac+5</td><td>EDHEC Master's Programme</td></tr>
              <tr><td>First Corporate Finance Internship</td><td>Project Finance Internship at Resonance Advisory</td></tr>
              <tr><td>Comfort With Financial Modelling</td><td>Daily Modelling and Debt Sizing</td></tr>
              <tr><td>Project Finance Exposure as a Real Plus</td><td>Live Transactions and a Formalised QC Procedure</td></tr>
              <tr><td>Analytical Rigour</td><td>Model Review Work and Credit Experience at VIB</td></tr>
              <tr><td>Fluent French and English</td><td>Pitch Rehearsed in Both Languages</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">03</span>Practical Details</h2>
        <div class="prose">
          <p>Starting in March 2027, the internship lasts six months and is based on Rue Saint-Lazare in the 9th arrondissement of Paris. After onboarding, interns may work remotely two days a week. Benefits include a Swile meal card worth €11 a day, with 60% covered by Neot, together with a sustainable mobility allowance of €50 to €58 depending on conditions. Interns also earn one day of paid leave per month.</p>
          <p>Since EDHEC requires a second internship, confirm availability for the full six months from March without hesitation.</p>
        </div>
      </section>`;
  };

  /* Study Index View */
  Guide.views.study = function study(view) {
    const done = progress.modules();
    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("book")} Study</span>
        <h1>Study Path</h1>
        <p class="lede">Seven focused modules totalling about ${Math.round(totalMinutes() / 60)} hours. Each opens with three key takeaways, so a quick review is always possible.</p>
      </header>
      ${[1, 2, 3]
        .map(
          (tier) => `
        <section class="section">
          <h2 class="reveal">${ui.tierLabel(tier)}</h2>
          <div class="grid grid-2">
            ${Guide.modules
              .filter((module) => module.tier === tier)
              .map(
                (module) => `
              <a class="card card-link reveal" href="#/study/${module.id}">
                <div class="card-top">
                  <span class="card-icon">${icon(module.icon)}</span>
                  ${done[module.id] ? `<span class="pill pill-good">${icon("check", "inline-icon")} Reviewed</span>` : `<span class="pill">${module.minutes} Minutes</span>`}
                </div>
                <h3>${module.title}</h3>
                <p class="small" style="margin:0">${module.summary}</p>
              </a>`
              )
              .join("")}
          </div>
        </section>`
        )
        .join("")}`;
  };

  /* Single Module View */
  Guide.views.module = function moduleView(view, id, sectionId) {
    const module = moduleById(id);
    if (!module) return Guide.views.notFound(view);

    const index = Guide.modules.indexOf(module);
    const prev = Guide.modules[index - 1];
    const next = Guide.modules[index + 1];
    const isDone = Boolean(progress.modules()[id]);

    view.classList.add("is-wide");
    view.innerHTML = `
      <header class="page-header" style="max-width:var(--content-w)">
        <span class="eyebrow">${icon(module.icon)} Module ${index + 1} of ${Guide.modules.length}</span>
        <h1>${module.title}</h1>
        <div class="meta-row">${ui.tierPill(module.tier)}<span class="pill">${icon("clock", "inline-icon")} ${module.minutes} Minutes</span></div>
      </header>

      <div class="module-layout">
        <article>
          <section class="takeaways reveal">
            <h2>${icon("spark")} Key Takeaways</h2>
            <ol>${module.takeaways.map((item) => `<li>${item}</li>`).join("")}</ol>
          </section>

          ${module.sections
            .map(
              (section, i) => `
            <section class="section reveal" id="sec-${section.id}">
              <h2 class="section-title"><span class="num">${String(i + 1).padStart(2, "0")}</span>${section.title}</h2>
              ${section.html}
            </section>`
            )
            .join("")}

          <section class="section reveal" id="sec-answers">
            <h2 class="section-title"><span class="num">${String(module.sections.length + 1).padStart(2, "0")}</span>Interview-Ready Answers</h2>
            ${module.ladder
              .map(
                (item, i) => `
              <details class="accordion" ${i === 0 ? "open" : ""}>
                <summary>“${item.q}” ${icon("chevronDown", "chev")}</summary>
                <div class="accordion-body ladder">
                  <div class="ladder-step" data-level="weak"><span class="ladder-tag">Weak</span><p>${item.weak}</p></div>
                  <div class="ladder-step" data-level="good"><span class="ladder-tag">Good</span><p>${item.good}</p></div>
                  <div class="ladder-step" data-level="great"><span class="ladder-tag">Excellent</span><p>${item.great}</p></div>
                </div>
              </details>`
              )
              .join("")}
          </section>

          <section class="section reveal" id="sec-traps">
            ${ui.callout("Common Traps", `<ul>${module.traps.map((trap) => `<li>${trap}</li>`).join("")}</ul>`, "callout-rose", "flag")}
          </section>

          <div class="complete-bar">
            <div><strong>Finished This Module?</strong><div class="small muted">Marking it reviewed updates the readiness score.</div></div>
            <button type="button" class="btn ${isDone ? "btn-soft" : ""}" id="mark-done" aria-pressed="${isDone}">${icon("check")} <span>${isDone ? "Reviewed" : "Mark as Reviewed"}</span></button>
          </div>

          <nav class="module-nav" aria-label="Module navigation">
            ${prev ? `<a class="card card-link prev" href="#/study/${prev.id}"><span class="small muted">${icon("arrowLeft", "inline-icon")} Previous</span><strong>${prev.title}</strong></a>` : "<span></span>"}
            ${next ? `<a class="card card-link next" href="#/study/${next.id}"><span class="small muted">Next ${icon("arrowRight", "inline-icon")}</span><strong>${next.title}</strong></a>` : `<a class="card card-link next" href="#/practice/quiz"><span class="small muted">Next ${icon("arrowRight", "inline-icon")}</span><strong>Test Yourself With the Quiz</strong></a>`}
          </nav>
        </article>

        <aside class="toc" aria-label="On this page">
          <div class="toc-title">On This Page</div>
          <ol>
            ${module.sections.map((section) => `<li><a href="#/study/${module.id}/${section.id}" data-section="${section.id}">${section.title}</a></li>`).join("")}
            <li><a href="#/study/${module.id}/answers" data-section="answers">Interview-Ready Answers</a></li>
          </ol>
        </aside>
      </div>`;

    Guide.mountWidgets(view);

    view.querySelector("#mark-done").addEventListener("click", (event) => {
      const button = event.currentTarget;
      const nowDone = progress.toggleModule(id);
      button.setAttribute("aria-pressed", String(nowDone));
      button.classList.toggle("btn-soft", nowDone);
      button.querySelector("span").textContent = nowDone ? "Reviewed" : "Mark as Reviewed";
      if (nowDone) Guide.toast(`${module.short} Marked as Reviewed`);
    });

    /* Table of Contents Scroll Spy */
    const links = view.querySelectorAll(".toc a");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const active = entry.target.id.replace("sec-", "");
          links.forEach((link) => link.classList.toggle("is-active", link.dataset.section === active));
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    view.querySelectorAll("section[id^='sec-']").forEach((section) => observer.observe(section));

    if (sectionId) {
      window.setTimeout(() => {
        const target = view.querySelector(`#sec-${sectionId}`);
        if (target) {
          target.classList.add("is-visible");
          target.scrollIntoView({ behavior: Guide.scrollBehavior(), block: "start" });
        }
      }, 80);
    }

    return () => observer.disconnect();
  };

  /* Flashcards View */
  Guide.views.flashcards = function flashcards(view) {
    const groups = [{ id: "all", label: "All" }, { id: "review", label: "Review Pile" }, { id: "neot", label: "Neot" }].concat(
      Guide.modules.map((module) => ({ id: module.id, label: module.short }))
    );
    let filter = "all";
    let deck = [];
    let position = 0;

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("cards")} Practice</span>
        <h1>Flashcards</h1>
        <p class="lede">Recall the answer before flipping. Cards marked as known leave the review pile and raise the readiness score.</p>
      </header>
      <div class="toolbar"><div class="segmented" role="group" aria-label="Deck filter" id="flash-filter">${groups.map((group) => `<button type="button" data-filter="${group.id}">${group.label}</button>`).join("")}</div></div>
      <div class="card" style="padding:1rem 1.2rem">
        <div class="range-head small"><span id="flash-count"></span><span id="flash-known"></span></div>
        <div class="meter" style="margin-top:0.5rem"><span id="flash-meter"></span></div>
      </div>
      <div class="flash-stage" id="flash-stage"></div>
      <div class="flash-controls">
        <button type="button" class="btn btn-ghost" id="flash-prev" aria-label="Previous card">${icon("arrowLeft")}</button>
        <button type="button" class="btn btn-ghost" id="flash-review">Still Learning</button>
        <button type="button" class="btn" id="flash-known-btn">${icon("check")} Got It</button>
        <button type="button" class="btn btn-ghost" id="flash-next" aria-label="Next card">${icon("arrowRight")}</button>
        <button type="button" class="btn btn-ghost" id="flash-shuffle">${icon("shuffle")} Shuffle</button>
      </div>
      <p class="small muted" style="text-align:center;margin-top:1rem">Use <kbd>Space</kbd> to flip and the <kbd>←</kbd> <kbd>→</kbd> keys to move. Press <kbd>1</kbd> for Still Learning or <kbd>2</kbd> for Got It.</p>`;

    const stage = view.querySelector("#flash-stage");

    function buildDeck() {
      const state = progress.flash();
      deck = Guide.flashcards.filter((card) => {
        if (filter === "all") return true;
        if (filter === "review") return state[card.id] !== "known";
        return card.module === filter;
      });
      position = 0;
    }

    function renderStats() {
      const state = progress.flash();
      const known = Guide.flashcards.filter((card) => state[card.id] === "known").length;
      view.querySelector("#flash-count").textContent = deck.length ? `Card ${position + 1} of ${deck.length}` : "No Cards in This Deck";
      view.querySelector("#flash-known").textContent = `${known} of ${Guide.flashcards.length} Known`;
      view.querySelector("#flash-meter").style.width = `${(known / Guide.flashcards.length) * 100}%`;
      view.querySelectorAll("#flash-filter button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === filter)));
    }

    function renderCard() {
      renderStats();
      if (!deck.length) {
        stage.innerHTML = `<div class="card empty-state"><h3>Every Card Here Is Known</h3><p class="muted">Pick another deck or switch to All to keep revising.</p></div>`;
        return;
      }
      const card = deck[position];
      const module = moduleById(card.module);
      const topic = module ? module.short : "Neot";
      const state = progress.flash()[card.id];
      stage.innerHTML = `
        <button type="button" class="flashcard" id="flashcard" aria-label="Flashcard. Activate to flip.">
          <div class="flash-face front">
            <div class="flash-top"><span>${topic}</span><span>${state === "known" ? "Known" : "Question"}</span></div>
            <div class="flash-q">${card.q}</div>
            <div class="flash-hint">Click or Press Space to Reveal</div>
          </div>
          <div class="flash-face back">
            <div class="flash-top"><span>${topic}</span><span>Answer</span></div>
            <div class="flash-a">${card.a}</div>
          </div>
        </button>`;
      Guide.renderFormulas(stage);
      stage.querySelector("#flashcard").addEventListener("click", flip);
    }

    function flip() {
      const card = stage.querySelector("#flashcard");
      if (card) card.classList.toggle("is-flipped");
    }

    function move(step) {
      if (!deck.length) return;
      position = (position + step + deck.length) % deck.length;
      renderCard();
    }

    function rate(stateValue) {
      if (!deck.length) return;
      progress.setFlash(deck[position].id, stateValue);
      if (filter === "review" && stateValue === "known") {
        deck.splice(position, 1);
        if (position >= deck.length) position = 0;
        renderCard();
      } else {
        move(1);
      }
    }

    view.querySelector("#flash-filter").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-filter]");
      if (!button) return;
      filter = button.dataset.filter;
      buildDeck();
      renderCard();
    });
    view.querySelector("#flash-prev").addEventListener("click", () => move(-1));
    view.querySelector("#flash-next").addEventListener("click", () => move(1));
    view.querySelector("#flash-review").addEventListener("click", () => rate("review"));
    view.querySelector("#flash-known-btn").addEventListener("click", () => rate("known"));
    view.querySelector("#flash-shuffle").addEventListener("click", () => {
      deck = Guide.shuffle(deck);
      position = 0;
      renderCard();
    });

    function onKey(event) {
      if (event.target.closest("input, textarea, select, dialog")) return;
      if (event.key === " ") {
        event.preventDefault();
        flip();
      } else if (event.key === "ArrowRight") move(1);
      else if (event.key === "ArrowLeft") move(-1);
      else if (event.key === "1") rate("review");
      else if (event.key === "2") rate("known");
    }
    document.addEventListener("keydown", onKey);

    buildDeck();
    renderCard();
    return () => document.removeEventListener("keydown", onKey);
  };

  /* Quiz View */
  Guide.views.quiz = function quiz(view) {
    const topics = [{ id: "all", label: "All Topics" }, { id: "neot", label: "Neot" }].concat(
      Guide.modules.map((module) => ({ id: module.id, label: module.short }))
    );

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("quiz")} Practice</span>
        <h1>Quiz</h1>
        <p class="lede">${Guide.quiz.length} calculation and concept questions with explanations. Completing a full run across all topics records a best score.</p>
      </header>
      <div id="quiz-host"></div>`;

    const host = view.querySelector("#quiz-host");

    function setup() {
      const best = progress.quizBest();
      host.innerHTML = `
        <div class="card">
          <h3>Choose a Topic</h3>
          <div class="segmented" role="group" aria-label="Quiz topic" id="quiz-topic" style="margin:0.5rem 0 1.25rem">
            ${topics.map((topic, i) => `<button type="button" data-topic="${topic.id}" aria-pressed="${i === 0}">${topic.label}</button>`).join("")}
          </div>
          <div class="btn-row" style="align-items:center">
            <button type="button" class="btn" id="quiz-start">${icon("play")} Start Quiz</button>
            <span class="small muted">Best Full-Run Score: <strong>${best}%</strong></span>
          </div>
        </div>`;

      let topic = "all";
      host.querySelector("#quiz-topic").addEventListener("click", (event) => {
        const button = event.target.closest("button[data-topic]");
        if (!button) return;
        topic = button.dataset.topic;
        host.querySelectorAll("#quiz-topic button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      });
      host.querySelector("#quiz-start").addEventListener("click", () => run(topic));
    }

    function run(topic) {
      const pool = Guide.quiz.filter((item) => topic === "all" || item.module === topic);
      const questions = Guide.shuffle(pool).map((item) => ({ item, order: Guide.shuffle(item.options.map((option, i) => i)) }));
      let index = 0;
      let score = 0;
      const misses = [];

      function renderQuestion() {
        const { item, order } = questions[index];
        const module = moduleById(item.module);
        host.innerHTML = `
          <div class="card quiz-card">
            <div class="range-head small"><span>Question ${index + 1} of ${questions.length}</span><span>Score ${score}</span></div>
            <div class="meter" style="margin:0.5rem 0 1.4rem"><span style="width:${(index / questions.length) * 100}%"></span></div>
            <span class="pill" style="margin-bottom:0.75rem">${module ? module.short : "Neot"}</span>
            <p class="quiz-q">${item.q}</p>
            <ul class="options">
              ${order.map((optionIndex, i) => `<li><button type="button" class="option" data-option="${optionIndex}"><span class="option-key">${"ABCD"[i]}</span><span>${escapeHtml(item.options[optionIndex])}</span></button></li>`).join("")}
            </ul>
            <div id="quiz-feedback"></div>
          </div>`;

        host.querySelectorAll(".option").forEach((button) => {
          button.addEventListener("click", () => {
            const chosen = Number(button.dataset.option);
            const correct = chosen === item.answer;
            if (correct) score += 1;
            else misses.push(item);
            host.querySelectorAll(".option").forEach((option) => {
              option.disabled = true;
              const value = Number(option.dataset.option);
              if (value === item.answer) option.classList.add("is-correct");
              else if (value === chosen) option.classList.add("is-wrong");
            });
            host.querySelector("#quiz-feedback").innerHTML = `
              <div class="explain">
                ${ui.callout(correct ? "Correct" : "Not Quite", `<p>${item.explain}</p>`, correct ? "" : "callout-rose", correct ? "check" : "info")}
                <button type="button" class="btn" id="quiz-next">${index + 1 < questions.length ? "Next Question" : "See Results"} ${icon("arrowRight")}</button>
              </div>`;
            const nextButton = host.querySelector("#quiz-next");
            nextButton.focus();
            nextButton.addEventListener("click", () => {
              index += 1;
              if (index < questions.length) renderQuestion();
              else finish();
            });
          });
        });
      }

      function finish() {
        const percent = Math.round((score / questions.length) * 100);
        if (topic === "all" && percent > progress.quizBest()) {
          store.set("quizBest", percent);
          Guide.emit("progress");
        }
        const verdict = percent >= 80 ? "Interview-ready on these topics." : percent >= 60 ? "Solid base, so revisit the explanations below." : "Worth another pass through the related modules.";
        host.innerHTML = `
          <div class="card empty-state">
            <div class="score-big">${percent}%</div>
            <p class="muted" style="margin:0.5rem 0 1.25rem">${score} of ${questions.length} correct. ${verdict}</p>
            <div class="btn-row" style="justify-content:center">
              <button type="button" class="btn" id="quiz-again">${icon("refresh")} Try Again</button>
              <button type="button" class="btn btn-ghost" id="quiz-setup">Change Topic</button>
            </div>
          </div>
          ${
            misses.length
              ? `<h3 style="margin-top:2rem">Review These</h3>${misses
                  .map((item) => `<div class="card" style="margin-bottom:0.75rem"><p><strong>${item.q}</strong></p><p class="small" style="margin:0">Correct answer: ${escapeHtml(item.options[item.answer])}. ${item.explain}</p></div>`)
                  .join("")}`
              : ""
          }`;
        host.querySelector("#quiz-again").addEventListener("click", () => run(topic));
        host.querySelector("#quiz-setup").addEventListener("click", setup);
      }

      renderQuestion();
    }

    setup();
  };

  /* Statement Drills View */
  Guide.views.drills = function drills(view) {
    let current = Guide.drills[0];

    view.classList.add("is-wide");
    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("table")} Practice</span>
        <h1>Statement Drills</h1>
        <p class="lede">Classic “what happens if” questions at a 25% tax rate. Say each answer aloud, then reveal it to check.</p>
      </header>
      <div class="drill-picker" id="drill-picker" role="group" aria-label="Choose a drill"></div>
      <div id="drill-host" style="margin-top:1.25rem"></div>`;

    const picker = view.querySelector("#drill-picker");
    const host = view.querySelector("#drill-host");

    function renderPicker() {
      const done = progress.drills();
      picker.innerHTML = Guide.drills
        .map((drill) => `<button type="button" data-drill="${drill.id}" aria-pressed="${drill.id === current.id}" class="${done[drill.id] ? "is-done" : ""}">${drill.title}</button>`)
        .join("");
    }

    function lines(items) {
      return items
        .map(([label, value]) => {
          const tone = value.startsWith("+") ? "up" : value.startsWith("−") ? "down" : "flat";
          return `<div class="drill-line"><span>${escapeHtml(label)}</span><span class="val ${tone}">${value}</span></div>`;
        })
        .join("");
    }

    function renderDrill() {
      const columns = [
        ["is", "IS", "Income Statement"],
        ["cf", "CF", "Cash Flow Statement"],
        ["bs", "BS", "Balance Sheet"]
      ];
      host.innerHTML = `
        <div class="card">
          <h2 style="margin-bottom:0.4rem">${current.title}</h2>
          <p style="margin:0">${current.prompt}</p>
        </div>
        <div class="drill-grid">
          ${columns
            .map(
              ([key, abbr, title]) => `
            <div class="drill-col" data-col="${key}">
              <h4><span>${abbr}</span>${title}</h4>
              <div class="drill-body"><div class="drill-locked"><div><p>Think It Through First</p><button type="button" class="btn btn-soft btn-sm" data-reveal="${key}">Reveal</button></div></div></div>
            </div>`
            )
            .join("")}
        </div>
        <div class="btn-row">
          <button type="button" class="btn btn-ghost" id="drill-all">Reveal All</button>
          <button type="button" class="btn" id="drill-next">Next Drill ${icon("arrowRight")}</button>
        </div>
        <div id="drill-takeaway"></div>
        <p class="small muted" style="margin-top:1rem">Teal marks an increase and rose marks a decrease.</p>`;

      const revealed = new Set();

      function reveal(key) {
        if (revealed.has(key)) return;
        revealed.add(key);
        const col = host.querySelector(`[data-col="${key}"]`);
        col.querySelector(".drill-body").innerHTML = lines(current[key]);
        col.classList.add("is-revealed");
        if (revealed.size === 3) {
          host.querySelector("#drill-takeaway").innerHTML = ui.callout("Takeaway", `<p>${current.takeaway}</p>`, "", "lightbulb");
          progress.markDrill(current.id);
          renderPicker();
        }
      }

      host.querySelectorAll("[data-reveal]").forEach((button) => button.addEventListener("click", () => reveal(button.dataset.reveal)));
      host.querySelector("#drill-all").addEventListener("click", () => ["is", "cf", "bs"].forEach(reveal));
      host.querySelector("#drill-next").addEventListener("click", () => {
        const i = Guide.drills.indexOf(current);
        current = Guide.drills[(i + 1) % Guide.drills.length];
        renderPicker();
        renderDrill();
      });
    }

    picker.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-drill]");
      if (!button) return;
      current = Guide.drills.find((drill) => drill.id === button.dataset.drill);
      renderPicker();
      renderDrill();
    });

    renderPicker();
    renderDrill();
  };

  /* Model Answer Markup With Highlighted Personal Details */
  function answerHtml(item) {
    const paragraphs = item.answer
      .map((paragraph) => `<p>${paragraph.replace(/\[\[(.+?)\]\]/g, '<span class="fill-in" title="Personalise this detail">$1</span>')}</p>`)
      .join("");
    const note = item.note ? `<p class="answer-note">${icon("pen", "inline-icon")} ${item.note}</p>` : "";
    const lang = item.cat === "fr" ? ' lang="fr"' : "";
    return `<div class="model-answer"${lang}>${paragraphs}</div>${note}`;
  }

  function pointsHtml(item) {
    const lang = item.cat === "fr" ? ' lang="fr"' : "";
    return `<div class="listen-for"><h4>${item.cat === "fr" ? "Points attendus" : "What They Listen For"}</h4><ul class="tag-list"${lang}>${item.points.map((point) => `<li>${point}</li>`).join("")}</ul></div>`;
  }

  Guide.answerHtml = answerHtml;

  /* Mock Interview View */
  Guide.views.mock = function mock(view) {
    let mode = "practice";
    let category = "all";
    let queue = [];
    let current = null;
    let timer = null;
    let elapsed = 0;
    let duration = 90;

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("mic")} Practice</span>
        <h1>Mock Interview</h1>
        <p class="lede">Answer each question aloud against the clock, then compare your response with a spoken model answer. Highlighted details in the model answers are placeholders for your own examples.</p>
      </header>
      <div class="toolbar">
        <div class="segmented" role="group" aria-label="Mode" id="mock-mode">
          <button type="button" data-mode="practice" aria-pressed="true">${icon("clock", "inline-icon")} Timed Practice</button>
          <button type="button" data-mode="bank" aria-pressed="false">${icon("book", "inline-icon")} Answer Bank</button>
        </div>
      </div>
      <div class="toolbar">
        <div class="segmented" role="group" aria-label="Question category" id="mock-cat">
          <button type="button" data-cat="all">All</button>
          ${Guide.mockCategories.map((cat) => `<button type="button" data-cat="${cat.id}">${cat.label}</button>`).join("")}
        </div>
      </div>
      <div id="mock-host"></div>`;

    const host = view.querySelector("#mock-host");

    function syncButtons() {
      view.querySelectorAll("#mock-cat button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.cat === category)));
      view.querySelectorAll("#mock-mode button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mode === mode)));
    }

    function filtered() {
      return Guide.mock.filter((item) => category === "all" || item.cat === category);
    }

    function stopTimer() {
      window.clearInterval(timer);
      timer = null;
    }

    function renderTimer() {
      const node = host.querySelector(".timer");
      if (!node) return;
      const remaining = duration - elapsed;
      const shown = Math.abs(remaining);
      node.classList.toggle("is-over", remaining < 0);
      node.querySelector(".timer-time").textContent = `${remaining < 0 ? "+" : ""}${Math.floor(shown / 60)}:${String(shown % 60).padStart(2, "0")}`;
      node.querySelector(".timer-bar span").style.width = `${Math.min(100, (elapsed / duration) * 100)}%`;
    }

    /* Answer Bank Mode */
    function renderBank() {
      stopTimer();
      const groups = Guide.mockCategories.filter((cat) => category === "all" || cat.id === category);
      host.innerHTML = groups
        .map((cat) => {
          const items = Guide.mock.filter((item) => item.cat === cat.id);
          return `
            <section class="section">
              <h2 class="bank-title">${cat.label}</h2>
              ${items
                .map(
                  (item) => `
                <details class="accordion">
                  <summary${item.cat === "fr" ? ' lang="fr"' : ""}>${item.q} ${icon("chevronDown", "chev")}</summary>
                  <div class="accordion-body">
                    ${answerHtml(item)}
                    ${pointsHtml(item)}
                    <a class="btn btn-ghost btn-sm" href="${item.link}">Revise This Topic ${icon("arrowRight")}</a>
                  </div>
                </details>`
                )
                .join("")}
            </section>`;
        })
        .join("");
    }

    /* Timed Practice Mode */
    function nextQuestion() {
      stopTimer();
      elapsed = 0;
      if (!queue.length) queue = Guide.shuffle(filtered());
      current = queue.shift();
      const cat = Guide.mockCategories.find((item) => item.id === current.cat);
      const ratings = store.get("mockRatings", {});
      const key = current.id;
      const lang = current.cat === "fr" ? ' lang="fr"' : "";

      host.innerHTML = `
        <div class="card mock-card">
          <div class="mock-top">
            <span class="pill">${cat.label}</span>
            <div class="timer"><span class="timer-time">1:30</span><span class="timer-bar"><span></span></span></div>
          </div>
          <p class="mock-q"${lang}>${current.q}</p>
          <div class="btn-row">
            <button type="button" class="btn" id="mock-timer">${icon("play")} Start Timer</button>
            <div class="segmented" role="group" aria-label="Answer length" id="mock-duration">
              ${[60, 90, 120].map((seconds) => `<button type="button" data-seconds="${seconds}" aria-pressed="${seconds === duration}">${seconds}s</button>`).join("")}
            </div>
            <button type="button" class="btn btn-ghost" id="mock-reveal">${icon("lightbulb")} Reveal Model Answer</button>
            <button type="button" class="btn btn-ghost" id="mock-next">Next Question ${icon("arrowRight")}</button>
          </div>
          <div id="mock-answer"></div>
          <p class="small muted mock-remaining">${queue.length} more questions in this round.${ratings[key] ? ` Last self-rating: ${ratings[key]}.` : ""}</p>
        </div>
        ${ui.callout("How to Compare", "<p>Judge your answer on structure and substance rather than wording. Check whether you opened with a clear headline and covered the listening points, then whether you finished on a judgement or recommendation.</p>", "callout-indigo", "lightbulb")}`;

      renderTimer();

      host.querySelector("#mock-timer").addEventListener("click", (event) => {
        const button = event.currentTarget;
        if (timer) {
          stopTimer();
          button.innerHTML = `${icon("play")} Resume`;
        } else {
          timer = window.setInterval(() => {
            elapsed += 1;
            renderTimer();
          }, 1000);
          button.innerHTML = `${icon("pause")} Pause`;
        }
      });

      host.querySelector("#mock-duration").addEventListener("click", (event) => {
        const button = event.target.closest("button[data-seconds]");
        if (!button) return;
        duration = Number(button.dataset.seconds);
        host.querySelectorAll("#mock-duration button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        renderTimer();
      });

      host.querySelector("#mock-reveal").addEventListener("click", () => {
        stopTimer();
        host.querySelector("#mock-timer").innerHTML = `${icon("play")} Resume`;
        host.querySelector("#mock-answer").innerHTML = `
          <div class="keypoints">
            <h3>Model Answer</h3>
            ${answerHtml(current)}
            ${pointsHtml(current)}
            <div class="btn-row rate-row">
              <span class="small muted">Rate Your Answer</span>
              <div class="segmented" role="group" aria-label="Self-rating" id="mock-rate">
                ${["Needs Work", "Solid", "Nailed It"].map((label) => `<button type="button" data-rate="${label}" aria-pressed="${ratings[key] === label}">${label}</button>`).join("")}
              </div>
              <a class="btn btn-ghost btn-sm" href="${current.link}">Revise This Topic ${icon("arrowRight")}</a>
            </div>
          </div>`;
        host.querySelector("#mock-rate").addEventListener("click", (event) => {
          const button = event.target.closest("button[data-rate]");
          if (!button) return;
          const all = store.get("mockRatings", {});
          all[key] = button.dataset.rate;
          store.set("mockRatings", all);
          host.querySelectorAll("#mock-rate button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        });
      });

      host.querySelector("#mock-next").addEventListener("click", nextQuestion);
    }

    function render() {
      syncButtons();
      if (mode === "bank") {
        renderBank();
      } else {
        queue = Guide.shuffle(filtered());
        nextQuestion();
      }
    }

    view.querySelector("#mock-cat").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-cat]");
      if (!button) return;
      category = button.dataset.cat;
      render();
    });

    view.querySelector("#mock-mode").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-mode]");
      if (!button) return;
      mode = button.dataset.mode;
      render();
    });

    render();
    return stopTimer;
  };

  /* Story Builder View */
  Guide.views.story = function storyView(view) {
    const saved = progress.story();

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("pen")} Prepare</span>
        <h1>Story Builder</h1>
        <p class="lede">Personal questions decide fit interviews, so draft the answers only you can give. Each prompt pairs a suggested structure with a model answer to adapt, and drafts save automatically in this browser.</p>
      </header>
      <div class="toolbar">
        <button type="button" class="btn" id="story-download">${icon("download")} Download My Notes</button>
        <span class="save-state" id="story-state" aria-live="polite">Saved Locally</span>
      </div>
      ${Guide.story
        .map((prompt, i) => {
          const sample = Guide.mock.find((item) => item.id === prompt.sampleId);
          return `
        <details class="accordion reveal" ${i === 0 ? "open" : ""}>
          <summary><span class="pill">${prompt.target}</span>${prompt.title} ${icon("chevronDown", "chev")}</summary>
          <div class="accordion-body"${prompt.lang === "fr" ? ' lang="fr"' : ""}>
            <h4>${prompt.lang === "fr" ? "Structure suggérée" : "Suggested Structure"}</h4>
            <ul class="tag-list">${prompt.guidance.map((line) => `<li>${line}</li>`).join("")}</ul>
            ${
              sample
                ? `<details class="sample-answer"><summary>${icon("lightbulb")} ${prompt.lang === "fr" ? "Réponse modèle à adapter" : "Model Answer to Adapt"}</summary>${answerHtml(sample)}</details>`
                : ""
            }
            <div class="field">
              <label for="story-${prompt.id}">${prompt.lang === "fr" ? "Brouillon" : "Draft"}</label>
              <textarea class="input" id="story-${prompt.id}" data-story="${prompt.id}" placeholder="${escapeHtml(prompt.starter)}">${escapeHtml(saved[prompt.id] || "")}</textarea>
            </div>
            <div class="btn-row" style="margin-top:0.6rem;align-items:center">
              <button type="button" class="btn btn-ghost btn-sm" data-starter="${prompt.id}">Insert Starter Line</button>
              <span class="small muted" data-count="${prompt.id}"></span>
            </div>
          </div>
        </details>`;
        })
        .join("")}
      ${ui.callout("Confidentiality", "<p>Describe Resonance work by sector and role rather than client names or deal figures that are not public.</p>", "callout-amber", "alert")}`;

    const state = view.querySelector("#story-state");

    function updateCount(id) {
      const text = view.querySelector(`#story-${id}`).value.trim();
      const words = text ? text.split(/\s+/).length : 0;
      const seconds = Math.round((words / 140) * 60);
      view.querySelector(`[data-count="${id}"]`).textContent = words ? `${words} Words · About ${seconds} Seconds Spoken` : "No Draft Yet";
    }

    const persist = Guide.debounce(() => {
      const data = {};
      view.querySelectorAll("[data-story]").forEach((area) => {
        data[area.dataset.story] = area.value;
      });
      store.set("story", data);
      state.textContent = "Saved Locally";
      Guide.emit("progress");
    }, 500);

    view.querySelectorAll("[data-story]").forEach((area) => {
      updateCount(area.dataset.story);
      area.addEventListener("input", () => {
        state.textContent = "Saving…";
        updateCount(area.dataset.story);
        persist();
      });
    });

    view.querySelectorAll("[data-starter]").forEach((button) => {
      button.addEventListener("click", () => {
        const prompt = Guide.story.find((item) => item.id === button.dataset.starter);
        const area = view.querySelector(`#story-${prompt.id}`);
        if (!area.value.trim()) area.value = `${prompt.starter} `;
        area.focus();
        area.setSelectionRange(area.value.length, area.value.length);
        area.dispatchEvent(new Event("input"));
      });
    });

    view.querySelector("#story-download").addEventListener("click", () => {
      const text = Guide.story
        .map((prompt) => `${prompt.title.toUpperCase()}\n\n${(view.querySelector(`#story-${prompt.id}`).value || "").trim() || "(No draft yet)"}\n`)
        .join("\n");
      const blob = new Blob([`Neot Interview Notes\n\n${text}`], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "neot-interview-notes.txt";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    });
  };

  /* French Lexicon View */
  Guide.views.lexicon = function lexicon(view) {
    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("globe")} Prepare</span>
        <h1>French Lexicon</h1>
        <p class="lede">Neot requires fluent French and English, and the technical round may switch languages. Precise French terminology signals genuine fluency in the field.</p>
      </header>
      <div class="lex-search">${icon("search")}<input class="input" type="search" id="lex-query" placeholder="Search in French or English…" aria-label="Search the lexicon"></div>
      <p class="small muted" id="lex-count"></p>
      <div class="lex-list" id="lex-list"></div>`;

    const input = view.querySelector("#lex-query");
    const list = view.querySelector("#lex-list");

    function highlight(text, query) {
      const safe = escapeHtml(text);
      if (!query) return safe;
      const pattern = new RegExp(`(${escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      return safe.replace(pattern, "<mark>$1</mark>");
    }

    function render() {
      const query = input.value.trim();
      const lower = query.toLowerCase();
      const items = Guide.lexicon.filter((item) => !lower || `${item.fr} ${item.en} ${item.def}`.toLowerCase().includes(lower));
      view.querySelector("#lex-count").textContent = `${items.length} of ${Guide.lexicon.length} Terms`;
      list.innerHTML = items.length
        ? items
            .map((item) => `<div class="lex-item"><span class="lex-fr" lang="fr">${highlight(item.fr, query)}</span><span class="lex-en">${highlight(item.en, query)}</span><span class="lex-def">${highlight(item.def, query)}</span></div>`)
            .join("")
        : `<div class="card muted">No matching term.</div>`;
    }

    input.addEventListener("input", render);
    render();
  };

  /* Interview Day View */
  Guide.views.interviewDay = function interviewDay(view) {
    const checks = progress.checklist();
    const groups = [...new Set(Guide.checklist.map((item) => item.group))];

    const emailEn = `Subject: Thank You – Investment Analyst Internship

Dear [Name],

Thank you for taking the time to speak with me today about the Investment Analyst internship. Our discussion of [specific topic] reinforced my enthusiasm for Neot's approach to financing low-carbon mobility.

Having worked on debt sizing and model review at Resonance Advisory, I would be delighted to contribute to the Neot e-motion platform from March 2027.

Kind regards,
Ha Linh`;

    const emailFr = `Objet : Remerciements – Stage Analyste Investissement

Madame, Monsieur [Nom],

Je vous remercie pour le temps que vous m'avez accordé aujourd'hui. Notre échange sur [sujet précis] a renforcé mon intérêt pour l'approche de Neot en matière de financement de la mobilité bas-carbone.

Forte de mon expérience en dimensionnement de dette et en revue de modèles chez Resonance Advisory, je serais ravie de contribuer au développement de la plateforme Neot e-motion à partir de mars 2027.

Bien cordialement,
Ha Linh`;

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("calendar")} Prepare</span>
        <h1>Interview Day</h1>
        <p class="lede">Everything for the day itself, from the final checklist and conduct during the conversation to the questions worth asking and the follow-up email.</p>
      </header>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">01</span>Readiness Checklist</h2>
        <div class="grid grid-2">
          ${groups
            .map(
              (group) => `
            <div class="card">
              <h4>${group}</h4>
              <ul class="checklist">
                ${Guide.checklist
                  .filter((item) => item.group === group)
                  .map((item) => `<li><label class="check"><input type="checkbox" data-check="${item.id}" ${checks[item.id] ? "checked" : ""}><span>${item.text}<small>${item.hint}</small></span></label></li>`)
                  .join("")}
              </ul>
            </div>`
            )
            .join("")}
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">02</span>During the Interview</h2>
        <div class="prose">
          <p>First impressions form within the opening minute, so greet both interviewers by name and keep the introduction under two minutes. Before each technical answer, take a breath and announce the structure, for example by saying that you will define the ratio, explain how it is used and then give an example. Interviewers follow a structured answer far more easily, and it buys valuable thinking time.</p>
          <p>Calculations deserve the same discipline. State the assumptions aloud and round sensibly, then sanity-check the result before moving on. When a question goes beyond what you know, say so calmly and share what you do know before reasoning toward the rest; investment teams value honest reasoning far more than confident guessing.</p>
        </div>
        <div class="grid grid-2 model-lines">
          <div class="card">
            <h4>Model Opening Line</h4>
            <p class="model-quote">“Thank you both for taking the time today. Having followed Neot e-motion's first transactions closely, I am really looking forward to discussing how my project finance experience could contribute to the team.”</p>
          </div>
          <div class="card">
            <h4>Model Closing Statement</h4>
            <p class="model-quote">“Thank you for this conversation. Today's discussion confirmed that Neot is where my project finance foundation can grow into investment judgement, and I am fully available for the six months from March 2027.”</p>
          </div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">03</span>Questions to Ask</h2>
        <p>Closing questions show how seriously you have prepared. Choose two or three from the list below, ideally adapting them to topics the interviewers raised earlier.</p>
        ${Guide.askThem.map((item) => `<div class="card ask-card"><p><strong>“${item.q}”</strong></p><p class="small muted">${item.why}</p></div>`).join("")}
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">04</span>Thank-You Email</h2>
        <p>Send within 24 hours, adapted to the conversation.</p>
        <div class="toolbar"><div class="segmented" role="group" aria-label="Email language" id="email-lang"><button type="button" data-lang="en" aria-pressed="true">English</button><button type="button" data-lang="fr" aria-pressed="false">Français</button></div><button type="button" class="btn btn-ghost btn-sm" id="email-copy">${icon("copy")} Copy</button></div>
        <textarea class="input email-text" id="email-text" rows="14" aria-label="Thank-you email template"></textarea>
      </section>`;

    view.querySelectorAll("[data-check]").forEach((box) => {
      box.addEventListener("change", () => progress.setCheck(box.dataset.check, box.checked));
    });

    const textArea = view.querySelector("#email-text");
    textArea.value = emailEn;

    view.querySelector("#email-lang").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-lang]");
      if (!button) return;
      textArea.value = button.dataset.lang === "fr" ? emailFr : emailEn;
      textArea.lang = button.dataset.lang;
      view.querySelectorAll("#email-lang button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    });

    view.querySelector("#email-copy").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(textArea.value);
        Guide.toast("Email Copied to Clipboard");
      } catch (error) {
        textArea.select();
        Guide.toast("Press Ctrl+C to Copy the Selected Text");
      }
    });
  };

  /* Not Found View */
  Guide.views.notFound = function notFound(view) {
    view.innerHTML = `
      <div class="card empty-state">
        <h1>Page Not Found</h1>
        <p class="muted">That section does not exist.</p>
        <a class="btn" href="#/">Return to the Briefing</a>
      </div>`;
  };
})(window.Guide);

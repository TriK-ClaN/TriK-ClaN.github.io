/* Page Views */
window.Guide = window.Guide || {};

(function (Guide) {
  "use strict";

  const { icon, ui, fmt, escapeHtml, store, progress } = Guide;
  Guide.views = Guide.views || {};

  const moduleById = (id) => Guide.modules.find((module) => module.id === id);

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

  /* Countdown Logic */
  function startCountdown(root) {
    const input = root.querySelector("#interview-time");
    const units = root.querySelector("#countdown-units");
    const label = root.querySelector("#countdown-label");
    if (!input) return null;

    input.value = store.get("interviewTime", Guide.interview.defaultDate);

    function tick() {
      const target = new Date(input.value);
      const diff = target.getTime() - Date.now();
      if (!Number.isFinite(diff)) return;
      if (diff <= 0) {
        label.textContent = "Interview Time";
        units.innerHTML = `<div class="countdown-unit" style="grid-column:1/-1"><strong>Bonne chance</strong><span>Trust the preparation</span></div>`;
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      label.textContent = "Interview Countdown";
      units.innerHTML = [
        [days, days === 1 ? "day" : "days"],
        [hours, hours === 1 ? "hour" : "hours"],
        [minutes, minutes === 1 ? "minute" : "minutes"]
      ]
        .map(([value, unit]) => `<div class="countdown-unit"><strong>${String(value).padStart(2, "0")}</strong><span>${unit}</span></div>`)
        .join("");
    }

    input.addEventListener("change", () => {
      store.set("interviewTime", input.value);
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

    const tierColumn = (tier, title, note) => `
      <div class="card reveal">
        <div class="timeline-day"><strong>${title}</strong>${ui.tierPill(tier)}</div>
        <p class="small">${note}</p>
        <ul class="checklist">
          ${Guide.modules
            .filter((module) => module.tier === tier)
            .map(
              (module) => `<li><a class="check" href="#/study/${module.id}" style="text-decoration:none;color:inherit">
                <span class="nav-check" style="${done[module.id] ? "" : "background:var(--surface-3);color:var(--muted)"}">${icon(done[module.id] ? "check" : "arrowRight")}</span>
                <span>${module.title}<small>${module.minutes} minutes</small></span></a></li>`
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
            <p class="lede">Everything needed for Wednesday in one place: project finance depth and the investor mindset Neot looks for, plus a story linking Resonance to sustainable mobility.</p>
            <div class="btn-row" style="margin-top:1.25rem">
              <a class="btn" href="#/study/project-finance">Start With Tier 1 ${icon("arrowRight")}</a>
              <a class="btn btn-ghost" href="#/practice/mock">${icon("mic")} Mock Interview</a>
            </div>
          </div>
          <div class="countdown">
            <span class="countdown-label" id="countdown-label">Interview Countdown</span>
            <div class="countdown-units" id="countdown-units"></div>
            <label class="countdown-edit" for="interview-time">${icon("clock")}<input type="datetime-local" id="interview-time" aria-label="Interview date and time"></label>
            <span class="small muted">Set the confirmed time; it stays saved in this browser.</span>
          </div>
        </div>
      </section>

      <section class="section reveal">
        <div class="card" style="display:flex;flex-wrap:wrap;gap:1.75rem;align-items:center">
          ${ring(summary.score, "ready")}
          <div style="flex:1;min-width:240px">
            <h2 style="margin-bottom:0.35rem">Readiness</h2>
            <p class="muted small">Progress saves automatically in this browser whenever study or practice items are completed.</p>
            <div class="grid grid-4">
              <div class="stat"><span class="stat-value">${summary.modulesDone}/${summary.totals.modules}</span><span class="stat-label">Modules</span></div>
              <div class="stat"><span class="stat-value">${summary.flashKnown}/${summary.totals.flash}</span><span class="stat-label">Flashcards</span></div>
              <div class="stat"><span class="stat-value">${summary.drillsDone}/${summary.totals.drills}</span><span class="stat-label">Drills</span></div>
              <div class="stat"><span class="stat-value">${summary.quizBest}%</span><span class="stat-label">Best quiz</span></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title reveal"><span class="num">01</span>Interview at a Glance</h2>
        <div class="grid grid-4 reveal" style="margin-bottom:1.75rem">
          <div class="stat"><span class="stat-label">Role</span><strong style="display:block">Investment Analyst Intern</strong></div>
          <div class="stat"><span class="stat-label">Start</span><strong style="display:block">${Guide.interview.start}</strong></div>
          <div class="stat"><span class="stat-label">Duration</span><strong style="display:block">${Guide.interview.duration}</strong></div>
          <div class="stat"><span class="stat-label">Location</span><strong style="display:block">${Guide.interview.location}</strong></div>
        </div>
        <div class="stages reveal">
          ${Guide.interview.stages
            .map(
              (stage) => `<div class="card stage"><h3>${stage.title}</h3><p class="small muted">${stage.length} · ${stage.who}</p><ul>${stage.focus.map((item) => `<li>${item}</li>`).join("")}</ul></div>`
            )
            .join("")}
        </div>
        ${ui.callout("Which Round Is Wednesday?", "<p>Prepare for both. Screening calls reward a sharp pitch and genuine knowledge of Neot; the technical round with an Investment Director and an Investment Officer rewards depth in project finance plus judgement on EV fleets. Everything below covers both.</p>", "callout-indigo", "info")}
      </section>

      <section class="section">
        <h2 class="section-title reveal"><span class="num">02</span>Winning Answer Formula</h2>
        <p class="reveal">Strong answers climb a ladder rather than stopping at a definition. Apply this progression to virtually every technical question.</p>
        <div class="chain reveal">
          <span class="chain-step"><strong>Formula</strong></span><span class="chain-arrow">→</span>
          <span class="chain-step"><strong>Financial intuition</strong></span><span class="chain-arrow">→</span>
          <span class="chain-step"><strong>Risk implication</strong></span><span class="chain-arrow">→</span>
          <span class="chain-step"><strong>Investment decision</strong></span>
        </div>
        <div class="ladder reveal">
          <div class="ladder-step" data-level="weak"><span class="ladder-tag">Weak</span><p>DSCR = CFADS / debt service.</p></div>
          <div class="ladder-step" data-level="good"><span class="ladder-tag">Good</span><p>DSCR measures the project's ability to service debt in a given period.</p></div>
          <div class="ladder-step" data-level="great"><span class="ladder-tag">Excellent</span><p>${moduleById("project-finance").ladder[0].great}</p></div>
        </div>
        ${ui.callout("Biggest Mindset Shift", "<p>Resonance work proves that a financing works. Neot asks whether an asset deserves equity at all. Show that both perspectives come naturally: the lender's “Will I be repaid?” and the investor's “Is this return worth the risk?”</p>", "", "lightbulb")}
      </section>

      <section class="section">
        <h2 class="section-title reveal"><span class="num">03</span>Priority Tiers</h2>
        <div class="grid grid-3">
          ${tierColumn(1, "Must Master", "Current Resonance work makes any hesitation here costly.")}
          ${tierColumn(2, "Very Likely", "Core corporate finance and investment reasoning.")}
          ${tierColumn(3, "Stand Out", "Sector depth that separates a strong candidate.")}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title reveal"><span class="num">04</span>48-Hour Plan</h2>
        <div class="timeline">
          ${Guide.plan
            .map(
              (day, dayIndex) => `
            <div class="card reveal">
              <div class="timeline-day"><strong>${day.day}</strong><span class="pill">${day.date}</span></div>
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
        <p class="lede">Paris-based specialist that designs and manages investment platforms financing low-carbon mobility, with the tagline “We drive the energy transition.”</p>
      </header>

      <section class="section">
        <div class="grid grid-4 reveal">
          <div class="stat"><span class="stat-value">2016</span><span class="stat-label">Founded</span></div>
          <div class="stat"><span class="stat-value">€500m</span><span class="stat-label">Equity across platforms</span></div>
          <div class="stat"><span class="stat-value">~€2bn</span><span class="stat-label">Financing capacity</span></div>
          <div class="stat"><span class="stat-value">€350m</span><span class="stat-label">Neot e-motion commitment</span></div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">01</span>Business Model</h2>
        <p>Neot brings institutional investors together to acquire electric vehicles along with batteries and charging infrastructure, then makes these assets available to public authorities and transport operators as integrated services. Customers avoid heavy upfront capex and technology risk, while Neot supports projects from structuring and financing through technical follow-up and operational management.</p>
        <p>Asset classes named by Neot and its partners:</p>
        <ul>
          <li>Electric buses and coaches</li>
          <li>Trucks and logistics fleets</li>
          <li>Vessels</li>
          <li>Charging infrastructure</li>
          <li>Battery packs and retrofits</li>
        </ul>
        <p>Neot's homepage also cites expertise in stationary energy storage.</p>
        <p><a class="btn btn-soft btn-sm" href="#/study/mobility">See the five as-a-service offers</a></p>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">02</span>Shareholders</h2>
        <div class="grid grid-3">
          <div class="card"><h3>EDF</h3><p class="small">Energy group, invested through its corporate venture arm EDF Pulse Ventures. Co-founder in 2016.</p></div>
          <div class="card"><h3>Forsee Power</h3><p class="small">Battery manufacturer and co-founder in 2016, which explains Neot's depth in battery technology.</p></div>
          <div class="card"><h3>Mitsui &amp; Co.</h3><p class="small">Global trading and investment group that became a shareholder in 2023.</p></div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">03</span>Platforms</h2>
        <div class="grid grid-3">
          <div class="card">
            <span class="pill">Since 2017</span>
            <h3 style="margin-top:0.6rem">Neot Green Mobility</h3>
            <p class="small">First low-carbon mobility vehicle, backed by Alba Infra Partners and Mirova alongside Banque des Territoires. Through May 2025, NGM financed over €350m of mobility assets and raised €170m of debt, mainly across France and the United Kingdom plus Scandinavia.</p>
          </div>
          <div class="card">
            <span class="pill pill-good">Launched May 2025</span>
            <h3 style="margin-top:0.6rem">Neot e-motion</h3>
            <p class="small">Pan-European leasing platform with a €350m equity commitment from Mirova (through its Mirova Energy Transition 6 fund) and Alba Infra Partners alongside Banque des Territoires. Neot e-motion France focuses on the French market. Set to take over from NGM once that platform is fully invested. European Investment Fund capital participates indirectly through Alba.</p>
          </div>
          <div class="card">
            <span class="pill">2018 to 2023</span>
            <h3 style="margin-top:0.6rem">Neot Offgrid Africa</h3>
            <p class="small">Platform launched with EDF and Meridiam to finance decentralised energy across Africa, now closed to new activity.</p>
          </div>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">04</span>Platform Debt Financing</h2>
        <p>Debt raised at platform level is the clearest bridge between Resonance experience and Neot's model, so know these two transactions precisely.</p>
        <div class="grid grid-2">
          <div class="card">
            <span class="pill pill-good">December 2025</span>
            <h3 style="margin-top:0.6rem">Neot e-motion: €125m From MUFG</h3>
            <p class="small">Senior financing in which MUFG acts as sole lender as well as arranger and agent. Tenor reaches 16 years, structured as a hybrid portfolio facility that combines a revolving credit facility with long-term project financing. Neot e-motion now pairs its €350m of equity with a full debt structure.</p>
          </div>
          <div class="card">
            <span class="pill">November 2025</span>
            <h3 style="margin-top:0.6rem">NGM: €170m Refinancing</h3>
            <p class="small">Long-term, non-recourse debt facility provided by MUFG and La Banque Postale together with its asset management arm LBP AM. Structured as a multi-currency portfolio combining project and asset financings, it replaced the revolving credit facility set up at NGM's launch.</p>
          </div>
        </div>
        ${ui.callout("Why This Matters", "<p>Both facilities follow a classic platform pattern: a revolving facility funds new assets quickly, then long-term non-recourse debt refinances the operating portfolio. Expect questions on how assets are sized under a portfolio facility and why lenders accept long tenors on contracted fleets.</p>", "callout-indigo", "lightbulb")}
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">05</span>Recent Transactions and News</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Platform</th><th>Transaction</th></tr></thead>
            <tbody>
              <tr><td>Sep 2026</td><td>Neot</td><td><strong>DepotOne:</strong> integrated pay-per-use solution launched with E.ON Drive for commercial fleet operators in Germany and the DACH region, backed by Mitsui and E.ON Innovation. One contract covers trucks and charging together with energy and financing as well as operations, with no upfront investment.</td></tr>
              <tr><td>Apr 2026</td><td>Neot</td><td><strong>E.ON, Neot and Mitsui:</strong> Charging-as-a-Service for van and truck fleets, optionally paired with Truck-as-a-Service, billed at a fixed rate per charged kilowatt hour.</td></tr>
              <tr><td>Apr 2026</td><td>NGM</td><td>Support for DSV's electrification of last-mile logistics in Germany.</td></tr>
              <tr><td>Apr 2026</td><td>Neot</td><td>Recognition in the Impact 120 index of Mouvement Impact France.</td></tr>
              <tr><td>Feb 2026</td><td>NGM</td><td><strong>Scotland:</strong> second financing round with Ember adding 60 e-coaches to the 40 delivered in March 2025, giving more than 100 by mid-2026 under the ScotZEB2 programme. Total investment is estimated at £50m, creating Europe's largest e-coach fleet run by a single operator.</td></tr>
              <tr><td>Jan 2026</td><td>Neot e-motion</td><td><strong>Denmark:</strong> 186 BYD electric buses and 93 Efacec chargers for GoCollective, an operator owned by Mutares. Phased commissioning through mid-2026 across Central Jutland and Funen as well as Greater Copenhagen. First Neot e-motion project.</td></tr>
              <tr><td>Nov 2025</td><td>NGM</td><td>Delivery of first electric trucks in Germany.</td></tr>
              <tr><td>Nov 2025</td><td>Neot</td><td>Partnership with LinkByCar to build a data-driven offer for electric vehicles.</td></tr>
              <tr><td>Mar 2025</td><td>NGM</td><td>Valbus electric buses in Val d'Isère.</td></tr>
              <tr><td>Oct 2024</td><td>NGM</td><td>Charging infrastructure programme with Zeplug, plus hybrid crew transfer vessels.</td></tr>
            </tbody>
          </table>
        </div>
        ${ui.callout("Use Figures Carefully", "<p>Neot's own pages cite different asset totals depending on metric and date, such as €400m of low-carbon assets financed since 2018 on the homepage and more than €250m of deployed assets elsewhere. Quote the €500m equity and nearly €2bn capacity figures with confidence, and frame other totals as approximate.</p>", "callout-amber", "alert")}
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">06</span>People</h2>
        <p>Philippe Ringenbach leads Neot as CEO. Round two pairs an Investment Director with an Investment Officer, and Neot's website lists the following members of the investment team.</p>
        <div class="grid grid-2">
          <div class="card">
            <h4>Investment Directors</h4>
            <ul>
              <li>Francisco Elens Da Silva Passos</li>
              <li>Maël Guégan</li>
              <li>Victor Cabanes</li>
            </ul>
          </div>
          <div class="card">
            <h4>Investment Officers</h4>
            <ul>
              <li>Agathe Laîné</li>
              <li>Bachar Salamé</li>
              <li>Paul Albespy</li>
              <li>Xavier Rule</li>
            </ul>
          </div>
        </div>
        <p style="margin-top:1rem">Once interviewer names are confirmed, review their LinkedIn profiles for recent transactions and backgrounds.</p>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">07</span>Talking Points That Land</h2>
        <ul>
          <li><strong>Specialist model:</strong> Neot combines financial structuring with industrial and technical expertise, which matches a profile built on modelling plus genuine curiosity about technology.</li>
          <li><strong>Timing:</strong> Neot e-motion is newly deployed capital, so the team is originating and structuring actively, the ideal moment to join.</li>
          <li><strong>Battery DNA:</strong> having a battery manufacturer as shareholder makes battery risk a core competence rather than a blind spot.</li>
          <li><strong>Leverage model:</strong> €500m of equity supporting nearly €2bn of assets implies substantial debt financing, where debt-sizing experience from Resonance adds immediate value.</li>
          <li><strong>Debt platform:</strong> the 16-year €125m MUFG facility for Neot e-motion shows lenders backing the model for the long term, and sizing assets into such a facility is exactly the skill Resonance has built.</li>
          <li><strong>Full cycle:</strong> origination through asset management offers exposure that advisory work rarely provides.</li>
        </ul>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">08</span>Sources</h2>
        <ul>${Guide.sources.map((source) => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label}</a></li>`).join("")}</ul>
      </section>`;
  };

  /* Role Decoder View */
  Guide.views.role = function role(view) {
    const missions = [
      ["Développement commercial", "Identify opportunities and monitor the market to design innovative offers.", "Show awareness of fleet electrification trends and the as-a-service model."],
      ["Analyse financière et structuration des projets", "Financial analysis and modelling plus profitability tracking and contractual negotiation.", "Resonance modelling and debt sizing; explain sculpting and sensitivities fluently."],
      ["Pilotage du processus d'investissement & due diligences", "Coordinate investors and banks together with external financial and legal advisers.", "Describe interactions with lenders or advisers and knowledge of DD workstreams."],
      ["Support aux décisions stratégiques et relations investisseurs", "Prepare key documents for investment committees.", "Answer “Would you invest?” with a structured framework and a recommendation."],
      ["Suivi de la performance des projets", "Analyse KPIs and recommend actions to maximise asset returns.", "Discuss budget versus actual analysis and fleet KPIs."]
    ];

    const profile = [
      ["Business school student in a finance track, Bac+4 or Bac+5", "Master's at EDHEC Business School"],
      ["First 4–6 month corporate finance internship, with Project Finance and Infrastructure among the listed fields", "Current project finance internship at Resonance Advisory"],
      ["Essential interest in energy transition topics such as sustainable mobility or infrastructure", "Infrastructure focus at Resonance plus a personal motivation to articulate"],
      ["Corporate finance concepts covering financial statements and debt structuring plus valuation", "Accounting and Valuation modules plus Debt Sizing"],
      ["Comfort with financial modelling; Project Finance exposure is a real plus", "Daily modelling and debt sizing plus model QC at Resonance"],
      ["Strong command of Microsoft Office with Excel above all", "Excel toolkit, including French function names"],
      ["Fluent French and English; a third European language is a plus", "Prepare the pitch in both languages"]
    ];

    const soft = [
      ["Analytical rigour and synthesis with a taste for numbers", "Model audit and QC procedure story"],
      ["Intellectual curiosity and ability to learn technical topics", "Battery and charging knowledge from the EV module"],
      ["Autonomy and initiative with a business orientation", "Formalising the QC procedure on personal initiative"],
      ["Team spirit and relationship skills with sponsors and LPs as well as advisers", "Coordination with clients and lenders at Resonance"]
    ];

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("briefcase")} Role Decoder</span>
        <h1>Investment Analyst, Sustainable Mobility</h1>
        <p class="lede">Every line of the offer is translated here into what interviewers will test and the evidence to bring. Reporting to an Investment Director within the Investment team, the intern works across the entire investment cycle of the Neot e-motion platform.</p>
      </header>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">01</span>Missions</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Mission in the Offer</th><th>What It Means</th><th>How to Prove It</th></tr></thead>
            <tbody>${missions.map(([fr, meaning, proof]) => `<tr><td><strong lang="fr">${fr}</strong></td><td>${meaning}</td><td>${proof}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">02</span>Profile Match</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Requirement</th><th>Evidence to Bring</th></tr></thead>
            <tbody>${profile.map(([need, proof]) => `<tr><td>${need}</td><td>${proof}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">03</span>Soft Skills to Evidence</h2>
        <div class="grid grid-2">
          ${soft.map(([skill, story]) => `<div class="card"><h4>${skill}</h4><p class="small" style="margin:0">Prepare: ${story}.</p></div>`).join("")}
        </div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">04</span>Practical Details</h2>
        <div class="grid grid-2">
          <div class="card">
            <h4>Logistics</h4>
            <ul>
              <li>Start in March 2027 for six months</li>
              <li>Office on Rue Saint-Lazare, Paris 9e</li>
              <li>Remote work two days a week after onboarding</li>
            </ul>
          </div>
          <div class="card">
            <h4>Benefits</h4>
            <ul>
              <li>Swile meal card worth €11 a day, 60% covered by Neot</li>
              <li>Sustainable mobility allowance of €50 to €58, depending on conditions</li>
              <li>One day of paid leave per month</li>
            </ul>
          </div>
        </div>
        ${ui.callout("Why the Timing Fits", "<p>Neot recruits for March 2027, which suits the second internship required by the EDHEC Master's programme. Mention availability for the full six months without hesitation.</p>", "", "calendar")}
      </section>`;
  };

  /* Study Index View */
  Guide.views.study = function study(view) {
    const done = progress.modules();
    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("book")} Study</span>
        <h1>Technical Syllabus</h1>
        <p class="lede">Nine modules ordered by priority. Tier 1 is non-negotiable given current Resonance work, Tier 2 is very likely to come up and Tier 3 is where a candidate stands out.</p>
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
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem">
                  <span class="card-icon">${icon(module.icon)}</span>
                  ${done[module.id] ? `<span class="pill pill-good">${icon("check", "inline-icon")} Reviewed</span>` : `<span class="pill">${module.minutes} min</span>`}
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
        <p class="lede">${module.summary}</p>
        <div class="meta-row">${ui.tierPill(module.tier)}<span class="pill">${icon("clock", "inline-icon")} ${module.minutes} minutes</span><span class="pill">${module.sections.length} sections</span></div>
      </header>

      <div class="module-layout">
        <article>
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
            <p>Every question shows three levels. Aim for the excellent version, then make it your own.</p>
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
            <div><strong>Finished this module?</strong><div class="small muted">Marking it reviewed updates the readiness score.</div></div>
            <button type="button" class="btn ${isDone ? "btn-soft" : ""}" id="mark-done" aria-pressed="${isDone}">${icon("check")} <span>${isDone ? "Reviewed" : "Mark as Reviewed"}</span></button>
          </div>

          <nav class="module-nav" aria-label="Module navigation">
            ${prev ? `<a class="card card-link prev" href="#/study/${prev.id}"><span class="small muted">${icon("arrowLeft", "inline-icon")} Previous</span><strong style="display:block">${prev.title}</strong></a>` : "<span></span>"}
            ${next ? `<a class="card card-link next" href="#/study/${next.id}"><span class="small muted">Next ${icon("arrowRight", "inline-icon")}</span><strong style="display:block">${next.title}</strong></a>` : `<a class="card card-link next" href="#/practice/quiz"><span class="small muted">Next ${icon("arrowRight", "inline-icon")}</span><strong style="display:block">Test Yourself With the Quiz</strong></a>`}
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
      if (nowDone) Guide.toast(`${module.short} marked as reviewed`);
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
        <p class="lede">Recall before revealing. Mark each card as known or keep it in the review pile; progress feeds the readiness score.</p>
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
      <p class="small muted" style="text-align:center;margin-top:1rem">Keyboard: <kbd>Space</kbd> flips, <kbd>←</kbd> and <kbd>→</kbd> move, <kbd>1</kbd> still learning, <kbd>2</kbd> got it.</p>`;

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
      view.querySelector("#flash-count").textContent = deck.length ? `Card ${position + 1} of ${deck.length}` : "No cards in this deck";
      view.querySelector("#flash-known").textContent = `${known} of ${Guide.flashcards.length} known`;
      view.querySelector("#flash-meter").style.width = `${(known / Guide.flashcards.length) * 100}%`;
      view.querySelectorAll("#flash-filter button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === filter)));
    }

    function renderCard() {
      renderStats();
      if (!deck.length) {
        stage.innerHTML = `<div class="card" style="text-align:center;padding:3rem 1.5rem"><h3>Every card here is marked as known.</h3><p class="muted">Pick another deck or switch to All to keep revising.</p></div>`;
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
            <div class="flash-hint">Click or press Space to reveal</div>
          </div>
          <div class="flash-face back">
            <div class="flash-top"><span>${topic}</span><span>Answer</span></div>
            <div class="flash-a">${card.a}</div>
          </div>
        </button>`;
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
      if (event.target.closest("input, textarea, select")) return;
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
        <p class="lede">Calculation and concept questions with explanations. A full run across all topics records a best score toward readiness.</p>
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
            <span class="small muted">Best full-run score: <strong>${best}%</strong></span>
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
      const questions = Guide.shuffle(pool).map((item) => {
        const order = Guide.shuffle(item.options.map((option, i) => i));
        return { item, order };
      });
      let index = 0;
      let score = 0;
      const misses = [];

      function renderQuestion() {
        const { item, order } = questions[index];
        const module = moduleById(item.module);
        host.innerHTML = `
          <div class="card" style="padding:clamp(1.25rem,4vw,2rem)">
            <div class="range-head small"><span>Question ${index + 1} of ${questions.length}</span><span>Score ${score}</span></div>
            <div class="meter" style="margin:0.5rem 0 1.4rem"><span style="width:${(index / questions.length) * 100}%"></span></div>
            <span class="pill" style="margin-bottom:0.75rem">${module ? module.short : "Neot"}</span>
            <p class="quiz-q">${item.q}</p>
            <ul class="options">
              ${order.map((optionIndex, i) => `<li><button type="button" class="option" data-option="${optionIndex}"><span class="option-key">${"ABCD"[i]}</span><span>${item.options[optionIndex]}</span></button></li>`).join("")}
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
            const next = host.querySelector("#quiz-next");
            next.focus();
            next.addEventListener("click", () => {
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
        const verdict = percent >= 80 ? "Interview-ready on these topics." : percent >= 60 ? "Solid base; revisit the explanations below." : "Worth another pass through the related modules.";
        host.innerHTML = `
          <div class="card" style="text-align:center;padding:2rem 1.5rem">
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
                  .map((item) => `<div class="card" style="margin-bottom:0.75rem"><p><strong>${item.q}</strong></p><p class="small" style="margin:0">Answer: ${item.options[item.answer]}. ${item.explain}</p></div>`)
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
        <p class="lede">Classic “what happens if” questions at a 25% tax rate. Say the answer aloud for each statement, then reveal it to check.</p>
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
          return `<div class="drill-line"><span>${label}</span><span class="val ${tone}">${value}</span></div>`;
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
              <div class="drill-body"><div class="drill-locked"><div><p>Think it through first.</p><button type="button" class="btn btn-soft btn-sm" data-reveal="${key}">Reveal</button></div></div></div>
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

  /* Mock Interview View */
  Guide.views.mock = function mock(view) {
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
        <p class="lede">Draw a question, answer it aloud against the clock, then compare with the key points an Investment Director will listen for.</p>
      </header>
      <div class="toolbar">
        <div class="segmented" role="group" aria-label="Question category" id="mock-cat">
          <button type="button" data-cat="all">All</button>
          ${Guide.mockCategories.map((cat) => `<button type="button" data-cat="${cat.id}">${cat.label}</button>`).join("")}
        </div>
      </div>
      <div class="card mock-card" id="mock-host"></div>
      ${ui.callout("How to Answer", "<p>Pause for two seconds, state the structure of the answer, then climb from formula to intuition to risk to decision. For calculations, think aloud so the interviewer can follow the logic.</p>", "callout-indigo", "lightbulb")}`;

    const host = view.querySelector("#mock-host");

    function buildQueue() {
      queue = Guide.shuffle(Guide.mock.filter((item) => category === "all" || item.cat === category));
      view.querySelectorAll("#mock-cat button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.cat === category)));
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

    function next() {
      stopTimer();
      elapsed = 0;
      if (!queue.length) buildQueue();
      current = queue.shift();
      const cat = Guide.mockCategories.find((item) => item.id === current.cat);
      const ratings = store.get("mockRatings", {});
      const key = current.q;

      host.innerHTML = `
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:0.75rem;align-items:center">
          <span class="pill">${cat.label}</span>
          <div class="timer"><span class="timer-time">1:30</span><span class="timer-bar"><span></span></span></div>
        </div>
        <p class="mock-q" ${current.cat === "fr" ? 'lang="fr"' : ""}>${current.q}</p>
        <div class="btn-row">
          <button type="button" class="btn" id="mock-timer">${icon("play")} Start Timer</button>
          <div class="segmented" role="group" aria-label="Answer length" id="mock-duration">
            ${[60, 90, 120].map((seconds) => `<button type="button" data-seconds="${seconds}" aria-pressed="${seconds === duration}">${seconds}s</button>`).join("")}
          </div>
          <button type="button" class="btn btn-ghost" id="mock-reveal">${icon("lightbulb")} Reveal Key Points</button>
          <button type="button" class="btn btn-ghost" id="mock-next">Next Question ${icon("arrowRight")}</button>
        </div>
        <div id="mock-points"></div>
        <p class="small muted" style="margin:1rem 0 0">${queue.length} more questions in this round.${ratings[key] ? ` Last self-rating: ${ratings[key]}.` : ""}</p>`;

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
        host.querySelector("#mock-points").innerHTML = `
          <div class="keypoints">
            <h3>Key Points to Hit</h3>
            <ul ${current.cat === "fr" ? 'lang="fr"' : ""}>${current.points.map((point) => `<li>${point}</li>`).join("")}</ul>
            <div class="btn-row" style="align-items:center">
              <span class="small muted">Rate this answer:</span>
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

      host.querySelector("#mock-next").addEventListener("click", next);
    }

    view.querySelector("#mock-cat").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-cat]");
      if (!button) return;
      category = button.dataset.cat;
      buildQueue();
      next();
    });

    buildQueue();
    next();
    return stopTimer;
  };

  /* Story Builder View */
  Guide.views.story = function storyView(view) {
    const saved = progress.story();

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("pen")} Prepare</span>
        <h1>Story Builder</h1>
        <p class="lede">Draft the answers only Ha Linh can give. Every prompt includes a structure and a starter line; notes save automatically in this browser and can be downloaded at any time.</p>
      </header>
      <div class="toolbar">
        <button type="button" class="btn" id="story-download">${icon("download")} Download My Notes</button>
        <span class="save-state" id="story-state" aria-live="polite">Saved locally</span>
      </div>
      ${Guide.story
        .map(
          (prompt, i) => `
        <details class="accordion reveal" ${i === 0 ? "open" : ""}>
          <summary><span class="pill" style="margin-right:0.25rem">${prompt.target}</span>${prompt.title} ${icon("chevronDown", "chev")}</summary>
          <div class="accordion-body" ${prompt.lang === "fr" ? 'lang="fr"' : ""}>
            <ul>${prompt.guidance.map((line) => `<li>${line}</li>`).join("")}</ul>
            <div class="field">
              <label for="story-${prompt.id}">Draft</label>
              <textarea class="input" id="story-${prompt.id}" data-story="${prompt.id}" placeholder="${escapeHtml(prompt.starter)}">${escapeHtml(saved[prompt.id] || "")}</textarea>
            </div>
            <div class="btn-row" style="margin-top:0.6rem;align-items:center">
              <button type="button" class="btn btn-ghost btn-sm" data-starter="${prompt.id}">Insert Starter Line</button>
              <span class="small muted" data-count="${prompt.id}"></span>
            </div>
          </div>
        </details>`
        )
        .join("")}
      ${ui.callout("Confidentiality", "<p>Describe Resonance work by sector and role rather than client names or deal figures that are not public.</p>", "callout-amber", "alert")}`;

    const state = view.querySelector("#story-state");

    function updateCount(id) {
      const text = view.querySelector(`#story-${id}`).value.trim();
      const words = text ? text.split(/\s+/).length : 0;
      const seconds = Math.round((words / 140) * 60);
      view.querySelector(`[data-count="${id}"]`).textContent = words ? `${words} words · about ${seconds} seconds spoken` : "No draft yet";
    }

    const persist = Guide.debounce(() => {
      const data = {};
      view.querySelectorAll("[data-story]").forEach((area) => {
        data[area.dataset.story] = area.value;
      });
      store.set("story", data);
      state.textContent = "Saved locally";
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
        if (!area.value.trim()) area.value = prompt.starter + " ";
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
      const pattern = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      return safe.replace(pattern, "<mark>$1</mark>");
    }

    function render() {
      const query = input.value.trim();
      const lower = query.toLowerCase();
      const items = Guide.lexicon.filter((item) => !lower || `${item.fr} ${item.en} ${item.def}`.toLowerCase().includes(lower));
      view.querySelector("#lex-count").textContent = `${items.length} of ${Guide.lexicon.length} terms`;
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

    const emailEn = `Subject: Thank you – Investment Analyst Internship

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
        <p class="lede">Final checklist and conduct during the interview, followed by questions to ask and the follow-up email.</p>
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
        <ol class="steps">
          <li><strong>Open strong:</strong> greet both interviewers by name and keep the pitch under two minutes.</li>
          <li><strong>Structure first:</strong> announce how the answer will unfold before diving in.</li>
          <li><strong>Think aloud on numbers:</strong> state assumptions and round sensibly before sanity-checking the result.</li>
          <li><strong>Climb the ladder:</strong> formula → intuition → risk → decision.</li>
          <li><strong>Handle gaps honestly:</strong> say what is known, reason toward the rest and offer to follow up.</li>
          <li><strong>Connect to Neot:</strong> tie answers back to fleets and batteries or the as-a-service model.</li>
          <li><strong>Close with intent:</strong> summarise motivation and availability from March 2027 for six months.</li>
        </ol>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">03</span>Questions to Ask</h2>
        <p>Choose two or three, ideally adapted to what the interviewers mention.</p>
        ${Guide.askThem.map((item) => `<div class="card" style="margin-bottom:0.6rem"><p style="margin-bottom:0.3rem"><strong>“${item.q}”</strong></p><p class="small muted" style="margin:0">${item.why}</p></div>`).join("")}
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">04</span>Closing Statement</h2>
        <div class="card"><p style="margin:0">“Thank you for this conversation. Today's conversation confirmed that Neot is where my project finance foundation can grow into investment judgement. Availability for the full six months from March 2027 is guaranteed, and contributing to Neot e-motion's next transactions would be genuinely exciting.”</p></div>
      </section>

      <section class="section reveal">
        <h2 class="section-title"><span class="num">05</span>Thank-You Email</h2>
        <p>Send within 24 hours, adapted to the conversation.</p>
        <div class="toolbar"><div class="segmented" role="group" aria-label="Email language" id="email-lang"><button type="button" data-lang="en" aria-pressed="true">English</button><button type="button" data-lang="fr" aria-pressed="false">Français</button></div><button type="button" class="btn btn-ghost btn-sm" id="email-copy">${icon("copy")} Copy</button></div>
        <textarea class="input" id="email-text" rows="14" aria-label="Thank-you email template" style="min-height:320px;font-size:0.92rem"></textarea>
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
        Guide.toast("Email copied to clipboard");
      } catch (error) {
        textArea.select();
        Guide.toast("Press Ctrl+C to copy the selected text");
      }
    });
  };

  /* Not Found View */
  Guide.views.notFound = function notFound(view) {
    view.innerHTML = `
      <div class="card" style="text-align:center;padding:3rem 1.5rem">
        <h1>Page Not Found</h1>
        <p class="muted">That section does not exist.</p>
        <a class="btn" href="#/">Return to the Briefing</a>
      </div>`;
  };
})(window.Guide);

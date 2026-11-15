/* Second Interview Views */
window.Guide = window.Guide || {};

(function (Guide) {
  "use strict";

  const { icon, ui, escapeHtml, store, progress } = Guide;
  Guide.views = Guide.views || {};

  /* Answer Parsing and Tolerance */
  const UNIT_HINTS = { eur: "€ Millions", eur0: "Euros", pct: "Percentage", pct2: "Percentage", x: "Multiple", fac: "Factor" };

  function parseAnswer(text, fmt) {
    let raw = String(text).trim().replace(/\s/g, "").replace(/[€x×m]/gi, "").replace(/[−–]/g, "-");
    if (!raw) return NaN;
    const percent = raw.includes("%");
    raw = raw.replace(/%/g, "");
    const negative = /^\(.*\)$/.test(raw);
    raw = raw.replace(/[()]/g, "");
    if (raw.includes(",") && !raw.includes(".")) raw = /,\d{3}$/.test(raw) && fmt === "eur0" ? raw.replace(/,/g, "") : raw.replace(",", ".");
    else raw = raw.replace(/,/g, "");
    let value = Number(raw);
    if (!Number.isFinite(value)) return NaN;
    if (negative) value = -value;
    if ((fmt === "pct" || fmt === "pct2") && (percent || Math.abs(value) > 1)) value /= 100;
    return value;
  }

  function tolerance(expected, fmt) {
    switch (fmt) {
      case "pct":
      case "pct2":
        return 0.0006;
      case "x":
        return 0.006;
      case "fac":
        return Math.max(0.0006, Math.abs(expected) * 0.003);
      case "eur0":
        return Math.max(15, Math.abs(expected) * 0.004);
      default:
        return Math.max(0.0015, Math.abs(expected) * 0.003);
    }
  }

  function grade(input, expected, fmt) {
    const value = parseAnswer(input, fmt);
    if (!Number.isFinite(value)) return { status: "invalid" };
    const tol = tolerance(expected, fmt);
    if (Math.abs(value - expected) <= tol) return { status: "correct" };
    if (Math.abs(Math.abs(value) - Math.abs(expected)) <= tol) return { status: "sign" };
    return { status: "wrong" };
  }

  Guide.gradeAnswer = grade;

  /* Shared Section Heading */
  const heading = (num, title) => `<h2 class="section-title"><span class="num">${num}</span>${title}</h2>`;

  /* Plan Timeline With Saved Checkboxes */
  function planMarkup(plan, saved, today) {
    return `
      <div class="timeline">
        ${plan
          .map(
            (day, dayIndex) => `
          <div class="card reveal${day.date === today ? " is-today" : ""}">
            <div class="timeline-day"><strong>${day.day}</strong><span class="pill${day.date === today ? " pill-good" : ""}">${day.date === today ? "Today" : day.label}</span></div>
            <p class="small muted" style="margin-bottom:0.5rem">${day.theme}</p>
            <ul class="checklist">
              ${day.tasks
                .map((task, taskIndex) => {
                  const key = `${dayIndex}-${taskIndex}`;
                  return `<li><label class="check"><input type="checkbox" data-plan2="${key}" ${saved[key] ? "checked" : ""}><span>${task.text} <a href="${task.href}" aria-label="Open ${escapeHtml(task.text)}">${icon("arrowRight", "inline-icon")}</a></span></label></li>`;
                })
                .join("")}
            </ul>
          </div>`
          )
          .join("")}
      </div>`;
  }

  /* Second Interview Briefing */
  Guide.views.home2 = function home2(view) {
    const summary = progress.summary2();
    const planState = store.get("plan2", {});
    const today = Guide.time.todayInParis();
    const round = Guide.round2;
    let elapsed = 0;

    const agendaBar = round.agenda
      .map((part, index) => {
        const start = elapsed;
        elapsed += part.minutes;
        return `<div class="agenda-seg" data-part="${index}" style="flex:${part.minutes}"><span>${start} to ${elapsed} Min</span><strong>${part.short}</strong></div>`;
      })
      .join("");

    view.innerHTML = `
      <section class="hero">
        <svg class="hero-lines" viewBox="0 0 360 200" fill="none" aria-hidden="true">
          <path d="M0 170 C60 170 70 120 120 120 S190 150 230 90 S300 40 360 30" stroke="currentColor" stroke-width="2"/>
          <path d="M0 190 C70 185 90 150 140 145 S210 165 250 115 S310 75 360 70" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>
        </svg>
        <div class="hero-grid">
          <div>
            <span class="eyebrow">${icon("spark")} Neot Capital · Second Interview</span>
            <h1>On to Round Two, Ha Linh.</h1>
            <p class="lede">Friday's two-hour interview opens with a discussion with the investment team. Next comes a 45-minute modelling case on Excel, and a debrief of your model closes the session. Each part has its own preparation here, building on everything that carried you through the first round.</p>
            <div class="btn-row" style="margin-top:1.25rem">
              <a class="btn" href="#/case/builder">Start the Model Builder ${icon("arrowRight")}</a>
              <a class="btn btn-ghost" href="#/case">${icon("route")} Read the Case Playbook</a>
            </div>
          </div>
          <div class="countdown">
            <span class="countdown-label" id="countdown-label">Interview Countdown</span>
            <div class="countdown-units" id="countdown-units"></div>
            <p class="countdown-summary" id="countdown-summary"></p>
            <div class="countdown-edit">
              <label class="field-inline"><span>Date</span><input type="date" id="interview-date" aria-label="Second interview date in Paris"></label>
              <label class="field-inline"><span>Paris Time</span><input type="time" id="interview-time" aria-label="Second interview start time in Paris"></label>
            </div>
            <span class="small muted" id="countdown-note"></span>
          </div>
        </div>
      </section>

      <section class="section reveal">
        <div class="card readiness-card">
          ${Guide.ring(summary.score, "Ready")}
          <div class="readiness-body">
            <div class="readiness-head">
              <h2>Readiness</h2>
              <button type="button" class="btn btn-ghost btn-sm" data-open-reset>${icon("refresh")} Reset Progress</button>
            </div>
            <p class="muted small">Progress saves automatically in this browser as you build, practise and rate your answers.</p>
            <div class="grid grid-5">
              <div class="stat"><span class="stat-value">${summary.builderDone}/${summary.totals.builder}</span><span class="stat-label">Builder Steps</span></div>
              <div class="stat"><span class="stat-value">${summary.timedBest}/${summary.totals.timed}</span><span class="stat-label">Timed Case</span></div>
              <div class="stat"><span class="stat-value">${summary.drillBest}%</span><span class="stat-label">Error Drill</span></div>
              <div class="stat"><span class="stat-value">${summary.discussionStrong}/${summary.totals.discussion}</span><span class="stat-label">Discussion</span></div>
              <div class="stat"><span class="stat-value">${summary.debriefStrong}/${summary.totals.debrief}</span><span class="stat-label">Debrief</span></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="reveal">${heading("01", "The Two-Hour Agenda")}</div>
        <div class="agenda reveal" aria-hidden="true">${agendaBar}</div>
        <div class="grid grid-3 agenda-cards">
          ${round.agenda
            .map(
              (part, index) => `
            <div class="card reveal agenda-card" data-part="${index}">
              <span class="pill">${part.minutes} Minutes</span>
              <h3>${part.title}</h3>
              <p class="small muted">${part.who}</p>
              <p class="small">${part.summary}</p>
              <a class="btn btn-soft btn-sm" href="${part.href}">${part.cta} ${icon("arrowRight")}</a>
            </div>`
            )
            .join("")}
        </div>
        ${ui.callout("In Person or on Teams", `<p>Neot would ideally meet you at ${round.address}, with Teams as the alternative. Either way, the case runs on your own laptop, so arrive with Excel installed, a charger and ideally a mouse.</p>`, "callout-indigo", "info")}
      </section>

      <section class="section">
        <div class="reveal">${heading("02", "What Neot Is Assessing")}</div>
        <div class="grid grid-3">
          ${round.assess
            .map((item) => `<div class="card reveal"><span class="card-icon">${icon(item.icon)}</span><h3>${item.title}</h3><p class="small">${item.text}</p></div>`)
            .join("")}
        </div>
      </section>

      <section class="section">
        <div class="reveal">${heading("03", "Preparation Plan")}</div>
        <p class="reveal">Evenings after Resonance are short, so each day focuses on one part of the interview. Completing two full attempts at the timed case matters more than anything else, because speed in Excel only comes from repetition.</p>
        ${planMarkup(Guide.plan2, planState, today)}
      </section>

      <section class="section reveal">
        ${heading("04", "Carried Over From the First Round")}
        <p>Everything prepared for the first interview still applies, because the discussion will revisit project finance and Neot's business in more depth. Company knowledge and the study modules are shared between both sections, while flashcards and statement drills remain under First Interview.</p>
        <div class="btn-row">
          <a class="btn btn-soft btn-sm" href="#/neot">${icon("building")} Neot Profile</a>
          <a class="btn btn-soft btn-sm" href="#/study">${icon("book")} Study Path</a>
          <a class="btn btn-soft btn-sm" href="#/practice/formulas">${icon("sigma")} Formula Quiz</a>
          <a class="btn btn-ghost btn-sm" href="#/first">${icon("arrowLeft")} First Interview Section</a>
        </div>
      </section>`;

    view.querySelectorAll("[data-plan2]").forEach((box) => {
      box.addEventListener("change", () => {
        const state = store.get("plan2", {});
        state[box.dataset.plan2] = box.checked;
        store.set("plan2", state);
      });
    });

    Guide.animateRings(view);
    return Guide.startCountdown(view, {
      dateKey: "interview2ParisDate",
      timeKey: "interview2ParisTime",
      defaultDate: round.defaultDate,
      assumedTime: round.assumedTime
    });
  };

  /* Second Interview Day View */
  Guide.views.day2 = function day2(view) {
    const checks = progress.checklist2();
    const groups = [...new Set(Guide.checklist2.map((item) => item.group))];

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("calendar")} Second Interview</span>
        <h1>Interview Day</h1>
        <p class="lede">Everything for Friday itself lives here, from the laptop and Excel setup to conduct during each part of the interview and the follow-up email.</p>
      </header>

      <section class="section reveal">
        ${heading("01", "Readiness Checklist")}
        <div class="grid grid-2">
          ${groups
            .map(
              (group) => `
            <div class="card">
              <h4>${group}</h4>
              <ul class="checklist">
                ${Guide.checklist2
                  .filter((item) => item.group === group)
                  .map((item) => `<li><label class="check"><input type="checkbox" data-check2="${item.id}" ${checks[item.id] ? "checked" : ""}><span>${item.text}<small>${item.hint}</small></span></label></li>`)
                  .join("")}
              </ul>
            </div>`
            )
            .join("")}
        </div>
      </section>

      <section class="section reveal">
        ${heading("02", "The Day Itself")}
        <div class="prose">
          <p>Lasting two hours, the interview is long, so eat beforehand and bring water. Arriving ten minutes early at ${Guide.round2.address} leaves time to settle, and opening Excel before the case starts avoids losing minutes to updates or sign-in prompts. Teams interviews call for testing screen sharing in advance, since the debrief will likely involve showing your workbook.</p>
          <p>During the case, the interviewers will leave you alone. Read the whole brief before typing anything and keep a short list of assumptions as you go, because that list becomes the opening of the debrief. Whenever a question in the brief is ambiguous, choose a sensible interpretation and write it down rather than freezing.</p>
          <p>Composure counts for more than perfection in the debrief. Open with the answer, walk through the structure briefly and welcome challenges to your assumptions. Should the interviewers spot an error, acknowledge it and explain what the corrected number would do to the conclusion before moving on.</p>
        </div>
      </section>

      <section class="section reveal">
        ${heading("03", "Opening and Closing Lines")}
        <div class="grid grid-2 model-lines">
          <div class="card">
            <h4>Model Opening Line</h4>
            <p class="model-quote">“Thank you both for having me back. Since our first conversation, I have been looking forward to discussing Neot e-motion's transactions in more depth, and to the modelling case.”</p>
          </div>
          <div class="card">
            <h4>Model Closing Statement</h4>
            <p class="model-quote">“Thank you for the case and the discussion. Building the model gave me a real feel for the questions the team works on every day, and I am fully available for the six months from March 2027.”</p>
          </div>
        </div>
      </section>

      <section class="section reveal">
        ${heading("04", "Thank-You Email")}
        <p>Send within 24 hours, referring to one specific topic from the discussion or the debrief.</p>
        <div class="toolbar">
          <div class="segmented" role="group" aria-label="Email language" id="email-lang"><button type="button" data-lang="en" aria-pressed="true">English</button><button type="button" data-lang="fr" aria-pressed="false">Français</button></div>
          <button type="button" class="btn btn-ghost btn-sm" id="email-copy">${icon("copy")} Copy</button>
        </div>
        <textarea class="input email-text" id="email-text" rows="14" aria-label="Thank-you email template"></textarea>
      </section>`;

    view.querySelectorAll("[data-check2]").forEach((box) => {
      box.addEventListener("change", () => progress.setCheck2(box.dataset.check2, box.checked));
    });

    const textArea = view.querySelector("#email-text");
    textArea.value = Guide.thankYou2.en;

    view.querySelector("#email-lang").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-lang]");
      if (!button) return;
      textArea.value = Guide.thankYou2[button.dataset.lang];
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

  /* Case Playbook View */
  Guide.views.casePlaybook = function casePlaybook(view) {
    const architecture = ["Inputs", "Timeline and Flags", "Capex and Funding", "Operations", "Depreciation and Tax", "Debt Schedule", "Cash Flows and Ratios", "Returns and Checks"];
    const standards = [
      ["Inputs Live in One Place", "Every hard-coded number sits on the Inputs sheet in blue, so changing an assumption never requires hunting through formulas."],
      ["One Formula per Row", "Each row uses the same formula in every year, which makes copying fast and errors easy to spot."],
      ["Flags Instead of Edits", "Lease and debt flags switch rows on and off by year, so no column needs a special formula."],
      ["Consistent Signs", "Inflows are positive and outflows negative, which turns every subtotal into a simple sum."],
      ["Units on Every Row", "Labelling each row in € millions or as a multiple prevents the most embarrassing errors in a debrief."],
      ["Checks That Prove the Model", "Debt repaid to zero and sources equal to uses are quick to build and reassure the interviewers immediately."]
    ];

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("route")} Modelling Case</span>
        <h1>Case Playbook</h1>
        <p class="lede">Forty-five minutes alone with Excel rewards a plan more than raw speed. Below, you will find what to expect and how to spend each minute, along with the standards that make a model easy to defend in the debrief.</p>
      </header>

      <section class="section reveal">
        ${heading("01", "What to Expect")}
        <div class="prose">
          <p>Neot does not publish the content of its case, but the format points clearly to an asset-level model. Neot e-motion leases electric vehicles and chargers to operators, so the most likely brief describes a fleet with its costs and lease terms, adds a financing structure and asks for returns, coverage ratios or the rent needed to hit a target. Both practice cases on this site follow that pattern, and their numbers have been verified in Excel.</p>
          <p>Expect the brief in French or in English, possibly with a template already prepared. Whatever the format, the interviewers will judge three things: whether the core outputs are right, whether the structure is clean enough to follow and whether you can explain what drives the result.</p>
        </div>
        ${ui.callout("Bring Your Own Laptop", "<p>The email asks you to bring your computer, so the case runs in your own copy of Excel. Check this week whether it is set to French or English, because function names and separators differ between the two.</p>", "callout-amber", "alert")}
      </section>

      <section class="section reveal">
        ${heading("02", "The 45-Minute Plan")}
        <div class="case-plan" aria-hidden="true">
          ${Guide.casePlan.map((phase) => `<div class="case-plan-seg" style="flex:${phase.to - phase.from}"><span>${phase.from}′</span></div>`).join("")}
        </div>
        <div class="phase-list">
          ${Guide.casePlan
            .map(
              (phase) => `
            <div class="phase">
              <span class="phase-time">${phase.from} to ${phase.to} Min</span>
              <div><h4>${phase.title}</h4><p class="small">${phase.text}</p></div>
            </div>`
            )
            .join("")}
        </div>
      </section>

      <section class="section reveal">
        ${heading("03", "Model Architecture")}
        <p>Building in the order cash flows through the business means every formula points backwards to rows already built. Circular references never appear, and if time runs out, everything above the cursor already works.</p>
        <div class="chain">
          ${architecture.map((step, index) => `<span class="chain-step"><strong>${step}</strong></span>${index < architecture.length - 1 ? '<span class="chain-arrow">→</span>' : ""}`).join("")}
        </div>
      </section>

      <section class="section reveal">
        ${heading("04", "Modelling Standards")}
        <div class="table-wrap">
          <table>
            <thead><tr><th>Standard</th><th>Why It Matters</th></tr></thead>
            <tbody>${standards.map(([title, text]) => `<tr><td><strong>${title}</strong></td><td>${text}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </section>

      <section class="section reveal">
        ${heading("05", "When Time Runs Short")}
        <div class="prose">
          <p>Protect the core output above everything else. Reaching equity cash flows and an IRR with one simplification beats a beautifully formatted model that stops at the debt schedule. When a piece is missing, hard-code a clearly labelled placeholder, note it in an assumptions box and keep moving.</p>
          <p>Once five minutes remain, stop building. Check that the debt reaches zero, scan each row for a broken formula and write the answer in a summary box at the top of the sheet. Saying calmly what you would add with more time comes across far better than a rushed formula that breaks the outputs.</p>
        </div>
      </section>

      <section class="section reveal">
        ${heading("06", "Practice Path")}
        <div class="grid grid-3">
          <a class="card card-link" href="#/case/excel"><span class="card-icon">${icon("wrench")}</span><h3>Excel Toolkit</h3><p class="small">Functions in English and French, essential shortcuts and the Spot the Error drill.</p></a>
          <a class="card card-link" href="#/case/builder"><span class="card-icon">${icon("sheet")}</span><h3>Model Builder</h3><p class="small">Build a bus lease model step by step in a live spreadsheet, with every answer checked.</p></a>
          <a class="card card-link" href="#/case/timed"><span class="card-icon">${icon("timer")}</span><h3>Timed Case</h3><p class="small">Price a truck lease in your own Excel against a 45-minute clock, then check the results.</p></a>
        </div>
      </section>`;
  };

  /* Excel Toolkit View */
  Guide.views.excelToolkit = function excelToolkit(view) {
    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("wrench")} Modelling Case</span>
        <h1>Excel Toolkit</h1>
        <p class="lede">Only a handful of functions and shortcuts matter in a 45-minute case. Knowing them in both languages removes any surprise on Friday.</p>
      </header>

      <section class="section reveal">
        ${heading("01", "French or English Excel")}
        <p>French Excel translates function names and uses a semicolon between arguments, because the comma becomes the decimal separator. Opening Excel on your laptop and typing one formula is the fastest way to confirm which version you will be using.</p>
        <div class="grid grid-2">
          <div class="card"><h4>English Excel</h4><p class="mono formula-sample">=PMT(5%, 6, -4.55)</p></div>
          <div class="card"><h4>French Excel</h4><p class="mono formula-sample" lang="fr">=VPM(5%; 6; -4,55)</p></div>
        </div>
      </section>

      <section class="section reveal">
        ${heading("02", "Essential Functions")}
        <div class="table-wrap">
          <table class="fn-table">
            <thead><tr><th>Purpose</th><th>English</th><th>French</th><th>Example and Watch-Out</th></tr></thead>
            <tbody>
              ${Guide.excelFunctions
                .map(
                  (fn) => `<tr><td><strong>${fn.purpose}</strong></td><td class="mono">${fn.en}</td><td class="mono" lang="fr">${fn.fr}</td><td><code>${escapeHtml(fn.example)}</code><span class="small muted fn-note">${fn.note}</span></td></tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>

      <section class="section reveal">
        ${heading("03", "Shortcuts")}
        <p>Shortcuts below apply to Excel on Windows. Highlighted rows differ in French Excel, which catches out many bilingual candidates.</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Action</th><th>English Excel</th><th>French Excel</th></tr></thead>
            <tbody>
              ${Guide.excelShortcuts
                .map((item) => `<tr${item.differs ? ' class="is-differs"' : ""}><td>${item.action}</td><td>${item.en.split(" + ").map((key) => `<kbd>${key}</kbd>`).join(" + ")}</td><td>${item.fr.split(" + ").map((key) => `<kbd>${key}</kbd>`).join(" + ")}</td></tr>`)
                .join("")}
            </tbody>
          </table>
        </div>
      </section>

      <section class="section reveal">
        ${heading("04", "Goal Seek and Data Tables")}
        <div class="grid grid-2">
          <div class="card">
            <h3>Goal Seek</h3>
            <p class="small">Solves one input so that one output hits a target, such as the rent that delivers a 10% equity IRR.</p>
            <ol class="small">
              <li>Open <strong>Data › What-If Analysis › Goal Seek</strong>, or <strong lang="fr">Données › Analyse de scénarios › Valeur cible</strong> in French.</li>
              <li>Set the equity IRR cell to 0.1 by changing the rent input.</li>
              <li>Check the result, because Goal Seek stops as soon as it is close enough.</li>
            </ol>
            <p class="small muted">Tighten precision under <strong>File › Options › Formulas › Maximum Change</strong>, or <strong lang="fr">Écart maximal</strong> in French, by entering 0.000001.</p>
          </div>
          <div class="card">
            <h3>Data Table</h3>
            <p class="small">Recalculates an output across a grid of inputs, which makes sensitivities quick to build and easy to present.</p>
            <ol class="small">
              <li>Place the output formula in the top-left corner, with one input range across and the other down.</li>
              <li>Select the grid and open <strong>Data › What-If Analysis › Data Table</strong>, or <strong lang="fr">Table de données</strong> in French.</li>
              <li>Point the row and column input cells to the matching inputs.</li>
            </ol>
            <p class="small muted">Input cells must sit on the same sheet as the table, so build sensitivity tables on the Inputs sheet.</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="reveal">${heading("05", "Spot the Error Drill")}</div>
        <p class="reveal">Each question shows a cell from a lease model together with its formula. Finding the mistake quickly is the same skill the debrief tests when the interviewers ask how you know your model is right.</p>
        <div id="drill-host"></div>
      </section>`;

    mountErrorDrill(view.querySelector("#drill-host"));
  };

  /* Snapshot of a Few Spreadsheet Cells */
  function snapshotMarkup(item) {
    const sheet = item.sheet;
    if (!sheet) return "";
    const head = `<tr><th class="xl-corner"></th><th class="xl-col xl-col-a">A</th>${sheet.cols.map((col) => `<th class="xl-col">${col}</th>`).join("")}</tr>`;
    const rows = sheet.rows
      .map(([num, label, ...values]) => {
        const cells = values
          .map((value, i) => {
            const address = `${sheet.cols[i]}${num}`;
            const active = address === sheet.active;
            const negative = /^\(/.test(value);
            return `<td class="xl-cell${value ? " is-filled" : ""}${active ? " is-selected is-flagged" : ""}${negative ? " is-negative" : ""}">${escapeHtml(value)}</td>`;
          })
          .join("");
        return `<tr><th class="xl-rownum">${num}</th><td class="xl-label">${escapeHtml(label)}</td>${cells}</tr>`;
      })
      .join("");
    return `
      <div class="xl xl-snapshot">
        <div class="xl-bar"><span class="xl-name">${sheet.active}</span><span class="xl-fx" aria-hidden="true">fx</span><code class="xl-formula">${escapeHtml(item.formula)}</code></div>
        <div class="xl-scroll"><table class="xl-grid"><thead>${head}</thead><tbody>${rows}</tbody></table></div>
      </div>`;
  }

  /* Spot the Error Drill Logic */
  function mountErrorDrill(host) {
    let order = [];
    let index = 0;
    let score = 0;
    const keys = ["A", "B", "C", "D"];

    function start() {
      order = Guide.shuffle(Guide.excelDrill).map((item) => ({ item, options: Guide.shuffle(item.options.map((text, i) => ({ text, correct: i === 0 }))) }));
      index = 0;
      score = 0;
      show();
    }

    function show() {
      const { item, options } = order[index];
      host.innerHTML = `
        <div class="card quiz-card drill-card">
          <div class="mock-top">
            <span class="pill">${item.title}</span>
            <span class="small muted">Question ${index + 1} of ${order.length} · Score ${score}</span>
          </div>
          ${snapshotMarkup(item)}
          <p class="quiz-q">${item.q}</p>
          <ul class="options">
            ${options.map((option, i) => `<li><button type="button" class="option" data-i="${i}"><span class="option-key">${keys[i]}</span><span${item.id === "pmtchoice" || item.id === "separator" ? ' class="mono"' : ""}>${escapeHtml(option.text)}</span></button></li>`).join("")}
          </ul>
          <div data-role="explain"></div>
        </div>`;

      host.querySelector(".options").addEventListener("click", (event) => {
        const button = event.target.closest(".option");
        if (!button || button.disabled) return;
        const chosen = options[Number(button.dataset.i)];
        if (chosen.correct) score += 1;
        host.querySelectorAll(".option").forEach((node) => {
          node.disabled = true;
          const option = options[Number(node.dataset.i)];
          if (option.correct) node.classList.add("is-correct");
          else if (node === button) node.classList.add("is-wrong");
        });
        const last = index === order.length - 1;
        host.querySelector('[data-role="explain"]').innerHTML = `
          <div class="explain">
            ${ui.callout(chosen.correct ? "Correct" : "Not Quite", `<p>${item.explain}</p>`, chosen.correct ? "" : "callout-rose", chosen.correct ? "check" : "flag")}
            <button type="button" class="btn" data-role="next">${last ? "See Results" : "Next Question"} ${icon("arrowRight")}</button>
          </div>`;
        host.querySelector('[data-role="next"]').addEventListener("click", () => {
          if (last) finish();
          else {
            index += 1;
            show();
          }
        });
      });
    }

    function finish() {
      const percent = Math.round((score / order.length) * 100);
      const best = Math.max(percent, store.get("errorDrillBest", 0));
      store.set("errorDrillBest", best);
      Guide.emit("progress");
      host.innerHTML = `
        <div class="card quiz-card drill-result">
          <span class="score-big">${percent}%</span>
          <p>${score} of ${order.length} correct. Best score so far: ${best}%.</p>
          <p class="small muted">${percent >= 80 ? "Strong result. These checks will also answer the debrief question about how you know your model is right." : "Review the explanations once more, then try again. Most of these errors appear in real case attempts."}</p>
          <button type="button" class="btn" data-role="restart">${icon("refresh")} Try Again</button>
        </div>`;
      host.querySelector('[data-role="restart"]').addEventListener("click", start);
    }

    host.innerHTML = `
      <div class="card drill-intro reveal">
        <p>Thirteen questions mix formula errors with function choices. Best score so far: <strong>${store.get("errorDrillBest", 0)}%</strong>.</p>
        <button type="button" class="btn" data-role="begin">${icon("play")} Start the Drill</button>
      </div>`;
    host.querySelector('[data-role="begin"]').addEventListener("click", start);
  }

  /* Model Builder View */
  Guide.views.builder = function builder(view) {
    view.classList.add("is-wide");
    const steps = Guide.builderSteps;
    const data = Guide.sheets.bus;
    let state = progress.builder();
    if (!state.done) state.done = {};
    let current = Math.min(state.current || 0, steps.length - 1);

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("sheet")} Modelling Case</span>
        <h1>Model Builder</h1>
        <p class="lede">Build a complete lease model for 40 electric buses, one cell at a time. Each step asks for a value in a highlighted cell, checks your answer and then fills in the whole row with the Excel formula behind it.</p>
        <div class="btn-row">
          <a class="btn btn-ghost btn-sm" href="${encodeURI(Guide.caseFiles.busTemplate.href)}" download>${icon("download")} Blank Template</a>
          <a class="btn btn-ghost btn-sm" href="${encodeURI(Guide.caseFiles.busSolution.href)}" download>${icon("download")} Solution Workbook</a>
        </div>
      </header>

      <div class="reveal">${heading("01", "Build the Model")}</div>
      <div class="builder-steps" id="bd-steps" role="group" aria-label="Builder steps"></div>
      <div id="bd-step"></div>
      <div id="bd-sheet" class="builder-sheet"></div>
      <p class="small muted">Inputs live on the Inputs tab, exactly as in the workbook. Select any built cell to read its formula.</p>

      <section class="section" id="bd-explorer-section">
        ${heading("02", "What-If Explorer")}
        <p>Use the finished model to rehearse debrief questions. Each slider recalculates the full ten-year model with the same formulas as the workbook, and the battery slider adds a replacement cost in Year 6.</p>
        <div id="bd-explorer"></div>
      </section>`;

    const baseVisible = new Set(data.rows.filter((row) => row.id === "year").flatMap((row) => Array.from({ length: data.years + 1 }, (_, i) => `${String.fromCharCode(67 + i)}${row.row}`)));
    const sheet = Guide.createSheet(view.querySelector("#bd-sheet"), { caseId: "bus", visible: baseVisible });

    function revealed(step) {
      return (step.reveal || []).flatMap((entry) => sheet.cellAddresses(entry)).concat(step.target ? [step.target] : []);
    }

    function visibleSet() {
      const set = new Set(baseVisible);
      steps.forEach((step) => {
        if (state.done[step.id]) revealed(step).forEach((address) => set.add(address));
      });
      return set;
    }

    function save() {
      state.current = current;
      progress.saveBuilder(state);
    }

    function renderStepList() {
      view.querySelector("#bd-steps").innerHTML = steps
        .map((step, i) => `<button type="button" class="step-dot${state.done[step.id] ? " is-done" : ""}${i === current ? " is-current" : ""}" data-step="${i}" aria-label="Step ${i + 1}: ${escapeHtml(step.title)}" title="${escapeHtml(step.title)}">${state.done[step.id] ? icon("check") : i + 1}</button>`)
        .join("");
    }

    function cellFormat(address) {
      const row = Number(address.replace(/^[A-Z]+/, ""));
      const spec = data.rows.find((item) => item.row === row) || data.outputs.find((item) => item.row === row);
      return spec ? spec.fmt : "eur";
    }

    function formulaNote(step) {
      const cell = data.cells[step.target];
      return cell && cell[0] ? `<p class="small builder-formula">Excel Formula in ${step.target}: <code>${escapeHtml(cell[0])}</code></p>` : "";
    }

    function markDone(step, flash) {
      const wasDone = state.done[step.id];
      state.done[step.id] = true;
      save();
      renderStepList();
      if (step.target) {
        sheet.update(visibleSet(), null);
        if (flash && !wasDone) sheet.flash(revealed(step));
        sheet.focusCell(step.target);
      }
      const nextButton = view.querySelector('[data-role="next"]');
      if (nextButton) nextButton.classList.remove("btn-ghost");

      /* Progress Header Refresh */
      const doneCount = Object.values(state.done).filter(Boolean).length;
      const card = view.querySelector(".builder-card");
      card.querySelector(".builder-top .small").textContent = `${doneCount} of ${steps.length} Completed`;
      card.querySelector(".meter span").style.width = `${(doneCount / steps.length) * 100}%`;
      const pill = card.querySelector(".builder-top .pill");
      pill.classList.add("pill-good");
      pill.innerHTML = `${icon("check", "inline-icon")} Step ${current + 1} of ${steps.length}`;
    }

    function renderStep() {
      const step = steps[current];
      const done = Boolean(state.done[step.id]);
      const doneCount = Object.values(state.done).filter(Boolean).length;
      const host = view.querySelector("#bd-step");
      const last = current === steps.length - 1;

      let body;
      if (step.type === "choice") {
        const options = Guide.shuffle(step.options.map((text, i) => ({ text, correct: i === 0 })));
        body = `
          <p class="builder-ask">${step.ask}</p>
          <ul class="options">${options.map((option, i) => `<li><button type="button" class="option" data-i="${i}" data-correct="${option.correct}"><span class="option-key">${"ABCD"[i]}</span><span>${option.text}</span></button></li>`).join("")}</ul>`;
      } else {
        const fmt = cellFormat(step.target);
        body = `
          <p class="builder-ask">${step.ask} <span class="cell-chip">${icon("sheet", "inline-icon")} Cell ${step.target}</span></p>
          <form class="builder-form" novalidate>
            <label class="visually-hidden" for="bd-answer">Answer for cell ${step.target}</label>
            <input class="input mono" id="bd-answer" inputmode="decimal" autocomplete="off" placeholder="${UNIT_HINTS[fmt] || "Value"}">
            <button type="submit" class="btn">${icon("check")} Check</button>
          </form>
          <div class="btn-row builder-help">
            <button type="button" class="btn btn-ghost btn-sm" data-role="hint">${icon("lightbulb")} Show Hint</button>
            <button type="button" class="btn btn-ghost btn-sm" data-role="reveal">${icon("info")} Reveal Answer</button>
          </div>`;
      }

      host.innerHTML = `
        <div class="card builder-card">
          <div class="builder-top">
            <span class="pill${done ? " pill-good" : ""}">${done ? `${icon("check", "inline-icon")} ` : ""}Step ${current + 1} of ${steps.length}</span>
            <span class="small muted">${doneCount} of ${steps.length} Completed</span>
          </div>
          <div class="meter"><span style="width:${(doneCount / steps.length) * 100}%"></span></div>
          <h2 class="builder-title">${step.title}</h2>
          ${body}
          <div data-role="feedback" aria-live="polite"></div>
          <div class="builder-nav">
            <button type="button" class="btn btn-ghost btn-sm" data-role="prev" ${current === 0 ? "disabled" : ""}>${icon("arrowLeft")} Previous</button>
            <button type="button" class="btn btn-sm${done ? "" : " btn-ghost"}" data-role="next">${last ? "Finish" : "Next Step"} ${icon("arrowRight")}</button>
          </div>
        </div>`;

      const feedback = host.querySelector('[data-role="feedback"]');

      if (step.type === "choice") {
        host.querySelector(".options").addEventListener("click", (event) => {
          const button = event.target.closest(".option");
          if (!button || button.disabled) return;
          const correct = button.dataset.correct === "true";
          host.querySelectorAll(".option").forEach((node) => {
            node.disabled = true;
            if (node.dataset.correct === "true") node.classList.add("is-correct");
            else if (node === button) node.classList.add("is-wrong");
          });
          feedback.innerHTML = ui.callout(correct ? "Correct" : "Not Quite", `<p>${step.explain}</p>`, correct ? "" : "callout-rose", correct ? "check" : "flag");
          markDone(step, false);
        });
      } else {
        sheet.update(visibleSet(), done ? null : step.target);
        sheet.focusCell(step.target);
        const expected = data.cells[step.target][1];
        const fmt = cellFormat(step.target);

        if (done) {
          feedback.innerHTML = ui.callout("Completed", `<p>Answer: <strong>${Guide.excelFormat(expected, fmt)}</strong>. ${step.explain}</p>${formulaNote(step)}`, "", "check");
        }

        host.querySelector(".builder-form").addEventListener("submit", (event) => {
          event.preventDefault();
          const input = host.querySelector("#bd-answer");
          const result = grade(input.value, expected, fmt);
          if (result.status === "invalid") {
            feedback.innerHTML = ui.callout("Enter a Number", "<p>Type the value only, for example 3.225 or 10.8%.</p>", "callout-amber", "alert");
            return;
          }
          if (result.status === "correct" || result.status === "sign") {
            const signNote = result.status === "sign" ? " Magnitude matches, although this model shows outflows as negative numbers." : "";
            feedback.innerHTML = ui.callout("Correct", `<p><strong>${Guide.excelFormat(expected, fmt)}</strong>.${signNote} ${step.explain}</p>${formulaNote(step)}`, "", "check");
            input.classList.add("is-right");
            markDone(step, true);
          } else {
            input.classList.add("is-shake");
            window.setTimeout(() => input.classList.remove("is-shake"), 400);
            feedback.innerHTML = ui.callout("Not Quite", "<p>Check the inputs feeding this cell, or open the hint.</p>", "callout-rose", "flag");
          }
        });

        host.querySelector('[data-role="hint"]').addEventListener("click", () => {
          feedback.innerHTML = ui.callout("Hint", `<p>${step.hint}</p>`, "callout-indigo", "lightbulb");
        });

        host.querySelector('[data-role="reveal"]').addEventListener("click", () => {
          feedback.innerHTML = ui.callout("Answer", `<p><strong>${Guide.excelFormat(expected, fmt)}</strong>. ${step.explain}</p>${formulaNote(step)}`, "callout-indigo", "info");
          markDone(step, true);
        });
      }

      host.querySelector('[data-role="prev"]').addEventListener("click", () => go(current - 1));
      host.querySelector('[data-role="next"]').addEventListener("click", () => {
        if (last) {
          view.querySelector("#bd-explorer-section").scrollIntoView({ behavior: Guide.scrollBehavior(), block: "start" });
          return;
        }
        go(current + 1);
      });
    }

    function go(index) {
      if (index < 0 || index >= steps.length) return;
      current = index;
      save();
      renderStepList();
      renderStep();
    }

    view.querySelector("#bd-steps").addEventListener("click", (event) => {
      const button = event.target.closest("[data-step]");
      if (button) go(Number(button.dataset.step));
    });

    renderStepList();
    renderStep();
    mountExplorer(view.querySelector("#bd-explorer"));
  };

  /* What-If Explorer on the Bus Lease Case */
  function mountExplorer(host) {
    const base = Guide.runBusCase(Guide.busBase);
    const params = Object.assign({}, Guide.busBase);
    const controls = [
      { key: "rent", label: "Year-1 Rent", min: 2.6, max: 3.6, step: 0.05, show: (v) => `€${v.toFixed(2)}m` },
      { key: "gearing", label: "Gearing", min: 0.5, max: 0.85, step: 0.01, show: (v) => `${Math.round(v * 100)}%` },
      { key: "rate", label: "Interest Rate", min: 0.03, max: 0.07, step: 0.0025, show: (v) => `${(v * 100).toFixed(2)}%` },
      { key: "tenor", label: "Debt Tenor", min: 6, max: 10, step: 1, show: (v) => `${v} Years` },
      { key: "rvPct", label: "Residual Value", min: 0, max: 0.25, step: 0.01, show: (v) => `${Math.round(v * 100)}% of Capex` },
      { key: "battery", label: "Battery Cost in Year 6", min: 0, max: 3, step: 0.25, show: (v) => (v ? `€${v.toFixed(2)}m` : "None") }
    ];

    host.innerHTML = `
      <div class="lab">
        <div class="lab-controls">
          <fieldset>
            <legend>Assumptions</legend>
            ${controls.map((c) => ui.range(`wx-${c.key}`, c.label, c.min, c.max, c.step, params[c.key], c.show(params[c.key]))).join("")}
          </fieldset>
          <button type="button" class="btn btn-ghost btn-sm" data-role="reset">${icon("refresh")} Reset to Base Case</button>
        </div>
        <div class="lab-output">
          <div class="kpis" data-role="kpis"></div>
          <div class="card dscr-card">
            <div class="chart-head"><h4>DSCR by Year</h4><span class="small muted">Dashed Line at 1.20x</span></div>
            <div data-role="bars" class="dscr-bars"></div>
          </div>
          <p class="small muted" data-role="insight"></p>
        </div>
      </div>`;

    const kpis = host.querySelector('[data-role="kpis"]');
    const bars = host.querySelector('[data-role="bars"]');
    const insight = host.querySelector('[data-role="insight"]');

    function delta(value, reference, digits, unit, scale = 1) {
      const diff = (value - reference) * scale;
      if (!Number.isFinite(diff) || Math.abs(diff) < Math.pow(10, -digits) / 2) return `<span class="kpi-delta flat">Base Case</span>`;
      return `<span class="kpi-delta ${diff > 0 ? "up" : "down"}">${Guide.fmt.signed(diff, digits, unit)}</span>`;
    }

    function update() {
      const result = Guide.runBusCase(params);
      const pct = (v) => (Number.isFinite(v) ? `${(v * 100).toFixed(1)}%` : "n/a");
      kpis.innerHTML = `
        <div class="kpi"><span class="kpi-label">Equity IRR</span><span class="kpi-value">${pct(result.equityIrr)}</span>${delta(result.equityIrr, base.equityIrr, 1, " pts", 100)}</div>
        <div class="kpi"><span class="kpi-label">Project IRR</span><span class="kpi-value">${pct(result.projectIrr)}</span>${delta(result.projectIrr, base.projectIrr, 1, " pts", 100)}</div>
        <div class="kpi"><span class="kpi-label">Minimum DSCR</span><span class="kpi-value">${Guide.fmt.mult(result.minDscr)}</span>${delta(result.minDscr, base.minDscr, 2, "x")}</div>
        <div class="kpi"><span class="kpi-label">Equity Multiple</span><span class="kpi-value">${Guide.fmt.mult(result.moic)}</span>${delta(result.moic, base.moic, 2, "x")}</div>`;

      const ratios = result.years.filter((year) => year.dscr !== null);
      const top = Math.max(2, ...ratios.map((year) => year.dscr * 1.15));
      const minimum = Math.min(...ratios.map((year) => year.dscr));
      bars.style.setProperty("--line-ratio", String(1.2 / top));
      bars.innerHTML = result.years
        .map((year) => {
          if (year.dscr === null) return `<div class="dscr-bar is-empty"><span class="dscr-fill" style="height:0"></span><span class="dscr-year">Y${year.t}</span></div>`;
          const height = Math.max(2, (Math.max(0, year.dscr) / top) * 100);
          const status = year.dscr < 1 ? "critical" : year.dscr < 1.2 ? "warning" : "good";
          return `<div class="dscr-bar" data-status="${status}" title="Year ${year.t}: ${year.dscr.toFixed(2)}x"><span class="dscr-value">${year.dscr === minimum ? `${year.dscr.toFixed(2)}x` : ""}</span><span class="dscr-fill" style="height:${height}%"></span><span class="dscr-year">Y${year.t}</span></div>`;
        })
        .join("");

      const minYear = ratios.find((year) => year.dscr === minimum);
      insight.textContent = minYear
        ? `Minimum coverage falls in Year ${minYear.t} at ${minimum.toFixed(2)}x${minimum < 1 ? ", which means cash flow cannot cover debt service that year" : minimum < 1.2 ? ", below a typical 1.20x lock-up level" : ""}.`
        : "No debt service remains in this scenario.";
    }

    controls.forEach((c) => {
      const input = host.querySelector(`#wx-${c.key}`);
      const output = host.querySelector(`#wx-${c.key}-out`);
      ui.syncRangeFill(input);
      input.addEventListener("input", () => {
        params[c.key] = Number(input.value);
        output.textContent = c.show(params[c.key]);
        ui.syncRangeFill(input);
        update();
      });
    });

    host.querySelector('[data-role="reset"]').addEventListener("click", () => {
      Object.assign(params, Guide.busBase);
      controls.forEach((c) => {
        const input = host.querySelector(`#wx-${c.key}`);
        input.value = params[c.key];
        host.querySelector(`#wx-${c.key}-out`).textContent = c.show(params[c.key]);
        ui.syncRangeFill(input);
      });
      update();
    });

    update();
  }

  /* Timed Case View */
  Guide.views.timedCase = function timedCase(view) {
    const tc = Guide.timedCase;
    const files = Guide.caseFiles;
    const truck = Guide.sheets.truck;
    let lang = "en";
    let ticker = null;

    const inputRows = truck.inputs
      .filter((item) => item.key)
      .map((item) => `<tr><td>${item.label}</td><td class="num">${item.key === "rent" ? "To Solve" : Guide.excelFormat(item.value, item.fmt)}</td><td class="small muted">${item.unit}</td></tr>`)
      .join("");

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("timer")} Modelling Case</span>
        <h1>Timed Case</h1>
        <p class="lede">Rehearse Friday's 45 minutes in full. Download the template, start the clock and build the model in your own Excel, then check your results and compare your workbook with the solution.</p>
      </header>

      <section class="section reveal">
        ${heading("01", "The Brief")}
        <div class="toolbar"><div class="segmented" role="group" aria-label="Brief language" id="tc-lang"><button type="button" data-lang="en" aria-pressed="true">English</button><button type="button" data-lang="fr" aria-pressed="false">Français</button></div></div>
        <div class="card brief-card" id="tc-brief"></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Input</th><th class="num">Value</th><th>Unit</th></tr></thead>
            <tbody>${inputRows}</tbody>
          </table>
        </div>
      </section>

      <section class="section reveal">
        ${heading("02", "Practice Files")}
        <div class="grid grid-2">
          <a class="card card-link file-card" href="${encodeURI(files.truckTemplate.href)}" download><span class="card-icon">${icon("download")}</span><h3>Template Workbook</h3><p class="small">Inputs filled in, with the Model sheet's labels and empty cells to complete.</p></a>
          <a class="card card-link file-card" href="${encodeURI(files.truckSolution.href)}" download><span class="card-icon">${icon("sheet")}</span><h3>Solution Workbook</h3><p class="small">Every formula, the solved rent and a live data table. Open it only after your attempt.</p></a>
        </div>
      </section>

      <section class="section reveal">
        ${heading("03", "Clock")}
        <div class="card clock-card">
          <div class="clock-face"><span class="clock-time" id="tc-time">45:00</span><span class="small muted" id="tc-phase">Ready When You Are</span></div>
          <div class="meter clock-meter"><span id="tc-bar" style="width:0%"></span></div>
          <div class="btn-row">
            <button type="button" class="btn" id="tc-toggle">${icon("play")} Start</button>
            <button type="button" class="btn btn-ghost" id="tc-reset">${icon("refresh")} Reset</button>
          </div>
          <p class="small muted">Switching pages leaves the clock running, so the brief and the playbook stay one click away.</p>
        </div>
      </section>

      <section class="section reveal">
        ${heading("04", "Check Your Results")}
        <p>Enter the numbers from your workbook. Small rounding differences are accepted, including the slight imprecision of Goal Seek.</p>
        <form class="card check-form" id="tc-form" novalidate>
          ${tc.checks
            .map(
              (check) => `
            <div class="check-row" data-check="${check.id}">
              <label for="tc-${check.id}">${check.label}</label>
              <input class="input mono" id="tc-${check.id}" inputmode="decimal" autocomplete="off" placeholder="${UNIT_HINTS[check.unit]}">
              <span class="check-mark" aria-live="polite"></span>
            </div>`
            )
            .join("")}
          <div class="btn-row">
            <button type="submit" class="btn">${icon("check")} Check Answers</button>
            <button type="button" class="btn btn-ghost" id="tc-show">${icon("info")} Show Solution Values</button>
          </div>
          <p class="small" id="tc-score" aria-live="polite"></p>
        </form>
      </section>

      <section class="section reveal">
        ${heading("05", "Solution Walkthrough")}
        <details class="accordion">
          <summary>Solved Model Sheet ${icon("chevronDown", "chev")}</summary>
          <div class="accordion-body"><div id="tc-sheet"></div></div>
        </details>
        <details class="accordion">
          <summary>Equity IRR Data Table ${icon("chevronDown", "chev")}</summary>
          <div class="accordion-body">
            <div class="table-wrap">
              <table class="center-table">
                <thead><tr><th>Rent per Year</th>${tc.table.residuals.map((rv) => `<th class="num">Residual ${Math.round(rv * 100)}%</th>`).join("")}</tr></thead>
                <tbody>${tc.table.rents.map((rent, i) => `<tr><td class="num">€${rent.toFixed(2)}m</td>${tc.table.irr[i].map((value) => `<td class="num${value >= 0.1 ? " is-pass" : ""}">${(value * 100).toFixed(1)}%</td>`).join("")}</tr>`).join("")}</tbody>
              </table>
            </div>
            <p class="small muted">Highlighted cells meet the 10% target. Moving the residual value from 0% to 15% adds about as much return as €0.10m of extra annual rent.</p>
          </div>
        </details>
        <details class="accordion">
          <summary>Model Recommendation ${icon("chevronDown", "chev")}</summary>
          <div class="accordion-body"><div class="model-answer"><p>${tc.recommendation}</p></div><a class="btn btn-ghost btn-sm" href="#/debrief">Prepare the Debrief ${icon("arrowRight")}</a></div>
        </details>
      </section>`;

    /* Brief in Both Languages */
    function renderBrief() {
      const brief = tc.brief[lang];
      const node = view.querySelector("#tc-brief");
      node.lang = lang;
      node.innerHTML = `
        <h3>${brief.title}</h3>
        <p>${brief.context}</p>
        <h4>${lang === "fr" ? "Travail demandé" : "Tasks"}</h4>
        <ol>${brief.tasks.map((task) => `<li>${task}</li>`).join("")}</ol>
        ${ui.callout(lang === "fr" ? "Consignes" : "Rules", `<p>${brief.rules}</p>`, "callout-indigo", "info")}`;
    }

    view.querySelector("#tc-lang").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-lang]");
      if (!button) return;
      lang = button.dataset.lang;
      view.querySelectorAll("#tc-lang button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      renderBrief();
    });

    /* Persistent Clock */
    const total = tc.minutes * 60000;
    const clock = () => store.get("timedTimer", { start: null, elapsed: 0 });

    function elapsedMs() {
      const timer = clock();
      return timer.elapsed + (timer.start ? Date.now() - timer.start : 0);
    }

    function paint() {
      const timer = clock();
      const used = elapsedMs();
      const remaining = total - used;
      const shown = Math.abs(remaining);
      const minutes = Math.floor(shown / 60000);
      const seconds = Math.floor((shown % 60000) / 1000);
      const timeNode = view.querySelector("#tc-time");
      timeNode.textContent = `${remaining < 0 ? "+" : ""}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      timeNode.classList.toggle("is-over", remaining < 0);
      view.querySelector("#tc-bar").style.width = `${Math.min(100, (used / total) * 100)}%`;
      const minute = used / 60000;
      const phase = Guide.casePlan.find((item) => minute >= item.from && minute < item.to);
      view.querySelector("#tc-phase").textContent = remaining < 0 ? "Time Is Up: Save and Summarise" : timer.start || timer.elapsed ? `Now: ${phase ? phase.title : "Tidy and Save"}` : "Ready When You Are";
      view.querySelector("#tc-toggle").innerHTML = timer.start ? `${icon("pause")} Pause` : `${icon("play")} ${timer.elapsed ? "Resume" : "Start"}`;
    }

    view.querySelector("#tc-toggle").addEventListener("click", () => {
      const timer = clock();
      if (timer.start) store.set("timedTimer", { start: null, elapsed: timer.elapsed + Date.now() - timer.start });
      else store.set("timedTimer", { start: Date.now(), elapsed: timer.elapsed });
      paint();
    });

    view.querySelector("#tc-reset").addEventListener("click", () => {
      store.set("timedTimer", { start: null, elapsed: 0 });
      paint();
    });

    /* Result Checks */
    const form = view.querySelector("#tc-form");
    const savedAnswers = store.get("timedAnswers", {});
    tc.checks.forEach((check) => {
      if (savedAnswers[check.id]) form.querySelector(`#tc-${check.id}`).value = savedAnswers[check.id];
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let correct = 0;
      const answers = {};
      tc.checks.forEach((check) => {
        const input = form.querySelector(`#tc-${check.id}`);
        const mark = form.querySelector(`[data-check="${check.id}"] .check-mark`);
        answers[check.id] = input.value;
        if (!input.value.trim()) {
          mark.innerHTML = "";
          mark.dataset.state = "";
          return;
        }
        const tol = check.id === "rent" ? 0.003 : null;
        let result = grade(input.value, check.value, check.unit);
        if (tol !== null) {
          const value = parseAnswer(input.value, check.unit);
          result = { status: Math.abs(value - check.value) <= tol ? "correct" : "wrong" };
        }
        const ok = result.status === "correct";
        if (ok) correct += 1;
        mark.dataset.state = ok ? "good" : "bad";
        mark.innerHTML = ok ? icon("check") : icon("close");
      });
      store.set("timedAnswers", answers);
      const best = Math.max(correct, store.get("timedBest", 0));
      store.set("timedBest", best);
      Guide.emit("progress");
      view.querySelector("#tc-score").textContent = `${correct} of ${tc.checks.length} correct. Best so far: ${best} of ${tc.checks.length}.`;
    });

    view.querySelector("#tc-show").addEventListener("click", () => {
      tc.checks.forEach((check) => {
        const mark = form.querySelector(`[data-check="${check.id}"] .check-mark`);
        mark.dataset.state = "info";
        mark.textContent = Guide.excelFormat(check.value, check.unit === "eur0" ? "eur0" : check.unit === "pct" ? "pct2" : check.unit);
      });
    });

    /* Solved Sheet Rendered on First Open */
    const sheetDetails = view.querySelector("#tc-sheet").closest("details");
    sheetDetails.addEventListener(
      "toggle",
      () => {
        if (sheetDetails.open && !view.querySelector("#tc-sheet .xl")) {
          Guide.createSheet(view.querySelector("#tc-sheet"), { caseId: "truck", inputValues: { rent: 1.372096 } });
        }
      },
      { once: false }
    );

    renderBrief();
    paint();
    ticker = window.setInterval(paint, 1000);
    return () => window.clearInterval(ticker);
  };

  /* Discussion View */
  Guide.views.discussion = function discussion(view) {
    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("users")} Conversations</span>
        <h1>Discussion</h1>
        <p class="lede">Expect forty-five minutes with an Investment Director and an Investment Officer. Questions will go deeper than in the first round, especially on one Resonance transaction and on how you read Neot's market.</p>
      </header>

      <section class="section reveal">
        ${heading("01", "Who You Will Meet")}
        <div class="grid grid-2">
          <div class="card">
            <span class="card-icon">${icon("briefcase")}</span>
            <h3>Investment Director</h3>
            <p class="small">Leads transactions from origination to the investment committee and would supervise your work. Expect questions on judgement, such as whether a deal is worth doing and what could go wrong.</p>
          </div>
          <div class="card">
            <span class="card-icon">${icon("grid")}</span>
            <h3>Investment Officer</h3>
            <p class="small">Builds the models and prepares committee material day to day, which makes them your closest future colleague. Expect sharper technical questions on modelling, debt and your Resonance work.</p>
          </div>
        </div>
        <p class="small muted">Names of the current Investment Directors and Investment Officers appear on the <a href="#/neot">Neot Profile</a>.</p>
      </section>

      <section class="section reveal">
        ${heading("02", "How the Conversation Usually Unfolds")}
        <div class="prose">
          <p>Most second-round discussions open with a short pitch, so have a ninety-second version ready that ends on why Neot. Usually, the heart of the conversation is a deep dive into your experience: the team will ask you to walk through one transaction, then keep asking why until they reach the limit of what you know. Preparing one Resonance deal in real depth matters far more than covering several superficially.</p>
          <p>Technical questions follow naturally from that deal, so debt sizing and coverage ratios are likely to resurface. Expect at least one question about Neot's market as well, such as buses versus trucks or how a lessor manages residual value. Keep two questions of your own for the end, ideally linked to something the interviewers mentioned.</p>
        </div>
        ${ui.callout("Bridge to the Case", "<p>Mentioning that you rebuilt a fleet leasing model while preparing creates a natural link to the case that follows, and shows you took the second round seriously.</p>", "", "lightbulb")}
      </section>

      <section class="section">
        <div class="reveal">${heading("03", "Practice")}</div>
        <p class="reveal">New questions for this round sit alongside the essential first-round questions. Rate each answer honestly, since only Solid and Nailed It ratings count toward readiness.</p>
        <div id="discussion-host"></div>
      </section>

      <section class="section reveal">
        ${heading("04", "Questions to Ask")}
        <p>Choose two, ideally adapted to a topic the interviewers raised earlier in the conversation.</p>
        ${Guide.askThem2.map((item) => `<div class="card ask-card"><p><strong>“${item.q}”</strong></p><p class="small muted">${item.why}</p></div>`).join("")}
      </section>`;

    return Guide.questionPractice(view.querySelector("#discussion-host"), {
      items: Guide.discussionPool(),
      categories: Guide.discussion.categories,
      ratingsKey: "discussionRatings"
    });
  };

  /* Debrief View */
  Guide.views.debrief = function debrief(view) {
    const structure = [
      ["Answer", "Lead with the number requested and whether the deal works."],
      ["Structure", "Describe the flow from inputs to returns in two sentences."],
      ["Assumptions", "Flag what you assumed beyond the brief."],
      ["Drivers", "Name the input that moves the result most."],
      ["Recommendation", "Close with a view and the conditions attached."]
    ];
    const walk = Guide.debrief.items.find((item) => item.id === "b-walk");

    view.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">${icon("presentation")} Conversations</span>
        <h1>Debrief</h1>
        <p class="lede">Thirty minutes follow the case, giving you time to present and defend the model you just built. Interviewers want to see that you understand what drives the numbers, not only that the formulas work.</p>
      </header>

      <section class="section reveal">
        ${heading("01", "How the Debrief Works")}
        <div class="prose">
          <p>Expect to open by presenting your results, possibly with your screen shared, followed by questions on your assumptions and on how the answer would change under different scenarios. Interviewers often probe one or two cells directly, asking why a formula is built a certain way or what a ratio is telling you.</p>
          <p>Model answers below use the Timed Case, so complete it before rehearsing them. Come Friday, the same reasoning will apply to whatever case Neot provides, with your own numbers in place of these.</p>
        </div>
      </section>

      <section class="section reveal">
        ${heading("02", "Presenting Your Model")}
        <div class="present-steps">
          ${structure.map(([title, text], index) => `<div class="present-step"><span class="present-num">${index + 1}</span><div><h4>${title}</h4><p class="small">${text}</p></div></div>`).join("")}
        </div>
        <h3 class="answer-heading">Model Three-Minute Presentation</h3>
        ${Guide.answerHtml(walk)}
      </section>

      <section class="section">
        <div class="reveal">${heading("03", "Practice")}</div>
        <p class="reveal">What-if questions are where candidates stand out, so practise those aloud with numbers. Testing the bus case figures live is possible in the What-If Explorer within the Model Builder.</p>
        <div id="debrief-host"></div>
      </section>

      <section class="section reveal">
        ${heading("04", "Staying Composed")}
        <div class="prose">
          <p>Finding an error during the debrief is normal and recoverable. Acknowledge it directly, explain what the corrected figure would do to the conclusion and continue. Defending a mistake costs far more credibility than the mistake itself.</p>
          <p>When a question goes beyond what you modelled, reason aloud from the mechanics. Saying that higher rates raise debt service, which lowers coverage and equity returns, is a strong answer even without the exact number. Should the model be unfinished, state clearly what is complete and what you would add next.</p>
        </div>
      </section>`;

    return Guide.questionPractice(view.querySelector("#debrief-host"), {
      items: Guide.debrief.items,
      categories: Guide.debrief.categories,
      ratingsKey: "debriefRatings",
      duration: 120
    });
  };
})(window.Guide);

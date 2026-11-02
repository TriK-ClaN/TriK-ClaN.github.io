/* Application Shell: Navigation, Routing, Theme and Search */
(function (Guide) {
  "use strict";

  const { icon, store, progress, escapeHtml } = Guide;

  /* Navigation Structure */
  const NAV = [
    {
      title: "Overview",
      items: [
        { href: "#/", label: "Briefing", icon: "home" },
        { href: "#/neot", label: "Neot Profile", icon: "building" },
        { href: "#/role", label: "Role Decoder", icon: "briefcase" }
      ]
    },
    {
      title: "Study",
      items: [{ href: "#/study", label: "Syllabus Overview", icon: "book" }].concat(
        Guide.modules.map((module) => ({ href: `#/study/${module.id}`, label: module.short, icon: module.icon, tier: module.tier, moduleId: module.id }))
      )
    },
    {
      title: "Practice",
      items: [
        { href: "#/practice/flashcards", label: "Flashcards", icon: "cards" },
        { href: "#/practice/quiz", label: "Quiz", icon: "quiz" },
        { href: "#/practice/drills", label: "Statement Drills", icon: "table" },
        { href: "#/practice/case", label: "Fleet Case Lab", icon: "flask" },
        { href: "#/practice/returns", label: "Returns Lab", icon: "calc" },
        { href: "#/practice/mock", label: "Mock Interview", icon: "mic" }
      ]
    },
    {
      title: "Prepare",
      items: [
        { href: "#/story", label: "Story Builder", icon: "pen" },
        { href: "#/lexicon", label: "French Lexicon", icon: "globe" },
        { href: "#/interview-day", label: "Interview Day", icon: "calendar" }
      ]
    }
  ];

  /* Route Table */
  const ROUTES = {
    "": { view: "home", title: "Briefing" },
    neot: { view: "neot", title: "Neot Profile" },
    role: { view: "role", title: "Role Decoder" },
    study: { view: "study", title: "Technical Syllabus" },
    "practice/flashcards": { view: "flashcards", title: "Flashcards" },
    "practice/quiz": { view: "quiz", title: "Quiz" },
    "practice/drills": { view: "drills", title: "Statement Drills" },
    "practice/case": { view: "caseLab", title: "Fleet Case Lab" },
    "practice/returns": { view: "returnsLab", title: "Returns Lab" },
    "practice/mock": { view: "mock", title: "Mock Interview" },
    story: { view: "story", title: "Story Builder" },
    lexicon: { view: "lexicon", title: "French Lexicon" },
    "interview-day": { view: "interviewDay", title: "Interview Day" }
  };

  const SITE_TITLE = "Neot Interview Guide";
  let cleanup = null;
  let revealObserver = null;
  let lastPath = null;

  /* Sidebar Rendering */
  function renderNav() {
    const done = progress.modules();
    const nav = document.getElementById("nav");
    nav.innerHTML = NAV.map(
      (group) => `
      <div>
        <p class="nav-group-title">${group.title}</p>
        <ul class="nav-list">
          ${group.items
            .map((item) => {
              const meta = item.moduleId
                ? `<span class="nav-meta">${done[item.moduleId] ? `<span class="nav-check" title="Reviewed">${icon("check")}</span>` : `<span class="tier-dot" data-tier="${item.tier}" title="Tier ${item.tier}"></span>`}</span>`
                : "";
              return `<li><a class="nav-link" href="${item.href}">${icon(item.icon)}<span>${item.label}</span>${meta}</a></li>`;
            })
            .join("")}
        </ul>
      </div>`
    ).join("");
    highlightNav();
  }

  function highlightNav() {
    const hash = window.location.hash || "#/";
    const parts = hash.replace(/^#\/?/, "").split("/");
    const current = parts[0] === "study" && parts[1] ? `#/study/${parts[1]}` : hash.split("/").slice(0, parts[0] === "practice" ? 3 : 2).join("/") || "#/";
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href");
      const active = href === current || (href === "#/" && (current === "#" || current === "#/"));
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function renderReadiness() {
    const summary = progress.summary();
    const percent = Math.round(summary.score * 100);
    document.getElementById("readiness-value").textContent = `${percent}%`;
    document.getElementById("readiness-fill").style.width = `${percent}%`;
  }

  /* Scroll Reveal Animations */
  function observeReveals(root) {
    if (revealObserver) revealObserver.disconnect();
    const targets = root.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
    );
    targets.forEach((node) => revealObserver.observe(node));
  }

  /* Callout Icon Decoration */
  function decorateCallouts(root) {
    root.querySelectorAll(".callout").forEach((callout) => {
      if (callout.firstElementChild && callout.firstElementChild.tagName.toLowerCase() === "svg") return;
      const name = callout.classList.contains("callout-amber") ? "alert" : callout.classList.contains("callout-rose") ? "flag" : callout.classList.contains("callout-indigo") ? "building" : "lightbulb";
      callout.insertAdjacentHTML("afterbegin", icon(name));
    });
  }

  /* Router */
  function parseHash() {
    const raw = decodeURIComponent((window.location.hash || "#/").replace(/^#\/?/, "")).replace(/\/$/, "");
    const parts = raw.split("/");
    if (parts[0] === "study" && parts[1]) {
      return { view: "module", title: (Guide.modules.find((m) => m.id === parts[1]) || {}).title, args: [parts[1], parts[2]], path: `study/${parts[1]}` };
    }
    const route = ROUTES[raw];
    return route ? { view: route.view, title: route.title, args: [], path: raw } : { view: "notFound", title: "Not Found", args: [], path: raw };
  }

  function render() {
    const route = parseHash();
    const main = document.getElementById("main");
    const samePage = route.path === lastPath && route.view === "module";

    closeNav();
    highlightNav();

    /* Same Module, Different Section: Scroll Only */
    if (samePage && route.args[1]) {
      const target = main.querySelector(`#sec-${route.args[1]}`);
      if (target) {
        target.classList.add("is-visible");
        target.scrollIntoView({ behavior: Guide.scrollBehavior(), block: "start" });
        return;
      }
    }

    if (typeof cleanup === "function") cleanup();
    if (typeof cleanup === "number") window.clearInterval(cleanup);
    cleanup = null;

    const view = document.createElement("div");
    view.className = "view";
    main.innerHTML = "";
    main.appendChild(view);

    const renderer = Guide.views[route.view] || Guide.views.notFound;
    cleanup = renderer(view, ...route.args) || null;

    view.insertAdjacentHTML(
      "beforeend",
      `<footer class="site-footer">Interview preparation guide for the Neot Capital Investment Analyst internship · November 2026. Company facts come from Neot's public materials; confirm any figure before quoting it.</footer>`
    );

    decorateCallouts(view);
    observeReveals(view);
    document.title = route.title ? `${route.title} · ${SITE_TITLE}` : SITE_TITLE;

    if (!(route.view === "module" && route.args[1])) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    if (lastPath !== null) main.focus({ preventScroll: true });
    lastPath = route.path;
  }

  /* Theme Handling */
  function applyTheme(mode) {
    const root = document.documentElement;
    if (mode === "light" || mode === "dark") root.setAttribute("data-theme", mode);
    else root.removeAttribute("data-theme");
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === mode));
    });
    const dark = mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "#0a1014" : "#f5f7f6");
  }

  function initTheme() {
    let mode = store.get("theme", "system");
    applyTheme(mode);
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        mode = button.dataset.themeChoice;
        store.set("theme", mode);
        applyTheme(mode);
      });
    });
    document.getElementById("theme-quick").addEventListener("click", () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      mode = dark ? "light" : "dark";
      store.set("theme", mode);
      applyTheme(mode);
    });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (mode === "system") applyTheme(mode);
    });
  }

  /* Mobile Navigation Drawer */
  function openNav() {
    document.body.classList.add("nav-open");
    document.getElementById("menu-toggle").setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    const toggle = document.getElementById("menu-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  /* Search Index */
  function buildIndex() {
    const entries = [];
    NAV.forEach((group) => group.items.forEach((item) => entries.push({ kind: "Page", title: item.label, text: group.title, href: item.href })));
    Guide.modules.forEach((module) => {
      module.sections.forEach((section) => {
        entries.push({ kind: module.short, title: section.title, text: Guide.stripHtml(section.html), href: `#/study/${module.id}/${section.id}` });
      });
      module.ladder.forEach((item) => entries.push({ kind: "Answer", title: item.q, text: item.great, href: `#/study/${module.id}/answers` }));
    });
    Guide.lexicon.forEach((item) => entries.push({ kind: "Lexicon", title: `${item.fr} · ${item.en}`, text: item.def, href: "#/lexicon" }));
    Guide.flashcards.forEach((card) => entries.push({ kind: "Flashcard", title: card.q, text: Guide.stripHtml(card.a), href: "#/practice/flashcards" }));
    Guide.mock.forEach((item) => entries.push({ kind: "Mock Question", title: item.q, text: item.points.join(" · "), href: "#/practice/mock" }));
    return entries;
  }

  function initSearch() {
    const dialog = document.getElementById("search-dialog");
    const input = document.getElementById("search-input");
    const results = document.getElementById("search-results");
    let index = null;
    let active = 0;

    function snippet(text, query) {
      const lower = text.toLowerCase();
      const at = lower.indexOf(query);
      const start = Math.max(0, at - 50);
      const slice = (start > 0 ? "…" : "") + text.slice(start, start + 140) + (start + 140 < text.length ? "…" : "");
      const safe = escapeHtml(slice);
      return query ? safe.replace(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"), "<mark>$1</mark>") : safe;
    }

    function run() {
      const query = input.value.trim().toLowerCase();
      if (!query) {
        results.innerHTML = `<li class="search-empty">Search modules, answers, flashcards and the lexicon.</li>`;
        return;
      }
      const words = query.split(/\s+/);
      const hits = index
        .map((entry) => {
          const title = entry.title.toLowerCase();
          const body = entry.text.toLowerCase();
          if (!words.every((word) => title.includes(word) || body.includes(word))) return null;
          const score = (title.includes(query) ? 10 : 0) + words.filter((word) => title.includes(word)).length * 3 + (entry.kind === "Page" ? 2 : 0);
          return { entry, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12);

      active = 0;
      results.innerHTML = hits.length
        ? hits
            .map(
              ({ entry }, i) => `<li><a href="${entry.href}" class="${i === 0 ? "is-active" : ""}"><span class="sr-kind">${escapeHtml(entry.kind)}</span><strong style="display:block">${snippet(entry.title, query)}</strong><span class="sr-text">${snippet(entry.text, words[0])}</span></a></li>`
            )
            .join("")
        : `<li class="search-empty">No results for “${escapeHtml(input.value)}”.</li>`;
    }

    function open() {
      if (!index) index = buildIndex();
      closeNav();
      dialog.showModal();
      input.value = "";
      run();
      input.focus();
    }

    document.querySelectorAll("[data-open-search]").forEach((button) => button.addEventListener("click", open));
    input.addEventListener("input", run);

    input.addEventListener("keydown", (event) => {
      const links = results.querySelectorAll("a");
      if (!links.length) return;
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        links[active].classList.remove("is-active");
        active = (active + (event.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
        links[active].classList.add("is-active");
        links[active].scrollIntoView({ block: "nearest" });
      } else if (event.key === "Enter") {
        event.preventDefault();
        links[active].click();
      }
    });

    results.addEventListener("click", (event) => {
      if (event.target.closest("a")) dialog.close();
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });

    document.addEventListener("keydown", (event) => {
      const typing = event.target.closest("input, textarea, select, [contenteditable]");
      if ((event.key === "k" && (event.ctrlKey || event.metaKey)) || (event.key === "/" && !typing)) {
        event.preventDefault();
        if (!dialog.open) open();
      }
    });
  }

  /* Initialisation */
  function init() {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    renderNav();
    renderReadiness();
    initTheme();
    initSearch();

    document.getElementById("menu-toggle").addEventListener("click", () => {
      if (document.body.classList.contains("nav-open")) closeNav();
      else openNav();
    });
    document.getElementById("scrim").addEventListener("click", closeNav);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });

    Guide.on("progress", () => {
      renderNav();
      renderReadiness();
    });

    window.addEventListener("hashchange", render);
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(window.Guide);

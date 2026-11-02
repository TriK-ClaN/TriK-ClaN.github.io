/* Core Helpers and Shared Utilities */
window.Guide = window.Guide || {};

(function (Guide) {
  "use strict";

  /* Icon Library */
  const ICON_PATHS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    scale: '<path d="M12 3v18M7 21h10"/><path d="M5 7h14"/><path d="m5 7-3 7a3 3 0 0 0 6 0L5 7Z"/><path d="m19 7-3 7a3 3 0 0 0 6 0l-3-7Z"/>',
    grid: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
    trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    pulse: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    cards: '<rect x="2" y="6" width="14" height="14" rx="2"/><path d="M6 6V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/>',
    quiz: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 3 3 5-6"/>',
    table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10M15 10v10"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-2.5L14 9V3"/><path d="M7 15h10"/>',
    calc: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h4"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
    monitor: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17h.01"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 21h16"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.5 4.5L21 15"/><path d="M21 20v-5h-5"/>',
    shuffle: '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
    play: '<path d="M7 4v16l13-8L7 4Z"/>',
    pause: '<path d="M7 4h4v16H7zM13 4h4v16h-4z"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    lightbulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2Z"/>'
  };

  Guide.icon = function icon(name, extraClass) {
    const paths = ICON_PATHS[name] || ICON_PATHS.info;
    const cls = extraClass ? ` class="${extraClass}"` : "";
    return `<svg${cls} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  };

  /* Safe Local Storage */
  const PREFIX = "neotGuide:";

  Guide.store = {
    get(key, fallback) {
      try {
        const raw = window.localStorage.getItem(PREFIX + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (error) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
      } catch (error) {
        /* Storage Unavailable: Continue Without Persistence */
      }
    }
  };

  /* Stored Data Groups for Resetting */
  const DATA_GROUPS = {
    progress: ["modulesDone", "flashState", "drillsDone", "checklist", "quizBest", "plan", "mockRatings", "caseLab"],
    notes: ["story"],
    settings: ["interviewParisDate", "interviewParisTime", "theme"]
  };

  Guide.resetData = function resetData(groups) {
    Object.keys(DATA_GROUPS).forEach((group) => {
      if (!groups[group]) return;
      DATA_GROUPS[group].forEach((key) => {
        try {
          window.localStorage.removeItem(PREFIX + key);
        } catch (error) {
          /* Storage Unavailable: Nothing to Remove */
        }
      });
    });
  };

  /* Paris Time Zone Helpers */
  const ZONE = "Europe/Paris";

  Guide.time = {
    zone: ZONE,
    partsInZone(date) {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: ZONE,
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).formatToParts(date);
      const read = (type) => Number(parts.find((part) => part.type === type).value);
      return { year: read("year"), month: read("month"), day: read("day"), hour: read("hour"), minute: read("minute"), second: read("second") };
    },
    offsetMinutes(date) {
      const p = this.partsInZone(date);
      const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
      return Math.round((asUtc - Math.floor(date.getTime() / 1000) * 1000) / 60000);
    },
    parisToDate(dateText, timeText) {
      const [year, month, day] = dateText.split("-").map(Number);
      const [hour, minute] = timeText.split(":").map(Number);
      const guess = Date.UTC(year, month - 1, day, hour, minute);
      let result = guess - this.offsetMinutes(new Date(guess)) * 60000;
      result = guess - this.offsetMinutes(new Date(result)) * 60000;
      return new Date(result);
    },
    todayInParis() {
      const p = this.partsInZone(new Date());
      return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
    },
    zoneLabel(date) {
      const name = new Intl.DateTimeFormat("en-GB", { timeZone: ZONE, timeZoneName: "short" })
        .formatToParts(date)
        .find((part) => part.type === "timeZoneName");
      return name ? name.value : "Paris";
    },
    formatLongDate(dateText) {
      const [year, month, day] = dateText.split("-").map(Number);
      return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(
        new Date(Date.UTC(year, month - 1, day, 12))
      );
    },
    formatLocalTime(date) {
      return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", weekday: "short" }).format(date);
    }
  };

  /* Formula Rendering With Plain-Text Fallback */
  function renderTex(tex, target, displayMode) {
    if (window.katex) {
      try {
        window.katex.render(tex, target, { displayMode, throwOnError: false, strict: "ignore" });
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  Guide.renderFormulas = function renderFormulas(root) {
    root.querySelectorAll("[data-f]").forEach((node) => {
      if (node.dataset.rendered) return;
      const formula = Guide.formulas[node.dataset.f];
      if (!formula) return;

      const math = document.createElement("div");
      math.className = "eq-math";
      if (!renderTex(formula.tex, math, true)) {
        math.textContent = formula.plain;
        math.classList.add("is-plain");
      }
      node.appendChild(math);

      if (formula.where) {
        const legend = document.createElement("dl");
        legend.className = "eq-where";
        formula.where.forEach(([symbol, meaning]) => {
          const term = document.createElement("dt");
          if (!renderTex(symbol, term, false)) term.textContent = symbol;
          const detail = document.createElement("dd");
          detail.textContent = meaning;
          legend.append(term, detail);
        });
        node.appendChild(legend);
      }

      node.dataset.rendered = "true";
    });
  };

  /* Text and Number Utilities */
  Guide.escapeHtml = function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  Guide.stripHtml = function stripHtml(html) {
    const holder = document.createElement("div");
    holder.innerHTML = html;
    return (holder.textContent || "").replace(/\s+/g, " ").trim();
  };

  Guide.fmt = {
    num(value, digits = 1) {
      if (!Number.isFinite(value)) return "n/a";
      return value.toLocaleString("en-GB", { minimumFractionDigits: digits, maximumFractionDigits: digits });
    },
    pct(value, digits = 1) {
      if (!Number.isFinite(value)) return "n/a";
      return `${(value * 100).toFixed(digits)}%`;
    },
    mult(value, digits = 2) {
      if (!Number.isFinite(value)) return "n/a";
      return `${value.toFixed(digits)}x`;
    },
    eur(value, digits = 1) {
      if (!Number.isFinite(value)) return "n/a";
      const sign = value < 0 ? "−" : "";
      return `${sign}€${Math.abs(value).toFixed(digits)}m`;
    },
    signed(value, digits = 1, suffix = "") {
      if (!Number.isFinite(value)) return "n/a";
      const rounded = Number(value.toFixed(digits));
      if (rounded === 0) return `0${suffix}`;
      return `${rounded > 0 ? "+" : "−"}${Math.abs(rounded).toFixed(digits)}${suffix}`;
    }
  };

  Guide.scrollBehavior = function scrollBehavior() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  };

  Guide.shuffle = function shuffle(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  Guide.debounce = function debounce(fn, wait) {
    let timer = null;
    return function debounced(...args) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => fn.apply(this, args), wait);
    };
  };

  /* Toast Notifications */
  Guide.toast = function toast(message) {
    const region = document.getElementById("toast-region");
    if (!region) return;
    const node = document.createElement("div");
    node.className = "toast";
    node.setAttribute("role", "status");
    node.innerHTML = `${Guide.icon("check")}<span>${Guide.escapeHtml(message)}</span>`;
    region.appendChild(node);
    window.setTimeout(() => node.remove(), 2600);
  };

  /* Progress Tracking */
  Guide.progress = {
    modules() {
      return Guide.store.get("modulesDone", {});
    },
    toggleModule(id) {
      const done = this.modules();
      done[id] = !done[id];
      Guide.store.set("modulesDone", done);
      Guide.emit("progress");
      return done[id];
    },
    flash() {
      return Guide.store.get("flashState", {});
    },
    setFlash(id, state) {
      const map = this.flash();
      map[id] = state;
      Guide.store.set("flashState", map);
      Guide.emit("progress");
    },
    drills() {
      return Guide.store.get("drillsDone", {});
    },
    markDrill(id) {
      const map = this.drills();
      map[id] = true;
      Guide.store.set("drillsDone", map);
      Guide.emit("progress");
    },
    checklist() {
      return Guide.store.get("checklist", {});
    },
    setCheck(id, value) {
      const map = this.checklist();
      map[id] = value;
      Guide.store.set("checklist", map);
      Guide.emit("progress");
    },
    story() {
      return Guide.store.get("story", {});
    },
    quizBest() {
      return Guide.store.get("quizBest", 0);
    },
    summary() {
      const modulesDone = Object.values(this.modules()).filter(Boolean).length;
      const flashKnown = Object.values(this.flash()).filter((state) => state === "known").length;
      const drillsDone = Object.values(this.drills()).filter(Boolean).length;
      const checksDone = Object.values(this.checklist()).filter(Boolean).length;
      const storyDone = Object.values(this.story()).filter((text) => String(text).trim().split(/\s+/).length >= 25).length;
      const quizBest = this.quizBest();

      const totals = {
        modules: Guide.modules.length,
        flash: Guide.flashcards.length,
        drills: Guide.drills.length,
        checks: Guide.checklist.length,
        story: Guide.story.length
      };

      const score =
        0.35 * (modulesDone / totals.modules) +
        0.2 * (checksDone / totals.checks) +
        0.15 * (flashKnown / totals.flash) +
        0.1 * (drillsDone / totals.drills) +
        0.1 * (quizBest / 100) +
        0.1 * (storyDone / totals.story);

      return { modulesDone, flashKnown, drillsDone, checksDone, storyDone, quizBest, totals, score: Math.min(1, score) };
    }
  };

  /* Minimal Event Bus */
  const listeners = {};

  Guide.on = function on(event, handler) {
    (listeners[event] = listeners[event] || []).push(handler);
  };

  Guide.emit = function emit(event, payload) {
    (listeners[event] || []).forEach((handler) => handler(payload));
  };

  /* Shared Markup Builders */
  Guide.ui = {
    tierLabel(tier) {
      return { 1: "Tier 1 · Must Master", 2: "Tier 2 · Very Likely", 3: "Tier 3 · Stand Out" }[tier];
    },
    tierPill(tier) {
      return `<span class="pill" data-tier="${tier}">${this.tierLabel(tier)}</span>`;
    },
    callout(title, body, variant = "", icon = "info") {
      return `<div class="callout ${variant}">${Guide.icon(icon)}<div><span class="callout-title">${title}</span>${body}</div></div>`;
    },
    range(id, label, min, max, step, value, display) {
      return `
        <div class="range-field">
          <div class="range-head"><label for="${id}">${label}</label><output id="${id}-out" for="${id}">${display}</output></div>
          <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${value}">
        </div>`;
    },
    syncRangeFill(input) {
      const min = Number(input.min);
      const max = Number(input.max);
      const fill = ((Number(input.value) - min) / (max - min)) * 100;
      input.style.setProperty("--fill", `${fill}%`);
    }
  };
})(window.Guide);

/* Reference Content */
window.Guide = window.Guide || {};

/* Interview Details */
Guide.interview = {
  defaultDate: "2026-11-04T10:00",
  company: "Neot Capital",
  role: "Investment Analyst Intern, Sustainable Mobility",
  start: "March 2027",
  duration: "Six months",
  location: "Rue Saint-Lazare, Paris 9e",
  stages: [
    {
      title: "Teams Screening",
      length: "30 minutes",
      who: "Recruiting contact or team member",
      focus: [
        "Motivation for Neot and sustainable mobility",
        "Concise walkthrough of the CV and Resonance experience",
        "Fluency in French and English",
        "Possibly light technical questions"
      ]
    },
    {
      title: "Technical and Fit Interview",
      length: "Typically longer",
      who: "Investment Director and Investment Officer",
      focus: [
        "Project finance and debt sizing in depth",
        "Accounting and valuation fundamentals",
        "Investment judgement on EV fleets",
        "Fit with a small, demanding team"
      ]
    }
  ]
};

/* Company Profile Sources */
Guide.sources = [
  { label: "Neot Capital website", url: "https://www.neotcapital.com/en/" },
  { label: "Neot team page", url: "https://www.neotcapital.com/en/our-team/" },
  { label: "Neot e-motion launch press release (20 May 2025)", url: "https://www.mirova.com/sites/default/files/2025-05/pr-neot-e-motion-mirova-alba-bdt-neot.pdf" },
  { label: "Forsee Power announcement (21 May 2025)", url: "https://www.forseepower.com/press-release/forsee-power-announces-the-launch-of-neot-e-motion/" },
  { label: "European Investment Fund case study", url: "https://www.eif.org/case-study/all/neot-e-motion" },
  { label: "Danish e-bus financing", url: "https://www.neotcapital.com/en/projets/financing-of-186-e-coaches-in-danmark/" },
  { label: "Neot e-motion €125m MUFG financing (18 December 2025)", url: "https://www.neotcapital.com/en/neot-e-motion-secures-e125-million-in-financing-from-mufg-to-accelerate-the-development-of-low-carbon-mobility-in-europe/" },
  { label: "NGM €170m refinancing (4 November 2025)", url: "https://www.neotcapital.com/en/neot-green-mobility-refinances-e170-million-of-debt-with-mufg-la-banque-postale-and-lbpam/" },
  { label: "Neot news archive", url: "https://www.neotcapital.com/en/news/" }
];

/* Questions to Ask Interviewers */
Guide.askThem = [
  { q: "Neot e-motion started with the Danish bus financing. Which segments or geographies do you expect to drive the pipeline over the next year?", why: "Shows awareness of recent activity and strategic curiosity." },
  { q: "How does the team underwrite battery residual value and the performance guarantees behind Battery-as-a-Service?", why: "Targets the hardest underwriting question in the business." },
  { q: "When an operator's public service contract is shorter than the asset life, how do you protect the investment at expiry?", why: "Demonstrates contract and risk allocation thinking." },
  { q: "Neot e-motion's €125m MUFG facility combines a revolving credit facility with long-term project financing. How does the team decide when assets move from the revolving tranche into term debt?", why: "Shows command of Neot's latest financing and connects directly to Resonance debt work." },
  { q: "How does the investment team split its time between new transactions and monitoring deployed assets?", why: "Signals interest in the full investment cycle." },
  { q: "Which KPIs matter most in your asset management reporting?", why: "Shows readiness to contribute after closing." },
  { q: "What distinguishes an intern who truly helped the team after six months?", why: "Invites concrete expectations and shows ambition." },
  { q: "How do Neot's industrial shareholders contribute to technical due diligence or deal flow?", why: "Explores the value of Neot's industrial shareholder relationships." }
];

/* French and English Lexicon */
Guide.lexicon = [
  { fr: "Société de projet (SPV)", en: "Special purpose vehicle", def: "Ring-fenced entity that owns the project assets and borrows on their cash flows." },
  { fr: "Financement sans recours", en: "Non-recourse finance", def: "Lenders rely on project cash flows rather than on the sponsor's balance sheet." },
  { fr: "Emplois et ressources", en: "Sources and uses", def: "Table matching where funds go with who provides them. Note the reversed French order." },
  { fr: "Flux disponibles pour le service de la dette", en: "CFADS", def: "Cash available to pay interest and principal." },
  { fr: "Ratio de couverture du service de la dette", en: "DSCR", def: "CFADS divided by interest plus principal for a period." },
  { fr: "Ratio de couverture sur la durée du prêt", en: "LLCR", def: "NPV of CFADS over the remaining loan life divided by outstanding debt." },
  { fr: "Ratio de couverture sur la durée du projet", en: "PLCR", def: "NPV of CFADS over the remaining project life divided by outstanding debt." },
  { fr: "Service de la dette", en: "Debt service", def: "Interest plus principal due in a period." },
  { fr: "Dimensionnement de la dette", en: "Debt sizing", def: "Determining the maximum debt the binding constraint allows." },
  { fr: "Sculpting / profil de remboursement sculpté", en: "Debt sculpting", def: "Shaping repayments so debt service equals CFADS divided by a target DSCR." },
  { fr: "Cascade des flux", en: "Cash flow waterfall", def: "Contractual order of priority for payments." },
  { fr: "Compte de réserve du service de la dette", en: "DSRA", def: "Reserve that covers debt service during temporary shortfalls." },
  { fr: "Compte de réserve de maintenance", en: "MRA", def: "Reserve built up ahead of major maintenance or replacements." },
  { fr: "Blocage des distributions", en: "Lock-up", def: "Distributions are blocked when a ratio falls below a threshold." },
  { fr: "Cas de défaut", en: "Event of default", def: "Breach allowing lenders to accelerate or enforce." },
  { fr: "Clause financière (covenant)", en: "Financial covenant", def: "Ratio the borrower must respect under the loan agreement." },
  { fr: "Dette senior", en: "Senior debt", def: "Debt with first priority on cash flows and security." },
  { fr: "Dette subordonnée / mezzanine", en: "Subordinated or mezzanine debt", def: "Debt ranking behind senior lenders, priced higher." },
  { fr: "Ratio d'endettement (gearing)", en: "Gearing", def: "Debt as a share of total funding." },
  { fr: "Remboursement in fine", en: "Bullet repayment", def: "Principal repaid in full at maturity." },
  { fr: "Amortissement linéaire", en: "Linear amortisation", def: "Equal principal instalments each period." },
  { fr: "Différé d'amortissement", en: "Grace period", def: "Initial period during which only interest is paid." },
  { fr: "Maturité / durée", en: "Tenor", def: "Length of the loan." },
  { fr: "Tail / queue de financement", en: "Tail", def: "Period between final debt repayment and the end of the project life." },
  { fr: "Swap de taux", en: "Interest rate swap", def: "Exchange of floating-rate payments for fixed-rate payments." },
  { fr: "Marge de crédit", en: "Credit margin", def: "Spread paid above the reference rate such as EURIBOR." },
  { fr: "Commission d'engagement", en: "Commitment fee", def: "Fee charged on undrawn loan amounts." },
  { fr: "Effet de levier", en: "Leverage effect", def: "Amplification of equity returns through debt." },
  { fr: "Finançable / bancable", en: "Bankable", def: "Acceptable to lenders on repayment risk." },
  { fr: "Compte de résultat", en: "Income statement", def: "Revenue and costs over a period, ending in net income." },
  { fr: "Bilan", en: "Balance sheet", def: "Assets, liabilities and equity at a point in time." },
  { fr: "Tableau des flux de trésorerie", en: "Cash flow statement", def: "Operating, investing and financing cash flows." },
  { fr: "Chiffre d'affaires", en: "Revenue", def: "Sales generated over the period." },
  { fr: "Excédent brut d'exploitation (EBE)", en: "EBITDA (approximately)", def: "Operating profit before depreciation; definitions differ slightly." },
  { fr: "Résultat d'exploitation", en: "EBIT", def: "Operating profit after depreciation." },
  { fr: "Résultat net", en: "Net income", def: "Profit after interest and tax." },
  { fr: "Dotations aux amortissements", en: "Depreciation and amortisation", def: "Non-cash allocation of asset cost over its life." },
  { fr: "Dépréciation", en: "Impairment", def: "Write-down of an asset below its carrying value." },
  { fr: "Besoin en fonds de roulement (BFR)", en: "Working capital requirement", def: "Receivables plus inventory minus payables." },
  { fr: "Investissements (CAPEX)", en: "Capital expenditure", def: "Spending on long-lived assets." },
  { fr: "Charges d'exploitation (OPEX)", en: "Operating expenses", def: "Recurring costs of running the assets." },
  { fr: "Dette nette", en: "Net debt", def: "Financial debt minus cash." },
  { fr: "Valeur d'entreprise", en: "Enterprise value", def: "Value of operations available to all capital providers." },
  { fr: "Valeur des fonds propres", en: "Equity value", def: "Value attributable to shareholders." },
  { fr: "Actualisation des flux (DCF)", en: "Discounted cash flow", def: "Valuation from discounted future cash flows." },
  { fr: "Coût moyen pondéré du capital (CMPC)", en: "WACC", def: "Blended cost of debt and equity." },
  { fr: "Coût des fonds propres", en: "Cost of equity", def: "Return required by shareholders." },
  { fr: "Prime de risque du marché", en: "Equity risk premium", def: "Excess return of equities over the risk-free rate." },
  { fr: "Valeur terminale", en: "Terminal value", def: "Value of cash flows beyond the explicit forecast." },
  { fr: "Valeur résiduelle", en: "Residual value", def: "Value of an asset at the end of its contract or use." },
  { fr: "Comparables boursiers", en: "Trading comparables", def: "Valuation using listed peer multiples." },
  { fr: "Transactions comparables", en: "Precedent transactions", def: "Valuation using multiples paid in past deals." },
  { fr: "Prime de contrôle", en: "Control premium", def: "Extra price paid to acquire control." },
  { fr: "Valeur actuelle nette (VAN)", en: "Net present value", def: "Discounted sum of all cash flows." },
  { fr: "Taux de rendement interne (TRI)", en: "Internal rate of return", def: "Discount rate that sets NPV to zero." },
  { fr: "TRI projet / TRI actionnaire", en: "Project IRR / Equity IRR", def: "Unlevered return versus return to shareholders." },
  { fr: "Multiple sur capitaux investis", en: "MOIC", def: "Total proceeds divided by equity invested." },
  { fr: "Économie d'impôt", en: "Tax shield", def: "Tax saved because interest or depreciation is deductible." },
  { fr: "Comité d'investissement", en: "Investment committee", def: "Body that approves or rejects investments." },
  { fr: "Note d'investissement", en: "Investment memo", def: "Document presenting the case and recommendation to the committee." },
  { fr: "Audits d'acquisition (due diligences)", en: "Due diligence", def: "Multi-workstream review of a target before investment." },
  { fr: "Répartition des risques", en: "Risk allocation", def: "Contractual assignment of each risk to a party." },
  { fr: "Contrepartie", en: "Counterparty", def: "Party paying the project, such as an operator or authority." },
  { fr: "Probabilité de défaut", en: "Probability of default", def: "Likelihood a borrower fails to pay." },
  { fr: "Perte en cas de défaut", en: "Loss given default", def: "Share of exposure lost after recoveries." },
  { fr: "Catégorie investissement", en: "Investment grade", def: "BBB− or above at S&P and Fitch, Baa3 or above at Moody's." },
  { fr: "Contrat clé en main", en: "EPC contract", def: "Fixed-price contract to deliver a completed asset." },
  { fr: "Exploitation et maintenance", en: "O&M", def: "Operation and maintenance of the asset." },
  { fr: "Pénalités de retard", en: "Delay liquidated damages", def: "Compensation owed by a supplier for late delivery." },
  { fr: "Coût total de possession (TCO)", en: "Total cost of ownership", def: "Lifetime cost of an asset net of residual value." },
  { fr: "Infrastructure de recharge (IRVE)", en: "Charging infrastructure", def: "Chargers and electrical works for electric vehicles." },
  { fr: "Raccordement au réseau", en: "Grid connection", def: "Link between chargers and the electricity network." },
  { fr: "Taux d'utilisation", en: "Utilisation rate", def: "Share of time or capacity an asset is used." },
  { fr: "Disponibilité", en: "Availability", def: "Share of time an asset is ready for service." },
  { fr: "Dégradation de la batterie", en: "Battery degradation", def: "Gradual loss of battery capacity." },
  { fr: "État de santé (SoH)", en: "State of health", def: "Remaining battery capacity relative to new." },
  { fr: "Seconde vie des batteries", en: "Battery second life", def: "Reuse of vehicle batteries, often in stationary storage." },
  { fr: "Rétrofit", en: "Retrofit", def: "Conversion of a combustion vehicle to electric." },
  { fr: "Location / crédit-bail", en: "Leasing", def: "Use of an asset in exchange for periodic payments." },
  { fr: "Autorité organisatrice de la mobilité (AOM)", en: "Transport authority", def: "Public body organising transport services in France." },
  { fr: "Délégation de service public (DSP)", en: "Public service concession", def: "Contract entrusting a public service to an operator." },
  { fr: "Gestion d'actifs", en: "Asset management", def: "Monitoring and optimising deployed assets." },
  { fr: "Écart budget / réel", en: "Budget versus actual variance", def: "Difference between forecast and realised results." },
  { fr: "Indexation", en: "Indexation", def: "Adjustment of prices to inflation." },
  { fr: "Analyse de sensibilité", en: "Sensitivity analysis", def: "Changing one variable to isolate its effect." },
  { fr: "Scénario dégradé", en: "Downside scenario", def: "Coherent combination of adverse assumptions." },
  { fr: "Point mort", en: "Breakeven", def: "Level of a variable at which a target is just met." },
  { fr: "Référence circulaire", en: "Circular reference", def: "Formula that depends on its own result." },
  { fr: "Associé commanditaire (LP)", en: "Limited partner", def: "Institutional investor in a fund or platform." }
];

/* Story Builder Prompts */
Guide.story = [
  {
    id: "pitch",
    title: "Tell Me About Yourself",
    lang: "en",
    target: "90 to 120 seconds",
    guidance: [
      "Present: EDHEC Master's student, currently in project finance at Resonance Advisory",
      "Past: what VIB taught about credit and how it led to project finance",
      "Skills: debt sizing and modelling plus model audit and QC procedures",
      "Future: why an investment role at Neot is the logical next step"
    ],
    starter: "Currently completing my Master's at EDHEC, I am interning at Resonance Advisory, where I work on project finance transactions…"
  },
  {
    id: "pitch-fr",
    title: "Présentez-vous",
    lang: "fr",
    target: "90 à 120 secondes",
    guidance: [
      "Même structure que la version anglaise",
      "Vocabulaire précis : dimensionnement de la dette, DSCR, audit de modèle",
      "Terminer sur l'intérêt pour Neot et la mobilité durable"
    ],
    starter: "Actuellement en Master à l'EDHEC, j'effectue un stage chez Resonance Advisory en financement de projets…"
  },
  {
    id: "why-neot",
    title: "Why Neot?",
    lang: "en",
    target: "60 seconds",
    guidance: [
      "Specialist financier of electrified transport, not a generalist fund",
      "Full investment cycle from origination to asset management",
      "Momentum: the Danish bus financing and the €125m MUFG facility for Neot e-motion",
      "Industrial shareholders bring battery and energy expertise",
      "Personal link to the energy transition"
    ],
    starter: "Neot sits exactly where my interests meet: structured finance applied to the electrification of transport…"
  },
  {
    id: "why-role",
    title: "Why Move From Advisory to Investing?",
    lang: "en",
    target: "60 seconds",
    guidance: [
      "Advisory proves that a financing works",
      "Investing asks whether an asset deserves equity",
      "Wish to own recommendations and follow assets after closing",
      "Skills that transfer directly"
    ],
    starter: "Working at Resonance, my focus is proving that a financing structure holds together. What attracts me to Neot is…"
  },
  {
    id: "model-story",
    title: "Walk Me Through a Model You Built",
    lang: "en",
    target: "2 minutes",
    guidance: [
      "Purpose: which decision did the model support?",
      "Structure: inputs, operations, CFADS, debt sizing, waterfall, returns",
      "Key driver and most informative sensitivity",
      "Respect confidentiality: describe sector and structure, not client names"
    ],
    starter: "Most recently, I built the financing model for a project in…"
  },
  {
    id: "error-story",
    title: "Hardest Error You Have Found",
    lang: "en",
    target: "STAR, 90 seconds",
    guidance: [
      "Situation and task: what model and why it was reviewed",
      "Action: how the error was detected",
      "Result: impact on outputs, quantified if possible",
      "Lesson: what changed in the review process"
    ],
    starter: "During a review of a model for…"
  },
  {
    id: "qc-story",
    title: "QC Procedure You Formalised",
    lang: "en",
    target: "STAR, 90 seconds",
    guidance: [
      "Problem that motivated the procedure",
      "Structure: which checks and in which order",
      "Adoption by the team",
      "Benefit: time saved or errors prevented"
    ],
    starter: "Noticing that model reviews depended heavily on individual habits, I…"
  },
  {
    id: "challenge-story",
    title: "Time You Challenged an Assumption",
    lang: "en",
    target: "STAR, 90 seconds",
    guidance: [
      "Assumption that looked doubtful",
      "Evidence gathered",
      "How it was raised and with whom",
      "Outcome for the transaction or model"
    ],
    starter: "While working on a sensitivity analysis, one assumption stood out…"
  },
  {
    id: "pressure-story",
    title: "Working Under Pressure or in a Team",
    lang: "en",
    target: "STAR, 90 seconds",
    guidance: [
      "Deadline or conflicting priorities",
      "Prioritisation and communication",
      "Result delivered",
      "What the team said or what was learned"
    ],
    starter: "Two days before a lender deadline…"
  },
  {
    id: "weakness",
    title: "Strength and Weakness",
    lang: "en",
    target: "60 seconds",
    guidance: [
      "Strength backed by a concrete example",
      "Real weakness that does not disqualify",
      "Specific steps already taken to improve"
    ],
    starter: "My strongest asset is rigour, which shows in…"
  }
];

/* Readiness Checklist */
Guide.checklist = [
  { id: "c1", group: "Technical", text: "Explain every coverage ratio fluently, with formulas", hint: "Project Finance module" },
  { id: "c2", group: "Technical", text: "Size and sculpt debt aloud in under two minutes", hint: "Debt Sizing module" },
  { id: "c3", group: "Technical", text: "Complete all nine Statement Drills without notes", hint: "Statement Drills" },
  { id: "c4", group: "Technical", text: "Walk through a DCF and WACC calculation", hint: "Valuation module" },
  { id: "c5", group: "Technical", text: "Explain leverage with the €100 asset example", hint: "Returns module" },
  { id: "c6", group: "Technical", text: "Run the battery-earlier case in the Fleet Case Lab and explain the chain", hint: "Fleet Case Lab" },
  { id: "c7", group: "Technical", text: "Score 80% or better on the quiz", hint: "Quiz" },
  { id: "c8", group: "Company", text: "Summarise Neot in thirty seconds, covering platforms and key figures", hint: "Neot Profile" },
  { id: "c9", group: "Company", text: "Describe the Danish financing and Neot e-motion", hint: "Neot Profile" },
  { id: "c10", group: "Story", text: "Rehearse the pitch aloud in English and in French", hint: "Story Builder" },
  { id: "c11", group: "Story", text: "Prepare three STAR stories covering the error found and the QC procedure plus working under pressure", hint: "Story Builder" },
  { id: "c12", group: "Story", text: "Choose three questions to ask the interviewers", hint: "Interview Day" },
  { id: "c13", group: "Logistics", text: "Test the Teams setup, from camera and microphone to display name", hint: "Interview Day" },
  { id: "c14", group: "Logistics", text: "Keep the CV and job description within reach alongside a notepad and calculator", hint: "Interview Day" },
  { id: "c15", group: "Logistics", text: "Complete one full mock interview with the timer", hint: "Mock Interview" }
];

/* Preparation Plan */
Guide.plan = [
  {
    day: "Monday",
    date: "2 November",
    theme: "Tier 1 Foundations",
    tasks: [
      { text: "Read the Neot Profile and Role Decoder", href: "#/neot" },
      { text: "Study Project Finance Architecture", href: "#/study/project-finance" },
      { text: "Study Debt Sizing and Structuring", href: "#/study/debt" },
      { text: "Explore the Fleet Case Lab presets", href: "#/practice/case" }
    ]
  },
  {
    day: "Tuesday",
    date: "3 November",
    theme: "Breadth and Story",
    tasks: [
      { text: "Modelling plus Accounting with all Statement Drills", href: "#/study/modelling" },
      { text: "Valuation and Returns modules followed by Investing", href: "#/study/valuation" },
      { text: "EV Economics and Asset Management", href: "#/study/mobility" },
      { text: "Write and rehearse every Story Builder answer", href: "#/story" },
      { text: "Full mock interview, then the quiz", href: "#/practice/mock" }
    ]
  },
  {
    day: "Wednesday",
    date: "4 November",
    theme: "Interview Day",
    tasks: [
      { text: "One flashcard pass on cards still under review", href: "#/practice/flashcards" },
      { text: "Rehearse the pitch twice aloud", href: "#/story" },
      { text: "Review the French lexicon highlights", href: "#/lexicon" },
      { text: "Run through the Interview Day checklist", href: "#/interview-day" }
    ]
  }
];

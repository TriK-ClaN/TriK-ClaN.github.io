/* Reference Content */
window.Guide = window.Guide || {};

/* Interview Details */
Guide.interview = {
  timeZone: "Europe/Paris",
  defaultDate: "2026-11-04",
  assumedTime: "09:00",
  start: "March 2027",
  duration: "Six Months",
  location: "Rue Saint-Lazare, Paris 9e",
  stages: [
    {
      title: "Teams Screening",
      meta: "30 Minutes · Recruiter or Team Member",
      focus: ["Motivation for Neot", "Resonance Experience in Brief", "French and English Fluency", "Possible Light Technicals"]
    },
    {
      title: "Technical and Fit Interview",
      meta: "Investment Director and Investment Officer",
      focus: ["Project Finance and Debt Sizing", "Accounting and Valuation", "Judgement on EV Fleets", "Fit With a Small Team"]
    }
  ]
};

/* Company Profile Sources */
Guide.sources = [
  { label: "Neot Capital Website", url: "https://www.neotcapital.com/en/" },
  { label: "Neot News Archive", url: "https://www.neotcapital.com/en/news/" },
  { label: "Neot Team Page", url: "https://www.neotcapital.com/en/our-team/" },
  { label: "Neot e-motion Launch Press Release (20 May 2025)", url: "https://www.mirova.com/sites/default/files/2025-05/pr-neot-e-motion-mirova-alba-bdt-neot.pdf" },
  { label: "Neot e-motion €125m MUFG Financing (18 December 2025)", url: "https://www.neotcapital.com/en/neot-e-motion-secures-e125-million-in-financing-from-mufg-to-accelerate-the-development-of-low-carbon-mobility-in-europe/" },
  { label: "NGM €170m Refinancing (4 November 2025)", url: "https://www.neotcapital.com/en/neot-green-mobility-refinances-e170-million-of-debt-with-mufg-la-banque-postale-and-lbpam/" }
];

/* Questions to Ask Interviewers */
Guide.askThem = [
  { q: "Neot e-motion's €125m MUFG facility combines a revolving credit facility with long-term project financing. How does the team decide when assets move into term debt?", why: "Shows command of Neot's latest financing and links directly to Resonance debt work." },
  { q: "How does the team underwrite battery residual value and the performance guarantees behind Battery-as-a-Service?", why: "Targets the hardest underwriting question in the business." },
  { q: "When an operator's public service contract is shorter than the asset life, how is the investment protected at expiry?", why: "Demonstrates contract and risk allocation thinking." },
  { q: "Which segments or geographies do you expect to drive Neot e-motion's pipeline over the next year?", why: "Signals strategic curiosity about the platform's growth." },
  { q: "What distinguishes an intern who truly helped the team after six months?", why: "Invites concrete expectations and shows ambition." }
];

/* French and English Lexicon */
Guide.lexicon = [
  { fr: "Société de projet (SPV)", en: "Special Purpose Vehicle", def: "Ring-fenced entity that owns the assets and borrows against their cash flows." },
  { fr: "Financement sans recours", en: "Non-Recourse Finance", def: "Lenders rely on project cash flows rather than on the sponsor's balance sheet." },
  { fr: "Tableau emplois-ressources", en: "Sources and Uses", def: "Table matching where funds go with who provides them, with the French order reversed." },
  { fr: "Flux disponibles pour le service de la dette", en: "CFADS", def: "Cash available to pay interest and principal." },
  { fr: "Ratio de couverture du service de la dette", en: "DSCR", def: "CFADS divided by interest plus principal for a period." },
  { fr: "Ratio de couverture sur la durée du prêt", en: "LLCR", def: "NPV of CFADS over the remaining loan life divided by outstanding debt." },
  { fr: "Service de la dette", en: "Debt Service", def: "Interest plus principal due in a period." },
  { fr: "Dimensionnement de la dette", en: "Debt Sizing", def: "Determining the maximum debt the binding constraint allows." },
  { fr: "Profil de remboursement sculpté", en: "Debt Sculpting", def: "Repayments shaped so debt service equals CFADS divided by a target DSCR." },
  { fr: "Cascade des flux", en: "Cash Flow Waterfall", def: "Contractual order of priority for payments." },
  { fr: "Compte de réserve du service de la dette", en: "DSRA", def: "Reserve covering debt service during temporary shortfalls." },
  { fr: "Blocage des distributions", en: "Lock-Up", def: "Distributions stop when a coverage ratio falls below a threshold." },
  { fr: "Cas de défaut", en: "Event of Default", def: "Breach allowing lenders to accelerate or enforce." },
  { fr: "Dette senior", en: "Senior Debt", def: "Debt with first priority on cash flows and security." },
  { fr: "Ratio d'endettement", en: "Gearing", def: "Debt as a share of total funding." },
  { fr: "Remboursement in fine", en: "Bullet Repayment", def: "Principal repaid in full at maturity." },
  { fr: "Différé d'amortissement", en: "Grace Period", def: "Initial period during which only interest is paid." },
  { fr: "Swap de taux", en: "Interest Rate Swap", def: "Exchange of floating-rate payments for fixed-rate payments." },
  { fr: "Ligne de crédit renouvelable", en: "Revolving Credit Facility", def: "Facility that can be drawn and repaid repeatedly up to a limit." },
  { fr: "Effet de levier", en: "Leverage Effect", def: "Amplification of equity returns through debt." },
  { fr: "Compte de résultat", en: "Income Statement", def: "Revenue and costs over a period, ending in net income." },
  { fr: "Bilan", en: "Balance Sheet", def: "Resources and claims at a point in time." },
  { fr: "Tableau des flux de trésorerie", en: "Cash Flow Statement", def: "Reconciliation of profit to cash across three activity types." },
  { fr: "Excédent brut d'exploitation (EBE)", en: "EBITDA", def: "Operating profit before depreciation, with slight definitional differences." },
  { fr: "Dotations aux amortissements", en: "Depreciation", def: "Non-cash allocation of an asset's cost over its life." },
  { fr: "Dépréciation", en: "Impairment", def: "Write-down of an asset below its carrying value." },
  { fr: "Besoin en fonds de roulement (BFR)", en: "Working Capital Requirement", def: "Receivables plus inventory minus payables." },
  { fr: "Dette nette", en: "Net Debt", def: "Financial debt minus cash." },
  { fr: "Valeur d'entreprise", en: "Enterprise Value", def: "Value of operations available to all capital providers." },
  { fr: "Valeur des fonds propres", en: "Equity Value", def: "Value attributable to shareholders." },
  { fr: "Coût moyen pondéré du capital (CMPC)", en: "WACC", def: "Blended cost of debt and equity." },
  { fr: "Valeur terminale", en: "Terminal Value", def: "Value of cash flows beyond the explicit forecast." },
  { fr: "Valeur résiduelle", en: "Residual Value", def: "Value of an asset at the end of its contract." },
  { fr: "Valeur actuelle nette (VAN)", en: "Net Present Value", def: "Discounted sum of all cash flows." },
  { fr: "Taux de rendement interne (TRI)", en: "Internal Rate of Return", def: "Discount rate that sets NPV to zero." },
  { fr: "TRI projet / TRI actionnaire", en: "Project IRR / Equity IRR", def: "Unlevered return versus return to shareholders." },
  { fr: "Multiple sur capitaux investis", en: "MOIC", def: "Total proceeds divided by equity invested." },
  { fr: "Comité d'investissement", en: "Investment Committee", def: "Body that approves or rejects investments." },
  { fr: "Audits d'acquisition", en: "Due Diligence", def: "Multi-workstream review of a target before investment." },
  { fr: "Répartition des risques", en: "Risk Allocation", def: "Contractual assignment of each risk to a party." },
  { fr: "Contrepartie", en: "Counterparty", def: "Party paying the project, such as an operator or authority." },
  { fr: "Catégorie investissement", en: "Investment Grade", def: "BBB− or above at S&P and Fitch, or Baa3 or above at Moody's." },
  { fr: "Coût total de possession", en: "Total Cost of Ownership", def: "Lifetime cost of an asset net of residual value." },
  { fr: "Infrastructure de recharge (IRVE)", en: "Charging Infrastructure", def: "Chargers and electrical works for electric vehicles." },
  { fr: "Raccordement au réseau", en: "Grid Connection", def: "Link between chargers and the electricity network." },
  { fr: "Taux d'utilisation", en: "Utilisation Rate", def: "Share of time or capacity an asset is used." },
  { fr: "Dégradation de la batterie", en: "Battery Degradation", def: "Gradual loss of battery capacity." },
  { fr: "Délégation de service public (DSP)", en: "Public Service Concession", def: "Contract entrusting a public service to an operator." },
  { fr: "Gestion d'actifs", en: "Asset Management", def: "Monitoring and optimising deployed assets." },
  { fr: "Analyse de sensibilité", en: "Sensitivity Analysis", def: "Changing one variable to isolate its effect." },
  { fr: "Référence circulaire", en: "Circular Reference", def: "Formula that depends on its own result." }
];

/* Story Builder Prompts */
Guide.story = [
  {
    id: "pitch",
    title: "Tell Me About Yourself",
    lang: "en",
    target: "90 to 120 Seconds",
    guidance: ["Present: EDHEC Master's and Resonance Advisory", "Past: Credit Experience at VIB", "Skills: Debt Sizing and Model Audit", "Future: Why Investing at Neot Comes Next"],
    starter: "Currently completing my Master's at EDHEC, I am interning at Resonance Advisory, where I work on project finance transactions…"
  },
  {
    id: "pitch-fr",
    title: "Présentez-vous",
    lang: "fr",
    target: "90 à 120 secondes",
    guidance: ["Même structure que la version anglaise", "Vocabulaire précis : dimensionnement de la dette et audit de modèle", "Conclure sur Neot et la mobilité durable"],
    starter: "Actuellement en Master à l'EDHEC, j'effectue un stage chez Resonance Advisory en financement de projets…"
  },
  {
    id: "why-neot",
    title: "Why Neot?",
    lang: "en",
    target: "60 Seconds",
    guidance: ["Specialist in Financing Electrified Transport", "Full Investment Cycle", "Momentum: Danish Deal and MUFG Facility", "Personal Link to the Energy Transition"],
    starter: "Neot sits exactly where my interests meet: structured finance applied to the electrification of transport…"
  },
  {
    id: "why-role",
    title: "Why Move From Advisory to Investing?",
    lang: "en",
    target: "60 Seconds",
    guidance: ["Advisory Proves a Financing Works", "Investing Asks Whether an Asset Deserves Equity", "Owning Recommendations After Closing"],
    starter: "Working at Resonance, my focus is proving that a financing structure holds together. What attracts me to Neot is…"
  },
  {
    id: "model-story",
    title: "Walk Me Through a Model You Built",
    lang: "en",
    target: "Two Minutes",
    guidance: ["Purpose: Decision Supported", "Structure: Inputs Through Returns", "Key Driver and Most Telling Sensitivity", "Confidentiality: Sector and Structure Only"],
    starter: "Most recently, I built the financing model for a project in…"
  },
  {
    id: "error-story",
    title: "Hardest Error You Have Found",
    lang: "en",
    target: "STAR in 90 Seconds",
    guidance: ["Situation: Model Under Review", "Action: How the Error Surfaced", "Result: Impact on Outputs", "Lesson: Process Change"],
    starter: "During a review of a model for…"
  },
  {
    id: "qc-story",
    title: "QC Procedure You Formalised",
    lang: "en",
    target: "STAR in 90 Seconds",
    guidance: ["Problem Behind the Procedure", "Structure of the Checks", "Adoption by the Team", "Time Saved or Errors Prevented"],
    starter: "Noticing that model reviews depended heavily on individual habits, I…"
  },
  {
    id: "weakness",
    title: "Strength and Weakness",
    lang: "en",
    target: "60 Seconds",
    guidance: ["Strength Backed by an Example", "Real but Manageable Weakness", "Concrete Steps Already Taken"],
    starter: "My strongest asset is rigour, which shows in…"
  }
];

/* Readiness Checklist */
Guide.checklist = [
  { id: "c1", group: "Technical", text: "Explain DSCR and LLCR fluently, with formulas.", hint: "Project Finance Module" },
  { id: "c2", group: "Technical", text: "Size and sculpt debt aloud in under two minutes.", hint: "Debt Sizing Module" },
  { id: "c3", group: "Technical", text: "Complete all eight Statement Drills without notes.", hint: "Statement Drills" },
  { id: "c4", group: "Technical", text: "Explain the battery-earlier case using the Fleet Case Lab.", hint: "Fleet Case Lab" },
  { id: "c5", group: "Technical", text: "Score 80% or better on the full quiz.", hint: "Quiz" },
  { id: "c6", group: "Company", text: "Summarise Neot in thirty seconds, including the MUFG facility.", hint: "Neot Profile" },
  { id: "c7", group: "Story", text: "Rehearse the pitch aloud in English and in French.", hint: "Story Builder" },
  { id: "c8", group: "Story", text: "Prepare the error and QC stories in STAR format.", hint: "Story Builder" },
  { id: "c9", group: "Logistics", text: "Test the Teams camera and microphone, then the display name.", hint: "Interview Day" },
  { id: "c10", group: "Logistics", text: "Keep the CV and job description within reach alongside a notepad.", hint: "Interview Day" }
];

/* Preparation Plan in Paris Time */
Guide.plan = [
  {
    day: "Monday",
    date: "2026-11-02",
    label: "2 November",
    theme: "Evening Foundations · About 1 Hour",
    tasks: [
      { text: "Neot Profile and Role Decoder", href: "#/neot" },
      { text: "Project Finance Essentials", href: "#/study/project-finance" },
      { text: "Debt Sizing and Sculpting", href: "#/study/debt" }
    ]
  },
  {
    day: "Tuesday",
    date: "2026-11-03",
    label: "3 November",
    theme: "Core Study and Story · About 3 Hours",
    tasks: [
      { text: "Modelling Plus Accounting and Valuation", href: "#/study/modelling" },
      { text: "Returns and Investing Modules", href: "#/study/returns" },
      { text: "EV Fleet Economics Module", href: "#/study/mobility" },
      { text: "Statement Drills and Fleet Case Lab", href: "#/practice/drills" },
      { text: "Story Builder Drafts", href: "#/story" },
      { text: "Full Quiz and One Mock Interview", href: "#/practice/mock" }
    ]
  },
  {
    day: "Wednesday",
    date: "2026-11-04",
    label: "4 November",
    theme: "Interview Day · Light Review",
    tasks: [
      { text: "Flashcards Still Under Review", href: "#/practice/flashcards" },
      { text: "Pitch Rehearsal in Both Languages", href: "#/story" },
      { text: "Interview Day Checklist", href: "#/interview-day" }
    ]
  }
];

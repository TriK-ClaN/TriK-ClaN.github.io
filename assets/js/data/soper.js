/* Soper Interview Content */
window.Guide = window.Guide || {};

/* Interview Facts */
Guide.soper = {
  defaultDate: "2026-11-23",
  defaultTime: "18:00",
  address: "12 bis place Henri Bergson, Paris 8e",

  /* Four Business Lines From the Offer */
  poles: [
    { icon: "bolt", title: "Activités Industrielles", text: "Operating companies Soper controls and builds itself: MGH Energy in synthetic fuels and Sunti in solar energy. Most of the intern's subsidiary support work sits here." },
    { icon: "trend", title: "Investissements Financiers", text: "Commitments to private equity funds and other financial assets. Interns help monitor the funds' portfolio companies and spot synergies or co-investments." },
    { icon: "building", title: "Investissements Immobiliers", text: "Real estate held for long-term value and income, which diversifies a portfolio otherwise concentrated in energy." },
    { icon: "layers", title: "Investissements Industriels", text: "Direct minority or majority stakes in industrial companies, sourced and analysed by the chargés d'affaires the intern supports." }
  ],

  /* Recent History, Newest First */
  timeline: [
    { date: "26 Oct 2026", title: "Janassim Resized", text: "MGH Energy announced a refocused Moroccan project of nearly 300,000 tonnes per year, down from about 500,000, with a larger e-kerosene share." },
    { date: "19 Oct 2026", title: "EU Innovation Fund", text: "Brussels selected the €1.1bn L'Ardoise e-fuels project among 77 large-scale projects sharing €3.4bn, sixteen of them French." },
    { date: "Feb 2026", title: "Strategic Industrial Site", text: "L'Ardoise in the Gard was confirmed as a France 2030 strategic industrial site after the Gard Rhodanien agglomeration chose MGH Energy." },
    { date: "Oct 2024", title: "Janassim Partnership", text: "MGH Energy Maroc teamed up with Holsatek to develop a 2.2 GW wind and solar e-fuels complex near Dakhla under Morocco's Offre Maroc." },
    { date: "Apr 2017", title: "Wind Exit", text: "Engie bought Soper's remaining 41% of La Compagnie du Vent, the wind pioneer Jean-Michel Germa founded in 1989, giving Soper fresh capital to redeploy." },
    { date: "2014", title: "Sunti Founded", text: "Sunti (Sunny Times For Industry) began in solar thermal before moving into photovoltaics and agrivoltaics from 2020." }
  ],

  /* Missions From the Offer, Decoded */
  missions: [
    ["Support aux filiales", "Business plans and financial analysis of projects for MGH Energy and Sunti, plus tender responses and subsidy applications.", "Resonance cash flow forecasts and debt sizing on renewable projects"],
    ["Sourcing et analyse", "Screening new investment or acquisition targets and writing a first view on their merits and risks.", "Valuation and corporate finance courses at ESCP and EDHEC"],
    ["Suivi des participations", "Valuations, performance tracking and reporting on the existing portfolio.", "VIB credit analysis of corporate financial statements"],
    ["Suivi des fonds de PE", "Industrial watch on portfolio companies of the funds Soper backs, looking for synergies and co-investments.", "Gameloft capital call reports and treasury monitoring"],
    ["Budget et contrôle", "Group budget preparation and budget-versus-actual control across the holding and its subsidiaries.", "Gameloft budget control and EDHEC management accounting"],
    ["Veille de marché", "Market watch on energy transition themes, notably e-fuels regulation and solar economics.", "Climate Finance and Sustainable Finance coursework"]
  ],

  /* Messages Worth Landing */
  messages: [
    { icon: "target", title: "Perfect Timing", text: "Second half of the gap year starts in March 2027, which matches the six-month internship Soper offers from January or March." },
    { icon: "calc", title: "Project Modelling Already", text: "Resonance work on renewable project cash flows and debt sizing translates directly into MGH Energy and Sunti business plans." },
    { icon: "users", title: "Breadth Over Silos", text: "Holding life mixes project finance with private equity and budgeting, and a profile spanning credit and treasury and project finance suits that variety." }
  ],

  /* Questions for the Interviewers */
  askThem: [
    { q: "Since the Innovation Fund selection, what does the path to final investment decision on L'Ardoise look like, and where would an intern contribute?", why: "Shows command of the latest news and points straight at real work." },
    { q: "How do you split time between the industrial subsidiaries and the financial or real estate portfolio?", why: "Clarifies the day-to-day while signalling interest in all four pôles." },
    { q: "When you monitor portfolio companies of the PE funds, what makes an opportunity worth a co-investment?", why: "Demonstrates understanding of the co-investment angle in the offer." },
    { q: "Ugo, having interned here yourself, what separated a good intern from a great one?", why: "Personal and warm, and invites concrete expectations." },
    { q: "How often do the trips to Montpellier happen, and what are they usually for?", why: "Practical, and shows genuine interest in the operating teams." }
  ],

  /* Sources */
  sources: [
    { label: "Soper Group Website", url: "https://www.soper.fr/" },
    { label: "MGH Energy Website", url: "https://www.mgh-energy.com/" },
    { label: "Sunti Website", url: "https://www.sunti.fr/" },
    { label: "EU Innovation Fund Large-Scale Results", url: "https://climate.ec.europa.eu/eu-action/eu-funding-climate-action/innovation-fund_en" },
    { label: "ReFuelEU Aviation Regulation 2023/2405", url: "https://eur-lex.europa.eu/eli/reg/2023/2405/oj" },
    { label: "RFNBO Delegated Act 2023/1184", url: "https://eur-lex.europa.eu/eli/reg_del/2023/1184/oj" }
  ]
};

/* Soper Team Added to the Shared Team Directory */
Guide.team.push(
  { group: "soperLeaders", name: "Jean-Michel Germa", role: "Founder and Président, Soper, MGH Energy and Sunti", photo: "assets/img/soper/jean-michel-germa.jpg" },
  { group: "soperLeaders", name: "Nicolas Hontebeyrie", role: "Directeur Général, Finance and Investments", photo: "assets/img/soper/nicolas-hontebeyrie.jpg" },
  { group: "soperLeaders", name: "Gilles Leandro", role: "Directeur Général Opérations, Soper, MGH Energy and Sunti", photo: "assets/img/soper/gilles-leandro.jpg" },
  { group: "soperInterviewers", name: "Laurent Espitalier-Noël", role: "Senior Associate, Chargé d'Affaires", photo: "assets/img/soper/laurent-espitalier-noel.jpg" },
  { group: "soperInterviewers", name: "Ugo Doat", role: "Junior Associate, Former Soper Intern", photo: "assets/img/soper/ugo-doat.jpg" }
);

Guide.teamGroups.push(
  { id: "soperInterviewers", label: "Likely Interviewers" },
  { id: "soperLeaders", label: "Group Leadership" }
);

/* Team Biographies */
Guide.soperBios = [
  { name: "Laurent Espitalier-Noël", text: "Senior Associate and one of the two chargés d'affaires named on the offer. Trained at Paris-Dauphine (Master 225, corporate finance) and previously worked at Anaxago, an investment platform for private equity and real estate. Expect sharp questions on valuation and deal screening." },
  { name: "Ugo Doat", text: "Junior Associate since April 2025, covering Sunti and MGH Energy. Held this very internship from January to June 2024, after a Dauphine Master 2 in energy, finance and carbon and a spell at France Stratégie. Expect questions on energy markets and on how quickly the intern can become useful." },
  { name: "Nicolas Hontebeyrie", text: "Directeur Général since October 2020 after joining as deputy in 2013, overseeing finance, investments and strategic development, and sitting on the boards of MGH Energy and Sunti. Earlier career at L14 Capital Partners and Crédit Agricole CIB, where he led the Alternative Energy Group. Sciences Po and Harvard MBA." },
  { name: "Gilles Leandro", text: "Directeur Général Opérations for Soper as well as MGH Energy and Sunti, based near Montpellier. Arts et Métiers engineer who runs the operating side of the industrial projects." },
  { name: "Jean-Michel Germa", text: "Founder and sole owner of Soper. Created La Compagnie du Vent in 1989, a pioneer of French wind power later sold to Engie, and now chairs Soper together with MGH Energy and Sunti. Member of the Académie de marine." }
];

/* Project Fact Tables */
Guide.soperProjects = [
  {
    name: "L'Ardoise e-Fuels Plant",
    pill: "Gard, France",
    rows: [
      ["Investment", "About €1.1bn, financed with roughly 70% debt and 30% equity"],
      ["Output From 2031", "70,000 t/yr of e-kerosene and 40,000 t/yr of e-methanol"],
      ["Climate Impact", "About 180,000 t of CO₂ avoided each year"],
      ["Site", "35 ha former Ugine steel site on the Rhône at Laudun-l'Ardoise"],
      ["Technology", "Genvia electrolysers, including a solid oxide (SOEC) pilot"],
      ["Jobs", "About 400 during construction and 200 permanent"],
      ["Support", "EU Innovation Fund selection, with Bpifrance and Banque des Territoires involved"]
    ]
  },
  {
    name: "Janassim Project",
    pill: "Dakhla, Morocco",
    rows: [
      ["Developer", "MGH Energy Maroc with Holsatek, under the Offre Maroc framework"],
      ["Power", "2.2 GW of wind and solar feeding electrolysis"],
      ["Output", "Nearly 300,000 t/yr after the October 2026 refocus, weighted toward e-kerosene"],
      ["Investment", "About 50bn MAD, roughly €4.5–5bn"],
      ["Timing", "Construction from 2027 and first fuel around 2030"],
      ["Jobs", "About 2,600"]
    ]
  }
];

/* Question Categories */
Guide.soperCategories = [
  { id: "fit", label: "Motivation and Fit" },
  { id: "cv", label: "Your Experience" },
  { id: "company", label: "Soper and Its Projects" },
  { id: "technical", label: "Technical" },
  { id: "numbers", label: "Quick Calculations" },
  { id: "fr", label: "En Français" }
];

/* Questions With Spoken Model Answers */
Guide.soperQuestions = [
  {
    id: "sq-pitch",
    cat: "fit",
    q: "Tell us about yourself.",
    answer: [
      "Currently, I am in my gap year from EDHEC's Grande École programme, where I follow the Master in Management and Financial Economics, after a Bachelor at ESCP across Turin, Paris and Berlin. Since September, I have been interning in project finance at Resonance Advisory, modelling renewable and infrastructure projects: cash flow forecasts, debt sizing, scenarios and sensitivities.",
      "Earlier internships gave me two complementary angles. Working at VIB in Hanoi, I analysed corporate financial statements for credit decisions, and at Gameloft in Ho Chi Minh City, I worked on treasury, budget control and fund-call reporting for the Vietnamese studios.",
      "Starting in March, for the second half of my gap year, I want a role with more breadth on the investor side. Soper attracts me because it combines exactly that: project business plans for MGH Energy and Sunti, direct and fund investments, and group budgeting, all inside an energy transition story I genuinely care about."
    ],
    points: ["Gap Year and Schools", "Resonance Modelling", "VIB Credit and Gameloft Treasury", "Bridge to Soper's Breadth"],
    link: "#/soper"
  },
  {
    id: "sq-why-soper",
    cat: "fit",
    q: "Why Soper?",
    answer: [
      "Three reasons. First, the projects: MGH Energy is building one of the first industrial e-fuels plants in France, and having L'Ardoise selected by the EU Innovation Fund last month shows it is moving from idea to financing. Working on that business plan at this stage would be exceptional training.",
      "Second, the breadth. Very few roles let an intern touch project business plans, acquisition screening, PE fund monitoring and group budgeting in the same six months. Coming from project finance advisory, that is precisely the widening I am looking for.",
      "Third, the culture of a family holding: long-term capital, a founder who built La Compagnie du Vent from scratch, and a small team of around fifty where an intern's work is actually used."
    ],
    points: ["MGH Energy and L'Ardoise", "Breadth of the Role", "Long-Term Family Capital", "Small Team, Real Responsibility"],
    link: "#/soper/group"
  },
  {
    id: "sq-holding-vs-fund",
    cat: "fit",
    q: "What is the difference between a family holding like Soper and a private equity fund?",
    answer: [
      "Capital origin and horizon are the core differences. Funds raise money from limited partners for roughly ten years, so they must buy, improve and sell within that window, and their performance is judged on IRR. Soper invests the founder's own capital, which means no forced exit and the freedom to hold assets for decades.",
      "Consequently, a holding can do things a fund rarely can: incubate companies from zero like MGH Energy and Sunti, accept long development phases before any revenue, and mix operating businesses with financial, real estate and industrial investments. Soper also invests in PE funds itself, so it sits on both sides of that relationship."
    ],
    points: ["Own Capital Versus LP Money", "No Forced Exit", "Incubation of Operating Companies", "LP in Funds as Well"],
    link: "#/soper/primer"
  },
  {
    id: "sq-weakness",
    cat: "fit",
    q: "What is your main weakness?",
    answer: [
      "Early on, I tended to spend too long perfecting a model before sharing it. Working at Resonance, I learned that a reviewer prefers a clean first version early, with assumptions flagged, rather than a perfect version late.",
      "Now I share a structured draft quickly, list the open points explicitly and iterate. Small teams juggling several subjects need that habit even more."
    ],
    points: ["Genuine but Manageable", "Concrete Correction", "Link to Team Needs"]
  },
  {
    id: "sq-resonance",
    cat: "cv",
    q: "Walk us through what you do at Resonance Advisory.",
    answer: [
      "Resonance advises sponsors on financing renewable and infrastructure projects. Most of my work sits in the financial model: building cash flow forecasts from technical and contractual inputs, sizing debt against a target DSCR, then running scenarios and sensitivities that lenders ask for.",
      "Beyond the model, I write project and risk assessments covering site characteristics, technology, key risks and PPAs. Both skills transfer directly to Soper: an MGH Energy or Sunti business plan is a project model, and a subsidy or tender file needs exactly that kind of structured risk analysis."
    ],
    points: ["Cash Flow Forecasts", "Debt Sizing on DSCR", "Scenarios and Sensitivities", "Risk Assessment and PPAs", "Direct Transfer to Subsidiaries"],
    link: "#/soper/formulas"
  },
  {
    id: "sq-gameloft",
    cat: "cv",
    q: "What did you take from Gameloft that is relevant here?",
    answer: [
      "Gameloft taught me corporate finance from the inside. Specifically, I prepared fund-call reports and bank balance reports for the Vietnamese studios and reviewed the fund calls sent to headquarters, which is treasury management between a parent and its subsidiaries.",
      "Process work came too, as I helped improve accounting and budget control processes. Soper's group budgeting and control mission is the same logic at holding level: consolidating subsidiary budgets, then explaining the variances between budget and actual."
    ],
    points: ["Parent and Subsidiary Treasury", "Fund Calls", "Budget Control", "Link to Group Budgeting"],
    link: "#/soper/formulas"
  },
  {
    id: "sq-vib",
    cat: "cv",
    q: "How does your credit experience at VIB help in an investment role?",
    answer: [
      "Credit analysis trains a downside-first reflex. Working at VIB, I assessed corporate clients' solvency, risk exposure and repayment capacity, which means asking what happens when things go wrong before asking how much can be earned.",
      "Investors need that same discipline, especially when screening acquisition targets or reviewing a portfolio company's performance: cash generation, leverage and covenant headroom tell you quickly whether a business can carry its plan."
    ],
    points: ["Downside First", "Solvency and Repayment Capacity", "Applied to Screening and Monitoring"]
  },
  {
    id: "sq-pitch-soper",
    cat: "company",
    q: "What do you know about Soper?",
    answer: [
      "Soper is the family holding of Jean-Michel Germa, who founded La Compagnie du Vent in 1989 and later sold it to Engie. Today it manages about €300 million with around fifty people, organised in four pôles: industrial activities, financial investments, real estate and industrial investments.",
      "Industrial activities are the heart of the group. MGH Energy develops synthetic fuels, notably the €1.1 billion L'Ardoise plant in the Gard, selected by the EU Innovation Fund in October, and the Janassim project in Morocco. Sunti develops, finances, builds and operates solar plants, including agrivoltaics and industrial self-consumption."
    ],
    points: ["Founder and Origin", "€300m and Fifty People", "Four Pôles", "MGH Energy and Sunti"],
    link: "#/soper/group"
  },
  {
    id: "sq-efuels",
    cat: "company",
    q: "Explain how MGH Energy's e-fuels are produced.",
    answer: [
      "Everything starts with low-carbon electricity, which powers electrolysers that split water into hydrogen and oxygen. Separately, CO₂ is captured, ideally from biogenic sources. Hydrogen and CO₂ are then combined in a synthesis reactor to make methanol.",
      "Methanol can be sold as e-methanol for shipping, or upgraded through a methanol-to-jet process into e-kerosene for aviation. L'Ardoise will produce about 70,000 tonnes of e-kerosene and 40,000 tonnes of e-methanol per year this way from 2031."
    ],
    points: ["Electrolysis for Hydrogen", "CO₂ Capture", "Methanol Synthesis", "Methanol-to-Jet", "L'Ardoise Volumes"],
    link: "#/soper/primer"
  },
  {
    id: "sq-demand",
    cat: "company",
    q: "Who will buy e-kerosene, and why would they pay more than for fossil jet fuel?",
    answer: [
      "Regulation creates the demand. ReFuelEU Aviation obliges fuel suppliers at EU airports to blend sustainable aviation fuel, rising from 2% in 2025 to 6% in 2030 and 70% in 2050, with a synthetic sub-mandate starting at 1.2% on average in 2030 and 2031 and reaching 35% in 2050. Suppliers who fall short face penalties of at least twice the price gap.",
      "Buyers therefore sign long-term offtake agreements with airlines or fuel suppliers. Securing those contracts for a project like L'Ardoise is what turns a regulatory market into bankable revenue, which lenders require before financial close."
    ],
    points: ["ReFuelEU Mandates", "Synthetic Sub-Mandate", "Penalties", "Offtake Agreements and Bankability"],
    link: "#/soper/primer"
  },
  {
    id: "sq-risks",
    cat: "company",
    q: "What are the main risks of a project like L'Ardoise?",
    answer: [
      "Cost of power comes first, because electricity is the largest operating cost of an e-fuels plant; securing a long-term low-carbon PPA is critical. Technology and scale-up risk come next, since electrolysis and methanol-to-jet at this scale are recent, so construction overruns and ramp-up delays are real possibilities.",
      "Commercial and regulatory risks close the list: offtake prices must cover a green premium, and the RFNBO rules on additionality and correlation decide whether the fuel counts toward mandates. Mitigants include the Innovation Fund grant, public co-financing, long-term offtakes and experienced EPC contractors."
    ],
    points: ["Power Price", "Technology and Construction", "Offtake and Green Premium", "RFNBO Compliance", "Mitigants"],
    link: "#/soper/primer"
  },
  {
    id: "sq-janassim",
    cat: "company",
    q: "Why do you think the Janassim project was resized in October?",
    answer: [
      "Based on the announcement, MGH Energy refocused Janassim to nearly 300,000 tonnes a year from about 500,000 and shifted the mix toward e-kerosene. Smaller first phases usually lower capital needs and execution risk, which makes financing more realistic in a market where many hydrogen projects have stalled.",
      "Weighting toward e-kerosene also follows value: aviation has binding EU synthetic mandates, so e-kerosene offers clearer demand than other products. Phasing like this keeps the option to expand once the first plant proves the economics."
    ],
    points: ["Lower Capital and Execution Risk", "Financing Realism", "Demand Is Strongest in Aviation", "Option to Expand"],
    note: "Present this as a reasoned view rather than inside knowledge, and invite their perspective."
  },
  {
    id: "sq-sunti",
    cat: "company",
    q: "What does Sunti do, and what is agrivoltaics?",
    answer: [
      "Sunti develops, finances, builds and operates solar projects, and it can bring equity financing itself. Sunti's focus has moved from solar thermal to photovoltaics, with two niches: industrial self-consumption, where a factory uses the power produced on site, and agrivoltaics.",
      "Agrivoltaics means installing panels above crops so that both share the same land; panels can protect plants from heat and hail while generating power. French law since 2023 requires the agricultural activity to remain the main one, which is why the partnership with Sun'Agri and its steerable panels matters."
    ],
    points: ["Develop to Operate", "Self-Consumption", "Agrivoltaics Defined", "Agriculture Remains Primary", "Sun'Agri"],
    link: "#/soper/primer"
  },
  {
    id: "sq-bp",
    cat: "technical",
    q: "How would you build the business plan of a solar project for Sunti?",
    answer: [
      "Begin with inputs: installed capacity, yield in kWh per kWp, degradation, capex, opex and the revenue contract, either a PPA price or a self-consumption tariff. Production equals capacity times yield, revenue equals production times price, and EBITDA follows after opex.",
      "Next come tax and depreciation, then the financing: senior debt sized on a DSCR target, typically around 1.2 to 1.3 times for contracted solar. Outputs are project IRR, equity IRR and NPV, plus sensitivities on yield, price and capex, because those three drive almost all the value."
    ],
    points: ["Capacity Times Yield", "Revenue Contract", "EBITDA to CFADS", "DSCR Debt Sizing", "IRR and Sensitivities"],
    link: "#/soper/formulas"
  },
  {
    id: "sq-valuation",
    cat: "technical",
    q: "How would you value a company Soper is considering buying?",
    answer: [
      "Combining two methods gives a cross-check. Discounted cash flow projects free cash flows, discounts them at the WACC and adds a terminal value, which captures the company's specific plan. Market multiples, usually EV over EBITDA from comparable listed companies or recent transactions, show what investors actually pay.",
      "Both give an enterprise value, so I then bridge to equity value by subtracting net debt. Finally, the investment case matters more than the number: what Soper brings to the company, the synergies with existing holdings and the exit or hold strategy."
    ],
    points: ["DCF With Terminal Value", "Trading and Transaction Multiples", "EV to Equity Bridge", "Strategic Fit"],
    link: "#/soper/formulas"
  },
  {
    id: "sq-pe-metrics",
    cat: "technical",
    q: "How do you measure the performance of a private equity fund Soper has invested in?",
    answer: [
      "Three multiples and one rate. DPI is distributions over paid-in capital, the cash actually returned. RVPI is the remaining NAV over paid-in capital, the value still held. TVPI adds both, giving total value per euro invested. Net IRR then accounts for timing.",
      "Early in a fund's life, IRR is usually negative because fees and capital calls come before any exits, the J-curve, so young funds are judged against peers of the same vintage. Holdings also track uncalled commitments for treasury planning, because capital calls arrive at short notice."
    ],
    points: ["DPI", "RVPI", "TVPI", "Net IRR", "J-Curve and Vintage", "Uncalled Commitments"],
    link: "#/soper/formulas"
  },
  {
    id: "sq-irr-npv",
    cat: "technical",
    q: "What is the difference between NPV and IRR, and when can they disagree?",
    answer: [
      "NPV is the value created in euros today, discounting future cash flows at the required return. IRR is the discount rate at which NPV equals zero, so it expresses return as a percentage.",
      "Disagreements arise when comparing projects of different sizes or timing: a small project can have a higher IRR yet create less value than a large one. IRR also assumes reinvestment at the IRR itself and can give several answers when cash flows change sign more than once. Capital-heavy projects like L'Ardoise make NPV the cleaner decision rule."
    ],
    points: ["NPV in Euros", "IRR as Break-Even Rate", "Scale and Timing Conflicts", "Reinvestment Assumption", "Multiple IRRs"],
    link: "#/soper/formulas"
  },
  {
    id: "sq-subsidy",
    cat: "technical",
    q: "What goes into a strong subsidy application, such as the Innovation Fund?",
    answer: [
      "Evaluators score a handful of criteria: greenhouse gas emissions avoided, degree of innovation, project maturity, scalability and cost efficiency, meaning grant euros per tonne of CO₂ avoided. Strong files prove maturity with permits, technology partners, offtake discussions and a credible financing plan.",
      "Financially, the key is showing the funding gap: the grant should make a project bankable that would not happen otherwise, without over-subsidising it. Doing so requires a clean business plan with and without the grant."
    ],
    points: ["Emissions Avoided", "Innovation and Maturity", "Cost per Tonne", "Funding Gap"],
    link: "#/soper/primer"
  },
  {
    id: "sq-budget",
    cat: "technical",
    q: "Halfway through the year, a subsidiary is 15% over its opex budget. How do you analyse it?",
    answer: [
      "First, split the variance into volume and price: are we doing more activity than planned, or paying more per unit? Then separate one-off items, such as a study or a recruitment fee, from recurring drift.",
      "Next, check timing: a cost planned for the second half may simply have arrived early. Finally, reforecast the full year and propose actions, so management sees the expected landing point rather than just a gap."
    ],
    points: ["Volume Versus Price", "One-Off Versus Recurring", "Timing Effects", "Full-Year Reforecast"],
    link: "#/soper/formulas"
  },
  {
    id: "sq-calc-tvpi",
    cat: "numbers",
    q: "Soper committed €10m to a fund. €8m has been called, €4m distributed, and the NAV is €9m. What are DPI, RVPI and TVPI?",
    answer: [
      "DPI is distributions over paid-in, so €4m over €8m, which is 0.5 times. RVPI is NAV over paid-in, €9m over €8m, which is about 1.13 times.",
      "TVPI is the sum, about 1.63 times. Uncalled commitment is still €2m, which Soper must keep available for future capital calls."
    ],
    points: ["DPI 0.5x", "RVPI 1.13x", "TVPI 1.63x", "€2m Uncalled"],
    link: "#/soper/formulas"
  },
  {
    id: "sq-calc-solar",
    cat: "numbers",
    q: "Picture a 5 MWp solar plant near Montpellier yielding 1,400 kWh per kWp. Selling at a €70/MWh PPA, what is annual revenue?",
    answer: [
      "Production is 5,000 kWp times 1,400 kWh, so 7,000 MWh per year. Revenue is 7,000 MWh times €70, which is €490,000 per year.",
      "Capacity factor follows too: 7,000 MWh divided by 5 MW times 8,760 hours gives about 16%, a typical figure for southern France."
    ],
    points: ["7,000 MWh", "€490k Revenue", "About 16% Capacity Factor"],
    link: "#/soper/formulas"
  },
  {
    id: "sq-calc-gearing",
    cat: "numbers",
    q: "L'Ardoise costs about €1.1bn with 70% debt. How much equity is needed, and why does gearing matter?",
    answer: [
      "Equity is 30% of €1.1bn, about €330m, shared between the sponsors and public co-investors, with debt of about €770m.",
      "Higher gearing raises equity returns when the project performs, because debt is cheaper than equity, yet it increases the debt service the project must cover. Lenders cap gearing through DSCR constraints, so the riskier and newer the technology, the lower the debt they will accept."
    ],
    points: ["€330m Equity", "€770m Debt", "Leverage Effect", "DSCR Limits Gearing"],
    link: "#/soper/formulas"
  },
  {
    id: "sq-fr-presentation",
    cat: "fr",
    q: "Présentez-vous en deux minutes.",
    answer: [
      "Actuellement en année de césure dans le Programme Grande École de l'EDHEC, où je suis le Master in Management and Financial Economics, j'ai auparavant obtenu mon Bachelor à l'ESCP entre Turin, Paris et Berlin. Depuis septembre, je suis stagiaire en financement de projets chez Resonance Advisory : modélisation de projets d'énergies renouvelables et d'infrastructure, prévisions de trésorerie, dimensionnement de la dette et analyses de sensibilité.",
      "Mes expériences précédentes m'ont apporté deux angles complémentaires : l'analyse crédit chez VIB à Hanoï, puis la trésorerie et le contrôle budgétaire chez Gameloft à Hô Chi Minh-Ville, notamment les appels de fonds entre les studios et le siège.",
      "Pour la seconde partie de ma césure, à partir de mars, je recherche un rôle plus large côté investisseur. Soper réunit exactement cela : les business plans de MGH Energy et de Sunti, les investissements directs et en fonds, et le budget du groupe, au service d'une transition énergétique qui me tient à cœur."
    ],
    points: ["Césure et Écoles", "Resonance", "VIB et Gameloft", "Lien Avec Soper"],
    lang: "fr"
  },
  {
    id: "sq-fr-pourquoi",
    cat: "fr",
    q: "Pourquoi Soper plutôt qu'un fonds de private equity ?",
    answer: [
      "Soper investit son propre capital avec un horizon long, sans obligation de sortie, ce qui lui permet de créer des entreprises comme MGH Energy et Sunti et d'accompagner des projets industriels sur une décennie. Un fonds doit acheter, transformer et revendre en cinq à sept ans.",
      "Pour une stagiaire, c'est aussi une diversité rare : business plans de projets, analyse d'acquisitions, suivi de fonds et contrôle budgétaire dans la même mission. Enfin, voir L'Ardoise passer de la sélection par l'Innovation Fund vers le financement est une occasion unique."
    ],
    points: ["Capital Propre et Horizon Long", "Incubation", "Diversité des Missions", "L'Ardoise"],
    lang: "fr"
  },
  {
    id: "sq-fr-tri",
    cat: "fr",
    q: "Quelle est la différence entre la VAN et le TRI ?",
    answer: [
      "La VAN mesure la valeur créée en euros aujourd'hui, en actualisant les flux futurs au taux de rendement exigé. Le TRI est le taux d'actualisation qui annule la VAN ; il exprime donc la rentabilité en pourcentage.",
      "Les deux critères peuvent diverger lorsque l'on compare des projets de tailles ou de calendriers différents. Pour un projet très capitalistique comme L'Ardoise, la VAN reste le critère de décision le plus fiable."
    ],
    points: ["VAN en Euros", "TRI Annule la VAN", "Divergences Taille et Calendrier"],
    lang: "fr"
  },
  {
    id: "sq-fr-efuel",
    cat: "fr",
    q: "Expliquez simplement ce qu'est un e-carburant.",
    answer: [
      "Produit à partir d'électricité bas carbone, un e-carburant combine de l'hydrogène issu de l'électrolyse de l'eau avec du CO₂ capté. La synthèse donne du méthanol, vendu tel quel au transport maritime ou transformé en e-kérosène pour l'aviation.",
      "Son intérêt : réduire fortement les émissions de secteurs difficiles à électrifier, tout en restant compatible avec les moteurs et infrastructures existants. Le règlement ReFuelEU Aviation impose d'ailleurs une part minimale de carburants de synthèse dès 2030."
    ],
    points: ["Électrolyse", "CO₂ Capté", "Méthanol puis e-Kérosène", "ReFuelEU"],
    lang: "fr"
  }
];

/* Primer Concepts */
Guide.soperPrimer = {
  chain: [
    { icon: "sun", title: "Low-Carbon Power", text: "Solar, wind or grid power under a long-term PPA, the largest cost line" },
    { icon: "bolt", title: "Electrolysis", text: "Water split into hydrogen and oxygen in alkaline, PEM or SOEC units" },
    { icon: "layers", title: "CO₂ Capture", text: "Biogenic or industrial CO₂, or direct air capture in the long run" },
    { icon: "flask", title: "Methanol Synthesis", text: "CO₂ and hydrogen react over a catalyst into e-methanol" },
    { icon: "route", title: "Methanol-to-Jet", text: "Methanol upgraded into e-kerosene for aviation" }
  ],

  /* ReFuelEU Aviation Minimum Shares */
  refuel: [
    ["2025", "2%", "Not Applicable"],
    ["2030", "6%", "1.2% Average Over 2030–31"],
    ["2035", "20%", "5%"],
    ["2040", "34%", "10%"],
    ["2045", "42%", "15%"],
    ["2050", "70%", "35%"]
  ],

  concepts: [
    { icon: "check", title: "RFNBO", text: "Renewable fuel of non-biological origin. EU rules require additionality, meaning new renewable capacity, plus temporal and geographic correlation between power and electrolysis, and at least 70% lifecycle emissions savings against fossil fuel." },
    { icon: "globe", title: "FuelEU Maritime", text: "Maritime counterpart of ReFuelEU. Ships calling at EU ports must cut the greenhouse gas intensity of their energy by 2% in 2025, 6% in 2030 and 80% in 2050, and RFNBOs such as e-methanol count double until 2033." },
    { icon: "scale", title: "Green Premium", text: "Price gap between an e-fuel and its fossil equivalent. E-kerosene costs several times fossil jet fuel today, so mandates and penalties are what make buyers pay." },
    { icon: "sun", title: "Agrivoltaics", text: "Solar panels above farmland where agriculture must stay the main activity under French law since 2023. Panels can shield crops from heat and hail while producing power." },
    { icon: "building", title: "Self-Consumption", text: "Industrial site consuming power produced on its own roof or land. Value comes from avoided grid purchases, so the self-consumption rate drives the business case." },
    { icon: "pen", title: "PPA", text: "Power purchase agreement fixing price and volume for 10 to 20 years. Corporate PPAs underpin both Sunti projects and the electricity supply of an e-fuels plant." }
  ],

  /* Holding and Fund Mechanics */
  holding: [
    { icon: "users", title: "Commitment and Capital Calls", text: "Soper commits an amount to a fund, which calls it gradually over the investment period. Uncalled capital must stay available, so treasury planning matters." },
    { icon: "trend", title: "J-Curve", text: "Fees and early write-downs push returns negative before exits lift them. Young funds are therefore compared with peers of the same vintage year." },
    { icon: "target", title: "Co-Investment", text: "Investing directly alongside a fund in one of its deals, usually with low or no fees. Holdings use it to build exposure to companies they know well." },
    { icon: "layers", title: "Holding Structure", text: "Parent company owning stakes in subsidiaries. Dividends move up to the holding and capital moves down, often benefiting from the French parent-subsidiary regime." }
  ],

  /* Public Funding Tools */
  funding: [
    { title: "EU Innovation Fund", text: "Grants from EU carbon market revenues for first-of-a-kind clean technology, covering up to 60% of relevant costs." },
    { title: "France 2030", text: "National investment plan backing decarbonisation and industrial sovereignty, including strategic industrial site status that speeds up permitting." },
    { title: "Bpifrance", text: "French public investment bank providing loans, guarantees and equity to innovative companies and projects." },
    { title: "Banque des Territoires", text: "Caisse des Dépôts arm that co-invests equity in local energy and infrastructure projects." }
  ],

  /* Key French Terms */
  lexicon: [
    ["Chargé d'affaires", "Investment Associate"],
    ["Pôle", "Business Line or Division"],
    ["Filiale", "Subsidiary"],
    ["Participation", "Equity Stake or Portfolio Company"],
    ["Appel à projets", "Call for Projects or Tender"],
    ["Dossier de subvention", "Subsidy Application"],
    ["Appel de fonds", "Capital Call"],
    ["Engagement", "Commitment"],
    ["Valeur liquidative", "Net Asset Value"],
    ["Contrôle de gestion", "Management Control"],
    ["Écart budgétaire", "Budget Variance"],
    ["Veille", "Market Watch"],
    ["Bouclage financier", "Financial Close"],
    ["Électrolyseur", "Electrolyser"],
    ["Contrat d'achat d'électricité", "Power Purchase Agreement"],
    ["Autoconsommation", "Self-Consumption"]
  ]
};

/* Formula Sheet Groups */
Guide.soperSheetGroups = [
  { id: "project", label: "Project Business Plans", icon: "calc" },
  { id: "energy", label: "Energy and e-Fuels", icon: "bolt" },
  { id: "valuation", label: "Valuation", icon: "trend" },
  { id: "funds", label: "Private Equity Funds", icon: "users" },
  { id: "control", label: "Budget and Control", icon: "scale" }
];

/* Formula Sheet Entries */
Guide.soperFormulas = [
  {
    id: "s-npv",
    group: "project",
    name: "Net Present Value",
    tex: String.raw`\text{NPV} = -I_0 + \sum_{t=1}^{n} \dfrac{CF_t}{(1+r)^t}`,
    note: "Positive NPV means the project earns more than the required return, which is the core test for any MGH Energy or Sunti investment.",
    example: String.raw`\begin{gathered} -100 + \dfrac{60}{1.08} + \dfrac{60}{1.08^2} \\ = \text{€}7.0\text{m} \end{gathered}`
  },
  {
    id: "s-irr",
    group: "project",
    name: "Internal Rate of Return",
    tex: String.raw`\sum_{t=0}^{n} \dfrac{CF_t}{(1+\text{IRR})^t} = 0`,
    note: "Discount rate that sets NPV to zero. Project IRR uses unlevered cash flows, while equity IRR uses cash flows after debt service."
  },
  {
    id: "s-cfads",
    group: "project",
    name: "Cash Flow Available for Debt Service",
    tex: String.raw`\begin{gathered} \text{CFADS} = \text{EBITDA} - \text{Tax} \\ - \Delta\text{WC} - \text{Maintenance Capex} \end{gathered}`,
    note: "Cash that remains to pay lenders. Every debt sizing exercise at Resonance starts here."
  },
  {
    id: "s-dscr",
    group: "project",
    name: "Debt Service Coverage Ratio",
    tex: String.raw`\text{DSCR}_t = \dfrac{\text{CFADS}_t}{\text{Interest}_t + \text{Principal}_t}`,
    note: "Lenders typically ask for 1.2x to 1.3x on contracted solar and more on first-of-a-kind technology such as e-fuels.",
    example: String.raw`\dfrac{6.5}{5.0} = 1.30\text{x}`
  },
  {
    id: "s-debt-size",
    group: "project",
    name: "Debt Sized on DSCR",
    tex: String.raw`\text{Max Debt Service}_t = \dfrac{\text{CFADS}_t}{\text{Target DSCR}}`,
    note: "Debt capacity is the present value of the maximum debt service at the loan's interest rate, capped by the gearing limit."
  },
  {
    id: "s-gearing",
    group: "project",
    name: "Gearing",
    tex: String.raw`\text{Gearing} = \dfrac{\text{Debt}}{\text{Debt} + \text{Equity}}`,
    note: "L'Ardoise is planned at roughly 70% debt, so equity of about 30% must come from the sponsors and public co-investors.",
    example: String.raw`\begin{gathered} 30\% \times \text{€}1.1\text{bn} \\ \approx \text{€}330\text{m Equity} \end{gathered}`
  },
  {
    id: "s-annuity",
    group: "project",
    name: "Annuity Payment",
    tex: String.raw`\text{PMT} = D \cdot \dfrac{r}{1-(1+r)^{-n}}`,
    note: "Constant debt service on a loan of amount D, rate r and n periods, equivalent to PMT in Excel."
  },
  {
    id: "s-production",
    group: "energy",
    name: "Solar Production",
    tex: String.raw`E = P_{\text{Peak}} \times \text{Specific Yield}`,
    note: "Southern France yields around 1,300 to 1,500 kWh per kWp each year, which is why Sunti is based around Montpellier.",
    example: String.raw`\begin{gathered} 5{,}000\ \text{kWp} \times 1{,}400 \\ = 7{,}000\ \text{MWh} \end{gathered}`
  },
  {
    id: "s-capacity",
    group: "energy",
    name: "Capacity Factor",
    tex: String.raw`\text{CF} = \dfrac{E_{\text{Annual}}}{P \times 8{,}760\ \text{h}}`,
    note: "Solar runs at roughly 13% to 17% in France and onshore wind at about 25%. Electrolysers need high load factors to dilute their capex.",
    example: String.raw`\dfrac{7{,}000}{5 \times 8{,}760} \approx 16\%`
  },
  {
    id: "s-lcoe",
    group: "energy",
    name: "Levelised Cost of Energy",
    tex: String.raw`\text{LCOE} = \dfrac{\sum_t \frac{\text{Capex}_t + \text{Opex}_t}{(1+r)^t}}{\sum_t \frac{E_t}{(1+r)^t}}`,
    note: "Lifetime cost per MWh produced. Comparing LCOE with the PPA price shows whether a solar project creates value."
  },
  {
    id: "s-selfcons",
    group: "energy",
    name: "Self-Consumption Rate",
    tex: String.raw`\text{Rate} = \dfrac{\text{Energy Consumed on Site}}{\text{Energy Produced}}`,
    note: "Higher rates mean more avoided grid purchases. Self-sufficiency divides the same numerator by the site's total consumption instead."
  },
  {
    id: "s-electrolysis",
    group: "energy",
    name: "Water Electrolysis",
    tex: String.raw`2\,\text{H}_2\text{O} \rightarrow 2\,\text{H}_2 + \text{O}_2`,
    note: "Producing one kilogram of hydrogen takes roughly 50 to 55 kWh of electricity, so power price drives the cost of every e-fuel."
  },
  {
    id: "s-methanol",
    group: "energy",
    name: "Methanol Synthesis",
    tex: String.raw`\text{CO}_2 + 3\,\text{H}_2 \rightarrow \text{CH}_3\text{OH} + \text{H}_2\text{O}`,
    note: "Each tonne of methanol needs about 1.37 t of CO₂ and 0.19 t of hydrogen. Methanol-to-jet then turns roughly 2.3 t of methanol into 1 t of hydrocarbons in theory.",
    example: String.raw`\begin{gathered} \dfrac{44}{32} \approx 1.37\ \text{t CO}_2 \\ \dfrac{6}{32} \approx 0.19\ \text{t H}_2 \end{gathered}`
  },
  {
    id: "s-ev",
    group: "valuation",
    name: "Enterprise to Equity Value",
    tex: String.raw`\text{Equity Value} = \text{EV} - \text{Net Debt}`,
    note: "Net debt equals financial debt minus cash, and minority interests or provisions may also enter the bridge."
  },
  {
    id: "s-fcf",
    group: "valuation",
    name: "Free Cash Flow to the Firm",
    tex: String.raw`\begin{gathered} \text{FCFF} = \text{EBIT}(1-t) + \text{D\&A} \\ - \text{Capex} - \Delta\text{WC} \end{gathered}`,
    note: "Cash generated before any financing, discounted at the WACC in a DCF."
  },
  {
    id: "s-wacc",
    group: "valuation",
    name: "Weighted Average Cost of Capital",
    tex: String.raw`\text{WACC} = \dfrac{E}{D+E} r_E + \dfrac{D}{D+E} r_D (1-t)`,
    note: "Debt is cheaper after tax, which is why moderate leverage lowers the cost of capital."
  },
  {
    id: "s-tv",
    group: "valuation",
    name: "Gordon Terminal Value",
    tex: String.raw`\text{TV}_n = \dfrac{\text{FCFF}_{n+1}}{\text{WACC} - g}`,
    note: "Often more than half of a DCF's value, so test it against an exit multiple.",
    example: String.raw`\dfrac{10.2}{8\% - 2\%} = \text{€}170\text{m}`
  },
  {
    id: "s-multiple",
    group: "valuation",
    name: "EV / EBITDA Multiple",
    tex: String.raw`\text{EV} = \text{EBITDA} \times \text{Peer Multiple}`,
    note: "Trading multiples come from listed peers and transaction multiples from recent deals, which usually include a control premium."
  },
  {
    id: "s-moic",
    group: "valuation",
    name: "Money Multiple",
    tex: String.raw`\text{MOIC} = \dfrac{\text{Total Value Received}}{\text{Equity Invested}}`,
    note: "Ignores timing, so it always travels with IRR. Doubling money in five years is roughly a 15% IRR.",
    example: String.raw`2.0\text{x in 5 Years} \approx 14.9\%`
  },
  {
    id: "s-tvpi",
    group: "funds",
    name: "TVPI",
    tex: String.raw`\text{TVPI} = \dfrac{\text{Distributions} + \text{NAV}}{\text{Paid-In Capital}}`,
    note: "Total value per euro called, equal to DPI plus RVPI.",
    example: String.raw`\dfrac{4 + 9}{8} \approx 1.63\text{x}`
  },
  {
    id: "s-dpi",
    group: "funds",
    name: "DPI",
    tex: String.raw`\text{DPI} = \dfrac{\text{Distributions}}{\text{Paid-In Capital}}`,
    note: "Cash actually returned. Investors watch it closely because NAV is only an estimate until exit."
  },
  {
    id: "s-rvpi",
    group: "funds",
    name: "RVPI",
    tex: String.raw`\text{RVPI} = \dfrac{\text{NAV}}{\text{Paid-In Capital}}`,
    note: "Value still held in the fund, which falls as investments are sold."
  },
  {
    id: "s-uncalled",
    group: "funds",
    name: "Uncalled Commitment",
    tex: String.raw`\begin{gathered} \text{Uncalled} = \ \text{Commitment} - \text{Paid-In} \end{gathered}`,
    note: "Amount Soper must keep ready for future capital calls, a key input to holding treasury planning."
  },
  {
    id: "s-carry",
    group: "funds",
    name: "Carried Interest",
    tex: String.raw`\text{Carry} = 20\% \times (\text{Profit Above Hurdle})`,
    note: "Managers usually earn a 2% management fee plus 20% of profits once investors receive an 8% preferred return, with a catch-up in between."
  },
  {
    id: "s-variance",
    group: "control",
    name: "Budget Variance",
    tex: String.raw`\text{Variance} = \text{Actual} - \text{Budget}`,
    note: "Always express it in euros and as a percentage, and state whether it is favourable or unfavourable.",
    example: String.raw`\dfrac{2.3 - 2.0}{2.0} = +15\%`
  },
  {
    id: "s-price-volume",
    group: "control",
    name: "Price and Volume Split",
    tex: String.raw`\begin{gathered} \Delta = (Q_A - Q_B) \cdot P_B \\ + (P_A - P_B) \cdot Q_A \end{gathered}`,
    note: "First term is the volume effect at budget price and second is the price effect at actual volume. Subscripts A and B stand for actual and budget."
  },
  {
    id: "s-margin",
    group: "control",
    name: "EBITDA Margin",
    tex: String.raw`\text{Margin} = \dfrac{\text{EBITDA}}{\text{Revenue}}`,
    note: "Quick health check on any portfolio company, best compared with peers in the same sector."
  },
  {
    id: "s-leverage",
    group: "control",
    name: "Leverage Ratio",
    tex: String.raw`\text{Leverage} = \dfrac{\text{Net Debt}}{\text{EBITDA}}`,
    note: "Common covenant in corporate loans. Values above 4x to 5x signal a stretched balance sheet for most industrial companies."
  }
];

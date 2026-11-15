/* Second Interview Content */
window.Guide = window.Guide || {};

/* Second Interview Details */
Guide.round2 = {
  defaultDate: "2026-11-20",
  assumedTime: "09:00",
  address: "91 Rue Saint-Lazare, 75009 Paris",
  agenda: [
    {
      minutes: 45,
      short: "Discussion",
      title: "Discussion With the Investment Team",
      who: "Investment Director and Investment Officer",
      summary: "Expect a deeper conversation than the first round. Interviewers will probe one Resonance transaction in detail, then test project finance fluency and your reading of Neot's market.",
      href: "#/discussion",
      cta: "Prepare the Discussion"
    },
    {
      minutes: 45,
      short: "Modelling Case",
      title: "Financial Modelling Case on Excel",
      who: "Completed Independently on Your Own Laptop",
      summary: "Build a model from a written brief without help. Speed matters less than a clean structure that reaches the key outputs and checks itself.",
      href: "#/case",
      cta: "Open the Case Playbook"
    },
    {
      minutes: 30,
      short: "Debrief",
      title: "Case Debrief",
      who: "Presenting and Defending Your Model",
      summary: "Present the results, explain each assumption and react to what-if questions. Clear reasoning about drivers and risks counts as much as the numbers.",
      href: "#/debrief",
      cta: "Prepare the Debrief"
    }
  ],
  assess: [
    {
      icon: "grid",
      title: "Modelling Under Time Pressure",
      text: "Neot wants to see whether an intern can turn a brief into a working model quickly, with inputs separated from calculations and outputs that can be trusted."
    },
    {
      icon: "target",
      title: "Investment Judgement",
      text: "Numbers only matter when they lead to a view. Interviewers will ask whether the deal works, what could break it and how the structure protects Neot."
    },
    {
      icon: "mic",
      title: "Clear Communication",
      text: "Investment Officers present to committees every week. Explaining a model crisply in French or English is a core part of the job, so the debrief tests it directly."
    }
  ]
};

/* Preparation Plan in Paris Time */
Guide.plan2 = [
  {
    day: "Sunday",
    date: "2026-11-15",
    label: "15 November",
    theme: "Orientation · About 1 Hour",
    tasks: [
      { text: "Case Playbook and the 45-Minute Plan", href: "#/case" },
      { text: "Excel Toolkit: Functions in English and French", href: "#/case/excel" },
      { text: "Discussion: What the Team Will Explore", href: "#/discussion" }
    ]
  },
  {
    day: "Monday",
    date: "2026-11-16",
    label: "16 November",
    theme: "Guided Modelling · About 1.5 Hours",
    tasks: [
      { text: "Model Builder, Formula by Formula", href: "#/case/builder" },
      { text: "Debt Sizing Module as a Refresher", href: "#/study/debt" }
    ]
  },
  {
    day: "Tuesday",
    date: "2026-11-17",
    label: "17 November",
    theme: "First Timed Attempt · About 1.5 Hours",
    tasks: [
      { text: "Timed Case Within 45 Minutes", href: "#/case/timed" },
      { text: "Compare Results With the Solution", href: "#/case/timed" },
      { text: "Present the Model Aloud in Three Minutes", href: "#/debrief" }
    ]
  },
  {
    day: "Wednesday",
    date: "2026-11-18",
    label: "18 November",
    theme: "Conversation Practice · About 1 Hour",
    tasks: [
      { text: "Discussion Questions in Timed Practice", href: "#/discussion" },
      { text: "Neot Profile Refresher", href: "#/neot" },
      { text: "Formula Quiz Full Run", href: "#/practice/formulas" }
    ]
  },
  {
    day: "Thursday",
    date: "2026-11-19",
    label: "19 November",
    theme: "Second Timed Attempt · About 1.5 Hours",
    tasks: [
      { text: "Timed Case Again, This Time in Excel", href: "#/case/timed" },
      { text: "Spot the Error Drill", href: "#/case/excel" },
      { text: "Debrief Questions in Timed Practice", href: "#/debrief" },
      { text: "Laptop and Excel Setup Check", href: "#/day" }
    ]
  },
  {
    day: "Friday",
    date: "2026-11-20",
    label: "20 November",
    theme: "Interview Day · Light Review",
    tasks: [
      { text: "Model Presentation Script Once Aloud", href: "#/debrief" },
      { text: "Pitch Rehearsal in Both Languages", href: "#/discussion" },
      { text: "Interview Day Checklist", href: "#/day" }
    ]
  }
];

/* Second Interview Readiness Checklist */
Guide.checklist2 = [
  { id: "r1", group: "Laptop and Excel", text: "Charge the laptop, then pack the charger and a mouse.", hint: "Modelling With a Trackpad Is Noticeably Slower" },
  { id: "r2", group: "Laptop and Excel", text: "Open both practice workbooks offline in desktop Excel.", hint: "Avoid Relying on Excel for the Web or on Wi-Fi" },
  { id: "r3", group: "Laptop and Excel", text: "Check whether Excel runs in French or in English.", hint: "Function Names and Argument Separators Differ" },
  { id: "r4", group: "Laptop and Excel", text: "Tighten Goal Seek precision in the Excel options.", hint: "Excel Toolkit · Goal Seek and Data Tables" },
  { id: "r5", group: "Case Readiness", text: "Complete every step of the Model Builder.", hint: "Model Builder" },
  { id: "r6", group: "Case Readiness", text: "Finish the Timed Case within 45 minutes.", hint: "Timed Case" },
  { id: "r7", group: "Case Readiness", text: "Score 80% or better on the Spot the Error drill.", hint: "Excel Toolkit" },
  { id: "r8", group: "Conversation", text: "Present a model aloud in three minutes.", hint: "Debrief" },
  { id: "r9", group: "Conversation", text: "Prepare one Resonance transaction in depth.", hint: "Discussion" },
  { id: "r10", group: "Conversation", text: "Choose two questions to ask the team.", hint: "Discussion" },
  { id: "r11", group: "Logistics", text: "Confirm the start time and whether the interview is in person.", hint: "91 Rue Saint-Lazare or Microsoft Teams" },
  { id: "r12", group: "Logistics", text: "Plan to arrive ten minutes early with the CV printed.", hint: "Two Hours Blocked in the Calendar" }
];

/* Questions to Ask in the Second Interview */
Guide.askThem2 = [
  { q: "When the team prices a lease, which constraint usually binds first: the target equity return or the lenders' coverage requirements?", why: "Connects the modelling case directly to how Neot actually prices deals." },
  { q: "How is the work split between Investment Directors and Investment Officers on a Neot e-motion transaction, and where does an intern add the most value?", why: "Shows genuine interest in the team's workflow and your future role." },
  { q: "DepotOne makes part of the revenue depend on usage. How does that change the way debt is sized compared with a fixed lease?", why: "Demonstrates that you follow Neot's recent offers and think like a lender." },
  { q: "How does the team underwrite residual value for electric trucks, where the second-hand market is still thin?", why: "Targets one of the hardest underwriting questions in the business." },
  { q: "What does model review look like before a file reaches the investment committee?", why: "Links naturally to the QC procedure you formalised at Resonance." }
];

/* Thank-You Emails After the Second Interview */
Guide.thankYou2 = {
  en: `Subject: Thank You – Investment Analyst Internship

Dear [Name],

Thank you for this morning's interview and for the time you both spent on the case debrief. Discussing [specific topic] was particularly valuable, and it confirmed how much I would enjoy contributing to Neot e-motion's transactions.

Building the model also gave me a concrete feel for the questions the team works on every day, from lease pricing to coverage constraints. Joining the team in March 2027 would be a genuine pleasure.

Kind regards,
Ha Linh`,
  fr: `Objet : Remerciements – Stage Analyste Investissement

Madame, Monsieur [Nom],

Merci pour l'entretien de ce matin et pour le temps consacré au débrief du cas pratique. Échanger sur [sujet précis] a été particulièrement enrichissant et a confirmé mon envie de contribuer aux opérations de Neot e-motion.

Construire le modèle m'a également permis de mesurer concrètement les enjeux traités par l'équipe, de la tarification des loyers aux contraintes de couverture de la dette. Rejoindre l'équipe en mars 2027 serait un véritable plaisir.

Bien cordialement,
Ha Linh`
};

/* Discussion Question Bank */
Guide.discussion = {
  categories: [
    { id: "fit", label: "Fit and Motivation" },
    { id: "deep", label: "Resonance Deep Dive" },
    { id: "tech", label: "Technical" },
    { id: "market", label: "Neot and the Market" },
    { id: "fr", label: "En Français" }
  ],

  /* First-Round Questions That Remain Essential, Mapped to Discussion Categories */
  reuse: {
    "fit-intro": "fit",
    "fit-why-neot": "fit",
    "fit-why-investing": "fit",
    "fit-weakness": "fit",
    "model-walk": "deep",
    "model-error": "deep",
    "pf-size": "tech",
    "pf-sculpt": "tech",
    "pf-rates": "tech",
    "invest-irr": "tech",
    "invest-credit": "tech",
    "invest-leverage": "tech",
    "fit-recent": "market",
    "invest-ev": "market",
    "invest-battery": "market",
    "ev-rv": "market",
    "fr-intro": "fr",
    "fr-why": "fr",
    "fr-dscr": "fr"
  },

  items: [
    {
      id: "d-since",
      cat: "fit",
      q: "What have you done to prepare since our first conversation?",
      answer: [
        "Since our first conversation, I have concentrated on the two areas this round tests. Modelling came first, so I rebuilt a fleet leasing model from a blank sheet against a 45-minute clock, solving the lease rent for a target equity IRR before checking it against a DSCR covenant. Repeating that exercise sharpened both my speed and the order in which I build.",
        "Turning to the business, I went back through Neot's recent announcements, particularly DepotOne with E.ON Drive and the Ember coach financing in Scotland. Both made me think about how underwriting changes when revenue depends on usage rather than a fixed lease payment, which is something I would love to hear your view on."
      ],
      points: ["Concrete Preparation", "Timed Modelling Practice", "Recent Neot Activity", "Genuine Question for the Team"],
      link: "#/neot"
    },
    {
      id: "d-disagree",
      cat: "fit",
      q: "How do you handle disagreeing with a senior colleague about an assumption?",
      answer: [
        "Evidence settles disagreements far better than opinion. When [[a degradation assumption]] at Resonance looked aggressive to me, I first checked its source, then ran a quick sensitivity showing what a more conservative figure did to the minimum DSCR. Bringing that comparison to my manager turned the conversation into a decision about risk appetite rather than a debate about who was right.",
        "Ultimately, the senior person owns the call, and I respect that once the trade-off is visible. Investment committees work the same way, so at Neot I would keep the same habit of documenting the alternative alongside its impact."
      ],
      points: ["Evidence Before Opinion", "Quantified Sensitivity", "Respect for Ownership", "Link to the Investment Committee"],
      link: "#/story"
    },
    {
      id: "d-other",
      cat: "fit",
      q: "Are you interviewing with other firms?",
      answer: [
        "Being transparent, I am in conversations with [[one other firm]], since EDHEC's gap year requires securing the second internship early. Neot nonetheless remains my first choice, because it combines investment decisions with electrified transport, which is precisely where I want to build my career. Should another offer arrive with a deadline, I would let you know before deciding."
      ],
      points: ["Honest Without Oversharing", "Clear First Choice", "Professional Courtesy"],
      note: "Adapt this answer so it reflects the real situation.",
      link: "#/role"
    },
    {
      id: "d-deal",
      cat: "deep",
      q: "Choose one Resonance transaction and walk us through it, from the asset to the financing structure.",
      answer: [
        "Taking [[a solar portfolio in France]] as an example, the project company sold its output under [[a long-term PPA]], so most of the revenue was contracted. Lenders sized senior debt at [[a target DSCR of 1.30x]] on the P90 case, with a gearing cap as the secondary constraint, and the debt was sculpted to keep coverage flat across the tenor.",
        "Personally, I worked on [[the operating cash flows and the debt sizing]], together with the sensitivities lenders requested. Most instructive was seeing how [[the PPA tenor relative to the debt tenor]] shaped the whole structure, because any tail after the contract had to be financed on merchant assumptions. Neot faces the same question whenever an operator's contract is shorter than the life of its vehicles."
      ],
      points: ["Asset and Revenue Model", "Binding Debt Constraint", "Personal Contribution", "Bridge to Neot"],
      note: "Replace the highlighted details with a real transaction while keeping client names confidential.",
      link: "#/study/debt"
    },
    {
      id: "d-risk",
      cat: "deep",
      q: "What was the main risk on that transaction, and how was it mitigated?",
      answer: [
        "Volume risk dominated, because debt service depended on [[the plant producing its forecast output]]. Contractually, the PPA fixed the price, while lenders protected themselves through [[a six-month DSRA]] and a distribution lock-up below [[1.10x]].",
        "Within the model, the decisive mitigation was sizing debt on a conservative production case rather than the base case. Applied to Neot, an availability-based lease plays the role of the PPA, so the central questions become the transport operator's credit quality and what happens to the vehicles if it defaults."
      ],
      points: ["Main Risk Identified", "Contractual Mitigation", "Structural Mitigation", "Translation to Fleet Leasing"],
      note: "Use the risks that genuinely mattered on the transaction you choose.",
      link: "#/study/project-finance"
    },
    {
      id: "d-lesson",
      cat: "deep",
      q: "What has Resonance taught you that you could not have learned at school?",
      answer: [
        "Above all, a model is a communication tool before it is a calculation. Lenders, sponsors and advisers read the same workbook looking for different risks, so structure and clarity matter as much as accuracy.",
        "Equally important, small assumptions such as indexation timing or the start date of operations can move debt capacity more than headline inputs. Since then, I question the source of every input, which is exactly the discipline needed when preparing investment committee material at Neot."
      ],
      points: ["Model as Communication", "Sensitivity to Small Assumptions", "Link to Committee Work"],
      link: "#/study/modelling"
    },
    {
      id: "d-lessor",
      cat: "market",
      q: "How does a lessor like Neot make money, and where can it lose money?",
      answer: [
        "Neot earns the spread between the lease payments it receives and the cost of the capital it deploys, with debt providing leverage on an equity base that targets an infrastructure-style return. Residual value adds upside at the end of each lease, and services such as charging can add margin on top.",
        "Losses can come from three directions. Operator default is the first, because it interrupts the lease payments. Residual value is the second, since vehicles may resell for less as technology improves. Battery performance is the third, if degradation runs faster than guaranteed. Strong underwriting therefore focuses on counterparty credit and conservative residual assumptions, supported by manufacturer warranties."
      ],
      points: ["Lease Spread Over Cost of Capital", "Residual Value Upside", "Three Sources of Loss", "Underwriting Response"],
      link: "#/study/mobility"
    },
    {
      id: "d-concession",
      cat: "market",
      q: "Suppose an operator holds a seven-year concession while its buses last twelve years. How would you structure the lease?",
      answer: [
        "Matching the lease to the concession limits counterparty risk, yet it leaves five years of asset life exposed at expiry. Firstly, the lease should be transferable to the successor operator, ideally with the transport authority's support, because the network will still need the buses. Secondly, debt should amortise within the concession term so lenders never depend on a re-lease. Thirdly, the residual value at year seven should be underwritten conservatively and supported by a manufacturer buy-back where possible.",
        "Pricing then reflects whatever residual risk Neot retains. Having a credible transfer mechanism justifies a lower rent than an asset Neot might need to remarket on its own."
      ],
      points: ["Lease Matched to Concession", "Transfer to Successor Operator", "Debt Within Contract Term", "Conservative Residual Value"],
      link: "#/study/mobility"
    },
    {
      id: "d-segments",
      cat: "market",
      q: "Electric buses or electric trucks: which segment is more attractive for Neot today?",
      answer: [
        "Buses currently offer the stronger risk profile. Public transport contracts give operators predictable revenue backed by transport authorities, and depot charging on fixed routes makes energy needs easy to plan. Unsurprisingly, Neot e-motion's first transaction financed 186 buses in Denmark.",
        "Trucks offer the larger growth opportunity. EU CO₂ standards require a 45% cut in emissions from new heavy-duty vehicles by 2030, and DepotOne shows Neot building the charging solutions that make adoption possible. Counterparties are more varied and utilisation is harder to predict, so trucks demand sharper credit work and more conservative residual values. Ideally, a balanced platform would anchor on buses while growing selectively in trucks."
      ],
      points: ["Bus Risk Profile", "Truck Growth Drivers", "Credit and Residual Differences", "Balanced Recommendation"],
      link: "#/neot"
    },
    {
      id: "d-committee",
      cat: "market",
      q: "Sitting on the investment committee, which three questions would you ask about a new bus fleet deal?",
      answer: [
        "Firstly, how strong is the operator, and how long does its contract with the transport authority run compared with our lease? Secondly, which residual value are we assuming at expiry, and who supports it if the second-hand market disappoints? Thirdly, how robust are the returns if availability falls or a battery needs replacing earlier than planned?",
        "Together, those questions cover the counterparty, the asset and the structure, which are the three ways a leasing investment can go wrong."
      ],
      points: ["Counterparty Question", "Asset Question", "Structure Question", "Clear Framework"],
      link: "#/study/investing"
    },
    {
      id: "d-lease-buy",
      cat: "market",
      q: "Why would an operator lease from Neot rather than buy the vehicles with a bank loan?",
      answer: [
        "Capital is the first reason. Electric buses often cost close to twice as much as diesel equivalents upfront, and leasing spreads that cost over the contract instead of consuming the operator's borrowing capacity. Risk transfer is the second, because Neot's offers can bundle battery performance guarantees with charging infrastructure, shielding operators from technology they know less well.",
        "Accounting is a weaker argument than it once was, since IFRS 16 brings most leases onto the lessee's balance sheet. Ultimately, the real value lies in combining financing with technical expertise, which lets an operator electrify faster and with fewer unknowns."
      ],
      points: ["Capital Preservation", "Technology Risk Transfer", "IFRS 16 Nuance", "Expertise as the Differentiator"],
      link: "#/study/mobility"
    },
    {
      id: "d-fr-deal",
      cat: "fr",
      q: "Présentez-nous un dossier sur lequel vous avez travaillé chez Resonance.",
      answer: [
        "Sur [[un portefeuille solaire en France]], la société de projet vendait sa production dans le cadre d'un [[contrat d'achat d'électricité de long terme]], ce qui sécurisait l'essentiel des revenus. Dimensionnée sur un [[DSCR cible de 1,30x]] dans le scénario P90, avec un plafond de levier comme contrainte secondaire, la dette senior était ensuite sculptée pour maintenir une couverture constante.",
        "Personnellement, je me suis chargée [[des flux d'exploitation et du dimensionnement de la dette]], ainsi que des sensibilités demandées par les prêteurs. Grâce à ce dossier, j'ai compris combien la durée du contrat par rapport à celle de la dette structure tout le financement, une question que Neot rencontre dès qu'un contrat d'opérateur est plus court que la vie des véhicules."
      ],
      points: ["Actif et revenus", "Contrainte de dimensionnement", "Contribution personnelle", "Lien avec Neot"],
      note: "Remplacez les éléments surlignés par un dossier réel, sans citer le client.",
      link: "#/lexicon"
    },
    {
      id: "d-fr-lease",
      cat: "fr",
      q: "Pourquoi un opérateur choisirait-il la location plutôt que l'achat ?",
      answer: [
        "Avant tout pour préserver sa capacité d'investissement, puisqu'un bus électrique coûte souvent près de deux fois plus cher qu'un bus diesel et que la location étale ce coût sur la durée du contrat. Ensuite pour transférer le risque technologique, car les offres de Neot peuvent inclure une garantie de performance des batteries ainsi que l'infrastructure de recharge.",
        "Depuis IFRS 16, l'argument comptable est plus faible, car la plupart des locations figurent au bilan du preneur. Concrètement, la valeur ajoutée de Neot tient à l'association du financement et de l'expertise technique, qui permet à l'opérateur d'électrifier plus vite et avec moins d'incertitudes."
      ],
      points: ["Préserver le capital", "Transférer le risque technologique", "Nuance IFRS 16", "Expertise de Neot"],
      link: "#/lexicon"
    }
  ]
};

/* Debrief Question Bank Built on the Timed Case */
Guide.debrief = {
  categories: [
    { id: "present", label: "Presenting the Model" },
    { id: "results", label: "Results and Drivers" },
    { id: "whatif", label: "What-If Questions" },
    { id: "judgement", label: "Judgement and Process" },
    { id: "fr", label: "En Français" }
  ],
  items: [
    {
      id: "b-walk",
      cat: "present",
      q: "Walk us through your model in three minutes.",
      answer: [
        "Starting with the headline, Neot needs an annual rent of about €1.37 million, roughly €4,600 per truck per month, to earn its 10% target equity IRR. Priced there, the structure comfortably meets the lenders' covenant, with a minimum DSCR of 1.32x against a 1.20x requirement.",
        "Structurally, blue inputs on a separate sheet drive everything. Starting from a timeline with lease and debt flags, the Model sheet moves through capex and operations, then tax and the debt schedule, before finishing with cash flows and returns. Debt covers 65% of the €7.0 million capex and is repaid as a six-year annuity at 5%, leaving a one-year tail before the lease ends.",
        "Simplifications are worth flagging too: tax is floored at zero without loss carry-forward, and the residual value is realised at book value, so its sale is tax neutral. Finally, residual value is the most sensitive input, because assuming zero instead of 15% raises the required rent by almost 7%."
      ],
      points: ["Answer First", "Model Structure", "Financing Terms", "Flagged Simplifications", "Key Sensitivity"],
      note: "Substitute the figures from your own model on the day.",
      link: "#/case/timed"
    },
    {
      id: "b-order",
      cat: "present",
      q: "Why did you build the model in this order?",
      answer: [
        "Building in the order cash actually flows keeps every formula pointing backwards, which makes the model easier to audit and avoids circular references. Timeline and flags come first because every other row depends on them. Operations follow, then depreciation and tax, while the debt schedule sits ahead of the cash flows that rely on debt service. Returns and checks close the model once everything feeding them exists.",
        "Under time pressure, that order also protects the deliverable. Even if the clock runs out before the sensitivities, the core answer of rent, IRR and DSCR already exists."
      ],
      points: ["Formulas Point Backwards", "No Circularity", "Protects the Core Output"],
      link: "#/case"
    },
    {
      id: "b-assume",
      cat: "present",
      q: "Which assumptions did you make that the brief did not specify?",
      answer: [
        "Firstly, cash flows are annual and fall at year end, with capex and the debt drawdown both in Year 0. Secondly, tax losses are not carried forward, so tax is simply floored at zero. Thirdly, the residual value equals the trucks' net book value at the end of the lease, which makes its sale tax neutral. Finally, transaction fees and a DSRA are excluded, which slightly flatters returns.",
        "Each choice is either conservative or neutral, and each sits in a labelled input or note, so the team can change it in seconds."
      ],
      points: ["Timing Convention", "Tax Treatment", "Residual Value Treatment", "Excluded Items", "Transparency"],
      link: "#/case/timed"
    },
    {
      id: "b-dscr-trend",
      cat: "results",
      q: "Rent is flat, yet your DSCR falls every year. Why?",
      answer: [
        "Debt service is constant under an annuity, so the trend comes entirely from CFADS, which declines because tax rises over time. Interest falls as the loan amortises while depreciation stays constant, so taxable income grows from about €0.18 million in Year 1 to €0.37 million in Year 6. Higher tax lowers CFADS, taking the DSCR from 1.37x down to 1.32x.",
        "Recognising this pattern matters for covenant testing, because the minimum DSCR occurs in the final debt year rather than at the start. Conversely, indexation in the bus case lifts revenue every year, so its minimum DSCR falls in Year 1."
      ],
      points: ["Constant Debt Service", "Rising Tax as Interest Falls", "Minimum in the Last Debt Year", "Contrast With Indexed Revenue"],
      link: "#/case/builder"
    },
    {
      id: "b-irr-gap",
      cat: "results",
      q: "Why is equity IRR so far above project IRR?",
      answer: [
        "Leverage explains the gap. Project IRR of 6.7% measures the return on the full €7.0 million, while debt funds 65% of it at 5% before tax, or 3.75% once interest is deducted. Because that after-tax cost of debt sits below the project's return, every euro borrowed adds to the shareholders' return, lifting equity IRR to 10%.",
        "Leverage cuts both ways, however. Equity IRR falls much faster than project IRR when cash flows disappoint, which is precisely why lenders cap debt through the DSCR covenant."
      ],
      points: ["Cost of Debt Below Project Return", "After-Tax Cost of Debt", "Leverage Amplifies Downside"],
      link: "#/study/returns"
    },
    {
      id: "b-rent-cut",
      cat: "whatif",
      q: "Suppose the operator negotiates the rent down by 5%. What happens?",
      answer: [
        "Equity absorbs most of the impact. Lower rent reduces EBITDA by about €69,000 a year, partly offset by lower tax, and because debt service is fixed, the whole reduction lands on equity cash flows. Equity IRR falls from 10.0% to about 7.7%, while the minimum DSCR declines from 1.32x to 1.26x, still above the 1.20x covenant.",
        "Accepting the discount is therefore a pricing decision rather than a bankability problem. Before agreeing, I would seek compensation elsewhere, such as a longer lease term or a stronger residual value guarantee."
      ],
      points: ["Equity Bears the Loss", "Quantified IRR Impact", "Covenant Still Met", "Negotiation Response"],
      link: "#/case/timed"
    },
    {
      id: "b-rv-zero",
      cat: "whatif",
      q: "What if the residual value turns out to be zero?",
      answer: [
        "Residual value is a large share of equity value in a seven-year lease, so the impact is significant. Holding the current rent, equity IRR would fall from 10.0% to about 6.4%, because the €0.98 million received in Year 7 disappears. Restoring the 10% target would require a rent of about €1.46 million, roughly 7% higher.",
        "Interestingly, the minimum DSCR improves slightly to 1.36x, because depreciating the trucks to zero creates larger tax deductions while debt service is unchanged. Lenders are repaid in Year 6, so residual risk sits entirely with equity, which is exactly why Neot negotiates buy-backs and battery guarantees."
      ],
      points: ["Quantified IRR Impact", "Required Rent", "Counterintuitive DSCR Effect", "Residual Risk Sits With Equity"],
      link: "#/case/timed"
    },
    {
      id: "b-rates",
      cat: "whatif",
      q: "Interest rates rise by 100 basis points before financial close. What is the impact?",
      answer: [
        "Debt service rises, so both coverage and returns fall. Moving from 5% to 6% lowers the minimum DSCR from 1.32x to about 1.28x, while equity IRR falls from 10.0% to about 9.2% at the current rent. Restoring the target would need a rent of about €1.40 million, around 2% higher.",
        "Practically, Neot would fix the rate at financial close with a swap, or link the rent to rates until signing, so the operator rather than the investor carries movements during the bidding period."
      ],
      points: ["Mechanism Through Debt Service", "Quantified Impact", "Hedging Response"],
      link: "#/study/debt"
    },
    {
      id: "b-capacity",
      cat: "whatif",
      q: "How much debt could this project support at a 1.20x minimum DSCR?",
      answer: [
        "Holding the rent constant, gearing could rise from 65% to roughly 71%, or about €5.0 million of debt instead of €4.55 million, before the minimum DSCR reaches 1.20x. Equity IRR would increase to about 10.8%, because cheaper debt replaces equity.",
        "Sizing exactly at the covenant would leave no headroom for underperformance, however. Lenders typically size with a cushion above the default threshold, so I would stay close to the modelled 65% unless the operator's credit quality were exceptional."
      ],
      points: ["Debt Capacity Quantified", "Return Effect", "Headroom Above the Covenant"],
      link: "#/study/debt"
    },
    {
      id: "b-battery",
      cat: "whatif",
      q: "Suppose a €2.0 million battery replacement falls in Year 6 of the bus case. What breaks, and how would you fix it?",
      answer: [
        "Cash flow in Year 6 collapses: CFADS falls from about €3.0 million to €1.2 million while debt service stays at €2.1 million. Coverage drops to roughly 0.57x, a clear covenant breach, while equity IRR falls from 10.8% to about 7.8%.",
        "Structurally, two remedies exist. Funding a maintenance reserve account from earlier cash flows smooths the cost, while sculpting the debt can lower debt service in that year. Better still, the risk can be transferred, because a manufacturer battery guarantee or a Battery-as-a-Service contract shifts replacement cost to the party best placed to manage it."
      ],
      points: ["DSCR Breach Quantified", "Reserve Account", "Sculpting", "Risk Transfer to the Manufacturer"],
      link: "#/case/builder"
    },
    {
      id: "b-checks",
      cat: "judgement",
      q: "How do you know your model is right?",
      answer: [
        "Automatic checks come first. Debt must be fully repaid by the end of its tenor, and sources must equal uses at financial close. Beyond those, outputs should match intuition: equity IRR should exceed project IRR when debt is cheaper than the project return, and a 5% rent cut should move equity IRR by a couple of points rather than a fraction.",
        "Finally, I trace one row from end to end and confirm each formula is consistent across all years, since copying errors are the most common mistake under time pressure."
      ],
      points: ["Built-In Checks", "Sanity Checks Against Intuition", "Row Consistency"],
      link: "#/case/excel"
    },
    {
      id: "b-unfinished",
      cat: "judgement",
      q: "Suppose you did not finish the case. What would you have done with more time?",
      answer: [
        "Prioritising mattered, so I made sure the core answer existed first: rent, equity IRR and the DSCR covenant check. Given more time, I would have added the data table showing equity IRR across rent and residual value, then a DSRA to reflect what lenders would actually require.",
        "Presentation would come last, with a short summary box at the top of the Model sheet. Saying this plainly is better than rushing unchecked formulas, because a smaller correct model is worth more than a complete wrong one."
      ],
      points: ["Core Output Secured First", "Clear Next Steps", "Honesty Over Speed"],
      link: "#/case"
    },
    {
      id: "b-recommend",
      cat: "judgement",
      q: "Would you invest at this rent?",
      answer: [
        "Subject to due diligence, yes. Reaching a 10% equity IRR meets the target for a contracted asset, and a minimum DSCR of 1.32x leaves comfortable headroom above the 1.20x covenant, so the structure is bankable.",
        "Approval should carry two conditions. Firstly, the operator's credit quality must justify a seven-year exposure, ideally supported by a parent guarantee. Secondly, the 15% residual value should be backed by a manufacturer buy-back, because without it equity IRR falls to about 6.4%."
      ],
      points: ["Clear Recommendation", "Return Versus Target", "Bankability", "Conditions Tied to Key Risks"],
      link: "#/study/investing"
    },
    {
      id: "b-improve",
      cat: "judgement",
      q: "How could Neot raise returns without raising the rent?",
      answer: [
        "Capital structure is the first lever. Extending the debt tenor or increasing gearing within the covenant lets cheaper debt replace equity, as the 10.8% equity IRR available at 71% gearing shows. Costs are the second, because better fleet prices or lower operating costs flow straight into returns.",
        "Asset value is the third lever. Securing a higher guaranteed residual value through a manufacturer buy-back, or extending the lease to use more of the trucks' life, adds return without asking more from the operator. Each lever carries its own risk, so I would present them to the committee with their downside."
      ],
      points: ["Capital Structure", "Cost Levers", "Asset Value Levers", "Balanced With Risk"],
      link: "#/study/returns"
    },
    {
      id: "b-circular",
      cat: "judgement",
      q: "Did your model contain any circular references?",
      answer: [
        "Circularity never arises here, by design. Interest is calculated on the opening balance, and the debt amount is set as a percentage of capex rather than sized on cash flows that depend on interest, so every formula points backwards.",
        "Circularity would appear if fees or interest during construction depended on the debt amount, or if debt were sculpted while tax depended on interest. Faced with those cases, I would break the loop with a copy-paste step or a simple macro rather than enabling iterative calculation, which can hide errors."
      ],
      points: ["Opening Balance Convention", "Typical Sources of Circularity", "Controlled Resolution"],
      link: "#/study/modelling"
    },
    {
      id: "b-fr-present",
      cat: "fr",
      q: "Présentez-nous vos résultats en deux minutes.",
      answer: [
        "Pour atteindre le TRI fonds propres cible de 10 %, Neot doit fixer un loyer annuel d'environ 1,37 million d'euros, soit près de 4 600 euros par camion et par mois. Avec un DSCR minimum de 1,32x, la structure respecte confortablement le covenant de 1,20x fixé par les prêteurs.",
        "Concrètement, le modèle sépare les hypothèses des calculs : une frise chronologique avec des indicateurs de période alimente l'exploitation, la fiscalité et l'échéancier de la dette, puis les flux et la rentabilité. Côté sensibilités, la valeur résiduelle reste le paramètre clé, puisque sans elle le loyer requis augmenterait de près de 7 %."
      ],
      points: ["Résultat d'abord", "Structure du modèle", "Covenant respecté", "Sensibilité clé"],
      note: "Remplacez les chiffres par ceux de votre propre modèle le jour J.",
      link: "#/lexicon"
    },
    {
      id: "b-fr-risk",
      cat: "fr",
      q: "Quel est le principal risque de cette opération ?",
      answer: [
        "Selon moi, le risque principal porte sur la valeur résiduelle. Sur un bail de sept ans, les 0,98 million d'euros attendus à l'échéance pèsent lourd dans la rentabilité : sans eux, le TRI fonds propres tomberait d'environ 10 % à 6,4 %.",
        "Vient ensuite le risque de contrepartie, puisque tout repose sur la capacité de l'opérateur à payer ses loyers. Pour les maîtriser, je proposerais une clause de rachat par le constructeur et, si possible, une garantie de la maison mère."
      ],
      points: ["Valeur résiduelle", "Impact chiffré", "Risque de contrepartie", "Mesures d'atténuation"],
      link: "#/lexicon"
    }
  ]
};

/* Modelling and Excel Terms Added to the French Lexicon */
Guide.lexicon.push(
  { fr: "Loyer", en: "Lease Rent", def: "Periodic payment made by the lessee for the use of the asset." },
  { fr: "Bailleur / Preneur", en: "Lessor / Lessee", def: "Owner that leases the asset out and user that pays the rent." },
  { fr: "Crédit-bail", en: "Finance Lease", def: "Lease transferring most ownership risks and rewards, usually with a purchase option." },
  { fr: "Location longue durée (LLD)", en: "Long-Term Rental", def: "Rental without a purchase option, often bundled with maintenance services." },
  { fr: "Hypothèses", en: "Assumptions", def: "Inputs on which the model rests." },
  { fr: "Échéancier de la dette", en: "Debt Schedule", def: "Table tracking the balance with interest and principal in each period." },
  { fr: "Annuité constante", en: "Annuity Repayment", def: "Equal debt service in each period, with principal rising as interest falls." },
  { fr: "Amortissement linéaire", en: "Straight-Line Depreciation", def: "Equal depreciation charge in every year of the asset's life." },
  { fr: "Impôt sur les sociétés (IS)", en: "Corporate Income Tax", def: "Tax on company profits, levied at a standard rate of 25% in France." },
  { fr: "Valeur cible", en: "Goal Seek", def: "Excel tool that solves one input so that an output reaches a target." },
  { fr: "Table de données", en: "Data Table", def: "Excel tool recalculating an output across one or two ranges of inputs." },
  { fr: "Taux d'actualisation", en: "Discount Rate", def: "Rate converting future cash flows into present value." },
  { fr: "Clause de rachat", en: "Buy-Back Agreement", def: "Commitment, often from the manufacturer, to repurchase assets at a set price." },
  { fr: "Covenant financier", en: "Financial Covenant", def: "Ratio threshold the borrower must respect, such as a minimum DSCR." },
  { fr: "Frise chronologique", en: "Timeline", def: "Row of periods and flags driving every calculation in a model." }
);

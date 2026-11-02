/* Interview Question Bank With Model Answers */
window.Guide = window.Guide || {};

/* Question Categories */
Guide.mockCategories = [
  { id: "fit", label: "Fit and Motivation" },
  { id: "pf", label: "Project Finance" },
  { id: "model", label: "Modelling" },
  { id: "invest", label: "Investing" },
  { id: "ev", label: "EV and Mobility" },
  { id: "corp", label: "Accounting and Valuation" },
  { id: "fr", label: "En Français" }
];

/* Questions, Spoken Model Answers and Listening Points */
Guide.mock = [
  {
    id: "fit-intro",
    cat: "fit",
    q: "Tell me about yourself.",
    answer: [
      "Currently, I am completing my Master's at EDHEC Business School while interning at Resonance Advisory, an independent project finance advisory firm in Paris. Day to day, I build and review financing models, and I size debt against coverage ratios before running the sensitivities that lenders request.",
      "Alongside that work, I formalised a quality-control procedure for model reviews, which taught me how much rigour matters when real money depends on a spreadsheet. Before Resonance, I worked at VIB, where credit analysis gave me a lender's instinct for counterparty risk.",
      "Having spent this year proving that financings hold together, I now want to sit on the other side of the table and decide whether an asset deserves equity in the first place. Neot is the natural next step, because it combines that investment judgement with a sector I genuinely care about: the electrification of transport."
    ],
    points: ["Clear Chronological Structure", "Concrete Resonance Skills", "Credit Background at VIB", "Clear Bridge to Neot", "Under Two Minutes"],
    link: "#/story"
  },
  {
    id: "fit-why-neot",
    cat: "fit",
    q: "Why Neot?",
    answer: [
      "Three reasons stand out. First, Neot sits exactly where my interests meet: structured finance applied to the energy transition, and specifically to transport, which remains one of Europe's largest sources of emissions.",
      "Second, the role covers the full investment cycle, from origination and structuring through the investment committee to asset management. Advisory work rarely offers that breadth, and following assets after closing is how an analyst learns whether their judgement was right.",
      "Third, the timing is compelling. Neot e-motion launched in 2025 with €350 million of equity and has already financed 186 electric buses in Denmark. Securing a €125 million facility from MUFG shortly afterwards shows the team is deploying capital actively, so joining now means contributing to live transactions."
    ],
    points: ["Personal Link to the Energy Transition", "Full Investment Cycle", "Specific Recent Facts", "Enthusiasm Without Flattery"],
    link: "#/neot"
  },
  {
    id: "fit-why-investing",
    cat: "fit",
    q: "Why move from an advisory role to an investment role?",
    answer: [
      "Resonance work requires proving that a financing structure works, meaning that coverage holds and the debt is sized correctly. Investing asks a harder question, namely whether the asset deserves equity at all. Answering it requires judgement on assumptions rather than only on formulas, and that shift is exactly what I want to develop.",
      "Working at Neot would also let me follow assets after closing through asset management, so the recommendations I help shape would be tested against real performance. Everything I have learned in debt sizing transfers directly, because an equity investor still needs to understand what lenders will accept."
    ],
    points: ["Advisory Proves the Financing Works", "Investing Judges the Asset Itself", "Ownership After Closing", "Transferable Debt Skills"],
    link: "#/story"
  },
  {
    id: "fit-hire",
    cat: "fit",
    q: "Why should we hire you?",
    answer: [
      "Three things make me ready for this role. Technically, project finance is already my daily work, so I can contribute to modelling and debt sizing from the first week rather than after months of training.",
      "Methodologically, formalising a QC procedure at Resonance trained me to be rigorous with numbers that others will rely on. Finally, my credit background from VIB means I instinctively look at who pays and how reliably, which is central to leasing fleets to transport operators.",
      "Combined with a genuine interest in electric mobility and full fluency in French and English, that profile matches what the internship asks for quite closely."
    ],
    points: ["Immediate Technical Contribution", "Rigour With Evidence", "Credit Instinct", "Language Fluency"],
    link: "#/role"
  },
  {
    id: "fit-recent",
    cat: "fit",
    q: "What do you know about our recent activity?",
    answer: [
      "Neot has had a very active eighteen months. Back in May 2025, Neot e-motion launched as a pan-European leasing platform with €350 million of equity from Mirova and Alba Infra Partners alongside Banque des Territoires. Neot e-motion's first transaction, announced in January 2026, finances 186 BYD electric buses and 93 Efacec chargers for GoCollective in Denmark.",
      "Turning to debt, MUFG provided a sixteen-year, €125 million facility that combines a revolving credit facility with long-term project financing. More recently, Neot launched DepotOne with E.ON Drive, a pay-per-use offer for truck fleets in Germany. Taken together, these moves show a platform scaling across geographies and vehicle types while building a full equity and debt structure."
    ],
    points: ["Neot e-motion Launch and Investors", "Danish Bus Deal", "MUFG Debt Facility", "DepotOne Partnership"],
    link: "#/neot"
  },
  {
    id: "fit-weakness",
    cat: "fit",
    q: "What is your main weakness?",
    answer: [
      "Coming from model review, my instinct is to explain every step before giving the conclusion. During fast-moving discussions, that habit can bury the key message.",
      "Nowadays, I lead with the answer and the one number that matters, then offer the detail if people want it. Practising this when summarising sensitivity results for [[my team or a client]] has made my updates noticeably easier to act on."
    ],
    points: ["Real but Manageable Weakness", "Concrete Corrective Action", "Evidence of Progress"],
    note: "Adapt this example so the weakness is genuinely yours.",
    link: "#/story"
  },
  {
    id: "pf-dscr",
    cat: "pf",
    q: "Explain DSCR.",
    answer: [
      "DSCR, the debt service coverage ratio, divides CFADS by scheduled interest plus principal for a given period. Put simply, a DSCR of 1.30x means the project generates €1.30 of available cash for every euro it owes that period.",
      "Lenders use it in two ways. Sizing comes first, because permitted debt service in each period must respect a target ratio. Protection follows afterwards, through lock-up and default thresholds set below the sizing level.",
      "Practically, I focus on the minimum DSCR rather than the average, because a single weak period is what triggers a lock-up. When an assumption changes, I locate where the minimum occurs and identify the driver behind it, then judge whether the structure remains sustainable."
    ],
    points: ["CFADS Over Interest Plus Principal", "Use in Sizing and Monitoring", "Minimum Rather Than Average", "Link to Lock-Up"],
    link: "#/study/project-finance"
  },
  {
    id: "pf-llcr",
    cat: "pf",
    q: "Explain LLCR. How does it differ from DSCR?",
    answer: [
      "LLCR, the loan life coverage ratio, takes the net present value of CFADS over the remaining life of the loan, usually discounted at the cost of debt, and divides it by the outstanding debt balance. Where DSCR is a single-period liquidity test, LLCR is a whole-of-life solvency test.",
      "Reading them together is powerful. Healthy LLCR combined with a weak minimum DSCR signals a timing problem, which sculpting or a reserve account can fix. Weak LLCR, by contrast, means the quantum of debt itself is too high for the cash the project will generate, so the structure needs less leverage rather than better shaping."
    ],
    points: ["NPV of CFADS Over Remaining Loan Life", "Divided by Outstanding Debt", "Liquidity Versus Solvency", "Diagnosing Timing Versus Quantum"],
    link: "#/study/project-finance"
  },
  {
    id: "pf-size",
    cat: "pf",
    q: "How do you size debt?",
    answer: [
      "Debt is never simply chosen; it is whatever the binding constraint allows. First, I build base-case CFADS for every period. Second, I divide it by the target DSCR to get the maximum debt service each period can support, and I discount that profile at the all-in cost of debt to obtain DSCR-based capacity.",
      "Third, I compare that capacity with the other limits, typically a gearing cap on eligible cost together with tenor and minimum equity requirements. Whichever is lowest becomes the debt amount. Taking a €75 million fleet as an example, sculpted capacity might reach €52 million while a 60% gearing cap allows only €45 million, so gearing binds.",
      "Finally, I run downside cases to confirm the structure survives realistic stress, because a debt amount that only works in the base case is not bankable."
    ],
    points: ["Base-Case CFADS", "Permitted Debt Service at Target DSCR", "Discounting at Cost of Debt", "Comparison With Gearing Cap", "Downside Validation"],
    link: "#/study/debt"
  },
  {
    id: "pf-sculpt",
    cat: "pf",
    q: "How do you sculpt debt?",
    answer: [
      "Sculpting shapes repayments around the project's expected cash flows so that coverage stays constant. Within each period, permitted debt service equals CFADS divided by the target DSCR, and discounting that profile at the cost of debt gives the debt amount.",
      "Next, period by period, interest is calculated on the opening balance, and principal is simply debt service minus interest, so the balance reaches zero at maturity. Compared with equal instalments, sculpting maximises debt capacity without breaching the ratio in weaker years.",
      "Circularity often appears, because fees and reserves depend on the debt amount, which in turn depends on them. Resonance models resolve this with [[the method Resonance actually uses, such as a copy-paste macro]]."
    ],
    points: ["Debt Service Equals CFADS Over Target DSCR", "Interest on Opening Balance", "Principal as the Remainder", "Circularity and Its Resolution"],
    link: "#/study/debt"
  },
  {
    id: "pf-rates",
    cat: "pf",
    q: "What happens if interest rates rise?",
    answer: [
      "Impact depends on hedging and on timing. Unhedged floating-rate debt sees interest rise immediately, which increases debt service and pushes DSCR down toward lock-up as distributions shrink.",
      "Before financial close, higher rates lower the present value of the debt service a project can support, so debt capacity falls and sponsors need more equity, which reduces equity returns.",
      "Such exposure is precisely why lenders require hedging on most of the floating debt, typically through interest rate swaps that fix the rate or caps that limit it. Once hedged, the project is largely protected, although the cost of the hedge is locked in at signing."
    ],
    points: ["Unhedged Debt: Higher Debt Service", "Before Close: Lower Debt Capacity", "Swaps and Caps", "Equity Returns Fall"],
    link: "#/study/debt"
  },
  {
    id: "pf-waterfall",
    cat: "pf",
    q: "Walk me through a project finance cash flow waterfall.",
    answer: [
      "Revenue comes in first, and operating costs and taxes are paid, leaving CFADS. Senior lenders are served next with interest and fees, then principal. Reserve accounts such as the debt service reserve account are topped up after that.",
      "Before cash goes further down, a distribution test checks coverage. When DSCR is below the lock-up level, cash stays trapped in the SPV. Only once the test is passed do payments flow to subordinated lenders and finally to shareholders.",
      "Exact ordering depends on the financing documents, but the key intuition never changes: equity is the residual claim, so any shortfall hits shareholders first and senior lenders last."
    ],
    points: ["CFADS Before Debt Service", "Senior Interest Then Principal", "Reserve Top-Ups", "Distribution Test", "Equity as Residual"],
    link: "#/study/project-finance"
  },
  {
    id: "model-walk",
    cat: "model",
    q: "Walk me through a model you have built.",
    answer: [
      "Most recently, I worked on the financing model for [[a project and its sector]], where the purpose was to [[size the senior debt for a lender process]]. Structurally, the model flows from inputs and a timeline through the operating build-up to CFADS, then into debt sizing and the cash waterfall, and finally to returns and a full set of checks.",
      "Debt was sculpted to a target DSCR, with [[the binding constraint in that case]] setting the final amount. Sensitivity analysis showed that [[the key driver]] had the greatest effect on minimum DSCR, which shaped the discussion with lenders.",
      "Beyond the mechanics, the main lesson was how much the conclusion depended on that single assumption, which is exactly the kind of judgement I want to exercise at Neot."
    ],
    points: ["Purpose and Audience First", "Logical Flow Rather Than Tabs", "Key Driver Identified", "Insight Delivered"],
    note: "Replace each highlighted detail with a real, non-confidential example.",
    link: "#/story"
  },
  {
    id: "model-audit",
    cat: "model",
    q: "How do you audit somebody else's model?",
    answer: [
      "Starting with architecture before any formula, I map how inputs flow through calculations to outputs. Next comes the inputs sheet, where I look for hardcodes and trace each assumption to a source.",
      "Then I scan rows for inconsistent formulas and check the integrity tests, confirming that the balance sheet balances and the debt rolls forward correctly without any unexplained cash. After that, I stress the model with extreme inputs to see whether it behaves logically.",
      "Last, and most important, I ask whether the outputs make economic sense, because a model can be mechanically perfect and still rest on unrealistic assumptions. Such a framework underpins the QC procedure I formalised at Resonance."
    ],
    points: ["Architecture First", "Inputs and Hardcodes", "Integrity Checks", "Stress Testing", "Economic Reasonableness"],
    link: "#/study/modelling"
  },
  {
    id: "model-error",
    cat: "model",
    q: "What is the hardest error you have found?",
    answer: [
      "During a review of [[a model for a given project]], I noticed that [[the symptom, for example a minimum DSCR that looked too comfortable]]. Tracing it back, I found [[the error, for example a timing flag that shifted debt service by one period]].",
      "Correcting it changed [[the impact, for example minimum DSCR from 1.35x to 1.22x]], which mattered because [[why it mattered to the client or lenders]]. Beyond fixing the formula, I added a specific check to our review procedure so the same error would be caught automatically in future models."
    ],
    points: ["Specific Situation", "How the Error Surfaced", "Quantified Impact", "Process Improvement"],
    note: "Template answer: replace each highlighted detail with a real example in STAR format.",
    link: "#/story"
  },
  {
    id: "model-qc",
    cat: "model",
    q: "Tell me about the QC procedure you formalised.",
    answer: [
      "Noticing that model reviews depended heavily on each reviewer's habits, I proposed a standard procedure. Structured as a sequence, it starts with architecture and inputs, moves through formula consistency and integrity checks, and ends with stress testing and a reasonableness review.",
      "Every step has a short checklist, so reviewers record what they tested rather than relying on memory. [[Describe adoption, for example the team now applies it before every model goes to lenders.]] Since then, [[describe the benefit, such as fewer late corrections or faster reviews]].",
      "Beyond efficiency, the procedure made quality visible, which builds confidence with clients and lenders."
    ],
    points: ["Problem It Solved", "Structure of the Checks", "Team Adoption", "Measurable Benefit"],
    note: "Replace each highlighted detail with what actually happened at Resonance.",
    link: "#/story"
  },
  {
    id: "model-sens",
    cat: "model",
    q: "What sensitivities do you run?",
    answer: [
      "Within a mobility financing, I would start with the commercial drivers, meaning revenue and utilisation, and then the cost drivers, meaning operating costs and electricity. Asset-specific risks come next, notably an earlier battery replacement and a lower residual value, followed by financing variables such as higher interest rates or a shorter tenor.",
      "Across every case, I watch minimum DSCR and LLCR for lenders, and project and equity IRR for investors. Beyond individual sensitivities, I also build a coherent downside scenario and a breakeven analysis showing how far revenue can fall before minimum DSCR reaches 1.00x."
    ],
    points: ["Commercial and Cost Drivers", "Battery and Residual Value", "Financing Variables", "Lender and Investor Outputs", "Scenario and Breakeven"],
    link: "#/study/modelling"
  },
  {
    id: "invest-ev",
    cat: "invest",
    q: "How would you decide whether to invest in an EV fleet?",
    answer: [
      "Starting with the asset and the customer, I would establish which fleet serves whom and under which contract. Next comes cash flow protection, which means comparing contract length with asset life and testing the counterparty's credit quality.",
      "Then I would model the economics and the financing to reach equity IRR and MOIC. Downside cases decide the matter, particularly battery life and residual value alongside utilisation.",
      "Finally, I would close with a clear recommendation to invest or decline, or to invest subject to conditions such as a stronger battery warranty or a parent company guarantee."
    ],
    points: ["Asset and Customer", "Contract Versus Asset Life", "Counterparty Credit", "Returns and Downside", "Clear Recommendation"],
    link: "#/study/investing"
  },
  {
    id: "invest-irr",
    cat: "invest",
    q: "Project IRR versus equity IRR?",
    answer: [
      "Project IRR measures the return on the total investment using unlevered cash flows, so it reflects the asset itself independent of financing. Equity IRR measures the return to shareholders after debt service, so it reflects the capital structure.",
      "When the asset earns more than the cost of debt, leverage pushes equity IRR above project IRR, because shareholders keep the spread on a smaller cheque. Taking a simple fleet case with 60% gearing, a project IRR of about 8.7% becomes an equity IRR of about 11.6%.",
      "However, that higher return comes with higher risk, since fixed debt obligations amplify losses in a downside."
    ],
    points: ["Unlevered Versus Levered", "Spread Over Cost of Debt", "Higher Return Means Higher Risk"],
    link: "#/study/returns"
  },
  {
    id: "invest-leverage",
    cat: "invest",
    q: "Why wouldn't you maximise leverage?",
    answer: [
      "Leverage does not create operating value but redistributes returns and risk between lenders and shareholders. Beyond a certain point, lenders demand higher margins and tighter covenants, and the minimum DSCR moves close to the lock-up level.",
      "Modest underperformance can then stop distributions entirely, which is exactly when equity most needs cash. Optimising the structure therefore means choosing the leverage at which downside cases remain acceptable, not the maximum lenders will offer."
    ],
    points: ["Leverage Redistributes Value", "Higher Cost and Tighter Covenants", "Lock-Up Risk", "Optimise Rather Than Maximise"],
    link: "#/study/debt"
  },
  {
    id: "invest-reject",
    cat: "invest",
    q: "What would make you reject an investment?",
    answer: [
      "Rejection follows when a critical assumption cannot be validated or when the downside breaches what equity can absorb. Typical red flags include a weak counterparty without credit support, or a contract that ends long before the asset's useful life with no residual value protection. Returns that only work under optimistic utilisation are another warning sign.",
      "Low returns alone are rarely the decisive reason; more often, the problem is risk concentrated on equity without adequate mitigation. Even then, I would first ask whether conditions such as a guarantee or a stronger warranty could make the deal acceptable."
    ],
    points: ["Unverifiable Critical Assumption", "Weak Counterparty", "Contract Shorter Than Asset Life", "Conditions Before Rejection"],
    link: "#/study/investing"
  },
  {
    id: "invest-credit",
    cat: "invest",
    q: "How do you assess counterparty creditworthiness?",
    answer: [
      "Credit assessment starts with business risk, meaning the stability of the counterparty's revenue and, for transport operators, the duration of their public service contracts. Financial risk follows, measured mainly through net debt to EBITDA and interest coverage, together with liquidity.",
      "Under IFRS 16, operators record most leases as liabilities, so lease debt must be included in leverage. Ratings and outlooks add an external view, and support from a parent company or a public authority can materially change the picture.",
      "Working at VIB showed me that a contract is only as strong as the party that has to honour it, which is why credit analysis sits at the centre of any leasing decision."
    ],
    points: ["Business Risk", "Leverage and Coverage", "Lease Liabilities Included", "External Support"],
    link: "#/study/investing"
  },
  {
    id: "invest-battery",
    cat: "invest",
    q: "Battery replacement happens two years earlier than planned. What happens, and what do you investigate?",
    answer: [
      "Replacement capex arrives sooner, either directly or through faster contributions to a maintenance reserve. CFADS and distributions fall in those earlier years, and DSCR may deteriorate depending on how the reserve is treated. Equity IRR declines even though total cash, and therefore MOIC, barely moves, because the same cost is simply paid earlier.",
      "Turning to investigation, I would start with the battery warranty and the degradation assumptions behind the original schedule, then check who bears the risk contractually and whether insurance or the manufacturer covers part of it."
    ],
    points: ["Earlier Capex", "Lower CFADS and Distributions", "IRR Falls While MOIC Holds", "Warranty and Contractual Allocation"],
    link: "#/practice/case"
  },
  {
    id: "ev-tco",
    cat: "ev",
    q: "What drives EV total cost of ownership?",
    answer: [
      "Total cost of ownership compares lifetime cost rather than sticker price. Electric vehicles carry a higher upfront cost, mostly the battery and the charging infrastructure, but lower energy and maintenance costs per kilometre.",
      "Utilisation therefore decides the outcome: the more kilometres a vehicle drives, the faster those savings repay the premium. Battery replacement and residual value can swing the answer either way, and so can energy prices, which is why utilisation sits at the heart of any fleet investment case."
    ],
    points: ["Higher Upfront Cost", "Lower Running Cost per Kilometre", "Utilisation as the Decider", "Battery and Residual Value"],
    link: "#/study/mobility"
  },
  {
    id: "ev-rv",
    cat: "ev",
    q: "What drives residual value?",
    answer: [
      "Residual value depends first on age and mileage, and above all on the battery's state of health, since the battery is the most valuable component. Depth of the secondary market matters too, and for electric heavy vehicles that market is still young.",
      "Technological progress can also erode the value of older models quickly. Because residual value usually arrives after the debt has been repaid, the entire risk sits with equity, so I would underwrite it conservatively and look for buy-back agreements or second-life uses for batteries."
    ],
    points: ["Battery State of Health", "Secondary Market Depth", "Technology Progress", "Risk Borne by Equity"],
    link: "#/study/mobility"
  },
  {
    id: "ev-util",
    cat: "ev",
    q: "What does low utilisation do to returns?",
    answer: [
      "Effect depends on the payment mechanism. Where revenue is usage-based, lower utilisation reduces revenue directly, so CFADS falls and both coverage and equity returns decline.",
      "Where payments are fixed or availability-based, as in many leasing structures, the project is protected and utilisation risk sits with the customer. Even then, low utilisation weakens the customer's own economics, which raises counterparty risk and may complicate renewals. Underwriting therefore requires asking what supports the utilisation assumption, whether a contract or reliable historical data."
    ],
    points: ["Payment Mechanism First", "Usage-Based: Direct Hit", "Fixed Payments: Customer Risk", "Evidence for the Assumption"],
    link: "#/study/mobility"
  },
  {
    id: "ev-power",
    cat: "ev",
    q: "What happens if electricity prices increase?",
    answer: [
      "Everything depends on who bears energy cost. When the project bears it under a fixed tariff, CFADS falls and coverage weakens. When costs pass through to the operator, the project is protected directly, but the operator's margins shrink, which turns energy price risk into counterparty risk.",
      "Either way, the total cost advantage of electric over diesel narrows, which could slow future demand. Contract review should therefore start with pass-through and indexation clauses, followed by a test of the operator's resilience to a sustained price rise."
    ],
    points: ["Allocation of Energy Cost", "Direct Versus Counterparty Exposure", "Narrower TCO Advantage", "Pass-Through Clauses"],
    link: "#/study/mobility"
  },
  {
    id: "corp-3s",
    cat: "corp",
    q: "Walk me through the three statements.",
    answer: [
      "Income statement shows profitability over a period, starting with revenue and ending with net income. Balance sheet captures resources and claims at a point in time, with assets always equal to liabilities plus equity.",
      "Cash flow statement reconciles net income to cash through non-cash items and working capital, then adds investing and financing flows. Linking them, net income feeds retained earnings and opens the cash flow statement, while the net change in cash updates the balance sheet so it balances."
    ],
    points: ["Purpose of Each Statement", "Net Income Link", "Cash Link Back to the Balance Sheet"],
    link: "#/study/accounting-valuation"
  },
  {
    id: "corp-dep",
    cat: "corp",
    q: "Depreciation increases by €10. What happens to the three statements?",
    answer: [
      "Assuming a 25% tax rate, EBIT falls by €10 and taxes fall by €2.50, so net income drops by €7.50. Cash flow starts at minus €7.50 and adds back the €10 of non-cash depreciation, so cash ends €2.50 higher thanks to the tax shield.",
      "Balance sheet effects mirror that: PP&E falls by €10 and cash rises by €2.50, so assets fall by €7.50, matched by a €7.50 drop in retained earnings. Everything balances."
    ],
    points: ["State the Tax Rate", "Net Income Down €7.50", "Cash Up €2.50", "Balance Sheet Balances"],
    link: "#/practice/drills"
  },
  {
    id: "corp-dcf",
    cat: "corp",
    q: "Walk me through a DCF.",
    answer: [
      "Projecting unlevered free cash flow over an explicit horizon comes first, meaning EBIT after tax plus depreciation, less capex and the increase in working capital. Discounting those cash flows at WACC, which blends the after-tax cost of debt with a cost of equity from CAPM, gives their present value.",
      "Adding a terminal value, from either a Gordon growth formula or an exit multiple, completes enterprise value, and subtracting net debt gives equity value. Applied to a fleet with a finite contract, the approach replaces the perpetuity with a residual value for the vehicles and batteries, and the result is tested against WACC and residual assumptions."
    ],
    points: ["FCFF Definition", "WACC Discounting", "Terminal or Residual Value", "Bridge to Equity Value"],
    link: "#/study/accounting-valuation"
  },
  {
    id: "corp-moic",
    cat: "corp",
    q: "Why could two investments share a MOIC but have different IRRs?",
    answer: [
      "MOIC only compares money returned with money invested, so it ignores time completely. Doubling capital over three years and over fifteen years both show 2.0x.",
      "IRR accounts for timing, giving about 26% in the first case and under 5% in the second. Investors therefore use both measures, because MOIC shows how much wealth is created and IRR shows how fast."
    ],
    points: ["MOIC Ignores Time", "Roughly 26% Versus 4.7%", "Use Both Together"],
    link: "#/study/returns"
  },
  {
    id: "fr-intro",
    cat: "fr",
    q: "Présentez-vous en deux minutes.",
    answer: [
      "Actuellement en Master à l'EDHEC Business School, j'effectue un stage chez Resonance Advisory, un cabinet indépendant de conseil en financement de projets. Au quotidien, je construis et révise des modèles financiers et je dimensionne la dette en fonction des ratios de couverture, tout en menant les analyses de sensibilité demandées par les prêteurs.",
      "J'ai également formalisé une procédure de contrôle qualité des modèles. Auparavant, mon expérience chez VIB m'a donné une solide approche du risque de crédit.",
      "Après une année consacrée à démontrer qu'un financement tient, je souhaite désormais évaluer si un actif mérite des fonds propres. Neot représente donc l'étape logique, car elle associe le jugement d'investissement à un secteur qui me tient à cœur : l'électrification des transports."
    ],
    points: ["Même structure qu'en anglais", "Vocabulaire technique précis", "Transition claire vers Neot"],
    link: "#/story"
  },
  {
    id: "fr-why",
    cat: "fr",
    q: "Pourquoi Neot ?",
    answer: [
      "Trois raisons me motivent. D'abord, Neot se situe exactement au croisement de mes intérêts : la finance structurée au service de la transition énergétique, appliquée aux transports.",
      "Ensuite, le poste couvre l'ensemble du cycle d'investissement, de l'origination jusqu'à la gestion des actifs. Enfin, le moment est idéal : Neot e-motion a été lancée en 2025 avec 350 millions d'euros de fonds propres, a financé 186 bus électriques au Danemark et a obtenu un financement de 125 millions d'euros auprès de MUFG. Rejoindre l'équipe aujourd'hui, c'est contribuer à des opérations concrètes."
    ],
    points: ["Motivation personnelle", "Cycle d'investissement complet", "Faits récents et précis"],
    link: "#/neot"
  },
  {
    id: "fr-dscr",
    cat: "fr",
    q: "Expliquez le DSCR et son rôle dans le dimensionnement de la dette.",
    answer: [
      "Ratio de couverture du service de la dette, le DSCR rapporte les flux disponibles pour le service de la dette, le CFADS, au service de la dette de la période, c'est-à-dire les intérêts et le principal.",
      "Pour dimensionner la dette, on fixe un DSCR cible : le service de la dette autorisé à chaque période est égal au CFADS divisé par ce ratio. En actualisant ce profil au coût de la dette, on obtient la capacité d'endettement, que l'on compare ensuite aux autres contraintes, notamment le ratio d'endettement maximal. La contrainte la plus restrictive détermine le montant final."
    ],
    points: ["CFADS divisé par le service de la dette", "DSCR cible", "Actualisation au coût de la dette", "Contrainte la plus restrictive"],
    link: "#/lexicon"
  },
  {
    id: "fr-tri",
    cat: "fr",
    q: "Quelle différence entre TRI projet et TRI actionnaire ?",
    answer: [
      "Calculé sur les flux non endettés, le TRI projet mesure la rentabilité de l'actif indépendamment de son financement. Côté actionnaire, le TRI se calcule après le service de la dette et reflète donc la structure de financement.",
      "Lorsque l'actif rapporte plus que le coût de la dette, l'effet de levier fait monter le TRI actionnaire au-dessus du TRI projet. En contrepartie, il amplifie aussi les pertes en cas de scénario dégradé."
    ],
    points: ["Flux non endettés", "Après service de la dette", "Effet de levier dans les deux sens"],
    link: "#/lexicon"
  }
];

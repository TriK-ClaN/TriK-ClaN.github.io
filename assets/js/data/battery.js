/* Battery Finance Questions and Formula Sheet */
window.Guide = window.Guide || {};

/* Formula Sheet Groups */
Guide.sheetGroups = [
  { id: "income", label: "Income Statement", icon: "book" },
  { id: "cash", label: "Cash Flow", icon: "pulse" },
  { id: "debt", label: "Debt Sizing", icon: "scale" },
  { id: "coverage", label: "Coverage and Reserves", icon: "layers" },
  { id: "returns", label: "Returns and Pricing", icon: "trend" },
  { id: "battery", label: "Battery and Fleet", icon: "bolt" },
  { id: "credit", label: "Counterparty Credit", icon: "target" }
];

/* Formula Sheet Entries */
Guide.sheetFormulas = [
  {
    id: "ebitda",
    group: "income",
    name: "EBITDA",
    tex: String.raw`\text{EBITDA} = \text{Revenue} - \text{Operating costs}`,
    note: "Lessors earn revenue from the lease or Battery-as-a-Service fee, while operating costs cover insurance, asset management and any battery maintenance Neot carries."
  },
  {
    id: "depreciation",
    group: "income",
    name: "Straight-Line Depreciation",
    tex: String.raw`\text{Depreciation} = \dfrac{\text{Cost} - \text{Residual value}}{\text{Useful life}}`,
    note: "Batteries usually wear out before the chassis, so a fleet model often runs one schedule for vehicles and a shorter one for batteries."
  },
  {
    id: "ebit",
    group: "income",
    name: "EBIT",
    tex: String.raw`\text{EBIT} = \text{EBITDA} - \text{D\&A}`,
    note: "Depreciation is non-cash, yet it shields tax, which is why it matters for CFADS."
  },
  {
    id: "ebt",
    group: "income",
    name: "Earnings Before Tax",
    tex: String.raw`\text{EBT} = \text{EBIT} - \text{Interest}`,
    note: "Interest is deductible, so leverage lowers the tax bill as well as the equity cheque."
  },
  {
    id: "tax",
    group: "income",
    name: "Tax Payable",
    tex: String.raw`\text{Tax} = \max\left(0,\ \text{EBT} \times T\right)`,
    where: [[String.raw`T`, "Corporate Tax Rate, 25% in France"]],
    note: "Flooring at zero reflects a brief with no loss carry-forward. Where losses can be carried forward, early tax losses reduce later tax payments."
  },
  {
    id: "netIncome",
    group: "income",
    name: "Net Income",
    tex: String.raw`\text{Net income} = \text{EBT} - \text{Tax}`,
    note: "Net income starts the cash flow statement, but lenders size debt on cash rather than profit."
  },
  {
    id: "icr",
    group: "income",
    name: "Interest Cover Ratio",
    tex: String.raw`\text{ICR} = \dfrac{\text{EBITDA}}{\text{Interest}}`,
    note: "Corporate lenders use it to test the transport operator that pays the lease, alongside leverage."
  },
  {
    id: "cfo",
    group: "cash",
    name: "Operating Cash Flow",
    tex: String.raw`\begin{aligned} \text{CFO} = {} & \text{Net income} + \text{Non-cash charges} \\ & - \Delta\,\text{NWC} \end{aligned}`,
    note: "Adding back depreciation converts profit into cash before investment and financing flows."
  },
  {
    id: "nwc",
    group: "cash",
    name: "Net Working Capital",
    tex: String.raw`\begin{aligned} \text{NWC} \approx {} & \text{Receivables} + \text{Inventory} \\ & - \text{Payables} \end{aligned}`,
    note: "Late payment by an operator raises receivables and consumes cash, even when the lease remains profitable."
  },
  {
    id: "cfads",
    group: "cash",
    name: "CFADS",
    tex: String.raw`\begin{aligned} \text{CFADS} = {} & \text{EBITDA} - \text{Tax paid} \\ & - \Delta\,\text{NWC} \\ & - \text{Maintenance capex} \end{aligned}`,
    note: "Battery replacements not funded from a reserve hit CFADS in the year they are paid, which is where coverage breaks."
  },
  {
    id: "equityCf",
    group: "cash",
    name: "Cash Flow to Equity",
    tex: String.raw`\begin{aligned} \text{CF to equity} = {} & \text{CFADS} - \text{Debt service} \\ & - \text{Reserve funding} \\ & + \text{Reserve release} \end{aligned}`,
    note: "Reserve contributions for future battery replacements come out of distributions, so they lower equity returns in early years."
  },
  {
    id: "projectCf",
    group: "cash",
    name: "Unlevered Project Cash Flow",
    tex: String.raw`\begin{aligned} \text{Project CF} = {} & \text{EBITDA} - \text{Unlevered tax} \\ & - \text{Capex} - \Delta\,\text{NWC} \end{aligned}`,
    note: "Battery capex at close and at mid-life both belong here, together with the residual value at the end."
  },
  {
    id: "gearing",
    group: "debt",
    name: "Gearing",
    tex: String.raw`\text{Gearing} = \dfrac{\text{Debt}}{\text{Debt} + \text{Equity}}`,
    note: "Assets with uncertain residual value, such as batteries without a buy-back, usually support lower gearing."
  },
  {
    id: "debtMin",
    group: "debt",
    name: "Debt Sizing Constraint",
    tex: String.raw`\text{Debt} = \min \left\{ \begin{array}{l} \text{DSCR capacity} \\ \text{Gearing cap} \times \text{Cost} \\ \text{Other limits} \end{array} \right.`,
    note: "Battery life often appears among the other limits, since lenders avoid a tenor that outlasts the first battery."
  },
  {
    id: "capacity",
    group: "debt",
    name: "Debt Capacity",
    tex: String.raw`\text{Debt capacity} = \sum_{t=1}^{n} \dfrac{\text{DS}_t}{(1 + r_d)^{t}}`,
    where: [[String.raw`r_d`, "All-In Cost of Debt"]],
    note: "Permitted debt service in each period, discounted at the cost of debt, gives the maximum loan."
  },
  {
    id: "annuityDebt",
    group: "debt",
    name: "Debt Capacity With Flat CFADS",
    tex: String.raw`\text{Debt}_{\max} = \dfrac{\text{CFADS}}{\text{DSCR}_{\text{target}}} \times \dfrac{1 - (1 + r)^{-n}}{r}`,
    note: "Dividing CFADS by the target ratio, then multiplying by the annuity factor, gives a quick mental check for a level lease payment.",
    example: String.raw`\dfrac{2.6}{1.30} \times \dfrac{1 - 1.05^{-8}}{0.05} = 2.0 \times 6.463 = \text{€}12.93\text{m}`
  },
  {
    id: "sculpt",
    group: "debt",
    name: "Sculpted Debt Service",
    tex: String.raw`\begin{aligned} \text{DS}_t &= \dfrac{\text{CFADS}_t}{\text{DSCR}_{\text{target}}} \\[6pt] \text{Principal}_t &= \text{DS}_t - \text{Interest}_t \end{aligned}`,
    note: "Sculpting lowers debt service in a battery replacement year instead of letting coverage collapse."
  },
  {
    id: "pmt",
    group: "debt",
    name: "Annuity Payment",
    tex: String.raw`\text{Payment} = D \times \dfrac{r}{1 - (1 + r)^{-n}}`,
    note: "Excel returns the same figure with PMT, or VPM in French Excel, when the loan is entered as a negative value."
  },
  {
    id: "interest",
    group: "debt",
    name: "Periodic Interest",
    tex: String.raw`\text{Interest}_t = \text{Opening balance}_t \times r`,
    note: "Using the opening balance keeps the model free of circular references."
  },
  {
    id: "debtRoll",
    group: "debt",
    name: "Debt Roll-Forward",
    tex: String.raw`\begin{aligned} \text{Closing debt} = {} & \text{Opening debt} \\ & + \text{Drawdown} \\ & - \text{Repayment} \end{aligned}`,
    note: "Drawdowns follow vehicle deliveries in a fleet deal, while a revolving facility can fund batteries before term debt takes over."
  },
  {
    id: "allIn",
    group: "debt",
    name: "All-In Cost of Debt",
    tex: String.raw`r_{\text{all-in}} = \text{EURIBOR} + \text{Credit margin}`,
    note: "Hedged deals swap EURIBOR into a fixed rate, adding the swap rate and its credit spread instead."
  },
  {
    id: "dscr",
    group: "coverage",
    name: "DSCR",
    tex: String.raw`\text{DSCR}_t = \dfrac{\text{CFADS}_t}{\text{Interest}_t + \text{Principal}_t}`,
    note: "Contracted fleet leases are often sized at roughly 1.20x to 1.30x, with exact levels set deal by deal."
  },
  {
    id: "minAvg",
    group: "coverage",
    name: "Minimum and Average DSCR",
    tex: String.raw`\begin{aligned} \text{DSCR}_{\min} &= \min_t \ \text{DSCR}_t \\[4pt] \text{DSCR}_{\text{avg}} &= \dfrac{1}{n} \sum_{t=1}^{n} \text{DSCR}_t \end{aligned}`,
    note: "Lock-up and default tests look at the minimum, which in a battery fleet is often the replacement year."
  },
  {
    id: "llcr",
    group: "coverage",
    name: "LLCR",
    tex: String.raw`\text{LLCR} = \dfrac{\begin{array}{c}\text{NPV of CFADS over the} \\ \text{remaining loan life}\end{array}}{\text{Outstanding debt}}`,
    note: "Healthy LLCR with a weak single-year DSCR signals a timing problem, such as a lumpy battery cost, rather than too much debt."
  },
  {
    id: "plcr",
    group: "coverage",
    name: "PLCR",
    tex: String.raw`\text{PLCR} = \dfrac{\begin{array}{c}\text{NPV of CFADS over the} \\ \text{remaining project life}\end{array}}{\text{Outstanding debt}}`,
    note: "Covering cash flows after debt maturity, PLCR captures second-life battery value and re-leasing."
  },
  {
    id: "dsra",
    group: "coverage",
    name: "DSRA Target Balance",
    tex: String.raw`\text{DSRA target} = \sum_{\text{next 6 months}} \text{Debt service}`,
    note: "Six months of forward debt service is common, though each facility agreement sets its own period."
  },
  {
    id: "reserve",
    group: "coverage",
    name: "Battery Replacement Reserve",
    tex: String.raw`\begin{aligned} \text{Contribution} = {} & \text{Replacement cost} \\ & \times \dfrac{r}{(1 + r)^{n} - 1} \end{aligned}`,
    where: [
      [String.raw`r`, "Interest Earned on the Reserve"],
      [String.raw`n`, "Years Until Replacement"]
    ],
    note: "Under sinking-fund logic, equal contributions plus interest build exactly the replacement cost by the target year.",
    example: String.raw`120\text{k} \times \dfrac{0.03}{1.03^{8} - 1} = \text{€}13.5\text{k per bus per year}`
  },
  {
    id: "npv",
    group: "returns",
    name: "NPV",
    tex: String.raw`\text{NPV} = \sum_{t=0}^{n} \dfrac{\text{CF}_t}{(1 + r)^{t}}`,
    note: "Positive NPV at the target return means the lease rent more than covers the cost of capital."
  },
  {
    id: "irr",
    group: "returns",
    name: "IRR",
    tex: String.raw`\sum_{t=0}^{n} \dfrac{\text{CF}_t}{(1 + \text{IRR})^{t}} = 0`,
    note: "Project IRR uses unlevered flows, while equity IRR uses cash flow to equity after debt service and reserves."
  },
  {
    id: "moic",
    group: "returns",
    name: "MOIC",
    tex: String.raw`\text{MOIC} = \dfrac{\text{Total equity proceeds}}{\text{Equity invested}}`,
    note: "MOIC ignores timing, so a large residual value at the end can flatter it relative to IRR."
  },
  {
    id: "irrMoic",
    group: "returns",
    name: "IRR From MOIC",
    tex: String.raw`\text{IRR} = \text{MOIC}^{\,1/n} - 1`,
    note: "Such a shortcut only holds for one investment and one exit, which makes it a sense check rather than a model output."
  },
  {
    id: "wacc",
    group: "returns",
    name: "WACC",
    tex: String.raw`\begin{aligned} \text{WACC} = {} & \dfrac{E}{D + E}\,K_e \\ & + \dfrac{D}{D + E}\,K_d\,(1 - T) \end{aligned}`,
    where: [
      [String.raw`K_e`, "Cost of Equity"],
      [String.raw`K_d`, "Pre-Tax Cost of Debt"]
    ],
    note: "Project IRR above the blended cost of capital indicates the fleet creates value before financing."
  },
  {
    id: "rent",
    group: "returns",
    name: "Lease or Battery-as-a-Service Fee",
    tex: String.raw`\begin{aligned} \text{Annual fee} = {} & \left(\text{Cost} - \dfrac{\text{RV}}{(1 + r)^{n}}\right) \\ & \times \dfrac{r}{1 - (1 + r)^{-n}} \end{aligned}`,
    note: "Level payments recover the cost not covered by the discounted residual value, together with the required return.",
    example: String.raw`\begin{aligned} & \left(120 - \dfrac{12}{1.06^{8}}\right) \times \dfrac{0.06}{1 - 1.06^{-8}} \\[4pt] & = \text{€}18.1\text{k per year} \end{aligned}`
  },
  {
    id: "soh",
    group: "battery",
    name: "State of Health",
    tex: String.raw`\text{SOH}_t = \dfrac{\text{Usable capacity}_t}{\text{Nameplate capacity}}`,
    note: "Warranties usually guarantee a minimum SOH, commonly in the 70% to 80% range, for a set number of years or cycles."
  },
  {
    id: "degradation",
    group: "battery",
    name: "Compounding Degradation",
    tex: String.raw`\text{SOH}_t = (1 - d)^{t}`,
    where: [[String.raw`d`, "Annual Capacity Loss"]],
    note: "Real curves fall faster early on and depend on temperature, charging rate and depth of discharge, so models test several curves."
  },
  {
    id: "eol",
    group: "battery",
    name: "Years to End of First Life",
    tex: String.raw`t_{\text{EoL}} = \dfrac{\ln\left(\text{SOH}_{\text{EoL}}\right)}{\ln(1 - d)}`,
    note: "Solving for t shows when the replacement capex lands in the model.",
    example: String.raw`\dfrac{\ln(0.80)}{\ln(0.975)} = 8.8 \text{ years}`
  },
  {
    id: "cycles",
    group: "battery",
    name: "Equivalent Full Cycles",
    tex: String.raw`\text{Full cycles} = \dfrac{\text{Energy throughput (kWh)}}{\text{Usable capacity (kWh)}}`,
    note: "Many warranties cap cycles as well as years, so heavy daily use can end coverage early.",
    example: String.raw`\dfrac{300}{400} \times 365 = 274 \text{ cycles per year}`
  },
  {
    id: "batteryCost",
    group: "battery",
    name: "Battery Cost",
    tex: String.raw`\begin{aligned} \text{Battery cost} = {} & \text{Capacity (kWh)} \\ & \times \text{Price (€/kWh)} \end{aligned}`,
    note: "Battery packs make up a large share of an electric bus's price, which is why replacement timing dominates the model."
  },
  {
    id: "energyKm",
    group: "battery",
    name: "Energy Cost per Kilometre",
    tex: String.raw`\begin{aligned} \text{Cost per km} = {} & \text{Consumption (kWh/km)} \\ & \times \text{Price (€/kWh)} \end{aligned}`,
    note: "Consumption rises in cold weather and with heating, which matters for range and for TCO."
  },
  {
    id: "rv",
    group: "battery",
    name: "Battery Residual Value",
    tex: String.raw`\begin{aligned} \text{RV} = {} & \text{Capacity} \times \text{SOH} \\ & \times \text{Second-life price (€/kWh)} \end{aligned}`,
    note: "Second-life storage and recycling give batteries value after transport use, but lenders usually haircut it heavily.",
    example: String.raw`400 \times 0.75 \times 40 = \text{€}12{,}000`
  },
  {
    id: "tco",
    group: "battery",
    name: "Total Cost of Ownership",
    tex: String.raw`\begin{aligned} \text{TCO} = {} & \text{Purchase} + \text{Financing} \\ & + \text{Energy} + \text{Maintenance} \\ & + \text{Insurance} + \text{Taxes} \\ & - \text{Residual value} \end{aligned}`,
    note: "Battery-as-a-Service turns the battery purchase into a fee, which changes TCO timing without changing the total."
  },
  {
    id: "parity",
    group: "battery",
    name: "TCO Breakeven Distance",
    tex: String.raw`\text{Breakeven km} = \dfrac{\text{Upfront premium}}{\text{Saving per km}}`,
    note: "High-mileage routes reach parity first, which is why utilisation drives which fleets electrify."
  },
  {
    id: "indexation",
    group: "battery",
    name: "Revenue Indexation",
    tex: String.raw`\text{Revenue}_t = \text{Revenue}_{t-1} \times (1 + i)`,
    where: [[String.raw`i`, "Annual Indexation Rate"]],
    note: "Indexed rent grows CFADS each year, so coverage is weakest at the start of an annuity loan."
  },
  {
    id: "leverage",
    group: "credit",
    name: "Net Debt to EBITDA",
    tex: String.raw`\text{Leverage} = \dfrac{\text{Net debt}}{\text{EBITDA}}`,
    note: "Leverage measures how stretched the operator paying the lease already is."
  },
  {
    id: "el",
    group: "credit",
    name: "Expected Loss",
    tex: String.raw`\text{EL} = \text{PD} \times \text{LGD} \times \text{EAD}`,
    where: [
      [String.raw`\text{PD}`, "Probability of Default"],
      [String.raw`\text{LGD}`, "Loss Given Default"],
      [String.raw`\text{EAD}`, "Exposure at Default"]
    ],
    note: "Recoverable battery and vehicle value lowers LGD, which is why repossession rights matter."
  }
];

/* Battery Finance Question Categories */
Guide.batteryCategories = [
  { id: "basics", label: "Batteries at Neot" },
  { id: "degradation", label: "Degradation Risk" },
  { id: "debt", label: "Cash Flows and Debt" },
  { id: "residual", label: "Residual Value" },
  { id: "contracts", label: "Risk Allocation" },
  { id: "numbers", label: "Quick Calculations" },
  { id: "fr", label: "En Français" }
];

/* Battery Finance Questions With Spoken Model Answers */
Guide.batteryQuestions = [
  {
    id: "bq-baas",
    cat: "basics",
    q: "What is Battery-as-a-Service at Neot, and why would an operator choose it?",
    answer: [
      "Battery-as-a-Service separates the battery from the vehicle. Neot e-motion describes it as battery supply that includes a performance guarantee, end-of-life optimisation and technical expertise, with the operator paying a regular fee rather than buying the pack.",
      "Operators gain two things. Capital spending falls, because the battery is one of the most expensive parts of an electric bus, and performance risk moves to a specialist that monitors the asset and guarantees what it delivers. Having Forsee Power, a battery manufacturer, among its shareholders gives Neot unusual credibility in pricing that risk."
    ],
    points: ["Battery Separated From Vehicle", "Performance Guarantee", "End-of-Life Optimisation", "Capex and Risk Transfer"],
    link: "#/formulas"
  },
  {
    id: "bq-critical",
    cat: "basics",
    q: "Why is the battery the critical asset in an electric bus financing?",
    answer: [
      "Battery packs drive three things a lender cares about. Cost is the first, since the pack is a large share of the vehicle price. Availability is the second, because a degraded battery shortens range and can take a bus off its route. Value is the third: Neot's partnership with LinkByCar describes battery lifespan as the core driver of vehicle value.",
      "Consequently, battery assumptions decide when replacement capex lands, how much CFADS the fleet generates and what the assets are worth at the end of the lease. Getting them wrong affects debt sizing and equity returns at the same time."
    ],
    points: ["Share of Capex", "Availability and Range", "Driver of Residual Value", "Links to CFADS and Debt Sizing"],
    link: "#/formulas"
  },
  {
    id: "bq-soh",
    cat: "basics",
    q: "What is state of health, and why does a financier track it?",
    answer: [
      "State of health compares the energy a battery can store today with its capacity when new, so a 400 kWh pack at 85% SOH holds about 340 kWh. Warranties usually guarantee a minimum SOH, often between 70% and 80%, for a set number of years or cycles.",
      "Financiers track it because SOH links directly to cash. Falling SOH reduces range and can trigger replacement capex, while the SOH at the end of the lease sets residual value. Reliable usage data, which the LinkByCar partnership aims to deliver, therefore reduces perceived risk and helps secure financing."
    ],
    points: ["Definition", "Warranty Threshold", "Link to Capex and Residual Value", "Role of Data"],
    link: "#/formulas"
  },
  {
    id: "bq-chemistry",
    cat: "basics",
    q: "How do LFP and NMC chemistries differ from an investor's point of view?",
    answer: [
      "Lithium iron phosphate, or LFP, generally offers a longer cycle life, better thermal stability and lower cost per kWh, at the expense of lower energy density. Nickel manganese cobalt, or NMC, packs more energy into the same weight, which helps range but usually costs more and ages faster under heavy cycling.",
      "Choosing between them shifts the model. Longer cycle life delays replacement capex and supports a longer debt tenor, while higher energy density may let one bus cover a route that would otherwise need two. Recycling value also differs, because nickel and cobalt are worth more than iron phosphate at end of life."
    ],
    points: ["Cycle Life and Safety", "Energy Density", "Effect on Replacement Timing", "Recycling Value"],
    link: "#/study/mobility"
  },
  {
    id: "bq-model-deg",
    cat: "degradation",
    q: "How would you model battery degradation in a project finance model?",
    answer: [
      "Firstly, I would build an SOH curve from the manufacturer's data and the expected duty cycle, combining calendar ageing with ageing from cycling. Secondly, I would check each year whether usable capacity still covers the route with a margin, and schedule replacement capex in the year SOH crosses the end-of-life threshold.",
      "Finally, I would test faster curves as sensitivities, because degradation depends on temperature, charging power and depth of discharge. Comparing the base curve with the warranty curve shows how much risk the guarantee really transfers and how much stays with Neot."
    ],
    points: ["SOH Curve From Duty Cycle", "Range Check Each Year", "Replacement Trigger", "Sensitivities Versus Warranty"],
    link: "#/formulas"
  },
  {
    id: "bq-faster",
    cat: "degradation",
    q: "Batteries degrade faster than planned. What happens to the project, and how do you protect it?",
    answer: [
      "Replacement capex arrives earlier, so CFADS falls in that year and the DSCR can breach its covenant, as a €2.0 million replacement in Year 6 of the bus case shows by taking coverage to roughly 0.57x. Under an availability-based contract, buses that cannot finish their routes may also trigger deductions, and the residual value at expiry falls.",
      "Protection comes from layers. Manufacturer warranties or Neot's own performance guarantee shift replacement cost to the party best placed to manage it. Funding a replacement reserve smooths the cash impact, while usage limits in the contract stop the operator from accelerating wear."
    ],
    points: ["Earlier Capex", "DSCR Breach Quantified", "Availability and Residual Effects", "Layered Mitigants"],
    link: "#/case/builder"
  },
  {
    id: "bq-guarantee",
    cat: "degradation",
    q: "How does a battery performance guarantee protect lenders, and what are its limits?",
    answer: [
      "Guarantees commit the provider to restore capacity or pay compensation when SOH falls below a contracted level, which turns an uncertain capex into a contractual obligation. Lenders treat that as a mitigant, provided the guarantor is creditworthy and the guarantee survives for the debt tenor.",
      "Limits matter just as much. Guarantees usually exclude misuse, cap the provider's total liability and expire after a set number of years or cycles. Credit analysts therefore read the exclusions and check the cap against a realistic replacement cost, then ask what happens if the guarantor itself fails."
    ],
    points: ["Turns Capex Into an Obligation", "Guarantor Credit Quality", "Exclusions and Caps", "Duration Versus Debt Tenor"],
    link: "#/study/investing"
  },
  {
    id: "bq-data",
    cat: "degradation",
    q: "Which battery data would you monitor after financial close?",
    answer: [
      "State of health comes first, together with energy throughput and equivalent full cycles, since those determine warranty status and replacement timing. Operating conditions follow, especially temperature, charging power and depth of discharge, because they explain why one bus ages faster than another.",
      "Commercially, I would track availability and energy consumption per kilometre against the business plan. Comparing actual SOH with the modelled curve each quarter gives early warning, which is exactly the use case Neot describes in its partnership with LinkByCar."
    ],
    points: ["SOH and Cycles", "Operating Conditions", "Availability and Consumption", "Actual Versus Plan"],
    link: "#/study/mobility"
  },
  {
    id: "bq-sizing",
    cat: "debt",
    q: "How does a mid-life battery replacement change debt sizing?",
    answer: [
      "Replacement capex is lumpy, so an annuity profile leaves one year with very weak coverage while the rest look comfortable. Lenders size on the minimum DSCR, which means that single year can cap the whole loan.",
      "Three tools fix it. Sculpting lowers debt service in the replacement year, a reserve funded from earlier cash flows spreads the cost, and a manufacturer or Battery-as-a-Service guarantee can remove the capex altogether. Debt tenor is also usually kept within the first battery's life unless replacement funding is secured."
    ],
    points: ["Lumpy Capex Hits Minimum DSCR", "Sculpting", "Replacement Reserve", "Tenor Within Battery Life"],
    link: "#/formulas"
  },
  {
    id: "bq-capex",
    cat: "debt",
    q: "Should a battery replacement be treated as capex or opex, and how does it flow through the model?",
    answer: [
      "Accounting treats a replacement pack as capital expenditure, so it is capitalised and depreciated over its own useful life rather than expensed. Within the cash flows, it appears as maintenance capex, which reduces CFADS in the year it is paid unless a reserve already holds the money.",
      "Taxable income therefore falls gradually through depreciation, while cash falls all at once. Such a mismatch explains why lenders focus on how the replacement is funded, not just on its total cost."
    ],
    points: ["Capitalised, Not Expensed", "Depreciated Over Battery Life", "Reduces CFADS When Paid", "Cash Versus Tax Timing"],
    link: "#/formulas"
  },
  {
    id: "bq-reserve",
    cat: "debt",
    q: "How would you size a battery replacement reserve?",
    answer: [
      "Starting from the expected replacement cost and date, I would set equal annual contributions that, together with interest earned, build the full amount by the replacement year. Taking a €120,000 pack in eight years with 3% interest, contributions come to about €13,500 per bus per year, against €15,000 with no interest.",
      "Most structures fund the reserve after senior debt service and before distributions, so it reduces equity cash flow rather than the DSCR. Some lenders also require the reserve to be on target before any dividend is paid."
    ],
    points: ["Sinking-Fund Logic", "Worked Figure", "Position in the Waterfall", "Distribution Condition"],
    link: "#/formulas"
  },
  {
    id: "bq-tenor",
    cat: "debt",
    q: "Should debt tenor extend beyond the first battery's expected life?",
    answer: [
      "Generally not. Repaying the loan within the first battery's life means lenders never rely on a replacement that may cost more or arrive earlier than planned, and it leaves a tail for equity to absorb surprises.",
      "Extending tenor is possible when replacement is contractually covered, for example through a performance guarantee or a fully funded reserve. Even then, the tenor should stay within the operator's contract, because a battery that outlives its customer still needs someone to pay for it."
    ],
    points: ["Repay Within First Life", "Exceptions With Guarantees", "Tenor Within Customer Contract"],
    link: "#/study/debt"
  },
  {
    id: "bq-revenue",
    cat: "debt",
    q: "How does battery risk differ under an availability-based lease and a usage-based fee?",
    answer: [
      "Under an availability-based lease, Neot is paid as long as the bus is available, so degradation matters mainly through deductions when a vehicle cannot complete its service. Revenue is stable and supports higher gearing.",
      "Usage-based fees, such as pay-per-use charging or per-kilometre battery fees, tie revenue to how much the asset works. Lower utilisation then reduces CFADS directly, which calls for lower leverage, minimum payment clauses or a cushion above the DSCR covenant."
    ],
    points: ["Availability Stabilises Revenue", "Deductions for Unavailability", "Usage Exposes Volume Risk", "Leverage Response"],
    link: "#/discussion"
  },
  {
    id: "bq-underwrite-rv",
    cat: "residual",
    q: "How would you underwrite the residual value of a used bus battery?",
    answer: [
      "Starting from the expected SOH at the end of the lease, I would value the remaining kWh at a second-life price, for instance in stationary storage, and compare that with the recycling value of the materials. Taking the lower figure, then applying a haircut, gives a conservative base case.",
      "Contract support improves the number. Securing a manufacturer buy-back or a committed second-life offtake turns an estimate into an obligation, which lenders credit far more readily than a market assumption."
    ],
    points: ["SOH at Lease End", "Second-Life Versus Recycling", "Conservative Haircut", "Buy-Back or Offtake"],
    link: "#/formulas"
  },
  {
    id: "bq-eol",
    cat: "residual",
    q: "What does end-of-life optimisation mean for a battery?",
    answer: [
      "End-of-life optimisation means extracting the most value once a pack no longer suits transport use. Refurbishing modules or redeploying the pack as stationary storage, for example at a depot, extends its life before recycling recovers the materials.",
      "Regulation supports this. Under the EU Battery Regulation, a digital battery passport becomes mandatory for electric vehicle batteries from February 2027, recording history and health in a way that should make second-life pricing more transparent."
    ],
    points: ["Refurbishment and Second Life", "Recycling Last", "EU Battery Passport", "Better Price Transparency"],
    link: "#/study/mobility"
  },
  {
    id: "bq-lenders-rv",
    cat: "residual",
    q: "Why do lenders give little credit to battery residual value?",
    answer: [
      "Lenders want repayment from contracted cash flows, and second-life markets for large transport batteries are still young, so prices are hard to observe. Technology also improves quickly, which can push down the value of older packs.",
      "Typically, residual value therefore sits with equity: debt amortises within the contract, and any upside or shortfall at expiry lands on Neot. Removing the 15% residual value in the truck case cuts equity IRR from 10.0% to about 6.4%, which shows why equity insists on buy-backs."
    ],
    points: ["Thin Second-Hand Market", "Technology Risk", "Residual Sits With Equity", "Quantified Impact"],
    link: "#/case/timed"
  },
  {
    id: "bq-allocation",
    cat: "contracts",
    q: "Who should bear battery degradation risk: the operator, Neot or the manufacturer?",
    answer: [
      "Each risk belongs with the party best able to control it. Manufacturing defects and chemistry-driven ageing sit with the manufacturer through its warranty, passed through to Neot back to back. Usage-driven wear sits with the operator through limits on cycles, charging power and depot temperature.",
      "Neot keeps what remains, mainly residual value and any gap between the warranty and actual performance. Pricing the Battery-as-a-Service fee then reflects exactly that retained risk."
    ],
    points: ["Control Principle", "Manufacturer Warranty Back to Back", "Operator Usage Limits", "Residual Risk Priced In"],
    link: "#/study/investing"
  },
  {
    id: "bq-contract",
    cat: "contracts",
    q: "Which clauses would you want in a Battery-as-a-Service contract to protect Neot?",
    answer: [
      "Usage covenants come first, setting limits on cycles, charging power and operating temperature, together with a right to battery data. Payment protection follows, through a minimum fee and early-termination compensation that covers outstanding debt.",
      "Finally, Neot needs rights over the asset itself: ownership of the pack, repossession on default and the freedom to redeploy or sell it at end of life. Back-to-back warranties from the manufacturer then align Neot's obligations with its own protection."
    ],
    points: ["Usage Covenants and Data Access", "Minimum Fee", "Termination Compensation", "Ownership and Back-to-Back Warranty"],
    link: "#/study/investing"
  },
  {
    id: "bq-retrofit",
    cat: "contracts",
    q: "Which risks are specific to Retrofit-as-a-Service?",
    answer: [
      "Converting a diesel vehicle adds integration risk, because a new battery and drivetrain must work reliably in an older chassis and pass homologation. Remaining chassis life also matters, since a battery that outlives the vehicle it sits in has limited value.",
      "Neot's offer addresses this with battery integration, performance guarantees and long-term asset monitoring. Underwriting would focus on the installer's track record, the chassis inspection and a tenor matched to the shorter of chassis and battery life."
    ],
    points: ["Integration and Homologation", "Chassis Life Versus Battery Life", "Guarantees and Monitoring", "Tenor Matching"],
    link: "#/neot"
  },
  {
    id: "bq-calc-eol",
    cat: "numbers",
    q: "Suppose a 400 kWh pack loses 2.5% of its capacity each year, compounding. When does it reach an 80% state of health?",
    answer: [
      "Solving 0.975 to the power of t equals 0.80 gives t equals ln 0.80 divided by ln 0.975, which is about 8.8 years. Assuming a linear loss of 2.5 points a year would give exactly 8 years, so the compounding convention moves replacement by almost a year.",
      "Usable capacity at that point is 320 kWh. Before relying on that date, I would check whether 320 kWh still covers the longest daily route with a safety margin, because range sometimes forces replacement before the warranty threshold."
    ],
    points: ["Logarithm Method", "8.8 Years", "Linear Comparison", "Range Check"],
    link: "#/formulas"
  },
  {
    id: "bq-calc-cycles",
    cat: "numbers",
    q: "Suppose a 400 kWh pack delivers 300 kWh a day. How many full cycles is that a year, and how long until a 4,000-cycle warranty limit?",
    answer: [
      "Each day uses 300 divided by 400, or 0.75 equivalent full cycles, which comes to about 274 cycles over 365 days. Reaching 4,000 cycles would therefore take roughly 14.6 years.",
      "Here the calendar limit, typically eight to twelve years, binds first. Running double shifts at 1.5 cycles a day would instead hit the cycle limit in about 7.3 years, so duty cycle decides which warranty term matters."
    ],
    points: ["0.75 Cycles per Day", "274 Cycles per Year", "14.6 Years", "Calendar Versus Cycle Limit"],
    link: "#/formulas"
  },
  {
    id: "bq-calc-fee",
    cat: "numbers",
    q: "Price an eight-year Battery-as-a-Service fee for a €120,000 pack with a €12,000 residual value at a 6% required return.",
    answer: [
      "Discounting the residual value gives 12,000 divided by 1.06 to the power of 8, or about €7,500. Recovering the remaining €112,500 over eight years at 6% means multiplying by the annuity factor of 0.161, which gives an annual fee of about €18,100.",
      "Spread over 60,000 kilometres a year, that is roughly €0.30 per kilometre. Comparing it with the operator's fuel saving shows quickly whether the offer is attractive."
    ],
    points: ["Discount the Residual Value", "Annuity Factor", "€18,100 per Year", "€0.30 per Kilometre"],
    link: "#/formulas"
  },
  {
    id: "bq-calc-debt",
    cat: "numbers",
    q: "Suppose a fleet generates flat CFADS of €2.6 million a year. How much eight-year debt can it support at a 1.30x DSCR and 5% interest?",
    answer: [
      "Permitted debt service is 2.6 divided by 1.30, or €2.0 million a year. Multiplying by the eight-year annuity factor at 5%, about 6.463, gives maximum debt of roughly €12.9 million.",
      "Introducing a battery replacement in one of those years would cut that year's CFADS, and with an annuity profile the whole loan would shrink to match the weakest year. Sculpting or a reserve would recover most of the capacity."
    ],
    points: ["Debt Service Equals CFADS Over DSCR", "Annuity Factor 6.463", "€12.9 Million", "Effect of a Replacement Year"],
    link: "#/formulas"
  },
  {
    id: "bq-calc-reserve",
    cat: "numbers",
    q: "Forty buses each need a €120,000 battery in Year 8. What annual reserve contribution is required if the account earns 3%?",
    answer: [
      "Equal contributions growing at 3% for eight years accumulate 8.892 times the annual payment. Dividing €120,000 by 8.892 gives about €13,500 per bus, or roughly €540,000 a year for the fleet.",
      "Without interest the figure would be €15,000 per bus, or €600,000 a year. Either way, those amounts come out of equity distributions, which lowers early returns but protects the minimum DSCR."
    ],
    points: ["Future Value Annuity Factor", "€13,500 per Bus", "€540,000 for the Fleet", "Effect on Distributions"],
    link: "#/formulas"
  },
  {
    id: "bq-calc-rv",
    cat: "numbers",
    q: "What is a 400 kWh pack at 75% state of health worth if second-life storage pays €40 per kWh?",
    answer: [
      "Usable capacity is 400 multiplied by 0.75, or 300 kWh, and at €40 per kWh the pack is worth about €12,000. Against a new cost of around €120,000, that is roughly 10% of the original price.",
      "Lenders would probably haircut that further or ignore it entirely, so it supports equity returns rather than debt capacity. Agreeing a manufacturer buy-back at a fixed price would make the figure bankable."
    ],
    points: ["300 Usable kWh", "€12,000", "About 10% of Cost", "Bankability Through Buy-Back"],
    link: "#/formulas"
  },
  {
    id: "bq-calc-energy",
    cat: "numbers",
    q: "Suppose an electric bus uses 1.2 kWh per kilometre at €0.20 per kWh, against 0.35 litres of diesel at €1.60. What is the annual saving over 60,000 kilometres?",
    answer: [
      "Electric running costs €0.24 per kilometre, while diesel costs €0.56, a saving of €0.32 per kilometre. Over 60,000 kilometres, that is about €19,200 a year in energy alone.",
      "Adding lower maintenance improves the gap further, yet the purchase premium still has to be repaid. Dividing that premium by the saving per kilometre gives the breakeven distance, which explains why high-mileage routes electrify first."
    ],
    points: ["€0.24 Versus €0.56 per km", "€19,200 a Year", "Maintenance Savings", "Breakeven Distance"],
    link: "#/formulas"
  },
  {
    id: "bq-fr-soh",
    cat: "fr",
    q: "Comment intégreriez-vous la dégradation des batteries dans un modèle de financement de projet ?",
    answer: [
      "Concrètement, je construirais d'abord une courbe d'état de santé à partir des données du constructeur et du profil d'utilisation, en distinguant le vieillissement calendaire et le vieillissement lié aux cycles. Chaque année, je vérifierais que la capacité utile couvre encore la ligne la plus longue, puis je placerais le remplacement l'année où le seuil de fin de vie est atteint.",
      "Ensuite, je testerais des courbes plus pessimistes, car la température et la puissance de charge accélèrent l'usure. Comparer ces scénarios à la courbe garantie montre la part du risque réellement transférée au constructeur et celle conservée par Neot."
    ],
    points: ["Courbe d'état de santé", "Contrôle de l'autonomie", "Date de remplacement", "Sensibilités et garantie"],
    link: "#/lexicon"
  },
  {
    id: "bq-fr-baas",
    cat: "fr",
    q: "Qu'apporte l'offre Battery-as-a-Service de Neot à un opérateur ?",
    answer: [
      "Avant tout, elle dissocie la batterie du véhicule : l'opérateur paie une redevance au lieu d'acheter l'élément le plus coûteux du bus. Neot fournit la batterie avec une garantie de performance, optimise sa fin de vie et apporte son expertise technique.",
      "Grâce à cette offre, l'opérateur réduit son investissement initial et transfère le risque de dégradation à un spécialiste. Avec Forsee Power parmi ses actionnaires, Neot dispose d'une connaissance fine des batteries pour évaluer et tarifer ce risque."
    ],
    points: ["Batterie dissociée du véhicule", "Garantie de performance", "Fin de vie optimisée", "Expertise de Forsee Power"],
    link: "#/lexicon"
  }
];

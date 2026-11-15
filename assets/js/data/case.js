/* Modelling Case Content */
window.Guide = window.Guide || {};

/* Downloadable Practice Workbooks */
Guide.caseFiles = {
  busTemplate: { href: "assets/files/Bus Lease Case - Template.xlsx", label: "Bus Lease Template" },
  busSolution: { href: "assets/files/Bus Lease Case - Solution.xlsx", label: "Bus Lease Solution" },
  truckTemplate: { href: "assets/files/Truck Lease Case - Template.xlsx", label: "Truck Lease Template" },
  truckSolution: { href: "assets/files/Truck Lease Case - Solution.xlsx", label: "Truck Lease Solution" }
};

/* Forty-Five-Minute Plan */
Guide.casePlan = [
  { from: 0, to: 5, title: "Read and Plan", text: "Read the whole brief once, underline every number and write the list of outputs requested. Sketch the row order on paper before touching Excel." },
  { from: 5, to: 10, title: "Inputs and Timeline", text: "Type every input on one sheet in blue with units, then build the year row and the lease and debt flags." },
  { from: 10, to: 30, title: "Core Calculations", text: "Work down the page in cash flow order: capex and funding, operations, depreciation and tax, the debt schedule, then CFADS and DSCR." },
  { from: 30, to: 38, title: "Returns and Checks", text: "Build equity and project cash flows, calculate both IRRs and the minimum DSCR, then confirm the debt is fully repaid." },
  { from: 38, to: 43, title: "Solve and Sensitise", text: "Run Goal Seek or a data table for the question asked, and note the two or three numbers you will quote in the debrief." },
  { from: 43, to: 45, title: "Tidy and Save", text: "Add a short summary box with the answer and key assumptions, then save the file under a clear name." }
];

/* Guided Model Builder Steps on the Bus Lease Case */
Guide.builderSteps = [
  {
    id: "flags",
    phase: "Timeline",
    title: "Lease and Debt Flags",
    targets: [
      { cell: "D6", fill: true },
      { cell: "D7", fill: true }
    ],
    ask: "Build the two period flags in D6 and D7. Each should return 1 in every year the lease or the debt is running and 0 otherwise.",
    hint: "Combine IF with AND, comparing the year in D5 with the lease term in Inputs!B10 and the debt tenor in Inputs!B20. Anchor both input cells with $ signs, for example Inputs!$B$10, so the formula survives copying across.",
    explain: "Flags let one formula work in every column. Testing whether the year sits between 1 and the ten-year term drives the lease flag, while the debt flag uses the nine-year tenor, so Year 10 carries no debt."
  },
  {
    id: "index",
    phase: "Timeline",
    title: "Indexation Factor",
    targets: [{ cell: "D8", fill: true }],
    ask: "Calculate the indexation factor in D8, returning zero outside the lease.",
    hint: "Raise 1 plus the indexation rate in Inputs!B13 to the power of the year minus 1, inside an IF that tests the lease flag in D6.",
    explain: "Year 1 carries no uplift, so the factor equals 1.0000 before growing by 2% a year to 1.1951 in Year 10. Rent and costs both multiply by this one row."
  },
  {
    id: "capex",
    phase: "Capex and Funding",
    title: "Capital Expenditure",
    targets: [{ cell: "C10" }, { cell: "C11" }, { cell: "C12" }],
    ask: "Calculate bus capex in C10, charger capex in C11 and their total in C12.",
    hint: "Multiply each count on the Inputs sheet by its unit price, for example Inputs!$B$5*Inputs!$B$6, then add the two rows together in C12.",
    explain: "Forty buses at €0.50m cost €20.0m and twenty chargers at €0.10m cost €2.0m, so total capex reaches €22.0m."
  },
  {
    id: "revenue",
    phase: "Operations",
    title: "Revenue and Costs",
    targets: [
      { cell: "D14", fill: true },
      { cell: "D15", fill: true }
    ],
    ask: "Calculate lease revenue in D14 and operating costs in D15, showing costs as a negative number.",
    hint: "Multiply the Year-1 rent in Inputs!B11 and the Year-1 costs in Inputs!B12 by the indexation factor in row 8. Placing a minus sign in front of the cost formula makes it an outflow.",
    explain: "Revenue starts at €3.10m and grows with indexation. Showing costs as negative numbers turns every subtotal into a simple sum."
  },
  {
    id: "ebitda",
    phase: "Operations",
    title: "EBITDA",
    targets: [{ cell: "D16", fill: true }],
    ask: "Calculate EBITDA in D16.",
    hint: "Add revenue in D14 to the negative operating costs in D15.",
    explain: "Year 1 EBITDA equals €3.10m less €0.20m, which gives €2.90m."
  },
  {
    id: "depreciation",
    phase: "Operations",
    title: "Depreciation",
    targets: [{ cell: "D17", fill: true }],
    ask: "Calculate depreciation in D17 on a straight-line basis over the lease term down to zero, shown as a negative number.",
    hint: "Divide total capex in C12 by the term in Inputs!B10, then multiply by the lease flag. Write $C$12 rather than C12, otherwise copying right points at empty cells.",
    explain: "Dividing €22.0m by ten years gives €2.2m a year. Anchoring $C$12 is what keeps every year pointing at the same capex figure."
  },
  {
    id: "residual",
    phase: "Operations",
    title: "Residual Value",
    targets: [{ cell: "D18", fill: true }],
    ask: "Bring in the residual value in D18, received in the final lease year only.",
    hint: "Use IF to test whether the year in D5 equals the term in Inputs!B10, then apply the residual percentage in Inputs!B14 to total capex in $C$12. Return 0 in every other year.",
    explain: "Ten percent of €22.0m gives €2.2m in Year 10 and nothing before. Because the fleet is fully depreciated by then, the whole amount is taxable later in the model."
  },
  {
    id: "drawdown",
    phase: "Capex and Funding",
    title: "Debt Drawdown",
    targets: [{ cell: "C20" }, { cell: "C24" }],
    ask: "Calculate the debt drawn at financial close in C20, then set the Year 0 closing balance in C24 equal to it.",
    hint: "Apply the gearing in Inputs!B18 to total capex in C12. Year 0's closing balance simply links to C20.",
    explain: "Seventy percent of €22.0m gives €15.4m of debt, leaving €6.6m for equity. Year 0's closing balance then becomes the opening balance of Year 1."
  },
  {
    id: "interest",
    phase: "Senior Debt",
    title: "Opening Balance and Interest",
    targets: [{ cell: "D21" }, { cell: "D22" }],
    ask: "Start Year 1 of the debt schedule: link the opening balance in D21 to the previous closing balance, then calculate interest in D22.",
    hint: "Opening balance points to C24. Interest multiplies the opening balance by the rate in Inputs!B19 and by the debt flag in D7.",
    explain: "Interest of €0.693m is 4.5% of €15.4m. Calculating interest on the opening balance keeps the model free of circular references."
  },
  {
    id: "principal",
    phase: "Senior Debt",
    title: "Principal Repayment",
    targets: [{ cell: "D23" }],
    ask: "Calculate principal repayment in D23 for a nine-year annuity.",
    hint: "PMT returns the constant annual payment from the rate in Inputs!B19, the tenor in Inputs!B20 and the drawdown entered as a negative, written -$C$20. Subtract interest in D22, and wrap the result in IF with the debt flag in D7.",
    explain: "PMT returns €2.119m a year. Principal is that payment minus interest, so it starts at €1.426m and rises as interest falls."
  },
  {
    id: "closing",
    phase: "Senior Debt",
    title: "Closing Balance and Debt Service",
    targets: [{ cell: "D24" }, { cell: "D25" }],
    ask: "Complete Year 1 with the closing balance in D24 and total debt service in D25.",
    hint: "Closing balance equals the opening balance minus principal. Debt service adds interest and principal.",
    explain: "Debt falls to €13.974m after Year 1, while debt service stays constant at €2.119m, as an annuity should."
  },
  {
    id: "copyDebt",
    phase: "Senior Debt",
    title: "Copy the Schedule Across",
    action: { label: "Fill D21:D25 Right", rows: [21, 22, 23, 24, 25], from: "D" },
    ask: "Copy the Year 1 debt schedule in D21 to D25 across to Year 10.",
    hint: "Excel users select D21:M25 and press Ctrl+R, or Ctrl+D in French Excel. Every input reference needs its $ signs for the copy to work.",
    explain: "Once copied, the balance reaches exactly zero in Year 9 and Year 10 shows no debt service. Such a zero balance is the first check worth building into any model."
  },
  {
    id: "tax",
    phase: "Tax and Cash Flows",
    title: "Taxable Income and Tax",
    targets: [
      { cell: "D27", fill: true },
      { cell: "D28", fill: true }
    ],
    ask: "Calculate taxable income in D27 and tax paid in D28, with no relief for tax losses.",
    hint: "Taxable income adds EBITDA, the negative depreciation and the residual value, then deducts interest. Tax applies the rate in Inputs!B16 inside -MAX(0, …), so it can never turn into a refund.",
    explain: "Year 1 taxable income is only €0.007m, because depreciation and interest absorb most of the EBITDA. MAX floors tax at zero, since the brief allows no loss carry-forward."
  },
  {
    id: "cfads",
    phase: "Tax and Cash Flows",
    title: "CFADS and DSCR",
    targets: [
      { cell: "D30", fill: true },
      { cell: "D31", fill: true }
    ],
    ask: "Calculate CFADS in D30 and the DSCR in D31, returning a blank once the debt is repaid.",
    hint: "CFADS adds EBITDA and the negative tax paid. Dividing CFADS by debt service inside IF(D25>0, …, \"\") gives the DSCR.",
    explain: "Year 1 coverage is 1.37x. Returning a blank in Year 10 stops MIN from reporting a false minimum of zero."
  },
  {
    id: "equity",
    phase: "Tax and Cash Flows",
    title: "Equity Cash Flows",
    targets: [{ cell: "C32" }, { cell: "D32", fill: true }],
    ask: "Build equity cash flows: the investment in C32, then the annual flows from D32.",
    hint: "Year 0 equals minus total capex plus the debt drawdown. From Year 1, take CFADS, deduct debt service and add the residual value.",
    explain: "Shareholders invest €6.6m and receive €4.799m in Year 10, which includes the residual value with no debt service left to pay."
  },
  {
    id: "project",
    phase: "Tax and Cash Flows",
    title: "Project Cash Flows",
    targets: [{ cell: "C33" }, { cell: "D33", fill: true }],
    ask: "Build unlevered project cash flows in C33 and from D33, recalculating tax without any interest deduction.",
    hint: "Year 0 is minus total capex. From Year 1, take EBITDA, deduct MAX(0, (EBITDA + depreciation + residual value) × the tax rate in Inputs!$B$16), then add the residual value.",
    explain: "Unlevered tax is higher because there is no interest deduction, which is why the project row recomputes tax instead of reusing row 28."
  },
  {
    id: "returns",
    phase: "Returns and Checks",
    title: "Returns",
    targets: [{ cell: "C36" }, { cell: "C37" }, { cell: "C40" }],
    ask: "Calculate equity IRR in C36, project IRR in C37 and the equity multiple in C40.",
    hint: "Apply IRR to each cash flow row from column C to column M. Dividing the sum of the Year 1 to Year 10 equity flows by the Year 0 investment, made positive, gives the multiple.",
    explain: "Equity IRR reaches 10.76% against a 6.30% project IRR, and the equity multiple comes to 1.94x."
  },
  {
    id: "coverage",
    phase: "Returns and Checks",
    title: "Coverage and Checks",
    targets: [{ cell: "C38" }, { cell: "C39" }, { cell: "C41" }],
    ask: "Summarise coverage with the minimum DSCR in C38 and the average in C39, then confirm in C41 that the debt is fully repaid.",
    hint: "MIN and AVERAGE over D31:M31 skip the blank in Year 10. Linking the check to the final closing balance in M24 completes the step.",
    explain: "Minimum coverage of 1.37x falls in Year 1, and a zero in C41 confirms the debt schedule works."
  },
  {
    id: "whyDscr",
    phase: "Insights",
    type: "choice",
    title: "Reading the DSCR Profile",
    ask: "Minimum DSCR occurs in Year 1. Why?",
    options: [
      "Indexation lifts CFADS every year while the annuity keeps debt service flat.",
      "Interest is highest in Year 1, so total debt service peaks in Year 1.",
      "Tax is highest in Year 1 because depreciation has not started yet.",
      "Residual value is only received in Year 10."
    ],
    explain: "Annuity debt service is constant by construction, so the ratio can only move with CFADS. Indexed rent grows CFADS by roughly 1% a year net of tax, so coverage is weakest in Year 1. Flat rent in the Truck Lease case reverses the pattern."
  },
  {
    id: "whyIrr",
    phase: "Insights",
    type: "choice",
    title: "Equity Versus Project Returns",
    ask: "Equity IRR of 10.8% sits well above project IRR of 6.3%. Why?",
    options: [
      "Debt costs about 3.4% after tax, below the project return, so leverage lifts the equity return.",
      "Equity investors receive the residual value while lenders do not.",
      "Project IRR ignores tax while equity IRR includes it.",
      "Equity IRR excludes the capex paid in Year 0."
    ],
    explain: "Interest at 4.5% is tax deductible at 25%, so debt effectively costs 3.375%. Borrowing below the 6.3% project return transfers the surplus to shareholders, which is the essence of positive leverage."
  }
];

/* Truck Lease Pricing Case for Timed Practice */
Guide.timedCase = {
  minutes: 45,
  brief: {
    en: {
      title: "Electric Truck Lease Pricing",
      context: "Neot e-motion has been asked to finance 25 electric trucks and 10 depot chargers for a regional logistics operator. Neot will own the assets and lease them to the operator for seven years in exchange for a fixed annual rent. Senior debt will fund part of the investment, and the investment team must propose the rent to the committee.",
      tasks: [
        "Build a timeline from Year 0 to Year 7 with lease and debt period flags.",
        "Calculate capex together with the debt and equity funding at financial close.",
        "Model lease revenue and operating costs, then depreciation down to the residual value and tax.",
        "Build the debt schedule for a six-year annuity, then calculate CFADS and the DSCR.",
        "Calculate equity and project cash flows together with both IRRs.",
        "Solve the annual rent that delivers a 10% equity IRR, check the 1.20x covenant and express the rent per truck per month.",
        "Build a data table of equity IRR across rents of €1.30m to €1.45m and residual values of 0%, 15% and 25%.",
        "Write a three-line recommendation for the investment committee."
      ],
      rules: "Work alone in Excel for 45 minutes. State any assumption the brief does not cover, and prioritise a correct core model over formatting."
    },
    fr: {
      title: "Tarification d'un bail de camions électriques",
      context: "Neot e-motion doit financer 25 camions électriques et 10 bornes de recharge en dépôt pour un transporteur régional. Neot restera propriétaire des actifs et les louera à l'opérateur pendant sept ans contre un loyer annuel fixe. Financé en partie par une dette senior, cet investissement nécessite que l'équipe propose le loyer au comité d'investissement.",
      tasks: [
        "Construire une frise chronologique de l'année 0 à l'année 7 avec des indicateurs de période de bail et de dette.",
        "Calculer les investissements ainsi que le financement en dette et en fonds propres au closing.",
        "Modéliser les loyers et les coûts d'exploitation, puis l'amortissement jusqu'à la valeur résiduelle et l'impôt.",
        "Construire l'échéancier d'une dette amortissable en six annuités constantes, puis calculer les flux disponibles et le DSCR.",
        "Calculer les flux revenant aux actionnaires et au projet, ainsi que les deux TRI.",
        "Déterminer le loyer annuel offrant un TRI fonds propres de 10 %, vérifier le covenant de 1,20x et exprimer le loyer par camion et par mois.",
        "Construire une table de données du TRI fonds propres pour des loyers de 1,30 à 1,45 M€ et des valeurs résiduelles de 0 %, 15 % et 25 %.",
        "Rédiger une recommandation de trois lignes pour le comité d'investissement."
      ],
      rules: "Travaillez seule sur Excel pendant 45 minutes. Précisez toute hypothèse non couverte par l'énoncé et privilégiez un modèle juste plutôt qu'une mise en forme soignée."
    }
  },

  /* Self-Check Targets From the Excel Solution */
  checks: [
    { id: "capex", label: "Total Capex", unit: "eur", value: 7.0 },
    { id: "debt", label: "Debt Drawn at Close", unit: "eur", value: 4.55 },
    { id: "ds", label: "Annual Debt Service", unit: "eur", value: 0.896429 },
    { id: "rent", label: "Rent for a 10% Equity IRR", unit: "eur", value: 1.372096 },
    { id: "minDscr", label: "Minimum DSCR at That Rent", unit: "x", value: 1.316247 },
    { id: "projectIrr", label: "Project IRR at That Rent", unit: "pct", value: 0.066512 },
    { id: "perTruck", label: "Rent per Truck per Month", unit: "eur0", value: 4573.65 },
    { id: "table", label: "Equity IRR at €1.40m Rent and 0% Residual Value", unit: "pct", value: 0.07518 }
  ],

  /* Two-Way Data Table Verified in Excel */
  table: {
    rents: [1.3, 1.35, 1.4, 1.45],
    residuals: [0, 0.15, 0.25],
    irr: [
      [0.033853, 0.075664, 0.096404],
      [0.055003, 0.092559, 0.111776],
      [0.07518, 0.109376, 0.127149],
      [0.095015, 0.12612, 0.142524]
    ]
  },

  recommendation: "Recommend leasing the 25 trucks and 10 chargers at €1.37m a year, about €4,600 per truck per month, which delivers the 10% target equity IRR with a minimum DSCR of 1.32x against a 1.20x covenant. Returns depend heavily on the 15% residual value, since equity IRR falls to 6.4% without it. Approval should therefore require a manufacturer buy-back and a review of the operator's credit quality."
};

/* Excel Functions in English and French */
Guide.excelFunctions = [
  { purpose: "Internal Rate of Return", en: "IRR", fr: "TRI", example: "=IRR(C31:J31)", note: "Range must start with the negative Year 0 flow." },
  { purpose: "Return With Exact Dates", en: "XIRR", fr: "TRI.PAIEMENTS", example: "=XIRR(values, dates)", note: "Use when cash flows fall on irregular dates." },
  { purpose: "Net Present Value", en: "NPV", fr: "VAN", example: "=NPV(8%, D31:J31) + C31", note: "Discounts the first value by a full period, so add Year 0 outside." },
  { purpose: "Annuity Payment", en: "PMT", fr: "VPM", example: "=PMT(5%, 6, -4.55)", note: "Enter the loan as a negative to return a positive payment." },
  { purpose: "Interest and Principal Portions", en: "IPMT · PPMT", fr: "INTPER · PRINCPER", example: "=PPMT(5%, 1, 6, -4.55)", note: "Split one annuity payment by period." },
  { purpose: "Floors and Caps", en: "MAX · MIN", fr: "MAX · MIN", example: "=-MAX(0, D26*25%)", note: "Floors tax at zero without loss carry-forward." },
  { purpose: "Conditions and Flags", en: "IF · AND", fr: "SI · ET", example: "=IF(AND(D5>=1, D5<=7), 1, 0)", note: "Flags switch rows on only in the right years." },
  { purpose: "Weighted Totals", en: "SUMPRODUCT", fr: "SOMMEPROD", example: "=SUMPRODUCT(D6:J6, D13:J13)", note: "Multiplies two ranges and sums the result." },
  { purpose: "Lookups", en: "XLOOKUP · INDEX/MATCH", fr: "RECHERCHEX · INDEX/EQUIV", example: "=INDEX(D13:J13, MATCH(3, D5:J5, 0))", note: "Prefer these to VLOOKUP, which breaks when columns move." },
  { purpose: "Monthly Timelines", en: "EDATE · EOMONTH", fr: "MOIS.DECALER · FIN.MOIS", example: "=EOMONTH(C4, 12)", note: "Builds period-end dates for monthly or quarterly models." },
  { purpose: "Error Handling", en: "IFERROR", fr: "SIERREUR", example: "=IFERROR(D29/D24, \"\")", note: "Use sparingly, because it can hide genuine mistakes." }
];

/* Shortcuts With French Excel Differences */
Guide.excelShortcuts = [
  { action: "Edit the Active Cell", en: "F2", fr: "F2" },
  { action: "Cycle Absolute References", en: "F4", fr: "F4" },
  { action: "Recalculate the Workbook", en: "F9", fr: "F9" },
  { action: "Jump to the Edge of a Block", en: "Ctrl + Arrow", fr: "Ctrl + Flèche" },
  { action: "Select to the Edge of a Block", en: "Ctrl + Shift + Arrow", fr: "Ctrl + Maj + Flèche" },
  { action: "Fill Down", en: "Ctrl + D", fr: "Ctrl + B", differs: true },
  { action: "Fill Right", en: "Ctrl + R", fr: "Ctrl + D", differs: true },
  { action: "Bold", en: "Ctrl + B", fr: "Ctrl + G", differs: true },
  { action: "Format Cells", en: "Ctrl + 1", fr: "Ctrl + 1" },
  { action: "Paste Special", en: "Ctrl + Alt + V", fr: "Ctrl + Alt + V" },
  { action: "Undo", en: "Ctrl + Z", fr: "Ctrl + Z" }
];

/* Spot the Error Drill */
Guide.excelDrill = [
  {
    id: "hardcode",
    title: "Hard-Coded Indexation",
    sheet: { cols: ["C", "D", "E"], rows: [[13, "Indexation Input", "", "2.0%", ""], [14, "Lease Revenue", "–", "3.100", "3.162"]], active: "E14" },
    formula: "=D14*1.02",
    q: "What is wrong with the formula in E14?",
    options: [
      "Indexation is typed into the formula instead of linking to the input cell.",
      "D14 should be anchored as $D$14 before copying right.",
      "Revenue should be multiplied by the debt flag.",
      "Nothing, because growing from the prior year is best practice."
    ],
    explain: "Hard-coded numbers inside formulas are invisible to anyone changing the inputs, so a new indexation rate would silently leave this row untouched. Link to the blue input cell instead."
  },
  {
    id: "anchor",
    title: "Missing Anchor",
    sheet: { cols: ["C", "D", "E"], rows: [[21, "Opening Balance", "", "15.400", "13.974"], [22, "Interest", "", "0.693", "0.000"]], active: "E22" },
    formula: "=E21*Inputs!C19",
    q: "Interest in Year 2 shows zero. Why?",
    options: [
      "Copying right moved the input reference, because Inputs!B19 was not anchored as Inputs!$B$19.",
      "Interest should be calculated on the closing balance.",
      "Interest also needs the debt flag.",
      "Year 2 interest is genuinely zero under an annuity."
    ],
    explain: "Copying =D21*Inputs!B19 one column right shifts the input reference to Inputs!C19, which is empty. Pressing F4 while editing adds the dollar signs that lock the reference."
  },
  {
    id: "npv",
    title: "NPV Timing",
    sheet: { cols: ["C", "D", "E"], rows: [[32, "Equity Cash Flow", "(6.600)", "0.780", "0.807"], [35, "Equity NPV at 8%", "1.017", "", ""]], active: "C35" },
    formula: "=NPV(8%,C32:M32)",
    q: "What is wrong with this NPV?",
    options: [
      "NPV discounts the first value by a full period, so the Year 0 investment is wrongly discounted.",
      "Equity cash flows should be discounted at the cost of debt.",
      "NPV cannot handle negative values.",
      "Stopping the range at Year 9 would fix it."
    ],
    explain: "Excel's NPV assumes the first value arrives one period from today. Writing =NPV(8%, D32:M32) + C32 leaves Year 0 undiscounted and raises the NPV from €1.017m to €1.098m."
  },
  {
    id: "irr",
    title: "IRR Range",
    sheet: { cols: ["C", "D", "M"], rows: [[32, "Equity Cash Flow", "(6.600)", "0.780", "4.799"], [36, "Equity IRR", "#NUM!", "", ""]], active: "C36" },
    formula: "=IRR(D32:M32)",
    q: "Why does the equity IRR return #NUM!?",
    options: [
      "Omitting the negative Year 0 investment leaves cash flows that never change sign.",
      "IRR needs a guess argument to converge.",
      "Equity cash flows are too small for IRR.",
      "IRR only works on monthly cash flows."
    ],
    explain: "IRR needs at least one negative and one positive value. Starting the range at column C includes the €6.6m investment and returns 10.76%."
  },
  {
    id: "pmt",
    title: "PMT Sign",
    sheet: { cols: ["C", "D", "E"], rows: [[25, "Debt Service", "", "(2.119)", "(2.119)"], [31, "DSCR", "", "(1.37x)", "(1.38x)"]], active: "D25" },
    formula: "=PMT(Inputs!$B$19,Inputs!$B$20,$C$20)",
    q: "Why have debt service and the DSCR turned negative?",
    options: [
      "PMT returns a negative payment when the loan is entered as a positive value.",
      "Annual rates must be divided by 12.",
      "CFADS is negative in every year.",
      "Rate and tenor arguments are in the wrong order."
    ],
    explain: "Excel treats the loan as money received and the payment as money paid, so signs are opposite. Entering the loan as −$C$20 returns a positive payment of €2.119m."
  },
  {
    id: "circular",
    title: "Circular Interest",
    sheet: { cols: ["C", "D", "E"], rows: [[22, "Interest", "", "0.000", "0.000"], [24, "Closing Balance", "15.400", "15.400", "15.400"]], active: "D22" },
    formula: "=D24*Inputs!$B$19",
    q: "Excel warns about a circular reference. What caused it?",
    options: [
      "Interest uses the closing balance, which depends on principal and therefore on interest itself.",
      "Anchoring the interest rate input causes it.",
      "Closing balance links forward to the next year.",
      "Interest should be multiplied by the lease flag."
    ],
    explain: "Closing balance depends on principal, principal depends on interest, and interest now depends on the closing balance. Calculating interest on the opening balance breaks the loop."
  },
  {
    id: "taxfloor",
    title: "Tax Without a Floor",
    sheet: { cols: ["C", "D", "E"], rows: [[27, "Taxable Income", "", "(0.200)", "(0.080)"], [28, "Tax Paid", "", "0.050", "0.020"]], active: "D28" },
    formula: "=-D27*Inputs!$B$16",
    q: "Given that the brief allows no loss carry-forward, what is wrong with tax paid?",
    options: [
      "Without MAX, a loss produces a tax refund the brief does not allow.",
      "Tax should be calculated on EBITDA.",
      "Tax should be positive in the model.",
      "Anchoring the tax rate input is the problem."
    ],
    explain: "Negative taxable income multiplied by the tax rate creates a positive cash inflow. Writing =-MAX(0, D27*Inputs!$B$16) floors tax at zero."
  },
  {
    id: "mindscr",
    title: "False Minimum DSCR",
    sheet: { cols: ["C", "L", "M"], rows: [[31, "DSCR", "", "1.47x", "0.00x"], [38, "Minimum DSCR", "0.00x", "", ""]], active: "C38" },
    formula: "=MIN(D31:M31)",
    q: "Minimum DSCR shows 0.00x although coverage never falls below 1.37x. Why?",
    options: [
      "Year 10 has no debt, and the DSCR formula returns zero instead of a blank, so MIN picks it up.",
      "MIN ignores the first year of the range.",
      "Debt service is negative in Year 10.",
      "Averaging the DSCR would be more appropriate."
    ],
    explain: "Formulas like =IFERROR(M30/M25, 0) turn the debt-free year into a zero. Returning \"\" instead, as in =IF(M25>0, M30/M25, \"\"), keeps MIN focused on real coverage."
  },
  {
    id: "units",
    title: "Mixed Units",
    sheet: { cols: ["B", "C", "D"], rows: [[6, "Price per Bus", "500", "", ""], [12, "Total Capex", "20,002.000", "", ""]], active: "C12" },
    formula: "=Inputs!$B$5*Inputs!$B$6+Inputs!$B$7*Inputs!$B$8",
    q: "Total capex shows €20,002m. What went wrong?",
    options: [
      "Typing the bus price in € thousands clashes with a model built in € millions.",
      "Bus numbers are wrong.",
      "Charger capex should be excluded.",
      "Addition replaced multiplication in the formula."
    ],
    explain: "Units must be stated beside every input and kept consistent. Entering the price as 0.50 in € millions restores total capex of €22.0m."
  },
  {
    id: "equitysign",
    title: "Equity Sign",
    sheet: { cols: ["C", "D", "E"], rows: [[32, "Equity Cash Flow", "6.600", "0.780", "0.807"], [36, "Equity IRR", "#NUM!", "", ""]], active: "C32" },
    formula: "=C12-C20",
    q: "What is wrong with the Year 0 equity cash flow?",
    options: [
      "Equity invested must be an outflow, but the formula records it as an inflow.",
      "Equity should equal total capex.",
      "Debt should be added rather than subtracted.",
      "Year 0 should be left blank."
    ],
    explain: "Investors pay €6.6m at financial close, so the cash flow must be negative. Writing =-C12+C20 gives the sign change IRR needs."
  },
  {
    id: "pmtchoice",
    title: "Choosing the Function",
    q: "Which formula returns the annual payment on a €15.4m loan at 4.5% over nine years?",
    options: ["=PMT(4.5%, 9, -15.4)", "=IPMT(4.5%, 1, 9, -15.4)", "=NPV(4.5%, 15.4)", "=RATE(9, -15.4, 0)"],
    explain: "PMT returns the constant annuity payment of €2.119m. IPMT returns only the interest portion for a given period."
  },
  {
    id: "separator",
    title: "French Excel",
    q: "French Excel rejects =MAX(0,D27*25%). What should be typed instead?",
    options: ["=MAX(0;D27*25%)", "=MAXIMUM(0,D27*25%)", "=MAX(0.D27*25%)", "=MAX[0;D27*25%]"],
    explain: "French Excel uses semicolons to separate arguments because the comma is the decimal separator. MAX keeps the same name in both languages."
  },
  {
    id: "goalseek",
    title: "Solving for Rent",
    q: "Which approach solves the rent that delivers a 10% equity IRR most reliably?",
    options: [
      "Goal Seek, setting the IRR cell to 10% by changing the rent input.",
      "Data table with rents across the top row.",
      "Typing rents by hand until the IRR shows 10.0%.",
      "Enabling iterative calculation."
    ],
    explain: "Goal Seek solves one input for one target in seconds. Data tables only show results for rents you choose, and manual trial wastes precious minutes."
  }
];

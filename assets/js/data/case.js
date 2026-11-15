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
    title: "Timeline and Indexation",
    target: "F8",
    reveal: ["leaseFlag", "debtFlag", "indexFactor"],
    ask: "Calculate the indexation factor for Year 3.",
    hint: "Rent and costs rise by 2% a year from Year 2, so Year 3 carries two years of indexation.",
    explain: "Year 3 gives (1 + 2%) raised to the power of 2, which equals 1.0404. Wrapping the factor in the lease flag returns zero outside the lease, so one formula copies across every column without editing."
  },
  {
    id: "capex",
    title: "Capital Expenditure",
    target: "C12",
    reveal: ["assetCapex", "chargerCapex", "totalCapex"],
    ask: "Calculate total capex at financial close.",
    hint: "Multiply 40 buses by €0.50m, then add 20 chargers at €0.10m each.",
    explain: "Buses cost €20.0m and chargers €2.0m, so total capex reaches €22.0m. Every capex formula links to the Inputs sheet, which keeps the model fully driven by blue inputs."
  },
  {
    id: "revenue",
    title: "Lease Revenue",
    target: "F14",
    reveal: ["revenue", "opex"],
    ask: "Calculate lease revenue in Year 3.",
    hint: "Multiply the Year-1 rent by the Year 3 indexation factor.",
    explain: "Year 3 revenue equals €3.10m multiplied by 1.0404, which gives €3.225m. Operating costs follow the same logic with a negative sign, so EBITDA becomes a simple sum."
  },
  {
    id: "ebitda",
    title: "EBITDA",
    target: "D16",
    reveal: ["ebitda"],
    ask: "Calculate EBITDA in Year 1.",
    hint: "Add revenue to the negative operating costs.",
    explain: "Year 1 EBITDA equals €3.10m less €0.20m, which gives €2.90m. Keeping outflows negative means every subtotal is a plain addition, which is quicker to audit."
  },
  {
    id: "depreciation",
    title: "Depreciation",
    target: "D17",
    reveal: ["depreciation"],
    ask: "Calculate annual depreciation.",
    hint: "Depreciate total capex on a straight-line basis over the ten-year lease, down to zero.",
    explain: "Dividing €22.0m by ten years gives €2.2m a year, shown as a negative non-cash charge. Depreciation affects tax but never cash directly, which is why it sits above the tax line only."
  },
  {
    id: "residual",
    title: "Residual Value",
    target: "M18",
    reveal: ["residual"],
    ask: "Calculate the residual value received at the end of the lease.",
    hint: "Apply the residual value percentage to total capex, in the final year only.",
    explain: "Ten percent of €22.0m gives €2.2m, received in Year 10 only. Because the fleet is fully depreciated by then, the whole amount is a taxable gain in this case."
  },
  {
    id: "drawdown",
    title: "Debt Drawdown",
    target: "C20",
    reveal: ["drawdown", "C24"],
    ask: "Calculate the senior debt drawn at financial close.",
    hint: "Apply 70% gearing to total capex.",
    explain: "Seventy percent of €22.0m gives €15.4m of debt, so equity funds the remaining €6.6m. Gearing is set as an input here, whereas a lender would also test the result against a DSCR constraint."
  },
  {
    id: "interest",
    title: "Interest",
    target: "D22",
    reveal: ["D21", "D22"],
    ask: "Calculate interest in Year 1.",
    hint: "Multiply the opening balance by the 4.5% interest rate.",
    explain: "Year 1 interest equals €15.4m multiplied by 4.5%, which gives €0.693m. Using the opening balance rather than the closing balance keeps the model free of circular references."
  },
  {
    id: "debtService",
    title: "Debt Service",
    target: "D25",
    reveal: ["D23", "D25"],
    ask: "Calculate annual debt service on the nine-year annuity.",
    hint: "Use PMT with the interest rate, the tenor and the drawdown entered as a negative value.",
    explain: "PMT(4.5%, 9, −15.4) returns €2.119m, which stays constant every year. Row 23 takes principal as that payment minus interest, so debt service in row 25 adds the two back together and principal rises as interest falls."
  },
  {
    id: "closing",
    title: "Closing Balance",
    target: "D24",
    reveal: ["opening", "interest", "principal", "closing", "debtService"],
    ask: "Calculate the closing debt balance at the end of Year 1.",
    hint: "Subtract Year 1 principal from the opening balance.",
    explain: "Principal of €1.426m reduces the balance from €15.4m to €13.974m. Once the schedule is copied across, the balance reaches exactly zero in Year 9, which is the first check worth building."
  },
  {
    id: "taxable",
    title: "Taxable Income",
    target: "E27",
    reveal: ["taxable"],
    ask: "Calculate taxable income in Year 2.",
    hint: "Start from EBITDA, add the negative depreciation, then deduct interest.",
    explain: "Year 2 gives €2.958m minus €2.2m minus €0.629m, which equals €0.129m. Taxable income starts small because depreciation and interest absorb most of the EBITDA, then grows as interest falls."
  },
  {
    id: "tax",
    title: "Tax Paid",
    target: "M28",
    reveal: ["taxPaid"],
    ask: "Calculate tax paid in Year 10.",
    hint: "Year 10 has no interest, and the residual value is a taxable gain. Apply 25% inside a MAX function.",
    explain: "Year 10 taxable income equals €3.466m of EBITDA plus the €2.2m residual value minus €2.2m of depreciation, so tax reaches €0.866m. MAX(0, …) floors tax at zero because the brief allows no loss carry-forward."
  },
  {
    id: "cfads",
    title: "CFADS",
    target: "D30",
    reveal: ["cfads"],
    ask: "Calculate CFADS in Year 1.",
    hint: "Add EBITDA and the negative tax paid.",
    explain: "CFADS equals €2.900m less €0.002m of tax, which gives €2.898m. Depreciation never appears here, because CFADS measures cash rather than profit."
  },
  {
    id: "dscr",
    title: "DSCR",
    target: "D31",
    reveal: ["dscr", "C38", "C39"],
    ask: "Calculate the DSCR in Year 1.",
    hint: "Divide CFADS by debt service, returning a blank when there is no debt.",
    explain: "Year 1 gives €2.898m divided by €2.119m, which equals 1.37x. Returning a blank rather than zero after the debt matures stops MIN from reporting a false minimum of zero."
  },
  {
    id: "equityCf",
    title: "Equity Cash Flow",
    target: "M32",
    reveal: ["equityCf", "C40"],
    ask: "Calculate the equity cash flow in Year 10.",
    hint: "Take CFADS, deduct debt service, then add the residual value proceeds.",
    explain: "Year 10 combines €2.599m of CFADS with the €2.2m residual value and no debt service, giving €4.799m. Year 0 shows the €6.6m equity investment as a negative flow, which IRR needs to find a sign change."
  },
  {
    id: "equityIrr",
    title: "Equity IRR",
    target: "C36",
    reveal: ["C36", "C41"],
    ask: "Calculate the equity IRR.",
    hint: "Apply IRR to the equity cash flow row from Year 0 to Year 10.",
    explain: "IRR over the equity row returns 10.76%. Always include the Year 0 investment in the range, otherwise IRR has no sign change and fails."
  },
  {
    id: "projectIrr",
    title: "Project IRR",
    target: "C37",
    reveal: ["projectCf", "C37"],
    ask: "Calculate the project IRR.",
    hint: "Unlevered cash flows ignore debt entirely, and tax is recalculated without the interest deduction.",
    explain: "Project IRR comes to 6.30%, well below the equity IRR. Unlevered tax is higher because there is no interest deduction, which is why the project cash flow row recomputes tax instead of reusing it."
  },
  {
    id: "whyDscr",
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

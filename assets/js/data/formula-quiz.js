/* Formula Quiz Content */
window.Guide = window.Guide || {};

/* Question Types */
Guide.formulaTypes = [
  { id: "recall", label: "Recall", hint: "Pick the correct expression for a named formula." },
  { id: "recognise", label: "Recognise", hint: "Name the measure that an expression defines." },
  { id: "complete", label: "Complete", hint: "Supply the missing term in a formula." },
  { id: "apply", label: "Apply", hint: "Calculate a result from given inputs." }
];

/* Formulas Covered, Linked to Their Study Sections */
Guide.formulaIndex = [
  { key: "gearing", name: "Gearing", module: "project-finance", section: "sources-uses" },
  { key: "dscr", name: "DSCR", module: "project-finance", section: "ratios" },
  { key: "llcr", name: "LLCR", module: "project-finance", section: "ratios" },
  { key: "plcr", name: "PLCR", module: "project-finance", section: "ratios" },
  { key: "debtMin", name: "Debt Sizing Constraint", module: "debt", section: "binding" },
  { key: "sculpt", name: "Sculpted Debt Service", module: "debt", section: "sculpting" },
  { key: "capacity", name: "Debt Capacity", module: "debt", section: "sculpting" },
  { key: "allIn", name: "All-In Cost of Debt", module: "debt", section: "rates" },
  { key: "debtRoll", name: "Debt Roll-Forward", module: "modelling", section: "audit" },
  { key: "balance", name: "Balance Sheet Identity", module: "accounting-valuation", section: "statements" },
  { key: "cfo", name: "Operating Cash Flow", module: "accounting-valuation", section: "statements" },
  { key: "nwc", name: "Net Working Capital", module: "accounting-valuation", section: "links" },
  { key: "ev", name: "Enterprise Value Bridge", module: "accounting-valuation", section: "ev" },
  { key: "fcff", name: "Free Cash Flow to Firm", module: "accounting-valuation", section: "dcf" },
  { key: "dcf", name: "DCF Enterprise Value", module: "accounting-valuation", section: "dcf" },
  { key: "wacc", name: "WACC", module: "accounting-valuation", section: "dcf" },
  { key: "capm", name: "CAPM", module: "accounting-valuation", section: "dcf" },
  { key: "beta", name: "Levered Beta", module: "accounting-valuation", section: "dcf" },
  { key: "gordon", name: "Gordon Growth Terminal Value", module: "accounting-valuation", section: "terminal" },
  { key: "exitMultiple", name: "Exit Multiple Terminal Value", module: "accounting-valuation", section: "terminal" },
  { key: "npv", name: "NPV", module: "returns", section: "npv-irr" },
  { key: "irr", name: "IRR", module: "returns", section: "npv-irr" },
  { key: "moic", name: "MOIC", module: "returns", section: "moic" },
  { key: "irrSingle", name: "IRR From MOIC", module: "returns", section: "moic" },
  { key: "el", name: "Expected Loss", module: "investing", section: "credit" },
  { key: "tco", name: "Total Cost of Ownership", module: "mobility", section: "tco" },
  { key: "indexation", name: "Revenue Indexation", module: "mobility", section: "utilisation" },
  { key: "variance", name: "Budget Variance", module: "mobility", section: "asset-management" }
];

/* Question Bank: The First Option Is Always Correct and Is Shuffled at Runtime */
Guide.formulaQuiz = [
  /* Project Finance */
  {
    id: "fq1",
    formula: "gearing",
    type: "recall",
    q: "Which expression defines gearing?",
    math: true,
    options: [
      String.raw`\dfrac{\text{Debt}}{\text{Debt} + \text{Equity}}`,
      String.raw`\dfrac{\text{Debt}}{\text{Equity}}`,
      String.raw`\dfrac{\text{Equity}}{\text{Debt} + \text{Equity}}`,
      String.raw`\dfrac{\text{Net debt}}{\text{EBITDA}}`
    ],
    explain: "Gearing expresses debt as a share of total funding. Debt divided by equity is the separate debt-to-equity ratio, while net debt over EBITDA is a corporate leverage multiple."
  },
  {
    id: "fq2",
    formula: "gearing",
    type: "apply",
    q: "Senior debt of €56m funds an €80m fleet, with equity covering the remainder. What is the gearing?",
    options: ["70%", "233%", "30%", "43%"],
    explain: "Gearing equals 56 ÷ 80 = 70%. Dividing debt by the €24m of equity gives the 233% debt-to-equity ratio instead, and 30% is the equity share."
  },
  {
    id: "fq3",
    formula: "dscr",
    type: "recall",
    q: "Which expression defines the debt service coverage ratio for period t?",
    math: true,
    options: [
      String.raw`\dfrac{\text{CFADS}_t}{\text{Interest}_t + \text{Principal}_t}`,
      String.raw`\dfrac{\text{CFADS}_t}{\text{Principal}_t}`,
      String.raw`\dfrac{\text{EBITDA}_t}{\text{Interest}_t + \text{Principal}_t}`,
      String.raw`\dfrac{\text{NPV of CFADS}}{\text{Outstanding debt}}`
    ],
    explain: "DSCR divides CFADS by total scheduled debt service, meaning interest plus principal. EBITDA overstates available cash, and the NPV-based expression is LLCR."
  },
  {
    id: "fq4",
    formula: "dscr",
    type: "apply",
    q: "CFADS is €18m, interest is €5m and scheduled principal is €7m. What is the DSCR?",
    options: ["1.50x", "3.60x", "2.57x", "0.67x"],
    explain: "Total debt service is €12m, so DSCR equals 18 ÷ 12 = 1.50x. Dividing by interest or principal alone gives 3.60x or 2.57x, and 0.67x inverts the ratio."
  },
  {
    id: "fq5",
    formula: "llcr",
    type: "recognise",
    q: "Which coverage ratio does this expression define?",
    tex: String.raw`\dfrac{\begin{array}{c}\text{NPV of CFADS over the} \\ \text{remaining loan life}\end{array}}{\text{Outstanding debt}}`,
    options: ["LLCR", "PLCR", "DSCR", "Interest Cover Ratio"],
    explain: "Loan life coverage compares discounted CFADS up to final maturity with the debt still outstanding, which makes it a whole-of-life solvency test."
  },
  {
    id: "fq6",
    formula: "plcr",
    type: "complete",
    q: "Which term completes the PLCR formula?",
    tex: String.raw`\text{PLCR} = \dfrac{\begin{array}{c}\text{NPV of CFADS over the} \\ \text{remaining } \boxed{\;?\;}\end{array}}{\text{Outstanding debt}}`,
    options: ["Project Life", "Loan Life", "Swap Tenor", "Construction Period"],
    explain: "PLCR extends the horizon to the remaining project life, so it captures tail cash flows after debt maturity and usually sits at or above LLCR."
  },
  {
    id: "fq7",
    formula: "llcr",
    type: "apply",
    q: "Discounted CFADS over the remaining loan life is €78m and outstanding debt is €60m. What is the LLCR?",
    options: ["1.30x", "0.77x", "1.78x", "0.30x"],
    explain: "LLCR equals 78 ÷ 60 = 1.30x. Inverting the ratio gives 0.77x, which would wrongly suggest that the loan cannot be repaid."
  },

  /* Debt Sizing */
  {
    id: "fq8",
    formula: "debtMin",
    type: "recall",
    q: "When several sizing limits apply, which expression gives the senior debt amount?",
    math: true,
    options: [
      String.raw`\min \left\{ \begin{array}{l} \text{DSCR capacity} \\ \text{Gearing cap} \times \text{Cost} \\ \text{Other limits} \end{array} \right.`,
      String.raw`\max \left\{ \begin{array}{l} \text{DSCR capacity} \\ \text{Gearing cap} \times \text{Cost} \\ \text{Other limits} \end{array} \right.`,
      String.raw`\begin{aligned} & \text{DSCR capacity} \\ & + \text{Gearing cap} \times \text{Cost} \end{aligned}`,
      String.raw`\tfrac{1}{2} \left( \begin{array}{l} \text{DSCR capacity} \\ {} + \text{Gearing cap} \times \text{Cost} \end{array} \right)`
    ],
    explain: "Every limit must hold at once, so the lowest one binds. Lenders never offer more than the tightest constraint permits."
  },
  {
    id: "fq9",
    formula: "debtMin",
    type: "apply",
    q: "DSCR-based capacity is €52m and the gearing cap is 60% of €75m eligible cost. No other limit applies. How much debt is sized?",
    options: ["€45.0m", "€52.0m", "€48.5m", "€97.0m"],
    explain: "Gearing allows 0.60 × 75 = €45m, which is below the €52m DSCR capacity. Gearing therefore binds, and the resulting DSCR settles comfortably above target."
  },
  {
    id: "fq10",
    formula: "sculpt",
    type: "recall",
    q: "Under sculpting, which expression gives permitted debt service in period t?",
    math: true,
    options: [
      String.raw`\text{DS}_t = \dfrac{\text{CFADS}_t}{\text{DSCR}_{\text{target}}}`,
      String.raw`\text{DS}_t = \text{CFADS}_t \times \text{DSCR}_{\text{target}}`,
      String.raw`\text{DS}_t = \text{CFADS}_t - \text{DSCR}_{\text{target}}`,
      String.raw`\text{DS}_t = \dfrac{\text{Interest}_t}{\text{DSCR}_{\text{target}}}`
    ],
    explain: "Rearranging the DSCR definition shows that debt service equals CFADS divided by the target ratio, which holds coverage constant in every period."
  },
  {
    id: "fq11",
    formula: "sculpt",
    type: "apply",
    q: "Period CFADS is €15.6m, the target DSCR is 1.30x and interest is €1.2m. How much principal can be repaid?",
    options: ["€10.8m", "€12.0m", "€14.4m", "€19.1m"],
    explain: "Permitted debt service is 15.6 ÷ 1.30 = €12.0m. Principal is the remainder after interest, so 12.0 − 1.2 = €10.8m."
  },
  {
    id: "fq49",
    formula: "sculpt",
    type: "recognise",
    q: "Under debt sculpting, what does this expression calculate for each period?",
    tex: String.raw`\dfrac{\text{CFADS}_t}{\text{DSCR}_{\text{target}}}`,
    options: ["Permitted Debt Service", "Principal Repayment", "Interest Payable", "Debt Capacity"],
    explain: "Dividing CFADS by the target ratio gives the most debt service the period can bear. Principal is what remains once interest is deducted from that amount."
  },
  {
    id: "fq12",
    formula: "capacity",
    type: "complete",
    q: "Which rate completes the debt capacity formula?",
    tex: String.raw`\text{Debt capacity} = \sum_{t=1}^{n} \dfrac{\text{DS}_t}{\left(1 + \boxed{\;?\;}\right)^{t}}`,
    options: ["Cost of Debt", "WACC", "Cost of Equity", "Long-Term Growth Rate"],
    explain: "Permitted debt service is the lender's cash flow, so it is discounted at the all-in cost of debt to find the loan amount it can support."
  },
  {
    id: "fq13",
    formula: "capacity",
    type: "apply",
    q: "Permitted debt service is €10m, €11m and €12m in years one to three, and the cost of debt is 5%. What is the debt capacity?",
    options: ["€29.87m", "€33.00m", "€31.43m", "€27.20m"],
    explain: "Discounting each year gives 9.52 + 9.98 + 10.37 = €29.87m. Ignoring discounting gives €33.00m, and discounting everything by a single year gives €31.43m."
  },
  {
    id: "fq14",
    formula: "allIn",
    type: "apply",
    q: "Three-month EURIBOR is 2.40% and the credit margin is 175 basis points. What is the all-in floating rate before hedging costs?",
    options: ["4.15%", "0.65%", "2.40%", "1.75%"],
    explain: "All-in cost equals the reference rate plus the margin: 2.40% + 1.75% = 4.15%. Swaps or caps would add their own cost on top."
  },

  /* Modelling */
  {
    id: "fq15",
    formula: "debtRoll",
    type: "complete",
    q: "Which term completes the debt roll-forward check?",
    tex: String.raw`\begin{aligned} \text{Closing debt} = {} & \text{Opening debt} \\ & + \boxed{\;?\;} - \text{Repayment} \end{aligned}`,
    options: ["Drawdown", "Interest Paid", "CFADS", "Capex"],
    explain: "Debt balances move only through new drawdowns and repayments. Interest paid flows through the income statement and cash flow, not the principal balance."
  },
  {
    id: "fq16",
    formula: "debtRoll",
    type: "apply",
    q: "Opening debt is €40m, drawdowns are €8m and repayments are €5m. What is closing debt?",
    options: ["€43m", "€53m", "€37m", "€48m"],
    explain: "Closing debt equals 40 + 8 − 5 = €43m. Auditors check that this balance rolls forward correctly in every period."
  },

  /* Accounting and Valuation */
  {
    id: "fq17",
    formula: "balance",
    type: "recall",
    q: "Which identity must every balance sheet satisfy?",
    math: true,
    options: [
      String.raw`\text{Assets} = \text{Liabilities} + \text{Equity}`,
      String.raw`\text{Assets} = \text{Liabilities} - \text{Equity}`,
      String.raw`\text{Equity} = \text{Assets} + \text{Liabilities}`,
      String.raw`\text{Liabilities} = \text{Assets} + \text{Equity}`
    ],
    explain: "Resources equal the claims on them. Equity is therefore the residual left once liabilities are deducted from assets."
  },
  {
    id: "fq18",
    formula: "cfo",
    type: "recall",
    q: "Under the indirect method, which expression gives cash flow from operations?",
    math: true,
    options: [
      String.raw`\text{Net income} + \text{Non-cash charges} - \Delta\,\text{NWC}`,
      String.raw`\text{Net income} + \text{Non-cash charges} + \Delta\,\text{NWC}`,
      String.raw`\text{Net income} - \text{Non-cash charges} - \Delta\,\text{NWC}`,
      String.raw`\text{EBITDA} - \text{Capex}`
    ],
    explain: "Non-cash charges such as depreciation are added back, while any increase in working capital absorbs cash and is deducted."
  },
  {
    id: "fq19",
    formula: "cfo",
    type: "apply",
    q: "Net income is €12m, depreciation is €5m and net working capital rises by €3m. What is cash flow from operations?",
    options: ["€14m", "€20m", "€10m", "€4m"],
    explain: "Operating cash flow equals 12 + 5 − 3 = €14m. Adding the working capital increase instead of deducting it gives €20m."
  },
  {
    id: "fq20",
    formula: "nwc",
    type: "complete",
    q: "Which item completes the operating working capital formula?",
    tex: String.raw`\text{NWC} \approx \text{Receivables} + \text{Inventory} - \boxed{\;?\;}`,
    options: ["Payables", "Cash", "Debt", "Capex"],
    explain: "Operating working capital excludes cash and financing items. Payables are deducted because supplier credit funds part of receivables and inventory."
  },
  {
    id: "fq21",
    formula: "nwc",
    type: "apply",
    q: "Receivables are €9m, inventory is €4m and payables are €6m. What is net working capital?",
    options: ["€7m", "€19m", "€13m", "€3m"],
    explain: "Net working capital equals 9 + 4 − 6 = €7m. Increases in this figure count as a use of cash in the cash flow statement."
  },
  {
    id: "fq22",
    formula: "ev",
    type: "recall",
    q: "Which expression gives the enterprise value bridge?",
    math: true,
    options: [
      String.raw`\text{Equity value} + \text{Net debt} + \text{Other debt-like claims}`,
      String.raw`\text{Equity value} - \text{Net debt} - \text{Other debt-like claims}`,
      String.raw`\text{Equity value} + \text{Gross debt} + \text{Cash}`,
      String.raw`\text{Net debt} - \text{Equity value}`
    ],
    explain: "Enterprise value belongs to all capital providers, so claims senior to equity are added to equity value. Cash reduces net debt rather than adding to it."
  },
  {
    id: "fq23",
    formula: "ev",
    type: "apply",
    q: "Equity value is €300m, net debt is €200m and lease liabilities treated as debt are €40m. What is enterprise value?",
    options: ["€540m", "€500m", "€460m", "€140m"],
    explain: "Enterprise value equals 300 + 200 + 40 = €540m. Leaving out the lease liabilities understates the claims on the operating business."
  },
  {
    id: "fq24",
    formula: "fcff",
    type: "recall",
    q: "Which expression gives free cash flow to the firm?",
    math: true,
    options: [
      String.raw`\text{EBIT}\,(1 - T) + \text{D\&A} - \text{Capex} - \Delta\,\text{NWC}`,
      String.raw`\text{EBIT} + \text{D\&A} + \text{Capex} + \Delta\,\text{NWC}`,
      String.raw`\text{EBITDA}\,(1 - T) - \text{Capex}`,
      String.raw`\text{Net income} + \text{D\&A} - \text{Capex} - \text{Debt repayment}`
    ],
    explain: "FCFF starts from operating profit after tax, adds back non-cash charges and deducts reinvestment. Financing flows stay out because FCFF belongs to all capital providers."
  },
  {
    id: "fq25",
    formula: "fcff",
    type: "apply",
    q: "EBIT is €20m, the tax rate is 25%, D&A is €6m, capex is €8m and working capital rises by €2m. What is FCFF?",
    options: ["€11m", "€16m", "€13m", "€15m"],
    explain: "After-tax EBIT is €15m, so FCFF equals 15 + 6 − 8 − 2 = €11m. Skipping tax gives €16m, and ignoring working capital gives €13m."
  },
  {
    id: "fq26",
    formula: "dcf",
    type: "complete",
    q: "Which exponent completes the discounting of terminal value in a DCF?",
    tex: String.raw`\begin{aligned} \text{EV} = {} & \sum_{t=1}^{n} \dfrac{\text{FCFF}_t}{(1 + \text{WACC})^{t}} \\ & + \dfrac{\text{TV}_n}{(1 + \text{WACC})^{\boxed{\;?\;}}} \end{aligned}`,
    options: ["n", "n + 1", "1", "t − 1"],
    explain: "Terminal value is measured at the end of year n, so it is discounted over n periods, just like the final explicit cash flow."
  },
  {
    id: "fq50",
    formula: "dcf",
    type: "recognise",
    q: "Which value does this expression produce?",
    tex: String.raw`\begin{aligned} & \sum_{t=1}^{n} \dfrac{\text{FCFF}_t}{(1 + \text{WACC})^{t}} \\ & + \dfrac{\text{TV}_n}{(1 + \text{WACC})^{n}} \end{aligned}`,
    options: ["Enterprise Value", "Equity Value", "Net Present Value to Equity", "Debt Capacity"],
    explain: "Discounting cash flows that belong to all capital providers at the blended cost of capital gives enterprise value. Deducting net debt then bridges to equity value."
  },
  {
    id: "fq27",
    formula: "wacc",
    type: "recall",
    q: "Which expression defines the weighted average cost of capital?",
    math: true,
    options: [
      String.raw`\dfrac{E}{D + E}\,K_e + \dfrac{D}{D + E}\,K_d\,(1 - T)`,
      String.raw`\dfrac{E}{D + E}\,K_e + \dfrac{D}{D + E}\,K_d`,
      String.raw`\dfrac{E}{D + E}\,K_e\,(1 - T) + \dfrac{D}{D + E}\,K_d`,
      String.raw`\dfrac{E}{D}\,K_e + \dfrac{D}{E}\,K_d\,(1 - T)`
    ],
    explain: "Market-value weights apply to each cost of capital, and only the cost of debt carries the tax shield because interest is deductible."
  },
  {
    id: "fq28",
    formula: "wacc",
    type: "apply",
    q: "Equity is 40% and debt 60% of capital. Cost of equity is 10%, pre-tax cost of debt is 5% and tax is 25%. What is WACC?",
    options: ["6.25%", "7.00%", "5.50%", "7.75%"],
    explain: "WACC equals 0.40 × 10% + 0.60 × 5% × 0.75 = 4.00% + 2.25% = 6.25%. Forgetting the tax shield gives 7.00%."
  },
  {
    id: "fq29",
    formula: "capm",
    type: "recall",
    q: "Which expression gives the cost of equity under CAPM?",
    math: true,
    options: [
      String.raw`K_e = R_f + \beta \times \text{ERP}`,
      String.raw`K_e = \beta \times (R_f + \text{ERP})`,
      String.raw`K_e = R_f \times \beta + \text{ERP}`,
      String.raw`K_e = R_f + \dfrac{\text{ERP}}{\beta}`
    ],
    explain: "Investors earn the risk-free rate plus compensation for systematic risk, which is beta multiplied by the equity risk premium."
  },
  {
    id: "fq30",
    formula: "capm",
    type: "apply",
    q: "Risk-free rate is 2.5%, beta is 0.9 and the equity risk premium is 6%. What is the cost of equity?",
    options: ["7.90%", "8.50%", "7.65%", "5.40%"],
    explain: "Cost of equity equals 2.5% + 0.9 × 6% = 2.5% + 5.4% = 7.90%. Applying beta to the risk-free rate as well gives 7.65%."
  },
  {
    id: "fq51",
    formula: "capm",
    type: "recognise",
    q: "Which input does this expression estimate?",
    tex: String.raw`R_f + \beta \times \text{ERP}`,
    options: ["Cost of Equity", "Cost of Debt", "Equity Risk Premium", "WACC"],
    explain: "CAPM prices equity as the risk-free rate plus beta times the market premium. Country risk premia can be added where the valuation context requires them."
  },
  {
    id: "fq31",
    formula: "beta",
    type: "recall",
    q: "Which expression relevers an asset beta for a given capital structure?",
    math: true,
    options: [
      String.raw`\beta_L = \beta_U\left[1 + (1 - T)\,\dfrac{D}{E}\right]`,
      String.raw`\beta_L = \beta_U\left[1 + (1 - T)\,\dfrac{E}{D}\right]`,
      String.raw`\beta_L = \dfrac{\beta_U}{1 + (1 - T)\,\dfrac{D}{E}}`,
      String.raw`\beta_L = \beta_U\left[1 + T\,\dfrac{D}{E}\right]`
    ],
    explain: "Leverage raises equity risk in proportion to debt over equity, dampened by the tax shield. Dividing by the bracket is the unlevering step instead."
  },
  {
    id: "fq32",
    formula: "beta",
    type: "apply",
    q: "Unlevered beta is 0.8, the tax rate is 25% and debt to equity is 1.0. What is the levered beta?",
    options: ["1.40", "1.60", "0.46", "1.00"],
    explain: "Levered beta equals 0.8 × (1 + 0.75 × 1.0) = 1.40. Ignoring tax gives 1.60, and dividing by the bracket gives 0.46."
  },
  {
    id: "fq33",
    formula: "gordon",
    type: "complete",
    q: "Which term completes the Gordon growth terminal value?",
    tex: String.raw`\text{TV}_n = \dfrac{\text{FCF}_{n+1}}{\text{WACC} - \boxed{\;?\;}}`,
    options: ["g, the Long-Term Growth Rate", "Kd, the Cost of Debt", "Rf, the Risk-Free Rate", "T, the Tax Rate"],
    explain: "Perpetual growth is subtracted from the discount rate, which is why growth must stay below WACC for the formula to hold."
  },
  {
    id: "fq34",
    formula: "gordon",
    type: "apply",
    q: "Next year's free cash flow is €10m, WACC is 8% and long-term growth is 2%. What is the terminal value?",
    options: ["€166.7m", "€125.0m", "€100.0m", "€500.0m"],
    explain: "Terminal value equals 10 ÷ (8% − 2%) = €166.7m. Dividing by WACC alone gives €125.0m, and dividing by growth alone gives €500.0m."
  },
  {
    id: "fq35",
    formula: "exitMultiple",
    type: "apply",
    q: "Final-year EBITDA is €15m and comparable transactions support an 8.0x exit multiple. What is the terminal value?",
    options: ["€120m", "€1.9m", "€135m", "€23m"],
    explain: "Terminal value equals 15 × 8.0 = €120m. Exit multiples import current market pricing, so the assumption deserves the same scrutiny as a growth rate."
  },
  {
    id: "fq52",
    formula: "exitMultiple",
    type: "recognise",
    q: "Which terminal value method does this expression describe?",
    tex: String.raw`\text{TV}_n = \text{EBITDA}_n \times \text{Exit multiple}`,
    options: ["Exit Multiple Method", "Gordon Growth Method", "Residual Value Method", "Liquidation Value Method"],
    explain: "Applying a market multiple to final-year EBITDA imports current pricing, whereas the Gordon growth method relies on a perpetual growth assumption."
  },

  /* Returns */
  {
    id: "fq36",
    formula: "npv",
    type: "recall",
    q: "Which expression defines net present value?",
    math: true,
    options: [
      String.raw`\sum_{t=0}^{n} \dfrac{\text{CF}_t}{(1 + r)^{t}}`,
      String.raw`\sum_{t=0}^{n} \text{CF}_t\,(1 + r)^{t}`,
      String.raw`\sum_{t=0}^{n} \dfrac{\text{CF}_t}{1 + r}`,
      String.raw`\sum_{t=0}^{n} \text{CF}_t - r`
    ],
    explain: "Each cash flow is discounted by the required return compounded over its own timing, so later cash flows count for less."
  },
  {
    id: "fq37",
    formula: "irr",
    type: "recognise",
    q: "Which rate is the value of x that solves this equation?",
    tex: String.raw`\sum_{t=0}^{n} \dfrac{\text{CF}_t}{(1 + x)^{t}} = 0`,
    options: ["Internal Rate of Return", "Weighted Average Cost of Capital", "Cost of Debt", "Long-Term Growth Rate"],
    explain: "IRR is the discount rate at which NPV equals zero. Comparing it with the hurdle rate shows whether the investment clears its required return."
  },
  {
    id: "fq38",
    formula: "npv",
    type: "apply",
    q: "Investing €100m today returns €60m in each of the next two years. At a 10% discount rate, what is the NPV?",
    options: ["€4.13m", "€20.00m", "€9.09m", "−€4.13m"],
    explain: "Discounted inflows are 54.55 + 49.59 = €104.13m, so NPV equals €4.13m. Ignoring discounting overstates value at €20.00m."
  },
  {
    id: "fq39",
    formula: "moic",
    type: "recall",
    q: "Which expression defines the multiple on invested capital?",
    math: true,
    options: [
      String.raw`\dfrac{\text{Total equity proceeds}}{\text{Equity invested}}`,
      String.raw`\dfrac{\text{Equity invested}}{\text{Total equity proceeds}}`,
      String.raw`\dfrac{\text{Proceeds} - \text{Equity invested}}{\text{Holding period}}`,
      String.raw`\text{IRR} \times \text{Holding period}`
    ],
    explain: "MOIC compares everything returned to equity with everything invested. Timing plays no part, which is why it is always read alongside IRR."
  },
  {
    id: "fq40",
    formula: "moic",
    type: "apply",
    q: "Equity of €30m receives €45m of distributions and €30m of exit proceeds. What is the MOIC?",
    options: ["2.50x", "1.50x", "1.00x", "0.40x"],
    explain: "Total proceeds are 45 + 30 = €75m, so MOIC equals 75 ÷ 30 = 2.50x. Counting only the distributions gives 1.50x."
  },
  {
    id: "fq41",
    formula: "irrSingle",
    type: "recall",
    q: "With one investment and one exit, which expression converts MOIC into IRR over n years?",
    math: true,
    options: [
      String.raw`\text{IRR} = \text{MOIC}^{\,1/n} - 1`,
      String.raw`\text{IRR} = \dfrac{\text{MOIC}}{n}`,
      String.raw`\text{IRR} = \dfrac{\text{MOIC} - 1}{n}`,
      String.raw`\text{IRR} = \text{MOIC}^{\,n} - 1`
    ],
    explain: "Annual compounding means the multiple is the nth power of one plus IRR. Dividing by n ignores compounding and overstates the return."
  },
  {
    id: "fq42",
    formula: "irrSingle",
    type: "apply",
    q: "Equity value doubles over five years, with one investment and a single exit. What is the IRR?",
    options: ["14.9%", "20.0%", "18.9%", "7.2%"],
    explain: "IRR equals 2.0 raised to the power of one fifth, minus one, which is 14.9%. Simple division gives 20.0%, while 18.9% uses four years by mistake."
  },

  /* Investing and Credit */
  {
    id: "fq43",
    formula: "el",
    type: "recall",
    q: "Which expression gives expected credit loss?",
    math: true,
    options: [
      String.raw`\text{PD} \times \text{LGD} \times \text{EAD}`,
      String.raw`\text{PD} \times (1 - \text{LGD}) \times \text{EAD}`,
      String.raw`\text{PD} + \text{LGD} + \text{EAD}`,
      String.raw`\dfrac{\text{PD} \times \text{EAD}}{\text{LGD}}`
    ],
    explain: "Expected loss multiplies how likely default is, how much is lost once recoveries are counted and how much is exposed at that moment."
  },
  {
    id: "fq44",
    formula: "el",
    type: "apply",
    q: "Probability of default is 1.5%, loss given default is 45% and exposure at default is €20m. What is the expected loss?",
    options: ["€135k", "€300k", "€165k", "€9.0m"],
    explain: "Expected loss equals 0.015 × 0.45 × 20m = €135k. Using the recovery rate of 55% instead of the loss rate gives €165k."
  },

  /* EV Economics */
  {
    id: "fq45",
    formula: "tco",
    type: "complete",
    q: "Which term completes the total cost of ownership formula?",
    tex: String.raw`\begin{aligned} \text{TCO} = {} & \text{Purchase} + \text{Financing} \\ & + \text{Energy} + \text{Maintenance} \\ & + \text{Insurance} + \text{Taxes} \\ & - \boxed{\;?\;} \end{aligned}`,
    options: ["Residual Value", "Depreciation", "Capex", "Lease Revenue"],
    explain: "Value recovered at the end of the holding period offsets lifetime costs. Depreciation would double-count the purchase price already included."
  },
  {
    id: "fq46",
    formula: "indexation",
    type: "apply",
    q: "Year-one revenue is €12.8m and the contract indexes revenue at 2% a year. What is revenue in year three?",
    options: ["€13.32m", "€13.06m", "€13.58m", "€13.31m"],
    explain: "Year three sits two indexation steps after year one, so revenue equals 12.8 × 1.02² = €13.32m. Simple interest of 4% gives €13.31m, which understates compounding."
  },
  {
    id: "fq47",
    formula: "indexation",
    type: "recognise",
    q: "What does the symbol i represent in this formula?",
    tex: String.raw`\text{Revenue}_t = \text{Revenue}_{t-1} \times (1 + i)`,
    options: ["Annual Indexation Rate", "Interest Rate on Debt", "Internal Rate of Return", "Investment Horizon"],
    explain: "Contracted revenue grows by the indexation rate each year. Comparing it with cost inflation shows whether margins hold or compress."
  },
  {
    id: "fq48",
    formula: "variance",
    type: "apply",
    q: "Budget assumed 50 vehicles at €80k of revenue each. Actual results show 48 vehicles at €84k each. What is the price variance?",
    options: ["+€0.19m", "+€0.20m", "−€0.16m", "+€0.03m"],
    explain: "Price variance uses actual volume: (84 − 80) × 48 = +€0.19m. Volume variance is (48 − 50) × 80 = −€0.16m, so the total is +€0.03m."
  }
];

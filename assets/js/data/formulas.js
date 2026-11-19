/* Formula Library */
window.Guide = window.Guide || {};

Guide.formulas = {
  gearing: {
    tex: String.raw`\text{Gearing} = \dfrac{\text{Debt}}{\text{Debt} + \text{Equity}} = \dfrac{45}{75} = 60\%`,
    plain: "Gearing = Debt / (Debt + Equity) = 45 / 75 = 60%"
  },
  dscr: {
    tex: String.raw`\text{DSCR}_t = \dfrac{\text{CFADS}_t}{\text{Interest}_t + \text{Principal}_t}`,
    plain: "DSCR(t) = CFADS(t) / (Interest(t) + Principal(t))"
  },
  dscrExample: {
    tex: String.raw`\text{DSCR} = \dfrac{\text{€}13\text{m}}{\text{€}10\text{m}} = 1.30\text{x}`,
    plain: "DSCR = €13m / €10m = 1.30x"
  },
  llcr: {
    tex: String.raw`\text{LLCR} = \dfrac{\begin{array}{c}\text{NPV of CFADS Over the} \\ \text{Remaining Loan Life}\end{array}}{\text{Outstanding Debt}}`,
    plain: "LLCR = NPV of CFADS Over the Remaining Loan Life / Outstanding Debt"
  },
  plcr: {
    tex: String.raw`\text{PLCR} = \dfrac{\begin{array}{c}\text{NPV of CFADS Over the} \\ \text{Remaining Project Life}\end{array}}{\text{Outstanding Debt}}`,
    plain: "PLCR = NPV of CFADS Over the Remaining Project Life / Outstanding Debt"
  },
  debtMin: {
    tex: String.raw`\text{Debt} = \min \left\{ \begin{array}{l} \text{DSCR-Based Capacity} \\ \text{Gearing Cap} \times \text{Eligible Cost} \\ \text{Other Limits} \end{array} \right.`,
    plain: "Debt = MIN(DSCR Capacity; Gearing Cap × Cost; Other Limits)"
  },
  sculpt: {
    tex: String.raw`\begin{aligned} \text{DS}_t &= \dfrac{\text{CFADS}_t}{\text{DSCR}_{\text{Target}}} \\[6pt] \text{Principal}_t &= \text{DS}_t - \text{Interest}_t \end{aligned}`,
    plain: "DS(t) = CFADS(t) / Target DSCR; Principal(t) = DS(t) − Interest(t)"
  },
  capacity: {
    tex: String.raw`\text{Debt Capacity} = \sum_{t=1}^{n} \dfrac{\text{DS}_t}{(1 + r_d)^{t}}`,
    plain: "Debt Capacity = Σ DS(t) / (1 + rd)^t"
  },
  capacityExample: {
    tex: String.raw`\dfrac{10}{1.05} + \dfrac{11}{1.05^{2}} + \dfrac{12}{1.05^{3}} = \text{€}29.87\text{m}`,
    plain: "10 / 1.05 + 11 / 1.05² + 12 / 1.05³ = €29.87m"
  },
  allIn: {
    tex: String.raw`r_{\text{All-In}} = \text{EURIBOR} + \text{Credit Margin}`,
    plain: "All-In Rate = EURIBOR + Credit Margin"
  },
  debtRoll: {
    tex: String.raw`\begin{aligned} \text{Closing Debt} = {} & \text{Opening Debt} \\ & + \text{Drawdown} - \text{Repayment} \end{aligned}`,
    plain: "Closing Debt = Opening Debt + Drawdown − Repayment"
  },
  balance: {
    tex: String.raw`\text{Assets} = \text{Liabilities} + \text{Equity}`,
    plain: "Assets = Liabilities + Equity"
  },
  cfo: {
    tex: String.raw`\begin{aligned} \text{CFO} = {} & \text{Net Income} + \text{Non-Cash Charges} \\ & - \Delta\,\text{NWC} \end{aligned}`,
    plain: "CFO = Net Income + Non-Cash Charges − ΔNWC"
  },
  nwc: {
    tex: String.raw`\text{NWC} \approx \text{Receivables} + \text{Inventory} - \text{Payables}`,
    plain: "NWC ≈ Receivables + Inventory − Payables"
  },
  ev: {
    tex: String.raw`\begin{aligned} \text{EV} = {} & \text{Equity Value} + \text{Net Debt} \\ & + \text{Other Debt-Like Claims} \end{aligned}`,
    plain: "EV = Equity Value + Net Debt + Other Debt-Like Claims"
  },
  fcff: {
    tex: String.raw`\begin{aligned} \text{FCFF} = {} & \text{EBIT}\,(1 - T) + \text{D\&A} \\ & - \text{Capex} - \Delta\,\text{NWC} \end{aligned}`,
    plain: "FCFF = EBIT × (1 − T) + D&A − Capex − ΔNWC"
  },
  dcf: {
    tex: String.raw`\begin{aligned} \text{EV} = {} & \sum_{t=1}^{n} \dfrac{\text{FCFF}_t}{(1 + \text{WACC})^{t}} \\ & + \dfrac{\text{TV}_n}{(1 + \text{WACC})^{n}} \end{aligned}`,
    plain: "EV = Σ FCFF(t) / (1 + WACC)^t + TV(n) / (1 + WACC)^n"
  },
  wacc: {
    tex: String.raw`\text{WACC} = \dfrac{E}{D + E}\,K_e + \dfrac{D}{D + E}\,K_d\,(1 - T)`,
    plain: "WACC = E/(D + E) × Ke + D/(D + E) × Kd × (1 − T)",
    where: [
      [String.raw`E,\ D`, "Market Values of Equity and Debt"],
      [String.raw`K_e`, "Cost of Equity"],
      [String.raw`K_d`, "Pre-Tax Cost of Debt"],
      [String.raw`T`, "Corporate Tax Rate"]
    ]
  },
  capm: {
    tex: String.raw`K_e = R_f + \beta \times \text{ERP}`,
    plain: "Ke = Rf + β × ERP",
    where: [
      [String.raw`R_f`, "Risk-Free Rate"],
      [String.raw`\beta`, "Sensitivity to Market Risk"],
      [String.raw`\text{ERP}`, "Equity Risk Premium"]
    ]
  },
  capmExample: {
    tex: String.raw`K_e = 3\% + 1.2 \times 5\% = 9.0\%`,
    plain: "Ke = 3% + 1.2 × 5% = 9.0%"
  },
  beta: {
    tex: String.raw`\beta_{L} = \beta_{U}\left[\,1 + (1 - T)\,\dfrac{D}{E}\,\right]`,
    plain: "βL = βU × [1 + (1 − T) × D/E]"
  },
  gordon: {
    tex: String.raw`\text{TV}_n = \dfrac{\text{FCF}_{n+1}}{\text{WACC} - g}`,
    plain: "TV(n) = FCF(n+1) / (WACC − g)"
  },
  exitMultiple: {
    tex: String.raw`\text{TV}_n = \text{EBITDA}_n \times \text{Exit Multiple}`,
    plain: "TV(n) = EBITDA(n) × Exit Multiple"
  },
  npv: {
    tex: String.raw`\text{NPV} = \sum_{t=0}^{n} \dfrac{\text{CF}_t}{(1 + r)^{t}}`,
    plain: "NPV = Σ CF(t) / (1 + r)^t"
  },
  irr: {
    tex: String.raw`\sum_{t=0}^{n} \dfrac{\text{CF}_t}{(1 + \text{IRR})^{t}} = 0`,
    plain: "Σ CF(t) / (1 + IRR)^t = 0"
  },
  moic: {
    tex: String.raw`\text{MOIC} = \dfrac{\text{Total Equity Proceeds}}{\text{Equity Invested}}`,
    plain: "MOIC = Total Equity Proceeds / Equity Invested"
  },
  irrSingle: {
    tex: String.raw`\begin{aligned} \text{IRR} &= \text{MOIC}^{\,1/n} - 1 \\[4pt] \text{Three Years:}\quad 2.0^{1/3} - 1 &= 26.0\% \\[4pt] \text{Fifteen Years:}\quad 2.0^{1/15} - 1 &= 4.7\% \end{aligned}`,
    plain: "IRR = MOIC^(1/n) − 1; 2.0^(1/3) − 1 = 26.0%; 2.0^(1/15) − 1 = 4.7%"
  },
  el: {
    tex: String.raw`\text{EL} = \text{PD} \times \text{LGD} \times \text{EAD}`,
    plain: "EL = PD × LGD × EAD",
    where: [
      [String.raw`\text{PD}`, "Probability of Default"],
      [String.raw`\text{LGD}`, "Loss Given Default"],
      [String.raw`\text{EAD}`, "Exposure at Default"]
    ]
  },
  tco: {
    tex: String.raw`\begin{aligned} \text{TCO} = {} & \text{Purchase} + \text{Financing} \\ & + \text{Energy} + \text{Maintenance} \\ & + \text{Insurance} + \text{Taxes} \\ & - \text{Residual Value} \end{aligned}`,
    plain: "TCO = Purchase + Financing + Energy + Maintenance + Insurance + Taxes − Residual Value"
  },
  indexation: {
    tex: String.raw`\text{Revenue}_t = \text{Revenue}_{t-1} \times (1 + i)`,
    plain: "Revenue(t) = Revenue(t−1) × (1 + i)",
    where: [[String.raw`i`, "Annual Indexation Rate"]]
  },
  variance: {
    tex: String.raw`\begin{aligned} \text{Volume} &= (95 - 100) \times \text{€}100\text{k} = -\text{€}0.50\text{m} \\[4pt] \text{Price} &= (\text{€}102\text{k} - \text{€}100\text{k}) \times 95 = +\text{€}0.19\text{m} \\[4pt] \text{Total} &= -\text{€}0.31\text{m} \end{aligned}`,
    plain: "Volume (95 − 100) × €100k = −€0.50m; Price (€102k − €100k) × 95 = +€0.19m; Total = −€0.31m"
  }
};

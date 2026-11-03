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
    tex: String.raw`\text{LLCR} = \dfrac{\begin{array}{c}\text{NPV of CFADS over the} \\ \text{remaining loan life}\end{array}}{\text{Outstanding debt}}`,
    plain: "LLCR = NPV of CFADS over the remaining loan life / Outstanding debt"
  },
  plcr: {
    tex: String.raw`\text{PLCR} = \dfrac{\begin{array}{c}\text{NPV of CFADS over the} \\ \text{remaining project life}\end{array}}{\text{Outstanding debt}}`,
    plain: "PLCR = NPV of CFADS over the remaining project life / Outstanding debt"
  },
  debtMin: {
    tex: String.raw`\text{Debt} = \min \left\{ \begin{array}{l} \text{DSCR-based capacity} \\ \text{Gearing cap} \times \text{Eligible cost} \\ \text{Other limits} \end{array} \right.`,
    plain: "Debt = MIN(DSCR capacity; Gearing cap × Cost; Other limits)"
  },
  sculpt: {
    tex: String.raw`\begin{aligned} \text{DS}_t &= \dfrac{\text{CFADS}_t}{\text{DSCR}_{\text{target}}} \\[6pt] \text{Principal}_t &= \text{DS}_t - \text{Interest}_t \end{aligned}`,
    plain: "DS(t) = CFADS(t) / Target DSCR; Principal(t) = DS(t) − Interest(t)"
  },
  capacity: {
    tex: String.raw`\text{Debt capacity} = \sum_{t=1}^{n} \dfrac{\text{DS}_t}{(1 + r_d)^{t}}`,
    plain: "Debt capacity = Σ DS(t) / (1 + rd)^t"
  },
  capacityExample: {
    tex: String.raw`\dfrac{10}{1.05} + \dfrac{11}{1.05^{2}} + \dfrac{12}{1.05^{3}} = \text{€}29.87\text{m}`,
    plain: "10 / 1.05 + 11 / 1.05² + 12 / 1.05³ = €29.87m"
  },
  allIn: {
    tex: String.raw`r_{\text{all-in}} = \text{EURIBOR} + \text{Credit margin}`,
    plain: "All-in rate = EURIBOR + Credit margin"
  },
  debtRoll: {
    tex: String.raw`\begin{aligned} \text{Closing debt} = {} & \text{Opening debt} \\ & + \text{Drawdown} - \text{Repayment} \end{aligned}`,
    plain: "Closing debt = Opening debt + Drawdown − Repayment"
  },
  balance: {
    tex: String.raw`\text{Assets} = \text{Liabilities} + \text{Equity}`,
    plain: "Assets = Liabilities + Equity"
  },
  cfo: {
    tex: String.raw`\begin{aligned} \text{CFO} = {} & \text{Net income} + \text{Non-cash charges} \\ & - \Delta\,\text{NWC} \end{aligned}`,
    plain: "CFO = Net income + Non-cash charges − ΔNWC"
  },
  nwc: {
    tex: String.raw`\text{NWC} \approx \text{Receivables} + \text{Inventory} - \text{Payables}`,
    plain: "NWC ≈ Receivables + Inventory − Payables"
  },
  ev: {
    tex: String.raw`\begin{aligned} \text{EV} = {} & \text{Equity value} + \text{Net debt} \\ & + \text{Other debt-like claims} \end{aligned}`,
    plain: "EV = Equity value + Net debt + Other debt-like claims"
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
    tex: String.raw`\text{TV}_n = \text{EBITDA}_n \times \text{Exit multiple}`,
    plain: "TV(n) = EBITDA(n) × Exit multiple"
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
    tex: String.raw`\text{MOIC} = \dfrac{\text{Total equity proceeds}}{\text{Equity invested}}`,
    plain: "MOIC = Total equity proceeds / Equity invested"
  },
  irrSingle: {
    tex: String.raw`\begin{aligned} \text{IRR} &= \text{MOIC}^{\,1/n} - 1 \\[4pt] \text{Three years:}\quad 2.0^{1/3} - 1 &= 26.0\% \\[4pt] \text{Fifteen years:}\quad 2.0^{1/15} - 1 &= 4.7\% \end{aligned}`,
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
    tex: String.raw`\begin{aligned} \text{TCO} = {} & \text{Purchase} + \text{Financing} \\ & + \text{Energy} + \text{Maintenance} \\ & + \text{Insurance} + \text{Taxes} \\ & - \text{Residual value} \end{aligned}`,
    plain: "TCO = Purchase + Financing + Energy + Maintenance + Insurance + Taxes − Residual value"
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

/* Practice Content */
window.Guide = window.Guide || {};

/* Flashcards Grouped by Module */
Guide.flashcards = [
  { id: "f1", module: "project-finance", q: "What is CFADS?", a: "<p>CFADS stands for Cash Flow Available for Debt Service, meaning the cash a project generates to pay scheduled interest and principal. Precise definitions are contractual.</p>" },
  { id: "f2", module: "project-finance", q: "How is DSCR calculated?", a: '<div class="eq eq-compact" data-f="dscr"></div><p>CFADS of €13m against €10m of debt service gives 1.30x.</p>' },
  { id: "f3", module: "project-finance", q: "How is LLCR calculated?", a: '<div class="eq eq-compact" data-f="llcr"></div><p>Discounting typically uses the cost of debt.</p>' },
  { id: "f4", module: "project-finance", q: "LLCR versus PLCR?", a: "<p>LLCR covers the remaining loan life, whereas PLCR covers the remaining project life. PLCR therefore captures tail cash flows and is usually higher.</p>" },
  { id: "f5", module: "project-finance", q: "Why does project finance use an SPV?", a: "<p>Ring-fencing lets lenders rely on the asset's cash flows and contracts while sponsors limit their recourse.</p>" },
  { id: "f6", module: "project-finance", q: "What sits at the bottom of the waterfall?", a: "<p>Equity distributions come last, because shareholders hold the residual claim and are paid only after senior debt service and reserves clear the distribution test.</p>" },
  { id: "f7", module: "project-finance", q: "What does a DSRA do?", a: "<p>DSRA stands for Debt Service Reserve Account, a liquidity buffer covering debt service during temporary shortfalls.</p>" },
  { id: "f8", module: "project-finance", q: "What is a lock-up?", a: "<p>Lock-ups block distributions when DSCR falls below a set threshold, keeping cash inside the SPV.</p>" },
  { id: "f9", module: "debt", q: "How is debt sized?", a: '<div class="eq eq-compact" data-f="debtMin"></div><p>Whichever limit is lowest becomes the binding constraint.</p>' },
  { id: "f10", module: "debt", q: "What is debt sculpting?", a: '<div class="eq eq-compact" data-f="sculpt"></div>' },
  { id: "f11", module: "debt", q: "How is sculpted debt capacity calculated?", a: '<div class="eq eq-compact" data-f="capacity"></div><p>Discount permitted debt service at the all-in cost of debt.</p>' },
  { id: "f12", module: "debt", q: "What is a tail?", a: "<p>Tail refers to the period between final debt maturity and the end of the contract or asset life. Tail cash flows give lenders a cushion.</p>" },
  { id: "f13", module: "debt", q: "What does an interest rate swap do?", a: "<p>Swaps convert floating-rate payments into fixed-rate payments, protecting DSCR against rising EURIBOR.</p>" },
  { id: "f14", module: "debt", q: "Bankable versus investable?", a: "<p>Bankable means lenders accept the repayment risk. Investable means the equity return justifies the equity risk.</p>" },
  { id: "f15", module: "modelling", q: "What is the Excel NPV trap?", a: "<p><code>NPV</code> discounts its first cash flow by one period, so write <code>=CF0 + NPV(rate, CF1:CFn)</code>.</p>" },
  { id: "f16", module: "modelling", q: "IRR versus XIRR?", a: "<p>IRR assumes evenly spaced periods, whereas XIRR uses actual dates. French Excel calls them <code>TRI</code> and <code>TRI.PAIEMENTS</code>.</p>" },
  { id: "f17", module: "modelling", q: "Sensitivity versus scenario?", a: "<p>Sensitivity changes one variable to isolate its impact. Scenario combines several assumptions into one coherent state of the world.</p>" },
  { id: "f18", module: "modelling", q: "What is the debt roll-forward check?", a: '<div class="eq eq-compact" data-f="debtRoll"></div>' },
  { id: "f19", module: "modelling", q: "How can circularity be resolved?", a: "<ul><li>Copy-Paste Macro</li><li>Iterative Calculation With a Circuit Breaker</li><li>Algebraic Solve</li></ul>" },
  { id: "f20", module: "accounting-valuation", q: "Why is EBITDA not cash flow?", a: "<p>EBITDA ignores five cash items:</p><ul><li>Capex</li><li>Working Capital Movements</li><li>Taxes</li><li>Interest</li><li>Debt Repayment</li></ul>" },
  { id: "f21", module: "accounting-valuation", q: "Depreciation rises €10 at 25% tax. What happens to cash?", a: "<p>Cash rises by €2.50. Net income falls €7.50, then the €10 non-cash charge is added back.</p>" },
  { id: "f22", module: "accounting-valuation", q: "Receivables rise by €20. What happens to cash?", a: "<p>Operating cash flow falls by €20, because any increase in NWC is a use of cash.</p>" },
  { id: "f23", module: "accounting-valuation", q: "What is the enterprise value bridge?", a: '<div class="eq eq-compact" data-f="ev"></div>' },
  { id: "f24", module: "accounting-valuation", q: "How is FCFF calculated?", a: '<div class="eq eq-compact" data-f="fcff"></div>' },
  { id: "f25", module: "accounting-valuation", q: "How is WACC calculated?", a: '<div class="eq eq-compact" data-f="wacc"></div>' },
  { id: "f26", module: "accounting-valuation", q: "What is CAPM?", a: '<div class="eq eq-compact" data-f="capm"></div>' },
  { id: "f27", module: "accounting-valuation", q: "What is the Gordon growth terminal value?", a: '<div class="eq eq-compact" data-f="gordon"></div><p>Growth must stay below WACC.</p>' },
  { id: "f28", module: "returns", q: "What does NPV answer?", a: "<p>NPV shows how much economic value an investment creates at the required return.</p>" },
  { id: "f29", module: "returns", q: "MOIC of 2.0x over three years versus fifteen: what are the IRRs?", a: "<p>IRR is about 26.0% over three years versus about 4.7% over fifteen. MOIC ignores time, whereas IRR does not.</p>" },
  { id: "f30", module: "returns", q: "When does leverage lift equity IRR?", a: "<p>Leverage lifts equity IRR when the asset's return exceeds the cost of debt. Losses are amplified too, so leverage redistributes risk rather than creating value.</p>" },
  { id: "f31", module: "investing", q: "What are the three risk allocation questions?", a: "<p>Who controls the risk? Who bears it contractually? What happens economically if it materialises?</p>" },
  { id: "f32", module: "investing", q: "What is expected loss?", a: '<div class="eq eq-compact" data-f="el"></div>' },
  { id: "f33", module: "investing", q: "Where does investment grade begin?", a: "<p>Investment grade begins at BBB− for S&amp;P and Fitch, or Baa3 for Moody's.</p>" },
  { id: "f34", module: "mobility", q: "Why does battery degradation matter?", a: "<p>Faster degradation lowers range and brings replacement capex forward, reducing CFADS together with IRR and coverage.</p>" },
  { id: "f35", module: "mobility", q: "AC versus DC charging?", a: "<p>AC delivers lower power, typically up to 22 kW, for long dwell times. DC delivers far higher power for large batteries such as buses.</p>" },
  { id: "f36", module: "mobility", q: "Revenue is fixed while opex inflates. What happens?", a: "<p>Margins compress, so CFADS falls and DSCR weakens.</p>" },
  { id: "f37", module: "neot", q: "What are Neot's equity and financing capacity?", a: "<p>Neot holds about €500m of equity across its platforms, supporting financing capacity of nearly €2bn of assets.</p>" },
  { id: "f38", module: "neot", q: "What is Neot e-motion?", a: "<p>Neot e-motion is a pan-European low-carbon mobility platform launched in May 2025 with a €350m equity commitment from Mirova and Alba Infra Partners alongside Banque des Territoires.</p>" },
  { id: "f39", module: "neot", q: "Who owns Neot Capital?", a: "<ul><li>EDF Through EDF Pulse Ventures</li><li>Forsee Power, a Battery Manufacturer</li><li>Mitsui &amp; Co.</li></ul>" },
  { id: "f40", module: "neot", q: "How is Neot e-motion's debt structured?", a: "<p>MUFG provided €125m of senior financing as sole lender, announced in December 2025. Structured over 16 years, the facility combines a revolving credit facility with long-term project financing.</p>" },
  { id: "f41", module: "neot", q: "What was Neot e-motion's first deal?", a: "<p>Neot e-motion financed 186 BYD electric buses and 93 Efacec chargers in Denmark for GoCollective, announced in January 2026.</p>" }
];

/* Multiple Choice Quiz */
Guide.quiz = [
  {
    module: "project-finance",
    q: "CFADS is €13m, interest is €4m and principal is €6m. What is the DSCR?",
    options: ["1.30x", "2.17x", "3.25x", "0.77x"],
    answer: 0,
    explain: "DSCR equals CFADS divided by total debt service: 13 ÷ 10 = 1.30x. Dividing by principal or interest alone is a common slip."
  },
  {
    module: "project-finance",
    q: "Which statement about LLCR and PLCR is correct?",
    options: [
      "PLCR includes cash flows after debt maturity, so it is usually at least as high as LLCR.",
      "LLCR always exceeds PLCR.",
      "Both ratios measure a single period.",
      "PLCR excludes CFADS during the loan life."
    ],
    answer: 0,
    explain: "PLCR uses the remaining project life, so positive tail cash flows push it above LLCR."
  },
  {
    module: "project-finance",
    q: "Which payment comes last in a typical waterfall?",
    options: ["Equity Distributions", "Senior Interest", "DSRA Top-Up", "Operating Expenses"],
    answer: 0,
    explain: "Equity is residual, paid only after senior debt service and reserves clear the distribution test."
  },
  {
    module: "debt",
    q: "CFADS is €26m and the target DSCR is 1.30x. What is the maximum debt service for that period?",
    options: ["€20.0m", "€33.8m", "€26.0m", "€18.2m"],
    answer: 0,
    explain: "Permitted debt service equals CFADS divided by the target DSCR: 26 ÷ 1.30 = €20.0m."
  },
  {
    module: "debt",
    q: "DSCR-based capacity is €52m, total cost is €75m and gearing is capped at 60%. How much debt is raised?",
    options: ["€45m", "€52m", "€75m", "€30m"],
    answer: 0,
    explain: "Gearing cap equals 60% × €75m = €45m, below the €52m DSCR capacity, so the binding constraint wins."
  },
  {
    module: "debt",
    q: "Reference rates rise sharply and the debt is floating and unhedged. What follows?",
    options: [
      "Higher debt service squeezes DSCR and distributions.",
      "DSCR improves.",
      "Debt capacity increases.",
      "Nothing changes until maturity."
    ],
    answer: 0,
    explain: "Higher interest raises debt service directly, compressing coverage and equity cash flow."
  },
  {
    module: "debt",
    q: "Why do lenders insist on a tail?",
    options: [
      "Cash flows after maturity provide a cushion for delays or restructuring.",
      "Lenders want the longest possible tenor.",
      "Lenders want a lower tax rate.",
      "Equity investors demand it."
    ],
    answer: 0,
    explain: "Tail cash flows give lenders room to extend or restructure if performance disappoints."
  },
  {
    module: "modelling",
    q: "CF0 sits in B1 and later cash flows in C1:L1. Which formula computes NPV correctly?",
    options: ["=B1 + NPV(r, C1:L1)", "=NPV(r, B1:L1)", "=IRR(B1:L1)", "=NPV(r, C1:L1) × B1"],
    answer: 0,
    explain: "Excel's NPV discounts its first argument by one period, so the time-zero flow must sit outside the function."
  },
  {
    module: "modelling",
    q: "Capex +10%, utilisation −10% and a six-month delay run together. What is this?",
    options: ["Scenario", "Sensitivity", "Breakeven", "Audit"],
    answer: 0,
    explain: "Several coherent assumption changes combined form a scenario."
  },
  {
    module: "accounting-valuation",
    q: "Depreciation rises by €10 with a 25% tax rate. What happens to cash?",
    options: ["+€2.50", "−€7.50", "−€10.00", "Unchanged"],
    answer: 0,
    explain: "Net income falls €7.50 and the €10 non-cash charge is added back, so cash rises by the €2.50 tax shield."
  },
  {
    module: "accounting-valuation",
    q: "Receivables increase by €20. What is the effect on operating cash flow?",
    options: ["−€20", "+€20", "Zero", "−€15 After Tax"],
    answer: 0,
    explain: "Any increase in working capital absorbs cash."
  },
  {
    module: "accounting-valuation",
    q: "Equity value is €300m and net debt is €200m. What is enterprise value?",
    options: ["€500m", "€100m", "€300m", "€200m"],
    answer: 0,
    explain: "Enterprise value equals equity value plus net debt, giving €500m."
  },
  {
    module: "accounting-valuation",
    q: "Which multiple uses equity value as its numerator?",
    options: ["P/E", "EV/EBITDA", "EV/EBIT", "EV/Revenue"],
    answer: 0,
    explain: "Earnings after interest belong to shareholders, so they pair with equity value."
  },
  {
    module: "accounting-valuation",
    q: "Risk-free rate is 3%, beta is 1.2 and the equity risk premium is 5%. What is the cost of equity?",
    options: ["9.0%", "8.0%", "6.6%", "11.0%"],
    answer: 0,
    explain: "Cost of equity equals 3% + 1.2 × 5% = 9.0%."
  },
  {
    module: "accounting-valuation",
    q: "Next year's FCF is €10m, WACC is 8% and growth is 2%. What is the terminal value?",
    options: ["€166.7m", "€125.0m", "€500.0m", "€100.0m"],
    answer: 0,
    explain: "Terminal value equals 10 ÷ (8% − 2%) = €166.7m."
  },
  {
    module: "returns",
    q: "Equity doubles in exactly three years with a single exit. What is the IRR?",
    options: ["About 26%", "About 33%", "About 20%", "About 50%"],
    answer: 0,
    explain: "IRR equals 2^(1/3) − 1, roughly 25.99%."
  },
  {
    module: "returns",
    q: "Suppose a €100 asset is bought with €60 of debt at 5% and sold after a year for €120. What is the equity return?",
    options: ["42.5%", "20.0%", "50.0%", "35.0%"],
    answer: 0,
    explain: "Equity invests €40 and receives €120 − €63 = €57, a 42.5% return."
  },
  {
    module: "returns",
    q: "Project IRR is 9% and the cost of debt is 5%. What happens to equity IRR as leverage rises?",
    options: ["Rises Above Project IRR, With More Risk", "Falls Below Project IRR", "Equals Project IRR", "Turns Negative"],
    answer: 0,
    explain: "Shareholders keep the spread between asset return and debt cost, at the price of greater volatility."
  },
  {
    module: "investing",
    q: "PD is 2%, LGD is 40% and EAD is €10m. What is expected loss?",
    options: ["€80k", "€200k", "€400k", "€800k"],
    answer: 0,
    explain: "Expected loss equals 2% × 40% × €10m = €80k."
  },
  {
    module: "investing",
    q: "Lenders accept a project but the equity IRR sits below the fund's hurdle. How should the project be described?",
    options: ["Bankable but Not Investable", "Investable but Not Bankable", "Neither", "Both"],
    answer: 0,
    explain: "Raising debt successfully does not make the equity case attractive."
  },
  {
    module: "mobility",
    q: "Residual value falls 20% and arrives after debt maturity. What is affected?",
    options: ["Equity IRR Only", "DSCR Only", "DSCR and LLCR", "Nothing"],
    answer: 0,
    explain: "Lenders are already repaid, so the entire shortfall lands on equity returns."
  },
  {
    module: "mobility",
    q: "Electric buses charge overnight in a depot. Which charging technology is generally used?",
    options: ["DC Depot Chargers", "Household AC Sockets", "Battery Swapping", "Pantograph Chargers Only"],
    answer: 0,
    explain: "Bus batteries hold several hundred kWh, so even overnight charging generally needs DC power."
  },
  {
    module: "mobility",
    q: "Budget assumes 100 buses at €100k each. Actual: 95 buses at €102k. What is the volume effect?",
    options: ["−€0.50m", "+€0.19m", "−€0.31m", "−€0.20m"],
    answer: 0,
    explain: "Volume effect equals (95 − 100) × €100k = −€0.50m. Price adds +€0.19m for a total of −€0.31m."
  },
  {
    module: "neot",
    q: "Neot holds about €500m of equity with financing capacity of nearly €2bn. What leverage does that imply?",
    options: ["About 75% Debt", "About 25% Debt", "About 50% Debt", "About 90% Debt"],
    answer: 0,
    explain: "€500m of equity funds about a quarter of €2bn of assets, so roughly three quarters would be debt-funded."
  },
  {
    module: "neot",
    q: "Which name is not among the backers of Neot e-motion's €350m equity commitment?",
    options: ["Mitsui & Co.", "Mirova", "Alba Infra Partners", "Banque des Territoires"],
    answer: 0,
    explain: "Mitsui is a shareholder of Neot Capital itself, while the platform's equity comes from Mirova and Alba Infra Partners alongside Banque des Territoires."
  },
  {
    module: "neot",
    q: "How is Neot e-motion's €125m MUFG facility structured?",
    options: [
      "16-Year Hybrid Portfolio Facility Combining an RCF With Term Project Financing",
      "Five-Year Bullet Corporate Loan to Neot Capital",
      "Green Bond Listed in Paris",
      "Shareholder Loan From Mitsui"
    ],
    answer: 0,
    explain: "Announced in December 2025, the facility gives the platform a full equity plus debt structure, with MUFG as sole lender."
  }
];

/* Three-Statement Drills at a 25% Tax Rate */
Guide.drills = [
  {
    id: "depreciation",
    title: "Depreciation +€10",
    prompt: "Depreciation increases by €10. Walk through all three statements.",
    is: [["D&A", "+10"], ["EBIT", "−10"], ["Taxes", "−2.5"], ["Net Income", "−7.5"]],
    cf: [["Net Income", "−7.5"], ["Add Back D&A", "+10"], ["Change in Cash", "+2.5"]],
    bs: [["Cash", "+2.5"], ["PP&E", "−10"], ["Total Assets", "−7.5"], ["Retained Earnings", "−7.5"]],
    takeaway: "Non-cash charges reduce profit but increase cash by the tax shield."
  },
  {
    id: "capex",
    title: "Capex of €10",
    prompt: "Equipment worth €10 is bought and paid in cash.",
    is: [["Income Statement", "Unchanged"], ["Later Periods", "Depreciation"]],
    cf: [["CFI", "−10"], ["Change in Cash", "−10"]],
    bs: [["PP&E", "+10"], ["Cash", "−10"], ["Total Assets", "Unchanged"]],
    takeaway: "Capex swaps one asset for another, so profit only moves later through depreciation."
  },
  {
    id: "new-debt",
    title: "New Debt of €10",
    prompt: "Management raises €10 of new debt.",
    is: [["Income Statement", "Unchanged"], ["Later Periods", "Interest Expense"]],
    cf: [["CFF", "+10"], ["Change in Cash", "+10"]],
    bs: [["Cash", "+10"], ["Debt", "+10"], ["Total Assets", "+10"]],
    takeaway: "Borrowing raises cash and liabilities equally, and interest reaches profit later."
  },
  {
    id: "repayment",
    title: "Debt Repayment of €10",
    prompt: "Management repays €10 of debt principal.",
    is: [["Income Statement", "Unchanged"]],
    cf: [["CFF", "−10"], ["Change in Cash", "−10"]],
    bs: [["Cash", "−10"], ["Debt", "−10"], ["Total Assets", "−10"]],
    takeaway: "Principal repayment is a financing flow, never an income statement expense."
  },
  {
    id: "revenue",
    title: "Revenue +€10",
    prompt: "Revenue rises by €10, collected in cash, with no additional costs.",
    is: [["Revenue", "+10"], ["Taxes", "+2.5"], ["Net Income", "+7.5"]],
    cf: [["Net Income", "+7.5"], ["Change in Cash", "+7.5"]],
    bs: [["Cash", "+7.5"], ["Retained Earnings", "+7.5"]],
    takeaway: "Had the €10 been invoiced but not collected, receivables would rise €10 and cash would fall €2.5 because tax is still paid."
  },
  {
    id: "working-capital",
    title: "Working Capital +€10",
    prompt: "Inventory increases by €10, purchased with cash.",
    is: [["Income Statement", "Unchanged"]],
    cf: [["Increase in NWC", "−10"], ["Change in Cash", "−10"]],
    bs: [["Inventory", "+10"], ["Cash", "−10"], ["Total Assets", "Unchanged"]],
    takeaway: "Any rise in working capital is a use of cash even though profit is unchanged."
  },
  {
    id: "interest",
    title: "Interest Expense +€10",
    prompt: "Interest expense of €10 is incurred and paid in cash.",
    is: [["Interest", "+10"], ["Taxes", "−2.5"], ["Net Income", "−7.5"]],
    cf: [["Net Income", "−7.5"], ["Change in Cash", "−7.5"]],
    bs: [["Cash", "−7.5"], ["Retained Earnings", "−7.5"]],
    takeaway: "Interest is tax-deductible, so its after-tax cost is €7.50."
  },
  {
    id: "impairment",
    title: "Impairment of €10",
    prompt: "Fixed assets are impaired by €10. Assume the charge is tax-deductible.",
    is: [["Impairment", "+10"], ["Taxes", "−2.5"], ["Net Income", "−7.5"]],
    cf: [["Net Income", "−7.5"], ["Add Back Impairment", "+10"], ["Change in Cash", "+2.5"]],
    bs: [["PP&E", "−10"], ["Cash", "+2.5"], ["Retained Earnings", "−7.5"]],
    takeaway: "Impairment behaves like depreciation. Without tax deductibility, often the case for goodwill, net income falls €10 and cash is unchanged."
  }
];

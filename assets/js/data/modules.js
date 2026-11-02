/* Study Modules Content */
window.Guide = window.Guide || {};

Guide.modules = [
  /* Project Finance Essentials */
  {
    id: "project-finance",
    title: "Project Finance Essentials",
    short: "Project Finance",
    tier: 1,
    icon: "layers",
    minutes: 20,
    summary: "SPV logic and the cash flow waterfall, from CFADS to coverage ratios and reserves.",
    takeaways: [
      "Lenders rely on ring-fenced project cash flows and contracts rather than on the sponsor's balance sheet.",
      "CFADS drives debt sizing and coverage tests as well as distributions.",
      "Equity is the residual claim, so any cash shortfall hits shareholders first."
    ],
    sections: [
      {
        id: "spv",
        title: "SPV and Non-Recourse Logic",
        html: `
          <p>Project finance funds a single asset or portfolio through a ring-fenced special purpose vehicle (SPV). Lenders look primarily to the SPV's cash flows and contracts for repayment, with limited or no recourse to the sponsors. Contracts and due diligence therefore carry enormous weight.</p>
          <div data-widget="spv"></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th></th><th>Corporate Lending</th><th>Project Finance</th></tr></thead>
              <tbody>
                <tr><td><strong>Borrower</strong></td><td>Diversified Operating Company</td><td>Dedicated SPV</td></tr>
                <tr><td><strong>Repayment Source</strong></td><td>Group Cash Flows</td><td>Ring-Fenced Project Cash Flows</td></tr>
                <tr><td><strong>Credit Analysis</strong></td><td>Historical Financials</td><td>Forecasts and Contracts</td></tr>
                <tr><td><strong>Leverage</strong></td><td>Capped by Group Ratios</td><td>Often Higher on Contracted Revenue</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Neot Lens</span>
            <p>Neot platforms acquire fleets and make them available to operators as integrated services. Viewed through a project finance lens, each financing behaves like an owner-lessor: contracted payments service the debt, and equity receives what remains.</p></div>
          </div>`
      },
      {
        id: "sources-uses",
        title: "Sources and Uses",
        html: `
          <p>Uses describe where money goes at financial close, while sources describe who provides it. Both totals must always match.</p>
          <div class="grid grid-2">
            <div class="table-wrap">
              <table>
                <thead><tr><th>Uses</th><th class="num">€m</th></tr></thead>
                <tbody>
                  <tr><td>Electric Vehicles</td><td class="num">60.0</td></tr>
                  <tr><td>Charging Infrastructure</td><td class="num">10.0</td></tr>
                  <tr><td>Other Deployment Costs</td><td class="num">5.0</td></tr>
                  <tr class="is-total"><td>Total Uses</td><td class="num">75.0</td></tr>
                </tbody>
              </table>
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>Sources</th><th class="num">€m</th></tr></thead>
                <tbody>
                  <tr><td>Senior Debt (60%)</td><td class="num">45.0</td></tr>
                  <tr><td>Equity (40%)</td><td class="num">30.0</td></tr>
                  <tr><td>&nbsp;</td><td class="num">&nbsp;</td></tr>
                  <tr class="is-total"><td>Total Sources</td><td class="num">75.0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="eq" data-f="gearing"></div>
          <p>Other common uses include financing fees and interest during construction, along with initial reserve funding and contingency.</p>`
      },
      {
        id: "waterfall",
        title: "Cash Flow Waterfall",
        html: `
          <p>Cash moves through a contractual order of priority. Exact ordering depends on the financing documents, so present this sequence as typical rather than universal.</p>
          <ol class="steps steps-compact">
            <li><strong>Revenue Collected</strong></li>
            <li><strong>Operating Costs and Taxes</strong></li>
            <li><strong>CFADS</strong></li>
            <li><strong>Senior Interest and Fees</strong></li>
            <li><strong>Senior Principal</strong></li>
            <li><strong>Reserve Top-Ups</strong></li>
            <li><strong>Distribution Test (Lock-Up)</strong></li>
            <li><strong>Subordinated Debt Service</strong></li>
            <li><strong>Equity Distributions</strong></li>
          </ol>
          <p>Move the slider to watch a weaker CFADS hit each tier. Senior debt service is €10.0m, and the lock-up threshold is set at 1.15x for illustration.</p>
          <div data-widget="waterfall"></div>`
      },
      {
        id: "cfads",
        title: "CFADS",
        html: `
          <p>Cash Flow Available for Debt Service (CFADS) is the cash a project generates to pay scheduled interest and principal. Lenders size and monitor debt on this figure, making it the most important number in any project finance model.</p>
          <div class="cascade">
            <div class="cascade-row"><span class="cascade-op">&nbsp;</span><span>Revenue</span><span class="note">Leases and Service Fees</span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Operating Expenses</span><span class="note">Maintenance and Insurance</span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Tax Paid</span><span class="note">Cash Tax Only</span></div>
            <div class="cascade-row"><span class="cascade-op">±</span><span>Working Capital Movements</span><span class="note">Timing of Receipts</span></div>
            <div class="cascade-row"><span class="cascade-op">±</span><span>Capex and Reserve Movements</span><span class="note">Replacements and MRA</span></div>
            <div class="cascade-row is-total"><span class="cascade-op">=</span><span>CFADS</span><span class="note">Available for Debt Service</span></div>
          </div>
          <div class="callout callout-amber">
            <div><span class="callout-title">Precision Matters</span>
            <p>CFADS has a contractual definition in the facility agreement, so never present one formula as universal. Never equate CFADS with EBITDA either, since EBITDA ignores tax paid along with working capital and replacement capex.</p></div>
          </div>`
      },
      {
        id: "ratios",
        title: "Coverage Ratios",
        html: `
          <h4>Debt Service Coverage Ratio</h4>
          <div class="eq" data-f="dscr"></div>
          <div class="eq eq-example" data-f="dscrExample"></div>
          <p>Put simply, the project generates €1.30 of CFADS for every €1 owed in that period. Below 1.00x, CFADS cannot cover debt service, so the shortfall must come from the DSRA or sponsor support.</p>
          <h4>Loan and Project Life Coverage Ratios</h4>
          <div class="eq" data-f="llcr"></div>
          <div class="eq" data-f="plcr"></div>
          <p class="formula-note">Discounting typically uses the cost of debt. Some facility agreements add the DSRA balance to the numerator.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Ratio</th><th>Horizon</th><th>Question Answered</th></tr></thead>
              <tbody>
                <tr><td><strong>DSCR</strong></td><td>Single Period</td><td>Can this period's cash meet this period's debt service?</td></tr>
                <tr><td><strong>LLCR</strong></td><td>Remaining Loan Life</td><td>Does the value of future CFADS cover outstanding debt?</td></tr>
                <tr><td><strong>PLCR</strong></td><td>Remaining Project Life</td><td>How much cushion exists once the post-maturity tail is included?</td></tr>
              </tbody>
            </table>
          </div>
          <p>Lenders watch the <strong>minimum DSCR</strong>, because a single weak period can trigger a lock-up that an average would hide. PLCR normally exceeds LLCR when cash flows after debt maturity are positive, and that gap measures the value of the tail.</p>
          <div class="callout callout-amber">
            <div><span class="callout-title">Thresholds Are Deal-Specific</span>
            <p>Structures commonly set a sizing DSCR above a lock-up level, which in turn sits above a default level. Present any specific figure as an assumption rather than a market rule.</p></div>
          </div>`
      },
      {
        id: "reserves",
        title: "Reserves and Lender Protections",
        html: `
          <div class="grid grid-2">
            <div class="card">
              <h4>Debt Service Reserve Account</h4>
              <p>DSRA is a liquidity buffer covering debt service during temporary shortfalls. Sizing is often expressed in months of forward debt service but remains transaction-specific. Cash funding dilutes equity IRR, while a letter of credit costs a fee instead.</p>
            </div>
            <div class="card">
              <h4>Maintenance Reserve Account</h4>
              <p>MRA accumulates cash ahead of lumpy outflows such as battery replacements. Fleet financings depend heavily on it, because battery replacement is a large and uncertain cost.</p>
            </div>
          </div>
          <ul>
            <li><strong>Lock-Up:</strong> Distributions stop when DSCR falls below a set level, keeping cash inside the SPV.</li>
            <li><strong>Cash Sweep:</strong> Excess cash prepays debt, either always or after a trigger.</li>
            <li><strong>Event of Default:</strong> DSCR below a lower threshold or a missed payment lets lenders accelerate the loan.</li>
          </ul>`
      },
      {
        id: "phases",
        title: "Deployment Versus Operations",
        html: `
          <p>Risk changes character over an asset's life. During deployment, the main threats are delivery delays and cost overruns, together with supplier performance and the time needed to secure grid connections and permits. Contracts with manufacturers usually address these through delay penalties and fixed prices.</p>
          <p>Once assets operate, attention shifts to utilisation and availability, then to operating cost inflation and the counterparty's ability to keep paying. Over the longer term, technology obsolescence and residual value become the risks that equity investors watch most closely.</p>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Neot Lens</span>
            <p>Fleet financings replace a long construction phase with a deployment phase covering vehicle delivery and charger installation. Neot's Danish financing, for example, commissions 186 electric buses in phases through mid-2026.</p></div>
          </div>`
      }
    ],
    ladder: [
      {
        q: "Explain DSCR.",
        weak: "DSCR = CFADS / debt service.",
        good: "DSCR measures the project's ability to service its debt in a given period.",
        great:
          "DSCR is CFADS divided by scheduled interest and principal. Practical uses span debt sizing and downside analysis. Whenever an operating assumption reduces CFADS, the first step is to locate the minimum DSCR and the period in which it occurs. Next comes identifying the assumption driving it, and finally judging whether the debt structure remains sustainable."
      },
      {
        q: "DSCR versus LLCR?",
        weak: "Coverage ratios used by banks.",
        good: "DSCR covers one period, whereas LLCR covers the remaining loan life on a present-value basis.",
        great:
          "DSCR tests liquidity period by period, so one weak year shows up immediately. LLCR divides the NPV of CFADS over the remaining loan life by outstanding debt, capturing overall solvency. Healthy LLCR with a weak minimum DSCR points to a timing issue that sculpting or a reserve can solve, whereas a weak LLCR signals that the debt quantum itself is too high."
      }
    ],
    traps: [
      "Treating EBITDA as if it were CFADS.",
      "Quoting a 1.30x DSCR or a six-month DSRA as universal rules.",
      "Confusing LLCR with PLCR or ignoring the tail between them."
    ]
  },

  /* Debt Sizing and Sculpting */
  {
    id: "debt",
    title: "Debt Sizing and Sculpting",
    short: "Debt Sizing",
    tier: 1,
    icon: "scale",
    minutes: 20,
    summary: "Binding constraints and sculpting mechanics, then hedging and the lender versus equity mindset.",
    takeaways: [
      "Debt equals whatever the binding constraint allows, never a chosen number.",
      "Sculpting sets debt service equal to CFADS divided by the target DSCR in every period.",
      "Leverage redistributes risk and return, so optimise it rather than maximise it."
    ],
    sections: [
      {
        id: "binding",
        title: "Sizing on the Binding Constraint",
        html: `
          <ul>
            <li><strong>DSCR Constraint:</strong> Debt service in each period cannot exceed CFADS divided by the target DSCR.</li>
            <li><strong>LLCR Constraint:</strong> Present value of CFADS must cover debt by a required multiple.</li>
            <li><strong>Gearing Constraint:</strong> Debt cannot exceed a set percentage of eligible project cost.</li>
            <li><strong>Tenor:</strong> Contract term and asset life cap the repayment period.</li>
            <li><strong>Other Limits:</strong> Minimum equity and lender appetite also apply.</li>
          </ul>
          <div class="eq" data-f="debtMin"></div>
          <p><strong>Fleet Case Lab Example:</strong> Sculpted capacity at 1.30x is roughly €52.0m, while a 60% gearing cap on €75m allows €45.0m. Gearing therefore binds at €45.0m, and the resulting DSCR settles near 1.50x.</p>
          <p><a class="btn btn-soft btn-sm" href="#/practice/case">Open the Fleet Case Lab</a></p>`
      },
      {
        id: "sculpting",
        title: "Debt Sculpting",
        html: `
          <p>Sculpting shapes principal repayments around expected CFADS so coverage stays constant, instead of forcing equal instalments onto uneven cash flows.</p>
          <div class="eq" data-f="sculpt"></div>
          <div class="eq" data-f="capacity"></div>
          <h4>Three-Year Example at 1.30x and 5%</h4>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Year</th><th class="num">CFADS</th><th class="num">Debt Service</th><th class="num">Opening</th><th class="num">Interest</th><th class="num">Principal</th><th class="num">Closing</th></tr></thead>
              <tbody>
                <tr><td>1</td><td class="num">13.00</td><td class="num">10.00</td><td class="num">29.87</td><td class="num">1.49</td><td class="num">8.51</td><td class="num">21.36</td></tr>
                <tr><td>2</td><td class="num">14.30</td><td class="num">11.00</td><td class="num">21.36</td><td class="num">1.07</td><td class="num">9.93</td><td class="num">11.43</td></tr>
                <tr><td>3</td><td class="num">15.60</td><td class="num">12.00</td><td class="num">11.43</td><td class="num">0.57</td><td class="num">11.43</td><td class="num">0.00</td></tr>
              </tbody>
            </table>
          </div>
          <div class="eq eq-example" data-f="capacityExample"></div>
          <p><strong>Circularity:</strong> Fees and reserves often depend on the debt amount, which in turn depends on them. Know exactly how Resonance models resolve this, whether through a copy-paste macro or iterative calculation.</p>`
      },
      {
        id: "profiles",
        title: "Repayment Profiles",
        html: `
          <div class="table-wrap">
            <table>
              <thead><tr><th>Profile</th><th>Mechanics</th></tr></thead>
              <tbody>
                <tr><td><strong>Bullet</strong></td><td>Principal is repaid in full at maturity.</td></tr>
                <tr><td><strong>Linear</strong></td><td>Equal principal each period, so debt service falls over time.</td></tr>
                <tr><td><strong>Annuity</strong></td><td>Total debt service stays constant while the principal share rises.</td></tr>
                <tr><td><strong>Sculpted</strong></td><td>Debt service tracks CFADS at a target DSCR.</td></tr>
                <tr><td><strong>Grace Period</strong></td><td>Only interest is paid during an initial period.</td></tr>
              </tbody>
            </table>
          </div>`
      },
      {
        id: "tenor",
        title: "Tenor and Tail at Neot",
        html: `
          <p>Longer tenor spreads principal over more periods, lowering annual debt service and raising capacity. Lenders still keep maturity short of the contract or asset life, leaving a <strong>tail</strong> of cash flows as a cushion.</p>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Neot Lens</span>
            <p>Fleet tenor is bounded by the customer contract together with vehicle and battery life. Neot e-motion's €125m MUFG facility, announced in December 2025, runs for 16 years and combines a revolving credit facility with long-term project financing. Portfolio structures like this fund new assets quickly, then term them out once contracts are in place.</p></div>
          </div>`
      },
      {
        id: "rates",
        title: "Interest Rates and Hedging",
        html: `
          <div class="eq" data-f="allIn"></div>
          <p>Floating-rate debt resets with EURIBOR, so infrastructure borrowers hedge with <strong>interest rate swaps</strong>, which fix the rate, or <strong>caps</strong>, which limit it. Lenders usually require a minimum hedged share.</p>
          <div class="chain">
            <span class="chain-step">Rates Rise on Unhedged Debt</span><span class="chain-arrow">→</span>
            <span class="chain-step">Interest ↑</span><span class="chain-arrow">→</span>
            <span class="chain-step">Debt Service ↑</span><span class="chain-arrow">→</span>
            <span class="chain-step">DSCR ↓</span><span class="chain-arrow">→</span>
            <span class="chain-step">Distributions and Equity IRR ↓</span>
          </div>
          <p>Before financial close, a higher rate also lowers the present value of permitted debt service, so the same CFADS supports less debt.</p>`
      },
      {
        id: "mindset",
        title: "Lender Versus Equity Mindset",
        html: `
          <div class="table-wrap">
            <table>
              <thead><tr><th></th><th>Lender</th><th>Equity Investor</th></tr></thead>
              <tbody>
                <tr><td><strong>Core Question</strong></td><td>Will I be repaid?</td><td>Does the return justify the risk?</td></tr>
                <tr><td><strong>Key Metrics</strong></td><td>DSCR and LLCR</td><td>Equity IRR and MOIC</td></tr>
                <tr><td><strong>Upside</strong></td><td>Capped at Interest and Fees</td><td>Uncapped Residual Value</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout">
            <div><span class="callout-title">Bankable Versus Investable</span>
            <p>Bankable means lenders accept the repayment risk. Investable means the equity return justifies the equity risk. Resonance work proves that a financing works, whereas Neot asks whether the asset deserves equity at all.</p></div>
          </div>
          <h4>Why Not Maximise Debt?</h4>
          <p>Pushing leverage to the maximum reduces financial flexibility and raises the margin lenders demand. Coverage also tightens, so the minimum DSCR drifts toward the lock-up level and a modest shortfall can stop distributions altogether. Sensible investors therefore choose the leverage at which downside cases remain acceptable for equity, rather than the most debt lenders will offer.</p>`
      }
    ],
    ladder: [
      {
        q: "How do you size debt?",
        weak: "Banks lend about 70 or 80 percent of the cost.",
        good: "Debt is sized on a target DSCR and checked against a gearing limit.",
        great:
          "Debt equals the lowest amount allowed by the binding constraint. First, build base-case CFADS. Second, compute the debt service each period supports at the target DSCR and discount it at the all-in cost of debt. Third, compare that capacity with the gearing cap and tenor limits. Whichever is smallest wins, and downside cases then confirm the structure survives realistic stress."
      },
      {
        q: "How do you sculpt debt?",
        weak: "Repayments follow the cash flows.",
        good: "Debt service equals CFADS divided by the target DSCR in each period.",
        great:
          "Sculpting sets debt service equal to CFADS divided by the target DSCR in every period, so coverage stays flat. Discounting that profile at the cost of debt gives the debt amount. Interest is then calculated on the opening balance and principal is the remainder, while fees that depend on debt make the calculation circular."
      },
      {
        q: "Why would you not maximise leverage?",
        weak: "Too much debt is risky.",
        good: "More debt increases default risk and reduces flexibility.",
        great:
          "Leverage does not create operating value but redistributes returns and risk between lenders and shareholders. Beyond a point, financing costs rise and the minimum DSCR approaches lock-up, so modest underperformance stops distributions altogether. Optimising structure means choosing leverage at which downside cases remain acceptable."
      }
    ],
    traps: [
      "Sizing on DSCR alone without checking the gearing cap.",
      "Mixing up average and minimum DSCR.",
      "Claiming leverage creates value rather than redistributing it."
    ]
  },

  /* Modelling and Model Audit */
  {
    id: "modelling",
    title: "Modelling and Model Audit",
    short: "Modelling",
    tier: 1,
    icon: "grid",
    minutes: 15,
    summary: "Model architecture and audit discipline, plus sensitivities and Excel essentials.",
    takeaways: [
      "Describe any model as a flow: Inputs → Calculations → Financing → Outputs.",
      "Audit architecture first, then inputs and integrity checks, then economic reasonableness.",
      "Neot shifts the question from “Does the formula work?” to “Should I believe the assumption?”"
    ],
    sections: [
      {
        id: "architecture",
        title: "Model Architecture",
        html: `
          <ol class="flow">
            <li><span class="flow-index">1</span><strong>Inputs</strong><span>Assumptions and Timeline</span></li>
            <li><span class="flow-index">2</span><strong>Operations</strong><span>Capex and Revenue Build</span></li>
            <li><span class="flow-index">3</span><strong>Financing</strong><span>CFADS and Debt Schedule</span></li>
            <li><span class="flow-index">4</span><strong>Outputs</strong><span>Returns and Checks</span></li>
          </ol>
          <p>Good practice keeps every assumption on the inputs sheet and out of formulas, with one consistent formula running across each row. Timing flags drive the calendar rather than manually selected date ranges, and all integrity checks feed a single master check so problems surface immediately.</p>`
      },
      {
        id: "audit",
        title: "Audit Framework",
        html: `
          <ol class="steps">
            <li><strong>Architecture:</strong> Understand structure and flow before touching formulas.</li>
            <li><strong>Inputs:</strong> Identify hardcodes and trace each assumption to a source.</li>
            <li><strong>Consistency:</strong> Look for formula breaks across rows and columns.</li>
            <li><strong>Integrity Checks:</strong> Confirm the balance sheet balances and no cash appears unexplained.</li>
            <li><strong>Timing and Signs:</strong> Check period alignment and sign conventions.</li>
            <li><strong>Stress and Reasonableness:</strong> Push extreme inputs and confirm outputs still make economic sense.</li>
          </ol>
          <div class="eq" data-f="debtRoll"></div>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Make It Personal</span>
            <p>Connect this framework to the QC procedure formalised at Resonance, and prepare one concrete story about the hardest error found.</p></div>
          </div>`
      },
      {
        id: "circularity",
        title: "Circularity",
        html: `
          <p>Circularity appears when fees or interest during construction depend on the debt amount, or when the DSRA is sized on debt service that itself depends on debt.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Solution</th><th>Strength</th><th>Weakness</th></tr></thead>
              <tbody>
                <tr><td><strong>Copy-Paste Macro</strong></td><td>Transparent and stable.</td><td>Must be rerun after every change.</td></tr>
                <tr><td><strong>Iterative Calculation</strong></td><td>Updates automatically.</td><td>Errors can lock in, so a circuit breaker is essential.</td></tr>
                <tr><td><strong>Algebraic Solve</strong></td><td>Removes circularity entirely.</td><td>Works only for simpler structures.</td></tr>
              </tbody>
            </table>
          </div>`
      },
      {
        id: "sensitivities",
        title: "Sensitivity Versus Scenario",
        html: `
          <div class="grid grid-2">
            <div class="card">
              <h4>Sensitivity</h4>
              <p>Change one variable to isolate its impact, such as residual value stepped from −20% to +10%.</p>
            </div>
            <div class="card">
              <h4>Scenario</h4>
              <p>Combine several assumptions into one coherent state of the world, such as lower utilisation alongside higher opex and a delay.</p>
            </div>
          </div>
          <p>Watch minimum DSCR and LLCR alongside project and equity IRR. Breakeven analysis adds power: State how far revenue can fall before minimum DSCR reaches 1.00x.</p>`
      },
      {
        id: "excel",
        title: "Excel Essentials",
        html: `
          <div class="table-wrap">
            <table>
              <thead><tr><th>English</th><th>French</th></tr></thead>
              <tbody>
                <tr><td><code>SUMIFS</code></td><td><code>SOMME.SI.ENS</code></td></tr>
                <tr><td><code>INDEX</code> / <code>MATCH</code></td><td><code>INDEX</code> / <code>EQUIV</code></td></tr>
                <tr><td><code>XLOOKUP</code></td><td><code>RECHERCHEX</code></td></tr>
                <tr><td><code>NPV</code> / <code>XNPV</code></td><td><code>VAN</code> / <code>VAN.PAIEMENTS</code></td></tr>
                <tr><td><code>IRR</code> / <code>XIRR</code></td><td><code>TRI</code> / <code>TRI.PAIEMENTS</code></td></tr>
                <tr><td><code>EOMONTH</code></td><td><code>FIN.MOIS</code></td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout callout-amber">
            <div><span class="callout-title">Classic Traps</span>
            <p><code>NPV</code> discounts its first cash flow by one full period, so write <code>=CF0 + NPV(rate, CF1:CFn)</code>. <code>IRR</code> assumes evenly spaced periods, whereas <code>XIRR</code> uses actual dates.</p></div>
          </div>`
      }
    ],
    ladder: [
      {
        q: "Walk me through a model you have built.",
        weak: "Listing tabs one by one without explaining the logic.",
        good: "Describing inputs through to outputs in order.",
        great:
          "Open with purpose, namely which decision the model supported and for whom. Then follow the flow from assumptions through operations to CFADS and debt sizing, ending with returns and sensitivities. Finish with the insight, meaning which assumption drove the result and what the sensitivities revealed about the structure."
      },
      {
        q: "How do you audit somebody else's model?",
        weak: "Checking that formulas show no errors.",
        good: "Reviewing inputs and formula consistency plus the balance sheet check.",
        great:
          "Start with architecture before any formula, then trace inputs to sources and scan for inconsistent rows. Integrity checks follow, covering the balance sheet and debt roll-forward as well as cash. Stress testing comes last, because a model can be mechanically correct yet economically absurd."
      }
    ],
    traps: [
      "Using Excel NPV on a range that includes the initial investment.",
      "Leaving iterative calculation on without a circuit breaker.",
      "Listing tabs instead of explaining the logic flow."
    ]
  },

  /* Accounting and Valuation */
  {
    id: "accounting-valuation",
    title: "Accounting and Valuation",
    short: "Accounting & Valuation",
    tier: 2,
    icon: "book",
    minutes: 20,
    summary: "Three statements and their links, then enterprise value and DCF mechanics.",
    takeaways: [
      "EBITDA is not cash, because it ignores capex and working capital as well as tax and financing flows.",
      "Non-cash charges cut profit but raise cash by the tax shield.",
      "Match cash flows to discount rates: FCFF at WACC, equity cash flows at the cost of equity."
    ],
    sections: [
      {
        id: "statements",
        title: "Three Statements",
        html: `
          <div class="cascade">
            <div class="cascade-row"><span class="cascade-op">&nbsp;</span><span>Revenue</span><span class="note"></span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Operating Costs</span><span class="note"></span></div>
            <div class="cascade-row is-total"><span class="cascade-op">=</span><span>EBITDA</span><span class="note"></span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Depreciation and Amortisation</span><span class="note">Non-Cash</span></div>
            <div class="cascade-row is-total"><span class="cascade-op">=</span><span>EBIT</span><span class="note"></span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Interest</span><span class="note"></span></div>
            <div class="cascade-row is-total"><span class="cascade-op">=</span><span>EBT</span><span class="note"></span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Taxes</span><span class="note"></span></div>
            <div class="cascade-row is-total"><span class="cascade-op">=</span><span>Net Income</span><span class="note"></span></div>
          </div>
          <div class="eq" data-f="balance"></div>
          <div class="eq" data-f="cfo"></div>
          <div class="grid grid-3">
            <div class="card"><h4>CFO</h4><p>Cash generated by operations, starting from net income.</p></div>
            <div class="card"><h4>CFI</h4><p>Mostly capex together with acquisitions and disposals.</p></div>
            <div class="card"><h4>CFF</h4><p>Debt and equity raised minus repayments and dividends.</p></div>
          </div>`
      },
      {
        id: "links",
        title: "How the Statements Link",
        html: `
          <ol class="steps">
            <li><strong>Net Income:</strong> Flows into retained earnings and opens the cash flow statement.</li>
            <li><strong>Depreciation:</strong> Gets added back in CFO and reduces PP&amp;E.</li>
            <li><strong>Capex:</strong> Appears in CFI and increases PP&amp;E.</li>
            <li><strong>Net Change in Cash:</strong> Updates the cash line, so the balance sheet balances.</li>
          </ol>
          <div class="eq" data-f="nwc"></div>
          <p><strong>Working Capital Intuition:</strong> Any increase in NWC is a use of cash. When receivables rise by €20 because customers have not paid, profit exists but operating cash flow falls by €20.</p>
          <p><a class="btn btn-soft btn-sm" href="#/practice/drills">Practise With Statement Drills</a></p>`
      },
      {
        id: "ev",
        title: "Enterprise Value Versus Equity Value",
        html: `
          <div class="eq" data-f="ev"></div>
          <p>Enterprise value belongs to all capital providers, whereas equity value belongs to shareholders. Equity value of €300m plus net debt of €200m gives enterprise value of €500m.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Multiple</th><th>Numerator</th><th>Why It Pairs</th></tr></thead>
              <tbody>
                <tr><td>EV / EBITDA</td><td>Enterprise Value</td><td>Both sides sit before financing.</td></tr>
                <tr><td>P / E</td><td>Equity Value</td><td>Earnings after interest belong to shareholders.</td></tr>
              </tbody>
            </table>
          </div>
          <p>Precedent transaction multiples usually exceed trading multiples, because acquirers pay a control premium.</p>`
      },
      {
        id: "dcf",
        title: "DCF and Cost of Capital",
        html: `
          <div class="eq" data-f="fcff"></div>
          <div class="eq" data-f="dcf"></div>
          <div class="eq" data-f="wacc"></div>
          <div class="eq" data-f="capm"></div>
          <div class="eq eq-example" data-f="capmExample"></div>
          <div class="eq" data-f="beta"></div>
          <p><strong>Consistency Principle:</strong> FCFF belongs to lenders and shareholders together, so it is discounted at WACC to give enterprise value. Equity cash flows are discounted at the cost of equity to give equity value directly.</p>`
      },
      {
        id: "terminal",
        title: "Terminal Value",
        html: `
          <div class="grid grid-2">
            <div class="card"><h4>Gordon Growth</h4><div class="eq eq-compact" data-f="gordon"></div><p class="small muted">Growth must stay below WACC.</p></div>
            <div class="card"><h4>Exit Multiple</h4><div class="eq eq-compact" data-f="exitMultiple"></div><p class="small muted">Imports current market pricing.</p></div>
          </div>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Neot Lens</span>
            <p>Fleets are finite-life assets, so model cash flows to the end of the contract and add a residual value for vehicles and batteries. Residual value plays the role terminal value plays in a corporate DCF.</p></div>
          </div>`
      }
    ],
    ladder: [
      {
        q: "Walk me through the three statements.",
        weak: "Naming the three statements without linking them.",
        good: "Describing each statement and noting that net income links them.",
        great:
          "Income statement shows profitability over a period, ending in net income. Balance sheet shows resources and claims at a point in time. Cash flow statement reconciles net income to cash through non-cash items and working capital, then adds investing and financing flows. Net income feeds retained earnings, and the change in cash updates the balance sheet so it balances."
      },
      {
        q: "Depreciation increases by €10 at a 25% tax rate. What happens?",
        weak: "Net income falls by €10.",
        good: "Net income falls by €7.50 and cash rises because depreciation is non-cash.",
        great:
          "EBIT falls by €10 and taxes fall by €2.50, so net income drops €7.50. Cash flow starts at −€7.50 and adds back €10, ending €2.50 higher thanks to the tax shield. Balance sheet effects: PP&E falls €10 and cash rises €2.50, so assets fall €7.50, matched by a €7.50 drop in retained earnings."
      },
      {
        q: "Walk me through a DCF.",
        weak: "Discount the cash flows and add them up.",
        good: "Project FCFF and discount it at WACC, then add a terminal value and bridge to equity.",
        great:
          "Project unlevered free cash flow over an explicit horizon and discount it at WACC. Adding a discounted terminal value gives enterprise value, and subtracting net debt gives equity value. For a fleet with a finite contract, replace the perpetuity with a residual value and test sensitivity to WACC and residual assumptions."
      }
    ],
    traps: [
      "Forgetting the tax effect on non-cash charges.",
      "Discounting FCFF at the cost of equity.",
      "Pairing P/E with enterprise value."
    ]
  },

  /* Returns and Leverage */
  {
    id: "returns",
    title: "Returns and Leverage",
    short: "Returns",
    tier: 2,
    icon: "trend",
    minutes: 10,
    summary: "Return metrics from NPV to MOIC, then project versus equity IRR and leverage.",
    takeaways: [
      "NPV measures value created, while IRR expresses the return as a rate.",
      "MOIC ignores time, so always pair it with IRR.",
      "Equity IRR exceeds project IRR only while the asset out-earns the cost of debt."
    ],
    sections: [
      {
        id: "npv-irr",
        title: "NPV and IRR",
        html: `
          <div class="eq" data-f="npv"></div>
          <div class="eq" data-f="irr"></div>
          <p>Positive NPV means the investment beats the required return. IRR is intuitive but has known weaknesses: it implicitly assumes interim cash is reinvested at the IRR itself, and it can produce multiple solutions when cash flows change sign more than once. Scale is invisible to IRR as well, so a small project can show a higher IRR than a larger one that creates more value, which is why NPV should rank competing projects.</p>`
      },
      {
        id: "moic",
        title: "MOIC",
        html: `
          <div class="eq" data-f="moic"></div>
          <p>Investing €50m and receiving €100m gives 2.0x, whether it takes three years or fifteen. IRR captures the difference.</p>
          <div class="eq eq-example" data-f="irrSingle"></div>`
      },
      {
        id: "project-equity",
        title: "Project IRR Versus Equity IRR",
        html: `
          <div class="grid grid-2">
            <div class="card"><h4>Project IRR</h4><p>Return on total investment from unlevered cash flows, independent of financing.</p></div>
            <div class="card"><h4>Equity IRR</h4><p>Return to shareholders after debt service, so it reflects leverage.</p></div>
          </div>
          <p>Fleet Case Lab figures show project IRR of about 8.7% against equity IRR of about 11.6% in the base case.</p>`
      },
      {
        id: "leverage",
        title: "Leverage Cuts Both Ways",
        html: `
          <p>Consider a €100 asset held for one year, financed with €60 of debt at 5%, so €63 is owed at exit.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Exit Value</th><th class="num">Unlevered Return</th><th class="num">Levered Return on €40</th></tr></thead>
              <tbody>
                <tr><td>Upside: €120</td><td class="num">+20.0%</td><td class="num">+42.5%</td></tr>
                <tr><td>Downside: €90</td><td class="num">−10.0%</td><td class="num">−32.5%</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout">
            <div><span class="callout-title">Line to Use in the Interview</span>
            <p>Leverage does not create operating value. Instead, it changes how returns and risk are shared between debt and equity, amplifying gains and losses alike.</p></div>
          </div>
          <p><a class="btn btn-soft btn-sm" href="#/practice/returns">Experiment in the Returns Lab</a></p>`
      }
    ],
    ladder: [
      {
        q: "IRR versus NPV?",
        weak: "IRR is a percentage while NPV is in euros.",
        good: "NPV measures value created; IRR is the rate that sets NPV to zero.",
        great:
          "NPV measures absolute value created at the required return, while IRR expresses the return as a rate. Investment decisions usually match under both measures, but IRR can mislead when projects differ in scale or timing. Ranking projects therefore calls for NPV, while IRR remains useful against hurdle rates."
      },
      {
        q: "Why could two investments share a MOIC but differ in IRR?",
        weak: "Because they have different risks.",
        good: "MOIC ignores time while IRR accounts for it.",
        great:
          "MOIC only compares money returned with money invested, so doubling capital in three years and in fifteen both show 2.0x. IRR accounts for timing, giving about 26% in the first case and under 5% in the second. Investors use both, because MOIC shows how much wealth is created and IRR shows how fast."
      }
    ],
    traps: [
      "Claiming leverage always improves returns.",
      "Comparing MOIC across different holding periods."
    ]
  },

  /* Investment Judgement and Credit */
  {
    id: "investing",
    title: "Investment Judgement and Credit",
    short: "Investing and Credit",
    tier: 2,
    icon: "target",
    minutes: 15,
    summary: "Due diligence and risk allocation, then investment committee reasoning and counterparty credit.",
    takeaways: [
      "Contracts and counterparties define an infrastructure asset's risk.",
      "For every risk, identify who controls it and who bears it before estimating the economic impact.",
      "Always close “Would you invest?” with a clear recommendation."
    ],
    sections: [
      {
        id: "cycle",
        title: "Investment Cycle at Neot",
        html: `
          <ol class="flow">
            <li><span class="flow-index">1</span><strong>Origination</strong><span>Opportunities and Market Watch</span></li>
            <li><span class="flow-index">2</span><strong>Structuring</strong><span>Modelling and Negotiation</span></li>
            <li><span class="flow-index">3</span><strong>Due Diligence</strong><span>Lenders and Advisers</span></li>
            <li><span class="flow-index">4</span><strong>Committee</strong><span>Key Decision Documents</span></li>
            <li><span class="flow-index">5</span><strong>Asset Management</strong><span>KPIs and Recommendations</span></li>
          </ol>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Diligence Workstream</th><th>Core Focus</th></tr></thead>
              <tbody>
                <tr><td><strong>Financial</strong></td><td>Business Plan and Model Integrity</td></tr>
                <tr><td><strong>Commercial</strong></td><td>Demand and Pricing</td></tr>
                <tr><td><strong>Technical</strong></td><td>Useful Life and Degradation</td></tr>
                <tr><td><strong>Legal</strong></td><td>Contracts and Termination Rights</td></tr>
                <tr><td><strong>Tax</strong></td><td>Structure and VAT</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout">
            <div><span class="callout-title">Diligence Mindset</span>
            <p>Which assumption could destroy the investment case, and what evidence exists to validate it?</p></div>
          </div>`
      },
      {
        id: "risk",
        title: "Contracts and Risk Allocation",
        html: `
          <p>Infrastructure assets are largely defined by their contracts: supply agreements and warranties on one side, customer contracts on the other. Identification alone is not enough, so aim for allocation plus mitigation plus residual exposure.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Risk</th><th>Typical Holder</th><th>Typical Mitigant</th></tr></thead>
              <tbody>
                <tr><td>Delivery Delay</td><td>Manufacturer</td><td>Delay Liquidated Damages</td></tr>
                <tr><td>Battery Degradation</td><td>Manufacturer or Battery Provider</td><td>Performance Warranties</td></tr>
                <tr><td>Demand and Utilisation</td><td>Depends on Payment Mechanism</td><td>Fixed or Availability Payments</td></tr>
                <tr><td>Electricity Price</td><td>Usually the Operator</td><td>Pass-Through Clauses</td></tr>
                <tr><td>Interest Rate</td><td>SPV</td><td>Swaps or Caps</td></tr>
                <tr><td>Counterparty Default</td><td>SPV and Lenders</td><td>Credit Analysis and Security</td></tr>
                <tr><td>Residual Value</td><td>Equity</td><td>Conservative Assumptions</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Question Worth Raising</span>
            <p>Operators often hold public service contracts that end before the asset life does. What happens to the vehicles at expiry? Possible answers include transfer to the next operator and re-leasing as well as a buy-back.</p></div>
          </div>`
      },
      {
        id: "ic",
        title: "Investment Committee Framework",
        html: `
          <ol class="steps">
            <li><strong>Asset and Market:</strong> What are we buying, and why does demand exist?</li>
            <li><strong>Counterparty and Contracts:</strong> Who pays us, and how protected are those cash flows?</li>
            <li><strong>Economics and Financing:</strong> How much cash does the asset generate, and how much debt can it carry?</li>
            <li><strong>Returns:</strong> Will equity IRR and MOIC clear the hurdle?</li>
            <li><strong>Downside:</strong> What happens when key assumptions fail?</li>
            <li><strong>Mitigants:</strong> Which risks remain once contracts and reserves are in place?</li>
          </ol>
          <div class="callout">
            <div><span class="callout-title">Close With a Decision</span>
            <p>Recommend investing or declining, or investing subject to conditions such as a stronger battery warranty or a parent guarantee.</p></div>
          </div>`
      },
      {
        id: "credit",
        title: "Counterparty Credit",
        html: `
          <p>Ten-year contracts are only as valuable as the counterparty's ability to pay for ten years. VIB experience and current credit research are genuine assets here.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Dimension</th><th>Typical Metric</th></tr></thead>
              <tbody>
                <tr><td>Leverage</td><td>Net Debt / EBITDA</td></tr>
                <tr><td>Interest Coverage</td><td>EBITDA / Interest</td></tr>
                <tr><td>Liquidity</td><td>Cash and Undrawn Facilities</td></tr>
                <tr><td>Cash Conversion</td><td>Operating Cash Flow / EBITDA</td></tr>
              </tbody>
            </table>
          </div>
          <div class="eq" data-f="el"></div>
          <p>Ratings add an external view. Investment grade starts at BBB− for S&amp;P and Fitch, or Baa3 for Moody's, and anything below is sub-investment grade. Issuer ratings assess the entity as a whole, whereas issue ratings reflect a specific instrument's seniority and security.</p>
          <p>Lease accounting matters for transport operators in particular. Under IFRS 16, operators record most leases as liabilities, so their leverage must be measured with lease debt included.</p>`
      }
    ],
    ladder: [
      {
        q: "How would you decide whether to invest in an EV fleet?",
        weak: "Checking whether the IRR is high enough.",
        good: "Analysing the contract and counterparty before returns and risks.",
        great:
          "Start with the asset and the customer, establishing which fleet serves whom under which contract. Then test cash flow protection through contract terms and counterparty credit, followed by economics and financing to reach equity IRR and MOIC. Downside cases on battery life and residual value decide the matter alongside utilisation. Conclude with a clear recommendation to invest or decline, or to invest subject to conditions."
      },
      {
        q: "What would make you reject an investment?",
        weak: "Low IRR.",
        good: "Unacceptable downside risk or a weak counterparty.",
        great:
          "Rejection follows when a critical assumption cannot be validated or when downside cases breach what equity can absorb. Typical red flags include a weak counterparty without credit support or a contract shorter than the asset life with no residual protection. Returns that only work under optimistic utilisation are another warning sign."
      }
    ],
    traps: [
      "Listing risks without explaining allocation and mitigation.",
      "Answering “Would you invest?” without a recommendation."
    ]
  },

  /* EV Fleet Economics and Asset Management */
  {
    id: "mobility",
    title: "EV Fleet Economics and Asset Management",
    short: "EV Economics",
    tier: 3,
    icon: "bolt",
    minutes: 20,
    summary: "Fleet economics and TCO plus batteries and charging, then asset monitoring after closing.",
    takeaways: [
      "Translate every technical variable into its cash flow consequence.",
      "Utilisation and residual value decide whether electric fleets pay off.",
      "Neot's work continues after closing through KPI monitoring and reforecasting."
    ],
    sections: [
      {
        id: "fleet",
        title: "Fleet Economics",
        html: `
          <p>Fleet financings follow a simple economic shape. Upfront capex buys the vehicles and chargers and pays for installation and grid connection. Revenue then comes from lease or service payments, which are often fixed or availability-based so that the operator rather than the investor carries usage risk. Ongoing costs cover maintenance and insurance, while electricity is often borne by the operator, and battery replacement remains the largest single cost to plan for.</p>
          <p>Neot packages this model into five as-a-service offers, each removing a different barrier for transport operators.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Neot Offer</th><th>What It Covers</th></tr></thead>
              <tbody>
                <tr><td><strong>Battery-as-a-Service</strong></td><td>Battery Supply With Performance Guarantee</td></tr>
                <tr><td><strong>Vehicle-as-a-Service</strong></td><td>Tailored Financing for All Vehicle Types</td></tr>
                <tr><td><strong>Charge-as-a-Service</strong></td><td>Financing and Optimisation of Chargers</td></tr>
                <tr><td><strong>E-Mobility-as-a-Service</strong></td><td>Fleet Supply and Management</td></tr>
                <tr><td><strong>Retrofit-as-a-Service</strong></td><td>Conversion of Combustion Vehicles</td></tr>
              </tbody>
            </table>
          </div>`
      },
      {
        id: "tco",
        title: "Total Cost of Ownership",
        html: `
          <div class="eq" data-f="tco"></div>
          <p>Electric vehicles cost more upfront but less to run per kilometre. Higher annual mileage therefore favours electric, because savings accrue with every kilometre while the premium is paid once.</p>
          <div data-widget="tco"></div>`
      },
      {
        id: "battery",
        title: "Batteries and Residual Value",
        html: `
          <div class="chain">
            <span class="chain-step">Faster Degradation</span><span class="chain-arrow">→</span>
            <span class="chain-step">Lower Range</span><span class="chain-arrow">→</span>
            <span class="chain-step">Earlier Replacement Capex</span><span class="chain-arrow">→</span>
            <span class="chain-step">Lower CFADS</span><span class="chain-arrow">→</span>
            <span class="chain-step">Lower IRR and Coverage</span>
          </div>
          <p>Investors look for exactly this skill of translating technical variables into cash flow consequences.</p>
          <p>Residual value depends on age and mileage and above all on the battery's state of health, since the battery is the most valuable component. Secondary markets for electric heavy vehicles remain young, and rapid technological progress can erode the value of older models. Because residual value usually arrives after debt maturity, lenders are unaffected and the entire shortfall lands on equity.</p>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Neot Lens</span>
            <p>Forsee Power, one of Neot's shareholders, manufactures batteries. Neot also markets Battery-as-a-Service with performance guarantees. Expect questions on how battery risk is priced and allocated.</p></div>
          </div>`
      },
      {
        id: "charging",
        title: "Charging Infrastructure",
        html: `
          <div class="table-wrap">
            <table>
              <thead><tr><th></th><th>AC Charging</th><th>DC Charging</th></tr></thead>
              <tbody>
                <tr><td><strong>Power</strong></td><td>Typically up to 22 kW</td><td>About 50 kW to Several Hundred kW</td></tr>
                <tr><td><strong>Suited To</strong></td><td>Cars and Vans Parked Overnight</td><td>Large Batteries and Fast Turnaround</td></tr>
              </tbody>
            </table>
          </div>
          <p>Electric buses and trucks carry batteries of several hundred kWh, so even overnight depot charging generally relies on DC chargers. Grid connection capacity and lead time are often the binding constraint.</p>`
      },
      {
        id: "utilisation",
        title: "Utilisation and Price Risk",
        html: `
          <p>Beautiful models built on unrealistic utilisation still make bad investments. When economics require 90% utilisation, ask whether a contract or historical data supports that figure.</p>
          <div class="eq" data-f="indexation"></div>
          <div class="chain">
            <span class="chain-step">Opex Inflates</span><span class="chain-arrow">→</span>
            <span class="chain-step">Revenue Fixed</span><span class="chain-arrow">→</span>
            <span class="chain-step">Margin ↓</span><span class="chain-arrow">→</span>
            <span class="chain-step">CFADS ↓</span><span class="chain-arrow">→</span>
            <span class="chain-step">DSCR ↓</span>
          </div>
          <p>Check whether inflation and electricity costs are passed through or indexed, or borne by the project. Even when the operator bears energy costs, a sharp price rise weakens its finances, which becomes counterparty risk.</p>`
      },
      {
        id: "asset-management",
        title: "Asset Management After Closing",
        html: `
          <p>Neot's offer includes monitoring deployed assets and recommending actions to maximise their returns. Showing interest in this phase signals maturity.</p>
          <p><strong>Variance Example:</strong> Budget assumes 100 buses earning €100k each, while actual deployment reaches 95 buses earning €102k each.</p>
          <div class="eq eq-example" data-f="variance"></div>
          <p>Monitoring combines two families of indicators. Operational KPIs track fleet deployment and availability together with energy consumption and maintenance cost, while financial KPIs follow CFADS and DSCR alongside the debt balance and distributions. Together they feed an updated IRR forecast, which shows whether the asset is still delivering the return approved by the investment committee.</p>`
      }
    ],
    ladder: [
      {
        q: "What drives EV total cost of ownership?",
        weak: "Electric vehicles are cheaper to run.",
        good: "Purchase price and running costs net of residual value.",
        great:
          "TCO compares lifetime cost rather than sticker price. Electric fleets carry a higher upfront cost, mostly battery and chargers, offset by lower energy and maintenance cost per kilometre. Utilisation therefore decides the outcome, while battery replacement and residual value assumptions can swing the answer either way."
      },
      {
        q: "Battery replacement occurs two years earlier than expected. What happens?",
        weak: "Project loses money.",
        good: "Replacement capex comes earlier, so cash flows and returns fall.",
        great:
          "Replacement capex arrives sooner, either directly or through faster contributions to a maintenance reserve. CFADS and distributions drop, and DSCR may deteriorate depending on reserve treatment. Equity IRR declines even though MOIC barely moves. Investigation would start with warranty terms and degradation assumptions before turning to contractual allocation and insurance."
      },
      {
        q: "Which risks are specific to electric fleets?",
        weak: "Batteries can break.",
        good: "Battery degradation and dependence on charging infrastructure.",
        great:
          "Battery degradation and replacement cost come first, followed by dependence on chargers and grid capacity. Faster technological progress can erode the value of older models, and secondary markets for electric heavy vehicles remain young, which makes residual value harder to underwrite."
      }
    ],
    traps: [
      "Discussing technology without translating it into cash flow.",
      "Assuming every depot charger is AC.",
      "Ignoring who bears energy price risk."
    ]
  }
];

/* Study Modules Content */
window.Guide = window.Guide || {};

Guide.modules = [
  /* Project Finance Architecture */
  {
    id: "project-finance",
    title: "Project Finance Architecture",
    short: "Project Finance",
    tier: 1,
    icon: "layers",
    minutes: 35,
    summary:
      "Structure of an SPV financing, from sources and uses through the cash flow waterfall to CFADS and coverage ratios. Resonance experience makes this territory where precision is expected.",
    sections: [
      {
        id: "spv",
        title: "SPV and Non-Recourse Logic",
        html: `
          <p>Project finance funds a single asset or portfolio through a ring-fenced special purpose vehicle (SPV). Lenders look primarily to the cash flows and contracts of that SPV for repayment rather than to the balance sheet of the sponsors. Recourse to sponsors is limited or absent, which explains why contracts and due diligence carry so much weight.</p>
          <div data-widget="spv"></div>
          <h4>Corporate Lending Versus Project Finance</h4>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Dimension</th><th>Corporate Lending</th><th>Project Finance</th></tr></thead>
              <tbody>
                <tr><td>Borrower</td><td>Operating company with diversified activities</td><td>Dedicated SPV holding one asset or portfolio</td></tr>
                <tr><td>Repayment Source</td><td>Group cash flows and balance sheet</td><td>Ring-fenced project cash flows</td></tr>
                <tr><td>Credit Analysis</td><td>Historical financials and credit ratings</td><td>Forecast cash flows plus contract and risk allocation review</td></tr>
                <tr><td>Leverage</td><td>Constrained by group ratios</td><td>Often higher because cash flows are contracted and predictable</td></tr>
                <tr><td>Security</td><td>Often unsecured or backed by group guarantees</td><td>Pledges over SPV shares and accounts plus assignment of key contracts</td></tr>
                <tr><td>Documentation</td><td>Relatively standardised</td><td>Extensive and transaction-specific</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Neot Lens</span>
            <p>Neot platforms acquire assets and make them available to transport operators and public authorities as integrated services. Viewed through a project finance lens, each financing behaves like an owner-lessor: contracted payments from the operator service the debt, and equity receives what remains.</p></div>
          </div>`
      },
      {
        id: "sources-uses",
        title: "Sources and Uses",
        html: `
          <p>Every transaction opens with a sources and uses table. Uses describe where money goes at financial close; sources describe who provides it. Totals on each side must always match.</p>
          <div class="grid grid-2">
            <div class="table-wrap">
              <table>
                <thead><tr><th>Uses</th><th class="num">€m</th></tr></thead>
                <tbody>
                  <tr><td>Electric vehicles</td><td class="num">60.0</td></tr>
                  <tr><td>Charging infrastructure</td><td class="num">10.0</td></tr>
                  <tr><td>Other deployment costs</td><td class="num">5.0</td></tr>
                  <tr class="is-total"><td>Total Uses</td><td class="num">75.0</td></tr>
                </tbody>
              </table>
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>Sources</th><th class="num">€m</th></tr></thead>
                <tbody>
                  <tr><td>Senior debt (60%)</td><td class="num">45.0</td></tr>
                  <tr><td>Equity (40%)</td><td class="num">30.0</td></tr>
                  <tr><td>&nbsp;</td><td class="num">&nbsp;</td></tr>
                  <tr class="is-total"><td>Total Sources</td><td class="num">75.0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="grid grid-2">
            <div class="card">
              <h4>Typical Uses</h4>
              <ul>
                <li>Asset purchase or construction cost</li>
                <li>Installation and grid connection</li>
                <li>Transaction and advisory costs</li>
                <li>Financing fees</li>
                <li>Interest during construction</li>
                <li>Initial reserve funding such as the DSRA</li>
                <li>Contingency</li>
              </ul>
            </div>
            <div class="card">
              <h4>Typical Sources</h4>
              <ul>
                <li>Sponsor equity as share capital or shareholder loans</li>
                <li>Senior debt</li>
                <li>Mezzanine or subordinated debt</li>
                <li>Grants and subsidies</li>
              </ul>
            </div>
          </div>
          <div class="formula"><span class="lhs">Gearing</span> = <span class="frac"><span>Debt</span><span>Debt + Equity</span></span> = <span class="frac"><span>45</span><span>75</span></span> = 60%</div>`
      },
      {
        id: "waterfall",
        title: "Cash Flow Waterfall",
        html: `
          <p>Cash moves through a contractual order of priority. Senior lenders are served before anyone else and reserves are replenished next. Shareholders receive only what remains after a distribution test. Exact ordering depends on the financing documents, so present this sequence as typical rather than universal.</p>
          <ol class="steps">
            <li><strong>Revenue collected</strong> from leases or from service and availability payments</li>
            <li><strong>Operating expenses and taxes</strong> paid</li>
            <li><strong>CFADS</strong> is what remains for debt service</li>
            <li><strong>Senior interest and fees</strong></li>
            <li><strong>Senior principal</strong></li>
            <li><strong>Reserve top-ups</strong> for the DSRA and any maintenance reserve</li>
            <li><strong>Distribution test</strong> where a lock-up blocks payments below a DSCR threshold</li>
            <li><strong>Subordinated debt service</strong></li>
            <li><strong>Equity distributions</strong> as the residual claim</li>
          </ol>
          <p>Move the slider below to see how a weaker CFADS hits each tier. Senior debt service of €10.0m sits at the top and a €0.5m DSRA top-up follows. For illustration, the lock-up threshold is 1.15x.</p>
          <div data-widget="waterfall"></div>
          <div class="callout">
            <div><span class="callout-title">Key Intuition</span>
            <p>Equity is residual. Debt is paid according to contractual priority, so any shortfall in cash hits shareholders first and lenders last.</p></div>
          </div>`
      },
      {
        id: "cfads",
        title: "CFADS",
        html: `
          <p>Cash Flow Available for Debt Service (CFADS) is the cash a project generates that can be used to pay scheduled interest and principal. Lenders size and monitor the debt on this figure, so it is arguably the most important number in any project finance model.</p>
          <div class="cascade">
            <div class="cascade-row"><span class="cascade-op">&nbsp;</span><span>Revenue</span><span class="note">Leases, services, availability</span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Operating expenses</span><span class="note">Maintenance, insurance, SPV costs</span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Tax paid</span><span class="note">Cash tax, not accounting charge</span></div>
            <div class="cascade-row"><span class="cascade-op">±</span><span>Working capital movements</span><span class="note">Timing of receipts and payments</span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Capex not funded by reserves</span><span class="note">Replacements and major maintenance</span></div>
            <div class="cascade-row"><span class="cascade-op">±</span><span>Reserve account movements</span><span class="note">Transfers to or from an MRA</span></div>
            <div class="cascade-row is-total"><span class="cascade-op">=</span><span>CFADS</span><span class="note">Available for interest and principal</span></div>
          </div>
          <div class="callout callout-amber">
            <div><span class="callout-title">Precision Matters</span>
            <p>CFADS has a contractual definition set out in the facility agreement, so avoid presenting one formula as universal. Never equate CFADS with EBITDA: EBITDA ignores tax paid along with working capital and replacement capex.</p></div>
          </div>`
      },
      {
        id: "ratios",
        title: "Coverage Ratios",
        html: `
          <h4>Debt Service Coverage Ratio</h4>
          <div class="formula"><span class="lhs">DSCR<sub>t</sub></span> = <span class="frac"><span>CFADS<sub>t</sub></span><span>Interest<sub>t</sub> + Principal<sub>t</sub></span></span></div>
          <p>Worked example: CFADS of €13m against scheduled debt service of €10m gives a DSCR of 1.30x. Put simply, the project generates €1.30 of CFADS for every €1 owed in that period. Below 1.00x, CFADS cannot cover scheduled debt service, so the shortfall must come from the DSRA or sponsor support and a payment default becomes a real risk.</p>
          <h4>Loan Life Coverage Ratio</h4>
          <div class="formula"><span class="lhs">LLCR</span> = <span class="frac"><span>NPV of CFADS over the remaining loan life</span><span>Outstanding debt</span></span></div>
          <h4>Project Life Coverage Ratio</h4>
          <div class="formula"><span class="lhs">PLCR</span> = <span class="frac"><span>NPV of CFADS over the remaining project life</span><span>Outstanding debt</span></span></div>
          <p class="formula-note">Discounting typically uses the cost of debt. Some facility agreements add the DSRA balance to the numerator.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Ratio</th><th>Horizon</th><th>Question Answered</th><th>Typical Use</th></tr></thead>
              <tbody>
                <tr><td><strong>DSCR</strong></td><td>Single period</td><td>Can this period's cash meet this period's debt service?</td><td>Sizing, lock-up and default tests</td></tr>
                <tr><td><strong>LLCR</strong></td><td>Remaining loan life</td><td>Does the present value of future CFADS cover outstanding debt?</td><td>Sizing check and covenant</td></tr>
                <tr><td><strong>PLCR</strong></td><td>Remaining project life</td><td>How much cushion exists once the post-maturity tail is included?</td><td>Assessing tail value and refinancing headroom</td></tr>
              </tbody>
            </table>
          </div>
          <p>Lenders focus on the <strong>minimum DSCR</strong> because a single weak period can trigger a lock-up or default, whereas an average can hide it. PLCR normally exceeds LLCR when cash flows after debt maturity are positive, and that difference reflects the value of the tail.</p>
          <div class="callout callout-amber">
            <div><span class="callout-title">Thresholds Are Deal-Specific</span>
            <p>Structures commonly set a sizing DSCR above a lock-up level, which in turn sits above a default level. Actual figures depend on asset risk and contract quality, so present any level as an assumption rather than a market rule.</p></div>
          </div>`
      },
      {
        id: "reserves",
        title: "Reserve Accounts and Covenants",
        html: `
          <div class="grid grid-2">
            <div class="card">
              <h4>Debt Service Reserve Account</h4>
              <p>DSRA is a liquidity buffer that covers debt service when operating cash is temporarily insufficient. Sizing is often expressed as a number of months of forward debt service, but the figure is transaction-specific.</p>
              <p>Funding can be cash at close or a letter of credit or guarantee. Cash trapped in a reserve dilutes equity IRR, while a letter of credit costs a fee instead.</p>
            </div>
            <div class="card">
              <h4>Maintenance Reserve Account</h4>
              <p>MRA smooths lumpy outflows such as major maintenance or battery replacements by accumulating cash ahead of the event. Fleet financings depend heavily on this mechanism because battery replacement is a large and uncertain cost.</p>
            </div>
          </div>
          <h4>Protective Mechanisms</h4>
          <ul>
            <li><strong>Lock-up:</strong> distributions are blocked when DSCR falls below a set level, keeping cash inside the SPV.</li>
            <li><strong>Cash sweep:</strong> excess cash prepays debt, either always or after a trigger.</li>
            <li><strong>Events of default:</strong> DSCR below a lower threshold or a payment failure lets lenders accelerate the loan or exercise step-in rights.</li>
            <li><strong>Information covenants:</strong> periodic reporting and compliance certificates.</li>
          </ul>`
      },
      {
        id: "phases",
        title: "Construction Versus Operations",
        html: `
          <div class="grid grid-2">
            <div class="card">
              <h4>Construction and Deployment Risks</h4>
              <ul>
                <li>Delivery or construction delays</li>
                <li>Cost overruns</li>
                <li>Contractor or supplier performance</li>
                <li>Permitting and grid connection</li>
                <li>Technology integration</li>
              </ul>
            </div>
            <div class="card">
              <h4>Operating Risks</h4>
              <ul>
                <li>Demand and utilisation</li>
                <li>Availability and maintenance</li>
                <li>Operating cost inflation</li>
                <li>Counterparty performance</li>
                <li>Technology obsolescence</li>
                <li>Residual value</li>
              </ul>
            </div>
          </div>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Neot Lens</span>
            <p>Fleet financings replace a long construction phase with a deployment phase: vehicle delivery plus charger installation and grid connection. Neot's Danish financing, for example, involves phased commissioning of 186 electric buses and 93 chargers through mid-2026. Think beyond wind and solar: delivery schedules and depot readiness become the construction risk.</p></div>
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
          "DSCR tests liquidity period by period, so one weak year shows up immediately. LLCR divides the NPV of CFADS over the remaining loan life by outstanding debt, which captures overall solvency and smooths timing. Watching both matters: a healthy LLCR with a weak minimum DSCR points to a timing issue that sculpting or a reserve can solve, whereas a weak LLCR signals that the debt quantum itself is too high."
      },
      {
        q: "Why use an SPV?",
        weak: "Because that is how project finance works.",
        good: "Ring-fencing through an SPV means lenders rely on project cash flows rather than on the sponsor.",
        great:
          "Ring-fencing isolates the asset from the sponsor and the sponsor from the asset. Lenders gain a clean security package backed by predictable contractual cash flows, while sponsors limit recourse and can support higher leverage than their own balance sheet would allow. For a platform like Neot e-motion, the structure lets equity partners and lenders finance fleets against contracted payments, with analysis focused on the asset and its counterparty."
      }
    ],
    traps: [
      "Treating EBITDA as if it were CFADS.",
      "Quoting a 1.30x DSCR or a six-month DSRA as universal rules.",
      "Forgetting that equity is the residual claim in the waterfall.",
      "Confusing LLCR with PLCR or ignoring the tail between them."
    ]
  },

  /* Debt Sizing and Structuring */
  {
    id: "debt",
    title: "Debt Sizing and Structuring",
    short: "Debt Sizing",
    tier: 1,
    icon: "scale",
    minutes: 35,
    summary:
      "Binding constraints and sculpting mechanics, then repayment design and the lender versus equity mindset. Debt sizing is current Resonance work, so every answer here must be fluent.",
    sections: [
      {
        id: "binding",
        title: "Sizing on the Binding Constraint",
        html: `
          <p>Debt is never simply chosen; it is whatever amount the most restrictive constraint allows. Several constraints run in parallel.</p>
          <ul>
            <li><strong>DSCR constraint:</strong> debt service in each period cannot exceed CFADS divided by the target DSCR.</li>
            <li><strong>LLCR constraint:</strong> the present value of CFADS must cover debt by a required multiple.</li>
            <li><strong>Gearing constraint:</strong> debt cannot exceed a set percentage of eligible project cost.</li>
            <li><strong>Tenor:</strong> limited by contract term along with asset and battery life.</li>
            <li><strong>Other limits:</strong> minimum equity requirements plus lender appetite and covenant packages.</li>
          </ul>
          <div class="formula"><span class="lhs">Debt</span> = MIN( DSCR-based capacity , Gearing cap × Eligible cost , Other limits )</div>
          <p>Worked example from the Fleet Case Lab: at a 1.30x target DSCR the sculpted capacity is roughly €52.0m, while a 60% gearing cap on €75m of cost allows €45.0m. Gearing therefore binds at €45.0m of debt, and the resulting DSCR settles near 1.50x, comfortably above target.</p>
          <p><a class="btn btn-soft btn-sm" href="#/practice/case">Open the Fleet Case Lab</a></p>`
      },
      {
        id: "sculpting",
        title: "Debt Sculpting",
        html: `
          <p>Sculpting shapes principal repayments around expected CFADS so that coverage stays constant, instead of forcing equal instalments onto uneven cash flows.</p>
          <ol class="steps">
            <li><strong>Forecast CFADS</strong> for every period of the loan.</li>
            <li><strong>Derive permitted debt service</strong> as CFADS divided by the target DSCR.</li>
            <li><strong>Discount</strong> permitted debt service at the all-in cost of debt to obtain debt capacity.</li>
            <li><strong>Split debt service</strong> into interest on the opening balance and principal as the remainder.</li>
            <li><strong>Roll the balance</strong> forward: closing equals opening minus principal, reaching zero at maturity.</li>
          </ol>
          <div class="formula"><span class="lhs">DS<sub>t</sub></span> = <span class="frac"><span>CFADS<sub>t</sub></span><span>Target DSCR</span></span> &nbsp;&nbsp; <span class="lhs">Principal<sub>t</sub></span> = DS<sub>t</sub> − Interest<sub>t</sub></div>
          <h4>Three-Year Worked Example at 1.30x and 5%</h4>
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
          <p class="formula-note">Debt capacity = 10 ÷ 1.05 + 11 ÷ 1.05² + 12 ÷ 1.05³ = €29.87m, and DSCR equals 1.30x in every year.</p>
          <h4>Why Circularity Appears</h4>
          <p>Debt amount drives interest, interest drives principal and principal drives the balance. Circularity becomes real when items such as fees or interest during construction or DSRA funding depend on the debt amount, which in turn depends on them. Know exactly how your Resonance models resolve it, whether through a copy-paste macro or iterative calculation or an algebraic solution.</p>`
      },
      {
        id: "profiles",
        title: "Repayment Profiles",
        html: `
          <div class="table-wrap">
            <table>
              <thead><tr><th>Profile</th><th>Mechanics</th><th>Typical Context</th></tr></thead>
              <tbody>
                <tr><td><strong>Bullet</strong></td><td>Principal repaid in full at maturity</td><td>Bonds and refinanceable loans</td></tr>
                <tr><td><strong>Linear Amortisation</strong></td><td>Equal principal each period, falling debt service</td><td>Simple bank loans</td></tr>
                <tr><td><strong>Annuity</strong></td><td>Constant total debt service, rising principal share</td><td>Leases and stable cash flows</td></tr>
                <tr><td><strong>Sculpted</strong></td><td>Debt service shaped to CFADS at a target DSCR</td><td>Project finance with uneven cash flows</td></tr>
                <tr><td><strong>Grace Period</strong></td><td>Principal deferred for an initial period, interest only</td><td>Construction or ramp-up phases</td></tr>
              </tbody>
            </table>
          </div>`
      },
      {
        id: "tenor",
        title: "Tenor and Tail",
        html: `
          <p>Longer tenor spreads principal over more periods, lowering annual debt service and raising debt capacity. Lenders nonetheless keep maturity short of the end of the contract or asset life, leaving a <strong>tail</strong> of cash flows after the final repayment as a cushion against delays or restructuring.</p>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Neot Lens</span>
            <p>Fleet tenor is bounded by three clocks: the customer contract term together with vehicle life and battery life. Whichever runs out first limits how long lenders will lend.</p>
            <p>Neot e-motion's €125m MUFG facility, announced in December 2025, runs for 16 years and combines a revolving credit facility with long-term project financing. Portfolio structures like this let a platform fund new assets quickly, then term them out once contracts are in place.</p></div>
          </div>`
      },
      {
        id: "rates",
        title: "Interest Rates and Hedging",
        html: `
          <div class="formula"><span class="lhs">All-in rate</span> = Reference rate (e.g. EURIBOR) + Credit margin</div>
          <p>Fixed-rate debt makes interest known in advance. Floating-rate debt resets with a reference rate such as EURIBOR, so infrastructure borrowers commonly hedge with <strong>interest rate swaps</strong>, which convert floating payments into fixed ones, or <strong>caps</strong>, which limit the maximum rate paid. Lenders often require a minimum hedged share of floating debt.</p>
          <div class="chain">
            <span class="chain-step">Rates rise on unhedged debt</span><span class="chain-arrow">→</span>
            <span class="chain-step">Interest ↑</span><span class="chain-arrow">→</span>
            <span class="chain-step">Debt service ↑</span><span class="chain-arrow">→</span>
            <span class="chain-step">DSCR ↓</span><span class="chain-arrow">→</span>
            <span class="chain-step">Distributions and equity IRR ↓</span>
          </div>
          <p>During sizing, a higher rate also lowers the present value of permitted debt service, so the same CFADS supports less debt and requires more equity.</p>
          <p>Remember fees as well: arrangement fees are paid upfront and commitment fees accrue on undrawn amounts.</p>`
      },
      {
        id: "perspectives",
        title: "Lender Versus Equity Perspective",
        html: `
          <div class="table-wrap">
            <table>
              <thead><tr><th></th><th>Lender</th><th>Equity Investor</th></tr></thead>
              <tbody>
                <tr><td><strong>Core Question</strong></td><td>Will I be repaid?</td><td>Does the return justify the risk?</td></tr>
                <tr><td><strong>Key Metrics</strong></td><td>DSCR and LLCR</td><td>Equity IRR and MOIC</td></tr>
                <tr><td><strong>Upside</strong></td><td>Capped at interest and fees</td><td>Uncapped residual value</td></tr>
                <tr><td><strong>Focus Areas</strong></td><td>Downside resilience with security and covenants</td><td>Distributions with growth and exit value</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout">
            <div><span class="callout-title">Bankable Versus Investable</span>
            <p>Bankable means lenders are comfortable with repayment risk. Investable means the equity risk and return meet the investor's requirements. Raising debt successfully does not prove that equity should be committed. Resonance work proves the financing works; Neot asks whether the asset deserves equity at all.</p></div>
          </div>`
      },
      {
        id: "max-debt",
        title: "Why Not Maximise Debt?",
        html: `
          <p>Leverage raises equity returns only while asset returns exceed the cost of debt, and it raises risk in every scenario. Maximum leverage can:</p>
          <ul>
            <li>reduce financial flexibility</li>
            <li>increase the financing cost demanded by lenders</li>
            <li>weaken coverage ratios and push the minimum DSCR toward lock-up</li>
            <li>raise default risk and restrict distributions</li>
            <li>make downside cases unacceptable</li>
          </ul>
          <p>Infrastructure investors therefore optimise capital structure rather than maximise debt.</p>`
      }
    ],
    ladder: [
      {
        q: "How do you size debt?",
        weak: "Banks lend about 70 or 80 percent of the cost.",
        good: "Debt is sized on a target DSCR and checked against a gearing limit.",
        great:
          "Debt equals the lowest amount allowed by the binding constraint. First, build base-case CFADS. Second, compute the debt service each period can support at the target DSCR and discount it at the all-in cost of debt to get DSCR-based capacity. Third, compare that figure with the gearing cap along with tenor and minimum equity limits. Whichever is smallest wins, and LLCR plus downside cases then confirm the structure survives realistic stress."
      },
      {
        q: "How do you sculpt debt?",
        weak: "Repayments follow the cash flows.",
        good: "Debt service equals CFADS divided by the target DSCR in each period.",
        great:
          "Sculpting sets debt service equal to CFADS divided by the target DSCR in every period, so coverage stays flat. Discounting that profile at the cost of debt gives the debt amount; interest is then calculated on the opening balance and principal is the remainder. Because fees or reserves often depend on the debt amount, the calculation becomes circular and needs a macro or an algebraic solve."
      },
      {
        q: "What happens if interest rates rise?",
        weak: "Higher interest payments.",
        good: "Debt service rises, so DSCR and equity returns fall.",
        great:
          "Impact depends on hedging and timing. Unhedged floating debt sees interest rise immediately, so distributions shrink as DSCR falls, potentially toward lock-up. Before financial close, higher rates lower the present value of permitted debt service, so debt capacity falls and more equity is needed. Hedged debt is protected, which is precisely why lenders require swaps or caps on most floating exposure."
      },
      {
        q: "Why would you not maximise leverage?",
        weak: "Too much debt is risky.",
        good: "More debt increases default risk and reduces flexibility.",
        great:
          "Leverage does not create operating value; it redistributes returns and risk between lenders and shareholders. Beyond a point, financing costs rise and the minimum DSCR approaches lock-up, so modest underperformance stops distributions altogether. Optimising structure means choosing the leverage at which downside cases remain acceptable, not the maximum lenders will offer."
      }
    ],
    traps: [
      "Sizing on DSCR alone without checking the gearing cap.",
      "Discounting sculpted debt service at a rate other than the cost of debt.",
      "Mixing up average and minimum DSCR.",
      "Claiming leverage creates value rather than redistributing it."
    ]
  },

  /* Financial Modelling and Audit */
  {
    id: "modelling",
    title: "Financial Modelling and Audit",
    short: "Modelling",
    tier: 1,
    icon: "grid",
    minutes: 30,
    summary:
      "Model architecture and audit discipline, followed by circularity and sensitivity design. Excel essentials include French function names for a French-language workplace.",
    sections: [
      {
        id: "architecture",
        title: "Model Architecture",
        html: `
          <p>Interviewers often ask how a model would be built from scratch. Answer with a crisp flow: inputs → calculations → financing → outputs.</p>
          <ol class="flow">
            <li><span class="flow-index">1</span><strong>Assumptions</strong><span>Single input sheet with sources</span></li>
            <li><span class="flow-index">2</span><strong>Timeline</strong><span>Periods and flags</span></li>
            <li><span class="flow-index">3</span><strong>Capex</strong><span>Deployment schedule</span></li>
            <li><span class="flow-index">4</span><strong>Operations</strong><span>Fleet and utilisation</span></li>
            <li><span class="flow-index">5</span><strong>Revenue</strong><span>Contract mechanics</span></li>
            <li><span class="flow-index">6</span><strong>Opex</strong><span>Energy and maintenance</span></li>
            <li><span class="flow-index">7</span><strong>Tax</strong><span>Depreciation and losses</span></li>
            <li><span class="flow-index">8</span><strong>Statements</strong><span>Where needed</span></li>
            <li><span class="flow-index">9</span><strong>CFADS</strong><span>Contractual definition</span></li>
            <li><span class="flow-index">10</span><strong>Debt Sizing</strong><span>Binding constraint</span></li>
            <li><span class="flow-index">11</span><strong>Debt Schedule</strong><span>Drawdown and repayment</span></li>
            <li><span class="flow-index">12</span><strong>Cash Waterfall</strong><span>Priority of payments</span></li>
            <li><span class="flow-index">13</span><strong>Distributions</strong><span>Lock-up tests</span></li>
            <li><span class="flow-index">14</span><strong>Returns</strong><span>IRR and MOIC</span></li>
            <li><span class="flow-index">15</span><strong>Sensitivities</strong><span>Cases and toggles</span></li>
            <li><span class="flow-index">16</span><strong>Checks</strong><span>Balance and cash</span></li>
            <li><span class="flow-index">17</span><strong>Outputs</strong><span>Dashboard</span></li>
          </ol>
          <h4>Best Practices Worth Naming</h4>
          <ul>
            <li>Never hardcode assumptions inside formulas.</li>
            <li>Keep one consistent formula across each row.</li>
            <li>Use a colour convention such as blue inputs and black calculations.</li>
            <li>Drive timing with flags rather than manual date ranges.</li>
            <li>Centralise checks on one sheet that feeds a master check.</li>
          </ul>`
      },
      {
        id: "audit",
        title: "Model Audit Framework",
        html: `
          <p>Auditing should be a clear differentiator. Present a structured approach rather than a loose list of tricks.</p>
          <ol class="steps">
            <li><strong>Architecture:</strong> understand structure and flow before touching formulas.</li>
            <li><strong>Inputs:</strong> identify hardcodes and trace each assumption to a source.</li>
            <li><strong>Formula consistency:</strong> look for breaks across rows and columns.</li>
            <li><strong>Accounting checks:</strong> assets minus liabilities minus equity equals zero.</li>
            <li><strong>Debt checks:</strong> opening plus drawdown minus repayment equals closing.</li>
            <li><strong>Cash checks:</strong> no unexplained cash creation or destruction.</li>
            <li><strong>Sign conventions:</strong> inflows and outflows treated consistently.</li>
            <li><strong>Timing:</strong> monthly or quarterly or annual periods aligned correctly.</li>
            <li><strong>Circularity:</strong> understand how iterative calculations are resolved.</li>
            <li><strong>Sensitivity:</strong> stress the model and watch for illogical responses.</li>
            <li><strong>Reasonableness:</strong> confirm outputs make economic sense.</li>
          </ol>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Make It Personal</span>
            <p>Connect this framework to the QC procedure formalised at Resonance. Prepare one concrete story about the hardest error found, using the Story Builder.</p></div>
          </div>`
      },
      {
        id: "circularity",
        title: "Circularity",
        html: `
          <h4>Common Sources</h4>
          <ul>
            <li>Interest calculated on average rather than opening balances</li>
            <li>Fees or interest during construction that depend on the debt amount</li>
            <li>DSRA sized on debt service that depends on the debt amount</li>
            <li>Cash sweeps linked to available cash after interest</li>
          </ul>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Solution</th><th>Strength</th><th>Weakness</th></tr></thead>
              <tbody>
                <tr><td><strong>Copy-paste macro</strong></td><td>Transparent and stable, preferred by many banks</td><td>Requires rerunning after every change</td></tr>
                <tr><td><strong>Iterative calculation</strong></td><td>Updates automatically</td><td>Errors can propagate and become stuck, so a circuit breaker is essential</td></tr>
                <tr><td><strong>Algebraic solve</strong></td><td>Removes circularity entirely</td><td>Only possible for simpler structures</td></tr>
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
              <p>Change one variable, or very few, to isolate its impact. Example: residual value stepped from −20% to +10% around the base case.</p>
            </div>
            <div class="card">
              <h4>Scenario</h4>
              <p>Combine several assumptions into an internally consistent state of the world. Example downside: capex +10% with utilisation −10%, opex +5% and a six-month delay.</p>
            </div>
          </div>
          <h4>Typical Mobility Sensitivities</h4>
          <ul>
            <li>Capex +10% or revenue −10%</li>
            <li>Operating costs +10% or lower utilisation</li>
            <li>Project delay or higher interest rates</li>
            <li>Lower residual value or earlier battery replacement</li>
            <li>Shorter debt tenor or different refinancing assumptions</li>
            <li>Inflation mismatch between revenue and costs</li>
          </ul>
          <h4>Outputs to Watch</h4>
          <p>Project IRR and equity IRR alongside minimum DSCR and LLCR, then debt amount and distributions. Breakeven analysis adds power: state how far revenue can fall before minimum DSCR reaches 1.00x.</p>`
      },
      {
        id: "excel",
        title: "Excel Toolkit",
        html: `
          <p>Neot asks for strong command of Excel and a French-language environment means function names may appear in French.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>English</th><th>French</th><th>Use</th></tr></thead>
              <tbody>
                <tr><td><code>SUMIFS</code></td><td><code>SOMME.SI.ENS</code></td><td>Conditional sums across timelines</td></tr>
                <tr><td><code>COUNTIFS</code></td><td><code>NB.SI.ENS</code></td><td>Conditional counts</td></tr>
                <tr><td><code>IF</code> / <code>IFERROR</code></td><td><code>SI</code> / <code>SIERREUR</code></td><td>Logic and error handling</td></tr>
                <tr><td><code>INDEX</code> / <code>MATCH</code></td><td><code>INDEX</code> / <code>EQUIV</code></td><td>Robust lookups</td></tr>
                <tr><td><code>XLOOKUP</code></td><td><code>RECHERCHEX</code></td><td>Modern lookup</td></tr>
                <tr><td><code>NPV</code> / <code>XNPV</code></td><td><code>VAN</code> / <code>VAN.PAIEMENTS</code></td><td>Present value</td></tr>
                <tr><td><code>IRR</code> / <code>XIRR</code></td><td><code>TRI</code> / <code>TRI.PAIEMENTS</code></td><td>Returns</td></tr>
                <tr><td><code>EOMONTH</code></td><td><code>FIN.MOIS</code></td><td>Period end dates</td></tr>
                <tr><td><code>YEARFRAC</code></td><td><code>FRACTION.ANNEE</code></td><td>Partial periods</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout callout-amber">
            <div><span class="callout-title">Classic Traps</span>
            <p><code>NPV</code> discounts the first cash flow by one full period, so write <code>=CF0 + NPV(rate, CF1:CFn)</code>. <code>IRR</code> assumes evenly spaced periods, whereas <code>XIRR</code> uses actual dates; the same logic separates <code>NPV</code> from <code>XNPV</code>.</p></div>
          </div>
          <h4>Shortcuts Worth Knowing</h4>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Action</th><th>Shortcut</th></tr></thead>
              <tbody>
                <tr><td>Edit cell</td><td><kbd>F2</kbd></td></tr>
                <tr><td>Toggle absolute references</td><td><kbd>F4</kbd></td></tr>
                <tr><td>Jump to precedents or dependents</td><td><kbd>Ctrl</kbd> + <kbd>[</kbd> and <kbd>Ctrl</kbd> + <kbd>]</kbd></td></tr>
                <tr><td>Trace precedents or dependents</td><td><kbd>Alt</kbd> <kbd>M</kbd> <kbd>P</kbd> and <kbd>Alt</kbd> <kbd>M</kbd> <kbd>D</kbd></td></tr>
                <tr><td>Show formulas</td><td><kbd>Ctrl</kbd> + <kbd>&#96;</kbd></td></tr>
                <tr><td>Evaluate part of a formula</td><td><kbd>F9</kbd> while editing</td></tr>
                <tr><td>Paste values</td><td><kbd>Alt</kbd> <kbd>E</kbd> <kbd>S</kbd> <kbd>V</kbd></td></tr>
                <tr><td>Format cells</td><td><kbd>Ctrl</kbd> + <kbd>1</kbd></td></tr>
              </tbody>
            </table>
          </div>
          <p>Also be ready to discuss these tools in the context of sensitivity outputs:</p>
          <ul>
            <li>Named ranges</li>
            <li>Data tables and goal seek</li>
            <li>Conditional formatting</li>
            <li>Pivot tables and charts</li>
          </ul>`
      }
    ],
    ladder: [
      {
        q: "Walk me through a model you have built.",
        weak: "Listing tabs one by one without explaining the logic.",
        good: "Describing inputs through to outputs in order.",
        great:
          "Open with purpose: what decision the model supported and for whom. Then follow the flow from assumptions through operations to CFADS and debt sizing, ending with returns and sensitivity checks. Finish with the insight: which assumption drove the result and what the sensitivities revealed about the structure."
      },
      {
        q: "How do you audit somebody else's model?",
        weak: "Checking that formulas do not show errors.",
        good: "Reviewing inputs and formula consistency plus the balance sheet check.",
        great:
          "Start with architecture before any formula, then trace inputs to sources and scan for inconsistent rows. Integrity checks follow, covering the balance sheet and debt roll-forward as well as cash. Stress testing comes last, because a model can be mechanically correct yet economically absurd, so every output must pass a reasonableness test."
      },
      {
        q: "What is the difference between checking formulas and challenging assumptions?",
        weak: "Checking and challenging are basically the same.",
        good: "Formula checks confirm mechanics, while challenging assumptions questions the inputs.",
        great:
          "Formula checking asks whether the model calculates correctly. Challenging assumptions asks whether its inputs deserve belief, such as whether 90% utilisation is supported by a contract or by history. Resonance work strengthened the first habit; an investment role at Neot demands the second, because a perfectly built model on unrealistic assumptions still produces a bad investment."
      }
    ],
    traps: [
      "Using Excel NPV on a range that includes the initial investment.",
      "Leaving iterative calculation on without a circuit breaker.",
      "Describing sensitivities and scenarios as the same thing.",
      "Listing tabs instead of explaining the logic flow."
    ]
  },

  /* Accounting Foundations */
  {
    id: "accounting",
    title: "Accounting Foundations",
    short: "Accounting",
    tier: 2,
    icon: "book",
    minutes: 25,
    summary:
      "Three statements and their links plus working capital intuition. Classic “what happens if” questions follow, and Neot's offer explicitly lists financial statements.",
    sections: [
      {
        id: "income",
        title: "Income Statement",
        html: `
          <div class="cascade">
            <div class="cascade-row"><span class="cascade-op">&nbsp;</span><span>Revenue</span><span class="note">Chiffre d'affaires</span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Operating costs</span><span class="note">COGS and operating expenses</span></div>
            <div class="cascade-row is-total"><span class="cascade-op">=</span><span>EBITDA</span><span class="note">EBE in French practice</span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Depreciation and amortisation</span><span class="note">Non-cash</span></div>
            <div class="cascade-row is-total"><span class="cascade-op">=</span><span>EBIT</span><span class="note">Résultat d'exploitation</span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Interest expense</span><span class="note">Financing cost</span></div>
            <div class="cascade-row is-total"><span class="cascade-op">=</span><span>EBT</span><span class="note">Résultat avant impôt</span></div>
            <div class="cascade-row"><span class="cascade-op">−</span><span>Taxes</span><span class="note">Impôt sur les sociétés</span></div>
            <div class="cascade-row is-total"><span class="cascade-op">=</span><span>Net income</span><span class="note">Résultat net</span></div>
          </div>
          <div class="callout callout-amber">
            <div><span class="callout-title">EBITDA Is Not Cash Flow</span>
            <p>EBITDA ignores five cash items that matter enormously in asset-heavy businesses:</p>
            <ul>
              <li>capex</li>
              <li>working capital movements</li>
              <li>taxes</li>
              <li>interest</li>
              <li>debt repayment</li>
            </ul></div>
          </div>`
      },
      {
        id: "balance",
        title: "Balance Sheet",
        html: `
          <div class="formula"><span class="lhs">Assets</span> = Liabilities + Equity</div>
          <div class="grid grid-3">
            <div class="card"><h4>Assets</h4><ul><li>Cash</li><li>Receivables</li><li>Inventory</li><li>PP&amp;E</li></ul></div>
            <div class="card"><h4>Liabilities</h4><ul><li>Payables</li><li>Debt</li><li>Other liabilities</li></ul></div>
            <div class="card"><h4>Equity</h4><ul><li>Share capital</li><li>Retained earnings</li></ul></div>
          </div>`
      },
      {
        id: "cash-flow",
        title: "Cash Flow Statement",
        html: `
          <div class="grid grid-3">
            <div class="card"><h4>CFO</h4><p>Cash generated by operations, starting from net income under the indirect method.</p></div>
            <div class="card"><h4>CFI</h4><p>Mostly capex together with acquisitions and disposals.</p></div>
            <div class="card"><h4>CFF</h4><p>Debt and equity issuance minus repayments and dividends.</p></div>
          </div>
          <div class="formula"><span class="lhs">CFO</span> = Net income + Non-cash charges − Increase in NWC</div>
          <div class="callout">
            <div><span class="callout-title">IFRS Nuances Worth Knowing</span>
            <p>IAS 7 currently lets companies classify interest paid in operating or financing activities, so always check the policy before comparing cash flows. From 2027, IFRS 18 removes this choice for most companies, which will generally present interest paid within financing activities. IFRS 16 brings most leases onto a lessee's balance sheet as a right-of-use asset and a lease liability, which raises reported EBITDA and net debt. Such treatment matters at Neot because transport operators leasing fleets report those leases this way, so their leverage must be read with lease liabilities included.</p></div>
          </div>`
      },
      {
        id: "links",
        title: "How the Statements Link",
        html: `
          <ol class="steps">
            <li><strong>Net income</strong> flows into retained earnings and opens the cash flow statement.</li>
            <li><strong>D&amp;A</strong> is added back in CFO and reduces PP&amp;E on the balance sheet.</li>
            <li><strong>Working capital changes</strong> adjust CFO and move current assets and liabilities.</li>
            <li><strong>Capex</strong> appears in CFI and increases PP&amp;E.</li>
            <li><strong>Debt and equity flows</strong> appear in CFF and move debt or equity balances.</li>
            <li><strong>Net change in cash</strong> updates the cash line, and the balance sheet balances.</li>
          </ol>
          <p><a class="btn btn-soft btn-sm" href="#/practice/drills">Practise with Statement Drills</a></p>`
      },
      {
        id: "nwc",
        title: "Working Capital",
        html: `
          <div class="formula"><span class="lhs">NWC</span> = Operating current assets − Operating current liabilities ≈ Receivables + Inventory − Payables</div>
          <p><strong>Key intuition:</strong> an increase in NWC is a use of cash. Suppose receivables rise by €20 because customers have not yet paid. Accounting profit exists, yet the cash has not arrived, so operating cash flow falls by €20.</p>
          <p>Working capital matters in project finance too, because payment terms with public authorities or operators affect CFADS timing and sometimes require a liquidity facility.</p>`
      }
    ],
    ladder: [
      {
        q: "Walk me through the three statements.",
        weak: "Naming the three statements without linking them.",
        good: "Describing each statement and noting that net income links them.",
        great:
          "Income statement shows profitability over a period, ending in net income. Balance sheet shows resources and claims at a point in time, with assets equal to liabilities plus equity. Cash flow statement reconciles net income to cash through non-cash items and working capital, then adds investing and financing flows. Net income feeds retained earnings, and the net change in cash updates the cash line so the balance sheet balances."
      },
      {
        q: "Depreciation increases by €10 at a 25% tax rate. What happens?",
        weak: "Net income falls by €10.",
        good: "Net income falls by €7.50 and cash rises because depreciation is non-cash.",
        great:
          "EBIT falls by €10 and taxes fall by €2.50, so net income drops €7.50. Cash flow starts at −€7.50, adds back €10 of depreciation and ends up €2.50, which is the tax shield. Balance sheet effects: PP&E falls €10 and cash rises €2.50, so assets fall €7.50, matched by a €7.50 drop in retained earnings."
      }
    ],
    traps: [
      "Forgetting the tax effect on non-cash charges.",
      "Getting the sign of a working capital change wrong.",
      "Calling EBITDA a proxy for cash in an asset-heavy business."
    ]
  },

  /* Valuation */
  {
    id: "valuation",
    title: "Valuation",
    short: "Valuation",
    tier: 2,
    icon: "chart",
    minutes: 25,
    summary:
      "Enterprise versus equity value and DCF mechanics, then WACC and terminal value with a finite-life twist for fleets.",
    sections: [
      {
        id: "ev-equity",
        title: "Enterprise Value Versus Equity Value",
        html: `
          <div class="grid grid-2">
            <div class="card"><h4>Equity Value</h4><p>Value belonging to shareholders.</p></div>
            <div class="card"><h4>Enterprise Value</h4><p>Value of the operating business before financing claims, available to all capital providers.</p></div>
          </div>
          <div class="formula"><span class="lhs">EV</span> = Equity value + Net debt + Other debt-like claims</div>
          <p>Example: equity value of €300m plus net debt of €200m gives enterprise value of €500m. Other debt-like claims can include minority interests or preferred equity along with pension deficits.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Multiple</th><th>Numerator</th><th>Why It Pairs</th></tr></thead>
              <tbody>
                <tr><td>EV / EBITDA</td><td>Enterprise value</td><td>Numerator and denominator sit before financing</td></tr>
                <tr><td>EV / EBIT</td><td>Enterprise value</td><td>Numerator and denominator sit before interest</td></tr>
                <tr><td>EV / Revenue</td><td>Enterprise value</td><td>Useful for loss-making companies</td></tr>
                <tr><td>P / E</td><td>Equity value</td><td>Earnings after interest belong to shareholders</td></tr>
              </tbody>
            </table>
          </div>`
      },
      {
        id: "methods",
        title: "Three Valuation Approaches",
        html: `
          <div class="grid grid-3">
            <div class="card"><h4>DCF</h4><p>Intrinsic value from discounted future cash flows. Dominant method for contracted infrastructure assets.</p></div>
            <div class="card"><h4>Trading Comparables</h4><p>Multiples of listed peers applied to the target's metrics.</p></div>
            <div class="card"><h4>Precedent Transactions</h4><p>Multiples paid in past acquisitions, usually including a control premium.</p></div>
          </div>`
      },
      {
        id: "dcf",
        title: "DCF Mechanics",
        html: `
          <div class="formula"><span class="lhs">FCFF</span> = EBIT × (1 − T) + D&amp;A − Capex − ΔNWC</div>
          <div class="formula"><span class="lhs">EV</span> = Σ <span class="frac"><span>FCFF<sub>t</sub></span><span>(1 + WACC)<sup>t</sup></span></span> + <span class="frac"><span>Terminal value</span><span>(1 + WACC)<sup>n</sup></span></span></div>
          <ol class="steps">
            <li>Project free cash flow to the firm over an explicit period.</li>
            <li>Estimate WACC.</li>
            <li>Compute terminal value.</li>
            <li>Discount everything to today to obtain enterprise value.</li>
            <li>Bridge to equity value by subtracting net debt and other claims.</li>
          </ol>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Cash Flow</th><th>Discount Rate</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td>FCFF to all capital providers</td><td>WACC</td><td>Enterprise value</td></tr>
                <tr><td>FCFE or equity distributions</td><td>Cost of equity</td><td>Equity value</td></tr>
              </tbody>
            </table>
          </div>
          <p>Consistency is the principle: cash flows available to all capital providers are discounted at the blended cost of all capital. Infrastructure equity investors often value their stake directly by discounting distributions at a required equity return.</p>`
      },
      {
        id: "wacc",
        title: "WACC and CAPM",
        html: `
          <div class="formula"><span class="lhs">WACC</span> = <span class="frac"><span>E</span><span>D + E</span></span> × K<sub>e</sub> + <span class="frac"><span>D</span><span>D + E</span></span> × K<sub>d</sub> × (1 − T)</div>
          <p class="formula-note">Debt cost is taken after tax because interest is deductible, creating a tax shield.</p>
          <div class="formula"><span class="lhs">K<sub>e</sub></span> = R<sub>f</sub> + β × ERP</div>
          <ul>
            <li><strong>Risk-free rate:</strong> government bond yield in the currency of the cash flows.</li>
            <li><strong>Beta:</strong> sensitivity to systematic market risk; levered beta reflects capital structure.</li>
            <li><strong>Equity risk premium:</strong> excess return expected from equities over the risk-free rate.</li>
            <li><strong>Extensions:</strong> country risk premia where the valuation context requires them.</li>
          </ul>
          <div class="formula"><span class="lhs">β<sub>levered</sub></span> = β<sub>unlevered</sub> × [1 + (1 − T) × D/E]</div>
          <p>Example: R<sub>f</sub> of 3% with a beta of 1.2 and an ERP of 5% gives K<sub>e</sub> = 3% + 1.2 × 5% = 9.0%.</p>`
      },
      {
        id: "terminal",
        title: "Terminal Value",
        html: `
          <div class="grid grid-2">
            <div class="card">
              <h4>Gordon Growth</h4>
              <div class="formula"><span class="lhs">TV</span> = <span class="frac"><span>FCF<sub>n+1</sub></span><span>WACC − g</span></span></div>
              <p class="small muted">Requires g below WACC and a long-run sustainable growth rate.</p>
            </div>
            <div class="card">
              <h4>Exit Multiple</h4>
              <div class="formula"><span class="lhs">TV</span> = EBITDA<sub>n</sub> × Exit EV/EBITDA</div>
              <p class="small muted">Imports market pricing, including its optimism or pessimism.</p>
            </div>
          </div>
          <p>Terminal value can represent a large share of DCF value, so challenge discount rate and growth assumptions carefully, along with any exit multiple.</p>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Neot Lens</span>
            <p>Fleets are finite-life assets. Instead of a perpetuity, model cash flows to the end of the contract or asset life and add a residual value for vehicles and batteries. Residual value plays the role terminal value plays in a corporate DCF.</p></div>
          </div>`
      }
    ],
    ladder: [
      {
        q: "Walk me through a DCF.",
        weak: "Discount the cash flows and add them up.",
        good: "Project FCFF and discount it at WACC, then add a terminal value and bridge to equity.",
        great:
          "Project unlevered free cash flow over an explicit horizon, discount it at WACC and add a discounted terminal value to reach enterprise value. Subtracting net debt and other claims gives equity value. For a fleet with a finite contract, replace the perpetuity with a residual value and test sensitivity to WACC and residual assumptions, since those drive most of the answer."
      },
      {
        q: "Why discount FCFF at WACC?",
        weak: "Because that is the standard approach.",
        good: "FCFF goes to all capital providers, so the rate must reflect all of them.",
        great:
          "FCFF is cash available before any financing payments, so it belongs to lenders and shareholders together. Any discount rate applied must therefore blend their required returns, weighted by their share of capital, with debt taken after tax. Discounting FCFF at the cost of equity would understate value, while discounting FCFE at WACC would overstate it."
      }
    ],
    traps: [
      "Discounting FCFF at the cost of equity.",
      "Using a growth rate at or above WACC.",
      "Pairing P/E with enterprise value or EV/EBITDA with equity value."
    ]
  },

  /* Returns and Leverage */
  {
    id: "returns",
    title: "Returns and Leverage",
    short: "Returns",
    tier: 2,
    icon: "trend",
    minutes: 20,
    summary:
      "Return metrics from NPV to MOIC alongside project versus equity IRR. Leverage gets special attention because it cuts both ways. Expect these in any equity-investment conversation.",
    sections: [
      {
        id: "npv",
        title: "Net Present Value",
        html: `
          <div class="formula"><span class="lhs">NPV</span> = Σ <span class="frac"><span>CF<sub>t</sub></span><span>(1 + r)<sup>t</sup></span></span></div>
          <p>NPV answers one question: how much economic value does this investment create at the required return? Positive NPV means the investment beats the hurdle rate.</p>`
      },
      {
        id: "irr",
        title: "Internal Rate of Return",
        html: `
          <p>IRR is the discount rate at which NPV equals zero. Several limitations deserve mention:</p>
          <ul>
            <li>Implicit reinvestment of interim cash at the IRR itself</li>
            <li>Possible multiple IRRs when cash flows change sign more than once</li>
            <li>Blindness to scale, since a small project can show a higher IRR than a larger one creating more value</li>
          </ul>
          <p>When IRR and NPV disagree, NPV is the better guide to value creation.</p>`
      },
      {
        id: "moic",
        title: "MOIC",
        html: `
          <div class="formula"><span class="lhs">MOIC</span> = <span class="frac"><span>Total equity proceeds</span><span>Equity invested</span></span></div>
          <p>Invest €50m, receive €100m: MOIC is 2.0x. Because MOIC ignores time, combine it with IRR.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Investment</th><th class="num">Proceeds</th><th class="num">Holding Period</th><th class="num">MOIC</th><th class="num">IRR</th></tr></thead>
              <tbody>
                <tr><td>Case A</td><td class="num">€100m</td><td class="num">3 years</td><td class="num">2.0x</td><td class="num">26.0%</td></tr>
                <tr><td>Case B</td><td class="num">€100m</td><td class="num">15 years</td><td class="num">2.0x</td><td class="num">4.7%</td></tr>
              </tbody>
            </table>
          </div>
          <p class="formula-note">Cases A and B each invest €50m with a single exit payment. IRR equals 2<sup>1/n</sup> − 1.</p>`
      },
      {
        id: "project-equity",
        title: "Project IRR Versus Equity IRR",
        html: `
          <div class="grid grid-2">
            <div class="card"><h4>Project IRR</h4><p>Return on total investment from unlevered project cash flows, independent of financing structure.</p></div>
            <div class="card"><h4>Equity IRR</h4><p>Return to shareholders after debt service, so it reflects leverage.</p></div>
          </div>
          <p>Equity IRR exceeds project IRR when the project earns more than the cost of debt, because shareholders keep the spread. Fleet Case Lab base case: project IRR is about 8.7% while equity IRR reaches about 11.6%.</p>`
      },
      {
        id: "leverage",
        title: "How Leverage Changes Returns",
        html: `
          <p>Consider a €100 asset held for one year, financed either entirely with equity or with €60 of debt at 5%.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Exit Value</th><th class="num">Unlevered Return</th><th class="num">Equity Left After Repaying €63</th><th class="num">Levered Return on €40</th></tr></thead>
              <tbody>
                <tr><td>Upside: €120</td><td class="num">+20.0%</td><td class="num">€57</td><td class="num">+42.5%</td></tr>
                <tr><td>Downside: €90</td><td class="num">−10.0%</td><td class="num">€27</td><td class="num">−32.5%</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout">
            <div><span class="callout-title">Line to Use in the Interview</span>
            <p>Leverage does not create operating value. Instead, leverage changes how returns and risk are distributed between debt and equity, amplifying gains and losses alike.</p></div>
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
          "NPV measures absolute value created at the required return, while IRR expresses the return as a rate. Investment decisions usually match under both measures, but IRR can mislead when projects differ in scale or timing, or when cash flows change sign repeatedly. Ranking projects calls for NPV; IRR remains useful for comparing against hurdle rates."
      },
      {
        q: "Why could two investments share a MOIC but differ in IRR?",
        weak: "Because they have different risks.",
        good: "MOIC ignores time while IRR accounts for it.",
        great:
          "MOIC only compares money out with money in, so doubling capital in three years and in fifteen years both show 2.0x. IRR accounts for timing: about 26% in the first case and under 5% in the second. Investors therefore look at both, since MOIC shows absolute wealth creation and IRR shows its speed."
      },
      {
        q: "What is the impact of leverage?",
        weak: "Debt always increases returns.",
        good: "Debt increases equity IRR if the asset earns more than the cost of debt.",
        great:
          "When asset returns exceed the cost of debt, leverage lifts equity IRR because shareholders keep the spread on a smaller equity cheque. However, fixed debt obligations reduce the cushion, so downside cases hurt equity far more and covenant risk rises. Leverage redistributes returns and risk; it does not create operating value."
      }
    ],
    traps: [
      "Claiming leverage always improves returns.",
      "Comparing MOIC across investments with different holding periods.",
      "Ranking mutually exclusive projects by IRR alone."
    ]
  },

  /* Investment Judgement and Credit */
  {
    id: "investing",
    title: "Investment Judgement and Credit",
    short: "Investing and Credit",
    tier: 2,
    icon: "target",
    minutes: 35,
    summary:
      "Investment cycle and due diligence, then contracts and risk allocation. Investment committee reasoning and counterparty credit analysis complete the module.",
    sections: [
      {
        id: "cycle",
        title: "Investment Cycle at Neot",
        html: `
          <p>Neot's offer describes involvement across the entire cycle, under the supervision of an Investment Director.</p>
          <ol class="flow">
            <li><span class="flow-index">1</span><strong>Origination</strong><span>Opportunities and market watch</span></li>
            <li><span class="flow-index">2</span><strong>Structuring</strong><span>Modelling and negotiation</span></li>
            <li><span class="flow-index">3</span><strong>Due Diligence</strong><span>Investors and banks with advisers</span></li>
            <li><span class="flow-index">4</span><strong>Investment Committee</strong><span>Key decision documents</span></li>
            <li><span class="flow-index">5</span><strong>Asset Management</strong><span>KPIs and recommendations</span></li>
          </ol>`
      },
      {
        id: "dd",
        title: "Due Diligence Workstreams",
        html: `
          <div class="grid grid-2">
            <div class="card"><h4>Financial</h4><ul><li>Business plan and forecast assumptions</li><li>Historical performance</li><li>Model integrity</li><li>Profitability and cash generation</li></ul></div>
            <div class="card"><h4>Commercial</h4><ul><li>Market and competitors</li><li>Pricing and demand</li><li>Customers and market share assumptions</li></ul></div>
            <div class="card"><h4>Technical</h4><ul><li>Technology and useful life</li><li>Performance and degradation</li><li>Capex and maintenance</li><li>Replacement needs</li></ul></div>
            <div class="card"><h4>Legal</h4><ul><li>Contracts and permits</li><li>Ownership and liabilities</li><li>Change-of-control clauses</li><li>Termination provisions</li></ul></div>
            <div class="card"><h4>Tax</h4><ul><li>Tax structure and corporate tax</li><li>VAT</li><li>Tax losses</li><li>Transaction taxes</li></ul></div>
            <div class="card"><h4>Diligence Mindset</h4><p>Which assumption could destroy the investment case, and what evidence exists to validate it?</p></div>
          </div>`
      },
      {
        id: "contracts",
        title: "Contract Analysis",
        html: `
          <p>Infrastructure assets are largely defined by their contracts. Understanding them separates strong candidates from those who only understand Excel.</p>
          <div class="grid grid-3">
            <div class="card"><h4>Supply or EPC</h4><p>Who supplies or builds the asset?</p><ul><li>Price</li><li>Completion obligations</li><li>Delay liquidated damages</li><li>Performance commitments and warranties</li></ul></div>
            <div class="card"><h4>O&amp;M and Warranties</h4><p>Who operates and maintains it?</p><ul><li>Scope and pricing</li><li>Availability guarantees</li><li>Battery performance warranties</li></ul></div>
            <div class="card"><h4>Customer Contract</h4><p>Who pays the project?</p><ul><li>Fixed or variable price</li><li>Minimum commitment</li><li>Duration</li><li>Termination rights and payments</li><li>Counterparty creditworthiness</li></ul></div>
          </div>
          <div class="callout callout-indigo">
            <div><span class="callout-title">Question Worth Raising</span>
            <p>Transport operators often run public service contracts awarded by authorities for a fixed period. When that period is shorter than the asset life, what happens to the vehicles at expiry: transfer to the next operator, re-leasing or a buy-back? Asking this shows genuine underwriting instinct.</p></div>
          </div>`
      },
      {
        id: "risk",
        title: "Risk Allocation",
        html: `
          <p>For every risk, ask three questions:</p>
          <ol>
            <li>Who controls this risk?</li>
            <li>Who bears it contractually?</li>
            <li>What happens economically if it materialises?</li>
          </ol>
          <p>Identification alone is not enough; aim for allocation plus mitigation plus residual exposure.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Risk</th><th>Typical Holder</th><th>Typical Mitigants</th></tr></thead>
              <tbody>
                <tr><td>Delivery delay</td><td>Manufacturer or supplier</td><td>Delay liquidated damages and phased payments</td></tr>
                <tr><td>Battery degradation</td><td>Manufacturer or battery provider</td><td>Warranties and performance guarantees</td></tr>
                <tr><td>Equipment failure</td><td>Shared by manufacturer and operator with insurer</td><td>Warranties with O&amp;M contracts and insurance</td></tr>
                <tr><td>Demand and utilisation</td><td>Depends on payment mechanism</td><td>Availability-based or fixed lease payments</td></tr>
                <tr><td>Electricity price</td><td>Usually the operator</td><td>Pass-through clauses or indexation</td></tr>
                <tr><td>Interest rate</td><td>SPV</td><td>Swaps or caps</td></tr>
                <tr><td>Counterparty default</td><td>SPV and its lenders</td><td>Credit analysis with security and re-marketing options</td></tr>
                <tr><td>Residual value</td><td>Equity</td><td>Conservative assumptions and buy-back or second-life agreements</td></tr>
              </tbody>
            </table>
          </div>
          <p class="formula-note">Allocations shown are typical patterns, not rules; every contract must be read on its own terms.</p>`
      },
      {
        id: "ic",
        title: "Investment Committee Thinking",
        html: `
          <p>Faced with “Would you invest?”, work through a framework and finish with a recommendation.</p>
          <ol class="steps">
            <li><strong>Asset:</strong> what are we buying?</li>
            <li><strong>Market:</strong> why does demand exist?</li>
            <li><strong>Counterparties:</strong> who pays us?</li>
            <li><strong>Contracts:</strong> how protected are cash flows?</li>
            <li><strong>Economics:</strong> revenue and margins along with cash generation.</li>
            <li><strong>Financing:</strong> how much debt and on what terms?</li>
            <li><strong>Returns:</strong> IRR and MOIC.</li>
            <li><strong>Downside:</strong> what happens when assumptions fail?</li>
            <li><strong>Key risks:</strong> technical and commercial alongside financial and regulatory.</li>
            <li><strong>Mitigants:</strong> contracts and guarantees plus insurance and reserves.</li>
          </ol>
          <div class="callout">
            <div><span class="callout-title">Close With a Decision</span>
            <p>Recommend investing or declining, or investing subject to conditions. Conditions might include a stronger battery warranty or a parent guarantee from the operator.</p></div>
          </div>`
      },
      {
        id: "credit",
        title: "Counterparty Credit Analysis",
        html: `
          <p>Ten-year contracts are only as valuable as the counterparty's ability to pay for ten years. VIB experience and current credit research are genuine assets here.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Dimension</th><th>Typical Metric</th></tr></thead>
              <tbody>
                <tr><td>Leverage</td><td>Net debt / EBITDA</td></tr>
                <tr><td>Interest coverage</td><td>EBITDA / Interest, or a defined variant</td></tr>
                <tr><td>Liquidity</td><td>Cash and available facilities versus short-term obligations</td></tr>
                <tr><td>Profitability</td><td>EBITDA and EBIT margins plus ROIC</td></tr>
                <tr><td>Cash conversion</td><td>Operating cash flow relative to EBITDA</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Credit Ratings Logic</h4>
          <ul>
            <li><strong>Investment grade</strong> starts at BBB− for S&amp;P and Fitch or Baa3 for Moody's; anything below is sub-investment grade.</li>
            <li><strong>Expected loss</strong> combines probability of default, loss given default and exposure at default.</li>
            <li><strong>Issuer rating</strong> assesses the entity, while an <strong>issue rating</strong> assesses a specific instrument and its seniority or security.</li>
            <li><strong>Outlook</strong> signals the likely direction of a rating.</li>
          </ul>
          <div class="formula"><span class="lhs">Expected loss</span> = PD × LGD × EAD</div>
          <p>Credit quality reflects business and financial risk together with liquidity and capital structure. Structural considerations such as seniority and security complete the picture. Assessing a public transport authority differs markedly from assessing a private-equity-owned operator.</p>`
      }
    ],
    ladder: [
      {
        q: "How would you decide whether to invest in an EV fleet?",
        weak: "Checking whether the IRR is high enough.",
        good: "Analysing the contract and counterparty before returns and risks.",
        great:
          "Start with the asset and the customer: which fleet serves whom under which contract. Then test cash flow protection through contract terms and counterparty credit, followed by economics and financing to reach equity IRR and MOIC. Downside cases on battery life and residual value decide the matter alongside utilisation. Conclude with a clear recommendation to invest or decline, or to invest subject to conditions."
      },
      {
        q: "What would make you reject an investment?",
        weak: "Low IRR.",
        good: "Unacceptable downside risk or a weak counterparty.",
        great:
          "Rejection follows when a critical assumption cannot be validated or when downside cases breach what equity can absorb. Typical red flags include a weak counterparty without credit support or a contract shorter than the asset life with no residual protection. Returns that only work under optimistic utilisation are another warning sign. Missing returns is one reason; unmitigated risk concentrated on equity is usually the decisive one."
      },
      {
        q: "Why does credit quality matter for an infrastructure contract?",
        weak: "Because the client has to pay.",
        good: "Contracted revenue is only secure if the counterparty can pay throughout the contract.",
        great:
          "Contracted cash flows convert operating risk into counterparty risk. Lenders size debt and investors price equity on the assumption that payments continue for the full term, so a downgrade or default hits CFADS and coverage directly. Credit analysis and security packages therefore sit at the heart of the investment case, alongside re-marketing options for the assets."
      }
    ],
    traps: [
      "Listing risks without explaining allocation and mitigation.",
      "Answering “Would you invest?” without a clear recommendation.",
      "Assuming a long contract is safe regardless of who signs it."
    ]
  },

  /* EV and Mobility Economics */
  {
    id: "mobility",
    title: "EV and Mobility Economics",
    short: "EV Economics",
    tier: 3,
    icon: "bolt",
    minutes: 35,
    summary:
      "Fleet economics and total cost of ownership, then batteries and charging as drivers of residual value and utilisation. Sector depth here separates a candidate from generic renewables preparation.",
    sections: [
      {
        id: "fleet",
        title: "Fleet Economics",
        html: `
          <div class="grid grid-3">
            <div class="card"><h4>Capex</h4><ul><li>Vehicle acquisition</li><li>Charging equipment</li><li>Installation and grid connection</li><li>Other deployment costs</li></ul></div>
            <div class="card"><h4>Revenue</h4><ul><li>Leasing or rental payments</li><li>Service payments</li><li>Availability-based payments</li><li>Charging-related revenue</li></ul></div>
            <div class="card"><h4>Costs</h4><ul><li>Electricity</li><li>Insurance</li><li>Vehicle and charger maintenance</li><li>Fleet management</li><li>Asset replacement</li><li>SPV costs</li></ul></div>
          </div>
          <h4>Neot's As-a-Service Offers</h4>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Offer</th><th>What It Covers</th></tr></thead>
              <tbody>
                <tr><td><strong>Battery-as-a-Service</strong></td><td>Battery supply with performance guarantee and end-of-life optimisation</td></tr>
                <tr><td><strong>Vehicle-as-a-Service</strong></td><td>Customised financing and services for all vehicle types</td></tr>
                <tr><td><strong>Charge-as-a-Service</strong></td><td>Financing and optimisation of charging infrastructure costs</td></tr>
                <tr><td><strong>E-mobility-as-a-Service</strong></td><td>Fleet supply together with procurement and ongoing management</td></tr>
                <tr><td><strong>Retrofit-as-a-Service</strong></td><td>Conversion of combustion vehicles to electric with performance guarantees</td></tr>
              </tbody>
            </table>
          </div>
          <p class="formula-note">Source: Neot e-motion platform page on neotcapital.com.</p>`
      },
      {
        id: "tco",
        title: "Total Cost of Ownership",
        html: `
          <div class="formula"><span class="lhs">TCO</span> = Purchase + Financing + Energy + Maintenance + Insurance + Taxes + Other opex − Residual value</div>
          <p>Electric vehicles typically cost more upfront but less to run, thanks to cheaper energy per kilometre and simpler drivetrains. Investors therefore ask about total economic cost over the operating life rather than purchase price alone. Higher annual mileage favours electric because savings accrue per kilometre while the premium is paid once.</p>
          <div data-widget="tco"></div>`
      },
      {
        id: "residual",
        title: "Residual Value",
        html: `
          <p>Buying a vehicle, contracting it for several years and then selling or re-leasing it makes the investment depend partly on its exit value.</p>
          <div class="grid grid-2">
            <div class="card"><h4>Drivers</h4><ul><li>Vehicle age and mileage</li><li>Battery condition</li><li>Depth of the secondary market</li><li>Technological progress</li><li>Manufacturer and model perception</li></ul></div>
            <div class="card"><h4>Sensitivity Chain</h4>
              <div class="chain">
                <span class="chain-step">Residual −20%</span><span class="chain-arrow">→</span>
                <span class="chain-step">Lower exit proceeds</span><span class="chain-arrow">→</span>
                <span class="chain-step">Equity IRR ↓</span>
              </div>
              <p class="small">When residual value arrives after debt maturity, lenders are unaffected and the entire hit lands on equity.</p>
            </div>
          </div>`
      },
      {
        id: "battery",
        title: "Battery Economics",
        html: `
          <div class="table-wrap">
            <table>
              <thead><tr><th>Concept</th><th>Why It Matters Financially</th></tr></thead>
              <tbody>
                <tr><td>Capacity (kWh)</td><td>Determines range and therefore the routes a vehicle can serve</td></tr>
                <tr><td>Degradation and state of health</td><td>Reduces usable range over time and drives replacement timing</td></tr>
                <tr><td>Charging cycles</td><td>Intensive use accelerates wear</td></tr>
                <tr><td>Warranty</td><td>Transfers degradation risk to the manufacturer within limits</td></tr>
                <tr><td>Charging speed</td><td>Affects downtime and fleet size required</td></tr>
                <tr><td>Replacement risk</td><td>Large and uncertain capex event</td></tr>
                <tr><td>Second life</td><td>Repurposing for stationary storage can support residual value</td></tr>
              </tbody>
            </table>
          </div>
          <p>Translate technical variables into financial consequences:</p>
          <div class="chain">
            <span class="chain-step">Faster degradation</span><span class="chain-arrow">→</span>
            <span class="chain-step">Lower usable range</span><span class="chain-arrow">→</span>
            <span class="chain-step">Lower asset value and utility</span><span class="chain-arrow">→</span>
            <span class="chain-step">Earlier replacement capex</span><span class="chain-arrow">→</span>
            <span class="chain-step">Lower cash flows</span><span class="chain-arrow">→</span>
            <span class="chain-step">Lower IRR and coverage</span>
          </div>
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
                <tr><td><strong>Power</strong></td><td>Lower, typically up to 22 kW</td><td>Higher, from about 50 kW up to several hundred kilowatts</td></tr>
                <tr><td><strong>Suited To</strong></td><td>Cars and vans parked for long periods</td><td>Fast turnaround and large batteries</td></tr>
                <tr><td><strong>Infrastructure</strong></td><td>Lighter electrical works</td><td>Significant electrical infrastructure and grid capacity</td></tr>
              </tbody>
            </table>
          </div>
          <p>Electric buses and trucks carry batteries of several hundred kWh, so even overnight depot charging generally relies on DC chargers. Opportunity charging along routes uses even higher power.</p>
          <h4>Investment Questions</h4>
          <ul>
            <li>Required power and grid availability</li>
            <li>Connection capex and lead times</li>
            <li>Utilisation and charging schedule</li>
            <li>Fleet downtime</li>
            <li>Electricity tariffs, including off-peak optimisation</li>
            <li>Maintenance and equipment lifetime</li>
          </ul>
          <p class="formula-note">French term: IRVE, infrastructure de recharge pour véhicules électriques.</p>`
      },
      {
        id: "utilisation",
        title: "Utilisation and Underwriting",
        html: `
          <p>Beautiful models built on unrealistic utilisation still make bad investments. When economics require 90% asset utilisation, ask what supports that figure:</p>
          <ul>
            <li>Contractual commitment</li>
            <li>Historical utilisation</li>
            <li>Customer commitment</li>
            <li>Market demand</li>
          </ul>
          <div class="callout">
            <div><span class="callout-title">Biggest Mindset Shift</span>
            <p>Resonance work often asks “Does the formula work?” Neot asks “Should I believe the assumption?” Moving from model auditing to investment underwriting is the core of this interview.</p></div>
          </div>`
      },
      {
        id: "inflation",
        title: "Price Risk and Tax",
        html: `
          <div class="formula"><span class="lhs">Revenue<sub>t</sub></span> = Revenue<sub>t−1</sub> × (1 + indexation)</div>
          <p>When revenue is fixed but operating costs inflate, margins compress:</p>
          <div class="chain">
            <span class="chain-step">Opex ↑</span><span class="chain-arrow">→</span>
            <span class="chain-step">Revenue flat</span><span class="chain-arrow">→</span>
            <span class="chain-step">Margin ↓</span><span class="chain-arrow">→</span>
            <span class="chain-step">CFADS ↓</span><span class="chain-arrow">→</span>
            <span class="chain-step">DSCR ↓</span>
          </div>
          <p>Determine how the contract treats inflation and electricity price risk:</p>
          <ul>
            <li>Passed through to the customer</li>
            <li>Indexed</li>
            <li>Capped</li>
            <li>Borne by the project</li>
          </ul>
          <p>Even when the operator bears energy costs, a sharp price rise weakens the operator's own economics, which turns into counterparty risk.</p>
          <h4>Tax Essentials</h4>
          <div class="formula"><span class="lhs">Taxable income</span> ≈ Revenue − Opex − Tax depreciation − Interest</div>
          <ul>
            <li>Tax affects free cash flow and the debt tax shield, and therefore DCF value and equity returns.</li>
            <li>Tax depreciation can differ from accounting depreciation.</li>
            <li>Losses carried forward shelter future profits.</li>
            <li>Deferred tax arises from timing differences.</li>
            <li>VAT on large asset purchases can create a temporary funding need.</li>
          </ul>`
      },
      {
        id: "ev-risks",
        title: "Risks Specific to Electric Fleets",
        html: `
          <ul>
            <li><strong>Battery risk:</strong> degradation and replacement cost beyond warranty limits.</li>
            <li><strong>Charging dependency:</strong> vehicles are useless without reliable chargers and grid capacity.</li>
            <li><strong>Technology obsolescence:</strong> rapid improvement can erode the value of older models.</li>
            <li><strong>Residual value uncertainty:</strong> secondary markets for electric heavy vehicles remain young.</li>
            <li><strong>Manufacturer concentration:</strong> reliance on a few manufacturers for parts and warranties.</li>
            <li><strong>Operational learning curve:</strong> range planning and charging schedules differ from diesel operations.</li>
          </ul>`
      }
    ],
    ladder: [
      {
        q: "What drives EV total cost of ownership?",
        weak: "Electric vehicles are cheaper to run.",
        good: "Purchase price and running costs net of residual value.",
        great:
          "TCO compares lifetime cost rather than sticker price. Electric fleets carry a higher upfront cost, mostly battery and charging infrastructure, offset by lower energy and maintenance cost per kilometre. Utilisation therefore decides the outcome: the more kilometres driven, the faster savings repay the premium, while battery replacement and residual value assumptions can swing the answer either way."
      },
      {
        q: "Battery replacement occurs two years earlier than expected. What happens?",
        weak: "Project loses money.",
        good: "Replacement capex comes earlier, so cash flows and returns fall.",
        great:
          "Replacement capex arrives sooner, so cash available falls, either directly or through faster contributions to a maintenance reserve. CFADS and distributions drop, and DSCR may deteriorate depending on reserve treatment and timing. Equity IRR declines even if MOIC barely moves. Investigation would cover warranty terms and degradation assumptions, replacement cost and contractual allocation, then insurance and manufacturer exposure."
      },
      {
        q: "What happens if electricity prices increase?",
        weak: "Costs go up.",
        good: "Impact depends on who bears energy cost under the contract.",
        great:
          "Everything depends on allocation. When the project bears energy cost on a fixed tariff, CFADS falls and coverage weakens. When costs pass through to the operator, the project is protected directly but the operator's margin shrinks, raising counterparty risk. Either way, the TCO advantage over diesel narrows, so the analysis should cover both direct and indirect exposure."
      }
    ],
    traps: [
      "Discussing EV technology without translating it into cash flow consequences.",
      "Assuming every depot charger is AC.",
      "Ignoring who bears energy price risk."
    ]
  },

  /* Asset Management */
  {
    id: "asset-management",
    title: "Asset Management and Monitoring",
    short: "Asset Management",
    tier: 3,
    icon: "pulse",
    minutes: 15,
    summary:
      "Budget versus actual analysis with variance attribution, then KPI dashboards and reforecasting. Neot explicitly expects the intern to monitor deployed assets after closing.",
    sections: [
      {
        id: "beyond",
        title: "Work Continues After Closing",
        html: `
          <p>Neot's offer covers monitoring project performance and deployed assets. Interns analyse KPIs and make strategic recommendations to maximise asset returns. Showing interest in this phase signals maturity, because many candidates only talk about deals.</p>`
      },
      {
        id: "variance",
        title: "Budget Versus Actual",
        html: `
          <p>Compare actual results with budget, then attribute the variance to its causes:</p>
          <ul>
            <li>volume</li>
            <li>price</li>
            <li>availability</li>
            <li>cost</li>
            <li>timing</li>
          </ul>
          <h4>Worked Example</h4>
          <p>Budget assumes 100 buses at €100k of annual revenue each, totalling €10.00m. Actual deployment reaches 95 buses earning €102k each, totalling €9.69m.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Effect</th><th>Calculation</th><th class="num">€m</th></tr></thead>
              <tbody>
                <tr><td>Volume</td><td>(95 − 100) × €100k</td><td class="num">−0.50</td></tr>
                <tr><td>Price</td><td>(€102k − €100k) × 95</td><td class="num">+0.19</td></tr>
                <tr class="is-total"><td>Total variance</td><td>€9.69m − €10.00m</td><td class="num">−0.31</td></tr>
              </tbody>
            </table>
          </div>`
      },
      {
        id: "kpis",
        title: "KPI Dashboard",
        html: `
          <div class="grid grid-2">
            <div class="card"><h4>Operational KPIs</h4><ul><li>Fleet deployment</li><li>Utilisation</li><li>Revenue per asset</li><li>Energy consumption</li><li>Downtime and availability</li><li>Maintenance cost</li></ul></div>
            <div class="card"><h4>Financial KPIs</h4><ul><li>EBITDA</li><li>CFADS</li><li>DSCR</li><li>Debt balance</li><li>Distributions</li><li>IRR forecast</li></ul></div>
          </div>`
      },
      {
        id: "reforecast",
        title: "Reforecasting and Value Levers",
        html: `
          <ol class="steps">
            <li>Load actuals into the model and roll the forecast forward.</li>
            <li>Re-run covenant tests and the distribution forecast.</li>
            <li>Update the IRR forecast against the investment case.</li>
            <li>Explain the gap and recommend actions.</li>
          </ol>
          <h4>Levers to Maximise Asset Returns</h4>
          <ul>
            <li>Improve availability through maintenance planning</li>
            <li>Shift charging to off-peak tariffs</li>
            <li>Extend contracts or re-lease assets at expiry</li>
            <li>Refinance when market margins compress</li>
            <li>Develop second-life uses for batteries</li>
          </ul>`
      }
    ],
    ladder: [
      {
        q: "Revenue came in 5% below budget. How would you analyse it?",
        weak: "Revenue was lower than expected.",
        good: "Splitting the gap into volume and price effects.",
        great:
          "Begin by attributing the variance to its drivers, because volume and price gaps call for different responses than availability or timing gaps. Deployment delays are temporary, whereas weaker availability may reveal a maintenance problem and a price gap may point to contract indexation. After that, update the forecast and test the impact on DSCR and distributions before recommending concrete actions."
      }
    ],
    traps: [
      "Reporting a variance without explaining its cause.",
      "Treating asset management as purely administrative."
    ]
  }
];

import { useState } from 'react';
import { Icon } from '@/components/Icon';

type StageId = '01' | '02' | '03' | '04' | '05' | '06';

interface Stage {
  id: StageId;
  name: string;
  summary: string;
  metric: string;
  latency: string;
  status: 'done' | 'running' | 'flagged';
  contract: {
    input: string;
    rule: string;
    output: string;
  };
  details: string[];
}

const INITIAL_STAGES: Stage[] = [
  {
    id: '01',
    name: 'Ingest & Normalize',
    summary: 'Streaming transactions, multi-channel feeds & hierarchy master',
    metric: '184,207 records',
    latency: '42ms batch',
    status: 'done',
    contract: {
      input: '{ tx_id: "TX-99410", amount: 485000, channel: "DirectBroker", date: "2026-11-02" }',
      rule: 'SchemaValidation(StrictContinuityCheck, PriorPeriodHash)',
      output: 'Validated immutable ingestion record (SHA-256: 8f4c...3e12)',
    },
    details: [
      'Ingested 184,207 records across 14 upstream carrier files',
      'Continuous schema hash verified against prior cycle',
      '0 orphaned records; 100% hierarchy foreign key match',
    ],
  },
  {
    id: '02',
    name: 'Configure & Version',
    summary: 'Bitemporal scheme activation across 6 hierarchy tiers',
    metric: '42 active schemes',
    latency: '0.12ms parse',
    status: 'done',
    contract: {
      input: '{ scheme_id: "SCH-Q4-BFSI", tier_depth: 6, effective_date: "2026-08-01" }',
      rule: 'BitemporalResolve(EventTime: 2026-11-02, SystemTime: 2026-11-04)',
      output: 'AST compiled to deterministic bytecode graph',
    },
    details: [
      'Resolved 42 concurrent schemes with effective-dating',
      'Point-in-time hierarchy reconstructed for 12,847 sellers',
      'Zero retro-mutations: historical audit trees preserved',
    ],
  },
  {
    id: '03',
    name: 'Vectorized Compute',
    summary: 'Sub-millisecond payout evaluation with 64-bit fixed-point precision',
    metric: '₹34.82 Cr computed',
    latency: '0.38ms / txn',
    status: 'done',
    contract: {
      input: 'VectorizedChunk(records: 10000, branch_id: "BR-WEST-04")',
      rule: 'EvaluateAST(BaseCommission * TierMultiplier - PrecomputedDeductions)',
      output: 'Integer-precise credit lines with full mathematical derivation trace',
    },
    details: [
      'Integer fixed-point arithmetic: zero IEEE-754 floating-point drift',
      'Partitioned execution across hierarchy branches',
      'Total cycle calculation time: 4.2 seconds elapsed',
    ],
  },
  {
    id: '04',
    name: 'Anomaly & Clawback Guard',
    summary: 'Automated policy-lapse matching & duplicate qualification check',
    metric: '36 exceptions held',
    latency: '1.4ms scan',
    status: 'flagged',
    contract: {
      input: '{ event: "EARLY_SURRENDER", policy_id: "POL-7712", lapse_day: 78 }',
      rule: 'ClawbackStateMachine.Transition(State.Accrued -> State.Quarantined)',
      output: 'Disbursement lock engaged: ₹4,12,800 quarantined for pre-close review',
    },
    details: [
      '36 anomalies quarantined prior to disbursement',
      '19 early surrender clawbacks mapped directly to originating agents',
      '17 duplicate qualification attempts isolated across overlapping schemes',
    ],
  },
  {
    id: '05',
    name: 'Multi-Currency Reconcile',
    summary: 'Multi-principal ledger tie-out with sub-ledger balance verification',
    metric: '3 currencies · 0 variance',
    latency: '18ms close',
    status: 'done',
    contract: {
      input: 'SubledgerEntries(INR, AED, USD) <-> ERP_GeneralLedger',
      rule: 'DoubleEntryTieOut(Sum(Credits) == Sum(Debits))',
      output: 'Balanced journal batch prepared with unalterable audit receipt',
    },
    details: [
      'Consolidated across INR, AED, and USD at transaction-level FX rates',
      'Subledger to General Ledger variance: exactly ₹0.00',
      'Automated journal ready for ERP batch posting',
    ],
  },
  {
    id: '06',
    name: 'Offline Seller Delivery',
    summary: 'Local-first encrypted receipt push to seller devices',
    metric: '12,847 sellers synced',
    latency: 'Local-first',
    status: 'done',
    contract: {
      input: 'SellerPayoutPayload(encrypted: true, format: "local_sqlite")',
      rule: 'PwaSync(DeltaChangesOnly, OfflineCachePriority)',
      output: 'Interactive mathematical derivation available offline in 8 languages',
    },
    details: [
      'Encrypted statement deployed to 12,847 seller PWAs',
      'Offline-first: zero network required for statement review in field',
      'Every line opens into its full rule derivation and policy breakdown',
    ],
  },
];

export function EngineHeroSimulator() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'ast' | 'ledger'>('pipeline');
  const [selectedStage, setSelectedStage] = useState<StageId>('03');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(6);
  const [exceptionInjected, setExceptionInjected] = useState(false);
  const [stages, setStages] = useState<Stage[]>(INITIAL_STAGES);

  const activeStage = stages.find((s) => s.id === selectedStage) || stages[2];

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(0);

    const stepInterval = setInterval(() => {
      setSimStep((prev) => {
        const next = prev + 1;
        if (next >= 6) {
          clearInterval(stepInterval);
          setIsSimulating(false);
          return 6;
        }
        return next;
      });
    }, 450);
  };

  const handleInjectClawback = () => {
    setExceptionInjected((prev) => !prev);
    setSelectedStage('04');
    setStages((prev) =>
      prev.map((s) => {
        if (s.id === '04') {
          return {
            ...s,
            status: 'flagged',
            metric: exceptionInjected ? '36 exceptions held' : '37 exceptions held (+1 live)',
            details: exceptionInjected
              ? s.details
              : [
                  '⚡ LIVE EXCEPTION: Policy POL-88421 surrendered on Day 62',
                  'Triggered 100% clawback offset against Broker-West-Tier2',
                  ...s.details,
                ],
          };
        }
        return s;
      }),
    );
  };

  return (
    <div className="engine-sim card edge" role="region" aria-label="Interactive Commission Engine Simulator">
      {/* Simulation Header */}
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" />
          <div>
            <span className="engine-sim__title">Crizant One Engine Runtime</span>
            <span className="engine-sim__sub">v4.8.2 · Deterministic Execution Core</span>
          </div>
        </div>

        <div className="engine-sim__actions">
          <button
            type="button"
            className="engine-sim__btn engine-sim__btn--primary"
            onClick={handleRunSimulation}
            disabled={isSimulating}
            title="Simulate complete commission calculation cycle"
          >
            <Icon name="spark" size={13} />
            <span>{isSimulating ? 'Computing Cycle...' : 'Re-Run Cycle'}</span>
          </button>
          <button
            type="button"
            className={`engine-sim__btn ${exceptionInjected ? 'engine-sim__btn--active' : ''}`}
            onClick={handleInjectClawback}
            title="Inject an early surrender clawback into the live cycle"
          >
            <Icon name="shield" size={13} />
            <span>{exceptionInjected ? 'Clawback Active' : 'Inject Clawback'}</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="engine-sim__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'pipeline'}
          className={`engine-sim__tab ${activeTab === 'pipeline' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('pipeline')}
        >
          <Icon name="layers" size={14} />
          <span>Pipeline (6 Stages)</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'ast'}
          className={`engine-sim__tab ${activeTab === 'ast' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('ast')}
        >
          <Icon name="scale" size={14} />
          <span>AST Rule Inspector</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'ledger'}
          className={`engine-sim__tab ${activeTab === 'ledger' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('ledger')}
        >
          <Icon name="clock" size={14} />
          <span>Bitemporal Ledger</span>
        </button>
      </div>

      {/* Main Interactive Screen */}
      <div className="engine-sim__screen">
        {activeTab === 'pipeline' && (
          <div className="engine-sim__pipeline-grid">
            {/* Stages Column */}
            <div className="engine-sim__stages" role="tablist" aria-orientation="vertical">
              {stages.map((st, idx) => {
                const isSelected = selectedStage === st.id;
                const isComputingNow = isSimulating && simStep === idx;
                const isPassed = !isSimulating || simStep > idx;

                return (
                  <button
                    key={st.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`engine-sim__stage-item ${isSelected ? 'is-selected' : ''} ${
                      st.status === 'flagged' ? 'is-flagged' : ''
                    } ${isComputingNow ? 'is-computing' : ''}`}
                    onClick={() => setSelectedStage(st.id)}
                  >
                    <span className="engine-sim__stage-idx">{st.id}</span>
                    <div className="engine-sim__stage-meta">
                      <span className="engine-sim__stage-name">{st.name}</span>
                      <span className="engine-sim__stage-summary">{st.summary}</span>
                    </div>
                    <div className="engine-sim__stage-stat">
                      <span className="engine-sim__badge">
                        {isComputingNow ? 'Calculating' : isPassed ? st.metric : 'Queued'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stage Inspector Column */}
            <div className="engine-sim__inspector">
              <div className="engine-sim__inspector-head">
                <div>
                  <span className="eyebrow" style={{ fontSize: '0.66rem' }}>
                    Stage {activeStage.id} Data Contract &amp; Derivation
                  </span>
                  <h4 style={{ margin: '2px 0 0', fontSize: '0.98rem' }}>{activeStage.name}</h4>
                </div>
                <div className="engine-sim__chip-group">
                  <span className="tag">{activeStage.latency}</span>
                  <span className="tag" style={{ color: 'var(--cyan)' }}>
                    {activeStage.metric}
                  </span>
                </div>
              </div>

              {/* Data Contract Monospace Block */}
              <div className="engine-sim__codeblock">
                <div className="engine-sim__code-line">
                  <span className="engine-sim__code-label">INPUT_SCHEMA</span>
                  <code>{activeStage.contract.input}</code>
                </div>
                <div className="engine-sim__code-line">
                  <span className="engine-sim__code-label">TRANSFORM</span>
                  <code style={{ color: 'var(--cyan)' }}>{activeStage.contract.rule}</code>
                </div>
                <div className="engine-sim__code-line">
                  <span className="engine-sim__code-label">VERIFIED_OUT</span>
                  <code style={{ color: 'var(--white)' }}>{activeStage.contract.output}</code>
                </div>
              </div>

              {/* Execution Details */}
              <ul className="engine-sim__loglist">
                {activeStage.details.map((d, i) => (
                  <li key={i}>
                    <Icon name="check" size={13} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'ast' && (
          <div className="engine-sim__ast-view">
            <div className="engine-sim__ast-intro">
              <div>
                <strong>Abstract Syntax Tree · Deterministic Rule Compiler</strong>
                <p className="fine" style={{ margin: '4px 0 0' }}>
                  Commission schemes compile into an immutable expression tree evaluated with integer fixed-point math.
                  Zero IEEE-754 rounding errors.
                </p>
              </div>
              <span className="tag" style={{ color: 'var(--cyan)' }}>
                Compilation: 0.04ms
              </span>
            </div>

            <div className="engine-sim__ast-code">
              <pre>
{`// Compiled Rule AST for [SCH-Q4-PERFORMANCE-TIER]
ExpressionNode: ApplyTierMultiplier {
  ├── Condition: Volume >= 50,00,000 INR
  │     ├── Input: TransactionStream.aggregate(window="MONTHLY")
  │     └── Result: true (Actual Volume: ₹84,20,000 INR)
  ├── Calculation: FixedPoint64 {
  │     ├── BasePayout: ₹3,12,000.0000 INR
  │     ├── Multiplier: 1.4000x [Effective Date: 2026-08-01]
  │     └── GrossCommission: ₹4,36,800.0000 INR (Exact integer arithmetic)
  └── Guard: ClawbackReserveHoldback {
        ├── Rate: 5.0000%
        ├── HoldbackAmount: ₹21,840.0000 INR
        └── NetPayableLine: ₹4,14,960.0000 INR [Cryptographically Sealed]
  }`}
              </pre>
            </div>
            <div className="engine-sim__ast-footer">
              <span>IEEE-754 Float Drift: 0.00000000% (Bit-exact match)</span>
              <span>Audit Derivation Hash: e7d94b...c381</span>
            </div>
          </div>
        )}

        {activeTab === 'ledger' && (
          <div className="engine-sim__ledger-view">
            <div className="engine-sim__ledger-intro">
              <div>
                <strong>Bitemporal Ledger Stream</strong>
                <p className="fine" style={{ margin: '4px 0 0' }}>
                  Stores both Event Time (when sale happened) and System Time (when knowledge arrived).
                  Reconstructs any historical date with zero data mutation.
                </p>
              </div>
              <span className="tag" style={{ color: 'var(--cyan)' }}>
                Append-Only Immutable
              </span>
            </div>

            <div className="engine-sim__ledger-tablewrap">
              <table className="engine-sim__ledger-table">
                <thead>
                  <tr>
                    <th>Line ID</th>
                    <th>Seller / Agent</th>
                    <th>Event Date</th>
                    <th>System Ingest</th>
                    <th>Gross</th>
                    <th>Net Payout</th>
                    <th>Ledger Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>#TX-8821</code></td>
                    <td>Aditi Sharma (Tier 4)</td>
                    <td>2026-08-14</td>
                    <td>2026-11-04 14:02:18</td>
                    <td>₹1,42,000</td>
                    <td style={{ color: 'var(--cyan)' }}>₹1,34,900</td>
                    <td><span className="tag tag--sm" style={{ color: '#5bf5b0' }}>Balanced</span></td>
                  </tr>
                  <tr>
                    <td><code>#TX-8822</code></td>
                    <td>Vikram Malhotra (Tier 2)</td>
                    <td>2026-09-01</td>
                    <td>2026-11-04 14:02:19</td>
                    <td>₹86,500</td>
                    <td style={{ color: 'var(--cyan)' }}>₹82,175</td>
                    <td><span className="tag tag--sm" style={{ color: '#5bf5b0' }}>Balanced</span></td>
                  </tr>
                  <tr>
                    <td><code>#TX-8823</code></td>
                    <td>Apex Distribution (Tier 6)</td>
                    <td>2026-10-18</td>
                    <td>2026-11-04 14:02:20</td>
                    <td>₹18,40,000</td>
                    <td style={{ color: 'var(--flag)' }}>₹16,92,000*</td>
                    <td><span className="tag tag--sm" style={{ color: 'var(--flag)' }}>Clawback Held</span></td>
                  </tr>
                  <tr>
                    <td><code>#TX-8824</code></td>
                    <td>Zaid Al-Mansoor (Dubai UAE)</td>
                    <td>2026-10-25</td>
                    <td>2026-11-04 14:02:21</td>
                    <td>AED 44,200</td>
                    <td style={{ color: 'var(--cyan)' }}>AED 41,990</td>
                    <td><span className="tag tag--sm" style={{ color: '#5bf5b0' }}>Balanced</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="engine-sim__ast-footer">
              <span>*Note: Line #TX-8823 holds ₹1,48,000 quarantined for 90-day policy surrender check</span>
              <span>Double-entry balance check: Debits == Credits (₹0.00 variance)</span>
            </div>
          </div>
        )}
      </div>

      {/* Simulator Footer Bar */}
      <div className="engine-sim__footer">
        <div className="engine-sim__foot-meta">
          <span className="engine-sim__foot-tag">
            <strong>Engine:</strong> Multi-tenant Partitioned Runtime
          </span>
          <span className="engine-sim__foot-tag">
            <strong>Cycle Throughput:</strong> 44,000 records/sec
          </span>
          <span className="engine-sim__foot-tag">
            <strong>State Store:</strong> Bitemporal Append-Only
          </span>
        </div>
        <span className="engine-sim__foot-sync">Pre-Close Review · 0 Payout Discrepancies</span>
      </div>
    </div>
  );
}

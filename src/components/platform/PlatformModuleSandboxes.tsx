import { useState } from 'react';
import { Icon } from '@/components/Icon';

/* -------------------------------------------------------------------------- */
/* 1. Scheme DSL & Formula Compiler Sandbox                                    */
/* -------------------------------------------------------------------------- */
export function SchemeDslSandbox() {
  const [tier, setTier] = useState<number>(3);
  const [baseRate, setBaseRate] = useState<number>(12);
  const [hasPersistency, setHasPersistency] = useState<boolean>(true);
  const [hasAccelerator, setHasAccelerator] = useState<boolean>(true);
  const [hasDeductions, setHasDeductions] = useState<boolean>(false);
  const [isCompiled, setIsCompiled] = useState<boolean>(true);

  const persistencyBonus = hasPersistency ? 0.5 : 0;
  const acceleratorBonus = hasAccelerator ? 1.2 : 0;
  const deductionRate = hasDeductions ? 0.8 : 0;
  const effectiveRate = (baseRate + persistencyBonus + acceleratorBonus - deductionRate).toFixed(4);

  return (
    <div className="engine-sim card edge" role="region" aria-label="Scheme DSL Compiler Sandbox">
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" />
          <div>
            <span className="engine-sim__title">Scheme DSL &amp; Rule Compiler</span>
            <span className="engine-sim__sub">Deterministic Fixed-Point AST Builder</span>
          </div>
        </div>
        <div className="engine-sim__actions">
          <button
            type="button"
            className="engine-sim__btn engine-sim__btn--primary"
            onClick={() => setIsCompiled((prev) => !prev)}
          >
            <Icon name="spark" size={13} />
            <span>{isCompiled ? 'Re-Compile AST' : 'Compile Scheme'}</span>
          </button>
        </div>
      </div>

      <div className="engine-sim__screen" style={{ gap: 'var(--space-3)' }}>
        {/* Controls Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8 }}>
          <div className="card card--sunken" style={{ padding: '8px 10px' }}>
            <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Base Rate (%)</span>
            <input
              type="range"
              min="2"
              max="25"
              step="0.5"
              value={baseRate}
              onChange={(e) => setBaseRate(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--cyan)' }}
            />
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--white)', fontSize: '0.84rem' }}>
              {baseRate.toFixed(1)}%
            </div>
          </div>

          <div className="card card--sunken" style={{ padding: '8px 10px' }}>
            <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Hierarchy Tiers</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {[2, 3, 4, 6].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`btn btn--quiet btn--sm ${tier === t ? 'btn--accent' : ''}`}
                  style={{ padding: '2px 8px', fontSize: '0.72rem' }}
                  onClick={() => setTier(t)}
                >
                  {t}T
                </button>
              ))}
            </div>
          </div>

          <div className="card card--sunken" style={{ padding: '8px 10px' }}>
            <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Modifiers</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <button
                type="button"
                className={`tag tag--sm ${hasPersistency ? 'tag--accent' : ''}`}
                style={{ cursor: 'pointer', fontSize: '0.65rem' }}
                onClick={() => setHasPersistency(!hasPersistency)}
              >
                +0.5% Persistency
              </button>
              <button
                type="button"
                className={`tag tag--sm ${hasAccelerator ? 'tag--accent' : ''}`}
                style={{ cursor: 'pointer', fontSize: '0.65rem' }}
                onClick={() => setHasAccelerator(!hasAccelerator)}
              >
                +1.2% Q4 Accelerator
              </button>
              <button
                type="button"
                className={`tag tag--sm ${hasDeductions ? 'tag--accent' : ''}`}
                style={{ cursor: 'pointer', fontSize: '0.65rem' }}
                onClick={() => setHasDeductions(!hasDeductions)}
              >
                -0.8% TDS Deduction
              </button>
            </div>
          </div>
        </div>

        {/* Output Codeblock */}
        <div className="engine-sim__codeblock" style={{ padding: '10px 14px' }}>
          <div className="engine-sim__code-line">
            <span className="engine-sim__code-label">COMPILED_BYTECODE_AST</span>
            <code style={{ color: 'var(--cyan)' }}>
              {`SchemeNode(id="SCH-Q4-BFSI", tiers=${tier}, formula="(${baseRate}% ${hasPersistency ? '+ 0.5% [Persistency]' : ''} ${hasAccelerator ? '+ 1.2% [Accelerator]' : ''} ${hasDeductions ? '- 0.8% [Deduction]' : ''})")`}
            </code>
          </div>
          <div className="engine-sim__code-line" style={{ marginTop: 4 }}>
            <span className="engine-sim__code-label">EFFECTIVE_PAYOUT_RATE</span>
            <code style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.9rem' }}>
              {effectiveRate}% <span style={{ color: 'var(--cyan)', fontWeight: 400, fontSize: '0.72rem' }}>· 64-bit Fixed Point: 0.00000000% IEEE-754 Float Drift</span>
            </code>
          </div>
        </div>

        <ul className="engine-sim__loglist" style={{ marginTop: 2 }}>
          <li>
            <Icon name="check" size={13} />
            <span>Scheme compiled in 0.12ms with SHA-256 integrity receipt (hash: 8f4c...991e)</span>
          </li>
          <li>
            <Icon name="spark" size={13} />
            <span>Effective-dated: Activated for EventTime &gt;= 2026-11-01 · Retroactive immutability guaranteed</span>
          </li>
        </ul>
      </div>

      <div className="engine-sim__footer">
        <span className="engine-sim__foot-tag">
          <Icon name="layers" size={12} /> No-Code DSL Compiler
        </span>
        <span className="engine-sim__foot-sync">Zero IT Release Deployment</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Pre-Close Anomaly Detection Sandbox                                      */
/* -------------------------------------------------------------------------- */
export function PreCloseAnomalySandbox() {
  const [isScanning, setIsScanning] = useState(false);
  const [exceptionsResolved, setExceptionsResolved] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 500);
  };

  return (
    <div className="engine-sim card edge" role="region" aria-label="Pre-Close Anomaly Detection Gate">
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" style={{ background: '#f59e0b', boxShadow: '0 0 6px #f59e0b' }} />
          <div>
            <span className="engine-sim__title">Pre-Close Anomaly Gate</span>
            <span className="engine-sim__sub">Automated Outlier Scan across 25,000 Records</span>
          </div>
        </div>
        <div className="engine-sim__actions">
          <button
            type="button"
            className="engine-sim__btn engine-sim__btn--primary"
            onClick={handleScan}
            disabled={isScanning}
          >
            <Icon name="spark" size={13} />
            <span>{isScanning ? 'Scanning 25k Txns...' : 'Re-Run Anomaly Scan'}</span>
          </button>
          <button
            type="button"
            className={`engine-sim__btn ${exceptionsResolved ? 'engine-sim__btn--active' : ''}`}
            onClick={() => setExceptionsResolved(!exceptionsResolved)}
          >
            <Icon name="shield" size={13} />
            <span>{exceptionsResolved ? '4 Quarantined' : 'Quarantine All'}</span>
          </button>
        </div>
      </div>

      <div className="engine-sim__screen">
        <div className="engine-sim__ledger-tablewrap" style={{ maxHeight: 220 }}>
          <table className="engine-sim__ledger-table" style={{ fontSize: '0.74rem' }}>
            <thead>
              <tr>
                <th>Anomaly Flag</th>
                <th>Entity / Channel</th>
                <th>Discrepancy</th>
                <th>Amount Held</th>
                <th>Gate Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'DUP-901', name: 'Duplicate Scheme Claim', entity: 'Super-Stockist West-04', issue: 'Overlapping trade scheme applied twice on same invoice', amount: '₹1,84,000', status: 'QUARANTINED' },
                { id: 'TIER-44', name: 'Hierarchy Tier Mismatch', entity: 'Distributor Hub North', issue: 'Tier 3 agent claimed Tier 1 regional override rate', amount: '₹2,40,000', status: 'QUARANTINED' },
                { id: 'LAPSE-71', name: 'Early Surrender Lapse', entity: 'Broker-South-Branch', issue: 'Policy POL-8812 lapsed at Day 48; 100% clawback due', amount: '₹1,68,000', status: 'QUARANTINED' },
                { id: 'ATTR-12', name: 'Post-Termination Override', entity: 'Ex-Employee EMP-401', issue: 'Override generated 60 days after agent offboarding', amount: '₹50,000', status: 'REVOKED' },
              ].map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className="tag tag--sm" style={{ color: '#f59e0b', marginRight: 4 }}>{row.id}</span>
                    <strong style={{ color: 'var(--white)' }}>{row.name}</strong>
                  </td>
                  <td style={{ color: 'var(--ice-200)' }}>{row.entity}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.issue}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--white)', fontWeight: 600 }}>{row.amount}</td>
                  <td>
                    <span className="tag tag--sm" style={{ color: row.status === 'REVOKED' ? '#f87171' : 'var(--cyan)' }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="engine-sim__ast-footer">
          <span>Total Leakage Prevented: <strong style={{ color: 'var(--cyan)' }}>₹6,42,000</strong></span>
          <span style={{ color: 'var(--white)' }}>Cycle Status: 24,996 clean records released for disbursement</span>
        </div>
      </div>

      <div className="engine-sim__footer">
        <span className="engine-sim__foot-tag">
          <Icon name="check" size={12} /> Pre-Disbursement Lock
        </span>
        <span className="engine-sim__foot-sync">0 Overpayment Reversals Post-Close</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Multi-Insurer Reconciliation Sandbox                                     */
/* -------------------------------------------------------------------------- */
export function ReconciliationLedgerSandbox() {
  const [tolerance, setTolerance] = useState<number>(0);
  const [isReconciling, setIsReconciling] = useState<boolean>(false);

  return (
    <div className="engine-sim card edge" role="region" aria-label="Reconciliation Subledger Sandbox">
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" />
          <div>
            <span className="engine-sim__title">Multi-Principal Subledger Reconciler</span>
            <span className="engine-sim__sub">Cross-Carrier Double-Entry Tie-Out</span>
          </div>
        </div>
        <div className="engine-sim__actions">
          <button
            type="button"
            className="engine-sim__btn engine-sim__btn--primary"
            onClick={() => {
              setIsReconciling(true);
              setTimeout(() => setIsReconciling(false), 450);
            }}
          >
            <Icon name="scale" size={13} />
            <span>{isReconciling ? 'Balancing Journals...' : 'Execute Tie-Out'}</span>
          </button>
        </div>
      </div>

      <div className="engine-sim__screen">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span className="eyebrow" style={{ fontSize: '0.62rem', margin: 0 }}>FX &amp; Rounding Tolerance Threshold: ₹{tolerance.toFixed(2)}</span>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={tolerance}
            onChange={(e) => setTolerance(parseFloat(e.target.value))}
            style={{ width: 140, accentColor: 'var(--cyan)' }}
          />
        </div>

        <div className="engine-sim__ledger-tablewrap" style={{ maxHeight: 200 }}>
          <table className="engine-sim__ledger-table" style={{ fontSize: '0.74rem' }}>
            <thead>
              <tr>
                <th>Principal / Carrier Feed</th>
                <th>Claimed Sourced</th>
                <th>Carrier Credit Memo</th>
                <th>FX Rate</th>
                <th>Ledger Variance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { carrier: 'Apex General Insurance (INR)', claimed: '₹14,20,500', verified: '₹14,20,500', fx: '1.00', variance: '₹0.00', status: 'Balanced' },
                { carrier: 'Zenith Life Insurance (INR)', claimed: '₹28,45,000', verified: '₹28,45,000', fx: '1.00', variance: '₹0.00', status: 'Balanced' },
                { carrier: 'Dubai National Ins (AED)', claimed: 'AED 84,200', verified: 'AED 84,200', fx: '22.84', variance: '₹0.00', status: 'Balanced' },
                { carrier: 'Swiss Re Overseas (USD)', claimed: '$12,500', verified: '$12,500', fx: '83.92', variance: '₹0.00', status: 'Balanced' },
              ].map((row) => (
                <tr key={row.carrier}>
                  <td style={{ color: 'var(--white)', fontWeight: 600 }}>{row.carrier}</td>
                  <td>{row.claimed}</td>
                  <td style={{ color: 'var(--ice-100)' }}>{row.verified}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{row.fx}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>{row.variance}</td>
                  <td>
                    <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
                      ✓ {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="engine-sim__ast-footer">
          <span>Subledger vs ERP General Ledger: <strong style={{ color: 'var(--cyan)' }}>0.0000 Variance</strong></span>
          <span style={{ color: 'var(--white)' }}>Automated Journal Entries Prepared for SAP / NetSuite</span>
        </div>
      </div>

      <div className="engine-sim__footer">
        <span className="engine-sim__foot-tag">
          <Icon name="check" size={12} /> Double-Entry Tie-Out
        </span>
        <span className="engine-sim__foot-sync">Multi-Currency Balance Verified</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Channel Hierarchy & Dynamic Split Sandbox                                */
/* -------------------------------------------------------------------------- */
export function ChannelHierarchySandbox() {
  const [selectedTier, setSelectedTier] = useState<number>(3);

  const TIERS = [
    { tier: 1, role: 'National Principal', entity: 'Enterprise Brand Master', override: '100% Volume Base', split: 'Root Anchor' },
    { tier: 2, role: 'Super-Stockist / Master Broker', entity: 'Western Region Logistics Hub', override: '8.0% Top Override', split: 'Aggregated Secondary Offtake' },
    { tier: 3, role: 'C&F Agent / Corporate Partner', entity: 'Mumbai Suburban Distribution Ltd', override: '4.5% Tier Split', split: 'Direct Dealer Sourcing' },
    { tier: 4, role: 'Distributor / Branch Office', entity: 'Andheri Commercial Hub', override: '2.5% Regional Cut', split: 'Wholesale Dispatch' },
    { tier: 5, role: 'Wholesaler / Agency Unit', entity: 'Apex Retail Supply Group', override: '1.5% Volume Override', split: 'Point of Sale Settlement' },
    { tier: 6, role: 'Field Seller / Point of Sale', entity: 'Field Agent AG-9941', override: '12.0% Base Commission', split: 'Primary Earning Line' },
  ];

  const current = TIERS.find((t) => t.tier === selectedTier) || TIERS[2];

  return (
    <div className="engine-sim card edge" role="region" aria-label="Channel Hierarchy & Split Engine">
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" />
          <div>
            <span className="engine-sim__title">Channel Hierarchy &amp; Split Engine</span>
            <span className="engine-sim__sub">6-Tier Effective-Dated Tree Traversal</span>
          </div>
        </div>
      </div>

      <div className="engine-sim__screen">
        <div className="engine-sim__pipeline-grid">
          {/* Tier Tree Navigation */}
          <div className="engine-sim__stages" role="tablist">
            {TIERS.map((t) => (
              <button
                key={t.tier}
                type="button"
                className={`engine-sim__stage-item ${selectedTier === t.tier ? 'is-selected' : ''}`}
                onClick={() => setSelectedTier(t.tier)}
              >
                <span className="engine-sim__stage-idx">0{t.tier}</span>
                <div className="engine-sim__stage-meta">
                  <span className="engine-sim__stage-name">{t.role}</span>
                  <span className="engine-sim__stage-summary">{t.entity}</span>
                </div>
                <div className="engine-sim__stage-stat">
                  <span className="engine-sim__badge">{t.override.split(' ')[0]}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Inspector */}
          <div className="engine-sim__inspector">
            <div className="engine-sim__inspector-head">
              <div>
                <span className="eyebrow" style={{ fontSize: '0.62rem', marginBottom: 2 }}>
                  Tier 0{current.tier} Node Inspection
                </span>
                <h4 style={{ margin: '2px 0 0', fontSize: '0.94rem' }}>{current.role}</h4>
              </div>
              <span className="tag" style={{ color: 'var(--cyan)' }}>{current.override}</span>
            </div>

            <div className="engine-sim__codeblock">
              <div className="engine-sim__code-line">
                <span className="engine-sim__code-label">HIERARCHY_NODE</span>
                <code>{`Node(tier=${current.tier}, role="${current.role}", entity="${current.entity}")`}</code>
              </div>
              <div className="engine-sim__code-line">
                <span className="engine-sim__code-label">SPLIT_CALCULATION</span>
                <code style={{ color: 'var(--cyan)' }}>{`CascadeSplit(baseSale, ${current.override}) -> ${current.split}`}</code>
              </div>
            </div>

            <ul className="engine-sim__loglist">
              <li>
                <Icon name="check" size={13} />
                <span>Point-in-time tree: Effective-dated reparenting without breaking prior cycles</span>
              </li>
              <li>
                <Icon name="shield" size={13} />
                <span>Zero orphan risk: Foreign key validation locks hierarchy on every cycle close</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="engine-sim__footer">
        <span className="engine-sim__foot-tag">
          <Icon name="layers" size={12} /> Dynamic Splits
        </span>
        <span className="engine-sim__foot-sync">Real-Time Hierarchy Traversal</span>
      </div>
    </div>
  );
}

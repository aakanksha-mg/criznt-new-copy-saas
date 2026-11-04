import { useState } from 'react';
import { Icon } from '@/components/Icon';

type PrincipalId = 'insurers' | 'banks' | 'funds';

interface PrincipalGroup {
  id: PrincipalId;
  name: string;
  metricLabel: string;
  target: string;
  achieved: string;
  shortfall: string;
  isSurplus?: boolean;
  revenueLabel: string;
  revenue: string;
  partners: { name: string; target: string; achieved: string; shortfall: string; yield: string }[];
  note: string;
}

const PRINCIPAL_DATA: Record<PrincipalId, PrincipalGroup> = {
  insurers: {
    id: 'insurers',
    name: 'General & Life Insurers',
    metricLabel: 'Sourced Gross Premium',
    target: '₹45.0 Cr',
    achieved: '₹38.2 Cr',
    shortfall: '₹6.8 Cr',
    revenueLabel: 'Brokerage Earned (12.0% avg)',
    revenue: '₹4.58 Cr',
    partners: [
      { name: 'Tata AIG General', target: '₹18.0 Cr', achieved: '₹15.4 Cr', shortfall: '₹2.6 Cr', yield: '13.5%' },
      { name: 'HDFC Life Insurance', target: '₹15.0 Cr', achieved: '₹13.1 Cr', shortfall: '₹1.9 Cr', yield: '11.8%' },
      { name: 'ICICI Lombard GIC', target: '₹12.0 Cr', achieved: '₹9.7 Cr', shortfall: '₹2.3 Cr', yield: '10.5%' },
    ],
    note: 'Premium sourced and brokerage earned are tracked separately: brokerage follows carrier reconciliation, not booking.',
  },
  banks: {
    id: 'banks',
    name: 'Banks & Lending Partners',
    metricLabel: 'Disbursed Loan Volume',
    target: '₹30.0 Cr',
    achieved: '₹28.5 Cr',
    shortfall: '₹1.5 Cr',
    revenueLabel: 'Sourcing Fee (3.0% avg)',
    revenue: '₹85.5 L',
    partners: [
      { name: 'Axis Bank Commercial', target: '₹14.0 Cr', achieved: '₹13.8 Cr', shortfall: '₹0.2 Cr', yield: '3.2%' },
      { name: 'Bajaj Finance SME', target: '₹10.0 Cr', achieved: '₹9.1 Cr', shortfall: '₹0.9 Cr', yield: '2.8%' },
      { name: 'Tata Capital NBFC', target: '₹6.0 Cr', achieved: '₹5.6 Cr', shortfall: '₹0.4 Cr', yield: '3.0%' },
    ],
    note: 'Payout follows actual loan disbursal rather than proposal sourcing: zero unearned advance accrual.',
  },
  funds: {
    id: 'funds',
    name: 'Mutual Fund AMCs',
    metricLabel: 'Net AUM under Management',
    target: '₹100.0 Cr',
    achieved: '₹104.2 Cr',
    shortfall: '+₹4.2 Cr (Surplus)',
    isSurplus: true,
    revenueLabel: 'Annualized Trail Run-Rate',
    revenue: '₹62.5 L/yr',
    partners: [
      { name: 'HDFC Mutual Fund', target: '₹45.0 Cr', achieved: '₹48.1 Cr', shortfall: '+₹3.1 Cr', yield: '0.65%' },
      { name: 'SBI Mutual Fund', target: '₹35.0 Cr', achieved: '₹36.0 Cr', shortfall: '+₹1.0 Cr', yield: '0.58%' },
      { name: 'ICICI Prudential AMC', target: '₹20.0 Cr', achieved: '₹20.1 Cr', shortfall: '+₹0.1 Cr', yield: '0.60%' },
    ],
    note: 'Trail revenue accrues continuously on daily average AUM rather than settling as a one-time transaction.',
  },
};

export function SureHeroSimulator() {
  const [activeTab, setActiveTab] = useState<'targets' | 'quotes' | 'servicing'>('targets');
  const [selectedPrincipal, setSelectedPrincipal] = useState<PrincipalId>('insurers');
  const [isSimulatingRenewal, setIsSimulatingRenewal] = useState(false);
  const [carrierFileIngested, setCarrierFileIngested] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<string>('TATA');

  const p = PRINCIPAL_DATA[selectedPrincipal];

  const handleSimulateRenewal = () => {
    setIsSimulatingRenewal(true);
    setTimeout(() => {
      setIsSimulatingRenewal(false);
      setActiveTab('servicing');
    }, 600);
  };

  return (
    <div className="engine-sim card edge" role="region" aria-label="Crizant Sure Broking Runtime Simulator">
      {/* Simulation Header */}
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" />
          <div>
            <span className="engine-sim__title">Crizant Sure Broking Runtime</span>
            <span className="engine-sim__sub">v3.4.1 · Composite Intermediary Edition</span>
          </div>
        </div>

        <div className="engine-sim__actions">
          <button
            type="button"
            className="engine-sim__btn engine-sim__btn--primary"
            onClick={handleSimulateRenewal}
            disabled={isSimulatingRenewal}
            title="Simulate priority renewal scoring across book"
          >
            <Icon name="rocket" size={13} />
            <span>{isSimulatingRenewal ? 'Ranking Queue...' : 'Simulate Renewal Queue'}</span>
          </button>
          <button
            type="button"
            className={`engine-sim__btn ${carrierFileIngested ? 'engine-sim__btn--active' : ''}`}
            onClick={() => setCarrierFileIngested((prev) => !prev)}
            title="Ingest carrier statement to reconcile brokerage"
          >
            <Icon name="check" size={13} />
            <span>{carrierFileIngested ? 'Statement Ingested' : 'Ingest Carrier Feed'}</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="engine-sim__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'targets'}
          className={`engine-sim__tab ${activeTab === 'targets' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('targets')}
        >
          <Icon name="chart" size={14} />
          <span>Multi-Principal Targets</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'quotes'}
          className={`engine-sim__tab ${activeTab === 'quotes' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('quotes')}
        >
          <Icon name="scale" size={14} />
          <span>Placement &amp; RFQ</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'servicing'}
          className={`engine-sim__tab ${activeTab === 'servicing' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('servicing')}
        >
          <Icon name="umbrella" size={14} />
          <span>Servicing &amp; AI Copilot</span>
        </button>
      </div>

      {/* Screen Body */}
      <div className="engine-sim__screen">
        {activeTab === 'targets' && (
          <div className="engine-sim__pipeline-grid">
            {/* Principal Selector List */}
            <div className="engine-sim__stages" role="tablist" aria-orientation="vertical">
              {(Object.keys(PRINCIPAL_DATA) as PrincipalId[]).map((key, idx) => {
                const item = PRINCIPAL_DATA[key];
                const isSelected = selectedPrincipal === key;
                return (
                  <div
                    key={key}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isSelected}
                    className={`engine-sim__stage-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedPrincipal(key)}
                  >
                    <span className="engine-sim__stage-idx">0{idx + 1}</span>
                    <div className="engine-sim__stage-meta">
                      <span className="engine-sim__stage-name">{item.name}</span>
                      <span className="engine-sim__stage-summary">
                        Shortfall: <strong style={{ color: item.isSurplus ? 'var(--cyan)' : '#f87171' }}>{item.shortfall}</strong>
                      </span>
                    </div>
                    <div className="engine-sim__stage-stat">
                      <span className="engine-sim__badge">{item.achieved}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inspector */}
            <div className="engine-sim__inspector">
              <div className="engine-sim__inspector-head">
                <div>
                  <span className="eyebrow" style={{ fontSize: '0.62rem', marginBottom: 2 }}>
                    Principal Group Breakdown
                  </span>
                  <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: '0.92rem' }}>
                    {p.name}
                  </div>
                </div>
                <div className="engine-sim__chip-group">
                  <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
                    Target: {p.target}
                  </span>
                  <span className="tag tag--sm" style={{ color: p.isSurplus ? 'var(--cyan)' : '#f87171' }}>
                    {p.isSurplus ? 'Surplus' : 'Shortfall'}: {p.shortfall}
                  </span>
                </div>
              </div>

              {/* Partner Matrix */}
              <div className="engine-sim__codeblock" style={{ padding: '8px 12px' }}>
                <table className="engine-sim__ledger-table" style={{ fontSize: '0.74rem' }}>
                  <thead>
                    <tr>
                      <th>Partner</th>
                      <th>Target</th>
                      <th>Achieved</th>
                      <th>Shortfall</th>
                      <th>Yield</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.partners.map((pt) => (
                      <tr key={pt.name}>
                        <td style={{ color: 'var(--white)', fontWeight: 500 }}>{pt.name}</td>
                        <td>{pt.target}</td>
                        <td style={{ color: 'var(--ice-100)' }}>{pt.achieved}</td>
                        <td style={{ color: p.isSurplus ? 'var(--cyan)' : '#f87171' }}>{pt.shortfall}</td>
                        <td style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>{pt.yield}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="engine-sim__loglist" style={{ marginTop: 'var(--space-2)' }}>
                <li>
                  <Icon name="check" size={13} />
                  <span><strong>{p.revenueLabel}:</strong> {p.revenue}</span>
                </li>
                <li>
                  <Icon name="spark" size={13} />
                  <span>{p.note}</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'quotes' && (
          <div className="engine-sim__ast-view">
            <div className="engine-sim__ast-intro">
              <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
                RFQ ENQ-8820 · Active Placement
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--ice-200)' }}>
                <strong>Marine Cargo Open Cover</strong> · Turnover ₹120 Cr · 4 Insurer quotes normalized side-by-side
              </p>
            </div>

            <div className="engine-sim__ledger-tablewrap" style={{ maxHeight: 210 }}>
              <table className="engine-sim__ledger-table" style={{ fontSize: '0.74rem' }}>
                <thead>
                  <tr>
                    <th>Carrier Quote</th>
                    <th>Rate (%)</th>
                    <th>Deductible</th>
                    <th>Warranties</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'TATA', carrier: 'Tata AIG General', rate: '0.048%', excess: '₹25,000', warranty: 'Institute Cargo Clauses (A) Full', recommended: true },
                    { id: 'ICICI', carrier: 'ICICI Lombard GIC', rate: '0.052%', excess: '₹20,000', warranty: 'Standard Transit Clauses', recommended: false },
                    { id: 'HDFC', carrier: 'HDFC ERGO General', rate: '0.050%', excess: '₹50,000', warranty: 'High Excess Clause', recommended: false },
                    { id: 'NEWINDIA', carrier: 'The New India Assurance', rate: '0.046%', excess: '₹1,00,000', warranty: 'Restricted Overland Transit', recommended: false },
                  ].map((q) => {
                    const isPicked = selectedQuote === q.id;
                    return (
                      <tr key={q.id} style={{ background: isPicked ? 'rgba(0, 204, 255, 0.08)' : undefined }}>
                        <td style={{ color: 'var(--white)', fontWeight: 600 }}>
                          {q.carrier} {q.recommended && <span className="tag tag--sm" style={{ color: 'var(--cyan)', marginLeft: 4 }}>Best Value</span>}
                        </td>
                        <td style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>{q.rate}</td>
                        <td>{q.excess}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{q.warranty}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn--quiet btn--sm"
                            style={{ fontSize: '0.68rem', padding: '3px 8px' }}
                            onClick={() => setSelectedQuote(q.id)}
                          >
                            {isPicked ? '✓ Chosen Quote' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="engine-sim__ast-footer">
              <span>Carried into Policy Endorsement record: 0 re-keying errors</span>
              <span style={{ color: 'var(--cyan)' }}>Status: Ready to Bind &amp; Issue</span>
            </div>
          </div>
        )}

        {activeTab === 'servicing' && (
          <div className="engine-sim__ledger-view">
            <div className="engine-sim__ledger-intro">
              <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
                Urgency × Premium at Stake × Likelihood to Renew
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--ice-200)' }}>
                Ranked renewal queue generated by Crizant Sure AI copilot from historical book retention
              </p>
            </div>

            <div className="engine-sim__ledger-tablewrap" style={{ maxHeight: 210 }}>
              <table className="engine-sim__ledger-table" style={{ fontSize: '0.74rem' }}>
                <thead>
                  <tr>
                    <th>Account / Policy</th>
                    <th>Days Left</th>
                    <th>Premium</th>
                    <th>Likelihood</th>
                    <th>Next Best Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { account: 'Bharat Petrochem Corp', cover: 'Fire & Special Perils', days: '9 days', premium: '₹24.5 L', score: '92% (High)', action: 'Renewal endorsement drafted' },
                    { account: 'Apex Logistics Ltd', cover: 'Commercial Fleet (84 Veh)', days: '14 days', premium: '₹18.0 L', score: '74% (Medium)', action: 'Re-quote dispatched to client' },
                    { account: 'Sterling Healthcare', cover: 'Group Mediclaim (450 Lives)', days: '21 days', premium: '₹42.0 L', score: '48% (At Risk)', action: 'Broker Principal escalation scheduled' },
                  ].map((row) => (
                    <tr key={row.account}>
                      <td>
                        <div style={{ color: 'var(--white)', fontWeight: 600 }}>{row.account}</div>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{row.cover}</span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: '#fbbf24' }}>{row.days}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-100)' }}>{row.premium}</td>
                      <td>
                        <span className="tag tag--sm" style={{ color: row.score.includes('High') ? 'var(--cyan)' : row.score.includes('At Risk') ? '#f87171' : '#fbbf24' }}>
                          {row.score}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="engine-sim__ast-footer">
              <span>Ask the Workspace: &quot;Where is the marine declaration for October?&quot;</span>
              <span style={{ color: 'var(--cyan)' }}>Reconciled: 44 declarations lodged, 0 open queries</span>
            </div>
          </div>
        )}
      </div>

      {/* Simulator Footer */}
      <div className="engine-sim__footer">
        <div className="engine-sim__foot-meta">
          <span className="engine-sim__foot-tag">
            <Icon name="check" size={12} />
            Composite Intermediary Book
          </span>
          <span className="engine-sim__foot-tag">
            <Icon name="wallet" size={12} />
            3 Principal Classes
          </span>
          <span className="engine-sim__foot-tag">
            <Icon name="umbrella" size={12} />
            Zero Carrier Discrepancies
          </span>
        </div>
        <span className="engine-sim__foot-sync">One Customer Record Across All Three</span>
      </div>
    </div>
  );
}

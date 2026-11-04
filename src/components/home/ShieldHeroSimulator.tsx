import { useState } from 'react';
import { Icon } from '@/components/Icon';

type CounterpartyId = 'policyholder' | 'distributor' | 'employee' | 'vendor';

interface CounterpartyItem {
  id: CounterpartyId;
  title: string;
  anomaly: string;
  riskScore: number;
  threshold: number;
  action: string;
  severity: 'critical' | 'high' | 'medium';
  regulatoryAnchor: string;
  details: string[];
}

const COUNTERPARTIES: Record<CounterpartyId, CounterpartyItem> = {
  policyholder: {
    id: 'policyholder',
    title: 'Policyholder · Pre-Issuance Identity',
    anomaly: 'Cover Stacking & Synthetic Identity',
    riskScore: 94,
    threshold: 75,
    action: 'HOLD ISSUANCE · Section 45 3-Yr Clock Protected',
    severity: 'critical',
    regulatoryAnchor: 'Section 45 (Insurance Act 1938)',
    details: [
      'PAN created 21 days prior to proposal submission for ₹2.5 Cr Term cover',
      'Proposal stacking: 3 identical proposals lodged across peer life insurers in 72 hours',
      'Non-disclosure of pre-existing critical condition flagged via carrier shared-claims registry',
    ],
  },
  distributor: {
    id: 'distributor',
    title: 'Distributor · Agency Churn Ring',
    anomaly: 'Twisting & Engineered Lapsation',
    riskScore: 89,
    threshold: 70,
    action: 'FREEZE PAYOUT · Referral to Forensic Unit (FIU)',
    severity: 'critical',
    regulatoryAnchor: 'IRDAI Code of Conduct / EoM Cap',
    details: [
      '18 policies surrendered on Month 13 immediately re-channeled into fresh proposals',
      'First-year 35% commission claimed on new proposals using surrendered funds',
      'Shared nominee bank account detected across 4 unrelated proposals',
    ],
  },
  employee: {
    id: 'employee',
    title: 'Employee · Underwriting Bypass',
    anomaly: 'Authority Limit Split Approval',
    riskScore: 91,
    threshold: 75,
    action: 'ESCALATE TO 2LoD · Risk Committee Notification',
    severity: 'critical',
    regulatoryAnchor: '3LoD Internal Controls / COSO ERM',
    details: [
      'Underwriting authority limit ₹1.0 Cr bypassed via 3 split proposals of ₹95 Lakhs within 48 hours',
      'Single medical underwriting waiver code utilized without Zonal Medical Officer sign-off',
      'Device footprint of approving manager matched branch sales executive IP',
    ],
  },
  vendor: {
    id: 'vendor',
    title: 'Vendor · Third-Party Claims',
    anomaly: 'Diagnostic Billing Concentration',
    riskScore: 86,
    threshold: 70,
    action: 'SUSPEND CASHLESS DESK · Blind Dual-Audit Engaged',
    severity: 'high',
    regulatoryAnchor: 'TPA & Network Hospital Governance',
    details: [
      'Diagnostic clinic CL-904 billed 28 ultrasound & MRI procedures with sequential serial timestamps',
      'Single investigator submitted 100% clean-chit approval rate over 60 consecutive claims',
      'Average invoice value 64% above geographic P75 benchmark for equivalent diagnosis code',
    ],
  },
};

export function ShieldHeroSimulator() {
  const [activeTab, setActiveTab] = useState<'surveillance' | 'anatomy' | 'governance'>('surveillance');
  const [selectedCounterparty, setSelectedCounterparty] = useState<CounterpartyId>('distributor');
  const [syndicateInjected, setSyndicateInjected] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const active = COUNTERPARTIES[selectedCounterparty];

  const handleInjectSyndicate = () => {
    setSyndicateInjected((prev) => !prev);
    setSelectedCounterparty('distributor');
  };

  const handleGenerateReport = () => {
    setReportGenerated(true);
    setActiveTab('governance');
  };

  return (
    <div className="engine-sim card edge" role="region" aria-label="Crizant Shield Detector Core Simulator">
      {/* Simulation Header */}
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" style={{ background: '#f87171', boxShadow: '0 0 6px #f87171' }} />
          <div>
            <span className="engine-sim__title">Crizant Shield Detector Core</span>
            <span className="engine-sim__sub">v2.9.0 · FRMU Risk &amp; Surveillance Gateway</span>
          </div>
        </div>

        <div className="engine-sim__actions">
          <button
            type="button"
            className={`engine-sim__btn ${syndicateInjected ? 'engine-sim__btn--active' : ''}`}
            onClick={handleInjectSyndicate}
            title="Inject multi-agent syndicate pattern into live feed"
          >
            <Icon name="shield" size={13} />
            <span>{syndicateInjected ? 'Syndicate Active' : 'Inject Syndicate Spike'}</span>
          </button>
          <button
            type="button"
            className="engine-sim__btn engine-sim__btn--primary"
            onClick={handleGenerateReport}
            title="Generate Board-ready FRMU pack and FMR-1 filing proof"
          >
            <Icon name="check" size={13} />
            <span>{reportGenerated ? 'FMR-1 Ready' : 'Generate FMR-1 Return'}</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="engine-sim__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'surveillance'}
          className={`engine-sim__tab ${activeTab === 'surveillance' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('surveillance')}
        >
          <Icon name="eye" size={14} />
          <span>4-Counterparty Matrix</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'anatomy'}
          className={`engine-sim__tab ${activeTab === 'anatomy' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('anatomy')}
        >
          <Icon name="scale" size={14} />
          <span>Detector Anatomy (DET-08)</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'governance'}
          className={`engine-sim__tab ${activeTab === 'governance' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('governance')}
        >
          <Icon name="layers" size={14} />
          <span>FRMU Board Pack</span>
        </button>
      </div>

      {/* Screen Body */}
      <div className="engine-sim__screen">
        {activeTab === 'surveillance' && (
          <div className="engine-sim__pipeline-grid">
            {/* Counterparty List */}
            <div className="engine-sim__stages" role="tablist" aria-orientation="vertical">
              {(Object.keys(COUNTERPARTIES) as CounterpartyId[]).map((key, idx) => {
                const item = COUNTERPARTIES[key];
                const isSelected = selectedCounterparty === key;
                return (
                  <div
                    key={key}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isSelected}
                    className={`engine-sim__stage-item ${isSelected ? 'is-selected' : ''} is-flagged`}
                    onClick={() => setSelectedCounterparty(key)}
                  >
                    <span className="engine-sim__stage-idx" style={{ color: '#f87171' }}>0{idx + 1}</span>
                    <div className="engine-sim__stage-meta">
                      <span className="engine-sim__stage-name">{item.title.split('·')[0]}</span>
                      <span className="engine-sim__stage-summary">{item.anomaly}</span>
                    </div>
                    <div className="engine-sim__stage-stat">
                      <span className="engine-sim__badge" style={{ color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.4)' }}>
                        Risk: {item.riskScore}/100
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inspector */}
            <div className="engine-sim__inspector">
              <div className="engine-sim__inspector-head">
                <div>
                  <span className="eyebrow" style={{ fontSize: '0.62rem', marginBottom: 2, color: '#f87171' }}>
                    Active Anomaly Incident
                  </span>
                  <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: '0.92rem' }}>
                    {active.title}
                  </div>
                </div>
                <div className="engine-sim__chip-group">
                  <span className="tag tag--sm" style={{ color: '#f87171' }}>
                    Score: {active.riskScore} (Threshold: {active.threshold})
                  </span>
                  <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
                    {active.regulatoryAnchor}
                  </span>
                </div>
              </div>

              {/* Action Box */}
              <div className="engine-sim__codeblock" style={{ padding: '8px 12px', borderLeft: '3px solid #f87171' }}>
                <span className="engine-sim__code-label" style={{ color: '#f87171' }}>MANDATORY MITIGATION ACTION</span>
                <div style={{ color: 'var(--white)', fontWeight: 600, fontSize: '0.82rem', marginTop: 3 }}>
                  {active.action}
                </div>
              </div>

              <ul className="engine-sim__loglist" style={{ marginTop: 'var(--space-2)' }}>
                {active.details.map((d) => (
                  <li key={d}>
                    <span style={{ color: '#f87171', display: 'inline-flex', flexShrink: 0 }}>
                      <Icon name="alert" size={13} />
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'anatomy' && (
          <div className="engine-sim__ast-view">
            <div className="engine-sim__ast-intro">
              <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
                DET-08: Early Death &amp; Churn Syndicate Detector
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--ice-200)' }}>
                Deterministic weighted rule specification — transparent weights readable by the CRO and compliance
              </p>
            </div>

            <div className="engine-sim__codeblock" style={{ maxHeight: 200, overflowY: 'auto' }}>
              <table className="engine-sim__ledger-table" style={{ fontSize: '0.74rem' }}>
                <thead>
                  <tr>
                    <th>Rule Condition (Condition Evaluated)</th>
                    <th>Weight</th>
                    <th>Observed Value</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: 'var(--white)' }}>Shared Payer / Account Hash across &gt;= 3 unrelated lives</td>
                    <td style={{ color: 'var(--cyan)' }}>40 pts</td>
                    <td>Hash Match: 4 lives (Agent AG-401)</td>
                    <td style={{ color: '#f87171', fontWeight: 600 }}>+40</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--white)' }}>Proposal within 90 days of agency code activation</td>
                    <td style={{ color: 'var(--cyan)' }}>25 pts</td>
                    <td>Agent Code Active: 48 days</td>
                    <td style={{ color: '#f87171', fontWeight: 600 }}>+25</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--white)' }}>Sum Insured &gt;= 8x declared annual income on proposal</td>
                    <td style={{ color: 'var(--cyan)' }}>20 pts</td>
                    <td>Income: ₹6.0L · Cover: ₹1.5 Cr (25x)</td>
                    <td style={{ color: '#f87171', fontWeight: 600 }}>+20</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--white)' }}>Pincode flagged in carrier historical early-claim cluster</td>
                    <td style={{ color: 'var(--cyan)' }}>15 pts</td>
                    <td>Pincode: 400072 (Normal cluster)</td>
                    <td style={{ color: 'var(--text-dim)' }}>0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="engine-sim__ast-footer">
              <span>Threshold: Score &gt;= 70 pts · Fired Score: 85 pts (TRIGGERED)</span>
              <span style={{ color: 'var(--cyan)' }}>Historical Backfill: 120,000 policies tested · 0.28% FPR</span>
            </div>
          </div>
        )}

        {activeTab === 'governance' && (
          <div className="engine-sim__ledger-view">
            <div className="engine-sim__ledger-intro">
              <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
                Board Fraud Monitoring Committee (FMC) Packet
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--ice-200)' }}>
                Ready for quarterly board filing and IRDAI FMR-1 semi-annual regulatory submission
              </p>
            </div>

            <div className="engine-sim__ledger-tablewrap" style={{ maxHeight: 200 }}>
              <table className="engine-sim__ledger-table" style={{ fontSize: '0.74rem' }}>
                <thead>
                  <tr>
                    <th>Control Item / Risk Register</th>
                    <th>1st Line Owner</th>
                    <th>2nd Line Checker</th>
                    <th>3rd Line Assurer</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { risk: 'Pre-Issuance Proposal Stacking (Sec 45)', line1: 'Branch Underwriting', line2: 'FRMU Surveillance', line3: 'Internal Audit', status: 'Continuous Active' },
                    { risk: 'Agency Commission Skimming & Churn', line1: 'Distribution Ops', line2: 'Compliance Risk', line3: 'Audit Committee', status: 'Continuous Active' },
                    { risk: 'Underwriting Limit Overrides & Bypass', line1: 'Zonal Managers', line2: 'Chief Risk Officer', line3: 'Statutory Auditor', status: 'Continuous Active' },
                    { risk: 'Diagnostic & Hospital Billing Inflation', line1: 'TPA Desk', line2: 'Claims Integrity Unit', line3: 'External Forensic', status: 'Audited' },
                  ].map((row) => (
                    <tr key={row.risk}>
                      <td style={{ color: 'var(--white)', fontWeight: 500 }}>{row.risk}</td>
                      <td>{row.line1}</td>
                      <td>{row.line2}</td>
                      <td>{row.line3}</td>
                      <td>
                        <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="engine-sim__ast-footer">
              <span>Dual Sign-Off: Chief Risk Officer (CRO) + Principal Compliance Officer</span>
              <span style={{ color: 'var(--cyan)' }}>FMR-1 Return Hash: 4e91...f32a</span>
            </div>
          </div>
        )}
      </div>

      {/* Simulator Footer */}
      <div className="engine-sim__footer">
        <div className="engine-sim__foot-meta">
          <span className="engine-sim__foot-tag">
            <Icon name="shield" size={12} />
            4 Counterparty Coverage
          </span>
          <span className="engine-sim__foot-tag">
            <Icon name="check" size={12} />
            Section 45 Protected
          </span>
          <span className="engine-sim__foot-tag">
            <Icon name="layers" size={12} />
            FMR-1 Regulatory Proof
          </span>
        </div>
        <span className="engine-sim__foot-sync">Pre-Issuance Quarantining Active</span>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Icon } from '@/components/Icon';

interface IncidentScenario {
  id: string;
  title: string;
  triggerTime: string;
  source: string;
  severity: 'HIGH' | 'MEDIUM' | 'CRITICAL';
  description: string;
  automatedActions: {
    time: string;
    step: string;
    status: 'PASS' | 'GUARD' | 'COMMITTED';
    detail: string;
  }[];
  slaTarget: string;
  actualResolution: string;
  variancePrevented: string;
}

const SCENARIOS: IncidentScenario[] = [
  {
    id: 'schema-drift',
    title: 'Upstream ERP Schema Drift (Column Truncation)',
    triggerTime: '01:32:14 IST',
    source: 'SAP S/4HANA Daily Ingress Batch',
    severity: 'HIGH',
    description: 'Upstream core system changed seller branch ID datatype from VARCHAR(16) to INT(8) without prior RFC notification.',
    slaTarget: '< 30 min SLA containment',
    actualResolution: '4 min 12 sec automated quarantine',
    variancePrevented: '₹1.84 Cr unassigned misattribution',
    automatedActions: [
      {
        time: '01:32:15',
        step: 'Ingress Schema Validator',
        status: 'GUARD',
        detail: 'Cryptographic schema checksum mismatch detected (Expected: 0x9f4a, Received: 0x2b1c). Batch quarantined.',
      },
      {
        time: '01:33:02',
        step: 'Automated Exception Router',
        status: 'PASS',
        detail: 'Pre-close quarantine activated. Live payroll pipeline isolated; non-impacted branches continued execution.',
      },
      {
        time: '01:35:10',
        step: 'Managed Ops Fallback Ingestion',
        status: 'PASS',
        detail: 'Heuristic field mapper adapted branch master references against bitemporal hierarchy graph.',
      },
      {
        time: '01:36:26',
        step: 'Re-verification & Release',
        status: 'COMMITTED',
        detail: 'Bit-exact tie-out verified across 18,400 records. Zero corrupted payout records emitted.',
      },
    ],
  },
  {
    id: 'retro-hierarchy',
    title: 'Retroactive Seller Territory Transfer (T-45 Days)',
    triggerTime: '09:14:05 IST',
    source: 'HRMS Workday Restructuring Event',
    severity: 'MEDIUM',
    description: 'Regional distributor reassigned from North Zone to Central Zone effective 45 days prior, after 2 cycles already paid.',
    slaTarget: '< 4 hours reconciliation',
    actualResolution: '18 sec bitemporal re-derivation',
    variancePrevented: '₹42.6 L duplicate overriding commission',
    automatedActions: [
      {
        time: '09:14:06',
        step: 'Bitemporal Store Event Receipt',
        status: 'GUARD',
        detail: 'Recorded system-time (Today) alongside historical event-time (T-45 days) in append-only hierarchy ledger.',
      },
      {
        time: '09:14:12',
        step: 'Differential Replay Compute',
        status: 'PASS',
        detail: 'Re-evaluated 3,410 transactions against original scheme snapshot using 64-bit fixed-point integer math.',
      },
      {
        time: '09:14:18',
        step: 'Delta Adjustment Voucher Emitted',
        status: 'COMMITTED',
        detail: 'Generated mathematical delta line items with lineage reference. Zero destructive row updates on historical cycles.',
      },
    ],
  },
  {
    id: 'clawback-spike',
    title: 'Surprise Bulk Policy Cancellation Spike (FMCG Return / Insurance Lapse)',
    triggerTime: '16:45:20 IST',
    source: 'Core Banking / Carrier Return Feed',
    severity: 'CRITICAL',
    description: 'Batch of 142 high-value orders cancelled post-dispatch, requiring immediate clawback before cycle disbursement gate.',
    slaTarget: '< 60 min lock',
    actualResolution: '8 sec automated holdback',
    variancePrevented: '₹68.3 L unrecoverable leakage',
    automatedActions: [
      {
        time: '16:45:21',
        step: 'State Machine Clawback Trigger',
        status: 'GUARD',
        detail: 'Transitioned 142 distributor credit vouchers from COMMITTED to SUSPENDED status.',
      },
      {
        time: '16:45:24',
        step: 'Escrow Reserve Offset Engine',
        status: 'PASS',
        detail: 'Offset clawback amounts against distributor rolling retention reserves and pending slab accruals.',
      },
      {
        time: '16:45:28',
        step: 'Distributor PWA Notification',
        status: 'COMMITTED',
        detail: 'Dispatched line-item derivation notice with return order invoice numbers directly to seller handsets.',
      },
    ],
  },
];

export function SlaRunbookSimulator() {
  const [selectedId, setSelectedId] = useState(SCENARIOS[0].id);
  const scenario = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0];

  const handleSelectScenario = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="card card--pad-lg edge" style={{ margin: 'var(--space-6) 0' }}>
      <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
            <span style={{ verticalAlign: 'middle', marginRight: '6px', display: 'inline-flex' }}>
              <Icon name="clock" size={14} />
            </span>
            Managed Operations Runbook · 99.5% Contracted SLA Flight Simulator
          </span>
          <h3 style={{ margin: 'var(--space-1) 0', fontSize: '1.25rem' }}>
            Interactive Incident Response &amp; Runbook Engine
          </h3>
          <p className="card__body" style={{ margin: 0, fontSize: '0.88rem' }}>
            Simulate a real-world operational exception and watch how Crizant’s managed services team and automated runtimes contain the risk before payouts leave the building.
          </p>
        </div>
        <span className="badge badge--accent" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          99.5% SLA · 24/7 Monitoring
        </span>
      </div>

      {/* Scenario Tabs */}
      <div className="pillbar" style={{ marginBottom: 'var(--space-4)' }}>
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={selectedId === s.id}
            onClick={() => handleSelectScenario(s.id)}
            style={{ fontSize: '0.82rem' }}
          >
            {s.title.split('(')[0].trim()}
          </button>
        ))}
      </div>

      <div className="grid grid--3" style={{ gap: 'var(--space-4)', alignItems: 'stretch' }}>
        {/* Left Col: Incident Context */}
        <div style={{ background: 'rgba(5, 12, 30, 0.6)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--navy-800)' }}>
          <div className="cluster" style={{ justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--azure)' }}>
              TRIGGER: {scenario.triggerTime}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                padding: '2px 6px',
                borderRadius: '3px',
                fontWeight: 700,
                background: scenario.severity === 'CRITICAL' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                color: scenario.severity === 'CRITICAL' ? '#f87171' : '#fbbf24',
              }}
            >
              {scenario.severity} SEVERITY
            </span>
          </div>

          <h4 style={{ margin: 'var(--space-1) 0 var(--space-2)', fontSize: '1rem', color: 'var(--white)' }}>
            {scenario.title}
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: 'var(--space-3)', lineHeight: 1.5 }}>
            {scenario.description}
          </p>

          <div style={{ padding: 'var(--space-2) var(--space-3)', background: 'rgba(2, 6, 23, 0.8)', borderRadius: 'var(--radius-sm)', border: '1px solid #1e293b', marginBottom: 'var(--space-3)' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>ORIGINATING FEED:</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--white)', fontWeight: 500 }}>{scenario.source}</div>
          </div>

          <div style={{ padding: 'var(--space-2) var(--space-3)', background: 'rgba(0, 240, 255, 0.05)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--cyan)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Leakage Prevented at Source:</div>
            <strong style={{ fontSize: '0.9rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>
              {scenario.variancePrevented}
            </strong>
          </div>
        </div>

        {/* Center & Right Col: Live Automated Runbook Execution Log */}
        <div style={{ gridColumn: 'span 2', background: '#020617', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="cluster" style={{ justifyContent: 'space-between', marginBottom: 'var(--space-3)', borderBottom: '1px solid #1e293b', paddingBottom: 'var(--space-2)' }}>
              <div className="cluster" style={{ gap: 'var(--space-2)' }}>
                <span className="fine" style={{ fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                  RUNBOOK_EXECUTION_TIMELINE // FLIGHT_LOG
                </span>
              </div>
              <span className="badge" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#38bdf8' }}>
                TARGET: {scenario.slaTarget}
              </span>
            </div>

            <div className="stack" style={{ gap: 'var(--space-2)' }}>
              {scenario.automatedActions.map((action, i) => (
                <div
                  key={i}
                  style={{
                    background: '#090d16',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #1e293b',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748b', minWidth: '60px' }}>
                    {action.time}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div className="cluster" style={{ justifyContent: 'space-between', marginBottom: '2px' }}>
                      <strong style={{ fontSize: '0.82rem', color: 'var(--white)' }}>
                        {action.step}
                      </strong>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '1px 6px',
                          borderRadius: '3px',
                          background:
                            action.status === 'COMMITTED'
                              ? 'rgba(16, 185, 129, 0.2)'
                              : action.status === 'GUARD'
                              ? 'rgba(239, 68, 68, 0.2)'
                              : 'rgba(56, 189, 248, 0.2)',
                          color:
                            action.status === 'COMMITTED'
                              ? '#34d399'
                              : action.status === 'GUARD'
                              ? '#f87171'
                              : '#38bdf8',
                        }}
                      >
                        {action.status}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      {action.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="cluster"
            style={{
              justifyContent: 'space-between',
              marginTop: 'var(--space-3)',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid #1e293b',
            }}
          >
            <div className="cluster" style={{ gap: 'var(--space-2)' }}>
              <span style={{ color: '#34d399', display: 'inline-flex' }}>
                <Icon name="check" size={14} />
              </span>
              <span style={{ fontSize: '0.78rem', color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>
                Resolution Met: <strong>{scenario.actualResolution}</strong>
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#34d399', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              ✓ ZERO DISBURSEMENT DELAY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

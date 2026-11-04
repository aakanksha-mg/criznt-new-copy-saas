import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Link } from 'react-router-dom';

type SystemKey = 'one' | 'sure' | 'shield';

export function ValueChainTopology() {
  const [selectedSystem, setSelectedSystem] = useState<SystemKey>('one');

  const SYSTEMS = {
    one: {
      id: 'one',
      name: 'Crizant One',
      role: 'The Principal Paying the Network',
      to: '/platform',
      inbound: 'Streaming transactions, ERP general ledger, agency master feeds',
      outbound: 'Deterministic payout credit files, offline encrypted SQLite seller PWA payloads',
      contract: 'IntegerFixedPointCompute(BaseCommission * TierMultiplier - Deductions)',
      color: 'var(--cyan)',
    },
    sure: {
      id: 'sure',
      name: 'Crizant Sure',
      role: 'The Intermediary Running the Book',
      to: '/products/crizant-sure',
      inbound: 'Client enquiries, multi-insurer placement quotes, loan disbursal records',
      outbound: 'Bound policy endorsements, renewal probability ranks, composite books',
      contract: 'MultiPrincipalTargetShortfall(Insurers: GWP, Banks: Disbursals, Funds: AUM)',
      color: '#60a5fa',
    },
    shield: {
      id: 'shield',
      name: 'Crizant Shield',
      role: 'The Risk Function Policing Both',
      to: '/products/crizant-shield',
      inbound: 'Proposal streams, carrier shared-claims registry, TPA billing files',
      outbound: 'Pre-issuance quarantine orders, Section 45 time-locks, FMR-1 Board packs',
      contract: 'Detect4Counterparties(Policyholder, Distributor, Employee, Vendor)',
      color: '#f87171',
    },
  };

  const current = SYSTEMS[selectedSystem];

  return (
    <div className="engine-sim card edge" role="region" aria-label="Distribution Value Chain Topology">
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" />
          <div>
            <span className="engine-sim__title">One Distribution Chain · Three Interconnected Systems</span>
            <span className="engine-sim__sub">Principal ➔ Intermediary ➔ Risk Surveillance</span>
          </div>
        </div>
      </div>

      <div className="engine-sim__screen">
        {/* 3 Interactive Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 8 }}>
          {(['one', 'sure', 'shield'] as SystemKey[]).map((key) => {
            const s = SYSTEMS[key];
            const isSelected = selectedSystem === key;
            return (
              <button
                key={key}
                type="button"
                className={`btn btn--quiet ${isSelected ? 'btn--accent' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'left',
                }}
                onClick={() => setSelectedSystem(key)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: isSelected ? 'var(--navy-900)' : 'var(--white)' }}>
                    {s.name}
                  </span>
                  <Icon name={key === 'one' ? 'layers' : key === 'sure' ? 'rocket' : 'shield'} size={14} />
                </div>
                <span style={{ fontSize: '0.68rem', marginTop: 2, opacity: 0.9 }}>
                  {s.role.split(' ')[1]} {s.role.split(' ')[2]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Data Contract Inspection */}
        <div className="engine-sim__codeblock" style={{ padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span className="engine-sim__code-label" style={{ color: current.color }}>
              ACTIVE SYSTEM: {current.name.toUpperCase()} · {current.role}
            </span>
            <Link to={current.to} style={{ fontSize: '0.72rem', color: 'var(--cyan)', textDecoration: 'none' }}>
              Explore Platform Detail →
            </Link>
          </div>
          <div className="engine-sim__code-line">
            <span className="engine-sim__code-label">INBOUND_DATA_CONTRACT</span>
            <code>{current.inbound}</code>
          </div>
          <div className="engine-sim__code-line" style={{ marginTop: 4 }}>
            <span className="engine-sim__code-label">OUTBOUND_VERIFIED_FEED</span>
            <code style={{ color: 'var(--ice-100)' }}>{current.outbound}</code>
          </div>
          <div className="engine-sim__code-line" style={{ marginTop: 4 }}>
            <span className="engine-sim__code-label">RUNTIME_ASSERTION</span>
            <code style={{ color: 'var(--cyan)' }}>{current.contract}</code>
          </div>
        </div>
      </div>

      <div className="engine-sim__footer">
        <span className="engine-sim__foot-tag">
          <Icon name="check" size={12} /> Value Chain Integration
        </span>
        <span className="engine-sim__foot-sync">Sold Separately · Runs Independently</span>
      </div>
    </div>
  );
}

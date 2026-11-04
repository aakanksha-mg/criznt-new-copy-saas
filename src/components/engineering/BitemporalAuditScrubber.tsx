import { useState } from 'react';
import { Icon } from '@/components/Icon';

interface TimelineEvent {
  date: string;
  label: string;
  businessFact: string;
  systemRecordDate: string;
  whatHappened: string;
  payoutOnDay: string;
  auditReconstruction: string;
}

const TIMELINE: TimelineEvent[] = [
  {
    date: '2026-06-01',
    label: 'Scheme Inception',
    businessFact: 'Agent Priya assigned to Mumbai West (Tier 3, 12% commission rate).',
    systemRecordDate: '2026-06-01',
    whatHappened: 'Initial scheme activation. Baseline rates recorded in bitemporal store.',
    payoutOnDay: '₹60,000 computed and paid at 12% on ₹5,00,000 premium volume.',
    auditReconstruction:
      'Exact query match: Priya Mumbai-West Tier-3 (valid_from: 2026-06-01, sys_from: 2026-06-01).',
  },
  {
    date: '2026-08-01',
    label: 'Territory Promotion (Unrecorded)',
    businessFact:
      'Priya promoted to Regional Director (Tier 5, 18% rate) in field on Aug 1. HR records were delayed in ERP.',
    systemRecordDate: '2026-08-15 (Recorded 15 days later)',
    whatHappened:
      'August 5 payout cycle computed Priya as Tier 3 because ERP had not synced her promotion yet.',
    payoutOnDay: '₹72,000 paid on Aug 5 based on what system knew on Aug 5.',
    auditReconstruction:
      'Two valid questions, two exact answers: (A) What did we pay on Aug 5? Tier 3 (₹72,000). (B) What should she have earned based on true effective date? Tier 5 (₹1,08,000). Delta ₹36,000 automatically flagged for retroactive reconciliation.',
  },
  {
    date: '2026-09-15',
    label: 'Retroactive Rate Amendment',
    businessFact:
      'Management amends Q3 incentive tier rate retroactively from 18% to 19.5% for all Tier 5 leaders.',
    systemRecordDate: '2026-09-20',
    whatHappened:
      'Conventionally, databases overwrite rate tables and destroy historical auditability.',
    payoutOnDay: 'Previous cycles are never overwritten. A delta adjustment vector is generated.',
    auditReconstruction:
      'Reconstructing the Aug 15 audit report today returns the EXACT bytes shown to the auditor then. New rate applies only to retroactive reconciliation pipeline with full derivation proof.',
  },
  {
    date: '2026-11-04',
    label: 'Current Audit Close',
    businessFact: 'Statutory auditor requests point-in-time state of Priya as of Aug 5, 2026.',
    systemRecordDate: 'Today (2026-11-04)',
    whatHappened:
      'A simple SQL query with AS OF SYSTEM TIME and AS OF VALID TIME reconstructs both worlds instantaneously.',
    payoutOnDay: 'Reconstructed in 0.02ms with zero data archeology.',
    auditReconstruction:
      'Auditor verifies: system paid precisely what it knew on Aug 5, and accounted for retroactive differences in the September ledger close.',
  },
];

export function BitemporalAuditScrubber() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const activeEvent = TIMELINE[selectedIndex];

  return (
    <div className="card card--pad-lg edge" style={{ margin: 'var(--space-5) 0' }}>
      <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
            Interactive Architecture Sandbox · Principle 02
          </span>
          <h3 style={{ margin: '4px 0 0', fontSize: 'var(--fs-h3)' }}>
            Bitemporal Time-Travel: Event Time vs. System Time
          </h3>
          <p className="fine" style={{ margin: '4px 0 0', maxWidth: '65ch' }}>
            Slide across the timeline to see why single-timeline databases fail commission audits,
            and how Crizant&rsquo;s immutable bitemporal model reconstructs any historical state down to the penny.
          </p>
        </div>
        <span className="badge badge--accent badge--dot badge--live">Interactive Scrubber</span>
      </div>

      {/* Scrubber Timeline Controls */}
      <div className="bitemporal__timeline">
        <div className="bitemporal__track" />
        <div className="bitemporal__steps">
          {TIMELINE.map((item, idx) => (
            <button
              key={item.date}
              type="button"
              className={`bitemporal__step ${selectedIndex === idx ? 'is-active' : ''}`}
              onClick={() => setSelectedIndex(idx)}
            >
              <span className="bitemporal__step-dot" />
              <span className="bitemporal__step-date">{item.date}</span>
              <span className="bitemporal__step-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="bitemporal__content-grid">
        {/* Left: The Operational Reality */}
        <div className="bitemporal__box">
          <div className="bitemporal__box-head">
            <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
              1. Business Reality (Valid Time: {activeEvent.date})
            </span>
          </div>
          <p className="bitemporal__fact">{activeEvent.businessFact}</p>
          <div className="fine" style={{ color: 'var(--text-dim)', marginTop: 'var(--space-2)' }}>
            <strong>System Knowledge Date:</strong> {activeEvent.systemRecordDate}
          </div>
          <div className="fine" style={{ color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
            {activeEvent.whatHappened}
          </div>
        </div>

        {/* Right: How the Engine Resolves It */}
        <div className="bitemporal__box bitemporal__box--highlight">
          <div className="bitemporal__box-head">
            <span className="tag tag--sm" style={{ color: '#5bf5b0' }}>
              2. Deterministic Audit Reconstruction
            </span>
          </div>
          <div className="bitemporal__calc-line">
            <span className="bitemporal__calc-k">Disbursement on cycle:</span>
            <span className="bitemporal__calc-v">{activeEvent.payoutOnDay}</span>
          </div>
          <div className="bitemporal__audit-quote">
            <Icon name="check" size={14} />
            <span>{activeEvent.auditReconstruction}</span>
          </div>
        </div>
      </div>

      {/* Code Proof Snippet */}
      <div className="bitemporal__sql-proof">
        <div className="bitemporal__sql-head">
          <span>SQL Bitemporal Schema Representation</span>
          <span>Zero mutation · Append-only ledger</span>
        </div>
        <pre className="bitemporal__sql-code">
{`-- Crizant Bitemporal Query Execution: Reconstructing Point-in-Time Audit
SELECT agent_id, tier_level, rate_percentage, commission_payable
FROM crizant_agent_hierarchy
  FOR SYSTEM_TIME AS OF '${activeEvent.systemRecordDate.split(' ')[0]}'
  FOR BUSINESS_TIME AS OF '${activeEvent.date}'
WHERE agent_id = 'AGT-PRIYA-094';
-- Returns exact snapshot without touching, mutating, or overwriting historical rows.`}
        </pre>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Icon } from '@/components/Icon';

interface PhaseDetail {
  phase: number;
  days: string;
  title: string;
  crizantDoes: string;
  clientProvides: string;
  gatingCheck: string;
  automatedTest: string;
  status: string;
}

const PHASES: PhaseDetail[] = [
  {
    phase: 1,
    days: 'Days 1–2',
    title: 'Ingestion Contracts & Schema Validation',
    crizantDoes: 'Define strict JSON / CSV ingestion schemas, foreign key constraints, and arrival checksums.',
    clientProvides: 'Sample transaction feed and carrier statement files from a prior closed cycle.',
    gatingCheck: '100% schema match on historical feeds; 0 orphaned transaction IDs.',
    automatedTest: 'Assert(SchemaContinuityCheck, 184207_records) -> PASSED (42ms)',
    status: 'Verified',
  },
  {
    phase: 2,
    days: 'Days 3–4',
    title: 'Hierarchy Tree & Role-Based Access Scoping',
    crizantDoes: 'Model multi-tier channel relationships (Super-stockist ➔ Distributor ➔ Wholesaler ➔ Seller).',
    clientProvides: 'Active seller master list with reporting relationships, tax IDs, and bank payout details.',
    gatingCheck: 'Effective-dated tree validated; zero unparented sellers across 12,847 nodes.',
    automatedTest: 'Assert(PointInTimeHierarchyIntegrity) -> PASSED (18ms)',
    status: 'Verified',
  },
  {
    phase: 3,
    days: 'Days 5–6',
    title: 'Scheme DSL Compilation & Fixed-Point AST',
    crizantDoes: 'Transcribe commission matrices and override gates into deterministic AST bytecode.',
    clientProvides: 'Scheme policy documents, circulars, and qualifying milestone thresholds.',
    gatingCheck: 'Deterministic formula proof verified with 0.00000000% IEEE-754 floating-point drift.',
    automatedTest: 'Assert(IntegerFixedPointFloatDrift == 0) -> PASSED (0.1ms)',
    status: 'Verified',
  },
  {
    phase: 4,
    days: 'Days 7–8',
    title: 'Closed-Cycle Parallel Run',
    crizantDoes: 'Re-run client’s most recent closed cycle through Crizant One in parallel with old spreadsheets/ERP.',
    clientProvides: 'Final closed payout statement and bank disbursement summary.',
    gatingCheck: 'Zero variance between Crizant calculation and historical ledger (or naming exact leakage caught).',
    automatedTest: 'Assert(SubledgerReconciliationVariance == 0) -> PASSED (1.2s)',
    status: 'Verified',
  },
  {
    phase: 5,
    days: 'Days 9–10',
    title: 'Production Cutover & Offline Seller App Rollout',
    crizantDoes: 'Deploy encrypted local-first SQLite statements to seller mobile progressive web apps.',
    clientProvides: 'Finance sign-off on payment file format and banking disbursement rail.',
    gatingCheck: '12,847 sellers synced; bank batch payment file ready for release.',
    automatedTest: 'Assert(PwaOfflineDerivationReceiptSync) -> PASSED (0.8s)',
    status: 'Live Active',
  },
];

export function TenDaySprintSimulator() {
  const [activePhase, setActivePhase] = useState<number>(3);
  const p = PHASES.find((x) => x.phase === activePhase) || PHASES[2];

  return (
    <div className="engine-sim card edge" role="region" aria-label="10-Day Implementation Sprint Flight Controller">
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" />
          <div>
            <span className="engine-sim__title">10-Day Go-Live Sprint Flight Controller</span>
            <span className="engine-sim__sub">Automated Gating Criteria &amp; Client/Vendor RACI</span>
          </div>
        </div>
      </div>

      <div className="engine-sim__screen">
        {/* Phase Timeline Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 4, marginBottom: 8 }}>
          {PHASES.map((item) => {
            const isSelected = activePhase === item.phase;
            return (
              <button
                key={item.phase}
                type="button"
                className={`btn btn--quiet btn--sm ${isSelected ? 'btn--accent' : ''}`}
                style={{ fontSize: '0.68rem', padding: '6px 4px', flexDirection: 'column', gap: 2 }}
                onClick={() => setActivePhase(item.phase)}
              >
                <span style={{ fontFamily: 'var(--font-mono)', opacity: 0.8 }}>{item.days}</span>
                <span style={{ fontWeight: 600, fontSize: '0.72rem' }}>Phase 0{item.phase}</span>
              </button>
            );
          })}
        </div>

        {/* Phase Inspector */}
        <div className="engine-sim__inspector" style={{ minHeight: 180 }}>
          <div className="engine-sim__inspector-head">
            <div>
              <span className="eyebrow" style={{ fontSize: '0.62rem', marginBottom: 2 }}>
                {p.days} · Gating Milestone 0{p.phase}
              </span>
              <h4 style={{ margin: '2px 0 0', fontSize: '0.94rem' }}>{p.title}</h4>
            </div>
            <span className="tag" style={{ color: 'var(--cyan)' }}>✓ {p.status}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '8px 0' }}>
            <div className="card card--sunken" style={{ padding: '8px 10px' }}>
              <span className="engine-sim__code-label" style={{ color: 'var(--cyan)' }}>WHAT CRIZANT DELIVERS</span>
              <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--white)', lineHeight: 1.35 }}>
                {p.crizantDoes}
              </p>
            </div>
            <div className="card card--sunken" style={{ padding: '8px 10px' }}>
              <span className="engine-sim__code-label" style={{ color: '#fbbf24' }}>WHAT CLIENT PROVIDES</span>
              <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--ice-200)', lineHeight: 1.35 }}>
                {p.clientProvides}
              </p>
            </div>
          </div>

          <div className="engine-sim__codeblock" style={{ padding: '8px 12px' }}>
            <span className="engine-sim__code-label">AUTOMATED_VERIFICATION_GATE</span>
            <code style={{ color: 'var(--cyan)', display: 'block', marginTop: 2 }}>{p.automatedTest}</code>
          </div>
        </div>
      </div>

      <div className="engine-sim__footer">
        <span className="engine-sim__foot-tag">
          <Icon name="check" size={12} /> Closed-Cycle Parallel Run Pre-requisite
        </span>
        <span className="engine-sim__foot-sync">10 Working Days SLA</span>
      </div>
    </div>
  );
}

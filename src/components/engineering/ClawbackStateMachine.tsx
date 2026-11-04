import { useState } from 'react';
import { Icon } from '@/components/Icon';

type FsmState = 'Accrued' | 'Disbursed' | 'ReversalFlagged' | 'Quarantined' | 'OffsetRecovered';

interface TransitionLog {
  timestamp: string;
  from: FsmState;
  to: FsmState;
  trigger: string;
  amount: string;
  ruleProof: string;
}

export function ClawbackStateMachine() {
  const [currentState, setCurrentState] = useState<FsmState>('Disbursed');
  const [logs, setLogs] = useState<TransitionLog[]>([
    {
      timestamp: 'Day 01',
      from: 'Accrued',
      to: 'Disbursed',
      trigger: 'Cycle Close Disbursement Batch',
      amount: '₹48,000 paid to Broker Tier 2',
      ruleProof: 'Qualifying premium verified at ₹4,00,000 (12% rate)',
    },
  ]);

  const handleTrigger = (event: 'lapse' | 'refund' | 'offset' | 'reset') => {
    if (event === 'reset') {
      setCurrentState('Disbursed');
      setLogs([
        {
          timestamp: 'Day 01',
          from: 'Accrued',
          to: 'Disbursed',
          trigger: 'Cycle Close Disbursement Batch',
          amount: '₹48,000 paid to Broker Tier 2',
          ruleProof: 'Qualifying premium verified at ₹4,00,000 (12% rate)',
        },
      ]);
      return;
    }

    if (event === 'lapse') {
      setCurrentState('ReversalFlagged');
      setLogs((prev) => [
        {
          timestamp: 'Day 74',
          from: 'Disbursed',
          to: 'ReversalFlagged',
          trigger: 'Upstream Ingestion: Early Policy Surrender',
          amount: '₹48,000 earmarked for 100% clawback',
          ruleProof: 'Rule IRDAI-SURRENDER-90D triggered: Lapsed prior to 90 days',
        },
        ...prev,
      ]);
    } else if (event === 'refund') {
      setCurrentState('Quarantined');
      setLogs((prev) => [
        {
          timestamp: 'Day 75',
          from: 'ReversalFlagged',
          to: 'Quarantined',
          trigger: 'Exception Quarantine Gate Engaged',
          amount: '₹48,000 held as unrecovered receivable liability',
          ruleProof: 'Pre-close disbursement lock: broker statement displays negative delta with derivation attached',
        },
        ...prev,
      ]);
    } else if (event === 'offset') {
      setCurrentState('OffsetRecovered');
      setLogs((prev) => [
        {
          timestamp: 'Day 90',
          from: 'Quarantined',
          to: 'OffsetRecovered',
          trigger: 'Next-Cycle Automatic Ledger Offset',
          amount: '₹48,000 offset against ₹92,000 Q4 earnings',
          ruleProof: 'Net payout: ₹44,000. General ledger variance: ₹0.00. Fully reconciled.',
        },
        ...prev,
      ]);
    }
  };

  const states: { id: FsmState; label: string; desc: string }[] = [
    { id: 'Accrued', label: '1. Accrued', desc: 'Calculated, held provisional' },
    { id: 'Disbursed', label: '2. Disbursed', desc: 'Paid to seller account' },
    { id: 'ReversalFlagged', label: '3. Reversal Flagged', desc: 'Upstream lapse detected' },
    { id: 'Quarantined', label: '4. Quarantined', desc: 'Pre-close lock engaged' },
    { id: 'OffsetRecovered', label: '5. Offset / Recovered', desc: 'Net ledger balance zeroed' },
  ];

  return (
    <div className="card card--pad-lg edge" style={{ margin: 'var(--space-5) 0' }}>
      <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
            Interactive Architecture Sandbox · Principle 03
          </span>
          <h3 style={{ margin: '4px 0 0', fontSize: 'var(--fs-h3)' }}>
            Clawbacks as Deterministic State Machines
          </h3>
          <p className="fine" style={{ margin: '4px 0 0', maxWidth: '65ch' }}>
            Spreadsheets lose track of clawbacks when sellers change territory or cycle boundaries pass.
            In Crizant One, every clawback is an explicit, observable state machine that cannot be lost or written off quietly.
          </p>
        </div>
        <span className="badge badge--accent badge--dot badge--live">Live State Machine</span>
      </div>

      {/* State Machine Diagram Nodes */}
      <div className="fsm__nodes">
        {states.map((s, idx) => {
          const isActive = currentState === s.id;
          return (
            <div
              key={s.id}
              className={`fsm__node ${isActive ? 'is-active' : ''}`}
            >
              <div className="fsm__node-head">
                <span className="fsm__node-status-dot" />
                <span className="fsm__node-title">{s.label}</span>
              </div>
              <p className="fsm__node-desc">{s.desc}</p>
              {idx < states.length - 1 && <span className="fsm__arrow-connector">→</span>}
            </div>
          );
        })}
      </div>

      {/* Action Triggers */}
      <div className="fsm__controls">
        <span className="fine" style={{ color: 'var(--text-dim)', alignSelf: 'center' }}>
          Simulate Trigger Event:
        </span>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => handleTrigger('lapse')}
          disabled={currentState === 'ReversalFlagged' || currentState === 'Quarantined' || currentState === 'OffsetRecovered'}
        >
          <Icon name="alert" size={13} />
          <span>1. Policy Lapses at Day 74</span>
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => handleTrigger('refund')}
          disabled={currentState !== 'ReversalFlagged'}
        >
          <Icon name="shield" size={13} />
          <span>2. Lock In Quarantine Gate</span>
        </button>
        <button
          type="button"
          className="btn btn--accent btn--sm"
          onClick={() => handleTrigger('offset')}
          disabled={currentState !== 'Quarantined'}
        >
          <Icon name="check" size={13} />
          <span>3. Auto-Offset in Next Cycle</span>
        </button>
        <button
          type="button"
          className="btn btn--quiet btn--sm"
          onClick={() => handleTrigger('reset')}
          style={{ marginLeft: 'auto' }}
        >
          Reset FSM
        </button>
      </div>

      {/* Transition Logs */}
      <div className="fsm__log-container">
        <div className="fsm__log-head">
          <span>State Machine Transition Proof Log (Cryptographically Verified)</span>
          <span>Zero Silent Write-Offs</span>
        </div>
        <ul className="fsm__logs">
          {logs.map((log, i) => (
            <li key={i} className="fsm__log-item">
              <span className="fsm__log-time">{log.timestamp}</span>
              <span className="fsm__log-trans">
                {log.from} → <strong>{log.to}</strong>
              </span>
              <span className="fsm__log-trigger">{log.trigger}</span>
              <span className="fsm__log-amount">{log.amount}</span>
              <span className="fsm__log-proof">{log.ruleProof}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Icon, type IconName } from '@/components/Icon';
import { Link } from 'react-router-dom';

interface Node {
  id: string;
  name: string;
  icon: IconName;
  layer: 'Ingress' | 'Core Runtime' | 'Governance' | 'Egress';
  summary: string;
  contract: string;
  sla: string;
  to: string;
}

const NODES: Node[] = [
  {
    id: 'ingest',
    name: 'Arrival Validation Gateway',
    icon: 'scale',
    layer: 'Ingress',
    summary: 'Streaming API & scheduled batch file ingress with cryptographic schema continuity check against prior period.',
    contract: 'Strict schema enforcement; rejects unannounced upstream schema drift; isolates malformed payloads.',
    sla: '100% schema continuity verified',
    to: '/platform/calculation-engine',
  },
  {
    id: 'bitemporal',
    name: 'Bitemporal Hierarchy Store',
    icon: 'clock',
    layer: 'Core Runtime',
    summary: 'Append-only event and system time graph holding 6 hierarchy tiers, partner contracts, and commission matrices.',
    contract: 'Zero row mutation; records both event occurrence time and system assertion time; sub-millisecond point-in-time slice.',
    sla: 'Bit-exact replay for 7+ years',
    to: '/platform/hierarchy-team-master',
  },
  {
    id: 'vector-engine',
    name: 'Deterministic Vector Engine',
    icon: 'spark',
    layer: 'Core Runtime',
    summary: 'Partitioned calculation runtime evaluating 184,207 transactions against 42 live schemes using 64-bit fixed-point integer math.',
    contract: 'Pure mathematical function; zero IEEE-754 float drift; partitioned by hierarchy branch to eliminate row locks.',
    sla: '< 0.5ms evaluation per transaction',
    to: '/platform/calculation-engine',
  },
  {
    id: 'quarantine',
    name: 'Anomaly & Exception Gate',
    icon: 'shield',
    layer: 'Governance',
    summary: 'Pre-disbursement quarantine blocking duplicate qualifications, zombie overrides, and untracked policy-lapse clawbacks.',
    contract: 'Hard gate: disbursements locked until all flagged exceptions are verified or adjusted with derivation proof.',
    sla: '3-8% leakage prevented at source',
    to: '/platform/anomaly-leakage-guard',
  },
  {
    id: 'reconcile',
    name: 'Multi-Currency GL Subledger',
    icon: 'layers',
    layer: 'Governance',
    summary: 'Double-entry tie-out balancing transaction-grain sub-ledger against the enterprise general ledger (SAP, Oracle, NetSuite).',
    contract: 'Credits == Debits; transaction-level FX rates recorded; zero unexplained variance at month-end.',
    sla: '100% GL-to-subledger tie-out',
    to: '/platform/reconciliation-ledger',
  },
  {
    id: 'pwa',
    name: 'Offline-First Seller PWA',
    icon: 'offline',
    layer: 'Egress',
    summary: 'Local-first encrypted progressive web app running on seller handsets with 8 languages, RTL support, and voice search.',
    contract: 'Zero network dependency for statement review; delta sync on reconnect; full line derivation breakdown.',
    sla: 'Opens in < 200ms anywhere in field',
    to: '/platform/last-mile',
  },
];

export function ArchitectureTopology() {
  const [activeNodeId, setActiveNodeId] = useState('vector-engine');
  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[2];

  return (
    <div className="card card--pad-lg edge" style={{ margin: 'var(--space-6) 0' }}>
      <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
            System Architecture
          </span>
          <h3 style={{ margin: '4px 0 0', fontSize: 'var(--fs-h2)' }}>
            End-to-End Operating Topology
          </h3>
          <p className="fine" style={{ margin: '4px 0 0', maxWidth: '65ch' }}>
            Click any architectural subsystem to inspect its data contract, latency profile, and operational SLA.
          </p>
        </div>
        <span className="badge badge--accent badge--dot badge--live">Interactive Map</span>
      </div>

      {/* Architecture Interactive Flow Graph */}
      <div className="arch-flow">
        {NODES.map((node, index) => {
          const isSelected = activeNodeId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              className={`arch-node ${isSelected ? 'is-active' : ''}`}
              onClick={() => setActiveNodeId(node.id)}
            >
              <div className="arch-node__head">
                <span className="iconchip iconchip--quiet">
                  <Icon name={node.icon} size={16} />
                </span>
                <span className="tag tag--sm">{node.layer}</span>
              </div>
              <h4 className="arch-node__title">{node.name}</h4>
              <span className="arch-node__sla">{node.sla}</span>
              {index < NODES.length - 1 && (
                <span className="arch-node__flowline" aria-hidden="true">
                  →
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Node Detail Card */}
      <div className="arch-detail">
        <div className="arch-detail__head">
          <div className="cluster" style={{ gap: 'var(--space-3)' }}>
            <span className="iconchip iconchip--accent">
              <Icon name={activeNode.icon} size={20} />
            </span>
            <div>
              <span className="eyebrow" style={{ fontSize: '0.72rem' }}>
                {activeNode.layer} Subsystem
              </span>
              <h4 style={{ margin: '2px 0 0', fontSize: '1.25rem' }}>{activeNode.name}</h4>
            </div>
          </div>
          <Link to={activeNode.to} className="btn btn--ghost btn--sm">
            Inside this module
            <Icon name="arrow" size={13} className="btn__arrow" />
          </Link>
        </div>

        <p style={{ color: 'var(--white)', margin: 'var(--space-3) 0', fontSize: '1rem' }}>
          {activeNode.summary}
        </p>

        <div className="arch-detail__grid">
          <div className="arch-detail__card">
            <span className="fine" style={{ color: 'var(--text-dim)' }}>
              Data Contract &amp; Execution Guarantee
            </span>
            <p className="fine" style={{ color: 'var(--text-muted)', margin: '4px 0 0' }}>
              {activeNode.contract}
            </p>
          </div>
          <div className="arch-detail__card">
            <span className="fine" style={{ color: 'var(--text-dim)' }}>
              Contracted Performance SLA
            </span>
            <div className="calc__headline" style={{ fontSize: '1.4rem', color: 'var(--cyan)', marginTop: '4px' }}>
              {activeNode.sla}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

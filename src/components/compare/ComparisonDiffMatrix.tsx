import { useState } from 'react';
import { Icon } from '@/components/Icon';

interface DiffRow {
  dimension: string;
  crizant: string;
  competitor: string;
  architecturalReason: string;
  winner: 'crizant' | 'competitor' | 'tie';
}

interface BenchmarkSuite {
  slug: string;
  title: string;
  subtitle: string;
  competitorName: string;
  rows: DiffRow[];
}

const BENCHMARKS: Record<string, BenchmarkSuite> = {
  'in-house-scripts': {
    slug: 'in-house-scripts',
    title: 'Crizant One vs. In-House Spreadsheets & Python Scripts',
    subtitle: 'Audited deterministic calculation vs. unversioned workbook macros',
    competitorName: 'In-House Scripts',
    rows: [
      {
        dimension: 'Arithmetic Precision',
        crizant: '64-bit integer fixed-point (zero float drift)',
        competitor: 'IEEE-754 floating point (0.0000001% cumulative drift per 10k txns)',
        architecturalReason: 'Float math in Python/Excel accumulates fractional rounding errors at slab boundaries, causing cash leakage.',
        winner: 'crizant',
      },
      {
        dimension: 'Historical Replay',
        crizant: 'Bitemporal store (sub-millisecond state at any past date)',
        competitor: 'Cell overwrites and dated workbook copies (V2_Final_Final.xlsx)',
        architecturalReason: 'Spreadsheets lack event-time vs system-time separation; audits take weeks of manual email archaeology.',
        winner: 'crizant',
      },
      {
        dimension: 'Scheme Change Latency',
        crizant: 'Visual AST builder with historical simulation (< 4 hours)',
        competitor: 'Ad-hoc script modifications, manual testing (2-3 days)',
        architecturalReason: 'Operations teams configure directly without developer translation errors or regression breaks.',
        winner: 'crizant',
      },
      {
        dimension: 'Hardware Footprint',
        crizant: 'Cloud-native vectorized partitioner',
        competitor: 'Local desktop RAM or single EC2 instance',
        architecturalReason: 'Spreadsheets crash on cycles > 200k records; Crizant evaluates 184,207 transactions in sub-second parallel vectors.',
        winner: 'crizant',
      },
    ],
  },
  'erp-modules-sap-oracle': {
    slug: 'erp-modules-sap-oracle',
    title: 'Crizant One vs. ERP Incentive Modules (SAP / Oracle)',
    subtitle: 'Channel-native agility vs. heavyweight general ledger extensions',
    competitorName: 'ERP Modules',
    rows: [
      {
        dimension: 'Channel Hierarchy Depth',
        crizant: '6-tier effective-dated distributor & broker hierarchy',
        competitor: 'Single-tier employee reporting structure',
        architecturalReason: 'ERPs model quota-carrying direct employees, failing when intermediaries distribute across external broker sub-networks.',
        winner: 'crizant',
      },
      {
        dimension: 'Clawback & Reversal Mechanics',
        crizant: 'Deterministic FSM with automated escrow offset',
        competitor: 'Manual credit memo postings or custom ABAP scripts',
        architecturalReason: 'Crizant tracks policy surrender, return orders, and persistency milestones at line-item grain natively.',
        winner: 'crizant',
      },
      {
        dimension: 'Change Request Cycle',
        crizant: 'No-code business configuration (hours)',
        competitor: 'SI consulting tickets and transport releases (6-12 weeks)',
        architecturalReason: 'Incentive schemes evolve weekly to track competitors; ERP release cycles move on quarterly IT cadences.',
        winner: 'crizant',
      },
      {
        dimension: 'General Ledger Integrity',
        crizant: 'Double-entry subledger with 100% ERP GL tie-out',
        competitor: 'Native GL integration (Built-in)',
        architecturalReason: 'ERPs own the general ledger natively, but Crizant provides the mathematical lineage proof that reconciles to it.',
        winner: 'tie',
      },
    ],
  },
  'enterprise-icm-callidus-varicent': {
    slug: 'enterprise-icm-callidus-varicent',
    title: 'Crizant One vs. Legacy Enterprise ICM (Varicent / NICE)',
    subtitle: 'Reversal-aware channel engine vs. enterprise direct sales software',
    competitorName: 'Enterprise ICM',
    rows: [
      {
        dimension: 'Reversal-First Architecture',
        crizant: 'Built specifically for sales that reverse (FMCG, Insurance, Realty)',
        competitor: 'Built for forward-only SaaS/Enterprise quota retirement',
        architecturalReason: 'Enterprise ICM assumes closed deals stay closed; Crizant assumes transactions reverse and clawbacks accrue.',
        winner: 'crizant',
      },
      {
        dimension: 'Last-Mile Offline PWA',
        crizant: 'Offline-first encrypted PWA (8 languages, RTL)',
        competitor: 'Heavyweight web desktop portal (Requires fast broadband)',
        architecturalReason: 'Field distributors in tier-2/3 geographies need instant access to payout math without network latency.',
        winner: 'crizant',
      },
      {
        dimension: 'Implementation Velocity',
        crizant: '10-day typical go-live with parallel-run gate',
        competitor: '6 to 9 month enterprise implementation lifecycle',
        architecturalReason: 'Crizant’s pre-built industry templates eliminate the hundreds of billable consulting hours required by legacy ICMs.',
        winner: 'crizant',
      },
      {
        dimension: 'Commercial Overhead',
        crizant: 'Flat tier with unlimited transaction re-runs',
        competitor: 'Per-user / per-transaction meter penalties',
        architecturalReason: 'Legacy ICM contracts punish re-running calculation cycles; Crizant encourages continuous pre-close simulation.',
        winner: 'crizant',
      },
    ],
  },
};

export function ComparisonDiffMatrix({ currentSlug }: { currentSlug?: string }) {
  const [activeSlug, setActiveSlug] = useState(
    currentSlug && BENCHMARKS[currentSlug] ? currentSlug : 'in-house-scripts'
  );
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(0);

  const benchmark = BENCHMARKS[activeSlug] || BENCHMARKS['in-house-scripts'];
  const activeDetail = selectedRowIndex !== null ? benchmark.rows[selectedRowIndex] : null;

  return (
    <div className="card card--pad-lg edge" style={{ margin: 'var(--space-6) 0' }}>
      <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
            <span style={{ verticalAlign: 'middle', marginRight: '6px', display: 'inline-flex' }}>
              <Icon name="scale" size={14} />
            </span>
            Architectural Differentiation Matrix · Live Technical Diff
          </span>
          <h3 style={{ margin: 'var(--space-1) 0', fontSize: '1.25rem' }}>
            System-Level Architecture &amp; Mechanism Comparison
          </h3>
          <p className="card__body" style={{ margin: 0, fontSize: '0.88rem' }}>
            Inspect why architectural decisions in the data model determine calculation speed, auditability, and leakage prevention.
          </p>
        </div>
        <span className="badge badge--accent" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          Objective Technical Proof
        </span>
      </div>

      {/* Benchmark Selector Pills */}
      <div className="pillbar" style={{ marginBottom: 'var(--space-4)' }}>
        {Object.values(BENCHMARKS).map((b) => (
          <button
            key={b.slug}
            type="button"
            aria-pressed={activeSlug === b.slug}
            onClick={() => {
              setActiveSlug(b.slug);
              setSelectedRowIndex(0);
            }}
            style={{ fontSize: '0.82rem' }}
          >
            vs. {b.competitorName}
          </button>
        ))}
      </div>

      <div className="tablewrap" style={{ marginBottom: 'var(--space-4)' }}>
        <table className="data" style={{ width: '100%', fontSize: '0.84rem' }}>
          <thead>
            <tr>
              <th scope="col" style={{ width: '25%' }}>Dimension</th>
              <th scope="col" className="col-crizant" style={{ width: '37.5%', background: 'rgba(0, 240, 255, 0.08)' }}>
                ⚡ Crizant One
              </th>
              <th scope="col" style={{ width: '37.5%' }}>
                {benchmark.competitorName}
              </th>
            </tr>
          </thead>
          <tbody>
            {benchmark.rows.map((row, idx) => {
              const isSelected = selectedRowIndex === idx;
              return (
                <tr
                  key={row.dimension}
                  onClick={() => setSelectedRowIndex(idx)}
                  style={{
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(0, 240, 255, 0.05)' : undefined,
                    transition: 'background 0.15s ease',
                  }}
                >
                  <th scope="row" style={{ color: isSelected ? 'var(--cyan)' : 'inherit', fontWeight: isSelected ? 600 : 500 }}>
                    {isSelected ? '▶ ' : ''}{row.dimension}
                  </th>
                  <td className="col-crizant" style={{ fontWeight: 600, color: 'var(--white)' }}>
                    {row.crizant}
                  </td>
                  <td style={{ color: 'var(--text-dim)' }}>
                    {row.competitor}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Dimension Architectural Deep Dive */}
      {activeDetail && (
        <div
          style={{
            background: '#020617',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #1e293b',
          }}
        >
          <div className="cluster" style={{ justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>
              // ARCHITECTURAL ROOT CAUSE: {activeDetail.dimension.toUpperCase()}
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                padding: '1px 6px',
                borderRadius: '3px',
                background: activeDetail.winner === 'crizant' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                color: activeDetail.winner === 'crizant' ? '#34d399' : '#38bdf8',
                fontWeight: 600,
              }}
            >
              {activeDetail.winner === 'crizant' ? 'CRIZANT ARCHITECTURAL ADVANTAGE' : 'EQUIVALENT GL CAPABILITY'}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            {activeDetail.architecturalReason}
          </p>
        </div>
      )}
    </div>
  );
}

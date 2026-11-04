import { useState, useMemo } from 'react';
import { Icon } from '@/components/Icon';

interface FrameworkRule {
  id: string;
  name: string;
  jurisdiction: string;
  statutoryLimit: string;
  description: string;
  testInputLabel: string;
  defaultValue: number;
  unit: string;
  evaluate: (val: number) => {
    utilizationPct: number;
    statutoryCeiling: number;
    status: 'COMPLIANT' | 'WARNING' | 'BREACH';
    derivation: string;
    auditNote: string;
  };
}

const RULES: FrameworkRule[] = [
  {
    id: 'irdai-eom',
    name: 'IRDAI Expenses of Management (EoM) 2023',
    jurisdiction: 'India (IRDAI/Life & General)',
    statutoryLimit: '30.0% Aggregate Gross Written Premium (GWP)',
    description: 'Mandatory statutory cap on commission plus operational expense. Excess spend must be written off from shareholders’ fund with board disclosure.',
    testInputLabel: 'Channel Commission & Payout Spend (₹ Cr)',
    defaultValue: 26.5,
    unit: '₹ Cr',
    evaluate: (val) => {
      const statutoryCeiling = 30.0;
      const utilization = (val / statutoryCeiling) * 100;
      let status: 'COMPLIANT' | 'WARNING' | 'BREACH' = 'COMPLIANT';
      if (val > 30.0) status = 'BREACH';
      else if (val >= 27.0) status = 'WARNING';

      return {
        utilizationPct: Math.min(150, utilization),
        statutoryCeiling,
        status,
        derivation: `Computed: ₹${val.toFixed(2)} Cr / ₹${statutoryCeiling.toFixed(2)} Cr statutory ceiling = ${utilization.toFixed(1)}% of allowable EoM.`,
        auditNote: status === 'BREACH' 
          ? 'CRITICAL: ₹' + (val - 30).toFixed(2) + ' Cr excess requires Board allocation from Shareholders account under FMR-1.'
          : 'PASS: Expenditure within IRDAI EoM Regulation 2023 schedule.',
      };
    },
  },
  {
    id: 'tds-194h-194r',
    name: 'Section 194H / 194R Withholding & PAN Guard',
    jurisdiction: 'India (CBDT / Income Tax)',
    statutoryLimit: '₹15,000 threshold for 194H (5%), ₹20,000 perquisite threshold for 194R (10%)',
    description: 'Real-time deduction gate preventing gross payouts to non-PAN or invalid PAN distributors with automated higher-rate 20% Section 206AA penalty locking.',
    testInputLabel: 'Distributor Cumulative Fiscal Payout (₹)',
    defaultValue: 85000,
    unit: '₹',
    evaluate: (val) => {
      const threshold194H = 15000;
      const isAbove = val > threshold194H;
      const tdsRate = isAbove ? 0.05 : 0.0;
      const tdsAmount = isAbove ? val * tdsRate : 0;
      const netPayable = val - tdsAmount;

      return {
        utilizationPct: Math.min(100, (val / 50000) * 100),
        statutoryCeiling: threshold194H,
        status: 'COMPLIANT',
        derivation: `Gross: ₹${val.toLocaleString()} | Tax Deducted: ₹${tdsAmount.toLocaleString()} (5% u/s 194H) | Net Authorized: ₹${netPayable.toLocaleString()}`,
        auditNote: 'Section 206AA PAN verified on TRACES API; zero default risk.',
      };
    },
  },
  {
    id: 'cbuae-clawback',
    name: 'CBUAE Circular 49/2020 Acquisition Amortization',
    jurisdiction: 'UAE (Central Bank / Insurance Authority)',
    statutoryLimit: '24-Month Pro-Rata Persistency Clawback Window',
    description: 'Enforces amortized recovery on early policy surrender within 24 months of placement, preventing broker churn gaming.',
    testInputLabel: 'Surrender Elapsed Duration (Months)',
    defaultValue: 7,
    unit: 'Months',
    evaluate: (val) => {
      const months = Math.min(24, Math.max(1, val));
      const recoveryPct = ((24 - months) / 24) * 100;
      const status: 'COMPLIANT' | 'WARNING' | 'BREACH' = recoveryPct > 0 ? 'COMPLIANT' : 'WARNING';

      return {
        utilizationPct: recoveryPct,
        statutoryCeiling: 24,
        status,
        derivation: `Elapsed: ${months} of 24 months. Mandated clawback entitlement: ${recoveryPct.toFixed(1)}% of paid commission.`,
        auditNote: `Automated recovery voucher generated against next distribution billing cycle.`,
      };
    },
  },
];

export function RegulatoryRuleAuditor() {
  const [selectedRuleId, setSelectedRuleId] = useState(RULES[0].id);
  const activeRule = RULES.find((r) => r.id === selectedRuleId) || RULES[0];
  const [inputValue, setInputValue] = useState(activeRule.defaultValue);

  const evaluation = useMemo(() => {
    return activeRule.evaluate(inputValue);
  }, [activeRule, inputValue]);

  const handleSelectRule = (rule: FrameworkRule) => {
    setSelectedRuleId(rule.id);
    setInputValue(rule.defaultValue);
  };

  return (
    <div className="card card--pad-lg edge" style={{ margin: 'var(--space-6) 0' }}>
      <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
            <span style={{ verticalAlign: 'middle', marginRight: '6px', display: 'inline-flex' }}>
              <Icon name="shield" size={14} />
            </span>
            Regulatory Rule Engine · Live Statutory Auditor
          </span>
          <h3 style={{ margin: 'var(--space-1) 0', fontSize: '1.25rem' }}>
            Verify Compliance Caps &amp; Statutory Limits
          </h3>
          <p className="card__body" style={{ margin: 0, fontSize: '0.88rem' }}>
            Interactive simulation of Crizant One’s pre-disbursement compliance gating. Choose a regulation to test how payouts are validated before funds move.
          </p>
        </div>
        <span className="badge badge--accent" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          Zero Statutory Drift
        </span>
      </div>

      <div className="pillbar" style={{ marginBottom: 'var(--space-4)' }}>
        {RULES.map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={selectedRuleId === r.id}
            onClick={() => handleSelectRule(r)}
            style={{ fontSize: '0.82rem' }}
          >
            {r.name.split(' ')[0]} {r.name.split(' ')[1]}
          </button>
        ))}
      </div>

      <div className="grid grid--2" style={{ gap: 'var(--space-4)', alignItems: 'stretch' }}>
        {/* Left: Rule Configuration & Input */}
        <div style={{ background: 'rgba(5, 12, 30, 0.6)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--navy-800)' }}>
          <div className="cluster" style={{ justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--azure)' }}>
              JURISDICTION: {activeRule.jurisdiction}
            </span>
            <span className="tag" style={{ fontSize: '0.72rem' }}>
              Statutory Gate
            </span>
          </div>
          <h4 style={{ margin: 'var(--space-1) 0 var(--space-2)', fontSize: '1.05rem', color: 'var(--white)' }}>
            {activeRule.name}
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
            {activeRule.description}
          </p>

          <label className="field" style={{ marginBottom: 'var(--space-3)' }}>
            <span className="field__label" style={{ fontSize: '0.82rem', color: 'var(--cyan)' }}>
              {activeRule.testInputLabel}
            </span>
            <div className="cluster" style={{ gap: 'var(--space-3)' }}>
              <input
                type="range"
                min={activeRule.id === 'irdai-eom' ? 15 : activeRule.id === 'tds-194h-194r' ? 5000 : 1}
                max={activeRule.id === 'irdai-eom' ? 45 : activeRule.id === 'tds-194h-194r' ? 250000 : 24}
                step={activeRule.id === 'irdai-eom' ? 0.5 : activeRule.id === 'tds-194h-194r' ? 5000 : 1}
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                style={{ flex: 1 }}
              />
              <span className="mono-n" style={{ minWidth: '75px', textAlign: 'right', fontWeight: 600, color: 'var(--white)' }}>
                {inputValue.toLocaleString()} {activeRule.unit}
              </span>
            </div>
          </label>

          <div style={{ padding: 'var(--space-2) var(--space-3)', background: 'rgba(0, 240, 255, 0.05)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--cyan)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Mandated Rule Limit:</span>
            <strong style={{ fontSize: '0.82rem', color: 'var(--cyan)' }}>{activeRule.statutoryLimit}</strong>
          </div>
        </div>

        {/* Right: Real-time Evaluation Terminal */}
        <div style={{ background: '#020617', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="cluster" style={{ justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <span className="fine" style={{ fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                GATEWAY_RUNTIME // REGULATORY_EVAL
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  background:
                    evaluation.status === 'COMPLIANT'
                      ? 'rgba(16, 185, 129, 0.2)'
                      : evaluation.status === 'WARNING'
                      ? 'rgba(245, 158, 11, 0.2)'
                      : 'rgba(239, 68, 68, 0.2)',
                  color:
                    evaluation.status === 'COMPLIANT'
                      ? '#34d399'
                      : evaluation.status === 'WARNING'
                      ? '#fbbf24'
                      : '#f87171',
                }}
              >
                ● {evaluation.status}
              </span>
            </div>

            {/* Utilization Bar */}
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div className="cluster" style={{ justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                <span style={{ color: '#94a3b8' }}>Cap Utilization:</span>
                <span style={{ color: evaluation.utilizationPct > 100 ? '#f87171' : '#38bdf8' }}>
                  {evaluation.utilizationPct.toFixed(1)}%
                </span>
              </div>
              <div style={{ height: '6px', background: '#334155', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, evaluation.utilizationPct)}%`,
                    background:
                      evaluation.status === 'BREACH'
                        ? '#ef4444'
                        : evaluation.status === 'WARNING'
                        ? '#f59e0b'
                        : '#00f0ff',
                    transition: 'width 0.2s ease',
                  }}
                />
              </div>
            </div>

            {/* Mathematical Derivation Box */}
            <div
              style={{
                background: '#090d16',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #1e293b',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#e2e8f0',
                lineHeight: 1.5,
                marginBottom: 'var(--space-3)',
              }}
            >
              <div style={{ color: '#00f0ff', marginBottom: '4px' }}>// DERIVATION TRACE:</div>
              {evaluation.derivation}
            </div>
          </div>

          {/* Audit Note Footprint */}
          <div
            style={{
              padding: 'var(--space-2) var(--space-3)',
              borderRadius: 'var(--radius-sm)',
              background: evaluation.status === 'BREACH' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              border: `1px solid ${evaluation.status === 'BREACH' ? '#7f1d1d' : '#064e3b'}`,
              fontSize: '0.75rem',
              color: evaluation.status === 'BREACH' ? '#fca5a5' : '#a7f3d0',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline-flex' }}>
              <Icon name={evaluation.status === 'BREACH' ? 'alert' : 'check'} size={13} />
            </span>
            {evaluation.auditNote}
          </div>
        </div>
      </div>
    </div>
  );
}

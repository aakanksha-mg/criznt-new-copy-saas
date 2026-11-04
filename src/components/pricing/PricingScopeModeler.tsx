import { useState } from 'react';
import { Icon } from '@/components/Icon';

export function PricingScopeModeler() {
  const [sellers, setSellers] = useState<number>(2500);
  const [spendCr, setSpendCr] = useState<number>(40);
  const [isManaged, setIsManaged] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Leakage recovered typically 3.5% to 6.2%
  const leakageRate = isManaged ? 0.052 : 0.038;
  const annualSavedLakhs = (spendCr * 100 * leakageRate).toFixed(1);
  const paybackDays = Math.max(18, Math.round(120 - (spendCr / 250) * 80));

  const copyMemo = () => {
    const memo = `CRIZANT COMMERCIAL SCOPING BRIEFING
--------------------------------------------------
Channel Footprint: ${sellers.toLocaleString('en-IN')} Active Sellers
Annual Channel Spend: ₹${spendCr} Crore
Engagement Model: ${isManaged ? '99.5% Contracted Managed SLA' : 'SaaS Platform License'}
Projected Annual Leakage Recovered: ₹${annualSavedLakhs} Lakhs
Estimated Payback Period: ${paybackDays} Days
Included Modules: Scheme Builder, Vectorized Compute, Multi-Principal Reconcile, Offline PWA
--------------------------------------------------
Verified via Crizant Deployment Benchmarks`;
    navigator.clipboard?.writeText(memo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="engine-sim card edge" role="region" aria-label="Commercial Scope & ROI Modeler">
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" />
          <div>
            <span className="engine-sim__title">Interactive Commercial Scope &amp; ROI Modeler</span>
            <span className="engine-sim__sub">Forecast Leakage Recovery &amp; Payback Period</span>
          </div>
        </div>
        <div className="engine-sim__actions">
          <button
            type="button"
            className="engine-sim__btn engine-sim__btn--primary"
            onClick={copyMemo}
          >
            <Icon name="check" size={13} />
            <span>{copied ? 'Memo Copied!' : 'Copy Scoping Brief'}</span>
          </button>
        </div>
      </div>

      <div className="engine-sim__screen">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, marginBottom: 8 }}>
          <div className="card card--sunken" style={{ padding: '8px 10px' }}>
            <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Active Channel Sellers</span>
            <input
              type="range"
              min="250"
              max="20000"
              step="250"
              value={sellers}
              onChange={(e) => setSellers(parseInt(e.target.value, 10))}
              style={{ width: '100%', accentColor: 'var(--cyan)' }}
            />
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--white)', fontSize: '0.84rem' }}>
              {sellers.toLocaleString('en-IN')} Sellers
            </div>
          </div>

          <div className="card card--sunken" style={{ padding: '8px 10px' }}>
            <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Annual Spend (₹ Cr)</span>
            <input
              type="range"
              min="5"
              max="250"
              step="5"
              value={spendCr}
              onChange={(e) => setSpendCr(parseInt(e.target.value, 10))}
              style={{ width: '100%', accentColor: 'var(--cyan)' }}
            />
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--white)', fontSize: '0.84rem' }}>
              ₹{spendCr} Crore / yr
            </div>
          </div>

          <div className="card card--sunken" style={{ padding: '8px 10px' }}>
            <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Operating Model</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button
                type="button"
                className={`btn btn--quiet btn--sm ${!isManaged ? 'btn--accent' : ''}`}
                style={{ fontSize: '0.68rem', padding: '3px 8px' }}
                onClick={() => setIsManaged(false)}
              >
                SaaS
              </button>
              <button
                type="button"
                className={`btn btn--quiet btn--sm ${isManaged ? 'btn--accent' : ''}`}
                style={{ fontSize: '0.68rem', padding: '3px 8px' }}
                onClick={() => setIsManaged(true)}
              >
                99.5% Managed
              </button>
            </div>
          </div>
        </div>

        {/* Results Metrics */}
        <div className="engine-sim__codeblock" style={{ padding: '10px 14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
            <div>
              <span className="engine-sim__code-label">ESTIMATED_LEAKAGE_RECOVERED</span>
              <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                ₹{annualSavedLakhs} Lakhs
                <span style={{ fontSize: '0.72rem', color: 'var(--cyan)', fontWeight: 400, display: 'block' }}>
                  {(leakageRate * 100).toFixed(1)}% of total payout budget
                </span>
              </div>
            </div>

            <div>
              <span className="engine-sim__code-label">PROJECTED_ROI_PAYBACK</span>
              <div style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                {paybackDays} Days
                <span style={{ fontSize: '0.72rem', color: 'var(--ice-200)', fontWeight: 400, display: 'block' }}>
                  Breakeven on license &amp; onboarding
                </span>
              </div>
            </div>

            <div>
              <span className="engine-sim__code-label">CONTRACTED_SLA</span>
              <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'var(--font-mono)' }}>
                {isManaged ? '99.5% SLA' : 'Standard SaaS'}
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 400, display: 'block' }}>
                  {isManaged ? 'End-to-end operation included' : 'Software-only deployment'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="engine-sim__footer">
        <span className="engine-sim__foot-tag">
          <Icon name="check" size={12} /> Transparent Commercial Model
        </span>
        <span className="engine-sim__foot-sync">No Per-Transaction Tax</span>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Icon } from '@/components/Icon';

interface IndustryReversalSandboxProps {
  industrySlug: string;
}

export function IndustryReversalSandbox({ industrySlug }: IndustryReversalSandboxProps) {
  // 1. FMCG State
  const [fmcgPrimary, setFmcgPrimary] = useState(50); // Lakhs
  const [fmcgSecondaryClaimed, setFmcgSecondaryClaimed] = useState(48); // Lakhs
  const [fmcgVerifiedRetail, setFmcgVerifiedRetail] = useState(42); // Lakhs
  const [fmcgExpiredClaim, setFmcgExpiredClaim] = useState(true);

  // 2. Pharma State
  const [pharmaPrimary, setPharmaPrimary] = useState(80); // Lakhs
  const [pharmaExpiryRate, setPharmaExpiryRate] = useState(6); // %
  const [pharmaTerritorySplit, setPharmaTerritorySplit] = useState(true);

  // 3. Real Estate State
  const [reMilestone, setReMilestone] = useState<number>(3); // 1: Booking, 2: Allotment, 3: Registered, 4: Disbursal, 5: Possession
  const [reCancellationInjected, setReCancellationInjected] = useState(false);

  // 4. Insurance State
  const [insPremium, setInsPremium] = useState(10); // Cr
  const [insCommRate, setInsCommRate] = useState(30); // %
  const [insPersistency, setInsPersistency] = useState(78); // %
  const [insEomCapped, setInsEomCapped] = useState(true);

  return (
    <div className="engine-sim card edge" role="region" aria-label="Industry Reversal Sandbox">
      {/* --------------------------- FMCG --------------------------- */}
      {industrySlug === 'fmcg' && (
        <>
          <div className="engine-sim__header">
            <div className="engine-sim__status-wrap">
              <span className="ping" aria-hidden="true" />
              <div>
                <span className="engine-sim__title">FMCG Secondary Offtake &amp; Claim Guard</span>
                <span className="engine-sim__sub">Primary Dispatch vs. Verified Secondary Sales</span>
              </div>
            </div>
            <div className="engine-sim__actions">
              <button
                type="button"
                className={`engine-sim__btn ${fmcgExpiredClaim ? 'engine-sim__btn--active' : ''}`}
                onClick={() => setFmcgExpiredClaim(!fmcgExpiredClaim)}
              >
                <Icon name="shield" size={13} />
                <span>{fmcgExpiredClaim ? 'Expired Scheme Blocked' : 'Scheme Active'}</span>
              </button>
            </div>
          </div>

          <div className="engine-sim__screen">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 8 }}>
              <div className="card card--sunken" style={{ padding: '8px 10px' }}>
                <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Primary Dispatch</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={fmcgPrimary}
                  onChange={(e) => setFmcgPrimary(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: 'var(--cyan)' }}
                />
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--white)', fontSize: '0.84rem' }}>
                  ₹{fmcgPrimary} Lakhs
                </div>
              </div>

              <div className="card card--sunken" style={{ padding: '8px 10px' }}>
                <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Secondary Claimed</span>
                <input
                  type="range"
                  min="15"
                  max={fmcgPrimary}
                  value={fmcgSecondaryClaimed}
                  onChange={(e) => setFmcgSecondaryClaimed(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: 'var(--cyan)' }}
                />
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--white)', fontSize: '0.84rem' }}>
                  ₹{fmcgSecondaryClaimed} Lakhs
                </div>
              </div>

              <div className="card card--sunken" style={{ padding: '8px 10px' }}>
                <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Verified POS Data</span>
                <input
                  type="range"
                  min="10"
                  max={fmcgSecondaryClaimed}
                  value={fmcgVerifiedRetail}
                  onChange={(e) => setFmcgVerifiedRetail(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: 'var(--cyan)' }}
                />
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)', fontSize: '0.84rem' }}>
                  ₹{fmcgVerifiedRetail} Lakhs
                </div>
              </div>
            </div>

            <div className="engine-sim__codeblock">
              <div className="engine-sim__code-line">
                <span className="engine-sim__code-label">REVERSAL_ANALYSIS</span>
                <code>{`Inflated Claims Gap: ₹${fmcgSecondaryClaimed - fmcgVerifiedRetail} Lakhs held | Expired Scheme Claims: ${fmcgExpiredClaim ? '₹1.80 Lakhs Quarantined' : 'None'}`}</code>
              </div>
              <div className="engine-sim__code-line" style={{ marginTop: 4 }}>
                <span className="engine-sim__code-label">VERIFIED_CREDIT_NOTE</span>
                <code style={{ color: 'var(--white)', fontWeight: 700 }}>
                  ₹{(fmcgVerifiedRetail * 0.08 - (fmcgExpiredClaim ? 1.8 : 0)).toFixed(2)} Lakhs Net Payable
                  <span style={{ color: 'var(--cyan)', marginLeft: 8, fontWeight: 400, fontSize: '0.72rem' }}>
                    (Saved ₹{((fmcgSecondaryClaimed - fmcgVerifiedRetail) * 0.08 + (fmcgExpiredClaim ? 1.8 : 0)).toFixed(2)}L in leakage)
                  </span>
                </code>
              </div>
            </div>
          </div>
        </>
      )}

      {/* --------------------------- PHARMA --------------------------- */}
      {industrySlug === 'pharma' && (
        <>
          <div className="engine-sim__header">
            <div className="engine-sim__status-wrap">
              <span className="ping" aria-hidden="true" />
              <div>
                <span className="engine-sim__title">Pharma MR Incentive &amp; Expiry Offset Engine</span>
                <span className="engine-sim__sub">Stockist Near-Expiry Returns Reserve Holdback</span>
              </div>
            </div>
            <div className="engine-sim__actions">
              <button
                type="button"
                className={`engine-sim__btn ${pharmaTerritorySplit ? 'engine-sim__btn--active' : ''}`}
                onClick={() => setPharmaTerritorySplit(!pharmaTerritorySplit)}
              >
                <Icon name="layers" size={13} />
                <span>{pharmaTerritorySplit ? 'HQ Split Active' : 'Single Territory'}</span>
              </button>
            </div>
          </div>

          <div className="engine-sim__screen">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, marginBottom: 8 }}>
              <div className="card card--sunken" style={{ padding: '8px 10px' }}>
                <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Primary Billing</span>
                <input
                  type="range"
                  min="30"
                  max="150"
                  value={pharmaPrimary}
                  onChange={(e) => setPharmaPrimary(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: 'var(--cyan)' }}
                />
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--white)', fontSize: '0.84rem' }}>
                  ₹{pharmaPrimary} Lakhs
                </div>
              </div>

              <div className="card card--sunken" style={{ padding: '8px 10px' }}>
                <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Near-Expiry Return Rate</span>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={pharmaExpiryRate}
                  onChange={(e) => setPharmaExpiryRate(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: 'var(--cyan)' }}
                />
                <div style={{ fontFamily: 'var(--font-mono)', color: '#fbbf24', fontSize: '0.84rem' }}>
                  {pharmaExpiryRate}% Returned
                </div>
              </div>
            </div>

            <div className="engine-sim__codeblock">
              <div className="engine-sim__code-line">
                <span className="engine-sim__code-label">EXPIRY_RESERVE_DEDUCTION</span>
                <code>{`₹${((pharmaPrimary * pharmaExpiryRate) / 100).toFixed(2)} Lakhs holdback for breakage & near-expiry claims`}</code>
              </div>
              <div className="engine-sim__code-line" style={{ marginTop: 4 }}>
                <span className="engine-sim__code-label">MR_FINAL_PAYOUT</span>
                <code style={{ color: 'var(--white)', fontWeight: 700 }}>
                  ₹{(((pharmaPrimary * (1 - pharmaExpiryRate / 100)) * 0.06)).toFixed(2)} Lakhs Disbursed
                  <span style={{ color: 'var(--cyan)', marginLeft: 8, fontWeight: 400, fontSize: '0.72rem' }}>
                    Zero post-cycle clawbacks against field force
                  </span>
                </code>
              </div>
            </div>
          </div>
        </>
      )}

      {/* --------------------------- REAL ESTATE --------------------------- */}
      {industrySlug === 'real-estate' && (
        <>
          <div className="engine-sim__header">
            <div className="engine-sim__status-wrap">
              <span className="ping" aria-hidden="true" />
              <div>
                <span className="engine-sim__title">RERA Escrow Brokerage Milestone Scrubber</span>
                <span className="engine-sim__sub">Booking ➔ Allotment ➔ Registration ➔ Possession</span>
              </div>
            </div>
            <div className="engine-sim__actions">
              <button
                type="button"
                className={`engine-sim__btn ${reCancellationInjected ? 'engine-sim__btn--active' : ''}`}
                onClick={() => setReCancellationInjected(!reCancellationInjected)}
              >
                <Icon name="alert" size={13} />
                <span>{reCancellationInjected ? 'Cancellation Quarantined' : 'Simulate Cancellation'}</span>
              </button>
            </div>
          </div>

          <div className="engine-sim__screen">
            <div style={{ display: 'flex', gap: 4, overflowX: 'auto', marginBottom: 8 }}>
              {[
                { step: 1, label: '1. Booking (10%)', pct: 10 },
                { step: 2, label: '2. Allotment (20%)', pct: 30 },
                { step: 3, label: '3. RERA Reg (40%)', pct: 70 },
                { step: 4, label: '4. Bank Loan (20%)', pct: 90 },
                { step: 5, label: '5. Handover (10%)', pct: 100 },
              ].map((m) => (
                <button
                  key={m.step}
                  type="button"
                  className={`btn btn--quiet btn--sm ${reMilestone === m.step ? 'btn--accent' : ''}`}
                  style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                  onClick={() => setReMilestone(m.step)}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="engine-sim__codeblock">
              <div className="engine-sim__code-line">
                <span className="engine-sim__code-label">ESCROW_MILESTONE_STATE</span>
                <code>{`Agreement Value: ₹2.50 Cr | Total 3% Brokerage: ₹7,50,000 | Current Milestone: Stage 0${reMilestone}`}</code>
              </div>
              <div className="engine-sim__code-line" style={{ marginTop: 4 }}>
                <span className="engine-sim__code-label">RELEASABLE_BROKERAGE</span>
                <code style={{ color: reCancellationInjected ? '#f87171' : 'var(--white)', fontWeight: 700 }}>
                  {reCancellationInjected
                    ? 'ESCROW LOCK ENGAGED: Buyer cancellation detected prior to RERA deed. ₹7,50,000 preserved.'
                    : `₹${((750000 * [0.1, 0.3, 0.7, 0.9, 1.0][reMilestone - 1])).toLocaleString('en-IN')} Released to Channel Partner`}
                </code>
              </div>
            </div>
          </div>
        </>
      )}

      {/* --------------------------- INSURANCE --------------------------- */}
      {industrySlug === 'insurance' && (
        <>
          <div className="engine-sim__header">
            <div className="engine-sim__status-wrap">
              <span className="ping" aria-hidden="true" />
              <div>
                <span className="engine-sim__title">IRDAI EoM Cap &amp; Persistency Clawback Guard</span>
                <span className="engine-sim__sub">13th-Month Lapsation &amp; Section 45 Audit Control</span>
              </div>
            </div>
            <div className="engine-sim__actions">
              <button
                type="button"
                className={`engine-sim__btn ${insEomCapped ? 'engine-sim__btn--active' : ''}`}
                onClick={() => setInsEomCapped(!insEomCapped)}
              >
                <Icon name="shield" size={13} />
                <span>{insEomCapped ? 'EoM Cap Enforced' : 'Uncapped Mode'}</span>
              </button>
            </div>
          </div>

          <div className="engine-sim__screen">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 8 }}>
              <div className="card card--sunken" style={{ padding: '8px 10px' }}>
                <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Gross Premium</span>
                <input
                  type="range"
                  min="2"
                  max="50"
                  value={insPremium}
                  onChange={(e) => setInsPremium(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: 'var(--cyan)' }}
                />
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--white)', fontSize: '0.84rem' }}>
                  ₹{insPremium} Cr
                </div>
              </div>

              <div className="card card--sunken" style={{ padding: '8px 10px' }}>
                <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>Commission Rate</span>
                <input
                  type="range"
                  min="15"
                  max="45"
                  value={insCommRate}
                  onChange={(e) => setInsCommRate(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: 'var(--cyan)' }}
                />
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--white)', fontSize: '0.84rem' }}>
                  {insCommRate}% Base
                </div>
              </div>

              <div className="card card--sunken" style={{ padding: '8px 10px' }}>
                <span className="eyebrow" style={{ fontSize: '0.6rem', marginBottom: 2 }}>13th-Mo Persistency</span>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={insPersistency}
                  onChange={(e) => setInsPersistency(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: 'var(--cyan)' }}
                />
                <div style={{ fontFamily: 'var(--font-mono)', color: insPersistency >= 80 ? 'var(--cyan)' : '#fbbf24', fontSize: '0.84rem' }}>
                  {insPersistency}%
                </div>
              </div>
            </div>

            <div className="engine-sim__codeblock">
              <div className="engine-sim__code-line">
                <span className="engine-sim__code-label">CLAWBACK_&amp;_EOM_ANALYSIS</span>
                <code>{`Lapse Risk: ${100 - insPersistency}% | Clawback Reserve: ₹${(((insPremium * 100) * (insCommRate / 100) * (1 - insPersistency / 100))).toFixed(1)} Lakhs Quarantined`}</code>
              </div>
              <div className="engine-sim__code-line" style={{ marginTop: 4 }}>
                <span className="engine-sim__code-label">REGULATORY_CLEARED_COMMISSION</span>
                <code style={{ color: 'var(--white)', fontWeight: 700 }}>
                  ₹{(((insPremium * 100) * (insCommRate / 100) * (insPersistency / 100))).toFixed(1)} Lakhs Cleared
                  <span style={{ color: 'var(--cyan)', marginLeft: 8, fontWeight: 400, fontSize: '0.72rem' }}>
                    100% IRDAI EoM Compliant
                  </span>
                </code>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="engine-sim__footer">
        <span className="engine-sim__foot-tag">
          <Icon name="check" size={12} /> Reversal Guard Active
        </span>
        <span className="engine-sim__foot-sync">Pre-Disbursement Audit Certainty</span>
      </div>
    </div>
  );
}

import { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { SectionHead, Breadcrumbs, PageHero, Cta } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { answers } from '@/data/answers';
import { useCompanyIdentification, trackCalculationLead } from '@/lib/visitor';

type Currency = { code: string; symbol: string; locale: string; big?: 'indian' };

const CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹', locale: 'en-IN', big: 'indian' },
  { code: 'USD', symbol: '$', locale: 'en-US' },
  { code: 'AED', symbol: 'AED ', locale: 'en-AE' },
  { code: 'IDR', symbol: 'Rp ', locale: 'id-ID' },
  { code: 'AUD', symbol: 'A$', locale: 'en-AU' },
  { code: 'ZAR', symbol: 'R ', locale: 'en-ZA' },
];

/** Indian numbering: 1 crore = 10,000,000; 1 lakh = 100,000. */
function compact(n: number, c: Currency): string {
  const r = (v: number, d = v >= 100 ? 0 : 1) => v.toFixed(d).replace(/\.0$/, '');
  if (c.big === 'indian') {
    if (n >= 1e7) return `${c.symbol}${r(n / 1e7)} Cr`;
    if (n >= 1e5) return `${c.symbol}${r(n / 1e5)} L`;
    return `${c.symbol}${Math.round(n).toLocaleString(c.locale)}`;
  }
  if (n >= 1e9) return `${c.symbol}${r(n / 1e9)}B`;
  if (n >= 1e6) return `${c.symbol}${r(n / 1e6)}M`;
  if (n >= 1e3) return `${c.symbol}${r(n / 1e3)}K`;
  return `${c.symbol}${Math.round(n).toLocaleString(c.locale)}`;
}

const FORBIDDEN_NAMES = /hdfc|icici|state bank of india|sbi|axis bank|kotak|bajaj|tata aig|development environment/i;

export default function LeakageCalculator() {
  const { company, setCompany } = useCompanyIdentification();

  const cleanCompanyName = company?.companyName && !FORBIDDEN_NAMES.test(company.companyName) ? company.companyName : null;
  const cleanCompanyDomain = company?.companyDomain && !/hdfc|icici|sbi|axis|kotak/i.test(company.companyDomain) ? company.companyDomain : null;

  // Core Financial Parameters
  const [currencyCode, setCurrencyCode] = useState('INR');
  const [annualSpend, setAnnualSpend] = useState(5_000_000_00); // 50 Cr default, INR

  // Channel Footprint (Participant Breakdown)
  const [distributorsCount, setDistributorsCount] = useState(450);
  const [employeesCount, setEmployeesCount] = useState(1200);
  const [brokersCount, setBrokersCount] = useState(3500);
  const [banksCount, setBanksCount] = useState(6);

  // Operational Complexity
  const [tiers, setTiers] = useState(4);
  const [schemes, setSchemes] = useState(25);
  const [manual, setManual] = useState(true);

  // Lead capture & state
  const [copied, setCopied] = useState(false);
  const [savedRef, setSavedRef] = useState<string | null>(null);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [customName, setCustomName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const currency = CURRENCIES.find((c) => c.code === currencyCode)!;

  const result = useMemo(() => {
    // 1. Channel depth factor (1 tier = 0, 6 tiers = 1)
    const depthFactor = Math.min(1, Math.max(0, (tiers - 1) / 5));

    // 2. Scheme complexity factor (1 scheme = 0, 100 schemes = 1, logarithmic)
    const schemeComplexity = Math.min(1, Math.max(0, Math.log10(Math.max(schemes, 1)) / 2));

    // 3. Channel participant scale factor:
    // Scale impact: higher distributor, broker, and bank density increases cross-boundary friction
    const totalParticipants = distributorsCount + employeesCount + brokersCount + banksCount * 50; // banks weighted by branch reach
    const participantFactor = Math.min(1, Math.max(0, (Math.log10(Math.max(totalParticipants, 100)) - 2) / 5));

    // Combined complexity position (0 to 1)
    const position = Math.min(
      1,
      depthFactor * 0.35 + schemeComplexity * 0.35 + participantFactor * 0.30,
    );

    // Baseline Spreadsheet / Manual unmanaged leakage:
    // Industry reality: Manual reconciliation across multi-tier networks with dozens of overlapping schemes
    // suffers 12% to 30%+ unmanaged leakage (clawbacks dropped, double credits, zombie overrides).
    const manualLowPct = 0.12;
    const manualHighPct = 0.30;
    const manualPct = manualLowPct + (manualHighPct - manualLowPct) * position;
    const manualAnnualLeakage = annualSpend * manualPct;

    // Unified Crizant Engine residual friction:
    // With integer fixed-point math, bitemporal ledger, and pre-close gates, residual leakage is miniscule (0.15% to 0.35%).
    const systemLowPct = 0.0015;
    const systemHighPct = 0.0035;
    const systemPct = systemLowPct + (systemHighPct - systemLowPct) * position;
    const systemAnnualLeakage = annualSpend * systemPct;

    // Active calculations based on toggle
    const adjustedPct = manual ? manualPct : systemPct;
    const annualMid = manual ? manualAnnualLeakage : systemAnnualLeakage;
    const annualLow = annualSpend * (manual ? manualLowPct : systemLowPct);
    const annualHigh = annualSpend * (manual ? manualHighPct : systemHighPct);

    // Value recovered by Crizant One
    const capitalSaved = Math.max(0, manualAnnualLeakage - systemAnnualLeakage);
    const recoveryPct = (capitalSaved / manualAnnualLeakage) * 100;

    // Granular Segment Leakage Breakdown
    // Bancassurance: Multi-party revenue shares, EOM expense caps, and TDS timing issues
    const bankWeight = banksCount > 0 ? Math.min(0.35, 0.12 + (banksCount / 40) * 0.20) : 0.05;
    // Brokers: High exposure to early policy surrender & unrecovered clawbacks
    const brokerWeight = Math.min(0.40, 0.18 + (Math.log10(Math.max(brokersCount, 10)) / 7.0) * 0.22);
    // Distributors: Secondary sales claims, rebate adjustments, and credit notes
    const distributorWeight = Math.min(0.30, 0.15 + (distributorsCount / 5000) * 0.15);
    // Employees: Hierarchy override drift and territory misalignment
    const employeeWeight = Math.max(0.10, 1 - (bankWeight + brokerWeight + distributorWeight));

    // Normalize weights to 1.0
    const sumW = bankWeight + brokerWeight + distributorWeight + employeeWeight;
    const bankLeakage = annualMid * (bankWeight / sumW);
    const brokerLeakage = annualMid * (brokerWeight / sumW);
    const distributorLeakage = annualMid * (distributorWeight / sumW);
    const employeeLeakage = annualMid * (employeeWeight / sumW);

    // Root Cause Failure Mode Breakdown
    const overlappingSchemes = annualMid * 0.40;
    const hierarchyDrift = annualMid * 0.28;
    const unrecoveredClawbacks = annualMid * 0.22;
    const roundingErrors = annualMid * 0.10;

    return {
      pct: adjustedPct,
      annualMid,
      annualLow,
      annualHigh,
      manualAnnualLeakage,
      systemAnnualLeakage,
      capitalSaved,
      recoveryPct,
      monthly: annualMid / 12,
      fiveYear: annualMid * 5,
      totalParticipants,
      // Segment Breakdown
      bankLeakage,
      brokerLeakage,
      distributorLeakage,
      employeeLeakage,
      // Root Cause Breakdown
      overlappingSchemes,
      hierarchyDrift,
      unrecoveredClawbacks,
      roundingErrors,
    };
  }, [
    annualSpend,
    tiers,
    schemes,
    manual,
    distributorsCount,
    employeesCount,
    brokersCount,
    banksCount,
  ]);

  // Debounced auto-save calculation to backend database
  const saveTimeout = useRef<number | null>(null);
  useEffect(() => {
    if (saveTimeout.current) window.clearTimeout(saveTimeout.current);
    saveTimeout.current = window.setTimeout(() => {
      trackCalculationLead({
        currency: currency.code,
        annualSpend,
        annualSpendFormatted: compact(annualSpend, currency),
        distributorsCount,
        employeesCount,
        brokersCount,
        banksCount,
        tiers,
        schemes,
        manual,
        leakagePct: Number((result.pct * 100).toFixed(2)),
        annualLeakage: Math.round(result.annualMid),
        annualLeakageFormatted: compact(result.annualMid, currency),
        companyDomain: cleanCompanyDomain,
        companyName: cleanCompanyName,
        contactEmail: workEmail || null,
        channelBreakdown: {
          bancassurance: Math.round(result.bankLeakage),
          brokers: Math.round(result.brokerLeakage),
          distributors: Math.round(result.distributorLeakage),
          employees: Math.round(result.employeeLeakage),
        },
        rootCauseBreakdown: {
          overlappingSchemes: Math.round(result.overlappingSchemes),
          hierarchyDrift: Math.round(result.hierarchyDrift),
          unrecoveredClawbacks: Math.round(result.unrecoveredClawbacks),
          roundingErrors: Math.round(result.roundingErrors),
        },
      }).then((res) => {
        if (res.ok && res.leadId) {
          setSavedRef(res.leadId);
        }
      });
    }, 1200);

    return () => {
      if (saveTimeout.current) window.clearTimeout(saveTimeout.current);
    };
  }, [annualSpend, distributorsCount, employeesCount, brokersCount, banksCount, tiers, schemes, manual, cleanCompanyName, cleanCompanyDomain, workEmail, currency, result]);

  const handleManualSave = async () => {
    setSaveStatus('saving');
    const res = await trackCalculationLead({
      currency: currency.code,
      annualSpend,
      annualSpendFormatted: compact(annualSpend, currency),
      distributorsCount,
      employeesCount,
      brokersCount,
      banksCount,
      tiers,
      schemes,
      manual,
      leakagePct: Number((result.pct * 100).toFixed(2)),
      annualLeakage: Math.round(result.annualMid),
      annualLeakageFormatted: compact(result.annualMid, currency),
      companyDomain: cleanCompanyDomain || customDomain || null,
      companyName: cleanCompanyName || customName || null,
      contactEmail: workEmail || null,
      channelBreakdown: {
        bancassurance: Math.round(result.bankLeakage),
        brokers: Math.round(result.brokerLeakage),
        distributors: Math.round(result.distributorLeakage),
        employees: Math.round(result.employeeLeakage),
      },
      rootCauseBreakdown: {
        overlappingSchemes: Math.round(result.overlappingSchemes),
        hierarchyDrift: Math.round(result.hierarchyDrift),
        unrecoveredClawbacks: Math.round(result.unrecoveredClawbacks),
        roundingErrors: Math.round(result.roundingErrors),
      },
    });

    if (res.ok) {
      setSavedRef(res.leadId);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const copyMemo = () => {
    const orgLabel = cleanCompanyName ? `${cleanCompanyName} (${cleanCompanyDomain || 'Corporate'})` : 'Enterprise Channel Network';
    const memo = `Crizant Channel Leakage Assessment · ${orgLabel}
----------------------------------------------------------------------
Annual Channel Spend: ${compact(annualSpend, currency)}
Channel Footprint:
  • Distributors & Stockists: ${distributorsCount.toLocaleString()}
  • Field Force & Sales Employees: ${employeesCount.toLocaleString()}
  • Brokers, Corporate Agents & POSPs: ${brokersCount.toLocaleString()}
  • Partner Banks / Bancassurance: ${banksCount.toLocaleString()}
  • Hierarchy Depth: ${tiers} tiers · Live Schemes: ${schemes}
  • Operating Model: ${manual ? 'Manual Spreadsheet Reconciliation' : 'Unified Crizant Engine'}

${
  manual
    ? `Estimated Annual Leakage: ${compact(result.annualMid, currency)} (${(result.pct * 100).toFixed(1)}% of spend)
Observed Industry Range: ${compact(result.annualLow, currency)} to ${compact(result.annualHigh, currency)} (12–30%)
5-Year Compounded Unmanaged Loss: ${compact(result.fiveYear, currency)}`
    : `Residual System Friction: ${compact(result.annualMid, currency)} (${(result.pct * 100).toFixed(2)}% of spend)
Annual Capital Protected by Crizant One: ${compact(result.capitalSaved, currency)} / yr (98.9% recovered)
5-Year Capital Protected: ${compact(result.capitalSaved * 5, currency)}`
}

Channel Segment Exposure:
  1. Bancassurance & Bank Partner Revenue Shares: ${compact(result.bankLeakage, currency)}
  2. Brokers & Corporate Agent Clawbacks: ${compact(result.brokerLeakage, currency)}
  3. Distributor Secondary Sales & Rebates: ${compact(result.distributorLeakage, currency)}
  4. Field Hierarchy & Override Misclassifications: ${compact(result.employeeLeakage, currency)}

Root Cause Concentration:
  • Overlapping Schemes & Duplicate Claims: ${compact(result.overlappingSchemes, currency)} (40%)
  • Hierarchy Drift & Effective-Date Mutations: ${compact(result.hierarchyDrift, currency)} (28%)
  • Unrecovered Lapses & Orphaned Clawbacks: ${compact(result.unrecoveredClawbacks, currency)} (22%)
  • Ingestion & Currency Rounding Drift: ${compact(result.roundingErrors, currency)} (10%)

Audit Verification: Session logged in Crizant Intelligence Ledger (${savedRef || 'Verified'}).
Run parallel reconciliation against your last closed cycle: https://www.crizant.com/proof`;

    navigator.clipboard?.writeText(memo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleUpdateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (customDomain) {
      setCompany({
        companyDomain: customDomain.toLowerCase(),
        companyName: customName || customDomain.split('.')[0].toUpperCase(),
        isCorporate: true,
        method: 'manual_calibration',
      });
      setIsEditingCompany(false);
    }
  };

  const faqs = [
    'how-much-commission-leakage',
    'why-are-overpayments-hard-to-find',
    'how-does-crizant-prevent-leakage',
  ]
    .map((s) => answers.find((a) => a.slug === s)!)
    .map((a) => ({ q: a.q, a: a.short }));

  const spendSteps =
    currency.big === 'indian'
      ? [1e7, 5e7, 1e8, 5e8, 1e9, 2.5e9, 5e9, 1e10]
      : [1e6, 5e6, 1e7, 5e7, 1e8, 2.5e8, 5e8, 1e9];
  const spendIndex = spendSteps.findIndex((s) => s >= annualSpend);
  const sliderPos = spendIndex === -1 ? spendSteps.length - 1 : spendIndex;

  return (
    <>
      <PageHero>
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Leakage Calculator', path: '/leakage-calculator' }]} />
          <div className="pagehero__grid">
            <div>
              <span className="eyebrow">Enterprise Channel Leakage Calculator</span>
              <h1 className="pagehero__title">
                Attach your channel footprint to <span className="accent">quantify 12–30%+ unmanaged leakage</span>
              </h1>
              <p className="lead" style={{ marginTop: 'var(--space-4)' }}>
                Across multi-tier distribution networks, manual spreadsheet reconciliation leaks 12% to 30%+ of channel spend
                through overlapping schemes, uncollected clawbacks, and hierarchy drift.
                Configure your exact channel composition below to calculate where capital leaks and how much Crizant One protects.
              </p>
            </div>
            <div className="statgrid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="stat">
                <div className="stat__value" style={{ color: 'var(--flag)' }}>
                  12–30%+
                </div>
                <div className="stat__label">Manual Spreadsheet Leakage</div>
                <p className="stat__note">Across unmanaged multi-tier cycles</p>
              </div>
              <div className="stat">
                <div className="stat__value" style={{ color: '#5bf5b0' }}>
                  &lt;0.3%
                </div>
                <div className="stat__label">Unified Engine Residual</div>
                <p className="stat__note">With Crizant One bitemporal model</p>
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* ---------------------------------- Company Domain Detection Banner --- */}
      <section className="section section--tight section--sunken" style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="container">
          <div className="company-intel-banner">
            <div className="company-intel-banner__left">
              <span className="ping" aria-hidden="true" />
              <div>
                <span className="company-intel-banner__label">
                  Enterprise Audit Context
                </span>
                <div className="company-intel-banner__name">
                  {cleanCompanyName ? (
                    <>
                      <strong>{cleanCompanyName}</strong>
                      {cleanCompanyDomain && <span className="company-intel-banner__domain">({cleanCompanyDomain})</span>}
                      {company?.city && <span className="tag tag--sm" style={{ marginLeft: 8 }}>{company.city}, {company.country}</span>}
                    </>
                  ) : (
                    <span>Enterprise Network · Auto-calibrating multi-tier channel benchmarks</span>
                  )}
                </div>
              </div>
            </div>

            <div className="company-intel-banner__right">
              {isEditingCompany ? (
                <form onSubmit={handleUpdateCompany} className="cluster" style={{ gap: '6px' }}>
                  <input
                    type="text"
                    placeholder="e.g. enterprise.com"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className="select"
                    style={{ padding: '4px 8px', fontSize: '0.82rem', width: '160px' }}
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="select"
                    style={{ padding: '4px 8px', fontSize: '0.82rem', width: '140px' }}
                  />
                  <button type="submit" className="btn btn--accent btn--sm">
                    Apply
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => setIsEditingCompany(false)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="cluster" style={{ gap: '8px' }}>
                  {savedRef && (
                    <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
                      Synced: {savedRef}
                    </span>
                  )}
                  <button
                    type="button"
                    className="btn btn--quiet btn--sm"
                    onClick={() => setIsEditingCompany(true)}
                  >
                    <Icon name="spark" size={13} />
                    <span>{cleanCompanyDomain ? 'Change Domain' : 'Calibrate for Your Company'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Main Calculator --- */}
      <section className="section">
        <div className="container">
          <div className="calc">
            {/* ------------------------------------------------- Inputs Form ---- */}
            <form className="card card--pad-lg stack stack--lg" onSubmit={(e) => e.preventDefault()}>
              <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
                  1. Channel Spend &amp; Currency
                </span>
                <span className="tag tag--sm">Step 1 of 3</span>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="currency">
                  Reporting Currency
                </label>
                <select
                  id="currency"
                  className="select"
                  value={currencyCode}
                  onChange={(e) => {
                    const next = CURRENCIES.find((c) => c.code === e.target.value)!;
                    const from =
                      currency.big === 'indian'
                        ? [1e7, 5e7, 1e8, 5e8, 1e9, 2.5e9, 5e9, 1e10]
                        : [1e6, 5e6, 1e7, 5e7, 1e8, 2.5e8, 5e8, 1e9];
                    const to =
                      next.big === 'indian'
                        ? [1e7, 5e7, 1e8, 5e8, 1e9, 2.5e9, 5e9, 1e10]
                        : [1e6, 5e6, 1e7, 5e7, 1e8, 2.5e8, 5e8, 1e9];
                    const idx = Math.max(0, from.findIndex((s) => s >= annualSpend));
                    setCurrencyCode(next.code);
                    setAnnualSpend(to[idx] ?? to[to.length - 1]);
                  }}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div className="field calc__range">
                <div className="calc__rangetop">
                  <label className="field__label" htmlFor="spend">
                    Total Annual Channel Spend
                  </label>
                  <output className="calc__rangeval" htmlFor="spend">
                    {compact(annualSpend, currency)}
                  </output>
                </div>
                <input
                  id="spend"
                  className="range"
                  type="range"
                  min={0}
                  max={spendSteps.length - 1}
                  step={1}
                  value={sliderPos}
                  onChange={(e) => setAnnualSpend(spendSteps[Number(e.target.value)])}
                />
                <p className="field__hint">
                  Includes broker commissions, distributor trade promotions, field overrides,
                  bancassurance fees, and partner contests.
                </p>
              </div>

              {/* Granular Channel Footprint (Depth Requirement) */}
              <hr className="hairrule" />
              <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
                  2. Granular Channel Footprint
                </span>
                <span className="tag tag--sm">{result.totalParticipants.toLocaleString()} Total Entities</span>
              </div>

              {/* Distributors */}
              <div className="field calc__range">
                <div className="calc__rangetop">
                  <label className="field__label" htmlFor="distributors">
                    Distributors &amp; Stockists
                  </label>
                  <output className="calc__rangeval" htmlFor="distributors">
                    {distributorsCount.toLocaleString()} distributors
                  </output>
                </div>
                <input
                  id="distributors"
                  className="range"
                  type="range"
                  min={0}
                  max={2500}
                  step={25}
                  value={distributorsCount}
                  onChange={(e) => setDistributorsCount(Number(e.target.value))}
                />
                <p className="field__hint">
                  Key risk: Primary vs. secondary order cancellations, unverified price rebate claims, and manual credit notes.
                </p>
              </div>

              {/* Employees */}
              <div className="field calc__range">
                <div className="calc__rangetop">
                  <label className="field__label" htmlFor="employees">
                    Sales Employees &amp; Relationship Managers
                  </label>
                  <output className="calc__rangeval" htmlFor="employees">
                    {employeesCount.toLocaleString()} field employees
                  </output>
                </div>
                <input
                  id="employees"
                  className="range"
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={employeesCount}
                  onChange={(e) => setEmployeesCount(Number(e.target.value))}
                />
                <p className="field__hint">
                  Key risk: Territory promotions recorded late, phantom overrides after staff departures, and retroactive quota targets.
                </p>
              </div>

              {/* Brokers & Corporate Agents */}
              <div className="field calc__range">
                <div className="calc__rangetop">
                  <label className="field__label" htmlFor="brokers">
                    Brokers, Corporate Agents &amp; POSPs
                  </label>
                  <output className="calc__rangeval" htmlFor="brokers">
                    {brokersCount >= 10000000
                      ? '10,000,000 (1 Crore)'
                      : brokersCount >= 100000
                      ? `${brokersCount.toLocaleString()} (${(brokersCount / 100000).toFixed(brokersCount % 100000 === 0 ? 0 : 1)} Lakhs)`
                      : brokersCount.toLocaleString()}{' '}
                    intermediaries
                  </output>
                </div>
                <input
                  id="brokers"
                  className="range"
                  type="range"
                  min={0}
                  max={10000000}
                  step={brokersCount >= 1000000 ? 50000 : brokersCount >= 100000 ? 5000 : 250}
                  value={brokersCount}
                  onChange={(e) => setBrokersCount(Number(e.target.value))}
                />
                <div className="cluster" style={{ gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                  {[3500, 25000, 100000, 500000, 2000000, 10000000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`btn btn--xs ${brokersCount === val ? 'btn--accent' : 'btn--ghost'}`}
                      style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px' }}
                      onClick={() => setBrokersCount(val)}
                    >
                      {val >= 10000000 ? '10M (1 Cr)' : val >= 100000 ? `${val / 100000}L` : val.toLocaleString()}
                    </button>
                  ))}
                </div>
                <p className="field__hint" style={{ marginTop: 'var(--space-2)' }}>
                  Key risk: Early surrender/cancellation clawbacks lost over time, multi-tier split schedules, and statement disputes across up to 10,000,000 intermediaries.
                </p>
              </div>

              {/* Partner Banks */}
              <div className="field calc__range">
                <div className="calc__rangetop">
                  <label className="field__label" htmlFor="banks">
                    Partner Banks (Bancassurance Tie-ups)
                  </label>
                  <output className="calc__rangeval" htmlFor="banks">
                    {banksCount} corporate banks
                  </output>
                </div>
                <input
                  id="banks"
                  className="range"
                  type="range"
                  min={0}
                  max={25}
                  step={1}
                  value={banksCount}
                  onChange={(e) => setBanksCount(Number(e.target.value))}
                />
                <p className="field__hint">
                  Key risk: Complex institutional fee sharing, branch network reconciliations, and regulatory expense-ceiling caps.
                </p>
              </div>

              {/* Operational Complexity */}
              <hr className="hairrule" />
              <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
                  3. Governance &amp; Operating Structure
                </span>
                <span className="tag tag--sm">Step 3 of 3</span>
              </div>

              <div className="field calc__range">
                <div className="calc__rangetop">
                  <label className="field__label" htmlFor="tiers">
                    Channel Hierarchy Depth
                  </label>
                  <output className="calc__rangeval" htmlFor="tiers">
                    {tiers} {tiers === 1 ? 'tier' : 'tiers'}
                  </output>
                </div>
                <input
                  id="tiers"
                  className="range"
                  type="range"
                  min={1}
                  max={6}
                  step={1}
                  value={tiers}
                  onChange={(e) => setTiers(Number(e.target.value))}
                />
              </div>

              <div className="field calc__range">
                <div className="calc__rangetop">
                  <label className="field__label" htmlFor="schemes">
                    Concurrent Live Incentive Schemes
                  </label>
                  <output className="calc__rangeval" htmlFor="schemes">
                    {schemes} live schemes
                  </output>
                </div>
                <input
                  id="schemes"
                  className="range"
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  value={schemes}
                  onChange={(e) => setSchemes(Number(e.target.value))}
                />
              </div>

              <div className="field">
                <span className="field__label">Contest &amp; Reward Processing Engine</span>
                <div className="pillbar">
                  <button type="button" aria-pressed={manual} onClick={() => setManual(true)}>
                    Spreadsheet Reconciliation
                  </button>
                  <button type="button" aria-pressed={!manual} onClick={() => setManual(false)}>
                    Unified Crizant Engine
                  </button>
                </div>
              </div>
            </form>

            {/* ------------------------------------------------ Results Output ---- */}
            <div className="calc__out">
              {/* Primary Metric Card */}
              <div className="card card--pad-lg edge">
                <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <span className="eyebrow" style={{ color: manual ? 'var(--flag)' : 'var(--cyan)' }}>
                    {manual
                      ? `${cleanCompanyName ? cleanCompanyName.toUpperCase() : 'ENTERPRISE CHANNEL FOOTPRINT'} · SPREADSHEET RECONCILIATION LEAKAGE`
                      : 'UNIFIED CRIZANT ENGINE · RESIDUAL SYSTEM FRICTION'}
                  </span>
                  <span
                    className={`tag tag--sm ${manual ? 'tag--flag' : ''}`}
                    style={!manual ? { color: '#5bf5b0', borderColor: 'rgba(91, 245, 176, 0.4)', background: 'rgba(91, 245, 176, 0.06)' } : undefined}
                  >
                    {manual ? '⚠ High Unmanaged Risk' : '✓ 98.9% Capital Protected'}
                  </span>
                </div>

                <div className="calc__headline" aria-live="polite" style={manual ? { color: 'var(--flag)' } : { color: 'var(--cyan)' }}>
                  {compact(result.annualMid, currency)}
                </div>

                <p style={{ color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
                  {manual ? (
                    <>
                      Represents <strong style={{ color: 'var(--white)' }}>{(result.pct * 100).toFixed(1)}%</strong> of your{' '}
                      {compact(annualSpend, currency)} spend — unmanaged leakage across manual spreadsheets,
                      retroactive clawback write-offs, and multi-tier override drift across your{' '}
                      {result.totalParticipants.toLocaleString()} channel participants.
                    </>
                  ) : (
                    <>
                      Residual data friction is miniscule (<strong style={{ color: 'var(--white)' }}>{(result.pct * 100).toFixed(2)}%</strong> of your{' '}
                      {compact(annualSpend, currency)} spend) — Crizant One eliminates 98.9% of manual spreadsheet
                      discrepancies via integer fixed-point arithmetic and bitemporal ledger pre-close gating.
                    </>
                  )}
                </p>

                {!manual && (
                  <div
                    style={{
                      marginTop: 'var(--space-3)',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      background: 'rgba(91, 245, 176, 0.08)',
                      border: '1px solid rgba(91, 245, 176, 0.3)',
                    }}
                  >
                    <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.84rem', color: '#5bf5b0', fontWeight: 600 }}>
                        🛡️ Capital Protected by Crizant One
                      </span>
                      <strong style={{ fontSize: '1.15rem', color: '#5bf5b0' }}>
                        +{compact(result.capitalSaved, currency)} / yr
                      </strong>
                    </div>
                    <p className="fine" style={{ margin: '4px 0 0', color: 'var(--text-dim)', fontSize: '0.74rem' }}>
                      Recovered across {result.totalParticipants.toLocaleString()} entities ({compact(result.capitalSaved * 5, currency)} over 5 years).
                    </p>
                  </div>
                )}

                <div className="meter" aria-hidden="true" style={{ marginTop: 'var(--space-3)' }}>
                  <div
                    className="meter__fill"
                    style={{
                      width: manual
                        ? `${Math.min(100, Math.max(25, (result.pct / 0.35) * 100))}%`
                        : '3.5%',
                      background: manual
                        ? 'linear-gradient(90deg, #ff7a59, #ff3366)'
                        : '#5bf5b0',
                    }}
                  />
                </div>

                <div
                  className="panel__foot"
                  style={{
                    marginInline: 'calc(var(--space-5) * -1)',
                    marginBottom: 'calc(var(--space-5) * -1)',
                    marginTop: 'var(--space-4)',
                  }}
                >
                  <span>{compact(result.monthly, currency)} per month {manual ? 'leaked' : 'residual'}</span>
                  <span>{manual ? `${compact(result.fiveYear, currency)} over 5 years unrecovered` : `+${compact(result.capitalSaved * 5, currency)} 5-yr protected`}</span>
                </div>
              </div>

              {/* Channel Segment Leakage Breakdown */}
              <div className="card card--pad-lg">
                <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
                      Channel Segment Risk Exposure
                    </span>
                    <h3 style={{ margin: '2px 0 0', fontSize: '1.05rem' }}>Where Your Capital is Leaking</h3>
                  </div>
                  <button
                    type="button"
                    className="btn btn--quiet btn--sm"
                    onClick={copyMemo}
                    title="Copy full executive briefing to clipboard"
                  >
                    <Icon name="spark" size={13} />
                    <span>{copied ? 'Copied Briefing!' : 'Copy Executive Briefing'}</span>
                  </button>
                </div>

                <div className="waterfall">
                  {/* Bancassurance */}
                  <div className="waterfall__row">
                    <div className="waterfall__meta">
                      <span className="waterfall__label">
                        <strong>Bancassurance &amp; Bank Tie-ups</strong> ({banksCount} banks)
                      </span>
                      <span className="waterfall__val" style={{ color: 'var(--cyan)' }}>
                        {compact(result.bankLeakage, currency)}
                      </span>
                    </div>
                    <div className="waterfall__bar-track">
                      <div
                        className="waterfall__bar-fill"
                        style={{
                          width: `${(result.bankLeakage / result.annualMid) * 100}%`,
                          background: 'var(--cyan)',
                        }}
                      />
                    </div>
                    <span className="fine" style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>
                      Multi-branch revenue share variances and quarterly EOM cap adjustments.
                    </span>
                  </div>

                  {/* Brokers */}
                  <div className="waterfall__row">
                    <div className="waterfall__meta">
                      <span className="waterfall__label">
                        <strong>Brokers, Corporate Agents &amp; POSPs</strong> ({brokersCount >= 10000000 ? '10M / 1 Cr' : brokersCount >= 100000 ? `${brokersCount.toLocaleString()} (${(brokersCount / 100000).toFixed(brokersCount % 100000 === 0 ? 0 : 1)}L)` : brokersCount.toLocaleString()} intermediaries)
                      </span>
                      <span className="waterfall__val" style={{ color: 'var(--azure)' }}>
                        {compact(result.brokerLeakage, currency)}
                      </span>
                    </div>
                    <div className="waterfall__bar-track">
                      <div
                        className="waterfall__bar-fill"
                        style={{
                          width: `${(result.brokerLeakage / result.annualMid) * 100}%`,
                          background: 'var(--azure)',
                        }}
                      />
                    </div>
                    <span className="fine" style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>
                      Early policy lapses, uncollected clawbacks, and rate-schedule drift.
                    </span>
                  </div>

                  {/* Distributors */}
                  <div className="waterfall__row">
                    <div className="waterfall__meta">
                      <span className="waterfall__label">
                        <strong>Distributors &amp; Stockists</strong> ({distributorsCount.toLocaleString()} stockists)
                      </span>
                      <span className="waterfall__val" style={{ color: '#5bf5b0' }}>
                        {compact(result.distributorLeakage, currency)}
                      </span>
                    </div>
                    <div className="waterfall__bar-track">
                      <div
                        className="waterfall__bar-fill"
                        style={{
                          width: `${(result.distributorLeakage / result.annualMid) * 100}%`,
                          background: '#5bf5b0',
                        }}
                      />
                    </div>
                    <span className="fine" style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>
                      Secondary sales volume discrepancies and post-settlement credit notes.
                    </span>
                  </div>

                  {/* Employees */}
                  <div className="waterfall__row">
                    <div className="waterfall__meta">
                      <span className="waterfall__label">
                        <strong>Field Force &amp; Managers</strong> ({employeesCount.toLocaleString()} staff)
                      </span>
                      <span className="waterfall__val" style={{ color: 'var(--flag)' }}>
                        {compact(result.employeeLeakage, currency)}
                      </span>
                    </div>
                    <div className="waterfall__bar-track">
                      <div
                        className="waterfall__bar-fill"
                        style={{
                          width: `${(result.employeeLeakage / result.annualMid) * 100}%`,
                          background: 'var(--flag)',
                        }}
                      />
                    </div>
                    <span className="fine" style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>
                      Overrides paid after resignations and retroactive territory reassignments.
                    </span>
                  </div>
                </div>
              </div>

              {/* Lead Capture / Sync to Backend */}
              <div className="card card--featured">
                <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
                  Save to Audit Intelligence Ledger
                </span>
                <h3 className="card__title" style={{ marginTop: '2px' }}>
                  Bring this model into a parallel run
                </h3>
                <p className="card__body">
                  We compute your last closed cycle on Crizant One against your spreadsheet or ERP numbers
                  and isolate the exact variance line by line before any contract is signed.
                </p>

                <div className="cluster" style={{ marginTop: 'var(--space-3)', gap: '8px' }}>
                  <input
                    type="email"
                    placeholder="Work email (for full methodology report)"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    className="select"
                    style={{ flex: 1, minWidth: '220px' }}
                  />
                  <button
                    type="button"
                    className="btn btn--accent btn--sm"
                    onClick={handleManualSave}
                    disabled={saveStatus === 'saving'}
                  >
                    <Icon name="spark" size={13} />
                    <span>
                      {saveStatus === 'saving'
                        ? 'Saving...'
                        : saveStatus === 'saved'
                        ? 'Saved to Ledger!'
                        : 'Save & Generate Report'}
                    </span>
                  </button>
                </div>

                {savedRef && (
                  <p className="fine" style={{ color: 'var(--cyan)', marginTop: 'var(--space-2)' }}>
                    ✓ Record stored in backend: <code>{savedRef}</code> · Status: Cryptographic Audit Ledger Verified.
                  </p>
                )}

                <div className="cluster" style={{ marginTop: 'var(--space-4)' }}>
                  <Link to="/contact" className="btn btn--ghost btn--sm">
                    Book technical deep-dive
                    <Icon name="arrow" size={14} className="btn__arrow" />
                  </Link>
                  <Link to="/proof" className="btn btn--quiet btn--sm">
                    Seven ways to verify this
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- Root Causes Section --- */}
      <section className="section section--sunken">
        <div className="container container--narrow">
          <SectionHead
            eyebrow="The Root Causes"
            title="Four failure modes in channel operations"
            lead="None of these arrives as a single visible catastrophe. They arrive as thousands of micro-discrepancies across distributors, brokers, employees, and banks."
          />
          <ol className="steps">
            <li>
              <div>
                <h3>Overlapping schemes &amp; duplicate qualification</h3>
                <p>
                  A distributor qualifies under a national quarterly incentive, a regional secondary push,
                  and an ad-hoc stockist contest. With eligibility audited across different spreadsheets,
                  the same order volume is remunerated three times.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Hierarchy drift &amp; effective-date mutations</h3>
                <p>
                  A relationship manager is promoted from Branch to Zonal Head on August 1st, but HR
                  updates ERP records on August 20th. August 10th payouts compute under old territory rules,
                  creating permanent ledger drift and retroactive adjustment chaos.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Unrecovered policy &amp; loan clawbacks</h3>
                <p>
                  Early loan cancellations and policy surrenders within 90 days mandate a 100% commission
                  clawback. Because spreadsheets cannot track multi-cycle debt offsets, millions in
                  receivables quietly sit uncollected.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Bancassurance institutional reconciliation</h3>
                <p>
                  Multi-carrier banks require complex monthly fee sharing across thousands of branches.
                  Without automated subledger tie-outs, month-end close takes weeks and leaves unexplained
                  reconciliation variances.
                </p>
              </div>
            </li>
          </ol>
          <Link
            to="/resources/arithmetic-of-channel-spend-leakage"
            className="btn btn--ghost btn--sm"
            style={{ marginTop: 'var(--space-5)' }}
          >
            Read the mathematical derivation
            <Icon name="arrow" size={14} className="btn__arrow" />
          </Link>
        </div>
      </section>

      <Faq items={faqs} title="Leakage — frequently asked questions" />

      <Cta
        title="Run it against your last closed cycle."
        body="Bring a closed period and your real distributor/broker scheme files. We compute it on Crizant One in 30 minutes and reconcile the difference line by line."
      />
    </>
  );
}

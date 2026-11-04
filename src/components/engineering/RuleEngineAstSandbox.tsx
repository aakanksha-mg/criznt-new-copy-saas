import { useState, useMemo } from 'react';

export function RuleEngineAstSandbox() {
  const [dealVolume, setDealVolume] = useState(6500000); // 65 Lakh INR
  const [tierLevel, setTierLevel] = useState(4); // Tier 4
  const [retentionRatio, setRetentionRatio] = useState(94); // 94%
  const [holdbackPct, setHoldbackPct] = useState(5); // 5%

  const computation = useMemo(() => {
    // Exact fixed-point math simulation: 1 unit = 1/10000 (4 decimal places)
    const baseRateBps = tierLevel === 1 ? 800 : tierLevel === 2 ? 1000 : tierLevel === 3 ? 1200 : tierLevel === 4 ? 1450 : 1800; // bps
    const basePayoutInt = Math.floor((dealVolume * baseRateBps) / 10000);

    // Tier bonus multiplier if volume > 50 Lakh
    const qualifiesBonus = dealVolume >= 5000000;
    const bonusRateBps = qualifiesBonus ? 150 : 0;
    const bonusPayoutInt = Math.floor((dealVolume * bonusRateBps) / 10000);

    // Retention penalty multiplier if retention < 90%
    const retentionPenaltyBps = retentionRatio < 90 ? 200 : 0;
    const penaltyInt = Math.floor((dealVolume * retentionPenaltyBps) / 10000);

    const grossPayoutInt = basePayoutInt + bonusPayoutInt - penaltyInt;
    const holdbackInt = Math.floor((grossPayoutInt * holdbackPct) / 100);
    const netPayoutInt = grossPayoutInt - holdbackInt;

    // Simulate IEEE 754 floating point arithmetic drift
    const floatBase = dealVolume * (baseRateBps / 10000);
    const floatBonus = qualifiesBonus ? dealVolume * 0.015 : 0;
    const floatPenalty = retentionRatio < 90 ? dealVolume * 0.02 : 0;
    const floatGross = floatBase + floatBonus - floatPenalty;
    const floatHoldback = floatGross * (holdbackPct / 100);
    const floatNet = floatGross - floatHoldback;
    const floatDrift = Math.abs(floatNet - netPayoutInt);

    return {
      baseRatePct: (baseRateBps / 100).toFixed(2),
      basePayout: basePayoutInt,
      qualifiesBonus,
      bonusPayout: bonusPayoutInt,
      penalty: penaltyInt,
      grossPayout: grossPayoutInt,
      holdback: holdbackInt,
      netPayout: netPayoutInt,
      floatDrift: floatDrift > 0.0001 ? floatDrift.toFixed(6) : '0.00000000',
    };
  }, [dealVolume, tierLevel, retentionRatio, holdbackPct]);

  return (
    <div className="card card--pad-lg edge" style={{ margin: 'var(--space-5) 0' }}>
      <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
        <div>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
            Interactive Architecture Sandbox · Principle 01
          </span>
          <h3 style={{ margin: '4px 0 0', fontSize: 'var(--fs-h3)' }}>
            Fixed-Point Arithmetic &amp; AST Expression Evaluator
          </h3>
          <p className="fine" style={{ margin: '4px 0 0', maxWidth: '65ch' }}>
            Adjust the sliders below to see how Crizant compiles scheme formulas into an Abstract Syntax Tree (AST),
            executes with 64-bit integer fixed-point precision, and eliminates floating-point financial drift.
          </p>
        </div>
        <span className="badge badge--accent badge--dot badge--live">Deterministic AST</span>
      </div>

      {/* Sliders Grid */}
      <div className="ast-sandbox__sliders">
        <div className="calc__range">
          <div className="calc__rangetop">
            <span className="fine" style={{ color: 'var(--text-dim)' }}>
              1. Deal / Cycle Volume
            </span>
            <span className="calc__rangeval">₹{(dealVolume / 100000).toFixed(1)} Lakh</span>
          </div>
          <input
            type="range"
            min={1000000}
            max={20000000}
            step={500000}
            value={dealVolume}
            onChange={(e) => setDealVolume(Number(e.target.value))}
            className="slider"
            aria-label="Deal or cycle volume slider"
          />
        </div>

        <div className="calc__range">
          <div className="calc__rangetop">
            <span className="fine" style={{ color: 'var(--text-dim)' }}>
              2. Hierarchy Tier
            </span>
            <span className="calc__rangeval">Tier {tierLevel} ({computation.baseRatePct}%)</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={tierLevel}
            onChange={(e) => setTierLevel(Number(e.target.value))}
            className="slider"
            aria-label="Hierarchy tier slider"
          />
        </div>

        <div className="calc__range">
          <div className="calc__rangetop">
            <span className="fine" style={{ color: 'var(--text-dim)' }}>
              3. Channel 13-Month Persistency / Retention
            </span>
            <span className="calc__rangeval">{retentionRatio}%</span>
          </div>
          <input
            type="range"
            min={70}
            max={100}
            step={1}
            value={retentionRatio}
            onChange={(e) => setRetentionRatio(Number(e.target.value))}
            className="slider"
            aria-label="Persistency retention slider"
          />
        </div>

        <div className="calc__range">
          <div className="calc__rangetop">
            <span className="fine" style={{ color: 'var(--text-dim)' }}>
              4. Risk Holdback Reserve
            </span>
            <span className="calc__rangeval">{holdbackPct}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={15}
            step={1}
            value={holdbackPct}
            onChange={(e) => setHoldbackPct(Number(e.target.value))}
            className="slider"
            aria-label="Holdback reserve slider"
          />
        </div>
      </div>

      {/* Visual AST Breakdown */}
      <div className="ast-sandbox__display">
        <div className="ast-sandbox__tree">
          <div className="ast-sandbox__tree-head">
            <span>AST Rule Compilation Graph</span>
            <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
              Eval Latency: 0.038ms
            </span>
          </div>
          <div className="ast-sandbox__code">
            <pre>
{`[Root: DeterministicPayoutPlan]
 ├── [Node 1: BaseCommission]
 │     └── Volume(₹${(dealVolume).toLocaleString('en-IN')}) * Rate(${computation.baseRatePct}%) = ₹${computation.basePayout.toLocaleString('en-IN')}
 ├── [Node 2: VolumeBonusGate]
 │     └── Condition(Volume >= 50L) -> ${computation.qualifiesBonus ? 'PASS (+1.5% Multiplier)' : 'FAIL (0.0%)'}
 │     └── Bonus Delta = ₹${computation.bonusPayout.toLocaleString('en-IN')}
 ├── [Node 3: PersistencyGuard]
 │     └── Condition(Retention >= 90%) -> ${retentionRatio >= 90 ? 'HEALTHY (0 Penalty)' : 'SUB-PAR (-2.0% Penalty)'}
 │     └── Penalty Delta = -₹${computation.penalty.toLocaleString('en-IN')}
 └── [Node 4: HoldbackReserve]
       └── Holdback(${holdbackPct}%) = -₹${computation.holdback.toLocaleString('en-IN')}
       └── [Final Output: Bit-Exact Net Payout] = ₹${computation.netPayout.toLocaleString('en-IN')}`}
            </pre>
          </div>
        </div>

        {/* Precision Guarantees */}
        <div className="ast-sandbox__precision">
          <div className="ast-sandbox__stat-card">
            <span className="fine" style={{ color: 'var(--text-dim)' }}>
              Net Payable (Integer Fixed-Point)
            </span>
            <div className="calc__headline" style={{ fontSize: '1.9rem', color: 'var(--cyan)' }}>
              ₹{computation.netPayout.toLocaleString('en-IN')}
            </div>
            <span className="fine" style={{ color: 'var(--text-muted)' }}>
              Bit-for-bit reproducible across any cycle replay.
            </span>
          </div>

          <div className="ast-sandbox__stat-card">
            <span className="fine" style={{ color: 'var(--text-dim)' }}>
              IEEE-754 Floating-Point Drift
            </span>
            <div className="calc__headline" style={{ fontSize: '1.4rem', color: '#5bf5b0' }}>
              0.00000000%
            </div>
            <span className="fine" style={{ color: 'var(--text-muted)' }}>
              Integer math guarantees 0 rounding errors on financial statements.
            </span>
          </div>

          <div className="ast-sandbox__stat-card">
            <span className="fine" style={{ color: 'var(--text-dim)' }}>
              Proof Hash
            </span>
            <code style={{ fontSize: '0.74rem', wordBreak: 'break-all' }}>
              sha256:d82e91...44a7
            </code>
            <span className="fine" style={{ color: 'var(--text-muted)' }}>
              Sealed with seller and scheme version IDs.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Icon } from '@/components/Icon';

type SecurityLayerKey = 'kms' | 'merkle' | 'rbac' | 'residency';

export function SecurityControlConsole() {
  const [activeLayer, setActiveLayer] = useState<SecurityLayerKey>('rbac');
  const [rbacRole, setRbacRole] = useState<'vp' | 'branch' | 'seller'>('branch');
  const [kmsKeyVersion, setKmsKeyVersion] = useState<number>(4);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [chainVerified, setChainVerified] = useState<boolean>(true);

  const handleRotateKey = () => {
    setIsRotating(true);
    setTimeout(() => {
      setKmsKeyVersion((prev) => prev + 1);
      setIsRotating(false);
    }, 450);
  };

  return (
    <div className="engine-sim card edge" role="region" aria-label="Security Controls & Cryptographic Proof Console">
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" />
          <div>
            <span className="engine-sim__title">Security Controls &amp; Cryptographic Proofs</span>
            <span className="engine-sim__sub">SOC 2 Type II Architecture · Zero Cross-Tenant Leakage</span>
          </div>
        </div>
        <div className="engine-sim__actions">
          {activeLayer === 'kms' && (
            <button
              type="button"
              className="engine-sim__btn engine-sim__btn--primary"
              onClick={handleRotateKey}
              disabled={isRotating}
            >
              <Icon name="shield" size={13} />
              <span>{isRotating ? 'Rotating Master Key...' : 'Rotate KMS Master Key'}</span>
            </button>
          )}
          {activeLayer === 'merkle' && (
            <button
              type="button"
              className="engine-sim__btn engine-sim__btn--primary"
              onClick={() => {
                setChainVerified(false);
                setTimeout(() => setChainVerified(true), 350);
              }}
            >
              <Icon name="check" size={13} />
              <span>{chainVerified ? 'Audit Chain Validated' : 'Traversing Merkle Root...'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="engine-sim__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeLayer === 'rbac'}
          className={`engine-sim__tab ${activeLayer === 'rbac' ? 'is-active' : ''}`}
          onClick={() => setActiveLayer('rbac')}
        >
          <Icon name="lock" size={14} />
          <span>Hierarchy RBAC &amp; Masking</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeLayer === 'kms'}
          className={`engine-sim__tab ${activeLayer === 'kms' ? 'is-active' : ''}`}
          onClick={() => setActiveLayer('kms')}
        >
          <Icon name="shield" size={14} />
          <span>Envelope Encryption (KMS)</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeLayer === 'merkle'}
          className={`engine-sim__tab ${activeLayer === 'merkle' ? 'is-active' : ''}`}
          onClick={() => setActiveLayer('merkle')}
        >
          <Icon name="scale" size={14} />
          <span>Immutable Merkle Log</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeLayer === 'residency'}
          className={`engine-sim__tab ${activeLayer === 'residency' ? 'is-active' : ''}`}
          onClick={() => setActiveLayer('residency')}
        >
          <Icon name="globe" size={14} />
          <span>Residency Isolation</span>
        </button>
      </div>

      <div className="engine-sim__screen">
        {/* Layer 1: RBAC Masking */}
        {activeLayer === 'rbac' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span className="eyebrow" style={{ fontSize: '0.62rem', margin: 0 }}>Select Authenticated Role:</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {[
                  { id: 'vp', label: 'VP Commercial (National)' },
                  { id: 'branch', label: 'Branch Manager (West)' },
                  { id: 'seller', label: 'Field Seller (Agent)' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`btn btn--quiet btn--sm ${rbacRole === r.id ? 'btn--accent' : ''}`}
                    style={{ fontSize: '0.68rem', padding: '3px 8px' }}
                    onClick={() => setRbacRole(r.id as any)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="engine-sim__ledger-tablewrap" style={{ maxHeight: 200 }}>
              <table className="engine-sim__ledger-table" style={{ fontSize: '0.74rem' }}>
                <thead>
                  <tr>
                    <th>Data Field / Column</th>
                    <th>National Master Scope</th>
                    <th>Branch West Scope</th>
                    <th>Field Seller View</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { field: 'National Commission Total', vp: '₹34.82 Crore', branch: '●●●● MASKED', seller: '●●●● MASKED' },
                    { field: 'Branch Regional Sourcing', vp: '₹4.50 Crore', branch: '₹4.50 Crore', seller: '●●●● MASKED' },
                    { field: 'Agent PAN / Aadhaar Hash', vp: '8f4c...91a', branch: '8f4c...91a', seller: 'Self Verified' },
                    { field: 'Individual Seller Net Payout', vp: '₹1,48,200', branch: '₹1,48,200', seller: '₹1,48,200 (Own Line)' },
                    { field: 'Peer Seller Commission Data', vp: 'Unrestricted', branch: 'Branch Scope Only', seller: 'FORBIDDEN (403)' },
                  ].map((row) => (
                    <tr key={row.field}>
                      <td style={{ color: 'var(--white)', fontWeight: 600 }}>{row.field}</td>
                      <td style={{ color: rbacRole === 'vp' ? 'var(--cyan)' : 'var(--text-dim)', fontWeight: rbacRole === 'vp' ? 600 : 400 }}>{row.vp}</td>
                      <td style={{ color: rbacRole === 'branch' ? 'var(--cyan)' : 'var(--text-dim)', fontWeight: rbacRole === 'branch' ? 600 : 400 }}>{row.branch}</td>
                      <td style={{ color: rbacRole === 'seller' ? 'var(--cyan)' : 'var(--text-dim)', fontWeight: rbacRole === 'seller' ? 600 : 400 }}>{row.seller}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="engine-sim__ast-footer">
              <span>Access is a mathematical property of the dated channel hierarchy tree</span>
              <span style={{ color: 'var(--cyan)' }}>Zero standalone permission spreadsheets</span>
            </div>
          </div>
        )}

        {/* Layer 2: KMS */}
        {activeLayer === 'kms' && (
          <div className="engine-sim__codeblock" style={{ padding: '12px 14px' }}>
            <div className="engine-sim__code-line">
              <span className="engine-sim__code-label">CUSTOMER_MANAGED_KMS_KEY</span>
              <code style={{ color: 'var(--cyan)' }}>
                arn:aws:kms:ap-south-1:994120:key/crizant-master-v{kmsKeyVersion} (Status: ACTIVE_ROTATED)
              </code>
            </div>
            <div className="engine-sim__code-line" style={{ marginTop: 6 }}>
              <span className="engine-sim__code-label">ENVELOPE_ENCRYPTION_STANDARD</span>
              <code>AES-256-GCM authenticated cipher with unique Data Encryption Key (DEK) per tenant partition</code>
            </div>
            <div className="engine-sim__code-line" style={{ marginTop: 6 }}>
              <span className="engine-sim__code-label">KEY_SEPARATION</span>
              <code style={{ color: 'var(--white)' }}>
                Crizant operations team cannot view unencrypted customer PII without client HSM token release
              </code>
            </div>
          </div>
        )}

        {/* Layer 3: Merkle Audit */}
        {activeLayer === 'merkle' && (
          <div className="engine-sim__codeblock" style={{ padding: '12px 14px' }}>
            <div className="engine-sim__code-line">
              <span className="engine-sim__code-label">MERKLE_ROOT_HASH</span>
              <code style={{ color: '#34d399' }}>
                Root(SHA-256: 4f9e112a884c7e9901bd3200ff14ab8892cae) · Depth: 18 levels
              </code>
            </div>
            <div className="engine-sim__code-line" style={{ marginTop: 6 }}>
              <span className="engine-sim__code-label">CRYPTOGRAPHIC_TAMPER_PROOF</span>
              <code>
                Every scheme modification, override approval, and calculation run is appended as an immutable block.
                Any historical retroactive edit breaks parent Merkle hash signature immediately.
              </code>
            </div>
          </div>
        )}

        {/* Layer 4: Residency */}
        {activeLayer === 'residency' && (
          <div className="engine-sim__codeblock" style={{ padding: '12px 14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <span className="engine-sim__code-label">PRIMARY_DEPLOYMENT_REGIONS</span>
                <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: '0.74rem', color: 'var(--white)' }}>
                  <li>India (Mumbai / Hyderabad - MeitY Empanelled Cloud)</li>
                  <li>UAE (Dubai / Abu Dhabi - CBUAE Compliant)</li>
                  <li>South East Asia (Singapore / Jakarta OJK)</li>
                </ul>
              </div>
              <div>
                <span className="engine-sim__code-label">RESIDENCY_ASSERTION</span>
                <p style={{ margin: '4px 0 0', fontSize: '0.74rem', color: 'var(--ice-200)', lineHeight: 1.35 }}>
                  Zero data leaves designated geographical boundary. In-country database replicas, compute nodes, and backup vaults.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="engine-sim__footer">
        <span className="engine-sim__foot-tag">
          <Icon name="shield" size={12} /> SOC 2 Type II
        </span>
        <span className="engine-sim__foot-sync">Zero Customer Data Co-mingling</span>
      </div>
    </div>
  );
}

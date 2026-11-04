import { useState } from 'react';
import { Icon } from '@/components/Icon';

type EndpointKey = 'ingest' | 'evaluate' | 'reconcile' | 'sftp';

interface EndpointConfig {
  key: EndpointKey;
  method: 'POST' | 'GET';
  path: string;
  name: string;
  requestBody: string;
  responseBody: string;
  latency: string;
}

const ENDPOINTS: Record<EndpointKey, EndpointConfig> = {
  ingest: {
    key: 'ingest',
    method: 'POST',
    path: '/v1/transactions/ingest',
    name: 'Ingest Transaction Batch',
    requestBody: `{
  "batch_id": "BATCH-2026-11-04-A",
  "channel_id": "CH-WEST-DISTRIB",
  "records": [
    { "tx_id": "TX-9901", "gross_amount": 485000, "date": "2026-11-04" },
    { "tx_id": "TX-9902", "gross_amount": 1250000, "date": "2026-11-04" }
  ]
}`,
    responseBody: `{
  "status": "ACCEPTED",
  "http_code": 200,
  "records_ingested": 2,
  "schema_checksum": "sha256:9f4c33e1...b82a",
  "orphaned_foreign_keys": 0,
  "processing_latency_ms": 0.42
}`,
    latency: '0.42ms',
  },
  evaluate: {
    key: 'evaluate',
    method: 'POST',
    path: '/v1/schemes/evaluate',
    name: 'Real-Time AST Evaluation',
    requestBody: `{
  "seller_id": "AGT-88120",
  "scheme_id": "SCH-Q4-LIFE-T3",
  "gross_premium": 250000,
  "persistency_score": 0.94
}`,
    responseBody: `{
  "seller_id": "AGT-88120",
  "base_commission": 30000.00,
  "persistency_multiplier": "+1250.00",
  "net_payout_inr": 31250.00,
  "fixed_point_drift": "0.00000000%",
  "audit_hash": "c88f...112e"
}`,
    latency: '0.18ms',
  },
  reconcile: {
    key: 'reconcile',
    method: 'GET',
    path: '/v1/payouts/reconciliation?cycle=2026-11',
    name: 'Subledger Balance Query',
    requestBody: `// GET Query: ?cycle=2026-11&currency=INR,AED,USD`,
    responseBody: `{
  "cycle": "2026-11",
  "total_debited_inr": 348200000.00,
  "total_credited_inr": 348200000.00,
  "variance": 0.00,
  "erp_batch_ready": true,
  "double_entry_status": "BALANCED"
}`,
    latency: '1.2ms',
  },
  sftp: {
    key: 'sftp',
    method: 'POST',
    path: '/v1/sftp/poll-carrier-batch',
    name: 'SFTP Arrival Validation',
    requestBody: `{
  "sftp_host": "secure-carrier-sftp.insurer.com",
  "path": "/outgoing/payout_feed_nov.csv",
  "strict_arrival_check": true
}`,
    responseBody: `{
  "file_name": "payout_feed_nov.csv",
  "file_size_bytes": 14208440,
  "row_count": 84200,
  "arrival_validation": "PASSED_ZERO_DROPS",
  "quarantined_records": 0
}`,
    latency: '3.8ms',
  },
};

export function IntegrationApiPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointKey>('ingest');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showResponse, setShowResponse] = useState<boolean>(true);

  const ep = ENDPOINTS[selectedEndpoint];

  const handleSend = () => {
    setIsRunning(true);
    setShowResponse(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowResponse(true);
    }, 400);
  };

  return (
    <div className="engine-sim card edge" role="region" aria-label="Interactive Integration API & Contract Terminal">
      <div className="engine-sim__header">
        <div className="engine-sim__status-wrap">
          <span className="ping" aria-hidden="true" />
          <div>
            <span className="engine-sim__title">Interactive Integration API Playground</span>
            <span className="engine-sim__sub">Documented REST API &amp; Scheduled SFTP Arrival Contracts</span>
          </div>
        </div>
        <div className="engine-sim__actions">
          <button
            type="button"
            className="engine-sim__btn engine-sim__btn--primary"
            onClick={handleSend}
            disabled={isRunning}
          >
            <Icon name="spark" size={13} />
            <span>{isRunning ? 'Executing Call...' : 'Send API Call'}</span>
          </button>
        </div>
      </div>

      <div className="engine-sim__screen">
        {/* Endpoint Selector Bar */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 8 }}>
          {(Object.keys(ENDPOINTS) as EndpointKey[]).map((key) => {
            const item = ENDPOINTS[key];
            const isSelected = selectedEndpoint === key;
            return (
              <button
                key={key}
                type="button"
                className={`btn btn--quiet btn--sm ${isSelected ? 'btn--accent' : ''}`}
                style={{ fontSize: '0.72rem', padding: '4px 10px', gap: 6 }}
                onClick={() => {
                  setSelectedEndpoint(key);
                  setShowResponse(true);
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: item.method === 'POST' ? 'var(--cyan)' : '#fbbf24' }}>
                  {item.method}
                </span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Request & Response Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 8 }}>
          <div className="engine-sim__codeblock" style={{ padding: '8px 12px', minHeight: 180 }}>
            <span className="engine-sim__code-label" style={{ color: 'var(--cyan)' }}>REQUEST PAYLOAD: {ep.path}</span>
            <pre style={{ margin: '4px 0 0', fontSize: '0.72rem', color: 'var(--ice-100)', fontFamily: 'var(--font-mono)' }}>
              {ep.requestBody}
            </pre>
          </div>

          <div className="engine-sim__codeblock" style={{ padding: '8px 12px', minHeight: 180, background: 'rgba(3, 8, 22, 0.95)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="engine-sim__code-label" style={{ color: '#34d399' }}>HTTP 200 OK</span>
              <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>Latency: {ep.latency}</span>
            </div>
            {showResponse ? (
              <pre style={{ margin: '4px 0 0', fontSize: '0.72rem', color: '#a7f3d0', fontFamily: 'var(--font-mono)' }}>
                {ep.responseBody}
              </pre>
            ) : (
              <div style={{ padding: '30px 0', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                Executing request against staging gateway...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="engine-sim__footer">
        <span className="engine-sim__foot-tag">
          <Icon name="check" size={12} /> Strict Schema Contracts
        </span>
        <span className="engine-sim__foot-sync">Arrival Validation on 100% of Feeds</span>
      </div>
    </div>
  );
}

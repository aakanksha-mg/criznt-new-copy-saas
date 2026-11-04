import { useState } from 'react';
import { Icon } from '@/components/Icon';

type Lang = 'en' | 'hi' | 'mr' | 'ar';

interface Localization {
  title: string;
  sellerRole: string;
  cycle: string;
  earnedLabel: string;
  earnedVal: string;
  offlineBanner: string;
  onlineBanner: string;
  derivationLabel: string;
  txns: {
    id: string;
    label: string;
    amount: string;
    detail: string;
    rule: string;
  }[];
}

const LOCALIZATIONS: Record<Lang, Localization> = {
  en: {
    title: 'Crizant One Seller App',
    sellerRole: 'Aditi Sharma · Mumbai West Tier 3',
    cycle: 'November 2026 Cycle · Final Statement',
    earnedLabel: 'Total Earned Payout',
    earnedVal: '₹1,48,200',
    offlineBanner: 'Offline Mode Active · Running on Local SQLite',
    onlineBanner: 'Online · Synced with Central Ledger',
    derivationLabel: 'Rule Derivation',
    txns: [
      {
        id: 'TX-901',
        label: 'Policy POL-8812 (Term Life)',
        amount: '₹48,200',
        detail: 'Base Premium: ₹4,00,000 × 12.0% + 0.5% Persistency Multiplier',
        rule: 'Rule: SCH-TERM-Q4-T3 · SHA: 8f4e...9a',
      },
      {
        id: 'TX-902',
        label: 'Super-Stockist Secondary Order',
        amount: '₹64,000',
        detail: 'Turnover: ₹8,00,000 × 8.0% Base Tier Split',
        rule: 'Rule: SCH-FMCG-SEC-02 · SHA: 3b1c...7d',
      },
      {
        id: 'TX-903',
        label: 'Quarterly Volume Bonus Gate',
        amount: '₹36,000',
        detail: 'Qualified Volume >= 50L · Multiplier +1.5% applied',
        rule: 'Rule: SCH-GATE-Q4-BONUS · SHA: e2f9...55',
      },
    ],
  },
  hi: {
    title: 'क्रीज़ेंट वन विक्रेता ऐप',
    sellerRole: 'अदिति शर्मा · मुंबई वेस्ट टीयर 3',
    cycle: 'नवंबर 2026 चक्र · अंतिम विवरण',
    earnedLabel: 'कुल अर्जित कमीशन',
    earnedVal: '₹1,48,200',
    offlineBanner: 'ऑफ़लाइन मोड सक्रिय · स्थानीय SQLite पर चालू',
    onlineBanner: 'ऑनलाइन · केंद्रीय लेज़र से सिंक हुआ',
    derivationLabel: 'नियम व्युत्पत्ति',
    txns: [
      {
        id: 'TX-901',
        label: 'पॉलिसी POL-8812 (टर्म लाइफ)',
        amount: '₹48,200',
        detail: 'मूल प्रीमियम: ₹4,00,000 × 12.0% + 0.5% पर्सिस्टेंसी',
        rule: 'नियम: SCH-TERM-Q4-T3 · हैश: 8f4e...9a',
      },
      {
        id: 'TX-902',
        label: 'स्टॉकिस्ट द्वितीयक ऑर्डर',
        amount: '₹64,000',
        detail: 'कारोबार: ₹8,00,000 × 8.0% बेस टीयर विभाजन',
        rule: 'नियम: SCH-FMCG-SEC-02 · हैश: 3b1c...7d',
      },
      {
        id: 'TX-903',
        label: 'त्रैमासिक वॉल्यूम बोनस',
        amount: '₹36,000',
        detail: 'अर्हक वॉल्यूम >= 50L · मल्टीप्लायर +1.5% लागू',
        rule: 'नियम: SCH-GATE-Q4-BONUS · हैश: e2f9...55',
      },
    ],
  },
  mr: {
    title: 'क्रीझंट वन विक्रेता ॲप',
    sellerRole: 'अदिती शर्मा · मुंबई पश्चिम स्तर 3',
    cycle: 'नोव्हेंबर 2026 चक्र · अंतिम विवरण',
    earnedLabel: 'एकूण मिळवलेले कमिशन',
    earnedVal: '₹1,48,200',
    offlineBanner: 'ऑफलाइन मोड सक्रिय · स्थानिक SQLite वर कार्यरत',
    onlineBanner: 'ऑनलाइन · केंद्रीय लेजरसह समक्रमित',
    derivationLabel: 'नियम व्युत्पन्न',
    txns: [
      {
        id: 'TX-901',
        label: 'पॉलिसी POL-8812 (टर्म लाइफ)',
        amount: '₹48,200',
        detail: 'मूळ प्रीमियम: ₹4,00,000 × 12.0% + 0.5% सातत्य',
        rule: 'नियम: SCH-TERM-Q4-T3 · हॅश: 8f4e...9a',
      },
      {
        id: 'TX-902',
        label: 'स्टॉकिस्ट दुय्यम ऑर्डर',
        amount: '₹64,000',
        detail: 'उलाढाल: ₹8,00,000 × 8.0% बेस टियर विभाजन',
        rule: 'नियम: SCH-FMCG-SEC-02 · हॅश: 3b1c...7d',
      },
      {
        id: 'TX-903',
        label: 'त्रैमासिक व्हॉल्यूम बोनस',
        amount: '₹36,000',
        detail: 'पात्र व्हॉल्यूम >= 50L · गुणक +1.5% लागू',
        rule: 'नियम: SCH-GATE-Q4-BONUS · हॅश: e2f9...55',
      },
    ],
  },
  ar: {
    title: 'تطبيق البائع كريزانت ون',
    sellerRole: 'عائشة المنصور · دبي المستوى 3',
    cycle: 'دورة نوفمبر 2026 · الكشف النهائي',
    earnedLabel: 'إجمالي العمولة المكتسبة',
    earnedVal: 'AED 44,200',
    offlineBanner: 'وضع غير متصل بالإنترنت · يعمل على قاعدة بيانات محلية',
    onlineBanner: 'متصل بالإنترنت · متزامن مع دفتر الأستاذ المركزي',
    derivationLabel: 'اشتقاق القاعدة الحسابية',
    txns: [
      {
        id: 'TX-901',
        label: 'وثيقة تأمين POL-8812 (تكافل)',
        amount: 'AED 14,800',
        detail: 'القسط الأساسي: AED 120,000 × 12.0% + مضاعف استمرارية 0.5%',
        rule: 'قاعدة: SCH-TAKAFUL-Q4 · الرمز: 8f4e...9a',
      },
      {
        id: 'TX-902',
        label: 'عمولة التوزيع الإقليمي',
        amount: 'AED 19,400',
        detail: 'المعاملات المؤهلة: AED 240,000 × 8.0%',
        rule: 'قاعدة: SCH-DISTRIB-UAE · الرمز: 3b1c...7d',
      },
      {
        id: 'TX-903',
        label: 'مكافأة تجاوز المستهدف الفصلي',
        amount: 'AED 10,000',
        detail: 'تحقيق حجم >= 500,000 درهم · تطبيق مضاعف +1.5%',
        rule: 'قاعدة: SCH-GATE-Q4-BONUS · الرمز: e2f9...55',
      },
    ],
  },
};

export function MobilePwaSimulator({ showExplain = false }: { showExplain?: boolean } = {}) {
  const [isOffline, setIsOffline] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [expandedId, setExpandedId] = useState<string | null>('TX-901');

  const loc = LOCALIZATIONS[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="pwa-sim">
      {/* Device Frame */}
      <div className="pwa-phone">
        {/* Phone Speaker & Camera Notch */}
        <div className="pwa-phone__notch">
          <div className="pwa-phone__cam" />
        </div>

        {/* Screen Status Bar */}
        <div className="pwa-phone__status-bar">
          <span className="pwa-phone__time">09:41</span>
          <div className="pwa-phone__icons">
            <span>{isOffline ? '✈️' : '5G'}</span>
            <span>100%</span>
          </div>
        </div>

        {/* Controls Overlay Bar */}
        <div className="pwa-sim__controls-bar">
          {/* Offline Toggle */}
          <button
            type="button"
            className={`pwa-sim__net-btn ${isOffline ? 'is-offline' : 'is-online'}`}
            onClick={() => setIsOffline((prev) => !prev)}
            title="Click to toggle offline mode simulation"
          >
            <span className="pwa-sim__net-dot" />
            <span>{isOffline ? 'OFFLINE (Airplane Mode)' : 'ONLINE'}</span>
          </button>

          {/* Language Switcher */}
          <div className="pwa-sim__lang-bar" role="tablist">
            {(['en', 'hi', 'mr', 'ar'] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                className={`pwa-sim__lang-tab ${lang === l ? 'is-active' : ''}`}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Screen Content */}
        <div className="pwa-phone__screen" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* App Header */}
          <div className="pwa-app__header">
            <div className="pwa-app__avatar">
              <Icon name="spark" size={16} />
            </div>
            <div>
              <div className="pwa-app__title">{loc.title}</div>
              <div className="pwa-app__sub">{loc.sellerRole}</div>
            </div>
            <div className="pwa-app__badge">
              <span className="tag tag--sm" style={{ color: 'var(--cyan)' }}>
                v4.8 PWA
              </span>
            </div>
          </div>

          {/* Network Banner */}
          <div className={`pwa-app__net-banner ${isOffline ? 'is-offline' : ''}`}>
            <span className="ping" aria-hidden="true" />
            <span>{isOffline ? loc.offlineBanner : loc.onlineBanner}</span>
          </div>

          {/* Payout Hero Card */}
          <div className="pwa-app__payout-card">
            <span className="pwa-app__cycle">{loc.cycle}</span>
            <div className="pwa-app__amount">{loc.earnedVal}</div>
            <span className="pwa-app__amount-label">{loc.earnedLabel}</span>
            <div className="pwa-app__payout-foot">
              <span>{isOffline ? '0ms Local Query Latency' : 'Real-Time Reconciled'}</span>
              <span>100% Traceable</span>
            </div>
          </div>

          {/* Transaction Lines */}
          <div className="pwa-app__section-title">
            <span>Recent Line Calculations (Tap to inspect derivation)</span>
          </div>

          <div className="pwa-app__txns">
            {loc.txns.map((tx) => {
              const isExpanded = expandedId === tx.id;
              return (
                <div
                  key={tx.id}
                  className={`pwa-app__txn-card ${isExpanded ? 'is-expanded' : ''}`}
                  onClick={() => setExpandedId(isExpanded ? null : tx.id)}
                >
                  <div className="pwa-app__txn-top">
                    <div>
                      <span className="pwa-app__txn-id">{tx.id}</span>
                      <div className="pwa-app__txn-label">{tx.label}</div>
                    </div>
                    <div className="pwa-app__txn-amount">{tx.amount}</div>
                  </div>

                  {isExpanded && (
                    <div className="pwa-app__derivation">
                      <div className="pwa-app__derivation-head">
                        <Icon name="check" size={12} />
                        <span>{loc.derivationLabel}</span>
                      </div>
                      <div className="pwa-app__derivation-body">{tx.detail}</div>
                      <code className="pwa-app__derivation-rule">{tx.rule}</code>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className="pwa-phone__home-bar" />
      </div>

      {/* Side Explanations (when rendered standalone) */}
      {showExplain && (
        <div className="pwa-sim__explain">
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
            Local-First Architecture
          </span>
          <h3 style={{ margin: '4px 0 0', fontSize: 'var(--fs-h2)' }}>
            It only has to fail twice.
          </h3>
          <p className="lead" style={{ margin: 'var(--space-3) 0' }}>
            A dashboard that requires a live connection fails exactly when opened — on a handset,
            between client meetings, in a district where cellular signal drops. Twice is all it takes
            before the field seller stops trusting it and goes back to calling the branch.
          </p>

          <ul className="checklist">
            <li>
              <Icon name="check" />
              <span>
                <strong>Local-first, not merely offline-cached:</strong> Durable local SQLite store
                renders instantly with 0ms critical-path network fetch.
              </span>
            </li>
            <li>
              <Icon name="check" />
              <span>
                <strong>8+ Languages &amp; RTL:</strong> Hindi, Marathi, Tamil, Telugu, Kannada,
                Malayalam, Indonesian, and true Arabic right-to-left layout.
              </span>
            </li>
            <li>
              <Icon name="check" />
              <span>
                <strong>Mathematical Derivation:</strong> Tap any number to reveal the exact rate,
                persistency multiplier, and scheme hash behind it.
              </span>
            </li>
            <li>
              <Icon name="check" />
              <span>
                <strong>Progressive Web App:</strong> Zero app store approval delays, zero MDM device
                policy restrictions, zero handset push updates.
              </span>
            </li>
          </ul>

          <div className="cluster" style={{ marginTop: 'var(--space-4)' }}>
            <button
              type="button"
              className="btn btn--accent btn--sm"
              onClick={() => setIsOffline((prev) => !prev)}
            >
              <Icon name="offline" size={14} />
              <span>{isOffline ? 'Switch to Online Mode' : 'Simulate Low-Signal Offline Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

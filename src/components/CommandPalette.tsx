import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, type IconName } from './Icon';

interface PaletteItem {
  id: string;
  title: string;
  category: 'Interactive Tools' | 'Platform' | 'Engineering' | 'Case Studies' | 'Compliance & AEO';
  path: string;
  icon: IconName;
  description?: string;
  keywords?: string[];
}

const PALETTE_ITEMS: PaletteItem[] = [
  // Interactive Tools
  {
    id: 'tool-leakage',
    title: 'Commission Leakage Calculator',
    category: 'Interactive Tools',
    path: '/leakage-calculator',
    icon: 'scale',
    description: 'Deep channel footprint: model leakage across distributors, employees, brokers & partner banks',
    keywords: ['calculator', 'leakage', 'distributors', 'brokers', 'banks', 'employees', 'spend'],
  },
  {
    id: 'tool-leads-backend',
    title: 'Visitor & Company Intelligence Ledger (Backend API)',
    category: 'Interactive Tools',
    path: '/leakage-calculator',
    icon: 'eye',
    description: 'Inspect captured corporate visitors, company domains, and channel calculations',
    keywords: ['leads', 'backend', 'visitors', 'companies', 'analytics', 'intel', 'domain'],
  },
  {
    id: 'tool-engine-sim',
    title: 'Live Engine Execution Simulator',
    category: 'Interactive Tools',
    path: '/#main',
    icon: 'spark',
    description: 'Simulate deterministic cycle computation across 184,207 transactions',
    keywords: ['simulator', 'engine', 'live', 'runtime', 'latency'],
  },
  {
    id: 'tool-bitemporal',
    title: 'Bitemporal Time-Travel Audit Scrubber',
    category: 'Interactive Tools',
    path: '/engineering#bitemporal',
    icon: 'clock',
    description: 'Interactive dual-axis scrubber: Event Time vs System Time audit reconstruction',
    keywords: ['bitemporal', 'audit', 'time travel', 'effective dated', 'sql'],
  },
  {
    id: 'tool-fsm',
    title: 'Clawback Finite State Machine',
    category: 'Interactive Tools',
    path: '/engineering#clawback-fsm',
    icon: 'shield',
    description: 'Simulate policy lapses and automatic next-cycle debt recovery',
    keywords: ['clawback', 'fsm', 'state machine', 'quarantine', 'offset'],
  },
  {
    id: 'tool-ast',
    title: 'Fixed-Point AST Rule Evaluator',
    category: 'Interactive Tools',
    path: '/engineering#ast-evaluator',
    icon: 'layers',
    description: 'Interactive 64-bit integer formula compilation with 0 floating-point drift',
    keywords: ['ast', 'fixed point', 'math', 'float', 'precision', 'formula'],
  },

  // Engineering
  {
    id: 'eng-page',
    title: 'Engineering Architecture & Principles',
    category: 'Engineering',
    path: '/engineering',
    icon: 'layers',
    description: 'Six core decisions in the data model that make commission auditable',
    keywords: ['engineering', 'architecture', 'principles', 'scale', 'deterministic'],
  },
  {
    id: 'eng-security',
    title: 'Security, Encryption & Data Residency',
    category: 'Engineering',
    path: '/security',
    icon: 'shield',
    description: 'In-market residency, AES-256 encryption, zero data mixing',
    keywords: ['security', 'residency', 'soc2', 'iso', 'encryption', 'gdpr'],
  },
  {
    id: 'eng-integrations',
    title: 'Enterprise ERP & Core Ingestion Integrations',
    category: 'Engineering',
    path: '/integrations',
    icon: 'layers',
    description: 'Connectors for SAP, Oracle, NetSuite, Salesforce, Core Banking, and Carrier Feeds',
    keywords: ['integrations', 'sap', 'oracle', 'netsuite', 'api', 'kafka'],
  },

  // Platform
  {
    id: 'plat-overview',
    title: 'Crizant One Platform Overview',
    category: 'Platform',
    path: '/platform',
    icon: 'spark',
    description: 'One operating system to configure, compute, reconcile and deliver payouts',
    keywords: ['platform', 'operating system', 'modules'],
  },
  {
    id: 'plat-scheme-builder',
    title: 'Scheme Builder (No-Code Rule Engine)',
    category: 'Platform',
    path: '/platform/scheme-builder',
    icon: 'spark',
    description: 'Create multi-tier performance rules and simulate on live data before launch',
    keywords: ['scheme builder', 'no code', 'rules', 'simulation'],
  },
  {
    id: 'plat-hierarchy',
    title: 'Hierarchy & Team Master',
    category: 'Platform',
    path: '/platform/distribution-management',
    icon: 'clock',
    description: '6-tier effective-dated hierarchy resolving historical splits and reporting lines',
    keywords: ['hierarchy', 'tiers', 'territory', 'effective dated'],
  },
  {
    id: 'plat-calc-engine',
    title: 'Deterministic Calculation Engine',
    category: 'Platform',
    path: '/platform/scheme-builder',
    icon: 'layers',
    description: 'Partitioned execution engine calculating cycles in seconds',
    keywords: ['calculation', 'engine', 'vectorized', 'deterministic'],
  },
  {
    id: 'plat-anomaly-guard',
    title: 'Anomaly & Leakage Guard',
    category: 'Platform',
    path: '/platform/ai-intelligence',
    icon: 'shield',
    description: 'Automated policy-lapse matching, duplicate qualifications, and zombie overrides',
    keywords: ['anomaly', 'clawback', 'leakage', 'quarantine'],
  },
  {
    id: 'plat-recon',
    title: 'Reconciliation & Multi-Currency Ledger',
    category: 'Platform',
    path: '/platform/reconciliation',
    icon: 'scale',
    description: 'Transaction-level tie-out against ERP general ledger with zero variance',
    keywords: ['reconciliation', 'general ledger', 'subledger', 'currency'],
  },
  {
    id: 'plat-last-mile',
    title: 'Last Mile & Offline Seller App (PWA)',
    category: 'Platform',
    path: '/platform/last-mile',
    icon: 'offline',
    description: 'Local-first offline mobile statement app in 8 languages with full derivation',
    keywords: ['seller app', 'mobile', 'pwa', 'offline', 'languages'],
  },

  // Case Studies (All 100% Measured)
  {
    id: 'case-insurance',
    title: 'Insurance Case Study: 74% Dispute Reduction',
    category: 'Case Studies',
    path: '/case-studies/insurance',
    icon: 'shield',
    description: 'Multi-carrier distributor replaced agent chaos with automated reconciliation',
    keywords: ['case study', 'insurance', 'disputes', 'carrier'],
  },
  {
    id: 'case-banking',
    title: 'Banking Case Study: 81% Reconciliation Drop',
    category: 'Case Studies',
    path: '/case-studies/banking',
    icon: 'scale',
    description: 'Bank scaled advisor incentives to same-day updates and full audit trails',
    keywords: ['case study', 'banking', 'advisors', 'reconciliation'],
  },
  {
    id: 'case-fintech',
    title: 'Fintech Case Study: 68% Fewer Compliance Errors',
    category: 'Case Studies',
    path: '/case-studies/fintech',
    icon: 'spark',
    description: 'Fintech reached payout precision with close-cycle reduced from weeks to days',
    keywords: ['case study', 'fintech', 'compliance', 'close cycle'],
  },
  {
    id: 'case-finance',
    title: 'Finance & FinOps: 90% Faster Month-End Close',
    category: 'Case Studies',
    path: '/case-studies/finance-finops',
    icon: 'layers',
    description: 'Zero unexplained variances between commission subledger and general ledger',
    keywords: ['case study', 'finance', 'month end', 'tie out'],
  },

  // Compliance & Direct Answers
  {
    id: 'comp-global',
    title: 'Regulatory Frameworks (IRDAI, RBI, SEBI, CBUAE, OJK)',
    category: 'Compliance & AEO',
    path: '/compliance',
    icon: 'globe',
    description: 'Pre-built regulatory rules maintained centrally across 6 global markets',
    keywords: ['compliance', 'irdai', 'rbi', 'sebi', 'cbuae', 'ojk', 'regulations'],
  },
  {
    id: 'ans-reconstruct',
    title: 'Direct Answer: Can Crizant reconstruct a payout from 2 years ago?',
    category: 'Compliance & AEO',
    path: '/answers/can-crizant-reconstruct-a-payout',
    icon: 'clock',
    description: 'Deterministic pure functions and bitemporal data models allow point-in-time replay',
    keywords: ['reconstruct', 'audit', 'answer', 'payout'],
  },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filtered = PALETTE_ITEMS.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(q);
    const descMatch = item.description?.toLowerCase().includes(q);
    const catMatch = item.category.toLowerCase().includes(q);
    const keyMatch = item.keywords?.some((k) => k.toLowerCase().includes(q));
    return titleMatch || descMatch || catMatch || keyMatch;
  });

  const handleSelect = (item: PaletteItem) => {
    setIsOpen(false);
    navigate(item.path);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={() => setIsOpen(false)} role="dialog" aria-modal="true" aria-label="Command Palette">
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="cmd-search">
          <Icon name="spark" size={18} className="cmd-search__icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-search__input"
            placeholder="Search 69 routes, interactive sandboxes, or engineering decisions... (Press Esc to close)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
          />
          <kbd className="cmd-search__kbd">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="cmd-list" role="listbox">
          {filtered.length === 0 ? (
            <div className="cmd-empty">
              No matching pages or tools found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  className={`cmd-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <span className="cmd-item__icon">
                    <Icon name={item.icon} size={16} />
                  </span>
                  <div className="cmd-item__body">
                    <div className="cmd-item__top">
                      <span className="cmd-item__title">{item.title}</span>
                      <span className="cmd-item__cat">{item.category}</span>
                    </div>
                    {item.description && <p className="cmd-item__desc">{item.description}</p>}
                  </div>
                  <span className="cmd-item__arrow" aria-hidden="true">
                    ↵
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="cmd-foot">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>ENTER</kbd></span>
          <span style={{ marginLeft: 'auto', color: 'var(--cyan)' }}>
            Crizant One Command Center
          </span>
        </div>
      </div>
    </div>
  );
}

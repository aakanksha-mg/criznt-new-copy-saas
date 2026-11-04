import { modules } from '@/data/platform';
import { industries } from '@/data/industries';
import { answers } from '@/data/answers';
import { articles } from '@/data/insights';
import { terms } from '@/data/glossary';
import { comparisons } from '@/data/compare';
import { cases, caseSectors, casesMeasured } from '@/data/cases';
import { products, sureAreas, fraudVectors, shieldGovernance } from '@/data/products';
import { site, url } from './site';
import {
  faqSchema,
  articleSchema,
  serviceSchema,
  softwareSchema,
  qaSchema,
  definedTermSetSchema,
  productSchema,
  type PageSeo,
} from './seo';

/**
 * "a, b and c" rather than "a, b, c". Answer engines quote these sentences
 * verbatim, so a list in one has to read as English, not as a data dump.
 */
/** Small counts read as words in prose; past twelve, the numeral is clearer. */
const numberWord = (n: number): string =>
  ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'][n] ??
  String(n);

const sentenceList = (items: string[]): string =>
  items.length < 2
    ? (items[0] ?? '')
    : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

const BUILD_DATE = '2026-11-03';

const allFaqs = [
  ...modules.flatMap((m) => m.faqs),
  ...industries.flatMap((i) => i.faqs),
];

/**
 * Every indexable URL on the site, with its head, its structured data and its
 * sitemap weighting. The router, the prerenderer, the sitemap and llms.txt all
 * read this one list, so a page cannot exist without its SEO.
 */
export const pages: PageSeo[] = [
  {
    path: '/',
    title: 'Crizant One — Commission & Incentive Operating System',
    description:
      'Crizant One configures, computes and reconciles commission and incentive payouts across multi-tier channels — in real time, multi-currency, traceable to every seller. For FMCG, pharma, real estate and insurance.',
    keywords: [
      'commission management software',
      'incentive compensation management',
      'channel partner incentives',
      'trade spend management',
      'commission leakage prevention',
      'sales commission automation',
      'distribution management platform',
    ],
    priority: 1,
    changefreq: 'weekly',
    lastmod: BUILD_DATE,
    schema: [
      softwareSchema(),
      faqSchema([
        {
          q: 'What is Crizant One?',
          a: answers[0].short,
        },
        {
          q: 'Which industries does Crizant One serve?',
          a: 'FMCG and consumer goods, pharmaceuticals, real estate, and insurance and BFSI — channel-driven industries where a payout precedes certainty.',
        },
        {
          q: 'Does Crizant operate the commission function or only supply software?',
          a: 'Both. Crizant One is available as software and as a fully managed service on a 99.5% SLA, with the client retaining the platform, the data and the decisions.',
        },
      ]),
    ],
  },
  {
    path: '/products',
    title: 'Products — Crizant One, Crizant Sure & Crizant Shield',
    description:
      'Crizant builds three systems for one distribution chain: Crizant One for the principal paying a distribution network, Crizant Sure for the intermediary running one, and Crizant Shield for the insurer fraud risk unit that has to prove neither is being defrauded.',
    keywords: [
      'crizant products',
      'crizant one',
      'crizant sure',
      'crizant shield',
      'insurance distribution software',
    ],
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Products', path: '/products' }],
    schema: [
      {
        '@type': 'CollectionPage',
        name: 'Crizant products',
        description:
          'Three separately sold systems: a commission and incentive operating system, a broking business management system, and a fraud risk management platform.',
        hasPart: products.map((pr) => ({
          '@type': 'SoftwareApplication',
          '@id': `${site.origin}/#${pr.slug}`,
          name: pr.name,
          applicationCategory: 'BusinessApplication',
          description: pr.promise,
          url: `${site.origin}${pr.to}`,
        })),
      },
      faqSchema([
        {
          q: 'How many products does Crizant make?',
          a: `Crizant makes ${numberWord(products.length)}: ${products
            .map((pr) => `${pr.name}, ${pr.category.toLowerCase()}`)
            .join('; ')}. They are sold separately, run independently, and are bought by different functions \u2014 the principal paying a distribution network, the intermediary running one, and the insurer fraud risk unit respectively.`,
        },
        {
          q: 'Which Crizant product do I need?',
          a: 'It depends on who pays whom. An insurer, bank, AMC or manufacturer that pays a distribution network needs Crizant One, a commission and incentive operating system. A broker, corporate agent or distribution house that runs its own book needs Crizant Sure, a broking business management system. A life or health insurer carrying fraud risk needs Crizant Shield, a fraud risk management and FRMU governance platform.',
        },
      ]),
    ],
  },
  {
    path: '/products/crizant-sure',
    title: 'Crizant Sure — Broking Business Management System',
    description:
      'Crizant Sure runs a composite intermediary end to end: leads, placement to multiple insurers, policies, renewals, commission and books across insurance, mutual funds and lending, with the run-rate against every principal kept separately.',
    keywords: [
      'broking business management system',
      'insurance broker software',
      'composite broker software',
      'broker CRM India',
      'insurance broking platform',
    ],
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [
      { name: 'Products', path: '/products' },
      { name: 'Crizant Sure', path: '/products/crizant-sure' },
    ],
    schema: [
      productSchema({
        slug: 'crizant-sure',
        name: 'Crizant Sure',
        category: 'Broking business management system',
        promise: products.find((pr) => pr.slug === 'crizant-sure')!.promise,
        audience: 'Composite insurance brokers, corporate agents and distribution houses',
        to: '/products/crizant-sure',
        subCategory: 'Insurance Broking Management',
        featureList: sureAreas.flatMap((a) => a.items),
      }),
      faqSchema([
        {
          q: 'Is Crizant Sure the same product as Crizant One?',
          a: 'No. Crizant Sure is a broking business management system for intermediaries running their own book \u2014 leads, placement, policies, renewals and commission receivable. Crizant One is a commission and incentive operating system for the principal paying a distribution network. A broker uses Crizant Sure; the insurer or bank paying that broker uses Crizant One. They are sold separately and neither requires the other.',
        },
        {
          q: 'What does Crizant Sure cover beyond insurance?',
          a: 'Crizant Sure carries a composite book: general and life insurance, mutual funds, and loans and banking products, on one customer record. Each principal group is targeted and measured separately, because an insurer measures sourced premium, a bank measures disbursal and a fund house measures net sales and trail.',
        },
      ]),
    ],
  },
  {
    path: '/products/crizant-shield',
    title: 'Crizant Shield — Insurance Fraud Risk Management Platform',
    description:
      'Crizant Shield detects fraud across policyholder, distributor, employee and vendor for life and health insurers, and runs the FRMU governance an insurer must evidence: committee orders, three-lines-of-defence controls, risk register, CAPA and the statutory fraud return.',
    keywords: [
      'insurance fraud detection software',
      'fraud risk management unit',
      'FRMU platform',
      'life insurance fraud analytics',
      'IRDAI fraud monitoring',
      'Section 45 contestability',
    ],
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [
      { name: 'Products', path: '/products' },
      { name: 'Crizant Shield', path: '/products/crizant-shield' },
    ],
    schema: [
      productSchema({
        slug: 'crizant-shield',
        name: 'Crizant Shield',
        category: 'Fraud risk management and FRMU governance platform',
        promise: products.find((pr) => pr.slug === 'crizant-shield')!.promise,
        audience: 'Life and health insurers \u2014 fraud risk, compliance, internal audit',
        to: '/products/crizant-shield',
        subCategory: 'Fraud Detection and Risk Management',
        featureList: [
          ...fraudVectors.map((v) => `${v.counterparty} fraud surveillance: ${v.body.split('.')[0]}`),
          ...shieldGovernance.map((g) => g.title),
        ],
      }),
      faqSchema([
        {
          q: 'What is Crizant Shield?',
          a: 'Crizant Shield is a fraud risk management platform for life and health insurers. It detects fraud across four counterparties \u2014 policyholder, distributor, employee and vendor \u2014 against mapped typologies at each stage of the policy lifecycle, and it runs the Fraud Risk Management Unit governance an insurer has to evidence: the committee and its binding orders, the three-lines-of-defence control matrix, the risk register, continuous control monitoring, corrective action tracking and the periodic statutory fraud return.',
        },
        {
          q: 'Why does Section 45 of the Insurance Act matter to fraud detection?',
          a: 'Section 45(1) of the Insurance Act 1938 says a life policy cannot be called in question on any ground whatsoever after three years from the later of issuance, commencement of risk, revival or addition of a rider. There is no exception for fraud found afterwards. That makes fraud detection on an in-force life book a dated queue rather than a backlog: a policy in its 28th month can still be contested, the same policy in its 37th cannot. Crizant Shield ranks in-force policies by the months remaining before that bar closes.',
        },
        {
          q: 'Does Crizant Shield use AI, and what decides what?',
          a: 'Crizant Shield combines rule-based, heuristic and algorithmic detectors. Every detector states the fields it reads, the conditions that make it fire with a weight on each, the threshold at which it fires, and the action that follows. Nothing is repudiated or rejected by a model: detections hold a proposal or open a matter, and a human \u2014 with dual sign-off above defined thresholds \u2014 makes the binding decision.',
        },
      ]),
    ],
  },
  {
    path: '/platform',
    title: 'The Crizant One Platform — Configure, Compute, Reconcile, Deliver',
    description:
      'Six modules in one operating system: no-code scheme builder, AI pre-close anomaly detection, multi-currency reconciliation, distribution management, an offline-first seller app, and point-in-time audit.',
    keywords: [
      'incentive compensation platform',
      'commission calculation engine',
      'no-code scheme builder',
      'commission reconciliation software',
    ],
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Platform', path: '/platform' }],
    schema: [softwareSchema(), faqSchema(modules.flatMap((m) => m.faqs).slice(0, 8))],
  },
  ...modules.map(
    (m): PageSeo => ({
      path: `/platform/${m.slug}`,
      title: `${m.name} — ${site.product}`,
      description: m.promise,
      keywords: [m.name.toLowerCase(), 'commission software', 'incentive management'],
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: BUILD_DATE,
      breadcrumbs: [
        { name: 'Platform', path: '/platform' },
        { name: m.name, path: `/platform/${m.slug}` },
      ],
      schema: [
        faqSchema(m.faqs),
        serviceSchema({
          name: `${site.product} — ${m.name}`,
          description: m.promise,
          path: `/platform/${m.slug}`,
        }),
      ],
    }),
  ),
  {
    path: '/industries',
    title: 'Industries — FMCG, Pharma, Real Estate, Insurance',
    description:
      'One mechanic across four industries: a payout that precedes certainty, through a multi-tier channel, on a scheme that keeps changing. How Crizant One handles each.',
    keywords: [
      'trade scheme management FMCG',
      'pharma field incentive software',
      'real estate brokerage management',
      'insurance commission software',
    ],
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Industries', path: '/industries' }],
    schema: [faqSchema(industries.flatMap((i) => i.faqs).slice(0, 8))],
  },
  ...industries.map(
    (i): PageSeo => ({
      path: `/industries/${i.slug}`,
      title: `${i.name} — Commission & Incentive Management`,
      description: i.promise,
      keywords: [
        `${i.nav.toLowerCase()} incentive management`,
        `${i.nav.toLowerCase()} channel spend`,
        'commission leakage',
      ],
      priority: 0.85,
      changefreq: 'monthly',
      lastmod: BUILD_DATE,
      breadcrumbs: [
        { name: 'Industries', path: '/industries' },
        { name: i.name, path: `/industries/${i.slug}` },
      ],
      schema: [
        faqSchema(i.faqs),
        serviceSchema({
          name: `${site.product} for ${i.name}`,
          description: i.promise,
          path: `/industries/${i.slug}`,
          type: 'Incentive compensation management',
        }),
      ],
    }),
  ),
  {
    path: '/managed-services',
    title: 'Managed Services — We Run It, You Own It',
    description:
      'Crizant operates your commission function on a 99.5% SLA: scheme configuration, data operations, cycle processing, seller helpdesk and compliance upkeep. Go-live typically in ten days.',
    keywords: [
      'managed commission services',
      'outsourced incentive compensation',
      'commission operations as a service',
      'BPO commission processing',
    ],
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Managed Services', path: '/managed-services' }],
    schema: [
      serviceSchema({
        name: 'Crizant Managed Services',
        description:
          'Fully managed commission and incentive operations on a 99.5% SLA — configuration, data operations, cycle processing, helpdesk and compliance upkeep.',
        path: '/managed-services',
        type: 'Business process outsourcing',
      }),
      faqSchema([
        {
          q: 'Does Crizant run the commission operation, or just supply the software?',
          a: answers.find((a) => a.slug === 'does-crizant-offer-managed-services')!.short,
        },
        {
          q: 'How long does a Crizant One implementation take?',
          a: answers.find((a) => a.slug === 'how-long-does-implementation-take')!.short,
        },
      ]),
    ],
  },
  {
    path: '/compliance',
    title: 'Global Compliance — IRDAI, RBI, SEBI, CBUAE, Takaful, OJK',
    description:
      'Pre-built regulatory frameworks for India, the Middle East and Indonesia, maintained centrally as rules change. Markets served and frameworks built, stated separately.',
    keywords: [
      'IRDAI commission compliance',
      'Takaful commission structures',
      'OJK insurance compliance',
      'EoM utilisation tracking',
    ],
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Global Compliance', path: '/compliance' }],
    schema: [
      faqSchema([
        {
          q: 'Which regulatory frameworks does Crizant One support?',
          a: answers.find((a) => a.slug === 'which-regulatory-frameworks')!.short,
        },
        {
          q: 'What is Expense of Management (EoM) in insurance?',
          a: answers.find((a) => a.slug === 'what-does-eom-mean')!.short,
        },
      ]),
    ],
  },
  {
    path: '/leakage-calculator',
    title: 'Commission Leakage Calculator — Channel Spend & Overpayment Model',
    description:
      'Quantify your enterprise channel spend leakage across distributors, field employees, brokers, and partner banks. Calibrated against the 3–8% observed deployment band with transparent arithmetic.',
    keywords: [
      'commission leakage calculator',
      'channel spend leakage',
      'distributor rebate leakage',
      'broker clawback calculation',
      'bancassurance commission leakage',
      'incentive overpayment model',
      'trade spend leakage',
    ],
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Leakage Calculator', path: '/leakage-calculator' }],
    schema: [
      {
        '@type': 'WebApplication',
        name: 'Crizant Commission Leakage Calculator',
        url: `${site.origin}/leakage-calculator`,
        applicationCategory: 'BusinessApplication',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        operatingSystem: 'All',
        description:
          'Interactive enterprise commission leakage calculator. Models channel spend loss across distributors, sales employees, brokers, and partner banks based on 3-8% observed deployment benchmarks.',
        featureList: [
          'Multi-currency spend calculation (INR, USD, AED, IDR, AUD, ZAR)',
          'Granular channel footprint modeling (distributors, field employees, brokers, partner banks)',
          'Bancassurance and institutional revenue-share variance breakdown',
          'Early surrender and loan clawback risk modeling',
          'Transparent 3-8% arithmetic with instant executive memo export',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      faqSchema([
        {
          q: 'How much commission leakage does a typical business have?',
          a: answers.find((a) => a.slug === 'how-much-commission-leakage')!.short,
        },
        {
          q: 'Where does commission leakage concentrate across distributors, brokers, and banks?',
          a: 'Commission leakage concentrates in four areas: overlapping schemes that pay twice on the same transaction, hierarchy drift where personnel changes are not effective-dated, unrecovered policy and loan clawbacks, and institutional bancassurance revenue-share variances.',
        },
        {
          q: 'How do you calculate enterprise commission leakage?',
          a: 'Commission leakage is calculated by evaluating annual channel spend against hierarchy depth, live scheme concurrency, and channel participant volume across distributors, employees, brokers, and banks, positioned within Crizant’s observed 3–8% deployment band.',
        },
      ]),
    ],
  },
  {
    path: '/answers',
    title: 'Answers — Direct Answers on Commission & Incentive Management',
    description:
      'Nineteen direct answers to the questions buyers actually ask about commission and incentive operations, leakage, compliance and managed delivery — each written to stand on its own.',
    keywords: [
      'commission management FAQ',
      'incentive compensation questions',
      'what is commission leakage',
      'ICM software questions',
    ],
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Answers', path: '/answers' }],
    schema: [faqSchema(answers.map((a) => ({ q: a.q, a: a.short })))],
  },
  ...answers.map(
    (a): PageSeo => ({
      path: `/answers/${a.slug}`,
      title: a.seoTitle ?? a.q,
      description: a.short.length > 300 ? `${a.short.slice(0, 297)}…` : a.short,
      keywords: [a.topic.toLowerCase(), 'commission management', 'incentive compensation'],
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: BUILD_DATE,
      breadcrumbs: [
        { name: 'Answers', path: '/answers' },
        { name: a.q, path: `/answers/${a.slug}` },
      ],
      schema: [qaSchema({ question: a.q, answer: a.short, path: `/answers/${a.slug}` })],
    }),
  ),
  {
    path: '/resources',
    title: 'Insights — Mechanism Analysis on Channel Incentives',
    description:
      'How a specific rule changes a specific payout. Verified regulatory analysis, the reversal problem across four industries, and the arithmetic of channel spend leakage.',
    keywords: [
      'commission management insights',
      'IRDAI distribution reform analysis',
      'channel spend leakage',
      'incentive compensation analysis',
    ],
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Insights', path: '/resources' }],
    schema: [
      {
        '@type': 'CollectionPage',
        name: 'Crizant Insights',
        description: 'Mechanism analysis on commission, incentive and channel spend operations.',
        hasPart: articles.map((a) => ({
          '@type': 'Article',
          headline: a.title,
          url: `${site.origin}/resources/${a.slug}`,
          datePublished: a.published,
        })),
      },
    ],
  },
  ...articles.map(
    (a): PageSeo => ({
      path: `/resources/${a.slug}`,
      title: a.seoTitle ?? a.title,
      description: a.deck.length > 300 ? `${a.deck.slice(0, 297)}…` : a.deck,
      keywords: a.tags,
      ogType: 'article',
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: a.updated ?? a.published,
      breadcrumbs: [
        { name: 'Insights', path: '/resources' },
        { name: a.title, path: `/resources/${a.slug}` },
      ],
      schema: [articleSchema(a)],
    }),
  ),
  {
    path: '/about',
    title: 'About Crizant — Who We Are and What We Build',
    description:
      'Crizant Innovations Private Limited builds Crizant One, a commission and incentive operating system for channel-driven businesses across six regions. Backed by EZYTEK Consulting.',
    keywords: ['Crizant Innovations', 'about Crizant', 'commission software company India'],
    priority: 0.7,
    changefreq: 'yearly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'About', path: '/about' }],
    schema: [
      {
        '@type': 'AboutPage',
        name: 'About Crizant',
        mainEntity: { '@id': `${site.origin}/#organization` },
      },
      faqSchema([
        { q: 'Who is Crizant?', a: answers.find((a) => a.slug === 'who-is-crizant')!.short },
      ]),
    ],
  },
  {
    path: '/security',
    title: 'Security, Data Handling & Trust',
    description:
      'How Crizant One handles commission data: access control, encryption, audit logging, residency options, and the boundary that keeps your platform, data and decisions yours.',
    keywords: ['commission data security', 'SaaS data residency', 'audit logging', 'access control'],
    priority: 0.6,
    changefreq: 'yearly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Security & Trust', path: '/security' }],
  },
  {
    path: '/contact',
    title: 'Book a Demo — Configure One of Your Own Schemes Live',
    description:
      'A thirty-minute session with no commitment, in which we configure one of your real incentive schemes live on Crizant One. Or email sales.team@crizant.com.',
    keywords: ['book commission software demo', 'Crizant demo', 'incentive software demo'],
    priority: 0.9,
    changefreq: 'yearly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Contact', path: '/contact' }],
    schema: [
      {
        '@type': 'ContactPage',
        name: 'Contact Crizant',
        mainEntity: { '@id': `${site.origin}/#organization` },
      },
    ],
  },
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description:
      'How Crizant collects, uses and protects personal data submitted through this website and through Crizant One engagements.',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Privacy', path: '/privacy' }],
  },
  {
    path: '/terms',
    title: 'Terms of Use',
    description:
      'The terms on which this website and its content may be used, including how to read the figures Crizant publishes and what the leakage calculator is and is not.',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Terms', path: '/terms' }],
  },
  {
    path: '/engineering',
    title: 'Engineering — How Crizant One Is Built',
    description:
      'Six decisions in the data model that make a commission payout reproducible: deterministic computation, bitemporal scheme and hierarchy storage, a pre-close exception gate, offline-first delivery, arrival validation on every feed, and isolated simulation on production data.',
    keywords: [
      'commission calculation engine architecture',
      'bitemporal commission data model',
      'deterministic payout computation',
      'point-in-time commission reconstruction',
      'offline-first sales app architecture',
    ],
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Engineering', path: '/engineering' }],
    schema: [
      softwareSchema(),
      faqSchema([
        {
          q: 'How does Crizant One reconstruct a payout from two years ago?',
          a: 'Crizant One stores every scheme, hierarchy, rate and partner status as effective-dated records and computes each cycle deterministically from them, so re-running a two-year-old cycle against the same dated inputs returns the figure it returned then, with the rule behind each line attached.',
        },
        {
          q: 'Does the Crizant One seller app need a network connection?',
          a: 'No. The Crizant One seller app is a local-first progressive web app that holds its own durable store and renders entirely from it, reconciling with the server when a connection returns, so there is no fetch on the critical path that can fail in a low-signal district.',
        },
        {
          q: 'Can a commission cycle be paid before its exceptions are reviewed?',
          a: 'No. In Crizant One, computation and disbursement are separate stages with an explicit gate between them, and a cycle holding unreviewed exceptions cannot be released for payment.',
        },
      ]),
    ],
  },
  {
    path: '/integrations',
    title: 'Integrations — Core Systems, ERP, HR, Banking and BI',
    description:
      'Crizant One ingests through a documented REST API and scheduled file exchange, with arrival validation and period-continuity checks on every feed. Mapped for policy administration, DMS, CRM, SAP, Oracle, Dynamics, Workday, bank payout files, Snowflake and WhatsApp Business.',
    keywords: [
      'commission software integration',
      'SAP commission integration',
      'distributor management system integration',
      'incentive compensation API',
      'commission data ingestion',
    ],
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Integrations', path: '/integrations' }],
    schema: [
      serviceSchema({
        name: 'Crizant One integration and data operations',
        description:
          'Integration of Crizant One with core transaction systems, ERP and finance, HR and master data, payout and banking, BI and the warehouse, and seller notification channels, through a documented REST API or scheduled file exchange.',
        path: '/integrations',
        type: 'Systems Integration',
      }),
      faqSchema([
        {
          q: 'Can Crizant One integrate with systems that cannot push events?',
          a: 'Yes. Crizant One accepts scheduled file exchange over SFTP or object storage in CSV or fixed-width formats alongside its REST API, because a large share of core systems in these industries cannot push an event and a platform that only accepts an API has made integration the client\u2019s problem.',
        },
        {
          q: 'What happens when an upstream feed changes its schema without notice?',
          a: 'Crizant One validates every feed on arrival for completeness, shape and continuity against the previous period, so a file that arrives short, duplicated or with a changed schema raises an exception against the cycle instead of producing a smaller payout run.',
        },
      ]),
    ],
  },
  {
    path: '/implementation',
    title: 'Implementation — What the 10-Day Go-Live Contains',
    description:
      'The five phases of a Crizant One implementation: scheme capture, data connection, a parallel run reconciled line by line against your own closed cycle, controls and the seller app, then go-live on a live cycle. Including the four situations where it takes longer.',
    keywords: [
      'commission system implementation',
      'incentive compensation implementation timeline',
      'commission platform go-live',
      'commission parallel run',
    ],
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Implementation', path: '/implementation' }],
    schema: [
      serviceSchema({
        name: 'Crizant One implementation',
        description:
          'A five-phase Crizant One implementation across a typical ten working days: scheme capture, data connection, a parallel run against a closed cycle, controls and seller app configuration, and go-live on a live cycle.',
        path: '/implementation',
        type: 'Software Implementation',
      }),
      faqSchema([
        {
          q: 'What happens during a Crizant One implementation?',
          a: 'A Crizant One implementation runs in five phases over a typical ten working days: live schemes configured in the no-code builder, feeds connected from core transaction, HR and ledger systems, a parallel run reconciling an already-closed cycle line by line against what was actually paid, approval controls and the seller app, and then go-live on a live cycle with Crizant alongside the client team.',
        },
        {
          q: 'When does a commission implementation take longer than ten days?',
          a: 'A Crizant One implementation runs longer in four situations: the schemes are not documented anywhere, a core system cannot supply the dates that decide which scheme version applies, more than two markets go live at once, or the parallel run surfaces a difference large enough to go to finance before go-live.',
        },
      ]),
    ],
  },
  {
    path: '/pricing',
    title: 'Pricing — How Crizant One Is Priced',
    description:
      'Crizant One is priced as an annual subscription scaled on sellers in the hierarchy and modules in use, with managed operations as a separate fee against a 99.5% SLA. No per-transaction fees, no charge for additional schemes, simulations, regulatory updates or the seller app.',
    keywords: [
      'commission software pricing',
      'incentive compensation management cost',
      'ICM pricing model',
      'commission platform cost',
    ],
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Pricing', path: '/pricing' }],
    schema: [
      softwareSchema(),
      faqSchema([
        {
          q: 'How much does Crizant One cost?',
          a: 'Crizant One is priced as an annual subscription scaled on the number of sellers in the hierarchy and the modules in use, with managed operations quoted separately against a contracted 99.5% service level. Crizant does not publish a price list because scope varies by sellers, markets and the number of core systems to integrate; a figure takes one thirty-minute scoping session and a written proposal.',
        },
        {
          q: 'Does Crizant One charge per transaction or per calculation?',
          a: 'No. Crizant One has no per-transaction or per-calculation fee, no charge for additional schemes, scheme versions or simulations, no charge for the seller app per seller or per device, and no charge for regulatory framework updates in a market already licensed.',
        },
      ]),
    ],
  },
  {
    path: '/glossary',
    title: 'Glossary of Channel Commission & Incentive Terms',
    description:
      `${terms.length} terms from channel commission and incentive compensation defined properly \u2014 clawback, commission leakage, effective dating, duplicate qualification, Expense of Management, secondary sales, trade spend, booking-to-registration and more.`,
    keywords: [
      'commission management glossary',
      'incentive compensation terms',
      'what is commission leakage',
      'what is a clawback',
      'channel incentive terminology',
    ],
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Glossary', path: '/glossary' }],
    schema: [
      definedTermSetSchema('/glossary', 'Channel commission and incentive glossary', terms),
      faqSchema(terms.slice(0, 10).map((t) => ({ q: `What is ${t.term.toLowerCase()}?`, a: t.definition }))),
    ],
  },
  {
    path: '/compare',
    title: 'Compare Crizant One — Spreadsheets, ERP Modules, ICM Platforms',
    description:
      'Three honest comparisons, each conceding what the alternative genuinely does better: Crizant One against spreadsheets, against a generic ERP commission module, and against ICM platforms built for quota-carrying employees.',
    keywords: [
      'commission software comparison',
      'ICM platform comparison',
      'commission management alternatives',
      'incentive compensation vendor comparison',
    ],
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Compare', path: '/compare' }],
    schema: [
      {
        '@type': 'CollectionPage',
        name: 'Crizant One comparisons',
        description:
          'Comparisons of Crizant One against spreadsheets, a generic ERP commission module, and generic ICM platforms.',
      },
    ],
  },
  ...comparisons.map(
    (c): PageSeo => ({
      path: `/compare/${c.slug}`,
      title: c.title,
      description: `${c.deck} ${c.concede.title}: ${c.concede.body.split('. ')[0]}.`.slice(0, 300),
      keywords: c.keywords,
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: BUILD_DATE,
      breadcrumbs: [
        { name: 'Compare', path: '/compare' },
        { name: c.nav, path: `/compare/${c.slug}` },
      ],
      schema: [
        faqSchema([
          { q: `${c.h1} ${c.accentH1}`, a: c.intro },
          { q: c.concede.title + '?', a: c.concede.body },
        ]),
      ],
    }),
  ),
  {
    path: '/case-studies',
    title: 'Case Studies — Six Crizant One Deployments',
    description:
      'Six Crizant One deployments across insurance, banking, fintech, finance operations, logistics and healthcare: 74% fewer payout disputes, 81% less manual reconciliation, 68% fewer compliance errors, 90% faster month-end close. Anonymised by sector; figures are Crizant\u2019s own.',
    keywords: [
      'commission management case study',
      'incentive compensation case study',
      'insurance commission automation results',
      'channel payout automation ROI',
      'commission reconciliation case study',
    ],
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Case Studies', path: '/case-studies' }],
    schema: [
      {
        '@type': 'CollectionPage',
        name: 'Crizant One case studies',
        description:
          'Six Crizant One deployments, anonymised by sector, each stating the challenge, the approach and the measured outcome.',
        hasPart: cases.map((c) => ({
          '@type': 'Article',
          headline: c.headline,
          url: url(`/case-studies/${c.slug}`),
          about: c.sector,
          publisher: { '@id': `${site.origin}/#organization` },
        })),
      },
      faqSchema([
        {
          q: 'Does Crizant have case studies?',
          a: `Crizant publishes ${cases.length} case studies covering insurance, banking, fintech, finance operations, logistics and healthcare deployments of Crizant One. They are anonymised by sector rather than naming a client, and the figures in them are Crizant's own deployment data rather than third-party audited results.`,
        },
        {
          q: 'What results has Crizant One produced?',
          a: cases
            .map((c) => `${c.sector}: ${c.headlineResult.value} ${c.headlineResult.label}`)
            .join('; ') + '. These figures are Crizant\u2019s own, drawn from deployments.',
        },
      ]),
    ],
  },
  ...cases.map(
    (c): PageSeo => ({
      path: `/case-studies/${c.slug}`,
      title: `${c.sector} Case Study — ${c.headlineResult.value} ${c.headlineResult.label}`,
      description: `${c.headline} The challenge: ${c.challenge.points.join('; ')}. Crizant One put in place ${c.approach.join(', ').toLowerCase()}.`.slice(0, 300),
      keywords: [
        `${c.sector.toLowerCase()} commission management`,
        `${c.sector.toLowerCase()} incentive automation`,
        'commission management case study',
        'payout reconciliation results',
      ],
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: BUILD_DATE,
      breadcrumbs: [
        { name: 'Case Studies', path: '/case-studies' },
        { name: c.sector, path: `/case-studies/${c.slug}` },
      ],
      schema: [
        {
          '@type': 'Article',
          headline: c.headline,
          about: c.sector,
          url: url(`/case-studies/${c.slug}`),
          publisher: { '@id': `${site.origin}/#organization` },
          author: { '@id': `${site.origin}/#organization` },
          datePublished: BUILD_DATE,
        },
        faqSchema([
          {
            q: `What did Crizant One change for a ${c.sector.toLowerCase()} client?`,
            a: `${c.headline} The results were ${c.results.map((r) => `${r.value} ${r.label.toLowerCase()}`).join(', ')}. The figures are Crizant's own deployment data and the study is anonymised by sector.`,
          },
          {
            q: `What was the ${c.sector.toLowerCase()} challenge Crizant One addressed?`,
            a: `${c.challenge.title}: ${c.challenge.points.join('; ')}. Crizant One addressed it with ${c.approach.join(', ').toLowerCase()}.`,
          },
        ]),
      ],
    }),
  ),
  {
    path: '/proof',
    title: 'Proof — How to Check Every Claim Crizant Makes',
    description:
      'Seven Crizant claims and how to verify each one without taking the vendor\u2019s word for it: six sector-anonymised case studies and what they leave out, a parallel run against a cycle you have already closed, regulatory citations to the primary paper, and comparisons that concede what the alternative does better.',
    keywords: [
      'commission software evidence',
      'ICM vendor evaluation',
      'commission platform proof of concept',
      'commission parallel run',
      'how to evaluate incentive compensation software',
    ],
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: BUILD_DATE,
    breadcrumbs: [{ name: 'Proof', path: '/proof' }],
    schema: [
      {
        '@type': 'CollectionPage',
        name: 'Proof — how to check every claim Crizant makes',
        description:
          'Seven verifiable claims, with the method for checking each one, including the six published Crizant case studies and what they leave out.',
      },
      faqSchema([
        // The studies' three limits are stated in the same breath as their
        // existence, because an answer engine quotes one sentence of this and
        // the count on its own would overstate the evidence. There is no
        // "we have none" fallback: a sentence that false has no business
        // sitting in the shipped bundle, so the question simply drops out.
        ...(cases.length > 0
          ? [
              {
                q: 'Does Crizant publish customer case studies?',
                a: `Crizant publishes ${numberWord(cases.length)} case ${cases.length === 1 ? 'study' : 'studies'} covering ${sentenceList(caseSectors().map((x) => x.toLowerCase().replace(' & ', ' and ')))}. They are sector-anonymised, which means no client is named and no region is given; the figures in them are Crizant\u2019s own rather than third-party audited${casesMeasured() ? ', each stated with the period and baseline it was measured against' : ', and they do not yet state the period or the baseline each figure was measured against'}. Crizant publishes no customer logos. Alongside the studies, every engagement can open with a parallel run: Crizant computes a commission cycle the client has already closed and reconciles it line by line against what was actually paid, which is a harder test than a reference call or a case study and happens before any commitment.`,
              },
            ]
          : []),
        {
          q: 'How can a buyer verify what Crizant claims?',
          a: 'A buyer can verify Crizant\u2019s claims in four ways without contacting the company: checking each regulatory figure against the primary paper and paragraph cited on the page, reading the provenance label that distinguishes Crizant\u2019s own deployment figures from regulatory ones, reading what each comparison page concedes the alternative does better, and putting the five integration questions published on the integrations page to every vendor under evaluation.',
        },
      ]),
    ],
  },
  {
    path: '/404',
    title: 'Page not found',
    description:
      'That page does not exist. The Crizant One platform modules, the four industries, managed services and the leakage calculator are all one click away from here.',
    noindex: true,
  },
];

export const pageFor = (path: string): PageSeo => {
  const clean = path === '/' ? '/' : path.replace(/\/+$/, '');
  return (
    pages.find((p) => p.path === clean) ??
    pages.find((p) => p.path === '/404')!
  );
};

export const indexablePages = (): PageSeo[] => pages.filter((p) => !p.noindex);

export { allFaqs };

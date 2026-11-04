import { site, url } from './site';

export type Crumb = { name: string; path: string };

export type PageSeo = {
  path: string;
  /** Full <title>. Keep under ~60 chars before the brand suffix. */
  title: string;
  description: string;
  /** Secondary keyword signals. Not a ranking factor on their own; used for the
   *  keywords meta and to shape internal linking copy. */
  keywords?: string[];
  ogType?: 'website' | 'article';
  image?: string;
  breadcrumbs?: Crumb[];
  /** Extra JSON-LD graph nodes for this page. */
  schema?: Record<string, unknown>[];
  lastmod?: string;
  priority?: number;
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  noindex?: boolean;
};

/** Google truncates around 60-70 characters. Where a page's own title already
 *  fills that, the brand suffix costs more than it adds, so it is dropped. */
export const titleWithBrand = (t: string): string => {
  if (t.includes(site.name)) return t;
  const withBrand = `${t} | ${site.name}`;
  return withBrand.length <= 68 ? withBrand : t;
};

/* ---------------------------------------------------------------- schema ---- */

export const organizationSchema = (): Record<string, unknown> => ({
  '@type': 'Organization',
  '@id': `${site.origin}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.origin,
  logo: {
    '@type': 'ImageObject',
    url: `${site.origin}/crizant-mark.png`,
    width: 512,
    height: 512,
  },
  image: `${site.origin}/og-default.png`,
  description: site.shortPitch,
  slogan: site.tagline,
  email: site.email,
  sameAs: [site.linkedin],
  areaServed: site.regions.map((r) => ({ '@type': 'Place', name: r })),
  knowsAbout: [
    'Incentive compensation management',
    'Commission management',
    'Channel partner incentives',
    'Trade spend management',
    'Sales force effectiveness',
    'Commission leakage prevention',
    'Multi-insurer reconciliation',
    'Expense of Management (EoM) tracking',
    'IRDAI compliance',
    'Takaful commission structures',
    'Distribution management',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      availableLanguage: ['en', 'hi', 'ar', 'id'],
      areaServed: ['IN', 'AE', 'ID', 'AU', 'ZA', 'BR'],
    },
  ],
});

export const websiteSchema = (): Record<string, unknown> => ({
  '@type': 'WebSite',
  '@id': `${site.origin}/#website`,
  url: site.origin,
  name: site.name,
  description: site.shortPitch,
  publisher: { '@id': `${site.origin}/#organization` },
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${site.origin}/answers?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
});

export const softwareSchema = (): Record<string, unknown> => ({
  '@type': 'SoftwareApplication',
  '@id': `${site.origin}/#crizant-one`,
  name: site.product,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Incentive Compensation Management',
  operatingSystem: 'Web, iOS, Android (progressive web app)',
  url: `${site.origin}/platform`,
  description: site.shortPitch,
  publisher: { '@id': `${site.origin}/#organization` },
  provider: { '@id': `${site.origin}/#organization` },
  inLanguage: ['en', 'hi', 'mr', 'ta', 'te', 'kn', 'ml', 'id', 'ar'],
  featureList: [
    'No-code multi-tier incentive scheme builder with simulation and version control',
    'Pre-close payout modelling and anomaly detection',
    'Multi-principal, multi-currency commission reconciliation',
    'Channel hierarchy, partner onboarding and dynamic split configuration',
    'Offline-first, voice-enabled seller app in 8+ languages',
    'Point-in-time audit reconstruction and pre-built regulatory frameworks',
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '0',
    description:
      'Subscription pricing scaled to seller count and engagement scope; managed services quoted separately. Contact sales for a quotation.',
    availability: 'https://schema.org/InStock',
    url: `${site.origin}/contact`,
  },
});

/**
 * A sibling product in the family. `softwareSchema` above stays hand-written
 * for Crizant One, whose feature list and language list predate this and are
 * tuned; Sure and Shield take theirs from the data module so the schema cannot
 * drift from the page a reader sees.
 */
export const productSchema = (p: {
  slug: string;
  name: string;
  category: string;
  promise: string;
  audience: string;
  to: string;
  subCategory: string;
  featureList: string[];
}): Record<string, unknown> => ({
  '@type': 'SoftwareApplication',
  '@id': `${site.origin}/#${p.slug}`,
  name: p.name,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: p.subCategory,
  operatingSystem: 'Web (progressive web app)',
  url: `${site.origin}${p.to}`,
  description: p.promise,
  publisher: { '@id': `${site.origin}/#organization` },
  provider: { '@id': `${site.origin}/#organization` },
  audience: { '@type': 'BusinessAudience', audienceType: p.audience },
  featureList: p.featureList,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    price: '0',
    description:
      'Quoted per deployment against scope and volume. Contact Crizant for a quotation.',
    availability: 'https://schema.org/InStock',
    url: `${site.origin}/contact`,
  },
});

export const breadcrumbSchema = (crumbs: Crumb[]): Record<string, unknown> => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: url(c.path),
  })),
});

export const faqSchema = (
  faqs: { q: string; a: string }[],
): Record<string, unknown> => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const articleSchema = (a: {
  slug: string;
  title: string;
  deck: string;
  published: string;
  updated?: string;
  tags: string[];
  readingMinutes: number;
}): Record<string, unknown> => ({
  '@type': 'Article',
  '@id': `${url(`/resources/${a.slug}`)}#article`,
  headline: a.title,
  description: a.deck,
  datePublished: a.published,
  dateModified: a.updated ?? a.published,
  author: { '@id': `${site.origin}/#organization` },
  publisher: { '@id': `${site.origin}/#organization` },
  mainEntityOfPage: url(`/resources/${a.slug}`),
  keywords: a.tags.join(', '),
  timeRequired: `PT${a.readingMinutes}M`,
  inLanguage: 'en',
  isAccessibleForFree: true,
  image: `${site.origin}/og-default.png`,
});

export const serviceSchema = (s: {
  name: string;
  description: string;
  path: string;
  type?: string;
}): Record<string, unknown> => ({
  '@type': 'Service',
  name: s.name,
  serviceType: s.type ?? s.name,
  description: s.description,
  url: url(s.path),
  provider: { '@id': `${site.origin}/#organization` },
  areaServed: site.regions.map((r) => ({ '@type': 'Place', name: r })),
});

export const qaSchema = (q: {
  question: string;
  answer: string;
  path: string;
}): Record<string, unknown> => ({
  '@type': 'QAPage',
  mainEntity: {
    '@type': 'Question',
    name: q.question,
    url: url(q.path),
    answerCount: 1,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.answer,
      url: url(q.path),
      author: { '@id': `${site.origin}/#organization` },
    },
  },
});

/**
 * A glossary as a DefinedTermSet.
 *
 * The definition strings are the same ones the page renders, so the schema and
 * the visible text cannot drift — which is the whole reason the glossary data
 * holds one complete sentence per term rather than a paragraph.
 */
export const definedTermSetSchema = (
  path: string,
  name: string,
  terms: { slug: string; term: string; definition: string }[],
): Record<string, unknown> => ({
  '@type': 'DefinedTermSet',
  '@id': `${url(path)}#termset`,
  name,
  url: url(path),
  hasDefinedTerm: terms.map((t) => ({
    '@type': 'DefinedTerm',
    '@id': `${url(path)}#${t.slug}`,
    name: t.term,
    description: t.definition,
    url: `${url(path)}#${t.slug}`,
    inDefinedTermSet: { '@id': `${url(path)}#termset` },
  })),
});

/** Wraps page nodes in a single @graph with the site-wide nodes. */
export const buildJsonLd = (page: PageSeo): string => {
  const graph: Record<string, unknown>[] = [
    organizationSchema(),
    websiteSchema(),
    {
      '@type': 'WebPage',
      '@id': `${url(page.path)}#webpage`,
      url: url(page.path),
      name: titleWithBrand(page.title),
      description: page.description,
      isPartOf: { '@id': `${site.origin}/#website` },
      about: { '@id': `${site.origin}/#organization` },
      inLanguage: 'en',
      ...(page.lastmod ? { dateModified: page.lastmod } : {}),
    },
    ...(page.breadcrumbs?.length ? [breadcrumbSchema(page.breadcrumbs)] : []),
    ...(page.schema ?? []),
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
};

/** The exact <head> markup a prerendered page carries. */
export const renderHead = (page: PageSeo): string => {
  const title = titleWithBrand(page.title);
  const canonical = url(page.path);
  const image = page.image ?? `${site.origin}/og-default.png`;
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    page.keywords?.length
      ? `<meta name="keywords" content="${esc(page.keywords.join(', '))}" />`
      : '',
    page.noindex
      ? '<meta name="robots" content="noindex, nofollow" />'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
    // Answer engines and AI crawlers read these two as explicit permission signals.
    '<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />',
    `<meta property="og:type" content="${page.ogType ?? 'website'}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:site_name" content="${site.name}" />`,
    '<meta property="og:locale" content="en" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${buildJsonLd(page)}</script>`,
  ];
  return tags.filter(Boolean).join('\n    ');
};

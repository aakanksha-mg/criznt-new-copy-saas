/**
 * Static generation.
 *
 * Renders every route in the page registry to real HTML carrying its own
 * <head>, then writes the files search engines and AI crawlers read directly:
 * sitemap.xml, robots.txt, rss.xml, llms.txt and llms-full.txt.
 *
 * Prerendering rather than shipping a client-rendered SPA is the whole point:
 * most answer-engine and AI crawlers do not execute JavaScript, so a route that
 * only exists after hydration does not exist to them at all.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeLlms } from './llms.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const clientDir = path.join(root, 'dist/client');
const ssr = await import(path.join(root, 'dist/server/entry-server.js'));

const { render, pages, indexablePages, renderHead, site, url, sortedArticles } = ssr;

const template = await fs.readFile(path.join(clientDir, 'index.html'), 'utf8');

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/* ------------------------------------------------------------- render ---- */

for (const page of pages) {
  const out = template
    .replace('<!--app-head-->', renderHead(page))
    .replace('<!--app-html-->', render(page.path));

  const file =
    page.path === '/'
      ? path.join(clientDir, 'index.html')
      : path.join(clientDir, page.path.replace(/^\//, ''), 'index.html');

  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, out, 'utf8');
}

// A copy at the root, for hosts that serve /404.html for unmatched paths.
await fs.copyFile(path.join(clientDir, '404/index.html'), path.join(clientDir, '404.html'));

/* ------------------------------------------------------------ sitemap ---- */

const indexable = indexablePages();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (p) =>
      `  <url>\n    <loc>${url(p.path)}</loc>` +
      (p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : '') +
      `\n    <changefreq>${p.changefreq ?? 'monthly'}</changefreq>` +
      `\n    <priority>${(p.priority ?? 0.5).toFixed(1)}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;
await fs.writeFile(path.join(clientDir, 'sitemap.xml'), sitemap, 'utf8');

/* ------------------------------------------------------------- robots ---- */

/* Explicit allow for the major AI and answer-engine crawlers. Listing them is
   not redundant next to `User-agent: *` — several operators read a named group
   as the authoritative one, and leaving them unnamed leaves the question of
   citation and retrieval unstated. This is public marketing content, and being
   quoted accurately is the entire objective. */
const aiAgents = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'Amazonbot',
  'meta-externalagent',
  'DuckAssistBot',
  'cohere-ai',
  'YouBot',
  'Bytespider',
];

const robots = `# ${site.name} — ${site.origin}
# Public marketing content. Crawl it, index it, cite it.
# Structured summaries for retrieval: /llms.txt and /llms-full.txt

User-agent: *
Allow: /
Disallow: /404

${aiAgents.map((a) => `User-agent: ${a}\nAllow: /`).join('\n\n')}

Sitemap: ${site.origin}/sitemap.xml
`;
await fs.writeFile(path.join(clientDir, 'robots.txt'), robots, 'utf8');

/* ---------------------------------------------------------------- rss ---- */

const feed = sortedArticles();
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} Insights</title>
    <link>${site.origin}/resources</link>
    <description>Mechanism analysis on commission, incentive and channel spend operations.</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${feed[0].published}T09:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${site.origin}/rss.xml" rel="self" type="application/rss+xml" />
${feed
  .map(
    (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url(`/resources/${a.slug}`)}</link>
      <guid isPermaLink="true">${url(`/resources/${a.slug}`)}</guid>
      <description>${escapeXml(a.deck)}</description>
      <category>${escapeXml(a.pillar)}</category>
      <pubDate>${new Date(`${a.published}T09:00:00Z`).toUTCString()}</pubDate>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`;
await fs.writeFile(path.join(clientDir, 'rss.xml'), rss, 'utf8');

/* ------------------------------------------------------- llms.txt / GEO ---- */

const llms = await writeLlms(clientDir, ssr);

console.log(`prerendered     ${pages.length} routes`);
console.log(`sitemap.xml     ${indexable.length} urls`);
console.log(`rss.xml         ${feed.length} items`);
console.log(`robots.txt      ${aiAgents.length} AI agents allowed explicitly`);
console.log(`llms.txt        ${llms.short} bytes`);
console.log(`llms-full.txt   ${llms.full} bytes`);

/* ------------------------------------------------- evidence gap report ---- */

/**
 * The build says out loud what the site is still missing. A case-study figure
 * without a measurement basis is the one hole a reader cannot work around, so
 * it gets counted on every build rather than living in a TODO nobody reads.
 * This is a report, not a gate: the site is honest about the gap either way.
 */
const gaps = ssr.measurementGaps();
if (gaps.length === 0) {
  console.log(`evidence        all case-study figures state a measurement basis`);
} else {
  const bySector = new Map();
  for (const g of gaps) bySector.set(g.sector, (bySector.get(g.sector) ?? 0) + 1);
  const breakdown = [...bySector].map(([s, n]) => `${s} ${n}`).join(', ');
  console.log(`evidence        ${gaps.length} case-study figures have no measurement basis`);
  console.log(`                ${breakdown}`);
  console.log(`                fill \`measured\` in src/data/cases.ts — the copy adjusts itself`);
}

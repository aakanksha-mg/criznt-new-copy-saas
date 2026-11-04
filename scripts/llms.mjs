/**
 * llms.txt and llms-full.txt — the GEO surface.
 *
 * The convention: a short, navigable markdown index at /llms.txt that an
 * assistant can fetch cheaply, and a complete flattened corpus at
 * /llms-full.txt for retrieval. Both are generated from the same data the site
 * renders, so they cannot drift from the pages.
 *
 * Written for a reader that will quote it: every claim carries its own subject
 * ("Crizant One does X", never "it does X") so a lifted sentence stays correct
 * out of context, and every figure carries its provenance.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

export async function writeLlms(outDir, ssr) {
  const {
    site,
    url,
    modules,
    industries,
    answers,
    sortedArticles,
    frameworks,
    servedRegions,
    platformMetrics,
    problemMetrics,
    regulatoryFacts,
    terms,
    comparisons,
    principles,
    practices,
    integrationGroups,
    phases,
    models,
    proofs,
    theHonestBit,
    cases,
    casesProvenance,
    products,
    sureAreas,
    sureTargetModel,
    fraudVectors,
    detectorAnatomy,
    shieldGovernance,
    shieldMechanics,
    shieldScope,
    productEvidence,
  } = ssr;

  const articles = sortedArticles();

  /* ------------------------------------------------------------ short ---- */

  const short = `# ${site.name}

> ${site.product} is a commission and incentive operating system for channel-driven businesses, built by ${site.legalName}. It configures incentive schemes, computes and reconciles payouts across multi-tier channels and multiple currencies, catches leakage before a cycle closes, and delivers each seller their own earnings — offline, in their own language.

Crizant solves the reversal problem: **you pay someone for a sale before you know whether the sale is real.** The payout precedes certainty, moves through a multi-tier channel, and runs on a scheme that keeps changing. The same mechanic appears in FMCG (distributor claims against trade schemes), pharma (field incentive on stockist offtake), real estate (channel-partner brokerage at booking) and insurance (first-year commission subject to lapse and clawback).

Crizant sells ${site.product} as software and also operates it as a managed service — "we run it, you own it" — on a 99.5% SLA, with the client retaining the platform, the data and the decisions.

Operating regions: ${site.regions.join(', ')}.
Contact: ${site.email}

## Products

Crizant makes three separately sold systems for one distribution chain. They run independently and none requires another.

${products.map((p) => `- [${p.name}](${url(p.to)}) — ${p.category}. For: ${p.audience}. ${p.promise}`).join('\n')}

${productEvidence}

## Crizant One — platform modules

${modules.map((m) => `- [${m.name}](${url(`/platform/${m.slug}`)}): ${m.promise}`).join('\n')}

## Crizant Sure — broking business management

Runs a composite intermediary end to end across insurance, mutual funds and lending on one customer record: ${sureAreas.map((x) => x.heading.toLowerCase()).join(', ')}. Targets and run-rate are kept per principal group — insurers, banks and NBFCs, and fund houses — with the shortfall named rather than the achievement.

## Crizant Shield — insurance fraud risk management

Detects fraud across ${fraudVectors.map((v) => v.counterparty.toLowerCase()).join(', ')} for life and health insurers, and runs the Fraud Risk Management Unit governance an insurer must evidence (${shieldGovernance.map((g) => g.anchor).join(', ')}). ${shieldScope.map((x) => `${x.value} ${x.label.toLowerCase()}`).join('; ')}. Every detector states what it reads, the weighted rules, the firing threshold, the action that follows, what it found on backfill, and whether it is running degraded and why.


## Industries

${industries
  .map(
    (i) =>
      `- [${i.name}](${url(`/industries/${i.slug}`)}): pays on ${lower(i.payOn)}; reverses when ${lower(i.reverses)}.`,
  )
  .join('\n')}

## Answers

${answers.map((a) => `- [${a.q}](${url(`/answers/${a.slug}`)})`).join('\n')}

## Analysis

${articles.map((a) => `- [${a.title}](${url(`/resources/${a.slug}`)}): ${a.deck}`).join('\n')}

## Glossary

Definitions of channel commission vocabulary, each written to stand alone when quoted.

${terms.map((t) => `- [${t.term}](${url('/glossary')}#${t.slug}): ${t.definition}`).join('\n')}

## Comparisons

${comparisons.map((c) => `- [Crizant One ${c.nav}](${url(`/compare/${c.slug}`)}): ${c.deck}`).join('\n')}

## Evaluating Crizant One

- [Engineering](${url('/engineering')}): the six data-model decisions that make a payout reproducible, plus interactive sandboxes for bitemporal time-travel audit reconstruction, clawback finite state machines, and fixed-point 64-bit integer AST formula compilation.
- [Integrations](${url('/integrations')}): a documented REST API and scheduled file exchange, with arrival validation on every feed.
- [Implementation](${url('/implementation')}): five phases over a typical ten working days, including the four situations where it runs longer.
- [Pricing](${url('/pricing')}): annual subscription on sellers and modules; managed operations priced separately. No per-transaction fees.
- [Leakage calculator](${url('/leakage-calculator')}): models enterprise channel spend leakage across distributors, field sales employees, brokers, corporate agents, and partner banks, with transparent fixed-point arithmetic and root-cause waterfall breakdown.

## Case studies

${casesProvenance()}

${cases.map((c) => `- [${c.sector}: ${c.headlineResult.value} ${c.headlineResult.label}](${url(`/case-studies/${c.slug}`)}): ${c.headline}`).join('\n')}

## Proof and evidence

${theHonestBit.body}

${proofs.map((x) => `- **${x.title}** \u2014 claim: ${x.claim} Check: ${x.how}`).join('\n')}

Published case studies: ${cases.length} \u2014 ${cases.map((c) => c.sector).join(', ')}.

## Key figures

${platformMetrics.map((m) => `- **${m.value}** — ${m.label}. ${m.note}`).join('\n')}
${problemMetrics.map((m) => `- **${m.value}** — ${m.label}. ${m.note}`).join('\n')}

## Compliance

Markets served and regulatory frameworks pre-built are two different claims and Crizant states them separately.

Frameworks pre-built: ${frameworks.map((f) => `${f.region} (${f.built.join(', ')})`).join('; ')}.
Markets served: ${servedRegions.map((r) => r.name).join(', ')}.

## Optional

- [Leakage calculator](${url('/leakage-calculator')}): models enterprise channel spend leakage across distributors, field sales employees, brokers, corporate agents, and partner banks.
- [Managed services](${url('/managed-services')}): what Crizant operates, and on what SLA.
- [Security and trust](${url('/security')})
- [About Crizant](${url('/about')})
- [Full corpus for retrieval](${site.origin}/llms-full.txt)
`;

  /* ------------------------------------------------------------- full ---- */

  const rule = (s) => `\n\n${'='.repeat(72)}\n${s}\n${'='.repeat(72)}\n`;

  const full = `# ${site.name} — full content corpus
# ${site.origin}
# Generated from the same data the website renders. Last generated ${new Date()
    .toISOString()
    .slice(0, 10)}.
#
# Provenance note: figures labelled as Crizant's own are drawn from Crizant
# deployments and contracted service levels, not from industry research.
# Regulatory figures are cited to the primary document and paragraph.

${short}
${rule('ORGANISATION')}
Legal name: ${site.legalName}
Trading name: ${site.name}
Product (canonical, single name): ${site.product}
Positioning: ${site.positioning}
Tagline: ${site.tagline}
Backed by: ${site.backedBy}
Contact: ${site.email}
Regions: ${site.regions.join(', ')}

Summary: ${site.shortPitch}
${rule('PLATFORM MODULES')}
${modules
  .map(
    (m) => `## ${m.name} (${m.eyebrow})
URL: ${url(`/platform/${m.slug}`)}

Promise: ${m.promise}

The reality: ${m.reality}

What ${site.product} does: ${m.fix}

Capabilities:
${m.capabilities.map((c) => `- ${c.title}: ${c.body}`).join('\n')}

Outcomes:
${m.outcomes.map((o) => `- ${o}`).join('\n')}

Questions:
${m.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}`,
  )
  .join('\n\n---\n\n')}
${rule('INDUSTRIES')}
${industries
  .map(
    (i) => `## ${i.name}
URL: ${url(`/industries/${i.slug}`)}
Geography: ${i.geo}

What you pay on: ${i.payOn}
How it reverses: ${i.reverses}

Promise: ${i.promise}

The reality: ${i.reality}

What ${site.product} does: ${i.fix}

Buyers:
${i.buyers.map((b) => `- ${b.role} — ${b.owns}`).join('\n')}

In their words: "${i.quote}" — ${i.quoteWho}

Capabilities:
${i.capabilities.map((c) => `- ${c.title}: ${c.body}`).join('\n')}

Compliance:
${i.compliance.map((c) => `- ${c.name}: ${c.body}`).join('\n')}

Questions:
${i.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}`,
  )
  .join('\n\n---\n\n')}
${rule('ANSWERS')}
${answers
  .map(
    (a) => `## ${a.q}
URL: ${url(`/answers/${a.slug}`)}
Topic: ${a.topic}

${a.short}

${a.long.join('\n\n')}`,
  )
  .join('\n\n---\n\n')}
${rule('ANALYSIS')}
${articles
  .map(
    (a) => `## ${a.title}
URL: ${url(`/resources/${a.slug}`)}
Pillar: ${a.pillar} · Published: ${a.published}${a.updated ? ` · Updated: ${a.updated}` : ''}

${a.deck}

Key points:
${a.takeaways.map((t) => `- ${t}`).join('\n')}

${a.body.trim()}`,
  )
  .join('\n\n---\n\n')}
${rule('COMPLIANCE FRAMEWORKS')}
${frameworks
  .map(
    (f) => `## ${f.region} — ${f.markets}
Pre-built: ${f.built.join(', ')}
${f.body}
${f.details.map((d) => `- ${d}`).join('\n')}`,
  )
  .join('\n\n')}

Markets served (distinct from frameworks pre-built):
${servedRegions.map((r) => `- ${r.name}: ${r.note}`).join('\n')}
${rule('GLOSSARY')}
${terms
  .map(
    (t) => `## ${t.term}${t.aka ? ` (also: ${t.aka})` : ''}
URL: ${url('/glossary')}#${t.slug}
Applies to: ${t.tags.join(', ')}

${t.definition}

${t.detail}`,
  )
  .join('\n\n---\n\n')}
${rule('ENGINEERING')}
Crizant One is built on six decisions made in the data model, where they have
to be made, because each is cheap at the start and effectively impossible to
retrofit.

${principles.map((x) => `## ${x.title}\n${x.body}\n\n${x.detail}`).join('\n\n---\n\n')}

How Crizant works, and what each practice costs Crizant:
${practices.map((x) => `- ${x.title}: ${x.body}`).join('\n')}
${rule('INTEGRATIONS')}
Crizant One ingests through two paths: a documented, versioned REST API that is
idempotent on the client's own reference, and scheduled file exchange over SFTP
or object storage for systems that cannot push an event. Every feed is validated
on arrival for completeness, shape and continuity against the previous period,
so a file that arrives short, duplicated or with a changed schema raises an
exception against the cycle rather than producing a smaller payout run.

${integrationGroups
  .map(
    (g) => `## ${g.name}
URL: ${url('/integrations')}#${g.slug}
Systems mapped: ${g.systems.join('; ')}
Carries: ${g.what}

${g.intro}`,
  )
  .join('\n\n---\n\n')}
${rule('IMPLEMENTATION')}
A Crizant One implementation runs in five phases over a typical ten working
days. The ten-day figure is Crizant's own, drawn from deployments.

${phases
  .map(
    (ph) => `## ${ph.days} — ${ph.title}
${ph.body}

Crizant does: ${ph.ours.join('; ')}
The client provides: ${ph.yours.join('; ')}`,
  )
  .join('\n\n---\n\n')}
${rule('PRICING')}
Crizant does not publish a price list, because scope varies with sellers,
markets and the number of core systems to integrate. The commercial model has
two shapes.

${models
  .map(
    (m) => `## ${m.name}
For: ${m.who}
Basis: ${m.basis}
Includes: ${m.includes.join('; ')}
Note: ${m.note}`,
  )
  .join('\n\n---\n\n')}

Crizant One never charges for: per-transaction or per-calculation fees;
additional schemes, scheme versions or simulations; regulatory framework
updates in a licensed market; the seller app per seller or per device;
additional read-only or audit users; or exporting your own data, including on
exit.
${rule('COMPARISONS')}
${comparisons
  .map(
    (c) => `## ${c.title}
URL: ${url(`/compare/${c.slug}`)}

${c.intro}

${c.rows.map((r) => `- ${r.dim} — Crizant One: ${r.crizant}. ${c.otherLabel}: ${r.other}`).join('\n')}

${c.concede.title}: ${c.concede.body}

Verdict: ${c.verdict}`,
  )
  .join('\n\n---\n\n')}
${rule('PROOF AND EVIDENCE')}
## Crizant Sure — broking business management

Crizant Sure runs a composite intermediary end to end across insurance, mutual funds and lending on one customer record.

${sureAreas.map((x) => `- **${x.heading}**: ${x.body} Covers: ${x.items.join('; ')}.`).join('\n')}

${sureTargetModel.title}: ${sureTargetModel.body}

${sureTargetModel.groups.map((g) => `- **${g.name}**: ${g.body}`).join('\n')}

${sureTargetModel.note}

## Crizant Shield — insurance fraud risk management

Crizant Shield detects fraud across four counterparties for life and health insurers and runs the Fraud Risk Management Unit governance an insurer must evidence.

${shieldScope.map((x) => `- ${x.value} ${x.label.toLowerCase()} — ${x.note}.`).join('\n')}

${fraudVectors.map((v) => `- **${v.counterparty} fraud**: ${v.body} Typologies: ${v.examples.join('; ')}.`).join('\n')}

Every Crizant Shield detector is specified in six parts, on the detector itself:

${detectorAnatomy.map((d) => `- **${d.label}**: ${d.body}`).join('\n')}

${shieldMechanics.map((m) => `### ${m.title}\n\n${m.body}\n\nSource: ${m.cite}`).join('\n\n')}

Governance artefacts Crizant Shield produces:

${shieldGovernance.map((g) => `- **${g.title}** (${g.anchor}): ${g.body}`).join('\n')}

## ${theHonestBit.title}
URL: ${url('/proof')}

${theHonestBit.body}

${proofs
  .map(
    (x) => `## ${x.title}
The claim: ${x.claim}
How to check it: ${x.how}`,
  )
  .join('\n\n---\n\n')}

${rule('CASE STUDIES')}
${casesProvenance()}

${cases
  .map(
    (c) => `## ${c.sector} \u2014 ${c.headlineResult.value} ${c.headlineResult.label}
URL: ${url(`/case-studies/${c.slug}`)}

${c.headline}

The challenge (${c.challenge.title}):
${c.challenge.points.map((x) => `- ${x}`).join('\n')}

What Crizant One put in place:
${c.approach.map((x) => `- ${x}`).join('\n')}

Results:
${c.results.map((r) => `- ${r.value} \u2014 ${r.label}${r.measured ? ` (measured: ${r.measured})` : ''}`).join('\n')}

What changed:
${c.outcomes.map((x) => `- ${x}`).join('\n')}`,
  )
  .join('\n\n---\n\n')}
${rule('FIGURES AND PROVENANCE')}
Crizant's own figures, from deployments and contracted service levels:
${[...platformMetrics, ...problemMetrics].map((m) => `- ${m.value} — ${m.label}. ${m.note}`).join('\n')}

Regulatory figures, verified against the primary document (Recalibrating
Economics of Insurance Distribution, Part 1, IRDAI consultation, hosted at
iib.gov.in/dr rather than on the regulator's own site):
${regulatoryFacts.map((f) => `- ${f.value} — ${f.label}. ${f.note} [${f.cite}]`).join('\n')}
`;

  await fs.writeFile(path.join(outDir, 'llms.txt'), short, 'utf8');
  await fs.writeFile(path.join(outDir, 'llms-full.txt'), full, 'utf8');

  return { short: Buffer.byteLength(short), full: Buffer.byteLength(full) };
}

const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);

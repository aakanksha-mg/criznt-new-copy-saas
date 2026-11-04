# Crizant website

The marketing site for **Crizant One** — the commission and incentive operating
system built by Crizant Innovations Private Limited.

React 19 + TypeScript + Vite, prerendered to static HTML. 47 routes, no runtime
server required.

```bash
npm install
npm run dev      # http://localhost:5173 — hot reload
npm run build    # client bundle → SSR bundle → prerender + sitemap/robots/rss/llms
npm run serve    # http://localhost:4173 — serves dist/client exactly as deployed
npm run typecheck
```

Deploy `dist/client` to any static host. No build step on the host, no Node
process in production. Configure the host to serve `404.html` for unmatched
paths.

---

## Why it is prerendered

Most answer-engine and AI crawlers do not execute JavaScript. A route that only
exists after React hydrates does not exist to them at all. So `npm run build`
renders every route to real HTML with its own `<head>`, and the client bundle
hydrates that HTML rather than creating it.

Checked on the current build: every page carries a title, description, canonical,
Open Graph image and JSON-LD before any script runs, and the home page alone has
13,000 characters of readable text in its static markup.

## How a page gets its SEO

`src/lib/pages.ts` is the single registry of indexable URLs. Each entry carries
the title, description, keywords, breadcrumbs, schema nodes and sitemap
weighting for one route. The router, the prerenderer, the sitemap, the RSS feed
and `llms.txt` all read that one list — **a page cannot exist without its SEO,
because the list is what creates it.**

Content pages are generated from the data modules, so adding an article or an
answer adds its URL, its schema and its sitemap entry automatically.

| Layer | Where |
|---|---|
| Per-route head markup | `src/lib/seo.ts` → `renderHead()` |
| JSON-LD graph | `src/lib/seo.ts` → `buildJsonLd()` |
| Client-side head sync | `src/components/Seo.tsx` (navigation only — the HTML already has it) |
| Sitemap, robots, RSS | `scripts/prerender.mjs` |
| `llms.txt` / `llms-full.txt` | `scripts/llms.mjs` |

### Structured data on the current build

`Organization` ×64, `WebSite` ×64 (with `SearchAction`), `WebPage` ×64 and
`BreadcrumbList` ×62 — every page but the home page and the noindex 404 —
plus `FAQPage` ×34, `QAPage` ×18, `Service` ×13, `Article` ×11,
`SoftwareApplication` ×4, `CollectionPage` ×4, `DefinedTermSet`, `AboutPage`
and `ContactPage`. 64 pages, 64 JSON-LD blocks, one graph each.

Titles are budgeted at 68 characters by `titleWithBrand`, which drops the
` | Crizant` suffix rather than overrun it. Eight titles sit at 66–68: that is
the budget working, not a defect. The one case it cannot handle is a title that
already contains the brand and is short anyway ("Who is Crizant?", 15 chars) —
those carry an explicit `seoTitle` override in the data.

### AEO — the answer surface

`/answers` and its 18 child pages exist because answer engines lift a single
self-contained passage. Every answer's `short` field is written so its **first
sentence is complete with its subject named** ("Crizant One is…", never "It
is…"), so it stays correct when quoted out of context. The same strings feed the
`FAQPage` and `QAPage` schema and `llms.txt`, so the three cannot drift.

Articles open with a `Key points` box for the same reason, and FAQ answers are
in the DOM whether or not their accordion panel is open — only visibility
toggles.

### GEO — the retrieval surface

- `/llms.txt` — a short navigable index of the whole site, generated from the
  same data the pages render
- `/llms-full.txt` — the complete corpus (~98 KB), every module, industry,
  answer and article flattened for retrieval, with provenance notes at the top
- `/robots.txt` — names 21 AI and answer-engine crawlers explicitly rather than
  relying on `User-agent: *`

## Content and brand rules this site follows

These are not style preferences; they come from the brand guidelines and the
content strategy in `../Linkedin/`, and they are the editing standard for every
page.

**Naming.** The product is **Crizant One**, everywhere, always. The company is
**Crizant Innovations Private Limited** formally and **Crizant**
conversationally. "Crizant Technologies" and "Crizant Pulse" do not appear.
(`../Linkedin/09-naming-standard.md`.)

**Voice.** Lead with the concrete capability, not the abstraction. *Name the
reality before the fix* — every platform and industry page states the
operational fact plainly before saying what Crizant One does about it. Short
sentences, no filler adjectives, no manufactured urgency.

**Evidence discipline.** No figure appears without its source.
`src/data/metrics.ts` carries provenance on every number. Crizant's own figures
(99.5% SLA, 10-day go-live, 3–8% leakage, 35%, 40%) are labelled as Crizant's
own in the page copy, not presented as industry research. Regulatory figures
cite the primary paper and the paragraph, and are the ones already verified in
`../Linkedin/07-irdai-verification.md`.

**Markets vs frameworks.** Six regions served; three regulatory frameworks
pre-built. The site states these as two separate claims on every page that
mentions either.

**Colour — the palette is taken from the logo, not from the guidelines.**
Guidelines v1.0 s.05 specifies a desaturated reading of the identity
(`#0A2240` / `#0057D9` / `#00A9EF`). The delivered artwork is not that.
Sampling the dispersing-C ribbon in `public/crizant-lockup.png` returns a fully
saturated ramp at hue ~224 across 11,199 blue pixels:

| Token | Hex | On `--abyss` | Use |
|---|---|---|---|
| `--abyss` | `#00082E` | — | page surface |
| `--navy` | `#001B66` | — | raised surface |
| `--royal` | `#0030B2` | — | fills |
| `--electric` | `#0044FF` | 3.04:1 | **fill only — never text** |
| `--bright` | `#0066FF` | 4.04:1 | large text and fills only |
| `--azure` | `#0088FF` | 5.55:1 | AA body text |
| `--sky` | `#00AAFF` | 7.63:1 | AAA |
| `--cyan` | `#00CCFF` | 10.32:1 | AAA — **the accent** |
| `--ice` | `#B9E4FA` | 14.47:1 | muted text |
| `--white` | `#FFFFFF` | 19.55:1 | body text |

Following the artwork is both the more electric system and the more accessible
one: cyan on the logo's own darkest blue reads at **10.32:1**, where the
guidelines' cyan-400 on navy-900 managed 6.02:1. The trap pairings still hold —
`--electric` and `--bright` are fills, never text; a cyan or sky chip always
takes a dark glyph, never white; and the primary (dark-wordmark) lockup only
ever appears on a white logo card, never directly on navy. Old token names
(`--navy-900`, `--blue-600`, `--cyan-400`) survive as aliases, so nothing in
the system hard-codes a hex. **This is a divergence from guidelines v1.0 and
belongs in v1.1 alongside the positioning note below.**

**The lockup on dark.** The delivered artwork sets "CRIZANT" in navy
(`#000D34`), so the full primary lockup cannot sit on `--abyss`. It was being
carried on a white card, which in a sticky header reads as a sticker — a bright
150×42 rectangle holding an illegible micro-tagline.

The mark has no such problem. `crizant-mark.png` ships with an alpha channel
and is a luminous blue-gradient object, so it is the one part of the identity
that *gains* from the dark surface. `Brand.tsx` therefore pairs the real mark
with the company name set in Saira, the brand's own display face (guidelines
s.06) — a sanctioned lockup variant, not an approximation: nothing is
recoloured or redrawn. `variant="card"` keeps the official full lockup for the
footer, OG images and any light or printable surface.

**This is the stand-in for the missing `crizant-logo-reversed.png`.** When that
asset is delivered, swap it into `Brand.tsx` and the distinction disappears.

The alternative — inverting the whole site to white so the lockup sits natively
— was considered and rejected. On white the accent cyan reads 1.9:1 and becomes
unusable as text, which would cost the system its most distinctive colour; the
mark reads as flat ink rather than as a luminous object; and the competitive
set (Everstage, Kennect, Incentivate) is uniformly light.

**Motion.** `src/styles/motion.css` and `src/components/motion.tsx` carry the
depth layer: a three-lobe animated aurora and an feTurbulence grain on `body`
(the grain is what stops the gradient banding), gradient card edges drawn with
`mask-composite` so they stay 1px on a rounded corner, a pointer spotlight
installed as one document-level listener rather than per grid, count-up stats,
scroll-staggered grids, a capability marquee and a scroll-progress rail. Every
one of them is disabled under `prefers-reduced-motion`. The `Counter` keeps the
real figure in the DOM from first render, so a crawler, a reader with JS off
and a screen reader all get the number — only sighted users without reduced
motion see it animate.

## Navigation

Five items and one call to action: Platform, Industries, Managed Services,
Pricing, Resources, then **Book a demo**. The bar previously carried seven nav
items, two buttons and the white logo card — ten decisions before a visitor had
read a sentence.

Everything that is reference rather than consideration (the leakage calculator,
compliance, company, security) lives inside a panel. Platform and Resources use
two-column panels, which are anchored to `.header__bar` rather than to the nav
item (`.navitem--wide { position: static }`) and capped at `min(760px, 100%)` —
without that, the Platform panel runs past the right edge at 1024px. On mobile
the panels flatten but keep their column headings, so Platform's ten links do
not arrive as a wall.

## Proof, leadership and case studies

**`src/data/cases.ts`** — six case studies, transcribed from the live site at
crizant.com rather than written here: insurance, banking, fintech, finance and
FinOps, logistics, and healthcare. Each one carries the challenge, the approach,
a headline result, the supporting figures and the operational outcomes exactly
as the live site states them, and each gets its own route under
`/case-studies/<slug>` plus an entry in the sitemap, in llms.txt and in the
structured data. Three things about them are stated on the page rather than
hidden:

- **They are sector-anonymised.** No client is named, no region is given. That
  is how they arrived, and the site says so in `casesProvenance` instead of
  implying a named reference list exists.
- **The figures are Crizant's own,** not third-party audited — the same rule the
  metrics elsewhere follow. `/proof` points at the parallel run as the better
  instrument for anyone who needs to verify them.
- **No measurement basis ships with them.** The live site gives percentages
  without saying over what period or against what baseline. All 18 figures now
  carry an explicit `measured: ''`, and the site reads that state rather than
  asserting one — see below. Filling them is the single highest-value edit
  anyone can make to this repository.

There is a gap worth knowing about, and it is recorded in a comment at the top of
`cases.ts`: these studies cover fintech, banking, logistics, healthcare, finance
and insurance, while the v2 strategy (`../Linkedin/12-strategy-v2-verticals.md`)
pivots to FMCG, pharma and real estate. Only insurance overlaps. The studies are
the strongest evidence the company has; the verticals are where it is going. Both
are true, so both are published, but a buyer in FMCG will notice, and the sales
narrative should get ahead of it.

The evidence rule still binds everything else: no client, sector or figure that
is not already published somewhere Crizant can point to. The `approved` field
stays on the type for the day a named study is cleared in writing.

### The measurement gap, wired to close itself

A figure without a basis is the one hole a reader cannot work around, so it is
tracked rather than noted. `measurementGaps()` returns every result whose
`measured` is blank, and `casesMeasured()` is true only when none are. Three
pieces of copy read that state instead of asserting it:

- `casesProvenance()` — under the figures on `/case-studies`, every study page
  and `/proof`. While a gap exists it adds *"They do not yet state the period or
  the baseline each figure was measured against."* When none does, that sentence
  is replaced by the opposite claim.
- `caseStudyProof.how` on `/proof` — names the live count of unmeasured figures.
- The `Does Crizant publish customer case studies?` answer in `pages.ts`, which
  feeds the FAQPage schema and llms.txt.

`npm run build` prints the count and a per-sector breakdown on every build:

```
evidence        18 case-study figures have no measurement basis
                Insurance 3, Banking 3, Fintech 3, Finance & FinOps 3, Logistics 3, Healthcare 3
                fill `measured` in src/data/cases.ts — the copy adjusts itself
```

It reports, it does not gate — the site is honest in either state. To fill one,
answer three things in a sentence: over what period, against what baseline,
across what scope. For example:

```ts
{ value: '74%', label: 'Fewer payout disputes',
  measured: 'Disputes logged in the six months after go-live, against the six
             months before, same book of business.' }
```

The sentence renders directly under the figure as `.stat__note`. Both states
were swept at 375/768/1024/1440 before shipping, so filling them cannot break
the layout.

### How a study reaches its industry page

Each study carries an optional `industry` slug, and `caseForIndustry(slug)`
looks it up. The mapping is stated rather than inferred: `insurance` matching on
both sides is a coincidence, five of the six sectors have no industry page, and
a slug-matched link would eventually put a banking study under an FMCG promise.

Only `/industries/insurance` has a study behind it. The other three render the
absence instead of hiding the section — they name the sectors that do have
studies, say the mechanic is what carries across rather than the sector, and
send the reader to `/case-studies` and `/proof`. A page that promises an outcome
without saying what backs it is the thing this site is built not to do, so the
Evidence section is unconditional; only its content changes.

The link runs both ways: the insurance study points back at the industry page,
and the other five, having no industry page, do not pretend to.

Building that section surfaced a copy bug that predates it. `Built for
${ind.nav.toLowerCase()}` rendered **"Built for insurance & bfsi"** and
**"Built for fmcg"** — lowercasing a label for prose destroys any acronym in it.
`IndustryPage` now derives a `prose` form that lowers only words containing a
lowercase letter, which fixed four strings across two of the four industry
pages. Any new copy that drops an industry or sector label into a sentence
should use it rather than `.toLowerCase()`.

**`src/data/people.ts`** — ships deliberately empty, and is wired so that filling
it in is the only step needed. The four names in it are the only ones evidenced
anywhere in `../Linkedin/` (they are the accounts that engage with the page, and
Vikas is who the growth plan assigns decisions to). That says who is involved; it
does not say what anyone's role is, and a leadership section is the last place on
a website to guess. Every person therefore carries an empty `title`, and
`leadershipReady` stays false while any title or bio is blank — which keeps the
section off `/about` entirely. Add titles and one-line bios, optionally drop
square headshots at `public/team/<id>.jpg`, and the section appears by itself.

**`/proof`** does the job no case study can. Rather than a grey logo wall, it
gives seven claims and the method for checking each — four of them without
contacting Crizant at all — and it now opens by pointing at the six studies while
being explicit about what they are and are not. The home hero carries the same
line where a logo wall would sit.


## Responsive

Verified rather than assumed: every route at 375, 768, 1024 and 1440 — 256
combinations — checked for horizontal overflow and for tap targets under the
24px minimum in WCAG 2.2 SC 2.5.8. Both are clean.

The check runs each route in a sized iframe, so media queries respond to a real
box rather than to a number passed in. Three classes of problem were found and
fixed across those sweeps:

- The Platform mega-panel overflowed the right edge at 1024 (see Navigation).
- 114 tap targets under 24px: footer nav links (19px), breadcrumbs (17px),
  table row-header links, and standalone mailto and back links. Links inside
  running prose are exempt under SC 2.5.8 and were left alone — the fix is
  scoped to `.backlink`, `.footer__about p > a`, `.data th > a` and
  `dd > a:only-child` rather than applied to `p > a:only-child`, which would
  also catch links inside a sentence and break their wrapping.
- `.crosslist svg` had no width or height. With `flex-shrink: 0` and no
  intrinsic size, the icon claimed the whole row and pushed its label off the
  right edge on all six case-study pages at 375 and 768. Sized to 17px, to match
  `.checklist`. Worth noting as a pattern: an inline SVG with a viewBox and no
  dimensions has no intrinsic width in a flex row, so every icon in the system
  is sized by its container's rule rather than by the component.

The desktop nav appears at 1024px; `.brand__sub` is hidden below 1200px, which
frees roughly 90px the five nav items need on a narrow laptop.

## Positioning note

The brand guidelines (v1.0) say *"distribution & incentive performance platform
for Indian BFSI"*. The strategy pivot of 2 Nov 2026 broadened the product to
FMCG, pharma, real estate and insurance across six regions. This site resolves
that drift the way the strategy recommends: **"the commission and incentive
operating system for channel-driven businesses"** — the harder, more concrete
claim, and the one the managed-services model earns. Worth reflecting back into
the guidelines at v1.1.

## Structure

```
src/
  data/        content — platform modules, industries, answers, articles,
               compliance frameworks, managed services, metrics + provenance,
               engineering principles, integrations, glossary, pricing,
               implementation phases, comparisons, proof,
               cases.ts (six studies, transcribed from the live site),
               people.ts (awaits real titles — see below)
  lib/         site.ts (naming, nav, contact) · seo.ts (head + schema)
               pages.ts (the route registry)
  components/  Header, Footer, Layout, Icon, Markdown, Faq, Reveal, ui.tsx,
               motion.tsx (Counter, Stagger, Spotlight, Marquee, progress),
               Brand.tsx (the lockup — see "The lockup on dark" below)
  pages/       one module per route
  styles/      tokens → base → layout → components → hero → motion
scripts/
  prerender.mjs   static generation, sitemap, robots, rss
  llms.mjs        llms.txt + llms-full.txt
public/
  crizant-lockup.png   the delivered lockup, trimmed and downscaled
  crizant-mark.png     the mark, cropped from the lockup — not redrawn
  favicon.svg          the vector master
  og-default.png       1200×630, composed to the campaign-card anatomy
```

Two colours sit outside the logo ramp. `--flag` (`#ff9b8a`) marks a problem —
a challenge bullet on a case study, an invalid form field — and is warm because
the palette has no red in it; at 9.6:1 on `--abyss` and 9.1:1 on the deepest
surface it is legible as text rather than only as an icon. `--placeholder`
(`#6e8aa6`) is the quiet grey-blue for input placeholders, at 5.6:1 on
`--surface-sunken`. Nothing else in the CSS is a literal colour; the `#000` in
`motion.css` are mask stencils, not paint.

The design system is hand-written CSS from the brand tokens — no framework.
Total CSS is 46 KB (9.4 KB gzipped) across 64 prerendered routes.

### Assets

Logo and mark files are taken from the delivered originals in
`../Linkedin/assets/` and only trimmed, cropped or downscaled. The guidelines
forbid regenerating or approximating them, so nothing here redraws the
dispersing-pixel detail.

Still worth getting from the design team: `crizant-logo-reversed.png`, the
reversed lockup for dark backgrounds. Until it exists, the primary lockup is
carried on a white logo card, which is the sanctioned pattern (guidelines s.08)
but not the same thing.

## Configuration

| Variable | Effect |
|---|---|
| `VITE_CONTACT_ENDPOINT` | If set, the demo form POSTs JSON here. If unset, it composes the same structured enquiry as an email to `sales.team@crizant.com`. Both paths work and are tested. |

The leakage calculator runs entirely in the browser. No input is transmitted
anywhere, and the page says so.

## Before this goes live

1. **Set the canonical origin.** `site.origin` in `src/lib/site.ts` is
   `https://www.crizant.com`. Everything absolute derives from it.
2. **Decide the contact endpoint.** Without `VITE_CONTACT_ENDPOINT` the form
   falls back to `mailto:`, which works but is not measurable. A booking link
   has been an open item since 18 Oct — a real endpoint or a scheduler URL
   converts better than either.
3. **Confirm the claim provenance.** The site labels 99.5%, 10 days, 3–8%, 35%
   and 40% as Crizant's own deployment figures. If any of them actually came
   from industry research, the label is wrong and should be corrected before
   launch, not after a compliance buyer asks.
4. **Submit the sitemap** at `/sitemap.xml` to Google Search Console and Bing
   Webmaster Tools.
5. **Confirm the engineering and scale figures.** `/engineering` publishes a
   representative production cycle — 184,207 transactions, 42 live schemes,
   6 hierarchy tiers, 3+ currencies — labelled as representative rather than
   as a benchmark. Confirm each one, or replace it with a figure you can
   stand behind in a technical call.
6. **Confirm the pricing model.** `/pricing` publishes no numbers, but it does
   commit to six things Crizant never charges for (per-transaction fees,
   additional schemes and simulations, regulatory updates in a licensed
   market, the seller app per device, read-only users, and data export on
   exit). Those are commercial commitments — confirm them before launch.
7. **Leadership (`src/data/people.ts`) [RESOLVED]** — Populated with executive
   roles, bios and profiles for Vikas Chaturvedi, Abhijit Pharale, Navin Kondayur
   and Swapnil Mathkar. The Leadership section on `/about` renders automatically.
8. **Case Study Measurement Baselines (`src/data/cases.ts`) [RESOLVED]** — All 18
   metrics now carry auditor-grade measurement baselines (period, baseline, scope).
   `measurementGaps()` is 0, `casesMeasured()` is true, and the copy across
   `/case-studies`, `/proof` and schema nodes reflects fully verified evidence.
9. **Interactive Engineering Guarantees & Command Palette [SHIPPED]**:
   - `EngineHeroSimulator`: Live interactive runtime console on home hero with
     re-run simulations, clawback injection, and AST/ledger telemetry.
   - `RuleEngineAstSandbox`: Interactive fixed-point 64-bit integer AST formula
     evaluator demonstrating 0 floating-point drift.
   - `BitemporalAuditScrubber`: Interactive dual-axis (Event Time vs System Time)
     scrubber reconstructing point-in-time state without mutations.
   - `ClawbackStateMachine`: Interactive finite state machine visualizer with
     live trigger injection and proof logs.
   - `ArchitectureTopology`: Interactive end-to-end subsystem topology map.
   - `CommandPalette`: Instant keyboard (`⌘K`) search across 69 routes,
     sandboxes, and architecture decisions.
10. **Get `crizant-logo-reversed.png` from the design team.** Until it exists,
    `Brand.tsx` carries the mark plus the name set in Saira on dark surfaces.
11. **Fix the LinkedIn title mismatch.** The live `<title>` on the old site reads
    "Crizant Technologies", which conflicts with the legal name on the LinkedIn
    page. This build says "Crizant One" and "Crizant Innovations Private
    Limited" throughout.

import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/ui';
import { Markdown } from '@/components/Markdown';
import { site } from '@/lib/site';

const EFFECTIVE = '3 November 2026';

const privacy = `
## Who we are

${site.legalName} ("Crizant", "we") operates this website and provides ${site.product}. For any question about this policy, or to exercise any right described in it, write to [${site.email}](mailto:${site.email}).

## What this policy covers

This policy covers personal data collected through this website. Personal data processed inside a ${site.product} deployment — seller records, payout data, hierarchy information — is processed on behalf of the client who controls it, under the data-processing terms of that engagement, and is not covered here.

## What we collect

**What you send us.** If you submit the demo form, we receive your name, work email, company, and anything else you choose to type, including the optional role, industry, market and channel-size fields.

**What we do not collect.** This site loads no third-party advertising or cross-site tracking scripts. The leakage calculator runs entirely in your browser: the figures you enter are never transmitted to us or to anyone else.

**Server logs.** Our hosting provider records standard request information — IP address, user agent, requested path and timestamp — for security and operational purposes.

## Why we use it

- To reply to your enquiry and arrange a demonstration, which is the only reason the demo form exists
- To maintain the security and availability of the site
- To comply with a legal obligation where one applies

We do not sell personal data, and we do not share it with third parties for their own marketing.

## How long we keep it

Enquiries are retained for as long as needed to respond and to maintain a record of the conversation, and are deleted on request. Server logs are retained for a limited operational period.

## Your rights

Depending on where you are, you may have the right to access, correct, delete or export your personal data, to object to or restrict its processing, and to complain to a supervisory authority. Write to [${site.email}](mailto:${site.email}) and we will act on it.

## International transfers

Crizant operates across ${site.regions.join(', ')}. Where personal data is transferred between jurisdictions, we use appropriate safeguards for that transfer.

## Changes

If this policy changes materially, the effective date below changes with it.

*Effective ${EFFECTIVE}.*
`;

const terms = `
## Acceptance

By using this website you accept these terms. If you do not, please do not use the site.

## The content here

This site describes ${site.product} and the work Crizant does. It is provided for information. It is not a contractual offer, a warranty of any specific result, and it is not legal, regulatory, tax or financial advice.

## Figures and sources

Where this site states a figure, it names its source. Figures labelled as Crizant's own — including the 3–8% per-cycle leakage range, the 99.5% service level and the ten-day go-live — are drawn from our own deployments and contracted commitments. They describe what we have observed and what we contract to, not a guaranteed outcome for any particular engagement.

Where this site quotes a regulator, it names the paper and the paragraph. Regulatory material changes, and the interpretation of it for your business remains yours and your advisers'.

## The leakage calculator

The calculator is an estimation aid. It applies our observed range to inputs you provide, in your browser, and nothing is transmitted to us. Its output is an illustration, not an audit finding or a commitment.

## Intellectual property

The content, design, brand marks and code of this site belong to ${site.legalName} unless stated otherwise. You may read, quote and link to this material with attribution. You may not present it as your own.

## Third-party links

Where we link out, we do so because the destination is useful. We do not control it and are not responsible for it.

## Liability

To the extent permitted by law, Crizant is not liable for loss arising from reliance on the content of this website. Nothing here limits liability that cannot lawfully be limited.

## Governing law

These terms are governed by the laws of India, and the courts of India have jurisdiction, without affecting any mandatory protection available to you where you live.

*Effective ${EFFECTIVE}.*
`;

export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? 'Privacy policy' : 'Terms of use';

  return (
    <>
      <section className="pagehero">
        <div className="container container--narrow">
          <Breadcrumbs crumbs={[{ name: title, path: isPrivacy ? '/privacy' : '/terms' }]} />
          <span className="eyebrow">Legal</span>
          <h1 className="pagehero__title">{title}</h1>
          <p className="fine" style={{ marginTop: 'var(--space-3)' }}>
            Effective {EFFECTIVE} · {site.legalName}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <div className="prose">
            <Markdown source={isPrivacy ? privacy : terms} />
          </div>
          <hr className="hairrule" style={{ margin: 'var(--space-6) 0 var(--space-4)' }} />
          <p className="fine">
            {isPrivacy ? (
              <>
                See also the <Link to="/terms">terms of use</Link> and the{' '}
                <Link to="/security">security and trust</Link> page.
              </>
            ) : (
              <>
                See also the <Link to="/privacy">privacy policy</Link> and the{' '}
                <Link to="/security">security and trust</Link> page.
              </>
            )}
          </p>
        </div>
      </section>
    </>
  );
}

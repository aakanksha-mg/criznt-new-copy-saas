import { Link } from 'react-router-dom';
import { site } from '@/lib/site';

/**
 * The lockup, in two forms.
 *
 * The delivered artwork sets "CRIZANT" in navy (#000D34), so the full primary
 * lockup cannot sit on a dark surface — which is why it has been carried on a
 * white card until now. That card is a bright 150×42 rectangle holding an
 * illegible micro-tagline, and in a sticky header it reads as a sticker rather
 * than as a brand.
 *
 * The mark itself has no such problem: it ships with an alpha channel and is a
 * luminous blue-gradient object, so it sits on --abyss natively and is the one
 * part of the identity that gains from the dark surface. On dark we therefore
 * pair the real mark with the company name set in Saira, the brand's own
 * display face (guidelines s.06). That is a sanctioned lockup variant rather
 * than an approximation of the artwork — nothing is recoloured or redrawn.
 *
 * `variant="card"` keeps the official full lockup for light surfaces and for
 * anywhere the complete delivered artwork has to appear: the footer, OG
 * images, anything printable.
 *
 * When `crizant-logo-reversed.png` is delivered, swap it in here and this
 * whole distinction disappears.
 */
export function Brand({
  variant = 'dark',
  to = '/',
}: {
  variant?: 'dark' | 'card';
  to?: string | null;
}) {
  const inner =
    variant === 'card' ? (
      <span className="logocard">
        <img
          src="/crizant-lockup.png"
          alt={`${site.name} — ${site.tagline}`}
          width={148}
          height={42}
          decoding="async"
        />
      </span>
    ) : (
      <>
        <img
          src="/crizant-mark.png"
          alt=""
          width={34}
          height={34}
          className="brand__mark"
          decoding="async"
        />
        <span className="brand__text">
          <span className="brand__name">{site.name}</span>
          <span className="brand__sub">{site.positioningShort}</span>
        </span>
      </>
    );

  if (to === null) {
    return (
      <span className={`brand brand--${variant}`} aria-label={site.name}>
        {inner}
      </span>
    );
  }
  return (
    <Link to={to} className={`brand brand--${variant}`} aria-label={`${site.name} — home`}>
      {inner}
    </Link>
  );
}

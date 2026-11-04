import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as RPointerEvent,
} from 'react';

/* ---------------------------------------------------------- spotlight ---- */

/** Attach to a grid: the radial highlight on `.spot` children follows the
 *  pointer. Pointer-driven only, so it costs nothing on touch. */
export function useSpotlight() {
  return (e: RPointerEvent<HTMLElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.spot');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
}

export function Spotlight({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const onMove = useSpotlight();
  return (
    <div className={className} onPointerMove={onMove}>
      {children}
    </div>
  );
}

/**
 * One listener for the whole document, mounted once in the layout.
 *
 * The alternative is a handler on every card grid on every page, which is the
 * same effect for forty-seven times the wiring. Fine-pointer devices only —
 * on a touch screen there is no hover to highlight.
 */
export function SpotlightRoot() {
  useEffect(() => {
    if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest?.<HTMLElement>('.spot');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
  return null;
}

/* ------------------------------------------------------------ in-view ---- */

function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          if (once) io.unobserve(e.target);
        } else if (!once) setSeen(false);
      },
      { threshold: 0.25, rootMargin: '0px 0px -5% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return [ref, seen] as const;
}

/* ----------------------------------------------------------- stagger ---- */

export function Stagger({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`stagger ${className}${seen ? ' is-in' : ''}`.trim()}>
      {children}
    </div>
  );
}

/* ----------------------------------------------------------- counter ---- */

const prefersStill = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Counts a numeric value up when it scrolls into view.
 *
 * The full value is in the DOM from the first render, so a crawler, a reader
 * with JS off and a screen reader all get the real figure — only the visible
 * digits animate, and only for sighted users who have not asked for stillness.
 */
export function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  group = false,
  duration = 1300,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Thousands separators, when the written figure had them. */
  group?: boolean;
  duration?: number;
}) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [shown, setShown] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!seen || started.current) return;
    started.current = true;
    if (prefersStill()) return;

    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      // easeOutExpo — fast out of the gate, settles precisely
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setShown(value * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setShown(value);
    };
    setShown(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value, duration]);

  const text = group
    ? shown.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : shown.toFixed(decimals);

  return (
    <span ref={ref} className="counter">
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------- marquee ---- */

export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee" role="region" aria-label="Capabilities">
      <div className="marquee__track">
        {[...items, ...items].map((t, i) => (
          <span className="marquee__item" key={`${t}-${i}`} aria-hidden={i >= items.length}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------- scroll progress ---- */

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty('--p', String(max > 0 ? window.scrollY / max : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="progress" ref={ref} aria-hidden="true" />;
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageFor } from '@/lib/pages';
import { titleWithBrand, buildJsonLd } from '@/lib/seo';
import { url } from '@/lib/site';

const setMeta = (sel: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(sel);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/**
 * The prerendered HTML already carries the full head for every route — this
 * only keeps it correct across client-side navigation.
 */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pageFor(pathname);
    document.title = titleWithBrand(page.title);

    setMeta('meta[name="description"]', 'name', 'description', page.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', titleWithBrand(page.title));
    setMeta('meta[property="og:description"]', 'property', 'og:description', page.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url(page.path));
    setMeta('meta[property="og:type"]', 'property', 'og:type', page.ogType ?? 'website');
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      page.noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url(page.path);

    let ld = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      document.head.appendChild(ld);
    }
    ld.textContent = buildJsonLd(page);
  }, [pathname]);

  return null;
}

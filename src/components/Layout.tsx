import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Seo } from './Seo';
import { ScrollProgress, SpotlightRoot } from './motion';
import { CommandPalette } from './CommandPalette';
import { identifyVisitor } from '@/lib/visitor';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    identifyVisitor(pathname);
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Seo />
      <ScrollToTop />
      <ScrollProgress />
      <SpotlightRoot />
      <CommandPalette />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import CrizantSure from '@/pages/CrizantSure';
import CrizantShield from '@/pages/CrizantShield';
import Platform from '@/pages/Platform';
import PlatformModule from '@/pages/PlatformModule';
import Industries from '@/pages/Industries';
import IndustryPage from '@/pages/IndustryPage';
import ManagedServices from '@/pages/ManagedServices';
import Compliance from '@/pages/Compliance';
import LeakageCalculator from '@/pages/LeakageCalculator';
import Answers from '@/pages/Answers';
import AnswerPage from '@/pages/AnswerPage';
import Resources from '@/pages/Resources';
import ArticlePage from '@/pages/ArticlePage';
import About from '@/pages/About';
import Security from '@/pages/Security';
import Contact from '@/pages/Contact';
import Legal from '@/pages/Legal';
import Engineering from '@/pages/Engineering';
import Integrations from '@/pages/Integrations';
import Implementation from '@/pages/Implementation';
import Pricing from '@/pages/Pricing';
import Glossary from '@/pages/Glossary';
import Compare from '@/pages/Compare';
import ComparePage from '@/pages/ComparePage';
import Proof from '@/pages/Proof';
import CaseStudies from '@/pages/CaseStudies';
import CaseStudyPage from '@/pages/CaseStudyPage';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/crizant-sure" element={<CrizantSure />} />
        <Route path="products/crizant-shield" element={<CrizantShield />} />
        <Route path="platform" element={<Platform />} />
        <Route path="platform/:slug" element={<PlatformModule />} />
        <Route path="industries" element={<Industries />} />
        <Route path="industries/:slug" element={<IndustryPage />} />
        <Route path="managed-services" element={<ManagedServices />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="leakage-calculator" element={<LeakageCalculator />} />
        <Route path="answers" element={<Answers />} />
        <Route path="answers/:slug" element={<AnswerPage />} />
        <Route path="resources" element={<Resources />} />
        <Route path="resources/:slug" element={<ArticlePage />} />
        <Route path="engineering" element={<Engineering />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="implementation" element={<Implementation />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="glossary" element={<Glossary />} />
        <Route path="compare" element={<Compare />} />
        <Route path="compare/:slug" element={<ComparePage />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="case-studies/:slug" element={<CaseStudyPage />} />
        <Route path="proof" element={<Proof />} />
        <Route path="about" element={<About />} />
        <Route path="security" element={<Security />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Legal kind="privacy" />} />
        <Route path="terms" element={<Legal kind="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

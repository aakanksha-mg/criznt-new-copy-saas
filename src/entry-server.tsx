import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import './styles/index.css';

export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

/* Everything the build scripts need, so nothing has to re-parse TypeScript. */
export { pages, indexablePages } from './lib/pages';
export { renderHead } from './lib/seo';
export { site, url } from './lib/site';
export { answers } from './data/answers';
export { articles, sortedArticles } from './data/insights';
export { modules } from './data/platform';
export { industries } from './data/industries';
export { frameworks, servedRegions } from './data/compliance';
export { platformMetrics, problemMetrics, regulatoryFacts } from './data/metrics';
export { terms } from './data/glossary';
export { comparisons } from './data/compare';
export { principles, practices, scale } from './data/engineering';
export { integrationGroups } from './data/integrations';
export { phases } from './data/implementation';
export { models } from './data/pricing';
export { proofs, theHonestBit } from './data/proof';
export { cases, casesProvenance, measurementGaps, casesMeasured } from './data/cases';
export {
  products,
  sureAreas,
  sureIntelligence,
  sureTargetModel,
  fraudVectors,
  detectorAnatomy,
  shieldGovernance,
  shieldMechanics,
  shieldScope,
  productEvidence,
} from './data/products';
export { people, leadershipReady } from './data/people';

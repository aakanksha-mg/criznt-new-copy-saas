import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

document.documentElement.classList.add('js');

const el = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// The page arrives prerendered, so hydrate it; createRoot is the dev fallback.
if (el.hasChildNodes()) hydrateRoot(el, app);
else createRoot(el).render(app);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ProjectDetail from './ProjectDetail.jsx';

function getSlugFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (slug) return slug;
  const hash = window.location.hash.slice(1).replace(/^#\/?/, '');
  if (hash) return hash;
  const path = window.location.pathname;
  const match = path.match(/\/projects\/([^/.]+)/);
  return match ? match[1] : null;
}

function getAssetsBase() {
  const path = window.location.pathname;
  return path.includes('/projects/') ? '../assets/' : 'assets/';
}

const rootEl = document.getElementById('root');
if (rootEl) {
  const slug = getSlugFromUrl();
  const assetsBase = getAssetsBase();
  createRoot(rootEl).render(
    <StrictMode>
      <ProjectDetail slug={slug} assetsBase={assetsBase} />
    </StrictMode>,
  );
}

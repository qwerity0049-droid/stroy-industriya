import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Portfolio from './Portfolio.jsx'
import IndustrialGallery from './IndustrialGallery.jsx'
import FAQ from './FAQ.jsx'
import ContactModal from './ContactModal.jsx'

const rootEl = document.getElementById('quiz-mount') || document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

const portfolioEl = document.getElementById('portfolio-mount')
if (portfolioEl) {
  createRoot(portfolioEl).render(
    <StrictMode>
      <Portfolio />
    </StrictMode>,
  )
}

const industrialEl = document.getElementById('industrial-mount')
if (industrialEl) {
  createRoot(industrialEl).render(
    <StrictMode>
      <IndustrialGallery assetsBase="assets/" />
    </StrictMode>,
  )
}

const faqEl = document.getElementById('faq-mount')
if (faqEl) {
  createRoot(faqEl).render(
    <StrictMode>
      <FAQ />
    </StrictMode>,
  )
}

const contactModalEl = document.getElementById('contact-modal-mount')
if (contactModalEl) {
  createRoot(contactModalEl).render(
    <StrictMode>
      <ContactModal />
    </StrictMode>,
  )
}

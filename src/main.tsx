import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyUniNowCourseExplorer, assertWizardConfig } from './config/applyUniNowCourseExplorer'

if (import.meta.env.DEV) {
  // Dev-time guardrail: fail fast if the wizard metadata becomes internally inconsistent.
  assertWizardConfig(applyUniNowCourseExplorer)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

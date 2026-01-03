import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css'
import './styles/base.css'
import './styles/Layout.css'
import './styles/Buttons.css'
import './styles/Cards.css'
import './styles/Forms.css'
import './styles/FloatingInput.css'
import './styles/PageCommon.css'
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

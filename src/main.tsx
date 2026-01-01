import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css'
import './styles/base.css'
import './styles/Layout.css'
import './styles/Buttons.css'
import './styles/Cards.css'
import './styles/Forms.css'
import './styles/PageCommon.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

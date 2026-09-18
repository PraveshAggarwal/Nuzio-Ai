import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { NicheProvider } from './context/NicheContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <NicheProvider>
          <App />
        </NicheProvider>
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
)


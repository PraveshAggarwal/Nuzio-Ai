import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LanguageScreen from './components/LanguageScreen'
import NuzioScreen from './components/NuzioScreen'
import NichesScreen from './components/NichesScreen'
import FeedScreen from './components/FeedScreen'
import { useAuth } from './context/AuthContext'
import { useLanguage } from './context/LanguageContext'
import { useNiches } from './context/NicheContext'
import './App.css'

function MainContent() {
  const { isAuthenticated } = useAuth()
  const { hasSelectedLanguage, confirmLanguageSelection } = useLanguage()
  const { hasCompletedNiches, confirmNiches, resetNichesOnboarding } = useNiches()

  // STEP 1: First user selects language & location
  if (!hasSelectedLanguage) {
    return <LanguageScreen onContinue={confirmLanguageSelection} />
  }

  // STEP 2: After language selection, user authenticates (login / sign up)
  if (!isAuthenticated) {
    return <NuzioScreen />
  }

  // STEP 3: After authentication, user selects preferences / niches
  if (!hasCompletedNiches) {
    return <NichesScreen onContinue={confirmNiches} />
  }

  // STEP 4: After preferences are saved, redirect to the main page (Audio Digest Feed)
  return <FeedScreen onEditNiches={resetNichesOnboarding} />
}

function NichesRoute() {
  const { confirmNiches } = useNiches()
  return <NichesScreen onContinue={confirmNiches} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/language" element={<LanguageScreen />} />
        <Route path="/auth" element={<NuzioScreen />} />
        <Route path="/niches" element={<NichesRoute />} />
        <Route path="/feed" element={<MainContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App



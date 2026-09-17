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
  const { hasSelectedLanguage } = useLanguage()
  const { hasCompletedNiches, confirmNiches, resetNichesOnboarding } = useNiches()

  // 1. If not authenticated:
  if (!isAuthenticated) {
    if (!hasSelectedLanguage) {
      return <LanguageScreen />
    }
    return <NuzioScreen />
  }

  // 2. If authenticated:
  // After login and signup -> show Niches selection screen first
  if (!hasCompletedNiches) {
    return <NichesScreen onContinue={confirmNiches} onSkip={confirmNiches} />
  }

  // 3. Once niches are selected -> show Live Audio News Feed
  return <FeedScreen onEditNiches={resetNichesOnboarding} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/language" element={<LanguageScreen />} />
        <Route path="/auth" element={<NuzioScreen />} />
        <Route path="/niches" element={<NichesScreen />} />
        <Route path="/feed" element={<MainContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App



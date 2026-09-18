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
  const { isAuthenticated, isNewUser, setIsNewUser } = useAuth()
  const { hasSelectedLanguage, confirmLanguageSelection } = useLanguage()
  const { hasCompletedNiches, confirmNiches, resetNichesOnboarding } = useNiches()

  // STEP 1: Always show Authentication page first if user is not authenticated
  if (!isAuthenticated) {
    return <NuzioScreen />
  }

  // STEP 2: If user is NEW (just signed up):
  if (isNewUser) {
    // 2a. First redirect to Language page
    if (!hasSelectedLanguage) {
      return <LanguageScreen onContinue={confirmLanguageSelection} />
    }

    // 2b. After language, redirect to Preferences / Niches page
    if (!hasCompletedNiches) {
      return (
        <NichesScreen
          onContinue={async (customNiches) => {
            await confirmNiches(customNiches);
            setIsNewUser(false);
            localStorage.setItem('nuzio_is_new_user', 'false');
          }}
        />
      )
    }
  }

  // STEP 3: If user already exists (logged in), redirect directly to Main Feed
  return <FeedScreen onEditNiches={resetNichesOnboarding} />
}

function LanguageRoute() {
  const { hasSelectedLanguage, confirmLanguageSelection } = useLanguage()
  const { isAuthenticated } = useAuth()

  if (hasSelectedLanguage || !isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <LanguageScreen onContinue={confirmLanguageSelection} />
}

function NichesRoute() {
  const { confirmNiches } = useNiches()
  const { setIsNewUser } = useAuth()
  return (
    <NichesScreen 
      onContinue={async (niches) => {
        await confirmNiches(niches);
        setIsNewUser(false);
        localStorage.setItem('nuzio_is_new_user', 'false');
      }} 
    />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/auth" element={<NuzioScreen />} />
        <Route path="/language" element={<LanguageRoute />} />
        <Route path="/niches" element={<NichesRoute />} />
        <Route path="/feed" element={<MainContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App



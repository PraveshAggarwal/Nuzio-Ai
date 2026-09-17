import React, { createContext, useContext, useState, useEffect } from 'react';

const NicheContext = createContext(null);

export const AVAILABLE_NICHES = [
  { id: 'ai-tech', label: 'AI & Technology', icon: '🤖', category: 'AI & Tech' },
  { id: 'financial-markets', label: 'Financial Markets', icon: '📊', category: 'Markets' },
  { id: 'indian-business', label: 'Indian Business', badge: 'IN', category: 'Indian Business' },
  { id: 'global-politics', label: 'Global Politics', icon: '🌍', category: 'Politics' },
  { id: 'startups', label: 'Startups', icon: '🚀', category: 'Startups' },
  { id: 'science', label: 'Science', icon: '🔬', category: 'Science' },
  { id: 'geopolitics', label: 'Geopolitics', icon: '🗺️', category: 'Geopolitics' },
  { id: 'health-medicine', label: 'Health & Medicine', icon: '💊', category: 'Health' },
  { id: 'climate-energy', label: 'Climate & Energy', icon: '🌱', category: 'Climate' },
  { id: 'sports', label: 'Sports', icon: '⚽', category: 'Sports' },
  { id: 'culture-arts', label: 'Culture & Arts', icon: '🎨', category: 'Culture' },
  { id: 'legal-policy', label: 'Legal & Policy', icon: '⚖️', category: 'Policy' },
];

export function NicheProvider({ children }) {
  const [selectedNiches, setSelectedNiches] = useState(() => {
    try {
      const saved = localStorage.getItem('nuzio_selected_niches');
      return saved ? JSON.parse(saved) : ['ai-tech', 'indian-business', 'startups'];
    } catch {
      return ['ai-tech', 'indian-business', 'startups'];
    }
  });

  const [hasCompletedNiches, setHasCompletedNiches] = useState(() => {
    return localStorage.getItem('nuzio_niches_completed') === 'true';
  });

  const toggleNiche = (nicheId) => {
    setSelectedNiches((prev) => {
      let updated;
      if (prev.includes(nicheId)) {
        updated = prev.filter((id) => id !== nicheId);
      } else {
        if (prev.length >= 7) return prev; // max 7
        updated = [...prev, nicheId];
      }
      localStorage.setItem('nuzio_selected_niches', JSON.stringify(updated));
      return updated;
    });
  };

  const confirmNiches = () => {
    setHasCompletedNiches(true);
    localStorage.setItem('nuzio_niches_completed', 'true');
    localStorage.setItem('nuzio_selected_niches', JSON.stringify(selectedNiches));
  };

  const startNichesOnboarding = () => {
    setHasCompletedNiches(false);
    localStorage.setItem('nuzio_niches_completed', 'false');
  };

  const resetNichesOnboarding = () => {
    setHasCompletedNiches(false);
    localStorage.setItem('nuzio_niches_completed', 'false');
  };

  return (
    <NicheContext.Provider
      value={{
        selectedNiches,
        toggleNiche,
        confirmNiches,
        startNichesOnboarding,
        hasCompletedNiches,
        resetNichesOnboarding,
        availableNiches: AVAILABLE_NICHES,
      }}
    >
      {children}
    </NicheContext.Provider>
  );
}

export function useNiches() {
  const context = useContext(NicheContext);
  if (!context) {
    throw new Error('useNiches must be used within a NicheProvider');
  }
  return context;
}

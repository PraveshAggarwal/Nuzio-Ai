import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const TRANSLATIONS = {
  en: {
    langName: 'English',
    chooseLanguage: 'Choose your',
    chooseLanguageItalic: 'language',
    selectLangSubtitle: 'Select the language for your daily brief.',
    englishTitle: 'English',
    englishDesc: 'Briefings delivered in English',
    hindiTitle: 'हिन्दी',
    hindiDesc: 'हिन्दी में समाचार सुनें',
    enableLocation: 'Enable Location',
    locationSubtitle: 'Get hyperlocal news tailored to your city.',
    notAllowed: 'NOT ALLOWED',
    allowed: 'ALLOWED',
    continueBtn: 'Continue →',
    
    // Nuzio Landing Screen
    goodMorning: 'Good morning.',
    newsOnGo: 'News on go.',
    landingSubtitle: 'Personalised audio news for Indian professionals — curated every morning.',
    continueWithGoogle: 'Continue with Google',
    termsPrefix: 'By continuing you agree to our',
    terms: 'Terms',
    and: '&',
    privacy: 'Privacy Policy',
    
    // Auth Modal
    createAccount: 'Create Your Nuzio Account',
    signInTitle: 'Sign In to Nuzio',
    signupPrompt: 'Enter your name, email and password to create an account:',
    signinPrompt: 'Enter your credentials to access your audio news feed:',
    signUpTab: 'Sign Up',
    signInTab: 'Sign In',
    fullNameLabel: 'Full Name',
    emailLabel: 'Email address',
    passwordLabel: 'Password',
    createBtn: 'Create Account',
    signInBtn: 'Sign In',
    dbSecurityNote: 'End-to-end encrypted & securely stored',

    // Feed Screen
    welcomeBack: 'Welcome back,',
    morningDigest: 'Morning Audio Digest',
    aiGenerated: 'AI Generated',
    digestTitle: "Today's Top 5 Stories in Indian Tech & Finance",
    digestDesc: 'All essential updates condensed into a smooth 4-minute commute listening experience.',
    curatedBriefs: 'Curated Audio Briefs',
    autoUpdated: 'Auto-Updated',
    playingAiVoice: 'Playing AI Voice',
    paused: 'Paused',
    signOut: 'Sign Out',
    changeLanguage: 'Change Language',
  },
  hi: {
    langName: 'हिन्दी',
    chooseLanguage: 'अपनी भाषा',
    chooseLanguageItalic: 'चुनें',
    selectLangSubtitle: 'अपने दैनिक समाचार के लिए भाषा का चयन करें।',
    englishTitle: 'English',
    englishDesc: 'Briefings delivered in English',
    hindiTitle: 'हिन्दी',
    hindiDesc: 'हिन्दी में समाचार सुनें',
    enableLocation: 'लोकेशन सक्षम करें',
    locationSubtitle: 'अपने शहर के अनुसार विशेष स्थानीय समाचार प्राप्त करें।',
    notAllowed: 'अनुमति नहीं है',
    allowed: 'अनुमति प्राप्त',
    continueBtn: 'आगे बढ़ें →',
    
    // Nuzio Landing Screen
    goodMorning: 'सुप्रभात।',
    newsOnGo: 'खबरें, चलते-फिरते।',
    landingSubtitle: 'भारतीय पेशेवरों के लिए व्यक्तिगत ऑडियो समाचार — हर सुबह विशेष रूप से तैयार।',
    continueWithGoogle: 'गूगल के साथ आगे बढ़ें',
    termsPrefix: 'जारी रखकर आप हमारी',
    terms: 'नियम व शर्तें',
    and: 'और',
    privacy: 'गोपनीयता नीति',
    
    // Auth Modal
    createAccount: 'अपना नुज़ियो अकाउंट बनाएं',
    signInTitle: 'नुज़ियो में लॉग इन करें',
    signupPrompt: 'खाता बनाने के लिए अपना नाम, ईमेल और पासवर्ड दर्ज करें:',
    signinPrompt: 'अपने ऑडियो समाचारों तक पहुँचने के लिए क्रेडेंशियल्स दर्ज करें:',
    signUpTab: 'साइन अप',
    signInTab: 'साइन इन',
    fullNameLabel: 'पूरा नाम',
    emailLabel: 'ईमेल पता',
    passwordLabel: 'पासवर्ड',
    createBtn: 'खाता बनाएं',
    signInBtn: 'साइन इन करें',
    dbSecurityNote: 'एन्क्रिप्टेड और सुरक्षित रूप से संग्रहित',

    // Feed Screen
    welcomeBack: 'स्वागत है,',
    morningDigest: 'प्रातःकालीन ऑडियो डाइजेस्ट',
    aiGenerated: 'AI द्वारा जनरेटेड',
    digestTitle: 'भारतीय टेक और वित्त जगत की आज की शीर्ष 5 खबरें',
    digestDesc: 'आपकी सुबह की यात्रा के लिए तैयार 4 मिनट का संपूर्ण समाचार सार।',
    curatedBriefs: 'विशेष ऑडियो समाचार',
    autoUpdated: 'स्वतः अपडेटेड',
    playingAiVoice: 'AI आवाज़ में चालू',
    paused: 'रोका गया',
    signOut: 'लॉग आउट',
    changeLanguage: 'भाषा बदलें',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('nuzio_lang') || 'en';
  });
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(() => {
    return localStorage.getItem('nuzio_lang_selected') === 'true';
  });

  const selectLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('nuzio_lang', lang);
  };

  const confirmLanguageSelection = () => {
    setHasSelectedLanguage(true);
    localStorage.setItem('nuzio_lang_selected', 'true');
  };

  const resetLanguageSelection = () => {
    setHasSelectedLanguage(false);
    localStorage.setItem('nuzio_lang_selected', 'false');
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        selectLanguage,
        locationAllowed,
        setLocationAllowed,
        hasSelectedLanguage,
        confirmLanguageSelection,
        resetLanguageSelection,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, Loader2, AlertCircle, Eye, EyeOff, Lock, Mail, 
  User, CheckCircle2, ArrowRight, X, ShieldCheck, ChevronLeft
} from 'lucide-react';

export default function NuzioScreen({ onBackToLanguage }) {
  const { signupWithEmailAndPassword, loginWithEmailAndPassword, loading } = useAuth();
  const { language, selectLanguage, resetLanguageSelection, t } = useLanguage();
  
  // UI States
  const [clicked, setClicked] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'signin'
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Status & error handling
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live status bar
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;
  });
  const [batteryLevel, setBatteryLevel] = useState(90);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const updateSystemTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`);
    };

    updateSystemTime();
    const timer = setInterval(updateSystemTime, 1000);

    let batteryInstance = null;
    let onLevelChange = null;
    let onChargingChange = null;

    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        batteryInstance = battery;
        const updateBatteryInfo = () => {
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);
        };

        updateBatteryInfo();
        onLevelChange = updateBatteryInfo;
        onChargingChange = updateBatteryInfo;

        battery.addEventListener('levelchange', onLevelChange);
        battery.addEventListener('chargingchange', onChargingChange);
      }).catch((err) => {
        console.log('Battery API not available:', err);
      });
    }

    return () => {
      clearInterval(timer);
      if (batteryInstance) {
        if (onLevelChange) batteryInstance.removeEventListener('levelchange', onLevelChange);
        if (onChargingChange) batteryInstance.removeEventListener('chargingchange', onChargingChange);
      }
    };
  }, []);

  const handleGoogleButtonClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
    setShowAuthModal(true);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage(language === 'hi' ? 'कृपया एक वैध ईमेल पता दर्ज करें' : 'Please provide a valid email address');
      return;
    }

    if (!password || password.length < 4) {
      setErrorMessage(language === 'hi' ? 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए' : 'Password must be at least 4 characters');
      return;
    }

    if (authMode === 'signup' && !name.trim()) {
      setErrorMessage(language === 'hi' ? 'कृपया अपना नाम दर्ज करें' : 'Please provide your name');
      return;
    }

    setIsSubmitting(true);
    try {
      if (authMode === 'signup') {
        await signupWithEmailAndPassword({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password,
        });
        setSuccessMessage(language === 'hi' ? 'खाता सफलतापूर्वक डेटाबेस में सहेजा गया!' : 'Account created and saved in database!');
      } else {
        await loginWithEmailAndPassword({
          email: email.trim().toLowerCase(),
          password: password,
        });
        setSuccessMessage(language === 'hi' ? 'सफलतापूर्वक लॉग इन किया गया!' : 'Logged in successfully!');
      }
    } catch (err) {
      setErrorMessage(err.message || (language === 'hi' ? 'प्रमाणीकरण विफल रहा' : 'Authentication failed. Please check credentials.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050507] text-white flex items-center justify-center p-0 sm:p-6 sm:py-8 select-none">
      
      {/* Background ambient lighting for desktop web view */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 sm:opacity-50 blur-[120px] transition-opacity"
        style={{
          background: 'radial-gradient(ellipse 600px 450px at 50% 40%, rgba(124, 58, 237, 0.18), rgba(79, 70, 229, 0.08), transparent 80%)'
        }}
      />

      {/* Main Screen Container */}
      <div className="relative w-full max-w-[420px] h-[100dvh] sm:h-[860px] sm:max-h-[94vh] sm:rounded-[52px] bg-[#09090b] sm:border-[9px] sm:border-[#1e1e23] sm:shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden flex flex-col justify-between px-6 py-5 sm:px-8 sm:py-7 z-10">
        
        {/* Soft Radial Ambient Spotlight */}
        <div 
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full opacity-40 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(99, 102, 241, 0.2) 40%, transparent 70%)'
          }}
        />

        {/* ================= HEADER / STATUS BAR ================= */}
        <div className="w-full relative z-10 flex flex-col">
          {/* iOS Status Bar */}
          <div className="flex items-center justify-between text-white/90 text-[14px] font-semibold tracking-tight px-1 pt-0.5">
            <span className="font-medium tracking-normal text-[14px]">{currentTime}</span>
 

            {/* Status Icons */}
            <div className="flex items-center space-x-2 text-white/90">
              <svg className="w-4 h-3.5 fill-current" viewBox="0 0 17 12">
                <rect x="0.5" y="8" width="2.5" height="4" rx="0.6" />
                <rect x="4.5" y="5.5" width="2.5" height="6.5" rx="0.6" />
                <rect x="8.5" y="3" width="2.5" height="9" rx="0.6" />
                <rect x="12.5" y="0.5" width="2.5" height="11.5" rx="0.6" />
              </svg>
              <svg className="w-4 h-3.5 fill-current" viewBox="0 0 16 12">
                <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-4.2-3a5.9 5.9 0 018.4 0 .9.9 0 101.27-1.28 7.7 7.7 0 00-10.94 0 .9.9 0 001.27 1.28zm-3.2-3.1a10.4 10.4 0 0114.8 0 .9.9 0 101.27-1.28 12.2 12.2 0 00-17.34 0 .9.9 0 001.27 1.28z" />
              </svg>
              <div className="w-[22px] h-[11.5px] rounded-[3.5px] border border-white/70 p-[1.5px] flex items-center relative">
                <div 
                  className={`h-full rounded-[1.5px] transition-all duration-300 ${
                    isCharging ? 'bg-[#22c55e]' : batteryLevel <= 20 ? 'bg-[#ef4444]' : 'bg-white'
                  }`}
                  style={{ width: `${Math.max(8, Math.min(100, batteryLevel))}%` }}
                />
                <div className="absolute -right-[3.5px] top-[2.5px] w-[2px] h-[4.5px] bg-white/70 rounded-r-[1px]" />
              </div>
            </div>
          </div>

          {/* Quick Back to Language Button */}
          <div className="flex items-center justify-between mt-3 px-1">
            <button
              onClick={() => {
                resetLanguageSelection();
                if (onBackToLanguage) onBackToLanguage();
              }}
              className="flex items-center space-x-1 text-[12px] text-zinc-400 hover:text-white px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}</span>
            </button>
          </div>

          {/* Nuzio AI Brand Header */}
          <div className="flex items-center justify-center space-x-3.5 mt-10 sm:mt-14">
            <div className="flex items-center space-x-[3.5px] h-8">
              <span className="w-[3px] h-3 bg-gradient-to-t from-[#6366f1] to-[#a855f7] wave-bar wave-1" />
              <span className="w-[3px] h-5 bg-gradient-to-t from-[#6366f1] to-[#a855f7] wave-bar wave-2" />
              <span className="w-[3.5px] h-7 bg-gradient-to-t from-[#818cf8] to-[#c084fc] wave-bar wave-3 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
              <span className="w-[3px] h-5 bg-gradient-to-t from-[#6366f1] to-[#a855f7] wave-bar wave-4" />
              <span className="w-[3px] h-3 bg-gradient-to-t from-[#6366f1] to-[#a855f7] wave-bar wave-5" />
            </div>

            <div className="flex items-baseline font-sans-custom">
              <span className="text-[28px] font-bold text-white tracking-tight leading-none">
                Nuzio
              </span>
              <span className="text-[28px] font-bold ml-1.5 text-[#8b5cf6] leading-none drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                AI
              </span>
            </div>
          </div>
        </div>

        {/* ================= MIDDLE / HEADLINE SECTION (LOCALIZED) ================= */}
        <div className="w-full relative z-10 text-left my-auto pt-4 pb-4">
          <h1 className="text-[36px] sm:text-[42px] font-bold text-white leading-tight tracking-tight font-sans-custom">
            {t.goodMorning}
          </h1>
          
          <h2 className="font-serif-italic text-[38px] sm:text-[45px] font-normal leading-tight mt-0.5 tracking-tight text-gradient-purple">
            {t.newsOnGo}
          </h2>

          <p className="mt-4 text-[#9ca3af] text-[14px] sm:text-[15px] leading-[1.45] font-normal max-w-[280px] sm:max-w-[310px]">
            {t.landingSubtitle}
          </p>
        </div>

        {/* ================= BOTTOM / ACTIONS & FOOTER (LOCALIZED) ================= */}
        <div className="w-full relative z-10 flex flex-col items-center pb-2">
          
          {/* Continue with Google Button */}
          <button
            type="button"
            disabled={isSubmitting || loading}
            onClick={handleGoogleButtonClick}
            className={`w-full h-[56px] bg-[#18181b] hover:bg-[#202025] active:bg-[#131316] text-white border border-white/[0.1] hover:border-white/[0.2] rounded-[18px] flex items-center justify-center space-x-3 transition-all duration-200 cursor-pointer shadow-[0_6px_25px_rgba(0,0,0,0.5)] ${
              clicked ? 'scale-[0.98]' : 'scale-100'
            }`}
          >
            {/* Google Colorful G Icon */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>

            <span className="font-semibold text-[15.5px] text-white tracking-normal">
              {t.continueWithGoogle}
            </span>
          </button>

          {/* Legal / Terms footer */}
          <p className="mt-4 text-center text-[11.5px] text-[#71717a] leading-relaxed">
            {t.termsPrefix}{' '}
            <a
              href="#terms"
              className="text-[#6366f1] hover:text-[#818cf8] underline underline-offset-2 transition-colors font-medium"
            >
              {t.terms}
            </a>{' '}
            {t.and}{' '}
            <a
              href="#privacy"
              className="text-[#6366f1] hover:text-[#818cf8] underline underline-offset-2 transition-colors font-medium"
            >
              {t.privacy}
            </a>
            .
          </p>

          {/* iOS Bottom Indicator Bar */}
          <div className="w-[130px] h-[4.5px] bg-white/20 rounded-full mt-4 sm:hidden" />
        </div>

        {/* ================= GOOGLE AUTHENTICATION FORM MODAL ================= */}
        {showAuthModal && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end p-4 animate-in fade-in duration-200">
            <div className="w-full bg-[#111116] border border-white/[0.12] rounded-3xl p-5 text-left shadow-2xl relative">
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center space-x-2.5 mb-1.5">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <h4 className="text-[17px] font-bold text-white">
                  {authMode === 'signup' ? t.createAccount : t.signInTitle}
                </h4>
              </div>

              <p className="text-[12px] text-zinc-400 mb-3.5">
                {authMode === 'signup' ? t.signupPrompt : t.signinPrompt}
              </p>

              {/* Mode Toggle Switch (Sign Up vs Sign In) */}
              <div className="flex bg-[#191922] p-1 rounded-xl border border-white/[0.08] mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`flex-1 py-1.5 text-[12.5px] font-semibold rounded-lg transition-all cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.signUpTab}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`flex-1 py-1.5 text-[12.5px] font-semibold rounded-lg transition-all cursor-pointer ${
                    authMode === 'signin'
                      ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.signInTab}
                </button>
              </div>

              {/* Error or Success Alert */}
              {errorMessage && (
                <div className="mb-3 p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-2 text-[12px] text-red-300 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-3 p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center space-x-2 text-[12px] text-emerald-300 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form Fields */}
              <form onSubmit={handleAuthSubmit} className="space-y-3">
                
                {/* Name Field (Sign Up only) */}
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-[11.5px] font-medium text-zinc-400 mb-1">
                      {t.fullNameLabel}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required={authMode === 'signup'}
                        placeholder={language === 'hi' ? 'उदा. प्रवेश अग्रवाल' : 'e.g. Pravesh Aggarwal'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9.5 pr-3 py-2.5 bg-[#18181f] border border-white/[0.1] rounded-xl text-[13px] text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6] transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-[11.5px] font-medium text-zinc-400 mb-1">
                    {t.emailLabel}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9.5 pr-3 py-2.5 bg-[#18181f] border border-white/[0.1] rounded-xl text-[13px] text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6] transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-[11.5px] font-medium text-zinc-400 mb-1">
                    {t.passwordLabel}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9.5 pr-10 py-2.5 bg-[#18181f] border border-white/[0.1] rounded-xl text-[13px] text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] hover:opacity-95 active:scale-[0.99] disabled:opacity-50 text-white font-semibold rounded-xl text-[13.5px] shadow-[0_4px_20px_rgba(139,92,246,0.4)] flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'hi' ? 'सहेज रहे हैं...' : 'Saving & Authenticating...'}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {authMode === 'signup' ? t.createBtn : t.signInBtn}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Security guarantee */}
              <div className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex items-center justify-center space-x-1.5 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.dbSecurityNote}</span>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

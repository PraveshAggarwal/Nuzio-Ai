import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin } from 'lucide-react';

export default function LanguageScreen({ onContinue }) {
  const { 
    language, 
    selectLanguage, 
    locationAllowed, 
    setLocationAllowed, 
    confirmLanguageSelection,
    t 
  } = useLanguage();

  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;
  });

  const [batteryLevel, setBatteryLevel] = useState(90);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`);
    };
    const timer = setInterval(updateTime, 1000);

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

  const handleToggleLocation = () => {
    if (!locationAllowed) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => setLocationAllowed(true),
          () => setLocationAllowed(true) // Set allowed anyway for simulation if denied in browser
        );
      } else {
        setLocationAllowed(true);
      }
    } else {
      setLocationAllowed(false);
    }
  };

  const handleContinue = () => {
    confirmLanguageSelection();
    if (onContinue) onContinue();
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
      <div className="relative w-full max-w-105 h-dvh sm:h-215 sm:max-h-[94vh] sm:rounded-[52px] bg-[#09090b] sm:border-[9px] sm:border-[#1e1e23] sm:shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden flex flex-col justify-between px-6 py-5 sm:px-7 sm:py-7 z-10">
        
        {/* Soft Radial Ambient Spotlight inside the phone frame */}
        <div 
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-85 h-[340px] rounded-full opacity-35 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, rgba(99, 102, 241, 0.15) 40%, transparent 70%)'
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
              {/* Real-Time Battery Indicator */}
              <div className="flex items-center space-x-1">
                {isCharging && (
                  <svg className="w-3 h-3 text-[#22c55e] fill-current animate-pulse" viewBox="0 0 24 24">
                    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.08-.13L13 3h1l-1 7h3.5c.49 0 .56.33.37.68l-.06.1-5.81 10.22z" />
                  </svg>
                )}
                <div 
                  className="w-[22px] h-[11.5px] rounded-[3.5px] border border-white/70 p-[1.5px] flex items-center relative"
                  title={`Battery: ${batteryLevel}% ${isCharging ? '(Charging)' : ''}`}
                >
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
          </div>

          {/* Nuzio AI Brand Header */}
          <div className="flex items-center justify-center space-x-2.5 mt-8 sm:mt-10">
            {/* Audio Waveform icon */}
            <div className="flex items-center space-x-[2.5px] h-6">
              <span className="w-[2.5px] h-2.5 bg-gradient-to-t from-[#6366f1] to-[#a855f7] wave-bar wave-1" />
              <span className="w-[2.5px] h-4 bg-gradient-to-t from-[#6366f1] to-[#a855f7] wave-bar wave-2" />
              <span className="w-[3px] h-5.5 bg-gradient-to-t from-[#818cf8] to-[#c084fc] wave-bar wave-3 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              <span className="w-[2.5px] h-4 bg-gradient-to-t from-[#6366f1] to-[#a855f7] wave-bar wave-4" />
              <span className="w-[2.5px] h-2.5 bg-gradient-to-t from-[#6366f1] to-[#a855f7] wave-bar wave-5" />
            </div>

            {/* Brand Logo Text */}
            <div className="flex items-baseline font-sans-custom">
              <span className="text-[20px] font-bold text-white tracking-tight leading-none">
                Nuzio
              </span>
              <span className="text-[20px] font-bold ml-1 text-[#8b5cf6] leading-none drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]">
                AI
              </span>
            </div>
          </div>
        </div>

        {/* ================= MIDDLE / OPTIONS SECTION ================= */}
        <div className="w-full relative z-10 text-left my-auto pt-2 pb-2">
          
          {/* Title & Subtitle */}
          <h1 className="text-[34px] sm:text-[38px] font-bold text-white leading-tight tracking-tight font-sans-custom">
            {t.chooseLanguage}
          </h1>
          <h2 className="font-serif-italic text-[36px] sm:text-[40px] font-normal leading-tight -mt-1 tracking-tight text-gradient-purple">
            {t.chooseLanguageItalic}
          </h2>

          <p className="mt-2 text-[#9ca3af] text-[13.5px] sm:text-[14px] leading-relaxed font-normal mb-5">
            {t.selectLangSubtitle}
          </p>

          {/* Languages Cards */}
          <div className="space-y-3">
            
            {/* English Card */}
            <div
              onClick={() => selectLanguage('en')}
              className={`w-full rounded-[22px] p-4 flex items-center justify-between transition-all duration-200 cursor-pointer ${
                language === 'en'
                  ? 'bg-[#151522] border-[1.5px] border-[#6366f1] shadow-[0_4px_25px_rgba(99,102,241,0.25)]'
                  : 'bg-[#111116] hover:bg-[#15151c] border border-white/[0.08]'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <span className="text-[17px] font-bold text-[#474758] tracking-wider select-none font-mono">
                  GB
                </span>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-white leading-tight">
                    English
                  </span>
                  <span className="text-[12px] text-[#8e8e9d] mt-0.5">
                    Briefings delivered in English
                  </span>
                </div>
              </div>

              {/* Radio Indicator */}
              <div className="flex items-center justify-center">
                {language === 'en' ? (
                  <div className="w-5 h-5 rounded-full bg-[#6366f1] flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.8)]">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-white/20 bg-[#16161c]" />
                )}
              </div>
            </div>

            {/* Hindi Card */}
            <div
              onClick={() => selectLanguage('hi')}
              className={`w-full rounded-[22px] p-4 flex items-center justify-between transition-all duration-200 cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#151522] border-[1.5px] border-[#6366f1] shadow-[0_4px_25px_rgba(99,102,241,0.25)]'
                  : 'bg-[#111116] hover:bg-[#15151c] border border-white/[0.08]'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <span className="text-[17px] font-bold text-[#474758] tracking-wider select-none font-mono">
                  IN
                </span>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-white leading-tight">
                    हिन्दी
                  </span>
                  <span className="text-[12px] text-[#8e8e9d] mt-0.5">
                    हिन्दी में समाचार सुनें
                  </span>
                </div>
              </div>

              {/* Radio Indicator */}
              <div className="flex items-center justify-center">
                {language === 'hi' ? (
                  <div className="w-5 h-5 rounded-full bg-[#6366f1] flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.8)]">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-white/20 bg-[#16161c]" />
                )}
              </div>
            </div>

            {/* Enable Location Card */}
            <div className="w-full bg-[#111116] border border-white/[0.08] rounded-[22px] p-4 transition-all">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-[14px] bg-[#22172f] border border-[#a855f7]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-5 h-5 rounded-full bg-[#ec4899] flex items-center justify-center relative shadow-[0_0_8px_rgba(236,72,153,0.6)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    <div className="w-[2px] h-2 bg-white/70 absolute -bottom-1.5 rounded-b-full" />
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <span className="text-[15px] font-bold text-white leading-tight">
                    {t.enableLocation}
                  </span>
                  <span className="text-[12px] text-[#8e8e9d] mt-0.5 leading-relaxed">
                    {t.locationSubtitle}
                  </span>
                </div>
              </div>

              {/* Location status & Toggle */}
              <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-white/[0.06] pl-1">
                <div className="text-[10.5px] font-mono tracking-wider text-[#636675] uppercase flex items-center space-x-1.5">
                  <span className="text-[12px] font-bold">=</span>
                  <span>{locationAllowed ? t.allowed : t.notAllowed}</span>
                </div>

                <button
                  type="button"
                  onClick={handleToggleLocation}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer relative ${
                    locationAllowed ? 'bg-[#6366f1]' : 'bg-[#272730]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                      locationAllowed ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ================= BOTTOM / ACTION BUTTON ================= */}
        <div className="w-full relative z-10 flex flex-col items-center pb-1">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full h-[56px] bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#8b5cf6] hover:opacity-95 active:scale-[0.99] text-white rounded-[20px] font-semibold text-[16px] flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer shadow-[0_8px_30px_rgba(99,102,241,0.45)]"
          >
            <span>{t.continueBtn}</span>
          </button>

          {/* iOS Bottom Indicator Bar */}
          <div className="w-[130px] h-[4.5px] bg-white/20 rounded-full mt-4 sm:hidden" />
        </div>

      </div>
    </div>
  );
}

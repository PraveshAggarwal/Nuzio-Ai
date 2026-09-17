import React, { useState, useEffect } from 'react';
import { useNiches } from '../context/NicheContext';
import { useLanguage } from '../context/LanguageContext';
import { Check } from 'lucide-react';

export default function NichesScreen({ onContinue, onSkip }) {
  const { selectedNiches, toggleNiche, confirmNiches, availableNiches } = useNiches();
  const { language } = useLanguage();

  // Real-time live clock
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;
  });

  // Real-time Battery API
  const [batteryLevel, setBatteryLevel] = useState(90);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    // 1. Clock timer
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`);
    };
    const timer = setInterval(updateTime, 1000);

    // 2. Real System Battery API
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

  const handleContinue = () => {
    confirmNiches();
    if (onContinue) onContinue();
  };

  const handleSkip = () => {
    confirmNiches();
    if (onSkip) onSkip();
  };

  return (
    <div className="min-h-screen w-full bg-[#050507] text-white flex items-center justify-center p-0 sm:p-6 sm:py-8 select-none font-sans">
      
      {/* Background ambient lighting */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 sm:opacity-50 blur-[130px] transition-opacity"
        style={{
          background: 'radial-gradient(ellipse 650px 480px at 50% 30%, rgba(124, 58, 237, 0.22), rgba(52, 211, 153, 0.08), transparent 80%)'
        }}
      />

      {/* Main Screen Container */}
      <div className="relative w-full max-w-[420px] h-[100dvh] sm:h-[860px] sm:max-h-[94vh] sm:rounded-[52px] bg-[#09090b] sm:border-[9px] sm:border-[#1e1e23] sm:shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden flex flex-col justify-between px-6 py-5 sm:px-7 sm:py-7 z-10 text-left">
        
        {/* Soft Radial Ambient Spotlight */}
        <div 
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[260px] rounded-full opacity-35 blur-[70px]"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 80%)'
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

          {/* Top Logo & SKIP Row */}
          <div className="flex items-center justify-between mt-3 px-0.5">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-[2px] h-3.5">
                <span className="w-[2px] h-2 bg-gradient-to-t from-[#6366f1] to-[#a855f7]" />
                <span className="w-[2px] h-3.5 bg-gradient-to-t from-[#6366f1] to-[#a855f7]" />
                <span className="w-[2px] h-4 bg-gradient-to-t from-[#818cf8] to-[#c084fc]" />
                <span className="w-[2px] h-3 bg-gradient-to-t from-[#6366f1] to-[#a855f7]" />
              </div>
              <div className="flex items-baseline">
                <span className="text-[14px] font-bold text-white tracking-tight">Nuzio</span>
                <span className="text-[14px] font-bold ml-1 text-[#8b5cf6]">AI</span>
              </div>
            </div>

            <button
              onClick={handleSkip}
              className="text-[12px] font-mono tracking-widest text-[#71717a] hover:text-white transition-colors cursor-pointer"
            >
              SKIP →
            </button>
          </div>

          {/* 6 Segment Progress Bar */}
          <div className="grid grid-cols-6 gap-2 mt-4">
            <div className="h-[2.5px] rounded-full bg-gradient-to-r from-[#6366f1] to-[#818cf8]" />
            <div className="h-[2.5px] rounded-full bg-[#38bdf8]" />
            <div className="h-[2.5px] rounded-full bg-[#1c1c24]" />
            <div className="h-[2.5px] rounded-full bg-[#1c1c24]" />
            <div className="h-[2.5px] rounded-full bg-[#1c1c24]" />
            <div className="h-[2.5px] rounded-full bg-[#1c1c24]" />
          </div>

          {/* Step 2 of 6 indicator */}
          <div className="mt-3.5">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#6366f1] uppercase">
              STEP 2 OF 6
            </span>
          </div>

          {/* Headline & Subtitle */}
          <div className="mt-1.5">
            <h1 className="text-[32px] sm:text-[36px] font-bold text-white tracking-tight leading-tight">
              What moves
            </h1>
            <h2 className="text-[34px] sm:text-[38px] font-serif italic text-gradient-purple -mt-1 font-normal">
              your world?
            </h2>

            <div className="flex items-center space-x-2 mt-2">
              <span className="text-[14px] text-[#9ca3af]">
                Pick up to 7 niches.
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#34d399] font-mono text-[11px] font-bold">
                {selectedNiches.length}/7
              </span>
            </div>
          </div>

        </div>

        {/* ================= MIDDLE / CHIPS GRID ================= */}
        <div className="w-full relative z-10 my-auto py-2 overflow-y-auto no-scrollbar max-h-[440px]">
          <div className="flex flex-wrap gap-2.5">
            {availableNiches.map((niche) => {
              const isSelected = selectedNiches.includes(niche.id);

              return (
                <button
                  key={niche.id}
                  type="button"
                  onClick={() => toggleNiche(niche.id)}
                  className={`px-4 py-2.5 rounded-full text-[13.5px] font-medium transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1e1735] border-[1.5px] border-[#8b5cf6] text-white shadow-[0_2px_15px_rgba(139,92,246,0.3)] scale-[1.02]'
                      : 'bg-[#13131a] hover:bg-[#191924] border border-white/[0.08] text-[#9ca3af] hover:text-white'
                  }`}
                >
                  {niche.badge ? (
                    <span className="text-[11px] font-mono font-bold text-[#474758] bg-[#0c0c10] px-1.5 py-0.5 rounded border border-white/[0.06]">
                      {niche.badge}
                    </span>
                  ) : (
                    <span className="text-[14px]">{niche.icon}</span>
                  )}

                  <span className={isSelected ? 'text-white font-semibold' : ''}>
                    {niche.label}
                  </span>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#a855f7] stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM / ACTION BUTTON ================= */}
        <div className="w-full relative z-10 flex flex-col items-center pb-1">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full h-[56px] bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#8b5cf6] hover:opacity-95 active:scale-[0.99] text-white rounded-[20px] font-semibold text-[16px] flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer shadow-[0_8px_30px_rgba(99,102,241,0.45)]"
          >
            <span>Continue →</span>
          </button>

          {/* iOS Bottom Indicator Bar */}
          <div className="w-[130px] h-[4.5px] bg-white/20 rounded-full mt-4 sm:hidden" />
        </div>

      </div>
    </div>
  );
}

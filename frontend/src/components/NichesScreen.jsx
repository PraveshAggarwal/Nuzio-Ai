import React from "react";
import { useNiches } from "../context/NicheContext";
import { useLanguage } from "../context/LanguageContext";
import { Check } from "lucide-react";
import IosStatusBar from "./IosStatusBar";

export default function NichesScreen({ onContinue }) {
  const { selectedNiches, toggleNiche, confirmNiches, availableNiches } =
    useNiches();
  const { language } = useLanguage();

  const handleContinue = () => {
    confirmNiches();
    if (onContinue) onContinue();
  };

  return (
    <div className="min-h-screen w-full bg-[#050507] text-white flex items-center justify-center p-0 sm:p-6 sm:py-8 select-none font-sans">
      {/* Background ambient lighting */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 sm:opacity-50 blur-[130px] transition-opacity"
        style={{
          background:
            "radial-gradient(ellipse 650px 480px at 50% 30%, rgba(124, 58, 237, 0.22), rgba(52, 211, 153, 0.08), transparent 80%)",
        }}
      />

      {/* Main Screen Container (Mobile Viewport Frame) */}
      <div className="relative w-full max-w-[420px] h-[100dvh] sm:h-[860px] sm:max-h-[94vh] sm:rounded-[52px] bg-[#09090b] sm:border-[9px] sm:border-[#1e1e23] sm:shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden flex flex-col justify-between px-6 py-5 sm:px-7 sm:py-7 z-10 text-left">
        {/* Soft Radial Ambient Spotlight */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[260px] rounded-full opacity-35 blur-[70px]"
          style={{
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 80%)",
          }}
        />

        {/* ================= HEADER / STATUS BAR ================= */}
        <div className="w-full relative z-10 flex flex-col">
          {/* iOS Status Bar with Dynamic Wi-Fi / Tower Network Switching */}
          <IosStatusBar showIsland={true} />

          {/* Top Logo Row */}
          <div className="flex items-center justify-between mt-3 px-0.5">
            <div className="flex items-center space-x-1.5">
              <span className="text-[14px] text-[#818cf8] font-bold">✦</span>
              <div className="flex items-baseline">
                <span className="text-[14px] font-bold text-white tracking-tight">
                  Nuzio
                </span>
                <span className="text-[14px] font-bold text-[#818cf8]">
                  .ai
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 of 6 indicator */}
          <div className="mt-3.5">
            <span className="text-[11px] font-mono font-extrabold tracking-[0.2em] text-[#3b82f6] uppercase">
              STEP 2 OF 6
            </span>
          </div>

          {/* Headline & Subtitle */}
          <div className="mt-2">
            <h1 className="text-[34px] sm:text-[38px] font-bold text-white tracking-tight leading-none">
              What moves
            </h1>
            <h2 className="text-[36px] sm:text-[40px] font-serif italic text-gradient-purple mt-0.5 font-normal leading-tight">
              your world?
            </h2>

            <div className="flex items-center space-x-2.5 mt-2.5">
              <span className="text-[14px] text-[#9ca3af] font-normal">
                Pick up to 7 niches.
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#064e3b]/40 border border-[#10b981]/60 text-[#34d399] font-mono text-[11.5px] font-bold">
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
                      ? "bg-[#1e1735] border-[1.5px] border-[#6366f1] text-white shadow-[0_2px_15px_rgba(99,102,241,0.3)] scale-[1.02]"
                      : "bg-[#15151a] hover:bg-[#1c1c24] border border-white/[0.08] text-[#d4d4d8] hover:text-white"
                  }`}
                >
                  {niche.badge ? (
                    <span className="text-[10px] font-mono font-extrabold text-[#71717a] bg-[#0c0c10] px-1.5 py-0.5 rounded border border-white/[0.06]">
                      {niche.badge}
                    </span>
                  ) : (
                    <span className="text-[14px]">{niche.icon}</span>
                  )}

                  <span
                    className={isSelected ? "text-white font-semibold" : ""}
                  >
                    {niche.label}
                  </span>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#818cf8] stroke-[3]" />
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
            className="w-full h-[56px] bg-[#6366f1] hover:bg-[#5558e6] active:scale-[0.99] text-white rounded-[20px] font-semibold text-[16px] flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer shadow-[0_8px_30px_rgba(99,102,241,0.4)]"
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

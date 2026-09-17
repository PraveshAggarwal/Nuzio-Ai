import React from 'react';
import { useDeviceStatus } from '../hooks/useDeviceStatus';

export default function IosStatusBar({ showIsland = true }) {
  const { currentTime, batteryLevel, isCharging, isWifi, networkType } = useDeviceStatus();

  return (
    <div className="flex items-center justify-between text-white/90 text-[14px] font-semibold tracking-tight px-1 pt-0.5 relative select-none">
      {/* Live System Time */}
      <span className="font-semibold tracking-normal text-[14px]">{currentTime}</span>

      {/* Dynamic Island Notch Pill */}
      {showIsland && (
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[110px] h-[26px] bg-[#000000] rounded-full shadow-inner hidden sm:block" />
      )}

      {/* Network & Battery Status Group */}
      <div className="flex items-center space-x-2 text-white/90">
        
        {/* Real-time Dynamic Network: Wi-Fi symbol if on Wi-Fi, otherwise Real-time Tower Bars & 5G/LTE */}
        {isWifi ? (
          /* Wi-Fi Icon */
          <div className="flex items-center" title="Connected to Wi-Fi">
            <svg className="w-4 h-3.5 fill-current" viewBox="0 0 16 12">
              <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-4.2-3a5.9 5.9 0 018.4 0 .9.9 0 101.27-1.28 7.7 7.7 0 00-10.94 0 .9.9 0 001.27 1.28zm-3.2-3.1a10.4 10.4 0 0114.8 0 .9.9 0 101.27-1.28 12.2 12.2 0 00-17.34 0 .9.9 0 001.27 1.28z" />
            </svg>
          </div>
        ) : (
          /* Real-time Cellular Tower Signal Bars (Personal Network / Mobile Data) */
          <div className="flex items-center space-x-1" title="Connected to Personal / Cellular Network">
            <svg className="w-4 h-3.5 fill-current" viewBox="0 0 17 12">
              <rect x="0.5" y="8" width="2.5" height="4" rx="0.6" />
              <rect x="4.5" y="5.5" width="2.5" height="6.5" rx="0.6" />
              <rect x="8.5" y="3" width="2.5" height="9" rx="0.6" />
              <rect x="12.5" y="0.5" width="2.5" height="11.5" rx="0.6" />
            </svg>
            <span className="text-[10px] font-mono font-extrabold tracking-tighter text-white/80">
              {networkType || '5G'}
            </span>
          </div>
        )}

        {/* Real-time System Battery Indicator */}
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
  );
}

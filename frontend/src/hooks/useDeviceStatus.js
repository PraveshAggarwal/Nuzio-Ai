import { useState, useEffect } from 'react';

export function useDeviceStatus() {
  // 1. Live Time
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`;
  });

  // 2. Battery API
  const [batteryLevel, setBatteryLevel] = useState(90);
  const [isCharging, setIsCharging] = useState(false);

  // 3. Network Detection (Wi-Fi vs Cellular / Personal Network)
  const [isOnline, setIsOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));
  const [isWifi, setIsWifi] = useState(() => {
    if (typeof navigator !== 'undefined') {
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        if (conn.type === 'cellular') return false;
        if (conn.type === 'wifi') return true;
        if (conn.type === 'none') return false;
      }
      return true;
    }
    return true;
  });
  const [networkType, setNetworkType] = useState('5G');

  useEffect(() => {
    // 1. Clock timer
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`);
    };
    const timer = setInterval(updateTime, 1000);

    // 2. Battery API
    let batteryInstance = null;
    let onLevelChange = null;
    let onChargingChange = null;

    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      navigator
        .getBattery()
        .then((battery) => {
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
        })
        .catch((err) => {
          console.log('Battery API not available:', err);
        });
    }

    // 3. Network connection event listeners
    const updateNetworkStatus = () => {
      const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
      setIsOnline(online);

      const conn = typeof navigator !== 'undefined' && (navigator.connection || navigator.mozConnection || navigator.webkitConnection);
      if (conn) {
        if (conn.type === 'cellular') {
          setIsWifi(false);
          setNetworkType(conn.effectiveType ? conn.effectiveType.toUpperCase() : '5G');
        } else if (conn.type === 'wifi') {
          setIsWifi(true);
        } else if (conn.type === 'none') {
          setIsWifi(false);
        } else {
          if (conn.effectiveType && (conn.effectiveType === '2g' || conn.effectiveType === '3g')) {
            setIsWifi(false);
            setNetworkType(conn.effectiveType.toUpperCase());
          } else {
            setIsWifi(true);
          }
        }
      }
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    const conn = typeof navigator !== 'undefined' && (navigator.connection || navigator.mozConnection || navigator.webkitConnection);
    if (conn) {
      conn.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      clearInterval(timer);
      if (batteryInstance) {
        if (onLevelChange) batteryInstance.removeEventListener('levelchange', onLevelChange);
        if (onChargingChange) batteryInstance.removeEventListener('chargingchange', onChargingChange);
      }
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      if (conn) {
        conn.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return {
    currentTime,
    batteryLevel,
    isCharging,
    isWifi,
    isOnline,
    networkType,
    setIsWifi,
  };
}

import React, { useState, useEffect, useRef } from 'react';
import SONG from "../audio/song1.mp3"

const TARGET_DATE = new Date('2026-01-11T20:35:00'); 

const ReleaseGate = ({ children }) => {
  // We initialize with null to show a "Loading..." state while we fetch internet time
  const [remainingMs, setRemainingMs] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const audioRef = useRef(null);

  // Helper to format milliseconds into your object structure
  const formatTime = (ms) => {
    if (ms <= 0) return {};
    return {
      days: Math.floor(ms / (1000 * 60 * 60 * 24)),
      hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((ms / 1000 / 60) % 60),
      seconds: Math.floor((ms / 1000) % 60),
    };
  };

  useEffect(() => {
    audioRef.current = new Audio(SONG);

    const fetchInternetTime = async () => {
      try {
        // 1. Fetch time from a reliable Internet Server (WorldTimeAPI)
        // This bypasses the local computer clock
        const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
        const data = await response.json();
        
        // 2. Convert Internet Time to JS Timestamp
        const serverNow = new Date(data.utc_datetime).getTime();
        const targetTime = TARGET_DATE.getTime();
        
        // 3. Set the initial difference based on SERVER time
        const diff = targetTime - serverNow;
        setRemainingMs(diff);

        if (diff <= 0) {
            setIsOpen(true);
        }

      } catch (error) {
        console.error("Could not fetch internet time, falling back to local (unsafe):", error);
        // Fallback: If API fails, use local time so the app doesn't crash
        setRemainingMs(TARGET_DATE.getTime() - Date.now());
      }
    };

    fetchInternetTime();

    // 4. THE COUNTER
    // We do NOT use Date.now() inside the interval. 
    // We simply subtract 1000ms from our state. 
    // Even if the user changes their system clock to 2030, this state ignores it.
    const timer = setInterval(() => {
      setRemainingMs((prev) => {
        if (prev === null) return null; // Still loading
        const newValue = prev - 1000;
        
        if (newValue <= 0) {
          setIsOpen(true);
          clearInterval(timer);
          return 0;
        }
        return newValue;
      });
    }, 1000);

    if(localStorage.getItem('project_revealed') === '1') setIsOpen(true);

    return () => clearInterval(timer);
  }, []);

  const handleManualOpen = () => {
    // Check our state, not the date object
    if (remainingMs <= 0) {
      setIsOpen(true);
      localStorage.setItem('project_revealed', '1');
    } else {
      if (audioRef.current) {
        audioRef.current.currentTime = 0; 
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      }
      setShowWarning(true);
    }
  };

  const closeWarning = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setShowWarning(false);
  };

  if (isOpen) return <>{children}</>;

  // Convert the raw milliseconds state into the display object
  const timeLeft = formatTime(remainingMs || 0);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center text-white font-mono flex-col p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      
      <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse drop-shadow-lg">
        Coming Soon...
      </h1>

      {/* Show Loading if we haven't fetched time yet */}
      {remainingMs === null ? (
         <div className="text-xl text-pink-500 animate-pulse">Syncing with Atomic Clock...</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-center">
            {Object.keys(timeLeft).length > 0 ? Object.keys(timeLeft).map((interval) => (
            <div key={interval} className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 min-w-[100px] shadow-[0_0_15px_rgba(120,115,245,0.2)] transform hover:scale-105 transition-transform duration-300">
                <span className="text-4xl md:text-5xl font-bold block text-white mb-2">{timeLeft[interval] || '0'}</span>
                <span className="text-xs md:text-sm uppercase tracking-widest text-gray-400">{interval}</span>
            </div>
            )) : (
                <div className="text-2xl text-green-400">Time Reached! Click Open.</div>
            )}
        </div>
      )}

      <button 
        onClick={handleManualOpen}
        className="mt-16 px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-bold text-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-300 border border-white/20"
      >
        Open Surprise 🎁
      </button>

      {showWarning && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeWarning}></div>
          <div className="relative bg-gray-900 border border-pink-500/50 p-8 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.4)] max-w-sm w-full text-center transform animate-[bounceIn_0.5s_ease-out]">
            <div className="text-6xl mb-4 animate-bounce">🤫</div>
            <h3 className="text-2xl font-bold text-pink-400 mb-2">Not Yet!</h3>
            <p className="text-gray-300 mb-6 text-lg">Wait panra! Don't try to open before the birthday!</p>
            <button onClick={closeWarning} className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors border border-gray-600">
              Okay, I'll wait 😇
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReleaseGate;
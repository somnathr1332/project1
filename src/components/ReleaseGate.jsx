import React, { useState, useEffect, useRef } from 'react';
import SONG from "../audio/song1.mp3"
// Set your target date here
// Note: '2026-01-00' creates an invalid date in some browsers, 
// usually correcting to Dec 31, 2025. Ensure this is the date you want.
const TARGET_DATE = new Date('2026-01-11T13:29:00'); 

const ReleaseGate = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // 1. Create a ref for the audio
  const audioRef = useRef(null);

  function calculateTimeLeft() {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    // 2. Initialize the Audio object once when component mounts
    // Replace '/audio/funny-song.mp3' with your actual file path in the public folder
    audioRef.current = new Audio(SONG);

    const timer = setInterval(() => {
      const t = calculateTimeLeft();
      setTimeLeft(t);
      if (Object.keys(t).length === 0) {
        setIsOpen(true);
        clearInterval(timer);
      }
    }, 1000);

    if(localStorage.getItem('project_revealed') === '1') setIsOpen(true);

    return () => clearInterval(timer);
  }, []);

  const handleManualOpen = () => {
    if (Object.keys(timeLeft).length === 0) {
      setIsOpen(true);
      localStorage.setItem('project_revealed', '1');
    } else {
      // 3. Play the audio when they click "Open" too early
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Restart song if clicked again
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      }
      setShowWarning(true);
    }
  };

  const closeWarning = () => {
    // 4. Pause audio when they close the warning (Optional)
    // If you want the song to keep playing, remove these lines.
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setShowWarning(false);
  };

  if (isOpen) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center text-white font-mono flex-col p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      
      {/* Countdown Title */}
      <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse drop-shadow-lg">
        Coming Soon...
      </h1>

      {/* Timer Cards */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-center">
        {Object.keys(timeLeft).map((interval) => (
          <div key={interval} className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 min-w-[100px] shadow-[0_0_15px_rgba(120,115,245,0.2)] transform hover:scale-105 transition-transform duration-300">
            <span className="text-4xl md:text-5xl font-bold block text-white mb-2">{timeLeft[interval] || '0'}</span>
            <span className="text-xs md:text-sm uppercase tracking-widest text-gray-400">{interval}</span>
          </div>
        ))}
      </div>

      {/* Main Button */}
      <button 
        onClick={handleManualOpen}
        className="mt-16 px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-bold text-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-300 border border-white/20"
      >
        Open Surprise 🎁
      </button>

      {/* --- STYLISH POPUP MODAL --- */}
      {showWarning && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeWarning}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-gray-900 border border-pink-500/50 p-8 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.4)] max-w-sm w-full text-center transform animate-[bounceIn_0.5s_ease-out]">
            <div className="text-6xl mb-4 animate-bounce">🤫</div>
            <h3 className="text-2xl font-bold text-pink-400 mb-2">Not Yet!</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Wait panra! Don't try to open before the birthday!
            </p>
            <button 
              onClick={closeWarning}
              className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors border border-gray-600"
            >
              Okay, I'll wait 😇
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReleaseGate;
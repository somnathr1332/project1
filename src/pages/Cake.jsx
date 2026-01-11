import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

const Cake = () => {
  const [candles, setCandles] = useState([true, true, true, true, true]); // true = burning
  const navigate = useNavigate();
  const cakeRef = useRef();

  useEffect(() => {
    // Animate cake entrance with a bounce
    gsap.fromTo(cakeRef.current, 
      { scale: 0, y: 100, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    );

    // Floating balloons logic
    gsap.to('.balloon', {
      y: 'random(-20, 20)',
      x: 'random(-10, 10)',
      rotation: 'random(-5, 5)',
      duration: 'random(2, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2
    });
  }, []);

  const blowCandle = (index) => {
    if (!candles[index]) return;
    
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    // Check if all blown
    if (newCandles.every(c => c === false)) {
      triggerCelebration();
    }
  };

  const triggerCelebration = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    // 1. Confetti Explosion
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6ec4', '#7873f5', '#ffcc00', '#ff4e91']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6ec4', '#7873f5', '#ffcc00', '#ff4e91']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 2. Animate Santa Flying Across
    gsap.fromTo('.santa-sleigh', 
      { x: '-100vw', y: '20vh', rotation: -5, scale: 0.8 },
      { 
        x: '120vw', 
        y: '-40vh', 
        rotation: -15, 
        duration: 8, 
        ease: "power1.inOut",
        delay: 0.5 
      }
    );
  };

  const allBlown = candles.every(c => c === false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🎈', '🎈', '🎈', '🎈', '🎈', '🎈'].map((balloon, i) => (
          <div key={i} className="balloon absolute text-4xl opacity-40 filter blur-[1px]" 
               style={{ left: `${10 + i * 15}%`, top: `${10 + (i % 2) * 20}%` }}>
            {balloon}
          </div>
        ))}
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute text-yellow-100 animate-pulse" 
               style={{ 
                 left: `${Math.random()*100}%`, 
                 top: `${Math.random()*100}%`, 
                 animationDelay: `${Math.random()*3}s`,
                 fontSize: `${Math.random()*10 + 5}px`,
                 opacity: 0.5
               }}>
            ✨
          </div>
        ))}
      </div>

      {/* --- SANTA & DEER ANIMATION CONTAINER --- */}
      <div className="santa-sleigh absolute top-1/2 left-0 z-0 pointer-events-none flex items-center transform -translate-x-full">
         <div className="text-6xl filter drop-shadow-lg -mr-4 transform scale-x-[-1]">🦌</div>
         <div className="text-6xl filter drop-shadow-lg -mr-4 transform scale-x-[-1] mt-4">🦌</div>
         <div className="text-8xl filter drop-shadow-2xl ml-4 transform scale-x-[-1]">🛷</div>
         <div className="text-6xl absolute top-[-10px] right-[40px] animate-bounce">🎅</div>
         <div className="absolute top-10 right-0 w-40 h-2 bg-gradient-to-l from-transparent to-yellow-200 blur-md opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-12 w-full">
        
        {/* --- LUXURY FLORAL CAKE --- */}
        <div ref={cakeRef} className="relative mt-16 mb-8 scale-[0.85] md:scale-100">
          
          {/* Cake Stand */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-16 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-[100%] border-b-4 border-gray-400 shadow-2xl z-0"></div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-24 bg-gradient-to-b from-gray-300 to-gray-400 z-0"></div>

          {/* === BOTTOM TIER (Pink & Roses) === */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
             <div className="w-72 h-36 bg-gradient-to-r from-[#ff9a9e] via-[#fad0c4] to-[#ff9a9e] rounded-b-3xl relative overflow-hidden shadow-lg border-b-2 border-pink-300">
                {/* Texture */}
                <div className="absolute w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.2)_20px,rgba(255,255,255,0.2)_40px)]"></div>
             </div>
             {/* Top Surface */}
             <div className="absolute -top-10 left-0 w-72 h-20 bg-[#fad0c4] rounded-[50%] border-b-4 border-pink-200"></div>
             
             {/* FLORAL RING BOTTOM */}
             <div className="absolute bottom-1 left-0 w-full flex justify-center items-end gap-1 px-2">
                 {[...Array(9)].map((_, i) => (
                     <div key={i} className="text-2xl filter drop-shadow-md transform hover:scale-110 transition-transform cursor-pointer" style={{ marginTop: i % 2 === 0 ? '-5px' : '0' }}>
                         {i % 2 === 0 ? '🌺' : '🌸'}
                     </div>
                 ))}
             </div>
          </div>

          {/* === MIDDLE TIER (Purple & Garlands) === */}
          <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20">
             <div className="w-56 h-28 bg-gradient-to-r from-[#a18cd1] via-[#fbc2eb] to-[#a18cd1] rounded-b-3xl relative shadow-lg border-b-2 border-purple-300"></div>
             {/* Top Surface */}
             <div className="absolute -top-8 left-0 w-56 h-16 bg-[#fbc2eb] rounded-[50%] border-b-4 border-purple-200"></div>
             
             {/* Swag/Garland Decoration */}
             <div className="absolute top-2 left-0 w-full">
                 <svg viewBox="0 0 224 50" className="w-full h-full fill-none stroke-white stroke-2 opacity-80">
                    <path d="M0,0 Q28,25 56,0 Q84,25 112,0 Q140,25 168,0 Q196,25 224,0" />
                 </svg>
             </div>
             {/* FLORAL ACCENTS ON GARLAND */}
             <div className="absolute top-0 left-0 w-full flex justify-between px-1">
                 {[...Array(5)].map((_,i) => (
                     <div key={i} className="text-xl filter drop-shadow-sm transform rotate-12">🌹</div>
                 ))}
             </div>
          </div>

          {/* === TOP TIER (Blue & Daisies) === */}
          <div className="absolute bottom-52 left-1/2 transform -translate-x-1/2 z-30">
             <div className="w-40 h-24 bg-gradient-to-r from-[#84fab0] to-[#8fd3f4] rounded-b-3xl relative shadow-lg"></div>
             {/* Top Surface (Frosting) */}
             <div className="absolute -top-6 left-0 w-40 h-14 bg-white rounded-[50%] flex items-center justify-center border-b-4 border-gray-100">
                 
                 {/* === CANDLES === */}
                 <div className="absolute -top-4 flex gap-3 items-end z-40">
                    {candles.map((isBurning, i) => (
                      <div 
                        key={i} 
                        className="relative group cursor-pointer transition-transform hover:scale-110"
                        onClick={() => blowCandle(i)}
                        onMouseEnter={() => blowCandle(i)}
                        style={{ marginBottom: i === 2 ? '8px' : '0px' }}
                      >
                        <div className="w-2 h-14 bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 rounded-sm shadow-md"></div>
                        
                        {/* FLAME or REALISTIC SMOKE */}
                        {isBurning ? (
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-8">
                             <div className="w-full h-full bg-orange-500 rounded-full blur-[2px] animate-pulse"></div>
                             <div className="absolute top-1 left-1 w-2 h-4 bg-yellow-300 rounded-full animate-flicker"></div>
                             <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
                          </div>
                        ) : (
                          // === BIG REALISTIC WHITE SMOKE ===
                          <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-8 h-full overflow-visible pointer-events-none">
                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-200 rounded-full blur-[3px] opacity-80 animate-[smoke-rise_2.5s_ease-out_forwards]"></div>
                             <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full blur-[5px] opacity-60 animate-[smoke-rise_3s_ease-out_0.2s_forwards]"></div>
                             <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-5 h-5 bg-gray-100 rounded-full blur-[4px] opacity-50 animate-[smoke-rise_3.5s_ease-out_0.4s_forwards]"></div>
                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/40 rounded-full blur-[8px] opacity-40 animate-[smoke-rise_4s_ease-out_0.1s_forwards]"></div>
                          </div>
                        )}
                      </div>
                    ))}
                 </div>

             </div>
             
             {/* FLORAL TOPPER RIM */}
             <div className="absolute -top-2 left-0 w-full flex justify-center gap-4 drop-shadow-sm pointer-events-none">
                {[...Array(3)].map((_, i) => (
                   <div key={i} className="text-sm">🌼</div>
                ))}
             </div>
          </div>
          
          <div className="w-80 h-80"></div>
        </div>

        {/* MESSAGES */}
        <div className="h-32 flex flex-col items-center justify-center text-center px-4 w-full max-w-2xl z-40">
          {!allBlown ? (
             <div className="animate-bounce-in bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <p className="text-2xl md:text-4xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 tracking-wide">
                  Make a Wish! ✨
                </p>
                <p className="text-sm text-gray-300 mt-2 font-medium tracking-wider uppercase">
                  Blow out the candles (Hover/Click)
                </p>
             </div>
          ) : (
            <div className="animate-zoom-in">
              <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6 drop-shadow-lg font-poppins">
                Happy Birthday! 🎂
              </h2>
              <button 
                onClick={() => navigate('/letter')}
                className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300 border border-white/20"
              >
                Open Your Gift 🎁
              </button>
            </div>
          )}
        </div>

      </div>
      
      {/* Animation Styles */}
      <style>{`
        @keyframes smoke-rise {
          0% { transform: translateX(-50%) translateY(0) scale(0.5); opacity: 0.8; }
          40% { opacity: 0.6; }
          100% { transform: translateX(-50%) translateY(-140px) scale(4); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Cake;
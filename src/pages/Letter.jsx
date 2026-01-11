import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import confetti from 'canvas-confetti';
import img3 from '../Image/10.png';

const Letter = () => {
  const el = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        `My dearest Roshika,^1000\n\nThinking about us always brings a smile to my face. From our days back in 9th standard to now, it's amazing how many beautiful memories we've created together. From classroom laughs and innocent moments to late-night talks and spontaneous adventures, every phase with you has been special ✨^500\n\nYou've filled my life with joy, laughter, and warmth just by being you. I'm truly grateful to have you by my side through all these years 💫^500\n\nOn your special day, I just want to say thank you—for everything.^500\nHappy Birthday to my favorite person in the world 🎂💖^1000\n\nWith love,\nSomnath`
      ],
      typeSpeed: 40,
      showCursor: true,
      cursorChar: '|',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleSurprise = () => {
    setShowModal(true);
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff6ec4', '#a18cd1']
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8e1f4] via-[#e0c3f7] to-[#c2e6ff] flex flex-col items-center justify-center p-4 md:p-8 font-poppins">
      
      {/* Main Container */}
      <div className="w-full max-w-2xl animate-fade-in-up flex flex-col gap-6">
        
        {/* Header */}
        <h1 className="text-2xl md:text-4xl text-center text-[#6a4c93] font-bold drop-shadow-sm font-pacifico leading-relaxed">
            For My Dearest Friend ❤️
        </h1>

        {/* Letter Paper */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl md:rounded-3xl p-6 md:p-10 shadow-2xl min-h-[300px] md:min-h-[400px] relative border border-white/50">
            {/* Decorative 'tape' at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-pink-200/50 -rotate-2"></div>
            
            <div className="prose prose-purple max-w-none">
                {/* Changed leading-loose to leading-relaxed for tighter spacing */}
                <span className="text-base md:text-lg leading-relaxed text-gray-800 whitespace-pre-line font-medium" ref={el}></span>
            </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-4 mb-8">
            <button 
                onClick={handleSurprise}
                className="px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-[#ff9a9e] to-[#a18cd1] text-white text-lg md:text-xl font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 animate-pulse"
            >
                Click for a Surprise! 🎁
            </button>
        </div>
      </div>

      {/* Surprise Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
            <div 
                className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md text-center relative animate-bounce-in shadow-2xl" 
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                    ✕
                </button>
                
                <h2 className="text-xl md:text-2xl font-bold text-[#6a4c93] mb-4 mt-2">🎉 Your Special Surprise! 🎉</h2>
                
                <div className="relative overflow-hidden rounded-xl shadow-inner border-2 border-pink-100">
                    <img 
                        src={img3} 
                        alt="Surprise" 
                        className="w-full h-auto max-h-[60vh] object-cover"
                        onError={(e) => e.target.src = 'https://placehold.co/500x400?text=Surprise+Photo'}
                    />
                </div>
                
                <p className="mt-4 text-gray-600 font-medium italic">The best is yet to come! 🥳</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default Letter;
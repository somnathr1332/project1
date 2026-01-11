import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP floating elements animation
    const elements = document.querySelectorAll('.floating-item');
    elements.forEach((el) => {
      gsap.to(el, {
        y: 'random(-100, 100)',
        x: 'random(-50, 50)',
        rotation: 'random(-90, 90)',
        duration: 'random(5, 10)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);

  const handleNext = () => {
    navigate('/memory-lane');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#ece7e7] flex flex-col items-center justify-center relative font-comic">
      {/* Floating Background Elements */}
      {[...Array(20)].map((_, i) => (
        <div key={i} className="floating-item absolute text-2xl opacity-60 pointer-events-none" 
             style={{ 
               left: `${Math.random() * 100}%`, 
               top: `${Math.random() * 100}%` 
             }}>
           {['🎈', '❤️', '✨', '🎂'][i % 4]}
        </div>
      ))}

      <div className="z-10 text-center p-8 bg-white/30 backdrop-blur-md rounded-3xl shadow-xl w-11/12 md:max-w-2xl transform hover:scale-105 transition-all duration-500 border border-white/50">
        <h1 className="text-4xl md:text-5xl font-bold text-deep-pink mb-6 animate-bounce-in drop-shadow-lg">
          Happy Birthday,<br/> Dear Roshika! 🎉
        </h1>
        
        <div className="h-16 flex items-center justify-center">
            <p className="text-xl md:text-2xl text-soft-purple font-semibold overflow-hidden whitespace-nowrap animate-[typing_3.5s_steps(40,end)] border-r-4 border-soft-purple pr-2">
                Hey Bday baby! Ready for <br /> your surprise? 
            </p>
        </div>

        <button 
          onClick={handleNext}
          className="mt-8 px-10 py-4 text-xl font-bold text-white bg-gradient-to-r from-deep-pink to-soft-purple rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-pulse-slow"
        >
          Let's Go! ✨
        </button>
      </div>
    </div>
  );
};

export default Welcome;
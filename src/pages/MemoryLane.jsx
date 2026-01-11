import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../Image/1.jpg';
import img2 from '../Image/2.jpg';
import img3 from '../Image/3.jpg';
import img4 from '../Image/4.jpg';
import img5 from '../Image/5.jpg';
import img6 from '../Image/6.jpg';
import img7 from '../Image/7.png';
import img8 from '../Image/8.jpg';

gsap.registerPlugin(ScrollTrigger);

// Updated memories with Flower Emojis 🌸
const memories = [
  { img: img1, emoji: '🌹', rotate: 1 },   // Rose
  { img: img2, emoji: '🌻', rotate: 3 },   // Sunflower
  { img: img3, emoji: '🌷', rotate: -2 },  // Tulip
  { img: img4, emoji: '🌸', rotate: 2 },   // Cherry Blossom
  { img: img5, emoji: '🌺', rotate: -3 },  // Hibiscus
  { img: img6, emoji: '🌼', rotate: 1 },   // Blossom
  { img: img7, emoji: '💐', rotate: -1 },  // Bouquet
  { img: img8, emoji: '🏵️', rotate: 2 },   // Rosette
];

const MemoryLane = () => {
  const containerRef = useRef();
  const navigate = useNavigate();
  
  // Slideshow State
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // 1. Animate Memory Cards
    const cards = gsap.utils.toArray('.memory-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          }
        }
      );
    });

    // 2. Animate Existing Stickers
    gsap.to('.sticker', {
        y: 'random(-20, 20)',
        rotation: 'random(-15, 15)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // 3. WIDE FALLING ANIMATION (Continuous Random Rain)
    const balloons = gsap.utils.toArray('.bg-balloon');
    
    const animateParticle = (el, isFirstRun = false) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      gsap.set(el, { 
        x: gsap.utils.random(0, windowWidth), 
        y: isFirstRun ? gsap.utils.random(-windowHeight, 0) : -100, 
        scale: gsap.utils.random(0.5, 1.2),
        opacity: gsap.utils.random(0.4, 0.8),
        rotation: gsap.utils.random(-15, 15)
      });

      gsap.to(el, {
        y: windowHeight + 100, 
        x: `+=${gsap.utils.random(-150, 150)}`, 
        rotation: gsap.utils.random(-180, 180), 
        duration: gsap.utils.random(6, 15), 
        ease: 'none', 
        onComplete: () => animateParticle(el, false) 
      });
    };

    balloons.forEach(balloon => animateParticle(balloon, true));

  }, []);

  // Slideshow Logic: Auto-advance
  useEffect(() => {
    let interval;
    if (isSlideshowOpen) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % memories.length);
      }, 3000); // 3 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isSlideshowOpen]);

  const openSlideshow = (index = 0) => {
    setCurrentSlide(index);
    setIsSlideshowOpen(true);
  };

  const closeSlideshow = () => {
    setIsSlideshowOpen(false);
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffcee6] via-[#ffd6f1] to-[#e4f9ff] py-10 px-4 relative overflow-hidden font-poppins">
      
      {/* --- BACKGROUND FALLING PARTICLES (Full Width Rain) --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <div key={i} className="bg-balloon absolute text-5xl top-0 left-0 will-change-transform">
            {['🎈', '🌹', '✨', '❤️', '🎉', '🧁', '🎈', '🌹'][i % 8]}
          </div>
        ))}
      </div>

      {/* Existing Decorative Stickers (Foreground) */}
      <div className="sticker absolute top-20 left-10 text-6xl opacity-80 z-10">✨</div>
      <div className="sticker absolute bottom-40 right-10 text-6xl opacity-80 z-10">💖</div>
      <div className="sticker absolute top-1/2 right-20 text-6xl opacity-80 z-10">🎂</div>

      <header className="text-center mb-12 relative z-10">
        <h1 className="text-5xl md:text-6xl font-pacifico text-b-rose mb-4 drop-shadow-md animate-heartbeat">
          Our Memory Lane
        </h1>
        <p className="text-lg text-[#8858a3] bg-white/50 inline-block px-6 py-2 rounded-full shadow-sm backdrop-blur-sm">
            A journey through Your Cute and Beautiful moments ✨
        </p>
        
        {/* Slideshow Button */}
        <div className="mt-6">
            <button 
                onClick={() => openSlideshow(0)}
                className="px-6 py-2 bg-white/80 text-deep-pink rounded-full font-bold shadow hover:bg-white transition-all flex items-center gap-2 mx-auto"
            >
                ▶ Watch Slideshow
            </button>
        </div>
      </header>

      {/* Gallery Scroll */}
      <div className="relative z-20 flex overflow-x-auto gap-8 py-10 px-4 pb-16 snap-x snap-mandatory scrollbar-hide" ref={containerRef}>
        {memories.map((mem, i) => (
          <div 
            key={i} 
            onClick={() => openSlideshow(i)}
            className="memory-card relative flex-shrink-0 w-[300px] h-[400px] bg-white p-2 rounded-2xl shadow-xl transform transition-transform hover:scale-105 hover:z-20 snap-center border-8 border-white cursor-pointer"
            style={{ transform: `rotate(${mem.rotate}deg)` }}
          >
            {/* Tape Effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/80 shadow-sm rotate-2 z-10"></div>
            
            <img 
              src={mem.img} 
              alt="Memory" 
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => e.target.src = 'https://placehold.co/300x400/ffcee6/white?text=Memory'} 
            />
            
            <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md text-2xl">
                {mem.emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="relative z-20 flex flex-col md:flex-row justify-center gap-6 mt-8">
        <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-white text-b-purple rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
        >
            ← Back
        </button>
        <button 
            onClick={() => navigate('/cake')}
            className="px-8 py-3 bg-gradient-to-r from-b-rose to-[#ff9a8b] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all animate-pulse"
        >
            Next Surprise! ✨
        </button>
      </div>

      {/* --- SLIDESHOW OVERLAY --- */}
      {isSlideshowOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={closeSlideshow}>
            {/* Close Button */}
            <button className="absolute top-4 right-4 text-white text-4xl hover:text-red-400 z-50">×</button>

            {/* Main Slide */}
            <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <img 
                    src={memories[currentSlide].img} 
                    alt="Slide"
                    className="max-h-[80vh] w-auto rounded-lg shadow-2xl border-4 border-white animate-fade-in"
                    onError={(e) => e.target.src = 'https://placehold.co/600x800/ffcee6/white?text=Memory'}
                />
                <div className="mt-4 text-white text-6xl drop-shadow-lg">{memories[currentSlide].emoji}</div>
                
                {/* Controls */}
                <button 
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white text-5xl hover:scale-125 transition-transform"
                >
                    ‹
                </button>
                <button 
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white text-5xl hover:scale-125 transition-transform"
                >
                    ›
                </button>
                
                {/* Indicator Dots */}
                <div className="flex gap-2 mt-4">
                    {memories.map((_, idx) => (
                        <div 
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${idx === currentSlide ? 'bg-deep-pink' : 'bg-gray-500'}`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default MemoryLane;
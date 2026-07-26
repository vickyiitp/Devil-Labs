import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const IMAGES = [
  '/src/assets/images/hero_builder_cityscape_1784785823510.jpg',
  '/src/assets/images/hero_intelligent_systems_1784785833146.jpg',
  '/src/assets/images/hero_problem_chaos_1784785846477.jpg'
];

export default function HeroImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-stone-950 pointer-events-none rounded-[inherit]">
      
      {/* Background Images with Ken Burns effect */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={IMAGES[currentIndex]}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ opacity: 0, scale: 1.1, filter: 'contrast(1.1) brightness(0.65)' }}
          animate={{ opacity: 0.65, scale: 1, filter: 'contrast(1.1) brightness(0.75)' }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            opacity: { duration: 2, ease: 'easeInOut' },
            scale: { duration: 8, ease: 'easeOut' }
          }}
        />
      </AnimatePresence>

      {/* Vignette overlay for text legibility */}
      <div className="absolute inset-0 bg-stone-950/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_100%)] pointer-events-none opacity-80" />
      
      {/* Cinematic Glitch/Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-40 mix-blend-overlay pointer-events-none" />

      {/* Floating Cyber Dust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 mix-blend-screen">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-1 h-1 bg-rose-500/40 rounded-full blur-[1px]"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 1.5 + 0.5,
              opacity: 0,
            }}
            animate={{
              y: [null, `${Math.random() * 100}%`],
              x: [null, `${Math.random() * 100}%`],
              opacity: [0, Math.random() * 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
      
      {/* Dynamic light sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-rose-500/10 to-transparent w-[200%] h-[200%] -top-1/2 -left-1/2 rotate-45 pointer-events-none mix-blend-overlay"
        animate={{
          x: ['-100%', '100%'],
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
      />
    </div>
  );
}

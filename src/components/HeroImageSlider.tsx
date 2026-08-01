import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import heroImg1 from '../assets/images/image.jpg';
const heroImg2 = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80';
const heroImg3 = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80';

const IMAGES = [heroImg1, heroImg2, heroImg3];

export default function HeroImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505] pointer-events-none rounded-[inherit]">
      
      {/* Background Images with Ken Burns effect */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={IMAGES[currentIndex]}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ opacity: 0, scale: 1.08, filter: 'contrast(1.05) saturate(1.1) brightness(0.95)' }}
          animate={{ opacity: 0.35, scale: 1, filter: 'contrast(1.1) saturate(1.15) brightness(1)' }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{
            opacity: { duration: 1.8, ease: 'easeInOut' },
            scale: { duration: 8, ease: 'easeOut' }
          }}
        />
      </AnimatePresence>

      {/* Deep gradient overlay for text contrast and color harmony */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.9)_100%)] pointer-events-none" />
      
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

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';
import CursorTrail from './CursorTrail';

export default function BackgroundEffects() {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);
    if (isTouchDevice) {
      // Set to static ambient center on mobile
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 3);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const boxes = document.querySelectorAll('.debug-box');
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i] as HTMLElement;
        const rect = box.getBoundingClientRect();
        box.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        box.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <CursorTrail />
      {/* Premium Floating Soft Abstract Orbs (Living Background Mesh) */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -70, 50, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-1/4 right-[10%] w-[350px] h-[350px] rounded-full bg-violet-200/25 blur-[100px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed bottom-1/3 left-[5%] w-[400px] h-[400px] rounded-full bg-rose-200/20 blur-[120px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          x: [0, 40, -50, 0],
          y: [0, 50, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-1/2 left-[40%] w-[300px] h-[300px] rounded-full bg-amber-150/15 blur-[90px] pointer-events-none -z-10"
      />

      {/* Dynamic Ambient Glow Follower */}
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-violet-200/25 to-rose-200/20 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-normal"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
      {/* Organic Cardstock Texture Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.015] bg-noise" />
    </>
  );
}


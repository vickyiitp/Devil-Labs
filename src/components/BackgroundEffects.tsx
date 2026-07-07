import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';
import CursorTrail from './CursorTrail';

export default function BackgroundEffects() {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
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
      {/* Dynamic Ambient Glow Follower */}
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-violet-600/15 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
      {/* Grain / Noise Overlay for Brutalist Texture */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-difference bg-noise" />
    </>
  );
}


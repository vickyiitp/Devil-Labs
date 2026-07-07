import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function InteractiveMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative overflow-hidden bg-[#0A0A0A] rounded-[2rem] border border-white/5 flex items-center justify-center [perspective:1000px]"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-64 h-64 md:w-96 md:h-96"
      >
        {/* Wireframe Box or Mesh */}
        <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" style={{ transform: 'rotateX(60deg)' }} />
        <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_12s_linear_infinite_reverse]" style={{ transform: 'rotateY(60deg)' }} />
        <div className="absolute inset-0 border border-violet-500/30 rounded-full animate-[spin_15s_linear_infinite]" style={{ transform: 'rotateZ(60deg) rotateX(30deg)' }} />
        
        {/* Grid pattern overlay that moves with mouse */}
        <motion.div 
          className="absolute inset-[-50%] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
          style={{
            x: useTransform(springX, [-0.5, 0.5], [-20, 20]),
            y: useTransform(springY, [-0.5, 0.5], [-20, 20]),
            translateZ: 50
          }}
        />

        {/* Center glowing core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-violet-500 rounded-full blur-xl" style={{ transform: 'translateZ(100px)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]" style={{ transform: 'translateZ(100px)' }} />
      </motion.div>

      {/* Subtle overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent pointer-events-none mix-blend-screen" />
      
      {/* Badge */}
      <div className="absolute bottom-6 right-6 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded font-mono text-[10px] text-gray-400 tracking-widest uppercase">
        [ Core Alpha // Devil Labs ]
      </div>
    </div>
  );
}

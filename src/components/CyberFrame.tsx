import React from 'react';
import { motion } from 'motion/react';

interface CyberFrameProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'violet' | 'fuchsia' | 'blue';
}

export default function CyberFrame({ children, className = '', glowColor = 'violet' }: CyberFrameProps) {
  const glowColors = {
    violet: 'group-hover:border-violet-500/50 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    fuchsia: 'group-hover:border-fuchsia-500/50 group-hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]',
    blue: 'group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
  };

  const accentColors = {
    violet: 'border-violet-500',
    fuchsia: 'border-fuchsia-500',
    blue: 'border-blue-500',
  };

  const scannerColors = {
    violet: 'via-violet-500/50',
    fuchsia: 'via-fuchsia-500/50',
    blue: 'via-blue-500/50',
  };

  return (
    <div className={`relative group border border-white/10 transition-all duration-500 bg-black/20 backdrop-blur-sm ${glowColors[glowColor]} ${className}`}>
      {/* Corner Brackets */}
      <div className={`absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 ${accentColors[glowColor]} opacity-30 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none`} />
      <div className={`absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 ${accentColors[glowColor]} opacity-30 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none`} />
      <div className={`absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 ${accentColors[glowColor]} opacity-30 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none`} />
      <div className={`absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 ${accentColors[glowColor]} opacity-30 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none`} />
      
      {/* Scanner Line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
        <motion.div 
          className={`absolute left-0 right-0 h-px bg-gradient-to-r from-transparent ${scannerColors[glowColor]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        />
      </div>
      
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}

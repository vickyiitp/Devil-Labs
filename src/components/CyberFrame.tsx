import React from 'react';
import { motion } from 'motion/react';

interface CyberFrameProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'violet' | 'fuchsia' | 'blue';
}

export default function CyberFrame({ children, className = '', glowColor = 'violet' }: CyberFrameProps) {
  // Pastel color pairings representing creative organic brand highlights
  const pastelAccents = {
    violet: 'from-violet-300 via-purple-300 to-rose-200',
    fuchsia: 'from-rose-300 via-pink-300 to-amber-200',
    blue: 'from-sky-300 via-indigo-200 to-emerald-200',
  };

  const softBorders = {
    violet: 'border-violet-100/60',
    fuchsia: 'border-rose-100/60',
    blue: 'border-sky-100/60',
  };

  return (
    <div className={`relative group overflow-hidden interactive-clay-card rounded-[24px] ${className} p-6 md:p-8`}>
      {/* Playful top organic colored accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pastelAccents[glowColor]} opacity-90`} />
      
      {/* Subtle overlay gradient that highlights on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent pointer-events-none" />

      {/* Soft floating background light effect */}
      <div className="absolute -right-12 -top-12 w-28 h-28 bg-gradient-to-br from-violet-200/10 to-rose-200/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}


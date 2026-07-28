import React from 'react';

interface DevilLabsLogoProps {
  className?: string;
  glow?: boolean;
}

export default function DevilLabsLogo({ className = "w-7 h-7", glow = false }: DevilLabsLogoProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-violet-500/30 rounded-full blur-md animate-pulse" />
      )}
      <img
        src="https://github.com/Devil-Labs.png"
        alt="Devil Labs Logo"
        className="w-full h-full object-cover rounded-full border border-violet-500/30 transition-transform duration-500 group-hover:scale-110 shadow-sm"
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.src = "https://avatars.githubusercontent.com/u/159239853?s=200&v=4";
        }}
      />
    </div>
  );
}


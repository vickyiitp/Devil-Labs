import React from 'react';

interface DevilLabsLogoProps {
  className?: string;
  glow?: boolean;
}

export default function DevilLabsLogo({ className = "w-6 h-6", glow = false }: DevilLabsLogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-violet-300/30 rounded-full blur-lg animate-pulse" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
      >
        <defs>
          <linearGradient id="logo-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          
          <linearGradient id="logo-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>

        {/* Soft drop-shadow representation */}
        <path
          d="M25 60 C25 35, 55 20, 75 35 C95 50, 95 70, 75 85 C55 100, 25 85, 25 60"
          stroke="rgba(45, 38, 32, 0.05)"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />

        {/* Soft colorful back loop */}
        <path
          d="M25 60 C25 35, 55 20, 75 35 C95 50, 95 70, 75 85 C55 100, 25 85, 25 60 Z"
          stroke="url(#logo-grad-2)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        {/* Vibrant front loop overlapping beautifully */}
        <path
          d="M60 30 C75 20, 95 35, 95 60 C95 85, 65 100, 45 85 C25 70, 25 50, 45 35"
          stroke="url(#logo-grad-1)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />

        {/* Smiling creative center spark dot */}
        <circle cx="60" cy="60" r="10" fill="#ffffff" />
        <circle cx="60" cy="60" r="5" fill="#7c3aed" />
      </svg>
    </div>
  );
}


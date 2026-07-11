import React from 'react';

interface DevilLabsLogoProps {
  className?: string;
  glow?: boolean;
}

export default function DevilLabsLogo({ className = "w-6 h-6", glow = false }: DevilLabsLogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-xl animate-pulse" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transition-transform duration-300 group-hover:scale-110"
      >
        <defs>
          {/* Metallic Silver Gradient */}
          <linearGradient id="metal-silver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#D8D8D8" />
            <stop offset="70%" stopColor="#8A8A8A" />
            <stop offset="100%" stopColor="#4F4F4F" />
          </linearGradient>
          
          {/* Violet Glow Gradient */}
          <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>

          {/* Core Metal Fill with dark reflections */}
          <linearGradient id="logo-bevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* Outer subtle drop shadow glow */}
        <g filter="url(#glow)">
          {/* Trident / Crown Spikes */}
          {/* Left Spike */}
          <path
            d="M42 22 L34 44 L48 38 Z"
            fill="url(#logo-bevel)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* Right Spike */}
          <path
            d="M78 22 L86 44 L72 38 Z"
            fill="url(#logo-bevel)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* Center Main Spike */}
          <path
            d="M60 12 L50 44 L60 38 L70 44 Z"
            fill="url(#logo-bevel)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />

          {/* Left Block ('D' shape) */}
          <path
            d="M56 46 L34 46 L34 80 L56 96 Z"
            fill="url(#logo-bevel)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* Left Inner Cutout (making the D hollow) */}
          <path
            d="M48 54 L40 54 L40 76 L48 82 Z"
            fill="#050505"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />

          {/* Right Block ('L' shape) */}
          <path
            d="M64 46 L86 46 L86 80 L64 96 Z"
            fill="url(#logo-bevel)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* Right Inner Cutout (making the L look like an L/U) */}
          <path
            d="M70 46 L70 76 L80 76 L80 46 Z"
            fill="#050505"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          
          {/* Bevel highlights for shiny 3D look */}
          <path
            d="M60 12 L60 38"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M34 46 L34 80 M86 46 L86 80"
            stroke="#FFFFFF"
            strokeWidth="1"
            opacity="0.8"
          />
        </g>
      </svg>
    </div>
  );
}

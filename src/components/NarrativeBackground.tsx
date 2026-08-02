import React from 'react';
import { motion } from 'motion/react';

export type BackgroundTheme = 'pure-black' | 'charcoal' | 'crimson' | 'offwhite' | 'graphite';

interface NarrativeBackgroundProps {
  theme?: BackgroundTheme;
  accentGlow?: string;
  className?: string;
  children?: React.ReactNode;
}

const themeColors: Record<BackgroundTheme, { bg: string; text: string; glow: string }> = {
  'pure-black': { bg: '#050505', text: '#F5F4EF', glow: 'rgba(255, 255, 255, 0.03)' },
  'charcoal': { bg: '#0D0D11', text: '#F5F4EF', glow: 'rgba(124, 58, 237, 0.08)' },
  'crimson': { bg: '#1A080C', text: '#F5F4EF', glow: 'rgba(244, 63, 94, 0.12)' },
  'offwhite': { bg: '#EAE7DC', text: '#1A1815', glow: 'rgba(217, 119, 6, 0.08)' },
  'graphite': { bg: '#181A1F', text: '#F5F4EF', glow: 'rgba(59, 130, 246, 0.08)' },
};

export default function NarrativeBackground({
  theme = 'pure-black',
  accentGlow,
  className = '',
  children
}: NarrativeBackgroundProps) {
  const activeTheme = themeColors[theme] || themeColors['pure-black'];

  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: activeTheme.bg, color: activeTheme.text }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full overflow-hidden transition-colors duration-700 bg-noise ${className}`}
    >
      {/* Radial Atmospheric Lighting Glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-60 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${accentGlow || activeTheme.glow} 0%, transparent 70%)`
        }}
      />
      {children}
    </motion.div>
  );
}

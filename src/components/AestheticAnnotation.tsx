import React from 'react';
import { motion } from 'motion/react';

// Transition configurations for professional, snappy spring motion
const pathTransition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for responsive drawn effect
  delay: 0.15,
};

interface AnnotationProps {
  children?: React.ReactNode;
  className?: string;
  color?: string;
}

/**
 * Wraps text and draws an organic, hand-drawn double loop around it on scroll.
 */
export function HandDrawnCircle({ children, className = '', color = 'stroke-violet-500/85' }: AnnotationProps) {
  return (
    <span className={`relative inline-block px-1.5 py-0.5 ${className}`}>
      {/* Target Content */}
      <span className="relative z-10">{children}</span>

      {/* SVG Vector Layer */}
      <svg
        className="absolute inset-x-[-8px] inset-y-[-4px] w-[calc(100%+16px)] h-[calc(100%+8px)] pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 5,50 C 5,18 22,5 50,5 C 78,5 95,18 95,50 C 95,82 78,95 50,95 C 18,95 5,75 7,53 C 8,38 24,10 62,8 C 75,7 93,15 90,32 C 86,50 60,88 32,92"
          fill="none"
          className={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={pathTransition}
        />
      </svg>
    </span>
  );
}

/**
 * Underlines a word or heading with two organic, slightly overlapping sketched strokes.
 */
export function HandDrawnUnderline({ children, className = '', color = 'stroke-rose-400/85' }: AnnotationProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      
      <svg
        className="absolute left-0 right-0 bottom-[-4px] w-full h-[8px] pointer-events-none z-0"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        {/* Underline stroke 1 */}
        <motion.path
          d="M 2,4 C 30,3 70,5 98,3"
          fill="none"
          className={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={pathTransition}
        />
        {/* Underline stroke 2 */}
        <motion.path
          d="M 6,7 C 38,6 68,8 94,6"
          fill="none"
          className={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...pathTransition, delay: 0.3 }}
        />
      </svg>
    </span>
  );
}

interface ArrowProps {
  className?: string;
  color?: string;
  direction?: 'left' | 'right' | 'down';
}

/**
 * An organic, hand-drawn arrow pointing to adjacent elements.
 */
export function HandDrawnArrow({ className = '', color = 'stroke-violet-400/80', direction = 'right' }: ArrowProps) {
  // Arrow paths based on direction
  const paths = {
    right: {
      stem: "M 5,12 C 35,5 65,30 88,15",
      head1: "M 78,10 L 88,15 L 76,24"
    },
    left: {
      stem: "M 95,12 C 65,5 35,30 12,15",
      head1: "M 22,10 L 12,15 L 24,24"
    },
    down: {
      stem: "M 15,5 C 5,30 35,60 18,85",
      head1: "M 10,75 L 18,85 L 28,73"
    }
  };

  const selectedPaths = paths[direction];

  return (
    <svg
      className={`pointer-events-none z-0 ${className}`}
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      fill="none"
    >
      {/* Stem of the arrow */}
      <motion.path
        d={selectedPaths.stem}
        className={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={pathTransition}
      />
      {/* Arrowhead */}
      <motion.path
        d={selectedPaths.head1}
        className={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ ...pathTransition, delay: 0.5 }}
      />
    </svg>
  );
}

interface BlueprintStickyProps {
  title: string;
  notes: string[];
  number?: string;
  className?: string;
  rotation?: number; // Rotate slightly for organic placement
  badgeColor?: string;
}

/**
 * A beautiful, design-blueprint style card showing technical notes/annotations.
 */
export function BlueprintStickyNote({
  title,
  notes,
  number = '01',
  className = '',
  rotation = -1.5,
  badgeColor = 'bg-violet-600 text-white'
}: BlueprintStickyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ 
        y: -4, 
        rotate: rotation * 0.4,
        scale: 1.02,
        boxShadow: "0 15px 30px -10px rgba(124,58,237,0.12), 0 1px 3px rgba(0,0,0,0.05)"
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      style={{ rotate: `${rotation}deg` }}
      className={`clay-card p-6 md:p-8 relative overflow-hidden bg-white/95 border border-stone-200/55 rounded-2xl shadow-sm text-left ${className}`}
    >
      {/* Drafting/Blueprint grid overlay background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e1d8_1px,transparent_1px)] bg-[size:12px_12px] opacity-40 pointer-events-none" />
      
      {/* Drafting Corner Crosshair Marks */}
      <div className="absolute top-2 left-2 text-[9px] text-stone-300 select-none font-sans font-bold pointer-events-none">+</div>
      <div className="absolute top-2 right-2 text-[9px] text-stone-300 select-none font-sans font-bold pointer-events-none">+</div>
      <div className="absolute bottom-2 left-2 text-[9px] text-stone-300 select-none font-sans font-bold pointer-events-none">+</div>
      <div className="absolute bottom-2 right-2 text-[9px] text-stone-300 select-none font-sans font-bold pointer-events-none">+</div>

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4 relative z-10 font-sans text-[10px] tracking-widest font-black border-b border-stone-100 pb-2">
        <div className="flex items-center space-x-1.5 text-stone-400">
          <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
          <span>PILLAR {number}</span>
        </div>
        <span className={`px-2 py-0.5 text-[8px] rounded uppercase font-black tracking-wider ${badgeColor}`}>
          Verified
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-3.5">
        <h4 className="font-display font-black text-stone-850 uppercase tracking-tight text-xs flex items-center gap-1.5">
          <span className="text-violet-600 font-sans text-[10px]">•</span> {title}
        </h4>
        <ul className="space-y-2 text-[11px] text-stone-500 leading-relaxed font-sans">
          {notes.map((note, index) => (
            <li key={index} className="flex items-start gap-1.5 group/note hover:text-stone-800 transition-colors">
              <span className="text-violet-600 font-sans font-black mt-0.5 shrink-0 select-none">›</span>
              <span className="font-normal">{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Aesthetic Tech Status Line */}
      <div className="mt-4 pt-2.5 border-t border-stone-100/50 flex items-center justify-between text-[8px] font-sans text-stone-400 tracking-widest uppercase relative z-10 font-bold">
        <span>Design Specification</span>
        <span className="font-bold text-violet-600">Verified</span>
      </div>
    </motion.div>
  );
}

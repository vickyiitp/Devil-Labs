import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Sparkles, Zap, Server, TrendingUp, ShieldCheck, ArrowRight,
  MessageSquareCode, Laptop, Globe, Radio, Compass, Lightbulb
} from 'lucide-react';
import { audioEngine } from '../lib/audio';

interface OrbitCard {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ElementType;
  glowColor: string;
  themeColor: string;
  // Positioning in desktop radial layout
  x: number;
  y: number;
  rotation: number;
  link: string;
}

const CARDS: OrbitCard[] = [
  {
    id: 1,
    title: 'AI AGENTS',
    subtitle: 'DEVIL LABS',
    desc: 'Autonomous loops with vector storage and safety guardrails.',
    icon: Cpu,
    glowColor: 'rgba(139, 92, 246, 0.45)', // Violet
    themeColor: 'from-violet-500 to-indigo-500',
    x: -250,
    y: -110,
    rotation: -14,
    link: '/services/ai-agents'
  },
  {
    id: 2,
    title: 'CLAY DESIGN',
    subtitle: 'DESIGN SYSTEM',
    desc: 'Luxurious soft-claymorphism and fluid micro-interactions.',
    icon: Sparkles,
    glowColor: 'rgba(236, 72, 153, 0.45)', // Pink
    themeColor: 'from-pink-500 to-rose-500',
    x: 240,
    y: -95,
    rotation: 12,
    link: '/services/fullstack'
  },
  {
    id: 3,
    title: 'AUTOMATION',
    subtitle: 'INTEGRATIONS',
    desc: 'High-throughput event queues and direct API pipes.',
    icon: Zap,
    glowColor: 'rgba(245, 158, 11, 0.45)', // Amber
    themeColor: 'from-amber-500 to-orange-500',
    x: -310,
    y: 20,
    rotation: -8,
    link: '/services/automation'
  },
  {
    id: 4,
    title: 'CLOUD STACK',
    subtitle: 'ARCHITECTURE',
    desc: 'Redundant VPS container orchestration with fast loads.',
    icon: Server,
    glowColor: 'rgba(16, 185, 129, 0.45)', // Emerald
    themeColor: 'from-emerald-500 to-teal-500',
    x: 300,
    y: 35,
    rotation: 15,
    link: '/services/vps'
  },
  {
    id: 5,
    title: 'TECH SEO',
    subtitle: 'VISIBILITY',
    desc: 'Semantic indexes structured for instant pre-rendering.',
    icon: TrendingUp,
    glowColor: 'rgba(59, 130, 246, 0.45)', // Blue
    themeColor: 'from-blue-500 to-cyan-500',
    x: -230,
    y: 135,
    rotation: -18,
    link: '/insights?id=1'
  },
  {
    id: 6,
    title: 'ENTERPRISE DEV',
    subtitle: 'TYPE SAFETY',
    desc: 'Strict schema boundaries with end-to-end type safety.',
    icon: ShieldCheck,
    glowColor: 'rgba(20, 184, 166, 0.45)', // Teal
    themeColor: 'from-teal-500 to-emerald-500',
    x: 230,
    y: 150,
    rotation: 22,
    link: '/services/ecommerce'
  }
];

interface FooterOrbitalCTAProps {
  navigate: (path: string) => void;
}

export default function FooterOrbitalCTA({ navigate }: FooterOrbitalCTAProps) {
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [isCenterHovered, setIsCenterHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x: x * 0.05, y: y * 0.05 });
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
    setIsCenterHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleCardClick = (link: string) => {
    audioEngine.playClick();
    navigate(link);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="w-full relative py-12 px-4 sm:px-6 lg:px-8 mt-12 mb-8 overflow-visible flex flex-col items-center justify-center border border-stone-200/35 bg-[#FAF9F5]/90 rounded-[28px] sm:rounded-[36px] shadow-[inset_0_2px_12px_rgba(45,38,32,0.02),0_15px_35px_rgba(45,38,32,0.03)] group/orbital transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* High-tech Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.22] pointer-events-none bg-[linear-gradient(to_right,rgba(139,92,246,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:24px_24px] rounded-[28px] sm:rounded-[36px]" />

      {/* Decorative orbital guide circles matching sketch layout */}
      <div className="absolute w-[440px] h-[440px] border border-dashed border-stone-200/40 rounded-full pointer-events-none hidden lg:block" />
      <div className="absolute w-[620px] h-[620px] border border-dashed border-stone-200/20 rounded-full pointer-events-none hidden lg:block" />

      {/* Outer Annotations */}
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center px-4 text-[9px] text-stone-400 font-sans tracking-widest uppercase pointer-events-none relative z-10 mb-4 select-none font-black">
        <div className="flex items-center space-x-1.5">
          <Radio size={10} className="text-violet-400 animate-pulse" />
          <span>STUDIO NETWORK ACTIVE</span>
        </div>
        <div className="hidden sm:block text-stone-300">✦ RADIAL SOLUTIONS & DESIGNS ✦</div>
        <div>SERVICES // 06</div>
      </div>

      {/* Main Workspace Frame */}
      <div className="relative w-full min-h-[480px] lg:h-[480px] flex items-center justify-center overflow-visible select-none py-10 lg:py-0">
        
        {/* DESKTOP INTERACTIVE ORBITAL PATTERN */}
        <div className="absolute inset-0 items-center justify-center hidden lg:flex overflow-visible pointer-events-none">
          <AnimatePresence>
            {CARDS.map((card) => {
              const isCardHovered = hoveredCardId === card.id;
              const isAnyCardHovered = hoveredCardId !== null;
              
              // Bring cards closer by 18% if central "Let's Talk" button is hovered
              const pullFactor = isCenterHovered ? 0.82 : 1.0;
              
              const targetX = card.x * pullFactor + mousePosition.x;
              const targetY = card.y * pullFactor + mousePosition.y;

              const Icon = card.icon;

              return (
                <motion.div
                  key={card.id}
                  style={{
                    position: 'absolute',
                    zIndex: isCardHovered ? 40 : 10,
                  }}
                  animate={{
                    x: targetX,
                    y: targetY,
                    rotate: isCardHovered ? card.rotation * 0.4 : card.rotation,
                    scale: isCardHovered ? 1.08 : isAnyCardHovered ? 0.94 : 1.0,
                    opacity: isAnyCardHovered && !isCardHovered ? 0.5 : 1.0,
                    boxShadow: isCardHovered 
                      ? `0px 20px 45px ${card.glowColor}, 0px 4px 12px rgba(0,0,0,0.06)` 
                      : '0px 8px 24px rgba(45,38,32,0.04)'
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 22,
                    mass: 0.8
                  }}
                  className="pointer-events-auto"
                >
                  {/* Staggered Float Animation wrapper */}
                  <motion.div
                    animate={{
                      y: [-4, 4, -4],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4.5 + card.id * 0.5,
                      ease: "easeInOut"
                    }}
                    onMouseEnter={() => {
                      setHoveredCardId(card.id);
                      audioEngine.playHover();
                    }}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onClick={() => handleCardClick(card.link)}
                    className={`w-[175px] h-[115px] p-4 rounded-2xl border bg-white/95 cursor-pointer relative flex flex-col justify-between text-left transition-all duration-300 ${
                      isCardHovered ? 'border-stone-800' : 'border-stone-200/80 hover:border-stone-400'
                    }`}
                  >
                    {/* Top row */}
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="font-mono text-[7px] text-stone-400 uppercase tracking-widest leading-none mb-0.5">
                          {card.subtitle}
                        </span>
                        <h4 className="font-display font-black text-[11px] text-stone-850 uppercase tracking-tight leading-none mt-1">
                          {card.title}
                        </h4>
                      </div>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br ${card.themeColor} text-white shadow-sm`}>
                        <Icon size={12} />
                      </div>
                    </div>

                    {/* Bottom row desc */}
                    <p className="text-[9px] text-stone-500 leading-normal font-sans font-medium line-clamp-2">
                      {card.desc}
                    </p>

                    {/* Card background glowing anchor */}
                    <div className="absolute inset-x-4 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* MOBILE GRID VIEW (Adaptive fallback layout for simple/touch access) */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 w-full max-w-lg lg:hidden relative z-20 px-2">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCardClick(card.link)}
                className="p-3.5 rounded-xl border border-stone-200 bg-white shadow-sm text-left flex flex-col justify-between space-y-2 cursor-pointer active:border-stone-800 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[7px] text-stone-400 uppercase tracking-widest">
                    {card.subtitle.split('//')[0]}
                  </span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center bg-gradient-to-br ${card.themeColor} text-white`}>
                    <Icon size={10} />
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-black text-[10px] text-stone-800 tracking-tight leading-none uppercase">
                    {card.title}
                  </h4>
                  <p className="text-[8px] text-stone-500 mt-1 font-sans leading-tight">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CENTRAL "LET'S TALK" INTERACTIVE PILL BUTTON */}
        <div className="absolute z-30 lg:pointer-events-auto">
          <motion.button
            id="orbital-cta-center-btn"
            onMouseEnter={() => {
              setIsCenterHovered(true);
              audioEngine.playHover();
            }}
            onMouseLeave={() => setIsCenterHovered(false)}
            onClick={() => handleCardClick('/contact')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-full relative flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300"
          >
            {/* Soft-Claymorphic Shadow and Gradient Background */}
            <div className="absolute inset-0 rounded-full bg-[#FAF9F5] border-2 border-stone-850 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_4px_12px_rgba(255,255,255,0.8),inset_0_-4px_12px_rgba(0,0,0,0.03)] z-0" />

            {/* Glowing Aura Ring */}
            <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500 to-rose-500 opacity-20 blur-md transition-all duration-500 ${isCenterHovered ? 'scale-110 opacity-35' : 'scale-100'}`} />

            {/* Interactive Pulse Rings */}
            <div className="absolute -inset-4 rounded-full border border-violet-500/10 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />

            <div className="relative z-10 flex flex-col items-center">
              <span className="font-sans text-[8px] text-violet-600 font-black tracking-[0.2em] mb-1">
                ✦ WORK WITH DEVIL LABS
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-display font-black text-xl sm:text-2xl text-stone-850 tracking-tight uppercase leading-none">
                  LET'S TALK
                </span>
                <ArrowRight size={16} className="text-violet-600 group-hover/orbital:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Bottom status indicator details */}
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center px-4 text-[8px] text-stone-400 font-sans tracking-widest uppercase pointer-events-none select-none font-black">
        <div>DEVIL LABS // CREATIVE DIRECTION</div>
        <div className="flex items-center space-x-1.5">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span>DESIGN SYSTEM READY</span>
        </div>
      </div>
    </div>
  );
}

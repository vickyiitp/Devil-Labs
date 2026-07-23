import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Sparkles, Zap, Server, TrendingUp, Terminal, Laptop, 
  Activity, Code, ShieldAlert, CheckCircle, Database, ArrowUpRight,
  RefreshCw, Layers, ShieldCheck
} from 'lucide-react';
import { audioEngine } from '../lib/audio';

interface DisciplineCard {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  tag: string;
  metric: string;
  status: string;
  tech: string;
  bgImage: string;
  glowColor: string;
  // Positioning configs for the parabolic fan-arch layout on desktop
  xOffset: number; 
  yOffset: number; 
  rotation: number;
}

const DISCIPLINES: DisciplineCard[] = [
  {
    id: 1,
    title: 'AI Engineering',
    subtitle: 'INTELLIGENCE SYSTEMS',
    desc: 'Autonomous multi-agent planning loops with private vector caches, RAG routing, and context memory safeties.',
    tag: 'autonomous',
    metric: 'latency < 120ms',
    status: 'OPTIMIZED',
    tech: 'TypeScript, OpenAI SDK, VectorDb Cache',
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    glowColor: 'rgba(139, 92, 246, 0.4)', // Violet glow
    xOffset: -380,
    yOffset: 35,
    rotation: -14
  },
  {
    id: 2,
    title: 'Bespoke Design',
    subtitle: 'CRAFTED INTERFACES',
    desc: 'Luxurious soft-claymorphism shades, responsive typography, and tactile fluid transitions on high-end layouts.',
    tag: 'aesthetic',
    metric: 'AAA contrast ratio',
    status: 'CERTIFIED',
    tech: 'Tailwind v4, Framer Motion, Inter Font',
    bgImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    glowColor: 'rgba(236, 72, 153, 0.4)', // Pink/Rose glow
    xOffset: -230,
    yOffset: 10,
    rotation: -8
  },
  {
    id: 3,
    title: 'Workflow Automation',
    subtitle: 'AUTOMATION ENGINES',
    desc: 'Event-driven message routing, instant WhatsApp APIs hooks, CRM automation pipelines with zero packet loss.',
    tag: 'efficiency',
    metric: 'throughput 1.2k/s',
    status: 'ACTIVE',
    tech: 'Express Webhooks, Twilio SDK, Cron Nodes',
    bgImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    glowColor: 'rgba(245, 158, 11, 0.4)', // Amber glow
    xOffset: -80,
    yOffset: 0,
    rotation: -2
  },
  {
    id: 4,
    title: 'Cloud Architecture',
    subtitle: 'CLOUD INFRASTRUCTURE',
    desc: 'Active self-healing Docker containers, Prometheus dashboards, and daily redundant VPS backups.',
    tag: 'scalability',
    metric: '99.99% uptime',
    status: 'ONLINE',
    tech: 'Docker, Prometheus Monitoring, VPS Backup',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    glowColor: 'rgba(16, 185, 129, 0.4)', // Emerald glow
    xOffset: 80,
    yOffset: 0,
    rotation: 2
  },
  {
    id: 5,
    title: 'Search Optimization',
    subtitle: 'PERFORMANCE & SEO',
    desc: 'Strict semantic layouts, server actions optimization, and pre-bundled assets for instantaneous LCP loading times.',
    tag: 'optimization',
    metric: '100% lighthouse score',
    status: 'VERIFIED',
    tech: 'Next.js App Router, Edge Cache, Schema.org',
    bgImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    glowColor: 'rgba(59, 130, 246, 0.4)', // Blue glow
    xOffset: 230,
    yOffset: 10,
    rotation: 8
  },
  {
    id: 6,
    title: 'Enterprise Security',
    subtitle: 'SECURE BACKENDS',
    desc: 'Fully typed robust Next.js layouts, secure server-proxied API tokens, and Drizzle SQL row-level rules.',
    tag: 'security',
    metric: 'SHA-256 encrypted',
    status: 'SHIELDED',
    tech: 'Drizzle ORM, Node-Crypto, Next.js Actions',
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    glowColor: 'rgba(20, 184, 166, 0.4)', // Teal glow
    xOffset: 380,
    yOffset: 35,
    rotation: 14
  }
];

export default function ArchedHeroCarousel() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeAutoId, setActiveAutoId] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [tickerTime, setTickerTime] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update high-frequency terminal ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTickerTime(now.toISOString().slice(11, 19) + '.' + String(now.getMilliseconds()).padStart(3, '0'));
    };
    const interval = setInterval(updateTime, 80);
    return () => clearInterval(interval);
  }, []);

  // Auto-playing sequence highlighting cards if user is not active hover
  useEffect(() => {
    if (hoveredId !== null) return;

    const interval = setInterval(() => {
      setActiveAutoId((prev) => (prev === DISCIPLINES.length ? 1 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [hoveredId]);

  // Use hovered card or auto-highlighted card as display detail
  const displayCard = DISCIPLINES.find(d => d.id === (hoveredId || activeAutoId)) || DISCIPLINES[0];

  return (
    <div 
      id="arched-hero-workspace" 
      className="relative w-full max-w-[1360px] mx-auto select-none py-10 sm:py-16 flex flex-col items-center justify-center overflow-visible"
    >
      {/* STATIC DECORATIVE BACKGROUND VECTOR LINKS */}
      <div className="absolute inset-x-0 top-[25%] bottom-[25%] pointer-events-none overflow-hidden opacity-20 z-0">
        <svg className="w-full h-full" viewBox="0 0 1360 400" fill="none">
          {/* Subtle curved arc guideline mapping the parabolic layout */}
          <path 
            d="M 150 280 Q 680 80 1210 280" 
            stroke="url(#arcGradient)" 
            strokeWidth="1.5" 
            strokeDasharray="4,8"
          />
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {isMobile ? (
        /* --- MOBILE RESPONSIVE CAROUSEL STACK --- */
        <div className="w-full space-y-6 px-4 z-10">
          
          {/* Centralized Glass console showcase details */}
          <div className="clay-card p-6 md:p-8 bg-stone-900 border-stone-950 text-[#faf8f5] text-left relative overflow-hidden rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-4 border-b border-stone-800 pb-3 font-sans">
              <div className="flex items-center space-x-2">
                <Laptop size={13} className="text-violet-400" />
                <span className="text-[9px] tracking-widest text-stone-400 font-black uppercase">CAPABILITIES</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[8px] text-emerald-400 font-black">
                <span>{tickerTime}</span>
              </div>
            </div>

            <div className="space-y-3 font-sans">
              <span className="text-[8px] text-violet-400 font-black tracking-widest uppercase block">
                {displayCard.subtitle}
              </span>
              <h4 className="font-display font-black text-xl text-white tracking-tight uppercase leading-none">
                {displayCard.title}
              </h4>
              <p className="text-stone-400 text-xs leading-relaxed font-light">
                {displayCard.desc}
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2 text-[8px] uppercase tracking-widest font-black">
                <span className="bg-stone-850 px-2 py-0.5 rounded border border-stone-800 text-violet-300">
                  {displayCard.metric}
                </span>
                <span className="bg-stone-850 px-2 py-0.5 rounded border border-stone-800 text-emerald-400">
                  {displayCard.tech.split(',')[0]}
                </span>
                <span className="bg-stone-850 px-2 py-0.5 rounded border border-stone-800 text-stone-300">
                  {displayCard.status}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive touch-friendly image cards list */}
          <div className="grid grid-cols-2 gap-4">
            {DISCIPLINES.map((card) => {
              const isActive = displayCard.id === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    setHoveredId(null);
                    setActiveAutoId(card.id);
                    audioEngine.playClick();
                  }}
                  className={`relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                    isActive 
                      ? 'border-violet-500 shadow-lg scale-[1.03] ring-2 ring-violet-500/20' 
                      : 'border-stone-200/50 hover:border-stone-400'
                  }`}
                >
                  {/* Card Background Image */}
                  <img 
                    src={card.bgImage} 
                    alt={card.title} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover max-w-full transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30" />
                  
                  {/* Floating labels inside card */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-between text-left">
                    <span className="font-mono text-[7px] bg-white/10 backdrop-blur-md px-1.5 py-0.5 rounded-full text-white font-bold w-fit uppercase tracking-wider border border-white/10">
                      {card.tag}
                    </span>
                    <div>
                      <span className="font-mono text-[6px] text-violet-300 block leading-none uppercase tracking-widest mb-1">
                        {card.subtitle.split('//')[0]}
                      </span>
                      <h5 className="font-display font-black text-[11px] text-white uppercase tracking-tight leading-tight">
                        {card.title}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* --- DESKTOP PREMIUM OVERLAPPING ARCH FAN WORKSPACE --- */
        <div className="w-full flex flex-col items-center justify-center z-10 overflow-visible relative">
          
          {/* FLOATING PERFORMANCE STATISTICS (In-between card channels) */}
          <div className="absolute left-4 top-[-20px] font-sans text-[9px] text-stone-400 uppercase tracking-[0.25em] flex items-center space-x-2 bg-white/60 backdrop-blur-md border border-stone-200/50 px-3.5 py-1.5 rounded-full shadow-sm font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span>DESIGN EXCELLENCE</span>
          </div>
          <div className="absolute right-4 top-[-20px] font-sans text-[9px] text-stone-400 uppercase tracking-[0.25em] flex items-center space-x-2 bg-white/60 backdrop-blur-md border border-stone-200/50 px-3.5 py-1.5 rounded-full shadow-sm font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>HIGH-CONTRAST GRAPHICS</span>
          </div>

          {/* DYNAMIC ORBITING DISCIPLINE CARD LAYOUT (THE ARCHED FAN) */}
          <div className="relative w-full h-[460px] flex items-center justify-center overflow-visible">
            {DISCIPLINES.map((card) => {
              const isHovered = hoveredId === card.id;
              const isAutoActive = activeAutoId === card.id && hoveredId === null;
              const isActive = isHovered || isAutoActive;
              
              return (
                <Interactive3DCardWrapper
                  key={card.id}
                  card={card}
                  isHovered={isHovered}
                  isAutoActive={isAutoActive}
                  isActive={isActive}
                  onMouseEnter={() => {
                    setHoveredId(card.id);
                    const pan = Math.max(-1.0, Math.min(1.0, card.xOffset / 420));
                    audioEngine.playHapticHover(pan);
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                  }}
                  onClick={() => {
                    audioEngine.playClick();
                  }}
                />
              );
            })}
          </div>

          {/* PREMIUM FLOATING SPECIFICATION CONTROL DOCK */}
          <div className="mt-8 w-full max-w-4xl px-6 relative z-30">
            <div className="clay-card bg-stone-900/95 border-stone-950 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-2xl border flex items-center justify-between text-left">
              {/* Subtle background matrix scanlines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40" />
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex-1 space-y-3 pr-8 relative z-10">
                <div className="flex items-center space-x-3 font-sans">
                  <span className="text-[9px] text-violet-400 font-black tracking-[0.25em] uppercase px-2 py-0.5 bg-stone-800 rounded border border-stone-750">
                    CAPABILITY 0{displayCard.id}
                  </span>
                  <div className="h-px w-20 bg-stone-800" />
                  <span className="text-[8px] text-emerald-400 font-black flex items-center space-x-1 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-1" />
                    {displayCard.status}
                  </span>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayCard.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <h4 className="font-display font-black text-2xl text-white tracking-tight uppercase leading-none">
                      {displayCard.title}
                    </h4>
                    <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light mt-1.5">
                      {displayCard.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Specification stats deck column */}
              <div className="flex flex-col space-y-2 border-l border-stone-800 pl-8 relative z-10 shrink-0 min-w-[200px] font-sans">
                <div className="space-y-0.5">
                  <span className="text-[7.5px] text-stone-500 uppercase tracking-widest font-black block">
                    TECHNOLOGY
                  </span>
                  <span className="text-[9.5px] font-black text-stone-300 uppercase truncate max-w-[180px] block font-sans">
                    {displayCard.tech.split(',').slice(0, 2).join(', ')}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[7.5px] text-stone-500 uppercase tracking-widest font-black block">
                    METRIC
                  </span>
                  <span className="text-[9.5px] font-black text-violet-400 uppercase block font-sans">
                    ✦ {displayCard.metric}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- 3D INTERACTIVE TILT WRAPPER FOR ARCHED CARDS --- */
interface WrapperProps {
  key?: React.Key;
  card: DisciplineCard;
  isHovered: boolean;
  isAutoActive: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function Interactive3DCardWrapper({
  card,
  isHovered,
  isAutoActive,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick
}: WrapperProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rX: 0, rY: 0, glareX: 50, glareY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Exact cursor positions inside card borders
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalized coordinates from center (-0.5 to 0.5)
    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;
    
    // Premium physical 3D tilt angles (max 15 deg)
    const maxRotate = 15;
    const targetRotateX = -yPct * maxRotate;
    const targetRotateY = xPct * maxRotate;
    
    // Reflective glare coords (0 to 100)
    const glareX = (mouseX / rect.width) * 100;
    const glareY = (mouseY / rect.height) * 100;
    
    setCoords({ rX: targetRotateX, rY: targetRotateY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    onMouseLeave();
    setCoords({ rX: 0, rY: 0, glareX: 50, glareY: 50 });
  };

  // Standard parabolic offset formula matches screenshot structure perfectly
  const computedX = card.xOffset;
  const computedY = isHovered 
    ? card.yOffset - 35 // Raise significantly on mouse hover
    : isAutoActive 
    ? card.yOffset - 15  // Raise slightly on auto highlight
    : card.yOffset;

  const computedRotation = isHovered 
    ? card.rotation * 0.45 // Straighten slightly on hover to read better
    : card.rotation;

  const computedScale = isHovered 
    ? 1.05 
    : isAutoActive 
    ? 1.025 
    : 1.0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1200,
        position: 'absolute',
        zIndex: isHovered ? 50 : isAutoActive ? 40 : 20 + card.id
      }}
      className="origin-center"
    >
      <motion.div
        animate={{
          x: computedX,
          y: computedY,
          rotate: computedRotation,
          rotateX: coords.rX,
          rotateY: coords.rY,
          scale: computedScale,
          boxShadow: isHovered 
            ? `0px 25px 55px ${card.glowColor}, -6px -6px 25px rgba(255,255,255,0.03)`
            : isAutoActive
            ? `0px 15px 40px ${card.glowColor}`
            : "0px 10px 25px rgba(0,0,0,0.15)"
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 20,
          mass: 0.15
        }}
        style={{
          transformStyle: "preserve-3d"
        }}
        className={`w-[210px] h-[310px] rounded-[24px] overflow-hidden border cursor-pointer relative flex flex-col justify-between p-5 text-left transition-all duration-300 ${
          isActive 
            ? 'border-white/20' 
            : 'border-stone-200/40'
        }`}
      >
        {/* Full Card Background Image */}
        <img 
          src={card.bgImage} 
          alt={card.title} 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover max-w-full transition-transform duration-500 select-none pointer-events-none"
        />

        {/* Ambient Dark gradient layers to assure text readable safety */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/35 to-black/30 z-0 pointer-events-none" />

        {/* Glossy radial glare overlay */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none rounded-[24px] z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 180px at ${coords.glareX}% ${coords.glareY}%, rgba(255, 255, 255, 0.2), transparent 85%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}

        {/* Scanner pulse ribbon across auto active cards */}
        {isAutoActive && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[24px]">
            <motion.div 
              className="w-full h-[4px] bg-gradient-to-r from-transparent via-white/50 to-transparent absolute left-0"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
            />
          </div>
        )}

        {/* Top bar indicators inside cards */}
        <div className="relative z-10 flex items-center justify-between pointer-events-none font-sans" style={{ transform: "translateZ(30px)" }}>
          <span className="text-[8px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/15 text-white/95 font-black tracking-widest uppercase">
            {card.tag}
          </span>
          {isAutoActive && (
            <div className="flex items-center space-x-1 bg-violet-600/90 text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase">
              <span className="w-1 h-1 rounded-full bg-white animate-ping" />
              <span>Active</span>
            </div>
          )}
        </div>

        {/* Bottom textual metadata */}
        <div 
          style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
          className="space-y-1 relative z-10 pointer-events-none font-sans"
        >
          <span className="text-[8px] text-violet-300 block tracking-widest uppercase font-black">
            {card.subtitle}
          </span>
          <h4 className="font-display font-black text-base text-white uppercase tracking-tight leading-tight group-hover:text-violet-400 transition-colors">
            {card.title}
          </h4>
          <div className="flex justify-between items-center text-[7px] text-white/50 pt-2 border-t border-white/10 mt-2 font-black">
            <span>{card.metric}</span>
            <span className="text-white/30">✦ CAPABILITY</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

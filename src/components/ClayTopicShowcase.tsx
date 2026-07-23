import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Laptop, 
  Palette, 
  Layers, 
  Type, 
  Printer, 
  Activity, 
  Compass, 
  CheckCircle2, 
  Feather
} from 'lucide-react';
import { audioEngine } from '../lib/audio';

interface TopicCard {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  accentColor: string;
  icon: React.ElementType;
  previewType: 'web' | 'brand' | 'product' | 'typography' | 'print' | 'illustration';
  bullets: string[];
}

const TOPICS: TopicCard[] = [
  {
    id: 1,
    title: "Web Design",
    subtitle: "LUXURY USER EXPERIENCES",
    badge: "High Conversion",
    description: "100% bespoke, modular screens with state-of-the-art visual flow, dynamic spacing, and adaptive column distributions.",
    accentColor: "from-violet-500 to-indigo-600",
    icon: Laptop,
    previewType: "web",
    bullets: ["Bespoke UI Wireframes", "Adaptive Fluid Columns", "High-Contrast Visual Flow"]
  },
  {
    id: 2,
    title: "Branding",
    subtitle: "VISUAL IDENTITY SYSTEM",
    badge: "Brand Strategy",
    description: "Cohesive visual systems including luxurious geometric brand marks, vector guidelines, and harmonized color palettes.",
    accentColor: "from-rose-500 to-pink-600",
    icon: Palette,
    previewType: "brand",
    bullets: ["Premium Logo Systems", "Harmonized Color Palettes", "Scalable Vector Assets"]
  },
  {
    id: 3,
    title: "Product Design",
    subtitle: "INTERACTION PLAN",
    badge: "Bespoke SaaS",
    description: "Functional workspace panels, toggle states, activity logs, and high-density user interfaces optimized for focus.",
    accentColor: "from-amber-500 to-orange-600",
    icon: Layers,
    previewType: "product",
    bullets: ["Frictionless UX Journeys", "Micro-Interaction States", "Modular Widget Blocks"]
  },
  {
    id: 4,
    title: "Typography",
    subtitle: "EDITORIAL TYPE SPEC",
    badge: "Visual Rhythm",
    description: "Aesthetic font scales paired with micro-aligned tracking guides, precise line-height rules, and strict hierarchy scales.",
    accentColor: "from-teal-500 to-emerald-600",
    icon: Type,
    previewType: "typography",
    bullets: ["Fluid Readable Scales", "Precise Alignment Grids", "Anti-Aliased Font Tuning"]
  },
  {
    id: 5,
    title: "Print & Layout",
    subtitle: "EDITORIAL PUBLISHING",
    badge: "Editorial Grid",
    description: "Precision editorial grid systems decorated with crop markings, bleed indicators, and horizontal color swatches.",
    accentColor: "from-cyan-500 to-blue-600",
    icon: Printer,
    previewType: "print",
    bullets: ["Golden Ratio Grids", "Calibration Color Bars", "High-Fidelity Bleed Bounds"]
  },
  {
    id: 6,
    title: "Illustration",
    subtitle: "ENGAGING CONCEPTS",
    badge: "Creative Graphics",
    description: "Beautiful illustrative vector guides, custom isometric shapes, and balanced layout diagrams mapping high-level business ideas.",
    accentColor: "from-purple-500 to-violet-600",
    icon: Compass,
    previewType: "illustration",
    bullets: ["Sleek Vector Graphics", "Branded Illustrations", "Business Infographics"]
  }
];

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardRevealVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.93,
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15,
      mass: 0.8
    }
  }
};

interface MagneticClayCardProps {
  key?: React.Key;
  topic: TopicCard;
  onSelect: (topic: TopicCard) => void;
  renderCodePreview: (type: string, isActive: boolean) => React.ReactNode;
  isAutoHighlighted: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  xOffset?: number;
  yOffset?: number;
  rotation?: number;
  isMobile?: boolean;
  pullFactor?: number;
}

function MagneticClayCard({ 
  topic, 
  onSelect, 
  renderCodePreview, 
  isAutoHighlighted, 
  onHoverStart, 
  onHoverEnd,
  xOffset = 0,
  yOffset = 0,
  rotation = 0,
  isMobile = true,
  pullFactor = 1.0
}: MagneticClayCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, rX: 0, rY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate cursor position relative to the card's boundaries
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert to normalized percentage from center (-0.5 to 0.5)
    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;
    
    // Calculate 3D tilt angles (premium 3D physical tilt, max 14 degrees)
    const maxRotate = 14;
    const targetRotateX = -yPct * maxRotate;
    const targetRotateY = xPct * maxRotate;
    
    // Slight translation (magnetic pull translation, max 8px)
    const maxTranslate = 8;
    const targetX = xPct * maxTranslate;
    const targetY = yPct * maxTranslate;
    
    // Glare coordinates as percentage (0 to 100)
    const glareX = (mouseX / rect.width) * 100;
    const glareY = (mouseY / rect.height) * 100;
    
    setCoords({ x: targetX, y: targetY, rX: targetRotateX, rY: targetRotateY, glareX, glareY });

    // Interactive spatial audio panning based on hover offset xPct
    audioEngine.playHapticHover(xPct * 2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverEnd();
    setCoords({ x: 0, y: 0, rX: 0, rY: 0, glareX: 50, glareY: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverStart();
    audioEngine.playHover();
  };

  const isActive = isHovered || isAutoHighlighted;

  // Render wrapper style based on desktop vs mobile mode
  const desktopStyle: React.CSSProperties = isMobile ? {} : {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '260px',
    height: '370px',
    marginLeft: '-130px',
    marginTop: '-185px',
    transformStyle: 'preserve-3d',
    zIndex: isHovered ? 40 : isAutoHighlighted ? 25 : 10,
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        onSelect(topic);
        audioEngine.playClick();
      }}
      style={{ 
        perspective: 1200,
        WebkitFontSmoothing: "subpixel-antialiased",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        ...desktopStyle
      }}
      className={isMobile ? "h-[450px] relative" : ""}
      variants={cardRevealVariants}
    >
      <motion.div
        animate={isMobile ? { 
          x: coords.x,
          y: coords.y,
          rotateX: coords.rX,
          rotateY: coords.rY,
          scale: isHovered ? 1.04 : isAutoHighlighted ? 1.025 : 1,
          boxShadow: isHovered 
            ? `${-coords.rY * 1.8}px ${coords.rX * 1.8 + 25}px 60px rgba(185, 175, 160, 0.32), -8px -8px 40px #ffffff`
            : isAutoHighlighted
            ? "0px 20px 50px rgba(139, 92, 246, 0.28), -6px -6px 30px #ffffff, 0 0 15px rgba(139, 92, 246, 0.15)"
            : "0px 10px 30px rgba(185, 175, 160, 0.08)"
        } : {
          x: xOffset * pullFactor + coords.x,
          y: yOffset * pullFactor + coords.y + (isHovered ? -20 : 0),
          rotate: isHovered ? 0 : rotation,
          rotateX: coords.rX,
          rotateY: coords.rY,
          scale: isHovered ? 1.08 : isAutoHighlighted ? 1.04 : 1,
          boxShadow: isHovered 
            ? `${-coords.rY * 1.8}px ${coords.rX * 1.8 + 25}px 60px rgba(185, 175, 160, 0.35), -8px -8px 40px #ffffff`
            : isAutoHighlighted
            ? "0px 22px 55px rgba(139, 92, 246, 0.3), -6px -6px 30px #ffffff, 0 0 18px rgba(139, 92, 246, 0.2)"
            : "0px 10px 30px rgba(185, 175, 160, 0.08)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: isHovered ? 45 : 35, 
          damping: isHovered ? 25 : 20, 
          mass: 2.2,
          restDelta: 0.001
        }}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          WebkitFontSmoothing: "subpixel-antialiased",
        }}
        className={`interactive-clay-card rounded-[32px] p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden group cursor-pointer text-left w-full border ${ isAutoHighlighted ? 'border-violet-400 bg-gradient-to-tr from-[#faf9f5] via-[#faf9f5] to-violet-50/20 shadow-[inset_0_0_20px_rgba(139,92,246,0.02)]' : 'border-stone-200/40 bg-[#faf9f5]' }`}
      >
        {/* Animated outer glowing pulse when auto-highlighted */}
        {isAutoHighlighted && (
          <motion.div 
            className="absolute inset-0 rounded-[32px] border-2 border-violet-500/55 pointer-events-none z-10"
            animate={{ 
              opacity: [0.4, 0.9, 0.4],
              boxShadow: [
                "0 0 10px rgba(139, 92, 246, 0.12)",
                "0 0 25px rgba(139, 92, 246, 0.45)",
                "0 0 10px rgba(139, 92, 246, 0.12)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        {/* Dynamic glossy reflection / glare sheet */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none rounded-[32px] z-30 transition-opacity duration-350"
            style={{
              background: `radial-gradient(circle 220px at ${coords.glareX}% ${coords.glareY}%, rgba(255, 255, 255, 0.18), transparent 80%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}

        {/* Auto Sequence Demo Scanning Ribbon */}
        {isAutoHighlighted && !isHovered && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[32px]">
            <motion.div 
              className="w-full h-[3px] bg-gradient-to-r from-transparent via-violet-400/30 to-transparent absolute left-0"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
          </div>
        )}

        {/* Sequence Badge Indicator */}
        {isAutoHighlighted && !isHovered && (
          <div className="absolute top-2.5 left-5 z-20 flex items-center space-x-1 bg-violet-600 text-white-force px-2.5 py-0.5 rounded-full text-[7px] font-sans font-black tracking-widest uppercase shadow-sm">
            <span className="w-1 h-1 rounded-full bg-white animate-ping" />
            <span>DEMO MODE</span>
          </div>
        )}

        {/* Parallax Depth Layer 1: Code-rendered graphic container */}
        <div 
          style={{ 
            transform: `translateZ(70px) translateX(${coords.rY * 1.5}px) translateY(${-coords.rX * 1.5}px) rotateX(${-coords.rX * 0.1}deg) rotateY(${-coords.rY * 0.1}deg)`, 
            transformStyle: "preserve-3d" 
          }}
          className={`w-full rounded-[24px] overflow-hidden relative shadow-md transition-all duration-300 ${
            isMobile ? 'h-[180px] mb-5' : 'h-[130px] mb-3.5'
          } ${
            isHovered ? 'shadow-xl' : isAutoHighlighted ? 'shadow-lg border border-violet-200/40' : ''
          }`}
        >
          {renderCodePreview(topic.previewType, isActive)}
        </div>

        {/* Parallax Depth Layer 2: Metadata labels and badges */}
        <div 
          style={{ 
            transform: `translateZ(35px) translateX(${coords.rY * 0.4}px) translateY(${-coords.rX * 0.4}px)`,
            transformStyle: "preserve-3d"
          }}
          className="space-y-3 flex-grow flex flex-col justify-between"
        >
          <div>
            {/* Header line & badge */}
            <div className="flex items-center justify-between" style={{ transform: `translateZ(15px) translateX(${coords.rY * 0.2}px) translateY(${-coords.rX * 0.2}px)` }}>
              <span className="font-sans text-[10px] font-semibold tracking-wider text-stone-500 uppercase">
                {topic.subtitle}
              </span>
              <span className={`font-sans text-[9px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase transition-all duration-300 ${
                isAutoHighlighted 
                  ? 'text-white-force bg-violet-600 shadow-md scale-105' 
                  : 'text-violet-700 bg-violet-100/60'
              }`}>
                {topic.badge}
              </span>
            </div>

            {/* Title with sleek hover shift */}
            <h3 
              style={{ transform: `translateZ(55px) translateX(${coords.rY * 1.1}px) translateY(${-coords.rX * 1.1}px)` }}
              className="font-display font-black text-xl lg:text-2xl uppercase tracking-tight text-stone-800 mt-1 flex items-center justify-between break-words w-full"
            >
              <span className="truncate max-w-[90%]">{topic.title}</span>
              <ArrowUpRight size={14} className={`text-stone-400 group-hover:text-violet-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ${
                isAutoHighlighted ? 'text-violet-500 animate-bounce' : ''
              }`} />
            </h3>

            {/* Descriptive text */}
            <p 
              style={{ transform: `translateZ(25px) translateX(${coords.rY * 0.5}px) translateY(${-coords.rX * 0.5}px)` }}
              className={`text-stone-500 leading-relaxed font-sans font-normal mt-1.5 ${
                isMobile ? 'text-xs sm:text-sm' : 'text-[11px] line-clamp-2'
              }`}
            >
              {topic.description}
            </p>
          </div>

          {/* Bullet points mapping with slight depth */}
          <div 
            style={{ transform: `translateZ(30px) translateX(${coords.rY * 0.8}px) translateY(${-coords.rX * 0.8}px)` }}
            className={`grid grid-cols-1 gap-1.5 border-t border-stone-200/45 mt-auto ${
              isMobile ? 'pt-3.5' : 'pt-2.5'
            }`}
          >
            {topic.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle2 size={11} className={`shrink-0 transition-transform duration-300 ${
                  isAutoHighlighted ? 'text-violet-600 scale-110 animate-pulse' : 'text-violet-600'
                }`} />
                <span className="text-stone-700 font-sans text-[11px] font-semibold leading-tight">
                  {bullet}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const ORBIT_COORDS = [
  { x: -310, y: -150, r: -10 }, // Web Design
  { x: 310, y: -150, r: 10 },  // Branding
  { x: -390, y: 35, r: -4 },   // Product Design
  { x: 390, y: 35, r: 4 },    // Typography
  { x: -310, y: 220, r: -12 },  // Print & Layout
  { x: 310, y: 220, r: 12 }    // Illustration
];

export default function ClayTopicShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicCard | null>(null);
  const [activeAutoId, setActiveAutoId] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(true);
  const [isCenterHovered, setIsCenterHovered] = useState(false);

  // Responsive Hook
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play / sequence highlights design disciplines if user is not hovering
  useEffect(() => {
    if (hoveredId !== null) return;

    const interval = setInterval(() => {
      setActiveAutoId((prev) => (prev === TOPICS.length ? 1 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [hoveredId]);

  // Render creative code-based high-fidelity interactive UIs simulating top trending layouts
  const renderCodePreview = (type: string, isActive: boolean) => {
    switch (type) {
      case 'web':
        return (
          <div className="relative w-full h-full bg-[#0a0a0c] rounded-2xl border border-white/10 overflow-hidden flex flex-col p-3 shadow-xl">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 font-sans">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <div className="bg-white/5 rounded px-2 py-0.5 text-[7px] text-zinc-400 font-black">
                devil-labs.com/dashboard
              </div>
              <div className="w-3" />
            </div>
            {/* Content area */}
            <div className="grid grid-cols-3 gap-2 flex-grow font-sans">
              {/* Left mini stats sidebar */}
              <div className="col-span-1 bg-white/5 rounded-lg p-1.5 flex flex-col justify-between border border-white/5">
                <span className="text-[6px] text-violet-400 font-black tracking-wider uppercase block">STATUS</span>
                <div className="space-y-1">
                  <div className="h-1 bg-white/10 rounded w-full" />
                  <div className="h-1 bg-white/10 rounded w-4/5" />
                  <div className="h-1 bg-white/10 rounded w-3/5" />
                </div>
                <div className="flex items-center space-x-1 font-black">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[5px] text-emerald-400">ACTIVE</span>
                </div>
              </div>
              {/* Center interactive charts */}
              <div className="col-span-2 bg-white/5 rounded-lg p-2 flex flex-col justify-between border border-white/5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-1 font-black">
                  <span className="text-[6px] text-zinc-400 uppercase">PERFORMANCE</span>
                  <span className="text-[8px] text-emerald-400">+28.4%</span>
                </div>
                {/* Simulated bar chart */}
                <div className="flex items-end justify-between h-10 px-1 pt-2 gap-1">
                  {[45, 75, 55, 95, 65, 85, 100].map((h, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-gradient-to-t from-violet-600/80 to-indigo-400 rounded-t-sm w-full" 
                      animate={{ 
                        height: isActive ? `${h}%` : `${h * 0.7}%` 
                     }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 80, 
                        delay: i * 0.05 
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'brand':
        return (
          <div className="relative w-full h-full bg-[#121214] rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-4 shadow-xl">
            {/* Geometric brand vector layout overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
            <div className="absolute top-2 left-2 text-[6px] font-sans text-zinc-500 font-black">BRAND SYSTEM // SYSTEMATIC DESIGN</div>
            
            {/* Spinning/Morphing central polygonal element */}
            <motion.div 
              className="relative w-20 h-20 flex items-center justify-center"
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            >
              {/* Outer decorative vector circle */}
              <div className="absolute inset-0 rounded-full border border-dashed border-rose-500/30" />
              
              {/* Premium geometric shapes overlay */}
              <div className="absolute w-14 h-14 rounded-[35%] border border-rose-500/60 rotate-45 mix-blend-screen animate-pulse" />
              <div className="absolute w-14 h-14 rounded-[35%] border border-pink-500/60 -rotate-45 mix-blend-screen" />
              <div className="absolute w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 opacity-20 filter blur-xs" />
              
              {/* Core focal dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            </motion.div>

            {/* Bottom brand lockup */}
            <div className="absolute bottom-2 flex flex-col items-center font-sans">
              <span className="text-[7px] text-white-force font-black tracking-[4px] uppercase">DEVIL LABS</span>
              <span className="text-[5px] text-zinc-500 font-black uppercase tracking-widest mt-0.5">EST. 2026</span>
            </div>
          </div>
        );

      case 'product':
        return (
          <div className="relative w-full h-full bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-3 shadow-xl">
            {/* iPhone/Smartphone frame layout */}
            <div className="w-28 h-full bg-[#0a0a0a] rounded-[24px] border border-white/10 p-1.5 flex flex-col justify-between shadow-2xl relative font-sans">
              {/* Speaker pill notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-black border border-white/5 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-zinc-800" />
              </div>

              {/* Status bar */}
              <div className="flex justify-between items-center px-1 pt-2 mb-2 font-black">
                <span className="text-[5px] text-white/50">9:41 AM</span>
                <div className="flex space-x-0.5 items-center">
                  <div className="w-1.5 h-1 bg-white/50 rounded-xs" />
                  <div className="w-1 h-1 bg-white/50 rounded-xs" />
                </div>
              </div>

              {/* Premium Workspace UI */}
              <div className="flex-grow bg-white/[0.03] rounded-xl p-1.5 flex flex-col justify-between border border-white/5 relative overflow-hidden">
                {/* Active user profile */}
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-[5px] font-bold text-white-force">
                    V
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[5px] text-white font-bold leading-none">Victor K.</span>
                    <span className="text-[4px] text-zinc-500 font-black leading-none uppercase">CREATIVE LEAD</span>
                  </div>
                </div>

                {/* Simulated workspace buttons */}
                <div className="space-y-1 my-2 font-black">
                  <div className="bg-white/5 rounded-md p-1 flex items-center justify-between border border-white/5">
                    <span className="text-[4.5px] text-zinc-400">UPDATES</span>
                    <div className="w-3 h-1.5 rounded-full bg-amber-500 relative">
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-white absolute top-0" 
                        animate={{ left: isActive ? "6px" : "0px" }}
                        transition={{ type: "spring", stiffness: 200 }}
                      />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-md p-1 flex items-center justify-between border border-white/5">
                    <span className="text-[4.5px] text-zinc-400">SESSION</span>
                    <span className="text-[4.5px] text-amber-400">ACTIVE</span>
                  </div>
                </div>

                {/* Bottom navigation pill */}
                <div className="h-1 bg-white/10 rounded w-8 mx-auto" />
              </div>
            </div>
          </div>
        );

      case 'typography':
        return (
          <div className="relative w-full h-full bg-[#fdfcf9] rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between p-3.5 shadow-xl">
            {/* Grid layout */}
            <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:10px_10px] opacity-40" />
            
            {/* Top metrics tags */}
            <div className="relative z-10 flex justify-between items-center text-[5px] font-sans text-stone-400 font-black border-b border-stone-200/50 pb-1.5">
              <span>DESIGN GRID // SPEC 04</span>
              <span>DEVIL LABS</span>
            </div>

            {/* Main high-fashion editorial poster text */}
            <div className="relative z-10 my-auto text-left flex flex-col justify-center">
              <h3 
                className="font-display font-black text-3xl leading-none text-stone-855 tracking-tighter"
                style={{ fontFeatureSettings: '"ss01" on, "cv11" on' }}
              >
                Refugio
              </h3>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="h-0.5 bg-teal-500 rounded-full w-8" />
                <span className="text-[6px] font-sans text-stone-500 font-black uppercase tracking-widest">
                  EDITORIAL STYLE // 2026
                </span>
              </div>
            </div>

            {/* Bottom alignment diagnostics */}
            <div className="relative z-10 flex justify-between items-center text-[5px] font-sans text-stone-400 font-black pt-1.5 border-t border-stone-200/50">
              <span className="text-teal-600">TRACKING: -0.04em</span>
              <span>KERNING: ACTIVE</span>
            </div>
          </div>
        );

      case 'print':
        return (
          <div className="relative w-full h-full bg-[#faf9f5] rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between p-3 shadow-xl font-sans">
            {/* Bleed indicators / Crop marks on the four corners */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-stone-400" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-stone-400" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-stone-400" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-stone-400" />

            {/* Grid guidelines overlay */}
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 border-t border-dashed border-stone-300/40" />
            <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 border-l border-dashed border-stone-300/40" />

            {/* Content area */}
            <div className="relative z-10 flex-grow flex flex-col justify-between">
              {/* Color swatches bar */}
              <div className="flex space-x-1 mb-2">
                {['#3b82f6', '#ec4899', '#eab308', '#22c55e', '#18181b'].map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-xs shadow-xs border border-white" style={{ backgroundColor: c }} />
                ))}
                <span className="text-[5px] text-stone-400 self-center pl-1 font-black">DESIGN PALETTE SYSTEMS</span>
              </div>

              {/* Layout Mockup */}
              <div className="my-auto flex space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg shrink-0 flex items-center justify-center shadow-md">
                  <Printer size={16} className="text-white-force animate-pulse" />
                </div>
                <div className="flex flex-col justify-center space-y-1">
                  <span className="text-[7px] font-sans font-bold uppercase tracking-tight text-stone-800 leading-none font-black">EDITORIAL STANDARD</span>
                  <span className="text-[5px] text-stone-400 uppercase tracking-widest leading-none font-black">ISSUE 30</span>
                  <div className="h-1 bg-stone-200 rounded w-16" />
                </div>
              </div>

              {/* Print speed indicator */}
              <div className="flex justify-between items-center text-[5px] text-stone-400 font-black">
                <span>1200 DPI COLOR</span>
                <span>HIGH DENSITY LAYOUT</span>
              </div>
            </div>
          </div>
        );

      case 'illustration':
        return (
          <div className="relative w-full h-full bg-[#0a0518] rounded-2xl border border-violet-950 overflow-hidden flex flex-col justify-between p-3.5 shadow-xl font-sans">
            {/* Futuristic cyber-blueprint layout */}
            <div className="absolute inset-0 bg-[radial-gradient(#7c3aed1f_1px,transparent_1px)] [background-size:8px_8px] opacity-60" />
            
            {/* Top status */}
            <div className="relative z-10 flex justify-between items-center text-[5px] text-violet-400/80 font-black">
              <span>ILLUSTRATION SYSTEM // DISCIPLINE 06</span>
              <span>VECTOR GRAPHIC</span>
            </div>

            {/* Central isometric flowchart render */}
            <div className="relative z-10 my-auto flex items-center justify-center">
              <svg className="w-24 h-16" viewBox="0 0 100 60">
                {/* Connection lines */}
                <motion.path 
                  d="M10 30 L45 15 L80 30 L45 45 Z" 
                  fill="none" 
                  stroke="rgba(124, 58, 237, 0.4)" 
                  strokeWidth="0.8" 
                  strokeDasharray="2,2" 
                />
                <motion.path 
                  d="M45 15 L45 45" 
                  fill="none" 
                  stroke="rgba(124, 58, 237, 0.3)" 
                  strokeWidth="0.5" 
                />
                
                {/* Nodes */}
                <circle cx="10" cy="30" r="2.5" fill="#a78bfa" />
                <circle cx="45" cy="15" r="2.5" fill="#a78bfa" />
                <circle cx="80" cy="30" r="2.5" fill="#a78bfa" />
                <circle cx="45" cy="45" r="2.5" fill="#7c3aed" />

                {/* Animated pulse rings */}
                <motion.circle 
                  cx="45" 
                  cy="15" 
                  r="6" 
                  fill="none" 
                  stroke="#a78bfa" 
                  strokeWidth="0.5"
                  animate={{ scale: isActive ? [1, 1.8, 1] : 1, opacity: isActive ? [0.6, 0, 0.6] : 0.4 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </svg>
            </div>

            {/* Bottom metadata */}
            <div className="relative z-10 flex justify-between items-center text-[5px] text-violet-400/80 font-black">
              <span>RESOLUTION: HIGH FIDELITY</span>
              <span>RENDER: VECTOR SUITE</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full py-20 md:py-28 bg-[#faf9f5] border-t border-b border-stone-200/50 relative overflow-hidden">
      {/* Soft overlay grids */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(185,175,160,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(185,175,160,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern high-fashion design header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-violet-600 font-sans text-xs uppercase tracking-[6px] font-black flex items-center justify-center space-x-2">
            <Sparkles size={12} className="animate-spin-slow" />
            <span>CORE DESIGN & ART DIRECTION DISCIPLINES</span>
          </span>
          <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl text-stone-850 uppercase tracking-tighter leading-none break-words max-w-full">
            curated premium disciplines
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed uppercase tracking-wider">
            A harmonious spectrum of high-end design capabilities. No cookie-cutter templates. Every element is crafted to reflect top-trending visual standard structures.
          </p>
        </div>

        {isMobile ? (
          /* Mobile / Tablet Touch Responsive Horizontal Carousel layout */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-4 -mx-4 no-scrollbar"
          >
            {TOPICS.map((topic) => (
              <div key={topic.id} className="snap-center shrink-0 w-[85vw] max-w-[320px]">
                <MagneticClayCard 
                  topic={topic}
                  isAutoHighlighted={activeAutoId === topic.id && hoveredId === null}
                  onHoverStart={() => setHoveredId(topic.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onSelect={(t) => setSelectedTopic(t)}
                  renderCodePreview={renderCodePreview}
                  isMobile={true}
                />
              </div>
            ))}
          </motion.div>
        ) : (
          /* Desktop Premium 3D Orbital Canvas layout */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full h-[690px] flex items-center justify-center overflow-visible my-12"
          >
            {/* Glowing background flow indicator */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(139,92,246,0.02),transparent_70%)] pointer-events-none" />
            
            {/* Symmetrical Orbit Rings */}
            <div className="absolute w-[800px] h-[500px] rounded-full border border-dashed border-stone-200/40 pointer-events-none z-0" />
            <div className="absolute w-[600px] h-[360px] rounded-full border border-double border-stone-200/20 pointer-events-none z-0" />

            {/* Central Orbital Pulse Core pill button */}
            <motion.div 
              onMouseEnter={() => {
                setIsCenterHovered(true);
                audioEngine.playHover();
              }}
              onMouseLeave={() => setIsCenterHovered(false)}
              onClick={() => {
                audioEngine.playClick();
                window.dispatchEvent(new CustomEvent('open-initialize-modal'));
              }}
              whileHover={{ scale: 1.08, boxShadow: '0 25px 50px rgba(139, 92, 246, 0.25)' }}
              whileTap={{ scale: 0.96 }}
              className="absolute z-30 cursor-pointer w-40 h-40 rounded-full bg-gradient-to-tr from-violet-600 to-rose-500 text-white-force flex flex-col items-center justify-center text-center p-3 border border-violet-400/30 shadow-[0_15px_40px_rgba(139,92,246,0.22)] overflow-hidden group/center"
            >
              {/* Rotating sci-fi background lines */}
              <div className="absolute inset-1.5 border border-dashed border-white/20 rounded-full animate-spin-slow pointer-events-none" />
              <div className="absolute inset-3.5 border border-double border-white/10 rounded-full animate-pulse pointer-events-none" />
              
              <span className="font-sans text-[8px] tracking-[3px] text-violet-200 font-black uppercase mb-1">RESONANCE</span>
              <span className="font-display font-black text-[13px] tracking-tight uppercase leading-none text-white block">STUDIO //</span>
              <span className="font-display font-black text-[13px] tracking-tight uppercase leading-none text-white block mt-0.5">LET'S TALK</span>
              <span className="font-sans text-[7px] text-rose-200 mt-2.5 tracking-widest uppercase animate-pulse font-black">GET IN TOUCH</span>
            </motion.div>

            {/* Orbiting interactive clay discipline cards */}
            {TOPICS.map((topic, index) => {
              const coords = ORBIT_COORDS[index];
              return (
                <MagneticClayCard 
                  key={topic.id}
                  topic={topic}
                  isAutoHighlighted={activeAutoId === topic.id && hoveredId === null}
                  onHoverStart={() => setHoveredId(topic.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onSelect={(t) => setSelectedTopic(t)}
                  renderCodePreview={renderCodePreview}
                  isMobile={false}
                  xOffset={coords.x}
                  yOffset={coords.y}
                  rotation={coords.r}
                  pullFactor={isCenterHovered ? 0.88 : 1.0}
                />
              );
            })}
          </motion.div>
        )}

      </div>

      {/* DETAILED CLAY TOPIC SPECIFICATION MODAL */}
      <AnimatePresence>
        {selectedTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#faf8f4] border border-stone-200 max-w-xl w-full rounded-[40px] p-8 shadow-2xl relative text-left"
            >
              {/* Modal Close Button */}
              <button 
                onClick={() => setSelectedTopic(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold flex items-center justify-center text-xs transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-6 text-stone-800 font-sans">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-3xl bg-stone-800 text-white-force flex items-center justify-center shadow-md">
                    {React.createElement(selectedTopic.icon, { size: 22 })}
                  </div>
                  <div>
                    <span className="text-[10px] text-violet-600 font-black tracking-widest uppercase block">
                      {selectedTopic.subtitle} // STUDIO DISCIPLINE
                    </span>
                    <h3 className="font-display font-black text-2xl uppercase tracking-tight text-stone-800">
                      {selectedTopic.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/40">
                  <span className="text-[9px] font-black text-stone-400 uppercase tracking-wider block mb-1">
                    DELIVERY SPECIFICATIONS
                  </span>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    {selectedTopic.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">
                    INCLUDED CAPABILITIES & ARTIFACTS:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedTopic.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-stone-100/50 border border-stone-200/20">
                        <CheckCircle2 size={14} className="text-violet-600 mt-0.5 flex-shrink-0" />
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-black text-stone-800 uppercase block">{bullet}</span>
                          <span className="text-[9px] text-stone-500 block leading-tight">Guaranteed in deliverable catalog.</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/40 flex justify-between items-center font-sans">
                  <span className="text-[9px] text-stone-400 uppercase font-black">
                    STUDIO CREATIVE STANDARD
                  </span>
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="px-6 py-2.5 bg-stone-800 hover:bg-stone-900 text-white-force text-[10px] font-black uppercase tracking-widest rounded-full transition-colors cursor-pointer"
                  >
                    CLOSE SPECS
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useRef } from 'react';
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
    subtitle: "HIGH-CONVERTING LAYOUTS",
    badge: "CONVERSION CORE",
    description: "100% bespoke, modular screens with state-of-the-art visual flow, dynamic spacing, and adaptive column distributions.",
    accentColor: "from-violet-500 to-indigo-600",
    icon: Laptop,
    previewType: "web",
    bullets: ["Bespoke UI Wireframes", "Adaptive Fluid Columns", "High-Contrast Visual Flow"]
  },
  {
    id: 2,
    title: "Branding",
    subtitle: "VISUAL IDENTITY",
    badge: "IDENTITY SCHEMES",
    description: "Cohesive visual systems including luxurious geometric brand marks, vector guidelines, and harmonized color palettes.",
    accentColor: "from-rose-500 to-pink-600",
    icon: Palette,
    previewType: "brand",
    bullets: ["Premium Logo Systems", "Harmonized Color Palettes", "Scalable Vector Assets"]
  },
  {
    id: 3,
    title: "Product Design",
    subtitle: "WORKFLOWS & WORKSPACES",
    badge: "SAAS SYSTEMATIC",
    description: "Functional workspace panels, toggle states, activity logs, and high-density user interfaces optimized for focus.",
    accentColor: "from-amber-500 to-orange-600",
    icon: Layers,
    previewType: "product",
    bullets: ["Frictionless UX Journeys", "Micro-Interaction States", "Modular Widget Blocks"]
  },
  {
    id: 4,
    title: "Typography",
    subtitle: "EDITORIAL TEXT SYSTEMS",
    badge: "MICRO-SPACING",
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
    badge: "CROP & ALIGN",
    description: "Precision editorial grid systems decorated with crop markings, bleed indicators, and horizontal color swatches.",
    accentColor: "from-cyan-500 to-blue-600",
    icon: Printer,
    previewType: "print",
    bullets: ["Golden Ratio Grids", "Calibration Color Bars", "High-Fidelity Bleed Bounds"]
  },
  {
    id: 6,
    title: "Illustration",
    subtitle: "TECHNICAL SCHEMATICS",
    badge: "SYSTEM GRAPHICS",
    description: "Isometric blueprints, dashed vector lines, pulse grids, and detailed flowcharts mapping complex technical steps.",
    accentColor: "from-purple-500 to-violet-600",
    icon: Compass,
    previewType: "illustration",
    bullets: ["Isometric Vector Nodes", "Dashed Interface Links", "Functional Infographics"]
  }
];

interface MagneticClayCardProps {
  key?: React.Key;
  topic: TopicCard;
  onSelect: (topic: TopicCard) => void;
  renderCodePreview: (type: string, isHovered: boolean) => React.ReactNode;
}

function MagneticClayCard({ topic, onSelect, renderCodePreview }: MagneticClayCardProps) {
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
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, rX: 0, rY: 0, glareX: 50, glareY: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(topic)}
      style={{ perspective: 1200 }}
      className="h-[450px] relative"
    >
      <motion.div
        animate={{ 
          x: coords.x,
          y: coords.y,
          rotateX: coords.rX,
          rotateY: coords.rY,
          scale: isHovered ? 1.025 : 1,
          boxShadow: isHovered 
            ? `${-coords.rY * 1.8}px ${coords.rX * 1.8 + 25}px 60px rgba(185, 175, 160, 0.32), -8px -8px 40px #ffffff`
            : "0px 10px 30px rgba(185, 175, 160, 0.08)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 18, 
          mass: 0.1
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="clay-card rounded-[32px] p-6 flex flex-col justify-between h-full relative overflow-hidden group cursor-pointer text-left w-full h-full"
      >
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

        {/* 3D Elevated Layer 1: Image / Code-rendered graphic container */}
        <div 
          style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }}
          className="w-full h-[200px] rounded-[24px] overflow-hidden mb-6 relative shadow-md transition-shadow duration-300 group-hover:shadow-xl"
        >
          {renderCodePreview(topic.previewType, isHovered)}
        </div>

        {/* 3D Elevated Layer 2: Text details and bullets */}
        <div 
          style={{ transform: "translateZ(20px)" }}
          className="space-y-4 flex-grow flex flex-col justify-between"
        >
          <div>
            {/* Header line & badge */}
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-semibold tracking-wider text-stone-500 uppercase">
                {topic.subtitle}
              </span>
              <span className="font-sans text-[10px] font-bold tracking-wider text-violet-700 bg-violet-100/60 px-3 py-1 rounded-full uppercase">
                {topic.badge}
              </span>
            </div>

            {/* Title with sleek hover shift */}
            <h3 className="font-display font-black text-2xl uppercase tracking-tight text-stone-800 mt-2 flex items-center justify-between">
              <span>{topic.title}</span>
              <ArrowUpRight size={16} className="text-stone-400 group-hover:text-violet-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </h3>

            {/* Descriptive text */}
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-sans font-normal mt-2.5">
              {topic.description}
            </p>
          </div>

          {/* Bullet points mapping */}
          <div className="grid grid-cols-1 gap-2 border-t border-stone-200/45 pt-4 mt-auto">
            {topic.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle2 size={13} className="text-violet-600 shrink-0" />
                <span className="text-stone-700 font-sans text-xs font-medium">
                  {bullet}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ClayTopicShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicCard | null>(null);

  // Render creative code-based high-fidelity interactive UIs simulating top trending layouts
  const renderCodePreview = (type: string, isHovered: boolean) => {
    switch (type) {
      case 'web':
        return (
          <div className="relative w-full h-full bg-[#0a0a0c] rounded-2xl border border-white/10 overflow-hidden flex flex-col p-3 shadow-xl">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <div className="bg-white/5 rounded px-2 py-0.5 text-[7px] font-mono text-zinc-400">
                wearecreative.co/dashboard
              </div>
              <div className="w-3" />
            </div>
            {/* Content area */}
            <div className="grid grid-cols-3 gap-2 flex-grow">
              {/* Left mini stats sidebar */}
              <div className="col-span-1 bg-white/5 rounded-lg p-1.5 flex flex-col justify-between border border-white/5">
                <span className="text-[6px] font-mono text-violet-400 font-bold tracking-wider uppercase block">LIVE STATUS</span>
                <div className="space-y-1">
                  <div className="h-1 bg-white/10 rounded w-full" />
                  <div className="h-1 bg-white/10 rounded w-4/5" />
                  <div className="h-1 bg-white/10 rounded w-3/5" />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[5px] font-mono text-emerald-400">ONLINE</span>
                </div>
              </div>
              {/* Center interactive charts */}
              <div className="col-span-2 bg-white/5 rounded-lg p-2 flex flex-col justify-between border border-white/5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[6px] font-mono text-zinc-400 font-bold uppercase">TRAFFIC DELTA</span>
                  <span className="text-[8px] font-mono text-emerald-400 font-bold">+28.4%</span>
                </div>
                {/* Simulated bar chart */}
                <div className="flex items-end justify-between h-10 px-1 pt-2 gap-1">
                  {[45, 75, 55, 95, 65, 85, 100].map((h, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-gradient-to-t from-violet-600/80 to-indigo-400 rounded-t-sm w-full" 
                      animate={{ 
                        height: isHovered ? `${h}%` : `${h * 0.7}%` 
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
            <div className="absolute top-2 left-2 text-[6px] font-mono text-zinc-500 font-bold">IDENTITY GRID // METRIC STANDARD</div>
            
            {/* Spinning/Morphing central polygonal element */}
            <motion.div 
              className="relative w-20 h-20 flex items-center justify-center"
              animate={{ rotate: isHovered ? 180 : 0 }}
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
            <div className="absolute bottom-2 flex flex-col items-center">
              <span className="text-[7px] font-mono text-white-force font-black tracking-[4px] uppercase">INFINITE // OS</span>
              <span className="text-[5px] font-mono text-zinc-500 font-bold uppercase tracking-widest mt-0.5">EST. 2026</span>
            </div>
          </div>
        );

      case 'product':
        return (
          <div className="relative w-full h-full bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-3 shadow-xl">
            {/* iPhone/Smartphone frame layout */}
            <div className="w-28 h-full bg-[#0a0a0a] rounded-[24px] border border-white/10 p-1.5 flex flex-col justify-between shadow-2xl relative">
              {/* Speaker pill notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-black border border-white/5 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-zinc-800" />
              </div>

              {/* Status bar */}
              <div className="flex justify-between items-center px-1 pt-2 mb-2">
                <span className="text-[5px] font-mono text-white/50">9:41 AM</span>
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
                    <span className="text-[4px] text-zinc-500 font-mono leading-none">CREATIVE LEAD</span>
                  </div>
                </div>

                {/* Simulated workspace buttons */}
                <div className="space-y-1 my-2">
                  <div className="bg-white/5 rounded-md p-1 flex items-center justify-between border border-white/5">
                    <span className="text-[4.5px] font-mono text-zinc-400">NOTIFICATIONS</span>
                    <div className="w-3 h-1.5 rounded-full bg-amber-500 relative">
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-white absolute top-0" 
                        animate={{ left: isHovered ? "6px" : "0px" }}
                        transition={{ type: "spring", stiffness: 200 }}
                      />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-md p-1 flex items-center justify-between border border-white/5">
                    <span className="text-[4.5px] font-mono text-zinc-400">TELEMETRY</span>
                    <span className="text-[4.5px] font-mono text-amber-400">ACTIVE</span>
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
            <div className="relative z-10 flex justify-between items-center text-[5px] font-mono text-stone-400 font-bold border-b border-stone-200/50 pb-1.5">
              <span>FONT SCALE GRID // COMPONENT 04</span>
              <span>DEVIL LABS</span>
            </div>

            {/* Main high-fashion editorial poster text */}
            <div className="relative z-10 my-auto text-left flex flex-col justify-center">
              <h3 
                className="font-display font-black text-3xl leading-none text-stone-850 tracking-tighter"
                style={{ fontFeatureSettings: '"ss01" on, "cv11" on' }}
              >
                Refugio
              </h3>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="h-0.5 bg-teal-500 rounded-full w-8" />
                <span className="text-[6px] font-mono text-stone-500 font-bold uppercase tracking-widest">
                  STATE BEACH // CALIF
                </span>
              </div>
            </div>

            {/* Bottom alignment diagnostics */}
            <div className="relative z-10 flex justify-between items-center text-[5px] font-mono text-stone-400 font-bold pt-1.5 border-t border-stone-200/50">
              <span className="text-teal-600">TRACKING: -0.04em</span>
              <span>KERNING: ACTIVE</span>
            </div>
          </div>
        );

      case 'print':
        return (
          <div className="relative w-full h-full bg-[#faf9f5] rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between p-3 shadow-xl">
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
                <span className="text-[5px] font-mono text-stone-400 self-center pl-1 font-bold">CYAN MAGENTA YELLOW KEY</span>
              </div>

              {/* Layout Mockup */}
              <div className="my-auto flex space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg shrink-0 flex items-center justify-center shadow-md">
                  <Printer size={16} className="text-white-force animate-pulse" />
                </div>
                <div className="flex flex-col justify-center space-y-1">
                  <span className="text-[7px] font-sans font-bold uppercase tracking-tight text-stone-800 leading-none">MIA FAYE</span>
                  <span className="text-[5px] font-mono text-stone-400 uppercase tracking-widest leading-none">EDITORIAL ISSUE 30</span>
                  <div className="h-1 bg-stone-200 rounded w-16" />
                </div>
              </div>

              {/* Print speed indicator */}
              <div className="flex justify-between items-center text-[5px] font-mono text-stone-400 font-bold">
                <span>DPI: 1200 COLOR</span>
                <span>BLEED BOUNDS: +3MM</span>
              </div>
            </div>
          </div>
        );

      case 'illustration':
        return (
          <div className="relative w-full h-full bg-[#0a0518] rounded-2xl border border-violet-950 overflow-hidden flex flex-col justify-between p-3.5 shadow-xl">
            {/* Futuristic cyber-blueprint layout */}
            <div className="absolute inset-0 bg-[radial-gradient(#7c3aed1f_1px,transparent_1px)] [background-size:8px_8px] opacity-60" />
            
            {/* Top status */}
            <div className="relative z-10 flex justify-between items-center text-[5px] font-mono text-violet-400/80 font-bold">
              <span>CYBER-SCHEMATIC // MODULE 9</span>
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
                  animate={{ scale: isHovered ? [1, 1.8, 1] : 1, opacity: isHovered ? [0.6, 0, 0.6] : 0.4 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </svg>
            </div>

            {/* Bottom metadata */}
            <div className="relative z-10 flex justify-between items-center text-[5px] font-mono text-violet-400/80 font-bold">
              <span>VERTICES: 12,042</span>
              <span>ENGINE: SKETCH-CORE</span>
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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-violet-600 font-mono text-xs uppercase tracking-[6px] font-black flex items-center justify-center space-x-2">
            <Sparkles size={12} className="animate-spin-slow" />
            <span>CORE DESIGN DISCIPLINARY LABS</span>
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-stone-850 uppercase tracking-tighter leading-none">
            curated premium disciplines
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed uppercase tracking-wider">
            A harmonious spectrum of high-end design capabilities. No cookie-cutter templates. Every element is crafted to reflect top-trending visual standard structures.
          </p>
        </div>

        {/* Tactile Claymorphic Bento Grid Shelf */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOPICS.map((topic) => (
            <MagneticClayCard 
              key={topic.id}
              topic={topic}
              onSelect={(t) => setSelectedTopic(t)}
              renderCodePreview={renderCodePreview}
            />
          ))}
        </div>

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

              <div className="space-y-6 text-stone-800">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-3xl bg-stone-800 text-white-force flex items-center justify-center shadow-md">
                    {React.createElement(selectedTopic.icon, { size: 22 })}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-violet-600 font-bold tracking-widest uppercase block">
                      {selectedTopic.subtitle} // DISCIPLINE SPEC
                    </span>
                    <h3 className="font-display font-black text-2xl uppercase tracking-tight text-stone-800">
                      {selectedTopic.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/40">
                  <span className="font-mono text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                    DELIVERY STANDARD METRICS
                  </span>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    {selectedTopic.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                    INCLUDED CAPABILITIES & ARTIFACTS:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedTopic.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-stone-100/50 border border-stone-200/20">
                        <CheckCircle2 size={14} className="text-violet-600 mt-0.5 flex-shrink-0" />
                        <div className="space-y-0.5">
                          <span className="font-mono text-[10px] font-bold text-stone-800 uppercase block">{bullet}</span>
                          <span className="text-[9px] text-stone-500 block leading-tight">Guaranteed in deliverable catalog.</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/40 flex justify-between items-center">
                  <span className="font-mono text-[9px] text-stone-400 uppercase">
                    Status: HIGH END CREATIVE STANDARD
                  </span>
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="px-6 py-2.5 bg-stone-800 hover:bg-stone-900 text-white-force font-mono text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors cursor-pointer"
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

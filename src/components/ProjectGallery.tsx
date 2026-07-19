import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Eye, ArrowUpRight, Lock, Globe, Layout, Code } from 'lucide-react';
import CyberFrame from './CyberFrame';
import { audioEngine } from '../lib/audio';

const categories = [
  'All',
  'Enterprise Systems',
  'E-Commerce',
  'Web Architecture',
  'Landing Pages',
  'Utilities'
];

const projects = [
  {
    id: 1,
    title: 'INDIGO LENS // Advanced Tech Solutions',
    client: 'IndigoLens',
    category: 'Enterprise Systems',
    likes: '452',
    views: '12k',
    isPro: true,
    thumbnail: 'from-blue-900/40 to-black',
    icon: Globe,
    tech: 'React / Firebase',
    link: 'https://indigolens.in'
  },
  {
    id: 2,
    title: 'MENU CRAFT // Digital Restaurant Engine',
    client: 'Restaurant Demo',
    category: 'E-Commerce',
    likes: '124',
    views: '3.2k',
    isPro: true,
    thumbnail: 'from-orange-900/40 to-black',
    icon: Layout,
    tech: 'React / Vercel',
    link: 'https://menu-craft-demo.vercel.app'
  },
  {
    id: 3,
    title: 'PROP VIEW // Real Estate Showcase',
    client: 'Property Dealer',
    category: 'Web Architecture',
    likes: '89',
    views: '2.1k',
    isPro: true,
    thumbnail: 'from-fuchsia-900/40 to-black',
    icon: Layout,
    tech: 'React / Next.js',
    link: 'https://prop-view-demo.vercel.app'
  },
  {
    id: 4,
    title: 'KISHAN FARM // Agriculture Frontend',
    client: 'Farm Demo',
    category: 'Landing Pages',
    likes: '215',
    views: '5.4k',
    isPro: false,
    thumbnail: 'from-emerald-900/40 to-black',
    icon: Globe,
    tech: 'React / Vercel',
    link: 'https://kishan-farm.vercel.app'
  },
  {
    id: 5,
    title: 'BIO HUB // Centralized Link Utility',
    client: 'LinkTree Alternative',
    category: 'Utilities',
    likes: '312',
    views: '12k',
    isPro: false,
    thumbnail: 'from-violet-900/40 to-black',
    icon: Code,
    tech: 'React / Tailwind',
    link: 'https://bio-hub-demo.vercel.app'
  },
  {
    id: 6,
    title: 'DEV PORTFOLIO // Developer Identity',
    client: 'Personal',
    category: 'Web Architecture',
    likes: '56',
    views: '1.5k',
    isPro: true,
    thumbnail: 'from-indigo-900/40 to-black',
    icon: Code,
    tech: 'React / Vercel',
    link: 'https://developer-portfolio-bpgc.vercel.app'
  }
];

interface ProjectGalleryProps {
  navigate?: (path: string) => void;
}

// Cloudy Spec Note Component for Landing Gallery
const CloudyBlueprintNote = ({ 
  project, 
  onPrefill 
}: { 
  project: any; 
  onPrefill: (category: string, title: string, e: React.MouseEvent) => void;
}) => {
  return (
    <div className="relative p-6 rounded-[24px] bg-[#0c0c0e]/95 border-2 border-dashed border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.03)] backdrop-blur-md overflow-hidden flex flex-col justify-between h-full min-h-[240px] transition-all duration-300 hover:border-violet-500/40">
      {/* Cloudy gradient accent */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-fuchsia-600/10 rounded-full blur-xl pointer-events-none" />
      
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

      <div>
        {/* Note tag */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500">
          <span>SPEC-NOTE // LANDING-DIRECT</span>
          <span>DEVIL CORE APPROVED</span>
        </div>

        {/* Notes Title */}
        <h4 className="text-white font-display font-bold text-xs uppercase tracking-wide mb-1 flex items-center gap-1.5">
          <span>☁️</span> {project.category} Demo Note
        </h4>
        <p className="text-[11px] font-mono italic text-gray-400 leading-relaxed mb-4">
          "A verified blueprint designed to showcase dynamic server response, optimized asset caching, and clean user experience flows for {project.category} setups."
        </p>

        {/* Bullet points */}
        <div className="bg-white/[0.01] border border-white/5 rounded p-2.5 mb-3">
          <div className="font-mono text-[9px] text-gray-500 space-y-0.5">
            <div>• Core Stack: {project.tech}</div>
            <div>• Active sandboxed production instance</div>
          </div>
        </div>
      </div>

      {/* Auto prefill button */}
      <button
        onClick={(e) => onPrefill(project.category, project.title, e)}
        className="w-full py-2 px-3 bg-violet-500/10 hover:bg-violet-600/20 border border-violet-500/20 hover:border-violet-500/50 text-violet-400 hover:text-white font-mono text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded flex items-center justify-center space-x-1.5 cursor-pointer select-none"
      >
        <span>⚡ AUTO-FILL TELEMETRY FORM</span>
      </button>
    </div>
  );
};

// High-fidelity Floating Glass badges mimicking attention-grabbing modern graphics
const FloatingGlassBadge = ({ projectId }: { projectId: number }) => {
  switch (projectId) {
    case 1:
      return (
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px)' }}
          className="absolute -top-5 -left-5 z-40 bg-[#121214]/90 backdrop-blur-md border border-violet-500/40 px-3.5 py-2 rounded-2xl shadow-[0_15px_35px_rgba(139,92,246,0.3)] flex items-center space-x-2.5 pointer-events-none select-none"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
          </div>
          <span className="font-mono text-[10px] font-black text-white uppercase tracking-widest">LIVE BLUEPRINT ONLINE</span>
        </motion.div>
      );
    case 2:
      return (
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(60px)' }}
          className="absolute -bottom-8 -right-4 z-40 bg-gradient-to-tr from-fuchsia-600/90 to-rose-500/90 backdrop-blur-lg border border-white/20 p-3.5 rounded-[22px] shadow-[0_12px_30px_rgba(236,72,153,0.35)] flex flex-col items-start pointer-events-none text-left max-w-[140px] select-none"
        >
          <span className="font-mono text-[8px] text-white/80 uppercase tracking-widest font-extrabold mb-0.5">E-COMMERCE SYSTEM</span>
          <span className="font-display font-black text-xs text-white tracking-tight leading-none uppercase">STAGING STABLE</span>
        </motion.div>
      );
    case 3:
      return (
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(55px)' }}
          className="absolute -top-8 -right-5 z-40 bg-[#09090b]/95 backdrop-blur-md border-2 border-violet-500/30 p-4 rounded-3xl shadow-[0_20px_40px_rgba(168,85,247,0.25)] flex flex-col pointer-events-none text-left select-none"
        >
          <div className="flex items-center space-x-1.5 mb-1">
            <span className="text-emerald-400 text-xs animate-pulse">●</span>
            <span className="font-mono text-[9px] text-emerald-400 tracking-wider font-bold">100% SECURE</span>
          </div>
          <span className="font-display font-extrabold text-xs text-stone-200 leading-none tracking-tight">RAPID EDGE ROUTING</span>
        </motion.div>
      );
    case 4:
      return (
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(45px)' }}
          className="absolute -bottom-6 -left-6 z-40 bg-[#06150d]/95 backdrop-blur-xl border border-emerald-500/40 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center space-x-2 pointer-events-none select-none"
        >
          <span className="text-base">🌱</span>
          <span className="font-mono text-[9px] font-black text-emerald-300 tracking-widest uppercase">ECOLOGY STABLE UNIT</span>
        </motion.div>
      );
    case 5:
      return (
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px)' }}
          className="absolute -top-7 -left-5 z-40 bg-gradient-to-r from-violet-600/90 to-blue-600/90 backdrop-blur-md border border-white/10 px-4.5 py-2 rounded-full shadow-[0_15px_30px_rgba(59,130,246,0.3)] flex items-center space-x-2 pointer-events-none select-none"
        >
          <span className="text-white text-xs animate-bounce">⚡</span>
          <span className="font-mono text-[9px] font-bold text-white tracking-widest uppercase">BIO-HUB INTERACTION</span>
        </motion.div>
      );
    default:
      return (
        <motion.div
          animate={{ y: [0, 9, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
          className="absolute -bottom-6 -right-3 z-40 bg-stone-900/90 backdrop-blur-xl border border-stone-700/50 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 pointer-events-none select-none"
        >
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="font-mono text-[9px] font-bold text-gray-300 uppercase tracking-widest">STABLE PORTFOLIO DIRECT</span>
        </motion.div>
      );
  }
};

// 3D Parallax Mouse movement interaction wrapper
interface Interactive3DCardProps {
  children: React.ReactNode;
  projectId: number;
}

function Interactive3DCard({ children, projectId }: Interactive3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, rX: 0, rY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;
    
    // Smooth 3D tilt
    const maxRotate = 15;
    const targetRotateX = -yPct * maxRotate;
    const targetRotateY = xPct * maxRotate;
    
    // Magnetic translation
    const maxTranslate = 10;
    const targetX = xPct * maxTranslate;
    const targetY = yPct * maxTranslate;
    
    const glareX = (mouseX / rect.width) * 100;
    const glareY = (mouseY / rect.height) * 100;
    
    setCoords({ x: targetX, y: targetY, rX: targetRotateX, rY: targetRotateY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, rX: 0, rY: 0, glareX: 50, glareY: 50 });
  };

  const glowColorMap = [
    'rgba(139, 92, 246, 0.25)', 
    'rgba(236, 72, 153, 0.25)', 
    'rgba(59, 130, 246, 0.25)'
  ];
  const activeGlowColor = glowColorMap[projectId % 3];

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        try { audioEngine.playHover(); } catch(e) {}
      }}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="w-full h-full relative"
    >
      <motion.div
        animate={{
          x: coords.x,
          y: coords.y,
          rotateX: coords.rX,
          rotateY: coords.rY,
          scale: isHovered ? 1.03 : 1,
          boxShadow: isHovered 
            ? `${-coords.rY * 2.5}px ${coords.rX * 2.5 + 35}px 70px ${activeGlowColor}, -6px -6px 35px rgba(255, 255, 255, 0.03)`
            : "0px 10px 30px rgba(0, 0, 0, 0.2)"
        }}
        transition={{ 
          type: "spring",
          stiffness: 150, 
          damping: 20, 
          mass: 0.1
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full relative rounded-2xl"
      >
        {/* Shiny Glossy Reflection / Glare Overlay */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none rounded-2xl z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 280px at ${coords.glareX}% ${coords.glareY}%, rgba(255, 255, 255, 0.18), transparent 85%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}

export default function ProjectGallery({ navigate }: ProjectGalleryProps = {}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [telemetryMessage, setTelemetryMessage] = useState<string | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  // Context-aware category handler to sync with Contact form state
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setActiveProjectIndex(0); // Reset project pointer on category change
    setDirection(1);
    
    // Play subtle audio feedback
    try {
      audioEngine.playClick();
    } catch (e) {}

    // Save selected category to localStorage
    localStorage.setItem('selectedProjectCategory', category);

    // Map selected category to a standard project scope/interest option
    const categoryToScopeMap: Record<string, string> = {
      'Enterprise Systems': 'Retainer / Enterprise',
      'E-Commerce': 'Web App',
      'Web Architecture': 'Web App',
      'Landing Pages': 'MVP Build (Starter)',
      'Utilities': 'Web App',
    };

    const mappedScope = categoryToScopeMap[category];
    if (mappedScope) {
      localStorage.setItem('selectedPlanScope', mappedScope);
    } else {
      localStorage.removeItem('selectedPlanScope');
    }

    if (category !== 'All') {
      setTelemetryMessage(`Telemetry: Category "${category}" synchronized with Contact form!`);
      setTimeout(() => {
        setTelemetryMessage(null);
      }, 2000);
    }
  };

  const handleNextProject = () => {
    if (filteredProjects.length <= 1) return;
    try { audioEngine.playClick(); } catch (e) {}
    setDirection(1);
    setActiveProjectIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrevProject = () => {
    if (filteredProjects.length <= 1) return;
    try { audioEngine.playClick(); } catch (e) {}
    setDirection(-1);
    setActiveProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  // Synchronize contact prefill telemetry
  const handlePrefillContact = (category: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const briefText = `Inquiring about custom high-scale "${category}" infrastructure. We noticed the architecture of "${title}" and want to request a personalized system consultation.`;
    localStorage.setItem('devil_labs_prefill_brief', briefText);
    localStorage.setItem('devil_labs_prefill_budget', '$700 - $1,000');

    setTelemetryMessage(`Telemetry synchronizing: Form pre-filled with "${category}" specs!`);

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-initialize-modal'));
      setTelemetryMessage(null);
    }, 1200);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.97
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 120, damping: 18 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.97,
      transition: {
        x: { type: "spring", stiffness: 120, damping: 18 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="w-full relative overflow-hidden py-10">
      
      {/* Dynamic Telemetry Banner */}
      <AnimatePresence>
        {telemetryMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-violet-600 border border-violet-400 text-white font-mono text-[10px] uppercase tracking-wider py-2.5 px-5 rounded-full shadow-2xl flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>{telemetryMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-16 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center space-x-1.5 text-violet-500 font-mono text-[9px] uppercase tracking-[0.25em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          <span>PRODUCTION DIRECTORY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight mb-4 max-w-4xl">
          World-Class <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Autonomous Deployments</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto mb-10 leading-relaxed">
          Interact with our live sandboxes. Experience high-velocity staging previews and detailed architecture blueprints designed into a custom horizontal deck.
        </p>
        
        {/* Category Filters */}
        <div className="flex flex-col items-center gap-4 w-full">
          <span className="text-gray-500 font-mono text-[9px] uppercase tracking-widest font-bold">
            Select Tech Category Spec
          </span>
          <div className="flex sm:flex-wrap overflow-x-auto w-full justify-start sm:justify-center items-center gap-2 pb-2 scrollbar-hide px-4 sm:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  handleCategoryClick(category);
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-mono text-[10px] font-bold tracking-wider transition-all duration-300 active:scale-95 border ${
                  activeCategory === category
                    ? 'bg-white text-black shadow-lg border-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Interactive Slider Console */}
      <div className="relative max-w-5xl mx-auto z-10 px-4 sm:px-8 md:px-14">
        
        {/* Navigation Arrows positioned on the outer edges for Desktop */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-16 z-30 hidden sm:block">
          <button
            onClick={handlePrevProject}
            className="w-12 h-12 rounded-full bg-stone-900/80 hover:bg-violet-600/90 border border-white/10 hover:border-violet-500/50 text-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] group active:scale-95 cursor-pointer"
            aria-label="Previous Project"
          >
            <span className="transform group-hover:-translate-x-0.5 transition-transform text-lg">←</span>
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-16 z-30 hidden sm:block">
          <button
            onClick={handleNextProject}
            className="w-12 h-12 rounded-full bg-stone-900/80 hover:bg-violet-600/90 border border-white/10 hover:border-violet-500/50 text-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] group active:scale-95 cursor-pointer"
            aria-label="Next Project"
          >
            <span className="transform group-hover:translate-x-0.5 transition-transform text-lg">→</span>
          </button>
        </div>

        {/* Mobile Mini Arrows Header */}
        <div className="flex sm:hidden justify-end gap-3 mb-4">
          <button
            onClick={handlePrevProject}
            className="w-10 h-10 rounded-full bg-stone-900/80 border border-white/10 text-white flex items-center justify-center active:scale-95"
            aria-label="Previous Project"
          >
            <span>←</span>
          </button>
          <button
            onClick={handleNextProject}
            className="w-10 h-10 rounded-full bg-[#1c1c24] border border-violet-500/30 text-white flex items-center justify-center active:scale-95 animate-pulse"
            aria-label="Next Project"
          >
            <span>→</span>
          </button>
        </div>

        {/* Slider Frame */}
        <div className="overflow-visible relative min-h-[500px] sm:min-h-[440px]">
          <AnimatePresence mode="wait" custom={direction}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, idx) => {
                if (idx !== activeProjectIndex) return null;
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={project.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-stretch"
                  >
                    {/* Browser Frame Column with 3D Parallax */}
                    <div className="col-span-1 md:col-span-7 relative flex flex-col justify-center">
                      <Interactive3DCard projectId={project.id}>
                        <FloatingGlassBadge projectId={project.id} />
                        <CyberFrame glowColor={['violet', 'fuchsia', 'blue'][project.id % 3] as 'violet' | 'fuchsia' | 'blue'} className="p-4 rounded-xl cursor-default bg-[#090909]/40 backdrop-blur-md h-full flex flex-col hover:border-white/10 relative overflow-visible">
                          {/* Live Sandbox preview mock with perspective translation */}
                          <div 
                            style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
                            className="w-full aspect-[4/3] bg-gradient-to-br from-violet-900/30 to-black rounded-lg overflow-hidden relative mb-4 border border-white/5 flex flex-col shadow-2xl"
                          >
                            {/* Browser Mock Header */}
                            <div className="h-6 w-full bg-black/60 border-b border-white/10 flex items-center px-3 space-x-1.5 shrink-0 z-20 backdrop-blur-md">
                              <div className="w-2 h-2 rounded-full bg-red-500/80" />
                              <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                              <div className="w-2 h-2 rounded-full bg-green-500/80" />
                              <div className="ml-2 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[8px] font-mono text-gray-400 truncate max-w-[150px]">
                                {project.link.replace(/^https?:\/\//, '')}
                              </div>
                            </div>
                            
                            {/* Browser Mock Content */}
                            <div className="relative flex-grow w-full overflow-hidden bg-[#050505]">
                              <div className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left pointer-events-none" style={{ transform: 'scale(0.25)' }}>
                                <iframe 
                                  src={project.link} 
                                  className="w-full h-full border-none bg-white"
                                  sandbox="allow-scripts allow-same-origin"
                                  loading="lazy"
                                  title={project.title}
                                />
                              </div>
                              
                              {/* Interactive click overlay */}
                              <div className="absolute inset-0 z-10 bg-black/40 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center cursor-pointer" onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}>
                                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-90 hover:scale-100 transition-all duration-300">
                                   <ArrowUpRight className="text-black" size={18} />
                                 </div>
                              </div>
                            </div>
                          </div>

                          {/* Metadata block projected outwards slightly */}
                          <div 
                            style={{ transform: 'translateZ(15px)' }}
                            className="flex items-start justify-between px-1 mt-auto"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded bg-[#111] border border-white/10 flex items-center justify-center">
                                <span className="font-display font-black text-[10px] text-white">DL</span>
                              </div>
                              <div>
                                <h4 className="text-white text-xs sm:text-sm font-bold tracking-tight">{project.title.split('//')[1] || project.title}</h4>
                                <div className="flex items-center space-x-2 mt-0.5">
                                  <span className="text-gray-400 text-[11px]">{project.client}</span>
                                  {project.isPro && (
                                    <span className="px-1 py-0.5 bg-violet-500/20 text-violet-400 text-[8px] font-bold tracking-wider rounded uppercase">PRO</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2.5 text-gray-500 text-[11px] font-medium">
                              <div className="flex items-center space-x-1">
                                <Heart size={12} />
                                <span>{project.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye size={12} />
                                <span>{project.views}</span>
                              </div>
                            </div>
                          </div>
                        </CyberFrame>
                      </Interactive3DCard>
                    </div>

                    {/* Handdrawn Notebook Spec Attachment Column */}
                    <div className="col-span-1 md:col-span-5 flex flex-col justify-center">
                      <CloudyBlueprintNote project={project} onPrefill={handlePrefillContact} />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-20 text-stone-500 font-mono text-xs">
                NO ACTIVE DEPLOYMENTS REGISTERED UNDER THIS FILTER CHANNEL
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Dashboard Pagination Dots Deck */}
        {filteredProjects.length > 0 && (
          <div className="mt-12 flex flex-col items-center relative z-10">
            {/* Clickable Dash Indicators */}
            <div className="flex justify-center items-center gap-2.5">
              {filteredProjects.map((proj, pIdx) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    try { audioEngine.playClick(); } catch (e) {}
                    setDirection(pIdx > activeProjectIndex ? 1 : -1);
                    setActiveProjectIndex(pIdx);
                  }}
                  className="group flex items-center py-2 px-1 focus:outline-none cursor-pointer"
                  aria-label={`Jump to project ${pIdx + 1}`}
                >
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeProjectIndex === pIdx 
                      ? 'w-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]' 
                      : 'w-2.5 bg-stone-800 hover:bg-stone-600'
                  }`} />
                </button>
              ))}
            </div>

            {/* Quick telemetry/nav helper label */}
            <div className="mt-3 font-mono text-[9px] text-stone-500 uppercase tracking-widest flex items-center gap-2">
              <span>PROJECT 0{activeProjectIndex + 1} OF 0{filteredProjects.length}</span>
              <span className="text-stone-700">•</span>
              <span>SELECT METRIC TO PRE-FILL CONTRACT</span>
            </div>
          </div>
        )}
      </div>

      {/* Explore directory trigger */}
      <div className="mt-20 text-center relative z-10">
        <button 
          onClick={() => navigate ? navigate('/projects') : window.location.assign('/projects')}
          className="px-6 py-3 bg-white/5 border border-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-violet-600 hover:border-violet-500 hover:text-white transition-all duration-300 rounded-full cursor-pointer"
        >
          Explore Full Vertical Matrix
        </button>
      </div>
    </div>
  );
}

import IframeWithSkeleton from '../components/IframeWithSkeleton';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Lock, Terminal, Heart, Eye, Cpu, Globe, Layout, Shield, Sparkles } from 'lucide-react';
import CyberFrame from '../components/CyberFrame';
import { CLIENT_PROJECTS, DEMO_PROJECTS, CATEGORIES } from '../data/projects';
import { audioEngine } from '../lib/audio';

interface ProjectsPageProps {
  navigate: (path: string) => void;
}

// High-fidelity Floating Glass badges mimicking attention-grabbing modern graphics
const FloatingGlassBadge = ({ projectId }: { projectId: number }) => {
  switch (projectId % 6) {
    case 1:
      return (
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px)' }}
          className="absolute -top-5 -left-5 z-40 bg-stone-950/90 backdrop-blur-md border border-violet-500/40 px-3.5 py-2 rounded-2xl shadow-[0_15px_35px_rgba(139,92,246,0.3)] flex items-center space-x-2.5 pointer-events-none select-none"
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
          className="absolute -top-8 -right-5 z-40 bg-stone-950/95 backdrop-blur-md border border-violet-500/30 p-4 rounded-3xl shadow-[0_20px_40px_rgba(168,85,247,0.25)] flex flex-col pointer-events-none text-left select-none"
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
          className="absolute -bottom-6 -right-3 z-40 bg-stone-950/90 backdrop-blur-xl border border-stone-800 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 pointer-events-none select-none"
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
            : "0px 10px 30px rgba(0, 0, 0, 0.05)"
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
        {/* Shiny Glossy Reflection Overlay */}
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

// Cloudy Blueprint Note Component
const CloudyBlueprintNote = ({ 
  project, 
  onPrefill 
}: { 
  project: any; 
  onPrefill: (category: string, title: string, e: React.MouseEvent) => void;
}) => {
  return (
    <div className="relative p-6 rounded-[24px] bg-[#fcfbf9] border border-stone-200/50 shadow-[8px_8px_20px_rgba(45,38,32,0.05),-8px_-8px_20px_#ffffff] overflow-hidden flex flex-col justify-between h-full min-h-[250px] transition-all duration-300 hover:border-violet-300">
      {/* Cloudy gradient background accent */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-100/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-fuchsia-100/20 rounded-full blur-xl pointer-events-none" />
      
      {/* Schematic dot blueprint pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#2d262005_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

      <div>
        {/* Spec note header */}
        <div className="flex items-center justify-between border-b border-stone-200/30 pb-2.5 mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-stone-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            SPEC-NOTE ✦ V03
          </span>
          <span>DEVIL CORE ENG.</span>
        </div>

        {/* Note title */}
        <h4 className="text-stone-800 font-display font-bold text-xs sm:text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
          <span>☁️</span> {project.category || 'System Architecture'} Brief
        </h4>
        <p className="text-[11px] font-mono italic text-stone-500 leading-relaxed mb-4">
          "This deployment functions as an active live-state sandbox showcasing enterprise modularity, zero-latency rendering, and secure API caching workflows optimized for {project.category} solutions."
        </p>

        {/* Miniature cloudy book schema notes */}
        <div className="bg-[#faf8f5]/80 border border-stone-200/30 rounded-xl p-3 mb-4">
          <div className="font-mono text-[10px] text-violet-700 flex items-center gap-1.5 mb-1.5 font-bold uppercase tracking-wider">
            <span>⚙️</span> STACK & SECURITY SPEC:
          </div>
          <div className="font-mono text-[9px] text-stone-500 space-y-1">
            <div>• GATEWAY: Secure reverse proxy mapping</div>
            <div>• CACHING: Edge state cache / static regeneration</div>
            <div>• DEPLOY: Org-controlled and verified under Dev-Core</div>
          </div>
        </div>
      </div>

      {/* Auto fill Action Trigger */}
      <button
        onClick={(e) => onPrefill(project.category, project.title, e)}
        className="w-full py-2.5 px-3 bg-violet-50 hover:bg-violet-100 border border-violet-200 hover:border-violet-300 text-violet-700 font-mono text-[9px] font-bold uppercase tracking-[0.18em] transition-all duration-300 rounded-xl flex items-center justify-center space-x-2 cursor-pointer select-none shadow-sm"
      >
        <span>⚡ AUTO-FILL ORCHESTRATION BRIEF</span>
      </button>
    </div>
  );
};

export default function ProjectsPage({ navigate }: ProjectsPageProps) {
  const [section, setSection] = useState<'demo' | 'client'>('demo');
  const [activeCategory, setActiveCategory] = useState("All");
  const [telemetryMessage, setTelemetryMessage] = useState<string | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const filteredClientProjects = activeCategory === "All"
    ? CLIENT_PROJECTS
    : CLIENT_PROJECTS.filter(p => p.domain === activeCategory);

  const filteredDemoProjects = activeCategory === "All"
    ? DEMO_PROJECTS
    : DEMO_PROJECTS.filter(p => p.domain === activeCategory);

  const activeProjects = section === 'demo' ? filteredDemoProjects : filteredClientProjects;

  const handleNextProject = () => {
    if (activeProjects.length <= 1) return;
    try { audioEngine.playClick(); } catch (e) {}
    setDirection(1);
    setActiveProjectIndex((prev) => (prev + 1) % activeProjects.length);
  };

  const handlePrevProject = () => {
    if (activeProjects.length <= 1) return;
    try { audioEngine.playClick(); } catch (e) {}
    setDirection(-1);
    setActiveProjectIndex((prev) => (prev - 1 + activeProjects.length) % activeProjects.length);
  };

  const handleSectionChange = (sec: 'demo' | 'client') => {
    setSection(sec);
    setActiveProjectIndex(0);
    setDirection(1);
    try {
      audioEngine.playClick();
    } catch (err) {}
  };

  // Telemetry auto-fill contact trigger
  const handlePrefillContact = (category: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Prefill details in localStorage
    const briefText = `Initiating discussion for custom "${category}" architecture. We are highly interested in implementing a production system modeled after the "${title}" structure. Please coordinate an architecture evaluation with Devil Labs Core.`;
    localStorage.setItem('devil_labs_prefill_brief', briefText);
    localStorage.setItem('devil_labs_prefill_budget', '$700 - $1,000');

    // Trigger visual telemetry alert
    setTelemetryMessage(`Telemetry synchronizing: Form pre-filled with "${category}" specs!`);
    
    // Play sound if possible
    try {
      audioEngine.playClick();
    } catch (err) {}

    // Open Modal after a brief telemetry animation delay
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-initialize-modal'));
      setTelemetryMessage(null);
    }, 1200);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveProjectIndex(0);
    setDirection(1);

    // Play sound
    try {
      audioEngine.playClick();
    } catch (err) {}

    // Save selected category to localStorage for the global ContactPage form state
    localStorage.setItem('selectedProjectCategory', category);

    // Map domain category to a standard project scope/interest option
    const categoryToScopeMap: Record<string, string> = {
      'AI': 'AI Automation',
      'Web': 'Web App',
      'Infrastructure': 'Retainer / Enterprise',
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
      const projId = parseInt(idParam);
      if (!isNaN(projId)) {
        const isClient = CLIENT_PROJECTS.some(p => p.id === projId);
        const isDemo = DEMO_PROJECTS.some(p => p.id === projId);
        if (isClient) {
          setSection('client');
          const proj = CLIENT_PROJECTS.find(p => p.id === projId);
          if (proj && proj.domain) {
            setActiveCategory(proj.domain);
            const filtered = proj.domain === "All" 
              ? CLIENT_PROJECTS 
              : CLIENT_PROJECTS.filter(p => p.domain === proj.domain);
            const foundIdx = filtered.findIndex(p => p.id === projId);
            if (foundIdx !== -1) {
              setActiveProjectIndex(foundIdx);
            }
          }
        } else if (isDemo) {
          setSection('demo');
          const proj = DEMO_PROJECTS.find(p => p.id === projId);
          if (proj && proj.domain) {
            setActiveCategory(proj.domain);
            const filtered = proj.domain === "All"
              ? DEMO_PROJECTS
              : DEMO_PROJECTS.filter(p => p.domain === proj.domain);
            const foundIdx = filtered.findIndex(p => p.id === projId);
            if (foundIdx !== -1) {
              setActiveProjectIndex(foundIdx);
            }
          }
        }
      }
    }
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98
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
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 120, damping: 18 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="pt-20 xs:pt-24 sm:pt-28 lg:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-h-screen relative overflow-hidden text-stone-800">
      
      {/* Real-time telemetry notification toast */}
      <AnimatePresence>
        {telemetryMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-stone-900 border border-stone-800 text-white font-mono text-[11px] uppercase tracking-wider py-3 px-6 rounded-full shadow-2xl flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
            <span>{telemetryMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background drifting clouds for natural organic environment */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ 
            x: [0, 40, -20, 0], 
            y: [0, -30, 20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-violet-100/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 40, 0], 
            y: [0, 40, -30, 0],
            rotate: [0, -8, 8, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[30%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-100/20 rounded-full blur-[140px]"
        />
      </div>

      {/* Merged unified Hero and Directory section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center mb-10 relative z-10"
      >
        <div className="inline-flex items-center space-x-2 text-violet-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span>PRODUCTION DIRECTORY</span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tighter uppercase mb-6 leading-[0.95] text-stone-800">
          Unified <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500">
            Architectures
          </span>
        </h1>
        <p className="text-stone-600 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Navigate our active production deployments. Select from our organic categories, then swipe or use our remote console triggers to inspect blueprints horizontally without extensive vertical scrolling.
        </p>

        {/* Primary Toggle & Auto-fill Info Row */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="inline-flex p-1 bg-[#f0ede6] border border-stone-200/50 rounded-full shadow-inner">
            <button
              onClick={() => handleSectionChange('demo')}
              className={`relative px-6 py-2.5 text-[10px] font-mono font-bold tracking-[0.2em] uppercase rounded-full transition-colors cursor-pointer ${section === 'demo' ? 'text-stone-850 font-black' : 'text-stone-500 hover:text-stone-850'}`}
            >
              {section === 'demo' && (
                <motion.div layoutId="work-toggle" className="absolute inset-0 bg-[#fcfbf9] border border-stone-200/30 rounded-full shadow-md" />
              )}
              <span className="relative z-10">Demos</span>
            </button>
            <button
              onClick={() => handleSectionChange('client')}
              className={`relative px-6 py-2.5 text-[10px] font-mono font-bold tracking-[0.2em] uppercase rounded-full transition-colors cursor-pointer ${section === 'client' ? 'text-stone-850 font-black' : 'text-stone-500 hover:text-stone-850'}`}
            >
              {section === 'client' && (
                <motion.div layoutId="work-toggle" className="absolute inset-0 bg-[#fcfbf9] border border-stone-200/30 rounded-full shadow-md" />
              )}
              <span className="relative z-10">Client Private</span>
            </button>
          </div>
          
          <div className="text-[9px] font-mono tracking-widest text-violet-700 uppercase flex items-center gap-2 bg-violet-50 px-4 py-1.5 rounded-full border border-violet-200">
            <span>💡</span> CLICK THE AUTO-FILL BRIEF BUTTON ON ANY SPEC NOTE TO POPULATE THE CONTACT FORM INSTANTLY
          </div>
        </div>

        {/* Domain Categories Filters */}
        <div className="flex flex-col items-center gap-4 w-full mt-8">
          <div className="flex sm:flex-wrap overflow-x-auto w-full justify-start sm:justify-center items-center gap-2 pb-2 scrollbar-hide px-4 sm:px-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`whitespace-nowrap px-5 py-2 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-md border-transparent'
                    : 'bg-[#fcfbf9] text-stone-600 hover:bg-white hover:text-stone-850 border-stone-200/50 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Organisation secure git note banner for Private Client page */}
      {section === 'client' && (
        <div className="max-w-4xl mx-auto mb-8 relative z-10">
          <div className="p-6 bg-violet-50/50 border border-violet-200 rounded-[24px] shadow-[4px_4px_12px_rgba(45,38,32,0.03)] backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
              <div>
                <h4 className="text-stone-850 font-mono text-xs uppercase tracking-widest font-bold mb-1 flex items-center gap-2">
                  <Terminal size={14} className="text-violet-600" />
                  SECURE COHESION DIRECTORY
                </h4>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Client deployments are configured inside isolated Docker sandboxes and privately routed through secure GitHub pipelines. Contact our deployment core to request sandbox access keypairs.
                </p>
              </div>
              <a 
                href="https://github.com/Devil-Labs/" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-mono text-[10px] font-bold tracking-widest uppercase transition-all shrink-0 rounded-xl shadow-md flex items-center space-x-2 cursor-pointer"
              >
                <span>ORGANIZATION REPO</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Interactive Console Deck */}
      <div className="max-w-5xl mx-auto relative z-10 px-4 sm:px-8 md:px-14 mt-4 mb-16">
        
        {/* Navigation Arrows positioned on the outer edges for Desktop */}
        {activeProjects.length > 1 && (
          <>
            <div className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-16 z-30 hidden sm:block">
              <button
                onClick={handlePrevProject}
                className="w-12 h-12 rounded-full bg-stone-900/95 hover:bg-violet-600/90 border border-stone-800 hover:border-violet-500/50 text-white flex items-center justify-center transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] group active:scale-95 cursor-pointer"
                aria-label="Previous Project"
              >
                <span className="transform group-hover:-translate-x-0.5 transition-transform text-lg font-bold">←</span>
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-16 z-30 hidden sm:block">
              <button
                onClick={handleNextProject}
                className="w-12 h-12 rounded-full bg-stone-900/95 hover:bg-violet-600/90 border border-stone-800 hover:border-violet-500/50 text-white flex items-center justify-center transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] group active:scale-95 cursor-pointer"
                aria-label="Next Project"
              >
                <span className="transform group-hover:translate-x-0.5 transition-transform text-lg font-bold">→</span>
              </button>
            </div>
          </>
        )}

        {/* Mobile Mini Arrows Header */}
        {activeProjects.length > 1 && (
          <div className="flex sm:hidden justify-end gap-3 mb-4">
            <button
              onClick={handlePrevProject}
              className="w-10 h-10 rounded-full bg-stone-900/90 border border-stone-800 text-white flex items-center justify-center active:scale-95"
              aria-label="Previous Project"
            >
              <span>←</span>
            </button>
            <button
              onClick={handleNextProject}
              className="w-10 h-10 rounded-full bg-stone-900/90 border border-violet-500/30 text-white flex items-center justify-center active:scale-95"
              aria-label="Next Project"
            >
              <span>→</span>
            </button>
          </div>
        )}

        {/* Slider Console Frame */}
        <div className="overflow-visible relative min-h-[560px] sm:min-h-[460px]">
          <AnimatePresence mode="wait" custom={direction}>
            {activeProjects.length > 0 ? (
              activeProjects.map((project, idx) => {
                if (idx !== activeProjectIndex) return null;
                
                return (
                  <motion.div
                    key={project.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-stretch"
                  >
                    {/* Live Sandbox/Phase Display Container */}
                    <div className="col-span-1 md:col-span-7 relative flex flex-col justify-center">
                      <Interactive3DCard projectId={project.id}>
                        <FloatingGlassBadge projectId={project.id} />
                        <div className="p-4 rounded-3xl bg-[#fcfbf9] border border-stone-200/50 shadow-[8px_8px_30px_rgba(45,38,32,0.06),-8px_-8px_30px_#ffffff] h-full flex flex-col justify-between relative overflow-visible">
                          
                          {/* Browser Mock Frame */}
                          <div className={`w-full aspect-[4/3] bg-gradient-to-br ${project.thumbnail} rounded-2xl overflow-hidden relative mb-4 border border-stone-200/30 transition-all duration-300 flex flex-col shadow-inner`}>
                            <div className="h-7 w-full bg-stone-100/90 border-b border-stone-200/30 flex items-center px-3 space-x-1.5 shrink-0 z-20 backdrop-blur-sm">
                              <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                              <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                              <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                              <div className="ml-2 px-2.5 py-0.5 rounded-md bg-stone-200/40 border border-stone-200/20 text-[8px] font-mono text-stone-500 truncate max-w-[200px]">
                                {project.link.replace(/^https?:\/\//, '')}
                              </div>
                            </div>
                            
                            {section === 'client' ? (
                              /* Private Project Preview Lock Screen */
                              <div className="relative flex-grow w-full overflow-hidden bg-stone-50 flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-stone-100/30 to-stone-50/80 flex flex-col items-center justify-center p-6 text-center z-10">
                                  <Lock size={32} className="text-stone-400 mb-3" />
                                  <div className="text-stone-800 font-display font-bold text-lg uppercase tracking-wider mb-2">Development Phase</div>
                                  <div className="bg-stone-150 text-stone-600 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-stone-200/50">
                                    Private Gateway Active
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Interactive Sandbox Frame */
                              <div className="relative flex-grow w-full overflow-hidden bg-white">
                                <div className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left pointer-events-none" style={{ transform: 'scale(0.25)' }}>
                                  <iframe 
                                    src={project.link} 
                                    className="w-full h-full border-none bg-white"
                                    sandbox="allow-scripts allow-same-origin"
                                    loading="lazy"
                                    title={project.title}
                                  />
                                </div>
                                
                                {/* Hover click trigger overlay */}
                                <div className="absolute inset-0 z-10 bg-[#2d2620]/10 hover:bg-[#2d2620]/5 transition-colors duration-300 flex items-center justify-center cursor-pointer" onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}>
                                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transform scale-90 hover:scale-100 transition-all duration-300">
                                     <ArrowUpRight className="text-stone-800" size={20} />
                                   </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Info block */}
                          <div className="flex-grow flex flex-col pt-2 text-left">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-stone-850 font-display font-bold text-lg leading-tight uppercase tracking-tight">
                                  {section === 'client' ? project.title : project.title.split('✦')[0].trim()}
                                </h3>
                                <p className="text-stone-500 text-xs font-mono uppercase tracking-widest mt-1">
                                  Client: {project.client || 'Internal Sandbox'}
                                </p>
                              </div>
                              {project.isPro && (
                                <div className="px-2 py-1 rounded-full text-[8px] font-mono font-bold tracking-widest uppercase bg-violet-50 text-violet-700 border border-violet-200 shrink-0 mt-1">
                                  PRO
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-auto pt-4 border-t border-stone-200/30 flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-stone-650">
                                <project.icon size={14} className="text-violet-600" />
                                <span className="text-[10px] font-mono uppercase tracking-widest">{project.tech}</span>
                              </div>
                              
                              {section === 'client' ? (
                                <div className="text-stone-400 text-[10px] font-mono uppercase tracking-wider">
                                  Encrypted Gateway
                                </div>
                              ) : (
                                <div className="flex items-center space-x-3 text-stone-500 text-xs font-medium">
                                  <div className="flex items-center space-x-1 hover:text-pink-600 transition-colors cursor-pointer">
                                    <Heart size={13} />
                                    <span>{project.likes}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer">
                                    <Eye size={13} />
                                    <span>{project.views}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      </Interactive3DCard>
                    </div>

                    {/* Cloudy Blueprint Notebook Spec Attachment Column */}
                    <div className="col-span-1 md:col-span-5 flex flex-col justify-center">
                      <CloudyBlueprintNote project={project} onPrefill={handlePrefillContact} />
                    </div>

                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-24 bg-[#fcfbf9] border border-stone-200/50 rounded-3xl shadow-inner flex flex-col items-center justify-center p-8 w-full">
                <span className="text-3xl mb-3">📡</span>
                <p className="text-stone-500 font-mono text-xs tracking-widest uppercase">
                  No registered active deployments match this channel query.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Dashboard Pagination Deck and Indicators */}
        {activeProjects.length > 0 && (
          <div className="mt-12 flex flex-col items-center relative z-10">
            {/* Clickable Line Dash Indicators */}
            <div className="flex justify-center items-center gap-2.5">
              {activeProjects.map((proj, pIdx) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    try { audioEngine.playClick(); } catch (e) {}
                    setDirection(pIdx > activeProjectIndex ? 1 : -1);
                    setActiveProjectIndex(pIdx);
                  }}
                  className="group flex items-center py-2 px-1 focus:outline-none cursor-pointer"
                  aria-label={`Jump to slide ${pIdx + 1}`}
                >
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeProjectIndex === pIdx 
                      ? 'w-12 bg-gradient-to-r from-violet-600 to-rose-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]' 
                      : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                  }`} />
                </button>
              ))}
            </div>

            {/* Quick telemetry helper label */}
            <div className="mt-4 font-mono text-[9px] text-stone-500 uppercase tracking-widest flex items-center gap-2">
              <span>DEPLOYMENT 0{activeProjectIndex + 1} OF 0{activeProjects.length}</span>
              <span className="text-stone-300">•</span>
              <span>AUTO-FILL ORCHESTRATION SYNC RE-ROUTE</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

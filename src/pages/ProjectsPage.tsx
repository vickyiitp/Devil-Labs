import IframeWithSkeleton from '../components/IframeWithSkeleton';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Lock, Terminal, Heart, Eye, Cpu, Globe, Layout, Shield, Sparkles } from 'lucide-react';
import CyberFrame from '../components/CyberFrame';
import StaggeredHeading from '../components/StaggeredHeading';
import { CLIENT_PROJECTS, DEMO_PROJECTS, CATEGORIES } from '../data/projects';
import { audioEngine } from '../lib/audio';
import { useDataStore } from '../hooks/useDataStore';
import { openInquiryModal } from '../lib/inquiry';

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
          className="absolute -top-5 -left-5 z-40 bg-[#050505]/90 backdrop-blur-md border border-violet-500/40 px-3.5 py-2 rounded-2xl shadow-[0_15px_35px_rgba(139,92,246,0.3)] flex items-center space-x-2.5 pointer-events-none select-none"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
          </div>
          <span className="font-mono text-[10px] font-black text-stone-100 uppercase tracking-widest">LIVE DEMO ONLINE</span>
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
          <span className="font-mono text-[8px] text-stone-100/80 uppercase tracking-widest font-extrabold mb-0.5">E-COMMERCE SYSTEM</span>
          <span className="font-display font-black text-xs text-stone-100 tracking-tight leading-none uppercase">STAGING STABLE</span>
        </motion.div>
      );
    case 3:
      return (
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(55px)' }}
          className="absolute -top-8 -right-5 z-40 bg-[#050505]/95 backdrop-blur-md border border-violet-500/30 p-4 rounded-3xl shadow-[0_20px_40px_rgba(168,85,247,0.25)] flex flex-col pointer-events-none text-left select-none"
        >
          <div className="flex items-center space-x-1.5 mb-1">
            <span className="text-emerald-400 text-xs animate-pulse">●</span>
            <span className="font-mono text-[9px] text-emerald-400 tracking-wider font-bold">100% SECURE</span>
          </div>
          <span className="font-display font-extrabold text-xs text-stone-100 leading-none tracking-tight">RAPID EDGE ROUTING</span>
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
          <span className="text-stone-100 text-xs animate-bounce">⚡</span>
          <span className="font-mono text-[9px] font-bold text-stone-100 tracking-widest uppercase">BIO-HUB INTERACTION</span>
        </motion.div>
      );
    default:
      return (
        <motion.div
          animate={{ y: [0, 9, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
          className="absolute -bottom-6 -right-3 z-40 bg-[#050505]/90 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 pointer-events-none select-none"
        >
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="font-mono text-[9px] font-bold text-stone-300 uppercase tracking-widest">STABLE PORTFOLIO DIRECT</span>
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
    <div className="relative p-6 rounded-[24px] bg-[#0d0d12] border border-white/10/50 shadow-[8px_8px_20px_rgba(45,38,32,0.05),-8px_-8px_20px_#ffffff] overflow-hidden flex flex-col justify-between h-full min-h-[250px] transition-all duration-300 hover:border-violet-300">
      {/* Cloudy gradient background accent */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-100/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-fuchsia-100/20 rounded-full blur-xl pointer-events-none" />
      
      {/* Schematic dot blueprint pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#2d262005_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

      <div>
        {/* Spec note header */}
        <div className="flex items-center justify-between border-b border-white/10/30 pb-2.5 mb-3 font-sans text-[9px] uppercase tracking-[0.2em] text-stone-400 font-extrabold">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            PROJECT BRIEF
          </span>
          <span>DEVIL LABS</span>
        </div>

        {/* Note title */}
        <h4 className="text-stone-100 font-display font-bold text-xs sm:text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
          <span>☁️</span> {project.category || 'System Architecture'} Brief
        </h4>
        <p className="text-[11px] font-sans text-stone-300 leading-relaxed mb-4">
          "This production release showcases modern modularity, high performance, and seamless user experience tailored for {project.category} solutions."
        </p>

        {/* Miniature cloudy book schema notes */}
        <div className="bg-[#0a0a0a]/80 border border-white/10/30 rounded-xl p-3 mb-4">
          <div className="font-sans text-[10px] text-violet-400 flex items-center gap-1.5 mb-1.5 font-bold uppercase tracking-wider">
            <span>⚙️</span> TECH &amp; SECURITY SPEC:
          </div>
          <div className="font-sans text-[10px] text-stone-400 space-y-1">
            <div>• GATEWAY: High-speed edge routing</div>
            <div>• PERFORMANCE: Optimized caching &amp; instant load times</div>
            <div>• SECURITY: Fully verified production standards</div>
          </div>
        </div>
      </div>

      {/* Auto fill Action Trigger */}
      <button
        onClick={(e) => onPrefill(project.category, project.title, e)}
        className="w-full py-2.5 px-3 bg-violet-950/40 hover:bg-violet-900/60 border border-violet-500/30 hover:border-violet-400 text-violet-300 font-sans text-[10px] font-extrabold uppercase tracking-[0.18em] transition-all duration-300 rounded-xl flex items-center justify-center space-x-2 cursor-pointer select-none shadow-sm"
      >
        <span>⚡ AUTO-FILL INQUIRY FORM</span>
      </button>
    </div>
  );
};

export default function ProjectsPage({ navigate }: ProjectsPageProps) {
  const { projects: storeProjects, categories: storeCategories, industries: storeIndustries } = useDataStore();
  const [section, setSection] = useState<'demo' | 'client'>('demo');
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [telemetryMessage, setTelemetryMessage] = useState<string | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const allCategories = ["All", ...Array.from(new Set([...storeCategories, "AI", "Web", "Infrastructure"]))];
  
  // Auto-created industry list extracted dynamically from projects and taxonomies
  const extractedProjectIndustries = storeProjects.map(p => p.industry).filter(Boolean);
  const allIndustries = ["All", ...Array.from(new Set([...storeIndustries, ...extractedProjectIndustries]))];

  const clientProjectsList = storeProjects.filter(p => p.section === 'client' || (p as any).client);
  const demoProjectsList = storeProjects.filter(p => p.section === 'demo' || !(p as any).client);

  const filterProject = (p: any) => {
    const matchesCategory = activeCategory === "All" || p.domain === activeCategory || p.category === activeCategory;
    const matchesIndustry = activeIndustry === "All" || p.industry === activeIndustry;
    return matchesCategory && matchesIndustry;
  };

  const filteredClientProjects = clientProjectsList.filter(filterProject);
  const filteredDemoProjects = demoProjectsList.filter(filterProject);

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

    setTelemetryMessage(`Telemetry synchronizing: Form pre-filled with "${category}" specs!`);
    
    try {
      audioEngine.playClick();
    } catch (err) {}

    setTimeout(() => {
      openInquiryModal({
        category,
        projectTitle: title,
        inquiryType: 'demo'
      });
      setTelemetryMessage(null);
    }, 800);
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
    <div className="pt-12 sm:pt-16 lg:pt-20 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen relative overflow-hidden text-stone-100">
      
      {/* Real-time telemetry notification toast */}
      <AnimatePresence>
        {telemetryMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, info) => {
              if (Math.abs(info.offset.x) > 100) {
                setTelemetryMessage(null);
              }
            }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#050505] border border-white/10 text-stone-100 font-mono text-[11px] uppercase tracking-wider py-3 px-6 rounded-full shadow-xl flex items-center gap-2 touch-pan-y"
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
        <div className="inline-flex items-center space-x-2 text-violet-400 font-sans text-[10px] uppercase tracking-[0.3em] font-extrabold mb-6">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span>PORTFOLIO &amp; DEMOS</span>
        </div>
        <StaggeredHeading 
          text="FEATURED PROJECTS."
          className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tighter uppercase mb-6 leading-[0.95] text-stone-100"
        />
        <p className="text-stone-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore our live production demos and featured client applications. Filter by category to view detailed briefs, tech stacks, and live interactive previews.
        </p>

        {/* Primary Toggle & Auto-fill Info Row */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="inline-flex p-1 bg-[#111116] border border-white/10 rounded-full shadow-inner">
            <button
              onClick={() => handleSectionChange('demo')}
              className={`relative px-6 py-2.5 text-[10px] font-sans font-bold tracking-[0.2em] uppercase rounded-full transition-colors cursor-pointer ${section === 'demo' ? 'text-stone-100 font-black' : 'text-stone-400 hover:text-stone-100'}`}
            >
              {section === 'demo' && (
                <motion.div layoutId="work-toggle" className="absolute inset-0 bg-violet-600/80 border border-violet-400/30 rounded-full shadow-md" />
              )}
              <span className="relative z-10">Demos</span>
            </button>
            <button
              onClick={() => handleSectionChange('client')}
              className={`relative px-6 py-2.5 text-[10px] font-sans font-bold tracking-[0.2em] uppercase rounded-full transition-colors cursor-pointer ${section === 'client' ? 'text-stone-100 font-black' : 'text-stone-400 hover:text-stone-100'}`}
            >
              {section === 'client' && (
                <motion.div layoutId="work-toggle" className="absolute inset-0 bg-violet-600/80 border border-violet-400/30 rounded-full shadow-md" />
              )}
              <span className="relative z-10">Client Projects</span>
            </button>
          </div>
          
          <div className="text-[9px] font-sans tracking-widest text-violet-300 uppercase font-extrabold flex items-center gap-2 bg-violet-950/40 px-4 py-1.5 rounded-full border border-violet-500/30">
            <span>💡</span> CLICK "AUTO-FILL INQUIRY FORM" ON ANY BRIEF TO PRE-FILL YOUR CONTACT MESSAGE INSTANTLY
          </div>
        </div>

        {/* Domain Categories & Industry Filters */}
        <div className="flex flex-col items-center gap-3 w-full mt-6">
          <div className="flex flex-wrap overflow-x-auto w-full justify-start sm:justify-center items-center gap-2 scrollbar-hide px-2">
            <span className="text-[9px] font-mono text-stone-400 font-bold uppercase tracking-wider mr-1 shrink-0">CATEGORY:</span>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full font-sans text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-md border-transparent'
                    : 'bg-[#0d0d12] text-stone-300 hover:bg-[#050505] hover:text-stone-100 border-white/10 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap overflow-x-auto w-full justify-start sm:justify-center items-center gap-2 scrollbar-hide px-2">
            <span className="text-[9px] font-mono text-stone-400 font-bold uppercase tracking-wider mr-1 shrink-0">INDUSTRY:</span>
            {allIndustries.map((ind) => (
              <button
                key={ind}
                onClick={() => {
                  try { audioEngine.playClick(); } catch (e) {}
                  setActiveIndustry(ind);
                  setActiveProjectIndex(0);
                }}
                className={`whitespace-nowrap px-3.5 py-1 rounded-full font-mono text-[9px] font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                  activeIndustry === ind
                    ? 'bg-violet-950/80 border-violet-400 text-violet-200 shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                    : 'bg-[#0a0a0e] text-stone-400 hover:text-stone-200 border-white/10'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Organisation secure git note banner for Private Client page */}
      {section === 'client' && (
        <div className="max-w-4xl mx-auto mb-8 relative z-10">
          <div className="p-6 bg-violet-950/30 border border-violet-500/30 rounded-[24px] shadow-lg backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
              <div>
                <h4 className="text-stone-100 font-sans text-xs uppercase tracking-widest font-extrabold mb-1 flex items-center gap-2">
                  <Terminal size={14} className="text-violet-400" />
                  PRIVATE CLIENT PORTFOLIO
                </h4>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  Client applications are built with strict privacy and enterprise security. Explore our public GitHub organization or contact us for private project walk-throughs.
                </p>
              </div>
              <a 
                href="https://github.com/Devil-Labs/" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#050505] hover:bg-[#0a0a0a] border border-white/10 text-stone-100 font-sans text-[10px] font-bold tracking-widest uppercase transition-all shrink-0 rounded-xl shadow-md flex items-center space-x-2 cursor-pointer"
              >
                <span>GITHUB REPOSITORY</span>
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
                className="w-12 h-12 rounded-full bg-[#050505]/95 hover:bg-[#0a0a0a] border border-white/10 hover:border-violet-300 text-stone-100 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] group active:scale-95 cursor-pointer"
                aria-label="Previous Project"
              >
                <span className="transform group-hover:-translate-x-0.5 transition-transform text-lg font-bold">←</span>
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-16 z-30 hidden sm:block">
              <button
                onClick={handleNextProject}
                className="w-12 h-12 rounded-full bg-[#050505]/95 hover:bg-[#0a0a0a] border border-white/10 hover:border-violet-300 text-stone-100 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] group active:scale-95 cursor-pointer"
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
              className="w-10 h-10 rounded-full bg-[#050505]/90 border border-white/10 text-stone-100 flex items-center justify-center shadow-sm active:scale-95"
              aria-label="Previous Project"
            >
              <span>←</span>
            </button>
            <button
              onClick={handleNextProject}
              className="w-10 h-10 rounded-full bg-[#050505]/90 border border-white/10 text-stone-100 flex items-center justify-center shadow-sm active:scale-95"
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
                      <Interactive3DCard projectId={typeof project.id === 'number' ? project.id : idx + 1}>
                        <FloatingGlassBadge projectId={typeof project.id === 'number' ? project.id : idx + 1} />
                        <div className="p-4 rounded-3xl bg-[#0d0d12] border border-white/10/50 shadow-[8px_8px_30px_rgba(45,38,32,0.06),-8px_-8px_30px_#ffffff] h-full flex flex-col justify-between relative overflow-visible">
                          
                          {/* Browser Mock Frame */}
                          <div className={`w-full aspect-[4/3] bg-gradient-to-br ${project.thumbnail || 'from-violet-900 to-indigo-950'} rounded-2xl overflow-hidden relative mb-4 border border-white/10/30 transition-all duration-300 flex flex-col shadow-inner`}>
                            <div className="h-7 w-full bg-[#111]/90 border-b border-white/10/30 flex items-center px-3 space-x-1.5 shrink-0 z-20 backdrop-blur-sm">
                              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                              <div className="ml-2 px-2.5 py-0.5 rounded-md bg-white/10/40 border border-white/10/20 text-[8px] font-mono text-stone-400 truncate max-w-[200px]">
                                {(project.link || '').replace(/^https?:\/\//, '')}
                              </div>
                            </div>
                            
                            {section === 'client' ? (
                              /* Private Project Preview Lock Screen */
                              <div className="relative flex-grow w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-stone-100/30 to-stone-50/80 flex flex-col items-center justify-center p-6 text-center z-10">
                                  <Lock size={32} className="text-stone-400 mb-3" />
                                  <div className="text-stone-100 font-display font-bold text-lg uppercase tracking-wider mb-2">Development Phase</div>
                                  <div className="bg-stone-150 text-stone-300 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10/50">
                                    Private Gateway Active
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Interactive Sandbox Frame */
                              <div className="relative flex-grow w-full overflow-hidden bg-[#050505]">
                                <div className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left pointer-events-none" style={{ transform: 'scale(0.25)' }}>
                                  <iframe 
                                    src={project.link} 
                                    className="w-full h-full border-none bg-[#050505]"
                                    sandbox="allow-scripts allow-same-origin"
                                    loading="lazy"
                                    title={project.title}
                                  />
                                </div>
                                
                                {/* Hover click trigger overlay */}
                                <div className="absolute inset-0 z-10 bg-[#2d2620]/10 hover:bg-[#2d2620]/5 transition-colors duration-300 flex items-center justify-center cursor-pointer" onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}>
                                   <div className="w-12 h-12 rounded-full bg-[#050505] flex items-center justify-center shadow-md transform scale-90 hover:scale-100 transition-all duration-300">
                                     <ArrowUpRight className="text-stone-100" size={20} />
                                   </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Info block */}
                          <div className="flex-grow flex flex-col pt-2 text-left">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-stone-100 font-display font-bold text-lg leading-tight uppercase tracking-tight">
                                  {section === 'client' ? project.title : project.title.split('✦')[0].trim()}
                                </h3>
                                <p className="text-stone-400 text-xs font-mono uppercase tracking-widest mt-1">
                                  Client: {project.client || 'Internal Sandbox'}
                                </p>
                              </div>
                              {project.isPro && (
                                <div className="px-2 py-1 rounded-full text-[8px] font-mono font-bold tracking-widest uppercase bg-violet-950/60 text-violet-300 border border-violet-200 shrink-0 mt-1">
                                  PRO
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-auto pt-4 border-t border-white/10/30 flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-stone-650">
                                {(() => {
                                  const IconComp = typeof project.icon === 'function' ? project.icon : Cpu;
                                  return <IconComp size={14} className="text-violet-600" />;
                                })()}
                                <span className="text-[10px] font-mono uppercase tracking-widest">{project.tech}</span>
                              </div>
                              
                              {section === 'client' ? (
                                <div className="text-stone-400 text-[10px] font-mono uppercase tracking-wider">
                                  Encrypted Gateway
                                </div>
                              ) : (
                                <div className="flex items-center space-x-3 text-stone-400 text-xs font-medium">
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
              <div className="text-center py-24 bg-[#0d0d12] border border-white/10/50 rounded-3xl shadow-inner flex flex-col items-center justify-center p-8 w-full">
                <span className="text-3xl mb-3">📡</span>
                <p className="text-stone-400 font-mono text-xs tracking-widest uppercase">
                  No registered active deployments match this channel query.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Dashboard Pagination Deck and Out-of-the-Box Interactive Side Deck */}
        {activeProjects.length > 0 && (
          <div className="mt-12 flex flex-col items-center relative z-10 w-full">
            
            {/* Interactive Motion Cards Deck Selector */}
            <div className="w-full max-w-4xl mx-auto mb-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-extrabold text-stone-400 mb-3 text-center flex items-center justify-center gap-2">
                <Sparkles size={12} className="text-violet-400 animate-spin" />
                <span>INTERACTIVE 3D PROJECT DECK • CLICK ANY CARD TO SWITCH DEMO</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {activeProjects.map((proj, pIdx) => {
                  const isActive = activeProjectIndex === pIdx;
                  return (
                    <motion.button
                      key={proj.id}
                      whileHover={{ scale: 1.06, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        try { audioEngine.playClick(); } catch (e) {}
                        setDirection(pIdx > activeProjectIndex ? 1 : -1);
                        setActiveProjectIndex(pIdx);
                      }}
                      className={`p-2.5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-gradient-to-b from-violet-950/90 to-[#0a0a0e] border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.35)] ring-2 ring-violet-500/40'
                          : 'bg-[#0d0d12] border-white/10 opacity-70 hover:opacity-100 hover:border-violet-300/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-violet-600 text-white' : 'bg-stone-800 text-stone-400'
                        }`}>
                          0{pIdx + 1}
                        </span>
                        <span className="text-[8px] font-mono text-stone-400 truncate max-w-[60px]">
                          {proj.category || proj.domain}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-[11px] text-stone-100 leading-tight truncate uppercase mb-1">
                        {proj.title.split('✦')[0]}
                      </h3>

                      <div className="flex items-center justify-between text-[8px] font-mono text-stone-400 pt-1 border-t border-white/10">
                        <span className="truncate">{proj.industry || 'Tech'}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

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
                      : 'w-2.5 bg-white/20 hover:bg-stone-400'
                  }`} />
                </button>
              ))}
            </div>

            {/* Quick telemetry helper label */}
            <div className="mt-4 font-mono text-[9px] text-stone-400 uppercase tracking-widest flex items-center gap-2">
              <span>DEPLOYMENT 0{activeProjectIndex + 1} OF 0{activeProjects.length}</span>
              <span className="text-stone-400">•</span>
              <span>AUTO-FILL ORCHESTRATION SYNC RE-ROUTE</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

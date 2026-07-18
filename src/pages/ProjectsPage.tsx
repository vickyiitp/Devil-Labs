import IframeWithSkeleton from '../components/IframeWithSkeleton';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Lock, Terminal, Heart, Eye, Cpu, Globe, Layout, Shield, Sparkles } from 'lucide-react';
import CyberFrame from '../components/CyberFrame';
import { CLIENT_PROJECTS, DEMO_PROJECTS, CATEGORIES } from '../data/projects';
import { audioEngine } from '../lib/audio';

interface ProjectsPageProps {
  navigate: (path: string) => void;
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

  const filteredClientProjects = activeCategory === "All"
    ? CLIENT_PROJECTS
    : CLIENT_PROJECTS.filter(p => p.domain === activeCategory);

  const filteredDemoProjects = activeCategory === "All"
    ? DEMO_PROJECTS
    : DEMO_PROJECTS.filter(p => p.domain === activeCategory);

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
          }
        } else if (isDemo) {
          setSection('demo');
          const proj = DEMO_PROJECTS.find(p => p.id === projId);
          if (proj && proj.domain) {
            setActiveCategory(proj.domain);
          }
        }
      }
    }
  }, []);

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
        className="max-w-4xl mx-auto text-center mb-16 relative z-10"
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
          Scroll down to experience our floating organic directory. Website portals and specification briefs collide in space as you navigate our production-grade deployments.
        </p>

        {/* Primary Toggle & Auto-fill Info Row */}
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="inline-flex p-1 bg-[#f0ede6] border border-stone-200/50 rounded-full shadow-inner">
            <button
              onClick={() => setSection('demo')}
              className={`relative px-6 py-2.5 text-[10px] font-mono font-bold tracking-[0.2em] uppercase rounded-full transition-colors cursor-pointer ${section === 'demo' ? 'text-stone-850 font-black' : 'text-stone-500 hover:text-stone-850'}`}
            >
              {section === 'demo' && (
                <motion.div layoutId="work-toggle" className="absolute inset-0 bg-[#fcfbf9] border border-stone-200/30 rounded-full shadow-md" />
              )}
              <span className="relative z-10">Demos</span>
            </button>
            <button
              onClick={() => setSection('client')}
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
        <div className="flex flex-col items-center gap-4 w-full mt-10">
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

      {/* Section Content with organic alternating vertical scroll entry */}
      {section === 'client' ? (
        <motion.div
          key="client-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full space-y-16 relative z-10"
        >
          {/* Organisation secure git note banner */}
          <div className="max-w-4xl mx-auto mb-16">
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

          {/* Staggered Alternating Vertical List of Client Projects */}
          <div className="space-y-32 max-w-5xl mx-auto">
            {filteredClientProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={project.id} className="relative group/row">
                  {/* Subtle soft gradient highlight background on row hover */}
                  <div className="absolute inset-y-[-40px] inset-x-[-20px] bg-gradient-to-r from-violet-600/[0.01] to-fuchsia-600/[0.01] rounded-[40px] opacity-0 group-hover/row:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                    {/* Card Element (Floats in from left or right with gentle spring physics) */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ type: "spring", stiffness: 40, damping: 14, delay: 0.05 }}
                      className={`col-span-1 md:col-span-7 order-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                    >
                      <div className="p-4 rounded-3xl bg-[#fcfbf9] border border-stone-200/50 shadow-[8px_8px_20px_rgba(45,38,32,0.05),-8px_-8px_20px_#ffffff] hover:scale-[1.01] transition-all duration-300 h-full flex flex-col justify-between">
                        {/* Browser Mockup */}
                        <div className={`w-full aspect-[4/3] bg-gradient-to-br ${project.thumbnail} rounded-2xl overflow-hidden relative mb-4 border border-stone-200/30 transition-all duration-300 flex flex-col shadow-inner`}>
                          <div className="h-7 w-full bg-stone-100/90 border-b border-stone-200/30 flex items-center px-3 space-x-1.5 shrink-0 z-20 backdrop-blur-sm">
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                            <div className="ml-2 px-2.5 py-0.5 rounded-md bg-stone-200/40 border border-stone-200/20 text-[8px] font-mono text-stone-500 truncate max-w-[200px]">
                              {project.link.replace(/^https?:\/\//, '')}
                            </div>
                          </div>
                          
                          <div className="relative flex-grow w-full overflow-hidden bg-stone-50 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-stone-100/30 to-stone-50/80 flex flex-col items-center justify-center p-6 text-center z-10 backdrop-blur-xs">
                              <Lock size={32} className="text-stone-400 mb-3" />
                              <div className="text-stone-800 font-display font-bold text-lg uppercase tracking-wider mb-2">Development Phase</div>
                              <div className="bg-stone-150 text-stone-600 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-stone-200/50">
                                Private Gateway Active
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Info block */}
                        <div className="flex-grow flex flex-col pt-2 text-left">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-stone-850 font-display font-bold text-lg leading-tight uppercase tracking-tight">{project.title}</h3>
                              <p className="text-stone-500 text-xs font-mono uppercase tracking-widest mt-1">Client: {project.client}</p>
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
                            <div className="flex items-center space-x-3 text-stone-400 text-xs font-mono">
                               <span>Private Encryption Mode</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Creative Notebook Specification (Slides in gently from the opposite direction) */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 60 : -60, y: 30 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ type: "spring", stiffness: 40, damping: 14, delay: 0.12 }}
                      className={`col-span-1 md:col-span-5 order-2 ${isEven ? 'md:order-2' : 'md:order-1'}`}
                    >
                      <CloudyBlueprintNote project={project} onPrefill={handlePrefillContact} />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredClientProjects.length === 0 && (
            <div className="py-20 text-center border border-stone-200/50 bg-[#fcfbf9] rounded-3xl mt-8 shadow-inner">
              <p className="text-stone-500 font-mono text-sm tracking-widest uppercase">No deployments found for this domain.</p>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="demo-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full relative z-10"
        >
          {/* Staggered Alternating Vertical List of Demo Projects */}
          <div className="space-y-32 max-w-5xl mx-auto">
            {filteredDemoProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={project.id} className="relative group/row">
                  {/* Subtle soft gradient highlight background on row hover */}
                  <div className="absolute inset-y-[-40px] inset-x-[-20px] bg-gradient-to-r from-violet-600/[0.01] to-fuchsia-600/[0.01] rounded-[40px] opacity-0 group-hover/row:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                    {/* Card Element (Floats in gently with spring physics) */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ type: "spring", stiffness: 40, damping: 14, delay: 0.05 }}
                      className={`col-span-1 md:col-span-7 order-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                    >
                      <div className="p-4 rounded-3xl bg-[#fcfbf9] border border-stone-200/50 shadow-[8px_8px_20px_rgba(45,38,32,0.05),-8px_-8px_20px_#ffffff] h-full flex flex-col hover:scale-[1.01] transition-all duration-300">
                        {/* Browser Frame */}
                        <div className={`w-full aspect-[4/3] bg-gradient-to-br ${project.thumbnail} rounded-2xl overflow-hidden relative mb-4 border border-stone-200/30 transition-all duration-300 flex flex-col shadow-inner`}>
                          <div className="h-7 w-full bg-stone-100/90 border-b border-stone-200/30 flex items-center px-3 space-x-1.5 shrink-0 z-20 backdrop-blur-sm">
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                            <div className="ml-2 px-2.5 py-0.5 rounded-md bg-stone-200/40 border border-stone-200/20 text-[8px] font-mono text-stone-500 truncate max-w-[200px]">
                              {project.link.replace(/^https?:\/\//, '')}
                            </div>
                          </div>
                          
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
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 z-10 bg-[#2d2620]/10 hover:bg-[#2d2620]/5 transition-colors duration-300 flex items-center justify-center cursor-pointer" onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}>
                               <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transform scale-90 hover:scale-100 transition-all duration-300">
                                 <ArrowUpRight className="text-stone-800" size={20} />
                               </div>
                            </div>
                          </div>
                        </div>

                        {/* Info & Telemetry indicators */}
                        <div className="flex items-start justify-between px-1 mt-auto text-left">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-xl bg-stone-100 border border-stone-200/50 flex items-center justify-center">
                              <project.icon size={16} className="text-stone-600" />
                            </div>
                            <div>
                              <h4 className="text-stone-850 text-sm font-bold tracking-tight">{project.title.split('✦')[0].trim()}</h4>
                              <div className="flex items-center space-x-2 mt-0.5">
                                <span className="text-stone-500 text-xs">{project.tech}</span>
                                {project.isPro && (
                                  <span className="px-1.5 py-0.5 bg-violet-50 text-violet-700 text-[8px] font-bold tracking-wider rounded-full uppercase border border-violet-100">PRO</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-stone-500 text-xs font-medium">
                            <div className="flex items-center space-x-1 hover:text-pink-600 transition-colors cursor-pointer">
                              <Heart size={14} />
                              <span>{project.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer">
                              <Eye size={14} />
                              <span>{project.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Staged Cloudy Blueprint Notebook note (Slides in gently from the opposite direction) */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 60 : -60, y: 30 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ type: "spring", stiffness: 40, damping: 14, delay: 0.12 }}
                      className={`col-span-1 md:col-span-5 order-2 ${isEven ? 'md:order-2' : 'md:order-1'}`}
                    >
                      <CloudyBlueprintNote project={project} onPrefill={handlePrefillContact} />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDemoProjects.length === 0 && (
            <div className="py-20 text-center border border-stone-200/50 bg-[#fcfbf9] rounded-3xl mt-8 shadow-inner">
              <p className="text-stone-500 font-mono text-sm tracking-widest uppercase">No deployments found for this domain.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

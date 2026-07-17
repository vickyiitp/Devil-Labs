import React, { useState } from 'react';
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

export default function ProjectGallery({ navigate }: ProjectGalleryProps = {}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [telemetryMessage, setTelemetryMessage] = useState<string | null>(null);

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  // Context-aware category handler to sync with Contact form state
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    
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
          Scroll down to inspect our deployments. Experience high-velocity sandboxes and detailed architecture blueprints crafted with fluid, organic motion.
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

      {/* Alternating Vertical Project list with floating scroll animations */}
      <div className="space-y-32 max-w-5xl mx-auto relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={project.id} className="relative group/row">
                {/* Subtle soft gradient highlight background on row hover */}
                <div className="absolute inset-y-[-40px] inset-x-[-20px] bg-gradient-to-r from-violet-600/[0.01] to-fuchsia-600/[0.01] rounded-[40px] opacity-0 group-hover/row:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
                  {/* Browser Frame Column (Slides/fades in gently from left/right) */}
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ type: "spring", stiffness: 40, damping: 14, delay: 0.05 }}
                    className={`col-span-1 md:col-span-7 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                  >
                    <CyberFrame glowColor={['violet', 'fuchsia', 'blue'][project.id % 3] as 'violet' | 'fuchsia' | 'blue'} className="p-4 rounded-xl cursor-default bg-[#090909]/40 backdrop-blur-md h-full flex flex-col hover:scale-[1.01] transition-all duration-300 hover:border-white/10">
                      {/* Live Sandbox preview mock */}
                      <div className="w-full aspect-[4/3] bg-gradient-to-br from-violet-900/30 to-black rounded-lg overflow-hidden relative mb-4 border border-white/5 flex flex-col">
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

                      {/* Metadata */}
                      <div className="flex items-start justify-between px-1 mt-auto">
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
                  </motion.div>

                  {/* Handdrawn Notebook Spec Attachment Column (Slides/fades in gently from opposite direction) */}
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: isEven ? 60 : -60, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ type: "spring", stiffness: 40, damping: 14, delay: 0.12 }}
                    className={`col-span-1 md:col-span-5 ${isEven ? 'md:order-2' : 'md:order-1'}`}
                  >
                    <CloudyBlueprintNote project={project} onPrefill={handlePrefillContact} />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </AnimatePresence>
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

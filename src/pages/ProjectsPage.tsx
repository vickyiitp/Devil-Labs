import IframeWithSkeleton from '../components/IframeWithSkeleton';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Cpu, Layout, Globe, Lock, BrainCircuit, GraduationCap, Building2, Terminal, Code2, Heart, Eye } from 'lucide-react';
import CyberFrame from '../components/CyberFrame';

interface ProjectsPageProps {
  navigate: (path: string) => void;
}

const CLIENT_PROJECTS = [
  {
    id: 101,
    domain: "Web",
    title: 'Nexus // Enterprise CRM',
    client: 'Confidential (FinTech)',
    category: 'SaaS & Business',
    isPro: true,
    thumbnail: 'from-violet-900/40 to-black',
    icon: Building2,
    tech: 'React / Node',
    link: 'https://nexus-crm-dev.client.app',
    inDevelopment: true
  },
  {
    id: 102,
    domain: "AI",
    title: 'Aura // Health Portal',
    client: 'Confidential (Healthcare)',
    category: 'AI & Automation',
    isPro: true,
    thumbnail: 'from-emerald-900/40 to-black',
    icon: Heart,
    tech: 'AI / HIPAA',
    link: 'https://aura-portal.client.app',
    inDevelopment: true
  },
  {
    id: 103,
    domain: "Infrastructure",
    title: 'Vanguard // Analytics',
    client: 'Confidential (Logistics)',
    category: 'SaaS & Business',
    isPro: true,
    thumbnail: 'from-fuchsia-900/40 to-black',
    icon: BrainCircuit,
    tech: 'Data / Dashboards',
    link: 'https://vanguard-analytics.client.app',
    inDevelopment: true
  }
];

const DEMO_PROJECTS = [
  // AI & Automation
  {
    id: 1,
    domain: "AI",
    title: 'GeniusMVA // AI Analytics',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '842',
    views: '15k',
    isPro: true,
    thumbnail: 'from-fuchsia-900/40 to-black',
    icon: BrainCircuit,
    tech: 'AI / Vision',
    link: 'https://geniusmva.web.app/'
  },
  {
    id: 2,
    domain: "AI",
    title: 'ThreadGenius // AI Content',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '621',
    views: '9.2k',
    isPro: true,
    thumbnail: 'from-violet-900/40 to-black',
    icon: Cpu,
    tech: 'OpenAI / Social',
    link: 'https://threadgenius-8f84w.web.app/'
  },
  {
    id: 3,
    domain: "AI",
    title: 'SkillSculpt AI // Learning',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '459',
    views: '7.8k',
    isPro: true,
    thumbnail: 'from-blue-900/40 to-black',
    icon: GraduationCap,
    tech: 'AI / EdTech',
    link: 'https://skillsculpt-ai-7hilu.web.app/'
  },
  {
    id: 4,
    domain: "AI",
    title: 'DevilFintech AI // FinTech Advisor',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '312',
    views: '5k',
    isPro: false,
    thumbnail: 'from-emerald-900/40 to-black',
    icon: BrainCircuit,
    tech: 'Chatbot / AI',
    link: 'https://devilfintech-ai.vercel.app'
  },
  {
    id: 5,
    domain: "AI",
    title: 'NoDepression AI // Wellness',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '891',
    views: '12.4k',
    isPro: true,
    thumbnail: 'from-sky-900/40 to-black',
    icon: Heart,
    tech: 'HealthTech / AI',
    link: 'https://no-depression-ai.vercel.app'
  },
  {
    id: 6,
    domain: "AI",
    title: 'Resume AI // Builder',
    client: 'Demo',
    category: 'AI & Automation',
    likes: '1.2k',
    views: '22k',
    isPro: true,
    thumbnail: 'from-violet-900/40 to-black',
    icon: Code2,
    tech: 'AI / PDF',
    link: 'https://resume-vickyiitp.vercel.app'
  },

  // EdTech & Learning
  {
    id: 7,
    domain: "Web",
    title: 'Quiz App // Interactive',
    client: 'Demo',
    category: 'EdTech & Learning',
    likes: '234',
    views: '3.1k',
    isPro: false,
    thumbnail: 'from-yellow-900/40 to-black',
    icon: GraduationCap,
    tech: 'Education / Web',
    link: 'https://quiz-app-client-plum.vercel.app/'
  },
  {
    id: 8,
    domain: "Web",
    title: 'EduStream // Classes App',
    client: 'Demo',
    category: 'EdTech & Learning',
    likes: '645',
    views: '8.4k',
    isPro: true,
    thumbnail: 'from-orange-900/40 to-black',
    icon: Globe,
    tech: 'Streaming / LMS',
    link: 'https://edu-stream-classes-app-for-cochin.vercel.app'
  },
  {
    id: 9,
    domain: "Web",
    title: 'Cosmic Genesis // EdArt',
    client: 'Demo',
    category: 'EdTech & Learning',
    likes: '912',
    views: '14k',
    isPro: true,
    thumbnail: 'from-purple-900/40 to-black',
    icon: Layout,
    tech: 'Art / Code',
    link: 'https://cosmic-genesis.vercel.app'
  },
  {
    id: 10,
    title: 'TypeX // Typing AI',
    client: 'Demo',
    category: 'EdTech & Learning',
    likes: '456',
    views: '6.2k',
    isPro: false,
    thumbnail: 'from-slate-900/40 to-black',
    icon: Terminal,
    tech: 'Typing / Utility',
    link: 'https://typexvickyiitp.netlify.app/'
  },

  // SaaS & Business
  {
    id: 11,
    domain: "Web",
    title: 'Hisaab // Payments',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '534',
    views: '9k',
    isPro: true,
    thumbnail: 'from-green-900/40 to-black',
    icon: Layout,
    tech: 'SaaS / WhatsApp',
    link: 'https://hisaab-lac.vercel.app'
  },
  {
    id: 12,
    domain: "Web",
    title: 'Invoice Flow // Automation',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '213',
    views: '4k',
    isPro: false,
    thumbnail: 'from-blue-900/40 to-black',
    icon: Globe,
    tech: 'Invoicing / B2B',
    link: 'https://invoice-flow-automation-tool.vercel.app'
  },
  {
    id: 13,
    domain: "Web",
    title: 'ShivaTri // Startups',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '432',
    views: '6.8k',
    isPro: true,
    thumbnail: 'from-red-900/40 to-black',
    icon: Building2,
    tech: 'Legal / Utility',
    link: 'https://shiva-tri.vercel.app'
  },
  {
    id: 14,
    domain: "Web",
    title: 'Bio-Hub // Linktree',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '654',
    views: '11k',
    isPro: false,
    thumbnail: 'from-pink-900/40 to-black',
    icon: Globe,
    tech: 'Social / Links',
    link: 'https://bio-hub-demo.vercel.app'
  },
  {
    id: 15,
    domain: "Infrastructure",
    title: 'DevScript // Tool Hub',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '1.5k',
    views: '30k',
    isPro: true,
    thumbnail: 'from-zinc-900/40 to-black',
    icon: Terminal,
    tech: 'PWA / DevTools',
    link: 'https://dev-script-two.vercel.app'
  },
  {
    id: 16,
    domain: "Web",
    title: 'QR Menu Generator // Tools',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '342',
    views: '5k',
    isPro: false,
    thumbnail: 'from-gray-900/40 to-black',
    icon: Layout,
    tech: 'QR / Utility',
    link: 'https://qr-menu-generator-demo.vercel.app'
  },
  {
    id: 17,
    domain: "Web",
    title: 'Developer Portfolio // Portfolio',
    client: 'Demo',
    category: 'SaaS & Business',
    likes: '821',
    views: '13k',
    isPro: true,
    thumbnail: 'from-indigo-900/40 to-black',
    icon: Code2,
    tech: 'Portfolio / Web',
    link: 'https://developer-portfolio-bpgc.vercel.app'
  },

  // Real Estate & Agency
  {
    id: 18,
    domain: "Web",
    title: 'Prop View // Real Estate',
    client: 'Demo',
    category: 'Real Estate & Agency',
    likes: '512',
    views: '7.4k',
    isPro: true,
    thumbnail: 'from-rose-900/40 to-black',
    icon: Building2,
    tech: 'Real Estate / UI',
    link: 'https://prop-view-demo.vercel.app'
  },
  {
    id: 19,
    domain: "Web",
    title: 'Menu Craft // Hospitality',
    client: 'Demo',
    category: 'Real Estate & Agency',
    likes: '289',
    views: '4.5k',
    isPro: false,
    thumbnail: 'from-orange-900/40 to-black',
    icon: Layout,
    tech: 'Hospitality / Book',
    link: 'https://menu-craft-demo.vercel.app'
  },
  {
    id: 20,
    domain: "Web",
    title: 'Kishan Farm // E-Commerce',
    client: 'Demo',
    category: 'Real Estate & Agency',
    likes: '621',
    views: '10k',
    isPro: true,
    thumbnail: 'from-green-900/40 to-black',
    icon: Globe,
    tech: 'AgriTech / Web',
    link: 'https://kishan-farm.vercel.app'
  },
  {
    id: 21,
    domain: "Web",
    title: 'Fit Launch // Agency',
    client: 'Demo',
    category: 'Real Estate & Agency',
    likes: '445',
    views: '8.1k',
    isPro: false,
    thumbnail: 'from-blue-900/40 to-black',
    icon: Layout,
    tech: 'Fitness / Landing',
    link: 'https://fit-launch-demo.vercel.app'
  },
  {
    id: 22,
    domain: "Web",
    title: 'Indigo Lens // 3D Agency',
    client: 'Demo',
    category: 'Real Estate & Agency',
    likes: '891',
    views: '16k',
    isPro: true,
    thumbnail: 'from-violet-900/40 to-black',
    icon: Globe,
    tech: '3D / WebGL',
    link: 'https://indigolens-demo.netlify.app/'
  },

  // Utilities & Games
  {
    id: 23,
    domain: "Web",
    title: 'MindSpark Hub // Games',
    client: 'Demo',
    category: 'Utilities & Games',
    likes: '743',
    views: '12k',
    isPro: false,
    thumbnail: 'from-cyan-900/40 to-black',
    icon: Code2,
    tech: 'Gaming / JS',
    link: 'https://mindsparkhub-vickyiitp.netlify.app/'
  },
  {
    id: 24,
    domain: "Web",
    title: 'Timer & Stopwatch // Tool',
    client: 'Demo',
    category: 'Utilities & Games',
    likes: '122',
    views: '2k',
    isPro: false,
    thumbnail: 'from-gray-900/40 to-black',
    icon: Terminal,
    tech: 'Utility / Clock',
    link: 'https://timer-stopwatch-vickyiitp.netlify.app/'
  },
  {
    id: 25,
    domain: "Infrastructure",
    title: 'RapidGrab Video // Download',
    client: 'Demo',
    category: 'Utilities & Games',
    likes: '534',
    views: '9.3k',
    isPro: true,
    thumbnail: 'from-red-900/40 to-black',
    icon: Globe,
    tech: 'Media / Downloader',
    link: 'https://rapidgrab.onrender.com/'
  },
  {
    id: 26,
    domain: "Web",
    title: 'Valentine Day Gift // Fun',
    client: 'Demo',
    category: 'Utilities & Games',
    likes: '892',
    views: '18k',
    isPro: false,
    thumbnail: 'from-pink-900/40 to-black',
    icon: Heart,
    tech: 'Interactive / Fun',
    link: 'https://valentine-day-gift-inky.vercel.app'
  }
];

const CATEGORIES = [
  "All",
  "AI",
  "Web",
  "Infrastructure"
];

export default function ProjectsPage({ navigate }: ProjectsPageProps) {
  const [section, setSection] = useState<'demo' | 'client'>('demo');
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredClientProjects = activeCategory === "All"
    ? CLIENT_PROJECTS
    : CLIENT_PROJECTS.filter(p => p.domain === activeCategory);

  const filteredDemoProjects = activeCategory === "All"
    ? DEMO_PROJECTS
    : DEMO_PROJECTS.filter(p => p.domain === activeCategory);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto min-h-screen">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <div className="inline-flex items-center space-x-2 text-violet-500 font-mono text-xs uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span>PORTFOLIO DIRECTORY</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black tracking-tighter uppercase mb-6">
          Deployed <br className="hidden sm:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 glitch" data-text="Architectures">Architectures</span>
        </h1>
        <p className="text-gray-400 font-light text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Explore our extensive matrix of live deployments. We divide our showcase into publicly accessible interactive demos and highly secure client architectures.
        </p>
      </motion.div>

      {/* Primary Toggle: Demo vs Client */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-black/40 border border-white/10 rounded-full">
          <button
            onClick={() => setSection('demo')}
            className={`relative px-8 py-3 text-xs font-mono font-bold tracking-widest uppercase rounded-full transition-colors ${section === 'demo' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
          >
            {section === 'demo' && (
              <motion.div layoutId="work-toggle" className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-inner" />
            )}
            <span className="relative z-10">Demo Projects</span>
          </button>
          <button
            onClick={() => setSection('client')}
            className={`relative px-8 py-3 text-xs font-mono font-bold tracking-widest uppercase rounded-full transition-colors ${section === 'client' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
          >
            {section === 'client' && (
              <motion.div layoutId="work-toggle" className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-inner" />
            )}
            <span className="relative z-10">Client Projects</span>
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-col items-center gap-4 w-full max-w-full overflow-hidden mb-12">
        <span className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
          Filter By Domain
        </span>
        <div className="flex sm:flex-wrap overflow-x-auto w-full justify-start sm:justify-center items-center gap-2 pb-2 scrollbar-hide px-4 sm:px-0">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-mono text-[11px] font-bold tracking-wider uppercase transition-all duration-300 border ${
                activeCategory === category
                  ? 'bg-violet-600 text-white shadow-neon-violet border-violet-500'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {section === 'client' ? (
        <motion.div
          key="client-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
        >
          {/* GitHub Upload Hub Note banner */}
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <CyberFrame glowColor="violet" className="p-6 bg-violet-950/10 rounded-xl border border-violet-500/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div>
                  <h4 className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-1 flex items-center gap-2">
                    <Terminal size={14} className="text-violet-400" />
                    SECURE REPOSITORY HUB
                  </h4>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    All active client systems and source-controlled projects are securely pushed, cataloged, and integrated through our official organization. We grant full private repository ownership and automated deployment logs directly to client teams.
                  </p>
                </div>
                <a 
                  href="https://github.com/Devil-Labs/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold tracking-widest uppercase transition-all shrink-0 rounded border border-violet-400 shadow-neon-violet flex items-center space-x-2"
                >
                  <span>EXPLORE GITHUB</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </CyberFrame>
          </div>

          {/* Project Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredClientProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="group cursor-default h-full relative"
                >
                  <CyberFrame glowColor={['violet', 'fuchsia', 'blue'][project.id % 3] as 'violet' | 'fuchsia' | 'blue'} className="p-4 rounded-xl cursor-default bg-black/40 h-full flex flex-col opacity-75">
                    {/* Thumbnail / Live Preview */}
                    <div className={`w-full aspect-[4/3] bg-gradient-to-br ${project.thumbnail} rounded-lg overflow-hidden relative mb-4 border border-white/5 transition-all duration-300 flex flex-col`}>
                      {/* Browser Header */}
                      <div className="h-6 w-full bg-black/60 border-b border-white/10 flex items-center px-3 space-x-1.5 shrink-0 z-20 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-red-500/80" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <div className="w-2 h-2 rounded-full bg-green-500/80" />
                        <div className="ml-2 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[8px] font-mono text-gray-400 truncate max-w-[200px]">
                          {project.link.replace(/^https?:\/\//, '')}
                        </div>
                      </div>
                      
                      {/* Browser Content - Placeholder since it's in development */}
                      <div className="relative flex-grow w-full overflow-hidden bg-[#050505] flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-black/80 flex flex-col items-center justify-center p-6 text-center z-10 backdrop-blur-sm">
                            <Lock size={32} className="text-violet-500/50 mb-3" />
                            <div className="text-white font-display font-bold text-lg uppercase tracking-wider mb-2">Development Phase</div>
                            <div className="bg-violet-600/20 text-violet-400 px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border border-violet-500/30">
                              Coming Soon
                            </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex-grow flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-display font-bold text-lg leading-tight uppercase tracking-tight">{project.title}</h3>
                          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mt-1">Client: {project.client}</p>
                        </div>
                        {project.isPro && (
                          <div className="px-2 py-1 rounded text-[8px] font-mono font-bold tracking-widest uppercase bg-violet-600/20 text-violet-400 border border-violet-500/20 shrink-0 mt-1">
                            PRO
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <project.icon size={14} className="text-violet-500" />
                          <span className="text-[10px] font-mono uppercase tracking-widest">{project.tech}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-500 text-xs font-mono">
                           <span>Private Repo</span>
                        </div>
                      </div>
                    </div>
                  </CyberFrame>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredClientProjects.length === 0 && (
            <div className="py-20 text-center border border-white/10 bg-black/40 rounded-xl mt-8">
              <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">No deployments found for this domain.</p>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="demo-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full"
        >
          {/* Project Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredDemoProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="group cursor-pointer h-full"
                  onClick={() => {
                    if (project.link) {
                      window.open(project.link, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <CyberFrame glowColor={['violet', 'fuchsia', 'blue'][project.id % 3] as 'violet' | 'fuchsia' | 'blue'} className="p-4 rounded-xl cursor-pointer bg-black/40 h-full flex flex-col">
                    {/* Thumbnail / Live Preview */}
                    <div className={`w-full aspect-[4/3] bg-gradient-to-br ${project.thumbnail} rounded-lg overflow-hidden relative mb-4 border border-white/5 transition-all duration-300 flex flex-col`}>
                      {/* Browser Header */}
                      <div className="h-6 w-full bg-black/60 border-b border-white/10 flex items-center px-3 space-x-1.5 shrink-0 z-20 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-red-500/80" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <div className="w-2 h-2 rounded-full bg-green-500/80" />
                        <div className="ml-2 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[8px] font-mono text-gray-400 truncate max-w-[200px]">
                          {project.link.replace(/^https?:\/\//, '')}
                        </div>
                      </div>
                      
                      {/* Browser Content */}
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
                        
                        {/* Overlay to catch clicks and prevent iframe interaction while scrolling/hovering */}
                        <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                           {/* Hover Effect CTA */}
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0">
                             <ArrowUpRight className="text-black" size={20} />
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-start justify-between px-1 mt-auto">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-[#111] border border-white/10 flex items-center justify-center">
                          <project.icon size={16} className="text-white/70" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-bold tracking-tight">{project.title.split('//')[0]}</h4>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className="text-gray-400 text-xs">{project.tech}</span>
                            {project.isPro && (
                              <span className="px-1 py-0.5 bg-violet-500/20 text-violet-400 text-[8px] font-bold tracking-wider rounded uppercase">PRO</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-gray-500 text-xs font-medium">
                        <div className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                          <Heart size={14} />
                          <span>{project.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                          <Eye size={14} />
                          <span>{project.views}</span>
                        </div>
                      </div>
                    </div>
                  </CyberFrame>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredDemoProjects.length === 0 && (
            <div className="py-20 text-center border border-white/10 bg-black/40 rounded-xl mt-8">
              <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">No deployments found for this domain.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

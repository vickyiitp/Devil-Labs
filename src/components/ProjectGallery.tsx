import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Eye, ArrowUpRight, Cpu, Layout, Server, Database, Code, Globe, Shield } from 'lucide-react';
import CyberFrame from './CyberFrame';

const categories = [
  'All',
  'AI Agents',
  'Web Architecture',
  'SaaS Platforms',
  'Landing Pages',
  'Enterprise Systems',
  'E-Commerce',
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
  },
  {
    id: 7,
    title: 'ANTIGRAVITY OS // AI Social Automation',
    client: 'Open Source',
    category: 'AI Agents',
    likes: '142',
    views: '4.2k',
    isPro: true,
    thumbnail: 'from-red-900/40 to-black',
    icon: Cpu,
    tech: 'Python / AI Models',
    link: 'https://github.com/vickyiitp/Antigravity-OS'
  },
  {
    id: 8,
    title: 'LEARN & TRACK // Education Platform',
    client: 'Open Source',
    category: 'SaaS Platforms',
    likes: '94',
    views: '2.8k',
    isPro: false,
    thumbnail: 'from-cyan-900/40 to-black',
    icon: Server,
    tech: 'Full Stack',
    link: 'https://github.com/vickyiitp/FreeLearningand-Tracking-system-'
  }
];

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <div className="w-full">
      {/* Header & Filters */}
      <div className="mb-12 flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight mb-4 max-w-3xl">
          Work with the world's best in <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Autonomous Intelligence</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-10">
          Generate your brief and receive enterprise-grade architecture proposals. Hire top-rated engineers with confidence.
        </p>
        
        <div className="flex flex-col items-center gap-6 w-full max-w-full overflow-hidden">
          <span className="text-gray-500 font-mono text-xs uppercase tracking-widest font-bold">
            What are you looking for?
          </span>
          <div className="flex sm:flex-wrap overflow-x-auto w-full justify-start sm:justify-center items-center gap-2 pb-4 scrollbar-hide px-4 sm:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className="group cursor-pointer"
              onClick={() => {
                if (project.link) {
                  window.open(project.link, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <CyberFrame glowColor={['violet', 'fuchsia', 'blue'][project.id % 3] as 'violet' | 'fuchsia' | 'blue'} className="p-4 rounded-xl cursor-pointer bg-black/40">
                {/* Thumbnail / Live Preview */}
                <div className={`w-full aspect-[4/3] bg-gradient-to-br ${project.thumbnail} rounded-lg overflow-hidden relative mb-4 border border-white/5 transition-all duration-300 flex flex-col`}>
                  {/* Browser Header */}
                  <div className="h-6 w-full bg-black/60 border-b border-white/10 flex items-center px-3 space-x-1.5 shrink-0 z-20 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 rounded-full bg-green-500/80" />
                    <div className="ml-2 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[8px] font-mono text-gray-400 truncate max-w-[120px]">
                      {project.link ? project.link.replace(/^https?:\/\//, '') : 'localhost:3000'}
                    </div>
                  </div>
                  
                  {/* Browser Content */}
                  <div className="relative flex-grow w-full overflow-hidden bg-[#050505]">
                    {project.link && project.link.startsWith('http') ? (
                      <div 
                        className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left pointer-events-none"
                        style={{ transform: 'scale(0.25)' }}
                      >
                        <iframe 
                          src={project.link} 
                          className="w-full h-full border-none bg-white"
                          sandbox="allow-scripts allow-same-origin"
                          loading="lazy"
                          title={project.title}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px]" />
                        <div className="absolute inset-0 flex items-center justify-center flex-col p-6 text-center">
                          <project.icon className="text-white/20 mb-4 group-hover:scale-110 group-hover:text-violet-400 transition-all duration-500" size={48} />
                          <h3 className="font-display font-black text-xl text-white/50 group-hover:text-white transition-colors duration-300 tracking-tight leading-tight uppercase max-w-[80%]">
                            {project.title.split('//')[0]}
                          </h3>
                        </div>
                      </>
                    )}
                    
                    {/* Overlay to catch clicks and prevent iframe interaction while scrolling/hovering */}
                    <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                       {/* Overlay on hover */}
                       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0">
                         <ArrowUpRight className="text-black" size={20} />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-start justify-between px-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded bg-[#111] border border-white/10 flex items-center justify-center">
                      <span className="font-display font-black text-[10px] text-white">DL</span>
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold tracking-tight">{project.title.split('//')[1] || project.title}</h4>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <span className="text-gray-400 text-xs hover:text-violet-400 transition-colors">{project.client}</span>
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
                    <div className="flex items-center space-x-1">
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

      {/* Load More CTA */}
      <div className="mt-16 text-center">
        <button className="px-6 py-3 bg-white/5 border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors rounded-full">
          Load More Architectures
        </button>
      </div>
    </div>
  );
}

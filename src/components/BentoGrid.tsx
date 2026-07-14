import { motion } from 'motion/react';
import { ArrowUpRight, Cpu, Sparkles, Server, Zap, Globe, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  stat: string;
  statLabel: string;
  icon: any;
  color: string;
}

export default function BentoGrid({ onNavigateContact }: { onNavigateContact: () => void }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: '01',
      title: 'AETHER CORE',
      subtitle: 'AUTONOMOUS AI AGENT',
      description: 'An orchestration framework that coordinates five parallel LLM agents to monitor, report, and correct performance lags in enterprise multi-region databases.',
      tags: ['LLM Orchestration', 'PostgreSQL', 'LangChain'],
      stat: '99.4%',
      statLabel: 'ACCURACY SCORE',
      icon: Cpu,
      color: 'from-violet-600/20 to-purple-800/10',
    },
    {
      id: '02',
      title: 'KRYPTON PRO',
      subtitle: 'TELEMETRY DASHBOARD',
      description: 'A low-latency dashboard for web infrastructure. Consolidates distributed telemetry logs into a singular websocket pipeline with real-time alerting.',
      tags: ['React', 'WebSocket', 'Tailwind', 'Rust'],
      stat: '4.2ms',
      statLabel: 'AVG LATENCY',
      icon: Server,
      color: 'from-blue-600/20 to-indigo-800/10',
    },
    {
      id: '03',
      title: 'SYNTHESIS v2',
      subtitle: 'PROGRAMMATIC CREATIVE ENGINE',
      description: 'Algorithmic media pipeline designed to synthesize custom vector assets and promotional videos based on brand guidelines and weekly trends.',
      tags: ['Generative AI', 'Node.js', 'Stable Diffusion'],
      stat: '35x',
      statLabel: 'PRODUCTION SPEED',
      icon: Sparkles,
      color: 'from-fuchsia-600/20 to-rose-800/10',
    },
    {
      id: '04',
      title: 'VESPER CHAT',
      subtitle: 'WHATSAPP API AGENT',
      description: 'Custom AI conversational intake system engineered with programmatic dispatch. Fully handles and filters enterprise leads dynamically in real time.',
      tags: ['WhatsApp Business', 'FastAPI', 'Vector Search'],
      stat: '12k',
      statLabel: 'LEADS PROCESSED',
      icon: MessageSquare,
      color: 'from-emerald-600/20 to-teal-800/10',
    },
  ];

  return (
    <div id="bento-box-grid-root" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Box 1: Aether Core (Takes 2 columns on desktop) */}
      <motion.div
        id="bento-card-aether"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="md:col-span-2 relative overflow-hidden bg-black/60 border border-white/5 p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-violet-500/50"
        onMouseEnter={() => setActiveId('01')}
        onMouseLeave={() => setActiveId(null)}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-600/10 to-transparent pointer-events-none rounded-full blur-3xl group-hover:from-violet-600/20 transition-all duration-500" />
        
        <div className="flex justify-between items-start">
          <div className="space-y-1 font-mono">
            <span className="text-[10px] tracking-widest text-violet-400 font-semibold uppercase">{projects[0].subtitle}</span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">{projects[0].title}</h3>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 group-hover:border-violet-500 group-hover:bg-violet-500/10 transition-colors duration-300">
            <Cpu className="text-gray-400 group-hover:text-violet-400 transition-colors duration-300" size={20} />
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-6 mb-8 leading-relaxed max-w-xl">
          {projects[0].description}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/5 pt-6">
          <div className="flex flex-wrap gap-2">
            {projects[0].tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 uppercase">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-right font-mono">
            <div className="text-3xl font-extrabold text-white tracking-tighter">{projects[0].stat}</div>
            <div className="text-[9px] text-gray-500 tracking-wider">{projects[0].statLabel}</div>
          </div>
        </div>
      </motion.div>

      {/* Box 2: Krypton Pro (1 column) */}
      <motion.div
        id="bento-card-krypton"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden bg-black/60 border border-white/5 p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-blue-500/50"
        onMouseEnter={() => setActiveId('02')}
        onMouseLeave={() => setActiveId(null)}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-600/10 to-transparent pointer-events-none rounded-full blur-2xl group-hover:from-blue-600/20 transition-all duration-500" />
        
        <div className="flex justify-between items-start">
          <div className="space-y-1 font-mono">
            <span className="text-[10px] tracking-widest text-blue-400 font-semibold uppercase">{projects[1].subtitle}</span>
            <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">{projects[1].title}</h3>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-colors duration-300">
            <Server className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" size={20} />
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-6 mb-8 leading-relaxed">
          {projects[1].description}
        </p>

        <div className="flex items-end justify-between border-t border-white/5 pt-6 font-mono">
          <div className="flex flex-wrap gap-2 max-w-[150px]">
            {projects[1].tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] text-gray-400 uppercase">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-white tracking-tighter">{projects[1].stat}</div>
            <div className="text-[9px] text-gray-500 tracking-wider">{projects[1].statLabel}</div>
          </div>
        </div>
      </motion.div>

      {/* Box 3: Synthesis v2 (1 column) */}
      <motion.div
        id="bento-card-synthesis"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden bg-black/60 border border-white/5 p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-fuchsia-500/50"
        onMouseEnter={() => setActiveId('03')}
        onMouseLeave={() => setActiveId(null)}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-fuchsia-600/10 to-transparent pointer-events-none rounded-full blur-2xl group-hover:from-fuchsia-600/20 transition-all duration-500" />
        
        <div className="flex justify-between items-start">
          <div className="space-y-1 font-mono">
            <span className="text-[10px] tracking-widest text-fuchsia-400 font-semibold uppercase">{projects[2].subtitle}</span>
            <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">{projects[2].title}</h3>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 group-hover:border-fuchsia-500 group-hover:bg-fuchsia-500/10 transition-colors duration-300">
            <Sparkles className="text-gray-400 group-hover:text-fuchsia-400 transition-colors duration-300" size={20} />
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-6 mb-8 leading-relaxed">
          {projects[2].description}
        </p>

        <div className="flex items-end justify-between border-t border-white/5 pt-6 font-mono">
          <div className="flex flex-wrap gap-2 max-w-[150px]">
            {projects[2].tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] text-gray-400 uppercase">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-white tracking-tighter">{projects[2].stat}</div>
            <div className="text-[9px] text-gray-500 tracking-wider">{projects[2].statLabel}</div>
          </div>
        </div>
      </motion.div>

      {/* Box 4: Vesper Chat (Takes 2 columns on desktop) */}
      <motion.div
        id="bento-card-vesper"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="md:col-span-2 relative overflow-hidden bg-black/60 border border-white/5 p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-emerald-500/50"
        onMouseEnter={() => setActiveId('04')}
        onMouseLeave={() => setActiveId(null)}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-600/10 to-transparent pointer-events-none rounded-full blur-3xl group-hover:from-emerald-600/20 transition-all duration-500" />
        
        <div className="flex justify-between items-start">
          <div className="space-y-1 font-mono">
            <span className="text-[10px] tracking-widest text-emerald-400 font-semibold uppercase">{projects[3].subtitle}</span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">{projects[3].title}</h3>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 group-hover:border-emerald-500 group-hover:bg-emerald-500/10 transition-colors duration-300">
            <MessageSquare className="text-gray-400 group-hover:text-emerald-400 transition-colors duration-300" size={20} />
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-6 mb-8 leading-relaxed max-w-xl">
          {projects[3].description}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/5 pt-6">
          <div className="flex flex-wrap gap-2">
            {projects[3].tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 uppercase">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-right font-mono">
            <div className="text-3xl font-extrabold text-white tracking-tighter">{projects[3].stat}</div>
            <div className="text-[9px] text-gray-500 tracking-wider">{projects[3].statLabel}</div>
          </div>
        </div>
      </motion.div>

      {/* CTA Bento Box */}
      <div id="bento-box-cta" className="md:col-span-3 border border-white/5 bg-gradient-to-r from-violet-950/10 via-black/40 to-indigo-950/10 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-4">
        <div className="space-y-3 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center space-x-2 px-2 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 font-mono text-[10px] uppercase">
            <Zap size={10} />
            <span>CUSTOM ENGAGEMENT</span>
          </div>
          <h4 className="font-display font-bold text-2xl text-white tracking-tight">Need custom system engineering?</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            We partner with a limited roster of companies quarterly. Let's design, code, and deploy your custom solution.
          </p>
        </div>
        <button
          id="bento-box-contact-btn"
          onClick={onNavigateContact}
          className="w-full md:w-auto px-8 py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-violet-600 hover:text-white hover:border-violet-500 transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer"
        >
          <span>INITIATE ENGAGEMENT</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

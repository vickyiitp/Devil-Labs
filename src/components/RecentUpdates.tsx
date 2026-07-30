import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, Rocket, Cpu, ArrowUpRight, ShieldCheck, Zap, Layers } from 'lucide-react';
import StaggeredHeading from './StaggeredHeading';

export interface AnnouncementItem {
  id: string;
  version: string;
  title: string;
  category: 'Engine' | 'Client Delivery' | 'Open Source' | 'Security';
  date: string;
  description: string;
  tag: string;
  highlightColor: string;
  link?: string;
  metrics?: { label: string; value: string }[];
}

const RECENT_UPDATES: AnnouncementItem[] = [
  {
    id: 'up-1',
    version: 'v2.4.0',
    title: 'Multi-Agent Autonomous Orchestrator Release',
    category: 'Engine',
    date: 'JULY 2026',
    description: 'Upgraded LLM router with sub-100ms response gateway, sandbox code evaluation, and automated fallbacks.',
    tag: 'PRODUCTION ENGINE',
    highlightColor: 'from-violet-600 to-indigo-600',
    metrics: [
      { label: 'LATENCY', value: '<85ms' },
      { label: 'SLA FIDELITY', value: '99.9%' }
    ]
  },
  {
    id: 'up-2',
    version: 'v2.3.5',
    title: 'Obsidian Fluid UI & Adaptive Container System',
    category: 'Engine',
    date: 'JULY 2026',
    description: 'Deploys clamp-based fluid typography scales, mobile card container wrapping, and zero horizontal scroll overflow across viewports.',
    tag: 'DESIGN SYSTEM',
    highlightColor: 'from-rose-500 to-pink-600',
    metrics: [
      { label: 'DEVICE COMPAT', value: '100%' },
      { label: 'CLS SCORE', value: '0.00' }
    ]
  },
  {
    id: 'up-3',
    version: 'v2.2.0',
    title: 'GeniusMVA AI Computer Vision Platform Deployed',
    category: 'Client Delivery',
    date: 'JUNE 2026',
    description: 'Delivered bespoke vision analytics platform processing real-time video feeds with automated anomaly detection.',
    tag: 'ENTERPRISE DEPLOYMENT',
    highlightColor: 'from-amber-500 to-orange-600',
    metrics: [
      { label: 'STREAM SPEED', value: '60 FPS' },
      { label: 'ACCURACY', value: '99.4%' }
    ]
  },
  {
    id: 'up-4',
    version: 'v2.1.0',
    title: 'Devil Engine AI Full-Stack Starter SDK Open-Sourced',
    category: 'Open Source',
    date: 'MAY 2026',
    description: 'Public release of developer boilerplate integrating Gemini API, Express microservices, and dark glassmorphic components.',
    tag: 'OPEN SOURCE',
    highlightColor: 'from-emerald-500 to-teal-600',
    metrics: [
      { label: 'DOWNLOADS', value: '4.8K+' },
      { label: 'STAR RATING', value: '4.9/5' }
    ]
  }
];

export default function RecentUpdates() {
  const [filter, setFilter] = useState<string>('All');

  const filteredUpdates = filter === 'All' 
    ? RECENT_UPDATES 
    : RECENT_UPDATES.filter(u => u.category === filter);

  return (
    <section id="recent-updates-section" className="py-20 sm:py-28 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8 gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 bg-violet-950/80 border border-violet-500/30 px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] text-violet-300 font-extrabold">
            <Sparkles size={12} className="text-violet-400 animate-pulse" />
            <span>LIVE CHANGELOG & RECENT UPDATES</span>
          </div>
          <StaggeredHeading 
            text="RECENT SYSTEM UPDATES." 
            className="font-display font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-white tracking-tighter uppercase leading-none break-words max-w-full"
          />
          <p className="text-stone-300 text-xs sm:text-sm font-sans max-w-xl leading-relaxed">
            Real-time changelog of our live deployments, core framework upgrades, and enterprise software releases.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center flex-wrap gap-2">
          {['All', 'Engine', 'Client Delivery', 'Open Source'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest font-extrabold transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-violet-600 text-white shadow-lg border border-violet-400/40'
                  : 'bg-[#111116] text-stone-400 border border-white/10 hover:text-white hover:bg-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Updates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AnimatePresence mode="popLayout">
          {filteredUpdates.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group p-6 sm:p-8 rounded-[24px] clay-card relative flex flex-col justify-between overflow-hidden text-left border border-white/10 hover:border-violet-500/40 transition-all duration-300"
            >
              {/* Top Accent Gradient */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.highlightColor}`} />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] bg-violet-950/80 text-violet-300 border border-violet-500/30 px-2.5 py-1 rounded-md font-bold">
                      {item.version}
                    </span>
                    <span className="text-stone-400 font-mono text-[10px] tracking-wider uppercase font-bold">
                      ✦ {item.date}
                    </span>
                  </div>
                  <span className="text-[9px] font-sans uppercase tracking-widest font-black text-stone-400 bg-[#111] px-3 py-1 rounded-full border border-white/10">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-stone-100 uppercase tracking-tight group-hover:text-violet-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-stone-300 text-xs leading-relaxed font-sans font-light">
                  {item.description}
                </p>

                {item.metrics && item.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="bg-[#0a0a0e]/80 border border-white/10 p-2.5 rounded-xl text-left">
                        <span className="text-[9px] font-mono text-stone-400 uppercase block font-bold tracking-wider">{m.label}</span>
                        <span className="text-sm font-display font-black text-violet-300">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10/30 flex items-center justify-between text-stone-400 group-hover:text-stone-200 transition-colors text-[10px] font-mono uppercase font-bold tracking-widest">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>VERIFIED RELEASE</span>
                </span>
                <ArrowUpRight size={14} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-violet-400" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

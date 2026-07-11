import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Code2, ShieldCheck, Zap, Star, Quote, 
  Terminal, Cpu, FileText, Eye, Filter, Sparkles, 
  ChevronRight, RefreshCw, Layers, ShieldAlert, Wifi
} from 'lucide-react';
import CyberFrame from '../components/CyberFrame';
import { steps, testimonials, articles } from '../data/insights';

interface ProcessInsightsPageProps {
  navigate: (path: string) => void;
}

export default function ProcessInsightsPage({ navigate }: ProcessInsightsPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'process' | 'insights'>(() => {
    const path = window.location.pathname;
    if (path === '/process') return 'process';
    if (path === '/insights') return 'insights';
    return 'all';
  });
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  
  // Real-time simulated telemetry variables
  const [agentSpeed, setAgentSpeed] = useState(98.4);
  const [activeNodes, setActiveNodes] = useState(12);
  const [latency, setLatency] = useState(42);
  const [tokenThroughput, setTokenThroughput] = useState(2450);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgentSpeed(parseFloat((95 + Math.random() * 4.9).toFixed(1)));
      setActiveNodes(Math.floor(10 + Math.random() * 4));
      setLatency(Math.floor(38 + Math.random() * 10));
      setTokenThroughput(Math.floor(2100 + Math.random() * 600));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
      const artId = parseInt(idParam);
      if (!isNaN(artId) && articles.some(a => a.id === artId)) {
        setSelectedArticle(artId);
        setActiveTab('insights');
      }
    }
  }, []);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto min-h-screen font-mono text-gray-300 relative">
      
      {/* Decorative Matrix & Alignment Marks */}
      <div className="absolute top-24 left-10 text-[9px] text-violet-500/30 select-none pointer-events-none hidden xl:block">
        <div>SYS_ID: LAB_CORE_V3.0</div>
        <div>LATENCY_LOCK: SECURED</div>
      </div>
      <div className="absolute top-24 right-10 text-[9px] text-violet-500/30 text-right select-none pointer-events-none hidden xl:block">
        <div>LOC_REDUNDANCY: MULTI_NODE</div>
        <div>UPLINK: STABLE</div>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center relative z-10"
      >
        <div className="inline-flex items-center space-x-2 bg-violet-950/40 border border-violet-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-violet-400 mb-6 uppercase tracking-widest">
          <Sparkles size={12} className="animate-pulse" />
          <span>DevOps & Intelligence Core</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-6 text-white">
          THE LAB <span className="text-violet-500">//</span> ENGINE & INSIGHTS
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-xs md:text-sm">
          A synchronized workspace displaying our high-velocity development cycle and deep research notes on agentic systems, full-stack micro-architecture, and cloud deployments.
        </p>
      </motion.div>

      {/* Cyber Telemetry Hub (Decorations & Real-time Metrics) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16 relative"
      >
        <div className="bg-[#050505] border border-white/5 p-4 rounded-xl relative overflow-hidden group hover:border-violet-500/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 blur-2xl rounded-full" />
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[9px] tracking-wider uppercase">AGENT STACK PERFORMANCE</span>
            <Cpu size={12} className="text-violet-500" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-white tracking-tight font-mono">
            {agentSpeed}% <span className="text-[10px] text-emerald-400 font-normal">MAX</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
            <motion.div 
              className="bg-violet-500 h-full"
              animate={{ width: `${agentSpeed}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="bg-[#050505] border border-white/5 p-4 rounded-xl relative overflow-hidden group hover:border-violet-500/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 blur-2xl rounded-full" />
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[9px] tracking-wider uppercase">UPLINK LATENCY</span>
            <Wifi size={12} className="text-violet-400" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-white tracking-tight font-mono">
            {latency}ms <span className="text-[10px] text-violet-400 font-normal">LOCK</span>
          </div>
          <div className="text-[9px] text-gray-500 mt-2 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>REAL-TIME FEED</span>
          </div>
        </div>

        <div className="bg-[#050505] border border-white/5 p-4 rounded-xl relative overflow-hidden group hover:border-violet-500/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 blur-2xl rounded-full" />
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[9px] tracking-wider uppercase">LOGIC THROUGHPUT</span>
            <Terminal size={12} className="text-violet-500" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-white tracking-tight font-mono">
            {tokenThroughput} t/s
          </div>
          <div className="text-[9px] text-gray-500 mt-2">
            CONCURRENT AGENT CHANNELS: {activeNodes}
          </div>
        </div>

        <div className="bg-[#050505] border border-white/5 p-4 rounded-xl relative overflow-hidden group hover:border-violet-500/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 blur-2xl rounded-full" />
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[9px] tracking-wider uppercase">SYSTEM SECURITY STATE</span>
            <Layers size={12} className="text-emerald-400" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-emerald-400 tracking-tight font-mono uppercase">
            SECURE
          </div>
          <div className="text-[9px] text-gray-500 mt-2 uppercase">
            Zero security warnings logged
          </div>
        </div>
      </motion.div>

      {/* Decorative Splitter Frame */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 bg-[#050505] border border-white/5 rounded-xl">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeTab === 'all'
                ? 'bg-violet-600 text-white shadow-neon-violet border border-violet-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            [00] Consolidated Workspace
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`px-5 py-2 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeTab === 'process'
                ? 'bg-violet-600 text-white shadow-neon-violet border border-violet-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            [01] The Engine Room
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-5 py-2 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeTab === 'insights'
                ? 'bg-violet-600 text-white shadow-neon-violet border border-violet-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            [02] Lab Notes
          </button>
        </div>
      </div>

      {/* Main Combined Content Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
        
        {/* Left Deck (The Engine Room // Process Timeline) */}
        {(activeTab === 'all' || activeTab === 'process') && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${activeTab === 'all' ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-12`}
          >
            <div className="border-b border-white/5 pb-4 mb-8 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-violet-500 font-bold block">// DEPLOYMENT PIPELINE</span>
                <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">The Engine Room</h2>
              </div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest bg-white/5 border border-white/5 px-3 py-1 rounded">
                4-Phase Sequence
              </span>
            </div>

            {/* Steps Timeline Grid */}
            <div className="space-y-6 relative pl-6 border-l border-white/5">
              {steps.map((step) => (
                <div key={step.id} className="relative group">
                  {/* Indicator Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-[#050505] border-2 border-violet-500 group-hover:bg-violet-400 transition-colors z-10" />
                  
                  <div className="p-6 bg-[#050505]/40 border border-white/5 rounded-xl hover:border-violet-500/20 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 flex items-center justify-center font-mono font-bold text-gray-700 select-none text-xl border-l border-b border-white/5">
                      {step.id}
                    </div>
                    <span className="text-[10px] text-violet-400 font-mono tracking-widest uppercase block mb-1">PHASE {step.id}</span>
                    <h3 className="text-white font-bold uppercase tracking-tight text-sm group-hover:text-violet-200 transition-colors mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Velocity Advantages Panel */}
            <div className="pt-8 border-t border-white/5">
              <h3 className="text-xs font-mono font-bold text-gray-400 tracking-[0.2em] uppercase mb-6">// INTEGRATED VELOCITY PRINCIPLES</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-white/5 border border-white/5 hover:border-violet-500/20 rounded-xl transition-all">
                  <Zap className="text-violet-400 mb-3" size={16} />
                  <h4 className="text-white text-xs font-bold uppercase mb-1">AI Speed</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Rapid modular code assembly.
                  </p>
                </div>
                <div className="p-5 bg-white/5 border border-white/5 hover:border-violet-500/20 rounded-xl transition-all">
                  <Code2 className="text-violet-400 mb-3" size={16} />
                  <h4 className="text-white text-xs font-bold uppercase mb-1">Zero Debt</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Meticulously strict compiler rules.
                  </p>
                </div>
                <div className="p-5 bg-white/5 border border-white/5 hover:border-violet-500/20 rounded-xl transition-all">
                  <ShieldCheck className="text-violet-400 mb-3" size={16} />
                  <h4 className="text-white text-xs font-bold uppercase mb-1">Hardened</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Edge deployment sandboxing.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Right Deck (The Insights // Lab Notes) */}
        {(activeTab === 'all' || activeTab === 'insights') && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${activeTab === 'all' ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-12`}
          >
            <div className="border-b border-white/5 pb-4 mb-8 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-violet-500 font-bold block">// INTEL & RESEARCH</span>
                <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Lab Notes</h2>
              </div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest bg-white/5 border border-white/5 px-3 py-1 rounded">
                Telemetry Releases
              </span>
            </div>

            {/* Articles List / Cards */}
            <div className="space-y-4">
              {articles.map((article) => (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticle(article.id)}
                  className="p-6 bg-[#050505]/40 border border-white/5 rounded-xl hover:bg-violet-950/10 hover:border-violet-500/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] text-violet-400 tracking-wider font-bold uppercase">{article.tag}</span>
                      <span className="text-[9px] text-gray-600">{article.readTime}</span>
                    </div>
                    <h3 className="text-white font-bold uppercase tracking-tight text-sm group-hover:text-violet-200 transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 group-hover:text-violet-400 transition-colors uppercase">
                    <span>Decrypt Transmission</span>
                    <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Abstract Art Area in Insights Column */}
            <div className="border border-white/5 bg-white/[0.01] rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-violet-500/10 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-violet-500/5 rounded-full" />
              <div className="relative z-10 text-center py-6">
                <Cpu size={24} className="text-violet-500/40 mx-auto mb-3" />
                <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase block mb-1">SYSTEM CO-PROCESSOR ACTIVE</span>
                <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                  Neural telemetry nodes automatically monitoring codebase changes across all client workspaces.
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Testimonials & Telemetry Validation Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mt-24 pt-20 border-t border-white/5"
      >
        <div className="text-center mb-16">
          <span className="text-violet-500 font-bold text-xs tracking-widest uppercase mb-4 block">System Validation</span>
          <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Active Node Transmissions</h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-3 text-xs leading-relaxed">
            Telemetry reports and system validations compiled directly from verified workspace founders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <div key={idx} className="h-full">
              <CyberFrame glowColor="violet" className="bg-[#050505]/60 border border-white/5 hover:border-violet-500/25 transition-all p-6 rounded-xl flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-violet-400 text-violet-400" />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider bg-white/5 border border-white/5 px-2 py-0.5 rounded uppercase">
                      {t.metric}
                    </span>
                  </div>

                  <div className="relative mb-6">
                    <Quote size={20} className="text-violet-500/20 absolute -top-3 -left-2" />
                    <p className="text-xs text-gray-300 leading-relaxed font-sans relative z-10 pl-4">
                      {t.quote}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-4">
                  <p className="text-white font-mono text-xs font-bold uppercase">{t.author}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[10px] text-gray-400 font-mono">{t.role}, {t.company}</p>
                    <span className="text-[9px] text-violet-400 font-bold font-mono tracking-widest uppercase">{t.projectType}</span>
                  </div>
                </div>
              </CyberFrame>
            </div>
          ))}
        </div>

        {/* Client Feedback Highlight (Vicky IITP validation) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 border border-white/5 bg-[#050505]/60 rounded-2xl relative overflow-hidden font-mono"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-3xl rounded-full" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] text-violet-400 font-bold tracking-widest uppercase block">// LEAD ARCHITECTURE VALIDATION</span>
              <p className="text-sm text-gray-300 italic font-sans leading-relaxed">
                "Devil Labs operates at the absolute peak of modern software velocity. Their secure, type-safe full-stack micro-architecture allowed our product team to launch and scale instantly."
              </p>
              <p className="text-xs text-gray-500 font-mono">
                — Vicky IITP, Founder & Lead Architect at <span className="text-white">vickyiitp.tech</span>
              </p>
            </div>
            <button 
              onClick={() => navigate('/contact')}
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 rounded border border-violet-500 shadow-neon-violet shrink-0"
            >
              Initialize Node Uplink
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Holographic Document Reader Overlay Modal */}
      <AnimatePresence>
        {selectedArticle !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl"
            >
              <CyberFrame glowColor="violet" className="bg-[#050505] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col relative max-h-[85vh] overflow-y-auto">
                {(() => {
                  const art = articles.find(a => a.id === selectedArticle);
                  if (!art) return null;
                  return (
                    <>
                      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                        <div className="flex items-center space-x-2 text-violet-400">
                          <Terminal size={14} />
                          <span className="text-[10px] tracking-widest font-bold uppercase">{art.tag} // SECURE DECRYPTED TX</span>
                        </div>
                        <button 
                          onClick={() => setSelectedArticle(null)}
                          className="text-gray-500 hover:text-white text-xs font-mono font-bold"
                        >
                          [CLOSE FILE]
                        </button>
                      </div>

                      <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block mb-2">{art.readTime}</span>
                      <h2 className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-tight mb-4">
                        {art.title}
                      </h2>
                      
                      <p className="text-xs text-gray-300 leading-relaxed font-sans mb-6">
                        {art.content}
                      </p>

                      <div className="border-t border-white/5 pt-4 mt-auto flex items-center justify-between">
                        <div className="text-[9px] text-gray-500 font-mono">
                          SYSTEM ENCRYPTION STATUS: SHA-256
                        </div>
                        <button 
                          onClick={() => setSelectedArticle(null)}
                          className="px-4 py-2 bg-white/5 hover:bg-violet-600/20 text-white text-[10px] font-bold uppercase rounded border border-white/10 hover:border-violet-500 transition-colors"
                        >
                          Acknowledge & Close
                        </button>
                      </div>
                    </>
                  );
                })()}
              </CyberFrame>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terminal Subscribe */}
      <div className="border border-white/5 bg-[#020202] py-12 px-6 rounded-2xl max-w-4xl mx-auto mt-24">
        <div className="flex items-center space-x-3 mb-6 text-gray-500">
          <Terminal size={18} />
          <span className="text-xs uppercase tracking-widest">Secure Intel Transmission Line</span>
        </div>
        <form 
          onSubmit={(e) => { e.preventDefault(); alert('Uplink established.'); }}
          className="flex items-center flex-wrap sm:flex-nowrap gap-4 font-mono text-sm"
        >
          <span className="text-violet-500 font-bold shrink-0">{`> Subscribe to the manifest:`}</span>
          <input 
            type="email"
            required
            placeholder="[Enter Email Address]"
            className="bg-transparent border-none text-white focus:outline-none focus:ring-0 placeholder-gray-700 flex-grow min-w-[200px]"
          />
          <button type="submit" className="text-white hover:text-violet-400 font-bold transition-colors shrink-0">
            [CONNECT]
          </button>
        </form>
      </div>

    </div>
  );
}

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  ArrowRight, Code2, ShieldCheck, Zap, Star, Quote, 
  Terminal, Cpu, Sparkles, 
  ChevronRight, Layers, Wifi, X
} from 'lucide-react';
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
    <div className="pt-20 xs:pt-24 sm:pt-28 lg:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto min-h-screen text-stone-800 relative">
      
      {/* Decorative Matrix & Alignment Marks */}
      <div className="absolute top-24 left-10 text-xs text-violet-500/30 select-none pointer-events-none hidden xl:block font-mono">
        <div>SYS_ID: LAB_CORE_V3.0</div>
        <div>LATENCY_LOCK: SECURED</div>
      </div>
      <div className="absolute top-24 right-10 text-xs text-violet-500/30 text-right select-none pointer-events-none hidden xl:block font-mono">
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
        <div className="inline-flex items-center space-x-2 bg-violet-100 border border-violet-200/50 px-4 py-1.5 rounded-full text-xs font-bold text-violet-700 mb-6 uppercase tracking-widest shadow-sm">
          <Sparkles size={12} className="animate-pulse" />
          <span>DevOps & Intelligence Core</span>
        </div>
        <h1 className="font-display text-3xl xs:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-6 text-stone-850">
          THE LAB <span className="text-violet-600 font-light font-serif italic">✦</span> ENGINE & INSIGHTS
        </h1>
        <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed text-sm font-sans font-light">
          A synchronized workspace displaying our high-velocity development cycle and deep research notes on agentic systems, full-stack micro-architecture, and cloud deployments.
        </p>
      </motion.div>

      {/* Cyber Telemetry Hub (Decorations & Real-time Metrics) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16 relative"
      >
        <div className="clay-card p-5 relative overflow-hidden group hover:scale-[1.02] transition-all text-left">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-100/30 rounded-full blur-xl" />
          <div className="flex items-center justify-between text-stone-400 mb-2 font-mono">
            <span className="text-xs tracking-wider uppercase font-bold">AGENT PERFORMANCE</span>
            <Cpu size={12} className="text-violet-600" />
          </div>
          <div className="text-xl md:text-2xl font-black text-stone-850 tracking-tight font-mono">
            {agentSpeed}% <span className="text-xs text-emerald-600 font-bold">MAX</span>
          </div>
          <div className="w-full bg-stone-200/50 h-1 rounded-full mt-3 overflow-hidden">
            <motion.div 
              className="bg-violet-600 h-full"
              animate={{ width: `${agentSpeed}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="clay-card p-5 relative overflow-hidden group hover:scale-[1.02] transition-all text-left">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-100/30 rounded-full blur-xl" />
          <div className="flex items-center justify-between text-stone-400 mb-2 font-mono">
            <span className="text-xs tracking-wider uppercase font-bold">UPLINK LATENCY</span>
            <Wifi size={12} className="text-violet-600" />
          </div>
          <div className="text-xl md:text-2xl font-black text-stone-850 tracking-tight font-mono">
            {latency}ms <span className="text-xs text-violet-600 font-bold">LOCK</span>
          </div>
          <div className="text-xs text-stone-400 mt-2 flex items-center space-x-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">REAL-TIME FEED</span>
          </div>
        </div>

        <div className="clay-card p-5 relative overflow-hidden group hover:scale-[1.02] transition-all text-left">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-100/30 rounded-full blur-xl" />
          <div className="flex items-center justify-between text-stone-400 mb-2 font-mono">
            <span className="text-xs tracking-wider uppercase font-bold">LOGIC THROUGHPUT</span>
            <Terminal size={12} className="text-violet-600" />
          </div>
          <div className="text-xl md:text-2xl font-black text-stone-850 tracking-tight font-mono">
            {tokenThroughput} t/s
          </div>
          <div className="text-xs text-stone-400 mt-2 font-mono font-bold">
            CHANNELS: {activeNodes}
          </div>
        </div>

        <div className="clay-card p-5 relative overflow-hidden group hover:scale-[1.02] transition-all text-left">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-100/30 rounded-full blur-xl" />
          <div className="flex items-center justify-between text-stone-400 mb-2 font-mono">
            <span className="text-xs tracking-wider uppercase font-bold">SECURITY STATE</span>
            <Layers size={12} className="text-emerald-600" />
          </div>
          <div className="text-xl md:text-2xl font-black text-emerald-600 tracking-tight font-mono">
            SECURE
          </div>
          <div className="text-xs text-stone-400 mt-2 uppercase font-mono font-bold">
            0 Alerts Active
          </div>
        </div>
      </motion.div>

      {/* Tab Selector */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 bg-[#f0ede6] border border-stone-200/40 rounded-2xl shadow-inner font-mono">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#fcfbf9] text-stone-800 shadow-md font-black'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            [00] Consolidated
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'process'
                ? 'bg-[#fcfbf9] text-stone-800 shadow-md font-black'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            [01] Engine Room
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'insights'
                ? 'bg-[#fcfbf9] text-stone-800 shadow-md font-black'
                : 'text-stone-500 hover:text-stone-800'
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
            <div className="border-b border-stone-200/30 pb-4 mb-8 flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs text-violet-600 font-mono font-bold block">✦ DEPLOYMENT PIPELINE</span>
                <h2 className="text-2xl font-display font-extrabold text-stone-800 uppercase tracking-tight">The Engine Room</h2>
              </div>
              <span className="text-xs text-stone-500 font-mono uppercase tracking-widest bg-white/80 border border-stone-200/40 px-3 py-1.5 rounded-full shadow-sm font-bold">
                4-Phase Sequence
              </span>
            </div>

            {/* Steps Timeline Grid */}
            <div className="space-y-6 relative pl-6 border-l border-stone-200/40 text-left">
              {steps.map((step) => (
                <div key={step.id} className="relative group">
                  {/* Indicator Dot */}
                  <div className="absolute -left-[31px] top-2 w-2 h-2 rounded-full bg-[#fdfcf9] border-2 border-violet-600 group-hover:bg-violet-400 transition-colors z-10" />
                  
                  <div className="p-6 clay-card hover:scale-[1.01] hover:border-violet-300 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-stone-100/80 flex items-center justify-center font-mono font-bold text-stone-400 select-none text-base border-l border-b border-stone-200/20">
                      {step.id}
                    </div>
                    <span className="text-xs text-violet-600 font-mono tracking-widest uppercase block mb-1 font-bold">PHASE {step.id}</span>
                    <h3 className="text-stone-800 font-extrabold uppercase tracking-tight text-sm group-hover:text-violet-600 transition-colors mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed max-w-md font-sans font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Velocity Advantages Panel */}
            <div className="pt-8 border-t border-stone-200/30 text-left">
              <h3 className="text-xs font-mono font-bold text-stone-400 tracking-[0.2em] uppercase mb-6">✦ INTEGRATED VELOCITY PRINCIPLES</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-[#fdfcf9] border border-stone-200/40 rounded-2xl hover:border-violet-300 shadow-sm transition-all">
                  <Zap className="text-violet-600 mb-3 animate-pulse" size={16} />
                  <h4 className="text-stone-800 text-xs font-bold uppercase mb-1">AI Speed</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-light">
                    Rapid modular code assembly.
                  </p>
                </div>
                <div className="p-5 bg-[#fdfcf9] border border-stone-200/40 rounded-2xl hover:border-violet-300 shadow-sm transition-all">
                  <Code2 className="text-violet-600 mb-3" size={16} />
                  <h4 className="text-stone-800 text-xs font-bold uppercase mb-1">Zero Debt</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-light">
                    Meticulously strict compiler rules.
                  </p>
                </div>
                <div className="p-5 bg-[#fdfcf9] border border-stone-200/40 rounded-2xl hover:border-violet-300 shadow-sm transition-all">
                  <ShieldCheck className="text-emerald-500 mb-3" size={16} />
                  <h4 className="text-stone-800 text-xs font-bold uppercase mb-1">Hardened</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-light">
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
            <div className="border-b border-stone-200/30 pb-4 mb-8 flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs text-violet-600 font-mono font-bold block">✦ INTEL & RESEARCH</span>
                <h2 className="text-2xl font-display font-extrabold text-stone-800 uppercase tracking-tight">Lab Notes</h2>
              </div>
              <span className="text-xs text-stone-500 font-mono uppercase tracking-widest bg-white/80 border border-stone-200/40 px-3 py-1.5 rounded-full shadow-sm font-bold">
                Telemetry Releases
              </span>
            </div>

            {/* Articles List / Cards */}
            <div className="space-y-4 text-left">
              {articles.map((article) => (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticle(article.id)}
                  className="p-6 clay-card hover:border-violet-300 hover:scale-[1.01] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 font-mono">
                      <span className="text-xs text-violet-600 tracking-wider font-bold uppercase">{article.tag}</span>
                      <span className="text-xs text-stone-400 font-bold">{article.readTime}</span>
                    </div>
                    <h3 className="text-stone-800 font-extrabold uppercase tracking-tight text-sm group-hover:text-violet-600 transition-colors mb-2 font-display">
                      {article.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed mb-4 font-sans font-light">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-stone-400 group-hover:text-violet-600 transition-colors uppercase font-mono">
                    <span>Decrypt Transmission</span>
                    <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Abstract Art Area in Insights Column */}
            <div className="clay-card p-6 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-violet-200 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-violet-100 rounded-full animate-pulse" />
              <div className="relative z-10 text-center py-6">
                <Cpu size={24} className="text-violet-500/50 mx-auto mb-3" />
                <span className="text-xs text-stone-400 font-mono tracking-widest uppercase block mb-1 font-bold">SYSTEM CO-PROCESSOR ACTIVE</span>
                <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto font-sans font-light">
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
        className="max-w-7xl mx-auto mt-24 pt-20 border-t border-stone-200/30"
      >
        <div className="text-center mb-16">
          <span className="text-violet-600 font-bold text-xs tracking-widest uppercase mb-4 block font-mono">System Validation</span>
          <h2 className="text-3xl font-display font-extrabold text-stone-850 uppercase tracking-tight">Active Node Transmissions</h2>
          <p className="text-stone-500 max-w-xl mx-auto mt-3 text-xs leading-relaxed font-sans font-light">
            Telemetry reports and system validations compiled directly from verified workspace founders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <div key={idx} className="h-full">
              <div className="p-6 clay-card hover:scale-[1.01] hover:border-violet-300 transition-all flex flex-col justify-between h-full text-left">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-violet-400 text-violet-400" />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-stone-400 font-bold tracking-wider bg-stone-100 border border-stone-200/20 px-2 py-0.5 rounded uppercase">
                      {t.metric}
                    </span>
                  </div>

                  <div className="relative mb-6">
                    <Quote size={20} className="text-violet-500/20 absolute -top-3 -left-2" />
                    <p className="text-xs text-stone-600 leading-relaxed font-sans relative z-10 pl-4 font-light">
                      {t.quote}
                    </p>
                  </div>
                </div>

                <div className="border-t border-stone-200/30 pt-4 mt-4">
                  <p className="text-stone-800 font-mono text-xs font-bold uppercase">{t.author}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-stone-400 font-mono">{t.role}, {t.company}</p>
                    <span className="text-xs text-violet-600 font-bold font-mono tracking-widest uppercase">{t.projectType}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Feedback Highlight (Vicky IITP validation) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 clay-card relative overflow-hidden font-mono text-left"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100/30 rounded-full blur-3xl" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs text-violet-600 font-bold tracking-widest uppercase block">✦ LEAD ARCHITECTURE VALIDATION</span>
              <p className="text-sm text-stone-600 italic font-sans leading-relaxed font-light">
                "Devil Labs operates at the absolute peak of modern software velocity. Their secure, type-safe full-stack micro-architecture allowed our product team to launch and scale instantly."
              </p>
              <p className="text-xs text-stone-400 font-mono">
                — Vicky IITP, Founder & Lead Architect at <span className="text-stone-850 font-bold">vickyiitp.tech</span>
              </p>
            </div>
            <button 
              onClick={() => navigate('/contact')}
              className="px-5 py-3 clay-violet-solid font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-xl cursor-pointer shadow-md shrink-0"
            >
              Initialize Node Uplink
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Holographic Document Reader Overlay Modal */}
      <AnimatePresence>
        {selectedArticle !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl"
            >
              <div className="clay-card bg-[#faf8f5] p-6 md:p-8 flex flex-col relative max-h-[85vh] overflow-y-auto text-left shadow-2xl">
                {(() => {
                  const art = articles.find(a => a.id === selectedArticle);
                  if (!art) return null;
                  return (
                    <>
                      <div className="flex items-center justify-between border-b border-stone-200/30 pb-4 mb-6">
                        <div className="flex items-center space-x-2 text-violet-600 font-mono">
                          <Terminal size={14} />
                          <span className="text-xs tracking-widest font-bold uppercase">{art.tag} ✦ DECRYPTED</span>
                        </div>
                        <button 
                          onClick={() => setSelectedArticle(null)}
                          className="text-stone-400 hover:text-stone-800 text-xs font-mono font-bold flex items-center space-x-1.5 clay-button px-3 py-1.5"
                        >
                          <X size={12} />
                          <span>CLOSE</span>
                        </button>
                      </div>

                      <span className="text-xs text-stone-400 font-mono tracking-widest uppercase block mb-2 font-bold">{art.readTime}</span>
                      <h2 className="text-xl md:text-2xl font-display font-extrabold text-stone-850 uppercase tracking-tight mb-4">
                        {art.title}
                      </h2>
                      
                      <p className="text-xs text-stone-600 leading-relaxed font-sans mb-6 font-light">
                        {art.content}
                      </p>

                      <div className="border-t border-stone-200/30 pt-4 mt-auto flex items-center justify-between font-mono">
                        <div className="text-xs text-stone-400 font-bold">
                          SECURITY STATUS: SHA-256
                        </div>
                        <button 
                          onClick={() => setSelectedArticle(null)}
                          className="px-5 py-2.5 clay-violet-solid text-xs font-bold uppercase rounded-xl"
                        >
                          Acknowledge & Close
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terminal Subscribe */}
      <div className="clay-card py-12 px-6 max-w-4xl mx-auto mt-24 text-left">
        <div className="flex items-center space-x-3 mb-6 text-stone-400 font-mono">
          <Terminal size={18} className="text-violet-600" />
          <span className="text-xs uppercase tracking-widest font-bold">Secure Intel Transmission Line</span>
        </div>
        <form 
          onSubmit={(e) => { e.preventDefault(); alert('Uplink established.'); }}
          className="flex items-center flex-wrap sm:flex-nowrap gap-4 font-mono text-sm"
        >
          <span className="text-violet-600 font-bold shrink-0">{`> Subscribe to the manifest:`}</span>
          <input 
            type="email"
            required
            placeholder="[Enter Email Address]"
            className="bg-transparent border-none text-stone-800 focus:outline-none focus:ring-0 placeholder-stone-300 flex-grow min-w-[200px]"
          />
          <button type="submit" className="text-stone-700 hover:text-violet-600 font-bold transition-colors shrink-0 clay-button px-5 py-2 text-xs">
            [CONNECT]
          </button>
        </form>
      </div>

    </div>
  );
}

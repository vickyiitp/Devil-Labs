import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Zap, Cpu, Check, ArrowDown, Terminal, 
  Sparkles, ShieldCheck, Database, Layers, Globe, Server, 
  ShoppingBag, BookOpen, Clock, Tag, ArrowUpRight, CheckCircle 
} from 'lucide-react';
import Marquee from '../components/Marquee';
import SocialProofMarquee from '../components/SocialProofMarquee';
import CyberFrame from '../components/CyberFrame';
import IndustrySolutions from '../components/IndustrySolutions';
import ScrollReveal from '../components/ScrollReveal';
import PolishedFeatureMarquee from '../components/PolishedFeatureMarquee';
import { HandDrawnCircle, HandDrawnUnderline, HandDrawnArrow, BlueprintStickyNote } from '../components/AestheticAnnotation';
import StaggeredHeading from '../components/StaggeredHeading';
import heroBg from '../assets/images/image.jpg';
import WireframeMockup from '../components/WireframeMockup';
import ProjectGallery from '../components/ProjectGallery';
import { openInquiryModal } from '../lib/inquiry';
import { useDataStore } from '../hooks/useDataStore';

const nichesData = [
  {
    id: 'pedigree',
    number: '01',
    title: 'ELITE ENGINEERING PEDIGREE',
    tagline: 'DEEP TECH R&D FROM IIT PATNA',
    tag: 'IIT PATNA CO-FOUNDERS',
    desc: 'Founded by elite engineers from IIT Patna, Devil Labs injects academic rigor, sophisticated data structures, and highly optimized computer science principles directly into commercial applications.',
    metric: 'IIT Patna',
    metricLabel: 'FOUNDER ALMA MATER',
    niches: [
      'Bespoke Enterprise Web Architectures',
      'Complex Mathematical & Data Pipelines',
      'Advanced Custom Bundle Optimizations'
    ],
    accentColor: 'violet',
    badgeClass: 'bg-violet-950/60 text-violet-300 border-violet-200',
    glowColor: 'rgba(139, 92, 246, 0.25)',
  },
  {
    id: 'cognitive',
    number: '02',
    title: 'COGNITIVE AI AUTOMATION',
    tagline: 'AUTONOMOUS MULTI-AGENT PIPELINES',
    tag: 'LLM & AGENTIC LABS',
    desc: 'We replace fragile, static single-prompt scripts with resilient, self-correcting multi-agent pipelines. Our setups orchestrate dynamic context, audit intermediate outputs in sandboxes, and integrate seamlessly with enterprise databases.',
    metric: '99.4%',
    metricLabel: 'AGENT SLA FIDELITY',
    niches: [
      'Multi-Agent Collaborative Systems',
      'Self-Correcting Telemetry & Alerting Logs',
      'Bespoke Cognitive Customer Pipelines'
    ],
    accentColor: 'rose',
    badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-200',
    glowColor: 'rgba(244, 63, 94, 0.25)',
  },
  {
    id: 'velocity',
    number: '03',
    title: 'HIGH-VELOCITY ENTERPRISE WEB',
    tagline: 'SCALE-READY SECURED PLATFORMS',
    tag: 'FULL-STACK INFRASTRUCTURE',
    desc: 'Our full-stack solutions are engineered with extreme speed and rigid security in mind. We deploy encapsulated microservices behind active load balancers and utilize Edge Content Delivery Networks (CDNs) for instantaneous rendering.',
    metric: '<100ms',
    metricLabel: 'EDGE TIMING GATEWAY',
    niches: [
      'Secure B2B SaaS Architectures',
      'Real-Time Telemetry & WebSocket Dashboards',
      'Zero-Trust Proxy Servers & Secure API Gateways'
    ],
    accentColor: 'amber',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    glowColor: 'rgba(245, 158, 11, 0.25)',
  }
];

const disciplinesData = [
  {
    id: 1,
    title: 'AI Engineering',
    subtitle: 'INTELLIGENCE SYSTEMS',
    desc: 'Autonomous multi-agent planning loops with private vector caches, RAG routing, and context memory safeties.',
    tag: 'AUTONOMOUS',
    metric: 'latency < 120ms',
    status: 'OPTIMIZED',
    tech: 'TypeScript, OpenAI SDK, VectorDb Cache',
    glowColor: 'border-violet-500/30 hover:border-violet-500/60 shadow-violet-500/5',
    icon: Cpu
  },
  {
    id: 2,
    title: 'Bespoke Design',
    subtitle: 'CRAFTED INTERFACES',
    desc: 'Luxurious soft-claymorphism shades, responsive typography, and tactile fluid transitions on high-end layouts.',
    tag: 'AESTHETIC',
    metric: 'AAA contrast ratio',
    status: 'CERTIFIED',
    tech: 'Tailwind v4, Framer Motion, Inter Font',
    glowColor: 'border-pink-500/30 hover:border-pink-500/60 shadow-pink-500/5',
    icon: Sparkles
  },
  {
    id: 3,
    title: 'Workflow Automation',
    subtitle: 'AUTOMATION ENGINES',
    desc: 'Event-driven message routing, instant WhatsApp APIs hooks, CRM automation pipelines with zero packet loss.',
    tag: 'EFFICIENCY',
    metric: 'throughput 1.2k/s',
    status: 'ACTIVE',
    tech: 'Express Webhooks, Twilio SDK, Cron Nodes',
    glowColor: 'border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/5',
    icon: Zap
  },
  {
    id: 4,
    title: 'Cloud Architecture',
    subtitle: 'CLOUD INFRASTRUCTURE',
    desc: 'Active self-healing Docker containers, Prometheus dashboards, and daily redundant VPS backups.',
    tag: 'SCALABILITY',
    metric: '99.99% uptime',
    status: 'ONLINE',
    tech: 'Docker, Prometheus Monitoring, VPS Backup',
    glowColor: 'border-emerald-500/30 hover:border-emerald-500/60 shadow-emerald-500/5',
    icon: Server
  },
  {
    id: 5,
    title: 'Search Optimization',
    subtitle: 'PERFORMANCE & SEO',
    desc: 'Strict semantic layouts, server actions optimization, and pre-bundled assets for instantaneous LCP loading times.',
    tag: 'OPTIMIZATION',
    metric: '100% lighthouse score',
    status: 'VERIFIED',
    tech: 'Next.js App Router, Edge Cache, Schema.org',
    glowColor: 'border-blue-500/30 hover:border-blue-500/60 shadow-blue-500/5',
    icon: Globe
  },
  {
    id: 6,
    title: 'Enterprise Security',
    subtitle: 'SECURE BACKENDS',
    desc: 'Fully typed robust Next.js layouts, secure server-proxied API tokens, and Drizzle SQL row-level rules.',
    tag: 'SECURITY',
    metric: 'SHA-256 encrypted',
    status: 'SHIELDED',
    tech: 'Drizzle ORM, Node-Crypto, Next.js Actions',
    glowColor: 'border-teal-500/30 hover:border-teal-500/60 shadow-teal-500/5',
    icon: ShieldCheck
  }
];

interface LandingPageProps {
  navigate: (path: string) => void;
}

export default function LandingPage({ navigate }: LandingPageProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heroMode, setHeroMode] = useState<'ai' | 'web'>('ai');
  const [activeNicheTab, setActiveNicheTab] = useState('pedigree');

  const store = useDataStore();

  // Use CMS items if available, else empty array
  const displayProducts = store.products && store.products.length > 0
    ? store.products.filter(p => p.featuredHome && p.status === 'active')
    : [];

  const displayBlogs = store.blogs && store.blogs.length > 0
    ? store.blogs.filter(b => b.featuredHome && b.status === 'published')
    : [];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const payload = {
      name: "Landing Page Lead",
      email: email,
      phone: "Not provided",
      company: "Discovery Call Request",
      companySize: "Unknown",
      scope: "General Inquiry / Discovery Call",
      budget: "Custom",
      specs: `Lead submitted interest via Landing Page intake form from email: ${email}`
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // FormSubmit fallback
        await fetch('https://formsubmit.co/ajax/devil.labs.contact@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `🚨 [LANDING PAGE LEAD] ${email}`,
            _captcha: 'false',
            _replyto: email,
            "Lead Email": email,
            "Source": "Landing Page Footer Intake"
          })
        });
      }
    } catch (err) {
      try {
        await fetch('https://formsubmit.co/ajax/devil.labs.contact@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `🚨 [LANDING PAGE LEAD] ${email}`,
            _captcha: 'false',
            _replyto: email,
            "Lead Email": email,
            "Source": "Landing Page Footer Intake"
          })
        });
      } catch (fsErr) {}
    } finally {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div id="landing-page-root" className="pt-12 sm:pt-16 lg:pt-20">
      {/* 1. HERO SECTION WITH SCHEMATIC WIREFRAME */}
      <section 
        id="hero-section" 
        className="relative flex flex-col justify-center px-4 md:px-8 overflow-hidden min-h-[85vh] bg-[#050505] text-white"
      >
        {/* Dynamic Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/* Subtle radial overlay */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_100%)] pointer-events-none opacity-90" />

        <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4 md:px-8 py-12">
          
          {/* LEFT COLUMN: Deep Technical Value Engine & Strategic Business Hook */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 lg:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left relative"
          >
            {/* Value Proposition Toggle */}
            <div className="flex items-center bg-[#111]/80 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-xl">
              <button 
                onClick={() => setHeroMode("ai")} 
                className={`px-5 py-2 rounded-full text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-widest transition-all duration-300 relative ${heroMode === 'ai' ? 'text-white' : 'text-stone-400 hover:text-stone-200'}`}
              >
                {heroMode === 'ai' && (
                  <motion.div layoutId="hero-toggle-bg" className="absolute inset-0 bg-violet-600 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)]" />
                )}
                <span className="relative z-10">Cognitive AI Agents</span>
              </button>
              <button 
                onClick={() => setHeroMode("web")} 
                className={`px-5 py-2 rounded-full text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-widest transition-all duration-300 relative ${heroMode === 'web' ? 'text-white' : 'text-stone-400 hover:text-stone-200'}`}
              >
                {heroMode === 'web' && (
                  <motion.div layoutId="hero-toggle-bg" className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
                )}
                <span className="relative z-10">High-Velocity Web</span>
              </button>
            </div>

            <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex flex-col justify-center w-full lg:items-start items-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={heroMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 w-full flex flex-col lg:items-start items-center max-w-4xl py-2"
                >
                  <h1 className="text-[1.35rem] xs:text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.2rem] xl:text-[4rem] leading-[1.05] font-display font-black tracking-tight uppercase flex flex-col lg:items-start items-center text-center lg:text-left w-full max-w-full text-white">
                    {heroMode === 'ai' ? (
                      <>
                        <span>BUILD INTELLIGENT</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 font-extrabold drop-shadow-[0_0_25px_rgba(99,102,241,0.5)]">
                          SYSTEMS.
                        </span>
                      </>
                    ) : (
                      <>
                        <span>SCALE SECURED ENTERPRISE</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 font-extrabold drop-shadow-[0_0_25px_rgba(99,102,241,0.5)]">
                          ARCHITECTURES.
                        </span>
                      </>
                    )}
                  </h1>

                  <div className="font-serif italic text-stone-200 text-sm sm:text-base leading-relaxed tracking-wide text-center lg:text-left flex items-center space-x-2 pt-1">
                    <span>“</span>
                    <span>
                      {heroMode === 'ai' 
                        ? 'Intelligent automation systems for enterprise operations' 
                        : 'Custom web platforms with instant response times'}
                    </span>
                    <span>”</span>
                  </div>

                  <p className="text-stone-300 text-xs sm:text-sm md:text-base max-w-2xl font-sans leading-relaxed tracking-wide text-center lg:text-left">
                    {heroMode === 'ai' ? (
                      "We build intelligent, resilient multi-agent AI systems that automate complex workflows. Built with rigorous engineering principles from IIT Patna, our platforms streamline operations with high accuracy and data privacy."
                    ) : (
                      "We build secure, high-performance web applications and enterprise platforms tailored to your business goals. Powered by modern cloud infrastructure, we deliver ultra-fast load times and seamless user experiences."
                    )}
                  </p>

                  {/* Co-founder badge */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full justify-center lg:justify-start">
                    <div className="flex items-center space-x-3.5">
                      <img src="https://github.com/vickyiitp.png?size=80" alt="Vicky Kumar" className="flex-shrink-0 w-9 h-9 rounded-full shadow-md border border-stone-800 object-cover" />
                      <div className="text-left">
                        <div className="text-[11px] font-extrabold text-white tracking-wider uppercase font-sans">Vicky Kumar</div>
                        <div className="text-[9px] text-stone-400 font-semibold tracking-wider uppercase leading-none mt-1 font-sans">Co-Founder, Devil Labs • CS Student (IIT Patna)</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Call to Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full relative z-20">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-initialize-modal'))}
                className="group relative w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-sans font-bold text-xs tracking-widest uppercase rounded-full flex items-center justify-center space-x-3 cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Initialize Project</span>
                  <ArrowRight size={14} className="stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              </button>
              
              <div className="flex items-center space-x-2 text-stone-400 font-sans text-[11px]">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                <span>Interactive blueprint schematic.</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Modern schematic mockup replaces 3D canvas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 w-full max-w-xl mx-auto relative z-10"
          >
            <WireframeMockup mode={heroMode} />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none">
          <span className="text-stone-400 font-sans text-[9px] uppercase tracking-[0.3em] font-extrabold opacity-60">Scroll</span>
          <ArrowDown size={14} className="text-stone-400 animate-bounce opacity-85" />
        </div>
      </section>

      {/* 2. ADVANTAGE MATRIX BENTO GRID */}
      <section id="advantage-section" className="py-12 bg-[#050505] px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {['ACADEMIC EXCELLENCE', 'HIGH FIDELITY & SLA', 'VELOCITY & SCALE'].map((title, idx) => {
            const colors = ['text-violet-400', 'text-pink-400', 'text-amber-400'];
            const borders = ['hover:border-violet-500/40', 'hover:border-pink-500/40', 'hover:border-amber-500/40'];
            const heads = ['IIT Patna CS', '99.9% Production SLA', 'Instant Edge Loading'];
            const descs = [
              'Rigorous computer science logic and optimized backend structures engineered by elite IIT Patna student developers.',
              'Autonomous system audits, fail-safe fallback triggers, and reliable data pipelines operating under absolute security.',
              'Edge network routing, client-side hydration optimization, and clean bundle compilation ensuring lightning fast response times.'
            ];
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-between ${borders[idx]} transition-all duration-350 shadow-xl group`}
              >
                <div>
                  <span className={`text-[9px] font-sans font-black ${colors[idx]} block mb-2 tracking-[0.1em]`}>
                    0{idx + 1} • {title}
                  </span>
                  <h3 className="text-white font-display font-extrabold text-sm uppercase tracking-tight mb-2 transition-colors">
                    {heads[idx]}
                  </h3>
                  <p className="text-[11px] text-stone-300 leading-relaxed font-sans font-normal">
                    {descs[idx]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. CURATED DISCIPLINES GRID */}
      <section id="disciplines-grid-section" className="py-20 bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-stone-400 font-sans text-[9px] uppercase tracking-[0.25em] font-black block">✦ CAPABILITIES SPECTRUM</span>
            <h2 className="text-white font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight uppercase leading-none">
              curated <span className="font-serif italic font-normal text-violet-500 lowercase">premium</span> disciplines
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans max-w-lg mx-auto">
              A robust checklist of what we do. Direct, optimized implementations with zero bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplinesData.map((d, idx) => {
              const Icon = d.icon;
              return (
                <motion.div 
                  key={d.id}
                  initial={{ opacity: 0, scale: 0.95, y: 25 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.08 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className={`bg-[#050505] border ${d.glowColor} p-6 rounded-2xl shadow-md transition-all duration-350 flex flex-col justify-between cursor-default`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center">
                        <Icon size={18} className="text-violet-400" />
                      </div>
                      <span className="text-[8px] font-mono text-stone-550 uppercase tracking-widest bg-stone-900 border border-white/5 px-2 py-0.5 rounded-full font-bold">
                        {d.tag}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <span className="text-[8px] font-mono text-stone-400 uppercase tracking-wider block">
                        {d.subtitle}
                      </span>
                      <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                        {d.title}
                      </h3>
                      <p className="text-stone-300 text-xs leading-relaxed font-sans font-normal">
                        {d.desc}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[9px] font-mono">
                    <span className="text-stone-400">{d.tech}</span>
                    <span className="text-violet-400 font-bold uppercase">{d.metric}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. DIGITAL PRODUCTS SHOWCASE */}
      <section id="products-showcase-section" className="py-24 bg-[#050505] border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1.5px)] bg-[size:2rem_2rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-stone-400 font-sans text-[9px] uppercase tracking-[0.25em] font-black block">✦ DIGITAL SHOP</span>
            <h2 className="text-white font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight uppercase leading-none">
              Dev Tools &amp; <span className="font-serif italic font-normal text-pink-500 lowercase">boilerplates</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans max-w-lg mx-auto">
              Pre-built system templates and software engines optimized by IIT Patna engineers to accelerate your SaaS timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((p: any, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group flex flex-col justify-between bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-350 ${p.glowColor || 'hover:border-violet-500/30'}`}
              >
                {/* Header preview box */}
                <div className="aspect-[16/9] w-full bg-cover bg-center bg-stone-900 border-b border-white/10 relative" style={{ backgroundImage: `url(${p.image})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                  <span className="absolute top-4 left-4 bg-stone-900/90 border border-white/15 px-3 py-1 rounded-full text-[8px] font-mono font-black uppercase text-stone-200 tracking-wider">
                    {p.category}
                  </span>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3.5 text-left">
                    <h3 className="text-white font-display font-black text-lg uppercase tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-stone-300 text-xs leading-relaxed font-sans font-normal">
                      {p.description}
                    </p>
                    
                    {/* Features list */}
                    {p.features && p.features.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        {p.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center space-x-2 text-[10px] font-sans text-stone-300 font-medium">
                            <CheckCircle size={12} className="text-violet-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-[8px] font-mono text-stone-400 uppercase tracking-widest leading-none">PRICING</div>
                      <div className="text-xl font-display font-black text-white mt-1">
                        ${p.priceUSD || (p.priceINR ? Math.round(p.priceINR / 83) : 99)}
                      </div>
                    </div>

                    <button 
                      onClick={() => openInquiryModal({ itemTitle: p.title, itemType: 'Product', price: `$${p.priceUSD || 99}` })}
                      className="px-5 py-2.5 bg-[#111] hover:bg-violet-600 border border-white/10 hover:border-violet-400 text-stone-200 hover:text-white font-mono text-[9px] font-black uppercase tracking-wider transition-all duration-300 rounded-xl cursor-pointer"
                    >
                      ACQUIRE LICENSE
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Marquee */}
      <ScrollReveal>
        <SocialProofMarquee />
      </ScrollReveal>

      {/* TECH STACK MARQUEE */}
      <ScrollReveal>
        <section id="marquee-section" className="w-full">
          <Marquee />
        </section>
      </ScrollReveal>

      {/* 5. PROJECTS GALLERY - Proof of Work */}
      <section id="work-gallery-section" className="py-24 bg-[#050505] border-t border-b border-white/10">
        <ProjectGallery />
      </section>

      {/* 6. BUSINESS POSITIONING & IIT PATNA PEDIGREE */}
      <section id="positioning-section" className="py-20 sm:py-28 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-stone-400 font-sans text-[9px] uppercase tracking-[0.25em] font-black block">
            ✦ STRATEGIC VALUE ALIGNMENT
          </span>
          <StaggeredHeading as="h2" className="text-2xl xs:text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mt-3 uppercase leading-none">
            Business Position &amp; <span className="font-serif italic font-normal text-violet-600 lowercase">specialty</span> niches
          </StaggeredHeading>
          <p className="text-stone-400 text-xs sm:text-sm mt-4 max-w-xl mx-auto leading-relaxed font-sans">
            Founded by elite IIT Patna engineers, we occupy a distinct position resolving critical business bottlenecks through high-fidelity computer systems and autonomous multi-agent pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            {nichesData.map((item) => {
              const isActive = activeNicheTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNicheTab(item.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-350 relative overflow-hidden flex items-start space-x-4 cursor-pointer ${
                    isActive
                      ? 'bg-[#050505] border-violet-500 shadow-[0_15px_30px_rgba(139,92,246,0.06)]'
                      : 'bg-[#0a0a0a] border-white/10 hover:bg-[#050505] hover:border-white/20'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-niche-bar"
                      className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-violet-600 to-rose-500"
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                  )}

                  <div className={`p-3 rounded-xl border font-sans text-xs font-black shrink-0 ${
                    isActive 
                      ? 'bg-violet-950 border-violet-600 text-violet-100' 
                      : 'bg-[#111] border-white/10 text-stone-400'
                  }`}>
                    {item.number}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-stone-400">
                      {item.tagline}
                    </span>
                    <h3 className={`font-display font-black text-sm uppercase tracking-tight ${
                      isActive ? 'text-white' : 'text-stone-300'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-stone-400 text-xs leading-relaxed normal-case line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {nichesData.map((item) => {
                if (item.id !== activeNicheTab) return null;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="h-full"
                  >
                    <CyberFrame
                      glowColor={item.accentColor as 'violet' | 'fuchsia' | 'blue'}
                      className="h-full flex flex-col justify-between p-8 md:p-10 bg-[#050505] border border-white/10 shadow-lg relative overflow-hidden"
                    >
                      <div 
                        className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40 transition-all duration-500"
                        style={{ backgroundColor: item.glowColor }}
                      />

                      <div className="space-y-6 relative z-10 text-left">
                        <div className="flex justify-between items-start">
                          <span className={`px-3 py-1 border text-[10px] font-sans uppercase font-extrabold tracking-widest rounded-full ${item.badgeClass}`}>
                            {item.tag}
                          </span>
                          <span className="text-stone-400 font-sans text-[10px] uppercase font-extrabold tracking-widest">
                            Active Specialization
                          </span>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-none">
                            {item.title}
                          </h3>
                          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed normal-case">
                            {item.desc}
                          </p>
                        </div>

                        <div className="space-y-2.5 pt-2">
                          <span className="text-[10px] font-sans uppercase font-black tracking-widest text-stone-400 block">
                            Key Niches &amp; Specialty Areas:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.niches.map((niche, nIdx) => (
                              <div key={nIdx} className="flex items-center space-x-2 bg-[#0a0a0a] border border-white/10 px-3.5 py-2.5 rounded-xl shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                                <span className="text-stone-350 text-xs font-semibold normal-case leading-tight">
                                  {niche}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 border-t border-white/10 pt-6 flex justify-between items-baseline relative z-10 font-sans">
                        <div>
                          <div className="text-3xl font-display font-black text-white tracking-tighter leading-none">
                            {item.metric}
                          </div>
                          <div className="text-[9px] text-stone-400 tracking-wider font-black uppercase mt-1">
                            {item.metricLabel}
                          </div>
                        </div>
                        <span className="text-[10px] text-violet-500 font-black uppercase tracking-widest">
                          Certified Framework
                        </span>
                      </div>
                    </CyberFrame>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 7. MANIFESTO & CORE ENGINEERING PILLARS */}
      <section id="manifesto-section" className="py-20 sm:py-28 px-4 md:px-8 max-w-4xl mx-auto border-b border-white/10 text-center">
        <ScrollReveal>
          <CyberFrame glowColor="fuchsia" className="space-y-6 sm:space-y-8 p-8 sm:p-12 md:p-16 rounded-2xl bg-[#050505] border border-white/10 shadow-xl">
            <Cpu size={32} className="mx-auto text-violet-600 sm:w-10 sm:h-10 animate-pulse" />
            <StaggeredHeading as="h2" className="text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-[1.05] tracking-tight uppercase text-white">
              We build <span className="font-serif italic font-normal text-violet-600 lowercase">scalable</span> <HandDrawnCircle color="stroke-violet-500/85">architectures</HandDrawnCircle>, <br className="hidden sm:block" />
              not <span className="font-serif italic font-normal text-rose-500 lowercase">fragile</span> <HandDrawnUnderline color="stroke-rose-400/85">prototypes</HandDrawnUnderline>.
            </StaggeredHeading>
            <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] text-stone-400 uppercase font-black">
              ✦ OUR CORE PRINCIPLES
            </p>
          </CyberFrame>
        </ScrollReveal>
      </section>

      {/* BRAND ARCHITECTURAL NOTES / STRATEGIC DECK */}
      <section id="architectural-notes-deck" className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10 relative overflow-hidden md:overflow-visible">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-white/10 pointer-events-none" />
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-stone-400 font-sans text-[9px] uppercase tracking-[0.25em] font-black block">✦ DEVIL LABS STANDARDS</span>
          <StaggeredHeading as="h3" className="text-2xl xs:text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight mt-3 leading-none">
            Our Design &amp; <span className="font-serif italic font-normal text-rose-600 lowercase">engineering</span> pillars
          </StaggeredHeading>
          <p className="text-stone-300 text-xs sm:text-sm mt-4 max-w-lg mx-auto leading-relaxed font-sans">
            A breakdown of our commitment to performance, security, and world-class user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative items-start w-full mx-auto">
          <div className="hidden lg:block absolute left-[29%] top-6 w-[12%] h-[40px] z-20">
            <HandDrawnArrow color="stroke-violet-300/70" direction="right" className="w-full h-full" />
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-sans text-stone-400 uppercase tracking-wider font-extrabold">Workflow</span>
          </div>
          
          <div className="hidden lg:block absolute left-[62%] top-16 w-[12%] h-[40px] z-20">
            <HandDrawnArrow color="stroke-rose-300/70" direction="right" className="w-full h-full" />
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-sans text-stone-400 uppercase tracking-wider font-extrabold">Validation</span>
          </div>

          <BlueprintStickyNote
            number="01"
            title="ULTRA-FAST PERFORMANCE"
            rotation={-2}
            badgeColor="bg-violet-600 text-white"
            notes={[
              "Clean code optimization ensures lightweight builds and instant page loads.",
              "Pre-rendering critical content guarantees seamless, immediate visual delivery.",
              "Global server networks deliver responsive interactions to users everywhere."
            ]}
          />
          <BlueprintStickyNote
            number="02"
            title="ENTERPRISE SECURITY"
            rotation={1.5}
            badgeColor="bg-rose-500 text-white"
            notes={[
              "Secure server endpoints keep your sensitive data and API credentials protected.",
              "Comprehensive data validation shields your systems from security vulnerabilities.",
              "Subtle visual feedback provides instant confirmation for key user actions."
            ]}
          />
          <BlueprintStickyNote
            number="03"
            title="GUARANTEED RELIABILITY"
            rotation={-1.2}
            badgeColor="bg-amber-500 text-stone-950 font-black"
            notes={[
              "Intelligent verification ensures AI outputs remain accurate and helpful.",
              "Hardware-accelerated animations create smooth, natural transitions without layout shifts.",
              "Redundant server failovers ensure uninterrupted, 24/7 system availability."
            ]}
          />
        </div>
      </section>

      {/* 8. INDUSTRY SOLUTIONS */}
      <ScrollReveal>
        <div>
          <IndustrySolutions />
        </div>
      </ScrollReveal>

      {/* 9. DELIVERABLE CAPABILITIES SPECIFICATIONS */}
      <ScrollReveal>
        <section id="deliverable-capabilities-marquee" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <PolishedFeatureMarquee />
        </section>
      </ScrollReveal>

      {/* 10. BLOGS & INSIGHTS SHOWCASE */}
      <section id="blogs-showcase-section" className="py-24 bg-[#050505] border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-stone-400 font-sans text-[9px] uppercase tracking-[0.25em] font-black block">✦ INTELLECTUAL INSIGHTS</span>
            <h2 className="text-white font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight uppercase leading-none">
              tech logs &amp; <span className="font-serif italic font-normal text-violet-500 lowercase">whitepapers</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans max-w-lg mx-auto">
              In-depth analysis of agentic workflows, edge optimization, and microservice infrastructure architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayBlogs.map((b: any, idx) => (
              <motion.div 
                key={b.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.015 }}
                onClick={() => navigate('/resources')}
                className="group bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-violet-500/40 hover:shadow-violet-600/5 transition-all duration-350 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail cover */}
                  <div className="aspect-[16/10] overflow-hidden bg-stone-900 border-b border-white/10 relative">
                    <img 
                      src={b.image} 
                      alt={b.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
                    <span className="absolute bottom-4 left-4 bg-stone-900/90 border border-white/10 px-2.5 py-0.5 rounded-md text-[8px] font-mono font-bold text-stone-300 tracking-wider">
                      {b.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-[9px] font-mono text-stone-400">
                      <div className="flex items-center space-x-1">
                        <Clock size={10} />
                        <span>{b.readTime || '5 min read'}</span>
                      </div>
                      <span>•</span>
                      <span>{b.date || 'Aug 02, 2026'}</span>
                    </div>

                    <h3 className="text-white font-display font-extrabold text-base tracking-tight leading-snug group-hover:text-violet-400 transition-colors text-left uppercase">
                      {b.title}
                    </h3>

                    <p className="text-stone-350 text-xs leading-relaxed font-sans font-normal text-left line-clamp-3">
                      {b.description || b.content}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between text-[9px] font-mono text-stone-400">
                  <span>BY {b.author.toUpperCase()}</span>
                  <span className="text-violet-400 group-hover:translate-x-1.5 transition-transform flex items-center space-x-1 font-bold">
                    <span>READ ARTICLE</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA SECTION */}
      <section id="landing-cta-section" className="py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/10 px-4 md:px-8 relative overflow-hidden">
        {/* Soft elegant highlights */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-stone-800 via-transparent to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-stone-800 via-transparent to-transparent" />

        <ScrollReveal className="max-w-4xl mx-auto">
          <div className="text-center relative z-10 space-y-10">
            <span className="text-violet-500 font-sans text-xs uppercase tracking-widest font-black">✦ START YOUR PROJECT</span>
            <StaggeredHeading as="h2" className="text-3xl xs:text-4xl sm:text-6xl font-display font-extrabold text-white uppercase tracking-tighter">
              Ready to scale?<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                Let's build.
              </span>
            </StaggeredHeading>
            <p className="text-stone-300 max-w-lg mx-auto text-sm leading-relaxed font-sans">
              Enter your email below to schedule a discovery call with our engineering team. We'll get back to you within 24 hours.
            </p>

            <form id="email-intake-form" onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <input
                  id="intake-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="HELLO@COMPANY.COM"
                  className="w-full px-5 py-4 text-white font-sans text-xs tracking-wider focus:outline-none focus:border-violet-300 transition-all rounded-full bg-[#050505] border border-white/10 shadow-inner uppercase placeholder-stone-400 font-bold"
                  disabled={loading || submitted}
                />
              </div>
              <button
                id="intake-submit-btn"
                type="submit"
                disabled={loading || submitted}
                className="w-full sm:w-auto px-8 py-4 clay-violet-solid font-sans font-extrabold text-xs uppercase tracking-widest rounded-full whitespace-nowrap flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>SENDING...</span>
                ) : submitted ? (
                  <span className="flex items-center space-x-1">
                    <Check size={14} className="text-white" />
                    <span>RECEIVED</span>
                  </span>
                ) : (
                  <>
                    <span>GET IN TOUCH</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {submitted && (
              <motion.p
                id="intake-success-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-sans text-emerald-400 bg-emerald-50 border border-emerald-150 max-w-sm mx-auto py-2.5 px-4 rounded-full shadow-sm font-semibold"
              >
                Thank you. We'll be in touch shortly.
              </motion.p>
            )}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

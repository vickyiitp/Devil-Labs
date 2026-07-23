import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Zap, Cpu, Code2, Check, ArrowRight, X, FileText, ArrowDown, Terminal, Volume2, VolumeX, Radio, Music, TrendingUp, DollarSign, Activity, Sparkles, Sliders } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { audioEngine } from '../lib/audio';
import Marquee from '../components/Marquee';
import SocialProofMarquee from '../components/SocialProofMarquee';
import ProjectGallery from '../components/ProjectGallery';
import HeroVideoPlayer from '../components/HeroVideoPlayer';
import HeroChat from '../components/HeroChat';
import CyberFrame from '../components/CyberFrame';
import IndustrySolutions from '../components/IndustrySolutions';
import ScrollReveal from '../components/ScrollReveal';
import ArchedHeroCarousel from '../components/ArchedHeroCarousel';
import PolishedFeatureMarquee from '../components/PolishedFeatureMarquee';
import Magnetic from '../components/Magnetic';
import { HandDrawnCircle, HandDrawnUnderline, HandDrawnArrow, BlueprintStickyNote } from '../components/AestheticAnnotation';
import Creative3DStage from '../components/Creative3DStage';
import TypographySpecimen from '../components/TypographySpecimen';

const nichesData = [
  {
    id: 'pedigree',
    number: '01',
    title: 'ELITE ENGINEERING PEDIGREE',
    tagline: 'DEEP TECH R&D FROM IIT PATNA',
    tag: 'IIT PATNA CO-FOUNDERS',
    desc: 'Founded by elite engineers from IIT Patna, Devil Labs injects academic rigors, sophisticated data structures, and highly optimized computer science principles directly into commercial applications.',
    metric: 'IIT Patna',
    metricLabel: 'FOUNDER ALMA MATER',
    niches: [
      'Bespoke Enterprise Web Architectures',
      'Complex Mathematical & Data Pipelines',
      'Advanced Custom Bundle Optimizations'
    ],
    accentColor: 'violet',
    badgeClass: 'bg-violet-100 text-violet-700 border-violet-200',
    glowColor: 'rgba(139, 92, 246, 0.25)',
    blueprint: {
      title: 'SYS_ENGINE_MODEL.C',
      lines: [
        '#include <iitp_core.h>',
        'void initialize_node() {',
        '  allocate_high_velocity_cache();',
        '  verify_pointer_integrity();',
        '  optimize_tree_branches(ROOT);',
        '}'
      ]
    }
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
    badgeClass: 'bg-rose-100 text-rose-700 border-rose-200',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    blueprint: {
      title: 'AGENT_ORCHESTRATOR.TS',
      lines: [
        'import { AgentCore } from "devil-ai";',
        'const orchestrator = new AgentCore({',
        '  concurrency: 5,',
        '  evalMode: "sandbox_strict",',
        '  fallback: "graceful_degrade"',
        '});'
      ]
    }
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
    blueprint: {
      title: 'DOCKER_SCALE_PLAN.YAML',
      lines: [
        'services:',
        '  app_server:',
        '    build: .',
        '    deploy:',
        '      replicas: 4',
        '      update_config:',
        '        order: start-first'
      ]
    }
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
  const [showBanner, setShowBanner] = useState(false);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [consoleTab, setConsoleTab] = useState<'3d' | 'roi'>('3d');
  const [activeNicheTab, setActiveNicheTab] = useState('pedigree');
  
  // Interactive Business / Client ROI Metrics Simulation
  const [mau, setMau] = useState(80000); // Monthly Active Users scale
  const [budget, setBudget] = useState(25000); // Current Monthly IT / Cloud Budget
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(audioEngine.getMuteState());
  }, []);

  const toggleMute = () => {
    audioEngine.playClick();
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const playHoverSound = () => {
    audioEngine.playHover();
  };

  const playSpatialHoverSound = (e: React.MouseEvent) => {
    const clientX = e.clientX;
    const screenWidth = window.innerWidth || 1920;
    // Map screen position to stereo panning range [-1.0, 1.0]
    const panValue = (clientX / screenWidth) * 2 - 1;
    audioEngine.playHapticHover(panValue);
  };

  const playClickSound = () => {
    audioEngine.playClick();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }, 1200);
  };

  return (
    <div id="landing-page-root" className="pt-16 xs:pt-20 sm:pt-20 lg:pt-24">
      {/* 1. HERO SECTION WITH INTEGRATED PORTAL AND AUDIO ENGINE */}
      <section 
        id="hero-section" 
        onMouseMove={(e) => {
          const container = e.currentTarget;
          const rect = container.getBoundingClientRect();
          const x = Math.round(e.clientX - rect.left);
          const y = Math.round(e.clientY - rect.top);
          
          container.style.setProperty('--mouse-x', `${x}px`);
          container.style.setProperty('--mouse-y', `${y}px`);
          container.style.setProperty('--spotlight-radius', '190px');
          
          setCoords({ x, y });
          if (!isHoveringHero) {
            setIsHoveringHero(true);
          }
        }}
        onMouseLeave={(e) => {
          const container = e.currentTarget;
          container.style.setProperty('--mouse-x', '50%');
          container.style.setProperty('--mouse-y', '45%');
          container.style.setProperty('--spotlight-radius', '120px');
          setIsHoveringHero(false);
        }}
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '45%',
          '--spotlight-radius': '120px',
        } as React.CSSProperties}
        className="relative flex flex-col justify-center px-4 md:px-8 pb-12 pt-4 md:pb-16 md:pt-0 overflow-hidden min-h-[calc(100vh-96px)] lg:h-[calc(100vh-112px)] lg:max-h-[740px] lg:min-h-[580px]"
      >
        {/* Dynamic Background Portal Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* Base Layer: Warm cream with elegant soft gradients */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#f5f4ef] via-[#faf9f5] to-[#f5f4ef]">
            {/* Soft floating blur shapes inside for a cozy, organic aesthetic */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-3xl" />
          </div>
          
          {/* Smooth dotted grid pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e1d8_1px,transparent_1.5px)] bg-[size:3rem_3rem] opacity-70" />

          {/* Masked Foreground Layer: Interactive Image Revealed Under the Spotlight (Pointer Position) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: `circle(var(--spotlight-radius, 120px) at var(--mouse-x, 50%) var(--mouse-y, 45%))`,
              WebkitClipPath: `circle(var(--spotlight-radius, 120px) at var(--mouse-x, 50%) var(--mouse-y, 45%))`,
              transition: 'clip-path 0.12s cubic-bezier(0.16, 1, 0.3, 1), -webkit-clip-path 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* A gorgeous liquid aesthetic abstract colorful art vector revealed in the portal */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 scale-105"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1600&q=80')`,
                opacity: 0.9
              }}
            />
            {/* Ambient colorful filter over the image inside the spotlight circular portal */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-300/40 via-transparent to-rose-300/40 mix-blend-color-burn" />
            
            {/* Interactive portal border highlight */}
            <div 
              className="absolute inset-0 border border-violet-400/50 pointer-events-none rounded-full"
              style={{
                width: 'calc(var(--spotlight-radius, 120px) * 2)',
                height: 'calc(var(--spotlight-radius, 120px) * 2)',
                left: 'calc(var(--mouse-x, 50%) - var(--spotlight-radius, 120px))',
                top: 'calc(var(--mouse-y, 45%) - var(--spotlight-radius, 120px))',
                boxShadow: '0 8px 30px rgba(124, 58, 237, 0.25), inset 0 0 20px rgba(124, 58, 237, 0.15)',
                transition: 'left 0.12s cubic-bezier(0.16, 1, 0.3, 1), top 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>

          {/* Soft vignette to blend background edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,#f5f4ef_98%)] pointer-events-none" />
        </div>

        <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4 md:px-8">
          
          {/* LEFT COLUMN: Deep Technical Value Engine & Strategic Business Hook */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="lg:col-span-7 space-y-6 lg:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left relative"
          >
            
            {/* Elegant, minimalist business positioning badge tag */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="flex items-center space-x-2 bg-[#faf8f5]/90 border border-stone-200/40 px-4 py-2 rounded-full shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                <span className="text-stone-800 font-sans text-[9px] font-extrabold uppercase tracking-[0.2em]">
                  DEVIL LABS • DIGITAL INNOVATION
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-violet-50/85 to-rose-50/85 border border-violet-100/40 px-4 py-2 rounded-full shadow-xs">
                <span className="text-xs">🎓</span>
                <span className="text-violet-700 font-sans text-[9px] font-extrabold uppercase tracking-widest">
                  IIT Patna Co-Founders
                </span>
              </div>
            </div>

            {/* Strategic Value Pillar Selector Switcher */}
            <div className="w-full flex flex-col lg:items-start items-center">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center p-1.5 bg-[#f0ede6]/70 border border-stone-200/50 rounded-full shadow-[inset_1px_1px_3px_rgba(0,0,0,0.04),_inset_-1px_-1px_3px_#ffffff]"
              >
                <button
                  onMouseEnter={playSpatialHoverSound}
                  onClick={() => { playClickSound(); setHeroMode('ai'); }}
                  className={`relative px-6 py-2.5 text-[10px] sm:text-[11px] font-sans font-bold tracking-widest rounded-full transition-all duration-300 cursor-pointer ${heroMode === 'ai' ? 'text-violet-700 font-extrabold' : 'text-stone-500 hover:text-stone-800'}`}
                >
                  {heroMode === 'ai' && (
                    <motion.div layoutId="pill-bg" className="absolute inset-0 bg-[#fcfbf9] border border-stone-200/40 rounded-full shadow-xs" />
                  )}
                  <span className="relative z-10 uppercase">Cognitive AI Agents</span>
                </button>
                <button
                  onMouseEnter={playSpatialHoverSound}
                  onClick={() => { playClickSound(); setHeroMode('web'); }}
                  className={`relative px-6 py-2.5 text-[10px] sm:text-[11px] font-sans font-bold tracking-widest rounded-full transition-all duration-300 cursor-pointer ${heroMode === 'web' ? 'text-violet-700 font-extrabold' : 'text-stone-500 hover:text-stone-800'}`}
                >
                  {heroMode === 'web' && (
                    <motion.div layoutId="pill-bg" className="absolute inset-0 bg-[#fcfbf9] border border-stone-200/40 rounded-full shadow-xs" />
                  )}
                  <span className="relative z-10 uppercase">High-Velocity Web</span>
                </button>
              </motion.div>
            </div>

            {/* Headline with Staggered Kinetic Reveal & Deep Positioning */}
            <div className="min-h-[160px] sm:min-h-[180px] md:min-h-[210px] lg:min-h-[220px] flex flex-col justify-center w-full lg:items-start items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroMode}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.12 }
                    },
                    exit: {
                      opacity: 0,
                      transition: { staggerChildren: 0.08, staggerDirection: -1 }
                    }
                  }}
                  className="space-y-4 w-full flex flex-col lg:items-start items-center"
                >

                  <motion.h1 
                    className="text-[1.25rem] xs:text-[1.55rem] sm:text-[2.8rem] leading-[0.95] md:text-[3.8rem] lg:text-[3.6rem] xl:text-[4.5rem] font-display font-black tracking-normal xs:tracking-tight sm:tracking-tight uppercase break-words flex flex-col lg:items-start items-center text-center lg:text-left w-full max-w-full text-stone-900 overflow-hidden"
                  >
                    {heroMode === 'ai' ? (
                      <>
                        <span className="block max-w-full overflow-hidden py-0.5">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%" },
                              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.2 } }
                            }}
                            className="inline-block max-w-full break-words text-stone-900"
                          >
                            GOVERN COMPLEXITY
                          </motion.span>
                        </span>
                        <span className="block max-w-full overflow-hidden py-0.5">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%" },
                              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.2 } }
                            }}
                            className="inline-block max-w-full break-words text-stone-900"
                          >
                            WITH AUTONOMOUS
                          </motion.span>
                        </span>
                        <span className="block max-w-full overflow-hidden py-0.5">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%" },
                              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.16 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.2 } }
                            }}
                            className="inline-block max-w-full break-words text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 font-extrabold"
                          >
                            COGNITIVE AGENTS.
                          </motion.span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="block max-w-full overflow-hidden py-0.5">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%" },
                              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.2 } }
                            }}
                            className="inline-block max-w-full break-words text-stone-900"
                          >
                            SCALE HIGH-VELOCITY
                          </motion.span>
                        </span>
                        <span className="block max-w-full overflow-hidden py-0.5">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%" },
                              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.2 } }
                            }}
                            className="inline-block max-w-full break-words text-stone-900"
                          >
                            SECURED ENTERPRISE
                          </motion.span>
                        </span>
                        <span className="block max-w-full overflow-hidden py-0.5">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%" },
                              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.16 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.2 } }
                            }}
                            className="inline-block max-w-full break-words text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 font-extrabold"
                          >
                            ARCHITECTURES.
                          </motion.span>
                        </span>
                      </>
                    )}
                  </motion.h1>

                  {/* Editorial Serif taglines to ground the storytelling */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 5 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                    }}
                    className="font-serif italic text-stone-500 text-sm sm:text-base leading-relaxed tracking-wide text-center lg:text-left flex items-center space-x-2 pt-1"
                  >
                    <span>“</span>
                    <span>
                      {heroMode === 'ai' 
                        ? 'Intelligent automation systems for enterprise operations' 
                        : 'Custom web platforms with instant response times'}
                    </span>
                    <span>”</span>
                  </motion.div>

                  <motion.p 
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                      exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
                    }}
                    className="text-stone-600 text-xs sm:text-sm md:text-base max-w-2xl font-sans leading-relaxed tracking-wide text-center lg:text-left"
                  >
                    {heroMode === 'ai' ? (
                      "We build intelligent, resilient multi-agent AI systems that automate complex workflows. Built with rigorous engineering principles from IIT Patna, our platforms streamline operations with high accuracy and data privacy."
                    ) : (
                      "We build secure, high-performance web applications and enterprise platforms tailored to your business goals. Powered by modern cloud infrastructure, we deliver ultra-fast load times and seamless user experiences."
                    )}
                  </motion.p>

                  {/* Premium founder signature & co-founder badge */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
                      exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
                    }}
                    className="flex items-center space-x-3.5 pt-2 w-full justify-center lg:justify-start"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-tr from-stone-950 to-stone-850 flex items-center justify-center text-[#faf8f5] text-[10px] font-sans font-black tracking-wider shadow-md border border-stone-800">
                      VK
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] font-extrabold text-stone-900 tracking-wider uppercase font-sans">Vicky Kumar</div>
                      <div className="text-[9px] text-stone-500 font-semibold tracking-wider uppercase leading-none mt-1 font-sans">Co-Founder, Devil Labs • B.Tech, Computer Science (IIT Patna)</div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* STRATEGIC TRUST MATRIX - High-Contrast Bento Block Grid */}
            <div className="w-full pt-6 border-t border-stone-200/55 text-left">
              <span className="text-[9px] font-sans font-black uppercase text-stone-400 tracking-[0.25em] block mb-4">
                ✦ DEVIL LABS ADVANTAGE
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                <div className="bg-[#fcfbf9]/70 border border-stone-200/40 p-5 rounded-2xl flex flex-col justify-between hover:border-violet-300/60 hover:bg-white transition-all duration-300 shadow-xs group">
                  <div>
                    <span className="text-[9px] font-sans font-black text-violet-600 block mb-2 tracking-[0.1em]">
                      01 • ACADEMIC EXCELLENCE
                    </span>
                    <h4 className="text-stone-900 font-display font-extrabold text-sm uppercase tracking-tight mb-1.5 group-hover:text-violet-600 transition-colors">
                      IIT Patna CS
                    </h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-sans font-normal mt-1">
                    Rigorous engineering standards and clean, efficient software design.
                  </p>
                </div>

                <div className="bg-[#fcfbf9]/70 border border-stone-200/40 p-5 rounded-2xl flex flex-col justify-between hover:border-rose-300/60 hover:bg-white transition-all duration-300 shadow-xs group">
                  <div>
                    <span className="text-[9px] font-sans font-black text-rose-500 block mb-2 tracking-[0.1em]">
                      02 • RELIABILITY &amp; SLA
                    </span>
                    <h4 className="text-stone-900 font-display font-extrabold text-sm uppercase tracking-tight mb-1.5 group-hover:text-rose-500 transition-colors">
                      99.9% Uptime
                    </h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-sans font-normal mt-1">
                    Reliable systems built to perform consistently under heavy workload.
                  </p>
                </div>

                <div className="bg-[#fcfbf9]/70 border border-stone-200/40 p-5 rounded-2xl flex flex-col justify-between hover:border-amber-400/40 hover:bg-white transition-all duration-300 shadow-xs group">
                  <div>
                    <span className="text-[9px] font-sans font-black text-amber-600 block mb-2 tracking-[0.1em]">
                      03 • SPEED &amp; PERFORMANCE
                    </span>
                    <h4 className="text-stone-900 font-display font-extrabold text-sm uppercase tracking-tight mb-1.5 group-hover:text-amber-600 transition-colors">
                      Instant Load
                    </h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed font-sans font-normal mt-1">
                    Global distribution ensures instant page loads and smooth interactions.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 w-full sm:w-auto"
              >
                <button
                  onMouseEnter={playSpatialHoverSound}
                  onClick={() => { playClickSound(); window.dispatchEvent(new CustomEvent('open-initialize-modal')); }}
                  className="w-full sm:w-auto px-6 py-3 clay-violet-solid font-sans font-bold text-xs tracking-wider rounded-full flex items-center justify-center space-x-2.5 cursor-pointer hover:scale-102 transition-transform duration-300 shadow-sm"
                >
                  <span>Start Your Project</span>
                  <ArrowRight size={13} className="stroke-[2.5]" />
                </button>
              </motion.div>
              
              {/* Streamlined hover action reminder */}
              <div className="flex items-center space-x-2 text-stone-500 font-sans text-[11px]">
                <div className={`w-1.5 h-1.5 rounded-full ${isHoveringHero ? 'bg-violet-600 animate-pulse' : 'bg-stone-300'}`} />
                <span>{isHoveringHero ? 'Interactive preview active.' : 'Explore our interactive features below.'}</span>
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Portfolio & Process Video Walkthrough Engine */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 60, rotateX: 12, rotateY: 10, transformPerspective: 1200 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.2 }}
            style={{ transformStyle: "preserve-3d" }}
            className="lg:col-span-5 w-full max-w-xl mx-auto relative z-10"
          >
            <Creative3DStage playClick={playClickSound} playHover={playHoverSound} />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5"
        >
          <span className="text-stone-500 font-sans text-[9px] uppercase tracking-widest font-extrabold">Scroll</span>
          <ArrowDown size={12} className="text-stone-400 animate-bounce" />
        </motion.div>
      </section>

      {/* 1.5. DETACHED HERO CAROUSEL SHOWCASE WITH PORTAL & SPATIAL AUDIO EFFECTS */}
      <section 
        id="hero-carousel-section" 
        onMouseMove={(e) => {
          const container = e.currentTarget;
          const rect = container.getBoundingClientRect();
          const x = Math.round(e.clientX - rect.left);
          const y = Math.round(e.clientY - rect.top);
          
          container.style.setProperty('--mouse-x', `${x}px`);
          container.style.setProperty('--mouse-y', `${y}px`);
          container.style.setProperty('--spotlight-radius', '210px');
          
          // Spatial panning haptic audio feedback
          const clientX = e.clientX;
          const screenWidth = window.innerWidth || 1920;
          const panValue = (clientX / screenWidth) * 2 - 1;
          audioEngine.playHapticHover(panValue);
        }}
        onMouseLeave={(e) => {
          const container = e.currentTarget;
          container.style.setProperty('--mouse-x', '50%');
          container.style.setProperty('--mouse-y', '50%');
          container.style.setProperty('--spotlight-radius', '130px');
        }}
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--spotlight-radius': '130px',
        } as React.CSSProperties}
        className="relative bg-gradient-to-b from-[#f5f4ef] to-[#faf9f5] py-16 sm:py-24 overflow-hidden border-b border-stone-200/20"
      >
        {/* Dynamic Background Portal Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* Smooth dotted grid pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e1d8_1px,transparent_1.5px)] bg-[size:3rem_3rem] opacity-70" />

          {/* Masked Foreground Layer: Interactive Image/Grid Revealed Under the Spotlight (Pointer Position) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: `circle(var(--spotlight-radius, 130px) at var(--mouse-x, 50%) var(--mouse-y, 50%))`,
              WebkitClipPath: `circle(var(--spotlight-radius, 130px) at var(--mouse-x, 50%) var(--mouse-y, 50%))`,
              transition: 'clip-path 0.12s cubic-bezier(0.16, 1, 0.3, 1), -webkit-clip-path 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* A beautiful violet/rose fluid artwork revealed in the portal spotlight */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 scale-105"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80')`,
                opacity: 0.85
              }}
            />
            {/* Lens filter over image inside the spotlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-transparent to-rose-500/30 mix-blend-color-burn" />
            
            {/* Interactive portal border highlight */}
            <div 
              className="absolute inset-0 border border-violet-400/50 pointer-events-none rounded-full"
              style={{
                width: 'calc(var(--spotlight-radius, 130px) * 2)',
                height: 'calc(var(--spotlight-radius, 130px) * 2)',
                left: 'calc(var(--mouse-x, 50%) - var(--spotlight-radius, 130px))',
                top: 'calc(var(--mouse-y, 50%) - var(--spotlight-radius, 130px))',
                boxShadow: '0 8px 40px rgba(139, 92, 246, 0.3), inset 0 0 25px rgba(139, 92, 246, 0.2)',
                transition: 'left 0.12s cubic-bezier(0.16, 1, 0.3, 1), top 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>

          {/* Soft vignette to blend background edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,#f5f4ef_98%)] pointer-events-none" />
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10 px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto space-y-4">
            <span className="text-stone-400 font-sans text-[9px] uppercase tracking-[0.25em] font-black block">✦ CURATED LABS DISCIPLINES</span>
            <h3 className="text-stone-900 font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight uppercase leading-none break-words max-w-full">
              curated <span className="font-serif italic font-normal text-violet-600 lowercase">premium</span> disciplines
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-sans">
              A harmonious spectrum of high-end design capabilities. No cookie-cutter templates. Every element is crafted to reflect top-trending visual standard structures.
            </p>
          </div>
          <ArchedHeroCarousel />
        </div>
      </section>

      {/* Social Proof Marquee */}
      <ScrollReveal>
        <SocialProofMarquee />
      </ScrollReveal>

      {/* Viewport Overlay Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-[#fcfbf9]/95 backdrop-blur-xl border border-stone-200/50 rounded-2xl p-4 shadow-[10px_10px_30px_rgba(45,38,32,0.12),-10px_-10px_30px_#ffffff] z-50 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4 pl-2">
              <FileText className="text-violet-600" size={20} />
              <p className="text-stone-800 text-sm font-medium">
                Ready to deploy? <span className="text-stone-500 font-normal">Execute prompt setup.</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => { setShowBanner(false); window.dispatchEvent(new CustomEvent('open-initialize-modal')); }} className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-rose-500 text-white text-xs font-bold rounded-full shadow-sm hover:scale-102 transition-all">
                Get Started
              </button>
              <button onClick={() => setShowBanner(false)} className="p-2 text-stone-400 hover:text-stone-700 transition-colors rounded-full hover:bg-stone-100">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. TECH STACK MARQUEE */}
      <ScrollReveal>
        <section id="marquee-section" className="w-full">
          <Marquee />
        </section>
      </ScrollReveal>

      {/* NEW: THE MANIFESTO SECTION */}
      <section id="manifesto-section" className="py-24 sm:py-32 px-4 md:px-8 max-w-4xl mx-auto border-b border-stone-200/40 text-center">
        <ScrollReveal>
          <CyberFrame glowColor="fuchsia" className="space-y-6 sm:space-y-8 p-8 sm:p-12 md:p-16 rounded-2xl bg-[#fcfbf9]">
            <Cpu size={32} className="mx-auto text-violet-500/50 sm:w-10 sm:h-10 animate-pulse" />
            <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-[1.05] tracking-tight uppercase text-stone-900 break-words max-w-full">
              We build <span className="font-serif italic font-normal text-violet-600 lowercase">scalable</span> <HandDrawnCircle color="stroke-violet-500/85">architectures</HandDrawnCircle>, <br className="hidden sm:block" />
              not <span className="font-serif italic font-normal text-rose-500 lowercase">fragile</span> <HandDrawnUnderline color="stroke-rose-400/85">prototypes</HandDrawnUnderline>. <br/>
            </h2>
            <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] text-stone-400 uppercase font-black">
              ✦ OUR CORE PRINCIPLES
            </p>
          </CyberFrame>
        </ScrollReveal>
      </section>

      {/* BRAND ARCHITECTURAL NOTES / STRATEGIC DECK */}
      <section id="architectural-notes-deck" className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto border-b border-stone-200/40 relative overflow-hidden md:overflow-visible">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-stone-200/60 pointer-events-none" />
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-stone-400 font-sans text-[9px] uppercase tracking-[0.25em] font-black block">✦ DEVIL LABS STANDARDS</span>
          <h3 className="text-2xl xs:text-3xl sm:text-5xl font-display font-extrabold uppercase text-stone-900 tracking-tight mt-3 leading-none break-words max-w-full">
            Our Design &amp; <span className="font-serif italic font-normal text-rose-500 lowercase">engineering</span> pillars
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm mt-4 max-w-lg mx-auto leading-relaxed font-sans">
            A breakdown of our commitment to performance, security, and world-class user experiences.
          </p>
        </div>

        {/* Blueprint sticky notes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 relative items-start">
          {/* Curly Arrow pointing from note 1 to note 2 */}
          <div className="hidden lg:block absolute left-[29%] top-6 w-[12%] h-[40px] z-20">
            <HandDrawnArrow color="stroke-violet-300/70" direction="right" className="w-full h-full" />
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-sans text-stone-400 uppercase tracking-wider font-extrabold">Workflow</span>
          </div>
          
          {/* Curly Arrow pointing from note 2 to note 3 */}
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
              "Subtle audio feedback provides instant confirmation for key user actions."
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

      {/* 3. BUSINESS POSITIONING & CORE OPERATIONAL NICHES */}
      <section id="positioning-section" className="py-24 sm:py-32 px-4 md:px-8 max-w-7xl mx-auto border-b border-stone-200/40">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-stone-400 font-sans text-[9px] uppercase tracking-[0.25em] font-black block">
            ✦ STRATEGIC VALUE ALIGNMENT
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-display font-extrabold text-stone-900 tracking-tight mt-3 uppercase leading-none break-words max-w-full">
            Business Position &amp; <span className="font-serif italic font-normal text-violet-600 lowercase">specialty</span> niches
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-4 max-w-xl mx-auto leading-relaxed font-sans">
            Founded by elite IIT Patna engineers, we occupy a distinct position resolving critical business bottlenecks through high-fidelity computer systems and autonomous multi-agent pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT COLUMN: Segment Selection (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            {nichesData.map((item) => {
              const isActive = activeNicheTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    playClickSound();
                    setActiveNicheTab(item.id);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-start space-x-4 cursor-pointer ${
                    isActive
                      ? 'bg-white border-violet-200 shadow-[0_15px_30px_rgba(139,92,246,0.06)]'
                      : 'bg-[#faf9f5]/50 border-stone-200/40 hover:bg-white hover:border-stone-300'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Left border active highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="active-niche-bar"
                      className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-violet-600 to-rose-500"
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                  )}

                  <div className={`p-3 rounded-xl border font-sans text-xs font-black shrink-0 ${
                    isActive 
                      ? 'bg-violet-50 border-violet-100 text-violet-700' 
                      : 'bg-stone-100/60 border-stone-200/40 text-stone-500'
                  }`}>
                    {item.number}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-stone-400">
                      {item.tagline}
                    </span>
                    <h3 className={`font-display font-black text-sm uppercase tracking-tight ${
                      isActive ? 'text-stone-850' : 'text-stone-500'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-stone-550 text-xs leading-relaxed normal-case line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Dynamic Blueprint & Detailed Specifications (lg:col-span-7) */}
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
                      className="h-full flex flex-col justify-between p-8 md:p-10 bg-[#fcfbf9] relative overflow-hidden"
                    >
                      {/* Decorative background portal glow representing the selected segment */}
                      <div 
                        className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40 transition-all duration-500"
                        style={{ backgroundColor: item.glowColor }}
                      />

                      <div className="space-y-6 relative z-10 text-left">
                        {/* Badges / Header */}
                        <div className="flex justify-between items-start">
                          <span className={`px-3 py-1 border text-[10px] font-sans uppercase font-extrabold tracking-widest rounded-full ${item.badgeClass}`}>
                            {item.tag}
                          </span>
                          <span className="text-stone-400 font-sans text-[10px] uppercase font-extrabold tracking-widest">
                            Active Specialization
                          </span>
                        </div>

                        {/* Title and main desc */}
                        <div className="space-y-3">
                          <h3 className="font-display font-black text-2xl sm:text-3xl text-stone-850 tracking-tight uppercase leading-none">
                            {item.title}
                          </h3>
                          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed normal-case">
                            {item.desc}
                          </p>
                        </div>

                        {/* Niche list covered */}
                        <div className="space-y-2.5 pt-2">
                          <span className="text-[10px] font-sans uppercase font-black tracking-widest text-stone-450 block">
                            Key Niches &amp; Specialty Areas:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.niches.map((niche, nIdx) => (
                              <div key={nIdx} className="flex items-center space-x-2 bg-[#fcfbf9]/60 border border-stone-200/30 px-3.5 py-2.5 rounded-xl shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                                <span className="text-stone-700 text-xs font-semibold normal-case leading-tight">
                                  {niche}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Stat summary */}
                      <div className="mt-8 border-t border-stone-200/40 pt-6 flex justify-between items-baseline relative z-10 font-sans">
                        <div>
                          <div className="text-3xl font-display font-black text-stone-850 tracking-tighter leading-none">
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

      {/* 3.5. INDUSTRY SOLUTIONS */}
      <ScrollReveal>
        <div>
          <IndustrySolutions />
        </div>
      </ScrollReveal>

      {/* NEW: DELIVERABLE CAPABILITIES SPECIFICATIONS */}
      <ScrollReveal>
        <section id="deliverable-capabilities-marquee" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <PolishedFeatureMarquee />
        </section>
      </ScrollReveal>

      {/* 4. RECENT WORK TEASER */}
      <ScrollReveal>
        <section id="recent-work-section" className="py-24 sm:py-32 px-4 md:px-8 max-w-7xl mx-auto">
          <ProjectGallery />
        </section>
      </ScrollReveal>

      {/* TYPOGRAPHY SYSTEM SPECIMEN SHOWCASE */}
      <ScrollReveal>
        <section id="typography-specimen-section">
          <TypographySpecimen />
        </section>
      </ScrollReveal>

      {/* 5. FINAL CTA SECTION */}
      <section id="landing-cta-section" className="py-24 sm:py-32 bg-[#f5f4ef] border-t border-stone-200/40 px-4 md:px-8 relative overflow-hidden">
        {/* Soft elegant linear highlights */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-stone-200/40 via-transparent to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-stone-200/40 via-transparent to-transparent" />

        <ScrollReveal className="max-w-4xl mx-auto">
          <div className="text-center relative z-10 space-y-10">
            <span className="text-violet-600 font-sans text-xs uppercase tracking-widest font-black">✦ START YOUR PROJECT</span>
            <h2 className="text-3xl xs:text-4xl sm:text-6xl font-display font-extrabold text-stone-800 uppercase tracking-tighter break-words max-w-full">
              Ready to scale?<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-rose-500">
                Let's build.
              </span>
            </h2>
            <p className="text-stone-600 max-w-lg mx-auto text-sm leading-relaxed font-sans">
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
                  className="w-full px-5 py-4 text-stone-800 font-sans text-xs tracking-wider focus:outline-none focus:border-violet-300/40 transition-all rounded-full clay-inset uppercase placeholder-stone-400 font-bold"
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
                className="text-xs font-sans text-emerald-700 bg-emerald-50 border border-emerald-150 max-w-sm mx-auto py-2.5 px-4 rounded-full shadow-sm font-semibold"
              >
                Thank you. We'll be in touch shortly.
              </motion.p>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* Floating Ambient Controller */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 clay-card rounded-full px-4 py-3 pointer-events-auto p-6 md:p-8">
        <div className="flex items-center space-x-1.5 mr-2 border-r border-stone-200/50 pr-3 select-none font-sans">
          <span className={`w-1.5 h-1.5 rounded-full bg-violet-500 ${!isMuted ? 'animate-pulse' : 'opacity-40'}`} />
          <span className="text-[8px] text-stone-500 tracking-[0.2em] uppercase font-black">AMBIENT</span>
        </div>
        <button
          onMouseEnter={playHoverSound}
          onClick={toggleMute}
          className={`flex items-center space-x-2 transition-all duration-300 cursor-pointer ${
            !isMuted 
              ? 'text-violet-600 hover:text-violet-800' 
              : 'text-stone-400 hover:text-stone-600'
          }`}
          aria-label="Toggle mute"
        >
          {!isMuted ? (
            <div className="flex items-center space-x-2">
              <Volume2 size={13} className="animate-bounce" />
              <div className="h-3 flex items-end space-x-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <span 
                    key={i} 
                    className="w-[2px] bg-violet-500 rounded-t-[1px]"
                    style={{
                      height: `${30 + Math.sin(i * 1.5) * 20 + Math.random() * 50}%`,
                      animation: `shimmer 0.6s ease-in-out infinite alternate`,
                      animationDelay: `${i * 0.08}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <VolumeX size={13} />
          )}
        </button>
      </div>

      {/* RAG AI Assistant Chat */}
      <HeroChat />
    </div>
  );
}


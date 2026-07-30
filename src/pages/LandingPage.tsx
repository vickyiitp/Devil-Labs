import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Zap, Cpu, Code2, Check, ArrowRight, X, FileText, ArrowDown, Terminal, Volume2, VolumeX, Radio, Music, TrendingUp, DollarSign, Activity, Sparkles, Sliders } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { audioEngine } from '../lib/audio';
import Marquee from '../components/Marquee';
import SocialProofMarquee from '../components/SocialProofMarquee';
import ProjectGallery from '../components/ProjectGallery';
import HeroVideoPlayer from '../components/HeroVideoPlayer';
import CyberFrame from '../components/CyberFrame';
import IndustrySolutions from '../components/IndustrySolutions';
import ScrollReveal from '../components/ScrollReveal';
import ArchedHeroCarousel from '../components/ArchedHeroCarousel';
import PolishedFeatureMarquee from '../components/PolishedFeatureMarquee';
import Magnetic from '../components/Magnetic';
import { HandDrawnCircle, HandDrawnUnderline, HandDrawnArrow, BlueprintStickyNote } from '../components/AestheticAnnotation';
import Creative3DStage from '../components/Creative3DStage';
import TypographySpecimen from '../components/TypographySpecimen';
import AEOKnowledgeHub from '../components/AEOKnowledgeHub';
import RecentUpdates from '../components/RecentUpdates';

import StaggeredHeading from '../components/StaggeredHeading';

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
    badgeClass: 'bg-violet-950/60 text-violet-300 border-violet-200',
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
    badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-200',
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
        className="relative flex flex-col justify-center px-4 md:px-8 overflow-hidden min-h-[90vh] bg-[#050505] text-white"
      >
        {/* Dynamic Background Portal Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* Spotlight glow effect */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50"
            style={{
              background: `radial-gradient(var(--spotlight-radius, 120px) circle at var(--mouse-x, 50%) var(--mouse-y, 45%), rgba(225, 29, 72, 0.25), transparent 80%)`,
            }}
          />
          {/* Edge shadow for smooth blending */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_100%)] pointer-events-none opacity-90" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,#000000_98%)] pointer-events-none" />
        </div>

        <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start px-4 md:px-8">
          
          {/* LEFT COLUMN: Deep Technical Value Engine & Strategic Business Hook */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="lg:col-span-7 space-y-6 lg:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left relative"
          >
            
            
            {/* Value Proposition Toggle */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex items-center bg-[#111]/80 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-xl">
              <button onClick={() => { playClickSound(); setHeroMode("ai"); }} className={`px-5 py-2 rounded-full text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-widest transition-all duration-300 relative ${heroMode === 'ai' ? 'text-white' : 'text-stone-400 hover:text-stone-200'}`}>
                {heroMode === 'ai' && (
                  <motion.div layoutId="hero-toggle-bg" className="absolute inset-0 bg-violet-600 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)]" />
                )}
                <span className="relative z-10">Cognitive AI Agents</span>
              </button>
              <button onClick={() => { playClickSound(); setHeroMode("web"); }} className={`px-5 py-2 rounded-full text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-widest transition-all duration-300 relative ${heroMode === 'web' ? 'text-white' : 'text-stone-400 hover:text-stone-200'}`}>
                {heroMode === 'web' && (
                  <motion.div layoutId="hero-toggle-bg" className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
                )}
                <span className="relative z-10">High-Velocity Web</span>
              </button>
            </motion.div>

            <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[170px] flex flex-col justify-center w-full lg:items-start items-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={heroMode}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0, scale: 0.98 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      transition: { staggerChildren: 0.12, ease: "easeOut", duration: 0.5 }
                    },
                    exit: {
                      opacity: 0,
                      scale: 0.98,
                      transition: { staggerChildren: 0.08, staggerDirection: -1, ease: "easeIn", duration: 0.3 }
                    }
                  }}
                  className="space-y-4 w-full flex flex-col lg:items-start items-center max-w-4xl py-2"
                >

                  <motion.h1 
                    className="text-[1.35rem] xs:text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.2rem] xl:text-[4.2rem] leading-[1.02] font-display font-black tracking-tight uppercase flex flex-col lg:items-start items-center text-center lg:text-left w-full max-w-full text-white"
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
                            className="inline-block max-w-full text-white font-extrabold"
                          >
                            BUILD
                          </motion.span>
                        </span>
                        <span className="block max-w-full overflow-hidden py-0.5">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%" },
                              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.2 } }
                            }}
                            className="inline-block max-w-full text-white font-extrabold"
                          >
                            INTELLIGENT
                          </motion.span>
                        </span>
                        <span className="block max-w-full overflow-hidden py-0.5">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%" },
                              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.16 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.2 } }
                            }}
                            className="inline-block max-w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-[length:200%_auto] text-shimmer font-extrabold drop-shadow-[0_0_25px_rgba(99,102,241,0.5)]"
                          >
                            SYSTEMS.
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
                            className="inline-block max-w-full text-white font-extrabold"
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
                            className="inline-block max-w-full text-white font-extrabold"
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
                            className="inline-block max-w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-[length:200%_auto] text-shimmer font-extrabold drop-shadow-[0_0_25px_rgba(99,102,241,0.5)]"
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
                    className="font-serif italic text-stone-200 text-sm sm:text-base leading-relaxed tracking-wide text-center lg:text-left flex items-center space-x-2 pt-1 [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]"
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
                    className="text-stone-200 text-xs sm:text-sm md:text-base max-w-2xl font-sans leading-relaxed tracking-wide text-center lg:text-left [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]"
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
                    <img src="https://github.com/vickyiitp.png?size=80" alt="Vicky Kumar" className="flex-shrink-0 w-10 h-10 rounded-full shadow-md border border-stone-800 object-cover" />
                    <div className="text-left">
                      <div className="text-[11px] font-extrabold text-white tracking-wider uppercase font-sans">Vicky Kumar</div>
                      <div className="text-[9px] text-stone-400 font-semibold tracking-wider uppercase leading-none mt-1 font-sans">Co-Founder, Devil Labs • CS Student (IIT Patna)</div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* STRATEGIC TRUST MATRIX - High-Contrast Bento Block Grid */}
            <div className="w-full pt-6 border-t border-white/10 text-left">
              <h2 className="text-[10px] font-sans font-black uppercase text-stone-300 tracking-[0.25em] block mb-4">
                ✦ DEVIL LABS ADVANTAGE
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                <div className="bg-[#050505]/85 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-violet-400 hover:bg-[#0a0a0a] transition-all duration-300 shadow-xl group">
                  <div>
                    <span className="text-[9px] font-sans font-black text-violet-400 block mb-2 tracking-[0.1em]">
                      01 • ACADEMIC EXCELLENCE
                    </span>
                    <h3 className="text-white font-display font-extrabold text-sm uppercase tracking-tight mb-1.5 group-hover:text-violet-400 transition-colors">
                      IIT Patna CS
                    </h3>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed font-sans font-normal mt-1">
                    Rigorous engineering standards and clean, efficient software design.
                  </p>
                </div>

                <div className="bg-[#050505]/85 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-rose-400 hover:bg-[#0a0a0a] transition-all duration-300 shadow-xl group">
                  <div>
                    <span className="text-[9px] font-sans font-black text-rose-400 block mb-2 tracking-[0.1em]">
                      02 • RELIABILITY &amp; SLA
                    </span>
                    <h3 className="text-white font-display font-extrabold text-sm uppercase tracking-tight mb-1.5 group-hover:text-rose-400 transition-colors">
                      99.9% Uptime
                    </h3>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed font-sans font-normal mt-1">
                    Reliable systems built to perform consistently under heavy workload.
                  </p>
                </div>

                <div className="bg-[#050505]/85 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-amber-400 hover:bg-[#0a0a0a] transition-all duration-300 shadow-xl group">
                  <div>
                    <span className="text-[9px] font-sans font-black text-amber-400 block mb-2 tracking-[0.1em]">
                      03 • SPEED &amp; PERFORMANCE
                    </span>
                    <h3 className="text-white font-display font-extrabold text-sm uppercase tracking-tight mb-1.5 group-hover:text-amber-400 transition-colors">
                      Instant Load
                    </h3>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed font-sans font-normal mt-1">
                    Global distribution ensures instant page loads and smooth interactions.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action Row */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full">
              {/* Soft responsive gradient overlay for readability against varying backgrounds */}
              <div className="absolute -inset-x-4 -inset-y-6 sm:-inset-y-8 sm:-inset-x-8 bg-[radial-gradient(ellipse_at_center,rgba(12,10,9,0.9)_0%,rgba(12,10,9,0.5)_50%,transparent_100%)] blur-xl -z-10 pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 w-full sm:w-auto"
              >
                <button
                  onMouseEnter={playSpatialHoverSound}
                  onClick={() => { playClickSound(); window.dispatchEvent(new CustomEvent('open-initialize-modal')); }}
                  className="group relative w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-sans font-bold text-xs tracking-widest uppercase rounded-full flex items-center justify-center space-x-3 cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Initialize Project</span>
                    <ArrowRight size={14} className="stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                </button>
              </motion.div>
              
              {/* Streamlined hover action reminder */}
              <div className="flex items-center space-x-2 text-stone-400 font-sans text-[11px]">
                <div className={`w-1.5 h-1.5 rounded-full ${isHoveringHero ? 'bg-violet-600 animate-pulse' : 'bg-white/20'}`} />
                <span>{isHoveringHero ? 'Interactive preview active.' : 'Explore our interactive features below.'}</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Portfolio & Process Video Walkthrough Engine */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 80, rotateX: 20, rotateY: -15, transformPerspective: 1200 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.15 }}
            style={{ transformStyle: "preserve-3d" }}
            className="lg:col-span-5 w-full max-w-xl mx-auto relative z-10 lg:self-start lg:-mt-12"
          >
            <Creative3DStage playClick={playClickSound} playHover={playHoverSound} />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none"
        >
          <span className="text-stone-400 font-sans text-[9px] uppercase tracking-[0.3em] font-extrabold opacity-60">Scroll</span>
          <ArrowDown size={14} className="text-stone-400 animate-bounce opacity-80" />
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
        className="relative bg-[#0a0a0a] py-16 sm:py-24 overflow-hidden border-b border-white/10"
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
            {/* Cinematic Background Images revealed in the portal */}
            {/* Removed HeroImageSlider */}
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,#0a0a0e_98%)] pointer-events-none" />
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10 px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto space-y-4">
            <span className="text-stone-300 font-sans text-[9px] uppercase tracking-[0.25em] font-black block">✦ CURATED LABS DISCIPLINES</span>
            <h2 className="text-white font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight uppercase leading-none">
              curated <span className="font-serif italic font-normal text-violet-500 lowercase">premium</span> disciplines
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-sans">
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

      {/* TECH STACK MARQUEE */}
      <ScrollReveal>
        <section id="marquee-section" className="w-full">
          <Marquee />
        </section>
      </ScrollReveal>

      {/* 1. RECENT SYSTEM UPDATES & CHANGELOG */}
      <ScrollReveal>
        <RecentUpdates />
      </ScrollReveal>

      {/* 2. FEATURED PROJECTS SHOWCASE */}
      <ScrollReveal>
        <section id="recent-work-section" className="py-20 sm:py-28 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10">
          <ProjectGallery />
        </section>
      </ScrollReveal>


      {/* 4. BUSINESS POSITIONING & IIT PATNA PEDIGREE */}
      <section id="positioning-section" className="py-24 sm:py-32 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10">
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
                <motion.button
                  key={item.id}
                  onClick={() => {
                    playClickSound();
                    setActiveNicheTab(item.id);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-start space-x-4 cursor-pointer ${
                    isActive
                      ? 'bg-[#050505] border-violet-200 shadow-[0_15px_30px_rgba(139,92,246,0.06)]'
                      : 'bg-[#0a0a0a] border-white/10 hover:bg-[#050505] hover:border-white/20'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
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
                </motion.button>
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
                                <span className="text-stone-300 text-xs font-semibold normal-case leading-tight">
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

      {/* 5. MANIFESTO & CORE ENGINEERING PILLARS */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 relative items-start w-full mx-auto">
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

      {/* 6. INDUSTRY SOLUTIONS */}
      <ScrollReveal>
        <div>
          <IndustrySolutions />
        </div>
      </ScrollReveal>

      {/* 7. DELIVERABLE CAPABILITIES SPECIFICATIONS */}
      <ScrollReveal>
        <section id="deliverable-capabilities-marquee" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <PolishedFeatureMarquee />
        </section>
      </ScrollReveal>

      {/* 8. AEO & GEO KNOWLEDGE & TRUST HUB SECTION */}
      <ScrollReveal>
        <section id="aeo-knowledge-section" className="bg-[#050505] border-t border-white/10">
          <AEOKnowledgeHub />
        </section>
      </ScrollReveal>

      {/* 9. TYPOGRAPHY SYSTEM SPECIMEN SHOWCASE */}
      <ScrollReveal>
        <section id="typography-specimen-section">
          <TypographySpecimen />
        </section>
      </ScrollReveal>

      {/* 5. FINAL CTA SECTION */}
      <section id="landing-cta-section" className="py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/10 px-4 md:px-8 relative overflow-hidden">
        {/* Soft elegant linear highlights */}
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


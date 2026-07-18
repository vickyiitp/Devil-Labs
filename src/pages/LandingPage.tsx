import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Zap, Cpu, Code2, Check, ArrowRight, X, FileText, ArrowDown, Terminal, Volume2, VolumeX, Radio, Music, TrendingUp, DollarSign, Activity } from 'lucide-react';
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

  const valueProps = [
    {
      title: "SPEED",
      metric: "10x",
      tagline: "FASTER DEPLOYMENT",
      desc: "Our optimized deployment architecture leverages advanced server-side cache structures with Edge Content Delivery Networks (CDNs), optimized resource pre-loading, and responsive visual layout caching. This reduces network round-trip delays, maximizing Time-To-First-Byte (TTFB) and ensuring instantaneous visual rendering globally."
    },
    {
      title: "ARCHITECTURE",
      metric: "99.99%",
      tagline: "RELIABLE INFRASTRUCTURE",
      desc: "Every system is engineered using rigid, Typescript-based structures, compiled using hyper-fast modern bundlers, and packed into minimal, secure Docker containers. Deployments on scalable cloud nodes are protected by active load balancers, automated database failovers, and instant container warm-up triggers."
    },
    {
      title: "INTELLIGENCE",
      metric: "AUTONOMOUS",
      tagline: "AI INTEGRATION",
      desc: "Our autonomous solutions operate through sophisticated multi-agent pipelines powered by state-of-the-art LLMs. We construct responsive, sandboxed validation systems that evaluate intermediate outputs, ensuring high-fidelity, deterministic context orchestration and workflow control."
    }
  ];

  return (
    <div id="landing-page-root" className="pt-20 xs:pt-24 sm:pt-24 lg:pt-32">
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
        className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 pb-12 pt-2 md:pb-24 md:pt-0 overflow-hidden min-h-[100dvh] md:min-h-[90vh]"
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

        <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4 sm:px-6 lg:px-8">
          
          {/* LEFT COLUMN: Deep Technical Value Engine & Strategic Business Hook */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="lg:col-span-7 space-y-8 md:space-y-10 flex flex-col items-center lg:items-start text-center lg:text-left relative"
          >
            
            {/* Elegant, minimalist badge tag */}
            <div className="flex items-center space-x-3 text-stone-600 font-sans text-xs font-semibold tracking-wider uppercase bg-[#faf8f5]/85 border border-stone-200/40 px-4 py-2 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
              <span>Devil Labs Design &amp; Technology Partner</span>
            </div>

            {/* Dual Mode Selector Pill */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center p-1 bg-[#f0ede6] border border-stone-200/40 rounded-full shadow-[inset_2px_2px_5px_rgba(0,0,0,0.03),_inset_-2px_-2px_5px_#ffffff]"
            >
              <button
                onMouseEnter={playSpatialHoverSound}
                onClick={() => { playClickSound(); setHeroMode('ai'); }}
                className={`relative px-6 sm:px-8 py-3 text-xs font-sans font-bold tracking-wide rounded-full transition-all duration-300 ${heroMode === 'ai' ? 'text-violet-700' : 'text-stone-500 hover:text-stone-800'}`}
              >
                {heroMode === 'ai' && (
                  <motion.div layoutId="pill-bg" className="absolute inset-0 bg-[#fcfbf9] border border-stone-200/30 rounded-full shadow-md" />
                )}
                <span className="relative z-10 uppercase">AI Automation</span>
              </button>
              <button
                onMouseEnter={playSpatialHoverSound}
                onClick={() => { playClickSound(); setHeroMode('web'); }}
                className={`relative px-6 sm:px-8 py-3 text-xs font-sans font-bold tracking-wide rounded-full transition-all duration-300 ${heroMode === 'web' ? 'text-violet-700' : 'text-stone-500 hover:text-stone-800'}`}
              >
                {heroMode === 'web' && (
                  <motion.div layoutId="pill-bg" className="absolute inset-0 bg-[#fcfbf9] border border-stone-200/30 rounded-full shadow-md" />
                )}
                <span className="relative z-10 uppercase">Enterprise Web Apps</span>
              </button>
            </motion.div>

            {/* Headline with Staggered Kinetic Reveal */}
            <div className="min-h-[140px] sm:min-h-[160px] md:min-h-[220px] flex flex-col justify-center w-full lg:items-start items-center">
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
                    className="text-[1.8rem] xs:text-[2.2rem] sm:text-[3.2rem] leading-[1.05] md:text-[4rem] lg:text-[3.6rem] xl:text-[4.6rem] font-display font-black tracking-tighter uppercase break-words flex flex-col lg:items-start items-center text-center lg:text-left w-full text-stone-800"
                  >
                    {heroMode === 'ai' ? (
                      <>
                        <span className="block overflow-hidden py-1">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%", rotate: 2 },
                              show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.02 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.25, ease: "easeIn" } }
                            }}
                            className="inline-block text-stone-800 origin-center"
                          >
                            ENGINEERING
                          </motion.span>
                        </span>
                        <span className="block overflow-hidden py-1">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%", rotate: 2 },
                              show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.25, ease: "easeIn" } }
                            }}
                            className="inline-block text-stone-800 origin-center"
                          >
                            AUTONOMOUS
                          </motion.span>
                        </span>
                        <span className="block overflow-hidden py-1">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%", rotate: 2 },
                              show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.25, ease: "easeIn" } }
                            }}
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 origin-center"
                          >
                            INTELLIGENCE.
                          </motion.span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="block overflow-hidden py-1">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%", rotate: 2 },
                              show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.02 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.25, ease: "easeIn" } }
                            }}
                            className="inline-block text-stone-800 origin-center"
                          >
                            SCALING
                          </motion.span>
                        </span>
                        <span className="block overflow-hidden py-1">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%", rotate: 2 },
                              show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.25, ease: "easeIn" } }
                            }}
                            className="inline-block text-stone-800 origin-center"
                          >
                            HIGH-VELOCITY
                          </motion.span>
                        </span>
                        <span className="block overflow-hidden py-1">
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: "105%", rotate: 2 },
                              show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 } },
                              exit: { opacity: 0, y: "-100%", transition: { duration: 0.25, ease: "easeIn" } }
                            }}
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 origin-center"
                          >
                            INFRASTRUCTURE.
                          </motion.span>
                        </span>
                      </>
                    )}
                  </motion.h1>
                  <motion.p 
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                      exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
                    }}
                    className="text-stone-600 text-sm sm:text-base md:text-lg max-w-2xl font-sans leading-relaxed tracking-wide text-center lg:text-left"
                  >
                    We engineer bleeding-edge digital ecosystems, ultra-secure full-stack microservices, and autonomous multi-agent systems designed to resolve critical operational friction, streamline deployment velocity, and scale robust containerized infrastructures.
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sub-Layout Action Row with clean indicator tokens */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 pt-6 border-t border-stone-200/50 w-full">
              
              {/* Refined clean layout badges instead of bullet points */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 font-sans text-xs font-semibold text-stone-600"
              >
                <div className="flex items-center space-x-2 bg-[#fcfbf9]/95 border border-stone-200/50 px-3.5 py-2 rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                  <span>Intelligent AI Agents</span>
                </div>
                <div className="flex items-center space-x-2 bg-[#fcfbf9]/95 border border-stone-200/50 px-3.5 py-2 rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>High-Speed Web Platforms</span>
                </div>
                <div className="flex items-center space-x-2 bg-[#fcfbf9]/95 border border-stone-200/50 px-3.5 py-2 rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Secure Scale-Ready Code</span>
                </div>
              </motion.div>

              {/* Redesigned Start a Project Action Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0"
              >
                <button
                  onMouseEnter={playSpatialHoverSound}
                  onClick={() => { playClickSound(); window.dispatchEvent(new CustomEvent('open-initialize-modal')); }}
                  className="px-8 py-3.5 clay-violet-solid font-sans font-bold text-xs sm:text-sm tracking-wider rounded-full flex items-center justify-center space-x-3 cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <ArrowRight size={15} className="stroke-[2.5]" />
                </button>
              </motion.div>
            </div>
            
            {/* Streamlined hover action reminder */}
            <div className="pt-2 flex items-center justify-center lg:justify-start space-x-2 text-stone-500 font-sans text-xs w-full">
              <div className={`w-1.5 h-1.5 rounded-full ${isHoveringHero ? 'bg-violet-600 animate-pulse' : 'bg-stone-300'}`} />
              <span>{isHoveringHero ? 'Image portal unlocked. Exploring preview window.' : 'Gently move your cursor to explore our high-fidelity digital portal.'}</span>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Interactive Client ROI & Impact Simulator Console */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.15 }}
            className="lg:col-span-5 w-full max-w-md mx-auto relative z-10"
          >
            <div className="clay-card rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 border border-stone-200/50 bg-[#faf9f5]/95 shadow-[12px_16px_45px_rgba(185,175,160,0.18),_-12px_-16px_45px_#ffffff] relative overflow-hidden backdrop-blur-md">
              {/* Top Accent Light bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-rose-400 to-amber-400 opacity-80" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center space-x-2">
                  <Activity size={15} className="text-violet-600 animate-pulse" />
                  <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-700">Project ROI &amp; Value Estimator</span>
                </div>
                <span className="font-sans text-[9px] sm:text-[10px] font-bold uppercase text-stone-500 bg-stone-100/90 px-2.5 py-1 rounded-full border border-stone-200/50 w-max">
                  Interactive Live Calc
                </span>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {/* Slider 1: Monthly Active Users */}
                <div className="space-y-2">
                  <div className="flex flex-col xs:flex-row justify-between xs:items-center text-[11px] sm:text-xs font-sans font-medium text-stone-700 gap-1.5">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp size={13} className="text-stone-500" />
                      Target Monthly Active Users
                    </span>
                    <span className="font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 sm:py-1 rounded-full border border-violet-100/60 text-[11px] sm:text-xs w-max self-start xs:self-auto">
                      {mau.toLocaleString()} Users
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="1000000" 
                    step="10000"
                    value={mau}
                    onChange={(e) => {
                      playClickSound();
                      setMau(parseInt(e.target.value));
                    }}
                    className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-violet-600 outline-none focus:ring-1 focus:ring-violet-400"
                  />
                  <div className="flex justify-between text-[9px] sm:text-[10px] font-sans text-stone-400 uppercase tracking-wide">
                    <span>10K Users</span>
                    <span>500K Users</span>
                    <span>1M Users</span>
                  </div>
                </div>

                {/* Slider 2: Current Tech Budget */}
                <div className="space-y-2">
                  <div className="flex flex-col xs:flex-row justify-between xs:items-center text-[11px] sm:text-xs font-sans font-medium text-stone-700 gap-1.5">
                    <span className="flex items-center gap-1.5">
                      <DollarSign size={13} className="text-stone-500" />
                      Current Monthly Tech Budget
                    </span>
                    <span className="font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 sm:py-1 rounded-full border border-rose-100/60 text-[11px] sm:text-xs w-max self-start xs:self-auto">
                      ${budget.toLocaleString()} USD
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="2000" 
                    max="150000" 
                    step="2000"
                    value={budget}
                    onChange={(e) => {
                      playClickSound();
                      setBudget(parseInt(e.target.value));
                    }}
                    className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-rose-500 outline-none focus:ring-1 focus:ring-rose-400"
                  />
                  <div className="flex justify-between text-[9px] sm:text-[10px] font-sans text-stone-400 uppercase tracking-wide">
                    <span>$2K / Month</span>
                    <span>$75K / Month</span>
                    <span>$150K / Month</span>
                  </div>
                </div>

                {/* Impact Output Screen */}
                <div className="p-4 sm:p-5 bg-stone-100/70 border border-stone-200/50 rounded-2xl space-y-4 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.02)]">
                  <div className="grid grid-cols-2 gap-4 sm:gap-5">
                    
                    {/* Metric 1 */}
                    <div className="text-left space-y-0.5">
                      <span className="font-sans text-[9px] sm:text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">Overhead Saved</span>
                      <span className="text-lg sm:text-2xl font-display font-black text-stone-850 flex items-baseline flex-wrap">
                        {Math.min(85, Math.round(62 + (mau / 12000)))}%
                        <span className="text-[9px] text-stone-500 font-semibold ml-1">LESS</span>
                      </span>
                    </div>

                    {/* Metric 2 */}
                    <div className="text-left space-y-0.5">
                      <span className="font-sans text-[9px] sm:text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">Setup Acceleration</span>
                      <span className="text-lg sm:text-2xl font-display font-black text-stone-850 flex items-baseline flex-wrap">
                        {budget < 20000 ? '4.8x' : budget < 80000 ? '10.0x' : '12.4x'}
                        <span className="text-[9px] text-stone-500 font-semibold ml-1">FASTER</span>
                      </span>
                    </div>

                    {/* Metric 3 */}
                    <div className="text-left space-y-0.5">
                      <span className="font-sans text-[9px] sm:text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">Network Delay Saved</span>
                      <span className="text-lg sm:text-2xl font-display font-black text-stone-850 flex items-baseline flex-wrap">
                        -{Math.max(12, Math.round(180 - (mau / 4500)))}ms
                        <span className="text-[9px] text-emerald-600 font-bold ml-1">FASTER</span>
                      </span>
                    </div>

                    {/* Metric 4 */}
                    <div className="text-left space-y-0.5">
                      <span className="font-sans text-[9px] sm:text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">Platform Uptime SLA</span>
                      <span className="text-lg sm:text-2xl font-display font-black text-violet-700 flex items-baseline flex-wrap">
                        99.99%
                        <span className="text-[9px] text-violet-600 font-bold ml-1">ACTIVE</span>
                      </span>
                    </div>

                  </div>

                  {/* Calculated Big Financial Result Box */}
                  <div className="border-t border-stone-200/50 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-sans text-[10px] text-stone-500 font-bold uppercase tracking-wider block mb-1">Estimated Annual Cost Reclaimed</span>
                      <span className="text-2xl sm:text-3xl font-display font-black text-stone-850">
                        ${Math.round(budget * 12 * (Math.min(85, Math.round(62 + (mau / 12000))) / 100)).toLocaleString()}
                      </span>
                    </div>
                    <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 animate-bounce shrink-0 self-end sm:self-center">
                      <TrendingUp size={16} />
                    </div>
                  </div>
                </div>

                {/* Secure Compliance Badge list inside card */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans font-medium text-stone-500 border-t border-stone-200/40 pt-4">
                  <span className="flex items-center gap-1.5">
                    <Check size={12} className="text-violet-600" />
                    Bespoke Deployments
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check size={12} className="text-rose-500" />
                    SLA Guarantees
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check size={12} className="text-amber-500" />
                    Dedicated Experts
                  </span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* Beautiful Arched Moving Circle Cards Carousel */}
        <div className="w-full max-w-[1400px] mx-auto mt-6 md:mt-10 relative z-10">
          <ArchedHeroCarousel />
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
        >
          <span className="text-stone-500 font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <ArrowDown size={14} className="text-stone-400 animate-bounce" />
        </motion.div>
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
      <section id="manifesto-section" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-stone-200/40 text-center">
        <ScrollReveal>
          <CyberFrame glowColor="fuchsia" className="space-y-6 sm:space-y-8 p-8 sm:p-12 md:p-16 rounded-2xl bg-[#fcfbf9]">
            <Cpu size={32} className="mx-auto text-violet-500/50 sm:w-10 sm:h-10" />
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight uppercase text-stone-800">
              We build <HandDrawnCircle color="stroke-violet-500/85">scalable architectures</HandDrawnCircle>, <br className="hidden sm:block" />
              not <HandDrawnUnderline color="stroke-rose-400/85">fragile prototypes</HandDrawnUnderline>. <br/>
            </h2>
            <p className="font-mono text-xs sm:text-sm tracking-widest text-stone-500 uppercase">
              ✦ Engineering Excellence
            </p>
          </CyberFrame>
        </ScrollReveal>
      </section>

      {/* BRAND ARCHITECTURAL NOTES / STRATEGIC DECK */}
      <section id="architectural-notes-deck" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-200/40 relative overflow-hidden md:overflow-visible">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-stone-200/60 pointer-events-none" />
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-bold">✦ DEVIL LABS SPECIFICATIONS DECK</span>
          <h3 className="text-2xl sm:text-4xl font-display font-black uppercase text-stone-800 tracking-tight mt-2">
            Engineering &amp; System Annotations
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            Interactive, certified layout specifications illustrating our commitment to bleeding-edge, zero-leak software principles.
          </p>
        </div>

        {/* Blueprint sticky notes grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">
          {/* Curly Arrow pointing from note 1 to note 2 */}
          <div className="hidden lg:block absolute left-[29%] top-6 w-[12%] h-[40px] z-20">
            <HandDrawnArrow color="stroke-violet-300/70" direction="right" className="w-full h-full" />
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-stone-400 uppercase tracking-wider">[Sync Link]</span>
          </div>
          
          {/* Curly Arrow pointing from note 2 to note 3 */}
          <div className="hidden lg:block absolute left-[62%] top-16 w-[12%] h-[40px] z-20">
            <HandDrawnArrow color="stroke-rose-300/70" direction="right" className="w-full h-full" />
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-stone-400 uppercase tracking-wider">[Verify Link]</span>
          </div>

          <BlueprintStickyNote
            number="01"
            title="LCP LATENCY RECLAMATION"
            rotation={-2}
            badgeColor="bg-violet-600 text-white"
            notes={[
              "Modular bundling completely strips unused ES module tree branches, reducing initial raw load size.",
              "Aggressive pre-rendering of critical layout streams minimizes Largest Contentful Paint delays.",
              "Edge node visual caching establishes worldwide server response times well under 100ms."
            ]}
          />
          <BlueprintStickyNote
            number="02"
            title="SECURE CONTEXT PIPELINE"
            rotation={1.5}
            badgeColor="bg-rose-500 text-white"
            notes={[
              "Rigid server-side endpoints proxy critical APIs, fully securing third-party secrets from browsers.",
              "Strict, RFC-compliant payload filtering shields database nodes from malicious payload injections.",
              "Stereo-panned spatial audio loops verify authentication and transaction state changes."
            ]}
          />
          <BlueprintStickyNote
            number="03"
            title="DETERMINISTIC AGENT SLA"
            rotation={-1.2}
            badgeColor="bg-amber-500 text-stone-950 font-black"
            notes={[
              "Self-correcting verification algorithms evaluate AI agent outputs deterministically in real-time.",
              "Smooth, hardware-accelerated Framer-motion layout transitions prevent layout shifts during streams.",
              "Active secondary container failovers preserve guaranteed 99.99% system availability."
            ]}
          />
        </div>
      </section>

      {/* 3. VALUE PROPOSITION */}
      <section id="values-section" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-200/40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16">
          {valueProps.map((prop, idx) => (
            <ScrollReveal
              key={prop.title}
              delay={idx * 100}
              className="h-full"
            >
              <div
                id={`value-card-${prop.title.toLowerCase()}`}
                className="group h-full"
              >
                <CyberFrame glowColor={['violet', 'fuchsia', 'blue'][idx % 3] as 'violet' | 'fuchsia' | 'blue'} className="flex flex-col justify-between p-6 sm:p-8 md:p-10 h-full bg-[#fcfbf9]">
                  <div>
                    <div className="flex justify-between items-baseline mb-6 font-mono">
                      <span className="text-stone-500 text-[10px] sm:text-xs font-semibold">{prop.tagline}</span>
                      <span className="text-violet-600 font-bold text-xs sm:text-sm">/ 0{idx + 1}</span>
                    </div>
                    <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-stone-800 mb-2 tracking-tight group-hover:text-violet-600 transition-colors duration-300">
                      {prop.title}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-4">
                      {prop.desc}
                    </p>
                  </div>
                  <div className="mt-8 font-mono text-4xl sm:text-5xl font-extrabold tracking-tighter text-stone-800/10 group-hover:text-violet-500/20 transition-all duration-300">
                    {prop.metric}
                  </div>
                </CyberFrame>
              </div>
            </ScrollReveal>
          ))}
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
        <section id="deliverable-capabilities-marquee" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          <PolishedFeatureMarquee />
        </section>
      </ScrollReveal>

      {/* 4. RECENT WORK TEASER */}
      <ScrollReveal>
        <section id="recent-work-section" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
          <ProjectGallery />
        </section>
      </ScrollReveal>

      {/* 5. FINAL CTA SECTION */}
      <section id="landing-cta-section" className="py-24 sm:py-32 bg-[#f5f4ef] border-t border-stone-200/40 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Soft elegant linear highlights */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-stone-200/40 via-transparent to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-stone-200/40 via-transparent to-transparent" />

        <ScrollReveal className="max-w-4xl mx-auto">
          <div className="text-center relative z-10 space-y-10">
            <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-semibold">✦ START YOUR PROJECT</span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-stone-800 uppercase tracking-tighter">
              Ready to scale?<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-rose-500">
                Let's build.
              </span>
            </h2>
            <p className="text-stone-600 max-w-lg mx-auto text-sm leading-relaxed">
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
                  className="w-full px-5 py-4 text-stone-800 font-mono text-xs tracking-wider focus:outline-none focus:border-violet-300/40 transition-all rounded-full clay-inset uppercase placeholder-stone-400"
                  disabled={loading || submitted}
                />
              </div>
              <button
                id="intake-submit-btn"
                type="submit"
                disabled={loading || submitted}
                className="w-full sm:w-auto px-8 py-4 clay-violet-solid font-mono font-bold text-xs uppercase tracking-widest rounded-full whitespace-nowrap flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
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
                className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-150 max-w-sm mx-auto py-2.5 px-4 rounded-full shadow-sm"
              >
                Thank you. We'll be in touch shortly.
              </motion.p>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* Floating Ambient Controller */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 clay-card rounded-full px-4 py-3 pointer-events-auto">
        <div className="flex items-center space-x-1.5 mr-2 border-r border-stone-200/50 pr-3 select-none">
          <span className={`w-1.5 h-1.5 rounded-full bg-violet-500 ${!isMuted ? 'animate-pulse' : 'opacity-40'}`} />
          <span className="font-mono text-[8px] text-stone-500 tracking-[0.2em] uppercase">AMBIENT</span>
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


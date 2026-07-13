import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Zap, Cpu, Code2, Check, ArrowRight, X, FileText, ArrowDown, Terminal, Volume2, VolumeX, Radio, Music } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { audioEngine } from '../lib/audio';
import Marquee from '../components/Marquee';
import SocialProofMarquee from '../components/SocialProofMarquee';
import ProjectGallery from '../components/ProjectGallery';
import HeroVideoPlayer from '../components/HeroVideoPlayer';
import HeroChat from '../components/HeroChat';
import CyberFrame from '../components/CyberFrame';
import IndustrySolutions from '../components/IndustrySolutions';

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
      desc: "Our optimized deployment architecture bypasses standard deployment lag, delivering ultra-performant production web systems in record time."
    },
    {
      title: "ARCHITECTURE",
      metric: "99.99%",
      tagline: "RELIABLE INFRASTRUCTURE",
      desc: "We write highly optimized, typesafe full-stack code that guarantees state durability, extreme speed, and scalable cloud container orchestration."
    },
    {
      title: "INTELLIGENCE",
      metric: "AUTONOMOUS",
      tagline: "AI INTEGRATION",
      desc: "Go beyond basic API calling. We engineer autonomous pipelines that synthesize and organize complex logic and workflows seamlessly."
    }
  ];

  return (
    <div id="landing-page-root" className="pt-28 sm:pt-24 lg:pt-32">
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
        className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 pb-16 pt-4 md:pb-24 md:pt-0 overflow-hidden min-h-[100dvh] md:min-h-[90vh]"
      >
        {/* Dynamic Background Portal Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* Base Layer: Beautiful Playing Video (Default background layer) */}
          <div className="absolute inset-0 z-0 bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-25 filter brightness-90 grayscale-[15%]"
              src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-technological-network-31626-large.mp4"
            />
            {/* Soft dark vignette gradient to keep content readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/85 to-[#050505]" />
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          
          {/* Solid glass backing to keep content completely legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/10 via-brand-dark/50 to-brand-dark" />

          {/* Masked Foreground Layer: Interactive Image Revealed Under the Spotlight (Pointer Position) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: `circle(var(--spotlight-radius, 120px) at var(--mouse-x, 50%) var(--mouse-y, 45%))`,
              WebkitClipPath: `circle(var(--spotlight-radius, 120px) at var(--mouse-x, 50%) var(--mouse-y, 45%))`,
              transition: 'clip-path 0.12s cubic-bezier(0.16, 1, 0.3, 1), -webkit-clip-path 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* The beautiful aesthetic high-res motherboard/tech image shown inside the portal */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 scale-105"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=2000&q=80')`,
                opacity: 0.95
              }}
            />
            {/* Ambient colorful filter over the image inside the spotlight circular portal */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/40 via-transparent to-fuchsia-600/40 mix-blend-color-dodge" />
            
            {/* Interactive portal border highlight */}
            <div 
              className="absolute inset-0 border border-violet-500/40 pointer-events-none rounded-full"
              style={{
                width: 'calc(var(--spotlight-radius, 120px) * 2)',
                height: 'calc(var(--spotlight-radius, 120px) * 2)',
                left: 'calc(var(--mouse-x, 50%) - var(--spotlight-radius, 120px))',
                top: 'calc(var(--mouse-y, 45%) - var(--spotlight-radius, 120px))',
                boxShadow: '0 0 50px rgba(139, 92, 246, 0.5), inset 0 0 30px rgba(139, 92, 246, 0.3)',
                transition: 'left 0.12s cubic-bezier(0.16, 1, 0.3, 1), top 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>

          {/* Vignette styling to blend background edges perfectly */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_95%)] pointer-events-none" />
        </div>

        <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center justify-center text-center space-y-10 md:space-y-12">
          
          {/* CENTER COLUMN: Deep Technical Value Engine (Spans entire width) */}
          <div className="space-y-8 md:space-y-10 w-full flex flex-col items-center text-center relative">
            
            {/* Elegant, minimalist badge tag */}
            <div className="flex items-center space-x-3 text-white/40 font-mono text-[10px] tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              <span>// DEVIL LABS OPERATIONAL PROTOCOL</span>
            </div>

            {/* Dual Mode Selector Pill */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center p-1 bg-[#090909]/90 backdrop-blur-md border border-white/5 rounded-full self-center"
            >
              <button
                onMouseEnter={playSpatialHoverSound}
                onClick={() => { playClickSound(); setHeroMode('ai'); }}
                className={`relative px-5 sm:px-7 py-2 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] rounded-full transition-colors duration-300 ${heroMode === 'ai' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
              >
                {heroMode === 'ai' && (
                  <motion.div layoutId="pill-bg" className="absolute inset-0 bg-white/5 border border-white/10 rounded-full shadow-inner" />
                )}
                <span className="relative z-10 uppercase">BUILD AI</span>
              </button>
              <button
                onMouseEnter={playSpatialHoverSound}
                onClick={() => { playClickSound(); setHeroMode('web'); }}
                className={`relative px-5 sm:px-7 py-2 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] rounded-full transition-colors duration-300 ${heroMode === 'web' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
              >
                {heroMode === 'web' && (
                  <motion.div layoutId="pill-bg" className="absolute inset-0 bg-white/5 border border-white/10 rounded-full shadow-inner" />
                )}
                <span className="relative z-10 uppercase">DEPLOY WEB</span>
              </button>
            </motion.div>

            {/* Headline with Staggered Kinetic Reveal */}
            <div className="min-h-[140px] sm:min-h-[180px] md:h-[280px] xl:h-[320px] flex flex-col justify-center w-full">
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
                  className="space-y-4 w-full flex flex-col items-center"
                >
                  <motion.h1 
                    className="text-[2.2rem] sm:text-[3.2rem] leading-[1.05] md:text-[4rem] lg:text-6xl xl:text-[5.5rem] font-display font-black tracking-tighter uppercase break-words flex flex-col items-center text-center w-full"
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
                            className="inline-block text-white origin-center"
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
                            className="inline-block text-white origin-center"
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
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-500 to-fuchsia-400 origin-center"
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
                            className="inline-block text-white origin-center"
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
                            className="inline-block text-white origin-center"
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
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-500 to-fuchsia-400 origin-center"
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
                    className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed tracking-wide text-center"
                  >
                    Designing and deploying high-fidelity digital platforms and autonomous systems for world-changing enterprises.
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sub-Layout Action Row with clean indicator tokens */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-6 border-t border-white/5 w-full">
              
              {/* Refined clean layout badges instead of bullet points */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-4 font-mono text-[9px] uppercase tracking-widest text-gray-400"
              >
                <div className="flex items-center space-x-2 bg-white/[0.03] border border-white/5 px-2.5 py-1.5 rounded-md">
                  <span className="w-1 h-1 rounded-full bg-violet-400" />
                  <span>AGENTIC SYSTEMS</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/[0.03] border border-white/5 px-2.5 py-1.5 rounded-md">
                  <span className="w-1 h-1 rounded-full bg-fuchsia-400" />
                  <span>ULTRA-PERFORMANT</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/[0.03] border border-white/5 px-2.5 py-1.5 rounded-md">
                  <span className="w-1 h-1 rounded-full bg-violet-400" />
                  <span>TYPESAFE STATE</span>
                </div>
              </motion.div>

              {/* Redesigned Start a Project Action Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onMouseEnter={playSpatialHoverSound}
                  onClick={() => { playClickSound(); navigate('/contact'); }}
                  className="px-10 py-4 bg-white text-black font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] hover:bg-violet-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-3 rounded-full shadow-[0_0_0_rgba(139,92,246,0)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] cursor-pointer"
                >
                  <span>INITIALIZE PROJECT</span>
                  <ArrowRight size={14} className="stroke-[2.5]" />
                </button>
              </motion.div>
            </div>
            
            {/* Streamlined hover action reminder */}
            <div className="pt-2 flex items-center justify-center space-x-1.5 text-gray-500 font-mono text-[8px] tracking-wider uppercase">
              <div className={`w-1 h-1 rounded-full ${isHoveringHero ? 'bg-violet-400 animate-pulse' : 'bg-gray-700'}`} />
              <span>{isHoveringHero ? 'HOVER REVEAL: IMAGE PORTAL UNLOCKED' : 'SWIPE MOUSE TO PEER THROUGH THE PHYSICAL DIMENSION'}</span>
            </div>

          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
        >
          <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <ArrowDown size={14} className="text-gray-400 animate-bounce" />
        </motion.div>
      </section>

      {/* Social Proof Marquee */}
      <SocialProofMarquee />

      {/* Viewport Overlay Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl z-50 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4 pl-2">
              <FileText className="text-violet-400" size={20} />
              <p className="text-white text-sm font-medium">
                Ready to deploy? <span className="text-gray-400 font-normal">Execute prompt setup.</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => { setShowBanner(false); navigate('/contact'); }} className="px-5 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-violet-500 hover:text-white transition-colors">
                Get Started
              </button>
              <button onClick={() => setShowBanner(false)} className="p-2 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/10">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. TECH STACK MARQUEE */}
      <section id="marquee-section" className="w-full">
        <Marquee />
      </section>

      {/* NEW: THE MANIFESTO SECTION */}
      <section id="manifesto-section" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-white/5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <CyberFrame glowColor="fuchsia" className="space-y-6 sm:space-y-8 p-8 sm:p-12 md:p-16 rounded-2xl bg-[#0a0a0a]">
            <Cpu size={32} className="mx-auto text-violet-500/50 sm:w-10 sm:h-10" />
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight uppercase">
              We build <span className="text-violet-400">scalable architectures</span>, <br className="hidden sm:block" />
              not fragile prototypes. <br/>
            </h2>
            <p className="font-mono text-xs sm:text-sm tracking-widest text-gray-500 uppercase">
              // Engineering Excellence
            </p>
          </CyberFrame>
        </motion.div>
      </section>

      {/* 3. VALUE PROPOSITION */}
      <section id="values-section" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16">
          {valueProps.map((prop, idx) => (
            <motion.div
              id={`value-card-${prop.title.toLowerCase()}`}
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group"
            >
              <CyberFrame glowColor={['violet', 'fuchsia', 'blue'][idx % 3] as 'violet' | 'fuchsia' | 'blue'} className="flex flex-col justify-between p-6 sm:p-8 md:p-10 h-full bg-[#111]">
                <div>
                  <div className="flex justify-between items-baseline mb-6 font-mono">
                    <span className="text-gray-600 text-[10px] sm:text-xs font-semibold">{prop.tagline}</span>
                    <span className="text-violet-500 font-bold text-xs sm:text-sm">/ 0{idx + 1}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-2 tracking-tight group-hover:text-violet-400 transition-colors duration-300">
                    {prop.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-4">
                    {prop.desc}
                  </p>
                </div>
                <div className="mt-8 font-mono text-4xl sm:text-5xl font-extrabold tracking-tighter text-white/10 group-hover:text-violet-500/20 transition-all duration-300">
                  {prop.metric}
                </div>
              </CyberFrame>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3.5. INDUSTRY SOLUTIONS */}
      <div>
        <IndustrySolutions />
      </div>

      {/* 4. RECENT WORK TEASER */}
      <section id="recent-work-section" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
        <ProjectGallery />
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section id="landing-cta-section" className="py-24 sm:py-32 bg-black border-t border-white/5 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Neon vertical alignment dots */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-white/10 via-transparent to-transparent" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
          <span className="text-violet-500 font-mono text-xs uppercase tracking-widest font-semibold">// START YOUR PROJECT</span>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white uppercase tracking-tighter">
            Ready to scale?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
              Let's build.
            </span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
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
                placeholder="hello@company.com"
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-violet-500 focus:outline-none px-4 py-3.5 text-white font-mono text-sm tracking-wider transition-colors placeholder-gray-600 rounded-none"
                disabled={loading || submitted}
              />
            </div>
            <button
              id="intake-submit-btn"
              type="submit"
              disabled={loading || submitted}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-violet-600 hover:text-white hover:border-violet-500 transition-all duration-300 whitespace-nowrap flex items-center justify-center space-x-2 border border-white disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>SENDING...</span>
              ) : submitted ? (
                <span className="flex items-center space-x-1">
                  <Check size={14} className="text-emerald-500" />
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
              className="text-xs font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 max-w-sm mx-auto py-2.5 px-4"
            >
              Thank you. We'll be in touch shortly.
            </motion.p>
          )}
        </div>
      </section>

      {/* Floating Ambient Controller */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/5 rounded-full px-4 py-2.5 shadow-2xl pointer-events-auto">
        <div className="flex items-center space-x-1.5 mr-2 border-r border-white/5 pr-3 select-none">
          <span className={`w-1.5 h-1.5 rounded-full bg-violet-500 ${!isMuted ? 'animate-pulse' : 'opacity-40'}`} />
          <span className="font-mono text-[8px] text-gray-400 tracking-[0.2em] uppercase">AMBIENT</span>
        </div>
        <button
          onMouseEnter={playHoverSound}
          onClick={toggleMute}
          className={`flex items-center space-x-2 transition-all duration-300 cursor-pointer ${
            !isMuted 
              ? 'text-violet-400 hover:text-white' 
              : 'text-gray-500 hover:text-white'
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
                    className="w-[2px] bg-violet-400 rounded-t-[1px]"
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

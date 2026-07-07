import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Zap, Cpu, Code2, Check, ArrowRight, X, FileText, ArrowDown, Terminal } from 'lucide-react';
import React, { useState, useEffect } from 'react';
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
    <div id="landing-page-root" className="pt-24 lg:pt-32">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 pb-16 pt-4 md:pb-24 md:pt-0 overflow-hidden min-h-[100dvh] md:min-h-[85vh] debug-box" data-debug="SEC_HERO" data-x="0" data-y="0">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

        <div className="max-w-[1600px] w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] gap-6 md:gap-12 lg:gap-24 items-center">
          
          {/* LEFT COLUMN: The Value Engine */}
          <div className="space-y-10 md:space-y-12 order-2 md:order-1 mt-8 md:mt-0">
            {/* Dual Toggle Pill */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center p-1 bg-[#111] border border-white/10 rounded-full self-start"
            >
              <button
                onClick={() => setHeroMode('ai')}
                className={`relative px-6 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.2em] rounded-full transition-colors ${heroMode === 'ai' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
              >
                {heroMode === 'ai' && (
                  <motion.div layoutId="pill-bg" className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-inner" />
                )}
                <span className="relative z-10 uppercase">Build AI</span>
              </button>
              <button
                onClick={() => setHeroMode('web')}
                className={`relative px-6 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.2em] rounded-full transition-colors ${heroMode === 'web' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
              >
                {heroMode === 'web' && (
                  <motion.div layoutId="pill-bg" className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-inner" />
                )}
                <span className="relative z-10 uppercase">Deploy Web Apps</span>
              </button>
            </motion.div>

            {/* Headline with Staggered Reveal */}
            <div className="min-h-[160px] sm:min-h-[220px] md:h-[320px] xl:h-[360px] flex flex-col justify-center">
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
                      transition: { staggerChildren: 0.15 }
                    },
                    exit: {
                      opacity: 0,
                      transition: { staggerChildren: 0.1, staggerDirection: -1 }
                    }
                  }}
                  className="space-y-6"
                >
                  <motion.h1 
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                      exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
                    }}
                    className="text-[2.5rem] sm:text-[3.5rem] leading-[1.05] md:text-[4.5rem] lg:text-7xl xl:text-[6.5rem] font-display font-black text-white tracking-tighter uppercase break-words"
                  >
                    {heroMode === 'ai' ? (
                      <>
                        Architecting <br className="hidden sm:block" />
                        Autonomous <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Intelligence.</span>
                      </>
                    ) : (
                      <>
                        Engineering <br className="hidden sm:block" />
                        High-Velocity <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Infrastructure.</span>
                      </>
                    )}
                  </motion.h1>
                  <motion.p 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                      exit: { opacity: 0, y: -10, transition: { duration: 0.4 } }
                    }}
                    className="text-gray-400 text-sm sm:text-base md:text-lg xl:text-xl max-w-xl font-sans leading-relaxed"
                  >
                    Building autonomous AI systems and scalable web infrastructure for the modern enterprise.
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 pt-4">
              {/* Core Metrics/Benefits */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-3 font-mono text-[10px] sm:text-[11px] md:text-xs uppercase tracking-widest text-gray-400 w-full xl:w-auto"
              >
                <div className="flex items-center space-x-3">
                  <Check size={14} className="text-violet-500 shrink-0" />
                  <span>Scalable Cloud Architecture</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check size={14} className="text-violet-500 shrink-0" />
                  <span>AI-Powered Workflows</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check size={14} className="text-violet-500 shrink-0" />
                  <span>Enterprise-Grade Security</span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full sm:w-auto"
              >
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-black font-mono font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-violet-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-4 rounded-xl shadow-[0_0_0_rgba(139,92,246,0)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:scale-[1.02]"
                >
                  <span>START A PROJECT</span>
                  <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                    <ArrowRight size={14} />
                  </div>
                </button>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Visual Core */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[40vh] min-h-[350px] md:h-[500px] lg:h-[600px] xl:h-[700px] order-1 md:order-2 relative group flex items-center justify-center p-4 sm:p-0 debug-box"
          >
            <HeroVideoPlayer />
          </motion.div>

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
      <section id="marquee-section" className="w-full debug-box" data-debug="SEC_MARQUEE" data-x="0" data-y="1200">
        <Marquee />
      </section>

      {/* NEW: THE MANIFESTO SECTION */}
      <section id="manifesto-section" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-white/5 text-center debug-box" data-debug="SEC_MANIFESTO" data-x="100" data-y="1400">
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
      <section id="values-section" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/5 debug-box" data-debug="SEC_VALUES" data-x="0" data-y="2100">
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
      <div data-debug="SEC_INDUSTRY" data-x="0" data-y="2600">
        <IndustrySolutions />
      </div>

      {/* 4. RECENT WORK TEASER */}
      <section id="recent-work-section" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto debug-box" data-debug="SEC_WORK" data-x="0" data-y="3000">
        <ProjectGallery />
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section id="landing-cta-section" className="py-24 sm:py-32 bg-black border-t border-white/5 px-4 sm:px-6 lg:px-8 relative overflow-hidden debug-box" data-debug="SEC_CTA" data-x="0" data-y="4500">
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

      {/* RAG AI Assistant Chat */}
      <HeroChat />
    </div>
  );
}

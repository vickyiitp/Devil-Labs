import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, SkipBack, SkipForward, Sparkles, Cpu, CreditCard, 
  TrendingUp, Bot, ShoppingCart, Heart, Activity, Compass, 
  ArrowRight, ShieldCheck, Zap, Sliders, RefreshCw, Layers, Check,
  MousePointer, DollarSign, Clock, Users, Database, Globe, Layers2
} from 'lucide-react';
import { audioEngine } from '../lib/audio';

interface Creative3DStageProps {
  playClick: () => void;
  playHover: () => void;
}

interface WalkthroughPage {
  id: string;
  name: string;
  number: string;
  tagline: string;
  description: string;
  accent: string;
  bgGradient: string;
  glowColor: string;
}

const WALKTHROUGH_PAGES: WalkthroughPage[] = [
  {
    id: 'hero',
    name: 'Hero Portal',
    number: '01',
    tagline: 'PREMIUM INTERACTIVE LANDING',
    description: 'Our flagship homepage entrypoint. Integrates smooth cursor parallax grids, clean typographic balance, and reactive micro-feedback animations designed to capture client interest.',
    accent: 'from-violet-400 to-fuchsia-500',
    bgGradient: 'from-violet-950/20 via-transparent to-fuchsia-950/10',
    glowColor: 'rgba(139,92,246,0.15)'
  },
  {
    id: 'services',
    name: 'Service Depot',
    number: '02',
    tagline: 'CLOUD SYSTEM ARCHITECTURE',
    description: 'Custom microservice dashboards presenting dynamic deployment trees, database topologies, edge CDN caching structures, and interactive node systems.',
    accent: 'from-emerald-400 to-teal-500',
    bgGradient: 'from-emerald-950/20 via-transparent to-teal-950/10',
    glowColor: 'rgba(16,185,129,0.15)'
  },
  {
    id: 'pricing',
    name: 'Pricing Flow',
    number: '03',
    tagline: 'ESTIMATE BUILD INVESTMENT',
    description: 'An interactive financial budgeting module displaying instant project timeline matrices, live engineering staffing allocations, and total cost estimators.',
    accent: 'from-amber-400 to-rose-400',
    bgGradient: 'from-amber-950/20 via-transparent to-rose-950/10',
    glowColor: 'rgba(245,158,11,0.15)'
  },
  {
    id: 'insights',
    name: 'Insights Graph',
    number: '04',
    tagline: 'REAL-TIME telemetry STACK',
    description: 'Process telemetry analytics dashboards with SVG wave calculations, active cloud server status streams, memory bars, and high-frequency data visualizers.',
    accent: 'from-cyan-400 to-blue-500',
    bgGradient: 'from-cyan-950/20 via-transparent to-blue-950/10',
    glowColor: 'rgba(6,182,212,0.15)'
  },
  {
    id: 'docking',
    name: 'Docking Station',
    number: '05',
    tagline: 'CLIENT INTAKE PROTOCOL',
    description: 'A beautifully responsive client communication terminal with secure validation pipelines, live connectivity indicators, and dynamic feedback responses.',
    accent: 'from-rose-400 to-orange-500',
    bgGradient: 'from-rose-950/20 via-transparent to-orange-950/10',
    glowColor: 'rgba(244,63,94,0.15)'
  }
];

const SECONDS_PER_SLIDE = 8;
const TOTAL_DURATION = WALKTHROUGH_PAGES.length * SECONDS_PER_SLIDE; // 40 seconds

export default function Creative3DStage({ playClick, playHover }: Creative3DStageProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0); // Slide progress (0-100)
  const stageRef = useRef<HTMLDivElement>(null);

  // Virtual Automated Cursor States for Video Mockup
  const [virtualCursor, setVirtualCursor] = useState({ x: '30%', y: '60%', visible: true, clicking: false });

  // Page Specific Simulated Interactive States
  // 01_HERO
  const [heroClickCount, setHeroClickCount] = useState(0);
  const [heroHoveredCard, setHeroHoveredCard] = useState<number | null>(null);
  
  // 02_SERVICES
  const [activeNode, setActiveNode] = useState<'cdn' | 'db' | 'api'>('cdn');
  
  // 03_PRICING (Simulating the exact uploaded image layout)
  const [pricingActiveAddon, setPricingActiveAddon] = useState<boolean>(true);
  
  // 04_INSIGHTS
  const [telemetryPulse, setTelemetryPulse] = useState(0);
  const [insightsActiveMetric, setInsightsActiveMetric] = useState<'latency' | 'bandwidth'>('latency');
  
  // 05_DOCKING
  const [contactFormStep, setContactFormStep] = useState<'idle' | 'submitting' | 'complete'>('idle');

  const activePage = WALKTHROUGH_PAGES[activeIdx];

  // Auto-playing timer core
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Advance to next page
            setActiveIdx((current) => (current + 1) % WALKTHROUGH_PAGES.length);
            return 0;
          }
          return prev + (100 / (SECONDS_PER_SLIDE * 10)); // increment 10 times a second
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeIdx]);

  // Handle virtual cursor auto-movement sequence to make it look like a video walkthrough!
  useEffect(() => {
    const cursorSequence = () => {
      if (!isPlaying) return;
      const progressSecs = (progress / 100) * SECONDS_PER_SLIDE;

      // Program the virtual mouse path according to what is currently shown
      if (activePage.id === 'hero') {
        if (progressSecs < 2) {
          setVirtualCursor({ x: '25%', y: '45%', visible: true, clicking: false });
        } else if (progressSecs >= 2 && progressSecs < 4) {
          setVirtualCursor({ x: '55%', y: '40%', visible: true, clicking: false });
          setHeroHoveredCard(0);
        } else if (progressSecs >= 4 && progressSecs < 6) {
          setVirtualCursor({ x: '75%', y: '40%', visible: true, clicking: true });
          setHeroHoveredCard(1);
          if (Math.random() > 0.7) {
            setHeroClickCount(prev => prev + 1);
            audioEngine.playHapticHover(0.05);
          }
        } else {
          setVirtualCursor({ x: '75%', y: '40%', visible: true, clicking: false });
          setHeroHoveredCard(null);
        }
      } 
      
      else if (activePage.id === 'services') {
        if (progressSecs < 2.5) {
          setVirtualCursor({ x: '35%', y: '50%', visible: true, clicking: false });
          setActiveNode('cdn');
        } else if (progressSecs >= 2.5 && progressSecs < 5) {
          setVirtualCursor({ x: '50%', y: '50%', visible: true, clicking: true });
          setActiveNode('db');
        } else if (progressSecs >= 5 && progressSecs < 7.5) {
          setVirtualCursor({ x: '65%', y: '50%', visible: true, clicking: false });
          setActiveNode('api');
        } else {
          setVirtualCursor({ x: '65%', y: '50%', visible: true, clicking: false });
        }
      } 
      
      else if (activePage.id === 'pricing') {
        if (progressSecs < 3) {
          setVirtualCursor({ x: '35%', y: '70%', visible: true, clicking: false });
        } else if (progressSecs >= 3 && progressSecs < 5.5) {
          setVirtualCursor({ x: '50%', y: '78%', visible: true, clicking: true });
          setPricingActiveAddon(true);
        } else if (progressSecs >= 5.5 && progressSecs < 7.5) {
          setVirtualCursor({ x: '50%', y: '78%', visible: true, clicking: false });
          setPricingActiveAddon(false);
        } else {
          setVirtualCursor({ x: '50%', y: '78%', visible: true, clicking: false });
        }
      } 
      
      else if (activePage.id === 'insights') {
        if (progressSecs < 3) {
          setVirtualCursor({ x: '30%', y: '35%', visible: true, clicking: false });
          setInsightsActiveMetric('latency');
        } else if (progressSecs >= 3 && progressSecs < 6) {
          setVirtualCursor({ x: '70%', y: '35%', visible: true, clicking: true });
          setInsightsActiveMetric('bandwidth');
        } else {
          setVirtualCursor({ x: '70%', y: '35%', visible: true, clicking: false });
        }
      } 
      
      else if (activePage.id === 'docking') {
        if (progressSecs < 2) {
          setVirtualCursor({ x: '40%', y: '45%', visible: true, clicking: false });
          setContactFormStep('idle');
        } else if (progressSecs >= 2 && progressSecs < 5.5) {
          setVirtualCursor({ x: '50%', y: '80%', visible: true, clicking: true });
          setContactFormStep('submitting');
        } else if (progressSecs >= 5.5) {
          setVirtualCursor({ x: '50%', y: '80%', visible: true, clicking: false });
          setContactFormStep('complete');
        }
      }
    };

    cursorSequence();
  }, [progress, activePage, isPlaying]);

  // Continuous background wave pulse for graphs
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setTelemetryPulse(prev => (prev + 1) % 360);
    }, 120);
    return () => clearInterval(pulseInterval);
  }, []);

  // Audio trigger on slide change
  useEffect(() => {
    audioEngine.playHapticHover(0.1);
  }, [activeIdx]);

  // Navigation handlers
  const handleNext = () => {
    playClick();
    setActiveIdx((prev) => (prev + 1) % WALKTHROUGH_PAGES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    playClick();
    setActiveIdx((prev) => (prev - 1 + WALKTHROUGH_PAGES.length) % WALKTHROUGH_PAGES.length);
    setProgress(0);
  };

  const handleTimelineClick = (index: number) => {
    playClick();
    setActiveIdx(index);
    setProgress(0);
  };

  const currentElapsedSeconds = (activeIdx * SECONDS_PER_SLIDE) + (progress / 100 * SECONDS_PER_SLIDE);
  
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      id="website-walkthrough-video-root" 
      className="clay-card rounded-[32px] border border-stone-200/50 bg-[#faf9f5]/95 shadow-[12px_16px_45px_rgba(185,175,160,0.18)] overflow-hidden flex flex-col h-full min-h-[520px] lg:min-h-[530px] relative text-left p-6 md:p-8"
    >
      {/* Top professional gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-400 opacity-90 z-20" />

      {/* Professional Player Top Telemetry Header */}
      <div className="p-4 sm:p-5 border-b border-stone-200/40 bg-stone-50/50 flex flex-col gap-2.5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers2 size={14} className="text-violet-600 animate-spin-slow" />
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-stone-850">
              ✦ WEB ARCHITECTURE VISUALIZER
            </span>
          </div>
          <div className="flex items-center space-x-1.5 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100/60">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-ping" />
            <span className="font-mono text-[9px] font-black uppercase text-violet-700 tracking-wide">
              ● AUTO RUNTIME PREVIEW
            </span>
          </div>
        </div>

        {/* Tab Controls representing actual website processes */}
        <div className="grid grid-cols-5 gap-1 bg-stone-100 p-0.5 rounded-xl border border-stone-200/30">
          {WALKTHROUGH_PAGES.map((page, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={page.id}
                onClick={() => handleTimelineClick(idx)}
                className={`py-1.5 text-[8px] sm:text-[9.5px] font-mono font-bold uppercase rounded-lg transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-[#fcfbf9] text-violet-700 shadow-sm border border-stone-200/40 scale-[1.01]' 
                    : 'text-stone-500 hover:text-stone-850 hover:bg-stone-50'
                }`}
              >
                {page.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Simulated Sandbox Canvas Container */}
      <div 
        ref={stageRef}
        className="flex-1 relative overflow-hidden flex flex-col justify-between p-4 sm:p-5 select-none bg-[#11100f] min-h-[290px] lg:min-h-[300px]"
        style={{
          boxShadow: `inset 0 0 50px ${activePage.glowColor}`,
          transition: 'box-shadow 0.6s ease'
        }}
      >
        {/* Real-time Web simulation backdrop grids */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e1c1a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-25 z-0 pointer-events-none" />
        
        {/* Soft elegant color orbs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[110px] pointer-events-none z-0 opacity-15 bg-gradient-to-tr from-violet-600 to-rose-500" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-[110px] pointer-events-none z-0 opacity-15 bg-gradient-to-tr from-cyan-600 to-emerald-500" />

        {/* Stage Header Info Overlay */}
        <div className="w-full flex justify-between items-start z-10 pointer-events-none">
          <div className="space-y-1">
            <span className={`font-mono text-[9px] uppercase tracking-widest font-black block bg-gradient-to-r ${activePage.accent} bg-clip-text text-transparent`}>
              WALKTHROUGH SECTION • {activePage.number}
            </span>
            <h3 className="font-display font-black text-white text-lg sm:text-2xl tracking-tight leading-none uppercase">
              {activePage.tagline}
            </h3>
          </div>
          <span className="font-mono text-[8px] text-stone-500 uppercase border border-stone-800/80 px-2 py-0.5 rounded-md bg-[#171513]/90">
            FRAME: {Math.round(currentElapsedSeconds * 24)} / {TOTAL_DURATION * 24}
          </span>
        </div>

        {/* Video Core Mockup Screen Displays */}
        <div className="flex-1 w-full flex items-center justify-center py-2.5 sm:py-3.5 z-10 relative">
          
          {/* VIRTUAL CURSOR: Mimics interactive screen capture cursor! */}
          {virtualCursor.visible && (
            <motion.div
              animate={{ 
                left: virtualCursor.x, 
                top: virtualCursor.y,
                scale: virtualCursor.clicking ? 0.85 : 1
              }}
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
              className="absolute pointer-events-none z-50 text-violet-400 drop-shadow-[0_2px_8px_rgba(139,92,246,0.5)]"
              style={{ x: '-5px', y: '-5px' }}
            >
              <MousePointer size={18} className="fill-violet-400" />
              {/* Reactive clicking shockwave ring */}
              {virtualCursor.clicking && (
                <motion.div 
                  initial={{ scale: 0.2, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-8 h-8 rounded-full border-2 border-violet-400 absolute -top-1.5 -left-1.5 pointer-events-none"
                />
              )}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            
            {/* 01 // HERO PORTAL DISPLAY */}
            {activePage.id === 'hero' && (
              <motion.div
                key="hero-stage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-[340px] bg-[#1a1715] border border-stone-800 rounded-2xl p-4 flex flex-col space-y-3 shadow-2xl relative"
              >
                {/* Hero Header Mockup */}
                <div className="flex justify-between items-center border-b border-stone-800/60 pb-2">
                  <span className="font-mono text-[8px] font-black text-white">DEVIL LABS</span>
                  <div className="flex space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                  </div>
                </div>

                {/* Simulated Floating Bento Grid Elements */}
                <div className="grid grid-cols-2 gap-2 text-left pt-1">
                  
                  {/* Bento Box 1 */}
                  <div 
                    className={`p-2.5 rounded-xl border transition-all duration-300 ${
                      heroHoveredCard === 0 
                        ? 'bg-stone-800/80 border-violet-500/40 shadow-lg scale-[1.03]' 
                        : 'bg-stone-900/60 border-stone-800'
                    }`}
                  >
                    <Sparkles size={11} className="text-violet-400 mb-1" />
                    <h4 className="font-mono text-[8px] font-black text-white leading-none uppercase">3D Motion Lab</h4>
                    <p className="text-[6px] text-stone-400 mt-1 leading-normal">Liquid interactive spatial grids.</p>
                  </div>

                  {/* Bento Box 2 */}
                  <div 
                    className={`p-2.5 rounded-xl border transition-all duration-300 ${
                      heroHoveredCard === 1 
                        ? 'bg-stone-800/80 border-fuchsia-500/40 shadow-lg scale-[1.03]' 
                        : 'bg-stone-900/60 border-stone-800'
                    }`}
                  >
                    <Activity size={11} className="text-fuchsia-400 mb-1" />
                    <h4 className="font-mono text-[8px] font-black text-white leading-none uppercase">Pure Systems</h4>
                    <p className="text-[6px] text-stone-400 mt-1 leading-normal">Optimized sub-millisecond loads.</p>
                  </div>

                </div>

                {/* Automated micro feedback counter */}
                <div className="bg-stone-950 p-2 rounded-xl border border-stone-850 flex justify-between items-center text-left">
                  <div>
                    <span className="font-mono text-[6px] text-stone-500 uppercase block">Active Sim Triggers</span>
                    <span className="font-mono text-[9px] text-emerald-400 font-bold block">{heroClickCount} clicks registered</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </motion.div>
            )}

            {/* 02 // SERVICES PORTAL */}
            {activePage.id === 'services' && (
              <motion.div
                key="services-stage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-[340px] bg-stone-950/60 border border-emerald-500/20 rounded-2xl p-4 flex flex-col space-y-3.5"
              >
                {/* Simulated service tree / CDN topology graph */}
                <div className="h-28 bg-stone-900/40 rounded-xl border border-stone-850 relative p-3 flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(#103020_1px,transparent_1px)] bg-[size:0.75rem_0.75rem] opacity-25" />
                  
                  <div className="flex justify-between items-center z-10">
                    <span className="font-mono text-[7px] text-stone-500 uppercase block leading-none">SYSTEM ARCHITECTURE MATRIX</span>
                    <span className="font-mono text-[6px] text-emerald-400 font-bold">STATUS: OK</span>
                  </div>

                  {/* Nodes diagram */}
                  <div className="flex items-center justify-around py-3 z-10 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${activeNode === 'cdn' ? 'bg-emerald-600/20 border-emerald-400 text-emerald-400 scale-105' : 'bg-stone-900 border-stone-800 text-stone-500'}`}>
                        <Globe size={11} />
                      </div>
                      <span className="text-[5px] font-mono mt-1 text-stone-400">EDGE_CDN</span>
                    </div>

                    <div className="h-0.5 w-8 bg-stone-800 relative">
                      {activeNode === 'db' && <div className="absolute inset-y-0 left-0 w-2 bg-emerald-400 rounded-full animate-ping" />}
                    </div>

                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${activeNode === 'db' ? 'bg-emerald-600/20 border-emerald-400 text-emerald-400 scale-105' : 'bg-stone-900 border-stone-800 text-stone-500'}`}>
                        <Database size={11} />
                      </div>
                      <span className="text-[5px] font-mono mt-1 text-stone-400">LEDGER_DB</span>
                    </div>

                    <div className="h-0.5 w-8 bg-stone-800 relative">
                      {activeNode === 'api' && <div className="absolute inset-y-0 left-0 w-2 bg-emerald-400 rounded-full animate-ping" />}
                    </div>

                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${activeNode === 'api' ? 'bg-emerald-600/20 border-emerald-400 text-emerald-400 scale-105' : 'bg-stone-900 border-stone-800 text-stone-500'}`}>
                        <Cpu size={11} />
                      </div>
                      <span className="text-[5px] font-mono mt-1 text-stone-400">MICRO_CORE</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end font-mono text-[6px] text-stone-500 z-10">
                    <span>ACTIVE NODE: {activeNode.toUpperCase()}</span>
                    <span>100% MICRO-COMPILED</span>
                  </div>
                </div>

                <div className="bg-[#11100f] border border-stone-850 p-2.5 rounded-xl text-left">
                  <p className="font-mono text-[7.5px] text-stone-400-force leading-normal">
                    ✦ Edge servers routing data seamlessly within 14ms across Global Edge endpoints. Optimized with automatic fallback parameters.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 03 // PRICING FLOW (PIXEL PERFECT REPLICA OF USER UPLOADED SCREENSHOT!) */}
            {activePage.id === 'pricing' && (
              <motion.div
                key="pricing-stage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-[300px] bg-[#141211] border border-stone-800 rounded-2xl p-3.5 sm:p-4 flex flex-col space-y-2.5 text-left shadow-2xl relative overflow-hidden"
              >
                {/* Top Subtle Purple Highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/80 to-pink-500/80 opacity-40" />

                {/* 1. Estimated Investment Section */}
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-1 text-stone-400-force font-mono text-[8px] uppercase tracking-wider font-black">
                    <span className="text-violet-400">$</span>
                    <span>ESTIMATED INVESTMENT</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-black text-white tracking-tighter">
                    {pricingActiveAddon ? '$1,498' : '$1,298'}
                  </div>
                </div>

                {/* 2. Projected Timeline Section */}
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-1.5 text-stone-400-force font-mono text-[8px] uppercase tracking-wider font-black">
                    <Clock size={9} className="text-violet-400" />
                    <span>PROJECTED TIMELINE</span>
                  </div>
                  <div className="text-base font-mono text-stone-100-force font-bold">
                    7-12 Weeks
                  </div>
                </div>

                {/* 3. Team Allocation Section */}
                <div className="space-y-1.5 pt-1 border-t border-stone-900">
                  <div className="flex items-center space-x-1.5 text-stone-400-force font-mono text-[8px] uppercase tracking-wider font-black">
                    <Users size={9} className="text-violet-400" />
                    <span>TEAM ALLOCATION</span>
                  </div>
                  
                  <ul className="space-y-1 text-[9px] text-stone-300-force font-sans pl-1">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      <span>1x System Architect</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      <span>2x Full-Stack Developers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      <span>1x Database Engineer</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      <span>1x Creative Developer (WebGL)</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* 04 // INSIGHTS GRAPH TELEMETRY */}
            {activePage.id === 'insights' && (
              <motion.div
                key="insights-stage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-[340px] bg-stone-900/40 border border-cyan-500/20 rounded-2xl p-4 flex flex-col space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[7px] text-stone-400 uppercase tracking-widest font-black block">SYSTEM_TELEMETRY: RUNNING</span>
                  <div className="flex space-x-1 bg-stone-950 p-0.5 rounded border border-stone-850">
                    <span className={`text-[5px] font-mono px-1 py-0.5 rounded ${insightsActiveMetric === 'latency' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-stone-500'}`}>LATENCY</span>
                    <span className={`text-[5px] font-mono px-1 py-0.5 rounded ${insightsActiveMetric === 'bandwidth' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-stone-500'}`}>BW</span>
                  </div>
                </div>

                {/* SVG Live Render Graph */}
                <div className="h-24 bg-stone-950/80 rounded-xl border border-stone-850 p-2 relative flex items-end">
                  <div className="absolute inset-0 bg-[radial-gradient(#051c24_1px,transparent_1px)] bg-[size:0.5rem_0.5rem] opacity-35" />
                  
                  {/* Dynamic Sine-wave SVG simulation based on state */}
                  <svg viewBox="0 0 160 50" className="w-full h-full stroke-cyan-400 fill-none stroke-[1.5] z-10 relative">
                    <path d={`
                      M 0 25
                      Q 20 ${25 + Math.sin((telemetryPulse + 0) * Math.PI / 180) * (insightsActiveMetric === 'latency' ? 12 : 22)}, 40 25
                      T 80 25
                      T 120 25
                      T 160 25
                    `} />
                    <path d={`
                      M 0 25
                      Q 20 ${25 + Math.cos((telemetryPulse + 90) * Math.PI / 180) * 8}, 40 25
                      T 80 25
                      T 120 25
                      T 160 25
                    `} className="stroke-cyan-500/30 stroke-[1]" />
                  </svg>

                  <span className="absolute bottom-1.5 left-1.5 font-mono text-[7px] text-stone-500 leading-none">0.00ms SLA DELAY</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="bg-stone-950 p-2 rounded-xl border border-stone-850">
                    <span className="font-mono text-[5px] text-stone-500 block uppercase">EDGE CACHE HIT</span>
                    <span className="font-mono text-[9px] text-white font-bold block">99.85% SPEED</span>
                  </div>
                  <div className="bg-stone-950 p-2 rounded-xl border border-stone-850">
                    <span className="font-mono text-[5px] text-stone-500 block uppercase">DB READ RATIO</span>
                    <span className="font-mono text-[9px] text-white font-bold block">1.1ms QUERIES</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 05 // DOCKING SECURE CONTACT FORM */}
            {activePage.id === 'docking' && (
              <motion.div
                key="docking-stage"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-[320px] bg-[#1c1817] border border-stone-800 rounded-2xl p-4 flex flex-col space-y-3.5 text-left shadow-2xl"
              >
                <div className="flex justify-between items-center pb-1 border-b border-stone-800/60">
                  <span className="font-mono text-[7px] text-stone-400 uppercase tracking-widest font-black">✦ CUSTOMER DOCKING SYSTEM</span>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-[5.5px] font-mono text-stone-500">LIVE CORES</span>
                  </div>
                </div>

                {/* Form fields mockup */}
                <div className="space-y-2 text-left">
                  <div className="space-y-1">
                    <span className="font-mono text-[6px] text-stone-500 uppercase">PROJECT SUMMARY INTENT</span>
                    <div className="bg-stone-950 border border-stone-850 rounded-lg px-2 py-1 text-[8px] text-stone-300 font-mono">
                      {contactFormStep === 'idle' ? 'Typing project scope...' : 'Custom WebGL UI & Cloud Architecture Setup'}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[6px] text-stone-500 uppercase">DOCKING AUTHORIZATION STATUS</span>
                    <div className="h-8 bg-stone-950 border border-stone-850 rounded-lg p-2 flex items-center justify-between">
                      <span className="font-mono text-[7px] text-stone-400">
                        {contactFormStep === 'idle' && 'READY FOR INTEGRATION'}
                        {contactFormStep === 'submitting' && 'SUBMITTING ENCRYPTED PAYLOAD...'}
                        {contactFormStep === 'complete' && 'ONBOARDING PIPELINE CREATED!'}
                      </span>
                      {contactFormStep === 'complete' && <Check size={10} className="text-rose-400" />}
                    </div>
                  </div>
                </div>

                {/* Submit button simulation */}
                <div className={`w-full py-1.5 font-mono text-[8px] uppercase tracking-widest font-black rounded-lg transition-all duration-300 text-center select-none ${
                  contactFormStep === 'complete' 
                    ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400' 
                    : contactFormStep === 'submitting'
                      ? 'bg-rose-600/40 text-stone-200'
                      : 'bg-rose-500 text-stone-950 font-bold'
                }`}>
                  {contactFormStep === 'idle' && 'LAUNCH PROJECT'}
                  {contactFormStep === 'submitting' && 'SYNCING...'}
                  {contactFormStep === 'complete' && '✦ SYSTEM READY'}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Viewport Description Footer Panel */}
        <div className="w-full z-10 bg-stone-950/80 border border-stone-850 px-4 py-3 rounded-2xl flex flex-col space-y-1 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[7px] text-stone-400 uppercase tracking-widest font-black leading-none">
              ✦ PROCESS SIMULATION NOTES
            </span>
            <span className="text-[6px] font-mono text-stone-500 leading-none">AUTOMATED CURSOR LOGIC ACTIVE</span>
          </div>
          <p className="font-sans text-[10px] text-stone-300-force leading-relaxed">
            {activePage.description}
          </p>
        </div>

        {/* Floating HUD Interaction Hint */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none select-none z-10">
          <span className="font-mono text-[8px] text-stone-500 uppercase tracking-widest animate-pulse">
            INTERACTIVE PREVIEW • AUTOMATED DEMO
          </span>
        </div>
      </div>

      {/* Professional Player Bottom Dashboard Controls */}
      <div className="p-4 border-t border-stone-200/40 bg-stone-50 flex flex-col gap-3 z-10 text-stone-700">
        
        {/* Seekable Playback Timer Track */}
        <div className="w-full flex items-center space-x-3">
          <span className="font-mono text-[9px] text-stone-500 select-none">
            {formatTime(currentElapsedSeconds)}
          </span>
          
          <div className="flex-1 h-2 bg-stone-200 rounded-full relative overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-600 to-rose-500 transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${((activeIdx * SECONDS_PER_SLIDE) + (progress / 100 * SECONDS_PER_SLIDE)) / TOTAL_DURATION * 100}%` }}
            />
          </div>

          <span className="font-mono text-[9px] text-stone-500 select-none">
            {formatTime(TOTAL_DURATION)}
          </span>
        </div>

        {/* Playback Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => { playClick(); handlePrev(); }}
              className="p-1.5 hover:bg-stone-200/80 rounded-lg text-stone-600 hover:text-stone-900 transition-all cursor-pointer"
              title="Previous Chapter"
            >
              <SkipBack size={14} />
            </button>

            <button 
              onClick={() => { playClick(); setIsPlaying(!isPlaying); }}
              className="p-2 bg-stone-900 text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer flex items-center justify-center"
              title={isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="translate-x-[0.5px]" />}
            </button>

            <button 
              onClick={() => { playClick(); handleNext(); }}
              className="p-1.5 hover:bg-stone-200/80 rounded-lg text-stone-600 hover:text-stone-900 transition-all cursor-pointer"
              title="Next Chapter"
            >
              <SkipForward size={14} />
            </button>
          </div>

          <div className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-[8px] text-stone-500 uppercase tracking-widest font-black">
              LIVE PREVIEW ONLINE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

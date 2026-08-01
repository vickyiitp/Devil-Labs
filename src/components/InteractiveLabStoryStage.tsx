import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Terminal, CheckCircle2, AlertTriangle, ArrowRight, X, Cpu, Zap, ShieldCheck, Sparkles, Send, Play } from 'lucide-react';
import { soundEngine } from '../lib/interactiveAudio';
import { detectDeviceCapability, DeviceCapability } from '../lib/performanceDetector';
import InteractiveLabCanvas from './InteractiveLabCanvas';

interface InteractiveLabStoryStageProps {
  isOpen: boolean;
  onClose: () => void;
  onInitializeProject: () => void;
}

export default function InteractiveLabStoryStage({
  isOpen,
  onClose,
  onInitializeProject,
}: InteractiveLabStoryStageProps) {
  const [sceneStep, setSceneStep] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [capability, setCapability] = useState<DeviceCapability>({
    tier: 'BALANCED',
    webglSupported: true,
    maxParticles: 400,
    enableShadows: false,
    enableShaders: true,
  });

  // Scene 05 Build logs
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  // Scene 06 Automation steps
  const [activeAutoStep, setActiveAutoStep] = useState<number>(0);
  // Scene 07 Healing state
  const [healingState, setHealingState] = useState<'IDLE' | 'FAILED' | 'RECOVERING' | 'RECOVERED'>('IDLE');

  useEffect(() => {
    setCapability(detectDeviceCapability());
  }, []);

  const handleToggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundEngine.setMuted(nextState);
    if (!nextState) {
      soundEngine.playNotification();
    }
  };

  const handleNextScene = () => {
    soundEngine.playTick();
    if (sceneStep < 9) {
      const next = sceneStep + 1;
      setSceneStep(next);
      triggerSceneEffects(next);
    }
  };

  const triggerSceneEffects = (step: number) => {
    if (step === 1) {
      soundEngine.playNotification();
    } else if (step === 4) {
      soundEngine.playDeploymentBoom();
    } else if (step === 5) {
      // Stream build logs
      setBuildLogs([]);
      const logs = [
        'Initializing project architecture...',
        'Building responsive interface components...',
        'Connecting API endpoints & webhooks...',
        'Configuring multi-agent AI pipelines...',
        'Validating forms & payload security...',
        'Deploying production build to Edge CDN...',
      ];
      logs.forEach((log, index) => {
        setTimeout(() => {
          setBuildLogs((prev) => [...prev, log]);
          soundEngine.playKeyClick();
        }, index * 400);
      });
    } else if (step === 6) {
      // Stream autonomous lead steps
      setActiveAutoStep(0);
      const interval = setInterval(() => {
        setActiveAutoStep((prev) => {
          if (prev < 4) {
            soundEngine.playNodeConnect();
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 700);
    } else if (step === 7) {
      // Simulate form delivery failure & self-healing
      setHealingState('FAILED');
      setTimeout(() => {
        setHealingState('RECOVERING');
        soundEngine.playTick();
        setTimeout(() => {
          setHealingState('RECOVERED');
          soundEngine.playDeploymentBoom();
        }, 1200);
      }, 1000);
    } else if (step === 8) {
      soundEngine.playPaymentChime();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col justify-between overflow-hidden font-sans select-none">
      {/* 3D WebGL Canvas Layer */}
      <InteractiveLabCanvas sceneStep={sceneStep} performanceTier={capability.tier} />

      {/* TOP HEADER CONTROLS */}
      <div className="relative z-20 flex items-center justify-between p-4 sm:p-6 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
          <span className="font-mono text-xs tracking-widest text-stone-300 font-bold uppercase">
            DEVIL LABS // 02:13 AM STUDIO
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded bg-violet-950/80 border border-violet-800/50 text-violet-300 font-bold">
            {capability.tier} ENGINE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleSound}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/80 border border-white/10 hover:border-violet-500/50 text-xs font-mono transition-all text-stone-300 hover:text-white"
          >
            {isMuted ? <VolumeX size={14} className="text-stone-500" /> : <Volume2 size={14} className="text-violet-400" />}
            <span>{isMuted ? 'SOUND ○ OFF' : 'SOUND ● ON'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900/80 border border-white/10 hover:bg-stone-800 text-stone-400 hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* MAIN NARRATIVE CONTENT OVERLAY (SCENES 01 - 09) */}
      <div className="relative z-20 flex-1 flex items-center justify-center p-4 sm:p-8 max-w-4xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {/* SCENE 01: 02:13 AM / THE LAB */}
          {sceneStep === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-lg"
            >
              <span className="font-mono text-xs text-violet-400 uppercase tracking-widest font-bold block">
                ✦ SCENE 01 // 02:13 AM
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
                DEVIL LABS // SYSTEM ONLINE
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed font-sans">
                A dark workstation. A candle flickering beside the monitor. Suddenly, an encrypted message arrives...
              </p>

              <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-800/40 text-left space-y-2 shadow-xl">
                <span className="text-[10px] font-mono text-violet-300 font-bold uppercase tracking-wider block">
                  🚨 NEW INQUIRY DETECTED
                </span>
                <p className="text-stone-200 text-sm font-mono italic">
                  “I need a website + automation for my business.”
                </p>
              </div>

              <button
                onClick={handleNextScene}
                className="mt-4 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-violet-600/30 flex items-center gap-2 mx-auto"
              >
                <span>OPEN TRANSMISSION →</span>
              </button>
            </motion.div>
          )}

          {/* SCENE 02: SOMEONE STARTS WORKING */}
          {sceneStep === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-xl"
            >
              <span className="font-mono text-xs text-violet-400 uppercase tracking-widest font-bold block">
                ✦ SCENE 02 // REQUIREMENTS DISCOVERY
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
                UNDERSTANDING REQUIREMENTS...
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
                {['Business', 'Customers', 'Leads', 'Operations', 'Automation'].map((step, idx) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.15 }}
                    className="p-3 rounded-lg bg-stone-900/80 border border-violet-500/30 text-violet-200 text-center font-bold"
                  >
                    {step}
                  </motion.div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase">
                ✓ PROJECT INITIALIZED
              </div>

              <button
                onClick={handleNextScene}
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 mx-auto"
              >
                <span>ENTER DISCOVERY BOARD →</span>
              </button>
            </motion.div>
          )}

          {/* SCENE 03: THINK BEFORE WE BUILD */}
          {sceneStep === 3 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-2xl"
            >
              <span className="font-mono text-xs text-rose-400 uppercase tracking-widest font-bold block">
                ✦ SCENE 03 // PROBLEM ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
                WE DON'T START WITH CODE. <br />
                <span className="text-violet-400 font-serif italic lowercase font-normal">we start with the problem.</span>
              </h2>

              <p className="text-stone-300 text-sm max-w-lg mx-auto leading-relaxed">
                Before writing a single line of CSS or backend routes, we map out the business model, user pathways, and operational bottlenecks.
              </p>

              <button
                onClick={handleNextScene}
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 mx-auto"
              >
                <span>LOCK ARCHITECTURE →</span>
              </button>
            </motion.div>
          )}

          {/* SCENE 04: ARCHITECTURE PIPELINE */}
          {sceneStep === 4 && (
            <motion.div
              key="scene-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-2xl"
            >
              <span className="font-mono text-xs text-sky-400 uppercase tracking-widest font-bold block">
                ✦ SCENE 04 // 3D SYSTEM PIPELINE
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
                ARCHITECTURE LOCKED.
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] uppercase font-bold">
                {['Client', '→', 'Website', '→', 'Database', '→', 'CRM', '→', 'Automation', '→', 'WhatsApp/Email', '→', 'Cloud'].map((item, i) => (
                  <span key={i} className={item === '→' ? 'text-violet-400' : 'px-2 py-1 bg-stone-900 rounded border border-stone-800 text-stone-200'}>
                    {item}
                  </span>
                ))}
              </div>

              <button
                onClick={handleNextScene}
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 mx-auto"
              >
                <span>START HIGH-SPEED BUILD →</span>
              </button>
            </motion.div>
          )}

          {/* SCENE 05: BUILD SPRINT */}
          {sceneStep === 5 && (
            <motion.div
              key="scene-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-xl w-full"
            >
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-bold block">
                ✦ SCENE 05 // SYSTEM ASSEMBLY SPRINT
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
                THE WEBSITE ASSEMBLES.
              </h2>

              <div className="p-4 rounded-xl bg-black/90 border border-violet-900/60 font-mono text-left text-xs space-y-1.5 min-h-[160px] shadow-2xl">
                <div className="flex items-center gap-2 text-stone-500 border-b border-stone-800 pb-2 mb-2">
                  <Terminal size={14} className="text-violet-400" />
                  <span>DEVIL_LABS_BUILD_ENGINE v4.2</span>
                </div>
                {buildLogs.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-violet-300">
                    <span className="text-violet-500">❯</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleNextScene}
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 mx-auto"
              >
                <span>ACTIVATE AUTOMATION ENGINE →</span>
              </button>
            </motion.div>
          )}

          {/* SCENE 06: AUTOMATION COMES ALIVE */}
          {sceneStep === 6 && (
            <motion.div
              key="scene-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-xl"
            >
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold block">
                ✦ SCENE 06 // AUTONOMOUS AGENTIC EXECUTION
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight">
                NOW THE SYSTEM WORKS WITHOUT US.
              </h2>

              <div className="space-y-2 text-left font-mono text-xs">
                {[
                  'Lead captured from website form',
                  'CRM record created & enriched',
                  'AI engine classified lead priority (High)',
                  'Telegram & Email notifications sent',
                  'Follow-up sequence automatically scheduled',
                ].map((stepText, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                      idx <= activeAutoStep
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                        : 'bg-stone-900/40 border-stone-800 text-stone-600'
                    }`}
                  >
                    <span>{stepText}</span>
                    {idx <= activeAutoStep && <CheckCircle2 size={16} className="text-emerald-400" />}
                  </div>
                ))}
              </div>

              <button
                onClick={handleNextScene}
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 mx-auto"
              >
                <span>RUN HEAL & QA TEST →</span>
              </button>
            </motion.div>
          )}

          {/* SCENE 07: TESTING & SELF-HEALING */}
          {sceneStep === 7 && (
            <motion.div
              key="scene-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-xl"
            >
              <span className="font-mono text-xs text-rose-400 uppercase tracking-widest font-bold block">
                ✦ SCENE 07 // RESILIENCE & QA TESTING
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
                HARDENED QUALITY CONTROL.
              </h2>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3 font-mono text-xs">
                {healingState === 'FAILED' && (
                  <div className="flex items-center gap-2 text-rose-400">
                    <AlertTriangle size={16} />
                    <span>[ALERT] FORM DELIVERY TIMEOUT DETECTED</span>
                  </div>
                )}
                {healingState === 'RECOVERING' && (
                  <div className="flex items-center gap-2 text-amber-400 animate-pulse">
                    <Cpu size={16} />
                    <span>[AUTO-HEAL] EXECUTING FALLBACK PROXY ROUTE...</span>
                  </div>
                )}
                {healingState === 'RECOVERED' && (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ShieldCheck size={16} />
                    <span>[SUCCESS] SYSTEM RECOVERED &amp; VERIFIED</span>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[10px] uppercase font-bold text-stone-300">
                  <div className="p-2 bg-stone-900 rounded">SEO 100/100</div>
                  <div className="p-2 bg-stone-900 rounded">SECURITY 100/100</div>
                  <div className="p-2 bg-stone-900 rounded">PWA READY</div>
                  <div className="p-2 bg-stone-900 rounded">RESPONSIVE</div>
                </div>
              </div>

              <button
                onClick={handleNextScene}
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 mx-auto"
              >
                <span>SEND TO CLIENT →</span>
              </button>
            </motion.div>
          )}

          {/* SCENE 08: CLIENT SATISFACTION */}
          {sceneStep === 8 && (
            <motion.div
              key="scene-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-xl"
            >
              <span className="font-mono text-xs text-amber-300 uppercase tracking-widest font-bold block">
                ✦ SCENE 08 // MORNING LIGHT / CLIENT REVIEWS
              </span>

              <div className="p-4 rounded-xl bg-stone-900/90 border border-violet-500/40 text-left space-y-2 shadow-2xl">
                <span className="text-[10px] font-mono text-violet-400 font-bold uppercase tracking-wider block">
                  💬 CLIENT TRANSMISSION
                </span>
                <p className="text-stone-100 text-sm font-sans italic">
                  “This is exactly what we needed. Everything is working smoothly. Thank you.”
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold tracking-wider uppercase">
                ✓ PAYMENT RECEIVED &amp; SYSTEM LIVE
              </div>

              <h3 className="text-xl sm:text-3xl font-display font-extrabold uppercase text-stone-200">
                THE BUILD ENDS. <br />
                <span className="text-violet-400 font-serif italic lowercase font-normal">the system keeps running.</span>
              </h3>

              <button
                onClick={handleNextScene}
                className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 mx-auto"
              >
                <span>REVEAL DEVIL LABS →</span>
              </button>
            </motion.div>
          )}

          {/* SCENE 09: REVEAL DEVIL LABS & FINAL CTA */}
          {sceneStep === 9 && (
            <motion.div
              key="scene-9"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center space-y-6 max-w-2xl"
            >
              <Sparkles size={36} className="mx-auto text-violet-400 animate-bounce" />
              <span className="font-mono text-xs text-violet-400 uppercase tracking-widest font-bold block">
                DEVIL LABS // OFFICIAL REVEAL
              </span>

              <h2 className="text-3xl sm:text-6xl font-display font-black uppercase tracking-tighter leading-none text-white">
                FROM A MESSAGE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 font-serif italic lowercase font-normal">
                  to a working system.
                </span>
              </h2>

              <p className="text-stone-300 text-xs sm:text-sm font-mono tracking-widest uppercase font-bold">
                DEVIL LABS // AI SYSTEMS • AUTOMATION • SOFTWARE ENGINEERING
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    onClose();
                    onInitializeProject();
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-violet-600/40 flex items-center justify-center gap-2"
                >
                  <span>INITIALIZE YOUR PROJECT →</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-stone-900 hover:bg-stone-800 border border-white/10 text-stone-300 text-xs font-mono tracking-wider uppercase font-bold"
                >
                  EXPLORE WEBSITE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM SCENE STEP INDICATOR BAR */}
      <div className="relative z-20 p-4 sm:p-6 max-w-7xl w-full mx-auto flex items-center justify-between border-t border-white/10 text-xs font-mono text-stone-400">
        <div>
          <span>STEP {sceneStep} / 9</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
            <button
              key={s}
              onClick={() => {
                setSceneStep(s);
                triggerSceneEffects(s);
              }}
              className={`w-6 h-1.5 rounded-full transition-all ${
                s === sceneStep ? 'bg-violet-500 w-10' : 'bg-stone-800 hover:bg-stone-700'
              }`}
            />
          ))}
        </div>
        <div>
          <button
            onClick={handleNextScene}
            disabled={sceneStep === 9}
            className="hover:text-white disabled:opacity-30 uppercase font-bold"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}

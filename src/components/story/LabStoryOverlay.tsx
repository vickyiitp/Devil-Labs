import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, CheckCircle2, AlertTriangle, ArrowRight, Cpu, Sparkles, ShieldCheck, Monitor, Tablet, Smartphone, Check } from 'lucide-react';
import { SceneId } from '../../lib/story/storyTypes';
import { storyAudio } from '../../lib/story/audioEngine';

interface LabStoryOverlayProps {
  sceneStep: SceneId;
  onNextScene: () => void;
  onInitializeProject: () => void;
  onExploreWork: () => void;
}

export default function LabStoryOverlay({
  sceneStep,
  onNextScene,
  onInitializeProject,
  onExploreWork,
}: LabStoryOverlayProps) {
  // Scene 06 build logs
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  // Scene 07 autonomous lead execution steps
  const [autoStep, setAutoStep] = useState<number>(0);
  // Scene 08 healing state
  const [healingState, setHealingState] = useState<'IDLE' | 'FAILED' | 'RECOVERING' | 'RECOVERED'>('IDLE');

  useEffect(() => {
    if (sceneStep === 6) {
      setBuildLogs([]);
      const logs = [
        'Creating interface components...',
        'Connecting REST & WebSocket APIs...',
        'Initializing PostgreSQL database schema...',
        'Configuring JWT authentication & zero-trust proxy...',
        'Building responsive viewport states...',
        'Connecting multi-agent automation triggers...',
        'Optimizing bundle assets & tree shaking...',
        'Validating forms & payload security...',
        'Deploying production build to Edge CDN...',
      ];
      logs.forEach((log, index) => {
        setTimeout(() => {
          setBuildLogs((prev) => [...prev, log]);
          storyAudio.playKeyClick();
        }, index * 350);
      });
    } else if (sceneStep === 7) {
      setAutoStep(0);
      const interval = setInterval(() => {
        setAutoStep((prev) => {
          if (prev < 4) {
            storyAudio.playNodeConnect();
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 650);
    } else if (sceneStep === 8) {
      setHealingState('FAILED');
      setTimeout(() => {
        setHealingState('RECOVERING');
        storyAudio.playKeyClick();
        setTimeout(() => {
          setHealingState('RECOVERED');
          storyAudio.playDeploymentBoom();
        }, 1100);
      }, 900);
    }
  }, [sceneStep]);

  return (
    <div className="relative z-20 flex-1 flex items-center justify-center p-4 sm:p-8 max-w-4xl w-full mx-auto select-none">
      <AnimatePresence mode="wait">
        {/* SCENE 01: THE LAB */}
        {sceneStep === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6 max-w-lg"
          >
            <span className="font-mono text-xs text-violet-400 uppercase tracking-widest font-bold block">
              ✦ SCENE 01 // 02:13 AM STUDIO
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
              DEVIL LABS // SYSTEM ONLINE
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm font-sans leading-relaxed">
              A dark engineering studio. Purple monitor glow illuminates the workstation. Beside the keyboard, a coded 3D candle burns steadily.
            </p>

            <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-800/40 text-left space-y-2 shadow-2xl">
              <span className="text-[10px] font-mono text-violet-300 font-bold uppercase tracking-wider block">
                🚨 INCOMING TRANSMISSION DETECTED
              </span>
              <p className="text-stone-200 text-xs sm:text-sm font-mono italic">
                “I need a website + automation for my business.”
              </p>
            </div>

            <button
              onClick={onNextScene}
              className="px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-violet-600/40 flex items-center gap-2 mx-auto"
            >
              <span>OPEN TRANSMISSION →</span>
            </button>
          </motion.div>
        )}

        {/* SCENE 02: THE MESSAGE */}
        {sceneStep === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6 max-w-xl"
          >
            <span className="font-mono text-xs text-violet-400 uppercase tracking-widest font-bold block">
              ✦ SCENE 02 // INQUIRY ANALYSIS
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
              EXTRACTING REQUIREMENTS...
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
              {['Business', 'Customers', 'Leads', 'Operations', 'Automation'].map((req, idx) => (
                <motion.div
                  key={req}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.12 }}
                  className="p-3 rounded-lg bg-stone-900/80 border border-violet-500/40 text-violet-200 text-center font-bold"
                >
                  {req}
                </motion.div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase">
              ✓ PROJECT INITIALIZED
            </div>

            <button
              onClick={onNextScene}
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 mx-auto"
            >
              <span>CONTINUE TO DISCOVERY →</span>
            </button>
          </motion.div>
        )}

        {/* SCENE 03: UNDERSTAND */}
        {sceneStep === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6 max-w-2xl"
          >
            <span className="font-mono text-xs text-rose-400 uppercase tracking-widest font-bold block">
              ✦ SCENE 03 // DISCOVERY BEFORE CODE
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              WE DON'T START WITH CODE. <br />
              <span className="text-violet-400 font-serif italic lowercase font-normal">we start with the problem.</span>
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              We map customer journeys, business logic, and backend bottlenecks before building the visual system.
            </p>

            <button
              onClick={onNextScene}
              className="px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 mx-auto"
            >
              <span>LOCK ARCHITECTURE →</span>
            </button>
          </motion.div>
        )}

        {/* SCENE 04: SYSTEM ARCHITECTURE */}
        {sceneStep === 4 && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6 max-w-2xl"
          >
            <span className="font-mono text-xs text-sky-400 uppercase tracking-widest font-bold block">
              ✦ SCENE 04 // SPATIAL DATA PATHS
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
              ARCHITECTURE LOCKED.
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] uppercase font-bold">
              {['Client', '→', 'Website', '→', 'API', '→', 'Database', '→', 'CRM', '→', 'AI', '→', 'Automation', '→', 'Cloud'].map((item, i) => (
                <span key={i} className={item === '→' ? 'text-violet-400 font-black' : 'px-2.5 py-1 bg-stone-900 rounded border border-stone-800 text-stone-200'}>
                  {item}
                </span>
              ))}
            </div>

            <button
              onClick={onNextScene}
              className="px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 mx-auto"
            >
              <span>PROCEED TO DESIGN →</span>
            </button>
          </motion.div>
        )}

        {/* SCENE 05: DESIGN */}
        {sceneStep === 5 && (
          <motion.div
            key="scene-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6 max-w-xl"
          >
            <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-bold block">
              ✦ SCENE 05 // SYSTEMATIC UI/UX DESIGN
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight">
              STRUCTURE BEFORE DECORATION.
            </h2>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex flex-col items-center gap-2">
                <Monitor size={20} className="text-violet-400" />
                <span className="font-bold text-[11px]">DESKTOP</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex flex-col items-center gap-2">
                <Tablet size={20} className="text-sky-400" />
                <span className="font-bold text-[11px]">TABLET</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex flex-col items-center gap-2">
                <Smartphone size={20} className="text-emerald-400" />
                <span className="font-bold text-[11px]">MOBILE</span>
              </div>
            </div>

            <button
              onClick={onNextScene}
              className="px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 mx-auto"
            >
              <span>ENTER BUILD SPRINT →</span>
            </button>
          </motion.div>
        )}

        {/* SCENE 06: BUILD */}
        {sceneStep === 6 && (
          <motion.div
            key="scene-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6 max-w-xl w-full"
          >
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-bold block">
              ✦ SCENE 06 // PRODUCTION SPRINT
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
              THE WEBSITE ASSEMBLES.
            </h2>

            <div className="p-4 rounded-xl bg-black/90 border border-violet-900/60 font-mono text-left text-xs space-y-1.5 min-h-[180px] shadow-2xl">
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
              onClick={onNextScene}
              className="px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 mx-auto"
            >
              <span>ACTIVATE AUTOMATION ENGINE →</span>
            </button>
          </motion.div>
        )}

        {/* SCENE 07: AUTOMATION */}
        {sceneStep === 7 && (
          <motion.div
            key="scene-7"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6 max-w-xl"
          >
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold block">
              ✦ SCENE 07 // AUTONOMOUS WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              NOW THE SYSTEM WORKS WITHOUT US.
            </h2>

            <div className="space-y-2 text-left font-mono text-xs">
              {[
                'Lead Captured from Website Intake Form',
                'AI Engine Classifies Lead Intent & Budget Tier',
                'CRM Record Created & Enriched via API',
                'Telegram & Email Notifications Dispatched',
                'Follow-Up Sequence Automatically Scheduled',
              ].map((text, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                    idx <= autoStep
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                      : 'bg-stone-900/40 border-stone-800 text-stone-600'
                  }`}
                >
                  <span>{text}</span>
                  {idx <= autoStep && <CheckCircle2 size={16} className="text-emerald-400" />}
                </div>
              ))}
            </div>

            <button
              onClick={onNextScene}
              className="px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 mx-auto"
            >
              <span>RUN RESILIENCE QA →</span>
            </button>
          </motion.div>
        )}

        {/* SCENE 08: TESTING */}
        {sceneStep === 8 && (
          <motion.div
            key="scene-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6 max-w-xl"
          >
            <span className="font-mono text-xs text-rose-400 uppercase tracking-widest font-bold block">
              ✦ SCENE 08 // SELF-HEALING QA
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight">
              CONTROLLED TESTING &amp; RECOVERY.
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
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck size={16} />
                  <span>[SUCCESS] SYSTEM RECOVERED &amp; VERIFIED ✓</span>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[10px] uppercase font-bold text-stone-300">
                <div className="p-2 bg-stone-900 rounded border border-emerald-500/30">SEO 100/100 ✓</div>
                <div className="p-2 bg-stone-900 rounded border border-emerald-500/30">SECURITY ✓</div>
                <div className="p-2 bg-stone-900 rounded border border-emerald-500/30">PWA READY ✓</div>
                <div className="p-2 bg-stone-900 rounded border border-emerald-500/30">API SLA ✓</div>
              </div>
            </div>

            <button
              onClick={onNextScene}
              className="px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 mx-auto"
            >
              <span>DEPLOY TO PRODUCTION →</span>
            </button>
          </motion.div>
        )}

        {/* SCENE 09: DEPLOYMENT */}
        {sceneStep === 9 && (
          <motion.div
            key="scene-9"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6 max-w-xl"
          >
            <span className="font-mono text-xs text-violet-400 uppercase tracking-widest font-bold block">
              ✦ SCENE 09 // PRODUCTION STABILIZATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight">
              PRODUCTION DEPLOYED.
            </h2>

            <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-600/50 text-violet-200 font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-3">
              <CheckCircle2 size={20} className="text-emerald-400" />
              <span>SYSTEM ONLINE // EDGE STABILIZED</span>
            </div>

            <button
              onClick={onNextScene}
              className="px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 mx-auto"
            >
              <span>SEND FOR REVIEW →</span>
            </button>
          </motion.div>
        )}

        {/* SCENE 10: CLIENT REVIEW */}
        {sceneStep === 10 && (
          <motion.div
            key="scene-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6 max-w-xl"
          >
            <span className="font-mono text-xs text-amber-300 uppercase tracking-widest font-bold block">
              ✦ SCENE 10 // CLIENT SATISFACTION
            </span>

            <div className="p-4 rounded-xl bg-stone-900/90 border border-violet-500/40 text-left space-y-2 shadow-2xl">
              <span className="text-[10px] font-mono text-violet-400 font-bold uppercase tracking-wider block">
                💬 CLIENT TRANSMISSION
              </span>
              <p className="text-stone-100 text-sm font-sans italic">
                “This is exactly what we needed.”
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold uppercase">
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                ✓ PROJECT APPROVED
              </div>
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                ✓ PAYMENT RECEIVED
              </div>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm font-sans italic">
              “Everything is working smoothly. Thank you.”
            </p>

            <button
              onClick={onNextScene}
              className="px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 mx-auto"
            >
              <span>SEE MORNING REVEAL →</span>
            </button>
          </motion.div>
        )}

        {/* SCENE 11: MORNING REVEAL & FINAL CTA */}
        {sceneStep === 11 && (
          <motion.div
            key="scene-11"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="text-center space-y-6 max-w-2xl"
          >
            <Sparkles size={36} className="mx-auto text-violet-400 animate-bounce" />
            <span className="font-mono text-xs text-amber-300 uppercase tracking-widest font-bold block">
              THE BUILD ENDS. THE SYSTEM KEEPS RUNNING.
            </span>

            <h1 className="text-3xl sm:text-6xl font-display font-black uppercase tracking-tighter leading-none text-white">
              FROM A MESSAGE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-rose-400 font-serif italic lowercase font-normal">
                to a working system.
              </span>
            </h1>

            <p className="text-stone-300 text-xs sm:text-sm font-mono tracking-widest uppercase font-bold">
              DEVIL LABS // AI SYSTEMS • AUTOMATION • SOFTWARE ENGINEERING
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  onInitializeProject();
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-violet-600/40 flex items-center justify-center gap-2"
              >
                <span>INITIALIZE YOUR PROJECT →</span>
              </button>

              <button
                onClick={() => {
                  onExploreWork();
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-stone-900 hover:bg-stone-800 border border-white/10 text-stone-300 text-xs font-mono tracking-wider uppercase font-bold"
              >
                EXPLORE OUR WORK
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

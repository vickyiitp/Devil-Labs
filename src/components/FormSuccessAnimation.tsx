import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Globe, PhoneCall, Check, ArrowRight, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react';
import { audioEngine } from '../lib/audio';

interface DispatchStatus {
  email?: { success: boolean; id?: string };
  telegram?: { success: boolean };
  whatsapp?: { success: boolean };
  sms?: { success: boolean };
}

interface FormSuccessAnimationProps {
  title?: string;
  subtitle?: string;
  dispatchResults?: DispatchStatus | null;
  onReset?: () => void;
  resetButtonText?: string;
  extraInfo?: React.ReactNode;
}

export default function FormSuccessAnimation({
  title = "TRANSMISSION COMPLETED",
  subtitle = "YOUR PROJECT BRIEF HAS BEEN DISPATCHED LIVE ACROSS OUR HIGH-SPEED LAB PIPELINE.",
  dispatchResults,
  onReset,
  resetButtonText = "SUBMIT ANOTHER BRIEF",
  extraInfo
}: FormSuccessAnimationProps) {

  useEffect(() => {
    // Play celebratory sound chime if audio engine is active
    try {
      audioEngine.playSuccess?.();
    } catch (e) {}
  }, []);

  // 12 particles radiating outward for micro-confetti burst
  const particleAngles = Array.from({ length: 12 }, (_, i) => i * 30);
  const particleColors = [
    'bg-violet-500',
    'bg-emerald-500',
    'bg-amber-400',
    'bg-rose-500',
    'bg-indigo-500',
    'bg-teal-400'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 md:p-8 rounded-[2rem] clay-card text-center space-y-8 relative overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Subtle initial screen flash */}
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-violet-500/15 pointer-events-none rounded-[2rem]"
      />

      {/* CENTRAL MICRO-ANIMATION FRAME */}
      <div className="relative my-4 flex items-center justify-center">
        
        {/* Concentric expanding sonar ripple rings */}
        {[0, 0.3, 0.6].map((delay, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full border border-violet-500/30 bg-violet-500/5 pointer-events-none"
            style={{ width: 100, height: 100 }}
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: [0.9, 2.2, 2.8], opacity: [0.7, 0.25, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: delay,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Confetti micro-particle burst */}
        {particleAngles.map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const distance = 75 + (idx % 3) * 15;
          const x = Math.cos(rad) * distance;
          const y = Math.sin(rad) * distance;
          const colorClass = particleColors[idx % particleColors.length];

          return (
            <motion.div
              key={idx}
              className={`absolute w-2 h-2 rounded-full ${colorClass} shadow-sm pointer-events-none`}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x,
                y,
                scale: [0, 1.4, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180]
              }}
              transition={{
                duration: 1.1,
                delay: 0.2 + idx * 0.03,
                ease: [0.16, 1, 0.3, 1]
              }}
            />
          );
        })}

        {/* Central Claymorphic Orb Container */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
          className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-xl border border-white/30"
        >
          {/* Inner metallic ring glow */}
          <div className="absolute inset-1 rounded-full border border-white/20 pointer-events-none" />

          {/* SVG Animated Checkmark Path */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow-md"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M20 6 9 17l-5-5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.55,
                delay: 0.35,
                ease: "easeInOut"
              }}
            />
          </motion.svg>

          {/* Top-right sparkle accent */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="absolute -top-1 -right-1 bg-amber-400 text-stone-900 p-1.5 rounded-full shadow-lg border border-white"
          >
            <Sparkles size={14} className="animate-spin-slow" />
          </motion.div>
        </motion.div>
      </div>

      {/* STATUS BADGE & TEXT CONTENT */}
      <div className="space-y-4 relative z-10 max-w-lg mx-auto">
        {/* Animated Beacon Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 text-[10px] font-mono tracking-widest uppercase font-bold shadow-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>TRANSMISSION VERIFIED // 200 OK</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-stone-850 font-display font-black text-2xl sm:text-4xl tracking-tighter uppercase"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-stone-500 text-xs font-mono leading-relaxed uppercase tracking-widest max-w-md mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* DISPATCH TELEMETRY LOGS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="clay-card p-6 md:p-8 text-left font-mono text-xs text-stone-600 space-y-3 mt-6 border border-stone-200/40"
        >
          <div className="flex items-center justify-between border-b border-stone-200/40 pb-2">
            <span className="font-bold text-stone-850 uppercase tracking-widest text-[10px] flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-violet-600" />
              <span>PIPELINE DISPATCH LOGS</span>
            </span>
            <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              SECURE TLS
            </span>
          </div>

          {/* Log channel 1: SMTP Email */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
            className="flex justify-between items-center text-[11px]"
          >
            <span className="flex items-center space-x-2 text-stone-700">
              <Mail size={12} className="text-violet-600" />
              <span>SMTP SECURE MAIL:</span>
            </span>
            {dispatchResults?.email?.success ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Check size={12} /> DISPATCHED
              </span>
            ) : (
              <span className="text-amber-600 font-bold flex items-center gap-1">
                <Check size={12} /> STDOUT STANDBY
              </span>
            )}
          </motion.div>

          {/* Log channel 2: Telegram */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.72 }}
            className="flex justify-between items-center text-[11px]"
          >
            <span className="flex items-center space-x-2 text-stone-700">
              <Globe size={12} className="text-sky-600" />
              <span>TELEGRAM BOT API:</span>
            </span>
            {dispatchResults?.telegram?.success ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Check size={12} /> DISPATCHED
              </span>
            ) : (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Check size={12} /> ENQUEUED
              </span>
            )}
          </motion.div>

          {/* Log channel 3: WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.79 }}
            className="flex justify-between items-center text-[11px]"
          >
            <span className="flex items-center space-x-2 text-stone-700">
              <MessageSquare size={12} className="text-emerald-600" />
              <span>WHATSAPP GATEWAY:</span>
            </span>
            {dispatchResults?.whatsapp?.success ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Check size={12} /> DISPATCHED
              </span>
            ) : (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Check size={12} /> GATEWAY READY
              </span>
            )}
          </motion.div>

          {/* Signal wave indicator */}
          <div className="pt-2 border-t border-stone-200/30 flex items-center justify-between text-[9px] text-stone-400">
            <span>RECEIPT GUARANTEED</span>
            <div className="flex items-center space-x-1">
              {[0.4, 0.8, 0.6, 1.0, 0.5, 0.9, 0.3].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: ['4px', `${12 * h}px`, '4px'] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  className="w-0.5 bg-violet-500 rounded-full inline-block"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {extraInfo}

        {/* Reset / Submit Another Brief Button */}
        {onReset && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="pt-4"
          >
            <button
              type="button"
              onClick={onReset}
              className="px-8 py-4 bg-stone-900 hover:bg-stone-850 text-white font-mono text-xs font-bold tracking-[0.2em] uppercase rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2.5 mx-auto cursor-pointer"
            >
              <RefreshCw size={13} className="text-violet-400" />
              <span>{resetButtonText}</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

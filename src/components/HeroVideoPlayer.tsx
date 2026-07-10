import { motion } from 'motion/react';

export default function HeroVideoPlayer() {
  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-[#050505] border border-white/10 flex items-center justify-center shadow-2xl group">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
        src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-technological-network-31626-large.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-black/40 to-black/60 pointer-events-none mix-blend-overlay" />
      
      {/* Inner decorative elements */}
      <div className="absolute inset-4 sm:inset-6 border border-white/5 rounded-xl pointer-events-none transition-colors duration-500 group-hover:border-violet-500/30" />
      
      <div className="absolute bottom-6 left-6 flex items-center space-x-3 pointer-events-none">
        <div className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
        </div>
        <span className="font-mono text-[10px] sm:text-xs text-white/70 uppercase tracking-widest font-semibold">Autonomous Core Active</span>
      </div>
    </div>
  );
}

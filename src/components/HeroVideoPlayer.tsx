import { motion } from 'motion/react';
import { useState } from 'react';

export default function HeroVideoPlayer() {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.15
      }}
      className="w-full max-w-full h-full relative rounded-2xl overflow-hidden bg-[#050505] border border-white/10 flex items-center justify-center shadow-2xl group"
    >
      {!loaded && (
        <div className="absolute inset-0 bg-[#111] z-10 p-6 flex flex-col justify-end max-w-full">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-stone-200/50 to-transparent animate-[shimmer_1.5s_infinite]" />
          <div className="w-1/3 h-4 bg-white/10 rounded-sm mb-4" />
          <div className="w-1/2 h-4 bg-white/10 rounded-sm" />
        </div>
      )}

      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover max-w-full transition-opacity duration-700 ${loaded ? 'opacity-85 group-hover:opacity-100' : 'opacity-0'}`}
        src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-technological-network-31626-large.mp4"
        onCanPlayThrough={() => setLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/10 via-stone-900/10 to-stone-900/30 pointer-events-none mix-blend-overlay z-10" />
      
      {/* Inner decorative elements */}
      <div className="absolute inset-4 sm:inset-6 border border-white/10 rounded-xl pointer-events-none transition-colors duration-500 group-hover:border-violet-500/40 z-20" />
      
      <div className="absolute bottom-6 left-6 flex items-center space-x-3 pointer-events-none z-20">
        <div className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
        </div>
        <span className="font-mono text-[10px] sm:text-xs text-stone-100 uppercase tracking-widest font-semibold bg-[#050505]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
          Autonomous Core Active
        </span>
      </div>
    </motion.div>
  );
}
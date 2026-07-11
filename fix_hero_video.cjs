const fs = require('fs');

let content = fs.readFileSync('src/components/HeroVideoPlayer.tsx', 'utf8');

const newComponent = `import { motion } from 'motion/react';
import { useState } from 'react';

export default function HeroVideoPlayer() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-[#050505] border border-white/10 flex items-center justify-center shadow-2xl group">
      
      {!loaded && (
        <div className="absolute inset-0 bg-[#050505] z-10 p-6 flex flex-col justify-end">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" />
          <div className="w-1/3 h-4 bg-white/5 border border-white/10 rounded-sm mb-4" />
          <div className="w-1/2 h-4 bg-white/5 border border-white/10 rounded-sm" />
        </div>
      )}

      <video
        autoPlay
        loop
        muted
        playsInline
        className={\`absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 \${loaded ? 'opacity-70' : 'opacity-0'}\`}
        src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-technological-network-31626-large.mp4"
        onCanPlayThrough={() => setLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-black/40 to-black/60 pointer-events-none mix-blend-overlay z-10" />
      
      {/* Inner decorative elements */}
      <div className="absolute inset-4 sm:inset-6 border border-white/5 rounded-xl pointer-events-none transition-colors duration-500 group-hover:border-violet-500/30 z-20" />
      
      <div className="absolute bottom-6 left-6 flex items-center space-x-3 pointer-events-none z-20">
        <div className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
        </div>
        <span className="font-mono text-[10px] sm:text-xs text-white/70 uppercase tracking-widest font-semibold">Autonomous Core Active</span>
      </div>
    </div>
  );
}`;

fs.writeFileSync('src/components/HeroVideoPlayer.tsx', newComponent);
console.log('Fixed HeroVideoPlayer');

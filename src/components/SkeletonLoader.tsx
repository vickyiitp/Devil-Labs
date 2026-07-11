import React from 'react';
import { motion } from 'motion/react';

export default function SkeletonLoader() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-16 w-full"
      >
        {/* Header Skeleton */}
        <div className="space-y-6">
          <div className="w-32 h-4 bg-white/5 border border-white/10 rounded overflow-hidden relative">
            <div className="absolute inset-0 bg-violet-500/20 animate-pulse" />
          </div>
          <div className="w-full max-w-3xl h-16 sm:h-24 bg-white/5 border border-white/10 rounded overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
          <div className="w-2/3 max-w-xl h-6 bg-white/5 border border-white/10 rounded overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite_0.2s]" />
          </div>
        </div>

        {/* Content Skeletons - Brutalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square sm:aspect-auto sm:h-80 bg-black/40 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group">
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" style={{ animationDelay: `${i * 0.1}s` }} />
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm" />
                <div className="w-3/4 h-6 bg-white/5 border border-white/10 rounded-sm" />
                <div className="w-full h-2 bg-white/5 border border-white/10 rounded-sm" />
                <div className="w-5/6 h-2 bg-white/5 border border-white/10 rounded-sm" />
                <div className="w-4/6 h-2 bg-white/5 border border-white/10 rounded-sm" />
              </div>
              <div className="w-1/2 h-10 bg-white/5 border border-white/10 rounded-sm mt-8" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

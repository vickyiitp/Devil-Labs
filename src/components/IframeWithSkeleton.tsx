import React, { useState } from 'react';
import { motion } from 'motion/react';

interface IframeWithSkeletonProps {
  src: string;
  title: string;
}

export default function IframeWithSkeleton({ src, title }: IframeWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505]">
      {/* Skeleton / Loading State */}
      {!loaded && (
        <div className="absolute inset-0 p-8 flex flex-col space-y-6 z-0">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" />
          
          <div className="w-1/3 h-12 bg-white/5 border border-white/10 rounded-sm" />
          <div className="w-full h-6 bg-white/5 border border-white/10 rounded-sm" />
          <div className="w-5/6 h-6 bg-white/5 border border-white/10 rounded-sm" />
          
          <div className="grid grid-cols-2 gap-4 pt-12">
             <div className="aspect-video bg-white/5 border border-white/10 rounded-sm" />
             <div className="aspect-video bg-white/5 border border-white/10 rounded-sm" />
          </div>
        </div>
      )}

      {/* Actual Iframe */}
      <div className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left pointer-events-none z-10" style={{ transform: 'scale(0.25)' }}>
        <iframe 
          src={src} 
          className={`w-full h-full border-none bg-white transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          title={title}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

import { motion } from 'motion/react';
import { Star, Shield, Users, Zap, TrendingUp, Cpu } from 'lucide-react';

export default function SocialProofMarquee() {
  const proofItems = [
    { text: "TRUSTED BY YC ALUMNI", icon: Shield },
    { text: "$50M+ ARR GENERATED FOR CLIENTS", icon: TrendingUp },
    { text: "ENTERPRISE-GRADE ARCHITECTURES", icon: Cpu },
    { text: "1M+ ACTIVE END USERS", icon: Users },
    { text: "10X DEPLOYMENT VELOCITY", icon: Zap },
    { text: "RATED 5.0 ON CLUTCH", icon: Star },
  ];

  // Duplicate items twice to ensure seamless looping
  const marqueeItems = [...proofItems, ...proofItems, ...proofItems, ...proofItems];

  return (
    <div className="relative w-full overflow-hidden bg-violet-600 border-y border-violet-500 py-6">
      {/* Absolute fades on edges */}
      <div className="absolute top-0 left-0 w-16 sm:w-32 h-full bg-gradient-to-r from-violet-600 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 sm:w-32 h-full bg-gradient-to-l from-violet-600 to-transparent z-10 pointer-events-none" />

      <div className="flex">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 sm:gap-24">
          {marqueeItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-4 text-white tracking-widest text-xs font-bold uppercase font-sans"
              >
                <Icon size={16} className="text-black" />
                <span>{item.text}</span>
                <span className="text-violet-300">✦</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

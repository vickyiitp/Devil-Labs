import React, { useEffect, useState } from 'react';
import { animate, motion } from 'motion/react';

interface CardData {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  type: 'gradient' | 'image' | 'dark' | 'beige';
  bgClass?: string;
  imageUrl?: string;
  textColor?: string;
  accentText?: string;
}

const CARDS: CardData[] = [
  {
    id: 1,
    title: 'CREATIVE',
    subtitle: 'DEVIL LABS // OS',
    description: 'Autonomous interface mechanics.',
    type: 'dark',
    bgClass: 'bg-[#0a0a0a]',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80',
    textColor: 'text-stone-300-force',
    accentText: 'text-violet-400'
  },
  {
    id: 2,
    title: 'infinite',
    subtitle: 'SaaS Platform',
    description: 'Insurance that thinks ahead.',
    type: 'gradient',
    bgClass: 'bg-gradient-to-tr from-teal-500 via-emerald-600 to-orange-500',
    textColor: 'text-white-force',
    accentText: 'text-teal-100'
  },
  {
    id: 3,
    title: 'That Flows',
    subtitle: 'System Design',
    description: 'Seamless ergonomic architecture.',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    textColor: 'text-stone-850',
    accentText: 'text-stone-500'
  },
  {
    id: 4,
    title: 'Pour, Breathe, Begin',
    subtitle: 'Matcha Ritual',
    description: 'Slowing down to speed up.',
    type: 'beige',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    textColor: 'text-stone-800',
    accentText: 'text-stone-500'
  },
  {
    id: 5,
    title: 'MMAC DESIGN',
    subtitle: 'Luxury Architecture',
    description: 'Crafting spaces that resonate.',
    type: 'dark',
    bgClass: 'bg-[#121212]',
    imageUrl: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=600&q=80',
    textColor: 'text-stone-200-force',
    accentText: 'text-amber-500'
  },
  {
    id: 6,
    title: 'AURA PORTAL',
    subtitle: 'Intelligence Hub',
    description: 'Next-generation neural pipeline.',
    type: 'gradient',
    bgClass: 'bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-500',
    textColor: 'text-white-force',
    accentText: 'text-indigo-200'
  }
];

export default function ArchedHeroCarousel() {
  const [scrollOffset, setScrollOffset] = useState(2.5);
  const [dimensions, setDimensions] = useState({ width: 1200, isMobile: false });

  // Update dimensions for responsive scaling of the arch
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setDimensions({
        width: w,
        isMobile: w < 768
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate the scrollOffset continuously left-to-right then right-to-left
  useEffect(() => {
    const controls = animate(1.2, 3.8, {
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      onUpdate: (latest) => setScrollOffset(latest)
    });
    return () => controls.stop();
  }, []);

  // Determine carousel spatial dimensions
  const isMobile = dimensions.isMobile;
  const radius = isMobile ? 380 : 850; // The radius of the arch
  const angleSpacing = isMobile ? 22 : 16; // spacing angle in degrees
  const cardWidth = isMobile ? 150 : 250;
  const cardHeight = isMobile ? 220 : 360;

  return (
    <div className="relative w-full overflow-hidden select-none py-12 md:py-20 flex flex-col items-center justify-center min-h-[300px] md:min-h-[500px]">
      {/* Curved Path Container */}
      <div 
        className="relative flex items-center justify-center w-full"
        style={{
          height: `${cardHeight + 40}px`,
        }}
      >
        {CARDS.map((card, i) => {
          // Calculate individual offset from scroll center
          const cardOffset = i - scrollOffset;
          const angleInDeg = cardOffset * angleSpacing;
          const angleInRad = (angleInDeg * Math.PI) / 180;

          // Mathematical coordinate mapping along an upward-curved arch (rainbow shape)
          // Peak of the arch is at x = 0, y = 0 when angle = 0
          const x = radius * Math.sin(angleInRad);
          const y = radius * (Math.cos(angleInRad) - 1);
          
          // Rotation matches the angle to keep cards perpendicular to the circle path
          const rotate = angleInDeg;
          
          // Z-Index hierarchy places center-most card on top
          const zIndex = Math.round(100 - Math.abs(cardOffset) * 15);
          
          // Scale down cards as they move further away from the center
          const scale = Math.max(0.7, 1 - Math.abs(cardOffset) * 0.08);
          
          // Subtly fade cards towards the edge for visual depth
          const opacity = Math.max(0.15, 1 - Math.abs(cardOffset) * 0.28);

          return (
            <motion.div
              key={card.id}
              className="absolute origin-center rounded-[28px] md:rounded-[36px] overflow-hidden shadow-2xl border border-stone-200/40 cursor-grab active:cursor-grabbing text-left"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                x,
                y,
                rotate,
                zIndex,
                scale,
                opacity,
                transition: 'opacity 0.1s ease-out',
              }}
              whileHover={{ 
                scale: scale * 1.05,
                boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
              }}
            >
              {/* Card Contents */}
              <div className="relative w-full h-full flex flex-col justify-between p-4 md:p-6 text-left">
                
                {/* Background rendering based on type */}
                {card.type === 'gradient' && (
                  <div className={`absolute inset-0 z-0 ${card.bgClass}`} />
                )}

                {card.type === 'image' && (
                  <>
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                      style={{ backgroundImage: `url(${card.imageUrl})` }}
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
                  </>
                )}

                {card.type === 'beige' && (
                  <>
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                      style={{ backgroundImage: `url(${card.imageUrl})` }}
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#fbf9f4]/95 via-[#fbf9f4]/50 to-transparent" />
                  </>
                )}

                {card.type === 'dark' && (
                  <>
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center mix-blend-luminosity opacity-45"
                      style={{ backgroundImage: `url(${card.imageUrl})` }}
                    />
                    <div className={`absolute inset-0 z-0 ${card.bgClass} opacity-90`} />
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </>
                )}

                {/* Top Corner Meta Tag */}
                <div className="relative z-10 flex flex-col">
                  <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase font-bold opacity-80 text-stone-500">
                    {card.subtitle}
                  </span>
                  {card.title === 'infinite' && (
                    <span className="text-[14px] md:text-[18px] font-sans font-bold tracking-tight lowercase text-white-force mt-1">
                      infinite
                    </span>
                  )}
                </div>

                {/* Bottom Main Content */}
                <div className="relative z-10 mt-auto">
                  {card.title !== 'infinite' && (
                    <h4 className={`text-sm md:text-xl font-display font-black tracking-tight uppercase leading-none mb-1 md:mb-2 ${card.textColor}`}>
                      {card.title}
                    </h4>
                  )}
                  <p className={`text-xs md:text-sm leading-tight font-sans font-light opacity-90 ${card.textColor}`}>
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

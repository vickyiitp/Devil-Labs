import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Laptop, 
  Sparkles, 
  Palette, 
  Layers, 
  Type, 
  Cpu, 
  Database, 
  TrendingUp, 
  CloudLightning,
  CheckCircle2,
  Info
} from 'lucide-react';

interface FeatureCard {
  id: number;
  category: string;
  badge: string;
  desc: string;
  features: string[];
  type: 'purple' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'orange' | 'cyan' | 'dark';
  icon: React.ElementType;
  bgImage: string;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 1,
    category: "WEB DESIGN",
    badge: "HIGH-CONVERTING LAYOUTS",
    desc: "100% custom, hand-crafted web screens. No bloated pre-made templates. We detail custom user interfaces optimized to capture attention.",
    features: [
      "Custom UI/UX Wireframing",
      "Figma Prototype Fidelity",
      "Adaptive Mobile Layouts",
      "Conversion Rate Funnels"
    ],
    type: "purple",
    icon: Laptop,
    bgImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    category: "BRANDING",
    badge: "VISUAL IDENTITY",
    desc: "Complete visual language definition. Cohesive corporate logos, digital assets, color theory mappings, and spacing rules for consistent presentation.",
    features: [
      "Premium Logo Suite",
      "Harmonized Color Palettes",
      "Custom Vector Elements",
      "Brand Guidelines Sheet"
    ],
    type: "rose",
    icon: Palette,
    bgImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    category: "PRODUCT DESIGN",
    badge: "SYSTEM SCHEMATICS",
    desc: "Elegant product workflows, SaaS dashboard screens, responsive bento-grids, and modular system layouts built for long-term user retention.",
    features: [
      "User Journey Diagnostics",
      "Interactive Panel Controls",
      "Data Grid Configurations",
      "Micro-Interaction States"
    ],
    type: "amber",
    icon: Layers,
    bgImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    category: "TYPOGRAPHY",
    badge: "EDITORIAL TEXT SYSTEMS",
    desc: "Impeccable font selections (Inter, Space Grotesk, JetBrains Mono) paired with fine micro-spacing, precise tracking, and strict scale grids.",
    features: [
      "Custom Typography Hierarchy",
      "Dynamic Reading Fluidity",
      "Proportional Scale Grids",
      "High-Contrast Color Tuning"
    ],
    type: "indigo",
    icon: Type,
    bgImage: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    category: "AI & AUTOMATION",
    badge: "INTELLIGENT INTEGRATION",
    desc: "Custom server-side LLM proxies utilizing the Google GenAI SDK (Gemini API) and secure workflow automations to run your operations 24/7.",
    features: [
      "Gemini / OpenAI Integrations",
      "Autonomous WhatsApp / Chat Bot",
      "Intelligent Data Pipelines",
      "Automated Operational Tasks"
    ],
    type: "emerald",
    icon: Cpu,
    bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    category: "CUSTOM DEVELOP",
    badge: "TYPESAFE ENGINEERING",
    desc: "Robust, scalable front-and-backend coding. Clean React, Next.js, or Express server controllers without any heavy, untrusted dependencies.",
    features: [
      "Vite & React Fast-Loading",
      "Secure Server API Routes",
      "Scalable State Management",
      "Error-Free TypeScript Core"
    ],
    type: "cyan",
    icon: Database,
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 7,
    category: "SEO & SPEED",
    badge: "PERFORMANCE OPTIMIZATION",
    desc: "Targeting 95+ Core Web Vitals. Dynamic image compression, code prefetching, semantic layout tags, and structured JSON-LD schema injection.",
    features: [
      "Lighthouse 95+ Tuning",
      "Structured JSON-LD Schema",
      "SEO Meta Hierarchy Setup",
      "Google Search Console Index"
    ],
    type: "orange",
    icon: TrendingUp,
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 8,
    category: "DEPLOYMENT",
    badge: "PRODUCTION UPLINK",
    desc: "Secure, fully managed cloud architecture deployments on Vercel or AWS, integrated with automatic SSL certs and secure environments.",
    features: [
      "Edge Network Asset Deploy",
      "SSL Certificate Security",
      "CI/CD Pipeline Build System",
      "Managed Domain Routings"
    ],
    type: "dark",
    icon: CloudLightning,
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80"
  }
];

export default function PolishedFeatureMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCard, setSelectedCard] = useState<FeatureCard | null>(null);

  // Styling helper for themes matching the image style
  const getThemeClasses = (type: string) => {
    switch (type) {
      case 'purple':
        return {
          bg: 'bg-violet-50/90 border-violet-200/50 hover:border-violet-400',
          badge: 'bg-violet-100 text-violet-700',
          text: 'text-violet-900',
          accent: 'from-violet-600 to-indigo-500',
          glow: 'shadow-violet-200/50'
        };
      case 'rose':
        return {
          bg: 'bg-rose-50/90 border-rose-200/50 hover:border-rose-400',
          badge: 'bg-rose-100 text-rose-700',
          text: 'text-rose-900',
          accent: 'from-rose-600 to-pink-500',
          glow: 'shadow-rose-200/50'
        };
      case 'amber':
        return {
          bg: 'bg-amber-50/90 border-amber-200/50 hover:border-amber-400',
          badge: 'bg-amber-100 text-amber-700',
          text: 'text-amber-900',
          accent: 'from-amber-600 to-yellow-500',
          glow: 'shadow-amber-200/50'
        };
      case 'indigo':
        return {
          bg: 'bg-indigo-50/90 border-indigo-200/50 hover:border-indigo-400',
          badge: 'bg-indigo-100 text-indigo-700',
          text: 'text-indigo-900',
          accent: 'from-indigo-600 to-violet-500',
          glow: 'shadow-indigo-200/50'
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50/90 border-emerald-200/50 hover:border-emerald-400',
          badge: 'bg-emerald-100 text-emerald-700',
          text: 'text-emerald-900',
          accent: 'from-emerald-600 to-teal-500',
          glow: 'shadow-emerald-200/50'
        };
      case 'cyan':
        return {
          bg: 'bg-cyan-50/90 border-cyan-200/50 hover:border-cyan-400',
          badge: 'bg-cyan-100 text-cyan-700',
          text: 'text-cyan-900',
          accent: 'from-cyan-600 to-blue-500',
          glow: 'shadow-cyan-200/50'
        };
      case 'orange':
        return {
          bg: 'bg-orange-50/90 border-orange-200/50 hover:border-orange-400',
          badge: 'bg-orange-100 text-orange-700',
          text: 'text-orange-900',
          accent: 'from-orange-600 to-amber-500',
          glow: 'shadow-orange-200/50'
        };
      default:
        return {
          bg: 'bg-[#18181b]/95 border-zinc-700/50 hover:border-zinc-500 text-stone-100',
          badge: 'bg-zinc-800 text-zinc-300',
          text: 'text-white-force',
          accent: 'from-zinc-700 to-zinc-900',
          glow: 'shadow-zinc-900/50'
        };
    }
  };

  // Duplicate the array to make seamless infinite scrolling marquee
  const items = [...FEATURE_CARDS, ...FEATURE_CARDS, ...FEATURE_CARDS];

  return (
    <div className="w-full py-16 md:py-24 bg-[#FAF8F5]/40 rounded-[40px] border border-stone-200/40 shadow-inner overflow-hidden relative">
      {/* Decorative top background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2">
            <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-black flex items-center space-x-1.5">
              <Sparkles size={12} className="animate-spin-slow" />
              <span>DELIVERABLE SPECIFICATIONS</span>
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-800 uppercase tracking-tight leading-none">
              WHAT IS INCLUDED IN THE AMOUNT?
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
              We detail exactly what you are purchasing. There are no hidden fees or scope ambiguities. Scroll horizontally or hover to inspect specific item features.
            </p>
          </div>
          <div className="flex items-center space-x-3 font-mono text-[10px] text-stone-400 self-start md:self-end">
            <span>PAUSE STREAM ON HOVER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
          </div>
        </div>
      </div>

      {/* INFINITE SCROLL CAROUSEL TRACK */}
      <div 
        className="relative w-full flex items-center select-none overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft edge blur overlays to resemble premium modern design layout */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-6 py-6 px-4"
          animate={{
            x: isPaused ? undefined : ["0%", "-33.333%"]
          }}
          transition={{
            ease: "linear",
            duration: 38,
            repeat: Infinity
          }}
          style={{ width: "fit-content" }}
        >
          {items.map((card, idx) => {
            const theme = getThemeClasses(card.type);
            const Icon = card.icon;

            return (
              <motion.div
                key={`${card.id}-${idx}`}
                className={`w-[290px] sm:w-[350px] shrink-0 rounded-[32px] p-6 border transition-all duration-300 flex flex-col justify-between shadow-sm relative overflow-hidden text-left ${theme.bg} ${theme.glow}`}
                whileHover={{ 
                  y: -8, 
                  scale: 1.015,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
                }}
              >
                {/* Background image preview container with soft overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden opacity-10 pointer-events-none mix-blend-multiply transition-transform duration-700 hover:scale-110 max-w-full">
                  <img 
                    src={card.bgImage} 
                    alt={card.category} 
                    className="w-full h-full object-cover max-w-full grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-wider text-stone-400 uppercase">
                      {card.category}
                    </span>
                    <span className={`font-mono text-[8px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase ${theme.badge}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Card Icon & Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${theme.accent} text-white-force flex items-center justify-center shadow-sm`}>
                      <Icon size={18} />
                    </div>
                    <h3 className={`font-display font-black text-base sm:text-lg tracking-tight leading-none uppercase ${theme.text}`}>
                      {card.category}
                    </h3>
                  </div>

                  {/* Main Paragraph Description */}
                  <p className="text-stone-600 text-[11px] sm:text-xs leading-relaxed font-sans font-normal mb-6">
                    {card.desc}
                  </p>
                </div>

                {/* Scope deliverables checklist */}
                <div className="space-y-2 border-t border-stone-200/30 pt-4">
                  <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest block mb-2">
                    Scope Deliverables:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {card.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2">
                        <CheckCircle2 size={11} className="text-violet-600 flex-shrink-0" />
                        <span className="text-stone-700 font-mono text-[10px] leading-none uppercase font-semibold">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inspect button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedCard(card)}
                    className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest hover:text-violet-600 flex items-center space-x-1 transition-colors cursor-pointer"
                  >
                    <Info size={10} />
                    <span>View Detail Specs</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* DETAIL MODAL OVERLAY */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#faf8f4] border border-stone-200 max-w-lg w-full rounded-[40px] p-8 shadow-2xl relative text-left"
          >
            {/* Modal close */}
            <button 
              onClick={() => setSelectedCard(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold flex items-center justify-center text-xs transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-6 text-stone-800">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-3xl bg-gradient-to-br ${getThemeClasses(selectedCard.type).accent} text-white-force flex items-center justify-center shadow-md`}>
                  {React.createElement(selectedCard.icon, { size: 22 })}
                </div>
                <div>
                  <span className="font-sans text-[10px] text-violet-600 font-bold tracking-widest uppercase block">
                    {selectedCard.category} • CAPABILITY MODULE
                  </span>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-stone-800">
                    {selectedCard.category}
                  </h3>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/40">
                <span className="font-sans text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  OVERVIEW &amp; FOCUS
                </span>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                  {selectedCard.desc}
                </p>
              </div>

              <div className="space-y-3">
                <span className="font-sans text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                  INCLUDED CAPABILITIES &amp; DELIVERABLES:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedCard.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-stone-100/50 border border-stone-200/20">
                      <CheckCircle2 size={14} className="text-violet-600 mt-0.5 flex-shrink-0" />
                      <div className="space-y-0.5">
                        <span className="font-sans text-[10px] font-bold text-stone-800 uppercase block">{feat}</span>
                        <span className="text-[9px] text-stone-500 block leading-tight">Guaranteed deliverable.</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200/40 flex justify-between items-center">
                <span className="font-sans text-[9px] text-stone-400 uppercase">
                  Status: Available
                </span>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="px-6 py-2.5 bg-stone-800 hover:bg-stone-900 text-white-force font-sans text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

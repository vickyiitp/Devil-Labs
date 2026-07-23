import { motion } from 'motion/react';
import { ShoppingCart, LineChart, Stethoscope, Briefcase, Zap, Bot, ArrowRight, ShieldCheck } from 'lucide-react';
import CyberFrame from './CyberFrame';
import React, { useState, useEffect, useRef } from 'react';

const industries = [
  {
    id: 'ecommerce',
    title: 'E-Commerce AI',
    icon: ShoppingCart,
    desc: 'Autonomous inventory management & personalization engines.',
    preview: () => (
      <div className="flex flex-col space-y-3 p-3 bg-white/5 rounded-lg border border-white/10 h-full">
        <div className="flex justify-between items-center mb-2">
          <div className="w-16 h-3 bg-white/20 rounded-full" />
          <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center">
            <Bot size={12} className="text-violet-400" />
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-1/3 aspect-square bg-white/10 rounded-md" />
          <div className="w-2/3 flex flex-col space-y-2">
            <div className="w-full h-2 bg-white/20 rounded-full" />
            <div className="w-2/3 h-2 bg-white/10 rounded-full" />
            <div className="mt-auto w-1/2 h-4 bg-emerald-500/20 text-emerald-400 text-[8px] flex items-center justify-center rounded uppercase font-bold">In Stock</div>
          </div>
        </div>
        <div className="mt-auto pt-2 border-t border-white/10 flex justify-between items-center">
          <span className="text-[9px] text-gray-500 font-mono">Dynamic Pricing Active</span>
          <Zap size={10} className="text-fuchsia-400" />
        </div>
      </div>
    )
  },
  {
    id: 'finance',
    title: 'FinTech Automation',
    icon: LineChart,
    desc: 'Real-time vector DB dashboards & risk analysis agents.',
    preview: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [points, setPoints] = useState([40, 45, 42, 50, 48, 55, 60]);
      
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        const i = setInterval(() => {
          setPoints(p => [...p.slice(1), Math.floor(Math.random() * 40) + 40]);
        }, 1500);
        return () => clearInterval(i);
      }, []);

      return (
        <div className="flex flex-col space-y-3 p-3 bg-white/5 rounded-lg border border-white/10 h-full relative overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <div>
              <div className="text-[10px] text-gray-400 font-mono uppercase mb-1">Portfolio Alpha</div>
              <div className="text-lg font-bold text-white font-mono">$124.5K</div>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded flex items-center">
              +14.2%
            </div>
          </div>
          <div className="flex-grow flex items-end justify-between space-x-1 pt-4 opacity-70">
            {points.map((p, i) => (
              <motion.div 
                key={i}
                layout
                className="w-full bg-violet-500/40 rounded-t-sm"
                style={{ height: `${p}%` }}
              />
            ))}
          </div>
          <div className="absolute top-2 right-2 flex space-x-1">
             <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
             <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
             <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
          </div>
        </div>
      );
    }
  },
  {
    id: 'healthcare',
    title: 'HealthTech AI',
    icon: Stethoscope,
    desc: 'HIPAA-compliant triage bots & patient data processing.',
    preview: () => (
      <div className="flex flex-col p-3 bg-white/5 rounded-lg border border-white/10 h-full">
        <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-white/10">
          <ShieldCheck size={14} className="text-blue-400" />
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Secured Data</span>
        </div>
        <div className="space-y-2 flex-grow">
          <div className="w-full bg-black/50 p-2 rounded flex items-start space-x-2 border border-white/5">
            <div className="w-4 h-4 rounded-full bg-gray-600 shrink-0" />
            <div className="space-y-1 w-full">
              <div className="w-1/2 h-1.5 bg-white/30 rounded-full" />
              <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />
            </div>
          </div>
          <div className="w-full bg-blue-500/10 p-2 rounded flex items-start space-x-2 border border-blue-500/20">
            <div className="w-4 h-4 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0">
              <Bot size={8} className="text-blue-400" />
            </div>
            <div className="space-y-1 w-full">
              <div className="w-full h-1.5 bg-blue-400/50 rounded-full" />
              <div className="w-2/3 h-1.5 bg-blue-400/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'saas',
    title: 'B2B SaaS Automation',
    icon: Briefcase,
    desc: 'Automated onboarding, multi-tenant DBs, & billing AI.',
    preview: () => (
      <div className="flex flex-col p-3 bg-white/5 rounded-lg border border-white/10 h-full">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-white/5 p-2 rounded border border-white/5">
            <div className="text-[8px] text-gray-500 uppercase">Users</div>
            <div className="text-xs font-bold font-mono">1,024</div>
          </div>
          <div className="bg-white/5 p-2 rounded border border-white/5">
            <div className="text-[8px] text-gray-500 uppercase">MRR</div>
            <div className="text-xs font-bold font-mono text-emerald-400">$42k</div>
          </div>
        </div>
        <div className="mt-auto space-y-1.5">
          <div className="text-[9px] text-gray-400 uppercase font-mono mb-1">Active Workflows</div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full h-4 bg-black/40 rounded flex items-center px-2 space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              <div className="h-1 bg-white/20 rounded-full flex-grow" />
            </div>
          ))}
        </div>
      </div>
    )
  }
];

function IndustryCard({ ind, idx }: { ind: any; idx: number; key?: React.Key }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max rotation 12 degrees for dynamic response
    const rX = -(mouseY / (height / 2)) * 12;
    const rY = (mouseX / (width / 2)) * 12;
    
    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const Preview = ind.preview;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, rotateX: 20, rotateY: -15, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        type: "spring",
        stiffness: 70,
        damping: 18,
        delay: idx * 0.12 
      }}
      style={{ 
        perspective: 1200,
        transformStyle: "preserve-3d"
      }}
      animate={isHovered ? {
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: 1.04,
        z: 25
      } : {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        z: 0
      }}
      className="group h-full flex flex-col cursor-pointer"
    >
      <CyberFrame className="flex flex-col p-6 h-full bg-[#0a0a0a] transition-all duration-300 hover:bg-[#111] hover:border-violet-500/30 shadow-2xl relative overflow-hidden">
        {/* Soft interactive glowing backdrop for premium 3D-feel */}
        {isHovered && (
          <motion.div 
            layoutId={`glow-${ind.id}`}
            className="absolute -inset-24 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none z-0"
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        )}

        <div className="flex items-center space-x-3 mb-4 relative z-10">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-violet-500/40 transition-colors">
            <ind.icon size={20} className="text-white group-hover:text-violet-400 transition-colors" />
          </div>
          <h3 className="font-bold text-lg text-white font-display">{ind.title}</h3>
        </div>
        <p className="text-xs text-gray-400 mb-6 flex-grow relative z-10">{ind.desc}</p>
        
        {/* Mini UI Container with 3D Depth translation */}
        <div className="h-40 w-full mt-auto relative z-10 group-hover:translate-z-[20px] transition-transform duration-300">
          <Preview />
        </div>
      </CyberFrame>
    </motion.div>
  );
}

export default function IndustrySolutions() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/5">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
          Solutions Engineered By <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Industry</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          We do not rely on generic templates. We build bespoke UI components, AI agent logic, and automation workflows tailored strictly to your sector's operational reality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {industries.map((ind, idx) => (
          <IndustryCard key={ind.id} ind={ind} idx={idx} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <a href="/contact" className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-violet-400 hover:text-white transition-colors">
          <span>Discuss your industry needs</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}

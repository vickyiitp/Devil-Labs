import { Cpu, Code2, Database, Terminal, Layers, RefreshCw, Server, Zap } from 'lucide-react';

export default function Marquee() {
  const items = [
    { name: 'REACT', icon: Code2 },
    { name: 'NEXT.JS', icon: Layers },
    { name: 'PYTHON', icon: Terminal },
    { name: 'MONGODB', icon: Database },
    { name: 'RENDER', icon: Server },
    { name: 'FASTAPI', icon: Zap },
    { name: 'POSTGRESQL', icon: Database },
    { name: 'LANGCHAIN', icon: Cpu },
    { name: 'GITHUB', icon: Code2 },
    { name: 'CURSOR', icon: RefreshCw },
  ];

  // Duplicate items twice to ensure seamless looping
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div id="tech-stack-marquee-wrapper" className="relative w-full overflow-hidden bg-black/40 border-y border-white/5 py-8">
      {/* Absolute fades on edges */}
      <div className="absolute top-0 left-0 w-24 sm:w-48 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 sm:w-48 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="flex">
        <div id="marquee-scroller" className="animate-marquee whitespace-nowrap flex items-center gap-12 sm:gap-24">
          {marqueeItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 text-gray-500 hover:text-white transition-colors duration-300 font-mono tracking-widest text-sm"
              >
                <Icon size={18} className="text-violet-500/80" />
                <span className="font-semibold">{item.name}</span>
                <span className="text-gray-700 font-normal">/</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

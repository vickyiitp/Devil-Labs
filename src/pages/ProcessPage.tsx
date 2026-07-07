import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, Code2, ShieldCheck, Zap } from 'lucide-react';

export default function ProcessPage({ navigate }: { navigate: (path: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      id: "01",
      title: "System Design",
      desc: "Architecture & DB modeling. We lay the structural foundation before a single line of code is written.",
    },
    {
      id: "02",
      title: "The Build Sprint",
      desc: "AI-assisted rapid full-stack development. We use autonomous agents for extreme velocity.",
    },
    {
      id: "03",
      title: "Hardening",
      desc: "Security, QA, and manual polish. Stress-testing edge cases and refining the experience.",
    },
    {
      id: "04",
      title: "Deployment",
      desc: "Cloud scaling on Render/Vercel. Zero-downtime releases and continuous integration.",
    }
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-32 text-center"
      >
        <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">The Engine Room</h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          How we ship enterprise-grade architecture in weeks, not months. We combine meticulous human engineering with AI-assisted velocity to outpace traditional agencies.
        </p>
      </motion.div>

      {/* Interactive Timeline */}
      <div ref={containerRef} className="relative max-w-3xl mx-auto mb-40 pl-8 md:pl-0">
        {/* The Glowing Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
        <motion.div 
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-violet-500 shadow-neon-violet md:-translate-x-1/2 origin-top"
          style={{ scaleY: lineHeight }}
        />

        <div className="space-y-24">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`relative flex items-center md:justify-between ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Dot */}
              <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 rounded-full bg-[#050505] border-2 border-violet-500 md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
              
              {/* Content Box */}
              <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                <span className="text-violet-500 font-bold text-xs tracking-widest mb-2 block">PHASE {step.id}</span>
                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Velocity Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
           <span className="text-violet-500 font-bold text-xs tracking-widest uppercase mb-4 block">The Advantage</span>
           <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Why We Build Differently</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-8 hover:border-violet-500/50 transition-colors group">
            <Zap className="text-violet-400 mb-6 group-hover:scale-110 transition-transform" size={24} />
            <h4 className="text-white font-bold tracking-tight uppercase mb-2">AI Velocity</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              We augment our codebase with AI-assisted generation, dramatically reducing manual boilerplate and increasing iteration speed.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 hover:border-violet-500/50 transition-colors group">
            <Code2 className="text-violet-400 mb-6 group-hover:scale-110 transition-transform" size={24} />
            <h4 className="text-white font-bold tracking-tight uppercase mb-2">Zero Tech Debt</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              By utilizing strictly typed languages and robust CI/CD pipelines, we ensure that technical debt never accumulates.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 hover:border-violet-500/50 transition-colors group">
            <ShieldCheck className="text-violet-400 mb-6 group-hover:scale-110 transition-transform" size={24} />
            <h4 className="text-white font-bold tracking-tight uppercase mb-2">Enterprise Security</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Every system is hardened with industry-standard OAuth patterns, strict database schema rules, and edge-deployed routing.
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Globe, Cpu, MapPin, Award, Terminal } from 'lucide-react';
import CyberFrame from '../components/CyberFrame';
import DevilLabsLogo from '../components/DevilLabsLogo';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export default function AboutPage({ navigate }: AboutPageProps) {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto min-h-screen">
      {/* Header */}
      <section className="mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-violet-400 font-mono text-[10px] uppercase tracking-[0.3em] font-semibold block mb-6"
        >
          04_ABOUT_US
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter uppercase leading-[0.9] mb-8"
        >
          Redefining <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-violet-400 font-serif italic font-light lowercase text-6xl sm:text-8xl lg:text-9xl">engineering</span> <br/>
          In India.
        </motion.h1>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10 items-start">
        {/* LEFT COLUMN: Narrative */}
        <div className="lg:col-span-7 space-y-12 font-mono text-sm uppercase tracking-widest leading-relaxed text-gray-400">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-6 text-white font-bold text-base">
              Devil Labs stands as the premier technology architecture firm in Bihar, India. Headquartered in Gaya, we lead the region in high-performance digital services.
            </p>
            <p className="mb-6">
              Our mission is to bridge the gap between abstract concepts and production-grade reality. We specialize in AI integration, full-stack architectures, and high-performance user interfaces. Recognized as the top IT service provider in Gaya and across Bihar, we deliver world-class software that scales.
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="relative group shrink-0 mt-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-300" />
              <img 
                src="https://github.com/Devil-Labs.png" 
                alt="Vicky - Founder & Architect" 
                referrerPolicy="no-referrer"
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border border-white/15 relative z-10"
              />
            </div>
            <div>
              <h3 className="text-violet-400 font-bold mb-4 flex items-center gap-2">
                <Terminal size={14} />
                The Architect: vickyiitp.tech
              </h3>
              <p className="mb-6">
                Founded and led by Vicky (vickyiitp.tech), Devil Labs is built on a foundation of rigorous engineering and brutalist aesthetic perfection. Drawing from elite technical pedigree, the lab operates on strict principles of code quality, performance, and uncompromising security.
              </p>
              <p>
                We don't just build websites; we engineer digital ecosystems. From deep AI automation to robust enterprise platforms, our work speaks for itself across the global matrix.
              </p>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="pt-8 border-t border-white/10"
          >
            <h3 className="text-white font-bold mb-6">Core Statistics</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-display font-black text-white">#1</div>
                <div className="text-[10px] text-gray-500 mt-1">IN BIHAR FOR TECH SERVICES</div>
              </div>
              <div>
                <div className="text-3xl font-display font-black text-white">100+</div>
                <div className="text-[10px] text-gray-500 mt-1">ARCHITECTURES DEPLOYED</div>
              </div>
              <div>
                <div className="text-3xl font-display font-black text-white">24/7</div>
                <div className="text-[10px] text-gray-500 mt-1">SYSTEM MONITORING</div>
              </div>
              <div>
                <div className="text-3xl font-display font-black text-white">0</div>
                <div className="text-[10px] text-gray-500 mt-1">COMPROMISED SYSTEMS</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Sidebar Links & Info */}
        <div className="lg:col-span-5 space-y-8">
          <CyberFrame glowColor="violet" className="p-8 bg-black/40 rounded-2xl flex flex-col space-y-8">
            <div className="flex flex-col items-center justify-center p-6 border-b border-white/10 pb-8">
              <div className="relative group mb-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <img 
                  src="https://github.com/Devil-Labs.png" 
                  alt="Devil Labs Profile" 
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-full object-cover border-2 border-white/20 relative z-10 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="font-display text-white text-lg font-black tracking-widest mt-2">DEVIL LABS</span>
              <span className="text-[9px] text-gray-500 tracking-[0.3em] font-mono mt-1">SECURE LAB IDENTIFIER</span>
            </div>

            <div>
              <h3 className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
                <MapPin size={14} className="text-violet-400" />
                Headquarters
              </h3>
              <p className="font-mono text-gray-400 text-sm uppercase tracking-widest leading-loose">
                Devil Labs<br/>
                Gaya, Bihar<br/>
                India (Sector 01)
              </p>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
                <Award size={14} className="text-violet-400" />
                Recognitions
              </h3>
              <ul className="space-y-4 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 bg-violet-500 rounded-full" />
                  <span>Top IT Agency in Gaya</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 bg-violet-500 rounded-full" />
                  <span>Leading Tech Innovator Bihar</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
                <Globe size={14} className="text-violet-400" />
                Network Links
              </h3>
              <div className="space-y-3 font-mono text-[10px] uppercase tracking-widest font-bold">
                <a href="https://instagram.com/devil_labs" target="_blank" rel="noreferrer" className="flex items-center justify-between group text-gray-400 hover:text-white transition-colors bg-white/5 p-4 rounded-xl border border-white/5 hover:border-violet-500/30">
                  <span>Instagram</span>
                  <ArrowUpRight size={14} className="text-violet-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="https://linkedin.com/company/devil-labs" target="_blank" rel="noreferrer" className="flex items-center justify-between group text-gray-400 hover:text-white transition-colors bg-white/5 p-4 rounded-xl border border-white/5 hover:border-violet-500/30">
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} className="text-violet-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="https://github.com/Devil-Labs/" target="_blank" rel="noreferrer" className="flex items-center justify-between group text-gray-400 hover:text-white transition-colors bg-white/5 p-4 rounded-xl border border-white/5 hover:border-violet-500/30">
                  <span>GitHub Organization</span>
                  <ArrowUpRight size={14} className="text-violet-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="https://vickyiitp.tech" target="_blank" rel="noreferrer" className="flex items-center justify-between group text-gray-400 hover:text-white transition-colors bg-white/5 p-4 rounded-xl border border-white/5 hover:border-violet-500/30">
                  <span>Founder: vickyiitp.tech</span>
                  <ArrowUpRight size={14} className="text-violet-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </CyberFrame>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Globe, Cpu, MapPin, Award, Terminal } from 'lucide-react';
import DevilLabsLogo from '../components/DevilLabsLogo';
import TeamSection from '../components/TeamSection';
import ScrollReveal from '../components/ScrollReveal';
import BlurredImage from '../components/BlurredImage';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export default function AboutPage({ navigate }: AboutPageProps) {
  return (
    <div className="pt-20 xs:pt-24 sm:pt-28 lg:pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen text-stone-800">
      {/* Header */}
      <section className="mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-violet-600 font-mono text-xs uppercase tracking-[0.3em] font-semibold block mb-6"
        >
          ✦ ABOUT US
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-850 tracking-tighter uppercase leading-[0.9] mb-8 break-words max-w-full"
        >
          Redefining <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 font-serif italic font-light lowercase text-3xl xs:text-4xl sm:text-7xl md:text-8xl lg:text-9xl break-words max-w-full">engineering</span> <br/>
          In India.
        </motion.h1>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10 items-start">
        {/* LEFT COLUMN: Narrative */}
        <div className="lg:col-span-7 space-y-12 font-mono text-sm uppercase tracking-widest leading-relaxed text-stone-600">
          <ScrollReveal>
            <p className="mb-6 text-stone-850 font-bold text-base">
              Devil Labs stands as the premier technology architecture firm in Bihar, India. Headquartered in Gaya, we lead the region in high-performance digital services.
            </p>
            <p className="mb-6 text-xs leading-loose text-stone-500 normal-case">
              Our mission is to bridge the gap between abstract concepts and production-grade reality. We specialize in AI integration, full-stack architectures, and high-performance user interfaces. Recognized as the top IT service provider in Gaya and across Bihar, we deliver world-class software that scales.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative group shrink-0 mt-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-400 to-rose-400 rounded-3xl blur-lg opacity-35 group-hover:opacity-60 transition-opacity duration-300" />
                <BlurredImage 
                  src="https://github.com/Devil-Labs.png" 
                  alt="Vicky - Founder & Architect" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border border-stone-200 relative z-10 shadow-sm"
                />
              </div>
              <div>
                <h3 className="text-violet-700 font-bold mb-4 flex items-center gap-2 text-sm">
                  <Terminal size={14} />
                  The Architect: vickyiitp.tech
                </h3>
                <p className="mb-6 text-xs normal-case text-stone-500 leading-loose">
                  Founded and led by Vicky (vickyiitp.tech), Devil Labs is built on a foundation of rigorous engineering and a highly polished neumorphic trend style. Drawing from elite technical pedigree, the lab operates on strict principles of code quality, performance, and uncompromising security.
                </p>
                <p className="text-xs normal-case text-stone-500 leading-loose">
                  We don't just build websites; we engineer digital ecosystems. From deep AI automation to robust enterprise platforms, our work speaks for itself across the global matrix.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="pt-8 border-t border-stone-200/50">
              <h3 className="text-stone-850 font-bold mb-6 text-sm">Core Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left">
                <div>
                  <div className="text-3xl font-display font-black text-stone-850">#1</div>
                  <div className="text-xs text-stone-400 mt-1 font-mono tracking-widest uppercase">IN BIHAR FOR TECH SERVICES</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-black text-stone-850">100+</div>
                  <div className="text-xs text-stone-400 mt-1 font-mono tracking-widest uppercase">ARCHITECTURES DEPLOYED</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-black text-stone-850">24/7</div>
                  <div className="text-xs text-stone-400 mt-1 font-mono tracking-widest uppercase">SYSTEM MONITORING</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-black text-stone-850">0</div>
                  <div className="text-xs text-stone-400 mt-1 font-mono tracking-widest uppercase">COMPROMISED SYSTEMS</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="pt-8 border-t border-stone-200/50">
              <h3 className="text-stone-850 font-bold mb-6 text-sm">ARCHITECTURAL MANIFESTO</h3>
              <div className="space-y-6">
                <div className="p-6 md:p-8 clay-card bg-[#faf9f5] border border-stone-200/40 rounded-[24px]">
                  <h4 className="text-xs font-black text-violet-700 tracking-wider uppercase mb-1">01 / TYPESAFE DETERMINISM</h4>
                  <p className="text-xs text-stone-500 normal-case leading-relaxed font-sans">
                    We eliminate common runtime vulnerabilities before compile-time. Every data entity, service interface, and micro-routing barrier is protected by absolute typing, ensuring bulletproof system consistency.
                  </p>
                </div>
                <div className="p-6 md:p-8 clay-card bg-[#faf9f5] border border-stone-200/40 rounded-[24px]">
                  <h4 className="text-xs font-black text-violet-700 tracking-wider uppercase mb-1">02 / HYPER-OPTIMIZED EDGE SPEED</h4>
                  <p className="text-xs text-stone-500 normal-case leading-relaxed font-sans">
                    We enforce tight performance standards on every single client payload. Our code is micro-compiled, minified, and delivered using Edge computing caches to ensure immediate time-to-interactive profiles.
                  </p>
                </div>
                <div className="p-6 md:p-8 clay-card bg-[#faf9f5] border border-stone-200/40 rounded-[24px]">
                  <h4 className="text-xs font-black text-violet-700 tracking-wider uppercase mb-1">03 / ZERO-TRUST ENVELOPE PROTECTION</h4>
                  <p className="text-xs text-stone-500 normal-case leading-relaxed font-sans">
                    All inputs and network payloads undergo sanitization layers prior to persistent storage write. By employing cryptographic tokenization, state exposure risks are thoroughly minimized.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* RIGHT COLUMN: Sidebar Links & Info */}
        <div className="lg:col-span-5 space-y-8">
          <ScrollReveal delay={200}>
            <div className="p-6 md:p-8 clay-card flex flex-col space-y-8 text-left">
              <div className="flex flex-col items-center justify-center p-6 border-b border-stone-200/30 pb-8">
                <div className="relative group mb-4">
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-300 to-rose-300 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <BlurredImage 
                  src="https://github.com/Devil-Labs.png" 
                  alt="Devil Labs Profile" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-20 h-20 rounded-full border-2 border-white relative z-10 transition-transform duration-500 group-hover:scale-105 shadow-md"
                />
              </div>
              <span className="font-display text-stone-850 text-lg font-black tracking-widest mt-2">DEVIL LABS</span>
              <span className="text-xs text-stone-400 tracking-[0.3em] font-mono mt-1">SECURE LAB IDENTIFIER</span>
              </div>

              <div>
                <h3 className="text-stone-850 font-mono text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                  <MapPin size={14} className="text-violet-600" />
                  Headquarters
                </h3>
                <p className="font-mono text-stone-500 text-xs uppercase tracking-widest leading-loose">
                  Devil Labs<br/>
                  Gaya, Bihar<br/>
                  India (Sector 01)
                </p>
              </div>

              <div className="pt-8 border-t border-stone-200/30">
                <h3 className="text-stone-850 font-mono text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                  <Award size={14} className="text-violet-600" />
                  Recognitions
                </h3>
                <ul className="space-y-4 font-mono text-xs text-stone-500 uppercase tracking-widest">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
                    <span>Top IT Agency in Gaya</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
                    <span>Leading Tech Innovator Bihar</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 border-t border-stone-200/30">
                <h3 className="text-stone-850 font-mono text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                  <Globe size={14} className="text-violet-600" />
                  Network Links
                </h3>
                <div className="space-y-3 font-mono text-xs uppercase tracking-widest font-bold">
                  <a href="https://instagram.com/devillabs" target="_blank" rel="noreferrer" className="flex items-center justify-between group text-stone-600 hover:text-stone-850 transition-all clay-button p-4.5 rounded-2xl">
                    <span>Instagram</span>
                    <ArrowUpRight size={14} className="text-violet-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a href="https://linkedin.com/company/devillabs" target="_blank" rel="noreferrer" className="flex items-center justify-between group text-stone-600 hover:text-stone-850 transition-all clay-button p-4.5 rounded-2xl">
                    <span>LinkedIn</span>
                    <ArrowUpRight size={14} className="text-violet-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a href="https://github.com/Devil-Labs/" target="_blank" rel="noreferrer" className="flex items-center justify-between group text-stone-600 hover:text-stone-850 transition-all clay-button p-4.5 rounded-2xl">
                    <span>GitHub Organization</span>
                    <ArrowUpRight size={14} className="text-violet-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a href="https://vickyiitp.tech" target="_blank" rel="noreferrer" className="flex items-center justify-between group text-stone-600 hover:text-stone-850 transition-all clay-button p-4.5 rounded-2xl">
                    <span>Founder: vickyiitp.tech</span>
                    <ArrowUpRight size={14} className="text-violet-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Our Team Interactive Section */}
      <TeamSection />
    </div>
  );
}

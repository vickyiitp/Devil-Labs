import { motion } from 'motion/react';
import { Github, Linkedin, Globe, Cpu, Terminal, ArrowUpRight, Award, ShieldAlert, Sparkles, Code2 } from 'lucide-react';
import { audioEngine } from '../lib/audio';
import CyberFrame from './CyberFrame';
import BlurredImage from './BlurredImage';

interface Skill {
  name: string;
  level: number;
}

const skillsList: Skill[] = [
  { name: 'System Architecture', level: 98 },
  { name: 'AI & Gemini Integrations', level: 95 },
  { name: 'React & Node.js Ecosystems', level: 97 },
  { name: 'Cloud Infrastructure & GCP', level: 94 }
];

export default function TeamSection() {
  return (
    <div className="mt-32 pt-20 border-t border-white/10" id="our-team">
      {/* Title */}
      <div className="mb-16">
        <span className="text-violet-400 font-mono text-[10px] uppercase tracking-[0.3em] font-semibold block mb-4">
          05_PRINCIPAL_ARCHITECT
        </span>
        <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tighter uppercase leading-[0.9]">
          LEADERSHIP <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-violet-400 font-serif italic font-light lowercase text-5xl sm:text-7xl">
            systems engineer
          </span>
        </h2>
        <p className="text-gray-400 font-mono text-xs uppercase tracking-wider mt-4 max-w-xl leading-relaxed">
          THE INTELLECTUAL INFRASTRUCTURE DRIVING DEVIL LABS OPERATIONS. PROTOCOL ENGINEERING AND DEEP SYSTEMS INTEGRITY.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Left Column: Visual Card/Display */}
        <div className="lg:col-span-5 h-full">
          <CyberFrame glowColor="violet" className="p-8 bg-black/60 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient scanning line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-[pulse_1.5s_infinite]" />
            
            <div className="space-y-6">
              {/* Avatar and system state */}
              <div className="flex items-center justify-between">
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-600/20 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                  <BlurredImage
                    src="https://github.com/vickyiitp.png"
                    alt="Vicky Kumar"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border border-white/10 relative z-10 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                
                <div className="text-right flex flex-col items-end">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[8px] text-emerald-400 tracking-wider font-bold">SECURE_NODE_ACTIVE</span>
                  </div>
                  <span className="font-mono text-[8px] text-gray-400 mt-1 uppercase tracking-widest font-bold">99.98% NODE RUNTIME</span>
                  <span className="font-mono text-[7px] text-gray-600 mt-1 uppercase tracking-widest font-bold">NODE ID: VK-IITP-01</span>
                </div>
              </div>

              {/* Identification details */}
              <div>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                  VICKY KUMAR
                </h3>
                <p className="font-mono text-[10px] text-violet-400 uppercase tracking-widest mt-1.5 font-bold">
                  FOUNDER &amp; PRINCIPAL ARCHITECT
                </p>
              </div>

              {/* Core tags / categories */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Full-Stack', 'AI Pipelines', 'Cloud Security', 'GCP Architect'].map((tag, i) => (
                  <span key={i} className="text-[8px] font-mono font-bold tracking-widest px-2.5 py-1 bg-white/5 text-gray-300 rounded-full border border-white/5 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick stats and action links */}
            <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="text-left">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block font-bold">COMPLETED_BUILDS</span>
                <span className="text-2xl font-display font-black text-white">48+ SYSTEMS</span>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href="https://github.com/vickyiitp"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => audioEngine.playHover()}
                  onClick={() => audioEngine.playClick()}
                  className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-all"
                  title="GitHub Profile"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://linkedin.com/in/vickyiitp"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => audioEngine.playHover()}
                  onClick={() => audioEngine.playClick()}
                  className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-all"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://vickyiitp.tech"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => audioEngine.playHover()}
                  onClick={() => audioEngine.playClick()}
                  className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-all"
                  title="Personal Web Node"
                >
                  <Globe size={16} />
                </a>
              </div>
            </div>
          </CyberFrame>
        </div>

        {/* Right Column: In-depth System Parameters */}
        <div className="lg:col-span-7 h-full">
          <CyberFrame glowColor="fuchsia" className="p-8 bg-black/40 rounded-3xl h-full flex flex-col justify-between">
            <div className="space-y-6">
              {/* Detailed systems inspection banner */}
              <div>
                <span className="font-mono text-[8px] text-fuchsia-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Cpu size={10} />
                  DETAILED SYSTEMS INSPECTION
                </span>
                <h3 className="text-xl font-display font-black text-white mt-2 uppercase tracking-tight">
                  SYSTEM OVERVIEW
                </h3>
              </div>

              {/* Bio description */}
              <div className="space-y-2">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest font-bold block">// BIO_SUMMARY</span>
                <p className="font-mono text-xs uppercase text-gray-300 tracking-widest leading-relaxed">
                  Elite engineer and system architect leading digital transformation and technology implementation across India. Vicky directs the physical and logical architectures at Devil Labs, drawing on high-pedigree computer science principles to build secure, robust systems.
                </p>
              </div>

              {/* Specialty Parameters */}
              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl space-y-2">
                <div className="flex items-center space-x-1.5 text-violet-400">
                  <Terminal size={12} />
                  <span className="font-mono text-[8px] font-bold tracking-widest uppercase">PRIMARY_SPECIALTY</span>
                </div>
                <p className="font-mono text-xs font-bold text-white uppercase tracking-widest pl-4">
                  SYSTEMS ARCHITECTURE &amp; AUTOMATION
                </p>
              </div>

              {/* Skill Parameters / Progress Bars */}
              <div className="space-y-4 pt-2">
                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest font-bold block">// SYSTEM_PARAMETERS</span>
                <div className="space-y-3.5">
                  {skillsList.map((skill, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between font-mono text-[8px] text-gray-400 uppercase tracking-widest font-bold">
                        <span>{skill.name}</span>
                        <span className="text-violet-400">{skill.level}% CAP</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, delay: 0.1 * index }}
                          className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Certifications */}
            <div className="pt-6 mt-8 border-t border-white/5 flex flex-wrap items-center gap-4 text-gray-500 font-mono text-[8px] uppercase tracking-widest font-bold">
              <span className="flex items-center gap-1">
                <Award size={12} className="text-violet-400" />
                IIT PATNA ALUMNUS
              </span>
              <span className="text-gray-700">•</span>
              <span className="flex items-center gap-1">
                <ShieldAlert size={12} className="text-fuchsia-400" />
                SECURED BY END-TO-END CRYPTO PROTOCOLS
              </span>
            </div>
          </CyberFrame>
        </div>
      </div>
    </div>
  );
}

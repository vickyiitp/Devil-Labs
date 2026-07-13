import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Globe, Cpu, Terminal, ArrowUpRight, Award, ShieldAlert, Sparkles, Code2 } from 'lucide-react';
import { audioEngine } from '../lib/audio';
import CyberFrame from './CyberFrame';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  specialty: string;
  uptime: string;
  completedSystems: number;
  tags: string[];
  skills: { name: string; level: number }[];
  links: {
    github?: string;
    linkedin?: string;
    web?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 'vicky',
    name: 'VICKY KUMAR',
    role: 'FOUNDER & PRINCIPAL ARCHITECT',
    bio: 'Elite engineer and system architect leading digital transformation and technology implementation across India. Vicky directs the physical and logical architectures at Devil Labs, drawing on high-pedigree computer science principles to build secure, robust systems.',
    avatar: 'https://github.com/vickyiitp.png',
    specialty: 'SYSTEMS ARCHITECTURE & AUTOMATION',
    uptime: '99.98% NODE RUNTIME',
    completedSystems: 48,
    tags: ['Full-Stack', 'AI Pipelines', 'Cloud Security', 'GCP Architect'],
    skills: [
      { name: 'System Architecture', level: 98 },
      { name: 'AI & Gemini Integrations', level: 95 },
      { name: 'React & Node.js Ecosystems', level: 97 },
      { name: 'Cloud Infrastructure & GCP', level: 94 }
    ],
    links: {
      github: 'https://github.com/vickyiitp',
      linkedin: 'https://linkedin.com/in/vickyiitp',
      web: 'https://vickyiitp.tech'
    }
  },
  {
    id: 'anjali',
    name: 'ANJALI SHARMA',
    role: 'LEAD AI RESEARCHER',
    bio: 'Specialist in custom agentic frameworks, multi-agent pipelines, and secure knowledge retrievals. Anjali implements the advanced Google GenAI and Gemini workflows, driving real-time categorization and generative content pipelines for startups.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    specialty: 'AGENTIC AI & NEURAL NETWORKS',
    uptime: '99.95% AGENT UPTIME',
    completedSystems: 32,
    tags: ['Gemini SDK', 'Vector DBs', 'FastAPI', 'Prompt Engineering'],
    skills: [
      { name: 'Agentic Frameworks', level: 96 },
      { name: 'Vector Database Routing', level: 92 },
      { name: 'Python & ML Pipelines', level: 90 },
      { name: 'Prompt Engineering', level: 95 }
    ],
    links: {
      github: 'https://github.com/Devil-Labs',
      linkedin: 'https://linkedin.com/company/devillabs'
    }
  },
  {
    id: 'rohit',
    name: 'ROHIT RAJ',
    role: 'HEAD OF DEVELOPMENT',
    bio: 'Infrastructure and backend specialist managing Devil Labs node servers, container deployments, and database optimization. Rohit ensures zero-downtime architectures and ultra-responsive API servers.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400',
    specialty: 'BACKEND SERVICES & DEVOPMENT',
    uptime: '100% CONTAINER RUNTIME',
    completedSystems: 41,
    tags: ['PostgreSQL', 'Docker', 'RESTful APIs', 'Node.js'],
    skills: [
      { name: 'API Design & Optimization', level: 94 },
      { name: 'Docker & Containerization', level: 91 },
      { name: 'Relational Database Design', level: 93 },
      { name: 'Node.js Backend Systems', level: 95 }
    ],
    links: {
      github: 'https://github.com/Devil-Labs',
      linkedin: 'https://linkedin.com/company/devillabs'
    }
  },
  {
    id: 'sameer',
    name: 'CHIEF DESIGN ENGINEER',
    role: 'BRAND & INTERACTIVE DESIGNER',
    bio: 'Visual language and interface expert. Sameer converts static parameters into physical brutalist masterpieces, leveraging cutting-edge UI components, premium negative spacing, and high-fidelity physics-based transitions.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
    specialty: 'HIGH-FIDELITY DESIGN ENGINEERING',
    uptime: '100% STYLE INTEGRITY',
    completedSystems: 29,
    tags: ['Tailwind CSS', 'Figma Mastery', 'Web3 Interfaces', 'Motion Design'],
    skills: [
      { name: 'Tailwind CSS & Styling', level: 98 },
      { name: 'Design Systems & Figma', level: 95 },
      { name: 'Framer Motion / Physics', level: 94 },
      { name: 'User Experience Mapping', level: 96 }
    ],
    links: {
      github: 'https://github.com/Devil-Labs',
      linkedin: 'https://linkedin.com/company/devillabs'
    }
  }
];

export default function TeamSection() {
  const [selectedId, setSelectedId] = useState<string | null>('vicky');

  const handleSelect = (id: string) => {
    audioEngine.playClick();
    setSelectedId(id);
  };

  const activeMember = teamMembers.find(m => m.id === selectedId) || teamMembers[0];

  return (
    <div className="mt-32 pt-20 border-t border-white/10" id="our-team">
      {/* Title */}
      <div className="mb-16">
        <span className="text-violet-400 font-mono text-[10px] uppercase tracking-[0.3em] font-semibold block mb-4">
          05_KEY_PERSONNEL
        </span>
        <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tighter uppercase leading-[0.9]">
          OUR TEAM <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-violet-400 font-serif italic font-light lowercase text-5xl sm:text-7xl">
            systems engineers
          </span>
        </h2>
        <p className="text-gray-400 font-mono text-xs uppercase tracking-wider mt-4 max-w-xl leading-relaxed">
          THE INTELLECTUAL INFRASTRUCTURE DRIVING DEVIL LABS OPERATIONS. ELITE SPECIALISTS ENGAGED IN PROTOCOL ENGINEERING AND DEEP SYSTEMS INTEGRITY.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Interactive Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamMembers.map((member) => {
            const isSelected = selectedId === member.id;
            return (
              <div
                key={member.id}
                onClick={() => handleSelect(member.id)}
                onMouseEnter={() => audioEngine.playHover()}
                className={`relative group cursor-pointer transition-all duration-300 rounded-2xl ${
                  isSelected 
                    ? 'border border-violet-500 bg-[#090909]/95 shadow-[0_0_25px_rgba(139,92,246,0.15)]' 
                    : 'border border-white/5 bg-black/40 hover:border-white/10 hover:bg-[#070707]/60'
                }`}
              >
                {/* Decorative scanning line animation on selected */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-[pulse_1.5s_infinite]" />
                )}

                <div className="p-6 space-y-4">
                  {/* Avatar and quick status badge */}
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="absolute inset-0 bg-violet-600/10 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                      <img
                        src={member.avatar}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-white/10 relative z-10 transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    
                    <div className="text-right flex flex-col items-end">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-[8px] text-emerald-400 tracking-wider">SECURE_NODE</span>
                      </div>
                      <span className="font-mono text-[7px] text-gray-500 mt-1 uppercase tracking-widest">{member.uptime}</span>
                    </div>
                  </div>

                  {/* Identification */}
                  <div>
                    <h3 className="text-sm font-display font-black text-white uppercase tracking-wider group-hover:text-violet-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-1">
                      {member.role}
                    </p>
                  </div>

                  {/* Core Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {member.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[7px] font-mono font-semibold tracking-widest px-2 py-0.5 bg-white/5 text-gray-400 rounded-full border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expanded trigger indicator */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="font-mono text-[7px] text-gray-500 tracking-wider">// SYSTEM_METRICS</span>
                    <span className="text-[8px] font-mono text-violet-400 uppercase tracking-widest group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      {isSelected ? 'ACTIVE VIEW' : 'EXPAND NODE'}
                      <ArrowUpRight size={10} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Display Details Panel */}
        <div className="lg:col-span-5 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative h-full"
            >
              <CyberFrame glowColor="violet" className="p-8 bg-black/60 rounded-3xl h-full flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Top identification banner */}
                  <div className="flex items-start justify-between pb-6 border-b border-white/10">
                    <div>
                      <span className="font-mono text-[8px] text-violet-400 uppercase tracking-widest font-bold flex items-center gap-1">
                        <Cpu size={10} />
                        DETAILED SYSTEMS INSPECTION
                      </span>
                      <h3 className="text-xl font-display font-black text-white mt-2 uppercase tracking-tight">
                        {activeMember.name}
                      </h3>
                      <p className="font-mono text-[10px] text-gray-400 tracking-wider uppercase mt-1">
                        {activeMember.role}
                      </p>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-xl blur-lg opacity-30" />
                      <img
                        src={activeMember.avatar}
                        alt={activeMember.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-white/20 relative z-10"
                      />
                    </div>
                  </div>

                  {/* Systems Bio Section */}
                  <div className="space-y-2">
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">// BIO_SUMMARY</span>
                    <p className="font-mono text-xs uppercase text-gray-300 tracking-widest leading-relaxed">
                      {activeMember.bio}
                    </p>
                  </div>

                  {/* Specialty Parameters */}
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-violet-400">
                      <Terminal size={12} />
                      <span className="font-mono text-[8px] font-bold tracking-widest uppercase">PRIMARY_SPECIALTY</span>
                    </div>
                    <p className="font-mono text-[10px] font-bold text-white uppercase tracking-wider pl-4">
                      {activeMember.specialty}
                    </p>
                  </div>

                  {/* Skill Metres */}
                  <div className="space-y-4 pt-2">
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">// SYSTEM_PARAMETERS</span>
                    <div className="space-y-3">
                      {activeMember.skills.map((skill, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between font-mono text-[8px] text-gray-400 uppercase tracking-widest">
                            <span>{skill.name}</span>
                            <span className="text-violet-400">{skill.level}% CAP</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 0.8, delay: 0.1 * index }}
                              className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer and interactive links */}
                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    {/* Stat */}
                    <div className="text-left">
                      <span className="font-mono text-[7px] text-gray-500 uppercase tracking-widest block">COMPLETED_BUILDS</span>
                      <span className="text-lg font-display font-black text-white">{activeMember.completedSystems}+</span>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-2">
                    {activeMember.links.github && (
                      <a
                        href={activeMember.links.github}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => audioEngine.playHover()}
                        onClick={() => audioEngine.playClick()}
                        className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-all"
                        title="GitHub Profile"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {activeMember.links.linkedin && (
                      <a
                        href={activeMember.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => audioEngine.playHover()}
                        onClick={() => audioEngine.playClick()}
                        className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-all"
                        title="LinkedIn Profile"
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                    {activeMember.links.web && (
                      <a
                        href={activeMember.links.web}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => audioEngine.playHover()}
                        onClick={() => audioEngine.playClick()}
                        className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-all"
                        title="Personal Web Node"
                      >
                        <Globe size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </CyberFrame>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, GraduationCap, Factory, Building, Shield, Coins, Sparkles, 
  ArrowRight, Users, CheckCircle, ChevronRight, Activity, TrendingUp, Info
} from 'lucide-react';

interface Solution {
  id: string;
  industry: string;
  icon: any;
  title: string;
  problem: string;
  solution: string;
  techStack: string[];
  metrics: string[];
  features: string[];
}

const solutionsData: Solution[] = [
  {
    id: 'healthcare',
    industry: 'HEALTHCARE',
    icon: Heart,
    title: 'PATIENT PORTAL & AGENTIC CARE ROUTING',
    problem: 'Healthcare providers suffer from severe administration overhead and patient triage latency. Medical data remains siloed, leading to high friction in dynamic routing and appointment scheduling.',
    solution: 'An end-to-end patient workflow automation layer with real-time appointment matching, voice assistant check-ins, and RAG medical guidelines queries designed with supreme medical compliance.',
    techStack: ['Node.js Multi-Agent Core', 'Next.js Frontend', 'PostgreSQL with Row Level Security', 'AWS Security Shield'],
    metrics: ['70% Admin Overhead reduction', '99.9% Booking accuracy', '<120ms average latency'],
    features: [
      'Automated patient appointment check-in queues',
      'AI guided symptoms triage diagnostics routing',
      'Secure, fully private end-to-end data pipelines'
    ]
  },
  {
    id: 'education',
    industry: 'EDUCATION',
    icon: GraduationCap,
    title: 'INTELLIGENT KNOWLEDGE HUBS & LMS',
    problem: 'Traditional learning systems are rigid, unresponsive, and fail to adapt to individual student paces, causing drop-offs and poor operational metrics.',
    solution: 'Adaptive Learning Management Systems (LMS) with customized diagnostic tools, automated syllabus synthesis, and integrated AI interactive co-pilots for real-time course material translation.',
    techStack: ['Vector embeddings', 'React 19 Canvas', 'Drizzle ORM', 'FastAPI backends'],
    metrics: ['45% higher student completion rates', '3x engagement multiplier', 'Zero infrastructure latency'],
    features: [
      'On-demand syllabus dynamic visual generators',
      'Staggered knowledge retention check quizzes',
      'Secure multi-tier student progress dashboards'
    ]
  },
  {
    id: 'manufacturing',
    industry: 'MANUFACTURING',
    icon: Factory,
    title: 'SUPPLY CHAIN TELEMETRY & AUTOMATION',
    problem: 'Opaque supply chain status and slow legacy data ingestion pipelines lead to costly stock-outs, transport friction, and bloated inventory overhead.',
    solution: 'A high-throughput telemetry aggregator and workflow engine. Automatically ingest supplier updates, validate compliance checklists, and schedule cargo dispatches.',
    techStack: ['Real-time WebSockets', 'PostgreSQL Partitioning', 'Docker containers', 'Cron orchestration'],
    metrics: ['28% decrease in inventory carry costs', '100% automated logging audits', 'Sub-second webhook execution'],
    features: [
      'Visual interactive supplier dispatch monitors',
      'Automated SMS / WhatsApp delivery check triggers',
      'Instant billing invoice processing pipeline'
    ]
  },
  {
    id: 'realestate',
    industry: 'REAL ESTATE',
    icon: Building,
    title: 'DYNAMIC LANDING NETWORKS & LEADS ROUTER',
    problem: 'Real estate brokers lose thousands of leads due to manual follow-up delays, lack of localized search pages, and rigid property filters.',
    solution: 'High-speed localized landing page networks optimized for instant rendering, coupled with automated lead capture, AI WhatsApp bot integrations, and smart agent assignments.',
    techStack: ['Vercel Edge Servers', 'Tailwind CSS UI', 'PostgreSQL database', 'WhatsApp API SDK'],
    metrics: ['4x lead-to-meeting conversion rate', '<5 second client response times', '100% automated agent follow-up'],
    features: [
      'Sub-100ms loading landing layouts for properties',
      'WhatsApp interactive schedule flow loops',
      'Dynamic agent scheduling CRM console'
    ]
  },
  {
    id: 'finance',
    industry: 'FINANCE & CHANNELS',
    icon: Coins,
    title: 'SECURE TRANSACTION PIPELINES & FRAUD FILTERS',
    problem: 'Legacy finance tools face payment routing errors, complex manual invoicing validation loops, and elevated compliance overhead.',
    solution: 'Stripe-optimized invoice automations, transaction monitors, and cryptographic signature validation modules to ensure seamless global client payments.',
    techStack: ['Stripe Webhook API', 'Next.js Server Actions', 'Supabase client storage', 'AES Encryption Engine'],
    metrics: ['Zero manual billing reconciliation hours', '99.999% webhook uptime', 'Cryptographically certified data'],
    features: [
      'Auto-generating dynamic invoice email modules',
      'Live billing telemetry graphs & performance indicators',
      'Compliant secure user account credentials storage'
    ]
  }
];

export default function SolutionsPage({ navigate }: { navigate: (path: string) => void }) {
  const [activeSolution, setActiveSolution] = useState<string>(solutionsData[0].id);

  const selected = solutionsData.find(s => s.id === activeSolution) || solutionsData[0];
  const SelectedIcon = selected.icon;

  return (
    <div id="solutions-page-root" className="pt-20 xs:pt-24 sm:pt-28 lg:pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto text-stone-800">
      
      {/* 1. HEADER DIVISION */}
      <section id="solutions-header" className="mb-16 space-y-4">
        <div className="flex items-center space-x-2 text-violet-600 font-sans text-xs uppercase tracking-widest font-extrabold">
          <Shield size={14} />
          <span>✦ INDUSTRY SOLUTIONS</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl md:text-7xl text-stone-800 tracking-tighter uppercase leading-none break-words max-w-full">
          PROVEN SOLUTIONS<br />BY INDUSTRY.
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-3xl leading-relaxed font-sans">
          We build targeted digital systems that solve core operational challenges and drive measurable business growth. Select your industry below to explore tailored solutions, key features, and verified outcomes.
        </p>
      </section>

      {/* 2. TABBED LAYOUT BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        
        {/* Industry selection left col */}
        <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-28">
          <span className="text-[10px] font-sans uppercase tracking-widest text-stone-400 font-extrabold block mb-4">
            ✦ SELECT YOUR INDUSTRY
          </span>
          {solutionsData.map((item) => {
            const Icon = item.icon;
            const isActive = activeSolution === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSolution(item.id)}
                className={`w-full flex items-center justify-between p-4.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-stone-900 border-stone-950 text-[#faf8f5] shadow-md' 
                    : 'bg-stone-100/60 border-stone-200/50 hover:bg-stone-100 text-stone-600 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? 'bg-[#faf8f5]/15 text-violet-400' : 'bg-stone-200 text-stone-500'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider">{item.industry}</span>
                </div>
                <ChevronRight size={14} className={`opacity-60 transition-transform ${isActive ? 'translate-x-1' : ''}`} />
              </button>
            );
          })}
        </div>

        {/* Detailed schema preview right col */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="clay-card p-6 md:p-8 text-left space-y-8"
            >
              {/* Solution Title Block */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/40 pb-6">
                <div>
                  <span className="text-violet-600 font-sans text-[10px] uppercase tracking-widest font-extrabold block mb-1">
                    ✦ INDUSTRY SOLUTION: {selected.industry}
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-stone-850 uppercase tracking-tight">
                    {selected.title}
                  </h2>
                </div>
                <div className="w-12 h-12 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100/60 flex-shrink-0">
                  <SelectedIcon size={22} />
                </div>
              </div>

              {/* Core Problem vs Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-2">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[10px] font-sans uppercase tracking-widest text-red-500 font-extrabold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>Industry Challenge</span>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed font-sans font-light">
                    {selected.problem}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[10px] font-sans uppercase tracking-widest text-emerald-600 font-extrabold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>The Devil Labs Solution</span>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed font-sans font-light">
                    {selected.solution}
                  </p>
                </div>
              </div>

              {/* Verified Metrics Strip */}
              <div className="bg-[#f0eee6]/60 border border-stone-200/30 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center sm:text-left">
                {selected.metrics.map((metric, idx) => (
                  <div key={idx} className="space-y-1 border-stone-200 sm:border-r last:border-r-0 pr-4">
                    <div className="flex items-center justify-center sm:justify-start space-x-1 text-violet-600">
                      <TrendingUp size={14} />
                      <span className="text-[9px] font-sans uppercase tracking-widest font-extrabold">KEY OUTCOME</span>
                    </div>
                    <p className="text-stone-850 font-display font-black text-lg uppercase tracking-tight">{metric}</p>
                  </div>
                ))}
              </div>

              {/* Core Features Specs */}
              <div className="space-y-3.5">
                <span className="text-[10px] font-sans uppercase tracking-widest text-stone-400 font-extrabold block">
                  ✦ KEY FEATURES
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6.5">
                  {selected.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-stone-600 text-xs font-sans">
                      <CheckCircle size={15} className="text-violet-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Tags */}
              <div className="space-y-2.5 pt-4 border-t border-stone-200/30">
                <span className="text-[10px] font-sans uppercase tracking-widest text-stone-400 font-extrabold block">
                  ✦ TECHNOLOGIES &amp; PLATFORMS
                </span>
                <div className="flex flex-wrap gap-2">
                  {selected.techStack.map((tech) => (
                    <span key={tech} className="bg-stone-100 text-stone-650 px-3 py-1.5 rounded-full text-[10px] font-sans font-bold border border-stone-250/20 uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2 font-sans text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                  <Activity size={14} className="text-violet-600 animate-pulse" />
                  <span>Custom integration available</span>
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-initialize-modal'))}
                  className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-[#faf8f5] text-xs font-sans font-bold uppercase tracking-widest shadow-md transition-all cursor-pointer"
                >
                  <span>Request This Solution</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. BUSINESS VALUE HIGHLIGHT FOR CLIENT JOURNEYS */}
      <section className="bg-stone-900 text-[#faf8f5] rounded-3xl p-8 sm:p-12 relative overflow-hidden text-left shadow-xl">
        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl space-y-6 relative z-10">
          <span className="text-violet-400 font-sans text-[9px] uppercase tracking-widest font-extrabold">✦ TAILORED SOLUTIONS</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter leading-none text-white">
            NEED A CUSTOM INDUSTRY SOLUTION?
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
            Looking for a custom automation pipeline, full-stack application, or real-time dashboard designed around your specific business operations? At Devil Labs, we build secure, scalable solutions that integrate seamlessly with your existing tools.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-rose-500 rounded-full text-xs font-sans font-bold uppercase tracking-widest transition-all cursor-pointer text-[#faf8f5] shadow-md hover:scale-102"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

    </div>
  );
}

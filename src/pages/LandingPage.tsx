import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Zap, Cpu, Check, ArrowDown, Terminal, 
  Sparkles, ShieldCheck, Database, Layers, Globe, Server, 
  ShoppingBag, BookOpen, Clock, Tag, ArrowUpRight, CheckCircle, Mail, Calendar, Search
} from 'lucide-react';
import Marquee from '../components/Marquee';
import SocialProofMarquee from '../components/SocialProofMarquee';
import CyberFrame from '../components/CyberFrame';
import IndustrySolutions from '../components/IndustrySolutions';
import ScrollReveal from '../components/ScrollReveal';
import PolishedFeatureMarquee from '../components/PolishedFeatureMarquee';
import { HandDrawnCircle, HandDrawnUnderline, HandDrawnArrow, BlueprintStickyNote } from '../components/AestheticAnnotation';
import StaggeredHeading from '../components/StaggeredHeading';
import heroBg from '../assets/images/image.jpg';
import WireframeMockup from '../components/WireframeMockup';
import ProjectGallery from '../components/ProjectGallery';
import { openInquiryModal } from '../lib/inquiry';
import { useDataStore } from '../hooks/useDataStore';

const nichesData = [
  {
    id: 'pedigree',
    number: '01',
    title: 'DEVIL LABS STARTED WITH A SIMPLE OBSESSION',
    tagline: 'WHY ARE WE STILL DOING THIS MANUALLY?',
    tag: 'THE SPARK',
    desc: 'Devil Labs began in our dorm rooms at IIT Patna when we noticed how many businesses were burning valuable engineering hours on tasks that could be automated in seconds. We decided to build a development house that focuses entirely on elimination—building custom software that removes manual repetition.',
    metric: 'IIT Patna',
    metricLabel: 'FOUNDER ALMA MATER',
    niches: [
      'Started in research laboratories',
      'Focused on operational efficiency',
      'Built by developers, not salespeople'
    ],
    accentColor: 'violet',
    badgeClass: 'bg-violet-950/60 text-violet-300 border-violet-200',
    glowColor: 'rgba(139, 92, 246, 0.25)',
  },
  {
    id: 'engineering',
    number: '02',
    title: 'WE BUILD TO BE RESILIENT',
    tagline: 'SOFTWARE DESIGNED FOR LONG RUNS',
    tag: 'OUR CODE CORE',
    desc: 'We are students of computer science. We do not write bloated or fragile setups that break the moment you get a spike in customer actions. Every endpoint is secure, every asset is optimized for load speed, and every database sync is validated.',
    metric: '<800ms',
    metricLabel: 'AVERAGE LCP SPEED',
    niches: [
      'Edge CDN routing by default',
      'Optimized PostgreSQL queries',
      'Secure token encryption schemes'
    ],
    accentColor: 'rose',
    badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-200',
    glowColor: 'rgba(244, 63, 94, 0.25)',
  }
];

const disciplinesData = [
  {
    id: 1,
    title: 'Websites',
    subtitle: 'PREMIUM INTERFACES',
    desc: 'Not just somewhere to put your logo. We build websites around what you want the visitor to do next.',
    tag: 'VISIBILITY',
    metric: 'LCP < 800ms',
    status: 'PRODUCTION',
    tech: 'React 19, Vite, Edge CDN Caching',
    glowColor: 'border-violet-500/30 hover:border-violet-500/60 shadow-violet-500/5',
    icon: Globe
  },
  {
    id: 2,
    title: 'Software',
    subtitle: 'CUSTOM OPERATIONS',
    desc: 'If spreadsheets, WhatsApp and five browser tabs are holding the operation together, there may be a better way.',
    tag: 'SYSTEMS',
    metric: '99.9% uptime',
    status: 'STABLE',
    tech: 'TypeScript, PostgreSQL, Drizzle ORM',
    glowColor: 'border-pink-500/30 hover:border-pink-500/60 shadow-pink-500/5',
    icon: Layers
  },
  {
    id: 3,
    title: 'Automation',
    subtitle: 'BACKGROUND WORKFLOWS',
    desc: 'If the next step can be predicted, the next step can often be automated.',
    tag: 'WORKFLOWS',
    metric: '100% automated',
    status: 'ACTIVE',
    tech: 'Express Webhooks, Twilio Node, Cron API',
    glowColor: 'border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/5',
    icon: Zap
  },
  {
    id: 4,
    title: 'AI Integration',
    subtitle: 'APPLIED INTELLIGENCE',
    desc: 'Use it where judgement, searching, sorting, answering or processing information is actually useful. Not because the homepage needed the word "AI".',
    tag: 'COGNITIVE',
    metric: 'latency < 150ms',
    status: 'INTEGRATED',
    tech: 'OpenAI API, Vector Cache, Custom RAG',
    glowColor: 'border-emerald-500/30 hover:border-emerald-500/60 shadow-emerald-500/5',
    icon: Cpu
  },
  {
    id: 5,
    title: 'Products',
    subtitle: 'MVP BUILDS',
    desc: 'You bring the idea. We work through what needs to exist between the first screen and the first real customer.',
    tag: 'LAUNCHES',
    metric: 'Fast time-to-market',
    status: 'READY',
    tech: 'SaaS Boilerplate, Stripe Integration',
    glowColor: 'border-blue-500/30 hover:border-blue-500/60 shadow-blue-500/5',
    icon: Sparkles
  }
];

interface LandingPageProps {
  navigate: (path: string) => void;
}

export default function LandingPage({ navigate }: LandingPageProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heroMode, setHeroMode] = useState<'ai' | 'web'>('ai');
  const [activeNicheTab, setActiveNicheTab] = useState('pedigree');

  const store = useDataStore();

  const displayProducts = store.products && store.products.length > 0
    ? store.products.filter(p => p.featuredHome && p.status === 'active')
    : [];

  const displayBlogs = store.blogs && store.blogs.length > 0
    ? store.blogs.filter(b => b.featuredHome && b.status === 'published')
    : [];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const payload = {
      name: "Landing Page Lead",
      email: email,
      phone: "Not provided",
      company: "Discovery Call Request",
      companySize: "Unknown",
      scope: "General Inquiry / Discovery Call",
      budget: "Custom",
      specs: `Lead submitted interest via Landing Page intake form from email: ${email}`
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        await fetch('https://formsubmit.co/ajax/devil.labs.contact@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `🚨 [LANDING PAGE LEAD] ${email}`,
            _captcha: 'false',
            _replyto: email,
            "Lead Email": email,
            "Source": "Landing Page Footer Intake"
          })
        });
      }
    } catch (err) {
      try {
        await fetch('https://formsubmit.co/ajax/devil.labs.contact@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `🚨 [LANDING PAGE LEAD] ${email}`,
            _captcha: 'false',
            _replyto: email,
            "Lead Email": email,
            "Source": "Landing Page Footer Intake"
          })
        });
      } catch (fsErr) {}
    } finally {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div id="landing-page-root" className="pt-12 sm:pt-16 lg:pt-20">
      
      {/* SCENE 1 — HOOK */}
      <section 
        id="hero-section" 
        className="relative flex flex-col justify-center px-4 md:px-8 overflow-hidden min-h-[85vh] bg-[#050505] text-white"
      >
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_100%)] pointer-events-none opacity-90" />

        <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4 md:px-8 py-12">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 lg:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left relative"
          >
            {/* Context Toggle */}
            <div className="flex items-center bg-[#111]/80 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-xl">
              <button 
                onClick={() => setHeroMode("ai")} 
                className={`px-5 py-2 rounded-full text-xs sm:text-[13px] font-sans font-black uppercase tracking-widest transition-all duration-300 relative ${heroMode === 'ai' ? 'text-white' : 'text-stone-400 hover:text-stone-200'}`}
              >
                {heroMode === 'ai' && (
                  <motion.div layoutId="hero-toggle-bg" className="absolute inset-0 bg-violet-600 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)]" />
                )}
                <span className="relative z-10">Cognitive AI Agents</span>
              </button>
              <button 
                onClick={() => setHeroMode("web")} 
                className={`px-5 py-2 rounded-full text-xs sm:text-[13px] font-sans font-black uppercase tracking-widest transition-all duration-300 relative ${heroMode === 'web' ? 'text-white' : 'text-stone-400 hover:text-stone-200'}`}
              >
                {heroMode === 'web' && (
                  <motion.div layoutId="hero-toggle-bg" className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
                )}
                <span className="relative z-10">High-Velocity Web</span>
              </button>
            </div>

            <div className="min-h-[160px] sm:min-h-[180px] flex flex-col justify-center w-full lg:items-start items-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={heroMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 w-full flex flex-col lg:items-start items-center max-w-4xl py-2"
                >
                  <h1 className="text-[1.35rem] xs:text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.2rem] xl:text-[4rem] leading-[1.05] font-display font-black tracking-tight uppercase flex flex-col lg:items-start items-center text-center lg:text-left w-full max-w-full text-white">
                    <span>YOU HAVE SOMETHING</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 font-extrabold drop-shadow-[0_0_25px_rgba(99,102,241,0.5)]">
                      THAT SHOULD WORK BETTER.
                    </span>
                  </h1>

                  <div className="font-serif italic text-stone-200 text-sm sm:text-base leading-relaxed tracking-wide text-center lg:text-left flex items-center space-x-2 pt-1 font-normal">
                    <span>“</span>
                    <span>
                      {heroMode === 'ai' 
                        ? 'Why is your team still doing this manually?' 
                        : 'Your website gets visitors. Why aren\'t they contacting you?'}
                    </span>
                    <span>”</span>
                  </div>

                  <p className="text-stone-300 text-xs sm:text-sm md:text-base max-w-2xl font-sans leading-relaxed tracking-wide text-center lg:text-left font-normal">
                    Maybe it's your website. Maybe leads keep slipping away. Maybe your team spends hours doing something a system could do in seconds. Or maybe you simply have an idea and need someone to build it. That's what we do.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full justify-center lg:justify-start">
                    <div className="flex items-center space-x-3.5">
                      <img src="https://github.com/vickyiitp.png?size=80" alt="Vicky Kumar" className="flex-shrink-0 w-9 h-9 rounded-full shadow-md border border-stone-800 object-cover" />
                      <div className="text-left">
                        <div className="text-xs font-extrabold text-white tracking-wider uppercase font-sans">Vicky Kumar</div>
                        <div className="text-xs text-stone-300 font-semibold tracking-wider uppercase leading-none mt-1.5 font-sans">Co-Founder, Devil Labs • CS Student (IIT Patna)</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full relative z-20">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-initialize-modal'))}
                className="group relative w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-sans font-bold text-xs tracking-widest uppercase rounded-full flex items-center justify-center space-x-3 cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>TELL US WHAT YOU NEED</span>
                  <ArrowRight size={14} className="stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              </button>
              
              <button
                onClick={() => {
                  const target = document.getElementById('work-gallery-section');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white/5 text-stone-300 hover:text-white border border-white/10 rounded-full font-sans font-bold text-xs tracking-widest uppercase flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                SEE WHAT WE'VE BUILT
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 w-full max-w-xl mx-auto relative z-10"
          >
            <WireframeMockup mode={heroMode} />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none">
          <span className="text-stone-400 font-sans text-xs uppercase tracking-[0.3em] font-extrabold opacity-60">Scroll</span>
          <ArrowDown size={14} className="text-stone-400 animate-bounce opacity-85" />
        </div>
      </section>

      {/* SCENE 2 — TENSION */}
      <section id="advantage-section" className="py-24 bg-[#050505] px-4 md:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-violet-500 font-sans text-xs uppercase tracking-[0.25em] font-black block">✦ SCENE 02 // THE TENSION</span>
            <h2 className="text-white font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight uppercase leading-none">
              SOME PROBLEMS <br />
              <span className="font-serif italic font-normal text-rose-500 lowercase">don't need more people.</span>
            </h2>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-sans max-w-lg mx-auto font-medium">
              THEY NEED A BETTER SYSTEM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              {
                title: 'THE LEAD CAME IN.',
                situation: 'Nobody replied.',
                visual: 'Lead captured online. 11:47 PM. Your sales team is asleep. Potential customer exits website.',
                color: 'text-violet-400',
                border: 'hover:border-violet-500/40'
              },
              {
                title: 'THE ORDER ARRIVED.',
                situation: 'Someone copied it manually.',
                visual: 'Data fields are read. Someone highlights, copies, and pastes names into spreadsheets.',
                color: 'text-rose-400',
                border: 'hover:border-rose-500/40'
              },
              {
                title: 'THE CUSTOMER ASKED THE SAME QUESTION.',
                situation: 'Someone answered it again.',
                visual: 'Support inbox filled with standard queries. Your team spends hours typing same responses.',
                color: 'text-amber-400',
                border: 'hover:border-amber-500/40'
              },
              {
                title: 'THE REPORT IS DUE TOMORROW.',
                situation: 'Someone is still building it.',
                visual: 'Midnight. Multiple browser tabs open. A developer is compiling CSV rows manually.',
                color: 'text-blue-400',
                border: 'hover:border-blue-500/40'
              }
            ].map((p, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-between ${p.border} transition-all duration-350 shadow-xl group text-left`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 font-bold">
                    <span>CASE STAGE // 0{idx + 1}</span>
                    <span className={p.color}>● TRAPPED</span>
                  </div>
                  <h3 className="text-white font-display font-extrabold text-sm uppercase tracking-tight leading-snug">
                    {p.title}
                    <span className="block text-rose-500 font-serif italic lowercase font-normal mt-1">{p.situation}</span>
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans font-normal border-t border-white/5 pt-3">
                    {p.visual}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4">
            <p className="text-stone-400 font-sans text-xs tracking-widest uppercase font-bold">
              THIS ISN'T ALWAYS A PEOPLE PROBLEM. <span className="text-rose-400">SOMETIMES THE WORK WAS DESIGNED BADLY.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 3 — REALIZATION */}
      <section id="disciplines-grid-section" className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-stone-400 font-sans text-xs uppercase tracking-[0.25em] font-black block">✦ SCENE 03 // THE SOLUTION</span>
            <h2 className="text-white font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight uppercase leading-none">
              SO WHAT DO <br />
              <span className="font-serif italic font-normal text-violet-500 lowercase">we actually build?</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans max-w-lg mx-auto">
              We design and write custom technology systems built strictly around operational results, not trends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplinesData.map((d, idx) => {
              const Icon = d.icon;
              return (
                <motion.div 
                  key={d.id}
                  initial={{ opacity: 0, scale: 0.95, y: 25 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.08 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className={`bg-[#050505] border ${d.glowColor} p-6 rounded-2xl shadow-md transition-all duration-350 flex flex-col justify-between cursor-default`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center">
                        <Icon size={18} className="text-violet-400" />
                      </div>
                      <span className="text-[11px] font-mono text-stone-400 uppercase tracking-widest bg-stone-900 border border-white/5 px-2.5 py-0.5 rounded-full font-bold">
                        {d.tag}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <span className="text-[11px] font-mono text-stone-450 uppercase tracking-wider block">
                        {d.subtitle}
                      </span>
                      <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                        {d.title}
                      </h3>
                      <p className="text-stone-300 text-xs leading-relaxed font-sans font-normal">
                        {d.desc}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-xs font-mono">
                    <span className="text-stone-400">{d.tech}</span>
                    <span className="text-violet-400 font-bold uppercase">{d.metric}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SCENE 4 — DEVIL LABS (CINEMATIC AUTOMATION STORY) */}
      <section id="automation-story-section" className="py-24 bg-[#050505] border-b border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-16">
          
          <div className="space-y-4">
            <span className="text-violet-500 font-sans text-xs uppercase tracking-[0.25em] font-black block">✦ SCENE 04 // THE DEVIL WAY</span>
            <h2 className="text-white font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight uppercase leading-none">
              THE WORK HAPPENED. <br />
              <span className="font-serif italic font-normal text-violet-500 lowercase">your team didn't have to.</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-sans max-w-md mx-auto">
              That's the kind of automation we build.
            </p>
          </div>

          <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-10 text-left max-w-xl mx-auto">
            {/* Timeline nodes */}
            {[
              {
                time: '11:47 PM',
                title: 'A new enquiry arrives.',
                desc: 'Nobody from your team is online. Good. They don\'t need to be.',
                icon: Mail,
                color: 'bg-violet-600'
              },
              {
                time: '11:47:02 PM',
                title: 'Lead captured & details checked.',
                desc: 'System reads incoming data, validates domains, and parses scope queries.',
                icon: Search,
                color: 'bg-indigo-600'
              },
              {
                time: '11:47:04 PM',
                title: 'CRM updated & personalized reply sent.',
                desc: 'Creates a custom contact record and drafts a specific response based on project needs.',
                icon: Database,
                color: 'bg-blue-600'
              },
              {
                time: '11:47:05 PM',
                title: 'Meeting link shared & follow-up scheduled.',
                desc: 'Exposes calendar availability and queues automated follow-up trackers.',
                icon: Calendar,
                color: 'bg-rose-500'
              },
              {
                time: '09:00 AM',
                title: 'Your team wakes up to a qualified lead.',
                desc: 'Nobody copied a name into a spreadsheet. The system processed it completely.',
                icon: Sparkles,
                color: 'bg-emerald-500'
              }
            ].map((step, sIdx) => {
              const StepIcon = step.icon;
              return (
                <motion.div 
                  key={sIdx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: sIdx * 0.12 }}
                  className="relative"
                >
                  {/* Timeline point */}
                  <div className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full ${step.color} border-4 border-[#050505] flex items-center justify-center shadow-lg`}>
                    <StepIcon size={10} className="text-white sm:w-3 sm:h-3" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-stone-500 font-extrabold uppercase tracking-widest">{step.time}</span>
                    <h4 className="text-white font-display font-bold text-sm sm:text-base uppercase tracking-tight">{step.title}</h4>
                    <p className="text-xs text-stone-450 leading-relaxed font-sans">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SCENE 5 — PROOF (PRODUCTS & PROJECTS GALLERY) */}
      
      {/* digital products store */}
      <section id="products-showcase-section" className="py-24 bg-[#0a0a0a] border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1.5px)] bg-[size:2rem_2rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-stone-400 font-sans text-xs uppercase tracking-[0.25em] font-black block">✦ DIGITAL SHOP</span>
            <h2 className="text-white font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight uppercase leading-none">
              Dev Tools &amp; <span className="font-serif italic font-normal text-pink-500 lowercase">boilerplates</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans max-w-lg mx-auto">
              Pre-built system templates and software engines optimized by IIT Patna engineers to accelerate your SaaS timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((p: any, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group flex flex-col justify-between bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-350 ${p.glowColor || 'hover:border-violet-500/30'}`}
              >
                <div className="aspect-[16/9] w-full bg-cover bg-center bg-stone-900 border-b border-white/10 relative" style={{ backgroundImage: `url(${p.image})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                  <span className="absolute top-4 left-4 bg-stone-900/90 border border-white/15 px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase text-stone-200 tracking-wider">
                    {p.category}
                  </span>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3.5 text-left">
                    <h3 className="text-white font-display font-black text-lg uppercase tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-stone-300 text-xs leading-relaxed font-sans font-normal">
                      {p.description}
                    </p>
                    
                    {p.features && p.features.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        {p.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center space-x-2 text-xs font-sans text-stone-300 font-medium">
                            <CheckCircle size={12} className="text-violet-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-stone-400 uppercase tracking-widest leading-none">PRICING</div>
                      <div className="text-xl font-display font-black text-white mt-1">
                        ${p.priceUSD || (p.priceINR ? Math.round(p.priceINR / 83) : 99)}
                      </div>
                    </div>

                    <button 
                      onClick={() => openInquiryModal({ itemTitle: p.title, itemType: 'Product', price: `$${p.priceUSD || 99}` })}
                      className="px-5 py-2.5 bg-[#111] hover:bg-violet-600 border border-white/10 hover:border-violet-400 text-stone-200 hover:text-white font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-xl cursor-pointer"
                    >
                      ACQUIRE LICENSE
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* portfolio deployments */}
      <section id="work-gallery-section" className="py-24 bg-[#050505] border-t border-b border-white/10">
        <ProjectGallery />
      </section>

      {/* SCENE 6 — TRUST (PROCESS, ENGINEERING, & PEDIGREE) */}
      
      {/* 6A. Process timeline */}
      <section id="process-section" className="py-24 bg-[#0a0a0a] border-b border-white/10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-stone-400 font-sans text-xs uppercase tracking-[0.25em] font-black block">✦ SCENE 06 // THE BLUEPRINT</span>
            <h2 className="text-white font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight uppercase leading-none">
              YOU DON'T NEED <br />
              <span className="font-serif italic font-normal text-violet-600 lowercase">a technical brief.</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-sans max-w-md mx-auto">
              Start by telling us what you want to happen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
            {[
              {
                step: '01',
                action: 'YOU TALK.',
                clientQuotes: ['"We\'re losing leads."', '"We need a website."', '"This takes team hours."', '"We have an idea."'],
                desc: 'You focus on the problem.'
              },
              {
                step: '02',
                action: 'WE ASK QUESTIONS.',
                clientQuotes: ['What happens now?', 'Who uses it?', 'Where does it break?', 'What needs to connect?'],
                desc: 'We map out parameters.'
              },
              {
                step: '03',
                action: 'WE MAP IT.',
                clientQuotes: ['System architectures', 'Logic checkpoints', 'Integration mappings', 'Data validations'],
                desc: 'Decide details before coding.'
              },
              {
                step: '04',
                action: 'WE BUILD IT.',
                clientQuotes: ['Sleek designs', 'Secure codes', 'Active webhooks', 'Thorough audits'],
                desc: 'Writing clean code engines.'
              },
              {
                step: '05',
                action: 'YOU USE IT.',
                clientQuotes: ['No fragile mockups', 'Live environments', 'Production metrics', 'Working software'],
                desc: 'A complete deployed product.'
              }
            ].map((p, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#050505] border border-white/10 p-6 rounded-2xl flex flex-col justify-between text-left shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-stone-500 font-mono text-[11px] font-bold">
                    <span>PHASE {p.step}</span>
                    <span className="text-violet-500">✔ READY</span>
                  </div>
                  <h3 className="text-white font-display font-black text-sm sm:text-base uppercase tracking-tight">{p.action}</h3>
                  
                  <div className="space-y-1 border-l-2 border-violet-600/35 pl-3 py-1">
                    {p.clientQuotes.map((quote, qIdx) => (
                      <div key={qIdx} className="text-[11px] font-mono text-stone-300 font-medium">{quote}</div>
                    ))}
                  </div>
                </div>
                <p className="text-stone-400 text-xs mt-6 leading-relaxed font-sans border-t border-white/5 pt-3">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6B. Engineering Spec Notes */}
      <section id="architectural-notes-deck" className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10 relative overflow-hidden md:overflow-visible">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-white/10 pointer-events-none" />
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-stone-400 font-sans text-xs uppercase tracking-[0.25em] font-black block">✦ DEVIL LABS STANDARDS</span>
          <StaggeredHeading as="h3" className="text-2xl xs:text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight mt-3 leading-none">
            THE PART YOU <span className="font-serif italic font-normal text-rose-600 lowercase">shouldn't notice.</span>
          </StaggeredHeading>
          <div className="text-stone-300 text-xs sm:text-sm mt-5 max-w-md mx-auto leading-relaxed font-sans space-y-1 text-center font-bold">
            <div>THE PAGE LOADS. THE PAYMENT WORKS. THE DATA IS THERE.</div>
            <div>THE RIGHT PERSON HAS ACCESS. THE BACKUP EXISTS.</div>
            <div>THE SYSTEM DOESN'T FALL APART WHEN MORE PEOPLE USE IT.</div>
            <div className="text-rose-500 font-serif italic lowercase font-normal pt-1">That's engineering.</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative items-start w-full mx-auto">
          <div className="hidden lg:block absolute left-[29%] top-6 w-[12%] h-[40px] z-20">
            <HandDrawnArrow color="stroke-violet-300/70" direction="right" className="w-full h-full" />
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[11px] font-sans text-stone-400 uppercase tracking-wider font-extrabold">Workflow</span>
          </div>
          
          <div className="hidden lg:block absolute left-[62%] top-16 w-[12%] h-[40px] z-20">
            <HandDrawnArrow color="stroke-rose-300/70" direction="right" className="w-full h-full" />
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[11px] font-sans text-stone-400 uppercase tracking-wider font-extrabold">Validation</span>
          </div>

          <BlueprintStickyNote
            number="01"
            title="ULTRA-FAST PERFORMANCE"
            rotation={-2}
            badgeColor="bg-violet-600 text-white"
            notes={[
              "Clean code optimization ensures lightweight builds and instant page loads.",
              "Pre-rendering critical content guarantees seamless, immediate visual delivery.",
              "Global server networks deliver responsive interactions to users everywhere."
            ]}
          />
          <BlueprintStickyNote
            number="02"
            title="ENTERPRISE SECURITY"
            rotation={1.5}
            badgeColor="bg-rose-500 text-white"
            notes={[
              "Secure server endpoints keep your sensitive data and API credentials protected.",
              "Comprehensive data validation shields your systems from security vulnerabilities.",
              "Subtle visual feedback provides instant confirmation for key user actions."
            ]}
          />
          <BlueprintStickyNote
            number="03"
            title="GUARANTEED RELIABILITY"
            rotation={-1.2}
            badgeColor="bg-amber-500 text-stone-950 font-black"
            notes={[
              "Intelligent verification ensures AI outputs remain accurate and helpful.",
              "Hardware-accelerated animations create smooth, natural transitions without layout shifts.",
              "Redundant server failovers ensure uninterrupted, 24/7 system availability."
            ]}
          />
        </div>
      </section>

      {/* 6C. Team Pedigree and Story */}
      <section id="positioning-section" className="py-20 sm:py-28 px-4 md:px-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-stone-400 font-sans text-xs uppercase tracking-[0.25em] font-black block">
            ✦ STRATEGIC VALUE ALIGNMENT
          </span>
          <StaggeredHeading as="h2" className="text-2xl xs:text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mt-3 uppercase leading-none">
            DEVIL LABS STARTED WITH A SIMPLE OBSESSION: <br />
            <span className="font-serif italic font-normal text-violet-500 lowercase">"why are we still doing this manually?"</span>
          </StaggeredHeading>
          <p className="text-stone-400 text-xs sm:text-sm mt-4 max-w-xl mx-auto leading-relaxed font-sans">
            Our background is built on rigorous computer science from IIT Patna. We replace corporate slides with direct, running code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            {nichesData.map((item) => {
              const isActive = activeNicheTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNicheTab(item.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-350 relative overflow-hidden flex items-start space-x-4 cursor-pointer ${
                    isActive
                      ? 'bg-[#050505] border-violet-500 shadow-[0_15px_30px_rgba(139,92,246,0.06)]'
                      : 'bg-[#0a0a0a] border-white/10 hover:bg-[#050505] hover:border-white/20'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-niche-bar"
                      className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-violet-600 to-rose-500"
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                  )}

                  <div className={`p-3 rounded-xl border font-sans text-xs font-black shrink-0 ${
                    isActive 
                      ? 'bg-violet-950 border-violet-600 text-violet-100' 
                      : 'bg-[#111] border-white/10 text-stone-400'
                  }`}>
                    {item.number}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <span className="text-xs font-sans font-extrabold uppercase tracking-widest text-stone-400">
                      {item.tagline}
                    </span>
                    <h3 className={`font-display font-black text-sm uppercase tracking-tight ${
                      isActive ? 'text-white' : 'text-stone-300'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-stone-400 text-xs leading-relaxed normal-case line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {nichesData.map((item) => {
                if (item.id !== activeNicheTab) return null;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="h-full"
                  >
                    <CyberFrame
                      glowColor={item.accentColor as 'violet' | 'fuchsia' | 'blue'}
                      className="h-full flex flex-col justify-between p-8 md:p-10 bg-[#050505] border border-white/10 shadow-lg relative overflow-hidden"
                    >
                      <div 
                        className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40 transition-all duration-500"
                        style={{ backgroundColor: item.glowColor }}
                      />

                      <div className="space-y-6 relative z-10 text-left">
                        <div className="flex justify-between items-start">
                          <span className={`px-3 py-1 border text-xs font-sans uppercase font-extrabold tracking-widest rounded-full ${item.badgeClass}`}>
                            {item.tag}
                          </span>
                          <span className="text-stone-450 font-sans text-xs uppercase font-extrabold tracking-widest">
                            Authorized Core
                          </span>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-none">
                            {item.title}
                          </h3>
                          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed normal-case">
                            {item.desc}
                          </p>
                        </div>

                        <div className="space-y-2.5 pt-2">
                          <span className="text-xs font-sans uppercase font-black tracking-widest text-stone-400 block">
                            Specialty Targets:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.niches.map((niche, nIdx) => (
                              <div key={nIdx} className="flex items-center space-x-2 bg-[#0a0a0a] border border-white/10 px-3.5 py-2.5 rounded-xl shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                                <span className="text-stone-350 text-xs font-semibold normal-case leading-tight">
                                  {niche}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 border-t border-white/10 pt-6 flex justify-between items-baseline relative z-10 font-sans">
                        <div>
                          <div className="text-3xl font-display font-black text-white tracking-tighter leading-none">
                            {item.metric}
                          </div>
                          <div className="text-xs text-stone-450 tracking-wider font-black uppercase mt-1">
                            {item.metricLabel}
                          </div>
                        </div>
                        <span className="text-xs text-violet-500 font-black uppercase tracking-widest">
                          Certified Engine
                        </span>
                      </div>
                    </CyberFrame>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Marquees & solutions */}
      <ScrollReveal>
        <SocialProofMarquee />
      </ScrollReveal>

      <ScrollReveal>
        <section id="marquee-section" className="w-full">
          <Marquee />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <div>
          <IndustrySolutions />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <section id="deliverable-capabilities-marquee" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <PolishedFeatureMarquee />
        </section>
      </ScrollReveal>

      {/* blogs whitepaper */}
      <section id="blogs-showcase-section" className="py-24 bg-[#050505] border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-stone-400 font-sans text-xs uppercase tracking-[0.25em] font-black block">✦ INTELLECTUAL INSIGHTS</span>
            <h2 className="text-white font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl tracking-tight uppercase leading-none">
              tech logs &amp; <span className="font-serif italic font-normal text-violet-500 lowercase">whitepapers</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans max-w-lg mx-auto">
              In-depth analysis of agentic workflows, edge optimization, and microservice infrastructure architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayBlogs.map((b: any, idx) => (
              <motion.div 
                key={b.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.015 }}
                onClick={() => navigate('/resources')}
                className="group bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-violet-500/40 hover:shadow-violet-600/5 transition-all duration-350 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-stone-900 border-b border-white/10 relative">
                    <img 
                      src={b.image} 
                      alt={b.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
                    <span className="absolute bottom-4 left-4 bg-stone-900/90 border border-white/10 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold text-stone-300 tracking-wider">
                      {b.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-xs font-mono text-stone-400">
                      <div className="flex items-center space-x-1">
                        <Clock size={10} />
                        <span>{b.readTime || '5 min read'}</span>
                      </div>
                      <span>•</span>
                      <span>{b.date || 'Aug 02, 2026'}</span>
                    </div>

                    <h3 className="text-white font-display font-extrabold text-base tracking-tight leading-snug group-hover:text-violet-400 transition-colors text-left uppercase">
                      {b.title}
                    </h3>

                    <p className="text-stone-350 text-xs leading-relaxed font-sans font-normal text-left line-clamp-3">
                      {b.description || b.content}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>BY {b.author.toUpperCase()}</span>
                  <span className="text-violet-400 group-hover:translate-x-1.5 transition-transform flex items-center space-x-1 font-bold">
                    <span>READ ARTICLE</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 7 — ACTION */}
      <section id="landing-cta-section" className="py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/10 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-stone-800 via-transparent to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-stone-800 via-transparent to-transparent" />

        <ScrollReveal className="max-w-4xl mx-auto">
          <div className="text-center relative z-10 space-y-10">
            <span className="text-violet-500 font-sans text-xs uppercase tracking-widest font-black">✦ SCENE 07 // THE INTAKE</span>
            <StaggeredHeading as="h2" className="text-3xl xs:text-4xl sm:text-6xl font-display font-extrabold text-white uppercase tracking-tighter">
              SHOW US THE PART <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                THAT'S WASTING YOUR TIME.
              </span>
            </StaggeredHeading>
            <div className="text-stone-350 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-sans space-y-2 text-center font-normal">
              <div>Or the idea that's still sitting in your notes.</div>
              <div>You don't need to know whether it needs an API, AI agent, database, automation workflow or something else. That's our problem.</div>
              <div className="text-violet-400 font-semibold font-mono text-xs tracking-wide uppercase pt-1">You just tell us what should happen.</div>
            </div>

            <form id="email-intake-form" onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <input
                  id="intake-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="HELLO@COMPANY.COM"
                  className="w-full px-5 py-4 text-white font-sans text-xs tracking-wider focus:outline-none focus:border-violet-300 transition-all rounded-full bg-[#050505] border border-white/10 shadow-inner uppercase placeholder-stone-400 font-bold"
                  disabled={loading || submitted}
                />
              </div>
              <button
                id="intake-submit-btn"
                type="submit"
                disabled={loading || submitted}
                className="w-full sm:w-auto px-8 py-4 clay-violet-solid font-sans font-extrabold text-xs uppercase tracking-widest rounded-full whitespace-nowrap flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>SENDING...</span>
                ) : submitted ? (
                  <span className="flex items-center space-x-1">
                    <Check size={14} className="text-white" />
                    <span>RECEIVED</span>
                  </span>
                ) : (
                  <>
                    <span>SEND IT</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {submitted && (
              <motion.p
                id="intake-success-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-sans text-emerald-400 bg-emerald-50 border border-emerald-150 max-w-sm mx-auto py-2.5 px-4 rounded-full shadow-sm font-semibold"
              >
                Thank you. We'll be in touch shortly.
              </motion.p>
            )}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

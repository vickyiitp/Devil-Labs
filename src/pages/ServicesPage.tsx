import { motion } from 'motion/react';
import { ArrowUpRight, Cpu, Layers, Sparkles, Check, Server, RefreshCw, Code2, Globe, Cloud, Database, MessageCircle } from 'lucide-react';
import { serviceCategories } from '../data/services';
import ScrollReveal from '../components/ScrollReveal';
import PolishedFeatureMarquee from '../components/PolishedFeatureMarquee';

interface ServicesPageProps {
  navigate: (path: string) => void;
}

export default function ServicesPage({ navigate }: ServicesPageProps) {
  const tools = [
    { name: "Cursor", desc: "Our weapon of choice for fast, context-aware AI pairing, accelerating system delivery times by up to 300%.", icon: RefreshCw },
    { name: "GitHub", desc: "Automated CI/CD pipelines, strict code reviews, and absolute source control safety on every commit.", icon: Code2 },
    { name: "AWS", desc: "Enterprise-grade cloud computing. Scalable EC2 instances, S3 storage, and global edge delivery.", icon: Cloud },
    { name: "Vercel", desc: "Edge routing and optimized front-end deployments for lightning-fast React applications.", icon: Globe },
    { name: "Docker", desc: "Containerized environments ensuring perfect parity between local development and production.", icon: Server },
    { name: "PostgreSQL", desc: "Robust, relational database architecture designed for high-throughput queries and secure data.", icon: Database }
  ];

  return (
    <div id="services-page-root" className="pt-20 xs:pt-24 sm:pt-28 lg:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-stone-800">
      {/* 1. HEADER */}
      <section id="services-header" className="mb-20 space-y-4">
        <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-semibold">✦ OUR CAPABILITIES</span>
        <h1 className="font-display font-extrabold text-4xl xs:text-5xl sm:text-7xl text-stone-800 tracking-tighter uppercase leading-none">
          SYSTEMATIC<br className="sm:hidden" /> ARCHITECTURE.
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed">
          Devil Labs operates at the intersection of robust web infrastructure and advanced artificial intelligence. Explore our comprehensive capabilities menu below.
        </p>
      </section>

      {/* 1.5 DIRECT CONSULT-TO-DEMO SWIPING PIPELINE */}
      <ScrollReveal>
        <section className="mb-28 p-8 clay-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-200/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-6 border-b border-stone-200/30">
            <div className="space-y-2">
              <span className="text-violet-600 font-mono text-[10px] uppercase tracking-widest font-black">
                ★ SYSTEM DEPLOYMENT LIFECYCLE
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-stone-800 uppercase tracking-tight">
                FROM RAW IDEA ➜ INTERACTIVE DEMO ➜ DEPLOY
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
                We don't just write code in isolation. We consult with you directly on your custom idea, design the system, and show you a working interactive demo before final deployment.
              </p>
            </div>
            <div className="flex items-center space-x-3 self-start lg:self-center">
              <a 
                href="https://wa.me/918102099678?text=Hi%20Devil%20Labs%2C%20I%20would%20like%20to%20consult%20on%20a%20project%20idea%21" 
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 bg-[#25D366] text-white font-bold font-mono text-[10px] tracking-widest uppercase px-5 py-3 rounded-full hover:bg-emerald-500 hover:scale-105 transition-all shadow-[0_4px_14px_rgba(37,211,102,0.3)] cursor-pointer"
              >
                <MessageCircle size={12} />
                <span>CONSULT ON IDEA</span>
              </a>
            </div>
          </div>

          {/* Swipe Ticker */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "01",
                title: "DIRECT CONSULT",
                badge: "STAGE 01",
                color: "border-stone-200/50",
                desc: "Discuss your custom ideas directly on WhatsApp or video meet. We define project scope, database models, and target endpoints."
              },
              {
                id: "02",
                title: "WORK ON THE IDEA",
                badge: "STAGE 02",
                color: "border-stone-200/50",
                desc: "We detail the functional brief, structure full wireframes, and outline typesafe architectures without any bloated dependencies."
              },
              {
                id: "03",
                title: "LIVE INTERACTIVE DEMO",
                badge: "STAGE 03",
                color: "border-stone-200/50",
                desc: "We build and host an active staging demo of the custom software within days, so you can interact with it and provide real-time edits."
              },
              {
                id: "04",
                title: "PRODUCTION UPLINK",
                badge: "STAGE 04",
                color: "border-stone-200/50",
                desc: "We safely deploy the finalized, production-grade assets to your chosen cloud servers or Vercel containers under your official domain."
              }
            ].map((item, idx) => (
              <div
                key={item.id}
                className="p-6 relative group flex flex-col justify-between clay-card hover:border-violet-300/40 hover:scale-[1.03]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[10px] text-violet-600 font-bold tracking-widest">{item.badge}</span>
                    <span className="text-xs text-stone-400 font-black">• {item.id}</span>
                  </div>
                  <h3 className="font-display font-black text-lg text-stone-800 group-hover:text-violet-600 transition-colors tracking-tight uppercase">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed font-sans font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* NEW: DELIVERABLE CAPABILITIES CAROUSEL */}
      <ScrollReveal>
        <section id="services-capabilities-carousel" className="mb-28">
          <PolishedFeatureMarquee />
        </section>
      </ScrollReveal>

      {/* 2. COMPREHENSIVE SERVICE GRID */}
      <section id="services-grid-section" className="space-y-32 mb-32">
        {serviceCategories.map((category, catIdx) => (
          <div key={category.id} className="relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-200/30 pb-6">
              <div>
                <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
                  ✦ Category {String(catIdx + 1).padStart(2, '0')}
                </span>
                <h2 className="font-display font-extrabold text-4xl text-stone-800 tracking-tight uppercase">
                  {category.title}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.items.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${service.title}`}
                    key={service.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    onClick={() => navigate(`/services/${service.slug}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/services/${service.slug}`);
                      }
                    }}
                    className="group p-6 flex flex-col justify-between cursor-pointer hover:border-violet-300/40 hover:scale-[1.025] relative overflow-hidden text-left clay-card"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100/30 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-violet-200/50 transition-all" />
                    
                    <div className="space-y-6 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-200/50 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-rose-500 group-hover:border-transparent group-hover:text-white text-stone-500 transition-all duration-500">
                        <Icon size={20} />
                      </div>
                      
                      <div>
                        <h3 className="font-display font-bold text-xl text-stone-800 mb-2 tracking-tight group-hover:text-violet-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-stone-500 text-sm leading-relaxed font-light">
                          {service.simpleDesc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-stone-200/20 flex items-center justify-between text-stone-400 group-hover:text-stone-700 transition-colors relative z-10">
                      <span className="font-mono text-[10px] uppercase tracking-widest">Explore Specs</span>
                      <ArrowUpRight size={14} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* 3. TECH STACK DEEP DIVE */}
      <ScrollReveal delay={100}>
        <section id="tech-stack-deep-dive-section" className="py-24 border-t border-stone-200/30">
          <div className="text-center space-y-4 mb-16">
            <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-semibold">✦ PRODUCTION TOOLKIT</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-stone-800 tracking-tight uppercase">OUR ENGINE STACK.</h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              We operate with surgical precision. We handpick, audit, and configure only the most advanced systems available to developer circles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  id={`tool-card-${tool.name.toLowerCase()}`}
                  key={tool.name}
                  className="p-6 transition-all duration-300 flex flex-col justify-between group clay-card hover:border-violet-300/30 hover:scale-[1.03]"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-stone-100 border border-stone-200/50 rounded-xl w-fit group-hover:border-violet-300 group-hover:bg-violet-50 transition-colors duration-300">
                      <Icon className="text-stone-500 group-hover:text-violet-600 transition-colors duration-300" size={18} />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-stone-800 uppercase tracking-tight">{tool.name}</h3>
                    <p className="text-stone-500 text-xs leading-relaxed">{tool.desc}</p>
                  </div>
                  <div className="mt-6 border-t border-stone-200/20 pt-4 text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                    STABLE ENVIRONMENT
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* 4. CTA */}
      <ScrollReveal delay={150}>
        <section id="services-cta-section" className="clay-card p-8 sm:p-16 flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto mt-24">
          <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-semibold">✦ ARCHITECTURAL BLUEPRINT</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-stone-800 uppercase tracking-tighter leading-tight">
            Need a custom stack?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-rose-500">Talk to our engineers.</span>
          </h2>
          <p className="text-stone-600 text-sm max-w-md leading-relaxed">
            Describe your system goals, data structures, and desired automated integrations. Our engineers will audit and propose a clean, secure stack blueprint.
          </p>
          <button
            id="services-cta-contact-btn"
            onClick={() => navigate('/contact')}
            className="px-8 py-4 clay-violet-solid font-mono font-bold text-xs uppercase tracking-widest flex items-center space-x-3 cursor-pointer rounded-full"
          >
            <span>INITIATE BLUEPRINT REQUEST</span>
            <ArrowUpRight size={16} />
          </button>
        </section>
      </ScrollReveal>
    </div>
  );
}

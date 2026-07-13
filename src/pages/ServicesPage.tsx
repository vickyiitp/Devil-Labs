import { motion } from 'motion/react';
import { ArrowUpRight, Cpu, Layers, Sparkles, Check, Server, RefreshCw, Code2, Globe, Cloud, Database, MessageCircle } from 'lucide-react';
import { serviceCategories } from '../data/services';

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
    <div id="services-page-root" className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. HEADER */}
      <section id="services-header" className="mb-20 space-y-4">
        <span className="text-violet-500 font-mono text-xs uppercase tracking-widest font-semibold">// OUR CAPABILITIES</span>
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tighter uppercase leading-none">
          SYSTEMATIC<br className="sm:hidden" /> ARCHITECTURE.
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          Devil Labs operates at the intersection of robust web infrastructure and advanced artificial intelligence. Explore our comprehensive capabilities menu below.
        </p>
      </section>

      {/* 1.5 DIRECT CONSULT-TO-DEMO SWIPING PIPELINE */}
      <section className="mb-28 border border-white/10 bg-white/5 p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-6 border-b border-white/5">
          <div className="space-y-2">
            <span className="text-violet-400 font-mono text-[10px] uppercase tracking-widest font-black">
              ★ SYSTEM DEPLOYMENT LIFECYCLE
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              FROM RAW IDEA ➜ INTERACTIVE DEMO ➜ DEPLOY
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
              We don't just write code in isolation. We consult with you directly on your custom idea, design the system, and show you a working interactive demo before final deployment.
            </p>
          </div>
          <div className="flex items-center space-x-3 self-start lg:self-center">
            <a 
              href="https://wa.me/918102099678?text=Hi%20Devil%20Labs%2C%20I%20would%20like%20to%20consult%20on%20a%20project%20idea%21" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 bg-[#25D366] text-black font-bold font-mono text-[10px] tracking-widest uppercase px-5 py-3 rounded-full hover:bg-emerald-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(37,211,102,0.2)] cursor-pointer"
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
              color: "border-violet-500/20",
              desc: "Discuss your custom ideas directly on WhatsApp or video meet. We define project scope, database models, and target endpoints."
            },
            {
              id: "02",
              title: "WORK ON THE IDEA",
              badge: "STAGE 02",
              color: "border-fuchsia-500/20",
              desc: "We detail the functional brief, structure full wireframes, and outline typesafe architectures without any bloated dependencies."
            },
            {
              id: "03",
              title: "LIVE INTERACTIVE DEMO",
              badge: "STAGE 03",
              color: "border-indigo-500/20",
              desc: "We build and host an active staging demo of the custom software within days, so you can interact with it and provide real-time edits."
            },
            {
              id: "04",
              title: "PRODUCTION UPLINK",
              badge: "STAGE 04",
              color: "border-emerald-500/20",
              desc: "We safely deploy the finalized, production-grade assets to your chosen cloud servers or Vercel containers under your official domain."
            }
          ].map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 bg-[#0c0c0c]/90 border ${item.color} hover:border-violet-500/40 rounded-2xl transition-all duration-300 relative group flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-[10px] text-violet-400 font-bold tracking-widest">{item.badge}</span>
                  <span className="text-xs text-gray-700 font-black">//{item.id}</span>
                </div>
                <h3 className="font-display font-black text-lg text-white group-hover:text-violet-400 transition-colors tracking-tight uppercase">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-sans font-light">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. COMPREHENSIVE SERVICE GRID */}
      <section id="services-grid-section" className="space-y-32 mb-32">
        {serviceCategories.map((category, catIdx) => (
          <div key={category.id} className="relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
              <div>
                <span className="text-violet-500 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
                  // {String(catIdx + 1).padStart(2, '0')}_CATEGORY
                </span>
                <h2 className="font-display font-extrabold text-4xl text-white tracking-tight uppercase">
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
                    className="group bg-black/40 border border-white/5 hover:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent p-6 flex flex-col justify-between cursor-pointer transition-all duration-500 hover:shadow-neon-violet relative overflow-hidden text-left"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-violet-500/20 transition-all" />
                    
                    <div className="space-y-6 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-500 group-hover:border-violet-400 group-hover:text-white text-gray-400 transition-all duration-500">
                        <Icon size={20} />
                      </div>
                      
                      <div>
                        <h3 className="font-display font-bold text-xl text-white mb-2 tracking-tight group-hover:text-violet-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                          {service.simpleDesc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-gray-500 group-hover:text-white transition-colors relative z-10">
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
      <section id="tech-stack-deep-dive-section" className="py-24 border-t border-white/5">
        <div className="text-center space-y-4 mb-16">
          <span className="text-violet-500 font-mono text-xs uppercase tracking-widest font-semibold">// PRODUCTION TOOLKIT</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight uppercase">OUR ENGINE STACK.</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We operate with surgical precision. We handpick, audit, and configure only the most advanced systems available to developer circles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                id={`tool-card-${tool.name.toLowerCase()}`}
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-black/60 border border-white/5 p-6 hover:border-violet-500/50 transition-colors duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 border border-white/10 w-fit group-hover:border-violet-500 group-hover:bg-violet-500/10 transition-colors duration-300">
                    <Icon className="text-gray-400 group-hover:text-violet-400 transition-colors duration-300" size={18} />
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-tight">{tool.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{tool.desc}</p>
                </div>
                <div className="mt-6 border-t border-white/5 pt-4 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                  STABLE ENVIRONMENT
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. CTA */}
      <section id="services-cta-section" className="border border-white/5 bg-gradient-to-r from-violet-950/10 via-black/40 to-indigo-950/10 p-8 sm:p-16 flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto mt-24">
        <span className="text-violet-500 font-mono text-xs uppercase tracking-widest font-semibold">// ARCHITECTURAL BLUEPRINT</span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tighter leading-tight">
          Need a custom stack?<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Talk to our engineers.</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-md leading-relaxed">
          Describe your system goals, data structures, and desired automated integrations. Our engineers will audit and propose a clean, secure stack blueprint.
        </p>
        <button
          id="services-cta-contact-btn"
          onClick={() => navigate('/contact')}
          className="px-8 py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-violet-600 hover:text-white hover:border-violet-500 transition-all duration-300 flex items-center space-x-3 cursor-pointer border border-white shadow-neon-violet"
        >
          <span>INITIATE BLUEPRINT REQUEST</span>
          <ArrowUpRight size={16} />
        </button>
      </section>
    </div>
  );
}

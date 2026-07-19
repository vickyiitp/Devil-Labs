import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, HelpCircle, ChevronDown, ChevronUp, Zap, Sparkles, Sliders, Clock, Users, DollarSign, Layout, Globe, ShoppingCart, Cpu, Bot } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import ScrollReveal from '../components/ScrollReveal';
import PolishedFeatureMarquee from '../components/PolishedFeatureMarquee';

interface PricingPageProps {
  navigate: (path: string) => void;
}

export default function PricingPage({ navigate }: PricingPageProps) {
  const { currency, setCurrency } = useCurrency();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculator State
  const [calcTier, setCalcTier] = useState<'landing-pages' | 'business-website' | 'ecommerce' | 'fullstack' | 'ai-agents'>('fullstack');
  const [calcScope, setCalcScope] = useState<'small' | 'medium' | 'large'>('medium');
  const [calcAddons, setCalcAddons] = useState<string[]>([]);

  const toggleAddon = (addonId: string) => {
    setCalcAddons(prev => 
      prev.includes(addonId) ? prev.filter(a => a !== addonId) : [...prev, addonId]
    );
  };


  // Calculator Logic
  const estimation = useMemo(() => {
    let basePrice = 0;
    let baseWeeksMin = 0;
    let baseWeeksMax = 0;
    let resources: string[] = [];

    switch (calcTier) {
      case 'landing-pages':
        basePrice = 199;
        baseWeeksMin = 1;
        baseWeeksMax = 2;
        resources = ['1x UI/UX Designer', '1x Frontend Developer'];
        break;
      case 'business-website':
        basePrice = 399;
        baseWeeksMin = 2;
        baseWeeksMax = 4;
        resources = ['1x UI/UX Designer', '1x Full-Stack Developer'];
        break;
      case 'ecommerce':
        basePrice = 799;
        baseWeeksMin = 4;
        baseWeeksMax = 6;
        resources = ['1x UI/UX Designer', '1x E-Commerce Architect', '1x Full-Stack Developer'];
        break;
      case 'fullstack':
        basePrice = 1299;
        baseWeeksMin = 6;
        baseWeeksMax = 10;
        resources = ['1x System Architect', '2x Full-Stack Developers', '1x Database Engineer'];
        break;
      case 'ai-agents':
        basePrice = 999;
        baseWeeksMin = 3;
        baseWeeksMax = 5;
        resources = ['1x AI Automation Specialist', '1x Python/Node Developer'];
        break;
    }

    let multiplier = 1;
    if (calcScope === 'medium') multiplier = 1.5;
    if (calcScope === 'large') multiplier = 2.5;

    let finalPrice = basePrice * multiplier;
    let finalWeeksMin = Math.round(baseWeeksMin * multiplier);
    let finalWeeksMax = Math.round(baseWeeksMax * multiplier);

    calcAddons.forEach(addon => {
      if (addon === 'ai' && calcTier !== 'ai-agents') {
        finalPrice += 399;
        finalWeeksMin += 2;
        finalWeeksMax += 2;
        if (!resources.includes('1x AI Automation Specialist')) {
          resources.push('1x AI Automation Specialist');
        }
      }
      if (addon === 'motion') {
        finalPrice += 199;
        finalWeeksMin += 1;
        finalWeeksMax += 2;
        if (!resources.includes('1x Creative Developer (WebGL)')) {
          resources.push('1x Creative Developer (WebGL)');
        }
      }
      if (addon === 'priority') {
        finalPrice += 149;
      }
    });

    return {
      priceStr: (currency === 'INR') ? `₹${(finalPrice * 40).toLocaleString('en-IN')}` : `$${finalPrice.toLocaleString('en-US')}`,
      timelineStr: `${finalWeeksMin}-${finalWeeksMax} Weeks`,
      resources
    };
  }, [calcTier, calcScope, calcAddons, (currency === 'INR')]);

  const models = [
    {
      title: "MVP Build (Starter)",
      tagline: "FAST PRODUCT SHIPMENT",
      price: (currency === 'INR') ? "₹8,500" : "$229",
      priceBasis: "per deployment",
      description: "Ideal for small businesses establishing their first digital footprint.",
      features: [
        "3-4 Web Pages (Home, About, Services, Contact)",
        "Mobile Responsive Design",
        "Contact Form Integration",
        "Basic On-Page SEO Setup",
        "Social Media Links",
        "14-day production support period"
      ],
      cta: "INITIALIZE MVP UPLINK",
      popular: false,
      scope: "MVP Build (Starter)"
    },
    {
      title: "Full-Stack + AI (Professional)",
      tagline: "AUTONOMOUS & DATA ENGINES",
      price: (currency === 'INR') ? "₹28,900" : "$729",
      priceBasis: "per architecture",
      description: "Comprehensive solution for growing brands requiring custom logic and design.",
      features: [
        "Up to 10 Web Pages (Dynamic Content)",
        "Custom UI/UX Design & User Authentication",
        "CMS Integration (Manage your own content)",
        "Speed & Performance Optimization",
        "Advanced Analytics & Tracking",
        "30-day dedicated engineering support"
      ],
      cta: "INITIALIZE SECURE SYSTEM",
      popular: true,
      scope: "Full-Stack + AI (Professional)"
    },
    {
      title: "Retainer / Enterprise",
      tagline: "CONTINUOUS AUTOMATION SCALE",
      price: (currency === 'INR') ? "₹47,000+" : "$1,199+",
      priceBasis: "per sprint period",
      description: "Fully custom architecture with advanced AI automation for high-volume operations.",
      features: [
        "Unlimited / Dynamic Pages",
        "Payment Gateway Integration",
        "AI Agent Integration (Gemini/OpenAI)",
        "Custom Backend Systems & APIs",
        "Weekly database & security audits",
        "Priority Tech Support & Infinite SLA"
      ],
      cta: "INITIALIZE PARTNERSHIP",
      popular: false,
      scope: "Retainer / Enterprise"
    }
  ];

  const faqs = [
    {
      question: "Who owns the code upon final deployment?",
      answer: "You do. Devil Labs operates as a work-for-hire project studio. Upon final clearance of your project invoice, 100% of intellectual property, code assets, database schemas, and associated server scripts are written directly to your secure repository."
    },
    {
      question: "What is your average timeline for an MVP Build?",
      answer: "We average 2 to 4 weeks. By employing a context-aware development process (using advanced LLM accelerators like Cursor) and pre-optimized server configurations, we deliver pixel-perfect React frontends with incredible speed."
    },
    {
      question: "Are third-party API costs (like Gemini or OpenAI) included in the tier?",
      answer: "No. All custom external integrations require you to register billing credentials directly. Our server-side configurations are structured to accept standard client keys via your environment files (.env) to maintain full server key privacy."
    },
    {
      question: "How do you handle post-launch maintenance?",
      answer: "We include post-launch support with all individual builds (14 days for MVP, 30 days for Full-Stack + AI). If you require continuous system upgrades, telemetry audits, and maintenance, you can seamlessly migrate to our Retainer / Dedicated Team model."
    },
    {
      question: "What services do you provide for startup technology and enterprise software in India?",
      answer: "As Bihar's premier tech architecture firm based in Gaya, we offer full-spectrum software development services for startups and enterprises across India (including Patna, Gaya, and major hubs like Bangalore and Delhi). Our offerings range from high-conversion landing pages, professional business websites, and scalable e-commerce systems to complex full-stack web applications, AI agents, WhatsApp automation, and custom CRM integrations."
    },
    {
      question: "Do you specialize in Next.js and React full-stack SaaS development?",
      answer: "Yes. Our core engineering workflow leverages React, Next.js, and high-performance server-side architectures. We design lightweight, high-speed dashboards, SaaS platforms, and secure multi-user environments with robust backend systems, D3/Recharts data visualizations, and containerized Cloud Run, Render, or Vercel deployments."
    },
    {
      question: "How do your autonomous AI Agents and Business Automation workflows work?",
      answer: "We engineer autonomous AI agents and automated workflows utilizing the Google GenAI SDK (Gemini API) and OpenAI APIs. Our systems handle automated data categorization, intelligent CRM routing, real-time lead generation, and custom WhatsApp automation triggers—helping Indian and global businesses run complex workflows 24/7 without manual intervention."
    },
    {
      question: "Do you offer professional SEO services and page performance optimization?",
      answer: "Absolutely. Our UX engineering process is optimized for Core Web Vitals, targeting a Lighthouse Performance score of 95+. We integrate structured JSON-LD schema tags, semantic heading hierarchies, responsive layouts, image compression, and route prefetching, ensuring high rankings in both Google Search results and AI-powered Search Overview services (AEO/GEO) like ChatGPT, Claude, and Perplexity."
    }
  ];

  return (
    <div id="pricing-page-root" className="pt-20 xs:pt-24 sm:pt-28 lg:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-stone-800">
      {/* 1. HEADER */}
      <section id="pricing-header" className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-stone-200/30 pb-10">
        <div className="space-y-4">
          <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-semibold">✦ ENGAGEMENT MODELS</span>
          <h1 className="font-display font-extrabold text-4xl xs:text-5xl sm:text-7xl text-stone-800 tracking-tighter uppercase leading-none">
            SYSTEM TARIFFS.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            Clear scope. Zero bloated sales contracts. We provide fully-mapped engagement brackets to fit your technical goals.
          </p>
        </div>

        {/* Dynamic Currency Switcher */}
        <div className="flex items-center space-x-1.5 bg-[#f0ede6] border border-stone-200/50 p-1 rounded-xl w-full sm:w-auto self-start sm:self-center md:self-end shadow-inner">
          <button
            onClick={() => setCurrency('USD')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 font-mono text-[10px] font-bold tracking-widest uppercase rounded-lg transition-all duration-200 cursor-pointer ${
              currency === 'USD'
                ? 'bg-[#fcfbf9] text-stone-800 shadow-md font-black'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            USD ($)
          </button>
          <button
            onClick={() => setCurrency('INR')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 font-mono text-[10px] font-bold tracking-widest uppercase rounded-lg transition-all duration-200 cursor-pointer ${
              currency === 'INR'
                ? 'bg-[#fcfbf9] text-stone-800 shadow-md font-black'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            INR (₹)
          </button>
        </div>
      </section>

      {/* 2. PRICING CARDS (3 columns) */}
      <section id="pricing-cards-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-32">
        {models.map((model, idx) => (
          <motion.div
            id={`pricing-card-${model.title.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
            key={model.title}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`relative flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 rounded-[24px] sm:rounded-[32px] clay-card ${
              model.popular
                ? 'border-violet-300 bg-[#fbf9f4] shadow-[12px_16px_40px_rgba(139,92,246,0.14),-12px_-16px_40px_#ffffff] lg:scale-105 z-10'
                : 'border-stone-200/50'
            } ${idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
          >
            {/* Ribbon or Badge for Popular */}
            {model.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-rose-500 keep-white font-mono text-[9px] uppercase tracking-widest font-bold flex items-center space-x-1.5 shadow-sm rounded-full">
                <Sparkles size={10} className="animate-spin-slow text-white-force" />
                <span className="text-white-force">MOST POPULAR ARCHITECTURE</span>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2 font-mono">
                <span className="text-violet-600 text-[10px] tracking-widest font-bold uppercase">{model.tagline}</span>
                <h3 className="font-display font-extrabold text-2xl text-stone-800 tracking-tight">{model.title}</h3>
              </div>

              <div className="flex items-baseline space-x-2 border-b border-stone-200/30 pb-6">
                <span className="text-4xl sm:text-5xl font-display font-black text-stone-800 tracking-tighter">{model.price}</span>
                <span className="text-stone-400 font-mono text-xs uppercase">{model.priceBasis}</span>
              </div>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">
                {model.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-stone-200/30">
                <h4 className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">Included Scope:</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {model.features.map((feat) => (
                    <li key={feat} className="flex items-start space-x-2.5">
                      <Check size={12} className="text-violet-600 mt-1 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-stone-200/30">
              <button
                id={`pricing-card-cta-${model.title.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                onClick={() => {
                  localStorage.setItem('selectedPlanScope', model.scope);
                  const message = `*New Project Inquiry*
------------------------
*Plan:* ${model.title}
*Scope:* ${model.scope}
*Price:* ${model.price}

I would like to proceed with this architecture. Please provide further details.`;
                  const encodedMessage = encodeURIComponent(message);
                  const whatsappUrl = `https://wa.me/918102099678?text=${encodedMessage}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className={`w-full py-3.5 font-mono font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                  model.popular
                    ? 'clay-violet-solid'
                    : 'clay-button'
                }`}
              >
                <span>{model.cta}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* NEW: DELIVERABLES MARQUEE TO REMOVE ANY BUDGET SCOPE DOUBTS */}
      <ScrollReveal>
        <section id="deliverables-specifications-marquee" className="mb-32">
          <PolishedFeatureMarquee />
        </section>
      </ScrollReveal>

      {/* FEATURE COMPARISON TABLE */}
      <ScrollReveal>
        <section id="pricing-comparison" className="mb-32 overflow-x-auto">
          <div className="mb-10 text-center">
            <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-semibold">✦ CAPABILITY MATRIX</span>
            <h2 className="font-display font-extrabold text-3xl text-stone-800 tracking-tighter uppercase mt-2">Compare Architectures</h2>
          </div>
          <div className="min-w-[800px] border border-stone-200/50 bg-[#faf8f5]/80 rounded-2xl overflow-hidden shadow-[5px_5px_15px_rgba(45,38,32,0.05),-5px_-5px_15px_#ffffff]">
            <div className="grid grid-cols-4 border-b border-stone-200/30 bg-[#f0ede6]/50">
              <div className="p-6 font-mono text-xs text-stone-500 uppercase tracking-widest font-bold flex items-end">Feature Set</div>
              <div className="p-6 font-display text-lg text-stone-800 font-bold text-center">MVP Build<br/><span className="text-sm font-mono text-stone-400 font-normal">{(currency === 'INR') ? '₹8,500' : '$229'}</span></div>
              <div className="p-6 font-display text-lg text-stone-800 font-bold text-center border-x border-stone-200/20 bg-violet-50">Full-Stack + AI<br/><span className="text-sm font-mono text-violet-600 font-normal">{(currency === 'INR') ? '₹28,900' : '$729'}</span></div>
              <div className="p-6 font-display text-lg text-stone-800 font-bold text-center">Enterprise<br/><span className="text-sm font-mono text-stone-400 font-normal">{(currency === 'INR') ? '₹47,000+' : '$1,199+'}</span></div>
            </div>
            
            {[
              { name: 'Pages / Views', starter: '3-4 Pages', pro: 'Up to 10 Pages', enterprise: 'Unlimited / Dynamic' },
              { name: 'Mobile Responsive', starter: true, pro: true, enterprise: true },
              { name: 'SEO & Speed', starter: 'Basic Setup', pro: 'Optimized / Caching', enterprise: 'Advanced + Analytics' },
              { name: 'CMS Access', starter: false, pro: true, enterprise: 'Custom Backend' },
              { name: 'User Authentication', starter: false, pro: true, enterprise: 'SSO / Complex Auth' },
              { name: 'Payments / E-Commerce', starter: false, pro: false, enterprise: 'Custom Gateway' },
              { name: 'AI Integration', starter: false, pro: false, enterprise: 'Gemini / OpenAI Agents' },
              { name: 'Support SLA', starter: '14-day production', pro: '30-day dedicated', enterprise: 'Infinite Priority' }
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 border-b border-stone-200/20 hover:bg-stone-50 transition-colors">
                <div className="p-4 px-6 font-mono text-xs text-stone-600">{row.name}</div>
                <div className="p-4 px-6 flex justify-center items-center text-sm font-sans text-stone-500">
                  {typeof row.starter === 'boolean' ? (row.starter ? <Check size={16} className="text-emerald-500" /> : <span className="text-stone-300">-</span>) : row.starter}
                </div>
                <div className="p-4 px-6 flex justify-center items-center text-sm font-sans text-stone-800 border-x border-stone-200/20 bg-violet-50/20">
                  {typeof row.pro === 'boolean' ? (row.pro ? <Check size={16} className="text-violet-600" /> : <span className="text-stone-300">-</span>) : row.pro}
                </div>
                <div className="p-4 px-6 flex justify-center items-center text-sm font-sans text-stone-500">
                  {typeof row.enterprise === 'boolean' ? (row.enterprise ? <Check size={16} className="text-emerald-500" /> : <span className="text-stone-300">-</span>) : row.enterprise}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* NEW: INTERACTIVE ESTIMATION TOOL */}
      <ScrollReveal delay={100}>
        <section id="pricing-calculator" className="mb-32 clay-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
          
          <div className="p-8 sm:p-12 border-b border-stone-200/30 bg-stone-50/35">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 text-left">
                <div className="flex items-center space-x-2.5">
                  <span className="p-2 bg-violet-100 rounded-xl text-violet-600">
                    <Sliders size={18} />
                  </span>
                  <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-black">✦ ESTIMATION SUITE</span>
                </div>
                <h2 className="font-display font-black text-2xl xs:text-3xl text-stone-850 uppercase tracking-tight mt-1">Interactive Estimator</h2>
                <p className="text-stone-600 text-sm max-w-xl leading-relaxed">
                  Toggle configurations below to simulate an architectural deployment. Values are rough projections and scale with complexity.
                </p>
              </div>
              <div className="bg-violet-50 border border-violet-100 px-4 py-2.5 rounded-2xl flex items-center space-x-2 shrink-0 self-start sm:self-center">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                <span className="font-mono text-[9px] font-bold text-violet-700 uppercase tracking-widest">REAL-TIME TELEMETRY</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Controls */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-10 border-r-0 lg:border-r border-b lg:border-b-0 border-stone-200/30">
              
              {/* Base Tier */}
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest font-black">01_BASE_ARCHITECTURE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'landing-pages', label: 'Landing Pages', icon: Layout },
                    { id: 'business-website', label: 'Business Web', icon: Globe },
                    { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart },
                    { id: 'fullstack', label: 'Custom App', icon: Cpu },
                    { id: 'ai-agents', label: 'AI Agents', icon: Bot }
                  ].map(tier => {
                    const IconComp = tier.icon;
                    const isActive = calcTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setCalcTier(tier.id as any)}
                        className={`p-3.5 text-xs font-mono tracking-wide rounded-xl transition-all border cursor-pointer flex items-center space-x-3 text-left ${
                          isActive 
                            ? 'bg-gradient-to-r from-violet-600 to-rose-500 border-transparent text-white-force shadow-md shadow-violet-500/10 scale-[1.01]' 
                            : 'bg-[#faf8f5] border-stone-200/60 text-stone-700 hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-700 hover:shadow-sm'
                        }`}
                      >
                        <IconComp size={15} className={isActive ? 'text-white-force' : 'text-stone-400'} />
                        <span className="font-bold">{tier.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scope Size */}
              <AnimatePresence mode="wait">
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden mt-10 text-left"
                  >
                    <span className="text-stone-400 font-mono text-[10px] uppercase tracking-widest font-black">02_SYSTEM_COMPLEXITY</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'small', label: 'Lean / Focused', desc: 'Pre-production MVP build with essential features.' },
                        { id: 'medium', label: 'Standard Scale', desc: 'Production-ready with custom backend and scaling.' },
                        { id: 'large', label: 'Enterprise Grade', desc: 'Fully optimized with continuous SLA and audits.' }
                      ].map(scope => {
                        const isActive = calcScope === scope.id;
                        return (
                          <button
                            key={scope.id}
                            onClick={() => setCalcScope(scope.id as any)}
                            className={`p-4 text-left rounded-xl transition-all border cursor-pointer flex flex-col justify-between h-full ${
                              isActive 
                                ? 'bg-stone-900 border-transparent text-white-force shadow-md shadow-stone-850/20 scale-[1.01]' 
                                : 'bg-[#faf8f5] border-stone-200/60 text-stone-700 hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-700 hover:shadow-sm'
                            }`}
                          >
                            <span className={`text-xs font-mono tracking-wide font-black uppercase mb-1.5 ${isActive ? 'text-white-force' : 'text-stone-850'}`}>
                              {scope.label}
                            </span>
                            <span className={`text-[10px] font-sans leading-relaxed ${isActive ? 'text-stone-300-force' : 'text-stone-500'}`}>
                              {scope.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
              </AnimatePresence>

              {/* Add-ons */}
              <div className="space-y-4 mt-10 text-left">
                <span className="text-stone-400 font-mono text-[10px] uppercase tracking-widest font-black">03_ADDITIONAL_MODULES</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => toggleAddon('ai')}
                    disabled={calcTier === 'ai-agents'}
                    className={`flex items-center justify-between p-4 border rounded-xl transition-all text-left cursor-pointer h-full ${
                      calcTier === 'ai-agents' 
                        ? 'opacity-40 cursor-not-allowed border-stone-200/30 bg-stone-100/30 text-stone-400' 
                        : calcAddons.includes('ai') 
                          ? 'border-violet-300 bg-violet-50/70 text-violet-800 shadow-sm' 
                          : 'border-stone-200/60 bg-[#faf8f5] text-stone-700 hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-700 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col pr-2">
                      <span className="font-mono text-xs font-bold uppercase mb-1">AI Integrations</span>
                      <span className="text-[10px] font-sans text-stone-500 leading-normal">Gemini-powered NLP features and autonomous pipeline integrations.</span>
                    </div>
                    {calcTier === 'ai-agents' ? (
                      <span className="text-[8px] uppercase text-violet-600 font-black bg-violet-50 px-2 py-0.5 rounded-md border border-violet-200 shrink-0 self-start">INCLUDED</span>
                    ) : (
                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all shrink-0 self-start mt-0.5 ${calcAddons.includes('ai') ? 'bg-violet-600 border-violet-600 text-white-force' : 'border-stone-300 bg-white'}`}>
                        {calcAddons.includes('ai') && <Check size={10} className="text-white-force font-bold" />}
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => toggleAddon('motion')}
                    className={`flex items-center justify-between p-4 border rounded-xl transition-all text-left cursor-pointer h-full ${
                      calcAddons.includes('motion') 
                        ? 'border-violet-300 bg-violet-50/70 text-violet-800 shadow-sm' 
                        : 'border-stone-200/60 bg-[#faf8f5] text-stone-700 hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-700 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col pr-2">
                      <span className="font-mono text-xs font-bold uppercase mb-1">Complex Motion</span>
                      <span className="text-[10px] font-sans text-stone-500 leading-normal">Interactive 3D WebGL canvases, fluid vector systems, motion transitions.</span>
                    </div>
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all shrink-0 self-start mt-0.5 ${calcAddons.includes('motion') ? 'bg-violet-600 border-violet-600 text-white-force' : 'border-stone-300 bg-white'}`}>
                      {calcAddons.includes('motion') && <Check size={10} className="text-white-force font-bold" />}
                    </div>
                  </button>

                  <button
                    onClick={() => toggleAddon('priority')}
                    className={`flex items-center justify-between p-4 border rounded-xl transition-all text-left cursor-pointer h-full ${
                      calcAddons.includes('priority') 
                        ? 'border-violet-300 bg-violet-50/70 text-violet-800 shadow-sm' 
                        : 'border-stone-200/60 bg-[#faf8f5] text-stone-700 hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-700 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col pr-2">
                      <span className="font-mono text-xs font-bold uppercase mb-1">Priority SLA</span>
                      <span className="text-[10px] font-sans text-stone-500 leading-normal">Accelerated timeline, weekly core telemetry reports, 24-hr priority chat.</span>
                    </div>
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all shrink-0 self-start mt-0.5 ${calcAddons.includes('priority') ? 'bg-violet-600 border-violet-600 text-white-force' : 'border-stone-300 bg-white'}`}>
                      {calcAddons.includes('priority') && <Check size={10} className="text-white-force font-bold" />}
                    </div>
                  </button>
                </div>
              </div>

            </div>

            {/* Results Output - Obsidian Sleek Dark Console */}
            <div className="lg:col-span-5 bg-[#171513] p-8 sm:p-12 flex flex-col justify-between shadow-xl rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl border-t lg:border-t-0 lg:border-l border-stone-800 relative overflow-hidden text-left">
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-10 relative z-10">
                {/* Cost */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-stone-400-force font-mono text-[10px] uppercase tracking-widest font-black">
                    <DollarSign size={14} className="text-violet-400" />
                    <span className="text-stone-400-force">ESTIMATED INVESTMENT</span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-display font-black text-white-force tracking-tighter bg-gradient-to-r from-white-force to-stone-200-force bg-clip-text">
                    {estimation.priceStr}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-stone-400-force font-mono text-[10px] uppercase tracking-widest font-black">
                    <Clock size={14} className="text-violet-400" />
                    <span className="text-stone-400-force">PROJECTED TIMELINE</span>
                  </div>
                  <div className="text-2xl font-mono text-stone-100-force font-black">
                    {estimation.timelineStr}
                  </div>
                </div>

                {/* Resources */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-stone-400-force font-mono text-[10px] uppercase tracking-widest font-black">
                    <Users size={14} className="text-violet-400" />
                    <span className="text-stone-400-force">TEAM ALLOCATION</span>
                  </div>
                  <ul className="space-y-2.5">
                    {estimation.resources.map((res, i) => (
                      <li key={i} className="flex items-center space-x-2.5 text-xs text-stone-300-force font-sans">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                        <span className="text-stone-300-force">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-stone-800 relative z-10">
                <button 
                  id="estimator-proceed-btn"
                  onClick={() => {
                    let scopeStr = 'Other';
                    if (['landing-pages', 'business-website', 'ecommerce', 'fullstack'].includes(calcTier)) {
                      scopeStr = 'Web App';
                    } else if (calcTier === 'ai-agents') {
                      scopeStr = 'AI Automation';
                    }
                    localStorage.setItem('selectedPlanScope', scopeStr);
                    const message = `*New Project Estimate Inquiry*
------------------------
*Estimated Cost:* ${estimation.priceStr}
*Projected Timeline:* ${estimation.timelineStr}
*Scope Category:* ${scopeStr}

I would like to proceed with an estimate for my project. Please provide further details.`;
                    const encodedMessage = encodeURIComponent(message);
                    const whatsappUrl = `https://wa.me/918102099678?text=${encodedMessage}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full py-4 bg-gradient-to-r from-violet-600 to-rose-500 text-white-force font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_30px_rgba(124,58,237,0.5)] cursor-pointer"
                >
                  PROCEED WITH ESTIMATE
                </button>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. FAQ SECTION */}
      <ScrollReveal delay={150}>
        <section id="pricing-faq-section" className="py-24 border-t border-stone-200/30 max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-semibold">✦ ACCREDITATION MEMORANDUM</span>
            <h2 className="font-display font-extrabold text-4xl text-stone-800 tracking-tight uppercase">ENGAGEMENT FAQ.</h2>
            <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
              Transparent protocols regarding database assets, intellectual code rights, and release timelines.
            </p>
          </div>

          <div className="space-y-4 font-sans">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  id={`faq-item-${idx}`}
                  key={idx}
                  className="bg-[#fcfbf9] border border-stone-200/50 rounded-2xl transition-all duration-300 overflow-hidden hover:border-stone-400 shadow-sm"
                >
                  <button
                    id={`faq-toggle-btn-${idx}`}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-[#faf8f5]/50 cursor-pointer"
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-stone-800 leading-tight tracking-tight">
                      {faq.question}
                    </span>
                    <div className="text-violet-600">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-6 pb-6 pt-2 text-sm text-stone-600 border-t border-stone-200/20 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

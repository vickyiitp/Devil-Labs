import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, HelpCircle, ChevronDown, ChevronUp, Zap, Sparkles, Sliders, Clock, Users, DollarSign } from 'lucide-react';
import { useState, useMemo } from 'react';

interface PricingPageProps {
  navigate: (path: string) => void;
}

export default function PricingPage({ navigate }: PricingPageProps) {
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
    let resources = [];
    let isMonthly = false;

    switch (calcTier) {
      case 'landing-pages':
        basePrice = 5000;
        baseWeeksMin = 1;
        baseWeeksMax = 2;
        resources = ['1x UI/UX Designer', '1x Frontend Developer'];
        break;
      case 'business-website':
        basePrice = 12000;
        baseWeeksMin = 2;
        baseWeeksMax = 4;
        resources = ['1x UI/UX Designer', '1x Full-Stack Developer'];
        break;
      case 'ecommerce':
        basePrice = 25000;
        baseWeeksMin = 4;
        baseWeeksMax = 6;
        resources = ['1x UI/UX Designer', '1x E-Commerce Architect', '1x Full-Stack Developer'];
        break;
      case 'fullstack':
        basePrice = 40000;
        baseWeeksMin = 6;
        baseWeeksMax = 10;
        resources = ['1x System Architect', '2x Full-Stack Developers', '1x Database Engineer'];
        break;
      case 'ai-agents':
        basePrice = 20000;
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
        finalPrice += 8000;
        finalWeeksMin += 2;
        finalWeeksMax += 2;
        if (!resources.includes('1x AI Automation Specialist')) {
          resources.push('1x AI Automation Specialist');
        }
      }
      if (addon === 'motion') {
        finalPrice += 4000;
        finalWeeksMin += 1;
        finalWeeksMax += 2;
        if (!resources.includes('1x Creative Developer (WebGL)')) {
          resources.push('1x Creative Developer (WebGL)');
        }
      }
      if (addon === 'priority') {
        finalPrice += 5000;
      }
    });

    return {
      priceStr: `$${(finalPrice / 1000).toFixed(1)}k`,
      timelineStr: `${finalWeeksMin}-${finalWeeksMax} Weeks`,
      resources
    };
  }, [calcTier, calcScope, calcAddons]);

  const models = [
    {
      title: "MVP Build",
      tagline: "FAST PRODUCT SHIPMENT",
      price: "$15k",
      priceBasis: "per deployment",
      description: "Best for early stage startups needing a polished, functional React-based mockup or fully functional production web frontend to secure funding or test market fit.",
      features: [
        "React 19 / Next.js customized frontend",
        "Subtle Framer Motion interface animations",
        "Tailwind CSS mobile-responsive layouts",
        "Fully functional static states & client-side mocks",
        "Uplink support for standard public REST APIs",
        "14-day production support period"
      ],
      cta: "INITIALIZE MVP UPLINK",
      popular: false
    },
    {
      title: "Full-Stack + AI",
      tagline: "AUTONOMOUS & DATA ENGINES",
      price: "$35k",
      priceBasis: "per architecture",
      description: "Our signature flagship tier. Best for scale-ready enterprises that require custom AI multi-agent automation pipelines integrated directly into a bulletproof database structure.",
      features: [
        "Everything in the MVP Build package",
        "Custom LLM orchestrations (Gemini SDKs)",
        "Secure server-side proxy route structures",
        "MERN/MEVN or Relational SQL schemas",
        "WhatsApp Business API pipelines",
        "Vector search engine implementations",
        "30-day dedicated engineering support"
      ],
      cta: "INITIALIZE SECURE SYSTEM",
      popular: true
    },
    {
      title: "Retainer / Dedicated Team",
      tagline: "CONTINUOUS AUTOMATION SCALE",
      price: "$10k",
      priceBasis: "per sprint period",
      description: "Best for established enterprises seeking to scale their software assets over time, perform regular system audits, or build complex program workflows dynamically.",
      features: [
        "Dedicated fractional Principal Engineer",
        "Continuous custom feature sprint releases",
        "Weekly database & security protocol audits",
        "Real-time slack/discord sync communications",
        "Programmatic creative assets updates",
        "Infinite system maintenance SLA"
      ],
      cta: "INITIALIZE PARTNERSHIP",
      popular: false
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
    }
  ];

  return (
    <div id="pricing-page-root" className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. HEADER */}
      <section id="pricing-header" className="mb-20 space-y-4">
        <span className="text-violet-500 font-mono text-xs uppercase tracking-widest font-semibold">// ENGAGEMENT MODELS</span>
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tighter uppercase leading-none">
          SYSTEM TARIFFS.
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          Clear scope. Zero bloated sales contracts. We provide fully-mapped engagement brackets to fit your technical goals.
        </p>
      </section>

      {/* 2. PRICING CARDS (3 columns) */}
      <section id="pricing-cards-section" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-32">
        {models.map((model) => (
          <motion.div
            id={`pricing-card-${model.title.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
            key={model.title}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`relative flex flex-col justify-between p-8 bg-black/40 border transition-all duration-300 ${
              model.popular
                ? 'border-violet-500 bg-gradient-to-b from-violet-950/10 via-black/40 to-black/40 shadow-neon-violet-strong lg:scale-105 z-10'
                : 'border-white/5 hover:border-white/15'
            }`}
          >
            {/* Ribbon or Badge for Popular */}
            {model.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-600 border border-violet-400 text-white font-mono text-[9px] uppercase tracking-widest font-bold flex items-center space-x-1.5 shadow-sm">
                <Sparkles size={10} className="animate-spin-slow" />
                <span>MOST POPULAR ARCHITECTURE</span>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2 font-mono">
                <span className="text-violet-400 text-[10px] tracking-widest font-bold uppercase">{model.tagline}</span>
                <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">{model.title}</h3>
              </div>

              <div className="flex items-baseline space-x-2 border-b border-white/5 pb-6">
                <span className="text-4xl sm:text-5xl font-display font-black text-white tracking-tighter">{model.price}</span>
                <span className="text-gray-500 font-mono text-xs uppercase">{model.priceBasis}</span>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
                {model.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Included Scope:</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                  {model.features.map((feat) => (
                    <li key={feat} className="flex items-start space-x-2.5">
                      <Check size={12} className="text-violet-500 mt-1 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/5">
              <button
                id={`pricing-card-cta-${model.title.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                onClick={() => navigate('/contact')}
                className={`w-full py-3.5 font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 border cursor-pointer ${
                  model.popular
                    ? 'bg-white text-black border-white hover:bg-violet-600 hover:text-white hover:border-violet-500 shadow-neon-violet'
                    : 'bg-transparent text-white border-white/25 hover:border-white'
                }`}
              >
                <span>{model.cta}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* NEW: INTERACTIVE ESTIMATION TOOL */}
      <section id="pricing-calculator" className="mb-32 border border-white/5 bg-black/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="p-8 sm:p-12 border-b border-white/5">
          <div className="flex items-center space-x-3 mb-4">
            <Sliders size={20} className="text-violet-500" />
            <h2 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">Interactive Estimator</h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            Toggle configurations below to simulate an architectural deployment. Values are rough projections and scale with complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Controls */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-10 border-r-0 lg:border-r border-b lg:border-b-0 border-white/5">
            
            {/* Base Tier */}
            <div className="space-y-4">
              <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest font-bold">01_BASE_ARCHITECTURE</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'landing-pages', label: 'Landing Pages' },
                  { id: 'business-website', label: 'Business Web' },
                  { id: 'ecommerce', label: 'E-Commerce' },
                  { id: 'fullstack', label: 'Custom App' },
                  { id: 'ai-agents', label: 'AI Agents' }
                ].map(tier => (
                  <button
                    key={tier.id}
                    onClick={() => setCalcTier(tier.id as any)}
                    className={`py-3 px-4 text-xs font-mono tracking-wide transition-all border ${calcTier === tier.id ? 'bg-violet-600 border-violet-500 text-white shadow-neon-violet' : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'}`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scope Size */}
            <AnimatePresence mode="wait">
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden mt-10"
                >
                  <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest font-bold">02_SYSTEM_COMPLEXITY</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'small', label: 'Lean / Focused' },
                      { id: 'medium', label: 'Standard Scale' },
                      { id: 'large', label: 'Enterprise Grade' }
                    ].map(scope => (
                      <button
                        key={scope.id}
                        onClick={() => setCalcScope(scope.id as any)}
                        className={`py-3 px-4 text-xs font-mono tracking-wide transition-all border ${calcScope === scope.id ? 'bg-white text-black border-white' : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'}`}
                      >
                        {scope.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
            </AnimatePresence>

            {/* Add-ons */}
            <div className="space-y-4 mt-10">
              <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest font-bold">03_ADDITIONAL_MODULES</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => toggleAddon('ai')}
                  disabled={calcTier === 'ai-agents'}
                  className={`flex items-center justify-between p-4 border transition-all text-left ${calcTier === 'ai-agents' ? 'opacity-50 cursor-not-allowed border-white/5 bg-transparent' : calcAddons.includes('ai') ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  <span className="font-mono text-xs">AI Integrations</span>
                  {calcTier === 'ai-agents' ? <span className="text-[9px] uppercase text-violet-400 font-bold">INCLUDED</span> : <div className={`w-3 h-3 rounded-full border ${calcAddons.includes('ai') ? 'bg-violet-500 border-violet-500' : 'border-gray-500'}`} />}
                </button>
                <button
                  onClick={() => toggleAddon('motion')}
                  className={`flex items-center justify-between p-4 border transition-all text-left ${calcAddons.includes('motion') ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  <span className="font-mono text-xs">WebGL / Complex Motion</span>
                  <div className={`w-3 h-3 rounded-full border ${calcAddons.includes('motion') ? 'bg-violet-500 border-violet-500' : 'border-gray-500'}`} />
                </button>
                <button
                  onClick={() => toggleAddon('priority')}
                  className={`flex items-center justify-between p-4 border transition-all text-left ${calcAddons.includes('priority') ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  <span className="font-mono text-xs">Priority SLA Support</span>
                  <div className={`w-3 h-3 rounded-full border ${calcAddons.includes('priority') ? 'bg-violet-500 border-violet-500' : 'border-gray-500'}`} />
                </button>
              </div>
            </div>

          </div>

          {/* Results Output */}
          <div className="lg:col-span-5 bg-black p-8 sm:p-12 flex flex-col justify-between">
            <div className="space-y-10">
              {/* Cost */}
              <div>
                <div className="flex items-center space-x-2 text-gray-500 font-mono text-[10px] uppercase tracking-widest font-bold mb-2">
                  <DollarSign size={14} />
                  <span>ESTIMATED INVESTMENT</span>
                </div>
                <div className="text-4xl sm:text-5xl font-display font-black text-white tracking-tighter">
                  {estimation.priceStr}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <div className="flex items-center space-x-2 text-gray-500 font-mono text-[10px] uppercase tracking-widest font-bold mb-2">
                  <Clock size={14} />
                  <span>PROJECTED TIMELINE</span>
                </div>
                <div className="text-2xl font-mono text-gray-300">
                  {estimation.timelineStr}
                </div>
              </div>

              {/* Resources */}
              <div>
                <div className="flex items-center space-x-2 text-gray-500 font-mono text-[10px] uppercase tracking-widest font-bold mb-3">
                  <Users size={14} />
                  <span>TEAM ALLOCATION</span>
                </div>
                <ul className="space-y-2">
                  {estimation.resources.map((res, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-gray-400 font-sans">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10">
              <button 
                onClick={() => {
                  let scopeStr = 'Other';
                  if (['landing-pages', 'business-website', 'ecommerce', 'fullstack'].includes(calcTier)) {
                    scopeStr = 'Web App';
                  } else if (calcTier === 'ai-agents') {
                    scopeStr = 'AI Automation';
                  }
                  navigate(`/contact?scope=${encodeURIComponent(scopeStr)}`);
                }}
                className="w-full py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all shadow-neon-violet"
              >
                PROCEED WITH ESTIMATE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section id="pricing-faq-section" className="py-24 border-t border-white/5 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-violet-500 font-mono text-xs uppercase tracking-widest font-semibold">// ACCREDITATION MEMORANDUM</span>
          <h2 className="font-display font-extrabold text-4xl text-white tracking-tight uppercase">ENGAGEMENT FAQ.</h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
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
                className="bg-black/40 border border-white/5 transition-all duration-300 overflow-hidden"
              >
                <button
                  id={`faq-toggle-btn-${idx}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] cursor-pointer"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white leading-tight tracking-tight">
                    {faq.question}
                  </span>
                  <div className="text-violet-400">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <motion.div
                    id={`faq-answer-${idx}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-6 pb-6 pt-2 text-sm text-gray-400 border-t border-white/5 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

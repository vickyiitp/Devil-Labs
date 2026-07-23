import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Cpu, Blocks, Layout, Terminal, Sparkles, BookOpen, 
  ShieldCheck, ArrowRight, Download, Eye, CheckCircle, Zap, DollarSign,
  Package, Code, Share2
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'ai' | 'boilerplates' | 'devtools' | 'ui';
  desc: string;
  features: string[];
  screenshotText: string;
  screenshotTheme: string; // Gradient class
  pricing: {
    single: number;
    team: number;
  };
  license: string;
  docsUrl: string;
  rating: string;
  salesCount: string;
}

const productsData: Product[] = [
  {
    id: 'ai-orchestrator',
    name: 'DEVIL AGENT CORE',
    category: 'ai',
    desc: 'Advanced Node-native multi-agent orchestration engine. Seamlessly run parallel planning loops, state synchronization, and prompt routing with built-in telemetry.',
    features: [
      'Dual-loop agent reasoning with memory buffers',
      'Real-time token usage optimizations & safeguards',
      'Plug-and-play SDK integrations for standard LLMs',
      'Local vector-db cache for faster context delivery'
    ],
    screenshotText: 'npm i @devillabs/agent-core\n\nconst agent = new DevilAgent({\n  role: "system-architect",\n  maxMemoryBlocks: 10\n});\nawait agent.execute(task);',
    screenshotTheme: 'from-violet-900 to-indigo-950 text-emerald-400',
    pricing: {
      single: 79,
      team: 299
    },
    license: 'Single/Team Commercial License',
    docsUrl: '#/docs/agent-core',
    rating: '4.9/5',
    salesCount: '1,420+ licenses'
  },
  {
    id: 'nextjs-saas-boilerplate',
    name: 'DEVIL SPRINT BOILERPLATE',
    category: 'boilerplates',
    desc: 'The ultimate production-ready Next.js SaaS starter. Equipped with pre-configured secure authentication, PostgreSQL (Drizzle) integration, Stripe webhooks, and elegant Tailwind styles.',
    features: [
      'Next.js 15 (App Router) & React 19 optimized',
      'Drizzle ORM + secure database connection pool',
      'Pre-built Stripe billing portals & multi-tier pricing',
      'Built-in security audits and SEO optimization'
    ],
    screenshotText: 'devil-labs-saas-boilerplate/\n├── app/ (App Router)\n├── src/components/ui/ (Premium Claymorphic UI)\n├── src/db/schema.ts\n├── api/stripe/route.ts',
    screenshotTheme: 'from-stone-900 to-stone-950 text-stone-200',
    pricing: {
      single: 129,
      team: 399
    },
    license: 'Unlimited Commercial Project License',
    docsUrl: '#/docs/saas-starter',
    rating: '5.0/5',
    salesCount: '890+ licenses'
  },
  {
    id: 'premium-ui-kit',
    name: 'CLAYMORPHIC DESIGN SYSTEM',
    category: 'ui',
    desc: 'An exquisite library of React components using soft-claymorphism, smooth CSS-glass backdrops, and motion/react micro-animations. Elevate your SaaS visual style instantly.',
    features: [
      '80+ copy-paste premium components with clean types',
      'Fully responsive & accessible (WCAG compliant) contrast',
      'Tailwind CSS native with custom micro-shadow overrides',
      'Pre-configured dark-mode accents and canvas layout blocks'
    ],
    screenshotText: 'import { ClayCard, MagneticButton } from "devil-ui";\n\n<ClayCard variant="neon" isInteractive>\n  <MagneticButton onClick={trigger}>\n    Initialize\n  </MagneticButton>\n</ClayCard>',
    screenshotTheme: 'from-rose-900 to-amber-950 text-rose-300',
    pricing: {
      single: 49,
      team: 149
    },
    license: 'MIT Core + Commercial Assets License',
    docsUrl: '#/docs/claymorphic-ui',
    rating: '4.8/5',
    salesCount: '2,150+ downloads'
  },
  {
    id: 'whatsapp-automation-pack',
    name: 'WHATSAPP INFRASTRUCTURE PACK',
    category: 'devtools',
    desc: 'A robust developer toolkit for the WhatsApp Cloud API. Send automated transactions, interactive list buttons, and monitor payload deliveries with sub-100ms latency triggers.',
    features: [
      'Pre-configured fast Webhook validation endpoints',
      'Stateful messaging flow state machine engine',
      'Automated fallback channels (SMS/Email) integration',
      'High-throughput rate-limiting safeguard built-in'
    ],
    screenshotText: 'const client = new WhatsAppClient({\n  apiKey: process.env.WA_SECRET\n});\n\nclient.sendTemplate(to, "order_confirm", {\n  orderId: "DL-908"\n});',
    screenshotTheme: 'from-emerald-900 to-teal-950 text-emerald-300',
    pricing: {
      single: 89,
      team: 249
    },
    license: 'Commercial deployment allowance',
    docsUrl: '#/docs/whatsapp-pack',
    rating: '4.9/5',
    salesCount: '630+ licenses'
  }
];

export default function ProductsPage({ navigate }: { navigate: (path: string) => void }) {
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'boilerplates' | 'devtools' | 'ui'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [purchaseTier, setPurchaseTier] = useState<'single' | 'team'>('single');
  const [purchased, setPurchased] = useState(false);

  const filteredProducts = activeTab === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === activeTab);

  const tabs = [
    { id: 'all', name: 'ALL DIGITAL ASSETS' },
    { id: 'ai', name: 'AI AGENTS & ENGINE' },
    { id: 'boilerplates', name: 'NEXT.JS & BOILERPLATES' },
    { id: 'devtools', name: 'DEVELOPER UTILITIES' },
    { id: 'ui', name: 'PREMIUM DESIGN SYSTEMS' },
  ];

  const handlePurchase = (product: Product) => {
    setSelectedProduct(product);
    setPurchaseTier('single');
    setPurchased(false);
  };

  const confirmPurchaseMock = () => {
    setPurchased(true);
    // Auto reset modal after short time
    setTimeout(() => {
      setSelectedProduct(null);
      setPurchased(false);
    }, 3000);
  };

  return (
    <div id="products-page-root" className="pt-20 xs:pt-24 sm:pt-28 lg:pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto text-stone-800">
      
      {/* 1. HEADER DIVISION */}
      <section id="products-header" className="mb-16 space-y-4">
        <div className="flex items-center space-x-2 text-violet-600 font-sans text-xs uppercase tracking-widest font-extrabold">
          <Package size={14} />
          <span>✦ DIGITAL PRODUCTS &amp; ASSETS</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl md:text-7xl text-stone-800 tracking-tighter uppercase leading-none break-words max-w-full">
          PREMIUM SOFTWARE<br />&amp; DEVELOPER ASSETS.
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-3xl leading-relaxed font-sans">
          We design production-ready Next.js starter templates, developer SDKs, AI agent microservices, and design systems to boost your launch velocity. Built with clean architecture and production-tested code.
        </p>
      </section>

      {/* 2. DYNAMIC FILTER NAVIGATION */}
      <div className="flex flex-wrap gap-2.5 border-b border-stone-200/55 pb-6 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4.5 py-2 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-stone-900 text-[#faf8f5] shadow-sm' 
                : 'bg-stone-100 hover:bg-stone-200/60 text-stone-600'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 3. PRODUCT SPECIFICATIONS CATALOG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-20">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              key={product.id}
              className="clay-card p-6 md:p-8 flex flex-col justify-between hover:scale-[1.01] hover:border-violet-300/45 transition-all text-left relative overflow-hidden"
            >
              <div>
                {/* Meta details badge bar */}
                <div className="flex items-center justify-between mb-6 text-[10px] font-mono uppercase tracking-widest font-bold text-stone-400">
                  <span className="bg-stone-100 px-2.5 py-1 rounded-full text-stone-600 border border-stone-200/30">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-3">
                    <span>★ {product.rating}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                    <span>{product.salesCount}</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-stone-850 tracking-tight mb-2 uppercase">
                  {product.name}
                </h3>
                
                <p className="text-stone-600 text-sm leading-relaxed mb-6 font-sans">
                  {product.desc}
                </p>

                {/* Screenshot code block / terminal */}
                <div className="mb-6 relative">
                  <div className={`rounded-xl p-4 sm:p-5 font-mono text-[11px] leading-relaxed overflow-x-auto shadow-inner border border-stone-250/20 bg-gradient-to-tr ${product.screenshotTheme}`}>
                    <div className="flex space-x-1.5 mb-3 opacity-60">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <pre className="whitespace-pre-wrap">{product.screenshotText}</pre>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#faf8f5]/10 backdrop-blur-md border border-[#faf8f5]/10 rounded-lg p-1.5 opacity-60 hover:opacity-100 transition-opacity">
                    <Code size={13} className="text-white" />
                  </div>
                </div>

                {/* Bulletproof architectural specs list */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-stone-400 font-extrabold block mb-1">
                    ✦ KEY FEATURES &amp; CAPABILITIES
                  </span>
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-stone-600 text-xs font-sans">
                      <CheckCircle size={14} className="text-violet-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action and buy footer */}
              <div className="pt-6 border-t border-stone-200/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[9px] font-sans text-stone-400 uppercase tracking-widest font-extrabold block">
                    PRICE STARTS AT
                  </span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-stone-850 font-display text-2xl font-black">${product.pricing.single}</span>
                    <span className="text-stone-400 font-sans text-[10px] uppercase tracking-wider font-bold">/ single developer</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <a 
                    href={product.docsUrl}
                    className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-full border border-stone-200/60 hover:border-stone-300 hover:bg-stone-50 text-stone-600 text-xs font-sans font-bold uppercase tracking-wider transition-all"
                  >
                    <BookOpen size={13} />
                    <span>DOCS</span>
                  </a>

                  <button
                    onClick={() => handlePurchase(product)}
                    className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-700 hover:to-rose-600 text-[#faf8f5] text-xs font-sans font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    <ShoppingBag size={13} />
                    <span>PURCHASE</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 4. MODULAR PRICING LICENSE INFO CARD */}
      <section id="licensing-standards" className="bg-[#f0eee6]/60 border border-stone-200/40 rounded-3xl p-8 sm:p-10 mb-20 text-left">
        <div className="max-w-3xl space-y-4">
          <span className="text-violet-600 font-sans text-[10px] uppercase tracking-widest font-extrabold">✦ LICENSING &amp; SOURCE ACCESS</span>
          <h2 className="font-display font-black text-2xl text-stone-850 uppercase tracking-tight">DEVIL LABS LICENSING &amp; SUPPORT</h2>
          <p className="text-stone-600 text-sm leading-relaxed font-sans">
            Every digital product we release is built to production standards. All purchases include lifetime access, full source code, clear documentation, and direct email support for updates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs font-sans font-bold text-stone-600 uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <ShieldCheck size={14} className="text-violet-600" />
              <span>Commercial License</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap size={14} className="text-violet-600" />
              <span>Lifetime Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <Share2 size={14} className="text-violet-600" />
              <span>Full Source Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INDEPENDENT SECURE PURCHASE MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#faf8f5] border border-stone-200 max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-left overflow-hidden"
            >
              {/* Top ambient color ring */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 to-rose-500" />

              {purchased ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-display font-black text-2xl text-stone-850 uppercase tracking-tight">PURCHASE COMPLETE</h3>
                  <p className="text-stone-600 text-sm font-sans max-w-sm mx-auto">
                    Thank you! Your license key, documentation access, and download link have been sent to your registered email address.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-violet-600 font-sans text-[9px] uppercase tracking-widest font-extrabold block mb-1">SECURE CHECKOUT</span>
                    <h3 className="font-display font-black text-2xl text-stone-850 uppercase tracking-tight">{selectedProduct.name}</h3>
                    <p className="text-stone-500 text-xs mt-1 font-sans uppercase tracking-widest font-bold">{selectedProduct.license}</p>
                  </div>

                  {/* Tier Choice */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPurchaseTier('single')}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        purchaseTier === 'single'
                          ? 'border-violet-600 bg-violet-50/20 shadow-sm'
                          : 'border-stone-250/50 hover:bg-stone-50/40'
                      }`}
                    >
                      <span className="font-sans text-[10px] text-stone-400 uppercase tracking-wider font-extrabold">SINGLE DEV</span>
                      <span className="text-xl font-display font-black text-stone-850 mt-1">${selectedProduct.pricing.single}</span>
                    </button>
                    <button
                      onClick={() => setPurchaseTier('team')}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        purchaseTier === 'team'
                          ? 'border-violet-600 bg-violet-50/20 shadow-sm'
                          : 'border-stone-250/50 hover:bg-stone-50/40'
                      }`}
                    >
                      <span className="font-sans text-[10px] text-stone-400 uppercase tracking-wider font-extrabold">TEAM LICENSE</span>
                      <span className="text-xl font-display font-black text-stone-850 mt-1">${selectedProduct.pricing.team}</span>
                    </button>
                  </div>

                  {/* Payment Details Form */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-sans uppercase tracking-widest text-stone-400 font-extrabold block mb-1.5">Your Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="you@yourcompany.com"
                        className="bg-stone-50 border border-stone-200/70 rounded-full px-4 py-2.5 text-stone-800 text-xs font-sans placeholder-stone-400 focus:outline-none focus:border-violet-300 w-full"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-sans uppercase tracking-widest text-stone-400 font-extrabold block mb-1.5">Billing Information</label>
                      <div className="flex items-center space-x-2 bg-stone-50 border border-stone-200/70 rounded-full px-4 py-2.5 text-xs text-stone-500 font-sans">
                        <ShieldCheck size={14} className="text-stone-400 flex-shrink-0" />
                        <span>Protected by 256-bit encrypted checkout</span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center space-x-3 pt-4">
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="flex-1 py-3 rounded-full border border-stone-200/60 hover:bg-stone-50 text-stone-600 text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={confirmPurchaseMock}
                      className="flex-2 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-[#faf8f5] text-xs font-sans font-bold uppercase tracking-widest shadow-md transition-all cursor-pointer text-center"
                    >
                      COMPLETE PURCHASE
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

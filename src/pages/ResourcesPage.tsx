import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Terminal, Sparkles, FileText, ArrowRight, Download, Mail, CheckCircle, Search, 
  Code, Eye, BookMarked, Layers, Server, Shield
} from 'lucide-react';

interface ResourceItem {
  id: string;
  type: 'blog' | 'docs' | 'case-studies' | 'guides';
  title: string;
  date: string;
  author: string;
  desc: string;
  readTime: string;
  downloadable?: boolean;
}

const resourcesData: ResourceItem[] = [
  {
    id: 'agentic-design-patterns',
    type: 'blog',
    title: 'AGENTIC STATE MACHINES IN HIGH-SPEED ENTERPRISE ENVIRONMENTS',
    date: 'JULY 18, 2026',
    author: 'VICKY KUMAR (@VICKYIITP)',
    desc: 'An in-depth analysis on preventing infinite loops, optimizing prompt vector token budgets, and ensuring strict deterministic state execution in multi-agent networks.',
    readTime: '8 MIN READ'
  },
  {
    id: 'nextjs-performance-optimization',
    type: 'guides',
    title: 'THE 100MS LATENCY BUDGET: NEXT.JS SERVER ACTIONS UNLEASHED',
    date: 'JULY 10, 2026',
    author: 'DEVIL LABS LABS',
    desc: 'How to bypass bloated client-side bundles by offloading data reconciliation to the edge server. Code patterns for lazy loading ORM structures.',
    readTime: '12 MIN READ',
    downloadable: true
  },
  {
    id: 'case-study-patient-portal',
    type: 'case-studies',
    title: 'HOW DEVIL LABS AUTOMATED TRIAGE FOR 50,000 PATIENTS',
    date: 'JUNE 28, 2026',
    author: 'CASE RECONCILIATION',
    desc: 'Exploration of our HIPAA-compliant, sub-100ms multi-agent routing node. Reviewing problems, tech decisions, and the verified 70% decrease in operational overhead.',
    readTime: '15 MIN READ'
  },
  {
    id: 'vps-monitoring-blueprint',
    type: 'docs',
    title: 'SELF-HEALING VPS INFRASTRUCTURE: PROMETHEUS & DOCKER',
    date: 'JUNE 15, 2026',
    author: 'DEV DEVOPS UNIT',
    desc: 'Official technical configuration docs for auto-restart container scripts, active rate-limiting proxies, and secure volume backups.',
    readTime: 'TECHNICAL SPEC',
    downloadable: true
  },
  {
    id: 'whatsapp-webhook-template',
    type: 'docs',
    title: 'WHATSAPP CLOUD WEBHOOK VALIDATOR ENDPOINT (EXPRESS)',
    date: 'MAY 22, 2026',
    author: 'OPEN SOURCE CODES',
    desc: 'A copy-pasteable high-performance validation webhook with built-in token confirmation and security middleware headers.',
    readTime: 'CODE TEMPLATE',
    downloadable: true
  }
];

export default function ResourcesPage({ navigate }: { navigate: (path: string) => void }) {
  const [activeTab, setActiveTab] = useState<'all' | 'blog' | 'docs' | 'case-studies' | 'guides'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredResources = resourcesData.filter((item) => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const tabs = [
    { id: 'all', label: 'ALL RESOURCES' },
    { id: 'blog', label: 'BLOG & POSTS' },
    { id: 'docs', label: 'API & TECH DOCS' },
    { id: 'case-studies', label: 'CASE STUDIES' },
    { id: 'guides', label: 'DEV GUIDES' }
  ];

  return (
    <div id="resources-page-root" className="pt-20 xs:pt-24 sm:pt-28 lg:pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto text-stone-800">
      
      {/* 1. HEADER */}
      <section id="resources-header" className="mb-16 space-y-4">
        <div className="flex items-center space-x-2 text-violet-600 font-mono text-xs uppercase tracking-widest font-semibold">
          <BookMarked size={14} />
          <span>✦ DEVIL RESOURCES HUB</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl md:text-7xl text-stone-800 tracking-tighter uppercase leading-none break-words max-w-full">
          ENGINEERING LABS<br />& DOCUMENTATION.
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-3xl leading-relaxed font-sans">
          Welcome to our official resource depository. Read our architectural deep-dives, grab copy-paste development templates, explore industrial case studies, and browse our formal specifications list.
        </p>
      </section>

      {/* 2. CONTROLS BAR: SEARCH & TABS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-200/55 pb-6 mb-12">
        {/* Navigation tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-stone-900 text-[#faf8f5] shadow-sm' 
                  : 'bg-stone-100 hover:bg-stone-200/60 text-stone-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input field */}
        <div className="relative max-w-sm w-full">
          <input 
            type="text" 
            placeholder="SEARCH BLUEPRINTS..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#fdfcf9] border border-stone-250/60 rounded-full pl-10 pr-4 py-2.5 text-xs text-stone-800 font-mono placeholder-stone-400 focus:outline-none focus:border-violet-300 shadow-inner"
          />
          <Search size={14} className="text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* 3. DYNAMIC RESOURCE DEPOSITORY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-20">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={item.id}
              className="clay-card p-6 md:p-8 flex flex-col justify-between hover:scale-[1.01] hover:border-violet-300/40 transition-all text-left relative overflow-hidden"
            >
              <div>
                {/* Meta Tags bar */}
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest font-bold text-stone-400 mb-6">
                  <span className="text-violet-600">{item.type}</span>
                  <div className="flex items-center space-x-2">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-xl sm:text-2xl text-stone-850 tracking-tight leading-snug mb-3 uppercase">
                  {item.title}
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed mb-6 font-sans font-light">
                  {item.desc}
                </p>

                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold">
                  AUTHOR: <span className="text-stone-750">{item.author}</span>
                </div>
              </div>

              {/* Action row footer */}
              <div className="pt-6 mt-6 border-t border-stone-200/20 flex items-center justify-between text-stone-500 hover:text-stone-900 transition-colors">
                {item.downloadable ? (
                  <button 
                    onClick={() => {
                      alert('Transmission initiated: Asset compilation download starting.');
                    }}
                    className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-violet-600 hover:text-violet-700 cursor-pointer"
                  >
                    <Download size={13} />
                    <span>DOWNLOAD PACK</span>
                  </button>
                ) : (
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400">
                    READ SPECIFICATION
                  </span>
                )}
                
                <button
                  onClick={() => alert(`Navigating to detailed specification: ${item.title}`)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-violet-50 text-stone-500 hover:text-violet-600 border border-stone-200/30 flex items-center justify-center transition-all cursor-pointer"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredResources.length === 0 && (
          <div className="col-span-full py-16 text-center text-stone-400 font-mono text-xs uppercase tracking-widest">
            No matching resources found in our depository. Try adjusting your query parameters.
          </div>
        )}
      </div>

      {/* 4. API SPECIFICATION INTERACTIVE DEMO ACCORDION */}
      <section className="bg-stone-900 text-[#faf8f5] rounded-3xl p-6 sm:p-10 mb-20 text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        <div className="max-w-3xl space-y-4">
          <span className="text-violet-400 font-mono text-[9px] uppercase tracking-widest font-black">✦ TECHNICAL INTERFACE</span>
          <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter text-white">THE DEVIL LABS API</h2>
          <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
            Developers can directly deploy our automated workflows, WhatsApp responders, and CRM integrations via standard microservices webhooks. Check out our standardized endpoint layout:
          </p>
          
          <div className="rounded-xl p-4 bg-stone-950 font-mono text-xs text-stone-350 border border-stone-800 space-y-2 overflow-x-auto">
            <div><span className="text-emerald-400 font-bold">POST</span> https://api.devillabs.dev/v2/workflows/initialize</div>
            <div><span className="text-stone-500">Headers:</span> Authorization: Bearer DL_SEC_...</div>
            <div className="text-stone-400 mt-2">
              {"{"} <br/>
              &nbsp;&nbsp;&quot;workflowId&quot;: &quot;whatsapp_auto_reply&quot;,<br/>
              &nbsp;&nbsp;&quot;targetPayload&quot;: {"{ &quot;recipient&quot;: &quot;+918102099678&quot; }"} <br/>
              {"}"}
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER INTEGRATION STRATEGY */}
      <section className="clay-card p-6 md:p-8 text-center max-w-3xl mx-auto space-y-6">
        <div className="w-12 h-12 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100/60 mx-auto">
          <Mail size={18} />
        </div>
        <div className="space-y-2">
          <span className="text-violet-600 font-mono text-[10px] uppercase tracking-widest font-black block">✦ ELITE DISPATCH</span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-stone-850 uppercase tracking-tight">THE DEVIL TELEMETRY BRIEF</h2>
          <p className="text-stone-600 text-sm font-sans max-w-md mx-auto">
            Get technical insights, architectural blueprints, and new digital asset releases sent straight to your email. Unsolicited marketing is strictly filtered.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder="ENTER YOUR RESEARCH EMAIL..." 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow bg-stone-100/60 border border-stone-250/50 rounded-full px-5 py-3 text-stone-850 text-xs font-mono placeholder-stone-400 focus:outline-none focus:border-violet-300 shadow-inner"
            disabled={subscribed}
          />
          <button 
            type="submit" 
            disabled={subscribed}
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-[#faf8f5] text-xs font-mono font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2"
          >
            <span>{subscribed ? 'CONNECTED' : 'SUBSCRIBE'}</span>
            <CheckCircle size={14} className={subscribed ? 'text-emerald-400' : 'text-stone-400'} />
          </button>
        </form>

        {subscribed && (
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-emerald-600 font-bold tracking-widest uppercase"
          >
            Transmission initiated. Welcome to Devil Labs Brief.
          </motion.p>
        )}
      </section>

    </div>
  );
}

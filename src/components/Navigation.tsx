import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Terminal, Cpu, ShieldAlert, ArrowUpRight, Github, Linkedin, Instagram, Globe, Check, Phone, Mail, MessageCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import DevilLabsLogo from './DevilLabsLogo';
import { audioEngine } from '../lib/audio';

interface NavigationProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export default function Navigation({ currentPath, navigate }: NavigationProps) {
  const { currency, setCurrency } = useCurrency();

  const toggleCurrency = () => {
    setCurrency(currency === 'USD' ? 'INR' : 'USD');
  };
  const [isOpen, setIsOpen] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    "PROCESS: 01. CONSULT ➜ 02. WORK ON IDEA ➜ 03. INTERACTIVE DEMO ➜ 04. PRODUCTION DEPLOY",
    "SERVICES: AUTONOMOUS AI AGENTS • FULL-STACK SPRINT • ENTERPRISE DEVOPS • CLOUD SCALE",
    "LOCATION: GAYA & PATNA, BIHAR — DRIVING ELITE GLOBAL ENGINEERING STANDARDS",
    "CONTACT: DEVIL.LABS.CONTACT@GMAIL.COM • TEL/WA: +91 81020 99678",
    "OFFICIAL DOMAIN: WWW.DEVILLABS.DEV — #1 SOFTWARE AGENCY IN BIHAR"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { name: 'SERVICES', path: '/services', label: '01_SERVICES' },
    { name: 'WORK', path: '/work', label: '02_WORK' },
    { name: 'PROCESS', path: '/process', label: '03_PROCESS' },
    { name: 'INSIGHTS', path: '/insights', label: '04_INSIGHTS' },
    { name: 'ABOUT', path: '/about', label: '05_ABOUT' },
    { name: 'PRICING', path: '/pricing', label: '06_PRICING' },
    { name: 'CONTACT', path: '/contact', label: '07_CONTACT' },
  ];

  return (
    <>
      {/* 0. HIGH-CONVERTING TOP INFO BAR */}
      <div 
        id="header-top-bar" 
        className="fixed top-0 left-0 w-full h-[48px] md:h-12 bg-[#faf8f5]/90 backdrop-blur-xl border-b border-stone-200/40 z-[60] flex items-center justify-between px-4 sm:px-6 lg:px-8 text-xs tracking-widest font-bold text-stone-500 font-mono select-none"
      >
        {/* Left Side: Email & Tel */}
        <div className="flex items-center space-x-6">
          <a 
            href="mailto:devil.labs.contact@gmail.com?subject=Project%20Inquiry%20-%20Devil%20Labs" 
            className="hidden sm:flex items-center space-x-2 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <Mail size={12} className="text-violet-600" />
            <span className="hidden lg:inline">DEVIL.LABS.CONTACT@GMAIL.COM</span>
            <span className="lg:hidden">EMAIL US</span>
          </a>
          <a 
            href="https://wa.me/918102099678?text=Hi%20Devil%20Labs%2C%20I%20would%20like%20to%20consult%20on%20a%20project%20idea%21" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <MessageCircle size={12} className="text-[#128C7E] animate-pulse" />
            <span>WA: +91 81020 99678</span>
          </a>
        </div>

        {/* Center Side: Swiping Process Ticker */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-xl px-4 relative h-4 overflow-hidden text-center text-violet-600 text-xs">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-medium"
            >
              {slides[activeSlide]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Network Links & Instant Talk Badge */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-3 border-r border-stone-200 pr-4">
            <a href="https://github.com/Devil-Labs/" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors">
              <Github size={12} />
            </a>
            <a href="https://linkedin.com/company/devillabs" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors">
              <Linkedin size={12} />
            </a>
            <a href="https://instagram.com/devillabs" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors">
              <Instagram size={12} />
            </a>
          </div>
          <a 
            href="https://wa.me/918102099678?text=Hi%20Devil%20Labs%2C%20I%20would%20like%20to%20consult%20on%20a%20project%20idea%21" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 text-emerald-600 border border-emerald-200 bg-emerald-50 px-2.5 py-1 rounded-full hover:bg-emerald-100/60 hover:border-emerald-300 transition-all shadow-[0_2px_6px_rgba(16,185,129,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs tracking-widest font-black uppercase">TALK INSTANTLY</span>
          </a>
        </div>
      </div>

      <header id="site-header" className="fixed top-[48px] md:top-12 left-0 w-full z-50 pointer-events-none font-mono pt-2 sm:pt-3 md:pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onMouseEnter={() => audioEngine.playHover()}
          onClick={() => { audioEngine.playClick(); navigate('/'); setIsOpen(false); }}
          className="flex items-center space-x-2.5 group text-stone-800 font-bold tracking-tighter text-xl cursor-pointer clay-button px-4 py-2.5 sm:px-5 sm:py-3 rounded-full hover:border-violet-300/40 select-none"
        >
          <div className="relative flex items-center justify-center">
            <DevilLabsLogo className="w-5 h-5" glow />
          </div>
          <span className="font-display tracking-tight text-stone-800 text-xs sm:text-sm whitespace-nowrap group-hover:text-violet-600 transition-colors duration-300">DEVIL LABS</span>
        </button>

        {/* Desktop Nav - Floating Pill */}
        <nav id="desktop-nav" className="hidden md:flex items-center bg-[#fdfcf9]/95 backdrop-blur-xl border border-white/80 px-2 py-1.5 rounded-full shadow-[8px_10px_24px_rgba(185,175,160,0.08),-8px_-10px_24px_#ffffff,inset_3px_3px_6px_rgba(255,255,255,0.95)] relative">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                id={`nav-item-${item.name.toLowerCase()}`}
                key={item.path}
                onMouseEnter={() => audioEngine.playHover()}
                onClick={() => { audioEngine.playClick(); navigate(item.path); }}
                className={`relative px-5 py-2.5 text-xs font-bold cursor-pointer transition-all duration-300 tracking-widest rounded-full text-stone-500 hover:text-stone-900 active:scale-95 z-10`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-violet-50/60 border border-violet-100/50 rounded-full -z-10 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={isActive ? 'text-violet-600 font-extrabold' : ''}>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onMouseEnter={() => audioEngine.playHover()}
            onClick={() => { audioEngine.playClick(); toggleCurrency(); }}
            className="flex items-center justify-center w-11 h-11 clay-button rounded-full font-mono text-xs font-bold text-stone-500 hover:text-stone-900 hover:border-violet-300/40 cursor-pointer"
          >
            {currency}
          </button>
          <button
            id="nav-cta-btn"
            onMouseEnter={() => audioEngine.playHover()}
            onClick={() => { audioEngine.playClick(); window.dispatchEvent(new CustomEvent('open-initialize-modal')); }}
            className="group flex items-center space-x-2 clay-violet-solid px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest cursor-pointer"
          >
            <span>INITIALIZE</span>
            <ArrowUpRight size={14} className="text-white" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onMouseEnter={() => audioEngine.playHover()}
            onClick={() => { audioEngine.playClick(); toggleCurrency(); }}
            className="flex items-center justify-center w-12 h-12 bg-[#fcfbf9]/90 backdrop-blur-xl border border-stone-200/50 rounded-full font-mono text-xs font-bold text-stone-500 hover:text-stone-900 active:scale-95 transition-all cursor-pointer"
          >
            {currency}
          </button>
          <button
            id="mobile-menu-toggle"
            onMouseEnter={() => audioEngine.playHover()}
            onClick={() => { audioEngine.playClick(); setIsOpen(!isOpen); }}
            className="flex items-center justify-center w-12 h-12 bg-[#fcfbf9]/90 backdrop-blur-xl border border-stone-200/50 rounded-full text-stone-500 hover:text-stone-900 active:scale-95 transition-all focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-[#fcfbf9] border-b border-stone-200/40 absolute top-20 left-0 w-full px-6 py-8 flex flex-col space-y-6 pointer-events-auto shadow-xl"
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                id={`mobile-nav-item-${item.name.toLowerCase()}`}
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`text-left text-sm font-bold tracking-widest py-3 border-b border-stone-100 cursor-pointer flex items-center justify-between active:text-violet-600 active:pl-2 transition-all duration-200 ${isActive ? 'text-violet-600' : 'text-stone-500'}`}
              >
                <span>{isActive ? `// ${item.label}` : item.name}</span>
                <span className="text-xs text-stone-400">→</span>
              </button>
            );
          })}
          <button
            id="mobile-nav-cta-btn"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-initialize-modal'));
              setIsOpen(false);
            }}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-rose-500 text-white font-bold text-xs tracking-widest uppercase rounded-full hover:scale-102 active:scale-95 transition-all text-center flex items-center justify-center space-x-2"
          >
            <span>INITIALIZE PROJECT</span>
            <ArrowUpRight size={14} />
          </button>
        </motion.div>
      )}
    </header>
    </>
  );
}

export function Footer({ navigate }: { navigate: (path: string) => void }) {
  const [lang, setLang] = useState('EN');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('devil-labs-lang');
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('devil-labs-lang', newLang);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const languages = ['EN', 'FR', 'DE', 'JP'];

  return (
    <footer id="site-footer" className="bg-[#f5f4ef] border-t border-stone-200/60 pt-20 pb-12 px-4 sm:px-6 lg:px-8 font-mono relative z-10 overflow-hidden">
      
      {/* Newsletter & Links Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 mb-20 text-stone-500 text-xs">
        
        {/* Brand Info */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2.5 text-stone-800 font-bold tracking-tight text-sm">
            <DevilLabsLogo className="w-5 h-5" />
            <span>DEVIL LABS</span>
          </div>
          <p className="text-stone-600 max-w-xs leading-relaxed">
            AUTONOMOUS AI SYSTEMS & METICULOUS SOLUTIONS.<br/>
            BUILDING THE ARCHITECTURE OF TOMORROW.
          </p>
          <div className="flex items-center space-x-2 text-emerald-700 border border-emerald-200 bg-emerald-50 px-3 py-1.5 w-max rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs tracking-widest font-bold">SYSTEMS ONLINE</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-3 font-bold tracking-widest text-xs">
          <span className="text-stone-800 mb-2 font-display">INDEX</span>
          <button onClick={() => navigate('/services')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">SERVICES</button>
          <button onClick={() => navigate('/work')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">WORK</button>
          <button onClick={() => navigate('/process')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">PROCESS</button>
          <button onClick={() => navigate('/insights')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">INSIGHTS</button>
          <button onClick={() => navigate('/about')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">ABOUT</button>
          <button onClick={() => navigate('/pricing')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">PRICING</button>
          <button onClick={() => navigate('/contact')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">CONTACT</button>
        </div>

        {/* Legal */}
        <div className="flex flex-col space-y-3 font-bold tracking-widest text-xs">
          <span className="text-stone-800 mb-2 font-display">LEGAL</span>
          <button onClick={() => navigate('/legal/privacy')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">PRIVACY POLICY</button>
          <button onClick={() => navigate('/legal/terms')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">TERMS & REFUNDS</button>
          <button onClick={() => navigate('/legal/msa')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">MSA / NDA</button>
        </div>

        {/* Socials & Language */}
        <div className="flex flex-col space-y-3 font-bold tracking-widest text-xs">
          <span className="text-stone-800 mb-2 font-display">NETWORK</span>
          <a href="https://github.com/Devil-Labs/" target="_blank" rel="noreferrer" className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span className="flex items-center space-x-2">
              <Github size={12} className="text-stone-400 group-hover:text-violet-600 transition-colors" />
              <span>GITHUB</span>
            </span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://linkedin.com/company/devillabs" target="_blank" rel="noreferrer" className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span className="flex items-center space-x-2">
              <Linkedin size={12} className="text-stone-400 group-hover:text-violet-600 transition-colors" />
              <span>LINKEDIN</span>
            </span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://instagram.com/devillabs" target="_blank" rel="noreferrer" className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span className="flex items-center space-x-2">
              <Instagram size={12} className="text-stone-400 group-hover:text-violet-600 transition-colors" />
              <span>INSTAGRAM</span>
            </span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://vickyiitp.tech" target="_blank" rel="noreferrer" className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span className="flex items-center space-x-2">
              <Globe size={12} className="text-stone-400 group-hover:text-violet-600 transition-colors" />
              <span>FOUNDER SITE</span>
            </span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <div className="pt-4">
             <span className="text-stone-800 mb-2 block font-display">LOCALE</span>
             <div className="flex items-center space-x-3 text-xs tracking-widest font-bold">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangChange(l)}
                  className={`transition-colors duration-300 ${lang === l ? 'text-violet-600 border-b border-violet-600' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col space-y-3">
          <span className="text-stone-800 font-bold tracking-widest text-xs mb-2 font-display">NEWSLETTER</span>
          <p className="text-stone-600 text-xs mb-2">Join our mailing list for advanced design insights and tech developments.</p>
          <form onSubmit={handleSubscribe} className="relative flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="ENTER EMAIL ADDRESS" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#faf8f5] border border-stone-200/50 rounded-full px-4 py-3 text-stone-800 text-xs font-mono placeholder-stone-400 focus:outline-none focus:border-violet-300 shadow-inner w-full"
              disabled={subscribed}
            />
            <button 
              type="submit" 
              disabled={subscribed}
              className="bg-gradient-to-r from-violet-600 to-rose-500 hover:shadow-md hover:scale-101 text-white px-4 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-300 text-center uppercase"
            >
              {subscribed ? 'TRANSMISSION INITIALIZED' : 'INITIALIZE UPLINK'}
            </button>
          </form>
          {subscribed && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-emerald-600 font-bold tracking-widest uppercase flex items-center gap-1.5"
            >
              <Check size={12} />
              <span>Subscription confirmed</span>
            </motion.p>
          )}
        </div>

      </div>

      {/* Dynamic Topic Cluster and Internal Linking Grid */}
      <div className="max-w-7xl mx-auto border-t border-stone-200/40 pt-12 pb-8 mb-8 relative z-10 text-xs tracking-wider font-mono">
        <span className="text-stone-800 font-bold tracking-widest uppercase block mb-6 text-xs">// TOPIC CLUSTERS & SERVICE NODES</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-stone-500">
          {/* Services Cluster */}
          <div className="flex flex-col space-y-2">
            <span className="text-stone-700 font-bold mb-2 uppercase tracking-widest">Core Service Offerings</span>
            <button onClick={() => navigate('/services/ai-agents')} className="text-left hover:text-stone-900 transition-colors cursor-pointer">AUTONOMOUS AI AGENTS</button>
            <button onClick={() => navigate('/services/fullstack')} className="text-left hover:text-stone-900 transition-colors cursor-pointer">CUSTOM FULL-STACK WEB APPS</button>
            <button onClick={() => navigate('/services/ecommerce')} className="text-left hover:text-stone-900 transition-colors cursor-pointer">ENTERPRISE E-COMMERCE</button>
            <button onClick={() => navigate('/services/automation')} className="text-left hover:text-stone-900 transition-colors cursor-pointer">WORKFLOW AUTOMATION & CRMS</button>
            <button onClick={() => navigate('/services/vps')} className="text-left hover:text-stone-900 transition-colors cursor-pointer">VPS & CLOUD DEPLOYMENTS</button>
          </div>
          {/* Blog/Insights Cluster */}
          <div className="flex flex-col space-y-2">
            <span className="text-stone-700 font-bold mb-2 uppercase tracking-widest">Research & Lab Categories</span>
            <button onClick={() => navigate('/insights?id=1')} className="text-left hover:text-stone-900 transition-colors cursor-pointer">SYSTEM ARCHITECTURE (LATENCY LABS)</button>
            <button onClick={() => navigate('/insights?id=2')} className="text-left hover:text-stone-900 transition-colors cursor-pointer">AI SYSTEM GUARDRAILS</button>
            <button onClick={() => navigate('/insights?id=3')} className="text-left hover:text-stone-900 transition-colors cursor-pointer">REAL-TIME STATE STREAMING</button>
            <button onClick={() => navigate('/insights?id=4')} className="text-left hover:text-stone-900 transition-colors cursor-pointer">PROMPT HARDENING & CYBERSECURITY</button>
            <button onClick={() => navigate('/insights?id=5')} className="text-left hover:text-stone-900 transition-colors cursor-pointer">VIBE CODING & ARCHITECTURAL DIRECTION</button>
          </div>
          {/* Tech Stack Cluster */}
          <div className="flex flex-col space-y-2">
            <span className="text-stone-700 font-bold mb-2 uppercase tracking-widest">Technology Stacks</span>
            <span className="text-stone-500 hover:text-stone-900 transition-colors cursor-default">REACT 18 & NEXT.JS / VITE ENGINE</span>
            <span className="text-stone-500 hover:text-stone-900 transition-colors cursor-default">TYPESCRIPT & MODERN ES-NEXT</span>
            <span className="text-stone-500 hover:text-stone-900 transition-colors cursor-default">TAILWIND CSS & MOTION STYLING</span>
            <span className="text-stone-500 hover:text-stone-900 transition-colors cursor-default">NODE.JS & EXPRESS BACKENDS</span>
            <span className="text-stone-500 hover:text-stone-900 transition-colors cursor-default">GEMINI API / GOOGLE GENAI SDK</span>
            <span className="text-stone-500 hover:text-stone-900 transition-colors cursor-default">DOCKER CONTAINERIZATION & CLOUD RUN</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-stone-500 text-xs tracking-widest font-bold border-t border-stone-200/40 pt-8 mb-12 gap-4">
        <p>© {new Date().getFullYear()} DEVIL LABS. ALL RIGHTS RESERVED.</p>
        <p>SECURE TRANSMISSION ENDS</p>
      </div>

      {/* Massive Beautiful Soft Gradient Branding text */}
      <div className="w-full text-center relative z-0 pointer-events-none pb-4 pt-12 overflow-hidden flex justify-center">
        <h2 
          className="font-display text-[15vw] font-black tracking-tighter leading-none select-none whitespace-nowrap text-transparent"
          style={{ WebkitTextStroke: '1.5px rgba(124, 58, 237, 0.08)', textShadow: '4px 4px 10px rgba(0,0,0,0.01)' }}
        >
          DEVIL LABS
        </h2>
      </div>
    </footer>
  );
}

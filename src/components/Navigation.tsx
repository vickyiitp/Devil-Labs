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
        className="fixed top-0 left-0 w-full h-[48px] md:h-12 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 z-[60] flex items-center justify-between px-4 sm:px-6 lg:px-8 text-[10px] tracking-widest font-bold text-gray-400 font-mono select-none"
      >
        {/* Left Side: Email & Tel */}
        <div className="flex items-center space-x-6">
          <a 
            href="mailto:devil.labs.contact@gmail.com?subject=Project%20Inquiry%20-%20Devil%20Labs" 
            className="hidden sm:flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <Mail size={12} className="text-violet-500" />
            <span className="hidden lg:inline">DEVIL.LABS.CONTACT@GMAIL.COM</span>
            <span className="lg:hidden">EMAIL US</span>
          </a>
          <a 
            href="https://wa.me/918102099678?text=Hi%20Devil%20Labs%2C%20I%20would%20like%20to%20consult%20on%20a%20project%20idea%21" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <MessageCircle size={12} className="text-[#25D366] animate-pulse" />
            <span>WA: +91 81020 99678</span>
          </a>
        </div>

        {/* Center Side: Swiping Process Ticker */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-xl px-4 relative h-4 overflow-hidden text-center text-violet-400 text-[9px] lg:text-[10px]">
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
          <div className="hidden sm:flex items-center space-x-3 border-r border-white/10 pr-4">
            <a href="https://github.com/Devil-Labs/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Github size={12} />
            </a>
            <a href="https://linkedin.com/company/devil-labs" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Linkedin size={12} />
            </a>
            <a href="https://instagram.com/devil_labs" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Instagram size={12} />
            </a>
          </div>
          <a 
            href="https://wa.me/918102099678?text=Hi%20Devil%20Labs%2C%20I%20would%20like%20to%20consult%20on%20a%20project%20idea%21" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 rounded-full hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] tracking-widest font-black uppercase">TALK INSTANTLY</span>
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
          className="flex items-center space-x-2.5 group text-white font-bold tracking-tighter text-xl cursor-pointer bg-[#050505]/80 backdrop-blur-xl border border-white/10 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-2xl hover:border-violet-500 transition-all duration-300 select-none"
        >
          <div className="relative flex items-center justify-center">
            <DevilLabsLogo className="w-5 h-5" glow />
          </div>
          <span className="font-display tracking-tight text-white text-xs sm:text-sm whitespace-nowrap group-hover:text-violet-400 transition-colors duration-300">DEVIL LABS</span>
        </button>

        {/* Desktop Nav - Floating Pill */}
        <nav id="desktop-nav" className="hidden md:flex items-center bg-[#050505]/80 backdrop-blur-xl border border-white/10 px-2 py-1 rounded-full shadow-2xl relative">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                id={`nav-item-${item.name.toLowerCase()}`}
                key={item.path}
                onMouseEnter={() => audioEngine.playHover()}
                onClick={() => { audioEngine.playClick(); navigate(item.path); }}
                className={`relative px-5 py-2 text-[10px] font-bold cursor-pointer transition-all duration-300 tracking-widest rounded-full text-gray-400 hover:text-white z-10`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white/10 border border-white/5 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={isActive ? 'text-violet-400' : ''}>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onMouseEnter={() => audioEngine.playHover()}
            onClick={() => { audioEngine.playClick(); toggleCurrency(); }}
            className="flex items-center justify-center w-10 h-10 bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-full font-mono text-[10px] font-bold text-gray-400 hover:text-white hover:border-violet-500 transition-all cursor-pointer shadow-2xl"
          >
            {currency}
          </button>
          <button
            id="nav-cta-btn"
            onMouseEnter={() => audioEngine.playHover()}
            onClick={() => { audioEngine.playClick(); navigate('/contact'); }}
            className="group flex items-center space-x-2 bg-white text-black px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] cursor-pointer"
          >
            <span>INITIALIZE</span>
            <ArrowUpRight size={14} className="group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onMouseEnter={() => audioEngine.playHover()}
            onClick={() => { audioEngine.playClick(); toggleCurrency(); }}
            className="flex items-center justify-center w-12 h-12 bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-full font-mono text-xs font-bold text-gray-400 hover:text-white hover:border-violet-500 transition-all cursor-pointer"
          >
            {currency}
          </button>
          <button
            id="mobile-menu-toggle"
            onMouseEnter={() => audioEngine.playHover()}
            onClick={() => { audioEngine.playClick(); setIsOpen(!isOpen); }}
            className="flex items-center justify-center w-12 h-12 bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-white/30 transition-all focus:outline-none cursor-pointer"
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
          className="md:hidden bg-[#050505] border-b border-white/5 absolute top-20 left-0 w-full px-6 py-8 flex flex-col space-y-6 pointer-events-auto"
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
                className={`text-left text-sm font-bold tracking-widest py-3 border-b border-white/5 cursor-pointer flex items-center justify-between ${isActive ? 'text-violet-400' : 'text-gray-400'}`}
              >
                <span>{isActive ? `// ${item.label}` : item.name}</span>
                <span className="text-xs text-gray-600">→</span>
              </button>
            );
          })}
          <button
            id="mobile-nav-cta-btn"
            onClick={() => {
              navigate('/contact');
              setIsOpen(false);
            }}
            className="w-full py-4 bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-violet-600 hover:text-white transition-all text-center flex items-center justify-center space-x-2"
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
    <footer id="site-footer" className="bg-[#050505] border-t border-white/5 pt-20 pb-12 px-4 sm:px-6 lg:px-8 font-mono relative z-10 overflow-hidden">
      
      {/* Newsletter & Links Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 mb-20 text-gray-500 text-xs">
        
        {/* Brand Info */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold tracking-tight text-sm">
            <span className="text-red-500">Δ</span>
            <span>DEVIL LABS</span>
          </div>
          <p className="text-gray-600 max-w-xs leading-relaxed">
            AUTONOMOUS AI SYSTEMS & METICULOUS INFRASTRUCTURE.<br/>
            BUILDING THE ARCHITECTURE OF TOMORROW.
          </p>
          <div className="flex items-center space-x-2 text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 w-max">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] tracking-widest font-bold">SYSTEMS ONLINE</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-3 font-bold tracking-widest text-[10px]">
          <span className="text-white mb-2">INDEX</span>
          <button onClick={() => navigate('/services')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">SERVICES</button>
          <button onClick={() => navigate('/work')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">WORK</button>
          <button onClick={() => navigate('/process')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">PROCESS</button>
          <button onClick={() => navigate('/insights')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">INSIGHTS</button>
          <button onClick={() => navigate('/about')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">ABOUT</button>
          <button onClick={() => navigate('/pricing')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">PRICING</button>
          <button onClick={() => navigate('/contact')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">CONTACT</button>
        </div>

        {/* Legal */}
        <div className="flex flex-col space-y-3 font-bold tracking-widest text-[10px]">
          <span className="text-white mb-2">LEGAL</span>
          <button onClick={() => navigate('/legal/privacy')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">PRIVACY POLICY</button>
          <button onClick={() => navigate('/legal/terms')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">TERMS & REFUNDS</button>
          <button onClick={() => navigate('/legal/msa')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">MSA / NDA</button>
        </div>

        {/* Socials & Language */}
        <div className="flex flex-col space-y-3 font-bold tracking-widest text-[10px]">
          <span className="text-white mb-2">NETWORK</span>
          <a href="https://github.com/Devil-Labs/" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span className="flex items-center space-x-2">
              <Github size={12} className="text-gray-500 group-hover:text-violet-400 transition-colors" />
              <span>GITHUB</span>
            </span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://linkedin.com/company/devil-labs" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span className="flex items-center space-x-2">
              <Linkedin size={12} className="text-gray-500 group-hover:text-violet-400 transition-colors" />
              <span>LINKEDIN</span>
            </span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://instagram.com/devil_labs" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span className="flex items-center space-x-2">
              <Instagram size={12} className="text-gray-500 group-hover:text-violet-400 transition-colors" />
              <span>INSTAGRAM</span>
            </span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://vickyiitp.tech" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span className="flex items-center space-x-2">
              <Globe size={12} className="text-gray-500 group-hover:text-violet-400 transition-colors" />
              <span>FOUNDER: VICKYIITP.TECH</span>
            </span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <div className="pt-6">
             <span className="text-white mb-3 block">LOCALE</span>
             <div className="flex items-center space-x-3 text-[10px] tracking-widest font-bold">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangChange(l)}
                  className={`transition-colors duration-300 ${lang === l ? 'text-white border-b border-white' : 'text-gray-700 hover:text-gray-400'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col space-y-3">
          <span className="text-white font-bold tracking-widest text-[10px] mb-2">DEVIL LABS INTEL</span>
          <p className="text-gray-600 text-xs mb-2">Join our encrypted transmission for advanced system logs and AI developments.</p>
          <form onSubmit={handleSubscribe} className="relative flex flex-col space-y-2">
            <input 
              type="email" 
              placeholder="ENTER EMAIL ADDRESS" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border border-white/10 px-4 py-3 text-white text-xs font-mono placeholder-gray-700 focus:outline-none focus:border-violet-500 transition-colors w-full"
              disabled={subscribed}
            />
            <button 
              type="submit" 
              disabled={subscribed}
              className="bg-white/5 hover:bg-violet-600 disabled:bg-emerald-950/20 disabled:border-emerald-500/20 border border-white/10 hover:border-violet-500 text-white px-4 py-3 text-[10px] font-bold tracking-widest transition-all duration-300 text-center uppercase"
            >
              {subscribed ? 'TRANSMISSION INITIALIZED' : 'INITIALIZE UPLINK'}
            </button>
          </form>
          {subscribed && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase flex items-center gap-1.5"
            >
              <Check size={12} />
              <span>Subscription confirmed</span>
            </motion.p>
          )}
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-700 text-[10px] tracking-widest font-bold border-t border-white/5 pt-8 mb-12 gap-4">
        <p>© {new Date().getFullYear()} DEVIL LABS. ALL RIGHTS RESERVED.</p>
        <p>SECURE TRANSMISSION ENDS</p>
      </div>

      {/* Massive Brutalist Footer Graphic with Glitch */}
      <div className="w-full text-center relative z-0 pointer-events-none pb-4 pt-12 overflow-hidden flex justify-center">
        <h2 
          data-text="DEVIL LABS"
          className="font-display text-[15vw] font-black tracking-tighter leading-none select-none whitespace-nowrap text-transparent glitch"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}
        >
          DEVIL LABS
        </h2>
      </div>
    </footer>
  );
}

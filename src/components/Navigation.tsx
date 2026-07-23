import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Terminal, Cpu, ShieldAlert, ArrowUpRight, Github, Linkedin, Instagram, Globe, Check, Phone, Mail, MessageCircle } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import DevilLabsLogo from './DevilLabsLogo';
import { audioEngine } from '../lib/audio';
import Magnetic from './Magnetic';
import FooterOrbitalCTA from './FooterOrbitalCTA';

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

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY < 15) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        // scrolling down - hide header
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // scrolling up - show header
        setVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'SERVICES', path: '/services', label: '01 Services' },
    { name: 'PRODUCTS', path: '/products', label: '02 Products' },
    { name: 'SOLUTIONS', path: '/solutions', label: '03 Solutions' },
    { name: 'PROJECTS', path: '/projects', label: '04 Projects' },
    { name: 'RESOURCES', path: '/resources', label: '05 Resources' },
    { name: 'COMPANY', path: '/company', label: '06 Company' },
    { name: 'CONTACT', path: '/contact', label: '07 Contact' },
  ];

  return (
    <>
      {/* 0. HIGH-CONVERTING TOP INFO BAR */}
      <div 
        id="header-top-bar" 
        className="fixed top-0 left-0 w-full h-[48px] md:h-12 bg-[#faf8f5]/90 backdrop-blur-xl border-b border-stone-200/40 z-[60] flex items-center justify-between px-4 sm:px-6 lg:px-8 text-xs tracking-widest font-bold text-stone-500 font-sans select-none transition-transform duration-500 ease-in-out"
        style={{
          transform: scrolled ? 'translateY(-100%)' : 'translateY(0)'
        }}
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

      <header 
        id="site-header" 
        className="fixed left-0 w-full z-50 pointer-events-none font-sans transition-all duration-500 ease-in-out pt-2 sm:pt-3 md:pt-4"
        style={{
          top: scrolled ? '0px' : '48px',
          transform: visible ? 'translateY(0)' : 'translateY(-120%)'
        }}
      >
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
          <Magnetic range={50} strength={0.3}>
            <button
              onMouseEnter={() => audioEngine.playHover()}
              onClick={() => { audioEngine.playClick(); toggleCurrency(); }}
              className="flex items-center justify-center w-11 h-11 clay-button rounded-full font-sans text-xs font-bold text-stone-500 hover:text-stone-900 hover:border-violet-300/40 cursor-pointer"
            >
              {currency}
            </button>
          </Magnetic>
          <Magnetic range={60} strength={0.4}>
            <button
              id="nav-cta-btn"
              onMouseEnter={() => audioEngine.playHover()}
              onClick={() => { audioEngine.playClick(); window.dispatchEvent(new CustomEvent('open-initialize-modal')); }}
              className="group flex items-center space-x-2 clay-violet-solid px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest cursor-pointer"
            >
              <span>INITIALIZE</span>
              <ArrowUpRight size={14} className="text-white" />
            </button>
          </Magnetic>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onMouseEnter={() => audioEngine.playHover()}
            onClick={() => { audioEngine.playClick(); toggleCurrency(); }}
            className="flex items-center justify-center w-12 h-12 bg-[#fcfbf9]/90 backdrop-blur-xl border border-stone-200/50 rounded-full font-sans text-xs font-bold text-stone-500 hover:text-stone-900 active:scale-95 transition-all cursor-pointer"
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
                <span>{isActive ? `✦ ${item.label}` : item.name}</span>
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

  const footerBrandingRef = useRef<HTMLDivElement>(null);
  const [footerMouse, setFooterMouse] = useState({ x: 50, y: 50 });
  const [isFooterHovered, setIsFooterHovered] = useState(false);
  const [clickedLetters, setClickedLetters] = useState<number[]>([]);

  const handleFooterMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!footerBrandingRef.current) return;
    const rect = footerBrandingRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setFooterMouse({ x, y });
  };

  const handleLetterClick = (index: number) => {
    audioEngine.playClick();
    if (clickedLetters.includes(index)) {
      setClickedLetters(clickedLetters.filter(i => i !== index));
    } else {
      setClickedLetters([...clickedLetters, index]);
    }
  };

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
    <footer id="site-footer" className="bg-[#f5f4ef] border-t border-stone-200/60 pt-20 pb-12 px-4 sm:px-6 lg:px-8 font-sans relative z-10 overflow-hidden">
      {/* Subtle low-opacity background noise texture for brand consistency */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-noise z-0" />
      
      {/* Newsletter & Links Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-12 relative z-10 mb-20 text-stone-500 text-xs">
        
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
            <span className="text-xs tracking-widest font-black">ACTIVE</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-3 font-bold tracking-widest text-xs">
          <span className="text-stone-800 mb-2 font-display">INDEX</span>
          <button onClick={() => navigate('/services')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">SERVICES</button>
          <button onClick={() => navigate('/products')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">PRODUCTS</button>
          <button onClick={() => navigate('/solutions')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">SOLUTIONS</button>
          <button onClick={() => navigate('/projects')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">PROJECTS</button>
          <button onClick={() => navigate('/resources')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">RESOURCES</button>
          <button onClick={() => navigate('/company')} className="text-left hover:text-violet-600 hover:pl-2 transition-all duration-300">COMPANY</button>
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
              className="bg-[#faf8f5] border border-stone-200/50 rounded-full px-4 py-3 text-stone-800 text-xs font-sans placeholder-stone-400 focus:outline-none focus:border-violet-300 shadow-inner w-full font-bold"
              disabled={subscribed}
            />
            <button 
              type="submit" 
              disabled={subscribed}
              className="bg-gradient-to-r from-violet-600 to-rose-500 hover:shadow-md hover:scale-101 text-white px-4 py-3 rounded-full text-xs font-black tracking-widest transition-all duration-300 text-center uppercase"
            >
              {subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
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
      <div className="max-w-7xl mx-auto border-t border-stone-200/40 pt-12 pb-8 mb-8 relative z-10 text-xs tracking-wider font-sans font-extrabold">
        <span className="text-stone-800 font-black tracking-widest uppercase block mb-6 text-xs">✦ TOPIC CLUSTERS & SERVICE NODES</span>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 text-stone-500">
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

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-stone-500 text-xs tracking-widest font-black border-t border-stone-200/40 pt-8 mb-8 gap-4">
        <p>© {new Date().getFullYear()} DEVIL LABS. ALL RIGHTS RESERVED.</p>
        <p>HIGH-FIDELITY DESIGN &amp; DEVELOPMENT</p>
      </div>

      {/* Redesigned Premium Interactive Footer Branding Section */}
      <div 
        ref={footerBrandingRef}
        onMouseMove={handleFooterMouseMove}
        onMouseEnter={() => setIsFooterHovered(true)}
        onMouseLeave={() => {
          setIsFooterHovered(false);
          setClickedLetters([]); // reset Easter egg on mouse leave for replayability
        }}
        className="w-full relative z-10 pb-8 pt-12 overflow-hidden flex flex-col items-center justify-center border border-stone-200/35 bg-[#FAF9F5]/90 rounded-[24px] sm:rounded-[32px] shadow-[inset_0_2px_12px_rgba(45,38,32,0.02),0_15px_35px_rgba(45,38,32,0.03)] cursor-crosshair group/branding transition-all duration-300"
      >
        {/* Subtle high-tech blueprint grid */}
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none bg-[linear-gradient(to_right,rgba(139,92,246,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Laser scanner effect */}
        <motion.div 
          className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-violet-500/20 to-transparent pointer-events-none"
          animate={{ left: ["0%", "100%", "0%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Dynamic ambient spotlight glow following mouse */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 blur-3xl opacity-0 group-hover/branding:opacity-100"
          style={{
            background: `radial-gradient(circle 200px at ${footerMouse.x}% ${footerMouse.y}%, rgba(139, 92, 246, 0.08), rgba(236, 72, 153, 0.05), transparent 70%)`
          }}
        />

        {/* Technical Data Annotations / Framing borders */}
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center px-6 text-[9px] sm:text-[10px] text-stone-400 font-sans tracking-widest uppercase pointer-events-none relative z-10 mb-2 font-black">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span>DEVIL LABS</span>
          </div>
          <div className="hidden md:block text-stone-300">✦ ARTISANAL DESIGN &amp; CODE ✦</div>
          <div>OFFICIAL VERSION</div>
        </div>

        {/* Giant Typography Sculpting Container */}
        <div className="flex flex-wrap justify-center items-center select-none relative z-10 font-display font-black tracking-tighter text-[7.5vw] xs:text-[8.5vw] sm:text-[9.5vw] lg:text-[10.5vw] leading-none py-6 transition-all duration-300 max-w-full px-2 overflow-hidden gap-x-[2.5vw] gap-y-2">
          {/* Word 1: DEVIL */}
          <div className="flex items-center whitespace-nowrap">
            {"DEVIL".split("").map((char, index) => {
              const isClicked = clickedLetters.includes(index);
              return (
                <motion.span
                  key={`devil-${index}`}
                  onClick={() => handleLetterClick(index)}
                  className="inline-block relative cursor-pointer font-black select-none px-0.5"
                  style={{
                    WebkitTextStroke: isClicked 
                      ? '2.5px rgb(139, 92, 246)' 
                      : '1.5px rgba(124, 58, 237, 0.15)',
                    textShadow: isClicked 
                      ? '0 10px 25px rgba(139, 92, 246, 0.35)' 
                      : '1px 1px 5px rgba(0,0,0,0.01)',
                    color: isClicked ? '#7c3aed' : 'transparent',
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 15,
                    delay: index * 0.03,
                  }}
                  whileHover={{
                    scale: 1.15,
                    y: -10,
                    color: "#7c3aed",
                    WebkitTextStroke: '2.5px #ec4899',
                    textShadow: '0 15px 35px rgba(139, 92, 246, 0.45), 0 0 15px rgba(236, 72, 153, 0.2)',
                  }}
                >
                  {char}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-[3px] bg-stone-900/5 rounded-full blur-[2px] opacity-0 group-hover/branding:opacity-100 transition-opacity pointer-events-none scale-x-50" />
                </motion.span>
              );
            })}
          </div>

          {/* Word 2: LABS */}
          <div className="flex items-center whitespace-nowrap">
            {"LABS".split("").map((char, index) => {
              const letterIndex = index + 6;
              const isClicked = clickedLetters.includes(letterIndex);
              return (
                <motion.span
                  key={`labs-${index}`}
                  onClick={() => handleLetterClick(letterIndex)}
                  className="inline-block relative cursor-pointer font-black select-none px-0.5"
                  style={{
                    WebkitTextStroke: isClicked 
                      ? '2.5px rgb(139, 92, 246)' 
                      : '1.5px rgba(124, 58, 237, 0.15)',
                    textShadow: isClicked 
                      ? '0 10px 25px rgba(139, 92, 246, 0.35)' 
                      : '1px 1px 5px rgba(0,0,0,0.01)',
                    color: isClicked ? '#7c3aed' : 'transparent',
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 15,
                    delay: letterIndex * 0.03,
                  }}
                  whileHover={{
                    scale: 1.15,
                    y: -10,
                    color: "#7c3aed",
                    WebkitTextStroke: '2.5px #ec4899',
                    textShadow: '0 15px 35px rgba(139, 92, 246, 0.45), 0 0 15px rgba(236, 72, 153, 0.2)',
                  }}
                >
                  {char}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-[3px] bg-stone-900/5 rounded-full blur-[2px] opacity-0 group-hover/branding:opacity-100 transition-opacity pointer-events-none scale-x-50" />
                </motion.span>
              );
            })}
          </div>
        </div>

        {/* Interactive hints / Easter Egg message */}
        <div className="relative z-10 h-8 flex items-center justify-center font-sans text-[9px] sm:text-xs tracking-widest text-center px-4 font-extrabold">
          <AnimatePresence mode="wait">
            {clickedLetters.length === 9 ? (
              <motion.button
                key="unlocked"
                onClick={() => {
                  navigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="text-white font-bold bg-gradient-to-r from-violet-600 to-rose-500 hover:scale-105 active:scale-95 px-5 py-2 rounded-full shadow-lg border border-violet-400/20 flex items-center space-x-2 cursor-pointer transition-transform duration-200"
              >
                <span>✦ UNLOCKED • CONTACT FOUNDERS ➜ ✦</span>
              </motion.button>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="text-stone-400 group-hover/branding:text-violet-600 group-hover/branding:opacity-100 transition-all duration-300 font-black uppercase text-[10px] sm:text-xs text-center break-words px-4 w-full max-w-full"
              >
                {clickedLetters.length > 0 
                  ? `Harmonics: ${clickedLetters.length}/9 segments activated` 
                  : "✦ Hover to illuminate • Select all letters to reveal direct contact ✦"
                }
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Small detail: Bottom diagnostic values */}
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center px-6 text-[8px] sm:text-[9px] text-stone-300 font-sans tracking-widest uppercase pointer-events-none mt-4 relative z-10 font-bold">
          <div>Optimized</div>
          <div className="flex items-center space-x-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

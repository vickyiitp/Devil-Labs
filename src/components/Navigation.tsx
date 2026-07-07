import { motion } from 'motion/react';
import { Menu, X, Terminal, Cpu, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import TelemetryVisualizer from './TelemetryVisualizer';
import LaboratoryHum from './LaboratoryHum';

interface NavigationProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export default function Navigation({ currentPath, navigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'HOME', path: '/', label: '01_HOME' },
    { name: 'SERVICES', path: '/services', label: '02_SERVICES' },
    { name: 'PROCESS', path: '/process', label: '03_PROCESS' },
    { name: 'INSIGHTS', path: '/insights', label: '04_INSIGHTS' },
    { name: 'PRICING', path: '/pricing', label: '05_PRICING' },
    { name: 'CONTACT', path: '/contact', label: '06_CONTACT' },
  ];

  return (
    <header id="site-header" className="fixed top-[48px] md:top-12 left-0 w-full z-50 pointer-events-none font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => { navigate('/'); setIsOpen(false); }}
          className="flex items-center space-x-3 group text-white font-bold tracking-tighter text-xl cursor-pointer bg-[#050505]/80 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full shadow-2xl hover:border-violet-500 transition-all duration-300"
        >
          <div className="relative flex items-center justify-center">
            <span className="text-red-500 font-extrabold text-lg group-hover:text-violet-400 transition-colors duration-300">Δ</span>
          </div>
          <span className="font-display tracking-tight text-white text-sm group-hover:text-violet-400 transition-colors duration-300">DEVIL LABS</span>
        </button>

        {/* Desktop Nav - Floating Pill */}
        <nav id="desktop-nav" className="hidden md:flex items-center bg-[#050505]/80 backdrop-blur-xl border border-white/10 px-2 py-1 rounded-full shadow-2xl">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                id={`nav-item-${item.name.toLowerCase()}`}
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative px-5 py-2 text-[10px] font-bold cursor-pointer transition-all duration-300 tracking-widest rounded-full ${isActive ? 'bg-white/10 text-violet-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <button
            id="nav-cta-btn"
            onClick={() => navigate('/contact')}
            className="group flex items-center space-x-2 bg-white text-black px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          >
            <span>INITIALIZE</span>
            <ArrowUpRight size={14} className="group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
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
          className="md:hidden bg-[#050505] border-b border-white/5 absolute top-20 left-0 w-full px-6 py-8 flex flex-col space-y-6"
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
  );
}

export function Footer({ navigate }: { navigate: (path: string) => void }) {
  const [lang, setLang] = useState('EN');
  const [email, setEmail] = useState('');

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
      alert(`Subscribed ${email} to DEVIL LABS Intel.`);
      setEmail('');
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
          <button onClick={() => navigate('/')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">HOME</button>
          <button onClick={() => navigate('/services')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">SERVICES</button>
          <button onClick={() => navigate('/process')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">PROCESS</button>
          <button onClick={() => navigate('/insights')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">INSIGHTS</button>
          <button onClick={() => navigate('/pricing')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">PRICING</button>
          <button onClick={() => navigate('/contact')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">CONTACT</button>
        </div>

        {/* Socials & Language */}
        <div className="flex flex-col space-y-3 font-bold tracking-widest text-[10px]">
          <span className="text-white mb-2">NETWORK</span>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span>X / TWITTER</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span>GITHUB</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span>LINKEDIN</span>
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
            />
            <button type="submit" className="bg-white/5 hover:bg-violet-600 border border-white/10 hover:border-violet-500 text-white px-4 py-3 text-[10px] font-bold tracking-widest transition-all duration-300 text-center uppercase">
              INITIALIZE UPLINK
            </button>
          </form>
        </div>

      </div>

      {/* Telemetry Visualizer */}
      <div className="max-w-3xl mx-auto mb-16 relative z-10">
        <TelemetryVisualizer />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-700 text-[10px] tracking-widest font-bold border-t border-white/5 pt-8 mb-12 gap-4">
        <p>© {new Date().getFullYear()} DEVIL LABS. ALL RIGHTS RESERVED.</p>
        <LaboratoryHum />
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

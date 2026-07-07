import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, ArrowRight, X, Layout, Zap, Cpu, Server, FileText, Phone } from 'lucide-react';
import { serviceCategories } from '../data/services';

interface CommandPaletteProps {
  navigate: (path: string) => void;
}

export default function CommandPalette({ navigate }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const serviceItems = serviceCategories.flatMap(cat => 
    cat.items.map(item => ({
      title: item.title,
      path: `/services/${item.slug}`,
      icon: item.icon,
      category: 'Services'
    }))
  );

  const items = [
    { title: 'Home', path: '/', icon: Layout, category: 'Pages' },
    { title: 'Services Overview', path: '/services', icon: Zap, category: 'Pages' },
    { title: 'Methodology & Process', path: '/process', icon: Server, category: 'Pages' },
    { title: 'Lab Notes & Insights', path: '/insights', icon: FileText, category: 'Pages' },
    { title: 'Pricing & Estimates', path: '/pricing', icon: FileText, category: 'Pages' },
    { title: 'Contact Us', path: '/contact', icon: Phone, category: 'Pages' },
    ...serviceItems
  ];

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (isOpen) {
        if (e.key === 'Escape') {
          setIsOpen(false);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleSelect(filteredItems[selectedIndex].path);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            
            <div className="fixed inset-0 z-[201] flex items-start justify-center pt-[20vh] pointer-events-none px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[60vh]"
              >
                {/* Header / Search Input */}
                <div className="flex items-center px-4 py-4 border-b border-white/10 text-white">
                  <Search size={20} className="text-gray-400 mr-3" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search documentation, services, or tools..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-grow bg-transparent border-none outline-none text-lg font-light placeholder-gray-600 focus:ring-0"
                  />
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                    <Command size={12} />
                    <span>K</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="ml-4 text-gray-500 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* Results List */}
                <div className="overflow-y-auto p-2 flex-grow scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {filteredItems.length > 0 ? (
                    <div className="space-y-1 py-2">
                      {['Pages', 'Services'].map(category => {
                        const catItems = filteredItems.filter(i => i.category === category);
                        if (catItems.length === 0) return null;
                        
                        return (
                          <div key={category} className="mb-4 last:mb-0">
                            <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-violet-400">
                              {category}
                            </div>
                            {catItems.map((item, idx) => {
                              const globalIndex = filteredItems.indexOf(item);
                              const isSelected = globalIndex === selectedIndex;
                              const Icon = item.icon;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleSelect(item.path)}
                                  onMouseEnter={() => setSelectedIndex(globalIndex)}
                                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors group text-left ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-gray-400 group-hover:text-violet-400'}`}>
                                      <Icon size={14} />
                                    </div>
                                    <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>{item.title}</span>
                                  </div>
                                  <ArrowRight size={14} className={`transition-all transform ${isSelected ? 'text-white opacity-100 translate-x-0' : 'text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white'}`} />
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-12 text-center text-gray-500 space-y-4">
                      <Search size={32} className="mx-auto opacity-50" />
                      <p className="text-sm font-mono uppercase tracking-widest">No matching records found.</p>
                    </div>
                  )}
                </div>
                
                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/5 bg-black/50 text-[10px] font-mono text-gray-500 flex justify-between">
                  <span>DEVIL LABS // OS</span>
                  <div className="flex space-x-4">
                    <span><kbd className="font-sans px-1 py-0.5 bg-white/10 rounded">↑</kbd> <kbd className="font-sans px-1 py-0.5 bg-white/10 rounded">↓</kbd> Navigate</span>
                    <span><kbd className="font-sans px-1 py-0.5 bg-white/10 rounded">↵</kbd> Select</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

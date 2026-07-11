import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Command, ArrowRight, X, Layout, Zap, Cpu, Server, 
  FileText, Phone, Terminal, BrainCircuit, Sparkles, HelpCircle 
} from 'lucide-react';

interface CommandPaletteProps {
  navigate: (path: string) => void;
}

interface SearchRecord {
  title: string;
  path: string;
  category: 'Pages' | 'Services' | 'Projects' | 'Insights';
  description: string;
  tags: string[];
}

const getIconForRecord = (category: string, pathStr: string) => {
  if (category === 'Pages') {
    if (pathStr === '/') return Layout;
    if (pathStr === '/services') return Zap;
    if (pathStr === '/process') return Server;
    if (pathStr === '/insights') return FileText;
    if (pathStr === '/pricing') return Sparkles;
    if (pathStr === '/contact') return Phone;
    return Layout;
  }
  if (category === 'Services') {
    if (pathStr.includes('agent')) return Cpu;
    if (pathStr.includes('automation')) return Cpu;
    if (pathStr.includes('hosting') || pathStr.includes('vps') || pathStr.includes('apps')) return Server;
    return Zap;
  }
  if (category === 'Projects') {
    return Terminal;
  }
  if (category === 'Insights') {
    return BrainCircuit;
  }
  return HelpCircle;
};

export default function CommandPalette({ navigate }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [records, setRecords] = useState<SearchRecord[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/search.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load search index');
        return res.json();
      })
      .then(data => {
        setRecords(data);
      })
      .catch(err => {
        console.error('Failed to load search index:', err);
      });
  }, []);

  const filteredItems = records.filter(item => {
    const q = query.toLowerCase().trim();
    if (!q) return true; // Show everything if query is empty (allows browsing)
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some(tag => tag.toLowerCase().includes(q))
    );
  });

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

  const categoriesOrder: ('Pages' | 'Services' | 'Projects' | 'Insights')[] = [
    'Pages', 'Services', 'Projects', 'Insights'
  ];

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
                      {categoriesOrder.map(category => {
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
                              const Icon = getIconForRecord(item.category, item.path);
                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleSelect(item.path)}
                                  onMouseEnter={() => setSelectedIndex(globalIndex)}
                                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors group text-left ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                >
                                  <div className="flex items-center space-x-3 flex-grow min-w-0">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-gray-400 group-hover:text-violet-400'}`}>
                                      <Icon size={14} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                      <span className={`text-sm font-medium truncate transition-colors ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                                        {item.title}
                                      </span>
                                      {item.description && (
                                        <span className="text-[11px] text-gray-500 truncate mt-0.5 max-w-full font-light font-sans group-hover:text-gray-400">
                                          {item.description}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <ArrowRight size={14} className={`shrink-0 transition-all transform ${isSelected ? 'text-white opacity-100 translate-x-0' : 'text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white'}`} />
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

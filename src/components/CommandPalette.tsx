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
              className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm z-[200]"
            />
            
            <div className="fixed inset-0 z-[201] flex items-start justify-center pt-[20vh] pointer-events-none px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-2xl bg-[#faf8f5] border border-stone-200/50 shadow-2xl rounded-3xl overflow-hidden pointer-events-auto flex flex-col max-h-[60vh] clay-card text-stone-800"
              >
                {/* Header / Search Input */}
                <div className="flex items-center px-5 py-4 border-b border-stone-200/30 text-stone-800 bg-white">
                  <Search size={20} className="text-stone-400 mr-3" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search documentation, services, or tools..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-grow bg-transparent border-none outline-none text-base font-medium placeholder-stone-400 focus:ring-0 text-stone-850"
                  />
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-stone-400 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200/30">
                    <Command size={11} />
                    <span>K</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="ml-4 text-stone-400 hover:text-stone-800 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* Results List */}
                <div className="overflow-y-auto p-3 flex-grow scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent">
                  {filteredItems.length > 0 ? (
                    <div className="space-y-1 py-1">
                      {categoriesOrder.map(category => {
                        const catItems = filteredItems.filter(i => i.category === category);
                        if (catItems.length === 0) return null;
                        
                        return (
                          <div key={category} className="mb-4 last:mb-0">
                            <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-violet-600">
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
                                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-colors group text-left ${isSelected ? 'bg-stone-100' : 'hover:bg-stone-50/50'}`}
                                >
                                  <div className="flex items-center space-x-3.5 flex-grow min-w-0">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'bg-violet-100 text-violet-600' : 'bg-stone-100 text-stone-400 group-hover:text-violet-600'}`}>
                                      <Icon size={14} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                      <span className={`text-sm font-bold truncate transition-colors ${isSelected ? 'text-stone-850' : 'text-stone-700 group-hover:text-stone-850'}`}>
                                        {item.title}
                                      </span>
                                      {item.description && (
                                        <span className="text-[11px] text-stone-400 truncate mt-0.5 max-w-full font-light font-sans group-hover:text-stone-500">
                                          {item.description}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <ArrowRight size={14} className={`shrink-0 transition-all transform ${isSelected ? 'text-stone-800 opacity-100 translate-x-0' : 'text-stone-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-stone-800'}`} />
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-12 text-center text-stone-400 space-y-4">
                      <Search size={32} className="mx-auto opacity-50" />
                      <p className="text-sm font-mono uppercase tracking-widest">No matching records found.</p>
                    </div>
                  )}
                </div>
                
                {/* Footer */}
                <div className="px-5 py-3 border-t border-stone-200/20 bg-stone-50 text-[10px] font-mono text-stone-400 flex justify-between">
                  <span>DEVIL LABS // OS</span>
                  <div className="flex space-x-4">
                    <span><kbd className="font-sans px-1 py-0.5 bg-stone-200/40 border border-stone-200/50 rounded">↑</kbd> <kbd className="font-sans px-1 py-0.5 bg-stone-200/40 border border-stone-200/50 rounded">↓</kbd> Navigate</span>
                    <span><kbd className="font-sans px-1 py-0.5 bg-stone-200/40 border border-stone-200/50 rounded">↵</kbd> Select</span>
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

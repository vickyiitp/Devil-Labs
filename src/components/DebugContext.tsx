import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Bug } from 'lucide-react';

interface DebugContextType {
  isDebugMode: boolean;
  toggleDebugMode: () => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export function DebugProvider({ children }: { children: ReactNode }) {
  const [isDebugMode, setIsDebugMode] = useState(false);

  return (
    <DebugContext.Provider value={{ isDebugMode, toggleDebugMode: () => setIsDebugMode(!isDebugMode) }}>
      <div className={isDebugMode ? 'debug-mode-active' : ''}>
        {children}
      </div>
      
      {/* Debug Mode Toggle Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsDebugMode(!isDebugMode)}
        className={`fixed bottom-24 right-6 z-50 p-3 rounded-full border font-mono text-[10px] flex items-center space-x-2 transition-all shadow-lg ${
          isDebugMode 
            ? 'bg-violet-900/50 border-violet-500 text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] backdrop-blur-md' 
            : 'bg-black/50 border-white/10 text-gray-500 hover:text-white backdrop-blur-md hover:border-white/20'
        }`}
      >
        <Bug size={16} />
        {isDebugMode && <span className="uppercase tracking-widest hidden sm:inline-block font-bold">Debug ON</span>}
      </motion.button>
    </DebugContext.Provider>
  );
}

export function useDebugMode() {
  const context = useContext(DebugContext);
  if (context === undefined) {
    throw new Error('useDebugMode must be used within a DebugProvider');
  }
  return context;
}

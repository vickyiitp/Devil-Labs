import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DebugContextType {
  isDebugMode: boolean;
  toggleDebugMode: () => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export function DebugProvider({ children }: { children: ReactNode }) {
  const [isDebugMode] = useState(false);

  return (
    <DebugContext.Provider value={{ isDebugMode, toggleDebugMode: () => {} }}>
      <div className="">
        {children}
      </div>
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

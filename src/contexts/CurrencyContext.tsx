import React, { createContext, useContext, useState, useEffect } from 'react';

type CurrencyContextType = {
  currency: 'USD' | 'INR';
  setCurrency: (c: 'USD' | 'INR') => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  useEffect(() => {
    // Try to auto-detect based on timezone if not set in local storage
    const stored = localStorage.getItem('devil-labs-currency');
    if (stored === 'USD' || stored === 'INR') {
      setCurrency(stored);
    } else {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz.toLowerCase().includes('kolkata') || tz.toLowerCase().includes('calcutta') || tz.toLowerCase().includes('asia/calcutta') || tz.toLowerCase().includes('asia/kolkata') || tz.toLowerCase().includes('india')) {
          setCurrency('INR');
        }
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  const handleSetCurrency = (c: 'USD' | 'INR') => {
    setCurrency(c);
    localStorage.setItem('devil-labs-currency', c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

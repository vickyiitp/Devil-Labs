const fs = require('fs');
const file = 'src/components/Navigation.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add import
content = content.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect } from 'react';\nimport { useCurrency } from '../contexts/CurrencyContext';");

// Inside Navigation component
content = content.replace("export default function Navigation({ currentPath, navigate }: NavigationProps) {", "export default function Navigation({ currentPath, navigate }: NavigationProps) {\n  const { currency, setCurrency } = useCurrency();\n\n  const toggleCurrency = () => {\n    setCurrency(currency === 'USD' ? 'INR' : 'USD');\n  };");

// Add Desktop toggle button
const desktopCtaStr = `<div className="hidden md:flex items-center">`;
const desktopToggleStr = `<div className="hidden md:flex items-center space-x-3">
          <button
            onClick={toggleCurrency}
            className="flex items-center justify-center w-10 h-10 bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-full font-mono text-[10px] font-bold text-gray-400 hover:text-white hover:border-violet-500 transition-all cursor-pointer shadow-2xl"
          >
            {currency}
          </button>`;

content = content.replace(desktopCtaStr, desktopToggleStr);

// Add Mobile toggle button
const mobileMenuButtonStr = `<div className="md:hidden flex items-center">`;
const mobileToggleStr = `<div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleCurrency}
            className="flex items-center justify-center w-12 h-12 bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-full font-mono text-xs font-bold text-gray-400 hover:text-white hover:border-violet-500 transition-all cursor-pointer"
          >
            {currency}
          </button>`;
          
content = content.replace(mobileMenuButtonStr, mobileToggleStr);

fs.writeFileSync(file, content);
console.log("Updated Navigation.tsx");

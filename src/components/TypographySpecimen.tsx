import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Type, Sliders, Code2, Copy, Check, RotateCcw, Play, BookOpen, Layers } from 'lucide-react';

interface TypeTier {
  id: string;
  name: string;
  className: string;
  font: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  desc: string;
  example: string;
  responsiveRange: string;
}

const typeTiers: TypeTier[] = [
  {
    id: 'hero',
    name: 'Hero Display',
    className: 'text-hero-display',
    font: 'Syne / Space Grotesk',
    weight: '800 (Black)',
    lineHeight: '0.92',
    letterSpacing: '-0.04em',
    desc: 'High-impact editorial titles. Optimized for landing page hero headers and full-screen displays.',
    example: 'GOVERN COMPLEXITY',
    responsiveRange: 'clamp(2.2rem, 6.5vw, 4.8rem)',
  },
  {
    id: 'display-lg',
    name: 'Display Large',
    className: 'text-display-large',
    font: 'Syne / Space Grotesk',
    weight: '800 (Extra Bold)',
    lineHeight: '1.02',
    letterSpacing: '-0.035em',
    desc: 'Commanding section-level headers that divide major interactive blocks with visual weight.',
    example: 'EDITORIAL SPECIFICATION',
    responsiveRange: 'clamp(1.8rem, 4.5vw, 3.2rem)',
  },
  {
    id: 'display-md',
    name: 'Display Medium',
    className: 'text-display-medium',
    font: 'Syne / Space Grotesk',
    weight: '700 (Bold)',
    lineHeight: '1.12',
    letterSpacing: '-0.025em',
    desc: 'Bespoke card headers, modal titles, and nested container labels.',
    example: 'CURATED DISCIPLINES',
    responsiveRange: 'clamp(1.4rem, 3.5vw, 2.2rem)',
  },
  {
    id: 'editorial-body',
    name: 'Editorial Body',
    className: 'text-editorial-body',
    font: 'Lora (Serif)',
    weight: '400 (Regular)',
    lineHeight: '1.70',
    letterSpacing: '-0.01em',
    desc: 'Luxurious narrative text designed for comfortable reading of details, case studies, and blogs.',
    example: 'Founded by elite engineers from IIT Patna, Devil Labs injects academic rigors, sophisticated data structures, and highly optimized computer science principles directly into commercial web platforms.',
    responsiveRange: 'clamp(0.95rem, 1.8vw, 1.15rem)',
  },
  {
    id: 'body-std',
    name: 'Body Standard',
    className: 'text-body-standard',
    font: 'Inter (Sans-serif)',
    weight: '400 (Regular)',
    lineHeight: '1.60',
    letterSpacing: '-0.015em',
    desc: 'Crisp, high-contrast, versatile text for interactive control panels, lists, and metadata keys.',
    example: 'Our full-stack solutions are engineered with extreme speed and rigid security in mind. We deploy encapsulated microservices behind active load balancers.',
    responsiveRange: 'clamp(0.85rem, 1.5vw, 1rem)',
  },
  {
    id: 'mono',
    name: 'Technical Mono',
    className: 'text-technical-mono',
    font: 'JetBrains Mono',
    weight: '500 (Medium)',
    lineHeight: '1.45',
    letterSpacing: '-0.02em',
    desc: 'Designed for code samples, numbers, performance latency metrics, and database status logs.',
    example: 'const client = new DevilCore({ apiVersion: "2026-07" });',
    responsiveRange: 'clamp(0.75rem, 1.3vw, 0.9rem)',
  },
  {
    id: 'metadata',
    name: 'Metadata Label',
    className: 'text-metadata-label',
    font: 'Inter (Sans-serif)',
    weight: '900 (Black / All-caps)',
    lineHeight: '1.10',
    letterSpacing: '0.25em',
    desc: 'Widely tracked uppercase badges, navigation trails, sub-labels, and micro-diagnostics.',
    example: 'SERVICES // DESIGN SYSTEM READY',
    responsiveRange: 'clamp(0.6rem, 1vw, 0.75rem)',
  },
];

export default function TypographySpecimen() {
  const [selectedTier, setSelectedTier] = useState<TypeTier>(typeTiers[0]);
  const [customText, setCustomText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'preview' | 'playground'>('preview');

  // Interactive playground states
  const [pgFontSize, setPgFontSize] = useState<number>(36);
  const [pgLineHeight, setPgLineHeight] = useState<number>(1.2);
  const [pgLetterSpacing, setPgLetterSpacing] = useState<number>(-0.03);
  const [pgFontWeight, setPgFontWeight] = useState<string>('800');
  const [pgFontFamily, setPgFontFamily] = useState<string>('var(--font-display)');
  const [copied, setCopied] = useState<boolean>(false);

  const resetPlayground = () => {
    setPgFontSize(36);
    setPgLineHeight(1.1);
    setPgLetterSpacing(-0.03);
    setPgFontWeight('800');
    setPgFontFamily('var(--font-display)');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#faf9f5] border-t border-b border-stone-200/50 relative overflow-hidden">
      {/* Editorial Watermark Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#2d262006_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />
      <div className="absolute top-0 left-12 w-px h-full bg-gradient-to-b from-stone-200/30 via-transparent to-stone-200/30 pointer-events-none hidden md:block" />
      <div className="absolute top-0 right-12 w-px h-full bg-gradient-to-b from-stone-200/30 via-transparent to-stone-200/30 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Title and Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/50">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="text-violet-600 text-metadata-label flex items-center space-x-1.5">
              <Type size={12} className="text-violet-500" />
              <span>TYPOGRAPHY SYSTEM SPEC</span>
            </span>
            <h2 className="text-display-large text-stone-900 font-extrabold uppercase leading-none">
              Unified Type Specimen
            </h2>
            <p className="text-body-standard text-stone-500 max-w-xl">
              An elegant, mathematical font scale tuned with editorial weights, precise tracking ratios, and fluid line heights for balanced digital hierarchies.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex p-1 bg-[#f0ede6]/80 rounded-2xl border border-stone-200/40">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'preview' 
                  ? 'bg-white text-stone-900 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <BookOpen size={12} />
              <span>Scale Blueprint</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('playground');
                setCustomText('');
              }}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'playground' 
                  ? 'bg-white text-stone-900 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Sliders size={12} />
              <span>Interactive Sandbox</span>
            </button>
          </div>
        </div>

        {/* 1. SCALE BLUEPRINT VIEW */}
        {activeTab === 'preview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* List of Tiers */}
            <div className="lg:col-span-5 space-y-3">
              {typeTiers.map((tier) => {
                const isSelected = selectedTier.id === tier.id;
                return (
                  <motion.button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full text-left p-4 rounded-2xl transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-white border-2 border-violet-500/20 shadow-md relative' 
                        : 'bg-stone-100/50 hover:bg-stone-100/80 border border-stone-200/40'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute right-4 top-4 w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-metadata-label text-violet-600 font-black">
                        {tier.id.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {tier.font.split(' ')[0]}
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="font-display font-extrabold text-lg text-stone-800 tracking-tight">
                        {tier.name}
                      </span>
                      <span className="text-[9px] font-mono text-stone-500 font-bold">
                        LH: {tier.lineHeight} / TS: {tier.letterSpacing}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Specimen Showcase Frame */}
            <div className="lg:col-span-7 space-y-6">
              <div className="clay-card p-6 md:p-8 bg-white border border-stone-200/40 rounded-3xl shadow-sm flex flex-col justify-between relative min-h-[460px]">
                
                {/* Visual grid markings for editorial alignment */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-stone-300" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-stone-300" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-stone-300" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-stone-300" />

                {/* Spec metadata block */}
                <div className="flex flex-wrap items-center justify-between pb-6 border-b border-stone-200/50 text-left">
                  <div className="space-y-0.5">
                    <span className="text-[8px] text-stone-400 font-mono uppercase tracking-widest font-bold">FONT ARCHITECTURE</span>
                    <h4 className="font-display font-bold text-lg text-stone-850 uppercase tracking-tight">{selectedTier.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[9px] font-mono mt-2 sm:mt-0">
                    <span className="bg-stone-100 px-2.5 py-1 rounded border border-stone-200/40 text-stone-600 uppercase">
                      Family: {selectedTier.font}
                    </span>
                    <span className="bg-stone-100 px-2.5 py-1 rounded border border-stone-200/40 text-stone-600 uppercase">
                      Weight: {selectedTier.weight}
                    </span>
                  </div>
                </div>

                {/* Main Render Zone */}
                <div className="py-12 flex items-center justify-center min-h-[220px] text-center px-4 bg-stone-50/50 rounded-2xl border border-stone-200/30 my-4 overflow-hidden">
                  <div className="w-full">
                    <div className={`${selectedTier.className} text-stone-900 transition-all duration-300`}>
                      {selectedTier.example}
                    </div>
                  </div>
                </div>

                {/* Implementation metadata and code helper */}
                <div className="pt-6 border-t border-stone-200/50 space-y-4 text-left">
                  <div className="space-y-1">
                    <span className="text-[8px] text-stone-400 font-mono uppercase tracking-widest font-bold block">EDITORIAL DIRECTIVES</span>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-light">
                      {selectedTier.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 text-[10px] font-mono">
                    <div className="space-y-1">
                      <span className="text-[8px] text-stone-400 font-sans tracking-widest uppercase font-black block">RESPONSIVE BOUNDARY</span>
                      <span className="bg-stone-100/80 px-2 py-1 rounded border border-stone-200/30 text-stone-700 block text-center uppercase">
                        {selectedTier.responsiveRange}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[8px] text-stone-400 font-sans tracking-widest uppercase font-black block">UTILITY CALLOUT</span>
                      <button 
                        onClick={() => copyToClipboard(selectedTier.className)}
                        className="w-full bg-stone-100 hover:bg-stone-200/70 px-2 py-1 rounded border border-stone-200/30 text-stone-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer uppercase font-bold"
                      >
                        {copied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                        <span className="truncate">{selectedTier.className}</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* 2. INTERACTIVE SANDBOX PLAYGROUND */}
        {activeTab === 'playground' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Control Panel */}
            <div className="lg:col-span-4 clay-card p-6 md:p-8 bg-white border border-stone-200/40 rounded-3xl shadow-sm space-y-6 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200/50">
                <div className="flex items-center space-x-2">
                  <Sliders size={14} className="text-violet-500" />
                  <h4 className="font-display font-bold text-sm text-stone-800 uppercase tracking-wide">SANDBOX CONTROLS</h4>
                </div>
                <button 
                  onClick={resetPlayground}
                  className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                  title="Reset Controls"
                >
                  <RotateCcw size={13} />
                </button>
              </div>

              {/* Font Family Selection */}
              <div className="space-y-2">
                <span className="text-[8px] text-stone-400 font-sans tracking-widest uppercase font-black block">EDITORIAL VOICE</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Syne (Display)', val: 'var(--font-display)' },
                    { label: 'Lora (Serif)', val: 'var(--font-serif)' },
                    { label: 'Inter (Sans)', val: 'var(--font-sans)' },
                  ].map((f) => (
                    <button
                      key={f.val}
                      onClick={() => setPgFontFamily(f.val)}
                      className={`px-2 py-2 text-[9px] font-bold rounded-lg border text-center transition-all cursor-pointer uppercase ${
                        pgFontFamily === f.val 
                          ? 'bg-stone-900 text-white-force border-stone-950' 
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Weight */}
              <div className="space-y-2">
                <span className="text-[8px] text-stone-400 font-sans tracking-widest uppercase font-black block">WEIGHT STABILISER</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { label: 'Light', val: '300' },
                    { label: 'Regular', val: '400' },
                    { label: 'Bold', val: '700' },
                    { label: 'Black', val: '900' },
                  ].map((w) => (
                    <button
                      key={w.val}
                      onClick={() => setPgFontWeight(w.val)}
                      className={`px-1.5 py-1.5 text-[9px] font-bold rounded-lg border text-center transition-all cursor-pointer uppercase ${
                        pgFontWeight === w.val 
                          ? 'bg-stone-900 text-white-force border-stone-950' 
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[8px] text-stone-400 font-mono">
                  <span className="font-sans tracking-widest uppercase font-black">FONT SIZE</span>
                  <span>{pgFontSize}px</span>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max="72" 
                  value={pgFontSize}
                  onChange={(e) => setPgFontSize(Number(e.target.value))}
                  className="w-full accent-violet-600 h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Line Height Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[8px] text-stone-400 font-mono">
                  <span className="font-sans tracking-widest uppercase font-black">LINE HEIGHT</span>
                  <span>{pgLineHeight.toFixed(2)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.8" 
                  max="2.0" 
                  step="0.05"
                  value={pgLineHeight}
                  onChange={(e) => setPgLineHeight(Number(e.target.value))}
                  className="w-full accent-violet-600 h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Letter Spacing Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[8px] text-stone-400 font-mono">
                  <span className="font-sans tracking-widest uppercase font-black">LETTER SPACING (TRACKING)</span>
                  <span>{pgLetterSpacing > 0 ? '+' : ''}{pgLetterSpacing.toFixed(3)}em</span>
                </div>
                <input 
                  type="range" 
                  min="-0.08" 
                  max="0.3" 
                  step="0.005"
                  value={pgLetterSpacing}
                  onChange={(e) => setPgLetterSpacing(Number(e.target.value))}
                  className="w-full accent-violet-600 h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Input for testing */}
              <div className="space-y-2 pt-2">
                <span className="text-[8px] text-stone-400 font-sans tracking-widest uppercase font-black block">TEST YOUR TEXT</span>
                <input
                  type="text"
                  maxLength={100}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="TYPE TO SEE RESULTS..."
                  className="w-full px-3.5 py-2.5 text-stone-850 font-mono text-[10px] focus:outline-none focus:border-violet-300 transition-all rounded-xl bg-stone-50 border border-stone-200 uppercase placeholder-stone-400"
                />
              </div>

            </div>

            {/* Live Sandbox Canvas */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              <div className="clay-card p-6 md:p-8 bg-stone-900 border-stone-950 text-white-force rounded-3xl shadow-xl flex flex-col justify-between relative min-h-[440px] flex-grow">
                
                {/* Visual grid markings */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/20" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/20" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/20" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/20" />

                {/* Spec metadata */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 text-left">
                  <div className="space-y-0.5">
                    <span className="text-[8px] text-violet-400 font-mono uppercase tracking-widest font-black">LIVE EXPERIMENTATION PLATFORM</span>
                    <h4 className="font-display font-black text-xs text-white uppercase tracking-tight">Active Canvas Sandbox</h4>
                  </div>
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>

                {/* Text render panel */}
                <div className="py-12 flex items-center justify-center flex-grow overflow-hidden text-center min-h-[200px]">
                  <div 
                    style={{
                      fontFamily: pgFontFamily,
                      fontWeight: pgFontWeight,
                      fontSize: `${pgFontSize}px`,
                      lineHeight: pgLineHeight,
                      letterSpacing: `${pgLetterSpacing}em`,
                    }}
                    className="w-full break-words transition-all duration-150 text-white-force"
                  >
                    {customText || 'DEVIL LABS DESIGN SYSTEM'}
                  </div>
                </div>

                {/* Generated Code Output */}
                <div className="pt-4 border-t border-white/10 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] text-stone-400 font-mono uppercase tracking-widest font-bold block">TAILWIND / INLINE SPEC CODE</span>
                    <button
                      onClick={() => copyToClipboard(`style={{ fontFamily: "${pgFontFamily}", fontWeight: "${pgFontWeight}", fontSize: "${pgFontSize}px", lineHeight: ${pgLineHeight}, letterSpacing: "${pgLetterSpacing}em" }}`)}
                      className="text-[9px] font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                      <span>Copy React Style Props</span>
                    </button>
                  </div>
                  
                  <div className="bg-black/40 border border-white/5 rounded-xl p-3 font-mono text-[9px] text-stone-300 overflow-x-auto select-all max-w-full">
                    {`// Editorial Output Code\n`}
                    <span className="text-emerald-400">{`<div`}</span>
                    {` style={{`}
                    <span className="text-violet-300">{` fontFamily: "${pgFontFamily}", fontWeight: "${pgFontWeight}", fontSize: "${pgFontSize}px", lineHeight: ${pgLineHeight}, letterSpacing: "${pgLetterSpacing}em"`}</span>
                    {` }}>`}
                    <span className="text-white-force">{customText || 'DEVIL LABS DESIGN SYSTEM'}</span>
                    <span className="text-emerald-400">{`</div>`}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

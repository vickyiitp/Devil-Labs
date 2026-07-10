const fs = require('fs');
const file = 'src/pages/PricingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const tableCode = `      {/* FEATURE COMPARISON TABLE */}
      <section id="pricing-comparison" className="mb-32 overflow-x-auto">
        <div className="mb-10 text-center">
          <span className="text-violet-500 font-mono text-xs uppercase tracking-widest font-semibold">// CAPABILITY MATRIX</span>
          <h2 className="font-display font-extrabold text-3xl text-white tracking-tighter uppercase mt-2">Compare Architectures</h2>
        </div>
        <div className="min-w-[800px] border border-white/5 bg-black/40">
          <div className="grid grid-cols-4 border-b border-white/5 bg-white/5">
            <div className="p-6 font-mono text-xs text-gray-500 uppercase tracking-widest font-bold flex items-end">Feature Set</div>
            <div className="p-6 font-display text-lg text-white font-bold text-center">MVP Build<br/><span className="text-sm font-mono text-gray-500 font-normal">{isIndia ? '₹7,500' : '$199'}</span></div>
            <div className="p-6 font-display text-lg text-white font-bold text-center border-x border-white/5 bg-violet-950/20">Full-Stack + AI<br/><span className="text-sm font-mono text-violet-400 font-normal">{isIndia ? '₹15,000' : '$499'}</span></div>
            <div className="p-6 font-display text-lg text-white font-bold text-center">Enterprise<br/><span className="text-sm font-mono text-gray-500 font-normal">{isIndia ? '₹35,000+' : '$1,000+'}</span></div>
          </div>
          
          {[
            { name: 'Pages / Views', starter: '3-4 Pages', pro: 'Up to 10 Pages', enterprise: 'Unlimited / Dynamic' },
            { name: 'Mobile Responsive', starter: true, pro: true, enterprise: true },
            { name: 'SEO & Speed', starter: 'Basic Setup', pro: 'Optimized / Caching', enterprise: 'Advanced + Analytics' },
            { name: 'CMS Access', starter: false, pro: true, enterprise: 'Custom Backend' },
            { name: 'User Authentication', starter: false, pro: true, enterprise: 'SSO / Complex Auth' },
            { name: 'Payments / E-Commerce', starter: false, pro: false, enterprise: 'Custom Gateway' },
            { name: 'AI Integration', starter: false, pro: false, enterprise: 'Gemini / OpenAI Agents' },
            { name: 'Support SLA', starter: '14-day production', pro: '30-day dedicated', enterprise: 'Infinite Priority' }
          ].map((row, idx) => (
            <div key={idx} className="grid grid-cols-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <div className="p-4 px-6 font-mono text-xs text-gray-300">{row.name}</div>
              <div className="p-4 px-6 flex justify-center items-center text-sm font-sans text-gray-400">
                {typeof row.starter === 'boolean' ? (row.starter ? <Check size={16} className="text-emerald-500" /> : <span className="text-gray-600">-</span>) : row.starter}
              </div>
              <div className="p-4 px-6 flex justify-center items-center text-sm font-sans text-white border-x border-white/5 bg-violet-950/10">
                {typeof row.pro === 'boolean' ? (row.pro ? <Check size={16} className="text-violet-500" /> : <span className="text-gray-600">-</span>) : row.pro}
              </div>
              <div className="p-4 px-6 flex justify-center items-center text-sm font-sans text-gray-400">
                {typeof row.enterprise === 'boolean' ? (row.enterprise ? <Check size={16} className="text-emerald-500" /> : <span className="text-gray-600">-</span>) : row.enterprise}
              </div>
            </div>
          ))}
        </div>
      </section>

`;

content = content.replace(/      \{\/\* NEW: INTERACTIVE ESTIMATION TOOL \*\/\}/, tableCode + '      {/* NEW: INTERACTIVE ESTIMATION TOOL */}');

fs.writeFileSync(file, content);

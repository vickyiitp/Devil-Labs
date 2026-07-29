const fs = require('fs');
let code = fs.readFileSync('src/components/Navigation.tsx', 'utf-8');

// We want to remove the top bar div completely
const topBarRegex = /\{\/\* 0\. HIGH-CONVERTING TOP INFO BAR \*\/\}[\s\S]*?(?=<header)/;
code = code.replace(topBarRegex, '');

// We want to remove top: scrolled ? '0px' : '48px',
code = code.replace(/top: scrolled \? '0px' : '48px',/g, 'top: 0,');

// We want to add the TALK INSTANTLY button before the INITIALIZE button
const ctaRegex = /(<div className="hidden xl:flex items-center space-x-3">)(\s*<Magnetic)/;
const talkButton = `$1
          <a 
            href="https://wa.me/918102099678?text=Hi%20Devil%20Labs%2C%20I%20would%20like%20to%20consult%20on%20a%20project%20idea%21" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 text-emerald-950 border border-emerald-300 bg-emerald-100 px-3 py-1 rounded-full hover:bg-emerald-200 hover:border-emerald-400 transition-all shadow-[0_2px_6px_rgba(16,185,129,0.1)] shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[10px] sm:text-xs tracking-wider font-black uppercase text-emerald-950 whitespace-nowrap">TALK INSTANTLY</span>
          </a>$2`;
code = code.replace(ctaRegex, talkButton);

fs.writeFileSync('src/components/Navigation.tsx', code);

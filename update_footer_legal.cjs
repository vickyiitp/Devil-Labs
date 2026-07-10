const fs = require('fs');
const file = 'src/components/Navigation.tsx';
let content = fs.readFileSync(file, 'utf8');

const socialSection = `<span className="text-white mb-2">NETWORK</span>`;
const legalSection = `<div className="flex flex-col space-y-3 font-bold tracking-widest text-[10px] pt-6 border-t border-white/5">
          <span className="text-white mb-2">LEGAL</span>
          <button onClick={() => navigate('/legal/privacy')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">PRIVACY POLICY</button>
          <button onClick={() => navigate('/legal/terms')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">TERMS & REFUNDS</button>
          <button onClick={() => navigate('/legal/msa')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">MSA / NDA</button>
        </div>`;

if (!content.includes('PRIVACY POLICY')) {
  // Let's replace the <div className="pt-6"> LOCALE </div> with the LEGAL links, or put it next to it.
  // Actually, we can just insert it in the INDEX column.
  
  const indexSection = `<button onClick={() => navigate('/contact')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">CONTACT</button>`;
  
  content = content.replace(indexSection, indexSection + '\\n          ' + legalSection);
}

fs.writeFileSync(file, content);
console.log('Added Legal links to footer');

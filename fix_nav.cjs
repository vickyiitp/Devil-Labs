const fs = require('fs');

let content = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

const oldNavItems = `  const navItems = [
    { name: 'HOME', path: '/', label: '01_HOME' },
    { name: 'SERVICES', path: '/services', label: '02_SERVICES' },
    { name: 'PROCESS', path: '/process', label: '03_PROCESS' },
    { name: 'WORK', path: '/work', label: '04_WORK' },
    { name: 'INSIGHTS', path: '/insights', label: '05_INSIGHTS' },
    { name: 'PRICING', path: '/pricing', label: '06_PRICING' },
    { name: 'CONTACT', path: '/contact', label: '07_CONTACT' },
  ];`;

const newNavItems = `  const navItems = [
    { name: 'HOME', path: '/', label: '01_HOME' },
    { name: 'SERVICES', path: '/services', label: '02_SERVICES' },
    { name: 'WORK', path: '/work', label: '03_WORK' },
    { name: 'ABOUT', path: '/about', label: '04_ABOUT' },
    { name: 'PRICING', path: '/pricing', label: '05_PRICING' },
    { name: 'CONTACT', path: '/contact', label: '06_CONTACT' },
  ];`;

content = content.replace(oldNavItems, newNavItems);

const oldFooterNav = `<button onClick={() => navigate('/services')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">SERVICES</button>
          <button onClick={() => navigate('/process')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">PROCESS</button>
          <button onClick={() => navigate('/insights')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">INSIGHTS</button>
          <button onClick={() => navigate('/work')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">WORK</button>
          <button onClick={() => navigate('/pricing')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">PRICING</button>
          <button onClick={() => navigate('/contact')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">CONTACT</button>`;

const newFooterNav = `<button onClick={() => navigate('/services')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">SERVICES</button>
          <button onClick={() => navigate('/work')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">WORK</button>
          <button onClick={() => navigate('/about')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">ABOUT</button>
          <button onClick={() => navigate('/pricing')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">PRICING</button>
          <button onClick={() => navigate('/contact')} className="text-left hover:text-white hover:pl-2 transition-all duration-300">CONTACT</button>`;

content = content.replace(oldFooterNav, newFooterNav);

const oldSocials = `          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span>X / TWITTER</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span>GITHUB</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span>LINKEDIN</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>`;

const newSocials = `          <a href="https://instagram.com/devil_labs" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span>INSTAGRAM</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://linkedin.com/company/devil-labs" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span>LINKEDIN</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://vickyiitp.tech" target="_blank" rel="noreferrer" className="text-left hover:text-violet-400 hover:pl-2 transition-all duration-300 flex items-center justify-between group">
            <span>VICKYIITP.TECH</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>`;

content = content.replace(oldSocials, newSocials);

fs.writeFileSync('src/components/Navigation.tsx', content);
console.log('Fixed Navigation');

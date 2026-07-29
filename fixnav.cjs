const fs = require('fs');
let content = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

const regex = /className="fixed left-0 w-full z-50 pointer-events-none font-sans transition-all duration-500 ease-in-out pt-2 sm:pt-3 md:pt-4"/g;
const replacement = 'className="fixed left-0 w-full z-50 pointer-events-none font-sans transition-all duration-500 ease-in-out pt-2"';

content = content.replace(regex, replacement);

fs.writeFileSync('src/components/Navigation.tsx', content);

const fs = require('fs');
let content = fs.readFileSync('src/pages/LandingPage.tsx', 'utf8');

const regex = /<img src="https:\/\/github\.com\/vickyiitp\.png\?size=80"[\s\S]*?VK[\s\S]*?<\/div>/m;
const replacement = `<img src="https://github.com/vickyiitp.png?size=80" alt="Vicky Kumar" className="flex-shrink-0 w-10 h-10 rounded-full shadow-md border border-stone-800 object-cover" />`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/pages/LandingPage.tsx', content);

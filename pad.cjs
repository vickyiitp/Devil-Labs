const fs = require('fs');
let content = fs.readFileSync('src/pages/LandingPage.tsx', 'utf8');

const regex = /className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4 md:px-8"/g;
const replacement = 'className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start px-4 md:px-8"';

content = content.replace(regex, replacement);

fs.writeFileSync('src/pages/LandingPage.tsx', content);

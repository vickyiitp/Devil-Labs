const fs = require('fs');
let content = fs.readFileSync('src/pages/LandingPage.tsx', 'utf8');

const regex = / className="lg:col-span-5 w-full max-w-xl mx-auto relative z-10"/g;
const replacement = ' className="lg:col-span-5 w-full max-w-xl mx-auto relative z-10 lg:self-start lg:mt-6"';

content = content.replace(regex, replacement);

fs.writeFileSync('src/pages/LandingPage.tsx', content);

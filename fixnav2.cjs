const fs = require('fs');
let content = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

const regex = /<span className={\`text-xs \${isActive \? 'text-amber-300' : 'text-stone-400'}\`}>\s*{item.label.split\(' '\)\[0\]} →\s*<\/span>/gm;
const replacement = '';

content = content.replace(regex, replacement);

fs.writeFileSync('src/components/Navigation.tsx', content);

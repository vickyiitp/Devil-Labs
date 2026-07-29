const fs = require('fs');
let content = fs.readFileSync('src/components/Navigation.tsx', 'utf8');

const regex = /<span className="text-xs.*?>\s*{item\.label\.split\(' '\)\[0\]} →\s*<\/span>/m;
const replacement = '';

let newContent = content.replace(new RegExp(regex.source, 'gm'), replacement);

fs.writeFileSync('src/components/Navigation.tsx', newContent);

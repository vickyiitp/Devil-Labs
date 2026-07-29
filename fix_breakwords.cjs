const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = fs.readdirSync('src/pages').map(f => path.join('src/pages', f)).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/ break-words max-w-full/g, '');
  content = content.replace(/break-words max-w-full/g, '');
  fs.writeFileSync(file, content);
}

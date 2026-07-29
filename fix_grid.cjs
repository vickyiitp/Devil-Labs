const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('src/pages').map(f => path.join('src/pages', f)).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/ max-w-sm md:max-w-2xl xl:max-w-none mx-auto/g, ' w-full mx-auto');
  content = content.replace(/ max-w-sm md:max-w-2xl mx-auto/g, ' w-full mx-auto');
  content = content.replace(/ max-w-sm md:max-w-3xl xl:max-w-none mx-auto/g, ' w-full mx-auto');
  fs.writeFileSync(file, content);
}

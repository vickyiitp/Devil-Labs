const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('src/pages').map(f => path.join('src/pages', f)).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/pt-20 xs:pt-24 sm:pt-28 lg:pt-32/g, 'pt-16 sm:pt-20 lg:pt-24');
  content = content.replace(/pt-24 sm:pt-28 lg:pt-32/g, 'pt-16 sm:pt-20 lg:pt-24');
  fs.writeFileSync(file, content);
}

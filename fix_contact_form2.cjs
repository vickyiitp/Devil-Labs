const fs = require('fs');

let content = fs.readFileSync('src/pages/ContactPage.tsx', 'utf8');

const badHTML = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">`;

const goodHTML = `{/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">`;

content = content.replace(badHTML, goodHTML);
fs.writeFileSync('src/pages/ContactPage.tsx', content);

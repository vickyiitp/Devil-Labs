const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Any className containing clay-card or neumorphic-card should have p-6 md:p-8
  const regex = /(className=\{?`?[^"}`]*(?:clay-card|neumorphic-card)[^"}`]*["}`])/g;
  
  content = content.replace(regex, (match) => {
    let newStr = match;
    
    // if it has p-6 but not md:p-8
    if (newStr.includes('p-6') && !newStr.includes('md:p-8')) {
      newStr = newStr.replace(/\bp-6\b/g, 'p-6 md:p-8');
    }
    
    // clean up duplicate md:p-8 if they happen to appear next to each other
    newStr = newStr.replace(/md:p-8 md:p-8/g, 'md:p-8');
    
    return newStr;
  });

  if (content !== fs.readFileSync(file, 'utf8')) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

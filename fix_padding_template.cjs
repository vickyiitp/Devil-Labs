const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Match className={`...`} where ... contains clay-card or neumorphic-card
  // Be careful not to replace things aggressively. Just replace p-8 or p-5 in it if it's there.
  
  const regex = /className=\{`([^`]*(?:clay-card|neumorphic-card)[^`]*)`\}/g;
  
  content = content.replace(regex, (match, classNames) => {
    let newClassNames = classNames;
    
    newClassNames = newClassNames.replace(/\bp-[0-9]+(\.[0-9]+)?\b/g, 'p-6 md:p-8');
    newClassNames = newClassNames.replace(/\bsm:p-[0-9]+\b/g, ''); 
    newClassNames = newClassNames.replace(/\bmd:p-[0-9]+\b/g, ''); 
    
    newClassNames = newClassNames.replace(/\s+/g, ' ').trim();
    
    const classes = newClassNames.split(' ');
    const uniqueClasses = [...new Set(classes)];
    
    if (!uniqueClasses.includes('p-6') && !uniqueClasses.includes('md:p-8')) {
        uniqueClasses.push('p-6 md:p-8');
    }
    
    return `className={\`${uniqueClasses.join(' ')}\`}`;
  });

  if (content !== fs.readFileSync(file, 'utf8')) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

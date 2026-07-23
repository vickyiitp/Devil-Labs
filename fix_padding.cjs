const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let updated = false;

  const regex = /className="([^"]*(?:clay-card|neumorphic-card)[^"]*)"/g;
  
  content = content.replace(regex, (match, classNames) => {
    let newClassNames = classNames;
    
    // Replace various padding classes
    newClassNames = newClassNames.replace(/\bp-[0-9]+(\.[0-9]+)?\b/g, 'p-6 md:p-8');
    newClassNames = newClassNames.replace(/\bsm:p-[0-9]+\b/g, ''); // remove sm:p-*
    newClassNames = newClassNames.replace(/\bmd:p-[0-9]+\b/g, ''); // remove existing md:p-* just in case
    
    // Clean up multiple spaces
    newClassNames = newClassNames.replace(/\s+/g, ' ').trim();
    
    // Deduplicate p-6 md:p-8 if it was inserted multiple times
    const classes = newClassNames.split(' ');
    const uniqueClasses = [...new Set(classes)];
    
    // Ensure p-6 md:p-8 is present if we wanted it
    if (uniqueClasses.includes('p-6') || uniqueClasses.includes('md:p-8')) {
        // we added it.
    } else {
        // it had no padding class? let's add it anyway as per instruction "Update their padding"
        uniqueClasses.push('p-6');
        uniqueClasses.push('md:p-8');
    }
    
    return `className="${uniqueClasses.join(' ')}"`;
  });

  if (content !== fs.readFileSync(file, 'utf8')) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

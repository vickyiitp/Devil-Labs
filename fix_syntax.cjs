const fs = require('fs');
let c = fs.readFileSync('src/components/SkeletonLoader.tsx', 'utf8');
c = c.replace(/style={{ animationDelay: .*/, "style={{ animationDelay: `${i * 0.1}s` }} />");
fs.writeFileSync('src/components/SkeletonLoader.tsx', c);

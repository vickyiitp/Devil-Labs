const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Ensure useScroll and useTransform are imported, and useRef
if (!content.includes('useScroll')) {
  content = content.replace(
    /import \{ motion, AnimatePresence \} from 'motion\/react';/,
    "import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';"
  );
}
if (!content.includes('useRef')) {
  content = content.replace(
    /import \{ useState, useEffect \} from 'react';/,
    "import { useState, useEffect, useRef } from 'react';"
  );
}

// Add the ScrollReveal component
const scrollRevealComponent = `
function ScrollSection({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.5"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  
  return (
    <motion.div ref={ref} style={{ opacity, y, scale }} className={\`w-full relative z-10 \${className}\`}>
      {children}
    </motion.div>
  );
}

`;

content = content.replace(/export default function App\(\) \{/, scrollRevealComponent + "export default function App() {");

// Now apply ScrollSection around the main sections

// Replace Nav wrapper
content = content.replace(
  /<div className="relative z-10">\s*\{\/\* Navigation Header \*\/\}\s*<div>\s*<Navigation currentPath=\{currentPath\} navigate=\{navigate\} \/>\s*<\/div>/m,
  `<div className="relative z-10">
          {/* Navigation Header */}
          <ScrollSection>
            <Navigation currentPath={currentPath} navigate={navigate} />
          </ScrollSection>`
);

// Replace Breadcrumb
content = content.replace(
  /\{\/\* Navigational Breadcrumb Trail \*\/\}\s*<Breadcrumb currentPath=\{currentPath\} navigate=\{navigate\} \/>/m,
  `{/* Navigational Breadcrumb Trail */}
          <ScrollSection>
            <Breadcrumb currentPath={currentPath} navigate={navigate} />
          </ScrollSection>`
);

// Replace Main dynamic container
content = content.replace(
  /\{\/\* Dynamic Main Page Container \*\/\}\s*<main id="main-content" className="flex-grow">/m,
  `{/* Dynamic Main Page Container */}
          <main id="main-content" className="flex-grow">`
); // Actually let's wrap the AnimatePresence inside ScrollSection? No, AnimatePresence has its own animation.
// Wait, if I wrap the whole main in ScrollSection, it will animate on scroll.
content = content.replace(
  /<main id="main-content" className="flex-grow">([\s\S]*?)<\/main>/m,
  `<main id="main-content" className="flex-grow">
            <ScrollSection>
$1
            </ScrollSection>
          </main>`
);

// Clean up the nested capture group
content = content.replace(
  /<ScrollSection>\s*<AnimatePresence mode="wait">/m,
  `<ScrollSection>
              <AnimatePresence mode="wait">`
);

// Replace ClayTopicShowcase
content = content.replace(
  /\{\/\* Curated Claymorphic Design Disciplines Section \(Sleek Pre-Footer Showcase\) \*\/\}\s*\{\!\['\/legal\/privacy', '\/legal\/terms', '\/legal\/msa'\]\.includes\(currentPath\) && \(\s*<div className="relative z-10">\s*<ClayTopicShowcase \/>\s*<\/div>\s*\)\}/m,
  `{/* Curated Claymorphic Design Disciplines Section (Sleek Pre-Footer Showcase) */}
        {!['/legal/privacy', '/legal/terms', '/legal/msa'].includes(currentPath) && (
          <ScrollSection>
            <ClayTopicShowcase />
          </ScrollSection>
        )}`
);

// Replace Footer
content = content.replace(
  /\{\/\* Footer Element with Scroll-Triggered Reveal Animation \*\/\}\s*<motion\.div\s*initial=\{\{ opacity: 0, y: 35 \}\}\s*whileInView=\{\{ opacity: 1, y: 0 \}\}\s*viewport=\{\{ once: true, amount: 0\.1 \}\}\s*transition=\{\{ duration: 0\.8, ease: \[0\.16, 1, 0\.3, 1\] \}\}\s*>\s*<Footer navigate=\{navigate\} \/>\s*<\/motion\.div>/m,
  `{/* Footer Element with Scroll-Triggered Reveal Animation */}
        <ScrollSection>
          <Footer navigate={navigate} />
        </ScrollSection>`
);


fs.writeFileSync('src/App.tsx', content);
console.log("Updated App.tsx with ScrollSection");

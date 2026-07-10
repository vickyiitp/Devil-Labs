const fs = require('fs');
const file = 'src/pages/PricingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import { useState, useMemo, useEffect } from 'react';", "import { useState, useMemo, useEffect } from 'react';\nimport { useCurrency } from '../contexts/CurrencyContext';");

// Remove isIndia state and useEffect
content = content.replace(/  const \[isIndia, setIsIndia\] = useState\(false\);\n\n  useEffect\(\(\) => \{\n    try \{\n      const tz = Intl\.DateTimeFormat\(\)\.resolvedOptions\(\)\.timeZone;\n      if \(tz\.toLowerCase\(\)\.includes\('kolkata'\) \|\| tz\.toLowerCase\(\)\.includes\('calcutta'\) \|\| tz\.toLowerCase\(\)\.includes\('asia\/calcutta'\) \|\| tz\.toLowerCase\(\)\.includes\('asia\/kolkata'\)\) \{\n        setIsIndia\(true\);\n      \}\n    \} catch \(e\) \{\n      \/\/ fallback\n    \}\n  \}, \[\]\);\n\n/, "");

// Replace isIndia with currency === 'INR' globally
content = content.replace(/isIndia/g, "(currency === 'INR')");

// Inside PricingPage component, get currency
content = content.replace("export default function PricingPage({ navigate }: PricingPageProps) {", "export default function PricingPage({ navigate }: PricingPageProps) {\n  const { currency } = useCurrency();");

fs.writeFileSync(file, content);
console.log("Updated PricingPage.tsx for currency");

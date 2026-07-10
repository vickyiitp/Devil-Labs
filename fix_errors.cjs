const fs = require('fs');

let navContent = fs.readFileSync('src/components/Navigation.tsx', 'utf8');
if (!navContent.includes("import React")) {
    navContent = navContent.replace("import { useState", "import React, { useState");
    fs.writeFileSync('src/components/Navigation.tsx', navContent);
    console.log("Fixed Navigation.tsx");
}

let sdpContent = fs.readFileSync('src/pages/ServiceDetailPage.tsx', 'utf8');
if (!sdpContent.includes("useCurrency")) {
    sdpContent = sdpContent.replace("import React, { useEffect, useState } from \"react\";", "import React, { useEffect, useState } from \"react\";\nimport { useCurrency } from '../contexts/CurrencyContext';");
}
if (!sdpContent.includes("const { currency } = useCurrency();")) {
    sdpContent = sdpContent.replace("export default function ServiceDetailPage({", "export default function ServiceDetailPage({\n  navigate,\n  slug,\n}: ServiceDetailPageProps) {\n  const { currency } = useCurrency();\n\n  // DUMMY REPLACE TO PREVENT DUPLICATION");
    
    // Actually wait, let's carefully replace the function signature
    // The current signature is:
    /*
export default function ServiceDetailPage({
  navigate,
  slug,
}: ServiceDetailPageProps) {
  const data = serviceData[slug];
    */
    sdpContent = sdpContent.replace("}: ServiceDetailPageProps) {\n  const data =", "}: ServiceDetailPageProps) {\n  const { currency } = useCurrency();\n  const data =");
}

fs.writeFileSync('src/pages/ServiceDetailPage.tsx', sdpContent);
console.log("Fixed ServiceDetailPage.tsx");

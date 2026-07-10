const fs = require('fs');

let sdpContent = fs.readFileSync('src/pages/ServiceDetailPage.tsx', 'utf8');

// Use regex to replace the duplicate section
const regex = /export default function ServiceDetailPage\(\{\s+navigate,\s+slug,\s+\}: ServiceDetailPageProps\) \{\s+const \{ currency \} = useCurrency\(\);\s+\/\/ DUMMY REPLACE TO PREVENT DUPLICATION\s+navigate,\s+slug,\s+\}: ServiceDetailPageProps\) \{\s+const \{ currency \} = useCurrency\(\);\s+const data = serviceData\[slug\];/;

const goodPart = `export default function ServiceDetailPage({
  navigate,
  slug,
}: ServiceDetailPageProps) {
  const { currency } = useCurrency();
  const data = serviceData[slug];`;

sdpContent = sdpContent.replace(regex, goodPart);

fs.writeFileSync('src/pages/ServiceDetailPage.tsx', sdpContent);
console.log("Fixed ServiceDetailPage.tsx duplicate via regex");

const fs = require('fs');
const file = 'src/pages/ServiceDetailPage.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import React, { useEffect, useState } from 'react';", "import React, { useEffect, useState } from 'react';\nimport { useCurrency } from '../contexts/CurrencyContext';");

content = content.replace("export default function ServiceDetailPage({ navigate, slug }: ServiceDetailPageProps) {", "export default function ServiceDetailPage({ navigate, slug }: ServiceDetailPageProps) {\n  const { currency } = useCurrency();");

// Replace {plan.price} with our logic.
// Original: {plan.price}
// The prices in data are strings like '₹7,500', '₹15,000', '₹35,000+'
// We can just parse the number and render it conditionally, or we can just replace {plan.price} with a helper function

const helperCode = `{(() => {
                    const numStr = plan.price.replace(/[^0-9]/g, '');
                    if (!numStr) return plan.price;
                    const inrVal = parseInt(numStr, 10);
                    const usdVal = Math.round(inrVal / 40); // 40 multiplier as per our fix_estimator
                    const hasPlus = plan.price.includes('+');
                    if (currency === 'INR') {
                      return \`₹\${inrVal.toLocaleString('en-IN')}\${hasPlus ? '+' : ''}\`;
                    } else {
                      return \`$\${usdVal.toLocaleString('en-US')}\${hasPlus ? '+' : ''}\`;
                    }
                  })()}`;

content = content.replace(/\{plan\.price\}/g, helperCode);

fs.writeFileSync(file, content);
console.log("Updated ServiceDetailPage.tsx for currency");

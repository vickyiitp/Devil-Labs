const fs = require('fs');
const file = 'src/pages/ServiceDetailPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldHelper = /\{\(\(\) => \{\n                    const numStr = plan\.price\.replace\(\/\[\^0-9\]\/g, ''\);\n                    if \(\!numStr\) return plan\.price;\n                    const inrVal = parseInt\(numStr, 10\);\n                    const usdVal = Math\.round\(inrVal \/ 40\);\n                    const hasPlus = plan\.price\.includes\('\+'\);\n                    if \(currency === 'INR'\) \{\n                      return \`₹\\$\\{inrVal\.toLocaleString\('en-IN'\)\\}\\$\\{hasPlus \? '\+' : ''\\}\`;\n                    \} else \{\n                      return \`\\$\\$\\{usdVal\.toLocaleString\('en-US'\)\\}\\$\\{hasPlus \? '\+' : ''\\}\`;\n                    \}\n                  \}\)\(\)\}/g;

const newHelper = `{(() => {
                    const priceMap: Record<string, string> = {
                      '₹7,500': '$199',
                      '₹15,000': '$499',
                      '₹35,000+': '$1,000+'
                    };
                    if (currency === 'INR') return plan.price;
                    return priceMap[plan.price] || plan.price;
                  })()}`;

content = content.replace(oldHelper, newHelper);

fs.writeFileSync(file, content);
console.log("Fixed price rendering in ServiceDetailPage");

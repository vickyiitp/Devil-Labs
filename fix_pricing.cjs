const fs = require('fs');

let content = fs.readFileSync('src/pages/PricingPage.tsx', 'utf8');

const button1Old = `                onClick={() => {
                  localStorage.setItem('selectedPlanScope', model.scope);
                  navigate(\`/contact?scope=\${encodeURIComponent(model.scope)}\`);
                }}`;
const button1New = `                onClick={() => {
                  localStorage.setItem('selectedPlanScope', model.scope);
                  const message = \`*New Project Inquiry*
------------------------
*Plan:* \${model.title}
*Scope:* \${model.scope}
*Price:* \${model.price}

I would like to proceed with this architecture. Please provide further details.\`;
                  const encodedMessage = encodeURIComponent(message);
                  const whatsappUrl = \`https://wa.me/918102099678?text=\${encodedMessage}\`;
                  window.open(whatsappUrl, '_blank');
                }}`;

const button2Old = `                onClick={() => {
                  let scopeStr = 'Other';
                  if (['landing-pages', 'business-website', 'ecommerce', 'fullstack'].includes(calcTier)) {
                    scopeStr = 'Web App';
                  } else if (calcTier === 'ai-agents') {
                    scopeStr = 'AI Automation';
                  }
                  localStorage.setItem('selectedPlanScope', scopeStr);
                  navigate(\`/contact?scope=\${encodeURIComponent(scopeStr)}\`);
                }}`;
const button2New = `                onClick={() => {
                  let scopeStr = 'Other';
                  if (['landing-pages', 'business-website', 'ecommerce', 'fullstack'].includes(calcTier)) {
                    scopeStr = 'Web App';
                  } else if (calcTier === 'ai-agents') {
                    scopeStr = 'AI Automation';
                  }
                  localStorage.setItem('selectedPlanScope', scopeStr);
                  const message = \`*New Project Estimate Inquiry*
------------------------
*Estimated Cost:* \${estimation.priceStr}
*Projected Timeline:* \${estimation.timelineStr}
*Scope Category:* \${scopeStr}

I would like to proceed with an estimate for my project. Please provide further details.\`;
                  const encodedMessage = encodeURIComponent(message);
                  const whatsappUrl = \`https://wa.me/918102099678?text=\${encodedMessage}\`;
                  window.open(whatsappUrl, '_blank');
                }}`;

content = content.replace(button1Old, button1New);
content = content.replace(button2Old, button2New);

fs.writeFileSync('src/pages/PricingPage.tsx', content);
console.log("Replaced PricingPage");

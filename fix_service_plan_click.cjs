const fs = require('fs');
const file = 'src/pages/ServiceDetailPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// The current code has: onClick={handleInitiate} inside the plans loop
// We should change it to onClick={() => handlePlanSelect(plan.name)}

content = content.replace(/onClick=\{handleInitiate\}\s*className=\{\`w-full py-3 font-mono/g, 
  "onClick={() => handlePlanSelect(plan.name)}\n                  className={`w-full py-3 font-mono");

const handleInitCode = `  const handleInitiate = () => {
    // Navigate to contact page with the pre-filled scope as a URL parameter
    navigate(\`/contact?scope=\${encodeURIComponent(data.contactValue)}\`);
  };`;

const newHandleCode = `  const handleInitiate = () => {
    navigate(\`/contact?scope=\${encodeURIComponent(data.contactValue)}\`);
  };

  const handlePlanSelect = (planName: string) => {
    // We map the plan name to the contact scopes
    let scopeStr = 'Web App';
    if (planName.includes('Starter')) scopeStr = 'MVP Build (Starter)';
    if (planName.includes('Professional')) scopeStr = 'Full-Stack + AI (Professional)';
    if (planName.includes('Enterprise')) scopeStr = 'Retainer / Enterprise';
    navigate(\`/contact?scope=\${encodeURIComponent(scopeStr)}\`);
  };`;

content = content.replace(handleInitCode, newHandleCode);

fs.writeFileSync(file, content);

const fs = require('fs');

const file = 'src/pages/ContactPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const newScopes = `  const scopes = [
    { value: 'MVP Build (Starter)', label: 'MVP Build (Starter)' },
    { value: 'Full-Stack + AI (Professional)', label: 'Full-Stack + AI (Professional)' },
    { value: 'Retainer / Enterprise', label: 'Retainer / Enterprise' },
    { value: 'Web App', label: 'Custom Web Application' },
    { value: 'AI Automation', label: 'AI System & Autonomous Workflow' },
    { value: 'Other', label: 'Other / Custom Requirements' }
  ];`;

content = content.replace(/  const scopes = \[\s*\{[\s\S]*?\];/, newScopes);

fs.writeFileSync(file, content);
console.log("Updated scopes in ContactPage.tsx");

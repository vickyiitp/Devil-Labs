const fs = require('fs');
const file = 'src/pages/ContactPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldHandleSubmit = `  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConsentChecked) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };`;

const newHandleSubmit = `  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConsentChecked) return;
    
    setLoading(true);
    
    // Format message for WhatsApp
    const message = \`*New Project Inquiry*
------------------------
*Name:* \${formData.name}
*Company:* \${formData.company || 'N/A'}
*Scope:* \${formData.scope}
*Budget:* \${formData.budget}

*Details:*
\${formData.specs}\`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = \`https://wa.me/918102099678?text=\${encodedMessage}\`;

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.open(whatsappUrl, '_blank');
    }, 800);
  };`;

content = content.replace(oldHandleSubmit, newHandleSubmit);
fs.writeFileSync(file, content);
console.log('Updated ContactPage for WhatsApp');

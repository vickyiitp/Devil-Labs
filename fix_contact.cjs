const fs = require('fs');

let content = fs.readFileSync('src/pages/ContactPage.tsx', 'utf8');

// 1. Add email to initial state
content = content.replace(
  `const [formData, setFormData] = useState({
    name: '',
    company: '',`,
  `const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',`
);

// 2. Add email to resetForm
content = content.replace(
  `  const resetForm = () => {
    setFormData({
      name: '',`,
  `  const resetForm = () => {
    setFormData({
      name: '',
      email: '',`
);

// 3. Add email validation and modify handleExecute to send WhatsApp message and NOT fetch '/api/contact'
const oldHandleExecute = `  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Validation
    if (!formData.name) newErrors.push("Please provide your name.");
    if (!formData.company) newErrors.push("Please provide your organization name.");
    if (!formData.scope) newErrors.push("Please select a project scope.");
    if (!formData.budget) newErrors.push("Please select a budget range.");
    if (!formData.specs) newErrors.push("Please provide some details about your project.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSuccess(true);
      } else {
        setErrors(["Failed to submit the form. Please try again later."]);
      }
    } catch (err) {
      setErrors(["Network error. Please try again later."]);
    } finally {
      setLoading(false);
    }
  };`;

const newHandleExecute = `  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Validation
    if (!formData.name) newErrors.push("Please provide your name.");
    if (!formData.email) newErrors.push("Please provide your email address.");
    else if (!/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(formData.email)) newErrors.push("Please provide a valid email address.");
    if (!formData.company) newErrors.push("Please provide your organization name.");
    if (!formData.scope) newErrors.push("Please select a project scope.");
    if (!formData.budget) newErrors.push("Please select a budget range.");
    if (!formData.specs) newErrors.push("Please provide some details about your project.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Open WhatsApp Message
      const message = \`*New Project Inquiry*
------------------------
*Name:* \${formData.name}
*Email:* \${formData.email}
*Organization:* \${formData.company}
*Scope:* \${formData.scope}
*Budget:* \${formData.budget}
*Vision:* \${formData.specs}\`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = \`https://wa.me/918102099678?text=\${encodedMessage}\`;
      window.open(whatsappUrl, '_blank');

      setSuccess(true);
    } catch (err) {
      setErrors(["Network error. Please try again later."]);
    } finally {
      setLoading(false);
    }
  };`;

content = content.replace(oldHandleExecute, newHandleExecute);

// 4. Add email field to the form
const nameFieldRegex = /\{?\/\*\s*Name\s*\*\/\s*\}?\s*<div className="relative group">\s*<input\s*id="name"[\s\S]*?<\/label>\s*<\/div>/;

const newNameAndEmail = `{/* Name */}
                <div className="relative group">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer text-lg font-light text-white transition-colors"
                  />
                  <label htmlFor="name" className="absolute text-gray-400 text-sm duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Full Name
                  </label>
                </div>
                {/* Email */}
                <div className="relative group">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer text-lg font-light text-white transition-colors"
                  />
                  <label htmlFor="email" className="absolute text-gray-400 text-sm duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Email Address
                  </label>
                </div>`;

content = content.replace(nameFieldRegex, newNameAndEmail);

// 5. Add simulated email notification in the success UI
const successUIRegex = /(<motion\.p\s*initial={{ opacity: 0, y: 10 }}\s*animate={{ opacity: 1, y: 0 }}\s*transition={{ delay: 0\.5 }}\s*className="text-gray-400 text-sm font-mono max-w-md mx-auto leading-relaxed uppercase tracking-widest"\s*>\s*TRANSMISSION RECEIVED\. OUR ARCHITECTS WILL CONTACT YOU SHORTLY\.\s*<\/motion\.p>)/;

const newSuccessUI = `$1
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 border border-emerald-500/30 bg-emerald-500/10 p-4 rounded-xl flex flex-col items-center max-w-md mx-auto"
                >
                  <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <span>Email Dispatch Successful</span>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    A 'Thank You' confirmation email has been dispatched to <span className="text-white font-bold">{formData.email}</span>.
                  </p>
                </motion.div>`;

content = content.replace(successUIRegex, newSuccessUI);

fs.writeFileSync('src/pages/ContactPage.tsx', content);
console.log('Fixed ContactPage');

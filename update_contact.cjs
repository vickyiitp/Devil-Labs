const fs = require('fs');

let content = fs.readFileSync('src/pages/ContactPage.tsx', 'utf8');

// Add companySize to initial state
content = content.replace(
  `const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',`,
  `const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',`
);

// Add companySizes options
content = content.replace(
  `  const budgetTiers = [
    { value: 'Tier 1', label: '$10k - $25k (MVP / Conceptual Build)' },
    { value: 'Tier 2', label: '$25k - $75k (Full Production Deployment)' },
    { value: 'Tier 3', label: '$75k+ (Enterprise Scale / Retainer)' }
  ];`,
  `  const budgetTiers = [
    { value: 'Tier 1', label: '$10k - $25k (MVP / Conceptual Build)' },
    { value: 'Tier 2', label: '$25k - $75k (Full Production Deployment)' },
    { value: 'Tier 3', label: '$75k+ (Enterprise Scale / Retainer)' }
  ];

  const companySizes = [
    { value: '1-10', label: '1-10 Employees' },
    { value: '11-50', label: '11-50 Employees' },
    { value: '51-200', label: '51-200 Employees' },
    { value: '201-500', label: '201-500 Employees' },
    { value: '500+', label: '500+ Employees' }
  ];`
);

// Add to resetForm
content = content.replace(
  `  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',`,
  `  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      companySize: '',`
);

// Add validation
content = content.replace(
  `    if (!formData.company) newErrors.push("Please provide your organization name.");`,
  `    if (!formData.company) newErrors.push("Please provide your organization name.");
    if (!formData.companySize) newErrors.push("Please select your company size.");`
);

// Add to WhatsApp message
content = content.replace(
  `*Phone:* \${formData.phone}
*Organization:* \${formData.company}`,
  `*Phone:* \${formData.phone}
*Organization:* \${formData.company}
*Company Size:* \${formData.companySize}`
);

// Add companySize to form UI before Project Scope
const formUIReplacement = `              {/* Project Scope */}`;
const newFormUIReplacement = `              {/* Company Size */}
              <div className="relative group">
                <select
                  id="companySize"
                  name="companySize"
                  required
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer text-lg font-light text-white transition-colors cursor-pointer"
                >
                  <option value="" className="bg-[#050505] text-gray-600">Select company size...</option>
                  {companySizes.map(sz => (
                    <option key={sz.value} value={sz.value} className="bg-[#111] text-white py-2">
                      {sz.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="companySize" className="absolute text-violet-400 text-xs font-mono uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0]">
                  Company Size
                </label>
              </div>

              {/* Project Scope */}`;

content = content.replace(formUIReplacement, newFormUIReplacement);

fs.writeFileSync('src/pages/ContactPage.tsx', content);
console.log('Fixed ContactPage size field');

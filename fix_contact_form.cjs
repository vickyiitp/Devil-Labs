const fs = require('fs');

let content = fs.readFileSync('src/pages/ContactPage.tsx', 'utf8');

// Add phone to initial state
content = content.replace(
  `const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',`,
  `const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',`
);

// Add phone to resetForm
content = content.replace(
  `  const resetForm = () => {
    setFormData({
      name: '',
      email: '',`,
  `  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',`
);

// Add phone validation and modify handleExecute
const oldExecutePart = `    if (!formData.name) newErrors.push("Please provide your name.");
    if (!formData.email) newErrors.push("Please provide your email address.");
    else if (!/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(formData.email)) newErrors.push("Please provide a valid email address.");
    if (!formData.company) newErrors.push("Please provide your organization name.");`;

const newExecutePart = `    if (!formData.name) newErrors.push("Please provide your name.");
    if (!formData.email) newErrors.push("Please provide your email address.");
    else if (!/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(formData.email)) newErrors.push("Please provide a valid email address.");
    if (!formData.phone) newErrors.push("Please provide your phone number.");
    if (!formData.company) newErrors.push("Please provide your organization name.");`;

content = content.replace(oldExecutePart, newExecutePart);

const oldWhatsApp = `*Name:* \${formData.name}
*Email:* \${formData.email}
*Organization:* \${formData.company}`;

const newWhatsApp = `*Name:* \${formData.name}
*Email:* \${formData.email}
*Phone:* \${formData.phone}
*Organization:* \${formData.company}`;

content = content.replace(oldWhatsApp, newWhatsApp);


// Form inputs replacement
const oldFormFields = `{/* Name */}
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
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {/* Company */}
                <div className="relative group">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer text-lg font-light text-white transition-colors"
                  />
                  <label htmlFor="company" className="absolute text-gray-400 text-sm duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Organization
                  </label>
                </div>`;

const newFormFields = `{/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
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
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="relative group">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer text-lg font-light text-white transition-colors"
                  />
                  <label htmlFor="phone" className="absolute text-gray-400 text-sm duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Phone Number
                  </label>
                </div>
                <div className="relative group">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer text-lg font-light text-white transition-colors"
                  />
                  <label htmlFor="company" className="absolute text-gray-400 text-sm duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Organization
                  </label>
                </div>
              </div>`;

// need to use regex since the layout of the divs might be slightly different
const layoutRegex = /\{\/\*\s*Name\s*\*\/\}([\s\S]*?)<label htmlFor="company"[\s\S]*?<\/label>\s*<\/div>\s*<\/div>/;

content = content.replace(layoutRegex, newFormFields);

fs.writeFileSync('src/pages/ContactPage.tsx', content);
console.log('Fixed Contact form');

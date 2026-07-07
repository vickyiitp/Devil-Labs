import { motion } from 'motion/react';
import { Send, Check, Mail, Calendar, MapPin, Phone, MessageCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export default function ContactPage({ navigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    scope: '',
    budget: '',
    specs: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isConsentChecked, setIsConsentChecked] = useState(false);

  useEffect(() => {
    // Parse URL parameters for scope auto-fill
    const params = new URLSearchParams(window.location.search);
    const scopeParam = params.get('scope');
    if (scopeParam) {
      setFormData(prev => ({ ...prev, scope: scopeParam }));
    }
  }, []);

  const scopes = [
    { value: 'Web App', label: 'Web Application Design & Architecture' },
    { value: 'AI Automation', label: 'AI System & Autonomous Workflow Engineering' },
    { value: 'Other', label: 'Custom Digital Platform & Media Solutions' }
  ];

  const budgetTiers = [
    { value: 'Tier 1', label: '$10k - $25k (MVP / Conceptual Build)' },
    { value: 'Tier 2', label: '$25k - $75k (Full Production Deployment)' },
    { value: 'Tier 3', label: '$75k+ (Enterprise Scale / Retainer)' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExecute = async (e: React.FormEvent) => {
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
  };

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      scope: '',
      budget: '',
      specs: ''
    });
    setSuccess(false);
  };

  return (
    <div id="contact-page-root" className="pt-28 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      {/* Abstract Background Blur */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-screen" />

      {/* HEADER */}
      <section className="mb-20 text-center max-w-3xl mx-auto space-y-6">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-violet-400 font-mono text-[10px] uppercase tracking-[0.3em] font-semibold block"
        >
          Begin The Dialogue
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter uppercase leading-[0.9]"
        >
          Let's Build <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-violet-400 font-serif italic font-light lowercase text-6xl sm:text-8xl lg:text-9xl">something</span> <br/>
          Beautiful.
        </motion.h1>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10 items-start">
        
        {/* LEFT COLUMN: Sleek Form */}
        <div className="lg:col-span-7 space-y-12">
          {!success ? (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={handleExecute} 
              className="space-y-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {/* Name */}
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
                </div>
              </div>

              {/* Project Scope */}
              <div className="relative group">
                <select
                  id="scope"
                  name="scope"
                  required
                  value={formData.scope}
                  onChange={handleInputChange}
                  className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer text-lg font-light text-white transition-colors cursor-pointer"
                >
                  <option value="" className="bg-[#050505] text-gray-600">Select an area of interest...</option>
                  {scopes.map(sc => (
                    <option key={sc.value} value={sc.value} className="bg-[#111] text-white py-2">
                      {sc.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="scope" className="absolute text-violet-400 text-xs font-mono uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0]">
                  Project Scope
                </label>
              </div>

              {/* Budget Tier */}
              <div className="relative group">
                <select
                  id="budget"
                  name="budget"
                  required
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer text-lg font-light text-white transition-colors cursor-pointer"
                >
                  <option value="" className="bg-[#050505] text-gray-600">Select a budget range...</option>
                  {budgetTiers.map(bt => (
                    <option key={bt.value} value={bt.value} className="bg-[#111] text-white py-2">
                      {bt.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="budget" className="absolute text-violet-400 text-xs font-mono uppercase tracking-widest duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0]">
                  Budget Expectation
                </label>
              </div>

              {/* Project Specs */}
              <div className="relative group pt-4">
                <textarea
                  id="specs"
                  name="specs"
                  required
                  rows={4}
                  value={formData.specs}
                  onChange={handleInputChange}
                  placeholder="Tell us about the vision, the goals, and the technical requirements..."
                  className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer text-lg font-light text-white transition-colors resize-none placeholder-gray-700"
                />
                <label htmlFor="specs" className="absolute text-violet-400 text-xs font-mono uppercase tracking-widest duration-300 transform -translate-y-2 scale-75 top-0 -z-10 origin-[0]">
                  The Vision
                </label>
              </div>

              {/* Validation errors */}
              {errors.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-red-500/10 rounded-2xl text-red-400 text-sm font-light border border-red-500/20"
                >
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Legal Consent */}
              <div className="flex items-start space-x-3 pt-4">
                <input
                  id="consent"
                  type="checkbox"
                  checked={isConsentChecked}
                  onChange={(e) => setIsConsentChecked(e.target.checked)}
                  className="mt-1 flex-shrink-0 w-4 h-4 rounded border-white/20 bg-black/50 text-violet-500 focus:ring-violet-500 focus:ring-offset-black cursor-pointer transition-colors"
                />
                <label htmlFor="consent" className="text-gray-400 text-xs font-mono leading-relaxed">
                  I agree to the <button type="button" onClick={() => navigate('/legal/terms')} className="text-indigo-400 hover:text-white underline decoration-indigo-500/30 transition-colors">Terms of Service</button> and <button type="button" onClick={() => navigate('/legal/privacy')} className="text-indigo-400 hover:text-white underline decoration-indigo-500/30 transition-colors">Privacy Policy</button>, and understand that submission of this data is subject to the Devil Labs <button type="button" onClick={() => navigate('/legal/msa')} className="text-indigo-400 hover:text-white underline decoration-indigo-500/30 transition-colors">MSA</button>.
                </label>
              </div>

              {/* Action */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading || !isConsentChecked}
                  className={`w-full sm:w-auto px-10 py-5 font-bold tracking-widest text-[10px] uppercase transition-all duration-500 flex items-center justify-center space-x-3 
                    ${isConsentChecked && !loading
                      ? 'bg-white text-black hover:bg-violet-500 hover:text-white shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] cursor-pointer' 
                      : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/5'
                    }`}
                >
                  <span>{loading ? 'INITIALIZING...' : 'INITIALIZE PROJECT'}</span>
                  <Send size={14} className={loading ? 'animate-pulse' : ''} />
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-16 rounded-[2rem] bg-white/5 border border-white/10 text-center space-y-8 backdrop-blur-xl relative overflow-hidden"
            >
              {/* Subtle flash effect */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 bg-violet-500/20 pointer-events-none"
              />
              
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-violet-500/20 text-violet-400 mx-auto border border-violet-500/30 relative"
              >
                <motion.div 
                   className="absolute inset-0 rounded-full bg-violet-500"
                   initial={{ scale: 0, opacity: 0.8 }}
                   animate={{ scale: 1.5, opacity: 0 }}
                   transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    d="M20 6 9 17l-5-5"
                  />
                </motion.svg>
              </motion.div>
              <div className="space-y-4 relative z-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  data-text="SYSTEM UPLINK ESTABLISHED"
                  className="text-white font-display font-black text-3xl md:text-4xl tracking-tighter uppercase glitch"
                >
                  SYSTEM UPLINK ESTABLISHED
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400 text-sm font-mono max-w-md mx-auto leading-relaxed uppercase tracking-widest"
                >
                  TRANSMISSION RECEIVED. OUR ARCHITECTS WILL CONTACT YOU SHORTLY.
                </motion.p>
              </div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={resetForm}
                className="mt-8 text-[10px] font-bold tracking-widest text-violet-400 hover:text-white uppercase transition-all relative z-10 border-b border-violet-500/30 hover:border-white pb-1"
              >
                INITIALIZE NEW TRANSMISSION
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 space-y-12 pt-4 lg:pl-8 border-l-0 lg:border-l border-white/5"
        >
          <div className="space-y-8">
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">Direct Contact</h3>
            <p className="text-gray-400 font-light text-base leading-relaxed">
              Prefer a direct conversation? Feel free to reach out to us via email or book a call on our calendar.
            </p>
            
            <div className="space-y-6">
              <a href="tel:+918102099678" className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-violet-500 group-hover:text-white transition-all duration-500 border border-white/10">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Direct Call</div>
                  <div className="text-white font-medium text-lg group-hover:text-violet-400 transition-colors">+91 81020 99678</div>
                </div>
              </a>

              <a href="https://wa.me/918102099678" target="_blank" rel="noreferrer" className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-500 border border-white/10">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">WhatsApp</div>
                  <div className="text-white font-medium text-lg group-hover:text-[#25D366] transition-colors">+91 81020 99678</div>
                </div>
              </a>

              <a href="mailto:hello@devillabs.co" className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-violet-500 group-hover:text-white transition-all duration-500 border border-white/10">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Email Us</div>
                  <div className="text-white font-medium text-lg group-hover:text-violet-400 transition-colors">hello@devillabs.co</div>
                </div>
              </a>

              <a href="https://calendly.com/devillabs" target="_blank" rel="noreferrer" className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-violet-500 group-hover:text-white transition-all duration-500 border border-white/10">
                  <Calendar size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Book a Call</div>
                  <div className="text-white font-medium text-lg group-hover:text-violet-400 transition-colors">calendly.com/devillabs</div>
                </div>
              </a>

              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gray-400 border border-white/10">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Location</div>
                  <div className="text-white font-medium text-lg">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

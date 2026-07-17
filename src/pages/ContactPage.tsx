import { motion } from 'motion/react';
import { Send, Check, Mail, Calendar, MapPin, Phone, MessageCircle, Github, Linkedin, Instagram, Globe, ArrowUpRight, Shield, AlertTriangle, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

interface ContactPageProps {
  navigate: (path: string) => void;
}

const COUNTRIES = [
  { code: 'DZ', dialCode: '+213', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AR', dialCode: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AU', dialCode: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', dialCode: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: 'BH', dialCode: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'BD', dialCode: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BE', dialCode: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BR', dialCode: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: 'CA', dialCode: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: 'CL', dialCode: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: 'CN', dialCode: '+86', name: 'China', flag: '🇨🇳' },
  { code: 'CO', dialCode: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: 'DK', dialCode: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: 'EG', dialCode: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: 'FI', dialCode: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', dialCode: '+33', name: 'France', flag: '🇫🇷' },
  { code: 'DE', dialCode: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: 'GR', dialCode: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: 'HK', dialCode: '+852', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'HU', dialCode: '+36', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IS', dialCode: '+354', name: 'Iceland', flag: '🇮🇸' },
  { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳' },
  { code: 'ID', dialCode: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IE', dialCode: '+353', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IL', dialCode: '+972', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', dialCode: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: 'JP', dialCode: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: 'JO', dialCode: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: 'KE', dialCode: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: 'KR', dialCode: '+82', name: 'Korea', flag: '🇰🇷' },
  { code: 'KW', dialCode: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'MY', dialCode: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MX', dialCode: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: 'NL', dialCode: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', dialCode: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NG', dialCode: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'NO', dialCode: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: 'OM', dialCode: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: 'PE', dialCode: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', dialCode: '+63', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PL', dialCode: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', dialCode: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: 'QA', dialCode: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: 'RO', dialCode: '+40', name: 'Romania', flag: '🇷🇴' },
  { code: 'SA', dialCode: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'SG', dialCode: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: 'ZA', dialCode: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: 'ES', dialCode: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: 'LK', dialCode: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'SE', dialCode: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', dialCode: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'TW', dialCode: '+886', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TH', dialCode: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TR', dialCode: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: 'UA', dialCode: '+380', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'AE', dialCode: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', dialCode: '+1', name: 'United States', flag: '🇺🇸' },
  { code: 'VN', dialCode: '+84', name: 'Vietnam', flag: '🇻🇳' }
];

export default function ContactPage({ navigate }: ContactPageProps) {
  const { currency } = useCurrency();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    scope: '',
    budget: '',
    specs: ''
  });

  const [phonePrefix, setPhonePrefix] = useState('+91');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dispatchResults, setDispatchResults] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [rateLimitSecondsLeft, setRateLimitSecondsLeft] = useState(0);
  const [rateLimitClicks, setRateLimitClicks] = useState(0);
  const [loadedInfo, setLoadedInfo] = useState<{ service?: string; plan?: string; scope?: string } | null>(null);

  useEffect(() => {
    if (rateLimitSecondsLeft <= 0) {
      setRateLimitClicks(0);
      return;
    }
    const timer = setTimeout(() => {
      setRateLimitSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [rateLimitSecondsLeft]);

  useEffect(() => {
    // Parse URL parameters for scope auto-fill or check localStorage
    const params = new URLSearchParams(window.location.search);
    const scopeParam = params.get('scope');
    const serviceParam = params.get('service');
    const planParam = params.get('plan');
    
    // 1. Prefill scope
    let initialScope = '';
    if (scopeParam) {
      initialScope = scopeParam;
      localStorage.setItem('selectedPlanScope', scopeParam); // keep it synced
    } else {
      const storedScope = localStorage.getItem('selectedPlanScope');
      if (storedScope) {
        initialScope = storedScope;
      } else {
        const storedCategory = localStorage.getItem('selectedProjectCategory');
        if (storedCategory && storedCategory !== 'All') {
          const categoryToScopeMap: Record<string, string> = {
            'Enterprise Systems': 'Retainer / Enterprise',
            'E-Commerce': 'Web App',
            'Web Architecture': 'Web App',
            'Landing Pages': 'MVP Build (Starter)',
            'Utilities': 'Web App',
            'AI': 'AI Automation',
            'Web': 'Web App',
            'Infrastructure': 'Retainer / Enterprise'
          };
          initialScope = categoryToScopeMap[storedCategory] || '';
        }
      }
    }

    // 2. Prefill budget based on plan choice
    let initialBudget = '';
    const activePlan = planParam || localStorage.getItem('selectedPlan');
    if (activePlan) {
      if (planParam) {
        localStorage.setItem('selectedPlan', planParam);
      }
      if (activePlan.toLowerCase().includes('starter')) {
        initialBudget = '$100 - $300';
      } else if (activePlan.toLowerCase().includes('professional')) {
        initialBudget = '$300 - $700';
      } else if (activePlan.toLowerCase().includes('enterprise')) {
        initialBudget = '$1,000+';
      }
    }

    // 3. Prefill specifications / description text
    const activeService = serviceParam || localStorage.getItem('selectedService');
    if (serviceParam) {
      localStorage.setItem('selectedService', serviceParam);
    }

    let initialSpecs = '';
    if (activeService) {
      if (activePlan) {
        initialSpecs = `Inquiring about our "${activeService}" project using the "${activePlan}". We want to align this build with our organizational goals and request a technical brief detailing database topology, security compliance, and latency performance.`;
      } else {
        initialSpecs = `Inquiring about our custom "${activeService}" project. We want to align this build with our organizational goals and request a technical brief detailing database topology, security compliance, and latency performance.`;
      }
    } else {
      const storedCategory = localStorage.getItem('selectedProjectCategory');
      if (storedCategory && storedCategory !== 'All') {
        initialSpecs = `Inquiring about custom high-scale "${storedCategory}" systems. We want to align this build with our organizational goals and request a technical brief detailing database topology, security compliance, and latency performance.`;
      }
    }

    // Apply all values to formData
    setFormData(prev => ({
      ...prev,
      ...(initialScope ? { scope: initialScope } : {}),
      ...(initialBudget ? { budget: initialBudget } : {}),
      ...(initialSpecs ? { specs: initialSpecs } : {})
    }));

    if (activeService || activePlan || initialScope) {
      setLoadedInfo({
        service: activeService || undefined,
        plan: activePlan || undefined,
        scope: initialScope || undefined
      });
    }

    // Cleanup local storage items to prevent stale pre-fills on fresh page loads
    return () => {
      localStorage.removeItem('selectedPlanScope');
      localStorage.removeItem('selectedService');
      localStorage.removeItem('selectedPlan');
      localStorage.removeItem('selectedProjectCategory');
    };
  }, []);

  const scopes = [
    { value: 'MVP Build (Starter)', label: 'MVP Build (Starter)' },
    { value: 'Full-Stack + AI (Professional)', label: 'Full-Stack + AI (Professional)' },
    { value: 'Retainer / Enterprise', label: 'Retainer / Enterprise' },
    { value: 'Web App', label: 'Custom Web Application' },
    { value: 'AI Automation', label: 'AI System & Autonomous Workflow' },
    { value: 'Other', label: 'Other / Custom Requirements' }
  ];

  const budgetTiers = [
    { value: '$100 - $300', label: '$100 - $300 (₹8,000 - ₹25,000)' },
    { value: '$300 - $700', label: '$300 - $700 (₹25,000 - ₹60,000)' },
    { value: '$700 - $1,000', label: '$700 - $1,000 (₹60,000 - ₹85,000)' },
    { value: '$1,000+', label: '$1,000+ (₹85,000+)' }
  ];

  const companySizes = [
    { value: '1-10', label: '1-10 Employees' },
    { value: '11-50', label: '11-50 Employees' },
    { value: '51-200', label: '51-200 Employees' },
    { value: '201-500', label: '201-500 Employees' },
    { value: '500+', label: '500+ Employees' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side rate limiter check
    const lastSubmitStr = localStorage.getItem('devil_labs_last_submit_time');
    const now = Date.now();
    const COOLDOWN_MS = 20000; // 20 seconds cooldown window

    if (lastSubmitStr) {
      const elapsed = now - parseInt(lastSubmitStr, 10);
      if (elapsed < COOLDOWN_MS) {
        const remainingSecs = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
        setRateLimitSecondsLeft(remainingSecs);
        setRateLimitClicks(prev => prev + 1);
        const clicks = rateLimitClicks + 1;

        let limitMsg = `⚠️ TRANSMISSION RATE LIMIT: Cooldown active. Please wait ${remainingSecs}s before transmitting another brief.`;
        if (clicks >= 4) {
          limitMsg = `🚨 CRITICAL THROTTLING: Clicking too fast (${clicks} attempts)! live telemetry pipeline is locked to prevent flood. Wait ${remainingSecs}s.`;
        } else if (clicks >= 2) {
          limitMsg = `⚠️ FAST CLICKS DETECTED: Cooldown active! Please wait ${remainingSecs}s before submitting again.`;
        }
        
        setErrors([limitMsg]);
        return;
      }
    }

    const newErrors: string[] = [];

    // Validation
    if (!formData.name) newErrors.push("Please provide your name.");
    if (!formData.email) newErrors.push("Please provide your email address.");
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) newErrors.push("Please provide a valid email address.");
    if (!formData.phone) newErrors.push("Please provide your phone number.");
    else if (!/^\d{4,14}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) newErrors.push("Please provide a valid phone number.");
    if (!formData.company) newErrors.push("Please provide your organization name.");
    if (!formData.companySize) newErrors.push("Please select your company size.");
    if (!formData.scope) newErrors.push("Please select a project scope.");
    if (!formData.budget) newErrors.push("Please select a budget range.");
    if (!formData.specs) newErrors.push("Please provide some details about your project.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    setLoading(true);

    const fullPhone = `${phonePrefix} ${formData.phone}`;
    const payload = {
      ...formData,
      phone: fullPhone
    };

    try {
      // Execute background full-stack API post
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        // Record timestamp of successful transmission
        localStorage.setItem('devil_labs_last_submit_time', Date.now().toString());
        setRateLimitSecondsLeft(20); // trigger live visual feedback countdown
        setSuccess(true);
        setDispatchResults(data.results);
      } else {
        const errText = await response.text();
        setErrors([`Transmission failed: ${errText || 'Internal Server Error'}`]);
      }
    } catch (err: any) {
      setErrors([`Network error: ${err.message || 'Transmission interrupted'}`]);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      companySize: '',
      scope: '',
      budget: '',
      specs: ''
    });
    setSuccess(false);
    setDispatchResults(null);
  };

  // Pre-compiled dispatch parameters for customer convenience
  const fullPhoneString = `${phonePrefix} ${formData.phone}`;
  const message = `*New Project Inquiry*
------------------------
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${fullPhoneString}
*Organization:* ${formData.company}
*Company Size:* ${formData.companySize}
*Scope:* ${formData.scope}
*Budget:* ${formData.budget}
*Vision:* ${formData.specs}`;
  const whatsappUrl = `https://wa.me/918102099678?text=${encodeURIComponent(message)}`;

  const emailSubject = `Devil Labs Project Brief - ${formData.company}`;
  const emailBody = `Hi Devil Labs Team,

I would like to initiate a software development project brief. Here are our project parameters:

- CLIENT NAME: ${formData.name}
- EMAIL ADDRESS: ${formData.email}
- PHONE NUMBER: ${fullPhoneString}
- ORGANIZATION: ${formData.company}
- COMPANY SIZE: ${formData.companySize}
- PROJECT SCOPE: ${formData.scope}
- BUDGET EXPECTATION: ${formData.budget}

PROJECT VISION & REQUIREMENTS:
${formData.specs}

Looking forward to our interactive demo and consultation session.

Regards,
${formData.name}`;
  const mailtoUrl = `mailto:devil.labs.contact@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

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
              {loadedInfo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-violet-950/20 border border-violet-500/30 rounded-xl p-5 space-y-3 backdrop-blur-md relative overflow-hidden"
                >
                  {/* Subtle decorative glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-violet-300 font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">
                      Configuration Calibrated
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {loadedInfo.service && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/90">
                        <span className="text-violet-400 font-medium">Service:</span>
                        <span className="text-white font-semibold">{loadedInfo.service}</span>
                      </div>
                    )}
                    {loadedInfo.plan && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/90">
                        <span className="text-violet-400 font-medium">Plan:</span>
                        <span className="text-emerald-400 font-semibold">{loadedInfo.plan}</span>
                      </div>
                    )}
                    {loadedInfo.scope && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/90">
                        <span className="text-violet-400 font-medium">Scope:</span>
                        <span className="text-white/80">{loadedInfo.scope}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                    The project scope, description, and budget fields have been automatically initialized based on your services selection. Feel free to adjust any parameter below.
                  </p>
                </motion.div>
              )}

              {/* Name & Email */}
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
                <div className="relative group flex items-end">
                  <div className="flex items-center space-x-1.5 border-b-2 border-white/20 pb-2.5 h-[62px]">
                    <select
                      value={phonePrefix}
                      onChange={(e) => setPhonePrefix(e.target.value)}
                      className="bg-transparent border-0 appearance-none focus:outline-none focus:ring-0 text-white font-mono text-base cursor-pointer hover:text-violet-400 transition-colors"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.dialCode} className="bg-[#111] text-white">
                          {c.flag} {c.dialCode}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="block w-full pl-2 pr-0 py-4 bg-transparent border-0 border-b-2 border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-violet-500 peer text-lg font-light text-white transition-colors"
                    />
                    <label htmlFor="phone" className="absolute text-gray-400 text-sm duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-violet-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-2">
                      Phone Number
                    </label>
                  </div>
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
              </div>

              {/* Company Size */}
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
                  Budget Expectation ({currency})
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
              <div className="pt-6 space-y-4">
                {rateLimitSecondsLeft > 0 && (
                  <div className="flex items-center justify-between p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                    <div className="flex items-center space-x-2 text-[10px] font-mono tracking-wider uppercase text-violet-400">
                      <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
                      <span>Pipeline Cooldown Active</span>
                    </div>
                    <span className="font-mono text-xs text-violet-400 font-bold">{rateLimitSecondsLeft}s remaining</span>
                  </div>
                )}

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
              className="p-8 sm:p-16 rounded-[2rem] bg-white/5 border border-white/10 text-center space-y-8 backdrop-blur-xl relative overflow-hidden"
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
                  data-text="SYSTEM SPECIFICATIONS DISPATCHED"
                  className="text-white font-display font-black text-3xl md:text-4xl tracking-tighter uppercase glitch"
                >
                  TRANSMISSION COMPLETED
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400 text-sm font-mono max-w-md mx-auto leading-relaxed uppercase tracking-widest"
                >
                  YOUR PROJECT BRIEF HAS BYPASSED FILTERS AND HAS BEEN DISPATCHED LIVE ACROSS THE PIPELINE.
                </motion.p>

                {/* Live Channel Transmission Status Reporting */}
                <div className="max-w-xl mx-auto bg-black/60 border border-white/5 rounded-2xl p-6 text-left font-mono text-xs text-gray-400 space-y-3">
                  <span className="font-bold text-gray-300 uppercase tracking-widest block mb-2">// PIPELINE DISPATCH LOGS:</span>
                  
                  {/* Email reporter */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="flex items-center space-x-2"><Mail size={12} /> <span>SMTP SECURE MAIL:</span></span>
                    {dispatchResults?.email?.success ? (
                      <span className="text-emerald-400 font-bold">● DISPATCHED</span>
                    ) : (
                      <span className="text-amber-500/80 font-bold">● STDOUT STANDBY (KEYS REQ)</span>
                    )}
                  </div>

                  {/* Telegram reporter */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="flex items-center space-x-2"><Globe size={12} /> <span>TELEGRAM BOT API:</span></span>
                    {dispatchResults?.telegram?.success ? (
                      <span className="text-emerald-400 font-bold">● DISPATCHED</span>
                    ) : (
                      <span className="text-gray-600">● OFFLINE (ENV REQ)</span>
                    )}
                  </div>

                  {/* WhatsApp reporter */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="flex items-center space-x-2"><MessageSquare size={12} /> <span>WHATSAPP BOT GATEWAY:</span></span>
                    {dispatchResults?.whatsapp?.success ? (
                      <span className="text-emerald-400 font-bold">● DISPATCHED</span>
                    ) : (
                      <span className="text-gray-600">● OFFLINE (ENV REQ)</span>
                    )}
                  </div>

                  {/* SMS reporter */}
                  <div className="flex justify-between items-center">
                    <span className="flex items-center space-x-2"><Shield size={12} /> <span>SMS BROADCAST:</span></span>
                    {dispatchResults?.sms?.success ? (
                      <span className="text-emerald-400 font-bold">● DISPATCHED</span>
                    ) : (
                      <span className="text-gray-600">● OFFLINE (ENV REQ)</span>
                    )}
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 border border-white/10 bg-black/50 p-6 rounded-2xl flex flex-col items-center max-w-xl mx-auto space-y-6"
                >
                  <div className="flex items-center space-x-2 text-violet-400 font-mono text-xs uppercase tracking-widest">
                     <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                     <span>MANUALLY ESCALATE OR DISPATCH VIA LOCAL LINK</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <a 
                      href={mailtoUrl}
                      className="flex flex-col items-center justify-center p-5 bg-white/5 hover:bg-violet-600/10 border border-white/10 hover:border-violet-500/50 rounded-xl transition-all duration-300 group text-center space-y-3 cursor-pointer"
                    >
                      <Mail size={24} className="text-violet-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-xs font-bold text-white font-mono tracking-wider">DISPATCH GMAIL BRIEF</div>
                        <div className="text-[9px] text-gray-500 font-sans mt-1 leading-relaxed">Sends pre-populated brief directly to <br/><span className="text-violet-300">devil.labs.contact@gmail.com</span></div>
                      </div>
                    </a>

                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center p-5 bg-white/5 hover:bg-[#25D366]/10 border border-white/10 hover:border-[#25D366]/50 rounded-xl transition-all duration-300 group text-center space-y-3 cursor-pointer"
                    >
                      <MessageCircle size={24} className="text-[#25D366] group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-xs font-bold text-white font-mono tracking-wider">DISPATCH WHATSAPP BRIEF</div>
                        <div className="text-[9px] text-gray-500 font-sans mt-1 leading-relaxed">Transmits details instantly to <br/><span className="text-emerald-400">+91 81020 99678</span></div>
                      </div>
                    </a>
                  </div>

                  <p className="text-[10px] text-gray-500 font-mono tracking-wider uppercase leading-relaxed max-w-md">
                    * Transmitting via both channels ensures the fastest architectural review and immediate demo turnaround.
                  </p>
                </motion.div>
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

              <a href="mailto:devil.labs.contact@gmail.com" className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-violet-500 group-hover:text-white transition-all duration-500 border border-white/10">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Email Us</div>
                  <div className="text-white font-medium text-lg group-hover:text-violet-400 transition-colors">devil.labs.contact@gmail.com</div>
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

              <div className="flex items-center space-x-6 pb-6">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-gray-400 border border-white/10">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Location</div>
                  <div className="text-white font-medium text-lg">San Francisco, CA</div>
                </div>
              </div>

              {/* Network Platforms */}
              <div className="space-y-4 pt-6 border-t border-white/5">
                <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-[0.25em]">// NETWORK PLATFORMS</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="https://github.com/Devil-Labs/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 hover:bg-violet-600/10 border border-white/5 hover:border-violet-500/30 rounded-xl transition-all duration-300 group">
                    <div className="flex items-center space-x-3">
                      <Github size={16} className="text-gray-400 group-hover:text-violet-400 transition-colors" />
                      <span className="text-xs text-white font-mono font-bold tracking-wider">GitHub Org</span>
                    </div>
                    <ArrowUpRight size={14} className="text-gray-600 group-hover:text-violet-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>

                   <a href="https://linkedin.com/company/devillabs" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 hover:bg-violet-600/10 border border-white/5 hover:border-violet-500/30 rounded-xl transition-all duration-300 group">
                    <div className="flex items-center space-x-3">
                      <Linkedin size={16} className="text-gray-400 group-hover:text-violet-400 transition-colors" />
                      <span className="text-xs text-white font-mono font-bold tracking-wider">LinkedIn</span>
                    </div>
                    <ArrowUpRight size={14} className="text-gray-600 group-hover:text-violet-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a href="https://instagram.com/devillabs" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 hover:bg-violet-600/10 border border-white/5 hover:border-violet-500/30 rounded-xl transition-all duration-300 group">
                    <div className="flex items-center space-x-3">
                      <Instagram size={16} className="text-gray-400 group-hover:text-violet-400 transition-colors" />
                      <span className="text-xs text-white font-mono font-bold tracking-wider">Instagram</span>
                    </div>
                    <ArrowUpRight size={14} className="text-gray-600 group-hover:text-violet-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a href="https://vickyiitp.tech" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 hover:bg-violet-600/10 border border-white/5 hover:border-violet-500/30 rounded-xl transition-all duration-300 group">
                    <div className="flex items-center space-x-3">
                      <Globe size={16} className="text-gray-400 group-hover:text-violet-400 transition-colors" />
                      <span className="text-xs text-white font-mono font-bold tracking-wider">Founder Site</span>
                    </div>
                    <ArrowUpRight size={14} className="text-gray-600 group-hover:text-violet-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

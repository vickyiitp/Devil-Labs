import { motion } from 'motion/react';
import { Send, Check, Mail, Calendar, MapPin, Phone, MessageCircle, Github, Linkedin, Instagram, Globe, ArrowUpRight, Shield, AlertTriangle, MessageSquare, Loader2, CheckCircle, Info } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import FormSuccessAnimation from '../components/FormSuccessAnimation';

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
    <div id="contact-page-root" className="pt-20 xs:pt-24 sm:pt-28 lg:pt-32 pb-32 px-4 md:px-8 max-w-7xl mx-auto min-h-screen relative overflow-hidden text-stone-800">
      {/* Abstract Background Blur */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/5 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-multiply" />

      {/* HEADER */}
      <section className="mb-20 text-center max-w-3xl mx-auto space-y-6">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-violet-600 font-mono text-[10px] uppercase tracking-[0.3em] font-semibold block"
        >
          Begin The Dialogue
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-850 tracking-tighter uppercase leading-[0.9] break-words max-w-full"
        >
          Let's Build <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 font-serif italic font-light lowercase text-3xl xs:text-4xl sm:text-7xl md:text-8xl lg:text-9xl break-words max-w-full">something</span> <br/>
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
              className="p-6 md:p-8 clay-card space-y-8 text-left"
            >
              {loadedInfo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-violet-500/5 border border-violet-200/50 rounded-3xl p-6 space-y-3 relative overflow-hidden"
                >
                  {/* Subtle decorative glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-violet-700 font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">
                      Configuration Calibrated
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {loadedInfo.service && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200/50 text-xs font-mono text-stone-700">
                        <span className="text-violet-600 font-medium">Service:</span>
                        <span className="text-stone-850 font-bold">{loadedInfo.service}</span>
                      </div>
                    )}
                    {loadedInfo.plan && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200/50 text-xs font-mono text-stone-700">
                        <span className="text-violet-600 font-medium">Plan:</span>
                        <span className="text-emerald-600 font-bold">{loadedInfo.plan}</span>
                      </div>
                    )}
                    {loadedInfo.scope && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200/50 text-xs font-mono text-stone-700">
                        <span className="text-violet-600 font-medium">Scope:</span>
                        <span className="text-stone-600">{loadedInfo.scope}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                    The project scope, description, and budget fields have been automatically initialized based on your services selection. Feel free to adjust any parameter below.
                  </p>
                </motion.div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2 relative group/field">
                  <div className="flex justify-between items-center">
                    <label htmlFor="name" className="text-stone-700 font-mono text-xs uppercase tracking-widest font-bold group-hover/field:text-violet-600 transition-colors duration-300">
                      ✦ INITIATOR IDENTITY *
                    </label>
                    {formData.name && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] font-mono text-emerald-600 font-bold tracking-widest uppercase flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        VALID PAYLOAD
                      </motion.span>
                    )}
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="VICKY KUMAR"
                    className="w-full px-6 py-4 text-stone-800 font-mono text-xs tracking-wider focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-full clay-inset uppercase placeholder-stone-400"
                  />
                  {formData.name.length > 2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] font-mono text-stone-400 uppercase tracking-wider pl-2 pt-0.5"
                    >
                      [ Identity registered as: <span className="text-violet-600 font-bold">{formData.name}</span> ]
                    </motion.div>
                  )}
                </div>
                <div className="flex flex-col space-y-2 relative group/field">
                  <div className="flex justify-between items-center">
                    <label htmlFor="email" className="text-stone-700 font-mono text-xs uppercase tracking-widest font-bold group-hover/field:text-violet-600 transition-colors duration-300">
                      ✦ SECURE UPLINK EMAIL *
                    </label>
                    {formData.email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email) && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] font-mono text-emerald-600 font-bold tracking-widest uppercase flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        SMTP VERIFIED
                      </motion.span>
                    )}
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="VICKY@DEVILLABS.TECH"
                    className="w-full px-6 py-4 text-stone-800 font-mono text-xs tracking-wider focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-full clay-inset uppercase placeholder-stone-400"
                  />
                  {formData.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email) && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[9px] font-mono text-amber-500 uppercase tracking-wider pl-2 pt-0.5"
                    >
                      [ Awaiting RFC-compliant formatting... ]
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2 relative group/field">
                  <div className="flex justify-between items-center">
                    <label htmlFor="phone" className="text-stone-700 font-mono text-xs uppercase tracking-widest font-bold group-hover/field:text-violet-600 transition-colors duration-300">
                      ✦ DIRECT TELEPHONY COORDINATES *
                    </label>
                    {formData.phone && /^\d{4,14}$/.test(formData.phone.replace(/[\s\-()]/g, '')) && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] font-mono text-emerald-600 font-bold tracking-widest uppercase flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        TELEPHONY OK
                      </motion.span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="relative shrink-0">
                      <select
                        value={phonePrefix}
                        onChange={(e) => setPhonePrefix(e.target.value)}
                        className="px-4 py-4 text-stone-800 font-mono text-xs tracking-wider focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-full clay-inset appearance-none cursor-pointer bg-transparent"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.dialCode} className="bg-[#fcfbf9] text-stone-850">
                            {c.flag} {c.dialCode}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className="w-full px-6 py-4 text-stone-800 font-mono text-xs tracking-wider focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-full clay-inset uppercase placeholder-stone-400"
                    />
                  </div>
                  {formData.phone && !/^\d{4,14}$/.test(formData.phone.replace(/[\s\-()]/g, '')) && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[9px] font-mono text-amber-500 uppercase tracking-wider pl-2 pt-0.5"
                    >
                      [ Feed numeric telecommunication coordinates... ]
                    </motion.div>
                  )}
                </div>
                <div className="flex flex-col space-y-2 relative group/field">
                  <div className="flex justify-between items-center">
                    <label htmlFor="company" className="text-stone-700 font-mono text-xs uppercase tracking-widest font-bold group-hover/field:text-violet-600 transition-colors duration-300">
                      ✦ ORGANIZATION NODE *
                    </label>
                    {formData.company && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] font-mono text-violet-600 font-bold tracking-widest uppercase flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                        NODE BOUND
                      </motion.span>
                    )}
                  </div>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="DEVIL LABS"
                    className="w-full px-6 py-4 text-stone-800 font-mono text-xs tracking-wider focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-full clay-inset uppercase placeholder-stone-400"
                  />
                </div>
              </div>

              {/* Company Size */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="companySize" className="text-stone-700 font-mono text-xs uppercase tracking-widest font-bold">
                  Company Size
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  required
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 text-stone-800 font-mono text-xs tracking-wider focus:outline-none focus:border-violet-300/40 transition-all rounded-full clay-inset appearance-none cursor-pointer bg-transparent"
                >
                  <option value="" className="text-stone-400 bg-[#fdfcf9]">SELECT SIZE...</option>
                  {companySizes.map(sz => (
                    <option key={sz.value} value={sz.value} className="text-stone-850 bg-[#fdfcf9]">
                      {sz.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Scope */}
              <div className="flex flex-col space-y-2 relative">
                <label htmlFor="scope" className="text-stone-700 font-mono text-xs uppercase tracking-widest font-bold">
                  Project Scope
                </label>
                <select
                  id="scope"
                  name="scope"
                  required
                  value={formData.scope}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 text-stone-800 font-mono text-xs tracking-wider focus:outline-none focus:border-violet-300/40 transition-all rounded-full clay-inset appearance-none cursor-pointer bg-transparent"
                >
                  <option value="" className="text-stone-400 bg-[#fdfcf9]">SELECT SCOPE...</option>
                  {scopes.map(sc => (
                    <option key={sc.value} value={sc.value} className="text-stone-850 bg-[#fdfcf9]">
                      {sc.label}
                    </option>
                  ))}
                </select>
                {loadedInfo?.scope && (
                  <div className="absolute right-4 top-1.5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full cursor-help group/tooltip z-10 transition-all hover:bg-emerald-100">
                    <Info className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Captured</span>
                    <span className="sm:hidden">Prefilled</span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 right-0 w-64 p-3 bg-white border border-stone-200 rounded-lg text-[11px] text-stone-600 font-sans leading-relaxed shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none">
                      Your project scope interest was automatically initialized to <strong className="text-emerald-700">"{loadedInfo.scope}"</strong> based on the service category you selected.
                    </div>
                  </div>
                )}
              </div>

              {/* Budget Tier */}
              <div className="flex flex-col space-y-2 relative">
                <label htmlFor="budget" className="text-stone-700 font-mono text-xs uppercase tracking-widest font-bold">
                  Budget Expectation ({currency})
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 text-stone-800 font-mono text-xs tracking-wider focus:outline-none focus:border-violet-300/40 transition-all rounded-full clay-inset appearance-none cursor-pointer bg-transparent"
                >
                  <option value="" className="text-stone-400 bg-[#fdfcf9]">SELECT BUDGET...</option>
                  {budgetTiers.map(bt => (
                    <option key={bt.value} value={bt.value} className="text-stone-850 bg-[#fdfcf9]">
                      {bt.label}
                    </option>
                  ))}
                </select>
                {loadedInfo?.plan && (
                  <div className="absolute right-4 top-1.5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full cursor-help group/tooltip z-10 transition-all hover:bg-emerald-100">
                    <Info className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Estimated</span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 right-0 w-64 p-3 bg-white border border-stone-200 rounded-lg text-[11px] text-stone-600 font-sans leading-relaxed shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none">
                      The budget was set to <strong className="text-emerald-700">"{formData.budget}"</strong> matching the standard price tier of the plan (<strong className="text-emerald-700">"{loadedInfo.plan}"</strong>) you selected.
                    </div>
                  </div>
                )}
              </div>

              {/* Project Specs */}
              <div className="flex flex-col space-y-2 relative">
                <label htmlFor="specs" className="text-stone-700 font-mono text-xs uppercase tracking-widest font-bold">
                  The Vision
                </label>
                <textarea
                  id="specs"
                  name="specs"
                  required
                  rows={4}
                  value={formData.specs}
                  onChange={handleInputChange}
                  placeholder="TELL US ABOUT THE VISION, THE GOALS, AND THE TECHNICAL REQUIREMENTS..."
                  className="w-full px-5 py-4 text-stone-800 font-mono text-xs tracking-wider focus:outline-none focus:border-violet-300/40 transition-all rounded-[24px] clay-inset resize-none uppercase placeholder-stone-400 leading-relaxed"
                />
                {(loadedInfo?.service || loadedInfo?.scope) && (
                  <div className="absolute right-4 top-1.5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full cursor-help group/tooltip z-10 transition-all hover:bg-emerald-100">
                    <Info className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Pre-drafted Outline</span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 right-0 w-64 p-3 bg-white border border-stone-200 rounded-lg text-[11px] text-stone-600 font-sans leading-relaxed shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none">
                      We automatically generated a customized technical brief outline referencing your selected service (<strong className="text-emerald-700">"{loadedInfo.service || loadedInfo.scope}"</strong>) to save you drafting time.
                    </div>
                  </div>
                )}
              </div>

              {/* Validation errors */}
              {errors.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-rose-50 border border-rose-150 rounded-2xl text-rose-700 text-sm font-light"
                >
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Legal Consent */}
              <div className="flex items-start space-x-3 pt-2">
                <input
                  id="consent"
                  type="checkbox"
                  checked={isConsentChecked}
                  onChange={(e) => setIsConsentChecked(e.target.checked)}
                  className="mt-1 flex-shrink-0 w-4 h-4 rounded border-stone-300 text-violet-600 focus:ring-violet-500 cursor-pointer transition-colors"
                />
                <label htmlFor="consent" className="text-stone-500 text-xs font-mono leading-relaxed">
                  I agree to the <button type="button" onClick={() => navigate('/legal/terms')} className="text-indigo-600 hover:text-stone-850 underline decoration-indigo-500/30 transition-colors">Terms of Service</button> and <button type="button" onClick={() => navigate('/legal/privacy')} className="text-indigo-600 hover:text-stone-850 underline decoration-indigo-500/30 transition-colors">Privacy Policy</button>, and understand that submission of this data is subject to the Devil Labs <button type="button" onClick={() => navigate('/legal/msa')} className="text-indigo-600 hover:text-stone-850 underline decoration-indigo-500/30 transition-colors">MSA</button>.
                </label>
              </div>

              {/* Action */}
              <div className="pt-4 space-y-4">
                {rateLimitSecondsLeft > 0 && (
                  <div className="flex items-center justify-between p-3.5 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                    <div className="flex items-center space-x-2 text-[10px] font-mono tracking-wider uppercase text-violet-600">
                      <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
                      <span>Pipeline Cooldown Active</span>
                    </div>
                    <span className="font-mono text-xs text-violet-600 font-bold">{rateLimitSecondsLeft}s remaining</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !isConsentChecked}
                  className={`w-full sm:w-auto px-10 py-5 font-bold tracking-widest text-xs uppercase transition-all duration-300 flex items-center justify-center space-x-3 rounded-full
                    ${isConsentChecked && !loading
                      ? 'clay-violet-solid cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed border border-stone-200 bg-stone-100 text-stone-400 shadow-none'
                    }`}
                >
                  <span>{loading ? 'INITIALIZING...' : 'INITIALIZE PROJECT'}</span>
                  <Send size={14} className={loading ? 'animate-pulse' : ''} />
                </button>
              </div>
            </motion.form>
          ) : (
            <FormSuccessAnimation
              title="TRANSMISSION COMPLETED"
              subtitle="YOUR PROJECT BRIEF HAS BYPASSED FILTERS AND HAS BEEN DISPATCHED LIVE ACROSS THE PIPELINE."
              dispatchResults={dispatchResults}
              onReset={resetForm}
              resetButtonText="INITIALIZE NEW BRIEF"
              extraInfo={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 clay-card p-6 md:p-8 flex flex-col items-center max-w-xl mx-auto space-y-4 border border-stone-200/40"
                >
                  <div className="flex items-center space-x-2 text-violet-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    <span>DIRECT LOCAL LINK DISPATCH</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    <a 
                      href={mailtoUrl}
                      className="flex flex-col items-center justify-center p-4 clay-button rounded-2xl transition-all duration-300 group text-center space-y-2 cursor-pointer"
                    >
                      <Mail size={20} className="text-violet-600 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-xs font-bold text-stone-850 font-mono tracking-wider">DISPATCH GMAIL BRIEF</div>
                        <div className="text-[9px] text-stone-500 font-sans mt-0.5 leading-relaxed">Direct email to <span className="text-violet-600">devil.labs.contact@gmail.com</span></div>
                      </div>
                    </a>

                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center p-4 clay-button rounded-2xl transition-all duration-300 group text-center space-y-2 cursor-pointer"
                    >
                      <MessageCircle size={20} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-xs font-bold text-stone-850 font-mono tracking-wider">DISPATCH WHATSAPP BRIEF</div>
                        <div className="text-[9px] text-stone-500 font-sans mt-0.5 leading-relaxed">Direct WhatsApp to <span className="text-emerald-600">+91 81020 99678</span></div>
                      </div>
                    </a>
                  </div>

                  <p className="text-[9px] text-stone-400 font-mono tracking-wider uppercase leading-relaxed max-w-md">
                    * Dual-channel dispatch ensures immediate engineering review and fast turnaround.
                  </p>
                </motion.div>
              }
            />
          )}
        </div>

        {/* RIGHT COLUMN: Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 space-y-12 pt-4 lg:pl-8 border-l-0 lg:border-l border-stone-200/50"
        >
          <div className="space-y-8">
            <h3 className="font-display text-2xl font-bold text-stone-850 tracking-tight">Direct Contact</h3>
            <p className="text-stone-500 font-light text-base leading-relaxed">
              Prefer a direct conversation? Feel free to reach out to us via email or book a call on our calendar.
            </p>
            
            <div className="space-y-6">
              <a href="tel:+918102099678" className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-full clay-button flex items-center justify-center text-stone-500 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                  <Phone size={20} className="stroke-[1.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-1">Direct Call</div>
                  <div className="text-stone-850 font-bold text-lg group-hover:text-violet-600 transition-colors">+91 81020 99678</div>
                </div>
              </a>

              <a href="https://wa.me/918102099678" target="_blank" rel="noreferrer" className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-full clay-button flex items-center justify-center text-stone-500 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-500">
                  <MessageCircle size={20} className="stroke-[1.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-1">WhatsApp</div>
                  <div className="text-stone-850 font-bold text-lg group-hover:text-[#25D366] transition-colors">+91 81020 99678</div>
                </div>
              </a>

              <a href="mailto:devil.labs.contact@gmail.com" className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-full clay-button flex items-center justify-center text-stone-500 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                  <Mail size={20} className="stroke-[1.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-1">Email Us</div>
                  <div className="text-stone-850 font-bold text-lg group-hover:text-violet-600 transition-colors">devil.labs.contact@gmail.com</div>
                </div>
              </a>

              <a href="https://calendly.com/devillabs" target="_blank" rel="noreferrer" className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-full clay-button flex items-center justify-center text-stone-500 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                  <Calendar size={20} className="stroke-[1.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-1">Book a Call</div>
                  <div className="text-stone-850 font-bold text-lg group-hover:text-violet-600 transition-colors">calendly.com/devillabs</div>
                </div>
              </a>

              <div className="flex items-center space-x-6 pb-6">
                <div className="w-14 h-14 rounded-full clay-button flex items-center justify-center text-stone-500">
                  <MapPin size={20} className="stroke-[1.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-1">Location</div>
                  <div className="text-stone-850 font-bold text-lg">Gaya, Bihar, India</div>
                </div>
              </div>

              {/* Network Platforms */}
              <div className="space-y-4 pt-6 border-t border-stone-200/50">
                <h4 className="font-mono text-xs font-bold text-stone-400 uppercase tracking-[0.25em] text-left">✦ NETWORK PLATFORMS</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="https://github.com/Devil-Labs/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 clay-button rounded-xl transition-all duration-300 group">
                    <div className="flex items-center space-x-3">
                      <Github size={16} className="text-stone-500 group-hover:text-violet-600 transition-colors" />
                      <span className="text-xs text-stone-700 font-mono font-bold tracking-wider">GitHub Org</span>
                    </div>
                    <ArrowUpRight size={14} className="text-stone-400 group-hover:text-violet-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>

                   <a href="https://linkedin.com/company/devillabs" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 clay-button rounded-xl transition-all duration-300 group">
                    <div className="flex items-center space-x-3">
                      <Linkedin size={16} className="text-stone-500 group-hover:text-violet-600 transition-colors" />
                      <span className="text-xs text-stone-700 font-mono font-bold tracking-wider">LinkedIn</span>
                    </div>
                    <ArrowUpRight size={14} className="text-stone-400 group-hover:text-violet-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a href="https://instagram.com/devillabs" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 clay-button rounded-xl transition-all duration-300 group">
                    <div className="flex items-center space-x-3">
                      <Instagram size={16} className="text-stone-500 group-hover:text-violet-600 transition-colors" />
                      <span className="text-xs text-stone-700 font-mono font-bold tracking-wider">Instagram</span>
                    </div>
                    <ArrowUpRight size={14} className="text-stone-400 group-hover:text-violet-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a href="https://vickyiitp.tech" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 clay-button rounded-xl transition-all duration-300 group">
                    <div className="flex items-center space-x-3">
                      <Globe size={16} className="text-stone-500 group-hover:text-violet-600 transition-colors" />
                      <span className="text-xs text-stone-700 font-mono font-bold tracking-wider">Founder Site</span>
                    </div>
                    <ArrowUpRight size={14} className="text-stone-400 group-hover:text-violet-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
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

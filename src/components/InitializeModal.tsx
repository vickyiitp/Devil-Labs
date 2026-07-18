import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, MessageSquare, ArrowUpRight, FileText, Sparkles, Shield, Cpu, Loader2, CheckCircle, AlertTriangle, Globe } from 'lucide-react';
import { audioEngine } from '../lib/audio';
import { useCurrency } from '../contexts/CurrencyContext';

interface InitializeModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function InitializeModal({ isOpen, onClose, navigate }: InitializeModalProps) {
  const { currency } = useCurrency();
  const [activeTab, setActiveTab] = useState<'dispatch' | 'hotlines'>('dispatch');
  
  // Form fields
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [budgetTier, setBudgetTier] = useState('');
  const [projectBrief, setProjectBrief] = useState('');

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dispatchDetails, setDispatchDetails] = useState<any>(null);
  const [rateLimitSecondsLeft, setRateLimitSecondsLeft] = useState(0);
  const [rateLimitClicks, setRateLimitClicks] = useState(0);

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

  // Reset inputs when opened
  useEffect(() => {
    if (isOpen) {
      setClientName('');
      setEmail('');
      setPhoneNumber('');
      setCompanyName('');
      
      const prefillBrief = localStorage.getItem('devil_labs_prefill_brief');
      if (prefillBrief) {
        setProjectBrief(prefillBrief);
        localStorage.removeItem('devil_labs_prefill_brief');
      } else {
        setProjectBrief('');
      }

      const prefillBudget = localStorage.getItem('devil_labs_prefill_budget');
      if (prefillBudget) {
        setBudgetTier(prefillBudget);
        localStorage.removeItem('devil_labs_prefill_budget');
      } else {
        setBudgetTier('');
      }

      setSubmitSuccess(false);
      setSubmitError(null);
      setDispatchDetails(null);
      setIsSubmitting(false);
      setActiveTab('dispatch');
      // Play high fidelity haptic click when modal triggers
      audioEngine.playClick();
    }
  }, [isOpen]);

  const budgetOptions = [
    { value: '$100 - $300', label: '$100 - $300 (₹8,000 - ₹25,000)' },
    { value: '$300 - $700', label: '$300 - $700 (₹25,000 - ₹60,000)' },
    { value: '$700 - $1,000', label: '$700 - $1,000 (₹60,000 - ₹85,000)' },
    { value: '$1,000+', label: '$1,000+ (₹85,000+)' }
  ];

  const handleTelemetrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();

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
          limitMsg = `🚨 CRITICAL THROTTLING: Clicking too fast (${clicks} attempts)! Live telemetry pipeline is locked to prevent flood. Wait ${remainingSecs}s.`;
        } else if (clicks >= 2) {
          limitMsg = `⚠️ FAST CLICKS DETECTED: Cooldown active! Please wait ${remainingSecs}s.`;
        }
        
        setSubmitError(limitMsg);
        return;
      }
    }

    if (!clientName || !email || !phoneNumber) {
      setSubmitError("Please fill in critical telemetry (Name, Email, Phone).");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const fullPhone = `${phonePrefix} ${phoneNumber}`;
    const payload = {
      name: clientName,
      email: email,
      phone: fullPhone,
      company: companyName || "Self-Employed",
      companySize: "1-10",
      scope: "Direct Digital Dispatch",
      budget: budgetTier || "$100 - $300",
      specs: projectBrief || "Immediate contact requested via telemetry link."
    };

    try {
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
        setSubmitSuccess(true);
        setDispatchDetails(data.results);
      } else {
        const errText = await response.text();
        setSubmitError(`Transmission failed: ${errText || 'Internal Server Error'}`);
      }
    } catch (err: any) {
      setSubmitError(`Network error: ${err.message || 'Transmission interrupted'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsappUrl = () => {
    const defaultText = `Hello Devil Labs Team, I am looking to initialize a new project!`;
    const textWithNotes = clientName || projectBrief 
      ? `Hello Devil Labs Team! My name is ${clientName || 'Visitor'}. I am looking to initialize a project. Brief notes: ${projectBrief || 'General Inquiry'}`
      : defaultText;
    return `https://wa.me/918102099678?text=${encodeURIComponent(textWithNotes)}`;
  };

  const generateEmailUrl = () => {
    const subject = `Project Inquiry - Devil Labs ${clientName ? `from ${clientName}` : ''}`;
    const body = `Hi Devil Labs Team,
Web inquiry initiated.

Client Name: ${clientName || 'Partner'}
Email: ${email || 'Not specified'}
Phone: ${phonePrefix} ${phoneNumber || 'Not specified'}
Company: ${companyName || 'Not specified'}
Preferred Budget: ${budgetTier || 'Not specified'}

Initial Project Details:
${projectBrief || 'Looking for expert custom software engineering services.'}

Best regards,
${clientName || 'Partner'}`;
    return `mailto:devil.labs.contact@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop glass blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-md pointer-events-auto"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-xl p-6 md:p-8 z-10 overflow-hidden pointer-events-auto my-8 text-stone-800 clay-card"
          >
            {/* Soft warm ambient background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-violet-200/40 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-100/30 blur-3xl pointer-events-none rounded-full" />

            {/* Close button */}
            <button
              onMouseEnter={() => audioEngine.playHover()}
              onClick={() => { audioEngine.playClick(); onClose(); }}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all rounded-full cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-violet-100 border border-violet-200/50 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                <span className="font-mono text-[8px] text-violet-700 tracking-[0.25em] uppercase font-bold">TRANSMISSION UPLINK v2.0</span>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-black tracking-tight text-stone-800 uppercase">
                INITIALIZE PROJECT
              </h3>
              <p className="text-stone-600 text-xs font-sans leading-relaxed">
                Connect with India's highest-tier autonomous software laboratory. Choose your transmission medium.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="grid grid-cols-2 gap-2 p-1 mb-6 clay-inset rounded-2xl">
              <button
                onClick={() => { audioEngine.playClick(); setActiveTab('dispatch'); }}
                className={`py-2.5 text-[10px] font-mono font-bold tracking-widest uppercase rounded-xl transition-all cursor-pointer ${
                  activeTab === 'dispatch'
                    ? 'clay-violet-solid'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                TELEMETRY DISPATCH
              </button>
              <button
                onClick={() => { audioEngine.playClick(); setActiveTab('hotlines'); }}
                className={`py-2.5 text-[10px] font-mono font-bold tracking-widest uppercase rounded-xl transition-all cursor-pointer ${
                  activeTab === 'hotlines'
                    ? 'clay-violet-solid'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                HOTLINE CHANNELS
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[250px]">
              {activeTab === 'dispatch' && (
                <div>
                  {!submitSuccess ? (
                    <form onSubmit={handleTelemetrySubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1 relative group/field">
                          <div className="flex justify-between items-center">
                            <label className="block text-[9px] font-mono text-stone-500 uppercase tracking-widest group-hover/field:text-violet-600 transition-colors duration-300">
                              // INITIATOR IDENTITY *
                            </label>
                            {clientName && (
                              <motion.span 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-[8px] font-mono text-emerald-600 font-bold tracking-widest uppercase flex items-center gap-1"
                              >
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                READY
                              </motion.span>
                            )}
                          </div>
                          <input
                            type="text"
                            required
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="E.G., JOHN DOE"
                            className="w-full px-3.5 py-2.5 text-xs font-mono text-stone-800 placeholder-stone-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-xl clay-inset uppercase"
                          />
                          {clientName.length > 2 && (
                            <motion.div 
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[8px] font-mono text-stone-400 uppercase tracking-wider pl-1 pt-0.5"
                            >
                              [ Identity: <span className="text-violet-600 font-bold">{clientName}</span> ]
                            </motion.div>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1 relative group/field">
                          <div className="flex justify-between items-center">
                            <label className="block text-[9px] font-mono text-stone-500 uppercase tracking-widest group-hover/field:text-violet-600 transition-colors duration-300">
                              // SECURE UPLINK EMAIL *
                            </label>
                            {email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && (
                              <motion.span 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-[8px] font-mono text-emerald-600 font-bold tracking-widest uppercase flex items-center gap-1"
                              >
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                SMTP OK
                              </motion.span>
                            )}
                          </div>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E.G., JOHN@COMPANY.COM"
                            className="w-full px-3.5 py-2.5 text-xs font-mono text-stone-800 placeholder-stone-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-xl clay-inset uppercase"
                          />
                          {email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[8px] font-mono text-amber-500 uppercase tracking-wider pl-1 pt-0.5"
                            >
                              [ Awaiting RFC-compliant address... ]
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone - ALL NATIONS SELECTOR */}
                        <div className="space-y-1 relative group/field">
                          <div className="flex justify-between items-center">
                            <label className="block text-[9px] font-mono text-stone-500 uppercase tracking-widest group-hover/field:text-violet-600 transition-colors duration-300">
                              // DIRECT HOTLINE *
                            </label>
                            {phoneNumber && /^\d{4,14}$/.test(phoneNumber.replace(/[\s\-()]/g, '')) && (
                              <motion.span 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-[8px] font-mono text-emerald-600 font-bold tracking-widest uppercase flex items-center gap-1"
                              >
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                COMM OK
                              </motion.span>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <div className="relative">
                              <select
                                value={phonePrefix}
                                onChange={(e) => setPhonePrefix(e.target.value)}
                                className="appearance-none px-2.5 py-2.5 text-xs font-mono text-stone-800 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-xl clay-inset cursor-pointer h-full bg-[#faf9f6]"
                              >
                                {COUNTRIES.map((c) => (
                                  <option key={c.code} value={c.dialCode} className="bg-[#fcfbf9] text-stone-800">
                                    {c.flag} {c.dialCode} ({c.code})
                                  </option>
                                ))}
                              </select>
                            </div>
                            <input
                              type="tel"
                              required
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="PHONE NUMBER"
                              className="flex-1 px-3.5 py-2.5 text-xs font-mono text-stone-800 placeholder-stone-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-xl clay-inset"
                            />
                          </div>
                        </div>

                        {/* Organization */}
                        <div className="space-y-1 relative group/field">
                          <div className="flex justify-between items-center">
                            <label className="block text-[9px] font-mono text-stone-500 uppercase tracking-widest group-hover/field:text-violet-600 transition-colors duration-300">
                              // ORGANIZATION NODE
                            </label>
                            {companyName && (
                              <motion.span 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-[8px] font-mono text-violet-600 font-bold tracking-widest uppercase flex items-center gap-1"
                              >
                                <span className="w-1 h-1 rounded-full bg-violet-500 animate-pulse" />
                                NODE CAPTURED
                              </motion.span>
                            )}
                          </div>
                          <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="COMPANY NAME (OPTIONAL)"
                            className="w-full px-3.5 py-2.5 text-xs font-mono text-stone-800 placeholder-stone-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-xl clay-inset uppercase"
                          />
                        </div>
                      </div>

                      {/* Budget Tier upgraded according to pricing */}
                      <div className="space-y-1 relative group/field">
                        <div className="flex justify-between items-center">
                          <label className="block text-[9px] font-mono text-stone-500 uppercase tracking-widest group-hover/field:text-violet-600 transition-colors duration-300">// CAPITAL EXPECTATION</label>
                          <span className="text-[8px] font-mono text-violet-600 uppercase tracking-widest">Active in {currency}</span>
                        </div>
                        <select
                          value={budgetTier}
                          onChange={(e) => setBudgetTier(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs font-mono text-stone-800 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-xl clay-inset cursor-pointer bg-transparent"
                        >
                          <option value="" className="text-stone-400">Select budget allocation coordinates...</option>
                          {budgetOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#fcfbf9] text-stone-800">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Specifications */}
                      <div className="space-y-1 relative group/field">
                        <div className="flex justify-between items-center">
                          <label className="block text-[9px] font-mono text-stone-500 uppercase tracking-widest group-hover/field:text-violet-600 transition-colors duration-300">// ARCHITECTURAL VISION SPECS</label>
                          <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest">
                            {projectBrief.length} CH
                          </span>
                        </div>
                        <textarea
                          value={projectBrief}
                          onChange={(e) => setProjectBrief(e.target.value)}
                          placeholder="CORE UTILITIES, DATABASE EXPECTATIONS, AND AI REQ..."
                          rows={2}
                          className="w-full px-3.5 py-2.5 text-xs font-mono text-stone-800 placeholder-stone-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300/30 transition-all rounded-xl clay-inset resize-none placeholder:uppercase leading-relaxed"
                        />
                      </div>

                      {/* Error display */}
                      {submitError && (
                        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-mono">
                          <AlertTriangle size={14} className="shrink-0" />
                          <span>{submitError}</span>
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="space-y-3">
                        {rateLimitSecondsLeft > 0 && (
                          <div className="flex items-center justify-between p-2.5 bg-violet-50 border border-violet-100 rounded-xl">
                            <div className="flex items-center space-x-2 text-[9px] font-mono tracking-wider uppercase text-violet-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
                              <span>System Cooldown Active</span>
                            </div>
                            <span className="font-mono text-[10px] text-violet-600 font-bold">{rateLimitSecondsLeft}s remaining</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          onMouseEnter={() => audioEngine.playHover()}
                          className="w-full relative flex items-center justify-center py-3.5 clay-violet-solid text-white font-mono text-xs font-bold tracking-[0.2em] uppercase rounded-full group"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <Loader2 size={14} className="animate-spin text-white" />
                              <span>DISPATCHING TELEMETRY...</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1.5">
                              <Cpu size={14} className="group-hover:rotate-45 transition-transform" />
                              <span>DISPATCH TELEMETRY PACKET</span>
                            </div>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Success Feedback with precise dispatch telemetry statuses */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-6"
                    >
                      <div className="inline-flex items-center justify-center p-4 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 mb-2">
                        <CheckCircle size={40} className="animate-bounce" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-display font-black text-stone-800 uppercase tracking-tight">TRANSMISSION COMPLETED</h4>
                        <p className="text-stone-600 text-xs max-w-sm mx-auto">
                          Your project brief has bypassed filters and has been dispatched live across all registered channels.
                        </p>
                      </div>

                      {/* Channel specific dispatch states */}
                      <div className="max-w-md mx-auto bg-[#f0ede6] border border-stone-200/50 rounded-2xl p-4 text-left font-mono text-[9px] text-stone-500 space-y-2.5 shadow-inner">
                        <span className="font-bold text-stone-700 uppercase tracking-widest block mb-1">// DISPATCH PIPELINE REPORTS:</span>
                        
                        {/* Email reporter */}
                        <div className="flex justify-between items-center border-b border-stone-200/30 pb-1.5">
                          <span className="flex items-center space-x-1.5"><Mail size={10} /> <span>SMTP SECURE MAIL:</span></span>
                          {dispatchDetails?.email?.success ? (
                            <span className="text-emerald-600 font-bold">● DISPATCHED</span>
                          ) : (
                            <span className="text-stone-500 font-bold">● STDOUT STANDBY (KEYS REQ)</span>
                          )}
                        </div>

                        {/* Telegram reporter */}
                        <div className="flex justify-between items-center border-b border-stone-200/30 pb-1.5">
                          <span className="flex items-center space-x-1.5"><Globe size={10} /> <span>TELEGRAM BOT API:</span></span>
                          {dispatchDetails?.telegram?.success ? (
                            <span className="text-emerald-600 font-bold">● DISPATCHED</span>
                          ) : (
                            <span className="text-stone-400">● OFFLINE (ENV REQ)</span>
                          )}
                        </div>

                        {/* WhatsApp reporter */}
                        <div className="flex justify-between items-center border-b border-stone-200/30 pb-1.5">
                          <span className="flex items-center space-x-1.5"><MessageSquare size={10} /> <span>WHATSAPP BOT GATEWAY:</span></span>
                          {dispatchDetails?.whatsapp?.success ? (
                            <span className="text-emerald-600 font-bold">● DISPATCHED</span>
                          ) : (
                            <span className="text-stone-400">● OFFLINE (ENV REQ)</span>
                          )}
                        </div>

                        {/* SMS reporter */}
                        <div className="flex justify-between items-center">
                          <span className="flex items-center space-x-1.5"><Shield size={10} /> <span>SMS BROADCAST:</span></span>
                          {dispatchDetails?.sms?.success ? (
                            <span className="text-emerald-600 font-bold">● DISPATCHED</span>
                          ) : (
                            <span className="text-stone-400">● OFFLINE (ENV REQ)</span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => { audioEngine.playClick(); onClose(); }}
                        className="px-6 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-200/50 rounded-xl font-mono text-[10px] text-stone-700 tracking-widest uppercase cursor-pointer"
                      >
                        DISMISS TERMINAL
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {activeTab === 'hotlines' && (
                <div className="space-y-4">
                  <p className="text-stone-600 text-xs font-sans mb-4">
                    Prefer direct, real-time manual control? Select an option below to initiate a private consultation session immediately.
                  </p>

                  {/* WhatsApp hotline */}
                  <button
                    onMouseEnter={() => audioEngine.playHover()}
                    onClick={() => { audioEngine.playClick(); window.open(generateWhatsappUrl(), '_blank'); }}
                    className="w-full flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100/50 border border-emerald-100 rounded-2xl transition-all duration-300 group cursor-pointer text-left shadow-sm"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                        <MessageSquare size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-800 tracking-wide font-sans">
                          INSTANT WHATSAPP CHAT
                        </h4>
                        <p className="text-[10px] text-emerald-600/80 font-mono tracking-wider uppercase mt-0.5">
                          Direct Line to 91 81020 99678
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  {/* Email hotline */}
                  <button
                    onMouseEnter={() => audioEngine.playHover()}
                    onClick={() => { audioEngine.playClick(); window.location.href = generateEmailUrl(); }}
                    className="w-full flex items-center justify-between p-4 bg-violet-50 hover:bg-violet-100/50 border border-violet-100 rounded-2xl transition-all duration-300 group cursor-pointer text-left shadow-sm"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-violet-100 text-violet-600 rounded-xl group-hover:scale-110 transition-transform">
                        <Mail size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-800 tracking-wide font-sans">
                          SECURE EMAIL TRANSMISSION
                        </h4>
                        <p className="text-[10px] text-violet-600/80 font-mono tracking-wider uppercase mt-0.5">
                          devil.labs.contact@gmail.com
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="border-t border-stone-200/50 pt-4 flex justify-between items-center font-mono text-[9px] text-stone-500">
                    <span>PREFILL STRINGS GENERATED DYNAMICALLY</span>
                    <button
                      onClick={() => { audioEngine.playClick(); onClose(); navigate('/contact'); }}
                      className="flex items-center space-x-1 hover:text-stone-800 transition-colors cursor-pointer"
                    >
                      <span>GO TO FULL PAGE</span>
                      <ArrowUpRight size={10} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-stone-200/50 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center space-x-2 text-[10px] text-stone-500 font-mono tracking-wider uppercase">
                <Shield size={12} className="text-stone-400" />
                <span>SECURED BY SSL ENDPOINTS</span>
              </div>
              
              <button
                onMouseEnter={() => audioEngine.playHover()}
                onClick={() => { audioEngine.playClick(); onClose(); navigate('/contact'); }}
                className="flex items-center space-x-2 font-mono text-[10px] font-bold text-stone-500 hover:text-stone-800 tracking-widest uppercase transition-colors cursor-pointer"
              >
                <FileText size={12} className="text-violet-500" />
                <span>GENERATE COMPREHENSIVE BRIEF</span>
                <ArrowUpRight size={12} />
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


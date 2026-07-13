import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, MessageSquare, ArrowUpRight, FileText, Sparkles, Shield, Cpu } from 'lucide-react';
import { audioEngine } from '../lib/audio';

interface InitializeModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
}

export default function InitializeModal({ isOpen, onClose, navigate }: InitializeModalProps) {
  const [quickNotes, setQuickNotes] = useState('');
  const [clientName, setClientName] = useState('');

  // Reset inputs when opened
  useEffect(() => {
    if (isOpen) {
      setQuickNotes('');
      setClientName('');
      // Play high fidelity haptic click when modal triggers
      audioEngine.playClick();
    }
  }, [isOpen]);

  const generateWhatsappUrl = () => {
    const defaultText = `Hello Devil Labs Team, I am looking to initialize a new project!`;
    const textWithNotes = clientName || quickNotes 
      ? `Hello Devil Labs Team! My name is ${clientName || 'Visitor'}. I am looking to initialize a project: ${quickNotes || 'General Inquiry'}`
      : defaultText;
    return `https://wa.me/918102099678?text=${encodeURIComponent(textWithNotes)}`;
  };

  const generateEmailUrl = () => {
    const subject = `Project Inquiry - Devil Labs ${clientName ? `from ${clientName}` : ''}`;
    const body = `Hi Devil Labs Team,

I would like to initialize a new project with you.

${clientName ? `Client Name: ${clientName}` : ''}
${quickNotes ? `Initial Project Details:\n${quickNotes}` : 'I would like to discuss general software development, AI automation, or high-performance landing pages.'}

Looking forward to your fast response.

Regards,
${clientName || 'Partner'}`;
    return `mailto:devil.labs.contact@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsappDispatch = () => {
    audioEngine.playClick();
    window.open(generateWhatsappUrl(), '_blank');
  };

  const handleEmailDispatch = () => {
    audioEngine.playClick();
    window.location.href = generateEmailUrl();
  };

  const handleDetailedBrief = () => {
    audioEngine.playClick();
    onClose();
    navigate('/contact');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop glass blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#020202]/90 backdrop-blur-xl pointer-events-auto"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-lg bg-[#080808] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden pointer-events-auto"
        >
          {/* Futuristic ambient background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-violet-600/10 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-fuchsia-600/5 blur-3xl pointer-events-none rounded-full" />

          {/* Close button */}
          <button
            onMouseEnter={() => audioEngine.playHover()}
            onClick={() => { audioEngine.playClick(); onClose(); }}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white hover:bg-white/5 transition-all rounded-full cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="font-mono text-[8px] text-violet-300 tracking-[0.25em] uppercase font-bold">TRANSMISSION UPLINK</span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-black tracking-tight text-white uppercase">
              INITIALIZE PROJECT
            </h3>
            <p className="text-gray-400 text-xs font-sans leading-relaxed">
              Dispatch project parameters directly to both channels or launch an instant consultation via WhatsApp / Email.
            </p>
          </div>

          {/* Quick Info Capture (Optional helper to pre-fill the WhatsApp & Email links) */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest font-bold">// OPTIONAL PARAMS TO PREFILL LINKS</span>
              <Sparkles size={10} className="text-violet-400" />
            </div>
            
            <div className="space-y-2">
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="YOUR NAME / COMPANY"
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono tracking-wider text-white focus:outline-none focus:border-violet-500/50 transition-colors"
              />
              <textarea
                value={quickNotes}
                onChange={(e) => setQuickNotes(e.target.value)}
                placeholder="BRIEF IDEA OR REQ (E.G., WEB SYSTEM, AI AGENT)"
                rows={2}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono tracking-wider text-white placeholder:uppercase focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Connection Channels Grid */}
          <div className="space-y-3 mb-6">
            {/* WhatsApp */}
            <button
              onMouseEnter={() => audioEngine.playHover()}
              onClick={handleWhatsappDispatch}
              className="w-full flex items-center justify-between p-4 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 rounded-2xl transition-all duration-300 group cursor-pointer text-left"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide font-sans">
                    INSTANT WHATSAPP CHAT
                  </h4>
                  <p className="text-[10px] text-emerald-400/80 font-mono tracking-wider uppercase mt-0.5">
                    Connect directly to 91 81020 99678
                  </p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Email */}
            <button
              onMouseEnter={() => audioEngine.playHover()}
              onClick={handleEmailDispatch}
              className="w-full flex items-center justify-between p-4 bg-violet-500/5 hover:bg-violet-500/10 border border-violet-500/20 hover:border-violet-500/40 rounded-2xl transition-all duration-300 group cursor-pointer text-left"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide font-sans">
                    SECURE EMAIL TRANSMISSION
                  </h4>
                  <p className="text-[10px] text-violet-400/80 font-mono tracking-wider uppercase mt-0.5">
                    devil.labs.contact@gmail.com
                  </p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Third option: Detailed Form */}
          <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center space-x-2 text-[10px] text-gray-500 font-mono tracking-wider uppercase">
              <Shield size={12} className="text-gray-600" />
              <span>SECURED BY SSL ENDPOINTS</span>
            </div>
            
            <button
              onMouseEnter={() => audioEngine.playHover()}
              onClick={handleDetailedBrief}
              className="flex items-center space-x-2 font-mono text-[10px] font-bold text-gray-400 hover:text-white tracking-widest uppercase transition-colors cursor-pointer"
            >
              <FileText size={12} className="text-violet-400" />
              <span>GENERATE COMPREHENSIVE BRIEF</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

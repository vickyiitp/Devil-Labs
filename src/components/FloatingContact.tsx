import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Linkedin, Instagram, Mail, Phone, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contactChannels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      href: 'https://wa.me/918102099678',
      icon: MessageCircle,
      bgColor: 'bg-[#25D366]',
      textColor: 'text-white',
      hoverBorder: 'hover:border-emerald-300',
      label: 'Chat on WhatsApp',
      isExternal: true,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/devillabs',
      icon: Linkedin,
      bgColor: 'bg-[#0077B5]',
      textColor: 'text-white',
      hoverBorder: 'hover:border-sky-300',
      label: 'Connect on LinkedIn',
      isExternal: true,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      href: 'https://instagram.com/devillabs',
      icon: Instagram,
      bgColor: 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500',
      textColor: 'text-white',
      hoverBorder: 'hover:border-pink-300',
      label: 'Follow on Instagram',
      isExternal: true,
    },
    {
      id: 'email',
      name: 'Email Us',
      href: 'mailto:devil.labs.contact@gmail.com',
      icon: Mail,
      bgColor: 'bg-stone-100',
      textColor: 'text-stone-700',
      hoverBorder: 'hover:border-stone-300',
      label: 'Send Direct Email',
      isExternal: false,
    },
    {
      id: 'phone',
      name: 'Call Direct',
      href: 'tel:+918102099678',
      icon: Phone,
      bgColor: 'bg-violet-600',
      textColor: 'text-white',
      hoverBorder: 'hover:border-violet-300',
      label: 'Direct Phone Call',
      isExternal: false,
    },
  ];

  return (
    <div id="contact-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            id="widget-menu"
            className="flex flex-col space-y-2.5 mb-3 items-end p-3 rounded-2xl bg-white/95 border border-stone-200 shadow-[0_10px_35px_rgba(0,0,0,0.1)] backdrop-blur-md w-56 sm:w-60"
          >
            <div className="w-full pb-2 border-b border-stone-200/80 px-2 flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase text-stone-500 tracking-wider flex items-center gap-1">
                <Sparkles size={11} className="text-violet-600" />
                <span>Connect With Us</span>
              </span>
              <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                Online 24/7
              </span>
            </div>

            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  target={channel.isExternal ? '_blank' : '_self'}
                  rel={channel.isExternal ? 'noopener noreferrer' : undefined}
                  title={channel.label}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl ${channel.bgColor} ${channel.textColor} font-sans font-bold text-xs tracking-wide shadow-md transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-98`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon size={16} className="shrink-0" />
                    <span>{channel.name}</span>
                  </div>
                  <span className="text-[10px] opacity-80 font-mono uppercase">
                    {channel.id === 'whatsapp' ? 'Instant' : channel.id === 'email' ? 'Direct' : 'Profile'}
                  </span>
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle contact widget"
        className="group flex items-center space-x-2.5 px-4 py-3.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-stone-900 text-white rounded-full shadow-[0_4px_25px_rgba(124,58,237,0.5)] border border-violet-400/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </motion.div>
        <span className="font-sans font-extrabold text-xs uppercase tracking-wider">
          {isOpen ? 'Close' : '💬 Contact Us'}
        </span>
      </button>
    </div>
  );
}


import { motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { serviceData } from '../data/serviceDetails';

interface ServiceDetailPageProps {
  navigate: (path: string) => void;
  slug: string;
}

export default function ServiceDetailPage({ navigate, slug }: ServiceDetailPageProps) {
  const data = serviceData[slug];

  if (!data) {
    return (
      <div className="pt-32 px-8 text-center max-w-2xl mx-auto h-screen flex flex-col items-center justify-center">
        <h1 className="font-display text-4xl text-white font-bold mb-4 uppercase tracking-tighter">System Error 404</h1>
        <p className="text-gray-400 text-sm mb-8">The requested architectural module does not exist in our current registry.</p>
        <button onClick={() => navigate('/services')} className="px-6 py-3 border border-white/20 hover:border-violet-500 hover:text-violet-400 text-xs font-mono uppercase tracking-widest transition-colors">
          Return to Capabilities
        </button>
      </div>
    );
  }

  const Icon = data.icon;

  const handleInitiate = () => {
    // Navigate to contact page with the pre-filled scope as a URL parameter
    navigate(`/contact?scope=${encodeURIComponent(data.contactValue)}`);
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-16">
        <button onClick={() => navigate('/services')} className="text-gray-500 hover:text-white font-mono text-[10px] tracking-widest uppercase mb-8 flex items-center space-x-2 transition-colors">
          <span>← BACK TO CAPABILITIES</span>
        </button>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-violet-500 font-mono text-xs uppercase tracking-widest font-semibold">// {data.subtitle}</span>
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tighter uppercase leading-none">
              {data.title}
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mt-6 max-w-2xl">
              {data.desc}
            </p>
          </div>
          
          <div className="hidden md:block p-8 bg-white/5 border border-white/10 shadow-neon-violet relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 rounded-full blur-3xl group-hover:bg-violet-500/30 transition-all" />
            <Icon size={48} className="text-violet-400 relative z-10" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {data.features.map((feature: any, idx: number) => {
          let statusColor = "text-emerald-500 bg-emerald-500";
          let statusLabel = "Active";
          if (feature.status === 'maintenance') {
            statusColor = "text-amber-500 bg-amber-500";
            statusLabel = "Maintenance";
          } else if (feature.status === 'beta') {
            statusColor = "text-violet-400 bg-violet-400";
            statusLabel = "Beta Deploy";
          }
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 bg-black/40 border border-white/5 hover:border-violet-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusColor.split(' ')[1]} animate-pulse`} />
                  <span className={`text-[9px] ${statusColor.split(' ')[0]} font-mono tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity`}>{statusLabel}</span>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Check size={16} className="text-violet-500" />
                <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight">{feature.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed pl-7 pr-12">{feature.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {data.faqs && data.faqs.length > 0 && (
        <div className="mb-20">
          <div className="mb-10 text-center">
             <span className="text-violet-500 font-mono text-[10px] uppercase tracking-widest font-bold mb-3 block">CLIENT-FRIENDLY BREAKDOWN</span>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tighter uppercase">Common Questions</h2>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {data.faqs.map((faq: any, idx: number) => (
              <details key={idx} className="group border border-white/10 bg-white/5 p-6 cursor-pointer open:bg-white/10 transition-colors focus-within:ring-2 focus-within:ring-violet-500 focus-within:border-transparent">
                <summary className="font-display font-bold text-lg text-white list-none flex justify-between items-center outline-none rounded-sm">
                  <span>{faq.q}</span>
                  <span className="text-violet-400 font-mono text-xl group-open:rotate-45 transition-transform duration-200" aria-hidden="true">+</span>
                </summary>
                <div className="mt-4 text-gray-400 text-sm leading-relaxed" role="region" aria-label={faq.q}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      <div className="border border-white/5 bg-gradient-to-r from-violet-950/10 via-black/40 to-indigo-950/10 p-8 sm:p-16 flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-violet-600/20 blur-[100px] pointer-events-none" />
        
        <span className="text-violet-500 font-mono text-xs uppercase tracking-widest font-semibold relative z-10">// INITIALIZE THIS SYSTEM</span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tighter leading-tight relative z-10">
          Ready to deploy <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">this architecture?</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-md leading-relaxed relative z-10">
          Uplink your requirements. Our system will pre-fill the transmission packet for {data.title}.
        </p>
        <button
          onClick={handleInitiate}
          className="px-8 py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-violet-600 hover:text-white hover:border-violet-500 transition-all duration-300 flex items-center space-x-3 cursor-pointer shadow-neon-violet relative z-10"
        >
          <span>AUTO-FILL TRANSMISSION</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

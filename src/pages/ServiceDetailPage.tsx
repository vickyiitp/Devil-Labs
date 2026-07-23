import { motion } from "motion/react";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import React from "react";
import { useCurrency } from '../contexts/CurrencyContext';
import { serviceData } from "../data/serviceDetails";
import PolishedFeatureMarquee from "../components/PolishedFeatureMarquee";

interface ServiceDetailPageProps {
  navigate: (path: string) => void;
  slug: string;
}

export default function ServiceDetailPage({
  navigate,
  slug,
}: ServiceDetailPageProps) {
  const { currency } = useCurrency();
  const data = serviceData[slug];

  if (!data) {
    return (
      <div className="pt-32 px-8 text-center max-w-2xl mx-auto h-screen flex flex-col items-center justify-center text-stone-800">
        <h1 className="font-display text-4xl font-extrabold mb-4 uppercase tracking-tighter text-stone-850">
          System Error 404
        </h1>
        <p className="text-stone-500 text-sm mb-8">
          The requested architectural module does not exist in our current
          registry.
        </p>
        <button
          onClick={() => navigate("/services")}
          className="px-6 py-3 clay-button text-xs font-mono uppercase tracking-widest"
        >
          Return to Capabilities
        </button>
      </div>
    );
  }

  const Icon = data.icon;

  const handleInitiate = () => {
    localStorage.setItem('selectedPlanScope', data.contactValue);
    localStorage.setItem('selectedService', data.title);
    localStorage.removeItem('selectedPlan'); // No plan selected, just the service
    navigate(`/contact?scope=${encodeURIComponent(data.contactValue)}&service=${encodeURIComponent(data.title)}`);
  };

  const handlePlanSelect = (planName: string) => {
    // We map the plan name to the contact scopes
    let scopeStr = 'Web App';
    if (planName.includes('Starter')) scopeStr = 'MVP Build (Starter)';
    if (planName.includes('Professional')) scopeStr = 'Full-Stack + AI (Professional)';
    if (planName.includes('Enterprise')) scopeStr = 'Retainer / Enterprise';
    localStorage.setItem('selectedPlanScope', scopeStr);
    localStorage.setItem('selectedService', data.title);
    localStorage.setItem('selectedPlan', planName);
    navigate(`/contact?scope=${encodeURIComponent(scopeStr)}&service=${encodeURIComponent(data.title)}&plan=${encodeURIComponent(planName)}`);
  };

  return (
    <div className="pt-28 pb-24 px-4 md:px-8 max-w-7xl mx-auto text-stone-800">
      <div className="mb-16">
        <button
          onClick={() => navigate("/services")}
          className="text-stone-500 hover:text-stone-900 font-sans text-xs font-bold tracking-widest uppercase mb-8 flex items-center space-x-2 transition-colors clay-button px-4 py-2 cursor-pointer"
        >
          <ArrowLeft size={12} className="text-violet-600" />
          <span>BACK TO SERVICES</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-violet-600 font-sans text-xs uppercase tracking-widest font-extrabold block">
              ✦ {data.subtitle}
            </span>
            <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl md:text-7xl text-stone-850 tracking-tighter uppercase leading-none break-words max-w-full">
              {data.title}
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed mt-6 max-w-2xl">
              {data.desc}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-20">
        {data.features.map((feature: any, idx: number) => {
          let statusColor = "text-emerald-600 bg-emerald-500";
          let statusLabel = "Production Ready";
          if (feature.status === "maintenance") {
            statusColor = "text-amber-600 bg-amber-500";
            statusLabel = "Managed Service";
          } else if (feature.status === "beta") {
            statusColor = "text-violet-600 bg-violet-400";
            statusLabel = "Available Feature";
          }

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 clay-card relative overflow-hidden group text-left"
            >
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-stone-100/80 px-2.5 py-1 rounded-full border border-stone-200/40">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${statusColor.split(" ")[1]} animate-pulse`}
                />
                <span
                  className={`text-[10px] ${statusColor.split(" ")[0]} font-sans tracking-widest uppercase font-extrabold`}
                >
                  {statusLabel}
                </span>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Check size={16} className="text-violet-600" />
                <h3 className="font-display font-extrabold text-xl text-stone-800 uppercase tracking-tight">
                  {feature.title}
                </h3>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed pl-7 pr-12 font-sans font-light">
                {feature.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {data.plans && data.plans.length > 0 && (
        <div className="mb-20">
          <div className="mb-10 text-center">
            <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-bold mb-3 block">
              TRANSPARENT PRICING
            </span>
            <h2 className="font-display font-extrabold text-3xl text-stone-850 tracking-tighter uppercase">
              Service Plans
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {data.plans.map((plan: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 md:p-8 rounded-[32px] clay-card relative flex flex-col justify-between text-left ${ plan.highlight ? 'border-violet-300 bg-[#fbf9f4] shadow-[12px_16px_40px_rgba(139,92,246,0.12),-12px_-16px_40px_#ffffff]' : '' }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-600 text-white font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full font-bold shadow-sm">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="font-display font-extrabold text-xl text-stone-800 uppercase tracking-tight mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-display font-black text-stone-850 mb-4">
                    {(() => {
                      const numStr = plan.price.replace(/[^0-9]/g, '');
                      if (!numStr) return plan.price;
                      const inrVal = parseInt(numStr, 10);
                      const usdVal = Math.round(inrVal / 40); // 40 multiplier as per our fix_estimator
                      const hasPlus = plan.price.includes('+');
                      if (currency === 'INR') {
                        return `₹${inrVal.toLocaleString('en-IN')}${hasPlus ? '+' : ''}`;
                      } else {
                        return `$${usdVal.toLocaleString('en-US')}${hasPlus ? '+' : ''}`;
                      }
                    })()}
                  </div>
                  <p className="text-stone-500 text-xs mb-6 leading-relaxed font-light">
                    {plan.description}
                  </p>
                  <div className="space-y-3 mb-8 border-t border-stone-200/30 pt-4">
                    {plan.features.map((feat: string, i: number) => (
                      <div key={i} className="flex items-start space-x-3 text-xs">
                        <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-stone-600 font-sans font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handlePlanSelect(plan.name)}
                  className={`w-full py-3 font-mono text-xs font-bold uppercase tracking-widest transition-all rounded-xl cursor-pointer ${
                    plan.highlight 
                      ? 'clay-violet-solid' 
                      : 'clay-button'
                  }`}
                >
                  Select Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {data.faqs && data.faqs.length > 0 && (
        <div className="mb-20">
          <div className="mb-10 text-center">
            <span className="text-violet-600 font-mono text-xs uppercase tracking-widest font-bold mb-3 block">
              CLIENT-FRIENDLY BREAKDOWN
            </span>
            <h2 className="font-display font-extrabold text-3xl text-stone-850 tracking-tighter uppercase">
              Common Questions
            </h2>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {data.faqs.map((faq: any, idx: number) => (
              <details
                key={idx}
                className="group p-6 md:p-8 cursor-pointer rounded-[24px] clay-card hover:scale-[1.01] transition-all duration-300"
              >
                <summary className="font-display font-extrabold text-lg text-stone-800 list-none flex justify-between items-center outline-none select-none">
                  <span>{faq.q}</span>
                  <span
                    className="text-violet-600 font-mono text-xl group-open:rotate-45 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div
                  className="mt-4 text-stone-600 text-sm leading-relaxed pl-1 font-sans font-light border-t border-stone-200/30 pt-4 text-left"
                  role="region"
                  aria-label={faq.q}
                >
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* NEW: DELIVERABLES CAPABILITIES OVERVIEW MARQUEE */}
      <div className="mb-20">
        <PolishedFeatureMarquee />
      </div>

      <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto relative overflow-hidden clay-card bg-gradient-to-br from-[#faf9f5] to-[#fdfcf9]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-violet-200/20 blur-[100px] pointer-events-none" />

        <span className="text-violet-600 font-sans text-xs uppercase tracking-widest font-extrabold relative z-10">
          ✦ GET STARTED WITH THIS SERVICE
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-stone-850 uppercase tracking-tighter leading-tight relative z-10">
          Ready to launch <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-rose-500 font-serif italic font-light lowercase">
            this solution?
          </span>
        </h2>
        <p className="text-stone-500 text-sm max-w-md leading-relaxed relative z-10 font-sans font-light">
          Get in touch with our team. We'll pre-fill your inquiry form for {data.title} so we can get straight to work.
        </p>
        <button
          onClick={handleInitiate}
          className="px-8 py-4 clay-violet-solid font-sans font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all duration-300 flex items-center space-x-3 cursor-pointer shadow-md relative z-10"
        >
          <span>START INQUIRY</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

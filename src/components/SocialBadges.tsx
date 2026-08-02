import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Github, Instagram, Twitter, Youtube, ExternalLink, Check, Copy, ShieldCheck, Award, Sparkles } from 'lucide-react';

interface SocialBadgesProps {
  showEmbedCode?: boolean;
  className?: string;
}

export default function SocialBadges({ showEmbedCode = true, className = "" }: SocialBadgesProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'badges' | 'embed'>('badges');

  useEffect(() => {
    // Load LinkedIn Badge JS script dynamically if not present
    if (!document.getElementById('linkedin-badge-script')) {
      const script = document.createElement('script');
      script.id = 'linkedin-badge-script';
      script.src = 'https://platform.linkedin.com/badges/js/profile.js';
      script.async = true;
      script.defer = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    } else if ((window as any).IN && (window as any).IN.parse) {
      (window as any).IN.parse();
    }
  }, []);

  const embedCodeSnippet = `<!-- Step 1: LinkedIn SDK Script (Place once in head or before closing body tag) -->
<script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>

<!-- Step 2: Personal LinkedIn Badge (Vicky Kumar - vickyiitp) -->
<div class="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="vickyiitp" data-version="v1">
  <a class="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/vickyiitp?trk=profile-badge">VICKY KUMAR</a>
</div>

<!-- Step 3: Devil Labs Company Badge -->
<div class="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="devillabs" data-version="v1">
  <a class="badge-base__link LI-simple-link" href="https://linkedin.com/company/devillabs">Devil Labs</a>
</div>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialLinks = [
    {
      name: 'LinkedIn Personal',
      handle: 'vickyiitp',
      role: 'Founder & AI Architect (IIT Patna)',
      url: 'https://in.linkedin.com/in/vickyiitp',
      icon: Linkedin,
      color: 'from-blue-600 to-cyan-500',
      badgeText: 'Verified Profile'
    },
    {
      name: 'LinkedIn Company',
      handle: 'devillabs',
      role: 'Official Agency & AI Lab',
      url: 'https://linkedin.com/company/devillabs',
      icon: Linkedin,
      color: 'from-blue-500 to-indigo-600',
      badgeText: 'Official Company'
    },
    {
      name: 'GitHub Profile',
      handle: 'vickyiitp',
      role: 'Core Repositories & Open Source',
      url: 'https://github.com/vickyiitp',
      icon: Github,
      color: 'from-purple-600 to-pink-600',
      badgeText: '50+ Repositories'
    },
    {
      name: 'GitHub Organization',
      handle: 'Devil-Labs',
      role: 'Official Codebase & Releases',
      url: 'https://github.com/Devil-Labs',
      icon: Github,
      color: 'from-stone-700 to-stone-900',
      badgeText: 'Org Verified'
    },
    {
      name: 'Instagram',
      handle: '@vickyiitp / @devillabs',
      role: 'Tech Culture & Behind the Scenes',
      url: 'https://instagram.com/vickyiitp',
      icon: Instagram,
      color: 'from-pink-500 via-red-500 to-yellow-500',
      badgeText: 'Live Updates'
    }
  ];

  return (
    <section className={`w-full py-8 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED IDENTITY &amp; CROSS-PLATFORM PROOF</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Connect &amp; Verify Our Official Profiles
          </h2>
          <p className="text-stone-400 text-sm md:text-base max-w-2xl mx-auto">
            Cross-verify our credentials, open-source repositories, client recommendations, and official identity across all major tech platforms.
          </p>
        </div>

        {/* Tab Selector */}
        {showEmbedCode && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-stone-900/80 border border-stone-800 rounded-xl">
              <button
                onClick={() => setActiveTab('badges')}
                className={`px-5 py-2 text-xs md:text-sm font-medium rounded-lg transition-all ${
                  activeTab === 'badges'
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Official Social Profiles
              </button>
              <button
                onClick={() => setActiveTab('embed')}
                className={`px-5 py-2 text-xs md:text-sm font-medium rounded-lg transition-all ${
                  activeTab === 'embed'
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Embed Scripts &amp; Badges
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Interactive Profile Cards & LinkedIn SDK Badge Container */}
        {activeTab === 'badges' && (
          <div className="space-y-8">
            {/* Native LinkedIn Embed Container */}
            <div className="p-6 md:p-8 rounded-2xl bg-stone-900/60 border border-stone-800 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Official LinkedIn Profile Badge</h3>
                    <p className="text-xs text-stone-400">Directly integrated via LinkedIn JavaScript SDK</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-mono">
                  <Award className="w-3.5 h-3.5" /> IIT Patna Alumnus
                </span>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-around gap-6">
                {/* Vicky Kumar Badge Embed */}
                <div className="w-full lg:w-1/2 flex flex-col items-center p-4 rounded-xl bg-stone-950/80 border border-stone-800">
                  <span className="text-xs text-stone-400 font-mono mb-3 uppercase tracking-wider">Founder Personal Profile</span>
                  <div 
                    className="badge-base LI-profile-badge min-h-[280px] flex items-center justify-center" 
                    data-locale="en_US" 
                    data-size="large" 
                    data-theme="dark" 
                    data-type="HORIZONTAL" 
                    data-vanity="vickyiitp" 
                    data-version="v1"
                  >
                    <a className="badge-base__link LI-simple-link text-violet-400 font-mono hover:underline" href="https://in.linkedin.com/in/vickyiitp?trk=profile-badge">
                      VICKY KUMAR (vickyiitp)
                    </a>
                  </div>
                </div>

                {/* Devil Labs Company Badge Embed */}
                <div className="w-full lg:w-1/2 flex flex-col items-center p-4 rounded-xl bg-stone-950/80 border border-stone-800">
                  <span className="text-xs text-stone-400 font-mono mb-3 uppercase tracking-wider">Official Agency Page</span>
                  <div 
                    className="badge-base LI-profile-badge min-h-[280px] flex items-center justify-center" 
                    data-locale="en_US" 
                    data-size="large" 
                    data-theme="dark" 
                    data-type="HORIZONTAL" 
                    data-vanity="devillabs" 
                    data-version="v1"
                  >
                    <a className="badge-base__link LI-simple-link text-violet-400 font-mono hover:underline" href="https://linkedin.com/company/devillabs">
                      Devil Labs Agency
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid of Profile Quick-Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialLinks.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="group relative p-5 rounded-2xl bg-stone-900/40 hover:bg-stone-900/80 border border-stone-800 hover:border-violet-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                          {item.badgeText}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-white group-hover:text-violet-400 transition-colors flex items-center gap-1.5">
                        {item.name}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-xs font-mono text-stone-400 mt-0.5">{item.handle}</p>
                      <p className="text-xs text-stone-400 mt-2">{item.role}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Embed Code Snippet Generator */}
        {activeTab === 'embed' && showEmbedCode && (
          <div className="p-6 md:p-8 rounded-2xl bg-stone-900/80 border border-stone-800 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-stone-300 font-mono text-xs md:text-sm">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Copy Script &amp; Badge Code for External Sites / Blogs</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-all shadow-md"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Code!' : 'Copy Snippet'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-violet-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
              {embedCodeSnippet}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}

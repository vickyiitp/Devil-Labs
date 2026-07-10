const fs = require('fs');

let content = fs.readFileSync('src/pages/ProjectsPage.tsx', 'utf8');

const clientSection = `{section === 'client' ? (
        <motion.div
          key="client-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
        >
          {/* Project Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {CLIENT_PROJECTS.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="group cursor-default h-full relative"
                >
                  <CyberFrame glowColor={['violet', 'fuchsia', 'blue'][project.id % 3] as 'violet' | 'fuchsia' | 'blue'} className="p-4 rounded-xl cursor-default bg-black/40 h-full flex flex-col opacity-75">
                    {/* Thumbnail / Live Preview */}
                    <div className={\`w-full aspect-[4/3] bg-gradient-to-br \${project.thumbnail} rounded-lg overflow-hidden relative mb-4 border border-white/5 transition-all duration-300 flex flex-col\`}>
                      {/* Browser Header */}
                      <div className="h-6 w-full bg-black/60 border-b border-white/10 flex items-center px-3 space-x-1.5 shrink-0 z-20 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-red-500/80" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <div className="w-2 h-2 rounded-full bg-green-500/80" />
                        <div className="ml-2 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[8px] font-mono text-gray-400 truncate max-w-[200px]">
                          {project.link.replace(/^https?:\\/\\//, '')}
                        </div>
                      </div>
                      
                      {/* Browser Content - Placeholder since it's in development */}
                      <div className="relative flex-grow w-full overflow-hidden bg-[#050505] flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-black/80 flex flex-col items-center justify-center p-6 text-center z-10 backdrop-blur-sm">
                            <Lock size={32} className="text-violet-500/50 mb-3" />
                            <div className="text-white font-display font-bold text-lg uppercase tracking-wider mb-2">Development Phase</div>
                            <div className="bg-violet-600/20 text-violet-400 px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border border-violet-500/30">
                              Coming Soon
                            </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex-grow flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-display font-bold text-lg leading-tight uppercase tracking-tight">{project.title}</h3>
                          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mt-1">Client: {project.client}</p>
                        </div>
                        {project.isPro && (
                          <div className="px-2 py-1 rounded text-[8px] font-mono font-bold tracking-widest uppercase bg-violet-600/20 text-violet-400 border border-violet-500/20 shrink-0 mt-1">
                            PRO
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <project.icon size={14} className="text-violet-500" />
                          <span className="text-[10px] font-mono uppercase tracking-widest">{project.tech}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-500 text-xs font-mono">
                           <span>Private Repo</span>
                        </div>
                      </div>
                    </div>
                  </CyberFrame>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : (`;

const clientProjectsArray = `const CLIENT_PROJECTS = [
  {
    id: 101,
    title: 'Nexus // Enterprise CRM',
    client: 'Confidential (FinTech)',
    category: 'SaaS & Business',
    isPro: true,
    thumbnail: 'from-violet-900/40 to-black',
    icon: Building2,
    tech: 'React / Node',
    link: 'https://nexus-crm-dev.client.app',
    inDevelopment: true
  },
  {
    id: 102,
    title: 'Aura // Health Portal',
    client: 'Confidential (Healthcare)',
    category: 'AI & Automation',
    isPro: true,
    thumbnail: 'from-emerald-900/40 to-black',
    icon: Heart,
    tech: 'AI / HIPAA',
    link: 'https://aura-portal.client.app',
    inDevelopment: true
  },
  {
    id: 103,
    title: 'Vanguard // Analytics',
    client: 'Confidential (Logistics)',
    category: 'SaaS & Business',
    isPro: true,
    thumbnail: 'from-fuchsia-900/40 to-black',
    icon: BrainCircuit,
    tech: 'Data / Dashboards',
    link: 'https://vanguard-analytics.client.app',
    inDevelopment: true
  }
];`;

content = content.replace('const DEMO_PROJECTS = [', clientProjectsArray + '\n\nconst DEMO_PROJECTS = [');

const regex = /\{section === 'client' \? \([\s\S]*?\) : \(/;
content = content.replace(regex, clientSection);

fs.writeFileSync('src/pages/ProjectsPage.tsx', content);
console.log('Fixed projects page');

import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';

export default function InsightsPage({ navigate }: { navigate: (path: string) => void }) {
  const articles = [
    {
      id: 1,
      tag: '[Architecture]',
      title: 'Microservices vs. Monoliths in the Era of AI Agents',
      excerpt: 'Evaluating the cost of network latency when routing LLM responses through distributed systems.',
      readTime: '6 MIN READ'
    },
    {
      id: 2,
      tag: '[AI Agents]',
      title: 'The Fallacy of Zero-Shot Enterprise Deployments',
      excerpt: 'Why raw foundation models fail in production, and how strict structural guardrails prevent catastrophic logic loops.',
      readTime: '12 MIN READ'
    },
    {
      id: 3,
      tag: '[Systems Design]',
      title: 'State Management for Real-Time LLM Streams',
      excerpt: 'Strategies for handling token-by-token streaming in React Server Components without blocking the main thread.',
      readTime: '8 MIN READ'
    },
    {
      id: 4,
      tag: '[Security]',
      title: 'Hardening Agentic Workflows Against Prompt Injection',
      excerpt: 'An architectural review of isolation layers and query sanitization techniques for public-facing AI.',
      readTime: '15 MIN READ'
    }
  ];

  return (
    <div className="pt-32 pb-12 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-b border-white/10 pb-12"
        >
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 text-white">Lab Notes.</h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed text-sm md:text-base">
            Research and intelligence on AI automation and scalable web architecture. Signal. No noise.
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group relative border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer mb-20 overflow-hidden"
          onClick={() => {}}
        >
          {/* Abstract Placeholder Image Area */}
          <div className="h-64 md:h-96 w-full bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center">
            {/* Abstract geometric shapes */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-violet-500/20 rounded-full mix-blend-screen group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 border border-white/10 mix-blend-screen group-hover:rotate-45 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
          </div>

          <div className="p-8 md:p-12 relative z-10 -mt-20 md:-mt-32">
            <span className="text-violet-400 font-bold text-[10px] tracking-widest uppercase mb-4 block bg-black/50 w-max px-3 py-1 border border-white/10 backdrop-blur-sm">[Vibe Coding]</span>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase mb-6 group-hover:text-violet-100 transition-colors">
              Why Vibe Coding is Replacing Traditional Frontend Development
            </h2>
            <p className="text-gray-400 max-w-3xl leading-relaxed text-sm mb-8">
              An inside look at how AI-assisted generation is shifting the role of the developer from a syntax writer to an architectural director, and what this means for enterprise delivery speeds.
            </p>
            <div className="flex items-center space-x-2 text-white font-bold text-xs tracking-widest uppercase group-hover:text-violet-400 transition-colors">
              <span>Read Post</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>

        {/* Article Grid (Masonry-style layout via columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mb-32">
          {articles.map((article, idx) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="break-inside-avoid border border-white/10 bg-[#050505] p-8 hover:bg-[#111] transition-colors cursor-pointer group"
            >
              <span className="text-violet-500 font-bold text-[10px] tracking-widest uppercase mb-4 block">{article.tag}</span>
              <h3 className="text-xl font-display font-bold text-white tracking-tight mb-4 group-hover:text-violet-200 transition-colors shadow-black">
                {article.title}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-8">
                {article.excerpt}
              </p>
              <div className="text-[10px] text-gray-600 font-bold tracking-widest">
                {article.readTime}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Client Feedback Highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-24 p-8 border border-white/5 bg-[#050505]/60 rounded-2xl relative overflow-hidden font-mono"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-3xl rounded-full" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] text-violet-400 font-bold tracking-widest uppercase block">// ARCHITECTURE VALIDATION</span>
              <p className="text-sm text-gray-300 italic font-sans leading-relaxed">
                "Devil Labs operates at the absolute peak of modern software velocity. Their secure, type-safe full-stack micro-architecture allowed our product team to launch and scale instantly."
              </p>
              <p className="text-xs text-gray-500 font-mono">
                — Vicky IITP, Founder & Lead Architect at <span className="text-white">vickyiitp.tech</span>
              </p>
            </div>
            <button 
              onClick={() => navigate('/process')}
              className="px-5 py-2.5 bg-white/5 hover:bg-violet-600/20 text-white font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 rounded border border-white/10 hover:border-violet-500 shrink-0"
            >
              VIEW PROCESS & FEEDBACKS
            </button>
          </div>
        </motion.div>

      </div>

      {/* Terminal Subscribe */}
      <div className="border-t border-white/10 bg-[#020202] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-3 mb-6 text-gray-500">
            <Terminal size={18} />
            <span className="text-xs uppercase tracking-widest">Secure Transmission Line</span>
          </div>
          <form 
            onSubmit={(e) => { e.preventDefault(); alert('Uplink established.'); }}
            className="flex items-center flex-wrap sm:flex-nowrap gap-4 font-mono text-sm"
          >
            <span className="text-violet-500 font-bold shrink-0">{`> Subscribe to the manifest:`}</span>
            <input 
              type="email"
              required
              placeholder="[Enter Email]"
              className="bg-transparent border-none text-white focus:outline-none focus:ring-0 placeholder-gray-700 flex-grow min-w-[200px]"
            />
            <button type="submit" className="text-white hover:text-violet-400 transition-colors shrink-0">
              [ENTER]
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

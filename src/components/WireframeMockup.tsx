import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Terminal, ShieldCheck, Database, Layers, Globe, Zap, ArrowRight, Server, RefreshCw } from 'lucide-react';

interface WireframeMockupProps {
  mode: 'ai' | 'web';
}

export default function WireframeMockup({ mode }: WireframeMockupProps) {
  return (
    <div className="w-full bg-[#0a0a0a]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1.5px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
      
      {/* Visual Frame Header */}
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
          </div>
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest pl-2">
            SYSTEM_SCHEMATIC_v2.0 // {mode.toUpperCase()}_MODE
          </span>
        </div>
        <div className="flex items-center space-x-1.5 bg-[#111] px-2.5 py-1 rounded-md border border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] font-mono text-stone-400 uppercase tracking-wider">LIVE_RENDER</span>
        </div>
      </div>

      {mode === 'ai' ? (
        /* AI AGENT PIPELINE SCHEMATIC */
        <div className="relative min-h-[300px] flex flex-col justify-between z-10">
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="flow-grad-ai" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Input to Orchestrator */}
            <path
              d="M 50,75 L 140,75"
              fill="none"
              stroke="url(#flow-grad-ai)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="animate-[dash_10s_linear_infinite]"
            />
            {/* Orchestrator to Knowledge Hub */}
            <path
              d="M 200,75 C 240,75 240,165 280,165"
              fill="none"
              stroke="url(#flow-grad-ai)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Orchestrator to Sandbox */}
            <path
              d="M 200,75 C 240,75 240,-15 280,-15"
              fill="none"
              stroke="url(#flow-grad-ai)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Parallel nodes to SLA Auditor */}
            <path
              d="M 380,-15 C 420,-15 420,75 460,75"
              fill="none"
              stroke="url(#flow-grad-ai)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 380,165 C 420,165 420,75 460,75"
              fill="none"
              stroke="url(#flow-grad-ai)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Top Row: Context Setup */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-3 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-stone-900 border border-white/10 flex items-center justify-center shadow-lg">
                  <Terminal size={18} className="text-stone-400" />
                </div>
                <span className="text-[9px] font-mono text-stone-400 mt-2 uppercase text-center tracking-wide font-bold">
                  USER_PROMPT
                </span>
              </div>
            </div>
            
            <div className="col-span-1" />

            <div className="col-span-4 flex justify-center">
              <motion.div 
                animate={{ boxShadow: ['0 0 0px rgba(139,92,246,0.1)', '0 0 15px rgba(139,92,246,0.3)', '0 0 0px rgba(139,92,246,0.1)'] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex flex-col items-center bg-[#111] border border-violet-500/20 p-3.5 rounded-xl w-full"
              >
                <Cpu size={20} className="text-violet-400 animate-pulse" />
                <span className="text-[10px] font-sans font-extrabold text-white mt-1.5 uppercase text-center tracking-tight">
                  Orchestrator
                </span>
                <span className="text-[8px] font-mono text-violet-400/80 mt-0.5 uppercase tracking-wide">
                  AGENT_CORE.TS
                </span>
              </motion.div>
            </div>
          </div>

          {/* Middle Row: Parallel Sandbox & Knowledge Retrievals */}
          <div className="grid grid-cols-12 gap-4 items-center my-6">
            <div className="col-span-6 flex justify-end pr-2">
              <div className="flex flex-col items-center bg-[#111] border border-white/5 hover:border-pink-500/20 p-3.5 rounded-xl w-36 transition-all duration-300">
                <Layers size={18} className="text-pink-400" />
                <span className="text-[9px] font-sans font-extrabold text-white mt-1.5 uppercase text-center tracking-tight">
                  Execution Sandbox
                </span>
                <span className="text-[7px] font-mono text-stone-500 mt-0.5 uppercase tracking-wide">
                  SECURE_ISOLATED
                </span>
              </div>
            </div>

            <div className="col-span-6 flex justify-start pl-2">
              <div className="flex flex-col items-center bg-[#111] border border-white/5 hover:border-pink-500/20 p-3.5 rounded-xl w-36 transition-all duration-300">
                <Database size={18} className="text-pink-400" />
                <span className="text-[9px] font-sans font-extrabold text-white mt-1.5 uppercase text-center tracking-tight">
                  Context / RAG
                </span>
                <span className="text-[7px] font-mono text-stone-500 mt-0.5 uppercase tracking-wide">
                  VECTOR_RECALL
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Validation & SLA Audit */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4" />
            <div className="col-span-4 flex justify-center">
              <motion.div 
                animate={{ borderColor: ['rgba(236,72,153,0.2)', 'rgba(236,72,153,0.5)', 'rgba(236,72,153,0.2)'] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="flex flex-col items-center bg-[#111] border p-3.5 rounded-xl w-full"
              >
                <ShieldCheck size={20} className="text-pink-400" />
                <span className="text-[10px] font-sans font-extrabold text-white mt-1.5 uppercase text-center tracking-tight">
                  SLA / Audit Gate
                </span>
                <span className="text-[8px] font-mono text-pink-400/80 mt-0.5 uppercase tracking-wide">
                  OUTPUT_VALIDATION
                </span>
              </motion.div>
            </div>
            
            <div className="col-span-1 flex justify-center">
              <ArrowRight size={14} className="text-stone-600 animate-[bounce_2s_infinite]" />
            </div>

            <div className="col-span-3 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-stone-900 border border-emerald-500/20 flex items-center justify-center shadow-lg">
                  <ShieldCheck size={18} className="text-emerald-400" />
                </div>
                <span className="text-[9px] font-mono text-emerald-400 mt-2 uppercase text-center tracking-wide font-bold">
                  VERIFIED_OUTPUT
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* HIGH-VELOCITY WEB PLATFORM SCHEMATIC */
        <div className="relative min-h-[300px] flex flex-col justify-between z-10">
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="flow-grad-web" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* User to CDN */}
            <path
              d="M 50,75 L 140,75"
              fill="none"
              stroke="url(#flow-grad-web)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="animate-[dash_10s_linear_infinite]"
            />
            {/* CDN to Load Balancer */}
            <path
              d="M 200,75 L 280,75"
              fill="none"
              stroke="url(#flow-grad-web)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Load Balancer to Web Server nodes */}
            <path
              d="M 340,75 C 370,75 370,165 400,165"
              fill="none"
              stroke="url(#flow-grad-web)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 340,75 C 370,75 370,-15 400,-15"
              fill="none"
              stroke="url(#flow-grad-web)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Top Row: User Request & Edge delivery */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-3 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-stone-900 border border-white/10 flex items-center justify-center shadow-lg">
                  <Globe size={18} className="text-stone-400" />
                </div>
                <span className="text-[9px] font-mono text-stone-400 mt-2 uppercase text-center tracking-wide font-bold">
                  CLIENT_BROWSER
                </span>
              </div>
            </div>
            
            <div className="col-span-1" />

            <div className="col-span-4 flex justify-center">
              <motion.div 
                animate={{ boxShadow: ['0 0 0px rgba(59,130,246,0.1)', '0 0 15px rgba(59,130,246,0.3)', '0 0 0px rgba(59,130,246,0.1)'] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex flex-col items-center bg-[#111] border border-blue-500/20 p-3.5 rounded-xl w-full"
              >
                <Zap size={20} className="text-blue-400 animate-bounce" />
                <span className="text-[10px] font-sans font-extrabold text-white mt-1.5 uppercase text-center tracking-tight">
                  Global Edge CDN
                </span>
                <span className="text-[8px] font-mono text-blue-400/80 mt-0.5 uppercase tracking-wide">
                  100% CACHE_HIT
                </span>
              </motion.div>
            </div>
          </div>

          {/* Middle Row: Secure Gateway */}
          <div className="grid grid-cols-12 gap-4 items-center my-4">
            <div className="col-span-4" />
            <div className="col-span-4 flex justify-center">
              <div className="flex flex-col items-center bg-[#111] border border-white/5 hover:border-emerald-500/20 p-3.5 rounded-xl w-full transition-all duration-300">
                <Server size={18} className="text-emerald-400 animate-pulse" />
                <span className="text-[9px] font-sans font-extrabold text-white mt-1.5 uppercase text-center tracking-tight">
                  Load Balancer Proxy
                </span>
                <span className="text-[7px] font-mono text-stone-500 mt-0.5 uppercase tracking-wide">
                  Nginx / HAProxy Gateway
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Microservices / Cluster Scale */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-6 flex justify-end pr-2">
              <div className="flex flex-col items-center bg-[#111] border border-white/5 hover:border-emerald-500/20 p-3.5 rounded-xl w-36 transition-all duration-300">
                <RefreshCw size={18} className="text-emerald-400" />
                <span className="text-[9px] font-sans font-extrabold text-white mt-1.5 uppercase text-center tracking-tight">
                  App server Node_A
                </span>
                <span className="text-[7px] font-mono text-stone-500 mt-0.5 uppercase tracking-wide">
                  CLUSTER_REPLICA_1
                </span>
              </div>
            </div>

            <div className="col-span-6 flex justify-start pl-2">
              <div className="flex flex-col items-center bg-[#111] border border-white/5 hover:border-emerald-500/20 p-3.5 rounded-xl w-36 transition-all duration-300">
                <Database size={18} className="text-emerald-400" />
                <span className="text-[9px] font-sans font-extrabold text-white mt-1.5 uppercase text-center tracking-tight">
                  Database / Redis
                </span>
                <span className="text-[7px] font-mono text-stone-500 mt-0.5 uppercase tracking-wide">
                  HIGH_CONCURRENCY
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styled connection lines SVG animation keyframes */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  );
}

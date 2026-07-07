import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';
import CyberFrame from './CyberFrame';

export default function SimulatedTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  const commandSequence = [
    "INITIATING DEVIL_LABS_CORE_V2.0...",
    "ESTABLISHING SECURE NEURAL LINK: DONE",
    "LOADING AUTONOMOUS AI AGENTS:",
    "  > AGENT_01 (DATA_SYNTH) ... READY",
    "  > AGENT_02 (LOGIC_PROG) ... READY",
    "  > AGENT_03 (AUTO_DEPLOY) ... READY",
    "BYPASSING STANDARD PROTOCOLS...",
    "ACCESS GRANTED.",
    " ",
    "SYSTEMS ONLINE.",
    "WAITING FOR DIRECTIVE..."
  ];

  useEffect(() => {
    let currentLine = 0;
    
    const typeLine = () => {
      if (currentLine < commandSequence.length) {
        setLines(prev => [...prev, commandSequence[currentLine]]);
        currentLine++;
        setTimeout(typeLine, Math.random() * 200 + 100); // Random delay between 100-300ms
      } else {
        setIsTyping(false);
      }
    };

    const timeout = setTimeout(typeLine, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-20"
    >
      <CyberFrame glowColor="fuchsia" className="w-full h-full bg-black/90 backdrop-blur-md rounded-2xl overflow-hidden font-mono text-[10px] sm:text-xs text-violet-400 p-6 flex flex-col shadow-[0_0_50px_rgba(139,92,246,0.15)]">
        <div className="flex items-center space-x-3 mb-6 border-b border-violet-500/20 pb-4">
          <Terminal size={16} className="text-violet-500" />
          <span className="uppercase tracking-widest text-white/50">Terminal.exe</span>
          <div className="flex-1" />
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={line.startsWith('>') || line.startsWith(' ') ? "text-gray-400 ml-4" : "text-violet-400 font-bold"}
            >
              {line}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-violet-400 inline-block mt-2"
            />
          )}
          {!isTyping && (
            <div className="flex items-center space-x-2 mt-4 text-white">
              <span className="text-violet-500 font-bold">root@devil-labs:~#</span>
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-white inline-block"
              />
            </div>
          )}
        </div>
      </CyberFrame>
    </motion.div>
  );
}

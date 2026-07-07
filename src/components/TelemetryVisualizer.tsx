import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Cpu, HardDrive, Network } from 'lucide-react';
import CyberFrame from './CyberFrame';

export default function TelemetryVisualizer() {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    mem: 62,
    net: 120,
    tasks: 12,
  });

  const [history, setHistory] = useState<number[]>(Array(20).fill(45));

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newCpu = Math.min(100, Math.max(0, prev.cpu + (Math.random() * 20 - 10)));
        
        setHistory(h => {
          const newHistory = [...h.slice(1), newCpu];
          return newHistory;
        });

        return {
          cpu: newCpu,
          mem: Math.min(100, Math.max(0, prev.mem + (Math.random() * 10 - 5))),
          net: Math.max(10, prev.net + (Math.random() * 50 - 25)),
          tasks: Math.max(1, prev.tasks + Math.floor(Math.random() * 3 - 1)),
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <CyberFrame glowColor="blue" className="w-full bg-black/40 rounded-lg p-4 font-mono">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
        <div className="flex items-center space-x-2 text-xs text-gray-400 uppercase tracking-widest font-bold">
          <Activity size={14} className="text-violet-500" />
          <span>Core Telemetry</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-500 font-bold tracking-widest">STABLE</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] text-gray-500 uppercase tracking-widest">
            <Cpu size={12} />
            <span>CPU</span>
          </div>
          <div className="text-sm font-bold text-white">{metrics.cpu.toFixed(1)}%</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-violet-500" 
              animate={{ width: `${metrics.cpu}%` }}
              transition={{ duration: 1.5, ease: "linear" }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] text-gray-500 uppercase tracking-widest">
            <HardDrive size={12} />
            <span>MEM</span>
          </div>
          <div className="text-sm font-bold text-white">{metrics.mem.toFixed(1)}%</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-fuchsia-500" 
              animate={{ width: `${metrics.mem}%` }}
              transition={{ duration: 1.5, ease: "linear" }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] text-gray-500 uppercase tracking-widest">
            <Network size={12} />
            <span>NET</span>
          </div>
          <div className="text-sm font-bold text-white">{metrics.net.toFixed(0)} Mbps</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
              className="h-full bg-blue-500" 
              animate={{ width: `${Math.min(100, metrics.net / 3)}%` }}
              transition={{ duration: 1.5, ease: "linear" }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] text-gray-500 uppercase tracking-widest">
            <Activity size={12} />
            <span>TASKS</span>
          </div>
          <div className="text-sm font-bold text-white">{metrics.tasks}</div>
          <div className="text-[10px] text-gray-500">ACTIVE AGENTS</div>
        </div>
      </div>

      <div className="h-12 w-full flex items-end justify-between space-x-1 opacity-50">
        {history.map((val, i) => (
          <motion.div 
            key={i}
            className="flex-1 bg-violet-500/50 rounded-t-sm"
            animate={{ height: `${val}%` }}
            transition={{ duration: 1.5, ease: "linear" }}
          />
        ))}
      </div>
    </CyberFrame>
  );
}

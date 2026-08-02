import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, ChevronRight, Play } from 'lucide-react';
import { SceneId, SCENES } from '../../lib/story/storyTypes';
import { storyAudio } from '../../lib/story/audioEngine';

interface BackgroundStoryWidgetProps {
  currentScene: SceneId;
  onOpenStoryStage: () => void;
}

export default function BackgroundStoryWidget({
  currentScene,
  onOpenStoryStage,
}: BackgroundStoryWidgetProps) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const activeSceneDef = SCENES.find((s) => s.id === currentScene) || SCENES[0];

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isMuted;
    setIsMuted(next);
    storyAudio.setMuted(next);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 p-2.5 rounded-full bg-[#0a0a10]/90 border border-violet-500/30 backdrop-blur-xl shadow-2xl text-white"
      >
        {/* Active Scene Indicator Badge */}
        <button
          onClick={onOpenStoryStage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-950/60 border border-violet-800/50 hover:bg-violet-900/60 transition-all text-xs font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
          <span className="font-bold text-violet-200">
            SCENE {String(currentScene).padStart(2, '0')} // {activeSceneDef.title}
          </span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={handleToggleSound}
          className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-all"
          title={isMuted ? 'Sound Off' : 'Sound On'}
        >
          {isMuted ? <VolumeX size={15} className="text-stone-500" /> : <Volume2 size={15} className="text-violet-400" />}
        </button>

        {/* Launch Full Interactive Film Stage */}
        <button
          onClick={onOpenStoryStage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-mono font-bold tracking-wider uppercase transition-all shadow-md"
        >
          <Sparkles size={13} className="text-amber-300 animate-pulse" />
          <span className="hidden sm:inline">3D FILM STAGE</span>
          <ChevronRight size={13} />
        </button>
      </motion.div>
    </div>
  );
}

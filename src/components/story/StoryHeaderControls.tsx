import React from 'react';
import { Volume2, VolumeX, X, SkipForward, Cpu } from 'lucide-react';
import { SceneId, SCENES } from '../../lib/story/storyTypes';
import { PerformanceTier } from '../../lib/story/performanceEngine';
import { storyAudio } from '../../lib/story/audioEngine';

interface StoryHeaderControlsProps {
  currentScene: SceneId;
  performanceTier: PerformanceTier;
  isMuted: boolean;
  onToggleSound: () => void;
  onSelectScene: (step: SceneId) => void;
  onClose: () => void;
}

export default function StoryHeaderControls({
  currentScene,
  performanceTier,
  isMuted,
  onToggleSound,
  onSelectScene,
  onClose,
}: StoryHeaderControlsProps) {
  return (
    <div className="relative z-30 flex flex-col gap-3 p-4 sm:p-6 max-w-7xl w-full mx-auto select-none">
      <div className="flex items-center justify-between">
        {/* Studio Branding & Status */}
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-ping" />
          <span className="font-mono text-xs tracking-widest text-stone-200 font-bold uppercase">
            DEVIL LABS // 02:13 AM STUDIO
          </span>
          <span className="hidden md:inline-block font-mono text-[10px] px-2 py-0.5 rounded bg-violet-950/80 border border-violet-800/60 text-violet-300 font-bold uppercase">
            {performanceTier} ENGINE
          </span>
        </div>

        {/* Audio Toggle & Skip Experience */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleSound}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 border border-white/10 hover:border-violet-500/50 text-xs font-mono transition-all text-stone-300 hover:text-white"
          >
            {isMuted ? <VolumeX size={14} className="text-stone-500" /> : <Volume2 size={14} className="text-violet-400" />}
            <span>{isMuted ? 'SOUND ○ OFF' : 'SOUND ● ON'}</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 border border-white/10 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-mono font-bold tracking-wider uppercase transition-all"
          >
            <span>SKIP EXPERIENCE</span>
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Scene Progress Scrubber */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2">
        {SCENES.map((scene) => (
          <button
            key={scene.id}
            onClick={() => {
              storyAudio.playKeyClick();
              onSelectScene(scene.id);
            }}
            className={`flex-1 min-w-[28px] h-1.5 rounded-full transition-all ${
              scene.id === currentScene
                ? 'bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.8)]'
                : 'bg-stone-800/80 hover:bg-stone-700'
            }`}
            title={`${scene.id}. ${scene.title}`}
          />
        ))}
      </div>
    </div>
  );
}

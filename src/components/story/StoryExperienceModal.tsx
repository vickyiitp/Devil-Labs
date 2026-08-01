import React, { useState, useEffect } from 'react';
import { SceneId } from '../../lib/story/storyTypes';
import { detectPerformanceConfig, PerformanceConfig } from '../../lib/story/performanceEngine';
import { storyAudio } from '../../lib/story/audioEngine';
import Lab3DCanvas from './Lab3DCanvas';
import StoryHeaderControls from './StoryHeaderControls';
import LabStoryOverlay from './LabStoryOverlay';

interface StoryExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInitializeProject: () => void;
  navigate?: (path: string) => void;
}

export default function StoryExperienceModal({
  isOpen,
  onClose,
  onInitializeProject,
  navigate,
}: StoryExperienceModalProps) {
  const [currentScene, setCurrentScene] = useState<SceneId>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [config, setConfig] = useState<PerformanceConfig>({
    tier: 'BALANCED',
    webglSupported: true,
    maxParticles: 350,
    enableShadows: false,
    enableComplexShaders: true,
  });

  useEffect(() => {
    setConfig(detectPerformanceConfig());
  }, []);

  const handleToggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    storyAudio.setMuted(next);
  };

  const handleSelectScene = (step: SceneId) => {
    setCurrentScene(step);
    if (step === 4) {
      storyAudio.playDeploymentBoom();
    } else if (step === 9) {
      storyAudio.playDeploymentBoom();
    } else if (step === 10) {
      storyAudio.playPaymentChime();
    }
  };

  const handleNextScene = () => {
    storyAudio.playKeyClick();
    if (currentScene < 11) {
      const next = (currentScene + 1) as SceneId;
      handleSelectScene(next);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col justify-between overflow-hidden font-sans select-none">
      {/* 3D WebGL Workstation & Candle Canvas */}
      <Lab3DCanvas sceneStep={currentScene} performanceTier={config.tier} />

      {/* Top Header & Scene Scrubber */}
      <StoryHeaderControls
        currentScene={currentScene}
        performanceTier={config.tier}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onSelectScene={handleSelectScene}
        onClose={onClose}
      />

      {/* Main Narrative Scene Overlay */}
      <LabStoryOverlay
        sceneStep={currentScene}
        onNextScene={handleNextScene}
        onInitializeProject={() => {
          onClose();
          onInitializeProject();
        }}
        onExploreWork={() => {
          onClose();
          if (navigate) navigate('/projects');
        }}
      />
    </div>
  );
}

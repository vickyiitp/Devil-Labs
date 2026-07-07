import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function LaboratoryHum() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const subOscillatorRef = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const toggleSound = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContext();
        
        // Main hum (low frequency)
        oscillatorRef.current = audioCtxRef.current.createOscillator();
        oscillatorRef.current.type = 'sawtooth';
        oscillatorRef.current.frequency.setValueAtTime(55, audioCtxRef.current.currentTime); // 55Hz (Low A)

        // Sub oscillator for more depth
        subOscillatorRef.current = audioCtxRef.current.createOscillator();
        subOscillatorRef.current.type = 'sine';
        subOscillatorRef.current.frequency.setValueAtTime(27.5, audioCtxRef.current.currentTime);

        // Lowpass filter to muffle it and make it sound like it's through walls
        const filterNode = audioCtxRef.current.createBiquadFilter();
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(150, audioCtxRef.current.currentTime);

        // LFO to modulate filter frequency slowly (the hum undulating)
        lfoRef.current = audioCtxRef.current.createOscillator();
        lfoRef.current.type = 'sine';
        lfoRef.current.frequency.setValueAtTime(0.1, audioCtxRef.current.currentTime); // very slow
        
        const lfoGain = audioCtxRef.current.createGain();
        lfoGain.gain.setValueAtTime(50, audioCtxRef.current.currentTime); // modulates filter by +-50Hz
        
        lfoRef.current.connect(lfoGain);
        lfoGain.connect(filterNode.detune);

        // Master gain (volume)
        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(0.15, audioCtxRef.current.currentTime);

        // Connect the graph
        oscillatorRef.current.connect(filterNode);
        subOscillatorRef.current.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);

        // Start oscillators
        oscillatorRef.current.start();
        subOscillatorRef.current.start();
        lfoRef.current.start();
      } else {
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      }
      setIsPlaying(true);
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`flex items-center space-x-2 text-[10px] tracking-widest font-bold transition-colors ${isPlaying ? 'text-violet-400' : 'text-gray-500 hover:text-gray-400'}`}
      title="Toggle Ambient Laboratory Hum"
    >
      {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
      <span>{isPlaying ? 'AMBIENCE: ON' : 'AMBIENCE: MUTED'}</span>
    </button>
  );
}

// High-fidelity web audio synthesis engine for Devil Labs
// Generates a calm, fresh ambient background track and tactile button hover/click sound effects.

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private padOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private generativeTimeout: any = null;
  private currentChordIndex: number = 0;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;

  // Relaxing chord progression (pentatonic & lush major/minor 9th chords)
  // Frequencies in Hz
  private chords = [
    [130.81, 196.00, 261.63, 329.63, 392.00, 493.88], // Cmaj9 (C2, G3, C3, E3, G3, B3)
    [174.61, 261.63, 349.23, 440.00, 523.25, 659.25], // Fmaj9 (F2, C3, F3, A3, C4, E4)
    [110.00, 220.00, 293.66, 349.23, 440.00, 523.25], // Am9 (A2, A3, D3, F3, A3, C4)
    [146.83, 220.00, 293.66, 392.00, 493.88, 587.33]  // G6/9 (D3, A3, D3, G3, B3, D4)
  ];

  constructor() {
    // Lazy initialisation on first interaction
  }

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      // Master controls
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Audio Context failed to initialize:', e);
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (!this.ctx) return true;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    
    if (!this.isMuted) {
      this.isPlaying = true;
      this.startGenerativeAmbient();
      // Smooth fade in
      if (this.masterGain) {
        this.masterGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);
      }
    } else {
      // Smooth fade out
      if (this.masterGain) {
        this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);
      }
      setTimeout(() => {
        if (this.isMuted) {
          this.stopGenerativeAmbient();
        }
      }, 1500);
    }

    return this.isMuted;
  }

  public getMuteState(): boolean {
    return this.isMuted;
  }

  public getAnalyserData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(32);
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  // Generates calm, lush ambient chords
  private startGenerativeAmbient() {
    if (!this.ctx || !this.isPlaying) return;
    this.stopGenerativeAmbient();

    const playChord = () => {
      if (!this.ctx || this.isMuted || !this.masterGain) return;
      
      const chord = this.chords[this.currentChordIndex];
      const now = this.ctx.currentTime;
      const duration = 6.0; // Seconds per chord
      
      // Clear old active oscillators
      this.padOscillators = this.padOscillators.filter(oscObj => {
        try {
          oscObj.osc.stop(now);
        } catch(e){}
        return false;
      });

      // Create new overlapping oscillators for lush synth pad
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        
        // Soft sine and triangle mix for warmth
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        // Add subtle detuning for rich chorus effect
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

        // Slow cinematic fade-in and fade-out envelope
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.04, now + 2.0); // Slow attack
        gainNode.gain.setValueAtTime(0.04, now + duration - 2.5);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Smooth decay

        osc.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        osc.start(now);
        this.padOscillators.push({ osc, gain: gainNode });
      });

      // Move to next chord in progression
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

      // Schedule next chord with overlap
      this.generativeTimeout = setTimeout(playChord, (duration - 1.5) * 1000);
    };

    playChord();
  }

  private stopGenerativeAmbient() {
    if (this.generativeTimeout) {
      clearTimeout(this.generativeTimeout);
      this.generativeTimeout = null;
    }
    const now = this.ctx ? this.ctx.currentTime : 0;
    this.padOscillators.forEach(oscObj => {
      try {
        oscObj.gain.gain.cancelScheduledValues(now);
        oscObj.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        oscObj.osc.stop(now + 0.6);
      } catch (e) {}
    });
    this.padOscillators = [];
  }

  // Play a soft, premium UI hover sound (high-frequency, airy, quick decay)
  public playHover() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      // High-end pleasant digital chime pitch
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(1300, now + 0.08);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.012, now + 0.01); // ultra-soft volume
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gainNode);
      // Connect to destination directly so user can hear UI noises even if background tracks are silent
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  // Play a highly-focused, subtle spatial haptic-like click cue
  public playHapticHover(panValue: number = 0.0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      
      // Haptic low-frequency body pulse (physical trackpad feel)
      const oscLow = this.ctx.createOscillator();
      const gainLow = this.ctx.createGain();
      
      oscLow.type = 'sine';
      oscLow.frequency.setValueAtTime(130, now);
      oscLow.frequency.exponentialRampToValueAtTime(65, now + 0.025);
      
      gainLow.gain.setValueAtTime(0, now);
      gainLow.gain.linearRampToValueAtTime(0.05, now + 0.002);
      gainLow.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      // Soft high-frequency metallic "tick" for high-fidelity snap
      const oscHigh = this.ctx.createOscillator();
      const gainHigh = this.ctx.createGain();
      
      oscHigh.type = 'sine';
      oscHigh.frequency.setValueAtTime(2400, now);
      oscHigh.frequency.exponentialRampToValueAtTime(1100, now + 0.008);
      
      gainHigh.gain.setValueAtTime(0, now);
      gainHigh.gain.linearRampToValueAtTime(0.018, now + 0.001);
      gainHigh.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

      // Stereo panner for immersive physical directionality
      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        // Constraint pan to standard -1.0 to 1.0 limits
        panner.pan.setValueAtTime(Math.max(-1, Math.min(1, panValue)), now);
        
        gainLow.connect(panner);
        gainHigh.connect(panner);
        panner.connect(this.ctx.destination);
      } else {
        // Fallback for environments lacking the StereoPannerNode interface
        gainLow.connect(this.ctx.destination);
        gainHigh.connect(this.ctx.destination);
      }

      oscLow.connect(gainLow);
      oscHigh.connect(gainHigh);

      oscLow.start(now);
      oscHigh.start(now);
      
      oscLow.stop(now + 0.04);
      oscHigh.stop(now + 0.015);
    } catch (e) {
      console.warn('Haptic spatial audio failed:', e);
    }
  }

  // Play an elegant UI click sound (deep double-pulse confirmation blip)
  public playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(260, now + 0.04);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.035, now + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {}
  }
}

export const audioEngine = new AudioEngine();

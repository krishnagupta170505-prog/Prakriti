// Web Audio API Sound Synthesizer for high performance zero-asset audio

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('prakriti_audio_muted');
      this.isMuted = savedMute === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('prakriti_audio_muted', String(this.isMuted));
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Soft subtle glass tap sound for option select
  public playTap() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Harmonic chord chime for correct answer / mini-game step
  public playChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const frequencies = [528, 660, 792]; // Solfeggio love frequency harmonic
      frequencies.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.04);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + index * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + index * 0.04 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + index * 0.04);
        osc.stop(this.ctx.currentTime + index * 0.04 + 0.6);
      });
    } catch {
      // Audio autoplay fallback
    }
  }

  // Resonant Tibetan Singing Bowl Chime for Prakriti Reveal
  public playSingingBowl() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const baseFreq = 432; // Universal soothing tuning
      const harmonics = [baseFreq, baseFreq * 2.01, baseFreq * 2.99, baseFreq * 4.02];

      harmonics.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const initialVol = 0.12 / (idx + 1);
        gain.gain.setValueAtTime(initialVol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 3.2);
      });
    } catch {
      // Autoplay fallback
    }
  }

  // Breath Cue Tones (Gentle swelling tone for Inhale/Exhale)
  public playBreathTone(type: 'inhale' | 'exhale' | 'hold') {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';

      if (type === 'inhale') {
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(330, this.ctx.currentTime + 3.8);

        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 2.0);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 3.8);
      } else if (type === 'exhale') {
        osc.frequency.setValueAtTime(330, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(220, this.ctx.currentTime + 3.8);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 3.8);
      } else {
        // Hold
        osc.frequency.setValueAtTime(330, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 3.8);
      }

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 3.8);
    } catch {
      // Autoplay fallback
    }
  }
}

export const soundManager = new SoundManager();

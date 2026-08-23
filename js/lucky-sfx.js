(() => {
  'use strict';

  const VERSION = 'lucky-sfx-v1';

  class LuckySFX {
    constructor() {
      this.context = null;
      this.master = null;
      this.timers = [];
    }

    enabled() {
      try { return window.LGTAudio?.getState?.().enabled !== false; } catch (_) { return true; }
    }

    async ensure() {
      if (!this.enabled()) return null;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      if (!this.context) {
        this.context = new AudioContext();
        this.master = this.context.createGain();
        this.master.gain.value = 0.085;
        this.master.connect(this.context.destination);
      }
      if (this.context.state === 'suspended') {
        try { await this.context.resume(); } catch (_) {}
      }
      return this.context;
    }

    stopTimers() {
      this.timers.forEach((id) => clearTimeout(id));
      this.timers = [];
    }

    tone(frequency, duration = 0.2, options = {}) {
      if (!this.context || !this.master || !this.enabled()) return;
      const now = this.context.currentTime + (options.delay || 0);
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      const filter = this.context.createBiquadFilter();
      osc.type = options.type || 'sine';
      osc.frequency.setValueAtTime(frequency, now);
      if (options.toFrequency) osc.frequency.exponentialRampToValueAtTime(Math.max(1, options.toFrequency), now + duration);
      filter.type = 'lowpass';
      filter.frequency.value = options.filter || 2200;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(options.gain || 0.7, now + Math.min(0.025, duration * 0.16));
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);
      osc.start(now);
      osc.stop(now + duration + 0.04);
    }

    click(delay = 0) {
      if (!this.context || !this.master || !this.enabled()) return;
      const length = Math.max(32, Math.floor(this.context.sampleRate * 0.035));
      const buffer = this.context.createBuffer(1, length, this.context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - (i / data.length), 2.5);
      const source = this.context.createBufferSource();
      const filter = this.context.createBiquadFilter();
      const gain = this.context.createGain();
      filter.type = 'bandpass';
      filter.frequency.value = 1150;
      filter.Q.value = 1.4;
      gain.gain.value = 0.18;
      source.buffer = buffer;
      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);
      source.start(this.context.currentTime + delay);
    }

    async spin() {
      await this.ensure();
      if (!this.context) return;
      this.stopTimers();
      this.tone(118, 0.55, { type: 'triangle', toFrequency: 172, gain: 0.42, filter: 900 });
      this.tone(238, 0.24, { delay: 0.08, type: 'sine', gain: 0.12, filter: 1600 });
      [220, 540, 890, 1280, 1690].forEach((ms, index) => {
        const id = setTimeout(() => {
          if (!this.enabled()) return;
          this.click();
          this.tone(310 + (index * 18), 0.07, { type: 'triangle', gain: 0.12, filter: 1400 });
        }, ms);
        this.timers.push(id);
      });
      this.vibrate(16);
    }

    reveal(index) {
      if (!this.enabled()) return;
      const frequencies = [523.25, 659.25, 783.99];
      this.click();
      this.tone(frequencies[index] || 659.25, 0.36, { type: 'sine', gain: 0.58, filter: 2400 });
      this.tone((frequencies[index] || 659.25) * 2, 0.17, { delay: 0.02, type: 'sine', gain: 0.13, filter: 3600 });
      this.vibrate(index === 2 ? [18, 28, 22] : 20);
    }

    complete() {
      if (!this.enabled()) return;
      [523.25, 659.25, 783.99].forEach((frequency, index) => {
        this.tone(frequency, 0.58, { delay: index * 0.055, type: 'sine', gain: 0.26, filter: 3000 });
      });
    }

    vibrate(pattern) {
      if (navigator.vibrate) {
        try { navigator.vibrate(pattern); } catch (_) {}
      }
    }

    suspend() {
      this.stopTimers();
      if (this.context?.state === 'running') this.context.suspend().catch(() => {});
    }
  }

  window.LGTLuckySFX = Object.freeze({ version: VERSION, LuckySFX });
})();

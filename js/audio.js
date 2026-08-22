(() => {
  'use strict';

  const STORAGE = {
    enabled: 'lgt.sound',
    volume: 'lgt.volume',
    track: 'lgt.track',
    shuffle: 'lgt.shuffle'
  };

  const TRACKS = [
    {
      id: 'golden-lantern-at-twilight',
      title: 'Golden Lantern at Twilight',
      src: 'assets/audio/golden-lantern-at-twilight.mp3'
    },
    {
      id: 'sunlight-on-bronze',
      title: 'Sunlight on Bronze',
      src: 'assets/audio/sunlight-on-bronze.mp3'
    }
  ];

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  class LittleGaneshaAudio extends EventTarget {
    constructor() {
      super();

      this.tracks = TRACKS;
      this.enabled = localStorage.getItem(STORAGE.enabled) !== 'off';
      this.volume = clamp(Number.parseFloat(localStorage.getItem(STORAGE.volume) || '0.58'), 0, 1);
      this.shuffle = localStorage.getItem(STORAGE.shuffle) !== 'off';
      this.currentIndex = clamp(Number.parseInt(localStorage.getItem(STORAGE.track) || '0', 10) || 0, 0, this.tracks.length - 1);

      this.channels = [this.#makeChannel(), this.#makeChannel()];
      this.activeChannel = 0;
      this.unlocked = false;
      this.started = false;
      this.crossfading = false;
      this.wasPlayingBeforeHide = false;
      this.backgroundPaused = false;
      this.monitorTimer = null;
      this.fadeFrame = null;
      this.crossfadeGeneration = 0;

      this.#loadInto(this.channels[0], this.currentIndex);
      this.#bindVisibility();
    }

    #makeChannel() {
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.playsInline = true;
      audio.loop = false;
      audio.volume = 0;
      audio.addEventListener('ended', () => {
        if (!this.crossfading && this.enabled && this.started) this.next({ crossfade: false });
      });
      return audio;
    }

    #loadInto(channel, trackIndex) {
      channel.src = this.tracks[trackIndex].src;
      channel.dataset.trackIndex = String(trackIndex);
      channel.load();
    }

    #emit(type, detail = {}) {
      this.dispatchEvent(new CustomEvent(type, { detail: { ...detail, state: this.getState() } }));
    }

    #pauseForBackground() {
      if (this.backgroundPaused) return;

      const anyChannelPlaying = this.channels.some((channel) => !channel.paused);
      this.wasPlayingBeforeHide = Boolean(this.started && this.enabled && anyChannelPlaying);
      this.backgroundPaused = true;

      // Mobile browsers may suspend requestAnimationFrame immediately after the
      // document becomes hidden. Do not fade here: pause synchronously first.
      this.crossfadeGeneration += 1;
      this.#cancelFade();
      this.crossfading = false;

      this.channels.forEach((channel, index) => {
        if (!channel.paused) channel.pause();
        channel.volume = index === this.activeChannel ? this.volume : 0;
      });

      this.#emit('statechange', { lifecycle: 'background-paused' });
    }

    #resumeFromBackground() {
      if (!this.backgroundPaused) return;

      const shouldResume = this.wasPlayingBeforeHide && this.enabled && this.started;
      this.backgroundPaused = false;
      this.wasPlayingBeforeHide = false;

      if (shouldResume) {
        this.resume({ fadeMs: 650 }).catch(() => {});
      } else {
        this.#emit('statechange', { lifecycle: 'foreground-idle' });
      }
    }

    #bindVisibility() {
      const hide = () => this.#pauseForBackground();
      const show = () => {
        if (!document.hidden) this.#resumeFromBackground();
      };

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) hide();
        else show();
      });

      // Android Chrome/PWA and bfcache can surface different lifecycle events.
      // These are intentionally idempotent through backgroundPaused.
      window.addEventListener('pagehide', hide, { capture: true });
      window.addEventListener('pageshow', show, { capture: true });
      document.addEventListener('freeze', hide);
      document.addEventListener('resume', show);
    }

    #startMonitor() {
      if (this.monitorTimer) return;
      this.monitorTimer = window.setInterval(() => {
        if (!this.started || !this.enabled || this.crossfading || this.backgroundPaused) return;
        const active = this.channels[this.activeChannel];
        if (!Number.isFinite(active.duration) || active.duration <= 0 || active.paused) return;

        const remaining = active.duration - active.currentTime;
        const crossfadeSeconds = Math.min(3.8, Math.max(1.8, active.duration * 0.08));
        if (remaining <= crossfadeSeconds && remaining > 0.15) {
          this.next({ crossfade: true, durationMs: crossfadeSeconds * 1000 }).catch(() => {});
        }
      }, 250);
    }

    #stopMonitor() {
      if (!this.monitorTimer) return;
      window.clearInterval(this.monitorTimer);
      this.monitorTimer = null;
    }

    #cancelFade() {
      if (!this.fadeFrame) return;
      cancelAnimationFrame(this.fadeFrame);
      this.fadeFrame = null;
    }

    #fade(channel, from, to, durationMs) {
      this.#cancelFade();
      const startedAt = performance.now();
      channel.volume = clamp(from, 0, 1);

      return new Promise((resolve) => {
        const tick = (now) => {
          const t = durationMs <= 0 ? 1 : clamp((now - startedAt) / durationMs, 0, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          channel.volume = clamp(from + ((to - from) * eased), 0, 1);

          if (t >= 1) {
            this.fadeFrame = null;
            resolve();
            return;
          }
          this.fadeFrame = requestAnimationFrame(tick);
        };
        this.fadeFrame = requestAnimationFrame(tick);
      });
    }

    #chooseNextIndex() {
      if (this.tracks.length <= 1) return 0;
      if (!this.shuffle) return (this.currentIndex + 1) % this.tracks.length;

      const candidates = this.tracks.map((_, index) => index).filter((index) => index !== this.currentIndex);
      return candidates[Math.floor(Math.random() * candidates.length)];
    }

    #choosePreviousIndex() {
      if (this.tracks.length <= 1) return 0;
      return (this.currentIndex - 1 + this.tracks.length) % this.tracks.length;
    }

    async unlockAndStart() {
      this.unlocked = true;
      this.started = true;
      this.#startMonitor();

      if (!this.enabled) {
        this.#emit('statechange');
        return;
      }

      await this.playIndex(this.currentIndex, { fadeIn: true, durationMs: 900 });
    }

    async playIndex(index, { fadeIn = true, crossfade = false, durationMs = 900 } = {}) {
      if (!this.unlocked || !this.enabled || !this.tracks[index] || this.backgroundPaused) return;

      const fromChannel = this.channels[this.activeChannel];
      const targetChannelIndex = crossfade ? 1 - this.activeChannel : this.activeChannel;
      const targetChannel = this.channels[targetChannelIndex];

      if (crossfade && targetChannel === fromChannel) return;

      this.crossfading = crossfade;
      this.#cancelFade();

      if (crossfade) {
        const generation = ++this.crossfadeGeneration;
        this.#loadInto(targetChannel, index);
        targetChannel.currentTime = 0;
        targetChannel.volume = 0;

        try {
          await targetChannel.play();
        } catch (error) {
          this.crossfading = false;
          this.#emit('error', { error });
          return;
        }

        const start = performance.now();
        const fromStart = fromChannel.volume;
        const toTarget = this.volume;

        const completed = await new Promise((resolve) => {
          const tick = (now) => {
            if (generation !== this.crossfadeGeneration || this.backgroundPaused) {
              resolve(false);
              return;
            }

            const t = clamp((now - start) / durationMs, 0, 1);
            const eased = t * t * (3 - (2 * t));
            fromChannel.volume = clamp(fromStart * (1 - eased), 0, 1);
            targetChannel.volume = clamp(toTarget * eased, 0, 1);

            if (t >= 1) {
              resolve(true);
              return;
            }
            requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });

        if (!completed || generation !== this.crossfadeGeneration || this.backgroundPaused) {
          this.crossfading = false;
          return;
        }

        fromChannel.pause();
        fromChannel.currentTime = 0;
        fromChannel.volume = 0;
        this.activeChannel = targetChannelIndex;
      } else {
        const needsLoad = Number(targetChannel.dataset.trackIndex) !== index;
        if (needsLoad) this.#loadInto(targetChannel, index);
        if (needsLoad || targetChannel.ended) targetChannel.currentTime = 0;
        targetChannel.volume = fadeIn ? 0 : this.volume;

        try {
          await targetChannel.play();
        } catch (error) {
          this.#emit('error', { error });
          return;
        }

        if (fadeIn) await this.#fade(targetChannel, 0, this.volume, durationMs);
      }

      this.currentIndex = index;
      localStorage.setItem(STORAGE.track, String(this.currentIndex));
      this.crossfading = false;
      this.#emit('trackchange', { track: this.getCurrentTrack() });
      this.#emit('statechange');
    }

    async next({ crossfade = false, durationMs = 950 } = {}) {
      if (this.crossfading || this.backgroundPaused) return;
      const nextIndex = this.#chooseNextIndex();
      await this.playIndex(nextIndex, { fadeIn: !crossfade, crossfade, durationMs });
    }

    async previous() {
      if (this.crossfading || this.backgroundPaused) return;
      const active = this.channels[this.activeChannel];
      if (active.currentTime > 4) {
        active.currentTime = 0;
        this.#emit('statechange');
        return;
      }
      await this.playIndex(this.#choosePreviousIndex(), { fadeIn: true, durationMs: 650 });
    }

    async pause({ fadeMs = 260, preserveIntent = false } = {}) {
      const active = this.channels[this.activeChannel];
      if (active.paused) return;

      const from = active.volume;
      await this.#fade(active, from, 0, fadeMs);
      active.pause();
      active.volume = this.volume;
      if (!preserveIntent) this.#emit('statechange');
    }

    async resume({ fadeMs = 500 } = {}) {
      if (!this.unlocked || !this.enabled || this.backgroundPaused || document.hidden) return;
      const active = this.channels[this.activeChannel];
      active.volume = 0;
      try {
        await active.play();
        await this.#fade(active, 0, this.volume, fadeMs);
        this.#emit('statechange');
      } catch (error) {
        this.#emit('error', { error });
      }
    }

    async togglePlay() {
      if (!this.started || this.backgroundPaused) return;
      if (this.isPlaying()) await this.pause();
      else await this.resume();
    }

    async setEnabled(enabled) {
      this.enabled = Boolean(enabled);
      localStorage.setItem(STORAGE.enabled, this.enabled ? 'on' : 'off');

      if (!this.enabled) {
        this.wasPlayingBeforeHide = false;
        await this.pause({ fadeMs: 260 });
      } else if (this.started && this.unlocked && !this.backgroundPaused && !document.hidden) {
        await this.resume({ fadeMs: 500 });
      }
      this.#emit('statechange');
    }

    setVolume(value) {
      this.volume = clamp(Number(value), 0, 1);
      localStorage.setItem(STORAGE.volume, String(this.volume));
      const active = this.channels[this.activeChannel];
      if (!active.paused && !this.crossfading) active.volume = this.volume;
      this.#emit('volumechange');
    }

    setShuffle(enabled) {
      this.shuffle = Boolean(enabled);
      localStorage.setItem(STORAGE.shuffle, this.shuffle ? 'on' : 'off');
      this.#emit('statechange');
    }

    async stop({ resetTrack = false } = {}) {
      this.crossfadeGeneration += 1;
      this.#cancelFade();
      for (const channel of this.channels) {
        channel.pause();
        channel.currentTime = 0;
        channel.volume = 0;
      }
      this.crossfading = false;
      this.backgroundPaused = false;
      this.wasPlayingBeforeHide = false;
      this.started = false;
      this.#stopMonitor();
      if (resetTrack) {
        this.currentIndex = 0;
        localStorage.setItem(STORAGE.track, '0');
        this.#loadInto(this.channels[this.activeChannel], 0);
      }
      this.#emit('statechange');
    }

    isPlaying() {
      const active = this.channels[this.activeChannel];
      return this.started && this.enabled && !this.backgroundPaused && !active.paused;
    }

    getCurrentTrack() {
      return this.tracks[this.currentIndex];
    }

    getState() {
      return {
        enabled: this.enabled,
        volume: this.volume,
        shuffle: this.shuffle,
        currentIndex: this.currentIndex,
        track: this.getCurrentTrack(),
        playing: this.isPlaying(),
        started: this.started,
        unlocked: this.unlocked
      };
    }
  }

  window.LGTAudio = new LittleGaneshaAudio();
})();

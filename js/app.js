(() => {
  'use strict';

  const STORAGE = {
    language: 'lgt.language'
  };

  const COPY = {
    en: {
      begin: 'TAP TO BEGIN',
      soundOn: 'Sound on',
      soundOff: 'Sound off',
      ready: 'The Golden Path is ready.',
      nowPlaying: 'NOW PLAYING',
      play: 'Play',
      pause: 'Pause',
      previous: 'Previous track',
      next: 'Next track',
      more: 'Audio options',
      volume: 'Volume',
      shuffle: 'Shuffle',
      exit: 'Return to Title',
      exitTitle: 'Return to Title?',
      exitBody: 'Your language and audio preferences will be kept.',
      cancel: 'Cancel',
      confirm: 'Return'
    },
    th: {
      begin: 'แตะเพื่อเริ่ม',
      soundOn: 'เปิดเสียง',
      soundOff: 'ปิดเสียง',
      ready: 'เส้นทางสีทองพร้อมเปิดออกแล้ว',
      nowPlaying: 'กำลังเล่น',
      play: 'เล่น',
      pause: 'หยุดชั่วคราว',
      previous: 'เพลงก่อนหน้า',
      next: 'เพลงถัดไป',
      more: 'ตัวเลือกเสียง',
      volume: 'ระดับเสียง',
      shuffle: 'สุ่มเพลง',
      exit: 'กลับหน้าไตเติล',
      exitTitle: 'กลับหน้าไตเติล?',
      exitBody: 'ภาษาและการตั้งค่าเสียงของคุณจะยังคงอยู่',
      cancel: 'ยกเลิก',
      confirm: 'กลับ'
    }
  };

  const splash = document.getElementById('studioSplash');
  const title = document.getElementById('titleScreen');
  const beginButton = document.getElementById('beginButton');
  const soundToggle = document.getElementById('soundToggle');
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  const liveStatus = document.getElementById('liveStatus');

  const miniPlayer = document.getElementById('miniPlayer');
  const playerTitle = document.getElementById('playerTitle');
  const playerEyebrow = document.getElementById('playerEyebrow');
  const playerPlay = document.getElementById('playerPlay');
  const playerPrevious = document.getElementById('playerPrevious');
  const playerNext = document.getElementById('playerNext');
  const playerMore = document.getElementById('playerMore');
  const playerPanel = document.getElementById('playerPanel');
  const volumeSlider = document.getElementById('volumeSlider');
  const shuffleToggle = document.getElementById('shuffleToggle');
  const exitButton = document.getElementById('exitButton');

  const exitModal = document.getElementById('exitModal');
  const exitCancel = document.getElementById('exitCancel');
  const exitConfirm = document.getElementById('exitConfirm');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const browserPrefersThai = navigator.language?.toLowerCase().startsWith('th');
  const audio = window.LGTAudio;

  let language = localStorage.getItem(STORAGE.language) || (browserPrefersThai ? 'th' : 'en');
  let splashDismissed = false;
  let journeyStarted = false;

  function copy(key) {
    return COPY[language][key] || COPY.en[key] || key;
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'th' ? 'th' : 'en';
    localStorage.setItem(STORAGE.language, language);
    document.documentElement.lang = language;

    document.querySelectorAll('[data-copy]').forEach((node) => {
      const key = node.dataset.copy;
      if (COPY[language][key]) node.textContent = COPY[language][key];
    });

    languageButtons.forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    syncAudioUI();
  }

  function syncAudioUI() {
    const state = audio.getState();

    soundToggle.setAttribute('aria-pressed', String(state.enabled));
    soundToggle.setAttribute('aria-label', state.enabled ? copy('soundOn') : copy('soundOff'));

    playerEyebrow.textContent = copy('nowPlaying');
    playerTitle.textContent = state.track?.title || '—';
    playerPlay.setAttribute('aria-label', state.playing ? copy('pause') : copy('play'));
    playerPlay.dataset.state = state.playing ? 'pause' : 'play';
    playerPrevious.setAttribute('aria-label', copy('previous'));
    playerNext.setAttribute('aria-label', copy('next'));
    playerMore.setAttribute('aria-label', copy('more'));
    volumeSlider.setAttribute('aria-label', copy('volume'));
    shuffleToggle.setAttribute('aria-label', copy('shuffle'));
    shuffleToggle.setAttribute('aria-pressed', String(state.shuffle));
    shuffleToggle.classList.toggle('is-active', state.shuffle);
    volumeSlider.value = String(Math.round(state.volume * 100));
  }

  function createAmbientLayers() {
    if (reducedMotion) return;

    const motes = document.getElementById('ambientMotes');
    const petals = document.getElementById('ambientPetals');
    if (!motes || !petals || motes.childElementCount || petals.childElementCount) return;

    for (let i = 0; i < 18; i += 1) {
      const mote = document.createElement('span');
      mote.className = 'ambient-mote';
      mote.style.setProperty('--x', `${8 + (Math.random() * 84)}%`);
      mote.style.setProperty('--y', `${28 + (Math.random() * 58)}%`);
      mote.style.setProperty('--size', `${1.2 + (Math.random() * 2.7)}px`);
      mote.style.setProperty('--duration', `${9 + (Math.random() * 10)}s`);
      mote.style.setProperty('--delay', `${-Math.random() * 14}s`);
      mote.style.setProperty('--drift', `${-15 + (Math.random() * 30)}px`);
      motes.appendChild(mote);
    }

    for (let i = 0; i < 7; i += 1) {
      const petal = document.createElement('span');
      petal.className = 'ambient-petal';
      petal.style.setProperty('--x', `${8 + (Math.random() * 84)}%`);
      petal.style.setProperty('--y', `${18 + (Math.random() * 45)}%`);
      petal.style.setProperty('--duration', `${13 + (Math.random() * 9)}s`);
      petal.style.setProperty('--delay', `${-Math.random() * 17}s`);
      petal.style.setProperty('--drift', `${-30 + (Math.random() * 60)}px`);
      petal.style.setProperty('--scale', `${0.72 + (Math.random() * 0.55)}`);
      petals.appendChild(petal);
    }
  }

  function revealTitle() {
    if (splashDismissed) return;
    splashDismissed = true;
    splash.classList.add('is-leaving');
    title.hidden = false;
    createAmbientLayers();

    requestAnimationFrame(() => {
      title.classList.add('is-visible');
    });

    window.setTimeout(() => {
      splash.hidden = true;
    }, reducedMotion ? 20 : 900);
  }

  async function beginJourney() {
    if (journeyStarted) return;
    journeyStarted = true;

    title.classList.remove('is-beginning');
    void title.offsetWidth;
    title.classList.add('is-beginning', 'journey-started');
    beginButton.disabled = true;
    liveStatus.textContent = copy('ready');

    miniPlayer.hidden = false;
    requestAnimationFrame(() => miniPlayer.classList.add('is-visible'));

    await audio.unlockAndStart();
    syncAudioUI();

    window.dispatchEvent(new CustomEvent('lgt:begin', {
      detail: { language, audio: audio.getState() }
    }));

    window.setTimeout(() => title.classList.remove('is-beginning'), 1000);
  }

  async function setSound(enabled) {
    await audio.setEnabled(enabled);
    syncAudioUI();
  }

  function togglePlayerPanel() {
    const expanded = playerMore.getAttribute('aria-expanded') === 'true';
    playerMore.setAttribute('aria-expanded', String(!expanded));
    playerPanel.hidden = expanded;
    miniPlayer.classList.toggle('is-expanded', !expanded);
  }

  function requestExitToTitle() {
    exitModal.hidden = false;
    requestAnimationFrame(() => exitModal.classList.add('is-visible'));
    exitCancel.focus({ preventScroll: true });
  }

  function closeExitModal() {
    exitModal.classList.remove('is-visible');
    window.setTimeout(() => { exitModal.hidden = true; }, reducedMotion ? 10 : 220);
  }

  async function exitToTitle() {
    closeExitModal();
    await audio.stop({ resetTrack: false });
    journeyStarted = false;
    title.classList.remove('journey-started');
    miniPlayer.classList.remove('is-visible', 'is-expanded');
    playerPanel.hidden = true;
    playerMore.setAttribute('aria-expanded', 'false');
    beginButton.disabled = false;
    window.setTimeout(() => { miniPlayer.hidden = true; }, reducedMotion ? 10 : 300);
    syncAudioUI();
    window.dispatchEvent(new CustomEvent('lgt:exit-to-title'));
  }

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });

  soundToggle.addEventListener('click', () => setSound(!audio.getState().enabled));
  beginButton.addEventListener('click', beginJourney);

  playerPlay.addEventListener('click', async () => {
    await audio.togglePlay();
    syncAudioUI();
  });
  playerPrevious.addEventListener('click', async () => {
    await audio.previous();
    syncAudioUI();
  });
  playerNext.addEventListener('click', async () => {
    await audio.next({ crossfade: true, durationMs: 700 });
    syncAudioUI();
  });
  playerMore.addEventListener('click', togglePlayerPanel);
  volumeSlider.addEventListener('input', () => {
    audio.setVolume(Number(volumeSlider.value) / 100);
  });
  shuffleToggle.addEventListener('click', () => {
    audio.setShuffle(!audio.getState().shuffle);
    syncAudioUI();
  });
  exitButton.addEventListener('click', requestExitToTitle);

  exitCancel.addEventListener('click', closeExitModal);
  exitConfirm.addEventListener('click', exitToTitle);
  exitModal.addEventListener('pointerdown', (event) => {
    if (event.target === exitModal) closeExitModal();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !exitModal.hidden) closeExitModal();
  });

  audio.addEventListener('statechange', syncAudioUI);
  audio.addEventListener('trackchange', syncAudioUI);
  audio.addEventListener('volumechange', syncAudioUI);

  /* Stable app-level exit hook for the future Settings screen. */
  window.addEventListener('lgt:request-exit-to-title', requestExitToTitle);

  /* V0.2.1: keep the studio ident consistent and unskippable.
     A fixed short hold reads more premium and prevents accidental early dismissal. */
  const autoRevealMs = reducedMotion ? 900 : 2600;

  setLanguage(language);
  syncAudioUI();
  window.LGT_BUILD = '0.2.2';
  window.setTimeout(revealTitle, autoRevealMs);
})();

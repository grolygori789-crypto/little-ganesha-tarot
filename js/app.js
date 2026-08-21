(() => {
  'use strict';

  const STORAGE = {
    language: 'lgt.language',
    sound: 'lgt.sound'
  };

  const COPY = {
    en: {
      begin: 'TAP TO BEGIN',
      soundOn: 'Sound on',
      soundOff: 'Sound off',
      ready: 'The Golden Path is ready.'
    },
    th: {
      begin: 'แตะเพื่อเริ่ม',
      soundOn: 'เปิดเสียง',
      soundOff: 'ปิดเสียง',
      ready: 'เส้นทางสีทองพร้อมเปิดออกแล้ว'
    }
  };

  const splash = document.getElementById('studioSplash');
  const title = document.getElementById('titleScreen');
  const beginButton = document.getElementById('beginButton');
  const soundToggle = document.getElementById('soundToggle');
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  const liveStatus = document.getElementById('liveStatus');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const browserPrefersThai = navigator.language?.toLowerCase().startsWith('th');

  let language = localStorage.getItem(STORAGE.language) || (browserPrefersThai ? 'th' : 'en');
  let soundEnabled = localStorage.getItem(STORAGE.sound) !== 'off';
  let splashDismissed = false;

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

    syncSoundLabel();
  }

  function syncSoundLabel() {
    soundToggle.setAttribute('aria-pressed', String(soundEnabled));
    soundToggle.setAttribute('aria-label', soundEnabled ? COPY[language].soundOn : COPY[language].soundOff);
  }

  function setSound(enabled) {
    soundEnabled = Boolean(enabled);
    localStorage.setItem(STORAGE.sound, soundEnabled ? 'on' : 'off');
    syncSoundLabel();
  }

  function revealTitle() {
    if (splashDismissed) return;
    splashDismissed = true;
    splash.classList.add('is-leaving');
    title.hidden = false;

    requestAnimationFrame(() => {
      title.classList.add('is-visible');
    });

    window.setTimeout(() => {
      splash.hidden = true;
    }, reducedMotion ? 20 : 850);
  }

  function beginJourney() {
    title.classList.remove('is-beginning');
    void title.offsetWidth;
    title.classList.add('is-beginning');
    liveStatus.textContent = COPY[language].ready;

    /*
      Stable handoff for the next build. The Home / name-entry experience can
      listen for this event without rewriting the Title Screen.
    */
    window.dispatchEvent(new CustomEvent('lgt:begin', {
      detail: { language, soundEnabled }
    }));

    window.setTimeout(() => title.classList.remove('is-beginning'), 1000);
  }

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });

  soundToggle.addEventListener('click', () => setSound(!soundEnabled));
  beginButton.addEventListener('click', beginJourney);

  /* Tap/click can gently skip the studio card after it has had time to read. */
  splash.addEventListener('pointerup', revealTitle, { once: true });

  setLanguage(language);
  setSound(soundEnabled);

  window.setTimeout(revealTitle, reducedMotion ? 600 : 2100);
})();

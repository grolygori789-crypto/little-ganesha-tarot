(() => {
  'use strict';

  const ENGINE = window.LGTReadingEngine;
  const CONTENT = window.LGTReadingContent;
  if (!ENGINE || !CONTENT) throw new Error('Daily Guidance UI requires Reading Engine and content.');

  const COPY = {
    en: {
      eyebrow: 'DAILY GUIDANCE',
      title: 'A card for today',
      intro: 'Take a quiet moment. Let the deck settle, then choose the card that draws you.',
      restoredIntro: 'Your card for today is already waiting. You can return to it as often as you need.',
      begin: 'Begin',
      shuffling: 'Let the deck settle',
      choose: 'Choose one card',
      chooseHint: 'There is no right choice. Notice which one you reach for.',
      selected: 'Your card is chosen',
      selectedHint: 'This card is now held for today on this device.',
      reveal: 'Reveal today’s card',
      theme: 'TODAY’S THEME',
      reflection: 'A QUESTION TO CARRY',
      done: 'Return to Home',
      back: 'Back to Home',
      upright: 'UPRIGHT',
      disclaimer: 'Tarot here is a reflective tool, not a fixed prediction. Take what is useful and leave the rest.',
      storageFail: 'This device could not save today’s card. It may not stay locked after a reload.',
      cardAlt: 'Today’s tarot card: ',
      loading: 'Preparing your card',
      restored: 'TODAY’S CARD',
      keywords: 'KEYWORDS'
    },
    th: {
      eyebrow: 'คำแนะนำประจำวัน',
      title: 'ไพ่หนึ่งใบสำหรับวันนี้',
      intro: 'ใช้เวลาสักครู่ ปล่อยให้สำรับค่อยๆ สงบ แล้วเลือกใบที่ดึงดูดใจคุณ',
      restoredIntro: 'ไพ่ของวันนี้รอคุณอยู่แล้ว คุณกลับมาอ่านใบเดิมได้ทุกครั้งที่ต้องการ',
      begin: 'เริ่มเปิดไพ่',
      shuffling: 'ปล่อยให้สำรับค่อยๆ สงบ',
      choose: 'เลือกไพ่หนึ่งใบ',
      chooseHint: 'ไม่มีใบที่เลือกถูกหรือผิด ลองสังเกตว่าใจพาคุณไปหาใบไหน',
      selected: 'ไพ่ของคุณถูกเลือกแล้ว',
      selectedHint: 'ไพ่ใบนี้จะถูกเก็บไว้เป็นไพ่ประจำวันนี้บนอุปกรณ์เครื่องนี้',
      reveal: 'เปิดไพ่ของวันนี้',
      theme: 'พลังของวันนี้',
      reflection: 'คำถามสำหรับวันนี้',
      done: 'กลับหน้าหลัก',
      back: 'กลับหน้าหลัก',
      upright: 'ไพ่ตั้งตรง',
      disclaimer: 'ไพ่ทาโรต์ในที่นี้เป็นเครื่องมือสำหรับการสะท้อน ไม่ใช่คำทำนายตายตัว รับเฉพาะสิ่งที่มีความหมายกับคุณ',
      storageFail: 'อุปกรณ์นี้ไม่สามารถบันทึกไพ่ของวันนี้ได้ ไพ่จึงอาจไม่ถูกล็อกไว้หลังโหลดหน้าใหม่',
      cardAlt: 'ไพ่ทาโรต์ประจำวันนี้: ',
      loading: 'กำลังเตรียมไพ่ของคุณ',
      restored: 'ไพ่ของวันนี้',
      keywords: 'คำสำคัญ'
    }
  };

  const motionIsReduced = () => document.documentElement.dataset.motion === 'reduced'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const shell = document.createElement('section');
  shell.className = 'reading-shell';
  shell.id = 'dailyReadingView';
  shell.hidden = true;
  shell.setAttribute('role', 'region');
  shell.setAttribute('aria-labelledby', 'dailyReadingTitle');
  shell.innerHTML = `
    <div class="reading-ambient" aria-hidden="true">
      <span class="reading-orb reading-orb--one"></span>
      <span class="reading-orb reading-orb--two"></span>
    </div>
    <header class="reading-header">
      <button class="reading-back" id="dailyReadingBack" type="button" aria-label="Back to Home"><span aria-hidden="true">‹</span></button>
      <div class="reading-header__copy">
        <span class="reading-eyebrow" id="dailyReadingEyebrow"></span>
        <h2 id="dailyReadingTitle"></h2>
      </div>
      <span class="reading-header__balance" aria-hidden="true"></span>
    </header>

    <div class="reading-scroll" id="dailyReadingScroll">
      <div class="reading-intro" id="dailyReadingIntro"></div>

      <div class="reading-stage" id="dailyReadingStage">
        <div class="reading-deck" id="dailyDeck" aria-hidden="true">
          <img src="${CONTENT.cardBack}" alt="" decoding="async">
          <img src="${CONTENT.cardBack}" alt="" decoding="async">
          <img src="${CONTENT.cardBack}" alt="" decoding="async">
        </div>

        <div class="reading-choice" id="dailyChoice" hidden aria-label="Choose one card"></div>

        <div class="reading-selected" id="dailySelected" hidden>
          <button class="reading-card reading-card--selected" id="dailySelectedCard" type="button">
            <span class="reading-card__inner">
              <span class="reading-card__face reading-card__back">
                <img src="${CONTENT.cardBack}" alt="" decoding="async">
              </span>
              <span class="reading-card__face reading-card__front">
                <img id="dailyCardFront" src="" alt="" decoding="async">
                <span class="reading-card__fallback" id="dailyCardFallback" hidden aria-hidden="true">
                  <span aria-hidden="true">✦</span>
                  <strong id="dailyCardFallbackTitle"></strong>
                </span>
              </span>
            </span>
          </button>
          <span class="reading-orientation" id="dailyOrientation"></span>
        </div>
      </div>

      <div class="reading-status" id="dailyReadingStatus" role="status" aria-live="polite"></div>

      <div class="reading-actions" id="dailyReadingActions">
        <button class="reading-primary" id="dailyReadingPrimary" type="button"></button>
      </div>

      <article class="reading-interpretation" id="dailyInterpretation" hidden>
        <div class="reading-card-title">
          <span id="dailyThemeLabel"></span>
          <h3 id="dailyCardTitle"></h3>
          <p id="dailyCanonicalTitle"></p>
        </div>
        <div class="reading-keywords">
          <span id="dailyKeywordsLabel"></span>
          <div id="dailyKeywords"></div>
        </div>
        <p class="reading-meaning" id="dailyMeaning"></p>
        <div class="reading-reflection">
          <span id="dailyReflectionLabel"></span>
          <p id="dailyReflection"></p>
        </div>
        <p class="reading-disclaimer" id="dailyDisclaimer"></p>
      </article>

      <p class="reading-storage-note" id="dailyStorageNote" hidden></p>
    </div>
  `;

  document.getElementById('app')?.appendChild(shell);

  const $ = (id) => document.getElementById(id);
  const mainApp = $('mainApp');
  const backButton = $('dailyReadingBack');
  const eyebrow = $('dailyReadingEyebrow');
  const title = $('dailyReadingTitle');
  const intro = $('dailyReadingIntro');
  const stage = $('dailyReadingStage');
  const deck = $('dailyDeck');
  const choice = $('dailyChoice');
  const selected = $('dailySelected');
  const selectedCard = $('dailySelectedCard');
  const cardFront = $('dailyCardFront');
  const cardFallback = $('dailyCardFallback');
  const cardFallbackTitle = $('dailyCardFallbackTitle');
  const orientation = $('dailyOrientation');
  const status = $('dailyReadingStatus');
  const actions = $('dailyReadingActions');
  const primary = $('dailyReadingPrimary');
  const interpretation = $('dailyInterpretation');
  const themeLabel = $('dailyThemeLabel');
  const cardTitle = $('dailyCardTitle');
  const canonicalTitle = $('dailyCanonicalTitle');
  const keywordsLabel = $('dailyKeywordsLabel');
  const keywords = $('dailyKeywords');
  const meaning = $('dailyMeaning');
  const reflectionLabel = $('dailyReflectionLabel');
  const reflection = $('dailyReflection');
  const disclaimer = $('dailyDisclaimer');
  const storageNote = $('dailyStorageNote');
  const scroll = $('dailyReadingScroll');

  let session = null;
  let selectedData = null;
  let currentView = 'intro';
  let previousFocus = null;
  let activeTimer = null;
  let preloadedFront = null;
  let lifecycleToken = 0;

  function language() {
    return document.documentElement.lang === 'th' ? 'th' : 'en';
  }

  function t(key) {
    const lang = language();
    return COPY[lang][key] || COPY.en[key] || key;
  }

  function emitInteraction(type, detail = {}) {
    window.dispatchEvent(new CustomEvent('lgt:reading:interaction', {
      detail: { type, spreadId: 'daily', ...detail }
    }));
  }

  function clearTimer() {
    if (activeTimer) {
      window.clearTimeout(activeTimer);
      activeTimer = null;
    }
  }

  function after(ms, callback) {
    clearTimer();
    activeTimer = window.setTimeout(() => {
      activeTimer = null;
      callback();
    }, motionIsReduced() ? Math.min(ms, 80) : ms);
  }

  function setMainInert(value) {
    if (!mainApp) return;
    if ('inert' in mainApp) mainApp.inert = value;
    if (value) mainApp.setAttribute('aria-hidden', 'true');
    else mainApp.removeAttribute('aria-hidden');
  }

  function updateStaticCopy() {
    eyebrow.textContent = t('eyebrow');
    title.textContent = t('title');
    backButton.setAttribute('aria-label', t('back'));
    orientation.textContent = t('upright');
    themeLabel.textContent = t('theme');
    reflectionLabel.textContent = t('reflection');
    keywordsLabel.textContent = t('keywords');
    disclaimer.textContent = t('disclaimer');
    storageNote.textContent = t('storageFail');

    if (currentView === 'intro') {
      intro.textContent = t('intro');
      primary.textContent = t('begin');
    } else if (currentView === 'restored') {
      intro.textContent = t('restoredIntro');
      status.textContent = t('restored');
      primary.textContent = t('reveal');
    } else if (currentView === 'shuffling') {
      intro.textContent = t('intro');
      status.textContent = t('shuffling');
    } else if (currentView === 'choosing') {
      intro.textContent = t('chooseHint');
      status.textContent = t('choose');
    } else if (currentView === 'selected') {
      intro.textContent = t('selectedHint');
      status.textContent = t('selected');
      primary.textContent = t('reveal');
    } else if (currentView === 'revealed') {
      intro.textContent = '';
      status.textContent = '';
      primary.textContent = t('done');
    }

    if (selectedData) renderCardText(selectedData);
  }

  function renderCardText(card) {
    const lang = language();
    cardTitle.textContent = card.title[lang];
    canonicalTitle.textContent = lang === 'th' ? card.title.en : '';
    meaning.textContent = card.upright[lang];
    reflection.textContent = card.reflection[lang];
    keywords.replaceChildren(...card.keywords[lang].map((word) => {
      const span = document.createElement('span');
      span.textContent = word;
      return span;
    }));
    cardFront.alt = `${t('cardAlt')}${card.title[lang]}`;
    cardFallbackTitle.textContent = card.title[lang];
  }

  function resetVisuals() {
    clearTimer();
    currentView = 'intro';
    selectedData = null;
    preloadedFront = null;
    shell.classList.remove('is-revealed', 'is-active');
    deck.classList.remove('is-shuffling');
    deck.hidden = false;
    choice.hidden = true;
    choice.replaceChildren();
    selected.hidden = true;
    selectedCard.classList.remove('is-revealed');
    cardFront.removeAttribute('src');
    cardFront.hidden = false;
    cardFront.alt = '';
    cardFallback.hidden = true;
    cardFallbackTitle.textContent = '';
    orientation.hidden = true;
    status.textContent = '';
    actions.hidden = false;
    primary.disabled = false;
    interpretation.hidden = true;
    storageNote.hidden = true;
    scroll.scrollTop = 0;
  }

  function preloadCard(card) {
    if (!card?.image) return;
    preloadedFront = new Image();
    preloadedFront.decoding = 'async';
    preloadedFront.src = card.image;
  }

  function renderSelectedBack(restored = false) {
    deck.hidden = true;
    choice.hidden = true;
    selected.hidden = false;
    orientation.hidden = true;
    interpretation.hidden = true;
    actions.hidden = false;
    primary.disabled = false;
    currentView = restored ? 'restored' : 'selected';
    updateStaticCopy();
    preloadCard(selectedData);
  }

  function buildChoices(candidateIds) {
    choice.replaceChildren();
    candidateIds.forEach((cardId, index) => {
      const button = document.createElement('button');
      button.className = 'reading-card reading-card--choice';
      button.type = 'button';
      button.setAttribute('aria-label', `${t('choose')} ${index + 1}`);
      button.innerHTML = `<img src="${CONTENT.cardBack}" alt="" decoding="async">`;
      button.addEventListener('click', () => chooseCard(index, button), { once: true });
      choice.appendChild(button);
    });
  }

  function startShuffle() {
    if (!session || session.state !== 'idle') return;
    primary.disabled = true;
    actions.hidden = true;
    currentView = 'shuffling';
    updateStaticCopy();

    const candidates = session.prepareChoice(3);
    emitInteraction('shuffle-start');
    deck.classList.add('is-shuffling');

    after(980, () => {
      deck.classList.remove('is-shuffling');
      deck.hidden = true;
      buildChoices(candidates);
      choice.hidden = false;
      session.markChoosing();
      currentView = 'choosing';
      updateStaticCopy();
      emitInteraction('choose-ready');
      choice.querySelector('button')?.focus({ preventScroll: true });
    });
  }

  function chooseCard(index, button) {
    if (!session || session.state !== 'choosing') return;
    choice.querySelectorAll('button').forEach((node) => { node.disabled = true; });
    button.classList.add('is-chosen');
    selectedData = session.selectCandidate(index);
    const { persisted } = ENGINE.saveTodaySelection(session);
    if (!persisted) storageNote.hidden = false;
    emitInteraction('card-select', { cardId: selectedData.id });
    after(260, () => renderSelectedBack(false));
  }

  async function revealCard() {
    if (!session || session.state !== 'selected' || !selectedData) return;
    const revealToken = lifecycleToken;
    primary.disabled = true;
    currentView = 'revealing';
    status.textContent = t('loading');
    emitInteraction('card-reveal', { cardId: selectedData.id });
    session.beginReveal();

    cardFront.hidden = false;
    cardFallback.hidden = true;
    cardFront.src = selectedData.image;
    renderCardText(selectedData);
    let artworkReady = true;
    try {
      if (!cardFront.complete) await cardFront.decode();
      if (!cardFront.naturalWidth) artworkReady = false;
    } catch (_) {
      artworkReady = false;
    }

    if (revealToken !== lifecycleToken || shell.hidden) return;
    if (!artworkReady) {
      cardFront.hidden = true;
      cardFallback.hidden = false;
      emitInteraction('card-art-fallback', { cardId: selectedData.id });
    }

    selected.hidden = false;
    selectedCard.classList.add('is-revealed');
    orientation.hidden = false;

    after(640, () => {
      if (session.state === 'revealing') session.markRevealed();
      if (session.state === 'revealed') session.markInterpreted();
      currentView = 'revealed';
      interpretation.hidden = false;
      actions.hidden = false;
      primary.disabled = false;
      shell.classList.add('is-revealed');
      updateStaticCopy();
      after(80, () => interpretation.scrollIntoView({ behavior: motionIsReduced() ? 'auto' : 'smooth', block: 'nearest' }));
    });
  }

  function finishReading() {
    if (session?.state === 'interpreted') session.complete();
    closeDaily();
  }

  function primaryAction() {
    if (!session) return;
    if (currentView === 'intro') startShuffle();
    else if (currentView === 'restored' || currentView === 'selected') revealCard();
    else if (currentView === 'revealed') finishReading();
  }

  function openDaily() {
    if (!shell.hidden) return;
    lifecycleToken += 1;
    previousFocus = document.activeElement;
    resetVisuals();
    const daily = ENGINE.createOrRestoreDaily();
    session = daily.session;
    selectedData = daily.card;

    setMainInert(true);
    shell.hidden = false;
    requestAnimationFrame(() => shell.classList.add('is-active'));
    emitInteraction('reading-open');

    if (daily.restored && selectedData) {
      renderSelectedBack(true);
    } else {
      currentView = 'intro';
      updateStaticCopy();
    }

    after(20, () => backButton.focus({ preventScroll: true }));
  }

  function closeDaily() {
    if (shell.hidden) return;
    lifecycleToken += 1;
    clearTimer();
    emitInteraction('reading-close');
    shell.classList.remove('is-active');
    after(240, () => {
      shell.hidden = true;
      resetVisuals();
      session = null;
      setMainInert(false);
      if (previousFocus instanceof HTMLElement && document.contains(previousFocus)) {
        previousFocus.focus({ preventScroll: true });
      }
      previousFocus = null;
    });
  }

  document.querySelectorAll('[data-feature="daily"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openDaily();
    }, { capture: true });
  });

  backButton.addEventListener('click', closeDaily);
  primary.addEventListener('click', primaryAction);
  selectedCard.addEventListener('click', () => {
    if (currentView === 'restored' || currentView === 'selected') revealCard();
  });

  document.addEventListener('keydown', (event) => {
    if (!shell.hidden && event.key === 'Escape') {
      event.preventDefault();
      closeDaily();
    }
  });

  const languageObserver = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.attributeName === 'lang')) updateStaticCopy();
  });
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  window.LGTDailyGuidance = Object.freeze({ open: openDaily, close: closeDaily });
})();

(() => {
  'use strict';

  const ENGINE = window.LGTReadingEngine;
  const CONTENT = window.LGTReadingContent;
  const READING_EXPORT = window.LGTReadingExport;
  if (!ENGINE || !CONTENT || !READING_EXPORT) throw new Error('Daily Guidance UI requires Reading Engine, content, and shared Reading Export.');

  const COPY = {
    en: {
      eyebrow: 'DAILY GUIDANCE',
      title: 'A card for today',
      intro: 'Take a moment, settle in, and choose the card you feel drawn to.',
      restoredIntro: 'Today’s card is already set. You can return to the same card whenever you like.',
      begin: 'Begin',
      shuffling: 'Shuffling the deck',
      choose: 'Choose one card',
      chooseHint: 'There is no right or wrong choice. Pick the card you feel drawn to.',
      selected: 'Your card is chosen',
      selectedHint: 'This is your Daily Guidance card for today on this device.',
      reveal: 'Reveal the card',
      theme: 'TODAY’S THEME',
      reflection: 'REFLECTION QUESTION',
      done: 'Back to Home',
      back: 'Back to Home',
      upright: 'UPRIGHT',
      disclaimer: 'Use tarot as a tool for reflection, not a fixed prediction. Keep what feels useful and leave the rest.',
      storageFail: 'This device couldn’t save today’s card, so it may change after you reload the app.',
      cardAlt: 'Today’s tarot card: ',
      loading: 'Preparing your card',
      restored: 'TODAY’S CARD',
      keywords: 'KEYWORDS',
      lensesTitle: 'Explore today’s card',
      lensesHint: 'Open the area you want to look at more closely.',
      workGoals: 'Work & Goals',
      moneyResources: 'Money & Resources',
      loveRelationships: 'Love & Relationships',
      innerBalance: 'Inner State & Balance',
      opportunitiesWatchouts: 'Opportunities & Watch-outs',
      guidanceToday: 'Guidance for Today',
      saveShareTitle: 'SAVE OR SHARE',
      saveShareHint: 'Create a clean image of today’s reading to keep or share.',
      saveImage: 'Save Image',
      shareImage: 'Share',
      exportPreparing: 'Preparing your reading image',
      exportSaved: 'Your reading image has been saved.',
      exportShared: 'Your reading image is ready to share.',
      exportSavedFallback: 'Direct sharing is not available here, so the image was saved instead.',
      exportFailed: 'The image could not be created right now. Please try again.',
      exportCancelled: 'Sharing was cancelled.'
    },
    th: {
      eyebrow: 'คำแนะนำประจำวัน',
      title: 'ไพ่หนึ่งใบสำหรับวันนี้',
      intro: 'ใช้เวลาสักครู่ ผ่อนใจให้สบาย แล้วเลือกไพ่ใบที่รู้สึกดึงดูดใจคุณที่สุด',
      restoredIntro: 'ไพ่ประจำวันนี้ถูกเลือกไว้แล้ว คุณกลับมาอ่านใบเดิมได้ทุกเมื่อ',
      begin: 'เริ่ม',
      shuffling: 'กำลังสับไพ่',
      choose: 'เลือกไพ่หนึ่งใบ',
      chooseHint: 'ไม่ต้องคิดมากว่าใบไหนถูกหรือผิด เลือกใบที่คุณรู้สึกอยากหยิบมากที่สุด',
      selected: 'เลือกไพ่แล้ว',
      selectedHint: 'ไพ่ใบนี้จะเป็นไพ่ประจำวันนี้ของคุณบนอุปกรณ์เครื่องนี้',
      reveal: 'เปิดไพ่',
      theme: 'สิ่งที่ไพ่สะท้อนวันนี้',
      reflection: 'คำถามชวนทบทวน',
      done: 'กลับหน้าหลัก',
      back: 'กลับหน้าหลัก',
      upright: 'ไพ่ตั้งตรง',
      disclaimer: 'ใช้ไพ่ทาโรต์เป็นเครื่องมือช่วยทบทวนตัวเอง ไม่ใช่คำทำนายที่ตายตัว เลือกรับเฉพาะสิ่งที่เป็นประโยชน์กับคุณ',
      storageFail: 'อุปกรณ์นี้บันทึกไพ่ของวันนี้ไม่ได้ ไพ่จึงอาจเปลี่ยนหลังเปิดแอปใหม่',
      cardAlt: 'ไพ่ทาโรต์ประจำวันนี้: ',
      loading: 'กำลังเตรียมไพ่',
      restored: 'ไพ่ของวันนี้',
      keywords: 'คำสำคัญ',
      lensesTitle: 'มองไพ่ใบนี้ในเรื่องต่างๆ',
      lensesHint: 'เลือกเปิดเฉพาะเรื่องที่คุณอยากดูให้ชัดขึ้น',
      workGoals: 'งานและเป้าหมาย',
      moneyResources: 'เงินและทรัพยากร',
      loveRelationships: 'ความรักและความสัมพันธ์',
      innerBalance: 'พลังใจและสมดุลชีวิต',
      opportunitiesWatchouts: 'โอกาสและสิ่งที่ควรระวัง',
      guidanceToday: 'แนวทางสำหรับวันนี้',
      saveShareTitle: 'บันทึกหรือแชร์',
      saveShareHint: 'สร้างภาพผลการอ่านที่ดูสะอาดตาเพื่อเก็บไว้หรือส่งต่อได้ทันที',
      saveImage: 'บันทึกภาพ',
      shareImage: 'แชร์',
      exportPreparing: 'กำลังเตรียมภาพผลการอ่าน',
      exportSaved: 'บันทึกภาพผลการอ่านแล้ว',
      exportShared: 'เตรียมภาพสำหรับการแชร์แล้ว',
      exportSavedFallback: 'อุปกรณ์นี้แชร์ภาพตรงจากหน้านี้ไม่ได้ จึงบันทึกภาพลงเครื่องให้แทน',
      exportFailed: 'ยังสร้างภาพผลการอ่านไม่ได้ในตอนนี้ กรุณาลองใหม่อีกครั้ง',
      exportCancelled: 'ยกเลิกการแชร์แล้ว'
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
        <section class="reading-lenses" id="dailyLenses">
          <div class="reading-lenses__heading">
            <span id="dailyLensesTitle"></span>
            <p id="dailyLensesHint"></p>
          </div>
          <div class="reading-lenses__list" id="dailyLensesList"></div>
        </section>
        <section class="reading-share" id="dailySaveShare" hidden>
          <div class="reading-share__heading">
            <span id="dailySaveShareTitle"></span>
            <p id="dailySaveShareHint"></p>
          </div>
          <div class="reading-share__actions">
            <button class="reading-secondary" id="dailySaveImage" type="button"></button>
            <button class="reading-secondary reading-secondary--strong" id="dailyShareImage" type="button"></button>
          </div>
          <p class="reading-share__status" id="dailyShareStatus" role="status" aria-live="polite"></p>
        </section>
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
  const lensesTitle = $('dailyLensesTitle');
  const lensesHint = $('dailyLensesHint');
  const lensesList = $('dailyLensesList');
  const saveShare = $('dailySaveShare');
  const saveShareTitle = $('dailySaveShareTitle');
  const saveShareHint = $('dailySaveShareHint');
  const saveButton = $('dailySaveImage');
  const shareButton = $('dailyShareImage');
  const shareStatus = $('dailyShareStatus');
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
  let exportBusy = false;

  const LENS_KEYS = Object.freeze([
    'workGoals',
    'moneyResources',
    'loveRelationships',
    'innerBalance',
    'opportunitiesWatchouts',
    'guidanceToday'
  ]);

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

  function setReadingMode(value) {
    document.body.classList.toggle('is-reading-open', value);
  }

  function updateStaticCopy() {
    eyebrow.textContent = t('eyebrow');
    title.textContent = t('title');
    backButton.setAttribute('aria-label', t('back'));
    orientation.textContent = t('upright');
    themeLabel.textContent = t('theme');
    reflectionLabel.textContent = t('reflection');
    keywordsLabel.textContent = t('keywords');
    lensesTitle.textContent = t('lensesTitle');
    lensesHint.textContent = t('lensesHint');
    disclaimer.textContent = t('disclaimer');
    saveShareTitle.textContent = t('saveShareTitle');
    saveShareHint.textContent = t('saveShareHint');
    saveButton.textContent = t('saveImage');
    shareButton.textContent = t('shareImage');
    saveButton.setAttribute('aria-label', t('saveImage'));
    shareButton.setAttribute('aria-label', t('shareImage'));
    storageNote.textContent = t('storageFail');
    choice.setAttribute('aria-label', t('choose'));
    choice.querySelectorAll('[data-choice-index]').forEach((button) => {
      button.setAttribute('aria-label', `${t('choose')} ${Number(button.dataset.choiceIndex) + 1}`);
    });

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

  function renderDailyLenses(card) {
    const lang = language();
    const dailyLenses = card?.dailyLenses;
    if (!dailyLenses) {
      lensesList.replaceChildren();
      return;
    }

    const fragment = document.createDocumentFragment();
    LENS_KEYS.forEach((key) => {
      const details = document.createElement('details');
      details.className = 'reading-lens';

      const summary = document.createElement('summary');
      const label = document.createElement('span');
      label.textContent = t(key);
      summary.appendChild(label);

      const body = document.createElement('p');
      body.textContent = dailyLenses[key][lang];

      details.append(summary, body);
      details.addEventListener('toggle', () => {
        if (!details.open) return;
        lensesList.querySelectorAll('details[open]').forEach((other) => {
          if (other !== details) other.open = false;
        });
        emitInteraction('daily-lens-open', { lens: key, cardId: card.id });
      });
      fragment.appendChild(details);
    });
    lensesList.replaceChildren(fragment);
  }

  function renderCardText(card) {
    const lang = language();
    cardTitle.textContent = card.title[lang];
    canonicalTitle.textContent = lang === 'th' ? card.title.en : '';
    meaning.textContent = card.upright[lang];
    reflection.textContent = card.reflection[lang];
    renderDailyLenses(card);
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
    saveShare.hidden = true;
    shareStatus.textContent = '';
    saveButton.disabled = false;
    shareButton.disabled = false;
    exportBusy = false;
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
      button.dataset.choiceIndex = String(index);
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
      saveShare.hidden = false;
      actions.hidden = false;
      primary.disabled = false;
      shell.classList.add('is-revealed');
      updateStaticCopy();
      after(80, () => interpretation.scrollIntoView({ behavior: motionIsReduced() ? 'auto' : 'smooth', block: 'nearest' }));
    });
  }



  function formatLocalDate(lang) {
    try {
      return new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-US', { dateStyle: 'long' }).format(new Date());
    } catch (_) {
      return new Date().toLocaleDateString();
    }
  }

  function wrapCanvasText(ctx, text, maxWidth) {
    const source = String(text || '').trim();
    if (!source) return [''];

    const lines = [];
    const paragraphs = source.split(/\n+/);

    const pushToken = (token, state) => {
      if (!token) return state;
      const tryWhole = `${state}${token}`;
      if (!state || ctx.measureText(tryWhole).width <= maxWidth) return tryWhole;

      let current = state;
      for (const char of Array.from(token)) {
        const tryChar = `${current}${char}`;
        if (!current || ctx.measureText(tryChar).width <= maxWidth) current = tryChar;
        else {
          lines.push(current.trim());
          current = char;
        }
      }
      return current;
    };

    paragraphs.forEach((paragraph) => {
      const tokens = paragraph.split(/(\s+)/).filter((token) => token.length);
      let current = '';
      tokens.forEach((token) => {
        current = pushToken(token, current);
      });
      if (current.trim()) lines.push(current.trim());
    });

    return lines.length ? lines : [''];
  }

  function drawRoundedRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function drawMultiline(ctx, lines, x, yStart, lineHeight, options = {}) {
    const {
      align = 'center',
      color = 'rgba(255,248,233,.86)',
      font = '16px serif'
    } = options;
    ctx.textAlign = align;
    ctx.fillStyle = color;
    ctx.font = font;
    lines.forEach((line, index) => ctx.fillText(line, x, yStart + (index * lineHeight)));
    return yStart + (lines.length * lineHeight);
  }

  async function buildReadingImageBlob() {
    if (!selectedData) throw new Error('No selected card to export.');

    const lang = language();
    const card = selectedData;
    const lensEntries = LENS_KEYS.map((key) => ({
      label: t(key),
      text: card.dailyLenses?.[key]?.[lang] || ''
    }));

    if (document.fonts?.ready) {
      try { await document.fonts.ready; } catch (_) {}
    }

    const scale = 2;
    const width = 540 * scale;
    const padding = 34 * scale;
    const contentWidth = width - (padding * 2);
    const cardWidth = 190 * scale;
    const cardHeight = Math.round(cardWidth * (1672 / 941));
    const sectionGap = 20 * scale;
    const lensGap = 18 * scale;
    const bodyLine = 28 * scale;
    const reflectionLine = 26 * scale;
    const lensLine = 25 * scale;
    const smallLine = 18 * scale;
    const footerLine = 20 * scale;

    const titleFont = `${24 * scale}px "Noto Serif Thai", "Cormorant Garamond", serif`;
    const canonFont = `500 ${12 * scale}px "Cormorant Garamond", Georgia, serif`;
    const bodyFont = `${16 * scale}px "Noto Serif Thai", "Cormorant Garamond", serif`;
    const labelFont = `600 ${12 * scale}px "Noto Serif Thai", "Cormorant Garamond", serif`;
    const hintFont = `${12 * scale}px "Noto Serif Thai", sans-serif`;

    const measureCanvas = document.createElement('canvas');
    const mctx = measureCanvas.getContext('2d');
    const blocks = {};
    const measure = (key, text, font, maxWidth, lineHeight) => {
      mctx.font = font;
      const lines = wrapCanvasText(mctx, text, maxWidth);
      blocks[key] = { lines, lineHeight, font };
      return lines.length * lineHeight;
    };

    let height = padding;
    height += 18 * scale;
    height += 18 * scale;
    height += 26 * scale;
    height += cardHeight;
    height += 24 * scale;
    height += measure('title', card.title[lang], titleFont, contentWidth, 34 * scale);
    height += 26 * scale;
    height += 18 * scale;
    height += measure('keywords', card.keywords[lang].join(' • '), bodyFont, contentWidth, 24 * scale);
    height += sectionGap;
    height += 18 * scale;
    height += measure('meaning', card.upright[lang], bodyFont, contentWidth, bodyLine);
    height += sectionGap;
    height += (measure('reflection', card.reflection[lang], bodyFont, contentWidth - (32 * scale), reflectionLine) + 44 * scale);
    height += 18 * scale;
    height += 18 * scale;
    height += measure('lensesHint', t('lensesHint'), hintFont, contentWidth, smallLine);
    height += 16 * scale;
    for (const [index, entry] of lensEntries.entries()) {
      height += measure(`lens${index}`, entry.text, bodyFont, contentWidth - (32 * scale), lensLine) + 44 * scale + lensGap;
    }
    height += 24 * scale;
    height += measure('footer', t('disclaimer'), hintFont, contentWidth, footerLine);
    height += padding;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const background = ctx.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, '#0d3031');
    background.addColorStop(.5, '#082526');
    background.addColorStop(1, '#061c1d');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(width / 2, 180 * scale, 0, width / 2, 180 * scale, 320 * scale);
    glow.addColorStop(0, 'rgba(229,189,112,.14)');
    glow.addColorStop(1, 'rgba(229,189,112,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, 420 * scale);

    let y = padding;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(229,189,112,.82)';
    ctx.font = `600 ${11 * scale}px "Cormorant Garamond", "Noto Serif Thai", serif`;
    ctx.fillText('LITTLE GANESHA TAROT', width / 2, y);
    y += 18 * scale;
    ctx.fillStyle = 'rgba(255,248,233,.7)';
    ctx.font = `500 ${13 * scale}px "Noto Serif Thai", "Cormorant Garamond", serif`;
    ctx.fillText(formatLocalDate(lang), width / 2, y);
    y += 26 * scale;

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.34)';
    ctx.shadowBlur = 24 * scale;
    ctx.shadowOffsetY = 12 * scale;
    drawRoundedRect(ctx, (width - cardWidth) / 2, y, cardWidth, cardHeight, 14 * scale);
    ctx.clip();
    try {
      const image = await loadImage(card.image);
      ctx.drawImage(image, (width - cardWidth) / 2, y, cardWidth, cardHeight);
    } catch (_) {
      ctx.fillStyle = '#12393a';
      ctx.fillRect((width - cardWidth) / 2, y, cardWidth, cardHeight);
      ctx.fillStyle = 'rgba(229,189,112,.9)';
      ctx.font = `600 ${15 * scale}px "Noto Serif Thai", "Cormorant Garamond", serif`;
      ctx.fillText(card.title[lang], width / 2, y + (cardHeight / 2));
    }
    ctx.restore();
    y += cardHeight + 24 * scale;

    y = drawMultiline(ctx, blocks['title'].lines, width / 2, y, 34 * scale, {
      align: 'center',
      color: '#f7d995',
      font: titleFont
    });
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,248,233,.42)';
    ctx.font = canonFont;
    ctx.fillText(card.canonicalTitle, width / 2, y + 10 * scale);
    y += 26 * scale;

    ctx.fillStyle = 'rgba(229,189,112,.72)';
    ctx.font = labelFont;
    ctx.fillText(t('keywords'), width / 2, y);
    y += 18 * scale;
    y = drawMultiline(ctx, blocks['keywords'].lines, width / 2, y, 24 * scale, {
      align: 'center',
      color: 'rgba(255,248,233,.7)',
      font: bodyFont
    });
    y += sectionGap;

    ctx.fillStyle = 'rgba(229,189,112,.72)';
    ctx.font = labelFont;
    ctx.fillText(t('theme'), width / 2, y);
    y += 20 * scale;
    y = drawMultiline(ctx, blocks['meaning'].lines, padding, y, bodyLine, {
      align: 'left',
      color: 'rgba(255,248,233,.84)',
      font: bodyFont
    });
    y += sectionGap;

    const reflectionHeight = (blocks['reflection'].lines.length * reflectionLine) + 44 * scale;
    drawRoundedRect(ctx, padding, y - 8 * scale, contentWidth, reflectionHeight, 12 * scale);
    ctx.fillStyle = 'rgba(229,189,112,.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(229,189,112,.12)';
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();
    ctx.fillStyle = 'rgba(229,189,112,.75)';
    ctx.font = labelFont;
    ctx.textAlign = 'left';
    ctx.fillText(t('reflection'), padding + 16 * scale, y + 12 * scale);
    y = drawMultiline(ctx, blocks['reflection'].lines, padding + 16 * scale, y + 36 * scale, reflectionLine, {
      align: 'left',
      color: 'rgba(255,248,233,.78)',
      font: bodyFont
    });
    y += 18 * scale;

    ctx.fillStyle = 'rgba(229,189,112,.72)';
    ctx.font = labelFont;
    ctx.textAlign = 'center';
    ctx.fillText(t('lensesTitle'), width / 2, y);
    y += 18 * scale;
    y = drawMultiline(ctx, blocks['lensesHint'].lines, width / 2, y, smallLine, {
      align: 'center',
      color: 'rgba(255,248,233,.46)',
      font: hintFont
    });
    y += 16 * scale;

    lensEntries.forEach((entry, index) => {
      const block = blocks[`lens${index}`];
      const boxHeight = (block.lines.length * lensLine) + 44 * scale;
      drawRoundedRect(ctx, padding, y - 8 * scale, contentWidth, boxHeight, 12 * scale);
      ctx.fillStyle = 'rgba(255,255,255,.02)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(247,217,147,.11)';
      ctx.lineWidth = 1.2 * scale;
      ctx.stroke();
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(229,189,112,.76)';
      ctx.font = labelFont;
      ctx.fillText(entry.label, padding + 16 * scale, y + 12 * scale);
      y = drawMultiline(ctx, block.lines, padding + 16 * scale, y + 36 * scale, lensLine, {
        align: 'left',
        color: 'rgba(255,248,233,.74)',
        font: bodyFont
      });
      y += lensGap;
    });

    ctx.strokeStyle = 'rgba(255,248,233,.07)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
    y += 22 * scale;
    drawMultiline(ctx, blocks['footer'].lines, width / 2, y, footerLine, {
      align: 'center',
      color: 'rgba(255,248,233,.38)',
      font: hintFont
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Failed to create image blob.')), 'image/png');
    });
  }

  function filenameForCard(card) {
    const base = `${new Date().toISOString().slice(0, 10)}-${card.canonicalTitle || card.title.en || 'reading'}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `little-ganesha-tarot-daily-${base}.png`;
  }

  async function runExport(action = 'save') {
    if (exportBusy || !selectedData) return;
    exportBusy = true;
    saveButton.disabled = true;
    shareButton.disabled = true;

    try {
      await READING_EXPORT.execute({
        action,
        buildBlob: buildReadingImageBlob,
        filename: filenameForCard(selectedData),
        shareTitle: language() === 'th' ? 'ผลการอ่านไพ่ประจำวัน' : 'Daily Guidance Reading',
        shareText: language() === 'th' ? 'ผลการอ่านไพ่จาก Little Ganesha Tarot' : 'My Daily Guidance from Little Ganesha Tarot',
        onStatus: (message) => { shareStatus.textContent = message; },
        onEvent: (eventType) => {
          if (eventType === 'share') emitInteraction('reading-share', { cardId: selectedData.id });
          else emitInteraction('reading-save', { cardId: selectedData.id, fallbackFromShare: eventType === 'save-fallback' });
        },
        messages: {
          preparing: t('exportPreparing'),
          saved: t('exportSaved'),
          shared: t('exportShared'),
          savedFallback: t('exportSavedFallback'),
          cancelled: t('exportCancelled')
        }
      });
    } catch (error) {
      console.error(error);
      shareStatus.textContent = t('exportFailed');
    } finally {
      exportBusy = false;
      saveButton.disabled = false;
      shareButton.disabled = false;
    }
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
    setReadingMode(true);
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
      setReadingMode(false);
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

  saveButton.addEventListener('click', () => { runExport('save'); });
  shareButton.addEventListener('click', () => { runExport('share'); });

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

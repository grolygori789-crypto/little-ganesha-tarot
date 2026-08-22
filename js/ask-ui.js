(() => {
  'use strict';

  const ENGINE = window.LGTReadingEngine;
  const CONTENT = window.LGTReadingContent;
  const GUARD = window.LGTQuestionGuard;
  const ASK_CONTENT = window.LGTAskContent;
  const ASK_STORAGE = window.LGTAskStorage;
  const ANALYZER = window.LGTQuestionAnalyzer;
  const ASK_CONTEXT = window.LGTAskContext;
  const QUESTION_CONTRACT = window.LGTQuestionContract;
  const ASK_SEMANTIC = window.LGTAskSemantic;
  const READING_EXPORT = window.LGTReadingExport;
  const ASK_EXPORT = window.LGTAskExport;
  const DECK_RITUAL = window.LGTDeckRitual;

  if (!ENGINE || !CONTENT || !GUARD || !ASK_CONTENT || !ASK_STORAGE || !ANALYZER || !ASK_CONTEXT || !QUESTION_CONTRACT || !ASK_SEMANTIC || !READING_EXPORT || !ASK_EXPORT || !DECK_RITUAL) {
    throw new Error('Ask Ganesha requires Reading Engine, tarot content, Question Guard, Ask content, Ask storage, Question Analyzer, Question Contract, Ask Context, Semantic Ask, Deck Ritual, and shared reading export.');
  }

  const ORIENTATION = 'upright';

  const COPY = {
    en: {
      eyebrow: 'ASK GANESHA',
      title: 'Bring one question',
      intro: 'Hold one thing in mind that you would like to see more clearly.',
      questionLabel: 'What would you like to ask?',
      placeholder: 'Write one clear question…',
      questionHint: 'Focus on one question at a time for a clearer reading. Your question stays on this device.',
      askCards: 'Ask the Cards',
      back: 'Back to Home',
      sealedLabel: 'YOUR QUESTION',
      sealing: 'Holding your question',
      shuffling: 'Shuffling the deck',
      choose: 'Choose one card',
      chooseHint: 'Keep your question in mind, move through the shuffled deck, and choose the card that draws you in.',
      selected: 'Your card is chosen',
      selectedHint: 'Take a moment with your question, then reveal the card when you are ready.',
      restored: 'SAME QUESTION · SAME CARD',
      restoredHint: 'You have asked this same question today, so the same card is waiting for you.',
      reveal: 'Reveal the Card',
      loading: 'Preparing your reading',
      upright: 'UPRIGHT',
      questionRecap: 'YOUR QUESTION',
      focusPrompt: 'What should the cards focus on?',
      focusHint: 'Your question touches more than one area. Choose the one that matters most for this reading.',
      focusLabel: 'READING FOCUS',
      directAnswer: 'ANSWER TO YOUR QUESTION',
      whyThisCard: 'WHY THIS CARD POINTS THERE',
      conditionsTitle: 'WHAT TO KEEP IN VIEW',
      ganeshaReflection: "LITTLE GANESHA'S REFLECTION",
      carryForward: 'A QUESTION TO CARRY FORWARD',
      keywords: 'KEYWORDS',
      askAnother: 'Ask Another Question',
      saveShareTitle: 'SAVE OR SHARE',
      saveShareHint: 'Save a complete copy, or share a clean reading image. Your exact question is hidden from shared images unless you choose to include it.',
      saveImage: 'Save Image',
      shareImage: 'Share',
      includeQuestion: 'Include my question in the shared image',
      includeQuestionHint: 'Off by default. The reading itself may still reveal the topic.',
      exportPreparing: 'Preparing your reading image',
      exportSaved: 'Your complete reading image has been saved.',
      exportShared: 'Your reading image is ready to share.',
      exportSavedFallback: 'Direct sharing is not available here, so the image was saved instead.',
      exportFailed: 'The image could not be created right now. Please try again.',
      exportCancelled: 'Sharing was cancelled.',
      disclaimer: 'Use tarot as a tool for reflection, not a fixed prediction. Keep what feels useful and make important decisions with real-world information as well.',
      storageFail: 'This device could not remember this question. If you ask it again today, a different card may appear.',
      cardAlt: 'Tarot card for your question: ',
      required: 'Write one question before continuing.',
      tooLong: 'Please shorten your question before continuing.',
      multipleQuestions: 'Please focus on one question at a time.',
      spam: 'Please write a clear question using ordinary words.',
      inappropriate: 'Please rephrase your question using respectful and appropriate language before continuing.',
      safetyCrisis: 'This sounds like an immediate safety concern rather than a tarot question. Please reach out to someone you trust or local emergency support if you may be in danger.',
      boundaryMedical: 'Tarot cannot diagnose illness, pregnancy, or recovery. Please reframe this as a question about how to care for yourself or what to consider next.',
      boundaryLegal: 'Tarot cannot determine a court verdict or legal outcome. Please reframe this around what you can prepare, understand, or decide.',
      boundaryGambling: 'Tarot is not used here to predict lottery or gambling outcomes. Please ask about your choices, priorities, or relationship with money instead.',
      boundaryFinancial: 'Tarot cannot reliably predict a specific investment price or guaranteed return. Please reframe this around your risk, priorities, or decision process.',
      boundaryDeath: 'Tarot cannot determine when someone will die. Please reframe this around the feelings, choices, or care involved in the situation.'
    },
    th: {
      eyebrow: 'ถามพระพิฆเนศน้อย',
      title: 'หนึ่งคำถามที่อยู่ในใจ',
      intro: 'นึกถึงหนึ่งเรื่องที่คุณอยากมองให้ชัดขึ้น แล้วค่อยๆ เขียนคำถามออกมา',
      questionLabel: 'คุณอยากถามเรื่องอะไร?',
      placeholder: 'เขียนคำถามหนึ่งเรื่องที่ชัดเจน…',
      questionHint: 'ถามทีละหนึ่งเรื่อง เพื่อให้การอ่านไพ่มีจุดโฟกัสที่ชัดเจน คำถามจะอยู่บนอุปกรณ์นี้เท่านั้น',
      askCards: 'ถามไพ่',
      back: 'กลับหน้าหลัก',
      sealedLabel: 'คำถามของคุณ',
      sealing: 'กำลังวางคำถามไว้กับไพ่',
      shuffling: 'กำลังสับไพ่',
      choose: 'เลือกไพ่หนึ่งใบ',
      chooseHint: 'นึกถึงคำถามของคุณไว้ แล้วค่อยๆ เลื่อนไปตามสำรับที่สับไว้ เลือกใบที่สะดุดใจที่สุด',
      selected: 'เลือกไพ่แล้ว',
      selectedHint: 'อยู่กับคำถามของคุณสักครู่ แล้วค่อยเปิดไพ่เมื่อพร้อม',
      restored: 'คำถามเดิม · ไพ่ใบเดิม',
      restoredHint: 'วันนี้คุณเคยถามคำถามเดียวกันแล้ว ไพ่ใบเดิมจึงรออยู่ตรงนี้',
      reveal: 'เปิดไพ่',
      loading: 'กำลังเตรียมผลการอ่าน',
      upright: 'ไพ่ตั้งตรง',
      questionRecap: 'คำถามของคุณ',
      focusPrompt: 'อยากให้ไพ่โฟกัสเรื่องไหนมากกว่า?',
      focusHint: 'คำถามนี้แตะมากกว่าหนึ่งเรื่อง เลือกหนึ่งด้านที่สำคัญที่สุดสำหรับการอ่านครั้งนี้',
      focusLabel: 'จุดโฟกัสของการอ่าน',
      directAnswer: 'คำตอบต่อคำถามของคุณ',
      whyThisCard: 'ทำไมไพ่ใบนี้จึงสะท้อนแบบนั้น',
      conditionsTitle: 'สิ่งที่ควรคำนึงประกอบ',
      ganeshaReflection: 'มุมมองจากพระพิฆเนศน้อย',
      carryForward: 'คำถามชวนทบทวนต่อ',
      keywords: 'คำสำคัญ',
      askAnother: 'ถามเรื่องอื่น',
      saveShareTitle: 'บันทึกหรือแชร์',
      saveShareHint: 'บันทึกผลการอ่านฉบับเต็ม หรือสร้างภาพสะอาดตาสำหรับแชร์ โดยระบบจะซ่อนข้อความคำถามของคุณจากภาพที่แชร์ไว้ก่อน',
      saveImage: 'บันทึกภาพ',
      shareImage: 'แชร์',
      includeQuestion: 'แสดงคำถามของฉันในภาพที่แชร์',
      includeQuestionHint: 'ค่าเริ่มต้นคือซ่อนคำถาม ทั้งนี้เนื้อหาผลการอ่านอาจยังบอกได้ว่าคุณถามเกี่ยวกับเรื่องใด',
      exportPreparing: 'กำลังเตรียมภาพผลการอ่าน',
      exportSaved: 'บันทึกภาพผลการอ่านฉบับเต็มแล้ว',
      exportShared: 'เตรียมภาพสำหรับการแชร์แล้ว',
      exportSavedFallback: 'อุปกรณ์นี้แชร์ภาพตรงจากหน้านี้ไม่ได้ จึงบันทึกภาพลงเครื่องให้แทน',
      exportFailed: 'ยังสร้างภาพผลการอ่านไม่ได้ในตอนนี้ กรุณาลองใหม่อีกครั้ง',
      exportCancelled: 'ยกเลิกการแชร์แล้ว',
      disclaimer: 'ใช้ไพ่ทาโรต์เป็นเครื่องมือช่วยทบทวนตัวเอง ไม่ใช่คำทำนายที่ตายตัว เลือกรับเฉพาะสิ่งที่เป็นประโยชน์ และใช้ข้อมูลในโลกจริงประกอบการตัดสินใจเรื่องสำคัญเสมอ',
      storageFail: 'อุปกรณ์นี้จำคำถามนี้ไว้ไม่ได้ หากถามซ้ำอีกครั้งในวันนี้ ไพ่จึงอาจเปลี่ยนไป',
      cardAlt: 'ไพ่ทาโรต์สำหรับคำถามของคุณ: ',
      required: 'กรุณาเขียนคำถามหนึ่งเรื่องก่อนเริ่มการอ่านไพ่',
      tooLong: 'กรุณาย่อคำถามให้สั้นลงก่อนเริ่มการอ่านไพ่',
      multipleQuestions: 'กรุณาถามทีละหนึ่งเรื่อง เพื่อให้การอ่านไพ่มีจุดโฟกัสที่ชัดเจน',
      spam: 'กรุณาเขียนคำถามให้ชัดเจนด้วยข้อความตามปกติ',
      inappropriate: 'กรุณาปรับถ้อยคำของคำถามให้สุภาพและเหมาะสมก่อนเริ่มการอ่านไพ่',
      safetyCrisis: 'ข้อความนี้ดูเป็นเรื่องความปลอดภัยเร่งด่วนมากกว่าคำถามสำหรับไพ่ หากคุณอาจอยู่ในอันตราย กรุณาติดต่อคนที่ไว้ใจหรือหน่วยช่วยเหลือฉุกเฉินในพื้นที่ของคุณ',
      boundaryMedical: 'ไพ่ทาโรต์ไม่สามารถวินิจฉัยโรค การตั้งครรภ์ หรือผลการรักษาได้ ลองปรับคำถามเป็นเรื่องการดูแลตัวเองหรือสิ่งที่ควรพิจารณาต่อ',
      boundaryLegal: 'ไพ่ทาโรต์ไม่สามารถตัดสินผลคดีหรือคำพิพากษาได้ ลองปรับคำถามเป็นสิ่งที่คุณเตรียมตัว ทำความเข้าใจ หรือตัดสินใจได้',
      boundaryGambling: 'ที่นี่ไม่ใช้ไพ่ทาโรต์ทำนายผลหวยหรือการพนัน ลองถามเรื่องการตัดสินใจ ลำดับความสำคัญ หรือความสัมพันธ์ของคุณกับเงินแทน',
      boundaryFinancial: 'ไพ่ทาโรต์ไม่สามารถทำนายราคาการลงทุนหรือรับประกันผลตอบแทนได้ ลองปรับคำถามไปที่ความเสี่ยง ลำดับความสำคัญ หรือกระบวนการตัดสินใจของคุณแทน',
      boundaryDeath: 'ไพ่ทาโรต์ไม่สามารถระบุว่าใครจะเสียชีวิตเมื่อใด ลองปรับคำถามไปที่ความรู้สึก การตัดสินใจ หรือการดูแลที่เกี่ยวข้องกับสถานการณ์นี้'
    }
  };

  const motionIsReduced = () => document.documentElement.dataset.motion === 'reduced'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const shell = document.createElement('section');
  shell.className = 'reading-shell ask-shell';
  shell.id = 'askReadingView';
  shell.hidden = true;
  shell.setAttribute('role', 'region');
  shell.setAttribute('aria-labelledby', 'askReadingTitle');
  shell.innerHTML = `
    <div class="reading-ambient" aria-hidden="true">
      <span class="reading-orb reading-orb--one"></span>
      <span class="reading-orb reading-orb--two"></span>
      <span class="ask-sacred-mark"></span>
    </div>
    <header class="reading-header">
      <button class="reading-back" id="askReadingBack" type="button" aria-label="Back to Home"><span aria-hidden="true">‹</span></button>
      <div class="reading-header__copy">
        <span class="reading-eyebrow" id="askReadingEyebrow"></span>
        <h2 id="askReadingTitle"></h2>
      </div>
      <span class="reading-header__balance" aria-hidden="true"></span>
    </header>

    <div class="reading-scroll" id="askReadingScroll">
      <div class="reading-intro" id="askReadingIntro"></div>

      <section class="ask-question-card" id="askQuestionCard" aria-labelledby="askQuestionLabel">
        <div class="ask-question-card__ornament" aria-hidden="true">✦</div>
        <label class="ask-question-label" id="askQuestionLabel" for="askQuestionInput"></label>
        <div class="ask-question-field" id="askQuestionField">
          <textarea id="askQuestionInput" rows="4" maxlength="${GUARD.maxLength}" autocomplete="off" spellcheck="true"></textarea>
          <span class="ask-question-count" id="askQuestionCount" aria-hidden="true">0/${GUARD.maxLength}</span>
        </div>
        <p class="ask-question-hint" id="askQuestionHint"></p>
        <p class="ask-question-error" id="askQuestionError" role="alert" aria-live="polite"></p>
        <button class="reading-primary ask-submit" id="askQuestionSubmit" type="button" disabled></button>
      </section>

      <section class="ask-focus-card" id="askFocusCard" hidden aria-labelledby="askFocusTitle">
        <div class="ask-question-card__ornament" aria-hidden="true">✦</div>
        <span class="ask-focus-kicker" id="askFocusKicker"></span>
        <h3 id="askFocusTitle"></h3>
        <p id="askFocusHint"></p>
        <div class="ask-focus-options" id="askFocusOptions"></div>
      </section>

      <section class="ask-question-seal" id="askQuestionSeal" hidden aria-live="polite">
        <span id="askSealLabel"></span>
        <blockquote id="askSealText"></blockquote>
        <span class="ask-question-seal__glyph" aria-hidden="true">✦</span>
      </section>

      <div class="reading-stage ask-stage" id="askReadingStage" hidden>
        <div class="reading-deck" id="askDeck" aria-hidden="true">
          <img src="${CONTENT.cardBack}" alt="" decoding="async">
          <img src="${CONTENT.cardBack}" alt="" decoding="async">
          <img src="${CONTENT.cardBack}" alt="" decoding="async">
        </div>

        <div class="reading-choice" id="askChoice" hidden aria-label="Choose one card"></div>

        <div class="reading-selected" id="askSelected" hidden>
          <button class="reading-card reading-card--selected" id="askSelectedCard" type="button">
            <span class="reading-card__inner">
              <span class="reading-card__face reading-card__back"><img src="${CONTENT.cardBack}" alt="" decoding="async"></span>
              <span class="reading-card__face reading-card__front">
                <img id="askCardFront" src="" alt="" decoding="async">
                <span class="reading-card__fallback" id="askCardFallback" hidden aria-hidden="true">
                  <span aria-hidden="true">✦</span><strong id="askCardFallbackTitle"></strong>
                </span>
              </span>
            </span>
          </button>
          <span class="reading-orientation" id="askOrientation"></span>
        </div>
      </div>

      <div class="reading-status" id="askReadingStatus" role="status" aria-live="polite"></div>
      <div class="reading-actions ask-reading-actions" id="askReadingActions" hidden>
        <button class="reading-primary" id="askReadingPrimary" type="button"></button>
        <button class="reading-home-action" id="askBackHome" type="button" hidden></button>
      </div>

      <article class="reading-interpretation ask-interpretation" id="askInterpretation" hidden>
        <section class="ask-result-question">
          <span id="askResultQuestionLabel"></span>
          <p id="askResultQuestion"></p>
        </section>
        <div class="reading-card-title">
          <h3 id="askCardTitle"></h3>
          <p id="askCanonicalTitle"></p>
        </div>
        <div class="reading-keywords">
          <span id="askKeywordsLabel"></span>
          <div id="askKeywords"></div>
        </div>
        <section class="ask-reading-focus" id="askReadingFocus">
          <span id="askFocusResultLabel"></span>
          <strong id="askFocusResult"></strong>
        </section>
        <section class="ask-reading-block ask-reading-block--direct">
          <span id="askDirectLabel"></span>
          <p id="askDirectAnswer"></p>
        </section>
        <section class="ask-reading-block">
          <span id="askWhyLabel"></span>
          <p id="askWhyText"></p>
        </section>
        <section class="ask-reading-block ask-reading-block--conditions">
          <span id="askConditionLabel"></span>
          <p id="askConditionText"></p>
        </section>
        <section class="ask-reading-block ask-reading-block--ganesha">
          <span id="askGaneshaLabel"></span>
          <p id="askGaneshaText"></p>
        </section>
        <section class="reading-reflection ask-reading-block ask-reading-block--reflection">
          <span id="askCarryLabel"></span>
          <p id="askReflection"></p>
        </section>
        <section class="reading-share ask-reading-share" id="askSaveShare" hidden>
          <div class="reading-share__heading">
            <span id="askSaveShareTitle"></span>
            <p id="askSaveShareHint"></p>
          </div>
          <label class="ask-share-question-option" for="askIncludeQuestion">
            <span class="ask-share-question-control">
              <input id="askIncludeQuestion" type="checkbox">
              <span id="askIncludeQuestionLabel"></span>
            </span>
            <small id="askIncludeQuestionHint"></small>
          </label>
          <div class="reading-share__actions">
            <button class="reading-secondary" id="askSaveImage" type="button"></button>
            <button class="reading-secondary reading-secondary--strong" id="askShareImage" type="button"></button>
          </div>
          <p class="reading-share__status" id="askShareStatus" role="status" aria-live="polite"></p>
        </section>
        <p class="reading-disclaimer" id="askDisclaimer"></p>
      </article>

      <p class="reading-storage-note" id="askStorageNote" hidden></p>
    </div>
  `;

  document.getElementById('app')?.appendChild(shell);

  const $ = (id) => document.getElementById(id);
  const mainApp = $('mainApp');
  const backButton = $('askReadingBack');
  const eyebrow = $('askReadingEyebrow');
  const title = $('askReadingTitle');
  const intro = $('askReadingIntro');
  const questionCard = $('askQuestionCard');
  const questionLabel = $('askQuestionLabel');
  const questionField = $('askQuestionField');
  const questionInput = $('askQuestionInput');
  const questionCount = $('askQuestionCount');
  const questionHint = $('askQuestionHint');
  const questionError = $('askQuestionError');
  const questionSubmit = $('askQuestionSubmit');
  const focusCard = $('askFocusCard');
  const focusKicker = $('askFocusKicker');
  const focusTitle = $('askFocusTitle');
  const focusHint = $('askFocusHint');
  const focusOptions = $('askFocusOptions');
  const questionSeal = $('askQuestionSeal');
  const sealLabel = $('askSealLabel');
  const sealText = $('askSealText');
  const stage = $('askReadingStage');
  const deck = $('askDeck');
  const choice = $('askChoice');
  const selected = $('askSelected');
  const selectedCard = $('askSelectedCard');
  const cardFront = $('askCardFront');
  const cardFallback = $('askCardFallback');
  const cardFallbackTitle = $('askCardFallbackTitle');
  const orientation = $('askOrientation');
  const status = $('askReadingStatus');
  const actions = $('askReadingActions');
  const primary = $('askReadingPrimary');
  const homeAction = $('askBackHome');
  const interpretation = $('askInterpretation');
  const resultQuestionLabel = $('askResultQuestionLabel');
  const resultQuestion = $('askResultQuestion');
  const cardTitle = $('askCardTitle');
  const canonicalTitle = $('askCanonicalTitle');
  const keywordsLabel = $('askKeywordsLabel');
  const keywords = $('askKeywords');
  const focusResultLabel = $('askFocusResultLabel');
  const focusResult = $('askFocusResult');
  const directLabel = $('askDirectLabel');
  const directAnswer = $('askDirectAnswer');
  const whyLabel = $('askWhyLabel');
  const whyText = $('askWhyText');
  const conditionLabel = $('askConditionLabel');
  const conditionText = $('askConditionText');
  const ganeshaLabel = $('askGaneshaLabel');
  const ganeshaText = $('askGaneshaText');
  const carryLabel = $('askCarryLabel');
  const reflection = $('askReflection');
  const saveShare = $('askSaveShare');
  const saveShareTitle = $('askSaveShareTitle');
  const saveShareHint = $('askSaveShareHint');
  const includeQuestion = $('askIncludeQuestion');
  const includeQuestionLabel = $('askIncludeQuestionLabel');
  const includeQuestionHint = $('askIncludeQuestionHint');
  const saveButton = $('askSaveImage');
  const shareButton = $('askShareImage');
  const shareStatus = $('askShareStatus');
  const disclaimer = $('askDisclaimer');
  const storageNote = $('askStorageNote');
  const scroll = $('askReadingScroll');

  let session = null;
  let selectedData = null;
  let activeQuestion = '';
  let activeFingerprint = '';
  let activeAnalysis = null;
  let activeReading = null;
  let pendingStored = null;
  let currentView = 'question';
  let previousFocus = null;
  let activeTimer = null;
  let lifecycleToken = 0;
  let exportBusy = false;
  let deckRitual = null;

  function language() {
    return document.documentElement.lang === 'th' ? 'th' : 'en';
  }

  function t(key) {
    const lang = language();
    return COPY[lang][key] || COPY.en[key] || key;
  }

  function emitInteraction(type, detail = {}) {
    window.dispatchEvent(new CustomEvent('lgt:reading:interaction', {
      detail: { type, spreadId: 'ask', ...detail }
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

  function guardMessage(code) {
    if (code === 'required') return t('required');
    if (code === 'tooLong') return t('tooLong');
    if (code === 'multipleQuestions') return t('multipleQuestions');
    if (code === 'spam') return t('spam');
    if (code === 'safetyCrisis') return t('safetyCrisis');
    return t('inappropriate');
  }

  function validateQuestion({ showRequired = false } = {}) {
    const result = GUARD.validate(questionInput.value);
    questionCount.textContent = `${result.length}/${GUARD.maxLength}`;
    questionField.classList.toggle('is-invalid', !result.ok && (result.code !== 'required' || showRequired));
    if (result.ok) questionError.textContent = '';
    else if (result.code === 'required' && !showRequired) questionError.textContent = '';
    else questionError.textContent = guardMessage(result.code);
    questionSubmit.disabled = !result.ok;
    return result;
  }

  function updateStaticCopy() {
    eyebrow.textContent = t('eyebrow');
    title.textContent = t('title');
    backButton.setAttribute('aria-label', t('back'));
    intro.textContent = currentView === 'question' ? t('intro') : (currentView === 'choosing' ? t('chooseHint') : currentView === 'selected' ? t('selectedHint') : currentView === 'restored' ? t('restoredHint') : '');
    questionLabel.textContent = t('questionLabel');
    questionInput.placeholder = t('placeholder');
    questionHint.textContent = t('questionHint');
    questionSubmit.textContent = t('askCards');
    sealLabel.textContent = t('sealedLabel');
    orientation.textContent = t('upright');
    resultQuestionLabel.textContent = t('questionRecap');
    keywordsLabel.textContent = t('keywords');
    focusKicker.textContent = t('focusLabel');
    focusTitle.textContent = t('focusPrompt');
    focusHint.textContent = t('focusHint');
    focusResultLabel.textContent = t('focusLabel');
    directLabel.textContent = t('directAnswer');
    whyLabel.textContent = t('whyThisCard');
    conditionLabel.textContent = t('conditionsTitle');
    ganeshaLabel.textContent = t('ganeshaReflection');
    carryLabel.textContent = t('carryForward');
    saveShareTitle.textContent = t('saveShareTitle');
    saveShareHint.textContent = t('saveShareHint');
    includeQuestionLabel.textContent = t('includeQuestion');
    includeQuestionHint.textContent = t('includeQuestionHint');
    saveButton.textContent = t('saveImage');
    shareButton.textContent = t('shareImage');
    homeAction.textContent = t('back');
    homeAction.setAttribute('aria-label', t('back'));
    saveButton.setAttribute('aria-label', t('saveImage'));
    shareButton.setAttribute('aria-label', t('shareImage'));
    disclaimer.textContent = t('disclaimer');
    storageNote.textContent = t('storageFail');
    choice.setAttribute('aria-label', t('choose'));

    if (currentView === 'sealing') status.textContent = t('sealing');
    else if (currentView === 'shuffling') status.textContent = t('shuffling');
    else if (currentView === 'choosing') status.textContent = t('choose');
    else if (currentView === 'selected') { status.textContent = t('selected'); primary.textContent = t('reveal'); }
    else if (currentView === 'restored') { status.textContent = t('restored'); primary.textContent = t('reveal'); }
    else if (currentView === 'revealed') { status.textContent = ''; primary.textContent = t('askAnother'); }
    else status.textContent = '';

    deckRitual?.setAriaLabelBuilder((index) => `${t('choose')} ${index + 1}`);

    if (!shell.hidden) validateQuestion();
    if (currentView === 'focus' && activeAnalysis?.candidates) showFocusResolver(activeAnalysis);
    if (selectedData) renderCardText(selectedData);
  }

  function renderCardText(card) {
    const lang = language();
    const reading = ASK_SEMANTIC.compose(card, activeAnalysis, lang);
    activeReading = reading;
    cardTitle.textContent = card.title[lang];
    canonicalTitle.textContent = lang === 'th' ? card.title.en : '';
    focusResult.textContent = reading?.contextLabel || ANALYZER.label(activeAnalysis?.domain || 'general', lang);
    directAnswer.textContent = reading?.direct || card.upright[lang];
    whyText.textContent = reading?.rationale || card.upright[lang];
    conditionText.textContent = reading?.condition || '';
    ganeshaText.textContent = reading?.ganesha || ASK_CONTENT.get(card.id, lang);
    reflection.textContent = reading?.reflection || card.reflection[lang];
    if (reading?.fallbackUsed) emitInteraction('semantic-fallback', { cardId: card.id, missing: reading.validation?.missing || [] });
    resultQuestion.textContent = activeQuestion;
    keywords.replaceChildren(...card.keywords[lang].map((word) => {
      const span = document.createElement('span');
      span.textContent = word;
      return span;
    }));
    cardFront.alt = `${t('cardAlt')}${card.title[lang]}`;
    cardFallbackTitle.textContent = card.title[lang];
  }

  function resetVisuals({ keepQuestion = false } = {}) {
    clearTimer();
    lifecycleToken += 1;
    session = null;
    selectedData = null;
    activeFingerprint = '';
    activeAnalysis = null;
    activeReading = null;
    pendingStored = null;
    currentView = 'question';
    shell.classList.remove('is-revealed');
    questionCard.hidden = false;
    focusCard.hidden = true;
    focusOptions.replaceChildren();
    questionSeal.hidden = true;
    questionSeal.classList.remove('is-sealed');
    sealText.textContent = '';
    stage.hidden = true;
    deck.hidden = false;
    deck.classList.remove('is-shuffling');
    choice.hidden = true;
    deckRitual?.destroy();
    deckRitual = null;
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
    actions.hidden = true;
    primary.disabled = false;
    homeAction.hidden = true;
    interpretation.hidden = true;
    saveShare.hidden = true;
    includeQuestion.checked = false;
    shareStatus.textContent = '';
    saveButton.disabled = false;
    shareButton.disabled = false;
    exportBusy = false;
    storageNote.hidden = true;
    if (!keepQuestion) {
      activeQuestion = '';
      questionInput.value = '';
    }
    questionError.textContent = '';
    questionField.classList.remove('is-invalid');
    scroll.scrollTop = 0;
    updateStaticCopy();
  }

  function buildChoices(candidateIds) {
    deckRitual?.destroy();
    deckRitual = DECK_RITUAL.create({
      container: choice,
      cardBack: CONTENT.cardBack,
      count: candidateIds.length,
      selectionLimit: 1,
      rowCount: 3,
      variant: 'focus',
      groupLabel: t('choose'),
      ariaLabelBuilder: (index) => `${t('choose')} ${index + 1}`,
      onSelect: ({ index }) => chooseCard(index)
    });
  }

  function startShuffle() {
    if (!session || session.state !== 'idle') return;
    currentView = 'shuffling';
    stage.hidden = false;
    actions.hidden = true;
    updateStaticCopy();
    const candidates = session.prepareChoice(78);
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
      deckRitual?.focusFirst();
    });
  }

  function chooseCard(index) {
    if (!session || session.state !== 'choosing') return;
    selectedData = session.selectCandidate(index);
    const persisted = ASK_STORAGE.save({ fingerprint: activeFingerprint, cardId: selectedData.id, sessionId: session.sessionId, analysis: activeAnalysis });
    if (!persisted) storageNote.hidden = false;
    emitInteraction('card-select', { cardId: selectedData.id, deckIndex: index });
    after(300, () => renderSelectedBack(false));
  }

  function renderSelectedBack(restored = false) {
    stage.hidden = false;
    deck.hidden = true;
    choice.hidden = true;
    selected.hidden = false;
    orientation.hidden = true;
    interpretation.hidden = true;
    saveShare.hidden = true;
    homeAction.hidden = true;
    actions.hidden = false;
    primary.disabled = false;
    currentView = restored ? 'restored' : 'selected';
    updateStaticCopy();
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
      homeAction.hidden = false;
      actions.hidden = false;
      primary.disabled = false;
      shell.classList.add('is-revealed');
      updateStaticCopy();
      after(80, () => interpretation.scrollIntoView({ behavior: motionIsReduced() ? 'auto' : 'smooth', block: 'nearest' }));
    });
  }

  async function runExport(action = 'save') {
    if (exportBusy || !selectedData || !activeReading) return;
    exportBusy = true;
    saveButton.disabled = true;
    shareButton.disabled = true;

    const lang = language();
    const includeExactQuestion = action === 'save' ? true : includeQuestion.checked;
    try {
      await READING_EXPORT.execute({
        action,
        buildBlob: () => ASK_EXPORT.buildImageBlob({
          card: selectedData,
          reading: activeReading,
          question: activeQuestion,
          includeQuestion: includeExactQuestion,
          lang
        }),
        filename: ASK_EXPORT.filename(selectedData),
        shareTitle: lang === 'th' ? 'ผลการอ่าน Ask Ganesha' : 'Ask Ganesha Reading',
        shareText: lang === 'th' ? 'ผลการอ่านจาก Little Ganesha Tarot' : 'My Ask Ganesha reading from Little Ganesha Tarot',
        onStatus: (message) => { shareStatus.textContent = message; },
        onEvent: (eventType) => {
          const base = { cardId: selectedData.id, includeQuestion: includeExactQuestion };
          if (eventType === 'share') emitInteraction('reading-share', base);
          else emitInteraction('reading-save', { ...base, fallbackFromShare: eventType === 'save-fallback' });
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

  function boundaryMessage(boundary) {
    if (boundary === 'medical') return t('boundaryMedical');
    if (boundary === 'legal') return t('boundaryLegal');
    if (boundary === 'gambling') return t('boundaryGambling');
    if (boundary === 'financial') return t('boundaryFinancial');
    if (boundary === 'death') return t('boundaryDeath');
    return '';
  }

  function showFocusResolver(analysis) {
    currentView = 'focus';
    questionCard.hidden = true;
    questionSeal.hidden = true;
    focusCard.hidden = false;
    focusOptions.replaceChildren();
    analysis.candidates.slice(0, 2).forEach((domain) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ask-focus-option';
      button.textContent = ANALYZER.label(domain, language());
      button.addEventListener('click', () => resolveFocus(domain), { once: true });
      focusOptions.appendChild(button);
    });
    emitInteraction('focus-needed', { candidates: [...analysis.candidates] });
    focusOptions.querySelector('button')?.focus({ preventScroll: true });
  }

  function beginSealedReading(stored = pendingStored) {
    currentView = 'sealing';
    focusCard.hidden = true;
    questionCard.hidden = true;
    questionSeal.hidden = false;
    sealText.textContent = activeQuestion;
    requestAnimationFrame(() => questionSeal.classList.add('is-sealed'));
    updateStaticCopy();
    emitInteraction('question-accepted', { context: activeAnalysis?.domain || 'general' });

    session = ENGINE.createSession('ask');
    if (stored) {
      selectedData = CONTENT.getCard(stored.cardId);
      session.restoreSelection({
        sessionId: stored.sessionId,
        cards: [{ positionId: 'answer', cardId: stored.cardId, orientation: ORIENTATION }]
      });
      // Enrich a V0.4.4 record with the resolved context without changing its card.
      ASK_STORAGE.save({ fingerprint: activeFingerprint, cardId: stored.cardId, sessionId: stored.sessionId, analysis: activeAnalysis });
      emitInteraction('question-restored', { cardId: stored.cardId, context: activeAnalysis?.domain || 'general' });
      after(360, () => renderSelectedBack(true));
      return;
    }
    after(430, startShuffle);
  }

  function resolveFocus(domain) {
    if (!activeAnalysis) return;
    activeAnalysis = ANALYZER.withDomain(activeAnalysis, domain);
    emitInteraction('focus-selected', { context: domain });
    beginSealedReading();
  }

  async function submitQuestion() {
    const validation = validateQuestion({ showRequired: true });
    if (!validation.ok) {
      questionInput.focus({ preventScroll: true });
      return;
    }

    questionSubmit.disabled = true;
    activeQuestion = validation.text;
    questionInput.value = activeQuestion;
    activeAnalysis = ANALYZER.analyze(activeQuestion);

    if (activeAnalysis.multiQuestion) {
      questionError.textContent = t('multipleQuestions');
      questionField.classList.add('is-invalid');
      questionSubmit.disabled = false;
      questionInput.focus({ preventScroll: true });
      emitInteraction('question-multiple');
      return;
    }

    if (activeAnalysis.boundary) {
      questionError.textContent = boundaryMessage(activeAnalysis.boundary);
      questionField.classList.add('is-invalid');
      questionSubmit.disabled = false;
      questionInput.focus({ preventScroll: true });
      emitInteraction('question-boundary', { boundary: activeAnalysis.boundary });
      return;
    }

    const token = ++lifecycleToken;
    activeFingerprint = await GUARD.fingerprint(activeQuestion);
    if (token !== lifecycleToken || shell.hidden) return;
    pendingStored = ASK_STORAGE.get(activeFingerprint);

    // A previously resolved same-day question keeps the same focus as well as the same card.
    if (pendingStored?.contextKey) activeAnalysis = ANALYZER.withStoredResolution(activeAnalysis, pendingStored);

    if (activeAnalysis.ambiguous && !pendingStored?.contextKey) {
      showFocusResolver(activeAnalysis);
      return;
    }

    beginSealedReading(pendingStored);
  }

  function askAnother() {
    if (session?.state === 'interpreted') session.complete();
    emitInteraction('ask-another');
    resetVisuals();
    after(60, () => questionInput.focus({ preventScroll: true }));
  }

  function primaryAction() {
    if (currentView === 'selected' || currentView === 'restored') revealCard();
    else if (currentView === 'revealed') askAnother();
  }

  function openAsk() {
    if (!shell.hidden) return;
    previousFocus = document.activeElement;
    resetVisuals();
    setMainInert(true);
    setReadingMode(true);
    shell.hidden = false;
    requestAnimationFrame(() => shell.classList.add('is-active'));
    emitInteraction('reading-open');
    after(30, () => questionInput.focus({ preventScroll: true }));
  }

  function closeAsk() {
    if (shell.hidden) return;
    lifecycleToken += 1;
    clearTimer();
    emitInteraction('reading-close');
    shell.classList.remove('is-active');
    window.setTimeout(() => {
      shell.hidden = true;
      resetVisuals();
      setMainInert(false);
      setReadingMode(false);
      if (previousFocus instanceof HTMLElement && document.contains(previousFocus)) previousFocus.focus({ preventScroll: true });
      previousFocus = null;
    }, motionIsReduced() ? 0 : 240);
  }

  document.querySelectorAll('[data-feature="ask"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openAsk();
    }, { capture: true });
  });

  questionInput.addEventListener('input', () => validateQuestion());
  questionInput.addEventListener('blur', () => validateQuestion());
  questionInput.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      submitQuestion();
    }
  });
  questionSubmit.addEventListener('click', submitQuestion);
  backButton.addEventListener('click', closeAsk);
  homeAction.addEventListener('click', closeAsk);
  primary.addEventListener('click', primaryAction);
  saveButton.addEventListener('click', () => { runExport('save'); });
  shareButton.addEventListener('click', () => { runExport('share'); });
  selectedCard.addEventListener('click', () => {
    if (currentView === 'selected' || currentView === 'restored') revealCard();
  });

  document.addEventListener('keydown', (event) => {
    if (!shell.hidden && event.key === 'Escape') {
      event.preventDefault();
      closeAsk();
    }
  });

  const languageObserver = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.attributeName === 'lang')) updateStaticCopy();
  });
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  window.LGTAskGanesha = Object.freeze({ open: openAsk, close: closeAsk });
})();

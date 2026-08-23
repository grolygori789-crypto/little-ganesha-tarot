(() => {
  'use strict';

  const VERSION = 'read-hub-v1';
  const Engine = window.LGTReadingEngine;
  const ThreeStorage = window.LGTThreeStorage;
  const GoldenStorage = window.LGTGoldenStorage;
  const ObstacleStorage = window.LGTObstacleStorage;
  const AskStorage = window.LGTAskStorage;
  const Tarot = window.LGTReadingContent;

  const SUPPORTED = ['en', 'th', 'hi'];
  const COPY = {
    en: {
      aria: 'Reading Hub', back: 'Back to Home', home: 'Home', eyebrow: 'READING SANCTUARY',
      title: 'Choose the way in',
      intro: 'Start with what you need, not with the spread name. Each path is designed for a different kind of question.',
      prompt: 'What brings you here today?',
      intentions: {
        quick: ['A quick reflection', 'daily'], question: ['I have one clear question', 'ask'],
        story: ['I want to see how this is unfolding', 'three'], direction: ['I need direction', 'golden'],
        stuck: ['Something feels stuck', 'obstacle']
      },
      bestFit: 'BEST FIT', clearChoice: 'Clear suggestion', chooseAny: 'You can still choose any reading below.',
      primary: 'Core Readings', signature: 'Signature Paths',
      modes: {
        daily: ['Daily Guidance', 'One card for a focused reflection on the day.', 'Quick · 1 card'],
        ask: ['Ask Ganesha', 'Bring one clear question and receive a reading that stays with that exact theme.', 'Question-led · 1 card'],
        three: ['Three-Card Reading', 'See what shaped the situation, what is active now, and what may unfold next.', 'Story · 3 cards'],
        golden: ['The Golden Path', 'Clarify where you stand, what blocks movement, and the direction worth taking next.', 'Direction · 3 cards'],
        obstacle: ['Remove the Obstacle', 'Separate the obstacle from what feeds it, then find the response that can begin to loosen the pattern.', 'Release · 3 cards']
      },
      open: 'Open reading', revisit: 'Revisit today’s card', ready: 'Ready',
      dailyDone: 'Today’s card is already set', questionsToday: n => `${n} question${n===1?'':'s'} kept today`,
      focusProgress: (n) => `${n} / 6 explored today`, allFocuses: 'All 6 focuses explored today',
      statusNew: 'Available now', statusRead: 'Read today', footer: 'Readings are for reflection and direction, not fixed prediction.'
    },
    th: {
      aria: 'ศูนย์รวมการเปิดไพ่', back: 'กลับหน้าหลัก', home: 'หน้าหลัก', eyebrow: 'พื้นที่สำหรับการเปิดไพ่',
      title: 'เลือกวิธีที่ตรงกับสิ่งที่อยู่ในใจ',
      intro: 'เริ่มจากสิ่งที่คุณอยากมอง ไม่จำเป็นต้องรู้ก่อนว่าแต่ละรูปแบบต่างกันอย่างไร แต่ละเส้นทางถูกออกแบบมาเพื่อตอบโจทย์คนละแบบ',
      prompt: 'วันนี้คุณมาที่นี่เพราะอะไร?',
      intentions: {
        quick: ['อยากได้มุมมองสั้นๆ สำหรับวันนี้', 'daily'], question: ['มีคำถามหนึ่งเรื่องที่อยากถามให้ชัด', 'ask'],
        story: ['อยากเห็นว่าเรื่องนี้กำลังดำเนินไปทางไหน', 'three'], direction: ['อยากรู้ว่าควรมุ่งหน้าไปทางไหน', 'golden'],
        stuck: ['รู้สึกว่ามีบางอย่างติดขัด', 'obstacle']
      },
      bestFit: 'เหมาะที่สุด', clearChoice: 'คำแนะนำที่ตรงที่สุด', chooseAny: 'คุณยังเลือกการเปิดไพ่แบบอื่นด้านล่างได้เสมอ',
      primary: 'การเปิดไพ่หลัก', signature: 'เส้นทางพิเศษ',
      modes: {
        daily: ['คำแนะนำประจำวัน', 'ไพ่หนึ่งใบสำหรับมองวันนี้ให้ชัดขึ้นอย่างกระชับ', 'สั้นและตรง · 1 ใบ'],
        ask: ['ถามพระพิฆเนศน้อย', 'ตั้งคำถามหนึ่งเรื่องให้ชัด แล้วรับคำอ่านที่ผูกกับประเด็นนั้นโดยตรง', 'ตามคำถาม · 1 ใบ'],
        three: ['เปิดไพ่สามใบ', 'มองสิ่งที่หล่อหลอมสถานการณ์ สิ่งที่กำลังเกิดขึ้น และแนวโน้มต่อจากนี้เป็นเรื่องเดียวกัน', 'เห็นภาพต่อเนื่อง · 3 ใบ'],
        golden: ['เส้นทางสีทอง', 'ดูว่าตอนนี้คุณอยู่ตรงไหน อะไรกำลังขวาง และทิศทางไหนควรได้รับความสนใจต่อ', 'มองทิศทาง · 3 ใบ'],
        obstacle: ['คลายอุปสรรค', 'แยกให้เห็นตัวอุปสรรค สิ่งที่ยังคอยเติมแรงให้มัน และจุดที่ช่วยให้เรื่องเริ่มคลาย', 'แกะปม · 3 ใบ']
      },
      open: 'เปิดคำอ่าน', revisit: 'กลับไปดูไพ่ของวันนี้', ready: 'พร้อมใช้งาน',
      dailyDone: 'ไพ่ของวันนี้ถูกกำหนดไว้แล้ว', questionsToday: n => `วันนี้เก็บคำถามไว้ ${n} เรื่อง`,
      focusProgress: n => `วันนี้สำรวจแล้ว ${n} / 6 หัวข้อ`, allFocuses: 'วันนี้สำรวจครบทั้ง 6 หัวข้อแล้ว',
      statusNew: 'เปิดได้ตอนนี้', statusRead: 'อ่านแล้ววันนี้', footer: 'ใช้ไพ่เพื่อช่วยทบทวนและมองทิศทาง ไม่ใช่คำทำนายที่ตายตัว'
    },
    hi: {
      aria: 'रीडिंग हब', back: 'मुख्य पृष्ठ पर लौटें', home: 'मुख्य पृष्ठ', eyebrow: 'रीडिंग स्पेस',
      title: 'जो मन में है, उसके लिए सही तरीका चुनें',
      intro: 'स्प्रेड का नाम जानना ज़रूरी नहीं। पहले यह चुनें कि आप किस तरह की स्पष्टता चाहते हैं; हर रीडिंग एक अलग ज़रूरत के लिए बनाई गई है।',
      prompt: 'आज आप यहाँ किसलिए आए हैं?',
      intentions: {
        quick: ['आज के लिए एक छोटी-सी दिशा चाहिए', 'daily'], question: ['मेरे मन में एक साफ़ सवाल है', 'ask'],
        story: ['देखना है कि यह स्थिति कहाँ जा रही है', 'three'], direction: ['आगे का रास्ता समझना है', 'golden'],
        stuck: ['कुछ अटका हुआ लग रहा है', 'obstacle']
      },
      bestFit: 'सबसे उपयुक्त', clearChoice: 'सबसे सीधा सुझाव', chooseAny: 'नीचे दी गई किसी भी रीडिंग को चुनना फिर भी आपके हाथ में है।',
      primary: 'मुख्य रीडिंग्स', signature: 'विशेष मार्ग',
      modes: {
        daily: ['आज का मार्गदर्शन', 'आज को थोड़ा साफ़ देखने के लिए एक कार्ड और एक केंद्रित विचार।', 'संक्षिप्त · 1 कार्ड'],
        ask: ['गणेश से पूछें', 'एक स्पष्ट सवाल रखें और उसी विषय से जुड़ी हुई रीडिंग पाएँ।', 'सवाल-केंद्रित · 1 कार्ड'],
        three: ['तीन कार्ड की रीडिंग', 'क्या इस स्थिति को यहाँ तक लाया, अभी क्या सक्रिय है और आगे क्या खुल सकता है—इसे एक कहानी की तरह देखें।', 'कहानी · 3 कार्ड'],
        golden: ['गोल्डन पाथ', 'आप अभी कहाँ हैं, क्या रोक रहा है और किस दिशा पर ध्यान देना चाहिए—इसे स्पष्ट करें।', 'दिशा · 3 कार्ड'],
        obstacle: ['रुकावट को समझें', 'रुकावट क्या है, उसे क्या बनाए रख रहा है और कौन-सी प्रतिक्रिया उसे ढीला कर सकती है—इन तीन परतों को अलग देखें।', 'रिलीज़ · 3 कार्ड']
      },
      open: 'रीडिंग खोलें', revisit: 'आज का कार्ड फिर देखें', ready: 'तैयार',
      dailyDone: 'आज का कार्ड पहले से तय है', questionsToday: n => `आज ${n} सवाल सहेजे गए`,
      focusProgress: n => `आज ${n} / 6 फोकस देखे गए`, allFocuses: 'आज सभी 6 फोकस देखे जा चुके हैं',
      statusNew: 'अभी उपलब्ध', statusRead: 'आज पढ़ा गया', footer: 'टैरो को चिंतन और दिशा के लिए इस्तेमाल करें, तय भविष्यवाणी के रूप में नहीं।'
    }
  };

  const state = { root:null, open:false, source:null, intention:'' };
  const lang = () => SUPPORTED.includes(document.documentElement.lang) ? document.documentElement.lang : 'en';
  const c = () => COPY[lang()] || COPY.en;
  const esc = (v='') => String(v).replace(/[&<>\"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));

  function currentDateISO() {
    if (Engine?.localDateISO) return Engine.localDateISO();
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function askCount() {
    try {
      const key = AskStorage?.key || 'lgt.reading.ask.v1';
      const box = JSON.parse(localStorage.getItem(key) || 'null');
      if (!box || box.localDate !== currentDateISO() || typeof box.readings !== 'object') return 0;
      return Object.keys(box.readings).length;
    } catch (_) { return 0; }
  }

  function status(mode) {
    if (mode === 'daily') {
      const done = Boolean(Engine?.getTodayRecord?.());
      return { done, badge: done ? c().statusRead : c().statusNew, detail: done ? c().dailyDone : c().ready };
    }
    if (mode === 'ask') {
      const n = askCount();
      return { done:n>0, badge:n>0 ? c().statusRead : c().statusNew, detail:n>0 ? c().questionsToday(n) : c().ready };
    }
    const storage = mode === 'three' ? ThreeStorage : mode === 'golden' ? GoldenStorage : ObstacleStorage;
    const fallbackKey = mode === 'three' ? 'lgt.reading.three.v2' : mode === 'golden' ? 'lgt.reading.golden.v2' : 'lgt.reading.obstacle.v1';
    let n = 0;
    try {
      const box = JSON.parse(localStorage.getItem(storage?.key || fallbackKey) || 'null');
      if (box?.localDate === currentDateISO() && box.readings && typeof box.readings === 'object') n = Object.keys(box.readings).length;
    } catch (_) {}
    n = Math.max(0, Math.min(6, Number(n) || 0));
    return { done:n>0, badge:n>0 ? c().statusRead : c().statusNew, detail:n===6 ? c().allFocuses : c().focusProgress(n), count:n };
  }

  function createRoot() {
    const root = document.createElement('section');
    root.id = 'readHubScreen';
    root.className = 'read-hub-screen';
    root.hidden = true;
    root.setAttribute('aria-label', c().aria);
    root.innerHTML = `
      <div class="read-hub-ambient" aria-hidden="true"><span></span><span></span><span></span></div>
      <header class="read-hub-topbar">
        <button class="read-hub-icon" id="readHubBack" type="button" aria-label="Back"><span aria-hidden="true">‹</span></button>
        <div class="read-hub-brand"><span>LITTLE GANESHA TAROT</span><small>THE GOLDEN PATH</small></div>
        <button class="read-hub-icon" id="readHubHome" type="button" aria-label="Home"><span aria-hidden="true">⌂</span></button>
      </header>
      <div class="read-hub-scroll" id="readHubScroll"><main class="read-hub-content" id="readHubContent"></main></div>
      <p class="sr-only" id="readHubLive" aria-live="polite"></p>`;
    (document.getElementById('app') || document.body).appendChild(root);
    state.root = root;
    root.querySelector('#readHubBack').addEventListener('click', close);
    root.querySelector('#readHubHome').addEventListener('click', close);
    root.addEventListener('click', onClick);
  }

  function cardBackFan() {
    const src = Tarot?.cardBack || 'assets/ui/card-back.png';
    return `<div class="read-hub-fan" aria-hidden="true"><img src="${esc(src)}" alt=""><img src="${esc(src)}" alt=""><img src="${esc(src)}" alt=""><span></span></div>`;
  }

  function intentionHtml() {
    return Object.entries(c().intentions).map(([id, item]) =>
      `<button class="read-intent ${state.intention===id?'is-active':''}" type="button" data-read-intent="${id}" aria-pressed="${state.intention===id}">${esc(item[0])}</button>`
    ).join('');
  }

  function modeIcon(mode) {
    return ({daily:'✦', ask:'?', three:'⋮', golden:'◇', obstacle:'⌁'})[mode] || '✦';
  }

  function modeCard(mode, featured=false) {
    const m = c().modes[mode];
    const s = status(mode);
    const recommended = state.intention && c().intentions[state.intention]?.[1] === mode;
    const progress = ['three','golden','obstacle'].includes(mode) ? `<span class="read-mode-progress"><i style="--p:${(s.count||0)/6}"></i><b>${esc(s.detail)}</b></span>` : `<span class="read-mode-status-detail">${esc(s.detail)}</span>`;
    return `<article class="read-mode-card ${featured?'is-featured':''} ${recommended?'is-recommended':''}" data-read-mode-card="${mode}">
      <button type="button" data-read-launch="${mode}" aria-label="${esc(m[0])}">
        <span class="read-mode-icon" aria-hidden="true">${modeIcon(mode)}</span>
        <span class="read-mode-copy">
          <span class="read-mode-topline"><small>${esc(m[2])}</small><span class="read-status ${s.done?'is-done':''}">${s.done?'✓ ':''}${esc(s.badge)}</span></span>
          <strong>${esc(m[0])}</strong>
          <p>${esc(m[1])}</p>
          ${progress}
          <span class="read-mode-cta">${esc(mode==='daily' && s.done ? c().revisit : c().open)} <i aria-hidden="true">›</i></span>
        </span>
        ${recommended?`<span class="read-best-fit">${esc(c().bestFit)}</span>`:''}
      </button>
    </article>`;
  }

  function render() {
    if (!state.root) return;
    state.root.setAttribute('aria-label', c().aria);
    state.root.querySelector('#readHubBack').setAttribute('aria-label', c().back);
    state.root.querySelector('#readHubHome').setAttribute('aria-label', c().home);
    const recommended = state.intention ? c().intentions[state.intention]?.[1] : '';
    const recName = recommended ? c().modes[recommended][0] : '';
    state.root.querySelector('#readHubContent').innerHTML = `
      <section class="read-hub-hero">
        <div><span class="read-hub-eyebrow">${esc(c().eyebrow)}</span><h1>${esc(c().title)}</h1><p>${esc(c().intro)}</p></div>${cardBackFan()}
      </section>
      <section class="read-intention-panel">
        <span class="read-hub-eyebrow">${esc(c().prompt)}</span>
        <div class="read-intentions">${intentionHtml()}</div>
        ${recommended?`<div class="read-recommendation"><span>✦</span><div><small>${esc(c().clearChoice)}</small><strong>${esc(recName)}</strong><p>${esc(c().chooseAny)}</p></div></div>`:''}
      </section>
      <section class="read-section"><header><span>${esc(c().primary)}</span></header>${modeCard('daily',true)}<div class="read-mode-grid">${modeCard('ask')}${modeCard('three')}</div></section>
      <section class="read-section read-section--signature"><header><span>${esc(c().signature)}</span></header><div class="read-mode-grid">${modeCard('golden')}${modeCard('obstacle')}</div></section>
      <footer class="read-hub-footer"><span aria-hidden="true">✦</span><p>${esc(c().footer)}</p></footer>`;
  }

  function setMainInert(value) {
    const main = document.getElementById('mainApp');
    if (!main) return;
    if ('inert' in main) main.inert = Boolean(value);
    if (value) main.setAttribute('aria-hidden','true'); else main.removeAttribute('aria-hidden');
  }

  function setNav(opening) {
    const home = document.getElementById('homeNavButton');
    const read = document.querySelector('.bottom-nav [data-feature="read"]');
    home?.classList.toggle('is-active', !opening);
    read?.classList.toggle('is-active', opening);
  }

  function open(source=null) {
    if (!state.root) createRoot();
    if (state.open) return;
    state.source = source || state.source;
    state.open = true;
    setMainInert(true);
    setNav(true);
    state.root.hidden = false;
    document.body.classList.add('read-hub-open');
    render();
    state.root.querySelector('#readHubScroll').scrollTop = 0;
    requestAnimationFrame(() => state.root.classList.add('is-visible'));
    setTimeout(() => state.root.querySelector('#readHubBack')?.focus({preventScroll:true}), 50);
  }

  function close({focus=true}={}) {
    if (!state.root || !state.open) return;
    state.open = false;
    state.root.classList.remove('is-visible');
    document.body.classList.remove('read-hub-open');
    setMainInert(false);
    setNav(false);
    const source = state.source;
    setTimeout(() => { if (!state.open) state.root.hidden = true; }, 220);
    if (focus) (source || document.getElementById('homeNavButton'))?.focus?.({preventScroll:true});
  }

  function launch(mode) {
    const api = ({
      daily: window.LGTDailyGuidance,
      ask: window.LGTAskGanesha,
      three: window.LGTThreeCard,
      golden: window.LGTGoldenPathUI,
      obstacle: window.LGTObstacleUI
    })[mode];
    if (!api?.open) return;
    const nav = document.querySelector('.bottom-nav [data-feature="read"]');
    close({focus:false});
    nav?.focus?.({preventScroll:true});
    requestAnimationFrame(() => api.open());
  }

  function onClick(event) {
    const intent = event.target.closest?.('[data-read-intent]');
    if (intent) {
      const id = intent.dataset.readIntent;
      state.intention = state.intention === id ? '' : id;
      render();
      if (state.intention) {
        const mode = c().intentions[state.intention]?.[1];
        requestAnimationFrame(() => state.root?.querySelector(`[data-read-mode-card="${mode}"]`)?.scrollIntoView({behavior: document.documentElement.dataset.motion==='reduced'?'auto':'smooth', block:'nearest'}));
      }
      return;
    }
    const launchButton = event.target.closest?.('[data-read-launch]');
    if (launchButton) launch(launchButton.dataset.readLaunch);
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('[data-feature="read"]');
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open(button);
  }, true);

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.open) { event.preventDefault(); close(); }
  });

  new MutationObserver(() => { if (state.open) render(); }).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  window.addEventListener('lgt:reading:interaction', () => { if (state.open) render(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && state.open) render(); });

  window.LGTReadHub = Object.freeze({version:VERSION, open:()=>open(), close});
})();

(() => {
  'use strict';

  const STORAGE = {
    language: 'lgt.language',
    name: 'lgt.displayName',
    birthDate: 'lgt.birthDate',
    onboardingDone: 'lgt.onboardingDone',
    motion: 'lgt.motion',
    immersive: 'lgt.immersive',
    immersiveManualMigration: 'lgt.immersiveManualV1'
  };

  const COPY = {
    en: {
      begin: 'TAP TO BEGIN', soundOn: 'Sound on', soundOff: 'Sound off', ready: 'The Golden Path is ready.', nowPlaying: 'NOW PLAYING', play: 'Play', pause: 'Pause', previous: 'Previous track', next: 'Next track', more: 'Audio options', volume: 'Volume', shuffle: 'Shuffle', returnTitle: 'Return to Title', exitTitle: 'Return to Title?', exitBody: 'Your settings will stay the same.', cancel: 'Cancel', confirm: 'Return',
      welcomeEyebrow: 'WELCOME TO THE GOLDEN PATH', nameQuestion: 'What would you like Ganesha to call you?', nameHint: 'Use any first name or nickname you like. Both fields are optional, and you can change them later.', nameLabel: 'Display name', birthDate: 'Date of birth', birthDateHint: 'Optional · used to show your age and zodiac on this device', localOnly: 'Your profile stays on this device.', skip: 'Skip', continue: 'Continue', homeWelcome: 'Take a moment, think about what’s on your mind, and choose a path.', daily: 'Daily Guidance', dailySub: 'One card to help you reflect on today', ask: 'Ask Ganesha', askSub: 'Focus on one clear question', three: 'Three-Card Reading', threeSub: 'Past · present · what may come next', signature: 'Signature Paths', golden: 'The Golden Path', goldenSub: 'Where you stand · what blocks you · the way forward', obstacle: 'Remove the Obstacle', obstacleSub: 'The obstacle · what sustains it · what helps release it', explore: 'Explore', lucky: 'Lucky Numbers', cards: 'Tarot Library', journal: 'Journal', settings: 'Settings', home: 'Home', read: 'Read', preferences: 'PREFERENCES', experience: 'Experience', language: 'Language', languageSub: 'Choose English, Thai, or Hindi', motion: 'Motion', motionSub: 'Follow your device setting, or choose full or reduced motion.', immersive: 'Browser Full Screen', immersiveSub: 'Optional · the installed app already opens without browser controls', audio: 'Audio', sound: 'Music', soundSub: 'Atmospheric soundtrack', shuffleSub: 'Avoid repeating the same track', profile: 'Personal Profile', displayName: 'Display Name', profilePrivacy: 'Your profile is optional and stays on this device.', editProfile: 'Personal Profile', profileModalHint: 'Both fields are optional. Your information stays on this device.', clearProfile: 'Clear profile', save: 'Save', supportProject: 'Support the Project', supportNote: 'Support is optional and never affects your readings or access to features.', internationalSupport: 'Support from outside Thailand', internationalSupportSub: 'Buy Me a Coffee', thaiSupport: 'Support in Thailand', thaiSupportSub: 'PromptPay · QR coming soon', comingSoon: 'Coming soon', qrPending: 'Coming soon', notSet: 'Not set', featureSoon: 'This feature is coming soon.', hello: 'Hello', motionSystem: 'System', motionFull: 'Full', motionReduced: 'Reduced', fullscreenUnavailable: 'Full screen isn’t available in this browser.', homeTitle: 'The Golden Path',
      supportWorldwideBadge: 'WORLDWIDE', supportThailandBadge: 'THAILAND', settingsAria: 'Settings', backAria: 'Back', languageAria: 'Language', primaryReadingsAria: 'Primary readings', primaryNavAria: 'Primary navigation', musicPlayerAria: 'Music player'
    },
    th: {
      begin: 'แตะเพื่อเริ่ม', soundOn: 'เปิดเสียง', soundOff: 'ปิดเสียง', ready: 'พร้อมเข้าสู่เส้นทางสีทองแล้ว', nowPlaying: 'กำลังเล่น', play: 'เล่น', pause: 'หยุดชั่วคราว', previous: 'เพลงก่อนหน้า', next: 'เพลงถัดไป', more: 'ตัวเลือกเสียง', volume: 'ระดับเสียง', shuffle: 'สุ่มเพลง', returnTitle: 'กลับหน้าเริ่มต้น', exitTitle: 'กลับหน้าเริ่มต้น?', exitBody: 'การตั้งค่าของคุณจะยังอยู่เหมือนเดิม', cancel: 'ยกเลิก', confirm: 'กลับ',
      welcomeEyebrow: 'ยินดีต้อนรับสู่เส้นทางสีทอง', nameQuestion: 'อยากให้พระพิฆเนศน้อยเรียกคุณว่าอะไร?', nameHint: 'ใช้ชื่อจริงหรือชื่อเล่นที่คุณสบายใจก็ได้ ทั้งสองช่องไม่บังคับ และแก้ไขภายหลังได้', nameLabel: 'ชื่อที่ใช้แสดง', birthDate: 'วันเดือนปีเกิด', birthDateHint: 'ไม่บังคับ · ใช้แสดงอายุและราศีของคุณบนอุปกรณ์นี้', localOnly: 'ข้อมูลโปรไฟล์จะเก็บไว้บนอุปกรณ์นี้เท่านั้น', skip: 'ข้าม', continue: 'ต่อไป', homeWelcome: 'ใช้เวลาสักครู่ นึกถึงสิ่งที่อยู่ในใจ แล้วเลือกเส้นทางที่อยากสำรวจ', daily: 'คำแนะนำประจำวัน', dailySub: 'ไพ่หนึ่งใบเพื่อช่วยทบทวนวันนี้', ask: 'ถามพระพิฆเนศน้อย', askSub: 'ตั้งคำถามหนึ่งเรื่องที่คุณอยากมองให้ชัดขึ้น', three: 'เปิดไพ่สามใบ', threeSub: 'อดีต · ปัจจุบัน · แนวโน้มต่อจากนี้', signature: 'เส้นทางพิเศษ', golden: 'เส้นทางสีทอง', goldenSub: 'จุดที่คุณอยู่ตอนนี้ · สิ่งที่ขวางทาง · ทางข้างหน้า', obstacle: 'คลายอุปสรรค', obstacleSub: 'อุปสรรค · สิ่งที่ทำให้ยังติดขัด · สิ่งที่ช่วยให้คลายลง', explore: 'สำรวจ', lucky: 'เลขมงคล', cards: 'คลังไพ่ทาโรต์', journal: 'บันทึก', settings: 'ตั้งค่า', home: 'หน้าหลัก', read: 'เปิดไพ่', preferences: 'การตั้งค่า', experience: 'การใช้งาน', language: 'ภาษา', languageSub: 'เลือกภาษาอังกฤษ ไทย หรือฮินดี', motion: 'การเคลื่อนไหว', motionSub: 'เลือกตามระบบ หรือปรับระดับการเคลื่อนไหวของแอป', immersive: 'เต็มหน้าจอในเบราว์เซอร์', immersiveSub: 'ตัวเลือกเสริม · เมื่อติดตั้งแอปแล้วจะแสดงแบบแอปอยู่แล้ว', audio: 'เสียง', sound: 'เพลงประกอบ', soundSub: 'เพลงบรรยากาศของแอป', shuffleSub: 'ช่วยไม่ให้เพลงเดิมเล่นซ้ำติดกัน', profile: 'โปรไฟล์ส่วนตัว', displayName: 'ชื่อที่ใช้แสดง', profilePrivacy: 'โปรไฟล์นี้ไม่บังคับ และข้อมูลจะอยู่บนอุปกรณ์นี้เท่านั้น', editProfile: 'โปรไฟล์ส่วนตัว', profileModalHint: 'ทั้งสองช่องไม่บังคับ และข้อมูลจะเก็บไว้บนอุปกรณ์นี้เท่านั้น', clearProfile: 'ล้างข้อมูลโปรไฟล์', save: 'บันทึก', supportProject: 'สนับสนุนโปรเจกต์', supportNote: 'การสนับสนุนเป็นทางเลือก และไม่มีผลต่อผลการเปิดไพ่หรือการใช้งานฟีเจอร์ใดๆ', internationalSupport: 'สนับสนุนจากต่างประเทศ', internationalSupportSub: 'Buy Me a Coffee', thaiSupport: 'สนับสนุนในประเทศไทย', thaiSupportSub: 'พร้อมเพย์ · QR จะพร้อมใช้งานเร็วๆ นี้', comingSoon: 'เร็วๆ นี้', qrPending: 'เร็วๆ นี้', notSet: 'ยังไม่ได้ตั้ง', featureSoon: 'ฟีเจอร์นี้จะเปิดให้ใช้เร็วๆ นี้', hello: 'สวัสดี', motionSystem: 'ตามระบบ', motionFull: 'เต็มรูปแบบ', motionReduced: 'ลดการเคลื่อนไหว', fullscreenUnavailable: 'เบราว์เซอร์นี้ไม่รองรับโหมดเต็มหน้าจอ', homeTitle: 'เส้นทางสีทอง',
      supportWorldwideBadge: 'ต่างประเทศ', supportThailandBadge: 'ประเทศไทย', settingsAria: 'ตั้งค่า', backAria: 'ย้อนกลับ', languageAria: 'ภาษา', primaryReadingsAria: 'การเปิดไพ่หลัก', primaryNavAria: 'เมนูหลัก', musicPlayerAria: 'เครื่องเล่นเพลง'
    },
    hi: {
      begin: 'शुरू करने के लिए टैप करें', soundOn: 'आवाज़ चालू', soundOff: 'आवाज़ बंद', ready: 'गोल्डन पाथ तैयार है।', nowPlaying: 'अभी चल रहा है', play: 'चलाएँ', pause: 'रोकें', previous: 'पिछला ट्रैक', next: 'अगला ट्रैक', more: 'ऑडियो विकल्प', volume: 'आवाज़ का स्तर', shuffle: 'शफ़ल', returnTitle: 'शीर्षक स्क्रीन पर लौटें', exitTitle: 'शीर्षक स्क्रीन पर लौटें?', exitBody: 'आपकी सेटिंग्स सुरक्षित रहेंगी।', cancel: 'रद्द करें', confirm: 'लौटें',
      welcomeEyebrow: 'गोल्डन पाथ में आपका स्वागत है', nameQuestion: 'आप चाहेंगे कि नन्हे गणेश आपको किस नाम से पुकारें?', nameHint: 'अपना नाम या कोई पसंदीदा नाम लिखें। दोनों फ़ील्ड वैकल्पिक हैं और बाद में बदले जा सकते हैं।', nameLabel: 'दिखाया जाने वाला नाम', birthDate: 'जन्मतिथि', birthDateHint: 'वैकल्पिक · इस डिवाइस पर आपकी उम्र और राशि दिखाने के लिए', localOnly: 'आपकी प्रोफ़ाइल केवल इसी डिवाइस पर रहती है।', skip: 'अभी छोड़ें', continue: 'आगे बढ़ें', homeWelcome: 'एक पल रुकें, मन में चल रही बात को महसूस करें और वह रास्ता चुनें जिसे आप समझना चाहते हैं।', daily: 'आज का मार्गदर्शन', dailySub: 'आज को समझने के लिए एक कार्ड', ask: 'गणेश से पूछें', askSub: 'एक साफ़ सवाल पर ध्यान दें', three: 'तीन कार्ड की रीडिंग', threeSub: 'अतीत · वर्तमान · आगे की सम्भावित दिशा', signature: 'विशेष मार्ग', golden: 'गोल्डन पाथ', goldenSub: 'आप कहाँ हैं · क्या रोक रहा है · आगे का रास्ता', obstacle: 'रुकावट से रास्ता निकालें', obstacleSub: 'रुकावट · उसे क्या बनाए रखता है · क्या उसे ढीला करता है', explore: 'देखें', lucky: 'शुभ अंक', cards: 'टैरो लाइब्रेरी', journal: 'जर्नल', settings: 'सेटिंग्स', home: 'होम', read: 'रीडिंग', preferences: 'पसंद और सेटिंग्स', experience: 'अनुभव', language: 'भाषा', languageSub: 'English, ไทย या हिन्दी चुनें', motion: 'मोशन', motionSub: 'डिवाइस सेटिंग का अनुसरण करें या पूर्ण/कम मोशन चुनें।', immersive: 'ब्राउज़र फुल स्क्रीन', immersiveSub: 'वैकल्पिक · इंस्टॉल की गई ऐप पहले से ही बिना ब्राउज़र कंट्रोल के खुलती है', audio: 'ऑडियो', sound: 'संगीत', soundSub: 'शांत वातावरण वाला साउंडट्रैक', shuffleSub: 'एक ही ट्रैक को बार-बार आने से बचाएँ', profile: 'व्यक्तिगत प्रोफ़ाइल', displayName: 'दिखाया जाने वाला नाम', profilePrivacy: 'प्रोफ़ाइल वैकल्पिक है और केवल इसी डिवाइस पर रहती है।', editProfile: 'व्यक्तिगत प्रोफ़ाइल', profileModalHint: 'दोनों फ़ील्ड वैकल्पिक हैं। आपकी जानकारी इसी डिवाइस पर रहती है।', clearProfile: 'प्रोफ़ाइल साफ़ करें', save: 'सेव करें', supportProject: 'प्रोजेक्ट को समर्थन दें', supportNote: 'समर्थन पूरी तरह वैकल्पिक है और आपकी रीडिंग या किसी फ़ीचर की उपलब्धता को प्रभावित नहीं करता।', internationalSupport: 'थाईलैंड के बाहर से समर्थन', internationalSupportSub: 'Buy Me a Coffee', thaiSupport: 'थाईलैंड में समर्थन', thaiSupportSub: 'PromptPay · QR जल्द उपलब्ध होगा', comingSoon: 'जल्द आ रहा है', qrPending: 'जल्द आ रहा है', notSet: 'सेट नहीं किया', featureSoon: 'यह फ़ीचर जल्द उपलब्ध होगा।', hello: 'नमस्ते', motionSystem: 'सिस्टम', motionFull: 'पूर्ण', motionReduced: 'कम', fullscreenUnavailable: 'यह ब्राउज़र फुल स्क्रीन मोड को सपोर्ट नहीं करता।', homeTitle: 'गोल्डन पाथ',
      supportWorldwideBadge: 'विश्वभर', supportThailandBadge: 'थाईलैंड', settingsAria: 'सेटिंग्स', backAria: 'वापस', languageAria: 'भाषा', primaryReadingsAria: 'मुख्य रीडिंग', primaryNavAria: 'मुख्य नेविगेशन', musicPlayerAria: 'म्यूज़िक प्लेयर'
    }
  };

  const $ = (id) => document.getElementById(id);
  const splash = $('studioSplash'), title = $('titleScreen'), beginButton = $('beginButton'), onboarding = $('onboardingScreen'), mainApp = $('mainApp'), homeView = $('homeView'), settingsView = $('settingsView');
  const miniPlayer = $('miniPlayer'), playerTitle = $('playerTitle'), playerEyebrow = $('playerEyebrow'), playerPlay = $('playerPlay'), playerPrevious = $('playerPrevious'), playerNext = $('playerNext'), playerMore = $('playerMore'), playerPanel = $('playerPanel'), volumeSlider = $('volumeSlider'), shuffleToggle = $('shuffleToggle'), soundToggle = $('soundToggle');
  const settingsSoundToggle = $('settingsSoundToggle'), settingsVolume = $('settingsVolume'), settingsShuffle = $('settingsShuffle'), motionSelect = $('motionSelect'), immersiveToggle = $('immersiveToggle');
  const exitModal = $('exitModal'), exitCancel = $('exitCancel'), exitConfirm = $('exitConfirm'), toast = $('toast'), liveStatus = $('liveStatus');
  const displayNameInput = $('displayNameInput'), birthDateInput = $('birthDateInput'), displayNameValue = $('displayNameValue'), birthDateValue = $('birthDateValue'), homeGreeting = $('homeGreeting'), homeProfileMeta = $('homeProfileMeta');
  const profileModal = $('profileModal'), profileNameInput = $('profileNameInput'), profileBirthDateInput = $('profileBirthDateInput'), profileCancel = $('profileCancel'), profileSave = $('profileSave'), clearProfileButton = $('clearProfileButton');
  const audio = window.LGTAudio;
  const profileDetails = window.LGTProfileDetails;
  const systemReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const browserPrefersThai = navigator.language?.toLowerCase().startsWith('th');
  const browserPrefersHindi = navigator.language?.toLowerCase().startsWith('hi');

  let language = localStorage.getItem(STORAGE.language) || (browserPrefersHindi ? 'hi' : (browserPrefersThai ? 'th' : 'en'));
  if (!['en','th','hi'].includes(language)) language = 'en';
  let splashDismissed = false;
  let journeyStarted = false;
  let toastTimer = null;
  let profileRolloverTimer = null;

  function copy(key) { return COPY[language][key] || COPY.en[key] || key; }

  function setLanguage(nextLanguage) {
    language = ['en','th','hi'].includes(nextLanguage) ? nextLanguage : 'en';
    localStorage.setItem(STORAGE.language, language);
    document.documentElement.lang = language;
    document.querySelectorAll('[data-copy]').forEach((node) => { const value = COPY[language][node.dataset.copy]; if (value) node.textContent = value; });
    document.querySelectorAll('[data-copy-option]').forEach((node) => { const value = COPY[language][node.dataset.copyOption]; if (value) node.textContent = value; });
    document.querySelectorAll('[data-copy-aria]').forEach((node) => { const value = COPY[language][node.dataset.copyAria]; if (value) node.setAttribute('aria-label', value); });
    document.querySelectorAll('[data-language]').forEach((button) => { const active = button.dataset.language === language; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); });
    updateProfileUI(); syncAudioUI();
  }

  function currentMotionMode() { return localStorage.getItem(STORAGE.motion) || 'system'; }
  function isReducedMotion() { const mode = currentMotionMode(); return mode === 'reduced' || (mode === 'system' && systemReduced.matches); }
  function applyMotionMode() { const mode = currentMotionMode(); document.documentElement.dataset.motion = isReducedMotion() ? 'reduced' : 'full'; motionSelect.value = mode; if (!isReducedMotion()) createAmbientLayers(); }

  function createAmbientLayers() {
    const motes = $('ambientMotes'), petals = $('ambientPetals');
    if (!motes || !petals || motes.childElementCount || petals.childElementCount) return;
    for (let i = 0; i < 22; i += 1) { const mote = document.createElement('span'); mote.className = 'ambient-mote'; mote.style.setProperty('--x', `${6 + Math.random() * 88}%`); mote.style.setProperty('--y', `${25 + Math.random() * 62}%`); mote.style.setProperty('--size', `${1.4 + Math.random() * 3.1}px`); mote.style.setProperty('--duration', `${7 + Math.random() * 9}s`); mote.style.setProperty('--delay', `${-Math.random() * 12}s`); mote.style.setProperty('--drift', `${-22 + Math.random() * 44}px`); motes.appendChild(mote); }
    for (let i = 0; i < 8; i += 1) { const petal = document.createElement('span'); petal.className = 'ambient-petal'; petal.style.setProperty('--x', `${5 + Math.random() * 90}%`); petal.style.setProperty('--y', `${15 + Math.random() * 48}%`); petal.style.setProperty('--duration', `${11 + Math.random() * 8}s`); petal.style.setProperty('--delay', `${-Math.random() * 14}s`); petal.style.setProperty('--drift', `${-42 + Math.random() * 84}px`); petal.style.setProperty('--scale', `${.72 + Math.random() * .65}`); petals.appendChild(petal); }
  }

  function revealTitle() { if (splashDismissed) return; splashDismissed = true; splash.classList.add('is-leaving'); title.hidden = false; if (!isReducedMotion()) createAmbientLayers(); requestAnimationFrame(() => title.classList.add('is-visible')); setTimeout(() => { splash.hidden = true; }, isReducedMotion() ? 80 : 900); }

  function showToast(message) { if (toastTimer) clearTimeout(toastTimer); toast.textContent = message; toast.hidden = false; requestAnimationFrame(() => toast.classList.add('is-visible')); toastTimer = setTimeout(() => { toast.classList.remove('is-visible'); setTimeout(() => { toast.hidden = true; }, 220); }, 2400); }

  function isStandaloneMode() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }

  async function requestImmersive() {
    if (isStandaloneMode() || document.fullscreenElement) return true;
    if (!document.documentElement.requestFullscreen) return false;
    try {
      await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
      return Boolean(document.fullscreenElement);
    } catch (_) {
      return false;
    }
  }

  function goToHome() {
    onboarding.hidden = true; title.hidden = true; mainApp.hidden = false; homeView.hidden = false; settingsView.hidden = true; homeView.scrollTop = 0; document.body.classList.add('journey-active');
    miniPlayer.hidden = false; requestAnimationFrame(() => miniPlayer.classList.add('is-visible'));
    updateProfileUI();
  }

  async function beginJourney() {
    if (journeyStarted) return; journeyStarted = true; beginButton.disabled = true; liveStatus.textContent = copy('ready');
    await audio.unlockAndStart(); syncAudioUI();
    title.classList.add('is-beginning');
    setTimeout(() => {
      const done = localStorage.getItem(STORAGE.onboardingDone) === 'yes';
      title.hidden = true;
      if (done) goToHome(); else { onboarding.hidden = false; displayNameInput.focus({ preventScroll: true }); miniPlayer.hidden = false; requestAnimationFrame(() => miniPlayer.classList.add('is-visible')); }
    }, isReducedMotion() ? 80 : 520);
  }

  function localDateISO(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function normalizeBirthDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return '';
    if (value < '1900-01-01' || value > localDateISO()) return '';
    const [year, month, day] = value.split('-').map(Number);
    const selected = new Date(year, month - 1, day, 12);
    if (selected.getFullYear() !== year || selected.getMonth() !== month - 1 || selected.getDate() !== day) return '';
    return value;
  }

  function formatBirthDate(value) {
    const clean = normalizeBirthDate(value);
    if (!clean) return copy('notSet');
    const [year, month, day] = clean.split('-').map(Number);
    const date = new Date(year, month - 1, day, 12);
    try {
      return new Intl.DateTimeFormat(language === 'th' ? 'th-TH' : (language === 'hi' ? 'hi-IN' : 'en-US'), {
        day: 'numeric', month: 'short', year: 'numeric'
      }).format(date);
    } catch (_) {
      return clean;
    }
  }

  function saveProfile(nameValue, birthValue) {
    const cleanName = (nameValue || '').trim().slice(0, 32);
    const cleanBirth = normalizeBirthDate(birthValue);
    if (cleanName) localStorage.setItem(STORAGE.name, cleanName); else localStorage.removeItem(STORAGE.name);
    if (cleanBirth) localStorage.setItem(STORAGE.birthDate, cleanBirth); else localStorage.removeItem(STORAGE.birthDate);
    updateProfileUI();
  }

  function finishOnboarding(saveProfileData) {
    if (saveProfileData) saveProfile(displayNameInput.value, birthDateInput.value);
    localStorage.setItem(STORAGE.onboardingDone, 'yes');
    goToHome();
  }

  function updateProfileUI() {
    const name = localStorage.getItem(STORAGE.name) || '';
    const birth = localStorage.getItem(STORAGE.birthDate) || '';
    if (displayNameValue) displayNameValue.textContent = name || copy('notSet');
    if (birthDateValue) birthDateValue.textContent = formatBirthDate(birth);
    if (homeGreeting) homeGreeting.textContent = name ? (language === 'en' ? `${copy('hello')}, ${name}` : `${copy('hello')} ${name}`) : copy('homeTitle');

    let summary = birth && profileDetails?.summarize ? profileDetails.summarize(birth, language === 'hi' ? 'en' : language) : null;
    if (summary && language === 'hi') {
      const zodiacHindi = { capricorn:'मकर', aquarius:'कुंभ', pisces:'मीन', aries:'मेष', taurus:'वृषभ', gemini:'मिथुन', cancer:'कर्क', leo:'सिंह', virgo:'कन्या', libra:'तुला', scorpio:'वृश्चिक', sagittarius:'धनु' };
      summary = { ...summary, ageText:`उम्र ${summary.age.years} वर्ष · ${summary.age.months} महीने · ${summary.age.days} दिन`, zodiacLabel:`${zodiacHindi[summary.zodiacKey] || summary.zodiacLabel} राशि` };
    }
    if (homeProfileMeta) {
      homeProfileMeta.replaceChildren();
      if (summary) {
        const age = document.createElement('span');
        age.className = 'home-profile-meta__age';
        age.textContent = summary.ageText;
        const zodiac = document.createElement('span');
        zodiac.className = 'home-profile-meta__zodiac';
        zodiac.textContent = `(${summary.zodiacSymbol} ${summary.zodiacLabel})`;
        homeProfileMeta.append(age, zodiac);
        homeProfileMeta.hidden = false;
        homeProfileMeta.setAttribute('aria-label', `${summary.ageText} ${summary.zodiacLabel}`);
      } else {
        homeProfileMeta.hidden = true;
        homeProfileMeta.removeAttribute('aria-label');
      }
    }
    mainApp?.classList.toggle('has-profile-meta', Boolean(summary));
  }

  function scheduleProfileRollover() {
    if (profileRolloverTimer) window.clearTimeout(profileRolloverTimer);
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 2, 0);
    profileRolloverTimer = window.setTimeout(() => {
      updateProfileUI();
      scheduleProfileRollover();
    }, Math.max(1000, next.getTime() - now.getTime()));
  }

  function openProfileModal() {
    profileNameInput.value = localStorage.getItem(STORAGE.name) || '';
    profileBirthDateInput.value = localStorage.getItem(STORAGE.birthDate) || '';
    profileModal.hidden = false;
    requestAnimationFrame(() => profileModal.classList.add('is-visible'));
    setTimeout(() => profileNameInput.focus({ preventScroll: true }), 40);
  }

  function closeProfileModal() {
    profileModal.classList.remove('is-visible');
    setTimeout(() => { profileModal.hidden = true; }, 220);
  }

  function saveProfileModal() {
    saveProfile(profileNameInput.value, profileBirthDateInput.value);
    closeProfileModal();
  }

  function clearProfile() {
    localStorage.removeItem(STORAGE.name);
    localStorage.removeItem(STORAGE.birthDate);
    profileNameInput.value = '';
    profileBirthDateInput.value = '';
    updateProfileUI();
    closeProfileModal();
  }

  function showSettings() { homeView.hidden = true; settingsView.hidden = false; settingsView.scrollTop = 0; mainApp.classList.add('settings-open'); $('homeNavButton').classList.remove('is-active'); $('settingsNavButton').classList.add('is-active'); updateSettingsUI(); }
  function showHome() { settingsView.hidden = true; homeView.hidden = false; mainApp.classList.remove('settings-open'); $('settingsNavButton').classList.remove('is-active'); $('homeNavButton').classList.add('is-active'); }

  function syncAudioUI() {
    const state = audio.getState();
    soundToggle.setAttribute('aria-pressed', String(state.enabled)); soundToggle.setAttribute('aria-label', state.enabled ? copy('soundOn') : copy('soundOff'));
    playerEyebrow.textContent = copy('nowPlaying'); playerTitle.textContent = state.track?.title || '—'; playerPlay.dataset.state = state.playing ? 'pause' : 'play'; playerPlay.setAttribute('aria-label', state.playing ? copy('pause') : copy('play'));
    playerPrevious.setAttribute('aria-label', copy('previous')); playerNext.setAttribute('aria-label', copy('next')); playerMore.setAttribute('aria-label', copy('more'));
    volumeSlider.value = String(Math.round(state.volume * 100)); shuffleToggle.setAttribute('aria-pressed', String(state.shuffle)); shuffleToggle.classList.toggle('is-active', state.shuffle);
    settingsSoundToggle.checked = state.enabled; settingsVolume.value = String(Math.round(state.volume * 100)); settingsShuffle.checked = state.shuffle;
  }

  function updateSettingsUI() {
    syncAudioUI();
    motionSelect.value = currentMotionMode();
    const standalone = isStandaloneMode();
    immersiveToggle.disabled = standalone;
    immersiveToggle.checked = standalone || document.fullscreenElement || localStorage.getItem(STORAGE.immersive) === 'on';
    updateProfileUI();
  }
  function togglePlayerPanel() { const expanded = playerMore.getAttribute('aria-expanded') === 'true'; playerMore.setAttribute('aria-expanded', String(!expanded)); playerPanel.hidden = expanded; miniPlayer.classList.toggle('is-expanded', !expanded); }
  function requestExitToTitle() { exitModal.hidden = false; requestAnimationFrame(() => exitModal.classList.add('is-visible')); exitCancel.focus({ preventScroll: true }); }
  function closeExitModal() { exitModal.classList.remove('is-visible'); setTimeout(() => { exitModal.hidden = true; }, 220); }
  async function exitToTitle() { closeExitModal(); await audio.stop({ resetTrack: false }); journeyStarted = false; mainApp.hidden = true; mainApp.classList.remove('settings-open'); onboarding.hidden = true; title.hidden = false; title.classList.remove('is-beginning'); beginButton.disabled = false; miniPlayer.classList.remove('is-visible', 'is-expanded'); playerPanel.hidden = true; playerMore.setAttribute('aria-expanded', 'false'); setTimeout(() => { miniPlayer.hidden = true; }, 260); if (document.fullscreenElement && document.exitFullscreen) { try { await document.exitFullscreen(); } catch (_) {} } requestAnimationFrame(() => title.classList.add('is-visible')); }

  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  beginButton.addEventListener('click', beginJourney); soundToggle.addEventListener('click', () => audio.setEnabled(!audio.getState().enabled));
  $('saveNameButton').addEventListener('click', () => finishOnboarding(true)); $('skipNameButton').addEventListener('click', () => finishOnboarding(false)); displayNameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') birthDateInput.focus(); }); birthDateInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') finishOnboarding(true); });
  $('settingsButton').addEventListener('click', showSettings); $('settingsNavButton').addEventListener('click', showSettings); $('settingsBack').addEventListener('click', showHome); $('homeNavButton').addEventListener('click', showHome);
  document.querySelectorAll('[data-feature]').forEach((button) => button.addEventListener('click', () => showToast(copy('featureSoon'))));
  $('editProfileButton').addEventListener('click', openProfileModal); $('editBirthDateButton').addEventListener('click', openProfileModal); profileCancel.addEventListener('click', closeProfileModal); profileSave.addEventListener('click', saveProfileModal); clearProfileButton.addEventListener('click', clearProfile); profileModal.addEventListener('pointerdown', (event) => { if (event.target === profileModal) closeProfileModal(); });
  motionSelect.addEventListener('change', () => { localStorage.setItem(STORAGE.motion, motionSelect.value); applyMotionMode(); });
  immersiveToggle.addEventListener('change', async () => {
    if (isStandaloneMode()) { updateSettingsUI(); return; }
    if (immersiveToggle.checked) {
      const entered = await requestImmersive();
      localStorage.setItem(STORAGE.immersive, entered ? 'on' : 'off');
      if (!entered) { immersiveToggle.checked = false; showToast(copy('fullscreenUnavailable')); }
    } else {
      localStorage.setItem(STORAGE.immersive, 'off');
      if (document.fullscreenElement && document.exitFullscreen) { try { await document.exitFullscreen(); } catch (_) {} }
    }
  });
  settingsSoundToggle.addEventListener('change', () => audio.setEnabled(settingsSoundToggle.checked)); settingsVolume.addEventListener('input', () => audio.setVolume(Number(settingsVolume.value) / 100)); settingsShuffle.addEventListener('change', () => audio.setShuffle(settingsShuffle.checked));
  playerPlay.addEventListener('click', () => audio.togglePlay()); playerPrevious.addEventListener('click', () => audio.previous()); playerNext.addEventListener('click', () => audio.next({ crossfade: true, durationMs: 700 })); playerMore.addEventListener('click', togglePlayerPanel); volumeSlider.addEventListener('input', () => audio.setVolume(Number(volumeSlider.value) / 100)); shuffleToggle.addEventListener('click', () => audio.setShuffle(!audio.getState().shuffle)); $('exitButton').addEventListener('click', requestExitToTitle); $('returnTitleButton').addEventListener('click', requestExitToTitle);
  exitCancel.addEventListener('click', closeExitModal); exitConfirm.addEventListener('click', exitToTitle); exitModal.addEventListener('pointerdown', (event) => { if (event.target === exitModal) closeExitModal(); }); window.addEventListener('keydown', (event) => { if (event.key !== 'Escape') return; if (!profileModal.hidden) closeProfileModal(); else if (!exitModal.hidden) closeExitModal(); });
  audio.addEventListener('statechange', syncAudioUI); audio.addEventListener('trackchange', syncAudioUI); audio.addEventListener('volumechange', syncAudioUI); systemReduced.addEventListener?.('change', () => { if (currentMotionMode() === 'system') applyMotionMode(); });
  window.addEventListener('lgt:request-exit-to-title', requestExitToTitle);
  window.addEventListener('focus', updateProfileUI);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateProfileUI(); });

  if (!localStorage.getItem(STORAGE.immersiveManualMigration)) {
    localStorage.setItem(STORAGE.immersive, 'off');
    localStorage.setItem(STORAGE.immersiveManualMigration, 'yes');
  }
  document.addEventListener('fullscreenchange', () => {
    if (!isStandaloneMode() && !document.fullscreenElement) localStorage.setItem(STORAGE.immersive, 'off');
    updateSettingsUI();
  });
  const todayISO = localDateISO(); birthDateInput.max = todayISO; profileBirthDateInput.max = todayISO; birthDateInput.min = '1900-01-01'; profileBirthDateInput.min = '1900-01-01';
  setLanguage(language); applyMotionMode(); syncAudioUI(); updateSettingsUI(); scheduleProfileRollover(); window.LGT_BUILD = '0.11.1'; setTimeout(revealTitle, isReducedMotion() ? 1200 : 2600);
})();

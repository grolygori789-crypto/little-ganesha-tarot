(() => {
  'use strict';

  const STORAGE = {
    language: 'lgt.language',
    name: 'lgt.displayName',
    birthDate: 'lgt.birthDate',
    onboardingDone: 'lgt.onboardingDone',
    motion: 'lgt.motion',
    immersive: 'lgt.immersive'
  };

  const COPY = {
    en: {
      begin: 'TAP TO BEGIN', soundOn: 'Sound on', soundOff: 'Sound off', ready: 'The Golden Path is ready.', nowPlaying: 'NOW PLAYING', play: 'Play', pause: 'Pause', previous: 'Previous track', next: 'Next track', more: 'Audio options', volume: 'Volume', shuffle: 'Shuffle', returnTitle: 'Return to Title', exitTitle: 'Return to Title?', exitBody: 'Your preferences will be kept.', cancel: 'Cancel', confirm: 'Return',
      welcomeEyebrow: 'WELCOME TO THE GOLDEN PATH', nameQuestion: 'What would you like Ganesha to call you?', nameHint: 'A first name or nickname is perfect. Both fields are optional and can be changed later.', nameLabel: 'Display name', birthDate: 'Date of birth', birthDateHint: 'Optional · used for future symbolic personalization', localOnly: 'Your personal profile stays on this device.', skip: 'Skip', continue: 'Continue', homeWelcome: 'Take a moment. Hold your question gently, and choose your path.', daily: 'Daily Guidance', dailySub: 'One card for the energy of today', ask: 'Ask Ganesha', askSub: 'Bring one clear question', three: 'Three-Card Reading', threeSub: 'Past, present and what unfolds next', signature: 'Signature Paths', golden: 'The Golden Path', goldenSub: 'Where you stand · what blocks you · the way forward', obstacle: 'Remove the Obstacle', obstacleSub: 'The obstacle · what feeds it · what releases it', explore: 'Explore', lucky: 'Lucky Numbers', cards: 'Cards', journal: 'Journal', settings: 'Settings', home: 'Home', read: 'Read', preferences: 'PREFERENCES', experience: 'Experience', language: 'Language', languageSub: 'Choose English or Thai', motion: 'Motion', motionSub: 'System keeps accessibility preferences', immersive: 'Immersive Mode', immersiveSub: 'Use the most app-like view your device supports', audio: 'Audio', sound: 'Music', soundSub: 'Atmospheric soundtrack', shuffleSub: 'Avoid repeating the same track', profile: 'Personal Profile', displayName: 'Display Name', profilePrivacy: 'Optional profile data is stored only on this device.', editProfile: 'Personal Profile', profileModalHint: 'Both fields are optional. Your information stays on this device.', clearProfile: 'Clear personal profile', save: 'Save', supportProject: 'Support the Project', supportNote: 'Support is optional and never affects readings or features.', internationalSupport: 'International Supporters', internationalSupportSub: 'Buy Me a Coffee', thaiSupport: 'Supporters in Thailand', thaiSupportSub: 'PromptPay · secure QR card coming next', comingSoon: 'Coming soon', qrPending: 'QR pending', notSet: 'Not set', featureSoon: 'This path is ready for the reading-engine build.', hello: 'Welcome', motionSystem: 'System', motionFull: 'Full', motionReduced: 'Reduced'
    },
    th: {
      begin: 'แตะเพื่อเริ่ม', soundOn: 'เปิดเสียง', soundOff: 'ปิดเสียง', ready: 'เส้นทางสีทองพร้อมเปิดออกแล้ว', nowPlaying: 'กำลังเล่น', play: 'เล่น', pause: 'หยุดชั่วคราว', previous: 'เพลงก่อนหน้า', next: 'เพลงถัดไป', more: 'ตัวเลือกเสียง', volume: 'ระดับเสียง', shuffle: 'สุ่มเพลง', returnTitle: 'กลับหน้าไตเติล', exitTitle: 'กลับหน้าไตเติล?', exitBody: 'การตั้งค่าของคุณจะยังคงอยู่', cancel: 'ยกเลิก', confirm: 'กลับ',
      welcomeEyebrow: 'ยินดีต้อนรับสู่เส้นทางสีทอง', nameQuestion: 'อยากให้พระพิฆเนศน้อยเรียกคุณว่าอะไร?', nameHint: 'ใช้ชื่อเล่นหรือชื่อที่คุณสบายใจก็ได้ ทั้งสองช่องเป็นทางเลือกและแก้ไขภายหลังได้', nameLabel: 'ชื่อที่ใช้แสดง', birthDate: 'วันเดือนปีเกิด', birthDateHint: 'ไม่บังคับ · ใช้สำหรับการปรับคำแนะนำเชิงสัญลักษณ์ในอนาคต', localOnly: 'ข้อมูลโปรไฟล์ส่วนตัวจะเก็บไว้ในอุปกรณ์นี้เท่านั้น', skip: 'ข้าม', continue: 'ดำเนินการต่อ', homeWelcome: 'ใช้เวลาสักครู่ วางคำถามไว้ในใจอย่างเบาๆ แล้วเลือกเส้นทางของคุณ', daily: 'คำแนะนำประจำวัน', dailySub: 'หนึ่งใบเพื่อมองพลังของวันนี้', ask: 'ถามพระพิฆเนศน้อย', askSub: 'นำคำถามหนึ่งเรื่องที่ชัดเจนมาวางไว้ตรงหน้า', three: 'เปิดไพ่สามใบ', threeSub: 'อดีต ปัจจุบัน และสิ่งที่กำลังคลี่คลาย', signature: 'เส้นทางพิเศษ', golden: 'เส้นทางสีทอง', goldenSub: 'จุดที่ยืนอยู่ · สิ่งที่ขวางทาง · หนทางข้างหน้า', obstacle: 'คลายสิ่งกีดขวาง', obstacleSub: 'อุปสรรค · สิ่งที่หล่อเลี้ยงมัน · สิ่งที่ช่วยปล่อยวาง', explore: 'สำรวจ', lucky: 'เลขมงคล', cards: 'ไพ่', journal: 'บันทึก', settings: 'ตั้งค่า', home: 'หน้าหลัก', read: 'เปิดไพ่', preferences: 'การตั้งค่า', experience: 'ประสบการณ์ใช้งาน', language: 'ภาษา', languageSub: 'เลือกภาษาอังกฤษหรือไทย', motion: 'เอฟเฟกต์การเคลื่อนไหว', motionSub: 'โหมดระบบจะเคารพการตั้งค่าการช่วยการเข้าถึงของอุปกรณ์', immersive: 'โหมดเต็มพื้นที่', immersiveSub: 'ใช้มุมมองแบบแอพมากที่สุดเท่าที่อุปกรณ์รองรับ', audio: 'เสียง', sound: 'เพลง', soundSub: 'เพลงบรรยากาศภายในแอพ', shuffleSub: 'ช่วยไม่ให้เพลงเดิมเล่นซ้ำติดกัน', profile: 'โปรไฟล์ส่วนตัว', displayName: 'ชื่อที่ใช้แสดง', profilePrivacy: 'ข้อมูลโปรไฟล์เป็นทางเลือกและเก็บไว้ในอุปกรณ์นี้เท่านั้น', editProfile: 'โปรไฟล์ส่วนตัว', profileModalHint: 'ทั้งสองช่องเป็นทางเลือก ข้อมูลของคุณจะเก็บไว้ในอุปกรณ์นี้เท่านั้น', clearProfile: 'ล้างข้อมูลโปรไฟล์ส่วนตัว', save: 'บันทึก', supportProject: 'สนับสนุนโปรเจกต์', supportNote: 'การสนับสนุนเป็นทางเลือกและไม่มีผลต่อการเปิดไพ่หรือฟีเจอร์ใดๆ', internationalSupport: 'ผู้สนับสนุนนอกประเทศไทย', internationalSupportSub: 'Buy Me a Coffee', thaiSupport: 'ผู้สนับสนุนในประเทศไทย', thaiSupportSub: 'PromptPay · กำลังเตรียมการ์ด QR ที่ปลอดภัย', comingSoon: 'เร็วๆ นี้', qrPending: 'กำลังเตรียม QR', notSet: 'ยังไม่ได้ตั้ง', featureSoon: 'เส้นทางนี้เตรียมไว้สำหรับ Reading Engine ใน build ถัดไป', hello: 'ยินดีต้อนรับ', motionSystem: 'ตามระบบ', motionFull: 'เต็ม', motionReduced: 'ลดการเคลื่อนไหว'
    }
  };

  const $ = (id) => document.getElementById(id);
  const splash = $('studioSplash'), title = $('titleScreen'), beginButton = $('beginButton'), onboarding = $('onboardingScreen'), mainApp = $('mainApp'), homeView = $('homeView'), settingsView = $('settingsView');
  const miniPlayer = $('miniPlayer'), playerTitle = $('playerTitle'), playerEyebrow = $('playerEyebrow'), playerPlay = $('playerPlay'), playerPrevious = $('playerPrevious'), playerNext = $('playerNext'), playerMore = $('playerMore'), playerPanel = $('playerPanel'), volumeSlider = $('volumeSlider'), shuffleToggle = $('shuffleToggle'), soundToggle = $('soundToggle');
  const settingsSoundToggle = $('settingsSoundToggle'), settingsVolume = $('settingsVolume'), settingsShuffle = $('settingsShuffle'), motionSelect = $('motionSelect'), immersiveToggle = $('immersiveToggle');
  const exitModal = $('exitModal'), exitCancel = $('exitCancel'), exitConfirm = $('exitConfirm'), toast = $('toast'), liveStatus = $('liveStatus');
  const displayNameInput = $('displayNameInput'), birthDateInput = $('birthDateInput'), displayNameValue = $('displayNameValue'), birthDateValue = $('birthDateValue'), homeGreeting = $('homeGreeting');
  const profileModal = $('profileModal'), profileNameInput = $('profileNameInput'), profileBirthDateInput = $('profileBirthDateInput'), profileCancel = $('profileCancel'), profileSave = $('profileSave'), clearProfileButton = $('clearProfileButton');
  const audio = window.LGTAudio;
  const systemReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const browserPrefersThai = navigator.language?.toLowerCase().startsWith('th');

  let language = localStorage.getItem(STORAGE.language) || (browserPrefersThai ? 'th' : 'en');
  let splashDismissed = false;
  let journeyStarted = false;
  let toastTimer = null;

  function copy(key) { return COPY[language][key] || COPY.en[key] || key; }

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'th' ? 'th' : 'en';
    localStorage.setItem(STORAGE.language, language);
    document.documentElement.lang = language;
    document.querySelectorAll('[data-copy]').forEach((node) => { const value = COPY[language][node.dataset.copy]; if (value) node.textContent = value; });
    document.querySelectorAll('[data-copy-option]').forEach((node) => { const value = COPY[language][node.dataset.copyOption]; if (value) node.textContent = value; });
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

  async function requestImmersive() {
    if (localStorage.getItem(STORAGE.immersive) === 'off') return;
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (standalone || document.fullscreenElement || !document.documentElement.requestFullscreen) return;
    try { await document.documentElement.requestFullscreen({ navigationUI: 'hide' }); } catch (_) { /* graceful fallback */ }
  }

  function goToHome() {
    onboarding.hidden = true; title.hidden = true; mainApp.hidden = false; homeView.hidden = false; settingsView.hidden = true; document.body.classList.add('journey-active');
    miniPlayer.hidden = false; requestAnimationFrame(() => miniPlayer.classList.add('is-visible'));
    updateProfileUI();
  }

  async function beginJourney() {
    if (journeyStarted) return; journeyStarted = true; beginButton.disabled = true; liveStatus.textContent = copy('ready');
    await requestImmersive(); await audio.unlockAndStart(); syncAudioUI();
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
      return new Intl.DateTimeFormat(language === 'th' ? 'th-TH' : 'en-US', {
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
    if (homeGreeting) homeGreeting.textContent = name ? `${copy('hello')}, ${name}` : 'The Golden Path';
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

  function showSettings() { homeView.hidden = true; settingsView.hidden = false; mainApp.classList.add('settings-open'); $('homeNavButton').classList.remove('is-active'); $('settingsNavButton').classList.add('is-active'); updateSettingsUI(); }
  function showHome() { settingsView.hidden = true; homeView.hidden = false; mainApp.classList.remove('settings-open'); $('settingsNavButton').classList.remove('is-active'); $('homeNavButton').classList.add('is-active'); }

  function syncAudioUI() {
    const state = audio.getState();
    soundToggle.setAttribute('aria-pressed', String(state.enabled)); soundToggle.setAttribute('aria-label', state.enabled ? copy('soundOn') : copy('soundOff'));
    playerEyebrow.textContent = copy('nowPlaying'); playerTitle.textContent = state.track?.title || '—'; playerPlay.dataset.state = state.playing ? 'pause' : 'play'; playerPlay.setAttribute('aria-label', state.playing ? copy('pause') : copy('play'));
    playerPrevious.setAttribute('aria-label', copy('previous')); playerNext.setAttribute('aria-label', copy('next')); playerMore.setAttribute('aria-label', copy('more'));
    volumeSlider.value = String(Math.round(state.volume * 100)); shuffleToggle.setAttribute('aria-pressed', String(state.shuffle)); shuffleToggle.classList.toggle('is-active', state.shuffle);
    settingsSoundToggle.checked = state.enabled; settingsVolume.value = String(Math.round(state.volume * 100)); settingsShuffle.checked = state.shuffle;
  }

  function updateSettingsUI() { syncAudioUI(); motionSelect.value = currentMotionMode(); immersiveToggle.checked = localStorage.getItem(STORAGE.immersive) !== 'off'; updateProfileUI(); }
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
  immersiveToggle.addEventListener('change', async () => { localStorage.setItem(STORAGE.immersive, immersiveToggle.checked ? 'on' : 'off'); if (immersiveToggle.checked) await requestImmersive(); else if (document.fullscreenElement && document.exitFullscreen) { try { await document.exitFullscreen(); } catch (_) {} } });
  settingsSoundToggle.addEventListener('change', () => audio.setEnabled(settingsSoundToggle.checked)); settingsVolume.addEventListener('input', () => audio.setVolume(Number(settingsVolume.value) / 100)); settingsShuffle.addEventListener('change', () => audio.setShuffle(settingsShuffle.checked));
  playerPlay.addEventListener('click', () => audio.togglePlay()); playerPrevious.addEventListener('click', () => audio.previous()); playerNext.addEventListener('click', () => audio.next({ crossfade: true, durationMs: 700 })); playerMore.addEventListener('click', togglePlayerPanel); volumeSlider.addEventListener('input', () => audio.setVolume(Number(volumeSlider.value) / 100)); shuffleToggle.addEventListener('click', () => audio.setShuffle(!audio.getState().shuffle)); $('exitButton').addEventListener('click', requestExitToTitle); $('returnTitleButton').addEventListener('click', requestExitToTitle);
  exitCancel.addEventListener('click', closeExitModal); exitConfirm.addEventListener('click', exitToTitle); exitModal.addEventListener('pointerdown', (event) => { if (event.target === exitModal) closeExitModal(); }); window.addEventListener('keydown', (event) => { if (event.key !== 'Escape') return; if (!profileModal.hidden) closeProfileModal(); else if (!exitModal.hidden) closeExitModal(); });
  audio.addEventListener('statechange', syncAudioUI); audio.addEventListener('trackchange', syncAudioUI); audio.addEventListener('volumechange', syncAudioUI); systemReduced.addEventListener?.('change', () => { if (currentMotionMode() === 'system') applyMotionMode(); });
  window.addEventListener('lgt:request-exit-to-title', requestExitToTitle);

  if (!localStorage.getItem(STORAGE.immersive)) localStorage.setItem(STORAGE.immersive, 'on');
  const todayISO = localDateISO(); birthDateInput.max = todayISO; profileBirthDateInput.max = todayISO; birthDateInput.min = '1900-01-01'; profileBirthDateInput.min = '1900-01-01';
  setLanguage(language); applyMotionMode(); syncAudioUI(); updateSettingsUI(); window.LGT_BUILD = '0.3.3'; setTimeout(revealTitle, isReducedMotion() ? 1200 : 2600);
})();

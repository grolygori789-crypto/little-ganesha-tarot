(() => {
  'use strict';

  const VERSION = 'help-feedback-v1';
  const SUPPORT_EMAIL = 'benedict.support@gmail.com';
  const MAX_MESSAGE = 1200;

  const COPY = {
    en: {
      heading: 'Help & Feedback',
      report: 'Report a Problem',
      reportSub: 'Something not working as expected? Tell us what happened.',
      feedback: 'Send Feedback',
      feedbackSub: 'Share an idea or tell us about your experience.',
      diagnostics: 'Copy Diagnostic Info',
      diagnosticsSub: 'Copy non-sensitive app and device details.',
      supportMail: 'Benedict Interactive Support',
      reportTitle: 'Report a Problem',
      reportIntro: 'Tell us what happened. We’ll prepare an email to Benedict Interactive Support.',
      feedbackTitle: 'Send Feedback',
      feedbackIntro: 'Share what worked well, what could be better, or an idea you’d like us to consider.',
      messageLabel: 'Your message',
      reportPlaceholder: 'What happened? What were you trying to do?',
      feedbackPlaceholder: 'Tell us what you think…',
      includeTech: 'Include technical details',
      techNote: 'Only non-sensitive app, platform, browser and language details are included.',
      privacy: 'Please don’t include passwords, payment details, private Journal entries, or personal reading questions.',
      mailNote: 'Sending opens your email app. Nothing is sent until you choose Send there.',
      sendReport: 'Open Email to Send Report',
      sendFeedback: 'Open Email to Send Feedback',
      copyReport: 'Copy Report Details',
      cancel: 'Cancel',
      close: 'Close',
      copied: 'Diagnostic info copied.',
      reportCopied: 'Report details copied.',
      copyFailed: 'Couldn’t copy automatically. Please select and copy the details manually.',
      messageRequired: 'Please write a short message first.',
      technicalTitle: 'Technical details',
      chars: (n) => `${n} characters remaining`,
    },
    th: {
      heading: 'ช่วยเหลือและข้อเสนอแนะ',
      report: 'รายงานปัญหา',
      reportSub: 'มีส่วนไหนใช้งานไม่เป็นไปตามที่ควร บอกเราได้ที่นี่',
      feedback: 'ส่งข้อเสนอแนะ',
      feedbackSub: 'แบ่งปันความคิดเห็น ประสบการณ์ หรือสิ่งที่อยากให้เราปรับปรุง',
      diagnostics: 'คัดลอกข้อมูลทางเทคนิค',
      diagnosticsSub: 'คัดลอกเฉพาะข้อมูลแอปและอุปกรณ์ที่ไม่ละเอียดอ่อน',
      supportMail: 'ฝ่ายสนับสนุน Benedict Interactive',
      reportTitle: 'รายงานปัญหา',
      reportIntro: 'เล่าให้เราฟังว่าเกิดอะไรขึ้น ระบบจะเตรียมอีเมลถึงฝ่ายสนับสนุน Benedict Interactive ให้พร้อมส่ง',
      feedbackTitle: 'ส่งข้อเสนอแนะ',
      feedbackIntro: 'บอกเราได้เลยว่าส่วนไหนใช้งานดี ส่วนไหนควรปรับ หรือมีอะไรที่อยากเห็นในอนาคต',
      messageLabel: 'ข้อความของคุณ',
      reportPlaceholder: 'เกิดอะไรขึ้น และตอนนั้นคุณกำลังทำอะไรอยู่?',
      feedbackPlaceholder: 'เขียนความคิดเห็นของคุณได้เลย…',
      includeTech: 'แนบข้อมูลทางเทคนิค',
      techNote: 'แนบเฉพาะเวอร์ชันแอป แพลตฟอร์ม เบราว์เซอร์ และภาษาที่ใช้งาน โดยไม่ดึงข้อมูลส่วนตัวจากการเปิดไพ่',
      privacy: 'กรุณาอย่าใส่รหัสผ่าน ข้อมูลการชำระเงิน ข้อความส่วนตัวใน Journal หรือคำถามส่วนตัวจากการเปิดไพ่',
      mailNote: 'เมื่อกดส่ง แอปจะเปิดแอปอีเมลของคุณ และจะยังไม่มีข้อมูลถูกส่งจนกว่าคุณจะกดส่งอีเมลเอง',
      sendReport: 'เปิดอีเมลเพื่อส่งรายงาน',
      sendFeedback: 'เปิดอีเมลเพื่อส่งข้อเสนอแนะ',
      copyReport: 'คัดลอกรายละเอียดรายงาน',
      cancel: 'ยกเลิก',
      close: 'ปิด',
      copied: 'คัดลอกข้อมูลทางเทคนิคแล้ว',
      reportCopied: 'คัดลอกรายละเอียดรายงานแล้ว',
      copyFailed: 'ไม่สามารถคัดลอกให้อัตโนมัติได้ กรุณาเลือกและคัดลอกข้อความด้วยตนเอง',
      messageRequired: 'กรุณาเขียนข้อความสั้นๆ ก่อน',
      technicalTitle: 'ข้อมูลทางเทคนิค',
      chars: (n) => `พิมพ์ได้อีก ${n} ตัวอักษร`,
    },
    hi: {
      heading: 'सहायता और फ़ीडबैक',
      report: 'समस्या की रिपोर्ट करें',
      reportSub: 'कुछ ठीक से काम नहीं कर रहा? हमें बताएँ क्या हुआ।',
      feedback: 'फ़ीडबैक भेजें',
      feedbackSub: 'अपना अनुभव, सुझाव या सुधार का विचार साझा करें।',
      diagnostics: 'तकनीकी जानकारी कॉपी करें',
      diagnosticsSub: 'ऐप और डिवाइस की केवल गैर-संवेदनशील जानकारी कॉपी करें।',
      supportMail: 'Benedict Interactive सहायता',
      reportTitle: 'समस्या की रिपोर्ट करें',
      reportIntro: 'हमें बताएँ क्या हुआ। हम Benedict Interactive Support के लिए एक ईमेल तैयार कर देंगे।',
      feedbackTitle: 'फ़ीडबैक भेजें',
      feedbackIntro: 'क्या अच्छा लगा, क्या बेहतर हो सकता है, या आप आगे क्या देखना चाहेंगे—हमें बताएँ।',
      messageLabel: 'आपका संदेश',
      reportPlaceholder: 'क्या हुआ? उस समय आप क्या करने की कोशिश कर रहे थे?',
      feedbackPlaceholder: 'अपनी राय यहाँ लिखें…',
      includeTech: 'तकनीकी जानकारी शामिल करें',
      techNote: 'केवल ऐप वर्ज़न, प्लेटफ़ॉर्म, ब्राउज़र और भाषा जैसी गैर-संवेदनशील जानकारी शामिल होती है।',
      privacy: 'कृपया पासवर्ड, भुगतान जानकारी, निजी Journal प्रविष्टियाँ या व्यक्तिगत reading questions न लिखें।',
      mailNote: 'भेजने पर आपका ईमेल ऐप खुलेगा। जब तक आप वहाँ Send नहीं चुनते, कुछ भी भेजा नहीं जाता।',
      sendReport: 'रिपोर्ट भेजने के लिए ईमेल खोलें',
      sendFeedback: 'फ़ीडबैक भेजने के लिए ईमेल खोलें',
      copyReport: 'रिपोर्ट की जानकारी कॉपी करें',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      copied: 'तकनीकी जानकारी कॉपी हो गई।',
      reportCopied: 'रिपोर्ट की जानकारी कॉपी हो गई।',
      copyFailed: 'जानकारी अपने-आप कॉपी नहीं हो सकी। कृपया उसे चुनकर मैन्युअली कॉपी करें।',
      messageRequired: 'पहले एक छोटा संदेश लिखें।',
      technicalTitle: 'तकनीकी जानकारी',
      chars: (n) => `${n} अक्षर बाकी`,
    }
  };

  const state = {
    root: null,
    opener: null,
    type: 'report',
    settingsSection: null,
    toastTimer: null,
  };

  const language = () => {
    const value = (document.documentElement.lang || 'en').toLowerCase();
    return value.startsWith('th') ? 'th' : value.startsWith('hi') ? 'hi' : 'en';
  };
  const copy = () => COPY[language()];

  function detectPlatform() {
    const ua = navigator.userAgent || '';
    if (/Android/i.test(ua)) return 'Android';
    if (/iPad|iPhone|iPod/i.test(ua)) return 'iOS / iPadOS';
    if (/Windows/i.test(ua)) return 'Windows';
    if (/Macintosh|Mac OS X/i.test(ua)) return 'macOS';
    if (/Linux/i.test(ua)) return 'Linux';
    return navigator.userAgentData?.platform || navigator.platform || 'Unknown';
  }

  function detectBrowser() {
    const ua = navigator.userAgent || '';
    const checks = [
      [/SamsungBrowser\/(\d+)/i, 'Samsung Internet'],
      [/EdgA?\/(\d+)/i, 'Microsoft Edge'],
      [/CriOS\/(\d+)/i, 'Chrome'],
      [/Chrome\/(\d+)/i, 'Chrome'],
      [/FxiOS\/(\d+)/i, 'Firefox'],
      [/Firefox\/(\d+)/i, 'Firefox'],
      [/Version\/(\d+).*Safari/i, 'Safari'],
    ];
    for (const [pattern, name] of checks) {
      const match = ua.match(pattern);
      if (match) return `${name} ${match[1]}`;
    }
    return 'Unknown';
  }

  function displayMode() {
    if (window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true) return 'Installed PWA';
    return 'Browser';
  }

  function currentScreen() {
    const body = document.body;
    if (body.classList.contains('tl-mode-open')) return 'Tarot Library';
    if (body.classList.contains('lucky-mode-open')) return 'Lucky Numbers';
    if (body.classList.contains('journal-mode-open')) return 'Journal';
    if (body.classList.contains('read-hub-open')) return 'Reading Hub';
    if (body.classList.contains('legal-mode-open')) return 'Legal Center';
    if (!document.getElementById('settingsView')?.hidden) return 'Settings → Help & Feedback';
    return 'Home / Main App';
  }

  function diagnostics() {
    const build = window.LGT_BUILD || document.body.dataset.build || document.querySelector('meta[name="application-version"]')?.content || 'Unknown';
    return [
      `App: Little Ganesha Tarot`,
      `Version: ${build}`,
      `Language: ${language()}`,
      `Platform: ${detectPlatform()}`,
      `Browser: ${detectBrowser()}`,
      `Environment: ${displayMode()}`,
      `Screen: ${currentScreen()}`,
      `Time: ${new Date().toISOString()}`,
    ].join('\n');
  }

  function reportBody(type, message, includeTechnical) {
    const title = type === 'report' ? 'Little Ganesha Tarot — Problem Report' : 'Little Ganesha Tarot — Feedback';
    const parts = [title, '', 'Message:', message.trim()];
    if (includeTechnical) parts.push('', 'Technical details:', diagnostics());
    parts.push('', '---', `Sent voluntarily to ${SUPPORT_EMAIL}.`);
    return parts.join('\n');
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(text); return true; } catch (_) {}
    }
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    area.style.pointerEvents = 'none';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) {}
    area.remove();
    return ok;
  }

  function showToast(text) {
    let node = document.getElementById('hfToast');
    if (!node) {
      node = document.createElement('div');
      node.id = 'hfToast';
      node.className = 'hf-toast';
      node.hidden = true;
      node.setAttribute('role', 'status');
      node.setAttribute('aria-live', 'polite');
      document.body.appendChild(node);
    }
    node.textContent = text;
    node.hidden = false;
    requestAnimationFrame(() => node.classList.add('is-visible'));
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => {
      node.classList.remove('is-visible');
      setTimeout(() => { node.hidden = true; }, 180);
    }, 2400);
  }

  function createDialog() {
    if (state.root) return state.root;
    const root = document.createElement('section');
    root.id = 'helpFeedbackScreen';
    root.className = 'hf-screen';
    root.hidden = true;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'hfTitle');
    root.innerHTML = `
      <div class="hf-backdrop" data-hf-close aria-hidden="true"></div>
      <div class="hf-panel">
        <header class="hf-topbar">
          <button class="hf-close" id="hfClose" type="button" aria-label="Close">‹</button>
          <div class="hf-brand"><strong>BENEDICT INTERACTIVE</strong><small>SUPPORT</small></div>
          <span class="hf-topbar__spacer" aria-hidden="true"></span>
        </header>
        <div class="hf-scroll">
          <main class="hf-content">
            <span class="hf-eyebrow" id="hfEyebrow"></span>
            <h1 id="hfTitle"></h1>
            <p class="hf-intro" id="hfIntro"></p>
            <div class="hf-address"><span id="hfSupportLabel"></span><strong>${SUPPORT_EMAIL}</strong></div>
            <label class="hf-field">
              <span id="hfMessageLabel"></span>
              <textarea id="hfMessage" maxlength="${MAX_MESSAGE}" rows="8"></textarea>
              <small id="hfChars"></small>
            </label>
            <label class="hf-check">
              <input id="hfIncludeTech" type="checkbox">
              <span><strong id="hfIncludeTechLabel"></strong><small id="hfTechNote"></small></span>
            </label>
            <section class="hf-tech" id="hfTechPreview" hidden>
              <div class="hf-tech__head"><strong id="hfTechnicalTitle"></strong></div>
              <pre id="hfTechnicalText"></pre>
            </section>
            <p class="hf-privacy" id="hfPrivacy"></p>
            <p class="hf-mail-note" id="hfMailNote"></p>
            <div class="hf-actions">
              <button class="hf-primary" id="hfSend" type="button"></button>
              <button class="hf-secondary" id="hfCopy" type="button"></button>
              <button class="hf-text-button" id="hfCancel" type="button"></button>
            </div>
          </main>
        </div>
      </div>`;
    (document.getElementById('app') || document.body).appendChild(root);
    state.root = root;

    root.querySelector('#hfClose').addEventListener('click', closeDialog);
    root.querySelector('#hfCancel').addEventListener('click', closeDialog);
    root.querySelector('[data-hf-close]').addEventListener('click', closeDialog);
    root.querySelector('#hfMessage').addEventListener('input', updateMessageState);
    root.querySelector('#hfIncludeTech').addEventListener('change', updateTechPreview);
    root.querySelector('#hfSend').addEventListener('click', sendEmail);
    root.querySelector('#hfCopy').addEventListener('click', copyCurrentReport);
    return root;
  }

  function updateMessageState() {
    if (!state.root) return;
    const c = copy();
    const message = state.root.querySelector('#hfMessage');
    const remaining = Math.max(0, MAX_MESSAGE - message.value.length);
    state.root.querySelector('#hfChars').textContent = c.chars(remaining);
    state.root.querySelector('#hfSend').disabled = !message.value.trim();
  }

  function updateTechPreview() {
    if (!state.root) return;
    const checked = state.root.querySelector('#hfIncludeTech').checked;
    const section = state.root.querySelector('#hfTechPreview');
    section.hidden = !checked;
    if (checked) state.root.querySelector('#hfTechnicalText').textContent = diagnostics();
  }

  function applyDialogCopy() {
    if (!state.root) return;
    const c = copy();
    const report = state.type === 'report';
    state.root.querySelector('#hfClose').setAttribute('aria-label', c.close);
    state.root.querySelector('#hfEyebrow').textContent = c.heading;
    state.root.querySelector('#hfTitle').textContent = report ? c.reportTitle : c.feedbackTitle;
    state.root.querySelector('#hfIntro').textContent = report ? c.reportIntro : c.feedbackIntro;
    state.root.querySelector('#hfSupportLabel').textContent = c.supportMail;
    state.root.querySelector('#hfMessageLabel').textContent = c.messageLabel;
    state.root.querySelector('#hfMessage').placeholder = report ? c.reportPlaceholder : c.feedbackPlaceholder;
    state.root.querySelector('#hfIncludeTechLabel').textContent = c.includeTech;
    state.root.querySelector('#hfTechNote').textContent = c.techNote;
    state.root.querySelector('#hfTechnicalTitle').textContent = c.technicalTitle;
    state.root.querySelector('#hfPrivacy').textContent = c.privacy;
    state.root.querySelector('#hfMailNote').textContent = c.mailNote;
    state.root.querySelector('#hfSend').textContent = report ? c.sendReport : c.sendFeedback;
    state.root.querySelector('#hfCopy').textContent = c.copyReport;
    state.root.querySelector('#hfCancel').textContent = c.cancel;
    updateMessageState();
    updateTechPreview();
  }

  function openDialog(type, opener) {
    createDialog();
    state.type = type === 'feedback' ? 'feedback' : 'report';
    state.opener = opener || document.activeElement;
    state.root.querySelector('#hfMessage').value = '';
    state.root.querySelector('#hfIncludeTech').checked = state.type === 'report';
    applyDialogCopy();
    state.root.hidden = false;
    document.body.classList.add('hf-mode-open');
    requestAnimationFrame(() => state.root.classList.add('is-visible'));
    setTimeout(() => state.root.querySelector('#hfMessage')?.focus({ preventScroll: true }), 80);
  }

  function closeDialog() {
    if (!state.root || state.root.hidden) return;
    state.root.classList.remove('is-visible');
    document.body.classList.remove('hf-mode-open');
    const opener = state.opener;
    setTimeout(() => {
      state.root.hidden = true;
      opener?.focus?.({ preventScroll: true });
    }, 210);
  }

  function sendEmail() {
    if (!state.root) return;
    const c = copy();
    const message = state.root.querySelector('#hfMessage').value.trim();
    if (!message) { showToast(c.messageRequired); state.root.querySelector('#hfMessage').focus(); return; }
    const include = state.root.querySelector('#hfIncludeTech').checked;
    const subject = state.type === 'report'
      ? `Little Ganesha Tarot — Problem Report [${window.LGT_BUILD || 'App'}]`
      : `Little Ganesha Tarot — Feedback [${window.LGT_BUILD || 'App'}]`;
    const body = reportBody(state.type, message, include);
    const href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const link = document.createElement('a');
    link.href = href;
    link.rel = 'noopener';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function copyCurrentReport() {
    if (!state.root) return;
    const c = copy();
    const message = state.root.querySelector('#hfMessage').value.trim();
    if (!message) { showToast(c.messageRequired); state.root.querySelector('#hfMessage').focus(); return; }
    const text = reportBody(state.type, message, state.root.querySelector('#hfIncludeTech').checked);
    showToast(await copyText(text) ? c.reportCopied : c.copyFailed);
  }

  async function copyDiagnostics() {
    const c = copy();
    showToast(await copyText(diagnostics()) ? c.copied : c.copyFailed);
  }

  function injectSettings() {
    if (document.querySelector('[data-hf-settings]')) return;
    const support = document.querySelector('.settings-group.support-group');
    if (!support) return;
    const section = document.createElement('section');
    section.className = 'settings-group hf-settings-group';
    section.dataset.hfSettings = 'true';
    section.innerHTML = `
      <h3 id="hfSettingsHeading"></h3>
      <button class="setting-link" id="hfReportButton" type="button"><span><strong id="hfReportLabel"></strong><small id="hfReportSub"></small></span><span>›</span></button>
      <button class="setting-link" id="hfFeedbackButton" type="button"><span><strong id="hfFeedbackLabel"></strong><small id="hfFeedbackSub"></small></span><span>›</span></button>
      <button class="setting-link" id="hfDiagnosticsButton" type="button"><span><strong id="hfDiagnosticsLabel"></strong><small id="hfDiagnosticsSub"></small></span><span>⧉</span></button>
      <p class="hf-settings-email"><span id="hfSupportMailLabel"></span><strong>${SUPPORT_EMAIL}</strong></p>`;
    support.parentNode.insertBefore(section, support);
    state.settingsSection = section;
    section.querySelector('#hfReportButton').addEventListener('click', (event) => openDialog('report', event.currentTarget));
    section.querySelector('#hfFeedbackButton').addEventListener('click', (event) => openDialog('feedback', event.currentTarget));
    section.querySelector('#hfDiagnosticsButton').addEventListener('click', copyDiagnostics);
    updateSettingsCopy();
  }

  function updateSettingsCopy() {
    const section = state.settingsSection || document.querySelector('[data-hf-settings]');
    if (!section) return;
    const c = copy();
    section.querySelector('#hfSettingsHeading').textContent = c.heading;
    section.querySelector('#hfReportLabel').textContent = c.report;
    section.querySelector('#hfReportSub').textContent = c.reportSub;
    section.querySelector('#hfFeedbackLabel').textContent = c.feedback;
    section.querySelector('#hfFeedbackSub').textContent = c.feedbackSub;
    section.querySelector('#hfDiagnosticsLabel').textContent = c.diagnostics;
    section.querySelector('#hfDiagnosticsSub').textContent = c.diagnosticsSub;
    section.querySelector('#hfSupportMailLabel').textContent = `${c.supportMail}:`;
  }

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !state.root || state.root.hidden) return;
    event.preventDefault();
    closeDialog();
  });

  const langObserver = new MutationObserver(() => {
    updateSettingsCopy();
    if (state.root && !state.root.hidden) applyDialogCopy();
  });
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  injectSettings();

  window.LGTHelpFeedback = Object.freeze({
    version: VERSION,
    supportEmail: SUPPORT_EMAIL,
    diagnostics,
    openReport: () => openDialog('report'),
    openFeedback: () => openDialog('feedback'),
  });
})();

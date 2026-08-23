(() => {
  'use strict';

  const VERSION = 'support-v1';
  const QR_SRC = 'assets/support/promptpay-qr.png?v=0.13.0';
  const QR_FILENAME = 'little-ganesha-promptpay-qr.png';
  const RECIPIENT_TH = 'จักรพันธ์ เบญจศุภนิมิต';
  const RECIPIENT_EN = 'Jakraphan Benjasupanimit';

  const COPY = {
    en: {
      cardSub: 'PromptPay · scan or save the QR', cardButton: 'Open QR',
      eyebrow: 'SUPPORT IN THAILAND', title: 'Support with PromptPay',
      lead: 'Scan the QR with a Thai banking app, or save it first if you are using the same phone.',
      recipient: 'RECIPIENT',
      thanks1: 'Thank you for supporting Little Ganesha Tarot.',
      thanks2: 'Every contribution helps this project keep growing.',
      verify: 'Please verify the recipient name in your banking app before confirming the payment.',
      save: 'Save QR', saving: 'Preparing QR…', saved: 'QR image saved.', saveFallback: 'The QR opened as an image. Save it from your device if needed.',
      saveHint: 'On the same phone, save the QR and choose it from your banking app’s gallery.',
      disclaimer: 'Support is always optional and never affects your readings, card selection, or access to any feature.',
      back: 'Back to Settings', home: 'Back to Home', aria: 'PromptPay support'
    },
    th: {
      cardSub: 'พร้อมเพย์ · สแกนหรือบันทึก QR ได้ทันที', cardButton: 'เปิด QR',
      eyebrow: 'สนับสนุนในประเทศไทย', title: 'สนับสนุนผ่านพร้อมเพย์',
      lead: 'สแกน QR ด้วยแอปธนาคาร หรือบันทึก QR ไว้ก่อนเมื่อใช้งานบนโทรศัพท์เครื่องเดียวกัน',
      recipient: 'ชื่อผู้รับ',
      thanks1: 'ขอบคุณที่ร่วมสนับสนุน Little Ganesha Tarot',
      thanks2: 'ทุกการสนับสนุนช่วยให้โปรเจกต์นี้เดินทางต่อไปได้',
      verify: 'กรุณาตรวจสอบชื่อผู้รับในแอปธนาคารก่อนยืนยันการโอนทุกครั้ง',
      save: 'บันทึก QR', saving: 'กำลังเตรียม QR…', saved: 'บันทึกภาพ QR แล้ว', saveFallback: 'เปิดภาพ QR ให้แล้ว สามารถบันทึกจากอุปกรณ์ได้ตามปกติ',
      saveHint: 'ถ้าใช้โทรศัพท์เครื่องเดียวกัน ให้บันทึก QR แล้วเลือกภาพจากแกลเลอรีในแอปธนาคาร',
      disclaimer: 'การสนับสนุนเป็นทางเลือก และไม่มีผลต่อผลการเปิดไพ่ การเลือกไพ่ หรือการใช้งานฟีเจอร์ใดๆ',
      back: 'กลับไปหน้าตั้งค่า', home: 'กลับหน้าหลัก', aria: 'สนับสนุนผ่านพร้อมเพย์'
    },
    hi: {
      cardSub: 'PromptPay · QR स्कैन करें या सेव करें', cardButton: 'QR खोलें',
      eyebrow: 'थाईलैंड में समर्थन', title: 'PromptPay से समर्थन करें',
      lead: 'थाई बैंकिंग ऐप से QR स्कैन करें। अगर आप इसी फ़ोन पर हैं, तो पहले QR सेव कर सकते हैं।',
      recipient: 'प्राप्तकर्ता',
      thanks1: 'Little Ganesha Tarot का समर्थन करने के लिए धन्यवाद।',
      thanks2: 'आपका सहयोग इस प्रोजेक्ट को आगे बढ़ने में मदद करता है।',
      verify: 'भुगतान की पुष्टि करने से पहले अपने बैंकिंग ऐप में प्राप्तकर्ता का नाम ज़रूर जाँचें।',
      save: 'QR सेव करें', saving: 'QR तैयार हो रहा है…', saved: 'QR इमेज सेव हो गई।', saveFallback: 'QR इमेज खोल दी गई है। ज़रूरत हो तो इसे अपने डिवाइस पर सेव करें।',
      saveHint: 'इसी फ़ोन पर भुगतान करने के लिए QR सेव करें और बैंकिंग ऐप में गैलरी से चुनें।',
      disclaimer: 'समर्थन पूरी तरह वैकल्पिक है और आपकी रीडिंग, कार्ड चयन या किसी भी फ़ीचर की उपलब्धता को प्रभावित नहीं करता।',
      back: 'सेटिंग्स पर लौटें', home: 'होम पर लौटें', aria: 'PromptPay समर्थन'
    }
  };

  let root = null;
  let previousFocus = null;
  let busy = false;
  const lang = () => document.documentElement.lang === 'th' ? 'th' : document.documentElement.lang === 'hi' ? 'hi' : 'en';
  const t = key => COPY[lang()][key] || COPY.en[key] || key;
  const mainApp = () => document.getElementById('mainApp');
  const promptButton = () => document.getElementById('promptPaySupportButton');

  function setMainInert(value) {
    const main = mainApp();
    if (!main) return;
    if ('inert' in main) main.inert = value;
    if (value) main.setAttribute('aria-hidden', 'true');
    else main.removeAttribute('aria-hidden');
  }

  function ensureRoot() {
    if (root) return root;
    root = document.createElement('section');
    root.id = 'promptPaySupportSheet';
    root.className = 'support-sheet';
    root.hidden = true;
    root.innerHTML = `
      <header class="support-sheet__topbar">
        <button class="support-sheet__back" id="promptPayBack" type="button"><span aria-hidden="true">‹</span></button>
        <div class="support-sheet__brand"><strong>LITTLE GANESHA TAROT</strong><small>THE GOLDEN PATH</small></div>
        <button class="support-sheet__home" id="promptPayHome" type="button"><span aria-hidden="true">⌂</span></button>
      </header>
      <div class="support-sheet__scroll">
        <main class="support-sheet__content">
          <span class="support-sheet__eyebrow" id="promptPayEyebrow"></span>
          <h1 class="support-sheet__title" id="promptPayTitle"></h1>
          <p class="support-sheet__lead" id="promptPayLead"></p>
          <section class="promptpay-panel">
            <div class="promptpay-mark">PromptPay</div>
            <div class="promptpay-qr-frame"><img id="promptPayQR" src="${QR_SRC}" alt="PromptPay QR code" width="574" height="574" decoding="async"></div>
            <div class="promptpay-recipient"><span id="promptPayRecipientLabel"></span><strong>${RECIPIENT_TH}</strong><em>${RECIPIENT_EN}</em></div>
            <p class="promptpay-thanks"><strong id="promptPayThanks1"></strong><span id="promptPayThanks2"></span></p>
            <p class="promptpay-verify" id="promptPayVerify"></p>
            <div class="promptpay-actions">
              <button class="promptpay-save" id="promptPaySave" type="button"></button>
              <p class="promptpay-save-hint" id="promptPaySaveHint"></p>
              <p class="promptpay-status" id="promptPayStatus" role="status" aria-live="polite"></p>
            </div>
          </section>
          <p class="support-sheet__disclaimer" id="promptPayDisclaimer"></p>
          <button class="support-sheet__close" id="promptPayClose" type="button"></button>
        </main>
      </div>`;
    (document.getElementById('app') || document.body).appendChild(root);
    root.querySelector('#promptPayBack').addEventListener('click', close);
    root.querySelector('#promptPayClose').addEventListener('click', close);
    root.querySelector('#promptPayHome').addEventListener('click', closeToHome);
    root.querySelector('#promptPaySave').addEventListener('click', saveQR);
    return root;
  }

  function updateCopy() {
    const cardSub = document.getElementById('promptPaySupportSub');
    const cardButton = promptButton();
    if (cardSub) cardSub.textContent = t('cardSub');
    if (cardButton) { cardButton.textContent = t('cardButton'); cardButton.setAttribute('aria-label', t('cardButton')); }
    if (!root) return;
    root.setAttribute('aria-label', t('aria'));
    root.querySelector('#promptPayBack').setAttribute('aria-label', t('back'));
    root.querySelector('#promptPayHome').setAttribute('aria-label', t('home'));
    root.querySelector('#promptPayEyebrow').textContent = t('eyebrow');
    root.querySelector('#promptPayTitle').textContent = t('title');
    root.querySelector('#promptPayLead').textContent = t('lead');
    root.querySelector('#promptPayRecipientLabel').textContent = t('recipient');
    root.querySelector('#promptPayThanks1').textContent = t('thanks1');
    root.querySelector('#promptPayThanks2').textContent = t('thanks2');
    root.querySelector('#promptPayVerify').textContent = t('verify');
    root.querySelector('#promptPaySave').textContent = t('save');
    root.querySelector('#promptPaySaveHint').textContent = t('saveHint');
    root.querySelector('#promptPayDisclaimer').textContent = t('disclaimer');
    root.querySelector('#promptPayClose').textContent = t('back');
  }

  function open() {
    const sheet = ensureRoot();
    if (!sheet.hidden) return;
    previousFocus = document.activeElement;
    updateCopy();
    const status = sheet.querySelector('#promptPayStatus');
    status.textContent = '';
    setMainInert(true);
    document.body.classList.add('support-sheet-open');
    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add('is-visible'));
    setTimeout(() => sheet.querySelector('#promptPayBack')?.focus({ preventScroll: true }), 30);
  }

  function finishClose() {
    if (!root) return;
    root.hidden = true;
    setMainInert(false);
    document.body.classList.remove('support-sheet-open');
  }

  function close() {
    if (!root || root.hidden) return;
    root.classList.remove('is-visible');
    const focus = previousFocus;
    previousFocus = null;
    setTimeout(() => {
      finishClose();
      if (focus instanceof HTMLElement && document.contains(focus)) focus.focus({ preventScroll: true });
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220);
  }

  function closeToHome() {
    if (!root || root.hidden) return;
    root.classList.remove('is-visible');
    previousFocus = null;
    setTimeout(() => {
      finishClose();
      const homeButton = document.getElementById('homeNavButton');
      homeButton?.click();
      homeButton?.focus({ preventScroll: true });
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220);
  }

  async function saveQR() {
    if (busy || !root) return;
    busy = true;
    const button = root.querySelector('#promptPaySave');
    const status = root.querySelector('#promptPayStatus');
    button.disabled = true;
    button.textContent = t('saving');
    status.textContent = '';
    try {
      const response = await fetch(QR_SRC, { cache: 'force-cache' });
      if (!response.ok) throw new Error(`QR fetch failed: ${response.status}`);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectURL;
      link.download = QR_FILENAME;
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectURL), 30000);
      status.textContent = t('saved');
    } catch (error) {
      console.warn('PromptPay QR save fallback:', error);
      window.open(QR_SRC, '_blank', 'noopener,noreferrer');
      status.textContent = t('saveFallback');
    } finally {
      busy = false;
      button.disabled = false;
      button.textContent = t('save');
    }
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('#promptPaySupportButton');
    if (!button) return;
    event.preventDefault();
    open();
  });

  document.addEventListener('keydown', (event) => {
    if (root && !root.hidden && event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  });

  new MutationObserver((mutations) => {
    if (mutations.some(m => m.attributeName === 'lang')) updateCopy();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  updateCopy();
  window.LGTPromptPaySupport = Object.freeze({ VERSION, open, close });
})();

(() => {
  'use strict';

  const Content = window.LGTLegalContent;
  if (!Content) return;

  const VERSION = 'legal-ui-v1';
  const ACCEPT_VERSION_KEY = 'lgt.legal.acceptedVersion';
  const ACCEPT_AT_KEY = 'lgt.legal.acceptedAt';
  const state = {
    root: null,
    open: false,
    view: 'center',
    docId: Content.defaultDocument || 'copyright',
    previousFocus: null,
    previousMainInert: false,
    consentFlow: false,
    pendingBegin: false
  };

  const lang = () => Content.language(document.documentElement.lang);
  const copy = () => Content.copy(lang());
  const esc = (value='') => String(value).replace(/[&<>'"]/g, (m) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
  }[m]));

  function mainApp() { return document.getElementById('mainApp'); }
  function scrollEl() { return state.root?.querySelector('#legalScroll'); }
  function contentEl() { return state.root?.querySelector('#legalContent'); }
  function hasAcceptedCurrentVersion() {
    try { return localStorage.getItem(ACCEPT_VERSION_KEY) === Content.legalVersion; }
    catch (_) { return false; }
  }

  function recordAcceptance() {
    try {
      localStorage.setItem(ACCEPT_VERSION_KEY, Content.legalVersion);
      localStorage.setItem(ACCEPT_AT_KEY, new Date().toISOString());
    } catch (_) {}
  }

  function createRoot() {
    if (state.root) return state.root;
    const root = document.createElement('section');
    root.id = 'legalScreen';
    root.className = 'legal-screen';
    root.hidden = true;
    root.setAttribute('role', 'region');
    root.setAttribute('aria-labelledby', 'legalScreenTitle');
    root.innerHTML = `
      <header class="legal-topbar">
        <button class="legal-topbar__button" id="legalBack" type="button" aria-label="Back"><span aria-hidden="true">‹</span></button>
        <div class="legal-topbar__brand"><strong>LITTLE GANESHA TAROT</strong><small>THE GOLDEN PATH</small></div>
        <button class="legal-topbar__button" id="legalHome" type="button" aria-label="Home"><span aria-hidden="true">⌂</span></button>
      </header>
      <div class="legal-scroll" id="legalScroll"><main class="legal-content" id="legalContent"></main></div>
    `;
    (document.getElementById('app') || document.body).appendChild(root);
    state.root = root;
    root.querySelector('#legalBack').addEventListener('click', goBack);
    root.querySelector('#legalHome').addEventListener('click', goHome);
    root.addEventListener('click', onClick);
    return root;
  }

  function renderLanguageSwitch() {
    const labels = { en:'EN', th:'ไทย', hi:'हिन्दी' };
    return `<div class="legal-language" role="group" aria-label="Language">
      ${['en','th','hi'].map((id) => `<button type="button" data-legal-language="${id}" class="${lang()===id?'is-active':''}" aria-pressed="${lang()===id}">${labels[id]}</button>`).join('')}
    </div>`;
  }

  function renderCenter() {
    state.view = 'center';
    state.consentFlow = false;
    const c = copy();
    const cards = Content.documentIds.map((id) => {
      const [title, sub, mark] = c.cards[id];
      return `<button class="legal-card" type="button" data-legal-doc="${id}">
        <span class="legal-card__mark" aria-hidden="true">${esc(mark)}</span>
        <span><strong>${esc(title)}</strong><small>${esc(sub)}</small></span>
        <span class="legal-card__arrow" aria-hidden="true">›</span>
      </button>`;
    }).join('');
    const principles = c.principles.map(([,title,sub]) => `
      <article class="legal-principle"><span aria-hidden="true">✦</span><strong>${esc(title)}</strong><small>${esc(sub)}</small></article>
    `).join('');
    contentEl().innerHTML = `
      <section class="legal-hero">
        <span class="legal-eyebrow">${esc(c.centerEyebrow)}</span>
        <h1 id="legalScreenTitle">${esc(c.centerTitle)}</h1>
        <p>${esc(c.centerIntro)}</p>
        ${renderLanguageSwitch()}
      </section>
      <section class="legal-principles" aria-label="${esc(c.centerTitle)}">${principles}</section>
      <section class="legal-cards">${cards}</section>
      <p class="legal-center-note">${esc(c.centerNote)}</p>
      <p class="legal-copyright-line">© 2026 Benedict Interactive · ${lang()==='th'?'สงวนสิทธิ์ตามกฎหมาย':lang()==='hi'?'सर्वाधिकार सुरक्षित।':'All rights reserved.'}</p>
    `;
    updateTopbar();
    scrollEl().scrollTop = 0;
  }

  function renderConsent() {
    state.view = 'consent';
    state.consentFlow = true;
    const c = copy();
    contentEl().innerHTML = `
      <section class="legal-consent">
        <div class="legal-consent__seal" aria-hidden="true">§</div>
        <span class="legal-eyebrow">${esc(c.consentEyebrow)}</span>
        <h1 id="legalScreenTitle">${esc(c.consentTitle)}</h1>
        <p class="legal-consent__body">${esc(c.consentBody)}</p>
        ${renderLanguageSwitch()}
        <div class="legal-consent__links">
          <button type="button" data-consent-doc="terms">${esc(c.consentTerms)}</button>
          <button type="button" data-consent-doc="privacy">${esc(c.consentPrivacy)}</button>
        </div>
        <button class="legal-consent__agree" type="button" data-legal-agree>${esc(c.consentAgree)}</button>
        <button class="legal-consent__later" type="button" data-legal-later>${esc(c.consentLater)}</button>
        <p class="legal-consent__meta">${esc(c.version)} ${esc(Content.legalVersion)} · ${esc(c.effective)} ${esc(Content.effectiveDate)}</p>
      </section>
    `;
    updateTopbar();
    scrollEl().scrollTop = 0;
    setTimeout(() => state.root?.querySelector('[data-legal-agree]')?.focus({preventScroll:true}), 20);
  }

  function renderDocument(id, {fromConsent = state.consentFlow} = {}) {
    if (!Content.documentIds.includes(id)) id = Content.defaultDocument;
    state.view = 'document';
    state.docId = id;
    state.consentFlow = Boolean(fromConsent);
    const c = copy();
    const doc = Content.document(id, lang());
    const sections = doc.sections.map(([heading, paragraphs]) => `
      <section class="legal-section">
        <h2>${esc(heading)}</h2>
        ${paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
      </section>
    `).join('');
    contentEl().innerHTML = `
      <article class="legal-document">
        <header class="legal-document__head">
          <span class="legal-eyebrow">${esc(c.centerEyebrow)}</span>
          <h1 id="legalScreenTitle">${esc(doc.title)}</h1>
          <p>${esc(doc.subtitle)}</p>
          <div class="legal-meta">
            <span>${esc(c.version)} ${esc(Content.legalVersion)}</span>
            <span>${esc(c.effective)} ${esc(Content.effectiveDate)}</span>
            <span>${esc(c.updated)} ${esc(Content.updatedDate)}</span>
          </div>
          ${renderLanguageSwitch()}
        </header>
        <div class="legal-sections">${sections}</div>
        <button class="legal-document__back" type="button" data-legal-doc-back>${esc(state.consentFlow ? c.consentLater : c.backCenter)}</button>
      </article>
    `;
    updateTopbar();
    scrollEl().scrollTop = 0;
  }

  function updateTopbar() {
    if (!state.root) return;
    const c = copy();
    const back = state.root.querySelector('#legalBack');
    const home = state.root.querySelector('#legalHome');
    if (state.view === 'consent' || (state.view === 'document' && state.consentFlow)) {
      back.setAttribute('aria-label', c.consentLater);
      home.hidden = true;
    } else {
      back.setAttribute('aria-label', state.view === 'document' ? c.backCenter : c.backSettings);
      home.setAttribute('aria-label', c.home);
      home.hidden = false;
    }
  }

  function updateSettingsCopy() {
    const c = copy();
    const heading = document.getElementById('legalSettingsHeading');
    const label = document.getElementById('legalCenterLabel');
    const sub = document.getElementById('legalCenterSub');
    const foot = document.getElementById('legalSettingsFoot');
    if (heading) heading.textContent = c.settingsHeading;
    if (label) label.textContent = c.settingsLabel;
    if (sub) sub.textContent = c.settingsSub;
    if (foot) foot.textContent = c.settingsFoot;
  }

  function setMainInert(value) {
    const main = mainApp();
    if (!main) return;
    if (value) {
      state.previousMainInert = Boolean(main.inert);
      main.inert = true;
    } else {
      main.inert = state.previousMainInert;
    }
  }

  function showOverlay() {
    const root = createRoot();
    if (state.open) return root;
    state.previousFocus = document.activeElement;
    setMainInert(true);
    document.body.classList.add('legal-screen-open');
    root.hidden = false;
    state.open = true;
    requestAnimationFrame(() => root.classList.add('is-visible'));
    return root;
  }

  function open(docId = '') {
    showOverlay();
    state.consentFlow = false;
    if (docId) renderDocument(docId, {fromConsent:false}); else renderCenter();
    setTimeout(() => state.root?.querySelector('#legalBack')?.focus({preventScroll:true}), 30);
  }

  function openConsent() {
    showOverlay();
    state.consentFlow = true;
    renderConsent();
  }

  function close({home=false, resumeBegin=false}={}) {
    if (!state.open || !state.root) return;
    const root = state.root;
    root.classList.remove('is-visible');
    const finish = () => {
      root.hidden = true;
      state.open = false;
      state.view = 'center';
      state.consentFlow = false;
      document.body.classList.remove('legal-screen-open');
      setMainInert(false);
      if (resumeBegin) {
        state.pendingBegin = false;
        document.getElementById('beginButton')?.click();
      } else if (home) {
        document.getElementById('homeNavButton')?.click();
      } else if (state.previousFocus instanceof HTMLElement && document.contains(state.previousFocus)) {
        state.previousFocus.focus({preventScroll:true});
      }
      state.previousFocus = null;
    };
    if (document.documentElement.dataset.motion === 'reduced' || matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else setTimeout(finish, 220);
  }

  function agree() {
    recordAcceptance();
    close({resumeBegin:state.pendingBegin});
  }

  function goBack() {
    if (state.view === 'document') {
      if (state.consentFlow) renderConsent();
      else renderCenter();
    } else close();
  }

  function goHome() {
    if (state.consentFlow) close();
    else close({home:true});
  }

  function switchLanguage(target) {
    if (!['en','th','hi'].includes(target) || target === lang()) return;
    const external = [...document.querySelectorAll(`[data-language="${target}"]`)]
      .find((node) => !state.root?.contains(node));
    if (external) external.click();
    else {
      document.documentElement.lang = target;
      try { localStorage.setItem('lgt.language', target); } catch (_) {}
    }
  }

  function onClick(event) {
    const doc = event.target.closest('[data-legal-doc]');
    if (doc) { renderDocument(doc.dataset.legalDoc, {fromConsent:false}); return; }
    const consentDoc = event.target.closest('[data-consent-doc]');
    if (consentDoc) { renderDocument(consentDoc.dataset.consentDoc, {fromConsent:true}); return; }
    if (event.target.closest('[data-legal-doc-back]')) {
      if (state.consentFlow) renderConsent(); else renderCenter();
      return;
    }
    if (event.target.closest('[data-legal-agree]')) { agree(); return; }
    if (event.target.closest('[data-legal-later]')) { close(); return; }
    const languageButton = event.target.closest('[data-legal-language]');
    if (languageButton) switchLanguage(languageButton.dataset.legalLanguage);
  }

  document.getElementById('legalCenterButton')?.addEventListener('click', () => open());

  const beginButton = document.getElementById('beginButton');
  beginButton?.addEventListener('click', (event) => {
    if (hasAcceptedCurrentVersion()) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    state.pendingBegin = true;
    openConsent();
  }, {capture:true});

  document.addEventListener('keydown', (event) => {
    if (!state.open || event.key !== 'Escape') return;
    event.preventDefault();
    goBack();
  });

  const languageObserver = new MutationObserver((mutations) => {
    if (!mutations.some((m) => m.attributeName === 'lang')) return;
    updateSettingsCopy();
    if (!state.open) return;
    if (state.view === 'consent') renderConsent();
    else if (state.view === 'document') renderDocument(state.docId, {fromConsent:state.consentFlow});
    else renderCenter();
  });
  languageObserver.observe(document.documentElement, {attributes:true, attributeFilter:['lang']});

  updateSettingsCopy();
  window.LGTLegalCenter = Object.freeze({
    version:VERSION,
    legalVersion:Content.legalVersion,
    accepted:hasAcceptedCurrentVersion,
    open,
    close
  });
})();
(() => {
  'use strict';

  const VIEWER_ID = 'threeCardViewer';
  const REVEALED_ID = 'threeRevealedCards';
  const SHELL_ID = 'threeReadingView';

  const COPY = {
    en: {
      close: 'Close card view',
      view: (name) => `View ${name} card larger`
    },
    th: {
      close: 'ปิดภาพไพ่',
      view: (name) => `ดูภาพไพ่ ${name} ขนาดใหญ่`
    }
  };

  let previousFocus = null;
  let modal = null;
  let image = null;
  let title = null;
  let subtitle = null;
  let closeButton = null;
  let inertTargets = [];
  let closeTimer = null;

  const language = () => document.documentElement.lang === 'th' ? 'th' : 'en';
  const text = (key, ...args) => {
    const value = COPY[language()][key] || COPY.en[key];
    return typeof value === 'function' ? value(...args) : value;
  };

  function setInert(target, value) {
    if (!target) return;
    if ('inert' in target) target.inert = value;
    if (value) target.setAttribute('aria-hidden', 'true');
    else target.removeAttribute('aria-hidden');
  }

  function createViewer() {
    if (modal) return modal;

    const shell = document.getElementById(SHELL_ID);
    if (!shell) return null;

    modal = document.createElement('div');
    modal.id = VIEWER_ID;
    modal.className = 'three-card-viewer';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'threeCardViewerTitle');
    modal.innerHTML = `
      <div class="three-card-viewer__panel" role="document">
        <button class="three-card-viewer__close" type="button" aria-label="Close card view">
          <span aria-hidden="true">×</span>
        </button>
        <div class="three-card-viewer__frame">
          <img class="three-card-viewer__image" alt="" decoding="async">
        </div>
        <div class="three-card-viewer__caption">
          <strong id="threeCardViewerTitle"></strong>
          <small></small>
        </div>
      </div>`;

    shell.appendChild(modal);
    image = modal.querySelector('.three-card-viewer__image');
    title = modal.querySelector('#threeCardViewerTitle');
    subtitle = modal.querySelector('.three-card-viewer__caption small');
    closeButton = modal.querySelector('.three-card-viewer__close');

    closeButton.addEventListener('click', closeViewer);
    modal.addEventListener('pointerdown', (event) => {
      if (event.target === modal) closeViewer();
    });

    return modal;
  }

  function getCardMeta(art) {
    const figure = art.closest('.three-result-card');
    const img = art.querySelector('img');
    const name = figure?.querySelector('figcaption strong')?.textContent?.trim() || '';
    const english = figure?.querySelector('figcaption small')?.textContent?.trim() || '';
    return { figure, img, name, english };
  }

  function enhanceArt(art) {
    if (!(art instanceof HTMLElement) || art.dataset.viewerReady === 'true') return;
    const { img, name } = getCardMeta(art);
    if (!img || !name) return;

    art.dataset.viewerReady = 'true';
    art.classList.add('three-result-card__art--interactive');
    art.setAttribute('role', 'button');
    art.setAttribute('tabindex', '0');
    art.setAttribute('aria-haspopup', 'dialog');
    art.setAttribute('aria-label', text('view', name));

    const cue = document.createElement('span');
    cue.className = 'three-result-card__zoom-cue';
    cue.setAttribute('aria-hidden', 'true');
    art.appendChild(cue);
  }

  function enhanceCards() {
    document.querySelectorAll(`#${REVEALED_ID} .three-result-card__art`).forEach(enhanceArt);
  }

  function updateAccessibleLabels() {
    document.querySelectorAll(`#${REVEALED_ID} .three-result-card__art--interactive`).forEach((art) => {
      const { name } = getCardMeta(art);
      if (name) art.setAttribute('aria-label', text('view', name));
    });
    if (closeButton) closeButton.setAttribute('aria-label', text('close'));
  }

  function openViewer(art) {
    const viewer = createViewer();
    if (!viewer || !viewer.hidden) return;

    const { img, name, english } = getCardMeta(art);
    if (!img || !name) return;

    if (closeTimer) { window.clearTimeout(closeTimer); closeTimer = null; }
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : art;
    image.src = img.currentSrc || img.src;
    image.alt = img.alt || name;
    title.textContent = name;
    subtitle.textContent = language() === 'th' && english ? english : '';
    subtitle.hidden = !subtitle.textContent;
    closeButton.setAttribute('aria-label', text('close'));

    const shell = document.getElementById(SHELL_ID);
    inertTargets = [
      shell?.querySelector('.reading-header'),
      document.getElementById('threeScroll'),
      document.getElementById('miniPlayer')
    ].filter(Boolean);
    inertTargets.forEach((target) => setInert(target, true));

    viewer.hidden = false;
    document.body.classList.add('is-three-card-viewer-open');
    requestAnimationFrame(() => viewer.classList.add('is-open'));
    closeButton.focus({ preventScroll: true });
  }

  function closeViewer() {
    if (!modal || modal.hidden) return;

    modal.classList.remove('is-open');
    document.body.classList.remove('is-three-card-viewer-open');
    inertTargets.forEach((target) => setInert(target, false));
    inertTargets = [];

    const finish = () => {
      if (!modal) return;
      modal.hidden = true;
      image.removeAttribute('src');
      title.textContent = '';
      subtitle.textContent = '';
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus({ preventScroll: true });
      previousFocus = null;
    };

    if (document.documentElement.dataset.motion === 'reduced' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else closeTimer = window.setTimeout(() => { closeTimer = null; finish(); }, 180);
  }

  function focusableInViewer() {
    if (!modal || modal.hidden) return [];
    return [...modal.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')]
      .filter((node) => !node.hidden && node.getClientRects().length > 0);
  }

  document.addEventListener('click', (event) => {
    const art = event.target.closest?.(`#${REVEALED_ID} .three-result-card__art--interactive`);
    if (art) openViewer(art);
  });

  document.addEventListener('keydown', (event) => {
    if (modal && !modal.hidden) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeViewer();
        return;
      }
      if (event.key === 'Tab') {
        const focusable = focusableInViewer();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      return;
    }

    const art = event.target.closest?.(`#${REVEALED_ID} .three-result-card__art--interactive`);
    if (art && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openViewer(art);
    }
  }, true);

  const observer = new MutationObserver(() => enhanceCards());
  const boot = () => {
    const revealed = document.getElementById(REVEALED_ID);
    if (revealed) {
      observer.observe(revealed, { childList: true, subtree: true });
      enhanceCards();
      createViewer();
      updateAccessibleLabels();
      return true;
    }
    return false;
  };

  if (!boot()) {
    const appObserver = new MutationObserver(() => {
      if (boot()) appObserver.disconnect();
    });
    appObserver.observe(document.getElementById('app') || document.body, { childList: true, subtree: true });
  }

  new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.attributeName === 'lang')) updateAccessibleLabels();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  window.LGTThreeCardViewer = Object.freeze({ close: closeViewer });
})();

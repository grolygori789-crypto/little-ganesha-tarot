(() => {
  'use strict';

  const VERSION = 'lucky-ui-v1.1';
  const Content = window.LGTLuckyContent;
  const Storage = window.LGTLuckyStorage;
  const MachineAPI = window.LGTLuckyMachine;
  const Exporter = window.LGTLuckyExport;
  const SFXAPI = window.LGTLuckySFX;
  if (!Content || !Storage || !MachineAPI || !Exporter || !SFXAPI) return;

  const state = {
    root: null,
    machine: null,
    sfx: new SFXAPI.LuckySFX(),
    open: false,
    busy: false,
    countdownTimer: null,
    midnightDate: Storage.localDateISO(),
    record: null,
    phase: 'idle'
  };

  const el = (id) => state.root?.querySelector(`#${id}`) || null;
  const lang = () => Content.normalizeLanguage(document.documentElement.lang);
  const copy = () => Content.copy(lang());

  function currentReducedMotion() {
    const preference = localStorage.getItem('lgt.motion') || 'system';
    if (preference === 'reduced') return true;
    if (preference === 'full') return false;
    return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  }

  function createRoot() {
    const root = document.createElement('section');
    root.id = 'luckyScreen';
    root.className = 'lucky-screen';
    root.hidden = true;
    root.setAttribute('aria-labelledby', 'luckyTitle');
    root.innerHTML = `
      <div class="lucky-screen__ambient" aria-hidden="true"><span></span><span></span><span></span></div>
      <header class="lucky-topbar">
        <button class="lucky-back" id="luckyBack" type="button" aria-label="Back"><span aria-hidden="true">‹</span></button>
        <div class="lucky-brand" aria-label="Little Ganesha Tarot">
          <span>LITTLE GANESHA TAROT</span>
          <small>THE GOLDEN PATH</small>
        </div>
        <div class="lucky-topbar__spacer" aria-hidden="true"></div>
      </header>

      <div class="lucky-scroll">
        <section class="lucky-intro">
          <span class="lucky-eyebrow" id="luckyEyebrow"></span>
          <h2 id="luckyTitle"></h2>
          <p id="luckyIntro"></p>
        </section>

        <section class="lucky-oracle" aria-label="Lucky number oracle machine">
          <div class="lucky-oracle__halo" aria-hidden="true"></div>
          <canvas class="lucky-machine" id="luckyMachine" role="img" aria-label="A brass and crystal oracle machine with numbered orbs"></canvas>
          <div class="lucky-oracle__status" aria-live="polite">
            <span class="lucky-oracle__status-dot" aria-hidden="true"></span>
            <span id="luckyMachineStatus"></span>
          </div>
        </section>

        <div class="lucky-primary-action">
          <button class="lucky-spin" id="luckySpin" type="button">
            <span class="lucky-spin__ornament" aria-hidden="true">✦</span>
            <span id="luckySpinText"></span>
            <span class="lucky-spin__ornament" aria-hidden="true">✦</span>
          </button>
          <p class="lucky-lock-note" id="luckyLockNote"></p>
          <button class="lucky-home" id="luckyHome" type="button"><span aria-hidden="true">⌂</span><span id="luckyHomeText"></span></button>
        </div>

        <section class="lucky-result" id="luckyResult" hidden aria-labelledby="luckyPatternTitle">
          <div class="lucky-result__head">
            <span class="lucky-result__eyebrow" id="luckyResultEyebrow"></span>
            <div class="lucky-result__countdown" id="luckyCountdown" aria-live="off"></div>
          </div>
          <div class="lucky-number-grid" id="luckyNumberGrid"></div>
          <article class="lucky-pattern-card">
            <span class="lucky-pattern-card__mark" aria-hidden="true">✦</span>
            <h3 id="luckyPatternTitle"></h3>
            <p id="luckyPattern"></p>
          </article>
          <article class="lucky-number-set-card" aria-labelledby="luckyNumberSetTitle">
            <h3 id="luckyNumberSetTitle"></h3>
            <div class="lucky-number-set" id="luckyNumberSet"></div>
            <p id="luckyNumberSetHint"></p>
          </article>
          <div class="lucky-export-actions">
            <button class="lucky-secondary" id="luckySave" type="button"><span aria-hidden="true">⇩</span><span id="luckySaveText"></span></button>
            <button class="lucky-secondary lucky-secondary--gold" id="luckyShare" type="button"><span aria-hidden="true">↗</span><span id="luckyShareText"></span></button>
          </div>
          <button class="lucky-replay" id="luckyReplay" type="button"><span aria-hidden="true">↻</span><span id="luckyReplayText"></span></button>
          <button class="lucky-result-home" id="luckyResultHome" type="button"><span aria-hidden="true">⌂</span><span id="luckyResultHomeText"></span></button>
        </section>

        <footer class="lucky-footnote">
          <span aria-hidden="true">✦</span>
          <p id="luckyDisclaimer"></p>
        </footer>
      </div>
      <p class="sr-only" id="luckyLive" aria-live="assertive"></p>
      <div class="lucky-toast" id="luckyToast" hidden role="status" aria-live="polite"></div>
    `;
    (document.getElementById('app') || document.body).appendChild(root);
    state.root = root;
    state.machine = new MachineAPI.LuckyOracleMachine(el('luckyMachine'));

    el('luckyBack').addEventListener('click', close);
    el('luckyHome').addEventListener('click', close);
    el('luckyResultHome').addEventListener('click', close);
    el('luckySpin').addEventListener('click', () => runReveal({ replay: false }));
    el('luckyReplay').addEventListener('click', () => runReveal({ replay: true }));
    el('luckySave').addEventListener('click', () => exportAction('save'));
    el('luckyShare').addEventListener('click', () => exportAction('share'));

    return root;
  }

  function setText(id, value) {
    const node = el(id);
    if (node) node.textContent = value;
  }

  function applyLanguage() {
    if (!state.root) return;
    const c = copy();
    const language = lang();
    state.root.dataset.language = language;
    setText('luckyEyebrow', c.eyebrow);
    setText('luckyTitle', c.title);
    setText('luckyIntro', c.intro);
    setText('luckyLockNote', c.dailyLock);
    setText('luckyResultEyebrow', c.resultEyebrow);
    setText('luckyPatternTitle', c.patternTitle);
    setText('luckySaveText', c.save);
    setText('luckyShareText', c.share);
    setText('luckyReplayText', c.replay);
    setText('luckyHomeText', c.home);
    setText('luckyResultHomeText', c.home);
    setText('luckyNumberSetTitle', c.numberSetTitle);
    setText('luckyNumberSetHint', c.numberSetHint);
    setText('luckyDisclaimer', c.disclaimer);
    el('luckyBack')?.setAttribute('aria-label', c.back);
    state.root.querySelector('.lucky-oracle')?.setAttribute('aria-label', c.oracleAria);
    el('luckyMachine')?.setAttribute('aria-label', c.machineAria);
    setMachineCopy();
    if (state.record?.completed) renderResult(state.record);
    updateCountdown();
  }

  function setMachineCopy() {
    const c = copy();
    const spin = el('luckySpin');
    if (!spin) return;
    if (state.busy) {
      setText('luckySpinText', state.phase === 'reveal' ? c.revealing : c.spinning);
      setText('luckyMachineStatus', state.phase === 'reveal' ? c.revealing : c.spinning);
      return;
    }
    const record = Storage.getToday();
    setText('luckySpinText', record && !record.completed ? c.continue : c.spin);
    setText('luckyMachineStatus', record?.completed ? c.resultEyebrow : c.eyebrow);
  }

  function renderResult(record) {
    if (!record?.numbers?.length) return;
    state.record = record;
    const language = lang();
    const roles = Content.roles(language);
    const grid = el('luckyNumberGrid');
    grid.replaceChildren();
    record.numbers.forEach((number, index) => {
      const info = Content.number(number, language);
      const card = document.createElement('article');
      card.className = 'lucky-number-card';
      const body = index === 0 ? info.core : index === 1 ? info.support : info.balance;
      card.innerHTML = `
        <div class="lucky-number-card__orb" aria-hidden="true"><span>${number}</span></div>
        <div class="lucky-number-card__copy">
          <small>${roles[index]}</small>
          <strong>${info.keyword}</strong>
          <p></p>
        </div>`;
      card.querySelector('p').textContent = body;
      grid.appendChild(card);
    });
    setText('luckyPattern', Content.pattern(record.numbers, language));
    const numberSet = el('luckyNumberSet');
    if (numberSet) {
      numberSet.replaceChildren();
      Content.numberSet(record.numbers).forEach((value) => {
        const chip = document.createElement('span');
        chip.className = 'lucky-number-set__chip';
        chip.textContent = value;
        numberSet.appendChild(chip);
      });
    }
    el('luckyResult').hidden = false;
    el('luckySpin').hidden = true;
    el('luckyLockNote').hidden = false;
    updateCountdown();
  }

  function hideResult() {
    if (!state.root) return;
    el('luckyResult').hidden = true;
    el('luckySpin').hidden = false;
    el('luckyLockNote').hidden = false;
  }

  function updateCountdown() {
    if (!state.root) return;
    const countdown = el('luckyCountdown');
    if (!countdown) return;
    const record = Storage.getToday();
    if (!record?.completed) {
      countdown.textContent = '';
      return;
    }
    const c = copy();
    countdown.textContent = `${c.countdownLead} ${Storage.formatCountdown(Storage.msUntilNextDay())}`;
  }

  function announce(text) {
    setText('luckyLive', text);
  }

  function toast(text) {
    const node = el('luckyToast');
    if (!node || !text) return;
    node.textContent = text;
    node.hidden = false;
    requestAnimationFrame(() => node.classList.add('is-visible'));
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      node.classList.remove('is-visible');
      setTimeout(() => { node.hidden = true; }, 230);
    }, 2600);
  }

  function setBusy(busy, phase = 'idle') {
    state.busy = Boolean(busy);
    state.phase = phase;
    const spin = el('luckySpin');
    if (spin) {
      spin.disabled = state.busy;
      spin.setAttribute('aria-busy', String(state.busy));
      spin.classList.toggle('is-turning', state.busy);
    }
    el('luckyBack').disabled = false;
    el('luckyHome').disabled = false;
    el('luckyResultHome').disabled = false;
    setMachineCopy();
  }

  async function runReveal({ replay }) {
    if (!state.open || state.busy) return;
    let record = Storage.getToday();
    if (!record) record = Storage.createToday();
    state.record = record;
    hideResult();
    if (replay) {
      requestAnimationFrame(() => state.root?.querySelector('.lucky-oracle')?.scrollIntoView({ behavior: currentReducedMotion() ? 'auto' : 'smooth', block: 'start' }));
    }
    setBusy(true, 'spin');
    await state.sfx.spin();
    const roles = Content.roles(lang());

    state.machine.play(record.numbers, {
      reducedMotion: currentReducedMotion(),
      onPhase(phase) {
        state.phase = phase;
        setMachineCopy();
      },
      onReveal(index, number) {
        state.sfx.reveal(index);
        announce(copy().numberRevealed(roles[index], number));
      },
      onComplete() {
        state.sfx.complete();
        const completed = replay && record.completed ? record : (Storage.markCompleted() || { ...record, completed: true });
        state.record = completed;
        setBusy(false, 'result');
        renderResult(completed);
        announce(copy().completed);
        requestAnimationFrame(() => el('luckyResult')?.scrollIntoView({ behavior: currentReducedMotion() ? 'auto' : 'smooth', block: 'start' }));
      }
    });
  }

  async function exportAction(action) {
    const record = Storage.getToday();
    if (!record?.completed || state.busy) return;
    const button = action === 'save' ? el('luckySave') : el('luckyShare');
    button.disabled = true;
    try {
      await Exporter.execute(action, record, lang(), (message) => toast(message));
    } catch (error) {
      console.error('[Lucky Numbers export]', error);
      toast(lang() === 'th' ? 'ยังสร้างภาพไม่ได้ในขณะนี้' : lang() === 'hi' ? 'अभी इमेज तैयार नहीं हो सकी।' : 'The image could not be created right now.');
    } finally {
      button.disabled = false;
    }
  }

  function refreshForDay() {
    const today = Storage.localDateISO();
    if (today === state.midnightDate) {
      updateCountdown();
      return;
    }
    state.midnightDate = today;
    state.record = Storage.getToday();
    state.machine.cancel();
    state.machine.resetBalls();
    hideResult();
    setBusy(false, 'idle');
    if (state.record?.completed) {
      state.machine.showResult(state.record.numbers);
      renderResult(state.record);
    }
  }

  function open() {
    if (!state.root) createRoot();
    if (state.open) return;
    state.open = true;
    state.midnightDate = Storage.localDateISO();
    state.root.hidden = false;
    document.body.classList.add('lucky-mode-open');
    state.machine.setActive(true);
    requestAnimationFrame(() => {
      state.root.classList.add('is-visible');
      state.machine.resize();
    });
    state.record = Storage.getToday();
    applyLanguage();
    if (state.record?.completed) {
      state.machine.showResult(state.record.numbers);
      renderResult(state.record);
    } else {
      state.machine.cancel();
      state.machine.resetBalls();
      hideResult();
      setBusy(false, 'idle');
    }
    clearInterval(state.countdownTimer);
    state.countdownTimer = setInterval(refreshForDay, 1000);
    setTimeout(() => el('luckyBack')?.focus({ preventScroll: true }), 80);
  }

  function close() {
    if (!state.root || !state.open) return;
    state.open = false;
    state.machine.cancel();
    state.machine.setActive(false);
    state.sfx.stopTimers();
    state.root.classList.remove('is-visible');
    document.body.classList.remove('lucky-mode-open');
    clearInterval(state.countdownTimer);
    state.countdownTimer = null;
    setTimeout(() => {
      if (!state.open) state.root.hidden = true;
    }, 260);
    document.querySelector('[data-feature="lucky"]')?.focus?.({ preventScroll: true });
  }

  // Capture is intentional: app.js owns the generic "coming soon" bubble listener.
  // Lucky Numbers becomes real without changing the protected navigation paths for other Explore items.
  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('[data-feature="lucky"]');
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open();
  }, true);

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.open) {
      event.preventDefault();
      close();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) state.sfx.suspend();
    else if (state.open) refreshForDay();
  });

  new MutationObserver((mutations) => {
    if (!mutations.some((mutation) => mutation.attributeName === 'lang')) return;
    if (state.open) applyLanguage();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  window.LGTLuckyUI = Object.freeze({
    version: VERSION,
    open,
    close,
    isOpen: () => state.open,
    renderToday: () => {
      const record = Storage.getToday();
      if (record?.completed) {
        state.machine?.showResult(record.numbers);
        renderResult(record);
      }
    }
  });
})();

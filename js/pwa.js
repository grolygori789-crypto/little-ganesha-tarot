(() => {
  'use strict';

  // V0.16.0-HF1 is a pre-launch stabilization layer.
  // It deliberately wraps only the affected contracts and leaves the
  // protected Reading Engine / Deck Ritual / reading narratives untouched.
  const HOTFIX_VERSION = 'v0.16.0-hf1';
  const RUNTIME_BUILD = '0.16.0';
  const activeFocus = { three: null, golden: null, obstacle: null };
  let baseAskStorage = null;

  function clone(value) {
    try { return structuredClone(value); }
    catch (_) { return value == null ? value : JSON.parse(JSON.stringify(value)); }
  }

  function installSlot(name, transform) {
    let current = window[name];
    Object.defineProperty(window, name, {
      configurable: true,
      enumerable: true,
      get() { return current; },
      set(next) { current = transform(next, current); }
    });
    if (current !== undefined) current = transform(current, undefined);
  }

  // app.js and support.js currently write older build markers.  Keep one
  // authoritative live value without rewriting the stable app shell.
  installSlot('LGT_BUILD', () => RUNTIME_BUILD);


  // AUDIO PLAYLIST V1 — expand the runtime playlist from 2 to 5 tracks
  // without replacing the already-passed LittleGaneshaAudio engine.
  const AUDIO_PLAYLIST_VERSION = 'audio-playlist-v1';
  const AUDIO_PLAYLIST_EXTENSION = Object.freeze([
    Object.freeze({
      id: 'bamboo-in-the-rain',
      title: 'Bamboo in the Rain',
      src: 'assets/audio/bamboo-in-the-rain.mp3'
    }),
    Object.freeze({
      id: 'path-of-still-water',
      title: 'Path of Still Water',
      src: 'assets/audio/path-of-still-water.mp3'
    }),
    Object.freeze({
      id: 'breath-of-the-morning',
      title: 'Breath of the Morning',
      src: 'assets/audio/breath-of-the-morning.mp3'
    })
  ]);

  installSlot('LGTAudio', (next) => {
    if (!next || next.__playlistVersion === AUDIO_PLAYLIST_VERSION) return next;
    if (!Array.isArray(next.tracks)) return next;

    for (const track of AUDIO_PLAYLIST_EXTENSION) {
      if (!next.tracks.some((item) => item?.id === track.id)) {
        next.tracks.push({ ...track });
      }
    }

    // audio.js V0.16.0 constructs with the original 2-track array and clamps
    // the persisted index during construction. Restore a valid saved index
    // after the extension is attached, before the first user-initiated play.
    const savedIndex = Number.parseInt(localStorage.getItem('lgt.track') || '0', 10);
    if (Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < next.tracks.length) {
      next.currentIndex = savedIndex;
    }

    try {
      Object.defineProperty(next, '__playlistVersion', {
        value: AUDIO_PLAYLIST_VERSION,
        configurable: true
      });
    } catch (_) {}

    return next;
  });

  function isHindiAnalysis(analysis) {
    return String(analysis?.version || '').includes('hi') ||
      /[\u0900-\u097F]/u.test(String(analysis?.text || ''));
  }

  function namedSubjectHash(analysis) {
    const marker = String(analysis?.text || '').match(/\bhn([a-z0-9]+)\b/i);
    return marker ? marker[1] : '';
  }

  function isDirectional(type) {
    return ['degree', 'evaluation', 'outlook', 'probability', 'verification'].includes(type);
  }

  function semanticCue(analysis) {
    const facet = String(analysis?.facet || '');
    const text = String(analysis?.text || '');
    if (['wealth', 'financial_growth'].includes(facet)) return 'become wealthy';
    if (facet === 'how_others_see_me') return 'how do other people see me';
    if (facet === 'divine_protection') return 'spiritual protection';
    if (['feelings', 'romantic_attraction'].includes(facet)) return 'does my partner like me';
    if (facet === 'new_job') return 'new job';
    if (facet === 'burnout') return 'burnout';
    if (facet === 'project' && (isDirectional(analysis?.questionType) || /(?:सफल|कामयाब|success|succeed)/iu.test(text))) {
      return 'will this project succeed';
    }
    return text;
  }

  function legacyHindiSemantic(semantic) {
    if (!semantic || typeof semantic.family !== 'string') return false;
    const family = semantic.family;
    if (/^(?:work|self|inner|choice|outlook):/.test(family)) return true;
    if ([
      'money:investment', 'love:reconciliation', 'love:marriage',
      'love:relationship-future', 'spiritual:unseen-influence',
      'love:relationship-general', 'work:general', 'money:general',
      'inner:general', 'self:general', 'spiritual:general',
      'choice:general', 'outlook:general'
    ].includes(family)) return true;

    const domain = semantic.domain || '';
    if (
      ['money_resources','work_purpose','self_image','inner_growth','spiritual_unseen','choice_action'].includes(domain) &&
      ['self','job','situation'].includes(semantic.target || '')
    ) return true;
    if (
      ['money_resources','work_purpose','self_image','inner_growth','spiritual_unseen','choice_action'].includes(domain) &&
      semantic.perspective === 'self_view'
    ) return true;
    if (
      (['self_image','social_perception','inner_growth'].includes(domain) ||
        family === 'spiritual:protection' || family === 'love:romantic-interest') &&
      semantic.timeframe === 'unspecified'
    ) return true;
    return false;
  }

  function wrapAskStorage(current, base) {
    if (!current || current.__hotfix === HOTFIX_VERSION) return current;
    const key = current.key || base?.key || 'lgt.reading.ask.v1';
    const engine = window.LGTReadingEngine;

    function descriptor(analysis) {
      if (!analysis) return null;
      if (!isHindiAnalysis(analysis)) return base.descriptor(analysis);

      const subjectHash = namedSubjectHash(analysis);
      const prepared = {
        ...analysis,
        text: semanticCue(analysis)
      };

      if (subjectHash) {
        prepared.text = 'does my partner like me';
        prepared.target = 'partner';
      }

      const canonical = base.descriptor(prepared);
      if (!canonical) return null;
      return subjectHash
        ? Object.freeze({ ...canonical, target: 'named-other', subjectHash })
        : canonical;
    }

    function descriptorsMatch(a, b) {
      if (!a || !b) return false;
      return a.family === b.family &&
        a.domain === b.domain &&
        a.typeFamily === b.typeFamily &&
        a.target === b.target &&
        (a.subjectHash || '') === (b.subjectHash || '') &&
        a.perspective === b.perspective &&
        a.timeframe === b.timeframe &&
        Boolean(a.conditional) === Boolean(b.conditional) &&
        Boolean(a.comparison) === Boolean(b.comparison);
    }

    function readStore(localDate = engine?.localDateISO?.()) {
      try {
        const parsed = JSON.parse(localStorage.getItem(key) || 'null');
        if (!parsed || parsed.localDate !== localDate || typeof parsed.readings !== 'object' || !parsed.readings) return null;
        return parsed;
      } catch (_) {
        return null;
      }
    }

    function canonicalFromRecord(record) {
      if (!record) return null;
      if (record.semantic && !legacyHindiSemantic(record.semantic)) return record.semantic;

      const snap = record.analysisSnapshot || {};
      const legacySubject = record.semantic?.subjectHash || '';
      const questionType = snap.questionType || record.questionType || 'open';
      const facet = snap.facet || record.facet || 'general';
      const analysis = {
        version: 'question-analyzer-hi-v1',
        domain: snap.domain || record.contextKey || 'general',
        facet,
        facetDomain: snap.facetDomain || record.facetDomain || null,
        questionType,
        target: snap.target || record.target || 'situation',
        perspective: snap.perspective || record.perspective || 'general',
        timeframe: snap.timeframe || record.timeframe || 'unspecified',
        conditional: snap.conditional ?? record.conditional,
        comparison: snap.comparison ?? record.comparison,
        text: legacySubject
          ? `does hn${legacySubject} like me`
          : (facet === 'project' && isDirectional(questionType) ? 'will this project succeed' : '')
      };
      return descriptor(analysis);
    }

    function findSemantic(analysis, options = {}) {
      if (!isHindiAnalysis(analysis)) return current.findSemantic(analysis, options);
      const localDate = options.localDate || engine?.localDateISO?.();
      const excludeFingerprint = options.excludeFingerprint || '';
      const target = descriptor(analysis);
      if (!target) return null;
      const store = readStore(localDate);
      if (!store) return null;

      let best = null;
      for (const [fingerprint, record] of Object.entries(store.readings)) {
        if (fingerprint === excludeFingerprint) continue;
        if (!record || record.orientation !== 'upright') continue;
        if (!window.LGTReadingContent?.getCard?.(record.cardId)) continue;
        if (!descriptorsMatch(target, canonicalFromRecord(record))) continue;
        if (!best || String(record.createdAt || '') > String(best.createdAt || '')) {
          best = { ...record, matchType: 'semantic', matchedFingerprint: fingerprint };
        }
      }
      return best;
    }

    function rewriteSemantic(fingerprint, semantic, localDate = engine?.localDateISO?.()) {
      if (!fingerprint || !semantic) return;
      try {
        const store = readStore(localDate);
        const record = store?.readings?.[fingerprint];
        if (!record) return;
        record.semantic = semantic;
        localStorage.setItem(key, JSON.stringify(store));
      } catch (_) {}
    }

    function save(options = {}) {
      const ok = current.save(options);
      if (ok && isHindiAnalysis(options.analysis)) {
        rewriteSemantic(
          options.fingerprint,
          descriptor(options.analysis),
          options.localDate || engine?.localDateISO?.()
        );
      }
      return ok;
    }

    return Object.freeze({
      ...current,
      version: `${current.version || 'ask-storage'}+hf1`,
      descriptor,
      findSemantic,
      save,
      __hotfix: HOTFIX_VERSION
    });
  }

  installSlot('LGTAskStorage', (next) => {
    if (!next) return next;
    if (!baseAskStorage) {
      baseAskStorage = next;
      return next;
    }
    return wrapAskStorage(next, baseAskStorage);
  });

  function wrapLuckyContent(base) {
    if (!base || base.__hotfix === HOTFIX_VERSION) return base;

    function numberSet(numbers) {
      if (!Array.isArray(numbers) || numbers.length !== 3) return [];
      const values = numbers.map(Number);
      if (values.some((number) => !Number.isInteger(number) || number < 0 || number > 9)) return [];

      const firstNonZero = values.findIndex((number) => number !== 0);
      const rotated = firstNonZero > 0
        ? [...values.slice(firstNonZero), ...values.slice(0, firstNonZero)]
        : values;

      const forms = [
        ...values.map(String),
        `${values[0]}${values[1]}`,
        `${values[1]}${values[2]}`,
        rotated.join('')
      ];
      return [...new Set(forms)];
    }

    return Object.freeze({
      ...base,
      version: `${base.version || 'lucky-content'}+hf1`,
      numberSet,
      __hotfix: HOTFIX_VERSION
    });
  }

  installSlot('LGTLuckyContent', (next) => wrapLuckyContent(next));

  window.addEventListener('lgt:reading:interaction', (event) => {
    const detail = event?.detail || {};
    const mode = detail.spreadId;
    if (!Object.prototype.hasOwnProperty.call(activeFocus, mode)) return;
    if (detail.focusId) activeFocus[mode] = detail.focusId;
    else if (detail.type === 'reading-open') activeFocus[mode] = null;
  }, true);

  function completedISO(value) {
    if (typeof value === 'number' && Number.isFinite(value)) return new Date(value).toISOString();
    if (value) {
      const date = new Date(value);
      if (!Number.isNaN(date.getTime())) return date.toISOString();
    }
    return new Date().toISOString();
  }

  function wrapJournalStorage(base) {
    if (!base || base.__hotfix === HOTFIX_VERSION) return base;

    async function correctAsk(entry) {
      const cardId = String(entry?.cards?.[0]?.cardId || '');
      const question = String(document.getElementById('askResultQuestion')?.textContent || '').trim();
      const fingerprintFn = window.LGTQuestionGuard?.fingerprint;
      if (!cardId || !question || typeof fingerprintFn !== 'function') return entry;

      try {
        const fingerprint = await fingerprintFn(question);
        const key = window.LGTAskStorage?.key || 'lgt.reading.ask.v1';
        const box = JSON.parse(localStorage.getItem(key) || 'null');
        const record = box?.readings?.[fingerprint];
        if (!record || String(record.cardId) !== cardId) return entry;

        const date = String(box.localDate || entry.localDate || '');
        return {
          ...entry,
          id: `ask:${date}:${fingerprint}`,
          sourceKey: `ask:${date}:${fingerprint}`,
          localDate: date,
          createdAt: record.createdAt || entry.createdAt
        };
      } catch (_) {
        return entry;
      }
    }

    function focusStorage(mode) {
      if (mode === 'three') return window.LGTThreeStorage;
      if (mode === 'golden') return window.LGTGoldenStorage;
      if (mode === 'obstacle') return window.LGTObstacleStorage;
      return null;
    }

    function cardsMatch(entryCards, recordCards) {
      const a = (entryCards || []).map((x) => String(x.cardId));
      const b = (recordCards || []).map((x) => String(x.cardId));
      return a.length === 3 && b.length === 3 && a.every((id, index) => id === b[index]);
    }

    function correctFocus(entry, lang, snapshot) {
      const mode = entry?.mode;
      if (!Object.prototype.hasOwnProperty.call(activeFocus, mode)) return { entry, snapshot };
      const focusId = activeFocus[mode];
      if (!focusId) return { entry, snapshot };

      const storage = focusStorage(mode);
      const record = storage?.getAll?.()?.[focusId];
      if (!record || !cardsMatch(entry.cards, record.cards)) return { entry, snapshot };

      const date = String(record.localDate || entry.localDate || '');
      const fixedEntry = {
        ...entry,
        id: `${mode}:${date}:${focusId}`,
        sourceKey: `${mode}:${date}:${focusId}`,
        localDate: date,
        focusId,
        createdAt: record.createdAt || entry.createdAt,
        completedAt: completedISO(record.completedAt || entry.completedAt),
        cards: record.cards
      };

      const fixedSnapshot = clone(snapshot) || {};
      const label = window.LGTJournalContent?.copy?.(lang)?.focus?.[focusId];
      if (label) fixedSnapshot.subtitle = label;
      return { entry: fixedEntry, snapshot: fixedSnapshot };
    }

    async function saveSnapshot(baseEntry, lang, snapshot) {
      let entry = { ...baseEntry };
      let fixedSnapshot = clone(snapshot);

      if (entry.mode === 'ask') entry = await correctAsk(entry);
      if (['three', 'golden', 'obstacle'].includes(entry.mode)) {
        const fixed = correctFocus(entry, lang, fixedSnapshot);
        entry = fixed.entry;
        fixedSnapshot = fixed.snapshot;
      }

      return base.saveSnapshot(entry, lang, fixedSnapshot);
    }

    return Object.freeze({
      ...base,
      version: `${base.version || 'journal-storage'}+hf1`,
      saveSnapshot,
      __hotfix: HOTFIX_VERSION
    });
  }

  installSlot('LGTJournalStorage', (next) => wrapJournalStorage(next));

  const KOFI_THIRD_PARTY = Object.freeze({
    en: ['4. Ko-fi', [
      'Ko-fi is the active worldwide voluntary-support destination used by Little Ganesha Tarot. Opening Ko-fi is user-initiated and takes the user to an external service operated under Ko-fi’s own terms and privacy practices. Ko-fi and its marks/services belong to their respective owner; Benedict Interactive does not operate Ko-fi’s payment platform.'
    ]],
    th: ['4. Ko-fi', [
      'Ko-fi เป็นช่องทางสนับสนุนโดยสมัครใจสำหรับผู้ใช้ทั่วโลกที่เปิดใช้งานอยู่ใน Little Ganesha Tarot การเปิด Ko-fi เกิดจากการกดของผู้ใช้และพาออกไปยังบริการภายนอกซึ่งอยู่ภายใต้ข้อกำหนดและนโยบายความเป็นส่วนตัวของ Ko-fi ชื่อ เครื่องหมาย และบริการของ Ko-fi เป็นของเจ้าของที่เกี่ยวข้อง และ Benedict Interactive ไม่ได้เป็นผู้ดำเนินการระบบชำระเงินของ Ko-fi'
    ]],
    hi: ['4. Ko-fi', [
      'Ko-fi Little Ganesha Tarot में सक्रिय worldwide voluntary-support destination है। Ko-fi खोलना user-initiated है और उपयोगकर्ता को external service पर ले जाता है, जहाँ Ko-fi की अपनी terms और privacy practices लागू होती हैं। Ko-fi और उसके marks/services अपने संबंधित owner के हैं; Benedict Interactive Ko-fi के payment platform को operate नहीं करता।'
    ]]
  });

  function wrapLegalContent(base) {
    if (!base || base.__hotfix === HOTFIX_VERSION) return base;

    function documentFor(id, language) {
      const doc = clone(base.document(id, language));
      if (id !== 'thirdParty' || !doc?.sections) return doc;
      const lang = base.language(language);
      const replacement = KOFI_THIRD_PARTY[lang] || KOFI_THIRD_PARTY.en;
      const index = doc.sections.findIndex((section) => /^4\./.test(String(section?.[0] || '')));
      if (index >= 0) doc.sections[index] = clone(replacement);
      return doc;
    }

    return Object.freeze({
      ...base,
      version: `${base.version || 'legal-content'}+hf1`,
      updatedDate: '2026-08-24',
      document: documentFor,
      __hotfix: HOTFIX_VERSION
    });
  }

  installSlot('LGTLegalContent', (next) => wrapLegalContent(next));

  function currentDateISO() {
    if (window.LGTReadingEngine?.localDateISO) return window.LGTReadingEngine.localDateISO();
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function uniqueAskCount() {
    try {
      const key = window.LGTAskStorage?.key || 'lgt.reading.ask.v1';
      const box = JSON.parse(localStorage.getItem(key) || 'null');
      if (!box || box.localDate !== currentDateISO() || typeof box.readings !== 'object') return 0;
      const ids = new Set();
      for (const [fingerprint, record] of Object.entries(box.readings)) {
        ids.add(String(record?.sessionId || '').trim() || fingerprint);
      }
      return ids.size;
    } catch (_) {
      return 0;
    }
  }

  let hubRepairQueued = false;
  function repairReadHub() {
    hubRepairQueued = false;
    const root = document.getElementById('readHubScreen');
    if (!root || root.hidden) return;
    const detail = root.querySelector('[data-read-mode-card="ask"] .read-mode-status-detail');
    if (!detail) return;

    const count = uniqueAskCount();
    if (!count) return;

    const lang = ['en','th','hi'].includes(document.documentElement.lang)
      ? document.documentElement.lang
      : 'en';
    const value = lang === 'th'
      ? `วันนี้เก็บคำถามไว้ ${count} เรื่อง`
      : lang === 'hi'
        ? `आज ${count} सवाल सहेजे गए`
        : `${count} question${count === 1 ? '' : 's'} kept today`;

    if (detail.textContent !== value) detail.textContent = value;
  }

  function queueHubRepair() {
    if (hubRepairQueued) return;
    hubRepairQueued = true;
    queueMicrotask(repairReadHub);
  }

  const hubObserver = new MutationObserver(queueHubRepair);
  hubObserver.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['lang', 'hidden']
  });
  window.addEventListener('lgt:reading:interaction', queueHubRepair);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) queueHubRepair();
  });

  // Repair the static fallback before app.js applies the selected language.
  const languageFallback = document.querySelector('[data-copy="languageSub"]');
  if (languageFallback && languageFallback.textContent.trim() === 'Choose English or Thai') {
    languageFallback.textContent = 'Choose English, Thai, or Hindi';
  }

  window.LGTHotfix = Object.freeze({
    version: HOTFIX_VERSION,
    runtimeBuild: RUNTIME_BUILD,
    scope: Object.freeze([
      'ask-semantic-canonicalization',
      'journal-source-identity',
      'lucky-number-set-order',
      'read-hub-ask-count',
      'legal-kofi-attribution',
      'build-marker-coherence',
      'audio-playlist-5'
    ])
  });

  // Original PWA registration contract, preserved.
  const state = {
    supported: 'serviceWorker' in navigator,
    registered: false,
    installPromptAvailable: false,
    installed: window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true,
    registration: null,
    error: null
  };

  function publish(type = 'statechange') {
    window.dispatchEvent(new CustomEvent(`lgt:pwa:${type}`, { detail: { ...state } }));
  }

  window.addEventListener('beforeinstallprompt', () => {
    state.installPromptAvailable = true;
    publish('installable');
  });

  window.addEventListener('appinstalled', () => {
    state.installed = true;
    state.installPromptAvailable = false;
    publish('installed');
  });

  async function register() {
    if (!state.supported) {
      publish('unsupported');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register('./sw.js', {
        scope: './',
        updateViaCache: 'none'
      });
      state.registration = registration;
      state.registered = true;
      state.error = null;
      registration.update().catch(() => {});
      publish('registered');
      return registration;
    } catch (error) {
      state.error = error instanceof Error ? error.message : String(error);
      publish('error');
      return null;
    }
  }

  window.LGTPWA = {
    getState: () => ({ ...state }),
    register
  };

  window.addEventListener('load', register, { once: true });
})();
(() => {
  'use strict';

  const CONTENT = window.LGTReadingContent;
  if (!CONTENT || !Array.isArray(CONTENT.cards) || CONTENT.cards.length !== 78) {
    throw new Error('Reading Engine requires the canonical 78-card content model.');
  }

  const SCHEMA_VERSION = 1;
  const DAILY_STORAGE_KEY = 'lgt.reading.daily.v1';
  const ORIENTATION_UPRIGHT = 'upright';
  const LEGACY_CONTENT_VERSIONS = new Set(['daily-guidance-v1', 'daily-guidance-v2']);

  const SPREADS = Object.freeze({
    daily: Object.freeze({
      id: 'daily',
      cardCount: 1,
      positions: Object.freeze([
        Object.freeze({ id: 'today', label: Object.freeze({ en: 'Today', th: 'วันนี้' }) })
      ]),
      interpretationContext: 'daily-guidance',
      questionInput: false,
      orientationPolicy: 'upright-only'
    }),
    ask: Object.freeze({
      id: 'ask',
      cardCount: 1,
      positions: Object.freeze([
        Object.freeze({ id: 'answer', label: Object.freeze({ en: 'Reflection', th: 'สิ่งที่ไพ่สะท้อน' }) })
      ]),
      interpretationContext: 'question-reflection',
      questionInput: true,
      orientationPolicy: 'upright-only'
    }),
    three: Object.freeze({
      id: 'three',
      cardCount: 3,
      positions: Object.freeze([
        Object.freeze({ id: 'past', label: Object.freeze({ en: 'Past', th: 'อดีต' }) }),
        Object.freeze({ id: 'present', label: Object.freeze({ en: 'Present', th: 'ปัจจุบัน' }) }),
        Object.freeze({ id: 'next', label: Object.freeze({ en: 'What Unfolds Next', th: 'สิ่งที่กำลังเกิดขึ้นต่อจากนี้' }) })
      ]),
      interpretationContext: 'three-card',
      questionInput: false,
      orientationPolicy: 'upright-only'
    }),
    golden: Object.freeze({
      id: 'golden',
      cardCount: 3,
      positions: Object.freeze([
        Object.freeze({ id: 'where-you-stand', label: Object.freeze({ en: 'Where You Stand', th: 'จุดที่คุณอยู่ตอนนี้' }) }),
        Object.freeze({ id: 'what-blocks', label: Object.freeze({ en: 'What Blocks the Path', th: 'สิ่งที่ขวางทาง' }) }),
        Object.freeze({ id: 'way-forward', label: Object.freeze({ en: 'The Way Forward', th: 'หนทางข้างหน้า' }) })
      ]),
      interpretationContext: 'golden-path',
      questionInput: false,
      orientationPolicy: 'upright-only'
    }),
    obstacle: Object.freeze({
      id: 'obstacle',
      cardCount: 3,
      positions: Object.freeze([
        Object.freeze({ id: 'obstacle', label: Object.freeze({ en: 'The Obstacle', th: 'อุปสรรค' }) }),
        Object.freeze({ id: 'feeds-it', label: Object.freeze({ en: 'What Feeds It', th: 'สิ่งที่ทำให้อุปสรรคนี้ยังอยู่' }) }),
        Object.freeze({ id: 'releases-it', label: Object.freeze({ en: 'What Releases It', th: 'สิ่งที่ช่วยคลายอุปสรรค' }) })
      ]),
      interpretationContext: 'remove-obstacle',
      questionInput: false,
      orientationPolicy: 'upright-only'
    })
  });

  const TRANSITIONS = Object.freeze({
    idle: new Set(['preparing', 'selected']),
    preparing: new Set(['shuffling']),
    shuffling: new Set(['choosing']),
    choosing: new Set(['selected']),
    selected: new Set(['revealing']),
    revealing: new Set(['revealed']),
    revealed: new Set(['interpreted']),
    interpreted: new Set(['completed']),
    completed: new Set([])
  });

  function localDateISO(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function randomUint32() {
    if (globalThis.crypto?.getRandomValues) {
      const values = new Uint32Array(1);
      globalThis.crypto.getRandomValues(values);
      return values[0];
    }
    // Compatibility fallback only. Modern target browsers use Web Crypto.
    return Math.floor(Math.random() * 0x100000000);
  }

  function secureRandomInt(maxExclusive) {
    if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) throw new RangeError('maxExclusive must be a positive integer.');
    if (maxExclusive === 1) return 0;

    const range = 0x100000000;
    const limit = range - (range % maxExclusive);
    let value;
    do {
      value = randomUint32();
    } while (value >= limit);
    return value % maxExclusive;
  }

  function secureShuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = secureRandomInt(i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function createSessionId() {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
    const bytes = new Uint8Array(16);
    if (globalThis.crypto?.getRandomValues) {
      globalThis.crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < bytes.length; i += 1) bytes[i] = secureRandomInt(256);
    }
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map((value) => value.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  }

  function safeReadDaily() {
    try {
      const raw = localStorage.getItem(DAILY_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const contentVersionValid = parsed?.contentVersion === CONTENT.version || LEGACY_CONTENT_VERSIONS.has(parsed?.contentVersion);
      if (
        parsed?.schemaVersion !== SCHEMA_VERSION ||
        !contentVersionValid ||
        parsed?.spreadId !== 'daily' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(parsed?.localDate || '') ||
        !Array.isArray(parsed?.cards) ||
        parsed.cards.length !== 1 ||
        parsed.cards[0]?.orientation !== ORIENTATION_UPRIGHT ||
        !CONTENT.getCard(parsed.cards[0]?.cardId)
      ) {
        localStorage.removeItem(DAILY_STORAGE_KEY);
        return null;
      }
      if (parsed.contentVersion !== CONTENT.version) {
        parsed.contentVersion = CONTENT.version;
        safeWriteDaily(parsed);
      }
      return parsed;
    } catch (_) {
      try { localStorage.removeItem(DAILY_STORAGE_KEY); } catch (_) {}
      return null;
    }
  }

  function safeWriteDaily(record) {
    try {
      localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(record));
      return true;
    } catch (_) {
      return false;
    }
  }

  class ReadingSession extends EventTarget {
    constructor(spread) {
      super();
      this.spread = spread;
      this.state = 'idle';
      this.sessionId = createSessionId();
      this.candidates = [];
      this.selection = [];
      this.persisted = false;
    }

    transition(nextState, detail = {}) {
      const allowed = TRANSITIONS[this.state];
      if (!allowed?.has(nextState)) {
        throw new Error(`Invalid reading transition: ${this.state} → ${nextState}`);
      }
      const previous = this.state;
      this.state = nextState;
      this.dispatchEvent(new CustomEvent('statechange', {
        detail: { previous, state: nextState, ...detail }
      }));
      return this.state;
    }

    prepareChoice(candidateCount = 5) {
      if (this.state !== 'idle') throw new Error('Choice preparation can begin only from idle.');
      const count = Math.max(this.spread.cardCount, Math.min(CONTENT.cards.length, Number(candidateCount) || this.spread.cardCount));
      this.transition('preparing');
      const ids = CONTENT.cards.map((card) => card.id);
      this.candidates = secureShuffle(ids).slice(0, count);
      this.transition('shuffling');
      return [...this.candidates];
    }

    markChoosing() {
      return this.transition('choosing');
    }

    selectCandidate(index) {
      if (this.state !== 'choosing') throw new Error('A card can be selected only while choosing.');
      if (!Number.isInteger(index) || index < 0 || index >= this.candidates.length) throw new RangeError('Invalid candidate index.');
      const cardId = this.candidates[index];
      this.selection = [{
        positionId: this.spread.positions[0].id,
        cardId,
        orientation: ORIENTATION_UPRIGHT
      }];
      this.transition('selected', { cardId });
      return CONTENT.getCard(cardId);
    }


    selectCandidates(indices) {
      if (this.state !== 'choosing') throw new Error('Cards can be selected only while choosing.');
      if (!Array.isArray(indices) || indices.length !== this.spread.cardCount) {
        throw new RangeError(`This spread requires exactly ${this.spread.cardCount} selected cards.`);
      }
      const unique = new Set(indices);
      if (unique.size !== indices.length) throw new Error('A reading cannot use the same choice twice.');
      indices.forEach((index) => {
        if (!Number.isInteger(index) || index < 0 || index >= this.candidates.length) throw new RangeError('Invalid candidate index.');
      });
      this.selection = indices.map((index, positionIndex) => ({
        positionId: this.spread.positions[positionIndex].id,
        cardId: this.candidates[index],
        orientation: ORIENTATION_UPRIGHT
      }));
      this.transition('selected', { cardIds: this.selection.map((entry) => entry.cardId) });
      return this.getSelectedCards().map((entry) => entry.card);
    }

    restoreSelection(record) {
      if (this.state !== 'idle') throw new Error('A reading can be restored only from idle.');
      this.sessionId = record.sessionId || createSessionId();
      this.selection = record.cards.map((card) => ({ ...card }));
      this.persisted = true;
      this.transition('selected', { restored: true, cardId: this.selection[0].cardId });
      return CONTENT.getCard(this.selection[0].cardId);
    }

    beginReveal() { return this.transition('revealing'); }
    markRevealed() { return this.transition('revealed'); }
    markInterpreted() { return this.transition('interpreted'); }
    complete() { return this.transition('completed'); }

    getSelectedCards() {
      return this.selection.map((entry) => ({
        ...entry,
        card: CONTENT.getCard(entry.cardId)
      }));
    }

    toRecord(localDate = localDateISO()) {
      return {
        schemaVersion: SCHEMA_VERSION,
        contentVersion: CONTENT.version,
        sessionId: this.sessionId,
        spreadId: this.spread.id,
        localDate,
        createdAt: new Date().toISOString(),
        cards: this.selection.map((card) => ({ ...card }))
      };
    }
  }

  class ReadingEngine {
    constructor() {
      this.content = CONTENT;
      this.spreads = SPREADS;
    }

    getSpread(spreadId) {
      return SPREADS[spreadId] || null;
    }

    createSession(spreadId) {
      const spread = this.getSpread(spreadId);
      if (!spread) throw new Error(`Unknown spread: ${spreadId}`);
      return new ReadingSession(spread);
    }

    drawUnique(count, excludedIds = []) {
      const excluded = new Set(excludedIds.map(String));
      const pool = CONTENT.cards.map((card) => card.id).filter((id) => !excluded.has(id));
      if (!Number.isInteger(count) || count < 1 || count > pool.length) throw new RangeError('Invalid draw count.');
      return secureShuffle(pool).slice(0, count);
    }

    getTodayRecord(date = new Date()) {
      const record = safeReadDaily();
      return record?.localDate === localDateISO(date) ? record : null;
    }

    saveTodaySelection(session, date = new Date()) {
      if (!(session instanceof ReadingSession) || session.spread.id !== 'daily' || session.state !== 'selected') {
        throw new Error('Only a selected Daily Guidance session can be persisted.');
      }
      const record = session.toRecord(localDateISO(date));
      session.persisted = safeWriteDaily(record);
      return { record, persisted: session.persisted };
    }

    createOrRestoreDaily(date = new Date()) {
      const session = this.createSession('daily');
      const record = this.getTodayRecord(date);
      if (record) {
        const card = session.restoreSelection(record);
        return { session, record, card, restored: true };
      }
      return { session, record: null, card: null, restored: false };
    }

    localDateISO(date = new Date()) { return localDateISO(date); }
    secureRandomInt(maxExclusive) { return secureRandomInt(maxExclusive); }
  }

  window.LGTReadingEngine = new ReadingEngine();
  window.LGTReadingEngineVersion = '1.1.0';
})();

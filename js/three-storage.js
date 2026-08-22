(() => {
  'use strict';

  const ENGINE = window.LGTReadingEngine;
  const CONTENT = window.LGTReadingContent;
  if (!ENGINE || !CONTENT) throw new Error('Three-card storage requires Reading Engine and tarot content.');

  const STORAGE_KEY = 'lgt.reading.three.v1';
  const SCHEMA_VERSION = 1;
  const ORIENTATION = 'upright';

  function validRecord(record, localDate = ENGINE.localDateISO()) {
    return Boolean(
      record &&
      record.schemaVersion === SCHEMA_VERSION &&
      record.contentVersion === CONTENT.version &&
      record.spreadId === 'three' &&
      record.localDate === localDate &&
      Array.isArray(record.cards) &&
      record.cards.length === 3 &&
      record.cards.every((entry) => entry?.orientation === ORIENTATION && CONTENT.getCard(entry.cardId)) &&
      new Set(record.cards.map((entry) => entry.cardId)).size === 3
    );
  }

  function get(localDate = ENGINE.localDateISO()) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!validRecord(parsed, localDate)) return null;
      return { ...parsed, cards: parsed.cards.map((card) => ({ ...card })) };
    } catch (_) {
      return null;
    }
  }

  function save(session, localDate = ENGINE.localDateISO()) {
    if (!session || session.spread?.id !== 'three' || session.state !== 'interpreted') return false;
    try {
      const record = session.toRecord(localDate);
      record.completedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      return true;
    } catch (_) {
      return false;
    }
  }

  function clearExpired(localDate = ENGINE.localDateISO()) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.localDate !== localDate) localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
    }
  }

  window.LGTThreeStorage = Object.freeze({
    key: STORAGE_KEY,
    schemaVersion: SCHEMA_VERSION,
    get,
    save,
    clearExpired
  });
})();

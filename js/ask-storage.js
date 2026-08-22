(() => {
  'use strict';

  const CONTENT = window.LGTReadingContent;
  const ENGINE = window.LGTReadingEngine;
  const ASK_CONTENT = window.LGTAskContent;
  if (!CONTENT || !ENGINE || !ASK_CONTENT) throw new Error('Ask storage requires reading content, engine, and Ask content.');

  const STORAGE_KEY = 'lgt.reading.ask.v1';
  const SCHEMA_VERSION = 1;
  const ORIENTATION = 'upright';
  const MAX_ENTRIES_PER_DAY = 60;

  function emptyStore(localDate) {
    return {
      schemaVersion: SCHEMA_VERSION,
      localDate,
      cardContentVersion: CONTENT.version,
      askContentVersion: ASK_CONTENT.version,
      readings: {}
    };
  }

  function read(localDate = ENGINE.localDateISO()) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyStore(localDate);
      const parsed = JSON.parse(raw);
      if (
        parsed?.schemaVersion !== SCHEMA_VERSION ||
        parsed?.localDate !== localDate ||
        typeof parsed?.readings !== 'object' ||
        !parsed.readings
      ) return emptyStore(localDate);
      return parsed;
    } catch (_) {
      return emptyStore(localDate);
    }
  }

  function get(fingerprint, localDate = ENGINE.localDateISO()) {
    if (!fingerprint) return null;
    const record = read(localDate).readings[fingerprint];
    if (!record || record.orientation !== ORIENTATION || !CONTENT.getCard(record.cardId)) return null;
    return { ...record };
  }

  function trim(readings) {
    const entries = Object.entries(readings);
    if (entries.length <= MAX_ENTRIES_PER_DAY) return readings;
    entries.sort((a, b) => String(a[1]?.createdAt || '').localeCompare(String(b[1]?.createdAt || '')));
    return Object.fromEntries(entries.slice(entries.length - MAX_ENTRIES_PER_DAY));
  }

  function save({ fingerprint, cardId, sessionId = '', localDate = ENGINE.localDateISO() }) {
    const card = CONTENT.getCard(cardId);
    if (!fingerprint || !card) return false;
    try {
      const store = read(localDate);
      store.schemaVersion = SCHEMA_VERSION;
      store.localDate = localDate;
      store.cardContentVersion = CONTENT.version;
      store.askContentVersion = ASK_CONTENT.version;
      store.readings[fingerprint] = {
        cardId: card.id,
        orientation: ORIENTATION,
        sessionId,
        createdAt: new Date().toISOString()
      };
      store.readings = trim(store.readings);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      return true;
    } catch (_) {
      return false;
    }
  }

  window.LGTAskStorage = Object.freeze({
    key: STORAGE_KEY,
    schemaVersion: SCHEMA_VERSION,
    maxEntriesPerDay: MAX_ENTRIES_PER_DAY,
    get,
    save
  });
})();

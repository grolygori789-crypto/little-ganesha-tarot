(() => {
  'use strict';

  const VERSION = 'journal-storage-v1';
  const DB_NAME = 'little-ganesha-journal';
  const DB_VERSION = 1;
  const STORE = 'entries';
  const SETTINGS = Object.freeze({
    autoSave: 'lgt.journal.autoSave',
    saveAskQuestion: 'lgt.journal.saveAskQuestion',
    seenPrivacy: 'lgt.journal.seenPrivacy',
    suppressed: 'lgt.journal.suppressed.v1'
  });
  let dbPromise = null;

  function settingBool(key, fallback) {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return raw === 'on';
  }
  function setSettingBool(key, value) { localStorage.setItem(key, value ? 'on' : 'off'); }

  function suppressedIds() {
    try {
      const parsed = JSON.parse(localStorage.getItem(SETTINGS.suppressed) || '[]');
      return new Set(Array.isArray(parsed) ? parsed.map(String).slice(-1000) : []);
    } catch (_) { return new Set(); }
  }
  function writeSuppressed(set) {
    try { localStorage.setItem(SETTINGS.suppressed, JSON.stringify([...set].slice(-1000))); } catch (_) {}
  }
  function suppress(ids) {
    const set = suppressedIds();
    (Array.isArray(ids) ? ids : [ids]).filter(Boolean).forEach((id) => set.add(String(id)));
    writeSuppressed(set);
  }
  function isSuppressed(id) { return id ? suppressedIds().has(String(id)) : false; }

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        const store = db.objectStoreNames.contains(STORE)
          ? req.transaction.objectStore(STORE)
          : db.createObjectStore(STORE, { keyPath: 'id' });
        if (!store.indexNames.contains('completedAt')) store.createIndex('completedAt', 'completedAt');
        if (!store.indexNames.contains('localDate')) store.createIndex('localDate', 'localDate');
        if (!store.indexNames.contains('mode')) store.createIndex('mode', 'mode');
        if (!store.indexNames.contains('bookmarked')) store.createIndex('bookmarked', 'bookmarked');
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error('Journal database could not be opened.'));
      req.onblocked = () => reject(new Error('Journal database upgrade is blocked.'));
    });
    return dbPromise;
  }

  async function withStore(mode, work) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const store = tx.objectStore(STORE);
      let value;
      try { value = work(store, tx); } catch (error) { reject(error); return; }
      tx.oncomplete = () => resolve(value?.result ?? value);
      tx.onerror = () => reject(tx.error || new Error('Journal database transaction failed.'));
      tx.onabort = () => reject(tx.error || new Error('Journal database transaction was aborted.'));
    });
  }

  function clone(value) {
    try { return structuredClone(value); } catch (_) { return JSON.parse(JSON.stringify(value)); }
  }

  async function get(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(id);
      req.onsuccess = () => resolve(req.result ? clone(req.result) : null);
      req.onerror = () => reject(req.error);
    });
  }

  async function getAll() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => {
        const rows = (req.result || []).map(clone);
        rows.sort((a, b) => String(b.completedAt || '').localeCompare(String(a.completedAt || '')));
        resolve(rows);
      };
      req.onerror = () => reject(req.error);
    });
  }

  function sanitizeEntry(input) {
    const now = new Date().toISOString();
    return {
      schemaVersion: 1,
      id: String(input.id),
      sourceKey: String(input.sourceKey || input.id),
      mode: String(input.mode || 'daily'),
      localDate: String(input.localDate || ''),
      completedAt: String(input.completedAt || now),
      createdAt: String(input.createdAt || input.completedAt || now),
      updatedAt: now,
      focusId: input.focusId || null,
      savedLanguage: String(input.savedLanguage || 'en'),
      cards: Array.isArray(input.cards) ? input.cards.map((x) => ({ cardId: String(x.cardId || x.id || '').padStart(2, '0'), positionId: x.positionId || null })) : [],
      numbers: Array.isArray(input.numbers) ? input.numbers.map(Number).filter(Number.isFinite) : [],
      question: typeof input.question === 'string' ? input.question : '',
      snapshots: input.snapshots && typeof input.snapshots === 'object' ? clone(input.snapshots) : {},
      reflection: typeof input.reflection === 'string' ? input.reflection : '',
      bookmarked: Boolean(input.bookmarked)
    };
  }

  async function upsert(input) {
    if (!input?.id) throw new Error('Journal entry requires an id.');
    const existing = await get(input.id);
    const incoming = sanitizeEntry(input);
    const merged = existing ? {
      ...existing,
      ...incoming,
      createdAt: existing.createdAt || incoming.createdAt,
      completedAt: existing.completedAt || incoming.completedAt,
      reflection: existing.reflection || '',
      bookmarked: Boolean(existing.bookmarked),
      question: incoming.question || existing.question || '',
      snapshots: { ...(existing.snapshots || {}), ...(incoming.snapshots || {}) },
      updatedAt: new Date().toISOString()
    } : incoming;
    await withStore('readwrite', (store) => store.put(merged));
    window.dispatchEvent(new CustomEvent('lgt:journal:changed', { detail: { type: existing ? 'update' : 'create', id: merged.id } }));
    return clone(merged);
  }

  async function saveSnapshot(baseEntry, lang, snapshot) {
    if (isSuppressed(baseEntry?.id)) return null;
    const existing = await get(baseEntry.id);
    const snapshots = { ...(existing?.snapshots || {}), [lang]: clone(snapshot) };
    return upsert({ ...baseEntry, snapshots });
  }

  async function updateReflection(id, reflection) {
    const entry = await get(id); if (!entry) return null;
    entry.reflection = String(reflection || '').slice(0, 8000);
    entry.updatedAt = new Date().toISOString();
    await withStore('readwrite', (store) => store.put(entry));
    window.dispatchEvent(new CustomEvent('lgt:journal:changed', { detail: { type: 'reflection', id } }));
    return clone(entry);
  }

  async function toggleBookmark(id, force) {
    const entry = await get(id); if (!entry) return null;
    entry.bookmarked = typeof force === 'boolean' ? force : !entry.bookmarked;
    entry.updatedAt = new Date().toISOString();
    await withStore('readwrite', (store) => store.put(entry));
    window.dispatchEvent(new CustomEvent('lgt:journal:changed', { detail: { type: 'bookmark', id } }));
    return clone(entry);
  }

  async function remove(id) {
    suppress(id);
    await withStore('readwrite', (store) => store.delete(id));
    window.dispatchEvent(new CustomEvent('lgt:journal:changed', { detail: { type: 'delete', ids: [id] } }));
  }

  async function removeMany(ids) {
    const unique = [...new Set((ids || []).map(String))];
    if (!unique.length) return;
    suppress(unique);
    await withStore('readwrite', (store) => { unique.forEach((id) => store.delete(id)); });
    window.dispatchEvent(new CustomEvent('lgt:journal:changed', { detail: { type: 'delete', ids: unique } }));
  }

  async function clearAll() {
    const rows = await getAll();
    suppress(rows.slice().reverse().map((entry) => entry.id));
    await withStore('readwrite', (store) => store.clear());
    window.dispatchEvent(new CustomEvent('lgt:journal:changed', { detail: { type: 'clear' } }));
  }

  const settings = Object.freeze({
    autoSave: () => settingBool(SETTINGS.autoSave, true),
    setAutoSave: (value) => setSettingBool(SETTINGS.autoSave, Boolean(value)),
    saveAskQuestion: () => settingBool(SETTINGS.saveAskQuestion, false),
    setSaveAskQuestion: (value) => setSettingBool(SETTINGS.saveAskQuestion, Boolean(value)),
    seenPrivacy: () => settingBool(SETTINGS.seenPrivacy, false),
    setSeenPrivacy: (value) => setSettingBool(SETTINGS.seenPrivacy, Boolean(value))
  });

  window.LGTJournalStorage = Object.freeze({
    version: VERSION,
    dbName: DB_NAME,
    openDB,
    get,
    getAll,
    upsert,
    saveSnapshot,
    updateReflection,
    toggleBookmark,
    remove,
    removeMany,
    clearAll,
    isSuppressed,
    settings
  });
})();

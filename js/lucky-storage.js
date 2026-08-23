(() => {
  'use strict';

  const VERSION = 'lucky-storage-v1';
  const KEY = 'lgt.lucky.v1';
  const SCHEMA = 1;

  function localDateISO(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function validNumbers(numbers) {
    return Array.isArray(numbers)
      && numbers.length === 3
      && new Set(numbers).size === 3
      && numbers.every((number) => Number.isInteger(number) && number >= 1 && number <= 9);
  }

  function normalizeRecord(value) {
    if (!value || value.schema !== SCHEMA || typeof value.date !== 'string' || !validNumbers(value.numbers)) return null;
    return {
      schema: SCHEMA,
      date: value.date,
      numbers: value.numbers.map(Number),
      createdAt: Number(value.createdAt) || Date.now(),
      completed: Boolean(value.completed),
      completedAt: value.completedAt ? Number(value.completedAt) : null
    };
  }

  function read() {
    try {
      return normalizeRecord(JSON.parse(localStorage.getItem(KEY) || 'null'));
    } catch (_) {
      return null;
    }
  }

  function write(record) {
    localStorage.setItem(KEY, JSON.stringify(record));
    return normalizeRecord(record);
  }

  function randomInt(maxExclusive) {
    if (globalThis.crypto?.getRandomValues) {
      // Rejection sampling keeps the tiny modulo bias out of daily selection.
      const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
      const box = new Uint32Array(1);
      do { globalThis.crypto.getRandomValues(box); } while (box[0] >= limit);
      return box[0] % maxExclusive;
    }
    return Math.floor(Math.random() * maxExclusive);
  }

  function generateNumbers() {
    const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const out = [];
    while (out.length < 3) {
      const index = randomInt(pool.length);
      out.push(pool.splice(index, 1)[0]);
    }
    return out;
  }

  function getToday() {
    const record = read();
    return record?.date === localDateISO() ? record : null;
  }

  function createToday() {
    const existing = getToday();
    if (existing) return existing;
    const record = {
      schema: SCHEMA,
      date: localDateISO(),
      numbers: generateNumbers(),
      createdAt: Date.now(),
      completed: false,
      completedAt: null
    };
    return write(record);
  }

  function markCompleted() {
    const record = getToday();
    if (!record) return null;
    if (record.completed) return record;
    return write({ ...record, completed: true, completedAt: Date.now() });
  }

  function msUntilNextDay(now = new Date()) {
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    return Math.max(0, next.getTime() - now.getTime());
  }

  function formatCountdown(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  window.LGTLuckyStorage = Object.freeze({
    version: VERSION,
    key: KEY,
    localDateISO,
    getToday,
    createToday,
    markCompleted,
    generateNumbers,
    msUntilNextDay,
    formatCountdown
  });
})();

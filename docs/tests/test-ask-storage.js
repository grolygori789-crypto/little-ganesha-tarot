'use strict';

const fs = require('fs');
const vm = require('vm');
const assert = (condition, message) => { if (!condition) throw new Error(message); };

global.window = globalThis;
class StorageMock {
  constructor() { this.map = new Map(); }
  getItem(key) { return this.map.has(key) ? this.map.get(key) : null; }
  setItem(key, value) { this.map.set(String(key), String(value)); }
  removeItem(key) { this.map.delete(String(key)); }
  clear() { this.map.clear(); }
}
global.localStorage = new StorageMock();

function load(path) { vm.runInThisContext(fs.readFileSync(path, 'utf8'), { filename: path }); }
load('js/reading-content.js');
load('js/reading-engine.js');
load('js/ask-content.js');
load('js/ask-storage.js');

const store = globalThis.LGTAskStorage;
assert(store && store.schemaVersion === 1, 'Ask storage did not initialize.');
const date = '2026-08-22';
const fp = 'fingerprint-a';
assert(store.get(fp, date) === null, 'Unknown question should not restore.');
assert(store.save({ fingerprint: fp, cardId: '09', sessionId: 'session-a', localDate: date }) === true, 'Ask record did not save.');
const restored = store.get(fp, date);
assert(restored?.cardId === '09' && restored.orientation === 'upright', 'Same-day Ask record did not restore the same card.');
assert(store.get(fp, '2026-08-23') === null, 'Ask record must not carry into a new local day.');

const raw = localStorage.getItem(store.key);
assert(raw && !raw.includes('Should I') && !raw.includes('ฉันควร'), 'Ask storage must not persist raw question text.');

for (let i = 0; i < 70; i += 1) {
  store.save({ fingerprint: `fp-${i}`, cardId: String(i % 78).padStart(2,'0'), sessionId: `s-${i}`, localDate: date });
}
const parsed = JSON.parse(localStorage.getItem(store.key));
assert(Object.keys(parsed.readings).length <= store.maxEntriesPerDay, 'Ask store daily cap failed.');
assert(parsed.localDate === date, 'Ask store local date mismatch.');
assert(parsed.askContentVersion === 'ask-ganesha-v1', 'Ask store content version missing.');
assert(parsed.cardContentVersion === globalThis.LGTReadingContent.version, 'Card content version missing from Ask store.');

console.log('Ask Ganesha same-question persistence tests: PASS');

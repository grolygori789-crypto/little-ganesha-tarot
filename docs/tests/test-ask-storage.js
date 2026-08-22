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
load('js/question-analyzer.js');
load('js/ask-context.js');
load('js/ask-storage.js');

const store = globalThis.LGTAskStorage;
const analyzer = globalThis.LGTQuestionAnalyzer;
assert(store && store.schemaVersion === 1, 'Ask storage did not initialize.');
const date = '2026-08-22';
const fp = 'fingerprint-a';
assert(store.get(fp, date) === null, 'Unknown question should not restore.');
const analysis = analyzer.analyze('ผมหน้าตาดีแค่ไหนในสายตาชาวโลก');
assert(store.save({ fingerprint: fp, cardId: '69', sessionId: 'session-a', analysis, localDate: date }) === true, 'Ask record did not save.');
const restored = store.get(fp, date);
assert(restored?.cardId === '69' && restored.orientation === 'upright', 'Same-day Ask record did not restore the same card.');
assert(restored.contextKey === 'self_image' && restored.facet === 'appearance' && restored.questionType === 'degree', 'Resolved context metadata did not persist.');
assert(restored.target === 'public' && restored.perspective === 'public_view' && restored.metric === 'appearance_quality', 'Semantic target/perspective/metric metadata did not persist.');
assert(restored.polarity === 'open', 'Semantic polarity metadata did not persist.');
assert(store.get(fp, '2026-08-23') === null, 'Ask record must not carry into a new local day.');

const raw = localStorage.getItem(store.key);
assert(raw && !raw.includes('หน้าตาดีแค่ไหน') && !raw.includes('Should I'), 'Ask storage must not persist raw question text.');
assert(raw.includes('ask-context-v2'), 'Ask context version missing from store.');

// A V0.4.4 record without context metadata must remain readable.
localStorage.setItem(store.key, JSON.stringify({
  schemaVersion: 1,
  localDate: date,
  cardContentVersion: globalThis.LGTReadingContent.version,
  askContentVersion: 'ask-ganesha-v1',
  readings: {
    legacy: { cardId: '09', orientation: 'upright', sessionId: 'legacy-session', createdAt: '2026-08-22T00:00:00.000Z' }
  }
}));
const legacy = store.get('legacy', date);
assert(legacy?.cardId === '09' && legacy.contextKey == null, 'V0.4.4 context-less record migration compatibility failed.');
assert(store.save({ fingerprint: 'legacy', cardId: '09', sessionId: 'legacy-session', analysis: analyzer.analyze('ฉันควรทำอะไรต่อ'), localDate: date }) === true, 'Legacy record enrichment failed.');
assert(store.get('legacy', date)?.contextKey, 'Legacy record did not gain context metadata after enrichment.');

for (let i = 0; i < 70; i += 1) {
  store.save({ fingerprint: `fp-${i}`, cardId: String(i % 78).padStart(2,'0'), sessionId: `s-${i}`, analysis: analyzer.analyze('วันนี้ฉันควรใส่ใจอะไร'), localDate: date });
}
const parsed = JSON.parse(localStorage.getItem(store.key));
assert(Object.keys(parsed.readings).length <= store.maxEntriesPerDay, 'Ask store daily cap failed.');
assert(parsed.localDate === date, 'Ask store local date mismatch.');
assert(parsed.askContentVersion === 'ask-ganesha-v1', 'Ask store content version missing.');
assert(parsed.askContextVersion === 'ask-context-v2', 'Ask context version missing.');
assert(parsed.cardContentVersion === globalThis.LGTReadingContent.version, 'Card content version missing from Ask store.');

console.log('Ask Ganesha same-question + contextual persistence tests: PASS');

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'js/profile-details.js'), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const P = sandbox.window.LGTProfileDetails;

assert(P, 'LGTProfileDetails should exist');
assert.strictEqual(P.version, 'profile-details-v2');

assert.deepStrictEqual(
  JSON.parse(JSON.stringify(P.calculateAge('1983-05-10', '2026-08-22'))),
  { years: 43, months: 3, days: 12 }
);
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(P.calculateAge('2000-02-29', '2025-02-28'))),
  { years: 25, months: 0, days: 0 }
);
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(P.calculateAge('2000-01-31', '2026-03-30'))),
  { years: 26, months: 1, days: 30 }
);
assert.strictEqual(P.calculateAge('2030-01-01', '2026-08-22'), null);

assert.strictEqual(P.zodiacKey(7, 22), 'cancer');
assert.strictEqual(P.zodiacKey(7, 23), 'leo');
assert.strictEqual(P.zodiacKey(8, 22), 'leo');
assert.strictEqual(P.zodiacKey(8, 23), 'virgo');
assert.strictEqual(P.zodiacKey(12, 22), 'capricorn');

const th = P.summarize('1983-08-01', 'th', '2026-08-22');
assert.strictEqual(th.zodiacLabel, 'ราศีสิงห์');
assert.strictEqual(th.zodiacSymbol, '♌');
assert(th.ageText.startsWith('อายุ 43 ปี'));

const en = P.summarize('1983-08-01', 'en', '2026-08-22');
assert.strictEqual(en.zodiacLabel, 'Leo');
assert.strictEqual(en.zodiacSymbol, '♌');
assert(en.ageText.startsWith('Age 43 years'));

const singular = P.summarize('2025-07-21', 'en', '2026-08-22');
assert.strictEqual(singular.ageText, 'Age 1 year · 1 month · 1 day');

console.log('PASS test-profile-details');

const glyphCases = [
  [3, 21, '♈'], [4, 20, '♉'], [5, 21, '♊'], [6, 21, '♋'],
  [7, 23, '♌'], [8, 23, '♍'], [9, 23, '♎'], [10, 23, '♏'],
  [11, 22, '♐'], [12, 22, '♑'], [1, 20, '♒'], [2, 19, '♓']
];
glyphCases.forEach(([month, day, symbol]) => {
  const birth = `2000-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  assert.strictEqual(P.summarize(birth, 'en', '2026-08-22').zodiacSymbol, symbol);
});
console.log('PASS zodiac glyph map');

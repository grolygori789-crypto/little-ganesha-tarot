'use strict';

const fs = require('fs');
const vm = require('vm');
const read = (path) => fs.readFileSync(path, 'utf8');
const assert = (condition, message) => { if (!condition) throw new Error(message); };

function extractCopy(source, label) {
  const match = source.match(/const COPY = (\{[\s\S]*?\n  \});/);
  assert(match, `Could not extract COPY from ${label}.`);
  return vm.runInNewContext(`(${match[1]})`);
}

const index = read('index.html');
const appSource = read('js/app.js');
const readingSource = read('js/reading-ui.js');
const askSource = read('js/ask-ui.js');
const appCopy = extractCopy(appSource, 'app.js');
const readingCopy = extractCopy(readingSource, 'reading-ui.js');
const askCopy = extractCopy(askSource, 'ask-ui.js');

for (const [label, copy] of [['app', appCopy], ['reading', readingCopy], ['ask', askCopy]]) {
  const enKeys = Object.keys(copy.en).sort();
  const thKeys = Object.keys(copy.th).sort();
  assert(enKeys.join('|') === thKeys.join('|'), `${label} EN/TH key sets differ.`);
  for (const lang of ['en', 'th']) {
    for (const [key, value] of Object.entries(copy[lang])) {
      assert(typeof value === 'string' && value.trim(), `${label}.${lang}.${key} is empty.`);
      assert(!/\s{2,}/.test(value), `${label}.${lang}.${key} contains repeated spaces.`);
    }
  }
}

const allAppKeys = new Set(Object.keys(appCopy.en));
for (const attribute of ['data-copy', 'data-copy-option', 'data-copy-aria']) {
  const re = new RegExp(`${attribute}="([^"]+)"`, 'g');
  for (const match of index.matchAll(re)) assert(allAppKeys.has(match[1]), `index.html uses missing app copy key ${match[1]} via ${attribute}.`);
}

for (const required of [
  'data-copy-aria="languageAria"',
  'data-copy-aria="settingsAria"',
  'data-copy-aria="backAria"',
  'data-copy-aria="primaryReadingsAria"',
  'data-copy-aria="primaryNavAria"',
  'data-copy-aria="musicPlayerAria"'
]) assert(index.includes(required), `Missing whole-app localization hook: ${required}`);

assert(appSource.includes("copy('homeTitle')"), 'Home fallback title must localize.');
assert(appSource.includes("document.querySelectorAll('[data-copy-aria]')"), 'ARIA localization pass missing.');
assert(readingSource.includes("choice.setAttribute('aria-label', t('choose'))"), 'Daily choice-group aria localization missing.');
assert(askSource.includes("choice.setAttribute('aria-label', t('choose'))"), 'Ask choice-group aria localization missing.');
assert(askSource.includes("questionInput.placeholder = t('placeholder')"), 'Ask textarea placeholder localization missing.');

const combinedUi = JSON.stringify({app: appCopy, reading: readingCopy, ask: askCopy});
const banned = [
  'หน้าไตเติล',
  'ดำเนินการต่อ',
  'การสะท้อนเชิงสัญลักษณ์',
  'This feature is coming in a future update.',
  'International Supporters',
  'Supporters in Thailand'
];
for (const phrase of banned) assert(!combinedUi.includes(phrase), `Legacy/non-native UI phrase remains: ${phrase}`);

assert(appCopy.en.hello === 'Hello' && appCopy.th.hello === 'สวัสดี', 'Greeting copy is not natural/localized.');
assert(appCopy.th.returnTitle === 'กลับหน้าเริ่มต้น', 'Thai title-screen return copy should avoid transliterated UI jargon.');
assert(readingCopy.th.lensesTitle === 'มองไพ่ใบนี้ในเรื่องต่างๆ', 'Thai Daily Lens heading should remain native.');
assert(askCopy.th.eyebrow === 'ถามพระพิฆเนศน้อย', 'Thai Ask Ganesha title missing.');
assert(askCopy.en.questionHint.includes('one question at a time'), 'English one-question guidance missing.');
assert(askCopy.th.questionHint.includes('ทีละหนึ่งเรื่อง'), 'Thai one-question guidance missing.');
assert(askCopy.en.restored.includes('SAME QUESTION'), 'English same-question/same-card cue missing.');
assert(askCopy.th.restored.includes('คำถามเดิม'), 'Thai same-question/same-card cue missing.');
assert(askCopy.en.inappropriate.includes('respectful and appropriate'), 'English Question Guard warning missing.');
assert(askCopy.th.inappropriate.includes('สุภาพและเหมาะสม'), 'Thai Question Guard warning missing.');
assert(askCopy.en.safetyCrisis.includes('safety concern'), 'English crisis-safe copy missing.');
assert(askCopy.th.safetyCrisis.includes('ความปลอดภัย'), 'Thai crisis-safe copy missing.');

console.log('Global TH/EN UI copy/localization tests: PASS');

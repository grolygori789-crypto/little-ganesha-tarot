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
const appCopy = extractCopy(appSource, 'app.js');
const readingCopy = extractCopy(readingSource, 'reading-ui.js');

for (const [label, copy] of [['app', appCopy], ['reading', readingCopy]]) {
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
  for (const match of index.matchAll(re)) {
    assert(allAppKeys.has(match[1]), `index.html uses missing app copy key ${match[1]} via ${attribute}.`);
  }
}

for (const required of [
  'data-copy-aria="languageAria"',
  'data-copy-aria="settingsAria"',
  'data-copy-aria="backAria"',
  'data-copy-aria="primaryReadingsAria"',
  'data-copy-aria="primaryNavAria"',
  'data-copy-aria="musicPlayerAria"',
  'data-copy="supportWorldwideBadge"',
  'data-copy="supportThailandBadge"',
  'id="motionSelect" aria-label="Motion" data-copy-aria="motion"',
  'id="immersiveToggle" type="checkbox" aria-label="Browser Full Screen" data-copy-aria="immersive"',
  'id="settingsSoundToggle" type="checkbox" checked aria-label="Music" data-copy-aria="sound"',
  'id="settingsVolume" class="range" type="range" min="0" max="100" step="1" value="58" aria-label="Volume" data-copy-aria="volume"',
  'id="settingsShuffle" type="checkbox" checked aria-label="Shuffle" data-copy-aria="shuffle"'
]) assert(index.includes(required), `Missing whole-app localization hook: ${required}`);

assert(appSource.includes("copy('homeTitle')"), 'Home fallback title must localize.');
assert(appSource.includes("document.querySelectorAll('[data-copy-aria]')"), 'ARIA localization pass missing.');
assert(readingSource.includes("choice.setAttribute('aria-label', t('choose'))"), 'Reading choice group aria localization missing.');
assert(readingSource.includes("button.dataset.choiceIndex = String(index)"), 'Reading choice button aria re-localization hook missing.');

const combinedUi = JSON.stringify({app: appCopy, reading: readingCopy});
const banned = [
  'หน้าไตเติล',
  'ดำเนินการต่อ',
  'การสะท้อนเชิงสัญลักษณ์',
  'Bring one clear question',
  'used for future symbolic personalization',
  'installed app already opens in app-like mode',
  'This feature is coming in a future update.',
  'International Supporters',
  'Supporters in Thailand'
];
for (const phrase of banned) assert(!combinedUi.includes(phrase), `Legacy/non-native UI phrase remains: ${phrase}`);

assert(appCopy.en.hello === 'Hello' && appCopy.th.hello === 'สวัสดี', 'Greeting copy is not natural/localized.');
assert(appCopy.en.homeTitle === 'The Golden Path' && appCopy.th.homeTitle === 'เส้นทางสีทอง', 'Localized Home title missing.');
assert(appCopy.th.returnTitle === 'กลับหน้าเริ่มต้น', 'Thai title-screen return copy should avoid transliterated UI jargon.');
assert(appCopy.th.continue === 'ต่อไป', 'Thai onboarding CTA should be concise and natural.');
assert(appCopy.th.obstacle === 'คลายอุปสรรค', 'Thai obstacle mode title not normalized.');
assert(readingCopy.th.chooseHint.includes('ไม่ต้องคิดมาก'), 'Thai card-choice helper should read naturally.');
assert(readingCopy.en.storageFail.includes('couldn’t save'), 'English storage error should be plain-language.');

for (const key of ['lensesTitle','lensesHint','workGoals','moneyResources','loveRelationships','innerBalance','opportunitiesWatchouts','guidanceToday']) {
  assert(readingCopy.en[key] && readingCopy.th[key], `Daily Lens UI copy missing for ${key}.`);
}
for (const key of ['saveShareTitle','saveShareHint','saveImage','shareImage','exportPreparing','exportSaved','exportShared','exportSavedFallback','exportFailed','exportCancelled']) {
  assert(readingCopy.en[key] && readingCopy.th[key], `Save/share UI copy missing for ${key}.`);
}
assert(readingCopy.th.lensesTitle === 'มองไพ่ใบนี้ในเรื่องต่างๆ', 'Thai Daily Lens heading should be direct and natural.');
assert(readingCopy.en.lensesTitle === 'Explore today’s card', 'English Daily Lens heading should be natural.');

console.log('Global TH/EN UI copy/localization tests: PASS');

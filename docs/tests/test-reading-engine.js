'use strict';

const fs = require('fs');
const vm = require('vm');

global.window = globalThis;

class StorageMock {
  constructor() { this.map = new Map(); }
  getItem(key) { return this.map.has(key) ? this.map.get(key) : null; }
  setItem(key, value) { this.map.set(String(key), String(value)); }
  removeItem(key) { this.map.delete(String(key)); }
  clear() { this.map.clear(); }
}
global.localStorage = new StorageMock();

function load(path) {
  vm.runInThisContext(fs.readFileSync(path, 'utf8'), { filename: path });
}

load('js/reading-content.js');
load('js/reading-engine.js');

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const content = window.LGTReadingContent;
const engine = window.LGTReadingEngine;

const majorNames = [
  'THE FOOL','THE MAGICIAN','THE HIGH PRIESTESS','THE EMPRESS','THE EMPEROR','THE HIEROPHANT',
  'THE LOVERS','THE CHARIOT','STRENGTH','THE HERMIT','WHEEL OF FORTUNE','JUSTICE','THE HANGED MAN',
  'DEATH','TEMPERANCE','THE DEVIL','THE TOWER','THE STAR','THE MOON','THE SUN','JUDGEMENT','THE WORLD'
];
const suits = ['WANDS','CUPS','SWORDS','PENTACLES'];
const ranks = ['ACE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE','TEN','PAGE','KNIGHT','QUEEN','KING'];
const expectedNames = [...majorNames];
for (const suit of suits) for (const rank of ranks) expectedNames.push(`${rank} OF ${suit}`);
const lensKeys = ['workGoals','moneyResources','loveRelationships','innerBalance','opportunitiesWatchouts','guidanceToday'];

assert(content.version === 'daily-guidance-v3', 'Unexpected reading content version.');
assert(content.cards.length === 78, 'Expected 78 cards.');
assert(new Set(content.cards.map(card => card.id)).size === 78, 'Card IDs must be unique.');
assert(content.cards.every((card, index) => card.id === String(index).padStart(2,'0')), 'Card IDs must remain 00-77.');
assert(content.cards.every((card, index) => card.index === index), 'Card indexes must match canonical order.');
assert(content.cards.every((card, index) => card.canonicalTitle === expectedNames[index]), 'Canonical card order/title mismatch.');
assert(content.cards[8].canonicalTitle === 'STRENGTH' && content.cards[8].number === 8, 'Strength must remain VIII.');
assert(content.cards[11].canonicalTitle === 'JUSTICE' && content.cards[11].number === 11, 'Justice must remain XI.');
assert(content.cards[0].image === 'assets/cards/00_THE_FOOL.png', 'Fool image path mismatch.');
assert(content.cards[77].image === 'assets/cards/77_KING_OF_PENTACLES.png', 'Final card image path mismatch.');
assert(content.cardBack === 'assets/ui/card-back.png', 'Canonical card back mismatch.');
assert(new Set(content.cards.map(card => card.image)).size === 78, 'Card image paths must be unique.');

content.cards.forEach((card, index) => {
  const expectedImage = `assets/cards/${String(index).padStart(2,'0')}_${card.canonicalTitle.replaceAll(' ','_')}.png`;
  assert(card.image === expectedImage, `Image mapping mismatch for ${card.id}.`);
  assert(card.contentVersion === content.version, `Content version mismatch for ${card.id}.`);
  assert(card.arcana === (index < 22 ? 'major' : 'minor'), `Arcana class mismatch for ${card.id}.`);
  if (index < 22) {
    assert(card.suit === null && card.rank === null && card.number === index, `Major metadata mismatch for ${card.id}.`);
  } else {
    const minorOffset = index - 22;
    assert(card.suit === suits[Math.floor(minorOffset / 14)].toLowerCase(), `Minor suit mismatch for ${card.id}.`);
    assert(card.rank === ranks[minorOffset % 14].toLowerCase(), `Minor rank mismatch for ${card.id}.`);
    assert(card.number === null, `Minor number should be null for ${card.id}.`);
  }
  for (const lang of ['en','th']) {
    assert(typeof card.title?.[lang] === 'string' && card.title[lang].trim(), `Missing ${lang} title for ${card.id}.`);
    assert(Array.isArray(card.keywords?.[lang]) && card.keywords[lang].length >= 3, `Missing ${lang} keywords for ${card.id}.`);
    assert(typeof card.upright?.[lang] === 'string' && card.upright[lang].trim().length >= 20, `Missing ${lang} upright meaning for ${card.id}.`);
    assert(typeof card.reflection?.[lang] === 'string' && card.reflection[lang].trim().length >= 12, `Missing ${lang} reflection for ${card.id}.`);
    assert(Object.prototype.hasOwnProperty.call(card.reversed || {}, lang), `Reversal-ready field missing ${lang} for ${card.id}.`);
    assert(card.dailyLenses && Object.keys(card.dailyLenses).join('|') === lensKeys.join('|'), `Daily lens schema mismatch for ${card.id}.`);
    for (const lensKey of lensKeys) {
      const lensText = card.dailyLenses[lensKey]?.[lang];
      assert(typeof lensText === 'string' && lensText.trim().length >= 20, `Missing/short ${lang} ${lensKey} lens for ${card.id}.`);
    }
  }
});

for (const lang of ['en','th']) {
  assert(new Set(content.cards.map(card => card.upright[lang])).size === 78, `Duplicate ${lang} upright meanings detected.`);
  assert(new Set(content.cards.map(card => card.reflection[lang])).size === 78, `Duplicate ${lang} reflection prompts detected.`);
  content.cards.forEach((card) => {
    assert(new Set(card.keywords[lang].map((value) => value.toLowerCase())).size === card.keywords[lang].length, `Duplicate ${lang} keywords within ${card.id}.`);
  });
  for (const lensKey of lensKeys) {
    const values = content.cards.map((card) => card.dailyLenses[lensKey][lang].trim().toLowerCase());
    assert(new Set(values).size === 78, `Duplicate ${lang} Daily Lens text detected in ${lensKey}.`);
  }
}

const awkwardThai = [
  'พลังลงมือ', 'การรู้จากภายใน', 'ความต้องการถัดไปที่จัดการได้', 'ทำให้งานดีมองเห็นได้',
  'กำลังรักษาสิ่งมีค่าหรือแค่รักษาความกลัว', 'ความเป็นอิสระแข็งแรงที่สุด', 'ความเชื่อถือได้สะสมผล',
  'กำลังไหวแรง', 'การตอบสนองแบบไหนทั้งเมตตาและกำกับตัวเองได้ดี'
];
const allThai = content.cards.map(card => `${card.upright.th} ${card.reflection.th} ${card.keywords.th.join(' ')} ${lensKeys.map(key => card.dailyLenses[key].th).join(' ')}`).join('\n');
awkwardThai.forEach((phrase) => assert(!allThai.includes(phrase), `Known translated/awkward Thai phrase remains: ${phrase}`));

assert(content.getCard('68').upright.th.includes('ช่วงที่ลำบาก'), 'Five of Pentacles Thai rewrite missing.');
assert(content.getCard('68').reflection.th.includes('ยังไม่ได้เอ่ยปากขอ'), 'Five of Pentacles reflection rewrite missing.');

const unsafeClaims = /guarantee(?:d|s)?|certainly\s+will|definitely\s+will|winning\s+lottery|medical\s+diagnosis|you\s+will\s+die|คุณจะชนะ|ถูกรางวัลแน่นอน|รับประกัน|วินิจฉัยโรค/i;
content.cards.forEach((card) => {
  for (const lang of ['en','th']) {
    assert(!unsafeClaims.test(card.upright[lang]), `Deterministic/high-risk claim in ${card.id} ${lang} meaning.`);
    assert(!unsafeClaims.test(card.reflection[lang]), `Deterministic/high-risk claim in ${card.id} ${lang} reflection.`);
    for (const lensKey of lensKeys) {
      assert(!unsafeClaims.test(card.dailyLenses[lensKey][lang]), `Deterministic/high-risk claim in ${card.id} ${lang} ${lensKey} lens.`);
    }
  }
});

const expectedSpreads = ['daily','ask','three','golden','obstacle'];
assert(Object.keys(engine.spreads).join('|') === expectedSpreads.join('|'), 'Unexpected spread registry/order.');
assert(expectedSpreads.every((id) => engine.getSpread(id)), 'All five spread definitions must exist.');
assert(engine.getSpread('daily').cardCount === 1, 'Daily must be one card.');
assert(engine.getSpread('ask').questionInput === true, 'Ask Ganesha must preserve question-input architecture.');
assert(engine.getSpread('three').cardCount === 3, 'Three-card spread must use three cards.');
assert(engine.getSpread('three').positions.map(p => p.id).join('|') === 'past|present|next', 'Three-card positions mismatch.');
assert(engine.getSpread('golden').positions.map(p => p.id).join('|') === 'where-you-stand|what-blocks|way-forward', 'Golden Path positions mismatch.');
assert(engine.getSpread('obstacle').positions.map(p => p.id).join('|') === 'obstacle|feeds-it|releases-it', 'Obstacle positions mismatch.');
assert(Object.values(engine.spreads).every(s => s.orientationPolicy === 'upright-only'), 'V0.4.2 must remain upright-first.');

for (let i = 0; i < 5000; i++) {
  const value = engine.secureRandomInt(78);
  assert(Number.isInteger(value) && value >= 0 && value < 78, 'Secure random integer out of bounds.');
}

const all = engine.drawUnique(78);
assert(all.length === 78 && new Set(all).size === 78, 'drawUnique must never duplicate a card.');
const excluded = ['00','01','02'];
const draw = engine.drawUnique(20, excluded);
assert(draw.every(id => !excluded.includes(id)), 'Excluded card appeared in draw.');

let session = engine.createSession('daily');
assert(session.state === 'idle', 'New session must start idle.');
const candidates = session.prepareChoice(78);
assert(session.state === 'shuffling', 'prepareChoice should end in shuffling state.');
assert(candidates.length === 78 && new Set(candidates).size === 78, 'Daily choice must expose all 78 shuffled positions without duplicates.');
session.markChoosing();
assert(session.state === 'choosing', 'Session must enter choosing.');
const selected = session.selectCandidate(1);
assert(session.state === 'selected', 'Selection must enter selected.');
assert(selected.id === candidates[1], 'Selected card must match chosen candidate.');
const saved = engine.saveTodaySelection(session, new Date(2026, 7, 21, 10, 30));
assert(saved.record.localDate === '2026-08-21', 'Daily record must use local date.');
assert(saved.persisted === true, 'Daily record should persist in localStorage mock.');
assert(saved.record.cards[0].orientation === 'upright', 'Persisted orientation must be explicit.');

// V0.4.2 content v3 must preserve same-day selections from both earlier content versions.
for (const legacyVersion of ['daily-guidance-v1', 'daily-guidance-v2']) {
  const legacyRecord = JSON.parse(JSON.stringify(saved.record));
  legacyRecord.contentVersion = legacyVersion;
  localStorage.setItem('lgt.reading.daily.v1', JSON.stringify(legacyRecord));
  const migrated = engine.getTodayRecord(new Date(2026, 7, 21, 18, 0));
  assert(migrated?.cards[0]?.cardId === selected.id, `${legacyVersion} daily card must be preserved during content migration.`);
  assert(migrated?.contentVersion === 'daily-guidance-v3', `${legacyVersion} daily record must migrate to content v3.`);
  assert(JSON.parse(localStorage.getItem('lgt.reading.daily.v1')).contentVersion === 'daily-guidance-v3', 'Migrated daily record should be written back as v3.');
}

const sameDay = engine.createOrRestoreDaily(new Date(2026, 7, 21, 23, 59));
assert(sameDay.restored === true, 'Same local day must restore existing Daily Guidance.');
assert(sameDay.card.id === selected.id, 'Same-day restore must preserve exact card.');
assert(sameDay.session.state === 'selected', 'Restored session must be reveal-ready selected state.');

// Full-deck + Three-card multi-selection regression (V0.5.0)
let threeSession = engine.createSession('three');
const threeCandidates = threeSession.prepareChoice(78);
assert(threeCandidates.length === 78 && new Set(threeCandidates).size === 78, 'Three-card choice must expose one securely shuffled position for every canonical card.');
threeSession.markChoosing();
const pickedIndices = [0, 25, 77];
const expectedPickedIds = pickedIndices.map(index => threeCandidates[index]);
const threeSelected = threeSession.selectCandidates(pickedIndices);
assert(threeSelected.map(card => card.id).join('|') === expectedPickedIds.join('|'), 'Chosen facedown positions must resolve to the cards fixed there before the tap.');
assert(threeSession.state === 'selected', 'Three-card multi-selection must enter selected state.');
assert(threeSelected.length === 3 && new Set(threeSelected.map(card => card.id)).size === 3, 'Three-card selection must return three unique cards.');
assert(threeSession.getSelectedCards().map(entry => entry.positionId).join('|') === 'past|present|next', 'Three-card selection must preserve spread position order.');
assert(threeSession.getSelectedCards().every(entry => entry.orientation === 'upright'), 'Three-card selection must remain upright-only.');
let multiDuplicateCaught = false;
try {
  const duplicate = engine.createSession('three');
  duplicate.prepareChoice(78); duplicate.markChoosing(); duplicate.selectCandidates([0, 0, 1]);
} catch (_) { multiDuplicateCaught = true; }
assert(multiDuplicateCaught, 'Three-card multi-selection must reject duplicate choice indices.');
assert(window.LGTReadingEngineVersion === '1.1.0', 'Reading Engine version must expose multi-card API as 1.1.0.');

const nextDay = engine.createOrRestoreDaily(new Date(2026, 7, 22, 0, 1));
assert(nextDay.restored === false, 'New local day must allow a new Daily Guidance.');

let invalidTransitionCaught = false;
try {
  const bad = engine.createSession('daily');
  bad.markChoosing();
} catch (_) {
  invalidTransitionCaught = true;
}
assert(invalidTransitionCaught, 'Invalid state transition must be rejected.');

let duplicateSaveCaught = false;
try {
  engine.saveTodaySelection(sameDay.session, new Date(2026, 7, 21, 12));
} catch (_) {
  // Restored session is selected and is allowed to be persisted again by the engine contract.
  duplicateSaveCaught = true;
}
assert(duplicateSaveCaught === false, 'Restored selected Daily session should remain persistence-compatible.');

localStorage.setItem('lgt.reading.daily.v1', '{broken json');
const corrupt = engine.getTodayRecord(new Date(2026, 7, 21));
assert(corrupt === null, 'Corrupted daily storage must fail safely.');
assert(localStorage.getItem('lgt.reading.daily.v1') === null, 'Corrupted daily storage must be cleared.');

localStorage.setItem('lgt.reading.daily.v1', JSON.stringify({schemaVersion:999, localDate:'2026-08-21', spreadId:'daily', cards:[{cardId:'00',orientation:'upright'}]}));
assert(engine.getTodayRecord(new Date(2026,7,21)) === null, 'Unknown schema version must be rejected safely.');
assert(localStorage.getItem('lgt.reading.daily.v1') === null, 'Rejected schema must be cleared.');

console.log('Reading Engine content/state/persistence tests: PASS');

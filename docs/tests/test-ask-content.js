'use strict';

const fs = require('fs');
const vm = require('vm');
const assert = (condition, message) => { if (!condition) throw new Error(message); };

global.window = globalThis;
vm.runInThisContext(fs.readFileSync('js/ask-content.js', 'utf8'), { filename: 'js/ask-content.js' });
const ask = globalThis.LGTAskContent;
assert(ask && ask.version === 'ask-ganesha-v1', 'Ask Ganesha content version mismatch.');

for (const lang of ['en', 'th']) {
  const values = [];
  for (let i = 0; i < 78; i += 1) {
    const id = String(i).padStart(2, '0');
    const text = ask.get(id, lang);
    assert(typeof text === 'string' && text.trim().length >= 45, `Missing/short ${lang} Ask guidance for ${id}.`);
    values.push(text.trim().toLowerCase());
  }
  assert(new Set(values).size === 78, `Duplicate ${lang} Ask guidance detected.`);
}

const allEn = Array.from({length:78},(_,i)=>ask.get(String(i).padStart(2,'0'),'en')).join('\n');
const allTh = Array.from({length:78},(_,i)=>ask.get(String(i).padStart(2,'0'),'th')).join('\n');
const unsafe = /guarantee(?:d|s)?|definitely\s+will|certainly\s+will|winning\s+lottery|you\s+will\s+die|ถูกรางวัลแน่นอน|รับประกันว่า|คุณจะตายแน่นอน/i;
assert(!unsafe.test(`${allEn}\n${allTh}`), 'Deterministic/high-risk claim found in Ask content.');
assert(!/[\u4e00-\u9fff]/u.test(allTh), 'Unexpected CJK characters found in Thai Ask content.');

console.log('Ask Ganesha bilingual content tests: PASS');

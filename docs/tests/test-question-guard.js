'use strict';

const fs = require('fs');
const vm = require('vm');
const assert = (condition, message) => { if (!condition) throw new Error(message); };

global.window = globalThis;
vm.runInThisContext(fs.readFileSync('js/question-guard.js', 'utf8'), { filename: 'js/question-guard.js' });

const guard = globalThis.LGTQuestionGuard;
assert(guard && guard.maxLength === 220, 'Question Guard did not initialize with expected limit.');

const shouldPass = [
  'ฉันควรรับงานใหม่นี้ไหม?',
  'ความสัมพันธ์นี้ควรคุยกันต่ออย่างไร',
  'เรื่องเพศสัมพันธ์กับแฟนควรคุยกันยังไง?',
  'Should I take this new job?',
  'How should I talk with my partner about sex?',
  'What am I not seeing clearly in this situation?'
];
for (const text of shouldPass) {
  const result = guard.validate(text);
  assert(result.ok, `Expected normal question to pass: ${text} (${result.code})`);
}

const shouldBlock = [
  ['ไอ้เหี้ยนั่นจะโดนกรรมเมื่อไหร่?', 'inappropriate'],
  ['f u c k this person', 'inappropriate'],
  ['How can I kill him?', 'violentIntent'],
  ['I want to die', 'safetyCrisis'],
  ['งาน????', 'multipleQuestions'],
  ['!!!!!!!!!!!!', 'spam'],
  ['ค ว ย', 'inappropriate']
];
for (const [text, code] of shouldBlock) {
  const result = guard.validate(text);
  assert(!result.ok && result.code === code, `Expected ${code} block for: ${text}; got ${result.code}`);
}

assert(guard.normalizeForFingerprint('  Should I TAKE this job?!  ') === 'should i take this job', 'Fingerprint normalization must ignore case/outer space/punctuation.');
assert(guard.normalizeForFingerprint('ฉันควรรับงานนี้ไหม ?') === guard.normalizeForFingerprint('ฉันควรรับงานนี้ไหม'), 'Thai punctuation normalization mismatch.');

(async () => {
  const a = await guard.fingerprint('Should I take this job?');
  const b = await guard.fingerprint('  should i take this job!!! ');
  const c = await guard.fingerprint('Should I leave this job?');
  assert(a && a === b, 'Equivalent normalized questions must produce the same fingerprint.');
  assert(a !== c, 'Different normalized questions should not share a fingerprint in the test set.');
  console.log('Ask Ganesha Question Guard tests: PASS');
})().catch((error) => { console.error(error); process.exit(1); });

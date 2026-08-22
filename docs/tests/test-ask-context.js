'use strict';

const fs = require('fs');
const vm = require('vm');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
global.window = globalThis;
function load(path) { vm.runInThisContext(fs.readFileSync(path, 'utf8'), { filename: path }); }
load('js/reading-content.js');
load('js/question-analyzer.js');
load('js/ask-context.js');

const CONTENT = globalThis.LGTReadingContent;
const A = globalThis.LGTQuestionAnalyzer;
const C = globalThis.LGTAskContext;
assert(C?.version === 'ask-context-v2', 'Ask Context did not initialize.');

const domains = ['self_image','social_perception','love_relationships','work_purpose','money_resources','choice_action','outlook_opportunity','inner_growth','spiritual_unseen'];
assert(C.spiritualContextCount === 78, 'Spiritual context must contain one curated bilingual entry for every card.');
for (const card of CONTENT.cards) {
  for (const domain of domains) {
    for (const lang of ['en','th']) {
      const analysis = Object.freeze({ domain, facet: 'general', questionType: 'open', perspective: 'general', timeframe: 'unspecified' });
      const out = C.interpret(card, analysis, lang);
      assert(out && out.contextKey === domain, `${card.id}/${domain}/${lang}: missing context output.`);
      for (const field of ['contextLabel','direct','rationale','reflection']) {
        assert(typeof out[field] === 'string' && out[field].trim().length >= 12, `${card.id}/${domain}/${lang}: weak ${field}.`);
        assert(!/undefined|null/.test(out[field]), `${card.id}/${domain}/${lang}: invalid interpolation in ${field}.`);
      }
    }
  }
}

const q = A.analyze('ผมหน้าตาดีแค่ไหนในสายตาชาวโลก');
const sixPentacles = CONTENT.cards.find((card) => card.canonicalTitle === 'SIX OF PENTACLES');
const result = C.interpret(sixPentacles, q, 'th');
assert(result.contextKey === 'self_image', 'Appearance example context mismatch.');
assert(result.direct.includes('เสน่ห์') && result.direct.includes('สายตาคนอื่น'), 'Appearance example does not directly address attractiveness/public perception.');
assert(result.rationale.includes('การให้และรับ') || result.rationale.includes('ความเอื้อเฟื้อ'), 'Six of Pentacles rationale lost card symbolism.');
assert(!result.direct.includes('หนี้') && !result.direct.includes('พึ่งพา'), 'Appearance answer regressed to unrelated generic Six of Pentacles framing.');

const love = A.analyze('เขารักฉันไหม');
const loveResult = C.interpret(sixPentacles, love, 'th');
assert(loveResult.direct.includes('ไม่สามารถยืนยันความรู้สึกส่วนตัว'), 'Private-feelings uncertainty guard missing.');



const spiritualQuestions = [
  ['ผมมีสิ่งศักดิ์สิทธิ์องค์ไหนคุ้มครองอยู่หรือไม่', 'divine_protection', '05'],
  ['มีวิญญาณร้ายตามผมหรือเปล่า', 'unseen_influence', '15'],
  ['ความฝันเมื่อคืนเป็นลางอะไรไหม', 'dreams', '18'],
  ['ผมมีญาณหรือสัมผัสพิเศษไหม', 'spiritual_gifts', '02'],
  ['อดีตชาติผมเคยเป็นใคร', 'past_life', '41'],
  ['กรรมอะไรทำให้ชีวิตผมติดขัด', 'karma_destiny', '69'],
  ['Which deity protects me?', 'divine_protection', '14'],
  ['Is there a spirit following me?', 'unseen_influence', '58']
];
for (const [question, facet, cardId] of spiritualQuestions) {
  const a = A.analyze(question);
  assert(a.domain === 'spiritual_unseen' && a.facet === facet, `${question}: spiritual classification failed.`);
  for (const lang of ['en','th']) {
    const out = C.interpret(cardId, a, lang);
    assert(out.contextKey === 'spiritual_unseen', `${question}/${lang}: spiritual context missing.`);
    assert(out.direct.length >= 80 && out.rationale.length >= 80, `${question}/${lang}: spiritual answer too thin.`);
  }
}

const protector = C.interpret('05', A.analyze('ผมมีสิ่งศักดิ์สิทธิ์องค์ไหนคุ้มครองอยู่หรือไม่'), 'th');
assert(protector.direct.includes('ไม่สามารถระบุชื่อหรือยืนยัน'), 'Divine-protection answer must not invent a named protector.');
assert(protector.direct.includes('ครูบาอาจารย์') || protector.direct.includes('ประเพณีทางศรัทธา'), 'Hierophant spiritual symbolism was not connected to the question.');

const threatCards = ['15','16','18','58','59'];
for (const id of threatCards) {
  const out = C.interpret(id, A.analyze('มีวิญญาณร้ายตามผมหรือเปล่า'), 'th');
  assert(out.direct.includes('ไม่สามารถยืนยัน'), `${id}: unseen-threat answer must preserve epistemic boundary.`);
  assert(!/มีวิญญาณร้ายตามคุณแน่นอน|ถูกสาปแน่นอน|มีของตามคุณแน่นอน/.test(out.direct), `${id}: unseen-threat answer made an unsupported literal claim.`);
}

console.log('Contextual Ask Ganesha 78-card × 9-context × bilingual + spiritual-boundary tests: PASS');

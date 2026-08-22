'use strict';

const fs = require('fs');
const vm = require('vm');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
global.window = globalThis;
vm.runInThisContext(fs.readFileSync('js/question-analyzer.js', 'utf8'), { filename: 'js/question-analyzer.js' });
const A = globalThis.LGTQuestionAnalyzer;
assert(A?.version === 'question-analyzer-v2', 'Question Analyzer did not initialize.');

const cases = [
  ['ผมหน้าตาดีแค่ไหนในสายตาชาวโลก', 'self_image', 'appearance', 'evaluation', 'public'],
  ['คนอื่นมองบุคลิกของฉันยังไง', 'self_image', 'personality', 'perception', 'public'],
  ['เขารักฉันไหม', 'love_relationships', 'feelings', 'feelings', 'specific_other'],
  ['ฉันควรรับงานใหม่นี้ไหม', 'work_purpose', 'new_opportunity', 'decision', 'self'],
  ['การเงินของฉันมีแนวโน้มเป็นยังไง', 'money_resources', 'general', 'outlook', 'self'],
  ['ฉันควรไปต่อหรือหยุดกับเรื่องนี้', 'choice_action', 'general', 'decision', 'self'],
  ['เรื่องนี้มีโอกาสพัฒนาไปทางไหน', 'outlook_opportunity', 'general', 'outlook', 'general'],
  ['ทำไมช่วงนี้ฉันรู้สึกหมดไฟ', 'inner_growth', 'general', 'cause', 'self'],
  ['How attractive am I to people in general?', 'self_image', 'attractiveness', 'evaluation', 'public'],
  ['What does she think of me?', 'social_perception', 'general', 'perception', 'specific_other'],
  ['Should I accept this new job?', 'work_purpose', 'new_opportunity', 'decision', 'self'],
  ['What is the outlook for my finances?', 'money_resources', 'general', 'outlook', 'self'],
  ['ผมมีสิ่งศักดิ์สิทธิ์องค์ไหนคุ้มครองอยู่หรือไม่', 'spiritual_unseen', 'divine_protection', 'identification', 'self'],
  ['มีวิญญาณร้ายตามผมหรือเปล่า', 'spiritual_unseen', 'unseen_influence', 'verification', 'self'],
  ['ความฝันเมื่อคืนเป็นลางอะไรไหม', 'spiritual_unseen', 'dreams', 'verification', 'general'],
  ['ผมมีญาณหรือสัมผัสพิเศษไหม', 'spiritual_unseen', 'spiritual_gifts', 'verification', 'self'],
  ['อดีตชาติผมเคยเป็นใคร', 'spiritual_unseen', 'past_life', 'identification', 'self'],
  ['กรรมอะไรทำให้ชีวิตผมติดขัด', 'spiritual_unseen', 'karma_destiny', 'cause', 'self'],
  ['Which deity protects me?', 'spiritual_unseen', 'divine_protection', 'identification', 'self'],
  ['Is there a spirit following me?', 'spiritual_unseen', 'unseen_influence', 'verification', 'self'],
  ['เห็นเลข 11:11 บ่อยๆ เป็นสัญญาณอะไรไหม', 'spiritual_unseen', 'signs_synchronicity', 'verification', 'general'],
  ['เมื่อคืนฝันว่าเห็นพระพิฆเนศ หมายถึงอะไร', 'spiritual_unseen', 'dreams', 'open', 'general'],
  ['Am I protected by Ganesha?', 'spiritual_unseen', 'divine_protection', 'verification', 'self'],
  ['Is there a spirit in my house?', 'spiritual_unseen', 'unseen_influence', 'verification', 'self'],
  ['ฉันโดนคุณไสยหรือเปล่า', 'spiritual_unseen', 'unseen_influence', 'verification', 'self']
];

for (const [question, domain, facet, type, perspective] of cases) {
  const result = A.analyze(question);
  assert(result.domain === domain, `${question} → expected domain ${domain}, got ${result.domain}`);
  assert(result.facet === facet, `${question} → expected facet ${facet}, got ${result.facet}`);
  assert(result.questionType === type, `${question} → expected type ${type}, got ${result.questionType}`);
  assert(result.perspective === perspective, `${question} → expected perspective ${perspective}, got ${result.perspective}`);
  assert(result.confidence >= 0.45 && result.confidence <= 0.99, 'Confidence out of range.');
}

const ambiguous = A.analyze('งานนี้จะทำให้ความสัมพันธ์ของเราดีขึ้นไหม');
assert(ambiguous.ambiguous === true, 'Mixed work/relationship question should request focus clarification.');
assert(ambiguous.candidates.includes('work_purpose') && ambiguous.candidates.includes('love_relationships'), 'Ambiguity candidates are wrong.');
assert(A.withDomain(ambiguous, 'love_relationships').ambiguous === false, 'Resolved focus must clear ambiguity.');

assert(A.analyze('ฉันจะชนะคดีไหม').boundary === 'legal', 'Legal outcome boundary missing.');
assert(A.analyze('หวยงวดหน้าจะออกเลขอะไร').boundary === 'gambling', 'Gambling boundary missing.');
assert(A.analyze('ฉันเป็นมะเร็งไหม').boundary === 'medical', 'Medical diagnosis boundary missing.');
assert(A.analyze('หุ้นตัวนี้จะขึ้นไหม').boundary === 'financial', 'Specific investment-prediction boundary missing.');
assert(A.analyze('ฉันจะตายเมื่อไหร่').boundary === 'death', 'Death timing boundary missing.');
assert(A.analyze('มีวิญญาณร้ายตามผมหรือเปล่า').epistemicMode === 'unseen-threat', 'Unseen-threat epistemic mode missing.');
assert(A.analyze('ผมมีสิ่งศักดิ์สิทธิ์องค์ไหนคุ้มครองอยู่หรือไม่').epistemicMode === 'symbolic-only', 'Spiritual symbolic-only epistemic mode missing.');

console.log('Question Analyzer intent/context tests: PASS');

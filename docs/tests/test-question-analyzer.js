'use strict';

const fs = require('fs');
const vm = require('vm');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
global.window = globalThis;
vm.runInThisContext(fs.readFileSync('js/question-analyzer.js', 'utf8'), { filename: 'js/question-analyzer.js' });
const A = globalThis.LGTQuestionAnalyzer;
assert(A?.version === 'question-analyzer-v3', 'Question Analyzer v3 did not initialize.');

const cases = [
  ['ผมหน้าตาดีแค่ไหนในสายตาชาวโลก', {domain:'self_image', facet:'appearance', questionType:'degree', target:'public', perspective:'public_view', metric:'appearance_quality'}],
  ['คนอื่นมองบุคลิกของฉันยังไง', {domain:'social_perception', facet:'how_others_see_me', questionType:'perception', target:'public', perspective:'public_view'}],
  ['ฉันมีเสน่ห์มากแค่ไหน', {domain:'self_image', facet:'attractiveness', questionType:'degree', target:'self'}],
  ['คนทั่วไปประทับใจฉันครั้งแรกแบบไหน', {domain:'social_perception', facet:'first_impression', questionType:'perception', target:'public'}],
  ['คนในที่ทำงานเคารพฉันไหม', {domain:'social_perception', facet:'respect', questionType:'perception'}],
  ['เขารักฉันไหม', {domain:'love_relationships', facet:'feelings', questionType:'feelings', target:'specific_other', perspective:'other_view'}],
  ['แฟนเก่าจะกลับมาคบกับฉันไหม', {domain:'love_relationships', facet:'reconciliation', questionType:'outlook', target:'ex'}],
  ['เราสองคนเข้ากันได้ไหม', {domain:'love_relationships', facet:'compatibility', questionType:'compatibility'}],
  ['ความสัมพันธ์นี้จะไปต่อไหม', {domain:'love_relationships', facet:'relationship_future', questionType:'outlook', target:'relationship'}],
  ['ฉันควรรับงานใหม่นี้ไหม', {domain:'work_purpose', facet:'new_job', questionType:'decision'}],
  ['ปีนี้มีโอกาสได้เลื่อนตำแหน่งไหม', {domain:'work_purpose', facet:'promotion', questionType:'probability', timeframe:'this_year'}],
  ['อาชีพของฉันควรไปทางไหน', {domain:'work_purpose', facet:'career_direction', questionType:'decision'}],
  ['ธุรกิจนี้มีโอกาสเติบโตไหม', {domain:'work_purpose', facet:'business', questionType:'probability'}],
  ['ผมจะรวยมั้ยในอีก 1 ปีข้างหน้า', {domain:'money_resources', facet:'wealth', questionType:'outlook', target:'self', metric:'wealth_level', timeframe:'1_year'}],
  ['รายได้ของฉันจะดีขึ้นในอีก 6 เดือนไหม', {domain:'money_resources', facet:'income', questionType:'outlook', timeframe:'6_months'}],
  ['หนี้ของฉันมีแนวโน้มลดลงไหม', {domain:'money_resources', facet:'debt', questionType:'outlook'}],
  ['ฉันควรไปต่อหรือหยุดกับเรื่องนี้', {domain:'choice_action', facet:'continue_or_stop', questionType:'decision'}],
  ['ควรรอก่อนหรือเดินหน้าเลย', {domain:'choice_action', facet:'move_or_wait', questionType:'decision'}],
  ['ฉันควรทำอะไรต่อ', {domain:'choice_action', facet:'next_step', questionType:'guidance'}],
  ['เรื่องนี้จะสำเร็จไหม', {domain:'outlook_opportunity', facet:'success', questionType:'probability'}],
  ['อุปสรรคสำคัญของเรื่องนี้คืออะไร', {domain:'outlook_opportunity', facet:'obstacle', questionType:'obstacle'}],
  ['เมื่อไหร่เรื่องนี้จะเริ่มชัดขึ้น', {domain:'outlook_opportunity', facet:'timing', questionType:'timing'}],
  ['ทำไมช่วงนี้ฉันรู้สึกหมดไฟ', {domain:'inner_growth', facet:'burnout', questionType:'cause'}],
  ['ฉันจะเยียวยาตัวเองอย่างไร', {domain:'inner_growth', facet:'healing', questionType:'guidance'}],
  ['อะไรทำให้ฉันกังวลมากขนาดนี้', {domain:'inner_growth', facet:'anxiety', questionType:'cause'}],
  ['ผมมีสิ่งศักดิ์สิทธิ์องค์ไหนคุ้มครองอยู่หรือไม่', {domain:'spiritual_unseen', facet:'divine_protection', questionType:'identification', epistemicMode:'symbolic-only'}],
  ['มีวิญญาณร้ายตามผมหรือเปล่า', {domain:'spiritual_unseen', facet:'unseen_influence', questionType:'verification', epistemicMode:'unseen-threat'}],
  ['ความฝันเมื่อคืนหมายถึงอะไร', {domain:'spiritual_unseen', facet:'dreams'}],
  ['ผมมีญาณหรือสัมผัสพิเศษไหม', {domain:'spiritual_unseen', facet:'spiritual_gifts', questionType:'verification'}],
  ['อดีตชาติผมเคยเป็นใคร', {domain:'spiritual_unseen', facet:'past_life', questionType:'identification'}],
  ['กรรมอะไรทำให้ชีวิตผมติดขัด', {domain:'spiritual_unseen', facet:'karma_destiny', questionType:'cause'}],
  ['เห็นเลข 11:11 บ่อยๆ เป็นสัญญาณอะไรไหม', {domain:'spiritual_unseen', facet:'signs_synchronicity'}],
  ['How attractive am I to people in general?', {domain:'self_image', facet:'attractiveness', questionType:'degree', target:'public', perspective:'public_view'}],
  ['What does she think of me?', {domain:'social_perception', questionType:'perception', target:'specific_other', perspective:'other_view'}],
  ['Does he love me?', {domain:'love_relationships', facet:'feelings', questionType:'feelings', target:'specific_other'}],
  ['Should I accept this new job?', {domain:'work_purpose', facet:'new_job', questionType:'decision'}],
  ['Will I become wealthy over the next 1 year?', {domain:'money_resources', facet:'wealth', questionType:'outlook', timeframe:'1_year'}],
  ['Will my income improve over the next 6 months?', {domain:'money_resources', facet:'income', questionType:'outlook', timeframe:'6_months'}],
  ['Should I wait or move forward?', {domain:'choice_action', facet:'move_or_wait', questionType:'decision'}],
  ['What is the main obstacle here?', {domain:'outlook_opportunity', facet:'obstacle', questionType:'obstacle'}],
  ['How can I recover from burnout?', {domain:'inner_growth', facet:'burnout', questionType:'guidance'}],
  ['Which deity protects me?', {domain:'spiritual_unseen', facet:'divine_protection', questionType:'identification'}],
  ['Is there a spirit following me?', {domain:'spiritual_unseen', facet:'unseen_influence', questionType:'verification', epistemicMode:'unseen-threat'}],
  ['What does this recurring dream mean?', {domain:'spiritual_unseen', facet:'dreams'}],
  ['What does seeing 11:11 keep signaling to me?', {domain:'spiritual_unseen', facet:'signs_synchronicity'}],
  ['If I change jobs, will my income improve?', {domain:'money_resources', facet:'income', questionType:'outlook', conditional:true}],
  ['ถ้าผมย้ายงาน รายได้จะดีขึ้นไหม', {domain:'money_resources', facet:'income', questionType:'outlook', conditional:true}],
  ['อยู่บริษัทเดิมกับย้ายงาน แบบไหนดีกว่า', {questionType:'comparison', comparison:true}],
];

for (const [question, expected] of cases) {
  const result = A.analyze(question);
  for (const [key, value] of Object.entries(expected)) {
    assert(result[key] === value, `${question} → expected ${key}=${value}, got ${result[key]}`);
  }
  assert(result.confidence >= 0.45 && result.confidence <= 0.99, `${question}: confidence out of range.`);
}

const tf = [
  ['อีก 3 วัน', '3_days'], ['อีก 2 สัปดาห์', '2_weeks'], ['อีก 6 เดือน', '6_months'], ['อีก 2 ปี', '2_years'],
  ['next week', 'next_week'], ['next month', 'next_month'], ['next year', 'next_year'], ['by the end of the year', 'end_of_year']
];
for (const [time, expected] of tf) {
  const q = /[ก-๙]/u.test(time) ? `รายได้ของฉันจะดีขึ้นใน${time}ไหม` : `Will my income improve ${time}?`;
  const r = A.analyze(q);
  assert(r.timeframe === expected, `${q}: expected timeframe ${expected}, got ${r.timeframe}`);
  assert(r.timeframeMeta.explicit === true, `${q}: explicit timeframe not preserved.`);
  assert(r.timeframeMeta.labels.en && r.timeframeMeta.labels.th, `${q}: bilingual timeframe labels missing.`);
}

const ambiguous = A.analyze('งานนี้จะทำให้ความสัมพันธ์ของเราดีขึ้นไหม');
assert(ambiguous.ambiguous === true, 'Mixed work/relationship question should request focus clarification.');
assert(ambiguous.candidates.includes('work_purpose') && ambiguous.candidates.includes('love_relationships'), 'Ambiguity candidates are wrong.');
assert(A.withDomain(ambiguous, 'love_relationships').ambiguous === false, 'Resolved focus must clear ambiguity.');

const conditional = A.analyze('ถ้าผมเปลี่ยนงาน รายได้จะดีขึ้นไหม');
assert(conditional.conditional === true && conditional.multiQuestion === false, 'Conditional single question was misread as multiple questions.');
const multiple = A.analyze('ผมจะรวยไหม แล้วแฟนจะกลับมาไหม');
assert(multiple.multiQuestion === true, 'Two independent questions should be detected as multi-question.');

assert(A.analyze('ฉันจะชนะคดีไหม').boundary === 'legal', 'Legal outcome boundary missing.');
assert(A.analyze('หวยงวดหน้าจะออกเลขอะไร').boundary === 'gambling', 'Gambling boundary missing.');
assert(A.analyze('ฉันเป็นมะเร็งไหม').boundary === 'medical', 'Medical diagnosis boundary missing.');
assert(A.analyze('หุ้นตัวนี้จะขึ้นไหม').boundary === 'financial', 'Specific investment-prediction boundary missing.');
assert(A.analyze('ฉันจะตายเมื่อไหร่').boundary === 'death', 'Death timing boundary missing.');

// Generated bilingual robustness corpus: hundreds of natural variants must preserve the named subject.
const seeds = [
  {th:['หน้าตา','รูปลักษณ์','เสน่ห์'], en:['appearance','looks','attractiveness'], domain:'self_image'},
  {th:['ความรัก','ความสัมพันธ์','แฟน'], en:['love life','relationship','romantic relationship'], domain:'love_relationships'},
  {th:['งาน','อาชีพ','โปรเจกต์'], en:['job','career','project'], domain:'work_purpose'},
  {th:['เงิน','รายได้','ฐานะ'], en:['money','income','financial position'], domain:'money_resources'},
  {th:['ความกังวล','สภาพใจ','การเยียวยา'], en:['anxiety','inner state','healing'], domain:'inner_growth'},
  {th:['ความฝัน','กรรม','สิ่งศักดิ์สิทธิ์'], en:['dream','karma','deity'], domain:'spiritual_unseen'}
];
let generated = 0;
for (const seed of seeds) {
  for (const term of seed.th) {
    for (const frame of [
      `${term}ของฉันตอนนี้เป็นอย่างไร`, `${term}ของฉันมีแนวโน้มอย่างไรในปีนี้`, `ฉันควรมองเรื่อง${term}อย่างไร`,
      `อะไรสำคัญที่สุดในเรื่อง${term}ของฉัน`, `ฉันควรเข้าใจเรื่อง${term}ของฉันอย่างไร`, `อีก 6 เดือนเรื่อง${term}ของฉันจะเป็นอย่างไร`,
      `เรื่อง${term}ของฉันมีอะไรที่ควรระวัง`, `เรื่อง${term}ของฉันมีจุดแข็งอะไร`
    ]) {
      const r=A.analyze(frame); assert(r.domain===seed.domain, `${frame}: domain drifted to ${r.domain}`); generated++;
    }
  }
  for (const term of seed.en) {
    for (const frame of [
      `What should I understand about my ${term}?`, `What is the outlook for my ${term} this year?`, `How should I think about my ${term} right now?`,
      `What matters most in my ${term}?`, `What am I missing about my ${term}?`, `How might my ${term} develop over the next 6 months?`,
      `What should I be careful about with my ${term}?`, `What is working well in my ${term}?`
    ]) {
      const r=A.analyze(frame); assert(r.domain===seed.domain, `${frame}: domain drifted to ${r.domain}`); generated++;
    }
  }
}
assert(generated >= 280, 'Generated robustness corpus is too small.');

console.log(`Question Analyzer v3 semantic-slot tests: PASS (${cases.length + tf.length + generated}+ cases)`);

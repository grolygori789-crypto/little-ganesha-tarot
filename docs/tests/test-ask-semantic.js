'use strict';
const fs=require('fs'), vm=require('vm');
const assert=(c,m)=>{if(!c) throw new Error(m)};
global.window=globalThis;
function load(p){vm.runInThisContext(fs.readFileSync(p,'utf8'),{filename:p});}
for(const p of ['js/reading-content.js','js/question-analyzer.js','js/question-contract.js','js/ask-content.js','js/ask-context.js','js/ask-semantic.js']) load(p);
const CONTENT=globalThis.LGTReadingContent, A=globalThis.LGTQuestionAnalyzer, S=globalThis.LGTAskSemantic;
assert(S?.version==='ask-semantic-v1','Semantic Ask did not initialize.');

function check(question, cardId, lang, checks){
  const a=A.analyze(question); const r=S.compose(cardId,a,lang);
  assert(r && r.validation?.ok, `${question}/${cardId}/${lang}: semantic contract failed: ${JSON.stringify(r?.validation)}`);
  assert(!r.fallbackUsed, `${question}/${cardId}/${lang}: unexpected fallback.`);
  for(const [label, predicate] of checks) assert(predicate(r,a), `${question}/${cardId}/${lang}: ${label}`);
  return r;
}

const wealthTh=check('ผมจะรวยมั้ยในอีก 1 ปีข้างหน้า','19','th',[
  ['must discuss wealth/finance',r=>/ฐานะ|มั่งคั่ง|การเงิน|รวย/.test(r.direct)],
  ['must preserve one-year timeframe',r=>/1 ปีข้างหน้า/.test(r.direct)],
  ['must state a direction',r=>/สนับสนุน|โอกาส|แรงกดดัน|แรงต้าน|ผสม/.test(r.direct)],
  ['must not drift to today',r=>!/วันนี้/.test(r.direct+' '+r.rationale)],
  ['must not guarantee riches',r=>!/รวยแน่นอน|รับประกันว่า.*รวย|ชัวร์ว่า.*รวย/.test(r.direct)]
]);
assert(/ดวงอาทิตย์/.test(wealthTh.rationale) && /ความสุข|พลังชีวิต|ความชัดเจน/.test(wealthTh.rationale),'The Sun rationale lost card identity/symbolism.');

const wealthEn=check('Will I become wealthy over the next 1 year?','19','en',[
  ['must discuss wealth/finance',r=>/wealth|financial|rich/i.test(r.direct)],
  ['must preserve one-year timeframe',r=>/the next 1 year/i.test(r.direct)],
  ['must not drift to today',r=>!/\btoday\b/i.test(r.direct+' '+r.rationale)],
  ['must avoid guarantees',r=>!/guaranteed to become rich|definitely will become rich/i.test(r.direct)]
]);
assert(/The Sun/i.test(wealthEn.rationale),'English rationale lost card identity.');

const appearanceTh=check('ผมหน้าตาดีแค่ไหนในสายตาชาวโลก','69','th',[
  ['must discuss appearance',r=>/หน้าตา|รูปลักษณ์/.test(r.direct)],
  ['must preserve public perspective',r=>/คนอื่น|คนทั่วไป|สายตา/.test(r.direct)],
  ['must not turn into finance',r=>!/หนี้|รายได้|การเงิน/.test(r.direct)]
]);
assert(/หกเหรียญ|การให้|ความเอื้อเฟื้อ|สมดุล|ความเป็นธรรม/.test(appearanceTh.rationale),'Six of Pentacles rationale lost card symbolism.');

check('How attractive am I to people in general?','69','en',[
  ['must discuss attractiveness',r=>/attract|appearance|looks|appeal/i.test(r.direct)],
  ['must preserve other-people perspective',r=>/people|others|public/i.test(r.direct)]
]);

check('เขารักฉันไหม','06','th',[
  ['must preserve third-party uncertainty',r=>/ไม่สามารถยืนยัน.*ความคิด|ไม่สามารถยืนยัน.*ความรู้สึก/.test(r.direct)],
  ['must remain relationship-focused',r=>/ความรู้สึก|ความสัมพันธ์|อีกฝ่าย/.test(r.direct)]
]);
check('Does he love me?','06','en',[
  ['must preserve third-party uncertainty',r=>/cannot verify another person/i.test(r.direct)],
  ['must remain relationship-focused',r=>/relationship|feelings|other person/i.test(r.direct)]
]);

check('ผมมีสิ่งศักดิ์สิทธิ์องค์ไหนคุ้มครองอยู่หรือไม่','05','th',[
  ['must state symbolic boundary',r=>/ไม่สามารถยืนยันข้อเท็จจริงเหนือธรรมชาติ/.test(r.direct)],
  ['must address protection',r=>/คุ้มครอง|สิ่งศักดิ์สิทธิ์|การปกป้อง/.test(r.direct+' '+r.rationale)]
]);
check('มีวิญญาณร้ายตามผมหรือเปล่า','18','th',[
  ['must not confirm unseen threat',r=>/ไม่สามารถยืนยัน.*วิญญาณ/.test(r.direct)],
  ['must say fear is not evidence',r=>/ความกลัว.*หลักฐาน/.test(r.direct)]
]);

check('ถ้าผมย้ายงาน รายได้จะดีขึ้นไหม','19','th',[
  ['conditional money question stays on income',r=>/รายได้/.test(r.direct)],
  ['must not answer primarily about job feelings',r=>!/ความสุขในงานเป็นคำตอบหลัก/.test(r.direct)]
]);
check('Should I wait or move forward?','12','en',[
  ['decision must give action direction',r=>/moving forward|slowing down|reassessing|practical factors/i.test(r.direct)]
]);

// Cross-product semantic gate: every card must produce a valid answer in every context and language.
const representative={
  self_image:{th:'ฉันมีเสน่ห์มากแค่ไหน',en:'How attractive am I?'},
  social_perception:{th:'คนทั่วไปมองฉันอย่างไร',en:'How do people in general see me?'},
  love_relationships:{th:'ความสัมพันธ์นี้มีแนวโน้มไปทางไหน',en:'Where is this relationship heading?'},
  work_purpose:{th:'งานของฉันมีแนวโน้มอย่างไร',en:'What is the outlook for my career?'},
  money_resources:{th:'ฐานะการเงินของฉันมีแนวโน้มอย่างไร',en:'What is the outlook for my finances?'},
  choice_action:{th:'ฉันควรทำอะไรต่อ',en:'What should I do next?'},
  outlook_opportunity:{th:'เรื่องนี้มีแนวโน้มอย่างไร',en:'What is the outlook here?'},
  inner_growth:{th:'ตอนนี้ฉันควรเข้าใจตัวเองเรื่องอะไร',en:'What should I understand about myself right now?'},
  spiritual_unseen:{th:'เส้นทางทางจิตวิญญาณของฉันสะท้อนอะไร',en:'What does my spiritual path reflect?'}
};
let count=0;
for(const card of CONTENT.cards){
  for(const [domain,qs] of Object.entries(representative)){
    for(const lang of ['th','en']){
      let a=A.analyze(qs[lang]);
      if(a.domain!==domain) a=A.withDomain(a,domain);
      const r=S.compose(card,a,lang);
      assert(r?.validation?.ok, `${card.id}/${domain}/${lang}: semantic validation failed ${JSON.stringify(r?.validation)}`);
      assert(!r.fallbackUsed, `${card.id}/${domain}/${lang}: fallback used.`);
      for(const field of ['direct','rationale','condition','ganesha','reflection']) assert(typeof r[field]==='string' && r[field].trim().length>=20,`${card.id}/${domain}/${lang}: weak ${field}.`);
      assert(!/undefined|null/.test(r.direct+' '+r.rationale+' '+r.condition),`${card.id}/${domain}/${lang}: interpolation defect.`);
      count++;
    }
  }
}
assert(count===78*9*2,`Expected 1404 semantic cross-product readings, got ${count}.`);
console.log(`Semantic Ask no-drift + 78×9×2 contract tests: PASS (${count} readings)`);

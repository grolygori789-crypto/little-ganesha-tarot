'use strict';
const fs=require('fs'),vm=require('vm'); const assert=(c,m)=>{if(!c)throw new Error(m)};
global.window=globalThis; function load(p){vm.runInThisContext(fs.readFileSync(p,'utf8'),{filename:p});}
load('js/reading-content.js'); load('js/question-analyzer.js'); load('js/ask-context.js');
const CONTENT=globalThis.LGTReadingContent,A=globalThis.LGTQuestionAnalyzer,C=globalThis.LGTAskContext;
assert(C?.version==='ask-context-v2','Ask Context did not initialize.');
const domains=['self_image','social_perception','love_relationships','work_purpose','money_resources','choice_action','outlook_opportunity','inner_growth','spiritual_unseen'];
assert(C.spiritualContextCount===78,'Spiritual context must contain 78 curated bilingual entries.');
let count=0;
for(const card of CONTENT.cards) for(const domain of domains) for(const lang of ['en','th']){
  const a=Object.freeze({domain,facet:'general',questionType:'open',perspective:'general',timeframe:'unspecified',epistemicMode:domain==='spiritual_unseen'?'symbolic-only':'standard'});
  const out=C.interpret(card,a,lang);
  assert(out?.contextKey===domain,`${card.id}/${domain}/${lang}: missing base context.`);
  for(const f of ['contextLabel','direct','rationale','reflection']) assert(typeof out[f]==='string'&&out[f].trim().length>=12,`${card.id}/${domain}/${lang}: weak ${f}.`);
  count++;
}
const protector=C.interpret('05',A.analyze('ผมมีสิ่งศักดิ์สิทธิ์องค์ไหนคุ้มครองอยู่หรือไม่'),'th');
assert(/ไม่สามารถระบุชื่อหรือยืนยัน|ไม่สามารถยืนยัน/.test(protector.direct),'Base spiritual context lost epistemic boundary.');
for(const id of ['15','16','18','58','59']){
  const out=C.interpret(id,A.analyze('มีวิญญาณร้ายตามผมหรือเปล่า'),'th');
  assert(out.direct.includes('ไม่สามารถยืนยัน'),`${id}: unseen-threat base context must not confirm a threat.`);
}
console.log(`Ask Context 9-family bilingual matrix tests: PASS (${count} readings)`);

'use strict';
const fs=require('fs'); const vm=require('vm'); const assert=(v,m)=>{if(!v)throw new Error(m);};
global.window=globalThis;
class StorageMock{constructor(){this.m=new Map()}getItem(k){return this.m.has(k)?this.m.get(k):null}setItem(k,v){this.m.set(String(k),String(v))}removeItem(k){this.m.delete(String(k))}clear(){this.m.clear()}}
global.localStorage=new StorageMock();
const load=p=>vm.runInThisContext(fs.readFileSync(p,'utf8'),{filename:p});
load('js/reading-content.js'); load('js/reading-engine.js'); load('js/ask-content.js'); load('js/question-analyzer.js'); load('js/question-contract.js'); load('js/ask-context.js'); load('js/ask-semantic.js'); load('js/ask-storage.js');
const A=globalThis.LGTQuestionAnalyzer,S=globalThis.LGTAskStorage,SEM=globalThis.LGTAskSemantic,C=globalThis.LGTReadingContent;
const date='2026-08-23', card=C.getCard('19')||C.cards[0];
const pairs=[
 ['ปีนี้ผมจะรวยไหม','ภายในปีนี้การเงินผมจะดีขึ้นมากไหม',true],
 ['ปีนี้ผมจะรวยไหม','Do I have a strong chance of becoming wealthier this year?',true],
 ['Will I get rich this year?','Will my finances improve a lot this year?',true],
 ['ปีนี้รายได้ผมจะเพิ่มไหม','ปีนี้เงินเดือนหรือรายได้จะดีขึ้นไหม',true],
 ['ปีนี้ผมจะได้เลื่อนตำแหน่งไหม','ปีนี้มีโอกาสได้โปรโมตไหม',true],
 ['Will I get promoted this year?','Do I have a chance of a promotion this year?',true],
 ['ปีนี้การเงินผมจะมั่นคงไหม','ปีนี้การเงินจะมั่นคงขึ้นไหม',true],
 ['ผมดูดีไหม','Am I good-looking?',true],
 ['ผมมีเสน่ห์ไหม','Am I attractive?',true],
 ['คนอื่นมองผมยังไง','How do other people see me?',true],
 ['ผมควรรอหรือเดินหน้าดี','ตอนนี้ควรเดินหน้าหรือรอก่อน',true],
 ['Should I wait or move forward?','Is it better to move forward or wait?',true],
 ['ผมกำลังหมดไฟไหม','ตอนนี้รู้สึก burnout หรือเปล่า',true],
 ['Am I burned out?','Could this be burnout?',true],
 ['ผมควรเยียวยาตัวเองยังไง','How should I focus on healing?',true],
 ['เส้นทางจิตวิญญาณของผมไปทางไหน','What direction is my spiritual path taking?',true],
 ['โปรเจกต์นี้จะสำเร็จไหม','งานนี้มีโอกาสสำเร็จไหม',true],
 ['Will this project succeed?','Does this project have a good chance of success?',true],
 ['ความสัมพันธ์นี้จะไปต่อไหม','Will this relationship continue?',true],
 ['แฟนเก่าจะกลับมาหาผมไหม','Will my ex come back to me?',true],
 ['Alice ยังชอบผมอยู่ไหม','Alice ยังมีใจให้ผมอยู่หรือเปล่า',true],
 ['Does Alice still like me?','Is Alice still attracted to me?',true],
 ['ผมมีสิ่งศักดิ์สิทธิ์คุ้มครองอยู่ไหม','ผมได้รับการคุ้มครองทางจิตวิญญาณอยู่หรือเปล่า',true],
 ['Am I spiritually protected?','Do I have spiritual protection around me?',true],
 ['ปีนี้ผมจะรวยไหม','ปีหน้าผมจะรวยไหม',false],
 ['Alice ยังชอบผมอยู่ไหม','Bob ยังชอบผมอยู่ไหม',false],
 ['ปีนี้ผมจะรวยไหม','ปีนี้ผมจะได้เลื่อนตำแหน่งไหม',false],
 ['Alice ยังชอบผมอยู่ไหม','Alice กับผมเข้ากันได้ไหม',false],
 ['ปีนี้รายได้ผมจะเพิ่มไหม','ปีนี้ผมจะปลดหนี้ได้ไหม',false],
 ['เดือนนี้การเงินผมจะดีขึ้นไหม','ปีนี้การเงินผมจะดีขึ้นไหม',false]
];
let n=0;
for(const [q1,q2,expected] of pairs){
  localStorage.clear(); const a1=A.analyze(q1), a2=A.analyze(q2); const fp='source-'+n;
  assert(S.save({fingerprint:fp,cardId:card.id,sessionId:'session-'+n,analysis:a1,localDate:date}),'Could not save source semantic reading.');
  const match=S.findSemantic(a2,{excludeFingerprint:'other-'+n,localDate:date});
  assert(Boolean(match)===expected,`Semantic match mismatch for: ${q1} <> ${q2}`);
  if(expected){
    assert(match.cardId===card.id&&match.matchType==='semantic','Semantic duplicate must restore the same card.');
    const snap=match.analysisSnapshot;
    const restored=Object.freeze({...a2,...snap,text:a2.text,timeframeMeta:snap?.timeframeMeta||a2.timeframeMeta,ambiguous:false,candidates:Object.freeze([snap?.domain||a2.domain])});
    for(const lang of ['th','en']){
      const original=SEM.compose(card,a1,lang);
      const repeated=SEM.compose(card,restored,lang);
      for(const key of ['contextLabel','direct','rationale','condition','ganesha','reflection']){
        assert(original[key]===repeated[key],`Semantic duplicate changed user-facing ${lang} ${key} for: ${q1} <> ${q2}`);
      }
      assert(original.cardId===repeated.cardId&&original.domain===repeated.domain&&original.facet===repeated.facet,`Semantic duplicate changed ${lang} reading identity.`);
    }
  }
  n++;
}
const raw=localStorage.getItem(S.key)||'';
assert(!raw.includes('spiritual protection around me')&&!raw.includes('คุ้มครองทางจิตวิญญาณ'),'Semantic storage must not persist raw question text.');
console.log(`Ask bilingual semantic duplicate lock tests: PASS (${pairs.length} cases)`);

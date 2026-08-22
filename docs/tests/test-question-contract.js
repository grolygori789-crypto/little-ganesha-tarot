'use strict';
const fs=require('fs'); const vm=require('vm');
const assert=(c,m)=>{if(!c)throw new Error(m)}; global.window=globalThis;
for(const p of ['js/question-analyzer.js','js/question-contract.js']) vm.runInThisContext(fs.readFileSync(p,'utf8'),{filename:p});
const A=globalThis.LGTQuestionAnalyzer, C=globalThis.LGTQuestionContract;
assert(C?.version==='question-contract-v1','Question Contract did not initialize.');

const wealth=A.analyze('ผมจะรวยมั้ยในอีก 1 ปีข้างหน้า');
const wc=C.build(wealth);
assert(wc.domain==='money_resources' && wc.facet==='wealth','Wealth contract subject mismatch.');
assert(wc.metric==='wealth_level','Wealth metric missing.');
assert(wc.timeframe==='1_year' && wc.timeframeMeta.explicit,'Explicit one-year contract missing.');
for(const key of ['topic','direction','card_rationale','condition','timeframe','metric']) assert(wc.mustCover.includes(key),`Wealth contract missing ${key}.`);
assert(wc.mustAvoid.includes('domain_drift') && wc.mustAvoid.includes('unsupported_certainty'),'Wealth no-drift/certainty constraints missing.');
assert(wc.topic.th.includes('ฐานะ') || wc.topic.th.includes('ความมั่งคั่ง'),'Native TH wealth topic missing.');
assert(/wealth|financial/i.test(wc.topic.en),'Native EN wealth topic missing.');

const appearance=C.build(A.analyze('ผมหน้าตาดีแค่ไหนในสายตาชาวโลก'));
assert(appearance.facet==='appearance' && appearance.perspective==='public_view','Appearance/public contract mismatch.');
assert(appearance.topic.anchors.th.some(v=>/หน้าตา|รูปลักษณ์/.test(v)),'Appearance TH anchor missing.');
assert(appearance.mustAvoid.includes('domain_drift'),'Appearance no-drift contract missing.');

const feelings=C.build(A.analyze('เขารักฉันไหม'));
assert(feelings.mustCover.includes('third_party_boundary'),'Third-party feelings boundary missing from contract.');
assert(feelings.mustAvoid.includes('mind_reading_claim'),'Mind-reading prohibition missing.');

const spiritual=C.build(A.analyze('ผมมีสิ่งศักดิ์สิทธิ์องค์ไหนคุ้มครองอยู่หรือไม่'));
assert(spiritual.mustCover.includes('epistemic_boundary'),'Spiritual epistemic boundary missing.');
assert(spiritual.mustAvoid.includes('supernatural_fact_claim'),'Supernatural-fact prohibition missing.');

console.log('Question Contract no-drift requirements: PASS');

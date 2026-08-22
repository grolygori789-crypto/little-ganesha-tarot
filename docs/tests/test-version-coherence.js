'use strict';
const fs=require('fs'); const assert=(c,m)=>{if(!c)throw new Error(m)}; const read=p=>fs.readFileSync(p,'utf8'); const TARGET='0.5.0';
const index=read('index.html'),app=read('js/app.js'),sw=read('sw.js'),readme=read('README.md'),release=read('docs/releases/RELEASE_NOTES_V0_5_0.md'),qa=read('docs/qa/QA_V0_5_0.md');
assert(index.includes(`application-version" content="${TARGET}"`)&&index.includes(`data-build="${TARGET}"`)&&index.includes(`BUILD ${TARGET}`),'index version mismatch.'); assert(app.includes(`window.LGT_BUILD = '${TARGET}'`),'app version mismatch.'); assert(sw.includes(`const BUILD = '${TARGET}'`),'SW version mismatch.');
for(const stale of ['0.4.9'])for(const [label,text] of [['index',index],['app',app],['sw',sw]])assert(!text.includes(stale),`${label} contains stale live ${stale} marker.`);
assert(readme.includes('**Target runtime:** V0.5.0')&&readme.includes('**Baseline runtime:** V0.4.9'),'README target/baseline mismatch.'); assert(release.includes('V0.5.0')&&qa.includes('V0.5.0'),'Release/QA version mismatch.');
const m=JSON.parse(read('PATCH_MANIFEST_V0_5_0.json')); assert(m.release==='V0.5.0'&&m.baseline_head==='4e7fc783b61c651f8827272f387f5d822ad2ff49','Manifest version/baseline mismatch.');
console.log('V0.5.0 hard version-coherence checks: PASS');

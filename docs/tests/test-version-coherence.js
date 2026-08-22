'use strict';
const fs=require('fs'); const assert=(c,m)=>{if(!c)throw new Error(m)}; const read=p=>fs.readFileSync(p,'utf8'); const TARGET='0.5.1';
const index=read('index.html'),app=read('js/app.js'),sw=read('sw.js'),readme=read('README.md'),release=read('docs/releases/RELEASE_NOTES_V0_5_1.md'),qa=read('docs/qa/QA_V0_5_1.md');
assert(index.includes(`application-version" content="${TARGET}"`)&&index.includes(`data-build="${TARGET}"`)&&index.includes(`BUILD ${TARGET}`),'index live marker mismatch.');
assert(app.includes(`window.LGT_BUILD = '${TARGET}'`)&&sw.includes(`const BUILD = '${TARGET}';`),'runtime build mismatch.');
assert(readme.includes('**Target runtime:** V0.5.1')&&readme.includes('**Baseline runtime:** V0.5.0'),'README target/baseline mismatch.');
assert(release.includes('V0.5.1')&&qa.includes('V0.5.1'),'Release/QA version mismatch.');
const m=JSON.parse(read('PATCH_MANIFEST_V0_5_1.json')); assert(m.release==='V0.5.1'&&m.baseline_head==='e437f063d5e153183241c37fda7b5e5200a40ea9','Manifest version/baseline mismatch.');
console.log('V0.5.1 hard version-coherence checks: PASS');

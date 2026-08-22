'use strict';
const fs=require('fs'); const assert=(v,m)=>{if(!v)throw new Error(m);}; const read=p=>fs.readFileSync(p,'utf8'); const TARGET='0.5.2';
const index=read('index.html'), app=read('js/app.js'), sw=read('sw.js');
assert(index.includes(`application-version" content="${TARGET}"`)&&index.includes(`data-build="${TARGET}"`)&&index.includes(`BUILD ${TARGET}`),'index V0.5.2 live markers mismatch.');
assert(app.includes(`window.LGT_BUILD = '${TARGET}'`),'app runtime marker mismatch.');
assert(sw.includes(`const BUILD = '${TARGET}';`),'service worker runtime marker mismatch.');
for(const path of ['js/reading-day.js','js/three-storage.js','js/reading-ui.js','js/ask-storage.js','js/ask-ui.js','js/three-ui.js']){
  assert(index.includes(`${path}?v=${TARGET}`),`index missing V0.5.2 module: ${path}`);
  assert(sw.includes(`${path}?v=${TARGET}`),`SW missing V0.5.2 module: ${path}`);
}
assert(!/\?v=0\.5\.1/.test(index),'Stale V0.5.1 query marker remains in index.');
assert(!/\?v=0\.5\.1/.test(sw),'Stale V0.5.1 query marker remains in service worker.');
console.log('V0.5.2 hard runtime/cache coherence checks: PASS');

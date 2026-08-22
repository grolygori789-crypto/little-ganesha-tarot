'use strict';
const fs=require('fs'); const assert=(x,m)=>{if(!x)throw new Error(m)};
const index=fs.readFileSync('index.html','utf8'),app=fs.readFileSync('js/app.js','utf8'),sw=fs.readFileSync('sw.js','utf8');
assert(index.includes('application-version" content="0.5.1"'),'index application-version mismatch');
assert(index.includes('data-build="0.5.1"')&&index.includes('BUILD 0.5.1'),'index visible/build markers mismatch');
assert(app.includes("window.LGT_BUILD = '0.5.1'"),'app build mismatch');
assert(sw.includes("const BUILD = '0.5.1'"),'service worker build mismatch');
console.log('V0.5.1 version coherence tests: PASS');

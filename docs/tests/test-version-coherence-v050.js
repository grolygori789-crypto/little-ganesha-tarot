'use strict';
const fs=require('fs'); const assert=(x,m)=>{if(!x)throw new Error(m);};
const index=fs.readFileSync('index.html','utf8'),app=fs.readFileSync('js/app.js','utf8'),sw=fs.readFileSync('sw.js','utf8');
assert(index.includes('application-version" content="0.5.0"'),'index application-version mismatch');
assert(index.includes('data-build="0.5.0"')&&index.includes('BUILD 0.5.0'),'index visible/build markers mismatch');
assert(app.includes("window.LGT_BUILD = '0.5.0'"),'app build mismatch');
assert(sw.includes("const BUILD = '0.5.0'"),'service worker build mismatch');
assert(!/0\.4\.9/.test(index+app+sw),'Stale 0.4.9 live marker remains.');
console.log('V0.5.0 version coherence tests: PASS');

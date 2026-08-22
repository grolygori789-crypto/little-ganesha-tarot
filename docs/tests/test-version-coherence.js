'use strict';
const fs=require('fs'); const assert=(c,m)=>{if(!c)throw new Error(m)}; const read=p=>fs.readFileSync(p,'utf8');
const TARGET='0.4.6';
const index=read('index.html'),app=read('js/app.js'),sw=read('sw.js'),readme=read('README.md');
const release=read('docs/releases/RELEASE_NOTES_V0_4_6.md'),qa=read('docs/qa/QA_V0_4_6.md');
assert(index.includes(`meta name="application-version" content="${TARGET}"`),'HTML application-version mismatch.');
assert(index.includes(`body data-build="${TARGET}"`),'HTML data-build mismatch.');
assert(index.includes(`BUILD ${TARGET}`),'Visible BUILD mismatch.');
assert(app.includes(`window.LGT_BUILD = '${TARGET}'`),'window.LGT_BUILD mismatch.');
assert(sw.includes(`const BUILD = '${TARGET}';`),'SW BUILD mismatch.');
const idx=[...index.matchAll(/(?:href|src)="((?:manifest\.webmanifest|css\/[^"?]+|js\/[^"?]+)\?v=([0-9.]+))"/g)];
assert(idx.length>=17,'Too few versioned index resources.'); for(const[,r,v]of idx)assert(v===TARGET,`Mixed index version ${v}: ${r}`);
const swr=[...sw.matchAll(/url\('((?:manifest\.webmanifest|css\/[^'?]+|js\/[^'?]+)\?v=([0-9.]+))'\)/g)];
assert(swr.length>=17,'Too few versioned SW resources.'); for(const[,r,v]of swr)assert(v===TARGET,`Mixed SW version ${v}: ${r}`);
for(const[label,text]of [['index',index],['app',app],['sw',sw]]) assert(!text.includes('0.4.5'),`${label} contains stale live 0.4.5 marker.`);
assert(readme.includes('**Target runtime:** V0.4.6'),'README target mismatch.');
assert(readme.includes('V0.4.5 at GitHub HEAD'),'Candidate/baseline distinction missing.');
assert(release.includes('Release Notes V0.4.6'),'Release notes mismatch.');
assert(qa.includes('QA Report — V0.4.6'),'QA report mismatch.');
if(fs.existsSync('PATCH_MANIFEST_V0_4_6.json')){
 const m=JSON.parse(read('PATCH_MANIFEST_V0_4_6.json'));
 assert(m.target_runtime_build===TARGET,'Manifest target mismatch.');
 assert(m.baseline_runtime_build==='0.4.5','Manifest baseline runtime mismatch.');
 assert(m.baseline_repository_head==='0b35a8ec749644abc66c300e3b197e29365951da','Manifest baseline HEAD mismatch.');
}
console.log('V0.4.6 hard version-coherence checks: PASS');

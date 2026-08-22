'use strict';
const fs=require('fs'),vm=require('vm'); global.window=globalThis;
function load(path){vm.runInThisContext(fs.readFileSync(path,'utf8'),{filename:path});}
load('js/reading-content.js'); load('js/three-narrative.js');
const C=window.LGTReadingContent,N=window.LGTThreeNarrative; const assert=(x,m)=>{if(!x)throw new Error(m);};
assert(N.profileCount===78,'Three-card narrative must have 78 card profiles.');
const unsafe=/guarantee(?:d|s)?|definitely will|certainly will|fixed fate|รับประกัน|แน่นอนว่าจะ|ถูกกำหนดให้/i;
let checked=0;
for(let a=0;a<78;a+=7){for(let b=1;b<78;b+=9){for(let c=2;c<78;c+=11){if(new Set([a,b,c]).size<3)continue;for(const lang of ['en','th']){const r=N.compose([C.cards[a],C.cards[b],C.cards[c]],lang);assert(r.positions.length===3,'Expected 3 position readings.');for(const key of ['story','turningPoint','pattern','guidance','reflection'])assert(typeof r[key]==='string'&&r[key].trim().length>25,`Missing ${lang} ${key}`);assert(!/undefined|null/.test(JSON.stringify(r)),'Narrative leaked undefined/null.');assert(!unsafe.test(`${r.story} ${r.guidance}`),'Unsafe deterministic language in narrative.');checked++;}}}}
const five=C.getCard('68'), strength=C.getCard('08'), sun=C.getCard('19');
const riseTh=N.compose([five,strength,sun],'th'); const riseEn=N.compose([five,strength,sun],'en');
assert(['clearer','improving'].includes(riseTh.trajectory),'Five Pentacles → Strength → Sun must read as improving.');
assert(riseTh.story.includes('ห้าเหรียญ')&&riseTh.story.includes('พละกำลัง')&&riseTh.story.includes('ดวงอาทิตย์'),'Thai story must actually blend all three cards.');
assert(riseEn.story.includes('Five of Pentacles')&&riseEn.story.includes('Strength')&&riseEn.story.includes('The Sun'),'English story must actually blend all three cards.');
const contrast=N.compose([C.getCard('19'),C.getCard('40'),C.getCard('51')],'en');
assert(['harder','tightening','mixed'].includes(contrast.trajectory),'Sun → Five Cups → Two Swords should not be falsely optimistic.');
const majors=N.compose([C.getCard('00'),C.getCard('08'),C.getCard('19')],'en');assert(majors.pattern.includes('Major Arcana'),'Major pattern missing.');
const cups=N.compose([C.getCard('36'),C.getCard('40'),C.getCard('45')],'en');assert(cups.pattern.includes('Cups'),'Suit-dominance pattern missing.');
console.log(`Three-card narrative native/semantic tests: PASS (${checked} bilingual samples)`);

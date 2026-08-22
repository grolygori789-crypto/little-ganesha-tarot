'use strict';
const assert=(c,m)=>{if(!c)throw new Error(m)};
let clicks=0, shared=0, status='';
global.window={setTimeout:(fn)=>fn()};
global.URL={createObjectURL:()=> 'blob:test', revokeObjectURL:()=>{}};
global.document={
  body:{appendChild:()=>{}},
  createElement:(tag)=> tag==='a' ? {href:'',download:'',click:()=>{clicks++},remove:()=>{}} : {}
};
Object.defineProperty(globalThis,'navigator',{value:{share:async()=>{shared++},canShare:()=>true},configurable:true});
require('../../js/reading-export.js');
const E=window.LGTReadingExport;
assert(E&&E.version==='reading-export-v1','Shared Reading Export v1 missing.');
const fakeCtx={font:'',measureText:s=>({width:String(s).length*10})};
assert(E.wrapCanvasText(fakeCtx,'one two three',45).length>=2,'Canvas wrapping helper failed.');
(async()=>{
  const blob=new Blob(['x'],{type:'image/png'});
  await E.execute({action:'save',buildBlob:async()=>blob,filename:'a.png',onStatus:s=>{status=s},messages:{saved:'saved',preparing:'prep'}});
  assert(clicks===1&&status==='saved','Save transport failed.');
  await E.execute({action:'share',buildBlob:async()=>blob,filename:'b.png',onStatus:s=>{status=s},messages:{shared:'shared',preparing:'prep'}});
  assert(shared===1&&status==='shared','Native share transport failed.');
  navigator.canShare=()=>false;
  await E.execute({action:'share',buildBlob:async()=>blob,filename:'c.png',onStatus:s=>{status=s},messages:{savedFallback:'fallback',preparing:'prep'}});
  assert(clicks===2&&status==='fallback','Share-to-save fallback failed.');
  console.log('Shared Reading Export transport tests: PASS');
})().catch(e=>{console.error(e);process.exit(1)});

(() => {
  'use strict';
  const ENGINE=window.LGTReadingEngine;
  const CONTENT=window.LGTReadingContent;
  const NARRATIVE=window.LGTObstacleNarrative;
  if(!ENGINE||!CONTENT||!NARRATIVE) throw new Error('obstacle focus storage requires Reading Engine, tarot content, and narrative.');
  const STORAGE_KEY='lgt.reading.obstacle.v1';
  const SCHEMA_VERSION=1;
  const ORIENTATION='upright';
  const FOCUS_IDS=Object.freeze(Object.keys(NARRATIVE.focuses));
  function emptyBox(localDate=ENGINE.localDateISO()){return {schemaVersion:SCHEMA_VERSION,contentVersion:CONTENT.version,spreadId:'obstacle',localDate,readings:{}};}
  function validReading(record,localDate=ENGINE.localDateISO()){return Boolean(record&&record.contentVersion===CONTENT.version&&record.spreadId==='obstacle'&&record.localDate===localDate&&typeof record.focusId==='string'&&NARRATIVE.focuses[record.focusId]&&Array.isArray(record.cards)&&record.cards.length===3&&record.cards.every(e=>e?.orientation===ORIENTATION&&CONTENT.getCard(e.cardId))&&new Set(record.cards.map(e=>e.cardId)).size===3);}
  function readBox(localDate=ENGINE.localDateISO()){
    try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return emptyBox(localDate);const box=JSON.parse(raw);if(box?.schemaVersion!==SCHEMA_VERSION||box?.contentVersion!==CONTENT.version||box?.spreadId!=='obstacle'||box?.localDate!==localDate||!box.readings||typeof box.readings!=='object')return emptyBox(localDate);const clean=emptyBox(localDate);for(const id of FOCUS_IDS){const r=box.readings[id];if(validReading(r,localDate))clean.readings[id]={...r,cards:r.cards.map(c=>({...c}))};}return clean;}catch(_){return emptyBox(localDate);}
  }
  function writeBox(box){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(box));return true;}catch(_){return false;}}
  function get(focusId,localDate=ENGINE.localDateISO()){if(!NARRATIVE.focuses[focusId])return null;const r=readBox(localDate).readings[focusId];return r?{...r,cards:r.cards.map(c=>({...c}))}:null;}
  function getAll(localDate=ENGINE.localDateISO()){const box=readBox(localDate);const out={};for(const [id,r] of Object.entries(box.readings))out[id]={...r,cards:r.cards.map(c=>({...c}))};return out;}
  function count(localDate=ENGINE.localDateISO()){return Object.keys(getAll(localDate)).length;}
  function save(session,focusId,localDate=ENGINE.localDateISO()){
    if(!session||session.spread?.id!=='obstacle'||session.state!=='interpreted'||!NARRATIVE.focuses[focusId])return false;
    const box=readBox(localDate);const record=session.toRecord(localDate);record.focusId=focusId;record.narrativeVersion=NARRATIVE.version;record.completedAt=new Date().toISOString();box.readings[focusId]=record;return writeBox(box);
  }
  function clearExpired(localDate=ENGINE.localDateISO()){try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return;const box=JSON.parse(raw);if(box?.localDate!==localDate)localStorage.removeItem(STORAGE_KEY);}catch(_){try{localStorage.removeItem(STORAGE_KEY);}catch(_){}}}
  window.LGTObstacleStorage=Object.freeze({key:STORAGE_KEY,schemaVersion:SCHEMA_VERSION,get,getAll,count,save,clearExpired});
})();

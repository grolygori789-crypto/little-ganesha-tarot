(() => {
  'use strict';
  const ENGINE=window.LGTReadingEngine;
  const CONTENT=window.LGTReadingContent;
  const NARRATIVE=window.LGTThreeFocusNarrative;
  if(!ENGINE||!CONTENT||!NARRATIVE) throw new Error('three focus storage requires Reading Engine, tarot content, and narrative.');
  const STORAGE_KEY='lgt.reading.three.v2';
  const LEGACY_KEY='lgt.reading.three.v1';
  const SCHEMA_VERSION=2;
  const ORIENTATION='upright';
  const FOCUS_IDS=Object.freeze(Object.keys(NARRATIVE.focuses));
  function emptyBox(localDate=ENGINE.localDateISO()){return {schemaVersion:SCHEMA_VERSION,contentVersion:CONTENT.version,spreadId:'three',localDate,readings:{}};}
  function validReading(record,localDate=ENGINE.localDateISO()){return Boolean(record&&record.contentVersion===CONTENT.version&&record.spreadId==='three'&&record.localDate===localDate&&typeof record.focusId==='string'&&NARRATIVE.focuses[record.focusId]&&Array.isArray(record.cards)&&record.cards.length===3&&record.cards.every(e=>e?.orientation===ORIENTATION&&CONTENT.getCard(e.cardId))&&new Set(record.cards.map(e=>e.cardId)).size===3);}

  function legacyValid(record,localDate){return Boolean(record&&record.schemaVersion===1&&record.contentVersion===CONTENT.version&&record.spreadId==='three'&&record.localDate===localDate&&Array.isArray(record.cards)&&record.cards.length===3&&record.cards.every(e=>e?.orientation===ORIENTATION&&CONTENT.getCard(e.cardId))&&new Set(record.cards.map(e=>e.cardId)).size===3);}
  function readBox(localDate=ENGINE.localDateISO()){
    try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return emptyBox(localDate);const box=JSON.parse(raw);if(box?.schemaVersion!==SCHEMA_VERSION||box?.contentVersion!==CONTENT.version||box?.spreadId!=='three'||box?.localDate!==localDate||!box.readings||typeof box.readings!=='object')return emptyBox(localDate);const clean=emptyBox(localDate);for(const id of FOCUS_IDS){const r=box.readings[id];if(validReading(r,localDate))clean.readings[id]={...r,cards:r.cards.map(c=>({...c}))};}return clean;}catch(_){return emptyBox(localDate);}
  }
  function writeBox(box){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(box));return true;}catch(_){return false;}}

  function migrateLegacy(localDate=ENGINE.localDateISO()){
    try{if(localStorage.getItem(STORAGE_KEY))return;const raw=localStorage.getItem(LEGACY_KEY);if(!raw)return;const old=JSON.parse(raw);if(!legacyValid(old,localDate))return;const box=emptyBox(localDate);box.readings.general={...old,focusId:'general',narrativeVersion:NARRATIVE.version};writeBox(box);}catch(_){}
  }
  function get(focusId,localDate=ENGINE.localDateISO()){migrateLegacy(localDate);if(!NARRATIVE.focuses[focusId])return null;const r=readBox(localDate).readings[focusId];return r?{...r,cards:r.cards.map(c=>({...c}))}:null;}
  function getAll(localDate=ENGINE.localDateISO()){migrateLegacy(localDate);const box=readBox(localDate);const out={};for(const [id,r] of Object.entries(box.readings))out[id]={...r,cards:r.cards.map(c=>({...c}))};return out;}
  function count(localDate=ENGINE.localDateISO()){return Object.keys(getAll(localDate)).length;}
  function save(session,focusId,localDate=ENGINE.localDateISO()){
    if(!session||session.spread?.id!=='three'||session.state!=='interpreted'||!NARRATIVE.focuses[focusId])return false;
    const box=readBox(localDate);const record=session.toRecord(localDate);record.focusId=focusId;record.narrativeVersion=NARRATIVE.version;record.completedAt=new Date().toISOString();box.readings[focusId]=record;return writeBox(box);
  }
  function clearExpired(localDate=ENGINE.localDateISO()){try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return;const box=JSON.parse(raw);if(box?.localDate!==localDate)localStorage.removeItem(STORAGE_KEY);}catch(_){try{localStorage.removeItem(STORAGE_KEY);}catch(_){}}}
  window.LGTThreeStorage=Object.freeze({key:STORAGE_KEY,schemaVersion:SCHEMA_VERSION,get,getAll,count,save,clearExpired});
})();

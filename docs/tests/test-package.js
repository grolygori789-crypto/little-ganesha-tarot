'use strict';
const fs=require('fs'); const assert=(c,m)=>{if(!c)throw new Error(m)}; const read=p=>fs.readFileSync(p,'utf8');
const TARGET='0.4.6';
const index=read('index.html'), app=read('js/app.js'), sw=read('sw.js'), dailyUi=read('js/reading-ui.js'), askUi=read('js/ask-ui.js');
const guard=read('js/question-guard.js'), askContent=read('js/ask-content.js'), storage=read('js/ask-storage.js'), analyzer=read('js/question-analyzer.js');
const contract=read('js/question-contract.js'), context=read('js/ask-context.js'), semantic=read('js/ask-semantic.js'), engine=read('js/reading-engine.js'), content=read('js/reading-content.js'), css=read('css/reading.css');

for(const marker of [
  `meta name="application-version" content="${TARGET}"`,`body data-build="${TARGET}"`,`manifest.webmanifest?v=${TARGET}`,
  `css/app.css?v=${TARGET}`,`css/reading.css?v=${TARGET}`,`BUILD ${TARGET}`
]) assert(index.includes(marker),`Missing live marker: ${marker}`);
assert(app.includes(`window.LGT_BUILD = '${TARGET}'`),'app.js build mismatch.');
assert(sw.includes(`const BUILD = '${TARGET}';`),'Service Worker build mismatch.');

const scripts=['js/pwa.js','js/audio.js','js/app.js','js/reading-content.js','js/reading-engine.js','js/question-guard.js','js/ask-content.js','js/question-analyzer.js','js/question-contract.js','js/ask-context.js','js/ask-semantic.js','js/ask-storage.js','js/reading-ui.js','js/ask-ui.js'];
for(const p of scripts){assert(index.includes(`${p}?v=${TARGET}`),`index missing ${p}`);assert(sw.includes(`${p}?v=${TARGET}`),`SW shell missing ${p}`);}
assert(!sw.includes('assets/cards/00_THE_FOOL.png'),'Full deck must not be pre-cached.');

// Protected Daily Guidance and Reading Engine remain intact.
for(const token of ['setReadingMode(true)','setReadingMode(false)','reading-card--selected','renderDailyLenses','buildReadingImageBlob','navigator.share']) assert(`${dailyUi}\n${css}`.includes(token),`Protected Daily token missing: ${token}`);
assert(content.includes('"dailyLenses"')&&content.includes("const CONTENT_VERSION = 'daily-guidance-v3'"),'Protected Daily content model missing.');
assert(engine.includes("window.LGTReadingEngineVersion = '1.0.2'"),'Reading Engine internal version changed.');

// Semantic Ask architecture.
assert(analyzer.includes("const VERSION = 'question-analyzer-v3'"),'Question Analyzer v3 missing.');
assert(contract.includes("const VERSION = 'question-contract-v1'"),'Question Contract v1 missing.');
assert(context.includes("const VERSION = 'ask-context-v2'")&&context.includes('SPIRITUAL_CONTEXT'),'9-context base matrix missing.');
assert(semantic.includes("const VERSION = 'ask-semantic-v1'")&&semantic.includes('function buildProfile')&&semantic.includes('function validate'),'Semantic bridge/validator missing.');
assert(semantic.includes('contract.mustCover')&&semantic.includes('noTodayDrift')&&semantic.includes('noGuarantee'),'Hard answer-contract gates missing.');
assert(askUi.includes('ANALYZER.analyze(activeQuestion)'),'Ask UI does not analyze the question.');
assert(askUi.includes('ASK_SEMANTIC.compose(card, activeAnalysis, lang)'),'Ask UI does not use Semantic Ask composer.');
assert(askUi.includes('showFocusResolver')&&askUi.includes('resolveFocus'),'Ambiguity resolver missing.');
assert(askUi.includes('conditionText.textContent'),'Semantic condition block missing.');
assert(storage.includes("const STORAGE_KEY = 'lgt.reading.ask.v1'"),'Same-question storage key changed unexpectedly.');
assert(!storage.includes('question:'),'Raw question must not be persisted.');
assert(guard.includes("normalize('NFKC')")&&guard.includes('safetyCrisis'),'Question Guard protections missing.');
assert(askContent.includes("const VERSION = 'ask-ganesha-v1'"),'Ask card reflection content missing.');

for(const cls of ['.ask-question-error','.ask-question-seal','.ask-focus-card','.ask-reading-block--direct']) assert(css.includes(cls),`Ask UI style missing: ${cls}`);
assert(css.includes('color: #ff8e8e;'),'Inline Question Guard warning color missing.');

// Static/dynamic ID collision checks.
const staticIds=[...index.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]); assert(new Set(staticIds).size===staticIds.length,'Duplicate static IDs.');
const dailyIds=[...dailyUi.matchAll(/\bid="(daily[^"]+)"/g)].map(m=>m[1]); const askIds=[...askUi.matchAll(/\bid="(ask[^"]+)"/g)].map(m=>m[1]);
assert(new Set(dailyIds).size===dailyIds.length,'Duplicate Daily template IDs.'); assert(new Set(askIds).size===askIds.length,'Duplicate Ask template IDs.');
const staticSet=new Set(staticIds); assert(dailyIds.every(id=>!staticSet.has(id)),'Daily/static ID collision.'); assert(askIds.every(id=>!staticSet.has(id)),'Ask/static ID collision.'); assert(askIds.every(id=>!dailyIds.includes(id)),'Ask/Daily ID collision.');

// Dependency order must keep parser → contract → context → semantic → storage → UI.
const ordered=['js/app.js','js/reading-content.js','js/reading-engine.js','js/question-guard.js','js/ask-content.js','js/question-analyzer.js','js/question-contract.js','js/ask-context.js','js/ask-semantic.js','js/ask-storage.js','js/reading-ui.js','js/ask-ui.js'].map(p=>index.indexOf(`${p}?v=${TARGET}`));
assert(ordered.every(v=>v>=0)&&ordered.every((v,i)=>i===0||v>ordered[i-1]),'Runtime script dependency order invalid.');

// CSS structural sanity.
const stripped=css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,''); let depth=0;
for(const ch of stripped){if(ch==='{')depth++; if(ch==='}')depth--; assert(depth>=0,'CSS closes before it opens.');} assert(depth===0,'CSS brace balance mismatch.');

console.log('V0.4.6 package + Semantic Ask wiring checks: PASS');

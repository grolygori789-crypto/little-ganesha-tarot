'use strict';

const fs = require('fs');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const read = (path) => fs.readFileSync(path, 'utf8');

const index = read('index.html');
const app = read('js/app.js');
const sw = read('sw.js');
const dailyUi = read('js/reading-ui.js');
const askUi = read('js/ask-ui.js');
const guard = read('js/question-guard.js');
const askContent = read('js/ask-content.js');
const askStorage = read('js/ask-storage.js');
const analyzer = read('js/question-analyzer.js');
const askContext = read('js/ask-context.js');
const engine = read('js/reading-engine.js');
const content = read('js/reading-content.js');
const css = read('css/reading.css');

const liveMarkers = [
  'meta name="application-version" content="0.4.5"',
  'body data-build="0.4.5"',
  'manifest.webmanifest?v=0.4.5',
  'css/app.css?v=0.4.5',
  'css/reading.css?v=0.4.5',
  'js/pwa.js?v=0.4.5',
  'js/audio.js?v=0.4.5',
  'js/app.js?v=0.4.5',
  'js/reading-content.js?v=0.4.5',
  'js/reading-engine.js?v=0.4.5',
  'js/question-guard.js?v=0.4.5',
  'js/ask-content.js?v=0.4.5',
  'js/question-analyzer.js?v=0.4.5',
  'js/ask-context.js?v=0.4.5',
  'js/ask-storage.js?v=0.4.5',
  'js/reading-ui.js?v=0.4.5',
  'js/ask-ui.js?v=0.4.5',
  'BUILD 0.4.5'
];
for (const marker of liveMarkers) assert(index.includes(marker), `Missing index build marker/resource: ${marker}`);
assert(!index.includes('0.4.3'), 'Stale 0.4.3 marker remains in live index.html.');
assert(app.includes("window.LGT_BUILD = '0.4.5'"), 'app.js build marker mismatch.');
assert(!app.includes("window.LGT_BUILD = '0.4.3'"), 'Stale app.js runtime marker remains.');
assert(sw.includes("const BUILD = '0.4.5';"), 'Service Worker build marker mismatch.');
assert(!sw.includes("const BUILD = '0.4.3';"), 'Stale Service Worker build marker remains.');

for (const path of [
  'css/reading.css?v=0.4.5',
  'js/reading-content.js?v=0.4.5',
  'js/reading-engine.js?v=0.4.5',
  'js/question-guard.js?v=0.4.5',
  'js/ask-content.js?v=0.4.5',
  'js/question-analyzer.js?v=0.4.5',
  'js/ask-context.js?v=0.4.5',
  'js/ask-storage.js?v=0.4.5',
  'js/reading-ui.js?v=0.4.5',
  'js/ask-ui.js?v=0.4.5',
  'assets/ui/card-back.png'
]) assert(sw.includes(path), `Service Worker shell missing ${path}.`);
assert(!sw.includes('assets/cards/00_THE_FOOL.png'), 'Full deck must not be pre-cached in the application shell.');

// Protected Daily Guidance behavior must remain present.
for (const token of ['setReadingMode(true)','setReadingMode(false)','reading-card--selected','renderDailyLenses','buildReadingImageBlob','navigator.share']) {
  assert(`${dailyUi}\n${css}`.includes(token), `Protected Daily Guidance token missing: ${token}`);
}
assert(css.includes('width: clamp(14rem, 78vw, 19rem);'), 'Protected hero-size selected card rule missing.');
assert(css.includes('body.is-reading-open #miniPlayer'), 'Protected reading-context mini player mode missing.');
assert(content.includes('"dailyLenses"') && content.includes("const CONTENT_VERSION = 'daily-guidance-v3'"), 'Protected Daily content model missing.');
assert(engine.includes("window.LGTReadingEngineVersion = '1.0.2'"), 'Reading Engine internal version unexpectedly changed.');

// Ask Ganesha V0.4.5 contextual architecture.
for (const token of [
  "document.querySelectorAll('[data-feature=\"ask\"]')",
  'event.stopImmediatePropagation()',
  "session = ENGINE.createSession('ask')",
  'GUARD.fingerprint(activeQuestion)',
  'ASK_STORAGE.get(activeFingerprint)',
  'ASK_STORAGE.save({',
  "emitInteraction('question-restored'",
  "window.LGTAskGanesha = Object.freeze"
]) assert(askUi.includes(token), `Ask Ganesha wiring missing: ${token}`);
assert(guard.includes("window.LGTQuestionGuard = Object.freeze"), 'Question Guard export missing.');
assert(guard.includes("normalize('NFKC')"), 'Question Guard Unicode normalization missing.');
assert(guard.includes('safetyCrisis') && guard.includes('violentIntent'), 'Question Guard safety categories missing.');
assert(askStorage.includes("const STORAGE_KEY = 'lgt.reading.ask.v1'"), 'Ask same-question storage key missing.');
assert(!askStorage.includes('question:'), 'Ask storage must not persist raw question text.');
assert(askContent.includes("const VERSION = 'ask-ganesha-v1'"), 'Ask content version missing.');
assert(css.includes('.ask-question-error') && css.includes('color: #ff8e8e;'), 'Inline red Question Guard warning style missing.');
assert(css.includes('.ask-question-seal') && css.includes('.ask-reading-block--ganesha'), 'Premium Ask Ganesha presentation styles missing.');
assert(analyzer.includes("const VERSION = 'question-analyzer-v2'"), 'Question Analyzer version missing.');
assert(analyzer.includes('ambiguous') && analyzer.includes('candidates'), 'Question Analyzer ambiguity resolver contract missing.');
assert(askContext.includes("const VERSION = 'ask-context-v2'"), 'Ask Context version missing.');
assert(analyzer.includes("'spiritual_unseen'"), 'Spiritual & Unseen domain missing from analyzer.');
assert(askContext.includes('SPIRITUAL_CONTEXT'), 'Curated spiritual context matrix missing.');
assert(askContext.includes('DOMAIN_LENS') && askContext.includes('directFromContext'), 'Context Matrix / Answer Composer missing.');
assert(askUi.includes('ANALYZER.analyze(activeQuestion)'), 'Ask UI does not analyze questions.');
assert(askUi.includes('showFocusResolver') && askUi.includes('resolveFocus'), 'Ambiguity focus resolver missing.');
assert(askUi.includes('ASK_CONTEXT.interpret'), 'Ask UI does not use contextual interpretation.');
assert(css.includes('.ask-focus-card') && css.includes('.ask-reading-block--direct'), 'Contextual Ask premium UI styles missing.');

// CSS structural sanity.
const strippedCss = css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,'');
let depth = 0;
for (const char of strippedCss) {
  if (char === '{') depth += 1;
  if (char === '}') depth -= 1;
  assert(depth >= 0, 'CSS closes a block before it opens.');
}
assert(depth === 0, 'CSS brace balance mismatch.');

// Static and dynamic ID collision checks.
const staticIds = [...index.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert(new Set(staticIds).size === staticIds.length, 'Duplicate static HTML IDs detected.');
const dailyIds = [...dailyUi.matchAll(/\bid="(daily[^"]+)"/g)].map((match) => match[1]);
const askIds = [...askUi.matchAll(/\bid="(ask[^"]+)"/g)].map((match) => match[1]);
assert(new Set(dailyIds).size === dailyIds.length, 'Duplicate Daily template IDs detected.');
assert(new Set(askIds).size === askIds.length, 'Duplicate Ask template IDs detected.');
const staticSet = new Set(staticIds);
assert(dailyIds.every((id) => !staticSet.has(id)), 'Daily template ID collides with static DOM.');
assert(askIds.every((id) => !staticSet.has(id)), 'Ask template ID collides with static DOM.');
assert(askIds.every((id) => !dailyIds.includes(id)), 'Ask template ID collides with Daily template ID.');

// Script dependency order.
const scriptOrder = [
  'js/app.js?v=0.4.5',
  'js/reading-content.js?v=0.4.5',
  'js/reading-engine.js?v=0.4.5',
  'js/question-guard.js?v=0.4.5',
  'js/ask-content.js?v=0.4.5',
  'js/question-analyzer.js?v=0.4.5',
  'js/ask-context.js?v=0.4.5',
  'js/ask-storage.js?v=0.4.5',
  'js/reading-ui.js?v=0.4.5',
  'js/ask-ui.js?v=0.4.5'
].map((token) => index.indexOf(token));
assert(scriptOrder.every((value) => value >= 0) && scriptOrder.every((value, i) => i === 0 || value > scriptOrder[i - 1]), 'Reading/Ask script dependency order is invalid.');

console.log('V0.4.5 package/version/Ask Ganesha checks: PASS');

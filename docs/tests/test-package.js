'use strict';

const fs = require('fs');

const read = (path) => fs.readFileSync(path, 'utf8');
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const index = read('index.html');
const app = read('js/app.js');
const sw = read('sw.js');
const ui = read('js/reading-ui.js');
const engine = read('js/reading-engine.js');
const content = read('js/reading-content.js');
const css = read('css/reading.css');

for (const marker of [
  'meta name="application-version" content="0.4.3"',
  'body data-build="0.4.3"',
  'css/app.css?v=0.4.3',
  'css/reading.css?v=0.4.3',
  'js/pwa.js?v=0.4.3',
  'js/audio.js?v=0.4.3',
  'js/app.js?v=0.4.3',
  'js/reading-content.js?v=0.4.3',
  'js/reading-engine.js?v=0.4.3',
  'js/reading-ui.js?v=0.4.3'
]) assert(index.includes(marker), `Missing index build marker/resource: ${marker}`);

assert(app.includes("window.LGT_BUILD = '0.4.3'"), 'app.js build marker mismatch.');
assert(sw.includes("const BUILD = '0.4.3';"), 'Service Worker build marker mismatch.');
for (const path of ['css/reading.css','js/reading-content.js','js/reading-engine.js','js/reading-ui.js','assets/ui/card-back.png']) {
  assert(sw.includes(path), `Service Worker shell missing ${path}.`);
}
assert(!sw.includes('assets/cards/00_THE_FOOL.png'), 'Full deck must not be pre-cached in the application shell.');

for (const token of ['setReadingMode(true)','setReadingMode(false)','is-reading-open','reading-card--selected','player-button--primary']) {
  assert(`${ui}\n${css}`.includes(token), `Expected polish token missing: ${token}`);
}

assert(css.includes('width: clamp(14rem, 78vw, 19rem);'), 'Hero-size selected card rule missing.');
assert(css.includes('body.is-reading-open #miniPlayer'), 'Reading-context mini player compact mode missing.');
assert(css.includes('left: 50%;') && css.includes('transform: translateX(-50%);'), 'Centered contextual mini player fix missing.');
assert(!css.includes('left: max(.72rem, env(safe-area-inset-left));'), 'Known off-screen contextual player positioning defect remains.');
assert(ui.includes('reading-lenses') && ui.includes('renderDailyLenses') && ui.includes("'guidanceToday'"), 'Daily Lens UI wiring missing.');
assert(content.includes('"dailyLenses"'), 'Daily Lens card content missing.');
assert(content.includes("const CONTENT_VERSION = 'daily-guidance-v3'"), 'Daily Lens content v3 marker missing.');
assert(engine.includes("LEGACY_CONTENT_VERSIONS = new Set(['daily-guidance-v1', 'daily-guidance-v2'])"), 'Daily content migration compatibility missing.');
assert(engine.includes("window.LGTReadingEngineVersion = '1.0.2'"), 'Reading Engine patch version marker missing.');
assert(ui.includes("theme: 'สิ่งที่ไพ่สะท้อนวันนี้'"), 'Native Thai reading label missing.');
assert(ui.includes('dailySaveShare') && ui.includes('buildReadingImageBlob') && ui.includes('navigator.share') && ui.includes("runExport('share')"), 'Daily save/share export flow missing.');
assert(css.includes('reading-share__actions') && css.includes('reading-secondary--strong'), 'Daily save/share styling missing.');

const strippedCss = css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,'');
let depth = 0;
for (const char of strippedCss) {
  if (char === '{') depth += 1;
  if (char === '}') depth -= 1;
  assert(depth >= 0, 'CSS closes a block before it opens.');
}
assert(depth === 0, 'CSS brace balance mismatch.');

const ids = [...index.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert(new Set(ids).size === ids.length, 'Duplicate static HTML IDs detected.');
const dynamicIds = [...ui.matchAll(/\bid="(daily[^"]+)"/g)].map(match => match[1]);
assert(new Set(dynamicIds).size === dynamicIds.length, 'Duplicate Daily Guidance template IDs detected.');
const staticIdSet = new Set(ids);
assert(dynamicIds.every(id => !staticIdSet.has(id)), 'Daily Guidance ID collides with canonical static DOM.');

const scriptOrder = [
  'js/app.js?v=0.4.3',
  'js/reading-content.js?v=0.4.3',
  'js/reading-engine.js?v=0.4.3',
  'js/reading-ui.js?v=0.4.3'
].map(token => index.indexOf(token));
assert(scriptOrder.every(index => index >= 0) && scriptOrder.every((value, i) => i === 0 || value > scriptOrder[i - 1]), 'Reading script dependency order is invalid.');

console.log('V0.4.3 package/version/save-share checks: PASS');

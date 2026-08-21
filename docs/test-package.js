'use strict';

const fs = require('fs');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const read = (path) => fs.readFileSync(path, 'utf8');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const blobSha = (text) => execFileSync('git', ['hash-object','--stdin'], { input: text }).toString().trim();

const index = read('index.html');
const app = read('js/app.js');
const sw = read('sw.js');
const ui = read('js/reading-ui.js');
const css = read('css/reading.css');

for (const marker of [
  'meta name="application-version" content="0.4.0"',
  'body data-build="0.4.0"',
  'BUILD 0.4.0',
  'css/app.css?v=0.4.0',
  'css/reading.css?v=0.4.0',
  'js/pwa.js?v=0.4.0',
  'js/audio.js?v=0.4.0',
  'js/app.js?v=0.4.0',
  'js/reading-content.js?v=0.4.0',
  'js/reading-engine.js?v=0.4.0',
  'js/reading-ui.js?v=0.4.0'
]) assert(index.includes(marker), `Missing index build marker/resource: ${marker}`);

assert(app.includes("window.LGT_BUILD = '0.4.0'"), 'app.js build marker mismatch.');
assert(sw.includes("const BUILD = '0.4.0';"), 'Service Worker build marker mismatch.');
for (const path of ['css/reading.css','js/reading-content.js','js/reading-engine.js','js/reading-ui.js','assets/ui/card-back.png']) {
  assert(sw.includes(path), `Service Worker shell missing ${path}.`);
}
assert(!sw.includes('assets/cards/00_THE_FOOL.png'), 'Full deck must not be pre-cached in the application shell.');

for (const token of ['card-art-fallback','lifecycleToken','setMainInert(true)','setMainInert(false)','stopImmediatePropagation']) {
  assert(ui.includes(token), `Reading UI safety token missing: ${token}`);
}
assert(css.includes('.reading-card__fallback'), 'Artwork fallback CSS missing.');
assert(css.includes('html[data-motion="reduced"]'), 'Reduced Motion CSS missing.');

// Prove protected replacements are minimal by reversing only the V0.4.0 patch and
// comparing Git blob identities with canonical V0.3.6 files on repository main.
const appReversed = app.replace("window.LGT_BUILD = '0.4.0'", "window.LGT_BUILD = '0.3.6'");
assert(blobSha(appReversed) === '7b23d3ff87876bae54675cca05c07ae149ad6f22', 'app.js contains an unexpected change beyond build marker.');

let swReversed = sw.replace("const BUILD = '0.4.0';", "const BUILD = '0.3.6';").replaceAll('?v=0.4.0','?v=0.3.6');
for (const line of [
  "  url('css/reading.css?v=0.3.6'),\n",
  "  url('js/reading-content.js?v=0.3.6'),\n",
  "  url('js/reading-engine.js?v=0.3.6'),\n",
  "  url('js/reading-ui.js?v=0.3.6'),\n",
  "  url('assets/ui/card-back.png'),\n"
]) swReversed = swReversed.replace(line, '');
assert(blobSha(swReversed) === '72bba80fafe0666fdfa206f1d142f2f955fb4f3f', 'sw.js contains an unexpected change beyond V0.4.0 shell/version additions.');

let indexReversed = index
  .replace('content="0.4.0"','content="0.3.6"')
  .replaceAll('?v=0.4.0','?v=0.3.6')
  .replace('data-build="0.4.0"','data-build="0.3.6"')
  .replace('BUILD 0.4.0','BUILD 0.3.6');
for (const line of [
  '  <link rel="stylesheet" href="css/reading.css?v=0.3.6">\n',
  '  <script src="js/reading-content.js?v=0.3.6" defer></script>\n',
  '  <script src="js/reading-engine.js?v=0.3.6" defer></script>\n',
  '  <script src="js/reading-ui.js?v=0.3.6" defer></script>\n'
]) indexReversed = indexReversed.replace(line, '');
assert(blobSha(indexReversed) === 'd16c8d0e1dbb6233cb40f6d3db2a66788b69f0bc', 'index.html contains an unexpected change beyond V0.4.0 wiring/version markers.');

// Lightweight CSS structure balance. This is not a full CSS parser but catches broken package edits.
const strippedCss = css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,'');
let depth = 0;
for (const char of strippedCss) {
  if (char === '{') depth += 1;
  if (char === '}') depth -= 1;
  assert(depth >= 0, 'CSS closes a block before it opens.');
}
assert(depth === 0, 'CSS brace balance mismatch.');

// Basic duplicate/static-vs-reading-template ID checks.
const ids = [...index.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert(new Set(ids).size === ids.length, 'Duplicate static HTML IDs detected.');
const dynamicIds = [...ui.matchAll(/\bid="(daily[^"]+)"/g)].map(match => match[1]);
assert(new Set(dynamicIds).size === dynamicIds.length, 'Duplicate Daily Guidance template IDs detected.');
const staticIdSet = new Set(ids);
assert(dynamicIds.every(id => !staticIdSet.has(id)), 'Daily Guidance ID collides with canonical static DOM.');

const scriptOrder = [
  'js/app.js?v=0.4.0',
  'js/reading-content.js?v=0.4.0',
  'js/reading-engine.js?v=0.4.0',
  'js/reading-ui.js?v=0.4.0'
].map(token => index.indexOf(token));
assert(scriptOrder.every(index => index >= 0) && scriptOrder.every((value, i) => i === 0 || value > scriptOrder[i - 1]), 'Reading script dependency order is invalid.');

console.log('V0.4.0 package/version/regression tests: PASS');

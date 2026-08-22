const fs = require('fs');
const assert = require('assert');
const index = fs.readFileSync('index.html', 'utf8');
const app = fs.readFileSync('js/app.js', 'utf8');
const sw = fs.readFileSync('sw.js', 'utf8');

assert(index.includes('content="0.4.8"'));
assert(index.includes('data-build="0.4.8"'));
assert(index.includes('BUILD 0.4.8'));
assert(app.includes("window.LGT_BUILD = '0.4.8'"));
assert(sw.includes("const BUILD = '0.4.8'"));
assert(!index.includes('0.4.7'));
assert(!sw.includes('0.4.7'));
console.log('PASS test-version-coherence-v048');

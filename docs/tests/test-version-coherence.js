'use strict';

const fs = require('fs');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const read = (path) => fs.readFileSync(path, 'utf8');
const TARGET = '0.4.4';

const index = read('index.html');
const app = read('js/app.js');
const sw = read('sw.js');
const readme = read('README.md');
const release = read('docs/releases/RELEASE_NOTES_V0_4_4.md');
const qa = read('docs/qa/QA_V0_4_4.md');

assert(index.includes(`meta name="application-version" content="${TARGET}"`), 'HTML application-version mismatch.');
assert(index.includes(`body data-build="${TARGET}"`), 'HTML body data-build mismatch.');
assert(index.includes(`BUILD ${TARGET}`), 'Visible build label mismatch.');
assert(app.includes(`window.LGT_BUILD = '${TARGET}'`), 'window.LGT_BUILD mismatch.');
assert(sw.includes(`const BUILD = '${TARGET}';`), 'Service Worker BUILD mismatch.');

const indexVersionedResources = [...index.matchAll(/(?:href|src)="((?:manifest\.webmanifest|css\/[^"?]+|js\/[^"?]+)\?v=([0-9.]+))"/g)];
assert(indexVersionedResources.length >= 10, 'Too few versioned runtime resources found in index.html.');
for (const [, resource, version] of indexVersionedResources) {
  assert(version === TARGET, `Mixed index resource version ${version}: ${resource}`);
}

const swVersionedResources = [...sw.matchAll(/url\('((?:manifest\.webmanifest|css\/[^'?]+|js\/[^'?]+)\?v=([0-9.]+))'\)/g)];
assert(swVersionedResources.length >= 10, 'Too few versioned Service Worker resources found.');
for (const [, resource, version] of swVersionedResources) {
  assert(version === TARGET, `Mixed Service Worker resource version ${version}: ${resource}`);
}

for (const [label, text] of [['index', index], ['app', app], ['sw', sw]]) {
  assert(!text.includes('0.4.3'), `${label} contains stale live runtime marker 0.4.3.`);
}

assert(readme.includes('**Target runtime:** V0.4.4'), 'README target runtime mismatch.');
assert(release.includes('Release Notes V0.4.4'), 'Release Notes version mismatch.');
assert(qa.includes('QA Report — V0.4.4'), 'QA version mismatch.');

// V4.0 intentionally remains the canonical governance baseline until real-device promotion.
assert(readme.includes('Master Plan V4.0 correctly continues to identify V0.4.3 as the **current canonical runtime**'), 'Candidate/canonical governance distinction missing.');

if (fs.existsSync('PATCH_MANIFEST_V0_4_4.json')) {
  const manifest = JSON.parse(read('PATCH_MANIFEST_V0_4_4.json'));
  assert(manifest.target_runtime_build === TARGET, 'Patch manifest target runtime mismatch.');
  assert(manifest.baseline_runtime_build === '0.4.3', 'Patch manifest baseline runtime mismatch.');
}

console.log('V0.4.4 hard version-coherence checks: PASS');

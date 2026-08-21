'use strict';

const fs = require('fs');
const path = require('path');

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const root = process.cwd();
const top = fs.readdirSync(root, { withFileTypes: true });
const topFiles = top.filter(e => e.isFile()).map(e => e.name).sort();
const topDirs = new Set(top.filter(e => e.isDirectory()).map(e => e.name));

for (const dir of ['css', 'docs', 'js']) {
  assert(topDirs.has(dir), `Required package directory missing: ${dir}`);
}

for (const dir of ['checksums','governance','qa','releases','tests']) {
  assert(fs.existsSync(path.join(root, 'docs', dir)), `Canonical docs category missing: docs/${dir}/`);
}

const forbiddenRootPatterns = [
  /^QA(?:_|\.)/i,
  /^GLOBAL_LANGUAGE_QA/i,
  /^RELEASE_NOTES/i,
  /^HOME_MOTIF_RELEASE_NOTES/i,
  /^ICON_RELEASE_NOTES/i,
  /^PWA_RELEASE_NOTES/i,
  /^PATCH_UPLOAD_NOTES/i,
  /^CHECKSUMS/i,
  /^SHA256SUMS/i,
  /^MASTER_PLAN/i,
  /^ROOM_MIGRATION_PROMPT/i,
  /^DOCS_MANIFEST/i,
  /^DOCS_UPDATE_NOTES/i,
  /^test-.*\.js$/i
];

for (const file of topFiles) {
  for (const pattern of forbiddenRootPatterns) {
    assert(!pattern.test(file), `Documentation/test file is not allowed at repository root: ${file}`);
  }
}

assert(topFiles.includes('README.md'), 'README.md must remain at repository root.');
assert(topFiles.includes('PATCH_MANIFEST_V0_4_2.json'), 'Current patch manifest must remain at repository root.');
assert(topFiles.includes('index.html'), 'index.html missing from upload package.');
assert(topFiles.includes('sw.js'), 'sw.js missing from upload package.');

const tests = fs.readdirSync(path.join(root, 'docs', 'tests'));
for (const required of ['test-reading-engine.js','test-package.js','test-global-copy.js','test-repo-structure.js']) {
  assert(tests.includes(required), `Validation script missing from docs/tests/: ${required}`);
}

assert(fs.existsSync(path.join(root, 'docs', 'governance', 'REPOSITORY_STRUCTURE_POLICY_V1.md')), 'Canonical repository structure policy missing.');
assert(fs.existsSync(path.join(root, 'docs', 'qa', 'QA_V0_4_2.md')), 'Current QA report missing from docs/qa/.');
assert(fs.existsSync(path.join(root, 'docs', 'releases', 'RELEASE_NOTES_V0_4_2.md')), 'Current release notes missing from docs/releases/.');
assert(fs.existsSync(path.join(root, 'docs', 'releases', 'PATCH_UPLOAD_NOTES.md')), 'Current upload notes missing from docs/releases/.');
assert(fs.existsSync(path.join(root, 'docs', 'checksums', 'CHECKSUMS_V0_4_2.sha256')), 'Current checksums missing from docs/checksums/.');

console.log('Repository structure policy checks: PASS');

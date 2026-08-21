'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const assert = (condition, message) => {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
};
const has = (text, needle, label) => assert(text.includes(needle), `${label} missing: ${needle}`);

const master = read('docs/governance/MASTER_PLAN.md');
const migration = read('docs/governance/ROOM_MIGRATION_PROMPT_V4_0.md');
const changelog = read('docs/governance/MASTER_PLAN_V4_0_CHANGELOG.md');
const notes = read('docs/governance/DOCS_UPDATE_NOTES_V4_0.md');
const qa = read('docs/qa/QA_MASTER_PLAN_V4_0.md');

has(master, 'MASTER PLAN & ZERO-QUESTION DEVELOPMENT HANDOFF V4.0', 'Master Plan');
has(master, '**Canonical document version:** 4.0', 'Master Plan metadata');
has(master, '**Current canonical runtime build:** 0.4.3', 'Master Plan runtime');
has(master, '3bd6764dfdf17a7e6691113133d13b085b99df29', 'Master Plan baseline SHA');
has(master, '# 2. Complexity Budget & Stability Constitution', 'Complexity governance');
has(master, '# 8. Native Language Standard — GLOBAL RELEASE RULE', 'Language governance');
has(master, 'OPEN ACCESS + VOLUNTARY SUPPORT', 'Business model');
has(master, '# 11. Daily Guidance — COMPLETE CANONICAL READING EXPERIENCE', 'Daily Guidance status');
has(master, '# 14. Journal / Reading History', 'Journal architecture');
has(master, '# 18. Membership / Premium — DEFERRED, NOT CURRENT ROADMAP', 'Membership status');
has(master, '## 28.4 Mixed live versions = RELEASE FAIL', 'Version coherence gate');
has(master, 'ROOM_MIGRATION_PROMPT_V4_0.md', 'Migration prompt reference');
has(master, '**End of Master Plan & Zero-Question Development Handoff V4.0**', 'Master Plan closing');

assert(!master.includes('**Current canonical runtime build:** 0.3.6'), 'Active runtime metadata must not remain at 0.3.6');
assert(!master.includes('**Canonical document version:** 3.7'), 'Active Master Plan metadata must not remain V3.7');

has(migration, 'ZERO-QUESTION ROOM MIGRATION PROMPT V4.0', 'Migration prompt');
has(migration, 'docs/governance/MASTER_PLAN.md` V4.0', 'Migration Master Plan reference');
has(migration, 'Runtime baseline at V4.0 creation:** V0.4.3', 'Migration runtime');
has(migration, '3bd6764dfdf17a7e6691113133d13b085b99df29', 'Migration baseline SHA');
has(migration, 'Always re-read `main` before runtime work.', 'GitHub-first requirement');
has(migration, 'Do not ask backward-looking questions', 'Zero-question rule');
has(migration, '## 14. Native Language Standard — HARD RELEASE GATE', 'Migration language gate');
has(migration, '## 15. Version/build discipline — HARD RELEASE BLOCKER', 'Migration version gate');

has(changelog, 'V4.0', 'Changelog');
has(notes, 'documentation/governance only', 'Docs update notes');
has(qa, '0.4.3', 'QA runtime');

const manifestPath = path.join(root, 'docs/governance/DOCS_MANIFEST_V4_0.json');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert(manifest.master_plan_version === '4.0', 'Manifest Master Plan version must be 4.0');
  assert(manifest.runtime_build_unchanged === '0.4.3', 'Manifest runtime must remain 0.4.3');
  assert(manifest.baseline_head_commit === '3bd6764dfdf17a7e6691113133d13b085b99df29', 'Manifest baseline SHA mismatch');
  assert(manifest.release_type === 'Documentation / governance only', 'Manifest must identify docs-only release');
}

console.log('Master Plan V4.0 governance/coherence checks: PASS');

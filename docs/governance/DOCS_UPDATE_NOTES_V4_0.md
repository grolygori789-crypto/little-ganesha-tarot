# Documentation Update Notes — Master Plan V4.0

**Scope:** documentation/governance only  
**Runtime:** remains V0.4.3  
**Source baseline:** GitHub `main` commit `3bd6764dfdf17a7e6691113133d13b085b99df29`

## Files in this documentation delivery

- `docs/governance/MASTER_PLAN.md` — replaces the active canonical Master Plan with V4.0.
- `docs/governance/ROOM_MIGRATION_PROMPT_V4_0.md` — copy/paste zero-question recovery prompt.
- `docs/governance/MASTER_PLAN_V4_0_CHANGELOG.md` — concise V4.0 changes.
- `docs/governance/DOCS_UPDATE_NOTES_V4_0.md` — upload scope and operational notes.
- `docs/governance/DOCS_MANIFEST_V4_0.json` — document identity/hashes.
- `docs/qa/QA_MASTER_PLAN_V4_0.md` — documentation QA and current evidence boundary.
- `docs/tests/test-governance-v4.js` — structural/governance validation.
- `docs/checksums/CHECKSUMS_MASTER_PLAN_V4_0.sha256` — archive integrity.

## Upload behavior

Extract the ZIP and overlay the included `docs/` folder onto the repository root. No runtime file is included or changed.

Older V3.7 versioned documents may remain as historical files because overlay extraction cannot perform Git deletions. V4.0 explicitly supersedes them for active decisions.

## Runtime rule

Do **not** change runtime build markers from `0.4.3` for this docs-only update.

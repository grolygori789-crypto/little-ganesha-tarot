# Little Ganesha Tarot — Repository Structure Policy V1

**Status:** Canonical repository-packaging policy  
**Effective from:** Runtime V0.4.2 and all later deliveries  
**Project:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive

## 1. Purpose

Every future GitHub delivery must arrive already organized. P’Benz must be able to extract the package, overlay the included files/folders into the local repository, review Changes in GitHub Desktop, then Commit + Push without manually sorting documentation files.

The repository root must stay focused on runtime and project-level entry files rather than becoming a document archive.

## 2. Canonical top-level structure

```text
/
├── assets/
├── css/
├── data/
├── docs/
│   ├── checksums/
│   ├── governance/
│   ├── qa/
│   ├── releases/
│   └── tests/
├── js/
├── index.html
├── manifest.webmanifest
├── PATCH_MANIFEST_[CURRENT_VERSION].json
├── README.md
└── sw.js
```

Only files/folders that belong at repository level or are required by the runtime should be placed at root.

## 3. Documentation categories

### `docs/checksums/`

Place here:

- `CHECKSUMS*`
- `SHA256SUMS*`
- checksum files
- integrity-verification files

### `docs/governance/`

Place here:

- `MASTER_PLAN*`
- `MASTER_PLAN_*_CHANGELOG*`
- `ROOM_MIGRATION_PROMPT*`
- `DOCS_MANIFEST*`
- `DOCS_UPDATE_NOTES*`
- source-of-truth documents
- handoff/migration documents
- project-governance policies

### `docs/qa/`

Place here:

- `QA_MASTER_PLAN*`
- current runtime QA reports
- `GLOBAL_LANGUAGE_QA*`
- content/language QA reports
- other quality-assurance reports

### `docs/releases/`

Place here:

- `RELEASE_NOTES*`
- `HOME_MOTIF_RELEASE_NOTES*`
- `ICON_RELEASE_NOTES*`
- `PWA_RELEASE_NOTES*`
- `PATCH_UPLOAD_NOTES*`
- deployment/release notes

### `docs/tests/`

Place here:

- `test-global-copy.js`
- `test-package.js`
- `test-reading-engine.js`
- repository-structure tests
- validation/testing scripts that are not runtime application code

### `docs/`

Use only for general documentation that does not fit the categories above, such as `README_ASSETS.md`.

## 4. Root restrictions

Do not create or deliver the following at repository root when a `docs/` category exists for them:

- QA reports
- release notes
- checksums
- Master Plan/governance documents
- migration/handoff documents
- deployment notes
- validation/test scripts

`PATCH_MANIFEST_[CURRENT_VERSION].json` is the intentional exception because the current patch manifest is a repository-level release identity file.

## 5. Historical-file retention

Git history is the primary historical archive.

Do not accumulate every prior QA report, release note, checksum, or patch manifest in the working tree without a current operational reason.

Retain an older file only when it is still useful for one or more of:

- immediate rollback,
- current canonical provenance,
- active migration,
- unresolved QA comparison,
- legally/operationally required release evidence.

Once that reason is gone, prefer pruning the working-tree copy and rely on Git history.

## 6. Patch manifest rule

Before removing an older `PATCH_MANIFEST_*`:

1. inspect runtime and documentation references,
2. confirm no active release/restore flow depends on it,
3. confirm Git history preserves the prior state,
4. then remove it when no longer useful.

Do not delete a current or referenced manifest merely to make the tree look cleaner.

## 7. Runtime safety rule

Never move or delete runtime files merely for organization without dependency inspection.

Protected examples include:

- `index.html`
- `manifest.webmanifest`
- `sw.js`
- `assets/`
- `css/`
- `data/`
- `js/`
- any current manifest or asset path referenced by the app/service worker

Repository cleanup must never create a runtime regression.

## 8. Delivery rule

Every future package must be repository-ready before handoff:

1. verify current GitHub `main`,
2. build on the verified baseline,
3. place every new file in its canonical destination,
4. run repository-structure validation,
5. run normal feature/regression QA,
6. generate the current patch manifest at root,
7. generate integrity files under `docs/checksums/`,
8. archive with repository-relative paths at ZIP root,
9. re-extract and re-run tests from the archive,
10. hand P’Benz one upload package that can be overlaid directly.

Do not hand off scattered files and ask P’Benz to reorganize them manually afterward.

## 9. Automated enforcement

Release packages should include a repository-structure validation test under `docs/tests/`.

That test should fail when documentation is placed at root contrary to this policy or when validation scripts are placed outside `docs/tests/` without a justified reason.

---

**Canonical principle:** organize before handoff, not after upload.

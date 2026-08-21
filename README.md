# Little Ganesha Tarot — V0.4.3 Save & Share Reading

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Target runtime:** V0.4.3  
**Baseline assumption:** local repository already contains the V0.4.2 repo-ready state

## Scope

V0.4.3 adds a clean export flow for **Daily Guidance** so users can keep or share a reading without taking a raw screenshot themselves.

This release adds:

- a curated **Save Image** action inside Daily Guidance,
- a curated **Share** action using the device's native share sheet when supported,
- fallback-to-save behavior when direct file sharing is unavailable,
- a generated long-form reading image that includes only the meaningful reading content,
- bilingual TH/EN UI copy for the new export flow,
- repository-ready documentation structured under `docs/`.

## Export design

The exported image is not a full UI screenshot.

It is a purpose-built reading card that includes:

- Little Ganesha Tarot branding,
- current date,
- the revealed tarot card artwork,
- card title and canonical title,
- keywords,
- main meaning,
- reflection question,
- all six Daily Lenses,
- the existing non-deterministic disclaimer.

It intentionally excludes transient UI such as the media player, buttons, navigation chrome, and other screen-only controls.

## Share behavior

When the device/browser supports file sharing through the Web Share API, tapping **Share** opens the native share sheet so the image can be sent to apps like LINE and other compatible apps.

When direct sharing is not available, the app falls back to saving the generated PNG to the device instead of failing silently.

## Repository organization

Documentation remains categorized before handoff:

- `docs/checksums/`
- `docs/governance/`
- `docs/qa/`
- `docs/releases/`
- `docs/tests/`

The current root manifest for this delivery is `PATCH_MANIFEST_V0_4_3.json`.

## Upload

Extract the upload ZIP and overlay its repository-relative contents onto the local repository root. Then review the changes in GitHub Desktop and Commit + Push.

No manual sorting of QA/release/checksum/test files should be needed after extraction.

## QA status

Pre-upload validation completed in the development environment:

- package/version checks: PASS
- global TH/EN copy checks: PASS
- repository-structure checks: PASS
- JS syntax check: PASS
- archive checksum generation: PASS

Real-device save/share behavior and deployed-browser QA still remain the final post-upload gate.

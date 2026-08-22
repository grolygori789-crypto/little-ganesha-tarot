# Little Ganesha Tarot — V0.4.4 Ask Ganesha

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Target runtime:** V0.4.4  
**Master Plan in force:** V4.0  
**Baseline repository HEAD:** `565bc738a0dcb9387dc220135a1999dcd93553f6` — `Upgrade Master Plan to V4.0`

## Release purpose

V0.4.4 activates **Ask Ganesha / ถามพระพิฆเนศน้อย** as the second real tarot reading mode while preserving the existing Daily Guidance and shared Reading Engine.

The mode is intentionally premium in presentation but moderate in implementation complexity. It uses the existing one-card `ask` spread and adds isolated UI/content/persistence modules rather than rebuilding the Reading Engine.

## Ask Ganesha flow

`One question → local validation → question seal → shuffle → choose one card → reveal → reflective interpretation → ask another question`

Core behavior:

- one question per reading,
- one card per question,
- same normalized question + same local day restores the same card,
- a new local day may draw a new card for the same question,
- raw question text is not persisted for the repeat-question rule,
- no AI/API/backend is required,
- no deterministic yes/no verdict,
- native English and Thai UI/content,
- card-specific Little Ganesha reflection for all 78 cards.

## Local Question Content Guard

The question field includes a lightweight local-only guard that checks for:

- strong profanity/abusive wording,
- explicit pornographic phrasing,
- a narrow set of severe hateful slurs,
- direct violent intent,
- direct first-person crisis/self-harm wording,
- obvious spam/gibberish,
- multiple-question punctuation,
- simple obfuscation of blocked terms.

When a question is blocked, the app shows an inline red message and does not start the reading until the wording is changed.

The guard is intentionally not presented as comprehensive AI moderation. It runs entirely on the device and is designed for the limited one-question Ask Ganesha input.

## Protected behavior

This release does **not** modify:

- `js/reading-engine.js`,
- `js/reading-content.js`,
- `js/reading-ui.js`,
- Daily Guidance content/lenses,
- Daily Save/Share behavior,
- audio lifecycle,
- PWA strategy,
- profile behavior,
- canonical tarot/card assets.

Runtime version/cache markers advance coherently to `0.4.4` because user-facing runtime behavior changes.

## QA status before upload

Static/structural and unit validation are completed in the development environment. Real-device Android/iOS validation remains required after deployment before V0.4.4 is promoted to the canonical runtime baseline.

See:

- `docs/qa/QA_V0_4_4.md`
- `docs/releases/RELEASE_NOTES_V0_4_4.md`
- `docs/releases/PATCH_UPLOAD_NOTES.md`

## Canonical promotion note

Master Plan V4.0 correctly continues to identify V0.4.3 as the **current canonical runtime** until V0.4.4 is pushed and passes the appropriate real-device gate. After successful promotion, the Master Plan/current-status documentation should be advanced in a documentation-only governance update rather than pre-declaring an untested candidate as canonical.

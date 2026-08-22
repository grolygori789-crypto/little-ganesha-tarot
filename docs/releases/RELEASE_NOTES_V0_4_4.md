# Little Ganesha Tarot — Release Notes V0.4.4

## Release name
Ask Ganesha + Local Question Guard

## Summary

V0.4.4 activates **Ask Ganesha / ถามพระพิฆเนศน้อย** as a complete one-question, one-card reflective reading mode.

The release deliberately reuses the protected shared Reading Engine. It does not create a separate randomizer, shuffle engine, card map, AI service, or backend.

## User experience

The new flow is:

`Question → Question Seal → Shuffle → Choose → Reveal → Reflect`

The presentation adds:

- a premium question-entry card,
- restrained sacred/editorial styling,
- a brief question-seal transition,
- the canonical three-card choice presentation for selecting one card,
- full-size reveal using canonical card artwork,
- question recap,
- card title and keywords,
- core card meaning,
- card-specific Little Ganesha reflection,
- reflection question,
- non-deterministic disclaimer,
- **Ask Another Question / ถามเรื่องอื่น** as the post-reading action.

## One-question rule

Ask Ganesha is designed around:

**1 question = 1 card = 1 reading**

The UI encourages one focused question at a time rather than combining several unrelated questions into one reading.

## Same-question behavior

A normalized fingerprint is generated locally from the question.

For the same local day:

- the same normalized question restores the same card,
- case, surrounding whitespace, and ordinary punctuation differences do not create a new draw,
- semantically similar but differently worded questions are not treated as identical because no AI/NLP service is used.

Only the fingerprint/card/session metadata are stored for this rule. Raw question text is not persisted by the Ask repeat-question store.

## Question Content Guard

New module: `js/question-guard.js`

The guard runs locally and can block:

- strong profanity/abusive wording,
- explicit pornographic wording,
- a narrow set of severe hateful slurs,
- direct first-person violent intent,
- direct first-person crisis/self-harm wording,
- obvious spam/gibberish,
- multiple-question punctuation,
- simple obfuscation attempts.

Blocked input receives a native-language inline warning in red and cannot start a reading until revised.

Neutral relationship/sexual-health wording is not intentionally blocked merely because it mentions sex or a relationship.

## Ask-specific tarot content

New module: `js/ask-content.js`

- 78/78 cards covered,
- English + Thai,
- one card-specific Little Ganesha reflection per card/language,
- reflective rather than deterministic,
- no yes/no verdict system,
- no AI-generated answer claim.

## Local persistence

New module: `js/ask-storage.js`

- local-only,
- schema versioned,
- current local day only for restore behavior,
- raw question not stored,
- capped same-day record count,
- no account/cloud/backend dependency.

## Protected systems

No functional changes were made to:

- Reading Engine implementation,
- Daily Guidance UI/content,
- Daily Save/Share pipeline,
- audio engine,
- profile system,
- canonical card assets.

## Build/cache

All applicable live runtime markers advance from `0.4.3` to `0.4.4`, including HTML metadata, resource queries, visible build label, `window.LGT_BUILD`, Service Worker build/cache IDs, and Service Worker shell URLs.

## QA status

Pre-upload QA-S: PASS.  
Real-device/deployed QA: PENDING until P’Benz uploads and tests the candidate.

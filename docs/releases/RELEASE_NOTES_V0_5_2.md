# V0.5.2 — Reading Discipline + Smart Reset

**Baseline:** V0.5.1 / GitHub HEAD `ed38c109ef134c553d247a2e574be8b43f7f969f`  
**Risk:** MEDIUM — local persistence and reading-state policy change; Reading Engine, Deck Ritual, interpretation engines, Save/Share, and visual card-selection architecture remain protected.

## What changed

- Added bilingual semantic duplicate detection for Ask Ganesha.
- Exact or semantically equivalent same-day questions restore the same card and the original semantic answer contract.
- Preserved distinctions for materially different topic, named person, timeframe, condition, and comparison.
- Added privacy-preserving semantic metadata without storing raw question text.
- Removed intentional same-day Ask record eviction so an earlier same-day question is not deliberately forgotten just because many other questions were asked later.
- Added Three-Card local persistence after successful interpretation only.
- Three-Card now restores the same completed spread throughout the local calendar day and unlocks after device-local midnight.
- Added shared `reading-day.js` for local-date, next-midnight, countdown formatting, background suspension, and foreground recalculation.
- Added Quiet Countdown to completed Daily / Three-Card readings and to restored Ask duplicates.
- Preserved the existing audio foreground/background behavior after verifying that the V0.5.1 baseline already pauses only active playback and resumes only playback paused by visibility.
- Updated Daily and Ask selection copy so it no longer suggests scrolling through the compact full deck.

## What did not change

- Reading Engine remains 1.1.0.
- Deck Ritual remains 1.1.0 and the V0.5.1 six-row compact 78-card UX is unchanged.
- Semantic Ask composition, Question Contract, Ask Context, spiritual/unseen boundaries, Three-Card Narrative, Save/Share, profile/zodiac, and card content remain protected.

# Little Ganesha Tarot — App Foundation V0.3.6

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Master Plan:** V3.7

## Purpose
V0.3.6 is the Premium Home Polish release over the stabilized V0.3.5 Home architecture. It intentionally avoids another structural rebuild and focuses on refinement, readability, density, and real-device presentation.

## Key changes
- tightens Home header height and softens the lower-edge transition,
- refines Thai/English typography rhythm while preserving paired-card alignment,
- removes the English-style comma from Thai personalized greetings,
- simplifies sacred motifs toward a cleaner premium emblem language,
- slightly strengthens Explore icon legibility,
- compacts the global Mini Player without removing controls,
- retains explicit-only browser Fullscreen behavior,
- preserves PWA standalone behavior, audio lifecycle, profile storage, Support placeholders, navigation, and card assets.

## QA status
- pre-deploy Git-blob baseline verification against GitHub V0.3.5: PASS
- static / structural automated checks: 198 / 198 PASS
- simulated Chromium application-flow checks: 22 / 22 PASS
- simulated responsive-layout checks: 150 / 150 PASS
- post-deployment Android real-device TH/EN Home visual gate: PASS
- Android launcher App Icon/PWA identity: PASS
- Home Visual System V0.3.6: APPROVED / CANONICAL
- iPhone/iPad PWA real-device gate: pending

Runtime remains V0.3.6. Master Plan V3.7 is a documentation/governance/roadmap update and intentionally does not bump the runtime build.

See `QA_V0_3_6.md`, `RELEASE_NOTES_V0_3_6.md`, `MASTER_PLAN.md`, and `ROOM_MIGRATION_PROMPT_V3_7.md`.

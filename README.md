# Little Ganesha Tarot — App Foundation V0.3.6

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Master Plan:** V3.6

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
- Git-blob baseline verification against current GitHub `main` V0.3.5: PASS
- static / structural automated checks: 198 / 198 PASS
- simulated Chromium application-flow checks: 22 / 22 PASS
- simulated responsive layout checks (TH/EN, 320/360/390/430 widths): 150 / 150 PASS

Final canonical visual acceptance still requires one post-deployment real-device screenshot/device pass because OS font rasterization, browser chrome, DPR, and safe-area behavior cannot be fully proven before deployment.

See `QA_V0_3_6.md` and `RELEASE_NOTES_V0_3_6.md`.

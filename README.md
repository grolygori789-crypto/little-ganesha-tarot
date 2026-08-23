# Little Ganesha Tarot — V0.8.0 Native Hindi Launch

**Studio:** Benedict Interactive  
**Target runtime:** V0.8.0  
**Baseline runtime:** V0.7.1  
**Baseline GitHub HEAD:** `579d54bcfa15da5ebc382321ed9f96a770a8c661` — `Polish universal app icon V0.7.1`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)

## What ships

V0.8.0 adds **Hindi (हिन्दी)** as the third first-class product language beside English and Thai.
Hindi is not a sentence-by-sentence translation layer. The release adds an independent Hindi
localization and tarot-writing system designed to read like natural modern Indian Hindi and to
preserve the product's professional-reader standard.

The Hindi launch covers:

- splash/title/home/onboarding/settings/profile UI;
- Daily Guidance, including all 78 cards, keywords, core meanings, reflection prompts and six daily lenses;
- Ask Ganesha, including Hindi question analysis, topic/facet routing, same-day semantic restore, safety boundaries and contextual Hindi answers;
- Three-Card Reading with all six Focuses;
- The Golden Path with all six Focuses;
- Remove the Obstacle with all six Focuses;
- per-Focus read-today/revisit state and countdown copy;
- Hindi Save/Share artwork;
- Devanagari-specific typography using Noto Sans Devanagari and Noto Serif Devanagari.

## Native-language standard

Hindi copy is authored independently for meaning, rhythm, register and cultural naturalness.
It uses respectful `आप`, modern everyday Hindi, restrained English loanwords where they sound
normal in Indian product/tarot usage, and avoids literal translation, over-Sanskritized UI,
generic mystical filler and fake certainty.

Tarot readings remain contextual and practical: the selected Focus or Ask question defines the
subject, while the cards define what can responsibly be said about that subject.

## Safety and trust

Hindi Ask Ganesha adds Hindi-aware boundaries for medical diagnosis/outcome, legal verdicts,
gambling/lottery prediction, specific investment-price or guaranteed-return requests, death timing,
and immediate safety/crisis wording. Money readings remain reflective rather than investment
instructions; well-being readings do not diagnose or replace qualified care.

## Architecture

V0.8.0 deliberately isolates Hindi support instead of rewriting real-device accepted reading flows.
New localization modules attach Hindi card content, Hindi question analysis, Hindi narrative
composition, Hindi-aware Ask storage, Hindi export rendering and a Hindi presentation layer while leaving selection,
storage, per-Focus daily locks, card IDs, shuffle mechanics and protected reading subsystems intact.

## Protected behavior

No change to Reading Engine 1.1.0, Deck Ritual 1.1.0, 78-card pre-shuffle/prebound integrity,
Daily/Ask persistence semantics, Signature Focus daily-lock behavior, card viewers, audio lifecycle,
or the V0.7.1 universal icon system.

## Acceptance

Static/package QA is included. **Real-device Hindi acceptance remains required** for Devanagari
layout, language switching, all five reading modes, Ask question routing, same-day restores,
Focus status, Save/Share and PWA refresh behavior.

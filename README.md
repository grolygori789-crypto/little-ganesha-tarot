# Little Ganesha Tarot — V0.5.1 Compact Full-Deck UX Polish

**Studio:** Benedict Interactive  
**Target runtime:** V0.5.1  
**Baseline runtime:** V0.5.0  
**Baseline GitHub HEAD:** `e437f063d5e153183241c37fda7b5e5200a40ea9` — `Add Three Card Ritual V0.5.0`  
**Risk:** MEDIUM  
**Architecture:** local-first · no AI/API/backend · Reading Engine 1.1.0 preserved · Deck Ritual 1.1.0

## Purpose

V0.5.1 polishes the already-shipped three playable reading modes by fitting the **entire 78-card facedown deck inside one mobile viewport** and removing dead layout space after selection. The protected Daily, Semantic Ask, Three-Card narrative, Save/Share, and Reading Engine behavior remains unchanged.

The selection experience follows one shared premium visual language: the deck is shuffled first, every facedown position is bound to a real hidden card, and the user chooses the position themselves. No card is generated or re-randomized after the tap.

## Premium Deck Ritual

- The full 78-card deck is securely shuffled once before selection.
- All 78 facedown positions are presented as **six overlapping rows of 13 cards**, so the complete shuffled deck is visible at once on a portrait phone without horizontal deck scrolling.
- The visible cards overlap in the same physical visual language, while each selectable exposed strip remains a distinct position mapped to one hidden card before the user taps.
- Selected cards lift from the spread with a restrained gold highlight.
- Three-Card selections receive subtle 1 / 2 / 3 order markers before reveal.
- Keyboard users get roving focus plus Left/Right/Up/Down/Home/End navigation.
- The component is created only while a reading is choosing cards and is destroyed afterward. In Three-Card, the selection stage now collapses completely after the third choice, so the selected-card rail and Reveal action move together without a blank viewport-sized gap.

### Mode treatment

**Daily Guidance — Quick Ritual**  
Choose one card from the full shuffled deck. The layout is slightly tighter so a daily pull remains fast and light.

**Ask Ganesha — Focus Ritual**  
After the question has been accepted, hold the question in mind and choose one card from the full shuffled deck. Same-question/same-day restoration remains protected and keeps the original card.

**Three-Card Reading — Full Ritual**  
Choose three cards from the full shuffled deck in order: **Past → Present → What May Unfold Next**. All three remain facedown until the spread is ready, then the reading is revealed as one connected story.

## Three-Card Narrative Standard

Three-Card is intentionally not three one-card definitions placed side by side. The narrative layer reads **Past → Present → What May Unfold Next** as one connected movement, with the middle card treated as the hinge between background and direction.

The composer uses 78 curated bilingual card essences, card tone, arcana/suit/court patterns, and movement between the first, middle, and final card. Thai and English are authored separately rather than translated at runtime. The result must explain where the story came from, what is changing now, and where the present pattern may lead without requiring the reader to decode tarot jargon.

The final card is always framed as a **direction**, never a guaranteed future.

## Language Standard — All Playable Modes

Daily Guidance, Ask Ganesha, and Three-Card Reading are held to the same product voice standard:

- Thai must read like natural professional Thai, not translated or textbook language.
- English must read like native professional English, not Thai-shaped English.
- The reading should sound like an experienced tarot reader explaining the situation clearly, not a card dictionary.
- Keep the language understandable on first read and practical enough to apply.
- Avoid vague mystical filler, deterministic fate claims, unnecessary jargon, and forced positivity.
- Where cards conflict, the reading must explain the tension rather than flatten it into a generic positive message.

## Save + Share

**Save Image + Share remain standard utilities for every playable reading mode.** The permanent product rule is: **Save Image + Share as the standard result utilities for every tarot reading mode**. Three-Card uses the same shared export transport as Daily and Ask, with a mode-specific renderer.

## Protected Behavior

Daily persistence, Ask same-question/same-card behavior, Semantic Ask, Spiritual & Unseen boundaries, question privacy, Home profile/age/zodiac, audio, PWA behavior, and existing Save/Share remain protected.

## QA

Automated QA covers the canonical 78-card model, full-deck selection capacity, six-row compact ritual wiring, multi-card uniqueness/position mapping, selection-stage collapse, bilingual narrative samples, Semantic Ask, Save/Share, runtime version coherence, and inherited Daily/Ask/Three-Card regressions.

Real-device visual/touch QA remains required after deployment.

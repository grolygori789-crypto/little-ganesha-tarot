# Little Ganesha Tarot — V0.5.0 Three-Card Reading + Premium Deck Ritual

**Studio:** Benedict Interactive  
**Target runtime:** V0.5.0  
**Baseline runtime:** V0.4.9  
**Baseline GitHub HEAD:** `4e7fc783b61c651f8827272f387f5d822ad2ff49` — `Polish zodiac profile V0.4.9`  
**Risk:** MEDIUM  
**Architecture:** local-first · no AI/API/backend · Reading Engine 1.1.0 multi-card/full-deck extension

## Purpose

V0.5.0 completes the third playable reading mode: **Three-Card Reading** and upgrades card choice across every currently playable mode so the user chooses from the **actual 78-card shuffled deck** rather than from a small pre-filtered set.

The selection experience follows one shared premium visual language: the deck is shuffled first, every facedown position is bound to a real hidden card, and the user chooses the position themselves. No card is generated or re-randomized after the tap.

## Premium Deck Ritual

- The full 78-card deck is securely shuffled once before selection.
- All 78 facedown positions are then presented as **three overlapping rows of 26 cards**, matching the physical feel of a deck spread across a table.
- The visible cards overlap, but their touch targets do **not** overlap; this keeps the physical look without making selection unreliable on mobile.
- Selected cards lift from the spread with a restrained gold highlight.
- Three-Card selections receive subtle 1 / 2 / 3 order markers before reveal.
- Keyboard users get roving focus plus Left/Right/Up/Down/Home/End navigation.
- The component is created only while a reading is choosing cards and is destroyed afterward, keeping DOM/performance cost bounded.

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

Automated QA covers the canonical 78-card model, full-deck selection capacity, three-row ritual wiring, multi-card uniqueness/position mapping, bilingual narrative samples, trajectory handling, Major/suit patterns, unsafe deterministic wording, Save/Share, runtime version coherence, and inherited Daily/Ask regressions. A headless Chromium interaction test additionally verified 78 rendered positions, 26/26/26 row distribution, exact exposed-strip selection, 1/2/3 order tracking, and keyboard navigation.

Real-device visual/touch QA remains required after deployment.

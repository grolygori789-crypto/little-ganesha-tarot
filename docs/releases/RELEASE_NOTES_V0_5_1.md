# V0.5.1 — Compact Full-Deck UX Polish

**Baseline:** V0.5.0 / GitHub HEAD `e437f063d5e153183241c37fda7b5e5200a40ea9`  
**Risk:** MEDIUM — shared reading-selection presentation across all three playable modes; protected reading interpretation logic unchanged.

## What changed

- Reflowed the full 78-card facedown deck from 3 × 26 to **6 × 13 overlapping rows**.
- The complete deck now fits inside one portrait-phone selection stage with **no horizontal deck scrolling**.
- Preserved pre-shuffle mapping: every position is bound to a hidden real card before selection.
- Daily Guidance and Ask Ganesha keep one-card selection from all 78 cards.
- Three-Card keeps three unique user-selected cards in Past → Present → What May Unfold Next order.
- After the third Three-Card choice, the deck component is destroyed and the selection stage is removed from layout, eliminating the large dead space before Reveal.
- The selected-card rail has safe scroll margin so it is not tucked behind the reading header when the layout compacts.
- Updated the first Three-Card selection instruction so it no longer tells users to scroll through the deck.

## Protected behavior

No changes to Semantic Ask composition, Question Contract, Ask Context, spiritual boundaries, Three-Card Narrative Engine, Daily persistence, same-question/same-card behavior, Save/Share renderers, card mapping, or Reading Engine 1.1.0.

## UX target

The full deck should feel physically spread and user-chosen while remaining immediately scannable on a phone. Once a choice is complete, the interface should transition directly to the selected card(s) and Reveal action without leaving an empty stage behind.

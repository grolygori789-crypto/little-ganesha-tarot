# Release Notes — V0.6.1 Golden Path Hotfix

**Baseline:** V0.6.0 / `0ba83f9e24d23e2bd27b6ad99c02218e174fc182`  
**Reading Engine:** 1.1.0 unchanged

## Fixed

### Golden Path card backs
The compact 78-card selection ritual now receives the canonical card-back asset instead of an empty image source, eliminating broken-image placeholders.

### Golden Path three-card selection
The ritual now receives `selectionLimit: 3`, so choosing the first card no longer disables the rest of the deck. Users can select all three positions in order.

## Root cause

`js/golden-ui.js` created `LGTDeckRitual` with only the container, labels and selection callback. Deck Ritual safely defaults to an empty `cardBack` and a single-card `selectionLimit`, which is correct for generic callers but wrong for Golden Path.

The hotfix brings Golden Path's Deck Ritual invocation into parity with the already accepted Three-Card configuration without changing shared infrastructure.

## Preserved

Golden Focus selection, Reading Engine integrity, Golden narrative, one-completed-reading-per-local-day lock, same-day restore, Quiet Countdown, Save/Share, artwork viewer, Daily, Ask, Three-Card, audio and profile behavior are unchanged.

## Runtime

All applicable live build/cache markers move together from 0.6.0 to 0.6.1.

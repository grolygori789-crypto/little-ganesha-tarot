# Native Language V1.1 — Complete Regression Fix

Baseline: current main b89fe712d3b5152801e0055b4c40718d42042a5a

This package repairs every regression confirmed in the Native Language V1 QA sweep.

What changed
- Removed all semantic wrappers for Ask Ganesha, Three-Card, Golden Path, Remove the Obstacle, Lucky Numbers, Tarot Guide, and Journal.
- Removed dynamic-ID rewriting that was overwriting restored/choosing/revealed state copy.
- Restored canonical six Daily Guidance lenses, so Work, Money, Love, Inner Balance, Watch-outs, and Guidance remain genuinely different.
- Restored canonical Ask question/topic/timeframe validation and semantic composition.
- Restored canonical focus-aware narratives for Three-Card, Golden Path, and Remove the Obstacle.
- Restored canonical Lucky Number core/support/balance content.
- Restored canonical Save/Share source parity.
- Kept plain English/Thai wording only where it is safe: static menu/settings data-copy text and the 78 cards' main upright meaning.
- Hindi is unchanged.

Architecture
- The language file now loads only twice: once after reading-content for the 78 upright meanings, and once at the end for static UI copy.
- No subtree MutationObserver.
- No stateful reading IDs are rewritten.
- No semantic module is replaced or wrapped.

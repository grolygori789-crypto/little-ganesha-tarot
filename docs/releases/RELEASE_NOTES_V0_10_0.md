# Release Notes — V0.10.0 Tarot Library

**Release:** V0.10.0  
**Baseline:** V0.9.1 (`df8732c02182d012a95b8c8aa6ccfb7b1633f881`)  
**Risk:** HIGH operational / MEDIUM functional

## Summary

V0.10.0 replaces the Card Library placeholder with **Tarot Library**, a complete premium editorial
archive for Little Ganesha Tarot.

### Explore the 78 Cards

- Browse the canonical 78-card deck using existing Little Ganesha artwork.
- Search by localized name, canonical name or native keyword.
- Filter All / Major / Minor / Wands / Cups / Swords / Pentacles.
- Open a full card page with localized title, metadata, keywords, upright meaning, reflection and six practical lenses.
- Card images lazy-load to avoid making the initial app shell unnecessarily heavy.

### Learn Tarot

- A museum-grounded editorial history from fifteenth-century game cards to later divinatory and occult traditions.
- Clear distinction between documented history and unproven ancient-origin claims.
- Visual 22 + 56 = 78 deck structure.
- Four-suit education using canonical Little Ganesha Ace artwork.
- Court-card and symbolism guidance.

### Ways to Read

- One-card reading.
- Three-card narrative logic.
- Better question design.
- Reversal traditions and Little Ganesha's upright-first implementation.
- Contradictory cards as meaningful tension.
- Why completed daily readings are not rerolled until their product-defined reset.

### Little Ganesha Spreads

Guides for:

- Daily Guidance
- Ask Ganesha
- Three-Card Reading
- The Golden Path
- Remove the Obstacle
- Lucky Numbers

### Tarot Essentials

Concise FAQ material covers fixed-future claims, contextual card meanings, beginner use, same-day persistence,
reversals and the distinction between Tarot and Lucky Numbers.

### About & Guide

A new Settings section opens product-specific information covering privacy/local storage, daily rules,
Save/Share, first-class languages, Reduced Motion and Benedict Interactive project information.

## Visual direction

No stock or unrelated generated artwork is introduced. The Library uses canonical card artwork,
code-driven deck/spread diagrams, deep teal surfaces, aged gold accents and warm editorial typography.

## Localization

All new Library and About & Guide UI/editorial copy ships in native English, Thai and Hindi.

## Runtime changes

- `index.html` gains Library CSS/JS and changes Card Library presentation to Tarot Library.
- `js/app.js` updates the Cards label and V0.10.0 runtime marker only; generic app navigation/state logic is otherwise unchanged.
- `sw.js` moves to V0.10.0 and adds Library CSS/JS to the app shell.
- `manifest.webmanifest` moves icon cache-bust references to V0.10.0.

## Protected systems

Unchanged: Reading Engine 1.1.0, Deck Ritual 1.1.0, 78-card identity/art, tarot draws, Daily/Ask/Focus persistence,
Hindi Ask semantic/safety systems, reading Save/Share, Lucky Numbers V0.9.1, audio lifecycle, existing viewers and icons.

## Acceptance

Static/package/headless-browser QA passes. Real-device V0.10.0 acceptance remains pending.

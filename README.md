# Little Ganesha Tarot — V0.10.0 Tarot Library

**Studio:** Benedict Interactive  
**Target runtime:** V0.10.0  
**Stable baseline runtime:** V0.9.1  
**Stable baseline GitHub HEAD:** `df8732c02182d012a95b8c8aa6ccfb7b1633f881` — `Polish Lucky Numbers V0.9.1`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)

## What ships

V0.10.0 turns the former **Card Library** placeholder into a complete **Tarot Library**: a premium,
mobile-first editorial room for browsing the full 78-card deck, learning how tarot developed,
understanding how cards are read in context, and learning how every Little Ganesha reading mode works.

The Library has five primary rooms:

1. **Explore the 78 Cards** — searchable/filterable canonical deck with full card artwork and detailed card pages.
2. **Learn Tarot** — history, 78-card structure, Major/Minor Arcana, four suits, court cards and symbolism.
3. **Ways to Read** — one-card and three-card reading, better questions, reversals, card tension and reroll discipline.
4. **Little Ganesha Spreads** — Daily Guidance, Ask Ganesha, Three-Card Reading, The Golden Path, Remove the Obstacle and Lucky Numbers.
5. **Tarot Essentials** — concise answers to important beginner and product-context questions.

Settings also gains **About & Guide**, covering privacy, daily-reading rules, Save/Share, languages,
accessibility and project information without crowding the Tarot learning experience.

## Premium editorial visual system

The Library uses the canonical Little Ganesha card artwork already in the product as its visual anchor.
It does not add stock imagery or unrelated decorative art. The home hero uses a restrained three-card
fan, suit education uses representative canonical cards, and reading-method pages use lightweight
code-driven spread diagrams. Deep teal, antique gold, warm ivory, fine borders and generous negative
space keep the experience consistent with Little Ganesha rather than turning it into a generic help page.

All 78 card images are lazy-loaded in the deck browser; they are not added wholesale to the Service
Worker application shell. This protects startup/cache weight while preserving the premium visual experience.

## 78-card deck detail

The Library reads from `window.LGTReadingContent`, the same canonical 78-card source used by the reading
experience. It therefore reuses existing card IDs, titles, artwork, keywords, upright meanings,
reflection questions and six practical reading lenses instead of creating a second deck database.
Hindi continues to use the existing first-class Hindi card content layer.

No card probability, shuffle, draw, persistence or reading outcome can be changed from the Library.
It is an educational/exploration surface only.

## Historical standard

Tarot history is deliberately written conservatively. The Library distinguishes documented history
from later occult tradition: early tarot is presented as a Renaissance card game; divinatory use and
occult systems are presented as later developments; claims of an ancient Egyptian origin are identified
as later claims rather than established historical fact.

The history editorial basis for this release was checked against museum scholarship from The Metropolitan
Museum of Art and the Victoria and Albert Museum.

## Native languages

English, Thai and Hindi are first-class throughout the Tarot Library: navigation, search/filter UI,
card detail labels, history, teaching material, spread guides, FAQs, About & Guide and accessibility
labels are authored for natural reading in each language rather than runtime machine translation.

The canonical `LITTLE GANESHA TAROT / THE GOLDEN PATH` brand lockup remains unchanged across locales.

## Navigation and accessibility

The Library is a dedicated full-screen overlay with persistent Back and Home controls. Card detail
returns to the deck; educational rooms return to the Library hub; Home exits the Library cleanly.
Escape follows the same hierarchy on keyboard-capable devices.

Reduced Motion removes or shortens decorative Library motion without changing content or navigation.
The deck browser supports search, Arcana/suit filters, lazy images and mobile-first responsive layouts.

## Protected behavior

V0.10.0 does not change Reading Engine 1.1.0, Deck Ritual 1.1.0, canonical 78-card IDs/artwork,
pre-shuffle/prebound selection integrity, Daily Guidance persistence, Ask Ganesha semantics/persistence,
Signature Focus daily locks, existing reading Save/Share, Hindi Ask analysis/storage/safety behavior,
Lucky Numbers V0.9.1 daily-result contract, audio lifecycle V0.5.3, existing card viewers or universal icons.

## Runtime coherence

The PWA build/cache identity moves coherently to V0.10.0: HTML asset query strings, manifest icon
references, `window.LGT_BUILD`, visible build label, Service Worker build/cache IDs and app-shell URLs
move together. New Library CSS/JS are included in the application shell; the 78 full-resolution card
images remain runtime/lazy resources.

Because the Service Worker identity changes, deployment is operationally HIGH risk even though the
new feature is additive and isolated from reading-selection state.

## Acceptance

Static, syntax, content-contract, package and headless Chromium interaction QA are included and pass.
**Real-device V0.10.0 acceptance remains required** for Library navigation, 78-card browsing, search,
filters, card-detail typography/images, EN/TH/HI layouts, Settings About & Guide, reduced motion,
mobile safe areas and PWA refresh/cache activation.

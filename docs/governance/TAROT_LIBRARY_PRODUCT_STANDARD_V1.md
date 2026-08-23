# Tarot Library Product Standard V1

**Product:** Little Ganesha Tarot — The Golden Path  
**Introduced:** V0.10.0  
**Status:** Canonical product standard

## 1. Purpose

Tarot Library is the product's permanent educational and deck-exploration surface. It must feel like a
private premium editorial archive, not a generic FAQ page, SEO article, or separate tarot application.
Its job is to help a complete beginner understand the deck while still offering enough contextual depth
that an experienced reader does not feel patronised.

## 2. Information architecture

The primary Library hub contains exactly these conceptual rooms:

- Explore the 78 Cards
- Learn Tarot
- Ways to Read
- Little Ganesha Spreads
- Tarot Essentials

App-operation material belongs to **About & Guide** in Settings. Reading-mode instructional detail may
also be surfaced contextually inside a mode in future releases, but adding contextual help must never
risk changing an already accepted reading flow merely to duplicate Library content.

## 3. Visual standard

Use curated editorial visuals only.

- Canonical card artwork is the primary visual material.
- Hero visuals should be restrained and composition-led rather than image-heavy.
- Structural concepts should prefer code/SVG/CSS diagrams when they teach more clearly than decorative art.
- Do not use stock mystical imagery, unrelated fantasy art, random generated decoration, or an image after every paragraph.
- Maintain Little Ganesha's deep teal, antique gold, warm ivory, fine-line and calm negative-space language.
- Full-resolution card art in large collections must lazy-load and must not be forced into the Service Worker app shell.

## 4. Canonical deck integrity

The Library must read canonical card identity and artwork from `window.LGTReadingContent`.
It must not create an independent 78-card ID map that can drift from reading runtime.

The Library may present:

- title and canonical title;
- Arcana/suit/rank metadata;
- canonical artwork;
- native keywords;
- upright-first core meaning;
- reflection prompt;
- six context lenses already present in the product.

Library interaction must never alter shuffle order, draw probability, daily locks, reading persistence,
question semantics, Focus state or saved reading results.

## 5. Language standard

English, Thai and Hindi are equal first-class languages. Educational prose is authored for each language's
natural register and reading rhythm. It must not feel like literal machine translation or forced transliteration.
Card meanings shown by the Library reuse the product's already-approved native card content.

Brand masthead typography remains locale-independent; localized editorial/UI typography follows the
existing Thai/Devanagari font system.

## 6. Historical integrity

Historical claims must distinguish documentary history from later esoteric tradition.

Canonical framing for V1:

- early documented tarot references cluster in fifteenth-century northern/central Italian courts;
- tarot was originally used as a trick-taking card game;
- the familiar structure combines four Italian suits with trump cards and the Fool;
- explicit divinatory/occult associations develop substantially later;
- late-eighteenth-century French cartomancy and Etteilla are part of the later divination story;
- ancient Egyptian-origin claims are later claims and are not presented as established historical fact;
- nineteenth-century occult writers further associated tarot with systems such as numerology, astrology and Kabbalah;
- modern illustrated decks strongly shaped contemporary reading practice.

Museum scholarship checked for this release:

- The Metropolitan Museum of Art — *Before Fortune-Telling: The History and Structure of Tarot Cards*.
- Victoria and Albert Museum — *A history of tarot cards*.

Historical copy should be updated when stronger scholarship materially changes a claim.

## 7. Reading education standard

Teach interpretation as context, not keyword memorisation.

The educational model should explain that meaning is influenced by:

- the actual question;
- Focus/topic;
- the card's assigned position;
- neighbouring cards;
- tension/contradiction inside a spread;
- suit/rank/Arcana role;
- the difference between a potential direction and a guaranteed future.

Reversals are described as a tradition-dependent technique. The current Little Ganesha runtime remains
upright-first; the Library must not imply that reversed cards are currently being drawn when they are not.

## 8. Product-specific guidance

The Library may document product contracts but must accurately reflect runtime:

- Daily Guidance: one completed reading per local day.
- Ask Ganesha: semantically equivalent same-day question families restore the same reading.
- Signature Focus modes: one completed reading per Focus per local day.
- Lucky Numbers: one fixed daily set; replay never rerolls it.
- Save/Share: device-first export; Ask exact question hidden from shared artwork by default.

Do not rewrite a product contract in educational copy without changing and validating the runtime contract itself.

## 9. Accessibility and navigation

- Back and Home must always provide a clear escape path.
- Search and filters must be keyboard/touch accessible.
- Reduced Motion must preserve all information and navigation while removing nonessential motion.
- Content must not require hover to understand or operate.
- Maintain no-horizontal-scroll and safe-area compatibility on mobile.

## 10. Performance

The 78 card artworks are already large canonical assets. Library grids must lazy-load them. Service Worker
precache should include Library code/styles but not add all full-size card images solely because the Library exists.

## 11. Protected runtime

Tarot Library work must not modify Reading Engine, Deck Ritual, draw mechanics, persistence, semantic question
logic, Signature Focus locks, audio lifecycle, Lucky Numbers result generation, or accepted card viewers unless
a separate requirement explicitly demands it and receives appropriate risk review.

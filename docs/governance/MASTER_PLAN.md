# LITTLE GANESHA TAROT — MASTER PLAN & ZERO-QUESTION DEVELOPMENT HANDOFF V4.0

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio / Publisher:** Benedict Interactive  
**Canonical document version:** 4.0  
**Last updated:** 22 August 2026  
**Status:** ACTIVE — CANONICAL SOURCE OF TRUTH  
**Document type:** Master Plan + Product Specification + Engineering Governance + Zero-Question Room Migration Handoff

**Current canonical runtime build:** 0.4.3  
**Current verified runtime implementation commit:** `3bd6764dfdf17a7e6691113133d13b085b99df29` — `Add save and share for daily guidance`  
**Current runtime status:** DEPLOYED — Daily Guidance core flow is implemented; Android real-device Save Image and native Share are reported PASS by the Founder; generated export visual review is PASS; Home/App Icon/PWA Android foundations remain protected; iPhone/iPad real-device PWA and Save/Share gates remain pending.

---

# 0. Executive Authority Statement

This document is the canonical, self-contained development authority for **Little Ganesha Tarot — The Golden Path**.

V4.0 marks the transition from the application-foundation era into the **working tarot product era**. It supersedes V3.7 and earlier Master Plans wherever they conflict, and it updates the project to the verified V0.4.3 runtime state after the Reading Engine, Daily Guidance, native bilingual content, Daily Lenses, and Save/Share flow became real product functionality.

A new room, future assistant instance, developer, or handoff recipient must be able to continue the project from this document, the current GitHub repository, approved assets, and the companion `ROOM_MIGRATION_PROMPT_V4_0.md` without making P’Benz reconstruct prior history.

## 0.1 Source-of-truth order

When canonical sources conflict, use this order strictly:

1. **Biu’s newest explicit FINAL product/development decision in the current room under the active Full Authorized Dev mandate.**
2. **This Master Plan V4.0.**
3. **Approved canonical production assets**, including the 78-card deck, card back, title hero, app icon, and later explicitly approved replacements.
4. **Current verified GitHub `main` implementation**, provided it does not conflict with items 1–3.
5. Earlier Master Plans, prompts, manifests, release packages, prototypes, experiments, rejected builds, and Founder proposals not yet accepted into the canonical direction.

Historical documents may remain in the working tree for provenance, but they are **historical references only** once superseded by this document.

## 0.2 Founder and development authority — FINAL GOVERNANCE LOCK

**P’Benz is Founder / Vision Originator / Repository Owner.** He may propose product ideas, business models, creative direction, assets, priorities, and opportunities at any time. He may also provide real-device evidence, account authorizations, and manual GitHub Desktop upload/push actions when required.

**Biu is the Full Authorized Product & Development Lead with final 100% product-development decision authority** over:

- product scope and sequencing,
- UX / UI / interaction design,
- visual-system decisions,
- app architecture and code structure,
- data models and state strategy,
- Reading Engine direction,
- local persistence strategy,
- mobile/PWA behavior,
- accessibility,
- performance,
- privacy/security implementation,
- localization architecture and language quality gates,
- audio/motion/SFX behavior,
- QA strategy,
- release gates,
- runtime version/build numbering,
- refactoring,
- rollback,
- whether a Founder proposal should be accepted, modified, deferred, replaced, or rejected.

P’Benz’s ordinary product ideas are high-value Founder proposals, not literal implementation commands. Biu is responsible for choosing the solution that best protects product quality, maintainability, stability, user trust, worldwide usability, and long-term viability.

Only an explicit decision by P’Benz to **revoke or redefine the Full Authorized Dev delegation itself** changes this governance lock.

Account ownership, legal identity, payment accounts, credentials, taxes, contracts, and actions that inherently require P’Benz’s authorization remain outside Biu’s account authority. That operational boundary does not reduce Biu’s development authority.

## 0.3 Working code is protected territory

Any subsystem that has been deployed and verified to work correctly becomes **protected stable behavior**.

Do not rewrite, replace, or destabilize a working subsystem merely because rebuilding it would be cleaner, more fashionable, or easier to explain. Refactor only when there is a concrete benefit in reliability, compatibility, security, performance, accessibility, maintainability, or product quality.

**Regression prevention has priority over novelty.**

## 0.4 Canonical-build promotion rule

A candidate runtime build becomes canonical only after the relevant gates pass:

1. GitHub-first baseline verification,
2. impact/risk review,
3. implementation,
4. static/structural QA,
5. runtime validation where available,
6. archive/package integrity verification,
7. GitHub push/deployment,
8. re-read of deployed `main`,
9. appropriate real-device validation,
10. Biu release decision,
11. canonical promotion.

A package may be called **verified for upload** before deployment, but it must not be described as fully runtime-validated until the relevant runtime/device checks actually occur.

## 0.5 Golden product rule

> **A working, understandable, maintainable Little Ganesha Tarot is more valuable than a more ambitious Little Ganesha Tarot that becomes fragile.**

If two approaches produce similar user value, prefer the one with lower operational complexity, lower regression risk, clearer ownership, easier rollback, and smaller maintenance burden.

---

# 1. Product Identity and Current Business Direction

## 1.1 Product name

**Little Ganesha Tarot**  
**Subtitle:** **The Golden Path**

## 1.2 Studio identity

**Benedict Interactive** is the studio/publisher identity.

The app should feel like a carefully authored premium independent product, not a hobby page, generic fortune generator, or disposable mobile-game skin.

## 1.3 Product positioning

Little Ganesha Tarot is a **premium, sacred-friendly, visually rich, RWS-inspired 78-card tarot experience** centered on one identity-locked Little Ganesha protagonist.

It combines:

- a complete collectible tarot deck,
- calm mobile-first readings,
- reflective rather than deterministic guidance,
- native-quality multilingual presentation,
- strong visual and audiovisual identity,
- local-first privacy,
- app-like PWA delivery,
- optional voluntary financial support.

## 1.4 Current canonical business model — OPEN ACCESS + VOLUNTARY SUPPORT

The current canonical monetization direction is:

**Open Access + Voluntary Support**

Meaning:

- the product is not currently designed around login,
- the product is not currently designed around a paywall,
- the product is not currently designed around subscription entitlement,
- tarot quality does not change based on payment,
- support does not influence card selection, luck, spiritual status, or interpretation quality,
- users may support the project voluntarily after receiving value.

Current support channels planned:

- **Worldwide:** Buy Me a Coffee
- **Thailand:** PromptPay

This model is intentionally chosen because it preserves the cleanest UX and the lowest system complexity while allowing users who value the product to help sustain it.

## 1.5 Core experience principles

1. **Tarot validity first.**
2. **Little Ganesha identity consistency.**
3. **Premium sacred warmth without childishness or gaudiness.**
4. **Clarity over clutter.**
5. **Immersion without fragility.**
6. **Worldwide mobile usability.**
7. **Reflective uncertainty rather than deterministic claims.**
8. **Privacy by default.**
9. **Support is voluntary and non-coercive.**
10. **Native language quality is a release requirement.**
11. **Version/build coherence is a release requirement.**
12. **Complexity must earn its cost.**
13. **A feature is not Done merely because code exists.**

---

# 2. Complexity Budget & Stability Constitution

This section is a hard architectural rule for all future work.

## 2.1 Default complexity ceiling

New work should normally stay in the **easy-to-medium implementation range**.

A feature may be visually premium and functionally rich while still using straightforward architecture. Complexity is not a proxy for quality.

Canonical decision heuristic:

> **Prefer a 9–9.5/10 user experience at complexity 4/10 over a 10/10 theoretical solution at complexity 9/10.**

## 2.2 Solutions to prefer

Prefer, in order where practical:

1. browser/platform-native capability,
2. small client-side module,
3. existing shared project subsystem,
4. managed third-party service with narrow integration,
5. custom infrastructure only when clearly justified.

## 2.3 Solutions to avoid by default

Avoid introducing without strong evidence:

- custom backend servers,
- custom authentication stacks,
- distributed membership logic,
- complex billing state machines,
- deep framework migrations,
- multi-service architectures for a simple feature,
- broad refactors just to add one isolated capability,
- tightly coupling optional services to the Reading Engine,
- cloud dependencies that make the free/core app unusable when offline or when a provider fails.

## 2.4 Isolation rule

Optional subsystems should fail independently.

Examples:

- support service unavailable → readings still work,
- share API unavailable → save fallback remains,
- audio unavailable → readings still work,
- fullscreen unavailable → app remains usable,
- future account service unavailable → core free functionality must remain usable unless a later explicit business decision intentionally changes that boundary.

## 2.5 Complexity veto

Biu must reject, redesign, or defer a feature when:

- complexity is disproportionate to user value,
- it creates excessive regression surface,
- it requires invasive changes to stable systems for marginal benefit,
- it creates maintenance obligations the project is not prepared to own,
- a simpler solution achieves nearly the same user value.

---

# 3. Canonical Tarot System

## 3.1 Deck size

Exactly **78 canonical cards**:

- 22 Major Arcana
- 56 Minor Arcana

No bonus tarot cards, hidden majors, alternate numbered majors, or non-standard suit cards enter the canonical deck without an explicit future product decision.

## 3.2 Major Arcana numbering lock

RWS convention:

- **VIII — STRENGTH**
- **XI — JUSTICE**

Major sequence:

| Index | Number | Card |
|---:|:---:|---|
| 00 | 0 | THE FOOL |
| 01 | I | THE MAGICIAN |
| 02 | II | THE HIGH PRIESTESS |
| 03 | III | THE EMPRESS |
| 04 | IV | THE EMPEROR |
| 05 | V | THE HIEROPHANT |
| 06 | VI | THE LOVERS |
| 07 | VII | THE CHARIOT |
| 08 | VIII | STRENGTH |
| 09 | IX | THE HERMIT |
| 10 | X | WHEEL OF FORTUNE |
| 11 | XI | JUSTICE |
| 12 | XII | THE HANGED MAN |
| 13 | XIII | DEATH |
| 14 | XIV | TEMPERANCE |
| 15 | XV | THE DEVIL |
| 16 | XVI | THE TOWER |
| 17 | XVII | THE STAR |
| 18 | XVIII | THE MOON |
| 19 | XIX | THE SUN |
| 20 | XX | JUDGEMENT |
| 21 | XXI | THE WORLD |

## 3.3 Minor Arcana suit and rank order

Suit order:

1. Wands
2. Cups
3. Swords
4. Pentacles

Rank order:

Ace → Two → Three → Four → Five → Six → Seven → Eight → Nine → Ten → Page → Knight → Queen → King

Use **Ace**, never “Age”. Use **Page**, never a substituted title.

## 3.4 Minor top-medallion rule

- Ace: neutral ornament only.
- Two–Ten: Roman numerals II–X.
- Court cards: neutral ornament only; no P / Kn / Q / K.

## 3.5 Canonical Minor Arcana index map

### Wands
22 ACE OF WANDS  
23 TWO OF WANDS  
24 THREE OF WANDS  
25 FOUR OF WANDS  
26 FIVE OF WANDS  
27 SIX OF WANDS  
28 SEVEN OF WANDS  
29 EIGHT OF WANDS  
30 NINE OF WANDS  
31 TEN OF WANDS  
32 PAGE OF WANDS  
33 KNIGHT OF WANDS  
34 QUEEN OF WANDS  
35 KING OF WANDS

### Cups
36 ACE OF CUPS  
37 TWO OF CUPS  
38 THREE OF CUPS  
39 FOUR OF CUPS  
40 FIVE OF CUPS  
41 SIX OF CUPS  
42 SEVEN OF CUPS  
43 EIGHT OF CUPS  
44 NINE OF CUPS  
45 TEN OF CUPS  
46 PAGE OF CUPS  
47 KNIGHT OF CUPS  
48 QUEEN OF CUPS  
49 KING OF CUPS

### Swords
50 ACE OF SWORDS  
51 TWO OF SWORDS  
52 THREE OF SWORDS  
53 FOUR OF SWORDS  
54 FIVE OF SWORDS  
55 SIX OF SWORDS  
56 SEVEN OF SWORDS  
57 EIGHT OF SWORDS  
58 NINE OF SWORDS  
59 TEN OF SWORDS  
60 PAGE OF SWORDS  
61 KNIGHT OF SWORDS  
62 QUEEN OF SWORDS  
63 KING OF SWORDS

### Pentacles
64 ACE OF PENTACLES  
65 TWO OF PENTACLES  
66 THREE OF PENTACLES  
67 FOUR OF PENTACLES  
68 FIVE OF PENTACLES  
69 SIX OF PENTACLES  
70 SEVEN OF PENTACLES  
71 EIGHT OF PENTACLES  
72 NINE OF PENTACLES  
73 TEN OF PENTACLES  
74 PAGE OF PENTACLES  
75 KNIGHT OF PENTACLES  
76 QUEEN OF PENTACLES  
77 KING OF PENTACLES

## 3.6 Symbol-count integrity

For numbered Minor Arcana, visible suit-symbol count must match the card identity wherever the symbol count is semantically relevant.

Wrong wand/cup/sword/pentacle count is a production failure even if the artwork is beautiful.

---

# 4. Canonical Visual System and Assets

## 4.1 Absolute deck master

**0 — THE FOOL** is the absolute visual/frame master reference.

Locked frame characteristics include:

- overall geometry and proportions,
- rounded corners,
- ivory/parchment character,
- premium gold ornamentation,
- lotus corner motifs,
- restrained teal ribbon language,
- top medallion geometry,
- bottom title-panel geometry,
- typography language,
- frame-to-art balance,
- warm sacred premium finish.

## 4.2 Little Ganesha identity lock

Little Ganesha is one continuous protagonist across all 78 cards.

Preserve stable:

- facial structure,
- eye language,
- trunk shape,
- ear proportions,
- pink inner-ear treatment,
- child-like age impression,
- head/body relationship,
- skin-color family,
- crown identity,
- jewelry identity,
- sacred-cute premium rendering language.

Identity drift is a hard failure.

## 4.3 World logic

Little Ganesha is the canonical elephant-headed divine identity in this deck world. Supporting humans remain human unless a specific mythological figure is deliberately approved.

Do not add named deities as decorative cameos merely to increase spectacle.

## 4.4 RWS symbolism rule

The deck is RWS-inspired, not a costume-only reinterpretation. Creative staging may vary, but archetypal meaning and recognizable tarot symbolism must remain usable to a real tarot reader.

## 4.5 Canonical production format

Card master:

- **941 × 1672 px**
- **PNG**
- standalone card only
- no sheet remnants
- no unapproved crop

Optimized WebP/AVIF derivatives may be used for performance, but never overwrite canonical PNG masters.

## 4.6 Corrected cards permanently superseding prior versions

- 39 FOUR OF CUPS
- 40 FIVE OF CUPS
- 70 SEVEN OF PENTACLES
- 71 EIGHT OF PENTACLES
- 72 NINE OF PENTACLES

## 4.7 Master card back

Canonical path:

`assets/ui/card-back.png`

Use the exact approved master for functional face-down cards, choosing, shuffle, and reveal interactions.

## 4.8 Title hero

Canonical path:

`assets/ui/title-hero.png`

Approved bright golden-hour 9:16 hero. Do not globally brighten it further without a concrete reason.

## 4.9 Canonical app icon

Canonical master and derivatives:

```text
assets/icons/app-icon-1024.png
assets/icons/icon-512x512.png
assets/icons/icon-192x192.png
assets/icons/icon-maskable-512x512.png
assets/icons/apple-touch-icon.png
assets/icons/favicon-48x48.png
assets/icons/favicon-32x32.png
assets/icons/favicon.ico
```

The final icon is APPROVED/CANONICAL and Android Home Screen verified. Future replacement is a brand-level change.

---

# 5. Opening Experience and Home

## 5.1 Studio splash

Opening begins:

**BENEDICT INTERACTIVE**  
**PRESENTS**

Normal-motion target remains approximately 2.6 seconds. No accidental early skip.

## 5.2 Title screen

Canonical hierarchy:

**LITTLE GANESHA TAROT**  
**THE GOLDEN PATH**  
**TAP TO BEGIN / แตะเพื่อเริ่ม**

Title remains focused. EN/ไทย and sound state may appear as utility controls.

## 5.3 Title-to-app flow

First use:

`Studio Splash → Title → Tap to Begin → Optional Profile Setup → Welcome → Home`

Subsequent use:

`Studio Splash → Title → Tap to Begin → Home`

## 5.4 Browser fullscreen policy — FINAL

`Tap to Begin` **must not automatically request browser fullscreen**.

Browser Full Screen is an explicit user action available in Settings where supported.

Installed PWA uses standalone app-like presentation through the manifest.

Fullscreen is enhancement, never a dependency.

## 5.5 Home Visual System

**Home V0.3.6 = APPROVED / CANONICAL visual baseline.**

Direction:

**Premium Minimal Sacred UI**

Do not continue polishing Home merely to chase marginal aesthetic gain. Future Home changes require a concrete usability, accessibility, compatibility, product, performance, or defect reason.

Rejected Home V0.3.3/V0.3.4 implementations remain historical only and must not be resurrected.

## 5.6 Home hierarchy

Primary readings:

- Daily Guidance
- Ask Ganesha
- Three-Card Reading

Signature Paths:

- The Golden Path
- Remove the Obstacle

Explore:

- Lucky Numbers
- Card Library
- Journal

Bottom navigation foundation:

- Home
- Read
- Cards
- Journal
- Settings

Biu may refine navigation if product maturity reveals a cleaner information architecture.

## 5.7 Sacred motif system

Use restrained symbolic motifs rather than repeating full Little Ganesha portraits in every Home card.

Canonical motifs:

- Daily Guidance — dawn/halo/sacred sparkle geometry
- Ask Ganesha — abstract ear/trunk/profile cue
- Three-Card — triad/card geometry
- Golden Path — luminous path toward star/halo
- Remove the Obstacle — opening knot/loop
- Lucky Numbers — restrained numerology geometry
- Card Library — layered cards
- Journal — manuscript/open-page + lotus seal

Motifs remain decorative and accessibility-silent.

---

# 6. Motion, Audio, and SFX

## 6.1 Living Title

Full Motion may use restrained breathing zoom, light drift, water shimmer, lamp glow, ambient motes/petals, and subtle illumination.

Reduced Motion should reduce spatial travel while retaining calm non-disorienting light/opacity life. Reduced Motion must not make the product look unfinished.

Settings:

- System
- Full
- Reduced

## 6.2 Music philosophy

Music is atmosphere, not the product. All tarot functionality must remain usable with music disabled.

## 6.3 Audio entry behavior

- Studio Splash: silent
- Initial Title: silent
- first Tap to Begin: valid user gesture to unlock audio
- if music is enabled, soundtrack may fade in automatically after entry

## 6.4 Global music continuity

Music persists between screens. Normal navigation does not restart tracks. Mini Player remains global.

Current controls:

- Play / Pause
- Previous
- Next
- track title
- More
- Volume
- Shuffle
- Return to Title

## 6.5 Background/foreground lifecycle

- visible + user intended playback → play
- hidden/background/screen locked → pause/fade down
- foreground return → resume only if it was playing before system pause
- user manual pause → do not auto-resume
- music disabled → remain disabled

System pause and user intent must remain distinct.

## 6.6 Current soundtrack

1. **Golden Lantern at Twilight**
2. **Sunlight on Bronze**

Long-term target may expand toward approximately five premium tracks, but audio expansion must not delay core tarot work.

## 6.7 SFX product decision

Subtle premium UI SFX are approved as a later polish layer, not a core dependency.

Design principle:

> **Sound should make an action feel weighted, not demand attention from the user.**

Preferred character:

- mode select: warm micro-chime / restrained bronze
- card select: tactile paper / wood / fabric
- reveal: restrained bronze + air
- navigation: selective; silence is allowed

Avoid cheap game click/pop/bling language.

SFX perceived prominence must remain lower than music. A separate SFX setting/volume is preferred if the feature is activated.

---

# 7. Worldwide Mobile and PWA Architecture

## 7.1 Worldwide Mobile-First

First-class targets:

1. Android Chrome
2. Android installed PWA
3. iPhone Safari
4. iPhone Home Screen web app/PWA behavior
5. iPad/tablet responsive layouts

The product is not Android-first with Apple fixes added later.

## 7.2 Progressive enhancement

Unsupported optional capability must degrade gracefully:

- Fullscreen unsupported → use viewport
- orientation lock unsupported → stay responsive
- backdrop filter unsupported → fallback styling
- autoplay denied → usable Play state
- Web Share file unsupported → Save fallback
- PWA not installed → full browser experience remains functional

## 7.3 Safe areas

Protect controls from:

- notches
- Dynamic Island
- rounded corners
- Home Indicator
- Android navigation areas

Use safe-area insets where applicable.

## 7.4 Viewport and orientation

Do not assume classic `100vh` equals visible mobile height.

Portrait is the primary art direction, but landscape, rotation, tablet widths, and split-view must remain usable.

## 7.5 Touch-first interaction

No critical hover-only controls. Provide comfortable targets, practical spacing, and non-precision alternatives to gestures.

## 7.6 Current PWA status

Protected PWA foundation includes:

- `manifest.webmanifest`
- relative repository-safe start URL/scope
- `display: standalone`
- Android regular + maskable icons
- Apple touch icon
- favicon set
- service worker
- stale-cache cleanup
- network-aware shell strategy
- isolated `js/pwa.js` registration foundation

Current real-device evidence:

- Android launcher icon: PASS
- Android installed app-like Home presentation: PASS
- Android Home TH/EN visual gate: PASS
- iPhone/iPad Add-to-Home-Screen/standalone gate: PENDING

Do not claim full QA-X PWA completion until iOS/iPadOS is actually tested.

---

# 8. Native Language Standard — GLOBAL RELEASE RULE

This section is a hard product-quality requirement.

## 8.1 Current languages

Current product languages:

- English
- Thai

Future languages may be added only when they can meet the same quality standard without requiring a rewrite of the app architecture.

## 8.2 First-class language principle

Every supported language must read as though the product was **written for that language from the beginning**.

Do not ship copy that feels:

- literally translated,
- machine-translated,
- syntactically imported from another language,
- overly formal for normal UI,
- vague or difficult to understand,
- culturally awkward,
- polished but synthetic/AI-like.

## 8.3 Native fluency requirement

A supported language must satisfy all of:

1. **Meaning parity** — same product meaning and safety intent.
2. **Native fluency** — natural wording a real speaker would expect.
3. **Cultural naturalness** — phrasing fits normal usage in that locale.
4. **Clarity** — easy to understand without decoding product jargon.
5. **Tone consistency** — preserves Little Ganesha’s calm premium character.
6. **UI suitability** — length and structure work in the actual component.
7. **Accessibility parity** — labels/ARIA/helper text are localized too.

## 8.4 No literal-translation workflow

English and Thai are independent native outputs sharing product meaning, not one master sentence copied word-for-word into the other language.

Future languages follow the same rule.

## 8.5 Three voice layers

### UI voice
Short, clear, functional, warm, easy to scan.

### Tarot interpretation voice
Professional, symbolic, grounded, nuanced, reflective, non-deterministic.

### Little Ganesha guide voice
Gentle, wise, perceptive, sacred-friendly, warm; never childish mascot speech or fake spiritual authority.

## 8.6 Localization scope

Language quality applies to **every user-visible or assistive surface**, including:

- Title/entry
- onboarding
- Home
- reading flows
- card names where localized display is used
- keywords
- meanings
- reflections
- Daily Lenses
- Settings
- Profile
- Support
- Journal
- Card Library
- Save/Share export
- statuses/errors/helper text
- confirmations
- accessibility labels
- empty states
- future notifications
- disclaimers
- date/time formatting

## 8.7 Partial localization is not a release

A new language must not be enabled publicly if important surfaces remain mixed or fallback unexpectedly to another language, except for intentionally retained brand names, official track names, or canonical tarot terms where the product deliberately presents them bilingually.

## 8.8 Layout resilience

Localization architecture must allow realistic text expansion. Do not tune component widths around one exact English sentence.

Future CJK or other scripts require font/rendering QA. Future RTL languages require an explicit layout-direction architecture review before activation.

## 8.9 Dates, numbers, and locale formatting

Store stable machine values internally. Display dates/numbers through locale-aware formatting where practical (`Intl` or equivalent) rather than manually embedding one locale’s punctuation/order everywhere.

## 8.10 Native Language Release Gate

Before a language is called production-supported:

- key parity passes,
- no unintended hardcoded user-facing strings remain,
- copy is native-quality reviewed,
- actual layouts are checked at narrow mobile widths,
- reading/export surfaces are reviewed,
- accessibility labels are reviewed,
- date/number behavior is reviewed.

If native quality cannot be achieved yet, do not enable that language merely to increase language count.

---

# 9. Personal Profile and Privacy

## 9.1 Purpose

Personal Profile enables gentle personalization without turning the app into an identity/account system.

## 9.2 Current optional fields

- Display Name / preferred name
- Date of Birth

Both are optional. Users may skip and continue normally.

## 9.3 Current storage rule

- local device only
- no login
- no server upload
- editable
- clearable by user

## 9.4 Date of Birth scope

May support symbolic personalization, day-of-week associations, numerology-style reflection, Lucky Numbers context, or future profile features.

A birth date alone must not be presented as a complete astrology birth chart.

## 9.5 No birth time/place by default

Do not collect birth time or birthplace unless a future astrology expansion demonstrates enough user value to justify timezone, historical timezone/DST, location, calculation-method, privacy, and support complexity.

---

# 10. Reading Engine — CANONICAL SHARED ARCHITECTURE

## 10.1 Status

The Reading Engine is now an implemented protected subsystem in the V0.4.x runtime line.

It must remain **one reusable engine**, not separate shuffle/state implementations for each reading mode.

## 10.2 Core requirements

- exactly 78 canonical cards
- stable card IDs
- correct image mapping
- exact master card back
- unbiased selection using Web Crypto where supported
- no duplicate card within a spread
- explicit state transitions
- session-safe draw state
- stable spread definitions
- bilingual content architecture
- reversal-ready orientation field
- Journal-compatible stable identifiers/content versions

## 10.3 Reversal policy

Architecture remains reversal-ready.

Current product direction remains **upright-first**. Reversals may be activated later when the core reading modes, content, and Journal schema are stable enough to support them without a destructive migration.

## 10.4 Interpretation safety

Never promise:

- guaranteed fate,
- guaranteed relationship outcomes,
- guaranteed investment/financial outcomes,
- lottery results,
- medical diagnosis,
- deterministic death/illness,
- legal outcomes,
- spiritual threats.

Tarot is presented as symbolic reflection and guidance.

## 10.5 Reading interaction grammar

Preferred shared grammar:

`Prepare → Shuffle → Choose/Draw → Reveal → Interpret → Reflect → Save/Share/Journal or Continue`

Animations emphasize tactility and clarity rather than spectacle.

---

# 11. Daily Guidance — COMPLETE CANONICAL READING EXPERIENCE

## 11.1 Product status

**Daily Guidance is complete in current product scope and becomes protected canonical behavior at runtime V0.4.3.**

Do not keep adding features merely because the screen can hold more content. New changes require a real usability, compatibility, quality, or defect reason.

## 11.2 Canonical Daily Guidance structure

Daily Guidance contains:

- one card per local day,
- premium prepare/shuffle/choose/reveal flow,
- same local day preserves the same selected card,
- full 78-card pool,
- native English/Thai card content,
- Keywords,
- Core Meaning,
- Reflection,
- six Daily Lenses,
- Save Image,
- Share.

## 11.3 Six Daily Lenses

Canonical categories:

1. **งานและเป้าหมาย — Work & Goals**
2. **เงินและทรัพยากร — Money & Resources**
3. **ความรักและความสัมพันธ์ — Love & Relationships**
4. **พลังใจและสมดุลชีวิต — Inner State & Balance**
5. **โอกาสและสิ่งที่ควรระวัง — Opportunities & Watch-outs**
6. **แนวทางสำหรับวันนี้ — Guidance for Today**

Every one of the 78 cards has all six lenses in English and Thai, totaling 936 card/language/lens entries.

Lenses remain optional/expandable so the reading does not become a dashboard wall of text.

## 11.4 Persistence behavior

Daily selection is persisted by **local date**, not by rolling 24-hour timer.

A same-day content migration must preserve the user’s already-selected card rather than silently reroll it.

Current content persistence family is `daily-guidance-v3`.

## 11.5 Daily content philosophy

Daily Guidance remains reflective rather than deterministic. It must not become a horoscope dashboard with excessive categories or absolute predictions.

No separate health, lottery, singles/couples, travel, or similar lens should be added without strong product evidence.

## 11.6 Current QA state

At V0.4.3:

- static/package/language/structure QA passed before upload,
- Founder reported Android real-device **Save Image PASS**,
- Founder reported Android real-device **Share PASS**,
- generated long-form reading export was visually reviewed and judged successful,
- iOS Safari/PWA Save/Share real-device validation remains pending.

This is enough to promote Daily Guidance as complete in scope, but not enough to claim full cross-platform QA-X.

---

# 12. Save & Share Reading — CANONICAL EXPORT SYSTEM

## 12.1 Product definition

Save/Share generates a **curated reading artifact**, not a raw viewport screenshot.

The export should look like something the user intentionally keeps or sends to another person.

## 12.2 Export content

The generated image includes meaningful reading content such as:

- Little Ganesha Tarot branding
- date
- revealed card artwork
- localized card title / canonical title treatment
- keywords
- main meaning
- reflection
- all six Daily Lenses
- appropriate non-deterministic disclaimer

It excludes transient app chrome such as:

- Mini Player
- navigation
- back controls
- action buttons
- unrelated Settings/UI

## 12.3 Save behavior

Save creates/downloads the generated PNG to the device using browser-supported behavior.

Do not promise a specific gallery path because OS/browser behavior differs.

## 12.4 Share behavior

Use native system sharing through the Web Share API when file sharing is supported.

Do not hardcode LINE, WhatsApp, Messages, or a specific social destination. The OS share sheet decides available targets.

## 12.5 Fallback

If native file sharing is unavailable, fallback to Save rather than presenting a dead action.

## 12.6 Privacy

Generation remains client-side/local. Reading content is not uploaded to a Little Ganesha server merely to create the image.

## 12.7 Stability rule

Now that Save/Share works on the tested Android device, preserve it. Do not rewrite the export pipeline absent a real defect, browser incompatibility, performance problem, or material product improvement.


---

# 13. Remaining Primary Reading Experiences

All remaining reading modes must reuse the canonical Reading Engine and shared interaction grammar. Do not create separate shuffle, card identity, persistence, or reveal systems for each mode.

## 13.1 Ask Ganesha

Canonical V1 direction:

- one clear user question,
- one-card reflective answer,
- question remains local unless later saved to Journal,
- no fake claim that AI is answering,
- no deterministic guarantee,
- use native, gentle Little Ganesha guide language where useful.

Implementation should layer mode/question framing over the curated card content rather than building a separate inference backend.

## 13.2 Three-Card Reading

Canonical positions:

1. Past
2. Present
3. What Unfolds Next

The third position is directional/reflective, not a guaranteed future event.

## 13.3 The Golden Path

Canonical positions:

1. Where You Stand
2. What Blocks the Path
3. The Way Forward

## 13.4 Remove the Obstacle

Canonical positions:

1. The Obstacle
2. What Feeds It
3. What Releases It

## 13.5 Shared content strategy

To keep complexity controlled, future modes should prefer a layered content system:

- canonical card meaning,
- spread-position framing,
- mode-specific context,
- optional question context,
- concise reflection/guide line.

Do not create five incompatible interpretation databases if one structured content system can produce equal or better quality.

---

# 14. Journal / Reading History

## 14.1 Product role

Journal is a distinct subsystem from Save Image and Share.

- **Save Image** = external portable visual artifact
- **Share** = send that artifact through the OS share system
- **Journal** = structured in-app reading history

Do not treat Journal as a folder of screenshots.

## 14.2 Canonical direction

Journal is **local-first** and must work without account/login/cloud sync.

Recommended structured record:

```text
reading_id
schema_version
content_version
created_at
local_date
reading_mode
question (optional)
card_ids
orientation
language
interpretation_snapshot or stable interpretation refs
user_note (optional)
```

## 14.3 Storage choice

Small settings/profile values may remain in localStorage.

For growing structured Journal/history, prefer **IndexedDB or an equivalent structured local store** behind a small isolated storage wrapper.

Do not scatter direct IndexedDB/localStorage calls across many UI components.

## 14.4 Historical fidelity

Journal should preserve enough of what the user actually saw that later content edits do not silently rewrite the meaning of an old saved reading.

Preferred approach:

- store stable IDs/content versions,
- store a compact interpretation snapshot where necessary,
- do not store the large exported PNG by default unless a future requirement justifies the storage cost.

## 14.5 Data durability

Before Journal becomes canonical:

- define schema version,
- define migration behavior,
- test upgrade from earlier schema,
- define safe failure behavior,
- never silently erase history during an app update.

## 14.6 User control

Journal must eventually support:

- open/re-read entry,
- optional note,
- delete individual entry,
- clear all with explicit confirmation,
- empty-state copy,
- privacy explanation.

## 14.7 Local-only limitation

Local-first data can be removed if the user clears browser/app storage or loses the device. Do not imply that local Journal is a cloud backup.

Optional export/backup may be considered later if demand justifies it without adding disproportionate complexity.

## 14.8 Cloud sync

Cloud Journal sync is **not current roadmap**. It requires a new privacy/security/complexity decision.

---

# 15. Card Library

## 15.1 Purpose

Card Library is a learning/exploration system independent of drawing a reading.

## 15.2 Planned capabilities

- browse all 78 cards,
- filter Major / suit,
- inspect canonical artwork,
- localized title + canonical identity,
- keywords,
- upright meaning,
- symbolism notes where curated,
- future reversed meaning,
- optional Little Ganesha reflection.

## 15.3 Reuse rule

Use the same canonical card dataset as Reading Engine. Do not duplicate card identity/content into a separate library-only source that can drift.

## 15.4 Performance rule

Do not eagerly download all 78 archival PNG masters at initial app load.

Use lazy loading and, when evidence justifies it, non-destructive optimized derivatives. Canonical PNG masters remain archival truth.

---

# 16. Lucky Numbers

## 16.1 Positioning

Lucky Numbers remains an approved **secondary symbolic/entertainment feature**, not the product’s main promise.

It may derive context from:

- Daily Guidance card,
- card number,
- numerological reduction,
- optional Date of Birth,
- symbolic associations.

## 16.2 Prohibited framing

Do not use claims such as:

- “เลขเด็ด” as a promise,
- “เลขแม่น”,
- guaranteed winning numbers,
- increased lottery odds,
- instructions that imply a financial result is likely,
- guaranteed money outcomes.

## 16.3 Required meaning

English concept:

> Lucky numbers are offered for reflection and entertainment, not as predictions of financial outcomes.

Thai copy must communicate the same meaning naturally rather than translate mechanically.

---

# 17. Support the Project — CANONICAL OPEN-ACCESS MODEL

## 17.1 Product principle

Support is voluntary. It must never affect:

- reading quality,
- card selection,
- feature fairness,
- luck,
- spiritual status,
- recommendation priority,
- interpretation depth.

No guilt, countdown, fear, spiritual pressure, or disruptive donation popup is allowed.

## 17.2 Worldwide support

Channel:

**Buy Me a Coffee**

Placement:

`Settings → Support the Project → Worldwide / International Support`

Production activation requires:

- verified official destination,
- safe external navigation,
- clear indication that payment occurs externally,
- no collection of card/payment credentials inside Little Ganesha Tarot.

## 17.3 Thailand support

Channel:

**PromptPay**

Placement:

`Settings → Support the Project → Thailand / PromptPay`

Preferred low-complexity V1:

- verified static payment QR,
- no required login,
- no receipt verification in the app,
- no server-side payment state,
- no entitlement unlocked after payment,
- user decides the amount in the banking/payment flow when the QR format permits.

## 17.4 PromptPay QR rules

- QR geometry must remain untouched,
- preserve quiet zone,
- do not cover modules with decoration,
- use a premium support card around—not over—the functional QR,
- show only minimum public information needed for payment confidence,
- never publish an unnecessary bank screenshot or raw personal identifiers,
- test scan on multiple real banking apps/devices before activation.

A QR may encode a personal proxy even if the UI hides it. Treat the QR as a payment-sensitive public asset.

## 17.5 Worldwide UX

Do not force country detection or hide one support route based solely on IP.

A Thai user may be abroad; an international user may be in Thailand. Locale is not identity.

## 17.6 Support copy standard

Prefer language such as **Support the Project / สนับสนุนโปรเจกต์** rather than making legal/tax claims about “donations” unless that terminology has been reviewed for the applicable account/tax context.

## 17.7 No support tracking requirement

Because support does not unlock features, the app does not need to know who paid or how much.

This is intentionally a major complexity reduction.

---

# 18. Membership / Premium — DEFERRED, NOT CURRENT ROADMAP

## 18.1 Current decision

A Guest/Free/Premium account system is **not part of the current canonical roadmap**.

Do not build authentication, membership, subscription, or entitlement infrastructure merely because it might be useful someday.

## 18.2 Why deferred

Current Open Access + Voluntary Support model provides:

- zero login friction,
- lower privacy burden,
- no backend dependency,
- no subscription support burden,
- simpler deployment,
- fewer failure modes,
- stronger product goodwill.

## 18.3 Conditions for future reconsideration

Membership may be reconsidered only if real evidence shows that:

- the project requires more predictable sustainable revenue,
- voluntary support is insufficient,
- users clearly value advanced paid capabilities,
- the added complexity can remain isolated and manageable.

## 18.4 Future architecture rule if membership is ever approved

If introduced later:

- managed auth/payment services are preferred over custom backend stacks,
- entitlement logic must be isolated behind one access layer,
- Reading Engine must not contain payment logic,
- provider outage must not unnecessarily break the free/core experience,
- previously free canonical core should not be retroactively locked without a deliberate product/trust transition decision,
- login should not become a prerequisite for opening the app unless a future product strategy explicitly justifies it.

## 18.5 Premium Pass concept remains optional research only

A future time-limited pass could be simpler than recurring subscription, but it remains **non-canonical research** until explicitly activated by a later Master Plan/product decision.

---

# 19. Settings Architecture

Settings is an operational control center, not a dumping ground.

Current/approved areas:

## 19.1 Experience

- Language
- Motion: System / Full / Reduced
- Browser Full Screen where supported

## 19.2 Audio

- Music On/Off
- Volume
- Shuffle
- future SFX control only when SFX exists

## 19.3 Personal Profile

- Display Name
- Date of Birth
- edit/clear profile

## 19.4 Support the Project

- worldwide support
- Thailand support

## 19.5 Navigation/reset

- Return to Title
- future app-data reset only with explicit confirmation and clear consequences

Settings must preserve user choices consistently and localize all labels/helper copy natively.

---

# 20. State, Storage, and Data Architecture

## 20.1 Separate state domains

Conceptually separate:

- transient UI/session state,
- user preferences,
- profile,
- audio intent,
- current reading,
- Daily persistence,
- Journal/history,
- content/schema versions,
- runtime build/cache version.

## 20.2 Centralize persistence helpers

Do not allow unrelated direct storage calls to proliferate indefinitely.

Use small purpose-specific helpers/modules with explicit keys and migration behavior.

## 20.3 Stable identifiers

Card IDs, reading mode IDs, spread position IDs, and content versions must remain stable enough for Journal/history across future builds.

## 20.4 Schema migration rule

Any persistent schema change must define:

- old version,
- new version,
- migration path,
- failure fallback,
- test case for existing user data.

Silent destructive reset is unacceptable unless explicitly chosen as the only safe recovery and clearly communicated.

## 20.5 Content architecture

Tarot content should remain structured rather than duplicated through UI logic.

Recommended conceptual layers:

```text
Card Identity
├── Core Meaning
├── Keywords
├── Reflection
├── Daily Lenses
├── Reversal fields (future-ready)
└── Context layers
    ├── Ask Ganesha
    ├── Three-Card positions
    ├── Golden Path positions
    └── Remove Obstacle positions
```

---

# 21. Security and Privacy Baseline

## 21.1 No secrets in public repository

Never commit:

- API secrets,
- private keys,
- access tokens,
- private service credentials,
- raw banking credentials,
- identity documents,
- unnecessary personal numbers.

## 21.2 Safe user content handling

Use safe DOM assignment such as `textContent` for profile/questions/notes. Do not inject unsanitized user input as HTML.

## 21.3 External link safety

External support destinations must use safe navigation and avoid opener-based cross-window risks where applicable.

## 21.4 Tracking policy

Do not add analytics, advertising trackers, fingerprinting, or behavioral profiling just because they are easy to add.

Any future analytics proposal must specify:

- exact product benefit,
- exact data collected,
- retention,
- consent/legal implications,
- privacy impact,
- whether a less invasive alternative exists.

## 21.5 Payment boundary

Little Ganesha Tarot should not directly process sensitive card/payment credentials in the current product model.

## 21.6 Export/privacy boundary

Save/Share images are generated locally. No server upload is required for export generation.

---

# 22. Performance Standards

## 22.1 Philosophy

**Premium does not mean heavy.**

The app should feel smooth on common mid-range modern phones, not only flagship devices.

## 22.2 Animation

Prefer compositor-friendly properties such as:

- `transform`
- `opacity`

Use expensive filters/backdrop effects carefully and provide fallbacks.

## 22.3 Asset loading

- preload only what opening actually needs,
- lazy-load card fronts where practical,
- do not fetch all archival 78 PNGs at first paint,
- load audio progressively,
- generate optimized derivatives only when evidence supports the benefit.

## 22.4 Network behavior

Use clear loading states instead of blank/frozen regions.

PWA caching should protect essential shell behavior without turning updates into stale-build confusion.

---

# 23. Accessibility Standards

Accessibility is a product-quality requirement.

Minimum expectations:

- meaningful focus states,
- correct semantic buttons,
- keyboard-operable primary controls where applicable,
- ARIA labels for icon-only controls,
- readable contrast,
- adequate text size,
- safe touch targets,
- reduced-motion support,
- no critical information conveyed only by color,
- readable card/control states for assistive technology where practical,
- modals with sane focus/close behavior,
- truly hidden elements must not intercept input.

The historical invisible-overlay regression remains a permanent warning: hidden UI must never become an invisible interaction blocker.

Language expansion must include accessibility copy, not only visible labels.

---

# 24. Error Handling and Graceful Degradation

Optional enhancements must never break the core tarot flow.

Examples:

- audio load fails → readings continue,
- one music track fails → skip/fallback,
- fullscreen fails → remain in viewport,
- Web Share fails/unsupported → Save fallback,
- local storage unavailable → session should remain usable where practical,
- support destination unavailable → app remains usable,
- one visual enhancement unsupported → use controlled fallback.

User-facing error copy must be calm, specific, actionable, and native to the selected language.

Do not expose stack traces or browser jargon to ordinary users.


---

# 25. Engineering Governance — Full Authorized Dev Mode

## 25.1 Development mindset

Biu must operate as if personally accountable for a Benedict Interactive release.

For every meaningful change:

> If this were shipped to real users worldwide today, would Biu be comfortable owning its quality, maintainability, privacy, and consequences?

## 25.2 Mandatory development loop

Every meaningful runtime build follows:

**Read Current GitHub → Verify Baseline → Understand Requirement → Impact Analysis → Risk Classification → Design → Implement → Regression Audit → Validation → Package → Integrity Check → Release Notes → Push → Re-read GitHub → Real-Device Gate → Canonical Promotion**

Never reduce protected-system work to `edit → zip → send`.

## 25.3 GitHub-first baseline rule — MANDATORY

Before runtime code or runtime asset change:

1. read current GitHub `main`,
2. verify HEAD,
3. verify runtime build markers,
4. read the exact files/subsystems to be changed,
5. compare any local staging source against verified GitHub,
6. reject stale local ZIPs as source of truth when they differ unintentionally.

**Always re-read `main` before starting the next runtime patch.**

## 25.4 Pre-change impact analysis

Identify:

- affected files,
- affected flows,
- protected behavior,
- DOM/events,
- storage/schema impact,
- audio lifecycle,
- navigation/modals,
- iOS/Android/PWA impact,
- accessibility,
- localization,
- service worker/cache,
- canonical card/assets,
- rollback implications.

## 25.5 Product critique/veto authority

Biu is expected to proactively identify and act on:

- unnecessary complexity,
- weak/cluttered UX,
- low-value features,
- technical debt,
- privacy/security risk,
- misleading spiritual/financial wording,
- language quality drift,
- performance issues,
- version drift,
- architectural coupling,
- better simpler alternatives.

Biu may veto, redesign, defer, or replace a Founder proposal when another direction is better for the product.

---

# 26. Risk Classification and Restore Protocol

## 26.1 LOW risk

Examples:

- documentation-only update,
- typo/microcopy fix,
- isolated non-structural CSS polish,
- non-functional notes.

Requires normal baseline verification and QA. Formal restore package usually unnecessary.

## 26.2 MEDIUM risk

Examples:

- new screen/component,
- reading presentation,
- localization behavior,
- local profile/state extension,
- Save/Share behavior,
- non-destructive feature module.

Requires:

- baseline commit,
- changed-file inventory,
- regression checklist,
- package/diff validation,
- appropriate runtime smoke test.

## 26.3 HIGH risk

Examples:

- service worker/cache strategy,
- PWA installability/manifest behavior,
- audio lifecycle engine,
- navigation/state architecture,
- IndexedDB/local data migration,
- canonical card mapping,
- mass asset replacement,
- deep refactor of protected subsystem,
- new auth/payment backend,
- change Biu is materially uncertain about.

## 26.4 Mandatory Restore Protocol for HIGH risk

Before editing:

1. record exact verified `main` SHA,
2. record current canonical runtime build,
3. inventory affected files/subsystems,
4. preserve recoverable pre-change state,
5. define rollback target,
6. prepare restore archive/notes/branch when useful,
7. confirm the restore path is practical.

Preferred rollback hierarchy:

1. revert isolated bad commit,
2. restore affected files from last canonical commit,
3. restore full previous canonical runtime only when justified.

## 26.5 Serious regression rule

Do not stack new features onto a serious deployed regression.

**Stop → restore/stabilize → diagnose → retry separately.**

---

# 27. QA Honesty Standard

Never say “fully tested” unless the evidence truly supports it.

Use clear levels:

- **QA-S:** static/structural validation
- **QA-R:** runtime validation in at least one actual browser/device environment
- **QA-X:** required cross-platform validation
- **QA-P:** deployed production verification

A syntax check is not real-device testing. A local mock is not production deployment. Android evidence is not iOS evidence.

Current V0.4.3 Save/Share status:

- QA-S: PASS
- Android real-device Save/Share: PASS by Founder report
- generated export visual review: PASS
- iOS/iPadOS Save/Share/PWA: PENDING

---

# 28. Version, Build, Cache, and Deployment Discipline — HARD RELEASE BLOCKER

This section is one of the highest-priority governance rules in V4.0.

## 28.1 Independent version tracks

### Runtime application build

Current canonical runtime:

**0.4.3**

### Master Plan

Current canonical governance document:

**V4.0**

### Internal content/schema versions

Internal versions such as Reading Engine version or `daily-guidance-v3` may advance independently when appropriate. They are not substitutes for the runtime build.

A documentation-only Master Plan update **does not bump the runtime build**.

## 28.2 What requires a runtime bump

A runtime build should advance when shipped application behavior materially changes, including applicable changes to:

- HTML/runtime UI,
- JavaScript behavior,
- CSS affecting shipped UI,
- user-facing runtime copy/content,
- Reading Engine,
- persistent schema,
- service worker/cache behavior,
- runtime assets that change product behavior/identity.

Documentation-only governance/QA notes do not require a runtime bump unless they accompany runtime changes.

## 28.3 Mandatory runtime version coherence

Whenever runtime build changes, audit and update **every applicable live/current marker in the same release**.

Required audit matrix:

- `index.html` → `meta[name="application-version"]`
- `index.html` → `<body data-build>`
- CSS cache-bust query strings
- JavaScript cache-bust query strings
- manifest query/reference when used
- any explicit build metadata inside manifest, if present
- visible build label in Settings/debug surface
- `window.LGT_BUILD` or current equivalent
- `sw.js` → `BUILD`
- Service Worker cache names/IDs
- Service Worker shell/cache-busted URLs
- README current runtime identity when applicable
- current release notes
- current QA report
- current root patch manifest when runtime release uses one
- checksum file
- Master Plan current runtime/status

## 28.4 Mixed live versions = RELEASE FAIL

> **If one current/live build marker unintentionally disagrees with the target runtime version, the release fails.**

Do not waive this because “the app seems to work.” Mixed versions are a cache/deployment regression waiting to happen.

## 28.5 Historical records are exempt

Do not rewrite historical changelog/release entries merely to make every old number equal the current build.

Version coherence applies to **live/current markers**, not historical evidence.

## 28.6 Automated version audit

Every runtime delivery should run an automated version-coherence test whenever practical.

The test should verify target runtime against all current marker locations that exist in the repository.

If a new build marker is introduced later, the test/checklist must be updated so it cannot become a forgotten hidden version source.

## 28.7 Master Plan version coherence

When Master Plan changes materially:

- increment Master Plan version,
- update title/metadata,
- update current runtime status,
- update source-of-truth references,
- update migration prompt,
- update current docs manifest,
- add change log/update notes,
- audit stale active-version language.

Do not bump runtime for docs-only governance changes.

## 28.8 Cache discipline

A release must never ship HTML referencing stale incompatible JS/CSS/SW resources.

Service Worker changes are HIGH risk and require explicit cache/update review.

During development/deployment:

- version runtime resources consistently,
- clean obsolete app caches where appropriate,
- distinguish real source regression from stale deployed cache,
- do not “fix” correct source merely because one device has not received the new cache yet.

## 28.9 GitHub Pages deployment verification

After push:

1. verify repository HEAD,
2. verify target source files on `main`,
3. allow deployment propagation,
4. hard-refresh / close-reopen installed PWA where appropriate,
5. confirm visible build identity,
6. run subsystem-specific real-device checks.

## 28.10 Package integrity order

For packages with manifests/checksums:

1. finish all file edits,
2. generate manifest hashes,
3. finish manifest,
4. generate checksum file last,
5. checksum file must not self-hash,
6. create ZIP,
7. re-extract ZIP,
8. run tests/checksum verification **from the re-extracted archive**.

Do not edit a hashed file after checksum generation without regenerating checksums.

---

# 29. Repository Structure and Packaging Policy

Canonical repository:

`grolygori789-crypto/little-ganesha-tarot`

Default branch:

`main`

Canonical documentation structure:

```text
/
├── assets/
├── css/
├── data/
├── docs/
│   ├── checksums/
│   ├── governance/
│   ├── qa/
│   ├── releases/
│   └── tests/
├── js/
├── index.html
├── manifest.webmanifest
├── PATCH_MANIFEST_[CURRENT_RUNTIME].json
├── README.md
└── sw.js
```

## 29.1 Governance folder

Place here:

- `MASTER_PLAN.md`
- versioned Master Plan changelog/update notes
- room migration prompt
- docs manifests
- repository policies

## 29.2 Delivery rule

Every package given to P’Benz must be repository-ready:

- correct relative paths,
- no manual sorting required,
- no scattered QA/test docs at root,
- checksum verified,
- archive re-extracted before delivery,
- changed-file scope clear.

## 29.3 Overlay limitation

An overlay ZIP **cannot delete old tracked files automatically**.

Therefore:

- do not falsely claim that overlay removes obsolete files,
- preserve older versioned governance docs as explicit historical records when safe,
- if deletion is materially required, use a deliberate Git deletion workflow or provide a safe exact cleanup mechanism rather than pretending extraction performs deletion.

For Master Plan V4.0, older V3.7 versioned governance files may remain as historical evidence; V4.0 is explicitly canonical and superseding.

## 29.4 Root patch manifest

Runtime release manifest remains tied to the current runtime release. A documentation-only governance package may use a dedicated docs manifest under `docs/governance/` rather than rewriting runtime-release identity solely for a Master Plan revision.

---

# 30. Current Application Status — 22 AUGUST 2026

## 30.1 Current runtime baseline

**Runtime:** V0.4.3  
**Commit:** `3bd6764dfdf17a7e6691113133d13b085b99df29`  
**Commit message:** `Add save and share for daily guidance`

This is the verified GitHub `main` baseline at the creation of Master Plan V4.0.

## 30.2 Home / shell

Protected and functional foundations include:

- Benedict Interactive splash,
- Living Title,
- Tap to Begin,
- optional onboarding/profile,
- Home V0.3.6 visual hierarchy,
- Settings,
- TH/EN switching,
- Motion preference,
- explicit browser Full Screen,
- global Mini Player,
- audio lifecycle,
- Return to Title,
- PWA/icon wiring.

## 30.3 Reading Engine

Implemented and protected.

Daily Guidance is the currently complete canonical reading mode.

Other reading mode buttons remain future functionality/placeholders until implemented.

## 30.4 Daily Guidance

Implemented:

- 78-card draw pool,
- same-day persistence,
- premium choose/reveal,
- native TH/EN card content,
- Keywords/Core Meaning/Reflection,
- six Daily Lenses across 78 cards and both languages,
- Save Image,
- Share.

## 30.5 Save/Share

Android real-device Founder test:

- Save Image: PASS
- Share: PASS
- generated export appearance: PASS

Cross-platform iOS/iPadOS gate: PENDING.

## 30.6 Journal

Current UI entry exists but functionality remains **not implemented / placeholder**.

This is not a defect in Daily Guidance; Journal is a separate subsystem.

## 30.7 Card Library / Lucky Numbers

Planned, not canonical functional features yet.

## 30.8 Support

Current Settings has non-functional placeholders:

- Worldwide → Buy Me a Coffee
- Thailand → PromptPay

Canonical business direction is Open Access + Voluntary Support. Activation is pending verified support destination/QR assets and support-specific QA.

## 30.9 Languages

Current functional languages:

- English
- Thai

V0.4.1+ established a global native-language quality pass across application shell and tarot content. V4.0 upgrades this principle into a permanent multilingual release standard.

## 30.10 PWA

Android evidence: PASS at current verified level.

Still pending:

- iPhone/iPad Add-to-Home-Screen,
- iOS standalone safe-area verification,
- iOS Save/Share compatibility.

## 30.11 Current protected baseline rule

Do not continue touching Daily Guidance, Save/Share, Home, audio, PWA, or profile merely to polish what already works.

Only change a protected subsystem for a concrete defect, compatibility need, accessibility issue, material performance gain, security requirement, or high-value product improvement.

---

# 31. Immediate Development Roadmap — V4.0

Biu owns sequencing and may reorder a milestone when dependency, evidence, risk, or product value justifies it.

## Phase A — V0.4.3 stabilization + governance — COMPLETE/CURRENT

- Daily Guidance complete in scope
- Save/Share Android real-device PASS
- Master Plan V4.0 establishes new canonical governance

Remaining parallel gate:

- iOS/iPadOS PWA/Save/Share real-device validation when devices are available

## Phase B — Remaining Core Tarot Reading Modes — NEXT PRODUCT PRIORITY

Default sequence:

1. **Ask Ganesha**
2. **Three-Card Reading**
3. **The Golden Path**
4. **Remove the Obstacle**

All must reuse the shared Reading Engine.

Exact runtime build numbering inside the 0.4.x train is decided at implementation based on actual scope. Do not pre-bump the runtime in documentation.

## Phase C — Journal / Local History

Implement a versioned structured local Journal after the shared primary reading modes establish the final reading-record shape.

This ordering reduces the risk of locking Journal schema too early.

## Phase D — Card Library

Build full 78-card browse/details on the same canonical dataset.

## Phase E — Support Activation

Activate:

- verified Buy Me a Coffee link,
- verified PromptPay support card/QR.

No login/backend/entitlement required.

## Phase F — Lucky Numbers

Implement as symbolic secondary feature only after core tarot flows/profile/day data are stable.

## Phase G — Subtle SFX + soundtrack expansion

Add only after interaction timing across reading modes is stable.

## Phase H — Reversal option evaluation

Consider upright + reversed only after:

- core modes stable,
- content fields ready,
- Journal migration implications understood,
- UX can explain it clearly.

## Phase I — Cross-platform / production hardening

- iPhone/iPad real-device matrix,
- accessibility pass,
- performance/low-memory pass,
- offline/network behavior,
- language QA,
- data migration QA,
- support/privacy disclosures,
- release candidate audit.

---

# 32. Product Decisions Explicitly NOT Required Now

To protect complexity budget, the current roadmap does not require:

- user accounts,
- login,
- cloud profile,
- membership tiers,
- subscription billing,
- custom backend,
- AI-generated readings,
- external inference API,
- social network/community,
- multiplayer,
- push notifications,
- full astrology natal chart,
- birth time/place,
- complex CMS,
- advertising trackers.

These may be reconsidered later only with evidence and a new product decision.

---

# 33. Non-Negotiable Failure Conditions

Release must be blocked or immediately corrected for:

- wrong tarot numbering,
- wrong card identity/title,
- wrong relevant suit-symbol count,
- accidental obsolete corrected card,
- Little Ganesha identity drift in canonical replacement,
- broken Tap to Begin,
- hidden overlay intercepting input,
- broken language switch,
- mixed/unnatural production language in a declared supported locale,
- major untranslated surfaces in an enabled language,
- audio that cannot be stopped,
- background audio violating user intent,
- profile/reading uploaded remotely without approved design,
- secrets/private credentials committed,
- unnecessary payment identity exposure,
- fullscreen failure breaking navigation,
- common Android/iPhone unusability,
- stale cache creating incompatible shell/resources,
- mixed current runtime build markers,
- version/checksum files generated before final edits and left stale,
- HIGH-risk change without restore preparation,
- new work stacked on serious regression,
- unverified behavior described as fully tested,
- support implying better readings/luck/spiritual benefit,
- deterministic medical/legal/financial/lottery promises,
- optional third-party service failure disabling the core app without explicit architectural justification.

---

# 34. Definition of Done

A feature is Done only when:

1. product intent is satisfied,
2. UX fits the app,
3. implementation respects complexity budget,
4. protected behavior has not regressed,
5. static validation passes,
6. relevant runtime testing is completed or limitations disclosed,
7. mobile compatibility is considered,
8. accessibility is considered,
9. native-language quality is complete for enabled languages,
10. persistent data impact is reviewed,
11. privacy/security boundaries are preserved,
12. assets/links are correct,
13. live runtime version markers are coherent,
14. docs/manifest/checksum are coherent,
15. restore preparation exists when risk requires it,
16. archive has been re-extracted and rechecked when distributed as ZIP,
17. GitHub is re-read after push,
18. canonical promotion occurs only after appropriate device/deployment evidence.

**“Code exists” is not Definition of Done.**

---

# 35. Zero-Question Migration Instructions

A future room receiving this Master Plan and/or `ROOM_MIGRATION_PROMPT_V4_0.md` must continue without making P’Benz reconstruct project history.

## 35.1 Mandatory startup

1. Treat Master Plan V4.0 as canonical unless a newer explicit final decision exists.
2. Read current GitHub `main` before runtime work.
3. Verify HEAD and runtime build; do not assume the V4.0 baseline SHA is still current.
4. Inspect exact files/subsystems to change.
5. Compare local staging source against GitHub.
6. identify risk/protected behavior.
7. continue from the newest incomplete roadmap milestone rather than replaying completed work.

## 35.2 Do not ask P’Benz to restate

Do not ask again for:

- 78-card canon,
- Strength VIII / Justice XI,
- THE FOOL frame master,
- Little Ganesha identity lock,
- five corrected canonical cards,
- canonical card back/title hero/app icon,
- Home V0.3.6 direction,
- explicit-only browser Full Screen,
- TH/EN current language support,
- native-language quality standard,
- audio lifecycle,
- optional local profile,
- Reading Engine shared architecture,
- Daily Guidance completed structure,
- six Daily Lenses,
- Save/Share curated export direction,
- Journal structured local-first direction,
- Open Access + Voluntary Support business model,
- Buy Me a Coffee + PromptPay support split,
- membership/subscription deferred status,
- complexity/stability constitution,
- GitHub-first rule,
- risk/restore policy,
- mandatory version coherence,
- Android/iOS QA distinction.

## 35.3 Zero-question does not mean blind implementation

A clarifying question is allowed only when genuinely blocking external information cannot be resolved from the Master Plan, GitHub, current conversation, or approved assets.

Examples:

- final Buy Me a Coffee URL,
- final verified PromptPay QR,
- legal/payment/account authorization,
- genuinely new ambiguous creative requirement whose interpretation would materially change the product.

Check available sources first.

## 35.4 Full Authorized Dev continuation

Biu in the new room inherits the same final product-development authority.

Biu must:

- make routine decisions,
- protect stable systems,
- reject needless complexity,
- choose architecture/sequencing,
- enforce language/version gates,
- decide release readiness,
- prepare restore plans for HIGH-risk work,
- avoid pushing routine choices back to P’Benz.

---

# 36. Master Plan V4.0 Change Log

V4.0 is a major governance/status phase update. Runtime remains **0.4.3** because this Master Plan package is documentation-only.

V4.0:

- updates current canonical runtime from V0.3.6-era documentation to V0.4.3,
- records current GitHub baseline commit `3bd6764dfdf17a7e6691113133d13b085b99df29`,
- promotes Daily Guidance from planned vertical slice to complete protected canonical reading experience,
- records the six Daily Lenses across 78 cards and TH/EN,
- records same-local-day Daily persistence,
- promotes Save Image and native Share as working V0.4.3 capabilities with Android real-device Founder PASS,
- formalizes curated reading export versus raw screenshot,
- records Journal as separate not-yet-implemented structured history subsystem,
- locks remaining primary modes to one shared Reading Engine,
- introduces the **Complexity Budget & Stability Constitution**,
- makes easy-to-medium complexity the default architecture target,
- adds the 9–9.5/10-at-4/10-complexity decision heuristic,
- formalizes **Open Access + Voluntary Support** as the current business model,
- preserves Buy Me a Coffee + PromptPay as low-complexity support channels,
- explicitly defers membership/login/subscription/backend architecture,
- adds conditions that must be met before membership can ever be reconsidered,
- upgrades localization into the **Global Native Language Standard** for all present/future languages,
- makes native fluency, cultural naturalness, clarity, accessibility, and layout fit mandatory language gates,
- prohibits partial/mixed production localization for a declared supported language,
- upgrades runtime build coherence into a **hard release blocker**,
- requires every applicable live build/cache marker to move together,
- adds automated version-audit expectations,
- formalizes checksum/manifest generation order and archive re-extraction verification,
- preserves iOS/iPadOS QA honesty as pending where not yet tested,
- updates the immediate roadmap to remaining core readings → Journal → Card Library → Support → Lucky Numbers → SFX/audio → reversals → production hardening,
- refreshes Zero-Question migration instructions for the working V0.4.3 product era.

---

# 37. Historical Milestone Summary

Earlier V3.x documents remain historical evidence. The essential milestones retained by V4.0 are:

- V3.1 established Full Authorized Dev governance, worldwide mobile, profile/support/audio foundations.
- V3.2 locked the final app icon system.
- V3.3 brought PWA installability/icon wiring into active foundation work.
- V3.4 established Premium Minimal Sacred UI motifs.
- V3.5 rejected failed V0.3.3/V0.3.4 Home implementations, removed automatic Tap-to-Begin fullscreen, and rebuilt the stable Home direction.
- V3.6 polished and locked the Home V0.3.6 visual baseline.
- V3.7 established GitHub-first workflow, risk classification, Restore Protocol, independent runtime/Master Plan version tracks, and planned Reading Engine V0.4.x.
- Runtime V0.4.x then implemented the Reading Engine, Daily Guidance, native TH/EN content, Daily Lenses, and V0.4.3 Save/Share.

Do not treat old “Reading Engine NEXT” or “runtime 0.3.6 current” statements from historical documents as active status.

---

# 38. Canonical Closing Rule

When uncertain, choose the solution that best protects:

- tarot correctness,
- Little Ganesha identity,
- user trust,
- worldwide usability,
- native language quality,
- stable working behavior,
- premium presentation,
- privacy,
- maintainability,
- low-to-moderate complexity,
- recoverability,
- runtime/version coherence.

Biu is expected to act proactively and decisively under the Full Authorized Dev mandate.

P’Benz should not need to reconstruct history, protect the project from regressions manually, remember every build-marker location, or approve routine implementation choices. Those are development responsibilities.

**End of Master Plan & Zero-Question Development Handoff V4.0**

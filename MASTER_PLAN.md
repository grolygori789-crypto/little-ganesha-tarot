# LITTLE GANESHA TAROT — MASTER PLAN & ZERO-QUESTION DEVELOPMENT HANDOFF V3.4

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio / Publisher:** Benedict Interactive  
**Canonical document version:** 3.4  
**Last updated:** 21 August 2026  
**Status:** ACTIVE — CANONICAL SOURCE OF TRUTH  
**Document type:** Master Plan + Product Specification + Engineering Governance + Zero-Question Room Migration Handoff

---

## 0. Executive Authority Statement

This document is the canonical, self-contained development authority for **Little Ganesha Tarot — The Golden Path**.

Version 3.4 consolidates the approved deck canon, visual identity, product direction, app architecture, UX rules, engineering governance, QA standards, worldwide mobile requirements, audio/motion behavior, personal profile rules, support/donation architecture, release discipline, and current implementation status.

**V3.4 supersedes earlier Master Plans, migration prompts, development summaries, drafts, experiments, and implementation notes wherever they conflict.** Earlier materials may be consulted only for historical context when they do not contradict this document or a newer explicit instruction from P’Benz.

The project must continue without asking P’Benz to repeat locked decisions already recorded here. A new room, developer, assistant instance, or future handoff should be able to resume work from this document plus the current repository and approved assets.

### 0.1 Source-of-truth order

When instructions conflict, apply this order strictly:

1. **P’Benz’s latest explicit instruction in the current conversation / development turn.**
2. **This Master Plan & Zero-Question Development Handoff V3.4.**
3. **Approved canonical production assets** supplied or approved by P’Benz, including the 78-card deck, master card back, title hero, and later approved replacements.
4. **Current verified implementation in the GitHub repository** after a successful push/deployment, provided it does not conflict with items 1–3.
5. Prior plans, manifests, prompts, summaries, prototypes, experiments, and obsolete builds.

If a lower-priority source conflicts with a higher-priority source, the lower-priority source is obsolete for that issue.

### 0.2 Founder and development authority

**P’Benz is Founder / Vision Owner.** P’Benz sets the product vision, may propose ideas at any level, supplies or approves key assets, and remains the highest human project authority.

**Biu is the Full Authorized Product & Development Lead for this project.** Biu is explicitly granted broad authority to make product, UX/UI, architecture, implementation, quality, performance, accessibility, compatibility, security, privacy, release, and technical decisions in the best interests of the product.

P’Benz’s suggestions should normally be treated as **product direction or proposals unless explicitly locked as requirements**. Biu may refine, redesign, replace, defer, simplify, extend, or reject an implementation when a superior solution materially improves the product’s quality, stability, usability, safety, maintainability, performance, accessibility, worldwide compatibility, or professional presentation.

The development objective is **not literal execution of every suggestion**. The objective is to deliver the best possible Little Ganesha Tarot product while preserving P’Benz’s vision.

P’Benz should not need to micro-manage implementation details. In normal operation, P’Benz may simply propose ideas and perform repository upload/push steps that the connected integration cannot perform.

### 0.3 Working code is protected territory

Any subsystem that is verified to work correctly becomes **protected stable behavior**.

Do not rewrite, remove, or destabilize a working subsystem merely because rebuilding it is easier. Refactoring is allowed when it has a clear architectural, quality, compatibility, performance, security, or maintainability benefit, but it must preserve verified user-facing behavior unless an intentional product change is documented.

**Regression prevention has priority over development speed.**

---

# 1. Product Identity

## 1.1 Product name

**Little Ganesha Tarot**  
**Subtitle:** **The Golden Path**

The name and subtitle are canonical unless P’Benz explicitly changes them.

## 1.2 Studio identity

**Benedict Interactive** is the studio/publisher identity for the product.

The product should present Benedict Interactive with the visual confidence of a real premium independent game/app studio rather than as an informal hobby page.

## 1.3 Product positioning

Little Ganesha Tarot is a **premium, sacred-friendly, visually rich, RWS-inspired 78-card tarot experience** centered on one identity-locked Little Ganesha protagonist.

The product combines:

- premium collectible tarot artwork,
- intuitive mobile-first readings,
- calm spiritual atmosphere,
- gentle personalization,
- bilingual English/Thai support,
- symbolic guidance rather than deterministic fortune claims,
- a distinctive Little Ganesha world,
- polished audiovisual presentation,
- accessible worldwide mobile web/PWA delivery.

It must feel like a **real premium tarot app**, not a gallery of card images, a generic fortune-telling website, a game UI skin, or a novelty generator.

## 1.4 Core experience principles

1. **Tarot validity first.** Every card and reading mode must still function as tarot.
2. **Little Ganesha identity consistency.** The same protagonist appears throughout the deck.
3. **Premium sacred warmth.** Cute is allowed; toy-like, childish, gaudy, or cheap is not.
4. **Clarity over clutter.** Every screen should have a clear primary action.
5. **Immersion without fragility.** Rich effects should enhance the experience without breaking on older or unsupported devices.
6. **Worldwide usability.** iOS and Android are equal first-class targets.
7. **Respectful uncertainty.** Interpretations guide reflection; they do not guarantee fate, money, health, relationships, or outcomes.
8. **Privacy by default.** Personalization data remains local unless a future feature explicitly requires otherwise and P’Benz approves it.
9. **Support is optional.** Donations/support never alter readings, access, odds, spiritual status, or product fairness.
10. **Professional release discipline.** A feature is not “done” merely because code exists.

---

# 2. Canonical Tarot System

## 2.1 Deck size

The canonical deck contains exactly **78 cards**:

- 22 Major Arcana
- 56 Minor Arcana

No additional Major Arcana, bonus tarot cards, hidden XXII/XXIII cards, alternate-number cards, or non-standard suit cards may enter the canonical deck without an explicit future product decision.

## 2.2 Major Arcana numbering lock

The project uses the standard RWS numbering convention with:

- **VIII — STRENGTH**
- **XI — JUSTICE**

Canonical sequence:

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

## 2.3 Minor Arcana suit order

Canonical suit order:

1. Wands
2. Cups
3. Swords
4. Pentacles

Canonical rank order inside every suit:

1. Ace
2. Two
3. Three
4. Four
5. Five
6. Six
7. Seven
8. Eight
9. Nine
10. Ten
11. Page
12. Knight
13. Queen
14. King

Use **Ace**, never “Age”. Use **Page**, never a substituted title.

## 2.4 Minor Arcana top-medallion lock

- **Ace:** neutral ornament only; no A, I, or 1.
- **Two–Ten:** Roman numerals II–X.
- **Page / Knight / Queen / King:** neutral ornament only; no P, Kn, Q, K, or invented numbering.

Court rank must be communicated through the full title in the bottom title panel.

## 2.5 Canonical Minor Arcana index map

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

## 2.6 Symbol-count integrity

For numbered Minor Arcana where suit-symbol count is semantically relevant, the visible count must be correct.

A visually beautiful card with the wrong number of wands, cups, swords, or pentacles is a production failure.

Symbol count, card identity, title, top medallion, and rank must agree.

---

# 3. Canonical Visual System

## 3.1 Absolute master reference

**0 — THE FOOL is the absolute visual master reference for the entire deck.**

Its frame language must not be redesigned card by card.

Locked frame characteristics include:

- overall card geometry and proportions,
- rounded corners,
- cream/ivory parchment character,
- premium gold ornamentation,
- lotus corner motifs,
- restrained teal ribbon language,
- top medallion geometry and placement,
- bottom title-panel geometry,
- typography language,
- frame-to-art balance,
- warm sacred premium finish.

Future card corrections may change only what is required inside the illustration, the permitted medallion content, and the title text unless P’Benz explicitly authorizes a broader system redesign.

## 3.2 Little Ganesha identity lock

Little Ganesha is one continuous protagonist across all 78 cards.

Preserve:

- face structure,
- eye language,
- trunk shape,
- ear proportions,
- pink inner-ear treatment,
- child-like age impression,
- head-to-body proportions,
- skin color family,
- crown identity,
- jewelry identity,
- sacred-cute premium rendering language.

Pose, gaze, action, staging, camera angle, environment, clothing details, and emotional tone may vary to fit each archetype.

**Identity drift is a hard failure.**

## 3.3 World logic

Little Ganesha is the canonical elephant-headed divine identity in this deck world.

Supporting humans remain human unless a specific mythological character is explicitly required and approved.

Do not casually turn supporting figures into additional elephant-headed divine characters. Do not insert Shiva, Lakshmi, or other named deities merely as decorative cameos without a deliberate product decision.

## 3.4 RWS symbolism rule

The deck is RWS-inspired, not a costume-only reinterpretation.

Each card must retain enough archetypal and symbolic clarity that a tarot reader can recognize and use it correctly.

Visual creativity is encouraged, but it must serve the card’s meaning rather than obscure it.

## 3.5 Art style

Target:

- premium collectible tarot,
- richly detailed,
- painterly-clean,
- warm and luminous where archetypally appropriate,
- sacred and elegant,
- adorable without being juvenile,
- refined fantasy / editorial illustration,
- readable at actual card size.

Avoid:

- toy/plastic rendering,
- generic mobile-game splash-art language,
- overly chibi deformation,
- candy saturation,
- arbitrary fantasy clutter,
- one-tone global grading that destroys archetypal variation.

## 3.6 Palette DNA

Recurring deck DNA:

- ivory / cream,
- warm gold,
- lotus pink,
- restrained teal,
- amber / honey,
- natural stone,
- atmospheric skies.

This is a shared family, not a mandate to make every card equally warm or equally bright.

Darker cards may remain low-key, cool, dramatic, nocturnal, or psychologically heavy when that improves archetypal truth.

## 3.7 Technical master format

Canonical production card master:

- **941 × 1672 px**
- **PNG**
- standalone card only
- no neighboring card edges
- no sheet remnants
- no unapproved crop

PNG remains the archival/canonical card master format.

The app may later serve optimized **WebP / AVIF derivatives** for performance, but optimized derivatives must never replace or overwrite the canonical PNG masters.

---

# 4. Deck Production Status

## 4.1 78-card completion

The full deck is complete: **78 / 78 cards**.

The final structural audit confirmed:

- no missing cards,
- no duplicate card identities,
- correct RWS Major numbering,
- correct Strength VIII / Justice XI,
- correct Minor medallion convention,
- correct rank/suit titles,
- no hard suit-symbol count failure,
- coherent frame family,
- acceptable Little Ganesha identity consistency,
- correct supporting-character world logic,
- all supplied cards at 941 × 1672.

The final audit was based on Master Plan V3 and is preserved in `FINAL_DECK_AUDIT_V3.md`.

## 4.2 Ten of Cups normalization

The originally supplied Ten of Cups source was JPEG while the canonical master standard is PNG. The canonical package therefore contains a PNG normalization of the supplied final pixels.

This is a container-format normalization, not restoration of a pre-JPEG source.

## 4.3 Corrected cards that supersede older versions

The following five corrected versions are canonical and permanently supersede their prior versions unless P’Benz explicitly changes them:

- 39 FOUR OF CUPS
- 40 FIVE OF CUPS
- 70 SEVEN OF PENTACLES
- 71 EIGHT OF PENTACLES
- 72 NINE OF PENTACLES

## 4.4 Canonical deck package

Canonical archive created previously:

`LITTLE_GANESHA_TAROT_CANONICAL_V3.zip`

Expected contents include:

- `cards/` — 78 canonical PNG files
- `ASSET_MANIFEST_V3.csv`
- `ASSET_MANIFEST_V3.json`
- `FINAL_DECK_AUDIT_V3.md`

---

# 5. Approved UI Art Assets

## 5.1 Master card back

The approved ornate ivory / gold / teal / lotus card back with central Little Ganesha medallion is canonical.

App path:

`assets/ui/card-back.png`

The **exact approved master** must be used for actual face-down cards, shuffle sequences, card choosing, and flip/reveal interactions.

A small perspective depiction of the card back inside promotional/title artwork does not need to be pixel-identical when it is only a painted scene element.

## 5.2 Title hero

Canonical title hero:

- 9:16 composition
- 864 × 1536
- bright golden-hour temple / lake / lotus setting
- Little Ganesha seated at ornate table
- deck visible in foreground
- mouse companion
- large open sky in upper composition
- palatial architecture and water
- approved user-adjusted brightness

App path:

`assets/ui/title-hero.png`

**Do not brighten it further globally.**

The hero image contains no required embedded UI text. Product title, subtitle, CTA, language control, and other interface elements remain HTML/CSS overlays.

## 5.3 Canonical app icon — FINAL MASTER

The application now has a **canonical final app icon identity** for PWA, Home Screen, launcher, browser, and future store-facing use. This icon is a product identity asset, not decorative artwork.

### Visual lock

The canonical icon uses:

- a close, immediately recognizable portrait of Little Ganesha,
- the same sacred-cute premium character language as the deck,
- large amber-brown eyes and stable Little Ganesha facial identity,
- an ornate gold crown with restrained jewel accents,
- a deep plum / aubergine background for high small-size contrast,
- a restrained gold halo / lotus-mandala structure,
- a visible tarot card as the functional cue that this is a tarot product,
- a warm magenta-gold garment accent,
- a clean gold perimeter treatment,
- **no embedded product-name text inside the production icon**.

The final icon intentionally reduces the ornamental density of earlier exploratory versions. At launcher size, recognizability, silhouette, contrast, and Little Ganesha identity take priority over illustration-level micro-detail.

### Canonical master and derivatives

Repository paths:

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

`app-icon-1024.png` is the canonical raster master supplied for current web/PWA production. Smaller icons must be derived from the canonical master rather than independently redrawn.

### Platform behavior

- **Android / Chromium PWA:** use regular 192/512 icons and the dedicated maskable 512 icon.
- **iPhone / iPad Home Screen:** use `apple-touch-icon.png`.
- **Browser tabs / bookmarks:** use PNG favicon derivatives plus `favicon.ico` fallback.
- **Future native/store packaging:** derive platform-specific exports from the canonical master while preserving the same visual identity.

The OS/browser may apply its own circle, squircle, or rounded-rectangle mask. Critical facial features, ears, crown, and tarot cue must remain inside a safe composition zone. Do not rely on a specific launcher mask.

### Prohibited icon changes

Do not:

- add small title text to the production icon,
- redesign Little Ganesha independently for each platform,
- substitute a generic Ganesha symbol,
- remove the tarot cue without an explicit product-level decision,
- crowd the icon with corner ornaments or dense text,
- stretch, crop, or recolor the icon ad hoc per device,
- use an older exploratory icon after this final master is uploaded.

Any future replacement of the canonical app icon is a **brand-level change** and must be treated as such in the Master Plan and asset manifest.

---

# 6. Opening Experience

## 6.1 Studio splash

Opening flow begins with:

**BENEDICT INTERACTIVE**  
**PRESENTS**

The studio splash is brand identification, not a navigation screen.

Target behavior:

- clean premium deep-teal/gold presentation,
- fade in,
- brief hold,
- fade out,
- no button,
- no accidental early skip,
- approximately **2.6 seconds** under normal motion,
- shorter non-motion timing only where accessibility requires it.

Do not return to the prior session-shortened 1.5-second behavior.

## 6.2 Title screen

Canonical title hierarchy:

**LITTLE GANESHA TAROT**  
**THE GOLDEN PATH**  
**TAP TO BEGIN / แตะเพื่อเริ่ม**

The title screen should remain visually focused. Do not clutter it with the full Home menu.

Visible utility controls may include:

- EN / ไทย
- sound state

Primary CTA remains one clear action: **TAP TO BEGIN**.

## 6.3 Title-to-app behavior

Target final flow:

### First use

`Benedict Interactive → Title → Tap to Begin → Optional Personal Profile Setup → Welcome → Home`

### Subsequent use

`Benedict Interactive → Title → Tap to Begin → Home`

The mini player is not the destination of Tap to Begin. It is a global subsystem that becomes available after the user starts the experience.

---

# 7. Living Title Motion System

## 7.1 Product intent

The title hero should feel gently alive rather than like a static JPEG.

The viewer should notice within approximately **2–3 seconds** that the scene has life, while the effect remains premium, calm, and non-distracting.

## 7.2 Full Motion target

Full Motion may use:

- slow breathing zoom,
- restrained pseudo-parallax,
- moving sky light,
- water shimmer,
- warm lamp glow/flicker,
- golden atmospheric motes,
- sparse petals,
- title illumination/breathing,
- soft compositional light drift.

Motion should use `transform` and `opacity` wherever practical.

Avoid effects that look like a screensaver, particle demo, or game lobby.

## 7.3 Reduced Motion rule

The earlier behavior of turning the entire Living Title into a completely static image is **obsolete**.

Reduced Motion must still feel premium and alive, but it should substantially reduce spatial motion.

Recommended Reduced Motion behavior:

- no meaningful camera pan/zoom,
- no large drifting particles,
- no rapid or repeated travel across the screen,
- retain gentle opacity-based lamp glow,
- retain subtle water/light shimmer,
- retain slow tonal/illumination breathing,
- retain non-disorienting ambient light changes.

Accessibility must be respected without degrading the product into an unfinished-looking static screen.

## 7.4 Motion preference

Settings must support:

- **System** — follow device `prefers-reduced-motion`
- **Full**
- **Reduced**

System should be the accessibility-respecting option. Product defaults must be chosen so ordinary users receive the intended premium motion experience while users who explicitly request reduced motion are respected.

---

# 8. Audio System

## 8.1 Audio philosophy

Music is atmosphere, not the primary product.

The tarot experience must remain fully usable with music disabled.

## 8.2 Autoplay and entry behavior

Professional target behavior:

- Studio Splash: silent
- Initial Title: silent
- First `TAP TO BEGIN`: acts as the required user gesture and unlocks audio
- If music is enabled, soundtrack **fades in automatically** after Tap to Begin
- User should not need to press Play separately after choosing to begin

This design is both user-friendly and compatible with modern mobile browser autoplay restrictions.

## 8.3 Global music continuity

After the experience starts:

- music persists between app screens,
- tracks do not restart on normal navigation,
- mini player is global,
- track transitions may crossfade,
- user controls remain consistent.

## 8.4 Mini Player requirements

Mini Player foundation:

- Play / Pause
- Previous
- Next
- track title
- More/options
- Volume
- Shuffle
- Return to Title

Future expansion is allowed if it improves usability without creating clutter.

## 8.5 Background / lock-screen behavior

Little Ganesha Tarot is not a background-audio app.

Target lifecycle:

- app visible + user intended music to play → music plays
- app hidden / tab backgrounded / screen locked → music pauses/fades down
- app returns foreground → resume automatically **only if it had been playing before backgrounding**
- if the user manually paused → do not auto-resume
- if user disabled sound → honor that choice

The system must distinguish **system pause** from **user intent to pause**.

## 8.6 Return to Title

`Return to Title` should:

- fade/stop current music,
- return to Title cleanly,
- preserve user preferences,
- preserve optional profile data unless user explicitly clears it,
- not leave ghost audio running.

## 8.7 Current soundtrack foundation

Current starting tracks:

1. **Golden Lantern at Twilight** — primary opening ambience
2. **Sunlight on Bronze** — shorter reflective interlude

Current target playlist size: **5 tracks**.

Current crossfade target: approximately **3.8 seconds**, subject to track length and runtime tuning.

Shuffle should avoid immediate same-track repetition.

## 8.8 Audio asset policy

Do not claim music licensing beyond what has actually been verified.

Before commercial release, maintain explicit provenance/license records for every audio track.

---

# 9. Worldwide Mobile Architecture

## 9.1 Core mandate

Little Ganesha Tarot is **Worldwide Mobile-First**.

It must not be Android-first with Apple patches added later.

Primary first-class environments:

1. Android Chrome
2. Android installed PWA / app-like launch
3. iPhone Safari
4. iPhone Home Screen web app / PWA behavior
5. iPad / tablet responsive layouts

Additional Chromium/WebKit browsers should degrade gracefully.

## 9.2 Progressive enhancement

Every advanced capability must follow this rule:

> If the capability is unavailable, the app still works, remains attractive, and preserves the complete core tarot flow.

Examples:

- Fullscreen unavailable → continue in full viewport
- orientation lock unavailable → continue responsive
- `backdrop-filter` unavailable → use solid/translucent fallback
- autoplay denied → present usable Play state
- reduced motion active → use reduced-motion art direction
- PWA not installed → normal browser experience remains complete

## 9.3 Safe-area requirements

All key screens must account for modern mobile hardware and OS chrome using safe-area handling where applicable:

- notch
- Dynamic Island
- rounded display corners
- Home Indicator
- Android navigation areas

Use `viewport-fit=cover` and safe-area inset variables appropriately.

No primary CTA, mini-player control, card action, or navigation control may sit under inaccessible hardware/UI regions.

## 9.4 Viewport strategy

Prefer modern dynamic/small viewport units with practical fallback.

Do not assume classic `100vh` always equals visible mobile screen height.

## 9.5 Portrait-first, not portrait-fragile

Primary art direction and reading interaction are portrait-first.

Portrait may be declared as an app preference where supported, but the app must not fail when:

- orientation lock is unsupported,
- user rotates device,
- iPad opens in landscape,
- split-view changes available width.

Landscape may be less optimized than portrait, but it must remain usable and visually coherent.

## 9.6 Touch-first interaction

- no critical hover-only behavior,
- comfortable touch targets,
- enough spacing to prevent accidental taps,
- gestures must have visible alternatives,
- card interactions must not depend on precision dragging.

Recommended primary touch target floor: approximately 44 CSS px where practical.

## 9.7 Responsive range

Design should remain functional from narrow modern phone widths through large phones and tablets.

Avoid device-model-specific CSS such as targeting only a particular iPhone or Galaxy size.

---

# 10. Immersive Mode and PWA Presentation

## 10.1 Product goal

The experience should feel app-like and immersive by default without pretending that every browser exposes the same fullscreen behavior.

## 10.2 Immersive Mode

Settings include **Immersive Mode**.

Default: **ON**, unless a future compatibility test demonstrates a specific platform exception.

When enabled:

- installed PWA should use the most appropriate app-like display mode,
- normal browsers may request fullscreen after a valid user gesture where supported,
- unsupported browsers continue using the best full-viewport presentation.

When the user turns Immersive Mode OFF:

- store the choice locally,
- stop repeatedly requesting fullscreen,
- exit fullscreen when applicable,
- keep the app fully functional.

## 10.3 Fullscreen is enhancement, not dependency

No screen, layout, navigation route, audio subsystem, or reading engine may require the Fullscreen API to function.

## 10.4 PWA integration status and policy

PWA integration is now an active foundation milestone under **V0.3.2**, moved earlier by P’Benz’s explicit product direction so installation identity can be verified before deeper reading-engine work.

The V0.3.2 PWA foundation includes:

- `manifest.webmanifest` / install metadata
- canonical 192 × 192 and 512 × 512 launcher icons
- dedicated 512 × 512 maskable Android/Chromium icon
- Apple touch icon wiring for iPhone/iPad Home Screen
- browser favicon wiring
- theme/background colors
- `display: standalone` app-like installed presentation
- repository-safe relative `start_url` and `scope`
- service-worker registration
- versioned essential application-shell caching
- stale-cache cleanup
- network-first navigation/scripts/styles to reduce deployment regression risk
- runtime image caching
- installability event foundation for a future in-app install affordance

Large audio assets and the complete 78-card deck are intentionally **not** pre-cached at installation time. This protects first-install speed, storage usage, and reliability on constrained mobile networks. Deeper selective offline caching may be introduced later after real-world storage/performance QA.

The icon system defined in Section 5.3 is the canonical source for all launcher/Home Screen wiring. Do not generate replacement icons merely to satisfy platform-specific install behavior.

Service-worker caching must never reintroduce stale-build confusion during active development. JavaScript and CSS remain explicitly versioned, old Little Ganesha caches are cleaned on worker activation, and online navigation/code requests prefer the network before cached fallback.

**QA honesty:** V0.3.2 may be called statically PWA-wired after package validation, but browser UI such as Chrome showing “Install app” and the final installed icon/standalone launch must be verified on the deployed real device before being called runtime-validated.

---

# 11. Localization and Language Architecture

## 11.1 Launch languages

Launch architecture supports:

- English
- Thai

The system must remain ready for future languages without a rewrite.

## 11.2 No hardcoded distributed copy

User-facing copy should be centralized in localization structures rather than scattered as arbitrary literals throughout event handlers and UI logic.

## 11.3 Language quality

English must sound natural to international tarot users.

Thai must sound naturally written in Thai, not like a literal translation of English.

Preserve emotional meaning and product tone rather than word-for-word correspondence.

## 11.4 Three voice layers

### UI voice

Concise, functional, clear.

### Tarot interpretation voice

Professional, grounded, symbolic, nuanced, non-deterministic.

### Little Ganesha guide voice

Gentle, wise, perceptive, sacred-friendly, warm.

Avoid:

- RPG quest-giver language,
- childish mascot speech,
- excessive mystical certainty,
- guilt/manipulation,
- fake spiritual authority.

## 11.5 Date formatting

Stored date values may use stable internal ISO representation.

Displayed dates should be localized appropriately for the selected language and platform.

---

# 12. Personal Profile

## 12.1 Purpose

Personal Profile exists to provide gentle personalization and future symbolic features without turning the app into a heavy identity/account system.

## 12.2 Optional fields

Current approved fields:

- Display Name / preferred name
- Date of Birth

Both are optional.

Users may skip setup and use the tarot app normally.

## 12.3 First-entry copy intent

English concept:

**What would you like Ganesha to call you?**

Thai concept:

**อยากให้พระพิฆเนศน้อยเรียกคุณว่าอะไร?**

The name should be framed as a friendly nickname/preferred-name field, not a legal identity field.

## 12.4 Date of Birth role

Date of Birth may later support:

- symbolic birth personalization,
- day-of-week associations,
- numerology-style reflection,
- Lucky Numbers context,
- personalized Daily Guidance,
- future “Golden Profile” experiences.

A date of birth alone must **not** be presented as a full Thai astrology birth-chart calculation.

Do not imply a complete natal horoscope without the data and validated rules required to support that claim.

## 12.5 No birth time/place in V1

Do not request birth time or birthplace in V1.

Those fields would create substantial complexity involving timezone, geolocation, historical timezone/DST, astronomical/astrological systems, calculation methodology, and school-specific interpretation.

They may be considered only as a deliberate future astrology expansion.

## 12.6 Storage and privacy

Current rule:

- local device storage only
- no account required
- no server upload
- user can edit fields
- user can clear personal profile

Do not add analytics, cloud sync, or remote profile transmission without a new privacy review and explicit product decision.

## 12.7 Date validation

Date of Birth must:

- reject future dates,
- reject malformed dates,
- use a reasonable historical minimum,
- remain optional.

Current implementation foundation uses 1900-01-01 through current local date as a practical input range.

---

# 13. Home / Main Menu

## 13.1 Home philosophy

Home must present a clear hierarchy rather than a grid of equally loud features.

The user should immediately understand how to begin a reading.

## 13.2 Primary reading actions

Current intended primary actions:

### Daily Guidance
One card for the energy/theme of today.

### Ask Ganesha
A focused question-led reading.

### Three-Card Reading
A flexible three-card reading.

## 13.3 Signature paths

### The Golden Path

Three positions:

1. Where You Stand
2. What Blocks the Path
3. The Way Forward

### Remove the Obstacle

Three positions:

1. The Obstacle
2. What Feeds It
3. What Releases It

These should reuse the same underlying three-card engine while presenting distinct framing and interpretation copy.

## 13.4 Secondary exploration

Current planned secondary features:

- Lucky Numbers
- Cards / Card Library
- Journal
- Settings

Do not promote secondary features so aggressively that they compete with the main reading CTA hierarchy.

## 13.5 Premium Sacred Motif System

The Home/Menu visual language must communicate Little Ganesha's presence **symbolically rather than by repeating full character artwork inside every feature card**. Repeated portraits would reduce hierarchy, increase visual noise, and make the interface feel decorative rather than premium.

The canonical Home-card direction is therefore **Premium Minimal Sacred UI**:

- Little Ganesha may be strongly present on the Title/Hero and selected narrative moments.
- Home feature cards use restrained symbolic motifs, line art, halos, lotus geometry, sacred glyphs, card outlines, path forms, knots, manuscript marks, and abstract Ganesha cues.
- Motifs should generally carry only about **4–8% perceived visual weight**, with occasional controlled emphasis up to roughly 10–12% on the hero card when contrast remains safe.
- Motifs must never sit behind critical text at a contrast level that reduces readability.
- Motifs are decorative only and must not create additional accessibility announcements or interaction targets.
- Motifs should share one visual grammar: thin warm-gold strokes, restrained opacity, soft teal/deep-green integration, subtle luminous depth, and no gaudy ornament overload.
- Full Motion may use an extremely slow motif breathe/drift. Reduced Motion keeps motifs static rather than removing them, preserving premium visual identity without unnecessary movement.
- Vector/SVG assets are preferred for these motifs because they are lightweight, resolution independent, tintable/controllable, and suitable for worldwide device density.

Canonical motif mapping for the current Home foundation:

- **Daily Guidance** — halo + sacred sparkle / dawn-light geometry.
- **Ask Ganesha** — abstract half-profile / ear-trunk line presence, never a repeated full portrait.
- **Three-Card Reading** — three-card geometry / triad symbolism.
- **The Golden Path** — luminous curved path leading toward a halo/star.
- **Remove the Obstacle** — knot/loop geometry visibly opening or releasing.
- **Lucky Numbers** — restrained numerology circle / constellation geometry.
- **Card Library** — layered card-outline motif.
- **Journal** — manuscript/open-page lines with a quiet lotus seal.

The motif system is a reusable UI language, not one-off decoration. Future screens should reuse or extend the same grammar rather than invent unrelated ornament for each feature.

## 13.6 Navigation

A bottom navigation model is approved in principle for the app phase, with likely destinations such as:

- Home
- Read
- Cards
- Journal
- Settings

Exact visible tabs may evolve as feature maturity improves. Biu has authority to refine navigation if a cleaner information architecture becomes apparent.

---

# 14. Reading Engine Direction

## 14.1 V1 architecture

Initial reading engine should remain client-side and deterministic from curated tarot data.

Avoid requiring:

- user accounts,
- cloud backend,
- AI-generated readings,
- external inference APIs,
- subscription architecture.

These can be evaluated later if they clearly improve the product.

## 14.2 Core draw requirements

Reading engine must support:

- full canonical 78-card pool,
- no duplicate card inside a single spread unless intentionally designed otherwise,
- correct front image mapping,
- exact master card-back presentation,
- shuffle/selection/reveal lifecycle,
- reading mode position labels,
- history/journal handoff,
- future reversal state.

Prefer a robust random-selection implementation suitable for modern browsers. Avoid predictable or accidentally biased shuffle logic.

## 14.3 Reversal architecture

Architecture should support reversals from the beginning even if launch behavior defaults to upright-only.

Possible future user setting:

- Upright only
- Upright + Reversed

Do not hardcode card interpretation data in a way that makes reversed meanings difficult to add later.

## 14.4 Reading interpretation tone

Interpretations should:

- explain symbolism,
- relate the card to the user’s question/position,
- allow ambiguity,
- provide practical reflection,
- avoid guaranteed outcomes.

Do not write:

- guaranteed lottery results,
- guaranteed financial returns,
- medical diagnoses,
- deterministic death/illness claims,
- coercive relationship predictions,
- fear-based spiritual threats.

## 14.5 Reading presentation

Target interaction sequence:

`Prepare → Shuffle → Choose/Draw → Flip/Reveal → Interpret → Reflect → Save/Journal or Continue`

Card animation should emphasize physical clarity and premium tactility, not spectacle.

---

# 15. Lucky Numbers Feature

## 15.1 Approved product direction

Lucky Numbers is approved as a **secondary symbolic feature**.

English label:

**Lucky Numbers**

Thai may use:

**เลขมงคลวันนี้** or another natural final label selected during UX copy review.

## 15.2 Positioning

Lucky Numbers may derive symbolic context from:

- Daily Guidance card,
- card number,
- numerological reduction,
- optional Date of Birth,
- symbolic associations.

It must be described as reflective/entertainment symbolism, not an increased probability of winning money.

## 15.3 Prohibited framing

Avoid marketing copy such as:

- “เลขเด็ด”
- “เลขแม่น”
- “เพิ่มโอกาสถูกรางวัล”
- “เลขที่จะออก”
- instructions to buy lottery tickets
- guaranteed financial outcomes

## 15.4 Disclaimer direction

English concept:

> Lucky numbers are offered for reflection and entertainment, not as predictions of financial outcomes.

Thai concept:

> เลขมงคลเป็นส่วนหนึ่งของการตีความเชิงสัญลักษณ์และความบันเทิง ไม่ใช่การรับรองผลทางการเงิน

The final UX may make this concise, but the meaning must remain clear.

---

# 16. Card Library

## 16.1 Purpose

Card Library gives users access to the full deck as a learning/exploration system independent of drawing a reading.

## 16.2 Planned capabilities

- browse all 78 cards
- filter Major / suit
- inspect full-resolution presentation
- card title and number/rank
- keywords
- upright meaning
- future reversed meaning
- symbolism notes
- optional Little Ganesha reflection

## 16.3 Asset protection

Library must reference canonical card identities and approved image mapping.

No alternative card crop, frame redesign, or low-quality replacement image should silently substitute for the approved deck.

---

# 17. Journal / History

## 17.1 V1 direction

Journal/history is local-first.

Potential saved data:

- date/time
- reading mode
- user question (optional)
- drawn cards
- orientation
- interpretation snapshot or stable interpretation reference
- personal note

## 17.2 Privacy

Do not sync journal content remotely by default.

If future cloud sync is proposed, it requires explicit privacy/security/product review.

## 17.3 Data durability

Before release, define a stable local data schema and versioning/migration strategy so app upgrades do not silently corrupt or erase saved readings.

---

# 18. Settings Architecture

Settings is an operational control center, not a dumping ground.

Current approved areas:

## 18.1 Experience

- Language — English / Thai
- Motion — System / Full / Reduced
- Immersive Mode — On / Off

## 18.2 Audio

- Music — On / Off
- Volume
- Shuffle

## 18.3 Personal Profile

- Display Name
- Date of Birth
- Edit profile
- Clear personal profile

## 18.4 Support the Project

- International Supporters
- Supporters in Thailand

## 18.5 Navigation / reset actions

- Return to Title
- future app-data reset if needed, with explicit confirmation

Settings must preserve user choices consistently through local storage/state management.

---

# 19. Support the Project

## 19.1 Product principle

Support is voluntary and must never affect:

- reading quality,
- card selection,
- access to free features,
- “luck”,
- spiritual status,
- recommendation priority.

Avoid manipulative donation design.

## 19.2 International supporters

Channel:

**Buy Me a Coffee**

Placement:

`Settings → Support the Project → International Supporters`

Until a final URL is supplied and verified, this remains a disabled/placeholder foundation.

When activated:

- open the official external support destination,
- clearly communicate that payment is handled externally,
- do not collect card/payment information inside Little Ganesha Tarot,
- use safe external-link handling.

## 19.3 Thailand supporters

Channel:

**PromptPay**

Placement:

`Settings → Support the Project → Supporters in Thailand`

Current phase: placeholder only.

Production direction:

- use the actual scannable QR as the functional core,
- design a new premium Little Ganesha/Benedict Interactive support card around it,
- do not visually expose unnecessary personal identifiers,
- never distort the QR geometry,
- preserve adequate quiet zone,
- do not add decorative overlays that reduce scan reliability,
- test with multiple real banking apps/devices before release.

A PromptPay QR may encode a personal proxy even if the visible label is hidden. Treat the QR asset as a payment-sensitive public asset and review it deliberately before shipping.

## 19.4 Worldwide support UX

Do not force country detection or block one option based on IP.

Both support routes may remain visible because:

- Thai users may be abroad,
- international users may be in Thailand,
- locale is not identity.

The UI may reorder or emphasize a likely-relevant option based on selected language/locale, but it should not prevent access to the alternative.

---

# 20. Security and Privacy Baseline

## 20.1 No secrets in public repository

Never commit:

- API secrets
- private keys
- access tokens
- banking credentials
- raw identity documents
- unnecessary personal numbers
- private service credentials

## 20.2 Local personal profile

Display Name and Date of Birth remain local-only in the current architecture.

Use safe DOM assignment (`textContent` or equivalent) for user-provided names. Never inject profile values as unsanitized HTML.

## 20.3 External links

External support links and future external destinations must use safe navigation practices.

Avoid opener-based cross-window risks and unexpected redirects.

## 20.4 Third-party tracking

Do not add third-party analytics, advertising trackers, fingerprinting, or behavioral profiling merely because it is easy.

Any analytics proposal must justify:

- product benefit,
- data collected,
- retention,
- privacy implications,
- consent/legal requirements across target regions.

## 20.5 Payment boundary

Little Ganesha Tarot should not directly process sensitive payment credentials in the current product model.

Buy Me a Coffee and PromptPay remain external/payment-provider-side mechanisms.

---

# 21. Performance Standards

## 21.1 Philosophy

Premium does not mean heavy.

Effects, blur, particles, high-resolution artwork, and audio must be balanced against real-world mobile performance.

## 21.2 Animation performance

Prefer:

- `transform`
- `opacity`
- compositor-friendly motion

Use expensive filters/backdrop effects sparingly and provide fallback.

Avoid large numbers of continuously animated DOM particles.

## 21.3 Asset loading

- preload only what the opening experience truly needs,
- lazy-load card fronts not currently required,
- avoid downloading all 78 high-resolution PNG masters at first paint,
- retain PNG as archival masters but serve optimized derivatives when appropriate,
- load audio progressively and intelligently.

## 21.4 Mobile quality target

The app should feel smooth on common mid-range contemporary phones, not only flagship devices.

Before production release, test low-memory and slower-device behavior deliberately.

## 21.5 Network quality

The product should remain understandable on slower networks.

Use loading states rather than frozen blank regions.

PWA/offline caching should eventually protect essential shell assets and frequently used card data.

---

# 22. Accessibility Standards

Accessibility is a product-quality requirement, not a post-release patch.

Minimum expectations:

- meaningful focus states
- keyboard-operable primary controls where applicable
- correct buttons instead of clickable generic elements
- ARIA labels for icon-only controls
- readable color contrast
- adequate text size
- safe touch targets
- reduced-motion support
- no information communicated only by color
- screen-reader-friendly labels for controls and card states where practical
- modals that do not trap users invisibly

Any `hidden` element must be genuinely non-interactive and non-blocking.

The V0.2.x invisible-overlay regression is a permanent lesson: hidden UI must not remain as an invisible pointer-intercepting layer.

---

# 23. Engineering Governance — Full Authorized Dev Mode

This section is mandatory for every future build.

## 23.1 Development mindset

Biu must operate as if responsible for shipping the product under Benedict Interactive’s name.

For every change, ask:

> If Benedict Interactive released this build to real users worldwide today, would we be comfortable owning its quality?

## 23.2 Required development loop

Every meaningful build follows:

**Understand → Inspect Current System → Impact Analysis → Design → Implement → Regression Audit → Validation → Package → Release Notes → Post-Push Audit**

Never collapse the process to “edit → zip → send” when the change touches working systems.

## 23.3 Pre-change impact analysis

Before editing:

- identify affected files,
- identify stable behaviors that must remain unchanged,
- map dependencies,
- review persisted state/localStorage keys,
- review audio and navigation lifecycle impact,
- review iOS/Android implications,
- review accessibility impact,
- review asset/cache/deployment implications.

## 23.4 Regression rule

A new feature is not acceptable if it breaks a stable older feature without an explicitly approved trade-off.

Examples of protected regressions:

- language switch stops working,
- audio controls become blocked,
- Title interaction stops receiving taps,
- return-to-title leaves music running,
- existing local profile settings are lost,
- motion preference is ignored,
- iPhone safe-area controls become inaccessible,
- card mapping changes accidentally,
- cache serves incompatible JS/CSS versions.

## 23.5 Refactoring authority

Biu may refactor proactively when it reduces technical debt or future regression risk.

Refactoring should be preferred before a subsystem becomes too coupled to maintain safely.

Do not over-engineer speculative backend/service architecture that V1 does not need.

## 23.6 Product critique authority

Biu should actively identify:

- features that weaken the product,
- cluttered UX,
- inconsistent naming,
- poor hierarchy,
- technical shortcuts likely to fail worldwide,
- unnecessary complexity,
- privacy/security concerns,
- opportunities to make the product more premium.

Biu is expected to propose improvements without waiting for P’Benz to notice every issue.

---

# 24. QA Honesty Standard

## 24.1 Never overclaim testing

A build may only be described according to what was actually validated.

Distinguish:

### Static validation
Examples:

- JavaScript syntax check
- CSS brace/balance check
- HTML/DOM ID linkage inspection
- asset existence/path check
- archive integrity
- manifest/schema validation

### Runtime validation
Actual execution in a browser/device where interaction can be observed.

### Cross-device validation
Actual testing across multiple target environments.

### Production deployment validation
Actual deployed URL/build verified after push/deployment.

If runtime/browser access is blocked by the development environment, state that limitation clearly.

## 24.2 Suggested QA levels

Use these internal levels when useful:

- **QA-S:** Static validation passed
- **QA-R:** Runtime validation passed in at least one real browser/device
- **QA-X:** Cross-platform validation passed across required iOS/Android targets
- **QA-P:** Production deployment verified

A build should not be called fully production-ready solely because QA-S passed.

---

# 25. Release Gate

No build is considered release-ready until the following relevant checks are complete.

## 25.1 Core gate

- [ ] New requirement understood and documented
- [ ] Existing stable baseline identified
- [ ] Regression impact reviewed
- [ ] JavaScript syntax valid
- [ ] No obvious uncaught initialization dependency
- [ ] DOM IDs/events match
- [ ] CSS has no broken parse structure
- [ ] Hidden overlays cannot block interaction
- [ ] Asset paths resolve
- [ ] Cache/build versions match
- [ ] localStorage/state changes are backward-safe or migrated
- [ ] language switch remains functional
- [ ] motion settings remain functional
- [ ] audio lifecycle remains functional
- [ ] background/foreground audio intent preserved
- [ ] return-to-title cleans state correctly
- [ ] iOS safe-area layout reviewed
- [ ] Android viewport reviewed
- [ ] unsupported fullscreen/orientation gracefully falls back
- [ ] personal data remains local as designed
- [ ] external/payment placeholders do not expose secrets
- [ ] package/archive integrity checked
- [ ] known runtime limitations disclosed

## 25.2 Feature-specific gate

Reading builds additionally require:

- [ ] correct 78-card mapping
- [ ] no duplicate draw within spread
- [ ] correct spread position labels
- [ ] correct card-back/front state
- [ ] correct reversal state if enabled
- [ ] reading/history persistence reviewed

PWA builds additionally require:

- [ ] manifest validation
- [ ] icon coverage
- [ ] service-worker update strategy
- [ ] stale cache behavior tested
- [ ] offline fallback tested

Support/payment builds additionally require:

- [ ] destination verified
- [ ] no private identifiers unnecessarily exposed
- [ ] QR scan tested on multiple banking apps/devices
- [ ] external-link safety checked

---

# 26. Cache and Deployment Discipline

## 26.1 Build versioning

During active GitHub Pages development, static CSS/JS assets should be versioned or cache-busted consistently.

A build must not ship an HTML file referencing stale incompatible JS/CSS.

## 26.2 Version coherence

A release should expose one coherent build version across:

- HTML application-version
- body/build marker if used
- CSS query/version
- JS query/version
- README/release notes

## 26.3 GitHub Pages lesson

Do not assume “GitHub push succeeded” means the user is already viewing the new deployment.

After push:

1. verify repo head commit,
2. verify source files on `main`,
3. allow deployment propagation,
4. use a cache-busted URL if needed,
5. confirm deployed behavior on a real device.

Do not modify working source merely to compensate for a deployment cache that has not yet updated.

---

# 27. GitHub Repository

## 27.1 Repository

`grolygori789-crypto/little-ganesha-tarot`

Default branch:

`main`

Repository visibility:

Public.

GitHub Pages is enabled from the repository project.

## 27.2 Current integration limitation

The connected GitHub integration can currently read repository state but direct write operations have returned:

`403 Resource not accessible by integration`

Therefore the current operational workflow remains:

**P’Benz ↔ Biu → Biu prepares and validates build/package → P’Benz overlays files locally → GitHub Desktop Commit/Push → Biu re-reads/audits repository**

If GitHub integration write permission changes later, direct commit workflow may be adopted only after a safe non-destructive write test succeeds.

## 27.3 Repository as implementation truth

After P’Benz successfully pushes a build and Biu verifies it on `main`, that repository state becomes the current implementation baseline subject to the source-of-truth hierarchy in Section 0.1.

---

# 28. Recommended Repository Structure

Maintain a clean separation of concerns.

Recommended structure:

```text
/
├── index.html
├── README.md
├── MASTER_PLAN.md
├── assets/
│   ├── cards/
│   │   ├── 00_THE_FOOL.png
│   │   └── ...
│   ├── ui/
│   │   ├── card-back.png
│   │   └── title-hero.png
│   ├── icons/
│   │   ├── app-icon-1024.png
│   │   ├── icon-512x512.png
│   │   ├── icon-192x192.png
│   │   ├── icon-maskable-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-48x48.png
│   │   ├── favicon-32x32.png
│   │   └── favicon.ico
│   ├── audio/
│   │   ├── golden-lantern-at-twilight.mp3
│   │   └── sunlight-on-bronze.mp3
│   └── optimized/              # future derivatives if used
├── css/
│   └── app.css
├── js/
│   ├── app.js
│   ├── audio.js
│   └── ...                     # future modules
└── data/
    ├── AUDIO_MANIFEST_V1.json
    ├── cards.json              # future curated reading data
    └── ...
```

As the app grows, split large modules deliberately rather than allowing one monolithic `app.js` to become a maintenance risk.

Potential future modules:

- `router.js`
- `state.js`
- `reading-engine.js`
- `cards.js`
- `journal.js`
- `profile.js`
- `settings.js`
- `i18n.js`
- `pwa.js`

Do not modularize merely for appearance; split when responsibilities become meaningfully independent.

---

# 29. Current Application Status

## 29.1 Stable application foundation on `main`

The repository has progressed through the following verified uploaded milestones:

- V0.2.x — Benedict splash, Title, Living Title foundation, language, audio engine, Mini Player, Return to Title, interaction-overlay repair, cache-busting discipline
- V0.3.1 — first-entry Personal Profile, optional Display Name, optional Date of Birth, Home/Menu foundation, Settings, Motion preference, Immersive Mode foundation, global Mini Player, audio lifecycle, Support placeholders
- Master Plan V3.2 + canonical final app icon pack — uploaded to `main`

A major V0.2.x bug caused by an invisible modal/backdrop intercepting pointer events is considered resolved. Prevention of invisible interactive overlays remains a permanent regression rule.

## 29.2 V0.3.2 PWA Installability foundation uploaded

V0.3.2 has been uploaded to `main` under commit `Add PWA installability and icon wiring`. Static wiring is present in the repository; deployed real-device install behavior still requires device/browser verification before being called runtime-validated.

V0.3.2 intentionally preserves stable V0.3.1 application behavior while adding isolated PWA infrastructure:

- `manifest.webmanifest`
- relative `start_url: "./"` and `scope: "./"` suitable for the current GitHub Pages project path and easier future custom-domain migration
- `display: "standalone"`
- canonical 192 × 192 and 512 × 512 icons
- canonical maskable 512 × 512 Android icon
- Apple touch icon metadata
- favicon metadata
- iOS/iPadOS web-app metadata
- `js/pwa.js` service-worker registration
- `sw.js` versioned application-shell caching
- old Little Ganesha cache cleanup on activation
- network-first navigation / JS / CSS strategy
- runtime image caching
- no installation-time pre-cache of the full tarot deck or music library
- build/cache version 0.3.2

## 29.3 Protected V0.3.1 behavior

The PWA patch must not regress:

- Benedict Interactive splash
- Living Title
- TH/EN switching
- first-entry Personal Profile
- local-only Display Name / Date of Birth
- Home/Menu foundation
- Settings
- Motion mode
- Immersive Mode
- audio engine
- Mini Player
- background/foreground audio lifecycle
- Support placeholders
- Return to Title

No refactor of these systems is justified merely to add installability. PWA concerns are intentionally isolated.

## 29.4 PWA validation boundary

Static package QA may verify:

- manifest JSON validity
- required manifest fields
- icon dimensions / presence
- relative URL resolution under the GitHub Pages project path
- HTML manifest/icon linkage
- JavaScript/service-worker syntax
- service-worker cache-list file existence
- build markers

Static QA **cannot** prove that a specific browser/OS will surface a particular install-menu label at a particular moment. Real deployed QA must verify Android Chromium install UI, launcher icon, standalone launch, and iPhone/iPad Add-to-Home-Screen behavior.

## 29.5 Canonical app icon system

The final Little Ganesha icon system uploaded under Master Plan V3.2 remains canonical and is now the required PWA/Home Screen identity. V0.3.2 performs the runtime wiring; it does not redesign the icon.

## 29.6 V0.3.3 Premium Sacred Home Motif candidate

V0.3.3 is the prepared visual-language patch that preserves the V0.3.2 PWA foundation and V0.3.1 application behavior while adding a reusable symbolic motif layer to Home/Menu feature cards.

The patch:

- adds lightweight SVG motifs under `assets/motifs/`,
- maps each current Home feature to a distinct symbolic visual fingerprint,
- keeps text/content above decorative motif layers,
- maintains touch/focus behavior and adds restrained premium focus/hover feedback,
- keeps motifs visible but static under Reduced Motion,
- updates service-worker shell caching for the new motif assets,
- bumps application/cache version to 0.3.3,
- does not add repeated full Little Ganesha portraits to every card,
- does not modify tarot canon, audio behavior, profile data, Support placeholders, or reading logic.

Runtime appearance still requires deployed device QA; static validation can only confirm linkage, syntax, asset presence, and regression boundaries.

# 30. Immediate Development Milestones

## Milestone A — V0.3.2/V0.3.3 foundation stabilization

Goal:

Confirm that the already-working V0.3.1 product foundation remains stable while V0.3.2 PWA installation identity and V0.3.3 Premium Sacred Home motifs are verified on deployed real devices.

Acceptance focus:

- no regression to Benedict / Title / Home / Settings / profile / audio
- Home motifs remain subtle, readable, and visibly differentiated by feature
- no motif obscures Thai or English copy at narrow mobile widths
- Reduced Motion preserves static motif identity without animation
- manifest loads from the deployed GitHub Pages project path
- canonical icon appears in install/Home Screen UI
- Android Chromium offers app installation when its criteria are satisfied
- installed Android launch uses standalone/app-like presentation
- iPhone/iPad Add to Home Screen uses the Apple touch icon
- service worker registers without blocking normal online operation
- reload after deployment does not resurrect incompatible stale JS/CSS
- offline shell fallback works after at least one successful online load
- Mini Player global behavior
- background pause/resume
- Settings
- profile edit/clear
- Immersive fallback
- Support placeholders
- Return to Title

Do not begin deep reading-engine work if V0.3.1 contains a serious navigation/audio/state regression.

## Milestone B — Reading Engine foundation

Build:

- canonical card data model
- 78-card asset mapping
- secure/unbiased draw helper
- shuffle/choose/reveal states
- one-card reading
- reusable three-card engine
- spread position model
- reversal-ready schema

## Milestone C — Primary reading experiences

Implement:

- Daily Guidance
- Ask Ganesha
- Three-Card Reading
- The Golden Path
- Remove the Obstacle

Reuse the engine; do not build five unrelated drawing systems.

## Milestone D — Card Library

Add full-deck browse/details experience with curated interpretation data.

## Milestone E — Journal / local history

Add save/history schema and local persistence with migration discipline.

## Milestone F — Lucky Numbers

Add symbolic number logic after Daily Guidance / profile data structures are stable.

## Milestone G — Support activation

- add verified Buy Me a Coffee URL
- create premium Thailand PromptPay support card
- test QR scan reliability
- preserve privacy boundaries

## Milestone H — PWA hardening beyond V0.3.2 foundation

- real-device install regression matrix
- controlled update UX if future worker updates need user messaging
- selective card/offline data caching based on storage/performance evidence
- optional in-app install affordance using the established installability event foundation
- iOS/Android PWA QA expansion
- future custom-domain migration verification

## Milestone I — Production hardening

- accessibility pass
- performance pass
- international device QA
- content proofreading
- privacy/support disclosures
- deployment runbook
- release candidate audit

---

# 31. Product Decisions That Are Explicitly NOT Required for V1

To avoid unnecessary complexity, V1 does not require:

- user accounts
- cloud login
- backend database
- AI-generated readings
- server-side profile storage
- social network
- payment processing backend
- subscriptions
- push notifications
- full Thai astrology natal chart
- birth time/place collection
- multiplayer/community system
- complex CMS

Any of these may be considered later only if the product benefit justifies the operational and technical cost.

---

# 32. UX Quality Bar

Every screen should satisfy these questions:

1. What is the user trying to do here?
2. Is the primary action obvious within seconds?
3. Is there unnecessary competition for attention?
4. Does the screen still feel like Little Ganesha Tarot?
5. Is the text readable on a phone without zooming?
6. Can a user recover/back out safely?
7. Does it work without music?
8. Does it work without fullscreen?
9. Does it remain usable in Reduced Motion?
10. Does it remain usable on iPhone and Android?
11. Are loading/error/unsupported states graceful?
12. Does this look like something Benedict Interactive would confidently publish?

Visual polish is not achieved by adding more decoration. It comes from hierarchy, restraint, spacing, consistency, responsiveness, motion timing, typography, asset quality, and coherent interaction behavior.

---

# 33. Error Handling Philosophy

Never let an optional enhancement break the core flow.

Examples:

- audio load fails → readings still work
- fullscreen request fails → stay in viewport
- localStorage unavailable → session still works where practical
- one track fails → skip/fallback to another track
- asset fails → provide controlled fallback rather than invisible dead UI
- unsupported browser feature → capability-detect and degrade gracefully

User-facing error copy should be calm, specific, and actionable.

Avoid technical stack traces or cryptic browser terminology in normal UI.

---

# 34. State Management Principles

Even without a framework, state must be intentional.

Separate conceptually:

- session UI state
- persistent user preferences
- personal profile
- audio intent
- current reading
- reading history
- app build/cache version

Do not scatter unrelated `localStorage` access across every component indefinitely. As the app grows, centralize storage helpers/schema versioning.

Future persistent schema changes must support migration or safe fallback.

---

# 35. Content/Data Architecture Principles

Tarot meanings should eventually live in structured data rather than being hardcoded throughout UI logic.

Recommended card data shape may include:

```json
{
  "id": 0,
  "slug": "the-fool",
  "title": "The Fool",
  "arcana": "major",
  "number": 0,
  "image": "assets/cards/00_THE_FOOL.png",
  "keywords": {
    "upright": [],
    "reversed": []
  },
  "meaning": {
    "upright": {},
    "reversed": {}
  },
  "symbolism": [],
  "localization": {}
}
```

Exact schema may evolve. The principle is more important than the sample.

Content identifiers must be stable enough for Journal/history references across future builds.

---

# 36. Professional Release Documentation

Every meaningful release should record:

- version
- date
- changed files/subsystems
- user-visible changes
- bug fixes
- behavior changes
- persistent-state changes
- known limitations
- QA performed
- runtime environments actually tested
- rollback notes if relevant

Recommended commit messages should be concise and meaningful.

Avoid vague commits such as `update`, `fix stuff`, or `new version` for major releases.

---

# 37. Zero-Question Migration Instructions

A future development room receiving this file should proceed as follows:

1. Treat this document as active canonical V3.2.
2. Read the current GitHub `main` before modifying implementation.
3. Verify which planned candidate build has actually been pushed.
4. Do not ask P’Benz to restate deck canon, frame rules, audio behavior, app direction, support architecture, profile rules, or engineering authority already documented here.
5. Preserve the five corrected Minor Arcana cards and all approved canonical assets.
6. Do not regenerate the 78-card deck unless P’Benz explicitly asks.
7. Do not retry abandoned Google Flow title animation unless P’Benz explicitly asks; Living Title is CSS/JS direction.
8. Do not assume direct GitHub write permission; test safely before claiming it exists.
9. Before generating a new build, inspect current stable implementation and perform impact analysis.
10. After P’Benz pushes, audit the actual repository state and deployment rather than assuming the package equals production.
11. Continue from the next incomplete milestone rather than restarting foundation work.
12. Use professional product judgment proactively under the Full Authorized Dev mandate.

---

# 38. Non-Negotiable Failure Conditions

The following should block release or require immediate correction:

- wrong tarot numbering
- wrong card identity/title
- wrong suit-symbol count
- Little Ganesha identity drift in a canonical replacement
- accidental use of obsolete corrected cards
- broken Tap to Begin
- invisible overlay blocking the UI
- nonfunctional language switch
- audio that cannot be stopped
- background audio ignoring intentional lifecycle policy
- user profile uploaded remotely without approval
- secrets/private banking identifiers committed unintentionally
- unsupported fullscreen causing navigation failure
- app unusable on iPhone Safari or common Android Chrome
- stale cache causing incompatible HTML/JS/CSS without recovery strategy
- unverified feature described as “fully tested”
- support/payment implying better readings or spiritual benefit
- deterministic financial/lottery promises

---

# 39. Definition of Done

A feature is **Done** only when all of the following are true:

1. Product intent is satisfied.
2. UX is coherent with the rest of the app.
3. Implementation is maintainable at the current project scale.
4. Stable behavior has not regressed.
5. Relevant static validation passes.
6. Relevant runtime testing has been completed or limitations are explicitly disclosed.
7. Mobile compatibility has been considered.
8. Accessibility/fallback behavior has been considered.
9. Persistent-state impact has been considered.
10. Assets and links are correct.
11. Release notes/versioning are coherent.
12. Deployed source is audited after push when possible.

“Code exists” is not Definition of Done.

---

# 40. Final Product Standard

Little Ganesha Tarot should ultimately feel like a product that could be discovered by a user anywhere in the world with no knowledge of its development history and still communicate:

- visual confidence,
- spiritual warmth,
- tarot credibility,
- technical polish,
- trustworthy behavior,
- thoughtful accessibility,
- careful privacy,
- refined sound and motion,
- coherent Benedict Interactive authorship.

The product should never expose the development compromises behind it. Complexity belongs inside the implementation; the user should experience calmness, clarity, delight, and confidence.

---

# 41. V3.1 Change Log

V3.1 consolidates and formally locks the following major updates beyond the prior V3 deck-era plan:

- Full Authorized Product & Development Lead authority for Biu
- Founder / Vision Owner role separation
- Working Code Is Protected Territory rule
- mandatory regression-first engineering governance
- QA honesty levels and release gate
- worldwide mobile-first architecture
- iOS / Android parity
- progressive enhancement / graceful fallback
- Immersive Mode architecture
- portrait-first but non-fragile responsive policy
- Living Title Full/Reduced Motion direction
- professional audio autoplay/lifecycle behavior
- global Mini Player direction
- first-entry profile flow
- optional Display Name
- optional Date of Birth
- local-only personal profile privacy
- no birth time/place in V1
- Home/Menu hierarchy
- signature reading paths
- Lucky Numbers symbolic positioning
- Settings architecture
- Support the Project architecture
- Buy Me a Coffee international channel placeholder
- Thailand PromptPay channel placeholder and QR privacy/scanning rules
- GitHub write-permission limitation workflow
- cache/version/deployment discipline
- V0.3.1 candidate status
- Reading Engine as the next major functional milestone after foundation stabilization
- zero-question migration instructions for future rooms

---


# 42. V3.2 Change Log

V3.2 preserves all V3.1 governance and product decisions and additionally locks the **final application icon system** as a canonical product asset.

V3.2 additions:

- canonical Little Ganesha app icon visual identity
- icon-first simplification rule for small-size recognizability
- no embedded product-name text in the production launcher icon
- 1024 × 1024 canonical raster master
- Android/Chromium 512 and 192 PWA derivatives
- dedicated Android maskable icon
- Apple touch icon derivative
- PNG favicon derivatives and ICO fallback
- platform safe-zone / launcher-mask rules
- repository `assets/icons/` structure
- explicit rule that future icon replacement is a brand-level change
- PWA roadmap updated to distinguish **icon assets complete** from **manifest/runtime integration pending**
- QA honesty maintained: no claim of install-icon runtime behavior until wiring and real-device installation tests pass

---

# 43. V3.3 Change Log

V3.3 preserves all V3.1–V3.2 governance, deck, product, profile, support, audio, motion, worldwide-mobile, and icon decisions while moving PWA installation identity into the active foundation milestone by explicit Founder direction.

V3.3 additions / status corrections:

- records V0.3.1 as uploaded application foundation rather than pending candidate
- records Master Plan V3.2 + canonical app icon pack as uploaded to `main`
- defines V0.3.2 as the PWA Installability & App Icon Wiring candidate
- locks `manifest.webmanifest` as the install metadata source
- locks relative `./` start URL/scope strategy for GitHub Pages project-path safety and future migration flexibility
- locks `display: standalone` as the baseline installed presentation
- wires canonical 192/512/maskable icons into the manifest
- wires Apple touch icon and favicon metadata into HTML
- adds isolated `js/pwa.js` service-worker registration foundation
- adds versioned `sw.js` application-shell caching and stale-cache cleanup
- protects working V0.3.1 systems from PWA-driven refactoring
- excludes large audio and the full 78-card deck from install-time pre-cache
- explicitly separates static PWA validation from deployed real-device install validation
- moves deeper PWA work from “not started” to “foundation implemented; hardening later”

---

# 44. V3.4 Change Log

V3.4 preserves all prior governance, tarot canon, PWA, icon, profile, support, audio, motion, worldwide-mobile, and product decisions while establishing the canonical Premium Sacred Home motif system.

V3.4 additions / status corrections:

- records V0.3.2 PWA wiring as uploaded to `main` while keeping real-device install QA honest/pending,
- defines V0.3.3 as the Premium Sacred Home Motif candidate,
- locks **Premium Minimal Sacred UI** as the Home-card design direction,
- rejects repeated full Little Ganesha portraits across every Home card,
- defines a symbolic motif map for Daily Guidance, Ask Ganesha, Three-Card Reading, The Golden Path, Remove the Obstacle, Lucky Numbers, Card Library, and Journal,
- prefers lightweight reusable SVG motif assets,
- locks low visual weight and typography-first readability,
- preserves motifs as static artwork in Reduced Motion rather than removing the visual identity,
- requires new motif assets to participate in service-worker/cache versioning,
- protects V0.3.1/V0.3.2 stable behavior from unnecessary visual refactoring.

---

# 45. Canonical Closing Rule

**When uncertain, choose the solution that best protects tarot correctness, Little Ganesha identity, user trust, worldwide usability, stable working behavior, premium presentation, and long-term maintainability.**

P’Benz retains final explicit authority. Within that boundary, Biu is expected to act proactively and decisively as the product’s fully authorized development lead.

**End of Master Plan & Zero-Question Development Handoff V3.4**

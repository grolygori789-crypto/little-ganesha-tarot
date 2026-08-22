# LITTLE GANESHA TAROT — MASTER PLAN & ZERO-QUESTION DEVELOPMENT HANDOFF V4.1

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio / Publisher:** Benedict Interactive  
**Founder / Repository Owner:** P’Benz  
**Product & Development Lead:** Biu  
**Canonical repository:** `grolygori789-crypto/little-ganesha-tarot`  
**Default branch:** `main`  
**Document version:** V4.1  
**Document date:** 23 August 2026  
**Document type:** Master Plan + Product Specification + Engineering Governance + Operational Handoff  
**Runtime status represented by this document:** V0.5.3  
**Verified GitHub HEAD at document creation:** `e64cc446e4100a18076b98688a04645873b95622` — `Clean old patch manifests`  
**Runtime feature commit immediately below HEAD:** `bee251a009f2b310593a453bbc99971588db1468` — `Fix background audio pause V0.5.3`  

> **Important:** This is a documentation/governance refresh. It does **not** require a runtime bump by itself. Runtime remains V0.5.3 until shipped application behavior materially changes.

---

# 0. Executive Authority Statement

This document is the current self-contained operational authority for **Little Ganesha Tarot — The Golden Path**.

V4.1 preserves the governance, architecture, product identity, tarot integrity, stability constitution, privacy/security policy, PWA discipline, accessibility, localization, release gates, and low-complexity engineering philosophy established in V4.0, while updating the actual product state through runtime V0.5.3.

A future room or developer must be able to continue immediately from this document, current GitHub `main`, approved assets, and the companion `ROOM_MIGRATION_PROMPT_V4_1.md` without forcing P’Benz to reconstruct previous decisions.

## 0.1 Source-of-truth order

When sources conflict, use this order:

1. Biu’s newest explicit final product/development decision in the current room under the active Full Authorized Dev mandate.
2. This Master Plan V4.1.
3. Approved canonical production assets.
4. Current verified GitHub `main`.
5. Earlier Master Plans, migration prompts, manifests, release packages, experiments, rejected builds, and unaccepted proposals.

Older documents may remain for provenance but are historical when they conflict with V4.1.

## 0.2 Founder / development authority — FINAL GOVERNANCE LOCK

**P’Benz** is Founder / Vision Originator / Repository Owner.

**Biu** is the **Full Authorized Product & Development Lead** with delegated final product-development authority over:

- product scope and sequencing,
- UX / UI / interaction design,
- visual-system decisions,
- architecture and code structure,
- Reading Engine design,
- data/state/storage strategy,
- local persistence,
- mobile/PWA behavior,
- accessibility,
- performance,
- privacy/security implementation,
- localization architecture and language quality,
- audio/motion/SFX,
- testing and QA gates,
- runtime build/version numbering,
- refactoring and rollback,
- whether a Founder proposal should be accepted, modified, simplified, deferred, replaced, or rejected.

P’Benz’s ideas are high-value Founder input. Biu is responsible for selecting the implementation that best protects product quality, user trust, stability, maintainability, worldwide usability, and long-term viability.

Only an explicit decision by P’Benz to revoke or redefine the Full Authorized Dev delegation changes this authority.

Account ownership, legal identity, payment accounts, credentials, taxes, contracts, and actions that inherently require P’Benz’s authorization remain outside Biu’s account authority.

## 0.3 Zero-question principle

Do not make P’Benz reconstruct prior decisions.

Before asking a question, first check:

1. this Master Plan,
2. the room migration prompt,
3. current GitHub `main`,
4. approved assets,
5. existing implementation and tests,
6. prior accepted project rules.

Ask only when information is genuinely unavailable or requires Founder-only authorization.

## 0.4 Protected working code

Any deployed subsystem that has been real-device accepted or otherwise verified becomes **protected stable behavior**.

Do not rewrite a working subsystem merely because another implementation seems cleaner.

Regression prevention has priority over novelty.

## 0.5 Golden product rule

> **A working, understandable, maintainable Little Ganesha Tarot is more valuable than a theoretically more ambitious Little Ganesha Tarot that becomes fragile.**

Prefer a 9–9.5/10 user experience at complexity 4/10 over a theoretical 10/10 solution at complexity 9/10.

Default implementation target: **easy to medium complexity**.

---

# 1. Product Identity

## 1.1 Name

**Little Ganesha Tarot**  
Subtitle: **The Golden Path**

## 1.2 Studio

**Benedict Interactive**

## 1.3 Product positioning

A premium, sacred-friendly, visually rich, RWS-inspired 78-card tarot experience centered on one identity-locked Little Ganesha protagonist.

The product combines:

- complete 78-card deck,
- calm mobile-first readings,
- professional contextual interpretation,
- reflective rather than deterministic guidance,
- native-quality English and Thai,
- strong audiovisual identity,
- local-first privacy,
- PWA/app-like delivery,
- open access with voluntary support.

It must not feel like:

- a cheap fortune generator,
- a slot machine,
- a generic AI demo,
- a children’s cartoon app,
- a cluttered spiritual marketplace,
- a machine-translated web app.

## 1.4 Business model

Current canonical direction:

**Open Access + Voluntary Support**

No current:

- login wall,
- subscription,
- paywall,
- entitlement system,
- premium reading quality tier.

Support must never affect:

- card choice,
- reading quality,
- interpretation depth,
- spiritual status,
- luck,
- fairness.

Planned support channels:

- Worldwide: Buy Me a Coffee
- Thailand: PromptPay

---

# 2. Complexity & Stability Constitution

## 2.1 Prefer

1. browser/platform-native capability,
2. small client-side module,
3. existing shared project subsystem,
4. narrow managed third-party integration,
5. custom infrastructure only when clearly justified.

## 2.2 Avoid by default

- custom backend servers,
- custom authentication stacks,
- distributed membership logic,
- complex billing state machines,
- broad framework migrations,
- cloud dependency for basic readings,
- deep refactors for isolated features,
- optional services tightly coupled to the Reading Engine.

## 2.3 Isolation rule

Optional systems must fail independently.

Examples:

- audio failure → readings still work,
- Share unavailable → Save fallback remains,
- fullscreen unsupported → viewport remains usable,
- support provider unavailable → tarot remains usable.

## 2.4 Complexity veto

Biu must reject, simplify, redesign, or defer a feature when complexity is disproportionate to user value or creates unnecessary regression surface.

---

# 3. Canonical Tarot System

## 3.1 Deck

Exactly **78 canonical cards**:

- 22 Major Arcana
- 56 Minor Arcana

## 3.2 RWS numbering lock

- Strength = VIII
- Justice = XI

## 3.3 Suit order

1. Wands
2. Cups
3. Swords
4. Pentacles

## 3.4 Rank order

Ace → Two → Three → Four → Five → Six → Seven → Eight → Nine → Ten → Page → Knight → Queen → King

Use **Page**, never “Age”.

## 3.5 Numbered Minor symbol integrity

Where visible suit-symbol counts are semantically relevant, the count must match the card identity.

Wrong wand/cup/sword/pentacle count is a production failure.

## 3.6 Upright-first

Current product is upright-first.

Architecture remains reversal-ready but reversals are not activated merely because they are technically possible.

---

# 4. Canonical Visual System & Assets

## 4.1 Deck master

**THE FOOL** remains the absolute visual/frame master.

## 4.2 Little Ganesha identity lock

Little Ganesha is one continuous protagonist across all 78 cards.

Preserve:

- facial structure,
- trunk shape,
- ear proportions,
- child-like age impression,
- head/body relationship,
- skin-color family,
- crown identity,
- jewelry identity,
- sacred-cute premium rendering language.

Identity drift is a hard failure.

## 4.3 Card master format

- 941 × 1672 px
- PNG
- standalone card only

Optimized derivatives may be used for runtime performance but must not overwrite archival PNG truth.

## 4.4 Canonical paths

Card back:

`assets/ui/card-back.png`

Title hero:

`assets/ui/title-hero.png`

## 4.5 Corrected canonical cards

The following corrected versions permanently supersede older versions:

- 39 FOUR OF CUPS
- 40 FIVE OF CUPS
- 70 SEVEN OF PENTACLES
- 71 EIGHT OF PENTACLES
- 72 NINE OF PENTACLES

## 4.6 App icon

Current app icon is approved/canonical and Android Home Screen verified.

Do not replace casually.

---

# 5. Home / Shell / Profile

## 5.1 Home visual direction

Canonical direction:

**Premium Minimal Sacred UI**

Home V0.3.6 visual direction remains approved.

Do not continue polishing Home without a concrete usability, accessibility, compatibility, performance, security, defect, or high-value product reason.

## 5.2 Opening flow

First use:

`Studio Splash → Title → Tap to Begin → Optional Profile Setup → Welcome → Home`

Subsequent use:

`Studio Splash → Title → Tap to Begin → Home`

## 5.3 Fullscreen policy

`Tap to Begin` must **not** auto-request browser fullscreen.

Browser Full Screen is explicit Settings behavior only.

Installed PWA uses standalone presentation.

## 5.4 Profile

Current optional fields:

- Display Name
- Date of Birth

Rules:

- local-only,
- no account,
- editable,
- clearable,
- no birth time/place by default.

Current Home profile includes precise age and zodiac display and is accepted as stable.

Do not reopen it for cosmetic experimentation.

---

# 6. Global Native Language Standard

This is a **hard release requirement**.

Current supported languages:

- English
- Thai

Every supported language must feel written for that language from the beginning.

## 6.1 Never ship

- literal translation,
- machine-translation feel,
- syntactically imported phrasing,
- awkward spiritual language,
- overly formal UI,
- vague AI-like copy,
- mixed incomplete localization.

## 6.2 English and Thai are independent native compositions

They share product meaning, safety intent, and reading conclusion, but not sentence-by-sentence literal wording.

## 6.3 Three voice layers

### UI voice

Short, clear, warm, functional, premium.

### Tarot interpretation voice

Professional, symbolic, contextual, grounded, nuanced, practical, non-deterministic.

### Little Ganesha guide voice

Gentle, perceptive, wise, sacred-friendly, warm.

Never childish mascot speech and never fake supernatural authority.

---

# 7. Professional Tarot Reader Language Standard

Every actual interpretation must feel like a reading from a highly experienced professional tarot reader.

Target impression:

> **“A skilled reader is reading my situation, not explaining a card dictionary.”**

Preferred flow:

Situation / overall direction  
→ what the card shows in this exact context  
→ why it matters  
→ likely tendency  
→ meaningful caution/tension  
→ practical guidance  
→ concise reflection where useful.

Avoid:

- generic card definitions,
- template prose,
- mystical filler,
- generic horoscope language,
- “energy is shifting” when something more concrete can be said,
- forced positivity,
- unnecessary fear,
- deterministic claims,
- overly poetic language that reduces clarity.

Deep does not mean complicated.

The user should not need tarot knowledge to understand the answer.

## 7.1 Thai

Must sound originally written by an excellent native Thai tarot reader.

Avoid literal English syntax and stiff translated Thai.

## 7.2 English

Must sound like genuine native professional English.

Avoid textbook phrasing, translation smell, and synthetic mystical clichés.

---

# 8. Shared Reading Engine — PROTECTED

Current Reading Engine version: **1.1.0** unless current GitHub later proves it changed.

All reading modes reuse one canonical Reading Engine.

Core requirements:

- 78 cards,
- stable card IDs,
- correct image mapping,
- Web Crypto shuffle where supported,
- no duplicate card in one spread,
- stable spread definitions,
- upright-first,
- reversal-ready architecture,
- local-first persistence,
- Journal-compatible stable identifiers.

## 8.1 Selection integrity

The full deck is shuffled **before** display.

Each facedown position is bound to a real card immediately.

User taps a facedown card  
→ that exact pre-bound card is selected.

Never:

`tap → then randomize`.

Never reassign a selected position after tap.

No visible 1–78 position numbers.

---

# 9. Compact Full-Deck Ritual — PROTECTED V0.5.1 UX

Current accepted card-selection presentation:

**6 rows × 13 cards = 78 cards**

Rules:

- all 78 facedown cards visible within one portrait selection stage,
- no horizontal deck scrolling,
- approved card back,
- overlapping physical-deck feeling,
- subtle premium lift/glow,
- keyboard/focus accessibility where applicable.

This supersedes the rejected 3×26 horizontal-pan design.

## 9.1 Three-Card dead-space rule

After the third card is selected:

- remove/collapse the deck stage from layout,
- do not merely make its inner content invisible,
- selected rail/status/Reveal must remain close together,
- no huge blank area before Reveal.

This UX was accepted on a real device and is protected.

---

# 10. Current Playable Reading Modes

Current implemented primary modes:

1. Daily Guidance
2. Ask Ganesha
3. Three-Card Reading

These are real working modes, not placeholders.

---

# 11. Daily Guidance

Canonical behavior:

- full 78-card pool,
- one card per **local calendar day**,
- same local day = same card,
- premium choose/reveal,
- English + Thai native content,
- Keywords,
- Core Meaning,
- Reflection,
- six Daily Lenses,
- Save,
- Share.

Canonical six lenses:

1. Work & Goals
2. Money & Resources
3. Love & Relationships
4. Inner State & Balance
5. Opportunities & Watch-outs
6. Guidance for Today

Thai copy is independently native.

Persistence is based on local date, not a rolling 24-hour timer.

Same-day content migration must preserve the already selected card rather than reroll.

---

# 12. Ask Ganesha — Product Contract

Ask Ganesha is not a generic one-card meaning screen.

Pipeline:

`User Question`
→ semantic analysis  
→ Question Contract / context  
→ pre-shuffled card choice  
→ interpret selected card under that question  
→ direct reflective answer.

Core rule:

> **The question determines the subject that must be answered. The card determines what can meaningfully be said about that subject.**

Thai canonical expression:

> **คำถามกำหนดเรื่องที่ต้องตอบ ไพ่กำหนดสิ่งที่จะพูดเกี่ยวกับเรื่องนั้น ไพ่ไม่มีสิทธิ์พาคำตอบออกนอกคำถาม**

Example:

Question = one-year financial outlook  
Card = The Sun

The answer must address finance / resources / opportunity / timeframe / direction.

It must not drift into unrelated generic Sun symbolism.

---

# 13. Ask Ganesha — Semantic Architecture

Protected semantic stack includes concepts/modules such as:

- `LGTQuestionAnalyzer`
- `LGTQuestionContract`
- `LGTAskContext`
- `LGTAskSemantic`
- Ask storage/persistence

Relevant semantic dimensions include:

- DOMAIN
- FACET
- MICRO_FACET
- TARGET
- PERSPECTIVE
- QUESTION_TYPE
- METRIC
- TIMEFRAME
- COMPARISON
- POLARITY
- CERTAINTY_REQUEST

The system must distinguish meaningful differences such as:

- money vs work,
- outcome vs decision,
- self vs another person,
- this year vs next year,
- general outlook vs specific choice,
- comparison A vs B,
- different conditional scenarios.

---

# 14. Ask Ganesha — Smart Semantic Duplicate Lock

This is a **hard current product rule**.

Within the same **local calendar day**:

same semantic question  
or meaningfully equivalent question  
= same canonical reading outcome.

The system must not rely only on exact string matching.

It must work with:

- Thai,
- English,
- paraphrased Thai,
- paraphrased English,
- equivalent meaning across Thai/English.

Examples likely belonging to one semantic family:

- `ปีนี้การเงินผมจะดีขึ้นไหม`
- `ปีนี้ฐานะทางการเงินมีแนวโน้มดีขึ้นหรือเปล่า`
- `Will my finances improve this year?`
- `Do I have a better financial outlook this year?`

When the semantic contract represents the same essential inquiry:

- same card,
- same interpretation direction,
- same answer contract,
- no reroll.

If an exact same-language reading snapshot already exists, reuse the existing reading.

If the user changes language, wording may be rendered naturally in the selected language, but the underlying card, reading direction, and conclusion must remain equivalent.

The user must not be able to paraphrase repeatedly until a preferred card appears.

## 14.1 False-positive protection

The matcher must also avoid collapsing genuinely different questions.

Examples normally different:

- finances this year vs accept a new job,
- Alice vs Bob,
- this year vs next year when timeframe matters,
- choose A vs choose B,
- love relationship vs career decision.

The system must be intelligent in both directions:

**catch real duplicates**  
and  
**avoid false duplicates**.

---

# 15. Ask Ganesha — Safety Boundaries

Tarot remains symbolic/reflection-oriented.

Never promise:

- guaranteed fate,
- guaranteed relationships,
- guaranteed financial outcomes,
- lottery results,
- medical diagnosis,
- legal outcomes,
- deterministic death/illness,
- confirmed curses/possession/spiritual attack.

Supported spiritual themes may include:

- divine protection,
- spiritual path,
- signs/synchronicity,
- dreams,
- spiritual gifts,
- karma/destiny,
- past-life symbolism,
- unseen influence.

But never confirm supernatural threats as fact.

---

# 16. Three-Card Reading

Canonical positions:

1. Past
2. Present
3. What May Unfold Next

Thai:

1. อดีต
2. ปัจจุบัน
3. แนวโน้มต่อจากนี้

Position 3 is directional/reflective, not guaranteed fate.

## 16.1 Narrative rule

Three cards must be read as one story.

Interpret relationships:

Card 1 → Card 2:
what changed / what led here.

Card 2 → Card 3:
where current momentum may lead.

Card 1 ↔ Card 3:
what persists, transforms, resolves, or repeats.

All three:
overall story.

The middle card often acts as a hinge.

Pattern awareness may include:

- multiple Major Arcana,
- suit concentration,
- court concentration,
- improving/challenging/recovery/mixed trajectory.

Never output three unrelated dictionary paragraphs.

---

# 17. Three-Card — One Completed Reading Per Local Day

Hard current rule:

**one completed spread per local calendar day.**

The lock occurs only after a valid completed reading exists.

Entering the mode does not consume the day.

Leaving after one or two selections does not consume the day.

Once completed:

- same local day → same three cards,
- same narrative,
- no reroll.

Next local day → new reading available.

---

# 18. Local Day / Timezone

Daily discipline uses the device/user local calendar.

Do not use one hardcoded country timezone globally.

Examples:

- Asia/Bangkok
- Europe/London
- America/New_York

should reset according to the actual device-local day.

When returning from background, recalculate eligibility using real current local time.

Do not assume background timers continued accurately.

---

# 19. Quiet Countdown

Daily Guidance and Three-Card display a calm countdown until new eligibility.

Ask Ganesha does **not** use one global Ask timer because different questions remain allowed.

Ask countdown appears only when the same semantic question family is locked for the current day.

Visual philosophy:

- quiet,
- secondary,
- premium,
- non-gamified.

Preferred granularity:

- ≥ 1 hour: hours + minutes
- < 1 hour: minutes
- final minute: seconds may appear

At local midnight, eligibility updates without requiring a full-page reload.

Foreground return recalculates against real time.

---

# 20. Save + Share — Global Reading Standard

Every retainable reading mode should provide:

- Save
- Share

No Print button is currently required.

Save/Share creates a **curated reading artifact**, not a raw screenshot with app chrome.

Use native system sharing where supported.

If native file Share is unavailable, Save remains fallback.

Generation remains local/client-side where currently implemented.

---

# 21. Ask Share Privacy

Ask question text may be sensitive.

Current rule:

### Save

Exact question may be preserved for the user’s personal saved reading.

### Share

Hide the exact question by default.

If a future UI lets the user explicitly include it, that must be a deliberate choice.

Even when hidden, the interpretation itself may reveal topic context.

Do not upload user questions to a server merely to generate readings or exports.

---

# 22. Audio — Current Philosophy

Music is atmosphere, not the tarot product.

Core reading functionality must remain usable with music disabled.

Current tracks:

1. Golden Lantern at Twilight
2. Sunlight on Bronze

Music should persist between normal screens and not restart unnecessarily.

Global Mini Player remains.

---

# 23. Audio Lifecycle — PROTECTED V0.5.3

V0.5.3 fixed a real Android/PWA background-audio defect.

Do not restore V0.5.2’s old fade-before-pause behavior.

## 23.1 Old bug

The old hide path awaited a requestAnimationFrame fade before calling `pause()`.

Android/PWA could suspend animation frames immediately after backgrounding, so code might never reach `pause()`.

## 23.2 Canonical behavior

When app becomes hidden/minimized/backgrounded/screen-locked:

- pause active audio **synchronously / immediately**,
- do not depend on fade completion.

When app returns:

- resume from preserved playback position only if music was playing immediately before system hide.

Manual pause:

- user manually paused before background → remain paused on return.

Do not override user intent.

Lifecycle fallback coverage includes:

- `visibilitychange`
- `pagehide`
- `pageshow`
- `freeze`
- `resume` where supported

Crossfade state must not leave hidden audio playing.

This behavior passed P’Benz’s real-device test and is protected.

---

# 24. PWA / Worldwide Mobile

First-class targets:

1. Android Chrome
2. Android installed PWA
3. iPhone Safari
4. iPhone Home Screen app/PWA
5. iPad/tablet responsive layouts

Android evidence is not iOS evidence.

Known real-device status:

- Android app-like/PWA foundations: PASS
- Android V0.5.3 audio lifecycle: PASS
- iPhone/iPad cross-platform gates may remain pending unless later verified.

## 24.1 Progressive enhancement

Unsupported optional capability must degrade gracefully.

Examples:

- fullscreen unsupported → viewport,
- autoplay denied → usable Play state,
- Web Share file unsupported → Save fallback,
- PWA not installed → browser version remains functional.

## 24.2 Safe areas / viewport / touch

Respect:

- notches,
- Dynamic Island,
- rounded corners,
- Home Indicator,
- Android navigation regions,
- changing mobile viewport heights,
- portrait and landscape usability,
- comfortable touch targets.

---

# 25. Settings

Current/approved areas include:

### Experience

- Language
- Motion: System / Full / Reduced
- Browser Full Screen where supported

### Audio

- Music On/Off
- Volume
- Shuffle
- future SFX control when SFX exists

### Personal Profile

- Display Name
- Date of Birth
- edit/clear profile

### Support

- Worldwide
- Thailand

### Navigation

- Return to Title

Settings must not become a dumping ground.

---

# 26. State / Storage Architecture

Conceptually separate:

- transient UI/session state,
- user preferences,
- profile,
- audio intent,
- current reading,
- Daily persistence,
- Ask semantic-family persistence,
- Three-Card daily persistence,
- Journal/history,
- content/schema versions,
- runtime build/cache version.

Do not scatter direct storage logic indefinitely.

Prefer small purpose-specific wrappers/modules.

Persistent schema changes require:

- old version,
- new version,
- migration path,
- failure fallback,
- test for existing user data.

Silent destructive reset is unacceptable unless explicitly chosen as the only safe recovery.

---

# 27. Journal — Future Architecture

Journal is distinct from Save and Share.

- Save Image = portable artifact
- Share = external sharing
- Journal = structured in-app history

Journal is local-first.

When implemented, prefer an isolated structured store such as IndexedDB rather than scattered direct calls.

Journal should preserve historical fidelity through stable IDs/content versions and appropriate snapshots.

Do not silently erase history during updates.

Cloud sync is not current roadmap.

---

# 28. Card Library

Planned capabilities:

- browse all 78 cards,
- Major/suit filters,
- canonical artwork,
- localized titles,
- keywords,
- meanings,
- symbolism,
- future reversed meaning.

Reuse the same canonical card data as the Reading Engine.

Do not create a second drifting card database.

Lazy loading preferred.

---

# 29. Lucky Numbers

Lucky Numbers is secondary symbolic/entertainment content.

Never promise:

- winning numbers,
- increased lottery odds,
- guaranteed money,
- “เลขแม่น” certainty.

It must not become the core product promise.

---

# 30. SFX

Premium subtle SFX are approved for later polish.

Desired character:

- mode selection → restrained warm/bronze micro-chime,
- card selection → tactile paper/wood/fabric,
- reveal → restrained bronze + air.

Avoid cheap game click/pop/bling.

SFX should remain less prominent than music.

---

# 31. Future Reading Modes

Remaining canonical reading experiences include:

## 31.1 The Golden Path

1. Where You Stand
2. What Blocks the Path
3. The Way Forward

## 31.2 Remove the Obstacle

1. The Obstacle
2. What Feeds It
3. What Releases It

Both must reuse the shared Reading Engine and professional master-reader language standard.

Multi-card readings must read relationships between cards, not independent definitions.

---

# 32. Roadmap

Broad current roadmap:

1. The Golden Path
2. Remove the Obstacle
3. Journal
4. Card Library
5. Support activation
6. Lucky Numbers
7. SFX/audio polish
8. evaluate reversals
9. wider production hardening / QA

Biu owns sequencing and may reorder when dependency, risk, product evidence, or user value justifies it.

Do not stack ambitious features onto a serious regression.

---

# 33. Accessibility

Minimum expectations:

- meaningful focus states,
- semantic buttons,
- keyboard-operable primary controls where applicable,
- ARIA labels for icon-only controls,
- readable contrast,
- touch-friendly sizing,
- reduced-motion support,
- no critical information conveyed only by color,
- sane modal focus/close behavior,
- hidden elements must not intercept input.

Historical invisible-overlay regressions are a permanent warning.

Localization includes accessibility copy.

---

# 34. Security & Privacy

Never commit:

- API secrets,
- private keys,
- access tokens,
- payment credentials,
- unnecessary personal identifiers.

Use safe DOM handling for profile/question/note text.

Do not inject unsanitized user input as HTML.

Do not add analytics, trackers, fingerprinting, or behavioral profiling merely because they are easy to add.

Current product is local-first.

---

# 35. Performance

Premium does not mean heavy.

Target common modern mid-range phones, not only flagship devices.

Prefer compositor-friendly animation:

- `transform`
- `opacity`

Avoid unnecessary expensive effects.

Do not eagerly load all archival 78 PNG card masters at initial app load without evidence.

---

# 36. QA Honesty

Never say “fully tested” unless evidence truly supports it.

Conceptual levels:

- **QA-S** — static/structural
- **QA-R** — runtime validation in a real environment
- **QA-X** — required cross-platform validation
- **QA-P** — deployed production verification

Automated PASS ≠ real-device PASS.

Android PASS ≠ iOS PASS.

A package may be “verified for upload” without being “production validated.”

---

# 37. Current Regression Baselines

Recent protected benchmark coverage has included:

- Ask Semantic: 1,404 reading cases
- Ask Context: 1,404 reading cases
- Three-Card Narrative: 1,456 bilingual samples
- Question Analyzer: 344+ cases
- semantic duplicate curated cases across Thai / English / cross-language
- Reading Engine
- deck ritual
- Daily persistence
- Three-Card daily persistence
- Quiet Countdown
- Ask storage
- Save/Share
- profile age/zodiac
- version coherence
- JS syntax
- package/checksum integrity

These historical passes are **not** proof after new changes.

Re-run relevant regression after modifying code.

---

# 38. Engineering Development Loop

Every meaningful runtime build follows:

**Read GitHub → Verify Baseline → Understand Requirement → Impact Analysis → Risk Classification → Design → Implement → Regression Audit → Validate → Package → Integrity Check → Release Notes → Push → Re-read GitHub → Real-Device Gate → Canonical Promotion**

Never reduce protected-system work to:

`edit → zip → send`.

---

# 39. GitHub-First Baseline Rule — MANDATORY

Before every runtime change:

1. read current GitHub `main`,
2. verify exact HEAD SHA,
3. verify runtime build,
4. inspect exact files/subsystems involved,
5. compare any local staging files against GitHub,
6. identify protected behavior,
7. classify risk,
8. prepare rollback for high-risk work.

Never assume the HEAD in this document is still current.

At document creation:

`e64cc446e4100a18076b98688a04645873b95622`

But future rooms must re-check.

---

# 40. Risk Classification

## LOW

Examples:

- docs-only update,
- typo/microcopy fix,
- isolated non-structural CSS polish.

## MEDIUM

Examples:

- new screen/component,
- reading presentation,
- localization behavior,
- non-destructive local state extension,
- Save/Share extension.

## HIGH

Examples:

- Service Worker/cache strategy,
- PWA manifest/installability,
- audio lifecycle,
- navigation/state architecture,
- IndexedDB migration,
- canonical card mapping,
- mass asset replacement,
- deep refactor,
- auth/payment backend,
- materially uncertain change.

High-risk work requires a restore plan before editing.

## 40.1 Serious regression rule

**Stop → stabilize/restore → diagnose → fix → test.**

Do not stack new features onto a serious regression.

---

# 41. Runtime Version / Build / Cache Coherence — HARD RELEASE BLOCKER

Current runtime:

**0.5.3**

Runtime build and governance version are separate.

Example:

- Master Plan V4.1
- Runtime V0.5.3
- Reading Engine 1.1.0

A docs-only update does not bump runtime.

A shipped runtime behavior change normally requires a runtime bump.

## 41.1 Live markers to audit when runtime changes

### `index.html`

- `meta[name="application-version"]`
- `<body data-build>`
- CSS cache-bust query strings
- JavaScript cache-bust query strings
- manifest query/reference
- visible build label if present

### JavaScript

- `window.LGT_BUILD` or equivalent
- any current runtime constants

### Service Worker

- `BUILD`
- cache names/IDs
- app-shell URLs
- cache-busted JS/CSS/manifest references

### Current release identity

- README current runtime
- current release notes
- current QA report
- current root patch manifest
- checksum files
- current governance runtime/status if being refreshed

### Other

Any new live build marker introduced later must join the audit.

## 41.2 Hard rule

> **One accidental mixed live build number = RELEASE FAIL.**

Do not waive because the app seems to work.

Historical changelogs do not need old version numbers rewritten.

---

# 42. Service Worker / Cache Discipline

Service Worker changes are high risk.

Before “fixing” source, distinguish:

- actual source regression
- stale deployed cache

When runtime changes, cache-busting and Service Worker build identity must move coherently.

After deployment:

1. verify repository HEAD,
2. verify source files on `main`,
3. allow deployment propagation,
4. hard-refresh / reopen installed PWA where appropriate,
5. confirm build identity,
6. run subsystem-specific real-device checks.

---

# 43. Package / Release Integrity

For runtime packages:

1. finish all edits,
2. finalize manifest,
3. generate checksum last,
4. do not self-hash the checksum file,
5. create ZIP,
6. re-extract ZIP,
7. run tests/checksum verification from the re-extracted archive.

Do not modify hashed files after checksum generation without regenerating checksums.

---

# 44. Repository Structure

Canonical high-level structure:

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
├── README.md
└── sw.js
```

Current root also includes:

- `CHECKSUMS_SHA256.txt`
- `PATCH_MANIFEST_V0_5_3.json`

Keep runtime root clean.

---

# 45. Root Patch Manifest Policy — CURRENT

Historical root Patch Manifests V0.3.6 through V0.5.2 were deliberately removed on 23 August 2026.

Current root keeps:

`PATCH_MANIFEST_V0_5_3.json`

Going forward:

new runtime release  
→ current root manifest advances  
→ superseded root manifest should be removed deliberately  
→ keep **one current root Patch Manifest**.

Historical provenance remains available in Git history and release documentation.

Do not recreate the historical manifest pile.

An overlay ZIP cannot delete tracked repository files by itself.

Deletion requires deliberate Git/GitHub Desktop workflow.

---

# 46. GitHub Desktop Workflow

P’Benz may use GitHub Desktop for manual repository operations.

When remote is newer:

`Fetch origin → Pull origin`

When local changes are ready:

`Review Changes → Summary → Commit to main → Push origin`

Commit summaries must be short and descriptive.

**Never exceed 50 characters for commit names.**

Recent examples:

- `Compact full deck UX V0.5.1`
- `Add reading discipline V0.5.2`
- `Fix background audio pause V0.5.3`
- `Clean old patch manifests`

Keep feature work and housekeeping separate when practical.

---

# 47. Current Runtime History Relevant to V4.1

## V0.5.0

Three-Card Reading became a real playable mode.

Shared Reading Engine advanced to full-deck/multi-card support.

## V0.5.1

Compact full-deck UX:

- 6×13 facedown layout,
- all 78 cards in one portrait stage,
- no horizontal deck pan,
- Three-Card dead-space fix.

Real-device accepted.

## V0.5.2

Reading discipline:

- Ask semantic duplicate lock,
- Three-Card one completed reading per local day,
- Quiet Countdown,
- local-midnight behavior,
- protected Daily discipline.

## V0.5.3

Audio lifecycle hotfix:

- immediate synchronous pause on background,
- resume only when previously playing,
- manual pause preserved,
- pagehide/pageshow and freeze/resume fallbacks.

Real-device accepted.

## Cleanup commit

Current HEAD:

`e64cc446e4100a18076b98688a04645873b95622`

`Clean old patch manifests`

Cleanup did not change runtime.

---

# 48. Current Stable Product State

Current stable runtime:

**V0.5.3**

Current working primary modes:

- Daily Guidance
- Ask Ganesha
- Three-Card Reading

Accepted/protected:

- Home
- Profile age/zodiac
- full 78-card compact ritual
- Daily persistence
- Ask semantic reading
- Ask duplicate discipline
- Three-Card narrative
- Three-Card daily lock
- Quiet Countdown
- Save/Share
- background audio lifecycle

P’Benz’s final real-device assessment before this documentation refresh:

The current experience is working together beautifully.

---

# 49. “Do Not” List

Do not:

- ask P’Benz to reconstruct prior project decisions,
- use stale ZIPs as code truth,
- modify runtime without GitHub-first verification,
- rebuild stable systems for architectural fashion,
- literal-translate Thai/English,
- write generic tarot dictionary prose,
- allow semantic-question reroll gaming,
- randomize after tap,
- allow duplicate cards within a spread,
- promise deterministic tarot outcomes,
- hardcode all resets to Thailand time,
- auto-resume after manual audio pause,
- restore fade-before-pause background audio,
- reintroduce full-deck horizontal swiping,
- reintroduce Three-Card dead space,
- let root Patch Manifests accumulate,
- claim device QA that did not happen,
- leave runtime markers mixed,
- forget Service Worker/cache markers,
- ship unchecked archives,
- add unnecessary backend/auth/payment infrastructure,
- add tracking casually,
- over-polish already accepted systems.

---

# 50. Immediate Next-Room Rule

When this Master Plan is loaded in a new room:

1. treat this as continuity, not a new project,
2. do not ask P’Benz to explain the app again,
3. treat V0.5.3 as the current stable baseline **until GitHub proves otherwise**,
4. read current GitHub `main` before runtime work,
5. verify the current HEAD and runtime markers,
6. inspect the subsystem being changed,
7. identify protected behavior and risk,
8. proceed in Zero-Question Full Authorized Dev mode.

---

# 51. Final Canonical Snapshot at V4.1 Creation

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Master Plan:** V4.1  
**Runtime:** V0.5.3  
**GitHub HEAD:** `e64cc446e4100a18076b98688a04645873b95622`  
**HEAD message:** `Clean old patch manifests`  
**Runtime commit:** `bee251a009f2b310593a453bbc99971588db1468`  
**Runtime commit message:** `Fix background audio pause V0.5.3`  
**Reading Engine:** 1.1.0 unless current source later proves otherwise  
**Playable modes:** Daily Guidance / Ask Ganesha / Three-Card Reading  
**Current root Patch Manifest:** `PATCH_MANIFEST_V0_5_3.json`  
**Historical root Patch Manifest pile:** deliberately removed  
**Default complexity:** easy–medium  
**Language standard:** native-quality TH/EN  
**Tarot voice:** highly experienced professional reader, clear and practical  
**Business model:** Open Access + Voluntary Support  
**Current app state:** accepted as stable and working beautifully on the tested device  

---

**END — MASTER PLAN V4.1**

# LITTLE GANESHA TAROT — MASTER PLAN & ZERO-QUESTION DEVELOPMENT HANDOFF V5.0

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio / Publisher:** Benedict Interactive  
**Founder / Repository Owner:** P’Benz  
**Product & Development Lead:** Biu  
**Canonical repository:** `grolygori789-crypto/little-ganesha-tarot`  
**Default branch:** `main`  
**Document version:** V5.0  
**Document date:** 24 August 2026  
**Document type:** Master Plan + Product Specification + Engineering Governance + Pre-Launch Operational Handoff  
**Runtime represented by this document:** V0.15.1  
**Verified runtime GitHub HEAD before this docs-only handoff:** `51a140586e665dbc8ca7ae633de6a0573b2908dc` — `Polish Studio Contact V0.15.1`  
**Companion migration prompt:** `docs/governance/ROOM_MIGRATION_PROMPT_V5_0.md`  
**Current release phase:** PRE-LAUNCH / MARKET-READINESS CANDIDATE  
**Current legal text version:** 1.0.0  
**Reading Engine:** 1.1.0  
**Deck Ritual:** 1.1.0

> **Critical:** V5.0 is a documentation/governance refresh only. Uploading this handoff does **not** require a runtime bump. Runtime remains V0.15.1 unless application behavior changes in a later release.

---

# 0. Executive Snapshot — Read This First

Little Ganesha Tarot has moved far beyond the V4.1 handoff. The core product is now essentially feature-complete for the intended first public release.

The Founder has just completed a partial real-device smoke pass and reports that many parts of the current app are working extremely well. A **comprehensive end-to-end user acceptance test across every mode and function has not yet been completed**, so no future room may claim final market readiness until that full pass is actually performed and documented.

At the time of this handoff, the two primary product-completion tasks are:

1. **Activate the planned worldwide Buy Me a Coffee support destination** after P’Benz supplies and verifies the official public destination/account information.
2. **Perform a full-system, real-user-style QA campaign** covering every mode, every important state transition, all three languages, persistence, Save/Share, PWA/update behavior, privacy/legal/support flows, error paths, and cross-feature regressions.

There are also two operational watch items that must not be forgotten:

- **Repository housekeeping:** obsolete root `PATCH_MANIFEST` files from V0.9.0 through V0.15.0 are still present on current GitHub `main`; V0.15.1’s manifest already instructs that they should be removed so only the current runtime root manifest remains.
- **Lucky Numbers haptic watch item:** a prior investigation found haptic behavior coupled to the global audio-enabled state. This was not changed by V0.15.0 or V0.15.1. It is not automatically declared a current release blocker, but final QA must explicitly test normal reveal vs Replay with sound ON and OFF and decide from observed behavior.

If Buy Me a Coffee is activated, full QA passes without unresolved release-blocking defects, repository housekeeping is clean, and runtime/version integrity is coherent, the product is eligible for first public stable promotion. **V1.0.0 is reserved for that market-ready promotion; do not bump to V1.0.0 before the final release gate passes.**

---

# 1. Canonical Authority and Zero-Question Governance

## 1.1 Source-of-truth order

When sources conflict, use this order:

1. **Newest explicit accepted decision by P’Benz in the current room.**
2. **This Master Plan V5.0.**
3. Current specialized standards under `docs/governance/` when they do not conflict with V5.0.
4. Approved canonical production assets.
5. Current verified GitHub `main` for actual implementation state.
6. Older Master Plans, migration prompts, release packages, ZIPs, experiments, rejected builds, and historical notes.

V5.0 supersedes V4.1, V4.0, V3.7, and earlier handoff documents wherever they conflict.

## 1.2 Founder / development authority

**P’Benz** is Founder / Vision Originator / Repository Owner.

**Biu** is the **Full Authorized Product & Development Lead** with delegated authority over:

- product scope and sequencing;
- UX/UI and interaction design;
- visual-system decisions;
- software architecture and code structure;
- Reading Engine behavior and integrity;
- state/storage strategy;
- local persistence;
- mobile/PWA behavior;
- accessibility;
- performance;
- privacy/security implementation;
- localization architecture and native-language quality;
- audio, motion, SFX and haptic design;
- QA strategy and release gates;
- runtime version/build numbering;
- refactoring and rollback;
- approving, modifying, simplifying, deferring, replacing, or rejecting product proposals when required to protect the product.

Account ownership, legal identity, banking/payment accounts, credentials, tax matters, contracts, provider signup, provider payout verification, and external account authorizations remain Founder-controlled.

## 1.3 Zero-question principle

A future room must not make P’Benz reconstruct the project.

Before asking a question:

1. Read this V5.0 Master Plan.
2. Read `ROOM_MIGRATION_PROMPT_V5_0.md`.
3. Verify current GitHub `main`.
4. Read the exact subsystem files and relevant governance standard.
5. Check current release notes / QA / patch manifest.
6. Check approved assets and existing behavior.
7. Ask only when the information is genuinely unavailable or requires Founder-only external authorization.

For Buy Me a Coffee, the **official destination URL/account value is Founder-only input** if it is not already present. Do not invent one.

## 1.4 GitHub-first is mandatory

Before runtime work:

- verify current HEAD;
- verify runtime build markers;
- inspect exact files;
- identify protected behavior;
- classify functional and operational risk;
- identify rollback commit;
- reject stale local ZIPs as source of truth when GitHub differs.

The HEAD recorded in this document is a snapshot, not permission to assume GitHub has not advanced.

## 1.5 Protected stable behavior

A subsystem that has been deployed and accepted on a real device, or otherwise verified as stable, becomes protected territory.

Do not rewrite accepted systems just because a different implementation looks cleaner.

Regression prevention has priority over novelty.

## 1.6 Golden product rule

> A working, understandable, maintainable Little Ganesha Tarot is more valuable than a theoretically more ambitious Little Ganesha Tarot that becomes fragile.

Prefer a 9–9.5/10 user experience at complexity 4/10 over a theoretical 10/10 solution at complexity 9/10.

---

# 2. Current Market-Readiness State

## 2.1 What is already implemented

Current runtime V0.15.1 contains:

- Studio Splash / title / onboarding / optional profile;
- Home dashboard;
- Reading Hub;
- Daily Guidance;
- Ask Ganesha;
- Three-Card Reading;
- The Golden Path;
- Remove the Obstacle;
- Signature Focus system;
- Lucky Numbers;
- Tarot Library;
- Journal / My Path;
- Save/Share for retainable results;
- English, Thai and Hindi product coverage;
- global audio system;
- mobile/PWA installation foundation;
- PromptPay voluntary support;
- Legal Center + one-time Terms acknowledgement;
- Help & Feedback / Report a Problem;
- studio contact presentation;
- public support email;
- current approved app icon and PWA assets.

## 2.2 Current Founder acceptance

P’Benz has just reported that many current areas work **“ยอดเยี่ยมมาก”** in real-device use.

This is valuable acceptance evidence but is **not the same as a full-system QA pass**.

The final pre-market campaign must deliberately walk every important path rather than relying on normal exploratory use.

## 2.3 Remaining product work before public-release decision

Primary:

- configure and activate official **Buy Me a Coffee** worldwide support link;
- full user-style end-to-end QA.

Operational before final release:

- remove obsolete root Patch Manifests and keep one current runtime manifest;
- verify current checksums/release metadata after any final runtime change;
- explicitly test Lucky haptic behavior;
- verify installed-PWA update from previous build to final candidate;
- review repository/source exposure before a major public/commercial launch;
- do not claim iOS real-device PASS unless it actually occurs.

## 2.4 V1.0.0 promotion rule

`V1.0.0` is reserved for the first market-ready public stable release.

Do not promote merely because features appear complete.

Promotion requires:

- no P0/P1 release blockers;
- all protected reading contracts intact;
- BMC destination active or intentionally deferred by explicit Founder decision;
- complete runtime coherence;
- final package integrity;
- real-device acceptance appropriate to the target launch;
- known limitations documented honestly.

---

# 3. Product Identity, Brand and Business Model

## 3.1 Product

**Little Ganesha Tarot**  
Subtitle: **The Golden Path**

Canonical brand masthead:

`LITTLE GANESHA TAROT / THE GOLDEN PATH`

Do not localize the core brand masthead.

## 3.2 Studio

**Benedict Interactive**

Public contact identity currently used in Help & Feedback:

- Benedict Interactive
- Bangkok, Thailand
- `benedict.support@gmail.com`

Gmail display identity: **Benedict Interactive Support**.

`Bangkok, Thailand` is a coarse studio location only.

Do not represent it as:

- registered office;
- legal service address;
- incorporated-company address;
- verified corporate registration location;

unless that status is separately verified and explicitly approved.

No street-level address is currently required by the product standard.

## 3.3 Product positioning

A premium, sacred-friendly, visually rich, RWS-inspired 78-card tarot experience centered on one identity-locked Little Ganesha protagonist.

It should feel:

- premium;
- calm;
- intimate;
- professionally authored;
- visually distinctive;
- reflective;
- modern but reverent;
- mobile-first;
- local-first and privacy-conscious.

It must not feel like:

- a cheap fortune generator;
- a slot machine;
- a casino;
- a generic AI demo;
- a machine-translated website;
- a children’s cartoon app;
- an aggressive spiritual sales funnel.

## 3.4 Business model — locked for current release

**Open Access + Voluntary Support**

No current:

- login wall;
- subscription;
- paywall;
- entitlement system;
- premium tarot-quality tier;
- payment-gated reading;
- support-linked probability advantage.

Support must never influence:

- card choice;
- number choice;
- reading depth;
- spiritual status;
- “luck”;
- feature fairness;
- daily limits.

Current support channels:

- Thailand: **PromptPay — active**
- Worldwide: **Buy Me a Coffee — planned, currently inactive until official destination is supplied and verified**

Do not substitute another international provider without a current explicit decision.

---

# 4. Complexity and Failure-Isolation Constitution

Prefer, in order:

1. native browser/platform capability;
2. small isolated client-side module;
3. existing shared subsystem;
4. narrow managed external integration;
5. custom infrastructure only when clearly justified.

Avoid by default:

- custom backend;
- custom auth;
- custom billing;
- account state machines;
- broad framework migration;
- unnecessary cloud dependency;
- deep refactors for isolated features;
- payment/provider coupling to tarot logic.

Optional systems must fail independently:

- BMC unavailable → tarot works;
- PromptPay unavailable → tarot works;
- mail client unavailable → copy fallback remains;
- Share unavailable → Save fallback remains;
- audio unavailable → readings work;
- fullscreen unavailable → app remains usable;
- network unavailable after successful PWA install → supported offline shell remains usable.

---

# 5. Canonical Tarot Deck and Asset Integrity

## 5.1 Exactly 78 cards

- 22 Major Arcana
- 56 Minor Arcana

RWS numbering:

- Strength = VIII
- Justice = XI

Suit order:

1. Wands
2. Cups
3. Swords
4. Pentacles

Rank order:

Ace → Two → Three → Four → Five → Six → Seven → Eight → Nine → Ten → Page → Knight → Queen → King

Use **Page**, never “Age”.

## 5.2 Symbol-count integrity

For numbered Minor Arcana, visible suit-symbol counts must match card identity when semantically relevant.

Wrong wand/cup/sword/pentacle count is a production failure.

Historical production corrections that permanently supersede earlier versions include:

- Wands: Eight corrected to exactly 8; Ten corrected to exactly 10;
- Cups: Six corrected to exactly 6; Ten corrected to exactly 10;
- Swords: Seven corrected to exactly 7; Eight corrected to exactly 8; Nine finalized at exactly 9;
- Pentacles: Six corrected to exactly 6; Seven corrected to exactly 7; Nine corrected to exactly 9; Ten remade with exactly 10 coins and canonical Little Ganesha identity;
- corrected canonical cards also include 39 FOUR OF CUPS, 40 FIVE OF CUPS, 70 SEVEN OF PENTACLES, 71 EIGHT OF PENTACLES, 72 NINE OF PENTACLES.

The deck production milestone is complete: **78 images / one complete deck**.

## 5.3 Visual master

**THE FOOL** remains the absolute frame/visual master reference.

Little Ganesha must remain one continuous protagonist across all cards.

Preserve:

- face;
- trunk;
- ears;
- child-like age impression;
- head/body relationship;
- skin-color family;
- crown;
- jewelry;
- sacred-cute premium visual language.

Identity drift is a hard failure.

## 5.4 Canonical card masters

Master format:

- 941 × 1672 px
- PNG
- standalone card
- no sheet remnants
- no accidental crop

Optimized runtime derivatives may exist, but archival PNG truth must not be overwritten.

Canonical paths include:

- `assets/ui/card-back.png`
- `assets/ui/title-hero.png`

## 5.5 App icon

Current universal app icon is accepted and must not be casually replaced.

---

# 6. Global Localization Standard — EN / TH / HI

Current product languages are locked to:

- English
- Thai
- Hindi

Do not add a fourth language before a future explicit product/market decision.

## 6.1 Native-language rule

Every supported language must feel originally authored in that language.

Never ship:

- literal translation;
- machine-translation tone;
- imported English syntax in Thai/Hindi;
- generic AI wording;
- half-localized screens;
- untranslated controls except deliberate brand/proper names.

## 6.2 English

Natural, premium, concise native English.

Avoid:

- textbook tone;
- synthetic mystical clichés;
- verbose card-dictionary copy;
- fake certainty.

## 6.3 Thai

Thai must sound originally written by a skilled native Thai tarot reader.

Avoid:

- literal English sentence order;
- stiff formal translation;
- vague spiritual filler.

## 6.4 Hindi

Target: modern Indian Hindi (`hi-IN`).

Use respectful `आप`.

Natural borrowed product/tarot terms are allowed when more idiomatic, including forms such as:

- कार्ड
- रीडिंग
- फोकस
- प्रोफ़ाइल
- ऐप
- डेक
- सूट
- रिवर्सल
- स्प्रेड

Do not force overly Sanskritized alternatives.

Canonical brand masthead remains English.

Within Hindi prose, **Little Ganesha** may remain in Latin script as the proper brand name.

Typography:

- UI: `Noto Sans Devanagari`
- editorial reading copy: `Noto Serif Devanagari`

Provide enough line height for Devanagari.

## 6.5 Language parity gate

A supported language is not complete unless a user can move through:

- title;
- onboarding;
- Home;
- Reading Hub;
- every reading mode;
- same-day restore;
- Focus status;
- countdown;
- Save/Share;
- Lucky Numbers;
- Tarot Library;
- Journal;
- PromptPay;
- Legal;
- Help & Feedback;
- Settings;

without accidental English fallback except deliberate brand/canonical labels.

---

# 7. Professional Tarot Reader Language Standard

Every interpretation should feel like a consultation with a highly experienced professional tarot reader.

Target impression:

> “A skilled reader is reading my situation, not reciting a card dictionary.”

Preferred flow:

context / situation  
→ exact card in that context  
→ why it matters  
→ likely direction  
→ caution or tension  
→ practical guidance  
→ concise reflection where useful.

Avoid:

- dictionary meanings;
- generic templates;
- generic horoscope prose;
- “energy is shifting” filler when something more concrete can be said;
- fear-based certainty;
- forced positivity;
- deterministic future claims;
- impressive-sounding but unclear poetry.

Contradictory cards are meaningful tension.

Do not flatten contradictions into fake harmony.

---

# 8. Reading Safety and Epistemic Boundaries

Tarot is reflective/symbolic, not a verified supernatural measurement system.

## 8.1 Money

No:

- guaranteed returns;
- stock/crypto price targets;
- investment instructions derived from tarot;
- certainty about winning money.

## 8.2 Well-being

No:

- diagnosis;
- treatment claim;
- guaranteed recovery;
- pregnancy outcome prediction;
- medical certainty.

## 8.3 Legal

No verdict guarantees or deterministic case outcomes.

## 8.4 Gambling

No:

- lottery prediction;
- betting advice;
- odds;
- jackpots;
- “winning number” claims.

Lucky Numbers remains symbolic.

## 8.5 Death / severe harm

No death timing.

Immediate safety/crisis content must not be converted into a tarot prediction.

## 8.6 Spiritual claims

Do not claim that deities, spirits, curses, or unseen forces were objectively verified by the app.

---

# 9. Shared Reading Engine — PROTECTED

Current version: **1.1.0**

All tarot modes reuse one canonical engine.

Core requirements:

- 78 stable card IDs;
- correct image mapping;
- full-deck shuffle before display;
- cryptographically strong browser randomness where supported;
- no duplicate card in one spread;
- upright-first;
- reversal-ready architecture;
- local-first persistence;
- stable IDs compatible with Journal.

## 9.1 Pre-binding rule

Each facedown position is bound to a real shuffled card **before user selection**.

Correct:

shuffle full deck  
→ bind facedown positions  
→ user taps position  
→ exact pre-bound card is selected.

Never:

tap  
→ randomize afterward.

Never reassign a selected position.

## 9.2 Reversals

Current runtime is upright-first.

Architecture may remain reversal-ready.

Do not activate reversals simply because the code can support them.

---

# 10. Deck Ritual — PROTECTED

Current Deck Ritual version: **1.1.0**

Accepted mobile layout:

**6 rows × 13 cards = 78 facedown cards**

Rules:

- all 78 present;
- portrait-friendly;
- no horizontal full-deck swipe;
- approved card back;
- premium physical-deck impression;
- touch and keyboard/focus accessibility where applicable.

The rejected 3×26 horizontal-pan design must not return.

## 10.1 Three-card dead-space rule

After 3/3 cards are selected:

- collapse/remove the deck stage from layout;
- do not hide only its children while leaving height;
- Reveal/status remains close;
- no giant blank area.

This was real-device accepted and is protected.

---

# 11. Daily Guidance

Contract:

- full 78-card pool;
- one completed reading per device-local calendar day;
- same local day restores exact same card;
- next local day becomes eligible;
- no rolling 24-hour reset;
- EN/TH/HI;
- Save;
- Share.

Daily content includes:

- Keywords
- Core Meaning
- Reflection
- six lenses

Canonical lenses:

1. Work & Goals
2. Money & Resources
3. Love & Relationships
4. Inner State & Balance
5. Opportunities & Watch-outs
6. Guidance for Today

A content/runtime upgrade during the same day must preserve the already-selected card rather than manufacture a reroll.

---

# 12. Ask Ganesha

Ask Ganesha is contextual, not a generic one-card screen.

Pipeline:

user question  
→ semantic analysis  
→ Question Contract/context  
→ pre-shuffled card selection  
→ card interpreted under the actual question  
→ direct reflective answer.

Core contract:

> The question determines the subject that must be answered. The card determines what can meaningfully be said about that subject.

Thai canonical expression:

> คำถามกำหนดเรื่องที่ต้องตอบ ไพ่กำหนดสิ่งที่จะพูดเกี่ยวกับเรื่องนั้น ไพ่ไม่มีสิทธิ์พาคำตอบออกนอกคำถาม

The card may shape the answer but may not drag it into an unrelated topic.

## 12.1 Same-day semantic lock

Within the same device-local day:

- exact same question;
- meaningful paraphrase;
- semantically equivalent question;
- equivalent meaning across EN/TH/HI;

must restore the same reading family.

Preserve:

- same card;
- same direction;
- same conclusion.

Different genuine questions remain allowed.

Named-person relationship questions must not collapse different people into one semantic family.

Avoid:

- false negatives enabling reroll gaming;
- false positives merging different questions.

## 12.2 Ask privacy

Exact question text is not automatically exposed in shared artwork.

Journal storage of exact Ask wording is a separate opt-in and is OFF by default.

## 12.3 Countdown

Ask countdown applies only to the same locked semantic family, not one global Ask timer.

---

# 13. Signature Focus System

The shared Focus system contains six canonical topics:

1. **General Life** / ภาพรวมชีวิต
2. **Love & Relationships** / ความรักและความสัมพันธ์
3. **Career & Work** / การงานและอาชีพ
4. **Money & Resources** / การเงินและทรัพยากร
5. **Well-being & Balance** / สุขภาวะและสมดุลชีวิต
6. **Personal Growth** / การเติบโตภายใน

Focus is selected before shuffle.

Focus changes **interpretation context**, never probability.

Core rule:

**1 Focus = 1 completed reading per device-local day**

Different Focuses may be read on the same day.

Same Focus on the same day restores the existing completed reading.

Incomplete entry does not consume the Focus.

Read-today state may use subtle gold check/tint; it should not feel disabled.

Canonical Thai guidance:

> คนละเรื่อง ดูได้ในวันเดียวกัน — เรื่องเดิม ได้คำตอบเดิมจนถึงวันใหม่

---

# 14. Three-Card Reading

Identity:

**How is my story unfolding?**

Positions:

1. Past
2. Present
3. What May Unfold Next

Thai:

1. อดีต
2. ปัจจุบัน
3. แนวโน้มต่อจากนี้

Three cards must be read as one narrative.

Never output three disconnected mini-dictionaries.

Focus selector is active.

Per-Focus daily contract:

- selection before shuffle;
- incomplete session does not consume;
- completed same Focus same day restores exact spread/narrative;
- next local day becomes eligible;
- Save/Share;
- countdown after completion/restore.

Three-card viewer V0.5.4 was real-device accepted and is protected.

---

# 15. The Golden Path

Signature spread identity:

> “From where I stand, where should I move?”

Positions:

1. Where You Stand
2. What Blocks the Path
3. The Way Forward

Uses the six-Focus system.

Per-Focus daily lock applies.

The three cards must form one coherent consultation.

“The Way Forward” is practical direction, not a guaranteed fate.

V0.6.2 Golden Path behavior was real-device accepted and must not be casually rewritten.

---

# 16. Remove the Obstacle

Positions:

1. The Obstacle
2. What Feeds It
3. What Releases It

Uses the six-Focus system.

Per-Focus daily lock applies.

Narrative must explain:

- what the actual obstacle is;
- what maintains/reinforces it;
- what can help loosen/release it.

Do not turn “What Releases It” into magical certainty.

This mode is implemented and part of the current core reading suite.

---

# 17. Quiet Countdown

Daily / Signature Focus modes may show calm time until next local-day eligibility.

Granularity:

- >=1 hour → hours + minutes
- <1 hour → minutes
- final minute → seconds acceptable

Avoid arcade/gacha urgency.

Ask uses per-semantic-family countdown.

Lucky Numbers uses daily restore/countdown behavior appropriate to its daily result.

---

# 18. Save + Share — PROTECTED

Every retainable result should offer:

- Save
- Share

Exports are curated reading artifacts, not raw screenshots.

Native Share where supported.

Save fallback if file sharing is unavailable.

Ask exact question hidden by default.

Sharing must never reroll or mutate result state.

Journal storage is separate from Save/Share.

---

# 19. Lucky Numbers — Product Standard V1.1

Lucky Numbers is a premium daily symbolic kinetic oracle, not gambling.

## 19.1 Number contract

Candidate pool:

`0..9`

Daily output:

- exactly 3 unique digits;
- ordered roles:
  1. Core Number
  2. Supporting Number
  3. Balancing Number

Selection probability is unaffected by:

- profile;
- language;
- tarot history;
- support/payment;
- any other product state.

Once fixed for the local day:

- never reroll until next local day;
- interrupted animation keeps the fixed set;
- Replay is presentation only;
- Replay never rerolls.

Storage key:

`lgt.lucky.v1`

## 19.2 Zero contract

0 is a real symbolic digit, not null.

Its meaning centers on:

- potential;
- space;
- reset;
- openness;
- room for what comes next.

Machine contains ten visible orbs 0–9.

## 19.3 Today’s Number Set

From the exact stored digits, derive:

- three singles;
- Core→Supporting pair;
- Supporting→Balancing pair;
- one three-digit role-order form.

If role-order form begins with zero, rotate cyclically to first non-zero digit.

Do not display pseudo-number `029`.

Deduplicate forms.

## 19.4 Gambling boundary

Never label the feature as:

- lottery;
- betting;
- jackpot;
- odds;
- payout;
- winning number;
- financial advice.

## 19.5 Numeral typography

Digit `1` must never look like uppercase `I`.

Use dedicated lining-numeral serif treatment for:

- machine;
- result orbs;
- number-set chips;
- exports.

## 19.6 Motion / SFX / haptics

Motion: premium, weighty, brass/glass/crystal.

Avoid arcade bounce, casino neon, slot reels, payout animation.

Haptics are optional and fail silently on unsupported devices.

### Historical haptic QA watch item

A prior source investigation found that current `LuckySFX` vibration calls are gated by the global audio-enabled path in some methods. A user observation previously reported missing vibration on Replay.

No dedicated haptic decoupling release has shipped as of V0.15.1.

Final QA must test:

- first reveal, sound ON;
- Replay, sound ON;
- first reveal, sound OFF;
- Replay, sound OFF;
- unsupported-vibration graceful no-op.

Do not “fix” it speculatively until current behavior is reproduced and the desired contract is confirmed.

---

# 20. Tarot Library

Introduced V0.10.0.

Purpose: premium editorial deck/learning archive, not SEO FAQ or separate app.

Canonical rooms:

1. Explore the 78 Cards
2. Learn Tarot
3. Ways to Read
4. Little Ganesha Spreads
5. Tarot Essentials

About/app-operation guidance belongs in Settings → About & Guide.

## 20.1 Canonical card data

Library must read canonical identity/art from `window.LGTReadingContent`.

No independent 78-card mapping that can drift.

Library interaction must never alter:

- shuffle;
- probability;
- locks;
- Ask semantics;
- Focus state;
- saved readings.

## 20.2 History integrity

Historical framing distinguishes documentary history from later esoteric claims.

Established V1 framing:

- tarot appears in fifteenth-century Italian court/card-game history;
- originally trick-taking/game context;
- later divinatory/occult systems develop afterward;
- late-eighteenth-century French cartomancy/Etteilla are later;
- ancient Egyptian origin claims are later claims, not established fact;
- nineteenth-century occult associations develop further.

## 20.3 Search keyboard fix — V0.15.0

The original search rebuilt the whole deck view on every `input`, destroying the focused input node on mobile and causing software-keyboard collapse / IME disruption.

V0.15.0 changed the contract:

- Search input remains mounted during typing;
- input node is not replaced per keystroke;
- only result count/grid/empty state/filter presentation updates;
- keyboard should remain open until user dismisses or navigates away;
- EN/TH/Hindi IME composition must not be interrupted.

This fix is protected in V0.15.1.

Final QA must test:

- English continuous typing;
- Thai composition;
- Hindi/Devanagari composition;
- Backspace;
- Paste;
- native search clear;
- filter while query exists;
- open card and back;
- no horizontal scroll;
- 78-card browsing.

---

# 21. Journal / My Path

Introduced V0.11.0; numeral polish V0.11.1.

Journal is the private continuity layer, not an analytics dashboard.

Storage:

IndexedDB database `little-ganesha-journal`

No:

- login;
- remote account;
- cloud sync;
- server Journal storage.

## 21.1 Capture

Only completed/displayed readings are eligible.

Deterministic source identities:

- Daily: local date;
- Ask: local date + Ask reading identity;
- Three/Golden/Obstacle: local date + Focus;
- Lucky: local date.

Automatic capture has a dedicated setting.

Exact Ask question storage is separate and OFF by default.

## 21.2 Historical snapshot integrity

Saved reading wording is a historical snapshot.

Future content edits must not silently rewrite old Journal text.

A second locale snapshot may be added under the same identity.

## 21.3 User reflection

Entry can contain:

- mode;
- date/time;
- Focus;
- card IDs/numbers;
- localized reading snapshot;
- optional exact Ask wording if permitted;
- reflection;
- bookmark.

Reflection never affects tarot selection.

## 21.4 Deletion

Deletion is privacy control, not reroll.

- single deletion;
- multi-select deletion;
- clear all with two confirmation stages;
- deletion must not erase source reading locks;
- tombstone/suppression prevents automatic re-capture of deliberately deleted same source identity.

Deleting Journal must never reset:

- Daily;
- Ask;
- Focus locks;
- Lucky set.

## 21.5 Surfaces

- Timeline default;
- Calendar month view;
- search/filter;
- bookmarks;
- factual Patterns;
- Monthly Reflection.

Patterns are descriptive, never “the universe is sending you…” claims.

Numeric counters use clear lining numerals.

---

# 22. Reading Hub

Introduced V0.12.0.

Reading Hub is a premium chooser for existing readings, **not a sixth tarot spread**.

Product roles:

- Home = whole-app dashboard
- Read = reading chooser
- Library = learn/explore
- Journal = archive
- Settings = management

Intent map:

1. Quick reflection → Daily
2. One clear question → Ask
3. See how a situation is unfolding → Three-Card
4. Need direction → Golden Path
5. Something feels stuck → Remove the Obstacle

Intent recommendations:

- user-selected;
- reversible;
- never auto-draw;
- never alter probability;
- never infer hidden mental states;
- never write protected reading state.

Read-only status may reflect existing stores.

---

# 23. Home / Shell / Navigation / Profile

Canonical visual direction:

**Premium Minimal Sacred UI**

Home accepted direction traces to V0.3.6 and is protected.

Opening flow, first use:

Studio Splash  
→ Title  
→ Tap to Begin  
→ Legal acknowledgement if required  
→ Optional Profile  
→ Home

Returning use after accepted terms/onboarding:

Studio Splash  
→ Title  
→ Tap to Begin  
→ Home

## 23.1 Profile

Optional:

- Display Name
- Date of Birth

Rules:

- local only;
- editable;
- clearable;
- no account;
- no birth place/time by default.

Home profile age/zodiac presentation is accepted stable behavior.

## 23.2 Fullscreen

Tap to Begin must not force browser fullscreen.

Browser Full Screen is explicit Settings behavior.

Installed PWA uses standalone mode.

---

# 24. Audio Lifecycle — PROTECTED

The V0.5.3 background lifecycle is protected.

When app is hidden/backgrounded/minimized/screen-locked:

**pause active audio immediately/synchronously.**

Do not delay actual pause behind animation/fade.

On foreground return:

resume only if music was playing before system hide.

If user manually paused:

remain paused after foreground return.

Lifecycle coverage includes, where supported:

- `visibilitychange`
- `pagehide`
- `pageshow`
- `freeze`
- `resume`

This passed real-device testing and must not regress.

---

# 25. Motion / Accessibility

Global Motion modes include:

- System
- Full
- Reduced

Reduced Motion must preserve:

- information;
- selection integrity;
- result identity;
- navigation;
- Save/Share;
- accessibility.

It may remove nonessential animation only.

Accessibility rules:

- touch targets usable on small mobile screens;
- keyboard/focus support where web platform permits;
- visible focus states;
- modal semantics;
- no hover-only essential content;
- safe-area support;
- no accidental horizontal scroll;
- text readable at mobile sizes;
- numerals unmistakable.

Final QA must include at least a reduced-motion pass.

---

# 26. PWA / Offline / Cache / Update Discipline

The app is a PWA/mobile-first web application.

Service Worker is operationally high risk.

Current runtime build: **0.15.1**

All live runtime markers must move coherently on a runtime release:

- `meta[name="application-version"]`
- `body[data-build]`
- CSS query strings
- JS query strings
- manifest query
- manifest icon URLs
- `window.LGT_BUILD`
- visible build label
- SW `BUILD`
- shell/runtime cache IDs
- SW app-shell URLs
- README runtime
- release notes
- QA doc
- current root Patch Manifest
- checksums
- any later live marker

One mixed live version is release failure.

## 26.1 Docs-only rule

Docs-only governance changes do not bump runtime.

Therefore this V5.0 handoff should leave runtime V0.15.1.

## 26.2 Installed update QA

Before market release, test:

- existing installed PWA on prior build;
- deploy final candidate;
- reopen/update;
- verify new build label;
- verify no stale old UI;
- verify reading locks/data remain;
- verify caches replace old build safely;
- verify offline shell after successful update.

---

# 27. PromptPay Support — Active Thailand Route

Introduced V0.13.0.

Support is optional and isolated from tarot.

PromptPay rules:

- no preset amount;
- QR remains black on true white;
- preserve quiet zone;
- no recolor/distortion/effects;
- production asset is cleaned QR crop, not full bank screenshot;
- do not show identification number from source screenshot;
- recipient names remain:
  - `จักรพันธ์ เบญจศุภนิมิต`
  - `Jakraphan Benjasupanimit`
- ask user to verify recipient name in banking app;
- Save QR action available;
- no payment callback;
- app must not claim payment received;
- no payment history;
- no payment-driven feature access.

PromptPay UI is EN/TH/HI.

---

# 28. Buy Me a Coffee — Final Pending Worldwide Support Item

Current status:

**PLANNED / INACTIVE**

Current UI may show Worldwide / Coming soon.

Do not enable until:

1. P’Benz creates/configures the intended Buy Me a Coffee destination;
2. official public URL is supplied;
3. destination is verified to belong to the intended Benedict Interactive/Little Ganesha support account;
4. current provider suitability/terms are checked if material;
5. link behavior is tested on mobile browser/PWA;
6. no entitlement/payment state is introduced.

## 28.1 Intended implementation

Prefer an external user-initiated link.

No:

- custom card collection;
- payment backend;
- donor account in Little Ganesha;
- payment status callback for V1;
- reading unlock;
- payment analytics dependency.

BMC failure must not affect PromptPay or tarot.

## 28.2 Founder-only information

If official destination is missing, that is one of the few valid reasons to ask P’Benz.

Never guess a URL.

## 28.3 Localization

Keep EN/TH/HI copy native and concise.

Worldwide support should feel optional and appreciative, not coercive.

---

# 29. Help & Feedback — Production Support Infrastructure

Introduced V0.15.0.

Contact polish V0.15.1.

Official email:

`benedict.support@gmail.com`

Settings placement:

`Settings → Help & Feedback`

Actions:

1. Report a Problem
2. Send Feedback
3. Copy Diagnostic Info

The group appears before Support the Project.

## 29.1 Report a Problem

User writes a short description.

Technical diagnostics:

- ON by default;
- visibly previewed;
- user may disable.

App opens device email workflow using `mailto:`.

Nothing is sent in the background.

## 29.2 Send Feedback

General product feedback / ideas.

Technical diagnostics:

- OFF by default;
- user may opt in.

## 29.3 Diagnostic scope

Allowed:

- app/build version;
- language;
- coarse OS/platform;
- browser family + major version;
- Browser vs Installed PWA;
- current screen label;
- ISO timestamp.

Never auto-include:

- Ask question;
- Journal content;
- reading content/history;
- profile name;
- birth date;
- PromptPay/payment information;
- clipboard;
- screenshot;
- files;
- precise location;
- advertising identifier;
- persistent tracking ID.

## 29.4 Email fallback

If `mailto:` is unavailable:

- Copy Report Details;
- Copy Diagnostic Info.

Screenshots/files remain user-controlled in email client.

## 29.5 Studio contact presentation

Current display:

Benedict Interactive  
Bangkok, Thailand  
benedict.support@gmail.com

The location is static studio identity, not user geolocation collection.

---

# 30. Legal & IP Suite

Introduced V0.14.0.

Legal text version:

**1.0.0**

User-facing EN/TH/HI documents:

1. Copyright & Intellectual Property
2. Terms of Use
3. Privacy Policy
4. Third-Party Notices

Repository also contains proprietary `LICENSE.md`.

## 30.1 Legal acknowledgement

One-time title-screen Begin gate.

User may:

- review Terms;
- review Privacy;
- switch EN/TH/HI;
- Agree & Continue;
- Not now.

Stored locally:

- `lgt.legal.acceptedVersion`
- `lgt.legal.acceptedAt`

It is Terms acknowledgement, not blanket consent for unspecified remote processing.

Material Terms changes should increment legal version.

## 30.2 Ownership discipline

May protect, to extent applicable law:

- original code;
- protectable artwork;
- original writing;
- localization;
- UX/UI expression;
- curation/arrangement;
- brand assets;
- documentation;
- protectable human-authored/human-directed contributions.

Do not claim exclusive ownership of:

- tarot as a concept;
- traditional tarot terminology;
- conventional spread concepts;
- historical facts;
- ideas/methods/systems;
- public-domain material;
- third-party rights.

AI-assisted material is described conservatively.

## 30.3 Screenshot decision — FINAL CURRENT POLICY

**Do not implement screenshot blocking in current PWA.**

Reasons include:

- unreliable cross-platform web support;
- conflict with intentional Save/Share;
- weak protection against determined copying;
- capture blocking does not stop asset extraction or external-camera capture.

Ordinary personal/non-commercial screenshots and intended Save/Share are permitted under current contract.

Rights remain reserved against unauthorized commercial redistribution, mass extraction, clean-asset distribution, scraping, copied competing products, and unauthorized dataset/model-training uses to extent lawful.

Canonical phrase:

**No screenshot block = no extra licence.**

## 30.4 Privacy truthfulness

Do not say “nothing ever leaves the device.”

Current reality includes:

- local profile/state;
- local reading locks;
- local Journal IndexedDB;
- user-initiated Save/Share;
- user-initiated mailto;
- external PromptPay banking flow;
- Google Fonts/network hosting requests;
- normal hosting metadata.

No Benedict Interactive behavioral advertising/product analytics SDK is present in current release.

Local data is not cloud backup and is not separately encrypted by the app.

---

# 31. Tarot Library, Legal and Help Privacy Boundary

These informational/support systems must not mutate reading state.

Opening:

- Library;
- Legal;
- Help/Feedback;
- Support;

must never:

- consume a daily reading;
- consume a Focus;
- change Ask semantic lock;
- reroll Lucky;
- alter Journal source state;
- change card probability.

This is a critical cross-feature regression gate.

---

# 32. Current Storage/Data Principles

Local-first.

Known stable stores include:

- Daily source state such as `lgt.reading.daily.v1`;
- Lucky: `lgt.lucky.v1`;
- Journal IndexedDB: `little-ganesha-journal`;
- legal acknowledgement keys;
- profile/preferences and mode-specific local stores.

Do not guess exact Ask/Focus storage-key names in future handoffs: inspect current code before migration work.

Data principles:

- language change does not reroll;
- theme/motion/audio change does not reroll;
- support/payment does not reroll;
- Journal deletion does not reroll;
- app update does not manufacture a second same-day chance.

---

# 33. Tarot Library Search Defect History — Keep as Regression Test

Historical defect:

Mobile keyboard collapsed after each typed character.

Root cause:

full Library deck render replaced the active `<input>` node on every `input`.

Correct fix shipped V0.15.0:

persistent input node + partial result render.

Never regress to “force focus after rebuilding input” as a workaround.

Why:

- Android software keyboard instability;
- Thai IME disruption;
- Hindi/Devanagari composition disruption;
- caret loss.

This scenario belongs permanently in regression QA.

---

# 34. Version and Release History — Key Milestones

The precise repository is authoritative. Key accepted milestones:

- V0.3.6 — Home visual direction accepted/protected.
- V0.5.1 — Compact 6×13 full-deck ritual accepted.
- V0.5.3 — background audio lifecycle fix; real-device accepted.
- V0.5.4 — Three-Card viewer real-device accepted.
- V0.6.2 — Golden Path accepted.
- V0.7.0 — major current reading milestone reported stable/excellent.
- V0.7.1 — universal app icon.
- V0.8.0 — native Hindi.
  - commit `91ba6402...` — Add native Hindi V0.8.0
- V0.8.1 — Hindi brand-title consistency fix.
  - `246c29467f06014a4fc902b94d3e341a59dbf74f`
- V0.9.0 — Lucky Numbers.
  - `505e099ca21e229f67bebe84779360ee369ac042`
- Housekeeping — `27c2a24dc147ad7ed03bc77fa2c1134d24c9ae77` — Clean obsolete patch manifests
- V0.9.1 — Lucky Numbers polish.
  - `df8732c02182d012a95b8c8aa6ccfb7b1633f881`
- V0.10.0 — Tarot Library.
  - `dc710973b0dce2e577964c520636f1969e4c3418`
- V0.11.0 — Private Journal.
  - `395bfd6598db8233fa17293cabbc5acd9600d11b`
- V0.11.1 — Journal numeral polish.
  - `2bc6e664d2347add826843678ab9ece10ed37653`
- V0.12.0 — Reading Hub.
  - `4bbf2648d71f7903545a625d841edc64a8e80021`
- V0.13.0 — PromptPay support.
  - `f21e6a4c81812276d661d6ebb0a3e6c86c6cf48b`
- V0.14.0 — Legal & IP Suite.
  - `3effae89a2f3fddfed0914b38250629aeefbffd7`
- V0.15.0 — Help & Feedback + Tarot Library search keyboard fix.
  - `bf8a875ac886e67cfb4bab607fb3c212c5472bc6`
- V0.15.1 — Studio Contact Polish.
  - `51a140586e665dbc8ca7ae633de6a0573b2908dc`

Current runtime baseline for V5.0 handoff:

**V0.15.1**

---

# 35. Repository Hygiene and Packaging

## 35.1 Current known root-manifest issue

At V5.0 document creation, current GitHub root still contains old manifests including:

- V0.9.0
- V0.9.1
- V0.10.0
- V0.11.0
- V0.11.1
- V0.12.0
- V0.13.0
- V0.14.0
- V0.15.0
- V0.15.1

V0.15.1’s own manifest says V0.9.0–V0.15.0 should be deleted after upload.

Before final public release, clean the root so only the current runtime Patch Manifest remains.

ZIP cannot delete files: deletion must be stated/performed separately.

## 35.2 Repository cleanliness rule

Do not accumulate:

- installers;
- staging copies;
- temp files;
- backups;
- duplicate manifests;
- generated junk;
- stale release packages.

QA/release docs belong under `docs/`.

## 35.3 Commit messages

Keep commit message <=50 characters.

Recommended docs-only handoff commit:

`Refresh Handoff V5.0`

## 35.4 Direct-upload ZIP rule

Default delivery for manual upload:

- preserve repo paths;
- include only files that need add/replace;
- no `.bat`, PowerShell, or Python installer unless explicitly requested.

## 35.5 Package validation

Runtime package:

edit  
→ finalize manifest  
→ checksums last  
→ ZIP  
→ re-extract  
→ verify checksums from extracted ZIP  
→ deliver.

Do not claim ZIP verification if only staging directory was checked.

---

# 36. Risk Classification

LOW:

- docs;
- typo;
- microcopy;
- isolated CSS polish.

MEDIUM:

- new UI component;
- localization behavior;
- reading presentation;
- Save/Share extension;
- non-destructive state extension.

HIGH operationally:

- Service Worker;
- cache identity;
- PWA manifest/install/update;
- audio lifecycle;
- navigation/state architecture;
- IndexedDB migration;
- canonical card mapping;
- mass asset replacement;
- auth/payment backend;
- deep refactor.

A tiny source change that bumps SW/cache is operationally HIGH for deployment.

High-risk work requires rollback before edit.

Serious regression:

STOP  
→ stabilize/restore  
→ diagnose  
→ fix  
→ retest.

---

# 37. Final Full-System User Acceptance QA — Mandatory Pre-Market Campaign

The final campaign must simulate a real user, not merely inspect source.

It should combine:

1. static/source verification;
2. deterministic test harnesses;
3. browser interaction testing where available;
4. installed Android PWA real-device acceptance by P’Benz;
5. iOS Safari/PWA testing if an actual iOS device is available;
6. explicit documentation of anything not tested.

Never claim real-device PASS from static or headless tests.

## 37.1 Test identities / state profiles

Test at least:

- brand-new user / clean storage;
- returning user;
- user with completed Daily;
- user with multiple Focus readings;
- user with Ask semantic locks;
- user with Lucky daily result;
- user with Journal data;
- user with deleted Journal entries/tombstones;
- user before legal acceptance;
- user after legal acceptance;
- browser mode;
- installed PWA;
- offline after successful install/update.

## 37.2 Splash / Title / Legal / Onboarding

Verify:

- splash timing;
- title art;
- sound toggle;
- EN/TH/HI switch;
- Terms gate first time;
- Terms/Privacy links;
- Agree & Continue;
- Not now;
- no repeated gate after accepted same legalVersion;
- onboarding optional fields;
- Skip;
- Save;
- profile persistence;
- no accidental fullscreen request.

## 37.3 Home / Navigation

Verify:

- correct greeting/profile meta;
- Home cards;
- bottom nav;
- Reading Hub;
- Library;
- Journal;
- Settings;
- no dead buttons except intentionally inactive BMC before activation;
- no horizontal overflow;
- back behavior.

## 37.4 Daily Guidance

Verify:

- 78 facedown cards;
- 6×13;
- no duplicates/position leak;
- pre-bound selection;
- correct reveal;
- six lenses;
- EN/TH/HI;
- Save;
- Share;
- same-day restore;
- language switch does not reroll;
- restart/PWA reopen does not reroll;
- next local day eligibility.

## 37.5 Ask Ganesha

Test in EN/TH/HI:

- simple question;
- relationship question;
- money question;
- work question;
- paraphrase same language;
- equivalent cross-language question;
- different genuine question;
- two different named people;
- same-day semantic restore;
- no card/topic drift;
- exact question hidden from shared output by default;
- countdown applies to correct semantic family;
- restart persistence.

## 37.6 Three-Card

For multiple Focuses:

- choose Focus before shuffle;
- 78-card ritual;
- exactly three unique selected cards;
- third selection collapses deck stage;
- no dead space;
- one coherent narrative;
- Save/Share;
- completed same Focus restore;
- incomplete session does not consume;
- different Focus same day allowed;
- countdown.

## 37.7 Golden Path

For at least two Focuses:

- correct positions;
- coherent consultation;
- block/path logic;
- no deterministic fate claim;
- per-Focus lock;
- restore;
- incomplete no-consume;
- Save/Share;
- language parity.

## 37.8 Remove the Obstacle

For at least two Focuses:

- Obstacle;
- What Feeds It;
- What Releases It;
- coherent connection;
- per-Focus lock;
- restore;
- incomplete no-consume;
- Save/Share;
- language parity.

## 37.9 Lucky Numbers

Verify:

- machine has 0–9;
- exactly three unique digits;
- role order;
- one daily fixed set;
- interrupted animation preserves set;
- Replay does not reroll;
- Today’s Number Set rules;
- leading-zero cyclic rotation;
- no gambling framing;
- Save/Share preserves same values;
- digit 1 legible;
- Back Home reachable;
- reduced motion;
- SFX;
- haptics ON/OFF watch item.

## 37.10 Tarot Library

Verify:

- all five rooms;
- Explore 78 cards;
- lazy load behavior;
- correct images/titles;
- search EN;
- search Thai;
- search Hindi;
- keyboard remains open while typing;
- caret/IME stable;
- search clear;
- filters;
- filter + query;
- no-results state;
- open detail;
- Back restores usable state;
- historical copy;
- reversals described as optional/traditional, not active runtime;
- no reading-state mutation.

## 37.11 Journal

Verify:

- capture only completed results;
- Timeline;
- Calendar;
- search/filter;
- entry detail;
- reflection edit/save;
- bookmark;
- Patterns;
- Monthly Reflection;
- exact Ask storage OFF default;
- exact Ask storage ON behavior;
- single delete;
- multi-delete;
- clear data two-stage;
- tombstone prevents re-capture;
- deleting Journal does not reset Daily/Ask/Focus/Lucky source locks;
- numeral 1 clarity.

## 37.12 Reading Hub

Verify:

- each intent recommendation;
- recommendation only highlights/routes;
- no auto-draw;
- status read-only;
- no state mutation;
- correct language.

## 37.13 PromptPay

Verify:

- Open QR;
- QR scan from another device if possible;
- recipient names;
- verification reminder;
- Save QR;
- same-device guidance;
- no amount;
- no bank ID leak;
- no payment-received claim;
- Back Settings/Home;
- offline availability after install.

## 37.14 Buy Me a Coffee — after activation

Verify:

- correct official URL;
- external destination belongs to intended account;
- safe external navigation;
- return to PWA;
- no reading state change;
- no feature unlock;
- copy EN/TH/HI;
- disabled/Coming soon state removed only when official URL exists.

## 37.15 Help & Feedback

Verify:

- Report a Problem;
- diagnostics default ON;
- preview;
- user can toggle OFF;
- Send Feedback diagnostics default OFF;
- Copy Diagnostic Info;
- Copy Report Details;
- mailto To = `benedict.support@gmail.com`;
- subject/build correct;
- message included;
- no forbidden personal data automatically added;
- static studio identity;
- Bangkok is not user geolocation;
- email-app unavailable fallback.

## 37.16 Settings

Verify:

- language;
- motion;
- browser fullscreen;
- audio enabled;
- volume;
- shuffle;
- profile edit/clear;
- Help & Feedback;
- Support;
- Legal;
- return title.

## 37.17 Audio

Verify:

- play/pause;
- next/previous;
- shuffle;
- volume;
- background immediately pauses;
- lock screen pauses;
- foreground resumes only if previously playing;
- manual pause remains paused;
- no duplicate playback after lifecycle events.

## 37.18 Save / Share Matrix

Test Save/Share for every retainable mode:

- Daily;
- Ask;
- Three;
- Golden;
- Obstacle;
- Lucky.

Verify:

- filename;
- image generation;
- correct language;
- correct card/numbers;
- no reroll;
- native Share where supported;
- Save fallback;
- cancellation safe.

## 37.19 Localization Sweep

For EN, TH, HI:

- no missing strings;
- no raw keys;
- no broken HTML entities;
- no awkward overflow;
- no mixed-language accidental fallback;
- Thai natural;
- Hindi natural;
- brand preserved.

## 37.20 PWA / Offline / Upgrade

Verify:

- install;
- icon;
- standalone;
- cache update;
- previous-build upgrade;
- offline Home/shell;
- offline supported feature assets;
- no stale 0.15.0/0.15.1 mixture after final release;
- storage survives upgrade.

## 37.21 Privacy / Legal Regression

Verify:

- no automatic report upload;
- no analytics SDK accidentally introduced;
- no Ask exact text leaked;
- no Journal data in diagnostics;
- no precise location;
- no payment info in diagnostics;
- legal text opens;
- screenshots remain allowed technically;
- Save/Share still works.

## 37.22 Accessibility

At minimum:

- Reduced Motion;
- keyboard focus on desktop/browser;
- modal close/back;
- readable text scaling;
- safe area;
- no critical hover-only controls;
- no focus trap;
- touch target sanity.

## 37.23 Performance / Stability

Watch for:

- long blocking load;
- memory growth after repeated mode entries;
- duplicated event listeners;
- duplicated audio;
- canvas runaway animation;
- repeated toasts;
- accidental multiple dialogs;
- stale mode overlays;
- scroll lock not released;
- PWA cache mismatch.

---

# 38. Bug Severity for Final Campaign

## P0 — release stop

Examples:

- app cannot start;
- data corruption;
- repeated crashes;
- wrong/duplicate tarot selection;
- reroll exploit breaking locked contract;
- payment destination materially wrong;
- legal gate traps user;
- update bricks installed PWA;
- privacy leak of sensitive local content.

## P1 — must fix before public release

Examples:

- major mode unusable;
- Save/Share broken across target device;
- keyboard defect preventing Library search;
- Journal deletion violates source locks;
- audio cannot stop/background correctly;
- Focus restore wrong;
- BMC/PromptPay routing wrong.

## P2 — fix if practical / document if minor

Examples:

- localized microcopy;
- minor spacing;
- isolated visual polish;
- noncritical animation mismatch.

Do not delay release for cosmetic perfection if product is otherwise safe, coherent, premium and stable.

---

# 39. Final QA Report Format

Every discovered issue should record:

- ID;
- severity;
- build;
- language;
- device/browser/PWA mode;
- exact screen/mode;
- preconditions;
- reproduction steps;
- expected;
- actual;
- reproducibility;
- screenshot/video if user voluntarily provides;
- suspected subsystem;
- fix commit/package;
- regression tests;
- real-device retest status.

Do not close an issue merely because code “looks fixed.”

---

# 40. Release Decision Gate

The first public stable release may be declared only when:

- all P0 = 0;
- all P1 = 0;
- BMC status is resolved;
- PromptPay destination verified;
- support email works;
- legal/help privacy boundaries pass;
- all core reading modes pass;
- same-day locks pass;
- Save/Share pass on target device;
- PWA update pass;
- obsolete root manifests cleaned;
- build markers coherent;
- final package/checksums verified;
- QA limitations stated honestly.

If only Android is tested, say Android.

Do not call it iOS-tested.

---

# 41. Specialized Governance Standards to Read When Relevant

Current repository contains specialized standards including:

- `APP_ICON_SYSTEM_V1.md`
- `HELP_FEEDBACK_STANDARD_V1.md`
- `HINDI_LOCALIZATION_STANDARD_V1.md`
- `JOURNAL_PRODUCT_STANDARD_V1.md`
- `LEGAL_AND_CONTENT_PROTECTION_STANDARD_V1.md`
- `LUCKY_NUMBERS_PRODUCT_STANDARD_V1.md`
- `PROMPTPAY_SUPPORT_PRODUCT_STANDARD_V1.md`
- `READING_HUB_PRODUCT_STANDARD_V1.md`
- `REPOSITORY_STRUCTURE_POLICY_V1.md`
- `TAROT_LIBRARY_PRODUCT_STANDARD_V1.md`

Use them as subsystem detail, but V5.0 controls when conflicts exist.

---

# 42. Hard “Do Not” List

Do not:

- make P’Benz reconstruct history;
- treat old ZIP as source truth;
- skip GitHub-first verification;
- literal-translate;
- output generic tarot dictionaries;
- randomize after tap;
- duplicate cards;
- let language/profile/payment alter probability;
- allow same-day reroll gaming;
- hardcode Thailand time globally;
- reset source readings when Journal entries are deleted;
- auto-store exact Ask wording without opt-in;
- treat Lucky Numbers as gambling;
- activate BMC with an invented URL;
- add payment entitlement;
- add unnecessary auth/backend/tracking;
- claim payment received without callback;
- recolor PromptPay QR;
- expose full bank screenshot or ID;
- auto-send bug reports;
- collect precise user location for Help;
- reintroduce Library input rebuild per keystroke;
- regress background audio pause;
- restore horizontal 3×26 deck;
- restore Three-Card dead space;
- activate reversals without product decision;
- implement blanket screenshot blocking in current PWA;
- pile old root Patch Manifests;
- leave mixed runtime versions;
- call static QA real-device QA;
- call Android PASS iOS PASS;
- over-polish accepted systems without concrete benefit.

---

# 43. Immediate Next Actions for a New Room

When V5.0 is pasted into a new room:

1. Verify current GitHub `main`.
2. Determine whether a docs-only V5.0 commit sits above runtime V0.15.1.
3. Verify runtime remains 0.15.1 unless a later release exists.
4. Verify obsolete root Patch Manifests.
5. Check whether official Buy Me a Coffee destination has been supplied.
6. If not supplied, ask only for that Founder-owned external value.
7. If supplied, implement BMC as isolated external voluntary-support link.
8. Run targeted QA for BMC.
9. Prepare and execute comprehensive final market-readiness QA.
10. Fix only reproduced defects, with rollback and regression protection.
11. Re-run full relevant regression after fixes.
12. When all release gates pass, prepare V1.0.0 candidate/promotion package.
13. Do not declare market-ready before final acceptance.

---

# 44. Closing State

Little Ganesha Tarot is now a near-release product, not a prototype.

The project has:

- one complete 78-card deck;
- five core tarot reading experiences;
- a daily symbolic number ritual;
- a professional Tarot Library;
- a private Journal;
- a Reading Hub;
- three first-class languages;
- PromptPay voluntary support;
- legal/privacy/IP infrastructure;
- user support/reporting infrastructure;
- PWA/mobile delivery;
- protected audio lifecycle;
- Save/Share;
- coherent studio identity.

The correct mindset for the next phase is no longer **“add more features.”**

It is:

> **finish the one remaining external support integration, test the complete product like a real user, eliminate release-blocking defects, clean operational residue, and ship without destabilizing what already works.**

---

**END — MASTER PLAN & ZERO-QUESTION DEVELOPMENT HANDOFF V5.0**

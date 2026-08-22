# Little Ganesha Tarot — V0.4.6 Semantic Ask Ganesha

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Target runtime:** V0.4.6  
**Master Plan in force:** V4.0 + newest approved current-room product decision  
**Baseline repository HEAD:** `0b35a8ec749644abc66c300e3b197e29365951da` — `Add Spiritual Ask context V0.4.5`

## Release purpose

V0.4.6 fixes the most important product-quality weakness found during real-device Ask Ganesha testing: a reading could identify the broad question category yet still produce prose that did not answer the exact thing the user asked.

The release therefore makes **semantic question fidelity** a hard runtime requirement. The question determines the subject that must be answered; the card determines what the reading says about that subject. A card is no longer allowed to pull the primary answer into an unrelated generic meaning.

Everything remains local to the browser. No AI, API, backend, remote inference, or account service is introduced.

## Semantic Ask architecture

`Question Guard → Semantic Slot Parser → Micro-Facet Resolver → Confidence/Ambiguity → Question Contract → existing Ask draw/restore → Card Context Profile → Semantic Bridge → Contract-driven Answer Composer → Answer Validator → Result`

The shared Reading Engine remains protected and unchanged.

### Semantic slots

The local Question Analyzer v3 extracts, when present:

- domain,
- facet / micro-facet,
- target,
- perspective,
- question type,
- metric,
- timeframe,
- comparison / conditional structure,
- polarity / certainty request,
- confidence / ambiguity,
- factual or epistemic boundary.

The nine top-level context families remain:

1. Self-image & attractiveness
2. Social perception
3. Love & relationships
4. Work & direction
5. Money & resources
6. Choice & action
7. Outlook & opportunity
8. Inner state & growth
9. Spiritual & Unseen / ศรัทธา จิตวิญญาณ และสิ่งเร้นลับ

Beneath them, the parser distinguishes dozens of micro-facets such as appearance, attractiveness, first impression, feelings, reconciliation, commitment, career direction, promotion, income, wealth, debt, financial stability, continue-or-stop, timing, success, burnout, healing, divine protection, dreams, signs/synchronicity, karma/destiny, past life, and unseen influence.

## Question Contract / No Drift Rule

Every accepted question is converted into a compact contract before a reading is composed.

The contract records what the answer **must cover**, such as:

- the exact topic/micro-facet,
- directional tendency where appropriate,
- the card rationale,
- a practical condition/caveat,
- an explicit timeframe when the user supplied one,
- the relevant target/perspective,
- uncertainty boundaries for another person's private feelings,
- symbolic-only boundaries for unverifiable spiritual claims.

It also records what the answer **must avoid**, including domain drift, unsupported certainty, mind-reading claims, supernatural fact claims, fear confirmation, and exact-date claims where tarot cannot establish them.

**No Drift Rule:** the primary subject of the answer must remain the primary subject of the user's question.

## Hard timeframe preservation

An explicit timeframe is now a semantic requirement rather than optional context.

For example:

`ผมจะรวยมั้ยในอีก 1 ปีข้างหน้า`

is parsed as a money/wealth outlook with an explicit one-year horizon. The final direct answer must mention that one-year period and remain about financial position/wealth. A generic message about “today”, happiness, or warmth cannot pass the Answer Validator for that question.

Numeric Thai/English day, week, month, and year periods are supported alongside common named periods such as today, this week, next month, next year, by year-end, short term, and long term.

## Card Context Profile + Semantic Bridge

Each drawn card is converted into a small structured profile for the resolved context:

- direction: strong positive / moderate positive / mixed / moderate challenging / strong challenging,
- strength,
- canonical keywords,
- relevant context text,
- topic anchor.

The Semantic Bridge joins that card profile to the Question Contract before prose is generated. Logic therefore comes before presentation: the app first establishes what the card implies **about the asked subject**, then writes the bilingual answer.

## Result hierarchy

Ask Ganesha now prioritizes:

1. **Answer to Your Question / คำตอบต่อคำถามของคุณ**
2. **Why This Card Points There / ทำไมไพ่ใบนี้จึงสะท้อนแบบนั้น**
3. **What to Keep in View / สิ่งที่ควรคำนึงประกอบ**
4. **Little Ganesha's Reflection / มุมมองจากพระพิฆเนศน้อย**
5. **A Question to Carry Forward / คำถามชวนทบทวนต่อ**

The generic card meaning is not allowed to replace the direct answer.

## Ambiguity and multi-question behavior

If two legitimate subjects score too closely, the existing premium focus chooser asks the user which subject matters most instead of silently guessing.

A genuine conditional single question remains accepted, for example:

`ถ้าผมย้ายงาน รายได้จะดีขึ้นไหม`

Two independent questions in one input remain rejected so one card is not forced to answer unrelated issues.

## Bilingual writing standard

Thai and English copy are authored as separate native-language surfaces rather than literal word-for-word translations. The semantic contract is language-neutral; presentation phrases, topic wording, caveats, time phrasing, and Little Ganesha reflection are rendered natively for each language.

## Safety and epistemic boundaries

The existing local Question Content Guard remains in place. Medical diagnosis, legal verdict, lottery/gambling outcome, specific investment-price/guaranteed-return, and time-of-death requests continue to require reframing.

Questions about another person's private feelings do not claim mind reading. Spiritual & Unseen questions remain welcome, but symbolic tarot reflection is kept distinct from factual verification of deities, spirits, curses, psychic powers, past-life identity, or supernatural attack.

## Same-question behavior and privacy

The existing rule remains:

**same normalized question + same local day = same card**

Resolved semantic metadata may be stored with the local fingerprint/card record to restore the same reading focus. Raw question text is not persisted for repeat-question matching. Existing V0.4.4/V0.4.5 compatible records remain readable.

## Protected behavior

V0.4.6 does **not** functionally rewrite:

- `js/reading-engine.js`,
- `js/reading-content.js`,
- `js/reading-ui.js`,
- Daily Guidance content/lenses,
- Daily Save/Share,
- canonical card assets,
- audio lifecycle.

The Service Worker/build cache receives only the required runtime version/resource-list update for the two new semantic modules.

## QA status before upload

Static/unit/package validation includes:

- Reading Engine regression,
- Question Guard regression,
- semantic-slot parsing in Thai and English,
- explicit timeframe preservation,
- conditional vs multi-question distinction,
- ambiguity resolution,
- Question Contract requirements,
- money/wealth + one-year + The Sun regression,
- appearance/public-perception + Six of Pentacles regression,
- third-party-feelings uncertainty,
- Spiritual & Unseen epistemic boundaries,
- 78 cards × 9 contexts × 2 languages = **1,404 contract-validated Semantic Ask compositions** with no fallback,
- same-question semantic metadata persistence,
- package/script dependency order,
- hard runtime version coherence,
- repository structure,
- checksum and final archive re-extraction.

Real-device validation of V0.4.6 remains required after deployment.

See:

- `docs/qa/QA_V0_4_6.md`
- `docs/releases/RELEASE_NOTES_V0_4_6.md`
- `docs/releases/PATCH_UPLOAD_NOTES.md`

## Canonical promotion note

V0.4.5 at GitHub HEAD `0b35a8ec749644abc66c300e3b197e29365951da` is the deployed baseline used to build this patch. V0.4.6 is a candidate until it is pushed and passes the appropriate real-device gate. Governance/current-status documentation should be promoted deliberately afterward rather than pre-declaring the candidate canonical.

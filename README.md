# Little Ganesha Tarot — V0.4.5 Contextual Ask Ganesha

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Target runtime:** V0.4.5  
**Master Plan in force:** V4.0 + newest approved current-room product decision  
**Baseline repository HEAD:** `fd494bfbb4edf1271cd0060a7c5a066c4c35b310` — `Add Ask Ganesha reading V0.4.4`

## Release purpose

V0.4.5 upgrades **Ask Ganesha / ถามพระพิฆเนศน้อย** from a generic card-meaning response into a local contextual interpretation system that tries to answer the user's actual question more directly without AI, API calls, or a backend.

The Reading Engine remains protected and unchanged. The upgrade sits above the existing `ask` spread as isolated question-analysis and interpretation modules.

## Contextual Ask architecture

`Question Guard → Question Analyzer → optional Focus Resolver → existing Ask draw → Context Matrix → Answer Composer → contextual result`

The Question Analyzer extracts:

- Domain
- Facet
- Perspective
- Question Type
- Timeframe
- Confidence

Primary context families:

1. Self-image & attractiveness
2. Social perception
3. Love & relationships
4. Work & direction
5. Money & resources
6. Choice & action
7. Outlook & opportunity
8. Inner state & growth
9. Spiritual & Unseen / ศรัทธา จิตวิญญาณ และสิ่งเร้นลับ

When two domains score too closely, the app asks the user which area should be the focus instead of pretending certainty.

## Context Matrix strategy

The release reuses the already curated bilingual tarot content wherever it is strongest:

- Work → Work & Goals lens
- Money → Money & Resources lens
- Love → Love & Relationships lens
- Choice → Guidance for Today lens
- Outlook → Opportunities & Watch-outs lens
- Inner state → Inner State & Balance lens

Self-image and social-perception readings use a dedicated card-presentation profile derived from each canonical card's archetype, suit/rank language, and keywords.

The ninth family, **Spiritual & Unseen**, adds a dedicated curated bilingual context entry for every one of the 78 cards. It covers divine protection, spiritual path, signs/synchronicity, dreams, spiritual gifts, karma/destiny, past-life questions, and unseen-influence questions.

This keeps the canonical tarot model intact while producing a 9-context interpretation surface for all 78 cards in English and Thai.

## Answer Composer

Ask results now prioritize:

1. **Answer to Your Question / คำตอบต่อคำถามของคุณ**
2. **Why This Card Points There / ทำไมไพ่ใบนี้จึงสะท้อนแบบนั้น**
3. Little Ganesha's Reflection
4. Contextual reflection question

The generic upright meaning is no longer the primary answer block in Ask Ganesha.

Question type changes how the answer is framed. Evaluation, perception, feelings, decision, guidance, outlook, cause, and timing questions are not all answered with the same sentence structure.

## Safety and uncertainty boundaries

The existing local Question Content Guard remains in place.

V0.4.5 also adds local reframe boundaries for questions that ask tarot to determine:

- medical diagnosis/pregnancy/recovery,
- court verdict/legal outcome,
- lottery/gambling result,
- specific investment price/guaranteed return,
- time of death.

The app asks the user to reframe those questions toward reflection, preparation, choices, or care rather than presenting tarot as factual diagnosis or prediction.

Questions asking about another person's feelings are answered with explicit uncertainty rather than claiming access to private thoughts.

### Spiritual & Unseen boundary

Spiritual questions are **accepted rather than blocked**, but the Answer Composer distinguishes symbolic tarot reflection from literal verification. The app can explore the symbolism of sacred protection, spiritual paths, dreams, synchronicities, intuitive sensitivity, karma/destiny, past-life themes, and unseen influences without claiming that tarot has proved a deity, spirit, curse, supernatural attack, psychic power, past-life identity, or fixed cosmic verdict.

For example, a question such as “Which sacred being protects me?” may receive a card-specific spiritual archetype and reflective interpretation, but the app will not invent a named protector as a verified fact. A question such as “Is an evil spirit following me?” is reframed through the card's symbolism while explicitly stating that fear or ambiguity is not evidence of a supernatural threat.

## Same-question behavior

The existing rule remains:

**same normalized question + same local day = same card**

V0.4.5 additionally stores the resolved context key with the local fingerprint/card record. Raw question text is still not persisted for repeat-question matching.

Existing V0.4.4 same-day records without context metadata remain readable and are enriched non-destructively when reused.

## Protected behavior

This release does **not** modify:

- `js/reading-engine.js`,
- `js/reading-content.js`,
- `js/reading-ui.js`,
- Daily Guidance content/lenses,
- Daily Save/Share behavior,
- audio lifecycle,
- PWA strategy beyond routine build/cache version coherence,
- profile behavior,
- canonical tarot/card assets.

## QA status before upload

Static/unit/package validation covers:

- 78-card Reading Engine regression,
- Question Guard,
- Question Analyzer intent/facet/type/perspective detection,
- ambiguity resolver contract,
- high-stakes reframe boundaries,
- contextual interpretation across 78 cards × 9 contexts × 2 languages,
- dedicated 78-card bilingual Spiritual & Unseen context matrix,
- spiritual epistemic boundaries that preserve symbolic depth without presenting unverifiable supernatural claims as facts,
- same-question/card persistence and V0.4.4 record compatibility,
- TH/EN copy,
- script dependency order,
- runtime version coherence,
- repository structure,
- checksum/archive re-extraction.

Real-device validation of V0.4.5 remains required after deployment.

See:

- `docs/qa/QA_V0_4_5.md`
- `docs/releases/RELEASE_NOTES_V0_4_5.md`
- `docs/releases/PATCH_UPLOAD_NOTES.md`

## Canonical promotion note

V0.4.4 is the verified deployed GitHub baseline used to build this patch. Master Plan V4.0 still contains the earlier canonical-runtime status and should not be silently rewritten inside this runtime package. After V0.4.5 is pushed and passes the appropriate real-device gate, governance/current-status documentation should be updated deliberately.

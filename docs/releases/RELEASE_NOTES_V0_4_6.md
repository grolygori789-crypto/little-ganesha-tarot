# Little Ganesha Tarot — Release Notes V0.4.6

**Release:** Semantic Ask Ganesha  
**Baseline:** V0.4.5 / `0b35a8ec749644abc66c300e3b197e29365951da`  
**Risk:** MEDIUM  
**Runtime architecture:** local-only; no AI/API/backend

## Why this release exists

Real-device testing exposed a semantic-fidelity defect: Ask Ganesha could select a relevant card/context yet answer too generically, omit an explicit timeframe, or fail to stay on the exact subject of the question. V0.4.6 treats this as a release blocker and fixes the composition architecture rather than patching isolated sentences.

## New semantic layer

V0.4.6 adds:

- `question-analyzer-v3` with semantic slots and expanded bilingual micro-facets,
- `question-contract-v1`,
- `ask-semantic-v1`,
- hard No Drift requirements,
- explicit-timeframe preservation,
- target/perspective/metric extraction,
- card-context direction profiles,
- a Semantic Bridge between question contract and tarot context,
- contract-driven direct answers,
- answer validation with deterministic fallback,
- stronger conditional/multi-question/comparison handling.

## Critical regression fixed

Question:

`ผมจะรวยมั้ยในอีก 1 ปีข้างหน้า`

Card: **The Sun**

V0.4.6 requires the direct answer to remain about financial position/wealth, state the one-year horizon, express the card's directional support, include a condition/caveat, and avoid a guaranteed-riches claim. A generic “today” reading cannot pass validation.

The earlier appearance/public-perception regression remains covered as well: a Six of Pentacles answer to an appearance question must remain about appearance/overall presence in other people's view while still explaining why Six of Pentacles supports that reading.

## 9-context compatibility

The existing nine families remain intact, including the 78-card bilingual Spiritual & Unseen matrix. V0.4.6 adds a stricter semantic layer above them rather than replacing their curated tarot content.

Spiritual questions continue to use symbolic-only/unseen-threat boundaries; third-party feelings continue to use explicit uncertainty rather than mind-reading claims.

## Privacy and repeat-question behavior

Same normalized question + same local day still restores the same card. Only non-raw semantic metadata is added to the local reading record; raw question text is not persisted for matching.

## Protected subsystems

Reading Engine 1.0.2, Daily Guidance, Daily Save/Share, canonical tarot content, card assets, and audio behavior are not functionally rewritten.

## QA

QA-S/unit/package gates include a 1,404-reading 78×9×2 semantic contract sweep, critical TH/EN regression examples, analyzer corpus tests, persistence compatibility, version coherence, checksums, and archive re-extraction.

Real-device QA is still required after deployment.

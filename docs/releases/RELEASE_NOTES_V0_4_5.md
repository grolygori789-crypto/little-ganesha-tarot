# Little Ganesha Tarot — Release Notes V0.4.5

**Release:** Contextual Ask Ganesha  
**Target runtime:** 0.4.5  
**Baseline:** `fd494bfbb4edf1271cd0060a7c5a066c4c35b310` — V0.4.4 Ask Ganesha  
**Risk:** MEDIUM  
**Reading Engine:** 1.0.2 unchanged  
**Daily content:** `daily-guidance-v3` unchanged

## Why this release exists

V0.4.4 successfully delivered the one-question/one-card Ask Ganesha flow, but real-device use exposed a product-quality gap: the result could display the correct generic meaning of the selected tarot card while failing to connect that meaning clearly to the user's actual question.

V0.4.5 fixes the interpretation layer rather than changing tarot randomization or the shared Reading Engine.

## New: Question Analyzer

A local rule-based analyzer classifies each accepted question across:

- domain,
- facet,
- perspective,
- question type,
- timeframe,
- confidence.

No user question is sent to a server for classification.

## New: Context Matrix + Answer Composer

Ask Ganesha now resolves the selected card through one of nine major life-context families and composes a result that begins with a direct answer to the question before explaining the tarot symbolism behind it.

The system reuses curated Daily Lens content for six context families, adds card-specific self-image/social-perception presentation logic for two more, and adds a dedicated curated **Spiritual & Unseen** interpretation for every one of the 78 cards in both English and Thai. This preserves the canonical tarot model while giving spiritual questions a purpose-built interpretive layer.

## New: Spiritual & Unseen context family

The ninth context family covers:

- divine protection / sacred guardianship,
- spiritual path and faith,
- signs and synchronicity,
- dreams and dream symbolism,
- intuition / spiritual-gift questions,
- karma and destiny,
- past-life questions,
- spirits, curses, black magic, and other unseen-influence questions.

These questions are not automatically blocked. Instead, the contextual answer engine uses an **epistemic boundary**: tarot may explore symbolism and meaning, but it does not claim to verify a named deity, spirit, curse, psychic power, literal past-life identity, supernatural attack, or fixed cosmic verdict.

The Spiritual & Unseen matrix contains one curated bilingual interpretation for each canonical card (78 × TH/EN). Risk-sensitive facets such as unseen threats receive stronger wording that explicitly separates fear and ambiguity from evidence.

## New: ambiguity resolver

If a question genuinely spans two topics with similar confidence—for example work and a relationship—the app asks the user which area should be the focus.

The focus choice changes the interpretation, not the card draw.

## Same-question rule preserved

Same normalized question on the same local day still restores the same card.

Resolved context metadata is stored locally with the fingerprint/card record so a repeated question also keeps its prior focus when available. Existing V0.4.4 records remain compatible.

## Safer factual boundaries

The contextual analyzer asks for a reframe when a question requests tarot to determine a medical diagnosis, legal verdict, gambling/lottery outcome, specific investment price/guaranteed return, or time of death.

Questions about another person's feelings are explicitly presented as symbolic relationship reflection rather than verified mind-reading.

## Result hierarchy

Ask result presentation now emphasizes:

- reading focus,
- answer to your question,
- why this card points there,
- Little Ganesha's reflection,
- contextual reflection question.

## Not changed

- shared Reading Engine,
- Daily Guidance,
- Daily Lenses,
- Daily Save/Share,
- canonical 78-card mapping/assets,
- audio lifecycle,
- profile behavior.

## QA status

QA-S/unit/package: PASS before delivery.  
Deployed V0.4.5 Android/iOS real-device validation: PENDING.

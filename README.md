# Little Ganesha Tarot — V0.5.2 Reading Discipline + Smart Reset

**Studio:** Benedict Interactive  
**Target runtime:** V0.5.2  
**Baseline runtime:** V0.5.1  
**Baseline GitHub HEAD:** `ed38c109ef134c553d247a2e574be8b43f7f969f` — `Compact full deck UX V0.5.1`  
**Risk:** MEDIUM  
**Architecture:** local-first · no AI/API/backend · Reading Engine 1.1.0 preserved · Deck Ritual 1.1.0 preserved

## Purpose

V0.5.2 adds reading discipline without changing the compact 78-card ritual that shipped in V0.5.1. The release prevents rerolling the same Ask Ganesha question, makes Three-Card a once-per-local-day completed reading, adds a restrained countdown to the next reading window, and keeps mobile audio intent correct when the app moves between foreground and background.

## Ask Ganesha — Smart Same-Question Lock

Ask Ganesha still answers the **actual question** through the protected Semantic Ask pipeline. V0.5.2 adds a bilingual same-day semantic identity layer before a new card can be chosen.

- An exact same question on the same local day restores the same card and reading.
- A Thai or English paraphrase that resolves to the same semantic question restores the same card and the **original answer contract** rather than recomposing from the paraphrase as a new reading.
- Matching considers the semantic family/topic, target, perspective, question type family, timeframe, conditional status, and comparison status.
- Related wording is normalized where it is genuinely the same question, including common Thai/English ellipsis such as an omitted first-person pronoun.
- Different people, materially different timeframes, different topics, conditions, or comparisons are not intentionally merged.
- Relationship questions with a named person keep a local hashed subject cue so Alice and Bob do not become the same reading.
- Raw question text is **not persisted** by the semantic duplicate layer.
- There is no intentional same-day record eviction; stored mappings last for the local day unless device storage itself is unavailable.

The existing safety boundaries for medical, legal, gambling, specific investment outcomes, death, and harmful unseen/spiritual claims remain protected.

## Three-Card — One Completed Reading Per Day

Three-Card now allows one **completed interpreted spread** per device-local calendar day.

- Entering the mode or selecting cards does not consume the day by itself.
- The daily lock is written only after all three cards have been successfully revealed and interpreted.
- Returning later on the same day restores the same Past / Present / What May Unfold Next cards and the same deterministic narrative.
- At the next device-local midnight the previous lock expires and a fresh spread becomes available.

This preserves the full 78-card user-choice ritual while preventing repeated rerolls until a preferred spread appears.

## Quiet Countdown

Daily Guidance and completed Three-Card readings show a calm secondary countdown to the next local day. Ask Ganesha shows it only when the current question was restored as an exact or semantic duplicate.

- 1 hour or more: hours + minutes
- under 1 hour: minutes
- final minute: seconds
- reset boundary: `00:00` in the device's local timezone

The countdown is based on wall-clock time, not a background-running stopwatch. It suspends visual updates while hidden and recalculates when the app becomes visible or returns through `pageshow`, so long background periods do not create countdown drift.

## Audio Lifecycle

The V0.5.1 baseline already contains the approved `visibilitychange` audio behavior. V0.5.2 verifies and preserves it rather than rewriting working audio code:

- if music is playing when the app becomes hidden, it pauses and keeps the current playback position;
- when the app becomes visible again, it resumes only if it had been playing before the hide;
- a manual pause remains a manual pause and is never overridden by foreground restoration.

## Protected V0.5.1 UX

The compact full deck remains unchanged: **78 cards, six overlapping rows of 13, no horizontal deck scrolling**, pre-shuffled hidden card mapping before the tap, and no dead selection-stage space after Three-Card choice 3/3.

Daily Guidance, Ask Ganesha, and Three-Card keep Save Image + Share. The permanent product rule remains: **Save Image + Share as the standard result utilities for every tarot reading mode**. Thai and English continue to use the native professional reading standard rather than literal translation or card-dictionary prose.

## QA

Automated QA covers Reading Engine state/persistence, the compact 78-card ritual, local-midnight/countdown logic, bilingual semantic duplicate matching, same-card/same-reading restoration, Ask Context and Semantic Ask matrices, Three-Card daily persistence, 1,456 bilingual Three-Card narrative samples, Save/Share, profile/zodiac, copy, repository structure, and V0.5.2 runtime/service-worker coherence.

Real-device acceptance remains the final deployment check.

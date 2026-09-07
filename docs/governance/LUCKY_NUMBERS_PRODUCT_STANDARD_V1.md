# Lucky Numbers — Product Standard V1.2

**Product:** Little Ganesha Tarot — The Golden Path  
**Feature:** Lucky Numbers  
**Standard:** V1.2  
**Founder-approved correction:** 7 September 2026  
**Runtime target:** V0.16.0 maintenance patch

> **Authority note:** This V1.2 records P’Benz’s newer explicit accepted decision and therefore supersedes the older “three unique digits / ten visible orbs” language in V1.1 and the conflicting Lucky Numbers QA line in Master Plan V5.0 §37.9, under the source-of-truth order defined by Master Plan V5.0 §1.1.

## 1. Product identity

Lucky Numbers is a premium daily symbolic ritual with a playful reveal. It should feel like a
luxury kinetic oracle belonging to the Little Ganesha world, not a lottery terminal, slot machine,
casino game or disposable random-number utility.

The emotional sequence is: **anticipation → kinetic mixing → sequential reveal → meaning → calm**.

## 2. Number contract

1. Candidate values for each role: integers `0..9`.
2. Daily output: exactly three **independently selected digits**.
3. Roles are ordered: **Core Number → Supporting Number → Balancing Number**.
4. Each role has exactly `1/10` probability for each digit `0..9`.
5. Repeated digits are valid and must not be suppressed. Examples: `000`, `777`, `121`, `909`.
6. Therefore every ordered three-digit result from `000` through `999` has probability `1/1000`.
7. Selection occurs only when the user deliberately starts the reveal.
8. Selection probability is never affected by profile, language, tarot history, support/payment state or any other product state.
9. Use a cryptographically strong browser RNG when available, with unbiased rejection sampling for **each independent digit draw**.
10. Once a day’s three digits are created, they never reroll before the next device-local day.
11. An interrupted animation keeps the already-fixed daily result.
12. Replay repeats presentation only and never changes selection.
13. Existing valid same-day records created by earlier versions remain valid and must not be rerolled during upgrade.

## 3. Zero and repeated-digit contract

Zero is a first-class symbolic digit, not a null value. Its interpretation centers on potential,
space, reset, openness and creating room for what comes next. Zero can appear independently in any
of the three roles and may therefore appear more than once in the same daily result.

Repeated values carry different role meanings because Core, Supporting and Balancing remain distinct
positions even when their digit glyph is the same.

The kinetic machine must visibly contain **30 physical orbs: three copies each of digits `0` through `9`**.
The 30-orb chamber is a faithful physical representation only; it must never replace the independent
three-draw probability model with sampling-without-replacement from one shared bag.

## 4. Numeral legibility

Lucky-number glyphs are information, not decorative lettering. Digits must be instantly recognisable
on small mobile screens. In particular, `1` must not resemble uppercase `I`.

The 30 mixing orbs may be smaller than the three result orbs, but every visible digit must remain
legible. The machine’s external footprint and three result wells should remain stable unless a real
layout defect requires otherwise.

## 5. Interpretation contract

Each digit has one native-language symbolic profile with four parts: keyword, Core-role guidance,
Supporting-role guidance and Balancing-role guidance. The combined pattern connects all three roles
without claiming that numbers control external events.

If a digit repeats, each occurrence still uses its own role-specific guidance. Do not collapse
repeated roles into one result.

The combined pattern must also be repetition-aware. When two roles share a digit, summarize that
quality as deliberately emphasized across those two roles rather than mechanically repeating the
same keyword twice. When all three roles share a digit, describe that quality as emphasized across
Core, Supporting and Balancing together. Unique-digit results keep the existing three-quality
summary. English, Thai and Hindi must all express these repeat patterns naturally.

Interpretation should be clear, mature and useful, without generic mystical filler or fake certainty.

## 6. Today’s Number Set

After completion, derive a small curated set of number forms from the exact stored digits:

- the three single digits;
- the Core→Supporting pair;
- the Supporting→Balancing pair;
- one three-digit form preserving role order, rotated only when needed to avoid a leading zero.

Remove duplicate display forms when repeated digits naturally produce the same form.

Leading zero is never used to create a pseudo-number such as `029`; rotate the three-digit form to
the first non-zero digit while preserving cyclic role order. `000` remains `000` because there is no
non-zero digit to rotate to.

This section is symbolic presentation only. It must never be labelled as lottery, betting, jackpot,
winning, odds, payout or financial guidance.

## 7. Gambling boundary

Lucky Numbers must not provide or imply lottery prediction, betting advice, odds, jackpots, payouts,
guaranteed luck, investment outcomes or repeated rerolls until a preferred result appears. Visible
copy and exported artwork must preserve the reflective/symbolic framing.

## 8. Kinetic Oracle presentation

The machine is a responsive code-rendered 2.5D object using brass, glass and crystal-orb cues.
Motion should feel weighty and premium: **30 physical balls** collide inside the chamber, the
mechanism rotates, and exactly three selected balls exit one by one.

The chamber may grow slightly internally and the mixing orbs may shrink proportionally so the
existing overall machine footprint and surrounding Lucky Numbers UI do not regress.

For repeated results such as `777`, three distinct physical `7` orbs must exit into the three result
wells. Never reuse the same orb object for more than one result slot.

Avoid arcade bounce, neon casino palettes, slot reels, coins, payout counters or cartoon plastic-gacha styling.

Sound cues are restrained synthesized mechanical/chime accents. Haptics are optional and must fail
silently on unsupported devices.

## 9. Navigation and accessibility

- Respect app/system reduced-motion preferences.
- Reduced motion keeps the same selection and sequential reveal without high-motion mixing.
- All primary controls remain keyboard/focus accessible.
- Canvas has localized accessible text and result meaning exists as selectable DOM text.
- A localized Back to Home action must remain reachable during replay, plus a second exit affordance
  at the completed result. No Lucky Numbers substate may trap the user inside the mode.

## 10. Localization

English, Thai and Hindi are first-class. Localize UI, meanings, number-set copy, accessibility,
daily lock, countdown, Save/Share status and export artwork. Do not translate or restyle the
canonical English brand masthead `LITTLE GANESHA TAROT / THE GOLDEN PATH`.

## 11. Persistence

Storage key remains `lgt.lucky.v1`; schema remains `1` because record shape is unchanged.
A valid record contains schema, local date, exactly three digits in `0..9` **with repeats allowed**,
creation timestamp and completion state. Old-day records are ignored rather than reused.

A same-day record from an earlier release remains valid when its three digits are in `0..9`; the
upgrade must not create a second result for that day merely because the previous release generated
unique digits.

## 12. Save / Share

Save/Share is available only after completion. Exports show the exact stored numbers, selected UI
language, symbolic meanings and Today’s Number Set. Sharing never changes or regenerates the result.

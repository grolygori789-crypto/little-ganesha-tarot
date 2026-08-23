# Lucky Numbers — Product Standard V1.1

**Product:** Little Ganesha Tarot — The Golden Path  
**Feature:** Lucky Numbers  
**Standard:** V1.1  
**Current runtime:** V0.9.1

## 1. Product identity

Lucky Numbers is a premium daily symbolic ritual with a playful reveal. It should feel like a
luxury kinetic oracle belonging to the Little Ganesha world, not a lottery terminal, slot machine,
casino game or disposable random-number utility.

The emotional sequence is: **anticipation → kinetic mixing → sequential reveal → meaning → calm**.

## 2. Number contract

1. Candidate pool: integers `0..9`.
2. Daily output: exactly three unique digits.
3. Roles are ordered: **Core Number → Supporting Number → Balancing Number**.
4. Selection occurs only when the user deliberately starts the reveal.
5. Selection probability is never affected by profile, language, tarot history, support/payment
   state or any other product state.
6. Use a cryptographically strong browser RNG when available, with unbiased rejection sampling.
7. Once a day's set is created, it never rerolls before the next device-local day.
8. An interrupted animation keeps the already-fixed daily set.
9. Replay repeats presentation only and never changes selection.
10. A V0.9.0 same-day record containing three unique digits from `1..9` remains valid after upgrade;
    upgrading must not manufacture a new chance at zero on the same day.

## 3. Zero contract

Zero is a first-class symbolic digit, not a null value. Its interpretation centers on potential,
space, reset, openness and creating room for what comes next. It can appear in any of the three
roles with independently authored English, Thai and Hindi guidance.

The kinetic machine must visibly contain ten orbs labelled `0` through `9`.

## 4. Numeral legibility

Lucky-number glyphs are information, not decorative lettering. Digits must be instantly
recognisable on small mobile screens. In particular, `1` must not resemble uppercase `I`.
Use a dedicated lining-numeral serif treatment for machine orbs, result orbs, number-set chips and
exports; do not inherit the decorative brand display face for Lucky-number glyphs.

## 5. Interpretation contract

Each digit has one native-language symbolic profile with four parts: keyword, Core-role guidance,
Supporting-role guidance and Balancing-role guidance. The combined pattern connects all three roles
without claiming that numbers control external events.

Interpretation should be clear, mature and useful, without generic mystical filler or fake certainty.

## 6. Today's Number Set

After completion, derive a small curated set of number forms from the exact stored digits:

- the three single digits;
- the Core→Supporting pair;
- the Supporting→Balancing pair;
- one three-digit form preserving role order, rotated only when needed to avoid a leading zero.

Leading zero is never used to create a pseudo-number such as `029`; rotate the three-digit form to
the first non-zero digit while preserving cyclic role order. Remove duplicates.

This section is symbolic presentation only. It must never be labelled as lottery, betting, jackpot,
winning, odds, payout or financial guidance.

## 7. Gambling boundary

Lucky Numbers must not provide or imply lottery prediction, betting advice, odds, jackpots, payouts,
guaranteed luck, investment outcomes or repeated rerolls until a preferred result appears. Visible
copy and exported artwork must preserve the reflective/symbolic framing.

## 8. Kinetic Oracle presentation

The machine is a responsive code-rendered 2.5D object using brass, glass and crystal-orb cues.
Motion should feel weighty and premium: ten balls collide inside the chamber, the mechanism rotates,
and three selected balls exit one by one. Avoid arcade bounce, neon casino palettes, slot reels,
coins, payout counters or cartoon plastic-gacha styling.

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

Storage key remains `lgt.lucky.v1`. A valid record contains schema, local date, three unique digits
in `0..9`, creation timestamp and completion state. Old-day records are ignored rather than reused.

## 12. Save / Share

Save/Share is available only after completion. Exports show the exact stored numbers, selected UI
language, symbolic meanings and Today's Number Set. Sharing never changes or regenerates the result.

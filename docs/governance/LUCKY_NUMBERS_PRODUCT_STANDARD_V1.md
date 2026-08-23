# Lucky Numbers — Product Standard V1

**Product:** Little Ganesha Tarot — The Golden Path  
**Feature:** Lucky Numbers  
**Standard:** V1  
**First runtime:** V0.9.0

## 1. Product identity

Lucky Numbers is a premium daily symbolic ritual with a playful reveal. It should feel like a
luxury kinetic oracle belonging to the Little Ganesha world, not like a lottery terminal, slot
machine, casino game or disposable random-number utility.

The emotional sequence is: **anticipation → kinetic mixing → sequential reveal → meaning → calm**.

## 2. Number contract

1. Candidate pool: integers `1..9`.
2. Daily output: exactly three unique numbers.
3. Roles are ordered: **Core Number → Supporting Number → Balancing Number**.
4. Selection occurs only when the user deliberately starts the reveal.
5. Selection probability is not affected by profile name, birth date, language, tarot history,
   support/payment state or any other product state.
6. Use a cryptographically strong browser RNG when available.
7. Once a day’s set is created, it never rerolls before the next device-local day.
8. An interrupted animation keeps the already-fixed daily set and offers continuation.
9. Replay may repeat presentation only; it must never change selection.

## 3. Interpretation contract

Each number has one native-language symbolic profile with four parts: keyword, Core-role guidance,
Supporting-role guidance and Balancing-role guidance. The combined pattern must connect all three
roles without claiming that the numbers control external events.

Interpretation language should be clear, mature, specific enough to be useful and free of generic
mystical filler. It may suggest attention, pacing, boundaries, reflection or practical behavior.

## 4. Gambling boundary

Lucky Numbers must not provide or imply:

- lottery picks or lottery prediction;
- gambling combinations, odds or betting advice;
- jackpot/payout framing;
- guaranteed luck, money or investment outcomes;
- a mechanism to reroll repeatedly until the user likes a result.

Visible product copy and exported artwork must preserve the symbolic/reflection framing.

## 5. Kinetic Oracle presentation

The machine is a responsive code-rendered 2.5D object using brass, glass and crystal-orb cues.
Motion should feel weighty and premium: balls collide inside the chamber, the mechanism rotates,
and selected balls exit one by one. Avoid arcade bounce, neon casino palettes, slot reels,
coins, payout counters or cartoon plastic-gacha styling.

Sound cues are restrained synthesized mechanical/chime accents. They follow the app's sound-enabled
state. Haptics are optional enhancement only and must fail silently on unsupported devices.

## 6. Accessibility

- Respect the app/system reduced-motion preference.
- Reduced motion keeps the same selection and three-step reveal but omits the high-motion mixing.
- All primary controls remain keyboard/focus accessible.
- Canvas has localized accessible text.
- Result meaning is duplicated as selectable DOM text, never canvas-only.

## 7. Localization

English, Thai and Hindi are first-class. Localize UI, interpretation, accessibility, daily lock,
countdown, Save/Share status and export artwork. Do not translate the canonical English brand
masthead `LITTLE GANESHA TAROT / THE GOLDEN PATH`.

## 8. Persistence

Storage key: `lgt.lucky.v1`. A valid record contains schema, local date, three unique numbers,
creation timestamp and completion state. Old-day records are ignored rather than reused.

## 9. Save / Share

Save/Share is available only after completion. Exports must show the exact stored numbers and the
current selected UI language. Sharing never changes or regenerates the daily result.

# QA — Lucky Repeatable Digits V1

**Baseline GitHub HEAD:** `bb71f9ac31088a656c7db4de2ce8f0793aa5757c` (`Enforce fullscreen app mode`)  
**Scope:** Lucky Numbers only  
**Risk strategy:** smallest source-owner patch; no Reading Engine, Deck Ritual, audio, profile, support, localization content, Fullscreen, Portrait Lock or Zoom Lock logic changed.

## Static / automated checks

PASS:

- `js/lucky-storage.js` JavaScript syntax.
- `js/lucky-machine.js` JavaScript syntax.
- `js/lucky-content.js` JavaScript syntax.
- deterministic RNG test proves `777`, `000`, and `121` are accepted as three independent draws.
- storage schema/key remain unchanged (`schema: 1`, `lgt.lucky.v1`).
- same-day previous unique-digit records remain valid.
- machine creates exactly 30 physical orbs: three copies of each digit 0–9.
- repeated reveal selects an unused physical copy of the matching digit for each slot.
- chamber external canvas footprint and three result-slot positions remain unchanged.
- chamber radius increases only slightly; mixing-orb radius is reduced to preserve kinetic room.
- repeat-aware combined interpretation is covered for all-same and each two-position repeat topology in English, Thai and Hindi.
- unique-digit combined interpretation remains byte-for-word identical to the previous output contract.
- Today’s Number Set deduplicates repeated display forms without altering the stored three-role result.
- Fullscreen patch assets remain present; only Lucky asset cache keys are advanced.
- no Lucky export, SFX, UI, tarot, journal, reading or audio module is changed.


## Rollback baseline integrity

The emergency rollback bundle restores these exact Git blobs from GitHub `main` at the baseline HEAD:

- `index.html` — `626304476db329fbe70f8721cbeb101ad0e74aed`
- `sw.js` — `e843c552807b78fd9fda5c6c4fcfe1b0a9fb4e02`
- `js/lucky-storage.js` — `f9b7862b85e93e255fc15b9efac47498dc20a1d0`
- `js/lucky-machine.js` — `fb8691408f509e0973816ec59fbf027e4172feb3`
- `js/lucky-content.js` — `4d00f2142cfda15285d98af52a8f44c2773d45bf`

## Required real-device smoke check

After upload, verify on the actual target phone:

1. Open Lucky Numbers and confirm the chamber visibly contains a denser 30-orb field without clipping.
2. Turn the oracle; confirm animation remains smooth and the three result wells are unchanged.
3. Existing same-day result does not reroll after upgrade.
4. On a later day, repeated digits are allowed; if a repeat occurs, separate physical balls occupy separate wells.
5. Reduced Motion still reveals the same stored digits sequentially.
6. Replay does not reroll.
7. Save/Share preserves repeated digits exactly.
8. For a repeated result, confirm Today’s Pattern describes the repeated quality naturally without awkward duplicate wording.

No claim of real-device PASS is made by this package.

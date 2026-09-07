# Lucky Repeatable Digits V1 — Release Notes

This maintenance patch corrects Lucky Numbers from sampling three unique digits to three independent
`0..9` role draws. Each role now gives every digit a 10% chance, repeated digits are valid, and all
ordered results `000..999` have equal probability `1/1000`.

The Kinetic Oracle now contains 30 physical mixing orbs (three copies of each digit). Its overall
canvas footprint and three result wells are preserved; the glass chamber grows only slightly and
mixing orbs are proportionally smaller. Repeated results use distinct physical orb instances.

Existing same-day records, daily lock, Replay behavior, role-specific number meanings, Save/Share,
SFX, reduced motion, Fullscreen, Portrait Lock, Zoom Lock and all tarot-reading systems are
intentionally preserved. The combined “Today’s Pattern” copy is upgraded only for repeated-digit
results so duplicate keywords read naturally instead of being mechanically repeated. Unique-digit
combined interpretations retain the existing wording.

Because the existing Lucky export renderer already consumes the shared `LGTLuckyContent.pattern()` output,
the repetition-aware combined interpretation is automatically preserved in Save/Share artwork without
modifying the export engine.

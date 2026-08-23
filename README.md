# Little Ganesha Tarot — V0.7.0 Signature Focus System + Remove the Obstacle

**Studio:** Benedict Interactive  
**Target runtime:** V0.7.0  
**Baseline runtime:** V0.6.2  
**Baseline GitHub HEAD:** `dddf4483b34ccac8b31a2ac7a81695821ea6d39c` — `Refine Golden Path layout V0.6.2`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)

## What ships

V0.7.0 ships **Remove the Obstacle** and upgrades the three multi-card consultation modes to one consistent Focus discipline:

- Three-Card Reading
- The Golden Path
- Remove the Obstacle

All three use six Focuses: General Life, Love & Relationships, Career & Work, Money & Resources, Well-being & Balance, and Personal Growth.

## Daily Focus discipline

Each Focus can produce **one completed reading per device-local calendar day**. Completing Career does not block Love, Money, or another Focus. Re-entering a Focus already completed today restores the same cards and deterministic reading instead of rerolling.

The Focus picker marks completed topics with a gold check, **Read today / อ่านแล้ววันนี้**, and **Tap to revisit today’s reading / แตะเพื่อดูผลเดิม**. It also shows how many of the six Focuses have been explored today. Quiet Countdown appears inside a completed reading and applies to that Focus only.

Entering a mode, choosing a Focus, or leaving before the reading reaches `interpreted` does not consume that Focus for the day.

## Three-Card Focus consultation

Three-Card keeps its protected Past → Present → What May Unfold Next structure, but the interpretation is now authored through the selected Focus. The narrative reads all three cards as one consultation and uses Focus-specific card lenses rather than dictionary meanings.

## Remove the Obstacle

The spread is:

1. The Obstacle
2. What Feeds It
3. What Releases It

The reading then synthesizes what is really happening, the knot, the release point, first moves, a caution, and a forward reflection question. Money and well-being Focuses keep explicit safety boundaries.

## Protected behavior

V0.7.0 does not modify Reading Engine 1.1.0, Deck Ritual 1.1.0, the 78-card pre-shuffle/prebound selection contract, Daily Guidance, Ask Ganesha, audio lifecycle, profile behavior, or the PWA fetch strategy beyond required build/cache identity updates.

## Acceptance

Static/package QA is included. Real-device acceptance remains required for Focus status visibility, per-Focus restore, cross-Focus independence, Three-Card Focus interpretation, Remove the Obstacle, Save/Share, viewers, day rollover, and protected-mode smoke tests.

# Release Notes — V0.6.0 The Golden Path

## New playable mode

**The Golden Path** is now implemented as a full reading mode.

It is intentionally different from Three-Card Reading:

- Three-Card Reading follows **Past → Present → What May Unfold Next**.
- Golden Path follows **Where You Stand → What Blocks the Path → The Way Forward**.

The final card is direction, not a fixed future prediction.

## Focus before the draw

Users choose one of six contexts before shuffling:

1. General Life
2. Love & Relationships
3. Career & Work
4. Money & Resources
5. Well-being & Balance
6. Personal Growth

The chosen focus affects interpretation only. The shared Reading Engine still shuffles all 78 cards before display, binds real cards to facedown positions, and preserves no-duplicate selection integrity.

## Integrated interpretation

Golden Path does not output three isolated card definitions. The mode reads the full spread as one consultation and adds:

- Your Path at a Glance
- position-level contextual reading
- Your Golden Path synthesis
- What to Do Next (three practical steps)
- one reflection question that directly connects the block card with the forward card

English and Thai are independently authored for native reading quality.

## Same-day discipline

One **completed** Golden Path reading is allowed per device-local calendar day.

Incomplete entry does not consume the day. After completion, reopening restores the same focus and same three cards, recreates the same reading conclusion deterministically, and shows the Quiet Countdown until the next local day.

## Result utilities

Golden Path includes:

- tap-to-enlarge artwork for each revealed card,
- Save Image,
- Share with Save fallback,
- mobile-first responsive presentation,
- keyboard-accessible card enlargement,
- reduced-motion support through shared project behavior.

## Safety framing

Money readings are reflective and do not promise returns or replace financial judgment. Well-being readings address balance, rest, boundaries, pace, and emotional load; they do not diagnose illness or replace qualified medical care.

## Repository cleanliness

The runtime package contains only files that belong in the repository. No installer, apply script, backup folder, package-only checksum file, or staging artifact is part of the upload set.

After upload, remove `PATCH_MANIFEST_V0_5_4.json` so the root retains one current runtime manifest only.

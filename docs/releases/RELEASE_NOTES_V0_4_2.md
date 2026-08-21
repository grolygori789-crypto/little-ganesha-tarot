# Little Ganesha Tarot — V0.4.2 Release Notes

## Summary

V0.4.2 upgrades Daily Guidance from a strong one-card reading into a richer daily experience while preserving the calm, premium presentation of the app.

## Reading presentation

### Hero card enlargement

The revealed tarot card is now substantially larger on portrait mobile screens so the deck artwork becomes the clear visual hero and fine illustration details are easier to appreciate.

### Media Player layout fix

The contextual player positioning defect that could push the player toward or beyond the left edge is corrected at the positioning root cause. The player remains compact inside a Reading view but is centered and bounded.

## Daily Lenses

Every one of the 78 cards now has six optional perspectives in both English and Thai:

- Work & Goals
- Money & Resources
- Love & Relationships
- Inner State & Balance
- Opportunities & Watch-outs
- Guidance for Today

This adds 936 card/language/lens text entries in total.

The lenses are expandable rather than displayed as six full text blocks at once, preserving hierarchy and reducing visual clutter.

## Content philosophy

Daily Lenses are reflective guidance, not deterministic predictions. They avoid guaranteed financial outcomes, medical claims, lottery promises, or fixed relationship/future outcomes.

## Persistence compatibility

Daily Guidance content advances to `daily-guidance-v3`. Existing same-day selections from content v1/v2 are migrated to the new content version without drawing a new card.

## Repository delivery structure

V0.4.2 adopts canonical repository-ready packaging. New QA, release, checksum, governance, and test files are placed into their appropriate `docs/` categories before handoff.

See `docs/governance/REPOSITORY_STRUCTURE_POLICY_V1.md`.

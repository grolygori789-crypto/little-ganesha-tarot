# Release Notes — V0.7.0

## Signature Focus System + Remove the Obstacle

Baseline: `dddf4483b34ccac8b31a2ac7a81695821ea6d39c` (V0.6.2).

### New

- Remove the Obstacle is playable with 78-card full-deck ritual, three unique selections, six Focuses, connected narrative, Save/Share, card viewer, and Quiet Countdown.
- Three-Card Reading now has the same six-Focus entry model as Golden Path and Remove the Obstacle.
- Three-Card interpretation is Focus-aware while retaining Past / Present / What May Unfold Next.

### Daily Focus rule

- One completed reading **per Focus per mode per local day**.
- A completed Focus restores the same cards and deterministic conclusion for the remainder of that local day.
- Other Focuses remain available.
- Incomplete readings do not consume a Focus.
- Focus cards visibly show `Read today / อ่านแล้ววันนี้` and remain tappable to revisit.
- Focus picker shows today’s completed count out of six.
- Quiet Countdown applies to the currently completed Focus.

### Migration

- Existing V0.6.x Golden Path daily record migrates to the same stored Focus.
- Existing V0.6.x Three-Card daily record migrates to General Life for the current local day, preserving its cards instead of silently rerolling.

### Protected

Reading Engine 1.1.0 and Deck Ritual 1.1.0 are unchanged. Daily Guidance, Ask Ganesha, audio lifecycle, profile, and existing Golden Path editorial presentation remain protected.

# Little Ganesha Tarot — App Foundation V0.3.3

**Milestone:** Premium Sacred Home Motif System  
**Base:** V0.3.2 PWA Installability & App Icon Wiring  
**Master Plan:** V3.4

## V0.3.3 adds
- A reusable **Premium Minimal Sacred UI** motif language for the Home/Menu.
- Lightweight SVG motifs for each current Home feature instead of repeating full Little Ganesha portraits.
- Distinct symbolic fingerprints for Daily Guidance, Ask Ganesha, Three-Card Reading, The Golden Path, Remove the Obstacle, Lucky Numbers, Card Library, and Journal.
- Typography-safe decorative layering: copy and controls remain above all motif artwork.
- Very slow full-motion motif breathing plus a static Reduced Motion fallback.
- Restrained focus/hover/touch polish without changing navigation behavior.
- Service-worker shell caching for the new motif assets.
- Build/cache version 0.3.3.
- Master Plan V3.4 with the visual-language decision locked canonically.

## Protected behavior
This patch deliberately does **not** redesign or refactor:
- Benedict Interactive splash
- Title/Living Title
- TH/EN switching
- Personal Profile / Date of Birth
- Home information architecture
- Settings / Immersive Mode
- audio engine / global Mini Player
- background/foreground audio lifecycle
- Support placeholders
- PWA manifest/icon wiring
- reading logic placeholders

## Deployment
Overlay this package on the repository root and commit/push normally.

Suggested commit:

`Add premium sacred home motifs`

## Real-device acceptance focus
After GitHub Pages deploys:
1. Confirm all Home cards remain easy to read in Thai and English.
2. Confirm each feature has a distinct but quiet motif.
3. Confirm motifs feel present within 2–3 seconds without becoming decorative clutter.
4. Confirm cards remain tappable and navigation behavior is unchanged.
5. Confirm Reduced Motion keeps the motifs visible but static.
6. Confirm the Mini Player and bottom navigation remain visually above/clear of the Home content.
7. Re-check PWA install/icon behavior from V0.3.2.

See `HOME_MOTIF_RELEASE_NOTES.md` and `QA_V0_3_3.md` for implementation and validation details.

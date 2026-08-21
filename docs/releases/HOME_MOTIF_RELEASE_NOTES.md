# V0.3.3 — Premium Sacred Home Motif Release Notes

## Product decision
The Home/Menu will **not** repeat full Little Ganesha character artwork inside every feature card. That approach would weaken hierarchy, increase visual noise, and make the product feel more like a decorated poster than a premium application.

V0.3.3 establishes a symbolic visual language instead: the user should feel Little Ganesha's presence through sacred geometry, gold line art, path forms, lotus cues, card structures, and one restrained abstract Ganesha profile.

## Canonical motif map
- **Daily Guidance** — halo + sacred sparkle / dawn geometry.
- **Ask Ganesha** — abstract ear/trunk half-profile line motif.
- **Three-Card Reading** — triad of tarot-card outlines.
- **The Golden Path** — curved luminous path leading to a halo/star.
- **Remove the Obstacle** — loosening/opening knot geometry.
- **Lucky Numbers** — restrained numerology/constellation circle.
- **Card Library** — layered tarot-card outlines.
- **Journal** — manuscript/open-page lines with lotus seal.

## Engineering approach
- Motifs are standalone SVG assets under `assets/motifs/`.
- Feature mapping uses the existing `data-feature` attributes; no new click handlers or navigation routes are introduced.
- Decorative layers are implemented with CSS pseudo-elements and `pointer-events: none`.
- Foreground copy/control children are raised above motifs with local stacking context.
- Full Motion uses a very slow breathe/drift animation.
- Reduced Motion disables the motif animation but does not remove the motifs.
- Motifs are cached in the V0.3.3 service-worker application shell.

## Visual constraints
- Gold line work only; no saturated multi-color illustration inside Home cards.
- Motifs remain deliberately low-opacity.
- No motif may reduce copy contrast or block a touch target.
- Hover/focus polish is restrained and must not become a desktop-only dependency.
- SVGs remain lightweight and density-independent for worldwide devices.

## Regression boundary
No intentional behavior change was made to app navigation, audio, profile, settings, Support, PWA manifest, icon identity, or reading placeholders.

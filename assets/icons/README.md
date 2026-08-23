# Little Ganesha Tarot — Canonical Universal App Icon Pack

Status: **FINAL / CANONICAL / WIRED** for runtime V0.7.1.

## Canonical design

The V0.7.1 icon system replaces the earlier edge-framed launcher artwork with one
universal, mask-safe Little Ganesha identity.

Design locks:

- Little Ganesha remains the single recognizable protagonist.
- The tarot card in his hand uses the **canonical production card-back artwork**.
- No platform-critical border, ornament, or line is allowed to touch the outer icon edge.
- The background is full-bleed royal plum so circular, squircle, rounded-square, and square
  launcher masks remain visually intentional.
- A restrained internal gold halo/ring provides structure without becoming a crop hazard.
- Essential identity details stay within the adaptive safe zone.
- No title text is embedded in the production icon.
- Platform files are derivatives of one canonical master; do not independently redraw them.

## Files

- `app-icon-1024.png` — canonical 1024×1024 raster master.
- `icon-512x512.png` — standard PWA/launcher derivative.
- `icon-192x192.png` — standard PWA/launcher derivative.
- `icon-maskable-512x512.png` — more conservative Android/Chromium maskable derivative.
- `apple-touch-icon.png` — 180×180 iPhone/iPad Home Screen derivative.
- `favicon-48x48.png` — browser/favicon derivative.
- `favicon-32x32.png` — browser/favicon derivative.
- `favicon.ico` — 16/32/48 fallback bundle.

## Integration

`manifest.webmanifest` references separate `any` and `maskable` assets. `index.html`
references the Apple touch icon and favicon set. Runtime V0.7.1 cache-busts icon URLs so
new launcher assets are not confused with the previous pack.

## Replacement rule

Future replacements are brand-level changes. They require an explicit approved product
decision plus release documentation and mask/safe-zone QA. Cosmetic experimentation alone
is not sufficient reason to replace this pack.

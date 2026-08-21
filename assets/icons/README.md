# Little Ganesha Tarot — Canonical App Icon Pack

Status: **FINAL / CANONICAL / WIRED** under Master Plan V3.3 and app build V0.3.2.

Files:
- `app-icon-1024.png` — canonical raster master for current web/PWA production.
- `icon-512x512.png` — standard PWA/launcher derivative.
- `icon-192x192.png` — standard PWA/launcher derivative.
- `icon-maskable-512x512.png` — Android/Chromium maskable-safe derivative.
- `apple-touch-icon.png` — 180×180 iPhone/iPad Home Screen derivative.
- `favicon-48x48.png` — browser/favicon derivative.
- `favicon-32x32.png` — browser/favicon derivative.
- `favicon.ico` — 16/32/48 fallback bundle.

Integration:
- `manifest.webmanifest` references the 192, 512, and maskable 512 assets using relative repository-safe URLs.
- `index.html` references the manifest, Apple touch icon, and favicon set.
- `js/pwa.js` registers `sw.js` from the application root.
- `sw.js` provides an offline application shell and versioned cache cleanup without pre-caching the full 78-card deck or audio library.

Rules:
- Do not add title text inside the production app icon.
- Do not independently redraw the icon per platform.
- Preserve the canonical Little Ganesha identity and tarot-card cue.
- Future icon replacement is a brand-level change and requires a Master Plan update.

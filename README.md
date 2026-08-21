# Little Ganesha Tarot — Reading Engine V0.4.0 Upload Candidate

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Master Plan:** V3.7  
**Candidate runtime:** V0.4.0  
**Last canonical runtime before this candidate:** V0.3.6

## Status

V0.4.0 is the first Reading Engine feature candidate. It adds the shared tarot-reading foundation and the first complete vertical slice, **Daily Guidance**, while preserving the approved V0.3.6 Home/PWA/audio/profile foundation.

This package is **verified for upload at QA-S / package-integrity level**. It is **not yet canonical**. Browser automation was attempted but the development environment blocked page navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`; deployed and real-device validation therefore remain required before canonical promotion.

## V0.4.0 scope

- canonical 78-card machine-readable reading model,
- stable card IDs `00–77` and exact canonical front-image mapping,
- reusable spread definitions for Daily Guidance, Ask Ganesha, Three-Card Reading, The Golden Path, and Remove the Obstacle,
- shared Web-Crypto-based unique draw/shuffle helpers,
- explicit Reading Session state machine,
- upright-first, reversal-ready schema,
- Daily Guidance premium shuffle → choose → reveal → interpret flow,
- same-local-day persistence to prevent endless rerolling,
- English/Thai reading content and reflection prompts,
- graceful card-art fallback if a front image is unavailable,
- Reduced Motion support,
- Reading interaction event hooks reserved for later subtle SFX integration,
- V0.4.0 Service Worker/cache coherence without pre-caching all 78 high-resolution card fronts.

## Protected foundations intentionally not rewritten

- `js/audio.js`
- `js/pwa.js`
- `manifest.webmanifest`
- `css/app.css`
- audio assets
- icons
- Home motifs
- title hero
- canonical card back
- canonical 78 card-front assets

`index.html`, `js/app.js`, and `sw.js` are changed only where V0.4.0 wiring/build/cache integration requires it. Regression tests prove that reversing those isolated changes reproduces the exact canonical V0.3.6 Git blob identities.

## QA / rollback

See:

- `QA_V0_4_0.md`
- `RELEASE_NOTES_V0_4_0.md`
- `PATCH_MANIFEST_V0_4_0.json`
- `PATCH_UPLOAD_NOTES.md`
- `CHECKSUMS_V0_4_0.sha256`
- `docs/test-reading-engine.js`
- `docs/test-package.js`

A separate V0.3.6 restore archive is retained for the HIGH-risk Service Worker/cache portion of this change.

## Canonical promotion rule

Do not call V0.4.0 canonical until the package is pushed/deployed, the repository state is re-read, and the required real-device reading/PWA regression gates pass. Until then, Master Plan V3.7 correctly retains V0.3.6 as the last canonical runtime baseline.

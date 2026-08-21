# Little Ganesha Tarot — V0.3.2 PWA Installability Patch

## Purpose
Turn the existing GitHub Pages experience from a browser shortcut into a properly described installable web app where supported, while preserving the stable V0.3.1 application behavior.

## Added
- `manifest.webmanifest` with relative GitHub-Pages-safe `start_url` and `scope`.
- Canonical 192, 512, maskable 512, Apple touch, and favicon wiring.
- Android/Chromium `display: standalone` application metadata.
- iPhone/iPad Home Screen metadata and explicit Apple touch icon.
- `js/pwa.js` service-worker registration and future install-prompt foundation.
- `sw.js` versioned application-shell cache with old-cache cleanup.
- Network-first navigation/scripts/styles to reduce stale-build regressions.
- Runtime image caching without pre-caching the 78-card deck or music library.
- Build/cache version update to `0.3.2`.

## Protected behavior intentionally unchanged
- Benedict Interactive splash and timing.
- Living Title behavior.
- Language switching.
- First-entry profile flow.
- Home/Menu foundation.
- Settings behavior.
- Audio engine and Mini Player.
- Background/foreground audio lifecycle.
- Immersive Mode behavior.
- Support placeholders.

## PWA path strategy
The manifest and service worker use relative paths (`./`) so the application remains correct at the current GitHub Pages project URL and is easier to migrate to a future custom domain without hard-coding the GitHub username/repository path.

## Cache strategy
The service worker pre-caches only the essential application shell. Large audio and the complete tarot deck are deliberately excluded from install-time pre-cache to avoid slow first installation, excessive storage, and failures on constrained mobile connections.

## Runtime validation status
Static validation can confirm syntax, manifest structure, file existence, dimensions, and path resolution. Actual browser install UI (for example Chrome showing “Install app” rather than “Create shortcut”) remains a real-device/browser deployment test and must not be claimed before the pushed GitHub Pages build is tested.

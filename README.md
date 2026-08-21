# Little Ganesha Tarot — App Foundation V0.3.2

**Milestone:** PWA Installability & App Icon Wiring  
**Base:** V0.3.1 Personal Profile / Home / Settings foundation  
**Master Plan:** V3.3

## V0.3.2 adds
- Web App Manifest.
- Canonical app icon wiring for Chromium/Android.
- Maskable Android icon.
- Apple touch icon wiring for iPhone/iPad Home Screen.
- Browser favicon wiring.
- Service worker registration.
- Offline application-shell caching.
- Cache cleanup/versioning designed for rapid GitHub Pages deployments.
- `window.LGTPWA` installability foundation for a future in-app Install button if desired.

## Stable V0.3.1 behavior preserved
This build deliberately avoids refactoring the established screen, profile, settings, motion, immersive, and audio systems. The PWA integration is isolated in `manifest.webmanifest`, `js/pwa.js`, `sw.js`, metadata additions to `index.html`, and build-version changes.

## Deployment
Overlay this package on the repository root and commit/push normally. GitHub Pages must serve the project over HTTPS.

Suggested commit:

`Add PWA installability and icon wiring`

## Real-device acceptance test
After GitHub Pages finishes deploying:
1. Open the deployed app in Chrome on Android.
2. Reload once so the manifest/service worker are observed.
3. Open the browser menu and check for an app installation option.
4. Confirm the Little Ganesha icon is shown in the install UI.
5. Install and launch from the Home Screen/app launcher.
6. Confirm it opens in standalone/app-like mode and the existing app behavior still works.
7. On iPhone/iPad, use Share → Add to Home Screen and confirm the Apple touch icon and standalone launch behavior.

If the browser has cached an older shortcut/manifest, remove the old Home Screen shortcut or installed web app before validating the new icon.

See `PWA_RELEASE_NOTES.md` for architecture and validation notes.

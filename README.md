# Little Ganesha Tarot — App Foundation V0.3.5

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Master Plan:** V3.5

## Purpose
V0.3.5 rebuilds the Home visual system from the stable V0.3.2 application/PWA baseline after V0.3.3 and V0.3.4 failed real-device visual QA.

## Key changes
- Removes duplicate foreground symbols from Primary/Signature cards.
- Introduces one clean anchored sacred motif per major Home path.
- Uses a single compact icon system for Explore cards.
- Re-establishes deterministic Thai/English typography hierarchy.
- Makes the Home header visually opaque enough that scrolled content cannot bleed through it.
- Stops automatic Fullscreen API requests on `TAP TO BEGIN`.
- Browser full screen is now explicitly user-triggered from Settings only.
- Installed PWA behavior remains `display: standalone` through the manifest.
- Preserves audio, onboarding/profile, settings, PWA, support placeholders, and navigation foundations.

## Important QA boundary
Static and structural validation is comprehensive, but final visual acceptance still requires P'Benz to inspect the deployed build on a real mobile display after GitHub Pages deployment.

See `QA_V0_3_5.md` and `RELEASE_NOTES_V0_3_5.md`.

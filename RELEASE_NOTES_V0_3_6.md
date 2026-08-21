# Little Ganesha Tarot — V0.3.6 Premium Home Polish

## Objective
Refine the already-stable V0.3.5 Home experience without another architectural rebuild.

## Changes
- tighter, calmer Home header and a soft lower-edge transition
- improved Thai/English typography rhythm
- Thai personalized greeting no longer uses an English comma
- simplified sacred motif geometry, especially Ask Ganesha
- slightly stronger Explore icon visibility
- more compact global Mini Player while retaining all controls
- build/cache bust moved to 0.3.6

## Explicitly unchanged
- audio engine and track lifecycle
- PWA registration logic and manifest
- navigation event wiring
- profile storage / birth-date behavior
- Support placeholders
- fullscreen policy (Settings only in browser; standalone PWA remains app-like)
- tarot/card production assets

## Release posture
This is a polish release, not a feature release. Any post-deployment real-device regression should block Reading Engine work until corrected.


## Post-deployment acceptance

V0.3.6 was deployed to GitHub Pages under commit `d7c6fb7657fa2cb88d7ed0a6194d7439c959f4bc`. Android real-device review of TH/EN Home screens passed. The canonical Little Ganesha launcher icon is also confirmed on the Android Home Screen.

**Final Home status:** APPROVED / CANONICAL.

Further Home polish is frozen unless a concrete defect, accessibility issue, performance issue, compatibility issue, or meaningful product improvement justifies reopening the screen.

Full iPhone/iPad PWA real-device validation remains pending and is tracked separately from Home acceptance.

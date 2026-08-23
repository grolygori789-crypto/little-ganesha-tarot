# Little Ganesha Tarot — Universal App Icon System V1

**Status:** Canonical governance addendum  
**Effective runtime:** V0.7.1  
**Baseline:** V0.7.0 real-device accepted  
**Baseline GitHub HEAD:** `102511d1a076defd83b805c5983719f4b0c9a379` — `Add Signature Focus system V0.7.0`

## Authority

This addendum records the approved brand-level replacement of the production app icon.
Under Master Plan V4.1 §0.1 source-of-truth order, this current approved decision supersedes
the older §4.6 statement that the previous app icon was canonical.

No tarot reading logic, shuffle integrity, storage behavior, interpretation engine, audio
lifecycle, or profile behavior is changed by this addendum.

## Product reason

Two concrete production defects justified replacement:

1. the tarot card shown in the launcher icon did not match the canonical in-app card back;
2. the previous edge-adjacent gold frame produced visible crop fragments under some circular
   launcher masks.

The replacement is therefore a consistency and compatibility correction, not cosmetic churn.

## Canonical visual contract

- Little Ganesha remains the central identity.
- The held tarot card carries the canonical production card-back design.
- The icon uses a full-bleed royal-plum background.
- No essential stroke or border touches the outer canvas edge.
- The gold structural ring is internal and safely inset.
- Face, crown, trunk, and tarot cue remain recognizable at small sizes.
- The composition must survive circle, squircle, rounded-square, and square masks.
- No embedded wordmark or title text.
- Standard and maskable files derive from the same master identity.

## Adaptive / maskable contract

The standard master keeps a fuller composition for platforms that preserve more of the
square. The maskable derivative uses a deliberately more conservative inset so essential
content remains inside the central safe region even when Android launchers apply aggressive
masks.

Do not fake platform shapes into the source artwork. The launcher owns the final mask.

## Canonical files

- `assets/icons/app-icon-1024.png`
- `assets/icons/icon-512x512.png`
- `assets/icons/icon-192x192.png`
- `assets/icons/icon-maskable-512x512.png`
- `assets/icons/apple-touch-icon.png`
- `assets/icons/favicon-48x48.png`
- `assets/icons/favicon-32x32.png`
- `assets/icons/favicon.ico`

## QA gate

A future icon change fails release if any of the following occurs:

- canonical card-back mismatch;
- visible clipped line or border in a circle mask;
- essential face/crown/card cue outside the mask-safe area;
- illegibility at launcher scale;
- inconsistent standard vs maskable identity;
- text embedded in the production icon;
- stale manifest/index/Service Worker icon references.

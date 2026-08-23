# Little Ganesha Tarot — V0.6.1 Golden Path Hotfix

**Studio:** Benedict Interactive  
**Target runtime:** V0.6.1  
**Baseline runtime:** V0.6.0  
**Baseline GitHub HEAD:** `0ba83f9e24d23e2bd27b6ad99c02218e174fc182` — `Add Golden Path V0.6.0`  
**Reading Engine:** 1.1.0 (unchanged)  
**Risk:** HIGH operationally because runtime cache/SW identity changes; functional code change is isolated to Golden Path UI.

## Purpose

V0.6.1 corrects two real-device defects in the V0.6.0 Golden Path card-selection stage:

1. the 78 facedown choices displayed broken image placeholders instead of the canonical card back;
2. after the first card was chosen, the remaining cards became unavailable, preventing the second and third selections.

Both defects had one shared integration cause: Golden Path created the protected Deck Ritual without passing the multi-card spread configuration used by Three-Card Reading.

## Fix

Golden Path now invokes Deck Ritual with the accepted multi-card configuration:

- canonical `CONTENT.cardBack`,
- candidate count from the pre-shuffled 78-card session,
- `selectionLimit: 3`,
- six rows,
- full-deck variant.

The shared Reading Engine and Deck Ritual implementation themselves are unchanged.

## Golden Path contract preserved

- six Focus choices remain unchanged;
- full 78-card deck is shuffled before display;
- each facedown position remains bound before selection;
- exactly three unique cards are selected;
- positions remain Where You Stand / What Blocks the Path / The Way Forward;
- the three cards are interpreted as one connected consultation;
- only a completed reading consumes the local calendar day;
- reopening on the same local day restores the same Focus, cards and conclusion;
- Quiet Countdown remains active after completion;
- Save / Share and tap-to-enlarge remain available.

## Protected behavior

V0.6.1 does not modify Reading Engine 1.1.0, Deck Ritual 1.1.0, Daily Guidance, Ask Ganesha, Three-Card Reading, Golden narrative/storage/export/viewer logic, profile, audio lifecycle, or the PWA fetch strategy. Service Worker changes are build/cache identity updates required for coherent delivery of the hotfix.

## Repository cleanliness

The repository root must keep **one current Patch Manifest only**. After V0.6.1 is uploaded, remove all superseded root manifests and keep only `PATCH_MANIFEST_V0_6_1.json`.

Delivery utilities, installers, temporary backups, staging folders and package-only checksum files stay outside the repository. `CHECKSUMS_SHA256.txt` remains one rolling current-release file.

## Acceptance

Static/package QA passes for V0.6.1. Real-device acceptance remains required for the corrected Golden Path selection flow and the protected completion/restore/countdown flow.

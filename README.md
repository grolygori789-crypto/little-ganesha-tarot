# Little Ganesha Tarot — V0.6.2 Golden Path Layout Refinement

**Studio:** Benedict Interactive  
**Target runtime:** V0.6.2  
**Baseline runtime:** V0.6.1  
**Baseline GitHub HEAD:** `9d8be0b6b27d1e2f00856a5d68ca425905744312` — `Fix Golden Path selection V0.6.1`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)  
**Risk:** HIGH operationally because Service Worker/cache identity moves with the runtime; the functional change itself is an isolated LOW-risk Golden Path CSS presentation refinement.

## Purpose

V0.6.2 refines the revealed-card presentation in **The Golden Path** after real-device review showed that the inherited Three-Card side-by-side card/copy layout was visually unbalanced for Golden Path's longer consultation text, especially in Thai on phones.

The previous layout kept artwork and long interpretation copy in two narrow columns. This made the artwork compete with the reading, forced excessive line wrapping, and produced tall, dense blocks that were harder to scan.

## V0.6.2 editorial layout

Golden Path revealed cards now use a dedicated mobile-first editorial hierarchy:

1. position label;
2. centered tarot artwork with the existing tap-to-enlarge affordance;
3. card title and English subtitle where applicable;
4. full-width interpretation text below a quiet divider.

The result keeps the artwork important without sacrificing reading comfort. Long Thai and English interpretations receive the full content width, calmer line length, improved leading, and clearer visual hierarchy.

Golden Path also forces its revealed-card list to remain one card block per row rather than inheriting Three-Card's multi-column desktop rule. This protects long-form consultation readability at wider viewport sizes as well.

## Protected behavior

V0.6.2 does **not** modify:

- Reading Engine 1.1.0;
- Deck Ritual 1.1.0;
- 78-card selection integrity;
- Golden Path Focus selection;
- Golden Path narrative or card meanings;
- one-completed-reading-per-local-day lock;
- same-day Focus/card/conclusion restore;
- Quiet Countdown;
- Save / Share;
- tap-to-enlarge viewer behavior;
- Daily Guidance;
- Ask Ganesha;
- Three-Card Reading presentation or logic;
- profile, audio lifecycle, or PWA fetch strategy.

Service Worker changes are limited to the required V0.6.2 build/cache identity update.

## Repository cleanliness

The repository root keeps **one current Patch Manifest only**. After this release is uploaded, remove every superseded root manifest and keep only `PATCH_MANIFEST_V0_6_2.json`.

Delivery installers, apply scripts, temporary backups, staging folders, and package-only checksum files stay outside the repository. `CHECKSUMS_SHA256.txt` remains the single rolling current-release checksum file.

## Acceptance

Static/package QA is included. Real-device acceptance should focus on visual balance and reading comfort in Thai and English while also smoke-testing the already accepted Golden Path selection, restore, countdown, Save/Share, viewer, and audio behavior.

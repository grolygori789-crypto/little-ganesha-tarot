# Stable Runtime Restore + Ko-fi + AUDIO5

Date: 24 August 2026
Release: V0.16.0 / STABLE-RESTORE-1+AUDIO5

## Purpose

Restore the app runtime to the state immediately before `Fix pre-launch defects HF1`
while retaining the accepted Ko-fi integration and the completed five-track soundtrack.

## Restore baseline

- Known-good pre-HF1 + Ko-fi commit:
  `cb1d5624d27bb1ae9fc07516541ed9ebf03a6ec3`
- Earlier known-good reference around 02:54 Thailand time:
  `34a6d27659f01eaf3ad703dece9c6017c68db2ae`
- Current main before this restore package:
  `d17b918a0441ef4e651a2d6ce5bab50f8d613703`

## Runtime changes

- `js/pwa.js` is restored byte-for-byte to the pre-HF1 Ko-fi baseline.
- The HF1 global runtime wrapper architecture is no longer active.
- `sw.js` returns to the Ko-fi baseline policy, with a fresh cache namespace so
  stale HF1 shell/runtime caches are replaced.
- The five-track soundtrack is retained by an isolated
  `js/audio-playlist-5.js` loaded immediately after the unchanged `js/audio.js`.
- The three new MP3 assets and five-track audio manifest are retained.

## Intentionally not re-applied

HF1 defect work is not re-applied in this emergency stabilization restore.
Those defects can be revisited later as direct source fixes after the known-good
interactive behavior has been confirmed again.

No Git history reset or force-push is required.

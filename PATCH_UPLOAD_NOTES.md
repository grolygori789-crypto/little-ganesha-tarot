# Little Ganesha Tarot — V0.4.0 Upload Notes

**Package:** Reading Engine Foundation / Daily Guidance upload candidate  
**Baseline `main`:** `8ceb93630cb3daf79cb77fea85538f14a11e8db5`  
**Last canonical runtime:** V0.3.6 / `d7c6fb7657fa2cb88d7ed0a6194d7439c959f4bc`

## Upload method

Overlay the contents of the V0.4.0 candidate archive onto the **repository root**.

**Do not delete unrelated repository files.**

The archive contains both replacement files and new files. Preserve the included folder paths exactly (`css/`, `js/`, `docs/`).

## Important

- Do not upload the separate `RESTORE_TO_V0_3_6` ZIP during the normal V0.4.0 update.
- Do not delete `assets/cards/`, audio, icons, motifs, `manifest.webmanifest`, `css/app.css`, `js/audio.js`, or `js/pwa.js`.
- The canonical 78 card images and master card back already exist in the repository; this candidate references them and does not replace them.
- After push, allow GitHub Pages / Service Worker propagation, then close/reopen or hard-refresh the app before judging the new build.

## Suggested commit message

`Add Reading Engine and Daily Guidance V0.4.0 candidate`

## What to verify immediately after upload

1. Repository `main` shows the intended new/changed files.
2. Settings shows `BUILD 0.4.0`.
3. Home V0.3.6 appearance remains intact.
4. Daily Guidance opens instead of the old “coming soon” toast.
5. A Daily card can be chosen and revealed.
6. Reopening Daily Guidance on the same local day restores the same card.
7. TH/EN, audio controls, Settings, and Return to Title still work.

If a meaningful regression appears, stop forward development and use the separate V0.3.6 restore package rather than stacking fixes on a broken deployed candidate.

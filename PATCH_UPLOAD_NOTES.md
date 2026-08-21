# V0.3.6 Upload Notes

This package is an **overlay patch for the existing GitHub repository**.

Copy the package contents over the repository root and allow matching files to replace the current versions. Do not delete existing folders.

The patch intentionally does **not** include or replace the 78 card fronts, card back, title hero, icons, audio files, manifest, or `js/audio.js` / `js/pwa.js`.

Recommended commit:

`Polish Home UI to V0.3.6`

After GitHub Pages deploys, close/reopen the installed app or hard-refresh the browser once so service-worker build 0.3.6 takes control.

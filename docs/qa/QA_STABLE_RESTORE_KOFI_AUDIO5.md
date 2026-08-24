# QA — Stable Runtime Restore + Ko-fi + AUDIO5

## Static gates performed

- Exact `js/pwa.js` Git blob equals pre-HF1 Ko-fi baseline:
  `0a9967e46ad3bc507f15d328bdbd478b6c06adcb`.
- Source Ko-fi `index.html` baseline validated against Git blob
  `5e6d71ccb7baa1d1cc47582fb464cfe2f07c51c0` before the single AUDIO5 script insertion.
- Source Ko-fi `sw.js` baseline validated against Git blob
  `c43412e895a7476724a4d7e7dd6287f87fdcf38f` before cache revision/AUDIO5 insertion.
- HF1 markers are absent from restored `js/pwa.js`.
- Five soundtrack tracks are present in the audio manifest.
- Three new MP3 paths exist in the package.
- `audio-playlist-5.js` syntax: PASS.
- `pwa.js` syntax: PASS.
- `sw.js` syntax: PASS.
- Index script order: pwa.js -> audio.js -> audio-playlist-5.js -> profile/app: PASS.
- Fresh SW cache revision is present to retire HF1 mixed caches.
- Package checksums and ZIP re-extraction: PASS.

## Required user acceptance after deploy

Confirm on the actual device/PWA:
1. Deck entrance/shuffle animation returns.
2. Card animation/reveal motion returns.
3. Lucky Numbers wheel spins.
4. Lucky balls visibly eject/drop into result slots.
5. Lucky Replay repeats the animation.
6. Ko-fi still opens correctly.
7. All five music tracks are reachable.
8. Full Motion and System Motion behave as expected.

Real-device PASS is not claimed until those checks are performed.

# Little Ganesha Tarot — QA Audio Playlist 5 V1

**Date:** 24 August 2026  
**Baseline:** `bc9e0843e0d892ef7ec3ca695aaa3a1d6433bb62`

## New asset validation

- All 3 files decode successfully as MP3 audio.
- All 3 are stereo, 44.1 kHz.
- Bamboo in the Rain: 145.894 s
- Path of Still Water: 182.178 s
- Breath of the Morning: 174.420 s
- Approximate full-track RMS spread among the 3 new tracks: 0.019 dB.
- Runtime playlist IDs: unique.
- Runtime playlist paths: match packaged assets.
- AUDIO_MANIFEST_V1 target size: 5.
- AUDIO_MANIFEST_V1 active track count: 5.
- `js/audio.js`: intentionally untouched.
- Existing crossfade/shuffle/lifecycle implementation: intentionally untouched.
- JavaScript syntax check for updated `js/pwa.js`: PASS.
- Package SHA256 verification: PASS.
- ZIP re-extraction verification: PASS.

## Real-device acceptance

After upload, manually confirm:
1. five titles are reachable using Next/Previous;
2. Shuffle can select all five over repeated use;
3. each new track starts and crossfades without a broken URL;
4. closing/reopening the app can resume a previously selected new-track index;
5. background/foreground behavior remains unchanged.

No real-device PASS is claimed by this package.

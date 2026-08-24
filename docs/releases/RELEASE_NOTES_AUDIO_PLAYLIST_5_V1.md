# Little Ganesha Tarot — Audio Playlist 5 V1

**Date:** 24 August 2026  
**Release:** V0.16.0 HF1+AUDIO5  
**Baseline:** `bc9e0843e0d892ef7ec3ca695aaa3a1d6433bb62`

## Playlist

1. Golden Lantern at Twilight
2. Sunlight on Bronze
3. Bamboo in the Rain
4. Path of Still Water
5. Breath of the Morning

The playlist target is now complete at five active tracks.

## Implementation

The already-passed `js/audio.js` playback engine is intentionally not replaced.
`js/pwa.js` extends the instantiated `LGTAudio.tracks` array from two to five
tracks before the first user-initiated playback and restores a valid persisted
track index after extension.

Shuffle, previous/next, crossfade, volume, pause/resume and background lifecycle
continue to use the existing LittleGaneshaAudio implementation.

The three new MP3 files remain streamable media assets and are not added to the
PWA app-shell pre-cache. This preserves the existing range-request/network
behavior and avoids increasing install-time shell weight.

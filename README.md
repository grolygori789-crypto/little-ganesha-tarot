# Little Ganesha Tarot — App Foundation V0.2.1

Studio: Benedict Interactive

V0.2.1 upgrades the opening experience without modifying any canonical card or UI master artwork.

## Included in this build

- Refined Benedict Interactive splash timing and one-pass gold wordmark treatment.
- Living Title presentation built entirely with HTML/CSS/JS layers over the approved `assets/ui/title-hero.png`.
- Subtle breathing camera motion, atmospheric light drift, water shimmer, golden motes, petals and lamp glow.
- `prefers-reduced-motion` fallback.
- Audio engine that starts only after `TAP TO BEGIN`, respecting browser autoplay rules.
- Two active starting tracks, with `Golden Lantern at Twilight` selected as the opening track.
- Play / pause / previous / next controls.
- Shuffle with no immediate repeat.
- Automatic crossfade near the end of tracks.
- Volume, mute and audio preferences persisted in `localStorage`.
- Background pause / resume handling.
- Compact mini player after `TAP TO BEGIN`.
- Return-to-Title foundation with confirmation.
- Bilingual English / Thai UI copy for all new controls.

## Merge into the repository root

Copy the contents of this package into the root of `little-ganesha-tarot` and allow these existing files to be replaced:

- `index.html`
- `css/app.css`
- `js/app.js`
- `README.md`

New files:

- `js/audio.js`
- `assets/audio/golden-lantern-at-twilight.mp3`
- `assets/audio/sunlight-on-bronze.mp3`
- `data/AUDIO_MANIFEST_V1.json`

Do not replace or modify the existing canonical card assets or approved UI images.

## Audio notes

The architecture targets a five-track soundtrack. V0.2.1 activates only the two tracks currently supplied. Additional tracks can be added later without changing the opening UX model.


## V0.2.1 hotfix
- Cache-busted CSS/JS URLs for GitHub Pages testing.
- Fixed Benedict Interactive splash to a consistent 2.6 s hold on normal motion settings.
- Removed accidental tap-to-skip on the studio ident.
- Increased Living Title motion visibility while keeping the original art unchanged.

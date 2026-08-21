# Little Ganesha Tarot — App Foundation V0.2.2

Interaction hotfix for the V0.2 Living Title + Audio Foundation.

## Root cause fixed
The transparent Exit modal used the HTML `hidden` attribute while its CSS component rule set `display: grid`. CSS `display` can override the browser's default rendering of `hidden`, leaving an invisible full-screen layer at z-index 50 that intercepted taps/clicks.

V0.2.2 adds:
- global `[hidden] { display: none !important; }` safety rule
- `pointer-events: none` on the inactive modal backdrop
- `pointer-events: auto` only when the modal is visible
- `pointer-events: none` as soon as the Benedict splash starts leaving
- explicit pointer-event safety for Title controls
- cache-busted `?v=0.2.2` CSS/JS URLs

Expected test flow:
1. Benedict Interactive holds for about 2.6 seconds.
2. Title appears with Living Title motion (unless the device requests reduced motion).
3. EN / ไทย and sound controls respond.
4. Tap `TAP TO BEGIN`.
5. Mini Player appears and Golden Lantern at Twilight fades in if sound is enabled.
6. Previous / Play-Pause / Next / More work.
7. Return to Title confirmation works.

Commit suggestion: `Fix invisible overlay blocking title controls`

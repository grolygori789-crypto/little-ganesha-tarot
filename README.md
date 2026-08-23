# Little Ganesha Tarot — V0.5.4 Three-Card Viewer

**Studio:** Benedict Interactive  
**Target runtime:** V0.5.4  
**Baseline runtime:** V0.5.3  
**Baseline GitHub HEAD:** `ac0a19589e981afc89db37dc8e3e10830045a80d` — `Update Master Plan to V4.1`  
**Runtime feature baseline:** `bee251a009f2b310593a453bbc99971588db1468` — `Fix background audio pause V0.5.3`  
**Risk:** MEDIUM

## Purpose

V0.5.4 adds a focused enlarged-card viewer to the completed Three-Card Reading without changing the reading itself.

The three result cards remain compact so the narrative stays easy to scan. A user who wants to inspect the artwork can tap any revealed card image to open a larger presentation at approximately the same visual scale used by the single-card reading mode.

## Three-Card Viewer

- Tap/click any revealed card artwork to open the larger viewer.
- The viewer is intentionally not a full-screen card takeover; it keeps generous surrounding space and preserves the sense of looking more closely at the same reading.
- A restrained magnifier cue communicates that the artwork is interactive without adding repeated instructional copy under every card.
- Close with the × button, by tapping the dimmed backdrop, or with Escape on a keyboard.
- Keyboard users can focus the card artwork and open it with Enter or Space.
- Focus returns to the originating card after the viewer closes.
- Thai and English accessibility labels are authored independently and update with the app language.
- Reduced-motion preference disables viewer transitions.

## Protected behavior

This release does not alter:

- Reading Engine 1.1.0,
- 78-card pre-shuffled selection integrity,
- compact 6×13 deck ritual,
- Three-Card card selection or narrative composition,
- Three-Card one-completed-reading-per-local-day lock,
- Daily Guidance,
- Ask Ganesha semantic duplicate discipline,
- Quiet Countdown,
- Save/Share,
- profile age/zodiac,
- V0.5.3 background audio lifecycle,
- PWA architecture beyond the required V0.5.4 cache/build identity update.

## Acceptance focus

Real-device validation should confirm:

1. Complete or restore a Three-Card Reading.
2. Tap each revealed card image; the correct card opens enlarged.
3. Viewer size is close to single-card mode and does not feel like a full-screen takeover.
4. Close with × and backdrop tap; return position remains stable.
5. Music behavior is unchanged while opening/closing the viewer.
6. Save/Share output remains unchanged.
7. Reopen the same Three-Card Reading on the same local day; the same three cards and narrative remain locked.

Static/package QA is included with the V0.5.4 patch. Real-device acceptance remains the final gate.

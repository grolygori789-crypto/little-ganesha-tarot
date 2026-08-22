# Little Ganesha Tarot — V0.5.3 Audio Lifecycle Hotfix

**Studio:** Benedict Interactive  
**Target runtime:** V0.5.3  
**Baseline runtime:** V0.5.2  
**Baseline GitHub HEAD:** `f0ce507f7cc942bee9e1b18cce47534db791610b` — `Add reading discipline V0.5.2`  
**Risk:** LOW-MEDIUM

## Purpose

V0.5.3 fixes a real-device Android/PWA lifecycle defect where background music could continue after the app was minimized or hidden.

The V0.5.2 implementation waited for a short requestAnimationFrame-driven fade before calling `pause()`. Mobile browsers can suspend animation frames immediately when an app backgrounds, so the fade could stop before the actual pause was reached.

## Fix

- Hidden/background lifecycle pauses every active audio channel synchronously before the browser can suspend animation work.
- No fade is required on the hide path.
- Playback position is preserved.
- Returning to the app resumes only when music was playing immediately before the hide.
- A user-initiated pause is never overridden.
- `pagehide/pageshow` and `freeze/resume` provide additional lifecycle coverage for Android/PWA/bfcache behavior.
- An in-progress crossfade is invalidated safely before background pause.

## Protected behavior

V0.5.2 reading discipline is unchanged: Smart Semantic Ask duplicate lock, Three-Card one-completed-reading-per-local-day, Quiet Countdown, Daily Guidance, compact 78-card ritual, Save/Share, profile/age/zodiac and professional bilingual reading content remain protected.

## Real-device acceptance

Test on the same Android device that exposed the bug:

1. Start music, note the current point, minimize the app — audio must stop immediately.
2. Return to the app — audio should continue from the preserved point.
3. Pause music manually, minimize and return — music must remain paused.
4. Repeat once while the track is near a transition/crossfade.

Automated lifecycle and regression QA pass; real-device acceptance remains the final gate.


Save Image + Share as the standard result utilities for every tarot reading mode remains protected.

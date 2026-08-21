# Little Ganesha Tarot — App Foundation V0.3.1

Code-only progress build based on the approved V0.2.2 interaction hotfix.

## Included in V0.3.1
- Living Title retuned so Full Motion is visibly alive within a few seconds.
- Reduced Motion no longer turns the title into a dead still image; calm light/shimmer remains.
- Motion preference: System / Full / Reduced.
- Immersive Mode foundation, default ON, with graceful fallback when Fullscreen API is unavailable.
- First-entry optional display name + optional date of birth, stored locally on-device only.
- Personal Profile editor in Settings for name and birth date, with local-only privacy copy and a clear-profile action.
- TAP TO BEGIN now starts audio and enters the actual app flow.
- Home/Menu foundation with Daily Guidance, Ask Ganesha, Three-Card Reading, signature paths, Lucky Numbers, Cards and Journal entry points.
- Global mini player persists after entering the app.
- Settings foundation: language, motion, immersive mode, music, volume, shuffle, Personal Profile and Return to Title.
- Support the Project skeleton:
  - International Supporters — Buy Me a Coffee placeholder.
  - Supporters in Thailand — PromptPay QR placeholder.
- No payment link, QR image, account identifier or personal financial information is embedded in this build.
- Existing audio engine keeps its visibility behavior: background/lock pauses playback and returns intelligently when appropriate.
- Cache-busted static assets: `?v=0.3.1`.

## Not production-final yet
Reading features currently route to a non-blocking "ready for reading-engine build" notice. Payment destinations are intentionally placeholders until approved production data/artwork is supplied.

## Overlay instructions
Copy these files/folders over the repository root, preserving the existing approved `assets/ui/title-hero.png`, card assets and data already in the repository.

## Expected smoke test
1. Benedict Interactive shows for about 2.6 seconds.
2. Title shows visible ambient motion on normal-motion devices.
3. EN/ไทย and sound controls work.
4. TAP TO BEGIN starts music.
5. First visit offers optional display name and optional date of birth; later visits skip this step.
6. Profile data can be edited or cleared from Settings and remains local to the device.
7. Home/Menu appears after entry.
8. Settings opens and all preference controls respond.
9. Support the Project shows separate Worldwide and Thailand placeholders.
10. Lock/background pauses audio; returning resumes only when the engine had been playing.
11. Return to Title fades/stops the session and returns to the title.

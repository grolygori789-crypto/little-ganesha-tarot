# Little Ganesha Tarot — V0.4.0 Release Notes

**Release type:** Reading Engine feature candidate  
**Baseline repository head:** `8ceb93630cb3daf79cb77fea85538f14a11e8db5`  
**Last canonical runtime implementation:** `d7c6fb7657fa2cb88d7ed0a6194d7439c959f4bc` — V0.3.6  
**Master Plan:** V3.7

## What V0.4.0 adds

V0.4.0 introduces the first reusable tarot Reading Engine subsystem and completes the Daily Guidance vertical slice.

### Reading foundation

- exactly 78 stable canonical card IDs (`00–77`),
- canonical English titles plus Thai display titles,
- Major/Minor metadata and exact image mapping,
- bilingual keywords, upright meanings, and reflection prompts,
- reversal-ready fields from the first schema version,
- stable reading content versioning for future Journal/history migration.

### Shared engine

- one spread registry for Daily / Ask / Three / Golden Path / Remove the Obstacle,
- Web Crypto (`crypto.getRandomValues`) where available,
- rejection-sampled random integer helper to avoid modulo bias,
- unique draw support with exclusions,
- explicit session state transitions to resist duplicate taps/stale reveal state,
- no duplicate cards inside a draw/spread helper.

### Daily Guidance

- premium restrained shuffle animation,
- three face-down choices leading to one Daily card,
- exact canonical master card back and canonical card front,
- same-local-day persistence on the current device,
- same card restored after revisits/reloads for that local day,
- fresh Daily reading becomes available after the local-date boundary,
- English/Thai interpretation and reflection content,
- upright-first orientation,
- graceful premium fallback face if card artwork cannot load,
- Reduced Motion behavior,
- safe close/back lifecycle and focus restoration.

### PWA/cache

- runtime build/cache markers advance coherently to `0.4.0`,
- Reading Engine/content/CSS and canonical card back join the essential application shell,
- all 78 high-resolution card fronts remain outside install-time pre-cache,
- selected card fronts continue to use runtime image caching.

## Deliberately deferred

- actual SFX files and interface-sound controls,
- Ask Ganesha UI,
- Three-Card / Golden Path / Remove the Obstacle UI,
- reversals preference,
- Journal persistence,
- Card Library,
- Lucky Numbers,
- soundtrack expansion.

Reading interaction events are already exposed so subtle premium SFX can be added later without coupling sound assets to reading business logic.

## Protected behavior

V0.4.0 does not rewrite the existing Home visual system, audio engine, PWA registration module, manifest, profile storage, Title, onboarding, Settings, canonical deck artwork, or app icon system.

## Release status

**QA-S / package-integrity: PASS**  
**QA-R browser interaction: NOT COMPLETED — environment navigation blocked**  
**QA-X iOS/Android: PENDING**  
**QA-P deployed production: PENDING**

V0.4.0 is therefore an **upload candidate**, not yet the canonical runtime baseline.

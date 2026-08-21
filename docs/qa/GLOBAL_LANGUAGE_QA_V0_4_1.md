# Little Ganesha Tarot — Global TH/EN Language QA V0.4.1 REV3

**Scope:** Entire current user-facing app + Daily Guidance card content  
**Languages:** English + Thai  
**Baseline repository:** `grolygori789-crypto/little-ganesha-tarot`  
**Baseline main:** `5a06a25983ef6ee5fd56e08b7e3739725eda9982`  
**Status:** Global native-language pass completed

## Goal

Every current English and Thai user-facing string should be understandable on first read, sound natural in its own language, and preserve the app’s premium sacred tone without becoming vague, overly literary, translated-sounding, corporate, or unnecessarily mystical.

The quality target is **native, clear, calm, premium, and concise**.

## Areas audited

### Title / entry
- Tap to Begin state and accessibility copy
- language selector accessibility label
- sound accessibility label

### Onboarding / profile
- welcome copy
- preferred-name question and helper text
- date-of-birth helper text
- local-only privacy note
- Skip / Continue actions
- profile modal copy
- unset states
- clear/save actions

### Home
- greeting and no-name localized fallback
- Home intro
- Daily Guidance label/subtitle
- Ask Ganesha label/subtitle
- Three-Card Reading label/subtitle
- Signature Paths
- The Golden Path
- Remove the Obstacle
- Explore / Lucky Numbers / Cards / Journal
- primary-reading accessibility label

### Settings
- section headings
- Language
- Motion and options
- Browser Full Screen helper/error copy
- Music / volume / shuffle
- profile privacy copy
- Support copy and badges
- Return to Title flow
- accessible labels for controls

### Global Mini Player / navigation
- Now Playing
- Play / Pause
- Previous / Next
- Audio options
- main-navigation accessibility label
- music-player accessibility label

### Daily Guidance reading UI
- intro / restored state
- shuffle / choose / selected / reveal states
- interpretation labels
- disclaimer
- local-storage failure message
- Back / Home actions
- dynamically re-localized card-choice accessibility labels

### Tarot content
All 78 cards were re-audited after the REV2 rewrite:
- English display titles
- Thai display titles
- English/Thai keywords
- English/Thai upright meanings
- English/Thai reflection questions

A small number of lines received a second plain-language refinement where the REV2 wording was still slightly writerly or abstract.

## Examples of wording removed or replaced

Thai constructions intentionally removed from current UI include wording such as:
- `กลับหน้าไตเติล`
- `ดำเนินการต่อ`
- `การสะท้อนเชิงสัญลักษณ์`
- overly translated helper sentences that required rereading

English constructions intentionally removed include wording such as:
- `Bring one clear question`
- `used for future symbolic personalization`
- `installed app already opens in app-like mode`
- redundant future-update copy

## Accessibility localization

REV3 adds a generic `data-copy-aria` localization path so accessibility labels follow the selected language instead of silently remaining English.

Localized accessibility coverage now includes:
- Language selector
- Settings
- Settings Back
- primary reading region
- primary navigation
- global music player
- Motion
- Browser Full Screen
- Music
- Volume
- Shuffle
- dynamic Daily Guidance card choices

## Intentional non-translated strings

The following remain in their official form because they are brand/product/track identity, not untranslated UI copy:
- `BENEDICT INTERACTIVE`
- `LITTLE GANESHA TAROT`
- `THE GOLDEN PATH` on the canonical Title lockup
- track titles such as `Golden Lantern at Twilight` and `Sunlight on Bronze`
- build/version identifiers
- `EN / ไทย` language selectors

Thai Home fallback uses `เส้นทางสีทอง` for natural in-app reading while the canonical Title branding remains unchanged.

## Content migration

Daily Guidance content remains `daily-guidance-v2`.

The existing V0.4.0 → V0.4.1 migration preserves the same-day selected card rather than redrawing simply because interpretation copy was upgraded.

## Automated checks

`docs/test-global-copy.js` verifies:
- EN/TH key parity
- no empty current UI copy
- every `data-copy`, `data-copy-option`, and `data-copy-aria` key resolves
- required global accessibility localization hooks exist
- legacy awkward copy is rejected
- Thai greeting / Home fallback / Return-to-Title / Continue / obstacle naming are normalized
- Daily Guidance choice accessibility copy re-localizes correctly

This supplements the 78-card Reading Engine/content test and package/version checks.

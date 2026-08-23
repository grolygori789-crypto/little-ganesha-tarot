# Little Ganesha Tarot — V0.15.1 Studio Contact Polish

**Studio:** Benedict Interactive  
**Target runtime:** V0.15.1  
**Stable baseline runtime:** V0.15.0  
**Stable baseline GitHub HEAD:** `bf8a875ac886e67cfb4bab607fb3c212c5472bc6` — `Add Help & Feedback V0.15.0`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)  
**Legal acknowledgement version:** 1.0.0 (unchanged)

## V0.15.1

V0.15.1 is a small production polish release for Benedict Interactive contact identity. It does not change tarot behavior, reading persistence, the V0.15.0 Tarot Library keyboard fix, Help & Feedback transport, diagnostics, Journal, payments, audio, or legal acknowledgement behavior.

### Public studio contact

Help & Feedback now presents a concise public contact identity:

- **Benedict Interactive**
- **Bangkok, Thailand**
- **benedict.support@gmail.com**

The same identity appears in the Help & Feedback report/feedback screen so users can clearly see who receives support mail. The email address remains a user-initiated `mailto:` destination; Little Ganesha Tarot does not silently send reports in the background.

`Bangkok, Thailand` is intentionally a coarse studio location. It is not presented as a registered office or full legal service address, and no street-level address is exposed.

## Preserved V0.15.0 behavior

The V0.15.0 Tarot Library mobile search fix remains unchanged: the search input stays mounted while users type, so mobile software keyboards and EN / TH / HI input composition are not interrupted by per-character DOM replacement.

Help & Feedback remains available from Settings with:

- Report a Problem
- Send Feedback
- Copy Diagnostic Info

Diagnostics remain limited to non-sensitive technical context such as build, language, platform, browser family/major version, Browser/PWA mode, current screen and timestamp. The module does not automatically read Ask questions, Journal content, readings, profile data, payment information, screenshots, location data or tracking identifiers.

## Protected behavior

V0.15.1 does not modify:

- Reading Engine 1.1.0 or Deck Ritual 1.1.0;
- canonical 78-card content or selection integrity;
- Daily / Ask / Signature Focus persistence and locks;
- Lucky Numbers selection, replay, SFX or haptics;
- Tarot Library search/filter semantics beyond the already-shipped V0.15.0 fix;
- Journal IndexedDB/capture/delete behavior;
- Reading Hub;
- PromptPay support;
- Legal Center or legal acknowledgement version 1.0.0;
- reading Save/Share;
- background audio lifecycle;
- card viewers or app icons.

## Runtime coherence

HTML metadata, body build marker, CSS/JS/manifest query strings, `window.LGT_BUILD`, visible build label, manifest icon URLs, Service Worker build/cache identity and application-shell URLs move coherently to V0.15.1.

## Risk

Functional change: **LOW** — static studio-contact presentation only.  
Operational deployment: **HIGH** — Service Worker/cache identity moves with the runtime build.  
Rollback baseline: `bf8a875ac886e67cfb4bab607fb3c212c5472bc6`.

## Acceptance

Static/package QA verifies JavaScript syntax, JSON validity, contact identity, support mailto destination, runtime coherence, protected-search preservation and SHA-256 package integrity. A real-device acceptance pass remains required for final Settings/contact presentation and installed-PWA update behavior.

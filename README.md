# Little Ganesha Tarot — V0.16.0 Worldwide Ko-fi Support

**Studio:** Benedict Interactive  
**Target runtime:** V0.16.0  
**Stable baseline runtime:** V0.15.1  
**Stable baseline GitHub HEAD:** `34a6d27659f01eaf3ad703dece9c6017c68db2ae` — `Refresh Handoff V5.0`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)  
**Legal acknowledgement version:** 1.0.0 (unchanged)

## V0.16.0

V0.16.0 activates the official worldwide voluntary-support destination through Ko-fi:

`https://ko-fi.com/benedictinteractive`

Settings → Support the Project now presents two active, isolated support routes:

- **Worldwide:** Ko-fi
- **Thailand:** PromptPay

### Worldwide support UX

The previous Worldwide `Coming soon` state is replaced by a premium in-app Ko-fi support sheet using the existing Little Ganesha visual language.

The flow is:

Settings → Support the Project → Worldwide Support → Ko-fi sheet → user-initiated external Ko-fi page.

The Ko-fi sheet includes:

- EN / TH / HI native copy;
- Little Ganesha / The Golden Path masthead;
- clear Benedict Interactive support identity;
- external-destination disclosure;
- a single primary `Continue to Ko-fi` action;
- optional-support disclaimer;
- Back to Settings / Back to Home navigation;
- Reduced Motion compatibility.

Ko-fi payment/account handling stays outside Little Ganesha Tarot. No payment backend, callback, donor account, entitlement, unlock, reading-quality change, analytics dependency, or support-linked probability is introduced.

## PromptPay

PromptPay behavior is preserved. The QR, recipient names, verification reminder, Save QR behavior and support isolation remain unchanged.

## Protected behavior

V0.16.0 does not modify:

- Reading Engine 1.1.0 or Deck Ritual 1.1.0;
- canonical 78-card content or selection integrity;
- Daily / Ask / Signature Focus persistence and locks;
- Three-Card / Golden Path / Remove the Obstacle reading contracts;
- Lucky Numbers generation, persistence, Replay, SFX or haptics;
- Tarot Library V0.15.0 keyboard/search fix;
- Journal IndexedDB / capture / deletion behavior;
- Reading Hub;
- PromptPay destination/QR behavior;
- Legal Center or legal acknowledgement version 1.0.0;
- Help & Feedback transport or diagnostics;
- reading Save/Share;
- background audio lifecycle;
- card viewers or app icons.

## Runtime coherence

HTML metadata/body/build label and asset query strings, live `window.LGT_BUILD`, manifest icon URLs, Service Worker BUILD/cache identity and app-shell URLs move to V0.16.0.

The existing `js/app.js` feature logic is intentionally left otherwise unchanged; `js/support.js` finalizes the live build marker after the app shell initializes.

## Risk

Functional change: **LOW** — isolated support UI and external link only.  
Operational deployment: **HIGH** — Service Worker/cache identity moves with the runtime build.  
Rollback baseline: `34a6d27659f01eaf3ad703dece9c6017c68db2ae`.

## Acceptance

Static/package QA covers Ko-fi URL identity, EN/TH/HI support copy, external-link safety attributes, PromptPay preservation, runtime coherence, syntax/JSON validity, no support-to-reading coupling, and package checksums.

Real-device acceptance remains required for installed-PWA update behavior, visual polish, focus/back navigation, and opening/returning from Ko-fi on the target phone.

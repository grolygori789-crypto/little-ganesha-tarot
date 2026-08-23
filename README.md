# Little Ganesha Tarot — V0.15.0 Help & Feedback

**Studio:** Benedict Interactive  
**Target runtime:** V0.15.0  
**Stable baseline runtime:** V0.14.0  
**Stable baseline GitHub HEAD:** `3effae89a2f3fddfed0914b38250629aeefbffd7` — `Add Legal & IP Suite V0.14.0`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)

## V0.15.0

V0.15.0 closes two production-quality gaps without changing tarot selection, reading persistence, content, payments, Journal semantics, audio lifecycle, or legal acceptance behavior.

### 1. Tarot Library mobile search keyboard fix

The previous Tarot Library search rebuilt the full deck view after every `input` event. On mobile browsers/PWAs that destroyed the focused `<input>` node, which could dismiss the software keyboard after each character and interrupt IME composition.

V0.15.0 keeps the original search input mounted while the user types. Search now updates only:

- the result count;
- the card grid / empty state; and
- filter active state.

The fix preserves live search, query state, filtering, card navigation and all 78 canonical cards. It is specifically designed not to interfere with English, Thai or Hindi/Devanagari input composition.

### 2. Help & Feedback

Settings now receives a dedicated **Help & Feedback** group with:

- **Report a Problem**;
- **Send Feedback**; and
- **Copy Diagnostic Info**.

The official support destination is:

`benedict.support@gmail.com`

Report/feedback flows are available in English, Thai and Hindi. The app prepares a `mailto:` message and opens the user's email application. Nothing is transmitted by Little Ganesha Tarot merely by opening the form; the user decides whether to send the email from their email client.

### Diagnostic privacy boundary

Technical diagnostics are intentionally narrow and non-sensitive:

- app/build version;
- current language;
- coarse platform;
- browser family/major version;
- browser vs installed-PWA environment;
- current app screen; and
- timestamp.

The Help & Feedback module does **not** automatically read or attach:

- Ask Ganesha question text;
- Journal entries or reflections;
- reading history or reading content;
- profile name or birth date;
- PromptPay/payment information; or
- screenshots/files.

The report screen explicitly asks users not to send passwords, payment details, private Journal entries or personal reading questions.

## Protected behavior

V0.15.0 does not modify:

- Reading Engine 1.1.0 or Deck Ritual 1.1.0;
- canonical 78-card identity/content/artwork;
- Daily / Ask / Three-Card / Golden Path / Remove the Obstacle selection and local-day locks;
- Lucky Numbers selection, persistence, replay or SFX/haptics;
- Journal IndexedDB, capture, reflection or deletion semantics;
- Reading Hub intent routing;
- PromptPay support;
- Legal Center and legal acknowledgement version 1.0.0;
- Save/Share exports;
- background audio lifecycle; or
- card viewers and app icons.

## Runtime coherence

HTML metadata, body build marker, CSS/JS/manifest query strings, `window.LGT_BUILD`, visible build label, manifest icon URLs, Service Worker build/cache identity and application-shell URLs move coherently to V0.15.0.

New shell files:

- `css/help-feedback.css`
- `js/help-feedback.js`

## Risk

Functional change: **LOW–MEDIUM** — isolated Tarot Library result rendering fix plus additive Help & Feedback UI.  
Operational deployment: **HIGH** — Service Worker/cache identity moves with the runtime build.  
Rollback baseline: `3effae89a2f3fddfed0914b38250629aeefbffd7`.

## Acceptance

Static/package QA covers JavaScript syntax, manifest JSON, runtime-version coherence, Service Worker shell inclusion, support-email contract, non-sensitive diagnostic contract, removal of search-input replacement during typing, and SHA-256 package integrity.

A real-device acceptance pass remains required for:

- continuous mobile keyboard typing in Tarot Library search;
- Thai and Hindi IME behavior;
- Android installed-PWA `mailto:` handoff;
- Report / Feedback copy and email flows;
- Settings layout/scrolling; and
- installed-PWA cache update behavior.

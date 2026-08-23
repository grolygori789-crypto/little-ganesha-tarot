# Little Ganesha Tarot — V0.13.0 PromptPay Support

**Studio:** Benedict Interactive  
**Target runtime:** V0.13.0  
**Stable baseline runtime:** V0.12.0  
**Stable baseline GitHub HEAD:** `4bbf2648d71f7903545a625d841edc64a8e80021` — `Commit: Add Reading Hub V0.12.0`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)

## V0.13.0

V0.13.0 activates the Thailand support path in **Settings → Support the Project** with a dedicated PromptPay experience. Support remains fully optional and isolated from tarot selection, reading quality, daily locks, Journal data and feature access.

The Settings card now opens a premium full-screen PromptPay sheet instead of a disabled placeholder. The sheet includes:

- a scan-safe PromptPay QR on a true white field;
- the recipient name in Thai and official English spelling;
- a concise thank-you message;
- an explicit recipient-name verification reminder;
- a **Save QR** action for same-device banking flows;
- EN / TH / HI native interface copy;
- Back to Settings, Back to Home, Escape handling, safe-area layout and reduced-motion support.

## QR asset discipline

The supplied bank image is **not** shipped wholesale. V0.13.0 derives a clean `assets/support/promptpay-qr.png` containing only the payment QR and its required white quiet zone. The bank page, masked identification text and other screenshot content are excluded from the app asset.

The QR remains black/white on a white field. It is not recolored, decorated or overlaid by the Little Ganesha visual system. Automated QR detection/decoding succeeds at the shipped resolution and at representative mobile display sizes.

## Same-device payment flow

Users who are viewing the app on the same phone they use for banking can press **Save QR**, then select the saved image from a compatible banking app. The app does not prefill an amount and does not track, verify or infer whether a payment was completed.

## International support

**Buy Me a Coffee remains Coming soon in V0.13.0.** No placeholder URL or fake destination is introduced. It should be activated only after the official Benedict Interactive / Little Ganesha support URL is supplied and verified.

## Protected behavior

V0.13.0 does not modify Reading Engine 1.1.0, Deck Ritual 1.1.0, the canonical 78-card deck, Daily Guidance, Ask Ganesha semantic persistence, Three-Card / Golden Path / Remove the Obstacle Focus locks, Reading Hub, Tarot Library, Journal, Lucky Numbers, Save/Share reading exports, audio lifecycle, app icons or card viewers.

PromptPay support is an additive presentation layer only. It does not write to tarot state or Journal state.

## Runtime coherence

HTML metadata, body build marker, all cache-busting query strings, `window.LGT_BUILD`, visible build label, manifest icon URLs, Service Worker build/cache IDs and application-shell URLs move coherently to V0.13.0. The new support CSS, JavaScript and PromptPay QR asset are included in the Service Worker shell.

## Risk

Functional change: **LOW–MEDIUM** — isolated support UI and local QR save behavior.  
Operational deployment: **HIGH** — Service Worker/cache identity moves with the runtime build.  
Rollback baseline: `4bbf2648d71f7903545a625d841edc64a8e80021`.

## Acceptance

Static/package QA covers JavaScript syntax, localization contract, QR scan integrity, recipient-name presentation, Settings activation, modal navigation, Save QR behavior, runtime coherence, Service Worker shell inclusion and SHA-256 package verification. Real-device acceptance remains required for actual banking-app scan/use, Android/iOS save behavior and final visual review.

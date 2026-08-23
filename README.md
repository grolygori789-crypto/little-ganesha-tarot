# Little Ganesha Tarot — V0.14.0 Legal & IP Suite

**Studio:** Benedict Interactive  
**Target runtime:** V0.14.0  
**Stable baseline runtime:** V0.13.0  
**Stable baseline GitHub HEAD:** `f21e6a4c81812276d661d6ebb0a3e6c86c6cf48b` — `Add PromptPay Support V0.13.0`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)  
**Legal text version:** 1.0.0

## V0.14.0

V0.14.0 adds a complete legal, intellectual-property and privacy layer without changing tarot behaviour.

Settings now includes a premium **Legal Center** with four independently authored documents in English, Thai and Hindi:

- Copyright & Intellectual Property
- Terms of Use
- Privacy Policy
- Third-Party Notices

The repository also gains a proprietary `LICENSE.md` and a versioned legal archive under `docs/legal/`.

## One-time legal acknowledgement

When legal version 1.0.0 has not yet been acknowledged on the device, the title-screen Begin action opens a concise legal acknowledgement before starting the journey.

Users can:

- review Terms of Use;
- review Privacy Policy;
- switch EN / TH / HI;
- choose **Agree & Continue**; or
- choose **Not now** and return to the title screen.

Acceptance is remembered locally only as:

- `lgt.legal.acceptedVersion`
- `lgt.legal.acceptedAt`

No account or remote consent backend is introduced.

## Screenshot policy

V0.14.0 deliberately **does not implement screenshot blocking**.

The current product is a browser/PWA experience and already provides intentional Save/Share output. A PWA cannot guarantee the same cross-platform capture prevention as native secure-window APIs, while blocking ordinary screenshots would create UX inconsistency and weak protection against determined copying.

Instead, the legal contract explicitly permits ordinary personal, non-commercial screenshots and sharing of a user’s own reading. It separately reserves rights against unauthorised commercial redistribution, clean asset distribution, mass extraction, scraping, copied competing products and unauthorised dataset/model-training use.

**No screenshot block = no extra licence.**

## Privacy truthfulness

The Privacy Policy documents the actual current runtime:

- optional profile data stays in browser/device storage;
- reading locks and preferences are local;
- Ask Ganesha reading storage keeps a fingerprint and semantic descriptors rather than the full exact question text;
- exact Ask wording can enter Journal only when its dedicated setting is enabled, OFF by default;
- Journal uses local IndexedDB and supports single, bulk and full clear actions;
- PromptPay payments occur outside the app and banking credentials are never collected by Little Ganesha;
- Save/Share is user initiated;
- Google Fonts and normal hosting can create ordinary network request metadata;
- no Benedict Interactive behavioural advertising SDK or product analytics SDK is present in this release;
- local data is not cloud backup and is not separately encrypted by the app.

## Intellectual-property discipline

The legal suite protects original code, protectable Little Ganesha artwork, written interpretations, localization, UX/UI expression, curation/arrangement, brand materials and documentation to the extent applicable law protects them.

It explicitly does **not** claim exclusive ownership over general tarot concepts, traditional terminology/structures, historical facts, ideas/methods, public-domain material or third-party rights.

AI-assisted material is addressed conservatively: no rights are claimed beyond applicable law, while protectable human-authored and human-directed contributions are reserved where protection exists.

## Third-party notices

The Legal Center identifies Google Fonts/typefaces, PromptPay/Thai QR Payment, planned Buy Me a Coffee support, platform references, traditional/public-domain tarot foundations and future separately licensed third-party/open-source components.

Third-party licences remain controlling for their own components.

## Protected behavior

V0.14.0 does not modify:

- Reading Engine 1.1.0 or Deck Ritual 1.1.0;
- canonical 78-card selection integrity;
- Daily / Ask / Focus persistence;
- reading Save/Share exports;
- Lucky Numbers;
- Tarot Library;
- Journal capture/storage/delete semantics;
- Reading Hub;
- PromptPay support;
- background audio lifecycle;
- card viewers or app icons.

## Runtime coherence

HTML metadata, body build marker, asset query strings, `window.LGT_BUILD`, visible build label, manifest URLs, Service Worker build/cache identity and application-shell URLs move coherently to V0.14.0.

New shell files:

- `css/legal.css`
- `js/legal-content.js`
- `js/legal-ui.js`

## Risk

Functional change: **LOW–MEDIUM** — additive legal UI plus local acknowledgement gate.  
Operational deployment: **HIGH** — Service Worker/cache identity moves with the runtime build.  
Rollback baseline: `f21e6a4c81812276d661d6ebb0a3e6c86c6cf48b`.

## Legal-review note

This suite is intentionally conservative and avoids claiming rights the project cannot legitimately own. It is not a promise of enforceability in every jurisdiction. Before a major commercial/store launch, qualified technology/IP counsel should review final rights-holder identity, governing-law language, official legal contact details and any later remote-data/payment integrations.

## Acceptance

Static/package QA covers JavaScript syntax, legal-content initialization, all three languages, consent/navigation wiring, screenshot-policy contract, privacy-data contract, runtime coherence, Service Worker inclusion and SHA-256 package integrity.

A real browser/device acceptance pass remains required for final typography, scrolling, title-screen acknowledgement interaction and installed-PWA update behaviour.

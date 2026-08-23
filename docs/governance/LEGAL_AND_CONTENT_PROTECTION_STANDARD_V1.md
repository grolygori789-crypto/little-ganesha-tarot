# LITTLE GANESHA TAROT — LEGAL & CONTENT PROTECTION STANDARD V1

**Product:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Runtime introduced:** V0.14.0  
**Legal text version:** 1.0.0  
**Effective / updated:** 23 August 2026  
**Rollback baseline:** `f21e6a4c81812276d661d6ebb0a3e6c86c6cf48b` — `Add PromptPay Support V0.13.0`

## 1. Purpose

V0.14.0 establishes a coherent legal and content-protection layer without weakening the open, premium user experience.

The product ships four user-facing legal documents in independently authored English, Thai and Hindi:

1. Copyright & Intellectual Property
2. Terms of Use
3. Privacy Policy
4. Third-Party Notices

The repository also gains a proprietary `LICENSE.md`.

## 2. Ownership discipline

Legal wording must protect only what can legitimately be protected. It may claim rights in original code, protectable artwork, writing, localization, UX/UI expression, curation/arrangement, brand assets, documentation and other original contributions.

It must not claim exclusive ownership of:

- tarot as a concept;
- traditional tarot terminology or conventional structures;
- historical facts;
- ideas, principles, methods, systems or procedures;
- public-domain material; or
- third-party material and marks.

AI-assisted material must be described conservatively. The project claims no rights beyond applicable law and reserves rights only in protectable human-authored or human-directed contributions where protection exists.

## 3. Screenshot and personal sharing decision — FINAL V1

**Do not implement screenshot blocking in the current PWA.**

Reasons:

- The browser/PWA platform cannot provide a reliable cross-platform equivalent of native secure-window controls.
- Native Android can use `FLAG_SECURE` at the window level; that capability is not a normal web/PWA primitive.
- Native iOS provides screen-capture state/notification APIs, but these are UIKit/native-app facilities rather than a universal web screenshot lock.
- Little Ganesha intentionally provides Save/Share. Blocking ordinary screenshots would create an inconsistent user contract and reduce usability while offering weak protection against determined copying.
- Screenshot blocking does not prevent direct web-asset extraction, another camera photographing the screen, or other copying methods.

Instead, the legal contract explicitly permits ordinary personal, non-commercial screenshots and intended Save/Share output while reserving rights against unauthorised commercial redistribution, mass extraction, clean-asset redistribution, scraping, copied competing products and unauthorised dataset/model-training uses.

**The absence of screenshot blocking grants no additional licence or ownership right.**

If Little Ganesha later ships a native wrapper/application and a genuinely sensitive feature is introduced, native screen-capture controls may be reconsidered feature-by-feature. They must never silently break approved Save/Share flows.

## 4. Legal acknowledgement

Legal version 1.0.0 adds a one-time local acknowledgement gate at the title-screen Begin action.

- The user can review Terms and Privacy before agreeing.
- EN / TH / HI are available in the acknowledgement UI.
- Acceptance stores only:
  - `lgt.legal.acceptedVersion`
  - `lgt.legal.acceptedAt`
- A future material Terms version can require acknowledgement again by changing `legalVersion`.
- No remote acceptance account or backend is introduced.

The acknowledgement is not used to obtain consent for optional remote processing; it records Terms acknowledgement locally.

## 5. Privacy truthfulness

The Privacy Policy must describe the actual runtime:

- optional profile stays in browser/device storage;
- reading locks and settings are local;
- Ask Ganesha reading storage keeps a fingerprint and structured semantic metadata, not the full exact question;
- exact Ask wording enters Journal only when the dedicated setting is enabled, OFF by default;
- Journal uses IndexedDB and offers individual, bulk and full-Journal deletion;
- PromptPay is completed outside the app and the app does not receive banking credentials or payment confirmation;
- Save/Share is initiated by the user and may hand content to the OS/browser/external destination chosen by the user;
- no Benedict Interactive advertising SDK, behavioural advertising SDK or product analytics SDK exists in V0.14.0;
- Google Fonts and web hosting can receive ordinary network request metadata;
- local data is not a cloud backup and is not separately encrypted by the app.

Do not use absolute statements such as “no data ever leaves the device.”

## 6. Third-party discipline

Third-party fonts, payment marks, platforms and services remain under their own rights/licences.

The project proprietary licence never overrides a valid third-party/open-source licence for that component.

Buy Me a Coffee remains planned/inactive until an official destination is configured.

## 7. Repository visibility

A proprietary licence does not make a public repository private.

Current production repository visibility remains an operational choice and must not be changed automatically because it can affect deployment/hosting. Before a major commercial launch, repository visibility and source exposure should be reviewed separately.

## 8. Protected product behavior

V0.14.0 must not change:

- Reading Engine 1.1.0
- Deck Ritual 1.1.0
- canonical 78-card selection integrity
- Daily / Ask / Focus persistence
- reading Save/Share behavior
- Lucky Numbers
- Tarot Library
- Journal data/capture/delete semantics
- Reading Hub
- PromptPay QR flow
- background audio lifecycle
- app icons/card viewers

## 9. Versioning

User-facing legal text has its own `legalVersion`, separate from runtime build.

Material changes to contractual Terms should increment the legal version and may trigger fresh acknowledgement. Editorial corrections that do not materially change rights can be handled according to release/legal review.

## 10. Legal-review caveat

This suite is designed conservatively for a global consumer software product, but no template can guarantee enforceability in every jurisdiction. Before a major paid/commercial/store launch, final text should be reviewed by qualified technology/IP counsel, especially the legal identity of the rights holder, official contact channel, governing-law language and any future remote-data/payment integration.

# Worldwide Ko-fi Support — Product Standard V1

**Product:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Introduced:** Runtime V0.16.0  
**Official destination:** `https://ko-fi.com/benedictinteractive`

## Purpose

Provide a polished worldwide voluntary-support route that feels native to Little Ganesha Tarot while keeping all provider/payment behavior completely separate from tarot logic.

This standard records P’Benz’s accepted 24 August 2026 product decision to use **Ko-fi** for worldwide support. It supersedes earlier V5.0 references that named Buy Me a Coffee as the planned worldwide provider.

## Non-negotiable rules

1. Support is optional.
2. Support never changes card selection, probability, interpretation depth, daily limits, reading locks, Journal behavior, Lucky Numbers, or feature access.
3. The Ko-fi destination is exactly `https://ko-fi.com/benedictinteractive`.
4. Do not invent, redirect, shorten, or silently replace the official destination.
5. Navigation to Ko-fi must be directly user initiated.
6. Ko-fi opens as an external destination with `noopener` / `noreferrer` protections.
7. Little Ganesha Tarot has no Ko-fi payment callback in V1.
8. Do not claim payment was received.
9. Do not create donor accounts, entitlements, premium reading tiers, support-linked unlocks, or support-linked probability.
10. Ko-fi failure or unavailability must not affect PromptPay or any reading mode.
11. The support surface must not add tracking or analytics dependency.
12. EN / TH / HI copy must be independently natural, concise and non-coercive.

## UX

Settings keeps the existing `Support the Project` group.

Worldwide is active and uses a premium support card with:

- localized Worldwide badge/title;
- Ko-fi provider label;
- active `Open Ko-fi` action.

Tapping the card action opens an in-app full-screen support sheet before leaving the app. This sheet provides context and an explicit external-navigation CTA rather than sending the user away unexpectedly.

The sheet contains:

- Little Ganesha Tarot / The Golden Path masthead;
- localized worldwide-support eyebrow/title;
- concise support rationale;
- Benedict Interactive identity;
- external-destination disclosure;
- one primary `Continue to Ko-fi` action;
- concise thank-you;
- optional-support disclaimer;
- Back to Settings and Back to Home.

The visual treatment follows Premium Minimal Sacred UI: dark teal glass, restrained antique-gold borders, generous spacing, minimal ornament and no casino/donation-pressure language.

## Localization

Supported first-class languages:

- English
- Thai
- Hindi (`hi-IN`, respectful `आप`)

`Little Ganesha Tarot`, `Benedict Interactive` and `Ko-fi` remain proper brand/provider names.

## Privacy / data

Little Ganesha Tarot does not collect Ko-fi payment/account data.

The app does not:

- send payment data;
- store donor identity;
- store transaction status;
- receive payment callbacks;
- attach reading/profile/Journal data to the Ko-fi URL;
- add analytics parameters to the destination.

Payment/account handling occurs on Ko-fi after user-initiated external navigation.

## Failure isolation

- Ko-fi unavailable → PromptPay and tarot remain usable.
- External browser/new-tab behavior unsupported → normal browser navigation behavior may be used by the platform.
- Support sheet failure → reading state must remain unchanged.
- Offline app use → support UI may open, but the external Ko-fi destination naturally requires network access.

## Regression protection

Opening or closing Worldwide Support must never:

- consume a Daily reading;
- consume a Focus;
- change Ask semantic locks;
- reroll Lucky;
- mutate Journal source state;
- change card probability;
- alter PromptPay state;
- change legal acknowledgement state.

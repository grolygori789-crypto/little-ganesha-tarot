# Release Notes — V0.16.0

## Worldwide Ko-fi Support

V0.16.0 replaces the inactive Worldwide `Coming soon` support state with the official Benedict Interactive Ko-fi destination:

`https://ko-fi.com/benedictinteractive`

The new worldwide flow is deliberately isolated from tarot and payment state:

Settings → Support the Project → Worldwide Support → Ko-fi support sheet → user-initiated external Ko-fi page.

## UX

The Ko-fi support sheet is designed as part of the existing Premium Minimal Sacred UI rather than as a generic outbound-link dialog.

It adds:

- EN / TH / HI native copy;
- dark teal / antique-gold editorial styling;
- explicit Benedict Interactive support identity;
- clear disclosure that Ko-fi opens externally;
- one primary CTA;
- Back to Settings / Back to Home;
- Reduced Motion compatibility.

## Business/privacy contract

Ko-fi remains voluntary support only.

No:

- payment backend;
- payment callback;
- donor account;
- entitlement;
- premium reading tier;
- unlock;
- probability/reading influence;
- tracking parameter;
- reading/profile/Journal data transfer.

PromptPay remains active and unchanged for Thailand.

## Runtime

Runtime and PWA cache identity move from V0.15.1 to V0.16.0.

Rollback: `34a6d27659f01eaf3ad703dece9c6017c68db2ae` (`Refresh Handoff V5.0`).

## QA status

Static/package QA is required before release. Real-device acceptance is still required for installed-PWA update behavior, final visual polish, external Ko-fi navigation and return-to-app behavior.

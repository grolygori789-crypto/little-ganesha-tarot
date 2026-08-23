# PromptPay Support — Product Standard V1

## Purpose

Provide a voluntary Thailand support route that feels native to Little Ganesha Tarot while keeping payment presentation completely separate from tarot logic.

## Non-negotiable rules

1. Support is optional and never changes readings, card selection, probability, interpretation depth, daily limits, Journal behavior or feature access.
2. PromptPay never auto-fills an amount in V1.
3. The QR itself stays black/white on a true white field with preserved quiet zone.
4. Do not recolor, crop tightly, decorate, animate, distort or place effects over the QR.
5. The user sees both recipient names:
   - `จักรพันธ์ เบญจศุภนิมิต`
   - `Jakraphan Benjasupanimit`
6. Always ask the user to verify the recipient name in their banking app before confirming payment.
7. The source bank screenshot is not a production asset. Ship only the cleaned QR crop needed for payment.
8. Do not display identification-number text from the source screenshot in the app UI.
9. Buy Me a Coffee remains disabled until an official destination URL is supplied and verified.
10. The support surface must not claim that payment was received; V1 has no payment callback or backend verification.

## UX

Settings keeps the existing Support the Project section. Thailand becomes active with `Open QR`; Worldwide remains `Coming soon`.

The PromptPay full-screen sheet contains:

- Little Ganesha brand masthead;
- localized Support in Thailand eyebrow and title;
- short scan/save guidance;
- PromptPay label;
- QR on a white frame;
- Thai + English recipient name;
- concise thank-you message;
- recipient verification reminder;
- Save QR primary action;
- same-device save guidance;
- optional-support disclaimer;
- Back to Settings and Back to Home navigation.

## Localization

Support UI is independently authored in English, Thai and Hindi. The recipient names are identity labels and remain unchanged across languages. `Little Ganesha Tarot`, `PromptPay` and `THE GOLDEN PATH` remain brand/product labels where appropriate.

## Privacy / data

The support UI has no analytics, account, payment state, transaction history or persistent storage of its own. The QR is a public payment destination asset by product intent. The original supplied banking screenshot must not be shipped.

## Failure isolation

- QR download failure → open the QR asset in a separate image view as fallback.
- Support UI failure → tarot remains usable.
- Buy Me a Coffee unavailable → PromptPay and tarot remain usable.
- Offline use → PromptPay QR remains available from the application shell after successful installation/update.

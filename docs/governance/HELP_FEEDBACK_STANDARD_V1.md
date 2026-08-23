# Help & Feedback Product Standard V1

**Product:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Runtime introduced:** V0.15.0  
**Contact identity polish:** V0.15.1  
**Official support email:** `benedict.support@gmail.com`

## Purpose

Help & Feedback is production-support infrastructure, not a divination mode and not an analytics system. It gives users a clear, low-friction way to report defects or send suggestions without adding accounts, a backend, behavioural tracking, or automatic data upload.

## Settings placement

`Settings → Help & Feedback`

Required actions:

1. Report a Problem
2. Send Feedback
3. Copy Diagnostic Info

The group appears before `Support the Project`.

## Report a Problem

The user writes a short description. Technical diagnostics are ON by default and visibly previewed. The app prepares a `mailto:` draft addressed to Benedict Interactive Support.

The user remains in control of the final send action in their email client.

## Send Feedback

The user writes product feedback or a feature suggestion. Technical diagnostics are OFF by default because general feedback usually does not require device information. The user may opt in before opening the email draft.

## Diagnostic contract

Diagnostics may include only:

- Little Ganesha Tarot build version;
- language (`en`, `th`, `hi`);
- coarse operating platform;
- browser family and major version;
- Browser vs Installed PWA;
- current screen label; and
- ISO timestamp.

Diagnostics must not automatically include personal content, reading output, Ask question wording, Journal content, profile fields, payment information, clipboard contents, files, screenshots, precise location, advertising identifiers, or persistent cross-session tracking IDs.

## Email / privacy behavior

The app must not send support data in the background. `mailto:` opens the user's configured email workflow. Nothing is transmitted by the app merely by opening the Help & Feedback form.

Every report screen must state that users should not include passwords, payment details, private Journal content, or personal reading questions.

Screenshot/file attachments remain user-controlled in the email client. The PWA does not capture or attach screenshots automatically.

## Localization

Help & Feedback UI is independently authored in English, Thai and Hindi. Technical labels in the generated diagnostic block may remain stable English for support triage.

## Failure / fallback

If `mailto:` is not usable on a device, users can copy report details or copy diagnostics and send them through another channel. Clipboard access must have a legacy fallback where practical.

## Protected boundaries

Help & Feedback must not change tarot RNG/selection, daily locks, semantic Ask persistence, Journal storage, Save/Share output, support/payment behavior, audio lifecycle, or legal acknowledgement state.


## Public studio contact identity

From runtime V0.15.1, Help & Feedback may display the following public studio contact identity:

- **Studio:** Benedict Interactive
- **Location:** Bangkok, Thailand
- **Support:** `benedict.support@gmail.com`

`Bangkok, Thailand` is a coarse studio-location descriptor only. It must not be presented as a registered office, legal service address, or corporate-registration claim unless that status is separately verified and explicitly approved. No street address is required by this product standard.

The contact block is informational only and does not change the privacy boundary, mailto transport, diagnostics scope, or user-controlled sending model defined above.

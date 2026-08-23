# Release Notes — V0.15.0

## Help & Feedback + Tarot Library Search Fix

V0.15.0 adds a production support channel and fixes a mobile usability defect in Tarot Library search.

### Fixed

- Tarot Library search no longer rebuilds/replaces the focused search input on every keystroke.
- Search updates the card grid and result count in place, preventing mobile software keyboards from being dismissed after each character.
- The change avoids disrupting Thai and Hindi/Devanagari IME composition.

### Added

Settings now includes **Help & Feedback**:

- Report a Problem
- Send Feedback
- Copy Diagnostic Info

Official support email: `benedict.support@gmail.com`

Report/feedback email is user initiated through `mailto:`. The app does not automatically submit reports in the background.

### Privacy

Optional technical diagnostics are deliberately non-sensitive and limited to build, language, coarse platform, browser, PWA/browser mode, current screen and timestamp.

No Ask question text, Journal content, readings, profile data, payment information, screenshot or file is automatically attached.

### Runtime

Runtime build and PWA cache identity move from V0.14.0 to V0.15.0.

### Rollback

`3effae89a2f3fddfed0914b38250629aeefbffd7` — `Add Legal & IP Suite V0.14.0`

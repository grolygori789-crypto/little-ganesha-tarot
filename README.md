# Little Ganesha Tarot — V0.12.0 Reading Hub

**Studio:** Benedict Interactive  
**Target runtime:** V0.12.0  
**Stable baseline runtime:** V0.11.1  
**Stable baseline GitHub HEAD:** `2bc6e664d2347add826843678ab9ece10ed37653` — `Commit: Fix Journal numerals V0.11.1`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)

## V0.12.0

V0.12.0 turns the bottom-navigation **Read / เปิดไพ่ / रीडिंग** placeholder into a premium **Reading Hub**. The Hub is navigation and guidance only: it does not draw cards, alter probabilities, modify daily locks, or introduce a new tarot mode.

The experience begins with **What brings you here today?** rather than asking users to understand spread names first. Five intent chips can highlight the most suitable existing reading without auto-launching it:

- quick reflection → Daily Guidance;
- one clear question → Ask Ganesha;
- see how the situation is unfolding → Three-Card Reading;
- find direction → The Golden Path;
- something feels stuck → Remove the Obstacle.

Users remain free to choose any reading. The recommendation is an interface aid, not divination and not a hidden personalization model.

## Premium Reading Sanctuary

The Hub uses the same Deep Teal / Antique Gold / Warm Ivory visual language as the rest of Little Ganesha, with a restrained canonical card-back fan, fine editorial rules, generous spacing, and calm motion. It avoids duplicating the Home dashboard: Home remains the product overview, while Read becomes the dedicated place for choosing and starting a tarot reading.

## Live reading status

The Hub reads existing local state without changing it:

- Daily Guidance shows whether today’s card is already set and offers a revisit;
- Ask Ganesha may show how many same-day question records are already kept;
- Three-Card, Golden Path and Remove the Obstacle show 0–6 Focus progress and continue to reopen existing same-day readings through their protected storage modules.

All numbers are UI status only. No stored reading record is rewritten by the Hub.

## Native languages

Reading Hub UI and guidance are independently authored for **English, Thai and Hindi**. Brand masthead text remains non-localized.

## Protected behavior

V0.12.0 does not modify Reading Engine 1.1.0, Deck Ritual 1.1.0, the canonical 78-card model, full-deck pre-shuffle/prebound selection, Daily Guidance persistence, Ask Ganesha semantic persistence, Focus locks, Save/Share, Journal IndexedDB, Tarot Library, Lucky Numbers, card viewers, universal icons, or the accepted background-audio lifecycle.

Existing reading modules are opened through their already-exported public UI APIs. The Hub never reimplements their reading logic.

## Runtime coherence

HTML metadata, body build marker, all application asset query strings, `window.LGT_BUILD`, manifest icon URLs, visible build label, Service Worker build/cache IDs, and Service Worker application-shell URLs move together to V0.12.0. `css/read-hub.css` and `js/read-hub.js` are included in the application shell.

## Risk

Functional change: **MEDIUM** — new full-screen navigation surface that launches protected existing modes.  
Operational deployment: **HIGH** — Service Worker/cache identity changes with the runtime build.  
Rollback baseline: `2bc6e664d2347add826843678ab9ece10ed37653`.

## Acceptance

Static, syntax, runtime-coherence, navigation-contract and packaged-checksum QA are included. Real-device acceptance remains required for EN/TH/HI layout, bottom Read navigation, intent highlighting, Daily/Ask/Focus status, launch into all five reading modes, Back/Home behavior, reduced motion, safe areas and PWA cache activation.

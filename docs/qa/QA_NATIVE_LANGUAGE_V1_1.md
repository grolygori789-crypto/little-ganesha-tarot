# QA — Native Language V1.1 Complete Fix

Source baseline
- Current main commit: b89fe712d3b5152801e0055b4c40718d42042a5a
- Current-main index Git blob before patch: 805d7b92df7226d29a257c50fbf43ec873afa38a — PASS

Static/automated QA
- JavaScript syntax — PASS
- 78 card IDs 00–77 — PASS
- Only EN/TH upright text changes in card objects — PASS
- Daily lenses preserved — PASS
- Card reflections preserved — PASS
- Hindi upright text preserved — PASS
- Ask semantic module not wrapped — PASS
- Three / Golden / Obstacle narrative modules not wrapped — PASS
- Lucky content not wrapped — PASS
- Library / Journal content not wrapped — PASS
- No dynamic reading IDs rewritten — PASS
- No subtree MutationObserver — PASS
- Native language script loads reduced from 9 to 2 — PASS
- Zoom lock preserved in index — PASS
- Portrait lock preserved in index — PASS
- No Reading Engine edit — PASS
- No Deck Ritual edit — PASS
- No storage edit — PASS
- No service-worker edit — PASS
- No audio edit — PASS
- No Ko-fi / PromptPay edit — PASS

Real-device acceptance required after deploy
1. Daily: restore today's card, verify restored message is visible.
2. Daily: open all six lenses on one card; verify each answer is different and relevant to its heading.
3. Ask: exact repeat + similar-theme repeat; verify same-reading messages and question-specific answer.
4. Three / Golden / Obstacle: complete and revisit a focus; verify focus context and daily lock.
5. Lucky: verify Core / Supporting / Balancing text are distinct.
6. Save/Share: compare displayed reading with exported image.
7. EN -> TH -> EN while reading; verify state copy is not replaced by generic intro.
8. Animation, five-track music, Ko-fi, PromptPay, zoom lock, portrait lock.
9. Hindi quick regression check.

Real-device PASS is not claimed by this package.

# QA — Native Language V1

Baseline main:
a9e23bfc808f2f7194018c6e2f17ac6675354436

Static checks:
- Exact baseline index Git blob f6b9a81aa71e90d84a9da49694e9fa69ada9fa07: PASS
- JavaScript syntax: PASS
- 78 card IDs 00–77 with English + Thai direct meaning/action: PASS
- Language stages load before their consumer UI modules: PASS
- Zoom lock preserved: PASS
- Portrait lock preserved: PASS
- No Reading Engine edit: PASS
- No service-worker edit: PASS
- No audio edit: PASS
- No Ko-fi/PromptPay logic edit: PASS
- No Object.defineProperty/installSlot runtime interception: PASS
- Hindi content intentionally unchanged: PASS

Real-device acceptance still required:
1. EN → TH → EN menus/settings
2. Daily, Ask, 3-Card, Golden Path, Remove the Obstacle
3. Lucky Numbers, Tarot Guide, Journal
4. Animation + five-track audio + Ko-fi
5. Zoom lock + portrait lock
6. Hindi quick regression check

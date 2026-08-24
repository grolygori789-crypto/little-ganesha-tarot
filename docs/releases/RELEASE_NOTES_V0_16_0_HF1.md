# Little Ganesha Tarot — V0.16.0-HF1 Defect Hotfix

**Date:** 24 August 2026  
**Baseline:** V0.16.0 @ `cb1d5624d27bb1ae9fc07516541ed9ebf03a6ec3`  
**Type:** Pre-launch defect-only stabilization hotfix

## Fixed

- Canonical Hindi ↔ EN/TH Ask semantic matching, including legacy Hindi semantic records.
- Journal Ask identity is derived from the exact displayed question fingerprint.
- Journal Three / Golden / Obstacle source identity uses the active Focus instead of guessing only from card IDs.
- PromptPay QR works from the canonical pre-cached asset even though the isolated legacy support module still requests its historical query string.
- Lucky Number Set preserves Core→Supporting and Supporting→Balancing pair order when zero leads.
- Reading Hub Ask count displays unique reading sessions rather than semantic-alias fingerprint count.
- Legal Center Third-Party Notices identify Ko-fi as the active worldwide support provider.
- Static language fallback is repaired before the main app language pass.
- Live `window.LGT_BUILD` is normalized to V0.16.0 even when legacy modules attempt older assignments.
- A current hotfix QA gate is added so legacy V0.5.x generic tests are no longer treated as the final release gate.

## Protected behavior intentionally untouched

Reading Engine 1.1.0, Deck Ritual 1.1.0, card probability/selection, Daily logic, approved reading narratives, Focus daily locks, Journal deletion/tombstone behavior, Save/Share transport, Tarot Library search/IME behavior, audio lifecycle, PromptPay recipient identity and Ko-fi destination.

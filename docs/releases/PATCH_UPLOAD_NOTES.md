# PATCH UPLOAD NOTES — V0.4.7

**Package:** Little Ganesha Tarot V0.4.7 — Reading Actions Standard  
**Baseline:** V0.4.6 at `470300f2d6fe46349c27241d223b892045409363`

## Upload

Overlay the package at repository root on `main` without changing folder structure. Do not delete unrelated assets or application files.

Recommended commit message:

`Standardize reading Save Share V0.4.7`

## After Push

Re-read deployed `main`, confirm all live build/cache markers are `0.4.7`, allow service-worker propagation, then run the real-device checklist in `docs/qa/QA_V0_4_7.md`.

Important regression checks: Daily Guidance must still Save/Share as before; Ask Ganesha must Save a full reading, Share with the exact question hidden by default, optionally include the question, keep Ask Another in its existing position, and expose Back to Home beneath it.

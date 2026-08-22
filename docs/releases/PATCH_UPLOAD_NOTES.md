# PATCH UPLOAD NOTES — V0.4.6

## Target

Little Ganesha Tarot V0.4.6 — Semantic Ask Ganesha

## Baseline

GitHub `main` verified before development:

`0b35a8ec749644abc66c300e3b197e29365951da` — `Add Spiritual Ask context V0.4.5`

## Upload method

Extract the supplied ZIP and overlay its repository-relative contents onto the local repository root. Review GitHub Desktop Changes, then commit and push.

Recommended commit message:

`Upgrade Ask Ganesha semantics V0.4.6`

## Expected functional change

Ask Ganesha gains a Semantic Slot Parser, micro-facets, Question Contract, card-context profile, Semantic Bridge, contract-driven Answer Composer, and Answer Validator. The primary answer must stay on the exact subject, perspective, metric, and explicit timeframe of the user's question.

## Protected behavior

Do not manually alter Reading Engine, Daily Guidance, Daily Save/Share, audio, profile, or canonical card assets during upload.

## After push

Re-read deployed `main`, confirm all runtime/build/cache markers are 0.4.6, allow GitHub Pages/service-worker propagation, then perform the real-device checklist in `docs/qa/QA_V0_4_6.md`.

Older versioned patch manifests and release documents may remain as historical rollback provenance. Overlay extraction does not delete tracked historical files automatically.

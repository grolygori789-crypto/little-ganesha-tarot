# PATCH UPLOAD NOTES — V0.4.5

## Target

Little Ganesha Tarot V0.4.5 — Contextual Ask Ganesha

## Baseline

GitHub `main` verified before development:

`fd494bfbb4edf1271cd0060a7c5a066c4c35b310` — `Add Ask Ganesha reading V0.4.4`

## Upload method

Extract the supplied ZIP and overlay its repository-relative contents onto the local repository root. Review GitHub Desktop Changes, then commit and push.

Recommended commit message:

`Upgrade Ask Ganesha context V0.4.5`

## Expected functional change

Ask Ganesha gains local question analysis, contextual answer composition, ambiguous-focus clarification, and factual-boundary reframing while preserving the existing one-question/one-card flow and same-question/same-day card rule.

## Protected behavior

Do not manually alter Reading Engine, Daily Guidance, Daily Save/Share, audio, profile, or canonical card assets during this upload.

## After push

Re-read deployed `main`, confirm runtime/build markers are 0.4.5, allow GitHub Pages/service-worker propagation, then perform the real-device checklist in `docs/qa/QA_V0_4_5.md`.

Older versioned patch manifests/docs may remain in Git history or as historical tracked files. Overlay extraction does not delete them automatically.


## Final V0.4.5 scope note

This regenerated V0.4.5 package includes the approved ninth **Spiritual & Unseen / ศรัทธา จิตวิญญาณ และสิ่งเร้นลับ** context family, its 78-card bilingual matrix, analyzer facets, and symbolic-only / unseen-threat epistemic boundaries. It supersedes any earlier local V0.4.5 ZIP generated before this addition.

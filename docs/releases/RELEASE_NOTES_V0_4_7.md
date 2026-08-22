# Little Ganesha Tarot — Release Notes V0.4.7

## Reading Actions Standard

V0.4.7 makes **Save Image + Share** the standard result utilities for every tarot reading mode. Daily Guidance and Ask Ganesha are the two currently implemented reading modes, and both now route export delivery through the same small shared module.

Future reading modes must follow the same result-action standard while remaining free to use spread-specific curated export layouts.

## Ask Ganesha

Ask Ganesha gains a curated bilingual export renderer. Saved images contain the complete reading including the exact question. Shared images hide the exact question by default; the user can explicitly opt in to include it. The opt-in is session-only and defaults off every time Ask is reset.

When the question is hidden, the export uses a neutral “Insight from This Reading / ข้อความจากการอ่านครั้งนี้” heading instead of implying that the omitted question is visible.

The existing Ask Another Question / ถามเรื่องอื่น primary CTA remains in its current position below the card flow. A visually quieter Back to Home / กลับหน้าหลัก action is added immediately beneath it after reveal.

## Shared Export Module

New `js/reading-export.js` centralizes native file sharing, local-save fallback, status handling, and small canvas helper utilities. New `js/ask-export.js` owns only the Ask-specific export composition.

Daily Guidance keeps its existing image renderer and simply delegates the delivery step to the shared module, minimizing regression risk.

## Privacy

No export requires a backend upload. Ask raw question text is not added to persistent same-question storage. The Share question toggle affects only the generated shared image and is not persisted.

## Protected Systems

Reading Engine 1.0.2, Daily lenses/content, Question Guard, Question Analyzer v3, Question Contract v1, Ask Context v2, Semantic Ask v1, same-question/same-day behavior, canonical card assets, and audio lifecycle are not functionally redesigned in this release.

## Release Gate

Automated/unit/package/version/language/structure/checksum/archive-reextraction checks must pass before upload. Android and other real-device Save/Share behavior remains a post-deploy QA gate.

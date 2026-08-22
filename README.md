# Little Ganesha Tarot — V0.4.7 Reading Actions Standard

**Studio:** Benedict Interactive  
**Target runtime:** V0.4.7  
**Baseline runtime:** V0.4.6  
**Baseline GitHub HEAD:** `470300f2d6fe46349c27241d223b892045409363` — `Upgrade Ask Ganesha semantics V0.4.6`  
**Risk:** MEDIUM  
**Architecture:** local-first PWA · no AI/API/backend added

## Purpose

V0.4.7 establishes **Save Image + Share as the standard result utilities for every tarot reading mode**. The currently implemented Daily Guidance and Ask Ganesha both use the same shared export transport and fallback behavior. Future reading spreads must adopt the same standard rather than inventing one-off save/share flows.

This release does not change card selection, Reading Engine logic, Semantic Ask interpretation, the nine Ask context families, or same-question/same-day behavior.

## Reading Result Action Standard

Every completed reading mode must provide:

- **Save Image** — creates a curated reading image locally on the device.
- **Share** — uses the native file share sheet when supported; otherwise saves the generated image as a graceful fallback.
- No server upload is required for export.
- Reading chrome/navigation/music controls are never baked into the exported image.
- Each reading mode owns a curated renderer for its own content, while transport/fallback behavior is shared through `js/reading-export.js`.

This keeps the implementation reusable without forcing every spread into the same visual layout.

## Ask Ganesha Save & Share

Ask Ganesha now exports a purpose-built reading card containing the selected tarot card, reading focus, direct semantic answer, card rationale, conditions, Little Ganesha reflection, carry-forward question, date, and a concise reflection disclaimer.

Privacy behavior is deliberate:

- **Save Image** always saves the complete private reading, including the user’s exact question.
- **Share** hides the exact question by default.
- The user may explicitly enable **Include my question in the shared image** before sharing.
- The toggle is off by default and is not persisted.
- Hiding the exact question does not claim to anonymize the reading; the interpretation itself may still reveal the topic.
- Raw Ask question text is still not stored in same-question local persistence.

When the exact question is hidden, the exported heading changes from “Answer to Your Question” to the neutral “Insight from This Reading” / “ข้อความจากการอ่านครั้งนี้”.

## Ask Navigation

The existing **Ask Another Question / ถามเรื่องอื่น** primary button remains in its current position directly below the card flow. It is not moved.

A lower-emphasis **Back to Home / กลับหน้าหลัก** action is added directly beneath it only after the reading is revealed. It closes Ask Ganesha through the existing navigation lifecycle rather than reloading the application.

## Shared Export Architecture

`js/reading-export.js` is a small reusable browser module responsible for:

- file creation handoff;
- native file sharing;
- save fallback when direct sharing is unavailable;
- common canvas text/layout helpers;
- localized date formatting;
- deterministic status callbacks for each reading UI.

Daily Guidance keeps its already-tested curated renderer and now routes delivery through the shared module. Ask Ganesha uses `js/ask-export.js` as its own renderer and the same shared delivery module.

This separation keeps complexity in the easy-to-medium range: shared transport, isolated renderers, no backend, no framework migration, and no Reading Engine refactor.

## Protected Behavior

V0.4.7 intentionally preserves:

- Reading Engine `1.0.2`;
- Daily Guidance card selection and persistence;
- Daily Guidance six lenses;
- the Daily curated export content/layout;
- Question Guard;
- Question Analyzer v3;
- Question Contract v1;
- Ask Context v2 including Spiritual & Unseen;
- Semantic Ask v1 no-drift behavior;
- Ask same-question/same-day same-card rule;
- no raw Ask question persistence;
- audio lifecycle and canonical tarot assets.

## Languages

All newly visible copy is authored separately for English and Thai. English is written as native product copy rather than translated Thai; Thai is written as natural Thai UI language rather than literal English translation.

## Validation

The release package runs the full inherited semantic/reading regression suite plus dedicated reading-action tests covering:

- shared export module wiring and dependency order;
- Daily migration to shared delivery without replacing its renderer;
- Ask Save/Share controls;
- Ask complete-save vs privacy-aware-share behavior;
- default-off question inclusion;
- Ask Another position preservation;
- Back to Home secondary action;
- TH/EN copy completeness;
- fallback from unavailable native sharing to local save;
- Reading Engine / Semantic Ask regression;
- version coherence and repository structure;
- archive checksum and clean re-extraction.

Real-device Save/Share validation remains required after V0.4.7 is deployed.

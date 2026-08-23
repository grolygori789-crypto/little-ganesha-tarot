# Journal Product Standard V1

## Purpose

Journal is the private continuity layer of Little Ganesha Tarot. It should feel like a personal
reflection archive that becomes more meaningful over time, not a generic history table, analytics
screen or note-taking utility.

## Core identity

- Product name inside the feature: **My Path** / native equivalent.
- Visual tone: quiet, editorial, intimate and premium.
- The reading itself remains the primary source; Journal preserves and reflects on it.
- Canonical card artwork is reused as the visual anchor.
- Journal never changes card probability, card selection, Lucky Number selection or any daily lock.

## Storage and privacy

- Journal entries use local IndexedDB (`little-ganesha-journal`).
- No login, remote account, cloud sync or server Journal storage is introduced by V1.
- Automatic capture has a dedicated on-device setting.
- Exact Ask Ganesha question storage is a separate setting and is OFF by default.
- A Journal entry may contain a localized snapshot, card IDs/numbers, Focus, optional exact Ask
  question, user reflection and bookmark state.
- User reflections are never inserted into tarot selection logic.

## Snapshot integrity

A captured reading is a historical snapshot. Future content edits must not silently rewrite old
Journal wording. If the same reading is revisited in another supported locale, the Journal may add a
second locale snapshot under the same entry identity.

Snapshot identities are deterministic per source reading:

- Daily Guidance: local date.
- Ask Ganesha: local date + Ask reading identity.
- Three-Card / Golden Path / Remove the Obstacle: local date + Focus.
- Lucky Numbers: local date.

## Capture eligibility

Only completed/displayed reading results are eligible for automatic capture. Journal must not consume
incomplete tarot sessions. Lucky Numbers may be restored from its completed daily record.

Journal capture is additive. It reads the public/storage state already produced by each mode and writes
only to Journal storage.

## Deletion contract

Deletion is a privacy/control feature, not a reroll mechanism.

- Single entry deletion is available from Entry Detail.
- Multi-select deletion is available through explicit Select mode.
- Normal timeline cards do not display permanent trash buttons.
- All destructive actions require confirmation.
- Clear Journal Data requires two confirmation stages.
- Journal deletion never removes or edits `lgt.reading.daily.v1`, Ask storage, Signature Focus storage,
  Lucky Numbers storage or any other source reading state.
- A deliberately deleted source entry is locally suppressed from automatic re-capture for that same
  source identity. This preserves the user's deletion while keeping the original reading lock intact.

## Timeline and calendar

Timeline is the default reading surface. Entries group by local date and use restrained visual
thumbnails. Calendar provides month navigation and shows:

- a marker/count for days with saved entries;
- a distinct ring state when at least one entry contains a user reflection.

Search/filter state should work consistently across timeline and calendar where practical.

## Entry detail

Entry detail includes:

- mode, date/time and Focus where relevant;
- canonical card artwork or Lucky Number orbs;
- saved reading snapshot;
- optional exact Ask question only when the user permitted storage;
- editable personal reflection;
- bookmark action;
- overflow menu containing single-entry deletion.

## Patterns

Patterns are descriptive analytics over Journal data, never supernatural claims. Examples:

- a card appearing more than once in the selected month;
- the Focus most frequently explored in the selected month.

Do not write copy such as “the universe is sending you this card.” A pattern may invite observation;
it must not manufacture certainty.

## Monthly reflection

When a month has saved entries, Journal may show:

- total saved readings;
- entries with personal reflections;
- bookmarks;
- one open-ended reflection question.

This is a reflective summary, not a prediction score.

## Languages

English, Thai and Hindi are first-class. UI and product copy are independently natural in each
language. Historical snapshots stay faithful to the locale in which they were captured; a fallback
locale must be disclosed rather than silently presented as a new translation of the old reading.

## Accessibility and motion

- Full keyboard-accessible buttons and form controls.
- Visible focus treatment.
- Destructive confirmation dialogs use proper modal semantics.
- Reduced Motion removes nonessential Journal entrance/hover movement without hiding information.
- All core actions remain usable on small mobile screens and safe-area devices.
- Numeric counters use an explicit lining-numeral treatment; digit **1** must remain unmistakably a numeral and never resemble uppercase **I**.

## Protected systems

Journal must not modify Reading Engine, Deck Ritual, canonical deck IDs/artwork, Ask semantic matching,
Daily/Focus locks, Lucky result generation, existing Save/Share, audio lifecycle or Tarot Library
content/navigation unless a future release explicitly changes this standard.

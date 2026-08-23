# Little Ganesha Tarot — V0.11.0 Private Journal

**Studio:** Benedict Interactive  
**Target runtime:** V0.11.0  
**Stable baseline runtime:** V0.10.0  
**Stable baseline GitHub HEAD:** `dc710973b0dce2e577964c520636f1969e4c3418` — `Add Tarot Library V0.10.0`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)

## What ships

V0.11.0 turns **Journal** from a placeholder into **My Path**, a private reflection archive that
preserves the user's completed Little Ganesha experiences as a calm editorial history rather than a
plain notes list.

The Journal includes:

- a premium timeline grouped by local date;
- a monthly calendar with saved-entry markers and a reflection ring;
- real Little Ganesha card artwork and Lucky Number orbs as visual anchors;
- search by card, mode, Focus, saved reading text, question (when permitted), or personal reflection;
- mode filters and a Bookmarked filter;
- entry detail pages containing the saved reading snapshot, cards/numbers and personal reflection;
- bookmarks;
- one-entry deletion and multi-select bulk deletion with confirmation;
- factual monthly pattern observations and a monthly reflection prompt;
- private Journal settings, including automatic capture and exact Ask Ganesha question privacy;
- a two-stage **Clear Journal Data** action.

## Snapshot model

Journal entries preserve a snapshot of the reading text that was displayed when a completed reading
was captured. This prevents an old Journal entry from silently changing if future product releases
refine tarot copy. A revisited reading in another supported locale may add a localized snapshot to the
same Journal entry without overwriting the older locale snapshot.

The Journal captures completed Daily Guidance, Ask Ganesha, Three-Card Reading, The Golden Path,
Remove the Obstacle and Lucky Numbers results. It does not alter how those modes select, lock, restore
or reroll their results.

## Privacy and control

The Journal is local-first and private by design. Entries are stored in an IndexedDB database named
`little-ganesha-journal` on the user's device. There is no account, cloud sync or remote Journal
upload in this release.

**Keep completed readings in my Journal** is the capture control. **Save exact Ask Ganesha questions**
is OFF by default; when it is off, the Journal can keep the reading without storing the exact question
wording.

Deleting a Journal entry deletes only the Journal snapshot, reflection and bookmark. It never deletes
or resets Daily Guidance state, Ask semantic state, Signature Focus locks or Lucky Numbers state.
Deleted current-day source entries are suppressed from automatic re-capture, so a deliberate delete
does not immediately reappear while the original reading remains valid elsewhere in the app.

## Premium visual system

My Path uses the same Deep Teal / Antique Gold / Warm Ivory visual language as Little Ganesha while
being intentionally calmer than the reading rituals. Existing canonical card art is reused rather than
duplicated or replaced. Subtle glow, fine rules, restrained sacred geometry, generous spacing and
editorial typography create the feeling of a private archive rather than a file manager.

Trash actions stay out of the normal timeline surface. Single deletion lives inside entry detail;
bulk deletion appears only after the user enters Select mode. Destructive actions use an understated
trash icon and explicit confirmation.

## Patterns and monthly reflection

Pattern cards are computed only from saved Journal data. They may surface factual observations such
as a repeated card or the most frequently explored Focus. They do not claim that repetition proves a
supernatural message or future event.

The monthly reflection card summarizes saved readings, reflections and bookmarks and offers one
open-ended question for the user to consider.

## Native languages

Journal UI, privacy controls, deletion flows, calendar/timeline labels, pattern copy, reflection prompts
and Settings copy are authored for **English, Thai and Hindi**. Existing reading snapshots are kept in
the locale in which they were captured; if that entry also has a snapshot in the currently selected
locale, the Journal uses it.

## Protected behavior

V0.11.0 does not modify Reading Engine 1.1.0, Deck Ritual 1.1.0, canonical 78-card IDs/artwork,
pre-shuffle/prebound selection integrity, Daily Guidance selection persistence, Ask Ganesha semantic
persistence, Signature Focus daily locks, existing reading Save/Share, Hindi safety/semantic behavior,
Lucky Numbers V0.9.1 result persistence, Tarot Library V0.10.0 content/navigation, audio lifecycle
V0.5.3, card viewers or universal icons.

## Runtime coherence

The PWA build/cache identity moves coherently to V0.11.0: HTML metadata and asset query strings,
manifest icon references, `window.LGT_BUILD`, visible build label, Service Worker build/cache IDs and
application-shell URLs all move together. Journal CSS and JavaScript are added to the application shell.

Because the Service Worker identity changes, deployment is operationally HIGH risk even though Journal
is additive and does not write to protected reading-state stores.

## Acceptance

Static, syntax, storage-contract, deletion-isolation and package QA are included and pass.
**Real-device V0.11.0 acceptance remains required** for Journal capture after each reading mode,
EN/TH/HI layouts, calendar/timeline interaction, reflection editing, bookmarks, single/bulk delete,
Settings privacy toggles, Clear Journal Data, reduced motion, mobile safe areas and PWA refresh/cache
activation.

# Release Notes — V0.11.0 Private Journal

V0.11.0 ships **My Path**, the first complete Journal experience for Little Ganesha Tarot.

### New

- Premium timeline and monthly calendar.
- Private IndexedDB Journal storage.
- Automatic completed-reading snapshots for Daily Guidance, Ask Ganesha, Three-Card Reading,
  The Golden Path, Remove the Obstacle and Lucky Numbers.
- EN / Thai / Hindi Journal experience.
- Entry detail with canonical card art / Lucky Number orbs.
- Personal reflection editor and bookmarks.
- Search and mode/bookmark filters.
- Single deletion, Select-mode bulk deletion and two-step Clear Journal Data.
- Factual monthly pattern observation and monthly reflection summary.
- Settings controls for automatic Journal capture and exact Ask question privacy.

### Privacy behavior

Exact Ask Ganesha question storage is OFF by default. Deleting a Journal entry does not alter the
original tarot/Lucky reading state. Deleted current source identities are suppressed from automatic
re-capture so deliberate deletion remains respected without opening a reroll path.

### Compatibility

Reading Engine 1.1.0 and Deck Ritual 1.1.0 are unchanged. All previously accepted reading modes,
Lucky Numbers V0.9.1 and Tarot Library V0.10.0 remain protected.

### Deployment

Runtime/cache identity moves to V0.11.0. Service Worker shell/cache activation is therefore an
operational HIGH-risk deployment step and requires real-device refresh validation after upload.

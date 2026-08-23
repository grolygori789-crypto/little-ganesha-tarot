# Release Notes — V0.5.4

## Three-Card Artwork Viewer

V0.5.4 adds an optional close-up view for artwork in the completed Three-Card Reading.

The default result layout remains intentionally compact: each card stays beside its contextual interpretation so all three positions read as one story. The new viewer is only for users who want to inspect the illustration more closely.

### Interaction

- Tap/click a revealed card image to open it larger.
- Enlarged size is intentionally close to the single-card reading presentation rather than an edge-to-edge full-screen takeover.
- A small magnifier cue sits on the artwork instead of adding repeated “tap to enlarge” copy below every card.
- Close with ×, backdrop tap, or Escape.
- Keyboard: focus artwork, Enter/Space to open, Tab remains inside the modal, focus returns to the originating artwork on close.
- Thai/English accessibility labels follow the active app language.
- Reduced Motion disables the viewer transition.

### Architecture

The viewer is a non-destructive presentation extension. It does not participate in card selection, reading composition, persistence, export, or audio state.

### Protected systems

Reading Engine 1.1.0, compact 78-card ritual, Daily Guidance, Ask semantic lock, Three-Card daily lock/narrative, Quiet Countdown, Save/Share, profile age/zodiac and V0.5.3 audio lifecycle are unchanged.

### Runtime identity

Runtime advances from V0.5.3 to **V0.5.4**. All applicable live build/cache markers must advance together.

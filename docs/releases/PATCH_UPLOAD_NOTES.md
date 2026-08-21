# V0.4.2 — Upload Notes

## Upload method

1. Extract the V0.4.2 upload ZIP.
2. Overlay all included files/folders onto the local repository root.
3. Open GitHub Desktop and review Changes.
4. Commit and Push.

The package already uses repository-relative destinations. Do not move QA, release, checksum, governance, or test files back to root.

## Suggested commit name

`Upgrade Daily Guidance and layout V0.4.2`

## Post-deploy smoke check

Confirm on a real phone:

- Settings/build shows `0.4.2`
- Daily Guidance opens and restores the same card for the same local day
- revealed card is clearly larger and remains comfortably inside the viewport
- Reading media player is centered and does not clip either side
- each Daily Lens opens and only one lens stays open at a time
- Thai Daily Lens copy reads naturally and immediately
- English Daily Lens copy reads naturally and immediately
- switching TH/EN while reading updates lens labels/content correctly
- Home, Settings, audio, Title and Return-to-Title behavior remain intact
- no stale V0.4.1 shell is served after service-worker update/refresh

## Historical files

Older working-tree documents should only be retained when they still serve active rollback/provenance/migration needs. Git history remains the long-term historical archive.

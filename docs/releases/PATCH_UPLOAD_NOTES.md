# V0.4.3 — Upload Notes

## Upload method

1. Extract the V0.4.3 upload ZIP.
2. Overlay the extracted repository-relative files/folders onto the local repository root.
3. Review changes in GitHub Desktop.
4. Commit and push.

## Recommended short commit names

All options below stay under 50 characters:

- `Add save and share for daily guidance`
- `Daily guidance save share V0.4.3`
- `Add reading image export and share`

## Quick verification after overlay

Check that:

- Settings/build shows `0.4.3`
- Daily Guidance still reveals the same card correctly
- after reveal, **Save Image** and **Share** buttons appear
- tapping **Save Image** downloads a PNG
- tapping **Share** opens the native share sheet on supported devices
- if direct share is unsupported, the app falls back to saving the image instead

## Important behavior note

The exported PNG is a curated reading image, not a raw screenshot. This is intentional.

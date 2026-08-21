# Little Ganesha Tarot — Release Notes V0.4.3

## Release name
Save & Share Reading

## Summary

V0.4.3 upgrades Daily Guidance with a polished export workflow.

Users can now:

- save a generated image of the reading,
- share that image through the device's native share sheet when supported,
- fall back to saving automatically if direct sharing is unavailable.

## What changed

### Runtime/UI
- added `reading-share` section to the Daily Guidance interpretation screen
- added **Save Image** and **Share** actions
- added export status messaging in both English and Thai
- added canvas-based generation of a curated reading image
- preserved the existing Daily Lens content and reading flow

### Styling
- added premium save/share action styling to `css/reading.css`
- kept the export controls visually consistent with the existing reading theme

### Packaging / docs
- promoted current-version docs only
- kept repository-ready categorized documentation under `docs/`
- updated package/build markers from `0.4.2` to `0.4.3`

## Notes

This release does **not** change the core reading engine or Daily Lens content model.

The exported image is intentionally curated and does not include screen-only UI such as the media player or navigation controls.

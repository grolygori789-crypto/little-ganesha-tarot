# V0.3.5 Upload Notes

This is an **overlay patch for the existing `little-ganesha-tarot` repository**.

## Upload
Copy the package contents over the repository root and allow matching files to replace the existing versions. Do **not** delete existing canonical `assets/cards/` or `assets/ui/` directories.

V0.3.5 intentionally does not replace:

- the 78 canonical card fronts,
- canonical `assets/ui/title-hero.png`,
- canonical `assets/ui/card-back.png`.

The new/updated Home motifs live in `assets/motifs/` and reuse the same filenames as the rejected V0.3.3/V0.3.4 motif attempts, so normal overwrite replaces them cleanly.

## Recommended commit

`Rebuild home visual system V0.3.5`

## After push
Because V0.3.5 bumps the service-worker/cache version, reload after GitHub Pages finishes deploying. If the previous visual build remains visible, close/reopen the page or clear site data once so the new worker controls the page.

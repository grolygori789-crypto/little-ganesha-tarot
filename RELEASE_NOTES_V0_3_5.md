# V0.3.5 — Home Visual System Rebuild

## Decision
V0.3.3 and V0.3.4 are rejected as visual implementations. Their product concept — Premium Minimal Sacred UI — remains valid, but their CSS/layout execution is superseded by V0.3.5.

## Baseline discipline
V0.3.5 code is rebuilt from the stable V0.3.2 application/PWA baseline rather than patched on top of the rejected motif implementations.

## Home design system
- Primary / Signature modes use one anchored line-art motif each.
- No duplicate `✦`, `◌`, or `III` foreground symbol is used on those cards.
- Explore cards use one small line icon and no background motif.
- Motifs are static to prevent geometry distortion and visual noise.
- Thai title areas have deterministic line-height and minimum title height so paired cards remain visually balanced.

## Fullscreen correction
`TAP TO BEGIN` no longer calls the Fullscreen API. This avoids Android Chrome's large fullscreen guidance toast and avoids forcing browser UI behavior. Installed PWA sessions remain app-like through the web manifest. Browser fullscreen is an explicit Settings action only.

## Protected systems
Audio engine, PWA registration, manifest/icon identity, profile/date-of-birth flow, language switching, Return to Title, Mini Player, support placeholders, and reading-entry stubs are not redesigned by this patch.

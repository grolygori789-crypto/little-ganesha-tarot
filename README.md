# Little Ganesha Tarot — V0.9.0 Lucky Numbers

**Studio:** Benedict Interactive  
**Target runtime:** V0.9.0  
**Stable baseline runtime:** V0.8.1  
**Stable baseline GitHub HEAD:** `246c29467f06014a4fc902b94d3e341a59dbf74f` — `Fix Hindi brand title V0.8.1`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)

## What ships

V0.9.0 turns **Lucky Numbers** from an Explore placeholder into a complete daily experience.
The feature is intentionally built as a premium kinetic ritual rather than a plain random-number
button: a brass-and-crystal oracle machine mixes nine numbered orbs, rotates its mechanism, and
releases three selected orbs one by one into a presentation tray.

The interaction is code-rendered with Canvas/CSS rather than a fixed machine image. This lets the
numbered orbs, lighting, glass reflections, brass surfaces, movement, haptic cues and result state
remain responsive to the actual daily selection on different screen sizes.

## Daily contract

- The pool is **1–9** and the daily result contains **three unique numbers**.
- A result is created only after the user deliberately starts the reveal.
- Selection uses `crypto.getRandomValues()` where available, with unbiased rejection sampling.
- The three numbers are fixed immediately when the reveal starts and are stored locally.
- Closing the feature mid-animation does not reroll the day; reopening continues with the same set.
- A completed set restores exactly until the next device-local day.
- Returning users may replay the reveal animation, but replay never changes the numbers.
- The three roles are **Core / Supporting / Balancing** rather than lottery combinations.

## Premium presentation

The Lucky Oracle uses a responsive 2.5D visual system with glass, aged brass, crystal-number orbs,
subtle sacred geometry, physical-feeling collision motion, a rotating mechanism, sequential ball
drops, restrained synthesized mechanical/chime cues and optional device haptics. Reduced-motion
preferences receive a shorter sequential reveal without the kinetic mixing sequence.

No generated machine artwork is required and no heavy 3D/game dependency is added.

## Native languages

Lucky Numbers ships simultaneously in **English, Thai, and Hindi**. UI copy, role names,
daily interpretation text, accessibility labels, countdown text, Save/Share copy and export artwork
are authored for each language rather than being runtime machine translation.

The canonical `LITTLE GANESHA TAROT / THE GOLDEN PATH` brand lockup remains visually consistent
across all three locales.

## Save / Share

A completed result can be exported through the existing shared reading-export utility. The generated
portrait artwork contains the local date, all three numbered orbs, localized roles and keywords,
the combined daily pattern, role-specific guidance and the safety framing. Share uses the native
Web Share file flow where supported and falls back to saving the image.

## Safety and product framing

Lucky Numbers is a symbolic daily reflection and playful ritual. It does **not** predict lottery,
gambling, investment returns or guaranteed outcomes. The product deliberately uses three distinct
single-digit symbolic roles instead of presenting bet combinations, jackpots, payouts or odds.

## Protected behavior

V0.9.0 does not change Reading Engine 1.1.0, Deck Ritual 1.1.0, canonical 78-card IDs/artwork,
pre-shuffle/prebound selection integrity, Daily/Ask persistence, Signature Focus daily locks,
Hindi Ask semantics, existing reading Save/Share, card viewers, the audio lifecycle, or the
universal app icon system.

## Runtime coherence

The PWA build/cache identity moves to V0.9.0. HTML asset query strings, manifest icon references,
`window.LGT_BUILD`, visible build label, Service Worker build/cache IDs and app-shell URLs move
together. Because the Service Worker cache identity changes, deployment is operationally HIGH risk
even though the Lucky Numbers feature is isolated from the tarot-selection subsystems.

## Acceptance

Static/package QA is included. **Real-device V0.9.0 acceptance remains required** for the kinetic
machine, 3-orb reveal timing, local-day restore/rollover, interruption recovery, EN/TH/HI layout,
reduced motion, sound/haptic behavior, Save/Share artwork and PWA refresh/cache activation.

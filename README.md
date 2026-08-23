# Little Ganesha Tarot — V0.7.1 Universal App Icon

**Studio:** Benedict Interactive  
**Target runtime:** V0.7.1  
**Baseline runtime:** V0.7.0 — real-device accepted  
**Baseline GitHub HEAD:** `102511d1a076defd83b805c5983719f4b0c9a379` — `Add Signature Focus system V0.7.0`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)

## What ships

V0.7.1 is a focused brand/launcher compatibility patch. It replaces the production app
icon pack with a universal mask-safe design while preserving all accepted V0.7.0 tarot
behavior.

The new icon:

- keeps Little Ganesha as the central identity;
- shows the canonical production tarot card back in his hand;
- removes the edge-dependent outer frame that could leave clipped strokes under circular masks;
- uses a full-bleed royal-plum background;
- keeps the gold structural ring safely inside the canvas;
- provides distinct standard and maskable derivatives from one canonical master;
- cache-busts manifest, Apple touch icon, favicon, and Service Worker references.

## Protected V0.7.0 behavior

No reading-mode logic changes. Daily Guidance, Ask Ganesha, Three-Card Reading, The Golden
Path, Remove the Obstacle, per-Focus daily locks/restores, 78-card pre-shuffle integrity,
Save/Share, viewers, audio lifecycle, profile behavior, and native Thai/English reading
content remain unchanged.

## Operational note

Launcher icon metadata is unusually sticky on some Android launchers. After deployment,
the updated manifest is versioned, but an already installed PWA may still display the old
icon until the launcher refreshes its metadata or the PWA is reinstalled.

## Acceptance

Static/package icon QA is included. Real-device acceptance should verify the installed icon
under the device's actual launcher mask and confirm no reading regression.

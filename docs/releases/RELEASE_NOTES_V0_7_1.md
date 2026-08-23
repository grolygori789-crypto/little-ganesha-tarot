# Release Notes — V0.7.1 Universal App Icon

## Summary

V0.7.1 replaces the previous launcher icon pack with a universal, mask-safe Little Ganesha
icon system.

## Fixed

- The tarot card shown in the app icon now uses the canonical production card-back artwork.
- Edge-adjacent framing that could leave visible crop fragments under circular launcher masks
  has been removed from the platform-critical outer edge.
- Standard and maskable assets now share one consistent identity while using different safe
  insets appropriate to their launcher roles.
- Icon, favicon, Apple touch icon, manifest and Service Worker references are cache-busted
  under runtime 0.7.1.

## Unchanged

No tarot logic or interpretation content changes. V0.7.0 reading behavior remains protected.

## Baseline / rollback

Baseline: `102511d1a076defd83b805c5983719f4b0c9a379`  
Rollback target if a serious regression appears: V0.7.0 baseline above.

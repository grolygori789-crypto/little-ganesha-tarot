# Little Ganesha Tarot — V0.8.1 Brand Title Consistency

**Studio:** Benedict Interactive  
**Target runtime:** V0.8.1  
**Baseline runtime:** V0.8.0  
**Baseline GitHub HEAD:** `91ba6402c6a26090ba3c7bd29153e8527eb0a71a` — `Add native Hindi V0.8.0`  
**Reading Engine:** 1.1.0 (unchanged)  
**Deck Ritual:** 1.1.0 (unchanged)

## Purpose

V0.8.1 fixes one isolated brand-presentation defect on the title screen under the Hindi locale.
The canonical `LITTLE GANESHA / TAROT` masthead is an English brand wordmark and must retain the
same Cormorant Garamond identity in English, Thai, and Hindi. V0.8.0's broad Devanagari heading
rule unintentionally overrode the masthead `h1` when Hindi was active.

## Fix

Hindi keeps its native Devanagari typography everywhere else. Only the title-screen brand masthead
receives a more specific locale override restoring the canonical Cormorant Garamond stack.

This means:

- `LITTLE GANESHA` remains visually identical across EN / TH / HI;
- `TAROT` remains visually identical across EN / TH / HI;
- Hindi CTA, UI, headings, readings, Focus copy and Devanagari typography remain unchanged;
- no tarot content, card selection, persistence, reading logic, export behavior or language logic changes.

## Protected behavior

No change to Reading Engine 1.1.0, Deck Ritual 1.1.0, the canonical 78-card deck,
pre-shuffle/prebound selection integrity, Daily/Ask persistence, Signature Focus daily locks,
Hindi localization content, Hindi semantic Ask behavior, Save/Share, card viewers, audio lifecycle,
or the V0.7.1 universal icon system.

## Runtime coherence

Although the functional change is an isolated low-risk CSS fix, the shipped PWA build moves to
V0.8.1 so HTML asset query strings, manifest references, `window.LGT_BUILD`, visible build label,
Service Worker build/cache IDs, and application-shell URLs remain coherent.

## Acceptance

Static/package QA is included. Real-device acceptance should verify the title screen in all three
languages, especially that switching to Hindi no longer changes the `LITTLE GANESHA / TAROT`
brand typeface while Hindi UI copy remains Devanagari.

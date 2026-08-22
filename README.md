# Little Ganesha Tarot — V0.4.9 Premium Zodiac Polish

**Studio:** Benedict Interactive  
**Target runtime:** V0.4.9  
**Baseline runtime:** V0.4.8  
**Baseline GitHub HEAD:** `8796c6f9b6cf4b019df8062da047b361d9a00004` — `Add premium age zodiac V0.4.8`  
**Risk:** LOW  
**Architecture:** local-first visual/content polish · no AI/API/backend · no Reading Engine changes

## Purpose

V0.4.9 refines the premium Home profile line after real-device QA. English age metadata is made materially easier to read on phones, while every zodiac gains its standard astrological glyph inside the existing parenthetical label. Thai typography remains close to the already-approved V0.4.8 visual weight.

Examples:

`สวัสดี Benz`  
`อายุ 43 ปี · 0 เดือน · 22 วัน (♌ ราศีสิงห์)`

`Hello, Benz`  
`Age 43 years · 0 months · 22 days (♌ Leo)`

## Visual Rules

- English profile metadata is about 12–16% larger than V0.4.8 with stronger weight and contrast.
- Thai retains the established V0.4.8 sizing so the approved Thai hierarchy is not disturbed.
- Zodiac label uses the standard Unicode astrology glyph (♈–♓), never animal emoji or pictorial logos.
- The glyph stays inside the existing parentheses with the zodiac name, so visual noise remains low.
- Zodiac remains warm gold; age remains ivory.
- Narrow screens may wrap age and zodiac as separate flex items instead of shrinking text into illegibility.

## Zodiac Glyphs

Aries ♈ · Taurus ♉ · Gemini ♊ · Cancer ♋ · Leo ♌ · Virgo ♍ · Libra ♎ · Scorpio ♏ · Sagittarius ♐ · Capricorn ♑ · Aquarius ♒ · Pisces ♓

## Protected Behavior

No changes to Reading Engine 1.0.2, Daily Guidance, Semantic Ask, Spiritual & Unseen, Save/Share, audio lifecycle, card assets, tarot content, age arithmetic, or zodiac date boundaries.

## Privacy

No new storage. Age, zodiac name, and zodiac glyph are derived locally from the existing birth-date profile value.

## Validation

Automated checks cover JS syntax, age/zodiac regression, all zodiac glyph mappings, Home rendering token, English legibility CSS, Thai size preservation, PWA/version coherence, and archive re-extraction. Real-device visual QA remains the final release check after deployment.

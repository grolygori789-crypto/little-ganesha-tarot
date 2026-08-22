# Little Ganesha Tarot — V0.4.8 Premium Home Profile

**Studio:** Benedict Interactive  
**Target runtime:** V0.4.8  
**Baseline runtime:** V0.4.7  
**Baseline GitHub HEAD:** `1471669aa858139565d687d85b563190ac672cc8` — `Standardize reading Save Share V0.4.7`  
**Risk:** LOW  
**Architecture:** local-first PWA · no AI/API/backend added

## Purpose

V0.4.8 adds a premium personal profile detail directly beneath the existing Home greeting. When a valid date of birth is stored, the Home header shows the user’s exact calendar age and automatically derived Western/Tropical zodiac sign in the current UI language.

Example Thai presentation:

`สวัสดี Benz`  
`อายุ 43 ปี · 3 เดือน · 12 วัน (ราศีสิงห์)`

Example English presentation:

`Hello, Benz`  
`Age 43 years · 3 months · 12 days (Leo)`

The greeting remains the dominant line. The age is deliberately smaller and quieter, while the zodiac receives a restrained warm-gold emphasis.

## Calculation Rules

- Age is calculated as calendar **years → months → days**, not total days divided by 365.
- Month length and leap years are handled.
- End-of-month birthdays are clamped safely when the equivalent calendar day does not exist in an intermediate month.
- The display refreshes after profile edits, language changes, app focus/visibility changes, and at the next local midnight.
- No calculated age or zodiac is persisted; both are derived locally from the existing date-of-birth value.

## Zodiac Standard

This release uses the common Western/Tropical zodiac date boundaries:

- Capricorn: Dec 22–Jan 19
- Aquarius: Jan 20–Feb 18
- Pisces: Feb 19–Mar 20
- Aries: Mar 21–Apr 19
- Taurus: Apr 20–May 20
- Gemini: May 21–Jun 20
- Cancer: Jun 21–Jul 22
- Leo: Jul 23–Aug 22
- Virgo: Aug 23–Sep 22
- Libra: Sep 23–Oct 22
- Scorpio: Oct 23–Nov 21
- Sagittarius: Nov 22–Dec 21

Thai zodiac labels are authored directly in Thai (`ราศีสิงห์`, `ราศีกันย์`, etc.); English labels use native English zodiac names.

## Premium Home Presentation

`css/profile-home.css` is intentionally isolated from the existing Home visual system. It adds:

- a compact second line beneath the Home greeting;
- responsive typography for narrow phones;
- a restrained ivory age line and warm-gold zodiac label;
- graceful wrapping without splitting the zodiac label;
- extra Home header/content clearance only when profile detail is actually present.

If no valid birth date is stored, the second line is completely hidden and the existing Home layout remains unchanged.

## Protected Behavior

V0.4.8 does not alter:

- Reading Engine 1.0.2;
- Daily Guidance;
- Semantic Ask / Question Contract;
- Spiritual & Unseen;
- Ask same-question/same-day behavior;
- Save/Share standard;
- audio lifecycle;
- card assets or tarot content.

## Privacy

The feature uses the already-local date-of-birth profile field. Age and zodiac are calculated in the browser and are not uploaded or added to new persistence keys.

## Validation

Automated validation covers exact calendar age, leap-day behavior, end-of-month behavior, zodiac boundary dates, Thai/English copy, Home DOM wiring, PWA cache wiring, version coherence, and inherited reading/Ask regression suites.

Real-device visual QA remains the final release check after deployment.

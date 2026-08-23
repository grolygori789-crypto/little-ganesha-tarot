# Little Ganesha Tarot — V0.6.0 Golden Path

**Studio:** Benedict Interactive  
**Target runtime:** V0.6.0  
**Baseline runtime:** V0.5.4  
**Baseline GitHub HEAD:** `1000e17d906e5c12d6376562a108ca12e6103376` — `Complete V0.5.4 runtime fix`  
**Reading Engine:** 1.1.0 (unchanged)  
**Risk:** MEDIUM

## Purpose

V0.6.0 ships **The Golden Path** as the fourth playable reading mode.

The mode is designed as a direction-finding consultation rather than a Past / Present / Future spread. It uses the shared 78-card Reading Engine and the protected compact 6×13 full-deck ritual, then interprets three chosen cards as one connected reading:

1. **Where You Stand**
2. **What Blocks the Path**
3. **The Way Forward**

## Six Focuses

- General Life
- Love & Relationships
- Career & Work
- Money & Resources
- Well-being & Balance
- Personal Growth

Focus changes interpretation context only. It never changes card probability or selection integrity.

## Golden Path reading standard

The three cards are read as one consultation, not three dictionary definitions. The reading includes:

- Your Path at a Glance
- full position-by-position contextual interpretation
- Your Golden Path synthesis
- three practical next steps
- one forward reflection question
- native English / Thai composition
- Save + Share
- tap-to-enlarge card artwork

English and Thai are independently authored native outputs with the same conclusion and safety intent.

## Daily discipline

Golden Path follows the same completed-reading discipline as Three-Card Reading:

- entering the mode does not consume the day,
- leaving before completion does not consume the day,
- the first completed Golden Path reading is locked to that device-local calendar day,
- reopening on the same local day restores the same focus and same three cards,
- the interpretation is deterministically regenerated from that locked focus + cards,
- a Quiet Countdown shows time remaining until the next local day,
- next local day = a new Golden Path reading becomes available.

## Protected behavior

V0.6.0 does not rewrite:

- Reading Engine 1.1.0,
- Daily Guidance,
- Ask Ganesha semantic discipline,
- Three-Card Reading,
- compact 6×13 deck ritual,
- Save / Share foundation,
- Three-Card artwork viewer,
- profile / age / zodiac,
- audio lifecycle,
- PWA foundation beyond the required V0.6.0 build/cache identity update.

## Repository cleanliness

Release delivery utilities, installers, temporary backups, package checksum files, and staging artifacts must stay outside the repository.

The repository root keeps **one current runtime Patch Manifest only**. When V0.6.0 is committed, `PATCH_MANIFEST_V0_5_4.json` must be removed and replaced by `PATCH_MANIFEST_V0_6_0.json`.

`CHECKSUMS_SHA256.txt` remains one rolling current-release file and is overwritten rather than version-piled.

## Acceptance

Static/package QA is included in V0.6.0. Real-device acceptance remains the final gate for the new Golden Path mode.

# Little Ganesha Tarot — V0.4.2 Daily Guidance Upgrade

**Project:** Little Ganesha Tarot — The Golden Path  
**Studio:** Benedict Interactive  
**Target runtime:** V0.4.2  
**Baseline:** `main` @ `4aa31e5920e4b23a8cbc5b5900a3d02d81c76185` (`Polish reading UX and TH-EN copy V0.4.1`)

## V0.4.2 scope

V0.4.2 strengthens the Daily Guidance experience without rebuilding the stable Reading Engine foundation.

It adds:

- corrected centered Reading-context media player positioning,
- a larger hero-scale revealed tarot card so artwork details are easier to appreciate,
- six optional Daily Lenses for every one of the 78 cards,
- native English and Thai Daily Lens content,
- same-day content migration from Daily Guidance content v1/v2 to v3 without redrawing the user’s card,
- repository-ready delivery structure with documentation sorted under `docs/`.

## Daily Lenses

Each Daily Guidance card now supports six optional perspectives:

1. Work & Goals / งานและเป้าหมาย
2. Money & Resources / เงินและทรัพยากร
3. Love & Relationships / ความรักและความสัมพันธ์
4. Inner State & Balance / พลังใจและสมดุลชีวิต
5. Opportunities & Watch-outs / โอกาสและสิ่งที่ควรระวัง
6. Guidance for Today / แนวทางสำหรับวันนี้

The lenses use accessible native `<details>` accordions so the main reading stays calm and uncluttered. Only the area the user chooses to explore needs to be opened.

## Language standard

English and Thai content is written independently for naturalness rather than translated word-for-word. The target is immediate comprehension, premium tone, and reflective usefulness without deterministic fortune-telling claims.

## Repository organization

From V0.4.2 onward, documentation is organized before handoff:

- `docs/checksums/`
- `docs/governance/`
- `docs/qa/`
- `docs/releases/`
- `docs/tests/`

See `docs/governance/REPOSITORY_STRUCTURE_POLICY_V1.md`.

The current `PATCH_MANIFEST_V0_4_2.json` remains at repository root by design.

## Upload

Extract the upload ZIP and overlay its repository-relative contents onto the local repository root. Review Changes in GitHub Desktop, then Commit + Push.

No QA/release/checksum/test files from this package need to be manually sorted after extraction.

## QA status

Pre-upload validation performed in the development environment:

- Reading Engine/content tests: PASS
- 78 × 6 × 2 Daily Lens content coverage: PASS
- Global TH/EN UI copy tests: PASS
- package/version checks: PASS
- repository-structure policy checks: PASS
- ZIP re-extraction + full rerun: PASS

Browser/deployed/real-device QA remains a post-upload gate and must not be inferred from static tests.

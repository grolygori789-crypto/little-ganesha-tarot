# Daily Lenses Content QA — V0.4.2

## Coverage

Daily Lenses cover all 78 canonical tarot cards in six categories and two launch languages.

Expected content entries:

`78 cards × 6 lenses × 2 languages = 936 entries`

## Categories

1. Work & Goals / งานและเป้าหมาย
2. Money & Resources / เงินและทรัพยากร
3. Love & Relationships / ความรักและความสัมพันธ์
4. Inner State & Balance / พลังใจและสมดุลชีวิต
5. Opportunities & Watch-outs / โอกาสและสิ่งที่ควรระวัง
6. Guidance for Today / แนวทางสำหรับวันนี้

## Editorial standard

Each entry is intended to be:

- specific to the card rather than a generic category template,
- short enough for mobile reading,
- natural in its own language,
- immediately understandable,
- reflective rather than fatalistic,
- practical without becoming prescriptive,
- non-medical and non-financial-prediction oriented.

English and Thai are evaluated as independent editorial copy rather than literal translations.

## Automated validation

The Reading Engine content test verifies:

- every card has exactly all six lens keys,
- both languages are non-empty and meet minimum useful length,
- no full Daily Lens text is duplicated across all 78 cards within a category/language,
- known deterministic/high-risk claim patterns do not appear,
- legacy Daily Guidance selections remain migration-safe.

## Human real-device gate

Automated checks cannot prove native editorial quality by themselves. After deployment, representative Major and Minor Arcana cards should be read on a real phone in both TH and EN to confirm natural rhythm, line wrapping, comprehension, and premium tone.

# V0.4.1 REV3 — Upload Notes

## Important

**Use this REV3 archive instead of all previous V0.4.1 / REV2 archives.**

REV3 contains the Premium Reading polish, 78-card native rewrite, migration logic, and whole-app TH/EN UI copy pass in one upload.

## Upload

1. Extract the ZIP.
2. Overlay all files onto the repository root.
3. Do not delete unrelated repository files.
4. Commit and push.

## Suggested commit message

`Polish Reading UX and complete global TH-EN copy pass for V0.4.1`

## Post-deploy smoke check

Confirm on the real device:

- build shows `0.4.1`
- Thai and English Home copy both read naturally
- onboarding/helper copy changes correctly with language
- Settings labels/helper copy switch correctly
- Return to Title reads naturally in Thai (`กลับหน้าเริ่มต้น`)
- Support labels switch correctly
- Daily Guidance opens normally
- revealed card is larger
- media player is compact only inside Reading
- same-day Daily Guidance preserves the same card
- Daily Guidance interpretation reads naturally in both TH/EN
- no visible stale V0.4.0 strings remain after service-worker refresh

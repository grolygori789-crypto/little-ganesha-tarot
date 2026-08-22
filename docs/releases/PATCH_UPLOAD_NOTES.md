# V0.4.4 — Upload Notes

## Upload

1. Extract `Little_Ganesha_Tarot_V0_4_4_ASK_GANESHA_UPLOAD.zip`.
2. Overlay its repository-relative files/folders onto the local repository root.
3. Review Changes in GitHub Desktop.
4. Confirm only the intended V0.4.4 files are changed/added.
5. Commit and Push.
6. Wait for GitHub Pages deployment/cache propagation.
7. Close/reopen or refresh the installed PWA as appropriate.
8. Test Ask Ganesha on the real device before canonical promotion.

No manual sorting of package files is required.

## Suggested commit message

`Add Ask Ganesha reading V0.4.4`

## Expected runtime identity

After deployment:

- visible Settings build: `0.4.4`
- HTML application version/body build: `0.4.4`
- `window.LGT_BUILD`: `0.4.4`
- Service Worker build/cache: `0.4.4`

## Primary smoke test

1. Open **Ask Ganesha / ถามพระพิฆเนศน้อย** from Home.
2. Enter a normal one-question prompt.
3. Confirm **Ask the Cards / ถามไพ่** becomes enabled.
4. Confirm the question seal appears, then shuffle/three-card choice appears.
5. Select and reveal one card.
6. Confirm question recap + card meaning + Little Ganesha reflection + reflection question appear.
7. Tap **Ask Another Question / ถามเรื่องอื่น** and confirm the input resets.
8. Ask the exact same question again on the same day and confirm the same card is restored.
9. Test capitalization/spacing/punctuation variation and confirm the same card still restores where normalization makes the questions equivalent.
10. Enter a blocked profanity example and confirm the inline red warning appears and reading cannot start.
11. Switch TH/EN before the test and confirm the selected language reads naturally.
12. Smoke-test Daily Guidance and Save/Share to ensure no regression.

## Rollback target

If a serious regression appears, stop forward work and revert the isolated V0.4.4 commit to baseline:

`565bc738a0dcb9387dc220135a1999dcd93553f6`

This is a MEDIUM-risk release; no separate restore archive is required because the change is isolated and Git revert is the preferred rollback path.

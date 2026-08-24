'use strict';
const fs = require('fs');
const assert = (c,m)=>{ if(!c) throw new Error(m); };
const pwa = fs.readFileSync('js/pwa.js','utf8');
const sw = fs.readFileSync('sw.js','utf8');

assert(pwa.includes("const HOTFIX_VERSION = 'v0.16.0-hf1'"), 'hotfix marker missing');
assert(pwa.includes("installSlot('LGT_BUILD'"), 'build marker guard missing');
assert(pwa.includes("installSlot('LGTAskStorage'"), 'Ask semantic wrapper missing');
assert(pwa.includes("installSlot('LGTLuckyContent'"), 'Lucky wrapper missing');
assert(pwa.includes("installSlot('LGTJournalStorage'"), 'Journal wrapper missing');
assert(pwa.includes("installSlot('LGTLegalContent'"), 'Legal wrapper missing');
assert(pwa.includes("record?.sessionId"), 'Reading Hub session dedupe missing');
assert(pwa.includes("Choose English, Thai, or Hindi"), 'language fallback repair missing');
assert(pwa.includes("Ko-fi is the active worldwide"), 'Ko-fi legal correction missing');

assert(sw.includes("const BUILD = '0.16.0';"), 'runtime build unexpectedly changed');
assert(sw.includes("PROMPTPAY_CANONICAL"), 'PromptPay canonical cache URL missing');
assert(sw.includes("requestURL.pathname.endsWith('/assets/support/promptpay-qr.png')"), 'PromptPay normalization branch missing');
assert(!sw.includes("promptpay-qr.png?v=0.13.0"), 'stale PromptPay query must not be pre-cached');

console.log('V0.16.0-HF1 direct-upload gate: PASS');
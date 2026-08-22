const fs = require('fs');
const path = require('path');
const assert = require('assert');
const root = path.resolve(__dirname, '../..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const index = read('index.html');
const app = read('js/app.js');
const sw = read('sw.js');
const css = read('css/profile-home.css');

assert(index.includes('id="homeProfileMeta"'));
assert(index.includes('css/profile-home.css?v=0.5.1'));
assert(index.includes('js/profile-details.js?v=0.5.1'));
assert(index.indexOf('js/profile-details.js?v=0.5.1') < index.indexOf('js/app.js?v=0.5.1'));
assert(index.includes('BUILD 0.5.1'));

assert(app.includes('window.LGTProfileDetails'));
assert(app.includes("homeProfileMeta = $('homeProfileMeta')"));
assert(app.includes("zodiac.textContent = `(${summary.zodiacSymbol} ${summary.zodiacLabel})`"));
assert(app.includes("mainApp?.classList.toggle('has-profile-meta', Boolean(summary))"));
assert(app.includes('scheduleProfileRollover()'));
assert(app.includes("window.LGT_BUILD = '0.5.1'"));
assert(app.includes('ใช้แสดงอายุและราศีของคุณบนอุปกรณ์นี้'));
assert(app.includes('used to show your age and zodiac on this device'));

assert(css.includes('.home-profile-meta__zodiac'));
assert(css.includes('.main-app.has-profile-meta #homeView'));
assert(sw.includes("const BUILD = '0.5.1'"));
assert(sw.includes("url('css/profile-home.css?v=0.5.1')"));
assert(sw.includes("url('js/profile-details.js?v=0.5.1')"));

console.log('PASS test-home-profile-package');

assert(css.includes('font-size: clamp(.82rem, 3.35vw, .96rem)'));
assert(css.includes('font-weight: 600'));

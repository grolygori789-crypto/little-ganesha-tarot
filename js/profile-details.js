(() => {
  'use strict';

  const ZODIAC = Object.freeze({
    capricorn: { symbol: '♑', en: 'Capricorn', th: 'ราศีมังกร' },
    aquarius: { symbol: '♒', en: 'Aquarius', th: 'ราศีกุมภ์' },
    pisces: { symbol: '♓', en: 'Pisces', th: 'ราศีมีน' },
    aries: { symbol: '♈', en: 'Aries', th: 'ราศีเมษ' },
    taurus: { symbol: '♉', en: 'Taurus', th: 'ราศีพฤษภ' },
    gemini: { symbol: '♊', en: 'Gemini', th: 'ราศีเมถุน' },
    cancer: { symbol: '♋', en: 'Cancer', th: 'ราศีกรกฎ' },
    leo: { symbol: '♌', en: 'Leo', th: 'ราศีสิงห์' },
    virgo: { symbol: '♍', en: 'Virgo', th: 'ราศีกันย์' },
    libra: { symbol: '♎', en: 'Libra', th: 'ราศีตุล' },
    scorpio: { symbol: '♏', en: 'Scorpio', th: 'ราศีพิจิก' },
    sagittarius: { symbol: '♐', en: 'Sagittarius', th: 'ราศีธนู' }
  });

  function localDateISO(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function parseISO(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
    const [year, month, day] = value.split('-').map(Number);
    if (month < 1 || month > 12) return null;
    const maxDay = daysInMonth(year, month);
    if (day < 1 || day > maxDay) return null;
    return { year, month, day };
  }

  function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
  }

  function compareDateParts(a, b) {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
  }

  function addCalendarMonths(birth, years, months) {
    const total = ((birth.year + years) * 12) + (birth.month - 1) + months;
    const year = Math.floor(total / 12);
    const month = (total % 12) + 1;
    return { year, month, day: Math.min(birth.day, daysInMonth(year, month)) };
  }

  function daySerial(parts) {
    return Math.floor(Date.UTC(parts.year, parts.month - 1, parts.day) / 86400000);
  }

  function calculateAge(birthISO, todayISO = localDateISO()) {
    const birth = parseISO(birthISO);
    const today = parseISO(todayISO);
    if (!birth || !today || compareDateParts(birth, today) > 0) return null;

    let years = today.year - birth.year;
    if (compareDateParts(addCalendarMonths(birth, years, 0), today) > 0) years -= 1;

    let months = 0;
    while (months < 11 && compareDateParts(addCalendarMonths(birth, years, months + 1), today) <= 0) {
      months += 1;
    }

    const anchor = addCalendarMonths(birth, years, months);
    const days = daySerial(today) - daySerial(anchor);
    return Object.freeze({ years, months, days });
  }

  function zodiacKey(month, day) {
    const md = (month * 100) + day;
    if (md >= 1222 || md <= 119) return 'capricorn';
    if (md <= 218) return 'aquarius';
    if (md <= 320) return 'pisces';
    if (md <= 419) return 'aries';
    if (md <= 520) return 'taurus';
    if (md <= 620) return 'gemini';
    if (md <= 722) return 'cancer';
    if (md <= 822) return 'leo';
    if (md <= 922) return 'virgo';
    if (md <= 1022) return 'libra';
    if (md <= 1121) return 'scorpio';
    return 'sagittarius';
  }

  function plural(value, singular, pluralForm) {
    return `${value} ${value === 1 ? singular : pluralForm}`;
  }

  function formatAge(age, lang = 'en') {
    if (!age) return '';
    if (lang === 'th') return `อายุ ${age.years} ปี · ${age.months} เดือน · ${age.days} วัน`;
    return `Age ${plural(age.years, 'year', 'years')} · ${plural(age.months, 'month', 'months')} · ${plural(age.days, 'day', 'days')}`;
  }

  function summarize(birthISO, lang = 'en', todayISO = localDateISO()) {
    const birth = parseISO(birthISO);
    const age = calculateAge(birthISO, todayISO);
    if (!birth || !age) return null;
    const key = zodiacKey(birth.month, birth.day);
    const language = lang === 'th' ? 'th' : 'en';
    return Object.freeze({
      age,
      ageText: formatAge(age, language),
      zodiacKey: key,
      zodiacSymbol: ZODIAC[key].symbol,
      zodiacLabel: ZODIAC[key][language]
    });
  }

  window.LGTProfileDetails = Object.freeze({
    version: 'profile-details-v2',
    localDateISO,
    calculateAge,
    zodiacKey,
    summarize
  });
})();

(() => {
  'use strict';

  const MAX_LENGTH = 220;
  const ZERO_WIDTH = /[\u200B-\u200D\u2060\uFEFF]/g;
  const REPEATED_CHAR = /(.)\1{8,}/u;
  const REPEATED_TOKEN = /\b([\p{L}\p{N}]{2,})\b(?:\s+\1\b){5,}/iu;

  const BLOCK_PATTERNS = Object.freeze([
    // Strong profanity / abusive language. Keep the list intentionally narrow to reduce false positives.
    { code: 'inappropriate', re: /\b(?:fuck(?:ing|ed|er|ers)?|motherfucker(?:s)?|cunt(?:s)?|dickhead(?:s)?|asshole(?:s)?|bitch(?:es)?|bullshit|shithead(?:s)?)\b/iu },
    { code: 'inappropriate', re: /(?:เหี้ย|สัส|ควย|เย็ด|แม่ง|อีดอก|ไอ้เหี้ย|อีเหี้ย|ควยเอ๊ย)/u },

    // Explicit pornographic phrasing; neutral words such as sex / sexual relationship remain allowed.
    { code: 'explicit', re: /\b(?:blowjob(?:s)?|handjob(?:s)?|gangbang(?:s)?|rimjob(?:s)?|deepthroat(?:ing)?|cumshot(?:s)?)\b/iu },
    { code: 'explicit', re: /(?:อมควย|เลียหี|แตกใน|แตกใส่หน้า|เย็ดสด|รุมเย็ด)/u },

    // A small set of severe slurs. This is not intended to be a comprehensive moderation service.
    { code: 'hateful', re: /\b(?:nigg(?:er|a)s?|faggot(?:s)?|chink(?:s)?|kike(?:s)?)\b/iu },

    // Direct first-person violent intent. Questions about safety or violence happening to someone are not blocked by these patterns.
    { code: 'violentIntent', re: /\b(?:how\s+(?:do|can|could)\s+i\s+(?:kill|stab|shoot|hurt)|i\s+(?:want|plan|intend)\s+to\s+(?:kill|stab|shoot|hurt))\b/iu },
    { code: 'violentIntent', re: /(?:ฉัน|ผม|เรา|หนู|กู).{0,18}(?:อยาก|จะ|ตั้งใจ).{0,10}(?:ฆ่า|แทง|ยิง|ทำร้าย)/u },

    // Direct first-person self-harm / crisis language. The app should not substitute tarot for immediate safety support.
    { code: 'safetyCrisis', re: /\b(?:i\s+want\s+to\s+die|i\s+want\s+to\s+kill\s+myself|kill\s+myself|end\s+my\s+life)\b/iu },
    { code: 'safetyCrisis', re: /(?:ฉัน|ผม|เรา|หนู|กู).{0,16}(?:อยากตาย|อยากฆ่าตัวตาย|จะฆ่าตัวตาย)/u }
  ]);

  const OBFUSCATED_PATTERNS = Object.freeze([
    { code: 'inappropriate', re: /f[^\p{L}\p{N}]*u[^\p{L}\p{N}]*c[^\p{L}\p{N}]*k/iu },
    { code: 'inappropriate', re: /c[^\p{L}\p{N}]*u[^\p{L}\p{N}]*n[^\p{L}\p{N}]*t/iu },
    { code: 'inappropriate', re: /ค[^\p{L}\p{N}]*ว[^\p{L}\p{N}]*ย/u },
    { code: 'inappropriate', re: /เ[^\p{L}\p{N}]*ย[^\p{L}\p{N}]*็[^\p{L}\p{N}]*ด/u }
  ]);

  function cleanVisibleText(value) {
    return String(value ?? '')
      .normalize('NFKC')
      .replace(ZERO_WIDTH, '')
      .replace(/\r\n?/g, '\n')
      .replace(/[\t\f\v]+/g, ' ')
      .replace(/ {2,}/g, ' ')
      .trim();
  }

  function normalizeForFingerprint(value) {
    return cleanVisibleText(value)
      .toLocaleLowerCase('en-US')
      .replace(/[\p{P}\p{S}]+/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function visibleLength(value) {
    return Array.from(cleanVisibleText(value)).length;
  }

  function looksLikeSpam(text) {
    if (REPEATED_CHAR.test(text) || REPEATED_TOKEN.test(text)) return true;
    const chars = Array.from(text);
    if (chars.length < 8) return false;
    const meaningful = chars.filter((char) => /[\p{L}\p{N}]/u.test(char)).length;
    return meaningful / chars.length < 0.35;
  }

  function validate(value) {
    const text = cleanVisibleText(value);
    const length = Array.from(text).length;

    if (!text) return { ok: false, code: 'required', text, length };
    if (length > MAX_LENGTH) return { ok: false, code: 'tooLong', text, length };
    if (!/[\p{L}\p{N}]/u.test(text)) return { ok: false, code: 'spam', text, length };
    if (looksLikeSpam(text)) return { ok: false, code: 'spam', text, length };

    // One reading should focus on one question. A single trailing question mark is normal.
    const questionMarks = (text.match(/[?？]/g) || []).length;
    if (questionMarks > 1) return { ok: false, code: 'multipleQuestions', text, length };

    for (const rule of BLOCK_PATTERNS) {
      if (rule.re.test(text)) return { ok: false, code: rule.code, text, length };
    }
    for (const rule of OBFUSCATED_PATTERNS) {
      if (rule.re.test(text)) return { ok: false, code: rule.code, text, length };
    }

    return { ok: true, code: 'ok', text, length };
  }

  function fallbackHash(input) {
    // Two independent 32-bit hashes combined as a compact deterministic fingerprint.
    let fnv = 0x811c9dc5;
    let djb = 5381;
    for (const char of Array.from(input)) {
      const code = char.codePointAt(0);
      fnv ^= code;
      fnv = Math.imul(fnv, 0x01000193) >>> 0;
      djb = (((djb << 5) + djb) ^ code) >>> 0;
    }
    return `${fnv.toString(16).padStart(8, '0')}${djb.toString(16).padStart(8, '0')}`;
  }

  async function fingerprint(value) {
    const canonical = normalizeForFingerprint(value);
    if (!canonical) return '';
    try {
      if (globalThis.crypto?.subtle && globalThis.TextEncoder) {
        const bytes = new TextEncoder().encode(canonical);
        const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
        return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
      }
    } catch (_) {}
    return fallbackHash(canonical);
  }

  window.LGTQuestionGuard = Object.freeze({
    maxLength: MAX_LENGTH,
    cleanVisibleText,
    normalizeForFingerprint,
    visibleLength,
    validate,
    fingerprint
  });
})();

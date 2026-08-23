(() => {
  'use strict';

  const VERSION = 'lucky-export-v1.1';

  const language = () => window.LGTLuckyContent?.normalizeLanguage(document.documentElement.lang) || 'en';

  function localeFor(lang) {
    if (lang === 'th') return 'th-TH';
    if (lang === 'hi') return 'hi-IN';
    return 'en-US';
  }

  function fontsFor(lang) {
    if (lang === 'th') return {
      display: '600 60px "Noto Serif Thai", serif',
      heading: '600 34px "Noto Serif Thai", serif',
      body: '400 27px "Noto Sans Thai", sans-serif',
      bodySmall: '400 23px "Noto Sans Thai", sans-serif',
      role: '500 22px "Noto Sans Thai", sans-serif'
    };
    if (lang === 'hi') return {
      display: '600 58px "Noto Serif Devanagari", serif',
      heading: '600 33px "Noto Serif Devanagari", serif',
      body: '400 27px "Noto Sans Devanagari", sans-serif',
      bodySmall: '400 23px "Noto Sans Devanagari", sans-serif',
      role: '500 22px "Noto Sans Devanagari", sans-serif'
    };
    return {
      display: '600 64px "Cormorant Garamond", Georgia, serif',
      heading: '600 36px "Cormorant Garamond", Georgia, serif',
      body: '400 27px Georgia, serif',
      bodySmall: '400 23px Georgia, serif',
      role: '600 20px "Cormorant Garamond", Georgia, serif'
    };
  }

  function formatDate(record, lang) {
    try {
      const [year, month, day] = String(record.date || '').split('-').map(Number);
      const date = year && month && day ? new Date(year, month - 1, day) : new Date();
      return new Intl.DateTimeFormat(localeFor(lang), { dateStyle: 'long' }).format(date);
    } catch (_) {
      return String(record.date || '');
    }
  }

  function rounded(ctx, x, y, width, height, radius) {
    const helper = window.LGTReadingExport;
    if (helper?.drawRoundedRect) {
      helper.drawRoundedRect(ctx, x, y, width, height, radius);
      return;
    }
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
  }

  function wrap(ctx, text, width) {
    return window.LGTReadingExport?.wrapCanvasText?.(ctx, text, width) || [String(text || '')];
  }

  function drawWrapped(ctx, text, x, y, maxWidth, lineHeight, maxLines = 99) {
    const lines = wrap(ctx, text, maxWidth).slice(0, maxLines);
    lines.forEach((line, index) => ctx.fillText(line, x, y + (index * lineHeight)));
    return y + (lines.length * lineHeight);
  }

  function drawOrb(ctx, x, y, radius, number) {
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.32)';
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 14;
    const sphere = ctx.createRadialGradient(x - radius * 0.34, y - radius * 0.39, radius * 0.05, x, y, radius * 1.05);
    sphere.addColorStop(0, '#fff5d2');
    sphere.addColorStop(0.18, '#f5da91');
    sphere.addColorStop(0.51, '#c89042');
    sphere.addColorStop(0.80, '#805021');
    sphere.addColorStop(1, '#372415');
    ctx.fillStyle = sphere;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(255,239,190,.78)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = 'rgba(12,47,45,.96)';
    ctx.strokeStyle = 'rgba(255,241,202,.42)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.49, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fff1c6';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `700 ${radius * 0.79}px Georgia, "Times New Roman", serif`;
    ctx.fillText(String(number), x, y + radius * 0.05);

    const shine = ctx.createRadialGradient(x - radius * 0.42, y - radius * 0.48, 0, x - radius * 0.36, y - radius * 0.40, radius * 0.46);
    shine.addColorStop(0, 'rgba(255,255,255,.82)');
    shine.addColorStop(0.2, 'rgba(255,255,255,.20)');
    shine.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = shine;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.97, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  async function buildBlob(record, lang = language()) {
    if (!record?.numbers || record.numbers.length !== 3) throw new Error('Lucky Numbers export needs a completed daily record.');
    await document.fonts?.ready?.catch?.(() => {});

    const content = window.LGTLuckyContent;
    const copy = content.copy(lang);
    const fonts = fontsFor(lang);
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');

    const bg = ctx.createLinearGradient(0, 0, 1080, 1600);
    bg.addColorStop(0, '#0d3433');
    bg.addColorStop(0.52, '#082828');
    bg.addColorStop(1, '#061c1d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1600);

    const halo = ctx.createRadialGradient(540, 455, 20, 540, 455, 560);
    halo.addColorStop(0, 'rgba(231,190,105,.17)');
    halo.addColorStop(0.45, 'rgba(89,150,139,.08)');
    halo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, 1080, 980);

    ctx.strokeStyle = 'rgba(235,197,118,.44)';
    ctx.lineWidth = 2;
    rounded(ctx, 42, 42, 996, 1516, 34);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(235,197,118,.14)';
    rounded(ctx, 58, 58, 964, 1484, 28);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#f1d28c';
    ctx.font = '600 34px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('LITTLE GANESHA TAROT', 540, 112);

    ctx.fillStyle = 'rgba(255,248,233,.62)';
    ctx.font = '500 18px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('THE GOLDEN PATH', 540, 146);

    ctx.fillStyle = '#fff7e5';
    ctx.font = fonts.display;
    ctx.fillText(copy.exportTitle, 540, 232);

    ctx.fillStyle = 'rgba(255,248,233,.66)';
    ctx.font = fonts.bodySmall;
    ctx.fillText(formatDate(record, lang), 540, 282);

    const roles = content.roles(lang);
    const xs = [250, 540, 830];
    record.numbers.forEach((number, index) => {
      drawOrb(ctx, xs[index], 445, 98, number);
      const info = content.number(number, lang);
      ctx.fillStyle = 'rgba(247,217,147,.82)';
      ctx.font = fonts.role;
      ctx.fillText(roles[index], xs[index], 590);
      ctx.fillStyle = '#fff7e5';
      ctx.font = fonts.heading;
      ctx.fillText(info.keyword, xs[index], 635);
    });

    ctx.strokeStyle = 'rgba(235,197,118,.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(138, 700);
    ctx.lineTo(942, 700);
    ctx.stroke();

    ctx.fillStyle = '#f0cf86';
    ctx.font = fonts.heading;
    ctx.textAlign = 'left';
    ctx.fillText(copy.patternTitle, 138, 758);

    ctx.fillStyle = 'rgba(255,248,233,.87)';
    ctx.font = fonts.body;
    const patternEnd = drawWrapped(ctx, content.pattern(record.numbers, lang), 138, 810, 804, 40, 5);

    const setTop = Math.max(1010, patternEnd + 36);
    ctx.fillStyle = '#f0cf86';
    ctx.font = fonts.heading;
    ctx.textAlign = 'left';
    ctx.fillText(copy.numberSetTitle, 138, setTop);

    ctx.fillStyle = '#fff1c6';
    ctx.font = '700 30px Georgia, "Times New Roman", serif';
    ctx.fillText(content.numberSet(record.numbers).join('   ·   '), 138, setTop + 54);

    ctx.fillStyle = 'rgba(255,248,233,.55)';
    ctx.font = fonts.bodySmall;
    drawWrapped(ctx, copy.numberSetHint, 138, setTop + 94, 804, 31, 2);

    const detailsTop = Math.max(1190, setTop + 165);
    const detailWidth = 244;
    record.numbers.forEach((number, index) => {
      const info = content.number(number, lang);
      const x = 138 + (index * 278);
      ctx.fillStyle = 'rgba(247,217,147,.75)';
      ctx.font = fonts.role;
      ctx.fillText(roles[index], x, detailsTop);
      ctx.fillStyle = 'rgba(255,248,233,.76)';
      ctx.font = fonts.bodySmall;
      const field = index === 0 ? info.core : index === 1 ? info.support : info.balance;
      drawWrapped(ctx, field, x, detailsTop + 40, detailWidth, 32, 4);
    });

    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,248,233,.46)';
    ctx.font = fonts.bodySmall;
    ctx.fillText(copy.exportFooter, 540, 1490);
    ctx.font = lang === 'en' ? '400 18px Georgia, serif' : (lang === 'th' ? '400 18px "Noto Sans Thai", sans-serif' : '400 18px "Noto Sans Devanagari", sans-serif');
    const disclaimerLines = wrap(ctx, copy.disclaimer, 790).slice(0, 2);
    disclaimerLines.forEach((line, index) => ctx.fillText(line, 540, 1530 + (index * 24)));

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Could not render Lucky Numbers image.')), 'image/png', 0.96);
    });
  }

  async function execute(action, record, lang = language(), onStatus = () => {}) {
    const helper = window.LGTReadingExport;
    if (!helper?.execute) throw new Error('Shared reading export utility is unavailable.');
    const copy = window.LGTLuckyContent.copy(lang);
    const date = record?.date || new Date().toISOString().slice(0, 10);
    return helper.execute({
      action,
      buildBlob: () => buildBlob(record, lang),
      filename: `little-ganesha-lucky-numbers-${date}.png`,
      shareTitle: copy.shareTitle,
      shareText: copy.shareText,
      onStatus,
      messages: {
        preparing: copy.preparing,
        saved: copy.saved,
        shared: copy.shared,
        savedFallback: copy.shareFallback,
        cancelled: copy.cancelled
      }
    });
  }

  window.LGTLuckyExport = Object.freeze({ version: VERSION, buildBlob, execute });
})();

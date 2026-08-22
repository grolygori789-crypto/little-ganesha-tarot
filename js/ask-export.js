(() => {
  'use strict';

  const EXPORT = window.LGTReadingExport;
  if (!EXPORT) throw new Error('Ask export requires shared Reading Export.');

  const VERSION = 'ask-export-v1';
  const COPY = {
    en: {
      brand: 'LITTLE GANESHA TAROT',
      mode: 'ASK GANESHA',
      question: 'YOUR QUESTION',
      insight: 'INSIGHT FROM THIS READING',
      answer: 'ANSWER TO YOUR QUESTION',
      focus: 'READING FOCUS',
      why: 'WHY THIS CARD POINTS THERE',
      conditions: 'WHAT TO KEEP IN VIEW',
      ganesha: "LITTLE GANESHA'S REFLECTION",
      reflection: 'A QUESTION TO CARRY FORWARD',
      footer: 'Tarot is a tool for reflection, not a fixed prediction. Use real-world information for important decisions.'
    },
    th: {
      brand: 'LITTLE GANESHA TAROT',
      mode: 'ถามพระพิฆเนศน้อย',
      question: 'คำถามของคุณ',
      insight: 'ข้อความจากการอ่านครั้งนี้',
      answer: 'คำตอบต่อคำถามของคุณ',
      focus: 'จุดโฟกัสของการอ่าน',
      why: 'ทำไมไพ่ใบนี้จึงสะท้อนแบบนั้น',
      conditions: 'สิ่งที่ควรคำนึงประกอบ',
      ganesha: 'มุมมองจากพระพิฆเนศน้อย',
      reflection: 'คำถามชวนทบทวนต่อ',
      footer: 'ใช้ไพ่ทาโรต์เป็นเครื่องมือช่วยทบทวนตัวเอง ไม่ใช่คำทำนายที่ตายตัว และใช้ข้อมูลในโลกจริงประกอบการตัดสินใจเรื่องสำคัญเสมอ'
    }
  };

  function text(lang, key) {
    return COPY[lang]?.[key] || COPY.en[key] || key;
  }

  function safeFilenamePart(value) {
    return String(value || 'reading').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'reading';
  }

  function filename(card) {
    const date = new Date().toISOString().slice(0, 10);
    return `little-ganesha-tarot-ask-${date}-${safeFilenamePart(card?.canonicalTitle || card?.title?.en)}.png`;
  }

  async function buildImageBlob(options = {}) {
    const { card, reading, question = '', includeQuestion = false, lang = 'en' } = options;
    if (!card || !reading) throw new Error('Ask export requires card and semantic reading.');

    if (document.fonts?.ready) {
      try { await document.fonts.ready; } catch (_) {}
    }

    const scale = 2;
    const width = 540 * scale;
    const padding = 34 * scale;
    const contentWidth = width - (padding * 2);
    const cardWidth = 174 * scale;
    const cardHeight = Math.round(cardWidth * (1672 / 941));
    const bodyLine = 27 * scale;
    const smallLine = 19 * scale;
    const sectionGap = 21 * scale;
    const boxPad = 16 * scale;

    const titleFont = `${24 * scale}px "Noto Serif Thai", "Cormorant Garamond", serif`;
    const bodyFont = `${15.5 * scale}px "Noto Serif Thai", "Cormorant Garamond", serif`;
    const strongBodyFont = `500 ${16 * scale}px "Noto Serif Thai", "Cormorant Garamond", serif`;
    const labelFont = `600 ${11.5 * scale}px "Noto Serif Thai", "Cormorant Garamond", serif`;
    const smallFont = `${11.5 * scale}px "Noto Serif Thai", sans-serif`;
    const brandFont = `600 ${12 * scale}px "Cormorant Garamond", "Noto Serif Thai", serif`;

    const measureCanvas = document.createElement('canvas');
    const measureCtx = measureCanvas.getContext('2d');
    const blocks = {};
    const measure = (key, value, font, maxWidth = contentWidth, lineHeight = bodyLine) => {
      measureCtx.font = font;
      const lines = EXPORT.wrapCanvasText(measureCtx, value, maxWidth);
      blocks[key] = { lines, font, lineHeight };
      return lines.length * lineHeight;
    };

    const questionText = String(question || '').trim();
    const directHeading = includeQuestion ? text(lang, 'answer') : text(lang, 'insight');
    const sections = [
      ['direct', directHeading, reading.direct || '', strongBodyFont],
      ['why', text(lang, 'why'), reading.rationale || '', bodyFont],
      ['conditions', text(lang, 'conditions'), reading.condition || '', bodyFont],
      ['ganesha', text(lang, 'ganesha'), reading.ganesha || '', bodyFont],
      ['reflection', text(lang, 'reflection'), reading.reflection || '', bodyFont]
    ].filter(([, , value]) => String(value || '').trim());

    let height = padding;
    height += 20 * scale; // brand
    height += 22 * scale; // mode/date
    if (includeQuestion && questionText) {
      height += sectionGap;
      height += 18 * scale;
      height += measure('question', questionText, bodyFont, contentWidth - (boxPad * 2), bodyLine);
      height += 24 * scale;
    }
    height += 18 * scale;
    height += cardHeight;
    height += 22 * scale;
    height += measure('title', card.title?.[lang] || card.title?.en || '', titleFont, contentWidth, 34 * scale);
    if (lang === 'th' && card.title?.en) height += 21 * scale;
    height += 24 * scale;
    height += 18 * scale;
    height += measure('focus', reading.contextLabel || '', bodyFont, contentWidth - (boxPad * 2), 24 * scale);
    height += 22 * scale;

    sections.forEach(([key, , value, font]) => {
      height += sectionGap;
      height += 18 * scale;
      height += measure(key, value, font, contentWidth - (boxPad * 2), bodyLine);
      height += 26 * scale;
    });

    height += sectionGap;
    height += measure('footer', text(lang, 'footer'), smallFont, contentWidth, smallLine);
    height += padding;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = Math.ceil(height);
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, width, canvas.height);
    gradient.addColorStop(0, '#062425');
    gradient.addColorStop(.48, '#081f21');
    gradient.addColorStop(1, '#07191b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, canvas.height);

    const glow = ctx.createRadialGradient(width * .5, 160 * scale, 20, width * .5, 160 * scale, width * .7);
    glow.addColorStop(0, 'rgba(229,189,112,.10)');
    glow.addColorStop(1, 'rgba(229,189,112,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, Math.min(canvas.height, 700 * scale));

    let y = padding;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(247,217,147,.80)';
    ctx.font = brandFont;
    ctx.fillText(text(lang, 'brand'), width / 2, y + 12 * scale);
    y += 20 * scale;
    ctx.fillStyle = 'rgba(255,248,233,.48)';
    ctx.font = smallFont;
    ctx.fillText(`${text(lang, 'mode')}  ·  ${EXPORT.formatLocalDate(lang)}`, width / 2, y + 11 * scale);
    y += 22 * scale;

    if (includeQuestion && questionText) {
      y += sectionGap;
      const boxHeight = 18 * scale + (blocks.question.lines.length * bodyLine) + 24 * scale;
      EXPORT.drawRoundedRect(ctx, padding, y, contentWidth, boxHeight, 12 * scale);
      ctx.fillStyle = 'rgba(229,189,112,.035)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(247,217,147,.12)';
      ctx.lineWidth = 1.2 * scale;
      ctx.stroke();
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(229,189,112,.72)';
      ctx.font = labelFont;
      ctx.fillText(text(lang, 'question'), padding + boxPad, y + 20 * scale);
      EXPORT.drawMultiline(ctx, blocks.question.lines, padding + boxPad, y + 44 * scale, bodyLine, {
        align: 'left', color: 'rgba(255,248,233,.78)', font: bodyFont
      });
      y += boxHeight;
    }

    y += 18 * scale;
    try {
      const artwork = await EXPORT.loadImage(card.image);
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,.34)';
      ctx.shadowBlur = 18 * scale;
      ctx.drawImage(artwork, (width - cardWidth) / 2, y, cardWidth, cardHeight);
      ctx.restore();
    } catch (_) {
      EXPORT.drawRoundedRect(ctx, (width - cardWidth) / 2, y, cardWidth, cardHeight, 10 * scale);
      ctx.fillStyle = 'rgba(229,189,112,.06)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(247,217,147,.18)';
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(247,217,147,.62)';
      ctx.font = titleFont;
      ctx.fillText('✦', width / 2, y + (cardHeight / 2));
    }
    y += cardHeight + 22 * scale;

    y = EXPORT.drawMultiline(ctx, blocks.title.lines, width / 2, y, 34 * scale, {
      align: 'center', color: 'rgba(255,248,233,.94)', font: titleFont
    });
    if (lang === 'th' && card.title?.en) {
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,248,233,.42)';
      ctx.font = smallFont;
      ctx.fillText(card.title.en, width / 2, y + 8 * scale);
      y += 21 * scale;
    }
    y += 24 * scale;

    const focusHeight = 18 * scale + (blocks.focus.lines.length * 24 * scale) + 22 * scale;
    EXPORT.drawRoundedRect(ctx, padding, y, contentWidth, focusHeight, 10 * scale);
    ctx.fillStyle = 'rgba(229,189,112,.025)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(247,217,147,.10)';
    ctx.stroke();
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(229,189,112,.68)';
    ctx.font = labelFont;
    ctx.fillText(text(lang, 'focus'), padding + boxPad, y + 20 * scale);
    EXPORT.drawMultiline(ctx, blocks.focus.lines, padding + boxPad, y + 43 * scale, 24 * scale, {
      align: 'left', color: 'rgba(255,248,233,.70)', font: bodyFont
    });
    y += focusHeight;

    sections.forEach(([key, heading, , font]) => {
      y += sectionGap;
      const block = blocks[key];
      const boxHeight = 18 * scale + (block.lines.length * bodyLine) + 26 * scale;
      EXPORT.drawRoundedRect(ctx, padding, y, contentWidth, boxHeight, 12 * scale);
      ctx.fillStyle = key === 'direct' ? 'rgba(229,189,112,.055)' : (key === 'ganesha' ? 'rgba(229,189,112,.035)' : 'rgba(255,255,255,.016)');
      ctx.fill();
      ctx.strokeStyle = key === 'direct' ? 'rgba(247,217,147,.18)' : 'rgba(247,217,147,.09)';
      ctx.lineWidth = 1.2 * scale;
      ctx.stroke();
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(229,189,112,.72)';
      ctx.font = labelFont;
      ctx.fillText(heading, padding + boxPad, y + 20 * scale);
      EXPORT.drawMultiline(ctx, block.lines, padding + boxPad, y + 44 * scale, bodyLine, {
        align: 'left', color: key === 'direct' ? 'rgba(255,248,233,.91)' : 'rgba(255,248,233,.76)', font
      });
      y += boxHeight;
    });

    y += sectionGap;
    ctx.strokeStyle = 'rgba(255,248,233,.07)';
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
    y += 22 * scale;
    EXPORT.drawMultiline(ctx, blocks.footer.lines, width / 2, y, smallLine, {
      align: 'center', color: 'rgba(255,248,233,.38)', font: smallFont
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Failed to create Ask reading image.')), 'image/png');
    });
  }

  window.LGTAskExport = Object.freeze({ version: VERSION, buildImageBlob, filename });
})();

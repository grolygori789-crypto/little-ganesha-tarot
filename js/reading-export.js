(() => {
  'use strict';

  const VERSION = 'reading-export-v1';

  function wrapCanvasText(ctx, text, maxWidth) {
    const source = String(text || '').trim();
    if (!source) return [''];
    const lines = [];
    source.split(/\n+/).forEach((paragraph) => {
      const tokens = paragraph.split(/(\s+)/).filter(Boolean);
      let current = '';
      tokens.forEach((token) => {
        const candidate = `${current}${token}`;
        if (!current || ctx.measureText(candidate).width <= maxWidth) {
          current = candidate;
          return;
        }
        if (current.trim()) lines.push(current.trim());
        current = '';
        for (const char of Array.from(token)) {
          const next = `${current}${char}`;
          if (!current || ctx.measureText(next).width <= maxWidth) current = next;
          else {
            if (current.trim()) lines.push(current.trim());
            current = char;
          }
        }
      });
      if (current.trim()) lines.push(current.trim());
    });
    return lines.length ? lines : [''];
  }

  function drawRoundedRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function drawMultiline(ctx, lines, x, yStart, lineHeight, options = {}) {
    const { align = 'left', color = 'rgba(255,248,233,.84)', font = '16px serif' } = options;
    ctx.textAlign = align;
    ctx.fillStyle = color;
    ctx.font = font;
    lines.forEach((line, index) => ctx.fillText(line, x, yStart + (index * lineHeight)));
    return yStart + (lines.length * lineHeight);
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  function formatLocalDate(lang) {
    try {
      return new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-US', { dateStyle: 'long' }).format(new Date());
    } catch (_) {
      return new Date().toLocaleDateString();
    }
  }

  async function saveBlob(blob, filename) {
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(href), 1200);
  }

  async function execute(options = {}) {
    const {
      action = 'save',
      buildBlob,
      filename = 'little-ganesha-tarot-reading.png',
      shareTitle = 'Little Ganesha Tarot',
      shareText = 'A reading from Little Ganesha Tarot',
      onStatus = () => {},
      onEvent = () => {},
      messages = {}
    } = options;

    if (typeof buildBlob !== 'function') throw new Error('Reading export requires buildBlob().');
    onStatus(messages.preparing || 'Preparing your reading image');
    const blob = await buildBlob();
    if (!(blob instanceof Blob)) throw new Error('Reading export renderer must return a Blob.');

    if (action === 'share') {
      const file = typeof File === 'function' ? new File([blob], filename, { type: blob.type || 'image/png' }) : null;
      if (file && typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: shareTitle, text: shareText });
          onStatus(messages.shared || 'Your reading image is ready to share.');
          onEvent('share');
          return { outcome: 'shared' };
        } catch (error) {
          if (String(error?.name || '') === 'AbortError') {
            onStatus(messages.cancelled || 'Sharing was cancelled.');
            return { outcome: 'cancelled' };
          }
          throw error;
        }
      }
      await saveBlob(blob, filename);
      onStatus(messages.savedFallback || 'Direct sharing is unavailable, so the image was saved instead.');
      onEvent('save-fallback');
      return { outcome: 'saved-fallback' };
    }

    await saveBlob(blob, filename);
    onStatus(messages.saved || 'Your reading image has been saved.');
    onEvent('save');
    return { outcome: 'saved' };
  }

  window.LGTReadingExport = Object.freeze({
    version: VERSION,
    wrapCanvasText,
    drawRoundedRect,
    drawMultiline,
    loadImage,
    formatLocalDate,
    saveBlob,
    execute
  });
})();

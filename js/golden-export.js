(() => {
  'use strict';

  const EXPORT = window.LGTReadingExport;
  if (!EXPORT) throw new Error('Golden Path export requires shared Reading Export.');
  const VERSION = 'golden-export-v1';

  const COPY = {
    en: {
      title: 'THE GOLDEN PATH', focus: 'FOCUS', glance: 'YOUR PATH AT A GLANCE',
      synthesis: 'YOUR GOLDEN PATH', actions: 'WHAT TO DO NEXT', reflection: 'A QUESTION TO CARRY FORWARD',
      footer: 'Use tarot for reflection and direction, not as a fixed prediction. Little Ganesha Tarot · Benedict Interactive'
    },
    th: {
      title: 'เส้นทางสีทอง', focus: 'หัวข้อที่เลือก', glance: 'ภาพรวมเส้นทางของคุณ',
      synthesis: 'เส้นทางสีทองของคุณ', actions: 'สิ่งที่ควรทำต่อจากนี้', reflection: 'คำถามชวนทบทวนต่อ',
      footer: 'ใช้ไพ่ทาโรต์เป็นเครื่องมือช่วยทบทวนและมองทิศทาง ไม่ใช่คำทำนายที่ตายตัว · Little Ganesha Tarot · Benedict Interactive'
    }
  };

  function copy(lang, key) { return COPY[lang === 'th' ? 'th' : 'en'][key]; }

  async function buildImageBlob({ cards, reading, lang = 'en' } = {}) {
    if (!Array.isArray(cards) || cards.length !== 3 || !reading) throw new Error('Golden Path export requires three cards and a reading.');
    const safeLang = lang === 'th' ? 'th' : 'en';
    if (document.fonts?.ready) { try { await document.fonts.ready; } catch (_) {} }

    const scale = 2;
    const width = 540 * scale;
    const padding = 32 * scale;
    const contentWidth = width - padding * 2;
    const cardGap = 12 * scale;
    const cardWidth = Math.floor((contentWidth - cardGap * 2) / 3);
    const cardHeight = Math.round(cardWidth * (1672 / 941));
    const serif = safeLang === 'th' ? '"Noto Serif Thai", serif' : '"Cormorant Garamond", Georgia, serif';
    const sans = '"Noto Sans Thai", system-ui, sans-serif';
    const cardTitleFont = `600 ${12 * scale}px ${serif}`;
    const bodyFont = `${15 * scale}px ${serif}`;
    const labelFont = `600 ${11 * scale}px ${sans}`;
    const smallFont = `${11 * scale}px ${sans}`;
    const line = 25 * scale;
    const smallLine = 18 * scale;

    const measure = document.createElement('canvas').getContext('2d');
    const blocks = {};
    const add = (key, text, font = bodyFont, maxWidth = contentWidth - 24 * scale, lineHeight = line) => {
      measure.font = font;
      const lines = EXPORT.wrapCanvasText(measure, text, maxWidth);
      blocks[key] = { lines, font, lineHeight };
      return lines.length * lineHeight;
    };

    add('glance', reading.atGlance);
    add('synthesis', reading.goldenPath);
    add('actions', reading.actions.map((item, index) => `${index + 1}. ${item}`).join('\n'));
    add('reflection', reading.reflection);
    add('footer', copy(safeLang, 'footer'), smallFont, contentWidth, smallLine);

    let height = padding + 80*scale + cardHeight + 82*scale;
    for (const key of ['glance','synthesis','actions','reflection']) {
      height += 20*scale + blocks[key].lines.length * line + 28*scale;
    }
    height += blocks.footer.lines.length * smallLine + padding + 28*scale;

    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = Math.ceil(height);
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0,0,width,canvas.height);
    gradient.addColorStop(0,'#0b2d2f'); gradient.addColorStop(.52,'#0a2527'); gradient.addColorStop(1,'#061b1d');
    ctx.fillStyle = gradient; ctx.fillRect(0,0,width,canvas.height);
    const glow = ctx.createRadialGradient(width*.75,130*scale,0,width*.75,130*scale,320*scale);
    glow.addColorStop(0,'rgba(229,189,112,.14)'); glow.addColorStop(1,'rgba(229,189,112,0)');
    ctx.fillStyle=glow; ctx.fillRect(0,0,width,520*scale);

    let y=padding;
    ctx.textAlign='center'; ctx.fillStyle='rgba(229,189,112,.85)'; ctx.font=labelFont; ctx.fillText(copy(safeLang,'title'),width/2,y+10*scale);
    y += 28*scale;
    ctx.fillStyle='rgba(255,248,233,.82)'; ctx.font=`600 ${18*scale}px ${serif}`; ctx.fillText(reading.focusLabel,width/2,y+8*scale);
    y += 28*scale;
    ctx.fillStyle='rgba(255,248,233,.44)'; ctx.font=smallFont; ctx.fillText(EXPORT.formatLocalDate(safeLang),width/2,y);
    y += 28*scale;

    const images = await Promise.all(cards.map(card => EXPORT.loadImage(card.image).catch(()=>null)));
    cards.forEach((card,index)=>{
      const x=padding+index*(cardWidth+cardGap);
      EXPORT.drawRoundedRect(ctx,x,y,cardWidth,cardHeight,10*scale); ctx.save(); ctx.clip();
      if(images[index]) ctx.drawImage(images[index],x,y,cardWidth,cardHeight); else {ctx.fillStyle='rgba(229,189,112,.08)';ctx.fillRect(x,y,cardWidth,cardHeight);}
      ctx.restore(); ctx.strokeStyle='rgba(247,217,147,.25)';ctx.lineWidth=1.3*scale;EXPORT.drawRoundedRect(ctx,x,y,cardWidth,cardHeight,10*scale);ctx.stroke();
    });
    y += cardHeight + 15*scale;
    cards.forEach((card,index)=>{
      const x=padding+index*(cardWidth+cardGap)+cardWidth/2;
      ctx.textAlign='center';ctx.fillStyle='rgba(229,189,112,.72)';ctx.font=labelFont;
      const position = reading.positions[index].label;
      const shortPosition = safeLang === 'th' ? position : position.toUpperCase();
      const positionLines = EXPORT.wrapCanvasText(measure, shortPosition, cardWidth-8*scale).slice(0,2);
      EXPORT.drawMultiline(ctx,positionLines,x,y,15*scale,{align:'center',color:'rgba(229,189,112,.72)',font:labelFont});
      measure.font=cardTitleFont;
      const titleLines=EXPORT.wrapCanvasText(measure,card.title[safeLang],cardWidth-8*scale).slice(0,2);
      EXPORT.drawMultiline(ctx,titleLines,x,y+34*scale,18*scale,{align:'center',color:'rgba(255,248,233,.88)',font:cardTitleFont});
    });
    y += 78*scale;

    const sections=[['glance','glance'],['synthesis','synthesis'],['actions','actions'],['reflection','reflection']];
    sections.forEach(([key,labelKey])=>{
      const block=blocks[key]; const boxH=block.lines.length*line+52*scale;
      EXPORT.drawRoundedRect(ctx,padding,y,contentWidth,boxH,12*scale);
      ctx.fillStyle=key==='synthesis'?'rgba(229,189,112,.06)':'rgba(255,255,255,.022)';ctx.fill();
      ctx.strokeStyle=key==='synthesis'?'rgba(229,189,112,.20)':'rgba(247,217,147,.09)';ctx.lineWidth=1.2*scale;ctx.stroke();
      ctx.textAlign='left';ctx.fillStyle='rgba(229,189,112,.78)';ctx.font=labelFont;ctx.fillText(copy(safeLang,labelKey),padding+14*scale,y+22*scale);
      EXPORT.drawMultiline(ctx,block.lines,padding+14*scale,y+49*scale,line,{align:'left',color:'rgba(255,248,233,.82)',font:bodyFont});
      y += boxH + 18*scale;
    });

    ctx.strokeStyle='rgba(255,248,233,.07)';ctx.beginPath();ctx.moveTo(padding,y);ctx.lineTo(width-padding,y);ctx.stroke();y+=24*scale;
    EXPORT.drawMultiline(ctx,blocks.footer.lines,width/2,y,smallLine,{align:'center',color:'rgba(255,248,233,.38)',font:smallFont});
    return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Failed to create image blob.')),'image/png'));
  }

  function filename(cards, focusId = 'general') {
    const ids = Array.isArray(cards) ? cards.map(card=>card.id).join('-') : 'reading';
    return `little-ganesha-tarot-golden-path-${focusId}-${new Date().toISOString().slice(0,10)}-${ids}.png`;
  }

  window.LGTGoldenExport = Object.freeze({ version: VERSION, buildImageBlob, filename });
})();

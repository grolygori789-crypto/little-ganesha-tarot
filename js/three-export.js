(() => {
  'use strict';

  const EXPORT = window.LGTReadingExport;
  if (!EXPORT) throw new Error('Three-card export requires shared Reading Export.');
  const VERSION = 'three-export-v1';

  const COPY = {
    en: {
      title: 'THREE-CARD READING', story: 'THE STORY THESE CARDS TELL', turning: 'THE TURNING POINT',
      pattern: 'WHAT TIES THE CARDS TOGETHER', guidance: 'WHAT TO TAKE WITH YOU', reflection: 'A QUESTION TO CARRY FORWARD',
      footer: 'Use tarot for reflection, not as a fixed prediction. Little Ganesha Tarot · Benedict Interactive'
    },
    th: {
      title: 'เปิดไพ่สามใบ', story: 'เรื่องราวที่ไพ่ทั้งสามกำลังเล่า', turning: 'จุดหักเหของเรื่อง',
      pattern: 'สิ่งที่เชื่อมไพ่ทั้งสามเข้าด้วยกัน', guidance: 'สิ่งที่ควรนำไปใช้ต่อ', reflection: 'คำถามชวนทบทวนต่อ',
      footer: 'ใช้ไพ่ทาโรต์เป็นเครื่องมือช่วยทบทวนตัวเอง ไม่ใช่คำทำนายที่ตายตัว · Little Ganesha Tarot · Benedict Interactive'
    }
  };

  function copy(lang, key) { return COPY[lang === 'th' ? 'th' : 'en'][key]; }

  async function buildImageBlob({ cards, reading, lang = 'en' } = {}) {
    if (!Array.isArray(cards) || cards.length !== 3 || !reading) throw new Error('Three-card export requires three cards and a narrative.');
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
    const titleFont = `600 ${20 * scale}px ${serif}`;
    const cardTitleFont = `600 ${12 * scale}px ${serif}`;
    const bodyFont = `${15 * scale}px ${serif}`;
    const labelFont = `600 ${11 * scale}px ${sans}`;
    const smallFont = `${11 * scale}px ${sans}`;
    const line = 25 * scale;
    const smallLine = 18 * scale;

    const measure = document.createElement('canvas').getContext('2d');
    const blocks = {};
    const add = (key, text, font, maxWidth, lineHeight) => {
      measure.font = font;
      const lines = EXPORT.wrapCanvasText(measure, text, maxWidth);
      blocks[key] = { lines, font, lineHeight };
      return lines.length * lineHeight;
    };

    let height = padding + 18*scale + 24*scale + 20*scale + cardHeight + 82*scale;
    for (const [key, text] of [['story',reading.story],['turning',reading.turningPoint],['pattern',reading.pattern],['guidance',reading.guidance],['reflection',reading.reflection]]) {
      height += 20*scale + add(key,text,bodyFont,contentWidth-24*scale,line) + 24*scale;
    }
    height += add('footer', copy(safeLang,'footer'), smallFont, contentWidth, smallLine) + padding + 20*scale;

    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = Math.ceil(height);
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0,0,width,canvas.height);
    gradient.addColorStop(0,'#0b2d2f'); gradient.addColorStop(.52,'#0a2527'); gradient.addColorStop(1,'#061b1d');
    ctx.fillStyle = gradient; ctx.fillRect(0,0,width,canvas.height);
    const glow = ctx.createRadialGradient(width*.76,120*scale,0,width*.76,120*scale,300*scale);
    glow.addColorStop(0,'rgba(229,189,112,.12)'); glow.addColorStop(1,'rgba(229,189,112,0)');
    ctx.fillStyle=glow; ctx.fillRect(0,0,width,480*scale);

    let y=padding;
    ctx.textAlign='center'; ctx.fillStyle='rgba(229,189,112,.78)'; ctx.font=labelFont; ctx.fillText(copy(safeLang,'title'),width/2,y+10*scale);
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
      ctx.textAlign='center';ctx.fillStyle='rgba(229,189,112,.72)';ctx.font=labelFont;ctx.fillText(reading.positions[index].label.toUpperCase?.() || reading.positions[index].label,x,y);
      const titleLines=(()=>{measure.font=cardTitleFont;return EXPORT.wrapCanvasText(measure,card.title[safeLang],cardWidth-8*scale).slice(0,2);})();
      EXPORT.drawMultiline(ctx,titleLines,x,y+20*scale,18*scale,{align:'center',color:'rgba(255,248,233,.88)',font:cardTitleFont});
    });
    y += 64*scale;

    const sections=[['story','story'],['turning','turning'],['pattern','pattern'],['guidance','guidance'],['reflection','reflection']];
    sections.forEach(([key,labelKey])=>{
      const block=blocks[key]; const boxH=block.lines.length*line+50*scale;
      EXPORT.drawRoundedRect(ctx,padding,y,contentWidth,boxH,12*scale);
      ctx.fillStyle=key==='story'?'rgba(229,189,112,.055)':'rgba(255,255,255,.022)';ctx.fill();
      ctx.strokeStyle=key==='story'?'rgba(229,189,112,.17)':'rgba(247,217,147,.09)';ctx.lineWidth=1.2*scale;ctx.stroke();
      ctx.textAlign='left';ctx.fillStyle='rgba(229,189,112,.76)';ctx.font=labelFont;ctx.fillText(copy(safeLang,labelKey),padding+14*scale,y+22*scale);
      EXPORT.drawMultiline(ctx,block.lines,padding+14*scale,y+48*scale,line,{align:'left',color:'rgba(255,248,233,.82)',font:bodyFont});
      y += boxH + 18*scale;
    });

    ctx.strokeStyle='rgba(255,248,233,.07)';ctx.beginPath();ctx.moveTo(padding,y);ctx.lineTo(width-padding,y);ctx.stroke();y+=24*scale;
    EXPORT.drawMultiline(ctx,blocks.footer.lines,width/2,y,smallLine,{align:'center',color:'rgba(255,248,233,.38)',font:smallFont});
    return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Failed to create image blob.')),'image/png'));
  }

  function filename(cards) {
    const ids = Array.isArray(cards) ? cards.map(card=>card.id).join('-') : 'reading';
    return `little-ganesha-tarot-three-card-${new Date().toISOString().slice(0,10)}-${ids}.png`;
  }

  window.LGTThreeExport = Object.freeze({ version: VERSION, buildImageBlob, filename });
})();

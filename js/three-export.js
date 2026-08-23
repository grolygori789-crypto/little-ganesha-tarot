(() => {
  'use strict';
  const EXPORT=window.LGTReadingExport;
  if(!EXPORT) throw new Error('Three-card export requires shared Reading Export.');
  const VERSION='three-export-v2';
  const COPY={
    en:{title:'THREE-CARD READING',focus:'FOCUS',story:'THE STORY THESE CARDS TELL',turning:'THE TURNING POINT',pattern:'WHAT TIES THE CARDS TOGETHER',guidance:'WHAT TO TAKE WITH YOU',reflection:'A QUESTION TO CARRY FORWARD',footer:'Use tarot for reflection and direction, not as a fixed prediction. Little Ganesha Tarot · Benedict Interactive'},
    th:{title:'เปิดไพ่สามใบ',focus:'หัวข้อที่เลือก',story:'เรื่องราวที่ไพ่ทั้งสามกำลังเล่า',turning:'จุดหักเหของเรื่อง',pattern:'สิ่งที่เชื่อมไพ่ทั้งสามเข้าด้วยกัน',guidance:'สิ่งที่ควรนำไปใช้ต่อ',reflection:'คำถามชวนทบทวนต่อ',footer:'ใช้ไพ่ทาโรต์เป็นเครื่องมือช่วยทบทวนและมองทิศทาง ไม่ใช่คำทำนายที่ตายตัว · Little Ganesha Tarot · Benedict Interactive'}
  };
  function c(lang,key){return COPY[lang==='th'?'th':'en'][key];}
  async function buildImageBlob({cards,reading,lang='en'}={}){
    if(!Array.isArray(cards)||cards.length!==3||!reading) throw new Error('Three-card export requires three cards and a narrative.');
    const L=lang==='th'?'th':'en';if(document.fonts?.ready){try{await document.fonts.ready;}catch(_){}}
    const scale=2,width=540*scale,padding=32*scale,contentWidth=width-padding*2,gap=12*scale,cardWidth=Math.floor((contentWidth-gap*2)/3),cardHeight=Math.round(cardWidth*(1672/941));
    const serif=L==='th'?'"Noto Serif Thai", serif':'"Cormorant Garamond", Georgia, serif',sans='"Noto Sans Thai", system-ui, sans-serif';
    const cardTitleFont=`600 ${12*scale}px ${serif}`,bodyFont=`${15*scale}px ${serif}`,labelFont=`600 ${11*scale}px ${sans}`,smallFont=`${11*scale}px ${sans}`,line=25*scale,smallLine=18*scale;
    const measure=document.createElement('canvas').getContext('2d'),blocks={};
    const add=(key,text,font=bodyFont,maxWidth=contentWidth-24*scale,lineHeight=line)=>{measure.font=font;blocks[key]={lines:EXPORT.wrapCanvasText(measure,text,maxWidth),font,lineHeight};};
    add('story',reading.story);add('turning',reading.turningPoint);add('pattern',reading.pattern);add('guidance',reading.guidance);add('reflection',reading.reflection);add('footer',c(L,'footer'),smallFont,contentWidth,smallLine);
    let height=padding+108*scale+cardHeight+82*scale;['story','turning','pattern','guidance','reflection'].forEach(k=>height+=blocks[k].lines.length*line+70*scale);height+=blocks.footer.lines.length*smallLine+padding+20*scale;
    const canvas=document.createElement('canvas');canvas.width=width;canvas.height=Math.ceil(height);const ctx=canvas.getContext('2d');
    const gradient=ctx.createLinearGradient(0,0,width,canvas.height);gradient.addColorStop(0,'#0b2d2f');gradient.addColorStop(.52,'#0a2527');gradient.addColorStop(1,'#061b1d');ctx.fillStyle=gradient;ctx.fillRect(0,0,width,canvas.height);
    const glow=ctx.createRadialGradient(width*.76,120*scale,0,width*.76,120*scale,300*scale);glow.addColorStop(0,'rgba(229,189,112,.12)');glow.addColorStop(1,'rgba(229,189,112,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,width,480*scale);
    let y=padding;ctx.textAlign='center';ctx.fillStyle='rgba(229,189,112,.78)';ctx.font=labelFont;ctx.fillText(c(L,'title'),width/2,y+10*scale);y+=27*scale;
    ctx.fillStyle='rgba(255,248,233,.86)';ctx.font=`600 ${18*scale}px ${serif}`;ctx.fillText(reading.focusLabel||'',width/2,y+8*scale);y+=28*scale;
    ctx.fillStyle='rgba(255,248,233,.44)';ctx.font=smallFont;ctx.fillText(EXPORT.formatLocalDate(L),width/2,y);y+=30*scale;
    const images=await Promise.all(cards.map(card=>EXPORT.loadImage(card.image).catch(()=>null)));
    cards.forEach((card,i)=>{const x=padding+i*(cardWidth+gap);EXPORT.drawRoundedRect(ctx,x,y,cardWidth,cardHeight,10*scale);ctx.save();ctx.clip();if(images[i])ctx.drawImage(images[i],x,y,cardWidth,cardHeight);else{ctx.fillStyle='rgba(229,189,112,.08)';ctx.fillRect(x,y,cardWidth,cardHeight);}ctx.restore();ctx.strokeStyle='rgba(247,217,147,.25)';ctx.lineWidth=1.3*scale;EXPORT.drawRoundedRect(ctx,x,y,cardWidth,cardHeight,10*scale);ctx.stroke();});
    y+=cardHeight+15*scale;
    cards.forEach((card,i)=>{const x=padding+i*(cardWidth+gap)+cardWidth/2;ctx.textAlign='center';ctx.fillStyle='rgba(229,189,112,.72)';ctx.font=labelFont;const pos=reading.positions[i].label;const pl=EXPORT.wrapCanvasText(measure,L==='th'?pos:pos.toUpperCase(),cardWidth-8*scale).slice(0,2);EXPORT.drawMultiline(ctx,pl,x,y,15*scale,{align:'center',color:'rgba(229,189,112,.72)',font:labelFont});measure.font=cardTitleFont;const tl=EXPORT.wrapCanvasText(measure,card.title[L],cardWidth-8*scale).slice(0,2);EXPORT.drawMultiline(ctx,tl,x,y+34*scale,18*scale,{align:'center',color:'rgba(255,248,233,.88)',font:cardTitleFont});});
    y+=78*scale;
    for(const [key,label] of [['story','story'],['turning','turning'],['pattern','pattern'],['guidance','guidance'],['reflection','reflection']]){const b=blocks[key],boxH=b.lines.length*line+52*scale;EXPORT.drawRoundedRect(ctx,padding,y,contentWidth,boxH,12*scale);ctx.fillStyle=key==='story'?'rgba(229,189,112,.055)':'rgba(255,255,255,.022)';ctx.fill();ctx.strokeStyle=key==='story'?'rgba(229,189,112,.17)':'rgba(247,217,147,.09)';ctx.lineWidth=1.2*scale;ctx.stroke();ctx.textAlign='left';ctx.fillStyle='rgba(229,189,112,.76)';ctx.font=labelFont;ctx.fillText(c(L,label),padding+14*scale,y+22*scale);EXPORT.drawMultiline(ctx,b.lines,padding+14*scale,y+49*scale,line,{align:'left',color:'rgba(255,248,233,.82)',font:bodyFont});y+=boxH+18*scale;}
    ctx.strokeStyle='rgba(255,248,233,.07)';ctx.beginPath();ctx.moveTo(padding,y);ctx.lineTo(width-padding,y);ctx.stroke();y+=24*scale;EXPORT.drawMultiline(ctx,blocks.footer.lines,width/2,y,smallLine,{align:'center',color:'rgba(255,248,233,.38)',font:smallFont});
    return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Failed to create image blob.')),'image/png'));
  }
  function filename(cards,focusId='general'){const ids=Array.isArray(cards)?cards.map(c=>c.id).join('-'):'reading';return `little-ganesha-tarot-three-card-${focusId}-${new Date().toISOString().slice(0,10)}-${ids}.png`;}
  window.LGTThreeExport=Object.freeze({version:VERSION,buildImageBlob,filename});
})();

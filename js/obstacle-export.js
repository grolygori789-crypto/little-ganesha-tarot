(() => {
  'use strict';
  const EXPORT=window.LGTReadingExport;
  if(!EXPORT) throw new Error('Remove the Obstacle export requires shared Reading Export.');
  const VERSION='obstacle-export-v1';
  const COPY={
    en:{title:'REMOVE THE OBSTACLE',focus:'FOCUS',glance:'WHAT IS REALLY HAPPENING',knot:'THE KNOT',release:'THE RELEASE',actions:'FIRST MOVES',watch:'WATCH FOR',reflection:'A QUESTION TO CARRY FORWARD',footer:'Use tarot for reflection and practical perspective, not as a fixed prediction. Little Ganesha Tarot · Benedict Interactive'},
    th:{title:'คลายอุปสรรค',focus:'หัวข้อที่เลือก',glance:'ภาพรวมของสิ่งที่ติดขัด',knot:'ปมหลัก',release:'จุดคลาย',actions:'ก้าวแรกที่ทำได้',watch:'สิ่งที่ควรระวัง',reflection:'คำถามชวนทบทวนต่อ',footer:'ใช้ไพ่ทาโรต์เป็นเครื่องมือช่วยทบทวนและมองทางเลือก ไม่ใช่คำทำนายที่ตายตัว · Little Ganesha Tarot · Benedict Interactive'}
  };
  function c(lang,key){return COPY[lang==='th'?'th':'en'][key];}
  async function buildImageBlob({cards,reading,lang='en'}={}){
    if(!Array.isArray(cards)||cards.length!==3||!reading) throw new Error('Remove the Obstacle export requires three cards and a reading.');
    const L=lang==='th'?'th':'en'; if(document.fonts?.ready){try{await document.fonts.ready;}catch(_){}}
    const scale=2,width=1080,padding=64,contentWidth=width-padding*2,gap=24,cardWidth=Math.floor((contentWidth-gap*2)/3),cardHeight=Math.round(cardWidth*(1672/941));
    const serif=L==='th'?'"Noto Serif Thai", serif':'"Cormorant Garamond", Georgia, serif'; const sans='"Noto Sans Thai", system-ui, sans-serif';
    const bodyFont=`${30}px ${serif}`,labelFont=`600 ${22}px ${sans}`,smallFont=`${21}px ${sans}`,cardTitleFont=`600 ${24}px ${serif}`,line=50,smallLine=36;
    const measure=document.createElement('canvas').getContext('2d'); const blocks={};
    const add=(key,text,font=bodyFont,maxWidth=contentWidth-48,lineHeight=line)=>{measure.font=font;blocks[key]={lines:EXPORT.wrapCanvasText(measure,text,maxWidth),font,lineHeight};};
    add('glance',reading.atGlance);add('knot',reading.knot);add('release',reading.release);add('actions',reading.actions.map((x,i)=>`${i+1}. ${x}`).join('\n'));add('watch',reading.watchFor);add('reflection',reading.reflection);add('footer',c(L,'footer'),smallFont,contentWidth,smallLine);
    let height=padding+160+cardHeight+166;['glance','knot','release','actions','watch','reflection'].forEach(k=>height+=blocks[k].lines.length*line+104);height+=blocks.footer.lines.length*smallLine+padding+54;
    const canvas=document.createElement('canvas');canvas.width=width;canvas.height=Math.ceil(height);const ctx=canvas.getContext('2d');
    const grad=ctx.createLinearGradient(0,0,width,canvas.height);grad.addColorStop(0,'#102d2c');grad.addColorStop(.52,'#092525');grad.addColorStop(1,'#061b1c');ctx.fillStyle=grad;ctx.fillRect(0,0,width,canvas.height);
    const glow=ctx.createRadialGradient(width*.24,150,0,width*.24,150,620);glow.addColorStop(0,'rgba(210,158,105,.16)');glow.addColorStop(1,'rgba(210,158,105,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,width,800);
    let y=padding;ctx.textAlign='center';ctx.fillStyle='rgba(224,178,126,.9)';ctx.font=labelFont;ctx.fillText(c(L,'title'),width/2,y+20);y+=56;ctx.fillStyle='rgba(255,248,233,.86)';ctx.font=`600 36px ${serif}`;ctx.fillText(reading.focusLabel,width/2,y+16);y+=55;ctx.fillStyle='rgba(255,248,233,.45)';ctx.font=smallFont;ctx.fillText(EXPORT.formatLocalDate(L),width/2,y);y+=50;
    const images=await Promise.all(cards.map(card=>EXPORT.loadImage(card.image).catch(()=>null)));
    cards.forEach((card,i)=>{const x=padding+i*(cardWidth+gap);EXPORT.drawRoundedRect(ctx,x,y,cardWidth,cardHeight,18);ctx.save();ctx.clip();if(images[i])ctx.drawImage(images[i],x,y,cardWidth,cardHeight);else{ctx.fillStyle='rgba(229,189,112,.08)';ctx.fillRect(x,y,cardWidth,cardHeight);}ctx.restore();ctx.strokeStyle='rgba(247,217,147,.24)';ctx.lineWidth=2;EXPORT.drawRoundedRect(ctx,x,y,cardWidth,cardHeight,18);ctx.stroke();});
    y+=cardHeight+28;cards.forEach((card,i)=>{const x=padding+i*(cardWidth+gap)+cardWidth/2;ctx.textAlign='center';const pos=reading.positions[i].label;measure.font=labelFont;EXPORT.drawMultiline(ctx,EXPORT.wrapCanvasText(measure,L==='th'?pos:pos.toUpperCase(),cardWidth-16).slice(0,2),x,y,30,{align:'center',color:'rgba(224,178,126,.76)',font:labelFont});measure.font=cardTitleFont;EXPORT.drawMultiline(ctx,EXPORT.wrapCanvasText(measure,card.title[L],cardWidth-16).slice(0,2),x,y+62,36,{align:'center',color:'rgba(255,248,233,.9)',font:cardTitleFont});});y+=156;
    const sections=[['glance','glance'],['knot','knot'],['release','release'],['actions','actions'],['watch','watch'],['reflection','reflection']];
    sections.forEach(([key,label])=>{const b=blocks[key],boxH=b.lines.length*line+104;EXPORT.drawRoundedRect(ctx,padding,y,contentWidth,boxH,24);ctx.fillStyle=key==='release'?'rgba(210,158,105,.07)':'rgba(255,255,255,.021)';ctx.fill();ctx.strokeStyle=key==='release'?'rgba(224,178,126,.23)':'rgba(247,217,147,.09)';ctx.lineWidth=2;ctx.stroke();ctx.textAlign='left';ctx.fillStyle='rgba(224,178,126,.8)';ctx.font=labelFont;ctx.fillText(c(L,label),padding+28,y+42);EXPORT.drawMultiline(ctx,b.lines,padding+28,y+92,line,{align:'left',color:'rgba(255,248,233,.83)',font:bodyFont});y+=boxH+34;});
    ctx.strokeStyle='rgba(255,248,233,.08)';ctx.beginPath();ctx.moveTo(padding,y);ctx.lineTo(width-padding,y);ctx.stroke();y+=45;EXPORT.drawMultiline(ctx,blocks.footer.lines,width/2,y,smallLine,{align:'center',color:'rgba(255,248,233,.38)',font:smallFont});
    return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Failed to create image blob.')),'image/png'));
  }
  function filename(cards,focusId='general'){const ids=Array.isArray(cards)?cards.map(c=>c.id).join('-'):'reading';return `little-ganesha-tarot-remove-obstacle-${focusId}-${new Date().toISOString().slice(0,10)}-${ids}.png`;}
  window.LGTObstacleExport=Object.freeze({version:VERSION,buildImageBlob,filename});
})();

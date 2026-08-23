(() => {
  'use strict';
  const EXPORT=window.LGTReadingExport, CONTENT=window.LGTReadingContent, HC=window.LGTHindiContent;
  if(!EXPORT||!CONTENT||!HC) throw new Error('Hindi export requires shared export and Hindi content.');
  const VERSION='hindi-export-v1';
  const IDS={daily:{save:'dailySaveImage',share:'dailyShareImage',status:'dailyShareStatus'},ask:{save:'askSaveImage',share:'askShareImage',status:'askShareStatus'},three:{save:'threeSave',share:'threeShare',status:'threeShareStatus'},golden:{save:'goldenSave',share:'goldenShare',status:'goldenShareStatus'},obstacle:{save:'obstacleSave',share:'obstacleShare',status:'obstacleShareStatus'}};
  const $=id=>document.getElementById(id);
  const serif='"Noto Serif Devanagari", "Noto Serif", serif';
  const sans='"Noto Sans Devanagari", system-ui, sans-serif';

  function date(){try{return new Intl.DateTimeFormat('hi-IN',{dateStyle:'long'}).format(new Date());}catch(_){return new Date().toLocaleDateString('hi-IN');}}
  async function drawCards(ctx,cards,width,padding,y,scale){
    const gap=12*scale,content=width-padding*2,cw=cards.length===1?190*scale:Math.floor((content-gap*(cards.length-1))/cards.length),ch=Math.round(cw*(1672/941));
    const xs=cards.length===1?[(width-cw)/2]:cards.map((_,i)=>padding+i*(cw+gap));
    const imgs=await Promise.all(cards.map(c=>EXPORT.loadImage(c.image).catch(()=>null)));
    cards.forEach((c,i)=>{EXPORT.drawRoundedRect(ctx,xs[i],y,cw,ch,10*scale);ctx.save();ctx.clip();if(imgs[i])ctx.drawImage(imgs[i],xs[i],y,cw,ch);else{ctx.fillStyle='#12393a';ctx.fillRect(xs[i],y,cw,ch);}ctx.restore();ctx.strokeStyle='rgba(247,217,147,.26)';ctx.lineWidth=1.2*scale;EXPORT.drawRoundedRect(ctx,xs[i],y,cw,ch,10*scale);ctx.stroke();});
    return {y:y+ch,cw,ch,xs};
  }
  function prepareBlocks(items,width,scale){
    const m=document.createElement('canvas').getContext('2d'),bodyFont=`${15*scale}px ${serif}`,line=27*scale;const blocks=[];
    for(const item of items){m.font=bodyFont;const lines=EXPORT.wrapCanvasText(m,item.text,width);blocks.push({...item,lines,height:lines.length*line+54*scale});}
    return {blocks,bodyFont,line};
  }
  function drawBlock(ctx,block,x,y,w,scale,hero=false){
    EXPORT.drawRoundedRect(ctx,x,y,w,block.height,12*scale);ctx.fillStyle=hero?'rgba(229,189,112,.065)':'rgba(255,255,255,.022)';ctx.fill();ctx.strokeStyle=hero?'rgba(229,189,112,.22)':'rgba(247,217,147,.10)';ctx.lineWidth=1.2*scale;ctx.stroke();
    ctx.textAlign='left';ctx.fillStyle='rgba(229,189,112,.82)';ctx.font=`600 ${11*scale}px ${sans}`;ctx.fillText(block.label,x+15*scale,y+23*scale);
    EXPORT.drawMultiline(ctx,block.lines,x+15*scale,y+51*scale,27*scale,{align:'left',color:'rgba(255,248,233,.84)',font:`${15*scale}px ${serif}`});return y+block.height;
  }
  async function build(mode,state,includeQuestion=false){
    if(!state)throw new Error('Hindi reading state is not ready.');if(document.fonts?.ready){try{await document.fonts.ready;}catch(_){}}
    const scale=2,width=540*scale,pad=32*scale,content=width-pad*2;
    let cards=[],title='',subtitle='',items=[];
    if(mode==='daily'){
      const c=state.card,p=HC.profile(c);cards=[c];title='आज का मार्गदर्शन';subtitle=c.title.hi;
      items=[{label:'आज का मुख्य संकेत',text:p.e,hero:true},{label:'सोचने के लिए सवाल',text:p.r},{label:'काम और लक्ष्य',text:HC.lens(c,'workGoals')},{label:'पैसा और संसाधन',text:HC.lens(c,'moneyResources')},{label:'प्यार और रिश्ते',text:HC.lens(c,'loveRelationships')},{label:'भीतरी स्थिति और संतुलन',text:HC.lens(c,'innerBalance')},{label:'अवसर और सावधानियाँ',text:HC.lens(c,'opportunitiesWatchouts')},{label:'आज के लिए दिशा',text:HC.lens(c,'guidanceToday')}];
    }else if(mode==='ask'){
      const c=state.card,r=state.reading;cards=[c];title='गणेश से पूछें';subtitle=r.contextLabel;
      if(includeQuestion)items.push({label:'आपका सवाल',text:state.question});
      items.push({label:'आपके सवाल का सीधा जवाब',text:r.direct,hero:true},{label:'यह कार्ड ऐसा क्यों कह रहा है',text:r.rationale},{label:'साथ में क्या ध्यान रखें',text:r.condition},{label:'नन्हे गणेश की शांत सलाह',text:r.ganesha},{label:'आगे साथ रखने वाला सवाल',text:r.reflection});
    }else if(mode==='three'){
      const r=state.reading;cards=state.cards;title='तीन कार्ड की रीडिंग';subtitle=r.focusLabel;items=[{label:'तीनों कार्ड मिलकर क्या कहानी कहते हैं',text:r.story,hero:true},{label:'निर्णायक मोड़',text:r.turningPoint},{label:'तीनों कार्डों को क्या जोड़ता है',text:r.pattern},{label:'अभी अपने साथ क्या रखें',text:r.guidance},{label:'आगे साथ रखने वाला सवाल',text:r.reflection}];
    }else if(mode==='golden'){
      const r=state.reading;cards=state.cards;title='गोल्डन पाथ';subtitle=r.focusLabel;items=[{label:'आपकी दिशा एक नज़र में',text:r.atGlance},{label:'आपका गोल्डन पाथ',text:r.goldenPath,hero:true},{label:'अब क्या करें',text:r.actions.map((x,i)=>`${i+1}. ${x}`).join('\n')},{label:'आगे साथ रखने वाला सवाल',text:r.reflection}];
    }else{
      const r=state.reading;cards=state.cards;title='रुकावट से रास्ता निकालें';subtitle=r.focusLabel;items=[{label:'असल में क्या हो रहा है',text:r.atGlance},{label:'मुख्य गाँठ',text:r.knot,hero:true},{label:'गाँठ ढीली करने की दिशा',text:r.release},{label:'पहले व्यवहारिक कदम',text:r.actions.map((x,i)=>`${i+1}. ${x}`).join('\n')},{label:'इस बात पर नज़र रखें',text:r.watchFor},{label:'आगे साथ रखने वाला सवाल',text:r.reflection}];
    }
    const prep=prepareBlocks(items,content-30*scale,scale);
    const cardH=Math.round((cards.length===1?190*scale:Math.floor((content-24*scale)/3))*(1672/941));
    let height=pad+70*scale+cardH+92*scale+prep.blocks.reduce((a,b)=>a+b.height+18*scale,0)+90*scale;
    const canvas=document.createElement('canvas');canvas.width=width;canvas.height=Math.ceil(height);const ctx=canvas.getContext('2d');
    const bg=ctx.createLinearGradient(0,0,width,canvas.height);bg.addColorStop(0,'#0d3031');bg.addColorStop(.5,'#082526');bg.addColorStop(1,'#061b1d');ctx.fillStyle=bg;ctx.fillRect(0,0,width,canvas.height);
    const glow=ctx.createRadialGradient(width*.72,130*scale,0,width*.72,130*scale,330*scale);glow.addColorStop(0,'rgba(229,189,112,.14)');glow.addColorStop(1,'rgba(229,189,112,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,width,520*scale);
    let y=pad;ctx.textAlign='center';ctx.fillStyle='rgba(229,189,112,.87)';ctx.font=`600 ${12*scale}px ${sans}`;ctx.fillText('LITTLE GANESHA TAROT',width/2,y+10*scale);y+=31*scale;ctx.fillStyle='#f7d995';ctx.font=`600 ${22*scale}px ${serif}`;ctx.fillText(title,width/2,y+8*scale);y+=29*scale;ctx.fillStyle='rgba(255,248,233,.66)';ctx.font=`${13*scale}px ${serif}`;ctx.fillText(subtitle,width/2,y+4*scale);y+=25*scale;ctx.fillStyle='rgba(255,248,233,.4)';ctx.font=`${10.5*scale}px ${sans}`;ctx.fillText(date(),width/2,y);y+=25*scale;
    const dc=await drawCards(ctx,cards,width,pad,y,scale);y=dc.y+14*scale;
    cards.forEach((c,i)=>{const x=dc.xs[i]+dc.cw/2;ctx.textAlign='center';ctx.fillStyle='rgba(255,248,233,.88)';ctx.font=`600 ${12*scale}px ${serif}`;ctx.fillText(c.title.hi,x,y+12*scale);ctx.fillStyle='rgba(255,248,233,.42)';ctx.font=`${9.5*scale}px ${sans}`;ctx.fillText(c.title.en,x,y+30*scale);});y+=52*scale;
    for(const [i,b] of prep.blocks.entries()){y=drawBlock(ctx,b,pad,y,content,scale,Boolean(items[i].hero));y+=18*scale;}
    ctx.strokeStyle='rgba(255,248,233,.07)';ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(width-pad,y);ctx.stroke();y+=24*scale;const footer='टैरो को चिंतन और दिशा के साधन की तरह लें, तय भविष्यवाणी की तरह नहीं · Benedict Interactive';ctx.font=`${10.5*scale}px ${sans}`;const lines=EXPORT.wrapCanvasText(ctx,footer,content);EXPORT.drawMultiline(ctx,lines,width/2,y,19*scale,{align:'center',color:'rgba(255,248,233,.38)',font:`${10.5*scale}px ${sans}`});
    return new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Hindi export failed')),'image/png'));
  }
  async function run(mode,action){
    window.LGTHindiRuntime?.apply?.();const s=window.LGTHindiRuntime?.getState?.(mode);if(!s)return;const cfg=IDS[mode],status=$(cfg.status);const include=mode==='ask'&&(action==='save'||Boolean($('askIncludeQuestion')?.checked));
    const buttons=[$(cfg.save),$(cfg.share)].filter(Boolean);buttons.forEach(b=>b.disabled=true);
    try{await EXPORT.execute({action,buildBlob:()=>build(mode,s,include),filename:`little-ganesha-tarot-${mode}-hi-${new Date().toISOString().slice(0,10)}.png`,shareTitle:'Little Ganesha Tarot',shareText:'मेरी Little Ganesha Tarot रीडिंग',onStatus:m=>{if(status)status.textContent=m;},messages:{preparing:'रीडिंग की इमेज तैयार हो रही है',saved:'रीडिंग की इमेज सेव हो गई है।',shared:'रीडिंग शेयर करने के लिए तैयार है।',savedFallback:'सीधे शेयर करना उपलब्ध नहीं है, इसलिए इमेज सेव कर दी गई है।',cancelled:'शेयर रद्द कर दिया गया।'}});}catch(err){console.error(err);if(status)status.textContent='अभी इमेज तैयार नहीं हो सकी। कृपया दोबारा कोशिश करें।';}finally{buttons.forEach(b=>b.disabled=false);}
  }
  const lookup=new Map();Object.entries(IDS).forEach(([mode,c])=>{lookup.set(c.save,[mode,'save']);lookup.set(c.share,[mode,'share']);});
  document.addEventListener('click',e=>{if(document.documentElement.lang!=='hi')return;const hit=e.target.closest?.('button');const pair=hit&&lookup.get(hit.id);if(!pair)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();run(pair[0],pair[1]);},true);
  window.LGTHindiExport=Object.freeze({version:VERSION,build,run});
})();

(() => {
  'use strict';

  const ENGINE = window.LGTReadingEngine;
  const CONTENT = window.LGTReadingContent;
  const NARRATIVE = window.LGTThreeNarrative;
  const READING_EXPORT = window.LGTReadingExport;
  const THREE_EXPORT = window.LGTThreeExport;
  const DECK_RITUAL = window.LGTDeckRitual;
  const THREE_STORAGE = window.LGTThreeStorage;
  const DAY = window.LGTReadingDay;
  if (!ENGINE || !CONTENT || !NARRATIVE || !READING_EXPORT || !THREE_EXPORT || !DECK_RITUAL || !THREE_STORAGE || !DAY) throw new Error('Three-card UI requires Reading Engine, content, narrative, Deck Ritual, Three-card storage, Reading Day, and export modules.');

  const COPY = {
    en: {
      eyebrow:'THREE-CARD READING', title:'Three cards, one story',
      intro:'Take a moment with the full deck. You will choose three cards in order: what shaped this path, where you are now, and what may unfold next.',
      begin:'Begin', shuffling:'Shuffling the deck', choose:'Choose a card',
      choosePast:'Let your eyes move across the shuffled deck and choose the first card that draws you in — this one reflects what shaped the path.', choosePresent:'Now choose a second card for where the situation stands today.', chooseNext:'Choose one final card for the direction that may unfold next.',
      past:'Past', present:'Present', next:'What May Unfold Next', chosen:'Chosen', selected:'Your three cards are ready', reveal:'Reveal the Reading', loading:'Preparing your three-card reading',
      story:'THE STORY THESE CARDS TELL', turning:'THE TURNING POINT', pattern:'WHAT TIES THE CARDS TOGETHER', guidance:'WHAT TO TAKE WITH YOU', reflection:'A QUESTION TO CARRY FORWARD',
      saveShareTitle:'SAVE OR SHARE', saveShareHint:'Create a clean image of the full three-card reading to keep or share.', saveImage:'Save Image', shareImage:'Share',
      preparing:'Preparing your reading image', saved:'Your three-card reading image has been saved.', shared:'Your reading image is ready to share.', savedFallback:'Direct sharing is not available here, so the image was saved instead.', failed:'The image could not be created right now. Please try again.', cancelled:'Sharing was cancelled.',
      done:'Back to Home', back:'Back to Home', upright:'UPRIGHT', cardAlt:'Tarot card: ',
      resetKicker:'TODAY’S THREE-CARD READING IS COMPLETE', resetLabel:'Your next three-card reading will be available in', storageFail:'This device could not save today’s three-card reading, so the daily lock may not survive a reload.',
      disclaimer:'Read the three cards as a reflection on patterns and direction, not as a fixed prediction. The final card shows what may unfold if the present pattern continues.'
    },
    th: {
      eyebrow:'เปิดไพ่สามใบ', title:'สามใบ หนึ่งเรื่องราว',
      intro:'ใช้เวลาสักครู่กับไพ่ทั้งสำรับ คุณจะเลือกไพ่สามใบตามลำดับ เพื่อดูสิ่งที่พามาถึงตรงนี้ สิ่งที่กำลังเกิดขึ้น และแนวโน้มต่อจากนี้',
      begin:'เริ่มเปิดไพ่', shuffling:'กำลังสับไพ่', choose:'เลือกไพ่',
      choosePast:'มองไปตามสำรับที่สับไว้ แล้วเลือกใบแรกที่สะดุดใจ ใบนี้แทนสิ่งที่พาคุณมาถึงจุดนี้', choosePresent:'ต่อไปเลือกใบที่สองสำหรับสถานการณ์ของคุณในตอนนี้', chooseNext:'เลือกใบสุดท้ายสำหรับแนวโน้มที่อาจคลี่ต่อจากนี้',
      past:'อดีต', present:'ปัจจุบัน', next:'แนวโน้มต่อจากนี้', chosen:'เลือกแล้ว', selected:'ไพ่ทั้งสามพร้อมแล้ว', reveal:'เปิดไพ่ทั้งสาม', loading:'กำลังเตรียมคำอ่านไพ่สามใบ',
      story:'เรื่องราวที่ไพ่ทั้งสามกำลังเล่า', turning:'จุดหักเหของเรื่อง', pattern:'สิ่งที่เชื่อมไพ่ทั้งสามเข้าด้วยกัน', guidance:'สิ่งที่ควรนำไปใช้ต่อ', reflection:'คำถามชวนทบทวนต่อ',
      saveShareTitle:'บันทึกหรือแชร์', saveShareHint:'สร้างภาพผลการอ่านไพ่สามใบแบบสะอาดตาเพื่อเก็บไว้หรือส่งต่อได้ทันที', saveImage:'บันทึกภาพ', shareImage:'แชร์',
      preparing:'กำลังเตรียมภาพผลการอ่าน', saved:'บันทึกภาพผลการอ่านไพ่สามใบแล้ว', shared:'เตรียมภาพสำหรับการแชร์แล้ว', savedFallback:'อุปกรณ์นี้แชร์ภาพตรงจากหน้านี้ไม่ได้ จึงบันทึกภาพลงเครื่องให้แทน', failed:'ยังสร้างภาพผลการอ่านไม่ได้ในตอนนี้ กรุณาลองใหม่อีกครั้ง', cancelled:'ยกเลิกการแชร์แล้ว',
      done:'กลับหน้าหลัก', back:'กลับหน้าหลัก', upright:'ไพ่ตั้งตรง', cardAlt:'ไพ่ทาโรต์: ',
      resetKicker:'การเปิดไพ่สามใบของวันนี้เสร็จสมบูรณ์แล้ว', resetLabel:'เปิดไพ่สามใบครั้งใหม่ได้ใน', storageFail:'อุปกรณ์นี้บันทึกการเปิดไพ่สามใบของวันนี้ไม่ได้ การล็อกหนึ่งครั้งต่อวันจึงอาจหายไปหลังเปิดแอปใหม่',
      disclaimer:'อ่านไพ่ทั้งสามเป็นภาพสะท้อนของรูปแบบและทิศทาง ไม่ใช่คำทำนายที่ตายตัว ไพ่ใบสุดท้ายคือแนวโน้มที่อาจเกิดขึ้นเมื่อจังหวะปัจจุบันเดินต่อ'
    }
  };

  const shell=document.createElement('section');
  shell.className='reading-shell three-shell'; shell.id='threeReadingView'; shell.hidden=true; shell.setAttribute('role','region'); shell.setAttribute('aria-labelledby','threeReadingTitle');
  shell.innerHTML=`
    <div class="reading-ambient" aria-hidden="true"><span class="reading-orb reading-orb--one"></span><span class="reading-orb reading-orb--two"></span></div>
    <header class="reading-header"><button class="reading-back" id="threeBack" type="button"><span aria-hidden="true">‹</span></button><div class="reading-header__copy"><span class="reading-eyebrow" id="threeEyebrow"></span><h2 id="threeReadingTitle"></h2></div><span class="reading-header__balance" aria-hidden="true"></span></header>
    <div class="reading-scroll" id="threeScroll">
      <div class="reading-intro" id="threeIntro"></div>
      <section class="three-selected-rail" id="threeRail" aria-label="Three card positions">
        ${['past','present','next'].map((id,index)=>`<div class="three-slot" data-slot="${id}"><span class="three-slot__label" id="threeSlotLabel${index}"></span><div class="three-slot__card"><img src="${CONTENT.cardBack}" alt="" decoding="async"><span>${index+1}</span></div><strong id="threeSlotName${index}"></strong></div>`).join('')}
      </section>
      <div class="reading-stage three-stage" id="threeStage"><div class="reading-deck" id="threeDeck" aria-hidden="true"><img src="${CONTENT.cardBack}" alt="" decoding="async"><img src="${CONTENT.cardBack}" alt="" decoding="async"><img src="${CONTENT.cardBack}" alt="" decoding="async"></div><div class="three-choice" id="threeChoice" hidden></div></div>
      <div class="reading-status" id="threeStatus" role="status" aria-live="polite"></div>
      <div class="reading-actions" id="threeActions"><button class="reading-primary" id="threePrimary" type="button"></button><button class="ask-home-action" id="threeHome" type="button" hidden></button></div>
      <article class="reading-interpretation three-interpretation" id="threeInterpretation" hidden>
        <section class="three-revealed-cards" id="threeRevealedCards"></section>
        <section class="three-story three-reading-block--hero"><span id="threeStoryLabel"></span><p id="threeStory"></p></section>
        <section class="three-story"><span id="threeTurningLabel"></span><p id="threeTurning"></p></section>
        <section class="three-story"><span id="threePatternLabel"></span><p id="threePattern"></p></section>
        <section class="three-story"><span id="threeGuidanceLabel"></span><p id="threeGuidance"></p></section>
        <section class="reading-reflection three-story"><span id="threeReflectionLabel"></span><p id="threeReflection"></p></section>
        <section class="reading-share" id="threeSaveShare" hidden><div class="reading-share__heading"><span id="threeSaveShareTitle"></span><p id="threeSaveShareHint"></p></div><div class="reading-share__actions"><button class="reading-secondary" id="threeSave" type="button"></button><button class="reading-secondary reading-secondary--strong" id="threeShare" type="button"></button></div><p class="reading-share__status" id="threeShareStatus" role="status" aria-live="polite"></p></section>
        <section class="reading-reset-note" id="threeResetNote" hidden><span id="threeResetKicker"></span><p id="threeResetLabel"></p><strong id="threeResetTime"></strong></section>
        <p class="reading-disclaimer" id="threeDisclaimer"></p>
      </article>
      <p class="reading-storage-note" id="threeStorageNote" hidden></p>
    </div>`;
  document.getElementById('app')?.appendChild(shell);

  const $=id=>document.getElementById(id); const mainApp=$('mainApp'); const intro=$('threeIntro'), deck=$('threeDeck'), choice=$('threeChoice'), stage=$('threeStage'), status=$('threeStatus'), actions=$('threeActions'), primary=$('threePrimary'), home=$('threeHome'), interpretation=$('threeInterpretation'), rail=$('threeRail'), revealed=$('threeRevealedCards'), scroll=$('threeScroll');
  const saveShare=$('threeSaveShare'), saveButton=$('threeSave'), shareButton=$('threeShare'), shareStatus=$('threeShareStatus');
  const resetNote=$('threeResetNote'), resetKicker=$('threeResetKicker'), resetLabel=$('threeResetLabel'), resetTime=$('threeResetTime'), storageNote=$('threeStorageNote');
  let session=null, candidates=[], selectedIndices=[], selectedCards=[], reading=null, view='intro', timer=null, previousFocus=null, exportBusy=false, lifecycle=0, deckRitual=null, restoredToday=false, stopCountdown=null;
  const reduced=()=>document.documentElement.dataset.motion==='reduced'||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang=()=>document.documentElement.lang==='th'?'th':'en'; const t=k=>COPY[lang()][k]||COPY.en[k]||k;
  function after(ms,fn){ if(timer)clearTimeout(timer); timer=setTimeout(()=>{timer=null;fn();},reduced()?Math.min(ms,80):ms); }
  function emit(type,detail={}){window.dispatchEvent(new CustomEvent('lgt:reading:interaction',{detail:{type,spreadId:'three',...detail}}));}
  function setMainInert(value){if(!mainApp)return;if('inert'in mainApp)mainApp.inert=value;if(value)mainApp.setAttribute('aria-hidden','true');else mainApp.removeAttribute('aria-hidden');}
  function updateCopy(){ $('threeEyebrow').textContent=t('eyebrow');$('threeReadingTitle').textContent=t('title');$('threeBack').setAttribute('aria-label',t('back'));$('threeHome').textContent=t('back');$('threeHome').setAttribute('aria-label',t('back')); $('threeStoryLabel').textContent=t('story');$('threeTurningLabel').textContent=t('turning');$('threePatternLabel').textContent=t('pattern');$('threeGuidanceLabel').textContent=t('guidance');$('threeReflectionLabel').textContent=t('reflection');$('threeSaveShareTitle').textContent=t('saveShareTitle');$('threeSaveShareHint').textContent=t('saveShareHint');saveButton.textContent=t('saveImage');shareButton.textContent=t('shareImage');resetKicker.textContent=t('resetKicker');resetLabel.textContent=t('resetLabel');storageNote.textContent=t('storageFail');$('threeDisclaimer').textContent=t('disclaimer');
    [t('past'),t('present'),t('next')].forEach((label,i)=>$('threeSlotLabel'+i).textContent=label);
    deckRitual?.setAriaLabelBuilder((index)=>`${t('choose')} ${index+1}`);
    if(view==='intro'){intro.textContent=t('intro');primary.textContent=t('begin');status.textContent='';}
    else if(view==='shuffling'){intro.textContent='';status.textContent=t('shuffling');}
    else if(view==='choosing'){const hints=[t('choosePast'),t('choosePresent'),t('chooseNext')];intro.textContent=hints[selectedIndices.length]||'';status.textContent=`${t('choose')} · ${selectedIndices.length+1}/3`;}
    else if(view==='selected'){intro.textContent='';status.textContent=t('selected');primary.textContent=t('reveal');}
    else if(view==='revealed'){intro.textContent='';status.textContent='';primary.textContent=t('done');}
    if(selectedCards.length===3&&reading)renderText();
    if(!resetNote.hidden)resetTime.textContent=DAY.formatRemaining(DAY.snapshot().remainingMs,lang());
  }
  function stopResetCountdown(){if(stopCountdown)stopCountdown();stopCountdown=null;resetNote.hidden=true;}
  function resetForNewDay(){stopResetCountdown();THREE_STORAGE.clearExpired();if(session?.state==='interpreted')session.complete();reset();shell.classList.add('is-active');session=ENGINE.createSession('three');view='intro';updateCopy();emit('day-reset');}
  function startResetCountdown(){stopResetCountdown();resetNote.hidden=false;stopCountdown=DAY.subscribe((info,meta)=>{resetTime.textContent=DAY.formatRemaining(info.remainingMs,lang());if(meta.rolledOver&&!shell.hidden)resetForNewDay();});}
  function reset(){if(timer)clearTimeout(timer);stopResetCountdown();lifecycle++;restoredToday=false;shell.classList.remove('is-revealed');session=null;candidates=[];selectedIndices=[];selectedCards=[];reading=null;view='intro';deck.hidden=false;deck.classList.remove('is-shuffling');stage.hidden=false;intro.hidden=false;choice.hidden=true;deckRitual?.destroy();deckRitual=null;choice.replaceChildren();stage.classList.remove('is-compact-deck');interpretation.hidden=true;revealed.replaceChildren();actions.hidden=false;primary.disabled=false;home.hidden=true;saveShare.hidden=true;shareStatus.textContent='';storageNote.hidden=true;exportBusy=false;saveButton.disabled=false;shareButton.disabled=false;rail.querySelectorAll('.three-slot').forEach((slot,i)=>{slot.classList.remove('is-filled');const img=slot.querySelector('img');img.src=CONTENT.cardBack;img.alt='';slot.querySelector('.three-slot__card span').hidden=false;$('threeSlotName'+i).textContent='';});scroll.scrollTop=0;updateCopy();}
  function buildChoices(){
    deckRitual?.destroy();
    deckRitual=DECK_RITUAL.create({
      container:choice,
      cardBack:CONTENT.cardBack,
      count:candidates.length,
      selectionLimit:3,
      rowCount:6,
      variant:'full',
      groupLabel:t('choose'),
      ariaLabelBuilder:(index)=>`${t('choose')} ${index+1}`,
      onSelect:({index,button})=>pick(index,button)
    });
  }
  function start(){if(!session||session.state!=='idle')return;view='shuffling';primary.disabled=true;actions.hidden=true;updateCopy();candidates=session.prepareChoice(78);deck.classList.add('is-shuffling');emit('shuffle-start');after(900,()=>{deck.classList.remove('is-shuffling');deck.hidden=true;buildChoices();stage.classList.add('is-compact-deck');choice.hidden=false;session.markChoosing();view='choosing';updateCopy();deckRitual?.focusFirst();});}
  function pick(index,button){if(view!=='choosing'||selectedIndices.includes(index)||selectedIndices.length>=3)return;selectedIndices.push(index);const card=CONTENT.getCard(candidates[index]);const slotIndex=selectedIndices.length-1;const slot=rail.querySelectorAll('.three-slot')[slotIndex];slot.classList.add('is-filled');slot.querySelector('.three-slot__card span').hidden=true;$('threeSlotName'+slotIndex).textContent=t('chosen');emit('card-select',{position:slotIndex,cardId:card.id,deckIndex:index});if(selectedIndices.length<3){updateCopy();return;}selectedCards=session.selectCandidates(selectedIndices);view='selected';after(300,()=>{choice.hidden=true;intro.hidden=true;deckRitual?.destroy();deckRitual=null;stage.classList.remove('is-compact-deck');stage.hidden=true;actions.hidden=false;primary.disabled=false;updateCopy();requestAnimationFrame(()=>{rail.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});});after(180,()=>primary.focus({preventScroll:true}));});}
  function renderText(){if(!reading)return;$('threeStory').textContent=reading.story;$('threeTurning').textContent=reading.turningPoint;$('threePattern').textContent=reading.pattern;$('threeGuidance').textContent=reading.guidance;$('threeReflection').textContent=reading.reflection;}
  async function revealReading({restored=false}={}){if(!session||session.state!=='selected'||selectedCards.length!==3)return;const token=lifecycle;primary.disabled=true;status.textContent=t('loading');session.beginReveal();reading=NARRATIVE.compose(selectedCards,lang());renderText();revealed.replaceChildren();selectedCards.forEach((card,index)=>{const figure=document.createElement('figure');figure.className='three-result-card';figure.innerHTML=`<span class="three-result-card__position">${reading.positions[index].label}</span><div class="three-result-card__art"><img src="${card.image}" alt="${t('cardAlt')}${card.title[lang()]}" decoding="async"></div><figcaption><strong>${card.title[lang()]}</strong>${lang()==='th'?`<small>${card.title.en}</small>`:''}<p>${reading.positions[index].text}</p></figcaption>`;revealed.appendChild(figure);});
    try{await Promise.all([...revealed.querySelectorAll('img')].map(img=>img.complete?Promise.resolve():img.decode().catch(()=>{})));}catch(_){}
    if(token!==lifecycle||shell.hidden)return;selectedCards.forEach((card,index)=>{const slot=rail.querySelectorAll('.three-slot')[index];const img=slot.querySelector('img');img.src=card.image;img.alt=`${t('cardAlt')}${card.title[lang()]}`;$('threeSlotName'+index).textContent=card.title[lang()];});session.markRevealed();session.markInterpreted();restoredToday=Boolean(restored);if(!restored&&!THREE_STORAGE.save(session))storageNote.hidden=false;view='revealed';interpretation.hidden=false;saveShare.hidden=false;home.hidden=true;actions.hidden=false;primary.disabled=false;shell.classList.add('is-revealed');updateCopy();startResetCountdown();emit('reading-reveal',{cardIds:selectedCards.map(c=>c.id),trajectory:reading.trajectory,restored:restoredToday});after(80,()=>interpretation.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'nearest'}));}
  async function runExport(action){if(exportBusy||!reading||selectedCards.length!==3)return;exportBusy=true;saveButton.disabled=true;shareButton.disabled=true;try{await READING_EXPORT.execute({action,buildBlob:()=>THREE_EXPORT.buildImageBlob({cards:selectedCards,reading,lang:lang()}),filename:THREE_EXPORT.filename(selectedCards),shareTitle:lang()==='th'?'ผลการเปิดไพ่สามใบ':'Three-Card Reading',shareText:lang()==='th'?'ผลการอ่านจาก Little Ganesha Tarot':'My three-card reading from Little Ganesha Tarot',onStatus:m=>shareStatus.textContent=m,onEvent:event=>emit(event==='share'?'reading-share':'reading-save',{cardIds:selectedCards.map(c=>c.id),fallbackFromShare:event==='save-fallback'}),messages:{preparing:t('preparing'),saved:t('saved'),shared:t('shared'),savedFallback:t('savedFallback'),cancelled:t('cancelled')}});}catch(error){console.error(error);shareStatus.textContent=t('failed');}finally{exportBusy=false;saveButton.disabled=false;shareButton.disabled=false;}}
  function primaryAction(){if(view==='intro')start();else if(view==='selected')revealReading();else if(view==='revealed')close();}
  function open(){if(!shell.hidden)return;previousFocus=document.activeElement;reset();session=ENGINE.createSession('three');const stored=THREE_STORAGE.get();if(stored){session.restoreSelection(stored);selectedCards=session.getSelectedCards().map(entry=>entry.card);restoredToday=true;}setMainInert(true);document.body.classList.add('is-reading-open');shell.hidden=false;requestAnimationFrame(()=>shell.classList.add('is-active'));emit('reading-open',{restored:Boolean(stored)});if(stored){stage.hidden=true;intro.hidden=true;actions.hidden=false;primary.disabled=true;after(40,()=>revealReading({restored:true}));}else after(30,()=>primary.focus({preventScroll:true}));}
  function close(){if(shell.hidden)return;lifecycle++;if(timer)clearTimeout(timer);emit('reading-close');shell.classList.remove('is-active');setTimeout(()=>{shell.hidden=true;shell.classList.remove('is-revealed');reset();setMainInert(false);document.body.classList.remove('is-reading-open');if(previousFocus instanceof HTMLElement&&document.contains(previousFocus))previousFocus.focus({preventScroll:true});previousFocus=null;},reduced()?0:220);}
  document.querySelectorAll('[data-feature="three"]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();open();},{capture:true}));
  $('threeBack').addEventListener('click',close);home.addEventListener('click',close);primary.addEventListener('click',primaryAction);saveButton.addEventListener('click',()=>runExport('save'));shareButton.addEventListener('click',()=>runExport('share'));
  document.addEventListener('keydown',event=>{if(!shell.hidden&&event.key==='Escape'){event.preventDefault();close();}});
  new MutationObserver(muts=>{if(muts.some(m=>m.attributeName==='lang'))updateCopy();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.LGTThreeCard=Object.freeze({open,close});
})();

(() => {
  'use strict';

  const ENGINE = window.LGTReadingEngine;
  const CONTENT = window.LGTReadingContent;
  const NARRATIVE = window.LGTGoldenNarrative;
  const READING_EXPORT = window.LGTReadingExport;
  const GOLDEN_EXPORT = window.LGTGoldenExport;
  const DECK_RITUAL = window.LGTDeckRitual;
  const GOLDEN_STORAGE = window.LGTGoldenStorage;
  const DAY = window.LGTReadingDay;
  if (!ENGINE || !CONTENT || !NARRATIVE || !READING_EXPORT || !GOLDEN_EXPORT || !DECK_RITUAL || !GOLDEN_STORAGE || !DAY) {
    throw new Error('Golden Path UI requires Reading Engine, content, narrative, Deck Ritual, Golden storage, Reading Day, and export modules.');
  }

  const COPY = {
    en: {
      eyebrow:'THE GOLDEN PATH', title:'Find the way forward',
      intro:'Choose the part of life you want to look at. Then draw three cards to see where you stand, what is blocking movement, and the direction that deserves your attention next.',
      focusTitle:'What would you like to explore?', focusHint:'Each focus can be completed once per local day. A focus you have already explored reopens the same cards and guidance until the day changes.', progress:n=>`${n} of 6 explored today`, readToday:'Read today', revisit:'Tap to revisit today’s reading',
      begin:'Begin the Reading', shuffling:'Shuffling the full deck', choose:'Choose a card',
      chooseWhere:'Choose the first card for the ground you are standing on now.', chooseBlock:'Choose the second card for what is making the path harder to see or move through.', chooseForward:'Choose the final card for the direction that can help you move forward.',
      where:'Where You Stand', block:'What Blocks the Path', forward:'The Way Forward', chosen:'Chosen', selected:'Your Golden Path cards are ready', reveal:'Reveal the Golden Path', loading:'Preparing your Golden Path reading',
      glance:'YOUR PATH AT A GLANCE', synthesis:'YOUR GOLDEN PATH', actions:'WHAT TO DO NEXT', reflection:'A QUESTION TO CARRY FORWARD',
      saveShareTitle:'SAVE OR SHARE', saveShareHint:'Create a clean image of your Golden Path reading to keep or share.', saveImage:'Save Image', shareImage:'Share',
      preparing:'Preparing your reading image', saved:'Your Golden Path image has been saved.', shared:'Your Golden Path image is ready to share.', savedFallback:'Direct sharing is not available here, so the image was saved instead.', failed:'The image could not be created right now. Please try again.', cancelled:'Sharing was cancelled.',
      done:'Back to Home', back:'Back to Home', upright:'UPRIGHT', cardAlt:'Tarot card: ',
      resetKicker:'THIS FOCUS IS COMPLETE FOR TODAY', resetLabel:'A new Golden Path reading for this focus will be available in', storageFail:'This device could not save this Focus reading, so today’s restored result may not survive a reload.',
      disclaimer:'Use this reading as reflective guidance for direction and choices, not as a fixed prediction. Money readings are not financial advice, and well-being readings do not diagnose illness or replace professional medical care.',
      focuses: {
        general:['General Life','A wider look at where life is asking for attention'],
        love:['Love & Relationships','Connection, reciprocity, boundaries, and emotional clarity'],
        career:['Career & Work','Work direction, pressure, progress, and meaningful next steps'],
        money:['Money & Resources','Security, resources, practical choices, and financial habits'],
        wellbeing:['Well-being & Balance','Pace, rest, emotional load, boundaries, and self-care'],
        growth:['Personal Growth','Patterns, confidence, change, and the person you are becoming']
      }
    },
    th: {
      eyebrow:'เส้นทางสีทอง', title:'มองทางข้างหน้าให้ชัดขึ้น',
      intro:'เลือกเรื่องในชีวิตที่คุณอยากมองให้ชัด แล้วเปิดไพ่สามใบเพื่อดูว่าตอนนี้คุณยืนอยู่ตรงไหน อะไรกำลังขวาง และทิศทางไหนควรได้รับความสนใจต่อจากนี้',
      focusTitle:'วันนี้อยากสำรวจเรื่องไหน?', focusHint:'แต่ละหัวข้อเปิดเส้นทางสีทองชุดใหม่ได้วันละหนึ่งครั้งตามเวลาของอุปกรณ์ หัวข้อที่ดูแล้วสามารถแตะกลับมาอ่านไพ่และคำอ่านชุดเดิมได้ตลอดทั้งวัน', progress:n=>`วันนี้เปิดแล้ว ${n} จาก 6 หัวข้อ`, readToday:'อ่านแล้ววันนี้', revisit:'แตะเพื่อดูผลเดิม',
      begin:'เริ่มเปิดเส้นทางสีทอง', shuffling:'กำลังสับไพ่ทั้งสำรับ', choose:'เลือกไพ่',
      chooseWhere:'เลือกใบแรกสำหรับจุดที่คุณกำลังยืนอยู่ในเรื่องนี้', chooseBlock:'เลือกใบที่สองสำหรับสิ่งที่กำลังทำให้ทางเดินติดขัดหรือมองได้ไม่ชัด', chooseForward:'เลือกใบสุดท้ายสำหรับทิศทางที่ช่วยให้คุณเดินต่อได้ดีขึ้น',
      where:'จุดที่คุณอยู่ตอนนี้', block:'สิ่งที่ขวางเส้นทาง', forward:'ทางข้างหน้า', chosen:'เลือกแล้ว', selected:'ไพ่เส้นทางสีทองทั้งสามพร้อมแล้ว', reveal:'เปิดเส้นทางสีทอง', loading:'กำลังเตรียมคำอ่านเส้นทางสีทอง',
      glance:'ภาพรวมเส้นทางของคุณ', synthesis:'เส้นทางสีทองของคุณ', actions:'สิ่งที่ควรทำต่อจากนี้', reflection:'คำถามชวนทบทวนต่อ',
      saveShareTitle:'บันทึกหรือแชร์', saveShareHint:'สร้างภาพผลการอ่านเส้นทางสีทองแบบสะอาดตาเพื่อเก็บไว้หรือส่งต่อได้ทันที', saveImage:'บันทึกภาพ', shareImage:'แชร์',
      preparing:'กำลังเตรียมภาพผลการอ่าน', saved:'บันทึกภาพเส้นทางสีทองแล้ว', shared:'เตรียมภาพสำหรับการแชร์แล้ว', savedFallback:'อุปกรณ์นี้แชร์ภาพตรงจากหน้านี้ไม่ได้ จึงบันทึกภาพลงเครื่องให้แทน', failed:'ยังสร้างภาพผลการอ่านไม่ได้ในตอนนี้ กรุณาลองใหม่อีกครั้ง', cancelled:'ยกเลิกการแชร์แล้ว',
      done:'กลับหน้าหลัก', back:'กลับหน้าหลัก', upright:'ไพ่ตั้งตรง', cardAlt:'ไพ่ทาโรต์: ',
      resetKicker:'หัวข้อนี้อ่านแล้วสำหรับวันนี้', resetLabel:'หัวข้อนี้จะเปิดเส้นทางสีทองชุดใหม่ได้ใน', storageFail:'อุปกรณ์นี้บันทึกผลของหัวข้อนี้ไม่ได้ ผลเดิมของวันนี้จึงอาจไม่กลับมาหลังเปิดแอปใหม่',
      disclaimer:'ใช้การอ่านนี้เพื่อช่วยทบทวนทิศทางและการตัดสินใจ ไม่ใช่คำทำนายที่ตายตัว หมวดการเงินไม่ใช่คำแนะนำทางการเงิน และหมวดสุขภาวะไม่ใช่การวินิจฉัยโรคหรือการทดแทนการดูแลจากผู้เชี่ยวชาญทางการแพทย์',
      focuses: {
        general:['ภาพรวมชีวิต','มองกว้างขึ้นว่าช่วงนี้ชีวิตกำลังเรียกร้องความสนใจตรงไหน'],
        love:['ความรักและความสัมพันธ์','ความสัมพันธ์ การตอบรับกัน ขอบเขต และความชัดเจนทางใจ'],
        career:['การงานและอาชีพ','ทิศทางงาน แรงกดดัน ความก้าวหน้า และก้าวถัดไปที่มีความหมาย'],
        money:['การเงินและทรัพยากร','ความมั่นคง ทรัพยากร การตัดสินใจ และนิสัยทางการเงิน'],
        wellbeing:['สุขภาวะและสมดุลชีวิต','จังหวะชีวิต การพัก ภาระทางใจ ขอบเขต และการดูแลตัวเอง'],
        growth:['การเติบโตภายใน','รูปแบบเดิม ความมั่นใจ การเปลี่ยนแปลง และตัวตนที่กำลังเติบโต']
      }
    }
  };

  const focusOrder=['general','love','career','money','wellbeing','growth'];
  const shell=document.createElement('section');
  shell.className='reading-shell golden-shell'; shell.id='goldenReadingView'; shell.hidden=true; shell.setAttribute('role','region'); shell.setAttribute('aria-labelledby','goldenReadingTitle');
  shell.innerHTML=`
    <div class="reading-ambient" aria-hidden="true"><span class="reading-orb reading-orb--one"></span><span class="reading-orb reading-orb--two"></span></div>
    <header class="reading-header"><button class="reading-back" id="goldenBack" type="button"><span aria-hidden="true">‹</span></button><div class="reading-header__copy"><span class="reading-eyebrow" id="goldenEyebrow"></span><h2 id="goldenReadingTitle"></h2></div><span class="reading-header__balance" aria-hidden="true"></span></header>
    <div class="reading-scroll" id="goldenScroll">
      <div class="reading-intro" id="goldenIntro"></div>
      <section class="golden-focus-panel" id="goldenFocusPanel"><div class="golden-focus-panel__head"><h3 id="goldenFocusTitle"></h3><p id="goldenFocusHint"></p><p class="focus-daily-progress" id="goldenFocusProgress"></p></div><div class="golden-focus-grid" id="goldenFocusGrid"></div></section>
      <div class="golden-focus-current" id="goldenFocusCurrent" hidden><span></span><strong></strong></div>
      <section class="three-selected-rail golden-selected-rail" id="goldenRail" aria-label="Golden Path card positions" hidden>
        ${['where','block','forward'].map((id,index)=>`<div class="three-slot" data-slot="${id}"><span class="three-slot__label" id="goldenSlotLabel${index}"></span><div class="three-slot__card"><img src="${CONTENT.cardBack}" alt="" decoding="async"><span>${index+1}</span></div><strong id="goldenSlotName${index}"></strong></div>`).join('')}
      </section>
      <div class="reading-stage three-stage" id="goldenStage" hidden><div class="reading-deck" id="goldenDeck" aria-hidden="true"><img src="${CONTENT.cardBack}" alt="" decoding="async"><img src="${CONTENT.cardBack}" alt="" decoding="async"><img src="${CONTENT.cardBack}" alt="" decoding="async"></div><div class="three-choice" id="goldenChoice" hidden></div></div>
      <div class="reading-status" id="goldenStatus" role="status" aria-live="polite"></div>
      <div class="reading-actions" id="goldenActions"><button class="reading-primary" id="goldenPrimary" type="button" disabled></button><button class="ask-home-action" id="goldenHome" type="button" hidden></button></div>
      <article class="reading-interpretation three-interpretation golden-interpretation" id="goldenInterpretation" hidden>
        <section class="three-revealed-cards" id="goldenRevealedCards"></section>
        <section class="three-story"><span id="goldenGlanceLabel"></span><p id="goldenGlance"></p></section>
        <section class="three-story three-reading-block--hero golden-signature"><span id="goldenSynthesisLabel"></span><p id="goldenSynthesis"></p></section>
        <section class="three-story golden-actions-block"><span id="goldenActionsLabel"></span><ol id="goldenActionList"></ol></section>
        <section class="reading-reflection three-story"><span id="goldenReflectionLabel"></span><p id="goldenReflection"></p></section>
        <section class="reading-share" id="goldenSaveShare" hidden><div class="reading-share__heading"><span id="goldenSaveShareTitle"></span><p id="goldenSaveShareHint"></p></div><div class="reading-share__actions"><button class="reading-secondary" id="goldenSave" type="button"></button><button class="reading-secondary reading-secondary--strong" id="goldenShare" type="button"></button></div><p class="reading-share__status" id="goldenShareStatus" role="status" aria-live="polite"></p></section>
        <section class="reading-reset-note" id="goldenResetNote" hidden><span id="goldenResetKicker"></span><p id="goldenResetLabel"></p><strong id="goldenResetTime"></strong></section>
        <p class="reading-disclaimer" id="goldenDisclaimer"></p>
      </article>
      <p class="reading-storage-note" id="goldenStorageNote" hidden></p>
    </div>`;
  document.getElementById('app')?.appendChild(shell);

  const $=id=>document.getElementById(id); const mainApp=$('mainApp'); const intro=$('goldenIntro'), focusPanel=$('goldenFocusPanel'), focusGrid=$('goldenFocusGrid'), focusCurrent=$('goldenFocusCurrent'), deck=$('goldenDeck'), choice=$('goldenChoice'), stage=$('goldenStage'), status=$('goldenStatus'), actions=$('goldenActions'), primary=$('goldenPrimary'), home=$('goldenHome'), interpretation=$('goldenInterpretation'), rail=$('goldenRail'), revealed=$('goldenRevealedCards'), scroll=$('goldenScroll');
  const saveShare=$('goldenSaveShare'), saveButton=$('goldenSave'), shareButton=$('goldenShare'), shareStatus=$('goldenShareStatus');
  const resetNote=$('goldenResetNote'), resetKicker=$('goldenResetKicker'), resetLabel=$('goldenResetLabel'), resetTime=$('goldenResetTime'), storageNote=$('goldenStorageNote');
  let session=null, candidates=[], selectedIndices=[], selectedCards=[], reading=null, focusId=null, view='focus', timer=null, previousFocus=null, exportBusy=false, lifecycle=0, deckRitual=null, restoredToday=false, stopCountdown=null;
  const reduced=()=>document.documentElement.dataset.motion==='reduced'||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang=()=>document.documentElement.lang==='th'?'th':'en'; const t=k=>COPY[lang()][k]||COPY.en[k]||k;
  function after(ms,fn){ if(timer)clearTimeout(timer); timer=setTimeout(()=>{timer=null;fn();},reduced()?Math.min(ms,80):ms); }
  function emit(type,detail={}){window.dispatchEvent(new CustomEvent('lgt:reading:interaction',{detail:{type,spreadId:'golden',focusId,...detail}}));}
  function setMainInert(value){if(!mainApp)return;if('inert'in mainApp)mainApp.inert=value;if(value)mainApp.setAttribute('aria-hidden','true');else mainApp.removeAttribute('aria-hidden');}

  function buildFocusGrid(){
    const read=GOLDEN_STORAGE.getAll();
    $('goldenFocusProgress').textContent=COPY[lang()].progress(Object.keys(read).length);
    focusGrid.replaceChildren();
    focusOrder.forEach((id,index)=>{
      const done=Boolean(read[id]);
      const button=document.createElement('button'); button.type='button'; button.className='golden-focus-option'; button.dataset.goldenFocus=id; button.setAttribute('aria-pressed',String(!done&&focusId===id));
      const copy=COPY[lang()].focuses[id];
      if(done)button.classList.add('is-read-today');
      if(!done&&focusId===id)button.classList.add('is-selected');
      button.setAttribute('aria-label',done?`${copy[0]} · ${t('readToday')} · ${t('revisit')}`:copy[0]);
      button.innerHTML=`<span class="golden-focus-option__number" aria-hidden="true">0${index+1}</span><span class="golden-focus-option__copy"><strong>${copy[0]}</strong><small>${copy[1]}</small>${done?`<span class="focus-read-badge"><span class="focus-read-check" aria-hidden="true">✓</span>${t('readToday')}</span><small class="focus-read-hint">${t('revisit')}</small>`:''}</span>`;
      button.addEventListener('click',()=>selectFocus(id)); focusGrid.appendChild(button);
    });
  }

  function updateCurrentFocus(){
    if(!focusId){focusCurrent.hidden=true;return;}
    const focus=NARRATIVE.getFocus(focusId); focusCurrent.hidden=false;
    focusCurrent.querySelector('span').textContent=lang()==='th'?'หัวข้อที่กำลังอ่าน':'CURRENT FOCUS';
    focusCurrent.querySelector('strong').textContent=focus.label[lang()];
  }

  function renderText(){
    if(!reading)return;
    $('goldenGlance').textContent=reading.atGlance; $('goldenSynthesis').textContent=reading.goldenPath; $('goldenReflection').textContent=reading.reflection;
    const list=$('goldenActionList'); list.replaceChildren(); reading.actions.forEach(item=>{const li=document.createElement('li');li.textContent=item;list.appendChild(li);});
  }

  function renderReadingCards(){
    if(!reading||selectedCards.length!==3)return;
    revealed.replaceChildren();
    selectedCards.forEach((card,index)=>{
      const figure=document.createElement('figure'); figure.className='three-result-card golden-result-card';
      figure.innerHTML=`<span class="three-result-card__position">${reading.positions[index].label}</span><div class="three-result-card__art"><img src="${card.image}" alt="${t('cardAlt')}${card.title[lang()]}" decoding="async"></div><figcaption><strong>${card.title[lang()]}</strong>${lang()==='th'?`<small>${card.title.en}</small>`:''}<p>${reading.positions[index].text}</p></figcaption>`;
      revealed.appendChild(figure);
    });
  }

  function updateCopy(){
    $('goldenEyebrow').textContent=t('eyebrow');$('goldenReadingTitle').textContent=t('title');$('goldenBack').setAttribute('aria-label',t('back'));$('goldenHome').textContent=t('back');$('goldenHome').setAttribute('aria-label',t('back'));
    $('goldenFocusTitle').textContent=t('focusTitle');$('goldenFocusHint').textContent=t('focusHint');$('goldenGlanceLabel').textContent=t('glance');$('goldenSynthesisLabel').textContent=t('synthesis');$('goldenActionsLabel').textContent=t('actions');$('goldenReflectionLabel').textContent=t('reflection');
    $('goldenSaveShareTitle').textContent=t('saveShareTitle');$('goldenSaveShareHint').textContent=t('saveShareHint');saveButton.textContent=t('saveImage');shareButton.textContent=t('shareImage');resetKicker.textContent=t('resetKicker');resetLabel.textContent=t('resetLabel');storageNote.textContent=t('storageFail');$('goldenDisclaimer').textContent=t('disclaimer');
    [t('where'),t('block'),t('forward')].forEach((label,i)=>$('goldenSlotLabel'+i).textContent=label);
    buildFocusGrid(); updateCurrentFocus(); deckRitual?.setAriaLabelBuilder((index)=>`${t('choose')} ${index+1}`);
    if(view==='focus'){intro.textContent=t('intro');primary.textContent=t('begin');primary.disabled=!focusId;status.textContent=focusId?(lang()==='th'?`เลือก ${NARRATIVE.getFocus(focusId).label.th} แล้ว`:`${NARRATIVE.getFocus(focusId).label.en} selected`):'';}
    else if(view==='shuffling'){intro.textContent='';status.textContent=t('shuffling');}
    else if(view==='choosing'){const hints=[t('chooseWhere'),t('chooseBlock'),t('chooseForward')];intro.textContent=hints[selectedIndices.length]||'';status.textContent=`${t('choose')} · ${selectedIndices.length+1}/3`;}
    else if(view==='selected'){intro.textContent='';status.textContent=t('selected');primary.textContent=t('reveal');}
    else if(view==='revealed'){intro.textContent='';status.textContent='';primary.textContent=t('done');}
    if(selectedCards.length===3&&focusId&&reading){reading=NARRATIVE.compose(selectedCards,focusId,lang());renderText();renderReadingCards();}
    if(!resetNote.hidden)resetTime.textContent=DAY.formatRemaining(DAY.snapshot().remainingMs,lang());
  }

  function selectFocus(id){
    if(view!=='focus'||!NARRATIVE.focuses[id])return;
    const stored=GOLDEN_STORAGE.get(id);
    focusId=id;
    if(stored){
      session.restoreSelection(stored);selectedCards=session.getSelectedCards().map(entry=>entry.card);restoredToday=true;
      focusPanel.hidden=true;focusCurrent.hidden=false;rail.hidden=false;stage.hidden=true;intro.hidden=true;actions.hidden=false;primary.disabled=true;updateCurrentFocus();emit('focus-restore',{focusId:id});after(40,()=>revealReading({restored:true}));return;
    }
    primary.disabled=false;buildFocusGrid();updateCurrentFocus();status.textContent=lang()==='th'?`เลือก ${NARRATIVE.getFocus(id).label.th} แล้ว`:`${NARRATIVE.getFocus(id).label.en} selected`;emit('focus-select',{focusId:id});
  }

  function stopResetCountdown(){if(stopCountdown)stopCountdown();stopCountdown=null;resetNote.hidden=true;}
  function resetForNewDay(){stopResetCountdown();GOLDEN_STORAGE.clearExpired();if(session?.state==='interpreted')session.complete();reset();shell.classList.add('is-active');session=ENGINE.createSession('golden');view='focus';updateCopy();emit('day-reset');}
  function startResetCountdown(){stopResetCountdown();resetNote.hidden=false;stopCountdown=DAY.subscribe((info,meta)=>{resetTime.textContent=DAY.formatRemaining(info.remainingMs,lang());if(meta.rolledOver&&!shell.hidden)resetForNewDay();});}
  function reset(){
    if(timer)clearTimeout(timer);stopResetCountdown();lifecycle++;restoredToday=false;shell.classList.remove('is-revealed');session=null;candidates=[];selectedIndices=[];selectedCards=[];reading=null;focusId=null;view='focus';
    deck.hidden=false;deck.classList.remove('is-shuffling');stage.hidden=true;intro.hidden=false;focusPanel.hidden=false;focusCurrent.hidden=true;rail.hidden=true;choice.hidden=true;deckRitual?.destroy();deckRitual=null;choice.replaceChildren();stage.classList.remove('is-compact-deck');interpretation.hidden=true;revealed.replaceChildren();actions.hidden=false;primary.disabled=true;home.hidden=true;saveShare.hidden=true;shareStatus.textContent='';storageNote.hidden=true;exportBusy=false;saveButton.disabled=false;shareButton.disabled=false;
    rail.querySelectorAll('.three-slot').forEach((slot,i)=>{slot.classList.remove('is-filled');const img=slot.querySelector('img');img.src=CONTENT.cardBack;img.alt='';slot.querySelector('.three-slot__card span').hidden=false;$('goldenSlotName'+i).textContent='';});scroll.scrollTop=0;updateCopy();
  }

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

  function start(){
    if(!session||session.state!=='idle'||!focusId)return;
    view='shuffling';primary.disabled=true;actions.hidden=true;focusPanel.hidden=true;rail.hidden=false;stage.hidden=false;deck.hidden=false;updateCopy();candidates=session.prepareChoice(78);deck.classList.add('is-shuffling');emit('shuffle-start');
    after(900,()=>{deck.classList.remove('is-shuffling');deck.hidden=true;buildChoices();stage.classList.add('is-compact-deck');choice.hidden=false;session.markChoosing();view='choosing';updateCopy();deckRitual?.focusFirst();});
  }

  function pick(index,button){
    if(view!=='choosing'||selectedIndices.includes(index)||selectedIndices.length>=3)return;
    selectedIndices.push(index);const card=CONTENT.getCard(candidates[index]);const slotIndex=selectedIndices.length-1;const slot=rail.querySelectorAll('.three-slot')[slotIndex];slot.classList.add('is-filled');slot.querySelector('.three-slot__card span').hidden=true;$('goldenSlotName'+slotIndex).textContent=t('chosen');emit('card-select',{position:slotIndex,cardId:card.id,deckIndex:index});
    if(selectedIndices.length<3){updateCopy();return;}
    selectedCards=session.selectCandidates(selectedIndices);view='selected';
    after(300,()=>{choice.hidden=true;intro.hidden=true;deckRitual?.destroy();deckRitual=null;stage.classList.remove('is-compact-deck');stage.hidden=true;actions.hidden=false;primary.disabled=false;updateCopy();requestAnimationFrame(()=>{rail.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});});after(180,()=>primary.focus({preventScroll:true}));});
  }

  async function revealReading({restored=false}={}){
    if(!session||session.state!=='selected'||selectedCards.length!==3||!focusId)return;
    const token=lifecycle;primary.disabled=true;status.textContent=t('loading');session.beginReveal();reading=NARRATIVE.compose(selectedCards,focusId,lang());renderText();renderReadingCards();
    try{await Promise.all([...revealed.querySelectorAll('img')].map(img=>img.complete?Promise.resolve():img.decode().catch(()=>{})));}catch(_){}
    if(token!==lifecycle||shell.hidden)return;
    selectedCards.forEach((card,index)=>{const slot=rail.querySelectorAll('.three-slot')[index];const img=slot.querySelector('img');img.src=card.image;img.alt=`${t('cardAlt')}${card.title[lang()]}`;$('goldenSlotName'+index).textContent=card.title[lang()];});
    session.markRevealed();session.markInterpreted();restoredToday=Boolean(restored);if(!restored&&!GOLDEN_STORAGE.save(session,focusId))storageNote.hidden=false;view='revealed';interpretation.hidden=false;saveShare.hidden=false;home.hidden=true;actions.hidden=false;primary.disabled=false;shell.classList.add('is-revealed');updateCopy();startResetCountdown();emit('reading-reveal',{cardIds:selectedCards.map(c=>c.id),trajectory:reading.trajectory,restored:restoredToday});after(80,()=>interpretation.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'nearest'}));
  }

  async function runExport(action){
    if(exportBusy||!reading||selectedCards.length!==3||!focusId)return;exportBusy=true;saveButton.disabled=true;shareButton.disabled=true;
    try{await READING_EXPORT.execute({action,buildBlob:()=>GOLDEN_EXPORT.buildImageBlob({cards:selectedCards,reading,lang:lang()}),filename:GOLDEN_EXPORT.filename(selectedCards,focusId),shareTitle:lang()==='th'?'เส้นทางสีทอง':'The Golden Path',shareText:lang()==='th'?'ผลการอ่านเส้นทางสีทองจาก Little Ganesha Tarot':'My Golden Path reading from Little Ganesha Tarot',onStatus:m=>shareStatus.textContent=m,onEvent:event=>emit(event==='share'?'reading-share':'reading-save',{cardIds:selectedCards.map(c=>c.id),fallbackFromShare:event==='save-fallback'}),messages:{preparing:t('preparing'),saved:t('saved'),shared:t('shared'),savedFallback:t('savedFallback'),cancelled:t('cancelled')}});}catch(error){console.error(error);shareStatus.textContent=t('failed');}finally{exportBusy=false;saveButton.disabled=false;shareButton.disabled=false;}
  }

  function primaryAction(){if(view==='focus')start();else if(view==='selected')revealReading();else if(view==='revealed')close();}
  function open(){
    if(!shell.hidden)return;previousFocus=document.activeElement;reset();GOLDEN_STORAGE.clearExpired();session=ENGINE.createSession('golden');
    setMainInert(true);document.body.classList.add('is-reading-open');shell.hidden=false;requestAnimationFrame(()=>shell.classList.add('is-active'));emit('reading-open',{completedFocusCount:GOLDEN_STORAGE.count()});after(30,()=>focusGrid.querySelector('button')?.focus({preventScroll:true}));
  }
  function close(){if(shell.hidden)return;lifecycle++;if(timer)clearTimeout(timer);emit('reading-close');shell.classList.remove('is-active');setTimeout(()=>{shell.hidden=true;shell.classList.remove('is-revealed');reset();setMainInert(false);document.body.classList.remove('is-reading-open');if(previousFocus instanceof HTMLElement&&document.contains(previousFocus))previousFocus.focus({preventScroll:true});previousFocus=null;},reduced()?0:220);}

  document.querySelectorAll('[data-feature="golden"]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();open();},{capture:true}));
  $('goldenBack').addEventListener('click',close);home.addEventListener('click',close);primary.addEventListener('click',primaryAction);saveButton.addEventListener('click',()=>runExport('save'));shareButton.addEventListener('click',()=>runExport('share'));
  document.addEventListener('keydown',event=>{if(!shell.hidden&&event.key==='Escape'){event.preventDefault();close();}});
  new MutationObserver(muts=>{if(muts.some(m=>m.attributeName==='lang'))updateCopy();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  reset();
  window.LGTGoldenPathUI=Object.freeze({open,close});
})();

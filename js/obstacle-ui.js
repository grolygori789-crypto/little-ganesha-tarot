(() => {
  'use strict';

  const ENGINE = window.LGTReadingEngine;
  const CONTENT = window.LGTReadingContent;
  const NARRATIVE = window.LGTObstacleNarrative;
  const READING_EXPORT = window.LGTReadingExport;
  const OBSTACLE_EXPORT = window.LGTObstacleExport;
  const DECK_RITUAL = window.LGTDeckRitual;
  const OBSTACLE_STORAGE = window.LGTObstacleStorage;
  const DAY = window.LGTReadingDay;
  if (!ENGINE || !CONTENT || !NARRATIVE || !READING_EXPORT || !OBSTACLE_EXPORT || !DECK_RITUAL || !OBSTACLE_STORAGE || !DAY) {
    throw new Error('Remove the Obstacle UI requires Reading Engine, content, narrative, Deck Ritual, Obstacle storage, Reading Day, and export modules.');
  }

  const COPY = {
    en: {
      eyebrow:'REMOVE THE OBSTACLE', title:'See the knot. Find the release.',
      intro:'Choose the part of life that feels stuck. Then draw three cards to separate the obstacle itself from what keeps feeding it, and the response that can begin to loosen the pattern.',
      focusTitle:'Where does it feel stuck?', focusHint:'Each focus can be completed once per local day. A focus you have already explored reopens the same cards and guidance until the day changes.', progress:n=>`${n} of 6 explored today`, readToday:'Read today', revisit:'Tap to revisit today’s reading',
      begin:'Begin the Reading', shuffling:'Shuffling the full deck', choose:'Choose a card',
      chooseObstacle:'Choose the first card for the obstacle itself — the part of this situation that needs to be seen clearly.',
      chooseFeed:'Choose the second card for what keeps giving the obstacle energy or keeps the same pattern in place.',
      chooseRelease:'Choose the final card for the response, boundary, perspective, or action that can begin to loosen the knot.',
      obstacle:'The Obstacle', feed:'What Feeds It', releasePos:'What Releases It', chosen:'Chosen', selected:'Your three cards are ready', reveal:'Reveal the Reading', loading:'Preparing your Remove the Obstacle reading',
      glance:'WHAT IS REALLY HAPPENING', knot:'THE KNOT', release:'THE RELEASE', actions:'FIRST MOVES', watch:'WATCH FOR', reflection:'A QUESTION TO CARRY FORWARD',
      saveShareTitle:'SAVE OR SHARE', saveShareHint:'Create a clean image of this reading to keep or share.', saveImage:'Save Image', shareImage:'Share',
      preparing:'Preparing your reading image', saved:'Your reading image has been saved.', shared:'Your reading image is ready to share.', savedFallback:'Direct sharing is not available here, so the image was saved instead.', failed:'The image could not be created right now. Please try again.', cancelled:'Sharing was cancelled.',
      done:'Back to Home', back:'Back to Home', upright:'UPRIGHT', cardAlt:'Tarot card: ',
      resetKicker:'THIS FOCUS IS COMPLETE FOR TODAY', resetLabel:'A new Remove the Obstacle reading for this focus will be available in', storageFail:'This device could not save this Focus reading, so today’s restored result may not survive a reload.',
      disclaimer:'Use this reading to examine patterns, choices, and practical release points — not as a fixed prediction. Money readings are not financial advice, and well-being readings do not diagnose illness or replace professional medical care.',
      focuses: {
        general:['General Life','A wider look at where life feels stuck or keeps repeating'],
        love:['Love & Relationships','Connection, trust, boundaries, distance, and repeating dynamics'],
        career:['Career & Work','Stalled progress, pressure, difficult dynamics, and work direction'],
        money:['Money & Resources','Security, pressure, resource habits, and practical constraints'],
        wellbeing:['Well-being & Balance','Pace, emotional load, boundaries, rest, and recovery'],
        growth:['Personal Growth','Beliefs, habits, fear, confidence, and patterns that limit change']
      }
    },
    th: {
      eyebrow:'คลายอุปสรรค', title:'เห็นปมให้ชัด แล้วค่อยคลาย',
      intro:'เลือกเรื่องในชีวิตที่กำลังรู้สึกติดขัด แล้วเปิดไพ่สามใบเพื่อแยกให้เห็นว่าอุปสรรคจริงอยู่ตรงไหน อะไรยังคอยเติมแรงให้มัน และการตอบสนองแบบไหนที่จะช่วยให้เรื่องเริ่มคลาย',
      focusTitle:'ตอนนี้เรื่องไหนรู้สึกติดขัด?', focusHint:'แต่ละหัวข้อเปิดคำอ่านใหม่ได้วันละหนึ่งครั้งตามเวลาของอุปกรณ์ หัวข้อที่ดูแล้วสามารถแตะกลับมาอ่านไพ่และคำอ่านชุดเดิมได้ตลอดทั้งวัน', progress:n=>`วันนี้เปิดแล้ว ${n} จาก 6 หัวข้อ`, readToday:'อ่านแล้ววันนี้', revisit:'แตะเพื่อดูผลเดิม',
      begin:'เริ่มเปิดไพ่', shuffling:'กำลังสับไพ่ทั้งสำรับ', choose:'เลือกไพ่',
      chooseObstacle:'เลือกใบแรกสำหรับตัวอุปสรรคเอง — จุดที่เรื่องนี้ต้องถูกมองให้ตรงและชัด',
      chooseFeed:'เลือกใบที่สองสำหรับสิ่งที่ยังคอยเติมแรงให้อุปสรรคหรือทำให้รูปแบบเดิมคงอยู่',
      chooseRelease:'เลือกใบสุดท้ายสำหรับท่าที ขอบเขต มุมมอง หรือการกระทำที่จะช่วยให้ปมเริ่มคลาย',
      obstacle:'อุปสรรค', feed:'สิ่งที่ทำให้อุปสรรคนี้ยังอยู่', releasePos:'สิ่งที่ช่วยคลายอุปสรรค', chosen:'เลือกแล้ว', selected:'ไพ่ทั้งสามพร้อมแล้ว', reveal:'เปิดคำอ่าน', loading:'กำลังเตรียมคำอ่านคลายอุปสรรค',
      glance:'ภาพรวมของสิ่งที่ติดขัด', knot:'ปมหลัก', release:'จุดคลาย', actions:'ก้าวแรกที่ทำได้', watch:'สิ่งที่ควรระวัง', reflection:'คำถามชวนทบทวนต่อ',
      saveShareTitle:'บันทึกหรือแชร์', saveShareHint:'สร้างภาพผลการอ่านแบบสะอาดตาเพื่อเก็บไว้หรือส่งต่อได้ทันที', saveImage:'บันทึกภาพ', shareImage:'แชร์',
      preparing:'กำลังเตรียมภาพผลการอ่าน', saved:'บันทึกภาพผลการอ่านแล้ว', shared:'เตรียมภาพสำหรับการแชร์แล้ว', savedFallback:'อุปกรณ์นี้แชร์ภาพตรงจากหน้านี้ไม่ได้ จึงบันทึกภาพลงเครื่องให้แทน', failed:'ยังสร้างภาพผลการอ่านไม่ได้ในตอนนี้ กรุณาลองใหม่อีกครั้ง', cancelled:'ยกเลิกการแชร์แล้ว',
      done:'กลับหน้าหลัก', back:'กลับหน้าหลัก', upright:'ไพ่ตั้งตรง', cardAlt:'ไพ่ทาโรต์: ',
      resetKicker:'หัวข้อนี้อ่านแล้วสำหรับวันนี้', resetLabel:'หัวข้อนี้จะเปิดคำอ่านคลายอุปสรรคชุดใหม่ได้ใน', storageFail:'อุปกรณ์นี้บันทึกผลของหัวข้อนี้ไม่ได้ ผลเดิมของวันนี้จึงอาจไม่กลับมาหลังเปิดแอปใหม่',
      disclaimer:'ใช้การอ่านนี้เพื่อช่วยมองรูปแบบ ทางเลือก และจุดคลายที่นำไปใช้ได้จริง ไม่ใช่คำทำนายที่ตายตัว หมวดการเงินไม่ใช่คำแนะนำทางการเงิน และหมวดสุขภาวะไม่ใช่การวินิจฉัยโรคหรือการทดแทนการดูแลจากผู้เชี่ยวชาญทางการแพทย์',
      focuses: {
        general:['ภาพรวมชีวิต','มองกว้างขึ้นว่าช่วงนี้ชีวิตส่วนไหนกำลังค้าง ติดขัด หรือวนซ้ำ'],
        love:['ความรักและความสัมพันธ์','ความไว้ใจ ขอบเขต ระยะห่าง ความชัดเจน และรูปแบบที่เกิดซ้ำ'],
        career:['การงานและอาชีพ','ความก้าวหน้าที่ชะงัก แรงกดดัน ความสัมพันธ์ในงาน และทิศทางอาชีพ'],
        money:['การเงินและทรัพยากร','ความมั่นคง แรงกดดัน พฤติกรรมทางการเงิน และข้อจำกัดที่จับต้องได้'],
        wellbeing:['สุขภาวะและสมดุลชีวิต','จังหวะชีวิต ภาระทางใจ ขอบเขต การพัก และการฟื้นแรง'],
        growth:['การเติบโตภายใน','ความเชื่อ นิสัย ความกลัว ความมั่นใจ และรูปแบบที่จำกัดการเปลี่ยนแปลง']
      }
    }
  };

  const focusOrder=['general','love','career','money','wellbeing','growth'];
  const shell=document.createElement('section');
  shell.className='reading-shell obstacle-shell'; shell.id='obstacleReadingView'; shell.hidden=true; shell.setAttribute('role','region'); shell.setAttribute('aria-labelledby','obstacleReadingTitle');
  shell.innerHTML=`
    <div class="reading-ambient" aria-hidden="true"><span class="reading-orb reading-orb--one"></span><span class="reading-orb reading-orb--two"></span></div>
    <header class="reading-header"><button class="reading-back" id="obstacleBack" type="button"><span aria-hidden="true">‹</span></button><div class="reading-header__copy"><span class="reading-eyebrow" id="obstacleEyebrow"></span><h2 id="obstacleReadingTitle"></h2></div><span class="reading-header__balance" aria-hidden="true"></span></header>
    <div class="reading-scroll" id="obstacleScroll">
      <div class="reading-intro" id="obstacleIntro"></div>
      <section class="obstacle-focus-panel" id="obstacleFocusPanel"><div class="obstacle-focus-panel__head"><h3 id="obstacleFocusTitle"></h3><p id="obstacleFocusHint"></p><p class="focus-daily-progress" id="obstacleFocusProgress"></p></div><div class="obstacle-focus-grid" id="obstacleFocusGrid"></div></section>
      <div class="obstacle-focus-current" id="obstacleFocusCurrent" hidden><span></span><strong></strong></div>
      <section class="three-selected-rail obstacle-selected-rail" id="obstacleRail" aria-label="Remove the Obstacle card positions" hidden>
        ${['obstacle','feeds','release'].map((id,index)=>`<div class="three-slot" data-slot="${id}"><span class="three-slot__label" id="obstacleSlotLabel${index}"></span><div class="three-slot__card"><img src="${CONTENT.cardBack}" alt="" decoding="async"><span>${index+1}</span></div><strong id="obstacleSlotName${index}"></strong></div>`).join('')}
      </section>
      <div class="reading-stage three-stage" id="obstacleStage" hidden><div class="reading-deck" id="obstacleDeck" aria-hidden="true"><img src="${CONTENT.cardBack}" alt="" decoding="async"><img src="${CONTENT.cardBack}" alt="" decoding="async"><img src="${CONTENT.cardBack}" alt="" decoding="async"></div><div class="three-choice" id="obstacleChoice" hidden></div></div>
      <div class="reading-status" id="obstacleStatus" role="status" aria-live="polite"></div>
      <div class="reading-actions" id="obstacleActions"><button class="reading-primary" id="obstaclePrimary" type="button" disabled></button><button class="ask-home-action" id="obstacleHome" type="button" hidden></button></div>
      <article class="reading-interpretation three-interpretation obstacle-interpretation" id="obstacleInterpretation" hidden>
        <section class="three-revealed-cards" id="obstacleRevealedCards"></section>
        <section class="three-story"><span id="obstacleGlanceLabel"></span><p id="obstacleGlance"></p></section>
        <section class="three-story three-reading-block--hero obstacle-knot"><span id="obstacleKnotLabel"></span><p id="obstacleKnot"></p></section>
        <section class="three-story obstacle-release"><span id="obstacleReleaseLabel"></span><p id="obstacleRelease"></p></section>
        <section class="three-story obstacle-actions-block"><span id="obstacleActionsLabel"></span><ol id="obstacleActionList"></ol></section>
        <section class="three-story obstacle-watch"><span id="obstacleWatchLabel"></span><p id="obstacleWatch"></p></section>
        <section class="reading-reflection three-story"><span id="obstacleReflectionLabel"></span><p id="obstacleReflection"></p></section>
        <section class="reading-share" id="obstacleSaveShare" hidden><div class="reading-share__heading"><span id="obstacleSaveShareTitle"></span><p id="obstacleSaveShareHint"></p></div><div class="reading-share__actions"><button class="reading-secondary" id="obstacleSave" type="button"></button><button class="reading-secondary reading-secondary--strong" id="obstacleShare" type="button"></button></div><p class="reading-share__status" id="obstacleShareStatus" role="status" aria-live="polite"></p></section>
        <section class="reading-reset-note" id="obstacleResetNote" hidden><span id="obstacleResetKicker"></span><p id="obstacleResetLabel"></p><strong id="obstacleResetTime"></strong></section>
        <p class="reading-disclaimer" id="obstacleDisclaimer"></p>
      </article>
      <p class="reading-storage-note" id="obstacleStorageNote" hidden></p>
    </div>`;
  document.getElementById('app')?.appendChild(shell);

  const $=id=>document.getElementById(id); const mainApp=$('mainApp'); const intro=$('obstacleIntro'), focusPanel=$('obstacleFocusPanel'), focusGrid=$('obstacleFocusGrid'), focusCurrent=$('obstacleFocusCurrent'), deck=$('obstacleDeck'), choice=$('obstacleChoice'), stage=$('obstacleStage'), status=$('obstacleStatus'), actions=$('obstacleActions'), primary=$('obstaclePrimary'), home=$('obstacleHome'), interpretation=$('obstacleInterpretation'), rail=$('obstacleRail'), revealed=$('obstacleRevealedCards'), scroll=$('obstacleScroll');
  const saveShare=$('obstacleSaveShare'), saveButton=$('obstacleSave'), shareButton=$('obstacleShare'), shareStatus=$('obstacleShareStatus');
  const resetNote=$('obstacleResetNote'), resetKicker=$('obstacleResetKicker'), resetLabel=$('obstacleResetLabel'), resetTime=$('obstacleResetTime'), storageNote=$('obstacleStorageNote');
  let session=null, candidates=[], selectedIndices=[], selectedCards=[], reading=null, focusId=null, view='focus', timer=null, previousFocus=null, exportBusy=false, lifecycle=0, deckRitual=null, restoredToday=false, stopCountdown=null;
  const reduced=()=>document.documentElement.dataset.motion==='reduced'||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang=()=>document.documentElement.lang==='th'?'th':'en'; const t=k=>COPY[lang()][k]||COPY.en[k]||k;
  function after(ms,fn){ if(timer)clearTimeout(timer); timer=setTimeout(()=>{timer=null;fn();},reduced()?Math.min(ms,80):ms); }
  function emit(type,detail={}){window.dispatchEvent(new CustomEvent('lgt:reading:interaction',{detail:{type,spreadId:'obstacle',focusId,...detail}}));}
  function setMainInert(value){if(!mainApp)return;if('inert'in mainApp)mainApp.inert=value;if(value)mainApp.setAttribute('aria-hidden','true');else mainApp.removeAttribute('aria-hidden');}

  function buildFocusGrid(){
    const read=OBSTACLE_STORAGE.getAll();
    $('obstacleFocusProgress').textContent=COPY[lang()].progress(Object.keys(read).length);
    focusGrid.replaceChildren();
    focusOrder.forEach((id,index)=>{
      const done=Boolean(read[id]);
      const button=document.createElement('button'); button.type='button'; button.className='obstacle-focus-option'; button.dataset.obstacleFocus=id; button.setAttribute('aria-pressed',String(!done&&focusId===id));
      const copy=COPY[lang()].focuses[id];
      if(done)button.classList.add('is-read-today');
      if(!done&&focusId===id)button.classList.add('is-selected');
      button.setAttribute('aria-label',done?`${copy[0]} · ${t('readToday')} · ${t('revisit')}`:copy[0]);
      button.innerHTML=`<span class="obstacle-focus-option__number" aria-hidden="true">0${index+1}</span><span class="obstacle-focus-option__copy"><strong>${copy[0]}</strong><small>${copy[1]}</small>${done?`<span class="focus-read-badge"><span class="focus-read-check" aria-hidden="true">✓</span>${t('readToday')}</span><small class="focus-read-hint">${t('revisit')}</small>`:''}</span>`;
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
    $('obstacleGlance').textContent=reading.atGlance; $('obstacleKnot').textContent=reading.knot; $('obstacleRelease').textContent=reading.release; $('obstacleWatch').textContent=reading.watchFor; $('obstacleReflection').textContent=reading.reflection;
    const list=$('obstacleActionList'); list.replaceChildren(); reading.actions.forEach(item=>{const li=document.createElement('li');li.textContent=item;list.appendChild(li);});
  }

  function renderReadingCards(){
    if(!reading||selectedCards.length!==3)return;
    revealed.replaceChildren();
    selectedCards.forEach((card,index)=>{
      const figure=document.createElement('figure'); figure.className='three-result-card obstacle-result-card';
      figure.innerHTML=`<span class="three-result-card__position">${reading.positions[index].label}</span><div class="three-result-card__art"><img src="${card.image}" alt="${t('cardAlt')}${card.title[lang()]}" decoding="async"></div><figcaption><strong>${card.title[lang()]}</strong>${lang()==='th'?`<small>${card.title.en}</small>`:''}<p>${reading.positions[index].text}</p></figcaption>`;
      revealed.appendChild(figure);
    });
  }

  function updateCopy(){
    $('obstacleEyebrow').textContent=t('eyebrow');$('obstacleReadingTitle').textContent=t('title');$('obstacleBack').setAttribute('aria-label',t('back'));$('obstacleHome').textContent=t('back');$('obstacleHome').setAttribute('aria-label',t('back'));
    $('obstacleFocusTitle').textContent=t('focusTitle');$('obstacleFocusHint').textContent=t('focusHint');$('obstacleGlanceLabel').textContent=t('glance');$('obstacleKnotLabel').textContent=t('knot');$('obstacleReleaseLabel').textContent=t('release');$('obstacleActionsLabel').textContent=t('actions');$('obstacleWatchLabel').textContent=t('watch');$('obstacleReflectionLabel').textContent=t('reflection');
    $('obstacleSaveShareTitle').textContent=t('saveShareTitle');$('obstacleSaveShareHint').textContent=t('saveShareHint');saveButton.textContent=t('saveImage');shareButton.textContent=t('shareImage');resetKicker.textContent=t('resetKicker');resetLabel.textContent=t('resetLabel');storageNote.textContent=t('storageFail');$('obstacleDisclaimer').textContent=t('disclaimer');
    [t('obstacle'),t('feed'),t('releasePos')].forEach((label,i)=>$('obstacleSlotLabel'+i).textContent=label);
    buildFocusGrid(); updateCurrentFocus(); deckRitual?.setAriaLabelBuilder((index)=>`${t('choose')} ${index+1}`);
    if(view==='focus'){intro.textContent=t('intro');primary.textContent=t('begin');primary.disabled=!focusId;status.textContent=focusId?(lang()==='th'?`เลือก ${NARRATIVE.getFocus(focusId).label.th} แล้ว`:`${NARRATIVE.getFocus(focusId).label.en} selected`):'';}
    else if(view==='shuffling'){intro.textContent='';status.textContent=t('shuffling');}
    else if(view==='choosing'){const hints=[t('chooseObstacle'),t('chooseFeed'),t('chooseRelease')];intro.textContent=hints[selectedIndices.length]||'';status.textContent=`${t('choose')} · ${selectedIndices.length+1}/3`;}
    else if(view==='selected'){intro.textContent='';status.textContent=t('selected');primary.textContent=t('reveal');}
    else if(view==='revealed'){intro.textContent='';status.textContent='';primary.textContent=t('done');}
    if(selectedCards.length===3&&focusId&&reading){reading=NARRATIVE.compose(selectedCards,focusId,lang());renderText();renderReadingCards();}
    if(!resetNote.hidden)resetTime.textContent=DAY.formatRemaining(DAY.snapshot().remainingMs,lang());
  }

  function selectFocus(id){
    if(view!=='focus'||!NARRATIVE.focuses[id])return;
    const stored=OBSTACLE_STORAGE.get(id);
    focusId=id;
    if(stored){
      session.restoreSelection(stored);selectedCards=session.getSelectedCards().map(entry=>entry.card);restoredToday=true;
      focusPanel.hidden=true;focusCurrent.hidden=false;rail.hidden=false;stage.hidden=true;intro.hidden=true;actions.hidden=false;primary.disabled=true;updateCurrentFocus();emit('focus-restore',{focusId:id});after(40,()=>revealReading({restored:true}));return;
    }
    primary.disabled=false;buildFocusGrid();updateCurrentFocus();status.textContent=lang()==='th'?`เลือก ${NARRATIVE.getFocus(id).label.th} แล้ว`:`${NARRATIVE.getFocus(id).label.en} selected`;emit('focus-select',{focusId:id});
  }

  function stopResetCountdown(){if(stopCountdown)stopCountdown();stopCountdown=null;resetNote.hidden=true;}
  function resetForNewDay(){stopResetCountdown();OBSTACLE_STORAGE.clearExpired();if(session?.state==='interpreted')session.complete();reset();shell.classList.add('is-active');session=ENGINE.createSession('obstacle');view='focus';updateCopy();emit('day-reset');}
  function startResetCountdown(){stopResetCountdown();resetNote.hidden=false;stopCountdown=DAY.subscribe((info,meta)=>{resetTime.textContent=DAY.formatRemaining(info.remainingMs,lang());if(meta.rolledOver&&!shell.hidden)resetForNewDay();});}
  function reset(){
    if(timer)clearTimeout(timer);stopResetCountdown();lifecycle++;restoredToday=false;shell.classList.remove('is-revealed');session=null;candidates=[];selectedIndices=[];selectedCards=[];reading=null;focusId=null;view='focus';
    deck.hidden=false;deck.classList.remove('is-shuffling');stage.hidden=true;intro.hidden=false;focusPanel.hidden=false;focusCurrent.hidden=true;rail.hidden=true;choice.hidden=true;deckRitual?.destroy();deckRitual=null;choice.replaceChildren();stage.classList.remove('is-compact-deck');interpretation.hidden=true;revealed.replaceChildren();actions.hidden=false;primary.disabled=true;home.hidden=true;saveShare.hidden=true;shareStatus.textContent='';storageNote.hidden=true;exportBusy=false;saveButton.disabled=false;shareButton.disabled=false;
    rail.querySelectorAll('.three-slot').forEach((slot,i)=>{slot.classList.remove('is-filled');const img=slot.querySelector('img');img.src=CONTENT.cardBack;img.alt='';slot.querySelector('.three-slot__card span').hidden=false;$('obstacleSlotName'+i).textContent='';});scroll.scrollTop=0;updateCopy();
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
    selectedIndices.push(index);const card=CONTENT.getCard(candidates[index]);const slotIndex=selectedIndices.length-1;const slot=rail.querySelectorAll('.three-slot')[slotIndex];slot.classList.add('is-filled');slot.querySelector('.three-slot__card span').hidden=true;$('obstacleSlotName'+slotIndex).textContent=t('chosen');emit('card-select',{position:slotIndex,cardId:card.id,deckIndex:index});
    if(selectedIndices.length<3){updateCopy();return;}
    selectedCards=session.selectCandidates(selectedIndices);view='selected';
    after(300,()=>{choice.hidden=true;intro.hidden=true;deckRitual?.destroy();deckRitual=null;stage.classList.remove('is-compact-deck');stage.hidden=true;actions.hidden=false;primary.disabled=false;updateCopy();requestAnimationFrame(()=>{rail.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});});after(180,()=>primary.focus({preventScroll:true}));});
  }

  async function revealReading({restored=false}={}){
    if(!session||session.state!=='selected'||selectedCards.length!==3||!focusId)return;
    const token=lifecycle;primary.disabled=true;status.textContent=t('loading');session.beginReveal();reading=NARRATIVE.compose(selectedCards,focusId,lang());renderText();renderReadingCards();
    try{await Promise.all([...revealed.querySelectorAll('img')].map(img=>img.complete?Promise.resolve():img.decode().catch(()=>{})));}catch(_){}
    if(token!==lifecycle||shell.hidden)return;
    selectedCards.forEach((card,index)=>{const slot=rail.querySelectorAll('.three-slot')[index];const img=slot.querySelector('img');img.src=card.image;img.alt=`${t('cardAlt')}${card.title[lang()]}`;$('obstacleSlotName'+index).textContent=card.title[lang()];});
    session.markRevealed();session.markInterpreted();restoredToday=Boolean(restored);if(!restored&&!OBSTACLE_STORAGE.save(session,focusId))storageNote.hidden=false;view='revealed';interpretation.hidden=false;saveShare.hidden=false;home.hidden=true;actions.hidden=false;primary.disabled=false;shell.classList.add('is-revealed');updateCopy();startResetCountdown();emit('reading-reveal',{cardIds:selectedCards.map(c=>c.id),trajectory:reading.trajectory,restored:restoredToday});after(80,()=>interpretation.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'nearest'}));
  }

  async function runExport(action){
    if(exportBusy||!reading||selectedCards.length!==3||!focusId)return;exportBusy=true;saveButton.disabled=true;shareButton.disabled=true;
    try{await READING_EXPORT.execute({action,buildBlob:()=>OBSTACLE_EXPORT.buildImageBlob({cards:selectedCards,reading,lang:lang()}),filename:OBSTACLE_EXPORT.filename(selectedCards,focusId),shareTitle:lang()==='th'?'คลายอุปสรรค':'Remove the Obstacle',shareText:lang()==='th'?'ผลการอ่านคลายอุปสรรคจาก Little Ganesha Tarot':'My Remove the Obstacle reading from Little Ganesha Tarot',onStatus:m=>shareStatus.textContent=m,onEvent:event=>emit(event==='share'?'reading-share':'reading-save',{cardIds:selectedCards.map(c=>c.id),fallbackFromShare:event==='save-fallback'}),messages:{preparing:t('preparing'),saved:t('saved'),shared:t('shared'),savedFallback:t('savedFallback'),cancelled:t('cancelled')}});}catch(error){console.error(error);shareStatus.textContent=t('failed');}finally{exportBusy=false;saveButton.disabled=false;shareButton.disabled=false;}
  }

  function primaryAction(){if(view==='focus')start();else if(view==='selected')revealReading();else if(view==='revealed')close();}
  function open(){
    if(!shell.hidden)return;previousFocus=document.activeElement;reset();OBSTACLE_STORAGE.clearExpired();session=ENGINE.createSession('obstacle');
    setMainInert(true);document.body.classList.add('is-reading-open');shell.hidden=false;requestAnimationFrame(()=>shell.classList.add('is-active'));emit('reading-open',{completedFocusCount:OBSTACLE_STORAGE.count()});after(30,()=>focusGrid.querySelector('button')?.focus({preventScroll:true}));
  }
  function close(){if(shell.hidden)return;lifecycle++;if(timer)clearTimeout(timer);emit('reading-close');shell.classList.remove('is-active');setTimeout(()=>{shell.hidden=true;shell.classList.remove('is-revealed');reset();setMainInert(false);document.body.classList.remove('is-reading-open');if(previousFocus instanceof HTMLElement&&document.contains(previousFocus))previousFocus.focus({preventScroll:true});previousFocus=null;},reduced()?0:220);}

  document.querySelectorAll('[data-feature="obstacle"]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();open();},{capture:true}));
  $('obstacleBack').addEventListener('click',close);home.addEventListener('click',close);primary.addEventListener('click',primaryAction);saveButton.addEventListener('click',()=>runExport('save'));shareButton.addEventListener('click',()=>runExport('share'));
  document.addEventListener('keydown',event=>{if(!shell.hidden&&event.key==='Escape'){event.preventDefault();close();}});
  new MutationObserver(muts=>{if(muts.some(m=>m.attributeName==='lang'))updateCopy();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  reset();
  window.LGTObstacleUI=Object.freeze({open,close});
})();

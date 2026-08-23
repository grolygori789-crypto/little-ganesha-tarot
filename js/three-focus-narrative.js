(() => {
  'use strict';

  const CONTENT = window.LGTReadingContent;
  const BASE = window.LGTThreeNarrative;
  if (!CONTENT || !BASE || !Array.isArray(CONTENT.cards) || CONTENT.cards.length !== 78) {
    throw new Error('Three-card focus narrative requires canonical tarot content and Three-card narrative.');
  }

  const VERSION = 'three-focus-narrative-v1';
  const FOCUSES = Object.freeze({
    general:Object.freeze({id:'general',label:Object.freeze({en:'General Life',th:'ภาพรวมชีวิต'}),context:Object.freeze({en:'your wider life direction',th:'ภาพรวมชีวิตของคุณ'}),lens:'opportunitiesWatchouts',secondaryLens:'guidanceToday',intro:Object.freeze({en:'Use the spread as one continuous timeline across the part of life that feels most important right now. The cards will separate what has shaped the situation, what is active in the present, and the direction that becomes more likely if the current pattern continues.',th:'ใช้ไพ่สามใบเป็นเรื่องราวต่อเนื่องของชีวิตส่วนที่สำคัญกับคุณที่สุดในตอนนี้ ไพ่จะแยกให้เห็นสิ่งที่หล่อหลอมสถานการณ์ สิ่งที่กำลังทำงานอยู่ในปัจจุบัน และทิศทางที่มีแนวโน้มมากขึ้นเมื่อรูปแบบปัจจุบันเดินต่อ'})}),
    love:Object.freeze({id:'love',label:Object.freeze({en:'Love & Relationships',th:'ความรักและความสัมพันธ์'}),context:Object.freeze({en:'love and relationships',th:'ความรักและความสัมพันธ์'}),lens:'loveRelationships',secondaryLens:'innerBalance',intro:Object.freeze({en:'Read the spread through the relationship dynamic itself: what history still shapes the connection, what is actually happening between people now, and what direction becomes more likely if the present pattern of closeness, distance, reciprocity, or boundaries continues.',th:'อ่านไพ่ผ่านพลวัตของความสัมพันธ์โดยตรง ว่าอดีตส่วนไหนยังส่งอิทธิพล สิ่งใดกำลังเกิดขึ้นระหว่างกันจริงๆ และความใกล้ชิด ระยะห่าง การตอบรับ หรือขอบเขตในปัจจุบันกำลังพาเรื่องไปทางไหน'})}),
    career:Object.freeze({id:'career',label:Object.freeze({en:'Career & Work',th:'การงานและอาชีพ'}),context:Object.freeze({en:'career and work',th:'การงานและเส้นทางอาชีพ'}),lens:'workGoals',secondaryLens:'opportunitiesWatchouts',intro:Object.freeze({en:'This spread follows the working story rather than giving three isolated career meanings. It looks at the background shaping your position, the live pressure or opportunity now, and the professional direction that becomes more plausible from here.',th:'การอ่านนี้มองเรื่องงานเป็นเส้นเรื่องเดียว ไม่แยกความหมายไพ่เป็นสามส่วนลอยๆ โดยจะดูพื้นหลังที่พาคุณมาถึงจุดนี้ แรงกดดันหรือโอกาสที่กำลังทำงานอยู่ และทิศทางอาชีพที่มีน้ำหนักมากขึ้นจากสถานการณ์ปัจจุบัน'})}),
    money:Object.freeze({id:'money',label:Object.freeze({en:'Money & Resources',th:'การเงินและทรัพยากร'}),context:Object.freeze({en:'money and practical resources',th:'การเงินและทรัพยากรที่ใช้ได้จริง'}),lens:'moneyResources',secondaryLens:'opportunitiesWatchouts',intro:Object.freeze({en:'This spread looks at the pattern behind money, security, resources, and practical choices. It is reflective guidance, not a market forecast, investment instruction, or guarantee of financial outcomes.',th:'การอ่านนี้มองรูปแบบเบื้องหลังเรื่องเงิน ความมั่นคง ทรัพยากร และการตัดสินใจที่จับต้องได้ ใช้เพื่อช่วยทบทวนสถานการณ์ ไม่ใช่การทำนายตลาด คำสั่งลงทุน หรือการรับรองผลลัพธ์ทางการเงิน'})}),
    wellbeing:Object.freeze({id:'wellbeing',label:Object.freeze({en:'Well-being & Balance',th:'สุขภาวะและสมดุลชีวิต'}),context:Object.freeze({en:'well-being and life balance',th:'สุขภาวะและสมดุลชีวิต'}),lens:'innerBalance',secondaryLens:'guidanceToday',intro:Object.freeze({en:'Read this spread around pace, emotional load, rest, boundaries, and the balance between effort and recovery. Tarot cannot diagnose illness, determine treatment, or replace qualified medical care.',th:'อ่านไพ่ชุดนี้ผ่านเรื่องจังหวะชีวิต ภาระทางใจ การพัก ขอบเขต และสมดุลระหว่างการใช้พลังกับการฟื้นแรง ไพ่ทาโรต์ไม่ใช้เพื่อวินิจฉัยโรค กำหนดการรักษา หรือทดแทนการดูแลจากผู้เชี่ยวชาญทางการแพทย์'})}),
    growth:Object.freeze({id:'growth',label:Object.freeze({en:'Personal Growth',th:'การเติบโตภายใน'}),context:Object.freeze({en:'personal growth and inner change',th:'การเติบโตและการเปลี่ยนแปลงภายใน'}),lens:'innerBalance',secondaryLens:'guidanceToday',intro:Object.freeze({en:'This spread traces an inner change across time: the pattern you inherited from the past, the part of you being challenged or developed now, and the direction your growth can take if you work consciously with the present.',th:'การอ่านนี้ติดตามการเปลี่ยนแปลงภายในเป็นเส้นต่อเนื่อง ตั้งแต่รูปแบบที่ติดมาจากอดีต ส่วนของตัวคุณที่กำลังถูกท้าทายหรือพัฒนา ไปจนถึงทิศทางการเติบโตที่เปิดขึ้นเมื่อทำงานกับปัจจุบันอย่างตั้งใจ'})})
  });

  const SUIT = Object.freeze({
    wands:Object.freeze({en:'initiative, drive, confidence, and direction',th:'แรงขับ การลงมือ ความมั่นใจ และทิศทาง'}),
    cups:Object.freeze({en:'feelings, connection, receptivity, and emotional honesty',th:'ความรู้สึก ความสัมพันธ์ การเปิดรับ และความซื่อตรงทางอารมณ์'}),
    swords:Object.freeze({en:'thought, communication, pressure, and difficult decisions',th:'ความคิด การสื่อสาร แรงกดดัน และการตัดสินใจที่ต้องใช้ความชัดเจน'}),
    pentacles:Object.freeze({en:'security, resources, routine, and practical reality',th:'ความมั่นคง ทรัพยากร กิจวัตร และความจริงที่จับต้องได้'})
  });

  function focus(id){ return FOCUSES[id] || FOCUSES.general; }
  function cardsOf(input){
    if(!Array.isArray(input)||input.length!==3) throw new Error('Three-card focus narrative requires exactly three cards.');
    const cards=input.map(x=>typeof x==='string'?CONTENT.getCard(x):x);
    if(cards.some(c=>!c||!CONTENT.getCard(c.id))||new Set(cards.map(c=>c.id)).size!==3) throw new Error('Three-card focus narrative received invalid cards.');
    return cards;
  }
  function normalize(text,lang){
    let s=String(text||'').trim();
    if(lang==='th') return s.replace(/วันนี้/g,'').replace(/\s+/g,' ').replace(/[.!]+$/,'');
    return s.replace(/\btoday\b/gi,'').replace(/\s+/g,' ').replace(/\s+([,.!?])/g,'$1');
  }
  function lens(card,f,lang,secondary=false){
    const key=secondary?f.secondaryLens:f.lens;
    return normalize(card.dailyLenses?.[key]?.[lang]||card.upright?.[lang]||'',lang);
  }
  function guidance(card,lang){ return normalize(card.dailyLenses?.guidanceToday?.[lang]||card.upright?.[lang]||'',lang); }
  function essence(card,lang){ return BASE.essenceFor?.(card,lang) || normalize(card.upright?.[lang],lang); }
  function tone(card){ return BASE.toneFor?.(card) ?? 0; }
  function trajectory(cards){ return BASE.trajectory?.(cards) || 'mixed'; }

  function pattern(cards,f,lang){
    const major=cards.filter(c=>c.arcana==='major').length;
    const courts=cards.filter(c=>['page','knight','queen','king'].includes(c.rank)).length;
    const counts=new Map(); cards.forEach(c=>{if(c.suit)counts.set(c.suit,(counts.get(c.suit)||0)+1);});
    const repeated=[...counts.entries()].sort((a,b)=>b[1]-a[1]).find(([,n])=>n>=2)?.[0];
    if(lang==='th'){
      if(major>=2) return `ไพ่เมเจอร์ปรากฏ ${major} ใบในเรื่อง${f.context.th} ทำให้ชุดนี้มีน้ำหนักมากกว่าเหตุการณ์เฉพาะหน้า สิ่งที่กำลังเปลี่ยนไม่ใช่แค่สถานการณ์ แต่รวมถึงวิธีที่คุณตัดสินใจ วางตัว หรือให้คุณค่ากับเรื่องนี้ด้วย`;
      if(repeated&&SUIT[repeated]) return `ไพ่ชุด${repeated==='wands'?'ไม้เท้า':repeated==='cups'?'ถ้วย':repeated==='swords'?'ดาบ':'เหรียญ'}ปรากฏซ้ำ ทำให้แกนของเรื่องชัดไปที่${SUIT[repeated].th} สิ่งนี้คือเส้นที่เชื่อมอดีต ปัจจุบัน และแนวโน้มเข้าด้วยกัน จึงควรแก้หรือพัฒนาที่แกนนี้ก่อน`;
      if(courts>=2) return 'ไพ่บุคคลมากกว่าหนึ่งใบทำให้เรื่องนี้เกี่ยวข้องกับบทบาทและปฏิสัมพันธ์อย่างชัดเจน ลองแยกให้ออกว่าส่วนไหนคือพฤติกรรมของคนอื่น และส่วนไหนคือบทบาทที่คุณกำลังเลือกถืออยู่เอง';
      return 'ไพ่ทั้งสามมาจากพลังต่างกัน จึงไม่มีคำตอบแบบมิติเดียว ชุดนี้ต้องอ่านพร้อมกันทั้งสิ่งที่เกิดขึ้นภายใน วิธีตัดสินใจ และข้อเท็จจริงที่คุณจัดการได้ในชีวิตจริง';
    }
    if(major>=2) return `${major} Major Arcana appear in this ${f.label.en.toLowerCase()} reading, so the shift looks larger than a passing event. What is changing includes the way you position yourself, make decisions, or define what matters in this part of life.`;
    if(repeated&&SUIT[repeated]) return `A repeated ${repeated} suit concentrates the story around ${SUIT[repeated].en}. That is the thread connecting past, present, and direction, so it deserves attention before you try to solve every other layer at once.`;
    if(courts>=2) return 'More than one court card makes roles and interpersonal dynamics especially important. Separate what belongs to another person from the role you are choosing to play, because the two are not the same problem.';
    return 'The cards come from different parts of the deck, so there is no one-dimensional answer here. The story needs inner awareness, decision-making, and practical reality to be read together.';
  }

  function pastText(cards,f,lang){
    const c=cards[0], l=lens(c,f,lang);
    if(lang==='th') return `สำหรับเรื่อง${f.context.th} ไพ่ ${c.title.th} ในตำแหน่งอดีตทำให้พื้นหลังของเรื่องชัดขึ้นว่า ${l} ประเด็นของใบนี้ยังมีผลอยู่ เพราะมันสร้างเงื่อนไขหรือความเคยชินบางอย่างที่ปัจจุบันกำลังรับช่วงต่อ`;
    return `In ${f.context.en}, ${c.title.en} sets the background of the story clearly: ${l} That still matters because it created a condition, expectation, or habit that the present is now inheriting.`;
  }
  function presentText(cards,f,lang){
    const c=cards[1], l=lens(c,f,lang);
    if(lang==='th') return `ตอนนี้น้ำหนักย้ายมาที่ไพ่ ${c.title.th}: ${l} นี่คือจุดที่ยังขยับได้มากที่สุดของชุดนี้ เพราะวิธีที่คุณตอบสนองต่อใบกลางจะเปลี่ยนความหมายของไพ่ใบสุดท้ายตามไปด้วย`;
    return `The centre of the reading now moves to ${c.title.en}: ${l} This is the most changeable part of the spread, because the way you handle the middle card changes how the final card is able to develop.`;
  }
  function nextText(cards,f,lang){
    const c=cards[2], l=lens(c,f,lang), tr=trajectory(cards);
    if(lang==='th'){
      const lead=['clearer','improving','supportive'].includes(tr)?'ทิศทางเปิดขึ้น':'ทิศทางยังมีเงื่อนไขที่ต้องจัดการ';
      return `เมื่ออ่านเป็นแนวโน้ม ไพ่ ${c.title.th} ทำให้${lead}: ${l} ใบนี้ไม่ใช่คำตัดสินอนาคต แต่เป็นภาพของสิ่งที่มีน้ำหนักมากขึ้นเมื่อรูปแบบปัจจุบันเดินต่อโดยไม่มีการเปลี่ยนเงื่อนไขสำคัญ`;
    }
    const lead=['clearer','improving','supportive'].includes(tr)?'opens the direction':'keeps conditions attached to the direction';
    return `As a direction card, ${c.title.en} ${lead}: ${l} This is not a fixed outcome. It is what gains weight if the present pattern continues without a meaningful change in conditions.`;
  }

  function story(cards,f,lang){
    const [a,b,c]=cards, tr=trajectory(cards);
    if(lang==='th'){
      const movement=['clearer','improving'].includes(tr)?'น้ำหนักของชุดค่อยๆ เปิดจากอดีตไปหาอนาคต':['harder','tightening','demanding'].includes(tr)?'น้ำหนักของชุดตึงขึ้นเมื่อเดินไปข้างหน้า':'น้ำหนักของชุดไม่ได้เดินเป็นเส้นตรง';
      return `สำหรับเรื่อง${f.context.th} ไพ่ทั้งสามเล่าเรื่องเดียวกันชัดกว่าการอ่านแยกใบ ${a.title.th} คือพื้นหลังที่ยังมีอิทธิพล ส่วน ${b.title.th} คือจุดที่กำลังตัดสินรูปของเรื่องในตอนนี้ และ ${c.title.th} คือทิศทางที่รับช่วงต่อ ${movement} ดังนั้นคำถามสำคัญไม่ใช่ “ใบสุดท้ายดีหรือร้าย” แต่คือคุณจะจัดการแกนของ ${b.title.th} อย่างไร เพื่อไม่ให้อดีตเป็นคนเขียนช่วงต่อไปแทนคุณ`;
    }
    const movement=['clearer','improving'].includes(tr)?'the spread becomes more open as it moves forward':['harder','tightening','demanding'].includes(tr)?'the spread becomes more demanding as it moves forward':'the spread does not move in a perfectly straight line';
    return `In ${f.context.en}, these cards read more clearly as one story than as three separate meanings: ${a.title.en} is the background still exerting influence, ${b.title.en} is the live point shaping the situation now, and ${c.title.en} is the direction that inherits what happens next. ${movement}. The important question is therefore not whether the last card is “good” or “bad,” but how you work with ${b.title.en} so the past does not write the next chapter for you.`;
  }
  function turning(cards,f,lang){
    const b=cards[1], c=cards[2], current=lens(b,f,lang,true), next=lens(c,f,lang);
    if(lang==='th') return `จุดหักเหอยู่ที่ ${b.title.th} มากกว่าไพ่ใบอื่น ${current} เมื่อนำไปเทียบกับ ${c.title.th} จะเห็นว่าทางต่อไม่ได้เกิดขึ้นเอง แต่ขึ้นอยู่กับว่าคุณเปลี่ยนวิธีรับมือกับปัจจุบันได้แค่ไหน ${next}`;
    return `The turning point sits with ${b.title.en} more than any other card. ${current} Set against ${c.title.en}, the direction does not happen by itself; it depends on how deliberately you change your response to the present. ${next}`;
  }
  function advice(cards,f,lang){
    const b=cards[1], c=cards[2], g1=guidance(b,lang), g2=guidance(c,lang);
    if(lang==='th') return `ให้เริ่มจากปัจจุบัน ไม่ใช่ไล่ตามไพ่ใบสุดท้าย ${g1} จากนั้นใช้ ${c.title.th} เป็นเกณฑ์เช็กทิศทาง: ${g2} ถ้าการตัดสินใจใหม่สอดคล้องกับทั้งสองใบพร้อมกัน คุณกำลังขยับจากคำทำนายไปสู่การใช้ไพ่เป็นเครื่องมือวางทางจริง`;
    return `Start with the present rather than chasing the final card. ${g1} Then use ${c.title.en} as a directional check: ${g2} When a next step is consistent with both cards, the reading becomes practical guidance rather than something you simply wait to happen.`;
  }
  function reflect(cards,f,lang){
    const q=String(cards[1].reflection?.[lang]||cards[2].reflection?.[lang]||'').trim();
    if(lang==='th') return `เมื่อนึกถึงเรื่อง${f.context.th}โดยเฉพาะ ลองตอบคำถามนี้โดยไม่อ้อม: ${q}`;
    return `Bring this specifically back to ${f.context.en} and answer one question without softening it: ${q}`;
  }

  function compose(input,focusId,lang='en'){
    const cards=cardsOf(input), f=focus(focusId), L=lang==='th'?'th':'en';
    return Object.freeze({
      version:VERSION, focusId:f.id, focusLabel:f.label[L], focusIntro:f.intro[L], trajectory:trajectory(cards),
      positions:Object.freeze([
        Object.freeze({id:'past',label:L==='th'?'อดีต':'Past',cardId:cards[0].id,text:pastText(cards,f,L)}),
        Object.freeze({id:'present',label:L==='th'?'ปัจจุบัน':'Present',cardId:cards[1].id,text:presentText(cards,f,L)}),
        Object.freeze({id:'next',label:L==='th'?'แนวโน้มต่อจากนี้':'What May Unfold Next',cardId:cards[2].id,text:nextText(cards,f,L)})
      ]),
      story:story(cards,f,L),
      turningPoint:turning(cards,f,L),
      pattern:pattern(cards,f,L),
      guidance:advice(cards,f,L),
      reflection:reflect(cards,f,L)
    });
  }

  window.LGTThreeFocusNarrative=Object.freeze({version:VERSION,focuses:FOCUSES,getFocus:focus,compose});
})();

(() => {
  'use strict';

  const CONTENT = window.LGTReadingContent;
  if (!CONTENT || !Array.isArray(CONTENT.cards) || CONTENT.cards.length !== 78) {
    throw new Error('Remove the Obstacle narrative requires canonical tarot content.');
  }

  const VERSION = 'obstacle-narrative-v2';
  const TONE = Object.freeze([
    1,2,1,2,1,1,2,2,2,0,1,0,0,-1,2,-1,-2,2,-1,2,1,2,
    2,1,2,2,-1,2,0,2,0,-1,1,1,2,2,
    2,2,2,-1,-2,1,0,-1,2,2,1,1,2,2,
    1,0,-2,0,-2,1,-1,-2,-2,-2,0,0,1,1,
    2,1,2,0,-2,1,0,1,2,2,1,1,2,2
  ]);

  const FOCUSES = Object.freeze({
    general: Object.freeze({
      id:'general', label:Object.freeze({en:'General Life',th:'ภาพรวมชีวิต'}),
      context:Object.freeze({en:'the part of life that currently feels stuck',th:'เรื่องในชีวิตที่กำลังรู้สึกติดขัด'}),
      lens:'opportunitiesWatchouts', secondaryLens:'guidanceToday',
      intro:Object.freeze({
        en:'Use this when you can feel resistance or repetition but do not yet know what the real knot is. The reading separates the obstacle itself from what keeps feeding it, then looks for the most workable point of release.',
        th:'เหมาะกับช่วงที่รู้สึกว่าบางอย่างติดอยู่หรือวนซ้ำ แต่ยังจับต้นเหตุไม่ชัด การอ่านนี้จะแยกตัวอุปสรรคออกจากสิ่งที่ทำให้มันยังอยู่ แล้วมองหาจุดคลายที่นำไปใช้ได้จริง'
      })
    }),
    love: Object.freeze({
      id:'love', label:Object.freeze({en:'Love & Relationships',th:'ความรักและความสัมพันธ์'}),
      context:Object.freeze({en:'love and relationships',th:'เรื่องความรักและความสัมพันธ์'}),
      lens:'loveRelationships', secondaryLens:'innerBalance',
      intro:Object.freeze({
        en:'This reading looks at what is making connection, trust, boundaries, or clarity difficult. It does not assume a relationship must be saved or ended; it focuses on the pattern that is keeping the situation stuck and what could loosen it.',
        th:'การอ่านนี้มองสิ่งที่ทำให้ความใกล้ชิด ความไว้ใจ ขอบเขต หรือความชัดเจนเดินต่อได้ยาก โดยไม่ตั้งต้นว่าความสัมพันธ์ต้องไปต่อหรือยุติ แต่จะดูรูปแบบที่ทำให้เรื่องค้างอยู่และสิ่งที่ช่วยคลายมันได้'
      })
    }),
    career: Object.freeze({
      id:'career', label:Object.freeze({en:'Career & Work',th:'การงานและอาชีพ'}),
      context:Object.freeze({en:'career and work',th:'เรื่องงานและเส้นทางอาชีพ'}),
      lens:'workGoals', secondaryLens:'opportunitiesWatchouts',
      intro:Object.freeze({
        en:'This reading focuses on friction in working life: stalled progress, pressure, unclear direction, difficult dynamics, or a pattern that keeps repeating. The goal is not a dramatic answer, but a clearer diagnosis of the knot and a practical release point.',
        th:'การอ่านนี้เจาะแรงติดขัดในชีวิตการทำงาน ไม่ว่าจะเป็นความก้าวหน้าที่ชะงัก แรงกดดัน ทิศทางที่ไม่ชัด หรือรูปแบบเดิมที่วนกลับมา เป้าหมายไม่ใช่คำตอบหวือหวา แต่คือการเห็นปมให้ตรงและหาจุดคลายที่ทำได้จริง'
      })
    }),
    money: Object.freeze({
      id:'money', label:Object.freeze({en:'Money & Resources',th:'การเงินและทรัพยากร'}),
      context:Object.freeze({en:'money and practical resources',th:'เรื่องการเงินและทรัพยากรที่ใช้ได้จริง'}),
      lens:'moneyResources', secondaryLens:'opportunitiesWatchouts',
      intro:Object.freeze({
        en:'This reading looks at financial pressure, security, resource habits, and practical constraints. It is reflective guidance only; it does not predict markets, guarantee returns, or replace qualified financial advice.',
        th:'การอ่านนี้มองแรงกดดันทางการเงิน ความมั่นคง พฤติกรรมการใช้ทรัพยากร และข้อจำกัดที่จับต้องได้ เป็นคำแนะนำเพื่อใช้ทบทวนเท่านั้น ไม่ใช่การทำนายตลาด รับรองผลตอบแทน หรือทดแทนคำแนะนำทางการเงินจากผู้เชี่ยวชาญ'
      })
    }),
    wellbeing: Object.freeze({
      id:'wellbeing', label:Object.freeze({en:'Well-being & Balance',th:'สุขภาวะและสมดุลชีวิต'}),
      context:Object.freeze({en:'well-being and life balance',th:'เรื่องสุขภาวะและสมดุลชีวิต'}),
      lens:'innerBalance', secondaryLens:'guidanceToday',
      intro:Object.freeze({
        en:'This reading looks at pace, emotional load, rest, boundaries, and patterns that make recovery harder. Tarot cannot diagnose illness, determine treatment, or replace professional medical care.',
        th:'การอ่านนี้มองจังหวะชีวิต ภาระทางใจ การพัก ขอบเขต และรูปแบบที่ทำให้ฟื้นแรงได้ยากขึ้น ไพ่ทาโรต์ไม่สามารถวินิจฉัยโรค กำหนดการรักษา หรือทดแทนการดูแลจากผู้เชี่ยวชาญทางการแพทย์'
      })
    }),
    growth: Object.freeze({
      id:'growth', label:Object.freeze({en:'Personal Growth',th:'การเติบโตภายใน'}),
      context:Object.freeze({en:'personal growth and inner change',th:'การเติบโตและการเปลี่ยนแปลงภายใน'}),
      lens:'innerBalance', secondaryLens:'guidanceToday',
      intro:Object.freeze({
        en:'This reading looks at an inner pattern that may be slowing change: a belief, habit, fear, expectation, or way of protecting yourself that once made sense but may now be narrowing your options.',
        th:'การอ่านนี้มองรูปแบบภายในที่อาจทำให้การเปลี่ยนแปลงช้าลง ทั้งความเชื่อ นิสัย ความกลัว ความคาดหวัง หรือวิธีปกป้องตัวเองที่เคยมีเหตุผล แต่ตอนนี้อาจกำลังทำให้ทางเลือกแคบลง'
      })
    })
  });

  const SUIT_THEMES = Object.freeze({
    wands:Object.freeze({en:'initiative, motivation, and direction',th:'แรงขับ การลงมือ และทิศทาง'}),
    cups:Object.freeze({en:'feelings, connection, and emotional honesty',th:'ความรู้สึก ความสัมพันธ์ และความซื่อตรงทางอารมณ์'}),
    swords:Object.freeze({en:'thinking, communication, and hard decisions',th:'ความคิด การสื่อสาร และการตัดสินใจที่ต้องใช้ความชัดเจน'}),
    pentacles:Object.freeze({en:'stability, resources, routine, and practical reality',th:'ความมั่นคง ทรัพยากร กิจวัตร และความจริงที่จับต้องได้'})
  });

  function safeFocus(id){ return FOCUSES[id] || FOCUSES.general; }
  function safeCards(cardsOrIds){
    if(!Array.isArray(cardsOrIds)||cardsOrIds.length!==3) throw new Error('Remove the Obstacle requires exactly three cards.');
    const cards=cardsOrIds.map(entry=>typeof entry==='string'?CONTENT.getCard(entry):entry);
    if(cards.some(card=>!card||!CONTENT.getCard(card.id))) throw new Error('Remove the Obstacle received an invalid card.');
    if(new Set(cards.map(card=>card.id)).size!==3) throw new Error('Remove the Obstacle cards must be unique.');
    return cards;
  }
  function tone(card){ return Number.isFinite(TONE[Number(card.index)])?TONE[Number(card.index)]:0; }
  function seed(cards,focusId,salt=''){
    const source=`${focusId}:${cards.map(card=>card.id).join('-')}:${salt}`;
    let h=2166136261;
    for(let i=0;i<source.length;i+=1){h^=source.charCodeAt(i);h=Math.imul(h,16777619);}
    return h>>>0;
  }
  function choose(items,value){ return items[value%items.length]; }
  function sentence(text){ const v=String(text||'').trim(); return !v?'':/[.!?…]$/.test(v)?v:`${v}.`; }
  function lens(card,focus,lang,secondary=false){ const key=secondary?focus.secondaryLens:focus.lens; const raw=String(card.dailyLenses?.[key]?.[lang]||card.upright?.[lang]||'').trim(); return lang==='th'?raw.replace(/[.!?…]+$/,''):sentence(raw); }
  function keyword(card,lang,index=0){ const list=card.keywords?.[lang]; return Array.isArray(list)&&list.length?list[index%list.length]:(card.title?.[lang]||''); }
  function guidance(card,lang){ const raw=String(card.dailyLenses?.guidanceToday?.[lang]||card.upright?.[lang]||'').trim(); return lang==='th'?raw.replace(/[.!?…]+$/,''):sentence(raw); }
  function reflection(card,lang){ return String(card.reflection?.[lang]||'').trim(); }

  function trajectory(cards){
    const [a,b,c]=cards.map(tone);
    if(c>=1&&b<=0) return 'release';
    if(c>=a+2) return 'unlock';
    if(c<=-1&&b<=-1) return 'slow-release';
    if(a>=1&&b>=1&&c>=1) return 'redirect-strength';
    if(a<=0&&b>=1) return 'overfeed';
    return 'clarify';
  }

  function pattern(cards,lang){
    const majorCount=cards.filter(card=>card.arcana==='major').length;
    const counts=new Map();cards.forEach(card=>{if(card.suit)counts.set(card.suit,(counts.get(card.suit)||0)+1);});
    const repeated=[...counts.entries()].sort((a,b)=>b[1]-a[1]).find(([,count])=>count>=2)?.[0]||null;
    if(majorCount>=2){
      return lang==='th'
        ?'ไพ่เมเจอร์มากกว่าหนึ่งใบทำให้เรื่องนี้ดูใหญ่กว่าปัญหาเฉพาะหน้า ปมอาจเกี่ยวกับวิธีที่คุณกำลังวางตัว คุณค่าที่ถืออยู่ หรือบทเรียนที่ต้องยอมรับก่อนจะคลายได้จริง'
        :'With more than one Major Arcana card, this looks larger than a small tactical snag. The knot may involve the way you are positioning yourself, the values you are protecting, or a lesson that needs to be acknowledged before the situation can genuinely loosen.';
    }
    if(repeated&&SUIT_THEMES[repeated]){
      const theme=SUIT_THEMES[repeated][lang];
      return lang==='th'
        ?`ไพ่ชุดเดียวกันปรากฏซ้ำ ทำให้เห็นว่าปมนี้กระจุกอยู่ที่เรื่อง ${theme} การคลายจึงควรเริ่มจากแกนนี้ก่อน แทนที่จะพยายามแก้ทุกอย่างพร้อมกัน`
        :`A repeated suit concentrates the reading around ${theme}. That is useful: the release is more likely to come from working on this one layer first than from trying to fix everything at once.`;
    }
    return lang==='th'
      ?'ไพ่ทั้งสามมาจากพลังต่างกัน จึงไม่ใช่ปมมิติเดียว การคลายให้ได้ผลต้องประสานทั้งวิธีคิด ความรู้สึก และสิ่งที่ทำได้จริงเข้าด้วยกัน'
      :'The three cards come from different parts of the deck, so this is not a one-dimensional knot. A useful release will need inner clarity, emotional honesty, and practical action to work together.';
  }

  function obstacleText(cards,focus,lang){
    const [a]=cards; const s=seed(cards,focus.id,'obstacle'); const k=keyword(a,lang,s%3); const base=lens(a,focus,lang);
    if(lang==='th') return choose([
      `ไพ่ ${a.title.th} อยู่ในตำแหน่งอุปสรรค จึงควรอ่านเป็น “จุดค้าง” ของเรื่องนี้มากกว่าความหมายทั่วไปของไพ่ ประเด็นสำคัญอยู่ที่ “${k}” ${base} เมื่อนำมาอยู่กับ${focus.context.th} ให้มองตรงๆ ว่าส่วนไหนของคุณภาพนี้กำลังมากเกินพอดี ผิดจังหวะ หรือทำให้คุณตอบสนองแบบเดิมซ้ำจนเรื่องเดินต่อยาก`,
      `อุปสรรคที่ ${a.title.th} ชี้ไม่จำเป็นต้องเป็นสิ่งภายนอกเพียงอย่างเดียว ประเด็นสำคัญอยู่ที่ “${k}” ${base} ไพ่ใบนี้ชวนให้แยก “ข้อจำกัดจริง” ออกจาก “วิธีที่คุณกำลังรับมือกับข้อจำกัดนั้น” เพราะสองอย่างนี้อาจกำลังทับกันจนดูเหมือนเป็นปัญหาเดียว`,
      `${a.title.th} ทำให้ตำแหน่งอุปสรรคให้น้ำหนักกับเรื่อง “${k}” ${base} สิ่งที่ควรจับตาไม่ใช่ว่าไพ่ใบนี้ดีหรือร้าย แต่คือคุณกำลังใช้พลังของมันในวิธีที่ช่วยคลี่เรื่อง หรือในวิธีที่ทำให้ตัวเลือกแคบลงกว่าเดิม`
    ],s);
    return choose([
      `${a.title.en} sits in the obstacle position, so read it as the point where the situation is catching rather than as a generic card meaning. The key theme is ${k}. ${base} In ${focus.context.en}, ask where this quality has become disproportionate, mistimed, or repetitive enough to narrow your options.`,
      `The obstacle shown by ${a.title.en} may not be purely external. Its pressure gathers around ${k}. ${base} The useful distinction is between the constraint itself and the way you are responding to that constraint, because those two things may have become fused together.`,
      `${a.title.en} places emphasis on ${k} at the point of resistance. ${base} The question is not whether the card is positive or negative, but whether you are using its quality in a way that opens the situation or keeps returning you to the same narrow response.`
    ],s);
  }

  function feedText(cards,focus,lang){
    const [a,b]=cards; const s=seed(cards,focus.id,'feed'); const k=keyword(b,lang,(s>>>2)%3); const base=lens(b,focus,lang,true);
    const same=a.suit&&b.suit&&a.suit===b.suit;
    if(lang==='th'){
      const relation=same?`ไพ่สองใบแรกอยู่ในชุดเดียวกัน ยิ่งตอกย้ำว่าตัวอุปสรรคกับสิ่งที่เลี้ยงมันเชื่อมกันแน่น และอาจเกิดจากรูปแบบเดียวกันที่ทำซ้ำในคนละจังหวะ `:'';
      return `${relation}${b.title.th} อธิบายว่าทำไมปมนี้ยังไม่คลาย สิ่งที่ทำให้ปมยังมีแรงอยู่คือ “${k}” ${base} สิ่งที่เลี้ยงอุปสรรคอาจไม่ใช่ปัญหาใหม่ แต่เป็นวิธีคิด ความคาดหวัง พฤติกรรม หรือเงื่อนไขเดิมที่ยังได้รับพื้นที่ต่อเนื่อง จนคุณไม่มีโอกาสเห็นว่าถ้าลดแรงตรงนี้ลง เรื่องจะเปลี่ยนอย่างไร`;
    }
    const relation=same?'The first two cards share a suit, which strongly suggests that the obstacle and the thing feeding it are expressions of the same underlying pattern at different moments. ':'';
    return `${relation}${b.title.en} explains why the knot keeps getting energy. The theme is ${k}. ${base} What feeds the obstacle may not be a new problem at all; it may be a familiar expectation, habit, pressure, or coping pattern that keeps receiving enough attention to reproduce the same result.`;
  }

  function releaseText(cards,focus,lang){
    const [,b,c]=cards; const s=seed(cards,focus.id,'release'); const k=keyword(c,lang,(s>>>3)%3); const base=lens(c,focus,lang);
    const contrast=tone(c)>tone(b);
    if(lang==='th'){
      const turn=contrast?'น้ำหนักของไพ่ใบนี้เปิดกว่าตำแหน่งก่อนหน้า จึงมีสัญญาณว่าจุดคลายอยู่ที่การเปลี่ยนวิธีตอบสนอง มากกว่าการพยายามชนะอุปสรรคด้วยแรงเดิม ':'ไพ่ใบนี้ไม่ได้เสนอทางลัด แต่เสนอวิธีคลายที่ค่อยๆ ทำให้ปมเสียแรง '; 
      return `${c.title.th} ในตำแหน่งสิ่งที่ช่วยคลายอุปสรรคไม่ใช่คำรับรองว่าปัญหาจะหายไปเอง แต่ชี้จุดที่คุณใช้ขยับเรื่องได้จริง จุดสำคัญคือ “${k}” ${base} ${turn}เมื่อแปลไพ่ใบนี้เป็นการกระทำ ให้มองหาสิ่งเล็กพอที่จะทำได้ต่อเนื่องและชัดพอที่จะเปลี่ยนรูปแบบเดิม`;
    }
    const turn=contrast?'Its tone is more open than the card before it, suggesting that the release comes from changing the response rather than fighting the obstacle with more of the same force. ':'This is not a shortcut; it is a way of slowly removing fuel from the knot. ';
    return `${c.title.en} in the release position is not a promise that the problem disappears on its own. It points to the lever you can actually use. The key theme is ${k}. ${base} ${turn}Translate this card into something small enough to repeat and concrete enough to change the pattern.`;
  }

  function atGlance(cards,focus,lang){
    const [a,b,c]=cards; const s=seed(cards,focus.id,'glance');
    if(lang==='th') return choose([
      `การอ่านครั้งนี้ไม่ได้ชี้ว่าคุณขาด “คำตอบใหญ่” แต่ชี้ว่าปมต้องถูกแยกออกเป็นสามชั้น: ${a.title.th} แสดงตัวอุปสรรค ${b.title.th} แสดงสิ่งที่ยังคอยเติมแรงให้มัน ส่วน ${c.title.th} แสดงจุดที่คุณเริ่มคลายวงจรได้จริง`,
      `ภาพรวมค่อนข้างชัด: สิ่งที่ติดขัดกับสิ่งที่ทำให้มันยังอยู่ไม่ใช่เรื่องเดียวกันทั้งหมด ${a.title.th} ทำให้เห็นจุดค้าง ขณะที่ ${b.title.th} บอกว่าปมยังได้รับพลังจากตรงไหน และ ${c.title.th} ชี้ว่าควรเปลี่ยนแรงไปลงที่ใดก่อน`,
      `ไพ่ทั้งสามไม่ได้บอกให้ฝืนผ่านอุปสรรค แต่ให้เข้าใจโครงของมันก่อน ${a.title.th} คือสิ่งที่ต้องมองตรงๆ, ${b.title.th} คือส่วนที่ต้องหยุดเติมพลังให้ และ ${c.title.th} คือพฤติกรรมหรือท่าทีใหม่ที่มีโอกาสทำให้เรื่องเริ่มคลาย`
    ],s);
    return choose([
      `This reading does not suggest that you are missing one dramatic answer. It separates the knot into three layers: ${a.title.en} shows the obstacle, ${b.title.en} shows what keeps giving it energy, and ${c.title.en} shows the most workable point of release.`,
      `The overall picture is fairly clear: the thing that is stuck and the thing keeping it stuck are not exactly the same. ${a.title.en} names the resistance, ${b.title.en} shows where the pattern is being reinforced, and ${c.title.en} redirects your effort toward the part you can actually change.`,
      `The three cards do not ask you to force your way through the obstacle. They ask you to understand its structure first: ${a.title.en} is what needs to be faced, ${b.title.en} is what needs less fuel, and ${c.title.en} is the response that can begin to loosen the cycle.`
    ],s);
  }

  function knotText(cards,focus,lang){
    const [a,b]=cards; const p=pattern(cards,lang); const ka=keyword(a,lang,0), kb=keyword(b,lang,1);
    if(lang==='th') return `${p} เมื่อดูสองใบแรกคู่กัน ปมหลักอยู่ตรงที่เรื่อง “${ka}” ของ ${a.title.th} ไปเชื่อมกับเรื่อง “${kb}” ของ ${b.title.th} จนการตอบสนองแบบหนึ่งคอยยืนยันอีกแบบหนึ่ง สิ่งสำคัญคืออย่าพยายามแก้ปลายเหตุทั้งหมดพร้อมกัน ให้เลือกก่อนว่าพฤติกรรม ความคาดหวัง หรือเงื่อนไขไหนคือ “เชื้อเพลิง” ที่ลดได้จริงในตอนนี้`;
    return `${p} Read the first two cards together and the knot sits where the ${ka} of ${a.title.en} meets the ${kb} of ${b.title.en}. One response appears to reinforce the other. The practical implication is to stop treating every symptom as a separate problem and identify which expectation, habit, or condition is acting as fuel right now.`;
  }

  function releaseSummary(cards,focus,lang){
    const [,b,c]=cards; const kc=keyword(c,lang,0); const t=trajectory(cards);
    if(lang==='th'){
      const opening=t==='release'||t==='unlock'?'ไพ่ใบที่สามเปิดพื้นที่มากขึ้นกว่าสองใบแรก ':t==='slow-release'?'การคลายรอบนี้ต้องอาศัยจังหวะและความสม่ำเสมอมากกว่าการเปลี่ยนฉับพลัน ':'จุดคลายไม่ได้อยู่ที่การเอาชนะแรงต้าน แต่อยู่ที่การเปลี่ยนวิธีที่คุณเข้าไปสัมพันธ์กับมัน ';
      return `${opening}${c.title.th} ทำให้ “${kc}” กลายเป็นจุดเริ่มต้นที่สำคัญ ${guidance(c,lang)} สิ่งที่ควรจำคือการคลายอุปสรรคไม่ได้แปลว่าต้องทำให้พลังของ ${b.title.th} หายไปทั้งหมด แต่ต้องหยุดให้มันเป็นแรงกำหนดทุกการตัดสินใจ`;
    }
    const opening=t==='release'||t==='unlock'?'The third card opens more room than the first two. ':t==='slow-release'?'This looks like a gradual release that depends on rhythm and consistency rather than one dramatic change. ':'The release is less about defeating resistance and more about changing the way you relate to it. ';
    return `${opening}${c.title.en} makes ${kc} the most useful starting point. ${guidance(c,lang)} The key is not to make ${b.title.en} disappear completely, but to stop letting that pattern dictate every next move.`;
  }

  function actions(cards,focus,lang){
    const [a,b,c]=cards;
    const a1=guidance(c,lang);
    const a2=lens(b,focus,lang,true);
    const a3=lens(a,focus,lang);
    if(lang==='th') return [
      `เริ่มจากจุดคลาย: ${a1}`,
      `ลดสิ่งที่คอยเติมแรงให้ปม: ${a2}`,
      `กลับมาเช็กอุปสรรคจากข้อเท็จจริง ไม่ใช่จากความคุ้นชิน: ${a3}`
    ];
    return [
      `Start with the release point: ${a1}`,
      `Reduce the fuel: ${a2}`,
      `Reality-check the obstacle instead of relying on the familiar story about it: ${a3}`
    ];
  }

  function watchFor(cards,focus,lang){
    const [,b,c]=cards; const kb=keyword(b,lang,0), kc=keyword(c,lang,1);
    if(lang==='th'){
      if(tone(b)>=1) return `ระวังการใช้จุดแข็งมากเกินพอดี โดยเฉพาะเรื่อง “${kb}” สิ่งที่เคยช่วยคุณอาจกลายเป็นแรงค้ำรูปแบบเดิมได้เมื่อใช้จนไม่มีพื้นที่ให้วิธีอื่น และอย่าเปลี่ยนคุณภาพเรื่อง “${kc}” ที่ ${c.title.th} ชี้ให้เห็น ให้กลายเป็นความพยายามทำทุกอย่างให้สมบูรณ์แบบ`;
      if(tone(b)<=-1) return `ระวังไม่ให้ความกังวลหรือแรงตึงใน ${b.title.th} ทำให้คุณถอยจากสิ่งที่ควรเผชิญทีละน้อย จุดคลายจาก ${c.title.th} ต้องการการตอบสนองที่ชัด ไม่ใช่การหลีกเลี่ยงในชื่อของการรอจังหวะ`;
      return `ระวังการ “ปรับตัวไปเรื่อยๆ” จนไม่มีอะไรถูกตัดสินใจจริง ไพ่ ${b.title.th} อาจทำให้คุณรักษาสมดุลชั่วคราวได้ แต่การคลายต้องให้พื้นที่กับ${kc}ของ ${c.title.th} มากพอที่จะเปลี่ยนรูปแบบเดิม`;
    }
    if(tone(b)>=1) return `Watch for overusing a genuine strength, especially around ${kb}. A quality that once helped can start reinforcing the old pattern when it leaves no room for another response. Do not turn the ${kc} of ${c.title.en} into another demand to do everything perfectly.`;
    if(tone(b)<=-1) return `Watch that the tension in ${b.title.en} does not become a reason to withdraw from what needs to be faced in manageable steps. The release shown by ${c.title.en} asks for a clear response, not avoidance disguised as waiting for the perfect moment.`;
    return `Watch for endless adaptation without a real decision. ${b.title.en} may help you keep things functioning in the short term, but the release needs enough room for the ${kc} of ${c.title.en} to actually change the pattern.`;
  }

  function reflectionQuestion(cards,focus,lang){
    const [,b,c]=cards; const kb=keyword(b,lang,0), kc=keyword(c,lang,0); const q=reflection(c,lang);
    if(lang==='th') return q?`ถ้าลดพื้นที่ให้เรื่อง “${kb}” ลง แล้วให้พื้นที่กับ “${kc}” มากขึ้น คำถามจากไพ่ใบสุดท้ายคือ: ${q}`:`ถ้าคุณหยุดเติมพลังให้เรื่อง “${kb}” เพียงหนึ่งอย่าง แล้วให้พื้นที่กับ “${kc}” มากขึ้นหนึ่งก้าว เรื่องนี้จะเริ่มต่างจากเดิมตรงไหน?`;
    return q?`If you gave less room to ${kb} and more room to ${kc}, the final card leaves you with this question: ${q}`:`If you stopped feeding one expression of ${kb} and gave one practical step to ${kc}, where would this situation begin to feel different?`;
  }

  function compose(cardsOrIds,focusId,lang='en'){
    const cards=safeCards(cardsOrIds); const focus=safeFocus(focusId); const safeLang=lang==='th'?'th':'en';
    const labels=safeLang==='th'
      ?['อุปสรรค','สิ่งที่ทำให้อุปสรรคนี้ยังอยู่','สิ่งที่ช่วยคลายอุปสรรค']
      :['The Obstacle','What Feeds It','What Releases It'];
    return Object.freeze({
      version:VERSION, focusId:focus.id, focusLabel:focus.label[safeLang], focusIntro:focus.intro[safeLang], trajectory:trajectory(cards),
      positions:Object.freeze([
        Object.freeze({id:'obstacle',label:labels[0],cardId:cards[0].id,text:obstacleText(cards,focus,safeLang)}),
        Object.freeze({id:'feeds-it',label:labels[1],cardId:cards[1].id,text:feedText(cards,focus,safeLang)}),
        Object.freeze({id:'releases-it',label:labels[2],cardId:cards[2].id,text:releaseText(cards,focus,safeLang)})
      ]),
      atGlance:atGlance(cards,focus,safeLang),
      knot:knotText(cards,focus,safeLang),
      release:releaseSummary(cards,focus,safeLang),
      actions:Object.freeze(actions(cards,focus,safeLang)),
      watchFor:watchFor(cards,focus,safeLang),
      reflection:reflectionQuestion(cards,focus,safeLang)
    });
  }

  window.LGTObstacleNarrative=Object.freeze({version:VERSION,focuses:FOCUSES,getFocus:safeFocus,compose});
})();

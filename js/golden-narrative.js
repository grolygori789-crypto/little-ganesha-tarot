(() => {
  'use strict';

  const CONTENT = window.LGTReadingContent;
  if (!CONTENT || !Array.isArray(CONTENT.cards) || CONTENT.cards.length !== 78) {
    throw new Error('Golden Path narrative requires canonical tarot content.');
  }

  const VERSION = 'golden-narrative-v1';
  const TONE = Object.freeze([
    1,2,1,2,1,1,2,2,2,0,1,0,0,-1,2,-1,-2,2,-1,2,1,2,
    2,1,2,2,-1,2,0,2,0,-1,1,1,2,2,
    2,2,2,-1,-2,1,0,-1,2,2,1,1,2,2,
    1,0,-2,0,-2,1,-1,-2,-2,-2,0,0,1,1,
    2,1,2,0,-2,1,0,1,2,2,1,1,2,2
  ]);

  const FOCUSES = Object.freeze({
    general: Object.freeze({
      id: 'general',
      label: Object.freeze({ en: 'General Life', th: 'ภาพรวมชีวิต' }),
      context: Object.freeze({ en: 'your wider life direction', th: 'ภาพรวมทิศทางชีวิตของคุณ' }),
      lens: 'opportunitiesWatchouts',
      secondaryLens: 'guidanceToday',
      intro: Object.freeze({
        en: 'This reading looks at the wider direction of your life rather than one isolated event. It is most useful when you know something needs attention but do not yet know exactly where to begin.',
        th: 'การอ่านนี้มองภาพรวมของชีวิตมากกว่าเหตุการณ์ใดเหตุการณ์หนึ่ง เหมาะกับช่วงที่คุณรู้ว่ามีบางอย่างควรได้รับความสนใจ แต่ยังไม่แน่ใจว่าควรเริ่มมองจากตรงไหน'
      })
    }),
    love: Object.freeze({
      id: 'love',
      label: Object.freeze({ en: 'Love & Relationships', th: 'ความรักและความสัมพันธ์' }),
      context: Object.freeze({ en: 'love and relationships', th: 'เรื่องความรักและความสัมพันธ์' }),
      lens: 'loveRelationships',
      secondaryLens: 'innerBalance',
      intro: Object.freeze({
        en: 'This reading looks at the relationship dynamic itself: what you are bringing into connection, what is making closeness or clarity harder, and what kind of response may create a healthier way forward.',
        th: 'การอ่านนี้มองที่พลวัตของความสัมพันธ์โดยตรง ทั้งสิ่งที่คุณกำลังนำเข้าไปในความสัมพันธ์ จุดที่ทำให้ความใกล้ชิดหรือความชัดเจนติดขัด และท่าทีแบบไหนที่จะช่วยให้เดินต่อได้ดีขึ้น'
      })
    }),
    career: Object.freeze({
      id: 'career',
      label: Object.freeze({ en: 'Career & Work', th: 'การงานและอาชีพ' }),
      context: Object.freeze({ en: 'career and work', th: 'เรื่องงานและเส้นทางอาชีพ' }),
      lens: 'workGoals',
      secondaryLens: 'opportunitiesWatchouts',
      intro: Object.freeze({
        en: 'This reading focuses on your working life: the position you are in now, the pressure or pattern that is limiting movement, and the direction that deserves serious consideration next.',
        th: 'การอ่านนี้เจาะที่ชีวิตการทำงานของคุณ ทั้งจุดที่ยืนอยู่ตอนนี้ แรงกดดันหรือรูปแบบที่กำลังจำกัดการขยับ และทิศทางที่ควรนำมาพิจารณาอย่างจริงจังต่อจากนี้'
      })
    }),
    money: Object.freeze({
      id: 'money',
      label: Object.freeze({ en: 'Money & Resources', th: 'การเงินและทรัพยากร' }),
      context: Object.freeze({ en: 'money and practical resources', th: 'เรื่องการเงินและทรัพยากรที่ใช้ได้จริง' }),
      lens: 'moneyResources',
      secondaryLens: 'opportunitiesWatchouts',
      intro: Object.freeze({
        en: 'This reading looks at your relationship with money, security, resources, and practical choices. It is reflective guidance, not a prediction of markets, returns, or guaranteed financial outcomes.',
        th: 'การอ่านนี้มองความสัมพันธ์ของคุณกับเงิน ความมั่นคง ทรัพยากร และการตัดสินใจที่จับต้องได้ เป็นคำแนะนำเพื่อใช้ทบทวน ไม่ใช่การรับรองผลตอบแทนหรือทำนายตลาดการเงิน'
      })
    }),
    wellbeing: Object.freeze({
      id: 'wellbeing',
      label: Object.freeze({ en: 'Well-being & Balance', th: 'สุขภาวะและสมดุลชีวิต' }),
      context: Object.freeze({ en: 'well-being and life balance', th: 'เรื่องสุขภาวะและสมดุลชีวิต' }),
      lens: 'innerBalance',
      secondaryLens: 'guidanceToday',
      intro: Object.freeze({
        en: 'This reading looks at pace, emotional load, rest, boundaries, and the balance between what you give and what restores you. Tarot cannot diagnose illness or replace qualified medical care.',
        th: 'การอ่านนี้มองเรื่องจังหวะชีวิต ภาระทางใจ การพัก ขอบเขต และสมดุลระหว่างสิ่งที่คุณทุ่มให้กับสิ่งที่ช่วยฟื้นแรง การอ่านไพ่ไม่ใช่การวินิจฉัยโรคและไม่ทดแทนการดูแลจากผู้เชี่ยวชาญทางการแพทย์'
      })
    }),
    growth: Object.freeze({
      id: 'growth',
      label: Object.freeze({ en: 'Personal Growth', th: 'การเติบโตภายใน' }),
      context: Object.freeze({ en: 'your personal growth', th: 'การเติบโตและการเปลี่ยนแปลงภายในของคุณ' }),
      lens: 'innerBalance',
      secondaryLens: 'guidanceToday',
      intro: Object.freeze({
        en: 'This reading looks at the way you are changing: what part of you is ready to develop, what old pattern is slowing that process, and what kind of practice or choice can make the change more real.',
        th: 'การอ่านนี้มองการเปลี่ยนแปลงภายในของคุณ ว่าส่วนไหนกำลังพร้อมเติบโต รูปแบบเดิมอะไรที่ยังทำให้ช้าลง และการฝึกหรือการเลือกแบบไหนจะช่วยให้การเปลี่ยนแปลงนั้นเกิดขึ้นจริงมากขึ้น'
      })
    })
  });

  const SUIT_THEMES = Object.freeze({
    wands: Object.freeze({ en: 'initiative, motivation, and direction', th: 'แรงขับ การลงมือ และทิศทาง' }),
    cups: Object.freeze({ en: 'feelings, connection, and emotional honesty', th: 'ความรู้สึก ความสัมพันธ์ และความซื่อตรงทางอารมณ์' }),
    swords: Object.freeze({ en: 'thinking, communication, and difficult decisions', th: 'ความคิด การสื่อสาร และการตัดสินใจที่ต้องใช้ความชัดเจน' }),
    pentacles: Object.freeze({ en: 'stability, resources, routine, and practical reality', th: 'ความมั่นคง ทรัพยากร กิจวัตร และความจริงที่จับต้องได้' })
  });

  function safeFocus(focusId) {
    return FOCUSES[focusId] || FOCUSES.general;
  }

  function safeCards(cardsOrIds) {
    if (!Array.isArray(cardsOrIds) || cardsOrIds.length !== 3) throw new Error('Golden Path requires exactly three cards.');
    const cards = cardsOrIds.map((entry) => typeof entry === 'string' ? CONTENT.getCard(entry) : entry);
    if (cards.some((card) => !card || !CONTENT.getCard(card.id))) throw new Error('Golden Path received an invalid card.');
    if (new Set(cards.map((card) => card.id)).size !== 3) throw new Error('Golden Path cards must be unique.');
    return cards;
  }

  function tone(card) {
    return Number.isFinite(TONE[Number(card.index)]) ? TONE[Number(card.index)] : 0;
  }

  function seed(cards, focusId, salt = '') {
    const source = `${focusId}:${cards.map((card) => card.id).join('-')}:${salt}`;
    let h = 2166136261;
    for (let i = 0; i < source.length; i += 1) {
      h ^= source.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function choose(items, value) {
    return items[value % items.length];
  }

  function sentence(text) {
    const value = String(text || '').trim();
    if (!value) return '';
    return /[.!?…]$/.test(value) ? value : `${value}.`;
  }

  function lens(card, focus, lang, secondary = false) {
    const key = secondary ? focus.secondaryLens : focus.lens;
    return sentence(card.dailyLenses?.[key]?.[lang] || card.upright?.[lang] || '');
  }

  function keyword(card, lang, index = 0) {
    const list = card.keywords?.[lang];
    return Array.isArray(list) && list.length ? list[index % list.length] : card.title?.[lang] || '';
  }

  function trajectory(cards) {
    const [a,b,c] = cards.map(tone);
    if (b <= -1 && c >= 1) return 'release';
    if (c >= a + 2) return 'lift';
    if (c <= a - 2) return 'pressure';
    if (a >= 1 && b >= 1 && c >= 1) return 'expansion';
    if (a <= 0 && b <= 0 && c <= 0) return 'rebuild';
    return 'steady';
  }

  function structuralPattern(cards, lang) {
    const majorCount = cards.filter((card) => card.arcana === 'major').length;
    const suitCounts = new Map();
    cards.forEach((card) => {
      if (card.suit) suitCounts.set(card.suit, (suitCounts.get(card.suit) || 0) + 1);
    });
    const repeatedSuit = [...suitCounts.entries()].sort((a,b) => b[1] - a[1]).find(([,count]) => count >= 2)?.[0] || null;
    if (majorCount >= 2) {
      return lang === 'th'
        ? 'ไพ่เมเจอร์ปรากฏมากกว่าหนึ่งใบ จึงควรมองเรื่องนี้เป็นจุดเปลี่ยนด้านทิศทาง คุณค่า หรือวิธีที่คุณกำลังวางตัวกับชีวิต มากกว่าจะเป็นเพียงปัญหาเล็กๆ ที่แก้ด้วยเทคนิคเฉพาะหน้า'
        : 'With more than one Major Arcana card, this looks bigger than a small tactical problem. The reading is pointing to a shift in direction, values, or the way you are positioning yourself in your life.';
    }
    if (repeatedSuit && SUIT_THEMES[repeatedSuit]) {
      const theme = SUIT_THEMES[repeatedSuit][lang];
      return lang === 'th'
        ? `ไพ่ชุดเดียวกันปรากฏซ้ำ ทำให้แกนของการอ่านชัดเป็นพิเศษที่เรื่อง${theme} การขยับต่อจึงควรเริ่มจากแกนนี้ก่อน ไม่ใช่พยายามแก้ทุกอย่างพร้อมกัน`
        : `A repeated suit concentrates the reading around ${theme}. That is useful: the path becomes clearer when you work on this one layer first instead of trying to solve everything at once.`;
    }
    return lang === 'th'
      ? 'ไพ่ทั้งสามมาจากพลังที่ต่างกันพอสมควร จึงไม่ใช่เรื่องที่แก้ได้ด้วยวิธีเดียว การเดินต่อให้ดีต้องประสานทั้งมุมมองภายใน การตัดสินใจ และสิ่งที่ทำได้จริงเข้าด้วยกัน'
      : 'The three cards draw from different parts of the deck, so this is not a one-dimensional issue. The way forward asks you to coordinate inner clarity, decision-making, and practical action rather than relying on only one of them.';
  }

  function whereText(cards, focus, lang) {
    const [card] = cards;
    const primary = lens(card, focus, lang, false);
    const upright = sentence(card.upright?.[lang]);
    const variant = seed(cards, focus.id, 'where');
    if (lang === 'th') {
      return choose([
        `${card.title.th} วางคุณไว้ตรงจุดที่ต้องมองสภาพจริงก่อนรีบหาทางออก ${primary} ${upright} ตำแหน่งนี้จึงไม่ได้บอกว่าคุณ “ควรเป็น” แบบไหน แต่กำลังชี้ฐานที่คุณใช้ตัดสินใจอยู่ในตอนนี้`,
        `เมื่อมอง${focus.context.th} ไพ่ ${card.title.th} บอกว่าจุดเริ่มต้นสำคัญอยู่ที่ท่าทีและเงื่อนไขที่มีอยู่จริงตอนนี้ ${upright} ${primary} การเห็นตรงนี้ชัดจะทำให้สองใบถัดไปอ่านได้ตรงประเด็นมากขึ้น`,
        `ใบแรกไม่ใช่คำตัดสิน แต่เป็นภาพของพื้นที่ที่คุณกำลังยืนอยู่ ${card.title.th} ทำให้เห็นว่า ${primary} ${upright} สิ่งสำคัญคือยอมรับสภาพนี้ตามจริงก่อน แล้วค่อยถามว่าตรงไหนกำลังขวางการเคลื่อนไหว`,
        `สำหรับ${focus.context.th} ${card.title.th} สะท้อนจุดตั้งต้นของเรื่องนี้ได้ค่อนข้างชัด ${primary} ${upright} ไพ่จึงชวนให้คุณใช้สิ่งที่มีอยู่จริงเป็นฐาน ไม่ใช่ตัดสินสถานการณ์จากสิ่งที่หวังหรือกลัวเพียงอย่างเดียว`
      ], variant);
    }
    return choose([
      `${card.title.en} places you at a point where seeing the present clearly matters more than rushing toward a solution. ${primary} ${upright} In this position, the card describes the ground you are actually standing on, not an ideal version of where you think you should be.`,
      `In ${focus.context.en}, ${card.title.en} describes the stance and conditions you are bringing into the situation now. ${upright} ${primary} Getting honest about this starting point makes the next two cards much more useful.`,
      `The first card is not a verdict; it is a map marker. ${card.title.en} shows the part of the situation that needs to be acknowledged before anything can move cleanly. ${primary} ${upright}`,
      `For ${focus.context.en}, ${card.title.en} gives a fairly clear picture of the starting ground. ${primary} ${upright} The practical value of this card is that it asks you to work from what is true now rather than from hope, fear, or assumption alone.`
    ], variant);
  }

  function blockText(cards, focus, lang) {
    const [first, block] = cards;
    const blockTone = tone(block);
    const primary = lens(block, focus, lang, false);
    const upright = sentence(block.upright?.[lang]);
    const firstKey = keyword(first, lang, 0);
    const blockKey = keyword(block, lang, 0);
    if (lang === 'th') {
      let framing;
      if (blockTone >= 1) {
        framing = `ไพ่ที่ดูเป็นบวกเมื่อมาอยู่ตำแหน่งอุปสรรคไม่ได้กลายเป็นไพ่ร้าย จุดที่ต้องดูคือคุณอาจกำลังใช้คุณสมบัติที่ดีของ ${block.title.th} มากเกินพอดี ตั้งมาตรฐานกับมันสูงเกินไป หรือรอให้ทุกอย่างพร้อมจนการขยับจริงช้าลง`;
      } else if (blockTone <= -1) {
        framing = `${block.title.th} ชี้แรงต้านค่อนข้างตรง จุดติดขัดไม่ได้หมายความว่าเรื่องนี้ไปต่อไม่ได้ แต่มีบางส่วนที่ต้องเผชิญและจัดการจริงๆ แทนการพยายามเดินอ้อมมัน`;
      } else {
        framing = `${block.title.th} บอกว่าอุปสรรคอาจไม่ใช่กำแพงแข็งๆ แต่เป็นความลังเล จังหวะที่ยังไม่ลงตัว หรือรูปแบบบางอย่างที่ทำให้ความชัดเจนช้ากว่าที่ควร`;
      }
      return `${framing} ${upright} ${primary} เมื่อวางต่อจาก ${first.title.th} ไพ่คู่นี้ทำให้เห็นว่าเรื่องของ “${firstKey}” จะเดินต่อได้ไม่เต็มที่จนกว่าจะจัดการประเด็น “${blockKey}” ให้ตรงขึ้น`;
    }
    let framing;
    if (blockTone >= 1) {
      framing = `A supportive card in the blocking position does not turn “bad.” The issue is usually that a useful quality of ${block.title.en} is being overextended, idealised, made conditional, or waited for so perfectly that real movement slows down.`;
    } else if (blockTone <= -1) {
      framing = `${block.title.en} names the friction more directly. It does not say the path is closed; it says there is a part of the situation that needs to be faced and worked with instead of continually worked around.`;
    } else {
      framing = `${block.title.en} suggests the obstruction may be less like a hard stop and more like hesitation, timing, ambiguity, or a pattern that keeps clarity from settling.`;
    }
    return `${framing} ${upright} ${primary} Placed after ${first.title.en}, the pair suggests that the quality of “${firstKey}” cannot move cleanly until “${blockKey}” is handled more honestly.`;
  }

  function forwardText(cards, focus, lang) {
    const [, block, next] = cards;
    const primary = lens(next, focus, lang, false);
    const secondary = lens(next, focus, lang, true);
    const blockKey = keyword(block, lang, 0);
    const nextKey = keyword(next, lang, 0);
    if (lang === 'th') {
      return `${next.title.th} ในตำแหน่งสุดท้ายไม่ใช่คำทำนายตายตัว แต่เป็นคุณภาพของการเคลื่อนไหวที่ควรให้พื้นที่มากขึ้นต่อจากนี้ ${secondary} ${primary} เมื่ออ่านต่อจาก ${block.title.th} การเปลี่ยนสำคัญคือค่อยๆ ย้ายศูนย์กลางจาก “${blockKey}” ไปสู่ “${nextKey}” ด้วยการกระทำที่จับต้องได้`;
    }
    return `${next.title.en} is direction, not destiny. It shows the quality of movement that deserves more room from here. ${secondary} ${primary} Read after ${block.title.en}, the important shift is from organising the situation around “${blockKey}” toward deliberately making space for “${nextKey}” in practical choices.`;
  }

  function atGlance(cards, focus, lang) {
    const [a,b,c] = cards;
    const k1 = keyword(a, lang, 0), k2 = keyword(b, lang, 0), k3 = keyword(c, lang, 0);
    const path = trajectory(cards);
    if (lang === 'th') {
      const lines = {
        release: `เส้นเรื่องของไพ่ชุดนี้เริ่มจาก “${k1}” เดินผ่านจุดติดขัดที่เกี่ยวกับ “${k2}” แล้วเปิดทางไปสู่ “${k3}” ชัดขึ้น เป็นแนวโน้มที่ดีขึ้นได้ แต่เงื่อนไขสำคัญคือไม่ข้ามบทเรียนของไพ่ใบกลาง`,
        lift: `ไพ่สามใบมีทิศทางยกตัวขึ้นจากจุดตั้งต้นไปยังใบสุดท้ายอย่างเห็นได้ชัด สิ่งที่เริ่มจาก “${k1}” ต้องผ่านการจัดการ “${k2}” ก่อนที่ “${k3}” จะกลายเป็นทางเลือกที่ใช้ได้จริง`,
        pressure: `ไพ่ชุดนี้ไม่ได้เสนอทางลัด ใบสุดท้ายยังต้องการความจริงจังมากกว่าจุดเริ่มต้น จึงควรมอง “${k2}” เป็นประเด็นที่ต้องแก้ทีละส่วน และใช้ “${k3}” เป็นวิธีจัดระเบียบทางเดิน ไม่ใช่เป็นคำรับประกันว่าทุกอย่างจะง่าย`,
        expansion: `ทั้งสามใบมีแรงส่งค่อนข้างมาก แต่สิ่งที่ต้องระวังคืออย่ารีบตีความว่า “ไพ่ดี” เท่ากับ “ไม่ต้องแก้อะไร” แกนสำคัญคือใช้ “${k1}” ให้ถูกทาง จัดสมดุล “${k2}” แล้วค่อยขยายไปสู่ “${k3}”`,
        rebuild: `ไพ่ชุดนี้เน้นการตั้งหลักมากกว่าการเร่งผลลัพธ์ สิ่งสำคัญคือมอง “${k1}” ตามจริง ยอมรับข้อจำกัดของ “${k2}” และใช้ “${k3}” เป็นจุดเริ่มของการสร้างรูปแบบใหม่ที่ยั่งยืนกว่า`,
        steady: `ไพ่ไม่ได้ชี้การพลิกชีวิตแบบฉับพลัน แต่แสดงเส้นทางที่ค่อยๆ ชัดขึ้นผ่านการปรับอย่างต่อเนื่อง จาก “${k1}” ไปเผชิญ “${k2}” แล้วเดินต่อด้วย “${k3}”`
      };
      return `${focus.intro.th} ${lines[path]}`;
    }
    const lines = {
      release: `The spread moves from “${k1},” through a real point of friction around “${k2},” toward “${k3}.” That is a constructive arc, but it only works if the middle card is dealt with rather than skipped.`,
      lift: `The three cards rise noticeably from the starting point toward the final card. What begins with “${k1}” still has to pass through “${k2}” before “${k3}” can become a practical direction rather than a hopeful idea.`,
      pressure: `This spread is not offering a shortcut. The final card asks for more seriousness than the starting point, so “${k2}” needs to be handled piece by piece while “${k3}” is used as a way of organising the path, not as a promise that everything becomes easy.`,
      expansion: `There is strong forward energy across all three cards, but “good cards” do not mean there is nothing to work on. The useful sequence is to handle “${k1}” well, keep “${k2}” in proportion, and only then expand into “${k3}.”`,
      rebuild: `This spread is more about rebuilding than accelerating. The work is to see “${k1}” clearly, accept the real limits around “${k2},” and let “${k3}” become the first piece of a more sustainable pattern.`,
      steady: `The cards do not show a dramatic overnight reversal. They show a path that becomes clearer through consistent adjustment: “${k1},” then an honest meeting with “${k2},” then movement organised around “${k3}.”`
    };
    return `${focus.intro.en} ${lines[path]}`;
  }

  function goldenPath(cards, focus, lang) {
    const [first, block, next] = cards;
    const firstKey = keyword(first, lang, 1);
    const blockKey = keyword(block, lang, 1);
    const nextKey = keyword(next, lang, 1);
    const structure = structuralPattern(cards, lang);
    const nextLens = lens(next, focus, lang, false);
    if (lang === 'th') {
      return `เส้นทางสีทองของไพ่ชุดนี้ไม่ใช่การวิ่งไปหา ${next.title.th} ให้เร็วที่สุด แต่คือการใช้คุณสมบัติของ ${first.title.th} โดยไม่ปล่อยให้ประเด็นที่ ${block.title.th} เปิดให้เห็นถูกกลบไว้ จุดเปลี่ยนจริงอยู่ที่การลดอำนาจของ “${blockKey}” แล้วสร้างพื้นที่ให้ “${nextKey}” มากขึ้นทีละขั้น ${structure} ในทางปฏิบัติ ${nextLens}`;
    }
    return `The Golden Path here is not to chase ${next.title.en} as quickly as possible. It is to use the strengths of ${first.title.en} without letting the issue exposed by ${block.title.en} remain unaddressed. The real turn is to reduce the amount of control “${blockKey}” has over the situation and make deliberate room for “${nextKey}.” ${structure} In practical terms, ${nextLens.charAt(0).toLowerCase()}${nextLens.slice(1)}`;
  }

  function actionItems(cards, focus, lang) {
    const [first, block, next] = cards;
    if (lang === 'th') {
      return [
        `ตั้งต้นจากความจริง: ${lens(first, focus, 'th', true)}`,
        `จัดการจุดขวาง: ${lens(block, focus, 'th', false)}`,
        `ขยับทางข้างหน้า: ${lens(next, focus, 'th', true)}`
      ];
    }
    return [
      `Start with what is true: ${lens(first, focus, 'en', true)}`,
      `Work directly on the block: ${lens(block, focus, 'en', false)}`,
      `Make the next move concrete: ${lens(next, focus, 'en', true)}`
    ];
  }

  function reflection(cards, focus, lang) {
    const [, block, next] = cards;
    const blockKey = keyword(block, lang, 0);
    const nextKey = keyword(next, lang, 0);
    if (lang === 'th') {
      return `ถ้าคุณหยุดจัดการ${focus.context.th}โดยมี “${blockKey}” เป็นศูนย์กลาง แล้วเริ่มให้พื้นที่กับ “${nextKey}” มากขึ้น การตัดสินใจข้อไหนจะเปลี่ยนก่อนเป็นอย่างแรก?`;
    }
    return `If you stopped organising ${focus.context.en} around “${blockKey}” and deliberately gave more room to “${nextKey},” which decision would change first?`;
  }

  function compose(cardsOrIds, focusId = 'general', lang = 'en') {
    const cards = safeCards(cardsOrIds);
    const focus = safeFocus(focusId);
    const safeLang = lang === 'th' ? 'th' : 'en';
    return Object.freeze({
      version: VERSION,
      focusId: focus.id,
      focusLabel: focus.label[safeLang],
      trajectory: trajectory(cards),
      positions: Object.freeze([
        Object.freeze({ id: 'where-you-stand', label: safeLang === 'th' ? 'จุดที่คุณอยู่ตอนนี้' : 'Where You Stand', cardId: cards[0].id, text: whereText(cards, focus, safeLang) }),
        Object.freeze({ id: 'what-blocks', label: safeLang === 'th' ? 'สิ่งที่ขวางเส้นทาง' : 'What Blocks the Path', cardId: cards[1].id, text: blockText(cards, focus, safeLang) }),
        Object.freeze({ id: 'way-forward', label: safeLang === 'th' ? 'ทางข้างหน้า' : 'The Way Forward', cardId: cards[2].id, text: forwardText(cards, focus, safeLang) })
      ]),
      atGlance: atGlance(cards, focus, safeLang),
      goldenPath: goldenPath(cards, focus, safeLang),
      actions: Object.freeze(actionItems(cards, focus, safeLang)),
      reflection: reflection(cards, focus, safeLang)
    });
  }

  window.LGTGoldenNarrative = Object.freeze({
    version: VERSION,
    focuses: FOCUSES,
    getFocus: safeFocus,
    compose
  });
})();

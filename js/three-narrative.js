(() => {
  'use strict';

  const CONTENT = window.LGTReadingContent;
  if (!CONTENT || !Array.isArray(CONTENT.cards) || CONTENT.cards.length !== 78) throw new Error('Three-card narrative requires canonical tarot content.');

  const VERSION = 'three-narrative-v1';
  const TONE = Object.freeze([
    1,2,1,2,1,1,2,2,2,0,1,0,0,-1,2,-1,-2,2,-1,2,1,2,
    2,1,2,2,-1,2,0,2,0,-1,1,1,2,2,
    2,2,2,-1,-2,1,0,-1,2,2,1,1,2,2,
    1,0,-2,0,-2,1,-1,-2,-2,-2,0,0,1,1,
    2,1,2,0,-2,1,0,1,2,2,1,1,2,2
  ]);

  const ESSENCE = Object.freeze({
    '00': Object.freeze({ en: "a new beginning that asked for trust before certainty", th: "การเริ่มต้นใหม่ที่ต้องอาศัยความไว้ใจก่อนความแน่นอน" }),
    '01': Object.freeze({ en: "bringing skill, focus, and available resources into deliberate action", th: "การรวบรวมทักษะ สมาธิ และสิ่งที่มีอยู่ให้กลายเป็นการลงมืออย่างจริงจัง" }),
    '02': Object.freeze({ en: "listening to what was sensed quietly before it could be explained", th: "การฟังสิ่งที่รับรู้อยู่ลึกๆ ก่อนจะรีบหาเหตุผลมาอธิบาย" }),
    '03': Object.freeze({ en: "giving steady care to what had the potential to grow", th: "การดูแลสิ่งที่มีศักยภาพให้เติบโตอย่างสม่ำเสมอ" }),
    '04': Object.freeze({ en: "creating structure, boundaries, and a clearer sense of responsibility", th: "การวางโครงสร้าง ขอบเขต และความรับผิดชอบให้ชัดขึ้น" }),
    '05': Object.freeze({ en: "leaning on trusted guidance, shared values, or an established path", th: "การอาศัยคำชี้แนะ คุณค่าร่วม หรือแนวทางที่ผ่านการยอมรับมาแล้ว" }),
    '06': Object.freeze({ en: "making a choice that needed both the heart and personal values to agree", th: "การเลือกในเรื่องที่หัวใจกับคุณค่าของตัวเองต้องไปในทิศเดียวกัน" }),
    '07': Object.freeze({ en: "taking the reins and moving with clearer direction and determination", th: "การกลับมาจับทิศทางของตัวเองแล้วเดินหน้าด้วยความมุ่งมั่น" }),
    '08': Object.freeze({ en: "meeting pressure with patience, courage, and controlled strength", th: "การรับมือแรงกดดันด้วยความอดทน ความกล้า และพลังที่ควบคุมได้" }),
    '09': Object.freeze({ en: "stepping back long enough to hear a wiser answer from within", th: "การถอยออกมาพอให้ได้ยินคำตอบที่สุขุมกว่าจากภายใน" }),
    '10': Object.freeze({ en: "a change of cycle that made timing and flexibility matter more than control", th: "การเปลี่ยนรอบของสถานการณ์ที่ทำให้จังหวะและการปรับตัวสำคัญกว่าการควบคุมทุกอย่าง" }),
    '11': Object.freeze({ en: "facing the facts and accepting that choices come with consequences", th: "การมองข้อเท็จจริงตรงๆ และยอมรับว่าทุกการเลือกมีผลตามมา" }),
    '12': Object.freeze({ en: "a pause that required a different point of view rather than more force", th: "ช่วงหยุดที่ต้องเปลี่ยนมุมมองมากกว่าพยายามฝืนให้เดินต่อ" }),
    '13': Object.freeze({ en: "letting one chapter end so a genuine change could begin", th: "การยอมให้บทหนึ่งจบลงเพื่อเปิดพื้นที่ให้การเปลี่ยนแปลงจริงๆ เริ่มขึ้น" }),
    '14': Object.freeze({ en: "finding a workable middle ground and blending different needs carefully", th: "การหาจุดพอดีและค่อยๆ ผสานความต้องการที่ต่างกันให้ลงตัว" }),
    '15': Object.freeze({ en: "recognising where desire, fear, or attachment had started to take over", th: "การเห็นชัดว่าความอยาก ความกลัว หรือความยึดติดตรงไหนเริ่มมีอำนาจมากเกินไป" }),
    '16': Object.freeze({ en: "a disruption that exposed what could no longer be held together as before", th: "ความสั่นคลอนที่เปิดให้เห็นว่าสิ่งไหนไม่สามารถประคองไว้แบบเดิมได้อีก" }),
    '17': Object.freeze({ en: "rebuilding hope through honesty, healing, and a return to what felt true", th: "การฟื้นความหวังผ่านความจริงใจ การเยียวยา และการกลับมาหาสิ่งที่เป็นตัวเอง" }),
    '18': Object.freeze({ en: "moving through uncertainty without confusing fear or imagination with fact", th: "การเดินผ่านความไม่แน่นอนโดยไม่เอาความกลัวหรือจินตนาการไปแทนข้อเท็จจริง" }),
    '19': Object.freeze({ en: "a period of greater clarity, confidence, warmth, and visible progress", th: "ช่วงที่ความชัดเจน ความมั่นใจ พลังใจ และความก้าวหน้าเริ่มมองเห็นได้มากขึ้น" }),
    '20': Object.freeze({ en: "reviewing the past honestly enough to answer a deeper call for change", th: "การทบทวนสิ่งที่ผ่านมาอย่างจริงจังจนเห็นว่าตัวเองถูกเรียกให้เปลี่ยนอะไร" }),
    '21': Object.freeze({ en: "bringing a long cycle to completion and seeing how the pieces finally fit together", th: "การปิดวงจรยาวๆ ลงและเริ่มเห็นว่าสิ่งต่างๆ เชื่อมเข้าหากันอย่างไร" }),
    '22': Object.freeze({ en: "a fresh spark that wanted to be tested through real action", th: "ประกายใหม่ที่ต้องการการลงมือจริงเพื่อดูว่าจะไปได้ไกลแค่ไหน" }),
    '23': Object.freeze({ en: "looking beyond the familiar and deciding which direction was worth committing to", th: "การมองออกไปไกลกว่าสิ่งคุ้นเคยแล้วเลือกว่าทิศทางไหนคุ้มกับการทุ่มเท" }),
    '24': Object.freeze({ en: "expansion that came from thinking ahead and allowing earlier effort to travel further", th: "การขยายผลจากการมองไกลและปล่อยให้ความพยายามก่อนหน้าเดินทางต่อ" }),
    '25': Object.freeze({ en: "a stable point worth recognising, sharing, or celebrating with others", th: "จุดที่มั่นคงพอให้รับรู้ แบ่งปัน หรือฉลองร่วมกับคนอื่นได้" }),
    '26': Object.freeze({ en: "friction that tested priorities and revealed where energy was being scattered", th: "ความขัดแย้งที่ทดสอบลำดับความสำคัญและเปิดให้เห็นว่าพลังถูกกระจายไปตรงไหน" }),
    '27': Object.freeze({ en: "progress becoming visible enough to restore confidence and recognition", th: "ความก้าวหน้าที่เริ่มเห็นชัดจนเรียกความมั่นใจและการยอมรับกลับมา" }),
    '28': Object.freeze({ en: "holding a position under pressure without giving away what genuinely mattered", th: "การยืนหยัดใต้แรงกดดันโดยไม่ยอมเสียสิ่งที่สำคัญจริงๆ" }),
    '29': Object.freeze({ en: "events gathering speed and requiring clear, timely communication", th: "สถานการณ์ที่กำลังเร็วขึ้นและต้องการการสื่อสารที่ชัดในจังหวะที่เหมาะ" }),
    '30': Object.freeze({ en: "staying alert after a difficult stretch while deciding what was still worth protecting", th: "การประคองตัวอย่างระวังหลังผ่านช่วงหนัก พร้อมเลือกว่าสิ่งไหนยังควรรักษาไว้" }),
    '31': Object.freeze({ en: "carrying too much responsibility and needing a more sustainable way to share the load", th: "การรับภาระมากเกินไปจนต้องหาวิธีแบ่งเบาให้เดินต่อได้อย่างยั่งยืน" }),
    '32': Object.freeze({ en: "curiosity returning and opening the door to a new direction or experiment", th: "ความอยากรู้อยากลองที่กลับมาและเปิดทางให้ทิศทางหรือการทดลองใหม่ๆ" }),
    '33': Object.freeze({ en: "strong momentum that wanted action but also needed enough direction to avoid burning out", th: "แรงลุยที่พร้อมพาไปข้างหน้า แต่ยังต้องมีทิศทางพอไม่ให้พลังหมดกลางทาง" }),
    '34': Object.freeze({ en: "confidence, warmth, and personal presence making it easier to lead or be seen", th: "ความมั่นใจ ความอบอุ่น และพลังส่วนตัวที่ช่วยให้กล้านำและถูกมองเห็นมากขึ้น" }),
    '35': Object.freeze({ en: "turning vision into leadership and making the first decisive move", th: "การเปลี่ยนวิสัยทัศน์ให้กลายเป็นภาวะผู้นำและการขยับครั้งสำคัญ" }),
    '36': Object.freeze({ en: "an emotional opening that made room for care, creativity, or a sincere new feeling", th: "การเปิดใจที่ทำให้ความใส่ใจ ความสร้างสรรค์ หรือความรู้สึกใหม่ที่จริงใจเข้ามาได้" }),
    '37': Object.freeze({ en: "a connection becoming meaningful through mutual interest and equal participation", th: "ความสัมพันธ์ที่มีความหมายขึ้นเพราะต่างฝ่ายต่างตอบรับและมีส่วนร่วมพอๆ กัน" }),
    '38': Object.freeze({ en: "support, friendship, and shared joy making the situation feel less solitary", th: "แรงสนับสนุน มิตรภาพ และความสุขร่วมกันที่ทำให้เรื่องนี้ไม่ต้องเผชิญลำพัง" }),
    '39': Object.freeze({ en: "emotional distance creating a need to notice what had been overlooked", th: "ระยะห่างทางความรู้สึกที่ทำให้ต้องกลับมาดูว่าอะไรถูกมองข้ามไป" }),
    '40': Object.freeze({ en: "grief or disappointment being acknowledged without losing sight of what still remained", th: "การยอมรับความเสียใจหรือความผิดหวังโดยไม่ลืมว่ายังมีบางอย่างเหลืออยู่" }),
    '41': Object.freeze({ en: "the past returning through memory, familiarity, kindness, or an old connection", th: "อดีตที่ย้อนกลับมาผ่านความทรงจำ ความคุ้นเคย ความอ่อนโยน หรือสายสัมพันธ์เดิม" }),
    '42': Object.freeze({ en: "many possibilities competing for attention and making discernment more important than fantasy", th: "ทางเลือกหลายทางที่แย่งความสนใจจนต้องใช้การพิจารณามากกว่าปล่อยให้ภาพฝันนำ" }),
    '43': Object.freeze({ en: "walking away from what no longer felt emotionally true, even without a perfect destination", th: "การเดินออกจากสิ่งที่ไม่ตรงกับความรู้สึกอีกต่อไป แม้ปลายทางใหม่ยังไม่ชัดทั้งหมด" }),
    '44': Object.freeze({ en: "a sense of satisfaction growing from recognising what was already working", th: "ความพอใจที่เกิดจากการมองเห็นว่าสิ่งไหนกำลังไปได้ดีอยู่แล้ว" }),
    '45': Object.freeze({ en: "emotional harmony becoming stronger through trust, belonging, and shared support", th: "ความกลมกลืนทางใจที่แข็งแรงขึ้นจากความไว้ใจ ความเป็นส่วนหนึ่ง และการเกื้อหนุนกัน" }),
    '46': Object.freeze({ en: "a sensitive new signal, feeling, or invitation asking to be taken seriously without overreading it", th: "สัญญาณ ความรู้สึก หรือสิ่งใหม่ที่ละเอียดอ่อนซึ่งควรรับฟังโดยไม่ตีความเกินจริง" }),
    '47': Object.freeze({ en: "following the heart sincerely while checking that ideals still matched reality", th: "การเดินตามหัวใจอย่างจริงใจ พร้อมเช็กว่าอุดมคติยังสอดคล้องกับความจริง" }),
    '48': Object.freeze({ en: "deep empathy and intuition working best when emotional boundaries stayed intact", th: "ความเข้าอกเข้าใจและสัญชาตญาณที่ทำงานได้ดีที่สุดเมื่อขอบเขตทางอารมณ์ยังชัด" }),
    '49': Object.freeze({ en: "handling strong feelings with maturity, compassion, and steadiness", th: "การรับมือความรู้สึกเข้มข้นด้วยวุฒิภาวะ ความเมตตา และความสุขุม" }),
    '50': Object.freeze({ en: "a truth becoming clear enough to cut through confusion and support a cleaner decision", th: "ความจริงที่ชัดพอจะตัดผ่านความสับสนและช่วยให้ตัดสินใจได้ตรงขึ้น" }),
    '51': Object.freeze({ en: "a decision being delayed because two sides still felt difficult to reconcile", th: "การตัดสินใจที่ยังชะลอเพราะสองด้านของเรื่องยังหาจุดลงตัวได้ยาก" }),
    '52': Object.freeze({ en: "a painful truth being faced so healing could become honest rather than cosmetic", th: "การเผชิญความจริงที่เจ็บเพื่อให้การเยียวยาเกิดขึ้นจริง ไม่ใช่แค่กลบไว้ชั่วคราว" }),
    '53': Object.freeze({ en: "rest and distance creating the mental space needed for recovery and perspective", th: "การพักและเว้นระยะเพื่อเปิดพื้นที่ให้ใจฟื้นและมองเรื่องนี้ได้ชัดขึ้น" }),
    '54': Object.freeze({ en: "conflict revealing the cost of winning at the expense of trust or peace", th: "ความขัดแย้งที่ทำให้เห็นต้นทุนของการเอาชนะเมื่อแลกด้วยความไว้ใจหรือความสงบ" }),
    '55': Object.freeze({ en: "moving away from strain toward calmer ground, even if the transition was not finished yet", th: "การค่อยๆ ออกจากความตึงไปหาพื้นที่ที่สงบกว่า แม้การเปลี่ยนผ่านยังไม่จบดี" }),
    '56': Object.freeze({ en: "using strategy and discretion while keeping personal integrity intact", th: "การใช้กลยุทธ์และความรอบคอบโดยไม่ทิ้งความซื่อตรงของตัวเอง" }),
    '57': Object.freeze({ en: "feeling restricted while beginning to notice that more choices existed than first assumed", th: "ความรู้สึกติดข้อจำกัด พร้อมกับเริ่มเห็นว่าจริงๆ แล้วยังมีทางเลือกมากกว่าที่คิด" }),
    '58': Object.freeze({ en: "anxiety and repeated thinking making the problem feel larger than the available evidence", th: "ความกังวลและความคิดวนที่ทำให้ปัญหาดูใหญ่กว่าหลักฐานที่มีอยู่จริง" }),
    '59': Object.freeze({ en: "accepting that something had reached its limit so recovery could finally begin", th: "การยอมรับว่าสิ่งหนึ่งมาถึงขีดสุดแล้ว เพื่อให้การฟื้นตัวเริ่มขึ้นได้จริง" }),
    '60': Object.freeze({ en: "asking sharper questions and observing carefully before drawing a conclusion", th: "การตั้งคำถามให้คมขึ้นและสังเกตให้พอก่อนสรุปเรื่องนี้" }),
    '61': Object.freeze({ en: "moving decisively once the direction became clear, while watching the cost of excessive speed", th: "การเดินหน้าอย่างเด็ดขาดเมื่อทิศทางชัด พร้อมระวังต้นทุนของความเร็วที่มากเกินไป" }),
    '62': Object.freeze({ en: "seeing the situation clearly enough to speak honestly and keep necessary boundaries", th: "การมองสถานการณ์ชัดพอจะพูดตรงและรักษาขอบเขตที่จำเป็น" }),
    '63': Object.freeze({ en: "using reason, principle, and sound judgment rather than reacting to noise around the issue", th: "การใช้เหตุผล หลักการ และการตัดสินใจที่มีน้ำหนักแทนการไหลตามเสียงรอบข้าง" }),
    '64': Object.freeze({ en: "a practical opportunity that could become something solid through careful follow-through", th: "โอกาสที่จับต้องได้ซึ่งมีสิทธิ์เติบโตเป็นความมั่นคงเมื่อดูแลต่ออย่างจริงจัง" }),
    '65': Object.freeze({ en: "balancing several priorities and adapting without losing sight of what mattered most", th: "การประคองหลายเรื่องพร้อมกันและปรับตัวโดยไม่หลงจากสิ่งที่สำคัญที่สุด" }),
    '66': Object.freeze({ en: "progress depending on skill, cooperation, and a willingness to improve the work itself", th: "ความก้าวหน้าที่พึ่งทั้งฝีมือ การร่วมมือ และความตั้งใจยกระดับคุณภาพของสิ่งที่ทำ" }),
    '67': Object.freeze({ en: "holding tightly to security and needing to tell healthy protection from fear-based control", th: "การยึดความมั่นคงไว้แน่นจนต้องแยกให้ออกว่าอะไรคือการป้องกันที่ดี และอะไรคือความกลัวที่อยากควบคุม" }),
    '68': Object.freeze({ en: "a difficult stretch in which support, resources, or confidence had felt too thin", th: "ช่วงที่ค่อนข้างลำบากและรู้สึกว่าแรงสนับสนุน ทรัพยากร หรือความมั่นใจมีไม่พอ" }),
    '69': Object.freeze({ en: "restoring balance through fair exchange, generosity, and knowing when to give or receive", th: "การคืนสมดุลผ่านการให้และรับที่เป็นธรรม พร้อมรู้จังหวะว่าเมื่อไรควรช่วยและเมื่อไรควรรับความช่วยเหลือ" }),
    '70': Object.freeze({ en: "waiting long enough to judge whether the effort was producing the kind of growth worth continuing", th: "การให้เวลามากพอเพื่อประเมินว่าความพยายามกำลังสร้างการเติบโตที่คุ้มจะเดินต่อหรือไม่" }),
    '71': Object.freeze({ en: "steady practice turning repetition into real skill and visible quality", th: "การฝึกอย่างสม่ำเสมอจนความซ้ำกลายเป็นความชำนาญและคุณภาพที่เห็นได้" }),
    '72': Object.freeze({ en: "greater independence and comfort growing from competence, boundaries, and self-respect", th: "ความเป็นอิสระและความมั่นคงที่เพิ่มขึ้นจากความสามารถ ขอบเขต และการเห็นคุณค่าตัวเอง" }),
    '73': Object.freeze({ en: "building security with a longer horizon that included family, continuity, or legacy", th: "การสร้างความมั่นคงในระยะยาวโดยมองถึงครอบครัว ความต่อเนื่อง หรือสิ่งที่จะส่งต่อ" }),
    '74': Object.freeze({ en: "a practical chance to learn, build, or begin something that could grow with attention", th: "โอกาสที่เป็นรูปธรรมในการเรียนรู้ สร้าง หรือเริ่มสิ่งที่โตต่อได้เมื่อให้ความใส่ใจ" }),
    '75': Object.freeze({ en: "reliable progress coming from consistency, patience, and doing the necessary work well", th: "ความก้าวหน้าที่พึ่งความสม่ำเสมอ ความอดทน และการทำสิ่งจำเป็นให้ดี" }),
    '76': Object.freeze({ en: "creating stability through practical care, good stewardship, and attention to everyday needs", th: "การสร้างความมั่นคงผ่านการดูแลที่จับต้องได้ การจัดการที่ดี และความใส่ใจต่อชีวิตประจำวัน" }),
    '77': Object.freeze({ en: "turning resources and experience into durable prosperity through responsible leadership", th: "การเปลี่ยนทรัพยากรและประสบการณ์ให้เป็นความมั่นคงที่ยืนยาวผ่านการบริหารอย่างรับผิดชอบ" })
  });

  const SUIT_PATTERN = Object.freeze({
    wands: Object.freeze({
      en: 'Wands repeat across the spread, so drive, action, ambition, and the way you use your energy are central to the story.',
      th: 'ไพ่ไม้เท้าปรากฏซ้ำ ทำให้เรื่องของแรงขับ การลงมือ ความทะเยอทะยาน และการใช้พลังของตัวเองเด่นเป็นพิเศษ'
    }),
    cups: Object.freeze({
      en: 'Cups repeat across the spread, so feelings, relationships, belonging, and emotional honesty carry extra weight here.',
      th: 'ไพ่ถ้วยปรากฏซ้ำ จึงมีน้ำหนักมากเป็นพิเศษในเรื่องความรู้สึก ความสัมพันธ์ ความผูกพัน และความซื่อตรงต่อใจตัวเอง'
    }),
    swords: Object.freeze({
      en: 'Swords repeat across the spread, putting extra emphasis on thoughts, communication, decisions, and the stories the mind is telling.',
      th: 'ไพ่ดาบปรากฏซ้ำ ทำให้ความคิด การสื่อสาร การตัดสินใจ และเรื่องที่ใจคิดวนมีบทบาทสำคัญกว่าปกติ'
    }),
    pentacles: Object.freeze({
      en: 'Pentacles repeat across the spread, grounding this reading in practical reality: work, money, resources, health of routines, and long-term stability.',
      th: 'ไพ่เหรียญปรากฏซ้ำ ทำให้การอ่านครั้งนี้ลงมาที่โลกจริงมากขึ้น ทั้งงาน เงิน ทรัพยากร วิถีชีวิต และความมั่นคงระยะยาว'
    })
  });

  function toneFor(card) { return TONE[card.index] ?? 0; }
  function essenceFor(card, lang) {
    const key = lang === 'th' ? 'th' : 'en';
    return ESSENCE[card.id]?.[key] || card.keywords[key].join(key === 'th' ? ' การ' : ', ');
  }
  function safeCards(cards) {
    if (!Array.isArray(cards) || cards.length !== 3) throw new Error('Three-card narrative requires exactly three cards.');
    const resolved = cards.map((item) => typeof item === 'string' ? CONTENT.getCard(item) : item);
    if (resolved.some((card) => !card)) throw new Error('Unknown tarot card in three-card narrative.');
    if (new Set(resolved.map((card) => card.id)).size !== 3) throw new Error('Three-card narrative requires three unique cards.');
    return resolved;
  }

  function trajectory(cards) {
    const [past, present, next] = cards.map(toneFor);
    const delta = next - past;
    if (delta >= 2) return 'clearer';
    if (delta === 1) return 'improving';
    if (delta <= -2) return 'harder';
    if (delta === -1) return 'tightening';
    if (past >= 1 && present >= 1 && next >= 1) return 'supportive';
    if (past <= -1 && present <= -1 && next <= -1) return 'demanding';
    return 'mixed';
  }

  function seedFor(cards) { return cards.reduce((sum, card, index) => sum + ((card.index + 3) * (index + 5)), 0); }

  function positionLines(cards, lang) {
    const [past, present, next] = cards;
    if (lang === 'th') return [
      `สิ่งที่อยู่เบื้องหลังเรื่องนี้คือ${essenceFor(past, 'th')}`,
      `ตอนนี้น้ำหนักของเรื่องขยับมาที่${essenceFor(present, 'th')}`,
      `ถ้าจังหวะปัจจุบันเดินต่อ แนวโน้มข้างหน้าจะพาไปสู่${essenceFor(next, 'th')}`
    ];
    return [
      `What sits behind this reading is ${essenceFor(past, 'en')}.`,
      `Right now, the emphasis shifts to ${essenceFor(present, 'en')}.`,
      `If the current pattern continues, the next phase leans toward ${essenceFor(next, 'en')}.`
    ];
  }

  function storyFor(cards, lang) {
    const [past, present, next] = cards;
    const p = past.title[lang], m = present.title[lang], n = next.title[lang];
    const pe = essenceFor(past, lang), me = essenceFor(present, lang), ne = essenceFor(next, lang);
    const flow = trajectory(cards);
    const variant = seedFor(cards) % 3;

    if (lang === 'th') {
      const openings = [
        `ไพ่${p}วางฉากหลังของเรื่องไว้ที่${pe}`,
        `ภาพแรกจากไพ่${p}ชี้ว่าก่อนจะมาถึงตรงนี้ มีเรื่องของ${pe}อยู่เบื้องหลัง`,
        `จุดตั้งต้นของไพ่ชุดนี้มาจากไพ่${p} ซึ่งสะท้อน${pe}`
      ];
      const middles = [
        `ไพ่${m}เปลี่ยนแกนของเรื่องมาอยู่ที่${me} ตรงนี้คือจุดที่เรื่องกำลังเปลี่ยนจริงๆ เพราะสิ่งที่เกิดขึ้นตอนนี้จะเชื่อมอดีตกับแนวโน้มข้างหน้า`,
        `พอมาถึงไพ่${m} เรื่องไม่ได้อยู่กับอดีตแบบเดิมแล้ว ตอนนี้แกนหลักคือ${me} และตรงนี้เองจะมีผลว่าพลังของไพ่ใบสุดท้ายคลี่ออกมาได้แค่ไหน`,
        `ไพ่${m}อยู่ตรงกลางและทำหน้าที่เหมือนสะพาน ตอนนี้โจทย์สำคัญคือ${me} เพราะนี่คือส่วนของเรื่องที่ยังขยับและเปลี่ยนทิศทางได้มากที่สุด`
      ];
      const middle = middles[variant];
      const endings = {
        clearer: `ไพ่${n}พาแนวโน้มต่อไปสู่${ne} ภาพรวมจึงคลี่คลายและเปิดกว่าจุดเริ่มต้นอย่างชัดเจน แต่ไพ่ใบสุดท้ายยังเป็นทิศทางที่มีโอกาสเกิดขึ้น ไม่ใช่ผลลัพธ์ที่ถูกกำหนดตายตัว`,
        improving: `ไพ่${n}พาเรื่องไปสู่${ne} จังหวะโดยรวมดูดีขึ้นกว่าตอนเริ่ม แม้ยังต้องอาศัยสิ่งที่ไพ่ใบกลางกำลังขอจากคุณอยู่`,
        harder: `ไพ่${n}พาแนวโน้มไปสู่${ne} ภาพจึงตึงขึ้นกว่าจุดเริ่มต้น ไม่ได้แปลว่าเรื่องนี้จบไม่ดี แต่บอกว่าการมองข้ามสัญญาณในปัจจุบันอาจทำให้ช่วงต่อไปจัดการยากขึ้น`,
        tightening: `ไพ่${n}พาเรื่องต่อไปสู่${ne} น้ำหนักข้างหน้าจึงต้องใช้ความระมัดระวังมากขึ้น โดยเฉพาะถ้าสิ่งที่ไพ่ใบกลางกำลังสะท้อนยังไม่ได้รับการจัดการ`,
        supportive: `ไพ่${n}สานต่อไปสู่${ne} ทั้งสามใบจึงให้ภาพที่ค่อนข้างสนับสนุน แต่ความต่อเนื่องของผลลัพธ์ยังขึ้นอยู่กับการรักษาคุณภาพที่กำลังทำงานอยู่ในปัจจุบัน`,
        demanding: `ไพ่${n}พาเรื่องไปสู่${ne} ทั้งชุดจึงไม่ได้บอกให้เร่ง แต่ชวนให้จัดการแรงกดดันทีละชั้นและใช้ข้อมูลจริงมากกว่าความกลัว`,
        mixed: `ไพ่${n}พาเรื่องต่อไปสู่${ne} ไพ่ทั้งสามไม่ได้ไปในทิศเดียวกันเสียทีเดียว จึงควรอ่านเป็นช่วงเปลี่ยนผ่านที่ยังมีทั้งโอกาสและเงื่อนไขให้จัดการ`
      };
      return `${openings[variant]} ${middle} ${endings[flow]}`;
    }

    const openings = [
      `${p} sets the background of this reading around ${pe}.`,
      `The story opens with ${p}, pointing back to ${pe}.`,
      `At the root of this spread, ${p} speaks to ${pe}.`
    ];
    const middles = [
      `${m} shifts the centre of the reading to ${me}. This is where the story is actually changing, because what happens now connects the past with the direction ahead.`,
      `With ${m} in the middle, the reading is no longer simply repeating the past. The live issue now is ${me}, and that is what shapes how the final card can unfold.`,
      `${m} acts as the bridge in this spread. Right now, the key is ${me}; this is the part of the story that still has the most room to move.`
    ];
    const middle = middles[variant];
    const endings = {
      clearer: `${n} then carries the direction toward ${ne}. The overall movement is clearly more open and constructive than where it began, while the final card remains a direction, not a predetermined result.`,
      improving: `${n} carries the story toward ${ne}. The direction is improving, although it still depends on working with what the middle card is asking of you now.`,
      harder: `${n} carries the next phase toward ${ne}. The pressure is increasing rather than easing; that does not make the outcome doomed, but it does make the present warning signs more important to address.`,
      tightening: `${n} moves the reading toward ${ne}. The next phase asks for more care, especially if the issue shown by the middle card is left unattended.`,
      supportive: `${n} continues the pattern toward ${ne}. All three cards are broadly supportive, but the strength of the outcome still depends on keeping the present pattern healthy and grounded.`,
      demanding: `${n} continues toward ${ne}. This spread is not asking you to push harder; it is asking you to deal with the pressure in layers and rely on what can actually be known and managed.`,
      mixed: `${n} takes the story toward ${ne}. The three cards do not move in one clean direction, so this is best read as a transition with both opportunity and conditions still in play.`
    };
    return `${openings[variant]} ${middle} ${endings[flow]}`;
  }

  function patternFor(cards, lang) {
    const majorCount = cards.filter((card) => card.arcana === 'major').length;
    const courtCount = cards.filter((card) => ['page','knight','queen','king'].includes(card.rank)).length;
    const suits = cards.map((card) => card.suit).filter(Boolean);
    const suitCounts = suits.reduce((map, suit) => (map[suit] = (map[suit] || 0) + 1, map), {});
    const dominantSuit = Object.keys(suitCounts).find((suit) => suitCounts[suit] >= 2);
    if (majorCount >= 2) return lang === 'th'
      ? `ไพ่เมเจอร์อาร์คานาปรากฏ ${majorCount} ใบ เรื่องนี้จึงมีน้ำหนักมากกว่าเหตุการณ์เล็กๆ รายวัน และน่าจะเกี่ยวกับการเปลี่ยนมุมมองหรือทิศทางชีวิตในระดับที่ลึกขึ้น`
      : `${majorCount} Major Arcana appear here, so this looks bigger than a passing day-to-day mood. The spread is pointing to a deeper shift in perspective, direction, or the way you are meeting this part of life.`;
    if (dominantSuit) return SUIT_PATTERN[dominantSuit][lang];
    if (courtCount >= 2) return lang === 'th'
      ? 'ไพ่บุคคลปรากฏมากกว่าหนึ่งใบ จึงควรสังเกตทั้งคนที่มีอิทธิพลต่อเรื่องนี้และบทบาทที่คุณกำลังต้องรับในสถานการณ์'
      : 'More than one court card appears, so pay attention both to the people shaping the situation and to the role you are being asked to take within it.';
    const flow = trajectory(cards);
    if (lang === 'th') {
      if (flow === 'clearer' || flow === 'improving') return 'น้ำหนักของไพ่ค่อยๆ ดีขึ้นจากใบแรกไปใบสุดท้าย จุดสำคัญคืออย่าข้ามสิ่งที่ไพ่ใบกลางกำลังขอให้จัดการ เพราะมันเป็นสะพานของการเปลี่ยนแปลงครั้งนี้';
      if (flow === 'harder' || flow === 'tightening') return 'น้ำหนักของไพ่ตึงขึ้นจากใบแรกไปใบสุดท้าย จึงควรมองไพ่ใบกลางเป็นสัญญาณเตือนล่วงหน้ามากกว่าจะรอให้ปัญหาชัดขึ้นแล้วค่อยแก้';
      return 'ไพ่ทั้งสามมีน้ำหนักต่างกันพอสมควร เรื่องนี้จึงไม่ได้มีคำตอบแบบเส้นตรง สิ่งที่สำคัญคือดูว่าปัจจุบันกำลังเปลี่ยนเงื่อนไขอะไรอยู่';
    }
    if (flow === 'clearer' || flow === 'improving') return 'The tonal weight improves from the first card to the last. The key is not to skip over the middle card, because it is the bridge that makes that improvement possible.';
    if (flow === 'harder' || flow === 'tightening') return 'The spread becomes more demanding from the first card to the last. Treat the middle card as an early signal to work with now rather than waiting for the pressure to become more obvious.';
    return 'The three cards carry different weights, so this is not a straight-line story. What matters most is how the present is changing the conditions between where you have been and what may come next.';
  }

  function turningPointFor(cards, lang) {
    const present = cards[1];
    const next = cards[2];
    const me = essenceFor(present, lang);
    const ne = essenceFor(next, lang);
    const variant = seedFor(cards) % 3;
    if (lang === 'th') {
      const choices = [
        `จุดหักเหอยู่ที่ไพ่${present.title.th} ตอนนี้สิ่งที่ต้องดูให้ชัดคือ${me} เพราะถ้าตรงนี้เปลี่ยน แนวโน้มของไพ่${next.title.th}ที่พาไปสู่${ne}ก็เปลี่ยนตามได้`,
        `ไพ่${present.title.th}คือใบที่ควรให้ความสำคัญที่สุดในตอนนี้ เรื่องยังไม่ถูกตัดสินด้วยอดีตหรือไพ่ใบสุดท้าย แต่อยู่ที่ว่าคุณรับมือกับ${me}อย่างไร`,
        `หัวใจของชุดนี้อยู่ที่ไพ่${present.title.th} เพราะตอนนี้เรื่องกำลังอยู่กับ${me} และจุดนี้มีอิทธิพลต่อทิศทางของไพ่${next.title.th}มากที่สุด`
      ];
      return choices[variant];
    }
    const choices = [
      `The pivot is ${present.title.en}. What matters most now is ${me}, because changing that changes how the direction of ${next.title.en} — ${ne} — can develop.`,
      `${present.title.en} deserves the most attention right now. The story is not settled by the past or by the final card; it turns on how you handle ${me}.`,
      `The heart of this spread is ${present.title.en}. The present is centred on ${me}, and that has the strongest influence over how the direction of ${next.title.en} develops.`
    ];
    return choices[variant];
  }

  function guidanceFor(cards, lang) {
    const present = cards[1], next = cards[2];
    const nextTone = toneFor(next);
    if (lang === 'th') {
      if (nextTone >= 1) return `ตอนนี้ให้ทำสิ่งที่ไพ่${present.title.th}ชี้ให้เห็นให้ดีเสียก่อน ยังไม่ต้องรีบไล่ตามผลของไพ่${next.title.th} ยิ่งปัจจุบันถูกจัดการอย่างมีสติ แนวโน้มเชิงบวกของไพ่ใบสุดท้ายก็ยิ่งมีฐานรองรับ`;
      if (nextTone <= -1) return `ยังไม่ต้องกังวลกับไพ่${next.title.th}ล่วงหน้า ให้กลับมาดูสิ่งที่ไพ่${present.title.th}กำลังสะท้อนและจัดการส่วนที่อยู่ตรงหน้าก่อน ตรงนี้คือจุดที่คุณยังมีอิทธิพลต่อช่วงต่อไปมากที่สุด`;
      return `ยังไม่ต้องบังคับให้เรื่องนี้มีข้อสรุปเร็วเกินไป ทำสิ่งที่ไพ่${present.title.th}กำลังชี้ให้ชัดก่อน แล้วค่อยใช้ไพ่${next.title.th}เป็นภาพของทิศทาง ไม่ใช่คำตัดสินสุดท้าย`;
    }
    if (nextTone >= 1) return `For now, stay with the work of ${present.title.en} instead of chasing the promise of ${next.title.en}. The more clearly you handle the present, the more solidly the favourable direction of the final card can develop.`;
    if (nextTone <= -1) return `Rather than worrying about ${next.title.en} in advance, come back to what ${present.title.en} is showing and deal with what is in front of you. That is where you still have the most influence over the next phase.`;
    return `There is no need to force a conclusion too early. Get clear on what ${present.title.en} is showing now, then use ${next.title.en} as a picture of direction rather than a final verdict.`;
  }

  function compose(cardsOrIds, lang = 'en') {
    const cards = safeCards(cardsOrIds);
    const safeLang = lang === 'th' ? 'th' : 'en';
    const lines = positionLines(cards, safeLang);
    const result = {
      version: VERSION,
      trajectory: trajectory(cards),
      positions: Object.freeze([
        Object.freeze({ id: 'past', label: safeLang === 'th' ? 'อดีต' : 'Past', cardId: cards[0].id, text: lines[0] }),
        Object.freeze({ id: 'present', label: safeLang === 'th' ? 'ปัจจุบัน' : 'Present', cardId: cards[1].id, text: lines[1] }),
        Object.freeze({ id: 'next', label: safeLang === 'th' ? 'แนวโน้มต่อจากนี้' : 'What May Unfold Next', cardId: cards[2].id, text: lines[2] })
      ]),
      story: storyFor(cards, safeLang),
      turningPoint: turningPointFor(cards, safeLang),
      pattern: patternFor(cards, safeLang),
      guidance: guidanceFor(cards, safeLang),
      reflection: cards[1].reflection[safeLang]
    };
    return Object.freeze(result);
  }

  window.LGTThreeNarrative = Object.freeze({
    version: VERSION,
    compose,
    toneFor,
    essenceFor,
    trajectory,
    profileCount: Object.keys(ESSENCE).length
  });
})();

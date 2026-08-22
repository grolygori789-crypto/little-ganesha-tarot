(() => {
  'use strict';

  const CONTENT = window.LGTReadingContent;
  const ANALYZER = window.LGTQuestionAnalyzer;
  if (!CONTENT || !ANALYZER) throw new Error('Ask context requires tarot content and Question Analyzer.');

  const VERSION = 'ask-context-v2';

  // One tonal value per canonical card. This is not a fortune score; it only helps the
  // composer choose whether an evaluative answer should sound supportive, mixed, or cautious.
  const TONE = Object.freeze([
    1,2,1,2,1,1,2,2,2,0,1,0,0,-1,2,-1,-2,2,-1,2,1,2,
    2,1,2,2,-1,2,0,2,0,-1,1,1,2,2,
    2,2,2,-1,-2,1,0,-1,2,2,1,1,2,2,
    1,0,-2,0,-2,1,-1,-2,-2,-2,0,0,1,1,
    2,1,2,0,-2,1,0,1,2,2,1,1,2,2
  ]);

  const MAJOR_STYLE = Object.freeze({
    '00': { en: 'fresh, open, unconventional, and naturally spontaneous', th: 'สดใหม่ เปิดกว้าง มีความเป็นตัวเอง และดูเป็นธรรมชาติ' },
    '01': { en: 'focused, capable, expressive, and quietly magnetic', th: 'มีจุดโฟกัส ดูมีความสามารถ แสดงออกชัด และมีแรงดึงดูดแบบมั่นใจ' },
    '02': { en: 'mysterious, composed, observant, and hard to read at first', th: 'มีความลึกลับ สุขุม ช่างสังเกต และไม่ได้อ่านออกง่ายตั้งแต่แรก' },
    '03': { en: 'warm, abundant, sensual, and comfortably attractive', th: 'อบอุ่น มีชีวิตชีวา มีเสน่ห์ทางความรู้สึก และดูดีแบบสบายตา' },
    '04': { en: 'structured, mature, controlled, and authoritative', th: 'เป็นระเบียบ ดูเป็นผู้ใหญ่ คุมตัวเองได้ และมีความน่าเชื่อถือ' },
    '05': { en: 'respectable, traditional, grounded, and trustworthy', th: 'น่าเคารพ เป็นหลักเป็นฐาน สุภาพ และให้ความรู้สึกไว้ใจได้' },
    '06': { en: 'harmonious, attractive, relational, and easy to connect with', th: 'กลมกลืน มีเสน่ห์ เชื่อมโยงกับคนง่าย และมีความน่าดึงดูดในเชิงความสัมพันธ์' },
    '07': { en: 'driven, confident, purposeful, and visibly self-directed', th: 'มุ่งมั่น มั่นใจ มีเป้าหมาย และดูเป็นคนควบคุมทิศทางตัวเองได้' },
    '08': { en: 'steady, quietly confident, kind, and stronger than first impressions suggest', th: 'นิ่ง มั่นใจแบบไม่ต้องโชว์ อ่อนโยน และมีพลังมากกว่าที่เห็นในครั้งแรก' },
    '09': { en: 'reserved, thoughtful, mature, and more compelling with time than at first glance', th: 'สงบ เก็บตัวนิดๆ มีวุฒิภาวะ และยิ่งรู้จักยิ่งเห็นเสน่ห์มากกว่าความสะดุดตาครั้งแรก' },
    '10': { en: 'changeable, lively, noticeable, and difficult to reduce to one fixed impression', th: 'มีหลายมุม เปลี่ยนอารมณ์ภาพได้ ดูมีชีวิต และไม่ถูกจำกัดด้วยภาพเดียว' },
    '11': { en: 'balanced, clean, composed, and measured rather than flashy', th: 'สมดุล เรียบร้อย สุขุม และดูดีแบบพอดีมากกว่าหวือหวา' },
    '12': { en: 'unusual, contemplative, understated, and likely to be appreciated from a different angle', th: 'ไม่เหมือนคนทั่วไป ชวนมองซ้ำ เรียบแต่มีมิติ และอาจต้องเปลี่ยนมุมจึงเห็นเสน่ห์ชัด' },
    '13': { en: 'intense, transformative, striking, and not especially conventional', th: 'เข้ม มีพลังของการเปลี่ยนแปลง สะดุดในแบบเฉพาะตัว และไม่จำเป็นต้องตรงมาตรฐานทั่วไป' },
    '14': { en: 'balanced, graceful, calm, and naturally well put together', th: 'สมดุล มีความละมุน สงบ และดูลงตัวอย่างเป็นธรรมชาติ' },
    '15': { en: 'magnetic, sensual, intense, and capable of attracting strong reactions', th: 'มีแรงดึงดูดสูง ชัดทางอารมณ์ เข้ม และทำให้คนเกิดปฏิกิริยาต่อคุณได้แรง' },
    '16': { en: 'striking, disruptive, raw, and likely to challenge ordinary expectations', th: 'สะดุดตาแบบแรง มีความดิบ ไม่เดินตามกรอบ และอาจท้าทายความคาดหวังของคนทั่วไป' },
    '17': { en: 'gentle, luminous, authentic, and naturally appealing without forcing attention', th: 'นุ่มนวล ดูมีแสงในตัว จริงใจ และมีเสน่ห์โดยไม่ต้องพยายามเรียกร้องสายตา' },
    '18': { en: 'enigmatic, changeable, sensitive, and easy for others to project onto', th: 'ลึกลับ มีหลายอารมณ์ อ่อนไหว และทำให้คนอื่นตีความคุณได้หลายแบบ' },
    '19': { en: 'bright, open, confident, warm, and immediately noticeable', th: 'สดใส เปิดเผย มั่นใจ อบอุ่น และเป็นพลังที่คนสังเกตเห็นได้ง่าย' },
    '20': { en: 'clearer after experience, self-aware, renewed, and increasingly authentic', th: 'ชัดเจนขึ้นจากประสบการณ์ รู้จักตัวเอง และดูจริงกับตัวเองมากขึ้นเรื่อยๆ' },
    '21': { en: 'complete, polished, balanced, and broadly easy to appreciate', th: 'ดูครบ ลงตัว มีความสมดุล และเป็นเสน่ห์ที่คนหลากหลายแบบเข้าถึงได้' }
  });

  const SUIT_STYLE = Object.freeze({
    wands: { en: 'energetic, expressive, warm, and visibly alive', th: 'มีพลัง แสดงออกชัด อบอุ่น และดูมีชีวิตชีวา' },
    cups: { en: 'soft, emotionally warm, receptive, and easy to feel around', th: 'นุ่มนวล อบอุ่นทางอารมณ์ เปิดรับ และทำให้คนรู้สึกเข้าถึงได้' },
    swords: { en: 'sharp, intelligent, self-contained, and somewhat cool', th: 'คม ดูฉลาด คุมตัวเองได้ และมีความเย็นนิดๆ' },
    pentacles: { en: 'grounded, natural, composed, and reassuringly tangible', th: 'เป็นธรรมชาติ มีหลัก ดูนิ่ง และให้ความรู้สึกมั่นคงน่าไว้ใจ' }
  });

  const RANK_STYLE = Object.freeze({
    ace: { en: 'with a fresh, uncomplicated quality', th: 'พร้อมความสดใหม่ที่ยังไม่ปรุงแต่งมาก' },
    two: { en: 'with a poised, balancing quality', th: 'พร้อมความพอดีและการวางตัวที่สมดุล' },
    three: { en: 'with confidence that grows through participation and visibility', th: 'พร้อมความมั่นใจที่เด่นขึ้นเมื่อได้ลงมือและมีส่วนร่วม' },
    four: { en: 'with a stable, contained quality', th: 'พร้อมความนิ่งและความมั่นคงที่ชัดเจน' },
    five: { en: 'with tension that can make the presentation feel less effortless', th: 'แต่มีแรงตึงบางอย่างที่อาจทำให้เสน่ห์ดูไม่ผ่อนคลายเต็มที่' },
    six: { en: 'with a socially aware, generous, and well-balanced quality', th: 'พร้อมความรู้จังหวะทางสังคม ความใจกว้าง และการวางตัวที่สมดุล' },
    seven: { en: 'with independence and a guarded edge', th: 'พร้อมความเป็นตัวของตัวเองและขอบเขตที่ค่อนข้างชัด' },
    eight: { en: 'with movement, focus, and a sense of momentum', th: 'พร้อมพลังของการเคลื่อนไหว จุดโฟกัส และความคล่องตัว' },
    nine: { en: 'with resilience and self-possession', th: 'พร้อมความแข็งแรงจากประสบการณ์และการรู้จักยืนด้วยตัวเอง' },
    ten: { en: 'though pressure or responsibility may sometimes weigh on the presentation', th: 'แต่ภาระหรือความกดดันอาจทำให้ภาพรวมดูหนักขึ้นในบางช่วง' },
    page: { en: 'with a curious, youthful, exploratory quality', th: 'พร้อมความอยากรู้ ความสด และพลังของการค้นหา' },
    knight: { en: 'with movement, intensity, and active presence', th: 'พร้อมพลังเคลื่อนไหว ความเข้ม และการมีตัวตนที่ชัด' },
    queen: { en: 'with assured warmth and mature presence', th: 'พร้อมความมั่นใจที่อบอุ่นและความโดดเด่นแบบมีวุฒิภาวะ' },
    king: { en: 'with mature authority and a settled presence', th: 'พร้อมความน่าเชื่อถือแบบผู้ใหญ่และการวางตัวที่มั่นคง' }
  });

  const DOMAIN_LENS = Object.freeze({
    love_relationships: 'loveRelationships',
    work_purpose: 'workGoals',
    money_resources: 'moneyResources',
    choice_action: 'guidanceToday',
    outlook_opportunity: 'opportunitiesWatchouts',
    inner_growth: 'innerBalance'
  });

  const DOMAIN_REFLECTION = Object.freeze({
    self_image: {
      en: 'If you stopped grading yourself against one narrow standard, what quality of your presence would you want people to remember?',
      th: 'ถ้าหยุดวัดตัวเองด้วยมาตรฐานเพียงแบบเดียว คุณอยากให้คนจดจำเสน่ห์หรือการวางตัวของคุณจากอะไร?'
    },
    social_perception: {
      en: 'Which part of the impression you give others is genuinely you, and which part is shaped mainly by trying to manage their opinion?',
      th: 'ภาพที่คนอื่นเห็นส่วนไหนเป็นตัวคุณจริงๆ และส่วนไหนเกิดจากความพยายามควบคุมว่าคนอื่นควรคิดกับคุณอย่างไร?'
    },
    love_relationships: {
      en: 'What would become clearer if you judged this connection by consistent behavior rather than by hope, fear, or one isolated moment?',
      th: 'เรื่องนี้จะชัดขึ้นแค่ไหน ถ้าคุณดูจากพฤติกรรมที่เกิดซ้ำจริงๆ มากกว่าความหวัง ความกลัว หรือเหตุการณ์เพียงครั้งเดียว?'
    },
    work_purpose: {
      en: 'Which next step would give you useful evidence about this path instead of only more thoughts about it?',
      th: 'ก้าวถัดไปแบบไหนจะให้ข้อมูลจริงเกี่ยวกับเส้นทางนี้ แทนที่จะเพิ่มเพียงความคิดเกี่ยวกับมัน?'
    },
    money_resources: {
      en: 'What part of this money question can you verify with numbers, limits, or real-world information before acting?',
      th: 'เรื่องเงินส่วนไหนที่คุณตรวจสอบด้วยตัวเลข ขอบเขต หรือข้อมูลจริงได้ก่อนตัดสินใจ?'
    },
    choice_action: {
      en: 'Which option remains respectable to you after the immediate fear, excitement, or pressure settles?',
      th: 'เมื่อความกลัว ความตื่นเต้น หรือแรงกดดันเบาลง ทางเลือกไหนยังเป็นทางที่คุณเคารพตัวเองได้?'
    },
    outlook_opportunity: {
      en: 'What sign in the real situation would tell you that this possibility is actually developing rather than only being imagined?',
      th: 'สัญญาณอะไรในสถานการณ์จริงที่จะบอกได้ว่าโอกาสนี้กำลังพัฒนาอยู่จริง ไม่ใช่มีอยู่เพียงในความคาดหวัง?'
    },
    inner_growth: {
      en: 'What feeling or need becomes easier to name when you stop trying to solve it immediately?',
      th: 'ความรู้สึกหรือความต้องการอะไรชัดขึ้น เมื่อคุณไม่รีบแก้มันทันที?'
    },
    spiritual_unseen: {
      en: 'What part of this spiritual question can you hold as meaningful symbolism while still leaving room for what cannot be verified?',
      th: 'ส่วนไหนของคำถามทางจิตวิญญาณนี้ที่คุณรับไว้เป็นสัญลักษณ์ที่มีความหมายได้ โดยยังเว้นพื้นที่ให้สิ่งที่เราไม่อาจยืนยันได้?'
    },
    general: {
      en: 'What part of this message is useful enough to test against your real situation today?',
      th: 'ส่วนไหนของข้อความนี้มีประโยชน์พอที่จะนำไปเทียบกับสถานการณ์จริงของคุณวันนี้?'
    }
  });

  const SPIRITUAL_CONTEXT = Object.freeze({
  "00": {
    "en": "The unseen is framed here through openness, trust, and a willingness to enter the unknown without demanding certainty first.",
    "th": "เรื่องเร้นลับในไพ่ใบนี้เชื่อมกับความเปิดกว้าง การไว้วางใจ และการก้าวเข้าสู่สิ่งที่ยังไม่รู้โดยไม่บังคับให้ต้องมีคำตอบแน่นอนก่อน"
  },
  "01": {
    "en": "Spiritual meaning is expressed through focused intention, skill, ritual, and the responsible use of what is already in your hands.",
    "th": "ความหมายทางจิตวิญญาณของไพ่ใบนี้อยู่ที่เจตนาที่ชัด ทักษะ การปฏิบัติอย่างมีแบบแผน และการใช้สิ่งที่มีอยู่ในมืออย่างรับผิดชอบ"
  },
  "02": {
    "en": "This card points toward intuition, silence, mystery, and inner knowing, while asking for discernment between a quiet insight and a projection of what you hope or fear.",
    "th": "ไพ่ใบนี้เชื่อมกับสัญชาตญาณ ความสงบ ความลึกลับ และการรู้จากภายใน พร้อมเตือนให้แยกเสียงที่นิ่งจริงออกจากสิ่งที่เกิดจากความหวังหรือความกลัว"
  },
  "03": {
    "en": "The sacred appears through nourishment, embodiment, nature, creativity, and the kind of care that helps life grow rather than through dramatic signs.",
    "th": "ความศักดิ์สิทธิ์ในไพ่ใบนี้ปรากฏผ่านการหล่อเลี้ยง ร่างกาย ธรรมชาติ ความสร้างสรรค์ และการดูแลที่ทำให้ชีวิตเติบโต มากกว่าสัญญาณหวือหวา"
  },
  "04": {
    "en": "Protection is symbolized through structure, boundaries, order, responsibility, and the stabilizing presence of a firm guiding principle.",
    "th": "พลังของการคุ้มครองในเชิงสัญลักษณ์อยู่ที่โครงสร้าง ขอบเขต ระเบียบ ความรับผิดชอบ และหลักที่มั่นคงซึ่งช่วยประคองชีวิต"
  },
  "05": {
    "en": "This card resonates with spiritual tradition, teachers, lineage, shared ritual, and trusted teachings more strongly than with a private supernatural claim.",
    "th": "ไพ่ใบนี้สอดคล้องกับประเพณีทางศรัทธา ครูบาอาจารย์ สายการสืบทอด พิธีกรรมร่วม และคำสอนที่ได้รับความไว้วางใจ มากกว่าการยืนยันประสบการณ์เหนือธรรมชาติส่วนตัว"
  },
  "06": {
    "en": "The spiritual theme is alignment: choosing relationships, values, and commitments that let the heart and conscience move in the same direction.",
    "th": "แกนทางจิตวิญญาณของไพ่ใบนี้คือความสอดคล้อง การเลือกความสัมพันธ์ คุณค่า และพันธะที่ทำให้หัวใจกับมโนธรรมเดินไปในทิศเดียวกัน"
  },
  "07": {
    "en": "Guidance appears through disciplined will, a clear direction, and the ability to hold competing forces together without losing the path you chose.",
    "th": "การชี้นำในไพ่ใบนี้อยู่ที่วินัยของเจตจำนง ทิศทางที่ชัด และความสามารถในการประคองแรงที่ขัดกันโดยไม่หลุดจากทางที่เลือก"
  },
  "08": {
    "en": "The sacred quality here is quiet strength: courage, compassion, restraint, and the capacity to meet fear without becoming ruled by it.",
    "th": "คุณภาพทางจิตวิญญาณของไพ่ใบนี้คือพลังที่สงบ ความกล้า ความเมตตา การยับยั้งชั่งใจ และการเผชิญความกลัวโดยไม่ปล่อยให้มันเป็นผู้ควบคุม"
  },
  "09": {
    "en": "This card points toward solitude, contemplation, inner light, and wisdom found through patient inquiry rather than through external spectacle.",
    "th": "ไพ่ใบนี้พาไปสู่ความสันโดษ การใคร่ครวญ แสงภายใน และปัญญาที่ค่อยๆ เกิดจากการค้นหาอย่างอดทน มากกว่าปรากฏการณ์ภายนอก"
  },
  "10": {
    "en": "Spiritual meaning is carried by cycles, timing, changing conditions, and meaningful patterns, while coincidence itself is not proof of a supernatural cause.",
    "th": "ความหมายทางจิตวิญญาณอยู่ที่วัฏจักร จังหวะ เงื่อนไขที่เปลี่ยน และรูปแบบที่ชวนให้สังเกต โดยเหตุบังเอิญเพียงอย่างเดียวยังไม่ใช่หลักฐานของเหตุเหนือธรรมชาติ"
  },
  "11": {
    "en": "This card brings the question back to truth, proportion, accountability, and cause-and-effect rather than promising a hidden cosmic verdict.",
    "th": "ไพ่ใบนี้พาคำถามกลับมาที่ความจริง ความพอดี ความรับผิดชอบ และเหตุปัจจัย มากกว่าการประกาศคำตัดสินจากจักรวาลที่มองไม่เห็น"
  },
  "12": {
    "en": "The spiritual lesson is surrendering the need to force an answer, allowing a pause or reversed perspective to reveal what effort alone cannot.",
    "th": "บทเรียนทางจิตวิญญาณคือการวางความต้องการที่จะบังคับเอาคำตอบ เปิดพื้นที่ให้การหยุดหรือการกลับมุมมองเผยสิ่งที่ความพยายามอย่างเดียวมองไม่เห็น"
  },
  "13": {
    "en": "This card symbolizes endings, release, and transformation; in spiritual questions it speaks to a passage between forms, not to literal death or proof of another realm.",
    "th": "ไพ่ใบนี้เป็นสัญลักษณ์ของการจบ การปล่อย และการเปลี่ยนผ่าน ในคำถามทางจิตวิญญาณจึงพูดถึงการเปลี่ยนรูปของชีวิต ไม่ใช่การทำนายความตายหรือยืนยันโลกอื่น"
  },
  "14": {
    "en": "Temperance carries imagery of mediation, healing, and the meeting of different worlds or elements; it can evoke guardian-like support symbolically without identifying a literal being.",
    "th": "ความพอดีมีภาพของการประสาน การเยียวยา และการเชื่อมสิ่งต่างขั้ว จึงให้ความรู้สึกคล้ายพลังคอยประคองในเชิงสัญลักษณ์ โดยไม่ได้ระบุว่ามีสิ่งมีชีวิตเหนือธรรมชาติองค์ใดจริง"
  },
  "15": {
    "en": "The spiritual focus is attachment, compulsion, fear, and shadow material; the card asks what has power over you rather than proving demons, curses, or possession.",
    "th": "แกนทางจิตวิญญาณอยู่ที่ความยึดติด แรงบีบคั้น ความกลัว และด้านเงาของใจ ไพ่ชวนดูว่าอะไรมีอำนาจเหนือคุณ ไม่ได้ยืนยันปีศาจ คำสาป หรือการถูกครอบงำ"
  },
  "16": {
    "en": "The Tower symbolizes a destabilizing truth, collapse of a false structure, or sudden awakening; disruption is not by itself evidence of supernatural attack.",
    "th": "หอคอยเป็นสัญลักษณ์ของความจริงที่สั่นโครงสร้าง การพังของสิ่งที่ไม่มั่นคง หรือการตื่นรู้อย่างฉับพลัน ความปั่นป่วนไม่ได้แปลว่าเป็นการโจมตีเหนือธรรมชาติโดยอัตโนมัติ"
  },
  "17": {
    "en": "The Star carries hope, renewal, orientation, and a gentle sense of guidance; spiritually it resembles finding a trustworthy light without needing to name its source.",
    "th": "ดวงดาวเชื่อมกับความหวัง การฟื้นคืน ทิศทาง และความรู้สึกว่ามีแสงคอยนำทาง ในเชิงจิตวิญญาณจึงเหมือนการพบสิ่งที่ช่วยให้วางใจได้โดยไม่จำเป็นต้องระบุชื่อแหล่งที่มา"
  },
  "18": {
    "en": "The Moon heightens dreams, intuition, uncertainty, and projection; it asks you to respect mystery while checking fear and imagination before treating them as revelation.",
    "th": "ดวงจันทร์ขยายเรื่องความฝัน สัญชาตญาณ ความคลุมเครือ และการฉายภาพจากใจ จึงชวนเคารพความลึกลับพร้อมตรวจความกลัวและจินตนาการก่อนถือว่าเป็นนิมิตหรือความจริง"
  },
  "19": {
    "en": "The Sun brings clarity, vitality, warmth, and visible life; spiritually it favors what can be experienced openly rather than what depends on secrecy or fear.",
    "th": "ดวงอาทิตย์นำความชัด พลังชีวิต ความอบอุ่น และสิ่งที่เห็นได้ตรงไปตรงมา ในคำถามทางจิตวิญญาณจึงให้น้ำหนักกับสิ่งที่สัมผัสได้อย่างเปิดเผยมากกว่าความลับหรือความหวาดกลัว"
  },
  "20": {
    "en": "Judgement symbolizes awakening, a call to respond, review of the past, and renewal; it can feel karmic without functioning as proof of a cosmic sentence.",
    "th": "การพิพากษาเป็นสัญลักษณ์ของการตื่นรู้ การได้ยินเสียงเรียก การทบทวนอดีต และการเริ่มใหม่ จึงให้กลิ่นอายเรื่องกรรมได้โดยไม่ใช่หลักฐานของคำพิพากษาจากจักรวาล"
  },
  "21": {
    "en": "The World points to integration, wholeness, completion, and a wider field of belonging; the spiritual emphasis is on seeing how separate parts belong to one lived whole.",
    "th": "โลกชี้ถึงการบูรณาการ ความครบถ้วน การปิดวง และความเป็นส่วนหนึ่งของภาพที่กว้างขึ้น แกนทางจิตวิญญาณคือการเห็นว่าสิ่งที่แยกกันเชื่อมอยู่ในชีวิตเดียวกันอย่างไร"
  },
  "22": {
    "en": "A new spiritual spark is present symbolically: curiosity, inspiration, or a calling that becomes meaningful only when it is given a grounded first step.",
    "th": "ในเชิงสัญลักษณ์มีประกายทางจิตวิญญาณใหม่ ความอยากรู้ แรงบันดาลใจ หรือเสียงเรียกบางอย่าง ซึ่งจะมีความหมายเมื่อได้แปลงเป็นก้าวแรกที่จับต้องได้"
  },
  "23": {
    "en": "The spiritual theme is choosing a horizon and deciding which possibility deserves commitment rather than treating every imagined path as a sign.",
    "th": "แกนทางจิตวิญญาณคือการเลือกขอบฟ้าและตัดสินว่าเส้นทางใดควรได้รับความมุ่งมั่น มากกว่ามองทุกความเป็นไปได้ว่าเป็นสัญญาณ"
  },
  "24": {
    "en": "This card links spiritual confidence with expansion, perspective, and watching what develops after an intention has been sent into the world.",
    "th": "ไพ่ใบนี้เชื่อมความมั่นใจทางจิตวิญญาณกับการขยายมุมมองและการเฝ้าดูสิ่งที่ค่อยๆ เติบโตหลังจากเราได้วางเจตนาและลงมือแล้ว"
  },
  "25": {
    "en": "Sacredness is found in a stable place, shared joy, community, and the feeling of being welcomed into a trustworthy circle.",
    "th": "ความศักดิ์สิทธิ์ในไพ่ใบนี้อยู่ในพื้นที่ที่มั่นคง ความยินดีร่วม ชุมชน และความรู้สึกว่าได้อยู่ในวงที่ให้ความไว้วางใจและความเป็นบ้าน"
  },
  "26": {
    "en": "Competing beliefs, egos, or interpretations may be making the spiritual question noisier than it needs to be; contrast can clarify, but conflict is not revelation.",
    "th": "ความเชื่อ อัตตา หรือการตีความหลายชุดอาจทำให้คำถามทางจิตวิญญาณวุ่นวายเกินจำเป็น ความต่างช่วยให้เห็นชัดขึ้นได้ แต่ความขัดแย้งไม่ใช่นิมิตในตัวมันเอง"
  },
  "27": {
    "en": "The card symbolizes affirmation, visibility, and being strengthened by recognition; spiritually it may feel like encouragement, but approval from others is not proof of divine endorsement.",
    "th": "ไพ่ใบนี้เป็นสัญลักษณ์ของการได้รับการยอมรับ การถูกมองเห็น และกำลังใจ ในเชิงจิตวิญญาณอาจให้ความรู้สึกเหมือนได้รับการหนุน แต่คำชมจากคนอื่นไม่ใช่หลักฐานว่ามีสิ่งศักดิ์สิทธิ์รับรอง"
  },
  "28": {
    "en": "Protection is represented through conviction, boundaries, and holding your ground when outside pressure challenges what you know matters.",
    "th": "การคุ้มครองในไพ่ใบนี้ปรากฏผ่านความมั่นคงในหลัก ขอบเขต และการยืนหยัดเมื่อแรงกดดันภายนอกท้าทายสิ่งที่คุณเห็นว่าสำคัญ"
  },
  "29": {
    "en": "Fast movement, messages, and coincidences can feel charged with meaning; the card asks you to notice the pattern without turning speed or repetition into automatic proof of a sign.",
    "th": "เหตุการณ์ที่เดินเร็ว ข่าวสาร และความบังเอิญอาจให้ความรู้สึกว่ามีความหมาย ไพ่ชวนสังเกตรูปแบบโดยไม่รีบถือว่าความถี่หรือความเร็วคือหลักฐานของสัญญาณ"
  },
  "30": {
    "en": "The spiritual strength here is resilience after repeated tests: staying open enough to learn while keeping boundaries that protect your energy and judgment.",
    "th": "พลังทางจิตวิญญาณคือความอึดหลังผ่านบททดสอบซ้ำๆ เปิดพอที่จะเรียนรู้ และมีขอบเขตพอที่จะรักษาพลังกับวิจารณญาณของตัวเอง"
  },
  "31": {
    "en": "Spiritual practice may have become burden, obligation, or pressure; the card asks which beliefs or duties you are carrying past the point of usefulness.",
    "th": "การปฏิบัติหรือความเชื่ออาจกลายเป็นภาระ หน้าที่ หรือแรงกดดัน ไพ่ชวนดูว่าสิ่งใดที่คุณยังแบกต่อทั้งที่เลยจุดที่เป็นประโยชน์ไปแล้ว"
  },
  "32": {
    "en": "This is the energy of a beginner on a spiritual path: curious, inspired, willing to explore, and best served by learning before making large claims.",
    "th": "นี่คือพลังของผู้เริ่มต้นบนเส้นทางทางจิตวิญญาณ อยากรู้ มีแรงบันดาลใจ กล้าสำรวจ และจะได้ประโยชน์มากที่สุดจากการเรียนรู้ก่อนตั้งข้อสรุปใหญ่"
  },
  "33": {
    "en": "Spiritual enthusiasm is strong, but intensity can outrun discernment; let passion move you without mistaking every surge of feeling for a message.",
    "th": "ความกระตือรือร้นทางจิตวิญญาณแรงมาก แต่ความเข้มอาจวิ่งเร็วกว่าวิจารณญาณ ให้แรงศรัทธาพาคุณเคลื่อนไหวโดยไม่ตีความทุกคลื่นอารมณ์ว่าเป็นข้อความ"
  },
  "34": {
    "en": "The card expresses an embodied inner flame: confidence, warmth, creative life-force, and the ability to inspire others without needing supernatural status.",
    "th": "ไพ่ใบนี้สะท้อนไฟภายในที่อยู่กับชีวิตจริง ความมั่นใจ ความอบอุ่น พลังสร้างสรรค์ และความสามารถในการจุดประกายคนอื่นโดยไม่ต้องอ้างสถานะเหนือธรรมชาติ"
  },
  "35": {
    "en": "Spiritual authority is framed as mature stewardship of will, vision, and influence; leadership matters more here than mystical display.",
    "th": "อำนาจทางจิตวิญญาณถูกวางในรูปของการกำกับเจตจำนง วิสัยทัศน์ และอิทธิพลอย่างมีวุฒิภาวะ ภาวะผู้นำสำคัญกว่าการแสดงปรากฏการณ์ลึกลับ"
  },
  "36": {
    "en": "A spiritual opening appears through feeling, compassion, receptivity, devotion, and the willingness to let the heart become a source of attention rather than certainty.",
    "th": "การเปิดทางจิตวิญญาณเกิดผ่านความรู้สึก เมตตา การเปิดรับ ศรัทธา และการยอมให้หัวใจเป็นแหล่งของความใส่ใจ มากกว่าจะเป็นเครื่องยืนยันความแน่นอน"
  },
  "37": {
    "en": "The sacred theme is mutual recognition, resonance, and honest connection; a meaningful bond can feel spiritually charged without proving a predetermined soul contract.",
    "th": "แกนศักดิ์สิทธิ์คือการมองเห็นกัน ความสอดคล้อง และการเชื่อมโยงอย่างซื่อตรง ความสัมพันธ์ที่มีความหมายอาจให้ความรู้สึกลึกซึ้งโดยไม่จำเป็นต้องยืนยันว่าเป็นสัญญาวิญญาณที่ถูกกำหนดไว้"
  },
  "38": {
    "en": "Spiritual nourishment comes through community, shared celebration, friendship, and practices that deepen connection rather than isolate you from ordinary life.",
    "th": "การหล่อเลี้ยงทางจิตวิญญาณมาจากชุมชน ความยินดีร่วม มิตรภาพ และการปฏิบัติที่ทำให้เชื่อมโยงกับชีวิตมากขึ้น ไม่ใช่แยกตัวออกจากโลกธรรมดา"
  },
  "39": {
    "en": "The card can mark spiritual flatness, disinterest, or an invitation you are not ready to receive; absence of feeling is not proof that guidance or meaning is absent.",
    "th": "ไพ่ใบนี้อาจสะท้อนช่วงที่ศรัทธาแผ่ว ไม่อิน หรือยังไม่พร้อมรับบางอย่าง การไม่รู้สึกอะไรไม่ได้แปลว่าความหมายหรือทิศทางหายไปทั้งหมด"
  },
  "40": {
    "en": "Grief, disappointment, or loss may color the spiritual lens; mourning what has gone can be part of faith without needing to explain the loss as punishment or karma.",
    "th": "ความเศร้า ความผิดหวัง หรือการสูญเสียอาจย้อมมุมมองทางจิตวิญญาณ การไว้ทุกข์เป็นส่วนหนึ่งของศรัทธาได้โดยไม่ต้องอธิบายความสูญเสียว่าเป็นโทษหรือกรรมที่ถูกลงทัณฑ์"
  },
  "41": {
    "en": "Memory, familiarity, childhood symbols, and a feeling of 'having known this before' are strong here; they can be meaningful without verifying a literal past-life memory.",
    "th": "ความทรงจำ ความคุ้นเคย สัญลักษณ์จากวัยเด็ก และความรู้สึกว่าเคยรู้จักสิ่งนี้มาก่อนเด่นมาก สิ่งเหล่านี้มีความหมายได้โดยไม่ต้องยืนยันว่าเป็นความทรงจำจากอดีตชาติจริง"
  },
  "42": {
    "en": "Visions, possibilities, fantasy, and spiritual imagery multiply here; discernment matters because a vivid image can be meaningful without being externally true.",
    "th": "ภาพในใจ ความเป็นไปได้ จินตนาการ และภาพทางจิตวิญญาณเพิ่มจำนวนมาก ไพ่จึงเน้นวิจารณญาณ เพราะภาพที่ชัดมากอาจมีความหมายโดยไม่จำเป็นต้องเป็นข้อเท็จจริงภายนอก"
  },
  "43": {
    "en": "The spiritual movement is a voluntary departure from what no longer nourishes the heart, even when the next source of meaning is not yet fully visible.",
    "th": "การเคลื่อนไหวทางจิตวิญญาณคือการยอมออกจากสิ่งที่ไม่หล่อเลี้ยงหัวใจอีกต่อไป แม้แหล่งความหมายใหม่ข้างหน้าจะยังไม่ชัดทั้งหมด"
  },
  "44": {
    "en": "Fulfillment, gratitude, and the experience of enoughness are central; spiritually the card asks whether desire is becoming appreciation rather than endless asking for signs.",
    "th": "ความอิ่มใจ ความขอบคุณ และความรู้สึกว่าพอแล้วเป็นแกนสำคัญ ในเชิงจิตวิญญาณไพ่ถามว่าความอยากกำลังเปลี่ยนเป็นการเห็นคุณค่าหรือยัง แทนที่จะขอสัญญาณต่อไปไม่สิ้นสุด"
  },
  "45": {
    "en": "The sacred is located in belonging, emotional continuity, family or chosen community, and a vision of peace that can be practiced together.",
    "th": "ความศักดิ์สิทธิ์อยู่ในความเป็นส่วนหนึ่ง ความต่อเนื่องทางใจ ครอบครัวหรือชุมชนที่เลือก และภาพของความสงบที่สามารถร่วมกันทำให้เกิดขึ้นจริง"
  },
  "46": {
    "en": "Dreams, symbols, tenderness, and surprising intuitive impressions are highlighted; receive them with curiosity first, then test what they mean in waking life.",
    "th": "ความฝัน สัญลักษณ์ ความอ่อนโยน และความรู้สึกหยั่งรู้แบบไม่คาดคิดเด่นขึ้น รับมันด้วยความอยากรู้ก่อน แล้วค่อยทดสอบว่ามีความหมายอย่างไรในชีวิตยามตื่น"
  },
  "47": {
    "en": "The spiritual path takes a devotional, imaginative, heart-led form; beauty and longing can guide, but idealization needs to be checked against reality.",
    "th": "เส้นทางทางจิตวิญญาณมีรูปแบบของศรัทธา จินตนาการ และการเดินตามหัวใจ ความงามกับความปรารถนาช่วยนำทางได้ แต่ควรตรวจการอุดมคติกับความจริงเสมอ"
  },
  "48": {
    "en": "Deep sensitivity, empathy, dream life, and intuitive receptivity are emphasized; the gift is strongest when paired with emotional boundaries and grounded interpretation.",
    "th": "ความไวลึก ความเข้าอกเข้าใจ ชีวิตในความฝัน และการเปิดรับทางสัญชาตญาณเด่นมาก จุดแข็งนี้จะมั่นคงที่สุดเมื่อมีขอบเขตทางอารมณ์และการตีความที่ติดดินประกบอยู่"
  },
  "49": {
    "en": "Spiritual maturity appears as emotional steadiness, compassion, and the ability to hold powerful feelings without turning them into unquestioned revelations.",
    "th": "วุฒิภาวะทางจิตวิญญาณปรากฏเป็นความมั่นคงทางอารมณ์ เมตตา และความสามารถในการอยู่กับความรู้สึกแรงๆ โดยไม่รีบยกมันเป็นนิมิตที่ต้องเชื่อทันที"
  },
  "50": {
    "en": "The spiritual tool here is discernment: a clean question, a clear distinction, and willingness to cut through comforting stories in favor of what can be honestly seen.",
    "th": "เครื่องมือทางจิตวิญญาณคือวิจารณญาณ คำถามที่ชัด การแยกสิ่งต่างๆ อย่างตรงไปตรงมา และความพร้อมตัดเรื่องเล่าที่ปลอบใจออกเพื่อเห็นสิ่งที่ซื่อตรงกว่า"
  },
  "51": {
    "en": "The unseen question may be sitting inside uncertainty or avoidance; the card favors acknowledging what you do not know instead of forcing a supernatural conclusion.",
    "th": "คำถามเรื่องเร้นลับอาจติดอยู่ในความไม่แน่ใจหรือการหลีกเลี่ยง ไพ่ให้น้ำหนักกับการยอมรับว่ายังไม่รู้ มากกว่าฝืนสรุปเหตุเหนือธรรมชาติ"
  },
  "52": {
    "en": "Pain can make spiritual explanations feel urgently necessary; this card asks you to honor the wound without assuming suffering proves punishment, curse, or destiny.",
    "th": "ความเจ็บอาจทำให้เราอยากได้คำอธิบายทางจิตวิญญาณอย่างเร่งด่วน ไพ่ชวนเคารพบาดแผลโดยไม่ถือว่าความทุกข์เป็นหลักฐานของการลงโทษ คำสาป หรือชะตาที่ถูกกำหนด"
  },
  "53": {
    "en": "Silence, rest, retreat, prayer, or meditation may be more useful than another interpretation; the spiritual work is allowing the mind to settle enough to hear itself clearly.",
    "th": "ความเงียบ การพัก การถอย การภาวนา หรือสมาธิอาจมีประโยชน์กว่าการตีความเพิ่ม งานทางจิตวิญญาณคือปล่อยให้ใจนิ่งพอที่จะได้ยินตัวเองอย่างชัดเจน"
  },
  "54": {
    "en": "The spiritual caution is ego conflict, winning at any cost, and interpretations used as weapons; certainty is least trustworthy when it exists mainly to defeat someone else.",
    "th": "ข้อควรระวังทางจิตวิญญาณคืออัตตาที่แข่งขัน การเอาชนะทุกวิถีทาง และการใช้การตีความเป็นอาวุธ ความมั่นใจจะน่าเชื่อน้อยที่สุดเมื่อมีไว้เพื่อเอาชนะคนอื่น"
  },
  "55": {
    "en": "A transition toward calmer mental ground is central; spiritual clarity may come from distance, changed environment, or leaving a story that kept the mind in turbulence.",
    "th": "การเคลื่อนไปสู่พื้นที่ใจที่สงบกว่าเป็นแกนหลัก ความชัดทางจิตวิญญาณอาจเกิดจากระยะห่าง การเปลี่ยนสภาพแวดล้อม หรือการออกจากเรื่องเล่าที่ทำให้ใจปั่นป่วน"
  },
  "56": {
    "en": "Privacy, skepticism, strategy, and hidden motives are active themes; the card asks you to verify claims carefully and notice where self-deception may be easier than truth.",
    "th": "ความเป็นส่วนตัว ความสงสัย กลยุทธ์ และแรงจูงใจที่ซ่อนอยู่เด่นขึ้น ไพ่ชวนตรวจข้ออ้างอย่างรอบคอบและดูว่าจุดไหนการหลอกตัวเองง่ายกว่าการยอมรับความจริง"
  },
  "57": {
    "en": "The strongest unseen force may be a belief that has narrowed your options; the card asks what becomes possible once fear-based assumptions are tested rather than obeyed.",
    "th": "แรงที่มองไม่เห็นซึ่งมีอิทธิพลที่สุดอาจเป็นความเชื่อที่บีบทางเลือกของคุณ ไพ่ถามว่าอะไรจะเปิดออกเมื่อสมมติฐานจากความกลัวถูกตรวจสอบแทนที่จะเชื่อฟัง"
  },
  "58": {
    "en": "Anxiety can make ambiguous sensations feel supernatural; the card takes distress seriously while warning that fear, sleeplessness, and repetitive thought are not evidence of an unseen threat.",
    "th": "ความกังวลทำให้ความรู้สึกคลุมเครือดูเหมือนเหตุเหนือธรรมชาติได้ ไพ่ให้ความสำคัญกับความทุกข์นั้นจริงๆ พร้อมเตือนว่าความกลัว การนอนไม่หลับ และความคิดวนไม่ใช่หลักฐานของภัยเร้นลับ"
  },
  "59": {
    "en": "The card marks the end of a painful mental cycle or belief structure; in unseen questions it favors closure and reality-based recovery over escalating the story into attack or curse.",
    "th": "ไพ่ใบนี้หมายถึงการสิ้นสุดวงจรความคิดหรือความเชื่อที่เจ็บปวด ในคำถามเรื่องเร้นลับจึงให้น้ำหนักกับการปิดวงและฟื้นตัวบนความจริง มากกว่าขยายเรื่องไปเป็นการถูกโจมตีหรือคำสาป"
  },
  "60": {
    "en": "The spiritual stance is inquiry: ask better questions, compare sources, observe patterns, and stay curious without confusing suspicion with insight.",
    "th": "ท่าทีทางจิตวิญญาณคือการสืบค้น ถามให้ดีขึ้น เทียบแหล่งข้อมูล สังเกตรูปแบบ และรักษาความอยากรู้โดยไม่สับสนความระแวงกับญาณหยั่งรู้"
  },
  "61": {
    "en": "Conviction is moving fast; the card encourages clear action but warns against charging ahead with a spiritual conclusion before evidence and reflection catch up.",
    "th": "ความเชื่อกำลังเคลื่อนเร็ว ไพ่สนับสนุนการลงมือที่ชัด แต่เตือนอย่าวิ่งนำไปด้วยข้อสรุปทางจิตวิญญาณก่อนที่ข้อมูลและการทบทวนจะตามทัน"
  },
  "62": {
    "en": "Spiritual discernment is sharp here: boundaries, precise language, independent thought, and willingness to separate meaningful symbolism from literal fact.",
    "th": "วิจารณญาณทางจิตวิญญาณคมชัดมาก ขอบเขต ภาษาที่แม่น ความคิดอิสระ และความพร้อมแยกสัญลักษณ์ที่มีความหมายออกจากข้อเท็จจริงตรงๆ คือหัวใจของไพ่"
  },
  "63": {
    "en": "The card favors a mature framework for belief: reason, ethics, evidence, and coherent principles strong enough to hold spiritual questions without being ruled by them.",
    "th": "ไพ่ให้น้ำหนักกับกรอบความเชื่อที่มีวุฒิภาวะ เหตุผล จริยธรรม หลักฐาน และหลักคิดที่สอดคล้องกันจนสามารถรองรับคำถามทางจิตวิญญาณได้โดยไม่ถูกคำถามเหล่านั้นควบคุม"
  },
  "64": {
    "en": "The sacred becomes tangible through body, land, work, healthful routine, and a real opportunity to root meaning in something you can care for directly.",
    "th": "ความศักดิ์สิทธิ์กลายเป็นสิ่งจับต้องได้ผ่านร่างกาย ผืนดิน งาน กิจวัตรที่เกื้อกูล และโอกาสจริงที่จะหยั่งความหมายลงในสิ่งที่คุณดูแลได้โดยตรง"
  },
  "65": {
    "en": "The spiritual lesson is integration: balancing practical life and inner life so that neither belief nor responsibility is used to escape the other.",
    "th": "บทเรียนทางจิตวิญญาณคือการบูรณาการ รักษาสมดุลระหว่างชีวิตจริงกับชีวิตภายใน โดยไม่ใช้ความเชื่อหนีหน้าที่ และไม่ใช้หน้าที่กลบความหมายภายใน"
  },
  "66": {
    "en": "Spiritual development is shown as craft, community, feedback, and learning with others; skill grows through practice more reliably than through special status.",
    "th": "การพัฒนาทางจิตวิญญาณปรากฏเป็นงานฝีมือ ชุมชน คำสะท้อนกลับ และการเรียนรู้ร่วมกับผู้อื่น ทักษะเติบโตผ่านการฝึกได้มั่นคงกว่าการอ้างสถานะพิเศษ"
  },
  "67": {
    "en": "The card asks where spiritual safety has turned into clinging: to objects, rituals, certainty, or control. Protection works best when it does not become fear-based possession.",
    "th": "ไพ่ถามว่าความปลอดภัยทางศรัทธากลายเป็นการยึดเกาะตรงไหน ไม่ว่าจะกับวัตถุ พิธี ความแน่นอน หรือการควบคุม การคุ้มครองจะเกื้อกูลที่สุดเมื่อไม่กลายเป็นความหวงจากความกลัว"
  },
  "68": {
    "en": "A sense of spiritual abandonment or exclusion may be present; the card points toward practical support, community, and warmth rather than assuming hardship means you have been forsaken.",
    "th": "อาจมีความรู้สึกถูกทิ้งหรืออยู่นอกพื้นที่ศรัทธา ไพ่ชี้ไปที่ความช่วยเหลือที่จับต้องได้ ชุมชน และความอบอุ่น มากกว่าสรุปว่าความลำบากแปลว่าคุณถูกสิ่งศักดิ์สิทธิ์ทอดทิ้ง"
  },
  "69": {
    "en": "The sacred theme is reciprocity: giving, receiving, generosity, offering, and the ethics of power. Spiritual support is reflected through balanced exchange rather than a named hidden patron.",
    "th": "แกนศักดิ์สิทธิ์คือการให้และรับ ความเอื้อเฟื้อ การถวายหรือแบ่งปัน และจริยธรรมของอำนาจ การหนุนช่วยทางจิตวิญญาณถูกสะท้อนผ่านการแลกเปลี่ยนที่สมดุล มากกว่าผู้คุ้มครองลึกลับที่มีชื่อเฉพาะ"
  },
  "70": {
    "en": "Spiritual growth is slow cultivation: patience, observation, and willingness to let practice mature before demanding signs, results, or certainty.",
    "th": "การเติบโตทางจิตวิญญาณคือการเพาะบ่มอย่างช้าๆ อดทน สังเกต และยอมให้การปฏิบัติสุกงอมก่อนเรียกร้องสัญญาณ ผลลัพธ์ หรือความแน่นอน"
  },
  "71": {
    "en": "The sacred is found in disciplined repetition, study, refinement, and humble practice; what becomes reliable is what you return to carefully over time.",
    "th": "ความศักดิ์สิทธิ์อยู่ในวินัยที่ทำซ้ำ การศึกษา การขัดเกลา และการฝึกอย่างถ่อมตน สิ่งที่น่าเชื่อถือคือสิ่งที่คุณกลับมาทำอย่างประณีตต่อเนื่อง"
  },
  "72": {
    "en": "Spiritual independence is grounded in self-trust, nature, cultivated skill, and enough solitude to hear your own values without needing constant confirmation.",
    "th": "ความเป็นอิสระทางจิตวิญญาณหยั่งอยู่กับความไว้ใจตัวเอง ธรรมชาติ ทักษะที่บ่มเพาะ และความสันโดษพอที่จะได้ยินคุณค่าของตัวเองโดยไม่ต้องขอการยืนยันตลอดเวลา"
  },
  "73": {
    "en": "Tradition, family legacy, ancestry, and inherited values are strong symbols here; they can shape a spiritual identity without proving literal communication from ancestors.",
    "th": "ประเพณี มรดกครอบครัว บรรพชน และคุณค่าที่สืบทอดเป็นสัญลักษณ์เด่น สิ่งเหล่านี้หล่อหลอมอัตลักษณ์ทางศรัทธาได้โดยไม่ต้องยืนยันว่ามีการสื่อสารจากบรรพชนจริง"
  },
  "74": {
    "en": "This card favors sincere study of spiritual ideas, symbols, texts, or practices; curiosity becomes wisdom when it is patient enough to learn foundations.",
    "th": "ไพ่ใบนี้สนับสนุนการศึกษาความคิด สัญลักษณ์ คัมภีร์ หรือการปฏิบัติทางจิตวิญญาณอย่างจริงใจ ความอยากรู้จะกลายเป็นปัญญาเมื่ออดทนเรียนฐานให้แน่น"
  },
  "75": {
    "en": "The spiritual path is steady, ordinary, and consistent: keep the practice, keep your promises, and let reliability matter more than dramatic experience.",
    "th": "เส้นทางทางจิตวิญญาณในไพ่ใบนี้มั่นคง ธรรมดา และสม่ำเสมอ รักษาการฝึก รักษาคำมั่น และให้ความน่าเชื่อถือสำคัญกว่าประสบการณ์หวือหวา"
  },
  "76": {
    "en": "Sacred care appears through the body, home, earth, food, resources, and the practical ability to make life safer and more nourishing for yourself and others.",
    "th": "การดูแลที่มีความศักดิ์สิทธิ์ปรากฏผ่านร่างกาย บ้าน ผืนดิน อาหาร ทรัพยากร และความสามารถจริงในการทำให้ชีวิตปลอดภัยและหล่อเลี้ยงขึ้นทั้งต่อตัวเองและผู้อื่น"
  },
  "77": {
    "en": "Spiritual stewardship is expressed through grounded authority, ethical use of resources, stability, and responsibility for what your influence creates in the real world.",
    "th": "การดูแลทางจิตวิญญาณปรากฏผ่านอำนาจที่ติดดิน การใช้ทรัพยากรอย่างมีจริยธรรม ความมั่นคง และความรับผิดชอบต่อสิ่งที่อิทธิพลของคุณสร้างขึ้นในโลกจริง"
  }
});

  function styleFor(card) {
    if (card.arcana === 'major') return MAJOR_STYLE[card.id] || { en: card.keywords.en.join(', '), th: card.keywords.th.join(' ') };
    const suit = SUIT_STYLE[String(card.suit || '').toLowerCase()] || { en: 'distinctive and grounded', th: 'มีเอกลักษณ์และเป็นธรรมชาติ' };
    const rank = RANK_STYLE[card.rank] || { en: '', th: '' };
    return {
      en: `${suit.en}${rank.en ? ` ${rank.en}` : ''}`,
      th: `${suit.th}${rank.th ? ` ${rank.th}` : ''}`
    };
  }

  function toneFor(card) {
    return TONE[card.index] ?? 0;
  }

  function toneLead(value, lang) {
    if (lang === 'th') {
      if (value >= 2) return 'ภาพรวมของไพ่เอนมาทางบวกค่อนข้างชัด';
      if (value === 1) return 'ภาพรวมของไพ่เอนมาทางบวก';
      if (value === 0) return 'ไพ่ไม่ได้ให้คำตอบแบบสูงหรือต่ำชัดๆ แต่ชี้ให้ดูคุณภาพบางอย่างในภาพรวม';
      if (value === -1) return 'ไพ่เอนมาทางระมัดระวัง และชี้ว่ามีบางอย่างบดบังจุดเด่นอยู่';
      return 'ไพ่ชี้ว่าความตึงหรือแรงกดดันบางอย่างอาจทำให้จุดเด่นของคุณถูกมองเห็นได้ยากในช่วงนี้';
    }
    if (value >= 2) return 'The card leans clearly positive overall';
    if (value === 1) return 'The card leans positive overall';
    if (value === 0) return 'The card does not reduce this to a simple high-or-low judgment; it points to the quality of the overall impression';
    if (value === -1) return 'The card leans cautious and suggests that something may be muting your strongest qualities';
    return 'The card suggests that tension or pressure may currently make your strongest qualities harder to see';
  }

  function contextText(card, domain, lang) {
    const key = lang === 'th' ? 'th' : 'en';
    if (domain === 'self_image' || domain === 'social_perception') return styleFor(card)[key];
    if (domain === 'spiritual_unseen') return SPIRITUAL_CONTEXT[card.id]?.[key] || card.upright[key];
    const lensKey = DOMAIN_LENS[domain];
    if (lensKey && card.dailyLenses?.[lensKey]?.[key]) return card.dailyLenses[lensKey][key];
    return card.upright[key];
  }

  function directSelf(card, analysis, lang) {
    const style = styleFor(card)[lang];
    const lead = toneLead(toneFor(card), lang);
    const publicView = analysis.perspective === 'public' || analysis.perspective === 'specific_other';
    if (lang === 'th') {
      if (analysis.facet === 'appearance' || analysis.facet === 'attractiveness' || analysis.questionType === 'evaluation') {
        return `${lead} ในเชิงสัญลักษณ์ เสน่ห์ที่ไพ่เน้นออกมาในลักษณะ ${style}${publicView ? ' ซึ่งเป็นคุณภาพที่มีผลต่อภาพรวมในสายตาคนอื่น ไม่ได้จำกัดอยู่แค่รูปหน้าเพียงอย่างเดียว' : ''}`;
      }
      if (analysis.questionType === 'perception' || publicView) return `ในเชิงสัญลักษณ์ คนอื่นมีแนวโน้มรับรู้คุณในแบบ ${style} ไพ่กำลังพูดถึงภาพรวมของบุคลิกและการวางตัว มากกว่าคะแนนตายตัวว่าคุณ “ดี” หรือ “ไม่ดี”`;
      return `${lead} ไพ่เน้นภาพของคนที่${style} มากกว่าการตัดสินคุณค่าของตัวเองด้วยเกณฑ์เดียว`;
    }
    if (analysis.facet === 'appearance' || analysis.facet === 'attractiveness' || analysis.questionType === 'evaluation') {
      return `${lead}. Symbolically, the appeal emphasized here feels ${style}${publicView ? '; that shapes how others receive your overall presence rather than judging facial features alone' : ''}.`;
    }
    if (analysis.questionType === 'perception' || publicView) return `Symbolically, others may read you as ${style}. The card is describing the overall impression of your personality and presence rather than assigning you a fixed score.`;
    return `${lead}. The card emphasizes a presence that feels ${style}, rather than reducing your self-image to one external standard.`;
  }

  function directSocial(card, analysis, lang) {
    const style = styleFor(card)[lang];
    if (lang === 'th') return `ในเชิงสัญลักษณ์ คนอื่นมีแนวโน้มรับรู้คุณในแบบที่${style} ไพ่ไม่ได้อ้างว่าอ่านใจทุกคนได้ แต่ชี้ถึงภาพรวมของพลังและการวางตัวที่คุณส่งออกไป`;
    return `Symbolically, others may read you as ${style}. The card is not claiming access to everyone's private opinion; it is describing the overall presence you may project.`;
  }

  function directSpiritual(card, analysis, lang) {
    const ctx = contextText(card, 'spiritual_unseen', lang);
    const facet = analysis.facet || 'general';
    if (lang === 'th') {
      if (facet === 'divine_protection') {
        const opener = analysis.questionType === 'identification'
          ? 'ไพ่ไม่สามารถระบุชื่อหรือยืนยันได้ว่ามีสิ่งศักดิ์สิทธิ์องค์ใดคุ้มครองคุณอยู่จริง'
          : 'ไพ่ไม่สามารถยืนยันได้ว่ามีสิ่งศักดิ์สิทธิ์หรือผู้คุ้มครองเหนือธรรมชาติอยู่กับคุณจริง';
        return `${opener} แต่ถ้าอ่านในฐานะภาษาสัญลักษณ์ ${card.title.th} ชวนมองว่า ${ctx}`;
      }
      if (facet === 'unseen_influence') return `ไพ่ไม่สามารถยืนยันว่ามีวิญญาณ คำสาป มนต์ดำ หรือสิ่งเร้นลับกำลังติดตามหรือทำร้ายคุณอยู่ และความกลัวไม่ควรถูกใช้เป็นหลักฐานของสิ่งนั้น ในเชิงสัญลักษณ์ ${card.title.th} ชวนมองว่า ${ctx}`;
      if (facet === 'past_life') return `ไพ่ไม่สามารถพิสูจน์หรือระบุว่าอดีตชาติของคุณเคยเป็นใครจริง ในเชิงสัญลักษณ์ ${card.title.th} ใช้เรื่องอดีตชาติเป็นกระจกส่องรูปแบบ ความคุ้นเคย หรือบทเรียนที่คุณกำลังเชื่อมโยงกับชีวิตปัจจุบัน: ${ctx}`;
      if (facet === 'dreams') return `ไพ่ไม่สามารถยืนยันว่าความฝันเป็นคำพยากรณ์หรือข้อความจากสิ่งเหนือธรรมชาติ แต่สามารถใช้สัญลักษณ์ช่วยสำรวจสิ่งที่ความฝันกำลังแตะในใจคุณได้ ${card.title.th} ชวนมองว่า ${ctx}`;
      if (facet === 'signs_synchronicity') return `ไพ่ไม่สามารถพิสูจน์ว่าเหตุบังเอิญหรือลางใดเป็นสัญญาณจากภายนอกจริง แต่ในเชิงสัญลักษณ์ ${card.title.th} ชวนให้สังเกตว่า ${ctx}`;
      if (facet === 'spiritual_gifts') return `ไพ่ไม่สามารถตรวจหรือรับรองว่าคุณมีญาณ พลังพิเศษ หรือความสามารถเหนือธรรมชาติจริง แต่สามารถสะท้อนวิธีที่คุณใช้สัญชาตญาณ ความไว และการสังเกตได้ ${card.title.th} ชวนมองว่า ${ctx}`;
      if (facet === 'karma_destiny') return `ไพ่ไม่สามารถยืนยันกฎกรรมส่วนบุคคลหรือโชคชะตาที่ถูกกำหนดไว้เป็นข้อเท็จจริง แต่ในเชิงสัญลักษณ์ ${card.title.th} ชวนมองรูปแบบของเหตุปัจจัย การเลือก และผลที่สืบเนื่องกันว่า ${ctx}`;
      if (facet === 'spiritual_path') return `ในคำถามเรื่องเส้นทางทางจิตวิญญาณ ${card.title.th} ไม่จำเป็นต้องทำหน้าที่เป็นคำสั่งจากสิ่งเหนือธรรมชาติ แต่ใช้เป็นภาษาสัญลักษณ์เพื่อชี้มุมที่ควรพิจารณา: ${ctx}`;
      return `ไพ่ไม่สามารถยืนยันข้อเท็จจริงเหนือธรรมชาติได้ แต่ในเชิงสัญลักษณ์ ${card.title.th} ชวนมองคำถามนี้ผ่านมุมว่า ${ctx}`;
    }
    if (facet === 'divine_protection') {
      const opener = analysis.questionType === 'identification'
        ? 'Tarot cannot name or verify a specific deity, guardian, or sacred being as literally protecting you'
        : 'Tarot cannot verify that a supernatural protector is literally present with you';
      return `${opener}. Read as symbolic language, ${card.title.en} points toward this theme: ${ctx}`;
    }
    if (facet === 'unseen_influence') return `Tarot cannot verify that a ghost, curse, black magic, or other unseen force is following or harming you, and fear should not be treated as evidence of one. Symbolically, ${card.title.en} points toward this theme: ${ctx}`;
    if (facet === 'past_life') return `Tarot cannot prove or identify who you literally were in a past life. Symbolically, ${card.title.en} can use the past-life question as a mirror for patterns, familiarity, or lessons you connect with your present life: ${ctx}`;
    if (facet === 'dreams') return `Tarot cannot establish that a dream is prophecy or a message from a supernatural source, but its symbols can help explore what the dream is touching in you. ${card.title.en} points toward this theme: ${ctx}`;
    if (facet === 'signs_synchronicity') return `Tarot cannot prove that a coincidence or omen is an external sign, but symbolically ${card.title.en} invites you to notice this pattern: ${ctx}`;
    if (facet === 'spiritual_gifts') return `Tarot cannot test or certify psychic powers or supernatural abilities, but it can reflect how intuition, sensitivity, and observation may be working for you. ${card.title.en} points toward this theme: ${ctx}`;
    if (facet === 'karma_destiny') return `Tarot cannot verify a personal cosmic sentence or fixed destiny as fact. Symbolically, ${card.title.en} invites you to examine patterns of cause, choice, and consequence through this theme: ${ctx}`;
    if (facet === 'spiritual_path') return `For a spiritual-path question, ${card.title.en} does not need to function as an order from a supernatural source; it can serve as symbolic language for what deserves reflection: ${ctx}`;
    return `Tarot cannot verify supernatural claims as facts, but symbolically ${card.title.en} invites you to view the question through this theme: ${ctx}`;
  }

  function directFromContext(card, analysis, lang) {
    const domain = analysis.domain || 'general';
    const ctx = contextText(card, domain, lang);
    const tone = toneFor(card);

    if (domain === 'self_image') return directSelf(card, analysis, lang);
    if (domain === 'social_perception') return directSocial(card, analysis, lang);
    if (domain === 'spiritual_unseen') return directSpiritual(card, analysis, lang);

    if (lang === 'th') {
      if (analysis.questionType === 'feelings' || (domain === 'love_relationships' && analysis.perspective === 'specific_other')) {
        return `ไพ่ไม่สามารถยืนยันความรู้สึกส่วนตัวของอีกคนแทนเขาได้ แต่ในเชิงสัญลักษณ์ ความสัมพันธ์นี้สะท้อนว่า ${ctx}`;
      }
      if (analysis.questionType === 'decision') {
        const lead = tone >= 1 ? 'น้ำหนักของไพ่เอนให้เดินต่ออย่างมีสติ' : tone <= -1 ? 'น้ำหนักของไพ่เอนให้ชะลอและตรวจเงื่อนไขก่อน' : 'ไพ่ไม่ได้ให้คำตอบแบบใช่หรือไม่ใช่ทันที แต่ให้ตัดสินจากเงื่อนไขที่ชัดขึ้น';
        return `${lead} ${ctx}`;
      }
      if (analysis.questionType === 'timing') return `ไพ่ใบนี้เหมาะกับการอ่าน “คุณภาพของจังหวะ” มากกว่าระบุวันเวลาแน่นอน ${ctx}`;
      if (analysis.questionType === 'cause') return `ปัจจัยที่ไพ่ชี้ให้มองอยู่ที่แกนของเรื่องนี้: ${ctx}`;
      if (analysis.questionType === 'outlook') {
        const lead = tone >= 1 ? 'แนวโน้มเชิงสัญลักษณ์เปิดทางไปในด้านที่สนับสนุนมากกว่า' : tone <= -1 ? 'แนวโน้มเชิงสัญลักษณ์ยังมีแรงต้านหรือสิ่งที่ควรระวัง' : 'แนวโน้มยังผสมกันและขึ้นอยู่กับวิธีที่สถานการณ์ถูกจัดการ';
        return `${lead} ${ctx}`;
      }
      if (analysis.questionType === 'evaluation') return `${toneLead(tone, lang)} ${ctx}`;
      return ctx;
    }

    if (analysis.questionType === 'feelings' || (domain === 'love_relationships' && analysis.perspective === 'specific_other')) {
      return `Tarot cannot verify another person's private feelings for them, but symbolically this connection points to the following dynamic: ${ctx}`;
    }
    if (analysis.questionType === 'decision') {
      const lead = tone >= 1 ? 'The card leans toward moving forward deliberately' : tone <= -1 ? 'The card leans toward slowing down and checking the conditions first' : 'The card does not give a clean yes/no; it asks for a more grounded decision';
      return `${lead}. ${ctx}`;
    }
    if (analysis.questionType === 'timing') return `This card is better read as the quality of the timing than as a fixed date. ${ctx}`;
    if (analysis.questionType === 'cause') return `The card points to this as a meaningful factor behind the situation: ${ctx}`;
    if (analysis.questionType === 'outlook') {
      const lead = tone >= 1 ? 'The symbolic direction is more supportive than obstructed' : tone <= -1 ? 'The symbolic direction still carries resistance or a caution flag' : 'The symbolic direction remains mixed and depends on how the situation is handled';
      return `${lead}. ${ctx}`;
    }
    if (analysis.questionType === 'evaluation') return `${toneLead(tone, lang)}. ${ctx}`;
    return ctx;
  }

  function rationale(card, analysis, lang) {
    const domain = analysis.domain || 'general';
    const label = ANALYZER.label(domain, lang);
    const keyWords = card.keywords[lang].slice(0, 3).join(lang === 'th' ? ' · ' : ' · ');
    const ctx = contextText(card, domain, lang);
    if (lang === 'th') {
      if (domain === 'spiritual_unseen') return `${card.title.th} มีแกนของไพ่อยู่ที่ ${keyWords} เมื่อนำมาวางกับคำถามเรื่อง${label} ไพ่จึงถูกใช้เป็นภาษาสัญลักษณ์ ไม่ใช่หลักฐานว่าปรากฏการณ์เหนือธรรมชาตินั้นเกิดขึ้นจริง ความหมายที่สัมพันธ์กับคำถามนี้คือ ${ctx}`;
      if (domain === 'self_image' || domain === 'social_perception') {
        return `${card.title.th} มีแกนของไพ่อยู่ที่ ${keyWords} เมื่อนำมาวางกับคำถามเรื่อง${label} จึงไม่ได้ตัดสินแค่รูปลักษณ์ภายนอก แต่ให้น้ำหนักกับ “ความรู้สึกที่คนได้รับจากการมีตัวตนของคุณ” ซึ่งในไพ่ใบนี้ออกมาในลักษณะ ${ctx}`;
      }
      return `${card.title.th} มีแกนของไพ่อยู่ที่ ${keyWords} เมื่อนำมาวางกับคำถามเรื่อง${label} ความหมายจึงถูกอ่านผ่านบริบทนี้: ${ctx}`;
    }
    if (domain === 'spiritual_unseen') return `${card.title.en} centers on ${keyWords}. Applied to ${label.toLowerCase()}, the card is being used as symbolic language rather than evidence that a supernatural event is literally occurring. The relevant theme is: ${ctx}`;
    if (domain === 'self_image' || domain === 'social_perception') {
      return `${card.title.en} centers on ${keyWords}. Applied to ${label.toLowerCase()}, the card shifts attention away from appearance alone and toward the impression created by your whole presence: ${ctx}.`;
    }
    return `${card.title.en} centers on ${keyWords}. Applied to ${label.toLowerCase()}, that symbolism is read through this context: ${ctx}`;
  }

  function reflectionFor(analysis, lang) {
    const domain = analysis.domain || 'general';
    if (analysis.facet === 'appearance' || analysis.facet === 'attractiveness') {
      return lang === 'th'
        ? 'ถ้าไม่ต้องขอคะแนนจากทุกคน คุณอยากให้ความน่าดึงดูดของตัวเองถูกจดจำจากรูปลักษณ์ บุคลิก หรือวิธีปฏิบัติต่อคนอื่นมากที่สุด?'
        : 'If you did not need a score from everyone, what would you most want your attractiveness to be remembered for: appearance, personality, or the way you treat people?';
    }
    if (analysis.facet === 'feelings') {
      return lang === 'th'
        ? 'พฤติกรรมอะไรของอีกฝ่ายที่คุณสังเกตได้จริง และมันสอดคล้องหรือขัดกับสิ่งที่คุณหวังว่าเขารู้สึกอย่างไร?'
        : 'What behavior from the other person can you actually observe, and how does it support or challenge what you hope they feel?';
    }
    if (analysis.facet === 'divine_protection') return lang === 'th'
      ? 'ถ้าไม่ต้องระบุชื่อผู้คุ้มครอง คุณเห็น “การได้รับการประคอง” ในชีวิตจริงผ่านคน หลักคิด การปฏิบัติ หรือเหตุการณ์แบบไหนบ้าง?'
      : 'Without needing to name a protector, where do you actually experience support in your life: through people, principles, practice, or events?';
    if (analysis.facet === 'unseen_influence') return lang === 'th'
      ? 'มีข้อเท็จจริงหรือสิ่งที่ตรวจสอบได้อะไรบ้างที่ช่วยแยกความกลัวออกจากสิ่งที่กำลังเกิดขึ้นจริงในสถานการณ์นี้?'
      : 'What observable facts could help you separate fear from what is actually happening in this situation?';
    if (analysis.facet === 'dreams') return lang === 'th'
      ? 'อารมณ์ ภาพ หรือเหตุการณ์ใดในความฝันยังติดอยู่กับคุณที่สุด และมันเชื่อมกับชีวิตยามตื่นตรงไหน?'
      : 'Which emotion, image, or event from the dream stays with you most, and where does it connect with waking life?';
    if (analysis.facet === 'signs_synchronicity') return lang === 'th'
      ? 'ถ้าเหตุการณ์นี้มีคุณค่าในฐานะสัญลักษณ์โดยไม่ต้องพิสูจน์ว่าเป็นลาง มันกำลังทำให้คุณหันไปมองอะไรในชีวิต?'
      : 'If this event can be meaningful without needing to prove it is a sign, what is it drawing your attention toward in your life?';
    if (analysis.facet === 'spiritual_gifts') return lang === 'th'
      ? 'ความไวหรือสัญชาตญาณของคุณแม่นที่สุดในสถานการณ์แบบไหน และคุณใช้วิธีอะไรตรวจว่าความรู้สึกนั้นสอดคล้องกับความจริง?'
      : 'When does your intuition seem most reliable, and how do you check whether that feeling matches reality?';
    if (analysis.facet === 'past_life') return lang === 'th'
      ? 'เรื่องราวของอดีตชาติที่ดึงดูดคุณกำลังสะท้อนคุณค่า ความกลัว หรือรูปแบบใดในชีวิตปัจจุบัน?'
      : 'What value, fear, or recurring pattern in your present life is reflected in the past-life story that draws you?';
    if (analysis.facet === 'karma_destiny') return lang === 'th'
      ? 'ในสิ่งที่คุณเรียกว่า “กรรม” หรือ “ชะตา” ส่วนไหนเป็นรูปแบบที่มองเห็นได้จากการเลือก เงื่อนไข และผลที่เกิดซ้ำจริง?'
      : 'Within what you call karma or fate, what pattern can you actually see in repeated choices, conditions, and consequences?';
    return (DOMAIN_REFLECTION[domain] || DOMAIN_REFLECTION.general)[lang];
  }

  function interpret(cardOrId, analysis, lang = 'en') {
    const card = typeof cardOrId === 'string' ? CONTENT.getCard(cardOrId) : cardOrId;
    if (!card) return null;
    const safeLang = lang === 'th' ? 'th' : 'en';
    const safeAnalysis = analysis || { domain: 'general', facet: 'general', questionType: 'open', perspective: 'general' };
    return Object.freeze({
      version: VERSION,
      contextKey: safeAnalysis.domain || 'general',
      contextLabel: ANALYZER.label(safeAnalysis.domain || 'general', safeLang),
      direct: directFromContext(card, safeAnalysis, safeLang),
      rationale: rationale(card, safeAnalysis, safeLang),
      reflection: reflectionFor(safeAnalysis, safeLang),
      tone: toneFor(card)
    });
  }

  window.LGTAskContext = Object.freeze({
    version: VERSION,
    interpret,
    contextText,
    toneFor,
    spiritualContextCount: Object.keys(SPIRITUAL_CONTEXT).length
  });
})();

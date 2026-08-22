(() => {
  'use strict';

  const VERSION = 'question-analyzer-v2';

  const DOMAIN_ORDER = Object.freeze([
    'self_image',
    'social_perception',
    'love_relationships',
    'work_purpose',
    'money_resources',
    'choice_action',
    'outlook_opportunity',
    'inner_growth',
    'spiritual_unseen'
  ]);

  const LABELS = Object.freeze({
    self_image: { en: 'Self-image & attractiveness', th: 'ภาพลักษณ์และเสน่ห์' },
    social_perception: { en: 'How others may see you', th: 'มุมมองของคนอื่นที่มีต่อคุณ' },
    love_relationships: { en: 'Love & relationships', th: 'ความรักและความสัมพันธ์' },
    work_purpose: { en: 'Work & direction', th: 'งานและทิศทางชีวิต' },
    money_resources: { en: 'Money & resources', th: 'เงินและทรัพยากร' },
    choice_action: { en: 'Choice & action', th: 'การตัดสินใจและการลงมือ' },
    outlook_opportunity: { en: 'Outlook & opportunity', th: 'แนวโน้มและโอกาส' },
    inner_growth: { en: 'Inner state & growth', th: 'สภาวะใจและการเติบโตภายใน' },
    spiritual_unseen: { en: 'Spiritual & unseen', th: 'ศรัทธา จิตวิญญาณ และสิ่งเร้นลับ' },
    general: { en: 'General reflection', th: 'การทบทวนภาพรวม' }
  });

  const normalize = (value) => String(value ?? '')
    .normalize('NFC')
    .toLocaleLowerCase('en-US')
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  function has(text, terms) {
    return terms.some((term) => {
      if (term instanceof RegExp) return term.test(text);
      return text.includes(term);
    });
  }

  function countHits(text, terms) {
    return terms.reduce((score, term) => score + (has(text, [term]) ? 1 : 0), 0);
  }

  const SIGNALS = Object.freeze({
    self_image: [
      'หน้าตา', 'หน้าตาดี', 'หล่อ', 'สวย', 'ดูดี', 'มีเสน่ห์', 'น่าดึงดูด', 'รูปลักษณ์', 'ภาพลักษณ์', 'บุคลิกของฉัน', 'ความมั่นใจในตัวเอง',
      /\b(?:handsome|beautiful|pretty|good[- ]?looking|attractive|appearance|looks?|self[- ]?image|my personality|my confidence)\b/i
    ],
    social_perception: [
      'คนอื่นมอง', 'เขามองฉัน', 'เขามองผม', 'เขาคิดว่าฉัน', 'เขาคิดว่าผม', 'ในสายตาคนอื่น', 'ในสายตาชาวโลก', 'ภาพที่คนเห็น', 'ชื่อเสียง', 'ความประทับใจแรก',
      /\b(?:how (?:do|does) .* see me|how .* sees me|what .* think(?:s)? of me|others see me|public image|reputation|first impression)\b/i
    ],
    love_relationships: [
      'ความรัก', 'แฟน', 'คนรัก', 'คนคุย', 'คู่รัก', 'สามี', 'ภรรยา', 'เขารัก', 'เธอรัก', 'รู้สึกกับฉัน', 'รู้สึกกับผม', 'ความสัมพันธ์', 'คืนดี', 'เลิกกัน', 'แฟนเก่า', 'คนเก่า',
      /\b(?:love|relationship|partner|boyfriend|girlfriend|husband|wife|crush|ex\b|reconcile|romantic|feelings? for me)\b/i
    ],
    work_purpose: [
      'งาน', 'อาชีพ', 'การงาน', 'หัวหน้า', 'บริษัท', 'โปรเจกต์', 'โครงการ', 'ธุรกิจ', 'เรียน', 'การเรียน', 'สอบ', 'มหาวิทยาลัย', 'เลื่อนตำแหน่ง', 'สมัครงาน',
      /\b(?:job|work|career|boss|company|project|business|study|school|university|exam|promotion|interview)\b/i
    ],
    money_resources: [
      'เงิน', 'การเงิน', 'รายได้', 'เงินเดือน', 'หนี้', 'ลงทุน', 'การลงทุน', 'หุ้น', 'คริปโต', 'ทรัพย์สิน', 'ค่าใช้จ่าย', 'กำไร', 'ขาดทุน',
      /\b(?:money|finances?|income|salary|debt|invest(?:ment|ing)?|stock|crypto|asset|expense|profit|loss)\b/i
    ],
    choice_action: [
      'ควรทำ', 'ควรเลือก', 'เลือกทาง', 'ตัดสินใจ', 'เดินหน้าหรือ', 'ไปต่อไหม', 'หยุดไหม', 'ควรรับ', 'ควรลาออก', 'ควรย้าย', 'ควรซื้อ', 'ควรขาย',
      /\b(?:should i|which should i choose|what should i do|do i take|do i leave|move forward|walk away|quit|accept or|choose between)\b/i
    ],
    outlook_opportunity: [
      'จะเป็นยังไง', 'จะเป็นอย่างไร', 'แนวโน้ม', 'อนาคต', 'มีโอกาส', 'โอกาสไหม', 'จะเกิดอะไร', 'จะสำเร็จไหม', 'จะดีขึ้นไหม', 'จะกลับมาไหม',
      /\b(?:what will happen|how will .* go|future|outlook|chance|opportunity|likely to|will .* improve|will .* succeed|will .* come back)\b/i
    ],
    inner_growth: [
      'รู้สึก', 'ความรู้สึกของฉัน', 'สภาพใจ', 'จิตใจ', 'กังวล', 'กลัว', 'เครียด', 'เยียวยา', 'เติบโต', 'ปล่อยวาง', 'เข้าใจตัวเอง', 'สมดุลชีวิต', 'หมดไฟ',
      /\b(?:how do i feel|my feelings|inner state|anxious|anxiety|afraid|fear|stress|healing|growth|let go|understand myself|balance|burnout)\b/i
    ],
    spiritual_unseen: [
      'สิ่งศักดิ์สิทธิ์', 'องค์ไหนคุ้มครอง', 'คุ้มครองอยู่ไหม', 'เทวดาประจำตัว', 'เทพคุ้มครอง', 'เทพประจำตัว', 'พระพิฆเนศ', 'พญานาค', 'ครูบาอาจารย์ทางจิตวิญญาณ',
      'เรื่องทางจิตวิญญาณ', 'เส้นทางจิตวิญญาณ', 'ปฏิบัติธรรม', 'ภาวนา', 'ลาง', 'สัญญาณจากจักรวาล', 'เลขซ้ำ', 'angel number', 'synchronicity', 'ความฝัน', 'ทำนายฝัน', 'ฝันว่า', 'ญาณ', 'สัมผัสที่หก', 'ลางสังหรณ์', 'พลังพิเศษ',
      'กรรม', 'กรรมเก่า', 'บุญเก่า', 'เจ้ากรรมนายเวร', 'โชคชะตา', 'พรหมลิขิต', 'อดีตชาติ', 'ชาติที่แล้ว', 'ชาติภพ', 'วิญญาณ', 'ผีตาม', 'ของใส่', 'ทำของ', 'คุณไสย', 'ของดำ', 'มนต์ดำ', 'คำสาป', 'อาถรรพ์',
      /\b(?:deity|guardian deity|patron deity|sacred being|ganesha|buddha|naga|which god|which goddess|divine protection|protecting me|guardian angel|spirit guide|spiritual guide|spiritual path|sacred path|meditation practice|synchronicit(?:y|ies)|omen|angel number|repeating number|sign from the universe|dream meaning|my dream|had a dream|prophetic dream|premonition|psychic|mediumship|sixth sense|spiritual gift|karma|destiny|fate|past life|previous life|reincarnation|ghost|spirit around me|spirit in my|spirit following|unseen presence|negative entity|haunted|curse|black magic|evil eye|hex|possession)\b/i
    ]
  });

  const FACETS = Object.freeze({
    appearance: ['หน้าตา', 'หล่อ', 'สวย', 'ดูดี', 'รูปลักษณ์', /\b(?:handsome|beautiful|pretty|good[- ]?looking|appearance|looks?)\b/i],
    attractiveness: ['มีเสน่ห์', 'น่าดึงดูด', 'เซ็กซี่', /\b(?:attractive|attractiveness|charming|charm|sexy)\b/i],
    confidence: ['ความมั่นใจ', 'มั่นใจในตัวเอง', /\b(?:confidence|confident)\b/i],
    personality: ['บุคลิก', 'นิสัย', 'ตัวตน', /\b(?:personality|character|who i am)\b/i],
    first_impression: ['ความประทับใจแรก', 'แรกเห็น', /\b(?:first impression|at first sight)\b/i],
    reputation: ['ชื่อเสียง', 'ภาพลักษณ์สังคม', /\b(?:reputation|public image)\b/i],
    feelings: ['เขารัก', 'เธอรัก', 'รู้สึกกับ', 'ความรู้สึกของเขา', 'ความรู้สึกของเธอ', /\b(?:love me|feel(?:s|ing)? about me|feelings? for me)\b/i],
    reconciliation: ['คืนดี', 'กลับมาคบ', 'รีเทิร์น', /\b(?:reconcile|reconciliation|get back together)\b/i],
    career_direction: ['อาชีพ', 'เส้นทางงาน', 'ทิศทางงาน', /\b(?:career direction|career path)\b/i],
    new_opportunity: ['งานใหม่', 'ข้อเสนองาน', 'สมัครงาน', 'สัมภาษณ์', /\b(?:new job|job offer|interview|new opportunity)\b/i],
    investment: ['ลงทุน', 'หุ้น', 'คริปโต', /\b(?:invest|stock|crypto)\b/i],
    debt: ['หนี้', 'เจ้าหนี้', /\b(?:debt|owe|creditor)\b/i],
    self_worth: ['คุณค่าในตัวเอง', 'ดีพอไหม', /\b(?:self[- ]?worth|good enough)\b/i],
    divine_protection: ['สิ่งศักดิ์สิทธิ์', 'องค์ไหนคุ้มครอง', 'คุ้มครองอยู่ไหม', 'เทวดาประจำตัว', 'เทพคุ้มครอง', 'เทพประจำตัว', 'พระพิฆเนศคุ้มครอง', 'พญานาคคุ้มครอง', /\b(?:deity|guardian deity|patron deity|sacred being|ganesha|buddha|naga|which god|which goddess|divine protection|protecting me|guardian angel|spirit guide)\b/i],
    spiritual_path: ['เส้นทางจิตวิญญาณ', 'ทางธรรม', 'ศรัทธาของฉัน', 'การปฏิบัติทางจิตวิญญาณ', 'ปฏิบัติธรรม', 'ภาวนา', /\b(?:spiritual path|sacred path|my faith|spiritual practice|spiritual direction|meditation practice|contemplative path)\b/i],
    signs_synchronicity: ['ลาง', 'สัญญาณจากจักรวาล', 'สัญญาณจากสิ่งศักดิ์สิทธิ์', 'เหตุบังเอิญมีความหมาย', 'เลขซ้ำ', 'เห็นเลขเดิม', '11:11', 'angel number', 'synchronicity', /\b(?:synchronicit(?:y|ies)|omen|angel number|repeating number|11:11|sign from the universe|divine sign|meaningful coincidence)\b/i],
    dreams: ['ความฝัน', 'ทำนายฝัน', 'ฝันเมื่อคืน', 'ฝันซ้ำ', 'ฝันว่า', /\b(?:dream meaning|what does my dream mean|my dream|had a dream|dreamt|dreamed|dream last night|recurring dream|prophetic dream)\b/i],
    spiritual_gifts: ['มีญาณ', 'ญาณทิพย์', 'ญาณหยั่งรู้', 'สัมผัสที่หก', 'พลังพิเศษ', 'พลังทางจิต', 'ไวต่อพลังงาน', 'ลางสังหรณ์', 'เห็นอนาคต', /\b(?:psychic|mediumship|premonition|sixth sense|spiritual gift|intuitive gift|clairvoy|sensitive to energy)\b/i],
    karma_destiny: ['กรรม', 'กรรมเก่า', 'บุญเก่า', 'เจ้ากรรมนายเวร', 'โชคชะตา', 'พรหมลิขิต', 'ชะตา', /\b(?:karma|destiny|fate|karmic|meant to be)\b/i],
    past_life: ['อดีตชาติ', 'ชาติที่แล้ว', 'ชาติภพ', 'กลับชาติมาเกิด', /\b(?:past life|previous life|reincarnation|reincarnated)\b/i],
    unseen_influence: ['วิญญาณ', 'ผีตาม', 'สิ่งไม่ดีตาม', 'ของใส่', 'ทำของ', 'คุณไสย', 'ของดำ', 'มนต์ดำ', 'คำสาป', 'ถูกสาป', 'อาถรรพ์', /\b(?:ghost|spirit around me|spirit in my|spirit following|unseen presence|haunted|curse|cursed|black magic|evil eye|hex|possession|evil spirit|negative entity)\b/i]
  });

  const TYPE_SIGNALS = Object.freeze({
    evaluation: ['แค่ไหน', 'ดีไหม', 'ดีแค่ไหน', 'เป็นยังไง', 'เป็นอย่างไร', 'มากน้อยแค่ไหน', /\b(?:how (?:good|bad|attractive|strong|much)|am i .* enough|is .* good)\b/i],
    perception: ['คนอื่นมอง', 'มองฉัน', 'มองผม', 'ในสายตา', 'คิดว่าฉัน', 'คิดว่าผม', /\b(?:see me|sees me|think of me|view me|perceive me)\b/i],
    feelings: ['รู้สึกกับฉัน', 'รู้สึกกับผม', 'รักฉันไหม', 'รักผมไหม', /\b(?:feel about me|feelings? for me|love me)\b/i],
    decision: ['ควร', 'เลือก', 'ตัดสินใจ', 'ไปต่อ', 'หยุด', /\b(?:should i|which .* choose|do i .* or|better to)\b/i],
    guidance: ['ทำยังไง', 'ทำอย่างไร', 'รับมือ', 'จัดการยังไง', 'ควรทำอะไร', /\b(?:what should i do|how should i|how do i handle|how can i deal)\b/i],
    outlook: ['จะเป็น', 'จะเกิด', 'อนาคต', 'แนวโน้ม', 'มีโอกาส', 'ดีขึ้นไหม', 'จะสำเร็จไหม', /\b(?:what will|how will|future|outlook|chance|likely)\b/i],
    cause: ['ทำไม', 'เพราะอะไร', 'สาเหตุ', 'อะไรทำให้', /\b(?:why|what caused|what causes|reason)\b/i],
    timing: ['เมื่อไหร่', 'ตอนไหน', 'อีกนานไหม', /\b(?:when|how soon|how long until)\b/i]
  });

  const PERSPECTIVE_SIGNALS = Object.freeze({
    public: ['ชาวโลก', 'คนทั่วไป', 'คนอื่น', 'สังคม', 'ในสายตาคนอื่น', /\b(?:the world|people in general|others|public|society)\b/i],
    specific_other: ['เขา', 'เธอ', 'คนนั้น', 'คนนี้', /\b(?:he|she|they|that person|this person)\b/i],
    self: ['ฉัน', 'ผม', 'เรา', 'ตัวเอง', /\b(?:i|me|myself|my)\b/i]
  });

  const TIME_SIGNALS = Object.freeze({
    past: ['ที่ผ่านมา', 'เมื่อก่อน', 'อดีต', /\b(?:past|before|previously|used to)\b/i],
    present: ['ตอนนี้', 'ตอนนี้เลย', 'ปัจจุบัน', 'วันนี้', /\b(?:now|currently|today|at present)\b/i],
    future: ['อนาคต', 'ต่อไป', 'ข้างหน้า', /\b(?:future|later|next|going forward)\b/i]
  });

  const BOUNDARIES = Object.freeze([
    {
      key: 'medical',
      patterns: ['เป็นมะเร็งไหม', 'เป็นโรคอะไร', 'ตั้งครรภ์ไหม', 'จะหายจากโรคไหม', /\b(?:do i have cancer|what disease do i have|am i pregnant|diagnos(?:e|is)|will i recover from .* disease)\b/i]
    },
    {
      key: 'legal',
      patterns: ['ชนะคดีไหม', 'ติดคุกไหม', 'ศาลจะตัดสิน', /\b(?:will i win (?:the )?(?:case|lawsuit)|will i go to jail|court verdict|will i be convicted)\b/i]
    },
    {
      key: 'gambling',
      patterns: ['เลขเด็ด', 'หวย', 'ล็อตเตอรี่', 'พนัน', 'คาสิโน', /\b(?:winning lottery|lottery number|what number will win|betting|casino)\b/i]
    },
    {
      key: 'financial',
      patterns: ['หุ้นตัวนี้จะขึ้นไหม', 'คริปโตตัวนี้จะขึ้นไหม', 'กำไรแน่ไหม', 'ควรทุ่มเงินทั้งหมด', /\b(?:will this stock go up|will this crypto go up|guaranteed profit|guaranteed return|invest all my money|put all my money)\b/i]
    },
    {
      key: 'death',
      patterns: ['จะตายเมื่อไหร่', 'จะตายไหม', 'ใครจะตาย', /\b(?:when will i die|will i die|when will .* die)\b/i]
    }
  ]);

  function detectFacet(text) {
    // Thai has no whitespace word boundaries, so potentially overlapping spiritual terms
    // are resolved from the most specific/risk-sensitive facet to the broadest.
    const spiritualPriority = ['unseen_influence','dreams','divine_protection','past_life','spiritual_gifts','karma_destiny','signs_synchronicity','spiritual_path'];
    for (const key of spiritualPriority) {
      if (has(text, FACETS[key])) return key;
    }
    for (const [key, terms] of Object.entries(FACETS)) {
      if (spiritualPriority.includes(key)) continue;
      if (has(text, terms)) return key;
    }
    return 'general';
  }

  function detectType(text, facet = 'general') {
    const spiritualFacets = new Set(['divine_protection','spiritual_path','signs_synchronicity','dreams','spiritual_gifts','karma_destiny','past_life','unseen_influence']);
    if (spiritualFacets.has(facet)) {
      if (has(text, ['องค์ไหน', 'คือใคร', 'เป็นใคร', 'ใครคุ้มครอง', 'อะไรคุ้มครอง', 'เคยเป็นใคร', /\b(?:which deity|which god|which goddess|who (?:is|was)|what spirit|what entity|who protects me|who is my spirit guide)\b/i])) return 'identification';
      if (has(text, ['หรือไม่', 'หรือเปล่า', 'ไหม', 'มั้ย', 'จริงไหม', 'จริงหรือ', /\b(?:is there|do i have|am i protected|is .* real|are there|does .* exist|is .* following me|was i)\b/i])) return 'verification';
    }
    const degreeEvaluation = ['แค่ไหน', 'มากน้อยแค่ไหน', /\bhow (?:good|bad|attractive|strong|much)\b/i];
    if (has(text, degreeEvaluation)) return 'evaluation';
    const priority = ['timing', 'cause', 'feelings', 'perception', 'decision', 'guidance', 'outlook', 'evaluation'];
    for (const key of priority) {
      if (countHits(text, TYPE_SIGNALS[key]) > 0) return key;
    }
    return 'open';
  }

  function detectPerspective(text) {
    if (has(text, PERSPECTIVE_SIGNALS.public)) return 'public';
    if (has(text, PERSPECTIVE_SIGNALS.specific_other)) return 'specific_other';
    if (has(text, PERSPECTIVE_SIGNALS.self)) return 'self';
    return 'general';
  }

  function detectTimeframe(text) {
    if (has(text, TIME_SIGNALS.future)) return 'future';
    if (has(text, TIME_SIGNALS.past)) return 'past';
    if (has(text, TIME_SIGNALS.present)) return 'present';
    return 'unspecified';
  }

  function detectBoundary(text) {
    for (const rule of BOUNDARIES) {
      if (has(text, rule.patterns)) return rule.key;
    }
    return null;
  }

  function scoreDomains(text, facet) {
    const scores = Object.fromEntries(DOMAIN_ORDER.map((key) => [key, 0]));
    for (const key of DOMAIN_ORDER) scores[key] += countHits(text, SIGNALS[key]) * 3;

    // Facets are stronger than generic topic words.
    if (['appearance', 'attractiveness', 'confidence', 'personality', 'self_worth'].includes(facet)) scores.self_image += 8;
    if (['first_impression', 'reputation'].includes(facet)) scores.social_perception += 8;
    if (['feelings', 'reconciliation'].includes(facet)) scores.love_relationships += 8;
    if (['career_direction', 'new_opportunity'].includes(facet)) scores.work_purpose += 8;
    if (['investment', 'debt'].includes(facet)) scores.money_resources += 8;
    if (['divine_protection','spiritual_path','signs_synchronicity','dreams','spiritual_gifts','karma_destiny','past_life','unseen_influence'].includes(facet)) scores.spiritual_unseen += 10;

    // "How others see me" modifies a self-image question rather than automatically replacing it.
    if (scores.self_image >= 8 && scores.social_perception > 0) scores.social_perception = Math.min(scores.social_perception, scores.self_image - 3);

    // A clear spiritual facet is the subject of the question, even when the question mentions work, love, or money as background.
    if (scores.spiritual_unseen >= 10) {
      for (const key of DOMAIN_ORDER) {
        if (key !== 'spiritual_unseen' && scores[key] > 0) scores[key] = Math.min(scores[key], scores.spiritual_unseen - 4);
      }
    }

    return scores;
  }

  function analyze(value) {
    const text = normalize(value);
    const facet = detectFacet(text);
    const questionType = detectType(text, facet);
    const perspective = detectPerspective(text);
    const timeframe = detectTimeframe(text);
    const boundary = detectBoundary(text);
    const scores = scoreDomains(text, facet);

    const ranked = DOMAIN_ORDER
      .map((key) => ({ key, score: scores[key] }))
      .sort((a, b) => b.score - a.score || DOMAIN_ORDER.indexOf(a.key) - DOMAIN_ORDER.indexOf(b.key));

    let domain = ranked[0].score > 0 ? ranked[0].key : 'general';
    if (domain === 'general' && questionType === 'decision') domain = 'choice_action';
    if (domain === 'general' && questionType === 'perception') domain = 'social_perception';
    if (domain === 'general' && questionType === 'outlook') domain = 'outlook_opportunity';

    const top = ranked[0];
    const second = ranked[1];
    const topScore = top?.score || 0;
    const secondScore = second?.score || 0;
    const confidence = domain === 'general'
      ? 0.45
      : Math.max(0.5, Math.min(0.99, 0.62 + Math.min(0.25, topScore * 0.025) + Math.min(0.12, Math.max(0, topScore - secondScore) * 0.02)));

    const ambiguous = domain !== 'general'
      && topScore >= 3
      && secondScore >= 3
      && top.key !== 'self_image'
      && (topScore - secondScore <= 2 || secondScore / Math.max(1, topScore) >= 0.78);

    return Object.freeze({
      version: VERSION,
      text,
      domain,
      facet,
      questionType,
      perspective,
      timeframe,
      confidence,
      ambiguous,
      boundary,
      epistemicMode: domain === 'spiritual_unseen' ? (facet === 'unseen_influence' ? 'unseen-threat' : 'symbolic-only') : null,
      candidates: ambiguous ? Object.freeze([top.key, second.key]) : Object.freeze([domain]),
      scores: Object.freeze({ ...scores })
    });
  }

  function withDomain(analysis, domain) {
    if (!analysis || !LABELS[domain]) return analysis;
    return Object.freeze({ ...analysis, domain, ambiguous: false, candidates: Object.freeze([domain]), confidence: Math.max(analysis.confidence || 0, 0.9) });
  }

  function label(domain, lang = 'en') {
    return LABELS[domain]?.[lang === 'th' ? 'th' : 'en'] || LABELS.general[lang === 'th' ? 'th' : 'en'];
  }

  window.LGTQuestionAnalyzer = Object.freeze({
    version: VERSION,
    domains: DOMAIN_ORDER,
    labels: LABELS,
    analyze,
    withDomain,
    label
  });
})();

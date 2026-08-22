(() => {
  'use strict';

  const VERSION = 'question-analyzer-v3';

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

  const THAI_DIGITS = Object.freeze({ '๐':'0','๑':'1','๒':'2','๓':'3','๔':'4','๕':'5','๖':'6','๗':'7','๘':'8','๙':'9' });
  const normalize = (value) => String(value ?? '')
    .normalize('NFC')
    .replace(/[๐-๙]/g, (digit) => THAI_DIGITS[digit] || digit)
    .toLocaleLowerCase('en-US')
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  function has(text, terms) {
    return terms.some((term) => term instanceof RegExp ? term.test(text) : text.includes(term));
  }

  function countHits(text, terms) {
    return terms.reduce((score, term) => score + (has(text, [term]) ? 1 : 0), 0);
  }

  const SIGNALS = Object.freeze({
    self_image: [
      'หน้าตา','หล่อ','สวย','ดูดี','รูปลักษณ์','มีเสน่ห์','น่าดึงดูด','คาริสม่า','บุคลิก','ความมั่นใจ','คุณค่าในตัวเอง','ดีพอไหม',
      /\b(?:handsome|beautiful|pretty|good[- ]?looking|attractive|appearance|looks|charisma|charming|self[- ]?image|my personality|my confidence|self[- ]?worth)\b/i
    ],
    social_perception: [
      'คนอื่นมอง','เขามองฉัน','เขามองผม','ในสายตา','ในสายตาชาวโลก','คนทั่วไปคิด','ภาพที่คนเห็น','ชื่อเสียง','ความประทับใจแรก','คนเชื่อใจ','คนเคารพ','เป็นที่นิยม',
      /\b(?:how (?:do|does) .* see me|how .* sees me|what .* think(?:s)? of me|others see me|public image|reputation|first impression|respect me|trust me|popular)\b/i
    ],
    love_relationships: [
      'ความรัก','แฟน','คนรัก','คนคุย','คู่รัก','สามี','ภรรยา','เขารัก','เธอรัก','รู้สึกกับฉัน','รู้สึกกับผม','ความสัมพันธ์','คืนดี','เลิกกัน','แฟนเก่า','คนเก่า','แต่งงาน','เข้ากันได้','ความสัมพันธ์จะไปต่อ',
      /\b(?:love|relationship|partner|boyfriend|girlfriend|husband|wife|crush|ex\b|reconcile|romantic|feelings? for me|marry|marriage|compatible|compatibility|break up)\b/i
    ],
    work_purpose: [
      'งาน','อาชีพ','การงาน','หัวหน้า','บริษัท','โปรเจกต์','โครงการ','ธุรกิจ','เรียน','การเรียน','สอบ','มหาวิทยาลัย','เลื่อนตำแหน่ง','สมัครงาน','งานใหม่','ตกงาน','ความมั่นคงในงาน','การยอมรับในงาน',
      /\b(?:job|work|career|boss|company|project|business|study|school|university|exam|promotion|interview|job security|recognition at work|leadership)\b/i
    ],
    money_resources: [
      'เงิน','การเงิน','รายได้','เงินเดือน','รวย','ร่ำรวย','ความร่ำรวย','มั่งคั่ง','ความมั่งคั่ง','ฐานะ','เก็บเงิน','เงินออม','หนี้','ลงทุน','การลงทุน','หุ้น','คริปโต','ทรัพย์สิน','ค่าใช้จ่าย','กำไร','ขาดทุน','กระแสเงินสด','ความมั่นคงทางการเงิน',
      /\b(?:money|finances?|income|salary|rich|wealth|wealthy|financial position|savings?|debt|invest(?:ment|ing)?|stock|crypto|asset|expense|profit|loss|cash flow|financial stability)\b/i
    ],
    choice_action: [
      'ควรทำ','ควรเลือก','เลือกทาง','ตัดสินใจ','เดินหน้าหรือ','ไปต่อไหม','หยุดไหม','ควรรับ','ควรลาออก','ควรย้าย','ควรซื้อ','ควรขาย','รอดีไหม','เสี่ยงดีไหม','ทำอะไรต่อ',
      /\b(?:should i|which should i choose|what should i do|do i take|do i leave|move forward|walk away|quit|accept or|choose between|wait or|buy or sell|take the risk|next step)\b/i
    ],
    outlook_opportunity: [
      'จะเป็นยังไง','จะเป็นอย่างไร','แนวโน้ม','อนาคต','มีโอกาส','โอกาสไหม','จะเกิดอะไร','จะสำเร็จไหม','จะดีขึ้นไหม','จะกลับมาไหม','ผลลัพธ์','อุปสรรค','ความคืบหน้า','จะเปลี่ยนแปลง',
      /\b(?:what will happen|how will .* go|future|outlook|chance|opportunity|likely to|will .* improve|will .* succeed|will .* come back|outcome|obstacle|progress|change)\b/i
    ],
    inner_growth: [
      'รู้สึก','ความรู้สึกของฉัน','สภาพใจ','จิตใจ','กังวล','กลัว','เครียด','เยียวยา','เติบโต','ปล่อยวาง','เข้าใจตัวเอง','สมดุลชีวิต','หมดไฟ','แรงจูงใจ','นิสัย','เป้าหมายชีวิต','ความหมายชีวิต',
      /\b(?:how do i feel|my feelings|inner state|anxious|anxiety|afraid|fear|stress|healing|growth|let go|understand myself|balance|burnout|motivation|habit|purpose|meaning in life)\b/i
    ],
    spiritual_unseen: [
      'สิ่งศักดิ์สิทธิ์','องค์ไหนคุ้มครอง','คุ้มครองอยู่ไหม','เทวดาประจำตัว','เทพคุ้มครอง','เทพประจำตัว','พระพิฆเนศ','พญานาค','ครูบาอาจารย์ทางจิตวิญญาณ','เส้นทางจิตวิญญาณ','ปฏิบัติธรรม','ภาวนา','ลาง','สัญญาณจากจักรวาล','เลขซ้ำ','angel number','synchronicity','ความฝัน','ทำนายฝัน','ฝันว่า','ญาณ','สัมผัสที่หก','ลางสังหรณ์','พลังพิเศษ','กรรม','กรรมเก่า','บุญเก่า','เจ้ากรรมนายเวร','โชคชะตา','พรหมลิขิต','อดีตชาติ','ชาติที่แล้ว','ชาติภพ','วิญญาณ','ผีตาม','ของใส่','ทำของ','คุณไสย','ของดำ','มนต์ดำ','คำสาป','อาถรรพ์',
      /\b(?:deity|guardian deity|patron deity|sacred being|ganesha|buddha|naga|which god|which goddess|divine protection|protecting me|guardian angel|spirit guide|spiritual guide|spiritual path|sacred path|meditation practice|synchronicit(?:y|ies)|omen|angel number|repeating number|sign from the universe|dream meaning|my dream|had a dream|prophetic dream|premonition|psychic|mediumship|sixth sense|spiritual gift|karma|destiny|fate|past life|previous life|reincarnation|ghost|spirit around me|spirit following|unseen presence|negative entity|haunted|curse|black magic|evil eye|hex|possession)\b/i
    ]
  });

  const FACET_RULES = Object.freeze([
    // Spiritual & unseen: specific and risk-sensitive first.
    { key:'unseen_influence', domain:'spiritual_unseen', terms:['วิญญาณ','ผีตาม','สิ่งไม่ดีตาม','ของใส่','ทำของ','คุณไสย','ของดำ','มนต์ดำ','คำสาป','ถูกสาป','อาถรรพ์',/\b(?:ghost|spirit around me|spirit following|unseen presence|haunted|curse|cursed|black magic|evil eye|hex|possession|evil spirit|negative entity)\b/i] },
    { key:'divine_protection', domain:'spiritual_unseen', terms:['สิ่งศักดิ์สิทธิ์','องค์ไหนคุ้มครอง','คุ้มครองอยู่ไหม','เทวดาประจำตัว','เทพคุ้มครอง','เทพประจำตัว','พระพิฆเนศคุ้มครอง','พญานาคคุ้มครอง',/\b(?:guardian deity|patron deity|sacred being|which deity|which god|which goddess|divine protection|protecting me|guardian angel|spirit guide|ganesha.*protect|naga.*protect)\b/i] },
    { key:'dreams', domain:'spiritual_unseen', terms:['ความฝัน','ทำนายฝัน','ฝันเมื่อคืน','ฝันซ้ำ','ฝันว่า',/\b(?:dream meaning|what does my dream mean|my dream|had a dream|dreamt|dreamed|recurring dream|prophetic dream)\b/i] },
    { key:'past_life', domain:'spiritual_unseen', terms:['อดีตชาติ','ชาติที่แล้ว','ชาติภพ','กลับชาติมาเกิด',/\b(?:past life|previous life|reincarnation|reincarnated)\b/i] },
    { key:'spiritual_gifts', domain:'spiritual_unseen', terms:['มีญาณ','ญาณทิพย์','ญาณหยั่งรู้','สัมผัสที่หก','พลังพิเศษ','พลังทางจิต','ไวต่อพลังงาน','ลางสังหรณ์','เห็นอนาคต',/\b(?:psychic|mediumship|premonition|sixth sense|spiritual gift|intuitive gift|clairvoy|sensitive to energy)\b/i] },
    { key:'karma_destiny', domain:'spiritual_unseen', terms:['กรรม','กรรมเก่า','บุญเก่า','เจ้ากรรมนายเวร','โชคชะตา','พรหมลิขิต','ชะตา',/\b(?:karma|destiny|fate|karmic|meant to be)\b/i] },
    { key:'signs_synchronicity', domain:'spiritual_unseen', terms:['ลาง','สัญญาณจากจักรวาล','สัญญาณจากสิ่งศักดิ์สิทธิ์','เหตุบังเอิญมีความหมาย','เลขซ้ำ','เห็นเลขเดิม','11:11','angel number','synchronicity',/\b(?:synchronicit(?:y|ies)|omen|angel number|repeating number|11:11|sign from the universe|divine sign|meaningful coincidence)\b/i] },
    { key:'spiritual_path', domain:'spiritual_unseen', terms:['เส้นทางจิตวิญญาณ','ทางธรรม','ศรัทธาของฉัน','การปฏิบัติทางจิตวิญญาณ','ปฏิบัติธรรม','ภาวนา',/\b(?:spiritual path|sacred path|my faith|spiritual practice|spiritual direction|meditation practice|contemplative path)\b/i] },

    // Love & relationships.
    { key:'reconciliation', domain:'love_relationships', terms:['คืนดี','กลับมาคบ','รีเทิร์น','กลับมาหา',/\b(?:reconcile|reconciliation|get back together|come back to me)\b/i] },
    { key:'romantic_attraction', domain:'love_relationships', terms:['ชอบฉัน','ชอบผม','ดึงดูดกัน','มีใจ','ปิ๊ง','หลงใหล',/\b(?:attracted to me|romantic attraction|has a crush|into me|chemistry)\b/i] },
    { key:'feelings', domain:'love_relationships', terms:['เขารัก','เธอรัก','รู้สึกกับ','ความรู้สึกของเขา','ความรู้สึกของเธอ','รักฉันไหม','รักผมไหม',/\b(?:love me|feel(?:s|ing)? about me|feelings? for me)\b/i] },
    { key:'commitment', domain:'love_relationships', terms:['จริงจัง','ผูกมัด','คบจริงจัง','พร้อมผูกพัน','สถานะชัดเจน',/\b(?:commitment|serious about me|commit to|exclusive relationship)\b/i] },
    { key:'compatibility', domain:'love_relationships', terms:['เข้ากันได้','เหมาะกันไหม','ไปด้วยกันได้','คู่กันไหม',/\b(?:compatible|compatibility|good match|right for each other)\b/i] },
    { key:'marriage', domain:'love_relationships', terms:['แต่งงาน','ขอแต่งงาน','ชีวิตคู่','คู่สมรส',/\b(?:marry|marriage|proposal|spouse)\b/i] },
    { key:'breakup', domain:'love_relationships', terms:['เลิกกัน','ควรเลิก','จะเลิก','จบความสัมพันธ์',/\b(?:break up|breakup|end the relationship|separate)\b/i] },
    { key:'relationship_conflict', domain:'love_relationships', terms:['ทะเลาะ','ขัดแย้ง','ไม่เข้าใจกัน','งอน','มีปัญหากัน',/\b(?:fight|conflict|argument|relationship problem|not getting along)\b/i] },
    { key:'relationship_communication', domain:'love_relationships', terms:['คุยกัน','สื่อสาร','ไม่ตอบ','หายไป','อ่านข้อความ',/\b(?:communication|talk to me|text me|reply|ghosting|left on read)\b/i] },
    { key:'relationship_future', domain:'love_relationships', terms:['ความสัมพันธ์จะไปต่อ','ความสัมพันธ์นี้จะไปต่อ','อนาคตความรัก','อนาคตของเรา','จะคบกันต่อ',/\b(?:future of (?:our|this) relationship|relationship future|will we stay together|will this relationship continue)\b/i] },
    { key:'ex_relationship', domain:'love_relationships', terms:['แฟนเก่า','คนเก่า','อดีตแฟน',/\b(?:my ex|ex boyfriend|ex girlfriend|former partner)\b/i] },

    // Money & resources.
    { key:'wealth', domain:'money_resources', terms:['รวย','ร่ำรวย','ความร่ำรวย','มั่งคั่ง','ความมั่งคั่ง','ฐานะดี','เศรษฐี',/\b(?:rich|wealth|wealthy|millionaire|financially well[- ]off)\b/i] },
    { key:'income', domain:'money_resources', terms:['รายได้','เงินเดือน','ค่าตอบแทน','รายรับ',/\b(?:income|salary|earnings|pay|revenue)\b/i] },
    { key:'financial_growth', domain:'money_resources', terms:['การเงินดีขึ้น','เงินเพิ่ม','รายได้เพิ่ม','ฐานะดีขึ้น','เติบโตทางการเงิน',/\b(?:financial growth|finances improve|income grow|earn more|financial progress)\b/i] },
    { key:'financial_stability', domain:'money_resources', terms:['ความมั่นคงทางการเงิน','การเงินมั่นคง','ฐานะมั่นคง','มีเงินพอ',/การเงิน.{0,8}มั่นคง/u,/\b(?:financial stability|financially stable|stable finances|enough money)\b/i] },
    { key:'savings', domain:'money_resources', terms:['เงินออม','เก็บเงิน','เงินเก็บ','ออมเงิน',/\b(?:savings?|save money|nest egg)\b/i] },
    { key:'debt', domain:'money_resources', terms:['หนี้','เจ้าหนี้','ปลดหนี้','ใช้หนี้',/\b(?:debt|owe|creditor|pay off debt)\b/i] },
    { key:'expenses', domain:'money_resources', terms:['ค่าใช้จ่าย','รายจ่าย','ใช้เงิน','เงินออก',/\b(?:expense|spending|costs?|outgoings?)\b/i] },
    { key:'investment', domain:'money_resources', terms:['ลงทุน','หุ้น','คริปโต','กองทุน','พอร์ต',/\b(?:invest|investment|stock|crypto|fund|portfolio)\b/i] },
    { key:'profit', domain:'money_resources', terms:['กำไร','ขาดทุน','ผลตอบแทน','ทำเงิน',/\b(?:profit|loss|return|make money)\b/i] },
    { key:'financial_opportunity', domain:'money_resources', terms:['โอกาสได้เงิน','โอกาสทางการเงิน','เงินก้อน','ช่องทางรายได้',/\b(?:financial opportunity|money opportunity|windfall|new income stream)\b/i] },

    // Work & purpose.
    { key:'new_job', domain:'work_purpose', terms:['งานใหม่','ข้อเสนองาน','สมัครงาน','สัมภาษณ์งาน',/\b(?:new job|job offer|job application|interview)\b/i] },
    { key:'promotion', domain:'work_purpose', terms:['เลื่อนตำแหน่ง','โปรโมต','ขึ้นตำแหน่ง','ขึ้นเงินเดือน',/\b(?:promotion|promoted|raise at work|pay rise)\b/i] },
    { key:'career_direction', domain:'work_purpose', terms:['อาชีพ','เส้นทางงาน','ทิศทางงาน','สายงาน','เปลี่ยนอาชีพ',/\b(?:career direction|career path|career change|profession)\b/i] },
    { key:'business', domain:'work_purpose', terms:['ธุรกิจ','กิจการ','ร้าน','บริษัทของฉัน','สตาร์ทอัพ',/\b(?:business|startup|my company|my shop|venture)\b/i] },
    { key:'study', domain:'work_purpose', terms:['เรียน','การเรียน','สอบ','มหาวิทยาลัย','เรียนต่อ','ทุนการศึกษา',/\b(?:study|school|university|exam|education|scholarship)\b/i] },
    { key:'project', domain:'work_purpose', terms:['โปรเจกต์','โครงการ','งานชิ้นนี้','โปรดักต์',/\b(?:project|product launch|initiative)\b/i] },
    { key:'recognition', domain:'work_purpose', terms:['การยอมรับ','ผลงานถูกเห็น','ชื่อเสียงในงาน','เครดิตงาน',/\b(?:recognition|noticed at work|credit for my work|professional reputation)\b/i] },
    { key:'leadership', domain:'work_purpose', terms:['หัวหน้า','ผู้นำ','บริหารทีม','จัดการทีม',/\b(?:leadership|lead a team|manager|manage the team)\b/i] },
    { key:'job_security', domain:'work_purpose', terms:['ตกงาน','งานมั่นคง','ความมั่นคงในงาน','โดนไล่ออก','ถูกเลิกจ้าง',/\b(?:job security|lose my job|fired|laid off|layoff)\b/i] },
    { key:'current_job', domain:'work_purpose', terms:['งานปัจจุบัน','ที่ทำงานตอนนี้','บริษัทนี้','งานที่ทำอยู่',/\b(?:current job|my job now|this company|workplace)\b/i] },

    // Self-image & social perception.
    { key:'appearance', domain:'self_image', terms:['หน้าตา','หล่อ','สวย','ดูดี','รูปลักษณ์','รูปหน้า',/\b(?:handsome|beautiful|pretty|good[- ]?looking|appearance|looks|facial features)\b/i] },
    { key:'attractiveness', domain:'self_image', terms:['เสน่ห์','มีเสน่ห์','น่าดึงดูด','เซ็กซี่','ดูน่าสนใจ',/\b(?:attractive|attractiveness|charming|charm|sexy|appealing)\b/i] },
    { key:'charisma', domain:'self_image', terms:['คาริสม่า','รัศมี','ออร่า','โดดเด่น',/\b(?:charisma|magnetic presence|aura|presence)\b/i] },
    { key:'confidence', domain:'self_image', terms:['ความมั่นใจ','มั่นใจในตัวเอง','ความกล้า',/\b(?:confidence|confident|self[- ]?confidence)\b/i] },
    { key:'personality', domain:'self_image', terms:['บุคลิก','นิสัย','ตัวตน','เป็นคนแบบไหน',/\b(?:personality|character|what kind of person|who i am)\b/i] },
    { key:'self_worth', domain:'self_image', terms:['คุณค่าในตัวเอง','ดีพอไหม','มีคุณค่าไหม','คู่ควรไหม',/\b(?:self[- ]?worth|good enough|worthy|worthwhile)\b/i] },
    { key:'first_impression', domain:'social_perception', terms:['ความประทับใจแรก','ประทับใจฉันครั้งแรก','ประทับใจผมครั้งแรก','แรกเห็น','ครั้งแรกที่เจอ',/\b(?:first impression|at first sight|first meeting|impression do i give)\b/i] },
    { key:'reputation', domain:'social_perception', terms:['ชื่อเสียง','ภาพลักษณ์สังคม','คนพูดถึงฉัน','คนพูดถึงผม',/\b(?:reputation|public image|what people say about me)\b/i] },
    { key:'respect', domain:'social_perception', terms:['เคารพฉัน','เคารพผม','ให้เกียรติ','นับถือ',/\b(?:respect me|respected|look up to me)\b/i] },
    { key:'popularity', domain:'social_perception', terms:['เป็นที่นิยม','คนชอบเยอะ','ป๊อปปูลาร์','คนสนใจเยอะ',/\b(?:popular|popularity|well liked|people like me)\b/i] },
    { key:'trust', domain:'social_perception', terms:['เชื่อใจ','ไว้ใจ','น่าเชื่อถือ',/\b(?:trust me|trusted|trustworthy)\b/i] },
    { key:'public_image', domain:'social_perception', terms:['ในสายตาชาวโลก','คนทั่วไปมอง','สังคมมอง','ภาพที่คนเห็น',/\b(?:public image|how the world sees me|how people in general see me)\b/i] },
    { key:'how_others_see_me', domain:'social_perception', terms:['คนอื่นมอง','เขามองฉัน','เขามองผม','ในสายตาคนอื่น',/\b(?:how others see me|how does .* see me|what .* think of me)\b/i] },

    // Choice & action.
    { key:'move_or_wait', domain:'choice_action', terms:['เดินหน้าหรือรอ','ไปต่อหรือรอ','รอดีไหม','ควรรอ',/\b(?:move forward or wait|wait or act|should i wait)\b/i] },
    { key:'continue_or_stop', domain:'choice_action', terms:['ไปต่อหรือหยุด','ไปต่อไหม','หยุดไหม','ควรเลิกทำ','ทำต่อไหม',/\b(?:continue or stop|keep going|should i stop|walk away)\b/i] },
    { key:'accept_or_reject', domain:'choice_action', terms:['ควรรับ','รับข้อเสนอ','ปฏิเสธ','ตอบรับ',/\b(?:accept or reject|should i accept|turn down the offer)\b/i] },
    { key:'buy_or_sell', domain:'choice_action', terms:['ควรซื้อ','ควรขาย','ซื้อหรือขาย',/\b(?:buy or sell|should i buy|should i sell)\b/i] },
    { key:'risk_or_safe', domain:'choice_action', terms:['เสี่ยงดีไหม','เล่นเซฟ','ปลอดภัยกว่า','ควรเสี่ยง',/\b(?:take the risk|play it safe|risk or safe)\b/i] },
    { key:'next_step', domain:'choice_action', terms:['ทำอะไรต่อ','ก้าวต่อไป','ขั้นต่อไป','เริ่มตรงไหน',/\b(?:next step|what do i do next|where do i start)\b/i] },
    { key:'decision', domain:'choice_action', terms:['ควรเลือก','ตัดสินใจ','เลือกทาง','ทางไหนดี',/\b(?:which should i choose|decision|choose between|which path)\b/i] },

    // Outlook & opportunity.
    { key:'success', domain:'outlook_opportunity', terms:['จะสำเร็จไหม','สำเร็จหรือไม่','มีโอกาสสำเร็จ','ประสบความสำเร็จ',/\b(?:will .* succeed|success|chance of success)\b/i] },
    { key:'opportunity', domain:'outlook_opportunity', terms:['มีโอกาส','โอกาสไหม','โอกาสใหม่','โอกาสเกิดขึ้น',/\b(?:chance|opportunity|new opportunity)\b/i] },
    { key:'obstacle', domain:'outlook_opportunity', terms:['อุปสรรค','อะไรขวาง','ติดตรงไหน','ปัญหาหลัก',/\b(?:obstacle|what is blocking|main problem|what stands in the way)\b/i] },
    { key:'progress', domain:'outlook_opportunity', terms:['ความคืบหน้า','เดินหน้าไปถึงไหน','พัฒนาไปถึงไหน',/\b(?:progress|how far has .* progressed|progressing)\b/i] },
    { key:'outcome', domain:'outlook_opportunity', terms:['ผลลัพธ์','ลงเอย','สุดท้ายจะเป็น','จะจบยังไง',/\b(?:outcome|how will it end|end result|where will this lead)\b/i] },
    { key:'change', domain:'outlook_opportunity', terms:['เปลี่ยนแปลง','จะเปลี่ยนไหม','อะไรจะเปลี่ยน','จุดเปลี่ยน',/\b(?:change|what will change|turning point)\b/i] },
    { key:'timing', domain:'outlook_opportunity', terms:['เมื่อไหร่','ตอนไหน','อีกนานไหม','จังหวะไหน',/\b(?:when|how soon|how long until|timing)\b/i] },

    // Inner state & growth.
    { key:'anxiety', domain:'inner_growth', terms:['กังวล','วิตก','กลัว','แพนิค','คิดมาก',/\b(?:anxiety|anxious|fear|afraid|panic|overthinking)\b/i] },
    { key:'emotional_state', domain:'inner_growth', terms:['สภาพใจ','จิตใจ','ความรู้สึกของฉัน','ตอนนี้รู้สึก','อารมณ์',/\b(?:inner state|emotional state|my feelings|how do i feel|emotion)\b/i] },
    { key:'healing', domain:'inner_growth', terms:['เยียวยา','ฟื้นใจ','หายจากแผลใจ','ปล่อยความเจ็บ',/\b(?:healing|heal|recover emotionally|emotional wound)\b/i] },
    { key:'motivation', domain:'inner_growth', terms:['แรงจูงใจ','หมดแรง','ขี้เกียจ','ไม่มีไฟ',/\b(?:motivation|motivated|unmotivated|drive)\b/i] },
    { key:'habit', domain:'inner_growth', terms:['นิสัย','พฤติกรรมซ้ำ','เลิกนิสัย','สร้างนิสัย',/\b(?:habit|pattern of behavior|break a habit|build a habit)\b/i] },
    { key:'purpose', domain:'inner_growth', terms:['เป้าหมายชีวิต','ความหมายชีวิต','เกิดมาทำไม','สิ่งที่ควรทำกับชีวิต',/\b(?:life purpose|meaning of life|what am i here for|purpose)\b/i] },
    { key:'burnout', domain:'inner_growth', terms:['หมดไฟ','เบิร์นเอาต์','เหนื่อยล้า','ไม่ไหวแล้ว',/\b(?:burnout|burned out|exhausted|drained)\b/i] },
    { key:'personal_growth', domain:'inner_growth', terms:['เติบโต','พัฒนาตัวเอง','เปลี่ยนตัวเอง','เข้าใจตัวเอง',/\b(?:personal growth|grow as a person|self development|understand myself)\b/i] }
  ]);

  const TYPE_SIGNALS = Object.freeze({
    degree: ['แค่ไหน','มากน้อยแค่ไหน','ระดับไหน','ขนาดไหน',/\b(?:how much|how attractive|how good|how strong|to what extent)\b/i],
    evaluation: ['ดีหรือเปล่า','เป็นยังไง','เป็นอย่างไร','โอเคไหม',/\b(?:is .* good|how is .*|is .* okay|am i .* enough)\b/i],
    perception: ['คนอื่นมอง','มองฉัน','มองผม','ในสายตา','คิดว่าฉัน','คิดว่าผม',/\b(?:see me|sees me|think of me|view me|perceive me)\b/i],
    feelings: ['รู้สึกกับฉัน','รู้สึกกับผม','รักฉันไหม','รักผมไหม','ชอบฉันไหม','ชอบผมไหม',/\b(?:feel about me|feelings? for me|love me|like me|attracted to me)\b/i],
    decision: ['ควร','เลือก','ตัดสินใจ','ไปต่อ','หยุด','รับดีไหม','ซื้อดีไหม','ขายดีไหม',/\b(?:should i|which .* choose|do i .* or|better to|should we)\b/i],
    guidance: ['ทำยังไง','ทำอย่างไร','รับมือ','จัดการยังไง','ควรทำอะไร','ทำอะไรต่อ',/\b(?:what should i do|how should i|how do i handle|how can i deal|next step)\b/i],
    cause: ['ทำไม','เพราะอะไร','สาเหตุ','อะไรทำให้',/\b(?:why|what caused|what causes|reason)\b/i],
    obstacle: ['อุปสรรค','อะไรขวาง','ติดตรงไหน',/\b(?:obstacle|what is blocking|what stands in the way)\b/i],
    opportunity: ['โอกาสอะไร','มีโอกาสอะไร','โอกาสอยู่ตรงไหน',/\b(?:what opportunity|where is the opportunity|what chance)\b/i],
    comparison: ['ระหว่าง','เทียบกับ','อันไหนดีกว่า','ทางไหนดีกว่า','แบบไหนดีกว่า',/\b(?:versus|\bvs\.?\b|which is better|compare|between .* and)\b/i],
    timing: ['เมื่อไหร่','ตอนไหน','อีกนานไหม','จังหวะไหน',/\b(?:when|how soon|how long until|what timing)\b/i],
    identification: ['องค์ไหน','คือใคร','เป็นใคร','ใครคุ้มครอง','อะไรคุ้มครอง','เคยเป็นใคร',/\b(?:which deity|which god|which goddess|who (?:is|was)|what spirit|what entity|who protects me|who is my spirit guide)\b/i],
    compatibility: ['เข้ากันได้','เหมาะกันไหม','คู่กันไหม',/\b(?:compatible|compatibility|good match|right for each other)\b/i],
    verification: ['จริงไหม','จริงหรือ','มีจริงไหม','มีหรือไม่','หรือไม่','หรือเปล่า',/\b(?:is there|do i have|is it true|is .* real|does .* exist|am i protected|was i)\b/i],
    probability: ['มีโอกาสไหม','โอกาสมากไหม','เป็นไปได้ไหม','น่าจะไหม',/มีโอกาส.{0,30}(?:ไหม|มั้ย)/u,/\b(?:how likely|what are the chances|chance of|likely to|probability)\b/i],
    outlook: ['จะเป็น','จะเกิด','อนาคต','แนวโน้ม','ดีขึ้นไหม','จะสำเร็จไหม','จะรวย','จะกลับมาไหม','จะไปต่อไหม',/\b(?:what will|how will|future|outlook|will .* improve|will .* succeed|will .* become|will i be rich|will .* come back)\b/i]
  });

  const TARGET_RULES = Object.freeze([
    { key:'ex', terms:['แฟนเก่า','คนเก่า','อดีตแฟน',/\b(?:my ex|ex boyfriend|ex girlfriend|former partner)\b/i] },
    { key:'partner', terms:['แฟน','คนรัก','คู่รัก','สามี','ภรรยา',/\b(?:partner|boyfriend|girlfriend|husband|wife|spouse)\b/i] },
    { key:'crush', terms:['คนคุย','คนที่ชอบ','คนที่แอบชอบ','crush',/\b(?:crush|person i like|someone i like)\b/i] },
    { key:'friend', terms:['เพื่อน','เพื่อนสนิท',/\b(?:friend|best friend)\b/i] },
    { key:'family', terms:['ครอบครัว','พ่อ','แม่','ลูก','พี่','น้อง',/\b(?:family|father|mother|parent|son|daughter|brother|sister)\b/i] },
    { key:'boss', terms:['หัวหน้า','เจ้านาย',/\b(?:boss|manager|supervisor)\b/i] },
    { key:'coworker', terms:['เพื่อนร่วมงาน','คนในทีม','คนในที่ทำงาน','ลูกน้อง',/\b(?:coworker|colleague|teammate|employee)\b/i] },
    { key:'public', terms:['ชาวโลก','คนทั่วไป','คนอื่น','สังคม',/\b(?:the world|people in general|others|public|society)\b/i] },
    { key:'specific_other', terms:['เขา','เธอ','คนนั้น','คนนี้',/\b(?:he|she|they|that person|this person)\b/i] },
    { key:'relationship', terms:['ความสัมพันธ์ของเรา','ความสัมพันธ์นี้',/\b(?:our relationship|this relationship)\b/i] },
    { key:'business', terms:['ธุรกิจของฉัน','กิจการของผม','บริษัทของฉัน',/\b(?:my business|my company|my venture)\b/i] },
    { key:'job', terms:['งานของฉัน','งานของผม','งานปัจจุบัน',/\b(?:my job|my career|current job)\b/i] },
    { key:'self', terms:['ฉัน','ผม','หนู','ตัวเอง',/\b(?:i|me|my|myself)\b/i] }
  ]);

  const PERSPECTIVE_SIGNALS = Object.freeze({
    public_view: ['ชาวโลก','คนทั่วไป','คนอื่น','สังคม','ในสายตาคนอื่น',/\b(?:the world|people in general|others|public|society)\b/i],
    other_view: ['เขามอง','เธอมอง','ในสายตาเขา','ในสายตาเธอ','เขาคิด','เธอคิด',/\b(?:how does .* see me|how .* sees me|what does .* think of me)\b/i],
    shared_dynamic: ['ความสัมพันธ์ของเรา','เราสองคน','ระหว่างเรา',/\b(?:our relationship|between us|the two of us)\b/i],
    future_self: ['อนาคตของฉัน','อนาคตของผม','ตัวฉันในอนาคต',/\b(?:my future|future me|my future self)\b/i],
    self_view: ['ฉันมองตัวเอง','ผมมองตัวเอง','รู้สึกกับตัวเอง',/\b(?:how i see myself|my view of myself)\b/i]
  });

  const BOUNDARIES = Object.freeze([
    { key:'medical', patterns:['เป็นมะเร็งไหม','เป็นโรคอะไร','ตั้งครรภ์ไหม','จะหายจากโรคไหม',/\b(?:do i have cancer|what disease do i have|am i pregnant|diagnos(?:e|is)|will i recover from .* disease)\b/i] },
    { key:'legal', patterns:['ชนะคดีไหม','ติดคุกไหม','ศาลจะตัดสิน',/\b(?:will i win (?:the )?(?:case|lawsuit)|will i go to jail|court verdict|will i be convicted)\b/i] },
    { key:'gambling', patterns:['เลขเด็ด','หวย','ล็อตเตอรี่','พนัน','คาสิโน',/\b(?:winning lottery|lottery number|what number will win|betting|casino)\b/i] },
    { key:'financial', patterns:['หุ้นตัวนี้จะขึ้นไหม','คริปโตตัวนี้จะขึ้นไหม','กำไรแน่ไหม','ควรทุ่มเงินทั้งหมด',/\b(?:will this stock go up|will this crypto go up|guaranteed profit|guaranteed return|invest all my money|put all my money)\b/i] },
    { key:'death', patterns:['จะตายเมื่อไหร่','จะตายไหม','ใครจะตาย',/\b(?:when will i die|will i die|when will .* die)\b/i] }
  ]);

  const METRIC_BY_FACET = Object.freeze({
    appearance:'appearance_quality', attractiveness:'attractiveness_level', charisma:'charisma_level', confidence:'confidence_level', personality:'personality_impression', self_worth:'self_worth',
    first_impression:'first_impression', reputation:'reputation', respect:'respect_level', popularity:'social_popularity', trust:'trust_level', public_image:'public_image', how_others_see_me:'external_perception',
    romantic_attraction:'romantic_attraction', feelings:'feelings_tendency', commitment:'commitment_level', compatibility:'compatibility', reconciliation:'reconciliation_outlook', marriage:'commitment_outlook', breakup:'relationship_stability', relationship_conflict:'relationship_tension', relationship_communication:'communication_quality', relationship_future:'relationship_outlook', ex_relationship:'ex_dynamic',
    current_job:'work_stability', new_job:'job_opportunity', promotion:'career_advancement', career_direction:'career_direction', business:'business_outlook', study:'study_progress', project:'project_outlook', recognition:'recognition_level', leadership:'leadership_fit', job_security:'job_security',
    income:'income_level', wealth:'wealth_level', financial_growth:'financial_growth', financial_stability:'financial_stability', savings:'savings_progress', debt:'debt_outlook', expenses:'spending_pressure', investment:'investment_reflection', profit:'profitability', financial_opportunity:'financial_opportunity',
    decision:'decision_quality', move_or_wait:'timing_of_action', continue_or_stop:'continuation_choice', accept_or_reject:'acceptance_choice', buy_or_sell:'transaction_choice', risk_or_safe:'risk_choice', next_step:'next_action',
    success:'success_likelihood', opportunity:'opportunity_level', obstacle:'main_obstacle', progress:'progress_level', outcome:'outcome_direction', change:'change_direction', timing:'timing_quality',
    anxiety:'anxiety_pattern', emotional_state:'emotional_state', healing:'healing_progress', motivation:'motivation_level', habit:'habit_pattern', purpose:'sense_of_purpose', burnout:'burnout_pressure', personal_growth:'growth_direction',
    divine_protection:'symbolic_protection', spiritual_path:'spiritual_direction', signs_synchronicity:'symbolic_significance', dreams:'dream_symbolism', spiritual_gifts:'intuitive_sensitivity', karma_destiny:'cause_consequence_pattern', past_life:'past_life_symbolism', unseen_influence:'unseen_concern'
  });

  function detectFacet(text) {
    let best = { key:'general', domain:null, score:0, index:Number.MAX_SAFE_INTEGER };
    FACET_RULES.forEach((rule, index) => {
      const hits = countHits(text, rule.terms);
      if (!hits) return;
      const score = hits * 4 + Math.min(3, rule.terms.filter((term) => typeof term === 'string' && term.length >= 8 && text.includes(term)).length);
      if (score > best.score || (score === best.score && index < best.index)) best = { key:rule.key, domain:rule.domain, score, index };
    });
    // A relationship that explicitly asks whether it will continue is a relationship-future facet,
    // not a generic continue/stop decision.
    if (has(text, ['ความสัมพันธ์','relationship']) && has(text, ['ไปต่อ','คบกันต่อ',/\b(?:continue|stay together|go on)\b/i])) {
      return { key:'relationship_future', domain:'love_relationships', score:Math.max(best.score, 8), index:-3 };
    }

    // When someone explicitly asks about looks/attractiveness "in other people's eyes",
    // appearance remains the subject and public perception is the perspective.
    const appearanceRule = FACET_RULES.find((rule) => rule.key === 'appearance');
    const attractionRule = FACET_RULES.find((rule) => rule.key === 'attractiveness');
    const appearanceHits = appearanceRule ? countHits(text, appearanceRule.terms) : 0;
    const attractionHits = attractionRule ? countHits(text, attractionRule.terms) : 0;
    if (appearanceHits > 0 && ['public_image','how_others_see_me','first_impression'].includes(best.key)) return { key:'appearance', domain:'self_image', score:Math.max(best.score, appearanceHits * 6), index:-2 };
    if (attractionHits > 0 && ['public_image','how_others_see_me','first_impression'].includes(best.key)) return { key:'attractiveness', domain:'self_image', score:Math.max(best.score, attractionHits * 6), index:-1 };
    return best;
  }

  function detectType(text, facet) {
    if (facet === 'divine_protection' || facet === 'past_life' || facet === 'unseen_influence') {
      if (countHits(text, TYPE_SIGNALS.identification)) return 'identification';
    }
    if (facet === 'first_impression' || facet === 'reputation' || facet === 'respect' || facet === 'popularity' || facet === 'trust' || facet === 'public_image' || facet === 'how_others_see_me') return 'perception';
    if (facet === 'feelings' || facet === 'romantic_attraction') return 'feelings';
    if (facet === 'compatibility') return 'compatibility';
    if (countHits(text, TYPE_SIGNALS.comparison)) return 'comparison';
    if (countHits(text, TYPE_SIGNALS.timing)) return 'timing';
    if (countHits(text, TYPE_SIGNALS.cause)) return 'cause';
    if (countHits(text, TYPE_SIGNALS.obstacle)) return 'obstacle';
    if (countHits(text, TYPE_SIGNALS.opportunity)) return 'opportunity';
    if (countHits(text, TYPE_SIGNALS.degree)) return 'degree';
    if (countHits(text, TYPE_SIGNALS.perception)) return 'perception';
    if (['relationship_future','reconciliation','marriage','breakup','ex_relationship'].includes(facet) && has(text, ['จะ','อนาคต','กลับมา','ปีหน้า','ข้างหน้า',/\b(?:will|future|come back|next)\b/i])) return 'outlook';
    if (countHits(text, TYPE_SIGNALS.guidance)) return 'guidance';
    if ((facet === 'healing' || facet === 'burnout' || facet === 'motivation' || facet === 'habit' || facet === 'personal_growth') && has(text, ['ยังไง','อย่างไร',/\bhow (?:can|do|should) i\b/i])) return 'guidance';
    if (countHits(text, TYPE_SIGNALS.decision)) return 'decision';
    if (facet === 'success' && has(text, ['ไหม','มั้ย','หรือเปล่า','หรือไม่',/\b(?:will|likely|chance)\b/i])) return 'probability';
    if (countHits(text, TYPE_SIGNALS.probability)) return 'probability';
    if (has(text, ['จะ','อนาคต','ปีหน้า','เดือนหน้า','สัปดาห์หน้า','ข้างหน้า',/\b(?:will|future|next year|next month|next week|going to)\b/i])) return 'outlook';
    if (countHits(text, TYPE_SIGNALS.outlook)) return 'outlook';
    if (countHits(text, TYPE_SIGNALS.verification) || has(text, ['ไหม','มั้ย','หรือเปล่า','หรือไม่',/^(?:is|are|do|does|can|could|am)\b/i])) return 'verification';
    if (countHits(text, TYPE_SIGNALS.evaluation)) return 'evaluation';
    return 'open';
  }

  function detectTarget(text) {
    for (const rule of TARGET_RULES) if (has(text, rule.terms)) return rule.key;
    return 'situation';
  }

  function detectPerspective(text, domain, target) {
    for (const [key, terms] of Object.entries(PERSPECTIVE_SIGNALS)) if (has(text, terms)) return key;
    if (target === 'public') return 'public_view';
    if (['partner','ex','crush','friend','family','boss','coworker','specific_other'].includes(target)) return 'other_view';
    if (domain === 'love_relationships' && target === 'relationship') return 'shared_dynamic';
    if (target === 'self') return 'self_view';
    return 'general';
  }

  function formatTimeframe(amount, unit, lang) {
    const n = Number(amount);
    if (lang === 'th') {
      const u = unit === 'day' ? 'วัน' : unit === 'week' ? 'สัปดาห์' : unit === 'month' ? 'เดือน' : 'ปี';
      return n === 1 ? `1 ${u}ข้างหน้า` : `${n} ${u}ข้างหน้า`;
    }
    const plural = n === 1 ? unit : `${unit}s`;
    return `the next ${n} ${plural}`;
  }

  function detectTimeframe(text) {
    const numberPatterns = [
      /(?:ภายใน|ในอีก|อีก)\s*(\d{1,3})\s*(วัน|สัปดาห์|อาทิตย์|เดือน|ปี)(?:ข้างหน้า)?/u,
      /(\d{1,3})\s*(วัน|สัปดาห์|อาทิตย์|เดือน|ปี)\s*(?:ข้างหน้า|ต่อจากนี้)/u,
      /(?:within|in|over|during|for|next)\s+(?:the\s+)?(?:next\s+)?(\d{1,3})\s+(day|week|month|year)s?/i
    ];
    for (const re of numberPatterns) {
      const match = text.match(re);
      if (!match) continue;
      const amount = Number(match[1]);
      const rawUnit = match[2];
      const unit = /วัน|day/i.test(rawUnit) ? 'day' : /สัปดาห์|อาทิตย์|week/i.test(rawUnit) ? 'week' : /เดือน|month/i.test(rawUnit) ? 'month' : 'year';
      const monthsApprox = unit === 'year' ? amount * 12 : unit === 'month' ? amount : unit === 'week' ? amount / 4.345 : amount / 30.437;
      return Object.freeze({ key:`${amount}_${unit}${amount === 1 ? '' : 's'}`, explicit:true, amount, unit, monthsApprox, original:match[0], labels:Object.freeze({ en:formatTimeframe(amount, unit, 'en'), th:formatTimeframe(amount, unit, 'th') }) });
    }

    const named = [
      { key:'today', terms:['วันนี้',/\btoday\b/i], labels:{en:'today',th:'วันนี้'}, monthsApprox:0 },
      { key:'now', terms:['ตอนนี้','ปัจจุบัน',/\b(?:now|currently|at present)\b/i], labels:{en:'right now',th:'ตอนนี้'}, monthsApprox:0 },
      { key:'this_week', terms:['สัปดาห์นี้','อาทิตย์นี้',/\bthis week\b/i], labels:{en:'this week',th:'สัปดาห์นี้'}, monthsApprox:0.25 },
      { key:'next_week', terms:['สัปดาห์หน้า','อาทิตย์หน้า',/\bnext week\b/i], labels:{en:'next week',th:'สัปดาห์หน้า'}, monthsApprox:0.25 },
      { key:'this_month', terms:['เดือนนี้',/\bthis month\b/i], labels:{en:'this month',th:'เดือนนี้'}, monthsApprox:1 },
      { key:'next_month', terms:['เดือนหน้า',/\bnext month\b/i], labels:{en:'next month',th:'เดือนหน้า'}, monthsApprox:1 },
      { key:'this_year', terms:['ปีนี้',/\bthis year\b/i], labels:{en:'this year',th:'ปีนี้'}, monthsApprox:12 },
      { key:'next_year', terms:['ปีหน้า',/\bnext year\b/i], labels:{en:'next year',th:'ปีหน้า'}, monthsApprox:12 },
      { key:'end_of_year', terms:['สิ้นปี','ภายในสิ้นปี',/\b(?:by|before) (?:the )?end of (?:the )?year\b/i], labels:{en:'by the end of the year',th:'ภายในสิ้นปี'}, monthsApprox:12 },
      { key:'short_term', terms:['ระยะสั้น','เร็วๆ นี้',/\b(?:short term|soon|near future)\b/i], labels:{en:'in the near term',th:'ในระยะสั้น'}, monthsApprox:3 },
      { key:'long_term', terms:['ระยะยาว','ในอนาคตไกล',/\b(?:long term|long-term|far future)\b/i], labels:{en:'over the longer term',th:'ในระยะยาว'}, monthsApprox:24 }
    ];
    for (const item of named) if (has(text, item.terms)) return Object.freeze({ ...item, explicit:true, amount:null, unit:null, original:item.labels.th, labels:Object.freeze(item.labels) });

    if (has(text, ['อนาคต','ข้างหน้า','ต่อไป',/\b(?:future|later|going forward)\b/i])) return Object.freeze({ key:'future', explicit:false, amount:null, unit:null, monthsApprox:null, original:'', labels:Object.freeze({en:'going forward',th:'ในช่วงข้างหน้า'}) });
    if (has(text, ['ที่ผ่านมา','เมื่อก่อน','อดีต',/\b(?:past|before|previously|used to)\b/i])) return Object.freeze({ key:'past', explicit:false, amount:null, unit:null, monthsApprox:null, original:'', labels:Object.freeze({en:'in the past',th:'ในอดีต'}) });
    return Object.freeze({ key:'unspecified', explicit:false, amount:null, unit:null, monthsApprox:null, original:'', labels:Object.freeze({en:'',th:''}) });
  }

  function detectBoundary(text) {
    for (const rule of BOUNDARIES) if (has(text, rule.patterns)) return rule.key;
    return null;
  }

  function detectConditional(text) {
    return /(?:^|\s)ถ้า.{2,120}(?:จะ|ควร|ดีขึ้น|แย่ลง|เป็น|ได้ไหม|ไหม)/u.test(text) || /\bif\b.{2,140}\b(?:will|would|should|could|can|is|are)\b/i.test(text);
  }

  function detectComparison(text) {
    return has(text, ['ระหว่าง','เทียบกับ','อันไหนดีกว่า','ทางไหนดีกว่า','แบบไหนดีกว่า','หรือแบบไหนดีกว่า',/\b(?:versus|\bvs\.?\b|which is better|compare|between .+ and)\b/i]);
  }

  function detectMultiQuestion(text, conditional) {
    if (conditional) return false;
    const marks = (text.match(/[?？]/g) || []).length;
    if (marks > 1) return true;
    if (/(?:ไหม|มั้ย|หรือเปล่า|หรือไม่).{1,90}(?:แล้ว|และ).{1,90}(?:ไหม|มั้ย|หรือเปล่า|หรือไม่)/u.test(text)) return true;
    if (/\b(?:will|do|does|is|are|can|should)\b.{1,80}\?.{0,20}\b(?:will|do|does|is|are|can|should)\b/i.test(text)) return true;
    return false;
  }

  function detectPolarity(text, questionType) {
    if (['verification','probability'].includes(questionType)) return 'yes_no_tendency';
    if (/(?:ไหม|มั้ย|หรือเปล่า|หรือไม่|ใช่ไหม)/u.test(text) || /\b(?:will|do|does|is|are|can|should)\b/i.test(text)) return 'yes_no_tendency';
    return 'open';
  }

  function detectCertaintyRequest(text, polarity) {
    if (has(text, ['แน่นอน','ชัวร์','100%','รับประกัน','ฟันธง',/\b(?:definitely|certain|certainty|100%|guarantee|guaranteed|for sure|prove)\b/i])) return 'high';
    return polarity === 'yes_no_tendency' ? 'medium' : 'low';
  }

  function scoreDomains(text, facetResult) {
    const scores = Object.fromEntries(DOMAIN_ORDER.map((key) => [key, 0]));
    for (const key of DOMAIN_ORDER) scores[key] += countHits(text, SIGNALS[key]) * 3;
    if (facetResult.domain) scores[facetResult.domain] += 10 + Math.min(6, facetResult.score);

    // External-perception language modifies appearance questions rather than erasing their subject.
    if (facetResult.domain === 'self_image' && scores.social_perception > 0) scores.self_image += 3;

    // Generic future/choice wording describes what is being asked about a subject; it should not
    // replace a clearly named subject such as love, work, money, self-image, or inner state.
    const subjectKeys = ['self_image','social_perception','love_relationships','work_purpose','money_resources','inner_growth','spiritual_unseen'];
    const subjectTop = Math.max(...subjectKeys.map((key) => scores[key] || 0));
    if (subjectTop >= 3 && facetResult.domain !== 'outlook_opportunity') scores.outlook_opportunity = Math.min(scores.outlook_opportunity, Math.max(0, subjectTop - 1));
    if (subjectTop >= 3 && facetResult.domain !== 'choice_action') scores.choice_action = Math.min(scores.choice_action, Math.max(0, subjectTop - 1));

    // A strong spiritual facet owns the subject even if ordinary-life context appears in the same question.
    if (facetResult.domain === 'spiritual_unseen') {
      for (const key of DOMAIN_ORDER) if (key !== 'spiritual_unseen') scores[key] = Math.min(scores[key], scores.spiritual_unseen - 5);
    }
    return scores;
  }

  function metricFor(facet, questionType) {
    if (METRIC_BY_FACET[facet]) return METRIC_BY_FACET[facet];
    if (questionType === 'timing') return 'timing_quality';
    if (questionType === 'probability') return 'likelihood';
    if (questionType === 'degree') return 'degree';
    if (questionType === 'comparison') return 'deciding_factor';
    return 'general';
  }

  function analyze(value) {
    const text = normalize(value);
    const facetResult = detectFacet(text);
    const facet = facetResult.key;
    const questionType = detectType(text, facet);
    const conditional = detectConditional(text);
    const comparison = questionType === 'comparison' || detectComparison(text);
    const multiQuestion = detectMultiQuestion(text, conditional);
    const timeframeMeta = detectTimeframe(text);
    const boundary = detectBoundary(text);
    const scores = scoreDomains(text, facetResult);

    const ranked = DOMAIN_ORDER.map((key) => ({ key, score:scores[key] }))
      .sort((a,b) => b.score - a.score || DOMAIN_ORDER.indexOf(a.key) - DOMAIN_ORDER.indexOf(b.key));

    let domain = ranked[0].score > 0 ? ranked[0].key : 'general';
    if (domain === 'general' && questionType === 'decision') domain = 'choice_action';
    if (domain === 'general' && questionType === 'perception') domain = 'social_perception';
    if (domain === 'general' && ['outlook','probability','timing'].includes(questionType)) domain = 'outlook_opportunity';

    const target = detectTarget(text);
    const perspective = detectPerspective(text, domain, target);
    const metric = metricFor(facet, questionType);
    const polarity = detectPolarity(text, questionType);
    const certaintyRequest = detectCertaintyRequest(text, polarity);

    const top = ranked[0];
    const second = ranked[1];
    const topScore = top?.score || 0;
    const secondScore = second?.score || 0;
    const confidence = domain === 'general' ? 0.44 : Math.max(0.5, Math.min(0.99, 0.64 + Math.min(0.23, topScore * 0.018) + Math.min(0.12, Math.max(0, topScore-secondScore) * 0.018)));
    const ambiguous = domain !== 'general' && topScore >= 3 && secondScore >= 3 && facetResult.domain !== top.key && (topScore-secondScore <= 2 || secondScore / Math.max(1, topScore) >= 0.82);

    return Object.freeze({
      version:VERSION,
      text,
      domain,
      facet,
      facetDomain:facetResult.domain || null,
      questionType,
      target,
      perspective,
      metric,
      timeframe:timeframeMeta.key,
      timeframeMeta,
      comparison,
      conditional,
      multiQuestion,
      polarity,
      certaintyRequest,
      confidence,
      ambiguous,
      boundary,
      epistemicMode:domain === 'spiritual_unseen' ? (facet === 'unseen_influence' ? 'unseen-threat' : 'symbolic-only') : (questionType === 'feelings' || perspective === 'other_view' ? 'third-party-uncertain' : null),
      candidates:ambiguous ? Object.freeze([top.key,second.key]) : Object.freeze([domain]),
      scores:Object.freeze({ ...scores })
    });
  }

  function withDomain(analysis, domain) {
    if (!analysis || !LABELS[domain]) return analysis;
    return Object.freeze({ ...analysis, domain, ambiguous:false, candidates:Object.freeze([domain]), confidence:Math.max(analysis.confidence || 0,0.9) });
  }

  function withStoredResolution(analysis, stored) {
    if (!analysis || !stored) return analysis;
    const domain = stored.contextKey && LABELS[stored.contextKey] ? stored.contextKey : analysis.domain;
    const timeframeMeta = analysis.timeframeMeta || Object.freeze({ key:stored.timeframe || 'unspecified', explicit:false, labels:Object.freeze({en:'',th:''}) });
    return Object.freeze({
      ...analysis,
      domain,
      facet:stored.facet || analysis.facet,
      questionType:stored.questionType || analysis.questionType,
      target:stored.target || analysis.target,
      perspective:stored.perspective || analysis.perspective,
      metric:stored.metric || analysis.metric,
      timeframe:stored.timeframe || analysis.timeframe,
      timeframeMeta,
      polarity:stored.polarity || analysis.polarity,
      ambiguous:false,
      candidates:Object.freeze([domain]),
      confidence:Math.max(analysis.confidence || 0,0.9)
    });
  }

  function label(domain, lang='en') {
    return LABELS[domain]?.[lang === 'th' ? 'th' : 'en'] || LABELS.general[lang === 'th' ? 'th' : 'en'];
  }

  window.LGTQuestionAnalyzer = Object.freeze({
    version:VERSION,
    domains:DOMAIN_ORDER,
    labels:LABELS,
    analyze,
    withDomain,
    withStoredResolution,
    label
  });
})();

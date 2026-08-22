(() => {
  'use strict';

  const ANALYZER = window.LGTQuestionAnalyzer;
  if (!ANALYZER) throw new Error('Question Contract requires Question Analyzer.');

  const VERSION = 'question-contract-v1';

  const TOPICS = Object.freeze({
    appearance:{en:'your appearance',th:'รูปลักษณ์และหน้าตาของคุณ',anchors:{en:['appearance','look'],th:['รูปลักษณ์','หน้าตา']}},
    attractiveness:{en:'your attractiveness',th:'เสน่ห์และความน่าดึงดูดของคุณ',anchors:{en:['attract'],th:['เสน่ห์','ดึงดูด']}},
    charisma:{en:'your charisma and presence',th:'คาริสม่าและพลังในการมีตัวตนของคุณ',anchors:{en:['charisma','presence'],th:['คาริสม่า','ตัวตน']}},
    confidence:{en:'your confidence',th:'ความมั่นใจของคุณ',anchors:{en:['confidence'],th:['มั่นใจ']}},
    personality:{en:'your personality',th:'บุคลิกและตัวตนของคุณ',anchors:{en:['personality'],th:['บุคลิก','ตัวตน']}},
    self_worth:{en:'your sense of self-worth',th:'คุณค่าในตัวเอง',anchors:{en:['self-worth','worth'],th:['คุณค่า']}},
    first_impression:{en:'the first impression you give',th:'ความประทับใจแรกที่คนได้รับจากคุณ',anchors:{en:['first impression'],th:['ประทับใจแรก']}},
    reputation:{en:'your reputation',th:'ชื่อเสียงและภาพจำของคุณ',anchors:{en:['reputation'],th:['ชื่อเสียง']}},
    respect:{en:'the respect others may have for you',th:'ระดับความเคารพและการให้เกียรติที่คนมีต่อคุณ',anchors:{en:['respect'],th:['เคารพ','ให้เกียรติ']}},
    popularity:{en:'how socially well-liked or noticeable you may be',th:'ความนิยมและการได้รับความสนใจจากคนรอบตัว',anchors:{en:['popular','well-liked'],th:['นิยม','สนใจ']}},
    trust:{en:'how trustworthy others may find you',th:'ความน่าเชื่อถือและความไว้ใจที่คนมีต่อคุณ',anchors:{en:['trust'],th:['ไว้ใจ','เชื่อถือ']}},
    public_image:{en:'your public image',th:'ภาพลักษณ์ของคุณในสายตาคนทั่วไป',anchors:{en:['public image'],th:['ภาพลักษณ์','คนทั่วไป']}},
    how_others_see_me:{en:'how other people may perceive you',th:'มุมมองที่คนอื่นมีต่อคุณ',anchors:{en:['others','perceive'],th:['คนอื่น','มอง']}},

    romantic_attraction:{en:'romantic attraction in this connection',th:'แรงดึงดูดเชิงความรักในความสัมพันธ์นี้',anchors:{en:['romantic','attraction'],th:['ดึงดูด','ความรัก']}},
    feelings:{en:'the other person’s feelings and the relationship dynamic',th:'ความรู้สึกของอีกฝ่ายและพลวัตของความสัมพันธ์',anchors:{en:['feelings','relationship'],th:['ความรู้สึก','ความสัมพันธ์']}},
    commitment:{en:'commitment in this relationship',th:'ความจริงจังและการผูกพันในความสัมพันธ์นี้',anchors:{en:['commitment'],th:['จริงจัง','ผูกพัน']}},
    compatibility:{en:'your compatibility',th:'ความเข้ากันได้ของคุณสองคน',anchors:{en:['compatib'],th:['เข้ากัน']}},
    reconciliation:{en:'the possibility of reconciliation',th:'โอกาสของการคืนดี',anchors:{en:['reconciliation'],th:['คืนดี']}},
    marriage:{en:'the direction of commitment or marriage',th:'ทิศทางของความผูกพันหรือการแต่งงาน',anchors:{en:['marriage','commitment'],th:['แต่งงาน','ผูกพัน']}},
    breakup:{en:'the stability or ending of this relationship',th:'ความมั่นคงหรือการยุติของความสัมพันธ์นี้',anchors:{en:['relationship','ending'],th:['ความสัมพันธ์','ยุติ']}},
    relationship_conflict:{en:'the conflict in this relationship',th:'ความขัดแย้งในความสัมพันธ์นี้',anchors:{en:['conflict'],th:['ขัดแย้ง']}},
    relationship_communication:{en:'communication in this relationship',th:'การสื่อสารในความสัมพันธ์นี้',anchors:{en:['communication'],th:['สื่อสาร']}},
    relationship_future:{en:'the future direction of this relationship',th:'แนวโน้มในอนาคตของความสัมพันธ์นี้',anchors:{en:['relationship','future'],th:['ความสัมพันธ์','อนาคต']}},
    ex_relationship:{en:'the dynamic with your ex',th:'ความสัมพันธ์และพลวัตกับคนรักเก่า',anchors:{en:['ex'],th:['คนเก่า','แฟนเก่า']}},

    current_job:{en:'your current job',th:'งานปัจจุบันของคุณ',anchors:{en:['job','work'],th:['งาน']}},
    new_job:{en:'a new job opportunity',th:'โอกาสเกี่ยวกับงานใหม่',anchors:{en:['new job'],th:['งานใหม่']}},
    promotion:{en:'career advancement or promotion',th:'ความก้าวหน้าหรือการเลื่อนตำแหน่ง',anchors:{en:['promotion','advancement'],th:['เลื่อนตำแหน่ง','ก้าวหน้า']}},
    career_direction:{en:'your career direction',th:'ทิศทางอาชีพและเส้นทางการงาน',anchors:{en:['career'],th:['อาชีพ','การงาน']}},
    business:{en:'your business',th:'ธุรกิจหรือกิจการของคุณ',anchors:{en:['business'],th:['ธุรกิจ','กิจการ']}},
    study:{en:'your study or education',th:'การเรียนหรือการศึกษาของคุณ',anchors:{en:['study','education'],th:['เรียน','ศึกษา']}},
    project:{en:'this project',th:'โปรเจกต์หรือโครงการนี้',anchors:{en:['project'],th:['โปรเจกต์','โครงการ']}},
    recognition:{en:'professional recognition',th:'การได้รับการยอมรับจากผลงาน',anchors:{en:['recognition'],th:['ยอมรับ','ผลงาน']}},
    leadership:{en:'your leadership role',th:'บทบาทและความเหมาะสมด้านการเป็นผู้นำ',anchors:{en:['leadership'],th:['ผู้นำ']}},
    job_security:{en:'your job security',th:'ความมั่นคงในงาน',anchors:{en:['job security'],th:['มั่นคง','งาน']}},

    income:{en:'your income',th:'รายได้ของคุณ',anchors:{en:['income'],th:['รายได้']}},
    wealth:{en:'your financial position and wealth',th:'ฐานะและความมั่งคั่งทางการเงินของคุณ',anchors:{en:['financial','wealth'],th:['ฐานะ','มั่งคั่ง','การเงิน']}},
    financial_growth:{en:'your financial growth',th:'การเติบโตทางการเงินของคุณ',anchors:{en:['financial','growth'],th:['การเงิน','เติบโต']}},
    financial_stability:{en:'your financial stability',th:'ความมั่นคงทางการเงินของคุณ',anchors:{en:['financial','stability'],th:['มั่นคง','การเงิน']}},
    savings:{en:'your savings',th:'เงินออมและเงินเก็บของคุณ',anchors:{en:['saving'],th:['ออม','เงินเก็บ']}},
    debt:{en:'your debt situation',th:'สถานการณ์หนี้ของคุณ',anchors:{en:['debt'],th:['หนี้']}},
    expenses:{en:'your spending and expenses',th:'รายจ่ายและการใช้เงินของคุณ',anchors:{en:['spending','expense'],th:['รายจ่าย','ใช้เงิน']}},
    investment:{en:'your investment decision',th:'การตัดสินใจด้านการลงทุนของคุณ',anchors:{en:['invest'],th:['ลงทุน']}},
    profit:{en:'profitability and returns',th:'กำไรและผลตอบแทน',anchors:{en:['profit','return'],th:['กำไร','ผลตอบแทน']}},
    financial_opportunity:{en:'a financial opportunity',th:'โอกาสทางการเงิน',anchors:{en:['financial','opportunity'],th:['โอกาส','การเงิน']}},

    decision:{en:'the decision in front of you',th:'การตัดสินใจที่อยู่ตรงหน้า',anchors:{en:['decision'],th:['ตัดสินใจ']}},
    move_or_wait:{en:'whether to move now or wait',th:'การเดินหน้าตอนนี้หรือรอจังหวะ',anchors:{en:['move','wait'],th:['เดินหน้า','รอ']}},
    continue_or_stop:{en:'whether to continue or stop',th:'การไปต่อหรือหยุด',anchors:{en:['continue','stop'],th:['ไปต่อ','หยุด']}},
    accept_or_reject:{en:'whether to accept or decline',th:'การตอบรับหรือปฏิเสธ',anchors:{en:['accept','decline'],th:['รับ','ปฏิเสธ']}},
    buy_or_sell:{en:'whether to buy or sell',th:'การซื้อหรือขาย',anchors:{en:['buy','sell'],th:['ซื้อ','ขาย']}},
    risk_or_safe:{en:'the balance between risk and safety',th:'สมดุลระหว่างการเสี่ยงกับความปลอดภัย',anchors:{en:['risk','safe'],th:['เสี่ยง','ปลอดภัย']}},
    next_step:{en:'your next practical step',th:'ก้าวถัดไปที่ควรลงมือ',anchors:{en:['next step'],th:['ก้าวถัดไป','ขั้นต่อไป']}},

    success:{en:'the likelihood of success',th:'แนวโน้มของความสำเร็จ',anchors:{en:['success'],th:['สำเร็จ']}},
    opportunity:{en:'the opportunity available here',th:'โอกาสที่มีอยู่ในเรื่องนี้',anchors:{en:['opportunity'],th:['โอกาส']}},
    obstacle:{en:'the main obstacle',th:'อุปสรรคหลัก',anchors:{en:['obstacle'],th:['อุปสรรค']}},
    progress:{en:'the progress of this situation',th:'ความคืบหน้าของเรื่องนี้',anchors:{en:['progress'],th:['คืบหน้า']}},
    outcome:{en:'the likely direction of the outcome',th:'ทิศทางของผลลัพธ์',anchors:{en:['outcome'],th:['ผลลัพธ์']}},
    change:{en:'the direction of change',th:'ทิศทางของการเปลี่ยนแปลง',anchors:{en:['change'],th:['เปลี่ยนแปลง']}},
    timing:{en:'the timing of this situation',th:'จังหวะเวลาของเรื่องนี้',anchors:{en:['timing'],th:['จังหวะ','เวลา']}},

    anxiety:{en:'your anxiety or fear around this',th:'ความกังวลหรือความกลัวของคุณ',anchors:{en:['anxiety','fear'],th:['กังวล','กลัว']}},
    emotional_state:{en:'your emotional state',th:'สภาวะอารมณ์และจิตใจของคุณ',anchors:{en:['emotional'],th:['อารมณ์','จิตใจ']}},
    healing:{en:'your healing process',th:'กระบวนการเยียวยาของคุณ',anchors:{en:['healing'],th:['เยียวยา']}},
    motivation:{en:'your motivation',th:'แรงจูงใจของคุณ',anchors:{en:['motivation'],th:['แรงจูงใจ']}},
    habit:{en:'this recurring habit or pattern',th:'นิสัยหรือรูปแบบพฤติกรรมที่เกิดซ้ำ',anchors:{en:['habit','pattern'],th:['นิสัย','พฤติกรรม']}},
    purpose:{en:'your sense of purpose',th:'ความหมายและเป้าหมายในชีวิต',anchors:{en:['purpose'],th:['เป้าหมาย','ความหมาย']}},
    burnout:{en:'your burnout and energy level',th:'ภาวะหมดไฟและพลังใจของคุณ',anchors:{en:['burnout'],th:['หมดไฟ']}},
    personal_growth:{en:'your personal growth',th:'การเติบโตภายในของคุณ',anchors:{en:['growth'],th:['เติบโต']}},

    divine_protection:{en:'the idea of spiritual protection around you',th:'คำถามเรื่องการคุ้มครองทางจิตวิญญาณ',anchors:{en:['spiritual','protection'],th:['คุ้มครอง','จิตวิญญาณ']}},
    spiritual_path:{en:'your spiritual path',th:'เส้นทางทางจิตวิญญาณของคุณ',anchors:{en:['spiritual','path'],th:['จิตวิญญาณ','เส้นทาง']}},
    signs_synchronicity:{en:'the symbolic meaning of signs or synchronicities',th:'ความหมายเชิงสัญลักษณ์ของลางหรือเหตุสอดคล้อง',anchors:{en:['sign','synchronic'],th:['ลาง','สัญลักษณ์']}},
    dreams:{en:'the symbolism of this dream',th:'ความหมายเชิงสัญลักษณ์ของความฝันนี้',anchors:{en:['dream'],th:['ฝัน']}},
    spiritual_gifts:{en:'your intuitive or spiritual sensitivity',th:'ความไวทางสัญชาตญาณหรือจิตวิญญาณ',anchors:{en:['intuition','spiritual'],th:['สัญชาตญาณ','จิตวิญญาณ']}},
    karma_destiny:{en:'patterns you associate with karma or destiny',th:'รูปแบบที่คุณเชื่อมโยงกับกรรมหรือชะตา',anchors:{en:['karma','destiny'],th:['กรรม','ชะตา']}},
    past_life:{en:'the symbolic meaning of a past-life question',th:'ความหมายเชิงสัญลักษณ์ของคำถามเรื่องอดีตชาติ',anchors:{en:['past life'],th:['อดีตชาติ']}},
    unseen_influence:{en:'your concern about an unseen influence',th:'ความกังวลเรื่องอิทธิพลหรือสิ่งเร้นลับ',anchors:{en:['unseen'],th:['เร้นลับ','อิทธิพล']}}
  });

  const DOMAIN_TOPICS = Object.freeze({
    self_image:{en:'your self-image and attractiveness',th:'ภาพลักษณ์และเสน่ห์ของคุณ',anchors:{en:['self','image'],th:['ภาพลักษณ์','เสน่ห์']}},
    social_perception:{en:'how others may perceive you',th:'มุมมองที่คนอื่นมีต่อคุณ',anchors:{en:['others','perceive'],th:['คนอื่น','มอง']}},
    love_relationships:{en:'this love or relationship question',th:'เรื่องความรักหรือความสัมพันธ์นี้',anchors:{en:['relationship'],th:['ความสัมพันธ์']}},
    work_purpose:{en:'your work or direction',th:'เรื่องงานหรือทิศทางของคุณ',anchors:{en:['work'],th:['งาน']}},
    money_resources:{en:'your money and resources',th:'การเงินและทรัพยากรของคุณ',anchors:{en:['money'],th:['เงิน','การเงิน']}},
    choice_action:{en:'the decision or action in front of you',th:'การตัดสินใจหรือการลงมือในเรื่องนี้',anchors:{en:['decision'],th:['ตัดสินใจ']}},
    outlook_opportunity:{en:'the direction and opportunity in this situation',th:'แนวโน้มและโอกาสของสถานการณ์นี้',anchors:{en:['direction'],th:['แนวโน้ม']}},
    inner_growth:{en:'your inner state and growth',th:'สภาวะใจและการเติบโตภายใน',anchors:{en:['inner'],th:['สภาวะใจ','เติบโต']}},
    spiritual_unseen:{en:'this spiritual or unseen question',th:'คำถามด้านจิตวิญญาณหรือสิ่งเร้นลับนี้',anchors:{en:['spiritual'],th:['จิตวิญญาณ']}},
    general:{en:'the situation you asked about',th:'เรื่องที่คุณถาม',anchors:{en:['situation'],th:['เรื่อง']} }
  });

  function topicFor(analysis) {
    return TOPICS[analysis?.facet] || DOMAIN_TOPICS[analysis?.domain] || DOMAIN_TOPICS.general;
  }

  function timeFor(analysis, lang='en') {
    const meta = analysis?.timeframeMeta;
    if (!meta?.explicit) return '';
    return meta.labels?.[lang === 'th' ? 'th' : 'en'] || '';
  }

  function build(analysis) {
    const safe = analysis || {};
    const topic = topicFor(safe);
    const mustCover = new Set(['topic','card_rationale','condition']);
    const mustAvoid = new Set(['domain_drift','unsupported_certainty']);
    const directionalTypes = new Set(['degree','evaluation','outlook','probability','verification','compatibility','decision']);
    if (directionalTypes.has(safe.questionType)) mustCover.add('direction');
    if (safe.timeframeMeta?.explicit) mustCover.add('timeframe');
    if (safe.target && safe.target !== 'situation') mustCover.add('target');
    if (safe.metric && safe.metric !== 'general') mustCover.add('metric');
    if (safe.epistemicMode === 'third-party-uncertain' || safe.questionType === 'feelings') {
      mustCover.add('third_party_boundary');
      mustAvoid.add('mind_reading_claim');
    }
    if (safe.epistemicMode === 'symbolic-only' || safe.epistemicMode === 'unseen-threat') {
      mustCover.add('epistemic_boundary');
      mustAvoid.add('supernatural_fact_claim');
    }
    if (safe.epistemicMode === 'unseen-threat') mustAvoid.add('fear_confirmation');
    if (safe.questionType === 'timing') mustAvoid.add('exact_date_claim');

    return Object.freeze({
      version:VERSION,
      domain:safe.domain || 'general',
      facet:safe.facet || 'general',
      target:safe.target || 'situation',
      perspective:safe.perspective || 'general',
      questionType:safe.questionType || 'open',
      metric:safe.metric || 'general',
      timeframe:safe.timeframe || 'unspecified',
      timeframeMeta:safe.timeframeMeta || null,
      polarity:safe.polarity || 'open',
      certaintyRequest:safe.certaintyRequest || 'low',
      conditional:Boolean(safe.conditional),
      comparison:Boolean(safe.comparison),
      topic:Object.freeze({ ...topic, anchors:Object.freeze({ en:Object.freeze([...(topic.anchors?.en || [])]), th:Object.freeze([...(topic.anchors?.th || [])]) }) }),
      mustCover:Object.freeze([...mustCover]),
      mustAvoid:Object.freeze([...mustAvoid])
    });
  }

  window.LGTQuestionContract = Object.freeze({ version:VERSION, build, topicFor, timeFor });
})();

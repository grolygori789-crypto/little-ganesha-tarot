(() => {
  'use strict';

  const VERSION = 'tarot-library-content-v1';
  const Reading = window.LGTReadingContent;
  if (!Reading || !Array.isArray(Reading.cards) || Reading.cards.length !== 78) {
    throw new Error('Tarot Library requires the canonical 78-card reading content.');
  }

  const COPY = {
    en: {
      eyebrow: 'THE TAROT LIBRARY', title: 'A private room for the cards',
      intro: 'Explore all 78 cards, learn how tarot developed, and understand how Little Ganesha turns cards and positions into a coherent reading.',
      exploreCards: 'Explore the 78 Cards', exploreCardsSub: 'Browse the complete deck and open any card in detail.',
      learnTarot: 'Learn Tarot', learnTarotSub: 'History, deck structure, suits, court cards, and symbolism.',
      waysRead: 'Ways to Read', waysReadSub: 'How one card, three cards, positions, questions, and reversals work.',
      ganeshaSpreads: 'Little Ganesha Spreads', ganeshaSpreadsSub: 'A clear guide to every reading mode in this app.',
      essentials: 'Tarot Essentials', essentialsSub: 'Short answers to the questions that matter most.',
      backHome: 'Back to Home', backLibrary: 'Back to Library',
      search: 'Search the deck', searchPlaceholder: 'Search by card name or keyword…', all: 'All',
      major: 'Major Arcana', minor: 'Minor Arcana', wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles',
      cardsFound: (n) => `${n} cards`, noCards: 'No cards match that search.',
      coreMeaning: 'Core meaning', reflection: 'Reflection', readingLenses: 'Read this card in context',
      cardNumber: 'Card', keywords: 'Keywords', openCard: 'Open card', close: 'Close',
      historyTitle: 'From Renaissance table to modern reading',
      structureTitle: 'How the 78-card deck is built',
      suitsTitle: 'The four suits', courtTitle: 'Court cards', symbolismTitle: 'How symbolism becomes meaning',
      waysTitle: 'Reading is more than memorising meanings',
      oneCardTitle: 'One card', threeCardTitle: 'Three cards', questionsTitle: 'Ask better questions', reversalsTitle: 'Reversals', tensionTitle: 'When cards disagree', rereadTitle: 'Why not keep rerolling?',
      spreadsTitle: 'How Little Ganesha reads',
      dailyTitle: 'Daily Guidance', askTitle: 'Ask Ganesha', threeTitle: 'Three-Card Reading', goldenTitle: 'The Golden Path', obstacleTitle: 'Remove the Obstacle', luckyTitle: 'Lucky Numbers',
      essentialsTitle: 'Tarot Essentials',
      aboutEyebrow: 'ABOUT & GUIDE', aboutTitle: 'How Little Ganesha works',
      aboutSub: 'A practical guide to readings, privacy, languages, accessibility, and what stays on your device.',
      aboutSettingsTitle: 'About & Guide', aboutSettingsSub: 'How readings, privacy, Save/Share, and daily limits work',
      openLibrary: 'Open Tarot Library',
      privacyTitle: 'Privacy on this device', dailyRulesTitle: 'Daily reading rules', saveShareTitle: 'Save & Share', languagesTitle: 'Languages', accessibilityTitle: 'Motion & accessibility', creditsTitle: 'About the project',
      sourceNote: 'History notes are written conservatively from museum scholarship; later occult traditions are identified as later developments, not ancient fact.',
      lensWork: 'Work & Goals', lensMoney: 'Money & Resources', lensLove: 'Love & Relationships', lensInner: 'Inner State & Balance', lensWatch: 'Opportunities & Watch-outs', lensGuide: 'Guidance for Today',
      majorLabel: 'Major Arcana', minorLabel: 'Minor Arcana',
      suitWands: 'Wands', suitCups: 'Cups', suitSwords: 'Swords', suitPentacles: 'Pentacles',
      rankAce: 'Ace', rankTwo: 'Two', rankThree: 'Three', rankFour: 'Four', rankFive: 'Five', rankSix: 'Six', rankSeven: 'Seven', rankEight: 'Eight', rankNine: 'Nine', rankTen: 'Ten', rankPage: 'Page', rankKnight: 'Knight', rankQueen: 'Queen', rankKing: 'King',
      spreadPast: 'PAST', spreadNow: 'NOW', spreadNext: 'NEXT', spreadBlock: 'BLOCK', spreadPath: 'PATH', spreadFeeds: 'FEEDS', spreadRelease: 'RELEASE'
    },
    th: {
      eyebrow: 'คลังความรู้ไพ่ทาโรต์', title: 'ห้องส่วนตัวสำหรับทำความรู้จักไพ่',
      intro: 'สำรวจไพ่ครบทั้ง 78 ใบ เรียนรู้ที่มาของไพ่ทาโรต์ และเข้าใจว่า Little Ganesha เชื่อมความหมายของไพ่ ตำแหน่ง และคำถามให้กลายเป็นคำอ่านหนึ่งเรื่องได้อย่างไร',
      exploreCards: 'สำรวจไพ่ทั้ง 78 ใบ', exploreCardsSub: 'เปิดดูสำรับทั้งหมดและอ่านรายละเอียดของไพ่แต่ละใบ',
      learnTarot: 'เรียนรู้ไพ่ทาโรต์', learnTarotSub: 'ประวัติ โครงสร้างสำรับ ชุดไพ่ ไพ่บุคคล และหลักการอ่านสัญลักษณ์',
      waysRead: 'วิธีอ่านไพ่', waysReadSub: 'เข้าใจการเปิดหนึ่งใบ สามใบ ตำแหน่ง คำถาม และไพ่กลับหัว',
      ganeshaSpreads: 'รูปแบบการเปิดไพ่ของ Little Ganesha', ganeshaSpreadsSub: 'คู่มือแต่ละโหมดในแอปแบบอ่านแล้วใช้ได้ทันที',
      essentials: 'ความรู้ที่ควรรู้', essentialsSub: 'คำตอบสั้นๆ สำหรับคำถามสำคัญเกี่ยวกับการอ่านไพ่',
      backHome: 'กลับหน้าหลัก', backLibrary: 'กลับคลังไพ่',
      search: 'ค้นหาไพ่', searchPlaceholder: 'ค้นหาจากชื่อไพ่หรือคำสำคัญ…', all: 'ทั้งหมด',
      major: 'เมเจอร์อาร์คานา', minor: 'ไมเนอร์อาร์คานา', wands: 'ไม้เท้า', cups: 'ถ้วย', swords: 'ดาบ', pentacles: 'เหรียญ',
      cardsFound: (n) => `${n} ใบ`, noCards: 'ไม่พบไพ่ที่ตรงกับคำค้นนี้',
      coreMeaning: 'ความหมายหลัก', reflection: 'คำถามชวนทบทวน', readingLenses: 'อ่านไพ่ใบนี้ในบริบทต่างๆ',
      cardNumber: 'ไพ่ใบที่', keywords: 'คำสำคัญ', openCard: 'เปิดดูไพ่', close: 'ปิด',
      historyTitle: 'จากโต๊ะเล่นไพ่ยุคเรอเนซองส์สู่การอ่านไพ่ในปัจจุบัน',
      structureTitle: 'โครงสร้างของสำรับ 78 ใบ',
      suitsTitle: 'ไพ่ทั้งสี่ชุด', courtTitle: 'ไพ่บุคคล', symbolismTitle: 'สัญลักษณ์กลายเป็นความหมายได้อย่างไร',
      waysTitle: 'การอ่านไพ่ไม่ใช่การท่องความหมาย',
      oneCardTitle: 'เปิดไพ่หนึ่งใบ', threeCardTitle: 'เปิดไพ่สามใบ', questionsTitle: 'ตั้งคำถามให้ได้คำอ่านที่มีประโยชน์', reversalsTitle: 'ไพ่กลับหัว', tensionTitle: 'เมื่อไพ่พูดคนละด้าน', rereadTitle: 'ทำไมไม่ควรสุ่มซ้ำจนได้คำตอบที่ชอบ',
      spreadsTitle: 'Little Ganesha อ่านไพ่อย่างไร',
      dailyTitle: 'คำแนะนำประจำวัน', askTitle: 'ถามพระพิฆเนศน้อย', threeTitle: 'เปิดไพ่สามใบ', goldenTitle: 'เส้นทางสีทอง', obstacleTitle: 'คลายอุปสรรค', luckyTitle: 'เลขมงคล',
      essentialsTitle: 'ความรู้ที่ควรรู้เกี่ยวกับ Tarot',
      aboutEyebrow: 'เกี่ยวกับแอปและคู่มือ', aboutTitle: 'Little Ganesha ทำงานอย่างไร',
      aboutSub: 'คำอธิบายเรื่องการเปิดไพ่ ความเป็นส่วนตัว ภาษา การบันทึก/แชร์ และข้อมูลที่เก็บอยู่บนอุปกรณ์',
      aboutSettingsTitle: 'เกี่ยวกับแอปและคู่มือ', aboutSettingsSub: 'การเปิดไพ่ ความเป็นส่วนตัว การบันทึก/แชร์ และกติกาประจำวัน',
      openLibrary: 'เปิดคลังไพ่ทาโรต์',
      privacyTitle: 'ความเป็นส่วนตัวบนอุปกรณ์', dailyRulesTitle: 'กติกาการเปิดไพ่ประจำวัน', saveShareTitle: 'การบันทึกและแชร์', languagesTitle: 'ภาษา', accessibilityTitle: 'การเคลื่อนไหวและการเข้าถึง', creditsTitle: 'เกี่ยวกับโปรเจกต์',
      sourceNote: 'ส่วนประวัติยึดข้อมูลจากงานพิพิธภัณฑ์และเขียนอย่างระมัดระวัง ความเชื่อสายไสยศาสตร์ที่เกิดภายหลังจะถูกระบุว่าเป็นพัฒนาการภายหลัง ไม่เล่าเป็นข้อเท็จจริงโบราณ',
      lensWork: 'การงานและเป้าหมาย', lensMoney: 'การเงินและทรัพยากร', lensLove: 'ความรักและความสัมพันธ์', lensInner: 'สภาวะใจและสมดุล', lensWatch: 'โอกาสและสิ่งที่ควรระวัง', lensGuide: 'คำแนะนำสำหรับวันนี้',
      majorLabel: 'เมเจอร์อาร์คานา', minorLabel: 'ไมเนอร์อาร์คานา',
      suitWands: 'ไม้เท้า', suitCups: 'ถ้วย', suitSwords: 'ดาบ', suitPentacles: 'เหรียญ',
      rankAce: 'หนึ่ง', rankTwo: 'สอง', rankThree: 'สาม', rankFour: 'สี่', rankFive: 'ห้า', rankSix: 'หก', rankSeven: 'เจ็ด', rankEight: 'แปด', rankNine: 'เก้า', rankTen: 'สิบ', rankPage: 'เด็ก', rankKnight: 'อัศวิน', rankQueen: 'ราชินี', rankKing: 'ราชา',
      spreadPast: 'อดีต', spreadNow: 'ตอนนี้', spreadNext: 'ต่อจากนี้', spreadBlock: 'สิ่งกั้น', spreadPath: 'ทางข้างหน้า', spreadFeeds: 'สิ่งหล่อเลี้ยง', spreadRelease: 'สิ่งช่วยคลาย'
    },
    hi: {
      eyebrow: 'टैरो लाइब्रेरी', title: 'कार्डों को समझने की आपकी निजी जगह',
      intro: 'सभी 78 कार्ड देखें, टैरो का इतिहास समझें और जानें कि Little Ganesha कार्ड, उनकी स्थिति और आपके सवाल को मिलाकर एक जुड़ी हुई रीडिंग कैसे बनाता है।',
      exploreCards: 'सभी 78 कार्ड देखें', exploreCardsSub: 'पूरे डेक में जाएँ और किसी भी कार्ड को विस्तार से खोलें।',
      learnTarot: 'टैरो सीखें', learnTarotSub: 'इतिहास, डेक की बनावट, सूट, कोर्ट कार्ड और प्रतीकों की समझ।',
      waysRead: 'कार्ड पढ़ने के तरीके', waysReadSub: 'एक कार्ड, तीन कार्ड, पोज़िशन, सवाल और रिवर्सल कैसे काम करते हैं।',
      ganeshaSpreads: 'Little Ganesha के स्प्रेड', ganeshaSpreadsSub: 'ऐप के हर रीडिंग मोड की साफ़, उपयोगी गाइड।',
      essentials: 'ज़रूरी बातें', essentialsSub: 'टैरो के बारे में सबसे काम के सवालों के सीधे जवाब।',
      backHome: 'होम पर लौटें', backLibrary: 'लाइब्रेरी पर लौटें',
      search: 'डेक में खोजें', searchPlaceholder: 'कार्ड के नाम या कीवर्ड से खोजें…', all: 'सभी',
      major: 'मेजर आर्काना', minor: 'माइनर आर्काना', wands: 'वॉन्ड्स', cups: 'कप्स', swords: 'स्वॉर्ड्स', pentacles: 'पेंटाकल्स',
      cardsFound: (n) => `${n} कार्ड`, noCards: 'इस खोज से कोई कार्ड नहीं मिला।',
      coreMeaning: 'मुख्य अर्थ', reflection: 'सोचने के लिए सवाल', readingLenses: 'इस कार्ड को अलग संदर्भों में पढ़ें',
      cardNumber: 'कार्ड', keywords: 'मुख्य शब्द', openCard: 'कार्ड खोलें', close: 'बंद करें',
      historyTitle: 'रेनेसाँ के कार्ड-टेबल से आधुनिक टैरो रीडिंग तक',
      structureTitle: '78 कार्ड का डेक कैसे बना है',
      suitsTitle: 'चार सूट', courtTitle: 'कोर्ट कार्ड', symbolismTitle: 'प्रतीक अर्थ में कैसे बदलते हैं',
      waysTitle: 'टैरो पढ़ना केवल अर्थ याद करना नहीं है',
      oneCardTitle: 'एक कार्ड', threeCardTitle: 'तीन कार्ड', questionsTitle: 'बेहतर सवाल पूछें', reversalsTitle: 'रिवर्सल', tensionTitle: 'जब कार्ड अलग बातें दिखाएँ', rereadTitle: 'बार-बार नया कार्ड क्यों न निकालें?',
      spreadsTitle: 'Little Ganesha रीडिंग कैसे करता है',
      dailyTitle: 'आज का मार्गदर्शन', askTitle: 'गणेश से पूछें', threeTitle: 'तीन कार्ड की रीडिंग', goldenTitle: 'गोल्डन पाथ', obstacleTitle: 'रुकावट से रास्ता निकालें', luckyTitle: 'शुभ अंक',
      essentialsTitle: 'टैरो की ज़रूरी बातें',
      aboutEyebrow: 'ऐप के बारे में और गाइड', aboutTitle: 'Little Ganesha कैसे काम करता है',
      aboutSub: 'रीडिंग, प्राइवेसी, भाषाएँ, Save/Share, एक्सेसिबिलिटी और डिवाइस पर रहने वाले डेटा की साफ़ गाइड।',
      aboutSettingsTitle: 'ऐप के बारे में और गाइड', aboutSettingsSub: 'रीडिंग, प्राइवेसी, सेव/शेयर और रोज़ की सीमाएँ कैसे काम करती हैं',
      openLibrary: 'टैरो लाइब्रेरी खोलें',
      privacyTitle: 'इस डिवाइस पर आपकी प्राइवेसी', dailyRulesTitle: 'रोज़ की रीडिंग के नियम', saveShareTitle: 'Save & Share', languagesTitle: 'भाषाएँ', accessibilityTitle: 'मोशन और एक्सेसिबिलिटी', creditsTitle: 'प्रोजेक्ट के बारे में',
      sourceNote: 'इतिहास वाला भाग संग्रहालयों के शोध पर सावधानी से आधारित है; बाद की ऑकल्ट परंपराओं को बाद का विकास ही बताया गया है, प्राचीन तथ्य नहीं।',
      lensWork: 'काम और लक्ष्य', lensMoney: 'पैसा और संसाधन', lensLove: 'प्यार और रिश्ते', lensInner: 'भीतरी स्थिति और संतुलन', lensWatch: 'अवसर और सावधानियाँ', lensGuide: 'आज के लिए दिशा',
      majorLabel: 'मेजर आर्काना', minorLabel: 'माइनर आर्काना',
      suitWands: 'वॉन्ड्स', suitCups: 'कप्स', suitSwords: 'स्वॉर्ड्स', suitPentacles: 'पेंटाकल्स',
      rankAce: 'ऐस', rankTwo: 'दो', rankThree: 'तीन', rankFour: 'चार', rankFive: 'पाँच', rankSix: 'छह', rankSeven: 'सात', rankEight: 'आठ', rankNine: 'नौ', rankTen: 'दस', rankPage: 'पेज', rankKnight: 'नाइट', rankQueen: 'क्वीन', rankKing: 'किंग',
      spreadPast: 'अतीत', spreadNow: 'अभी', spreadNext: 'आगे', spreadBlock: 'रुकावट', spreadPath: 'रास्ता', spreadFeeds: 'क्या बढ़ाता है', spreadRelease: 'क्या ढीला करता है'
    }
  };

  const LEARN = {
    en: {
      history: [
        { y: '1440s–1450s', h: 'Tarot appears in northern Italy', p: 'The earliest surviving references cluster around Venice, Milan, Florence, and Urbino. These decks used the familiar Italian suits—Cups, Swords, Batons, and Coins—plus a Fool and a sequence of trump cards.' },
        { y: '15th century', h: 'First a game, not an occult system', p: 'Early tarot was a trick-taking card game. The luxury Visconti and Visconti-Sforza decks show how richly these cards could be painted for Renaissance courts.' },
        { y: 'Late 18th century', h: 'Divination enters the story', p: 'Card reading and tarot became increasingly connected in France. Etteilla helped develop systems specifically aimed at divination; claims of ancient Egyptian origins also circulated, but those claims are not established history.' },
        { y: '19th–20th centuries', h: 'Occult and modern reading traditions grow', p: 'Occult writers layered numerology, Kabbalah, astrology, and other systems onto tarot. Later illustrated decks made the Minor Arcana much easier to read visually and helped shape modern practice.' }
      ],
      structure: 'A standard modern tarot deck has 78 cards: 22 Major Arcana and 56 Minor Arcana. The Minor Arcana contains four suits of 14 cards each—Ace through Ten, then Page, Knight, Queen, and King.',
      major: 'Major Arcana cards usually carry broad themes: thresholds, choices, identity, power, change, loss, integration, and completion. In a spread they often feel like the chapter heading rather than a small detail.',
      suits: {
        wands: ['Wands', 'Drive · creativity · initiative · momentum', 'Little Ganesha reads Wands through action, ambition, energy, and the way a person moves something forward.'],
        cups: ['Cups', 'Feeling · relationships · receptivity · imagination', 'Cups bring attention to emotional exchange, attachment, intuition, connection, and what the heart is actually responding to.'],
        swords: ['Swords', 'Thought · truth · tension · communication', 'Swords deal with ideas, decisions, language, conflict, perspective, and the consequences of how we interpret a situation.'],
        pentacles: ['Pentacles', 'Resources · body · work · material reality', 'Pentacles ground a reading in what can be built, maintained, afforded, practised, or cared for in the physical world.']
      },
      court: 'Court cards can describe a person, a role, a style of behaviour, or a stage of mastery. Page explores, Knight pursues, Queen embodies and tends, King directs and stewards. Context decides which reading is useful.',
      symbolism: 'A symbol is not a fixed code. Colour, posture, objects, direction, number, suit, and the card’s position all contribute. Strong reading comes from combining those signals with the real question—not from forcing one keyword to explain everything.'
    },
    th: {
      history: [
        { y: 'ค.ศ. 1440–1450 โดยประมาณ', h: 'ไพ่ทาโรต์ปรากฏในอิตาลีตอนเหนือ', p: 'หลักฐานอ้างอิงยุคแรกกระจุกอยู่แถบเวนิส มิลาน ฟลอเรนซ์ และอูร์บิโน สำรับใช้ชุดไพ่แบบอิตาลีที่คุ้นกันคือ ถ้วย ดาบ ไม้เท้า และเหรียญ แล้วเพิ่มไพ่ The Fool กับไพ่ชุดทรัมป์เข้าไป' },
        { y: 'ศตวรรษที่ 15', h: 'เดิมคือเกมไพ่ ไม่ใช่ระบบพยากรณ์', p: 'ไพ่ทาโรต์ยุคแรกใช้เล่นเกมแบบมีไพ่ทรัมป์ สำรับหรูอย่าง Visconti และ Visconti-Sforza แสดงให้เห็นว่าราชสำนักยุคเรอเนซองส์ให้คุณค่ากับไพ่ในฐานะงานศิลป์ด้วย' },
        { y: 'ปลายศตวรรษที่ 18', h: 'การทำนายเริ่มเข้ามาเป็นส่วนหนึ่งของเรื่องราว', p: 'การอ่านไพ่และไพ่ทาโรต์เริ่มเชื่อมโยงกันมากขึ้นในฝรั่งเศส Etteilla มีบทบาทสำคัญในการพัฒนาระบบที่ตั้งใจใช้เพื่อการทำนายโดยตรง ขณะเดียวกันก็มีแนวคิดว่าไพ่มีต้นกำเนิดจากอียิปต์โบราณ ซึ่งยังไม่มีหลักฐานทางประวัติศาสตร์รองรับ' },
        { y: 'ศตวรรษที่ 19–20', h: 'สายไสยศาสตร์และการอ่านไพ่สมัยใหม่เติบโต', p: 'นักเขียนสายลึกลับนำเรื่องตัวเลข คับบาลาห์ โหราศาสตร์ และระบบสัญลักษณ์อื่นๆ มาเชื่อมกับไพ่ ต่อมาสำรับที่วาดภาพ Minor Arcana อย่างเต็มรูปแบบช่วยให้การอ่านจากภาพเข้าถึงง่ายขึ้น และมีอิทธิพลต่อการอ่านไพ่ยุคปัจจุบันอย่างมาก' }
      ],
      structure: 'สำรับมาตรฐานในปัจจุบันมี 78 ใบ แบ่งเป็น Major Arcana 22 ใบ และ Minor Arcana 56 ใบ โดย Minor Arcana มี 4 ชุด ชุดละ 14 ใบ ตั้งแต่ Ace ถึง 10 แล้วต่อด้วย Page, Knight, Queen และ King',
      major: 'Major Arcana มักพูดถึงประเด็นใหญ่ของชีวิต เช่น การเริ่มต้น การเลือก อัตลักษณ์ อำนาจ การเปลี่ยนแปลง การสูญเสีย การยอมรับ และการปิดวงจร เวลาอยู่ในสเปรด มันมักทำหน้าที่เหมือนหัวบทของเรื่อง มากกว่ารายละเอียดเล็กๆ',
      suits: {
        wands: ['ไม้เท้า', 'แรงขับ · ความคิดสร้างสรรค์ · การริเริ่ม · การเคลื่อนไหว', 'ใน Little Ganesha ไพ่ไม้เท้าพูดถึงการลงมือทำ ความทะเยอทะยาน พลัง และวิธีที่เราผลักบางสิ่งให้เดินหน้า'],
        cups: ['ถ้วย', 'ความรู้สึก · ความสัมพันธ์ · การเปิดรับ · จินตนาการ', 'ไพ่ถ้วยพาไปดูการแลกเปลี่ยนทางอารมณ์ ความผูกพัน สัญชาตญาณ ความเชื่อมโยง และสิ่งที่ใจตอบสนองจริงๆ'],
        swords: ['ดาบ', 'ความคิด · ความจริง · ความตึงเครียด · การสื่อสาร', 'ไพ่ดาบเกี่ยวกับความคิด การตัดสินใจ ภาษา ความขัดแย้ง มุมมอง และผลที่เกิดจากวิธีที่เราแปลความสถานการณ์'],
        pentacles: ['เหรียญ', 'ทรัพยากร · ร่างกาย · งาน · โลกที่จับต้องได้', 'ไพ่เหรียญทำให้คำอ่านกลับมาอยู่กับสิ่งที่สร้างได้ ดูแลได้ จ่ายไหว ฝึกได้ หรือทำให้มั่นคงขึ้นในชีวิตจริง']
      },
      court: 'ไพ่บุคคลอาจหมายถึงคนจริง บทบาท วิธีแสดงออก หรือระดับความชำนาญก็ได้ Page คือการสำรวจ Knight คือการพุ่งตามสิ่งที่ต้องการ Queen คือการมีคุณสมบัตินั้นอยู่ในตัวและดูแลมัน ส่วน King คือการกำกับและบริหาร สิ่งที่เหมาะที่สุดต้องดูจากบริบทของคำถาม',
      symbolism: 'สัญลักษณ์ไม่ใช่รหัสตายตัว สี ท่าทาง วัตถุ ทิศทาง ตัวเลข ชุดไพ่ และตำแหน่งในสเปรดต่างช่วยกันสร้างความหมาย การอ่านที่ดีจึงไม่ใช่การหยิบคีย์เวิร์ดเดียวมาครอบทุกอย่าง แต่เป็นการเชื่อมสัญญาณเหล่านั้นเข้ากับคำถามจริง'
    },
    hi: {
      history: [
        { y: '1440–1450 के दशक', h: 'उत्तरी इटली में टैरो के शुरुआती प्रमाण', p: 'सबसे पुराने लिखित संदर्भ वेनिस, मिलान, फ्लोरेंस और उर्बिनो के आसपास मिलते हैं। डेक में कप्स, स्वॉर्ड्स, बैटन्स और कॉइन्स जैसे इतालवी सूट थे, साथ में फ़ूल और ट्रम्प कार्डों की एक अलग शृंखला।' },
        { y: '15वीं सदी', h: 'शुरुआत एक खेल के रूप में हुई', p: 'शुरुआती टैरो ट्रिक-टेकिंग कार्ड गेम था, कोई प्राचीन ऑकल्ट प्रणाली नहीं। Visconti और Visconti-Sforza जैसे शानदार डेक यह भी दिखाते हैं कि रेनेसाँ दरबारों में कार्ड कला की वस्तु भी थे।' },
        { y: '18वीं सदी का उत्तरार्ध', h: 'भविष्यकथन टैरो से जुड़ने लगा', p: 'फ्रांस में कार्ड रीडिंग और टैरो का संबंध बढ़ा। Etteilla ने खास तौर पर divination के लिए प्रणालियाँ विकसित कीं। उसी दौर में मिस्र से प्राचीन उत्पत्ति जैसे दावे लोकप्रिय हुए, लेकिन उन्हें स्थापित इतिहास नहीं माना जाता।' },
        { y: '19वीं–20वीं सदी', h: 'ऑकल्ट और आधुनिक रीडिंग परंपराएँ विकसित हुईं', p: 'बाद के लेखकों ने अंकशास्त्र, Kabbalah, ज्योतिष और दूसरी प्रतीक-प्रणालियों को टैरो से जोड़ा। चित्रित Minor Arcana वाले आधुनिक डेक ने कार्डों को दृश्य रूप से पढ़ना आसान बनाया और आज की रीडिंग शैली पर गहरा असर डाला।' }
      ],
      structure: 'आज का मानक टैरो डेक 78 कार्ड का होता है: 22 Major Arcana और 56 Minor Arcana। Minor Arcana में चार सूट होते हैं, हर सूट में 14 कार्ड—Ace से Ten, फिर Page, Knight, Queen और King।',
      major: 'Major Arcana अक्सर जीवन के बड़े विषयों को उठाते हैं—शुरुआत, चुनाव, पहचान, शक्ति, परिवर्तन, खोना, स्वीकार करना और किसी चक्र का पूरा होना। स्प्रेड में वे अक्सर छोटे विवरण से ज़्यादा पूरी कहानी का शीर्षक बनते हैं।',
      suits: {
        wands: ['वॉन्ड्स', 'प्रेरणा · रचनात्मकता · पहल · गति', 'Little Ganesha में Wands कार्रवाई, महत्वाकांक्षा, ऊर्जा और किसी बात को आगे बढ़ाने के तरीके से जुड़े हैं।'],
        cups: ['कप्स', 'भावना · रिश्ते · ग्रहणशीलता · कल्पना', 'Cups भावनात्मक आदान-प्रदान, लगाव, अंतर्ज्ञान, जुड़ाव और दिल की वास्तविक प्रतिक्रिया पर रोशनी डालते हैं।'],
        swords: ['स्वॉर्ड्स', 'विचार · सच · तनाव · संवाद', 'Swords सोच, निर्णय, भाषा, टकराव, नज़रिया और किसी स्थिति की हमारी व्याख्या के परिणामों से जुड़े हैं।'],
        pentacles: ['पेंटाकल्स', 'संसाधन · शरीर · काम · ठोस वास्तविकता', 'Pentacles रीडिंग को उन बातों में जमीन देते हैं जिन्हें बनाया, संभाला, वहन, अभ्यास या वास्तविक जीवन में स्थिर किया जा सकता है।']
      },
      court: 'Court cards किसी व्यक्ति, भूमिका, व्यवहार की शैली या महारत के स्तर को दिखा सकते हैं। Page खोजता है, Knight पीछा करता है, Queen उस गुण को जीती और सँभालती है, King दिशा देता और जिम्मेदारी से चलाता है। सही अर्थ संदर्भ तय करता है।',
      symbolism: 'प्रतीक कोई स्थायी कोड नहीं है। रंग, मुद्रा, वस्तु, दिशा, संख्या, सूट और कार्ड की पोज़िशन—सब मिलकर अर्थ बनाते हैं। अच्छी रीडिंग एक कीवर्ड को हर जगह फिट नहीं करती; वह इन संकेतों को असली सवाल से जोड़ती है।'
    }
  };

  const WAYS = {
    en: {
      one: 'One card works best when the question is narrow enough for one central theme. Read it as a lens: what deserves attention, what pattern is active, or what quality would help now.',
      three: 'Three cards create grammar. The meaning of each card changes slightly because it has a job. Past / Present / What May Unfold Next is not three separate predictions—it is one sequence.',
      questions: 'Useful tarot questions are specific without demanding false certainty. “What should I understand about this situation?” usually creates a better reading than “Will this definitely happen?”',
      reversals: 'Traditions differ. Some readers use upside-down cards; others read the full range of a card through context and position. Little Ganesha is currently upright-first and uses position, focus, question, and card tension to create nuance.',
      tension: 'Cards do not need to agree. One may describe desire while another shows constraint. That contradiction is often the most informative part of the spread because it names the tension you are actually living with.',
      reread: 'Repeatedly drawing until the answer feels comfortable changes reflection into answer-shopping. Little Ganesha therefore keeps completed daily readings stable until the local day changes.'
    },
    th: {
      one: 'ไพ่หนึ่งใบเหมาะกับคำถามที่แคบพอให้มีแกนหลักเพียงหนึ่งเรื่อง ใช้ไพ่เป็นเลนส์ว่าอะไรควรได้รับความสนใจ รูปแบบอะไรทำงานอยู่ หรือคุณภาพแบบไหนจะช่วยได้ในตอนนี้',
      three: 'ไพ่สามใบทำงานเหมือนไวยากรณ์ของเรื่อง แต่ละใบมีหน้าที่จึงเปลี่ยนน้ำหนักของความหมายเล็กน้อย อดีต / ปัจจุบัน / แนวโน้มต่อจากนี้ ไม่ใช่คำพยากรณ์สามชิ้นแยกกัน แต่เป็นลำดับเดียวกัน',
      questions: 'คำถามที่ดีควรเฉพาะเจาะจง แต่ไม่บังคับให้ไพ่รับรองสิ่งที่ไม่มีใครรู้แน่ เช่น “ฉันควรเข้าใจอะไรเกี่ยวกับสถานการณ์นี้?” มักให้คำอ่านที่มีประโยชน์กว่า “มันจะเกิดขึ้นแน่นอนไหม?”',
      reversals: 'แต่ละสายใช้ไพ่กลับหัวไม่เหมือนกัน บางคนใช้ บางคนอ่านด้านสว่างและด้านเงาจากบริบทกับตำแหน่งแทน ปัจจุบัน Little Ganesha ใช้ระบบ upright-first แล้วสร้างความละเอียดจากตำแหน่ง Focus คำถาม และแรงตึงระหว่างไพ่',
      tension: 'ไพ่ไม่จำเป็นต้องเห็นพ้องกัน ใบหนึ่งอาจบอกถึงความต้องการ แต่อีกใบชี้ข้อจำกัด ความไม่ลงรอยนั้นมักเป็นส่วนที่มีค่าที่สุด เพราะมันเรียกชื่อแรงดึงสองด้านที่คุณกำลังเจออยู่จริง',
      reread: 'การสุ่มใหม่ซ้ำๆ จนได้คำตอบที่สบายใจทำให้การทบทวนกลายเป็นการเลือกซื้อคำตอบ Little Ganesha จึงล็อกคำอ่านที่เสร็จแล้วไว้จนถึงวันใหม่ตามเวลาบนอุปกรณ์'
    },
    hi: {
      one: 'एक कार्ड तब सबसे अच्छा काम करता है जब सवाल इतना केंद्रित हो कि एक मुख्य थीम पकड़ी जा सके। इसे एक लेंस की तरह पढ़ें—अभी किस बात को ध्यान चाहिए, कौन-सा पैटर्न सक्रिय है, या कौन-सी गुणवत्ता मदद करेगी।',
      three: 'तीन कार्ड मिलकर व्याकरण बनाते हैं। हर कार्ड की पोज़िशन उसकी भूमिका तय करती है, इसलिए अर्थ थोड़ा बदलता है। Past / Present / What May Unfold Next तीन अलग भविष्यवाणियाँ नहीं, एक ही क्रम की कहानी है।',
      questions: 'अच्छा सवाल स्पष्ट होता है, लेकिन झूठी निश्चितता नहीं माँगता। “मुझे इस स्थिति के बारे में क्या समझना चाहिए?” आम तौर पर “क्या यह पक्का होगा?” से अधिक उपयोगी रीडिंग देता है।',
      reversals: 'परंपराएँ अलग हैं। कुछ पाठक उल्टे कार्ड इस्तेमाल करते हैं, कुछ संदर्भ और पोज़िशन से कार्ड के पूरे दायरे को पढ़ते हैं। Little Ganesha अभी upright-first है और पोज़िशन, Focus, सवाल और कार्डों के बीच के तनाव से सूक्ष्मता बनाता है।',
      tension: 'कार्डों का एक-दूसरे से सहमत होना ज़रूरी नहीं। एक इच्छा दिखा सकता है, दूसरा सीमा। यही विरोध अक्सर स्प्रेड का सबसे उपयोगी हिस्सा होता है क्योंकि वह असली खिंचाव को नाम देता है।',
      reread: 'मनपसंद जवाब मिलने तक बार-बार कार्ड निकालना चिंतन को answer-shopping बना देता है। इसलिए Little Ganesha पूरी हो चुकी दैनिक रीडिंग को स्थानीय दिन बदलने तक स्थिर रखता है।'
    }
  };

  const SPREADS = {
    en: [
      ['daily','Daily Guidance','1 card','One card for the day, then six practical lenses. A completed daily reading stays the same until the next local day.'],
      ['ask','Ask Ganesha','1 question · 1 card','Bring one clear question. Semantically equivalent questions on the same day restore the same card and conclusion rather than rerolling.'],
      ['three','Three-Card Reading','3 cards','Choose a Focus first. The spread reads Past / Present / What May Unfold Next as one connected story. Each Focus has its own daily reading.'],
      ['golden','The Golden Path','3 cards','Choose a Focus, then read Where You Stand / What Blocks the Path / The Way Forward. The final position is a direction, not a fixed future.'],
      ['obstacle','Remove the Obstacle','3 cards','Choose a Focus, then read The Obstacle / What Feeds It / What Releases It. The goal is to understand the mechanism of the blockage, not simply label it negative.'],
      ['lucky','Lucky Numbers','3 digits','A separate symbolic ritual, not tarot. Three unique digits from 0–9 are fixed for the local day and interpreted as Core / Supporting / Balancing.']
    ],
    th: [
      ['daily','คำแนะนำประจำวัน','ไพ่ 1 ใบ','เปิดไพ่หนึ่งใบสำหรับวันนี้ แล้วดูต่อได้อีก 6 มุมที่ใช้ได้จริง เมื่ออ่านจบแล้ว ไพ่และคำอ่านจะคงเดิมจนถึงวันใหม่ตามเวลาบนอุปกรณ์'],
      ['ask','ถามพระพิฆเนศน้อย','1 คำถาม · ไพ่ 1 ใบ','ตั้งคำถามหนึ่งเรื่องให้ชัด คำถามที่ความหมายเหมือนกันในวันเดียวกันจะกลับมาเจอไพ่และข้อสรุปเดิม ไม่ใช่สุ่มใหม่'],
      ['three','เปิดไพ่สามใบ','ไพ่ 3 ใบ','เลือก Focus ก่อน แล้วอ่าน อดีต / ปัจจุบัน / แนวโน้มต่อจากนี้ เป็นเรื่องเดียวกัน แต่ละ Focus มีสิทธิ์อ่านประจำวันของตัวเอง'],
      ['golden','เส้นทางสีทอง','ไพ่ 3 ใบ','เลือก Focus แล้วอ่าน จุดที่คุณอยู่ / สิ่งที่ขวางทาง / ทางข้างหน้า ตำแหน่งสุดท้ายคือทิศทางที่เป็นไปได้ ไม่ใช่อนาคตตายตัว'],
      ['obstacle','คลายอุปสรรค','ไพ่ 3 ใบ','เลือก Focus แล้วอ่าน อุปสรรค / สิ่งที่หล่อเลี้ยงมัน / สิ่งที่ช่วยให้คลาย เป้าหมายคือเข้าใจกลไกของปัญหา ไม่ใช่แค่ติดป้ายว่าเป็นเรื่องร้าย'],
      ['lucky','เลขมงคล','ตัวเลข 3 ตัว','เป็นพิธีเชิงสัญลักษณ์แยกจาก Tarot ระบบเลือกตัวเลขไม่ซ้ำกัน 3 ตัวจาก 0–9 แล้วล็อกไว้ทั้งวันในบทบาท เลขหลัก / เลขสนับสนุน / เลขสมดุล']
    ],
    hi: [
      ['daily','आज का मार्गदर्शन','1 कार्ड','दिन के लिए एक कार्ड, फिर छह व्यवहारिक लेंस। पूरी हो चुकी दैनिक रीडिंग अगले स्थानीय दिन तक वही रहती है।'],
      ['ask','गणेश से पूछें','1 सवाल · 1 कार्ड','एक साफ़ सवाल लाएँ। उसी दिन अर्थ में वही सवाल फिर पूछने पर नया कार्ड नहीं आता; वही कार्ड और वही निष्कर्ष वापस खुलता है।'],
      ['three','तीन कार्ड की रीडिंग','3 कार्ड','पहले Focus चुनें। फिर Past / Present / What May Unfold Next को एक जुड़ी कहानी की तरह पढ़ा जाता है। हर Focus की अपनी दैनिक रीडिंग है।'],
      ['golden','गोल्डन पाथ','3 कार्ड','Focus चुनें, फिर Where You Stand / What Blocks the Path / The Way Forward पढ़ें। आख़िरी पोज़िशन सम्भावित दिशा है, तय भविष्य नहीं।'],
      ['obstacle','रुकावट से रास्ता निकालें','3 कार्ड','Focus चुनें, फिर The Obstacle / What Feeds It / What Releases It पढ़ें। उद्देश्य रुकावट के तंत्र को समझना है, उसे केवल नकारात्मक कहना नहीं।'],
      ['lucky','शुभ अंक','3 अंक','यह टैरो से अलग प्रतीकात्मक दैनिक रिचुअल है। 0–9 में से तीन अलग अंक Core / Supporting / Balancing भूमिकाओं में पूरे स्थानीय दिन के लिए तय रहते हैं।']
    ]
  };

  const FAQ = {
    en: [
      ['Does tarot predict a fixed future?','Little Ganesha does not present tarot as a fixed forecast. It uses cards to examine patterns, pressures, possibilities, and practical choices.'],
      ['Why can the same card mean different things?','A card is interpreted together with the question, Focus, position, neighbouring cards, and the job that card has in the spread. Context changes emphasis without changing the card itself.'],
      ['Do I need to know tarot before using the app?','No. The app writes the reading in ordinary language. The Library is there if you want to learn what sits underneath the interpretation.'],
      ['Why does a completed reading stay the same?','Stability protects the reading from becoming a reroll button. Daily Guidance, Ask Ganesha question families, and Signature Focus readings have clear same-day persistence rules.'],
      ['Does Little Ganesha use reversed cards?','Not in the current experience. The deck architecture is reversal-ready, but current readings are upright-first and create nuance through context and spread position.'],
      ['Is Lucky Numbers a tarot mode?','No. It is a separate symbolic numerology-style ritual with its own daily rules and is deliberately not framed as lottery or gambling prediction.']
    ],
    th: [
      ['Tarot บอกอนาคตแบบตายตัวไหม?','Little Ganesha ไม่วาง Tarot เป็นคำพยากรณ์ตายตัว ไพ่ถูกใช้เพื่อมองรูปแบบ แรงกดดัน ความเป็นไปได้ และทางเลือกที่ทำได้จริง'],
      ['ทำไมไพ่ใบเดียวกันถึงอ่านต่างกันได้?','ไพ่ไม่ได้ถูกอ่านแยกจากทุกอย่าง คำถาม Focus ตำแหน่ง ไพ่ข้างเคียง และหน้าที่ของไพ่ในสเปรดจะช่วยกันกำหนดน้ำหนักของความหมาย บริบทเปลี่ยนจุดเน้นได้โดยไม่ต้องเปลี่ยนตัวไพ่'],
      ['ต้องรู้เรื่อง Tarot ก่อนใช้แอปไหม?','ไม่ต้อง คำอ่านในแอปเขียนด้วยภาษาปกติ ส่วน Library มีไว้สำหรับคนที่อยากรู้ว่าคำอ่านเหล่านั้นประกอบขึ้นจากอะไร'],
      ['ทำไมคำอ่านที่เสร็จแล้วถึงต้องคงเดิม?','เพราะคำอ่านควรเป็นสิ่งให้ทบทวน ไม่ใช่ปุ่มสุ่มใหม่จนได้คำตอบถูกใจ Daily Guidance, กลุ่มคำถามเดิมของ Ask Ganesha และ Signature Focus จึงมีกติกาการคงผลในวันเดียวกันอย่างชัดเจน'],
      ['Little Ganesha ใช้ไพ่กลับหัวไหม?','ยังไม่ใช้ในประสบการณ์ปัจจุบัน โครงสร้างสำรับรองรับการพัฒนาต่อได้ แต่ตอนนี้ใช้ระบบ upright-first แล้วสร้างรายละเอียดจากบริบทและตำแหน่งของไพ่'],
      ['เลขมงคลเป็นโหมด Tarot ไหม?','ไม่ใช่ เป็นพิธีตัวเลขเชิงสัญลักษณ์แยกต่างหาก มีกติกาประจำวันของตัวเอง และตั้งใจไม่วางเป็นการทำนายหวยหรือการพนัน']
    ],
    hi: [
      ['क्या टैरो तय भविष्य बताता है?','Little Ganesha टैरो को पक्की भविष्यवाणी की तरह पेश नहीं करता। कार्डों का उपयोग पैटर्न, दबाव, सम्भावनाएँ और व्यवहारिक विकल्प देखने के लिए किया जाता है।'],
      ['एक ही कार्ड का अर्थ अलग क्यों हो सकता है?','कार्ड को सवाल, Focus, पोज़िशन, आसपास के कार्ड और स्प्रेड में उसकी भूमिका के साथ पढ़ा जाता है। संदर्भ जोर बदलता है, कार्ड नहीं।'],
      ['क्या ऐप इस्तेमाल करने से पहले टैरो जानना ज़रूरी है?','नहीं। ऐप साधारण भाषा में पूरी रीडिंग लिखता है। Library उन लोगों के लिए है जो समझना चाहते हैं कि उस व्याख्या के पीछे क्या है।'],
      ['पूरी रीडिंग दिन भर वही क्यों रहती है?','ताकि रीडिंग reroll बटन न बन जाए। Daily Guidance, Ask Ganesha के समान सवाल और Signature Focus रीडिंग के साफ़ same-day नियम हैं।'],
      ['क्या Little Ganesha reversed cards इस्तेमाल करता है?','अभी नहीं। डेक की संरचना भविष्य में reversal के लिए तैयार है, लेकिन वर्तमान रीडिंग upright-first हैं और सूक्ष्मता संदर्भ व पोज़िशन से आती है।'],
      ['क्या Lucky Numbers टैरो मोड है?','नहीं। यह अलग प्रतीकात्मक number ritual है, जिसके अपने दैनिक नियम हैं और इसे lottery या gambling prediction की तरह नहीं बनाया गया है।']
    ]
  };

  const ABOUT = {
    en: {
      privacy: 'Your display name, optional birth date, reading state, and question history are stored locally in the browser/app storage on this device. Little Ganesha does not need an account for the current experience.',
      daily: 'Daily Guidance gives one completed reading per local day. Ask Ganesha keeps semantically equivalent same-day questions on the same reading. Three-Card, Golden Path, and Remove the Obstacle use one completed reading per Focus per local day. Lucky Numbers gives one fixed set per local day.',
      saveShare: 'Save creates a reading image on your device. Share uses the device share sheet when supported. Ask Ganesha hides the exact question from shared artwork by default unless you explicitly include it.',
      languages: 'English, Thai, and Hindi are first-class product languages. Reading copy is authored for meaning and naturalness rather than being translated at runtime.',
      accessibility: 'Motion can follow the system preference or be set to Full or Reduced. Reduced Motion shortens or removes decorative movement while keeping the result and reading logic the same.',
      credits: 'Little Ganesha Tarot — The Golden Path is created by Benedict Interactive. The current product is open access with voluntary support; support never changes readings or feature access.'
    },
    th: {
      privacy: 'ชื่อที่ใช้แสดง วันเกิดที่ใส่หรือไม่ใส่ก็ได้ สถานะคำอ่าน และประวัติคำถามจะเก็บอยู่ในพื้นที่จัดเก็บของเบราว์เซอร์/แอปบนอุปกรณ์นี้ ประสบการณ์ปัจจุบันไม่ต้องสมัครบัญชี',
      daily: 'Daily Guidance ให้คำอ่านที่เสร็จสมบูรณ์หนึ่งครั้งต่อวันตามเวลาท้องถิ่นของอุปกรณ์ Ask Ganesha จะคงคำถามที่มีความหมายเดียวกันไว้กับคำอ่านเดิมในวันเดียวกัน ส่วน Three-Card, Golden Path และ Remove the Obstacle ใช้กติกาหนึ่งคำอ่านต่อ Focus ต่อวัน และ Lucky Numbers ให้เลขหนึ่งชุดต่อวัน',
      saveShare: 'Save จะสร้างภาพคำอ่านลงบนอุปกรณ์ Share จะเรียกหน้าต่างแชร์ของเครื่องเมื่อรองรับ สำหรับ Ask Ganesha คำถามแบบเต็มจะถูกซ่อนจากภาพแชร์เป็นค่าเริ่มต้น เว้นแต่คุณเลือกให้แสดงเอง',
      languages: 'ภาษาอังกฤษ ไทย และฮินดีเป็นภาษาหลักของผลิตภัณฑ์ คำอ่านถูกเขียนให้เป็นธรรมชาติและรักษาความหมายในแต่ละภาษา ไม่ได้แปลด้วยระบบอัตโนมัติขณะใช้งาน',
      accessibility: 'การเคลื่อนไหวสามารถตั้งตามระบบ เลือก Full หรือ Reduced ได้ Reduced Motion จะลดหรือย่อเอฟเฟกต์ตกแต่ง โดยไม่เปลี่ยนผลลัพธ์หรือหลักการของคำอ่าน',
      credits: 'Little Ganesha Tarot — The Golden Path สร้างโดย Benedict Interactive ปัจจุบันเปิดให้ใช้งานโดยไม่ล็อกฟีเจอร์ด้วยการจ่ายเงิน การสนับสนุนเป็นความสมัครใจและไม่มีผลต่อผลการอ่านหรือสิทธิ์ใช้งาน'
    },
    hi: {
      privacy: 'आपका display name, वैकल्पिक जन्मतिथि, reading state और सवालों का इतिहास इसी डिवाइस के browser/app storage में रहता है। मौजूदा अनुभव के लिए अकाउंट की ज़रूरत नहीं है।',
      daily: 'Daily Guidance में एक स्थानीय दिन पर एक पूरी रीडिंग मिलती है। Ask Ganesha उसी दिन अर्थ में समान सवाल को उसी रीडिंग पर रखता है। Three-Card, Golden Path और Remove the Obstacle में हर Focus की एक दैनिक रीडिंग है। Lucky Numbers में एक तय दैनिक सेट मिलता है।',
      saveShare: 'Save आपके डिवाइस पर रीडिंग की इमेज बनाता है। Share उपलब्ध होने पर डिवाइस का share sheet इस्तेमाल करता है। Ask Ganesha में आपका पूरा सवाल साझा इमेज से डिफ़ॉल्ट रूप से छिपा रहता है, जब तक आप खुद उसे शामिल न करें।',
      languages: 'English, Thai और Hindi तीनों first-class product languages हैं। रीडिंग कॉपी हर भाषा में अर्थ और स्वाभाविकता के लिए लिखी गई है; runtime machine translation नहीं होती।',
      accessibility: 'Motion को system preference पर छोड़ा जा सकता है या Full / Reduced चुना जा सकता है। Reduced Motion सजावटी movement कम करता है, लेकिन reading logic और result नहीं बदलता।',
      credits: 'Little Ganesha Tarot — The Golden Path, Benedict Interactive द्वारा बनाया गया है। मौजूदा उत्पाद open access है; voluntary support कभी भी रीडिंग या feature access नहीं बदलता।'
    }
  };

  const lensKeys = [
    ['workGoals','lensWork'],['moneyResources','lensMoney'],['loveRelationships','lensLove'],['innerBalance','lensInner'],['opportunitiesWatchouts','lensWatch'],['guidanceToday','lensGuide']
  ];

  function language(lang) { return ['en','th','hi'].includes(lang) ? lang : 'en'; }
  function copy(lang) { return COPY[language(lang)]; }
  function card(cardId, lang) {
    const l = language(lang);
    const source = Reading.getCard(cardId);
    if (!source) return null;
    return {
      ...source,
      displayTitle: source.title?.[l] || source.title?.en || source.canonicalTitle,
      displayKeywords: source.keywords?.[l] || source.keywords?.en || [],
      displayMeaning: source.upright?.[l] || source.upright?.en || '',
      displayReflection: source.reflection?.[l] || source.reflection?.en || '',
      lenses: lensKeys.map(([key,label]) => ({ key, label: copy(l)[label], text: source.dailyLenses?.[key]?.[l] || source.dailyLenses?.[key]?.en || '' })).filter((item) => item.text)
    };
  }
  function cardMeta(source, lang) {
    const c = copy(lang);
    if (source.arcana === 'major') return c.majorLabel;
    return c[`suit${String(source.suit || '').charAt(0).toUpperCase()}${String(source.suit || '').slice(1)}`] || c.minorLabel;
  }

  window.LGTTarotLibraryContent = Object.freeze({
    version: VERSION,
    cards: Reading.cards,
    copy,
    learn: (lang) => LEARN[language(lang)],
    ways: (lang) => WAYS[language(lang)],
    spreads: (lang) => SPREADS[language(lang)],
    faq: (lang) => FAQ[language(lang)],
    about: (lang) => ABOUT[language(lang)],
    card,
    cardMeta,
    language
  });
})();

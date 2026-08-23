(() => {
  'use strict';

  const VERSION = 'lucky-content-v1';

  const COPY = {
    en: {
      eyebrow: 'A DAILY SYMBOLIC RITUAL',
      title: 'Lucky Numbers',
      intro: 'Turn the oracle and reveal three numbers to carry with you today—not as a promise of luck, but as a symbolic pattern for where to place your attention.',
      spin: 'TURN THE ORACLE',
      continue: 'CONTINUE THE REVEAL',
      spinning: 'THE ORACLE IS TURNING',
      revealing: 'YOUR NUMBERS ARE EMERGING',
      resultEyebrow: "TODAY'S NUMBERS",
      patternTitle: "Today's Pattern",
      coreRole: 'Core Number',
      supportRole: 'Supporting Number',
      balanceRole: 'Balancing Number',
      save: 'SAVE',
      share: 'SHARE',
      replay: 'REPLAY REVEAL',
      back: 'Back',
      countdownLead: 'A new set becomes available in',
      dailyLock: 'This set stays the same until your next local day.',
      disclaimer: 'For reflection and play. Not for lottery, gambling, investment, or guaranteed outcomes.',
      preparing: 'Preparing your Lucky Numbers image…',
      saved: 'Your Lucky Numbers image has been saved.',
      shared: 'Your Lucky Numbers image is ready to share.',
      shareFallback: 'Direct sharing is unavailable, so the image was saved instead.',
      shareText: 'My Lucky Numbers from Little Ganesha Tarot',
      shareTitle: 'Little Ganesha Tarot — Lucky Numbers',
      cancelled: 'Sharing cancelled.',
      exportTitle: 'LUCKY NUMBERS',
      exportFooter: 'A symbolic daily ritual from Little Ganesha Tarot',
      numberRevealed: (position, number) => `${position} number revealed: ${number}`,
      completed: 'Your three numbers are ready.',
      oracleAria: 'Lucky number oracle machine',
      machineAria: 'A brass and crystal oracle machine with numbered orbs'
    },
    th: {
      eyebrow: 'พิธีเล็กๆ ประจำวัน',
      title: 'เลขมงคลประจำวัน',
      intro: 'หมุนวงล้อเพื่อเปิดเลขสามตัวสำหรับวันนี้ ไม่ใช่คำรับรองว่าโชคจะเกิดขึ้น แต่เป็นสัญลักษณ์ให้เห็นว่าวันนี้ควรวางความสนใจไว้ตรงไหน',
      spin: 'หมุนวงล้อ',
      continue: 'เปิดเลขชุดเดิมต่อ',
      spinning: 'วงล้อกำลังหมุน',
      revealing: 'เลขของวันนี้กำลังปรากฏ',
      resultEyebrow: 'เลขของวันนี้',
      patternTitle: 'จังหวะของวันนี้',
      coreRole: 'เลขหลัก',
      supportRole: 'เลขสนับสนุน',
      balanceRole: 'เลขสมดุล',
      save: 'บันทึก',
      share: 'แชร์',
      replay: 'ดูจังหวะเปิดเลขอีกครั้ง',
      back: 'กลับ',
      countdownLead: 'เปิดเลขชุดใหม่ได้อีกใน',
      dailyLock: 'เลขชุดนี้จะคงเดิมจนถึงวันใหม่ตามเวลาบนอุปกรณ์',
      disclaimer: 'ใช้เพื่อความสนุกและการทบทวนตัวเอง ไม่ใช่เลขหวย คำแนะนำการพนัน การลงทุน หรือการรับรองผลลัพธ์ใดๆ',
      preparing: 'กำลังเตรียมภาพเลขมงคล…',
      saved: 'บันทึกภาพเลขมงคลแล้ว',
      shared: 'พร้อมแชร์ภาพเลขมงคลแล้ว',
      shareFallback: 'อุปกรณ์นี้แชร์ไฟล์โดยตรงไม่ได้ จึงบันทึกภาพให้แทน',
      shareText: 'เลขมงคลประจำวันจาก Little Ganesha Tarot',
      shareTitle: 'Little Ganesha Tarot — เลขมงคลประจำวัน',
      cancelled: 'ยกเลิกการแชร์แล้ว',
      exportTitle: 'เลขมงคลประจำวัน',
      exportFooter: 'พิธีเชิงสัญลักษณ์ประจำวันจาก Little Ganesha Tarot',
      numberRevealed: (position, number) => `เปิด${position}แล้ว: ${number}`,
      completed: 'เลขทั้งสามตัวของวันนี้พร้อมแล้ว',
      oracleAria: 'เครื่องเปิดเลขมงคล',
      machineAria: 'เครื่องวงล้อทองเหลืองและแก้วใส พร้อมลูกแก้วตัวเลข'
    },
    hi: {
      eyebrow: 'आज का छोटा-सा प्रतीकात्मक अनुष्ठान',
      title: 'आज के शुभ अंक',
      intro: 'चक्र घुमाकर आज के लिए तीन अंक प्रकट करें। ये किसी जीत का वादा नहीं हैं—बस एक प्रतीकात्मक संकेत हैं कि आज आपका ध्यान कहाँ ठहर सकता है।',
      spin: 'चक्र घुमाएँ',
      continue: 'इसी संकेत को पूरा करें',
      spinning: 'चक्र घूम रहा है',
      revealing: 'आज के अंक सामने आ रहे हैं',
      resultEyebrow: 'आज के अंक',
      patternTitle: 'आज का संकेत',
      coreRole: 'मुख्य अंक',
      supportRole: 'सहायक अंक',
      balanceRole: 'संतुलन अंक',
      save: 'सेव करें',
      share: 'शेयर करें',
      replay: 'अंक फिर से प्रकट होते देखें',
      back: 'वापस',
      countdownLead: 'नया सेट मिलने में',
      dailyLock: 'ये अंक आपके डिवाइस के स्थानीय दिन बदलने तक यही रहेंगे।',
      disclaimer: 'मनन और आनंद के लिए। लॉटरी, जुए, निवेश या किसी निश्चित परिणाम की भविष्यवाणी नहीं।',
      preparing: 'शुभ अंकों की इमेज तैयार हो रही है…',
      saved: 'शुभ अंकों की इमेज सेव हो गई।',
      shared: 'शुभ अंकों की इमेज शेयर करने के लिए तैयार है।',
      shareFallback: 'सीधे शेयर करना उपलब्ध नहीं था, इसलिए इमेज सेव कर दी गई।',
      shareText: 'Little Ganesha Tarot से मेरे आज के शुभ अंक',
      shareTitle: 'Little Ganesha Tarot — आज के शुभ अंक',
      cancelled: 'शेयर करना रद्द किया गया।',
      exportTitle: 'आज के शुभ अंक',
      exportFooter: 'Little Ganesha Tarot का एक प्रतीकात्मक दैनिक अनुष्ठान',
      numberRevealed: (position, number) => `${position} प्रकट हुआ: ${number}`,
      completed: 'आज के तीनों अंक तैयार हैं।',
      oracleAria: 'शुभ अंक प्रकट करने वाला चक्र',
      machineAria: 'पीतल और काँच की मशीन जिसमें अंक वाले गोलक हैं'
    }
  };

  const NUMBERS = {
    en: {
      1: { keyword: 'Initiative', core: 'Choose one clear direction and give it your first deliberate move.', support: 'Use decisiveness as a resource: simplify the next step instead of waiting for perfect certainty.', balance: 'Keep independence from turning into isolation. Ask for input when it genuinely improves the choice.' },
      2: { keyword: 'Attunement', core: 'Pay attention to timing, tone, and the space between your needs and someone else’s.', support: 'Patience and cooperation can unlock more than force today.', balance: 'Do not confuse harmony with self-erasure. A calm boundary can still be kind.' },
      3: { keyword: 'Expression', core: 'Give shape to what wants to be said, made, shared, or enjoyed.', support: 'Creativity, conversation, and a lighter touch can loosen what has become too rigid.', balance: 'Keep enthusiasm connected to follow-through so good energy becomes something real.' },
      4: { keyword: 'Foundation', core: 'Strengthen the structure underneath the day: order, routine, preparation, or one dependable commitment.', support: 'Steady effort is more useful than dramatic effort right now.', balance: 'Structure should support you, not trap you. Leave enough room for reality to change.' },
      5: { keyword: 'Movement', core: 'Expect some motion. A change of pace, perspective, route, or method may be exactly what opens the day.', support: 'Adaptability is your advantage; respond to what is actually happening rather than clinging to the original plan.', balance: 'Freedom works best with one anchor. Keep one non-negotiable priority in view.' },
      6: { keyword: 'Care', core: 'Bring attention back to what deserves tending: a relationship, responsibility, home, body, or promise.', support: 'Warmth and practical care can repair more than overexplaining.', balance: 'Do not take responsibility for everyone’s emotional weather. Care needs limits to remain healthy.' },
      7: { keyword: 'Insight', core: 'Create enough quiet to notice what your first reaction may have missed.', support: 'Research, reflection, and honest inner listening are stronger tools than rushing to an answer.', balance: 'Do not let analysis become withdrawal. Insight matters most when it eventually informs a choice.' },
      8: { keyword: 'Stewardship', core: 'Handle power, money, time, and responsibility with deliberate standards today.', support: 'Confidence grows when you make a clear decision about what you will manage, protect, or prioritise.', balance: 'Watch the urge to control every variable. Strong stewardship still leaves room for uncertainty.' },
      9: { keyword: 'Completion', core: 'Notice what is ready to be finished, released, forgiven, or understood from a wider perspective.', support: 'Compassion and perspective can help you close a chapter without dragging its weight forward.', balance: 'Closure is not the same as avoidance. Keep the lesson even when you let the burden go.' }
    },
    th: {
      1: { keyword: 'การเริ่มต้น', core: 'วันนี้เหมาะกับการเลือกทิศทางให้ชัด แล้วขยับก้าวแรกด้วยความตั้งใจ', support: 'ใช้ความเด็ดขาดเป็นแรงหนุน ลดขั้นตอนที่ไม่จำเป็น แล้วเริ่มจากสิ่งที่ทำได้จริงก่อน', balance: 'ความเป็นตัวของตัวเองไม่จำเป็นต้องกลายเป็นการทำทุกอย่างคนเดียว เปิดรับความเห็นเมื่อมันช่วยให้ตัดสินใจดีขึ้น' },
      2: { keyword: 'การรับฟัง', core: 'ให้ความสำคัญกับจังหวะ น้ำเสียง และพื้นที่ระหว่างความต้องการของเรากับอีกฝ่าย', support: 'ความอดทนและความร่วมมืออาจพาเรื่องไปได้ไกลกว่าการเร่งหรือกดดัน', balance: 'รักษาความกลมกลืนได้โดยไม่ต้องลดคุณค่าความต้องการของตัวเอง ขอบเขตที่สุภาพก็ยังเป็นขอบเขต' },
      3: { keyword: 'การแสดงออก', core: 'สิ่งที่อยากพูด อยากสร้าง หรืออยากแบ่งปัน ควรได้มีพื้นที่ออกมาเป็นรูปธรรม', support: 'บทสนทนา ความคิดสร้างสรรค์ และอารมณ์ที่เบาขึ้นช่วยคลายเรื่องที่ตึงเกินไปได้', balance: 'ความคึกคักจะมีพลังมากขึ้นเมื่อพาไปถึงการลงมือทำ ไม่ใช่หยุดอยู่แค่ไอเดีย' },
      4: { keyword: 'รากฐาน', core: 'กลับมาจัดฐานของวันให้แน่นขึ้น ทั้งเรื่องลำดับ งานประจำ การเตรียมตัว หรือสิ่งหนึ่งที่ควรทำให้สม่ำเสมอ', support: 'วันนี้ความต่อเนื่องมีค่ากว่าการทุ่มแรงเป็นช่วงๆ', balance: 'โครงสร้างมีไว้ช่วยให้ชีวิตมั่นคง ไม่ใช่บังคับทุกอย่างจนขยับไม่ได้ เผื่อพื้นที่ให้สถานการณ์เปลี่ยนด้วย' },
      5: { keyword: 'การเคลื่อนไหว', core: 'วันนี้อาจมีจังหวะให้เปลี่ยนวิธี มุมมอง เส้นทาง หรือความเร็ว และการขยับนั้นอาจเป็นสิ่งที่เปิดทางพอดี', support: 'ความยืดหยุ่นคือข้อได้เปรียบ ตอบสนองต่อสิ่งที่เกิดขึ้นจริงมากกว่ายึดแผนเดิม', balance: 'อิสระจะไปได้ไกลเมื่อยังมีหลักหนึ่งอย่างคอยยึดไว้ เลือกสิ่งสำคัญที่สุดหนึ่งเรื่องแล้วอย่าปล่อยหลุด' },
      6: { keyword: 'การดูแล', core: 'กลับมาใส่ใจกับสิ่งที่สมควรได้รับการดูแล ไม่ว่าจะเป็นความสัมพันธ์ หน้าที่ บ้าน ร่างกาย หรือคำที่เคยรับปากไว้', support: 'ความอบอุ่นที่มาพร้อมการลงมือทำเล็กๆ อาจช่วยได้มากกว่าการอธิบายยืดยาว', balance: 'อย่ารับอารมณ์และความรับผิดชอบของทุกคนมาไว้กับตัวเองทั้งหมด การดูแลที่ดีต้องมีขอบเขต' },
      7: { keyword: 'การหยั่งเห็น', core: 'เว้นพื้นที่ให้ใจนิ่งพอจะเห็นสิ่งที่ปฏิกิริยาแรกอาจมองข้าม', support: 'การค้นข้อมูล ทบทวน และฟังความรู้สึกอย่างซื่อตรงมีประโยชน์กว่าการรีบเอาคำตอบ', balance: 'การคิดลึกไม่ควรกลายเป็นการถอยออกจากทุกอย่าง สุดท้ายความเข้าใจควรพาไปสู่การเลือกหรือการลงมือบางอย่าง' },
      8: { keyword: 'การบริหารพลัง', core: 'วันนี้เหมาะกับการจัดการเรื่องเวลา เงิน อำนาจตัดสินใจ และความรับผิดชอบด้วยมาตรฐานที่ชัด', support: 'ความมั่นใจจะเพิ่มขึ้นเมื่อรู้ว่าตัวเองกำลังปกป้อง จัดลำดับ หรือบริหารอะไรอยู่', balance: 'ไม่จำเป็นต้องควบคุมทุกตัวแปรจึงจะถือสถานการณ์ได้ดี ความไม่แน่นอนบางส่วนควรมีที่อยู่ของมัน' },
      9: { keyword: 'การปิดวงจร', core: 'มองดูว่าเรื่องใดพร้อมจะจบ วาง ให้อภัย หรือทำความเข้าใจจากมุมที่กว้างขึ้นแล้ว', support: 'ความเมตตาและระยะมองที่กว้างขึ้นช่วยให้ปิดบทหนึ่งได้โดยไม่ต้องลากน้ำหนักของมันต่อไป', balance: 'การวางไม่ใช่การหนี เก็บบทเรียนไว้ได้ แม้ไม่จำเป็นต้องเก็บภาระเดิมไว้ด้วย' }
    },
    hi: {
      1: { keyword: 'पहल', core: 'आज एक दिशा साफ़ चुनें और उसकी ओर पहला ठोस कदम जानबूझकर रखें।', support: 'निर्णय लेने की क्षमता को सहारा बनाइए—पूर्ण निश्चितता का इंतज़ार करने के बजाय अगला कदम सरल कीजिए।', balance: 'स्वतंत्रता को अकेले सब कुछ उठाने की आदत न बनने दें। सही जगह पर राय लेना निर्णय को बेहतर कर सकता है।' },
      2: { keyword: 'तालमेल', core: 'आज समय, लहजे और अपनी ज़रूरतों व दूसरे व्यक्ति की ज़रूरतों के बीच के संतुलन को ध्यान से देखें।', support: 'धैर्य और सहयोग वहाँ रास्ता खोल सकते हैं जहाँ दबाव काम नहीं करता।', balance: 'शांति बनाए रखना अपने हिस्से को मिटा देना नहीं है। नरम लेकिन साफ़ सीमा भी सम्मानजनक होती है।' },
      3: { keyword: 'अभिव्यक्ति', core: 'जो बात कहना, बनाना, बाँटना या आनंद से जीना चाहती है, उसे आज कोई वास्तविक रूप दें।', support: 'रचनात्मकता, बातचीत और थोड़ा हल्कापन जमी हुई स्थिति को ढीला कर सकता है।', balance: 'उत्साह को पूरा करने की आदत से जोड़ें, ताकि अच्छी ऊर्जा सिर्फ़ विचार बनकर न रह जाए।' },
      4: { keyword: 'आधार', core: 'दिन की नींव मज़बूत कीजिए—व्यवस्था, दिनचर्या, तैयारी या किसी एक भरोसेमंद जिम्मेदारी पर ध्यान दें।', support: 'आज लगातार किया गया छोटा प्रयास, अचानक किए गए बड़े प्रयास से अधिक उपयोगी हो सकता है।', balance: 'संरचना सहारा दे, बंधन न बने। बदलती वास्तविकता के लिए थोड़ी जगह खुली रखें।' },
      5: { keyword: 'बदलाव', core: 'आज गति बदल सकती है। तरीका, नज़रिया, रास्ता या रफ्तार बदलना ही आगे बढ़ने का सही द्वार हो सकता है।', support: 'लचीलापन आपकी ताकत है—जो सचमुच हो रहा है, उसके अनुसार जवाब दें; सिर्फ़ पुराने प्लान से न चिपकें।', balance: 'आज़ादी के साथ एक आधार भी रखें। एक ऐसी प्राथमिकता चुनें जिसे आज नज़र से ओझल न होने दें।' },
      6: { keyword: 'देखभाल', core: 'ध्यान उस ओर लौटाएँ जिसे सच में देखभाल चाहिए—रिश्ता, जिम्मेदारी, घर, शरीर या कोई निभाया जाने वाला वादा।', support: 'व्यावहारिक स्नेह और छोटा-सा काम, लंबी सफ़ाई से अधिक असर कर सकता है।', balance: 'हर किसी की भावनात्मक स्थिति को अपनी जिम्मेदारी न बनाइए। स्वस्थ देखभाल की अपनी सीमाएँ होती हैं।' },
      7: { keyword: 'अंतर्दृष्टि', core: 'इतनी शांति बनाइए कि पहली प्रतिक्रिया से छूट गई बात भी दिखाई दे सके।', support: 'जाँच, मनन और अपने भीतर की ईमानदार सुनवाई, जल्दबाज़ी में जवाब लेने से बेहतर साधन हैं।', balance: 'गहराई से सोचना दुनिया से कट जाना नहीं है। समझ का मूल्य तब बढ़ता है जब वह किसी चुनाव या कदम तक पहुँचे।' },
      8: { keyword: 'संभाल', core: 'आज समय, धन, अधिकार और जिम्मेदारी को साफ़ मानकों के साथ संभालें।', support: 'विश्वास तब बढ़ेगा जब आप तय करेंगे कि क्या सँभालना, बचाना या प्राथमिकता देना है।', balance: 'हर चीज़ को नियंत्रित करना जरूरी नहीं। मजबूत संचालन में अनिश्चितता के लिए भी थोड़ी जगह होती है।' },
      9: { keyword: 'समापन', core: 'देखें क्या पूरा होने, छोड़ने, माफ़ करने या बड़े नज़रिए से समझने के लिए तैयार है।', support: 'करुणा और व्यापक दृष्टि किसी अध्याय को बंद करने में मदद कर सकती है, बिना उसका बोझ आगे ढोए।', balance: 'छोड़ना भागना नहीं है। बोझ जाने दें, लेकिन उससे मिली समझ अपने साथ रखें।' }
    }
  };

  function normalizeLanguage(lang) {
    return ['en', 'th', 'hi'].includes(lang) ? lang : 'en';
  }

  function roleCopy(lang) {
    const c = COPY[normalizeLanguage(lang)];
    return [c.coreRole, c.supportRole, c.balanceRole];
  }

  function pattern(numbers, lang) {
    const language = normalizeLanguage(lang);
    const [a, b, c] = numbers.map((number) => NUMBERS[language][number]);
    if (language === 'th') {
      return `วันนี้ให้ “${a.keyword}” เป็นแกน ใช้ “${b.keyword}” เป็นแรงหนุน และให้ “${c.keyword}” ช่วยคุมจังหวะให้พอดี เลขทั้งสามไม่ได้บอกว่าต้องเกิดอะไรขึ้น แต่ชวนให้สังเกตคุณภาพสามอย่างนี้เมื่อเลือกว่าจะตอบสนองกับเรื่องต่างๆ อย่างไร`;
    }
    if (language === 'hi') {
      return `आज “${a.keyword}” को दिशा बनने दें, “${b.keyword}” को सहारा और “${c.keyword}” को संतुलन। ये तीन अंक यह तय नहीं करते कि क्या होगा; वे बस याद दिलाते हैं कि आज फैसलों और प्रतिक्रियाओं में किन तीन गुणों पर ध्यान देना उपयोगी हो सकता है।`;
    }
    return `Let ${a.keyword.toLowerCase()} set the direction, ${b.keyword.toLowerCase()} become the support, and ${c.keyword.toLowerCase()} keep the day in balance. These numbers do not decide what will happen; they simply give you three qualities to notice as you choose how to respond.`;
  }

  window.LGTLuckyContent = Object.freeze({
    version: VERSION,
    copy: (lang) => COPY[normalizeLanguage(lang)],
    number: (number, lang) => NUMBERS[normalizeLanguage(lang)][Number(number)] || null,
    roles: roleCopy,
    pattern,
    normalizeLanguage
  });
})();

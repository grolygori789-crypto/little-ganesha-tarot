(() => {
  'use strict';

  const CONTENT_VERSION = 'daily-guidance-v1';
  const CARD_BACK = 'assets/ui/card-back.png';
  const CARDS = [
  {
    "id": "00",
    "index": 0,
    "title": {
      "en": "The Fool",
      "th": "ผู้เริ่มต้น"
    },
    "canonicalTitle": "THE FOOL",
    "arcana": "major",
    "number": 0,
    "suit": null,
    "rank": null,
    "image": "assets/cards/00_THE_FOOL.png",
    "keywords": {
      "en": [
        "beginnings",
        "trust",
        "openness"
      ],
      "th": [
        "การเริ่มต้น",
        "ความไว้วางใจ",
        "การเปิดรับ"
      ]
    },
    "upright": {
      "en": "A fresh step is available. Curiosity matters more than having every answer before you begin.",
      "th": "วันนี้มีพื้นที่ให้เริ่มต้นใหม่ ความอยากรู้อยากลองสำคัญกว่าการต้องรู้คำตอบทุกอย่างก่อนลงมือ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where could one small step teach you more than more planning?",
      "th": "มีเรื่องไหนที่ก้าวเล็กๆ หนึ่งก้าวจะสอนคุณได้มากกว่าการวางแผนเพิ่มอีก?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "01",
    "index": 1,
    "title": {
      "en": "The Magician",
      "th": "จอมเวท"
    },
    "canonicalTitle": "THE MAGICIAN",
    "arcana": "major",
    "number": 1,
    "suit": null,
    "rank": null,
    "image": "assets/cards/01_THE_MAGICIAN.png",
    "keywords": {
      "en": [
        "agency",
        "skill",
        "focus"
      ],
      "th": [
        "พลังลงมือ",
        "ทักษะ",
        "สมาธิ"
      ]
    },
    "upright": {
      "en": "You already have useful tools within reach. Bring attention, skill, and intention to the same point.",
      "th": "เครื่องมือที่จำเป็นหลายอย่างอยู่ใกล้มือแล้ว วันนี้คือการรวมความตั้งใจ ทักษะ และสมาธิให้ไปในทิศเดียวกัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can you shape today with what you already have?",
      "th": "วันนี้คุณสร้างอะไรได้บ้างจากสิ่งที่มีอยู่แล้ว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "02",
    "index": 2,
    "title": {
      "en": "The High Priestess",
      "th": "นักบวชหญิง"
    },
    "canonicalTitle": "THE HIGH PRIESTESS",
    "arcana": "major",
    "number": 2,
    "suit": null,
    "rank": null,
    "image": "assets/cards/02_THE_HIGH_PRIESTESS.png",
    "keywords": {
      "en": [
        "intuition",
        "stillness",
        "inner knowing"
      ],
      "th": [
        "สัญชาตญาณ",
        "ความนิ่ง",
        "การรู้จากภายใน"
      ]
    },
    "upright": {
      "en": "Not everything needs an immediate answer. Quiet observation may reveal what forceful analysis misses.",
      "th": "ไม่ใช่ทุกเรื่องต้องรีบหาคำตอบ การมองอย่างนิ่งๆ อาจทำให้เห็นสิ่งที่การคิดบีบคั้นมองข้าม"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What becomes clearer when you stop trying to force clarity?",
      "th": "อะไรเริ่มชัดขึ้นเมื่อคุณหยุดบังคับให้ตัวเองต้องเข้าใจทันที?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "03",
    "index": 3,
    "title": {
      "en": "The Empress",
      "th": "จักรพรรดินี"
    },
    "canonicalTitle": "THE EMPRESS",
    "arcana": "major",
    "number": 3,
    "suit": null,
    "rank": null,
    "image": "assets/cards/03_THE_EMPRESS.png",
    "keywords": {
      "en": [
        "nurture",
        "abundance",
        "creation"
      ],
      "th": [
        "การหล่อเลี้ยง",
        "ความอุดม",
        "การสร้างสรรค์"
      ]
    },
    "upright": {
      "en": "Growth responds to care. Give time, warmth, and practical nourishment to what you want to flourish.",
      "th": "สิ่งที่อยากให้เติบโตต้องการการดูแล ให้เวลา ความอบอุ่น และสิ่งหล่อเลี้ยงที่จับต้องได้กับมัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What deserves steady care rather than more pressure?",
      "th": "อะไรควรได้รับการดูแลอย่างสม่ำเสมอมากกว่าการเร่งกดดัน?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "04",
    "index": 4,
    "title": {
      "en": "The Emperor",
      "th": "จักรพรรดิ"
    },
    "canonicalTitle": "THE EMPEROR",
    "arcana": "major",
    "number": 4,
    "suit": null,
    "rank": null,
    "image": "assets/cards/04_THE_EMPEROR.png",
    "keywords": {
      "en": [
        "structure",
        "leadership",
        "boundaries"
      ],
      "th": [
        "โครงสร้าง",
        "ภาวะผู้นำ",
        "ขอบเขต"
      ]
    },
    "upright": {
      "en": "Clear structure can be protective rather than restrictive. Decide what needs order, ownership, or a firmer boundary.",
      "th": "โครงสร้างที่ชัดเจนอาจเป็นสิ่งคุ้มครอง ไม่ใช่ข้อจำกัด ลองมองว่าเรื่องไหนต้องการระเบียบ ความรับผิดชอบ หรือขอบเขตที่ชัดขึ้น"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where would a clear boundary create more freedom?",
      "th": "ตรงไหนที่ขอบเขตชัดเจนจะทำให้คุณมีอิสระมากขึ้น?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "05",
    "index": 5,
    "title": {
      "en": "The Hierophant",
      "th": "มหาปุโรหิต"
    },
    "canonicalTitle": "THE HIEROPHANT",
    "arcana": "major",
    "number": 5,
    "suit": null,
    "rank": null,
    "image": "assets/cards/05_THE_HIEROPHANT.png",
    "keywords": {
      "en": [
        "tradition",
        "learning",
        "shared values"
      ],
      "th": [
        "แบบแผน",
        "การเรียนรู้",
        "คุณค่าร่วม"
      ]
    },
    "upright": {
      "en": "There may be value in tested wisdom, a trusted teacher, or a shared practice. Learn the form before deciding how to adapt it.",
      "th": "ภูมิปัญญาที่ผ่านการลองใช้ ครูที่ไว้ใจได้ หรือแบบปฏิบัติร่วมกันอาจมีประโยชน์ เรียนรู้รูปแบบให้เข้าใจก่อนค่อยเลือกว่าจะปรับตรงไหน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which principle is worth learning deeply before you reinvent it?",
      "th": "หลักอะไรควรเรียนรู้ให้ลึกก่อนที่จะคิดปรับใหม่?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "06",
    "index": 6,
    "title": {
      "en": "The Lovers",
      "th": "คู่รัก"
    },
    "canonicalTitle": "THE LOVERS",
    "arcana": "major",
    "number": 6,
    "suit": null,
    "rank": null,
    "image": "assets/cards/06_THE_LOVERS.png",
    "keywords": {
      "en": [
        "choice",
        "alignment",
        "relationship"
      ],
      "th": [
        "การเลือก",
        "ความสอดคล้อง",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "A meaningful choice asks more than what feels good now. Notice whether your decision aligns with your values and relationships.",
      "th": "การเลือกที่สำคัญไม่ได้ถามแค่ว่าอะไรทำให้รู้สึกดีตอนนี้ ลองดูว่าการตัดสินใจนั้นสอดคล้องกับคุณค่าและความสัมพันธ์ของคุณหรือไม่"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What choice would let your actions match what you say matters?",
      "th": "การเลือกแบบไหนจะทำให้การกระทำตรงกับสิ่งที่คุณบอกว่าสำคัญ?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "07",
    "index": 7,
    "title": {
      "en": "The Chariot",
      "th": "รถศึก"
    },
    "canonicalTitle": "THE CHARIOT",
    "arcana": "major",
    "number": 7,
    "suit": null,
    "rank": null,
    "image": "assets/cards/07_THE_CHARIOT.png",
    "keywords": {
      "en": [
        "direction",
        "discipline",
        "momentum"
      ],
      "th": [
        "ทิศทาง",
        "วินัย",
        "แรงส่ง"
      ]
    },
    "upright": {
      "en": "Momentum grows when competing impulses are given one direction. Choose the destination before pushing harder.",
      "th": "แรงส่งจะเกิดเมื่อพลังที่ดึงคนละทางถูกรวมให้ไปทางเดียวกัน เลือกปลายทางให้ชัดก่อนเร่งแรง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What deserves your full direction instead of divided effort?",
      "th": "เรื่องไหนควรได้รับพลังเต็มที่แทนการแบ่งแรงไปหลายทาง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "08",
    "index": 8,
    "title": {
      "en": "Strength",
      "th": "พลัง"
    },
    "canonicalTitle": "STRENGTH",
    "arcana": "major",
    "number": 8,
    "suit": null,
    "rank": null,
    "image": "assets/cards/08_STRENGTH.png",
    "keywords": {
      "en": [
        "courage",
        "gentleness",
        "self-command"
      ],
      "th": [
        "ความกล้า",
        "ความอ่อนโยน",
        "การกำกับตนเอง"
      ]
    },
    "upright": {
      "en": "Real strength may look quiet today. Meet intensity with patience, steadiness, and enough gentleness to stay in command of yourself.",
      "th": "พลังที่แท้จริงวันนี้อาจดูเงียบกว่าที่คิด รับมือความเข้มข้นด้วยความอดทน ความมั่นคง และความอ่อนโยนที่ช่วยให้ยังคุมตัวเองได้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where would calm courage work better than force?",
      "th": "ตรงไหนที่ความกล้าอย่างสงบจะได้ผลดีกว่าการฝืนบังคับ?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "09",
    "index": 9,
    "title": {
      "en": "The Hermit",
      "th": "ฤๅษี"
    },
    "canonicalTitle": "THE HERMIT",
    "arcana": "major",
    "number": 9,
    "suit": null,
    "rank": null,
    "image": "assets/cards/09_THE_HERMIT.png",
    "keywords": {
      "en": [
        "reflection",
        "solitude",
        "discernment"
      ],
      "th": [
        "การทบทวน",
        "การอยู่ลำพัง",
        "การพิจารณา"
      ]
    },
    "upright": {
      "en": "A little distance can restore perspective. Step away from noise long enough to hear your own considered judgment.",
      "th": "ระยะห่างเล็กน้อยอาจทำให้มุมมองกลับมาชัด ลองออกจากเสียงรบกวนพอให้ได้ยินการพิจารณาของตัวเอง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What do you know when nobody else is speaking?",
      "th": "เมื่อไม่มีเสียงของคนอื่นเข้ามา คุณรู้อะไรอยู่แล้วในใจ?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "10",
    "index": 10,
    "title": {
      "en": "Wheel Of Fortune",
      "th": "กงล้อแห่งโชคชะตา"
    },
    "canonicalTitle": "WHEEL OF FORTUNE",
    "arcana": "major",
    "number": 10,
    "suit": null,
    "rank": null,
    "image": "assets/cards/10_WHEEL_OF_FORTUNE.png",
    "keywords": {
      "en": [
        "change",
        "cycles",
        "timing"
      ],
      "th": [
        "การเปลี่ยนแปลง",
        "วัฏจักร",
        "จังหวะเวลา"
      ]
    },
    "upright": {
      "en": "Conditions are moving. You may not control the whole cycle, but you can notice the turn and respond with better timing.",
      "th": "เงื่อนไขกำลังเปลี่ยน คุณอาจควบคุมทั้งวงจรไม่ได้ แต่สังเกตจังหวะที่กำลังหมุนแล้วตอบสนองให้เหมาะได้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What change is asking you to adapt rather than resist?",
      "th": "ความเปลี่ยนแปลงอะไรที่กำลังชวนให้คุณปรับตัวแทนการต้านไว้?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "11",
    "index": 11,
    "title": {
      "en": "Justice",
      "th": "ความยุติธรรม"
    },
    "canonicalTitle": "JUSTICE",
    "arcana": "major",
    "number": 11,
    "suit": null,
    "rank": null,
    "image": "assets/cards/11_JUSTICE.png",
    "keywords": {
      "en": [
        "truth",
        "accountability",
        "balance"
      ],
      "th": [
        "ความจริง",
        "ความรับผิดชอบ",
        "ความสมดุล"
      ]
    },
    "upright": {
      "en": "Look closely at facts, consequences, and your own part in the situation. Fairness begins with seeing clearly.",
      "th": "มองข้อเท็จจริง ผลที่ตามมา และส่วนที่ตัวเองมีต่อเรื่องนี้ให้ชัด ความเป็นธรรมเริ่มจากการเห็นตามจริง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would a fair assessment require you to admit?",
      "th": "การประเมินอย่างเป็นธรรมต้องให้คุณยอมรับอะไรบ้าง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "12",
    "index": 12,
    "title": {
      "en": "The Hanged Man",
      "th": "ผู้ถูกแขวน"
    },
    "canonicalTitle": "THE HANGED MAN",
    "arcana": "major",
    "number": 12,
    "suit": null,
    "rank": null,
    "image": "assets/cards/12_THE_HANGED_MAN.png",
    "keywords": {
      "en": [
        "pause",
        "perspective",
        "release"
      ],
      "th": [
        "การหยุด",
        "มุมมองใหม่",
        "การปล่อย"
      ]
    },
    "upright": {
      "en": "Progress may come through a pause rather than another push. A different angle can change what the problem appears to be.",
      "th": "ความคืบหน้าอาจมาจากการหยุด ไม่ใช่การเร่งอีกครั้ง มุมมองใหม่อาจเปลี่ยนแม้กระทั่งสิ่งที่คุณคิดว่าเป็นปัญหา"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What might look different if you stopped trying to move it today?",
      "th": "อะไรอาจดูต่างไปถ้าวันนี้คุณหยุดพยายามผลักมันให้เดินต่อ?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "13",
    "index": 13,
    "title": {
      "en": "Death",
      "th": "ความตาย"
    },
    "canonicalTitle": "DEATH",
    "arcana": "major",
    "number": 13,
    "suit": null,
    "rank": null,
    "image": "assets/cards/13_DEATH.png",
    "keywords": {
      "en": [
        "ending",
        "transition",
        "renewal"
      ],
      "th": [
        "การสิ้นสุด",
        "การเปลี่ยนผ่าน",
        "การเริ่มใหม่"
      ]
    },
    "upright": {
      "en": "Something may be ready to end in its current form. Letting a completed chapter close creates room for what follows.",
      "th": "บางสิ่งอาจถึงเวลาจบในรูปแบบเดิม การยอมให้บทที่สิ้นสุดแล้วปิดลงจะเปิดพื้นที่ให้สิ่งต่อไป"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What are you keeping alive after its season has ended?",
      "th": "คุณกำลังยื้ออะไรไว้ทั้งที่ช่วงเวลาของมันจบลงแล้ว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "14",
    "index": 14,
    "title": {
      "en": "Temperance",
      "th": "ความพอดี"
    },
    "canonicalTitle": "TEMPERANCE",
    "arcana": "major",
    "number": 14,
    "suit": null,
    "rank": null,
    "image": "assets/cards/14_TEMPERANCE.png",
    "keywords": {
      "en": [
        "integration",
        "moderation",
        "healing"
      ],
      "th": [
        "การผสาน",
        "ความพอดี",
        "การฟื้นสมดุล"
      ]
    },
    "upright": {
      "en": "Balance is built through adjustment, not perfection. Blend what works, reduce extremes, and let steady refinement do its work.",
      "th": "ความสมดุลเกิดจากการปรับ ไม่ใช่ความสมบูรณ์แบบ ผสานสิ่งที่ใช้ได้ ลดความสุดโต่ง แล้วให้การปรับทีละน้อยทำงานของมัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would become easier with a little less of one thing and more of another?",
      "th": "อะไรจะง่ายขึ้นถ้าลดบางอย่างลงนิดหนึ่งและเพิ่มอีกอย่างขึ้นนิดหนึ่ง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "15",
    "index": 15,
    "title": {
      "en": "The Devil",
      "th": "ปีศาจ"
    },
    "canonicalTitle": "THE DEVIL",
    "arcana": "major",
    "number": 15,
    "suit": null,
    "rank": null,
    "image": "assets/cards/15_THE_DEVIL.png",
    "keywords": {
      "en": [
        "attachment",
        "temptation",
        "patterns"
      ],
      "th": [
        "ความยึดติด",
        "สิ่งล่อลวง",
        "รูปแบบซ้ำ"
      ]
    },
    "upright": {
      "en": "Notice what has more control over you than you intended. Naming an attachment clearly is often the first move toward choice.",
      "th": "สังเกตสิ่งที่มีอำนาจเหนือคุณมากกว่าที่ตั้งใจ การเรียกความยึดติดนั้นให้ชัดมักเป็นก้าวแรกของการกลับมาเลือกได้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What pattern becomes weaker once you stop excusing it?",
      "th": "รูปแบบไหนจะอ่อนแรงลงเมื่อคุณหยุดหาข้ออ้างให้มัน?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "16",
    "index": 16,
    "title": {
      "en": "The Tower",
      "th": "หอคอย"
    },
    "canonicalTitle": "THE TOWER",
    "arcana": "major",
    "number": 16,
    "suit": null,
    "rank": null,
    "image": "assets/cards/16_THE_TOWER.png",
    "keywords": {
      "en": [
        "disruption",
        "revelation",
        "release"
      ],
      "th": [
        "ความสั่นคลอน",
        "การเปิดเผย",
        "การปลดสิ่งเก่า"
      ]
    },
    "upright": {
      "en": "A weak structure may be showing its cracks. What feels disruptive can also expose what was never stable enough to rely on.",
      "th": "โครงสร้างที่ไม่มั่นคงอาจกำลังเผยรอยร้าว สิ่งที่ดูสั่นคลอนอาจกำลังบอกด้วยว่าอะไรไม่เคยแข็งแรงพอให้พึ่งได้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What truth becomes visible when the old structure stops holding?",
      "th": "ความจริงอะไรปรากฏขึ้นเมื่อโครงสร้างเดิมเริ่มรับไม่ไหว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "17",
    "index": 17,
    "title": {
      "en": "The Star",
      "th": "ดวงดาว"
    },
    "canonicalTitle": "THE STAR",
    "arcana": "major",
    "number": 17,
    "suit": null,
    "rank": null,
    "image": "assets/cards/17_THE_STAR.png",
    "keywords": {
      "en": [
        "hope",
        "renewal",
        "authenticity"
      ],
      "th": [
        "ความหวัง",
        "การฟื้นตัว",
        "ความเป็นตัวเอง"
      ]
    },
    "upright": {
      "en": "Hope can be practical when it reconnects you with what is true and worth tending. Restore rather than perform.",
      "th": "ความหวังมีพลังเมื่อพากลับไปหาสิ่งที่จริงและควรดูแล วันนี้เน้นการฟื้นตัวมากกว่าการทำให้ดูดี"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What quietly restores your faith in the next step?",
      "th": "อะไรค่อยๆ ทำให้คุณกลับมาเชื่อในก้าวถัดไปได้อีกครั้ง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "18",
    "index": 18,
    "title": {
      "en": "The Moon",
      "th": "ดวงจันทร์"
    },
    "canonicalTitle": "THE MOON",
    "arcana": "major",
    "number": 18,
    "suit": null,
    "rank": null,
    "image": "assets/cards/18_THE_MOON.png",
    "keywords": {
      "en": [
        "uncertainty",
        "imagination",
        "subconscious"
      ],
      "th": [
        "ความไม่แน่นอน",
        "จินตนาการ",
        "จิตใต้สำนึก"
      ]
    },
    "upright": {
      "en": "Not everything you feel is a fact, but feelings still carry information. Move carefully while the picture is incomplete.",
      "th": "ไม่ใช่ทุกความรู้สึกคือข้อเท็จจริง แต่ความรู้สึกก็มีข้อมูลของมัน เดินอย่างระมัดระวังเมื่อภาพยังไม่ครบ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can you verify before letting fear or fantasy fill the gaps?",
      "th": "มีอะไรที่ตรวจสอบได้ก่อนปล่อยให้ความกลัวหรือจินตนาการเติมช่องว่าง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "19",
    "index": 19,
    "title": {
      "en": "The Sun",
      "th": "ดวงอาทิตย์"
    },
    "canonicalTitle": "THE SUN",
    "arcana": "major",
    "number": 19,
    "suit": null,
    "rank": null,
    "image": "assets/cards/19_THE_SUN.png",
    "keywords": {
      "en": [
        "clarity",
        "vitality",
        "joy"
      ],
      "th": [
        "ความชัดเจน",
        "พลังชีวิต",
        "ความยินดี"
      ]
    },
    "upright": {
      "en": "Something benefits from being seen in full light. Let clarity, warmth, and uncomplicated enjoyment have a place today.",
      "th": "บางเรื่องดีขึ้นเมื่อได้อยู่ในแสงเต็มๆ ให้ความชัดเจน ความอบอุ่น และความสุขแบบไม่ซับซ้อนมีที่ยืนในวันนี้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What good thing can you acknowledge without immediately qualifying it?",
      "th": "มีเรื่องดีอะไรที่คุณยอมรับได้เต็มๆ โดยไม่รีบเติมคำว่า “แต่”?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "20",
    "index": 20,
    "title": {
      "en": "Judgement",
      "th": "การพิพากษา"
    },
    "canonicalTitle": "JUDGEMENT",
    "arcana": "major",
    "number": 20,
    "suit": null,
    "rank": null,
    "image": "assets/cards/20_JUDGEMENT.png",
    "keywords": {
      "en": [
        "awakening",
        "review",
        "calling"
      ],
      "th": [
        "การตื่นรู้",
        "การทบทวน",
        "เสียงเรียก"
      ]
    },
    "upright": {
      "en": "A larger pattern may be asking for an honest review. Learn from what has been, then answer the part of life that is calling for a different response.",
      "th": "ภาพใหญ่กำลังชวนให้ทบทวนอย่างตรงไปตรงมา เรียนรู้จากสิ่งที่ผ่านมา แล้วตอบรับส่วนของชีวิตที่ต้องการวิธีใหม่"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What lesson is ready to become a decision?",
      "th": "บทเรียนอะไรพร้อมจะเปลี่ยนจากความเข้าใจให้เป็นการตัดสินใจแล้ว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "21",
    "index": 21,
    "title": {
      "en": "The World",
      "th": "โลก"
    },
    "canonicalTitle": "THE WORLD",
    "arcana": "major",
    "number": 21,
    "suit": null,
    "rank": null,
    "image": "assets/cards/21_THE_WORLD.png",
    "keywords": {
      "en": [
        "completion",
        "integration",
        "wholeness"
      ],
      "th": [
        "ความสมบูรณ์",
        "การบูรณาการ",
        "ความครบถ้วน"
      ]
    },
    "upright": {
      "en": "A cycle may be reaching meaningful completion. Notice what has been integrated before rushing into the next beginning.",
      "th": "วงจรหนึ่งอาจกำลังจบอย่างมีความหมาย มองให้เห็นสิ่งที่คุณได้หลอมรวมไว้แล้วก่อนรีบเริ่มรอบใหม่"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What deserves to be recognized as complete?",
      "th": "อะไรสมควรได้รับการยอมรับว่าเสร็จสมบูรณ์แล้ว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "22",
    "index": 22,
    "title": {
      "en": "Ace of Wands",
      "th": "เอซไม้เท้า"
    },
    "canonicalTitle": "ACE OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "ace",
    "image": "assets/cards/22_ACE_OF_WANDS.png",
    "keywords": {
      "en": [
        "spark",
        "energy",
        "action"
      ],
      "th": [
        "ประกายเริ่มต้น",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "A live spark is present. Give it a concrete first action before enthusiasm fades.",
      "th": "มีประกายใหม่อยู่ตรงหน้า ให้มันมีการลงมือจริงสักอย่างก่อนความตื่นเต้นจะจาง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What idea deserves a first move today?",
      "th": "ความคิดไหนสมควรได้ก้าวแรกในวันนี้?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "23",
    "index": 23,
    "title": {
      "en": "Two of Wands",
      "th": "สองไม้เท้า"
    },
    "canonicalTitle": "TWO OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "two",
    "image": "assets/cards/23_TWO_OF_WANDS.png",
    "keywords": {
      "en": [
        "planning",
        "energy",
        "action"
      ],
      "th": [
        "การวางแผน",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "You can see beyond the current boundary. Compare directions, then choose where your energy is actually going.",
      "th": "คุณเริ่มเห็นทางที่ไกลกว่าขอบเขตเดิม เปรียบเทียบทิศทางแล้วเลือกให้ชัดว่าจะส่งพลังไปทางไหน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which option expands your world without scattering your focus?",
      "th": "ทางเลือกไหนขยายโลกของคุณโดยไม่ทำให้สมาธิกระจาย?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "24",
    "index": 24,
    "title": {
      "en": "Three of Wands",
      "th": "สามไม้เท้า"
    },
    "canonicalTitle": "THREE OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "three",
    "image": "assets/cards/24_THREE_OF_WANDS.png",
    "keywords": {
      "en": [
        "expansion",
        "energy",
        "action"
      ],
      "th": [
        "การขยายตัว",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "Early effort is beginning to open a wider horizon. Keep looking ahead while staying responsive to what returns.",
      "th": "ความพยายามช่วงแรกกำลังเปิดขอบฟ้าให้กว้างขึ้น มองไปข้างหน้าและพร้อมปรับตามสิ่งที่สะท้อนกลับมา"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What are you ready to build beyond the first success?",
      "th": "คุณพร้อมต่อยอดอะไรจากความสำเร็จระยะแรก?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "25",
    "index": 25,
    "title": {
      "en": "Four of Wands",
      "th": "สี่ไม้เท้า"
    },
    "canonicalTitle": "FOUR OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "four",
    "image": "assets/cards/25_FOUR_OF_WANDS.png",
    "keywords": {
      "en": [
        "celebration",
        "energy",
        "action"
      ],
      "th": [
        "การเฉลิมฉลอง",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "A stable moment deserves to be enjoyed. Mark progress, belonging, or a shared milestone before moving on.",
      "th": "ช่วงเวลาที่มั่นคงสมควรได้รับการชื่นชม ให้พื้นที่กับความคืบหน้า ความเป็นส่วนหนึ่ง หรือหมุดหมายร่วมกัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What progress is worth celebrating with others?",
      "th": "ความคืบหน้าอะไรควรได้ฉลองร่วมกับคนอื่น?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "26",
    "index": 26,
    "title": {
      "en": "Five of Wands",
      "th": "ห้าไม้เท้า"
    },
    "canonicalTitle": "FIVE OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "five",
    "image": "assets/cards/26_FIVE_OF_WANDS.png",
    "keywords": {
      "en": [
        "friction",
        "energy",
        "action"
      ],
      "th": [
        "แรงปะทะ",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "Competing energy can sharpen ideas if it stays constructive. Separate useful challenge from pointless conflict.",
      "th": "พลังที่แข่งขันกันอาจทำให้ความคิดคมขึ้นถ้ายังสร้างสรรค์ แยกความท้าทายที่มีประโยชน์ออกจากการปะทะที่เปลืองแรง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which disagreement can improve the work, and which one is just noise?",
      "th": "ความเห็นต่างไหนช่วยให้งานดีขึ้น และอันไหนเป็นเพียงเสียงรบกวน?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "27",
    "index": 27,
    "title": {
      "en": "Six of Wands",
      "th": "หกไม้เท้า"
    },
    "canonicalTitle": "SIX OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "six",
    "image": "assets/cards/27_SIX_OF_WANDS.png",
    "keywords": {
      "en": [
        "recognition",
        "energy",
        "action"
      ],
      "th": [
        "การได้รับการยอมรับ",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "Progress is visible. Accept recognition without letting applause become the only measure of worth.",
      "th": "ความคืบหน้ามองเห็นได้ รับการยอมรับอย่างเต็มที่โดยไม่ให้เสียงชมกลายเป็นมาตรวัดคุณค่าทั้งหมด"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What achievement can you own without needing to exaggerate it?",
      "th": "ความสำเร็จอะไรที่คุณยอมรับได้โดยไม่ต้องขยายให้ใหญ่เกินจริง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "28",
    "index": 28,
    "title": {
      "en": "Seven of Wands",
      "th": "เจ็ดไม้เท้า"
    },
    "canonicalTitle": "SEVEN OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "seven",
    "image": "assets/cards/28_SEVEN_OF_WANDS.png",
    "keywords": {
      "en": [
        "conviction",
        "energy",
        "action"
      ],
      "th": [
        "การยืนหยัด",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "Something worth keeping may require a clear stand. Defend the essential without fighting every challenge.",
      "th": "สิ่งที่ควรรักษาไว้อาจต้องการจุดยืนที่ชัด ปกป้องแก่นสำคัญโดยไม่จำเป็นต้องสู้กับทุกเรื่อง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What is truly worth holding your ground for?",
      "th": "เรื่องไหนคุ้มค่าพอให้คุณยืนหยัดจริงๆ?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "29",
    "index": 29,
    "title": {
      "en": "Eight of Wands",
      "th": "แปดไม้เท้า"
    },
    "canonicalTitle": "EIGHT OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "eight",
    "image": "assets/cards/29_EIGHT_OF_WANDS.png",
    "keywords": {
      "en": [
        "momentum",
        "energy",
        "action"
      ],
      "th": [
        "ความรวดเร็ว",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "Movement is accelerating. Keep communication clear and avoid creating delay through unnecessary hesitation.",
      "th": "สถานการณ์กำลังเดินเร็วขึ้น รักษาการสื่อสารให้ชัดและอย่าสร้างความล่าช้าจากความลังเลที่ไม่จำเป็น"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can move now because the path is already open?",
      "th": "อะไรเดินหน้าได้เลยเพราะทางเปิดอยู่แล้ว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "30",
    "index": 30,
    "title": {
      "en": "Nine of Wands",
      "th": "เก้าไม้เท้า"
    },
    "canonicalTitle": "NINE OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "nine",
    "image": "assets/cards/30_NINE_OF_WANDS.png",
    "keywords": {
      "en": [
        "resilience",
        "energy",
        "action"
      ],
      "th": [
        "ความอดทน",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "You may be tired, not finished. Protect what matters, conserve energy, and avoid treating every shadow as a threat.",
      "th": "คุณอาจเหนื่อย แต่ยังไม่ถึงจุดจบ รักษาสิ่งสำคัญ ประหยัดแรง และอย่ามองทุกเงาเป็นภัย"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What boundary helps you continue without hardening yourself?",
      "th": "ขอบเขตแบบไหนช่วยให้คุณไปต่อได้โดยไม่ต้องแข็งกระด้าง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "31",
    "index": 31,
    "title": {
      "en": "Ten of Wands",
      "th": "สิบไม้เท้า"
    },
    "canonicalTitle": "TEN OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "ten",
    "image": "assets/cards/31_TEN_OF_WANDS.png",
    "keywords": {
      "en": [
        "burden",
        "energy",
        "action"
      ],
      "th": [
        "ภาระ",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "Responsibility has become heavy. Decide what truly belongs to you and what can be delegated, simplified, or released.",
      "th": "ความรับผิดชอบเริ่มหนักเกินไป แยกให้ชัดว่าอะไรเป็นหน้าที่ของคุณจริงๆ และอะไรส่งต่อ ลดทอน หรือวางลงได้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What are you carrying simply because you have carried it this far?",
      "th": "คุณกำลังถืออะไรต่อเพียงเพราะถือมานานแล้ว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "32",
    "index": 32,
    "title": {
      "en": "Page of Wands",
      "th": "เพจไม้เท้า"
    },
    "canonicalTitle": "PAGE OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "page",
    "image": "assets/cards/32_PAGE_OF_WANDS.png",
    "keywords": {
      "en": [
        "exploration",
        "energy",
        "action"
      ],
      "th": [
        "การสำรวจ",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "Curiosity wants room to experiment. Treat the next step as a live test rather than a final verdict on your ability.",
      "th": "ความอยากรู้อยากลองต้องการพื้นที่ ทดลองก้าวถัดไปเหมือนการทดสอบจริง ไม่ใช่คำตัดสินสุดท้ายต่อความสามารถของคุณ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would you try if you were allowed to be a beginner?",
      "th": "ถ้ายอมให้ตัวเองเป็นมือใหม่ได้ คุณอยากลองอะไร?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "33",
    "index": 33,
    "title": {
      "en": "Knight of Wands",
      "th": "อัศวินไม้เท้า"
    },
    "canonicalTitle": "KNIGHT OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "knight",
    "image": "assets/cards/33_KNIGHT_OF_WANDS.png",
    "keywords": {
      "en": [
        "pursuit",
        "energy",
        "action"
      ],
      "th": [
        "การพุ่งไปข้างหน้า",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "Bold energy can create momentum, but speed needs direction. Move decisively without outrunning your judgment.",
      "th": "พลังที่กล้าลุยสร้างแรงส่งได้ แต่ความเร็วต้องมีทิศทาง เดินหน้าให้ชัดโดยไม่วิ่งเร็วกว่าการพิจารณาของตัวเอง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where does courage need a little more steering?",
      "th": "ตรงไหนที่ความกล้าต้องการการกำกับอีกนิด?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "34",
    "index": 34,
    "title": {
      "en": "Queen of Wands",
      "th": "ราชินีไม้เท้า"
    },
    "canonicalTitle": "QUEEN OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "queen",
    "image": "assets/cards/34_QUEEN_OF_WANDS.png",
    "keywords": {
      "en": [
        "confidence",
        "energy",
        "action"
      ],
      "th": [
        "ความมั่นใจ",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "Warm confidence draws people in without demanding attention. Lead from self-trust, generosity, and visible competence.",
      "th": "ความมั่นใจที่อบอุ่นดึงดูดผู้คนได้โดยไม่ต้องเรียกร้องความสนใจ นำด้วยความเชื่อในตัวเอง ความใจกว้าง และความสามารถที่เห็นได้จริง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "How can you be fully visible without performing?",
      "th": "คุณจะปรากฏตัวอย่างเต็มที่โดยไม่ต้องแสดงเกินจริงได้อย่างไร?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "35",
    "index": 35,
    "title": {
      "en": "King of Wands",
      "th": "ราชาไม้เท้า"
    },
    "canonicalTitle": "KING OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "king",
    "image": "assets/cards/35_KING_OF_WANDS.png",
    "keywords": {
      "en": [
        "vision",
        "energy",
        "action"
      ],
      "th": [
        "วิสัยทัศน์",
        "พลัง",
        "การลงมือ"
      ]
    },
    "upright": {
      "en": "A larger vision needs mature direction. Set the tone, make the call, and let others see where the energy is going.",
      "th": "วิสัยทัศน์ที่ใหญ่ขึ้นต้องการการนำที่เป็นผู้ใหญ่ กำหนดทิศ ตัดสินใจ และทำให้คนอื่นเห็นว่าพลังทั้งหมดกำลังไปทางไหน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would leadership look like if you focused on direction rather than control?",
      "th": "ภาวะผู้นำจะเป็นอย่างไรถ้าคุณเน้นทิศทางมากกว่าการควบคุม?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "36",
    "index": 36,
    "title": {
      "en": "Ace of Cups",
      "th": "เอซถ้วย"
    },
    "canonicalTitle": "ACE OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "ace",
    "image": "assets/cards/36_ACE_OF_CUPS.png",
    "keywords": {
      "en": [
        "emotional opening",
        "emotion",
        "connection"
      ],
      "th": [
        "การเปิดใจ",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "An emotional opening is available. Let care, connection, or creativity move before you over-explain it.",
      "th": "มีช่องว่างใหม่ทางความรู้สึก เปิดให้ความใส่ใจ ความเชื่อมโยง หรือความสร้างสรรค์ได้เคลื่อนไหวก่อนจะอธิบายมันมากเกินไป"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What feeling deserves room rather than analysis?",
      "th": "ความรู้สึกไหนต้องการพื้นที่มากกว่าการวิเคราะห์?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "37",
    "index": 37,
    "title": {
      "en": "Two of Cups",
      "th": "สองถ้วย"
    },
    "canonicalTitle": "TWO OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "two",
    "image": "assets/cards/37_TWO_OF_CUPS.png",
    "keywords": {
      "en": [
        "mutuality",
        "emotion",
        "connection"
      ],
      "th": [
        "ความสัมพันธ์ที่เท่าเทียม",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "Connection strengthens through reciprocity. Notice where respect, attraction, or cooperation is genuinely mutual.",
      "th": "ความสัมพันธ์แข็งแรงขึ้นจากการตอบรับกัน มองให้เห็นว่าตรงไหนมีความเคารพ ความดึงดูด หรือความร่วมมือที่เป็นสองทางจริงๆ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where is mutual effort already present?",
      "th": "ตรงไหนมีความพยายามจากทั้งสองฝ่ายอยู่แล้ว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "38",
    "index": 38,
    "title": {
      "en": "Three of Cups",
      "th": "สามถ้วย"
    },
    "canonicalTitle": "THREE OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "three",
    "image": "assets/cards/38_THREE_OF_CUPS.png",
    "keywords": {
      "en": [
        "community",
        "emotion",
        "connection"
      ],
      "th": [
        "มิตรภาพ",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "Joy can be shared. Friendship, collaboration, and simple togetherness may be part of what restores you.",
      "th": "ความยินดีแบ่งปันกันได้ มิตรภาพ การร่วมมือ และการได้อยู่ด้วยกันอย่างธรรมดาอาจเป็นส่วนหนึ่งของการเติมพลัง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Who helps you remember that life is not meant to be carried alone?",
      "th": "ใครช่วยเตือนว่าชีวิตไม่จำเป็นต้องแบกคนเดียว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "39",
    "index": 39,
    "title": {
      "en": "Four of Cups",
      "th": "สี่ถ้วย"
    },
    "canonicalTitle": "FOUR OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "four",
    "image": "assets/cards/39_FOUR_OF_CUPS.png",
    "keywords": {
      "en": [
        "disengagement",
        "emotion",
        "connection"
      ],
      "th": [
        "ความเฉยชา",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "A familiar option may no longer satisfy, but withdrawal can also hide what is being offered. Look again before dismissing everything.",
      "th": "สิ่งที่คุ้นเคยอาจไม่ตอบโจทย์แล้ว แต่การปิดตัวก็อาจทำให้มองข้ามสิ่งที่ยื่นมา ลองมองอีกครั้งก่อนปฏิเสธทั้งหมด"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What are you overlooking because you are tired of the current situation?",
      "th": "คุณกำลังมองข้ามอะไรเพราะเหนื่อยกับสถานการณ์เดิม?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "40",
    "index": 40,
    "title": {
      "en": "Five of Cups",
      "th": "ห้าถ้วย"
    },
    "canonicalTitle": "FIVE OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "five",
    "image": "assets/cards/40_FIVE_OF_CUPS.png",
    "keywords": {
      "en": [
        "grief",
        "emotion",
        "connection"
      ],
      "th": [
        "ความสูญเสีย",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "Loss deserves acknowledgment, but it is not the whole landscape. Give grief its place while noticing what remains intact.",
      "th": "ความสูญเสียควรได้รับการยอมรับ แต่ไม่ใช่ภาพทั้งหมด ให้พื้นที่กับความเศร้าและมองสิ่งที่ยังคงอยู่ด้วย"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What remains available even after something important was lost?",
      "th": "อะไรยังคงอยู่แม้บางสิ่งสำคัญจะสูญเสียไปแล้ว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "41",
    "index": 41,
    "title": {
      "en": "Six of Cups",
      "th": "หกถ้วย"
    },
    "canonicalTitle": "SIX OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "six",
    "image": "assets/cards/41_SIX_OF_CUPS.png",
    "keywords": {
      "en": [
        "memory",
        "emotion",
        "connection"
      ],
      "th": [
        "ความทรงจำ",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "The past may offer comfort, context, or a useful reminder. Receive its warmth without assuming you must return to it.",
      "th": "อดีตอาจให้ความอบอุ่น บริบท หรือคำเตือนที่มีประโยชน์ รับสิ่งนั้นไว้โดยไม่ต้องสรุปว่าคุณควรย้อนกลับไปอยู่ที่เดิม"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can you appreciate from the past without living there?",
      "th": "คุณชื่นชมอะไรจากอดีตได้โดยไม่ต้องกลับไปใช้ชีวิตอยู่ในนั้น?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "42",
    "index": 42,
    "title": {
      "en": "Seven of Cups",
      "th": "เจ็ดถ้วย"
    },
    "canonicalTitle": "SEVEN OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "seven",
    "image": "assets/cards/42_SEVEN_OF_CUPS.png",
    "keywords": {
      "en": [
        "options",
        "emotion",
        "connection"
      ],
      "th": [
        "ทางเลือก",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "Many possibilities can blur judgment. Bring imagination down to earth by asking what is real, workable, and aligned.",
      "th": "ความเป็นไปได้หลายทางอาจทำให้การตัดสินใจพร่า ดึงจินตนาการกลับสู่พื้นด้วยคำถามว่าอะไรจริง ทำได้ และสอดคล้องกับคุณ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which option still makes sense after the fantasy is removed?",
      "th": "ทางเลือกไหนยังสมเหตุสมผลเมื่อเอาภาพฝันออกไป?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "43",
    "index": 43,
    "title": {
      "en": "Eight of Cups",
      "th": "แปดถ้วย"
    },
    "canonicalTitle": "EIGHT OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "eight",
    "image": "assets/cards/43_EIGHT_OF_CUPS.png",
    "keywords": {
      "en": [
        "departure",
        "emotion",
        "connection"
      ],
      "th": [
        "การเดินจาก",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "Something may have given all it can. Walking away can be an act of honesty when staying only preserves emptiness.",
      "th": "บางสิ่งอาจให้สิ่งที่ให้ได้ครบแล้ว การเดินออกมาอาจเป็นความซื่อตรงเมื่อการอยู่ต่อมีไว้เพียงรักษาความว่างเปล่า"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What are you ready to leave because it no longer nourishes you?",
      "th": "คุณพร้อมเดินออกจากอะไรเพราะมันไม่หล่อเลี้ยงคุณอีกแล้ว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "44",
    "index": 44,
    "title": {
      "en": "Nine of Cups",
      "th": "เก้าถ้วย"
    },
    "canonicalTitle": "NINE OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "nine",
    "image": "assets/cards/44_NINE_OF_CUPS.png",
    "keywords": {
      "en": [
        "satisfaction",
        "emotion",
        "connection"
      ],
      "th": [
        "ความพึงพอใจ",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "There is value in recognizing enoughness. Enjoy what is working without turning satisfaction into complacency.",
      "th": "การมองเห็นความพอมีคุณค่า ชื่นชมสิ่งที่กำลังดีโดยไม่ปล่อยให้ความพอใจกลายเป็นความชะล่าใจ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can you enjoy fully without immediately wanting more?",
      "th": "อะไรที่คุณชื่นชมได้เต็มที่โดยไม่รีบอยากได้มากกว่าเดิม?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "45",
    "index": 45,
    "title": {
      "en": "Ten of Cups",
      "th": "สิบถ้วย"
    },
    "canonicalTitle": "TEN OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "ten",
    "image": "assets/cards/45_TEN_OF_CUPS.png",
    "keywords": {
      "en": [
        "belonging",
        "emotion",
        "connection"
      ],
      "th": [
        "ความกลมกลืน",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "Emotional richness is often relational. Notice the people, agreements, and shared values that make belonging possible.",
      "th": "ความอุดมทางใจมักเกิดในความสัมพันธ์ มองผู้คน ข้อตกลง และคุณค่าร่วมที่ทำให้ความรู้สึกเป็นส่วนหนึ่งเกิดขึ้นได้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What relationship deserves deliberate gratitude today?",
      "th": "วันนี้ความสัมพันธ์ไหนควรได้รับความขอบคุณอย่างตั้งใจ?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "46",
    "index": 46,
    "title": {
      "en": "Page of Cups",
      "th": "เพจถ้วย"
    },
    "canonicalTitle": "PAGE OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "page",
    "image": "assets/cards/46_PAGE_OF_CUPS.png",
    "keywords": {
      "en": [
        "sensitivity",
        "emotion",
        "connection"
      ],
      "th": [
        "ความอ่อนไหว",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "A subtle feeling, invitation, or creative impulse may be worth taking seriously. Stay open without becoming gullible.",
      "th": "ความรู้สึกบางๆ คำชวน หรือแรงสร้างสรรค์เล็กๆ อาจควรค่าแก่การรับฟัง เปิดใจโดยไม่ต้องเชื่อทุกอย่างทันที"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What quiet signal are you curious enough to explore?",
      "th": "สัญญาณเบาๆ อะไรที่คุณอยากสำรวจต่อด้วยความอยากรู้?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "47",
    "index": 47,
    "title": {
      "en": "Knight of Cups",
      "th": "อัศวินถ้วย"
    },
    "canonicalTitle": "KNIGHT OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "knight",
    "image": "assets/cards/47_KNIGHT_OF_CUPS.png",
    "keywords": {
      "en": [
        "idealism",
        "emotion",
        "connection"
      ],
      "th": [
        "อุดมคติ",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "Let the heart move, but keep your feet on the ground. A sincere offer becomes stronger when feeling and follow-through agree.",
      "th": "ให้หัวใจได้เคลื่อนไหวแต่ยังยืนอยู่บนพื้น คำเสนอที่จริงใจจะแข็งแรงขึ้นเมื่อความรู้สึกและการลงมือสอดคล้องกัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What promise can you make only if you are willing to follow through?",
      "th": "คุณให้คำสัญญาอะไรได้เมื่อพร้อมทำให้เกิดขึ้นจริงด้วย?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "48",
    "index": 48,
    "title": {
      "en": "Queen of Cups",
      "th": "ราชินีถ้วย"
    },
    "canonicalTitle": "QUEEN OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "queen",
    "image": "assets/cards/48_QUEEN_OF_CUPS.png",
    "keywords": {
      "en": [
        "empathy",
        "emotion",
        "connection"
      ],
      "th": [
        "ความเข้าอกเข้าใจ",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "Sensitivity is useful when it remains grounded. Listen deeply without absorbing every emotion as your own responsibility.",
      "th": "ความอ่อนไหวมีประโยชน์เมื่อยังมีฐานที่มั่นคง ฟังอย่างลึกโดยไม่รับทุกอารมณ์มาเป็นความรับผิดชอบของตัวเอง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "How can you care without losing your own center?",
      "th": "คุณดูแลคนอื่นได้อย่างไรโดยไม่เสียศูนย์ของตัวเอง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "49",
    "index": 49,
    "title": {
      "en": "King of Cups",
      "th": "ราชาถ้วย"
    },
    "canonicalTitle": "KING OF CUPS",
    "arcana": "minor",
    "number": null,
    "suit": "cups",
    "rank": "king",
    "image": "assets/cards/49_KING_OF_CUPS.png",
    "keywords": {
      "en": [
        "emotional maturity",
        "emotion",
        "connection"
      ],
      "th": [
        "วุฒิภาวะทางอารมณ์",
        "ความรู้สึก",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "Steady feeling is not the absence of emotion. Hold warmth and discernment together, especially when others are reactive.",
      "th": "ความมั่นคงไม่ได้แปลว่าไม่มีอารมณ์ ถือความอบอุ่นและการพิจารณาไว้พร้อมกัน โดยเฉพาะเมื่อคนรอบตัวกำลังไหวแรง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What response would be both compassionate and well-governed?",
      "th": "การตอบสนองแบบไหนทั้งเมตตาและกำกับตัวเองได้ดี?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "50",
    "index": 50,
    "title": {
      "en": "Ace of Swords",
      "th": "เอซดาบ"
    },
    "canonicalTitle": "ACE OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "ace",
    "image": "assets/cards/50_ACE_OF_SWORDS.png",
    "keywords": {
      "en": [
        "clarity",
        "thought",
        "truth"
      ],
      "th": [
        "ความชัดเจน",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "A clear idea or truth can cut through confusion. Name the central issue before adding more complexity.",
      "th": "ความคิดหรือความจริงที่ชัดเจนช่วยตัดความสับสน เรียกประเด็นหลักให้ตรงก่อนเติมความซับซ้อนเข้าไปอีก"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What is the simplest true sentence about this situation?",
      "th": "ประโยคจริงที่เรียบง่ายที่สุดเกี่ยวกับเรื่องนี้คืออะไร?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "51",
    "index": 51,
    "title": {
      "en": "Two of Swords",
      "th": "สองดาบ"
    },
    "canonicalTitle": "TWO OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "two",
    "image": "assets/cards/51_TWO_OF_SWORDS.png",
    "keywords": {
      "en": [
        "stalemate",
        "thought",
        "truth"
      ],
      "th": [
        "ภาวะค้างคา",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "Avoidance can preserve temporary calm while keeping the real decision unresolved. Gather what matters and choose when enough is known.",
      "th": "การหลีกเลี่ยงอาจรักษาความสงบชั่วคราว แต่ทำให้การตัดสินใจจริงยังค้างอยู่ รวบรวมข้อมูลสำคัญแล้วเลือกเมื่อรู้เพียงพอ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What decision are you postponing by calling it “not enough information”?",
      "th": "การตัดสินใจอะไรถูกเลื่อนออกไปด้วยคำว่า “ข้อมูลยังไม่พอ”?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "52",
    "index": 52,
    "title": {
      "en": "Three of Swords",
      "th": "สามดาบ"
    },
    "canonicalTitle": "THREE OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "three",
    "image": "assets/cards/52_THREE_OF_SWORDS.png",
    "keywords": {
      "en": [
        "heartbreak",
        "thought",
        "truth"
      ],
      "th": [
        "ความเจ็บปวด",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "Painful clarity can still be clarity. Let disappointment be named directly so healing does not have to work around denial.",
      "th": "ความชัดเจนที่เจ็บก็ยังเป็นความชัดเจน เรียกความผิดหวังตรงๆ เพื่อให้การฟื้นตัวไม่ต้องอ้อมผ่านการปฏิเสธ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What hurts less once you stop arguing with the fact that it hurt?",
      "th": "อะไรเบาลงเมื่อคุณหยุดเถียงกับความจริงว่ามันทำให้เจ็บ?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "53",
    "index": 53,
    "title": {
      "en": "Four of Swords",
      "th": "สี่ดาบ"
    },
    "canonicalTitle": "FOUR OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "four",
    "image": "assets/cards/53_FOUR_OF_SWORDS.png",
    "keywords": {
      "en": [
        "rest",
        "thought",
        "truth"
      ],
      "th": [
        "การพัก",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "The mind may need recovery more than another solution. Deliberate rest can be part of responsible action.",
      "th": "ใจและความคิดอาจต้องการการฟื้นมากกว่าคำตอบเพิ่ม การพักอย่างตั้งใจก็เป็นส่วนหนึ่งของการลงมืออย่างรับผิดชอบ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can wait long enough for you to recover some clarity?",
      "th": "อะไรเลื่อนได้พอให้คุณได้ฟื้นความชัดเจนกลับมาบ้าง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "54",
    "index": 54,
    "title": {
      "en": "Five of Swords",
      "th": "ห้าดาบ"
    },
    "canonicalTitle": "FIVE OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "five",
    "image": "assets/cards/54_FIVE_OF_SWORDS.png",
    "keywords": {
      "en": [
        "conflict cost",
        "thought",
        "truth"
      ],
      "th": [
        "ราคาของความขัดแย้ง",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "Winning the argument may cost more than it returns. Look at the aftermath before deciding what victory means.",
      "th": "การชนะข้อโต้แย้งอาจมีราคาสูงกว่าสิ่งที่ได้กลับมา มองผลหลังจบก่อนนิยามว่าชัยชนะคืออะไร"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would you rather preserve than prove?",
      "th": "คุณอยากรักษาอะไรมากกว่าพิสูจน์ว่าตัวเองถูก?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "55",
    "index": 55,
    "title": {
      "en": "Six of Swords",
      "th": "หกดาบ"
    },
    "canonicalTitle": "SIX OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "six",
    "image": "assets/cards/55_SIX_OF_SWORDS.png",
    "keywords": {
      "en": [
        "transition",
        "thought",
        "truth"
      ],
      "th": [
        "การเคลื่อนผ่าน",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "A difficult stretch can be left gradually rather than dramatically. Choose the direction that brings more clarity and less needless turbulence.",
      "th": "ช่วงยากอาจถูกทิ้งไว้ข้างหลังอย่างค่อยเป็นค่อยไป เลือกทิศที่พาไปสู่ความชัดและลดความปั่นป่วนที่ไม่จำเป็น"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What calmer direction is available even if it is not yet comfortable?",
      "th": "มีทิศทางที่สงบกว่าอะไรบ้าง แม้ตอนนี้ยังไม่สบายใจนัก?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "56",
    "index": 56,
    "title": {
      "en": "Seven of Swords",
      "th": "เจ็ดดาบ"
    },
    "canonicalTitle": "SEVEN OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "seven",
    "image": "assets/cards/56_SEVEN_OF_SWORDS.png",
    "keywords": {
      "en": [
        "strategy",
        "thought",
        "truth"
      ],
      "th": [
        "กลยุทธ์",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "Strategy matters, but so does integrity. Be precise about what needs discretion and what would become avoidance or deception.",
      "th": "กลยุทธ์สำคัญ แต่ความซื่อตรงก็สำคัญ แยกให้ชัดว่าอะไรต้องใช้ความรอบคอบ และอะไรเริ่มกลายเป็นการหลบหรือปิดบัง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where does being clever need to stay accountable?",
      "th": "ตรงไหนที่ความฉลาดต้องเดินคู่กับความรับผิดชอบ?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "57",
    "index": 57,
    "title": {
      "en": "Eight of Swords",
      "th": "แปดดาบ"
    },
    "canonicalTitle": "EIGHT OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "eight",
    "image": "assets/cards/57_EIGHT_OF_SWORDS.png",
    "keywords": {
      "en": [
        "restriction",
        "thought",
        "truth"
      ],
      "th": [
        "ข้อจำกัด",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "The situation may be tight, but some limits are stronger in thought than in fact. Test which constraints are truly fixed.",
      "th": "สถานการณ์อาจคับแคบ แต่ข้อจำกัดบางอย่างแข็งแรงกว่าในความคิดมากกว่าความจริง ลองทดสอบว่าอะไรขยับไม่ได้จริงๆ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which “I can’t” statement deserves to be checked against reality?",
      "th": "ประโยค “ฉันทำไม่ได้” ข้อไหนควรถูกตรวจสอบกับความจริงอีกครั้ง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "58",
    "index": 58,
    "title": {
      "en": "Nine of Swords",
      "th": "เก้าดาบ"
    },
    "canonicalTitle": "NINE OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "nine",
    "image": "assets/cards/58_NINE_OF_SWORDS.png",
    "keywords": {
      "en": [
        "anxiety",
        "thought",
        "truth"
      ],
      "th": [
        "ความกังวล",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "The mind can magnify pain in the dark. Bring worries into daylight through facts, conversation, rest, or one concrete next step.",
      "th": "ความคิดอาจขยายความทุกข์เมื่ออยู่ลำพัง พาความกังวลออกสู่แสงด้วยข้อเท็จจริง การพูดคุย การพัก หรือก้าวถัดไปที่จับต้องได้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What worry becomes more workable once it is written down plainly?",
      "th": "ความกังวลไหนจัดการได้มากขึ้นเมื่อเขียนออกมาตรงๆ?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "59",
    "index": 59,
    "title": {
      "en": "Ten of Swords",
      "th": "สิบดาบ"
    },
    "canonicalTitle": "TEN OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "ten",
    "image": "assets/cards/59_TEN_OF_SWORDS.png",
    "keywords": {
      "en": [
        "ending",
        "thought",
        "truth"
      ],
      "th": [
        "จุดสิ้นสุด",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "Something may be definitively over. The useful question is no longer how to preserve it, but how to stop reliving the ending.",
      "th": "บางสิ่งอาจจบลงอย่างชัดเจนแล้ว คำถามที่มีประโยชน์ไม่ใช่จะรักษามันอย่างไร แต่จะหยุดกลับไปเจ็บกับตอนจบซ้ำๆ อย่างไร"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What becomes possible once you stop negotiating with an ending?",
      "th": "อะไรเริ่มเป็นไปได้เมื่อคุณหยุดต่อรองกับสิ่งที่จบแล้ว?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "60",
    "index": 60,
    "title": {
      "en": "Page of Swords",
      "th": "เพจดาบ"
    },
    "canonicalTitle": "PAGE OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "page",
    "image": "assets/cards/60_PAGE_OF_SWORDS.png",
    "keywords": {
      "en": [
        "inquiry",
        "thought",
        "truth"
      ],
      "th": [
        "การสืบค้น",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "Curiosity is sharp today. Ask, verify, learn, and watch the tendency to confuse quick conclusions with insight.",
      "th": "วันนี้ความอยากรู้คมชัด ถาม ตรวจสอบ เรียนรู้ และระวังการสรุปเร็วแล้วคิดว่าเป็นความเข้าใจลึก"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What question would improve the quality of your next decision?",
      "th": "คำถามอะไรจะทำให้การตัดสินใจครั้งถัดไปมีคุณภาพขึ้น?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "61",
    "index": 61,
    "title": {
      "en": "Knight of Swords",
      "th": "อัศวินดาบ"
    },
    "canonicalTitle": "KNIGHT OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "knight",
    "image": "assets/cards/61_KNIGHT_OF_SWORDS.png",
    "keywords": {
      "en": [
        "decisiveness",
        "thought",
        "truth"
      ],
      "th": [
        "ความเด็ดขาด",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "Fast thinking can cut through delay, but haste can create its own damage. Move quickly only after the target is clear.",
      "th": "ความคิดที่เร็วช่วยตัดความล่าช้าได้ แต่ความรีบก็สร้างความเสียหายเองได้ เดินเร็วเมื่อเป้าหมายชัดแล้วเท่านั้น"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where do you need decisiveness, and where do you need one more breath?",
      "th": "ตรงไหนต้องเด็ดขาด และตรงไหนควรเว้นจังหวะอีกหนึ่งครั้ง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "62",
    "index": 62,
    "title": {
      "en": "Queen of Swords",
      "th": "ราชินีดาบ"
    },
    "canonicalTitle": "QUEEN OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "queen",
    "image": "assets/cards/62_QUEEN_OF_SWORDS.png",
    "keywords": {
      "en": [
        "discernment",
        "thought",
        "truth"
      ],
      "th": [
        "การพิจารณาอย่างคมชัด",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "Clear boundaries and honest language can be kind when they prevent confusion. Say what is true without unnecessary cruelty.",
      "th": "ขอบเขตชัดและถ้อยคำตรงไปตรงมาอาจเป็นความเมตตาเมื่อช่วยลดความสับสน พูดความจริงโดยไม่เพิ่มความโหดร้ายที่ไม่จำเป็น"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What truth can you say cleanly, without adding punishment?",
      "th": "ความจริงอะไรที่คุณพูดได้อย่างชัดโดยไม่เติมการลงโทษเข้าไป?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "63",
    "index": 63,
    "title": {
      "en": "King of Swords",
      "th": "ราชาดาบ"
    },
    "canonicalTitle": "KING OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "king",
    "image": "assets/cards/63_KING_OF_SWORDS.png",
    "keywords": {
      "en": [
        "reason",
        "thought",
        "truth"
      ],
      "th": [
        "เหตุผล",
        "ความคิด",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "Good judgment asks for principle, evidence, and consistency. Lead with a clear mind while remaining aware of human consequences.",
      "th": "การตัดสินใจที่ดีต้องมีหลักฐาน หลักการ และความสม่ำเสมอ ใช้ความคิดชัดเจนพร้อมไม่ลืมผลที่เกิดกับคนจริงๆ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What decision would still look sound if your preferences were removed from it?",
      "th": "การตัดสินใจไหนยังดูสมเหตุสมผลเมื่อเอาความชอบส่วนตัวออกไป?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "64",
    "index": 64,
    "title": {
      "en": "Ace of Pentacles",
      "th": "เอซเหรียญ"
    },
    "canonicalTitle": "ACE OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "ace",
    "image": "assets/cards/64_ACE_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "opportunity",
        "resources",
        "grounding"
      ],
      "th": [
        "โอกาสที่จับต้องได้",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "A practical opening is available. Give it form through one measurable action, resource, or commitment.",
      "th": "มีโอกาสที่จับต้องได้อยู่ตรงหน้า ทำให้มันเป็นรูปเป็นร่างด้วยการลงมือ ทรัพยากร หรือคำมั่นที่วัดผลได้สักอย่าง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What small investment could create real future value?",
      "th": "การลงทุนเล็กๆ แบบไหนสร้างคุณค่าในอนาคตได้จริง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "65",
    "index": 65,
    "title": {
      "en": "Two of Pentacles",
      "th": "สองเหรียญ"
    },
    "canonicalTitle": "TWO OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "two",
    "image": "assets/cards/65_TWO_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "adaptation",
        "resources",
        "grounding"
      ],
      "th": [
        "การปรับสมดุล",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Several demands can be managed if you stay flexible about sequence and timing. Balance is active, not static.",
      "th": "หลายเรื่องไปด้วยกันได้ถ้ายืดหยุ่นเรื่องลำดับและจังหวะ ความสมดุลไม่ใช่การอยู่นิ่ง แต่คือการปรับตลอดเวลา"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can be rescheduled instead of squeezed in?",
      "th": "อะไรควรเปลี่ยนเวลาแทนการยัดให้ลงในตารางเดิม?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "66",
    "index": 66,
    "title": {
      "en": "Three of Pentacles",
      "th": "สามเหรียญ"
    },
    "canonicalTitle": "THREE OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "three",
    "image": "assets/cards/66_THREE_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "craft",
        "resources",
        "grounding"
      ],
      "th": [
        "ฝีมือและการร่วมมือ",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Quality grows through skill, feedback, and collaboration. Let good work be visible enough to be improved together.",
      "th": "คุณภาพเติบโตจากทักษะ ข้อเสนอแนะ และการร่วมมือ ทำให้งานดีมองเห็นได้พอที่จะช่วยกันพัฒนา"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Whose expertise would make this work better?",
      "th": "ความเชี่ยวชาญของใครจะช่วยให้งานนี้ดีขึ้น?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "67",
    "index": 67,
    "title": {
      "en": "Four of Pentacles",
      "th": "สี่เหรียญ"
    },
    "canonicalTitle": "FOUR OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "four",
    "image": "assets/cards/67_FOUR_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "security",
        "resources",
        "grounding"
      ],
      "th": [
        "ความมั่นคง",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Protection can become over-control. Check whether holding tightly is preserving something valuable or merely preserving fear.",
      "th": "การปกป้องอาจกลายเป็นการควบคุมมากเกินไป ลองดูว่าการกอดไว้แน่นกำลังรักษาสิ่งมีค่าหรือแค่รักษาความกลัว"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would still be safe if you loosened your grip slightly?",
      "th": "อะไรยังปลอดภัยได้แม้คุณคลายมือออกเล็กน้อย?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "68",
    "index": 68,
    "title": {
      "en": "Five of Pentacles",
      "th": "ห้าเหรียญ"
    },
    "canonicalTitle": "FIVE OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "five",
    "image": "assets/cards/68_FIVE_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "hardship",
        "resources",
        "grounding"
      ],
      "th": [
        "ความขาดแคลน",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Difficulty can narrow attention until support becomes hard to see. Look for concrete help, shared resources, and the next manageable need.",
      "th": "ความยากลำบากอาจทำให้สายตาแคบจนมองไม่เห็นความช่วยเหลือ มองหาความช่วยเหลือจริง ทรัพยากรร่วม และความต้องการถัดไปที่จัดการได้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What support is available if you allow yourself to ask directly?",
      "th": "มีความช่วยเหลืออะไรอยู่บ้างถ้าคุณยอมขออย่างตรงไปตรงมา?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "69",
    "index": 69,
    "title": {
      "en": "Six of Pentacles",
      "th": "หกเหรียญ"
    },
    "canonicalTitle": "SIX OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "six",
    "image": "assets/cards/69_SIX_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "exchange",
        "resources",
        "grounding"
      ],
      "th": [
        "การให้และรับ",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Healthy generosity pays attention to balance, dignity, and power. Give or receive in a way that keeps both sides human.",
      "th": "การให้ที่ดีใส่ใจความสมดุล ศักดิ์ศรี และอำนาจ ให้หรือรับโดยรักษาความเป็นมนุษย์ของทั้งสองฝ่ายไว้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Is the exchange fair, sustainable, and respectful for everyone involved?",
      "th": "การแลกเปลี่ยนนี้เป็นธรรม ยั่งยืน และเคารพทุกฝ่ายหรือไม่?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "70",
    "index": 70,
    "title": {
      "en": "Seven of Pentacles",
      "th": "เจ็ดเหรียญ"
    },
    "canonicalTitle": "SEVEN OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "seven",
    "image": "assets/cards/70_SEVEN_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "assessment",
        "resources",
        "grounding"
      ],
      "th": [
        "การประเมินผล",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Long-term work benefits from a pause to assess return. Patience matters, but so does knowing when the method needs adjustment.",
      "th": "งานระยะยาวได้ประโยชน์จากการหยุดประเมินผล ความอดทนสำคัญ แต่การรู้ว่าเมื่อไรควรปรับวิธีก็สำคัญเช่นกัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What is growing well, and what only looks busy?",
      "th": "อะไรเติบโตจริง และอะไรเพียงดูเหมือนกำลังยุ่ง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "71",
    "index": 71,
    "title": {
      "en": "Eight of Pentacles",
      "th": "แปดเหรียญ"
    },
    "canonicalTitle": "EIGHT OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "eight",
    "image": "assets/cards/71_EIGHT_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "mastery",
        "resources",
        "grounding"
      ],
      "th": [
        "การฝึกฝน",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Skill is built through attentive repetition. Refine the process, not just the outcome, and let small improvements compound.",
      "th": "ทักษะเกิดจากการทำซ้ำอย่างใส่ใจ พัฒนากระบวนการ ไม่ใช่เพียงผลลัพธ์ แล้วปล่อยให้การปรับเล็กๆ สะสมพลัง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which part of the craft deserves another careful repetition?",
      "th": "ส่วนไหนของฝีมือควรได้ฝึกซ้ำอย่างละเอียดอีกครั้ง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "72",
    "index": 72,
    "title": {
      "en": "Nine of Pentacles",
      "th": "เก้าเหรียญ"
    },
    "canonicalTitle": "NINE OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "nine",
    "image": "assets/cards/72_NINE_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "self-sufficiency",
        "resources",
        "grounding"
      ],
      "th": [
        "ความมั่นคงด้วยตนเอง",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Enjoy what disciplined effort has created. Independence is strongest when it includes discernment, not isolation.",
      "th": "ชื่นชมสิ่งที่ความมีวินัยสร้างขึ้น ความเป็นอิสระแข็งแรงที่สุดเมื่อมีการพิจารณา ไม่ใช่การตัดตัวเองออกจากคนอื่น"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What have you built that you can now genuinely enjoy?",
      "th": "คุณสร้างอะไรไว้แล้วที่วันนี้ควรได้ชื่นชมอย่างจริงจัง?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "73",
    "index": 73,
    "title": {
      "en": "Ten of Pentacles",
      "th": "สิบเหรียญ"
    },
    "canonicalTitle": "TEN OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "ten",
    "image": "assets/cards/73_TEN_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "legacy",
        "resources",
        "grounding"
      ],
      "th": [
        "ความมั่นคงระยะยาว",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Think beyond the immediate win. Systems, family, community, and long-term stewardship may matter more than a quick result.",
      "th": "มองเลยชัยชนะเฉพาะหน้า ระบบ ครอบครัว ชุมชน และการดูแลระยะยาวอาจสำคัญกว่าผลลัพธ์เร็วๆ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What are you building that should still matter years from now?",
      "th": "คุณกำลังสร้างอะไรที่ควรยังมีความหมายในอีกหลายปีข้างหน้า?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "74",
    "index": 74,
    "title": {
      "en": "Page of Pentacles",
      "th": "เพจเหรียญ"
    },
    "canonicalTitle": "PAGE OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "page",
    "image": "assets/cards/74_PAGE_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "study",
        "resources",
        "grounding"
      ],
      "th": [
        "การเรียนรู้เชิงปฏิบัติ",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "A practical skill or opportunity deserves beginner’s attention. Study the details and make the first real investment of effort.",
      "th": "ทักษะหรือโอกาสที่จับต้องได้สมควรได้รับความใส่ใจแบบมือใหม่ เรียนรายละเอียดและลงแรงจริงเป็นครั้งแรก"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What could become valuable if you study it seriously now?",
      "th": "อะไรอาจมีคุณค่าในอนาคตถ้าคุณเรียนรู้มันอย่างจริงจังตั้งแต่ตอนนี้?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "75",
    "index": 75,
    "title": {
      "en": "Knight of Pentacles",
      "th": "อัศวินเหรียญ"
    },
    "canonicalTitle": "KNIGHT OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "knight",
    "image": "assets/cards/75_KNIGHT_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "consistency",
        "resources",
        "grounding"
      ],
      "th": [
        "ความสม่ำเสมอ",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Steady work may look unglamorous, but reliability compounds. Keep the pace you can actually sustain.",
      "th": "งานที่สม่ำเสมออาจไม่หวือหวา แต่ความเชื่อถือได้สะสมผล เลือกจังหวะที่คุณทำต่อเนื่องได้จริง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What routine would make progress almost boringly reliable?",
      "th": "กิจวัตรอะไรจะทำให้ความคืบหน้าสม่ำเสมอจนแทบดูธรรมดา?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "76",
    "index": 76,
    "title": {
      "en": "Queen of Pentacles",
      "th": "ราชินีเหรียญ"
    },
    "canonicalTitle": "QUEEN OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "queen",
    "image": "assets/cards/76_QUEEN_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "grounded care",
        "resources",
        "grounding"
      ],
      "th": [
        "การดูแลที่มีฐานมั่นคง",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Care becomes powerful when it is practical. Tend to body, home, money, work, and people in ways that can be sustained.",
      "th": "การดูแลมีพลังเมื่อจับต้องได้ ใส่ใจกาย บ้าน เงิน งาน และผู้คนด้วยวิธีที่ทำต่อเนื่องได้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What practical act of care would improve the day immediately?",
      "th": "การดูแลแบบลงมือจริงอะไรจะทำให้วันนี้ดีขึ้นทันที?"
    },
    "contentVersion": "daily-guidance-v1"
  },
  {
    "id": "77",
    "index": 77,
    "title": {
      "en": "King of Pentacles",
      "th": "ราชาเหรียญ"
    },
    "canonicalTitle": "KING OF PENTACLES",
    "arcana": "minor",
    "number": null,
    "suit": "pentacles",
    "rank": "king",
    "image": "assets/cards/77_KING_OF_PENTACLES.png",
    "keywords": {
      "en": [
        "stewardship",
        "resources",
        "grounding"
      ],
      "th": [
        "การบริหารทรัพยากร",
        "ทรัพยากร",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Resources are most useful when managed with patience, competence, and long-term responsibility. Build for durability rather than display.",
      "th": "ทรัพยากรมีประโยชน์ที่สุดเมื่อบริหารด้วยความอดทน ความสามารถ และความรับผิดชอบระยะยาว สร้างให้ทน ไม่ใช่สร้างเพื่อโชว์"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would responsible abundance look like in practice?",
      "th": "ความมั่งคั่งที่รับผิดชอบจะมีหน้าตาอย่างไรในชีวิตจริง?"
    },
    "contentVersion": "daily-guidance-v1"
  }
];

  if (CARDS.length !== 78 || CARDS.some((card, index) => card.index !== index || card.id !== String(index).padStart(2, '0'))) {
    throw new Error('Little Ganesha Tarot card content failed canonical 78-card validation.');
  }

  window.LGTReadingContent = Object.freeze({
    version: CONTENT_VERSION,
    cardBack: CARD_BACK,
    cards: Object.freeze(CARDS.map((card) => Object.freeze(card))),
    getCard(cardId) {
      return CARDS.find((card) => card.id === String(cardId).padStart(2, '0')) || null;
    }
  });
})();

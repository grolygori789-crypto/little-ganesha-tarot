(() => {
  'use strict';

  const CONTENT_VERSION = 'daily-guidance-v2';
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
        "new beginnings",
        "trust",
        "openness"
      ],
      "th": [
        "การเริ่มต้นใหม่",
        "ความไว้ใจ",
        "การเปิดรับ"
      ]
    },
    "upright": {
      "en": "A new beginning does not require a perfect plan. Stay curious, take one honest step, and let experience show you what comes next.",
      "th": "การเริ่มต้นใหม่ไม่จำเป็นต้องมีแผนที่สมบูรณ์แบบ ความอยากรู้อยากลองและก้าวเล็กๆ ที่จริงใจอาจพาคุณเห็นทางต่อไปได้ชัดกว่าการคิดอยู่ที่เดิม"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where would one small step teach you more than another round of planning?",
      "th": "เรื่องไหนที่การลองก้าวไปหนึ่งก้าวอาจให้คำตอบมากกว่าการวางแผนเพิ่ม?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "initiative",
        "skill",
        "focus"
      ],
      "th": [
        "การลงมือ",
        "ทักษะ",
        "ความมุ่งมั่น"
      ]
    },
    "upright": {
      "en": "You already have more to work with than you may realize. Bring your attention, skills, and intention together, then use them deliberately.",
      "th": "คุณมีสิ่งที่ใช้ต่อยอดได้มากกว่าที่คิด ลองรวมความตั้งใจ ทักษะ และสิ่งที่มีอยู่ให้ไปในทิศเดียวกัน แล้วลงมือกับมันอย่างจริงจัง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What could you move forward today with what you already have?",
      "th": "วันนี้คุณขยับเรื่องไหนได้ด้วยสิ่งที่มีอยู่แล้ว?"
    },
    "contentVersion": "daily-guidance-v2"
  },
  {
    "id": "02",
    "index": 2,
    "title": {
      "en": "The High Priestess",
      "th": "มหาปุโรหิตหญิง"
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
        "inner wisdom"
      ],
      "th": [
        "สัญชาตญาณ",
        "ความสงบ",
        "ปัญญาภายใน"
      ]
    },
    "upright": {
      "en": "Not every answer becomes clearer by thinking harder. Give yourself enough quiet to notice what you already sense beneath the noise.",
      "th": "ไม่ใช่ทุกคำตอบจะชัดขึ้นจากการคิดเพิ่ม บางเรื่องต้องอาศัยความเงียบพอให้คุณได้สังเกตว่าลึกๆ แล้วตัวเองรู้สึกอย่างไร"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What do you sense before you start explaining it away?",
      "th": "ก่อนจะรีบหาเหตุผลมาหักล้าง ลึกๆ แล้วคุณรู้สึกอย่างไรกับเรื่องนี้?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "creativity"
      ],
      "th": [
        "การดูแล",
        "ความอุดมสมบูรณ์",
        "ความสร้างสรรค์"
      ]
    },
    "upright": {
      "en": "What you care for can grow. Give your time, warmth, and practical attention to the person, idea, or part of life you want to flourish.",
      "th": "สิ่งที่ได้รับการดูแลมีโอกาสเติบโต วันนี้ลองให้เวลา ความใส่ใจ และการดูแลที่จับต้องได้กับคน งาน หรือเรื่องที่คุณอยากเห็นงอกงาม"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What needs steady care more than extra pressure?",
      "th": "ตอนนี้อะไรต้องการการดูแลสม่ำเสมอมากกว่าการเร่งให้เกิดผล?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "ความเป็นผู้นำ",
        "ขอบเขต"
      ]
    },
    "upright": {
      "en": "Clear structure can create safety and freedom. Decide what needs a plan, a firm boundary, or someone willing to take responsibility.",
      "th": "โครงสร้างที่ชัดไม่ได้มีไว้จำกัดเสมอไป บางครั้งมันช่วยให้รู้ว่าอะไรควรทำ ใครรับผิดชอบ และตรงไหนควรวางขอบเขต"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where would a clearer boundary make life easier?",
      "th": "เรื่องไหนจะง่ายขึ้นถ้าคุณวางขอบเขตให้ชัดกว่านี้?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "guidance",
        "shared values"
      ],
      "th": [
        "แบบแผน",
        "คำชี้แนะ",
        "คุณค่าร่วม"
      ]
    },
    "upright": {
      "en": "There may be wisdom in a trusted teacher, a proven method, or a tradition that has lasted for a reason. Learn from it before deciding what fits you.",
      "th": "บางเรื่องไม่จำเป็นต้องเริ่มจากศูนย์ ครูที่ไว้ใจได้ วิธีที่ผ่านการใช้จริง หรือแบบแผนที่มีเหตุผลอาจช่วยให้คุณเห็นทางชัดขึ้น ก่อนจะเลือกว่าจะนำส่วนไหนมาใช้กับตัวเอง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Whose guidance or experience is worth listening to more closely?",
      "th": "ตอนนี้ประสบการณ์หรือคำแนะนำจากใครน่าจะช่วยคุณได้มากที่สุด?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "partnership"
      ],
      "th": [
        "การเลือก",
        "ความสอดคล้อง",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "A meaningful choice asks whether your heart, values, and actions are pointing in the same direction. Connection grows stronger when you choose with honesty.",
      "th": "การเลือกที่สำคัญไม่ได้มีแค่ว่าอะไรทำให้รู้สึกดี แต่คือสิ่งที่เลือกนั้นตรงกับคุณค่า ความรู้สึก และความสัมพันธ์ที่คุณให้ความสำคัญหรือไม่"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which choice would bring your actions closer to what truly matters to you?",
      "th": "ทางเลือกไหนทำให้สิ่งที่คุณทำตรงกับสิ่งที่สำคัญกับคุณมากที่สุด?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "determination",
        "momentum"
      ],
      "th": [
        "ทิศทาง",
        "ความมุ่งมั่น",
        "แรงส่ง"
      ]
    },
    "upright": {
      "en": "Progress comes from giving your energy one clear direction. Choose where you are going, then commit instead of pulling yourself several ways at once.",
      "th": "เมื่อพลังไม่ถูกดึงไปหลายทาง คุณจะเดินหน้าได้เร็วขึ้น เลือกให้ชัดว่ากำลังจะไปไหน แล้วทุ่มแรงกับทิศนั้นแทนการพยายามไปทุกทางพร้อมกัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What deserves your full attention right now?",
      "th": "ตอนนี้เรื่องไหนควรได้ความสนใจจากคุณแบบเต็มที่?"
    },
    "contentVersion": "daily-guidance-v2"
  },
  {
    "id": "08",
    "index": 8,
    "title": {
      "en": "Strength",
      "th": "พละกำลัง"
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
        "self-control"
      ],
      "th": [
        "ความกล้า",
        "ความอ่อนโยน",
        "การควบคุมตนเอง"
      ]
    },
    "upright": {
      "en": "Strength does not have to be forceful. Patience, courage, and staying steady with your reactions may take you further than pushing harder.",
      "th": "ความเข้มแข็งไม่ได้แปลว่าต้องฝืนหรือแข็งกร้าว วันนี้ความอดทน ความกล้า และการดูแลอารมณ์ตัวเองให้ดีอาจได้ผลมากกว่าการบังคับให้ทุกอย่างเป็นอย่างใจ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where would calm courage work better than pushing harder?",
      "th": "เรื่องไหนที่การใจเย็นแต่ไม่ถอยจะได้ผลกว่าการฝืนให้ชนะ?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "introspection",
        "solitude",
        "wisdom"
      ],
      "th": [
        "การทบทวน",
        "การอยู่กับตัวเอง",
        "ปัญญา"
      ]
    },
    "upright": {
      "en": "A little distance can help you hear yourself again. Step away from other people’s noise long enough to notice what your own experience is telling you.",
      "th": "การถอยออกมาสักระยะอาจช่วยให้มองเห็นเรื่องเดิมชัดขึ้น ลดเสียงจากรอบข้างลงแล้วฟังสิ่งที่ประสบการณ์และความคิดของคุณกำลังบอก"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What becomes clearer when you stop looking outside yourself for the answer?",
      "th": "เมื่อหยุดมองหาคำตอบจากคนอื่น คุณเห็นอะไรชัดขึ้น?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "จังหวะ"
      ]
    },
    "upright": {
      "en": "Things are changing, and timing matters. You may not control the whole cycle, but you can notice what is shifting and respond instead of clinging to what was.",
      "th": "สถานการณ์กำลังเปลี่ยน และจังหวะมีความสำคัญ คุณอาจควบคุมทุกอย่างไม่ได้ แต่เลือกได้ว่าจะปรับตัวตามสิ่งที่กำลังเกิดขึ้นหรือยึดกับสิ่งเดิมต่อไป"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What change would be easier if you worked with it instead of against it?",
      "th": "ความเปลี่ยนแปลงอะไรจะรับมือได้ง่ายขึ้นถ้าคุณหยุดต้านมัน?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "fairness"
      ],
      "th": [
        "ความจริง",
        "ความรับผิดชอบ",
        "ความเป็นธรรม"
      ]
    },
    "upright": {
      "en": "Look closely at the facts, the consequences, and your own part in the situation. Fairness begins with being honest about all three.",
      "th": "มองข้อเท็จจริง ผลที่ตามมา และส่วนที่คุณมีต่อเรื่องนี้ให้ครบ ความเป็นธรรมเริ่มจากการยอมรับสิ่งเหล่านี้ตามที่เป็น"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would a fair assessment ask you to admit?",
      "th": "ถ้าจะมองเรื่องนี้อย่างเป็นธรรมจริงๆ คุณต้องยอมรับอะไรบ้าง?"
    },
    "contentVersion": "daily-guidance-v2"
  },
  {
    "id": "12",
    "index": 12,
    "title": {
      "en": "The Hanged Man",
      "th": "ชายผู้ถูกแขวน"
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
        "surrender"
      ],
      "th": [
        "การหยุดพัก",
        "มุมมองใหม่",
        "การยอมปล่อย"
      ]
    },
    "upright": {
      "en": "Pushing harder may not be the answer. A pause—or a different point of view—can reveal options you could not see while forcing progress.",
      "th": "การพยายามมากขึ้นอาจไม่ใช่คำตอบของวันนี้ การหยุดหรือมองจากอีกมุมหนึ่งอาจทำให้เห็นทางที่มองไม่เห็นตอนกำลังฝืนให้เรื่องเดินหน้า"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What might change if you stopped trying to make this move today?",
      "th": "อะไรอาจเปลี่ยนไปถ้าวันนี้คุณหยุดพยายามบังคับให้เรื่องนี้ขยับ?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "endings",
        "transformation",
        "renewal"
      ],
      "th": [
        "การสิ้นสุด",
        "การเปลี่ยนผ่าน",
        "การเริ่มใหม่"
      ]
    },
    "upright": {
      "en": "Something may have reached the end of its current form. Closing it honestly creates space for the next part of your life to begin.",
      "th": "บางสิ่งอาจมาถึงจุดที่ควรจบในรูปแบบเดิม การยอมรับว่าบทหนึ่งสิ้นสุดแล้วทำให้มีพื้นที่สำหรับสิ่งใหม่ที่กำลังจะเริ่ม"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What are you keeping alive even though it has already run its course?",
      "th": "คุณกำลังยื้ออะไรไว้ ทั้งที่จริงๆ มันมาถึงปลายทางแล้ว?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "balance",
        "moderation",
        "integration"
      ],
      "th": [
        "ความสมดุล",
        "ความพอดี",
        "การผสาน"
      ]
    },
    "upright": {
      "en": "Balance comes from small adjustments, not perfect control. Ease the extremes, combine what works, and give the middle ground a chance.",
      "th": "ความสมดุลเกิดจากการค่อยๆ ปรับ ไม่ใช่การควบคุมทุกอย่างให้พอดีเป๊ะ ลดสิ่งที่มากเกิน เติมสิ่งที่ขาด แล้วดูว่าจุดพอดีอยู่ตรงไหน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What needs a little less of one thing and a little more of another?",
      "th": "ตอนนี้อะไรควรลดลงสักหน่อย และอะไรควรเพิ่มขึ้นอีกนิด?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "freedom"
      ],
      "th": [
        "ความยึดติด",
        "สิ่งล่อลวง",
        "การเป็นอิสระ"
      ]
    },
    "upright": {
      "en": "Notice what has more power over you than you want it to have. Once you name the attachment honestly, you have more room to choose differently.",
      "th": "ลองมองตรงๆ ว่าอะไรมีอำนาจเหนือคุณมากกว่าที่คุณต้องการ พอเห็นความยึดติดหรือรูปแบบเดิมได้ชัด คุณก็มีพื้นที่กลับมาเลือกใหม่"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What habit or attachment loses power when you stop making excuses for it?",
      "th": "นิสัยหรือความยึดติดอะไรจะเบาลงเมื่อคุณหยุดหาข้ออ้างให้มัน?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "upheaval",
        "truth revealed",
        "rebuilding"
      ],
      "th": [
        "ความสั่นคลอน",
        "ความจริงที่เปิดเผย",
        "การสร้างใหม่"
      ]
    },
    "upright": {
      "en": "A shaky structure may be showing you where it was never secure. Disruption is uncomfortable, but it can clear the way for something more honest and stable.",
      "th": "สิ่งที่ไม่มั่นคงอาจกำลังเผยให้เห็นจุดที่พึ่งพาไม่ได้จริง แม้ความสั่นคลอนจะไม่สบายใจ แต่มันอาจเปิดทางให้คุณสร้างใหม่บนความจริงมากกว่าเดิม"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What truth is becoming impossible to ignore?",
      "th": "ตอนนี้มีความจริงอะไรที่คุณมองข้ามต่อไปได้ยากแล้ว?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "healing",
        "authenticity"
      ],
      "th": [
        "ความหวัง",
        "การเยียวยา",
        "ความเป็นตัวเอง"
      ]
    },
    "upright": {
      "en": "Hope can return when you reconnect with what feels true and gives you strength. You do not need to impress anyone; focus on what genuinely helps you feel like yourself again.",
      "th": "ความหวังอาจกลับมาเมื่อคุณกลับไปหาสิ่งที่ตรงกับตัวเองและช่วยเติมแรง วันนี้ไม่ต้องพยายามทำให้ใครประทับใจ แค่ใส่ใจกับสิ่งที่ทำให้คุณรู้สึกเป็นตัวเองอีกครั้ง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What helps you believe in the next step again?",
      "th": "อะไรช่วยให้คุณกลับมาเชื่อว่าก้าวต่อไปยังมีความหมาย?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "intuition",
        "imagination"
      ],
      "th": [
        "ความไม่แน่นอน",
        "สัญชาตญาณ",
        "จินตนาการ"
      ]
    },
    "upright": {
      "en": "The picture is not fully clear yet. Your feelings and intuition may offer clues, but check the facts before fear or wishful thinking fills in what you do not know.",
      "th": "ภาพของเรื่องนี้ยังไม่ชัดทั้งหมด ความรู้สึกและสัญชาตญาณอาจช่วยบอกบางอย่างได้ แต่ควรเช็กข้อเท็จจริงก่อนปล่อยให้ความกลัวหรือความคาดหวังเติมส่วนที่ยังไม่รู้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can you verify before you decide what this situation means?",
      "th": "ก่อนตัดสินว่าเรื่องนี้หมายถึงอะไร มีอะไรที่คุณตรวจสอบให้แน่ใจได้บ้าง?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "joy",
        "vitality",
        "clarity"
      ],
      "th": [
        "ความสุข",
        "พลังชีวิต",
        "ความชัดเจน"
      ]
    },
    "upright": {
      "en": "Clarity, warmth, and simple joy deserve room today. Let yourself notice what is genuinely going well without immediately looking for the catch.",
      "th": "วันนี้ให้พื้นที่กับความชัดเจน ความอบอุ่น และความสุขที่ไม่ซับซ้อนบ้าง มองสิ่งดีที่เกิดขึ้นตามที่มันเป็น โดยไม่รีบหาว่าต้องมีอะไรผิดตามมา"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What good thing can you enjoy without adding a “but”?",
      "th": "มีเรื่องดีอะไรที่คุณรับไว้ได้เต็มๆ โดยไม่ต้องเติมคำว่า “แต่”?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "เสียงเรียกภายใน"
      ]
    },
    "upright": {
      "en": "A bigger pattern is coming into focus. Look back honestly, take the lesson, and decide what you want to do differently from here.",
      "th": "เมื่อมองย้อนกลับไป คุณอาจเริ่มเห็นภาพใหญ่ชัดขึ้น รับบทเรียนจากสิ่งที่ผ่านมา แล้วเลือกว่าจากนี้อยากทำอะไรต่างไปจากเดิม"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What lesson is ready to become a decision?",
      "th": "บทเรียนอะไรพร้อมจะเปลี่ยนจากความเข้าใจให้เป็นการตัดสินใจแล้ว?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "ความสำเร็จครบวงจร",
        "การหลอมรวม",
        "ความครบถ้วน"
      ]
    },
    "upright": {
      "en": "A cycle is coming together. Before rushing into the next beginning, recognize what you have completed, learned, and made part of yourself.",
      "th": "วงจรหนึ่งกำลังครบถ้วน ก่อนรีบไปเริ่มเรื่องใหม่ ลองมองสิ่งที่คุณทำสำเร็จ สิ่งที่ได้เรียนรู้ และบทเรียนที่ตอนนี้ติดตัวคุณไปแล้ว"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What deserves to be acknowledged as truly complete?",
      "th": "อะไรควรได้รับการยอมรับว่าเสร็จสมบูรณ์จริงๆ แล้ว?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "inspiration",
        "potential",
        "initiative"
      ],
      "th": [
        "แรงบันดาลใจ",
        "ศักยภาพ",
        "การเริ่มลงมือ"
      ]
    },
    "upright": {
      "en": "A spark is here. Give the idea one real action while the energy is alive, even if the step is small.",
      "th": "มีประกายใหม่เกิดขึ้นแล้ว อย่าปล่อยให้มันอยู่แค่ในหัว ลองเปลี่ยนแรงบันดาลใจนั้นให้เป็นการลงมือจริงสักหนึ่งอย่าง แม้จะเล็กก็ตาม"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What idea deserves its first real move today?",
      "th": "ความคิดไหนควรได้ก้าวแรกแบบจริงจังในวันนี้?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "possibility",
        "direction"
      ],
      "th": [
        "การวางแผน",
        "ทางเลือก",
        "ทิศทาง"
      ]
    },
    "upright": {
      "en": "You can see more than one possible direction. Compare the options, choose the horizon that matters, and stop spending energy on every path at once.",
      "th": "ตอนนี้คุณมองเห็นทางเลือกมากกว่าหนึ่งทาง เปรียบเทียบให้พอ แล้วเลือกทิศที่สำคัญจริง แทนการแบ่งแรงให้ทุกทางพร้อมกัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which direction expands your possibilities without scattering your focus?",
      "th": "ทางไหนเปิดโอกาสให้คุณมากขึ้นโดยไม่ทำให้เสียสมาธิ?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "foresight",
        "progress"
      ],
      "th": [
        "การขยายตัว",
        "การมองไกล",
        "ความก้าวหน้า"
      ]
    },
    "upright": {
      "en": "The first effort is beginning to show what could come next. Keep looking ahead, stay open to feedback, and build on that early progress.",
      "th": "สิ่งที่ลงมือไปเริ่มเห็นผลและทำให้มองไกลขึ้นได้แล้ว ใช้ความคืบหน้าช่วงแรกเป็นฐาน มองไปข้างหน้า และพร้อมปรับตามสิ่งที่เกิดขึ้นจริง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What are you ready to build beyond the first signs of success?",
      "th": "จากความคืบหน้าที่มีอยู่ คุณพร้อมต่อยอดอะไรเป็นขั้นถัดไป?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "stability",
        "belonging"
      ],
      "th": [
        "การเฉลิมฉลอง",
        "ความมั่นคง",
        "ความเป็นส่วนหนึ่ง"
      ]
    },
    "upright": {
      "en": "A stable moment is worth celebrating. Let yourself recognize progress, belonging, or a shared milestone before you hurry on.",
      "th": "ช่วงที่มั่นคงและน่ายินดีควรได้หยุดชื่นชมบ้าง ให้เวลากับความสำเร็จ ความเป็นส่วนหนึ่ง หรือหมุดหมายที่คุณเดินมาถึงร่วมกับคนอื่น ก่อนจะรีบไปต่อ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What progress is worth celebrating with others?",
      "th": "ความคืบหน้าอะไรที่ควรได้ฉลองหรือแบ่งปันกับคนอื่น?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "competition",
        "friction",
        "growth"
      ],
      "th": [
        "การแข่งขัน",
        "ความขัดแย้ง",
        "การพัฒนา"
      ]
    },
    "upright": {
      "en": "Difference and competition can sharpen good ideas when they stay constructive. Use the friction that helps you grow and step away from conflict that only drains energy.",
      "th": "ความเห็นต่างหรือการแข่งขันอาจช่วยให้งานคมขึ้นได้ ถ้ามันยังพาไปข้างหน้า แยกให้ได้ว่าแรงปะทะไหนช่วยให้คุณพัฒนา และอันไหนมีแต่ทำให้หมดแรง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which disagreement can improve the work, and which one is only draining you?",
      "th": "ความเห็นต่างไหนช่วยให้งานดีขึ้น และอันไหนมีแต่เปลืองพลัง?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "confidence",
        "progress"
      ],
      "th": [
        "การได้รับการยอมรับ",
        "ความมั่นใจ",
        "ความก้าวหน้า"
      ]
    },
    "upright": {
      "en": "Your progress is visible. Accept the recognition you have earned, but do not let applause become the only way you measure your worth.",
      "th": "ความก้าวหน้าของคุณชัดขึ้นจนคนอื่นมองเห็นได้แล้ว รับคำชมหรือการยอมรับได้เต็มที่ แต่อย่าให้เสียงจากคนอื่นกลายเป็นมาตรวัดคุณค่าของตัวเองทั้งหมด"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What achievement can you own without needing to make it bigger than it is?",
      "th": "ความสำเร็จอะไรที่คุณยอมรับกับตัวเองได้ตรงๆ โดยไม่ต้องทำให้มันใหญ่เกินจริง?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "resilience",
        "boundaries"
      ],
      "th": [
        "การยืนหยัด",
        "ความอดทน",
        "การรักษาจุดยืน"
      ]
    },
    "upright": {
      "en": "Something important may need you to stand your ground. Protect what matters, but save your energy for the challenges that are truly worth answering.",
      "th": "บางเรื่องต้องการให้คุณยืนหยัดกับสิ่งที่สำคัญ ปกป้องจุดยืนของตัวเองได้ แต่ไม่จำเป็นต้องตอบโต้ทุกแรงกดดันที่เข้ามา"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What is genuinely worth defending?",
      "th": "ตอนนี้อะไรสำคัญพอที่คุณควรยืนหยัดปกป้อง?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "speed",
        "momentum",
        "communication"
      ],
      "th": [
        "ความรวดเร็ว",
        "แรงส่ง",
        "การสื่อสาร"
      ]
    },
    "upright": {
      "en": "Things may start moving quickly. Keep your communication clear, respond while the path is open, and do not create delays through second-guessing.",
      "th": "จังหวะของเรื่องอาจเร็วขึ้นกว่าที่ผ่านมา สื่อสารให้ชัด ตอบสนองตอนที่ทางยังเปิด และอย่าปล่อยให้การลังเลซ้ำๆ สร้างความช้าโดยไม่จำเป็น"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can move now because the way is already open?",
      "th": "ตอนนี้เรื่องไหนเดินหน้าได้เลย เพราะทางพร้อมอยู่แล้ว?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "vigilance",
        "endurance"
      ],
      "th": [
        "ความอึด",
        "ความระมัดระวัง",
        "การไปต่อ"
      ]
    },
    "upright": {
      "en": "You may be tired, but that is not the same as being finished. Protect your energy, keep the boundaries that help, and do not treat every difficulty as a new threat.",
      "th": "คุณอาจเหนื่อย แต่ไม่ได้แปลว่าต้องยอมแพ้ รักษาแรงที่เหลือไว้ วางขอบเขตที่ช่วยให้ไปต่อ และไม่ต้องมองทุกสิ่งที่เข้ามาเป็นภัยไปเสียหมด"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What boundary would help you keep going without becoming defensive?",
      "th": "ขอบเขตแบบไหนจะช่วยให้คุณไปต่อได้โดยไม่ต้องตั้งการ์ดกับทุกอย่าง?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "responsibility",
        "overload",
        "release"
      ],
      "th": [
        "ความรับผิดชอบ",
        "ภาระหนัก",
        "การแบ่งเบา"
      ]
    },
    "upright": {
      "en": "You may be carrying too much. Separate what is truly yours from what can be delegated, simplified, postponed, or put down.",
      "th": "ภาระอาจมากเกินกว่าที่ควร แยกให้ชัดว่าอะไรเป็นหน้าที่ของคุณจริงๆ และอะไรแบ่งให้คนอื่น ลดความซับซ้อน เลื่อนไปก่อน หรือวางลงได้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What are you still carrying simply because you have carried it for so long?",
      "th": "คุณยังแบกอะไรอยู่เพียงเพราะแบกมันมานานแล้ว?"
    },
    "contentVersion": "daily-guidance-v2"
  },
  {
    "id": "32",
    "index": 32,
    "title": {
      "en": "Page of Wands",
      "th": "เด็กถือไม้เท้า"
    },
    "canonicalTitle": "PAGE OF WANDS",
    "arcana": "minor",
    "number": null,
    "suit": "wands",
    "rank": "page",
    "image": "assets/cards/32_PAGE_OF_WANDS.png",
    "keywords": {
      "en": [
        "curiosity",
        "exploration",
        "enthusiasm"
      ],
      "th": [
        "ความอยากรู้อยากลอง",
        "การสำรวจ",
        "ความกระตือรือร้น"
      ]
    },
    "upright": {
      "en": "Curiosity is asking for room to experiment. Treat the next step as something to learn from, not as a final test of whether you are good enough.",
      "th": "ความอยากรู้อยากลองกำลังชวนให้ทดลอง อย่าให้ก้าวต่อไปกลายเป็นข้อสอบตัดสินว่าคุณเก่งพอหรือไม่ มองมันเป็นโอกาสได้เรียนรู้จากของจริง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would you try if you were allowed to be a beginner?",
      "th": "ถ้าคุณอนุญาตให้ตัวเองเป็นมือใหม่ได้ คุณอยากลองอะไร?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "passion",
        "action",
        "adventure"
      ],
      "th": [
        "ความกล้าลุย",
        "การลงมือ",
        "การผจญภัย"
      ]
    },
    "upright": {
      "en": "There is energy to move boldly, but speed still needs direction. Act with courage without rushing past the part of you that knows when to slow down.",
      "th": "ตอนนี้มีแรงให้ลุยได้เต็มที่ แต่ความเร็วก็ยังต้องมีทิศทาง กล้าเดินหน้าได้ โดยไม่รีบจนข้ามสัญญาณที่บอกว่าควรชะลอหรือคิดอีกนิด"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where does courage need a little more direction?",
      "th": "เรื่องไหนที่ความกล้าของคุณต้องมีทิศทางชัดขึ้นอีกหน่อย?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "warmth",
        "charisma"
      ],
      "th": [
        "ความมั่นใจ",
        "ความอบอุ่น",
        "เสน่ห์"
      ]
    },
    "upright": {
      "en": "Confidence works best when it does not need to prove itself. Let warmth, self-trust, and genuine ability speak for you.",
      "th": "ความมั่นใจที่แท้ไม่จำเป็นต้องพยายามพิสูจน์ตัวเอง ให้ความอบอุ่น ความเชื่อมั่น และความสามารถจริงของคุณเป็นสิ่งที่คนอื่นสัมผัสได้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "How can you show up fully without trying to impress?",
      "th": "วันนี้คุณจะเป็นตัวเองอย่างเต็มที่ได้อย่างไร โดยไม่ต้องพยายามทำให้ใครประทับใจ?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "leadership",
        "initiative"
      ],
      "th": [
        "วิสัยทัศน์",
        "ภาวะผู้นำ",
        "การริเริ่ม"
      ]
    },
    "upright": {
      "en": "A strong vision needs clear leadership. Set the direction, make the necessary decision, and help others understand what you are building toward.",
      "th": "วิสัยทัศน์ที่ใหญ่ต้องการทิศทางที่ชัด ตัดสินใจในสิ่งที่จำเป็น แล้วทำให้คนที่เกี่ยวข้องเข้าใจว่าคุณกำลังพาเรื่องนี้ไปไหน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would leadership look like if you focused on direction rather than control?",
      "th": "ภาวะผู้นำจะเป็นอย่างไร ถ้าคุณเน้นการชี้ทิศมากกว่าการควบคุม?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "emotional openness",
        "compassion",
        "creativity"
      ],
      "th": [
        "การเปิดใจ",
        "ความเมตตา",
        "ความสร้างสรรค์"
      ]
    },
    "upright": {
      "en": "Your heart may be opening to something new. Let care, connection, or creativity have some space before you analyze every feeling.",
      "th": "ใจอาจกำลังเปิดรับบางอย่างใหม่ๆ ให้ความรู้สึก ความผูกพัน หรือความสร้างสรรค์ได้มีพื้นที่ก่อนที่จะรีบวิเคราะห์ทุกอย่าง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What feeling deserves to be felt before it is explained?",
      "th": "ความรู้สึกไหนควรได้ถูกสัมผัสตรงๆ ก่อนจะพยายามอธิบายมัน?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "attraction",
        "partnership"
      ],
      "th": [
        "การตอบรับกัน",
        "ความผูกพัน",
        "ความสัมพันธ์"
      ]
    },
    "upright": {
      "en": "A connection is strongest when effort flows both ways. Notice where respect, attraction, or cooperation is being returned, not merely hoped for.",
      "th": "ความสัมพันธ์ที่ดีมีการตอบรับจากทั้งสองฝ่าย ลองมองว่าตรงไหนมีความเคารพ ความสนใจ หรือความร่วมมือที่ส่งกลับมาหาคุณจริงๆ ไม่ใช่มีอยู่แค่ในความหวัง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where is mutual effort already present?",
      "th": "ตรงไหนที่คุณเห็นความพยายามจากทั้งสองฝ่ายอยู่แล้ว?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "friendship",
        "celebration",
        "community"
      ],
      "th": [
        "มิตรภาพ",
        "การเฉลิมฉลอง",
        "กลุ่มคนที่เกื้อหนุน"
      ]
    },
    "upright": {
      "en": "Joy grows when it is shared. Friendship, laughter, and supportive company may be exactly what helps you feel more like yourself.",
      "th": "ความสุขยิ่งมีความหมายเมื่อได้แบ่งปัน มิตรภาพ เสียงหัวเราะ และการได้อยู่กับคนที่สบายใจอาจช่วยให้คุณกลับมาเป็นตัวเองมากขึ้น"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Who helps you remember that you do not have to carry everything alone?",
      "th": "ใครคือคนที่อยู่ด้วยแล้วทำให้คุณรู้ว่าไม่จำเป็นต้องแบกทุกอย่างคนเดียว?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "apathy",
        "contemplation",
        "missed opportunity"
      ],
      "th": [
        "ความเฉยชา",
        "การทบทวน",
        "โอกาสที่มองข้าม"
      ]
    },
    "upright": {
      "en": "You may be tired of the options in front of you, but shutting down can make you miss what is quietly being offered. Look once more before deciding there is nothing here for you.",
      "th": "คุณอาจเบื่อหรือหมดใจกับสิ่งที่อยู่ตรงหน้า แต่การปิดตัวเองอาจทำให้พลาดบางอย่างที่ยังมีคุณค่า ลองมองอีกครั้งก่อนสรุปว่าไม่มีอะไรเหลือให้เลือก"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What might you be overlooking because you are tired of the situation?",
      "th": "ตอนนี้คุณอาจกำลังมองข้ามอะไร เพราะเหนื่อยกับสถานการณ์เดิม?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "loss",
        "acceptance"
      ],
      "th": [
        "ความเศร้า",
        "การสูญเสีย",
        "การยอมรับ"
      ]
    },
    "upright": {
      "en": "Loss deserves to be felt, but it is not the whole story. Make room for the grief while also noticing what has not been lost.",
      "th": "ความสูญเสียควรได้รับพื้นที่ของมัน แต่ไม่ได้หมายความว่าทุกอย่างหายไปหมด ให้ตัวเองรู้สึกกับสิ่งที่เสียไป พร้อมๆ กับมองสิ่งที่ยังเหลืออยู่"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What is still here, even after something important has gone?",
      "th": "แม้บางสิ่งสำคัญจะหายไป ตอนนี้ยังมีอะไรอยู่กับคุณ?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "nostalgia",
        "innocence",
        "kindness"
      ],
      "th": [
        "ความทรงจำ",
        "ความอ่อนโยน",
        "ความจริงใจ"
      ]
    },
    "upright": {
      "en": "The past may bring comfort, perspective, or a reminder of what once mattered. Receive the warmth without assuming you need to go back.",
      "th": "อดีตอาจพาความอบอุ่น ความทรงจำ หรือบทเรียนบางอย่างกลับมา รับสิ่งดีจากมันได้ โดยไม่จำเป็นต้องย้อนกลับไปใช้ชีวิตแบบเดิม"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can you carry forward from the past without returning to it?",
      "th": "มีอะไรจากอดีตที่คุณเก็บไว้กับตัวได้ โดยไม่ต้องกลับไปอยู่ที่เดิม?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "choices",
        "fantasy",
        "discernment"
      ],
      "th": [
        "ทางเลือก",
        "ภาพฝัน",
        "การพิจารณา"
      ]
    },
    "upright": {
      "en": "Too many possibilities can make it harder to choose. Bring the options back to reality by asking what is workable, meaningful, and actually available.",
      "th": "เมื่อมีทางเลือกมากเกินไป ใจก็อาจหลงไปกับภาพที่อยากให้เป็น ลองกลับมาถามว่าอะไรทำได้จริง มีความหมาย และมีอยู่จริงตรงหน้า"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which option still makes sense once the fantasy is stripped away?",
      "th": "เมื่อตัดภาพฝันออกไป ทางเลือกไหนยังสมเหตุสมผลที่สุด?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "leaving",
        "searching",
        "emotional truth"
      ],
      "th": [
        "การเดินจาก",
        "การค้นหา",
        "ความจริงทางใจ"
      ]
    },
    "upright": {
      "en": "Something may no longer have enough life in it to keep you there. Walking away can be an honest choice when staying only prolongs emptiness.",
      "th": "บางสิ่งอาจไม่มีอะไรให้คุณต่ออีกแล้ว การเดินออกมาไม่ได้แปลว่าแพ้เสมอไป บางครั้งมันคือการซื่อตรงกับความจริงว่าอยู่ต่อก็มีแต่ความว่างเปล่า"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What are you ready to leave because it no longer gives you what you need?",
      "th": "คุณพร้อมเดินออกจากอะไร เพราะมันไม่ตอบสิ่งที่คุณต้องการอีกแล้ว?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "contentment",
        "pleasure",
        "gratitude"
      ],
      "th": [
        "ความพอใจ",
        "ความสุข",
        "ความขอบคุณ"
      ]
    },
    "upright": {
      "en": "There is something worth enjoying here. Let satisfaction be enough for a moment without turning it into complacency or immediately wanting more.",
      "th": "ตอนนี้มีบางอย่างที่ควรได้ชื่นชมและมีความสุขกับมัน ปล่อยให้ความพอใจมีที่อยู่สักพัก โดยไม่รีบอยากได้สิ่งถัดไปหรือปล่อยตัวจนหยุดเติบโต"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can you enjoy fully without asking for the next thing yet?",
      "th": "อะไรที่คุณมีความสุขกับมันได้เต็มที่ โดยยังไม่ต้องรีบมองหาสิ่งต่อไป?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "harmony",
        "family",
        "belonging"
      ],
      "th": [
        "ความกลมกลืน",
        "ครอบครัว",
        "ความเป็นส่วนหนึ่ง"
      ]
    },
    "upright": {
      "en": "A rich emotional life is built with people, trust, and shared values. Notice the relationships that make you feel safe enough to belong.",
      "th": "ความสุขทางใจไม่ได้เกิดจากเราเพียงคนเดียว มันเติบโตจากคน ความไว้ใจ และคุณค่าที่มีร่วมกัน ลองมองความสัมพันธ์ที่ทำให้คุณรู้สึกว่าได้เป็นส่วนหนึ่งจริงๆ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which relationship deserves a sincere thank-you today?",
      "th": "วันนี้มีความสัมพันธ์ไหนที่คุณอยากขอบคุณอย่างจริงใจ?"
    },
    "contentVersion": "daily-guidance-v2"
  },
  {
    "id": "46",
    "index": 46,
    "title": {
      "en": "Page of Cups",
      "th": "เด็กถือถ้วย"
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
        "intuition",
        "surprise"
      ],
      "th": [
        "ความอ่อนไหว",
        "สัญชาตญาณ",
        "สิ่งใหม่ที่เข้ามา"
      ]
    },
    "upright": {
      "en": "A subtle feeling, invitation, or creative idea may be worth taking seriously. Stay open and curious without believing everything at first glance.",
      "th": "ความรู้สึกเล็กๆ คำชวน หรือไอเดียสร้างสรรค์บางอย่างอาจน่าสนใจกว่าที่ดู เปิดใจสำรวจได้ โดยยังไม่ต้องเชื่อทุกอย่างทันที"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What quiet signal are you curious enough to explore?",
      "th": "มีสัญญาณเล็กๆ อะไรที่คุณอยากลองตามดูต่อ?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "romance",
        "idealism",
        "sincerity"
      ],
      "th": [
        "ความโรแมนติก",
        "อุดมคติ",
        "ความจริงใจ"
      ]
    },
    "upright": {
      "en": "Let your heart lead, but keep your feet on the ground. A sincere feeling becomes stronger when your actions are willing to follow it.",
      "th": "ให้หัวใจมีส่วนในการนำทางได้ แต่ยังต้องอยู่กับความจริง ความรู้สึกที่จริงใจจะมีน้ำหนักมากขึ้นเมื่อการกระทำของคุณพร้อมเดินตามไปด้วย"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What promise is worth making only if you are ready to keep it?",
      "th": "มีคำสัญญาอะไรที่ควรพูดก็ต่อเมื่อคุณพร้อมทำให้เกิดขึ้นจริง?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "intuition",
        "emotional boundaries"
      ],
      "th": [
        "ความเข้าอกเข้าใจ",
        "สัญชาตญาณ",
        "ขอบเขตทางอารมณ์"
      ]
    },
    "upright": {
      "en": "Sensitivity is a strength when it has boundaries. Listen deeply and care fully without making every feeling around you your responsibility.",
      "th": "ความอ่อนไหวเป็นพลังได้เมื่อมีขอบเขต ฟังและใส่ใจคนอื่นได้เต็มที่ โดยไม่ต้องรับทุกความรู้สึกรอบตัวมาเป็นหน้าที่ของคุณ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "How can you care without losing your own center?",
      "th": "คุณจะใส่ใจคนอื่นโดยยังรักษาศูนย์กลางของตัวเองไว้ได้อย่างไร?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "compassion",
        "composure"
      ],
      "th": [
        "วุฒิภาวะทางอารมณ์",
        "ความเมตตา",
        "ความสุขุม"
      ]
    },
    "upright": {
      "en": "Emotional maturity does not mean feeling less. Stay warm, steady, and thoughtful even when the people around you are reacting strongly.",
      "th": "ความมั่นคงทางอารมณ์ไม่ได้แปลว่าไม่รู้สึก แต่คือการยังคงความอบอุ่น ความสุขุม และการคิดให้รอบคอบ แม้คนรอบตัวจะมีอารมณ์แรง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What response would be both compassionate and steady?",
      "th": "คุณจะตอบเรื่องนี้อย่างไรให้ทั้งเมตตาและมั่นคง?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "breakthrough",
        "truth"
      ],
      "th": [
        "ความชัดเจน",
        "การมองทะลุ",
        "ความจริง"
      ]
    },
    "upright": {
      "en": "A clear truth can cut through a lot of confusion. Name the real issue first, then decide what deserves your attention.",
      "th": "ความจริงที่ชัดเพียงข้อเดียวอาจช่วยตัดความสับสนออกไปได้มาก เริ่มจากเรียกปัญหาหลักให้ตรง แล้วค่อยดูว่าควรทำอะไรต่อ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What is the simplest honest sentence about this situation?",
      "th": "ถ้าต้องพูดความจริงเกี่ยวกับเรื่องนี้ให้เหลือเพียงประโยคเดียว คุณจะพูดว่าอะไร?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "indecision",
        "avoidance",
        "choice"
      ],
      "th": [
        "ความลังเล",
        "การหลีกเลี่ยง",
        "การตัดสินใจ"
      ]
    },
    "upright": {
      "en": "Avoiding the choice may keep things calm for a little longer, but it also keeps you stuck. Gather what matters, then decide when you know enough—not everything.",
      "th": "การยังไม่เลือกอาจทำให้ทุกอย่างสงบอยู่ชั่วคราว แต่ก็ทำให้คุณค้างอยู่ที่เดิม รวบรวมข้อมูลที่สำคัญให้พอ แล้วตัดสินใจโดยไม่ต้องรอให้รู้ทุกอย่าง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What decision are you postponing by saying you need more information?",
      "th": "การตัดสินใจอะไรที่คุณกำลังเลื่อนด้วยเหตุผลว่า “ยังมีข้อมูลไม่พอ”?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "truth",
        "healing"
      ],
      "th": [
        "ความเจ็บปวด",
        "ความจริง",
        "การเยียวยา"
      ]
    },
    "upright": {
      "en": "Some truths hurt, but naming the hurt clearly makes healing possible. You do not have to minimize the disappointment to move through it.",
      "th": "ความจริงบางอย่างเจ็บ แต่การยอมรับว่าเจ็บตรงไหนช่วยให้เริ่มเยียวยาได้ คุณไม่จำเป็นต้องทำให้ความผิดหวังดูเล็กลงเพื่อจะก้าวผ่านมัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What becomes easier when you stop arguing with the fact that this hurt?",
      "th": "อะไรเริ่มเบาลงเมื่อคุณยอมรับตรงๆ ว่าเรื่องนี้ทำให้เจ็บ?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "recovery",
        "reflection"
      ],
      "th": [
        "การพัก",
        "การฟื้นตัว",
        "การทบทวน"
      ]
    },
    "upright": {
      "en": "Your mind may need rest more than another answer. A deliberate pause can be productive when it gives your clarity time to return.",
      "th": "ตอนนี้ใจและความคิดอาจต้องการการพักมากกว่าคำตอบใหม่ การหยุดอย่างตั้งใจไม่ใช่เสียเวลา ถ้ามันช่วยให้ความชัดเจนกลับมา"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What can wait while you give yourself enough time to recover?",
      "th": "มีเรื่องอะไรที่รอได้ เพื่อให้คุณได้พักและกลับมาคิดได้ชัดขึ้น?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "conflict",
        "ego",
        "consequences"
      ],
      "th": [
        "ความขัดแย้ง",
        "อัตตา",
        "ผลที่ตามมา"
      ]
    },
    "upright": {
      "en": "Being right can cost more than it is worth. Before you keep fighting, look at what the conflict is doing to everyone involved.",
      "th": "การพิสูจน์ว่าตัวเองถูกอาจมีราคาสูงกว่าที่คิด ก่อนจะสู้ต่อ ลองมองว่าความขัดแย้งนี้กำลังทำอะไรกับคุณและคนที่เกี่ยวข้อง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would you rather protect than prove?",
      "th": "มีอะไรที่คุณอยากรักษาไว้ มากกว่าการพิสูจน์ว่าตัวเองถูก?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "recovery",
        "calmer waters"
      ],
      "th": [
        "การเปลี่ยนผ่าน",
        "การฟื้นตัว",
        "ทางที่สงบขึ้น"
      ]
    },
    "upright": {
      "en": "You can leave a difficult period gradually. Choose the direction that brings more clarity and less unnecessary turmoil, even if it is not comfortable yet.",
      "th": "ช่วงที่หนักไม่จำเป็นต้องจบแบบพลิกทันที คุณค่อยๆ พาตัวเองออกจากมันได้ เลือกทางที่ชัดและสงบขึ้น แม้ตอนนี้ยังไม่คุ้นเคยหรือสบายใจนัก"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What calmer direction is available, even if it still feels unfamiliar?",
      "th": "มีทางไหนที่สงบกว่านี้ให้คุณเลือก แม้มันยังรู้สึกไม่คุ้น?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "discretion",
        "integrity"
      ],
      "th": [
        "กลยุทธ์",
        "ความรอบคอบ",
        "ความซื่อตรง"
      ]
    },
    "upright": {
      "en": "Strategy can be wise, but it still needs integrity. Know what truly calls for discretion and what would cross the line into avoidance or deception.",
      "th": "การวางแผนอย่างมีชั้นเชิงไม่ใช่เรื่องผิด แต่ยังต้องอยู่บนความซื่อตรง แยกให้ชัดว่าอะไรควรเก็บเป็นเรื่องส่วนตัว และอะไรเริ่มกลายเป็นการหลบเลี่ยงหรือปิดบัง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where does being clever still require you to be honest?",
      "th": "ตรงไหนที่การใช้ไหวพริบยังต้องเดินคู่กับความซื่อตรง?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "perspective",
        "agency"
      ],
      "th": [
        "ข้อจำกัด",
        "มุมมอง",
        "ทางเลือกที่ยังมี"
      ]
    },
    "upright": {
      "en": "You may have fewer options than you want, but perhaps more than you think. Test which limits are truly fixed and which ones have simply started to feel permanent.",
      "th": "คุณอาจมีทางเลือกน้อยกว่าที่อยากได้ แต่ก็อาจมากกว่าที่คิด ลองแยกดูว่าข้อจำกัดไหนขยับไม่ได้จริง และข้อไหนเพียงรู้สึกว่าขยับไม่ได้เพราะอยู่กับความคิดนั้นมานาน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which “I can’t” belief deserves to be tested against reality?",
      "th": "ความคิดว่า “ฉันทำไม่ได้” ข้อไหนควรลองทดสอบกับความจริงอีกครั้ง?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "rumination",
        "support"
      ],
      "th": [
        "ความกังวล",
        "ความคิดวน",
        "การขอความช่วยเหลือ"
      ]
    },
    "upright": {
      "en": "Worry grows louder when it stays alone in your head. Bring it into the open with facts, a conversation, some rest, or one practical next step.",
      "th": "ความกังวลมักดังขึ้นเมื่อวนอยู่ในหัวคนเดียว ลองพามันออกมาอยู่กับข้อเท็จจริง การพูดคุย การพัก หรือการลงมือเล็กๆ ที่ทำได้จริง"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which worry becomes easier to handle once you put it into plain words?",
      "th": "ความกังวลไหนจะจัดการง่ายขึ้น ถ้าคุณเขียนหรือพูดมันออกมาตรงๆ?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "surrender",
        "recovery"
      ],
      "th": [
        "จุดจบ",
        "การยอมรับ",
        "การเริ่มฟื้นตัว"
      ]
    },
    "upright": {
      "en": "Something may truly be over. The next question is not how to save it, but how to stop making yourself relive the ending.",
      "th": "บางสิ่งอาจจบลงจริงๆ แล้ว คำถามจากนี้ไม่ใช่ว่าจะรักษามันไว้ได้อย่างไร แต่คือจะหยุดพาตัวเองกลับไปเจ็บกับตอนจบเดิมซ้ำๆ ได้อย่างไร"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What becomes possible once you accept that this chapter is closed?",
      "th": "เมื่อยอมรับว่าบทนี้ปิดแล้ว อะไรใหม่จึงเริ่มเป็นไปได้?"
    },
    "contentVersion": "daily-guidance-v2"
  },
  {
    "id": "60",
    "index": 60,
    "title": {
      "en": "Page of Swords",
      "th": "เด็กถือดาบ"
    },
    "canonicalTitle": "PAGE OF SWORDS",
    "arcana": "minor",
    "number": null,
    "suit": "swords",
    "rank": "page",
    "image": "assets/cards/60_PAGE_OF_SWORDS.png",
    "keywords": {
      "en": [
        "curiosity",
        "inquiry",
        "vigilance"
      ],
      "th": [
        "ความอยากรู้",
        "การตั้งคำถาม",
        "ความระมัดระวัง"
      ]
    },
    "upright": {
      "en": "Curiosity can sharpen your thinking today. Ask better questions, verify what you hear, and do not mistake a fast conclusion for a deep understanding.",
      "th": "ความอยากรู้อยากเห็นช่วยให้คิดได้คมขึ้น ถามให้ดี ตรวจสอบสิ่งที่ได้ยิน และอย่ารีบคิดว่าคำตอบเร็วๆ คือความเข้าใจที่ลึกแล้ว"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What question would improve your next decision?",
      "th": "คำถามอะไรจะช่วยให้การตัดสินใจครั้งต่อไปของคุณดีขึ้น?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "speed",
        "focus"
      ],
      "th": [
        "ความเด็ดขาด",
        "ความรวดเร็ว",
        "ความชัดเจน"
      ]
    },
    "upright": {
      "en": "Speed can break a stalemate, but haste can create new problems. Move decisively once you know what you are aiming at.",
      "th": "ความรวดเร็วช่วยตัดความค้างคาได้ แต่ความรีบก็สร้างปัญหาใหม่ได้ เดินหน้าให้เด็ดขาดเมื่อรู้แล้วว่ากำลังมุ่งไปที่อะไร"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Where do you need decisiveness, and where would one more pause help?",
      "th": "ตรงไหนที่คุณควรตัดสินใจให้ชัด และตรงไหนที่ควรเว้นจังหวะอีกนิด?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "honesty",
        "boundaries"
      ],
      "th": [
        "การพิจารณา",
        "ความตรงไปตรงมา",
        "ขอบเขต"
      ]
    },
    "upright": {
      "en": "Clear boundaries and honest words can be kind when they prevent confusion. Say what is true without using the truth as a weapon.",
      "th": "ขอบเขตที่ชัดและคำพูดตรงไปตรงมาอาจเป็นความเมตตาได้ เมื่อช่วยไม่ให้เรื่องสับสน พูดความจริงให้ชัด โดยไม่ใช้ความจริงเป็นอาวุธทำร้ายกัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What truth can you say clearly without making it hurt more than necessary?",
      "th": "มีความจริงอะไรที่คุณพูดได้ชัดเจน โดยไม่ทำให้เจ็บเกินความจำเป็น?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "principle",
        "judgment"
      ],
      "th": [
        "เหตุผล",
        "หลักการ",
        "การตัดสินใจ"
      ]
    },
    "upright": {
      "en": "Good judgment needs evidence, principles, and consistency. Think clearly, but remember that your decision still affects real people.",
      "th": "การตัดสินใจที่ดีต้องมีทั้งเหตุผล หลักฐาน และหลักการที่สม่ำเสมอ คิดให้ชัดได้เต็มที่ แต่ไม่ลืมว่าผลของการตัดสินใจเกิดขึ้นกับคนจริงๆ"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What decision would still make sense if you set your personal preference aside?",
      "th": "ถ้าพักความชอบส่วนตัวไว้ก่อน การตัดสินใจแบบไหนยังสมเหตุสมผลที่สุด?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "stability",
        "tangible growth"
      ],
      "th": [
        "โอกาส",
        "ความมั่นคง",
        "การเติบโตที่จับต้องได้"
      ]
    },
    "upright": {
      "en": "A practical opportunity is in front of you. Give it a real shape with one concrete action, a clear commitment, or the resources it needs.",
      "th": "มีโอกาสที่จับต้องได้อยู่ตรงหน้า ลองทำให้มันเป็นรูปเป็นร่างด้วยการลงมือจริง จัดเวลา หรือใส่ทรัพยากรที่จำเป็นลงไปอย่างชัดเจน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What small investment could create real value later?",
      "th": "วันนี้คุณลงทุนแรง เวลา หรือทรัพยากรเล็กๆ กับอะไรแล้วอาจเกิดคุณค่าในอนาคต?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "adaptability",
        "priorities",
        "balance"
      ],
      "th": [
        "การปรับตัว",
        "การจัดลำดับ",
        "ความสมดุล"
      ]
    },
    "upright": {
      "en": "You can handle several demands, but not by pretending they all deserve the same priority. Stay flexible with timing and decide what needs attention first.",
      "th": "คุณจัดการหลายเรื่องพร้อมกันได้ แต่ไม่จำเป็นต้องให้ทุกเรื่องสำคัญเท่ากัน ยืดหยุ่นกับเวลา แล้วเลือกให้ชัดว่าอะไรควรมาก่อน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What could be rescheduled instead of squeezed in?",
      "th": "มีอะไรที่เลื่อนไปเวลาอื่นได้ แทนการยัดทุกอย่างไว้ในตารางเดียว?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "collaboration",
        "quality"
      ],
      "th": [
        "ฝีมือ",
        "การร่วมมือ",
        "คุณภาพ"
      ]
    },
    "upright": {
      "en": "Good work gets better through skill, feedback, and collaboration. Let other capable people see enough of the process to help improve it.",
      "th": "งานที่ดีขึ้นได้จากทั้งฝีมือ ข้อเสนอแนะ และการร่วมมือ เปิดพื้นที่ให้คนที่มีความรู้เข้ามาช่วยมอง ช่วยคิด หรือช่วยยกระดับงาน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Whose expertise could make this better?",
      "th": "ความเชี่ยวชาญของใครจะช่วยให้งานนี้ดีขึ้นได้จริง?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "control",
        "attachment"
      ],
      "th": [
        "ความมั่นคง",
        "การควบคุม",
        "ความยึดติด"
      ]
    },
    "upright": {
      "en": "Wanting security is reasonable, but holding on too tightly can become its own trap. Ask whether you are protecting something valuable or simply protecting yourself from uncertainty.",
      "th": "ความอยากมั่นคงเป็นเรื่องธรรมดา แต่การกอดทุกอย่างไว้แน่นเกินไปอาจทำให้คุณติดอยู่กับที่ ลองถามว่ากำลังรักษาสิ่งสำคัญจริงๆ หรือแค่กลัวความไม่แน่นอน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What could you loosen without losing what truly matters?",
      "th": "มีอะไรที่คุณคลายมือได้บ้าง โดยไม่เสียสิ่งที่สำคัญจริงๆ?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "support",
        "resilience"
      ],
      "th": [
        "ความยากลำบาก",
        "ความช่วยเหลือ",
        "การประคองตัว"
      ]
    },
    "upright": {
      "en": "Hardship can make what is missing feel bigger than the help around you. Look for people, practical support, and one need you can deal with today.",
      "th": "ช่วงที่ลำบากอาจทำให้คุณเห็นแต่สิ่งที่ขาด จนมองไม่เห็นความช่วยเหลือที่อยู่ใกล้ๆ วันนี้ลองมองหาคน ทรัพยากร หรือทางออกเล็กๆ ที่ช่วยให้เรื่องหนักเบาลงได้ก่อน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What support could you reach for if you asked plainly?",
      "th": "ตอนนี้มีใครหรืออะไรที่ช่วยคุณได้ แต่คุณยังไม่ได้เอ่ยปากขอ?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "generosity",
        "exchange",
        "fairness"
      ],
      "th": [
        "การให้และรับ",
        "ความเอื้อเฟื้อ",
        "ความเป็นธรรม"
      ]
    },
    "upright": {
      "en": "Giving and receiving both need balance. Notice whether the exchange feels fair to everyone and can continue without creating resentment or too much dependence.",
      "th": "การให้และรับที่ดีต้องรักษาทั้งความสมดุลและศักดิ์ศรี ลองดูว่าความช่วยเหลือนี้เป็นธรรมกับทุกฝ่าย และไปต่อได้โดยไม่ทำให้ใครอึดอัดหรือพึ่งพากันมากเกินไป"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Does this exchange feel fair and sustainable for everyone involved?",
      "th": "การให้และรับครั้งนี้ยุติธรรมและไปต่อได้สำหรับทุกฝ่ายหรือเปล่า?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "patience",
        "assessment",
        "long-term growth"
      ],
      "th": [
        "ความอดทน",
        "การประเมิน",
        "การเติบโตระยะยาว"
      ]
    },
    "upright": {
      "en": "Long-term effort deserves a pause for review. Patience matters, but so does noticing whether your current method is actually moving you toward what you hoped for.",
      "th": "เรื่องที่คุณลงแรงมานานควรมีจังหวะให้หยุดดูผล ความอดทนยังสำคัญ แต่ก็ควรถามว่าวิธีที่ใช้อยู่กำลังพาไปใกล้สิ่งที่ต้องการจริงหรือไม่"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What is genuinely growing, and what only looks busy?",
      "th": "อะไรเติบโตขึ้นจริงๆ และอะไรแค่ทำให้คุณรู้สึกว่ายุ่งอยู่ตลอด?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "practice",
        "mastery",
        "craftsmanship"
      ],
      "th": [
        "การฝึกฝน",
        "ความชำนาญ",
        "ความประณีต"
      ]
    },
    "upright": {
      "en": "Skill grows through careful repetition. Pay attention to the process, make one small improvement, and let practice do the rest over time.",
      "th": "ความชำนาญเกิดจากการฝึกซ้ำอย่างใส่ใจ มองที่กระบวนการ ปรับทีละจุด แล้วปล่อยให้ความสม่ำเสมอค่อยๆ ทำหน้าที่ของมัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "Which part of your craft would benefit from another careful round of practice?",
      "th": "ส่วนไหนของสิ่งที่คุณทำควรได้ฝึกหรือขัดเกลาอีกครั้ง?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "independence",
        "comfort",
        "self-worth"
      ],
      "th": [
        "ความเป็นอิสระ",
        "ความมั่นคง",
        "การเห็นคุณค่าตัวเอง"
      ]
    },
    "upright": {
      "en": "You have earned the right to enjoy what steady effort has built. Independence feels best when it gives you freedom, not distance from everyone else.",
      "th": "ชื่นชมสิ่งที่ความพยายามสม่ำเสมอของคุณสร้างขึ้นได้เต็มที่ ความเป็นอิสระที่ดีควรทำให้ชีวิตมีอิสระมากขึ้น ไม่ใช่ทำให้ต้องตัดตัวเองออกจากทุกคน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What have you built that you can genuinely enjoy now?",
      "th": "ตอนนี้มีอะไรที่คุณสร้างมาด้วยตัวเองและควรได้ชื่นชมอย่างเต็มที่?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "family",
        "long-term security"
      ],
      "th": [
        "รากฐานระยะยาว",
        "ครอบครัว",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Think beyond the quick win. Family, community, shared resources, and the systems you build today can have an impact for years.",
      "th": "มองไกลกว่าผลลัพธ์เฉพาะหน้า รากฐานที่คุณสร้างให้ครอบครัว ชุมชน งาน หรือทรัพยากรในวันนี้อาจมีความหมายไปอีกนาน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What are you building that you want to matter years from now?",
      "th": "คุณกำลังสร้างอะไรที่อยากให้ยังมีคุณค่าในอีกหลายปีข้างหน้า?"
    },
    "contentVersion": "daily-guidance-v2"
  },
  {
    "id": "74",
    "index": 74,
    "title": {
      "en": "Page of Pentacles",
      "th": "เด็กถือเหรียญ"
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
        "opportunity",
        "practical growth"
      ],
      "th": [
        "การเรียนรู้",
        "โอกาส",
        "การเติบโตที่เป็นรูปธรรม"
      ]
    },
    "upright": {
      "en": "A practical opportunity may be worth studying seriously. Start small, learn the details, and give it enough real effort to discover what it could become.",
      "th": "โอกาสหรือทักษะที่จับต้องได้บางอย่างน่าศึกษาให้จริงจัง เริ่มจากพื้นฐาน ทำความเข้าใจรายละเอียด แล้วลงแรงพอให้รู้ว่ามันพัฒนาไปได้ไกลแค่ไหน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What could become valuable if you gave it serious attention now?",
      "th": "อะไรอาจมีคุณค่ามากขึ้น ถ้าคุณเริ่มเรียนรู้มันอย่างจริงจังตั้งแต่ตอนนี้?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "patience",
        "reliability"
      ],
      "th": [
        "ความสม่ำเสมอ",
        "ความอดทน",
        "ความน่าเชื่อถือ"
      ]
    },
    "upright": {
      "en": "Steady progress rarely looks dramatic. Choose a pace you can sustain and let reliability build results over time.",
      "th": "ความก้าวหน้าที่มั่นคงไม่จำเป็นต้องหวือหวา เลือกจังหวะที่ทำต่อได้จริง แล้วให้ความสม่ำเสมอค่อยๆ สร้างผลลัพธ์ของมัน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What routine would make your progress easier to trust?",
      "th": "กิจวัตรแบบไหนจะทำให้คุณเชื่อใจความก้าวหน้าของตัวเองได้มากขึ้น?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "practical care",
        "abundance",
        "stability"
      ],
      "th": [
        "การดูแลที่จับต้องได้",
        "ความอุดมสมบูรณ์",
        "ความมั่นคง"
      ]
    },
    "upright": {
      "en": "Care is most powerful when it becomes practical. Look after your body, home, money, work, and people in ways you can sustain.",
      "th": "การดูแลที่มีพลังคือการดูแลที่เกิดขึ้นจริง ใส่ใจกาย บ้าน เงิน งาน หรือคนที่สำคัญด้วยวิธีที่ทำต่อเนื่องได้ ไม่ใช่แค่ตั้งใจไว้"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What practical act of care would make today noticeably better?",
      "th": "วันนี้คุณลงมือดูแลอะไรสักอย่างแล้วจะทำให้ชีวิตดีขึ้นอย่างเห็นได้ชัด?"
    },
    "contentVersion": "daily-guidance-v2"
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
        "prosperity",
        "responsibility"
      ],
      "th": [
        "การบริหารจัดการ",
        "ความมั่งคั่ง",
        "ความรับผิดชอบ"
      ]
    },
    "upright": {
      "en": "Resources become meaningful when they are managed well. Think in terms of patience, competence, and long-term responsibility rather than appearance or status.",
      "th": "ทรัพยากรจะมีคุณค่ามากขึ้นเมื่อถูกดูแลอย่างดี ใช้ความอดทน ความสามารถ และความรับผิดชอบระยะยาวเป็นหลัก มากกว่าการพยายามให้คนอื่นเห็นว่าคุณมีมากแค่ไหน"
    },
    "reversed": {
      "en": null,
      "th": null
    },
    "reflection": {
      "en": "What would prosperity look like if it were built to last?",
      "th": "ความมั่งคั่งที่ยั่งยืนและไม่ต้องมีไว้เพื่อโชว์ จะมีหน้าตาอย่างไรสำหรับคุณ?"
    },
    "contentVersion": "daily-guidance-v2"
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

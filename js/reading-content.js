(() => {
  'use strict';

  const CONTENT_VERSION = 'daily-guidance-v3';
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Treat work as an experiment today. One useful step will teach you more than waiting for a perfect plan.",
        "th": "เรื่องงานวันนี้ลองมองเป็นการทดลอง ก้าวที่ใช้ได้จริงเพียงหนึ่งก้าวอาจให้คำตอบมากกว่าการรอแผนที่สมบูรณ์แบบ"
      },
      "moneyResources": {
        "en": "Keep money decisions light and flexible while you learn what this new direction actually needs.",
        "th": "เรื่องเงินอย่าเพิ่งผูกมัดตัวเองมากเกินไป เว้นพื้นที่ให้ปรับได้ระหว่างที่ยังเรียนรู้ว่าทางใหม่นี้ต้องใช้อะไรจริงๆ"
      },
      "loveRelationships": {
        "en": "Let a relationship breathe. A fresh response may work better than repeating an old script.",
        "th": "ความสัมพันธ์วันนี้อาจดีขึ้นเมื่อเปิดพื้นที่ให้กัน ลองตอบสนองแบบใหม่แทนการวนกลับไปใช้รูปแบบเดิม"
      },
      "innerBalance": {
        "en": "Curiosity will help more than self-judgment. You do not need to know everything before you begin.",
        "th": "ความอยากรู้อยากลองจะช่วยได้มากกว่าการตัดสินตัวเอง คุณไม่จำเป็นต้องรู้ทุกอย่างก่อนเริ่ม"
      },
      "opportunitiesWatchouts": {
        "en": "A new opening may be worth exploring, but you only need to commit to the next honest step.",
        "th": "มีบางอย่างใหม่ที่น่าลองสำรวจ แต่ยังไม่ต้องรับปากกับอนาคตทั้งหมด แค่เลือกก้าวถัดไปที่ตรงกับตัวเอง"
      },
      "guidanceToday": {
        "en": "Try one thing, notice what happens, then adjust from there.",
        "th": "ลองทำหนึ่งอย่าง ดูผลที่เกิดขึ้น แล้วค่อยปรับทางต่อจากตรงนั้น"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Use the skills and tools already in your hands before looking for something more impressive.",
        "th": "เรื่องงานให้เริ่มจากทักษะและเครื่องมือที่มีอยู่แล้วก่อน ยังไม่จำเป็นต้องหาอะไรใหม่ให้ซับซ้อนขึ้น"
      },
      "moneyResources": {
        "en": "Look at what you can actively manage today: income, spending, time, or another resource already under your control.",
        "th": "เรื่องเงินให้มองสิ่งที่จัดการได้จริงวันนี้ ไม่ว่าจะเป็นรายรับ รายจ่าย เวลา หรือทรัพยากรที่อยู่ในมือ"
      },
      "loveRelationships": {
        "en": "Be clear about what you want to build with someone, then let your actions match that intention.",
        "th": "ความสัมพันธ์จะชัดขึ้นเมื่อรู้ว่าคุณอยากสร้างอะไรกับอีกฝ่าย แล้วทำให้การกระทำสอดคล้องกับความตั้งใจนั้น"
      },
      "innerBalance": {
        "en": "Your confidence grows when attention and ability move in the same direction.",
        "th": "ความมั่นใจจะมั่นคงขึ้นเมื่อความสนใจ ความตั้งใจ และความสามารถของคุณไปในทิศเดียวกัน"
      },
      "opportunitiesWatchouts": {
        "en": "The opportunity is not only outside you. Something you already know or can do may be the key.",
        "th": "โอกาสอาจไม่ได้อยู่ไกล สิ่งที่คุณรู้อยู่แล้วหรือทำได้อยู่แล้วอาจเป็นกุญแจสำคัญ"
      },
      "guidanceToday": {
        "en": "Choose one intention and give it real action today.",
        "th": "เลือกหนึ่งเรื่องที่ตั้งใจไว้ แล้วทำให้มันเกิดขึ้นจริงสักหนึ่งขั้น"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Do not force an answer at work before the picture is clear. Observe what is not being said as carefully as what is.",
        "th": "เรื่องงานยังไม่ต้องรีบสรุปก่อนภาพจะชัด ลองสังเกตทั้งสิ่งที่ถูกพูดออกมาและสิ่งที่ยังไม่มีใครพูด"
      },
      "moneyResources": {
        "en": "With money, pause before acting on a feeling alone. Let intuition point the question, then check the facts.",
        "th": "เรื่องเงินให้ใช้ความรู้สึกเป็นตัวตั้งคำถามได้ แต่ก่อนตัดสินใจควรกลับมาเช็กข้อเท็จจริงให้ครบ"
      },
      "loveRelationships": {
        "en": "Give subtle feelings time to become clearer. Not every connection needs an immediate label or answer.",
        "th": "ความรู้สึกบางอย่างต้องการเวลาให้ชัดขึ้น ความสัมพันธ์ไม่จำเป็นต้องมีคำตอบหรือสถานะทันทีเสมอไป"
      },
      "innerBalance": {
        "en": "Quiet is useful today. Notice what you know before other people’s opinions become louder than your own.",
        "th": "ความเงียบมีประโยชน์วันนี้ ลองฟังสิ่งที่ตัวเองรู้สึกก่อนเสียงของคนอื่นจะดังกลบมัน"
      },
      "opportunitiesWatchouts": {
        "en": "An important clue may be easy to miss if you rush. Watch for patterns, timing, and small signals.",
        "th": "โอกาสหรือเบาะแสบางอย่างอาจเล็กจนมองข้ามได้ถ้ารีบเกินไป สังเกตรูปแบบ จังหวะ และสัญญาณเล็กๆ ให้ดี"
      },
      "guidanceToday": {
        "en": "Wait long enough to hear yourself, then act on what remains true.",
        "th": "เว้นจังหวะให้ได้ยินตัวเองก่อน แล้วค่อยลงมือกับสิ่งที่ยังรู้สึกว่าจริง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Give steady care to the project or responsibility you want to see grow. Attention matters more than pressure.",
        "th": "เรื่องงานให้ดูแลสิ่งที่อยากเห็นเติบโตอย่างสม่ำเสมอ ความใส่ใจอาจได้ผลมากกว่าการเร่ง"
      },
      "moneyResources": {
        "en": "Support what is genuinely nourishing and sustainable. Spending that improves everyday life can matter more than appearances.",
        "th": "เรื่องเงินให้ความสำคัญกับสิ่งที่ช่วยให้ชีวิตดีขึ้นและดูแลต่อเนื่องได้ มากกว่าการใช้เพื่อภาพลักษณ์"
      },
      "loveRelationships": {
        "en": "Warmth matters today. Show care in a way the other person can actually feel, not only in your intention.",
        "th": "ความสัมพันธ์วันนี้ต้องการความอบอุ่น แสดงความใส่ใจในแบบที่อีกฝ่ายรับรู้ได้จริง ไม่ใช่แค่รู้สึกอยู่ในใจ"
      },
      "innerBalance": {
        "en": "Your own needs deserve care too. Rest, food, beauty, creativity, and comfort are not wasted time.",
        "th": "ความต้องการของคุณเองก็ควรได้รับการดูแล การพัก อาหาร ความสวยงาม ความสร้างสรรค์ และความสบายไม่ใช่เวลาที่สูญเปล่า"
      },
      "opportunitiesWatchouts": {
        "en": "Something can grow if you give it enough room, time, and practical support.",
        "th": "มีบางอย่างพร้อมเติบโต ถ้าคุณให้ทั้งพื้นที่ เวลา และการสนับสนุนที่จับต้องได้"
      },
      "guidanceToday": {
        "en": "Nurture what you want more of instead of only fighting what you want less of.",
        "th": "ดูแลสิ่งที่อยากให้เพิ่มขึ้นในชีวิต แทนการใช้แรงทั้งหมดไปกับสิ่งที่อยากให้หายไป"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Work improves with clearer roles, priorities, and boundaries. Decide who owns what before pushing harder.",
        "th": "เรื่องงานจะง่ายขึ้นเมื่อบทบาท ลำดับความสำคัญ และขอบเขตชัด ลองตกลงให้รู้ว่าใครรับผิดชอบอะไร"
      },
      "moneyResources": {
        "en": "Give money a structure today: a limit, a plan, or a clear purpose for what you are keeping and using.",
        "th": "เรื่องเงินควรมีโครงสร้างที่ชัดขึ้น ไม่ว่าจะเป็นวงเงิน แผน หรือเหตุผลว่าทำไมจึงเก็บและใช้แบบนี้"
      },
      "loveRelationships": {
        "en": "A healthy relationship needs warmth and boundaries at the same time. Being clear can be a form of care.",
        "th": "ความสัมพันธ์ที่ดีต้องมีทั้งความอบอุ่นและขอบเขต ความชัดเจนก็เป็นรูปแบบหนึ่งของการดูแลกัน"
      },
      "innerBalance": {
        "en": "You may feel steadier once you stop renegotiating the same boundary with yourself.",
        "th": "ใจอาจนิ่งขึ้นเมื่อหยุดต่อรองกับขอบเขตเดิมของตัวเองซ้ำๆ แล้วเลือกยืนอยู่กับสิ่งที่รู้ว่าจำเป็น"
      },
      "opportunitiesWatchouts": {
        "en": "A situation may improve simply because someone is willing to organize it and take responsibility.",
        "th": "บางสถานการณ์อาจดีขึ้นทันทีเมื่อมีคนจัดระบบและรับผิดชอบอย่างจริงจัง"
      },
      "guidanceToday": {
        "en": "Create enough structure for the day to support you, not control you.",
        "th": "วางโครงของวันนี้ให้ชัดพอที่จะช่วยพยุงคุณ ไม่ใช่ควบคุมทุกอย่างจนหายใจไม่ออก"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Use a proven method, trusted mentor, or shared standard instead of reinventing the whole process today.",
        "th": "เรื่องงานวันนี้อาจง่ายขึ้นเมื่อใช้วิธีที่พิสูจน์แล้ว ขอคำแนะนำจากคนที่ไว้ใจได้ หรือยึดมาตรฐานร่วมที่ชัด"
      },
      "moneyResources": {
        "en": "With money, established rules and boring basics may serve you better than a clever shortcut.",
        "th": "เรื่องเงิน หลักพื้นฐานที่ชัดและทำซ้ำได้อาจมีประโยชน์กว่าทางลัดที่ดูฉลาดแต่ยังไม่แน่นอน"
      },
      "loveRelationships": {
        "en": "Talk about values, expectations, and what commitment means to each of you instead of assuming you agree.",
        "th": "ความสัมพันธ์ควรคุยกันเรื่องคุณค่า ความคาดหวัง และความหมายของคำว่าผูกพัน แทนการคิดว่าอีกฝ่ายเข้าใจเหมือนกัน"
      },
      "innerBalance": {
        "en": "A familiar practice or routine can give your mind something steady to return to.",
        "th": "กิจวัตรหรือแนวปฏิบัติที่คุ้นเคยอาจช่วยให้ใจมีหลักกลับมาเกาะเมื่อเรื่องรอบตัวไม่นิ่ง"
      },
      "opportunitiesWatchouts": {
        "en": "Good guidance may already exist. The key is choosing what genuinely fits rather than following blindly.",
        "th": "คำแนะนำดีๆ อาจมีอยู่แล้ว สิ่งสำคัญคือเลือกสิ่งที่เข้ากับคุณจริง ไม่ใช่ทำตามเพียงเพราะเคยทำกันมา"
      },
      "guidanceToday": {
        "en": "Learn from what has worked before, then keep only what still makes sense for you.",
        "th": "เรียนรู้จากสิ่งที่เคยใช้ได้ผล แล้วเก็บไว้เฉพาะส่วนที่ยังเหมาะกับคุณในวันนี้"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Choose the work direction that matches your values, not only the option that looks best from the outside.",
        "th": "เรื่องงานให้เลือกทางที่ตรงกับคุณค่าของตัวเอง ไม่ใช่แค่ทางที่ดูดีที่สุดในสายตาคนอื่น"
      },
      "moneyResources": {
        "en": "A money choice may be easier when you ask what you are really trying to protect or build.",
        "th": "เรื่องเงินจะตัดสินใจง่ายขึ้นเมื่อรู้ว่าจริงๆ แล้วคุณกำลังพยายามปกป้องหรือสร้างอะไร"
      },
      "loveRelationships": {
        "en": "Honesty matters more than perfect harmony. Say what you genuinely want from the relationship and listen for the same in return.",
        "th": "ความสัมพันธ์วันนี้ต้องการความซื่อตรงมากกว่าความราบรื่นแบบฝืนๆ บอกสิ่งที่ต้องการจริง และฟังอีกฝ่ายให้เท่ากัน"
      },
      "innerBalance": {
        "en": "Inner conflict eases when your feelings, values, and actions stop pulling in different directions.",
        "th": "ความลังเลภายในจะเบาลงเมื่อความรู้สึก คุณค่า และการกระทำของคุณไม่ดึงกันคนละทาง"
      },
      "opportunitiesWatchouts": {
        "en": "The strongest opportunity is the one you can choose wholeheartedly rather than half-committing to several paths.",
        "th": "โอกาสที่มีพลังที่สุดคือทางที่คุณเลือกได้เต็มใจ มากกว่าการแบ่งใจไว้กับหลายทางพร้อมกัน"
      },
      "guidanceToday": {
        "en": "Make the choice you can respect yourself for later.",
        "th": "เลือกแบบที่เมื่อมองย้อนกลับมาแล้วคุณยังเคารพตัวเองได้"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Pick the main objective and direct your energy there. Too many competing priorities will slow real progress.",
        "th": "เรื่องงานให้เลือกเป้าหมายหลักแล้วส่งแรงไปทางนั้น การให้ทุกเรื่องสำคัญพร้อมกันจะทำให้เดินช้าลง"
      },
      "moneyResources": {
        "en": "With money, decide the destination before making moves. A clear goal makes trade-offs easier.",
        "th": "เรื่องเงินควรรู้ก่อนว่ากำลังพยายามไปถึงจุดไหน พอเป้าหมายชัด การเลือกว่าจะเอาหรือไม่เอาอะไรจะง่ายขึ้น"
      },
      "loveRelationships": {
        "en": "A relationship needs a shared direction as much as strong feelings. Notice whether both of you are actually moving the same way.",
        "th": "ความสัมพันธ์ไม่ได้ต้องการแค่ความรู้สึกแรง แต่ต้องมีทิศทางร่วมด้วย ลองดูว่าทั้งสองคนกำลังเดินไปทางเดียวกันจริงหรือไม่"
      },
      "innerBalance": {
        "en": "You have more momentum when you stop arguing with yourself about every step.",
        "th": "ใจจะมีแรงมากขึ้นเมื่อหยุดถกเถียงกับตัวเองทุกก้าว แล้วให้โอกาสการตัดสินใจที่ชัดได้พาไปต่อ"
      },
      "opportunitiesWatchouts": {
        "en": "Momentum is available, but it will be wasted if you split your attention too widely.",
        "th": "วันนี้มีแรงส่งอยู่ แต่จะเสียเปล่าถ้ากระจายความสนใจไปกว้างเกินไป"
      },
      "guidanceToday": {
        "en": "Choose the direction first. Speed matters only after that.",
        "th": "เลือกทิศให้ชัดก่อน แล้วค่อยใช้ความเร็ว"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Handle pressure with steadiness rather than force. A calm response can carry more authority than pushing harder.",
        "th": "เรื่องงานให้รับมือแรงกดดันด้วยความนิ่งมากกว่าการฝืน การตอบสนองอย่างสุขุมอาจมีน้ำหนักกว่าการเร่ง"
      },
      "moneyResources": {
        "en": "Do not let fear or impulse make the money decision for you. Slow enough to choose from a steadier place.",
        "th": "เรื่องเงินอย่าให้ความกลัวหรืออารมณ์ชั่ววูบเป็นคนตัดสิน ช้าลงพอให้เลือกจากใจที่มั่นคงกว่าเดิม"
      },
      "loveRelationships": {
        "en": "Gentleness and clear boundaries can exist together. You do not have to dominate or surrender to stay connected.",
        "th": "ความอ่อนโยนกับขอบเขตชัดเจนอยู่ด้วยกันได้ คุณไม่จำเป็นต้องชนะหรือยอมทั้งหมดเพื่อรักษาความสัมพันธ์"
      },
      "innerBalance": {
        "en": "Strength today looks like staying with a difficult feeling without letting it control your next move.",
        "th": "ความเข้มแข็งวันนี้คืออยู่กับความรู้สึกที่ยากได้ โดยไม่ปล่อยให้มันกำหนดก้าวถัดไปทั้งหมด"
      },
      "opportunitiesWatchouts": {
        "en": "A tense situation may open when you bring patience and courage instead of more pressure.",
        "th": "สถานการณ์ตึงๆ อาจคลี่คลายได้เมื่อคุณเพิ่มความอดทนและความกล้า แทนการเพิ่มแรงกดดัน"
      },
      "guidanceToday": {
        "en": "Be firm without becoming hard.",
        "th": "ยืนหยัดได้โดยไม่ต้องแข็งกระด้าง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Step back long enough to see whether your work still reflects what you actually want to build.",
        "th": "เรื่องงานลองถอยออกมาดูสักระยะ ว่าสิ่งที่ทำอยู่ยังตรงกับสิ่งที่คุณอยากสร้างจริงหรือไม่"
      },
      "moneyResources": {
        "en": "A quiet review of your spending, priorities, or long-term needs may be more useful than a quick financial move.",
        "th": "เรื่องเงิน การทบทวนรายจ่าย ลำดับความสำคัญ หรือความต้องการระยะยาวแบบเงียบๆ อาจมีประโยชน์กว่าการรีบขยับ"
      },
      "loveRelationships": {
        "en": "A little space can clarify what you truly feel about someone without other people’s opinions filling the silence.",
        "th": "ระยะห่างเล็กน้อยอาจช่วยให้รู้ว่าคุณรู้สึกกับอีกฝ่ายอย่างไรจริงๆ โดยไม่ให้เสียงของคนอื่นเข้ามาเติมคำตอบ"
      },
      "innerBalance": {
        "en": "Solitude is useful when it helps you hear yourself, not when it becomes a way to disappear from what matters.",
        "th": "การอยู่กับตัวเองมีประโยชน์เมื่อช่วยให้ได้ยินใจ ไม่ใช่เมื่อกลายเป็นวิธีหายออกจากสิ่งที่สำคัญ"
      },
      "opportunitiesWatchouts": {
        "en": "The useful insight may come from reflection rather than more input.",
        "th": "สิ่งที่ช่วยเปิดทางวันนี้อาจมาจากการทบทวน มากกว่าการรับข้อมูลเพิ่ม"
      },
      "guidanceToday": {
        "en": "Make room to hear your own answer before asking for another one.",
        "th": "เว้นพื้นที่ให้ได้ยินคำตอบของตัวเองก่อนจะไปถามหาคำตอบเพิ่ม"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Work conditions may be shifting. Stay alert enough to use the change instead of trying to freeze the old arrangement.",
        "th": "เรื่องงานอาจกำลังเปลี่ยนจังหวะ สังเกตให้ทันแล้วใช้การเปลี่ยนแปลงนั้น แทนการพยายามตรึงรูปแบบเดิมไว้"
      },
      "moneyResources": {
        "en": "Money can move in cycles too. Keep enough flexibility that one change does not force a panicked decision.",
        "th": "เรื่องเงินก็มีขึ้นลงเป็นรอบ ควรเหลือความยืดหยุ่นไว้พอ เพื่อไม่ให้การเปลี่ยนเพียงครั้งเดียวบังคับให้ตัดสินใจด้วยความตื่นตระหนก"
      },
      "loveRelationships": {
        "en": "A relationship may be entering a new phase. Respond to what is actually changing instead of comparing everything with the past.",
        "th": "ความสัมพันธ์อาจกำลังเข้าสู่ช่วงใหม่ ลองตอบสนองกับสิ่งที่กำลังเปลี่ยนจริง แทนการเทียบทุกอย่างกับอดีต"
      },
      "innerBalance": {
        "en": "You do not need to control the whole cycle. Focus on how well you adapt to the part that is moving now.",
        "th": "คุณไม่จำเป็นต้องควบคุมทั้งวงจร ให้ความสำคัญกับการปรับตัวต่อส่วนที่กำลังเปลี่ยนอยู่ตอนนี้"
      },
      "opportunitiesWatchouts": {
        "en": "Timing can create an opening that effort alone could not. Stay ready rather than rigid.",
        "th": "จังหวะที่เหมาะอาจเปิดทางที่แรงพยายามอย่างเดียวเปิดไม่ได้ เตรียมตัวไว้มากกว่ายึดรูปแบบตายตัว"
      },
      "guidanceToday": {
        "en": "Notice what is changing and move with it deliberately.",
        "th": "สังเกตสิ่งที่กำลังเปลี่ยน แล้วขยับตามอย่างมีสติ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Base work decisions on facts, agreed standards, and consequences rather than who speaks the loudest.",
        "th": "เรื่องงานให้ตัดสินจากข้อเท็จจริง มาตรฐานที่ตกลงกัน และผลที่ตามมา มากกว่าเสียงของคนที่ดังที่สุด"
      },
      "moneyResources": {
        "en": "Review the numbers honestly. A fair money choice should still make sense after the emotion settles.",
        "th": "เรื่องเงินให้กลับมาดูตัวเลขตรงๆ การตัดสินใจที่เป็นธรรมควรยังสมเหตุสมผลเมื่ออารมณ์สงบลง"
      },
      "loveRelationships": {
        "en": "Fairness in a relationship includes your needs and the other person’s. Avoid keeping score while still naming what feels unequal.",
        "th": "ความเป็นธรรมในความสัมพันธ์ต้องนับทั้งความต้องการของคุณและอีกฝ่าย ไม่ต้องจดแต้ม แต่ควรพูดเมื่ออะไรไม่สมดุล"
      },
      "innerBalance": {
        "en": "Clarity comes from owning your part without taking responsibility for everything.",
        "th": "ใจจะชัดขึ้นเมื่อยอมรับส่วนของตัวเอง โดยไม่แบกรับทุกอย่างแทนทุกคน"
      },
      "opportunitiesWatchouts": {
        "en": "A clean decision may become possible once the facts and consequences are laid out plainly.",
        "th": "ทางเลือกที่ชัดอาจปรากฏขึ้นเมื่อวางข้อเท็จจริงและผลตามมาไว้ตรงหน้าอย่างไม่เข้าข้างตัวเอง"
      },
      "guidanceToday": {
        "en": "Be fair, be specific, and let the facts carry their weight.",
        "th": "ยุติธรรมให้พอ เจาะจงให้ชัด แล้วให้ข้อเท็จจริงทำหน้าที่ของมัน"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "If work is stuck, stop adding force. A different sequence, viewpoint, or pause may reveal the missing option.",
        "th": "ถ้างานค้าง อย่าเพิ่มแรงอย่างเดียว ลองเปลี่ยนลำดับ มุมมอง หรือหยุดสักครู่เพื่อดูว่ามีทางไหนที่มองข้ามไป"
      },
      "moneyResources": {
        "en": "Delay a money move if you are only acting to escape discomfort. More perspective may be worth more than speed.",
        "th": "เรื่องเงินควรชะลอถ้ากำลังตัดสินใจเพียงเพื่อหนีความไม่สบายใจ มุมมองที่กว้างขึ้นอาจมีค่ากว่าความเร็ว"
      },
      "loveRelationships": {
        "en": "You may understand the relationship better by loosening the need to make it resolve immediately.",
        "th": "ความสัมพันธ์อาจชัดขึ้นเมื่อคลายความต้องการให้ทุกอย่างต้องมีข้อสรุปทันที"
      },
      "innerBalance": {
        "en": "Stillness is not failure today. It can give your mind time to see what pushing has hidden.",
        "th": "ความนิ่งไม่ใช่ความล้มเหลววันนี้ มันอาจให้เวลาใจเห็นสิ่งที่การฝืนบดบังไว้"
      },
      "opportunitiesWatchouts": {
        "en": "An unusual angle may be the real opportunity. Look at what changes when you stop assuming the old frame is correct.",
        "th": "โอกาสอาจอยู่ในมุมที่ไม่คุ้น ลองดูว่าอะไรเปลี่ยนเมื่อหยุดสมมติว่ากรอบเดิมต้องถูกเสมอ"
      },
      "guidanceToday": {
        "en": "Pause before you push. The better move may look different from the obvious one.",
        "th": "หยุดก่อนฝืน ก้าวที่ดีกว่าอาจไม่ได้หน้าตาเหมือนทางที่ชัดที่สุด"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Let an outdated role, process, or goal end if it no longer serves the work. Space is part of rebuilding.",
        "th": "เรื่องงานบางบทอาจควรจบ ถ้าบทบาท วิธี หรือเป้าหมายนั้นไม่ตอบโจทย์แล้ว การมีพื้นที่ว่างเป็นส่วนหนึ่งของการสร้างใหม่"
      },
      "moneyResources": {
        "en": "A financial habit or commitment may need a clean ending before a healthier pattern can begin.",
        "th": "เรื่องเงินอาจต้องปิดนิสัยหรือภาระบางอย่างให้ชัด ก่อนรูปแบบที่ดีต่อคุณมากกว่าจะเริ่มได้"
      },
      "loveRelationships": {
        "en": "Do not keep a relationship in its old form only because change is painful. Ask what needs to end and what may still continue differently.",
        "th": "อย่ารักษาความสัมพันธ์ไว้ในรูปแบบเดิมเพียงเพราะการเปลี่ยนแปลงเจ็บ ลองถามว่าอะไรควรจบ และอะไรยังไปต่อในรูปแบบใหม่ได้"
      },
      "innerBalance": {
        "en": "Grief and relief can exist together when something is truly ending.",
        "th": "เมื่อบางสิ่งจบจริง ความเศร้ากับความโล่งใจอาจเกิดพร้อมกันได้"
      },
      "opportunitiesWatchouts": {
        "en": "The opening comes after you stop using energy to revive what has already completed its role.",
        "th": "โอกาสใหม่จะเห็นชัดขึ้นเมื่อหยุดใช้แรงไปกับการชุบสิ่งที่หมดหน้าที่ของมันแล้ว"
      },
      "guidanceToday": {
        "en": "End what is complete, then protect the space before filling it again.",
        "th": "ปิดสิ่งที่จบแล้วให้เรียบร้อย แล้วรักษาพื้นที่ว่างไว้สักพักก่อนรีบเติมสิ่งใหม่"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Adjust the workload instead of swinging between overdrive and stopping completely. Sustainable pace is the goal.",
        "th": "เรื่องงานให้ปรับจังหวะ แทนการสลับระหว่างเร่งสุดกับหยุดหมด เป้าหมายคือความเร็วที่ทำต่อได้จริง"
      },
      "moneyResources": {
        "en": "Balance money by adjusting the extremes: what is too much, too little, too irregular, or too rigid.",
        "th": "เรื่องเงินลองปรับจุดที่สุดโต่ง ว่าอะไรเยอะไป น้อยไป ไม่สม่ำเสมอ หรือแข็งเกินจนปรับไม่ได้"
      },
      "loveRelationships": {
        "en": "A relationship may need a better blend of closeness and space, speaking and listening, giving and receiving.",
        "th": "ความสัมพันธ์อาจต้องปรับสัดส่วนใหม่ระหว่างความใกล้กับพื้นที่ส่วนตัว การพูดกับการฟัง และการให้กับการรับ"
      },
      "innerBalance": {
        "en": "Your nervous system may respond better to small steady adjustments than one dramatic reset.",
        "th": "ใจและร่างกายอาจตอบรับการปรับเล็กๆ อย่างสม่ำเสมอได้ดีกว่าการพยายามรีเซ็ตทุกอย่างครั้งใหญ่"
      },
      "opportunitiesWatchouts": {
        "en": "The opportunity is in combination. Two partial solutions may work better together than either extreme alone.",
        "th": "โอกาสอยู่ที่การผสม สิ่งที่ยังไม่สมบูรณ์สองอย่างอาจทำงานร่วมกันได้ดีกว่าการเลือกสุดทางด้านใดด้านหนึ่ง"
      },
      "guidanceToday": {
        "en": "Aim for better balance, not perfect balance.",
        "th": "มองหาความสมดุลที่ดีขึ้น ไม่ใช่ความพอดีเป๊ะ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Notice what at work keeps getting your time because of fear, ego, habit, or pressure rather than real value.",
        "th": "เรื่องงานลองดูว่าอะไรยังได้เวลาและพลังจากคุณเพราะความกลัว อัตตา ความเคยชิน หรือแรงกดดัน มากกว่าคุณค่าจริง"
      },
      "moneyResources": {
        "en": "Watch spending, debt, or resource habits that feel harder to choose freely than you would like.",
        "th": "เรื่องเงินให้สังเกตนิสัยการใช้จ่าย หนี้ หรือการจัดการทรัพยากรที่ทำให้รู้สึกว่าตัวเองเลือกได้น้อยกว่าที่ควร"
      },
      "loveRelationships": {
        "en": "Chemistry and attachment are not the same as care. Notice what keeps you connected and whether it is still healthy.",
        "th": "แรงดึงดูดกับความผูกติดไม่ใช่เรื่องเดียวกับการดูแลกัน ลองดูว่าอะไรทำให้ยังอยู่ในความสัมพันธ์ และสิ่งนั้นยังดีต่อกันหรือไม่"
      },
      "innerBalance": {
        "en": "Name the habit, craving, or fear honestly. What you can see clearly has less power to run the day automatically.",
        "th": "เรียกนิสัย ความอยาก หรือความกลัวนั้นให้ตรง พอเห็นชัด มันจะมีอำนาจกำหนดวันของคุณแบบอัตโนมัติน้อยลง"
      },
      "opportunitiesWatchouts": {
        "en": "The opportunity is the moment you realize you have more choice than the pattern wants you to believe.",
        "th": "โอกาสเกิดขึ้นตรงช่วงที่เห็นว่าคุณมีทางเลือกมากกว่าที่รูปแบบเดิมทำให้เชื่อ"
      },
      "guidanceToday": {
        "en": "Choose once today where you normally react automatically.",
        "th": "เลือกอย่างมีสติสักหนึ่งครั้งในจุดที่ปกติคุณมักตอบสนองแบบอัตโนมัติ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "A weak work structure may be exposing itself. Fix the foundation instead of decorating the part that is failing.",
        "th": "เรื่องงานอาจกำลังเผยจุดที่ฐานไม่แน่น แก้ที่โครงสร้างก่อน ไม่ใช่แต่งส่วนที่กำลังพังให้ดูดี"
      },
      "moneyResources": {
        "en": "If a financial assumption no longer holds, face it early. Clear information is safer than protecting a comforting story.",
        "th": "ถ้าสมมติฐานเรื่องเงินใช้ไม่ได้แล้ว ควรยอมรับให้เร็ว ข้อมูลที่ชัดปลอดภัยกว่าการพยายามรักษาเรื่องเล่าที่ทำให้สบายใจ"
      },
      "loveRelationships": {
        "en": "A sudden truth can shake a relationship, but honesty gives you something real to rebuild from.",
        "th": "ความจริงที่มาแรงอาจทำให้ความสัมพันธ์สะเทือน แต่ความซื่อตรงทำให้มีฐานจริงสำหรับสร้างต่อ"
      },
      "innerBalance": {
        "en": "Disruption can feel personal even when it is exposing something that was unstable all along.",
        "th": "ความสั่นคลอนอาจรู้สึกเหมือนเกิดกับตัวคุณโดยตรง ทั้งที่บางครั้งมันเพียงเปิดให้เห็นสิ่งที่ไม่มั่นคงมาตั้งแต่แรก"
      },
      "opportunitiesWatchouts": {
        "en": "What falls away may reveal the part worth saving, rebuilding, or finally leaving behind.",
        "th": "สิ่งที่หลุดออกไปอาจทำให้เห็นชัดว่าอะไรควรเก็บไว้ สร้างใหม่ หรือปล่อยให้จบ"
      },
      "guidanceToday": {
        "en": "Deal with what is real first. Rebuilding comes after.",
        "th": "จัดการกับความจริงก่อน แล้วค่อยสร้างใหม่"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Reconnect work with the reason it mattered to you in the first place. Meaning can restore energy that pressure could not.",
        "th": "เรื่องงานลองกลับไปหาว่าทำไมสิ่งนี้เคยสำคัญกับคุณ ความหมายอาจเติมแรงได้ดีกว่าแรงกดดัน"
      },
      "moneyResources": {
        "en": "Money decisions feel steadier when they support the life you actually value rather than an image you are trying to maintain.",
        "th": "เรื่องเงินจะนิ่งขึ้นเมื่อใช้เพื่อรองรับชีวิตที่คุณให้คุณค่าจริง มากกว่าภาพที่พยายามรักษาไว้ให้คนอื่นเห็น"
      },
      "loveRelationships": {
        "en": "Let sincerity lead the relationship today. Small honest warmth may matter more than a grand gesture.",
        "th": "ความสัมพันธ์วันนี้ให้ความจริงใจนำทาง ความอบอุ่นเล็กๆ ที่จริงอาจมีความหมายกว่าการแสดงครั้งใหญ่"
      },
      "innerBalance": {
        "en": "Give yourself something restorative: hope, beauty, rest, honesty, or contact with what feels like you.",
        "th": "เติมสิ่งที่ช่วยให้กลับมาเป็นตัวเอง ไม่ว่าจะเป็นความหวัง ความงาม การพัก ความซื่อตรง หรือสิ่งที่ทำให้ใจเบาขึ้น"
      },
      "opportunitiesWatchouts": {
        "en": "A hopeful path is opening, but it asks for authenticity rather than performance.",
        "th": "ทางที่มีความหวังกำลังเปิด แต่ต้องการความเป็นตัวเองมากกว่าการพยายามแสดงให้ดูดี"
      },
      "guidanceToday": {
        "en": "Do one thing that helps you trust life and yourself a little more.",
        "th": "ทำหนึ่งอย่างที่ช่วยให้คุณไว้ใจทั้งชีวิตและตัวเองได้มากขึ้นอีกนิด"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "At work, separate what you know from what you suspect. Unclear information needs checking, not imagination.",
        "th": "เรื่องงานให้แยกสิ่งที่รู้จริงออกจากสิ่งที่คาดเดา ข้อมูลที่ยังไม่ชัดควรตรวจเพิ่ม ไม่ใช่เติมด้วยจินตนาการ"
      },
      "moneyResources": {
        "en": "Avoid money decisions built on fear, excitement, or incomplete information. Give uncertainty a proper place in the plan.",
        "th": "เรื่องเงินอย่าตัดสินใจบนความกลัว ความตื่นเต้น หรือข้อมูลที่ยังไม่ครบ ควรเผื่อพื้นที่ให้ความไม่แน่นอนอยู่ในแผนด้วย"
      },
      "loveRelationships": {
        "en": "Feelings may be real even when your interpretation is not complete. Ask before assuming what the other person means.",
        "th": "ความรู้สึกอาจจริง แต่คำอธิบายที่คุณให้มันอาจยังไม่ครบ ถามให้ชัดก่อนเดาว่าอีกฝ่ายหมายความว่าอะไร"
      },
      "innerBalance": {
        "en": "Your mind may be filling gaps because uncertainty is uncomfortable. Return to what is actually known.",
        "th": "ใจอาจกำลังเติมช่องว่างเพราะทนความไม่แน่นอนไม่ไหว กลับมาที่สิ่งที่รู้จริงก่อน"
      },
      "opportunitiesWatchouts": {
        "en": "A hidden detail may matter. Watch for what becomes clearer with time instead of forcing certainty now.",
        "th": "รายละเอียดที่ยังไม่เห็นอาจสำคัญ ให้เวลาเปิดข้อมูลเพิ่ม แทนการบังคับให้ตัวเองมั่นใจตอนนี้"
      },
      "guidanceToday": {
        "en": "Trust your instincts enough to investigate them, not enough to skip the facts.",
        "th": "เชื่อสัญชาตญาณมากพอที่จะตรวจสอบมัน แต่ไม่มากจนข้ามข้อเท็จจริง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Let good work be visible. Clarity, confidence, and straightforward communication can move things faster today.",
        "th": "เรื่องงานให้สิ่งที่ทำได้ดีได้ถูกมองเห็น ความชัด ความมั่นใจ และการสื่อสารตรงไปตรงมาอาจพาเรื่องเดินเร็วขึ้น"
      },
      "moneyResources": {
        "en": "Enjoy what is working financially without turning satisfaction into careless spending.",
        "th": "เรื่องเงินชื่นชมสิ่งที่กำลังไปได้ดีได้เต็มที่ แต่ไม่จำเป็นต้องเปลี่ยนความสบายใจให้เป็นการใช้จ่ายแบบไม่คิด"
      },
      "loveRelationships": {
        "en": "Warmth and openness are favored today. Say the kind thing you mean instead of making the other person guess.",
        "th": "ความสัมพันธ์วันนี้เหมาะกับความอบอุ่นและเปิดเผย ถ้ามีสิ่งดีๆ ที่อยากบอก พูดตรงๆ แทนการให้อีกฝ่ายเดา"
      },
      "innerBalance": {
        "en": "Let simple joy count. You do not need to earn every good feeling by solving something first.",
        "th": "ให้ความสุขง่ายๆ มีคุณค่าได้เลย คุณไม่จำเป็นต้องแก้ปัญหาบางอย่างให้เสร็จก่อนถึงจะอนุญาตให้ตัวเองรู้สึกดี"
      },
      "opportunitiesWatchouts": {
        "en": "Something may be easier, clearer, or more supportive than you expected. Do not overlook it because you are waiting for complexity.",
        "th": "บางอย่างอาจง่าย ชัด หรือช่วยคุณได้มากกว่าที่คิด อย่ามองข้ามเพียงเพราะกำลังรอคำตอบที่ซับซ้อนกว่า"
      },
      "guidanceToday": {
        "en": "Notice what is going well and give it room to grow.",
        "th": "มองสิ่งที่กำลังไปได้ดี แล้วให้พื้นที่มันเติบโตต่อ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Review the work pattern, not only today’s task. A larger lesson may tell you what needs to change next.",
        "th": "เรื่องงานให้ดูรูปแบบที่เกิดซ้ำ ไม่ใช่แค่งานตรงหน้า บทเรียนใหญ่กว่าอาจบอกได้ว่าจากนี้ควรเปลี่ยนอะไร"
      },
      "moneyResources": {
        "en": "Look at past money choices without shame or excuses. The useful part is the lesson you can apply now.",
        "th": "เรื่องเงินลองมองการตัดสินใจที่ผ่านมาโดยไม่ต้องโทษตัวเองหรือแก้ตัว สิ่งสำคัญคือบทเรียนที่นำมาใช้ได้ตอนนี้"
      },
      "loveRelationships": {
        "en": "A relationship may benefit from an honest review of what has changed and what deserves a different response now.",
        "th": "ความสัมพันธ์อาจดีขึ้นเมื่อมองตรงๆ ว่าอะไรเปลี่ยนไปแล้ว และวันนี้ควรตอบสนองต่างจากเดิมตรงไหน"
      },
      "innerBalance": {
        "en": "You are allowed to outgrow an old version of yourself once you understand what it taught you.",
        "th": "คุณมีสิทธิเติบโตพ้นตัวตนแบบเดิม เมื่อรับรู้แล้วว่าช่วงนั้นสอนอะไรให้คุณ"
      },
      "opportunitiesWatchouts": {
        "en": "A second chance is useful only when it is informed by the first experience.",
        "th": "โอกาสครั้งใหม่จะมีความหมายเมื่อคุณใช้บทเรียนจากครั้งก่อนจริงๆ"
      },
      "guidanceToday": {
        "en": "Take the lesson, then choose differently on purpose.",
        "th": "รับบทเรียนให้ครบ แล้วเลือกต่างจากเดิมอย่างตั้งใจ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Recognize what is complete at work before opening another cycle. Closure makes the next goal cleaner.",
        "th": "เรื่องงานให้ยอมรับสิ่งที่จบหรือสำเร็จแล้วก่อนเปิดรอบใหม่ การปิดงานให้ครบทำให้เป้าหมายถัดไปชัดขึ้น"
      },
      "moneyResources": {
        "en": "Take stock of what you have built, saved, learned, or stabilized. Completion is also a resource.",
        "th": "เรื่องเงินและทรัพยากร ลองนับสิ่งที่สร้าง เก็บ เรียนรู้ หรือทำให้มั่นคงได้แล้ว ความสำเร็จก็เป็นทรัพยากรอย่างหนึ่ง"
      },
      "loveRelationships": {
        "en": "A relationship milestone deserves to be acknowledged. Notice what you have learned about belonging and partnership.",
        "th": "หมุดหมายในความสัมพันธ์ควรได้รับการมองเห็น ลองดูว่าคุณได้เรียนรู้อะไรเรื่องการเป็นส่วนหนึ่งและการร่วมทางกับคนอื่น"
      },
      "innerBalance": {
        "en": "Let yourself feel finished with something. You do not need to keep carrying a lesson after you have integrated it.",
        "th": "อนุญาตให้บางเรื่องจบได้จริง คุณไม่จำเป็นต้องแบกบทเรียนต่อไปเมื่อมันกลายเป็นส่วนหนึ่งของคุณแล้ว"
      },
      "opportunitiesWatchouts": {
        "en": "Completion can open a wider horizon. The next opportunity may appear only after you stop treating the old chapter as unfinished.",
        "th": "การปิดวงจรให้ครบอาจเปิดมุมมองที่กว้างขึ้น โอกาสใหม่อาจเห็นได้ชัดเมื่อไม่มองบทเดิมว่าเป็นเรื่องค้างอีกต่อไป"
      },
      "guidanceToday": {
        "en": "Finish, appreciate, then begin again from a stronger place.",
        "th": "ปิดให้ครบ ชื่นชมสิ่งที่ทำมา แล้วค่อยเริ่มใหม่จากฐานที่แข็งแรงกว่าเดิม"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Act on the idea while the energy is alive. A small prototype or first move is enough.",
        "th": "เรื่องงานให้ลงมือกับไอเดียตอนที่ยังมีไฟ แค่ต้นแบบเล็กๆ หรือก้าวแรกก็พอ"
      },
      "moneyResources": {
        "en": "A new earning or spending idea may be worth testing on a small scale before committing more.",
        "th": "เรื่องเงิน ไอเดียใหม่อาจน่าลอง แต่เริ่มในขนาดเล็กก่อนแล้วค่อยดูผลจริง"
      },
      "loveRelationships": {
        "en": "Bring fresh energy into the relationship with a direct invitation, plan, or honest expression of interest.",
        "th": "ความสัมพันธ์อาจสดขึ้นเมื่อคุณชวนทำอะไรใหม่ๆ วางแผนร่วมกัน หรือแสดงความสนใจอย่างตรงไปตรงมา"
      },
      "innerBalance": {
        "en": "Your energy wants movement. Give it one constructive outlet instead of letting it turn into restlessness.",
        "th": "พลังในใจต้องการทางออก ลองให้มันได้ไปอยู่กับการลงมือที่สร้างสรรค์ แทนการกลายเป็นความกระสับกระส่าย"
      },
      "opportunitiesWatchouts": {
        "en": "An exciting opening is present, but it needs action before it becomes more than a spark.",
        "th": "มีช่องเปิดที่น่าตื่นเต้น แต่ต้องมีการลงมือก่อนประกายนั้นจะกลายเป็นอะไรที่มากกว่านั้น"
      },
      "guidanceToday": {
        "en": "Start before the excitement cools, but keep the first step small enough to learn from.",
        "th": "เริ่มก่อนแรงบันดาลใจจะจาง แต่ให้ก้าวแรกเล็กพอที่จะเรียนรู้และปรับได้"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Compare the real options at work and choose a direction instead of planning every possible future.",
        "th": "เรื่องงานให้เปรียบเทียบทางเลือกที่มีจริงแล้วเลือกทิศ แทนการวางแผนครอบคลุมทุกอนาคตที่อาจเกิด"
      },
      "moneyResources": {
        "en": "Money planning benefits from a wider view today. Look beyond the next expense to what you want your resources to support.",
        "th": "เรื่องเงินควรมองให้ไกลกว่ารายจ่ายถัดไป ว่าทรัพยากรทั้งหมดของคุณควรพาไปสนับสนุนชีวิตแบบไหน"
      },
      "loveRelationships": {
        "en": "A relationship may be asking what comes next. Talk about direction rather than assuming chemistry will answer it for you.",
        "th": "ความสัมพันธ์อาจกำลังถามว่าแล้วต่อไปจะไปทางไหน คุยเรื่องทิศทางแทนการหวังว่าแค่ความรู้สึกจะตอบให้เอง"
      },
      "innerBalance": {
        "en": "Possibility can be energizing, but too many open doors can also keep you undecided.",
        "th": "ความเป็นไปได้หลายทางทำให้มีแรงได้ แต่ประตูที่เปิดมากเกินก็ทำให้ตัดสินใจยากเช่นกัน"
      },
      "opportunitiesWatchouts": {
        "en": "A larger horizon is available if you are willing to choose rather than only imagine.",
        "th": "มุมที่กว้างขึ้นกำลังเปิด ถ้าคุณพร้อมเลือกจริง ไม่ใช่แค่คิดถึงหลายทาง"
      },
      "guidanceToday": {
        "en": "Choose the horizon that matters most and let the other options become secondary.",
        "th": "เลือกทิศที่สำคัญที่สุด แล้วให้ทางอื่นเป็นเรื่องรอง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Build on what is already moving. Feedback and early results can guide the next expansion.",
        "th": "เรื่องงานให้ต่อยอดจากสิ่งที่เริ่มเดินแล้ว ผลช่วงแรกและข้อเสนอแนะจะช่วยบอกว่าควรขยายตรงไหน"
      },
      "moneyResources": {
        "en": "Resources may be ready for a longer-range plan. Think in stages instead of expecting an immediate return.",
        "th": "เรื่องเงินอาจเหมาะกับการวางแผนระยะยาวขึ้น แบ่งเป็นช่วงๆ แทนการคาดหวังผลทันที"
      },
      "loveRelationships": {
        "en": "A connection may grow when you look beyond the present moment and make space for shared plans.",
        "th": "ความสัมพันธ์อาจเติบโตเมื่อมองไกลกว่าช่วงนี้ และเริ่มเปิดพื้นที่ให้แผนร่วมกัน"
      },
      "innerBalance": {
        "en": "Your confidence can grow from evidence that the first effort is already producing movement.",
        "th": "ความมั่นใจอาจเพิ่มจากหลักฐานว่าความพยายามช่วงแรกกำลังทำให้เรื่องขยับจริง"
      },
      "opportunitiesWatchouts": {
        "en": "Expansion is possible, but it works best when you stay responsive to what comes back from the world.",
        "th": "มีโอกาสขยายต่อได้ แต่จะดีที่สุดเมื่อคุณฟังผลตอบรับจากความเป็นจริงระหว่างทาง"
      },
      "guidanceToday": {
        "en": "Keep looking ahead while using today’s feedback to steer.",
        "th": "มองไปข้างหน้า และใช้ผลตอบรับของวันนี้ช่วยปรับทิศ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "A milestone at work deserves recognition. Celebrate what is stable before immediately creating another target.",
        "th": "เรื่องงานมีหมุดหมายที่ควรยอมรับ ชื่นชมสิ่งที่มั่นคงขึ้นแล้วก่อนรีบตั้งเป้าถัดไป"
      },
      "moneyResources": {
        "en": "Financial stability, however modest, is worth noticing. Reinforce what is already working.",
        "th": "ความมั่นคงทางเงินแม้ยังไม่มากก็ควรถูกมองเห็น เสริมสิ่งที่กำลังใช้ได้ผลให้แข็งแรงขึ้น"
      },
      "loveRelationships": {
        "en": "Connection grows through shared joy and belonging. Make room for a simple moment together.",
        "th": "ความสัมพันธ์เติบโตจากความสุขร่วมและความรู้สึกเป็นส่วนหนึ่ง ลองมีช่วงเวลาง่ายๆ ที่ได้อยู่ด้วยกันจริงๆ"
      },
      "innerBalance": {
        "en": "Let yourself feel safe enough to enjoy progress without immediately scanning for the next problem.",
        "th": "ให้ตัวเองรู้สึกปลอดภัยพอที่จะชื่นชมความก้าวหน้า โดยไม่ต้องรีบมองหาปัญหาถัดไป"
      },
      "opportunitiesWatchouts": {
        "en": "Supportive people, familiar places, or a stable base may be more valuable today than a dramatic new opening.",
        "th": "คนที่สนับสนุน พื้นที่คุ้นเคย หรือฐานที่มั่นคงอาจมีค่ากว่าโอกาสใหม่ที่หวือหวาในวันนี้"
      },
      "guidanceToday": {
        "en": "Pause long enough to appreciate where you have arrived.",
        "th": "หยุดนานพอที่จะเห็นคุณค่าของจุดที่เดินมาถึงแล้ว"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Constructive challenge can sharpen the work, but pointless friction will only scatter the team’s energy.",
        "th": "เรื่องงาน ความท้าทายที่สร้างสรรค์ช่วยให้งานคมขึ้นได้ แต่แรงปะทะที่ไม่มีเป้าหมายมีแต่ทำให้ทีมเสียแรง"
      },
      "moneyResources": {
        "en": "Avoid turning money into a competition. Compare options by value, not by what other people are doing.",
        "th": "เรื่องเงินอย่าทำให้กลายเป็นการแข่งขัน เปรียบเทียบทางเลือกจากคุณค่าจริง ไม่ใช่จากสิ่งที่คนอื่นกำลังทำ"
      },
      "loveRelationships": {
        "en": "Not every disagreement is a threat to the relationship. Learn which differences create growth and which ones need a boundary.",
        "th": "ความเห็นต่างไม่ได้แปลว่าความสัมพันธ์มีปัญหาเสมอไป แยกให้ได้ว่าอะไรช่วยให้โต และอะไรต้องวางขอบเขต"
      },
      "innerBalance": {
        "en": "Your system may be overstimulated by too many competing demands. Choose which conflict deserves your attention.",
        "th": "ใจอาจล้าจากแรงดึงหลายทาง เลือกให้ชัดว่าความขัดแย้งไหนควรได้รับความสนใจจริง"
      },
      "opportunitiesWatchouts": {
        "en": "A useful challenge may reveal a better idea, stronger skill, or clearer position.",
        "th": "ความท้าทายบางอย่างอาจทำให้เห็นไอเดียที่ดีกว่า ทักษะที่แข็งขึ้น หรือจุดยืนที่ชัดกว่า"
      },
      "guidanceToday": {
        "en": "Engage where the friction helps you grow; step away where it only drains you.",
        "th": "เข้าไปกับแรงปะทะที่ช่วยให้เติบโต และถอยจากอันที่มีแต่ทำให้หมดแรง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Let your work be seen and accept recognition you have earned without shrinking or exaggerating it.",
        "th": "เรื่องงานให้ผลงานได้ถูกมองเห็น รับการยอมรับที่ควรได้โดยไม่ลดตัวเองหรือพูดเกินจริง"
      },
      "moneyResources": {
        "en": "A financial win or improvement is worth acknowledging, but keep the system that created it stronger than the celebration.",
        "th": "ความคืบหน้าทางเงินควรได้ชื่นชม แต่ระบบที่ทำให้เกิดผลนั้นสำคัญกว่าการฉลอง"
      },
      "loveRelationships": {
        "en": "Appreciation matters in relationships. Say what you admire instead of assuming the other person already knows.",
        "th": "ความสัมพันธ์ต้องการการเห็นคุณค่า บอกสิ่งที่ชื่นชมออกไป แทนการคิดว่าอีกฝ่ายรู้อยู่แล้ว"
      },
      "innerBalance": {
        "en": "Confidence can receive praise without becoming dependent on it.",
        "th": "ความมั่นใจที่ดีรับคำชมได้ โดยไม่ต้องพึ่งคำชมเพื่อยืนยันคุณค่าตัวเอง"
      },
      "opportunitiesWatchouts": {
        "en": "Visibility may open a door today, especially if you are willing to let good work speak for itself.",
        "th": "การถูกมองเห็นอาจเปิดโอกาส โดยเฉพาะเมื่อคุณยอมให้งานที่ดีพูดแทนตัวมันเอง"
      },
      "guidanceToday": {
        "en": "Own the progress, then keep moving for reasons deeper than applause.",
        "th": "ยอมรับความก้าวหน้าของตัวเอง แล้วไปต่อด้วยเหตุผลที่ลึกกว่าเสียงปรบมือ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Protect the priority that matters instead of spending energy defending every small decision.",
        "th": "เรื่องงานให้ปกป้องสิ่งสำคัญจริง แทนการเสียแรงอธิบายหรือต่อสู้กับทุกเรื่องเล็ก"
      },
      "moneyResources": {
        "en": "Hold the financial boundary that keeps you stable, even if outside pressure makes it inconvenient.",
        "th": "เรื่องเงินให้ยืนกับขอบเขตที่ช่วยรักษาความมั่นคง แม้แรงกดดันจากคนอื่นจะทำให้ไม่สะดวก"
      },
      "loveRelationships": {
        "en": "A relationship can handle difference when both people respect each other’s boundaries. Defend your needs without turning them into a wall.",
        "th": "ความสัมพันธ์อยู่กับความต่างได้เมื่อเคารพขอบเขตกัน ปกป้องความต้องการของตัวเองโดยไม่สร้างกำแพง"
      },
      "innerBalance": {
        "en": "You do not need to answer every challenge to prove that your position is valid.",
        "th": "คุณไม่จำเป็นต้องตอบทุกแรงท้าทายเพื่อพิสูจน์ว่าจุดยืนของตัวเองมีค่า"
      },
      "opportunitiesWatchouts": {
        "en": "An opportunity may require courage to keep your place while others question it.",
        "th": "โอกาสบางอย่างต้องใช้ความกล้าที่จะยืนอยู่กับทางของตัวเอง แม้คนอื่นยังตั้งคำถาม"
      },
      "guidanceToday": {
        "en": "Save your strength for the hill that is actually worth holding.",
        "th": "เก็บแรงไว้กับเรื่องที่คุ้มค่าพอจะยืนหยัดจริงๆ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Reply, send, decide, or move while the path is open. Clear communication keeps speed from becoming chaos.",
        "th": "เรื่องงานเหมาะกับการตอบ ส่ง ตัดสินใจ หรือขยับตอนทางยังเปิด การสื่อสารชัดจะช่วยไม่ให้ความเร็วกลายเป็นความวุ่นวาย"
      },
      "moneyResources": {
        "en": "Money movement may happen quickly, so keep transfers, purchases, or commitments deliberate rather than impulsive.",
        "th": "เรื่องเงินอาจขยับเร็ว ควรให้การโอน ซื้อ หรือรับภาระใหม่เป็นการตัดสินใจที่ตั้งใจ ไม่ใช่ตามแรงชั่ววูบ"
      },
      "loveRelationships": {
        "en": "A conversation or connection may accelerate. Enjoy the momentum while keeping expectations clear.",
        "th": "ความสัมพันธ์หรือบทสนทนาอาจเร็วขึ้น ใช้จังหวะนั้นได้ แต่ควรรักษาความคาดหวังให้ชัด"
      },
      "innerBalance": {
        "en": "Your mind may be moving fast too. Give it one channel instead of letting every thought become an action.",
        "th": "ความคิดอาจวิ่งเร็วด้วย ให้มันมีช่องทางหลักสักหนึ่งทาง แทนการเปลี่ยนทุกความคิดให้กลายเป็นการลงมือ"
      },
      "opportunitiesWatchouts": {
        "en": "Timing is favorable for something already in motion. Delays caused only by second-guessing may cost more than action.",
        "th": "จังหวะเหมาะกับสิ่งที่กำลังเดินอยู่ ความล่าช้าที่เกิดจากการลังเลซ้ำๆ อาจเสียมากกว่าการลงมือ"
      },
      "guidanceToday": {
        "en": "Move promptly, but keep the message and purpose clear.",
        "th": "ขยับให้ทันจังหวะ แต่รักษาทั้งข้อความและเป้าหมายให้ชัด"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "You can keep going, but protect your energy and stop treating every request as equally urgent.",
        "th": "เรื่องงานยังไปต่อได้ แต่ต้องรักษาแรงและหยุดมองทุกคำขอว่าเร่งด่วนเท่ากัน"
      },
      "moneyResources": {
        "en": "Financial caution is useful when it preserves resilience, not when it becomes permanent fear of using anything.",
        "th": "ความระวังเรื่องเงินมีประโยชน์เมื่อช่วยให้ฟื้นตัวได้ ไม่ใช่เมื่อกลายเป็นความกลัวที่จะใช้ทรัพยากรทุกอย่าง"
      },
      "loveRelationships": {
        "en": "Past hurt may make you defensive. Keep healthy boundaries without assuming the next person will repeat the same story.",
        "th": "ประสบการณ์เจ็บเก่าอาจทำให้ตั้งการ์ดสูง รักษาขอบเขตได้ แต่ไม่ต้องคิดว่าคนตรงหน้าจะทำซ้ำเรื่องเดิมเสมอ"
      },
      "innerBalance": {
        "en": "Tired is not the same as defeated. Your system may need protection and recovery more than motivation.",
        "th": "เหนื่อยไม่เท่ากับแพ้ ใจอาจต้องการการปกป้องและฟื้นแรง มากกว่าคำกระตุ้นเพิ่ม"
      },
      "opportunitiesWatchouts": {
        "en": "A challenge may be the final stretch rather than proof that the whole effort is wrong.",
        "th": "ความยากตรงหน้าอาจเป็นช่วงท้ายที่หนัก ไม่ใช่หลักฐานว่าความพยายามทั้งหมดผิดทาง"
      },
      "guidanceToday": {
        "en": "Keep the boundary, conserve the energy, and take the next manageable step.",
        "th": "รักษาขอบเขต เก็บแรง แล้วขยับด้วยก้าวที่ยังจัดการไหว"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "The workload may be too heavy because too much has become yours by default. Delegate, simplify, or renegotiate.",
        "th": "เรื่องงานอาจหนักเพราะหลายอย่างกลายเป็นหน้าที่ของคุณโดยอัตโนมัติ ลองแบ่ง ลด หรือเจรจาใหม่"
      },
      "moneyResources": {
        "en": "Money pressure may ease when you separate true obligations from costs you can reduce, delay, or share.",
        "th": "แรงกดดันเรื่องเงินอาจเบาลงเมื่อแยกภาระจริงออกจากค่าใช้จ่ายที่ลด เลื่อน หรือแบ่งกันได้"
      },
      "loveRelationships": {
        "en": "Carrying the whole relationship is not the same as loving someone. Notice where responsibility needs to be shared.",
        "th": "การแบกความสัมพันธ์ทั้งหมดไม่ใช่ความรัก ลองดูว่าหน้าที่ตรงไหนควรถูกแบ่งกลับไปให้อีกฝ่าย"
      },
      "innerBalance": {
        "en": "Overload can make everything feel equally heavy. Name what can actually be put down.",
        "th": "เมื่อแบกมากเกิน ทุกอย่างจะดูหนักเท่ากัน ลองเรียกให้ชัดว่าอะไรสามารถวางลงได้จริง"
      },
      "opportunitiesWatchouts": {
        "en": "Relief may come not from a new opportunity but from making room by removing unnecessary weight.",
        "th": "ความโล่งอาจไม่ได้มาจากโอกาสใหม่ แต่อยู่ที่การสร้างพื้นที่ด้วยการลดภาระที่ไม่จำเป็น"
      },
      "guidanceToday": {
        "en": "Do less, but make sure what remains is truly yours to carry.",
        "th": "ทำน้อยลงได้ แต่ให้สิ่งที่เหลือเป็นเรื่องที่คุณควรรับผิดชอบจริง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Approach work with curiosity. A small experiment can teach you more than trying to look fully prepared.",
        "th": "เรื่องงานให้ใช้ความอยากรู้อยากลอง การทดลองเล็กๆ อาจสอนมากกว่าการพยายามดูพร้อมทุกอย่าง"
      },
      "moneyResources": {
        "en": "Learn the basics before putting serious money or resources behind a new interest.",
        "th": "เรื่องเงินให้เรียนรู้พื้นฐานก่อนใส่เงินหรือทรัพยากรจริงจังลงในสิ่งใหม่"
      },
      "loveRelationships": {
        "en": "A playful or fresh approach can help a connection, especially if neither person has to pretend to know the outcome.",
        "th": "ความสัมพันธ์อาจสดขึ้นเมื่อมีความเล่นสนุกหรือมุมใหม่ โดยไม่ต้องทำเหมือนรู้ว่าจะจบอย่างไร"
      },
      "innerBalance": {
        "en": "Let yourself be a beginner somewhere. Not knowing yet is part of the energy, not a flaw.",
        "th": "อนุญาตให้ตัวเองเป็นมือใหม่ในบางเรื่อง การยังไม่รู้ไม่ใช่ข้อเสีย แต่เป็นส่วนหนึ่งของการเริ่มเรียนรู้"
      },
      "opportunitiesWatchouts": {
        "en": "A new interest, message, or invitation may be worth exploring without demanding certainty from it.",
        "th": "ความสนใจ ข้อความ หรือคำชวนใหม่ๆ อาจน่าสำรวจ โดยยังไม่ต้องบังคับให้มันมีความแน่นอนทันที"
      },
      "guidanceToday": {
        "en": "Follow the spark far enough to learn something real.",
        "th": "ตามประกายความสนใจไปไกลพอที่จะได้เรียนรู้อะไรจริง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Move boldly on the work that truly matters, but define the target before speed takes over.",
        "th": "เรื่องงานลุยได้เต็มที่กับสิ่งที่สำคัญ แต่กำหนดเป้าหมายให้ชัดก่อนความเร็วจะพาไปเอง"
      },
      "moneyResources": {
        "en": "A bold money move may feel exciting; make sure the downside still fits what you can realistically carry.",
        "th": "เรื่องเงิน การขยับแบบกล้าอาจน่าตื่นเต้น แต่ต้องแน่ใจว่าด้านเสียยังอยู่ในระดับที่รับได้จริง"
      },
      "loveRelationships": {
        "en": "Passion can energize a relationship, but reliability matters once the excitement settles.",
        "th": "ความหลงใหลช่วยเติมไฟให้ความสัมพันธ์ แต่เมื่อความตื่นเต้นลดลง ความสม่ำเสมอจะสำคัญกว่า"
      },
      "innerBalance": {
        "en": "You may have more drive than patience today. Use the energy without making every pause feel like failure.",
        "th": "วันนี้อาจมีแรงมากกว่าความอดทน ใช้พลังได้เต็มที่โดยไม่มองทุกการชะลอว่าเป็นความล้มเหลว"
      },
      "opportunitiesWatchouts": {
        "en": "A fast-moving opportunity may reward courage, provided you know what you are saying yes to.",
        "th": "โอกาสที่เคลื่อนเร็วอาจตอบรับความกล้าได้ดี ถ้าคุณรู้ว่ากำลังตอบรับอะไรจริงๆ"
      },
      "guidanceToday": {
        "en": "Go forward with fire, but keep enough awareness to steer.",
        "th": "ไปข้างหน้าด้วยไฟได้ แต่อย่าเร็วจนไม่มีแรงไว้บังคับทิศ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Lead with confidence and warmth. You do not need to dominate the room for your work to carry authority.",
        "th": "เรื่องงานนำด้วยความมั่นใจและความอบอุ่นได้ คุณไม่จำเป็นต้องครองห้องเพื่อให้งานมีน้ำหนัก"
      },
      "moneyResources": {
        "en": "Trust your ability to handle resources without using spending or status to prove confidence.",
        "th": "เรื่องเงินเชื่อในความสามารถจัดการทรัพยากรได้ โดยไม่ต้องใช้การใช้จ่ายหรือสถานะมาพิสูจน์ความมั่นใจ"
      },
      "loveRelationships": {
        "en": "Attraction grows around genuine self-possession. Be warm and interested without abandoning your own center.",
        "th": "ความน่าดึงดูดมาจากการยืนอยู่กับตัวเองอย่างมั่นคง เป็นมิตรและเปิดใจได้โดยไม่ต้องทิ้งศูนย์กลางของตัวเอง"
      },
      "innerBalance": {
        "en": "Your energy is strongest when confidence comes from self-trust rather than comparison.",
        "th": "พลังใจจะดีที่สุดเมื่อความมั่นใจมาจากการไว้ใจตัวเอง มากกว่าการเปรียบเทียบ"
      },
      "opportunitiesWatchouts": {
        "en": "People may respond to your presence, creativity, or initiative today. Let the opportunity meet the real you.",
        "th": "คนอื่นอาจตอบรับตัวตน ความสร้างสรรค์ หรือการริเริ่มของคุณ เปิดโอกาสให้สิ่งนั้นได้เจอกับตัวคุณจริงๆ"
      },
      "guidanceToday": {
        "en": "Take up your space without making anyone else smaller.",
        "th": "ยืนในพื้นที่ของตัวเองได้เต็มที่ โดยไม่ต้องทำให้ใครเล็กลง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Set the vision, then give people enough room to act. Leadership works better than controlling every detail.",
        "th": "เรื่องงานวางภาพใหญ่ให้ชัด แล้วให้คนอื่นมีพื้นที่ลงมือ ความเป็นผู้นำไม่จำเป็นต้องควบคุมทุกจุด"
      },
      "moneyResources": {
        "en": "Think strategically about resources. Use money where it advances the larger plan instead of feeding short-term excitement.",
        "th": "เรื่องเงินให้คิดเชิงกลยุทธ์ ใช้ทรัพยากรกับสิ่งที่พาแผนใหญ่เดินหน้า มากกว่าความตื่นเต้นระยะสั้น"
      },
      "loveRelationships": {
        "en": "A mature relationship can hold independence and shared direction at the same time.",
        "th": "ความสัมพันธ์ที่โตพอสามารถมีทั้งความเป็นตัวของตัวเองและทิศทางร่วมได้พร้อมกัน"
      },
      "innerBalance": {
        "en": "Ambition feels healthier when it has purpose. Make sure the drive is serving something you actually respect.",
        "th": "ความทะเยอทะยานจะดีต่อใจมากขึ้นเมื่อมีจุดหมาย ตรวจว่าพลังขับเคลื่อนกำลังรับใช้สิ่งที่คุณเคารพจริงหรือไม่"
      },
      "opportunitiesWatchouts": {
        "en": "An opportunity may ask you to think bigger, but bigger still needs a clear reason and responsible follow-through.",
        "th": "โอกาสอาจชวนให้คิดใหญ่ขึ้น แต่ความใหญ่ยังต้องมีเหตุผลที่ชัดและการรับผิดชอบต่อให้จบ"
      },
      "guidanceToday": {
        "en": "Lead from vision, then back it with consistent action.",
        "th": "นำด้วยภาพที่ชัด แล้วทำให้ภาพนั้นมีน้ำหนักด้วยการลงมือสม่ำเสมอ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Let a new feeling or creative current into the work. Inspiration can be useful when you give it a practical channel.",
        "th": "เรื่องงานเปิดพื้นที่ให้ความรู้สึกหรือความสร้างสรรค์ใหม่ๆ เข้ามา แล้วหาช่องทางให้มันกลายเป็นสิ่งที่ทำได้จริง"
      },
      "moneyResources": {
        "en": "Notice emotional spending or generosity today. Money works better when warmth still has a clear limit.",
        "th": "เรื่องเงินให้สังเกตการใช้ตามอารมณ์หรือการให้เพราะใจอ่อน ความอบอุ่นยังควรมีขอบเขตที่ชัด"
      },
      "loveRelationships": {
        "en": "A fresh emotional opening is available. Let affection be expressed rather than only felt privately.",
        "th": "ความสัมพันธ์มีพื้นที่ใหม่ทางความรู้สึก ลองให้ความรักหรือความเอ็นดูได้ถูกแสดงออก ไม่ใช่อยู่ในใจอย่างเดียว"
      },
      "innerBalance": {
        "en": "Something in you wants to feel again rather than analyze. Give the emotion enough room without letting it flood the whole day.",
        "th": "ข้างในอาจอยากรู้สึกมากกว่าคิด ให้พื้นที่อารมณ์ได้อยู่ โดยไม่ปล่อยให้ท่วมทั้งวัน"
      },
      "opportunitiesWatchouts": {
        "en": "A sincere invitation, creative idea, or emotional beginning may be worth receiving with an open heart.",
        "th": "คำชวนที่จริงใจ ไอเดียสร้างสรรค์ หรือการเริ่มต้นทางความรู้สึกบางอย่างอาจคุ้มที่จะเปิดใจรับ"
      },
      "guidanceToday": {
        "en": "Let yourself receive what feels nourishing, then respond sincerely.",
        "th": "เปิดรับสิ่งที่หล่อเลี้ยงใจ แล้วตอบกลับอย่างจริงใจ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Collaboration works best through mutual respect today. Make sure both sides are actually contributing and listening.",
        "th": "เรื่องงาน ความร่วมมือจะดีที่สุดเมื่อมีความเคารพกันจริง ดูว่าทั้งสองฝ่ายได้ลงแรงและฟังกันพอหรือยัง"
      },
      "moneyResources": {
        "en": "A money arrangement should feel mutual, clear, and fair. Talk through expectations before relying on goodwill alone.",
        "th": "เรื่องเงินที่เกี่ยวข้องกับคนอื่นควรชัดและเป็นธรรม คุยความคาดหวังให้ครบก่อนพึ่งความไว้ใจกันอย่างเดียว"
      },
      "loveRelationships": {
        "en": "Connection is the focus. Meet the other person directly instead of trying to manage the relationship from assumptions.",
        "th": "ความสัมพันธ์วันนี้เน้นการพบกันตรงๆ ฟังและตอบกันจริง แทนการจัดการความสัมพันธ์ผ่านการคาดเดา"
      },
      "innerBalance": {
        "en": "You may feel more balanced when you allow genuine reciprocity instead of always being the giver or receiver.",
        "th": "ใจอาจสมดุลขึ้นเมื่อยอมให้มีการให้และรับจริง ไม่ต้องอยู่บทผู้ให้หรือผู้รับตลอดเวลา"
      },
      "opportunitiesWatchouts": {
        "en": "A partnership, agreement, or heartfelt conversation may open more than solitary effort would.",
        "th": "ความร่วมมือ ข้อตกลง หรือบทสนทนาที่จริงใจอาจเปิดทางได้มากกว่าการพยายามคนเดียว"
      },
      "guidanceToday": {
        "en": "Meet halfway, but make sure both people are actually moving.",
        "th": "เดินเข้าหากันคนละครึ่ง และดูให้แน่ว่าทั้งสองฝ่ายกำลังขยับจริง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Team energy can help work today. Share progress, celebrate effort, and let collaboration feel human.",
        "th": "เรื่องงานใช้พลังของทีมให้เป็นประโยชน์ แบ่งปันความคืบหน้า ชื่นชมความพยายาม และให้ความร่วมมือมีความเป็นคนมากขึ้น"
      },
      "moneyResources": {
        "en": "Social spending can be enjoyable, but agree with yourself on what still feels comfortable afterward.",
        "th": "เรื่องเงินใช้กับสังคมหรือความสนุกได้ แค่กำหนดไว้ก่อนว่าระดับไหนยังสบายใจหลังจบกิจกรรม"
      },
      "loveRelationships": {
        "en": "Friendship, community, and shared joy are part of love too. Make room for connection that does not need to be intense.",
        "th": "มิตรภาพ ชุมชน และความสุขร่วมก็เป็นส่วนหนึ่งของความรัก เปิดพื้นที่ให้ความสัมพันธ์ที่ไม่ต้องเข้มข้นตลอดเวลา"
      },
      "innerBalance": {
        "en": "Being around supportive people may restore more than staying alone with the same thoughts.",
        "th": "การอยู่ใกล้คนที่สนับสนุนอาจช่วยฟื้นใจได้มากกว่าการอยู่คนเดียวกับความคิดเดิมๆ"
      },
      "opportunitiesWatchouts": {
        "en": "An introduction, group, or social setting may bring useful energy or a helpful connection.",
        "th": "การแนะนำ คนกลุ่มใหม่ หรือบรรยากาศทางสังคมอาจพาพลังดีๆ หรือคนที่ช่วยเปิดทางเข้ามา"
      },
      "guidanceToday": {
        "en": "Share something good with people who can celebrate without competing with you.",
        "th": "แบ่งปันสิ่งดีๆ กับคนที่ยินดีกับคุณได้โดยไม่ต้องแข่งขัน"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "A work option may be available but fail to excite you. Check whether you need a better choice or simply a real break.",
        "th": "เรื่องงานอาจมีทางเลือกอยู่แล้วแต่คุณไม่รู้สึกอยากรับ ลองแยกว่าเพราะมันไม่ใช่ หรือเพราะคุณแค่เหนื่อยและต้องพัก"
      },
      "moneyResources": {
        "en": "Do not spend just to feel something different. A pause may reveal whether the purchase solves a real need.",
        "th": "เรื่องเงินอย่าใช้เพียงเพื่อเปลี่ยนอารมณ์ หยุดสักครู่แล้วดูว่าสิ่งที่จะซื้อแก้ความต้องการจริงหรือไม่"
      },
      "loveRelationships": {
        "en": "Emotional flatness does not always mean the relationship is wrong. Sometimes attention needs to return before feeling does.",
        "th": "ความรู้สึกเฉยๆ ไม่ได้แปลว่าความสัมพันธ์ผิดเสมอไป บางครั้งต้องกลับมาใส่ใจก่อน ความรู้สึกจึงจะตามมา"
      },
      "innerBalance": {
        "en": "Apathy can be information. Ask whether you are bored, disappointed, overstimulated, or simply tired.",
        "th": "ความเฉยชาก็เป็นข้อมูล ลองดูว่าเบื่อ ผิดหวัง รับสิ่งต่างๆ มากเกินไป หรือแค่เหนื่อย"
      },
      "opportunitiesWatchouts": {
        "en": "An overlooked option may be worth a second look once you stop comparing it with an imagined perfect one.",
        "th": "ทางเลือกที่มองข้ามอาจน่าสนใจขึ้นเมื่อหยุดเอาไปเทียบกับสิ่งที่สมบูรณ์แบบในจินตนาการ"
      },
      "guidanceToday": {
        "en": "Do not force enthusiasm. Look again when your attention is fresh.",
        "th": "ไม่ต้องบังคับให้ตัวเองตื่นเต้น ลองกลับมามองใหม่เมื่อใจสดขึ้น"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "A setback at work deserves honest acknowledgment, but do not let one loss erase what still functions.",
        "th": "เรื่องงานยอมรับความผิดหวังได้ตรงๆ แต่อย่าให้ความเสียหายจุดเดียวกลบสิ่งที่ยังใช้ได้อยู่"
      },
      "moneyResources": {
        "en": "A financial loss or disappointment needs clear facts before shame takes over. Focus on what remains and what can be repaired.",
        "th": "เรื่องเงิน ถ้ามีความเสียหายหรือผิดหวัง ให้กลับมาดูข้อเท็จจริงก่อนความรู้สึกผิดจะครอบงำ มองสิ่งที่ยังเหลือและแก้ได้"
      },
      "loveRelationships": {
        "en": "Grief in a relationship can be real without meaning everything was wasted. Notice what remains meaningful.",
        "th": "ความเสียใจในความสัมพันธ์เป็นเรื่องจริงได้ โดยไม่แปลว่าทุกอย่างสูญเปล่า ลองมองสิ่งที่ยังมีความหมายอยู่"
      },
      "innerBalance": {
        "en": "Let yourself feel the loss, then gently widen the view beyond what is gone.",
        "th": "อนุญาตให้ตัวเองเสียใจ แล้วค่อยๆ ขยายสายตาออกจากสิ่งที่หายไป"
      },
      "opportunitiesWatchouts": {
        "en": "Something useful may still be standing behind the disappointment, but you may need time before you can see it.",
        "th": "อาจยังมีบางอย่างที่ใช้ต่อได้อยู่หลังความผิดหวัง เพียงแต่ตอนนี้คุณอาจต้องการเวลาก่อนจะมองเห็น"
      },
      "guidanceToday": {
        "en": "Acknowledge the loss, then turn toward what is still available.",
        "th": "ยอมรับสิ่งที่เสียไป แล้วค่อยหันไปหาสิ่งที่ยังมีอยู่"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Past experience can help the work if you use the lesson without assuming the old situation will repeat exactly.",
        "th": "เรื่องงานใช้ประสบการณ์เก่าเป็นบทเรียนได้ โดยไม่ต้องคิดว่าสถานการณ์ใหม่จะซ้ำเดิมทุกอย่าง"
      },
      "moneyResources": {
        "en": "A familiar financial habit may feel safe. Check whether it is still useful now or simply comfortable because you know it.",
        "th": "เรื่องเงิน นิสัยที่คุ้นเคยอาจทำให้รู้สึกปลอดภัย ลองดูว่ายังเหมาะกับตอนนี้จริงหรือแค่สบายเพราะคุ้น"
      },
      "loveRelationships": {
        "en": "Tenderness, history, or reconnection may matter today. Let warmth return without rewriting the past as perfect.",
        "th": "ความอ่อนโยน ความทรงจำ หรือการกลับมาเชื่อมกันอาจมีความหมาย ให้ความอบอุ่นกลับมาได้โดยไม่ต้องทำให้อดีตดูสมบูรณ์แบบ"
      },
      "innerBalance": {
        "en": "Something simple and familiar may soothe you more than another attempt at self-improvement.",
        "th": "สิ่งเรียบง่ายและคุ้นเคยอาจปลอบใจได้มากกว่าการพยายามพัฒนาตัวเองเพิ่มอีกเรื่อง"
      },
      "opportunitiesWatchouts": {
        "en": "A person, skill, idea, or resource from the past may be useful again in a new form.",
        "th": "คน ทักษะ ไอเดีย หรือทรัพยากรจากอดีตอาจกลับมามีประโยชน์ในรูปแบบใหม่"
      },
      "guidanceToday": {
        "en": "Take the warmth and the lesson from the past, not the need to live there again.",
        "th": "รับทั้งความอบอุ่นและบทเรียนจากอดีต โดยไม่ต้องกลับไปอยู่ในอดีตอีกครั้ง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Too many work options can become its own delay. Narrow the field to what is real, useful, and actionable.",
        "th": "เรื่องงาน ทางเลือกมากเกินไปอาจทำให้ช้าเอง คัดเหลือสิ่งที่เป็นไปได้ มีประโยชน์ และลงมือได้จริง"
      },
      "moneyResources": {
        "en": "With money, distinguish a realistic possibility from a tempting fantasy before committing resources.",
        "th": "เรื่องเงินให้แยกความเป็นไปได้จริงออกจากภาพที่น่าดึงดูดแต่ยังไม่มีฐาน ก่อนใส่ทรัพยากรลงไป"
      },
      "loveRelationships": {
        "en": "Do not fall in love with potential while ignoring present behavior. Let the relationship be judged by what is actually happening.",
        "th": "อย่ารักแต่ความเป็นไปได้จนมองข้ามพฤติกรรมปัจจุบัน ให้ความสัมพันธ์ถูกมองจากสิ่งที่เกิดขึ้นจริง"
      },
      "innerBalance": {
        "en": "Your imagination is active, but it needs grounding so every possibility does not feel equally important.",
        "th": "จินตนาการกำลังทำงานมาก แต่ต้องมีหลักให้มันเกาะ เพื่อไม่ให้ทุกความเป็นไปได้ดูสำคัญเท่ากัน"
      },
      "opportunitiesWatchouts": {
        "en": "One option may become clearly stronger once you remove the choices that exist mainly in fantasy.",
        "th": "ทางเลือกหนึ่งอาจเด่นขึ้นทันทีเมื่อเอาตัวเลือกที่อยู่ในจินตนาการเป็นหลักออกไป"
      },
      "guidanceToday": {
        "en": "Reduce the options until the next real choice becomes visible.",
        "th": "ลดตัวเลือกลงจนเห็นทางที่ตัดสินใจได้จริง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "If work no longer gives enough meaning, ask whether the answer is improvement, a boundary, or a gradual exit.",
        "th": "ถ้างานไม่เติมความหมายอีกแล้ว ลองแยกว่าเรื่องนี้ต้องการการปรับ ขอบเขต หรือการค่อยๆ เดินออก"
      },
      "moneyResources": {
        "en": "A resource commitment may no longer be worth what it costs. Be willing to stop funding something that has gone empty.",
        "th": "เรื่องเงิน ภาระบางอย่างอาจไม่คุ้มต้นทุนอีกแล้ว กล้าหยุดใส่ทรัพยากรกับสิ่งที่ไม่มีอะไรตอบกลับ"
      },
      "loveRelationships": {
        "en": "Leaving a connection can be honest when staying only prolongs emptiness. Clarity matters more than drama.",
        "th": "การเดินออกจากความสัมพันธ์อาจเป็นความซื่อตรง เมื่อการอยู่ต่อมีแต่ยืดความว่าง ความชัดสำคัญกว่าความดราม่า"
      },
      "innerBalance": {
        "en": "You may be ready to admit that something no longer feeds you, even if it once mattered deeply.",
        "th": "คุณอาจพร้อมยอมรับว่าสิ่งหนึ่งไม่หล่อเลี้ยงใจแล้ว แม้ครั้งหนึ่งเคยมีความหมายมาก"
      },
      "opportunitiesWatchouts": {
        "en": "A better path may appear only after you stop waiting for the old one to become fulfilling again.",
        "th": "ทางที่ดีกว่าอาจเห็นได้เมื่อหยุดรอให้ทางเดิมกลับมามีความหมายเหมือนเดิม"
      },
      "guidanceToday": {
        "en": "Walk away from what is empty enough to make room for what matters.",
        "th": "เดินออกจากสิ่งที่ว่างพอจะสร้างพื้นที่ให้สิ่งที่มีความหมายกว่า"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Let yourself enjoy a work win or a moment of satisfaction before immediately turning it into another target.",
        "th": "เรื่องงานให้ตัวเองได้พอใจกับสิ่งที่ทำสำเร็จสักพัก ก่อนรีบเปลี่ยนมันเป็นเป้าหมายใหม่"
      },
      "moneyResources": {
        "en": "Enjoy financial comfort within reason. Satisfaction is healthiest when it does not become careless excess.",
        "th": "เรื่องเงินชื่นชมความสบายที่มีได้เต็มที่ ตราบเท่าที่ความพอใจไม่กลายเป็นการใช้เกินแบบไม่คิด"
      },
      "loveRelationships": {
        "en": "Pleasure and affection deserve to be enjoyed without demanding that they prove the future of the relationship.",
        "th": "ความสุขและความรักควรถูกสัมผัสได้โดยไม่ต้องบังคับให้มันพิสูจน์อนาคตของความสัมพันธ์ทันที"
      },
      "innerBalance": {
        "en": "Let enough be enough for a moment. Constant wanting can hide how much is already working.",
        "th": "ปล่อยให้คำว่าพอมีพื้นที่บ้าง ความอยากต่อเนื่องอาจทำให้มองไม่เห็นว่าสิ่งที่มีอยู่กำลังดีแค่ไหน"
      },
      "opportunitiesWatchouts": {
        "en": "A wish may be closer to reality than you think, especially if you can receive the result without immediately moving the goalpost.",
        "th": "สิ่งที่หวังอาจใกล้กว่าที่คิด โดยเฉพาะเมื่อคุณรับผลนั้นได้โดยไม่รีบเลื่อนเส้นชัยออกไปอีก"
      },
      "guidanceToday": {
        "en": "Enjoy what is here without making enjoyment the end of growth.",
        "th": "มีความสุขกับสิ่งที่มี โดยไม่ต้องให้ความสุขกลายเป็นจุดจบของการเติบโต"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Work feels stronger when the people involved trust each other and share a real sense of what success means.",
        "th": "เรื่องงานจะแข็งแรงขึ้นเมื่อคนที่เกี่ยวข้องไว้ใจกัน และเข้าใจร่วมกันว่าความสำเร็จหมายถึงอะไร"
      },
      "moneyResources": {
        "en": "Think about money as part of the life you are building with others, not only as a private score.",
        "th": "เรื่องเงินลองมองเป็นส่วนหนึ่งของชีวิตที่กำลังสร้างร่วมกับคนอื่น ไม่ใช่ตัวเลขส่วนตัวอย่างเดียว"
      },
      "loveRelationships": {
        "en": "Love is supported by safety, belonging, and shared values today. Notice where you can relax into genuine connection.",
        "th": "ความรักวันนี้ได้รับแรงจากความปลอดภัย ความรู้สึกเป็นส่วนหนึ่ง และคุณค่าร่วม ลองสังเกตว่าที่ไหนคุณวางใจได้จริง"
      },
      "innerBalance": {
        "en": "Your emotional system may settle around people and places that remind you that you belong.",
        "th": "ใจอาจสงบขึ้นเมื่ออยู่ใกล้คนหรือพื้นที่ที่ทำให้รู้สึกว่าเป็นส่วนหนึ่งจริงๆ"
      },
      "opportunitiesWatchouts": {
        "en": "A supportive community or shared vision may open more than individual effort alone.",
        "th": "ชุมชนที่สนับสนุนหรือภาพร่วมเดียวกันอาจเปิดทางได้มากกว่าการพยายามคนเดียว"
      },
      "guidanceToday": {
        "en": "Invest in the people and places where trust can keep growing.",
        "th": "ใส่ใจคนและพื้นที่ที่ความไว้ใจยังเติบโตต่อได้"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "A creative idea or subtle message at work may deserve attention even if it is not fully formed yet.",
        "th": "เรื่องงาน ไอเดียสร้างสรรค์หรือสัญญาณเล็กๆ บางอย่างอาจควรได้รับความสนใจ แม้ยังไม่เป็นรูปเป็นร่าง"
      },
      "moneyResources": {
        "en": "A small money idea may be worth exploring, but keep it light until the practical details are clear.",
        "th": "เรื่องเงิน ไอเดียเล็กๆ อาจน่าลองสำรวจ แต่ยังไม่ต้องลงหนักจนกว่ารายละเอียดจริงจะชัด"
      },
      "loveRelationships": {
        "en": "Stay open to a sweet, honest, or unexpected emotional exchange without overinterpreting it too quickly.",
        "th": "ความสัมพันธ์อาจมีช่วงที่น่ารัก จริงใจ หรือคาดไม่ถึง เปิดรับได้โดยไม่ต้องรีบตีความเกินสิ่งที่เกิดขึ้น"
      },
      "innerBalance": {
        "en": "Your sensitivity is picking up more than usual. Stay curious about the feeling instead of turning it into a conclusion.",
        "th": "ความอ่อนไหววันนี้รับรายละเอียดได้มากกว่าปกติ สงสัยใคร่รู้กับความรู้สึกได้โดยไม่ต้องรีบสรุป"
      },
      "opportunitiesWatchouts": {
        "en": "A small invitation or creative opening could become meaningful if you give it enough attention to develop.",
        "th": "คำชวนหรือช่องทางสร้างสรรค์เล็กๆ อาจมีความหมายขึ้นมาได้ ถ้าให้เวลาและความสนใจพอ"
      },
      "guidanceToday": {
        "en": "Follow the gentle signal before demanding a big answer from it.",
        "th": "ตามสัญญาณเบาๆ ไปก่อน โดยยังไม่ต้องเรียกร้องคำตอบใหญ่จากมัน"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Bring sincerity and imagination into work, but make sure the beautiful idea can survive contact with reality.",
        "th": "เรื่องงานใช้ทั้งความจริงใจและจินตนาการได้ แต่ต้องดูด้วยว่าไอเดียที่สวยนั้นอยู่กับความจริงได้หรือไม่"
      },
      "moneyResources": {
        "en": "Do not let mood alone steer money. A heartfelt choice still needs numbers and practical limits.",
        "th": "เรื่องเงินอย่าให้อารมณ์เป็นคนขับทั้งหมด การเลือกจากใจก็ยังต้องมีตัวเลขและขอบเขตจริงรองรับ"
      },
      "loveRelationships": {
        "en": "Romance, affection, or an honest emotional gesture can move a relationship today when actions support the feeling.",
        "th": "ความโรแมนติก ความเอ็นดู หรือการแสดงความรู้สึกจริงใจช่วยให้ความสัมพันธ์ขยับได้ เมื่อการกระทำเดินตามความรู้สึก"
      },
      "innerBalance": {
        "en": "Your heart has something to say. Listen without handing it the steering wheel alone.",
        "th": "หัวใจมีบางอย่างอยากบอก ฟังได้เต็มที่โดยไม่ต้องให้มันขับรถคนเดียว"
      },
      "opportunitiesWatchouts": {
        "en": "An invitation, proposal, or emotional opportunity may be worth considering if it has substance beneath the charm.",
        "th": "คำชวน ข้อเสนอ หรือโอกาสทางความรู้สึกอาจน่าสนใจ ถ้ามีเนื้อจริงอยู่ใต้ความน่าดึงดูด"
      },
      "guidanceToday": {
        "en": "Let feeling lead the conversation, then let reality help make the decision.",
        "th": "ให้ความรู้สึกเปิดบทสนทนา แล้วให้ความจริงช่วยตัดสินใจ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Read the room at work without absorbing everyone’s mood as your responsibility.",
        "th": "เรื่องงานอ่านบรรยากาศได้ แต่ไม่จำเป็นต้องรับอารมณ์ของทุกคนมาเป็นหน้าที่ของคุณ"
      },
      "moneyResources": {
        "en": "Generosity is good when it stays sustainable. Do not solve someone else’s financial discomfort by creating your own.",
        "th": "เรื่องเงิน ความใจกว้างจะดีเมื่อทำต่อได้ อย่าแก้ความลำบากของคนอื่นด้วยการสร้างความลำบากให้ตัวเอง"
      },
      "loveRelationships": {
        "en": "Listen deeply, but keep your emotional boundaries. Caring does not require losing track of your own needs.",
        "th": "ความสัมพันธ์ให้ฟังได้ลึก แต่รักษาขอบเขตทางอารมณ์ไว้ การใส่ใจไม่จำเป็นต้องลืมความต้องการของตัวเอง"
      },
      "innerBalance": {
        "en": "Sensitivity is information, not an obligation. Notice what you feel and decide what actually belongs to you.",
        "th": "ความอ่อนไหวเป็นข้อมูล ไม่ใช่ภาระ สังเกตสิ่งที่รู้สึกแล้วแยกให้ได้ว่าอะไรเป็นของคุณจริง"
      },
      "opportunitiesWatchouts": {
        "en": "A compassionate response may open a difficult situation, especially when it comes with clear boundaries.",
        "th": "การตอบด้วยความเข้าใจอาจเปิดสถานการณ์ยากๆ ได้ โดยเฉพาะเมื่อมาพร้อมขอบเขตที่ชัด"
      },
      "guidanceToday": {
        "en": "Stay soft enough to feel and clear enough to know what is yours.",
        "th": "อ่อนโยนพอที่จะรู้สึก และชัดพอที่จะรู้ว่าอะไรเป็นของคุณ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Bring emotional steadiness into work. You can acknowledge tension without letting it set the tone for every decision.",
        "th": "เรื่องงานใช้ความมั่นคงทางอารมณ์เป็นหลัก รับรู้ความตึงเครียดได้โดยไม่ต้องให้มันกำหนดทุกการตัดสินใจ"
      },
      "moneyResources": {
        "en": "Keep money choices calm and measured, especially if other people are reacting strongly around you.",
        "th": "เรื่องเงินให้ตัดสินใจอย่างสงบและพอดี โดยเฉพาะเมื่อคนรอบตัวกำลังมีอารมณ์แรง"
      },
      "loveRelationships": {
        "en": "Offer warmth without being swept into every emotional wave. Mature care can stay present and grounded.",
        "th": "ความสัมพันธ์ให้ความอบอุ่นได้โดยไม่ต้องถูกดึงไปกับทุกคลื่นอารมณ์ การดูแลที่โตพออยู่กับความจริงได้"
      },
      "innerBalance": {
        "en": "Your strength today is the ability to feel fully while choosing your response carefully.",
        "th": "พลังใจวันนี้คือรู้สึกได้เต็มที่ แต่เลือกวิธีตอบสนองอย่างรอบคอบ"
      },
      "opportunitiesWatchouts": {
        "en": "A calm presence may become the opening others need in a charged situation.",
        "th": "ความนิ่งของคุณอาจเป็นช่องเปิดที่คนอื่นต้องการในสถานการณ์ที่อารมณ์สูง"
      },
      "guidanceToday": {
        "en": "Feel everything you need to feel, then respond from your steadier self.",
        "th": "รู้สึกให้ครบ แล้วตอบจากส่วนที่นิ่งกว่าของตัวเอง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Name the real work issue clearly before solving the wrong problem efficiently.",
        "th": "เรื่องงานให้เรียกปัญหาหลักให้ตรงก่อน ไม่อย่างนั้นอาจเก่งมากกับการแก้ผิดเรื่อง"
      },
      "moneyResources": {
        "en": "Put the numbers and terms in plain view. A clear financial fact can cut through a lot of anxiety.",
        "th": "เรื่องเงินวางตัวเลขและเงื่อนไขให้เห็นตรงๆ ข้อเท็จจริงที่ชัดเพียงอย่างเดียวอาจตัดความกังวลออกไปได้มาก"
      },
      "loveRelationships": {
        "en": "Say what the relationship is actually about today. Clarity can be kinder than vague reassurance.",
        "th": "ความสัมพันธ์วันนี้ควรพูดให้ตรงว่าประเด็นจริงคืออะไร ความชัดอาจเมตตากว่าการปลอบแบบกำกวม"
      },
      "innerBalance": {
        "en": "Your mind wants a clean truth. Separate the central issue from the noise around it.",
        "th": "ใจต้องการความจริงที่ชัด แยกประเด็นหลักออกจากเสียงรบกวนรอบๆ"
      },
      "opportunitiesWatchouts": {
        "en": "A new idea, fact, or conversation may create a breakthrough if you are willing to follow the truth where it leads.",
        "th": "ไอเดีย ข้อเท็จจริง หรือบทสนทนาใหม่อาจเปิดทาง ถ้าคุณพร้อมตามความจริงไปจนสุด"
      },
      "guidanceToday": {
        "en": "Clarify first. Decide second.",
        "th": "ทำให้ชัดก่อน แล้วค่อยตัดสินใจ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Work may be waiting on a decision that cannot be postponed forever. Gather enough information, then choose.",
        "th": "เรื่องงานอาจค้างอยู่ที่การตัดสินใจที่เลื่อนไม่ได้ตลอด รวบรวมข้อมูลให้พอแล้วเลือก"
      },
      "moneyResources": {
        "en": "With money, avoiding the decision is still a decision. Set a point at which you have enough information to act.",
        "th": "เรื่องเงิน การไม่เลือกก็คือการเลือกแบบหนึ่ง กำหนดไว้เลยว่าข้อมูลระดับไหนถือว่าพอให้ตัดสินใจ"
      },
      "loveRelationships": {
        "en": "A relationship cannot stay peaceful forever by avoiding the real topic. Calm honesty is better than prolonged suspension.",
        "th": "ความสัมพันธ์ไม่อาจสงบด้วยการหลบประเด็นจริงตลอดไป ความซื่อตรงแบบสงบดีกว่าการค้างไว้เรื่อยๆ"
      },
      "innerBalance": {
        "en": "Indecision may be protecting you from discomfort, but it is also using energy every day.",
        "th": "ความลังเลอาจช่วยเลี่ยงความไม่สบายใจ แต่ก็ใช้พลังของคุณทุกวันเช่นกัน"
      },
      "opportunitiesWatchouts": {
        "en": "The opening comes when you stop waiting for perfect certainty and accept a reasonable level of unknown.",
        "th": "ทางจะเปิดเมื่อหยุดรอความแน่นอนสมบูรณ์ และยอมรับความไม่รู้ในระดับที่รับได้"
      },
      "guidanceToday": {
        "en": "Know enough, then choose instead of circling the same decision.",
        "th": "รู้ให้พอ แล้วเลือก แทนการวนอยู่กับคำถามเดิม"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "A painful work truth may need to be named before the team or project can actually heal and improve.",
        "th": "เรื่องงาน ความจริงที่เจ็บบางอย่างอาจต้องถูกพูดก่อน งานหรือทีมจึงจะเริ่มฟื้นและดีขึ้นได้จริง"
      },
      "moneyResources": {
        "en": "If money has disappointed you, face the facts without turning the mistake into a judgment of your worth.",
        "th": "ถ้าเรื่องเงินทำให้ผิดหวัง กลับมาดูข้อเท็จจริงโดยไม่เปลี่ยนความผิดพลาดให้กลายเป็นคำตัดสินคุณค่าของตัวเอง"
      },
      "loveRelationships": {
        "en": "Heartache deserves honesty. Do not minimize what hurt just to make the relationship look easier than it is.",
        "th": "ความเจ็บใจควรถูกยอมรับตรงๆ ไม่ต้องทำให้มันดูเล็กลงเพื่อให้ความสัมพันธ์ดูง่ายกว่าความจริง"
      },
      "innerBalance": {
        "en": "Pain becomes easier to move through when you stop arguing that you should not feel it.",
        "th": "ความเจ็บจะผ่านง่ายขึ้นเมื่อหยุดเถียงกับตัวเองว่าไม่ควรรู้สึกแบบนี้"
      },
      "opportunitiesWatchouts": {
        "en": "A difficult truth may clear space for a more honest conversation, boundary, or beginning.",
        "th": "ความจริงที่ยากอาจเปิดพื้นที่ให้บทสนทนา ขอบเขต หรือการเริ่มต้นที่ซื่อตรงกว่าเดิม"
      },
      "guidanceToday": {
        "en": "Name the hurt clearly, then choose what helps it heal rather than repeat.",
        "th": "เรียกความเจ็บให้ตรง แล้วเลือกสิ่งที่ช่วยเยียวยาแทนการทำซ้ำ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Rest is part of the work today. A tired mind can turn a simple problem into a complicated one.",
        "th": "เรื่องงาน การพักเป็นส่วนหนึ่งของงานวันนี้ ใจที่ล้าอาจทำปัญหาง่ายให้ซับซ้อนเกินจริง"
      },
      "moneyResources": {
        "en": "Do not make a major money choice merely because you are mentally exhausted by thinking about it.",
        "th": "เรื่องเงินอย่าตัดสินใจเรื่องใหญ่เพียงเพราะเหนื่อยกับการคิดเรื่องนั้นมานาน"
      },
      "loveRelationships": {
        "en": "A pause in communication can be healthy if it is used to settle, not to punish or disappear.",
        "th": "ในความสัมพันธ์ การเว้นจังหวะคุยอาจเป็นเรื่องดี ถ้าใช้เพื่อให้ใจสงบ ไม่ใช่เพื่อทำโทษอีกฝ่ายหรือหายไปเฉยๆ"
      },
      "innerBalance": {
        "en": "Your mind needs recovery more than another problem to solve.",
        "th": "ใจต้องการการฟื้นมากกว่าปัญหาใหม่ให้คิดเพิ่ม"
      },
      "opportunitiesWatchouts": {
        "en": "Clarity may return after rest. The opportunity is not always in more effort.",
        "th": "ความชัดอาจกลับมาหลังได้พัก โอกาสไม่ได้อยู่ที่การพยายามเพิ่มเสมอไป"
      },
      "guidanceToday": {
        "en": "Protect a quiet interval and let your mind reset.",
        "th": "กันช่วงเงียบไว้ให้ตัวเอง แล้วปล่อยให้ใจได้ตั้งหลักใหม่"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Winning the argument at work may cost cooperation. Decide whether the point is worth the damage.",
        "th": "เรื่องงาน การชนะข้อโต้เถียงอาจแลกกับความร่วมมือ ลองดูว่าประเด็นนั้นคุ้มกับความเสียหายหรือไม่"
      },
      "moneyResources": {
        "en": "Do not let pride turn a money disagreement into a more expensive problem than the original issue.",
        "th": "เรื่องเงินอย่าให้อัตตาเปลี่ยนความเห็นต่างให้กลายเป็นปัญหาที่แพงกว่าต้นเหตุ"
      },
      "loveRelationships": {
        "en": "A conflict can leave both people feeling smaller even when one person technically wins. Choose dignity over scoring points.",
        "th": "ในความสัมพันธ์ ความขัดแย้งอาจทำร้ายทั้งสองฝ่ายได้ แม้คนหนึ่งจะเป็นฝ่ายชนะ เลือกรักษาศักดิ์ศรีของกันและกันมากกว่าการเอาชนะ"
      },
      "innerBalance": {
        "en": "Notice whether your mind is seeking resolution or simply trying to prove that it was right.",
        "th": "สังเกตว่าใจต้องการคลี่คลายจริง หรือแค่พยายามพิสูจน์ว่าตัวเองถูก"
      },
      "opportunitiesWatchouts": {
        "en": "Walking away from an unwinnable dynamic may create more value than one more round of conflict.",
        "th": "การถอยจากเกมที่ไม่มีใครชนะอาจสร้างคุณค่ามากกว่าการสู้เพิ่มอีกหนึ่งรอบ"
      },
      "guidanceToday": {
        "en": "Protect the relationship with yourself from battles that are not worth winning.",
        "th": "ปกป้องความสัมพันธ์กับตัวเองจากศึกที่ไม่คุ้มแม้จะชนะ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Move the work toward the calmer, clearer option even if the transition is not glamorous yet.",
        "th": "เรื่องงานเลือกทางที่พาไปสู่ความชัดและสงบขึ้น แม้ช่วงเปลี่ยนผ่านยังไม่สวยงาม"
      },
      "moneyResources": {
        "en": "A gradual financial transition may be wiser than demanding an instant fix. Reduce turbulence step by step.",
        "th": "เรื่องเงิน การเปลี่ยนแบบค่อยเป็นค่อยไปอาจดีกว่าการบังคับให้จบทีเดียว ลดความวุ่นวายทีละขั้น"
      },
      "loveRelationships": {
        "en": "A relationship may need distance from the old conflict before both people can see the next shore clearly.",
        "th": "ความสัมพันธ์อาจต้องการระยะห่างจากความขัดแย้งเดิม ก่อนจะมองเห็นฝั่งถัดไปชัด"
      },
      "innerBalance": {
        "en": "You do not need to feel fully better before you start moving toward something calmer.",
        "th": "คุณไม่จำเป็นต้องรู้สึกดีทั้งหมดก่อนเริ่มขยับไปทางที่สงบกว่า"
      },
      "opportunitiesWatchouts": {
        "en": "A better environment, conversation, or routine may support the transition more than willpower alone.",
        "th": "สภาพแวดล้อม บทสนทนา หรือกิจวัตรที่ดีกว่าอาจช่วยการเปลี่ยนผ่านได้มากกว่าพึ่งแรงใจอย่างเดียว"
      },
      "guidanceToday": {
        "en": "Choose the direction with less unnecessary turmoil and keep moving gently.",
        "th": "เลือกทิศที่มีความวุ่นวายน้อยลง แล้วค่อยๆ ไปต่อ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Work may call for discretion and strategy, but keep the plan honest enough that you can stand behind it later.",
        "th": "เรื่องงานอาจต้องใช้ชั้นเชิงและความเป็นส่วนตัว แต่ให้แผนนั้นซื่อตรงพอที่ภายหลังคุณยังยืนอยู่กับมันได้"
      },
      "moneyResources": {
        "en": "Be careful with money shortcuts, hidden terms, or assumptions that only work if nobody asks questions.",
        "th": "เรื่องเงินระวังทางลัด เงื่อนไขที่ซ่อนอยู่ หรือสมมติฐานที่ใช้ได้เฉพาะตอนยังไม่มีใครถาม"
      },
      "loveRelationships": {
        "en": "Privacy is healthy; secrecy that protects deception is different. Know which one you are choosing in the relationship.",
        "th": "ในความสัมพันธ์ ความเป็นส่วนตัวเป็นเรื่องปกติ แต่การเก็บความลับเพื่อปกปิดการหลอกลวงเป็นอีกเรื่อง ลองแยกให้ชัดว่าตอนนี้เป็นแบบไหน"
      },
      "innerBalance": {
        "en": "Your mind may be looking for the clever escape. Check whether the direct path is actually safer.",
        "th": "ใจอาจกำลังมองทางออกที่ฉลาดที่สุด ลองดูว่าทางตรงจริงๆ แล้วปลอดภัยกว่าหรือไม่"
      },
      "opportunitiesWatchouts": {
        "en": "A strategic move can work if it protects something legitimate without sacrificing integrity.",
        "th": "การขยับเชิงกลยุทธ์อาจได้ผล ถ้าปกป้องสิ่งที่สมควรโดยไม่ต้องเสียความซื่อตรง"
      },
      "guidanceToday": {
        "en": "Use strategy, but do not make yourself the person you would distrust.",
        "th": "ใช้ชั้นเชิงได้ แต่อย่าทำให้ตัวเองกลายเป็นคนที่คุณเองก็คงไม่ไว้ใจ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "At work, test which limit is truly fixed and which one is simply an assumption nobody has challenged yet.",
        "th": "เรื่องงานลองทดสอบว่าข้อจำกัดไหนเปลี่ยนไม่ได้จริง และข้อไหนเป็นเพียงสมมติฐานที่ยังไม่มีใครตั้งคำถาม"
      },
      "moneyResources": {
        "en": "A tight money situation may still contain one or two choices. Find the smallest area where you still have control.",
        "th": "สถานการณ์เงินที่ตึงอาจยังมีทางเลือกอยู่หนึ่งหรือสองจุด หาให้เจอว่าตรงไหนยังอยู่ในการควบคุมของคุณ"
      },
      "loveRelationships": {
        "en": "Feeling trapped in a relationship is important information. Separate what is externally limited from what fear is telling you is impossible.",
        "th": "ความรู้สึกติดอยู่ในความสัมพันธ์เป็นข้อมูลสำคัญ แยกข้อจำกัดจริงออกจากสิ่งที่ความกลัวบอกว่าเป็นไปไม่ได้"
      },
      "innerBalance": {
        "en": "The mind can turn repeated fear into a wall. Question one belief that has started to feel permanent.",
        "th": "ใจสามารถเปลี่ยนความกลัวที่วนซ้ำให้เหมือนกำแพง ลองตั้งคำถามกับความเชื่อหนึ่งอย่างที่เริ่มดูถาวรเกินจริง"
      },
      "opportunitiesWatchouts": {
        "en": "An option may appear when you stop asking for total freedom and look for the next available movement.",
        "th": "ทางเลือกอาจปรากฏเมื่อหยุดรออิสระทั้งหมด แล้วมองหาการขยับที่ทำได้ถัดไป"
      },
      "guidanceToday": {
        "en": "Test one limit instead of accepting every limit at face value.",
        "th": "ทดลองขยับข้อจำกัดหนึ่งจุด แทนการเชื่อทุกข้อจำกัดตามที่มันดู"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Worry may be distorting the work. Write down the actual problem and the next practical action before thinking further.",
        "th": "เรื่องงาน ความกังวลอาจทำให้ปัญหาดูใหญ่เกินจริง เขียนปัญหาจริงและก้าวถัดไปที่ทำได้ก่อนคิดต่อ"
      },
      "moneyResources": {
        "en": "Money anxiety needs numbers, not endless mental rehearsal. Check the facts and choose one concrete response.",
        "th": "ความกังวลเรื่องเงินต้องการตัวเลข ไม่ใช่การคิดวน เช็กข้อเท็จจริงแล้วเลือกการตอบสนองที่ทำได้จริงหนึ่งอย่าง"
      },
      "loveRelationships": {
        "en": "Do not assume the worst about a relationship in silence. A grounded conversation may correct what fear has been filling in.",
        "th": "ความสัมพันธ์อย่าปล่อยให้ความกลัวเติมคำตอบเองในความเงียบ บทสนทนาที่อยู่กับความจริงอาจแก้ภาพที่คิดไปเองได้"
      },
      "innerBalance": {
        "en": "Your mind may be louder than the situation. Rest, facts, and one human conversation can help lower the volume.",
        "th": "ใจอาจดังกว่าสถานการณ์จริง การพัก ข้อเท็จจริง และการคุยกับคนหนึ่งคนอาจช่วยลดเสียงนั้น"
      },
      "opportunitiesWatchouts": {
        "en": "Relief may come from making the fear specific enough to address rather than trying to stop feeling anxious altogether.",
        "th": "ความโล่งอาจมาจากการทำให้ความกลัวเจาะจงพอจะแก้ได้ มากกว่าพยายามหยุดกังวลทั้งหมด"
      },
      "guidanceToday": {
        "en": "Bring the worry into daylight and give it one practical next step.",
        "th": "พาความกังวลออกมาอยู่กับความจริง แล้วให้มันมีขั้นตอนถัดไปที่ทำได้หนึ่งอย่าง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "A work chapter may truly be over. Stop spending energy trying to revive the exact version that failed.",
        "th": "เรื่องงานบางบทอาจจบจริงแล้ว หยุดใช้แรงพยายามชุบรูปแบบเดิมที่ไปต่อไม่ได้"
      },
      "moneyResources": {
        "en": "A financial loss or ending may need a clean stop. Protect the future from repeatedly paying for the past.",
        "th": "เรื่องเงิน ความเสียหายหรือภาระบางอย่างอาจต้องหยุดให้ชัด ปกป้องอนาคตจากการจ่ายซ้ำเพื่ออดีต"
      },
      "loveRelationships": {
        "en": "An ending hurts, but replaying it does not restore the relationship. Turn attention toward what recovery asks now.",
        "th": "ความสัมพันธ์ที่จบทำให้เจ็บได้ แต่การย้อนตอนจบซ้ำไม่ทำให้มันกลับมา หันมาดูว่าตอนนี้การฟื้นตัวต้องการอะไร"
      },
      "innerBalance": {
        "en": "You may not need another explanation. You may need permission to stop reliving the same conclusion.",
        "th": "คุณอาจไม่ได้ต้องการคำอธิบายเพิ่ม แต่อาจต้องการอนุญาตให้ตัวเองหยุดกลับไปอยู่กับตอนจบเดิม"
      },
      "opportunitiesWatchouts": {
        "en": "The next opening begins after you accept that this version of the story is finished.",
        "th": "ช่องทางใหม่เริ่มเห็นได้หลังยอมรับว่าเรื่องนี้ในรูปแบบเดิมจบแล้ว"
      },
      "guidanceToday": {
        "en": "Let the ending be an ending so your energy can return to the future.",
        "th": "ปล่อยให้ตอนจบเป็นตอนจบ เพื่อให้พลังของคุณกลับไปหาอนาคต"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Ask better questions at work and verify what you hear before building a decision on it.",
        "th": "เรื่องงานถามให้ดีขึ้นและตรวจสิ่งที่ได้ยินก่อนเอาไปเป็นฐานตัดสินใจ"
      },
      "moneyResources": {
        "en": "Read the terms, check the numbers, and stay curious about what a money offer is not saying clearly.",
        "th": "เรื่องเงินอ่านเงื่อนไข ดูตัวเลข และสงสัยกับส่วนที่ข้อเสนอยังพูดไม่ชัด"
      },
      "loveRelationships": {
        "en": "Curiosity can help a relationship if it sounds like a genuine question rather than an interrogation.",
        "th": "ความสัมพันธ์ได้ประโยชน์จากความอยากรู้ ถ้าคำถามมาจากความสนใจจริง ไม่ใช่การสอบสวน"
      },
      "innerBalance": {
        "en": "Your mind is quick today. Use that sharpness to investigate, not to jump to conclusions.",
        "th": "ความคิดวันนี้ไว ใช้ความคมกับการค้นหาและตรวจสอบ มากกว่าการรีบสรุป"
      },
      "opportunitiesWatchouts": {
        "en": "A useful fact, message, or new perspective may appear if you keep asking instead of assuming.",
        "th": "ข้อเท็จจริง ข้อความ หรือมุมมองใหม่อาจโผล่มา ถ้าคุณยังถามต่อแทนการเดา"
      },
      "guidanceToday": {
        "en": "Stay curious long enough for the evidence to catch up with the idea.",
        "th": "อยากรู้อยากเห็นให้นานพอที่หลักฐานจะตามทันความคิด"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Make the work decision and move once the target is clear. Do not confuse speed with having skipped the thinking.",
        "th": "เรื่องงานเมื่อเป้าหมายชัดแล้วให้ตัดสินใจและขยับ ความเร็วไม่ควรเกิดจากการข้ามการคิด"
      },
      "moneyResources": {
        "en": "A fast financial response may be needed, but confirm the facts before acting decisively.",
        "th": "เรื่องเงินอาจต้องตอบเร็ว แต่ควรยืนยันข้อเท็จจริงก่อนขยับแบบเด็ดขาด"
      },
      "loveRelationships": {
        "en": "Direct conversation can cut through a relationship stalemate, but bluntness is not the same as honesty.",
        "th": "ในความสัมพันธ์ การคุยกันตรงๆ ช่วยคลี่คลายเรื่องค้างได้ แต่การพูดห้วนหรือแรงไม่ใช่เรื่องเดียวกับความซื่อตรง"
      },
      "innerBalance": {
        "en": "Your mind wants movement. Give it a clear problem to solve instead of letting urgency become the mood of the day.",
        "th": "ใจอยากขยับ ให้มันมีปัญหาที่ชัดให้แก้ แทนการปล่อยให้ความเร่งรีบกลายเป็นอารมณ์หลักของวัน"
      },
      "opportunitiesWatchouts": {
        "en": "A stalled situation may respond well to decisive action once you know exactly what you are aiming for.",
        "th": "สถานการณ์ที่ค้างอาจตอบรับการขยับเด็ดขาดได้ดี เมื่อคุณรู้ชัดว่ากำลังมุ่งไปที่อะไร"
      },
      "guidanceToday": {
        "en": "Think fast if needed, but decide from clarity rather than adrenaline.",
        "th": "คิดเร็วได้เมื่อจำเป็น แต่ตัดสินจากความชัด ไม่ใช่จากอะดรีนาลีน"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Clear work boundaries and precise language can prevent confusion before it becomes conflict.",
        "th": "เรื่องงาน ขอบเขตชัดและคำพูดตรงช่วยกันความสับสนก่อนกลายเป็นความขัดแย้ง"
      },
      "moneyResources": {
        "en": "Be exact with money today. Know the amount, the condition, and the limit instead of relying on vague comfort.",
        "th": "เรื่องเงินให้เจาะจง รู้จำนวน เงื่อนไข และขอบเขต แทนการพึ่งความสบายใจแบบกำกวม"
      },
      "loveRelationships": {
        "en": "Say the truth cleanly in the relationship without sharpening it into a weapon.",
        "th": "ความสัมพันธ์พูดความจริงให้ชัดได้ โดยไม่ต้องทำให้คมจนกลายเป็นอาวุธ"
      },
      "innerBalance": {
        "en": "Your peace may depend on a boundary you have been reluctant to state plainly.",
        "th": "ความสงบของใจอาจขึ้นอยู่กับขอบเขตที่คุณยังไม่กล้าพูดให้ตรง"
      },
      "opportunitiesWatchouts": {
        "en": "A clear no, a clear yes, or a clear question may open more than another round of ambiguity.",
        "th": "คำว่าไม่ที่ชัด คำว่าใช่ที่ชัด หรือคำถามที่ชัด อาจเปิดทางได้มากกว่าความกำกวมรอบใหม่"
      },
      "guidanceToday": {
        "en": "Be precise, fair, and clean with your words.",
        "th": "พูดให้เจาะจง เป็นธรรม และไม่ทิ้งแผลเกินจำเป็น"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Use evidence, principles, and consistency to make the work decision. Personal preference should not quietly become the rule.",
        "th": "เรื่องงานให้ใช้หลักฐาน หลักการ และความสม่ำเสมอตัดสิน อย่าให้ความชอบส่วนตัวแอบกลายเป็นกฎ"
      },
      "moneyResources": {
        "en": "Treat money as a system to manage, not a mood to react to. Clear criteria improve judgment.",
        "th": "เรื่องเงินให้มองเป็นระบบที่ต้องจัดการ ไม่ใช่อารมณ์ที่ต้องตอบสนอง เกณฑ์ชัดจะช่วยตัดสินดีขึ้น"
      },
      "loveRelationships": {
        "en": "A relationship may need thoughtful honesty more than emotional intensity. Be clear while remembering there is a person receiving the truth.",
        "th": "ความสัมพันธ์อาจต้องการความซื่อตรงที่คิดรอบคอบมากกว่าอารมณ์แรง พูดชัดโดยไม่ลืมว่ามีคนจริงๆ รับคำพูดนั้น"
      },
      "innerBalance": {
        "en": "Mental authority is useful when it stays connected to humanity and not only correctness.",
        "th": "ความชัดทางความคิดมีประโยชน์เมื่อยังเชื่อมกับความเป็นมนุษย์ ไม่ใช่ความถูกต้องอย่างเดียว"
      },
      "opportunitiesWatchouts": {
        "en": "You may be in a position to make an important call. Strong judgment comes from both clarity and accountability.",
        "th": "คุณอาจอยู่ในจุดที่ต้องตัดสินเรื่องสำคัญ การตัดสินที่ดีต้องมีทั้งความชัดและความรับผิดชอบ"
      },
      "guidanceToday": {
        "en": "Decide by principle, then own the human consequences.",
        "th": "ตัดสินด้วยหลักการ แล้วรับผิดชอบต่อผลที่เกิดกับคนจริงๆ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Turn a practical work opportunity into something concrete: a meeting, draft, application, budget, or first deliverable.",
        "th": "เรื่องงานทำโอกาสที่จับต้องได้ให้เป็นรูปธรรม ไม่ว่าจะเป็นนัดหมาย ร่างงาน สมัคร งบ หรือชิ้นงานแรก"
      },
      "moneyResources": {
        "en": "A useful financial opening may be present. Give it a real structure before assuming it will grow on its own.",
        "th": "เรื่องเงินอาจมีช่องทางที่ใช้ได้จริง ทำให้มันมีโครงชัดก่อนคิดว่าจะเติบโตได้เอง"
      },
      "loveRelationships": {
        "en": "A relationship can benefit from practical care today: time, consistency, help, or a promise you can actually keep.",
        "th": "ความสัมพันธ์ได้ประโยชน์จากการดูแลที่จับต้องได้ เช่น เวลา ความสม่ำเสมอ ความช่วยเหลือ หรือคำสัญญาที่ทำได้จริง"
      },
      "innerBalance": {
        "en": "Ground yourself in something physical and real. Small evidence of stability can settle the mind.",
        "th": "พาใจกลับมาอยู่กับสิ่งที่จับต้องได้ หลักฐานเล็กๆ ของความมั่นคงอาจช่วยให้ใจนิ่ง"
      },
      "opportunitiesWatchouts": {
        "en": "A modest but real opportunity may be more valuable than something exciting that has no foundation yet.",
        "th": "โอกาสที่เรียบแต่มีฐานจริงอาจมีค่ากว่าสิ่งที่น่าตื่นเต้นแต่ยังไม่มีราก"
      },
      "guidanceToday": {
        "en": "Give one good possibility a real place in your day.",
        "th": "ให้โอกาสที่ดีหนึ่งอย่างมีพื้นที่เกิดขึ้นจริงในวันนี้"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Juggle less by choosing the true priority. Flexibility works only when you know what can move and what cannot.",
        "th": "เรื่องงานจัดหลายอย่างให้ง่ายขึ้นด้วยการเลือกสิ่งสำคัญจริง ความยืดหยุ่นจะใช้ได้เมื่อรู้ว่าอะไรขยับได้และอะไรไม่ได้"
      },
      "moneyResources": {
        "en": "Balance cash, time, and obligations instead of pretending they all deserve equal weight right now.",
        "th": "เรื่องเงินให้บาลานซ์เงินสด เวลา และภาระ โดยไม่ต้องทำเหมือนทุกอย่างสำคัญเท่ากันตอนนี้"
      },
      "loveRelationships": {
        "en": "A relationship may need practical flexibility around schedules or demands without making either person feel permanently second place.",
        "th": "ความสัมพันธ์อาจต้องยืดหยุ่นเรื่องเวลาและภาระ แต่ไม่ควรทำให้ฝ่ายใดรู้สึกเป็นเรื่องรองตลอด"
      },
      "innerBalance": {
        "en": "Your mind may feel scattered because it is tracking too many moving parts. Pick the next two, not the next ten.",
        "th": "ใจอาจกระจายเพราะต้องตามหลายเรื่องพร้อมกัน เลือกแค่สองอย่างถัดไป ไม่ต้องมองสิบอย่างพร้อมกัน"
      },
      "opportunitiesWatchouts": {
        "en": "A workable opening may appear when you rearrange timing rather than add more effort.",
        "th": "ช่องทางที่ใช้ได้อาจเกิดจากการจัดเวลาใหม่ มากกว่าการเพิ่มแรง"
      },
      "guidanceToday": {
        "en": "Stay flexible, but let priorities do the deciding.",
        "th": "ยืดหยุ่นได้ แต่ให้ลำดับความสำคัญเป็นคนตัดสิน"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Invite skilled feedback and collaboration. Good work becomes stronger when the process is visible enough to improve.",
        "th": "เรื่องงานเปิดรับข้อเสนอแนะจากคนที่มีทักษะและร่วมมือกัน งานดีขึ้นเมื่อกระบวนการเปิดพอให้ช่วยกันปรับ"
      },
      "moneyResources": {
        "en": "A money plan may improve when you involve the right expertise instead of trying to figure out every detail alone.",
        "th": "เรื่องเงินอาจดีขึ้นเมื่อดึงความรู้จากคนที่เหมาะเข้ามาช่วย แทนการพยายามแก้ทุกอย่างคนเดียว"
      },
      "loveRelationships": {
        "en": "Relationships grow through contribution, not only feeling. Notice what each person is actually bringing to the shared life.",
        "th": "ความสัมพันธ์เติบโตจากการมีส่วนร่วม ไม่ใช่แค่ความรู้สึก ลองดูว่าแต่ละคนกำลังเอาอะไรมาเติมชีวิตร่วมจริงๆ"
      },
      "innerBalance": {
        "en": "You do not have to be the expert in every area. Competence includes knowing when to learn from others.",
        "th": "คุณไม่ต้องเก่งทุกเรื่อง ความสามารถรวมถึงการรู้ว่าเมื่อไรควรเรียนจากคนอื่น"
      },
      "opportunitiesWatchouts": {
        "en": "A useful partner, mentor, or collaborator may help raise the quality of what you are building.",
        "th": "คนร่วมงาน ครู หรือผู้ช่วยที่เหมาะอาจช่วยยกระดับสิ่งที่คุณกำลังสร้าง"
      },
      "guidanceToday": {
        "en": "Let skill meet feedback instead of protecting the work from being seen.",
        "th": "ให้ทักษะได้เจอกับข้อเสนอแนะ แทนการปกป้องงานจนไม่มีใครช่วยมอง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Protect what matters at work without becoming so rigid that nothing can improve or change.",
        "th": "เรื่องงานรักษาสิ่งสำคัญไว้ได้ แต่อย่าแข็งจนไม่มีอะไรปรับหรือพัฒนาได้"
      },
      "moneyResources": {
        "en": "Security matters, but holding every resource too tightly can create its own anxiety. Define what enough looks like.",
        "th": "เรื่องเงิน ความมั่นคงสำคัญ แต่การกอดทุกทรัพยากรไว้แน่นเกินอาจสร้างความกังวลเอง กำหนดให้ชัดว่าแค่ไหนคือพอ"
      },
      "loveRelationships": {
        "en": "Closeness cannot grow if self-protection owns all the space. Notice where holding back is useful and where it blocks intimacy.",
        "th": "ความสัมพันธ์จะใกล้กันยากถ้าการป้องกันตัวกินพื้นที่ทั้งหมด ดูว่าตรงไหนการเก็บตัวช่วย และตรงไหนมันขวางความใกล้ชิด"
      },
      "innerBalance": {
        "en": "Control can feel like safety. Ask whether the grip is protecting you or keeping you tense.",
        "th": "การควบคุมอาจให้ความรู้สึกปลอดภัย ลองถามว่าการกำแน่นกำลังปกป้องคุณหรือทำให้ตึงกว่าเดิม"
      },
      "opportunitiesWatchouts": {
        "en": "A better use of resources may appear when you loosen one unnecessary restriction.",
        "th": "การใช้ทรัพยากรที่ดีกว่าอาจเห็นได้เมื่อคลายข้อจำกัดที่ไม่จำเป็นสักหนึ่งจุด"
      },
      "guidanceToday": {
        "en": "Keep what protects real stability and loosen what only protects fear.",
        "th": "เก็บสิ่งที่รักษาความมั่นคงจริง แล้วคลายสิ่งที่มีไว้ปกป้องความกลัวอย่างเดียว"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "If work feels unsupported, ask for specific help instead of silently carrying the shortage alone.",
        "th": "เรื่องงาน ถ้ารู้สึกขาดแรงสนับสนุน ให้ขอความช่วยเหลือแบบเจาะจง แทนการรับมือกับสิ่งที่ขาดอยู่คนเดียว"
      },
      "moneyResources": {
        "en": "Focus on essentials and available support. Scarcity feels less overwhelming when the next need becomes specific.",
        "th": "เรื่องเงินให้เริ่มจากสิ่งจำเป็นและความช่วยเหลือที่มีอยู่ ความกังวลจะเบาลงเมื่อรู้ว่ารายการถัดไปที่ต้องจัดการคืออะไร"
      },
      "loveRelationships": {
        "en": "Feeling alone can make care harder to see. Say clearly what kind of support would help instead of waiting to be noticed.",
        "th": "ในความสัมพันธ์ ความรู้สึกโดดเดี่ยวอาจทำให้มองไม่เห็นความใส่ใจ บอกให้ชัดว่าอยากให้อีกฝ่ายช่วยแบบไหน แทนการรอให้อีกฝ่ายเดา"
      },
      "innerBalance": {
        "en": "Hardship can narrow the mind to what is missing. Gently count what and who is still available.",
        "th": "ช่วงลำบากทำให้ใจเห็นแต่สิ่งที่ขาดได้ ลองค่อยๆ นับทั้งสิ่งและคนที่ยังมีอยู่"
      },
      "opportunitiesWatchouts": {
        "en": "Help may be closer than it looks, especially when you ask for something practical and specific.",
        "th": "ความช่วยเหลืออาจอยู่ใกล้กว่าที่คิด โดยเฉพาะเมื่อขอสิ่งที่เจาะจงและทำได้จริง"
      },
      "guidanceToday": {
        "en": "Deal with the most urgent need first, then let someone help with the next piece.",
        "th": "จัดการความต้องการที่เร่งด่วนที่สุดก่อน แล้วเปิดให้คนอื่นช่วยในส่วนถัดไป"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Make the exchange at work fair enough to last. Giving extra once is different from carrying the imbalance permanently.",
        "th": "เรื่องงานทำให้การให้และรับเป็นธรรมพอจะไปต่อได้ การช่วยเพิ่มครั้งหนึ่งไม่เท่ากับต้องแบกความไม่สมดุลตลอด"
      },
      "moneyResources": {
        "en": "Review where money or resources are flowing. Generosity should not create resentment, dependence, or hidden leverage.",
        "th": "เรื่องเงินดูว่าทรัพยากรกำลังไหลไปทางไหน ความใจกว้างไม่ควรสร้างความค้างใจ การพึ่งพา หรืออำนาจแฝง"
      },
      "loveRelationships": {
        "en": "Love can include giving and receiving without either person losing dignity. Notice whether support feels mutual.",
        "th": "ความสัมพันธ์ให้และรับกันได้โดยไม่ลดศักดิ์ศรีของใคร ลองดูว่าความช่วยเหลือมีความเป็นสองทางพอหรือยัง"
      },
      "innerBalance": {
        "en": "Receiving help does not make you weaker, and giving help does not make you responsible for someone’s whole life.",
        "th": "การรับความช่วยเหลือไม่ได้ทำให้คุณอ่อนแอ และการช่วยคนอื่นไม่ได้ทำให้คุณรับผิดชอบชีวิตเขาทั้งหมด"
      },
      "opportunitiesWatchouts": {
        "en": "A fair exchange, useful introduction, or well-timed support may unlock something today.",
        "th": "การแลกเปลี่ยนที่เป็นธรรม การแนะนำที่เหมาะ หรือความช่วยเหลือถูกจังหวะอาจเปิดทางได้"
      },
      "guidanceToday": {
        "en": "Give cleanly, receive cleanly, and keep the exchange sustainable.",
        "th": "ให้ให้ชัด รับให้ชัด และรักษาการแลกเปลี่ยนให้ไปต่อได้"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Pause to evaluate the work before investing more effort. Patience is useful only if the method still makes sense.",
        "th": "เรื่องงานหยุดประเมินก่อนใส่แรงเพิ่ม ความอดทนมีประโยชน์เมื่อวิธีที่ใช้อยู่ยังสมเหตุสมผล"
      },
      "moneyResources": {
        "en": "Review the return on your time, money, and energy. Long-term does not mean never adjusting the plan.",
        "th": "เรื่องเงินดูผลตอบแทนของเวลา เงิน และพลัง ระยะยาวไม่ได้แปลว่าห้ามปรับแผน"
      },
      "loveRelationships": {
        "en": "A relationship may need a patient review of what has grown and what still needs a different kind of care.",
        "th": "ความสัมพันธ์อาจต้องทบทวนอย่างใจเย็นว่าอะไรเติบโตแล้ว และอะไรยังต้องการการดูแลแบบอื่น"
      },
      "innerBalance": {
        "en": "You may need reassurance that effort matters. Let evidence—not impatience—tell you whether to continue.",
        "th": "ใจอาจอยากได้หลักฐานว่าความพยายามมีความหมาย ให้ผลจริงเป็นคนบอกว่าจะไปต่อหรือปรับ ไม่ใช่ความใจร้อน"
      },
      "opportunitiesWatchouts": {
        "en": "An improvement may come from changing the method rather than abandoning the whole investment.",
        "th": "โอกาสดีขึ้นอาจมาจากการเปลี่ยนวิธี ไม่จำเป็นต้องทิ้งสิ่งที่ลงทุนทั้งหมด"
      },
      "guidanceToday": {
        "en": "Review the harvest honestly, then decide whether to keep tending, adjust, or move on.",
        "th": "ดูผลที่ได้อย่างตรงไปตรงมา แล้วเลือกว่าจะดูแลต่อ ปรับวิธี หรือพอแค่นี้"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Quality improves through focused repetition. Choose one part of the work to practice more carefully today.",
        "th": "เรื่องงานคุณภาพดีขึ้นจากการฝึกซ้ำแบบใส่ใจ เลือกหนึ่งจุดมาฝึกให้ละเอียดขึ้นวันนี้"
      },
      "moneyResources": {
        "en": "Money and practical skills benefit from consistency. Small improvements repeated often can matter more than one clever move.",
        "th": "เรื่องเงินและทักษะที่ใช้ได้จริง ความสม่ำเสมอสำคัญมาก การปรับเล็กๆ อย่างต่อเนื่องอาจให้ผลมากกว่าการขยับครั้งใหญ่เพียงครั้งเดียว"
      },
      "loveRelationships": {
        "en": "Relationships are also built through repeated small acts. Reliability may matter more than a dramatic gesture today.",
        "th": "ความสัมพันธ์ก็สร้างจากการกระทำเล็กๆ ที่ทำซ้ำ ความสม่ำเสมออาจสำคัญกว่าการทำครั้งใหญ่วันนี้"
      },
      "innerBalance": {
        "en": "Mastery can calm the mind because it gives attention somewhere useful to go.",
        "th": "การฝึกให้ชำนาญช่วยให้ใจนิ่ง เพราะมีที่ให้ความสนใจไปอยู่กับสิ่งที่มีประโยชน์"
      },
      "opportunitiesWatchouts": {
        "en": "A skill you keep refining may be the opportunity itself, even before anyone else recognizes it.",
        "th": "ทักษะที่คุณขัดเกลาต่อเนื่องอาจเป็นโอกาสในตัวมันเอง แม้ยังไม่มีใครมองเห็น"
      },
      "guidanceToday": {
        "en": "Improve one thing by one degree and let repetition compound it.",
        "th": "เลือกหนึ่งอย่างที่อยากทำให้ดีขึ้น แล้วทำต่อเนื่องให้ผลค่อยๆ สะสม"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Let competence and independence show in your work without turning self-sufficiency into isolation.",
        "th": "เรื่องงานให้ความสามารถและความเป็นอิสระได้ทำงาน โดยไม่เปลี่ยนการพึ่งตัวเองเป็นการแยกตัว"
      },
      "moneyResources": {
        "en": "Enjoy what steady effort has built. Good financial independence includes freedom to use resources, not only fear of losing them.",
        "th": "เรื่องเงินชื่นชมสิ่งที่ความสม่ำเสมอสร้างขึ้น ความเป็นอิสระที่ดีรวมถึงใช้ทรัพยากรได้ ไม่ใช่กลัวเสียอย่างเดียว"
      },
      "loveRelationships": {
        "en": "A relationship is healthier when you can enjoy your own life and still choose connection freely.",
        "th": "ความสัมพันธ์จะดีเมื่อคุณมีชีวิตของตัวเองที่มีความสุข และยังเลือกเชื่อมโยงกับอีกฝ่ายอย่างอิสระ"
      },
      "innerBalance": {
        "en": "Let yourself feel the dignity of what you have built without needing outside approval to make it real.",
        "th": "ให้ตัวเองรู้สึกถึงคุณค่าของสิ่งที่สร้างมา โดยไม่ต้องรอการยืนยันจากคนอื่นให้มันจริง"
      },
      "opportunitiesWatchouts": {
        "en": "A resource, skill, or position you have quietly built may now give you more choice than before.",
        "th": "ทรัพยากร ทักษะ หรือจุดยืนที่ค่อยๆ สร้างมาอาจกำลังให้ทางเลือกมากกว่าที่เคย"
      },
      "guidanceToday": {
        "en": "Enjoy your independence and use it to choose well, not to close the door on everyone.",
        "th": "ชื่นชมความเป็นอิสระ แล้วใช้มันเพื่อเลือกให้ดี ไม่ใช่ปิดประตูใส่ทุกคน"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Think beyond the next task. Systems, reputation, and knowledge you build now can outlast the current project.",
        "th": "เรื่องงานมองไกลกว่างานชิ้นถัดไป ระบบ ชื่อเสียง และความรู้ที่สร้างตอนนี้อาจอยู่ได้นานกว่าโปรเจกต์"
      },
      "moneyResources": {
        "en": "Money is part of a longer story today. Consider stability, family, shared assets, and what you want to leave stronger.",
        "th": "เรื่องเงินวันนี้มองเป็นเรื่องระยะยาว คิดถึงความมั่นคง ครอบครัว ทรัพย์สินร่วม และสิ่งที่อยากส่งต่อให้แข็งแรงขึ้น"
      },
      "loveRelationships": {
        "en": "A relationship may be asking about roots, family, continuity, or the kind of life you want to build over time.",
        "th": "ความสัมพันธ์อาจกำลังถามถึงราก ครอบครัว ความต่อเนื่อง หรือชีวิตแบบที่อยากสร้างร่วมในระยะยาว"
      },
      "innerBalance": {
        "en": "Belonging can come from knowing you are part of something larger than today’s mood or problem.",
        "th": "ใจอาจมั่นคงขึ้นเมื่อรู้ว่าตัวเองเป็นส่วนหนึ่งของเรื่องที่ใหญ่กว่าอารมณ์หรือปัญหาของวันนี้"
      },
      "opportunitiesWatchouts": {
        "en": "A long-term alliance, system, or resource may be more valuable than a quick win.",
        "th": "พันธมิตร ระบบ หรือทรัพยากรระยะยาวอาจมีค่ากว่าชัยชนะเร็วๆ"
      },
      "guidanceToday": {
        "en": "Make one choice today that your future self or community will be glad you made.",
        "th": "เลือกหนึ่งอย่างวันนี้ที่ตัวคุณในอนาคตหรือคนรอบตัวจะขอบคุณ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Treat the work opportunity seriously enough to learn the details. A beginner’s discipline can become real skill.",
        "th": "เรื่องงานให้โอกาสนี้ได้รับความจริงจังพอที่จะเรียนรายละเอียด วินัยของมือใหม่อาจกลายเป็นทักษะจริง"
      },
      "moneyResources": {
        "en": "Study before you invest. A practical money opportunity becomes safer when you understand the mechanics, not only the promise.",
        "th": "เรื่องเงินศึกษาก่อนลงทุน โอกาสที่จับต้องได้จะปลอดภัยขึ้นเมื่อเข้าใจวิธีทำงานจริง ไม่ใช่แค่คำสัญญา"
      },
      "loveRelationships": {
        "en": "A relationship may benefit from small reliable effort rather than dramatic declarations about the future.",
        "th": "ความสัมพันธ์อาจได้ประโยชน์จากความพยายามเล็กๆ ที่ไว้ใจได้ มากกว่าคำประกาศใหญ่เรื่องอนาคต"
      },
      "innerBalance": {
        "en": "Let yourself learn slowly and concretely. Progress does not have to look impressive to be real.",
        "th": "อนุญาตให้ตัวเองเรียนแบบช้าและจับต้องได้ ความก้าวหน้าไม่ต้องดูน่าประทับใจถึงจะจริง"
      },
      "opportunitiesWatchouts": {
        "en": "A course, skill, offer, or practical opening may be worth developing if you are willing to do the groundwork.",
        "th": "คอร์ส ทักษะ ข้อเสนอ หรือโอกาสที่จับต้องได้อาจน่าพัฒนา ถ้าพร้อมทำพื้นฐานให้จริง"
      },
      "guidanceToday": {
        "en": "Study the details, then put one small piece into practice.",
        "th": "เรียนรายละเอียด แล้วเอาหนึ่งส่วนเล็กๆ ไปใช้จริง"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Reliable work beats dramatic bursts today. Choose a pace that you can repeat tomorrow.",
        "th": "เรื่องงาน ความสม่ำเสมอชนะการเร่งเป็นช่วงๆ วันนี้ เลือกจังหวะที่พรุ่งนี้ยังทำต่อได้"
      },
      "moneyResources": {
        "en": "Financial stability grows through boring consistency: regular saving, controlled spending, and keeping commitments manageable.",
        "th": "เรื่องเงิน ความมั่นคงโตจากความสม่ำเสมอที่ไม่หวือหวา เช่น เก็บสม่ำเสมอ ใช้พอดี และรับภาระในระดับที่ไหว"
      },
      "loveRelationships": {
        "en": "Love can feel quieter today, but reliability is a language of care too. Follow through on what you said you would do.",
        "th": "ความรักวันนี้อาจดูเงียบ แต่ความไว้ใจได้ก็เป็นภาษาของการดูแล ทำสิ่งที่รับปากไว้ให้ครบ"
      },
      "innerBalance": {
        "en": "Steady routines may calm your mind more than chasing a burst of motivation.",
        "th": "กิจวัตรที่สม่ำเสมออาจช่วยให้ใจสงบกว่าการรอแรงฮึดครั้งใหญ่"
      },
      "opportunitiesWatchouts": {
        "en": "The opportunity may be unglamorous but dependable. Do not dismiss what grows slowly.",
        "th": "โอกาสอาจไม่หวือหวาแต่ไว้ใจได้ อย่ามองข้ามสิ่งที่โตช้า"
      },
      "guidanceToday": {
        "en": "Do the next ordinary thing well and let consistency carry the rest.",
        "th": "ทำสิ่งธรรมดาถัดไปให้ดี แล้วให้ความสม่ำเสมอพาเรื่องที่เหลือ"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Make care practical at work: organize, support, resource, and protect what people actually need to do well.",
        "th": "เรื่องงานเปลี่ยนความใส่ใจให้จับต้องได้ จัดระบบ สนับสนุน เติมทรัพยากร และดูแลสิ่งที่คนต้องใช้จริง"
      },
      "moneyResources": {
        "en": "Manage money in a way that supports daily life, comfort, and long-term steadiness without guilt or waste.",
        "th": "เรื่องเงินจัดให้รองรับชีวิตประจำวัน ความสบาย และความมั่นคงระยะยาว โดยไม่ต้องรู้สึกผิดหรือใช้เกิน"
      },
      "loveRelationships": {
        "en": "Love is expressed through practical care today. Notice what makes the other person’s real life easier, safer, or warmer.",
        "th": "ความรักวันนี้แสดงออกผ่านการดูแลที่ทำได้จริง มองว่าสิ่งไหนช่วยให้อีกฝ่ายใช้ชีวิตง่าย ปลอดภัย หรืออบอุ่นขึ้น"
      },
      "innerBalance": {
        "en": "Grounding may come through your body, home, food, rest, or a task that makes the environment feel cared for.",
        "th": "ใจอาจกลับมานิ่งผ่านร่างกาย บ้าน อาหาร การพัก หรือการทำสิ่งที่ทำให้พื้นที่รอบตัวได้รับการดูแล"
      },
      "opportunitiesWatchouts": {
        "en": "A practical solution may be hiding inside ordinary care rather than a dramatic breakthrough.",
        "th": "ทางออกที่ใช้ได้จริงอาจซ่อนอยู่ในการดูแลเรื่องธรรมดา มากกว่าการเปลี่ยนครั้งใหญ่"
      },
      "guidanceToday": {
        "en": "Care for what supports your life in a way you can sustain.",
        "th": "ดูแลสิ่งที่พยุงชีวิตของคุณด้วยวิธีที่ทำต่อเนื่องได้"
      }
    }
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
    "contentVersion": "daily-guidance-v3",
    "dailyLenses": {
      "workGoals": {
        "en": "Lead work through competence, patience, and responsible use of resources rather than status or display.",
        "th": "เรื่องงานนำด้วยความสามารถ ความอดทน และการใช้ทรัพยากรอย่างรับผิดชอบ มากกว่าภาพลักษณ์หรือสถานะ"
      },
      "moneyResources": {
        "en": "Think like a steward of money. Protect capital, use it deliberately, and make choices that can still make sense later.",
        "th": "เรื่องเงินให้คิดแบบคนดูแลทรัพยากร รักษาทุนและฐานความมั่นคง ใช้อย่างตั้งใจ และเลือกสิ่งที่มองย้อนกลับมาแล้วยังสมเหตุสมผล"
      },
      "loveRelationships": {
        "en": "A stable relationship is built through consistency and responsibility, not only affection. Show that care can be trusted.",
        "th": "ความสัมพันธ์ที่มั่นคงสร้างจากความสม่ำเสมอและความรับผิดชอบ ไม่ใช่แค่ความรู้สึก ทำให้การดูแลเป็นสิ่งที่ไว้ใจได้"
      },
      "innerBalance": {
        "en": "Your confidence can rest on what you know how to manage, not on how impressive you appear.",
        "th": "ความมั่นใจวางอยู่บนสิ่งที่คุณจัดการได้จริง มากกว่าการดูน่าประทับใจในสายตาคนอื่น"
      },
      "opportunitiesWatchouts": {
        "en": "A durable opportunity may favor patience, proven skill, or long-term responsibility over speed.",
        "th": "โอกาสที่ยั่งยืนอาจให้ค่ากับความอดทน ทักษะที่พิสูจน์แล้ว และความรับผิดชอบระยะยาว มากกว่าความเร็ว"
      },
      "guidanceToday": {
        "en": "Manage today in a way that makes tomorrow more stable.",
        "th": "จัดการวันนี้ในแบบที่ทำให้วันพรุ่งนี้มั่นคงขึ้น"
      }
    }
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

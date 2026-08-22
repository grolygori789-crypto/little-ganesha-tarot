(() => {
  'use strict';

  const VERSION = 'ask-ganesha-v1';
  const GUIDANCE = {
  "00": {
    "en": "You do not need certainty before taking the first honest step. Let the next small move teach you what planning alone cannot.",
    "th": "คุณไม่จำเป็นต้องรู้ทุกอย่างก่อนเริ่ม ก้าวเล็กๆ ที่ซื่อตรงกับตัวเองอาจให้คำตอบมากกว่าการคิดวนอยู่กับความไม่แน่ใจ"
  },
  "01": {
    "en": "Bring your attention back to what is already in your hands. Skill, timing, and focused action may matter more than waiting for a better tool or sign.",
    "th": "กลับมามองสิ่งที่อยู่ในมือก่อน ทักษะ เวลา และการลงมืออย่างมีจุดหมายอาจสำคัญกว่าการรอเครื่องมือหรือสัญญาณที่ดีกว่าเดิม"
  },
  "02": {
    "en": "Not everything important is ready to be explained out loud. Leave room for what you quietly know, and notice what becomes clearer when the noise settles.",
    "th": "บางอย่างยังไม่จำเป็นต้องรีบอธิบายให้ชัดเป็นคำพูด เว้นพื้นที่ให้สิ่งที่คุณรู้อยู่ลึกๆ แล้วดูว่าอะไรเด่นขึ้นเมื่อเสียงรอบข้างเงียบลง"
  },
  "03": {
    "en": "Ask what needs steady care rather than force. Growth is more likely where there is enough nourishment, patience, and room to develop naturally.",
    "th": "ลองถามว่าสิ่งนี้ต้องการการดูแลแบบไหนมากกว่าการบังคับ การเติบโตมักเกิดได้ดีเมื่อมีทั้งเวลา ความเอาใจใส่ และพื้นที่พอ"
  },
  "04": {
    "en": "Give the situation a clear frame. Boundaries, responsibilities, and a workable structure may reveal the answer more reliably than mood alone.",
    "th": "เรื่องนี้อาจชัดขึ้นเมื่อมีกรอบที่แน่นอน ลองจัดขอบเขต หน้าที่ และโครงสร้างให้เห็นก่อนตัดสินจากอารมณ์เพียงอย่างเดียว"
  },
  "05": {
    "en": "Consider the values, principles, or trusted wisdom you want this choice to stand on. A familiar framework can help, as long as you are choosing it consciously.",
    "th": "ลองมองกลับไปที่หลักคิด คุณค่า หรือคำแนะนำที่คุณเชื่อถือ กรอบเดิมอาจช่วยได้ ตราบใดที่คุณเลือกใช้มันอย่างรู้ตัว ไม่ใช่ทำตามเพราะเคยชิน"
  },
  "06": {
    "en": "Look beneath attraction or pressure and ask what truly aligns with your values. The heart of this question may be a choice about what kind of relationship or life you want to build.",
    "th": "มองให้ลึกกว่าความดึงดูดหรือแรงกดดัน แล้วถามว่าสิ่งไหนสอดคล้องกับคุณค่าของคุณจริงๆ ใจกลางของเรื่องนี้อาจเป็นการเลือกว่าคุณอยากสร้างชีวิตหรือความสัมพันธ์แบบไหน"
  },
  "07": {
    "en": "Choose a direction before trying to move faster. Progress becomes easier when your will, effort, and priorities are pulling the same way.",
    "th": "เลือกทิศทางให้ชัดก่อนเร่งความเร็ว เมื่อความตั้งใจ ความพยายาม และลำดับความสำคัญไปทางเดียวกัน การขยับต่อจะง่ายขึ้น"
  },
  "08": {
    "en": "Strength here is not about overpowering the situation. Meet it with steady courage, self-control, and enough gentleness to keep your judgment clear.",
    "th": "พลังในเรื่องนี้ไม่จำเป็นต้องมาจากการเอาชนะ ใช้ความกล้าแบบนิ่งๆ ควบคุมตัวเอง และรักษาความอ่อนโยนไว้พอให้มองสถานการณ์ได้ชัด"
  },
  "09": {
    "en": "Step away from other people's noise for a moment. Your answer may become clearer when you stop asking what would impress others and listen to what remains true in private.",
    "th": "ถอยออกจากเสียงของคนอื่นสักครู่ คำตอบอาจชัดขึ้นเมื่อคุณหยุดคิดว่าควรทำอะไรให้คนอื่นเห็นดี แล้วฟังว่าสิ่งไหนยังจริงกับคุณเมื่ออยู่ลำพัง"
  },
  "10": {
    "en": "Some parts of this situation are moving beyond your control. Work with the turn of events rather than demanding that everything stay exactly as it was.",
    "th": "บางส่วนของเรื่องนี้กำลังเปลี่ยนไปโดยที่คุณควบคุมไม่ได้ทั้งหมด ลองทำงานร่วมกับจังหวะของเหตุการณ์ แทนการพยายามให้ทุกอย่างคงรูปเดิม"
  },
  "11": {
    "en": "Return to facts, fairness, and consequences. The clearest answer is likely the one you can still respect after emotion has cooled.",
    "th": "กลับมาที่ข้อเท็จจริง ความเป็นธรรม และผลที่จะตามมา คำตอบที่แข็งแรงมักเป็นคำตอบที่คุณยังเคารพได้แม้อารมณ์จะสงบลงแล้ว"
  },
  "12": {
    "en": "A pause may be productive here. Try viewing the situation from a different angle before deciding that action is the only way forward.",
    "th": "การหยุดสักพักอาจเป็นส่วนหนึ่งของคำตอบ ลองเปลี่ยนมุมมองก่อนสรุปว่าการรีบลงมือคือทางเดียวที่มี"
  },
  "13": {
    "en": "Something may need to end, change form, or be released before the next chapter has room to begin. Do not confuse transition with failure.",
    "th": "บางอย่างอาจต้องจบ เปลี่ยนรูป หรือถูกปล่อยก่อนที่บทใหม่จะมีที่ว่าง อย่ารีบตีความการเปลี่ยนผ่านว่าเป็นความล้มเหลว"
  },
  "14": {
    "en": "The best path may be a measured one. Combine what works, reduce the extremes, and let adjustment happen gradually rather than forcing a dramatic answer.",
    "th": "ทางที่เหมาะอาจอยู่ตรงความพอดี ลองผสมสิ่งที่ใช้ได้ ลดความสุดโต่ง และให้การปรับตัวเกิดทีละขั้นแทนการบังคับให้ได้คำตอบใหญ่ในทันที"
  },
  "15": {
    "en": "Notice what has too much power over this question: fear, craving, guilt, habit, or the need for control. Naming the attachment can loosen it.",
    "th": "สังเกตว่าอะไรมีอำนาจเหนือคำถามนี้มากเกินไป ไม่ว่าจะเป็นความกลัว ความอยาก ความรู้สึกผิด ความเคยชิน หรือความต้องการควบคุม แค่เห็นสิ่งที่ผูกไว้ก็เริ่มคลายมันได้"
  },
  "16": {
    "en": "If something is unstable, truth may feel disruptive before it feels freeing. Pay attention to what can no longer be supported honestly.",
    "th": "ถ้าบางอย่างไม่มั่นคง ความจริงอาจทำให้รู้สึกสั่นคลอนก่อนจะทำให้โล่งขึ้น ลองดูว่าอะไรในเรื่องนี้ไม่สามารถค้ำไว้ด้วยความจริงได้อีกต่อไป"
  },
  "17": {
    "en": "Do not underestimate the value of quiet hope. Even if the whole path is not visible yet, one sincere point of trust can help you orient yourself again.",
    "th": "อย่ามองข้ามคุณค่าของความหวังที่สงบ แม้ยังไม่เห็นทางทั้งหมด จุดเล็กๆ ที่ยังเชื่อถือได้อาจช่วยให้คุณตั้งทิศทางใหม่อีกครั้ง"
  },
  "18": {
    "en": "There may be more uncertainty here than you want. Move carefully, check assumptions, and avoid treating fear or imagination as confirmed fact.",
    "th": "เรื่องนี้อาจมีความไม่แน่นอนมากกว่าที่คุณอยากยอมรับ เดินให้ช้าลง ตรวจสมมติฐาน และอย่าเพิ่งถือว่าความกลัวหรือจินตนาการคือข้อเท็จจริง"
  },
  "19": {
    "en": "Give weight to what is already clear, life-giving, and visible. This question may need less mystery and more willingness to acknowledge what is working.",
    "th": "ให้น้ำหนักกับสิ่งที่ชัด มีชีวิต และเห็นผลอยู่แล้ว คำถามนี้อาจต้องการความลึกลับน้อยลง และการยอมรับสิ่งที่กำลังไปได้ดีมากขึ้น"
  },
  "20": {
    "en": "This may be a moment to answer something you have already heard inside yourself. Let past experience become wisdom rather than a reason to keep postponing the decision.",
    "th": "อาจถึงเวลาตอบบางสิ่งที่คุณได้ยินอยู่ในใจมาสักพักแล้ว ใช้ประสบการณ์ที่ผ่านมาเป็นบทเรียน ไม่ใช่เหตุผลสำหรับเลื่อนการตัดสินใจออกไปเรื่อยๆ"
  },
  "21": {
    "en": "Look at what is complete enough to be recognized. Integration, closure, or a wider view may matter more now than immediately starting the next thing.",
    "th": "ลองมองว่าสิ่งใดสมบูรณ์พอให้ยอมรับว่าเดินมาถึงตรงนี้แล้ว การปิดวงให้เรียบร้อยหรือเห็นภาพกว้างอาจสำคัญกว่าการรีบเริ่มเรื่องถัดไป"
  },
  "22": {
    "en": "A fresh spark is present, but it needs a real beginning. Give the idea one concrete action before asking it to prove its entire future.",
    "th": "มีประกายใหม่อยู่ แต่ต้องการการเริ่มต้นจริงๆ ให้ความคิดนี้ได้หนึ่งการกระทำที่จับต้องได้ ก่อนเรียกร้องให้มันพิสูจน์อนาคตทั้งหมด"
  },
  "23": {
    "en": "You may be standing between possibility and commitment. Compare the paths honestly, then choose the direction that deserves your energy rather than keeping every option half-open.",
    "th": "คุณอาจยืนอยู่ระหว่างความเป็นไปได้กับการตัดสินใจ ลองเทียบทางเลือกอย่างตรงไปตรงมา แล้วเลือกทางที่สมควรได้รับพลังของคุณ แทนการเปิดทุกทางไว้ครึ่งๆ กลางๆ"
  },
  "24": {
    "en": "Think beyond the first step. What you choose now should make sense not only today, but also when you look toward the horizon it creates.",
    "th": "มองให้ไกลกว่าก้าวแรก สิ่งที่เลือกตอนนี้ควรสมเหตุสมผลทั้งในวันนี้และเมื่อมองไปยังปลายทางที่มันกำลังสร้าง"
  },
  "25": {
    "en": "There is value in protecting what already feels stable and worth celebrating. Let support, belonging, and a sound foundation count as part of the answer.",
    "th": "สิ่งที่มั่นคงและน่าชื่นชมมีคุณค่า อย่ามองข้ามแรงสนับสนุน ความรู้สึกเป็นส่วนหนึ่ง และฐานที่ดีเพียงเพราะมันดูไม่หวือหวา"
  },
  "26": {
    "en": "Not every disagreement is a sign to retreat. Separate useful friction from pointless competition, and decide which conflict can actually sharpen the situation.",
    "th": "ความเห็นต่างไม่ได้แปลว่าต้องถอยเสมอไป แยกให้ออกว่าอะไรคือแรงเสียดทานที่ช่วยให้ดีขึ้น และอะไรคือการแข่งขันที่เสียพลังโดยไม่จำเป็น"
  },
  "27": {
    "en": "Recognition can be encouraging, but do not let applause make the decision for you. Ask whether the path still feels right when no one is watching.",
    "th": "การได้รับการยอมรับเป็นกำลังใจได้ แต่อย่าให้เสียงปรบมือเป็นคนตัดสินแทนคุณ ลองถามว่าทางนี้ยังใช่ไหมเมื่อไม่มีใครมองอยู่"
  },
  "28": {
    "en": "Hold your ground where the principle truly matters. You do not need to fight every challenge, only the ones that would make you abandon something important.",
    "th": "ยืนในจุดของตัวเองเมื่อหลักการนั้นสำคัญจริงๆ คุณไม่ต้องสู้ทุกเรื่อง เพียงไม่ยอมทิ้งสิ่งสำคัญเพราะแรงกดดันที่ผ่านเข้ามา"
  },
  "29": {
    "en": "Momentum is building. If the direction is sound, respond while the window is open instead of creating delays that add no real protection.",
    "th": "จังหวะกำลังมา ถ้าทิศทางถูกต้อง การตอบสนองในเวลาที่เหมาะอาจดีกว่าการสร้างความล่าช้าที่ไม่ได้เพิ่มความปลอดภัยจริงๆ"
  },
  "30": {
    "en": "Your caution has a reason, but exhaustion can make every next step look dangerous. Protect your boundaries without assuming that the past must repeat itself.",
    "th": "ความระวังของคุณมีที่มา แต่ความเหนื่อยอาจทำให้ทุกก้าวใหม่ดูอันตรายเกินจริง รักษาขอบเขตไว้โดยไม่จำเป็นต้องเชื่อว่าอดีตจะเกิดซ้ำเสมอ"
  },
  "31": {
    "en": "Check how much of this burden is genuinely yours. Progress may require carrying less, delegating, or refusing responsibilities that were never sustainable.",
    "th": "ลองดูว่าภาระตรงไหนเป็นของคุณจริงๆ การเดินต่ออาจต้องวางบางอย่าง มอบหมาย หรือหยุดรับผิดชอบสิ่งที่ไม่มีทางยั่งยืนตั้งแต่ต้น"
  },
  "32": {
    "en": "Approach the question with curiosity instead of needing to look experienced. A small experiment, message, or new skill may reveal more than certainty would.",
    "th": "เข้าหาเรื่องนี้ด้วยความอยากรู้มากกว่าความพยายามดูเก่ง การทดลองเล็กๆ ข้อความหนึ่งข้อความ หรือทักษะใหม่อาจให้คำตอบมากกว่าการรอให้มั่นใจทั้งหมด"
  },
  "33": {
    "en": "Energy is high, but speed can outrun judgment. Move boldly only after you know what you are moving toward and what you are willing to leave behind.",
    "th": "พลังมีมาก แต่ความเร็วอาจแซงการตัดสินใจ เดินหน้าได้เต็มที่เมื่อรู้แล้วว่ากำลังไปหาอะไร และยอมทิ้งอะไรไว้ข้างหลัง"
  },
  "34": {
    "en": "Trust the warmth and confidence you can sustain without performing for anyone. Your presence may be strongest when you stop asking for permission to use your own strengths.",
    "th": "เชื่อในความอบอุ่นและความมั่นใจที่คุณรักษาได้โดยไม่ต้องแสดงให้ใครดู พลังของคุณอาจชัดที่สุดเมื่อหยุดรอการอนุญาตให้ใช้จุดแข็งของตัวเอง"
  },
  "35": {
    "en": "Lead from vision, not impulse. The decision becomes stronger when you can see both the opportunity and the responsibility that comes with it.",
    "th": "นำด้วยภาพที่มองไกลกว่าแรงฮึดชั่วคราว การตัดสินใจจะแข็งแรงขึ้นเมื่อคุณเห็นทั้งโอกาสและความรับผิดชอบที่มากับมัน"
  },
  "36": {
    "en": "Let yourself acknowledge what you genuinely feel before trying to manage it. An honest emotional beginning can be useful even when the final outcome is still unknown.",
    "th": "ยอมรับก่อนว่าคุณรู้สึกอะไรจริงๆ แล้วค่อยจัดการกับมัน การเริ่มต้นจากความรู้สึกที่ซื่อตรงมีประโยชน์ แม้ปลายทางยังไม่ชัด"
  },
  "37": {
    "en": "Mutuality matters here. Notice whether interest, effort, respect, or care is moving in both directions rather than being carried by one person alone.",
    "th": "ความสัมพันธ์สองทางสำคัญ ลองดูว่าความสนใจ ความพยายาม ความเคารพ หรือการดูแลไหลไปกลับทั้งสองฝ่าย หรือมีใครคนหนึ่งแบกอยู่คนเดียว"
  },
  "38": {
    "en": "Do not overlook the people who can help you hold perspective. Celebration, friendship, and shared support may be part of the answer rather than a distraction from it.",
    "th": "อย่ามองข้ามคนที่ช่วยให้คุณเห็นภาพชัดขึ้น มิตรภาพ การแบ่งปัน และแรงสนับสนุนอาจเป็นส่วนหนึ่งของคำตอบ ไม่ใช่สิ่งที่ทำให้ไขว้เขว"
  },
  "39": {
    "en": "The answer may be harder to see because your attention is turned away from what is actually available. Before deciding there is nothing here, look again at what you have stopped noticing.",
    "th": "คำตอบอาจมองยากเพราะความสนใจของคุณหันออกจากสิ่งที่มีอยู่จริง ก่อนสรุปว่าไม่มีอะไรให้เลือก ลองกลับไปดูสิ่งที่คุณเลิกสังเกตไปแล้ว"
  },
  "40": {
    "en": "Loss deserves to be felt, but it is not the whole landscape. Acknowledge what did not work while also noticing what remains usable, loving, or possible.",
    "th": "ความสูญเสียควรได้รับพื้นที่ แต่ไม่ใช่ภาพทั้งหมด ยอมรับสิ่งที่ไม่เป็นไปตามหวัง พร้อมกับมองว่ายังมีอะไรเหลือให้ใช้ รัก หรือสร้างต่อได้"
  },
  "41": {
    "en": "The past may be coloring this question more strongly than the present. Keep what is genuinely meaningful, but do not let nostalgia choose on your behalf.",
    "th": "อดีตอาจกำลังแต้มสีให้คำถามนี้มากกว่าปัจจุบัน เก็บสิ่งที่มีความหมายไว้ได้ แต่อย่าให้ความคิดถึงเลือกแทนชีวิตวันนี้"
  },
  "42": {
    "en": "Many possibilities can look equally vivid from a distance. Reduce the fantasy by asking which option survives contact with facts, effort, and real consequences.",
    "th": "หลายทางเลือกอาจดูน่าดึงดูดพอๆ กันเมื่อมองจากไกลๆ ลดภาพฝันลงด้วยการถามว่าทางไหนยังสมเหตุสมผลเมื่อเจอข้อเท็จจริง ความพยายาม และผลจริง"
  },
  "43": {
    "en": "Sometimes clarity comes from admitting that something no longer gives enough back. Walking away can be an act of honesty when staying only prolongs emptiness.",
    "th": "บางครั้งความชัดมาจากการยอมรับว่าสิ่งหนึ่งไม่หล่อเลี้ยงคุณพออีกแล้ว การเดินออกมาอาจเป็นความซื่อตรง เมื่อการอยู่ต่อมีแต่ยืดความว่างเปล่า"
  },
  "44": {
    "en": "Ask whether the outcome you want would actually satisfy you, not merely prove something. Contentment is more useful as a compass than appearances.",
    "th": "ถามว่าผลลัพธ์ที่อยากได้จะทำให้คุณพอใจจริงๆ หรือเพียงช่วยพิสูจน์บางอย่าง ความอิ่มใจที่แท้เป็นเข็มทิศที่ดีกว่าภาพที่ดูดี"
  },
  "45": {
    "en": "Consider the wider emotional environment around this choice. A good answer should have room for trust, belonging, and the kind of peace you would want to live inside.",
    "th": "มองสภาพแวดล้อมทางใจรอบการตัดสินใจนี้ด้วย คำตอบที่ดีควรมีพื้นที่สำหรับความไว้ใจ ความเป็นส่วนหนึ่ง และความสงบที่คุณอยากใช้ชีวิตอยู่ข้างใน"
  },
  "46": {
    "en": "Stay open to a feeling, message, or creative possibility without demanding that it already be mature. Curiosity can be more useful than cynicism here.",
    "th": "เปิดรับความรู้สึก ข้อความ หรือความคิดสร้างสรรค์ที่เพิ่งเริ่ม โดยไม่บังคับให้มันต้องเติบโตเต็มที่ในทันที ความอยากรู้อาจพาคุณไปได้ไกลกว่าความระแวง"
  },
  "47": {
    "en": "Let ideals inspire you, but give them a reality check. A beautiful intention becomes trustworthy when actions, timing, and follow-through support it.",
    "th": "ให้ความฝันเป็นแรงบันดาลใจ แต่ตรวจมันกับความจริงด้วย เจตนาที่สวยงามจะน่าเชื่อถือเมื่อการกระทำ จังหวะเวลา และความสม่ำเสมอรองรับมัน"
  },
  "48": {
    "en": "Your sensitivity is information, not a command. Listen deeply to what you feel, then give yourself enough space to separate empathy from taking on everything around you.",
    "th": "ความละเอียดอ่อนของคุณคือข้อมูล ไม่ใช่คำสั่ง ฟังความรู้สึกให้ลึก แล้วเว้นพื้นที่พอให้แยกความเข้าอกเข้าใจออกจากการรับทุกอย่างมาแบกเอง"
  },
  "49": {
    "en": "Keep the emotional temperature steady. The strongest response may be compassionate without becoming reactive, and caring without losing your own center.",
    "th": "รักษาอุณหภูมิทางอารมณ์ให้มั่นคง การตอบสนองที่แข็งแรงอาจอ่อนโยนได้โดยไม่รีบโต้กลับ และใส่ใจได้โดยไม่เสียศูนย์ของตัวเอง"
  },
  "50": {
    "en": "Cut through the fog and name the central truth as simply as you can. Once the question is clear, the next decision may become much less complicated.",
    "th": "ตัดความฟุ้งออกแล้วลองพูดความจริงหลักของเรื่องนี้ให้สั้นที่สุด เมื่อคำถามชัด การตัดสินใจขั้นต่อไปอาจง่ายขึ้นมาก"
  },
  "51": {
    "en": "If you cannot choose yet, notice what you are protecting yourself from seeing. A temporary pause is useful only if it leads to clearer information rather than permanent avoidance.",
    "th": "ถ้ายังเลือกไม่ได้ ลองดูว่าคุณกำลังปกป้องตัวเองจากการเห็นอะไร การหยุดชั่วคราวมีประโยชน์เมื่อพาไปสู่ข้อมูลที่ชัดขึ้น ไม่ใช่การหลบไปเรื่อยๆ"
  },
  "52": {
    "en": "Pain or disappointment may be part of the truth here. Let it be real without allowing it to decide the entire future for you.",
    "th": "ความเจ็บหรือความผิดหวังอาจเป็นส่วนหนึ่งของความจริง ให้มันมีที่อยู่โดยไม่ปล่อยให้มันเป็นคนตัดสินอนาคตทั้งหมด"
  },
  "53": {
    "en": "Rest can be part of the answer. A tired mind often turns urgency into certainty, so give yourself enough quiet to think again.",
    "th": "การพักอาจเป็นส่วนหนึ่งของคำตอบ จิตใจที่เหนื่อยมักทำให้ความเร่งด่วนดูเหมือนความแน่นอน เว้นความเงียบให้ตัวเองคิดอีกครั้ง"
  },
  "54": {
    "en": "Winning the argument may cost more than the issue is worth. Ask what outcome preserves your integrity instead of simply proving that you can prevail.",
    "th": "การชนะข้อโต้แย้งอาจมีราคาแพงกว่าตัวเรื่อง ลองถามว่าผลแบบไหนรักษาความซื่อตรงของคุณไว้ได้ แทนการพิสูจน์เพียงว่าคุณเอาชนะได้"
  },
  "55": {
    "en": "The situation may improve through movement away from what keeps repeating. You do not need to love the transition for it to carry you somewhere calmer.",
    "th": "สถานการณ์อาจดีขึ้นเมื่อขยับออกจากสิ่งที่วนซ้ำ คุณไม่จำเป็นต้องชอบช่วงเปลี่ยนผ่านทั้งหมด เพื่อยอมรับว่ามันอาจพาไปยังที่ที่สงบกว่า"
  },
  "56": {
    "en": "Strategy matters, but so does honesty with yourself. Check whether you are being wisely discreet or merely avoiding a conversation or responsibility that will return later.",
    "th": "การวางแผนเป็นเรื่องดี แต่ต้องซื่อตรงกับตัวเองด้วย ลองดูว่าคุณกำลังเก็บข้อมูลอย่างมีชั้นเชิง หรือเพียงหลบการคุยหรือความรับผิดชอบที่จะกลับมาอีก"
  },
  "57": {
    "en": "Some of the limits around this question may be real, but not all of them are permanent. Test one assumption before accepting the whole cage as fixed.",
    "th": "ข้อจำกัดบางอย่างมีอยู่จริง แต่ไม่ใช่ทุกอย่างจะถาวร ลองทดสอบสมมติฐานหนึ่งข้อก่อนยอมรับว่ากรงทั้งหมดล็อกอยู่แล้ว"
  },
  "58": {
    "en": "Anxiety can make possibility feel like certainty. Separate what has actually happened from what your mind is rehearsing, then respond to the part that is real.",
    "th": "ความกังวลทำให้สิ่งที่อาจเกิดดูเหมือนสิ่งที่จะเกิดแน่นอน แยกสิ่งที่เกิดขึ้นจริงออกจากสิ่งที่ใจซ้อมไว้ แล้วตอบสนองเฉพาะส่วนที่เป็นจริงก่อน"
  },
  "59": {
    "en": "Something may have reached its limit. Let the ending tell you what cannot continue, then conserve your energy for what can be rebuilt after it.",
    "th": "บางอย่างอาจมาถึงขีดสุดแล้ว ให้จุดจบบอกคุณว่าอะไรไปต่อแบบเดิมไม่ได้ แล้วเก็บพลังไว้สร้างสิ่งที่ยังเริ่มใหม่ได้"
  },
  "60": {
    "en": "Stay observant and ask better questions before rushing to a conclusion. New information may matter more than having an immediate opinion.",
    "th": "สังเกตให้มากและตั้งคำถามให้ดีขึ้นก่อนรีบสรุป ข้อมูลใหม่อาจมีค่ามากกว่าการต้องมีความเห็นในทันที"
  },
  "61": {
    "en": "Direct action can help, but only if speed is serving clarity rather than anger or impatience. Make sure the target is right before charging toward it.",
    "th": "การลงมือตรงๆ ช่วยได้เมื่อความเร็วรับใช้ความชัด ไม่ใช่ความโกรธหรือความใจร้อน ตรวจเป้าหมายให้ถูกก่อนพุ่งเข้าไป"
  },
  "62": {
    "en": "Be clear without being cruel. Strong boundaries and honest language can simplify this question when they are grounded in self-respect rather than punishment.",
    "th": "พูดให้ชัดโดยไม่ต้องทำร้ายใคร ขอบเขตที่มั่นคงและภาษาที่ตรงไปตรงมาจะช่วยให้เรื่องนี้ง่ายขึ้นเมื่อมาจากการเคารพตัวเอง ไม่ใช่การลงโทษ"
  },
  "63": {
    "en": "Use reason to organize the decision, not to erase feeling. Facts, standards, and long-term consequences can give the question a stable frame.",
    "th": "ใช้เหตุผลจัดระเบียบการตัดสินใจ ไม่ใช่ลบความรู้สึกทิ้ง ข้อเท็จจริง มาตรฐาน และผลระยะยาวจะช่วยให้คำถามนี้มีกรอบที่มั่นคง"
  },
  "64": {
    "en": "A practical opening may be worth taking seriously. Look for the smallest tangible step that lets you test whether the opportunity has real substance.",
    "th": "มีโอกาสที่จับต้องได้อยู่ ลองหาก้าวเล็กที่สุดที่ทำให้คุณทดสอบได้ว่าโอกาสนี้มีเนื้อจริงหรือเป็นเพียงความหวังที่ยังไม่ผ่านการลอง"
  },
  "65": {
    "en": "Balance is less about doing everything equally and more about knowing what needs attention now. Adjust resources without pretending that every demand deserves the same weight.",
    "th": "ความสมดุลไม่ได้แปลว่าต้องให้ทุกอย่างเท่ากัน แต่คือรู้ว่าอะไรต้องได้รับความสนใจตอนนี้ ปรับทรัพยากรโดยไม่จำเป็นต้องทำเหมือนทุกความต้องการสำคัญเท่ากัน"
  },
  "66": {
    "en": "Good results may depend on collaboration, feedback, or skilled contribution. Ask where another person's expertise could strengthen what you are trying to build.",
    "th": "ผลที่ดีอาจขึ้นกับการร่วมมือ คำแนะนำ หรือทักษะของคนอื่น ลองดูว่าความเชี่ยวชาญจากอีกคนจะช่วยให้งานที่คุณกำลังสร้างแข็งแรงขึ้นตรงไหน"
  },
  "67": {
    "en": "Security is valuable, but holding too tightly can turn protection into stagnation. Notice what you are preserving and what you may be afraid to let move.",
    "th": "ความมั่นคงมีคุณค่า แต่การจับไว้แน่นเกินไปอาจเปลี่ยนการปกป้องเป็นการหยุดนิ่ง ลองดูว่าคุณกำลังรักษาอะไร และกลัวให้อะไรเคลื่อนไหว"
  },
  "68": {
    "en": "Scarcity can narrow your view. Before assuming you have no options, check what support, information, or practical help is actually available.",
    "th": "ความรู้สึกขาดแคลนอาจทำให้มองทางแคบลง ก่อนสรุปว่าไม่มีทาง ลองเช็กว่ามีความช่วยเหลือ ข้อมูล หรือทรัพยากรจริงๆ อะไรอยู่รอบตัวบ้าง"
  },
  "69": {
    "en": "Pay attention to the balance of giving and receiving. Generosity is healthiest when it does not create hidden debt, dependence, or resentment.",
    "th": "ดูสมดุลของการให้และการรับ ความเอื้อเฟื้อจะดีต่อทุกฝ่ายเมื่อไม่สร้างหนี้ใจ การพึ่งพา หรือความค้างคาที่ไม่ได้พูดกัน"
  },
  "70": {
    "en": "This question may need patience more than another push. Review what your effort has produced so far and decide whether to continue, adjust, or stop investing in the same way.",
    "th": "คำถามนี้อาจต้องการความอดทนมากกว่าการผลักเพิ่ม ทบทวนว่าความพยายามที่ผ่านมาให้ผลอะไร แล้วค่อยเลือกว่าจะทำต่อ ปรับวิธี หรือหยุดลงทุนแบบเดิม"
  },
  "71": {
    "en": "Craftsmanship is the answer when improvement is possible. Instead of looking for a dramatic sign, identify the skill or repeated practice that would make the situation stronger.",
    "th": "ถ้ายังพัฒนาได้ งานฝีมือคือคำตอบ แทนการรอสัญญาณใหญ่ ลองหาทักษะหรือการฝึกซ้ำแบบไหนที่จะทำให้เรื่องนี้แข็งแรงขึ้นจริง"
  },
  "72": {
    "en": "Independence can be a useful test. Ask whether this choice supports a life you can respect and sustain without depending on constant approval.",
    "th": "ความเป็นอิสระเป็นบททดสอบที่ดี ลองถามว่าทางเลือกนี้ช่วยให้คุณสร้างชีวิตที่เคารพและดูแลได้ด้วยตัวเอง โดยไม่ต้องพึ่งการยอมรับตลอดเวลาหรือไม่"
  },
  "73": {
    "en": "Think in terms of what lasts beyond the immediate result. Stability, shared resources, family or community impact, and long-term continuity may belong in the decision.",
    "th": "มองไกลกว่าผลทันที ความมั่นคง ทรัพยากรร่วม ผลต่อครอบครัวหรือคนรอบตัว และสิ่งที่สืบต่อได้ในระยะยาวอาจเป็นส่วนหนึ่งของคำตอบ"
  },
  "74": {
    "en": "Treat this as something you can learn in practical steps. Study the details, ask useful questions, and let consistent effort build confidence.",
    "th": "มองเรื่องนี้เป็นสิ่งที่เรียนรู้ได้ทีละขั้น ศึกษารายละเอียด ตั้งคำถามที่ใช้ได้จริง และปล่อยให้ความสม่ำเสมอสร้างความมั่นใจแทนการรีบเก่ง"
  },
  "75": {
    "en": "Slow progress is still progress when the direction is sound. Reliability, routine, and follow-through may matter more here than excitement.",
    "th": "ความคืบหน้าที่ช้าก็ยังเป็นความคืบหน้าเมื่อทิศทางถูก ความสม่ำเสมอ กิจวัตร และการทำให้เสร็จตามที่รับปากอาจสำคัญกว่าความตื่นเต้น"
  },
  "76": {
    "en": "Ground the question in real care: time, body, home, money, and everyday needs. A good choice should support life as it is actually lived.",
    "th": "วางคำถามไว้บนชีวิตจริง ทั้งเวลา ร่างกาย บ้าน เงิน และสิ่งที่ต้องดูแลในแต่ละวัน ทางเลือกที่ดีควรช่วยพยุงชีวิตที่คุณใช้จริง ไม่ใช่เพียงภาพในหัว"
  },
  "77": {
    "en": "Manage what you have as though you will need the decision to hold up over time. Competence, patience, and responsible stewardship are stronger guides than status or display.",
    "th": "จัดการสิ่งที่มีเหมือนการตัดสินใจนี้ต้องยืนได้ในระยะยาว ความสามารถ ความอดทน และความรับผิดชอบต่อทรัพยากรเป็นเข็มทิศที่ดีกว่าภาพลักษณ์หรือสถานะ"
  }
};

  const ids = Object.keys(GUIDANCE);
  if (ids.length !== 78 || Array.from({ length: 78 }, (_, index) => String(index).padStart(2, '0')).some((id) => !Object.prototype.hasOwnProperty.call(GUIDANCE, id))) {
    throw new Error('Ask Ganesha content failed canonical 78-card validation.');
  }

  window.LGTAskContent = Object.freeze({
    version: VERSION,
    get(cardId, lang = 'en') {
      const id = String(cardId).padStart(2, '0');
      const item = GUIDANCE[id];
      if (!item) return '';
      return item[lang === 'th' ? 'th' : 'en'];
    }
  });
})();

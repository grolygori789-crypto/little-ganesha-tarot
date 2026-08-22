(() => {
  'use strict';

  const CONTENT = window.LGTReadingContent;
  const ANALYZER = window.LGTQuestionAnalyzer;
  const CONTRACTS = window.LGTQuestionContract;
  const CONTEXT = window.LGTAskContext;
  const ASK_CONTENT = window.LGTAskContent;
  if (!CONTENT || !ANALYZER || !CONTRACTS || !CONTEXT || !ASK_CONTENT) throw new Error('Semantic Ask requires content, analyzer, contract, context, and Ask content.');

  const VERSION = 'ask-semantic-v1';

  const DIRECTION = Object.freeze({
    strong_positive:{ en:'strongly constructive', th:'ไปทางบวกค่อนข้างชัด' },
    moderate_positive:{ en:'constructive overall', th:'เอนมาทางบวก' },
    mixed:{ en:'mixed rather than one-sided', th:'ยังผสมกันและไม่ได้ไปทางเดียว' },
    moderate_challenging:{ en:'cautious and somewhat challenging', th:'เอนมาทางระมัดระวังและมีแรงต้านบางส่วน' },
    strong_challenging:{ en:'clearly challenging at the moment', th:'มีแรงต้านค่อนข้างชัดในตอนนี้' }
  });

  const DOMAIN_CONDITIONS = Object.freeze({
    self_image:{
      en:'Appearance and attractiveness are never a universal score. Real impressions vary with taste, context, expression, grooming, body language, and how you relate to people.',
      th:'รูปลักษณ์และเสน่ห์ไม่มีคะแนนสากล ความประทับใจจริงยังเปลี่ยนตามรสนิยม บริบท สีหน้า การดูแลตัวเอง ภาษากาย และวิธีที่คุณปฏิบัติต่อผู้คน'
    },
    social_perception:{
      en:'A card can reflect the impression you may project, but it cannot survey everyone’s private opinion. Consistent real-world reactions are better evidence of how people actually receive you.',
      th:'ไพ่สะท้อนภาพที่คุณอาจส่งออกไปได้ แต่ไม่สามารถสำรวจความคิดเห็นส่วนตัวของทุกคน ปฏิกิริยาที่เกิดซ้ำในชีวิตจริงยังเป็นข้อมูลที่ดีกว่าว่าคนรับรู้คุณอย่างไร'
    },
    love_relationships:{
      en:'The direction of a relationship depends on repeated behavior, communication, boundaries, and choices from both people. The card is a lens on the dynamic, not access to another person’s private mind.',
      th:'ทิศทางของความสัมพันธ์ขึ้นอยู่กับพฤติกรรมที่เกิดซ้ำ การสื่อสาร ขอบเขต และการเลือกของทั้งสองฝ่าย ไพ่เป็นมุมมองต่อพลวัตของความสัมพันธ์ ไม่ใช่การอ่านใจอีกฝ่ายโดยตรง'
    },
    work_purpose:{
      en:'Work outcomes still depend on skills, timing, decisions, workplace conditions, and what you actually do with an opportunity. Treat the card as a directional signal, not a substitute for practical evidence.',
      th:'ผลเรื่องงานยังขึ้นอยู่กับทักษะ จังหวะ การตัดสินใจ เงื่อนไขในที่ทำงาน และสิ่งที่คุณลงมือทำกับโอกาสจริง ใช้ไพ่เป็นสัญญาณเชิงทิศทาง ไม่ใช่แทนข้อมูลที่ตรวจสอบได้'
    },
    money_resources:{
      en:'Financial outcomes are shaped by income, spending, saving, debt, risk, timing, and execution. A supportive card can point to opportunity or momentum, but it does not make wealth automatic or guaranteed.',
      th:'ผลทางการเงินจริงขึ้นอยู่กับรายได้ รายจ่าย เงินออม หนี้ ความเสี่ยง จังหวะ และการลงมือ ไพ่ที่ให้แรงสนับสนุนอาจสะท้อนโอกาสหรือโมเมนตัมที่ดี แต่ไม่ได้ทำให้ความมั่งคั่งเกิดขึ้นเองหรือรับประกันผล'
    },
    choice_action:{
      en:'Use the card to clarify the deciding factor, then check consequences, costs, reversibility, and real-world information before committing to a choice.',
      th:'ใช้ไพ่ช่วยให้เห็นปัจจัยตัดสินใจที่สำคัญ แล้วตรวจผลตามมา ต้นทุน ความย้อนกลับได้ของการตัดสินใจ และข้อมูลจริงก่อนเลือกทางใดทางหนึ่ง'
    },
    outlook_opportunity:{
      en:'This is a directional reading, not a fixed forecast. The trend can strengthen, weaken, or change as the underlying conditions and your actions change.',
      th:'นี่เป็นการอ่านแนวโน้ม ไม่ใช่อนาคตที่ถูกล็อกไว้ ทิศทางสามารถแข็งแรงขึ้น อ่อนลง หรือเปลี่ยนได้ตามเงื่อนไขและการลงมือที่เปลี่ยนไป'
    },
    inner_growth:{
      en:'Inner states are dynamic. Notice patterns, but also give weight to sleep, stress, relationships, environment, support, and the practical conditions shaping how you feel.',
      th:'สภาวะใจเปลี่ยนแปลงได้ ควรดูรูปแบบที่เกิดซ้ำควบคู่กับการพักผ่อน ความเครียด ความสัมพันธ์ สภาพแวดล้อม การสนับสนุน และเงื่อนไขจริงที่กำลังมีผลต่อความรู้สึก'
    },
    spiritual_unseen:{
      en:'Keep the reading in the realm of symbolism and reflection. Tarot cannot verify deities, spirits, curses, past lives, or other supernatural claims as objective facts.',
      th:'ให้ผลการอ่านอยู่ในขอบเขตของสัญลักษณ์และการทบทวน ไพ่ทาโรต์ไม่สามารถยืนยันเทพ วิญญาณ คำสาป อดีตชาติ หรือข้ออ้างเหนือธรรมชาติอื่นๆ ว่าเป็นข้อเท็จจริงที่ตรวจสอบได้'
    },
    general:{
      en:'Use the card as one reflective angle and check the important parts of the situation against observable facts, choices, and consequences.',
      th:'ใช้ไพ่เป็นหนึ่งมุมสำหรับทบทวน แล้วตรวจส่วนสำคัญของสถานการณ์กับข้อเท็จจริง การเลือก และผลที่จะตามมาในชีวิตจริง'
    }
  });

  const FACET_CONDITIONS = Object.freeze({
    wealth:{
      en:'For a wealth question specifically, look for measurable change in net savings, income, debt, assets, and sustainable cash flow rather than treating “rich” as a single yes/no state.',
      th:'สำหรับคำถามเรื่องความร่ำรวยโดยตรง ให้ดูการเปลี่ยนแปลงที่วัดได้ของเงินออมสุทธิ รายได้ หนี้ ทรัพย์สิน และกระแสเงินสดที่ยั่งยืน มากกว่ามองคำว่า “รวย” เป็นสถานะใช่หรือไม่ใช่เพียงคำเดียว'
    },
    income:{ en:'For income, the useful real-world markers are pay, repeatable revenue, workload, and how stable the source of income is.', th:'สำหรับรายได้ ตัวชี้วัดที่ควรดูในโลกจริงคือค่าตอบแทน รายรับที่เกิดซ้ำ ภาระงาน และความมั่นคงของแหล่งรายได้' },
    investment:{ en:'For investments, use independent research, diversification, time horizon, and loss tolerance. This reading is not a price target or return forecast.', th:'สำหรับการลงทุน ควรใช้ข้อมูลอิสระ การกระจายความเสี่ยง ระยะเวลาลงทุน และระดับการขาดทุนที่รับได้ ผลการอ่านนี้ไม่ใช่เป้าราคาหรือการคาดการณ์ผลตอบแทน' },
    feelings:{ en:'What matters most is observable behavior: consistency, effort, communication, and whether words and actions line up.', th:'สิ่งที่มีน้ำหนักที่สุดคือพฤติกรรมที่สังเกตได้จริง ความสม่ำเสมอ ความพยายาม การสื่อสาร และความสอดคล้องระหว่างคำพูดกับการกระทำ' },
    divine_protection:{ en:'A protective archetype can be meaningful without proving that a named deity or being is literally assigned to you.', th:'ภาพสัญลักษณ์ของการคุ้มครองมีความหมายได้โดยไม่ต้องสรุปว่ามีเทพหรือสิ่งศักดิ์สิทธิ์องค์ใดถูกกำหนดให้คุ้มครองคุณจริง' },
    unseen_influence:{ en:'Fear, unusual sensations, bad luck, or a disturbing card are not evidence of a spirit, curse, or magical attack. Check ordinary explanations and safety first.', th:'ความกลัว ความรู้สึกแปลกๆ เรื่องไม่เป็นใจ หรือการได้ไพ่ที่หนัก ไม่ใช่หลักฐานว่ามีวิญญาณ คำสาป หรือคุณไสย ควรตรวจเหตุปกติและความปลอดภัยในชีวิตจริงก่อน' },
    timing:{ en:'Tarot can describe whether the moment feels early, active, delayed, or maturing; it cannot reliably supply an exact date.', th:'ไพ่ช่วยสะท้อนว่าจังหวะยังเร็ว กำลังเดินหน้า ถูกหน่วง หรือกำลังสุกงอมได้ แต่ไม่สามารถระบุวันเวลาที่แน่นอนได้อย่างน่าเชื่อถือ' },
    appearance:{ en:'People do not share one objective standard of beauty, so this is best read as the kind of visual impression and presence the card emphasizes.', th:'คนไม่ได้ใช้มาตรฐานความงามชุดเดียวกันทั้งหมด จึงควรอ่านคำถามนี้เป็นลักษณะของภาพรวมทางสายตาและการมีตัวตนที่ไพ่เน้น มากกว่าคะแนนความหล่อหรือสวยแบบสากล' },
    attractiveness:{ en:'Attraction combines looks, expression, voice, confidence, behavior, chemistry, and personal taste; the card can reflect the style of appeal, not a universal ranking.', th:'แรงดึงดูดเกิดจากทั้งหน้าตา สีหน้า น้ำเสียง ความมั่นใจ พฤติกรรม เคมีระหว่างคน และรสนิยมส่วนบุคคล ไพ่จึงสะท้อน “รูปแบบของเสน่ห์” ได้มากกว่าจัดอันดับแบบสากล' }
  });

  function directionFromTone(tone) {
    if (tone >= 2) return 'strong_positive';
    if (tone === 1) return 'moderate_positive';
    if (tone === 0) return 'mixed';
    if (tone === -1) return 'moderate_challenging';
    return 'strong_challenging';
  }

  function cleanContext(text, lang) {
    let value = String(text || '').trim();
    if (lang === 'th') {
      value = value.replace(/วันนี้/g, 'ในบริบทนี้').replace(/^เรื่อง(?:เงิน|งาน|ความสัมพันธ์)\s*/u, '');
    } else {
      value = value.replace(/\btoday\b/gi, 'in this context').replace(/^For (?:money|work|relationships?)[:,]?\s*/i, '');
    }
    return value.trim();
  }

  function timeLead(contract, lang) {
    const label = contract.timeframeMeta?.labels?.[lang];
    if (!contract.timeframeMeta?.explicit || !label) return '';
    if (lang === 'th') {
      if (['วันนี้','ตอนนี้','สัปดาห์นี้','เดือนนี้','ปีนี้','สัปดาห์หน้า','เดือนหน้า','ปีหน้า','ภายในสิ้นปี'].some((v) => label.startsWith(v))) return `${label} `;
      return `ในช่วง ${label} `;
    }
    if (/^(today|right now|this |next |by )/i.test(label)) return `${label.charAt(0).toUpperCase()}${label.slice(1)}, `;
    return `Over ${label}, `;
  }

  function directionSentence(direction, lang) {
    if (lang === 'th') {
      if (direction === 'strong_positive') return 'ให้สัญญาณสนับสนุนค่อนข้างชัด';
      if (direction === 'moderate_positive') return 'เอนมาทางสนับสนุนมากกว่าขัดขวาง';
      if (direction === 'mixed') return 'ให้ภาพที่ผสมกันและยังขึ้นอยู่กับเงื่อนไขสำคัญ';
      if (direction === 'moderate_challenging') return 'เอนมาทางระมัดระวังและชี้ว่ามีเงื่อนไขที่ต้องจัดการก่อน';
      return 'ชี้แรงต้านค่อนข้างชัดและไม่สนับสนุนการคาดหวังผลลัพธ์ง่ายๆ ในตอนนี้';
    }
    if (direction === 'strong_positive') return 'gives a fairly strong supportive signal';
    if (direction === 'moderate_positive') return 'leans more supportive than obstructed';
    if (direction === 'mixed') return 'is mixed and still depends on important conditions';
    if (direction === 'moderate_challenging') return 'leans cautious and points to conditions that need attention first';
    return 'shows clear resistance and does not support assuming an easy outcome right now';
  }

  function actionSentence(direction, lang) {
    if (lang === 'th') {
      if (direction === 'strong_positive') return 'น้ำหนักของไพ่เอนให้เดินหน้าต่อได้ แต่ควรเดินหน้าด้วยแผนที่ชัด';
      if (direction === 'moderate_positive') return 'น้ำหนักของไพ่เอนให้เดินหน้ามากกว่าถอย แต่ยังควรตรวจรายละเอียดก่อนตัดสินใจ';
      if (direction === 'mixed') return 'ไพ่ไม่ให้น้ำหนักไปทางใดทางหนึ่งมากพอ ควรใช้ปัจจัยจริงเป็นตัวตัดสิน';
      if (direction === 'moderate_challenging') return 'น้ำหนักของไพ่เอนให้ชะลอ ตรวจเงื่อนไข และอย่ารีบผูกมัดตัวเอง';
      return 'ไพ่เอนให้หยุดหรือทบทวนอย่างจริงจังก่อนเดินหน้าต่อ';
    }
    if (direction === 'strong_positive') return 'The card leans toward moving forward, provided you do it with a clear plan.';
    if (direction === 'moderate_positive') return 'The card leans more toward moving forward than stepping back, while still asking you to check the details.';
    if (direction === 'mixed') return 'The card does not lean strongly enough either way; let practical factors decide.';
    if (direction === 'moderate_challenging') return 'The card leans toward slowing down, checking the conditions, and avoiding a rushed commitment.';
    return 'The card leans toward stopping or seriously reassessing before you proceed.';
  }

  function buildProfile(card, analysis, lang) {
    const tone = CONTEXT.toneFor(card);
    const direction = directionFromTone(tone);
    const context = cleanContext(CONTEXT.contextText(card, analysis.domain || 'general', lang), lang);
    return Object.freeze({
      cardId:card.id,
      direction,
      directionLabel:DIRECTION[direction][lang],
      strength:Math.abs(tone) >= 2 ? 'strong' : Math.abs(tone) === 1 ? 'moderate' : 'balanced',
      tone,
      keywords:Object.freeze([...(card.keywords?.[lang] || [])]),
      context,
      topic:CONTRACTS.topicFor(analysis)[lang]
    });
  }

  function thirdPartyBoundary(lang) {
    return lang === 'th'
      ? 'ไพ่ไม่สามารถยืนยันความคิดหรือความรู้สึกส่วนตัวของอีกฝ่ายแทนเขาได้ แต่สามารถสะท้อนพลวัตและสัญญาณเชิงความสัมพันธ์ที่ควรสังเกต'
      : 'Tarot cannot verify another person’s private thoughts or feelings for them, but it can reflect the relationship dynamic and signals worth noticing.';
  }

  function spiritualBoundary(analysis, lang) {
    if (analysis.epistemicMode === 'unseen-threat') return lang === 'th'
      ? 'ไพ่ไม่สามารถยืนยันว่ามีวิญญาณ คำสาป คุณไสย หรือสิ่งเร้นลับกำลังทำร้ายคุณ และความกลัวไม่ควรถูกนับเป็นหลักฐานของสิ่งนั้น'
      : 'Tarot cannot verify that a spirit, curse, black magic, or other unseen force is harming you, and fear should not be treated as evidence of one.';
    return lang === 'th'
      ? 'ไพ่ไม่สามารถยืนยันข้อเท็จจริงเหนือธรรมชาติได้ คำตอบส่วนนี้จึงอ่านในฐานะสัญลักษณ์และมุมสำหรับทบทวน'
      : 'Tarot cannot verify supernatural claims as objective facts, so this part of the reading is symbolic and reflective.';
  }

  function buildDirect(card, analysis, contract, profile, lang) {
    const topic = contract.topic[lang];
    const lead = timeLead(contract, lang);
    const type = contract.questionType;
    const direction = profile.direction;

    if (analysis.epistemicMode === 'symbolic-only' || analysis.epistemicMode === 'unseen-threat') {
      const base = spiritualBoundary(analysis, lang);
      if (lang === 'th') return `${base} ${lead}เมื่อโฟกัสที่${topic} ${card.title.th} ชวนมองผ่านแกนนี้: ${profile.context}`;
      return `${base} ${lead}focused on ${topic}, ${card.title.en} points to this theme: ${profile.context}`;
    }

    if (type === 'feelings' || analysis.epistemicMode === 'third-party-uncertain') {
      const boundary = thirdPartyBoundary(lang);
      if (lang === 'th') return `${boundary} ${lead}สำหรับ${topic} ไพ่ใบนี้${directionSentence(direction, lang)} โดยแกนที่เด่นคือ ${profile.context}`;
      return `${boundary} ${lead}for ${topic}, this card ${directionSentence(direction, lang)}. The strongest thread is: ${profile.context}`;
    }

    if (analysis.domain === 'money_resources' && ['wealth','income','financial_growth','financial_stability','savings','debt','profit','financial_opportunity'].includes(analysis.facet) && ['degree','evaluation','outlook','probability','verification','open'].includes(type)) {
      if (lang === 'th') {
        const tendency = direction === 'strong_positive'
          ? 'มีโอกาสเห็นความก้าวหน้าที่ชัดกว่าปัจจุบัน'
          : direction === 'moderate_positive'
            ? 'มีแรงสนับสนุนให้สถานการณ์ดีขึ้น แต่ยังต้องอาศัยการจัดการที่ต่อเนื่อง'
            : direction === 'mixed'
              ? 'ยังมีทั้งโอกาสและข้อจำกัด จึงไม่ควรคาดว่าผลจะเดินขึ้นเป็นเส้นตรง'
              : direction === 'moderate_challenging'
                ? 'มีแรงกดดันที่ควรจัดการก่อน จึงยังไม่ใช่จังหวะที่ควรตั้งสมมติฐานเชิงบวกมากเกินไป'
                : 'มีแรงต้านค่อนข้างชัด และควรเน้นการป้องกันความเสียหายหรือสร้างฐานให้มั่นคงก่อน';
        const wealthCaveat = analysis.facet === 'wealth' ? ' นี่เป็นแนวโน้มของการยกระดับฐานะ ไม่ใช่คำรับรองว่าจะ “รวย” โดยอัตโนมัติ' : '';
        return `${lead}เมื่อโฟกัสที่${topic} ไพ่ใบนี้${directionSentence(direction, lang)} และ${tendency}${wealthCaveat}`;
      }
      const tendency = direction === 'strong_positive'
        ? 'there is meaningful room for visible improvement from where things stand now'
        : direction === 'moderate_positive'
          ? 'there is supportive momentum, although sustained management still matters'
          : direction === 'mixed'
            ? 'both opportunity and limitation are present, so the result is unlikely to move in a straight line'
            : direction === 'moderate_challenging'
              ? 'pressure needs attention first, so this is not a strong basis for optimistic assumptions yet'
              : 'resistance is pronounced, making protection and rebuilding the base more important than expecting rapid improvement';
      const wealthCaveat = analysis.facet === 'wealth' ? ' This is a direction of financial development, not a guarantee that you will automatically become “rich.”' : '';
      return `${lead}focused on ${topic}, this card ${directionSentence(direction, lang)}, and ${tendency}.${wealthCaveat}`;
    }

    if ((analysis.facet === 'appearance' || analysis.facet === 'attractiveness' || analysis.facet === 'charisma') && (analysis.perspective === 'public_view' || analysis.perspective === 'other_view' || analysis.target === 'public')) {
      if (lang === 'th') {
        const directionView = direction === 'strong_positive' ? 'ภาพรวมเอนมาทางดูดีและน่าดึงดูดค่อนข้างชัด' : direction === 'moderate_positive' ? 'ภาพรวมเอนมาทางบวกมากกว่าลบ' : direction === 'mixed' ? 'ภาพรวมมีหลายมิติและขึ้นอยู่กับรสนิยมของคนที่มอง' : 'แรงตึงบางอย่างอาจทำให้จุดเด่นถูกมองเห็นไม่เต็มที่';
        return `${lead}ถ้าอ่านในมุมของสายตาคนอื่นหรือคนทั่วไปต่อ${topic} ${directionView} เสน่ห์ที่ไพ่เน้นไม่ได้อยู่แค่รูปหน้า แต่รวมถึงภาพรวมของการวางตัว ซึ่งสะท้อนออกมาในลักษณะ ${profile.context}`;
      }
      const directionView = direction === 'strong_positive' ? 'the overall impression leans clearly attractive and favorable' : direction === 'moderate_positive' ? 'the overall impression leans more positive than negative' : direction === 'mixed' ? 'the impression is layered and depends more heavily on personal taste' : 'some tension may keep the strongest qualities from being fully visible';
      return `${lead}read from the angle of how other people may receive ${topic}, ${directionView}. The appeal here is not only about facial features; the card emphasizes the whole presence, which comes through as ${profile.context}`;
    }

    if (type === 'perception') {
      if (lang === 'th') return `${lead}เมื่อโฟกัสที่${topic} ไพ่ใบนี้สะท้อนว่าภาพที่คนอื่นอาจรับรู้${direction === 'strong_positive' || direction === 'moderate_positive' ? 'มีน้ำหนักไปทางบวก' : direction === 'mixed' ? 'มีหลายมิติและไม่ใช่ภาพเดียวตายตัว' : 'อาจถูกบดบังด้วยแรงตึงหรือความระมัดระวังบางอย่าง'} โดยคุณภาพที่เด่นคือ ${profile.context}`;
      return `${lead}focused on ${topic}, this card suggests that the impression others may receive is ${direction === 'strong_positive' || direction === 'moderate_positive' ? 'more positive than negative' : direction === 'mixed' ? 'layered rather than one fixed impression' : 'partly muted by tension or caution'}, with this quality standing out: ${profile.context}`;
    }

    if (type === 'decision') {
      const action = actionSentence(direction, lang);
      if (lang === 'th') return `${lead}สำหรับ${topic} ${action} ไพ่กำลังเน้นปัจจัยนี้เป็นพิเศษ: ${profile.context}`;
      return `${lead}for ${topic}, ${action} The card especially emphasizes this factor: ${profile.context}`;
    }

    if (type === 'timing') {
      if (lang === 'th') return `${lead}สำหรับ${topic} ไพ่ไม่ได้ให้วันเวลาที่แน่นอน แต่สะท้อน “คุณภาพของจังหวะ” ว่า${directionSentence(direction, lang)} แกนที่ควรดูคือ ${profile.context}`;
      return `${lead}for ${topic}, the card does not provide an exact date; it describes the quality of the timing as ${DIRECTION[direction].en}. The key theme is: ${profile.context}`;
    }

    if (type === 'cause') {
      if (lang === 'th') return `${lead}เมื่อถามถึงสาเหตุของ${topic} ไพ่ชี้ให้มองปัจจัยนี้เป็นแกนหลัก: ${profile.context}`;
      return `${lead}when asking what is driving ${topic}, the card points to this as the main factor: ${profile.context}`;
    }

    if (type === 'obstacle') {
      if (lang === 'th') return `${lead}อุปสรรคที่เกี่ยวข้องกับ${topic}ถูกสะท้อนผ่านแกนนี้ของไพ่: ${profile.context}`;
      return `${lead}the obstacle around ${topic} is reflected through this theme of the card: ${profile.context}`;
    }

    if (type === 'guidance') {
      if (lang === 'th') return `${lead}สำหรับ${topic} แนวทางที่ไพ่เน้นคือให้จัดการเรื่องนี้ผ่านแกนต่อไปนี้: ${profile.context}`;
      return `${lead}for ${topic}, the clearest guidance is to work with the situation through this theme: ${profile.context}`;
    }

    if (type === 'comparison') {
      if (lang === 'th') return `${lead}สำหรับ${topic} ไพ่หนึ่งใบเหมาะกับการชี้ “ปัจจัยตัดสินใจ” มากกว่าจัดอันดับสองทางเลือกแบบเด็ดขาด ปัจจัยที่ไพ่เน้นคือ ${profile.context}`;
      return `${lead}for ${topic}, a one-card reading is better at identifying the deciding factor than ranking two options absolutely. The factor this card emphasizes is: ${profile.context}`;
    }

    if (['degree','evaluation','outlook','probability','verification','compatibility'].includes(type)) {
      if (lang === 'th') return `${lead}เมื่อมองเฉพาะ${topic} ไพ่ใบนี้${directionSentence(direction, lang)} ความหมายที่เกี่ยวข้องกับคำถามนี้โดยตรงคือ ${profile.context}`;
      return `${lead}focused specifically on ${topic}, this card ${directionSentence(direction, lang)}. The meaning most relevant to your question is: ${profile.context}`;
    }

    if (lang === 'th') return `${lead}เมื่อโฟกัสที่${topic} ไพ่ใบนี้ชวนมองเรื่องนี้ผ่านแกนว่า ${profile.context}`;
    return `${lead}focused on ${topic}, this card invites you to look at the situation through this theme: ${profile.context}`;
  }

  function buildRationale(card, analysis, contract, profile, lang) {
    const topic = contract.topic[lang];
    const keywords = profile.keywords.slice(0,3).join(' · ');
    if (lang === 'th') {
      return `${card.title.th} มีแกนสำคัญอยู่ที่ ${keywords} เมื่อนำมาอ่านกับ${topic} ไพ่จึงให้น้ำหนัก${DIRECTION[profile.direction].th} โดยความหมายที่เชื่อมกับบริบทนี้คือ ${profile.context}`;
    }
    return `${card.title.en} centers on ${keywords}. Applied to ${topic}, those themes make the card ${DIRECTION[profile.direction].en}. The part of the card that connects most directly with this context is: ${profile.context}`;
  }

  function buildCondition(analysis, lang) {
    return FACET_CONDITIONS[analysis.facet]?.[lang] || DOMAIN_CONDITIONS[analysis.domain]?.[lang] || DOMAIN_CONDITIONS.general[lang];
  }

  function buildGanesha(card, analysis, contract, profile, lang) {
    const base = ASK_CONTENT.get(card.id, lang);
    const topic = contract.topic[lang];
    if (lang === 'th') {
      if (analysis.domain === 'money_resources') return `สำหรับ${topic} อย่าให้คำว่า “ได้” หรือ “ไม่ได้” กลบตัวเลขและการลงมือที่กำลังสร้างผลจริง ไพ่ใบนี้ให้ทิศทางไว้ แล้วส่วนที่คุณทำต่อจากนี้คือสิ่งที่เปลี่ยนทิศทางนั้นให้เป็นผลลัพธ์ ${base}`;
      if (analysis.domain === 'love_relationships') return `สำหรับ${topic} ให้ความหมายของไพ่เดินคู่กับพฤติกรรมจริงของคนทั้งสองฝ่าย สิ่งที่สม่ำเสมอมักพูดได้ชัดกว่าความหวังหรือความกลัวในช่วงสั้นๆ ${base}`;
      if (analysis.domain === 'self_image' || analysis.domain === 'social_perception') return `สำหรับ${topic} ไพ่ไม่ได้ขอให้คุณลดตัวเองเหลือเพียงคะแนนจากสายตาคนอื่น แต่ชวนให้เห็นว่าคุณภาพบางอย่างของการมีตัวตนทำให้ภาพรวมเปลี่ยนได้ ${base}`;
      if (analysis.domain === 'spiritual_unseen') return `สำหรับ${topic} เก็บสัญลักษณ์ที่มีความหมายไว้ได้ โดยไม่ต้องรีบเปลี่ยนมันเป็นข้อเท็จจริงเหนือธรรมชาติ ${base}`;
      return `สำหรับ${topic} ให้ไพ่ช่วยทำให้ประเด็นชัดขึ้น แล้วค่อยกลับไปดูสิ่งที่เกิดขึ้นจริงและสิ่งที่คุณทำได้ต่อจากนี้ ${base}`;
    }
    if (analysis.domain === 'money_resources') return `For ${topic}, do not let a simple “yes” or “no” replace the numbers and actions that create the real outcome. The card gives you a direction; what you do with that direction still matters. ${base}`;
    if (analysis.domain === 'love_relationships') return `For ${topic}, let the card sit beside the other person’s real behavior. Consistency usually tells you more than a short burst of hope or fear. ${base}`;
    if (analysis.domain === 'self_image' || analysis.domain === 'social_perception') return `For ${topic}, the card is not asking you to reduce yourself to a score from other people. It is highlighting the qualities of presence that shape the whole impression. ${base}`;
    if (analysis.domain === 'spiritual_unseen') return `For ${topic}, you can keep the symbolism that feels meaningful without turning it into a supernatural fact claim. ${base}`;
    return `For ${topic}, let the card clarify the issue, then return to what is actually happening and what you can do next. ${base}`;
  }

  function validate(result, contract, lang) {
    const missing = contract.mustCover.filter((item) => !result.coverage.includes(item));
    const direct = String(result.direct || '').toLocaleLowerCase(lang === 'th' ? 'th-TH' : 'en-US');
    const rationale = String(result.rationale || '').toLocaleLowerCase(lang === 'th' ? 'th-TH' : 'en-US');
    const anchors = contract.topic.anchors?.[lang] || [];
    const anchorPass = anchors.length === 0 || anchors.some((anchor) => direct.includes(String(anchor).toLocaleLowerCase(lang === 'th' ? 'th-TH' : 'en-US')) || rationale.includes(String(anchor).toLocaleLowerCase(lang === 'th' ? 'th-TH' : 'en-US')));
    const timeLabel = contract.timeframeMeta?.labels?.[lang] || '';
    const timePass = !contract.timeframeMeta?.explicit || !timeLabel || direct.includes(timeLabel.toLocaleLowerCase(lang === 'th' ? 'th-TH' : 'en-US'));
    const futureExplicit = Boolean(contract.timeframeMeta?.explicit && (contract.timeframeMeta?.monthsApprox ?? 0) > 0);
    const noTodayDrift = !futureExplicit || (lang === 'th' ? !/วันนี้/u.test(direct + ' ' + rationale) : !/\btoday\b/i.test(direct + ' ' + rationale));
    const noGuarantee = lang === 'th'
      ? !/(?:รับประกันว่า|แน่นอนว่าจะ|ชัวร์ว่า|ฟันธงว่า)/u.test(direct)
      : !/\b(?:guaranteed to|definitely will|certainly will)\b/i.test(direct);
    return Object.freeze({ ok:missing.length === 0 && anchorPass && timePass && noTodayDrift && noGuarantee, missing:Object.freeze(missing), anchorPass, timePass, noTodayDrift, noGuarantee });
  }

  function coverageFor(analysis, contract) {
    const coverage = new Set(['topic','card_rationale','condition']);
    if (contract.mustCover.includes('direction')) coverage.add('direction');
    if (contract.timeframeMeta?.explicit) coverage.add('timeframe');
    if (contract.target && contract.target !== 'situation') coverage.add('target');
    if (contract.metric && contract.metric !== 'general') coverage.add('metric');
    if (analysis.epistemicMode === 'third-party-uncertain' || analysis.questionType === 'feelings') coverage.add('third_party_boundary');
    if (analysis.epistemicMode === 'symbolic-only' || analysis.epistemicMode === 'unseen-threat') coverage.add('epistemic_boundary');
    return [...coverage];
  }

  function fallback(card, analysis, contract, profile, lang) {
    const topic = contract.topic[lang];
    const lead = timeLead(contract, lang);
    const condition = buildCondition(analysis, lang);
    if (lang === 'th') {
      return {
        direct:`${lead}สำหรับ${topic} ไพ่ใบนี้ให้ทิศทาง${DIRECTION[profile.direction].th} โดยไม่ถือว่าเป็นผลลัพธ์ที่รับประกันได้`,
        rationale:`${card.title.th} มีคำสำคัญคือ ${profile.keywords.slice(0,3).join(' · ')} จึงถูกนำมาใช้ตอบประเด็นเรื่อง${topic}โดยตรง`,
        condition,
        ganesha:buildGanesha(card, analysis, contract, profile, lang)
      };
    }
    return {
      direct:`${lead}for ${topic}, this card reads as ${DIRECTION[profile.direction].en} without treating that direction as a guaranteed outcome.`,
      rationale:`${card.title.en} centers on ${profile.keywords.slice(0,3).join(' · ')}, so those themes are being applied directly to ${topic}.`,
      condition,
      ganesha:buildGanesha(card, analysis, contract, profile, lang)
    };
  }

  function compose(cardOrId, analysis, lang='en') {
    const card = typeof cardOrId === 'string' ? CONTENT.getCard(cardOrId) : cardOrId;
    if (!card) return null;
    const safeLang = lang === 'th' ? 'th' : 'en';
    const safeAnalysis = analysis || ANALYZER.analyze('');
    const contract = CONTRACTS.build(safeAnalysis);
    const profile = buildProfile(card, safeAnalysis, safeLang);
    const base = {
      direct:buildDirect(card, safeAnalysis, contract, profile, safeLang),
      rationale:buildRationale(card, safeAnalysis, contract, profile, safeLang),
      condition:buildCondition(safeAnalysis, safeLang),
      ganesha:buildGanesha(card, safeAnalysis, contract, profile, safeLang)
    };
    const legacy = CONTEXT.interpret(card, safeAnalysis, safeLang);
    const coverage = coverageFor(safeAnalysis, contract);
    let result = {
      version:VERSION,
      contract,
      profile,
      bridge:Object.freeze({ topic:contract.topic[safeLang], metric:contract.metric, direction:profile.direction, timeframe:contract.timeframe, support:profile.context }),
      contextLabel:legacy?.contextLabel || ANALYZER.label(safeAnalysis.domain || 'general', safeLang),
      direct:base.direct,
      rationale:base.rationale,
      condition:base.condition,
      ganesha:base.ganesha,
      reflection:legacy?.reflection || card.reflection?.[safeLang] || '',
      coverage:Object.freeze(coverage),
      fallbackUsed:false
    };
    let validation = validate(result, contract, safeLang);
    if (!validation.ok) {
      const fb = fallback(card, safeAnalysis, contract, profile, safeLang);
      result = { ...result, ...fb, fallbackUsed:true };
      validation = validate(result, contract, safeLang);
    }
    return Object.freeze({ ...result, validation });
  }

  window.LGTAskSemantic = Object.freeze({ version:VERSION, compose, buildProfile, validate });
})();

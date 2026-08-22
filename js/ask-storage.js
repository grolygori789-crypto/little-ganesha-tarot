(() => {
  'use strict';

  const CONTENT = window.LGTReadingContent;
  const ENGINE = window.LGTReadingEngine;
  const ASK_CONTENT = window.LGTAskContent;
  const CONTEXT = window.LGTAskContext;
  if (!CONTENT || !ENGINE || !ASK_CONTENT || !CONTEXT) throw new Error('Ask storage requires reading content, engine, Ask content, and Ask context.');

  const STORAGE_KEY = 'lgt.reading.ask.v1';
  const SCHEMA_VERSION = 1;
  const ORIENTATION = 'upright';
  const MAX_ENTRIES_PER_DAY = Number.POSITIVE_INFINITY;

  const RELATED_FACETS = Object.freeze({
    wealth: 'money:wealth-growth',
    financial_growth: 'money:wealth-growth',
    feelings: 'love:romantic-interest',
    romantic_attraction: 'love:romantic-interest',
    how_others_see_me: 'social:public-view',
    public_image: 'social:public-view'
  });

  const DIRECTIONAL_TYPES = new Set(['degree', 'evaluation', 'outlook', 'probability', 'verification']);
  const RELATIONSHIP_FAMILIES = new Set(['love:romantic-interest']);

  function compactHash(value) {
    let hash = 0x811c9dc5;
    for (const char of String(value || '')) {
      hash ^= char.codePointAt(0);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash.toString(36);
  }

  function relationshipSubjectHash(text) {
    const source = String(text || '').toLocaleLowerCase().trim();
    const generic = new Set(['เขา','เธอ','คนนั้น','คนนี้','แฟน','คนรัก','คู่รัก','สามี','ภรรยา','he','she','they','partner','boyfriend','girlfriend','husband','wife','spouse']);
    let cue = '';
    const thai = source.match(/(?:^|\s)([^\s?!.]{2,24}?)(?:\s*ยัง)?\s*(?:ชอบ|รัก|คิดถึง|มีใจ|รู้สึก)/u);
    if (thai) cue = thai[1].trim();
    if (!cue) {
      const english = source.match(/\b(?:does|do|is|are|will|could|can|did)\s+([a-z][a-z'’-]{1,24})\s+(?:still\s+)?(?:like|likes|love|loves|miss|misses|want|wants|feel|feels|attracted)\b/i)
        || source.match(/\bwhat\s+does\s+([a-z][a-z'’-]{1,24})\s+feel\b/i)
        || source.match(/(?:^|\s)([a-z][a-z'’-]{1,24})\s+(?:still\s+)?(?:likes|loves|misses|wants|feels|is\s+attracted)\b/i);
      if (english) cue = english[1].trim();
    }
    cue = cue.replace(/^(?:คุณ|นาย|นางสาว|นาง|mr\.?|ms\.?|mrs\.?)\s*/iu, '').trim();
    if (!cue || generic.has(cue) || cue.length < 2) return '';
    return compactHash(cue);
  }

  function emptyStore(localDate) {
    return {
      schemaVersion: SCHEMA_VERSION,
      localDate,
      cardContentVersion: CONTENT.version,
      askContentVersion: ASK_CONTENT.version,
      askContextVersion: CONTEXT.version,
      readings: {}
    };
  }

  function read(localDate = ENGINE.localDateISO()) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyStore(localDate);
      const parsed = JSON.parse(raw);
      if (
        parsed?.schemaVersion !== SCHEMA_VERSION ||
        parsed?.localDate !== localDate ||
        typeof parsed?.readings !== 'object' ||
        !parsed.readings
      ) return emptyStore(localDate);
      return parsed;
    } catch (_) {
      return emptyStore(localDate);
    }
  }

  function get(fingerprint, localDate = ENGINE.localDateISO()) {
    if (!fingerprint) return null;
    const record = read(localDate).readings[fingerprint];
    if (!record || record.orientation !== ORIENTATION || !CONTENT.getCard(record.cardId)) return null;
    return { ...record, matchType: 'exact', matchedFingerprint: fingerprint };
  }

  function typeFamily(questionType) {
    if (DIRECTIONAL_TYPES.has(questionType)) return 'directional';
    return questionType || 'open';
  }

  function inferFamily(analysis) {
    if (!analysis) return '';
    const text = String(analysis.text || '').toLocaleLowerCase();

    // Strong bilingual subject signals override generic wrappers such as
    // “chance/opportunity”, so paraphrases still resolve to the real topic.
    if (/(?:หมดไฟ|เบิร์นเอาต์|\bburn(?:ed)?\s*out\b|\bburnout\b)/iu.test(text)) return 'inner:burnout';
    if (/(?:โปรเจกต์|โครงการ|งานชิ้นนี้|งานนี้|\bproject\b)/iu.test(text) && /(?:สำเร็จ|ประสบความสำเร็จ|มีโอกาสสำเร็จ|\bsucceed\b|\bsuccess\b|chance of success)/iu.test(text)) return 'work:project-success';
    if (/(?:คนอื่นมอง|คนทั่วไปมอง|ในสายตาคนอื่น|ในสายตาคนทั่วไป|\bhow do other people see me\b|\bhow (?:do )?others see me\b|\bhow people (?:in general )?see me\b)/iu.test(text)) return 'social:public-view';
    if (/(?:รวย|มั่งคั่ง|ฐานะ|การเงิน.{0,14}(?:ดีขึ้น|เติบโต|เพิ่มขึ้น)|(?:financial|finances?|wealth|wealthy|wealthier|richer).{0,18}(?:grow|growth|improve|better|increase)|(?:get|become|becoming)\s+(?:rich|richer|wealthy|wealthier))/iu.test(text)) {
      return 'money:wealth-growth';
    }
    if (/(?:รายได้|เงินเดือน|income|salary|earnings?)/iu.test(text)) return 'money:income';
    if (/(?:หนี้|debt)/iu.test(text)) return 'money:debt';
    if (/(?:เงินออม|เงินเก็บ|savings?)/iu.test(text)) return 'money:savings';
    if (/(?:งานใหม่|เปลี่ยนงาน|new job|change jobs?|switch jobs?)/iu.test(text)) return 'work:new-job';
    if (/(?:สิ่งศักดิ์สิทธิ์.{0,20}คุ้มครอง|การคุ้มครอง.{0,20}จิตวิญญาณ|คุ้มครอง.{0,20}(?:จิตวิญญาณ|ทางธรรม)|\b(?:spiritually protected|spiritual protection|divine protection|protected spiritually)\b)/iu.test(text)) return 'spiritual:protection';
    if (/(?:ชอบ(?:ฉัน|ผม|หนู|เรา)|รัก(?:ฉัน|ผม|หนู|เรา)|มีใจให้(?:ฉัน|ผม|หนู|เรา)|รู้สึก(?:ยังไง|อย่างไร)?กับ(?:ฉัน|ผม|หนู|เรา)|\b(?:like|love|attracted to) me\b|\bfeel(?:s)? about me\b)/iu.test(text)) return 'love:romantic-interest';

    if (RELATED_FACETS[analysis.facet]) return RELATED_FACETS[analysis.facet];
    if (analysis.facet && analysis.facet !== 'general') return `${analysis.facetDomain || analysis.domain || 'general'}:${analysis.facet}`;
    return '';
  }

  function familyDomain(family, analysis) {
    if (family.startsWith('money:')) return 'money_resources';
    if (family.startsWith('love:')) return 'love_relationships';
    if (family.startsWith('work:')) return 'work_purpose';
    if (family.startsWith('spiritual:')) return 'spiritual_unseen';
    return analysis?.facetDomain || analysis?.domain || 'general';
  }

  function normalizePersonalTarget(domain, target) {
    const value = target || 'situation';
    if (['money_resources', 'self_image', 'inner_growth', 'spiritual_unseen'].includes(domain) && ['self', 'situation'].includes(value)) return 'personal';
    if (domain === 'work_purpose' && ['self', 'situation', 'job'].includes(value)) return 'personal';
    if (domain === 'choice_action' && ['self', 'situation'].includes(value)) return 'personal-choice';
    return value;
  }

  function normalizePersonalPerspective(domain, perspective, normalizedTarget) {
    const value = perspective || 'general';
    if (['personal', 'personal-choice'].includes(normalizedTarget) && ['self_view', 'general'].includes(value) && ['money_resources', 'work_purpose', 'self_image', 'inner_growth', 'spiritual_unseen', 'choice_action'].includes(domain)) return 'personal';
    return value;
  }

  function normalizeTimeframe(domain, family, timeframe) {
    const value = timeframe || 'unspecified';
    if (value !== 'unspecified') return value;
    if (domain === 'choice_action' || domain === 'self_image' || domain === 'social_perception' || domain === 'inner_growth') return 'now';
    if (family === 'love:romantic-interest' || family === 'spiritual:protection') return 'now';
    return value;
  }

  function descriptor(analysis) {
    const family = inferFamily(analysis);
    if (!family) return null;
    const rawTarget = analysis?.target || 'situation';
    const subjectHash = RELATIONSHIP_FAMILIES.has(family) ? relationshipSubjectHash(analysis?.text || '') : '';
    if (RELATIONSHIP_FAMILIES.has(family) && !['partner', 'ex', 'crush', 'relationship'].includes(rawTarget) && !subjectHash) return null;
    const domain = familyDomain(family, analysis);
    const target = family === 'social:public-view'
      ? 'public'
      : (RELATIONSHIP_FAMILIES.has(family) && subjectHash ? 'named-other' : normalizePersonalTarget(domain, rawTarget));
    const perspective = family === 'social:public-view'
      ? 'public_view'
      : normalizePersonalPerspective(domain, analysis?.perspective, target);
    return Object.freeze({
      family,
      domain,
      typeFamily: family === 'love:romantic-interest' ? 'romantic-interest' : typeFamily(analysis?.questionType),
      target,
      subjectHash,
      perspective,
      timeframe: normalizeTimeframe(domain, family, analysis?.timeframe),
      conditional: Boolean(analysis?.conditional),
      comparison: Boolean(analysis?.comparison)
    });
  }

  function snapshotAnalysis(analysis) {
    if (!analysis) return null;
    const timeframeMeta = analysis.timeframeMeta ? {
      key: analysis.timeframeMeta.key || analysis.timeframe || 'unspecified',
      explicit: Boolean(analysis.timeframeMeta.explicit),
      labels: analysis.timeframeMeta.labels ? { ...analysis.timeframeMeta.labels } : undefined,
      amount: analysis.timeframeMeta.amount ?? null,
      unit: analysis.timeframeMeta.unit ?? null,
      monthsApprox: analysis.timeframeMeta.monthsApprox ?? null
    } : null;
    return {
      domain: analysis.domain || 'general',
      facet: analysis.facet || 'general',
      facetDomain: analysis.facetDomain || null,
      questionType: analysis.questionType || 'open',
      target: analysis.target || 'situation',
      perspective: analysis.perspective || 'general',
      metric: analysis.metric || 'general',
      timeframe: analysis.timeframe || 'unspecified',
      timeframeMeta,
      polarity: analysis.polarity || 'open',
      certaintyRequest: analysis.certaintyRequest || 'low',
      conditional: Boolean(analysis.conditional),
      comparison: Boolean(analysis.comparison),
      epistemicMode: analysis.epistemicMode || null
    };
  }

  function descriptorsMatch(a, b) {
    if (!a || !b) return false;
    return a.family === b.family &&
      a.domain === b.domain &&
      a.typeFamily === b.typeFamily &&
      a.target === b.target &&
      (a.subjectHash || '') === (b.subjectHash || '') &&
      a.perspective === b.perspective &&
      a.timeframe === b.timeframe &&
      a.conditional === b.conditional &&
      a.comparison === b.comparison;
  }

  function descriptorFromRecord(record) {
    if (record?.semantic) return record.semantic;
    if (!record) return null;
    return descriptor({
      domain: record.contextKey,
      facet: record.facet,
      facetDomain: record.facetDomain,
      questionType: record.questionType,
      target: record.target,
      perspective: record.perspective,
      timeframe: record.timeframe,
      conditional: record.conditional,
      comparison: record.comparison,
      text: ''
    });
  }

  function findSemantic(analysis, { excludeFingerprint = '', localDate = ENGINE.localDateISO() } = {}) {
    const targetDescriptor = descriptor(analysis);
    if (!targetDescriptor) return null;
    const readings = read(localDate).readings;
    let best = null;
    for (const [fingerprint, record] of Object.entries(readings)) {
      if (fingerprint === excludeFingerprint) continue;
      if (!record || record.orientation !== ORIENTATION || !CONTENT.getCard(record.cardId)) continue;
      if (!descriptorsMatch(targetDescriptor, descriptorFromRecord(record))) continue;
      if (!best || String(record.createdAt || '') > String(best.createdAt || '')) {
        best = { ...record, matchType: 'semantic', matchedFingerprint: fingerprint };
      }
    }
    return best;
  }

  function trim(readings) {
    const entries = Object.entries(readings);
    if (entries.length <= MAX_ENTRIES_PER_DAY) return readings;
    entries.sort((a, b) => String(a[1]?.createdAt || '').localeCompare(String(b[1]?.createdAt || '')));
    return Object.fromEntries(entries.slice(entries.length - MAX_ENTRIES_PER_DAY));
  }

  function save({ fingerprint, cardId, sessionId = '', analysis = null, localDate = ENGINE.localDateISO() }) {
    const card = CONTENT.getCard(cardId);
    if (!fingerprint || !card) return false;
    try {
      const store = read(localDate);
      store.schemaVersion = SCHEMA_VERSION;
      store.localDate = localDate;
      store.cardContentVersion = CONTENT.version;
      store.askContentVersion = ASK_CONTENT.version;
      store.askContextVersion = CONTEXT.version;
      const previous = store.readings[fingerprint] || {};
      store.readings[fingerprint] = {
        cardId: card.id,
        orientation: ORIENTATION,
        sessionId,
        createdAt: previous.createdAt || new Date().toISOString(),
        contextKey: analysis?.domain || previous.contextKey || null,
        facet: analysis?.facet || previous.facet || null,
        facetDomain: analysis?.facetDomain || previous.facetDomain || null,
        questionType: analysis?.questionType || previous.questionType || null,
        perspective: analysis?.perspective || previous.perspective || null,
        target: analysis?.target || previous.target || null,
        metric: analysis?.metric || previous.metric || null,
        polarity: analysis?.polarity || previous.polarity || null,
        timeframe: analysis?.timeframe || previous.timeframe || null,
        conditional: analysis ? Boolean(analysis.conditional) : Boolean(previous.conditional),
        comparison: analysis ? Boolean(analysis.comparison) : Boolean(previous.comparison),
        semantic: descriptor(analysis) || previous.semantic || null,
        analysisSnapshot: snapshotAnalysis(analysis) || previous.analysisSnapshot || null
      };
      store.readings = trim(store.readings);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      return true;
    } catch (_) {
      return false;
    }
  }

  window.LGTAskStorage = Object.freeze({
    key: STORAGE_KEY,
    schemaVersion: SCHEMA_VERSION,
    maxEntriesPerDay: MAX_ENTRIES_PER_DAY,
    get,
    findSemantic,
    descriptor,
    save
  });
})();

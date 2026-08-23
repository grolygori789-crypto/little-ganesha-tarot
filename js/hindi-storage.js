(() => {
  'use strict';

  const BASE = window.LGTAskStorage;
  const ENGINE = window.LGTReadingEngine;
  const CONTENT = window.LGTReadingContent;
  if (!BASE || !ENGINE || !CONTENT) throw new Error('Hindi Ask storage requires Ask storage, Reading Engine, and content.');

  const VERSION = 'ask-storage-hi-v1';
  const KEY = BASE.key || 'lgt.reading.ask.v1';
  const ORIENTATION = 'upright';

  const FACET_FAMILY = Object.freeze({
    wealth:'money:wealth-growth', financial_growth:'money:wealth-growth', income:'money:income', debt:'money:debt', savings:'money:savings', investment:'money:investment',
    feelings:'love:romantic-interest', romantic_attraction:'love:romantic-interest', reconciliation:'love:reconciliation', marriage:'love:marriage', relationship_future:'love:relationship-future',
    new_job:'work:new-job', promotion:'work:promotion', project:'work:project', business:'work:business', career_direction:'work:career-direction',
    appearance:'self:appearance', attractiveness:'self:attractiveness', how_others_see_me:'social:public-view',
    anxiety:'inner:anxiety', motivation:'inner:motivation', healing:'inner:healing', purpose:'inner:purpose',
    divine_protection:'spiritual:protection', unseen_influence:'spiritual:unseen-influence'
  });

  function isHindiAnalysis(analysis) {
    return String(analysis?.version || '').includes('hi') || /[\u0900-\u097F]/u.test(String(analysis?.text || ''));
  }

  function namedSubjectHash(analysis) {
    const text = String(analysis?.text || '');
    const marker = text.match(/\bhn([a-z0-9]+)\b/i);
    return marker ? marker[1] : '';
  }

  function familyFor(analysis) {
    if (!analysis) return '';
    if (FACET_FAMILY[analysis.facet]) return FACET_FAMILY[analysis.facet];
    if (analysis.domain === 'social_perception') return 'social:public-view';
    if (analysis.domain === 'love_relationships') return 'love:relationship-general';
    if (analysis.domain === 'work_purpose') return 'work:general';
    if (analysis.domain === 'money_resources') return 'money:general';
    if (analysis.domain === 'inner_growth') return 'inner:general';
    if (analysis.domain === 'self_image') return 'self:general';
    if (analysis.domain === 'spiritual_unseen') return 'spiritual:general';
    if (analysis.domain === 'choice_action') return 'choice:general';
    if (analysis.domain === 'outlook_opportunity') return 'outlook:general';
    return '';
  }

  function typeFamily(type) {
    return ['degree','evaluation','outlook','probability','verification'].includes(type) ? 'directional' : (type || 'open');
  }

  function descriptor(analysis) {
    if (!isHindiAnalysis(analysis)) return BASE.descriptor(analysis);
    const family = familyFor(analysis);
    if (!family) return null;
    const subjectHash = family === 'love:romantic-interest' ? namedSubjectHash(analysis) : '';
    const target = subjectHash ? 'named-other' : (analysis.target || 'situation');
    const perspective = analysis.perspective || 'general';
    const timeframe = analysis.timeframe || 'unspecified';
    return Object.freeze({
      family,
      domain: analysis.domain || 'general',
      typeFamily: family === 'love:romantic-interest' ? 'romantic-interest' : typeFamily(analysis.questionType),
      target,
      subjectHash,
      perspective,
      timeframe,
      conditional: Boolean(analysis.conditional),
      comparison: Boolean(analysis.comparison)
    });
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

  function readStore(localDate = ENGINE.localDateISO()) {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!parsed || parsed.localDate !== localDate || typeof parsed.readings !== 'object' || !parsed.readings) return null;
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function writeSemantic(fingerprint, semantic, localDate = ENGINE.localDateISO()) {
    if (!fingerprint || !semantic) return;
    try {
      const store = readStore(localDate);
      const record = store?.readings?.[fingerprint];
      if (!record) return;
      record.semantic = semantic;
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch (_) {}
  }

  function save(options = {}) {
    const ok = BASE.save(options);
    if (ok && isHindiAnalysis(options.analysis)) writeSemantic(options.fingerprint, descriptor(options.analysis), options.localDate || ENGINE.localDateISO());
    return ok;
  }

  function descriptorFromRecord(record) {
    if (!record) return null;
    if (record.semantic) return record.semantic;
    const snap = record.analysisSnapshot || {};
    return descriptor({
      version: snap.version || '',
      domain: snap.domain || record.contextKey,
      facet: snap.facet || record.facet,
      questionType: snap.questionType || record.questionType,
      target: snap.target || record.target,
      perspective: snap.perspective || record.perspective,
      timeframe: snap.timeframe || record.timeframe,
      conditional: snap.conditional ?? record.conditional,
      comparison: snap.comparison ?? record.comparison,
      text: snap.text || ''
    });
  }

  function findSemantic(analysis, options = {}) {
    if (!isHindiAnalysis(analysis)) return BASE.findSemantic(analysis, options);
    const { excludeFingerprint = '', localDate = ENGINE.localDateISO() } = options;
    const target = descriptor(analysis);
    if (!target) return null;
    const store = readStore(localDate);
    if (!store) return null;
    let best = null;
    for (const [fingerprint, record] of Object.entries(store.readings)) {
      if (fingerprint === excludeFingerprint) continue;
      if (!record || record.orientation !== ORIENTATION || !CONTENT.getCard(record.cardId)) continue;
      const candidate = descriptorFromRecord(record);
      if (!descriptorsMatch(target, candidate)) continue;
      if (!best || String(record.createdAt || '') > String(best.createdAt || '')) {
        best = { ...record, matchType:'semantic', matchedFingerprint:fingerprint };
      }
    }
    return best;
  }

  window.LGTAskStorage = Object.freeze({
    ...BASE,
    version: VERSION,
    descriptor,
    findSemantic,
    save
  });
})();

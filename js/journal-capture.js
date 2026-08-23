(() => {
  'use strict';

  const VERSION = 'journal-capture-v1';
  const Store = window.LGTJournalStorage;
  const JC = window.LGTJournalContent;
  const Tarot = window.LGTReadingContent;
  if (!Store || !JC || !Tarot) return;

  const seen = new Set();
  let running = false;
  let timer = null;

  const el = (id) => document.getElementById(id);
  const visible = (id) => { const n = el(id); return Boolean(n && !n.hidden && !n.closest('[hidden]')); };
  const text = (id) => String(el(id)?.textContent || '').trim();
  const lang = () => JC.language(document.documentElement.lang);
  const localDate = () => window.LGTReadingDay?.localDateISO?.() || window.LGTReadingEngine?.localDateISO?.() || (() => {
    const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  })();

  function parseCardId(src) {
    const match = String(src || '').match(/(?:^|\/)(\d{2})_[^/]+\.(?:png|webp|jpg|jpeg)(?:\?|$)/i);
    return match ? match[1] : null;
  }

  function cardIdsFrom(rootSelector) {
    return [...document.querySelectorAll(`${rootSelector} img`)]
      .map((img) => parseCardId(img.currentSrc || img.src))
      .filter(Boolean)
      .filter((id, index, arr) => arr.indexOf(id) === index);
  }

  function labelText(labelId, bodyId) {
    const body = text(bodyId); if (!body) return null;
    return { label: text(labelId), text: body };
  }

  function listSection(labelId, listId) {
    const list = el(listId); if (!list) return null;
    const items = [...list.querySelectorAll('li')].map((n) => n.textContent.trim()).filter(Boolean);
    if (!items.length) return null;
    return { label: text(labelId), text: items.map((x, i) => `${i + 1}. ${x}`).join('\n') };
  }

  function modeName(mode, language = lang()) { return JC.copy(language).mode[mode] || mode; }
  function focusName(id, language = lang()) { return id ? (JC.copy(language).focus[id] || id) : ''; }
  function cardTitles(ids, language = lang()) {
    return ids.map((id) => {
      const card = Tarot.getCard(id);
      return card?.title?.[language] || card?.title?.en || card?.canonicalTitle || id;
    });
  }

  function completedISO(value) {
    if (typeof value === 'number' && Number.isFinite(value)) return new Date(value).toISOString();
    if (value) { const d = new Date(value); if (!Number.isNaN(d.getTime())) return d.toISOString(); }
    return new Date().toISOString();
  }

  function signature(snapshot) {
    const s = JSON.stringify(snapshot);
    let h = 2166136261;
    for (let i=0;i<s.length;i+=1) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(36);
  }

  async function save(base, snapshot) {
    if (!Store.settings.autoSave()) return;
    const language = lang();
    const sig = signature(snapshot);
    const cacheKey = `${base.id}|${language}|${sig}`;
    if (seen.has(cacheKey)) return;
    await Store.saveSnapshot({ ...base, savedLanguage: base.savedLanguage || language }, language, snapshot);
    seen.add(cacheKey);
  }

  function matchFocusRecord(storage, ids) {
    if (!storage?.getAll || ids.length !== 3) return null;
    const all = storage.getAll();
    const match = Object.entries(all).find(([, record]) => {
      const saved = (record.cards || []).map((x) => String(x.cardId));
      return saved.length === 3 && saved.every((id, i) => id === ids[i]);
    });
    return match ? { focusId: match[0], record: match[1] } : null;
  }

  async function captureDaily() {
    if (!visible('dailyInterpretation')) return;
    const record = window.LGTReadingEngine?.getTodayRecord?.();
    if (!record?.cards?.[0]?.cardId) return;
    const cardId = String(record.cards[0].cardId);
    const language = lang();
    const sections = [labelText('dailyThemeLabel','dailyMeaning'), labelText('dailyReflectionLabel','dailyReflection')].filter(Boolean);
    const lensRoot = el('dailyLensesList');
    if (lensRoot) [...lensRoot.querySelectorAll('details')].forEach((details) => {
      const label = details.querySelector('summary')?.textContent?.trim() || '';
      const body = details.querySelector('p')?.textContent?.trim() || '';
      if (body) sections.push({ label, text: body });
    });
    const snapshot = {
      title: modeName('daily', language),
      subtitle: cardTitles([cardId], language)[0],
      sections,
      cardTitles: cardTitles([cardId], language)
    };
    await save({ id:`daily:${record.localDate}`, sourceKey:`daily:${record.localDate}`, mode:'daily', localDate:record.localDate, completedAt:new Date().toISOString(), createdAt:record.createdAt, cards:[{cardId,positionId:'today'}], focusId:null, numbers:[], question:'' }, snapshot);
  }

  function readAskStore() {
    try {
      const key = window.LGTAskStorage?.key || 'lgt.reading.ask.v1';
      const box = JSON.parse(localStorage.getItem(key) || 'null');
      if (!box?.readings || typeof box.readings !== 'object') return [];
      return Object.entries(box.readings).map(([fingerprint, record]) => ({ fingerprint, record }));
    } catch (_) { return []; }
  }

  function currentAskRecord(cardId) {
    const rows = readAskStore().filter(({record}) => String(record?.cardId) === String(cardId));
    rows.sort((a,b) => String(b.record?.createdAt || '').localeCompare(String(a.record?.createdAt || '')));
    return rows[0] || null;
  }

  function compactHash(value) {
    let h=2166136261; for(const ch of String(value||'')){h^=ch.codePointAt(0);h=Math.imul(h,16777619)>>>0;} return h.toString(36);
  }

  async function captureAsk() {
    if (!visible('askInterpretation')) return;
    const cardId = parseCardId(el('askCardFront')?.currentSrc || el('askCardFront')?.src) || cardIdsFrom('#askInterpretation')[0];
    if (!cardId) return;
    const language = lang();
    const row = currentAskRecord(cardId);
    const questionText = text('askResultQuestion') || text('askSealText');
    const identity = row?.fingerprint || compactHash(`${localDate()}|${cardId}|${questionText}`);
    const record = row?.record || {};
    const sections = [
      labelText('askDirectLabel','askDirectAnswer'),
      labelText('askWhyLabel','askWhyText'),
      labelText('askConditionLabel','askConditionText'),
      labelText('askGaneshaLabel','askGaneshaText'),
      labelText('askCarryLabel','askReflection')
    ].filter(Boolean);
    const focus = text('askFocusResult');
    const snapshot = {
      title: modeName('ask', language),
      subtitle: focus || cardTitles([cardId], language)[0],
      question: Store.settings.saveAskQuestion() ? questionText : '',
      questionHidden: !Store.settings.saveAskQuestion(),
      sections,
      cardTitles: cardTitles([cardId], language)
    };
    await save({ id:`ask:${localDate()}:${identity}`, sourceKey:`ask:${localDate()}:${identity}`, mode:'ask', localDate:localDate(), completedAt:new Date().toISOString(), createdAt:record.createdAt, cards:[{cardId,positionId:'answer'}], focusId:null, numbers:[], question:Store.settings.saveAskQuestion()?questionText:'' }, snapshot);
  }

  async function captureThree() {
    if (!visible('threeInterpretation')) return;
    const ids = cardIdsFrom('#threeRevealedCards').slice(0,3);
    const match = matchFocusRecord(window.LGTThreeStorage, ids); if (!match) return;
    const language = lang();
    const sections = [
      labelText('threeStoryLabel','threeStory'), labelText('threeTurningLabel','threeTurning'), labelText('threePatternLabel','threePattern'),
      labelText('threeGuidanceLabel','threeGuidance'), labelText('threeReflectionLabel','threeReflection')
    ].filter(Boolean);
    const snapshot = { title:modeName('three',language), subtitle:focusName(match.focusId,language), sections, cardTitles:cardTitles(ids,language) };
    await save({ id:`three:${match.record.localDate}:${match.focusId}`, sourceKey:`three:${match.record.localDate}:${match.focusId}`, mode:'three', localDate:match.record.localDate, completedAt:completedISO(match.record.completedAt), createdAt:match.record.createdAt, focusId:match.focusId, cards:match.record.cards, numbers:[], question:'' }, snapshot);
  }

  async function captureGolden() {
    if (!visible('goldenInterpretation')) return;
    const ids = cardIdsFrom('#goldenRevealedCards').slice(0,3);
    const match = matchFocusRecord(window.LGTGoldenStorage, ids); if (!match) return;
    const language = lang();
    const sections = [labelText('goldenGlanceLabel','goldenGlance'), labelText('goldenSynthesisLabel','goldenSynthesis'), listSection('goldenActionsLabel','goldenActionList'), labelText('goldenReflectionLabel','goldenReflection')].filter(Boolean);
    const snapshot = { title:modeName('golden',language), subtitle:focusName(match.focusId,language), sections, cardTitles:cardTitles(ids,language) };
    await save({ id:`golden:${match.record.localDate}:${match.focusId}`, sourceKey:`golden:${match.record.localDate}:${match.focusId}`, mode:'golden', localDate:match.record.localDate, completedAt:completedISO(match.record.completedAt), createdAt:match.record.createdAt, focusId:match.focusId, cards:match.record.cards, numbers:[], question:'' }, snapshot);
  }

  async function captureObstacle() {
    if (!visible('obstacleInterpretation')) return;
    const ids = cardIdsFrom('#obstacleRevealedCards').slice(0,3);
    const match = matchFocusRecord(window.LGTObstacleStorage, ids); if (!match) return;
    const language = lang();
    const sections = [labelText('obstacleGlanceLabel','obstacleGlance'), labelText('obstacleKnotLabel','obstacleKnot'), labelText('obstacleReleaseLabel','obstacleRelease'), listSection('obstacleActionsLabel','obstacleActionList'), labelText('obstacleWatchLabel','obstacleWatch'), labelText('obstacleReflectionLabel','obstacleReflection')].filter(Boolean);
    const snapshot = { title:modeName('obstacle',language), subtitle:focusName(match.focusId,language), sections, cardTitles:cardTitles(ids,language) };
    await save({ id:`obstacle:${match.record.localDate}:${match.focusId}`, sourceKey:`obstacle:${match.record.localDate}:${match.focusId}`, mode:'obstacle', localDate:match.record.localDate, completedAt:completedISO(match.record.completedAt), createdAt:match.record.createdAt, focusId:match.focusId, cards:match.record.cards, numbers:[], question:'' }, snapshot);
  }

  async function captureLucky() {
    const record = window.LGTLuckyStorage?.getToday?.();
    if (!record?.completed || !Array.isArray(record.numbers)) return;
    const language = lang();
    const LC = window.LGTLuckyContent;
    if (!LC) return;
    const roles = LC.roles(language);
    const sections = record.numbers.map((number,index) => {
      const info = LC.number(number,language);
      return { label:`${roles[index]} · ${info.keyword}`, text:index===0?info.core:index===1?info.support:info.balance };
    });
    sections.push({ label:LC.copy(language).patternTitle, text:LC.pattern(record.numbers,language) });
    const set = LC.numberSet?.(record.numbers) || [];
    if (set.length) sections.push({ label:LC.copy(language).numberSetTitle, text:set.join(' · ') });
    const snapshot = { title:modeName('lucky',language), subtitle:record.numbers.join(' · '), sections, cardTitles:[] };
    await save({ id:`lucky:${record.date}`, sourceKey:`lucky:${record.date}`, mode:'lucky', localDate:record.date, completedAt:completedISO(record.completedAt), createdAt:completedISO(record.createdAt), focusId:null, cards:[], numbers:record.numbers, question:'' }, snapshot);
  }

  async function captureAll() {
    if (running || !Store.settings.autoSave()) return;
    running = true;
    try {
      await captureDaily(); await captureAsk(); await captureThree(); await captureGolden(); await captureObstacle(); await captureLucky();
    } catch (error) {
      console.warn('Journal capture skipped:', error);
    } finally { running = false; }
  }

  function schedule(ms=120) {
    clearTimeout(timer); timer = setTimeout(captureAll, ms);
  }

  window.addEventListener('lgt:reading:interaction', () => schedule(180));
  window.addEventListener('lgt:journal:capture-now', () => schedule(0));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) schedule(80); });
  window.addEventListener('pageshow', () => schedule(120));

  const observer = new MutationObserver((mutations) => {
    if (mutations.some((m) => m.type === 'attributes' && (m.attributeName === 'hidden' || m.attributeName === 'class'))) schedule(160);
  });
  observer.observe(document.getElementById('app') || document.body, { subtree:true, attributes:true, attributeFilter:['hidden','class'] });

  // Lucky Numbers can be restored from its completed storage state without opening the mode.
  setTimeout(() => { captureLucky(); captureAll(); }, 650);
  setInterval(() => { if (!document.hidden) captureAll(); }, 5000);

  window.LGTJournalCapture = Object.freeze({ version:VERSION, captureNow:captureAll });
})();

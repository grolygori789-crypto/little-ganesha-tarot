(() => {
  'use strict';

  const VERSION = 'journal-ui-v1';
  const Store = window.LGTJournalStorage;
  const JC = window.LGTJournalContent;
  const Tarot = window.LGTReadingContent;
  if (!Store || !JC || !Tarot) return;

  const state = {
    root:null, open:false, view:'timeline', source:null, entries:[], currentId:null,
    selectionMode:false, selected:new Set(), search:'', modeFilter:'all', bookmarksOnly:false,
    month:new Date(new Date().getFullYear(), new Date().getMonth(), 1), dayFilter:'', busy:false,
    confirm:null, clearStage:0, drafts:new Map()
  };

  const lang = () => JC.language(document.documentElement.lang);
  const c = () => JC.copy(lang());
  const esc = (value='') => String(value).replace(/[&<>'"]/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
  const trashIcon = () => '<svg class="journal-trash" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h10l-.7 11H7.7L7 9Zm3 2v7h2v-7h-2Zm4 0v7h2v-7h-2Z" fill="currentColor"/></svg>';
  const $ = (id) => state.root?.querySelector(`#${id}`) || document.getElementById(id);

  function locale() { return lang()==='th' ? 'th-TH' : lang()==='hi' ? 'hi-IN' : 'en-US'; }
  function formatDate(iso, options={dateStyle:'medium'}) {
    const date = new Date(`${iso}T12:00:00`);
    try { return new Intl.DateTimeFormat(locale(), options).format(date); } catch (_) { return iso; }
  }
  function formatTime(value) {
    const date = new Date(value); if (Number.isNaN(date.getTime())) return '';
    try { return new Intl.DateTimeFormat(locale(), {hour:'numeric',minute:'2-digit'}).format(date); } catch (_) { return ''; }
  }
  function monthKey(date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`; }
  function currentMonthKey() { const d=new Date(); return monthKey(d); }
  function todayISO(offset=0) { const d=new Date(); d.setDate(d.getDate()+offset); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function dateHeading(iso) { if (iso===todayISO()) return c().today; if (iso===todayISO(-1)) return c().yesterday; return formatDate(iso,{weekday:'long',day:'numeric',month:'long',year:'numeric'}); }
  function modeName(mode) { return c().mode[mode] || mode; }
  function focusName(id) { return id ? (c().focus[id] || id) : ''; }
  function cardTitle(id) { const card=Tarot.getCard(id); return card?.title?.[lang()] || card?.title?.en || card?.canonicalTitle || id; }
  function cardImage(id) { return Tarot.getCard(id)?.image || ''; }

  function snapshotFor(entry) {
    const snapshots = entry.snapshots || {};
    return snapshots[lang()] || snapshots[entry.savedLanguage] || Object.values(snapshots)[0] || { title:modeName(entry.mode), subtitle:focusName(entry.focusId), sections:[], cardTitles:[] };
  }

  function createRoot() {
    const root=document.createElement('section');
    root.id='journalScreen'; root.className='journal-screen'; root.hidden=true; root.setAttribute('aria-label',c().ariaJournal);
    root.innerHTML=`
      <div class="journal-ambient" aria-hidden="true"><span></span><span></span><span></span></div>
      <header class="journal-topbar">
        <button class="journal-icon" id="journalBack" type="button" aria-label="Back"><span aria-hidden="true">‹</span></button>
        <div class="journal-brand"><span>LITTLE GANESHA TAROT</span><small>THE GOLDEN PATH</small></div>
        <div class="journal-top-actions"><button class="journal-select-top" id="journalSelectTop" type="button"></button><button class="journal-icon" id="journalHome" type="button" aria-label="Home"><span aria-hidden="true">⌂</span></button></div>
      </header>
      <div class="journal-scroll" id="journalScroll"><main class="journal-content" id="journalContent"></main></div>
      <div class="journal-selection-bar" id="journalSelectionBar" hidden>
        <button type="button" id="journalSelectionCancel"></button>
        <strong id="journalSelectionCount"></strong>
        <button type="button" id="journalSelectionAll"></button>
        <button class="is-danger" type="button" id="journalSelectionDelete">${trashIcon()}<span id="journalSelectionDeleteText"></span></button>
      </div>
      <p class="sr-only" id="journalLive" aria-live="polite"></p>
    `;
    (document.getElementById('app')||document.body).appendChild(root);
    state.root=root;
    $('journalBack').addEventListener('click',goBack);
    $('journalHome').addEventListener('click',close);
    $('journalSelectTop').addEventListener('click',toggleSelectionMode);
    $('journalSelectionCancel').addEventListener('click',()=>setSelectionMode(false));
    $('journalSelectionAll').addEventListener('click',selectAllVisible);
    $('journalSelectionDelete').addEventListener('click',confirmDeleteSelected);
    root.addEventListener('click',onClick);
    root.addEventListener('input',onInput);
    root.addEventListener('change',onChange);
    createConfirmDialog();
  }

  function createConfirmDialog() {
    if (document.getElementById('journalConfirmDialog')) return;
    const wrap=document.createElement('div');
    wrap.id='journalConfirmDialog'; wrap.className='journal-confirm-backdrop'; wrap.hidden=true;
    wrap.innerHTML=`<div class="journal-confirm" role="dialog" aria-modal="true" aria-labelledby="journalConfirmTitle"><span class="journal-confirm__mark" aria-hidden="true">✦</span><h2 id="journalConfirmTitle"></h2><p id="journalConfirmBody"></p><div class="journal-confirm__actions"><button type="button" id="journalConfirmCancel"></button><button class="journal-confirm__danger" type="button" id="journalConfirmAction"></button></div></div>`;
    document.body.appendChild(wrap);
    wrap.addEventListener('pointerdown',(e)=>{if(e.target===wrap)closeConfirm();});
    wrap.querySelector('#journalConfirmCancel').addEventListener('click',closeConfirm);
    wrap.querySelector('#journalConfirmAction').addEventListener('click',runConfirmAction);
  }

  function showConfirm({title,body,actionLabel,onConfirm,kind='delete'}) {
    const wrap=document.getElementById('journalConfirmDialog'); if(!wrap)return;
    state.confirm={onConfirm,kind};
    wrap.querySelector('#journalConfirmTitle').textContent=title;
    wrap.querySelector('#journalConfirmBody').textContent=body;
    wrap.querySelector('#journalConfirmCancel').textContent=c().cancel;
    wrap.querySelector('#journalConfirmAction').textContent=actionLabel;
    wrap.hidden=false; requestAnimationFrame(()=>wrap.classList.add('is-visible'));
    setTimeout(()=>wrap.querySelector('#journalConfirmCancel')?.focus({preventScroll:true}),40);
  }
  function closeConfirm(){const wrap=document.getElementById('journalConfirmDialog');if(!wrap)return;wrap.classList.remove('is-visible');setTimeout(()=>{wrap.hidden=true;},180);state.confirm=null;state.clearStage=0;}
  async function runConfirmAction(){const action=state.confirm?.onConfirm;if(typeof action==='function')await action();}

  async function refreshEntries() {
    try { state.entries=await Store.getAll(); } catch(error){ console.warn('Journal read failed:',error); state.entries=[]; }
  }

  function visibleMonthKey() { return state.view === 'calendar' ? monthKey(state.month) : currentMonthKey(); }
  function monthEntries(key=visibleMonthKey(), source=state.entries) { return source.filter((e)=>String(e.localDate||'').startsWith(key)); }
  function stats(key=visibleMonthKey(), source=state.entries) {
    const list=monthEntries(key, source); return { readings:list.length, reflections:list.filter(e=>e.reflection?.trim()).length, bookmarks:list.filter(e=>e.bookmarked).length };
  }

  function matchesTools(entry, includeDay=true) {
    const query=state.search.trim().toLocaleLowerCase(locale());
    if(includeDay && state.dayFilter && entry.localDate!==state.dayFilter)return false;
    if(state.modeFilter!=='all' && entry.mode!==state.modeFilter)return false;
    if(state.bookmarksOnly && !entry.bookmarked)return false;
    if(!query)return true;
    const snap=snapshotFor(entry);
    const hay=[modeName(entry.mode),focusName(entry.focusId),entry.reflection,entry.question,...entry.cards.map(x=>cardTitle(x.cardId)),snap.title,snap.subtitle,...(snap.sections||[]).flatMap(x=>[x.label,x.text])].join(' ').toLocaleLowerCase(locale());
    return hay.includes(query);
  }
  function filteredEntries() { return state.entries.filter((entry)=>matchesTools(entry,true)); }

  function entryVisual(entry, compact=false) {
    if(entry.mode==='lucky')return `<div class="journal-number-visual ${compact?'is-compact':''}">${(entry.numbers||[]).slice(0,3).map(n=>`<span>${esc(n)}</span>`).join('')}</div>`;
    const ids=(entry.cards||[]).map(x=>x.cardId).slice(0,3);
    return `<div class="journal-card-visual journal-card-visual--${ids.length}">${ids.map((id,i)=>`<img src="${esc(cardImage(id))}" alt="${esc(cardTitle(id))}" loading="lazy" decoding="async" style="--i:${i}">`).join('')}</div>`;
  }

  function entryCard(entry) {
    const snap=snapshotFor(entry), selected=state.selected.has(entry.id);
    const summary=entry.reflection?.trim() || snap.sections?.[0]?.text || snap.subtitle || '';
    const focus=entry.focusId?focusName(entry.focusId):(entry.mode==='ask'?(snap.subtitle||''): '');
    return `<article class="journal-entry-card ${selected?'is-selected':''}" data-journal-entry="${esc(entry.id)}">
      ${state.selectionMode?`<button class="journal-check ${selected?'is-checked':''}" type="button" data-journal-select="${esc(entry.id)}" aria-pressed="${selected}"><span aria-hidden="true">${selected?'✓':''}</span></button>`:''}
      <button class="journal-entry-open" type="button" data-journal-open="${esc(entry.id)}" aria-label="${esc(c().ariaEntry)}">
        ${entryVisual(entry,true)}
        <span class="journal-entry-copy"><span class="journal-entry-meta"><strong>${esc(modeName(entry.mode))}</strong><time>${esc(formatTime(entry.completedAt))}</time></span>${focus?`<span class="journal-focus-pill">${esc(focus)}</span>`:''}<p>${esc(summary.slice(0,180))}</p><span class="journal-entry-foot">${entry.reflection?.trim()?'<span class="has-reflection">✦</span>':''}${entry.bookmarked?'<span class="is-bookmarked">★</span>':''}${entry.cards?.length?`<small>${esc(c().cardCount(entry.cards.length))}</small>`:''}</span></span>
      </button>
    </article>`;
  }

  function heroHtml() {
    const s=stats();
    return `<section class="journal-hero"><div><span class="journal-eyebrow">${esc(c().eyebrow)}</span><h1 id="journalPageTitle">${esc(c().title)}</h1><p>${esc(c().intro)}</p></div><div class="journal-lotus" aria-hidden="true"><span>✦</span></div></section>
      <section class="journal-privacy"><span aria-hidden="true">◇</span><div><strong>${esc(c().privateTitle)}</strong><p>${esc(c().privateBody)}</p></div></section>
      <section class="journal-stats"><article><strong>${s.readings}</strong><span>${esc(c().entries)}</span></article><article><strong>${s.reflections}</strong><span>${esc(c().reflections)}</span></article><article><strong>${s.bookmarks}</strong><span>${esc(c().savedMoments)}</span></article></section>`;
  }

  function controlsHtml() {
    const modes=['all','daily','ask','three','golden','obstacle','lucky'];
    return `<section class="journal-view-controls"><div class="journal-tabs" role="tablist"><button type="button" data-journal-view="timeline" class="${state.view==='timeline'?'is-active':''}">${esc(c().timeline)}</button><button type="button" data-journal-view="calendar" class="${state.view==='calendar'?'is-active':''}">${esc(c().calendar)}</button></div>
      <div class="journal-tools"><label class="journal-search"><span aria-hidden="true">⌕</span><input id="journalSearch" type="search" value="${esc(state.search)}" placeholder="${esc(c().searchPlaceholder)}"></label><select id="journalModeFilter" aria-label="${esc(c().filter)}">${modes.map(m=>`<option value="${m}" ${state.modeFilter===m?'selected':''}>${esc(m==='all'?c().all:modeName(m))}</option>`).join('')}</select><button class="journal-bookmark-filter ${state.bookmarksOnly?'is-active':''}" type="button" data-journal-bookmarks aria-pressed="${state.bookmarksOnly}">★ <span>${esc(c().bookmarks)}</span></button></div>
      ${state.dayFilter?`<button class="journal-day-filter" type="button" data-journal-clear-day>× ${esc(formatDate(state.dayFilter,{day:'numeric',month:'long',year:'numeric'}))}</button>`:''}
    </section>`;
  }

  function patternHtml() {
    const source=state.entries.filter((entry)=>matchesTools(entry,false));
    const list=monthEntries(visibleMonthKey(),source); if(list.length<3)return '';
    const cardCounts=new Map(), focusCounts=new Map();
    list.forEach(e=>{(e.cards||[]).forEach(x=>cardCounts.set(x.cardId,(cardCounts.get(x.cardId)||0)+1));if(e.focusId)focusCounts.set(e.focusId,(focusCounts.get(e.focusId)||0)+1);});
    const topCard=[...cardCounts].sort((a,b)=>b[1]-a[1])[0]; const topFocus=[...focusCounts].sort((a,b)=>b[1]-a[1])[0];
    let line=c().patternNeutral;
    if(topCard?.[1]>=2)line=c().repeatedCard(cardTitle(topCard[0]),topCard[1]);
    else if(topFocus?.[1]>=2)line=c().frequentFocus(focusName(topFocus[0]),topFocus[1]);
    return `<section class="journal-pattern"><span class="journal-eyebrow">${esc(c().patternEyebrow)}</span><p>${esc(line)}</p></section>`;
  }

  function monthlyHtml() {
    const source=state.entries.filter((entry)=>matchesTools(entry,false));
    const list=monthEntries(visibleMonthKey(),source); if(!list.length)return '';
    const s=stats(visibleMonthKey(),source); const month=new Intl.DateTimeFormat(locale(),{month:'long'}).format(state.view==='calendar'?state.month:new Date());
    return `<section class="journal-monthly"><div class="journal-monthly__mark" aria-hidden="true">✦</div><div><span class="journal-eyebrow">${esc(c().monthlyEyebrow)}</span><h2>${esc(c().monthlyTitle(month))}</h2><p>${esc(c().monthSummary(s.readings,s.reflections,s.bookmarks))}</p><blockquote>${esc(c().monthlyPrompt)}</blockquote></div></section>`;
  }

  function renderTimeline() {
    const list=filteredEntries();
    const groups=new Map(); list.forEach(e=>{if(!groups.has(e.localDate))groups.set(e.localDate,[]);groups.get(e.localDate).push(e);});
    const body=list.length?[...groups.entries()].map(([date,rows])=>`<section class="journal-day"><header><time>${esc(dateHeading(date))}</time><span>${esc(c().dayHasEntries(rows.length))}</span></header><div>${rows.map(entryCard).join('')}</div></section>`).join(''):`<section class="journal-empty"><span aria-hidden="true">✦</span><h2>${esc(state.entries.length?c().noMatches:c().emptyTitle)}</h2><p>${esc(state.entries.length?'':c().emptyBody)}</p></section>`;
    return `${body}${!state.dayFilter?patternHtml():''}${!state.dayFilter?monthlyHtml():''}`;
  }

  function renderCalendar() {
    const year=state.month.getFullYear(), month=state.month.getMonth();
    const label=new Intl.DateTimeFormat(locale(),{month:'long',year:'numeric'}).format(state.month);
    const first=new Date(year,month,1), start=(first.getDay()+6)%7;
    const days=new Date(year,month+1,0).getDate();
    const byDay=new Map(); state.entries.filter((entry)=>matchesTools(entry,false)).forEach(e=>{if(!e.localDate.startsWith(monthKey(state.month)))return;if(!byDay.has(e.localDate))byDay.set(e.localDate,[]);byDay.get(e.localDate).push(e);});
    const weekdays=Array.from({length:7},(_,i)=>new Intl.DateTimeFormat(locale(),{weekday:'narrow'}).format(new Date(2026,7,24+i)));
    const cells=[]; for(let i=0;i<start;i++)cells.push('<span class="is-empty"></span>');
    for(let d=1;d<=days;d+=1){const iso=`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`,rows=byDay.get(iso)||[],hasReflection=rows.some(e=>e.reflection?.trim()),today=iso===todayISO();cells.push(`<button type="button" data-journal-day="${iso}" class="${rows.length?'has-entries':''} ${hasReflection?'has-reflection':''} ${today?'is-today':''}" ${rows.length?'':'disabled'}><span>${d}</span>${rows.length?`<small>${rows.length}</small>`:''}</button>`);}
    return `<section class="journal-calendar"><header><button type="button" data-journal-month="-1" aria-label="${esc(c().monthPrevious)}">‹</button><h2>${esc(label)}</h2><button type="button" data-journal-month="1" aria-label="${esc(c().monthNext)}">›</button></header><div class="journal-weekdays">${weekdays.map(x=>`<span>${esc(x)}</span>`).join('')}</div><div class="journal-calendar-grid">${cells.join('')}</div><div class="journal-calendar-legend"><span><i></i>${esc(c().entries)}</span><span><i class="is-ring"></i>${esc(c().reflections)}</span></div></section>${patternHtml()}${monthlyHtml()}`;
  }

  function renderHomeView() {
    $('journalContent').innerHTML=`${heroHtml()}${controlsHtml()}${state.view==='calendar'?renderCalendar():renderTimeline()}<button class="journal-back-home" type="button" data-journal-close><span aria-hidden="true">⌂</span>${esc(c().backHome)}</button>`;
    updateTopbar();
  }

  function renderDetail() {
    const entry=state.entries.find(e=>e.id===state.currentId); if(!entry){state.view='timeline';state.currentId=null;renderHomeView();return;}
    const snap=snapshotFor(entry), fallbackLanguage=!entry.snapshots?.[lang()] && entry.savedLanguage!==lang();
    const question=entry.mode==='ask'?(entry.question||snap.question||''):'';
    $('journalContent').innerHTML=`<article class="journal-detail">
      <header class="journal-detail-head"><span class="journal-eyebrow">${esc(modeName(entry.mode))}</span><h1 id="journalPageTitle">${esc(snap.subtitle || modeName(entry.mode))}</h1><div><time>${esc(formatDate(entry.localDate,{day:'numeric',month:'long',year:'numeric'}))} · ${esc(formatTime(entry.completedAt))}</time>${entry.focusId?`<span>${esc(focusName(entry.focusId))}</span>`:''}</div></header>
      <section class="journal-detail-visual">${entryVisual(entry)}<div class="journal-detail-titles">${(entry.cards||[]).map(x=>`<span>${esc(cardTitle(x.cardId))}</span>`).join('')}${entry.mode==='lucky'?`<span>${esc(c().numbers)} · ${esc((entry.numbers||[]).join(' · '))}</span>`:''}</div></section>
      ${entry.mode==='ask'?`<section class="journal-question"><span>${esc(c().savedReading)}</span><p>${esc(question || c().questionHidden)}</p></section>`:''}
      <section class="journal-snapshot"><div class="journal-snapshot-head"><span>${esc(c().savedReading)}</span>${fallbackLanguage?`<small>${esc(c().savedLanguage)} · ${esc(entry.savedLanguage.toUpperCase())}</small>`:''}</div>${(snap.sections||[]).map(s=>`<section><h2>${esc(s.label||'')}</h2><p>${esc(s.text||'').replace(/\n/g,'<br>')}</p></section>`).join('')}</section>
      <section class="journal-reflection-editor"><span class="journal-eyebrow">${esc(c().reflectionTitle)}</span><h2>${esc(c().reflectionPrompt)}</h2><textarea id="journalReflection" maxlength="8000" rows="7" placeholder="${esc(c().reflectionPlaceholder)}">${esc(state.drafts.has(entry.id)?state.drafts.get(entry.id):(entry.reflection||''))}</textarea><div><button class="journal-save-reflection" type="button" data-journal-save-reflection>${esc(c().saveReflection)}</button><span id="journalReflectionStatus" role="status"></span></div></section>
      <section class="journal-detail-actions"><button type="button" data-journal-bookmark-entry="${esc(entry.id)}" class="${entry.bookmarked?'is-active':''}"><span aria-hidden="true">${entry.bookmarked?'★':'☆'}</span>${esc(entry.bookmarked?c().removeBookmark:c().bookmark)}</button><div class="journal-more-wrap"><button type="button" data-journal-more aria-label="${esc(c().more)}">•••</button><div class="journal-more-menu" id="journalMoreMenu" hidden><button class="is-danger" type="button" data-journal-delete-one="${esc(entry.id)}">${trashIcon()}${esc(c().deleteEntry)}</button></div></div></section>
      <button class="journal-back-home" type="button" data-journal-back>${esc(c().backJournal)}</button>
    </article>`;
    updateTopbar();
  }

  function render() { if(!state.root)return; state.root.dataset.view=state.view; if(state.view==='detail')renderDetail();else renderHomeView(); $('journalScroll').scrollTop=0; updateSelectionBar(); }

  function updateTopbar(){const detail=state.view==='detail';$('journalBack').setAttribute('aria-label',detail?c().backJournal:c().backHome);$('journalHome').setAttribute('aria-label',c().backHome);$('journalSelectTop').hidden=detail;$('journalSelectTop').textContent=state.selectionMode?c().cancel:c().select;}
  function updateSelectionBar(){const bar=$('journalSelectionBar');if(!bar)return;bar.hidden=!state.selectionMode;$('journalSelectionCancel').textContent=c().cancel;$('journalSelectionAll').textContent=c().selectAll;$('journalSelectionDeleteText').textContent=c().deleteSelected;$('journalSelectionCount').textContent=c().selectedCount(state.selected.size);$('journalSelectionDelete').disabled=!state.selected.size;}

  async function open(source=null) {
    if(!state.root)createRoot(); state.source=source||state.source; state.open=true; state.root.hidden=false; document.body.classList.add('journal-mode-open');
    window.dispatchEvent(new CustomEvent('lgt:journal:capture-now'));
    await new Promise(r=>setTimeout(r,80)); await refreshEntries(); render(); requestAnimationFrame(()=>state.root.classList.add('is-visible')); setTimeout(()=>$('journalBack')?.focus({preventScroll:true}),60);
    Store.settings.setSeenPrivacy(true);
  }
  function close(){if(!state.root||!state.open)return;state.open=false;setSelectionMode(false,false);state.root.classList.remove('is-visible');document.body.classList.remove('journal-mode-open');const source=state.source;setTimeout(()=>{if(!state.open)state.root.hidden=true;},220);(source||document.querySelector('[data-feature="journal"]'))?.focus?.({preventScroll:true});}
  function goBack(){if(state.view==='detail'){state.view='timeline';state.currentId=null;render();return;}close();}

  function setSelectionMode(value,rerender=true){state.selectionMode=Boolean(value);if(!state.selectionMode)state.selected.clear();if(rerender)render();else updateSelectionBar();}
  function toggleSelectionMode(){setSelectionMode(!state.selectionMode);}
  function toggleSelected(id){if(state.selected.has(id))state.selected.delete(id);else state.selected.add(id);render();}
  function selectAllVisible(){filteredEntries().forEach(e=>state.selected.add(e.id));render();}

  async function saveReflection(){const entry=state.entries.find(e=>e.id===state.currentId);if(!entry)return;const textarea=$('journalReflection');const button=document.querySelector('[data-journal-save-reflection]');button.disabled=true;await Store.updateReflection(entry.id,textarea.value);state.drafts.set(entry.id,textarea.value);await refreshEntries();const status=$('journalReflectionStatus');if(status)status.textContent=c().reflectionSaved;button.disabled=false;setTimeout(()=>{if(status)status.textContent='';},1800);}
  async function toggleBookmark(id){await Store.toggleBookmark(id);await refreshEntries();render();}

  function confirmDeleteOne(id){showConfirm({title:c().deleteTitle,body:c().deleteBody,actionLabel:c().deleteConfirm,onConfirm:async()=>{await Store.remove(id);state.drafts.delete(id);closeConfirm();await refreshEntries();state.currentId=null;state.view='timeline';render();}});}
  function confirmDeleteSelected(){const ids=[...state.selected];if(!ids.length)return;showConfirm({title:c().deleteManyTitle(ids.length),body:c().deleteManyBody,actionLabel:c().deleteConfirm,onConfirm:async()=>{await Store.removeMany(ids);ids.forEach((id)=>state.drafts.delete(id));closeConfirm();await refreshEntries();setSelectionMode(false);}});}

  function onClick(event){
    const closeBtn=event.target.closest?.('[data-journal-close]');if(closeBtn){close();return;}
    const back=event.target.closest?.('[data-journal-back]');if(back){state.view='timeline';state.currentId=null;render();return;}
    const view=event.target.closest?.('[data-journal-view]');if(view){state.view=view.dataset.journalView;state.currentId=null;state.dayFilter='';render();return;}
    const openBtn=event.target.closest?.('[data-journal-open]');if(openBtn){if(state.selectionMode){toggleSelected(openBtn.dataset.journalOpen);return;}state.currentId=openBtn.dataset.journalOpen;state.view='detail';render();return;}
    const sel=event.target.closest?.('[data-journal-select]');if(sel){toggleSelected(sel.dataset.journalSelect);return;}
    const bmFilter=event.target.closest?.('[data-journal-bookmarks]');if(bmFilter){state.bookmarksOnly=!state.bookmarksOnly;render();return;}
    const clearDay=event.target.closest?.('[data-journal-clear-day]');if(clearDay){state.dayFilter='';render();return;}
    const month=event.target.closest?.('[data-journal-month]');if(month){state.month=new Date(state.month.getFullYear(),state.month.getMonth()+Number(month.dataset.journalMonth),1);render();return;}
    const day=event.target.closest?.('[data-journal-day]');if(day&&!day.disabled){state.dayFilter=day.dataset.journalDay;state.view='timeline';render();return;}
    const save=event.target.closest?.('[data-journal-save-reflection]');if(save){saveReflection();return;}
    const bookmark=event.target.closest?.('[data-journal-bookmark-entry]');if(bookmark){toggleBookmark(bookmark.dataset.journalBookmarkEntry);return;}
    const more=event.target.closest?.('[data-journal-more]');if(more){const menu=$('journalMoreMenu');if(menu)menu.hidden=!menu.hidden;return;}
    const del=event.target.closest?.('[data-journal-delete-one]');if(del){confirmDeleteOne(del.dataset.journalDeleteOne);return;}
  }
  function onInput(event){if(event.target?.id==='journalReflection'&&state.currentId){state.drafts.set(state.currentId,event.target.value);return;}if(event.target?.id==='journalSearch'){state.search=event.target.value;renderHomeView();requestAnimationFrame(()=>{const input=$('journalSearch');input?.focus({preventScroll:true});input?.setSelectionRange(state.search.length,state.search.length);});}}
  function onChange(event){if(event.target?.id==='journalModeFilter'){state.modeFilter=event.target.value;render();}}

  function injectSettings() {
    if(document.querySelector('[data-journal-settings]'))return;
    const support=document.querySelector('.settings-group.support-group');if(!support)return;
    const section=document.createElement('section');section.className='settings-group journal-settings';section.dataset.journalSettings='true';
    section.innerHTML=`<h3 id="journalSettingsHeading"></h3><div class="setting-row"><div><strong id="journalAutoTitle"></strong><small id="journalAutoSub"></small></div><label class="switch"><input id="journalAutoToggle" type="checkbox"><span></span></label></div><div class="setting-row"><div><strong id="journalAskTitle"></strong><small id="journalAskSub"></small></div><label class="switch"><input id="journalAskToggle" type="checkbox"><span></span></label></div><button class="danger-link journal-clear-link" id="journalClearButton" type="button"></button><small class="journal-clear-sub" id="journalClearSub"></small>`;
    support.parentNode.insertBefore(section,support);
    section.querySelector('#journalAutoToggle').addEventListener('change',(e)=>Store.settings.setAutoSave(e.target.checked));
    section.querySelector('#journalAskToggle').addEventListener('change',(e)=>Store.settings.setSaveAskQuestion(e.target.checked));
    section.querySelector('#journalClearButton').addEventListener('click',confirmClearAll);
    updateSettingsCopy();
  }

  function updateSettingsCopy(){const cc=c();const section=document.querySelector('[data-journal-settings]');if(!section)return;section.querySelector('#journalSettingsHeading').textContent=cc.settingsHeading;section.querySelector('#journalAutoTitle').textContent=cc.autoSaveTitle;section.querySelector('#journalAutoSub').textContent=cc.autoSaveSub;section.querySelector('#journalAskTitle').textContent=cc.askQuestionTitle;section.querySelector('#journalAskSub').textContent=cc.askQuestionSub;section.querySelector('#journalClearButton').textContent=cc.clearTitle;section.querySelector('#journalClearSub').textContent=cc.clearSub;section.querySelector('#journalAutoToggle').checked=Store.settings.autoSave();section.querySelector('#journalAskToggle').checked=Store.settings.saveAskQuestion();}

  function confirmClearAll(){state.clearStage=1;showConfirm({title:c().clearFirstTitle,body:c().clearFirstBody,actionLabel:c().clearContinue,kind:'clear1',onConfirm:async()=>{const wrap=document.getElementById('journalConfirmDialog');state.clearStage=2;state.confirm={kind:'clear2',onConfirm:async()=>{await Store.clearAll();state.drafts.clear();closeConfirm();await refreshEntries();if(state.open){state.view='timeline';state.currentId=null;render();}const live=$('journalLive');if(live)live.textContent=c().clearDone;}};wrap.querySelector('#journalConfirmTitle').textContent=c().clearFinalTitle;wrap.querySelector('#journalConfirmBody').textContent=c().clearFinalBody;wrap.querySelector('#journalConfirmAction').textContent=c().clearAll;}});}

  document.addEventListener('click',(event)=>{const button=event.target.closest?.('[data-feature="journal"]');if(!button)return;event.preventDefault();event.stopImmediatePropagation();open(button);},true);
  window.addEventListener('keydown',(event)=>{if(event.key!=='Escape')return;const confirm=document.getElementById('journalConfirmDialog');if(confirm&&!confirm.hidden){event.preventDefault();closeConfirm();return;}if(!state.open)return;event.preventDefault();goBack();});
  window.addEventListener('lgt:journal:changed',async()=>{if(!state.open)return;await refreshEntries();render();});
  const observer=new MutationObserver(()=>{updateSettingsCopy();if(state.open)render();});observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  injectSettings();

  window.LGTJournal=Object.freeze({version:VERSION,open:()=>open(),close,refresh:async()=>{await refreshEntries();if(state.open)render();}});
})();

(() => {
  'use strict';

  const VERSION = 'tarot-library-ui-v1.1';
  const Content = window.LGTTarotLibraryContent;
  if (!Content) throw new Error('Tarot Library UI requires tarot-library-content.js.');

  const state = { root: null, open: false, view: 'home', source: null, filter: 'all', query: '', cardId: null, deckScroll: 0 };
  const $ = (id) => state.root?.querySelector(`#${id}`) || null;
  const lang = () => Content.language(document.documentElement.lang);
  const copy = () => Content.copy(lang());
  const esc = (v='') => String(v).replace(/[&<>'"]/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));

  function createRoot() {
    const root = document.createElement('section');
    root.id = 'tarotLibraryScreen';
    root.className = 'tl-screen';
    root.hidden = true;
    root.setAttribute('aria-labelledby', 'tlPageTitle');
    root.innerHTML = `
      <div class="tl-ambient" aria-hidden="true"><span></span><span></span><span></span></div>
      <header class="tl-topbar">
        <button class="tl-icon-button" id="tlBack" type="button" aria-label="Back"><span aria-hidden="true">‹</span></button>
        <div class="tl-brand"><span>LITTLE GANESHA TAROT</span><small>THE GOLDEN PATH</small></div>
        <button class="tl-home-button" id="tlHome" type="button" aria-label="Home"><span aria-hidden="true">⌂</span></button>
      </header>
      <div class="tl-scroll" id="tlScroll"><main class="tl-content" id="tlContent"></main></div>
      <p class="sr-only" id="tlLive" aria-live="polite"></p>
    `;
    (document.getElementById('app') || document.body).appendChild(root);
    state.root = root;
    $('tlBack').addEventListener('click', navigateBack);
    $('tlHome').addEventListener('click', close);
    root.addEventListener('click', onRootClick);
    root.addEventListener('input', onRootInput);
  }

  function navCard(view, icon, title, sub, art='') {
    return `<button class="tl-hub-card" type="button" data-tl-view="${view}">
      <span class="tl-hub-card__art ${art}" aria-hidden="true">${icon}</span>
      <span><strong>${esc(title)}</strong><small>${esc(sub)}</small></span><span class="tl-chevron" aria-hidden="true">›</span>
    </button>`;
  }

  function cardImage(id, cls='', eager=false) {
    const card = Content.card(id, lang());
    if (!card) return '';
    return `<img class="${cls}" src="${esc(card.image)}" alt="${esc(card.displayTitle)}" loading="${eager?'eager':'lazy'}" decoding="async">`;
  }

  function renderHome() {
    const c = copy();
    const cards = Content.cards;
    $('tlContent').innerHTML = `
      <section class="tl-hero">
        <div class="tl-hero__copy"><span class="tl-eyebrow">${esc(c.eyebrow)}</span><h1 id="tlPageTitle">${esc(c.title)}</h1><p>${esc(c.intro)}</p></div>
        <div class="tl-hero__fan" aria-hidden="true">
          ${cardImage(cards[0].id,'tl-fan-card tl-fan-card--left',true)}
          ${cardImage(cards[21].id,'tl-fan-card tl-fan-card--center',true)}
          ${cardImage(cards[36].id,'tl-fan-card tl-fan-card--right',true)}
          <span class="tl-hero__halo"></span>
        </div>
      </section>
      <section class="tl-hub" aria-label="Tarot Library sections">
        ${navCard('deck','✦',c.exploreCards,c.exploreCardsSub,'tl-hub-card__art--deck')}
        ${navCard('learn','◈',c.learnTarot,c.learnTarotSub,'tl-hub-card__art--learn')}
        ${navCard('ways','⌁',c.waysRead,c.waysReadSub,'tl-hub-card__art--ways')}
        ${navCard('spreads','⋮',c.ganeshaSpreads,c.ganeshaSpreadsSub,'tl-hub-card__art--spreads')}
        ${navCard('essentials','?',c.essentials,c.essentialsSub,'tl-hub-card__art--essentials')}
      </section>
      <button class="tl-back-home" type="button" data-tl-close><span aria-hidden="true">⌂</span>${esc(c.backHome)}</button>
    `;
  }

  function deckFilterLabel(key) { const c=copy(); return c[key] || key; }
  function filteredCards() {
    const q = state.query.trim().toLocaleLowerCase(lang()==='th'?'th-TH':lang()==='hi'?'hi-IN':'en-US');
    return Content.cards.filter((base) => {
      if (state.filter === 'major' && base.arcana !== 'major') return false;
      if (state.filter === 'minor' && base.arcana !== 'minor') return false;
      if (['wands','cups','swords','pentacles'].includes(state.filter) && base.suit !== state.filter) return false;
      if (!q) return true;
      const card = Content.card(base.id, lang());
      const hay = [card.displayTitle, card.canonicalTitle, ...(card.displayKeywords||[])].join(' ').toLocaleLowerCase(lang()==='th'?'th-TH':lang()==='hi'?'hi-IN':'en-US');
      return hay.includes(q);
    });
  }

  function deckResultsMarkup(list, c=copy()) {
    return list.length ? list.map((base)=>{
      const card=Content.card(base.id,lang());
      return `<button class="tl-card-tile" type="button" data-tl-card="${base.id}" aria-label="${esc(c.openCard)}: ${esc(card.displayTitle)}">
        <span class="tl-card-tile__image">${cardImage(base.id)}</span>
        <span class="tl-card-tile__copy"><strong>${esc(card.displayTitle)}</strong><small>${esc(Content.cardMeta(base,lang()))}</small></span>
      </button>`;
    }).join('') : `<p class="tl-empty">${esc(c.noCards)}</p>`;
  }

  function refreshDeckResults() {
    const c=copy();
    const list=filteredCards();
    const grid=$('tlCardGrid');
    const count=state.root?.querySelector('.tl-count');
    if (count) count.textContent=c.cardsFound(list.length);
    if (grid) grid.innerHTML=deckResultsMarkup(list,c);
    state.root?.querySelectorAll('[data-tl-filter]').forEach((button)=>{
      const active=button.dataset.tlFilter===state.filter;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-pressed',String(active));
    });
  }

  function renderDeck() {
    const c = copy();
    const list = filteredCards();
    const filters = ['all','major','minor','wands','cups','swords','pentacles'];
    $('tlContent').innerHTML = `
      <section class="tl-page-head"><span class="tl-eyebrow">${esc(c.eyebrow)}</span><h1 id="tlPageTitle">${esc(c.exploreCards)}</h1><p>${esc(c.exploreCardsSub)}</p></section>
      <section class="tl-deck-tools">
        <label class="tl-search"><span>${esc(c.search)}</span><input id="tlSearch" type="search" autocomplete="off" value="${esc(state.query)}" placeholder="${esc(c.searchPlaceholder)}" enterkeyhint="search"></label>
        <div class="tl-filters" role="group" aria-label="Deck filters">${filters.map((f)=>`<button type="button" data-tl-filter="${f}" aria-pressed="${state.filter===f?'true':'false'}" class="${state.filter===f?'is-active':''}">${esc(deckFilterLabel(f))}</button>`).join('')}</div>
        <p class="tl-count">${esc(c.cardsFound(list.length))}</p>
      </section>
      <section class="tl-card-grid" id="tlCardGrid">${deckResultsMarkup(list,c)}</section>
    `;
  }

  function renderCardDetail() {
    const c = copy();
    const card = Content.card(state.cardId, lang());
    if (!card) { state.view='deck'; renderDeck(); return; }
    const meta = Content.cardMeta(card, lang());
    $('tlContent').innerHTML = `
      <article class="tl-card-detail">
        <button class="tl-inline-back" type="button" data-tl-view="deck">‹ ${esc(c.backLibrary)}</button>
        <div class="tl-card-detail__hero">
          <figure class="tl-card-detail__figure">${cardImage(card.id,'tl-card-detail__image',true)}<figcaption>${esc(meta)}</figcaption></figure>
          <div class="tl-card-detail__intro"><span class="tl-eyebrow">${esc(meta)}</span><h1 id="tlPageTitle">${esc(card.displayTitle)}</h1><div class="tl-keywords">${(card.displayKeywords||[]).map(k=>`<span>${esc(k)}</span>`).join('')}</div></div>
        </div>
        <section class="tl-reading-panel"><h2>${esc(c.coreMeaning)}</h2><p>${esc(card.displayMeaning)}</p></section>
        <section class="tl-reflection"><span aria-hidden="true">✦</span><div><h2>${esc(c.reflection)}</h2><p>${esc(card.displayReflection)}</p></div></section>
        <section class="tl-lenses"><div class="tl-section-title"><h2>${esc(c.readingLenses)}</h2></div>${card.lenses.map((lens)=>`<details><summary>${esc(lens.label)}<span aria-hidden="true">＋</span></summary><p>${esc(lens.text)}</p></details>`).join('')}</section>
        <button class="tl-back-home" type="button" data-tl-close><span aria-hidden="true">⌂</span>${esc(c.backHome)}</button>
      </article>`;
  }

  function sectionHeader(title, sub='') { return `<section class="tl-page-head"><span class="tl-eyebrow">${esc(copy().eyebrow)}</span><h1 id="tlPageTitle">${esc(title)}</h1>${sub?`<p>${esc(sub)}</p>`:''}</section>`; }
  function renderLearn() {
    const c=copy(), l=Content.learn(lang()), suitIds={wands:22,cups:36,swords:50,pentacles:64};
    $('tlContent').innerHTML = `${sectionHeader(c.learnTarot,c.learnTarotSub)}
      <section class="tl-editorial"><h2>${esc(c.historyTitle)}</h2><div class="tl-history">${l.history.map(item=>`<article><span>${esc(item.y)}</span><div><h3>${esc(item.h)}</h3><p>${esc(item.p)}</p></div></article>`).join('')}</div><p class="tl-source-note">${esc(c.sourceNote)}</p></section>
      <section class="tl-editorial tl-structure"><h2>${esc(c.structureTitle)}</h2><p>${esc(l.structure)}</p><div class="tl-deck-structure"><div><strong>22</strong><span>${esc(c.major)}</span></div><div class="tl-plus">+</div><div><strong>56</strong><span>${esc(c.minor)}</span></div><div class="tl-equals">=</div><div class="is-total"><strong>78</strong><span>Tarot</span></div></div><p>${esc(l.major)}</p></section>
      <section class="tl-editorial"><h2>${esc(c.suitsTitle)}</h2><div class="tl-suit-grid">${Object.entries(l.suits).map(([key,v])=>`<article>${cardImage(String(suitIds[key]).padStart(2,'0'),'tl-suit-card')}<div><h3>${esc(v[0])}</h3><strong>${esc(v[1])}</strong><p>${esc(v[2])}</p></div></article>`).join('')}</div></section>
      <section class="tl-editorial tl-two-up"><article><h2>${esc(c.courtTitle)}</h2><p>${esc(l.court)}</p></article><article><h2>${esc(c.symbolismTitle)}</h2><p>${esc(l.symbolism)}</p></article></section>
      <button class="tl-back-home" type="button" data-tl-view="home">‹ ${esc(c.backLibrary)}</button>`;
  }

  function spreadDiagram(count, labels=[]) {
    return `<div class="tl-spread-diagram tl-spread-diagram--${count}" aria-hidden="true">${Array.from({length:count},(_,i)=>`<div><img src="${esc(window.LGTReadingContent?.cardBack || 'assets/ui/card-back.png')}" alt=""><span>${esc(labels[i]||String(i+1))}</span></div>`).join('')}</div>`;
  }

  function renderWays() {
    const c=copy(), w=Content.ways(lang());
    const blocks=[
      [c.oneCardTitle,w.one,spreadDiagram(1)], [c.threeCardTitle,w.three,spreadDiagram(3,['1','2','3'])],
      [c.questionsTitle,w.questions,'<div class="tl-oracle-mark" aria-hidden="true">?</div>'], [c.reversalsTitle,w.reversals,'<div class="tl-reversal-mark" aria-hidden="true">↕</div>'],
      [c.tensionTitle,w.tension,'<div class="tl-tension-mark" aria-hidden="true">⇄</div>'], [c.rereadTitle,w.reread,'<div class="tl-lock-mark" aria-hidden="true">◇</div>']
    ];
    $('tlContent').innerHTML = `${sectionHeader(c.waysTitle,c.waysReadSub)}<section class="tl-guide-grid">${blocks.map(([h,p,v])=>`<article><div class="tl-guide-visual">${v}</div><h2>${esc(h)}</h2><p>${esc(p)}</p></article>`).join('')}</section><button class="tl-back-home" type="button" data-tl-view="home">‹ ${esc(c.backLibrary)}</button>`;
  }

  function renderSpreads() {
    const c=copy(), items=Content.spreads(lang());
    const diagrams={daily:spreadDiagram(1),ask:spreadDiagram(1,['?']),three:spreadDiagram(3,[c.spreadPast,c.spreadNow,c.spreadNext]),golden:spreadDiagram(3,[c.spreadNow,c.spreadBlock,c.spreadPath]),obstacle:spreadDiagram(3,[c.spreadBlock,c.spreadFeeds,c.spreadRelease]),lucky:'<div class="tl-number-orbs" aria-hidden="true"><span>0</span><span>8</span><span>3</span></div>'};
    $('tlContent').innerHTML = `${sectionHeader(c.spreadsTitle,c.ganeshaSpreadsSub)}<section class="tl-spread-list">${items.map(([id,title,count,body])=>`<article><div class="tl-spread-list__visual">${diagrams[id]}</div><div><span class="tl-spread-count">${esc(count)}</span><h2>${esc(title)}</h2><p>${esc(body)}</p></div></article>`).join('')}</section><button class="tl-back-home" type="button" data-tl-view="home">‹ ${esc(c.backLibrary)}</button>`;
  }

  function renderEssentials() {
    const c=copy(), faq=Content.faq(lang());
    $('tlContent').innerHTML = `${sectionHeader(c.essentialsTitle,c.essentialsSub)}<section class="tl-faq">${faq.map(([q,a],i)=>`<details ${i===0?'open':''}><summary>${esc(q)}<span aria-hidden="true">＋</span></summary><p>${esc(a)}</p></details>`).join('')}</section><button class="tl-back-home" type="button" data-tl-view="home">‹ ${esc(c.backLibrary)}</button>`;
  }

  function renderAbout() {
    const c=copy(), a=Content.about(lang());
    const entries=[[c.privacyTitle,a.privacy,'⌁'],[c.dailyRulesTitle,a.daily,'◷'],[c.saveShareTitle,a.saveShare,'↗'],[c.languagesTitle,a.languages,'文'],[c.accessibilityTitle,a.accessibility,'◌'],[c.creditsTitle,a.credits,'✦']];
    $('tlContent').innerHTML = `${sectionHeader(c.aboutTitle,c.aboutSub)}<section class="tl-about-grid">${entries.map(([h,p,i])=>`<article><span aria-hidden="true">${i}</span><div><h2>${esc(h)}</h2><p>${esc(p)}</p></div></article>`).join('')}</section><button class="tl-primary-link" type="button" data-tl-view="home">${esc(c.openLibrary)}<span aria-hidden="true">›</span></button><button class="tl-back-home" type="button" data-tl-close><span aria-hidden="true">⌂</span>${esc(c.backHome)}</button>`;
  }

  function render() {
    if (!state.root) return;
    state.root.dataset.view = state.view;
    if (state.view === 'home') renderHome();
    else if (state.view === 'deck') renderDeck();
    else if (state.view === 'card') renderCardDetail();
    else if (state.view === 'learn') renderLearn();
    else if (state.view === 'ways') renderWays();
    else if (state.view === 'spreads') renderSpreads();
    else if (state.view === 'essentials') renderEssentials();
    else if (state.view === 'about') renderAbout();
    else { state.view='home'; renderHome(); }
    $('tlBack').setAttribute('aria-label', state.view==='home' ? copy().backHome : copy().backLibrary);
    $('tlHome').setAttribute('aria-label', copy().backHome);
    const targetScroll = state.view === 'deck' ? state.deckScroll : 0;
    $('tlScroll').scrollTop = targetScroll;
    requestAnimationFrame(()=>$('tlPageTitle')?.setAttribute('tabindex','-1'));
  }

  function open(view='home', source=null) {
    if (!state.root) createRoot();
    state.source = source || state.source;
    state.view = view;
    state.open = true;
    state.root.hidden = false;
    document.body.classList.add('tl-mode-open');
    render();
    requestAnimationFrame(()=>state.root.classList.add('is-visible'));
    setTimeout(()=>$('tlBack')?.focus({preventScroll:true}),70);
  }

  function close() {
    if (!state.root || !state.open) return;
    state.open=false;
    state.root.classList.remove('is-visible');
    document.body.classList.remove('tl-mode-open');
    const source=state.source;
    setTimeout(()=>{ if (!state.open) state.root.hidden=true; },240);
    (source || document.querySelector('[data-feature="cards"]'))?.focus?.({preventScroll:true});
  }

  function navigateBack() {
    if (state.view === 'card') { state.view='deck'; render(); return; }
    if (state.view !== 'home' && state.view !== 'about') { state.view='home'; render(); return; }
    close();
  }

  function onRootClick(event) {
    const closeButton=event.target.closest?.('[data-tl-close]'); if (closeButton) { close(); return; }
    const viewButton=event.target.closest?.('[data-tl-view]'); if (viewButton) { const next=viewButton.dataset.tlView; if(next==='deck' && state.view!=='card') state.deckScroll=0; state.view=next; state.cardId=null; render(); return; }
    const filterButton=event.target.closest?.('[data-tl-filter]'); if (filterButton) { state.filter=filterButton.dataset.tlFilter; refreshDeckResults(); return; }
    const cardButton=event.target.closest?.('[data-tl-card]'); if (cardButton) { state.deckScroll=$('tlScroll')?.scrollTop || 0; state.cardId=cardButton.dataset.tlCard; state.view='card'; render(); return; }
  }

  function onRootInput(event) {
    if (event.target?.id !== 'tlSearch') return;
    state.query=event.target.value;
    // Keep the original input element focused. Replacing it on every keystroke
    // dismisses mobile software keyboards and can interrupt IME composition.
    refreshDeckResults();
  }

  function injectSettingsGuide() {
    if (document.querySelector('[data-tl-settings-guide]')) return;
    const support=document.querySelector('.settings-group.support-group');
    if (!support) return;
    const section=document.createElement('section');
    section.className='settings-group tl-settings-guide';
    section.dataset.tlSettingsGuide='true';
    section.innerHTML='<h3 id="tlSettingsGuideHeading"></h3><button class="setting-link" id="tlSettingsGuideButton" type="button"><span><strong id="tlSettingsGuideTitle"></strong><small id="tlSettingsGuideSub"></small></span><span>›</span></button>';
    support.parentNode.insertBefore(section,support);
    section.querySelector('#tlSettingsGuideButton').addEventListener('click',(e)=>open('about',e.currentTarget));
    updateInjectedCopy();
  }

  function updateInjectedCopy() {
    const c=copy();
    const h=document.getElementById('tlSettingsGuideHeading'), t=document.getElementById('tlSettingsGuideTitle'), s=document.getElementById('tlSettingsGuideSub');
    if(h) h.textContent=c.aboutEyebrow; if(t) t.textContent=c.aboutSettingsTitle; if(s) s.textContent=c.aboutSettingsSub;
  }

  // Capture is intentional: app.js owns a generic "coming soon" listener for Explore placeholders.
  document.addEventListener('click',(event)=>{
    const button=event.target.closest?.('[data-feature="cards"]');
    if(!button) return;
    event.preventDefault(); event.stopImmediatePropagation(); open('home',button);
  },true);

  window.addEventListener('keydown',(event)=>{
    if(event.key!=='Escape' || !state.open) return;
    event.preventDefault(); navigateBack();
  });

  const langObserver=new MutationObserver(()=>{ updateInjectedCopy(); if(state.open) render(); });
  langObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  injectSettingsGuide();

  window.LGTTarotLibrary = Object.freeze({ version:VERSION, open:()=>open('home'), openAbout:()=>open('about'), close });
})();

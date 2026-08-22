(() => {
  'use strict';

  function localDateISO(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function nextLocalMidnight(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0, 0);
  }

  function snapshot(date = new Date()) {
    const next = nextLocalMidnight(date);
    const remainingMs = Math.max(0, next.getTime() - date.getTime());
    return Object.freeze({
      localDate: localDateISO(date),
      now: date,
      nextMidnight: next,
      remainingMs
    });
  }

  function formatRemaining(remainingMs, lang = 'en') {
    const safe = Math.max(0, Number(remainingMs) || 0);
    const totalSeconds = Math.ceil(safe / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (totalSeconds < 60) {
      const seconds = Math.max(0, totalSeconds);
      return lang === 'th' ? `${seconds} วินาที` : `${seconds} sec`;
    }
    if (totalMinutes < 60) {
      return lang === 'th' ? `${totalMinutes} นาที` : `${totalMinutes} min`;
    }
    return lang === 'th'
      ? `${hours} ชม. · ${minutes} นาที`
      : `${hours} hr · ${minutes} min`;
  }

  const listeners = new Set();
  let timer = null;
  let previousDate = localDateISO();

  function nextDelay(ms) {
    if (ms <= 60000) return 1000;
    const remainder = ms % 60000;
    return Math.max(1000, Math.min(30000, remainder || 30000));
  }

  function emit() {
    const info = snapshot();
    const rolledOver = info.localDate !== previousDate;
    previousDate = info.localDate;
    listeners.forEach((listener) => {
      try { listener(info, { rolledOver }); } catch (error) { console.error(error); }
    });
    schedule(info.remainingMs);
  }

  function schedule(remainingMs) {
    if (timer) clearTimeout(timer);
    timer = null;
    if (!listeners.size || document.hidden) return;
    timer = setTimeout(emit, nextDelay(remainingMs));
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') return () => {};
    const wasIdle = listeners.size === 0;
    listeners.add(listener);
    const info = snapshot();
    // When there were no active countdown consumers, establish a fresh day baseline.
    // This prevents a stale module-level date from falsely reporting a rollover
    // when the first reading after midnight starts its countdown.
    if (wasIdle) previousDate = info.localDate;
    try { listener(info, { rolledOver: false }); } catch (error) { console.error(error); }
    schedule(info.remainingMs);
    return () => {
      listeners.delete(listener);
      if (!listeners.size && timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }

  function refresh() {
    if (!listeners.size) return;
    emit();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (timer) clearTimeout(timer);
      timer = null;
    } else {
      refresh();
    }
  });
  window.addEventListener('pageshow', refresh);

  window.LGTReadingDay = Object.freeze({
    version: '1.0.0',
    localDateISO,
    nextLocalMidnight,
    snapshot,
    formatRemaining,
    subscribe,
    refresh
  });
})();

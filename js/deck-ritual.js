(() => {
  'use strict';

  const clampInt = (value, min, max, fallback) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(min, Math.min(max, Math.trunc(n)));
  };

  function splitRows(count, rowCount) {
    const rows = [];
    const base = Math.floor(count / rowCount);
    let remainder = count % rowCount;
    let cursor = 0;
    for (let row = 0; row < rowCount; row += 1) {
      const size = base + (remainder > 0 ? 1 : 0);
      remainder = Math.max(0, remainder - 1);
      const indices = [];
      for (let i = 0; i < size; i += 1) indices.push(cursor++);
      rows.push(indices);
    }
    return rows;
  }

  function create(options = {}) {
    const container = options.container;
    if (!(container instanceof HTMLElement)) throw new TypeError('Deck Ritual requires a valid container.');

    const count = clampInt(options.count, 1, 78, 78);
    const selectionLimit = clampInt(options.selectionLimit, 1, count, 1);
    const rowCount = clampInt(options.rowCount, 1, 8, 6);
    const variant = ['quick', 'focus', 'full'].includes(options.variant) ? options.variant : 'quick';
    const cardBack = String(options.cardBack || '');
    const onSelect = typeof options.onSelect === 'function' ? options.onSelect : () => {};
    let ariaLabelBuilder = typeof options.ariaLabelBuilder === 'function'
      ? options.ariaLabelBuilder
      : (index) => `Choose card ${index + 1}`;

    let destroyed = false;
    const selected = [];
    const buttons = new Map();
    const positions = new Map();

    container.replaceChildren();
    container.classList.add('deck-ritual-host');

    const ritual = document.createElement('div');
    ritual.className = `deck-ritual deck-ritual--${variant}`;
    ritual.dataset.selectionLimit = String(selectionLimit);

    const viewport = document.createElement('div');
    viewport.className = 'deck-ritual__viewport';
    viewport.setAttribute('role', 'group');
    if (options.groupLabel) viewport.setAttribute('aria-label', String(options.groupLabel));

    const spread = document.createElement('div');
    spread.className = 'deck-ritual__spread';
    spread.style.setProperty('--deck-row-count', String(rowCount));

    const rows = splitRows(count, rowCount);
    rows.forEach((indices, rowIndex) => {
      const row = document.createElement('div');
      row.className = 'deck-ritual__row';
      row.dataset.row = String(rowIndex + 1);
      row.style.setProperty('--cards-in-row', String(indices.length));

      indices.forEach((index, visualIndex) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'deck-ritual__card';
        button.dataset.index = String(index);
        button.dataset.visualIndex = String(visualIndex);
        button.style.setProperty('--deck-i', String(visualIndex));
        button.setAttribute('aria-label', ariaLabelBuilder(index));
        button.setAttribute('aria-pressed', 'false');
        button.tabIndex = index === 0 ? 0 : -1;
        positions.set(index, { row: rowIndex, col: visualIndex });
        button.innerHTML = `<span class="deck-ritual__card-shell"><img src="${cardBack}" alt="" decoding="async"><span class="deck-ritual__pick-order" aria-hidden="true"></span></span>`;

        button.addEventListener('focus', () => {
          buttons.forEach((other) => { other.tabIndex = other === button ? 0 : -1; });
        });

        button.addEventListener('keydown', (event) => {
          const pos = positions.get(index);
          if (!pos) return;
          let targetIndex = null;
          if (event.key === 'ArrowRight') targetIndex = rows[pos.row][Math.min(rows[pos.row].length - 1, pos.col + 1)];
          else if (event.key === 'ArrowLeft') targetIndex = rows[pos.row][Math.max(0, pos.col - 1)];
          else if (event.key === 'ArrowDown' && pos.row < rows.length - 1) targetIndex = rows[pos.row + 1][Math.min(rows[pos.row + 1].length - 1, pos.col)];
          else if (event.key === 'ArrowUp' && pos.row > 0) targetIndex = rows[pos.row - 1][Math.min(rows[pos.row - 1].length - 1, pos.col)];
          else if (event.key === 'Home') targetIndex = rows[pos.row][0];
          else if (event.key === 'End') targetIndex = rows[pos.row][rows[pos.row].length - 1];
          if (targetIndex == null || targetIndex === index) return;
          event.preventDefault();
          const target = buttons.get(targetIndex);
          if (!target) return;
          buttons.forEach((other) => { other.tabIndex = other === target ? 0 : -1; });
          target.focus({ preventScroll: true });
          target.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'auto' });
        });

        button.addEventListener('click', () => {
          if (destroyed || button.disabled || selected.length >= selectionLimit) return;
          const order = selected.length + 1;
          selected.push(index);
          button.classList.add('is-selected');
          button.setAttribute('aria-pressed', 'true');
          button.dataset.order = String(order);
          button.querySelector('.deck-ritual__pick-order').textContent = String(order);
          button.disabled = true;

          if (selectionLimit === 1) {
            buttons.forEach((other) => {
              if (other !== button) other.disabled = true;
            });
          }

          ritual.dataset.selectedCount = String(selected.length);
          onSelect({ index, order, selectedIndices: [...selected], button });

          if (selectionLimit > 1 && selected.length < selectionLimit) {
            const remaining = [...buttons.entries()].find(([candidateIndex, candidate]) => candidateIndex > index && !candidate.disabled)
              || [...buttons.entries()].find(([, candidate]) => !candidate.disabled);
            if (remaining) {
              const [, nextButton] = remaining;
              buttons.forEach((other) => { other.tabIndex = other === nextButton ? 0 : -1; });
              queueMicrotask(() => nextButton.focus({ preventScroll: true }));
            }
          }
        });

        buttons.set(index, button);
        row.appendChild(button);
      });
      spread.appendChild(row);
    });

    viewport.appendChild(spread);
    ritual.appendChild(viewport);
    container.appendChild(ritual);

    requestAnimationFrame(() => ritual.classList.add('is-ready'));

    function setAriaLabelBuilder(nextBuilder) {
      if (typeof nextBuilder !== 'function') return;
      ariaLabelBuilder = nextBuilder;
      buttons.forEach((button, index) => button.setAttribute('aria-label', ariaLabelBuilder(index)));
    }

    function focusFirst() {
      const first = buttons.get(0) || buttons.values().next().value;
      first?.focus({ preventScroll: true });
    }

    function focusSelectedLast() {
      const index = selected[selected.length - 1];
      if (index == null) return focusFirst();
      buttons.get(index)?.focus({ preventScroll: true });
    }

    function destroy() {
      destroyed = true;
      container.replaceChildren();
      container.classList.remove('deck-ritual-host');
    }

    return Object.freeze({
      destroy,
      focusFirst,
      focusSelectedLast,
      setAriaLabelBuilder,
      getSelectedIndices: () => [...selected],
      get selectedCount() { return selected.length; },
      get selectionLimit() { return selectionLimit; }
    });
  }

  window.LGTDeckRitual = Object.freeze({ version: '1.1.0', create });
})();

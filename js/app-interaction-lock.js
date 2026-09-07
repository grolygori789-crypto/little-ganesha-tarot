(() => {
  'use strict';

  const VERSION = 'app-interaction-lock-v1.0';
  const EDITABLE_SELECTOR = [
    'input',
    'textarea',
    '[contenteditable]:not([contenteditable="false"])',
    '[data-native-selection="allow"]'
  ].join(',');

  function elementFrom(target) {
    if (target instanceof Element) return target;
    return target?.parentElement instanceof Element ? target.parentElement : null;
  }

  function isEditableTarget(target) {
    const element = elementFrom(target);
    return Boolean(element?.closest(EDITABLE_SELECTOR));
  }

  function blockOutsideEditable(event) {
    if (!isEditableTarget(event.target)) event.preventDefault();
  }

  // Suppress native browser/page affordances while preserving app gestures.
  document.addEventListener('contextmenu', blockOutsideEditable, true);
  document.addEventListener('selectstart', blockOutsideEditable, true);
  document.addEventListener('copy', blockOutsideEditable, true);
  document.addEventListener('cut', blockOutsideEditable, true);

  // HTML drag-and-drop is not part of the product interaction model.
  document.addEventListener('dragstart', (event) => event.preventDefault(), true);
  document.addEventListener('drop', blockOutsideEditable, true);

  window.LGTInteractionLock = Object.freeze({
    version: VERSION,
    isEditableTarget
  });
})();

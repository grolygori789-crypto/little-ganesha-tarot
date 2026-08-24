(() => {
  'use strict';

  const state = {
    supported: 'serviceWorker' in navigator,
    registered: false,
    installPromptAvailable: false,
    installed: window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true,
    registration: null,
    error: null
  };

  function publish(type = 'statechange') {
    window.dispatchEvent(new CustomEvent(`lgt:pwa:${type}`, { detail: { ...state } }));
  }

  // Observe Chromium installability without suppressing the browser's native
  // install UI. A future in-app install button can add prompt ownership later.
  window.addEventListener('beforeinstallprompt', () => {
    state.installPromptAvailable = true;
    publish('installable');
  });

  window.addEventListener('appinstalled', () => {
    state.installed = true;
    state.installPromptAvailable = false;
    publish('installed');
  });

  async function register() {
    if (!state.supported) {
      publish('unsupported');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register('./sw.js', {
        scope: './',
        updateViaCache: 'none'
      });
      state.registration = registration;
      state.registered = true;
      state.error = null;

      // Check for a fresh worker on each full page load. Combined with the
      // worker's versioned caches, this keeps rapid GitHub Pages releases from
      // being trapped behind stale application-shell assets.
      registration.update().catch(() => {});
      publish('registered');
      return registration;
    } catch (error) {
      state.error = error instanceof Error ? error.message : String(error);
      publish('error');
      return null;
    }
  }

  window.LGTPWA = {
    getState: () => ({ ...state }),
    register
  };

  window.addEventListener('load', register, { once: true });
})();

(() => {
  'use strict';

  const audio = window.LGTAudio;
  if (!audio || !Array.isArray(audio.tracks)) return;

  const additions = [
    {
      id: 'bamboo-in-the-rain',
      title: 'Bamboo in the Rain',
      src: 'assets/audio/bamboo-in-the-rain.mp3'
    },
    {
      id: 'path-of-still-water',
      title: 'Path of Still Water',
      src: 'assets/audio/path-of-still-water.mp3'
    },
    {
      id: 'breath-of-the-morning',
      title: 'Breath of the Morning',
      src: 'assets/audio/breath-of-the-morning.mp3'
    }
  ];

  for (const track of additions) {
    if (!audio.tracks.some((item) => item?.id === track.id)) {
      audio.tracks.push(track);
    }
  }

  // audio.js constructs with the original two-track list. Restore a saved
  // track index only after the five-track list exists.
  const savedIndex = Number.parseInt(localStorage.getItem('lgt.track') || '0', 10);
  if (Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < audio.tracks.length) {
    audio.currentIndex = savedIndex;
  }
})();

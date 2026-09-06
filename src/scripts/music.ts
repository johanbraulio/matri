export {};
const audio = document.querySelector<HTMLAudioElement>('#wedding-music');
const toggle = document.querySelector<HTMLButtonElement>('#music-toggle');
const musicStatus = document.querySelector<HTMLElement>('#music-status');
if (audio && toggle) {
  const sync = () => {
    toggle.setAttribute('aria-pressed', String(!audio.paused));
    toggle.setAttribute('aria-label', `${audio.paused ? 'Reproducir' : 'Pausar'} ${toggle.dataset.title ?? 'música'}`);
  };
  toggle.addEventListener('click', async () => {
    if (musicStatus) musicStatus.textContent = '';
    if (!audio.paused) audio.pause();
    else {
      try { await audio.play(); }
      catch { if (musicStatus) musicStatus.textContent = 'No se pudo reproducir la música. Inténtalo de nuevo.'; }
    }
    sync();
  });
  audio.addEventListener('play', sync);
  audio.addEventListener('pause', sync);
  audio.addEventListener('error', () => {
    if (musicStatus) musicStatus.textContent = 'La música no está disponible en este momento.';
    sync();
  });
}

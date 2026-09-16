export {};
const envelopeDialog = document.querySelector<HTMLDialogElement>('.envelope-welcome');
const invitation = document.querySelector<HTMLElement>('#invitation-content');
const openEnvelope = document.querySelector<HTMLButtonElement>('#open-envelope');
const openSilent = document.querySelector<HTMLButtonElement>('#open-without-music');
if (envelopeDialog && invitation && openEnvelope && openSilent) {
  // Modal nativo: foco contenido en los controles hasta abrir la invitación.
  envelopeDialog.removeAttribute('open');
  envelopeDialog.showModal();
  envelopeDialog.addEventListener('cancel', event => event.preventDefault());
  let opening = false;
  function enter(withMusic: boolean) {
    if (opening) return;
    opening = true;
    const audio = document.querySelector<HTMLAudioElement>('#wedding-music');
    if (audio) {
      audio.volume = 0.4;
      if (withMusic) {
        // La llamada ocurre dentro del clic, antes de esperar la animación.
        void audio.play().catch(() => {
          const status = document.querySelector<HTMLElement>('#music-status');
          if (status) status.textContent = 'Puedes activar la música con este botón.';
        });
      } else audio.pause();
    }
    document.documentElement.dataset.envelope = 'opening';
    openEnvelope!.disabled = true;
    openSilent!.disabled = true;
    const finish = () => {
      invitation!.hidden = false;
      document.documentElement.dataset.envelope = 'open';
      envelopeDialog!.close();
      window.scrollTo({ top: 0, behavior: 'instant' });
      const heading = document.querySelector<HTMLElement>('#couple-names');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else window.setTimeout(() => {
      // La portada ya está pintada detrás del modal durante el desvanecido.
      invitation!.hidden = false;
      window.scrollTo({ top: 0, behavior: 'instant' });
      envelopeDialog!.addEventListener('transitionend', event => {
        if (event.target === envelopeDialog && event.propertyName === 'opacity') finish();
      }, { once: true });
      envelopeDialog!.classList.add('is-leaving');
      window.setTimeout(() => {
        if (envelopeDialog!.open) finish();
      }, 1000);
    }, 1150);
  }
  openEnvelope.addEventListener('click', () => enter(true));
  openSilent.addEventListener('click', () => enter(false));
}

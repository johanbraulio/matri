export {};
const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-gallery-image]')];
const dialog = document.querySelector<HTMLDialogElement>('.lightbox');
const image = dialog?.querySelector<HTMLImageElement>('.lightbox-image');
const caption = dialog?.querySelector<HTMLElement>('figcaption');
if (dialog && image && caption && buttons.length) {
  let index = 0;
  let opener: HTMLButtonElement | undefined;
  const show = (next: number) => {
    index = (next + buttons.length) % buttons.length;
    const button = buttons[index];
    image.src = button.dataset.galleryImage ?? '';
    image.alt = button.dataset.alt ?? '';
    caption.textContent = `${index + 1} / ${buttons.length}${button.dataset.caption ? ` — ${button.dataset.caption}` : ''}`;
  };
  buttons.forEach((button, current) => button.addEventListener('click', () => {
    opener = button;
    show(current);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }));
  dialog.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
  const prev = dialog.querySelector<HTMLButtonElement>('.lightbox-prev');
  const next = dialog.querySelector<HTMLButtonElement>('.lightbox-next');
  if (prev && next) {
    prev.hidden = next.hidden = buttons.length < 2;
    prev.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));
  }
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    opener?.focus();
  });
  let touchStart: { x: number; y: number } | null = null;
  image.addEventListener('touchstart', event => {
    touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  image.addEventListener('touchend', event => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
}

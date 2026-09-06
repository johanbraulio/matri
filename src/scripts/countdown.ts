import { getCountdown, getWeddingMessage } from './countdown-utils';

const section = document.querySelector<HTMLElement>('[data-countdown]');
if (section) {
  const target = Date.parse(section.dataset.date ?? '');
  const digits = section.querySelectorAll<HTMLElement>('[data-unit]');
  const grid = section.querySelector<HTMLElement>('.countdown-grid');
  const message = section.querySelector<HTMLElement>('.countdown-message');
  let timer: ReturnType<typeof setInterval> | undefined;
  function update() {
    if (!Number.isFinite(target) || !grid || !message) return;
    const now = Date.now();
    const endedMessage = getWeddingMessage(target, now);
    grid.hidden = Boolean(endedMessage);
    message.hidden = !endedMessage;
    if (endedMessage) {
      message.textContent = endedMessage;
      if (timer) clearInterval(timer);
    } else {
      getCountdown(target, now).forEach((value, index) => {
        if (digits[index]) digits[index].textContent = String(value).padStart(2, '0');
      });
    }
  }
  if (Number.isFinite(target)) {
    update();
    if (Date.now() < target) timer = setInterval(update, 1000);
    document.addEventListener('visibilitychange', () => {
      if (timer) clearInterval(timer);
      if (!document.hidden) {
        update();
        if (Date.now() < target) timer = setInterval(update, 1000);
      }
    });
  }
}

export const SECOND = 1000;
export function getCountdown(target: number, now: number): [number, number, number, number] {
  const remaining = Math.max(0, Math.floor((target - now) / SECOND));
  return [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
}
export function getWeddingMessage(target: number, now: number): string | null {
  if (now < target) return null;
  const limaDay = (timestamp: number) => new Date(timestamp - 5 * 3600 * SECOND).toISOString().slice(0, 10);
  return limaDay(now) === limaDay(target) ? '¡Llegó nuestro gran día!' : 'Gracias por acompañarnos en nuestro gran día.';
}

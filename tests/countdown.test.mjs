import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCountdown, getWeddingMessage } from '../src/scripts/countdown-utils.ts';

const target = Date.parse('2026-10-10T13:00:00-05:00');
test('la ceremonia es a las 18:00 UTC, 13:00 en Perú', () => {
  assert.equal(new Date(target).toISOString(), '2026-10-10T18:00:00.000Z');
  assert.deepEqual(getCountdown(target, Date.parse('2026-10-09T17:58:57Z')), [1, 0, 1, 3]);
});
test('no muestra números negativos al terminar', () => {
  assert.deepEqual(getCountdown(target, target + 10000), [0, 0, 0, 0]);
  assert.equal(getWeddingMessage(target, target - 1), null);
  assert.equal(getWeddingMessage(target, target), '¡Llegó nuestro gran día!');
});
test('el mensaje de boda cambia a medianoche de Perú, no de UTC', () => {
  assert.equal(getWeddingMessage(target, Date.parse('2026-10-11T04:59:59Z')), '¡Llegó nuestro gran día!');
  assert.equal(getWeddingMessage(target, Date.parse('2026-10-11T05:00:00Z')), 'Gracias por acompañarnos en nuestro gran día.');
});

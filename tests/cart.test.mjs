import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STORE, PRODUCTS, normalizeCart, addItem, setQuantity, itemCount, filterProducts, buildOrderMessage, whatsappUrl } from '../docs/core.mjs';

test('a multi-product order keeps quantities through editing and JSON persistence', () => {
  let cart = addItem([], 'celular');
  cart = addItem(cart, 'capinha');
  cart = addItem(cart, 'capinha');
  cart = addItem(cart, 'fone');
  assert.equal(itemCount(cart), 4);
  cart = normalizeCart(JSON.parse(JSON.stringify(cart)));
  cart = setQuantity(cart, 'fone', 3);
  cart = setQuantity(cart, 'celular', 0);
  assert.deepEqual(cart, [{ id: 'capinha', qty: 2 }, { id: 'fone', qty: 3 }]);
  assert.equal(itemCount(cart), 5);
});

test('corrupt or stale saved cart records cannot create fake products or negative quantities', () => {
  assert.deepEqual(normalizeCart({}), []);
  assert.deepEqual(normalizeCart([null, { id: '<img>', qty: 99 }, { id: 'fone', qty: -2 }, { id: 'cabo', qty: 'invalid' }]), []);
  assert.deepEqual(normalizeCart([{ id: 'fone', qty: 80 }, { id: 'fone', qty: 80 }, { id: 'cabo', qty: 1.9 }]), [{ id: 'fone', qty: 99 }, { id: 'cabo', qty: 1 }]);
  assert.equal(itemCount(addItem([{ id: 'fone', qty: 99 }], 'fone')), 99);
});

test('accent-insensitive catalog search combines with category filtering', () => {
  assert.deepEqual(filterProducts('Proteção', 'pelicula').map(p => p.id), ['pelicula']);
  assert.deepEqual(filterProducts('Áudio', 'bluetooth').map(p => p.id), ['fone', 'caixa-som']);
  assert.deepEqual(filterProducts('Energia', 'capinha'), []);
  assert.equal(filterProducts('Todos', '').length, PRODUCTS.length);
});

test('WhatsApp message includes every item and quantity, compatible-device notes and confirmed recipient', () => {
  const message = buildOrderMessage([{ id: 'capinha', qty: 2 }, { id: 'carregador', qty: 1 }], { name: 'Carlos', device: 'iPhone 13', fulfillment: 'pickup', notes: 'Preta & verde / consultar cores' });
  const link = new URL(whatsappUrl(message));
  assert.equal(link.origin, 'https://wa.me');
  assert.equal(link.pathname, '/5531992272104');
  assert.equal(link.searchParams.get('text'), message);
  assert.match(message, /2 × Capinha para celular/);
  assert.match(message, /1 × Carregador/);
  assert.match(message, /Quantidade total: 3/);
  assert.match(message, /Nome: Carlos/);
  assert.match(message, /iPhone 13/);
  assert.match(message, /retirar na loja de Nova Contagem/);
  assert.match(message, /Preta & verde/);
  assert.doesNotMatch(message, /R\$|total: 0|Pedido confirmado/i);
});

test('delivery is a consultation, not a promise, and pickup omits a stale delivery address', () => {
  const cart = [{ id: 'fone', qty: 1 }];
  const delivery = buildOrderMessage(cart, { fulfillment: 'delivery', address: 'Rua A, 20 — Nova Contagem' });
  assert.match(delivery, /gostaria de consultar entrega/);
  assert.match(delivery, /Rua A, 20/);
  const pickup = buildOrderMessage(cart, { fulfillment: 'pickup', address: 'Rua A, 20' });
  assert.doesNotMatch(pickup, /Rua A/);
  assert.equal(buildOrderMessage([]), '');
  assert.equal(STORE.phone, '5531992272104');
});

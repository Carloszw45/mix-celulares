import { PRODUCTS, normalizeCart, addItem, setQuantity, itemCount, filterProducts, buildOrderMessage, whatsappUrl } from './core.mjs';

const CART_KEY = 'mix-celulares-cart-v1';
const DETAILS_KEY = 'mix-celulares-order-v1';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
let cart = [];
let category = 'Todos';
let toastTimer;
const animationTimers = new Map();

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { /* The cart remains usable if browser storage is unavailable. */ }
}
cart = normalizeCart(readStorage(CART_KEY, []));

function renderProducts() {
  const products = filterProducts(category, $('#product-search').value);
  $('#product-grid').innerHTML = products.map(p => `<article class="product-card"><div class="product-image-wrap"><span class="product-category">${p.category.toUpperCase()}</span><img class="product-image" src="assets/${p.image}" alt="Foto de referência de ${p.name.toLowerCase()}" width="400" height="340" loading="lazy" decoding="async"></div><div class="product-body"><p class="product-kicker">${p.label}</p><h3>${p.name}</h3><p class="product-description">${p.description}</p><div class="product-bottom"><span class="product-price">Sob consulta</span><button class="add-button" type="button" data-add="${p.id}" aria-label="Adicionar ${p.name.toLowerCase()} ao carrinho"><span>Adicionar</span>${icon('plus')}</button></div></div></article>`).join('');
  $('#no-results').hidden = products.length > 0;
  $('#result-count').textContent = `${products.length} ${products.length === 1 ? 'opção para consultar' : 'opções para consultar'}`;
}

function getDetails() {
  return Object.fromEntries(new FormData($('#order-form')).entries());
}

function renderMessage() {
  $('#order-message').textContent = buildOrderMessage(cart, getDetails());
}

function renderCart() {
  const count = itemCount(cart);
  $$('[data-cart-count]').forEach(node => { node.textContent = count; });
  $$('[data-open-cart]').forEach(node => node.setAttribute('aria-label', `Abrir carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`));
  $('#cart-title-count').textContent = count;
  $('#cart-empty').hidden = count > 0;
  $('#cart-content').hidden = count === 0;
  $('#mobile-cart').hidden = count === 0;
  $('#mobile-item-label').textContent = count === 1 ? 'item no carrinho' : 'itens no carrinho';
  document.body.classList.toggle('has-cart', count > 0);
  const focus = document.activeElement;
  const focusId = focus?.dataset?.item;
  const focusAction = focus?.dataset?.action;
  $('#cart-items').innerHTML = cart.map(row => {
    const p = PRODUCTS.find(product => product.id === row.id);
    return `<div class="cart-row"><img src="assets/${p.image}" alt="" width="68" height="78"><div><h3>${p.name}</h3><p class="cart-row-price">Sob consulta</p><div class="quantity-control"><button type="button" data-action="decrease" data-item="${p.id}" aria-label="Diminuir quantidade de ${p.name.toLowerCase()}">${icon('minus')}</button><output aria-label="Quantidade de ${p.name.toLowerCase()}">${row.qty}</output><button type="button" data-action="increase" data-item="${p.id}" aria-label="Aumentar quantidade de ${p.name.toLowerCase()}" ${row.qty >= 99 ? 'disabled' : ''}>${icon('plus')}</button></div></div><button type="button" class="remove-item" data-action="remove" data-item="${p.id}" aria-label="Remover ${p.name.toLowerCase()} do carrinho">${icon('trash')}</button></div>`;
  }).join('');
  if (focusId && focusAction) {
    const next = $(`#cart-items [data-item="${focusId}"][data-action="${focusAction}"]`);
    if (next && !next.disabled) next.focus({ preventScroll: true });
    else if (count > 0) $('#cart-items button').focus({ preventScroll: true });
    else $('#continue-shopping').focus({ preventScroll: true });
  }
  renderMessage();
}

function saveCart() { writeStorage(CART_KEY, cart); renderCart(); }
function toast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2200);
}

const dialog = $('#cart-dialog');
function openCart() {
  renderCart();
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
}
function closeCart() { dialog.close(); }
$$('[data-open-cart]').forEach(button => button.addEventListener('click', openCart));
$('#close-cart').addEventListener('click', closeCart);
$('#keep-shopping').addEventListener('click', closeCart);
$('#continue-shopping').addEventListener('click', () => { closeCart(); $('#catalogo').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); });
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeCart();
});

$('#product-grid').addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const product = PRODUCTS.find(p => p.id === button.dataset.add);
  if (!product) return;
  const previousCount = itemCount(cart);
  cart = addItem(cart, product.id);
  saveCart();
  if (previousCount === itemCount(cart)) { toast('Limite de 99 unidades por produto.'); return; }
  toast(`${product.name} adicionado ao carrinho`);
  button.dataset.added = 'true';
  button.innerHTML = `<span>Adicionado</span>${icon('check')}`;
  clearTimeout(animationTimers.get(product.id));
  animationTimers.set(product.id, setTimeout(() => {
    button.dataset.added = 'false';
    button.innerHTML = `<span>Adicionar</span>${icon('plus')}`;
    animationTimers.delete(product.id);
  }, 1400));
});

$('#cart-items').addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  const row = cart.find(item => item.id === button.dataset.item);
  if (!row) return;
  const qty = button.dataset.action === 'remove' ? 0 : row.qty + (button.dataset.action === 'increase' ? 1 : -1);
  cart = setQuantity(cart, row.id, qty);
  saveCart();
});

$$('[data-category]').forEach(button => button.addEventListener('click', () => {
  category = button.dataset.category;
  $$('[data-category]').forEach(node => { const active = node === button; node.classList.toggle('active', active); node.setAttribute('aria-pressed', String(active)); });
  renderProducts();
}));
$('#product-search').addEventListener('input', renderProducts);
$('#reset-filters').addEventListener('click', () => { $('#product-search').value = ''; $('[data-category="Todos"]').click(); });

const draft = readStorage(DETAILS_KEY, {});
if (draft && typeof draft === 'object' && !Array.isArray(draft)) {
  for (const name of ['name', 'device', 'fulfillment', 'address', 'notes']) {
    const element = $(`#order-form [name="${name}"]`);
    if (typeof draft[name] === 'string') element.value = draft[name].slice(0, element.maxLength > 0 ? element.maxLength : 20);
  }
  if (!['pickup', 'delivery'].includes($('#fulfillment').value)) $('#fulfillment').value = 'pickup';
}
function updateDetails() {
  const delivery = $('#fulfillment').value === 'delivery';
  $('#address-field').hidden = !delivery;
  $('#customer-address').required = delivery;
  if (!delivery) $('#customer-address').setCustomValidity('');
  writeStorage(DETAILS_KEY, getDetails());
  renderMessage();
}
$('#order-form').addEventListener('input', updateDetails);
$('#order-form').addEventListener('change', updateDetails);
$('#order-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!itemCount(cart)) { renderCart(); return; }
  if (!$('#order-form').reportValidity()) return;
  const details = getDetails();
  if (details.fulfillment === 'delivery' && !details.address.trim()) {
    $('#customer-address').setCustomValidity('Informe o bairro ou endereço para consultar a entrega.');
    $('#customer-address').reportValidity();
    return;
  }
  $('#customer-address').setCustomValidity('');
  window.location.assign(whatsappUrl(buildOrderMessage(cart, details)));
});
$('#customer-address').addEventListener('input', () => $('#customer-address').setCustomValidity(''));

window.addEventListener('storage', event => {
  if (event.key !== CART_KEY && event.key !== null) return;
  cart = normalizeCart(readStorage(CART_KEY, []));
  renderCart();
});

renderProducts();
renderCart();
updateDetails();

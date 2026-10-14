export const STORE = Object.freeze({
  name: 'Mix Celulares',
  phone: '5531992272104',
  address: 'Rua VP-1, 1366 — Nova Contagem, Contagem/MG',
  maps: 'https://maps.app.goo.gl/ypwpHGCWxLWbAajb8',
});

export const PRODUCTS = Object.freeze([
  { id: 'celular', name: 'Smartphone', category: 'Celulares', label: 'Seu próximo upgrade', description: 'Consulte os aparelhos e modelos com a equipe.', image: 'smartphone-photo.webp', tags: 'celular telefone smartphone android xiaomi iphone samsung' },
  { id: 'capinha', name: 'Capinha para celular', category: 'Proteção', label: 'Do seu jeito', description: 'Informe seu modelo e escolha uma nova proteção.', image: 'case-photo.webp', tags: 'capinha capa silicone transparente proteção protecao' },
  { id: 'fone', name: 'Fone Bluetooth', category: 'Áudio', label: 'Conecte seu som', description: 'Consulte opções de fones sem fio para o dia a dia.', image: 'earbuds-photo.webp', tags: 'fone fones bluetooth audio áudio sem fio' },
  { id: 'carregador', name: 'Carregador', category: 'Energia', label: 'Energia para o dia', description: 'Encontre uma opção compatível com seu aparelho.', image: 'charger-photo.webp', tags: 'carregador carga carregamento usb tomada energia' },
  { id: 'pelicula', name: 'Película de proteção', category: 'Proteção', label: 'Cuide da sua tela', description: 'Consulte a película ideal para o seu celular.', image: 'glass-photo.webp', tags: 'pelicula película vidro tela proteção protecao' },
  { id: 'caixa-som', name: 'Caixa de som Bluetooth', category: 'Áudio', label: 'Som para acompanhar', description: 'Consulte os modelos de caixas de som da Mix.', image: 'speaker-photo.webp', tags: 'caixa som bluetooth speaker audio áudio hmaston h maston' },
  { id: 'cabo', name: 'Cabo para celular', category: 'Energia', label: 'A conexão que faltava', description: 'Diga qual entrada seu aparelho usa.', image: 'cable-photo.webp', tags: 'cabo usb c lightning micro usb energia carregamento' },
  { id: 'fone-cabo', name: 'Fone com fio', category: 'Áudio', label: 'Dê play no seu dia', description: 'Consulte as opções e a conexão compatível.', image: 'headphones-photo.webp', tags: 'fone fones cabo fio musica áudio audio p2 usb' },
]);

const ids = new Set(PRODUCTS.map(p => p.id));
const cleanText = (value, max = 400) => String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max);
const fold = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function normalizeCart(raw) {
  if (!Array.isArray(raw)) return [];
  const quantities = new Map();
  for (const row of raw) {
    if (!row || !ids.has(row.id) || !Number.isFinite(Number(row.qty))) continue;
    const qty = Math.trunc(Number(row.qty));
    if (qty < 1) continue;
    quantities.set(row.id, Math.min(99, (quantities.get(row.id) ?? 0) + qty));
  }
  return [...quantities].map(([id, qty]) => ({ id, qty }));
}

export function addItem(cart, id) {
  if (!ids.has(id)) return normalizeCart(cart);
  return normalizeCart([...normalizeCart(cart), { id, qty: 1 }]);
}

export function setQuantity(cart, id, quantity) {
  if (!ids.has(id) || !Number.isFinite(Number(quantity))) return normalizeCart(cart);
  const qty = Math.max(0, Math.min(99, Math.trunc(Number(quantity))));
  return normalizeCart(cart).flatMap(row => row.id === id ? (qty ? [{ id, qty }] : []) : [row]);
}

export const itemCount = cart => normalizeCart(cart).reduce((sum, row) => sum + row.qty, 0);

export function filterProducts(category = 'Todos', query = '') {
  const words = fold(query).trim().split(/\s+/).filter(Boolean);
  return PRODUCTS.filter(p => (category === 'Todos' || p.category === category)
    && words.every(word => fold(`${p.name} ${p.tags} ${p.category}`).includes(word)));
}

export function buildOrderMessage(cart, details = {}) {
  const valid = normalizeCart(cart);
  if (!valid.length) return '';
  const lines = ['Olá, Mix Celulares! Gostaria de consultar este pedido:', ''];
  for (const row of valid) {
    lines.push(`• ${row.qty} × ${PRODUCTS.find(p => p.id === row.id).name}`);
  }
  lines.push('', `Quantidade total: ${itemCount(valid)} item(ns)`);
  if (cleanText(details.name, 100)) lines.push(`Nome: ${cleanText(details.name, 100)}`);
  if (cleanText(details.device, 120)) lines.push(`Modelo do celular / preferência: ${cleanText(details.device, 120)}`);
  if (details.fulfillment === 'delivery') {
    lines.push('Recebimento: gostaria de consultar entrega');
    if (cleanText(details.address, 250)) lines.push(`Bairro / endereço: ${cleanText(details.address, 250)}`);
  } else {
    lines.push('Recebimento: retirar na loja de Nova Contagem');
  }
  if (cleanText(details.notes)) lines.push(`Observações: ${cleanText(details.notes)}`);
  lines.push('', 'Pode me confirmar os modelos, cores, preços e a disponibilidade?', 'Valores, pagamento e eventual entrega a combinar com a loja.');
  return lines.join('\n');
}

export function whatsappUrl(message) {
  return `https://wa.me/${STORE.phone}?text=${encodeURIComponent(cleanText(message, 6000))}`;
}

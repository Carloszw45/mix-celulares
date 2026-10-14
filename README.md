# Mix Celulares — Nova Contagem

Site público: https://carloszw45.github.io/mix-celulares/

Hospedagem: GitHub Pages, branch `main`, pasta `/docs`.

Site estático com catálogo para consulta, filtros, busca e carrinho persistido no navegador. O pedido é composto e aberto no WhatsApp da unidade de Nova Contagem: **(31) 99227-2104**. Nenhuma mensagem é enviada automaticamente; o visitante revisa e envia pelo WhatsApp.

## Conteúdo

O link de Maps fornecido identifica a Mix Celulares na Rua VP-1, 1366, Nova Contagem, Contagem/MG. O número também está divulgado na página da loja no Facebook. Os cartões representam tipos de produtos para consulta, sem garantir estoque, especificações, preço ou entrega. Todos os valores ficam sob consulta. Horários não foram fixados porque as fontes públicas divergem.

Fontes públicas consultadas em 14/10/2026:

- https://maps.app.goo.gl/ypwpHGCWxLWbAajb8
- https://www.facebook.com/p/Mix-Celulares-100054580564581/
- https://www.facebook.com/100054580564581/photos/agora-voc%C3%AA-encontra-na-mixcarregador-iphone-11-pro-turbo-original-carregador-com/3578554105507951/
- https://www.locaisdobrasil.com.br/encontre/loja-de-celulares/contagem-mg/mix-celulares/66d8433070d3ea745b3bc1ce

## Arquivos

- `docs/index.html`: conteúdo, metadados e diálogos acessíveis.
- `docs/core.mjs`: catálogo, carrinho, filtros e composição do pedido.
- `docs/app.mjs`: eventos e armazenamento local.
- `docs/styles.css`: layouts de computador/celular e movimento reduzido.
- `docs/assets/hero.webp`: destaque ilustrativo, 1536 × 1024, otimizado para WebP.
- `docs/assets/*-photo.webp`: fotografias reais de produtos, otimizadas e usadas como referências por categoria.
- `photo-sources.json`: páginas e URLs de origem das fotografias.
- `docs/assets/favicon.svg`: identidade visual vetorial.

Para atualizar os produtos, edite `PRODUCTS` em `docs/core.mjs`. O destinatário é `STORE.phone`; mantenha os links de contato do HTML em sincronia ao alterar o número.

## Verificação

```sh
node --test tests/cart.test.mjs
node --check docs/app.mjs
node --check docs/core.mjs
```

O fluxo foi verificado por testes da lógica, revisão estática e validação dos arquivos. A integração abre uma mensagem pronta; não valida estoque, preço nem recebimento pela loja. O carrinho foi também conferido na página pública, com inclusão, alteração de quantidades e prévia da mensagem. As fotografias são referências de produtos reais, sem garantir que esses modelos específicos estejam em estoque.

## Imagem de destaque

Criada com a ferramenta integrada de geração de imagem. Prompt: fotografia editorial de estúdio com dois smartphones sem marca, fones brancos e pedestal de grafite, fundo preto #0b0d11, iluminação lateral verde e bordas brancas, materiais realistas, composição de 1536 × 1024, sem texto, marcas ou promessas de estoque. Arquivo final: `docs/assets/hero.webp`.

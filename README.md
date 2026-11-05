# Benettiz Variedades — site

Next.js 16 + Tailwind 4 + Motion. Primeira tela: hero reativa ao scroll e vitrine de destaques
(trilho de produtos para a esquerda, categorias em vertical no sentido contrário).

```bash
npm install
npm run dev   # http://localhost:3000
```

## Fluxo de branches e deploy

- `dev`: trabalho do dia a dia. Cada push roda lint, typecheck e build.
- `main`: produção. Cada push (ou merge de `dev`) faz deploy automático em
  https://benettiz.vinnisantos.com.br

O deploy builda a imagem Docker ARM no GitHub Actions e envia para a VPS Oracle
(`/opt/stacks/benettiz`, porta local 3010, nginx + Let's Encrypt). A chave `DEPLOY_SSH_KEY`
só executa `/usr/local/bin/deploy-benettiz` no servidor.

## Imagens provisórias

As fotos em `public/products/` são de acervos abertos (créditos em `docs/image-credits.json`
e no rodapé). Trocar pelas fotos reais do catálogo antes do lançamento.

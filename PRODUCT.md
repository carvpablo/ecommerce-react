# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recrutadores técnicos, clientes em potencial e avaliadores explorando uma aplicação de e-commerce full-stack funcional de ponta a ponta (em português, Brasil / BRL).

## Product Purpose

A **E-Shop.** (`E-Shop Store`) é uma loja virtual de periféricos e itens de setup gamer/home office construída como projeto de portfólio full-stack. O objetivo é demonstrar um fluxo real e completo de e-commerce: catálogo com busca e filtro por categoria, página de detalhes do produto, autenticação de usuário, carrinho persistido no banco, checkout com Stripe e histórico de pedidos.

## Positioning

Diferente de lojas estáticas de portfólio que simulam apenas estado local, a E-Shop integra frontend React + Vite (Vercel) com backend Express + Prisma + PostgreSQL (Render), cookies `HttpOnly` JWT, estoque real no banco e webhooks da Stripe para criação automática de pedidos após confirmação do pagamento.

## Operating Context

- **Idioma e moeda:** Português (`pt-BR`) e Real brasileiro (`R$`, valores armazenados em centavos no banco).
- **Ambiente de pagamento:** Stripe Checkout em modo **sandbox/teste** (nenhum pagamento real é processado).
- **Hospedagem:** Frontend na Vercel (`https://ecommerce-react-eosin-eight.vercel.app`) e API Express + PostgreSQL no Render.

## Capabilities and Constraints

- **Catálogo e filtros:** Carregamento único via `ProductsContext` com busca em tempo real na barra de navegação e filtro por categoria (`ProductType`: `PERIFÉRICO`, `MONITOR`, `MOUSEPAD`, `CADEIRA`, `ACESSÓRIO`) combinados.
- **Autenticação:** Cadastro, login e logout via cookie `jwtToken` (`HttpOnly`, `sameSite: "none"`, `secure: true` em produção).
- **Carrinho e pedidos:** Adição/remoção/ajuste de quantidade persistidos via API; criação de pedido via transação Prisma (`createOrderForUser`) acionada pelo webhook `v1.checkout.session.completed` da Stripe, com decremento de estoque e limpeza do carrinho.
- **Restrição de dados:** Sem avaliações falsas, depoimentos fictícios ou métricas inventadas de vendas.

## Brand Commitments

- **Nome:** E-Shop. / E-Shop Store
- **Tom:** Claro, direto e confiável em português brasileiro.

## Evidence on Hand

- Catálogo inicial definido em `ecommerce-express/prisma/seed.js` com 8 produtos reais de demonstração e imagens locais em `react-frontend/public/images/products/`.
- Não há depoimentos de clientes, selos de certificação ou métricas reais de tráfego; futuras telas não devem fabricar esses elementos.

## Product Principles

- **Fluxo ponta a ponta real:** Toda ação visível (login, carrinho, checkout, pedido) reflete persistência real no PostgreSQL e na Stripe sandbox.
- **Clareza e velocidade de descoberta:** Busca na navbar e filtros por categoria funcionam juntos em memória sem latência extra.
- **Honestidade de portfólio:** Exibir dados e estados reais sem inventar provas sociais ou números fictícios.

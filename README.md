# E-Shop — Front-end (`react-frontend`)

Interface web da loja virtual **E-Shop.**, focada em periféricos e equipamentos para setup gamer e home office. Desenvolvida com **React 19**, **TypeScript**, **Vite**, **React Router 7** e **Tailwind CSS 4**.

---

## Tecnologias Principais

- **Biblioteca UI & Bundler:** React 19 + Vite 8 + TypeScript
- **Estilização:** Tailwind CSS 4 (`@tailwindcss/vite`) + ícones `lucide-react`
- **Roteamento:** React Router (`createBrowserRouter`, `NavLink`, `Loader`)
- **Formulários & Requisições HTTP:** `react-hook-form` + `axios` (`withCredentials: true` para cookies `HttpOnly`)
- **Gerenciamento de Estado:** React Context API (`AuthContext`, `ProductsContext`, `CartContext`, `OrderContext`)

---

## Funcionalidades

- **Catálogo com Busca e Filtro Combinados (`ProductsContext`):**
  - Carregamento único do catálogo em memória ao iniciar a aplicação;
  - Busca em tempo real por nome ou descrição na barra de navegação (com atalho `Esc` para limpar e redirecionamento automático para `/`);
  - Filtro por categoria (`Todos`, `Periféricos`, `Monitores`, `Mousepads`, `Cadeiras`, `Acessórios`) que exibe automaticamente apenas categorias com produtos cadastrados;
  - Aviso progressivo de *cold start* quando a API gratuita leva mais de 4 segundos para responder, além de tratamento de erros em português com botão de nova tentativa.
- **Página de Detalhes do Produto (`/products/:id`):**
  - Exibição de estoque disponível, descrição completa, seletor de quantidade respeitando o limite de estoque e adição direta ao carrinho.
- **Autenticação (`/login` e `/signin`):**
  - Cadastro, login e logout integrados com cookies `HttpOnly` da API e persistência de estado de sessão no `localStorage`.
- **Carrinho e Checkout Stripe (`/cart`):**
  - Controle de quantidade item a item, remoção de produtos, cálculo automático de subtotal/total e badge com contagem de itens na `NavBar`;
  - Integração com **Stripe Checkout** (modo teste/sandbox), incluindo instruções do cartão de teste (`4242 4242 4242 4242`) diretamente na tela de finalização.
- **Histórico e Detalhes de Pedidos (`/orders` e `/orders/:id`):**
  - Listagem dos pedidos confirmados pelo webhook da Stripe, com número do pedido, data, itens comprados e valor total.

---

## Estrutura de Pastas

```text
react-frontend/
├── public/
│   └── images/products/        # Fotos de estúdio dos 8 produtos do catálogo
├── src/
│   ├── components/
│   │   ├── auth/               # Telas de Login (LogIn.tsx) e Cadastro (SignIn.tsx)
│   │   ├── cart/               # Carrinho de compras e disparo do Stripe Checkout (Cart.tsx)
│   │   ├── order/              # Lista de pedidos (Orders.tsx) e detalhes (OrderDetails.tsx)
│   │   ├── About.tsx           # Página institucional sobre o projeto
│   │   ├── NavBar.tsx          # Cabeçalho responsivo com busca, navegação e badge do carrinho
│   │   ├── ProductDetails.tsx  # Página de detalhes do produto
│   │   └── Products.tsx        # Grid de cards de produtos
│   ├── config/
│   │   └── api.ts              # Configuração centralizada da URL da API (VITE_API_URL)
│   ├── context/
│   │   ├── AuthContext.tsx     # Estado de autenticação do usuário
│   │   ├── CartContext.tsx     # Sincronização e operações do carrinho
│   │   ├── OrderContext.tsx    # Consulta e criação de pedidos
│   │   └── ProductsContext.tsx # Catálogo global, busca por texto e filtro por categoria
│   ├── pages/
│   │   └── Home.tsx            # Página inicial do catálogo
│   ├── routes/
│   │   └── index.tsx           # Definição de rotas do React Router
│   └── utils/
│       └── productImages.ts    # Mapeamento entre nomes dos produtos e imagens locais
└── PRODUCT.md                  # Contexto de produto e diretrizes de UX
```

---

## Variáveis de Ambiente (`.env`)

O arquivo [`src/config/api.ts`](./src/config/api.ts) lê `VITE_API_URL` e usa `http://localhost:3000` como fallback local. Para apontar para outra URL, crie um `.env` na raiz de `react-frontend`:

```env
VITE_API_URL="http://localhost:3000"
```

Em produção (ex.: **Vercel**), configure `VITE_API_URL` nas *Environment Variables* do painel com a URL pública do backend no Render (ex.: `https://sua-api.onrender.com`).

---

## Como Rodar Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento do Vite:**
   ```bash
   npm run dev
   ```
   A aplicação abrirá em `http://localhost:5173`.

3. **Build de produção e checagem de tipos:**
   ```bash
   npm run build
   ```

# 🛍️ IF Retail — Frontend

Aplicação de e-commerce desenvolvida em **React** com **Tailwind CSS**, consumindo uma API REST construída com **Spring Boot**.

---

## 📋 Sobre o Projeto

O **IF Retail** é uma plataforma de e-commerce que oferece uma interface moderna e responsiva para navegação e compra de produtos. O frontend se comunica com um backend desenvolvido em Spring Boot, seguindo a arquitetura cliente-servidor.

A aplicação contempla dois fluxos principais:

- **Loja (cliente):** navegação de produtos, carrinho de compras, cadastro/login de cliente, perfil e finalização de pedidos.
- **Painel administrativo:** visão geral, gerenciamento de produtos (listar, cadastrar, editar) e acompanhamento de pedidos.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [React](https://react.dev/) | ^19.2.6 | Biblioteca de UI baseada em componentes |
| [Vite](https://vitejs.dev/) | ^8.0.12 | Bundler e servidor de desenvolvimento |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.3.0 | Estilização utility-first |
| [React Router DOM](https://reactrouter.com/) | ^7.17.0 | Roteamento e rotas aninhadas |
| [Axios](https://axios-http.com/) | ^1.18.0 | Cliente HTTP para consumo da API |
| [React Hook Form](https://react-hook-form.com/) | ^7.79.0 | Gerenciamento e validação de formulários |
| [ESLint](https://eslint.org/) | ^10.3.0 | Linting e qualidade de código |

> **Nota sobre gerenciamento de estado:** as dependências `@reduxjs/toolkit` e `react-redux` constam no `package.json`, mas **não estão em uso** no código atual. O estado global (carrinho de compras) é gerenciado via **Context API** (`src/context/CarrinhoContext.jsx`) com persistência em `localStorage`. Caso o Redux não venha a ser adotado, essas dependências podem ser removidas.

---

## 📁 Estrutura do Projeto

```
if-retail-frontend/
├── public/                     # Arquivos estáticos públicos (favicon, ícones)
├── src/
│   ├── components/             # Componentes reutilizáveis (Header, Footer, Button, etc.)
│   ├── context/                # Context API (CarrinhoContext)
│   ├── pages/                  # Páginas da aplicação
│   │   └── PainelAdmin/        # Subpáginas do painel administrativo
│   ├── services/               # Camada de integração com a API (axios)
│   ├── App.jsx                 # Componente raiz
│   ├── router.jsx              # Definição das rotas
│   └── main.jsx                # Ponto de entrada
├── index.html                  # HTML raiz
├── vite.config.js              # Configuração do Vite
├── eslint.config.js            # Configuração do ESLint
└── package.json                # Dependências e scripts
```

---

## 🗺️ Rotas da Aplicação

| Rota | Página | Descrição |
|---|---|---|
| `/` | Home | Página inicial da loja |
| `/produtos` | Produtos | Listagem de produtos (paginada) |
| `/carrinho` | Carrinho | Carrinho de compras |
| `/perfil` | Perfil | Perfil do cliente autenticado |
| `/login` | Login | Autenticação de usuário |
| `/cadastro` | Cadastro Cliente | Registro de novo cliente |
| `/painel` | Painel Admin | Layout do painel (rotas aninhadas) |
| `/painel` *(index)* | Visão Geral | Dashboard do administrador |
| `/painel/produtos` | Lista de Produtos | Gerenciamento de produtos |
| `/painel/produtos/novo` | Cadastro de Produto | Criação de produto |
| `/painel/produtos/:id/editar` | Edição de Produto | Edição de produto existente |
| `/painel/pedidos` | Lista de Pedidos | Acompanhamento de pedidos |

---

## 🔌 Camada de Serviços (Integração com a API)

A comunicação com o backend é centralizada em `src/services/`, usando uma instância única do Axios (`api.js`) com `baseURL` e `timeout` configurados. Cada serviço agrupa as chamadas por domínio:

| Serviço | Responsabilidade | Principais endpoints |
|---|---|---|
| `loginService` | Autenticação | `POST /auth/login` |
| `produtoService` | Produtos | `GET/POST/PUT/DELETE /produtos`, `POST /produtos/{id}/imagem` |
| `clienteService` | Clientes e favoritos | `GET/POST/PUT/DELETE /clientes`, favoritos, upload de imagem |
| `pedidoService` | Pedidos | listar/criar, `PATCH /pedidos/{id}/cancelar` e `/entregar` |
| `adminService` | Administradores | `GET/POST/PUT/DELETE /admins` |

> Endpoints de listagem (produtos e pedidos) utilizam **paginação** (`page`, `size`, `sort`). Atualizações de cliente e upload de imagens usam `multipart/form-data`.

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- API backend (Spring Boot) em execução

---

## 🔧 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/NycollasCaprini/if-retail-frontend.git
cd if-retail-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a URL da API

A URL base da API é definida em `src/services/api.js`. Por padrão, o frontend espera o backend Spring Boot em:

```
http://localhost:8080
```

Ajuste esse valor caso o backend esteja em outro endereço ou porta.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Gera o build de produção na pasta `dist/` |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint` | Executa o ESLint para verificar o código |

---

## 🔗 Repositório do Backend

Este projeto depende da API desenvolvida com Spring Boot. Consulte o repositório do backend para instruções de configuração e execução.

---

## 👥 Contribuidores

- [NycollasCaprini](https://github.com/NycollasCaprini)
- [LuizFKM](https://github.com/LuizFKM) — repositório original

---

## 📄 Licença

Este projeto é de uso acadêmico/educacional. Consulte os colaboradores para mais informações sobre uso e distribuição.

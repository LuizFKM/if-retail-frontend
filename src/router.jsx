import { createBrowserRouter } from "react-router-dom"
import { Home, Produtos, Login, CadastroCliente, PainelAdmin, Perfil, Carrinho } from './pages/index.js'
import PainelVisaoGeral from './pages/PainelAdmin/PainelVisaoGeral.jsx'
import ListaProdutos from './pages/PainelAdmin/ListaProdutos.jsx'
import CadastroProduto from './pages/PainelAdmin/CadastroProduto.jsx'
import ListaPedidos from './pages/PainelAdmin/ListaPedidos.jsx'

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/produtos", element: <Produtos /> },
  { path: "/carrinho", element: <Carrinho /> },
  { path: "/perfil", element: <Perfil /> },
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <CadastroCliente /> },
  {
    path: "/painel",
    element: <PainelAdmin />,
    children: [
      { index: true, element: <PainelVisaoGeral /> },
      { path: "produtos", element: <ListaProdutos /> },
      { path: "produtos/novo", element: <CadastroProduto /> },
      { path: "produtos/:id/editar", element: <CadastroProduto /> },
      { path: "pedidos", element: <ListaPedidos /> },
    ],
  },
])

export default router

import { Link, useNavigate } from "react-router-dom"
import { useCarrinho } from "../context/CarrinhoContext.jsx"

function MenuCliente() {
  const { totalItens } = useCarrinho()
  const navigate = useNavigate()
  const rawId = localStorage.getItem("clienteId")
  const clienteId = rawId && rawId !== "null" && rawId !== "undefined" ? rawId : null

  return (
    <div className="bg-sand-fundo-secundario flex justify-center shadow-lg">
      <nav className="container mx-auto py-4 flex justify-between items-center text-coffee-primaria font-medium">
        <div>
          <Link to="/" className="font-serif text-xl italic">IF-Retail</Link>
        </div>

        <ul className="flex items-center space-x-8 cursor-pointer">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/produtos">Produtos</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(clienteId ? "/carrinho" : "/login")}
            className="relative flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none"
          >
            <span className="text-xl">🛒</span>
            {totalItens > 0 && (
              <span className="absolute -top-2 -right-2 bg-coffee-primaria text-cream-fundo-alternativo text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItens}
              </span>
            )}
          </button>

          {clienteId ? (
            <Link
              to="/perfil"
              className="py-1 px-5 rounded-3xl bg-coffee-primaria text-cream-fundo-alternativo hover:shadow-lg transition-shadow"
            >
              Minha Conta
            </Link>
          ) : (
            <Link
              to="/login"
              className="py-1 px-5 rounded-3xl bg-coffee-primaria text-cream-fundo-alternativo hover:shadow-lg transition-shadow"
            >
              Entrar
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default MenuCliente

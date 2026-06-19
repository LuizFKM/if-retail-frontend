import { NavLink } from "react-router-dom"

// Aviso: o nome do arquivo "AdminSIdebar.jsx" tem um typo (I maiúsculo no meio).
// Não renomear para não quebrar o import em PainelAdmin.jsx.
function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-md text-sm font-medium transition-all ${
      isActive
        ? "bg-white text-coffee-primaria shadow-sm"
        : "text-ink-texto hover:bg-white hover:text-coffee-primaria hover:shadow-sm"
    }`

  return (
    <aside className="w-64 min-h-screen bg-cream-fundo-alternativo border-r border-amber-soft-secundario/30 flex flex-col sticky top-0">
      <div className="p-6 border-b border-amber-soft-secundario/30">
        <h2 className="font-serif text-2xl text-coffee-primaria italic">Painel Admin</h2>
        <p className="text-xs text-ink-texto mt-1">Gestão da Loja</p>
      </div>

      <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
        <p className="px-4 text-xs font-bold text-coffee-primaria/60 uppercase tracking-wider mb-2">
          Catálogo
        </p>

        <NavLink to="/painel/produtos/novo" className={linkClass}>
          <span className="mr-3 text-amber-soft-secundario text-lg">+</span>
          Cadastrar Produto
        </NavLink>

        <NavLink to="/painel/produtos" end className={linkClass}>
          <span className="mr-3 text-amber-soft-secundario text-lg">📦</span>
          Visualizar Produtos
        </NavLink>

        <p className="px-4 text-xs font-bold text-coffee-primaria/60 uppercase tracking-wider mb-2 mt-4">
          Vendas
        </p>

        <NavLink to="/painel/pedidos" className={linkClass}>
          <span className="mr-3 text-amber-soft-secundario text-lg">🛒</span>
          Visualizar Pedidos
        </NavLink>
      </nav>

      <div className="p-4 border-t border-amber-soft-secundario/30">
        <button className="w-full flex items-center justify-center px-4 py-2 border border-coffee-deep-sombras text-coffee-primaria rounded-md hover:bg-coffee-primaria hover:text-cream-fundo-alternativo transition-colors text-sm font-medium cursor-pointer">
          Sair do Painel
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar

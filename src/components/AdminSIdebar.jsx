function AdminSidebar() {
    return (
        <aside className="w-64 min-h-screen bg-cream-fundo-alternativo border-r border-amber-soft-secundario/30 flex flex-col sticky top-0">
            {/* Cabeçalho do Menu */}
            <div className="p-6 border-b border-amber-soft-secundario/30">
                <h2 className="font-serif text-2xl text-coffee-primaria italic">Painel Admin</h2>
                <p className="text-xs text-ink-texto mt-1">Gestão da Loja</p>
            </div>

            {/* Links de Navegação */}
            <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
                <p className="px-4 text-xs font-bold text-coffee-primaria/60 uppercase tracking-wider mb-2">
                    Catálogo
                </p>

                {/* Dica: Futuramente, troque a tag <a> pelo <Link> do seu router */}
                <a
                    href="/admin/produtos/novo"
                    className="flex items-center px-4 py-3 rounded-md text-sm font-medium text-ink-texto hover:bg-white hover:text-coffee-primaria hover:shadow-sm transition-all"
                >
                    <span className="mr-3 text-amber-soft-secundario text-lg">+</span>
                    Cadastrar Produto
                </a>

                <a
                    href="/admin/produtos"
                    className="flex items-center px-4 py-3 rounded-md text-sm font-medium text-ink-texto hover:bg-white hover:text-coffee-primaria hover:shadow-sm transition-all"
                >
                    <span className="mr-3 text-amber-soft-secundario text-lg">📦</span>
                    Visualizar Produtos
                </a>

                <p className="px-4 text-xs font-bold text-coffee-primaria/60 uppercase tracking-wider mb-2 mt-4">
                    Vendas
                </p>

                <a
                    href="/admin/pedidos"
                    className="flex items-center px-4 py-3 rounded-md text-sm font-medium text-ink-texto hover:bg-white hover:text-coffee-primaria hover:shadow-sm transition-all"
                >
                    <span className="mr-3 text-amber-soft-secundario text-lg">🛒</span>
                    Visualizar Pedidos
                </a>
            </nav>

            {/* Rodapé do Menu (Botão de Sair) */}
            <div className="p-4 border-t border-amber-soft-secundario/30">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-coffee-deep-sombras text-coffee-primaria rounded-md hover:bg-coffee-primaria hover:text-cream-fundo-alternativo transition-colors text-sm font-medium cursor-pointer">
                    Sair do Painel
                </button>
            </div>
        </aside>
    );
}

export default AdminSidebar;
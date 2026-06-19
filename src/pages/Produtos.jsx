import { useEffect, useState } from "react"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import MiniCard from "../components/MiniCard.jsx"
import produtoService from "../services/produtoService.js"

function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [pagina, setPagina] = useState(0)
  const [totalPaginas, setTotalPaginas] = useState(1)

  useEffect(() => {
    setCarregando(true)
    produtoService.listarTodos(pagina, 12)
      .then(data => {
        setProdutos(data.content ?? data)
        setTotalPaginas(data.totalPages ?? 1)
      })
      .catch(() => alert("Erro ao carregar produtos"))
      .finally(() => setCarregando(false))
  }, [pagina])

  return (
    <div className="min-h-screen bg-paper-fundo-principal flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="font-serif text-4xl text-coffee-primaria mb-2">Produtos</h1>
            <p className="text-ink-texto">Explore nossa coleção completa.</p>
          </div>

          {carregando ? (
            <p className="text-center text-ink-texto py-20">Carregando produtos...</p>
          ) : produtos.length === 0 ? (
            <p className="text-center text-ink-texto/60 py-20">
              Nenhum produto disponível no momento.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {produtos.map(produto => (
                  <MiniCard
                    key={produto.id}
                    produto={produto}
                    showFavoritar
                    className="flex flex-col w-full"
                  />
                ))}
              </div>

              {totalPaginas > 1 && (
                <div className="flex items-center justify-center gap-3 mt-10">
                  <button
                    onClick={() => setPagina(p => Math.max(0, p - 1))}
                    disabled={pagina === 0}
                    className="px-4 py-2 rounded-md border border-line-bordas text-coffee-primaria hover:bg-cream-fundo-alternativo transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    Anterior
                  </button>
                  <span className="text-ink-texto text-sm">
                    Página {pagina + 1} de {totalPaginas}
                  </span>
                  <button
                    onClick={() => setPagina(p => Math.min(totalPaginas - 1, p + 1))}
                    disabled={pagina >= totalPaginas - 1}
                    className="px-4 py-2 rounded-md border border-line-bordas text-coffee-primaria hover:bg-cream-fundo-alternativo transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Produtos

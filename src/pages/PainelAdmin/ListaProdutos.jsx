import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import produtoService from "../../services/produtoService"

const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function ListaProdutos() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [pagina, setPagina] = useState(0)
  const [totalPaginas, setTotalPaginas] = useState(1)

  async function carregar(p = 0) {
    setCarregando(true)
    try {
      const data = await produtoService.listarTodos(p, 10)
      setProdutos(data.content ?? data)
      setTotalPaginas(data.totalPages ?? 1)
    } catch {
      alert("Erro ao carregar produtos")
    } finally {
      setCarregando(false)
    }
  }

  async function remover(id) {
    if (!confirm("Remover este produto?")) return
    try {
      await produtoService.remover(id)
      carregar(pagina)
    } catch {
      alert("Erro ao remover produto")
    }
  }

  useEffect(() => { carregar(pagina) }, [pagina])

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl text-coffee-primaria">Produtos</h1>
        <Link
          to="/painel/produtos/novo"
          className="bg-coffee-primaria text-cream-fundo-alternativo px-5 py-2 rounded-md hover:opacity-90 transition-opacity font-medium text-sm"
        >
          + Novo Produto
        </Link>
      </div>

      {carregando ? (
        <p className="text-ink-texto">Carregando...</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-line-bordas overflow-x-auto">
          <table className="w-full text-sm text-ink-texto">
            <thead className="bg-cream-fundo-alternativo text-coffee-primaria border-b border-line-bordas">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Foto</th>
                <th className="px-4 py-3 text-left">Descrição</th>
                <th className="px-4 py-3 text-center">Qtd.</th>
                <th className="px-4 py-3 text-right">Preço Unit.</th>
                <th className="px-4 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-ink-texto/50">
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              ) : (
                produtos.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-sand-fundo-secundario"}>
                    <td className="px-4 py-3">{p.id}</td>
                    <td className="px-4 py-3">
                      <img
                        src={p.urlFotoProduto || "https://placehold.co/60x60"}
                        alt={p.descricao}
                        className="w-14 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 max-w-xs">{p.descricao}</td>
                    <td className="px-4 py-3 text-center">{p.quantidadeEmEstoque}</td>
                    <td className="px-4 py-3 text-right font-medium text-amber-soft-secundario">
                      {fmt.format(p.precoUnitario)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/painel/produtos/${p.id}/editar`}
                          className="px-3 py-1 border border-amber-soft-secundario text-amber-soft-secundario rounded hover:bg-amber-soft-secundario hover:text-white transition-colors text-xs"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => remover(p.id)}
                          className="px-3 py-1 border border-red-400 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors text-xs cursor-pointer"
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setPagina(p => Math.max(0, p - 1))}
            disabled={pagina === 0}
            className="px-4 py-2 rounded border border-line-bordas text-coffee-primaria text-sm hover:bg-cream-fundo-alternativo disabled:opacity-40 cursor-pointer"
          >
            Anterior
          </button>
          <span className="text-sm text-ink-texto">{pagina + 1} / {totalPaginas}</span>
          <button
            onClick={() => setPagina(p => Math.min(totalPaginas - 1, p + 1))}
            disabled={pagina >= totalPaginas - 1}
            className="px-4 py-2 rounded border border-line-bordas text-coffee-primaria text-sm hover:bg-cream-fundo-alternativo disabled:opacity-40 cursor-pointer"
          >
            Próxima
          </button>
        </div>
      )}
    </>
  )
}

export default ListaProdutos

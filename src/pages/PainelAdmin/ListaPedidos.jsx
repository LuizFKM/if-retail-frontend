import { useEffect, useState } from "react"
import pedidoService from "../../services/pedidoService"

function ListaPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [pagina, setPagina] = useState(0)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [atualizando, setAtualizando] = useState(null)

  function carregar(pag) {
    setCarregando(true)
    pedidoService.listarTodos(pag, 10)
      .then(data => { setPedidos(data.content ?? data); setTotalPaginas(data.totalPages ?? 1) })
      .catch(() => alert("Erro ao carregar pedidos"))
      .finally(() => setCarregando(false))
  }

  useEffect(() => { carregar(pagina) }, [pagina])

  async function handleStatus(id, acao) {
    setAtualizando(id)
    try {
      if (acao === "entregar") await pedidoService.entregar(id)
      else await pedidoService.cancelar(id)
      carregar(pagina)
    } catch {
      alert("Erro ao atualizar pedido.")
    } finally {
      setAtualizando(null)
    }
  }

  return (
    <>
      <h1 className="font-serif text-3xl text-coffee-primaria mb-6">Pedidos</h1>

      {carregando ? (
        <p className="text-ink-texto">Carregando...</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-line-bordas overflow-x-auto">
            <table className="w-full text-sm text-ink-texto">
              <thead className="bg-cream-fundo-alternativo text-coffee-primaria border-b border-line-bordas">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Cliente</th>
                  <th className="px-4 py-3 text-center">Itens</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-ink-texto/50">
                      Nenhum pedido encontrado.
                    </td>
                  </tr>
                ) : pedidos.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-sand-fundo-secundario"}>
                    <td className="px-4 py-3">#{p.id}</td>
                    <td className="px-4 py-3">{p.cliente?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-center">{(p.itens ?? p.items ?? []).length}</td>
                    <td className="px-4 py-3 text-center">
                      {p.status === "ENVIADO" && <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Enviado</span>}
                      {p.status === "ENTREGUE" && <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Entregue</span>}
                      {p.status === "CANCELADO" && <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">Cancelado</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {p.status === "ENVIADO" && (
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleStatus(p.id, "entregar")} disabled={atualizando === p.id}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50">
                            Entregue
                          </button>
                          <button onClick={() => handleStatus(p.id, "cancelar")} disabled={atualizando === p.id}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50">
                            Cancelar
                          </button>
                        </div>
                      )}
                      {p.status !== "ENVIADO" && <span className="text-ink-texto/40 text-xs">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button onClick={() => setPagina(p => Math.max(0, p - 1))} disabled={pagina === 0}
                className="px-4 py-2 rounded border border-line-bordas text-coffee-primaria text-sm hover:bg-cream-fundo-alternativo disabled:opacity-40 cursor-pointer">
                Anterior
              </button>
              <span className="text-sm text-ink-texto">{pagina + 1} / {totalPaginas}</span>
              <button onClick={() => setPagina(p => Math.min(totalPaginas - 1, p + 1))} disabled={pagina >= totalPaginas - 1}
                className="px-4 py-2 rounded border border-line-bordas text-coffee-primaria text-sm hover:bg-cream-fundo-alternativo disabled:opacity-40 cursor-pointer">
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default ListaPedidos

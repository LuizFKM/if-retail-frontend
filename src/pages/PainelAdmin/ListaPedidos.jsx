import { useEffect, useState } from "react"
import pedidoService from "../../services/pedidoService"

function ListaPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    pedidoService.listarTodos()
      .then(setPedidos)
      .catch(() => alert("Erro ao carregar pedidos"))
      .finally(() => setCarregando(false))
  }, [])

  return (
    <>
      <h1 className="font-serif text-3xl text-coffee-primaria mb-6">Pedidos</h1>

      {carregando ? (
        <p className="text-ink-texto">Carregando...</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-line-bordas overflow-x-auto">
          <table className="w-full text-sm text-ink-texto">
            <thead className="bg-cream-fundo-alternativo text-coffee-primaria border-b border-line-bordas">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Cliente</th>
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Itens</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-ink-texto/50">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                pedidos.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-sand-fundo-secundario"}>
                    <td className="px-4 py-3">{p.id}</td>
                    <td className="px-4 py-3">{p.cliente?.name ?? "—"}</td>
                    <td className="px-4 py-3">
                      {p.dataDoPedido
                        ? new Date(p.dataDoPedido).toLocaleDateString('pt-BR')
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-cream-fundo-alternativo text-coffee-primaria">
                        {p.status ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">{p.itens?.length ?? 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default ListaPedidos

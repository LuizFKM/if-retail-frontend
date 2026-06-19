import { useNavigate } from "react-router-dom"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { useCarrinho } from "../context/CarrinhoContext.jsx"
import pedidoService from "../services/pedidoService.js"
import { useState } from "react"

function Carrinho() {
  const { itens, removerItem, atualizarQtd, limparCarrinho, total } = useCarrinho()
  const navigate = useNavigate()
  const [finalizando, setFinalizando] = useState(false)

  async function finalizarCompra() {
    const clienteId = localStorage.getItem("clienteId")
    if (!clienteId) {
      alert("Você precisa fazer login para finalizar a compra.")
      navigate("/login")
      return
    }
    if (itens.length === 0) {
      alert("Seu carrinho está vazio.")
      return
    }
    setFinalizando(true)
    try {
      const payload = {
        clienteId: Number(clienteId),
        itens: itens.map(i => ({ produtoId: i.id, quantidade: i.quantidade })),
      }
      await pedidoService.cadastrar(payload)
      limparCarrinho()
      alert("Pedido realizado com sucesso!")
      navigate("/perfil")
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Erro ao finalizar pedido"
      alert("Erro: " + msg)
    } finally {
      setFinalizando(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper-fundo-principal flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-8 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl text-coffee-primaria mb-8">Carrinho</h1>

          {itens.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink-texto/60 text-lg mb-6">Seu carrinho está vazio.</p>
              <button
                onClick={() => navigate("/produtos")}
                className="bg-coffee-primaria text-cream-fundo-alternativo px-6 py-2 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
              >
                Ver produtos
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-lg border border-line-bordas overflow-hidden">
                {itens.map((item, i) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-4 ${i > 0 ? "border-t border-line-bordas" : ""}`}
                  >
                    <img
                      src={item.urlFotoProduto || "https://placehold.co/80x80"}
                      alt={item.descricao}
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-coffee-primaria line-clamp-2">{item.descricao}</p>
                      <p className="text-amber-soft-secundario font-semibold text-sm mt-1">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.precoUnitario)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => atualizarQtd(item.id, item.quantidade - 1)}
                        className="w-7 h-7 rounded-full border border-line-bordas flex items-center justify-center hover:bg-cream-fundo-alternativo cursor-pointer font-bold"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantidade}</span>
                      <button
                        onClick={() => atualizarQtd(item.id, item.quantidade + 1)}
                        className="w-7 h-7 rounded-full border border-line-bordas flex items-center justify-center hover:bg-cream-fundo-alternativo cursor-pointer font-bold"
                      >
                        +
                      </button>
                    </div>
                    <p className="w-24 text-right font-semibold text-ink-texto text-sm">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.precoUnitario * item.quantidade)}
                    </p>
                    <button
                      onClick={() => removerItem(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors cursor-pointer ml-2"
                      title="Remover"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-cream-fundo-alternativo rounded-lg p-6 border border-line-bordas">
                <p className="text-xl font-serif text-coffee-primaria">
                  Total:{" "}
                  <span className="text-amber-soft-secundario font-bold">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                  </span>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/produtos")}
                    className="px-5 py-2 border border-coffee-primaria text-coffee-primaria rounded-md hover:bg-coffee-primaria hover:text-cream-fundo-alternativo transition-colors cursor-pointer"
                  >
                    Continuar comprando
                  </button>
                  <button
                    onClick={finalizarCompra}
                    disabled={finalizando}
                    className="px-5 py-2 bg-coffee-primaria text-cream-fundo-alternativo rounded-md hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                  >
                    {finalizando ? "Processando..." : "Finalizar Compra"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Carrinho

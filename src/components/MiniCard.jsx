import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCarrinho } from "../context/CarrinhoContext.jsx"
import api from "../services/api.js"

const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function MiniCard({ produto, imageSrc, title, price, estoque, showFavoritar, className }) {
  const { adicionarItem } = useCarrinho()
  const navigate = useNavigate()

  const src = produto?.urlFotoProduto || imageSrc
  const nome = produto?.descricao || title
  const preco = produto?.precoUnitario ?? price
  const qtdEstoque = produto?.quantidadeEmEstoque ?? estoque

  const [isFav, setIsFav] = useState(() => {
    if (!produto) return false
    try {
      return JSON.parse(localStorage.getItem("favoritosIds") || "[]").includes(produto.id)
    } catch { return false }
  })

  function getClienteId() {
    const id = localStorage.getItem("clienteId")
    return id && id !== "null" && id !== "undefined" ? id : null
  }

  function clearSession() {
    localStorage.removeItem("clienteId")
    localStorage.removeItem("favoritosIds")
    navigate("/login")
  }

  function handleAddCarrinho() {
    if (!getClienteId()) { navigate("/login"); return }
    if (!produto) return
    adicionarItem(produto)
  }

  async function handleFavoritar(e) {
    e.stopPropagation()
    const clienteId = getClienteId()
    if (!clienteId) { navigate("/login"); return }
    if (!produto) return
    try {
      const favs = JSON.parse(localStorage.getItem("favoritosIds") || "[]")
      if (isFav) {
        await api.delete(`/clientes/${clienteId}/favoritos/${produto.id}`)
        localStorage.setItem("favoritosIds", JSON.stringify(favs.filter(id => id !== produto.id)))
        setIsFav(false)
      } else {
        await api.post(`/clientes/${clienteId}/favoritos/${produto.id}`)
        localStorage.setItem("favoritosIds", JSON.stringify([...favs, produto.id]))
        setIsFav(true)
      }
    } catch (err) {
      const status = err?.response?.status
      if (status === 404 || status === 401 || status === 403) {
        clearSession()
      } else {
        alert("Erro ao atualizar favoritos.")
      }
    }
  }

  return (
    <article className={`bg-paper-fundo-principal flex flex-col p-3 m-2 rounded-md border border-solid border-paper-fundo-principal shadow-lg overflow-hidden h-full ${className || ''}`}>
      <div className="relative w-full shrink-0 rounded overflow-hidden mb-3">
        <figure className="w-full">
          <img
            src={src || "https://placehold.co/300x260"}
            alt={nome}
            className="max-h-[260px] w-full object-cover rounded"
            loading="lazy"
          />
        </figure>
        {showFavoritar && (
          <button
            type="button"
            onClick={handleFavoritar}
            title={isFav ? "Remover dos favoritos" : "Favoritar"}
            className="absolute top-2 right-2 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition-colors cursor-pointer text-base shadow"
          >
            {isFav ? "♥" : "♡"}
          </button>
        )}
      </div>

      <div className="flex flex-col flex-grow justify-between text-center gap-2">
        <div>
          <h3 className="text-sm font-medium text-coffee-primaria line-clamp-2" title={nome}>{nome}</h3>
          {qtdEstoque !== undefined && (
            <p className="text-xs text-ink-texto/60 mt-1">Estoque: {qtdEstoque}</p>
          )}
          <p className="text-sm font-semibold text-amber-soft-secundario mt-2">{fmt.format(preco)}</p>
        </div>
        <button
          onClick={handleAddCarrinho}
          disabled={!produto}
          className="mt-3 w-full bg-coffee-primaria text-cream-fundo-alternativo py-2 px-4 rounded hover:opacity-90 transition-opacity font-medium text-sm cursor-pointer disabled:opacity-50"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  )
}

export default MiniCard

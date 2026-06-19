import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import clienteService from "../services/clienteService.js"
import pedidoService from "../services/pedidoService.js"

function AbaCompras({ clienteId }) {
  const [pedidos, setPedidos] = useState([])
  const [pagina, setPagina] = useState(0)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [carregando, setCarregando] = useState(true)
  const [expandido, setExpandido] = useState(null)

  useEffect(() => {
    setCarregando(true)
    pedidoService.listarPorCliente(clienteId, pagina, 5)
      .then(data => {
        setPedidos(data.content ?? data)
        setTotalPaginas(data.totalPages ?? 1)
      })
      .catch(() => {})
      .finally(() => setCarregando(false))
  }, [clienteId, pagina])

  if (carregando) return <p className="text-ink-texto/60 py-8 text-center">Carregando pedidos...</p>
  if (pedidos.length === 0) return <p className="text-ink-texto/60 py-8 text-center">Você ainda não fez nenhum pedido.</p>

  return (
    <div className="flex flex-col gap-4">
      {pedidos.map(p => (
        <div key={p.id} className="border border-line-bordas rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandido(expandido === p.id ? null : p.id)}
            className="w-full flex items-center justify-between px-5 py-4 bg-cream-fundo-alternativo hover:bg-sand-fundo-secundario transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-4">
              <span className="font-semibold text-coffee-primaria">Pedido #{p.id}</span>
              {p.status === "ENVIADO" && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Enviado</span>}
              {p.status === "ENTREGUE" && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Entregue</span>}
              {p.status === "CANCELADO" && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">Cancelado</span>}
            </div>
            <span className="text-ink-texto/60 text-sm">{expandido === p.id ? "▲" : "▼"}</span>
          </button>

          {expandido === p.id && (
            <div className="p-4">
              <table className="w-full text-sm text-ink-texto">
                <thead className="text-coffee-primaria border-b border-line-bordas">
                  <tr>
                    <th className="text-left py-2">Produto</th>
                    <th className="text-center py-2">Qtd</th>
                    <th className="text-right py-2">Preço Unit.</th>
                    <th className="text-right py-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {(p.itens ?? p.items ?? []).map((item, i) => (
                    <tr key={i} className="border-b border-line-bordas/50 last:border-0">
                      <td className="py-2">{item.produto?.descricao ?? item.descricao ?? "—"}</td>
                      <td className="py-2 text-center">{item.quantidade}</td>
                      <td className="py-2 text-right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.produto?.precoUnitario ?? 0)}
                      </td>
                      <td className="py-2 text-right font-medium text-amber-soft-secundario">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((item.produto?.precoUnitario ?? 0) * item.quantidade)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setPagina(p => Math.max(0, p - 1))}
            disabled={pagina === 0}
            className="px-4 py-1.5 rounded border border-line-bordas text-coffee-primaria text-sm hover:bg-cream-fundo-alternativo disabled:opacity-40 cursor-pointer"
          >
            Anterior
          </button>
          <span className="text-sm text-ink-texto">{pagina + 1} / {totalPaginas}</span>
          <button
            onClick={() => setPagina(p => Math.min(totalPaginas - 1, p + 1))}
            disabled={pagina >= totalPaginas - 1}
            className="px-4 py-1.5 rounded border border-line-bordas text-coffee-primaria text-sm hover:bg-cream-fundo-alternativo disabled:opacity-40 cursor-pointer"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}

function AbaFavoritos({ clienteId, onAtualizado }) {
  const [favoritos, setFavoritos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

  useEffect(() => {
    clienteService.buscarId(clienteId)
      .then(c => {
        setFavoritos(c.favoritos ?? [])
        localStorage.setItem("favoritosIds", JSON.stringify((c.favoritos ?? []).map(f => f.id)))
      })
      .finally(() => setCarregando(false))
  }, [clienteId])

  async function remover(produtoId) {
    try {
      const atualizado = await clienteService.removerFavorito(clienteId, produtoId)
      setFavoritos(atualizado.favoritos ?? [])
      localStorage.setItem("favoritosIds", JSON.stringify((atualizado.favoritos ?? []).map(f => f.id)))
      onAtualizado(atualizado)
    } catch { alert("Erro ao remover favorito.") }
  }

  if (carregando) return <p className="text-ink-texto/60 py-8 text-center">Carregando...</p>

  return (
    <div>
      <h2 className="font-serif text-2xl text-coffee-primaria mb-4">Favoritos</h2>
      {favoritos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">🤍</p>
          <p className="text-ink-texto/60 mb-4">Nenhum produto favorito ainda.</p>
          <Link to="/produtos" className="bg-coffee-primaria text-cream-fundo-alternativo px-6 py-2 rounded-md hover:opacity-90 font-medium text-sm">
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favoritos.map(p => (
            <div key={p.id} className="bg-white border border-line-bordas rounded-lg p-3 flex gap-3 items-center">
              <img src={p.urlFotoProduto || "https://placehold.co/60x60"} alt={p.descricao}
                className="w-14 h-14 rounded object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-coffee-primaria line-clamp-2">{p.descricao}</p>
                <p className="text-xs text-amber-soft-secundario font-semibold mt-0.5">{fmt.format(p.precoUnitario)}</p>
              </div>
              <button onClick={() => remover(p.id)}
                className="text-red-400 hover:text-red-600 cursor-pointer text-lg flex-shrink-0" title="Remover favorito">♥</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AbaConfiguracoes({ cliente, onAtualizado, onExcluir }) {
  const fotoRef = useRef(null)
  const [salvando, setSalvando] = useState(false)
  const [form, setForm] = useState({
    name: cliente?.name ?? "",
    password: "",
    rua: cliente?.endereco?.rua ?? "",
    cidade: cliente?.endereco?.cidade ?? "",
    estado: cliente?.endereco?.estado ?? "",
    cep: cliente?.endereco?.cep ?? "",
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleFoto(e) {
    const file = e.target.files[0]
    if (!file) return
    try {
      const atualizado = await clienteService.uploadFoto(cliente.id, file)
      onAtualizado(atualizado)
    } catch {
      alert("Erro ao enviar foto.")
    }
  }

  async function handleSalvar(e) {
    e.preventDefault()
    setSalvando(true)
    try {
      const dados = {
        name: form.name,
        password: form.password || undefined,
        endereco: {
          rua: form.rua,
          cidade: form.cidade,
          estado: form.estado,
          cep: form.cep,
        },
      }
      const atualizado = await clienteService.atualizar(cliente.id, dados, null)
      onAtualizado(atualizado)
      alert("Dados atualizados!")
    } catch {
      alert("Erro ao atualizar dados.")
    } finally {
      setSalvando(false)
    }
  }

  const inputClass = "w-full px-3 py-2 border border-line-bordas rounded-md bg-paper-fundo-principal text-ink-texto focus:outline-none focus:border-amber-soft-secundario transition-colors text-sm"
  const labelClass = "block text-xs font-medium text-coffee-primaria mb-1"

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fotoRef.current.click()}
          className="rounded-full overflow-hidden border-2 border-amber-soft-secundario w-20 h-20 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          title="Clique para trocar foto"
        >
          <img
            src={cliente?.urlFotoPerfil || "https://placehold.co/80x80?text=Foto"}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        </button>
        <input ref={fotoRef} type="file" accept="image/*" className="hidden" onChange={handleFoto} />
        <div>
          <p className="text-sm font-medium text-coffee-primaria">{cliente?.name}</p>
          <p className="text-xs text-ink-texto/60">Clique na foto para alterar</p>
        </div>
      </div>

      <form onSubmit={handleSalvar} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Nome</label>
          <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Nova senha (deixe em branco para manter)</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className={inputClass} placeholder="••••••••" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Rua</label>
            <input name="rua" value={form.rua} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Cidade</label>
            <input name="cidade" value={form.cidade} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Estado</label>
            <input name="estado" value={form.estado} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>CEP</label>
            <input name="cep" value={form.cep} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <button
          type="submit"
          disabled={salvando}
          className="self-start bg-coffee-primaria text-cream-fundo-alternativo px-6 py-2 rounded-md hover:opacity-90 transition-opacity text-sm font-medium cursor-pointer disabled:opacity-50"
        >
          {salvando ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>

      <div className="border-t border-red-200 pt-6">
        <p className="text-sm font-semibold text-red-600 mb-2">Zona de Perigo</p>
        <button
          onClick={onExcluir}
          className="px-4 py-2 border border-red-400 text-red-500 rounded-md hover:bg-red-50 transition-colors text-sm cursor-pointer"
        >
          Excluir conta
        </button>
      </div>
    </div>
  )
}

const ABAS = ["Compras", "Favoritos", "Configurações"]

function Perfil() {
  const navigate = useNavigate()
  const rawId = localStorage.getItem("clienteId")
  const clienteId = rawId && rawId !== "null" && rawId !== "undefined" ? rawId : null
  const [cliente, setCliente] = useState(null)
  const [aba, setAba] = useState("Compras")
  const [carregando, setCarregando] = useState(true)

  function clearSession() {
    localStorage.removeItem("clienteId")
    localStorage.removeItem("favoritosIds")
    navigate("/login")
  }

  useEffect(() => {
    if (!clienteId) {
      navigate("/login")
      return
    }
    clienteService.buscarId(clienteId)
      .then(setCliente)
      .catch(err => {
        const status = err?.response?.status
        if (status === 404 || status === 401 || status === 403) {
          clearSession()
        } else {
          alert("Erro ao carregar perfil.")
        }
      })
      .finally(() => setCarregando(false))
  }, [clienteId, navigate])

  async function handleExcluir() {
    if (!confirm("Tem certeza que deseja excluir sua conta?")) return
    try {
      await clienteService.remover(clienteId)
      clearSession()
    } catch {
      alert("Erro ao excluir conta.")
    }
  }

  if (carregando || !cliente) {
    return (
      <div className="min-h-screen bg-paper-fundo-principal flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-ink-texto/60">Carregando perfil...</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper-fundo-principal flex flex-col">
      <Header />

      <div className="bg-cream-fundo-alternativo border-b border-line-bordas">
        <div className="max-w-5xl mx-auto px-8 py-8 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-soft-secundario flex-shrink-0">
            <img
              src={cliente.urlFotoPerfil || "https://placehold.co/80x80?text=Foto"}
              alt={cliente.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="font-serif text-3xl text-coffee-primaria">{cliente.name}</h1>
            {cliente.contatoList?.[0]?.email && (
              <span className="inline-block mt-1 bg-amber-soft-secundario/20 text-amber-soft-secundario text-xs px-3 py-1 rounded-full">
                {cliente.contatoList[0].email}
              </span>
            )}
          </div>
          <button
            onClick={() => { localStorage.removeItem("clienteId"); navigate("/") }}
            className="px-4 py-2 border border-coffee-primaria text-coffee-primaria rounded-md hover:bg-coffee-primaria hover:text-cream-fundo-alternativo transition-colors text-sm font-medium cursor-pointer"
          >
            Sair
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-8">
        <div className="flex gap-1 mb-8 border-b border-line-bordas">
          {ABAS.map(a => (
            <button
              key={a}
              onClick={() => setAba(a)}
              className={`px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer -mb-px border-b-2 ${
                aba === a
                  ? "border-coffee-primaria text-coffee-primaria"
                  : "border-transparent text-ink-texto/60 hover:text-coffee-primaria"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        {aba === "Compras" && <AbaCompras clienteId={clienteId} />}
        {aba === "Favoritos" && <AbaFavoritos clienteId={clienteId} onAtualizado={setCliente} />}
        {aba === "Configurações" && (
          <AbaConfiguracoes
            cliente={cliente}
            onAtualizado={setCliente}
            onExcluir={handleExcluir}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Perfil

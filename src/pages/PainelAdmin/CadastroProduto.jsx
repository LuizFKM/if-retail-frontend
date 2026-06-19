import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import produtoService from "../../services/produtoService"

function CadastroProduto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const [arquivo, setArquivo] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("https://placehold.co/200x200?text=Foto")
  const [salvando, setSalvando] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (!id) return
    produtoService.buscarId(id)
      .then(produto => {
        reset({
          descricao: produto.descricao,
          precoUnitario: produto.precoUnitario,
          quantidadeEmEstoque: produto.quantidadeEmEstoque,
        })
        if (produto.urlFotoProduto) setPreviewUrl(produto.urlFotoProduto)
      })
      .catch(() => alert("Erro ao carregar produto"))
  }, [id, reset])

  function selecionarArquivo(e) {
    const file = e.target.files[0]
    if (!file) return
    setArquivo(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  async function onSubmit(data) {
    setSalvando(true)
    try {
      const payload = {
        descricao: data.descricao,
        precoUnitario: parseFloat(data.precoUnitario),
        quantidadeEmEstoque: parseInt(data.quantidadeEmEstoque, 10),
      }

      const produtoSalvo = id
        ? await produtoService.atualizar(id, payload)
        : await produtoService.cadastrar(payload)

      if (arquivo) {
        await produtoService.enviarImagem(produtoSalvo.id, arquivo)
      }

      navigate("/painel/produtos")
    } catch (err) {
      const msg = err?.response?.data?.message
        || (typeof err?.response?.data === "string" ? err.response.data : null)
        || err?.message
        || "Erro desconhecido"
      alert("Erro ao salvar produto:\n" + msg)
    } finally {
      setSalvando(false)
    }
  }

  const inputClass =
    "w-full px-3 py-2 border border-line-bordas rounded-md bg-paper-fundo-principal text-ink-texto focus:outline-none focus:border-amber-soft-secundario transition-colors"
  const labelClass = "block text-sm font-medium text-coffee-primaria mb-1"

  return (
    <>
      <h1 className="font-serif text-3xl text-coffee-primaria mb-6">
        {id ? "Editar Produto" : "Novo Produto"}
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-line-bordas p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

          {/* Upload de Foto — clique na imagem para selecionar arquivo */}
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => fileRef.current.click()}
              className="cursor-pointer rounded-lg border-2 border-dashed border-line-bordas hover:border-amber-soft-secundario transition-colors overflow-hidden"
              title="Clique para selecionar foto"
            >
              <img src={previewUrl} alt="Foto do produto" className="w-48 h-48 object-cover" />
            </button>
            <p className="text-xs text-ink-texto/60">Clique na imagem para selecionar foto</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={selecionarArquivo}
            />
          </div>

          {/* Descrição */}
          <div>
            <label className={labelClass}>Descrição *</label>
            <input
              className={inputClass}
              {...register("descricao", { required: "Descrição é obrigatória" })}
            />
            {errors.descricao && (
              <span className="text-red-500 text-xs">{errors.descricao.message}</span>
            )}
          </div>

          {/* Preço e Quantidade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Preço Unitário (R$) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className={inputClass}
                {...register("precoUnitario", {
                  required: "Preço é obrigatório",
                  min: { value: 0, message: "Preço deve ser positivo" },
                })}
              />
              {errors.precoUnitario && (
                <span className="text-red-500 text-xs">{errors.precoUnitario.message}</span>
              )}
            </div>

            <div>
              <label className={labelClass}>Quantidade em Estoque *</label>
              <input
                type="number"
                min="0"
                className={inputClass}
                {...register("quantidadeEmEstoque", {
                  required: "Quantidade é obrigatória",
                  min: { value: 0, message: "Quantidade deve ser positiva" },
                })}
              />
              {errors.quantidadeEmEstoque && (
                <span className="text-red-500 text-xs">{errors.quantidadeEmEstoque.message}</span>
              )}
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={salvando}
              className="bg-coffee-primaria text-cream-fundo-alternativo px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium cursor-pointer disabled:opacity-50"
            >
              {salvando ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/painel/produtos")}
              className="border border-coffee-primaria text-coffee-primaria px-6 py-2 rounded-md hover:bg-coffee-primaria hover:text-cream-fundo-alternativo transition-colors font-medium cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CadastroProduto

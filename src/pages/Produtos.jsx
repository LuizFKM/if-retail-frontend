import { useEffect, useState } from "react"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import MiniCard from "../components/MiniCard.jsx"
import produtoService from "../services/produtoService.js"

// AVISO: os botões "Adicionar ao carrinho" e "Favoritar" são visuais (placeholders).
// O back-end ainda não expõe endpoints de carrinho/favoritos.
// Para implementar de verdade, avise para criarmos o slice Redux e os endpoints correspondentes.

function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    produtoService.listarTodos()
      .then(setProdutos)
      .catch(() => alert("Erro ao carregar produtos"))
      .finally(() => setCarregando(false))
  }, [])

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {produtos.map(produto => (
                <MiniCard
                  key={produto.id}
                  imageSrc={produto.urlFotoProduto}
                  title={produto.descricao}
                  price={produto.precoUnitario}
                  estoque={produto.quantidadeEmEstoque}
                  showFavoritar
                  className="flex flex-col w-full"
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Produtos

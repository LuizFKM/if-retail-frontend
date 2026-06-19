import { createContext, useContext, useState, useEffect } from "react"

const CarrinhoContext = createContext(null)

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("carrinho") || "[]")
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens))
  }, [itens])

  function adicionarItem(produto) {
    setItens(prev => {
      const existente = prev.find(i => i.id === produto.id)
      if (existente) {
        return prev.map(i =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        )
      }
      return [...prev, { ...produto, quantidade: 1 }]
    })
  }

  function removerItem(id) {
    setItens(prev => prev.filter(i => i.id !== id))
  }

  function atualizarQtd(id, quantidade) {
    if (quantidade <= 0) {
      removerItem(id)
      return
    }
    setItens(prev => prev.map(i => i.id === id ? { ...i, quantidade } : i))
  }

  function limparCarrinho() {
    setItens([])
  }

  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0)
  const total = itens.reduce((acc, i) => acc + i.precoUnitario * i.quantidade, 0)

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarItem, removerItem, atualizarQtd, limparCarrinho, totalItens, total }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext)
  if (!ctx) throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider")
  return ctx
}

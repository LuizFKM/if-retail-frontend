// showFavoritar e estoque são opcionais — não passá-los não quebra os usos existentes
// (CarrosselProdutos e Section não os usam)
function MiniCard({ imageSrc, title, price, estoque, showFavoritar, className }) {
  return (
    <article className={`bg-paper-fundo-principal flex flex-col p-3 m-2 rounded-md border border-solid border-paper-fundo-principal shadow-lg overflow-hidden h-full ${className || ''}`}>

      <div className="relative w-full shrink-0 rounded overflow-hidden mb-3">
        <figure className="w-full">
          <img
            src={imageSrc || "https://placehold.co/300x260"}
            alt={title}
            className="max-h-[260px] w-full object-cover rounded"
            loading="lazy"
          />
        </figure>

        {/* placeholder — favoritar depende de implementação futura no back-end */}
        {showFavoritar && (
          <button
            type="button"
            title="Favoritar"
            className="absolute top-2 right-2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition-colors cursor-pointer text-base"
            aria-label="Favoritar produto"
          >
            ♡
          </button>
        )}
      </div>

      <div className="flex flex-col flex-grow justify-between text-center gap-2">
        <div>
          <h3 className="text-sm font-medium text-coffee-primaria line-clamp-2" title={title}>
            {title}
          </h3>
          {estoque !== undefined && (
            <p className="text-xs text-ink-texto/60 mt-1">Estoque: {estoque}</p>
          )}
          {/* preço em âmbar — fiel à paleta do projeto PHP de referência */}
          <p className="text-sm font-semibold text-amber-soft-secundario mt-2">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
          </p>
        </div>

        {/* placeholder — botão sem back-end de carrinho por enquanto */}
        <button className="mt-3 w-full bg-coffee-primaria text-cream-fundo-alternativo py-2 px-4 rounded hover:opacity-90 transition-opacity font-medium text-sm cursor-pointer">
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  )
}

export default MiniCard

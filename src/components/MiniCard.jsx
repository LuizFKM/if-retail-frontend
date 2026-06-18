function MiniCard({ imageSrc, title, price, className }) {
    return (
        // Removido o w-max e adicionado w-full para respeitar o espaço do carrossel/grid
        // Adicionado overflow-hidden para garantir que nada saia do card
        <article className={`bg-paper-fundo-principal flex flex-col p-3 m-2 rounded-md border border-solid border-paper-fundo-principal shadow-lg overflow-hidden h-full ${className || ''}`}>

            <figure className="w-full shrink-0 rounded overflow-hidden mb-3">
                <img
                    src={imageSrc}
                    alt={title}
                    className="max-h-[260px] w-full object-cover rounded"
                    loading="lazy"
                />
            </figure>


            <div className="flex flex-col flex-grow justify-between text-center gap-2">
                <div>

                    <h3 className="text-sm font-medium text-coffee-primaria line-clamp-2" title={title}>
                        {title}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-600 mt-2">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
                    </p>
                </div>

                <button className="mt-3 w-full bg-coffee-primaria text-cream-fundo-alternativo py-2 px-4 rounded hover:opacity-90 transition-opacity font-medium text-sm cursor-pointer">
                    Adicionar ao carrinho
                </button>
            </div>
        </article>
    );
}

export default MiniCard;
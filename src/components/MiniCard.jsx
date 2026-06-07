function MiniCard({ imageSrc, title, price, className }) {
    return (
        <article className={`flex items-center w-max flex-shrink-0 rounded-[6px] border border-solid border-cream-fundo-alternativo shadow-sm ${className || ''}`}>
            <figure className="h-full flex-shrink-0  rounded bg-gray-100 pb-3">
                <img
                    src={imageSrc}
                    alt={title}
                    className="h-full"
                    loading="lazy"
                />
            </figure>

            <div className="flex flex-col justify-center whitespace-nowrap text-center">
                <h3 className="text-sm font-medium text-coffee-primaria">{title}</h3>
                <p className="text-sm font-semibold text-emerald-600">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
                </p>
            </div>
        </article>
    );
}export default MiniCard;
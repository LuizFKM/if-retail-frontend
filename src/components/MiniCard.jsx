function MiniCard({ imageSrc, title, price, className }) {
    return (
        <article className={`bg-paper-fundo-principal flex items-center w-max p-1 m-2 rounded-md border border-solid border-paper-fundo-principal shadow-lg ${className || ''}`}>
            <figure className="h-full shrink-0  rounded pb-3">
                <img
                    src={imageSrc}
                    alt={title}
                    className="h-full"
                    loading="lazy"
                />
            </figure>

            <div className="flex flex-col justify-center whitespace-nowrap text-center pb-3">
                <h3 className="text-sm font-medium text-coffee-primaria">{title}</h3>
                <p className="text-sm font-semibold text-emerald-600">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
                </p>
            </div>
        </article>
    );
}export default MiniCard;
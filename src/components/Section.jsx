import MiniCard from "./MiniCard.jsx";

function Destaques({ produtos = [] }) {
    const produtosEmDestaque = produtos.slice(0, 3);

    return (

        <section className="bg-amber-soft-secundario py-16 px-8 md:px-20">
            <div className="max-w-6xl mx-auto flex flex-col items-center">

                {/* Título da Seção */}
                <div className="text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl text-coffee-primaria mb-4">
                        Destaques
                    </h2>
                    <p className="text-ink-texto text-lg max-w-2xl mx-auto">
                        Seleção exclusiva com as peças mais desejadas do momento.
                    </p>
                </div>

                {/* Grid para os 3 MiniCards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-items-center">
                    {produtosEmDestaque.map((produto) => (
                        <div key={produto.id} className="w-full max-w-sm flex justify-center">
                            <MiniCard
                                imageSrc={produto.urlFotoProduto}
                                title={produto.descricao}
                                price={produto.precoUnitario}
                                // flex-col garante que a imagem fique em cima e o texto embaixo no card
                                className="flex flex-col w-full"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Destaques;
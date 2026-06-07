import Tag from "./Tag.jsx";
import Button from "./Button.jsx";
import MiniCard from "./MiniCard.jsx";
import CarrosselProdutos from "./CarrosselProdutos.jsx";

function Hero(props){
    return(
        <section className="bg-paper-fundo-principal w-full min-h-1/2 py-15 px-50">
            <div className="grid grid-cols-2 items-center gap-[60px]">
                <div className="flex flex-col">
                    <Tag className="bg-cream-fundo-alternativo border border-amber-soft-secundario text-amber-soft-secundario">Nova Coleção</Tag>
                    <h1 className="leading-tight font-serif text-7xl text-coffee-primaria mb-4 mt-4">Estilo que fala por <spam className="italic text-amber-soft-secundario">você</spam> </h1>
                    <p className="text-ink-texto leading-relaxed pb-3">
                        Peças selecionadas com qualidade premium, entrega rápida e experiência de compra incomparável.
                    </p>
                    <div className="flex justify-start gap-3.5 mt-3">
                        <Button className="bg-coffee-primaria text-cream-fundo-alternativo py-2">Explorar Coleção</Button>
                        <Button className="bg-paper-fundo-principal border border-coffee-deep-sombras py-2">Ver Ofertas</Button>
                    </div>
                </div>
                <div>
                    <CarrosselProdutos/>
                </div>
            </div>
        </section>
    )
}

export default Hero;
import { useRef } from 'react';
import MiniCard from "./MiniCard.jsx";

function CarrosselProdutos({ produtos = [] }) {
    const carrosselRef = useRef(null);

    const scroll = (direction) => {
        if (carrosselRef.current) {
            const { scrollLeft, clientWidth } = carrosselRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            carrosselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (produtos.length === 0) {
        return <p className="text-center">Nenhum produto disponível no momento.</p>;
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-8 group">
            {/* Botão Esquerdo */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Rolar para esquerda"
            >
                ❮
            </button>


            <div
                ref={carrosselRef}
                className="flex items-stretch w-full gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth py-4 px-2"
            >
                {produtos.map((produto) => (
                    <div key={produto.id} className="snap-center shrink-0 w-[85%] sm:w-[320px]">
                        <MiniCard
                            produto={produto}
                            showFavoritar
                            className="h-full"
                        />
                    </div>
                ))}
            </div>

            {/* Botão Direito */}
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Rolar para direita"
            >
                ❯
            </button>
        </div>
    );
}

export default CarrosselProdutos;
import { useRef } from 'react';
import MiniCard from "./MiniCard.jsx";

function CarrosselProdutos() {
    // Referência para controlar o scroll do container via botões
    const carrosselRef = useRef(null);

    // Dados fictícios dos seus mini cards
    const produtos = [
        { id: 1, title: "Tênis Running Sport", price: 299.90, image: "https://placehold.co/260" },
        { id: 2, title: "Camiseta Algodão Egípcio", price: 89.90, image: "https://placehold.co/260" },
        { id: 3, title: "Calça Moletom Streetwear", price: 149.00, image: "https://placehold.co/260" },
        { id: 4, title: "Boné Aba Curva Premium", price: 59.90, image: "https://placehold.co/260" },
        { id: 5, title: "Meias Performance (Par)", price: 19.90, image: "https://placehold.co/260" },
        { id: 6, title: "Jaqueta Corta Vento", price: 219.90, image: "https://placehold.co/260" },
    ];

    // Função para rolar o carrossel para a esquerda ou direita
    const scroll = (direction) => {
        if (carrosselRef.current) {
            const { scrollLeft, clientWidth } = carrosselRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            carrosselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });

            carrosselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto px-8 group">
            {/* Botão Esquerdo */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Rolar para esquerda"
            >
                ❮
            </button>

            {/* Container do Carrossel (O segredo está nestas classes) */}
            <div
                ref={carrosselRef}
                className="flex items-center w-full gap-0 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth py-4"
            >
                {produtos.map((produto) => (
                    // Cada item precisa da classe 'snap-start' ou 'snap-center'
                    <div key={produto.id} className="snap-center">
                        <MiniCard
                            imageSrc={produto.image}
                            title={produto.title}
                            price={produto.price}
                            className={"flex flex-col"}
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

export default CarrosselProdutos
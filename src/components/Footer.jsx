function Footer() {
    return (
        <footer className="bg-cream-fundo-alternativo pt-12 pb-8 border-t border-amber-soft-secundario/20">
            <div className="max-w-6xl mx-auto px-8 md:px-20">


                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">


                    <div className="flex flex-col">

                        <h2 className="font-serif text-3xl text-coffee-primaria mb-4 italic">IF-Retail</h2>
                        <p className="text-ink-texto text-sm leading-relaxed mb-4">
                            Peças selecionadas com qualidade premium, entrega rápida e experiência de compra incomparável. Estilo que fala por você.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="font-serif text-lg text-coffee-primaria mb-4">Navegação</h3>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#" className="text-ink-texto hover:text-amber-soft-secundario transition-colors text-sm">Início</a></li>
                            <li><a href="#" className="text-ink-texto hover:text-amber-soft-secundario transition-colors text-sm">Nova Coleção</a></li>
                            <li><a href="#" className="text-ink-texto hover:text-amber-soft-secundario transition-colors text-sm">Mais Vendidos</a></li>
                            <li><a href="#" className="text-ink-texto hover:text-amber-soft-secundario transition-colors text-sm">Sobre Nós</a></li>
                        </ul>
                    </div>

                    {/* Coluna 3: Atendimento ao Cliente */}
                    <div className="flex flex-col">
                        <h3 className="font-serif text-lg text-coffee-primaria mb-4">Atendimento</h3>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#" className="text-ink-texto hover:text-amber-soft-secundario transition-colors text-sm">Minha Conta</a></li>
                            <li><a href="#" className="text-ink-texto hover:text-amber-soft-secundario transition-colors text-sm">Rastrear Pedido</a></li>
                            <li><a href="#" className="text-ink-texto hover:text-amber-soft-secundario transition-colors text-sm">Trocas e Devoluções</a></li>
                            <li><a href="#" className="text-ink-texto hover:text-amber-soft-secundario transition-colors text-sm">Fale Conosco</a></li>
                        </ul>
                    </div>

                    {/* Coluna 4: Newsletter */}
                    <div className="flex flex-col">
                        <h3 className="font-serif text-lg text-coffee-primaria mb-4">Newsletter</h3>
                        <p className="text-ink-texto text-sm mb-4">
                            Receba novidades e ofertas exclusivas no seu e-mail.
                        </p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Seu melhor e-mail"
                                className="px-4 py-2 border border-coffee-deep-sombras rounded-md bg-paper-fundo-principal text-sm text-ink-texto focus:outline-none focus:border-amber-soft-secundario transition-colors"
                            />
                            <button
                                type="button"
                                className="bg-coffee-primaria text-cream-fundo-alternativo py-2 rounded-md hover:opacity-90 transition-opacity text-sm font-medium cursor-pointer"
                            >
                                Assinar
                            </button>
                        </form>
                    </div>
                </div>

                {/* Linha Divisória Inferior */}
                <div className="border-t border-coffee-primaria/10 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-ink-texto text-xs text-center md:text-left">
                        &copy; {new Date().getFullYear()} SuaMarca. Todos os direitos reservados.
                    </p>


                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="text-coffee-primaria hover:text-amber-soft-secundario transition-colors text-sm font-medium">Instagram</a>
                        <a href="#" className="text-coffee-primaria hover:text-amber-soft-secundario transition-colors text-sm font-medium">Facebook</a>
                        <a href="#" className="text-coffee-primaria hover:text-amber-soft-secundario transition-colors text-sm font-medium">Pinterest</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
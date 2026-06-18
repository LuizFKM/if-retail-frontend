
import Link from "./Link.jsx";


function MenuCliente(){
    return(
        <div className="bg-sand-fundo-secundario flex justify-center shadow-lg">
            <nav className="container mx-auto py-4 flex justify-between items-center text-coffee-primaria font-medium">
                <div>
                    <Link to="/">IF-Retail</Link>
                </div>

                <div>
                    <ul className="flex justify-center space-x-8 cursor-pointer">
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/produtos">Produtos</Link>
                        </li>
                    </ul>

                </div>
                <div>
                    <Link to="/painel" className="py-1 px-5 rounded-3xl
                    bg-coffee-primaria
                    text-cream-fundo-alternativo
                    hover:shadow-lg"
                    >
                        Painel Admin
                    </Link>
                </div>

            </nav>
        </div>
    )
}

export default MenuCliente
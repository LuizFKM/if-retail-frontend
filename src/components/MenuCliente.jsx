import Button from "./Button.jsx";
import Link from "./Link.jsx";
import Tag from "./Tag.jsx";

function MenuCliente(props){
    const isAutenticado = true;
    return(
        <div className="bg-sand-fundo-secundario flex justify-center shadow-lg">
            <nav className="container mx-auto py-4 flex justify-between items-center text-coffee-primaria font-medium">
                <div>
                    <Link>IF-Retail</Link>
                </div>

                <div>
                    <ul className="flex justify-center space-x-8 cursor-pointer">
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>
                        <li>
                            <Link to"/produtos">Produtos</Link>
                        </li>
                    </ul>

                </div>
                <div>
                    <Button className="
                    bg-coffee-primaria
                    text-white

                    transition-all
                    duration-300
                    ease-in-out

                    hover:-translate-y-0.5
                    hover:shadow-lg"
                    >
                        Entrar
                    </Button>
                </div>

            </nav>
        </div>
    )
}

export default MenuCliente
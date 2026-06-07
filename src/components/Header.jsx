import MenuCliente from "./MenuCliente.jsx";
import Tag from "./Tag.jsx";


function Header(props){
    return(
        <header className="w-full sticky fixed top-0 left-0 w-full z-50">
            <MenuCliente/>
        </header>
    )
}

export default Header;
import MenuCliente from "./MenuCliente.jsx";



function Header(){
    return(
        <header className="w-full sticky top-0 left-0 z-50">
            <MenuCliente/>
        </header>
    )
}

export default Header;
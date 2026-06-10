import {createBrowserRouter} from "react-router-dom";
import {Home, Produtos, Login, CadastroCliente, PainelAdmin} from './pages/index.js'

const router = createBrowserRouter([
    {
       path:"/",
       element:<Home/>,
    },
    {
        path:"/produtos",
        element:<Produtos/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/cadastro",
        element:<CadastroCliente/>
    },
    {
        path:"/PainelAdmin",
        element:<PainelAdmin/>
    }

])

export default router;
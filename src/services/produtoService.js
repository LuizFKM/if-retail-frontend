import api from'./api'
const produtoService = {

    listarTodos: async() =>{
        const response = await api.get("/produtos")
        return response.data
    },
    cadastrarProduto: async()=>{
        const response = await api.get("/produtos")
        return response.data
    }


}

export default produtoService;
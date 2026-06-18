import api from './api'

const produtoService = {
  listarTodos: async () => (await api.get("/produtos")).data,
  buscarId:    async (id) => (await api.get(`/produtos/${id}`)).data,
  cadastrar:   async (produto) => (await api.post("/produtos", produto)).data,
  atualizar:   async (id, produto) => (await api.put(`/produtos/${id}`, produto)).data,
  remover:     async (id) => (await api.delete(`/produtos/${id}`)).data,
  enviarImagem: async (id, arquivo) => {
    const formData = new FormData()
    formData.append("img", arquivo) // back-end espera o campo "img" neste endpoint
    return (await api.post(`/produtos/${id}/imagem`, formData)).data
  },
}

export default produtoService

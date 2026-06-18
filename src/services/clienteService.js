import api from './api'

const clienteService = {
  listarTodos: async () => (await api.get("/clientes")).data,
  buscarId: async (id) => (await api.get(`/clientes/${id}`)).data,
  cadastrar: async (cliente) => (await api.post("/clientes", cliente)).data,
  // PUT /clientes/{id} espera multipart/form-data com parte "dados" (JSON Blob) + "imagem" (arquivo, opcional)
  atualizar: async (id, dados, imagem) => {
    const formData = new FormData()
    formData.append("dados", new Blob([JSON.stringify(dados)], { type: "application/json" }))
    if (imagem) formData.append("imagem", imagem)
    return (await api.put(`/clientes/${id}`, formData)).data
  },
  remover: async (id) => (await api.delete(`/clientes/${id}`)).data,
}

export default clienteService

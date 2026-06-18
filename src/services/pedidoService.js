import api from './api'

const pedidoService = {
  listarTodos: async () => (await api.get("/pedidos")).data,
  buscarId: async (id) => (await api.get(`/pedidos/${id}`)).data,
  // envio: { clienteId, itens: [ { produtoId, quantidade } ] }
  cadastrar: async (pedido) => (await api.post("/pedidos", pedido)).data,
  cancelar: async (id) => (await api.delete(`/pedidos/${id}`)).data,
}

export default pedidoService

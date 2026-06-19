import api from './api'

const pedidoService = {
  listarTodos: async (page = 0, size = 10) =>
    (await api.get(`/pedidos?page=${page}&size=${size}&sort=id,desc`)).data,
  buscarId: async (id) => (await api.get(`/pedidos/${id}`)).data,
  listarPorCliente: async (clienteId, page = 0, size = 5) =>
    (await api.get(`/pedidos/cliente/${clienteId}?page=${page}&size=${size}&sort=id,desc`)).data,
  cadastrar: async (pedido) => (await api.post("/pedidos", pedido)).data,
  cancelar: async (id) => (await api.patch(`/pedidos/${id}/cancelar`)).data,
  entregar: async (id) => (await api.patch(`/pedidos/${id}/entregar`)).data,
  excluir: async (id) => (await api.delete(`/pedidos/${id}`)).data,
}

export default pedidoService

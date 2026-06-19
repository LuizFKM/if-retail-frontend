import api from './api'

const adminService = {
  listarTodos: async () => (await api.get("/admins")).data,
  buscarId: async (id) => (await api.get(`/admins/${id}`)).data,
  cadastrar: async (admin) => (await api.post("/admins", admin)).data,
  atualizar: async (id, admin) => (await api.put(`/admins/${id}`, admin)).data,
  remover: async (id) => (await api.delete(`/admins/${id}`)).data,
}

export default adminService

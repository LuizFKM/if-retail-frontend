import api from './api'

const loginService = {
  login: async (email, password) => (await api.post("/auth/login", { email, password })).data,
}

export default loginService

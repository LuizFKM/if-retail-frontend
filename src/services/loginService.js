import api from './api'

// ATENÇÃO: depende do endpoint POST /auth no back-end Spring.
// Enquanto a autenticação não estiver ativada no back, o login não funcionará de verdade.
const loginService = {
  login: async (email, password) => (await api.post("/auth", { email, password })).data,
}

export default loginService

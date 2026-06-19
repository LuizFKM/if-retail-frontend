import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import loginService from "../services/loginService.js"

function Login() {
  const navigate = useNavigate()
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [verSenha, setVerSenha] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  async function onSubmit(data) {
    setErro("")
    setCarregando(true)
    try {
      const res = await loginService.login(data.email, data.password)

      // Factory Method no backend já determinou o role e o redirect
      if (res.role === "ADMIN") {
        navigate(res.redirect ?? "/painel")
      } else {
        localStorage.setItem("clienteId", String(res.id))
        navigate(res.redirect ?? "/perfil")
      }
    } catch (err) {
      const status = err?.response?.status
      if (status === 401) {
        setErro("E-mail ou senha inválidos.")
      } else {
        setErro("Erro ao conectar com o servidor.")
      }
    } finally {
      setCarregando(false)
    }
  }

  const inputClass =
    "w-full px-4 py-2 border border-line-bordas rounded-md bg-paper-fundo-principal text-ink-texto focus:outline-none focus:border-amber-soft-secundario transition-colors"
  const labelClass = "block text-sm font-medium text-coffee-primaria mb-1"

  return (
    <div className="min-h-screen bg-cream-fundo-alternativo flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-paper-fundo-principal rounded-xl shadow-lg border border-line-bordas p-8">
        <h1 className="font-serif text-3xl text-coffee-primaria mb-1 text-center italic">
          IF-Retail
        </h1>
        <p className="text-center text-ink-texto text-sm mb-8">Acesse sua conta</p>

        {erro && (
          <p className="mb-4 text-center text-red-500 text-sm bg-red-50 border border-red-200 rounded-md px-4 py-2">
            {erro}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <label className={labelClass}>E-mail</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              className={inputClass}
              {...register("email", {
                required: "E-mail é obrigatório",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "E-mail inválido" },
              })}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          <div>
            <label className={labelClass}>Senha</label>
            <div className="relative">
              <input
                type={verSenha ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••��•"
                className={inputClass}
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
              />
              <button
                type="button"
                onClick={() => setVerSenha(v => !v)}
                title={verSenha ? "Ocultar senha" : "Ver senha"}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-md text-ink-texto/40 hover:text-coffee-primaria hover:bg-cream-fundo-alternativo transition-colors cursor-pointer"
              >
                {verSenha ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-coffee-primaria text-cream-fundo-alternativo py-2.5 rounded-md hover:opacity-90 transition-opacity font-medium cursor-pointer disabled:opacity-50"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-xs text-ink-texto/50 mt-4">
          Administradores entram com e-mail e senha cadastrados diretamente no banco.
        </p>

        <p className="text-center text-sm text-ink-texto mt-5">
          Não tem conta?{" "}
          <Link to="/cadastro" className="text-amber-soft-secundario hover:underline font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

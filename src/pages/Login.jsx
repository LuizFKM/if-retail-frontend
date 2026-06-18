import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import loginService from "../services/loginService.js"

// ATENÇÃO: o back-end Spring ainda não tem o endpoint POST /auth implementado.
// Esta tela funciona visualmente, mas o login só funcionará depois que a
// autenticação for ativada no back-end (etapa opcional do projeto).

function Login() {
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function onSubmit(data) {
    setErro("")
    setCarregando(true)
    try {
      const resultado = await loginService.login(data.email, data.password)
      // TODO: salvar token no Redux quando a auth do back-end estiver pronta
      console.log("Login bem-sucedido:", resultado)
      alert("Login realizado!")
    } catch {
      setErro("E-mail ou senha inválidos.")
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
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className={labelClass}>Senha</label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={inputClass}
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: { value: 6, message: "Senha deve ter ao menos 6 caracteres" },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-coffee-primaria text-cream-fundo-alternativo py-2.5 rounded-md hover:opacity-90 transition-opacity font-medium cursor-pointer disabled:opacity-50"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-ink-texto mt-6">
          Não tem conta?{" "}
          <Link
            to="/cadastro"
            className="text-amber-soft-secundario hover:underline font-medium"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

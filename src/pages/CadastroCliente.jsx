import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import clienteService from "../services/clienteService.js"

function CadastroCliente() {
  const navigate = useNavigate()
  const [salvando, setSalvando] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  async function onSubmit(data) {
    setSalvando(true)
    try {
      // react-hook-form cria objetos aninhados automaticamente com "endereco.rua", etc.
      const payload = {
        name: data.name,
        cpf: data.cpf,
        email: data.email,         // User.email — usado no login
        password: data.password,
        role: "CLIENTE",
        urlFotoPerfil: "",
        endereco: {
          rua: data.endereco?.rua || "",
          numero: data.endereco?.numero || "",
          complemento: data.endereco?.complemento || "",
          bairro: data.endereco?.bairro || "",
          cidade: data.endereco?.cidade || "",
          estado: data.endereco?.estado || "",
          cep: data.endereco?.cep || "",
          pais: "Brasil",
        },
        contatos: [{
          telefone: data.contatos?.[0]?.telefone || "",
          email: data.email,       // replica o e-mail no contato também
          whatsapp: data.contatos?.[0]?.whatsapp || "",
        }],
      }
      const resultado = await clienteService.cadastrar(payload)
      localStorage.setItem("clienteId", String(resultado.id))
      navigate("/perfil")
    } catch {
      alert("Erro ao realizar cadastro. Verifique os dados e tente novamente.")
    } finally {
      setSalvando(false)
    }
  }

  const inputClass =
    "w-full px-4 py-2 border border-line-bordas rounded-md bg-paper-fundo-principal text-ink-texto focus:outline-none focus:border-amber-soft-secundario transition-colors"
  const labelClass = "block text-sm font-medium text-coffee-primaria mb-1"

  return (
    <div className="min-h-screen bg-cream-fundo-alternativo flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-paper-fundo-principal rounded-xl shadow-lg border border-line-bordas p-8">
        <h1 className="font-serif text-3xl text-coffee-primaria mb-1 text-center italic">
          IF-Retail
        </h1>
        <p className="text-center text-ink-texto text-sm mb-8">Crie sua conta</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

          {/* Dados Pessoais */}
          <fieldset className="border border-line-bordas rounded-lg p-4">
            <legend className="px-2 text-sm font-semibold text-coffee-primaria">
              Dados Pessoais
            </legend>
            <div className="flex flex-col gap-4 mt-2">
              <div>
                <label className={labelClass}>Nome completo *</label>
                <input
                  className={inputClass}
                  placeholder="Seu nome"
                  {...register("name", {
                    required: "Nome é obrigatório",
                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  })}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">{errors.name.message}</span>
                )}
              </div>

              <div>
                <label className={labelClass}>E-mail *</label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="seu@email.com"
                  {...register("email", {
                    required: "E-mail é obrigatório",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "E-mail inválido" },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>CPF *</label>
                  <input
                    className={inputClass}
                    placeholder="000.000.000-00"
                    {...register("cpf", {
                      required: "CPF é obrigatório",
                      minLength: { value: 11, message: "CPF inválido" },
                    })}
                  />
                  {errors.cpf && (
                    <span className="text-red-500 text-xs">{errors.cpf.message}</span>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Senha *</label>
                  <input
                    type="password"
                    className={inputClass}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Senha é obrigatória",
                      minLength: { value: 6, message: "Mínimo 6 caracteres" },
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs">{errors.password.message}</span>
                  )}
                </div>
              </div>
            </div>
          </fieldset>

          {/* Endereço */}
          <fieldset className="border border-line-bordas rounded-lg p-4">
            <legend className="px-2 text-sm font-semibold text-coffee-primaria">
              Endereço
            </legend>
            <div className="flex flex-col gap-4 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className={labelClass}>Rua</label>
                  <input
                    className={inputClass}
                    placeholder="Nome da rua"
                    {...register("endereco.rua")}
                  />
                </div>
                <div>
                  <label className={labelClass}>Número</label>
                  <input
                    className={inputClass}
                    placeholder="123"
                    {...register("endereco.numero")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Bairro</label>
                  <input
                    className={inputClass}
                    placeholder="Bairro"
                    {...register("endereco.bairro")}
                  />
                </div>
                <div>
                  <label className={labelClass}>Cidade</label>
                  <input
                    className={inputClass}
                    placeholder="Cidade"
                    {...register("endereco.cidade")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Estado</label>
                  <input
                    className={inputClass}
                    placeholder="SP"
                    {...register("endereco.estado")}
                  />
                </div>
                <div>
                  <label className={labelClass}>CEP</label>
                  <input
                    className={inputClass}
                    placeholder="00000-000"
                    {...register("endereco.cep")}
                  />
                </div>
                <div>
                  <label className={labelClass}>Complemento</label>
                  <input
                    className={inputClass}
                    placeholder="Apto, Bloco..."
                    {...register("endereco.complemento")}
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Contato */}
          <fieldset className="border border-line-bordas rounded-lg p-4">
            <legend className="px-2 text-sm font-semibold text-coffee-primaria">
              Contato
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className={labelClass}>Telefone</label>
                <input
                  className={inputClass}
                  placeholder="(00) 0000-0000"
                  {...register("contatos.0.telefone")}
                />
              </div>
              <div>
                <label className={labelClass}>WhatsApp</label>
                <input
                  className={inputClass}
                  placeholder="(00) 00000-0000"
                  {...register("contatos.0.whatsapp")}
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={salvando}
            className="w-full bg-coffee-primaria text-cream-fundo-alternativo py-2.5 rounded-md hover:opacity-90 transition-opacity font-medium cursor-pointer disabled:opacity-50"
          >
            {salvando ? "Cadastrando..." : "Criar Conta"}
          </button>
        </form>

        <p className="text-center text-sm text-ink-texto mt-6">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="text-amber-soft-secundario hover:underline font-medium"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CadastroCliente

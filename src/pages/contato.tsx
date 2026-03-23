import Head from "next/head"
import Layout from "../components/Layout"
import BotaoVoltar from "../components/BotaoVoltar"
import { useForm } from "@formspree/react"
import { useState } from "react"
 import { useEffect } from "react"

interface FormData {
  nome: string
  email: string
  message: string
}
 
interface FormErrors {
  nome: string
  email: string
  message: string
}
 
function Campo({ label, erro, children }: { label: string; erro?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block font-['DM_Mono',monospace] text-[10px] uppercase tracking-widest text-[#9aa0b0]">
        {label}
      </label>
      {children}
      {erro && (
        <p className="text-[11px] text-[#c8411a]">{erro}</p>
      )}
    </div>
  )
}
 
function inputClass(erro: string) {
  return [
    "w-full px-4 py-3 rounded-xl text-[14px]",
    "bg-white dark:bg-[#131820]",
    "text-[#0d1117] dark:text-[#f5f1e8]",
    "placeholder-[#9aa0b0]",
    "outline-none transition-colors duration-200",
    erro
      ? "border border-[#c8411a]/60 focus:border-[#c8411a]"
      : "border border-black/10 dark:border-white/10 focus:border-[#c8411a]/60 dark:focus:border-[#c8411a]/60",
  ].join(" ")
}
 
export default function Contato() {
  const [state, handleSubmit] = useForm("xrbkjbnl")
  const [formData, setFormData] = useState<FormData>({ nome: "", email: "", message: "" })
  const [formErrors, setFormErrors] = useState<FormErrors>({ nome: "", email: "", message: "" })
  const [showToast, setShowToast] = useState<{ type: "success" | "error"; message: string } | null>(null)
 
  const validate = () => {
    const errors: FormErrors = { nome: "", email: "", message: "" }
    if (!formData.nome.trim()) errors.nome = "O nome é obrigatório."
    if (!formData.email.trim()) errors.email = "O e-mail é obrigatório."
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "E-mail inválido."
    if (!formData.message.trim()) errors.message = "A mensagem é obrigatória."
    setFormErrors(errors)
    return !Object.values(errors).some((err) => err !== "")
  }
  useEffect(() => {
  if (state.succeeded) {
    setShowToast({ type: "success", message: "Mensagem enviada com sucesso!" })
    setFormData({ nome: "", email: "", message: "" })

    setTimeout(() => setShowToast(null), 4000)
  }
}, [state.succeeded])

  const handleLocalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  if (!validate()) return

  await handleSubmit(e)

  if (state.errors && Object.keys(state.errors).length > 0) {
    setShowToast({ type: "error", message: "Erro ao enviar. Tente novamente." })
    setTimeout(() => setShowToast(null), 4000)
  }
}
 
  return (
    <Layout>
      <Head>
        <title>Contato — InfoMundi</title>
        <meta name="description" content="Entre em contato com o InfoMundi." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
 
      <div className="max-w-5xl mx-auto">
 
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="pt-4 pb-14 md:pt-8 border-b border-black/8 dark:border-white/8">
          <span className="inline-block bg-[#d4eef4] dark:bg-[#1a3a45] text-[#1a5c6e] dark:text-[#6ecbe0] text-[11px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
            Fale conosco
          </span>
          <h1 className="font-['Fraunces',serif] text-5xl md:text-6xl font-bold leading-[1.08] text-[#0d1117] dark:text-[#f5f1e8] mb-4">
            Entre em<br />
            <em className="text-[#c8411a] not-italic">contato</em>
          </h1>
          <p className="text-[16px] text-[#3a4050] dark:text-[#8a90a0] font-light leading-relaxed max-w-sm">
            Dúvidas, sugestões ou quer contribuir com o projeto? Manda uma mensagem.
          </p>
        </section>
 
        {/* ── GRID ──────────────────────────────────────────────────────────── */}
        <div className="py-14 grid md:grid-cols-[1fr_2fr] gap-16 items-start">
 
          {/* Coluna lateral */}
          <div className="space-y-8">
            <div>
              <span className="font-['DM_Mono',monospace] text-[10px] text-[#9aa0b0] uppercase tracking-widest block mb-3">
                Projeto
              </span>
              <p className="text-[14px] text-[#3a4050] dark:text-[#8a90a0] font-light leading-relaxed">
                InfoMundi é um projeto educacional open-source. Todo feedback é bem-vindo.
              </p>
            </div>
 
            <div>
              <span className="font-['DM_Mono',monospace] text-[10px] text-[#9aa0b0] uppercase tracking-widest block mb-3">
                Tempo de resposta
              </span>
              <p className="text-[14px] text-[#3a4050] dark:text-[#8a90a0] font-light leading-relaxed">
                Normalmente em até 48 horas úteis.
              </p>
            </div>
 
            <div>
              <span className="font-['DM_Mono',monospace] text-[10px] text-[#9aa0b0] uppercase tracking-widest block mb-3">
                Autor
              </span>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0d1117] dark:bg-[#f5f1e8] flex items-center justify-center font-['Fraunces',serif] text-sm font-bold text-[#f5f1e8] dark:text-[#0d1117] flex-shrink-0">
                  MA
                </div>
                <div>
                  <div className="font-['Fraunces',serif] text-[14px] font-bold text-[#0d1117] dark:text-[#f5f1e8]">
                    Marcelo Antônio
                  </div>
                  <div className="font-['DM_Mono',monospace] text-[10px] text-[#c8411a] uppercase tracking-widest">
                    Dev Front-end
                  </div>
                </div>
              </div>
            </div>
 
            <div className="pt-2">
              <BotaoVoltar />
            </div>
          </div>
 
          {/* Formulário */}
          <div>
            {/* Toast */}
            {showToast && (
              <div
                className={`mb-6 px-4 py-3.5 rounded-xl text-[13px] font-medium border ${
                  showToast.type === "success"
                    ? "bg-[#e1f5ee] dark:bg-[#0f4a3c]/40 text-[#0f6e56] dark:text-[#5dcaa5] border-[#0f6e56]/20"
                    : "bg-[#faece7] dark:bg-[#5a1a0c]/40 text-[#c8411a] border-[#c8411a]/20"
                }`}
              >
                {showToast.type === "success" ? "✓ " : "✕ "}
                {showToast.message}
              </div>
            )}
 
            {/* Estado de sucesso permanente */}
            {state.succeeded ? (
              <div className="py-16 text-center border border-black/8 dark:border-white/8 rounded-2xl bg-white dark:bg-[#131820]">
                <div className="font-['Fraunces',serif] text-3xl font-bold text-[#0d1117] dark:text-[#f5f1e8] mb-2">
                  Mensagem enviada!
                </div>
                <p className="text-[14px] text-[#9aa0b0] font-light">
                  Obrigado pelo contato. Retornaremos em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLocalSubmit} noValidate className="space-y-5">
                <Campo label="Nome" erro={formErrors.nome}>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    placeholder="Seu nome completo"
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className={inputClass(formErrors.nome)}
                  />
                </Campo>
 
                <Campo label="E-mail" erro={formErrors.email}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    placeholder="seu@email.com"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass(formErrors.email)}
                  />
                </Campo>
 
                <Campo label="Mensagem" erro={formErrors.message}>
                  <textarea
                    id="mensagem"
                    name="message"
                    rows={6}
                    value={formData.message}
                    placeholder="Escreva sua mensagem aqui..."
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass(formErrors.message)} resize-none`}
                  />
                </Campo>
 
                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="inline-flex items-center gap-2.5 bg-[#0d1117] dark:bg-[#f5f1e8] text-[#f5f1e8] dark:text-[#0d1117] px-6 py-3 rounded-xl text-[13px] font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {state.submitting && (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {state.submitting ? "Enviando..." : "Enviar mensagem →"}
                  </button>
                  <span className="text-[11px] text-[#9aa0b0] font-['DM_Mono',monospace]">
                    via Formspree
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
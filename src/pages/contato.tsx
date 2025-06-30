import Head from "next/head";
import Layout from "../components/Layout";
import BotaoVoltar from "../components/BotaoVoltar";
import { useForm } from "@formspree/react";
import { useState } from "react";

export default function Contato() {
  const [state, handleSubmit] = useForm("xrbkjbnl");
  const [formData, setFormData] = useState({ nome: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ nome: "", email: "", message: "" });
  const [showToast, setShowToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const validate = () => {
    const errors = { nome: "", email: "", message: "" };
    if (!formData.nome.trim()) errors.nome = "O nome é obrigatório.";
    if (!formData.email.trim()) errors.email = "O e-mail é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "E-mail inválido.";
    if (!formData.message.trim()) errors.message = "A mensagem é obrigatória.";
    setFormErrors(errors);
    return !Object.values(errors).some((err) => err !== "");
  };

 const handleLocalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!validate()) return;

  await handleSubmit(e);

  if (state.succeeded) {
    setShowToast({ type: "success", message: "Mensagem enviada com sucesso!" });
    setFormData({ nome: "", email: "", message: "" });
  } else {
    setShowToast({ type: "error", message: "Erro ao enviar. Tente novamente." });
  }

  setTimeout(() => setShowToast(null), 4000);
};

  return (
    <Layout>
      <Head>
        <title>Contato - InfoMundi 🌍</title>
      </Head>

      <section className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">Entre em Contato</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Caso tenha dúvidas, sugestões ou queira contribuir com o projeto InfoMundi, sinta-se à vontade para entrar em contato.
        </p>

        {showToast && (
          <div
            className={`p-4 rounded text-white font-medium transition ${
              showToast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {showToast.message}
          </div>
        )}

        <form
          onSubmit={handleLocalSubmit}
          noValidate
          className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm text-gray-900 dark:text-gray-100 border transition ${
                formErrors.nome
                  ? "border-red-500 bg-red-50 dark:bg-red-900 dark:border-red-500"
                  : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              }`}
            />
            {formErrors.nome && <p className="text-red-500 text-sm">{formErrors.nome}</p>}
          </div>

          {/* E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm text-gray-900 dark:text-gray-100 border transition ${
                formErrors.email
                  ? "border-red-500 bg-red-50 dark:bg-red-900 dark:border-red-500"
                  : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              }`}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>

          {/* Mensagem */}
          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm text-gray-900 dark:text-gray-100 border transition ${
                formErrors.message
                  ? "border-red-500 bg-red-50 dark:bg-red-900 dark:border-red-500"
                  : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              }`}
            ></textarea>
            {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={state.submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {state.submitting && (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            )}
            {state.submitting ? "Enviando..." : "Enviar"}
          </button>
        </form>
        <BotaoVoltar />
      </section>
    </Layout>
  );
}
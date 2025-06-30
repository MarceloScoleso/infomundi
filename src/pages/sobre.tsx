import Head from "next/head"
import Layout from "../components/Layout"
import BotaoVoltar from "../components/BotaoVoltar"

export default function Sobre() {
  return (
    <Layout>
      <Head>
        <title>Sobre o Projeto - InfoMundi 🌍</title>
      </Head>

      <section className="max-w-3xl mx-auto space-y-6">
        <BotaoVoltar />

        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-300">
          Sobre o Projeto
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300">
          O <strong>InfoMundi</strong> é uma plataforma web interativa que tem como objetivo fornecer informações relevantes, curiosidades e dados atualizados sobre diversos países ao redor do mundo.
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          A proposta do projeto é reunir dados culturais, geográficos, demográficos e econômicos de forma acessível, organizada e com visual agradável, permitindo que usuários descubram detalhes interessantes sobre cada nação.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-300">Funcionalidades</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Visualização de informações detalhadas sobre países.</li>
          <li>Dados como população, idioma, moeda, IDH, comidas típicas e curiosidades.</li>
          <li>Modo escuro e claro com alternância de tema.</li>
          <li>Navegação por cards interativos.</li>
          <li>Design responsivo para dispositivos móveis e desktops.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-300">Tecnologias Utilizadas</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li><strong>Next.js</strong> — Framework React para renderização estática e rotas dinâmicas.</li>
          <li><strong>TypeScript</strong> — Tipagem estática para maior segurança no desenvolvimento.</li>
          <li><strong>Tailwind CSS</strong> — Utilizado para estilização moderna e responsiva.</li>
          <li><strong>Lucide React</strong> — Biblioteca de ícones leve e elegante.</li>
          <li><strong>Arquivo JSON</strong> — Para armazenamento e simulação de dados estáticos.</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300">
          O projeto é uma iniciativa educacional e demonstrativa, com foco em boas práticas de desenvolvimento front-end e organização de componentes reutilizáveis.
        </p>
      </section>
    </Layout>
  )
}
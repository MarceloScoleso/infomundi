import Head from "next/head"
import fs from "fs"
import path from "path"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import CardPais from "../components/CardPais"
import { Pais } from "../types/Pais"
import { useState } from "react"

interface HomeProps {
  paises: Pais[]
}

function removerAcentos(texto: string) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function Home({ paises }: HomeProps) {
  const [busca, setBusca] = useState("");

  const paisesFiltrados = paises.filter((pais) =>
    removerAcentos(pais.nome).includes(removerAcentos(busca))
  );

  return (
    <Layout>
      <Head>
        <title>InfoMundi</title>
        <meta name="description" content="Dados e curiosidades sobre países do mundo" />
      </Head>

      <main>
        <section aria-labelledby="titulo-principal" className="text-center max-w-3xl mx-auto mb-12">
          <h1 id="titulo-principal" className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-md">
            Descubra o mundo através dos dados 🌐
          </h1>
          <p className="text-blue-600 text-lg font-light mb-6">
            Curiosidades, estatísticas e eventos por país, em um só lugar.
          </p>

          <input
            type="text"
            placeholder="Buscar país..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 mb-4"
          />
        </section>

        <section aria-label="Lista de países">
          {paisesFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paisesFiltrados.map((pais) => (
                <CardPais key={pais.slug} pais={pais} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">Nenhum país encontrado.</p>
          )}
        </section>
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "src", "data", "paises.json")
  const jsonData = fs.readFileSync(filePath, "utf-8")
  const paises: Pais[] = JSON.parse(jsonData)

  // Ordena os países em ordem alfabética ignorando acentos
  paises.sort((a, b) =>
    a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" })
  )

  return {
    props: { paises },
  }
}

import Head from "next/head"
import fs from "fs"
import path from "path"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import CardPais from "../components/CardPais"
import { Pais } from "../types/Pais"

interface HomeProps {
  paises: Pais[]
}

export default function Home({ paises }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>InfoMundi 🌍</title>
        <meta name="description" content="Dados e curiosidades sobre países do mundo" />
      </Head>
      
      <main>
        <section aria-labelledby="titulo-principal" className="text-center max-w-3xl mx-auto mb-12">
          <h1 id="titulo-principal" className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-md">
            Descubra o mundo através dos dados 🌐
          </h1>
          <p className="text-blue-600 text-lg font-light">
            Curiosidades, estatísticas e eventos por país, em um só lugar.
          </p>
        </section>

        <section aria-label="Lista de países">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paises.map((pais) => (
              <CardPais key={pais.slug} pais={pais} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "src", "data", "paises.json")
  const jsonData = fs.readFileSync(filePath, "utf-8")
  const paises: Pais[] = JSON.parse(jsonData)

  return {
    props: { paises },
  }
}
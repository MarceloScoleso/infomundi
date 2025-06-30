import { GetStaticPaths, GetStaticProps } from "next"
import fs from "fs"
import path from "path"
import Head from "next/head"
import Layout from "../../components/Layout"
import BotaoVoltar from "../../components/BotaoVoltar"
import { Pais } from "../../types/Pais"

interface PaginaPaisProps {
  pais: Pais
}

export default function PaginaPais({ pais }: PaginaPaisProps) {
  return (
    <Layout>
      <Head>
        <title>{pais.nome} - InfoMundi 🌍</title>
      </Head>

      <section className="max-w-4xl mx-auto space-y-10">
        

        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-300 text-center">
          Veja mais detalhes sobre <span className="underline">{pais.nome}</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={pais.imagem}
            alt={`Imagem de ${pais.nome}`}
            className="w-full md:w-1/2 rounded-lg shadow-lg object-cover"
          />
          <div>
            <h2 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">{pais.nome}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {pais.capital}, {pais.continente}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              População estimada: <strong>{pais.populacao}</strong><br />
              Área: <strong>{pais.area}</strong><br />
              PIB: <strong>{pais.pib}</strong><br />
              Clima: <strong>{pais.clima}</strong><br />
              Índice de felicidade: <strong>{pais.indiceFelicidade}</strong><br />
              Língua oficial: <strong>{pais.linguaOficial}</strong><br />
              Moeda: <strong>{pais.moeda}</strong>
            </p>
          </div>
        </div>

        {Array.isArray(pais.curiosidades) && pais.curiosidades.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-3">Curiosidades</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
              {pais.curiosidades.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(pais.comidasTipicas) && pais.comidasTipicas.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-3">Comidas Típicas</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
              {pais.comidasTipicas.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(pais.turismo) && pais.turismo.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-3">Pontos Turísticos</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
              {pais.turismo.map((ponto, i) => (
                <li key={i}>{ponto}</li>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(pais.feriadosPrincipais) && pais.feriadosPrincipais.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-3">Feriados Principais</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
              {pais.feriadosPrincipais.map((feriado, i) => (
                <li key={i}>{feriado}</li>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(pais.principaisExportacoes) && pais.principaisExportacoes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-3">Principais Exportações</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
              {pais.principaisExportacoes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(pais.principaisCidades) && pais.principaisCidades.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-3">Principais Cidades</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {pais.principaisCidades.join(", ")}
            </p>
          </div>
        )}

        {pais.populacaoUrbanaRural && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-3">Distribuição Urbana e Rural</h2>
            <p className="text-gray-700 dark:text-gray-300">{pais.populacaoUrbanaRural}</p>
          </div>
        )}

        {Array.isArray(pais.esportesPopulares) && pais.esportesPopulares.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-3">Esportes Populares</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
              {pais.esportesPopulares.map((esporte, i) => (
                <li key={i}>{esporte}</li>
              ))}
            </ul>
          </div>
        )}

        {pais.dadosDemograficos && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-3">Dados Demográficos</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
              {pais.dadosDemograficos.expectativaVida && (
                <li>Expectativa de vida: {pais.dadosDemograficos.expectativaVida}</li>
              )}
              {pais.dadosDemograficos.taxaAlfabetizacao && (
                <li>Taxa de alfabetização: {pais.dadosDemograficos.taxaAlfabetizacao}</li>
              )}
              {pais.dadosDemograficos.indiceDesenvolvimentoHumano && (
                <li>IDH: {pais.dadosDemograficos.indiceDesenvolvimentoHumano}</li>
              )}
            </ul>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-3">Evento Atual</h2>
          <p className="text-gray-700 dark:text-gray-300">{pais.eventoAtual}</p>
        </div>
        <BotaoVoltar />
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "src", "data", "paises.json")
  const jsonData = fs.readFileSync(filePath, "utf-8")
  const paises: Pais[] = JSON.parse(jsonData)

  const paths = paises.map((pais) => ({
    params: { slug: pais.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const filePath = path.join(process.cwd(), "src", "data", "paises.json")
  const jsonData = fs.readFileSync(filePath, "utf-8")
  const paises: Pais[] = JSON.parse(jsonData)

  const pais = paises.find((p) => p.slug === slug)

  if (!pais) {
    return { notFound: true }
  }

  return {
    props: { pais },
  }
}
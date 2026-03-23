import Head from "next/head"
import fs from "fs"
import path from "path"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import CardPais from "../components/CardPais"
import { PaisCard, Continente } from "../types/Pais"
import { useState } from "react"
 
interface HomeProps {
  paises: PaisCard[]
}
 
function removerAcentos(texto: string) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}
 
const CONTINENTES = [
  "Todos",
  "África",
  "América Central",
  "América do Norte",
  "América do Sul",
  "Ásia",
  "Europa",
  "Oceania",
] as const satisfies readonly (Continente | "Todos")[]
 
export default function Home({ paises }: HomeProps) {
  const [busca, setBusca] = useState("")
  const [continente, setContinente] = useState<Continente | "Todos">("Todos")
 
  const paisesFiltrados = paises.filter((pais) => {
    const buscaOk = removerAcentos(pais.nome).includes(removerAcentos(busca))
    const continenteOk = continente === "Todos" || pais.continente === continente
    return buscaOk && continenteOk
  })
 
  return (
    <Layout>
      <Head>
        <title>InfoMundi — Dados e curiosidades sobre países do mundo</title>
        <meta name="description" content="Dados e curiosidades sobre países do mundo" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
 
      {/* ── HERO ── */}
      <section aria-labelledby="titulo-principal" className="pt-4 pb-10 md:pt-8 md:pb-14">
        <div className="mb-4">
          <span className="inline-block bg-[#d4eef4] dark:bg-[#1a3a45] text-[#1a5c6e] dark:text-[#6ecbe0] text-[11px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full">
            195 países · dados atualizados
          </span>
        </div>
 
        <h1
          id="titulo-principal"
          className="font-['Fraunces',serif] text-4xl md:text-5xl font-bold leading-[1.12] text-[#0d1117] dark:text-[#f5f1e8] mb-4 max-w-xl"
        >
          Descubra o mundo<br />
          através dos{" "}
          <em className="text-[#c8411a] not-italic">dados</em>
        </h1>
 
        <p className="text-[16px] text-[#3a4050] dark:text-[#8a90a0] font-light mb-8 max-w-md leading-relaxed">
          Curiosidades, estatísticas e eventos por país — tudo em um só lugar.
        </p>
 
        {/* Barra de busca */}
        <div className="flex gap-3 max-w-lg">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa0b0]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar país..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-white dark:bg-[#131820] border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-[14px] text-[#0d1117] dark:text-[#f5f1e8] placeholder-[#9aa0b0] focus:outline-none focus:border-[#c8411a]/60 dark:focus:border-[#c8411a]/60 transition-colors"
            />
          </div>
        </div>
      </section>
 
      {/* ── BARRA DE STATS ── */}
      <div className="flex gap-0 border-y border-black/8 dark:border-white/8 mb-10 overflow-x-auto">
        {[
          { label: "Países", value: "195" },
          { label: "Continentes", value: "7" },
          { label: "Pop. mundial", value: "8,1bi" },
          { label: "Curiosidades", value: "1.2k+" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex-shrink-0 py-4 pr-8 mr-8 border-r border-black/8 dark:border-white/8 last:border-r-0"
          >
            <div className="text-[10px] font-medium tracking-widest uppercase text-[#9aa0b0] mb-0.5">
              {label}
            </div>
            <div className="font-['Fraunces',serif] text-[22px] font-bold text-[#0d1117] dark:text-[#f5f1e8]">
              {value}
            </div>
          </div>
        ))}
      </div>
 
      {/* ── FILTROS POR CONTINENTE ── */}
      <div className="flex gap-2 mb-6 flex-wrap" role="group" aria-label="Filtrar por continente">
        {CONTINENTES.map((c) => (
          <button
            key={c}
            onClick={() => setContinente(c)}
            className={`text-[12px] font-medium px-3.5 py-1.5 rounded-full border transition-colors duration-150 ${
              continente === c
                ? "bg-[#0d1117] dark:bg-[#f5f1e8] text-[#f5f1e8] dark:text-[#0d1117] border-transparent"
                : "bg-transparent border-black/10 dark:border-white/10 text-[#3a4050] dark:text-[#8a90a0] hover:border-black/20 dark:hover:border-white/20"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
 
      {/* ── GRID DE PAÍSES ── */}
      <section aria-label="Lista de países">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[11px] font-medium tracking-widest uppercase text-[#9aa0b0]">
            {paisesFiltrados.length} país{paisesFiltrados.length !== 1 ? "es" : ""}
          </span>
        </div>
 
        {paisesFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {paisesFiltrados.map((pais) => (
              <CardPais key={pais.slug} pais={pais} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌐</div>
            <p className="text-[#9aa0b0] text-[15px]">Nenhum país encontrado para "{busca}"</p>
            <button
              onClick={() => { setBusca(""); setContinente("Todos") }}
              className="mt-4 text-[13px] text-[#c8411a] hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>
    </Layout>
  )
}
 
export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "src", "data", "paises.json")
  const jsonData = fs.readFileSync(filePath, "utf-8")
  const raw = JSON.parse(jsonData)
 
  const paises: PaisCard[] = raw
    .map((p: any) => ({
      slug: p.slug,
      nome: p.nome,
      continente: p.continente,
      imagem: p.imagem,
      curiosidades: Array.isArray(p.curiosidades)
        ? p.curiosidades
        : [p.curiosidades],
    }))
    .sort((a: PaisCard, b: PaisCard) =>
      a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" })
    )
 
  return { props: { paises } }
}
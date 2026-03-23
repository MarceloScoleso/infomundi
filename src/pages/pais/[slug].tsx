import { GetStaticPaths, GetStaticProps } from "next"
import fs from "fs"
import path from "path"
import Head from "next/head"
import Layout from "../../components/Layout"
import BotaoVoltar from "../../components/BotaoVoltar"
import { Pais, getLinguas } from "../../types/Pais"
 
interface PaginaPaisProps {
  pais: Pais
}
 
// ── Componente de seção com label mono ────────────────────────────────────────
 
function Secao({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="font-['DM_Mono',monospace] text-[10px] text-[#9aa0b0] uppercase tracking-widest block mb-3">
        {label}
      </span>
      {children}
    </div>
  )
}
 
// ── Pills para listas ─────────────────────────────────────────────────────────
 
function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className="px-3 py-1.5 bg-[#ede9de] dark:bg-[#1a2030] text-[#3a4050] dark:text-[#8a90a0] text-[12px] rounded-full"
        >
          {item}
        </span>
      ))}
    </div>
  )
}
 
// ── Linha de stat ─────────────────────────────────────────────────────────────
 
function StatLinha({ label, valor }: { label: string; valor: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-black/6 dark:border-white/6 last:border-0">
      <span className="text-[12px] text-[#9aa0b0] font-['DM_Mono',monospace] flex-shrink-0">
        {label}
      </span>
      <span className="text-[13px] text-[#0d1117] dark:text-[#f5f1e8] font-medium text-right">
        {valor}
      </span>
    </div>
  )
}
 
// ── Barra de felicidade ───────────────────────────────────────────────────────
 
function BarraFelicidade({ valor }: { valor: number }) {
  const pct = Math.min((valor / 10) * 100, 100)
  const cor =
    valor >= 7 ? "#1d9e75" : valor >= 5 ? "#ef9f27" : "#c8411a"
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="font-['Fraunces',serif] text-2xl font-bold text-[#0d1117] dark:text-[#f5f1e8]">
          {valor.toFixed(1)}
        </span>
        <span className="font-['DM_Mono',monospace] text-[10px] text-[#9aa0b0] uppercase tracking-widest">
          / 10
        </span>
      </div>
      <div className="h-1.5 bg-black/8 dark:bg-white/8 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: cor }}
        />
      </div>
      <span className="font-['DM_Mono',monospace] text-[10px] text-[#9aa0b0] uppercase tracking-widest">
        World Happiness Report
      </span>
    </div>
  )
}
 
// ── Página ────────────────────────────────────────────────────────────────────
 
export default function PaginaPais({ pais }: PaginaPaisProps) {
  const linguas = getLinguas(pais)
 
  return (
    <Layout>
      <Head>
        <title>{pais.nome} — InfoMundi</title>
        <meta
          name="description"
          content={`Dados, curiosidades e estatísticas sobre ${pais.nome}.`}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
 
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="-mx-6 relative h-[55vh] min-h-[360px] max-h-[520px] overflow-hidden mb-0">
        {/* Imagem */}
        <img
          src={pais.imagem}
          alt={`Imagem de ${pais.nome}`}
          className="w-full h-full object-cover"
        />
 
        {/* Gradiente overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-transparent" />
 
        {/* Conteúdo sobre a imagem */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-['DM_Mono',monospace] text-[10px] text-[#f5f1e8]/40 uppercase tracking-widest">
                InfoMundi
              </span>
              <span className="text-[#f5f1e8]/20 text-[10px]">/</span>
              <span className="font-['DM_Mono',monospace] text-[10px] text-[#f5f1e8]/40 uppercase tracking-widest">
                {pais.continente}
              </span>
              <span className="text-[#f5f1e8]/20 text-[10px]">/</span>
              <span className="font-['DM_Mono',monospace] text-[10px] text-[#c8411a] uppercase tracking-widest">
                {pais.nome}
              </span>
            </div>
 
            {/* Nome + capital */}
            <h1 className="font-['Fraunces',serif] text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] text-[#f5f1e8] mb-2">
              {pais.nome}
            </h1>
            <p className="font-['DM_Mono',monospace] text-[12px] text-[#f5f1e8]/50 uppercase tracking-widest">
              {pais.capital} · {pais.continente}
            </p>
          </div>
        </div>
      </section>
 
      {/* ── CORPO ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto">
 
        {/* ── STATS RÁPIDAS (faixa abaixo do hero) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-black/8 dark:border-white/8 -mx-6 px-6">
          {[
            { label: "População", valor: pais.populacaoFormatada ?? pais.populacao },
            { label: "Área", valor: pais.area },
            { label: "Moeda", valor: pais.moeda },
            { label: "Língua", valor: linguas.join(", ") },
          ].map(({ label, valor }) => (
            <div
              key={label}
              className="py-5 pl-6 border-r border-black/8 dark:border-white/8 last:border-r-0"
            >
              <div className="font-['DM_Mono',monospace] text-[9px] text-[#9aa0b0] uppercase tracking-widest mb-1">
                {label}
              </div>
              <div className="font-['Fraunces',serif] text-[15px] font-bold text-[#0d1117] dark:text-[#f5f1e8] leading-tight">
                {valor}
              </div>
            </div>
          ))}
        </div>
 
        {/* ── GRID PRINCIPAL ── */}
        <div className="py-12 grid md:grid-cols-[2fr_1fr] gap-12 items-start">
 
          {/* Coluna esquerda — conteúdo editorial */}
          <div className="space-y-12">
 
            {/* Curiosidades */}
            {pais.curiosidades.length > 0 && (
              <Secao label="Curiosidades">
                <div className="space-y-3">
                  {pais.curiosidades.map((c, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="font-['DM_Mono',monospace] text-[10px] text-[#c8411a] pt-1 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14px] text-[#3a4050] dark:text-[#8a90a0] leading-relaxed font-light">
                        {c}
                      </p>
                    </div>
                  ))}
                </div>
              </Secao>
            )}
 
            {/* Evento atual */}
            <Secao label="Contexto atual">
              <div className="border-l-2 border-[#c8411a] pl-5 py-1">
                <p className="text-[15px] text-[#0d1117] dark:text-[#f5f1e8] leading-relaxed font-['Fraunces',serif] italic">
                  "{pais.eventoAtual}"
                </p>
              </div>
            </Secao>
 
            {/* Turismo */}
            {pais.turismo?.length > 0 && (
              <Secao label="Pontos turísticos">
                <PillList items={pais.turismo} />
              </Secao>
            )}
 
            {/* Comidas */}
            {pais.comidasTipicas?.length > 0 && (
              <Secao label="Culinária típica">
                <PillList items={pais.comidasTipicas} />
              </Secao>
            )}
 
            {/* Esportes */}
            {pais.esportesPopulares?.length > 0 && (
              <Secao label="Esportes populares">
                <PillList items={pais.esportesPopulares} />
              </Secao>
            )}
 
            {/* Feriados */}
            {pais.feriadosPrincipais?.length > 0 && (
              <Secao label="Feriados principais">
                <PillList items={pais.feriadosPrincipais} />
              </Secao>
            )}
 
            {/* Exportações */}
            {pais.principaisExportacoes?.length > 0 && (
              <Secao label="Principais exportações">
                <PillList items={pais.principaisExportacoes} />
              </Secao>
            )}
 
          </div>
 
          {/* Coluna direita — dados e stats */}
          <div className="space-y-6">
 
            {/* Índice de felicidade */}
            <div className="bg-white dark:bg-[#131820] border border-black/8 dark:border-white/8 rounded-2xl p-5">
              <span className="font-['DM_Mono',monospace] text-[10px] text-[#9aa0b0] uppercase tracking-widest block mb-4">
                Índice de felicidade
              </span>
              <BarraFelicidade valor={pais.indiceFelicidade} />
            </div>
 
            {/* Dados gerais */}
            <div className="bg-white dark:bg-[#131820] border border-black/8 dark:border-white/8 rounded-2xl p-5">
              <span className="font-['DM_Mono',monospace] text-[10px] text-[#9aa0b0] uppercase tracking-widest block mb-2">
                Dados gerais
              </span>
              <StatLinha label="PIB" valor={pais.pib} />
              <StatLinha label="Clima" valor={pais.clima} />
              <StatLinha label="Urb. / Rural" valor={pais.populacaoUrbanaRural} />
            </div>
 
            {/* Dados demográficos */}
            {pais.dadosDemograficos && (
              <div className="bg-white dark:bg-[#131820] border border-black/8 dark:border-white/8 rounded-2xl p-5">
                <span className="font-['DM_Mono',monospace] text-[10px] text-[#9aa0b0] uppercase tracking-widest block mb-2">
                  Dados demográficos
                </span>
                {pais.dadosDemograficos.expectativaVida && (
                  <StatLinha label="Expect. vida" valor={pais.dadosDemograficos.expectativaVida} />
                )}
                {pais.dadosDemograficos.taxaAlfabetizacao && (
                  <StatLinha label="Alfabetização" valor={pais.dadosDemograficos.taxaAlfabetizacao} />
                )}
                {pais.dadosDemograficos.indiceDesenvolvimentoHumano && (
                  <StatLinha label="IDH" valor={pais.dadosDemograficos.indiceDesenvolvimentoHumano} />
                )}
              </div>
            )}
 
            {/* Principais cidades */}
            {pais.principaisCidades?.length > 0 && (
              <div className="bg-white dark:bg-[#131820] border border-black/8 dark:border-white/8 rounded-2xl p-5">
                <span className="font-['DM_Mono',monospace] text-[10px] text-[#9aa0b0] uppercase tracking-widest block mb-3">
                  Principais cidades
                </span>
                <div className="space-y-2">
                  {pais.principaisCidades.map((cidade, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="font-['DM_Mono',monospace] text-[9px] text-[#c8411a]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] text-[#0d1117] dark:text-[#f5f1e8]">
                        {cidade}
                        
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
 
            {/* Voltar */}
            <div className="pt-2">
              <BotaoVoltar />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
 
// ── Static generation ─────────────────────────────────────────────────────────
 
export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "src", "data", "paises.json")
  const jsonData = fs.readFileSync(filePath, "utf-8")
  const paises: Pais[] = JSON.parse(jsonData)
 
  return {
    paths: paises.map((pais) => ({ params: { slug: pais.slug } })),
    fallback: false,
  }
}
 
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const filePath = path.join(process.cwd(), "src", "data", "paises.json")
  const jsonData = fs.readFileSync(filePath, "utf-8")
  const paises: Pais[] = JSON.parse(jsonData)
 
  const pais = paises.find((p) => p.slug === slug)
  if (!pais) return { notFound: true }
 
  return { props: { pais } }
}
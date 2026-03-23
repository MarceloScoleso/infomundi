import Head from "next/head"
import Link from "next/link"
import Layout from "../components/Layout"
 
const FUNCIONALIDADES = [
  { numero: "01", titulo: "Exploração por país", descricao: "Dados culturais, geográficos, demográficos e econômicos de 195 países em uma interface única e navegável." },
  { numero: "02", titulo: "Cards interativos", descricao: "Navegação visual por continente com busca em tempo real e filtros intuitivos para descobrir novos países." },
  { numero: "03", titulo: "Dados ricos", descricao: "População, idioma, moeda, IDH, culinária típica, exportações, índice de felicidade e muito mais." },
  { numero: "04", titulo: "Tema claro e escuro", descricao: "Alternância de tema respeitando a preferência do sistema operacional do usuário." },
  { numero: "05", titulo: "Design responsivo", descricao: "Interface adaptada para celulares, tablets e desktops sem perda de experiência." },
  { numero: "06", titulo: "Performance estática", descricao: "Páginas pré-geradas via getStaticProps e getStaticPaths, sem chamadas de API em runtime." },
]
 
const STACK = [
  { sigla: "Nx", nome: "Next.js",       papel: "Framework",   descricao: "Renderização estática e rotas dinâmicas." },
  { sigla: "TS", nome: "TypeScript",    papel: "Linguagem",   descricao: "Tipagem forte com union types semânticos." },
  { sigla: "Tw", nome: "Tailwind CSS",  papel: "Estilização", descricao: "Utilitários com suporte nativo a dark mode." },
  { sigla: "Lc", nome: "Lucide React",  papel: "Ícones",      descricao: "Biblioteca leve com traços consistentes." },
  { sigla: "Js", nome: "JSON estático", papel: "Dados",       descricao: "195 países locais — sem banco, sem latência." },
]
 
export default function Sobre() {
  return (
    <Layout>
      <Head>
        <title>Sobre — InfoMundi</title>
        <meta
          name="description"
          content="Conheça o InfoMundi: uma plataforma de dados e curiosidades sobre 195 países do mundo."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
 
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section aria-labelledby="titulo-principal" className="pt-4 pb-16 md:pt-8 border-b border-black/8 dark:border-white/8">
        <span className="inline-block bg-[#d4eef4] dark:bg-[#1a3a45] text-[#1a5c6e] dark:text-[#6ecbe0] text-[11px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
          O projeto
        </span>
 
        <div className="grid md:grid-cols-2 gap-10 items-end">
          <div>
            <h1
              id="titulo-principal"
              className="font-['Fraunces',serif] text-5xl md:text-6xl font-bold leading-[1.08] text-[#0d1117] dark:text-[#f5f1e8] mb-6"
            >
              Um atlas<br />
              <em className="text-[#c8411a] not-italic">digital</em><br />
              do mundo
            </h1>
            <p className="text-[16px] text-[#3a4050] dark:text-[#8a90a0] font-light leading-relaxed max-w-sm">
              O InfoMundi reúne dados culturais, geográficos e econômicos de
              195 países em uma interface única — curiosa, acessível e bem organizada.
            </p>
          </div>
 
          {/* Cartão de números */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { valor: "195",  label: "Países" },
              { valor: "7",    label: "Continentes" },
              { valor: "40+",  label: "Campos por país" },
              { valor: "1.2k+",label: "Curiosidades" },
              { valor: "100%", label: "Estático" },
              { valor: "∞",    label: "Descobertas" },
            ].map(({ valor, label }) => (
              <div
                key={label}
                className="bg-white dark:bg-[#131820] border border-black/8 dark:border-white/8 rounded-xl p-4 flex flex-col gap-1"
              >
                <span className="font-['Fraunces',serif] text-2xl font-bold text-[#0d1117] dark:text-[#f5f1e8] leading-none">
                  {valor}
                </span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-[#9aa0b0]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── MISSÃO ──────────────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-black/8 dark:border-white/8">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
          <div>
            <span className="text-[11px] font-medium tracking-widest uppercase text-[#9aa0b0]">
              Missão
            </span>
          </div>
          <div className="space-y-5">
            <p className="font-['Fraunces',serif] text-2xl font-bold text-[#0d1117] dark:text-[#f5f1e8] leading-snug">
              "Tornar o conhecimento geográfico e cultural acessível para qualquer pessoa, em qualquer dispositivo."
            </p>
            <p className="text-[15px] text-[#3a4050] dark:text-[#8a90a0] leading-relaxed font-light">
              O projeto nasceu como uma iniciativa educacional com foco em boas práticas
              de desenvolvimento front-end: componentes reutilizáveis, tipagem forte,
              performance estática e design coerente. Mais do que um portfólio técnico,
              é uma ferramenta que as pessoas realmente queiram usar.
            </p>
          </div>
        </div>
      </section>
 
      {/* ── FUNCIONALIDADES — estilo novo (linhas com hover dark) ───────────── */}
      <section className="py-16 border-b border-black/8 dark:border-white/8">
        <div className="flex items-baseline justify-between mb-10">
          <span className="text-[11px] font-medium tracking-widest uppercase text-[#9aa0b0]">
            Funcionalidades
          </span>
          <span className="text-[11px] text-[#9aa0b0]">{FUNCIONALIDADES.length} recursos</span>
        </div>
 
        <div className="divide-y divide-black/8 dark:divide-white/8 border-y border-black/8 dark:border-white/8">
          {FUNCIONALIDADES.map(({ numero, titulo, descricao }) => (
            <div
              key={numero}
              className="grid md:grid-cols-[80px_1fr_2fr] gap-6 items-start py-6 group hover:bg-[#0d1117] dark:hover:bg-white/5 transition-colors duration-200 -mx-2 px-2 rounded-lg cursor-default"
            >
              <span className="font-['DM_Mono',monospace] text-[11px] text-[#c8411a] pt-0.5">
                {numero}
              </span>
              <h3 className="font-['Fraunces',serif] text-[18px] font-bold text-[#0d1117] dark:text-[#f5f1e8] group-hover:text-[#f5f1e8] dark:group-hover:text-[#f5f1e8] transition-colors leading-tight">
                {titulo}
              </h3>
              <p className="text-[13px] text-[#7a8090] dark:text-[#8a90a0] group-hover:text-[#f5f1e8]/50 dark:group-hover:text-[#f5f1e8]/50 leading-relaxed font-light transition-colors">
                {descricao}
              </p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── STACK — estilo novo (cards com papel + hover terracota) ─────────── */}
      <section className="py-16 border-b border-black/8 dark:border-white/8">
        <span className="text-[11px] font-medium tracking-widest uppercase text-[#9aa0b0] block mb-10">
          Tecnologias
        </span>
 
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {STACK.map(({ sigla, nome, papel, descricao }) => (
            <div
              key={nome}
              className="border border-black/10 dark:border-white/10 rounded-2xl p-5 bg-white dark:bg-[#131820] hover:border-[#c8411a]/40 dark:hover:border-[#c8411a]/40 hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0d1117] dark:bg-[#f5f1e8] flex items-center justify-center font-['DM_Mono',monospace] text-[13px] font-bold text-[#f5f1e8] dark:text-[#0d1117]">
                {sigla}
              </div>
              <div>
                <div className="font-['DM_Mono',monospace] text-[9px] text-[#c8411a] uppercase tracking-widest mb-1">
                  {papel}
                </div>
                <div className="font-['Fraunces',serif] text-[15px] font-bold text-[#0d1117] dark:text-[#f5f1e8] mb-1.5">
                  {nome}
                </div>
                <div className="text-[12px] text-[#7a8090] dark:text-[#8a90a0] leading-snug font-light">
                  {descricao}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── AUTOR ───────────────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-black/8 dark:border-white/8">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-center">
          <span className="text-[11px] font-medium tracking-widest uppercase text-[#9aa0b0]">
            Autor
          </span>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-[#0d1117] dark:bg-[#f5f1e8] flex items-center justify-center font-['Fraunces',serif] text-xl font-bold text-[#f5f1e8] dark:text-[#0d1117] flex-shrink-0">
              MA
            </div>
            <div>
              <div className="font-['Fraunces',serif] text-[18px] font-bold text-[#0d1117] dark:text-[#f5f1e8] mb-1">
                Marcelo Antônio
              </div>
              <p className="text-[13px] text-[#7a8090] dark:text-[#8a90a0] font-light leading-relaxed">
                Desenvolvedor front-end apaixonado por interfaces que ensinam.
                O InfoMundi é um projeto de estudo e portfólio com foco em
                Next.js, TypeScript e design de produto.
              </p>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-['Fraunces',serif] text-2xl font-bold text-[#0d1117] dark:text-[#f5f1e8] mb-1">
              Pronto para explorar?
            </p>
            <p className="text-[14px] text-[#7a8090] dark:text-[#8a90a0] font-light">
              195 países esperando para ser descobertos.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#0d1117] dark:bg-[#f5f1e8] text-[#f5f1e8] dark:text-[#0d1117] px-5 py-2.5 rounded-xl text-[13px] font-medium hover:opacity-90 transition-opacity"
            >
              Ver todos os países →
            </Link>
            <Link
              href="/estatisticas"
              className="inline-flex items-center gap-2 bg-transparent border border-black/12 dark:border-white/12 text-[#3a4050] dark:text-[#8a90a0] px-5 py-2.5 rounded-xl text-[13px] font-medium hover:border-black/24 dark:hover:border-white/24 transition-colors"
            >
              Estatísticas globais
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
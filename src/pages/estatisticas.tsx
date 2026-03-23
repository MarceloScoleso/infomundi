import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Head from "next/head";
import Layout from "../components/Layout";
import paisesData from "../data/paises.json";
 
// ── Tipos ────────────────────────────────────────────────────────────────────
 
interface PaisEstatisticas {
  nome: string;
  populacaoMilhoes: number;
  areaMilhoesKm2: number;
  idh: number;
  expectativaVida: number;
  alfabetizacao: number;
  felicidade: number;
}
 
type CampoNumerico = keyof Omit<PaisEstatisticas, "nome">;
 
// ── Parsers (inalterados) ─────────────────────────────────────────────────────
 
function parseMilhao(str: string): number {
  if (!str) return 0;
  const texto = str.toLowerCase().trim();
  let fator = 1;
  if (texto.includes("bilhão") || texto.includes("bilhões")) {
    fator = 1000;
  } else if (texto.includes("milhão") || texto.includes("milhões")) {
    fator = 1;
  } else if (texto.includes("mil") && !texto.includes("milhão")) {
    fator = 0.001;
  } else {
    const apenasNumero = texto.replace(/[^\d.,]/g, "").replace(",", ".");
    const numero = parseFloat(apenasNumero);
    return isNaN(numero) ? 0 : numero / 1_000_000;
  }
  const numeroStr = texto
    .replace(/bilh(ão|ões)/g, "")
    .replace(/milh(ão|ões)/g, "")
    .replace(/mil(?!hão)/g, "")
    .replace(/[^\d.,]/g, "")
    .trim();
  let numeroNormalizado = numeroStr;
  if (numeroStr.includes(",") && numeroStr.includes(".")) {
    numeroNormalizado = numeroStr.replace(/\./g, "").replace(",", ".");
  } else {
    numeroNormalizado = numeroStr.replace(",", ".");
  }
  const numero = parseFloat(numeroNormalizado);
  return isNaN(numero) ? 0 : numero * fator;
}
 
function parseArea(area: string): number {
  return (
    parseFloat(area.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "")) /
    1_000_000
  );
}
 
// ── Config dos gráficos ───────────────────────────────────────────────────────
 
const GRAFICOS: {
  titulo: string;
  subtitulo: string;
  campo: CampoNumerico;
  corMaior: string;
  corMenor: string;
  dominio?: [number, number];
  unidade?: string;
}[] = [
  {
    titulo: "População",
    subtitulo: "em milhões de habitantes",
    campo: "populacaoMilhoes",
    corMaior: "#c8411a",
    corMenor: "#1a5c6e",
    unidade: "mi",
  },
  {
    titulo: "Área",
    subtitulo: "em milhões de km²",
    campo: "areaMilhoesKm2",
    corMaior: "#c8411a",
    corMenor: "#1a5c6e",
    unidade: "mi km²",
  },
  {
    titulo: "IDH",
    subtitulo: "Índice de Desenvolvimento Humano",
    campo: "idh",
    corMaior: "#c8411a",
    corMenor: "#1a5c6e",
    dominio: [0, 1],
  },
  {
    titulo: "Expectativa de Vida",
    subtitulo: "em anos",
    campo: "expectativaVida",
    corMaior: "#c8411a",
    corMenor: "#1a5c6e",
    unidade: "anos",
  },
  {
    titulo: "Alfabetização",
    subtitulo: "taxa percentual da população",
    campo: "alfabetizacao",
    corMaior: "#c8411a",
    corMenor: "#1a5c6e",
    dominio: [0, 100],
    unidade: "%",
  },
  {
    titulo: "Índice de Felicidade",
    subtitulo: "escala de 0 a 10 — World Happiness Report",
    campo: "felicidade",
    corMaior: "#c8411a",
    corMenor: "#1a5c6e",
    dominio: [0, 10],
  },
];
 
// ── Tooltip customizado ───────────────────────────────────────────────────────
 
function CustomTooltip({ active, payload, unidade }: any) {
  if (!active || !payload?.length) return null;
  const { nome, ...rest } = payload[0].payload;
  const valor = payload[0].value;
  return (
    <div className="bg-[#0d1117] text-[#f5f1e8] rounded-xl px-4 py-3 text-[12px] shadow-lg border border-white/10">
      <div className="font-['Fraunces',serif] font-bold text-[14px] mb-1">{nome}</div>
      <div className="text-[#c8411a] font-medium">
        {typeof valor === "number" ? valor.toFixed(2) : valor}
        {unidade ? ` ${unidade}` : ""}
      </div>
    </div>
  );
}
 
// ── Componente de gráfico individual ─────────────────────────────────────────
 
function GraficoBloco({
  titulo,
  subtitulo,
  campo,
  cor,
  dominio,
  unidade,
  dados,
  tipo,
}: {
  titulo: string;
  subtitulo: string;
  campo: CampoNumerico;
  cor: string;
  dominio?: [number, number];
  unidade?: string;
  dados: PaisEstatisticas[];
  tipo: "maior" | "menor";
}) {
  const label = tipo === "maior" ? "10 maiores" : "10 menores";
 
  return (
    <div className="bg-white dark:bg-[#131820] border border-black/8 dark:border-white/8 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <span className="font-['DM_Mono',monospace] text-[9px] text-[#c8411a] uppercase tracking-widest block mb-1">
            {label}
          </span>
          <h3 className="font-['Fraunces',serif] text-[17px] font-bold text-[#0d1117] dark:text-[#f5f1e8] leading-tight">
            {titulo}
          </h3>
          <p className="text-[11px] text-[#9aa0b0] mt-0.5">{subtitulo}</p>
        </div>
        <span
          className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
          style={{ background: cor }}
        />
      </div>
 
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={dados}
          margin={{ top: 0, right: 0, left: -20, bottom: 60 }}
        >
          <XAxis
            dataKey="nome"
            tick={{
              fontSize: 10,
              fill: "#9aa0b0",
              fontFamily: "DM Sans, sans-serif",
            }}
            angle={-40}
            textAnchor="end"
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={dominio}
            tick={{
              fontSize: 10,
              fill: "#9aa0b0",
              fontFamily: "DM Mono, monospace",
            }}
            axisLine={false}
            tickLine={false}
            width={45}
          />
          <Tooltip
            content={<CustomTooltip unidade={unidade} />}
            cursor={{ fill: "rgba(200,65,26,0.06)" }}
          />
          <Bar dataKey={campo} radius={[4, 4, 0, 0]}>
            {dados.map((_, i) => (
              <Cell
                key={i}
                fill={cor}
                opacity={1 - i * 0.06}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
 
// ── Página ────────────────────────────────────────────────────────────────────
 
export default function Estatisticas() {
  const [estatisticas, setEstatisticas] = useState<PaisEstatisticas[]>([]);
  const [ativo, setAtivo] = useState(0);
 
  useEffect(() => {
    const dados: PaisEstatisticas[] = (paisesData as any[]).map((pais) => ({
      nome: pais.nome,
      populacaoMilhoes: parseMilhao(pais.populacao),
      areaMilhoesKm2: pais.area ? parseArea(pais.area) : 0,
      idh: parseFloat(
        pais.dadosDemograficos?.indiceDesenvolvimentoHumano
          ?.replace(/[^0-9.,]/g, "")
          .replace(",", ".") || "0"
      ),
      expectativaVida: parseFloat(
        pais.dadosDemograficos?.expectativaVida
          ?.replace(/[^0-9.,]/g, "")
          .replace(",", ".") || "0"
      ),
      alfabetizacao: parseFloat(
        pais.dadosDemograficos?.taxaAlfabetizacao
          ?.replace(/[^0-9.,]/g, "")
          .replace(",", ".") || "0"
      ),
      felicidade:
        typeof pais.indiceFelicidade === "number" ? pais.indiceFelicidade : 0,
    }));
    setEstatisticas(dados);
  }, []);
 
  const graficoAtivo = GRAFICOS[ativo];
 
  const filtrado = estatisticas.filter(
    (e) =>
      typeof e[graficoAtivo.campo] === "number" &&
      !isNaN(e[graficoAtivo.campo]) &&
      e[graficoAtivo.campo] > 0
  );
 
  const maiores = [...filtrado]
    .sort((a, b) => b[graficoAtivo.campo] - a[graficoAtivo.campo])
    .slice(0, 10);
 
  const menores = [...filtrado]
    .sort((a, b) => a[graficoAtivo.campo] - b[graficoAtivo.campo])
    .slice(0, 10);
 
  return (
    <Layout>
      <Head>
        <title>Estatísticas — InfoMundi</title>
        <meta
          name="description"
          content="Comparativos globais de população, IDH, expectativa de vida, felicidade e mais."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
 
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-4 pb-12 md:pt-8 border-b border-black/8 dark:border-white/8">
        <span className="inline-block bg-[#d4eef4] dark:bg-[#1a3a45] text-[#1a5c6e] dark:text-[#6ecbe0] text-[11px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
          Comparativos globais
        </span>
        <h1 className="font-['Fraunces',serif] text-4xl md:text-5xl font-bold leading-[1.1] text-[#0d1117] dark:text-[#f5f1e8] mb-4 max-w-xl">
          O mundo em{" "}
          <em className="text-[#c8411a] not-italic">números</em>
        </h1>
        <p className="text-[15px] text-[#3a4050] dark:text-[#8a90a0] font-light leading-relaxed max-w-md">
          Rankings comparativos entre os 195 países — dos maiores aos menores
          em população, área, IDH, expectativa de vida, alfabetização e felicidade.
        </p>
      </section>
 
      {/* ── TABS ──────────────────────────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-[#f5f1e8] dark:bg-[#0d1117] border-b border-black/8 dark:border-white/8 -mx-6 px-6 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {GRAFICOS.map((g, i) => (
            <button
              key={g.campo}
              onClick={() => setAtivo(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-[12px] font-medium transition-colors duration-150 ${
                ativo === i
                  ? "bg-[#0d1117] dark:bg-[#f5f1e8] text-[#f5f1e8] dark:text-[#0d1117]"
                  : "text-[#3a4050] dark:text-[#8a90a0] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {g.titulo}
            </button>
          ))}
        </div>
      </div>
 
      {/* ── GRÁFICOS ──────────────────────────────────────────────────────── */}
      {estatisticas.length > 0 && (
        <section className="py-10">
          {/* Cabeçalho da seção ativa */}
          <div className="mb-8">
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="font-['Fraunces',serif] text-2xl font-bold text-[#0d1117] dark:text-[#f5f1e8]">
                {graficoAtivo.titulo}
              </h2>
              <span className="font-['DM_Mono',monospace] text-[11px] text-[#9aa0b0]">
                {graficoAtivo.subtitulo}
              </span>
            </div>
            <p className="text-[12px] text-[#9aa0b0]">
              Exibindo top 10 maiores e menores entre {filtrado.length} países com dados disponíveis
            </p>
          </div>
 
          <div className="grid md:grid-cols-2 gap-5">
            <GraficoBloco
              titulo={graficoAtivo.titulo}
              subtitulo={graficoAtivo.subtitulo}
              campo={graficoAtivo.campo}
              cor={graficoAtivo.corMaior}
              dominio={graficoAtivo.dominio}
              unidade={graficoAtivo.unidade}
              dados={maiores}
              tipo="maior"
            />
            <GraficoBloco
              titulo={graficoAtivo.titulo}
              subtitulo={graficoAtivo.subtitulo}
              campo={graficoAtivo.campo}
              cor={graficoAtivo.corMenor}
              dominio={graficoAtivo.dominio}
              unidade={graficoAtivo.unidade}
              dados={menores}
              tipo="menor"
            />
          </div>
        </section>
      )}
 
      {/* ── LOADING ───────────────────────────────────────────────────────── */}
      {estatisticas.length === 0 && (
        <div className="py-32 text-center">
          <div className="font-['Fraunces',serif] text-[#9aa0b0] text-lg">
            Carregando dados...
          </div>
        </div>
      )}
    </Layout>
  );
}
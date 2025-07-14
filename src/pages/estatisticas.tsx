import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Head from "next/head";
import Layout from "../components/Layout";
import BotaoVoltar from "../components/BotaoVoltar";
import paisesData from "../data/paises.json";

interface PaisEstatisticas {
  nome: string;
  populacaoMilhoes: number;
  areaMilhoesKm2: number;
  idh: number;
  expectativaVida: number;
  alfabetizacao: number;
  felicidade: number;
}

type CampoNumerico =
  | "populacaoMilhoes"
  | "areaMilhoesKm2"
  | "idh"
  | "expectativaVida"
  | "alfabetizacao"
  | "felicidade";

function parseMilhao(str: string): number {
  if (!str) return 0;

  const texto = str.toLowerCase().trim();

  // Detecta unidade com precisão e define o fator correspondente
  let fator = 1;
  if (texto.includes("bilhão") || texto.includes("bilhões")) {
    fator = 1000; // 1 bilhão = 1000 milhões
  } else if (texto.includes("milhão") || texto.includes("milhões")) {
    fator = 1; // 1 milhão = 1 milhão
  } else if (texto.includes("mil") && !texto.includes("milhão")) {
    fator = 0.001; // mil = 0.001 milhão
  } else {
    // Se não tem unidade, pode ser número puro de pessoas (ex: "800")
    // interpretamos como número absoluto, vamos converter para milhões
    // Exemplo: 800 (pessoas) = 0.0008 milhões
    const apenasNumero = texto.replace(/[^\d.,]/g, "").replace(",", ".");
    const numero = parseFloat(apenasNumero);
    return isNaN(numero) ? 0 : numero / 1_000_000;
  }

  // Remove as palavras das unidades e caracteres que não sejam números, ponto ou vírgula
  const numeroStr = texto
    .replace(/bilh(ão|ões)/g, "")
    .replace(/milh(ão|ões)/g, "")
    .replace(/mil(?!hão)/g, "") // remove "mil" mas não "milhão"
    .replace(/[^\d.,]/g, "")
    .trim();

  // Normaliza número: trata casos tipo "1.234,56" e "1234.56"
  let numeroNormalizado = numeroStr;
  if (numeroStr.includes(",") && numeroStr.includes(".")) {
    // remove pontos de milhar e troca vírgula por decimal
    numeroNormalizado = numeroStr.replace(/\./g, "").replace(",", ".");
  } else {
    // troca vírgula por decimal
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

export default function Estatisticas() {
  const [estatisticas, setEstatisticas] = useState<PaisEstatisticas[]>([]);

  useEffect(() => {
  const dados: PaisEstatisticas[] = paisesData.map((pais) => ({
    nome: pais.nome,
    populacaoMilhoes: parseMilhao(pais.populacao),
    areaMilhoesKm2: pais.area ? parseArea(pais.area) : 0,
    idh: parseFloat(
      pais.dadosDemograficos?.indiceDesenvolvimentoHumano?.replace(/[^0-9.,]/g, "").replace(",", ".") || "0"
    ),
    expectativaVida: parseFloat(
      pais.dadosDemograficos?.expectativaVida?.replace(/[^0-9.,]/g, "").replace(",", ".") || "0"
    ),
    alfabetizacao: parseFloat(
      pais.dadosDemograficos?.taxaAlfabetizacao?.replace(/[^0-9.,]/g, "").replace(",", ".") || "0"
    ),
    felicidade: typeof pais.indiceFelicidade === "number" ? pais.indiceFelicidade : 0,
  }));

  console.log(
  paisesData.map((pais) => ({
    nome: pais.nome,
    populacaoOriginal: pais.populacao,
    populacaoMilhoes: parseMilhao(pais.populacao),
  }))
);

  setEstatisticas(dados);
}, []);

  function renderGraficos(
    titulo: string,
    campo: CampoNumerico,
    cor: string,
    dominio?: [number, number]
  ) {
    const filtrado = estatisticas.filter(
      (e) => typeof e[campo] === "number" && !isNaN(e[campo])
    );

    const maiores = [...filtrado]
      .sort((a, b) => Number(b[campo]) - Number(a[campo]))
      .slice(0, 10);

    const menores = [...filtrado]
      .sort((a, b) => Number(a[campo]) - Number(b[campo]))
      .slice(0, 10);

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
          {titulo}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Maiores */}
          <div>
            <h3 className="text-md font-semibold text-green-600 mb-1">
              10 países com maior {titulo.toLowerCase()}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={maiores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis domain={dominio} />
                <Tooltip />
                <Bar dataKey={campo} fill={cor} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Menores */}
          <div>
            <h3 className="text-md font-semibold text-red-600 mb-1">
              10 países com menor {titulo.toLowerCase()}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={menores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis domain={dominio} />
                <Tooltip />
                <Bar dataKey={campo} fill={cor} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Estatísticas - InfoMundi 🌍</title>
      </Head>

      <section className="space-y-12">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 text-center">
          Estatísticas Comparativas
        </h1>

        {estatisticas.length > 0 && (
          <>
            {renderGraficos("População (em milhões)", "populacaoMilhoes", "#6366f1")}
            {renderGraficos("Área (em milhões km²)", "areaMilhoesKm2", "#10b981")}
            {renderGraficos("IDH", "idh", "#f59e0b", [0, 1])}
            {renderGraficos("Expectativa de Vida", "expectativaVida", "#8b5cf6")}
            {renderGraficos("Taxa de Alfabetização (%)", "alfabetizacao", "#ec4899", [0, 100])}
            {renderGraficos("Índice de Felicidade", "felicidade", "#ef4444", [0, 10])}
          </>
        )}
        
        <BotaoVoltar />
      </section>
    </Layout>
  );
}

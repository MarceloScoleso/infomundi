import { useEffect, useState } from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";
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

function parseMilhao(str: string): number {
  const match = str.match(/\d+[\,\.]?\d*/);
  return match ? parseFloat(match[0].replace(",", ".")) : 0;
}

function parseArea(area: string): number {
  return parseFloat(area.replace(/\./g, "").replace(",", ".").replace(/[^\d\.]/g, "")) / 1_000_000;
}

export default function Estatisticas() {
  const [estatisticas, setEstatisticas] = useState<PaisEstatisticas[]>([]);

  useEffect(() => {
    const dados = paisesData.map((pais) => ({
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
      felicidade: pais.indiceFelicidade,
    }));
    setEstatisticas(dados);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Estatísticas - InfoMundi 🌍</title>
      </Head>

      <BotaoVoltar />

      <section className="space-y-12">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 text-center">
          Estatísticas Comparativas
        </h1>

        {estatisticas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* População */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
                População (em milhões)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={estatisticas} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="populacaoMilhoes" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Área */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
                Área (em milhões km²)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={estatisticas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="areaMilhoesKm2" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* IDH */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
                IDH
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={estatisticas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Bar dataKey="idh" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Expectativa de Vida */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
                Expectativa de Vida
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={estatisticas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="expectativaVida" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Alfabetização */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
                Taxa de Alfabetização (%)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={estatisticas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="alfabetizacao" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Felicidade */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
                Índice de Felicidade
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={estatisticas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar dataKey="felicidade" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
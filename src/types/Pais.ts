// ─── Tipos auxiliares ────────────────────────────────────────────────────────
 
export type Continente =
  | "África"
  | "América do Norte"
  | "América do Sul"
  | "América Central"
  | "Ásia"
  | "Europa"
  | "Oceania"
  | "Europa/Ásia"
  | "Ásia/Europa"
 
/** Escala de 0 a 10 — fonte: World Happiness Report */
export type IndiceFelicidade = number
 
export interface DadosDemograficos {
  /** Ex: "76 anos" */
  expectativaVida: string
  /** Ex: "93%" */
  taxaAlfabetizacao: string
  /** Ex: "0,765 (alto)" — escala PNUD de 0 a 1 */
  indiceDesenvolvimentoHumano: string
}
 
// ─── Tipo enxuto para listagem (home) ────────────────────────────────────────
 
/**
 * Subconjunto leve de Pais, ideal para o grid da home page.
 * Evita carregar ~40 campos de 195 países desnecessariamente.
 */
export interface PaisCard {
  slug: string
  nome: string
  continente: Continente
  imagem: string
  /** Primeiro item usado como resumo no card */
  curiosidades: string[]
}
 
// ─── Tipo completo para página de detalhe ────────────────────────────────────
 
export interface Pais extends PaisCard {
  populacaoFormatada: string
  /**
   * Valor numérico em milhões de pessoas.
   * Permite ordenação e filtros por faixa.
   * Ex: Brasil → 214, China → 1425
   */
  populacao: number
 
  /** Escala de 0 a 10 — fonte: World Happiness Report */
  indiceFelicidade: IndiceFelicidade
 
  /** Pode ser múltiplos idiomas — Ex: ["Inglês", "Francês"] ou "Português" */
  linguaOficial: string | string[]
 
  moeda: string
  capital: string
 
  /** Ex: "8.515.767 km²" */
  area: string
 
  /** Ex: "1,44 trilhão USD (2023)" */
  pib: string
 
  clima: string
  principaisCidades: string[]
  turismo: string[]
  feriadosPrincipais: string[]
 
  /** Ex: "87% urbana, 13% rural" */
  populacaoUrbanaRural: string
 
  esportesPopulares: string[]
  dadosDemograficos: DadosDemograficos
  comidasTipicas: string[]
  principaisExportacoes: string[]
 
  /**
   * Evento ou contexto atual do país.
   * @note Atualizar periodicamente — dados de 2023/2024.
   */
  eventoAtual: string
}
 
// ─── Helpers de tipo ─────────────────────────────────────────────────────────
 
/** Normaliza linguaOficial para sempre retornar array */
export function getLinguas(pais: Pais): string[] {
  return Array.isArray(pais.linguaOficial)
    ? pais.linguaOficial
    : [pais.linguaOficial]
}
 
/** Retorna a primeira curiosidade como resumo do card */
export function getResumo(pais: Pick<Pais, "curiosidades">): string {
  return pais.curiosidades[0] ?? ""
}
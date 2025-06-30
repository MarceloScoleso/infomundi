export interface Pais {
  slug: string
  nome: string
  continente: string
  populacao: string
  indiceFelicidade: number
  linguaOficial: string
  moeda: string
  capital: string
  area?: string
  pib?: string
  clima?: string
  principaisCidades?: string[]
  turismo?: string[]
  feriadosPrincipais?: string[]
  populacaoUrbanaRural?: string
  esportesPopulares?: string[]
  curiosidades: string[]
  dadosDemograficos?: {
    expectativaVida?: string
    taxaAlfabetizacao?: string
    indiceDesenvolvimentoHumano?: string
  }
  comidasTipicas: string[]
  principaisExportacoes?: string[]
  eventoAtual: string
  imagem: string
}
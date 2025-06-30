import Link from "next/link"
import { Pais } from "../types/Pais"

export default function CardPais({ pais }: { pais: Pais }) {
  return (
    <Link href={`/pais/${pais.slug}`} aria-label={`Veja detalhes do país ${pais.nome}`}>
      <article className="block w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-700 overflow-hidden transition transform hover:scale-[1.02] hover:shadow-xl">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl">
          <img
            src={pais.imagem}
            alt={`Imagem de ${pais.nome}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">{pais.nome}</h2>
          <p className="text-blue-500 italic dark:text-blue-300">{pais.continente}</p>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
            {pais.curiosidades?.[0] || pais.curiosidades}
          </p>
        </div>
      </article>
    </Link>
  )
}
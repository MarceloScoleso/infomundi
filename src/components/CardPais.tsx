import Link from "next/link"
import { PaisCard, getResumo } from "../types/Pais"
 
export default function CardPais({ pais }: { pais: PaisCard }) {
  return (
    <Link href={`/pais/${pais.slug}`} aria-label={`Veja detalhes do país ${pais.nome}`}>
      <article className="group bg-white dark:bg-[#131820] border border-black/8 dark:border-white/8 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(13,17,23,0.10)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-250 cursor-pointer h-full flex flex-col">
 
        {/* Imagem */}
        <div className="aspect-[16/9] w-full overflow-hidden relative bg-[#ede9de] dark:bg-[#1a2030]">
          <img
            src={pais.imagem}
            alt={`Imagem de ${pais.nome}`}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            loading="lazy"
          />
          {/* Badge continente */}
          <span className="absolute top-3 left-3 bg-black/60 dark:bg-black/70 text-white/90 text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm">
            {pais.continente}
          </span>
        </div>
 
        {/* Corpo */}
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="font-['Fraunces',serif] text-[17px] font-bold text-[#0d1117] dark:text-[#f5f1e8] mb-1.5 leading-tight">
            {pais.nome}
          </h2>
          <p className="text-[12px] text-[#7a8090] dark:text-[#8a90a0] leading-relaxed line-clamp-2 flex-grow">
            {getResumo(pais)}
          </p>
 
          {/* Footer do card */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/6 dark:border-white/6">
            <span className="text-[11px] text-[#9aa0b0] dark:text-[#606880] font-medium tracking-wide uppercase">
              Ver detalhes
            </span>
            <div className="w-6 h-6 rounded-full bg-[#f0ece0] dark:bg-[#1e2535] flex items-center justify-center text-[11px] text-[#3a4050] dark:text-[#8a90a0] group-hover:bg-[#c8411a] group-hover:text-white transition-colors duration-200">
              →
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
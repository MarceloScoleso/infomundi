import Link from "next/link"
 
export default function BotaoVoltar() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 text-[13px] font-medium text-[#3a4050] dark:text-[#8a90a0] hover:text-[#0d1117] dark:hover:text-[#f5f1e8] transition-colors duration-200 group"
    >
      <span className="w-7 h-7 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-[#c8411a]/40 group-hover:text-[#c8411a] transition-colors duration-200">
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </span>
      Voltar para a página inicial
    </Link>
  )
}
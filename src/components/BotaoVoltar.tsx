import Link from "next/link"

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

export default function BotaoVoltar() {
  return (
    <div className="mb-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 font-medium transition"
      >
        <ArrowLeftIcon />
        Voltar para a página inicial
      </Link>
    </div>
  )
}
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  function toggleDark() {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-blue-600 dark:text-blue-400 text-3xl font-extrabold tracking-tight hover:text-indigo-500 dark:hover:text-indigo-300 transition">
          InfoMundi 🌍
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-6 text-blue-600 dark:text-blue-400 font-medium">
          <Link href="/" className="hover:text-blue-500 dark:hover:text-blue-300 transition">Home</Link>
          <Link href="/sobre" className="hover:text-blue-500 dark:hover:text-blue-300 transition">Sobre</Link>
          <Link href="/estatisticas" className="hover:text-blue-500 dark:hover:text-blue-300 transition">Estatísticas</Link>
          <Link href="/contato" className="hover:text-blue-500 dark:hover:text-blue-300 transition">Contato</Link>
        </nav>

        {/* Botões */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDark}
            aria-label="Alternar tema claro e escuro"
            className="text-blue-500 dark:text-blue-300 font-medium transition focus:outline-none"
          >
            {isDark ? "☀️ Claro" : "🌙 Escuro"}
          </button>

          {/* Botão para abrir menu mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-blue-600 dark:text-blue-400 focus:outline-none"
            aria-label="Abrir menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" /> // X para fechar
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" /> // 3 linhas menu
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-800 px-6 py-4 space-y-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-500">
          <Link href="/" className="block text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 dark:hover:text-indigo-300 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/sobre" className="block text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 dark:hover:text-indigo-300 transition" onClick={() => setMenuOpen(false)}>Sobre</Link>
          <Link href="/estatisticas" className="block text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 dark:hover:text-indigo-300 transition" onClick={() => setMenuOpen(false)}>Estatísticas</Link>
          <Link href="/contato" className="block text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 dark:hover:text-indigo-300 transition" onClick={() => setMenuOpen(false)}>Contato</Link>
        </nav>
      )}
    </header>
  )
}
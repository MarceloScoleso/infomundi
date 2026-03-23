import Link from "next/link"
import { useState, useEffect } from "react"
 
export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
 
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])
 
  function toggleDark() {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }
 
  return (
    <header className="bg-[#0d1117] dark:bg-[#080b10] sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
 
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-[#c8411a] group-hover:scale-125 transition-transform duration-200" />
          <span className="font-['Fraunces',serif] text-xl font-bold text-[#f5f1e8] tracking-tight">
            InfoMundi
          </span>
        </Link>
 
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { href: "/", label: "Home" },
            { href: "/sobre", label: "Sobre" },
            { href: "/estatisticas", label: "Estatísticas" },
            { href: "/contato", label: "Contato" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] text-[#f5f1e8]/50 hover:text-[#f5f1e8] transition-colors duration-200 tracking-wide"
            >
              {label}
            </Link>
          ))}
 
          <button
            onClick={toggleDark}
            aria-label="Alternar tema"
            className="ml-2 text-[12px] text-[#f5f1e8]/50 hover:text-[#f5f1e8] border border-white/10 rounded-full px-3 py-1 transition-colors duration-200"
          >
            {isDark ? "☀ Claro" : "☽ Escuro"}
          </button>
        </nav>
 
        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
          className="md:hidden text-[#f5f1e8]/60 hover:text-[#f5f1e8] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>
 
      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-[#0d1117] border-t border-white/5 px-6 py-5 flex flex-col gap-4">
          {[
            { href: "/", label: "Home" },
            { href: "/sobre", label: "Sobre" },
            { href: "/estatisticas", label: "Estatísticas" },
            { href: "/contato", label: "Contato" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[14px] text-[#f5f1e8]/60 hover:text-[#f5f1e8] transition-colors"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => { toggleDark(); setMenuOpen(false) }}
            className="text-left text-[13px] text-[#f5f1e8]/50 hover:text-[#f5f1e8] transition-colors"
          >
            {isDark ? "☀ Modo claro" : "☽ Modo escuro"}
          </button>
        </nav>
      )}
    </header>
  )
}
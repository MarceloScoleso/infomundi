import { ReactNode } from "react"
import Header from "./Header"

interface LayoutProps {
  children: ReactNode
  exibirBusca?: boolean
}

export default function Layout({ children = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-500">
      <Header/>
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10">
        {children}
      </main>
      <footer className="bg-indigo-600 dark:bg-indigo-800 text-indigo-100 dark:text-indigo-200 text-center text-sm py-6 mt-20 transition-colors duration-500">
        © {new Date().getFullYear()} InfoMundi. Criado por Marcelo Antônio.
      </footer>
    </div>
  )
}
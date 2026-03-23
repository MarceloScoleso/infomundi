import { ReactNode } from "react"
import Header from "./Header"
 
interface LayoutProps {
  children: ReactNode
}
 
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f1e8] dark:bg-[#0d1117] text-[#0d1117] dark:text-[#f5f1e8] font-['DM_Sans',sans-serif] transition-colors duration-300">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10">
        {children}
      </main>
      <footer className="bg-[#0d1117] dark:bg-[#080b10] text-[#f5f1e8]/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-['Fraunces',serif] text-[#f5f1e8]/80 font-bold text-base">InfoMundi</span>
          <span className="text-[12px]">© {new Date().getFullYear()} InfoMundi · Criado por Marcelo Antônio</span>
        </div>
      </footer>
    </div>
  )
}
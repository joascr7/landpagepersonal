import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-xl font-bold">Landpage<span className="text-amber-500">Pro</span></div>
        <div className="hidden md:flex gap-8 text-sm text-neutral-400">
          <Link href="#inicio" className="hover:text-white transition">Início</Link>
          <Link href="#recursos" className="hover:text-white transition">Recursos</Link>
          <Link href="#planos" className="hover:text-white transition">Planos</Link>
          <Link href="#depoimentos" className="hover:text-white transition">Depoimentos</Link>
        </div>
        <Link href="#planos" className="bg-amber-500 hover:bg-amber-600 text-neutral-950 px-4 py-2 rounded-lg text-sm font-bold transition-all">
          Criar Meu Site
        </Link>
      </div>
    </nav>
  );
}
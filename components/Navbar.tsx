import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo da sua Marca (Clica e volta pra Home) */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-black text-xl tracking-tighter">
              PT
            </div>
            <span className="text-white font-black text-lg tracking-wider uppercase hidden sm:block">
              Consultoria <span className="text-amber-500">Fitness</span>
            </span>
          </Link>

          {/* Links de Navegação */}
          <nav className="flex items-center gap-6 md:gap-8">
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-neutral-400">
              <Link href="/#como-funciona" className="hover:text-white transition-colors">
                Como funciona?
              </Link>
              <Link href="/#app" className="hover:text-white transition-colors">
                Nosso app
              </Link>
              {/* Agora aponta para a página da loja */}
              <Link href="/loja" className="hover:text-white transition-colors">
                Loja
              </Link>
            </div>

            
            {/* Botão de Destaque atualizado para a nova página */}
            <Link
             href="/planilhas-prontas"
             className="px-5 py-2.5 rounded-full bg-amber-500 text-neutral-950 font-bold text-sm hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/10"
              >
             Planilhas prontas
             </Link>

            {/* Suporte WhatsApp */}
            <a
              href="https://wa.me/SEUNUMERO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-green-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" h="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.294c-.217-.109-1.283-.634-1.482-.707-.198-.074-.342-.109-.487.11-.145.217-.56.707-.686.852-.127.145-.253.163-.47.054-.218-.11-.922-.34-1.754-1.082-.647-.578-1.083-1.293-1.21-1.51-.127-.217-.014-.334.096-.442.1-.099.217-.253.325-.38.108-.127.145-.218.217-.362.073-.145.037-.272-.018-.38-.055-.109-.487-1.177-.667-1.61-.177-.432-.37-.373-.487-.379-.113-.005-.242-.006-.37-.006-.127 0-.335.048-.51.24-.175.192-.667.653-.667 1.593 0 .94.684 1.848.78 1.976.096.128 1.345 2.053 3.259 2.877.455.196.81.314 1.086.402.457.145.874.124 1.205.075.369-.054 1.283-.524 1.463-1.03.18-.507.18-.941.127-1.03-.054-.09-.2-.144-.417-.254z"/>
              </svg>
            </a>
          </nav>

        </div>
      </div>
    </header>
  );
}
import Link from "next/link";

export default function LandingPagePrincipal() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-amber-500 selection:text-neutral-950 overflow-x-hidden scroll-smooth">
      
      {/* MENU SUPERIOR */}
      <header className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">
            Landpage<span className="text-amber-500">Pro</span>
          </div>
          <Link 
            href="#planos" 
            className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold px-4 py-2 rounded-lg text-sm transition-all"
          >
            Criar Meu Site
          </Link>
        </div>
      </header>

      {/* APRESENTAÇÃO PRINCIPAL (HERO) */}
      <section className="py-20 md:py-32 max-w-5xl mx-auto px-4 text-center">
        <span className="text-amber-500 text-sm font-semibold tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-full">
          Para Personal Trainers e Profissionais Autônomos
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mt-6 tracking-tight leading-tight">
          Tenha uma Landing Page Profissional <br />
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            em menos de 5 minutos
          </span>
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
          Conquiste mais clientes com um site de alta conversão integrado diretamente ao seu WhatsApp. Escolha suas cores, defina seus preços e gerencie tudo facilmente.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="#planos" 
            className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-amber-500/20 transition-all text-center"
          >
            Começar Agora
          </Link>
          <Link 
            href="/joasvieira" 
            target="_blank"
            className="border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-900 px-8 py-4 rounded-xl text-lg font-medium transition-all text-center"
          >
            Ver Demonstração 
          </Link>
        </div>
      </section>

      {/* SEÇÃO DE PLANOS / PREÇOS */}
      <section id="planos" className="py-20 border-t border-neutral-900 bg-neutral-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Um plano simples para o seu bolso</h2>
          <p className="text-neutral-400 mt-2">Sem taxas ocultas. Cancele quando quiser.</p>

          <div className="mt-12 max-w-md mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-neutral-950 font-bold text-xs px-4 py-1 rounded-bl-xl uppercase tracking-wider">
              Popular
            </div>
            <h3 className="text-2xl font-bold text-left">Plano Mensal Pro</h3>
            <p className="text-neutral-400 text-sm text-left mt-1">Ideal para profissionais autônomos.</p>
            
            <div className="flex items-baseline gap-1 my-6">
              <span className="text-4xl font-extrabold tracking-tight">R$ 29,90</span>
              <span className="text-neutral-400 text-sm">/mês</span>
            </div>

            <ul className="space-y-3 text-left text-neutral-300 border-t border-neutral-800 pt-6">
              <li className="flex items-center gap-2 text-sm">✨ Site 100% Personalizado</li>
              <li className="flex items-center gap-2 text-sm">🎨 Alteração de cores e nicho</li>
              <li className="flex items-center gap-2 text-sm">📱 Botão direto para seu WhatsApp</li>
              <li className="flex items-center gap-2 text-sm">⚡ Hospedagem ultra rápida inclusa</li>
            </ul>

            {/* 👇 LINK DE PAGAMENTO (Kiwify, Asaas, Mercado Pago, etc) */}
            <a 
              href="https://pay.kiwify.com.br/biQ4H52" 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-center py-3 rounded-xl mt-8 transition-all"
            >
              Quero Meu Site Profissional
            </a>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-neutral-900 py-8 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} LandpagePro. Todos os direitos reservados.
      </footer>
    </main>
  );
}
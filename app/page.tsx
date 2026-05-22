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
          <Link href="#planos" className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold px-4 py-2 rounded-lg text-sm transition-all">
            Criar Meu Site
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="py-20 md:py-32 max-w-5xl mx-auto px-4 text-center">
        <span className="text-amber-500 text-sm font-semibold tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-full">
          Para Personal Trainers e Esteticistas
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mt-6 tracking-tight leading-tight">
          Tenha seu site profissional <br />
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            em menos de 5 minutos
          </span>
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
          Gerencie seus serviços, fotos e contatos em um painel administrativo exclusivo. Tudo integrado e pronto para converter.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#planos" className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-amber-500/20 transition-all text-center">
            Começar Agora
          </Link>
          <Link href="/joasvieira" target="_blank" className="border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-900 px-8 py-4 rounded-xl text-lg font-medium transition-all text-center">
            Ver Demonstração
          </Link>
        </div>
      </section>

      {/* SEÇÃO DE PLANOS / PREÇOS */}
<section id="planos" className="py-24 border-t border-neutral-900 bg-neutral-950">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
      Escolha o seu <span className="text-amber-500">nível de crescimento</span>
    </h2>
    <p className="text-neutral-400 mt-6 text-lg max-w-2xl mx-auto">
      Soluções desenhadas para transformar sua presença digital e escalar seus resultados com suporte de especialistas.
    </p>

    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      
      {/* PLANO STARTER */}
      <div className="bg-neutral-900/20 border border-neutral-800 rounded-3xl p-8 text-left hover:border-neutral-700 transition-all duration-300">
        <h3 className="text-lg font-bold text-neutral-300">Starter</h3>
        <p className="text-neutral-500 text-xs mt-1">Para quem quer começar rápido.</p>
        <div className="flex items-baseline gap-1 my-8">
          <span className="text-4xl font-black text-white">R$ 29,90</span>
          <span className="text-neutral-500 text-sm">/mês</span>
        </div>
        <ul className="space-y-4 text-neutral-400 border-t border-neutral-800 pt-6">
          <li className="flex items-center gap-3 text-sm">✓ Site 100% editável</li>
          <li className="flex items-center gap-3 text-sm opacity-50">✓ Painel administrativo</li>
          <li className="flex items-center gap-3 text-sm">✓ Botão WhatsApp</li>
          <li className="flex items-center gap-3 text-sm">✓ Hospedagem ultra rápida</li>
        </ul>
        <a href="https://pay.kiwify.com.br/biQ4H52" target="_blank" className="block w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-center py-4 rounded-xl mt-10 transition-all">
          Escolher Starter
        </a>
      </div>

      {/* PLANO PRO (O DESTAQUE) */}
      <div className="relative bg-neutral-900 border border-amber-500/30 rounded-3xl p-8 text-left shadow-2xl shadow-amber-500/10 scale-105 z-10">
        <div className="absolute -top-3 right-8 bg-amber-500 text-neutral-950 font-black text-[10px] px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
          Mais Vendido
        </div>
        <h3 className="text-lg font-bold text-white">Pro Evolution</h3>
        <p className="text-amber-500 text-xs mt-1 font-medium">Acelerador de conversão.</p>
        <div className="flex items-baseline gap-1 my-8">
          <span className="text-4xl font-black text-white">R$ 59,90</span>
          <span className="text-neutral-400 text-sm">/mês</span>
        </div>
        <ul className="space-y-4 text-white border-t border-amber-500/20 pt-6">
          <li className="flex items-center gap-3 text-sm">★ <span className="font-bold text-amber-500">Tudo do Starter +</span></li>
          <li className="flex items-center gap-3 text-sm">★ Suporte VIP no WhatsApp</li>
          <li className="flex items-center gap-3 text-sm">★ Painel administrativo</li>
          <li className="flex items-center gap-3 text-sm">★ Hospedagem premium</li>
        </ul>
        <a href="https://pay.kiwify.com.br/biQ4H52" target="_blank" className="block w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-center py-4 rounded-xl mt-10 transition-all shadow-lg shadow-amber-500/20">
          Quero o Pro Evolution
        </a>
      </div>

      {/* PLANO AGÊNCIA */}
      <div className="bg-neutral-900/20 border border-neutral-800 rounded-3xl p-8 text-left hover:border-neutral-700 transition-all duration-300">
        <h3 className="text-lg font-bold text-neutral-300">Agência Full</h3>
        <p className="text-neutral-500 text-xs mt-1">Negócio pronto para escalar.</p>
        <div className="flex items-baseline gap-1 my-8">
          <span className="text-4xl font-black text-white">R$ 149,90</span>
          <span className="text-neutral-500 text-sm">/mês</span>
        </div>
        <ul className="space-y-4 text-neutral-400 border-t border-neutral-800 pt-6">
          <li className="flex items-center gap-3 text-sm">✓ Tudo do Pro Evolution</li>
          <li className="flex items-center gap-3 text-sm">✓ Domínio (.com.br)</li>
          <li className="flex items-center gap-3 text-sm">✓ Suporte para códigos</li>
          <li className="flex items-center gap-3 text-sm">✓ Setup de Anúncios</li>
        </ul>
        <a href="https://pay.kiwify.com.br/biQ4H52" target="_blank" className="block w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-center py-4 rounded-xl mt-10 transition-all">
          Consultoria Agência
        </a>
      </div>
    </div>
  </div>
</section>

      <footer className="border-t border-neutral-900 py-8 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} LandpagePro. Todos os direitos reservados.
      </footer>
    </main>
  );
}
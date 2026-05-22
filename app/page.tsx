import Link from "next/link";

export default function LandingPagePrincipal() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-amber-500 selection:text-neutral-950 overflow-x-hidden scroll-smooth">
      
      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight">Landpage<span className="text-amber-500">Pro</span></div>
        <div className="hidden md:flex gap-8 text-sm text-neutral-400">
          <Link href="#inicio" className="hover:text-white transition">Início</Link>
          <Link href="#planos" className="hover:text-white transition">Planos</Link>
        </div>
        <Link href="#planos" className="bg-amber-500 hover:bg-amber-600 text-neutral-950 px-6 py-2 rounded-full text-sm font-bold transition-all">
          Criar Meu Site
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section id="inicio" className="pt-20 pb-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] bg-amber-500/10 px-3 py-1 rounded-full">Para Personal Trainers e Estúdios</span>
          <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight text-white">
            Tenha seu site profissional <br />
            <span className="text-amber-500">em menos de 5 minutos</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-lg">Gerencie serviços, fotos e contatos em um painel administrativo exclusivo. Tudo integrado e pronto para converter leads em clientes.</p>
          <Link href="#planos" className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black px-10 py-5 rounded-2xl inline-block transition-all text-lg shadow-[0_0_30px_rgba(245,158,11,0.3)]">
            Começar Agora
          </Link>
        </div>
        
        {/* MOCKUP COM AURA (Sem borda, apenas efeito de brilho) */}
        <div className="relative flex justify-center items-center">
          {/* Efeito de Aura (Glow) atrás da imagem */}
          <div className="absolute w-[300px] h-[300px] bg-amber-500/20 rounded-full blur-[100px] z-0"></div>
          
          {/* Imagem do Celular sem borda */}
          <div className="relative z-10 w-full max-w-[320px]">
             <img src="/mockup.png" alt="LandpagePro Mockup" className="w-full drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-neutral-900/50">
        {[
          { val: "+120", label: "SITES ENTREGUES" },
          { val: "+80", label: "CLIENTES ATIVOS" },
          { val: "99,9%", label: "UPTIME GARANTIDO" },
          { val: "7 DIAS", label: "SUPORTE VIP" },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl font-black text-white">{item.val}</p>
            <p className="text-[10px] font-bold text-neutral-500 tracking-[0.2em] mt-2">{item.label}</p>
          </div>
        ))}
      </section>

      {/* 4. PLANOS */}
      <section id="planos" className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white">Escolha o seu <span className="text-amber-500">nível de crescimento</span></h2>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* PLANO STARTER */}
            <div className="bg-neutral-900/20 border border-neutral-800 rounded-3xl p-8 text-left hover:border-neutral-700 transition-all">
              <h3 className="text-lg font-bold text-neutral-300">Starter</h3>
              <div className="flex items-baseline gap-1 my-8">
                <span className="text-4xl font-black text-white">R$ 29,90</span>
                <span className="text-neutral-500 text-sm">/mês</span>
              </div>
              <ul className="space-y-4 text-neutral-400 border-t border-neutral-800 pt-6">
                <li>✓ Site 100% editável</li>
                <li>✓ Painel administrativo</li>
                <li>✓ Botão WhatsApp</li>
              </ul>
              <a href="https://pay.kiwify.com.br/biQ4H52" className="block w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-center py-4 rounded-xl mt-10">Escolher Starter</a>
            </div>

            {/* PLANO PRO (DESTAQUE) */}
            <div className="relative bg-neutral-900 border border-amber-500/30 rounded-3xl p-8 text-left shadow-2xl shadow-amber-500/10 scale-105 z-10">
              <div className="absolute -top-3 right-8 bg-amber-500 text-neutral-950 font-black text-[10px] px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">Mais Vendido</div>
              <h3 className="text-lg font-bold text-white">Pro Evolution</h3>
              <div className="flex items-baseline gap-1 my-8">
                <span className="text-4xl font-black text-white">R$ 59,90</span>
                <span className="text-neutral-400 text-sm">/mês</span>
              </div>
              <ul className="space-y-4 text-white border-t border-amber-500/20 pt-6">
                <li className="font-bold text-amber-500">★ Tudo do Starter +</li>
                <li>★ Suporte VIP no WhatsApp</li>
                <li>★ Domínio personalizado</li>
              </ul>
              <a href="https://pay.kiwify.com.br/biQ4H52" className="block w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-center py-4 rounded-xl mt-10 shadow-lg shadow-amber-500/20">Quero o Pro</a>
            </div>

            {/* PLANO AGÊNCIA */}
            <div className="bg-neutral-900/20 border border-neutral-800 rounded-3xl p-8 text-left hover:border-neutral-700 transition-all">
              <h3 className="text-lg font-bold text-neutral-300">Agência Full</h3>
              <div className="flex items-baseline gap-1 my-8">
                <span className="text-4xl font-black text-white">R$ 149,90</span>
                <span className="text-neutral-500 text-sm">/mês</span>
              </div>
              <ul className="space-y-4 text-neutral-400 border-t border-neutral-800 pt-6">
                <li>✓ Tudo do Pro Evolution</li>
                <li>✓ Setup de Anúncios</li>
                <li>✓ Relatórios Mensais</li>
              </ul>
              <a href="https://pay.kiwify.com.br/biQ4H52" className="block w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-center py-4 rounded-xl mt-10">Consultoria Agência</a>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-neutral-900 py-8 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} LandpagePro. Todos os direitos reservados.
      </footer>
    </main>
  );
}
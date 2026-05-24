import Link from "next/link";

export default function UsoPrimeLanding() {
  return (
    <main className="bg-[#020202] text-neutral-300 min-h-screen font-sans selection:bg-amber-500/20 selection:text-white overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-2xl">
        <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
          <div className="text-sm font-bold text-white tracking-tighter mr-4">
            USO<span className="text-amber-500">PRIME</span>
          </div>
          <Link href="#inicio" className="hover:text-white transition">Início</Link>
          <Link href="#planos" className="hover:text-white transition">Assinatura</Link>
          <Link href="/demo" className="text-white hover:text-amber-500 transition">Demo</Link>
        </div>
      </nav>

      {/* HERO */}
      <section id="inicio" className="pt-64 pb-32 px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[9px] font-medium uppercase tracking-[0.25em] text-neutral-500">
            Sistemas operacionais para negócios
          </div>
          <h1 className="text-[5rem] md:text-[11rem] font-medium tracking-tighter text-white leading-[0.8] mb-12">
            USO.<span className="text-neutral-700">PRIME</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-neutral-500 max-w-2xl mx-auto mb-16 leading-relaxed">
            A infraestrutura digital de elite para quem exige precisão. 
            Agendamentos automatizados e gestão de alta conversão.
          </p>
          <Link href="#planos" className="px-12 py-6 bg-white text-black font-semibold rounded-full hover:bg-amber-500 transition-all duration-500 text-sm uppercase tracking-widest">
            Iniciar projeto
          </Link>
        </div>
      </section>

      {/* GRID DE NICHO (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-8 py-32 grid md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden">
        {["Barbearia", "Cílios", "Consultoria", "Estética"].map((nicho) => (
            <div key={nicho} className="bg-[#020202] p-12 hover:bg-white/[0.02] transition-colors cursor-default">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-4">Setor</div>
                <div className="text-2xl font-medium text-white">{nicho}</div>
            </div>
        ))}
      </section>

     {/* PRICE TIER (Black Card Atualizado) */}
<section id="planos" className="py-32 px-8">
  <div className="max-w-xl mx-auto">
    <div className="relative group p-px bg-gradient-to-b from-white/10 to-transparent rounded-[2rem]">
      <div className="bg-[#020202] rounded-[2rem] p-16">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h3 className="text-4xl font-medium text-white tracking-tighter">Pro Elite</h3>
            {/* Texto claro sobre a natureza da cobrança */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 mt-2">Assinatura mensal </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-white tracking-tighter">R$ 29,90</div>
            {/* Reforço de que é mensal */}
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mt-1">Cobrado todo mês</div>
          </div>
        </div>
        
        <div className="space-y-6 mb-16 border-t border-white/5 pt-12">
          {["Painel Administrativo", "Agendamento Inteligente", "Setup sob medida", "Otimização de Conversão"].map(f => (
            <div key={f} className="flex items-center gap-4 text-neutral-400 text-sm">
              <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
              {f}
            </div>
          ))}
        </div>

        {/* Botão com reforço de assinatura */}
        <Link 
          href="https://pay.kiwify.com.br/biQ4H52" 
          className="block w-full py-6 text-center border border-white/10 hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300"
        >
          Assinar por R$ 29,90/mês
        </Link>
        
        {/* Nota de rodapé de transparência */}
        <p className="text-center text-[9px] text-neutral-700 mt-6 uppercase tracking-widest">
          Cancele quando quiser. Acesso renovado mensalmente.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-white/5 text-center text-[9px] text-neutral-700 uppercase tracking-[0.3em]">
        &copy; {new Date().getFullYear()} UsoPrime — Elite Digital Solutions
      </footer>
    </main>
  );
}
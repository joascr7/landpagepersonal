import Link from "next/link";

export default function Hero() {
  return (
    <section id="inicio" className="pt-32 pb-20 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <span className="text-amber-500 text-xs font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">Para Personal Trainers e Estúdios</span>
        <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-white">
          Tenha seu site profissional <br />
          <span className="text-amber-500">em menos de 5 minutos</span>
        </h1>
        <p className="text-neutral-400 text-lg">Gerencie serviços, fotos e contatos em um painel administrativo exclusivo. Tudo integrado e pronto para converter.</p>
        <div className="flex gap-4">
          <Link href="#planos" className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black px-8 py-4 rounded-xl transition-all">Começar Agora</Link>
          <Link href="/demo" className="border border-neutral-800 hover:border-neutral-700 px-8 py-4 rounded-xl font-bold transition-all">Ver Demonstração</Link>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[3rem] blur opacity-20"></div>
        <div className="bg-neutral-900 rounded-[3rem] border-8 border-neutral-800 shadow-2xl p-2">
            <img src="/mockup-site.png" alt="Site no Celular" className="rounded-[2.5rem] w-full" />
        </div>
      </div>
    </section>
  );
}
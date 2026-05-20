import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
      
      {/* Lado Esquerdo: Textos e Botão de Ação */}
      <div className="flex-1 max-w-2xl text-center md:text-left z-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500 border border-amber-500/20 mb-6">
          🔥 Vagas limitadas para este mês
        </span>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
          O seu <span className="text-amber-500">Personal Trainer</span> na palma da sua mão.
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed">
          Chega de treinos genéricos de ficha de academia. Tenha um planejamento de treino de alta performance feito exclusivamente para o seu corpo, rotina e objetivos, com acompanhamento diário.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          <Link
            href="#precos"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 transition-colors text-lg shadow-lg shadow-amber-500/20"
          >
            Quero Começar Agora
          </Link>
          
          <div className="flex items-center gap-2 text-sm text-neutral-400 mt-2 sm:mt-0">
            <span className="flex -space-x-2">
              {/* Círculos simulando fotos de alunos */}
              <span className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-950 inline-block"></span>
              <span className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-neutral-950 inline-block"></span>
              <span className="w-8 h-8 rounded-full bg-neutral-600 border-2 border-neutral-950 inline-block"></span>
            </span>
            <span>+de 300 vidas transformadas</span>
          </div>
        </div>
      </div>

      {/* Lado Direito: Espaço para a sua Foto Profissional */}
      <div className="flex-1 relative w-full max-w-md md:max-w-none flex justify-center">
        {/* Efeito de luz de fundo para destacar a foto */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[80px]"></div>
        
        {/* Caixa da Foto */}
        <div className="relative w-full aspect-[4/5] max-w-[380px] rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden shadow-2xl flex items-center justify-center group hover:border-neutral-700 transition-colors">
          
          {/* Tag provisória - depois vamos colocar a imagem real aqui */}
          <div className="text-center p-6 select-none">
            <p className="text-neutral-500 text-sm font-mono mb-2">[ Espaço para sua Foto Profissional ]</p>
            <p className="text-neutral-400 text-xs px-4">Aqui colocaremos uma foto sua em alta resolução com câmera profissional transmitindo autoridade.</p>
          </div>

        </div>
      </div>

    </section>
  );
}
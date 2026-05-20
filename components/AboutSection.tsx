export default function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-neutral-900 bg-neutral-900/10">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Lado da Imagem Secundária */}
        <div className="flex-1 w-full max-w-sm aspect-[3/4] bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-center p-6 text-neutral-500 font-mono">
          [ Foto sua atuando como Personal ou estudando ]
        </div>

        {/* Lado do Texto de Autoridade */}
        <div className="flex-1">
          <h2 className="text-base font-semibold text-amber-500 uppercase tracking-wide">Treinador</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Ciência na prática, sem perda de tempo.
          </p>
          <p className="mt-6 text-neutral-400 leading-relaxed text-lg">
            Tenho anos de experiência com prescrição de treinamento de alta performance e emagrecimento. Todos os programas da minha consultoria fitness online são baseados em evidências científicas e anos de experimentação prática.
          </p>
          <p className="mt-4 text-neutral-400 leading-relaxed text-lg">
            Meu objetivo é estruturar uma rotina de treinos inteligente para que você conquiste o corpo que deseja de forma consistente, sem precisar passar horas dentro de uma academia.
          </p>

          {/* Selo do CREF - Crucial para passar segurança legal */}
          <div className="mt-8 pt-6 border-t border-neutral-900 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-xl">
              ✓
            </div>
            <div>
              <p className="text-white font-bold text-sm">Profissional Registrado</p>
              <p className="text-neutral-500 text-xs uppercase tracking-wider font-mono">CREF Garantido / Habilitado Legalmente</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
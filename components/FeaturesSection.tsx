export default function FeaturesSection() {
  const steps = [
    {
      step: "01",
      title: "Inscrição e Acesso",
      description: "Escolha o plano que melhor se adapta ao seu objetivo e faça o pagamento 100% seguro pela plataforma Kiwify.",
    },
    {
      step: "02",
      title: "Avaliação Inicial (Anamnese)",
      description: "Logo após a aprovação, você preencherá o formulário detalhando sua rotina, limitações, histórico de treinos e enviando fotos.",
    },
    {
      step: "03",
      title: "Treino na Palma da Mão",
      description: "Com base nas suas respostas, eu monto seu planejamento milimétrico. Tudo é liberado no aplicativo com vídeos explicativos dos exercícios.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-neutral-900">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <h2 className="text-base font-semibold text-amber-500 uppercase tracking-wide">Metodologia</h2>
        <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          Como funciona a Consultoria?
        </p>
        <p className="mt-4 text-xl text-neutral-400">
          Um passo a passo simples e prático para tirar você da inércia e acelerar seus resultados.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 relative">
        {steps.map((item, index) => (
          <div key={index} className="relative bg-neutral-900/30 border border-neutral-900 rounded-2xl p-8 hover:border-neutral-800 transition-colors group">
            
            {/* Número do Passo Grande e Estilizado */}
            <div className="text-5xl font-black text-neutral-800 group-hover:text-amber-500/20 transition-colors duration-300 font-mono mb-6">
              {item.step}
            </div>

            <h3 className="text-xl font-bold text-white mb-3">
              {item.title}
            </h3>
            
            <p className="text-neutral-400 text-base leading-relaxed">
              {item.description}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
}
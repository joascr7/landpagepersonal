export default function FeaturesSection() {
  const steps = [
    { step: "01", title: "Escolha o plano", description: "30, 90 ou 180 dias de acompanhamento. 1 planilha para cada 30 dias." },
    { step: "02", title: "Faça o pagamento", description: "Pague com cartão de crédito à vista ou parcele em até 12 vezes, ou via PIX." },
    { step: "03", title: "Preencha o questionário", description: "Após a confirmação do pagamento você vai receber o questionário de avaliação física." },
    { step: "04", title: "Aguarde a planilha", description: "Em até 7 dias úteis após o recebimento das suas respostas o seu treino estará pronto." },
    { step: "05", title: "Acesse o app", description: "Enquanto aguarda a planilha ficar pronta você já terá acesso a todo o material disponível no app." },
    { step: "06", title: "Conte com meu suporte", description: "Estarei a sua disposição todos os dias da semana para tirar dúvidas direto pelo WhatsApp." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-neutral-900 bg-neutral-950">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-black text-white sm:text-4xl uppercase tracking-tight">Passo a passo</h2>
        <p className="text-amber-500 font-bold text-xs uppercase tracking-widest mt-2">Para Contratar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {steps.map((item, index) => (
          <div key={index} className="p-6 bg-neutral-900/40 border border-neutral-900 rounded-2xl flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 flex items-center justify-center text-amber-500 font-mono font-bold mb-4">
              {item.step}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
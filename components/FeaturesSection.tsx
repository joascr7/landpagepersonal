"use client";

interface FeaturesSectionProps {
  cliente: any;
}

export default function FeaturesSection({ cliente }: FeaturesSectionProps) {
  const ehEstetica = cliente.nicho === "estetica";
  const corDefinida = cliente.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, any> = {
    blue: { textoBadge: "text-blue-500", bordaCirculo: "border-blue-500/30 text-blue-500" },
    purple: { textoBadge: "text-purple-500", bordaCirculo: "border-purple-500/30 text-purple-500" },
    pink: { textoBadge: "text-pink-500", bordaCirculo: "border-pink-500/30 text-pink-500" },
    amber: { textoBadge: "text-amber-500", bordaCirculo: "border-amber-500/30 text-amber-500" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  const steps = ehEstetica ? [
    { step: "01", title: "Escolha o pacote", description: "Mensal, Trimestral ou Semestral. Um cuidado contínuo para sua beleza." },
    { step: "02", title: "Faça o pagamento", description: "Pague com cartão de crédito à vista, parcelado ou via PIX." },
    { step: "03", title: "Link de agendamento", description: "Após a confirmação, receba o link exclusivo para escolher seus horários." },
    { step: "04", title: "Confirmação na agenda", description: "Seu horário bloqueado e reservado exclusivamente para você no Studio." },
    { step: "05", title: "Vá até o espaço", description: "Atendimento premium com materiais esterilizados." },
    { step: "06", title: "Suporte diário", description: "Dúvidas ou reparos? Fale direto no WhatsApp." },
  ] : [
    { step: "01", title: "Escolha o plano", description: "30, 90 ou 180 dias de acompanhamento." },
    { step: "02", title: "Faça o pagamento", description: "Pague com cartão de crédito, parcelado ou via PIX." },
    { step: "03", title: "Preencha o questionário", description: "Avaliação física completa para entender seu histórico." },
    { step: "04", title: "Aguarde a planilha", description: "Em até 7 dias úteis seu treino estará pronto." },
    { step: "05", title: "Acesse o app", description: "Acesso total ao material enquanto seu treino é preparado." },
    { step: "06", title: "Conte com suporte", description: "Estarei a disposição todos os dias pelo WhatsApp." },
  ];

  return (
    // bg-inherit e text-inherit fazem o componente seguir o tema do site
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-current/10 bg-inherit text-inherit">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-black sm:text-4xl uppercase tracking-tight">Passo a passo</h2>
        <p className={`${estiloAtivo.textoBadge} font-bold text-xs uppercase tracking-widest mt-2`}>
          Para Contratar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {steps.map((item, index) => (
          // bg-current/5 cria um card sutil que se adapta ao tema (escuro/claro/bege)
          <div key={index} className="p-6 bg-current/5 border border-current/10 rounded-2xl flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full border-2 ${estiloAtivo.bordaCirculo} flex items-center justify-center font-mono font-bold mb-4`}>
              {item.step}
            </div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            {/* Opacidade garante legibilidade em qualquer cor de fundo */}
            <p className="opacity-70 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
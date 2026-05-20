import { LinksEImagens } from "../dados";

export default function PricingSection() {
  const plans = [
    {
      name: "Plano Mensal",
      price: "R$ 137", // Mudado para o valor da loja/Kiwify
      period: "/mês",
      description: "Ideal para quem quer testar a metodologia e começar a ver os primeiros resultados.",
      features: [
        "Treino personalizado via Aplicativo",
        "Suporte via WhatsApp 1x por semana",
        "Ajuste de treino a cada 30 dias",
        "Dicas de transição nutricional"
      ],
      buttonText: "Começar Agora",
      highlight: false,
      checkoutUrl: LinksEImagens.checkoutConsultoria30Dias, // Puxando do dados.ts
    },
    {
      name: "Plano Trimestral",
      price: "R$ 277", // Mudado para o valor da loja/Kiwify
      period: "/trimestre",
      description: "O campeão de vendas. Perfeito para quem busca uma mudança estética real e consistente.",
      features: [
        "Treino personalizado via Aplicativo",
        "Suporte prioritário via WhatsApp (Seg a Sex)",
        "Ajustes de treino sempre que necessário",
        "Guia de protocolo de nutrientes",
        "Desconto exclusivo na renovação"
      ],
      buttonText: "Garantir Vaga",
      highlight: true,
      checkoutUrl: LinksEImagens.checkoutConsultoria90Dias, // Puxando do dados.ts
    },
    {
      name: "Plano Semestral",
      price: "R$ 477", // Mudado para o valor da loja/Kiwify
      period: "/semestre",
      description: "Foco em alta performance e mudança de estilo de vida a longo prazo.",
      features: [
        "Tudo do plano Trimestral",
        "Análise de exames/anamnese ultra detalhada",
        "Call individual de alinhamento de 30min",
        "Acesso a comunidade exclusiva de alunos"
      ],
      buttonText: "Assinar Premium",
      highlight: false,
      checkoutUrl: LinksEImagens.checkoutConsultoria180Dias, // Puxando do dados.ts
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">Preços</h2>
        <p className="mt-2 text-4xl font-black text-white sm:text-5xl tracking-tight max-w-xl mx-auto leading-tight">
          Invista no seu corpo e na sua saúde
        </p>
        <p className="mt-4 text-base text-neutral-400 max-w-xl mx-auto">
          Escolha o plano ideal para os seus objetivos. Sem taxas escondidas, cancele quando quiser.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch pt-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-2xl p-8 flex flex-col justify-between border transition-all duration-300 bg-neutral-900/40 ${
              plan.highlight
                ? "border-amber-500 shadow-xl shadow-amber-500/5 md:scale-105 z-10"
                : "border-neutral-800/80 hover:border-neutral-700"
            }`}
          >
            {plan.highlight && (
              <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-amber-500 text-neutral-950 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                Mais Recomendado
              </span>
            )}

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
              <p className="mt-3 text-xs text-neutral-400 leading-relaxed min-h-[32px]">{plan.description}</p>
              
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tight text-white">{plan.price}</span>
                <span className="text-neutral-500 text-xs font-semibold">{plan.period}</span>
              </div>

              <ul className="mt-8 space-y-3.5">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start text-xs font-medium text-neutral-300">
                    <span className="text-amber-500 mr-2.5 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={plan.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 w-full block text-center py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                plan.highlight
                  ? "bg-amber-500 text-neutral-950 hover:bg-amber-400"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              {plan.buttonText}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
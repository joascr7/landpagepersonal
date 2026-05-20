import Link from "next/link";

const plans = [
  {
    name: "Plano Mensal",
    price: "R$ 149",
    period: "/mês",
    description: "Ideal para quem quer testar a metodologia e começar a ver os primeiros resultados.",
    features: ["Treino personalizado via Aplicativo", "Suporte via WhatsApp 1x por semana", "Ajuste de treino a cada 30 dias", "Dicas de transição nutricional"],
    buttonText: "Começar Agora",
    highlight: false,
    checkoutUrl: "https://pay.kiwify.com.br/SEU_LINK_AQUI", 
  },
  {
    name: "Plano Trimestral",
    price: "R$ 357",
    period: "/trimestre",
    description: "O campeão de vendas. Perfeito para quem busca uma mudança estética real e consistente.",
    features: ["Treino personalizado via Aplicativo", "Suporte prioritário via WhatsApp (Seg a Sex)", "Ajustes de treino sempre que necessário", "Guia de protocolo de nutrientes", "Desconto exclusivo na renovação"],
    buttonText: "Garantir Vaga",
    highlight: true,
    checkoutUrl: "https://pay.kiwify.com.br/SEU_LINK_AQUI",
  },
  {
    name: "Plano Semestral",
    price: "R$ 594",
    period: "/semestre",
    description: "Foco em alta performance e mudança de estilo de vida a longo prazo.",
    features: ["Tudo do plano Trimestral", "Análise de exames/anamnese ultra detalhada", "Call individual de alinhamento de 30min", "Acesso a comunidade exclusiva de alunos"],
    buttonText: "Assinar Premium",
    highlight: false,
    checkoutUrl: "https://pay.kiwify.com.br/SEU_LINK_AQUI",
  },
];

export default function PricingSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-base font-semibold text-amber-500 uppercase tracking-wide">Preços</h2>
        <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          Invista no seu corpo e na sua saúde
        </p>
        <p className="mt-4 text-xl text-neutral-400">
          Escolha o plano ideal para os seus objetivos. Sem taxas escondidas, cancele quando quiser.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-2xl p-8 flex flex-col justify-between border transition-all duration-300 ${
              plan.highlight
                ? "bg-neutral-900 border-amber-500 shadow-xl shadow-amber-500/10 md:scale-105 z-10"
                : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700"
            }`}
          >
            {plan.highlight && (
              <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-amber-500 text-neutral-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bindings">
                Mais Recomendado
              </span>
            )}

            <div>
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-4 text-sm text-neutral-400 min-h-[40px]">{plan.description}</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold tracking-tight text-white">{plan.price}</span>
                <span className="ml-1 text-xl font-semibold text-neutral-400">{plan.period}</span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start text-sm text-neutral-300">
                    <span className="text-amber-500 mr-2 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={plan.checkoutUrl}
              target="_blank"
              className={`mt-8 w-full block text-center py-3 px-4 rounded-xl font-bold transition-colors ${
                plan.highlight
                  ? "bg-amber-500 text-neutral-950 hover:bg-amber-400"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              {plan.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
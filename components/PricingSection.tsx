// 1. Removemos a importação fixa do arquivo dados.ts

interface PricingSectionProps {
  cliente: any; // Recebe os dados dinâmicos do cliente vindos da página
}

export default function PricingSection({ cliente }: PricingSectionProps) {
  // Define se o nicho é estética ou fitness para adaptar os textos das features
  const ehEstetica = cliente.nicho === "estetica";

  // 🔥 Captura a cor do banco. Se não existir, define o padrão baseado no nicho
  const corDefinida = cliente.tema_cor || (ehEstetica ? "pink" : "amber");

  // Dicionário de cores estático para os cards rodarem perfeitamente no Tailwind v4
  const mapasDeCores: Record<string, any> = {
    blue: {
      texto: "text-blue-500",
      borda: "border-blue-500 shadow-blue-500/5",
      botao: "bg-blue-500 hover:bg-blue-400",
      selecao: "bg-blue-500",
    },
    purple: {
      texto: "text-purple-500",
      borda: "border-purple-500 shadow-purple-500/5",
      botao: "bg-purple-500 hover:bg-purple-400",
      selecao: "bg-purple-500",
    },
    pink: {
      texto: "text-pink-500",
      borda: "border-pink-500 shadow-pink-500/5",
      botao: "bg-pink-500 hover:bg-pink-400",
      selecao: "bg-pink-500",
    },
    amber: {
      texto: "text-amber-500",
      borda: "border-amber-500 shadow-amber-500/5",
      botao: "bg-amber-500 hover:bg-amber-400",
      selecao: "bg-amber-500",
    },
  };

  // Seleciona o estilo ativo com base na cor escolhida
  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  const plans = [
    {
      name: ehEstetica ? "Pacote Mensal" : "Plano Mensal",
      price: cliente.preco_consultoria_30_dias, // Banco de Dados
      period: "/mês",
      description: ehEstetica 
        ? "Ideal para manter suas unhas perfeitas com manutenção regular garantida."
        : "Ideal para quem quer testar a metodologia e começar a ver os primeiros resultados.",
      features: ehEstetica ? [
        "Aplicação Completa em Gel",
        "Suporte para reparos via WhatsApp",
        "Garantia de atendimento prioritário",
        "Dicas de cuidados pós-procedimento"
      ] : [
        "Treino personalizado via Aplicativo",
        "Suporte via WhatsApp 1x por semana",
        "Ajuste de treino a cada 30 dias",
        "Dicas de transição nutricional"
      ],
      buttonText: "Começar Agora",
      highlight: false,
      checkoutUrl: cliente.checkout_30_dias, // Banco de Dados
    },
    {
      name: ehEstetica ? "Plano Trimestral Recorrente" : "Plano Trimestral",
      price: cliente.preco_consultoria_90_dias, // Banco de Dados
      period: "/trimestre",
      description: ehEstetica
        ? "O mais assinado. Perfeito para garantir o autocuidado contínuo com desconto."
        : "O campeão de vendas. Perfeito para quem busca uma mudança estética real e consistente.",
      features: ehEstetica ? [
        "Manutenções inclusas no trimestre",
        "Suporte prioritário via WhatsApp (Seg a Sex)",
        "Reparos de emergência sem custo extra",
        "Guia de fortalecimento de unhas",
        "Desconto exclusivo na renovação"
      ] : [
        "Treino personalizado via Aplicativo",
        "Suporte prioritário via WhatsApp (Seg a Sex)",
        "Ajustes de treino sempre que necessário",
        "Guia de protocolo de nutrientes",
        "Desconto exclusivo na renovação"
      ],
      buttonText: "Garantir Vaga",
      highlight: true,
      checkoutUrl: cliente.checkout_90_dias, // Banco de Dados
    },
    {
      name: ehEstetica ? "Plano VIP Semestral" : "Plano Semestral",
      price: cliente.preco_consultoria_180_dias, // Banco de Dados
      period: "/semestre",
      description: ehEstetica
        ? "Foco em unhas impecáveis o ano todo com tratamento premium completo."
        : "Foco em alta performance e mudança de estilo de vida a longo prazo.",
      features: ehEstetica ? [
        "Tudo do plano Trimestral",
        "Blindagem e spa dos pés inclusos",
        "Horários fixos reservados na agenda",
        "Acesso a mimos exclusivos do Studio"
      ] : [
        "Tudo do plano Trimestral",
        "Análise de exames/anamnese ultra detalhada",
        "Call individual de alinhamento de 30min",
        "Acesso a comunidade exclusiva de alunos"
      ],
      buttonText: ehEstetica ? "Assinar VIP" : "Assinar Premium",
      highlight: false,
      checkoutUrl: cliente.checkout_180_dias, // Banco de Dados
    },
  ];

  return (
    /* 🔥 CORREÇÃO PRINCIPAL: Adicionado relative, z-10 e forced pointer-events para vencer qualquer barreira invisível da Navbar */
    <section className="relative z-10 block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className={`text-xs font-bold ${estiloAtivo.texto} uppercase tracking-widest`}>Preços</h2>
        <p className="mt-2 text-4xl font-black text-white sm:text-5xl tracking-tight max-w-xl mx-auto leading-tight">
          {ehEstetica ? "Escolha o seu plano de beleza" : "Invista no seu corpo e na sua saúde"}
        </p>
        <p className="mt-4 text-base text-neutral-400 max-w-xl mx-auto">
          Escolha o plano ideal para os seus objetivos. Sem taxas escondidas, cancele quando quiser.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch pt-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            /* 🔥 Isolamento do card com relative e controle de z-index dinâmico baseado no destaque */
            className={`relative rounded-2xl p-8 flex flex-col justify-between border transition-all duration-300 bg-neutral-900/40 ${
              plan.highlight
                ? `border-solid ${estiloAtivo.borda} md:scale-105 z-20`
                : "border-neutral-800/80 hover:border-neutral-700 z-10"
            }`}
          >
            {plan.highlight && (
              <span className={`absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 ${estiloAtivo.selecao} text-neutral-950 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap z-30`}>
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
                    <span className={`${estiloAtivo.texto} mr-2.5 font-bold`}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* 🔥 BOTÃO DE CHECKOUT INTEIRAMENTE LIVRE: z-30 e cursor-pointer nativo */}
            <a
              href={plan.checkoutUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative z-30 mt-8 w-full block text-center py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer pointer-events-auto select-none ${
                plan.highlight
                  ? `${estiloAtivo.botao} text-neutral-950 shadow-md`
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
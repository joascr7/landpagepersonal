"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PricingSectionProps {
  cliente: any;
}

export default function PricingSection({ cliente }: PricingSectionProps) {
  const clienteValido = cliente || {};
  const ehEstetica = clienteValido.nicho === "estetica";
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  // Estado para armazenar os procedimentos caso seja estética
  const [procedimentos, setProcedimentos] = useState<any[]>([]);

  useEffect(() => {
    async function buscarServicosDoBanco() {
      if (ehEstetica && clienteValido.id) {
        const { data } = await supabase
          .from("servicos")
          .select("*")
          .eq("cliente_id", clienteValido.id);
        if (data) setProcedimentos(data);
      }
    }
    buscarServicosDoBanco();
  }, [clienteValido.id, ehEstetica]);

  const mapasDeCores: Record<string, any> = {
    blue: { texto: "text-blue-500", borda: "border-blue-500 shadow-blue-500/5", botao: "bg-blue-500 hover:bg-blue-400", selecao: "bg-blue-500" },
    purple: { texto: "text-purple-500", borda: "border-purple-500 shadow-purple-500/5", botao: "bg-purple-500 hover:bg-purple-400", selecao: "bg-purple-500" },
    pink: { texto: "text-pink-500", borda: "border-pink-500 shadow-pink-500/5", botao: "bg-pink-500 hover:bg-pink-400", selecao: "bg-pink-500" },
    amber: { texto: "text-amber-500", borda: "border-amber-500 shadow-amber-500/5", botao: "bg-amber-500 hover:bg-amber-400", selecao: "bg-amber-500" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  // 🏋️‍♂️ PLANOS ORIGINAIS DO PERSONAL TRAINER (Recuperados)
  const planosPersonal = [
    {
      name: "Plano Mensal",
      price: clienteValido.preco_consultoria_30_dias,
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
      checkoutUrl: clienteValido.checkout_30_dias,
    },
    {
      name: "Plano Trimestral",
      price: clienteValido.preco_consultoria_90_dias,
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
      checkoutUrl: clienteValido.checkout_90_dias,
    },
    {
      name: "Plano Semestral",
      price: clienteValido.preco_consultoria_180_dias,
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
      checkoutUrl: clienteValido.checkout_180_dias,
    },
  ];

  return (
    <section className="relative z-10 block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className={`text-xs font-bold ${estiloAtivo.texto} uppercase tracking-widest`}>
          {ehEstetica ? "Procedimentos" : "Planos & Consultoria"}
        </h2>
        <p className="mt-2 text-4xl font-black text-white sm:text-5xl tracking-tight max-w-xl mx-auto leading-tight">
          {ehEstetica ? "Escolha o seu tratamento" : "Invista no seu corpo e na sua saúde"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch pt-4">
        {/* Mapeia os procedimentos do banco se for estética OU os planos fixos se for Personal */}
        {ehEstetica
          ? procedimentos.map((servico, index) => (
              <div key={servico.id || index} className="relative rounded-2xl p-8 flex flex-col justify-between border bg-neutral-900/40 border-neutral-800 hover:border-neutral-700">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{servico.nome}</h3>
                  <p className="mt-3 text-xs text-neutral-400 min-h-[32px]">{servico.descricao}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">R$ {Number(servico.preco).toFixed(2)}</span>
                  </div>
                </div>
                <a href="#agendamento" className={`mt-8 w-full block text-center py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-pink-500 text-white`}>
                  Agendar Horário
                </a>
              </div>
            ))
          : planosPersonal.map((plan, index) => (
              <div key={index} className={`relative rounded-2xl p-8 flex flex-col justify-between border bg-neutral-900/40 ${plan.highlight ? `border-solid ${estiloAtivo.borda} md:scale-105 z-20` : "border-neutral-800/80 hover:border-neutral-700 z-10"}`}>
                {plan.highlight && (
                  <span className={`absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 ${estiloAtivo.selecao} text-neutral-950 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap z-30`}>
                    Mais Recomendado
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                  <p className="mt-3 text-xs text-neutral-400 min-h-[32px]">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
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
                <a href={plan.checkoutUrl || "#"} target="_blank" rel="noopener noreferrer" className={`mt-8 w-full block text-center py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider ${plan.highlight ? `${estiloAtivo.botao} text-neutral-950` : "bg-neutral-800 text-white hover:bg-neutral-700"}`}>
                  {plan.buttonText}
                </a>
              </div>
            ))}
      </div>
    </section>
  );
}
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
    blue: { texto: "text-blue-500", borda: "border-blue-500", botao: "bg-blue-500 hover:bg-blue-600", selecao: "bg-blue-500" },
    purple: { texto: "text-purple-500", borda: "border-purple-500", botao: "bg-purple-500 hover:bg-purple-600", selecao: "bg-purple-500" },
    pink: { texto: "text-pink-500", borda: "border-pink-500", botao: "bg-pink-500 hover:bg-pink-600", selecao: "bg-pink-500" },
    amber: { texto: "text-amber-500", borda: "border-amber-500", botao: "bg-amber-500 hover:bg-amber-600", selecao: "bg-amber-500" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  const planosPersonal = [
    {
      name: "Plano Mensal",
      price: clienteValido.preco_consultoria_30_dias,
      period: "/mês",
      description: "Ideal para quem quer testar a metodologia.",
      features: ["Treino personalizado", "Suporte via WhatsApp", "Ajuste mensal"],
      buttonText: "Começar Agora",
      highlight: false,
      checkoutUrl: clienteValido.checkout_30_dias,
    },
    {
      name: "Plano Trimestral",
      price: clienteValido.preco_consultoria_90_dias,
      period: "/trimestre",
      description: "O mais buscado para resultados reais.",
      features: ["Treino personalizado", "Suporte prioritário", "Ajustes sob demanda", "Guia de nutrientes"],
      buttonText: "Garantir Vaga",
      highlight: true,
      checkoutUrl: clienteValido.checkout_90_dias,
    },
    {
      name: "Plano Semestral",
      price: clienteValido.preco_consultoria_180_dias,
      period: "/semestre",
      description: "Foco em alta performance e longevidade.",
      features: ["Tudo do Trimestral", "Análise de exames", "Call individual", "Comunidade exclusiva"],
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
        <p className="mt-2 text-4xl font-black opacity-90 sm:text-5xl tracking-tight leading-tight">
          {ehEstetica ? "Escolha o seu tratamento" : "Invista no seu corpo e na sua saúde"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch pt-4">
        {ehEstetica
          ? procedimentos.map((servico, index) => (
              <div key={servico.id || index} className="relative rounded-2xl p-8 flex flex-col justify-between border bg-white/5 border-current/10">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{servico.nome}</h3>
                  <p className="mt-3 text-xs opacity-70 min-h-[32px]">{servico.descricao}</p>
                  <div className="mt-6 text-4xl font-black">R$ {Number(servico.preco).toFixed(2)}</div>
                </div>
                <a href="#agendamento" className={`mt-8 w-full block text-center py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider ${estiloAtivo.botao} text-white`}>
                  Agendar Horário
                </a>
              </div>
            ))
          : planosPersonal.map((plan, index) => (
              <div key={index} className={`relative rounded-2xl p-8 flex flex-col justify-between border bg-white/5 ${plan.highlight ? `border-solid ${estiloAtivo.borda} md:scale-105 z-20` : "border-current/10 z-10"}`}>
                {plan.highlight && (
                  <span className={`absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 ${estiloAtivo.selecao} text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap z-30`}>
                    Mais Recomendado
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
                  <p className="mt-3 text-xs opacity-70 min-h-[32px]">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className="opacity-60 text-xs font-semibold">{plan.period}</span>
                  </div>
                  <ul className="mt-8 space-y-3.5">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start text-xs font-medium opacity-80">
                        <span className={`${estiloAtivo.texto} mr-2.5 font-bold`}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href={plan.checkoutUrl || "#"} target="_blank" className={`mt-8 w-full block text-center py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider ${plan.highlight ? `${estiloAtivo.botao} text-white` : "bg-current/10 hover:bg-current/20"}`}>
                  {plan.buttonText}
                </a>
              </div>
            ))}
      </div>
    </section>
  );
}
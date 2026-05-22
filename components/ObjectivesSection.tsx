"use client";

import { useState } from "react";

interface ObjectivesSectionProps {
  cliente: any;
}

export default function ObjectivesSection({ cliente }: ObjectivesSectionProps) {
  const clienteValido = cliente || {};
  const ehEstetica = clienteValido.nicho === "estetica";
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  const [abertoIdx, setAbertoIdx] = useState<Record<number, boolean>>({});

  const toggleCard = (idx: number) => {
    setAbertoIdx((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const mapasDeCores: Record<string, any> = {
    blue: { linha: "bg-blue-500", textoSaibaComo: "text-blue-500" },
    purple: { linha: "bg-purple-500", textoSaibaComo: "text-purple-500" },
    pink: { linha: "bg-pink-500", textoSaibaComo: "text-pink-500" },
    amber: { linha: "bg-amber-500", textoSaibaComo: "text-amber-500" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  const objectives = ehEstetica ? [
    { title: "Alongamento em Gel", description: "Para unhas longas, simétricas e naturais.", details: "Utilizo técnicas modernas para extensões leves e resistentes. O procedimento respeita sua unha natural, garantindo um resultado elegante. Tempo: ~2 horas.", img: clienteValido.img_objetivo_1 || "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=80" },
    { title: "Manutenção Perfeita", description: "Estrutura segura e brilho renovado.", details: "Manutenção recomendada a cada 20-30 dias para repor o gel e prevenir infiltrações. Inclui acabamento e cuticulagem. Tempo: ~1h30.", img: clienteValido.img_objetivo_2 || "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&w=500&q=80" },
    { title: "Blindagem de Unhas", description: "Proteção para unhas naturais.", details: "Camada protetora sobre a unha natural que impede quebras e lascas. Esmaltação dura até 25 dias. Tempo: 1 hora.", img: clienteValido.img_objetivo_3 || "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=500&q=80" },
  ] : [
    { title: "Emagrecimento", description: "Redução de peso corporal com eficiência.", details: "Treinamento focado no aumento do gasto calórico diário. Combinamos musculação e cardio para reduzir gordura preservando massa magra.", img: clienteValido.img_objetivo_1 || "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=500&q=80" },
    { title: "Hipertrofia", description: "Ganho de massa e volume muscular.", details: "Estimulação ideal com exercícios compostos e métodos de alta intensidade como Drop-set e Ponto Zero.", img: clienteValido.img_objetivo_2 || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80" },
    { title: "Definição muscular", description: "Corpo mais slim e harmônico.", details: "Combinação de aeróbios e musculação com foco em pontos fracos e simetria corporal usando treinos intervalados.", img: clienteValido.img_objetivo_3 || "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    // bg-inherit e border-current/10 fazem a seção se adaptar à cor do tema
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-current/10 bg-inherit text-inherit">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-black sm:text-4xl uppercase tracking-tight">
          Como eu vou te ajudar
        </h2>
        <div className={`w-16 h-1 ${estiloAtivo.linha} mx-auto mt-4 mb-6`}></div>
        <p className="opacity-70 text-lg leading-relaxed">
          {ehEstetica 
            ? "Acesso a procedimentos premium, moldados perfeitamente para o seu estilo e rotina."
            : "Treinos estruturados de acordo com seus objetivos, histórico e disponibilidade."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {objectives.map((obj, index) => {
          const estaAberto = !!abertoIdx[index];
          return (
            <div key={index} className="bg-current/5 border border-current/10 rounded-2xl overflow-hidden flex flex-col">
              <div className="h-48 w-full relative">
                <img src={obj.img} alt={obj.title} className="w-full h-full object-cover grayscale opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-inherit via-transparent to-transparent"></div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-2">{obj.title}</h3>
                
                <button
                  type="button"
                  onClick={() => toggleCard(index)}
                  className={`${estiloAtivo.textoSaibaComo} text-sm font-bold mb-4 block w-fit p-0 cursor-pointer hover:underline`}
                >
                  {estaAberto ? "Ocultar detalhes ▲" : "Saiba como ▼"}
                </button>

                <p className="opacity-80 font-medium mb-4 text-sm">{obj.description}</p>
                
                <div className={`grid transition-all duration-300 ease-in-out opacity-70 text-xs leading-relaxed ${estaAberto ? "grid-rows-[1fr] opacity-100 pt-4 border-t border-current/10 mt-auto" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden space-y-2">{obj.details}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
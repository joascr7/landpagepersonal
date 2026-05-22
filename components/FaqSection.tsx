interface FaqSectionProps {
  cliente: any;
}

export default function FaqSection({ cliente }: FaqSectionProps) {
  const ehEstetica = cliente.nicho === "estetica";
  const corDefinida = cliente.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, any> = {
    blue: { textoBadge: "text-blue-500", letraQ: "text-blue-500" },
    purple: { textoBadge: "text-purple-500", letraQ: "text-purple-500" },
    pink: { textoBadge: "text-pink-500", letraQ: "text-pink-500" },
    amber: { textoBadge: "text-amber-500", letraQ: "text-amber-500" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  const faqs = ehEstetica ? [
    { q: "Quanto tempo dura o alongamento em gel?", a: "O alongamento em gel pode durar por tempo indeterminado, desde que você faça as manutenções corretamente." },
    { q: "De quanto em quanto tempo devo fazer a manutenção?", a: "O intervalo ideal é de 21 a 28 dias para manter a estrutura saudável." },
    { q: "Posso mexer com produtos de limpeza ou água?", a: "Sim, o gel é resistente, mas recomendamos o uso de luvas para maior durabilidade do brilho." },
    { q: "Como funciona o pagamento?", a: "Processamos pagamentos via Pix ou Cartão de forma 100% segura." }
  ] : [
    { q: "Você prescreve dieta ou plano alimentar?", a: "Não, a prescrição de dietas é exclusiva do Nutricionista. Meu foco é o planejamento de treino." },
    { q: "De quanto em quanto tempo o meu treino é atualizado?", a: "As planilhas são individualizadas e mudadas conforme a necessidade de evolução dos estímulos." },
    { q: "Serve para quem quer treinar em casa?", a: "Sim! Eu monto o treino com base nas ferramentas que você tiver disponíveis." },
    { q: "Moro fora do Brasil, consigo contratar?", a: "Sim! Processamos pagamentos internacionais de forma segura." }
  ];

  return (
    // bg-inherit e border-current/10 fazem o componente seguir o tema
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-current/10 bg-inherit text-inherit">
      <div className="text-center mb-16">
        <h2 className={`text-base font-semibold ${estiloAtivo.textoBadge} uppercase tracking-wide`}>Dúvidas</h2>
        <p className="mt-2 text-3xl font-extrabold sm:text-4xl">Perguntas Frequentes</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          // bg-current/5 cria um fundo leve adaptado ao tema (branco/bege/preto)
          <div key={index} className="bg-current/5 border border-current/10 rounded-2xl p-6 transition-colors">
            <h3 className="font-bold flex items-start gap-3">
              <span className={`${estiloAtivo.letraQ} font-mono`}>Q.</span> {faq.q}
            </h3>
            <p className="mt-3 opacity-70 text-sm leading-relaxed pl-6 border-l border-current/20">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
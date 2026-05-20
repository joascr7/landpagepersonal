export default function FaqSection() {
  const faqs = [
    {
      q: "Você prescreve dieta ou plano alimentar?",
      a: "Não, a prescrição de dietas é uma atividade exclusiva do Nutricionista. O meu foco total é entregar o melhor planejamento de treino do mercado. Caso queira, posso indicar profissionais parceiros da nutrição."
    },
    {
      q: "De quanto em quanto tempo o meu treino é atualizado?",
      a: "As planilhas de treino são totalmente individualizadas e atualizadas de acordo com o plano escolhido ou sempre que houver estagnação de resultados e necessidade de evolução dos estímulos."
    },
    {
      q: "Serve para quem quer treinar em casa?",
      a: "Com certeza! Eu monto o treino com base nas ferramentas que você tiver disponíveis. Se você só tiver o peso do próprio corpo ou elásticos em casa, o treino será desenhado perfeitamente focado nisso."
    },
    {
      q: "Moro fora do Brasil, consigo contratar?",
      a: "Sim! A plataforma da Kiwify processa pagamentos internacionais de forma totalmente segura. Você receberá o acesso ao aplicativo e o suporte via WhatsApp independentemente do país onde reside."
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-neutral-900">
      <div className="text-center mb-16">
        <h2 className="text-base font-semibold text-amber-500 uppercase tracking-wide">Dúvidas</h2>
        <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Perguntas Frequentes</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-neutral-900/20 border border-neutral-900 rounded-2xl p-6 hover:border-neutral-800 transition-colors">
            <h3 className="text-lg font-bold text-white flex items-start gap-3">
              <span className="text-amber-500 font-mono">Q.</span> {faq.q}
            </h3>
            <p className="mt-3 text-neutral-400 text-sm leading-relaxed pl-6 border-l border-neutral-800">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
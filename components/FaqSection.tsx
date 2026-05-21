interface FaqSectionProps {
  cliente: any; // Recebe os dados dinâmicos do cliente
}

export default function FaqSection({ cliente }: FaqSectionProps) {
  const ehEstetica = cliente.nicho === "estetica";

  // 🔥 Captura a cor do banco. Se não existir, define o padrão baseado no nicho
  const corDefinida = cliente.tema_cor || (ehEstetica ? "pink" : "amber");

  // Dicionário de cores estático preparado para o Tailwind v4
  const mapasDeCores: Record<string, any> = {
    blue: {
      textoBadge: "text-blue-500",
      letraQ: "text-blue-500",
    },
    purple: {
      textoBadge: "text-purple-500",
      letraQ: "text-purple-500",
    },
    pink: {
      textoBadge: "text-pink-500",
      letraQ: "text-pink-500",
    },
    amber: {
      textoBadge: "text-amber-500",
      letraQ: "text-amber-500",
    },
  };

  // Seleciona o estilo ativo com base na cor escolhida
  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  // Perguntas e respostas dinâmicas por nicho
  const faqs = ehEstetica ? [
    {
      q: "Quanto tempo dura o alongamento em gel?",
      a: "O alongamento em gel pode durar por tempo indeterminado, desde que você faça as manutenções corretamente no período indicado (a cada 20 a 30 dias). O gel é altamente resistente e protege a sua unha natural."
    },
    {
      q: "De quanto em quanto tempo devo fazer a manutenção?",
      a: "O intervalo ideal é de 21 a 28 dias. Passar desse tempo sobrecarrega a estrutura da unha devido ao crescimento natural, aumentando o risco de infiltrações, descolamentos ou quebras."
    },
    {
      q: "Posso mexer com produtos de limpeza ou água?",
      a: "Sim! O gel é completamente impermeável e resistente. No entanto, para garantir a máxima durabilidade do brilho e evitar o desgaste químico do top coat, recomendamos o uso de luvas ao manusear produtos de limpeza pesados."
    },
    {
      q: "Moro em outra região ou quero presentear, como funciona?",
      a: "A plataforma da Kiwify processa pagamentos via Pix ou Cartão de forma 100% segura. Você pode assinar o plano para uso próprio ou entrar em contato pelo WhatsApp informando que deseja gerar um cartão-presente para alguém especial."
    }
  ] : [
    {
      q: "Você prescreve dieta ou plano alimentar?",
      a: "Não, a prescrição de dietas é uma atividade exclusiva do Nutricionista. O meu foco total é entregar o melhor planejamento de treino do mercado. Caso queira, posso indicar profissionais parceiros da nutrição."
    },
    {
      q: "De quanto em quanto tempo o meu treino é atualizado?",
      a: "As planilhas de treino são totalmente individualizadas e mudadas de acordo com o plano escolhido ou sempre que houver estagnação de resultados e necessidade de evolução dos estímulos."
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
        {/* 🔥 Atualizado com a cor dinâmica */}
        <h2 className={`text-base font-semibold ${estiloAtivo.textoBadge} uppercase tracking-wide`}>Dúvidas</h2>
        <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Perguntas Frequentes</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-neutral-900/20 border border-neutral-900 rounded-2xl p-6 hover:border-neutral-800 transition-colors">
            <h3 className="text-lg font-bold text-white flex items-start gap-3">
              {/* 🔥 Atualizado com a cor dinâmica */}
              <span className={`${estiloAtivo.letraQ} font-mono`}>Q.</span> {faq.q}
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
interface ObjectivesSectionProps {
  cliente: any; // Recebe os dados dinâmicos do cliente
}

export default function ObjectivesSection({ cliente }: ObjectivesSectionProps) {
  const ehEstetica = cliente.nicho === "estetica";

  // Configurações visuais dinâmicas
  const corLinha = ehEstetica ? "bg-pink-500" : "bg-amber-500";
  const corTextoSaibaComo = ehEstetica ? "text-pink-500" : "text-amber-500";

  // Objetivos/Serviços dinâmicos por nicho
  const objectives = ehEstetica ? [
    {
      title: "Alongamento em Gel",
      description: "Para quem quer unhas longas, simétricas e com aspecto natural instantaneamente.",
      details: "Utilizo as técnicas mais modernas do mercado para criar extensões leves, resistentes e com acabamento ultra fino. O procedimento respeita o formato natural da sua unha, garantindo um resultado elegante que não solta e não quebra no dia a dia. Tempo de sessão: aproximadamente 2 horas.",
      img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=80", // Foto profissional de manicure/unhas
    },
    {
      title: "Manutenção Perfeita",
      description: "Pra quem já tem o alongamento e precisa manter a estrutura segura e o brilho renovado.",
      details: "A manutenção deve ser feita a cada 20 ou 30 dias para repor o gel no crescimento da unha, nivelar a estrutura e prevenir infiltrações ou descolamentos. Refazemos todo o acabamento, cuticulagem e aplicamos um novo top coat de alto brilho. Tempo de sessão: aproximadamente 1h30.",
      img: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Blindagem de Unhas",
      description: "Se você quer manter o comprimento natural das suas unhas, mas precisa que o esmalte dure semanas.",
      details: "A blindagem é uma camada de gel ou acrílico aplicada diretamente sobre a sua unha natural, sem estender o comprimento. Ela cria uma barreira protetora que impede que a unha lasque ou quebre, fazendo com que a esmaltação comum ou em gel dure intacta por até 25 dias. Tempo de sessão: 1 hora.",
      img: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=500&q=80",
    },
  ] : [
    {
      title: "Emagrecimento",
      description: "Para você que quer diminuição de medidas com redução do peso corporal.",
      details: "Vou elaborar um treinamento baseado no aumento do gasto calórico diário de maneira inteligente e eficiente. Vamos utilizar a musculação para preservar sua massa muscular enquanto focamos no cardio para reduzir a gordura corporal. Com 40 minutos diários já conseguimos gerar os resultados.",
      img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Hipertrofia",
      description: "Pra quem está satisfeito com o percentual de gordura e quer subir medidas e massa muscular.",
      details: "Vamos utilizar exercícios básicos e altamente eficientes para gerar o estímulo ideal para hipertrofia. Métodos como Bi-set, Drop-set, Rest Pause, Ponto Zero entre outros são os mais utilizados nesse tipo de programa. Seus treinos vão durar aproximadamente 50min.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Definição muscular",
      description: "Se você estiver querendo subir medidas mas sem ganhar gordura e manter um corpo mais slim.",
      details: "Vou montar pra você uma combinação perfeita entre os exercícios aeróbios e musculação. Daremos prioridade para os seus pontos fracos, buscando um corpo harmônico e simétrico. Vamos utilizar cardios intervalados de alta intensidade para resultados ainda mais rápidos. 60 minutos por sessão serão suficientes.",
      img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-neutral-900">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-black text-white sm:text-4xl uppercase tracking-tight">
          Como eu vou te ajudar
        </h2>
        <div className={`w-16 h-1 ${corLinha} mx-auto mt-4 mb-6`}></div>
        <p className="text-neutral-400 text-lg leading-relaxed">
          {ehEstetica 
            ? `Com o meu acompanhamento e serviços premium, você terá acesso a procedimentos de altíssima qualidade, moldados perfeitamente para o seu estilo e rotina.`
            : `Com a minha consultoria online você terá uma planilha de treino de acordo com os seus objetivos, disponibilidade e levando em conta todo o seu histórico de treinamento.`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {objectives.map((obj, index) => (
          <div key={index} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col">
            <div className="h-48 w-full relative">
              <img src={obj.img} alt={obj.title} className="w-full h-full object-cover grayscale opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">{obj.title}</h3>
              <span className={`${corTextoSaibaComo} text-sm font-semibold mb-4 inline-block`}>Saiba como</span>
              <p className="text-neutral-300 font-medium mb-4 text-sm">{obj.description}</p>
              <div className="text-neutral-400 text-xs leading-relaxed space-y-2 flex-1 pt-4 border-t border-neutral-800/50">
                {obj.details}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
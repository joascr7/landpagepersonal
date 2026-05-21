import Link from "next/link";

interface AppSectionProps {
  cliente: any; // Recebe os dados dinâmicos do cliente
}

export default function AppSection({ cliente }: AppSectionProps) {
  const ehEstetica = cliente.nicho === "estetica";

  // Configurações visuais dinâmicas
  const corTextoDestaque = ehEstetica ? "text-pink-600" : "text-amber-600";
  const corCheck = ehEstetica ? "text-pink-600" : "text-amber-600";
  const corBotao = ehEstetica ? "bg-pink-500 hover:bg-pink-600 shadow-pink-500/10" : "bg-amber-500 hover:bg-amber-600 shadow-amber-500/10";

  // Benefícios/Características dinâmicas por nicho
  const features = ehEstetica ? [
    "Ambiente climatizado, moderno e super aconchegante;",
    "Materiais 100% esterilizados em autoclave (Biossegurança);",
    "Atendimento com hora marcada, sem atrasos e sem filas;",
    "Produtos premium que garantem durabilidade e brilho intenso;",
    "Localização de fácil acesso para total comodidade;",
    "Espaço preparado para você relaxar enquanto cuida de você."
  ] : [
    "Fotos e/ou vídeos demonstrativos de cada exercício;",
    "Cronômetro integrado dos tempos de descanso;",
    "Registros de frequência e histórico de cargas;",
    "Material de apoio exclusivo para potencializar resultados;",
    "Acesse tudo direto pelo smartphone ou navegador;",
    "Aplicativo leve e compatível com Android e iPhone (iOS)."
  ];

  return (
    <section className="bg-white text-neutral-900 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Lado Esquerdo: Benefícios do App ou do Espaço */}
        <div className="flex-1 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-neutral-950">
            {ehEstetica ? "Sua experiência será em alto nível" : "Seu treino será entregue em alto nível"}
          </h2>
          <p className="mt-4 text-lg text-neutral-600 font-medium">
            {ehEstetica ? (
              <>
                Toda a estrutura do <span className={`${corTextoDestaque} font-bold`}>Studio {cliente.nome}</span> a favor do seu bem-estar e autoestima.
              </>
            ) : (
              <>
                Toda a tecnologia do aplicativo <span className={`${corTextoDestaque} font-bold`}>MFit Personal</span> a favor dos seus resultados.
              </>
            )}
          </p>

          <ul className="mt-8 space-y-4">
            {features.map((item, idx) => (
              <li key={idx} className="flex items-start text-neutral-800 font-medium text-base">
                <span className={`${corCheck} mr-3 font-bold text-lg`}>✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="#precos"
              className={`inline-block px-8 py-4 rounded-xl ${corBotao} text-neutral-950 font-black transition-colors text-base uppercase tracking-wider shadow-md`}
            >
              {ehEstetica ? "Agendar Meu Horário" : "Contratar Agora"}
            </Link>
          </div>
        </div>

        {/* Lado Direito: Imagem Ilustrativa (Celular ou Studio) */}
        <div className="flex-1 flex justify-center relative w-full max-w-md">
          {/* Círculo decorativo de fundo */}
          <div className="absolute w-72 h-72 bg-neutral-100 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
          
          <img 
            src={ehEstetica 
              ? "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80" // Foto elegante de um salão/studio de beleza
              : "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80"
            } 
            alt={ehEstetica ? `Studio ${cliente.nome}` : "MFit Personal App"} 
            className="w-full max-w-[320px] rounded-[40px] shadow-2xl border-8 border-neutral-950 aspect-[4/5] object-cover"
          />
        </div>

      </div>
    </section>
  );
}
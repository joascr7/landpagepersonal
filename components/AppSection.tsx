import Link from "next/link";

interface AppSectionProps {
  cliente: any; // Recebe os dados dinâmicos do cliente
}

export default function AppSection({ cliente }: AppSectionProps) {
  // Cria um objeto seguro caso o cliente venha como undefined/null
  const clienteValido = cliente || {};
  const ehEstetica = clienteValido.nicho === "estetica";

  // 🔥 Captura a cor do banco. Se não existir, define o padrão baseado no nicho
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  // Dicionário de cores estático preparado para fundo claro (Tailwind v4)
  const mapasDeCores: Record<string, any> = {
    blue: {
      textoDestaque: "text-blue-600",
      check: "text-blue-600",
      botao: "bg-blue-500 hover:bg-blue-600 shadow-blue-500/10",
    },
    purple: {
      textoDestaque: "text-purple-600",
      check: "text-purple-600",
      botao: "bg-purple-500 hover:bg-purple-600 shadow-purple-500/10",
    },
    pink: {
      textoDestaque: "text-pink-600",
      check: "text-pink-600",
      botao: "bg-pink-500 hover:bg-pink-600 shadow-pink-500/10",
    },
    amber: {
      textoDestaque: "text-amber-600",
      check: "text-amber-600",
      botao: "bg-amber-500 hover:bg-amber-600 shadow-amber-400/10",
    },
  };

  // Seleciona o estilo ativo com base na cor escolhida
  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

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

  // 🔥 Define a imagem fallback padrão caso não tenha nenhuma salva no Supabase
  const imagemPadrao = ehEstetica
    ? "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
    : "https://i.imgur.com/BsGnwHC.jpeg";

  // Prioriza o link do Supabase se o usuário tiver alterado
  const fotoSecao = clienteValido.img_app_section || imagemPadrao;

  return (
    <section className="bg-white text-neutral-900 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Lado Esquerdo: Benefícios do App ou do Espaço */}
        <div className="flex-1 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-neutral-950">
            {ehEstetica ? "Sua experiência será em alto nível" : "Seu treino será entregue in alto nível"}
          </h2>
          <p className="mt-4 text-lg text-neutral-600 font-medium">
            {ehEstetica ? (
              <>
                Toda a estrutura do <span className={`${estiloAtivo.textoDestaque} font-bold`}>Studio {clienteValido.nome}</span> a favor do seu bem-estar e autoestima.
              </>
            ) : (
              <>
                Toda a tecnologia do aplicativo <span className={`${estiloAtivo.textoDestaque} font-bold`}>MFit Personal</span> a favor dos seus resultados.
              </>
            )}
          </p>

          <ul className="mt-8 space-y-4">
            {features.map((item, idx) => (
              <li key={idx} className="flex items-start text-neutral-800 font-medium text-base">
                <span className={`${estiloAtivo.check} mr-3 font-bold text-lg`}>✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="#precos"
              className={`inline-block px-8 py-4 rounded-xl ${estiloAtivo.botao} text-neutral-950 font-black transition-colors text-base uppercase tracking-wider shadow-md`}
            >
              {ehEstetica ? "Agendar Meu Horário" : "Contratar Agora"}
            </Link>
          </div>
        </div>

        {/* Lado Direito: Imagem Ilustrativa Dinâmica */}
        <div className="flex-1 flex justify-center relative w-full max-w-md">
          {/* Círculo decorativo de fundo */}
          <div className="absolute w-72 h-72 bg-neutral-100 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
          
          {/* 🔥 Imagem mapeada dinamicamente para o Supabase */}
          <img 
            src={fotoSecao} 
            alt={ehEstetica ? `Studio ${clienteValido.nome}` : "MFit Personal App"} 
            className="w-full max-w-[320px] rounded-[40px] shadow-2xl border-8 border-neutral-950 aspect-[4/5] object-cover"
          />
        </div>

      </div>
    </section>
  );
}
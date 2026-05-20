import Link from "next/link";

export default function AppSection() {
  const features = [
    "Fotos e/ou vídeos demonstrativos de cada exercício;",
    "Cronômetro integrado dos tempos de descanso;",
    "Registros de frequência e histórico de cargas;",
    "Material de apoio exclusivo para potencializar resultados;",
    "Acesse tudo direto pelo smartphone ou navegador;",
    "Aplicativo leve e compatível com Android e iPhone (iOS).",
  ];

  return (
    <section className="bg-white text-neutral-900 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Lado Esquerdo: Benefícios do App */}
        <div className="flex-1 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-neutral-950">
            Seu treino será entregue em alto nível
          </h2>
          <p className="mt-4 text-lg text-neutral-600 font-medium">
            Toda a tecnologia do aplicativo <span className="text-amber-600 font-bold">MFit Personal</span> a favor dos seus resultados.
          </p>

          <ul className="mt-8 space-y-4">
            {features.map((item, idx) => (
              <li key={idx} className="flex items-start text-neutral-800 font-medium text-base">
                <span className="text-amber-600 mr-3 font-bold text-lg">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="#precos"
              className="inline-block px-8 py-4 rounded-xl bg-amber-500 text-neutral-950 font-black hover:bg-amber-600 transition-colors text-base uppercase tracking-wider shadow-md shadow-amber-500/10"
            >
              Contratar Agora
            </Link>
          </div>
        </div>

        {/* Lado Direito: Mockup do App MFit */}
        <div className="flex-1 flex justify-center relative w-full max-w-md">
          {/* Círculo decorativo de fundo */}
          <div className="absolute w-72 h-72 bg-neutral-100 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
          
          {/* Usamos uma imagem real de mockup de celular simulando o painel do MFit */}
          <img 
            src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80" 
            alt="MFit Personal App" 
            className="w-full max-w-[320px] rounded-[40px] shadow-2xl border-8 border-neutral-950"
          />
        </div>

      </div>
    </section>
  );
}
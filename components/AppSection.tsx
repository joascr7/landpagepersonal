"use client";

import Link from "next/link";

interface AppSectionProps {
  cliente: any;
}

export default function AppSection({ cliente }: AppSectionProps) {
  const clienteValido = cliente || {};
  const ehEstetica = clienteValido.nicho === "estetica";
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, any> = {
    blue: { textoDestaque: "text-blue-500", check: "text-blue-500", botao: "bg-blue-500 hover:bg-blue-600 text-white" },
    purple: { textoDestaque: "text-purple-500", check: "text-purple-500", botao: "bg-purple-500 hover:bg-purple-600 text-white" },
    pink: { textoDestaque: "text-pink-500", check: "text-pink-500", botao: "bg-pink-500 hover:bg-pink-600 text-white" },
    amber: { textoDestaque: "text-amber-500", check: "text-amber-500", botao: "bg-amber-500 hover:bg-amber-600 text-neutral-950" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

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

  const imagemPadrao = ehEstetica
    ? "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
    : "https://i.imgur.com/BsGnwHC.jpeg";

  const fotoSecao = clienteValido.img_app_section || imagemPadrao;

  return (
    // ADICIONEI O ID AQUI: Agora a Navbar sabe exatamente para onde rolar
    <section id={ehEstetica ? "agendamento" : "app"} className="bg-inherit text-inherit py-20 md:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="flex-1 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
            {ehEstetica ? "Sua experiência será em alto nível" : "Seu treino será entregue em alto nível"}
          </h2>
          <p className="mt-4 text-lg opacity-70 font-medium">
            {ehEstetica ? (
              <>Toda a estrutura do <span className={`${estiloAtivo.textoDestaque} font-bold`}>Studio {clienteValido.nome}</span> a favor do seu bem-estar.</>
            ) : (
              <>Toda a tecnologia do aplicativo <span className={`${estiloAtivo.textoDestaque} font-bold`}>MFit Personal</span> a favor dos seus resultados.</>
            )}
          </p>

          <ul className="mt-8 space-y-4">
            {features.map((item, idx) => (
              <li key={idx} className="flex items-start font-medium text-base">
                <span className={`${estiloAtivo.check} mr-3 font-bold text-lg`}>✓</span>
                <span className="opacity-80">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href={ehEstetica ? "#agendamento" : "#precos"}
              className={`inline-block px-8 py-4 rounded-xl ${estiloAtivo.botao} font-black transition-all text-base uppercase tracking-wider shadow-lg`}
            >
              {ehEstetica ? "Agendar Meu Horário" : "Contratar Agora"}
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center relative w-full max-w-md">
          <div className="absolute w-72 h-72 bg-current/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
          
          <img 
            src={fotoSecao} 
            alt="Destaque da Seção" 
            className="w-full max-w-[320px] rounded-[40px] shadow-2xl border-8 border-current/5 aspect-[4/5] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
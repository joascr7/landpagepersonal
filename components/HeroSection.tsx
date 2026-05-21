import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  cliente: any; // Recebe os dados dinâmicos do cliente
}

export default function HeroSection({ cliente }: HeroSectionProps) {
  // Verifica se o nicho é estética ou fitness
  const ehEstetica = cliente.nicho === "estetica";

  // Captura a cor do banco. Se não existir, define o padrão baseado no nicho
  const corDefinida = cliente.tema_cor || (ehEstetica ? "pink" : "amber");

  // Dicionário de cores estático para o Tailwind compilar perfeitamente
  const mapasDeCores: Record<string, any> = {
    blue: {
      texto: "text-blue-500",
      bgBadge: "bg-blue-500/10 border-blue-500/20",
      botao: "bg-blue-500 hover:bg-blue-400 shadow-blue-500/20",
      luz: "bg-blue-500/10",
    },
    purple: {
      texto: "text-purple-500",
      bgBadge: "bg-purple-500/10 border-purple-500/20",
      botao: "bg-purple-500 hover:bg-purple-400 shadow-purple-500/20",
      luz: "bg-purple-500/10",
    },
    pink: {
      texto: "text-pink-500",
      bgBadge: "bg-pink-500/10 border-pink-500/20",
      botao: "bg-pink-500 hover:bg-pink-400 shadow-pink-500/20",
      luz: "bg-pink-500/10",
    },
    amber: {
      texto: "text-amber-500",
      bgBadge: "bg-amber-500/10 border-amber-500/20",
      botao: "bg-amber-500 hover:bg-amber-400 shadow-amber-500/20",
      luz: "bg-amber-500/10",
    },
  };

  // Seleciona o estilo atual ou cai no fallback caso escrevam algo diferente no banco
  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
      
      {/* Lado Esquerdo: Textos e Botão de Ação */}
      <div className="flex-1 max-w-2xl text-center md:text-left z-10">
        <span className={`inline-flex items-center gap-2 rounded-full ${estiloAtivo.bgBadge} px-4 py-1.5 text-sm font-medium ${estiloAtivo.texto} border mb-6`}>
          🔥 Vagas limitadas para este mês
        </span>
        
        {/* 🔥 TÍTULO ALTERÁVEL PELO BANCO DE DADOS */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
          {cliente.hero_titulo || (
            ehEstetica ? (
              <>
                Unhas impecáveis e <span className={estiloAtivo.texto}>Alta Estima</span> na palma da sua mão.
              </>
            ) : (
              <>
                O seu <span className={estiloAtivo.texto}>Personal Trainer</span> na palma da sua mão.
              </>
            )
          )}
        </h1>
        
        {/* 🔥 DESCRIÇÃO ALTERÁVEL PELO BANCO DE DADOS */}
        <p className="mt-6 text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed">
          {cliente.hero_subtitulo || (
            ehEstetica ? (
              <>
                Esqueça os procedimentos genéricos que danificam suas unhas. Tenha um atendimento personalizado por <strong className="text-white">{cliente.nome}</strong> com materiais de alta performance, focado no seu style, rotina e durabilidade extrema.
              </>
            ) : (
              <>
                Chega de treinos genéricos de ficha de academia. Tenha um planejamento de treino de alta performance feito exclusivamente por <strong className="text-white">{cliente.nome}</strong> para o seu corpo, rotina e objetivos, com acompanhamento diário.
              </>
            )
          )}
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          <Link
            href="#precos"
            className={`w-full sm:w-auto text-center px-8 py-4 rounded-xl ${estiloAtivo.botao} text-neutral-950 font-bold transition-colors text-lg shadow-lg`}
          >
            Quero Começar Agora
          </Link>
          
          <div className="flex items-center gap-2 text-sm text-neutral-400 mt-2 sm:mt-0">
            <span className="flex -space-x-2">
              {/* Círculos simulando fotos de alunos */}
              <span className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-950 inline-block"></span>
              <span className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-neutral-950 inline-block"></span>
              <span className="w-8 h-8 rounded-full bg-neutral-600 border-2 border-neutral-950 inline-block"></span>
            </span>
            <span>{ehEstetica ? "+de 300 unhas transformadas" : "+de 300 vidas transformadas"}</span>
          </div>
        </div>
      </div>

      {/* Lado Direito: Foto do Cliente Dinâmica */}
      <div className="flex-1 relative w-full max-w-md md:max-w-none flex justify-center">
        {/* Efeito de luz de fundo dinâmico */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 ${estiloAtivo.luz} rounded-full blur-[80px]`}></div>
        
        {/* Caixa da Foto */}
        <div className="relative w-full aspect-[4/5] max-w-[380px] rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden shadow-2xl flex items-center justify-center group hover:border-neutral-700 transition-colors">
          
          {cliente.foto_hero ? (
            <Image
              src={cliente.foto_hero}
              alt={`Foto de ${cliente.nome}`}
              fill
              className="object-cover"
              sizes="(max-w-md) 100vw, 380px"
              priority
            />
          ) : (
            <div className="text-center p-6 select-none">
              <p className="text-neutral-500 text-sm font-mono mb-2">[ Espaço para Foto de {cliente.nome} ]</p>
              <p className="text-neutral-400 text-xs px-4">
                {ehEstetica 
                  ? "Aqui aparecerá a foto do seu studio ou dos seus melhores trabalhos transmitindo total autoridade e elegância."
                  : "Aqui colocaremos uma foto sua em alta resolução com câmera profissional transmitindo autoridade."}
              </p>
            </div>
          )}

        </div>
      </div>

    </section>
  );
}
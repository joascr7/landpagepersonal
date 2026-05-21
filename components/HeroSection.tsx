import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  cliente: any; // Recebe os dados dinâmicos do cliente
}

export default function HeroSection({ cliente }: HeroSectionProps) {
  // Verifica se o nicho é estética ou fitness
  const ehEstetica = cliente.nicho === "estetica";

  // Mapeia as cores dinâmicas
  const corBadgeTexto = ehEstetica ? "text-pink-500" : "text-amber-500";
  const corBadgeBg = ehEstetica ? "bg-pink-500/10 border-pink-500/20" : "bg-amber-500/10 border-amber-500/20";
  const corDestaque = ehEstetica ? "text-pink-500" : "text-amber-500";
  const corBotao = ehEstetica ? "bg-pink-500 hover:bg-pink-400 shadow-pink-500/20" : "bg-amber-500 hover:bg-amber-400 shadow-amber-500/20";
  const corLuzFundo = ehEstetica ? "bg-pink-500/10" : "bg-amber-500/10";

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
      
      {/* Lado Esquerdo: Textos e Botão de Ação */}
      <div className="flex-1 max-w-2xl text-center md:text-left z-10">
        <span className={`inline-flex items-center gap-2 rounded-full ${corBadgeBg} px-4 py-1.5 text-sm font-medium ${corBadgeTexto} border mb-6`}>
          🔥 Vagas limitadas para este mês
        </span>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
          {ehEstetica ? (
            <>
              Unhas impecáveis e <span className={corDestaque}>Alta Estima</span> na palma da sua mão.
            </>
          ) : (
            <>
              O seu <span className={corDestaque}>Personal Trainer</span> na palma da sua mão.
            </>
          )}
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed">
          {ehEstetica ? (
            <>
              Esqueça os procedimentos genéricos que danificam suas unhas. Tenha um atendimento personalizado por <strong className="text-white">{cliente.nome}</strong> com materiais de alta performance, focado no seu estilo, rotina e durabilidade extrema.
            </>
          ) : (
            <>
              Chega de treinos genéricos de ficha de academia. Tenha um planejamento de treino de alta performance feito exclusivamente por <strong className="text-white">{cliente.nome}</strong> para o seu corpo, rotina e objetivos, com acompanhamento diário.
            </>
          )}
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          <Link
            href="#precos"
            className={`w-full sm:w-auto text-center px-8 py-4 rounded-xl ${corBotao} text-neutral-950 font-bold transition-colors text-lg shadow-lg`}
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
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 ${corLuzFundo} rounded-full blur-[80px]`}></div>
        
        {/* Caixa da Foto */}
        <div className="relative w-full aspect-[4/5] max-w-[380px] rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden shadow-2xl flex items-center justify-center group hover:border-neutral-700 transition-colors">
          
          {cliente.logo_url ? (
            // Se o cliente já tiver enviado a foto no painel, exibe ela aqui
            <Image
              src={cliente.logo_url}
              alt={`Foto de ${cliente.nome}`}
              fill
              className="object-cover"
              sizes="(max-w-md) 100vw, 380px"
              priority
            />
          ) : (
            // Texto provisório caso o cliente ainda não tenha feito o upload no banco
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
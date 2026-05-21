import Image from "next/image";

interface AboutSectionProps {
  cliente: any; // Recebe os dados dinâmicos do cliente
}

export default function AboutSection({ cliente }: AboutSectionProps) {
  const ehEstetica = cliente.nicho === "estetica";

  // Captura a cor do banco. Se não existir, define o padrão baseado no nicho
  const corDefinida = cliente.tema_cor || (ehEstetica ? "pink" : "amber");

  // Dicionário de cores estático preparado para o Tailwind v4
  const mapasDeCores: Record<string, any> = {
    blue: {
      texto: "text-blue-500",
      seloBg: "bg-blue-500/10 border-blue-500/20",
      seloCheck: "text-blue-500",
    },
    purple: {
      texto: "text-purple-500",
      seloBg: "bg-purple-500/10 border-purple-500/20",
      seloCheck: "text-purple-500",
    },
    pink: {
      texto: "text-pink-500",
      seloBg: "bg-pink-500/10 border-pink-500/20",
      seloCheck: "text-pink-500",
    },
    amber: {
      texto: "text-amber-500",
      seloBg: "bg-amber-500/10 border-amber-500/20",
      seloCheck: "text-amber-500",
    },
  };

  // Seleciona o estilo ativo com base na cor escolhida
  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-neutral-900 bg-neutral-900/10">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Lado da Imagem Secundária Dinâmica */}
        <div className="flex-1 w-full max-w-sm aspect-[3/4] rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden shadow-2xl flex items-center justify-center group hover:border-neutral-700 transition-colors relative">
          
          {/* Busca a coluna foto_about do banco */}
          {cliente.foto_about ? (
            <Image
              src={cliente.foto_about}
              alt={`Sobre ${cliente.nome}`}
              fill
              className="object-cover"
              sizes="(max-w-md) 100vw, 380px"
            />
          ) : (
            <div className="text-center p-6 select-none font-mono text-neutral-500">
              {ehEstetica 
                ? `[ Foto de ${cliente.nome} no Studio ou aplicando Gel ]`
                : "[ Foto sua atuando como Personal ou estudando ]"}
            </div>
          )}
        </div>

        {/* Lado do Texto de Autoridade */}
        <div className="flex-1">
          <h2 className={`text-base font-semibold ${estiloAtivo.texto} uppercase tracking-wide`}>
            {ehEstetica ? "Especialista" : "Treinador"}
          </h2>
          
          {/* 🔥 TÍTULO DO SOBRE CONECTADO À SUA COLUNA SOBRE_TITULO */}
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            {cliente.sobre_titulo || (
              ehEstetica 
                ? "Técnica, durabilidade e sofisticação combinadas."
                : "Ciência na prática, sem perda de tempo."
            )}
          </p>
          
          {/* 🔥 PARÁGRAFO 1 CONECTADO À SUA COLUNA SOBRE_TEXTO_1 */}
          <p className="mt-6 text-neutral-400 leading-relaxed text-lg">
            {cliente.sobre_texto_1 ? (
              cliente.sobre_texto_1
            ) : ehEstetica ? (
              <>
                Meu nome é <strong className="text-white">{cliente.nome}</strong> e sou especialista em embelezamento e saúde das unhas. Todo o meu trabalho é pautado no uso de materiais premium de altíssima durabilidade e em técnicas avançadas de simetria e acabamento natural.
              </>
            ) : (
              <>
                Meu nome é <strong className="text-white">{cliente.nome}</strong> e tenho anos de experiência com prescrição de treinamento de alta performance e emagrecimento. Todos os programas da minha consultoria fitness online são baseados em evidências científicas e anos de experimentação prática.
              </>
            )}
          </p>
          
          {/* 🔥 PARÁGRAFO 2 CONECTADO À SUA COLUNA SOBRE_TEXTO_2 */}
          <p className="mt-4 text-neutral-400 leading-relaxed text-lg">
            {cliente.sobre_texto_2 ? (
              cliente.sobre_texto_2
            ) : ehEstetica ? (
              <>
                Meu objetivo é estruturar um atendimento personalizado para que você tenha unhas impecáveis, resistentes e que blindem a sua autoestima na correria do dia a dia.
              </>
            ) : (
              <>
                Meu objetivo é estruturar uma rotina de treinos inteligente para que você conquiste o corpo que deseja de forma consistente, sem precisar passar horas dentro de uma academia.
              </>
            )}
          </p>

          {/* Selo de Confiança */}
          <div className="mt-8 pt-6 border-t border-neutral-900 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${estiloAtivo.seloBg} flex items-center justify-center ${estiloAtivo.seloCheck} font-bold text-xl`}>
              ✓
            </div>
            <div>
              <p className="text-white font-bold text-sm">
                {ehEstetica ? "Profissional Certificada" : "Profissional Registrado"}
              </p>
              <p className="text-neutral-500 text-xs uppercase tracking-wider font-mono">
                {ehEstetica 
                  ? "Materiais Esterilizados / Biossegurança Garantida"
                  : "CREF Garantido / Habilitado Legalmente"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
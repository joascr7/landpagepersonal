interface AboutSectionProps {
  cliente: any; // Recebe os dados dinâmicos do cliente
}

export default function AboutSection({ cliente }: AboutSectionProps) {
  const ehEstetica = cliente.nicho === "estetica";

  // Cores dinâmicas
  const corTexto = ehEstetica ? "text-pink-500" : "text-amber-500";
  const corSeloBg = ehEstetica ? "bg-pink-500/10 border-pink-500/20" : "bg-amber-500/10 border-amber-500/20";
  const corSeloCheck = ehEstetica ? "text-pink-500" : "text-amber-500";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-neutral-900 bg-neutral-900/10">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Lado da Imagem Secundária */}
        <div className="flex-1 w-full max-w-sm aspect-[3/4] bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-center p-6 text-neutral-500 font-mono">
          {ehEstetica 
            ? `[ Foto de ${cliente.nome} no Studio ou aplicando Gel ]`
            : "[ Foto sua atuando como Personal ou estudando ]"}
        </div>

        {/* Lado do Texto de Autoridade */}
        <div className="flex-1">
          <h2 className={`text-base font-semibold ${corTexto} uppercase tracking-wide`}>
            {ehEstetica ? "Especialista" : "Treinador"}
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            {ehEstetica 
              ? "Técnica, durabilidade e sofisticação combinadas."
              : "Ciência na prática, sem perda de tempo."}
          </p>
          <p className="mt-6 text-neutral-400 leading-relaxed text-lg">
            {ehEstetica ? (
              <>
                Meu nome é <strong className="text-white">{cliente.nome}</strong> e sou especialista em embelezamento e saúde das unhas. Todo o meu trabalho é pautado no uso de materiais premium de altíssima durabilidade e em técnicas avançadas de simetria e acabamento natural.
              </>
            ) : (
              <>
                Meu nome é <strong className="text-white">{cliente.nome}</strong> e tenho anos de experiência com prescrição de treinamento de alta performance e emagrecimento. Todos os programas da minha consultoria fitness online são baseados em evidências científicas e anos de experimentação prática.
              </>
            )}
          </p>
          <p className="mt-4 text-neutral-400 leading-relaxed text-lg">
            {ehEstetica ? (
              <>
                Meu objetivo é estruturar um atendimento personalizado para que você tenha unhas impecáveis, resistentes e que blindem a sua autoestima na correria do dia a dia.
              </>
            ) : (
              <>
                Meu objetivo é estruturar uma rotina de treinos inteligente para que você conquiste o corpo que deseja de forma consistente, sem precisar passar horas dentro de uma academia.
              </>
            )}
          </p>

          {/* Selo de Confiança Dinâmico */}
          <div className="mt-8 pt-6 border-t border-neutral-900 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${corSeloBg} flex items-center justify-center ${corSeloCheck} font-bold text-xl`}>
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
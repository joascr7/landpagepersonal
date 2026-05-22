"use client";

interface HeroSectionProps {
  cliente: any; // Dados do Supabase vindos do page.tsx
}

export default function HeroSection({ cliente }: HeroSectionProps) {
  const clienteValido = cliente || {};
  const ehEstetica = clienteValido.nicho === "estetica";

  // Configuração dinâmica de cores de acordo com o tema selecionado
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, { botao: string; textoDestaque: string; badge: string; estrelas: string }> = {
    blue: { 
      botao: "bg-blue-500 hover:bg-blue-400 text-neutral-950 shadow-lg shadow-blue-500/10", 
      textoDestaque: "text-blue-500",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      estrelas: "text-blue-500"
    },
    purple: { 
      botao: "bg-purple-500 hover:bg-purple-400 text-white shadow-lg shadow-purple-500/10", 
      textoDestaque: "text-purple-500",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      estrelas: "text-purple-500"
    },
    pink: { 
      botao: "bg-pink-500 hover:bg-pink-400 text-white shadow-lg shadow-pink-500/10", 
      textoDestaque: "text-pink-500",
      badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      estrelas: "text-pink-500"
    },
    amber: { 
      botao: "bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/10", 
      textoDestaque: "text-amber-500",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      estrelas: "text-amber-500"
    },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  // Rolagem suave
  const handleCliqueBotaoHero = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const idAlvo = ehEstetica ? "agendamento" : "precos";
    const elementoAlvo = document.getElementById(idAlvo);
    if (elementoAlvo) {
      elementoAlvo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden z-20">
      
      {/* 🌟 BG DE DEGRADÊ DE FUNDO PREMIUM (Efeito Glow sutil) */}
      <div className="absolute top-1/4 left-1/4 -z-10 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* LADO ESQUERDO: Textos e Chamada Principal */}
      <div className="flex-1 text-center md:text-left space-y-6 max-w-2xl">
        
        {/* Badge superior com design limpo */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${estiloAtivo.badge}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span>
          {ehEstetica ? "Vagas limitadas para este mês" : "Consultoria Fitness Online"}
        </div>

        {/* Título com tipografia marcante */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.95]">
          {ehEstetica ? (
            <>
              Unhas impecáveis e <span className={estiloAtivo.textoDestaque}>Alta Estima</span> na palma da sua mão.
            </>
          ) : (
            <>
              Conquiste o <span className={estiloAtivo.textoDestaque}>Corpo Ideal</span> de forma inteligente.
            </>
          )}
        </h1>

        {/* Parágrafo focado em conversão */}
        <p className="text-neutral-400 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
          {ehEstetica ? (
            <>
              Esqueça os procedimentos genéricos que danificam suas unhas. Tenha um atendimento personalizado por <strong className="text-white font-semibold">{clienteValido.nome || "Especialista"}</strong> com materiais de alta performance, focado no seu estilo, rotina e durabilidade extrema.
            </>
          ) : (
            <>
              Treinos personalizados montados de acordo com a sua rotina e objetivo. Tenha o acompanhamento diário com o especialista <strong className="text-white font-semibold">{clienteValido.nome}</strong> e alcance resultados reais sem dietas milagrosas.
            </>
          )}
        </p>

        {/* BLOCO DE AÇÃO CORRIGIDO E PROFISSIONAL */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
          <a
            href={ehEstetica ? "#agendamento" : "#precos"}
            onClick={handleCliqueBotaoHero}
            className={`w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-widest text-center rounded-xl transition-all duration-300 scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${estiloAtivo.botao}`}
          >
            {ehEstetica ? "Agendar Meu Horário" : "Quero Começar Agora"}
          </a>

          {/* 🔥 PROVA SOCIAL MODELO AGÊNCIA REALISTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 border-l border-neutral-900 sm:pl-6 py-1">
            
            {/* Imagens de Clientes Reais de Estética (Empilhadas) */}
            <div className="flex -space-x-3 isolate">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" 
                alt="Cliente" 
                className="w-9 h-9 rounded-full object-cover border-2 border-neutral-950 shadow-md ring-1 ring-neutral-800"
              />
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80" 
                alt="Cliente" 
                className="w-9 h-9 rounded-full object-cover border-2 border-neutral-950 shadow-md ring-1 ring-neutral-800"
              />
              <img 
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80" 
                alt="Cliente" 
                className="w-9 h-9 rounded-full object-cover border-2 border-neutral-950 shadow-md ring-1 ring-neutral-800"
              />
            </div>

            {/* Estrelas e Contador texturizado */}
            <div className="text-center sm:text-left space-y-0.5">
              <div className="flex items-center justify-center sm:justify-start gap-0.5 text-amber-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-xs font-bold text-neutral-300 tracking-wide">
                {ehEstetica ? "+300 Unhas Transformadas" : "+500 Vidas Transformadas"}
              </p>
              <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
                Clientes 100% Satisfeitas
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* LADO DIREITO: Foto Principal do Banco de Dados */}
      <div className="flex-1 w-full max-w-md aspect-[4/5] relative rounded-3xl overflow-hidden border border-neutral-900 bg-neutral-900/20 shadow-2xl flex items-center justify-center group hover:border-neutral-800 transition-colors duration-300">
        {clienteValido.foto_hero ? (
          <img 
            src={clienteValido.foto_hero} 
            alt={`Apresentação de ${clienteValido.nome}`}
            className="w-full h-full object-cover filter brightness-95 group-hover:scale-102 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="text-center p-6 font-mono text-xs text-neutral-600 select-none">
            [ Foto Principal configurada via Painel Admin ]
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-70"></div>
      </div>

    </section>
  );
}
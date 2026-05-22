"use client";

interface HeroSectionProps {
  cliente: any;
}

export default function HeroSection({ cliente }: HeroSectionProps) {
  const clienteValido = cliente || {};
  const ehEstetica = clienteValido.nicho === "estetica";

  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, { botao: string; textoDestaque: string; badge: string; estrelas: string }> = {
    blue: { 
      botao: "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20", 
      textoDestaque: "text-blue-500",
      badge: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      estrelas: "text-blue-500"
    },
    purple: { 
      botao: "bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/20", 
      textoDestaque: "text-purple-500",
      badge: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      estrelas: "text-purple-500"
    },
    pink: { 
      botao: "bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/20", 
      textoDestaque: "text-pink-500",
      badge: "bg-pink-500/10 text-pink-500 border-pink-500/20",
      estrelas: "text-pink-500"
    },
    amber: { 
      botao: "bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-lg shadow-amber-500/20", 
      textoDestaque: "text-amber-500",
      badge: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      estrelas: "text-amber-500"
    },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  const handleCliqueBotaoHero = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const idAlvo = ehEstetica ? "agendamento" : "precos";
    const elementoAlvo = document.getElementById(idAlvo);
    if (elementoAlvo) elementoAlvo.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden z-20 bg-inherit text-inherit">
      
      {/* Lado Esquerdo: Conteúdo */}
      <div className="flex-1 text-center md:text-left space-y-6 max-w-2xl">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${estiloAtivo.badge}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span>
          {ehEstetica ? "Vagas limitadas para este mês" : "Consultoria Fitness Online"}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95]">
          {ehEstetica ? (
            <>Unhas impecáveis e <span className={estiloAtivo.textoDestaque}>Alta Estima</span> na palma da sua mão.</>
          ) : (
            <>Conquiste o <span className={estiloAtivo.textoDestaque}>Corpo Ideal</span> de forma inteligente.</>
          )}
        </h1>

        <p className="text-inherit opacity-70 text-base sm:text-lg max-w-xl leading-relaxed">
          {ehEstetica ? (
            <>Esqueça procedimentos genéricos. Atendimento personalizado por <strong className="font-semibold">{clienteValido.nome || "Especialista"}</strong> focado no seu estilo.</>
          ) : (
            <>Treinos personalizados montados de acordo com sua rotina. Acompanhamento diário com o especialista <strong className="font-semibold">{clienteValido.nome}</strong> sem dietas milagrosas.</>
          )}
        </p>

        {/* Botão de Ação e Prova Social */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
          <a
            href={ehEstetica ? "#agendamento" : "#precos"}
            onClick={handleCliqueBotaoHero}
            className={`w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-widest text-center rounded-xl transition-all ${estiloAtivo.botao}`}
          >
            {ehEstetica ? "Agendar Meu Horário" : "Quero Começar Agora"}
          </a>

          {/* Prova Social */}
          <div className="flex items-center gap-4 border-l border-current/10 pl-6 py-1">
            <div className="text-left space-y-0.5">
              <div className={`flex gap-0.5 ${estiloAtivo.estrelas}`}>★★★★★</div>
              <p className="text-xs font-bold opacity-90 tracking-wide">
                {ehEstetica ? "+300 Unhas Transformadas" : "+500 Vidas Transformadas"}
              </p>
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">
                {ehEstetica ? "CLIENTES 100% SATISFEITAS" : "CLIENTES 100% SATISFEITOS"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito: Imagem */}
      <div className="flex-1 w-full max-w-md aspect-[4/5] relative rounded-3xl overflow-hidden border border-current/10 bg-current/5 shadow-2xl flex items-center justify-center">
        {clienteValido.foto_hero ? (
          <img src={clienteValido.foto_hero} alt="Foto Hero" className="w-full h-full object-cover" />
        ) : (
          <div className="text-xs opacity-50 font-mono italic">[Foto Configurada no Admin]</div>
        )}
      </div>
    </section>
  );
}
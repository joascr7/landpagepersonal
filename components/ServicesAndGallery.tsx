"use client";

interface ServicesAndGalleryProps {
  cliente: any;
  servicos?: any[];
  galeria?: any[];
}

export default function ServicesAndGallery({ cliente, servicos = [], galeria = [] }: ServicesAndGalleryProps) {
  const ehEstetica = cliente?.nicho === "estetica";

  return (
    <>
      {/* 💅 SEÇÃO DE PROCEDIMENTOS / PLANOS: Só renderiza se houver serviços OU se for estética (para mostrar a mensagem de vazio) */}
      {(servicos.length > 0 || ehEstetica) && (
        <section id="services" className="py-20 max-w-6xl mx-auto px-4 border-t border-neutral-900 bg-neutral-950 scroll-mt-20">
          <div id="servicos" className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
              {ehEstetica ? "Nossos Procedimentos" : "Planos de Consultoria"}
            </h2>
            <div className={`w-12 h-1 ${ehEstetica ? 'bg-pink-500' : 'bg-amber-500'} mx-auto mt-3 rounded-full`}></div>
          </div>

          {servicos.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-neutral-800 rounded-2xl">
              <p className="text-sm text-neutral-500">
                {ehEstetica ? "Nenhum procedimento cadastrado." : "Nenhum plano de treino cadastrado."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicos.map((servico) => (
                <div 
                  key={servico.id} 
                  className="bg-neutral-900/40 border border-neutral-900 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-center justify-between hover:border-neutral-800 transition-all group"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto text-center sm:text-left flex-col sm:flex-row">
                    {servico.imagem_url && (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-neutral-800 shrink-0">
                        <img 
                          src={servico.imagem_url} 
                          alt={servico.nome}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <h3 className="font-bold text-lg text-white">{servico.nome}</h3>
                        {servico.em_promocao && (
                          <span className={`text-[10px] font-black uppercase tracking-wider text-white px-2 py-0.5 rounded-md animate-pulse ${ehEstetica ? 'bg-pink-500' : 'bg-amber-500'}`}>
                            Promo
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-400 text-xs mt-1 max-w-xs">{servico.descricao}</p>
                    </div>
                  </div>

                  <div className="text-center sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-neutral-800/60 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                    <div>
                      {servico.em_promocao ? (
                        <>
                          <p className="text-xs text-neutral-500 line-through">R$ {Number(servico.preco).toFixed(2)}</p>
                          <p className={`text-xl font-black ${ehEstetica ? 'text-pink-500' : 'text-amber-500'}`}>R$ {Number(servico.preco_promocional).toFixed(2)}</p>
                        </>
                      ) : (
                        <p className="text-xl font-black text-white">R$ {Number(servico.preco).toFixed(2)}</p>
                      )}
                    </div>
                    
                    <a 
                      href={ehEstetica ? "#agendamento" : `https://wa.me/${cliente.whatsapp_numero?.replace(/\D/g, "")}?text=Ol%C3%A1%2C+tenho+interesse+no+plano+${encodeURIComponent(servico.nome)}`}
                      target={ehEstetica ? "_self" : "_blank"}
                      onClick={ehEstetica ? () => {
                        const evento = new CustomEvent("selecionarServico", { detail: servico.id });
                        window.dispatchEvent(evento);
                      } : undefined}
                      className={`${ehEstetica ? 'bg-neutral-800 hover:bg-pink-500' : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'} font-bold px-4 py-2.5 rounded-xl text-xs tracking-wider transition-all uppercase select-none cursor-pointer`}
                    >
                      {ehEstetica ? "Agendar" : "Saber mais"}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 📸 SEÇÃO DA GALERIA / VITRINE */}
      <section id="galeria" className="py-20 max-w-6xl mx-auto px-4 border-t border-neutral-900 bg-neutral-950 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">
            {ehEstetica ? "Trabalhos Reais" : "Vitrine de Resultados"}
          </h2>
          <p className="text-neutral-500 text-xs uppercase tracking-widest mt-2">
            {ehEstetica ? "Fotos do nosso Studio" : "Fotos de Evolução de Alunos"}
          </p>
        </div>

        {galeria.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-neutral-800 rounded-2xl">
            <p className="text-sm text-neutral-500">
              {ehEstetica ? "Nenhuma foto adicionada ao portfólio ainda." : "Nenhum resultado postado ainda."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galeria.map((foto) => (
              <div 
                key={foto.id} 
                className="relative aspect-square rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-900 group cursor-pointer"
              >
                <img 
                  src={foto.imagem_url} 
                  alt="Resultado ou trabalho"
                  className="object-cover w-full h-full filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
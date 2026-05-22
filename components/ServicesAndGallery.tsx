"use client";

interface ServicesAndGalleryProps {
  cliente: any;
  servicos?: any[];
  galeria?: any[];
}

export default function ServicesAndGallery({ cliente, servicos = [], galeria = [] }: ServicesAndGalleryProps) {
  const clienteValido = cliente || {};
  const ehEstetica = clienteValido.nicho === "estetica";
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, string> = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    amber: "bg-amber-500",
  };

  const corAtiva = mapasDeCores[corDefinida] || (ehEstetica ? "bg-pink-500" : "bg-amber-500");
  const corTextoAtiva = corAtiva.replace("bg-", "text-");

  return (
    <>
      {/* SEÇÃO DE PROCEDIMENTOS / PLANOS */}
      {(servicos.length > 0 || ehEstetica) && (
        <section id="services" className="py-24 max-w-6xl mx-auto px-4 border-t border-current/10 bg-inherit text-inherit scroll-mt-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black uppercase tracking-tight">
              {ehEstetica ? "Nossos Procedimentos" : "Planos de Consultoria"}
            </h2>
            <div className={`w-20 h-1.5 ${corAtiva} mx-auto mt-6 rounded-full`}></div>
          </div>

          {servicos.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-current/20 rounded-3xl">
              <p className="text-sm opacity-60">Nenhum item cadastrado no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicos.map((servico) => (
                <div key={servico.id} className="bg-current/5 border border-current/10 rounded-3xl p-8 flex flex-col gap-6 transition-all hover:border-current/20">
                  <div className="flex flex-col items-center text-center gap-6">
                    {servico.imagem_url && (
                      <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-current/10 shadow-lg shrink-0">
                        <img src={servico.imagem_url} alt={servico.nome} className="object-cover w-full h-full" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 justify-center">
                        <h3 className="font-black text-2xl uppercase tracking-tight">{servico.nome}</h3>
                        {servico.em_promocao && (
                          <span className={`text-[10px] font-black uppercase text-white px-2 py-0.5 rounded-md ${corAtiva}`}>Promo</span>
                        )}
                      </div>
                      <p className="opacity-60 text-sm mt-3 leading-relaxed max-w-sm">{servico.descricao}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-current/10">
                    <div className="font-black text-2xl">
                      {servico.em_promocao ? (
                        <div className="flex items-baseline gap-3">
                          <p className="text-sm opacity-50 line-through">R$ {Number(servico.preco).toFixed(2)}</p>
                          <p className={`text-2xl ${corTextoAtiva}`}>R$ {Number(servico.preco_promocional).toFixed(2)}</p>
                        </div>
                      ) : (
                        <p>R$ {Number(servico.preco).toFixed(2)}</p>
                      )}
                    </div>
                    
                    <a 
                      href={ehEstetica ? "#agendamento" : `https://wa.me/${cliente.whatsapp_numero?.replace(/\D/g, "")}?text=Interesse+no+plano+${encodeURIComponent(servico.nome)}`}
                      className={`${corAtiva} font-black px-8 py-4 rounded-xl text-xs tracking-widest uppercase text-white transition-all hover:opacity-90 cursor-pointer`}
                      onClick={ehEstetica ? () => window.dispatchEvent(new CustomEvent("selecionarServico", { detail: servico.id })) : undefined}
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

      {/* SEÇÃO DA GALERIA */}
      <section id="galeria" className="py-24 max-w-6xl mx-auto px-4 border-t border-current/10 bg-inherit text-inherit scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tight">
            {ehEstetica ? "Trabalhos Reais" : "Vitrine de Resultados"}
          </h2>
        </div>

        {galeria.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-current/20 rounded-3xl">
            <p className="text-sm opacity-50">Nenhuma foto adicionada ao portfólio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {galeria.map((foto) => (
              <div key={foto.id} className="relative aspect-square rounded-3xl overflow-hidden border border-current/10 bg-current/5 cursor-pointer shadow-lg group">
                <img src={foto.imagem_url} alt="Galeria" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
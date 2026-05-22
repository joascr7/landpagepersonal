"use client";

import Image from "next/image";

interface AboutSectionProps {
  cliente: any;
}

export default function AboutSection({ cliente }: AboutSectionProps) {
  const clienteValido = cliente || {};
  const ehEstetica = clienteValido.nicho === "estetica";
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, any> = {
    blue: { texto: "text-blue-500", seloBg: "bg-blue-500/10", seloCheck: "text-blue-500" },
    purple: { texto: "text-purple-500", seloBg: "bg-purple-500/10", seloCheck: "text-purple-500" },
    pink: { texto: "text-pink-500", seloBg: "bg-pink-500/10", seloCheck: "text-pink-500" },
    amber: { texto: "text-amber-500", seloBg: "bg-amber-500/10", seloCheck: "text-amber-500" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];
  const urlDaFoto = clienteValido.foto_about || clienteValido.foto_sobre;

  return (
    // bg-inherit e border-current/10 permitem que esta seção se adapte automaticamente ao tema
    <section id="sobre" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-current/10 bg-inherit text-inherit scroll-mt-20">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Lado da Imagem: bg-current/5 cria um leve fundo sobre o tema pai */}
        <div className="flex-1 w-full max-w-sm aspect-[3/4] rounded-2xl border border-current/10 bg-current/5 overflow-hidden shadow-2xl flex items-center justify-center relative">
          {urlDaFoto ? (
            <Image
              src={urlDaFoto}
              alt={`Sobre ${clienteValido.nome}`}
              fill
              className="object-cover"
              sizes="(max-w-md) 100vw, 380px"
              priority
            />
          ) : (
            <div className="text-center p-6 select-none font-mono opacity-50">
              {ehEstetica ? "[ Foto de Aplicando Gel ]" : "[ Foto sua atuando ]"}
            </div>
          )}
        </div>

        {/* Lado do Texto: Usa opacidade em vez de cor fixa */}
        <div className="flex-1">
          <h2 className={`text-base font-semibold ${estiloAtivo.texto} uppercase tracking-wide`}>
            {ehEstetica ? "Especialista" : "Treinador"}
          </h2>
          
          <h3 className="mt-2 text-3xl font-extrabold sm:text-4xl leading-tight">
            {clienteValido.sobre_titulo || (ehEstetica ? "Técnica, durabilidade e sofisticação." : "Ciência na prática, sem perda de tempo.")}
          </h3>
          
          <p className="mt-6 opacity-70 leading-relaxed text-lg">
            {clienteValido.sobre_texto_1 || (ehEstetica 
              ? <>Meu nome é <strong className="font-semibold">{clienteValido.nome}</strong> e sou especialista em unhas. Trabalho com materiais premium de altíssima durabilidade e técnicas avançadas de simetria.</>
              : <>Meu nome é <strong className="font-semibold">{clienteValido.nome}</strong> e tenho anos de experiência com treinamento de alta performance. Programas baseados em evidências científicas.</>
            )}
          </p>
          
          <p className="mt-4 opacity-70 leading-relaxed text-lg">
            {clienteValido.sobre_texto_2 || (ehEstetica 
              ? "Meu objetivo é um atendimento personalizado para unhas impecáveis que blindam sua autoestima."
              : "Meu objetivo é estruturar uma rotina inteligente para conquistas consistentes, sem passar horas na academia.")}
          </p>

          <div className="mt-8 pt-6 border-t border-current/10 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${estiloAtivo.seloBg} flex items-center justify-center ${estiloAtivo.seloCheck} font-bold text-xl`}>
              ✓
            </div>
            <div>
              <p className="font-bold text-sm">
                {ehEstetica ? "Profissional Certificada" : "Profissional Registrado"}
              </p>
              <p className="opacity-50 text-xs uppercase tracking-wider font-mono">
                {ehEstetica ? "Biossegurança Garantida" : "CREF Habilitado"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
import Link from "next/link";

interface FooterProps {
  cliente: any; // Recebe os dados dinâmicos do cliente
}

export default function Footer({ cliente }: FooterProps) {
  // 🔥 Garante que se o cliente vier null ou undefined, o código não quebra o site
  const clienteValido = cliente || {};
  
  const ehEstetica = clienteValido.nicho === "estetica";

  // 1. Número Puro para o LINK do WhatsApp (remove tudo que não for número)
  const numeroBruto = String(clienteValido.whatsapp_numero || "");
  const numeroLimpo = numeroBruto.replace(/[^0-9]/g, ""); 

  const mensagemWhats = encodeURIComponent(clienteValido.whatsapp_texto || "Olá! Gostaria de saber mais sobre os seus serviços.");
  const whatsappUrl = `https://wa.me/${numeroLimpo}?text=${mensagemWhats}`;
  
  const usuarioInstagram = clienteValido.instagram_link?.replace("@", "").trim() || "";
  const linkInstagram = `https://instagram.com/${usuarioInstagram}`;

  // 2. FORMATAÇÃO VISUAL DO NÚMERO (Exibe bonito na tela para o usuário)
  const numeroFormatado = numeroLimpo.length >= 12
    ? `+${numeroLimpo.substring(0, 2)} (${numeroLimpo.substring(2, 4)}) ${numeroLimpo.substring(4, 9)}-${numeroLimpo.substring(9)}`
    : clienteValido.whatsapp_numero;

  // Captura a cor do banco com segurança através do objeto blindado
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  // 🔥 Mapeamento explícito de classes para o Tailwind v4 injetar a cor do banco perfeitamente
  const mapasDeCores: Record<string, { corBase: string; seloCirculo: string }> = {
    blue: {
      corBase: "text-blue-500",
      seloCirculo: "text-blue-500 bg-blue-500/10 border-blue-500/30",
    },
    purple: {
      corBase: "text-purple-500",
      seloCirculo: "text-purple-500 bg-purple-500/10 border-purple-500/30",
    },
    pink: {
      corBase: "text-pink-500",
      seloCirculo: "text-pink-500 bg-pink-500/10 border-pink-500/30",
    },
    amber: {
      corBase: "text-amber-500",
      seloCirculo: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    },
  };

  // Seleciona o estilo ativo com base na cor escolhida
  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          
          {/* Coluna 1: Sobre e Contato */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold text-lg mb-3">
                {ehEstetica ? `Sobre o Studio` : "Sobre mim"}
              </h3>
              
              {/* 🔥 AGORA INTEGRADO COM A SUA NOVA COLUNA sobre_mim */}
              <p className="text-sm leading-relaxed text-neutral-400">
                {clienteValido.sobre_mim ? (
                  clienteValido.sobre_mim
                ) : ehEstetica ? (
                  "Eu quero ajudar você a conquistar unhas impecáveis, resistentes e sofisticadas, elevando a sua autoestima e mudando a sua rotina de autocuidado."
                ) : (
                  "Eu quero ajudar você a alcançar de forma definitiva os seus objetivos na academia e mudar de vez a sua relação com seu corpo."
                )}
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">Entre em contato</h3>
              
              {/* WhatsApp Dinâmico com ÍCONE REAL E COMPLETO DO WHATSAPP */}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 hover:text-white text-neutral-400 transition-colors group">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  fill="currentColor" 
                  viewBox="0 0 16 16" 
                  className={`${estiloAtivo.corBase} group-hover:text-green-500 transition-colors block`}
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
                  <path d="M11.684 10.227c-.217-.109-1.283-.634-1.482-.707-.198-.074-.342-.109-.487.11-.145.217-.56.707-.686.852-.127.145-.253.163-.47.054-.218-.11-.922-.34-1.754-1.082-.647-.578-1.083-1.293-1.21-1.51-.127-.217-.014-.334.096-.442.1-.099.217-.253.325-.38.108-.127.145-.218.217-.362.073-.145.037-.272-.018-.38-.055-.109-.487-1.177-.667-1.61-.177-.432-.37-.373-.487-.379-.113-.005-.242-.006-.37-.006-.127 0-.335.048-.51.24-.175.192-.667.653-.667 1.593 0 .94.684 1.848.78 1.976.096.128 1.345 2.053 3.259 2.877.455.196.81.314 1.086.402.457.145.874.124 1.205.075.369-.054 1.283-.524 1.463-1.03.18-.507.18-.941.127-1.03-.054-.09-.2-.144-.417-.254z"/>
                </svg>
                {numeroFormatado}
              </a>

              {/* Gmail Dinâmico */}
              {clienteValido.gmail_contato && (
                <a href={`mailto:${clienteValido.gmail_contato}`} className="text-sm flex items-center gap-2 hover:text-white text-neutral-400 transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={`${estiloAtivo.corBase} group-hover:text-neutral-200 transition-colors`}>
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                  </svg>
                  {clienteValido.gmail_contato}
                </a>
              )}
            </div>
          </div>

          {/* Coluna 2 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links úteis</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href={`/${clienteValido.slug || ""}#como-funciona`} className="hover:text-white transition-colors">
                  {ehEstetica ? "Pacotes e Serviços" : "Consultoria Personalizada"}
                </Link>
              </li>
              <li>
                <Link href={`/${clienteValido.slug || ""}/planilhas-prontas`} className="hover:text-white transition-colors">
                  {ehEstetica ? "Apostilas e Materiais" : "Planilhas Prontas para Começar"}
                </Link>
              </li>
              <li>
                <Link href={`/${clienteValido.slug || ""}/loja`} className="hover:text-white transition-colors">
                  Acessar Loja Virtual
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 */}
          <div className="space-y-6">
            {clienteValido.instagram_link && (
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Siga-me nas redes sociais</h3>
                <div className="flex items-center gap-4">
                  <a href={linkInstagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.174.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.999 0zm-.08 1.44h.08c2.113 0 2.36.007 3.194.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.598.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>
                  </a>
                </div>
              </div>
            )}

            {/* Selo de Garantia Dinâmico */}
            <div className="inline-flex items-center gap-4 bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl max-w-xs">
              <div className={`w-12 h-12 rounded-full ${estiloAtivo.seloCirculo} flex flex-col items-center justify-center font-mono select-none`}>
                <span className="text-lg font-black leading-none">{ehEstetica ? "30" : "7"}</span>
                <span className="text-[9px] font-bold uppercase tracking-tighter leading-none">Dias</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-tight">
                  {ehEstetica ? "GARANTIA DE BRILHO" : "GARANTIA INCONDICIONAL"}
                </p>
                <p className="text-neutral-500 text-xs">
                  {ehEstetica ? "Durabilidade extrema ou seu retoque grátis." : "Risco zero para o seu investimento."}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Linha de Direitos Autorais Dinâmica baseada no Nicho */}
        <div className="border-t border-neutral-900 pt-8 text-center text-xs text-neutral-600">
          <p>
            © {new Date().getFullYear()} {ehEstetica ? `Studio ${clienteValido.nome || ""}` : clienteValido.nome || ""}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
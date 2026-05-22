import Link from "next/link";

interface NavbarProps {
  cliente: any; // Recebe os dados dinâmicos do cliente vindos do banco
}

export default function Navbar({ cliente }: NavbarProps) {
  const clienteValido = cliente || {};
  const ehEstetica = clienteValido.nicho === "estetica";
  const slugAtivo = clienteValido.slug || "";
  const nomeCliente = clienteValido.nome || "";

  // 1. Limpeza rigorosa do número do WhatsApp
  const numeroBruto = String(clienteValido.whatsapp_numero || "");
  const numeroLimpo = numeroBruto.replace(/[^0-9]/g, ""); 

  const mensajeWhats = encodeURIComponent(clienteValido.whatsapp_texto || "Olá! Gostaria de saber mais sobre os seus serviços.");
  const linkWhatsApp = `https://wa.me/${numeroLimpo}?text=${mensajeWhats}`;

  // 2. Mapeamento de cores estáticas para o Tailwind v4
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, { textoDestaque: string; bgIniciais: string; botao: string }> = {
    blue: {
      textoDestaque: "text-blue-500",
      bgIniciais: "bg-blue-500",
      botao: "bg-blue-500 hover:bg-blue-400 text-neutral-950 shadow-blue-500/10",
    },
    purple: {
      textoDestaque: "text-purple-500",
      bgIniciais: "bg-purple-500",
      botao: "bg-purple-500 hover:bg-purple-400 text-white shadow-purple-500/10",
    },
    pink: {
      textoDestaque: "text-pink-500",
      bgIniciais: "bg-pink-500",
      botao: "bg-pink-500 hover:bg-pink-400 text-white shadow-pink-500/10",
    },
    amber: {
      textoDestaque: "text-amber-500",
      bgIniciais: "bg-amber-500",
      botao: "bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-400/10",
    },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  // 3. LOGO DE TEXTO EXPANDIDA (Até 10 caracteres)
  const iniciaisLogo = clienteValido.navbar_iniciais_logo
    ? clienteValido.navbar_iniciais_logo.substring(0, 10).toUpperCase()
    : nomeCliente
      ? nomeCliente.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
      : "PT";

  return (
    /* SOLUÇÃO DEFINITIVA: top-0, left-0 e w-full isolados com h-20 rígido. 
       O segredo está em remover classes ambíguas e travar o z-index máximo controlado apenas na barra física. */
    <header className="fixed top-0 left-0 w-full h-20 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-900 block isolate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-50">
        <div className="flex items-center justify-between h-full w-full">
          
          {/* Logo e Texto Dinâmicos */}
          <Link href={`/${slugAtivo}`} className="flex-shrink-0 flex items-center gap-3 group relative z-50">
            <div className={`h-9 px-3 min-w-9 rounded-xl ${estiloAtivo.bgIniciais} flex items-center justify-center text-neutral-950 font-black text-sm tracking-tight uppercase whitespace-nowrap`}>
              {iniciaisLogo}
            </div>
            
            <span className="text-white font-black text-lg tracking-wider uppercase hidden sm:block">
              {clienteValido.navbar_texto_principal ? (
                <>
                  {clienteValido.navbar_texto_principal}{" "}
                  <span className={clienteValido.navbar_texto_destaque ? estiloAtivo.textoDestaque : ""}>
                    {clienteValido.navbar_texto_destaque || ""}
                  </span>
                </>
              ) : ehEstetica ? (
                <>
                  Studio <span className={estiloAtivo.textoDestaque}>Estética</span>
                </>
              ) : (
                <>
                  Consultoria <span className={estiloAtivo.textoDestaque}>Fitness</span>
                </>
              )}
            </span>
          </Link>

          {/* Links de Navegação */}
          <nav className="flex items-center gap-6 md:gap-8 relative z-50">
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-neutral-400">
              
              {/* 🔥 ESCONDIDO PARA ESTÉTICA: Só mostra o "Como funciona?" se NÃO for estética */}
              {!ehEstetica && (
                <Link href={`/${slugAtivo}#como-funciona`} className="hover:text-white transition-colors">
                  Como funciona?
                </Link>
              )}
              
              {/* Link de Serviços / Nosso App */}
              <Link href={`/${slugAtivo}#${ehEstetica ? "services" : "app"}`} className="hover:text-white transition-colors">
                {ehEstetica ? "Serviços" : "Nosso app"}
              </Link>
              
              {/* 🔥 CORRIGIDO: A opção "Planos / Loja" agora só renderiza para Personal Trainer */}
              {!ehEstetica && (
                <Link href={`/${slugAtivo}/loja`} className="hover:text-white transition-colors">
                  Loja
                </Link>
              )}
            </div>

            {/* Botão de Destaque Dinâmico */}
            <Link
              href={ehEstetica ? `/${slugAtivo}#agendamento` : `/${slugAtivo}/planilhas-prontas`}
              className={`px-5 py-2.5 rounded-full ${estiloAtivo.botao} font-bold text-sm transition-colors shadow-md relative z-50`}
            >
              {ehEstetica ? "Agendar Horário" : "Planilhas prontas"}
            </Link>

            {/* Ícone de Suporte WhatsApp */}
            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-green-500 transition-colors flex items-center justify-center w-8 h-8 p-1 relative z-50"
              title="Falar no WhatsApp"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                fill="currentColor" 
                viewBox="0 0 16 16" 
                className="block w-6 h-6 min-w-6 min-h-6"
              >
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
                <path d="M11.684 10.227c-.217-.109-1.283-.634-1.482-.707-.198-.074-.342-.109-.487.11-.145.217-.56.707-.686.852-.127.145-.253.163-.47.054-.218-.11-.922-.34-1.754-1.082-.647-.578-1.083-1.293-1.21-1.51-.127-.217-.014-.334.096-.442.1-.099.217-.253.325-.38.108-.127.145-.218.217-.362.073-.145.037-.272-.018-.38-.055-.109-.487-1.177-.667-1.61-.177-.432-.37-.373-.487-.379-.113-.005-.242-.006-.37-.006-.127 0-.335.048-.51.24-.175.192-.667.653-.667 1.593 0 .94.684 1.848.78 1.976.096.128 1.345 2.053 3.259 2.877.455.196.81.314 1.086.402.457.145.874.124 1.205.075.369-.054 1.283-.524 1.463-1.03.18-.507.18-.941.127-1.03-.054-.09-.2-.144-.417-.254z"/>
              </svg>
            </a>
          </nav>

        </div>
      </div>
    </header>
  );
}
"use client";

import Link from "next/link";

interface NavbarProps {
  cliente: any;
}

export default function Navbar({ cliente }: NavbarProps) {
  const clienteValido = cliente || {};
  const ehEstetica = clienteValido.nicho === "estetica";
  const slugAtivo = clienteValido.slug || "";
  const nomeCliente = clienteValido.nome || "";

  // Tratamento do WhatsApp com verificação de número
  const numeroBruto = String(clienteValido.whatsapp_numero || "");
  const numeroLimpo = numeroBruto.replace(/[^0-9]/g, "");
  const mensajeWhats = encodeURIComponent(clienteValido.whatsapp_texto || "Olá! Gostaria de saber mais sobre os seus serviços.");
  const linkWhatsApp = numeroLimpo ? `https://wa.me/${numeroLimpo}?text=${mensajeWhats}` : null;

  // Mapeamento dinâmico de cores (usa herança de tema)
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");
  const mapasDeCores: Record<string, { textoDestaque: string; bgDestaque: string; botao: string }> = {
    blue: { textoDestaque: "text-blue-500", bgDestaque: "bg-blue-500", botao: "bg-blue-500 hover:bg-blue-600 text-white" },
    purple: { textoDestaque: "text-purple-500", bgDestaque: "bg-purple-500", botao: "bg-purple-500 hover:bg-purple-600 text-white" },
    pink: { textoDestaque: "text-pink-500", bgDestaque: "bg-pink-500", botao: "bg-pink-500 hover:bg-pink-600 text-white" },
    amber: { textoDestaque: "text-amber-500", bgDestaque: "bg-amber-500", botao: "bg-amber-500 hover:bg-amber-600 text-neutral-950" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];
  const iniciaisLogo = clienteValido.navbar_iniciais_logo
    ? clienteValido.navbar_iniciais_logo.substring(0, 10).toUpperCase()
    : nomeCliente ? nomeCliente.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() : "PT";

  return (
    <header className="fixed top-0 left-0 w-full h-20 z-50 bg-inherit text-inherit border-b border-current/10 backdrop-blur-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full w-full">
          
          <Link href={`/${slugAtivo}`} className="flex items-center gap-3 group">
            <div className={`h-9 px-3 min-w-9 rounded-xl ${estiloAtivo.bgDestaque} flex items-center justify-center text-white font-black text-sm uppercase`}>
              {iniciaisLogo}
            </div>
            <span className="font-black text-lg tracking-wider uppercase hidden sm:block">
              {clienteValido.navbar_texto_principal || (ehEstetica ? "Studio" : "Consultoria")}{" "}
              <span className={estiloAtivo.textoDestaque}>
                {clienteValido.navbar_texto_destaque || (ehEstetica ? "Estética" : "Fitness")}
              </span>
            </span>
          </Link>

          <nav className="flex items-center gap-6 md:gap-8">
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold opacity-70">
              {/* Menu condicional: Estética (Serviços) vs Fitness (Como Funciona + App) */}
              {ehEstetica ? (
                <Link href={`/${slugAtivo}#services`} className="hover:opacity-100 transition-opacity">Serviços</Link>
              ) : (
                <>
                  <Link href={`/${slugAtivo}#como-funciona`} className="hover:opacity-100 transition-opacity">Como funciona?</Link>
                  <Link href={`/${slugAtivo}#app`} className="hover:opacity-100 transition-opacity">Nosso App</Link>
                </>
              )}
            </div>

            {/* Botão Principal Condicional */}
            <Link
              href={ehEstetica ? `/${slugAtivo}#agendamento` : `/${slugAtivo}/planilhas-prontas`}
              className={`px-5 py-2.5 rounded-full ${estiloAtivo.botao} font-bold text-sm transition-all shadow-md`}
            >
              {ehEstetica ? "Agendar Horário" : "Planilhas"}
            </Link>

            {/* Ícone WhatsApp condicional */}
            {linkWhatsApp && (
              <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 hover:text-green-500 transition-all">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
                </svg>
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
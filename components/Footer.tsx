import Link from "next/link";

interface FooterProps {
  cliente: any;
}

export default function Footer({ cliente }: FooterProps) {
  const clienteValido = cliente || {};
  const ehEstetica = clienteValido.nicho === "estetica";

  const numeroBruto = String(clienteValido.whatsapp_numero || "");
  const numeroLimpo = numeroBruto.replace(/[^0-9]/g, ""); 
  const mensagemWhats = encodeURIComponent(clienteValido.whatsapp_texto || "Olá! Gostaria de saber mais.");
  const whatsappUrl = `https://wa.me/${numeroLimpo}?text=${mensagemWhats}`;
  
  const usuarioInstagram = clienteValido.instagram_link?.replace("@", "").trim() || "";
  const linkInstagram = `https://instagram.com/${usuarioInstagram}`;

  const numeroFormatado = numeroLimpo.length >= 12
    ? `+${numeroLimpo.substring(0, 2)} (${numeroLimpo.substring(2, 4)}) ${numeroLimpo.substring(4, 9)}-${numeroLimpo.substring(9)}`
    : clienteValido.whatsapp_numero;

  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, { corBase: string; seloCirculo: string }> = {
    blue: { corBase: "text-blue-500", seloCirculo: "text-blue-500 bg-blue-500/10 border-blue-500/30" },
    purple: { corBase: "text-purple-500", seloCirculo: "text-purple-500 bg-purple-500/10 border-purple-500/30" },
    pink: { corBase: "text-pink-500", seloCirculo: "text-pink-500 bg-pink-500/10 border-pink-500/30" },
    amber: { corBase: "text-amber-500", seloCirculo: "text-amber-500 bg-amber-500/10 border-amber-500/30" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  return (
    // bg-inherit e text-inherit garantem que o rodapé acompanhe o tema do site
    <footer className="bg-inherit text-inherit border-t border-current/10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-3">{ehEstetica ? "Sobre o Studio" : "Sobre mim"}</h3>
              <p className="text-sm leading-relaxed opacity-70">
                {clienteValido.sobre_mim || (ehEstetica ? "Embelezamento e saúde das unhas com materiais premium." : "Consultoria fitness online baseada em evidência científica.")}
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-bold text-sm uppercase tracking-wider opacity-90">Contato</h3>
              <a href={whatsappUrl} className="text-sm flex items-center gap-2 hover:opacity-100 opacity-70 transition-opacity">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={estiloAtivo.corBase}><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/></svg>
                {numeroFormatado}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Links úteis</h3>
            {/* O menu só aparece se NÃO for estética */}
{!ehEstetica && (
  <ul className="space-y-2 text-sm font-medium opacity-70">
    <li>
      <Link href={`/${clienteValido.slug || ""}#como-funciona`} className="hover:opacity-100 transition-opacity">
        Consultoria
      </Link>
    </li>
  </ul>
)}
          </div>

          <div className="space-y-6">
            {clienteValido.instagram_link && (
              <div>
                <h3 className="font-bold text-lg mb-4">Redes sociais</h3>
                <a href={linkInstagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-current/5 border border-current/10 flex items-center justify-center hover:opacity-100 opacity-70 transition-opacity">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className={estiloAtivo.corBase}><path d="M8 0C5.829 0 5.556.01 4.703.048... (seu svg)"/></svg>
                </a>
              </div>
            )}

            <div className="inline-flex items-center gap-4 bg-current/5 border border-current/10 p-4 rounded-xl max-w-xs">
              <div className={`w-12 h-12 rounded-full ${estiloAtivo.seloCirculo} flex flex-col items-center justify-center font-mono`}>
                <span className="text-lg font-black leading-none">{ehEstetica ? "30" : "7"}</span>
                <span className="text-[9px] font-bold uppercase tracking-tighter">Dias</span>
              </div>
              <div className="opacity-80">
                <p className="font-bold text-sm">GARANTIA</p>
                <p className="text-xs opacity-60">Segurança total para você.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-current/10 pt-8 text-center text-xs opacity-50">
          <p>© {new Date().getFullYear()} {clienteValido.nome}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
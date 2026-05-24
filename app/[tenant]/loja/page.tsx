import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ tenant: string }>;
}

export default async function LojaPage({ params }: PageProps) {
  const { tenant } = await params;

  const { data: cliente, error } = await supabase
    .from("clientes")
    .select("*")
    .eq("slug", tenant)
    .single();

  if (error || !cliente || cliente.assinatura_status !== "ativo") {
    notFound();
  }

  const ehEstetica = cliente.nicho === "estetica";
  const ehAcai = cliente.nicho === "acai";
  const slugAtivo = cliente.slug || "";

  // Se for Açaí, a loja deveria ser o próprio cardápio, 
  // então podemos redirecionar ou mostrar uma mensagem amigável.
  if (ehAcai) {
     // Opção: redirecionar para a home onde está o cardápio
     // redirect(`/${slugAtivo}#cardapio`);
  }

  const preco30 = cliente.preco_consultoria_30_dias ? `${cliente.preco_consultoria_30_dias},00` : "0,00";
  const preco90 = cliente.preco_consultoria_90_dias ? `${cliente.preco_consultoria_90_dias},00` : "0,00";
  const preco180 = cliente.preco_consultoria_180_dias ? `${cliente.preco_consultoria_180_dias},00` : "0,00";
  const precoPlanilhas = cliente.preco_planilhas ? `${cliente.preco_planilhas},00` : "0,00";

  const corDefinida = cliente.tema_cor || (ehEstetica ? "pink" : ehAcai ? "amber" : "amber");

  const mapasDeCores: Record<string, { linha: string; botao: string; textBadge: string; bgBadge: string }> = {
    blue: { linha: "bg-blue-500", botao: "bg-blue-500 hover:bg-blue-400 shadow-blue-500/10 text-neutral-950", textBadge: "text-blue-500", bgBadge: "bg-blue-500" },
    purple: { linha: "bg-purple-500", botao: "bg-purple-500 hover:bg-purple-400 shadow-purple-500/10 text-white", textBadge: "text-purple-500", bgBadge: "bg-purple-500" },
    pink: { linha: "bg-pink-500", botao: "bg-pink-500 hover:bg-pink-400 shadow-pink-500/10 text-white", textBadge: "text-pink-500", bgBadge: "bg-pink-500" },
    amber: { linha: "bg-amber-500", botao: "bg-amber-500 hover:bg-amber-400 shadow-amber-400/10 text-neutral-950", textBadge: "text-amber-500", bgBadge: "bg-amber-500" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores["amber"];

  const servicos = ehEstetica ? [
    { name: "PLANO SEMESTRAL VIP", price: preco180, description: "Unhas impecáveis o ano todo.", badge: "VIP", checkoutUrl: `/${slugAtivo}#agendamento`, isExternal: false },
    { name: "PLANO TRIMESTRAL", price: preco90, description: "Manutenções garantidas.", badge: "Popular", checkoutUrl: `/${slugAtivo}#agendamento`, isExternal: false },
    { name: "PACOTE MENSAL", price: preco30, description: "Aplicação e reparos.", badge: "Mensal", checkoutUrl: `/${slugAtivo}#agendamento`, isExternal: false },
  ] : [
    { name: "180 DIAS (6 PLANILHAS)", price: preco180, description: "Consultoria longo prazo.", badge: "Sale", checkoutUrl: cliente.checkout_180_dias || "#", isExternal: true },
    { name: "90 DIAS (3 PLANILHAS)", price: preco90, description: "Evolução e constância.", badge: "Destaque", checkoutUrl: cliente.checkout_90_dias || "#", isExternal: true },
    { name: "30 DIAS (1 PLANILHA)", price: preco30, description: "Primeiro passo.", badge: "Mensal", checkoutUrl: cliente.checkout_30_dias || "#", isExternal: true },
  ];

  return (
    <main className="relative z-10 bg-white text-neutral-950 min-h-screen pt-32 pb-20 font-sans">
      <Navbar cliente={cliente} />
      
      {!ehAcai && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-950">
              {ehEstetica ? "Planos e Pacotes" : "Consultoria Personalizada"}
            </h2>
            <div className={`w-12 h-1 ${estiloAtivo.linha} mx-auto mt-2`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicos.map((item, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm relative flex flex-col justify-between text-center z-20">
                <span className={`absolute top-3 right-3 ${estiloAtivo.bgBadge} text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase z-30`}>
                  {item.badge}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-neutral-900 mt-1 uppercase tracking-tight">{item.name}</h3>
                  <p className="text-xl font-black text-neutral-950 mt-4">R$ {item.price}</p>
                  <p className="text-xs text-neutral-500 mt-2 min-h-[40px]">{item.description}</p>
                </div>
                <a href={item.checkoutUrl} target={item.isExternal ? "_blank" : "_self"} className={`mt-6 block w-full text-center ${estiloAtivo.botao} font-black py-3 rounded-xl text-xs uppercase`}>
                  {ehEstetica ? "Agendar" : "Adicionar ao carrinho"}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}